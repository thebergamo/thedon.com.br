import S from 'fluent-json-schema'

const article = S.object()
  .prop('id', S.integer())
  .prop('title', S.string().required())
  .prop('description', S.string())
  .prop('url', S.string().format('url').required())

const createIssue = S.object()
  .prop('title', S.string().required())
  .prop('publishedDate', S.string().format('date-time'))
  .prop('articles', S.array().items(article))

const issue = S.object().prop('id', S.integer().required()).extend(createIssue)

export const newIssue = {
  body: S.object().extend(createIssue),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
  response: {
    201: issue,
  },
}

export const listIssues = {
  queryString: S.object().prop('draft', S.boolean().default(false)),
  params: S.object(),
  headers: S.object(),
  response: {
    200: S.array().items(issue),
  },
}

export const getIssue = {
  queryString: S.object(),
  params: S.object().prop('id', S.number().required()),
  headers: S.object(),
  response: {
    200: issue,
  },
}

export const updateIssue = {
  body: S.object().extend(createIssue),
  queryString: S.object(),
  params: S.object().prop('id', S.number().required()),
  headers: S.object(),
  response: {
    200: issue,
  },
}

export const deleteIssue = {
  queryString: S.object(),
  params: S.object().prop('id', S.number().required()),
  headers: S.object(),
  response: {
    200: S.null(),
  },
}
