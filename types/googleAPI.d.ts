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

declare interface UpdateUserDataParams {
  uid: string;
  city: string;
  username: string;
  oemail: string;
  nemail: string;
  opassword: string;
  npassword?: string;
}

declare interface CreateBlogParams {
  bid: string;
  publishTime: Date;
  cover: string | null; 
  article: string;
  title: string;
  tags: string[];
}

declare interface UploadImageParams {
  bid: string;
  image: string;
  fileName: string;
}

declare interface AddBlogCommentParams extends BlogComment {
  displayName?: string;
  bid: string;
}

// firebase api responses 
declare interface UserData extends CreateUserParams{};

declare interface AuthError {
  errorCode: string;
  message: string;
}

declare interface PlannerPlaces {
  pid: string;
  places: PlannerPlace[];
}

declare interface PlannerPlace {
  place: ResultsItem;
  assignedDateTimes: {
    from: Date | null;
    to: Date | null;
  };
  geoData?: {
    lat: number;
    lng: number;
  };
}

declare interface Blog {
  bid: string;
  title: string;
  article: string;
  cover: string;
  publishTime: Date;
  userData: UserData;
  tags: string[];
}

declare interface BlogDetails {
  likes: string[];
  comments: BlogComment[];
  views: string[];
}

declare interface BlogComment {
  displayName: string;
  publishTime: Date;
  text: string;
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

declare interface SevenDaysWeather {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    is_day: number;
    condition: Condition;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

declare interface Condition {
  text: string;
  icon: string;
}

declare interface ForecastDay {
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: Condition;
  };
  hour: Hour[];
}

declare interface Hour {
  time: string;
  condition: Condition;
  temp_c: number;
}

declare interface FormattedDaysForecast {
  weekday: string;
  condition: Condition;
  maxtemp_c: number;
  mintemp_c: number;
  hottestHours: {
    hour: number;
    temp_c: number;
  }[];
}