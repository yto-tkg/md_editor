import { red } from '@mui/material/colors'
import { argv0 } from 'process'
import { useEffect, useState } from 'react'
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

const PAGE_SIZE = [10, 20, 30]

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
  const [displayOffset, setDisplayOffset] = useState(0)
  const [displayLimit, setDisplayLimit] = useState(0)
  const [isDisplayPrevBtn, setIsDisplayPrevBtn] = useState('')
  const [isDisplayNextBtn, setIsDisplayNextBtn] = useState('')


  const setSearchData = (e: any) => {
    e.preventDefault()
    setSearchContent(e.target.value)
  }

  useEffect(() => {
    setDisplayOffset(offset + 1)
    setDisplayLimit(offset == 0 ? offset + size : offset + size - 1 >= allDataCount ? allDataCount : offset + size)
  }, [offset])

  useEffect(() => {
    setIsDisplayPrevBtn(offset == 0 ? 'none' : '')
    setIsDisplayNextBtn(offset + size >= allDataCount ? 'none' : '')
  }, [offset])

  const onSubmit = (data: SearchFormData) => {
    const dataOrder = data.order ?? sort.order
    data.title = searchContent
    data.sort = data.sort ?? sort.key
    data.order = dataOrder == 1 ? 'asc' : 'desc'
    data.offset = data.offset ?? offset
    data.size = size

    onSearchSubmit && onSearchSubmit(data)
  }

  const onSubmitBySortKey = (data: SearchFormData, sortKey: string) => {
    let newSortOrder
    if (sort.key === sortKey) {
      newSortOrder = -sort.order
      setSort({ ...sort, order: newSortOrder })
    } else {
      newSortOrder = 1
      setSort({ key: sortKey, order: newSortOrder })
    }

    data.sort = sortKey
    data.order = newSortOrder

    setOffset(0)
    data.offset = 0

    onSubmit(data)
  }

  const onSubmitByPaging = (data: SearchFormData, pagingKey: number) => {
    setPaging(pagingKey)

    let newOffset
    if (pagingKey == -1) {
      newOffset = (offset - size) < 1 ? 0 : (offset - size)
      setOffset(newOffset)
    } else {
      newOffset = offset + size
      setOffset(newOffset)
    }

    data.offset = newOffset
    onSubmit(data)
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
        {displayOffset} - {displayLimit} ({allDataCount}件中)
        <span style={{ display: isDisplayPrevBtn }} onClick={() => onSubmitByPaging(handleSubmit(onSubmit), -1)}>←</span>
        <span style={{ display: isDisplayNextBtn }} onClick={() => onSubmitByPaging(handleSubmit(onSubmit), 1)}>→</span>
      </div>

      <div className="flex p-4">
        <div className="flex-none w-40 h-14" onClick={() => onSubmitBySortKey(handleSubmit(onSubmit), 'title')}>title</div>
        <div className="flex-none w-40 h-14" onClick={() => onSubmitBySortKey(handleSubmit(onSubmit), 'body')}>content</div>
        <div className="flex-none w-72 h-14" onClick={() => onSubmitBySortKey(handleSubmit(onSubmit), 'createdAt')}>register time</div>
        <div className="flex-none w-72 h-14" onClick={() => onSubmitBySortKey(handleSubmit(onSubmit), 'updatedAt')}>update time</div>
        <div className="flex-none w-32 h-14">refer</div>
      </div>
      {children}
    </form>
  )
}

export default SearchForm
