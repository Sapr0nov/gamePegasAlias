export type Topic = {
  topic_id: number
  title: string
  Comments: Array<Comment>
  question: string
  author_id: number
  author_name: string
  createdAt: string
  updatedAt: string
}

export type Comment = {
  comment_id: number
  author_id: number
  author_name: string
  message: string
  topic_id?: number
  bind_comment_id?: number
  createdAt: string
  updatedAt: string
}
