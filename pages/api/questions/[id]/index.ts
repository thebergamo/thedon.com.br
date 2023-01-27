// PUT /api/questions/[id]
// DELETE /api/questions/[id]
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { getQuestion } from '../../../../lib/read-questions'
import * as questionRepo from '../../../../repositories/questions'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  const questionId = req.query.id as string
  if (req.method === 'GET') {
    const response = await getQuestion(questionId)

    return res.status(200).json(response)
  }

  if (!session) {
    return res.status(401).json({
      status: 401,
      message: 'You must be authenticated',
    })
  }

  if (['PATCH', 'PUT'].includes(<string>req.method)) {
    const response = await questionRepo.update(questionId, req.body)

    await res.revalidate(`/ama/${questionId}`)

    return res.status(200).json(response)
  }

  if (req.method === 'DELETE') {
    await questionRepo.remove(questionId)

    await res.revalidate(`/ama`)
    return res.status(204)
  }

  return res.status(405)
}
