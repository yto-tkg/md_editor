import type { NextPage, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/templates/Layout'
import PostFormContainer from 'containers/PostFormContainer'
import { ApiContext } from 'types/data'
import getMarkdown from 'services/markdown/get-data'

type DataPageProps = InferGetStaticPropsType<typeof getStaticProps>

const DataPage: NextPage<DataPageProps> = ({
  id,
  data
}: DataPageProps) => {
  const router = useRouter()

  const handleSave = (err?: Error) => {
    if (!err) {
      router.push(`/`)
    }
  }

  return (
    <>
      <Layout>
        <PostFormContainer onSave={handleSave} />
      </Layout>
    </>
  )
}

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  
  if (!params || typeof params.id !== 'number') {
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
