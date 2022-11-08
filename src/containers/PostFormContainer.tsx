import PostForm, { PostFormData } from 'components/organisms/PostForm'
import addMarkdown from 'services/markdown/post-data'
import { ApiContext, Markdown } from 'types/data'

const context: ApiContext = {
  apiRootUrl: process.env.API_BASE_PATH || '/api/proxy',
}

interface PostFormContainerProps {
  /**
   * 保存されたときのイベントハンドラ
   */
  onSave?: (error?: Error, markdown?: Markdown) => void

  /**
   * データ
   */
  data?: Markdown
}

/**
 * 保存フォームコンテナ
 */
const PostFormContainer = ({ onSave, data }: PostFormContainerProps) => {
  // TODO 認証ガード
  // TODO ローディング

  // 保存ボタン押下した時
  const handleSave = async (data: PostFormData) => {
    // TODO 認証チェック

    const postData = {
      title: data.title,
      body: data.body,
    }

    try {
      const res = await addMarkdown(context, { postData })
      onSave && onSave(undefined, res)
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message)
        onSave && onSave(err)
      }
    }
  }

  return <PostForm onPostSave={handleSave} data={data} />
}

export default PostFormContainer
