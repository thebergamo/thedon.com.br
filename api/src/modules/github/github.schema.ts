import S from 'fluent-json-schema'

const repoSchema = S.object()
  .prop('name', S.string().required())
  .prop('description', S.string())
  .prop('url', S.string().format('url').required())
  .prop('stars', S.number().required())
  .prop('language', S.string().required())

export const getRepos = {
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
  response: {
    200: S.array().items(repoSchema).default([]),
  },
}
