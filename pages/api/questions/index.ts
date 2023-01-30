// POST /api/questions
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'

import * as questionRepo from '../../../repositories/questions'
import { authOptions } from '../auth/[...nextauth]'

async function createQuestion(question: {
  title: string
  content: string
  ownerId: string
}) {
  const createdAt = new Date()

  const newQuestion = {
    title: question.title,
    content: question.content,
    createdAt,
    updatedAt: createdAt,
    private: false,
    status: 'OPEN',
    owner: {
      connect: { id: question.ownerId },
    },
  }

  // @ts-ignore
  const result = await questionRepo.create(newQuestion)

  return result
}

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

  switch (req.method) {
    case 'POST':
      return res.status(201).json(
        await createQuestion({
          title: req.body.title,
          content: req.body.content,
          // @ts-ignore
          ownerId: session.user.id,
        })
      )
    default:
      return res.status(405)
  }
}
