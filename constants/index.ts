import { CategorizedSearchTabParams, NavigationTabProps, PlannerTabsParams, SearchTabParams } from "@/types/components";

export const navLinks: NavigationTabProps[] = [
  {
    label: 'Discover',
    route: '/discover'
  },
  {
    label: 'Planner',
    route: '/planner'
  },
  {
    label: 'Blog',
    route: '/blog'
  },
  // {
  //   label: 'Bookings',
  //   route: '/bookings'
  // }
];

export const searchTabs: SearchTabParams[] = [
  {
    label: 'All',
    imgUrl: '/root/all.svg',
    categories: [
      10001, 10002, 10004, 10024, 10027, 10068,
      13003, 13065, 13028, 13040, 13062, 13032,
      14005, 14004, 16000, 17000
    ],
  },
  {
    label: 'Attractions',
    imgUrl: '/root/attractions.svg',
    categories: [16000]
  },
  {
    label: 'Food and drink',
    imgUrl: '/root/food and drink.svg',
    categories: [13003, 13065, 13028, 13040, 13062, 13032]
  },
  {
    label: 'Entertainments',
    imgUrl: '/root/entertainment.svg',
    categories: [10001, 10002, 10004, 10024, 10027, 10068]
  },
  {
    label: 'Shopping',
    imgUrl: '/root/shopping.svg',
    categories: [17000]
  },
  {
    label: 'Events',
    imgUrl: '/root/event.svg',
    categories: [14005, 14004]
  },
];

export const categorizedSearchTabs: CategorizedSearchTabParams[] = [
  {
    label: 'All',
    imgUrl: '/root/all.svg',
    categories: {
      'Popular Places': [
        10001, 10002, 10004, 10024, 10027, 10068,
        13003, 13065, 13028, 13040, 13062, 13032,
        14005, 14004, 16000, 17000
      ]
    }
  },
  {
    label: 'Attractions',
    imgUrl: '/root/attractions.svg',
    categories: {
      'Historical and Cultural Sites': [16020, 16031, 16041],
      'Parks and Gardens': [16034, 16035, 16036, 16037, 16039, 16017, 16008],
      'Nature and Trails': [16004, 16019, 16027, 16028],
      'Water Bodies': [16002, 16003],
    }
  },
  {
    label: 'Food and drink',
    imgUrl: '/root/food and drink.svg',
    categories: {
      'Restaurants': [13065],
      'Desserts and Cafes': [13040, 13032],
      'Bars': [13003],
      'Night Market': [13062]
    }
  },
  {
    label: 'Entertainments',
    imgUrl: '/root/entertainment.svg',
    categories: {
      'Family and Amusement': [10002, 10001, 10056],
      'Movie Theaters': [10024],
      'Cultural and Educational': [10027]
    }
  },
  {
    label: 'Shopping',
    imgUrl: '/root/shopping.svg',
    categories: {
      'Shopping Spots': [17039, 17114, 17115],
      'Arts and Crafts Stores': [17003],
      'Bookstores': [17018],
      'Market': [17144],
    }
  },
  {
    label: 'Events',
    imgUrl: '/root/event.svg',
    categories: {
      'Events': [14005, 14004]
    }
  },
]

export const placeSearchFields: string[] = ['fsq_id', 'name', 'rating', 'categories'];

export const placeDetailsFields: string[] = [
  'fsq_id',

  'description', // for overview
  'tips',

  'hours', // for opening hours
  'hours_popular',

  'features', // for services / payment

  'location', // for basic info
  'tel',
  'email',
  'website',
  'social_media',

  'geocodes', // for map
  
  'photos', // for more photos

  'price', // for extra info maybe
  'popularity',
];

export const weekdays: string[] = [
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
];

export const plannerTabs: PlannerTabsParams[] = [
  {
    label: 'places',
    imgUrl: '/root/places.svg'
  },
  {
    label: 'calendar',
    imgUrl: '/root/calendar.svg'
  },
  {
    label: 'map',
    imgUrl: '/root/map.svg'
  },
  {
    label: 'weather',
    imgUrl: '/root/weather.svg'
  },
  {
    label: 'edit',
    imgUrl: '/root/edit.svg'
  },
];

export const times: string[] = [
  '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
  '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
  '12 AM'
];
