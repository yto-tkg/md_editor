import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const PostPreview = (props: any) => {
  return (
    <div className="mr-10 h-full w-full">
      <div className="markdown-preview mb-5 h-full w-full overflow-scroll rounded-xl border bg-white py-4 px-2 shadow-xl">
        <ReactMarkdown remarkPlugins={[gfm]} unwrapDisallowed={false}>
          {props.markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default PostPreview
