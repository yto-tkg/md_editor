import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PostPreview from '../PostPreview'

export type PostFormData = {
  title: string
  body: string
}

interface PostFormProps {
  /*
   * 保存ボタンを押下した時のイベントハンドラ
   */
  onPostSave?: (data: PostFormData) => void
}

/**
 * 投稿フォーム
 */
const PostForm = ({ onPostSave }: PostFormProps) => {
  // React Hook Formの使用
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormData>()
  const onSubmit = (data: PostFormData) => {
    onPostSave && onPostSave(data)
  }

  const [markdown, setMarkdown] = useState()

  const setData = (e: any) => {
    e.preventDefault()

    setMarkdown(e.target.value)
  }

  return (
    <>
      <h1 className="py-10 text-center text-4xl font-bold">markdown note</h1>
      <div className="editor shrink grow">
        <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('title', { required: true })}
            name="title"
            type="text"
            id="post-title"
            placeholder="Title"
            className="mx-auto mb-8 block h-14 w-4/5 rounded-lg border px-5 text-2xl font-bold shadow-lg focus:outline-none"
          //hasError={!!errors.title}
          />
          {errors.title && (
            <div style={{ color: 'red' }}>Title is required.</div>
          )}
          <div className="flex justify-between">
            <div className="mx-10 w-1/2">
              <textarea
                {...register('body', { required: true })}
                name="body"
                id="md"
                placeholder="Markdownで記述"
                className="markdown-form mb-5 h-full w-full resize-none rounded-xl border py-4 px-2 shadow-xl focus:outline-none"
                style={{ minHeight: '1000px' }}
                value={markdown}
                //hasError={!!error}
                onChange={setData}
              ></textarea>
              {errors.body && (
                <div style={{ color: 'red' }}>Cotent is required.</div>
              )}
            </div>
            <div className="mr-10 w-1/2">
              <PostPreview markdown={markdown} />
            </div>
          </div>
          <input
            type="submit"
            className="submit-post my-8 mx-auto block h-10 w-36 rounded-md font-bold hover:opacity-70"
          />
        </form>
      </div>
    </>
  )
}

export default PostForm
