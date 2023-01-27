// POST /api/questions
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'

import * as questionRepo from '../../../repositories/questions'
import { authOptions } from '../auth/[...nextauth]'

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

  const createdAt = new Date()

  const newQuestion = {
    title: req.body.title,
    content: req.body.content,
    createdAt,
    updatedAt: createdAt,
    private: false,
    status: 'OPEN',
    owner: {
      connect: { id: session.user.id },
    },
  }

  const result = await questionRepo.create(newQuestion)

  res.status(201).json(result)
}
