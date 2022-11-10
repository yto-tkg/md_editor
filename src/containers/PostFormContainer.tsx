import PostForm, { PostFormData } from 'components/organisms/PostForm'
import addMarkdown from 'services/markdown/post-data'
import updateMarkdown from 'services/markdown/put-data'
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
  const handleSave = async (formData: PostFormData) => {
    // TODO 認証チェック

    const putData = {
      id: Number(data?.id),
      title: formData.title,
      body: formData.body
    }

    const postData = {
      title: formData.title,
      body: formData.body,
    }

    try {
      const res = !!data.id ? await updateMarkdown(context, {putData}) : await addMarkdown(context, { postData })
      onSave && onSave(undefined, res)
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message)
        onSave && onSave(err)
      }
    }
  }

  return <PostForm onPostSave={handleSave} referData={data} />
}

export default PostFormContainer
