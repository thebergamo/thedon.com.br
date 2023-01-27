This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies - I recommend to use [PNPM](https://pnpm.io/) instead of NPM as it has better performance and module resolution.
If you don't have it, get take a look into its [installation page](https://pnpm.io/installation) (its simple)

```sh
pnpm install
```

First, run the development server:

```sh
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Next.js provides a nice out-of-the-box structure to run our react projects besides having a really powerful server side and static rendering for most pages and combined with Vercel is a quick win for performance and best practices all together.

This project also uses TailwindCSS, take a look at the following resources:

- [TailwindCSS Documentation](https://tailwindcss.com/) - Check it out the endpoints

Tailwind helps to avoid complex CSS code and having to deal with the specificity directly, of course other techniques could be used such as [BEM](https://getbem.com/introduction/) and [CSS Modules](https://github.com/css-modules/css-modules), but in general in my project inside my current project we're already using it and it have proven being very useful in production and battle tested also.

To make running things locally easier, it also uses MSW (Mock Service Worker) to provide mocks to external APIs

- [MSW](https://mswjs.io/) - Check it out the documentation

Other tools that worth a look:

- [React Hook Form](https://react-hook-form.com/)
- [Next Intl](https://next-intl-docs.vercel.app/)
- [Next-Auth](https://next-auth.js.org/)
- [TanStack/React-Query](https://tanstack.com/query/v4)
- [TanStack/React-Table](https://tanstack.com/table/v8)

Thinks that improve quality and standarization of the project:

- [ESLint](https://eslint.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)

Future improvements would have for testing:

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress](https://www.cypress.io/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
