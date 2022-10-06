import { ApiContext, Markdown } from "types/data";
import SearchForm, { SearchFormData } from "components/organisms/SearchForm"
import getAllMarkdowns from "services/markdown/get-all-data";

const context: ApiContext = {
  apiRootUrl: process.env.API_BASE_URL || '/api/proxy',
}

interface SearchFormContainerProps {
  /**
   * 検索ボタンが押下されたときのイベントハンドラ
   */
  onSubmit: (searchData: Markdown[], error?: Error) => void
}

/**
 * 検索フォームコンテナ
 */
const SearchFormContainer = ({ onSubmit }: SearchFormContainerProps) => {

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
      onSubmit && onSubmit(markdowns, undefined)
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message)
        onSubmit && onSubmit([], err)
      }
    }
  }
  
  return (
    <SearchForm onSearchSubmit={handleSearch} />
  )

}

export default SearchFormContainer
