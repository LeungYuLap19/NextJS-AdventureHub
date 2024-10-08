import { tripFormSchema } from "@/lib/utils";

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
  item?: ResultsItem;
  plannersItem?: PlannersItem;
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

// planner components props ----------
declare interface PlannersItem {
  pid: string;
  name: string;
  country: AutoCompleteResponse;
  date: {
    from: Date;
    to: Date;
  }
  photo?: string;
  createAt: Date;
}

declare interface PlannerTabsParams {
  label: string;
  imgUrl: string;
}

declare interface PlannerTabProps {
  tab: PlannerTabsParams;
  selected: PlannerTabsParams;
  setSelected: (selected: PlannerTabsParams) => void 
}

declare interface TripFormProps {
  setOpen?: (open: boolean) => void; 
  type: 'create' | 'edit';
  defaultValues?: Partial<z.infer<typeof tripFormSchema>>;
  pid?: string;
}

declare interface PlacesItemProps {
  type?: 'list' | 'sheet'; 
  item: ResultsItem; 
  pid?: string;
  planner?: PlannersItem;
  assignedDateTimes?: {
    from: Date | null;
    to: Date | null;
  };
}

declare interface MapWithInfoProps {
  type: 'place' | 'planner';
  places?: PlannerPlace[];
  planner?: PlannersItem;
  position?: {
    lat: number;
    lng: number;
  };
}

declare interface PlannerSheetProps {
  item: ResultsItem;
  planner: PlannersItem;
  assignedDateTimes?: {
    from: Date | null;
    to: Date | null;
  };
  type: 'item' | 'calendar';
}

// planner calendar
declare interface CalendarTimeSlotProps {
  time: string; 
  last?: string; 
  placesOfTheDate: PlannerPlace[] | null; 
  targetDate: Date;
}
