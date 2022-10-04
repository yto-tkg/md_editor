import useSearch, { UseSearchProps } from "services/markdown/use-search-data";
import { ApiContext, Markdown } from "types/data";
import SearchForm, { SearchFormData } from "components/organisms/SearchForm"


const context: ApiContext = {
  apiRootUrl: process.env.API_BASE_URL || '/api/proxy',
}

interface SearchFormContainerProps {
  /**
   * 検索ボタンが押下されたときのイベントハンドラ
   */
  onSumbit?: (error?: Error, searchData?: Markdown[]) => void
}

/**
 * 検索フォームコンテナ
 */
const SearchFormContainer = ({ onSumbit }: SearchFormContainerProps) => {

  const handleSearch = async (data: SearchFormData) => {

    // 検索ボタン押下したとき
    const searchData = {
      title: data.title,
      sort: data.sort,
      order: data.order,
      offset: data.offset,
      size: data.size,
    }

    try {
      const { markdowns, isLoading } = await useSearch(context, { searchData })
      onSumbit && onSumbit(undefined, markdowns)
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message)
        onSumbit && onSumbit(err)
      }
    }

    return <SearchForm onSearchSubmit={handleSearch} />
  }
}

export default SearchFormContainer
