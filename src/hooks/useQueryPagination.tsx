import { useSearchParams } from 'react-router'

export const useQueryPagination = () => {
  const [params, setParams] = useSearchParams()

  const search = params.get('search') ?? ''
  const page = Number(params.get('page') ?? 1)
  const limit = Number(params.get('limit') ?? 20)
  const sortBy = params.get('sortBy') ?? 'createdAt'
  const sortOrder = (sortBy === 'createdAt' ? 'desc' : params.get('sortOrder') ?? 'asc') as
    | 'asc'
    | 'desc'
  const categoryId = params.get('categoryId') ?? undefined
  const subcategoryId = params.get('subcategoryId') ?? undefined

  const setQuery = (
    next: Partial<{
      search: string
      page: number
      limit: number
      sortBy: string
      sortOrder: 'asc' | 'desc'
      categoryId: string
      subcategoryId: string
    }>
  ) => {
    setParams(
      {
        search: String(next.search ?? search),
        page: String(next.page ?? page),
        limit: String(next.limit ?? limit),
        sortBy: next.sortBy ?? sortBy,
        sortOrder: (next.sortBy ?? sortBy) === 'createdAt' ? 'desc' : next.sortOrder ?? sortOrder,
        ...((next.categoryId || categoryId) && { categoryId: next.categoryId ?? categoryId }),
        ...((next.subcategoryId || subcategoryId) && { subcategoryId: next.subcategoryId ?? subcategoryId }),
      },
      { replace: true }
    )
  }

  return { search, page, limit, sortBy, sortOrder, categoryId, subcategoryId, setQuery }
}
