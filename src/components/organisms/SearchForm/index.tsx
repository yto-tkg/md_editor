import { red } from '@mui/material/colors'
import { useState } from 'react'
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
  * 全データ件数
   */
  allDataCount: number

  /**
   *子要素
   */
  children: React.ReactNode
}

/**
 * 検索フォーム
 */
const SearchForm = ({ onSearchSubmit, allDataCount, children }: SearchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>()

  const [sort, setSort] = useState({})
  const [searchContent, setSearchContent] = useState('')
  const [offset, setOffset] = useState(0)
  const [size, setSize] = useState(10)
  const [paging, setPaging] = useState(0)

  const setSearchData = (e: any) => {
    e.preventDefault()
    setSearchContent(e.target.value)
  }

  const onSubmit = (data: SearchFormData, sortKey?: string, pagingKey?: number) => {
    if (!!sortKey && typeof sortKey === 'string') {
      if (sort.key === sortKey) {
        setSort({ ...sort, order: -sort.order })
        data.order = -sort.order
      } else {
        setSort({ key: sortKey, order: 1 })
        data.order = 1
      }
    }

    let newOffset;
    if (!!pagingKey) {
      console.log('pagingKey: ', pagingKey)
      setPaging(pagingKey)
      console.log('paging: ', paging)
      if (pagingKey == -1) {
        newOffset = (offset - size) < 1 ? 0 : (offset - size)
        console.log('newOffset: ', newOffset)
        setOffset(newOffset)
      } else {
        newOffset = offset + size
        console.log('else newOffset: ', newOffset)
        setOffset(newOffset)
      }
    }

    data.title = searchContent
    data.sort = sortKey
    data.offset = newOffset
    data.size = size

    onSearchSubmit && onSearchSubmit(data)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title', { required: true })}
        name="title"
        type="text"
        placeholder="Titleを検索"
        className="mx-auto mb-8 block h-14 w-4/5 rounded-lg border px-5 text-2xl font-bold shadow-lg focus:outline-none"
        onChange={setSearchData}
      />
      {errors.title && (
        <div style={{ color: 'red' }}>Title is required.</div>
      )}
      <input type="submit" className="submit-post my-8 mx-auto block h-10 w-36 rounded-md font-bold hover:opacity-70" />

      <div>
        {offset == 0 ? 1 : offset}
        -
        {offset == 0 ? offset + size : offset + size - 1 > allDataCount ? allDataCount : offset + size - 1} ({allDataCount}件中)
        <span style={{ display: offset == 0 ? 'none' : '' }} onClick={() => onSubmit(handleSubmit(onSubmit), null, -1)}>←</span>
        <span style={{ display: offset + size - 1 == allDataCount ? 'none' : '' }} onClick={() => onSubmit(handleSubmit(onSubmit), null, 1)}>→</span>
      </div>

      <div className="flex p-4">
        <div className="flex-none w-40 h-14" onClick={() => onSubmit(handleSubmit(onSubmit), 'title')}>title</div>
        <div className="flex-none w-40 h-14" onClick={() => onSubmit(handleSubmit(onSubmit), 'body')}>content</div>
        <div className="flex-none w-72 h-14" onClick={() => onSubmit(handleSubmit(onSubmit), 'createdAt')}>register time</div>
        <div className="flex-none w-72 h-14" onClick={() => onSubmit(handleSubmit(onSubmit), 'updatedAt')}>update time</div>
        <div className="flex-none w-32 h-14">refer</div>
      </div>
      {children}
    </form>
  )
}

export default SearchForm
