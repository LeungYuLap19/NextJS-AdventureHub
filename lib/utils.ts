import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";
import qs from "query-string";
import { weekdays } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: 'sign-in' | 'sign-up') => z.object({
  username: type === 'sign-in' ? z.string().optional() : z.string().min(5).max(20),
  city: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

export const handleKeyDown = ({event, func}: HandleKeyDownParams) => {
  if (event.key === 'Enter') {
    func();
  }
};

export function formUrlQuery({ params, query, extraRoute }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  const newQueryParams = { ...currentUrl, ...query };

  return qs.stringifyUrl(
    {
      url: window.location.pathname + (extraRoute || ''),
      query: newQueryParams,
    },
    { skipNull: true }
  );
}

export function countCommaSpacePairs(inputString: string): number {
  const commaSpacePattern = /, /g;
  const matches = inputString.match(commaSpacePattern);
  return matches ? matches.length : 0;
}

export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

export function convertOpeningHours(openingHours: OpenClose[]): ConvertOpeningHoursReturn[] {
  const daysOfWeek = weekdays;
  const converted = openingHours.map((openClose) => {
    const { day, open, close } = openClose;
    const formattedHours = formattedOpenClose(open, close);
    return {
      weekday: daysOfWeek[day - 1],
      hours: formattedHours,
    };
  });
  return converted;
}

function formattedOpenClose(open: string, close: string): string {
  const openHours = parseInt(open.slice(0, 2));
  const openMinutes = open.slice(2);
  const closeHours = parseInt(close.slice(0, 2));
  const closeMinutes = close.slice(2);

  const openSuffix = openHours >= 12 ? 'PM' : 'AM';
  const formattedOpen = openHours % 12 || 12;

  const closeSuffix = closeHours >= 12 ? 'PM' : 'AM';
  const formattedClose = closeHours % 12 || 12;

  return `${formattedOpen}:${openMinutes} ${openSuffix} - ${formattedClose}:${closeMinutes} ${closeSuffix}`;
}