import type { ApiContext, Markdown } from '../../types/data'
import useSWR from 'swr'

export type UseSearchProps = {
  /**
   * タイトル
   */
  title?: string

  /**
   * ソートキー
   */
  sort?: "id" | "title" | "createdAt" | "updatedAt"

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

export type UseSearch = {
  /**
   * 検索にヒットしたデータリスト
   */
  markdowns: Markdown[]

  /**
   * ロードフラグ
   */
  isLoading: boolean

  /**
   * エラーフラグ
   */
  isError: boolean
}

/**
 * 一覧取得APIのカスタムフック
 * @param context APIコンテキスト
 * @param params 検索条件
 * @returns データ一覧
 */
const useSearch = (
  context: ApiContext,
  {
    title,
    sort = 'id',
    order = 'desc',
    offset = 0,
    size = 10,
  }: UseSearchProps = {},
): UseSearch => {
  const path = `${context.apiRootUrl}/markdown/list.json`
  const params = new URLSearchParams()

  title && params.append('title', title)
  sort && params.append('_sort', sort)
  order && params.append('_order', order)
  offset && params.append('_offset', `${offset}`)
  size && params.append('_size', `${size}`)
  const query = params.toString()

  const { data, error } = useSWR<Markdown[]>(
    query.length > 0 ? `${path}?${query}` : path
  )

  return {
    markdowns: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useSearch
