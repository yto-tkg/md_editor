import type { NextPage, GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/templates/Layout'
import PostFormContainer from 'containers/PostFormContainer'
import { ApiContext, Markdown } from 'types/data'
import getMarkdown from 'services/markdown/get-data'
import getAllMarkdowns from 'services/markdown/get-all-data'

type DataPageProps = InferGetStaticPropsType<typeof getStaticProps>

const DataPage: NextPage<DataPageProps> = ({
  id,
  data
}: DataPageProps) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const handleSave = (err?: Error) => {
    if (!err) {
      router.push(`/`)
    }
  }

  return (
    <>
      <Layout>
        <PostFormContainer onSave={handleSave} data={data} />
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || '/api/proxy',
  }

  const allMarkdowns = await getAllMarkdowns(context, { offset: 0, size: 10000 }).then(res => {return res.data})
  const paths = allMarkdowns.map((m: Markdown[]) => `/data/${m.id}`)

  return {paths, fallback: true}

}

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  
  if (!params) {
    throw new Error('param is illegal')
  }

  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || '/api/proxy',
  }

  // データを取得し、静的ページを作成
  // 10秒でstaleな状態にし、静的ページを更新する
  const dataId = Number(params.id)
  const data = await getMarkdown(context, {id: dataId}) 

  return {
    props: {
      id: dataId,
      data,
    },
    revalidate: 10,
  }
}

export default DataPage
