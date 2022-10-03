import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import Layout from 'components/templates/Layout'
import getAllMarkdowns from 'services/markdown/get-all-data'
import { ApiContext, Markdown } from 'types/data'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

 const [searchData, setSearchData] = useState()

  const setSearchData = (e: any) => {
    e.preventDefault()

    setSearchData(e.target.value)
  }

const Home: NextPage<HomeProps> = ({ allMarkdowns }: HomeProps) => {
  // データカルーセルをレンダリング
  const renderDataCarousel = (markdowns: Markdown[]) => {
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
      </>
    )
  }

  return (
    <>
      <Layout>
        <div>検索: 
          <form onSubmit={}>
          <textarea placeholder='タイトル検索' value={searchData} onChange={setSearchData}></textarea>
          <input type="submit" value="検索" />
          </form>
        </div>
        {renderDataCarousel(allMarkdowns.data)}
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8765',
  }

  // TODO お気に入り一覧等も取得する際は、Promis.allに置き換える
  // TODO offset, sizeは変更できるように(もっとみる)
  // トップ10件取得し、静的ページを作成
  // 30秒でrevalidateな状態にし、静的ページを更新する
  const allMarkdowns = await getAllMarkdowns(context, { offset: 0, size: 10 })

  return {
    props: {
      allMarkdowns,
    },
    revalidate: 30,
  }
}

export default Home
