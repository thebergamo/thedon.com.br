export async function fetchQuestion(id: string): Promise<Question> {
  const res = await fetch(`/api/questions/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export async function createQuestion(
  payload: Omit<Question, 'id'>
): Promise<Question> {
  const res = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export async function makePrivate({
  id,
  makePrivate,
}: {
  id: string
  makePrivate: boolean
}) {
  const res = await fetch(`/api/questions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      private: makePrivate,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
export async function makeFeatured({
  id,
  makeFeatured,
}: {
  id: string
  makeFeatured: boolean
}) {
  const res = await fetch(`/api/questions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: makeFeatured ? 'FEATURED' : 'OPEN',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export async function updateQuestion(payload: Question): Promise<Question> {
  const { id, title, content } = payload
  const res = await fetch(`/api/questions/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export async function addAnswer({
  id,
  content,
}: {
  id: string
  content: string
}) {
  const res = await fetch(`/api/questions/${id}/answers`, {
    method: 'POST',
    body: JSON.stringify({
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export async function deleteQuestion(id: string) {
  await fetch(`/api/questions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
