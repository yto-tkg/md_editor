import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/templates/Layout'
import SearchFormContainer from '../containers/SearchFormContainer'

const SearchPage: NextPage = () => {

  const router = useRouter()
  const handleSubmit = (err?: Error) => {
    if (!err) {
      router.push(`/search`)
    }
  }

  return (
    <>
      <Layout>
        <SearchFormContainer onSubmit={handleSubmit} />
      </Layout>
    </>
  )
}

export default SearchPage
