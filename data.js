var moment = require('moment');

module.exports = {
  items: [
    {
      title: 'Первый немного текста',
      image: {
        src: '/dist/images/react.svg',
        alt: 'Alt 1',
        width: '100px',
        height: '100px'
      },
      meta: {
        author: 'Author 1',
        createdAt: moment().format('DD.MM.YYYY'),
        updatedAt: moment().format('DD.MM.YYYY'),
        likes: 1
      }
    },
    {
      title: 'Второй немного текста',
      image: {
        src: '/dist/images/react.svg',
        alt: 'Alt 2',
        width: '100px',
        height: '100px'
      },
      meta: {
        author: 'Author 2',
        createdAt: moment().format('DD.MM.YYYY'),
        updatedAt: moment().format('DD.MM.YYYY'),
        likes: 2
      }
    },
    {
      title: 'Четвертый немного текста',
      image: {
        src: '/dist/images/react.svg',
        alt: 'Alt 3',
        width: '100px',
        height: '100px'
      },
      meta: {
        author: 'Author 3',
        createdAt: moment().format('DD.MM.YYYY'),
        updatedAt: moment().format('DD.MM.YYYY'),
        likes: 1
      }
    }
  ]
};
