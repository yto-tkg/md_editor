import type { NextPage, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/templates/Layout'
import PostFormContainer from 'containers/PostFormContainer'

const DataPage: NextPage = () => {
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
  
  const dataId = Number(params.id)
}

export default DataPage
