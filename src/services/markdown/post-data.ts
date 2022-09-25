import { ApiContext, Markdown } from 'types/data'
import { fetcher } from 'utils'

type AddMarkdownOptional = 'id' | 'createdAt' | 'updatedAt'

export type AddMarkdownParams = {
  /**
   * 追加するデータ
   */
  postData: Omit<Markdown, AddMarkdownOptional>
}

/**
 * POST API(新規追加)
 * @param context APIコンテキスト
 * @param params 新規追加するデータ
 * @returns 新規追加したデータのid
 */
const addMarkdown = async (
  context: ApiContext,
  { postData }: AddMarkdownParams,
): Promise<Markdown> => {
  return await fetcher(`${context.apiRootUrl}/markdown/post.json`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify(postData),
  })
}

export default addMarkdown
