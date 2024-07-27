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

declare interface FormattedDate {
  weekday: string;
  month: string;
  day: number;
  year: number;
}