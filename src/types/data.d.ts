// マークダウンデータ
export type Markdown = {
  id: number
  title: string
  body: string
  createdAt?: string
  updatedAt?: string
}

// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string
}
