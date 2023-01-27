import prisma from '../lib/prisma'

export async function getBulkUsers(ids: string[]) {
  return prisma.user.findMany({
    where: {
      id: { in: ids },
    },
  })
}
