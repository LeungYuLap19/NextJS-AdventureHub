// google api functions params 
declare interface TextSearchParams {
  name: string;
  latitude: number;
  longitude: number;
  formatted_address: string;
}

// firebase api functions params
declare interface AccountParams {
  email: string;
  password: string;
}

declare interface CreateUserParams {
  uid: string;
  username: string;
  city: string;
  email: string;
}

// firebase api responses 
declare interface UserData extends CreateUserParams{};

declare interface AuthError {
  errorCode: string;
  message: string;
}

// weather api response
declare interface Weather {
  current: {
    condition: {
      text: string
    };
    temp_c: number
  }
}