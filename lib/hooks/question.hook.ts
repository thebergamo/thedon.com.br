import { useQuery } from '@tanstack/react-query'
import { fetchQuestion } from '../manage-questions'

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: ['questions', id],
    queryFn: () => fetchQuestion(id),
  })
}
