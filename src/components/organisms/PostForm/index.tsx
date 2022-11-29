import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Markdown } from 'types/data'
import PostPreview from '../PostPreview'

export type PostFormData = {
  id?: number
  title: string
  body: string
}

interface PostFormProps {
  /*
   * 保存ボタンを押下した時のイベントハンドラ
   */
  onPostSave?: (data: PostFormData) => void

  /*
   * データ 
   */
  referData?: Markdown
}

/**
 * 投稿フォーム
 */
const PostForm = ({ onPostSave, referData }: PostFormProps) => {
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

  const initialData = {
    id: referData?.id,
    title: referData?.title,
    body: referData?.body,
    createdAt: referData?.createdAt,
    updatedAt: referData?.updatedAt,
  }

  const [markdown, setMarkdown] = useState(initialData.body)

  const setData = (e: any) => {
    e.preventDefault()

    setMarkdown(e.target.value)
  }

  const Label = React.memo(() => {
    console.log('111')
    return (
      <h1 className="py-10 text-center text-4xl font-bold">markdown note</h1>
    )
  })

  const Title = () => {
    return (
      <>
        <input
          {...register('title', { required: true })}
          name="title"
          type="text"
          id="post-title"
          placeholder="Title"
          className="mx-auto mb-8 block h-14 w-4/5 rounded-lg border px-5 text-2xl font-bold shadow-lg focus:outline-none"
          value={initialData.title}
        //hasError={!!errors.title}
        />
        {errors.title && (
          <div style={{ color: 'red' }}>Title is required.</div>
        )}
      </>
    )
  }

  const InputForm = React.memo(() => {
    return (
      <form className="h-full" onSubmit={handleSubmit(onSubmit)} style={{ color: 'black' }}>
        <Title />
        <div className="flex justify-between">
          <div className="mx-10 w-1/2">
            <textarea
              {...register('body', { required: true })}
              name="body"
              id="md"
              placeholder="Markdownで記述"
              className="markdown-form mb-5 h-full w-full resize-none rounded-xl border py-4 px-2 shadow-xl focus:outline-none"
              style={{ minHeight: '300px' }}
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
        <input type="hidden" value={initialData.id} />
        <input
          type="submit"
          className="submit-post my-8 mx-auto block h-10 w-36 rounded-md font-bold hover:opacity-70"
        />
      </form>
    )
  })

  return (
    <>
      <Label />
      <InputForm />
    </>
  )
}

export default PostForm
