'use server'
import { createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth";
import { collection, addDoc, where, query, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; 

export async function createAccount({ email, password }: AccountParams): Promise<string | AuthError> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(userCredential.user.uid);
    return userCredential.user.uid;
  } catch (error: any) {
    console.error('Create Account Error:', error.code, error.message);
    return getError(error.code);
  }
}

export async function signInAccount({ email, password }: AccountParams): Promise<string | AuthError> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // console.log(userCredential.user);
    return userCredential.user.uid;
  } catch (error: any) {
    console.error('Sign In Account Error:', error.code, error.message);
    return getError(error.code);
  }
}

export async function createUser({ uid, username, city, email }: CreateUserParams): Promise<UserData | null> {
  try {
    await addDoc(collection(db, "users"), {
      uid: uid,
      username: username,
      city: city,
      email: email,
    });
    // console.log({ uid: uid, username: username, city: city, email: email });
    return { uid: uid, username: username, city: city, email: email };
  } catch (error: any) {
    console.error('Create User Error:', error.code, error.message);
    return null;
  }
}

export async function getUserByUID(uid: string): Promise<UserData | null> {
  const usersRef = collection(db, "users");
  try {
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as UserData;
      // console.log(userData);
      return userData;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error('Get User By UID Error:', error.code, error.message);
    return null;
  }
}

async function updateUserDoc(uid: string, username: string, nemail: string): Promise<true | AuthError> {
  const usersRef = collection(db, 'users');
  const user = auth.currentUser;

  if (!user) {
    console.error('No authenticated user');
    return getError('auth/user-not-found');
  }

  try {
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, {
        username: username,
        email: nemail,
      });
      return true;
    } else {
      console.error('No user found with the specified UID');
      return getError('auth/user-not-found');
    }
  } catch (error: any) {
    console.error('Update User Doc Error:', error.code, error.message);
    console.error('Full Error Object:', error);
    return getError(error.code);
  }
}

async function updateUserAuth(nemail: string, npassword?: string): Promise<true | AuthError> {
  const user = auth.currentUser;
  try {
    if (!user) {
      return getError('auth/user-not-found');
    }
    await updateEmail(user, nemail);
    if (npassword) {
      await updatePassword(user, npassword);
    }
    return true;
  } catch (error: any) {
    console.error('Update User Auth Error:', error.code, error.message);
    return getError(error.code);
  }
}

async function reAuthUser(email: string, opassword: string): Promise<true | AuthError> {
  try {
    await signInWithEmailAndPassword(auth, email, opassword);
    return true;
  } catch (error: any) {
    console.error('Reauth User Error:', error.code, error.message);
    return getError(error.code);
  }
}

export async function updateUserData({ uid, city, username, oemail, nemail, opassword, npassword }: UpdateUserDataParams): Promise<UserData | AuthError> {
  const reAuthResult = await reAuthUser(oemail, opassword);
  if (reAuthResult !== true) return reAuthResult;

  const updateDocResult = await updateUserDoc(uid, username, nemail);
  if (updateDocResult !== true) return updateDocResult;

  const updateAuthResult = await updateUserAuth(nemail, npassword);
  if (updateAuthResult !== true) return updateAuthResult;

  return { uid, city, username, email: nemail };
}

function getError(errorCode: string): AuthError {
  switch (errorCode) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return { errorCode: errorCode, message: 'Incorrect email or password.' };
    case 'auth/email-already-in-use':
      return { errorCode: errorCode, message: 'Email already in use.' };
    case 'auth/operation-not-allowed':
      return { errorCode: errorCode, message: 'Operation not allowed.' };
    case 'auth/user-not-found':
      return { errorCode: errorCode, message: 'User not found.' };
    case 'auth/invalid-email':
      return { errorCode: errorCode, message: 'Invalid email address.' };
    case 'auth/weak-password':
      return { errorCode: errorCode, message: 'Password is too weak.' };
    default:
      return { errorCode: errorCode, message: 'An unknown error occurred.' };
  }
}