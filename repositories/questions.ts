import prisma from '../lib/prisma'
import { getBulkUsers } from './users'

type QuestionStatus = 'FEATURED' | 'CLOSED' | 'OPEN'

type Criteria = {
  private?: boolean
  status?: QuestionStatus
}

type Pagination = {
  limit: number
  offset: number
}

export async function list(criteria: Criteria, pagination?: Pagination) {
  const { limit, offset } = pagination || { limit: 10, offset: 0 }
  const questions = await prisma.question.findMany({
    where: criteria,
    take: limit,
    skip: offset,
    include: {
      owner: true,
    },
  })

  return questions
}

export async function get(id: string) {
  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      owner: true,
    },
  })

  if (!question) {
    return
  }

  const answerOwners = question.answers.map(({ ownerId }) => ownerId)

  const ownerList = await getBulkUsers(answerOwners)
  const owners = ownerList.reduce((acc, owner) => {
    return {
      ...acc,
      [owner.id]: owner,
    }
  }, {})

  question.answers = question.answers.map((answer) => ({
    ...answer,
    // @ts-ignore
    owner: (owners[answer.ownerId] || null) as Owner,
  }))

  return question
}

export async function create(question: Question) {
  const newQuestion = await prisma.question.create({
    // @ts-ignore
    data: question,
  })

  return newQuestion
}

export async function update(id: string, question: Partial<Question>) {
  const updated = await prisma.question.update({
    // @ts-ignore
    data: {
      ...question,
      updatedAt: new Date(),
    },
    where: {
      id,
    },
  })

  return updated
}

export async function remove(id: string) {
  await prisma.question.delete({
    where: {
      id,
    },
  })
}
