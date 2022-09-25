import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/templates/Layout'
import PostFormContainer from 'containers/PostFormContainer'

const Home: NextPage = () => {
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

export default Home
