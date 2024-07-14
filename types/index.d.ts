// auth components props ----------
declare interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
}

// logo component props ----------
declare interface LogoProps {
  height: number;
  width: number;
  style: string;
}

// nav component props ----------
declare interface NavigationTabProps {
  label: 'Discover' | 'Planner' | 'Blog' | 'Bookings';
  route: string;
  type?: 'top' | 'bot';
}

// discover component props ----------
declare interface HeaderProps {
  title: React.ReactNode;
}

declare interface SubtitleProps {
  title: React.ReactNode;
  style?: string;
}

declare interface SearchTabParams {
  label: string;
  imgUrl: string;
  categories: number[];
}

declare interface CategorizedSearchTabParams {
  label: string;
  imgUrl: string;
  categories: { [key: string]: number[]; };
}

declare interface SearchTabProps {
  tab: CategorizedSearchTabParams; 
  activeTab: CategorizedSearchTabParams;
  setActiveTab: (tab: CategorizedSearchTabParams) => void;
}

declare interface PhotoProps {
  displayName: string;
  imgUrl: string;
  morePhoto: boolean;
}

declare interface ResultsItemProps {
  item: ResultsItem;
}

declare interface DetailsTableProps {
  label: string;
  data: string;
  first?: boolean;
}

declare interface SocialMediaLinkProps {
  type: string;
  name: string;
}

declare interface PhotosCardProps {
  item: ResultsItem;
  photos?: PlacePhoto[];
}

// api response interfaces ----------
declare interface AutoCompleteResponse {
  type: 'geo';
  text: AutoCompleteText;
  geo: Geo;
}

declare interface AutoCompleteText {
  primary: string;
  secondary: string;
  highlight: { start: number; lenght: number }[];
}

declare interface Geo {
  name: string;
  center: LatLong;
  bounds: {
    ne: LatLong;
    sw: LatLong;
  };
  cc: string;
  type: string;
}

declare interface LatLong {
  latitude: number;
  longitude: number;
}

declare interface CategorizedResultsItem {
  label: string;
  results: ResultsItem[];
}

declare interface ResultsItem {
  fsq_id: string;
  name: string;
  rating: number;
  categories: Category[];
  photo?: string;
}

declare interface Category {
  id: number;
  name: string;
  short_name: string;
  plural_name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
}

declare interface PlacePhoto {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
}

declare interface PlaceDetails {
  fsq_id: string;
  description: string;
  tips: Tip[];
  hours: Hours;
  hours_popular: OpenClose[];
  features: Features;
  location: Location;
  tel: string;
  email: string;
  website: string;
  social_media: SocialMedia;
  geocodes: Geocodes;
  photos: PlacePhoto[];
  price: number;
  popularity: number;
}

declare interface Geocodes {
  main: LatLong;
  roof: LatLong;
}

declare interface SocialMedia {
  facebook_id: string;
  instagram: string;
  twitter: string;
}

declare interface Location {
  address: string;
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region: string;
}

declare interface Features {
  payment: PaymentFeatures;
  food_and_drink: FoodNDrinkFeatures;
  services: ServicesFeatures;
  amenities: AmenitiesFeatures;
  attributes: AttributesFeatures;
}

declare interface AttributesFeatures {
  business_meeting: string;
  clean: string;
  crowded: string;
  dates_popular: string;
  dressy: string;
  families_popular: string;
  gluten_free_diet: string;
  good_for_dogs: string;
  groups_popular: string;
  healthy_diet: string;
  late_night: string;
  noisy: string;
  quick_bite: string;
  romantic: string;
  service_quality: string;
  singles_popular: string;
  special_occasion: string;
  trendy: string;
  value_for_money: string;
  vegan_diet: string;
  vegetarian_diet: string;
}

declare interface AmenitiesFeatures {
  restroom: boolean;
  smoking: boolean;
  jukebox: boolean;
  music: boolean;
  live_music: boolean;
  private_room: boolean;
  outdoor_seating: boolean;
  tvs: boolean;
  atm: boolean;
  coat_check: boolean;
  wheelchair_accessible: boolean;
  parking: {
    parking: boolean;
    street_parking: boolean;
    valet_parking: boolean;
    public_lot: boolean;
    private_lot: boolean;
  };
  sit_down_dining: boolean;
  wifi: string;
}

declare interface ServicesFeatures {
  delivery: boolean;
  takeout: boolean;
  drive_through: boolean;
  dine_in: {
    reservations: boolean;
    online_reservations: boolean;
    groups_only_reservations: boolean;
    essential_reservations: boolean;
  };
}

declare interface FoodNDrinkFeatures {
  alcohol: {
    bar_service: boolean;
    beer: boolean;
    byo: boolean;
    cocktails: boolean;
    full_bar: boolean;
    wine: boolean;
  },
  meals: {
    bar_snacks: boolean;
    breakfast: boolean;
    brunch: boolean;
    lunch: boolean;
    happy_hour: boolean;
    dessert: boolean;
    dinner: boolean;
    tasting_menu: boolean;
  }
}

declare interface PaymentFeatures {
  credit_cards: {
    accepts_credit_cards: boolean;
    amex: boolean;
    discover: boolean;
    visa: boolean;
    diners_club: boolean;
    master_card: boolean;
    union_pay: boolean;
  },
  digital_wallet: {
    accepts_nfc: boolean;
  }
}

declare interface Hours {
  display: string;
  is_local_holiday: boolean;
  open_now: boolean;
  regular: OpenClose[];
}

declare interface OpenClose {
  close: string;
  day: number;
  open: string;
}

declare interface Tip {
  created_at: string;
  text: string;
}

// google api response 
declare interface ExtraData {
  id: string;
  googleMapsUri: string;
  reviews: Review[];
}

declare type Review = {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: LocalizedText;
  originalText: LocalizedText;
  authorAttribution: AuthorAttribution;
  publishTime: string;
}

declare type LocalizedText = {
  text: string;
  languageCode: string;
}

declare type AuthorAttribution = {
  displayName: string;
  uri: string;
  photoUri: string;
}

// api functions params ----------
declare interface AutoCompleteParams {
  name: string; // user inputs
  types?: 'geo';
  limit: number;
}

declare interface PlaceSearchParams {
  latitude: number;
  longitude: number;
  radius: number;
  categories: number[];
  fields: string[];
  sort: 'RELEVANCE' | 'RATING' | 'DISTANCE' | 'POPULARITY';
  limit: number;
}

declare interface PlacePhotosParams {
  fsq_id: string;
  limit: number; // limit to 1 for resultItem
}

declare interface NearbySearchParams {
  fields: string[];
  limit: number;
}

declare interface PlaceDetailsParams {
  fsq_id: string;
  fields: string[];
}

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

// functions interfaces ----------
declare interface HandleKeyDownParams {
  event: React.KeyboardEvent<HTMLInputElement>;
  func: () => void;
}

declare interface UrlQueryParams {
  params: string;
  query: Record<string, string>;
  extraRoute?: string;
}

declare interface ConvertOpeningHoursReturn {
  weekday: string;
  hours: string;
}