import { List, AccordionItemClass } from '~/types/utils'

export const CATEGORIES: List[] = [
  {
    value: 0,
    text: 'Web',
    backgroundColor: '#0033ff',
    color: '#fff'
  },
  {
    value: 1,
    text: 'HTML5',
    backgroundColor: '#0099ff',
    color: '#000'
  },
  {
    value: 2,
    text: 'CSS',
    backgroundColor: '#00ff99',
    color: '#000'
  },
  {
    value: 3,
    text: 'Javascript',
    backgroundColor: '#ffff00',
    color: '#000'
  },
  {
    value: 4,
    text: 'EcmaScript',
    backgroundColor: '#ff9966',
    color: '#000'
  },
  {
    value: 5,
    text: 'PHP',
    backgroundColor: '#000099',
    color: '#fff'
  },
  {
    value: 6,
    text: 'Zendframework',
    backgroundColor: '#009933',
    color: '#fff'
  },
  {
    value: 7,
    text: 'Laravel',
    backgroundColor: '#ff99cc',
    color: '#000'
  },
  {
    value: 8,
    text: 'Scala',
    backgroundColor: '#ff0000',
    color: '#fff'
  },
  {
    value: 9,
    text: 'Playframework',
    backgroundColor: '#666666',
    color: '#fff'
  },
  {
    value: 10,
    text: 'Kotlin',
    backgroundColor: '#ffcc33',
    color: '#000'
  },
  {
    value: 11,
    text: 'Sparkframework',
    backgroundColor: '#cccccc',
    color: '#000'
  },
  {
    value: 12,
    text: 'Heroku',
    backgroundColor: '#ccffff',
    color: '#000'
  },
  {
    value: 13,
    text: 'Netlify',
    backgroundColor: '#99ffcc',
    color: '#000'
  },
  {
    value: 14,
    text: 'AWS',
    backgroundColor: '#660000',
    color: '#fff'
  },
  {
    value: 15,
    text: 'React',
    backgroundColor: '#3300ff',
    color: '#fff'
  },
  {
    value: 16,
    text: 'Vue',
    backgroundColor: '#33ff33',
    color: '#000'
  },
  {
    value: 17,
    text: 'Objective-c',
    backgroundColor: '#cc9933',
    color: '#000'
  },
  {
    value: 18,
    text: 'Swift',
    backgroundColor: '#ff6633',
    color: '#fff'
  },
  {
    value: 19,
    text: 'Firebase',
    backgroundColor: '#ff9900',
    color: '#fff'
  },
  {
    value: 20,
    text: 'TypeScript',
    backgroundColor: '#ff33ff',
    color: '#fff'
  },
  {
    value: 21,
    text: 'Nuxt.js',
    backgroundColor: '#339933',
    color: '#fff'
  },
  {
    value: 22,
    text: 'VuePress',
    backgroundColor: '#33ff99',
    color: '#000'
  },
  {
    value: 23,
    text: 'Gatsby',
    backgroundColor: '#990099',
    color: '#fff'
  },
  {
    value: 24,
    text: 'Angular',
    backgroundColor: '#ff3333',
    color: '#fff'
  },
  {
    value: 25,
    text: 'Elixir',
    backgroundColor: '#660099',
    color: '#fff'
  },
  {
    value: 26,
    text: 'Java',
    backgroundColor: '#ff6600',
    color: '#fff'
  },
  {
    value: 27,
    text: 'Docker',
    backgroundColor: '#1D2088',
    color: '#fff'
  },
  {
    value: 28,
    text: 'MySQL',
    backgroundColor: '#ff9933',
    color: '#fff'
  },
  {
    value: 29,
    text: 'PostgreSQL',
    backgroundColor: '#333399',
    color: '#fff'
  },
  {
    value: 30,
    text: 'Redis',
    backgroundColor: '#cc0000',
    color: '#fff'
  },
  {
    value: 31,
    text: 'Others',
    backgroundColor: '#000000',
    color: '#fff'
  }
]

export const CategoryItems: AccordionItemClass[] = [
  {
    itemClassName: 'Front',
    itemClassItems: [
      {
        itemClassItemName: 'Markup',
        items: [
          {
            itemId: 0,
            itemName: 'Web',
            backgroundColor: '#0033ff',
            color: '#fff'
          },
          {
            itemId: 1,
            itemName: 'HTML5',
            backgroundColor: '#0099ff',
            color: '#000'
          },
          {
            itemId: 2,
            itemName: 'CSS',
            backgroundColor: '#00ff99',
            color: '#000'
          }
        ]
      },
      {
        itemClassItemName: 'JavaScript',
        items: [
          {
            itemId: 3,
            itemName: 'JavaScript',
            backgroundColor: '#ffff00',
            color: '#000'
          },
          {
            itemId: 4,
            itemName: 'EcmaScript',
            backgroundColor: '#ff9966',
            color: '#000'
          },
          {
            itemId: 24,
            itemName: 'Angular',
            backgroundColor: '#ff3333',
            color: '#fff'
          },
          {
            itemId: 15,
            itemName: 'React',
            backgroundColor: '#3300ff',
            color: '#fff'
          },
          {
            itemId: 23,
            itemName: 'Gatsby',
            backgroundColor: '#990099',
            color: '#fff'
          },
          {
            itemId: 16,
            itemName: 'Vue',
            backgroundColor: '#33ff33',
            color: '#000'
          },
          {
            itemId: 21,
            itemName: 'Nuxt.js',
            backgroundColor: '#339933',
            color: '#fff'
          },
          {
            itemId: 22,
            itemName: 'VuePress',
            backgroundColor: '#33ff99',
            color: '#000'
          },
          {
            itemId: 20,
            itemName: 'TypeScript',
            backgroundColor: '#ff33ff',
            color: '#fff'
          }
        ]
      }
    ]
  },
  {
    itemClassName: 'Server',
    itemClassItems: [
      {
        itemClassItemName: 'PHP',
        items: [
          {
            itemId: 5,
            itemName: 'PHP',
            backgroundColor: '#000099',
            color: '#fff'
          },
          {
            itemId: 6,
            itemName: 'Zend',
            backgroundColor: '#009933',
            color: '#fff'
          },
          {
            itemId: 7,
            itemName: 'Laravel',
            backgroundColor: '#ff99cc',
            color: '#000'
          }
        ]
      },
      {
        itemClassItemName: 'Java',
        items: [
          {
            itemId: 26,
            itemName: 'Java',
            backgroundColor: '#ff6600',
            color: '#fff'
          },
          {
            itemId: 8,
            itemName: 'Scala',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            itemId: 9,
            itemName: 'Play',
            backgroundColor: '#666666',
            color: '#fff'
          },
          {
            itemId: 10,
            itemName: 'Kotlin',
            backgroundColor: '#ffcc33',
            color: '#000'
          },
          {
            itemId: 11,
            itemName: 'Spark',
            backgroundColor: '#cccccc',
            color: '#000'
          }
        ]
      },
      {
        itemClassItemName: 'Others',
        items: [
          {
            itemId: 25,
            itemName: 'Elixir',
            backgroundColor: '#660099',
            color: '#fff'
          }
        ]
      }
    ]
  },
  {
    itemClassName: 'Infra',
    itemClassItems: [
      {
        itemClassItemName: 'Database',
        items: [
          {
            itemId: 28,
            itemName: 'MySQL',
            backgroundColor: '#ff9933',
            color: '#fff'
          },
          {
            itemId: 29,
            itemName: 'PostgreSQL',
            backgroundColor: '#333399',
            color: '#fff'
          },
          {
            itemId: 30,
            itemName: 'Redis',
            backgroundColor: '#cc0000',
            color: '#fff'
          }
        ]
      },
      {
        itemClassItemName: 'Full-Managed',
        items: [
          {
            itemId: 14,
            itemName: 'AWS',
            backgroundColor: '#660000',
            color: '#fff'
          },
          {
            itemId: 13,
            itemName: 'Netlify',
            backgroundColor: '#99ffcc',
            color: '#000'
          },
          {
            itemId: 19,
            itemName: 'Firebase',
            backgroundColor: '#ff9900',
            color: '#fff'
          },
          {
            itemId: 12,
            itemName: 'Heroku',
            backgroundColor: '#ccffff',
            color: '#000'
          }
        ]
      }
    ]
  },
  {
    itemClassName: 'Native App',
    itemClassItems: [
      {
        itemClassItemName: 'iOS',
        items: [
          {
            itemId: 17,
            itemName: 'Objective-c',
            backgroundColor: '#cc9933',
            color: '#000'
          },
          {
            itemId: 18,
            itemName: 'Swift',
            backgroundColor: '#ff6633',
            color: '#fff'
          }
        ]
      }
    ]
  },
  {
    itemClassName: 'Others',
    itemClassItems: [
      {
        itemClassItemName: 'Others',
        items: [
          {
            itemId: 31,
            itemName: 'Others',
            backgroundColor: '#000000',
            color: '#fff'
          }
        ]
      }
    ]
  }
]

export const modalStyle = (
  topPosition,
  bottomPosition,
  leftPosition,
  rightPosition,
  width,
  height
) => {
  const ua = navigator.userAgent.toLowerCase()

  // iPad判定 (iPadならTRUE)
  const isIPad = ua.indexOf('ipad') >= 0

  // IE判定 (IEらTRUE)
  const isIE = ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0
  let top = ''
  let left = ''

  if (isIE) {
    top = '25%'
    left = '25%'
  } else if (isIPad) {
    top = '50%'
    left = '50%'
  }
  let baseStyle = {
    position: 'fixed',
    'z-index': 2,
    maxWidth: '900px',
    transform: isIPad ? 'translate(-50%, -50%)' : '',
    width: 'calc(100% - 44px)',
    top: top,
    left: left,
    height: height,
    backgroundColor: '#fff',
    borderRadius: '6px',
    'box-shadow': '0px 5px 5px 0px rgba(0, 0, 0, 0.3)'
  }

  if (topPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      top: topPosition
    })
  }

  if (bottomPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      bottom: bottomPosition
    })
  }

  if (leftPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      left: leftPosition
    })
  }

  if (rightPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      right: rightPosition
    })
  }

  return baseStyle
}
