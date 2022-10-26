import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Layout from 'components/templates/Layout'
import getAllMarkdowns from 'services/markdown/get-all-data'
import { ApiContext, Markdown } from 'types/data'
import SearchPage from './search'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<HomeProps> = ({ allMarkdowns, allMarkdownsCount }: HomeProps) => {

  // データカルーセルをレンダリング
  const renderDataCarousel = (markdowns: Markdown[], allMarkdownsCount: number) => {
    return (
      <>
        <SearchPage dataList={markdowns} allDataCount={allMarkdownsCount} />
      </>
    )
  }

  return (
    <>
      <Layout>
        {renderDataCarousel(allMarkdowns.data, allMarkdownsCount)}
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:8765',
  }

  // トップ10件取得し、静的ページを作成
  // revalidateな状態にし、静的ページを更新する
  const allMarkdowns = await getAllMarkdowns(context, { sort: 'id', order: 'desc', offset: 0, size: 10 })
  const allMarkdownsCount = await getAllMarkdowns(context, { offset: 0, size: 10000 }).then(res => {
    return res.data.length
  })

  return {
    props: {
      allMarkdowns,
      allMarkdownsCount
    },
    revalidate: 10,
  }
}

export default Home
