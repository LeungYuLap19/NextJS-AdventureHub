'use server'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { app } from "../firebase"; 

export async function createAccount({ email, password }: AccountParams): Promise<string | AuthError> {
  const auth = getAuth(app);
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
  const auth = getAuth(app);
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
  const db = getFirestore(app);
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
  const db = getFirestore(app);
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

function getError(errorCode: string): AuthError {
  switch(errorCode) {
    case 'auth/invalid-credential':
      return {errorCode: errorCode, message: 'Incorrect email or password.'};
    case 'auth/email-already-in-use':
      return {errorCode: errorCode, message: 'Email already in use.'};
    default:
      return {errorCode: errorCode, message: 'No network or server error'};
  }
}