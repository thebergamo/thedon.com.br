import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { searchPosts } from '../../../lib/blog'
import { searchQuestions } from '../../../lib/read-questions'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method !== 'GET') {
    return res.status(405)
  }

  const term = req.query.term as string

  const [questions, posts] = await Promise.all([
    searchQuestions({ term }, Boolean(session)),
    searchPosts(term),
  ])

  return res.status(200).json({
    questions,
    posts,
  })
}
