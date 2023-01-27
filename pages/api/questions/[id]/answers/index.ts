// POST /api/questions/[id]/answers
import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { getQuestion } from '../../../../../lib/read-questions'
import * as questionRepo from '../../../../../repositories/questions'
import { authOptions } from '../../../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({
      status: 401,
      message: 'You must be authenticated',
    })
  }
  if (req.method !== 'POST') {
    return res.status(405)
  }

  const questionId = req.query.id as string
  const question = await getQuestion(questionId)
  const createdAt = new Date()

  const answer = {
    id: new ObjectId().toString(),
    content: req.body.content,
    updatedAt: createdAt,
    createdAt,
    // @ts-ignore
    ownerId: session.user.id,
  }

  question.answers.push(answer)

  await questionRepo.update(questionId, {
    // @ts-ignore
    // eslint-disable-next-line no-unused-vars
    answers: question.answers.map(({ owner, ...a }: Question) => a),
  })

  const response = await getQuestion(questionId)

  return res.status(201).json(response)
}
