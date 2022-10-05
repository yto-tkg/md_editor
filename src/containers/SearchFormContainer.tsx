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
  onSubmit?: (error?: Error, searchData?: Markdown[]) => void
}

/**
 * 検索フォームコンテナ
 */
const SearchFormContainer = ({ onSubmit }: SearchFormContainerProps) => {

  const handleSearch = async (data: SearchFormData) => {

    // 検索ボタン押下したとき
    const searchData = {
      title: data.title,
      sort: data.sort,
      order: data.order,
      offset: Number(data.offset),
      size: Number(data.size),
    }

    try {
      const { markdowns, isLoading } = await useSearch(context, { ...searchData })
      onSubmit && onSubmit(undefined, markdowns)
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message)
        onSubmit && onSubmit(err)
      }
    }
  }
  
  return (
    <SearchForm onSearchSubmit={handleSearch} />
  )

}

export default SearchFormContainer
