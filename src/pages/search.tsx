import DataList from 'components/organisms/DataList'
import { error } from 'console'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Markdown } from 'types/data'
import Layout from '../components/templates/Layout'
import SearchFormContainer from '../containers/SearchFormContainer'

interface DataListProps {
  dataList: Markdown[],
  allDataCount: number
}

const SearchPage: NextPage<DataListProps> = ({ dataList, allDataCount }: DataListProps) => {

  // const router = useRouter()
  // const handleSubmit = (err?: Error) => {
  //   if (!err) {
  //     router.push(`/search`)
  //   }
  // }

  const [data, setData] = useState<Markdown[]>(dataList)
  const [allCount, setAllCount] = useState(allDataCount)

  const handleSubmit = (searchData: Markdown[], count?: number, error?: Error) => {
    if (!!error) {
      alert(error)
    }

    setData(searchData.data)
    setAllCount(count ?? allCount)
  }

  if (!!data) {
    return (
      <>
        <SearchFormContainer onSubmit={handleSubmit} dataList={data} allDataCount={allCount} />
      </>
    )
  } else {
    return (
      <>
        <Layout>
          <SearchFormContainer onSubmit={handleSubmit} dataList={data} allDataCount={allCount} />
        </Layout>
      </>
    )
  }
}

export default SearchPage
