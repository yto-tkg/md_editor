import type { ApiContext, Markdown } from '../../types/data'
import { fetcher } from 'utils'

export type GetAllMarkdownsParams = {
  /**
   * タイトル
   */
  title?: string

  /**
   * ソートキー
   */
  sort?: keyof Omit<Markdown, ''>

  /**
   * 昇順or降順
   */
  order?: 'asc' | 'desc'

  /**
   * offset
   */
  offset?: number

  /**
   * size
   */
  size?: number
}

/**
 * 一覧取得API
 * @param context APIコンテキスト
 * @returns データ一覧
 */
const getAllMarkdowns = async (
  context: ApiContext,
  {
    title,
    sort = 'id',
    order = 'desc',
    offset = 0,
    size = 10,
  }: GetAllMarkdownsParams = {},
): Promise<Markdown[]> => {
  const path = `${context.apiRootUrl}/markdown/list.json`
  const params = new URLSearchParams()

  title && params.append('title', title)
  sort && params.append('_sort', sort)
  order && params.append('_order', order)
  offset && params.append('_offset', `${offset}`)
  size && params.append('_size', `${size}`)
  const query = params.toString()

  return await fetcher(query.length > 0 ? `${path}?${query}` : path, {
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  })
}

export default getAllMarkdowns
