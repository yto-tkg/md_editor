import { ApiContext, Markdown } from "types/data";
import SearchForm, { SearchFormData } from "components/organisms/SearchForm"
import getAllMarkdowns from "services/markdown/get-all-data";
import DataList from "components/organisms/DataList";

const context: ApiContext = {
  apiRootUrl: process.env.API_BASE_URL || '/api/proxy',
}

interface SearchFormContainerProps {
  /**
   * 検索ボタンが押下されたときのイベントハンドラ
   */
  onSubmit: (searchData: Markdown[], error?: Error) => void

  /**
   *データリスト
   */
  dataList: Markdown[]

  /**
  * 全データ件数
   */
  allDataCount: number
}

/**
 * 検索フォームコンテナ
 */
const SearchFormContainer = ({ onSubmit, dataList, allDataCount }: SearchFormContainerProps) => {

  const handleSearch = async (data: SearchFormData) => {
    // 検索ボタン押下したとき
    const searchData = {
      title: data.title,
      sort: data.sort ?? 'id',
      order: data.order ?? 'desc',
      offset: !!data.offset ? Number(data.offset) : 0,
      size: !!data.size ? Number(data.size) : 100,
    }

    try {
      const markdowns = await getAllMarkdowns(context, { ...searchData })

      if (!!searchData.title) {
        searchData.offset = 0
        searchData.size = 10000
        allDataCount = await getAllMarkdowns(context, { ...searchData }).then((res) => {
          return res.data.length
        })
      }

      onSubmit && onSubmit(markdowns, allDataCount, undefined)
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message)
        onSubmit && onSubmit([], err)
      }
    }
  }

  return (
    <SearchForm onSearchSubmit={handleSearch} allDataCount={allDataCount}>
      <DataList dataList={dataList} />
    </SearchForm>
  )

}

export default SearchFormContainer
