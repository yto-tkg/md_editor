import { red } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import { Markdown } from 'types/data'
import DataList from '../DataList'

export type SearchFormData = {
  title?: string
  sort?: "id" | "title" | "createdAt" | "updatedAt"
  order?: 'asc' | 'desc'
  offset?: number
  size?: number
}

interface SearchFormProps {
  /**
   * 検索ボタンを押下したときのイベントハンドラ
   */
  onSearchSubmit?: (data: SearchFormData) => void
  
  /**
   *子要素
   */
  children: React.ReactNode
}

/**
 * 検索フォーム
 */
const SearchForm = ({ onSearchSubmit, children }: SearchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SearchFormData>()

  const onSubmit = (data: SearchFormData) => {
    onSearchSubmit && onSearchSubmit(data)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>      
      <input
        {...register('title', {required: true})}
        name= "title"
        type="text"
        placeholder="Titleを検索"
        className="mx-auto mb-8 block h-14 w-4/5 rounded-lg border px-5 text-2xl font-bold shadow-lg focus:outline-none"
      />
        {errors.title && (
          <div style={{color: 'red'}}>Title is required.</div>
        )}
      <input type="submit" className="submit-post my-8 mx-auto block h-10 w-36 rounded-md font-bold hover:opacity-70" />
      {children}
    </form>
  )
}

export default SearchForm
