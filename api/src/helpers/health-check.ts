import { orm } from './orm'

export const healthCheck = async () => {
  await orm.$queryRaw`SELECT 1`
}
