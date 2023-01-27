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
    ownerId: session.user.id,
  }

  console.log('LOL', question)
  question.answers.push(answer)
  console.log('LOL', question.answers)

  await questionRepo.update(questionId, {
    answers: question.answers.map(({ owner, ...a }) => a),
  })

  const response = await getQuestion(questionId)

  return res.status(201).json(response)
}
