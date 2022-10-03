import Link from 'next/link'
import type {ApiContext, Markdown} from '../types/data'
import getAllMarkdowns, {GetAllMarkdownsParams} from '../services/markdown/get-all-data'

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
  const {markdowns} = getAllMarkdowns(context, { sort: sort, order: order, offset: offset, size: size })
  
  return (
  <table>
    <tbody>
            <tr>
              <th>title</th>
              <th>content</th>
              <th>register time</th>
              <th>update time</th>
              <th>refer</th>
            </tr>
          </tbody>
          <tbody>
              {markdowns.map((m: Markdown, i: number) => (
                <tr>
                  <td>{m.title}</td>
                  <td>{m.body}</td>
                  <td>{m.createdAt}</td>
                  <td>{m.updatedAt}</td>
                  <td><Link href={`/data/${m.id}`}><a>refer</a></Link></td>
                </tr>
              ))}
          </tbody>
        </table>
  )
}

export default DataListContainer
