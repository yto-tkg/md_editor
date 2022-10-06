import type {Markdown} from '../../../types/data'
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
const DataList = ({dataList}: DataListProps) => {
  return (
      <>
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
            {dataList.map((m: Markdown, i: number) => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.body}</td>
                <td>{m.createdAt}</td>
                <td>{m.updatedAt}</td>
                <td><Link href={`/data/${m.id}`}><a>refer</a></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
  )
}

export default DataList
