import { healthCheck } from './helpers/health-check'
import fastify from 'fastify'
import pino from 'pino'
import issueRouter from './modules/issues/issue.router'
import githubRouter from './modules/github/github.router'
import loadConfig from './config'
import HttpError from 'http-errors'

loadConfig()

const port = (process.env.API_PORT || 3001) as number

const startServer = async () => {
  try {
    const server = fastify({
      logger: pino({ level: 'info' }),
    })

    server.register(require('@fastify/cors'))
    server.register(require('@fastify/helmet'))
    // Define Router here
    server.register(issueRouter, { prefix: '/api/newsletters' })
    server.register(githubRouter, { prefix: '/api/github' })

    server.setErrorHandler((error, _request, reply) => {
      server.log.error(error)

      if (HttpError.isHttpError(error)) {
        reply.send(error)
      } else {
        reply.send(new HttpError.InternalServerError('Something went wrong'))
      }
    })

    server.get('/health-check', async (_request, reply) => {
      try {
        await healthCheck()
        reply.status(200).send()
      } catch (e) {
        reply.status(500).send()
      }
    })

    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          server.close().then((err) => {
            console.log(`close application on ${signal}`)
            process.exit(err ? 1 : 0)
          })
        )
      }
    }

    await server.listen({ port })
  } catch (e) {
    console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})

startServer()
