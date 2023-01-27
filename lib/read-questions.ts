import * as questionsRepo from '../repositories/questions'
import { convertMarkdownToHtml } from './blog'

export async function getFeaturedQuestions(isLogged: boolean) {
  const onlyPublic = isLogged ? {} : { private: false }
  return questionsRepo.list({ status: 'FEATURED', ...onlyPublic })
  // return questionsList.filter((q) => q.status === 'FEATURED')
}

export async function getQuestions(
  {
    limit,
    offset,
  }: {
    limit: number
    offset: number
  },
  isLogged: boolean
) {
  const onlyPublic = isLogged ? {} : { private: false }
  return questionsRepo.list(onlyPublic, { limit, offset })
}

export async function getQuestion(id: string) {
  const question = await questionsRepo.get(id)

  if (!question) {
    throw new Error('404')
  }

  question.content = await convertMarkdownToHtml(question.content)

  question.answers = await Promise.all(
    question.answers.map(async (answer) => {
      return {
        ...answer,
        content: await convertMarkdownToHtml(answer.content),
      }
    })
  )

  return question
}
