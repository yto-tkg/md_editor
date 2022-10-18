import Link from 'next/link'
import type { ApiContext, Markdown } from '../types/data'
import getAllMarkdowns, { GetAllMarkdownsParams } from '../services/markdown/get-all-data'
import { dividerClasses } from '@mui/material'


// deprecated 使っていない
const context: ApiContext = {
  apiRootUrl: process.env.API_BASE_URL || '/api/proxy'
}

/**
 * データリストコンテナ
 */
const DataListContainer = ({
  sort,
  order,
  offset,
  size,
}: GetAllMarkdownsParams) => {
  const { markdowns } = getAllMarkdowns(context, { sort: sort, order: order, offset: offset, size: size })

  return (
    <>
      <div className="flex">
        {markdowns.map((m: Markdown, i: number) => (
          <div key={m.id}>
            <div className='flex-none w-40h-14'>{m.title}</div>
            <div className='flex-none w-40h-14'>{m.body}</div>
            <div className='flex-none w-40h-14'>{m.createdAt}</div>
            <div className='flex-none w-40h-14'>{m.updatedAt}</div>
            <div className='flex-none w-32h-14'><Link href={`/data/${m.id}`}><a>refer</a></Link></div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DataListContainer
