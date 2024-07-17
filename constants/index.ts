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
  {
    label: 'Bookings',
    route: '/bookings'
  }
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
]

export const weekdays: string[] = [
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
];

const planners: PlannersItem[] = [
  {
    pid: 'jcjbdbwcowcwwndnoc12er3432i9',
    name: 'Testing Trip',
    country: 'Hong Kong',
    date: {
      from: new Date('2024-08-01'),
      to: new Date('2024-08-10'),
    },
  },
  {
    pid: 'asdhaskjdhasd12',
    name: 'Summer Vacation',
    country: 'France',
    date: {
      from: new Date('2024-07-15'),
      to: new Date('2024-07-25'),
    },
  },
  {
    pid: 'qweqweqwe1231',
    name: 'Business Trip',
    country: 'USA',
    date: {
      from: new Date('2024-09-01'),
      to: new Date('2024-09-05'),
    },
  },
  {
    pid: 'zxczxcxz12312',
    name: 'Family Holiday',
    country: 'Spain',
    date: {
      from: new Date('2024-10-10'),
      to: new Date('2024-10-20'),
    },
  },
  {
    pid: 'lkjlkjlkj123123',
    name: 'Adventure Trip',
    country: 'Australia',
    date: {
      from: new Date('2024-11-01'),
      to: new Date('2024-11-15'),
    },
  },
  {
    pid: 'poupoiuy12312',
    name: 'Honeymoon',
    country: 'Maldives',
    date: {
      from: new Date('2024-12-01'),
      to: new Date('2024-12-10'),
    },
  },
  {
    pid: 'jhkjhkuy123123',
    name: 'Cultural Exploration',
    country: 'Japan',
    date: {
      from: new Date('2024-06-20'),
      to: new Date('2024-06-30'),
    },
  },
  {
    pid: 'cvbcnvb123123',
    name: 'Winter Wonderland',
    country: 'Switzerland',
    date: {
      from: new Date('2024-12-20'),
      to: new Date('2024-12-30'),
    },
  },
  {
    pid: 'wertqwert123123',
    name: 'City Break',
    country: 'Italy',
    date: {
      from: new Date('2024-05-05'),
      to: new Date('2024-05-12'),
    },
  },
  {
    pid: 'mnbmnb123123',
    name: 'Road Trip',
    country: 'Canada',
    date: {
      from: new Date('2024-07-01'),
      to: new Date('2024-07-14'),
    },
  },
  {
    pid: 'asdfasdf12312',
    name: 'Beach Holiday',
    country: 'Thailand',
    date: {
      from: new Date('2024-08-15'),
      to: new Date('2024-08-25'),
    },
  },
  {
    pid: 'xzcxzv123123',
    name: 'Wildlife Safari',
    country: 'South Africa',
    date: {
      from: new Date('2024-09-10'),
      to: new Date('2024-09-20'),
    },
  },
];

export default planners;