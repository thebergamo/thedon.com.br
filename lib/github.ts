export async function fetchPinnedRepos() {
  const query = `
  {
    user(login: "thebergamo") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            primaryLanguage {
              id
              name
            }
            stargazerCount
            url
          }
        }
      }
    }
  }
    `
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Not able to fetch data from github.com - ${response.status} - ${errorText}`
    )
  }

  const body = await response.json()
  const repos = body?.data?.user?.pinnedItems?.nodes?.map(
    // @ts-ignore
    ({ name, description, primaryLanguage, stargazerCount, url }) => ({
      name,
      description,
      url,
      language: primaryLanguage.name,
      stars: stargazerCount,
    })
  )

  return repos
}
