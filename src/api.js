/* eslint-disable camelcase */

/**
 * Namockovane odpovedi od serveru
 */

export default {
  listTests: () => Promise.resolve([
    {
      id: 'e646295e-a5f4-41c4-89ad-6258de0df130',
      name: 'Znalosti o přežvýkavcích',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 'fae88bd6-a6a0-4f58-9464-abe79b3732ab',
      name: 'Predloha testu',
      description: 'Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století.',
    },
  ]),
  getPopularTags: () => Promise.resolve([
    {
      id: 'd27e46fc-e3ae-43ee-8a00-96db74ce6851',
      text: 'Autoškola',
    },
    {
      id: 'd27e46fc-e3ae-43ee-8a00-96db74ce6853',
      text: 'Harry Potter',
    },
  ]),
  getTestById: id => {
    if (id === 'e646295e-a5f4-41c4-89ad-6258de0df130') {
      return Promise.resolve({
        id: 'e646295e-a5f4-41c4-89ad-6258de0df130',
        name: 'Jmeno testu',
        description: 'Popis testu',
        ranking: {
          value: 4.7,
          count: 123,
        },
        comments: [
          {
            id: 'comment1',
            text: 'blablabla',
            author_id: 'author1',
          },
          {
            id: 'comment2',
            text: 'lalalalala',
            author_id: 'author2',
          },
        ],
      })
    } else {
      return Promise.resolve({
        id: 'fae88bd6-a6a0-4f58-9464-abe79b3732ab',
        name: 'Jmeno druheho testu',
        description: 'Popis druheho testu',
        ranking: {
          value: 4.2,
          count: 23,
        },
        comments: [],
      })
    }
  },
}
