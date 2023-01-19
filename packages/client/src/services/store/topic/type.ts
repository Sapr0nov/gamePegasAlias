export type ForumState = {
  cursor: number
  limit: number
}

export interface ITopic {
  Comments: Array<IComment>
  author_id: number
  author_name: string
  createdAt: string
  updatedAt: string
  question: string
  title: string
  topic_id: number
}

export interface IComment {
  Comments: Array<IComment>
  Likes: Array<Like>
  comment_id: number
  author_id: number
  author_name: string
  createdAt: string
  updatedAt: string
  message: string
  topic_id: number
  bind_comment_id?: number
}

export interface Like {
  like_id: number
  comment_id: number
  author_id: number
  topic_id: number
}
