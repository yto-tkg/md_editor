import { useForm } from 'react-hook-form'

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
}

/**
 * 検索フォーム
 */
const SearchForm = ({ onSearchSubmit }: SearchFormProps) => {
  const {
    handleSubmit,
  } = useForm<SearchFormData>()

  const onSubmit = (data: SearchFormData) => {
    onSearchSubmit && onSearchSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="title"
        type="text"
        placeholder="Titleを検索"
        className="mx-auto mb-8 block h-14 w-4/5 rounded-lg border px-5 text-2xl font-bold shadow-lg focus:outline-none"
      />
      <input type="submit" className="submit-post my-8 mx-auto block h-10 w-36 rounded-md font-bold hover:opacity-70" />
    </form>
  )
}

export default SearchForm
