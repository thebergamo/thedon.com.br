import * as questionsRepo from '../repositories/questions'
import { convertMarkdownToHtml } from './blog'

export async function getFeaturedQuestions() {
  return questionsRepo.list({ status: 'FEATURED' })
  // return questionsList.filter((q) => q.status === 'FEATURED')
}

export async function getQuestions({
  limit,
  offset,
}: {
  limit: number
  offset: number
}) {
  return questionsRepo.list({}, { limit, offset })
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
