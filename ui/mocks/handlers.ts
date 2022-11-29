import { rest } from 'msw'

type Repo = {
  name: string
  description: string
  url: string
  stars: number
  language: string
}

type Article = {
  title: string
  description: string
  url: string
}

type Issue = {
  id: number
  title: string
  cover?: string
  publishedDate?: Date
  articles: Article[]
}

const github = [
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/github`,
    (_req, res, ctx) => {
      return res(
        ctx.json<Repo[]>([
          {
            name: 'start-hapiness',
            description: 'Boilerplate for Hapi + MongoDB API :)',
            url: 'https://github.com/thebergamo/start-hapiness',
            stars: 78,
            language: 'javascript',
          },
          {
            name: 'k7',
            description: 'Connect your database with Hapijs made easy 📼',
            url: 'https://github.com/thebergamo/k7',
            stars: 34,
            language: 'javascript',
          },
          {
            name: 'hapijs/good-console',
            description: 'Console reporting for Good process monitor',
            url: 'https://github.com/hapijs/good-console',
            stars: 74,
            language: 'javascript',
          },
          {
            name: 'vimfiles',
            description: 'My vimfiles',
            url: 'https://github.com/thebergamo/vimfiles',
            stars: 3,
            language: 'vim script',
          },
          {
            name: 'realworld-graphql',
            description: 'RealWorld framework implementation for GraphQL',
            url: 'https://github.com/thebergamo/realworld-graphql',
            stars: 81,
            language: 'javascript',
          },
          {
            name: 'react-native-fbsdk-next',
            description: 'React Native Facebook SDK',
            url: 'https://github.com/thebergamo/react-native-fbsdk-next',
            stars: 485,
            language: 'java',
          },
        ])
      )
    }
  ),
]

const issues: Issue[] = [
  {
    id: 1,
    title: "Let's get started",
    cover:
      'https://ci3.googleusercontent.com/proxy/PK7qaCLM6tHDip6V6ii8VMvOUaCiY9yBmZJQs7b247mJ5hrJWcqt6FOBuvEbUzK59LLKky57vVIqGWaVTUL3nHOjqsBy0SHbQPqfoBkYK5QWZUgoceZjVt_hjAwi0T83PeG2_G3P8-DoiFgnH9lT1Q59sLI_=s0-d-e1-ft#https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/diqsng6gre4qzf9gfeue.jpg',
    publishedDate: new Date('2022-10-01T10:10:10.000Z'),
    articles: [
      {
        title: 'Rome v10: Rust-Powered JS Linting and Formatting',
        description:
          "A project founded by the original creator of Babel naturally provokes interest. Rome’s ambitious mission is to unify all the frontend dev tools you’d need into one, and formatting and linting is where they’ve started with this curiously numbered release. Shouldn't it should be Rome X? 😁",
        url: 'https://javascriptweekly.com/link/131605/0069e2bb5b',
      },
      {
        title: 'Rome v10: Rust-Powered JS Linting and Formatting',
        description:
          "A project founded by the original creator of Babel naturally provokes interest. Rome’s ambitious mission is to unify all the frontend dev tools you’d need into one, and formatting and linting is where they’ve started with this curiously numbered release. Shouldn't it should be Rome X? 😁",
        url: 'https://javascriptweekly.com/link/131605/0069e2bb5b',
      },
    ],
  },
]

const newsletter = [
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters`,
    (req, res, ctx) => {
      const allowDraft = req.url.searchParams.get('draft')

      const draftIssue = allowDraft
        ? [
            {
              id: 2,
              title: 'No longer waited',
              articles: [
                {
                  title: 'Rome v10: Rust-Powered JS Linting and Formatting',
                  description:
                    "A project founded by the original creator of Babel naturally provokes interest. Rome’s ambitious mission is to unify all the frontend dev tools you’d need into one, and formatting and linting is where they’ve started with this curiously numbered release. Shouldn't it should be Rome X? 😁",
                  url: 'https://javascriptweekly.com/link/131605/0069e2bb5b',
                },
              ],
            },
          ]
        : []
      return res(ctx.json<Issue[]>([...issues, ...draftIssue]))
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters`,
    async (req, res, ctx) => {
      const issue: Issue = await req.json<Issue>()
      return res(
        ctx.status(201),
        ctx.json<Issue>({
          ...issue,
          id: 4,
        })
      )
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/1`,
    async (req, res, ctx) => {
      return res(ctx.json<Issue>(issues[0]))
    }
  ),
  rest.put(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/1`,
    async (req, res, ctx) => {
      const issue: Issue = await req.json<Issue>()
      return res(
        ctx.json<Issue>({
          ...issues[0],
          ...issue,
        })
      )
    }
  ),
  rest.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/1`,
    async (req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200))
    }
  ),
  rest.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/1`,
    async (req, res, ctx) => {
      const issue: Partial<Issue> = await req.json<Partial<Issue>>()
      return res(
        ctx.json<Issue>({
          ...issues[0],
          ...issue,
        })
      )
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/1/article`,
    async (req, res, ctx) => {
      const article = await req.json<Article>()
      issues[0].articles.push(article)
      return res(ctx.status(201), ctx.json<Issue>(issues[0]))
    }
  ),
  rest.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/1/article/2`,
    async (_req, res, ctx) => {
      return res(ctx.json<Issue>(issues[0]))
    }
  ),
]

export const handlers = [...github, ...newsletter]
