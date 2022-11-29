import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const firstIssue = await prisma.issue.create({
    data: {
      title: 'We never forget our first time...',
      publishedDate: '2022-11-24T20:00:00.000Z',
      articles: {
        create: [
          {
            title: 'Taxonomy - Cool Next.js 13 example app',
            description:
              'While Next.js 13 is just released couple of weeks ago, there is interesting implementation about good use cases of it + some other cool tools to test.',
            url: 'https://tx.shadcn.com/',
          },
          {
            title:
              'Free4Dev - Nothing better than free tech stuff to experiment',
            description:
              "Have in mind your next future adventure in the startup and creators world? What about doing it with free stuff? That's exactly what this link is about, free stuff to build your next millionaire idea!",
            url: 'https://free-for.dev/',
          },
          {
            title:
              'DivKit - Server Driven UIs - Yes, it is a thing and you will love it',
            description:
              'If you have ever developed for Native Mobile Apps or even React Native one, you know how tedious is the process of new app version. What if I told you that you can change how your app looks like from the server instead of upgrading the whole app for changing couple of labels place? Take a look into DivKit grab some ideas to build your own or use it!',
            url: 'https://divkit.tech/en/',
          },
        ],
      },
    },
  })

  console.info('Seeded, first issue created!', firstIssue)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
