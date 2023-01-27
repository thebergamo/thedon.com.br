// PUT /api/questions/[id]/answers/[aid]
// DELETE /api/questions/[id]/answers/[aid]
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' })
}
