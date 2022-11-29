import { Issue, Prisma } from '@prisma/client'
import { orm } from '../../helpers/orm'
import { IssueDTO } from './dto/issue.dto'

function prepareUpdateData<Input>({ articles, ...issue }: IssueDTO): Input {
  let data
  if (articles) {
    data = {
      ...issue,
      articles: {
        create: articles,
      },
    }
  } else {
    data = issue
  }

  return data
}

export async function createIssue(issue: IssueDTO): Promise<Issue> {
  const data = prepareUpdateData<Prisma.IssueCreateInput>(issue)

  const newIssue = await orm.issue.create({
    data,
    select: {
      id: true,
      title: true,
      publishedDate: true,
      articles: true,
    },
  })

  return newIssue
}

export async function updateIssue(
  id: number,
  { articles, ...issue }: IssueDTO
) {
  let newArticles
  let updatedArticles
  let removedArticleIds

  if (articles) {
    newArticles = articles.filter(({ id }) => !id)
    updatedArticles = articles.filter(({ id }) => Boolean(id))
    const updatedIds = updatedArticles.map(({ id }) => id)

    const allArticles = await orm.article.findMany({
      where: {
        issueId: id,
      },
    })

    const removedArticles = allArticles.filter(
      (article) => updatedIds.indexOf(article.id) === -1
    )
    removedArticleIds = removedArticles.map(({ id }) => id)
  }

  const data = prepareUpdateData<Prisma.IssueUpdateInput>({
    ...issue,
    articles: newArticles,
  })

  try {
    // const updatedIssue = await
    const updateIssueAction = orm.issue.update({
      where: { id },
      data,
      include: { articles: true },
    })
    const updateArticlesAction = updatedArticles.map(({ id, ...article }) => {
      return orm.article.update({ where: { id }, data: article })
    })
    const deleteArticlesAction = orm.article.deleteMany({
      where: { id: { in: removedArticleIds } },
    })

    console.log(removedArticleIds)

    const transactionResult = await orm.$transaction([
      deleteArticlesAction,
      ...updateArticlesAction,
      updateIssueAction,
    ])
    const updatedIssue = transactionResult.pop()

    return updatedIssue
  } catch (err) {
    console.error(err)
    /* CODE P2025 - Issue with the relation due to missing record */
    if (err instanceof Prisma.NotFoundError || err.code === 'P2025') {
      return null
    }

    throw err
  }
}

export async function findIssues({ draft = false }: { draft: boolean }) {
  let where = {}
  if (!draft) {
    where = {
      AND: {
        publishedDate: {
          lte: new Date(),
        },

        NOT: {
          publishedDate: null,
        },
      },
    }
  }

  return orm.issue.findMany({ where, include: { articles: true } })
}

export async function getIssue(id: number) {
  return orm.issue.findFirst({ where: { id }, include: { articles: true } })
}

export async function deleteIssue(id: number) {
  try {
    return await orm.issue.delete({ where: { id } })
  } catch (err) {
    /* CODE P2025 - Issue with the relation due to missing record */
    if (err instanceof Prisma.NotFoundError || err.code === 'P2025') {
      return null
    }

    throw err
  }
}
