import type { ApiContext, Markdown } from '../../types/data'
import { fetcher } from 'utils'

export type GetMarkdownParams = {
  /**
   * ID
   */
  id: number
}

/**
 * 詳細取得API
 * @param context APIコンテキスト
 * @returns 詳細データ
 */
const getMarkdown = async (
  context: ApiContext,
  {
    id
  }: GetMarkdownParams,
): Promise<Markdown> => {
  const path = `${context.apiRootUrl}/markdown/get.json`

  return await fetcher(`${path}?id=${id}`, {
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  })
}

export default getMarkdown
