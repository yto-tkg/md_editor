import type { Markdown } from '../../../types/data'
import Link from 'next/link'

interface DataListProps {
  /**
   * データリスト
   */
  dataList: Markdown[]
}

/**
 * データ一覧
 */
const DataList = ({ dataList }: DataListProps) => {
  return (
    <>
      {dataList.map((m: Markdown, i: number) => (
        <div className='flex p-4' key={m.id}>
          <div className='flex-none w-40 h-7'>{m.title}</div>
          <div className='flex-none w-40 h-7'>{m.body}</div>
          <div className='flex-none w-72 h-7'>{m.createdAt}</div>
          <div className='flex-none w-72 h-7'>{m.updatedAt}</div>
          <div className='flex-none w-32 h-7'><Link href={`/data/${m.id}`}><a>to refer</a></Link></div>
        </div>
      ))}
    </>
  )
}

export default DataList
