export async function getIssues({
  draft = false,
}: {
  draft: boolean
}): Promise<Issue[]> {
  const useDraft = draft ? `?draft=${draft}` : ''

  let issues = []
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters${useDraft}`
  )
  issues = await res.json()

  return issues
}

export async function getIssue(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/${id}`
  )
  // TODO: fix error handler
  const issue = await res.json()

  return issue
}

export async function createIssue({
  publishedDate,
  ...issue
}: Omit<Issue, 'id'>) {
  const issueValues = {
    ...issue,
    ...(publishedDate
      ? { publishedDate: new Date(publishedDate).toISOString() }
      : {}),
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters`,
    {
      method: 'POST',
      body: JSON.stringify(issueValues),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const newIssue = await res.json()
  return newIssue
}

export async function updateIssue({ id, publishedDate, ...issue }: Issue) {
  const issueValues = {
    ...issue,
    ...(publishedDate
      ? { publishedDate: new Date(publishedDate).toISOString() }
      : {}),
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(issueValues),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const newIssue = await res.json()

  return newIssue
}

export async function deleteIssue(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters/${id}`,
    {
      method: 'DELETE',
    }
  )

  if (!res.ok) {
    return res.json()
  }
}
