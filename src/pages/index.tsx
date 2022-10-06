import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import Layout from 'components/templates/Layout'
import getAllMarkdowns from 'services/markdown/get-all-data'
import { ApiContext, Markdown } from 'types/data'
import { useRouter } from 'next/router'
import DataList from 'components/organisms/DataList'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<HomeProps> = ({ allMarkdowns }: HomeProps) => {


  // データカルーセルをレンダリング
  const renderDataCarousel = (markdowns: Markdown[]) => {
    return (
        <DataList dataList={markdowns} />
    )
  }

  return (
    <>
      <Layout>
        <Link href={`/search`}>検索</Link>
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
  const allMarkdowns = await getAllMarkdowns(context, { sort: 'id', order: 'desc', offset: 0, size: 10 })

  return {
    props: {
      allMarkdowns,
    },
    revalidate: 30,
  }
}

export default Home
