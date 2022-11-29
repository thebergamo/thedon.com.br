This project is created using [Fastify.js](https://www.fastify.io/) the [blazing fast](https://www.fastify.io/benchmarks/) Node.js web framework.

## Why Fastify over Express?

Express is a great web framework from Node.js ecossystem and is the defacto choice web framework, but in general it's being for a long time in maintainance mode and no big updates are coming out to it for some time already.

It is a really great framework, but requires a lot of setup up front to have some API "production ready", while using Fastify.js provides already great defaults and a powerful ecossytem.

Fastify.js inherits some great features from [Hapi.js](https://hapi.dev/) such as schemas for both inputs and outputs of your API out-of-the-box which is a good practice in general to avoid leaking API contracts.

In overall, Fastify.js core team maintains a really good set of core plugins that can be used to improve even more its already powerful core library. Comparing features of raw Express.js and Fastify.js have a much more complete set of features without compromising any performance for it.

In summary, Fastify.js without any added plugin is already considered a production ready with its default settings, while with Express you need to have more knowledge to produce a production ready API and add couple of middlewares for even simple features such as parsing JSON body.

## Getting Started

This project uses [docker](https://www.docker.com/) in order to make its development easier with the database.

To start the PostgreSQL database, please use the following command:

```sh
docker-compose up
```

And copy the `.env.sample` into `.env`

```sh
cp .env.sample .env
```

> You need to set proper `GITHUB_TOKEN` in order to the Github GraphQL API to work.

Install dependencies - I recommend to use [PNPM](https://pnpm.io/) instead of NPM as it has better performance and module resolution.
If you don't have it, get take a look into its [installation page](https://pnpm.io/installation) (its simple)

```
pnpm install
```

First, run the development server:

```bash
pnpm run dev
```

Server will be accepting requests under the address [http://localhost:3001](http://localhost:3001)

## Available Endpoints

### GET /api/github

Example Response

```json
[
  {
    "name": "start-hapiness",
    "description": "Boilerplate for Hapi + MongoDB API :)",
    "url": "https://github.com/thebergamo/start-hapiness",
    "stars": 78,
    "language": "JavaScript"
  },
  {
    "name": "k7",
    "description": "Connect you database with Hapijs made easy :vhs:",
    "url": "https://github.com/thebergamo/k7",
    "stars": 34,
    "language": "JavaScript"
  },
  {
    "name": "good-console",
    "description": "Console reporting for Good process monitor",
    "url": "https://github.com/hapijs/good-console",
    "stars": 74,
    "language": "JavaScript"
  },
  {
    "name": "vimfiles",
    "description": "My vimfiles",
    "url": "https://github.com/thebergamo/vimfiles",
    "stars": 3,
    "language": "Vim Script"
  },
  {
    "name": "realworld-graphql",
    "description": "RealWorld framework implementation for GraphQL",
    "url": "https://github.com/thebergamo/realworld-graphql",
    "stars": 80,
    "language": "JavaScript"
  },
  {
    "name": "react-native-fbsdk-next",
    "description": "",
    "url": "https://github.com/thebergamo/react-native-fbsdk-next",
    "stars": 467,
    "language": "Java"
  }
]
```

### GET /api/newsletters

This endpoint accepts also `?draft=true` query param that is used by "admins" to see all issues despite being "published" or not.

Example Response

```json
[
  {
    "title": "New Issue 2",
    "publishedDate": "2022-11-22T00:00:00.000Z",
    "id": 2
  }
]
```

### GET /api/newsletters/:id

Example Request

```json
{
  "title": "New Issue 2",
  "publishedDate": "",
  "articles": [
    {
      "title": "amazing",
      "description": "great",
      "url": "http://thedon.com.br"
    }
  ],
  "id": 3
}
```

### POST /api/newsletters

Example Body

```json
{
  "title": "New Issue 2",
  "articles": [
    {
      "title": "amazing",
      "description": "great",
      "url": "http://thedon.com.br"
    }
  ]
}
```

Example Response

```
{
	"title": "New Issue 2",
	"publishedDate": "",
	"articles": [
		{
			"title": "amazing",
			"description": "great",
			"url": "http://thedon.com.br"
		}
	],
	"id": 3
}
```

### PUT /api/newsletters/:id

> This endpoint expect the full body of the issue including the articles. If article is not included, it means it is removed from the list.
> In case you would like to update an article id must be included inside the article array. Otherwise it is considered new.

Example Body

```json
{
  "title": "New Issue 2",
  "publishedDate": "2022-11-22T00:00:00.000Z",
  "articles": [
    {
      "id": 1,
      "title": "amazing",
      "description": "great",
      "url": "http://thedon.com.br"
    },
    {
      "title": "what a beatufiul day",
      "description": "great 3",
      "url": "http://thedon.com.br"
    }
  ]
}
```

Example Response

```json
{
  "title": "New Issue 2",
  "publishedDate": "2022-11-22T00:00:00.000Z",
  "articles": [
    {
      "id": 1,
      "title": "amazing",
      "description": "great 3",
      "url": "http://thedon.com.br"
    },
    {
      "id": 5,
      "title": "what a beatufiul day",
      "description": "great 3",
      "url": "http://thedon.com.br"
    }
  ],
  "id": 2
}
```

### DELETE /api/newsletters/:id

In case of successful delete, no body is provided, but only 200 OK response.

You can test the API using the [Insomnia](https://insomnia.rest/) collection available inside the [/docs](/docs) folder.

## Learn More

To learn more about Fastify.js, take a look at the following resources:

- [Fastify.js Documentation](https://www.fastify.io/docs/latest/) - learn about Fastify.js features and API.

This project also uses Prisma ORM, take a look at the following resources:

- [Prisma Documentation](https://www.prisma.io/) - Check it out the docs.

Other tools that worth a look:

- [Fluent JSON Schema](https://github.com/fastify/fluent-json-schema)
- [Undici](https://github.com/nodejs/undici)
- [env-schema](https://www.npmjs.com/package/env-schema)
- [http-errors](https://www.npmjs.com/package/http-errors)

Thinks that improve quality and standarization of the project:

- [ESLint](https://eslint.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)

Future improvements would have for testing:

- [Jest](https://jestjs.io/)
