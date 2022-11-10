import { ApiContext, Markdown } from 'types/data'
import { fetcher } from 'utils'

type UpdateMarkdownOptional = 'createdAt' | 'updatedAt'

export type UpdateMarkdownParams = {
  /**
   * 更新するデータ
   */
  putData: Omit<Markdown, UpdateMarkdownOptional>
}

/**
 * PUT API(更新)
 * @param context APIコンテキスト
 * @param params 更新するデータ
 * @returns
 */
const updateMarkdown = async (
  context: ApiContext,
  { putData }: UpdateMarkdownParams,
): Promise<Markdown> => {
  return await fetcher(`${context.apiRootUrl}/markdown/put.json`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify(putData),
  })
}

export default updateMarkdown
