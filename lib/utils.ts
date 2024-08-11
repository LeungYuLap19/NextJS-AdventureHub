import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";
import qs from "query-string";
import { weekdays } from "@/constants";
import { addDays, differenceInDays, format } from "date-fns";
import { PlannersItem } from "@/types/components";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// schema start
export const authFormSchema = (type: 'sign-in' | 'sign-up') => z.object({
  username: type === 'sign-in' ? z.string().optional() : z.string().min(5).max(20),
  city: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

const latLongSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const geoSchema = z.object({
  name: z.string(),
  center: latLongSchema,
  bounds: z.object({
    ne: latLongSchema,
    sw: latLongSchema,
  }),
  cc: z.string(),
  type: z.string(),
});

const autoCompleteTextSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  highlight: z.array(z.object({
    start: z.number(),
    length: z.number()
  })),
});

const autoCompleteResponseSchema = z.object({
  type: z.literal('geo'),
  text: autoCompleteTextSchema,
  geo: geoSchema,
});

export const tripFormSchema = z.object({
  name: z.string().min(1, 'Name your trip.'),
  country: autoCompleteResponseSchema,
  date: z.object({
    from: z.date(),
    to: z.date(),
  }).refine(
    (data) => data.from > addDays(new Date(), -1),
    "Start date must be in the future"
  ),
});

export const profileFormSchema = z.object({
  username: z.string().min(5).max(20),
  email: z.string().email(),
  npassword: z.string().min(8).optional(),
  opassword: z.string().min(8),
});

const MAX_FILE_SIZE = 5000000;
export const blogFormSchema = z.object({
  cover: z.instanceof(File)
    .refine(file => file.type.startsWith('image/'), {
      message: 'Please upload a valid image file for the blog cover.'
    })
    .refine(file => file.size <= MAX_FILE_SIZE, {
      message: 'Max image size is 5mb.'
    })
    .optional(),
  title: z.string()
    .min(5, { message: 'Title must be at least 5 characters long.' })
    .max(100, { message: 'Title cannot exceed 100 characters.' }),
  article: z.string()
    .min(20, { message: 'Article must be at least 20 characters long.' })
    .max(10000, { message: 'Article cannot exceed 10000 characters.' }),
});

// schema end

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

export function formatDateRange(plannerItem: PlannersItem): string {
  const { from, to } = plannerItem.date;
  const daysDifference = differenceInDays(to, from);
  const formattedFrom = format(from, 'dd/MM/yyyy');
  const formattedTo = format(to, 'dd/MM/yyyy');

  return `${daysDifference} Days ∙ ${formattedFrom} - ${formattedTo}`;
}

export function sortPlanners(planners: PlannersItem[], sortOption: string): PlannersItem[] {
  const currentDate = new Date();
  switch(sortOption) {
    case 'duration': 
      return planners.sort((a, b) => differenceInDays(b.date.to, b.date.from) - differenceInDays(a.date.to, a.date.from));
    case 'earliest': 
      return planners.sort((a, b) => a.date.from.getTime() - b.date.from.getTime());
    case 'latest': 
      return planners.sort((a, b) => b.date.from.getTime() - a.date.from.getTime());
    case 'recent': 
      return planners.sort((a, b) => {
        const diffA = Math.abs(a.date.from.getTime() - currentDate.getTime());
        const diffB = Math.abs(b.date.from.getTime() - currentDate.getTime());
        return diffA - diffB;
      });
    case 'recently':  
      return planners.sort((a, b) => b.createAt?.getTime() - a.createAt?.getTime());
    case 'country/city': 
      return planners.sort((a, b) => a.country.text.primary.localeCompare(b.country.text.primary));
    default:
      return [];
  }
}

export function get12HoursForecast(forecastday: ForecastDay[]): Hour[] {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentDay = currentDate.getDate();

  const allHours = forecastday.flatMap(day => day.hour);

  const next12Hours = allHours.filter(hour => {
    const hourDate = new Date(hour.time);
    const hourDay = hourDate.getDate();
    const hourHour = hourDate.getHours();

    // Check if the hour is within the next 12 hours
    return (
      (hourDay === currentDay && hourHour >= currentHour) ||
      (hourDay === currentDay + 1 && hourHour < currentHour)
    );
  }).slice(0, 12);

  // Format the time to 12-hour format
  const formattedNext12Hours = next12Hours.map((hour, index) => {
    if (index == 0) {
      return {
        ...hour,
        time: 'Now'
      }
    }
    const hourDate = new Date(hour.time);
    let hours = hourDate.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const strTime = `${hours}${ampm}`;
    return {
      ...hour,
      time: strTime,
    };
  });

  return formattedNext12Hours;
}

export function get7DaysForecast(forecastday: ForecastDay[], currentDayIndex: number): FormattedDaysForecast[] {
  return forecastday.map((day, index) => {
    const weekdayIndex = (currentDayIndex + index) % 7;
    
    // Sort hours by temperature in descending order
    const sortedHours = [...day.hour].sort((a, b) => b.temp_c - a.temp_c);
    
    // Calculate the number of hours to include in the top 25%
    const top25PercentCount = Math.ceil(sortedHours.length * 0.25);
    
    // Get the hottest 25% hours
    const hottestHours = sortedHours.slice(0, top25PercentCount);
    
    // Sort the hottest hours by hour and format them
    const formattedHottestHours = hottestHours
      .sort((a, b) => new Date(a.time).getHours() - new Date(b.time).getHours())
      .map(hour => ({
        hour: new Date(hour.time).getHours(),
        temp_c: hour.temp_c,
      }));

    return {
      weekday: index === 0 ? 'Today' : weekdays[weekdayIndex],
      condition: day.day.condition,
      maxtemp_c: day.day.maxtemp_c,
      mintemp_c: day.day.mintemp_c,
      hottestHours: formattedHottestHours,
    };
  });
}

export function formatDate(planner: PlannersItem): FormattedDate[] {
  const { from, to } = planner.date;

  const dateList: FormattedDate[] = [];
  let currentDate = new Date(from);

  while (currentDate <= to) {
    const formattedDate: FormattedDate = {
      weekday: currentDate.toLocaleString('en-US', { weekday: 'long' }),
      month: currentDate.toLocaleString('en-US', { month: 'long' }),
      day: currentDate.getDate(),
      year: currentDate.getFullYear(),
    };
    dateList.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
}

export function convertTimestampToDate(timestamp: { seconds: number; nanoseconds: number }) {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}

export function isSameDay(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

export function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject('Failed to convert image to base64.');
      }
    };

    reader.onerror = () => {
      reject('An error occurred while reading the file.');
    };

    reader.readAsDataURL(file);
  });
}
