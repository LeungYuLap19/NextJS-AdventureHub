// auth components props
declare interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
}

// logo component props
declare interface LogoProps {
  height: number;
  width: number;
  style: string;
}

// nav component props 
declare interface NavigationTabProps {
  label: 'Discover' | 'Planner' | 'Blog' | 'Bookings';
  route: string;
  type?: 'top' | 'bot';
}

// discover component props
declare interface HeaderProps {
  title: React.ReactNode;
}

declare interface SubtitleProps {
  title: React.ReactNode;
  style?: string;
}

declare interface SearchTabProps {
  imgUrl: string;
  label: string; 
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

declare interface PhotoProps {
  displayName: string;
  imgUrl: string;
  morePhoto: boolean;
}

// functions interfaces
declare interface HandleKeyDownParams {
  event: React.KeyboardEvent<HTMLInputElement>;
  func: () => void;
}

declare interface UrlQueryParams {
  params: string;
  query: Record<string, string>;
  extraRoute?: string;
}