import { Article, Issue } from '@prisma/client'

export type IssueDTO = Omit<Issue, 'id'> & { articles?: Article[] }
