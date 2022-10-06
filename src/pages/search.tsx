import DataList from 'components/organisms/DataList'
import { error } from 'console'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Markdown } from 'types/data'
import Layout from '../components/templates/Layout'
import SearchFormContainer from '../containers/SearchFormContainer'

const SearchPage: NextPage = () => {

 // const router = useRouter()
 // const handleSubmit = (err?: Error) => {
 //   if (!err) {
 //     router.push(`/search`)
 //   }
 // }
  
  const [data, setData] = useState<Markdown[]>([])
 
  const handleSubmit = (searchData: Markdown[], error?: Error) => {
    if (!!error) {
      alert(error)
    }

    setData(searchData.data)
  }

  return (
    <>
      <Layout>
        <SearchFormContainer onSubmit={handleSubmit} />
        <DataList dataList={data} />
      </Layout>
    </>
  )
}

export default SearchPage
