export const MENU_LIST = [
  {
    title: 'tip',
    url: '/tip',
    src: 'tip.png',
    flex: 3
  },
  {
    title: 'qiita',
    url: '/qiita',
    src: 'qiita.png',
    flex: 3
  },
  {
    title: 'flight',
    url: '/flight',
    src: 'takeoff.png',
    flex: 3
  },
  {
    title: 'chara',
    url: '/chara',
    src: 'nyanko.png',
    flex: 3
  },
  {
    title: 'upload',
    url: '/upload',
    src: 'camera.png',
    flex: 3
  },
  {
    title: 'event',
    url: '/event',
    src: 'event.png',
    flex: 3
  },
  {
    title: 'setting',
    url: '/setting',
    src: 'setting.png',
    flex: 3
  }
]

export const SOCIAL_MENU_LIST = [
  {
    name: 'slack',
    url: 'https://jiyuujinjs.slack.com/'
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/jiyuujinlab'
  },
  {
    name: 'github',
    url: 'https://github.com/jiyuujin'
  },
  {
    name: 'bitbucket',
    url: 'https://bitbucket.org/jiyuujin'
  }
]

export const TIP_HEADER_LIST = [
  {
    text: '',
    value: 'time',
    sortable: true
  },
  {
    text: 'Action',
    value: 'action',
    sortable: false
  }
]

export const QIITA_HEADER_LIST = [
  {
    text: '',
    value: 'updated_at',
    sortable: true
  },
  {
    text: 'Likes',
    value: 'likes_count',
    sortable: true
  }
]

export const IMAGE_HEADER_LIST = [
  {
    text: '',
    value: 'title',
    sortable: true
  },
  {
    text: 'Image',
    value: 'image',
    sortable: false
  },
  {
    text: 'Action',
    value: 'action',
    sortable: false
  }
]

export const FLIGHT_HEADER_LIST = [
  {
    text: '',
    value: 'time',
    sortable: true
  },
  {
    text: 'Airline',
    value: 'airline',
    sortable: false
  },
  {
    text: 'Departure/Arrival',
    value: 'departure_arrival',
    sortable: false
  },
  {
    text: 'BoardingType',
    value: 'boardingType',
    sortable: false
  },
  {
    text: 'Action',
    value: 'action',
    sortable: false
  }
]

export const SETTING_HEADER_LIST = [
  {
    text: 'Setting',
    value: 'setting',
    sortable: false
  },
  {
    text: 'Action',
    value: 'action',
    sortable: false
  }
]

export default {}
