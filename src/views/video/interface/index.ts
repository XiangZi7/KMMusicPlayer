interface Artist {
  img1v1Url: string
  name: string
}

export interface MVDetail {
  name: string
  cover: string
  desc: string
  publishTime: string
  playCount: number
  subCount: number
  artists: Artist[]
  videoGroup: { name: string }[]
}

export interface Comment {
  id: number
  user: {
    avatarUrl: string
    nickname: string
  }
  timeStr: string
  ipLocation: {
    location: string
  }
  content: string
}

export interface CommentResponse {
  comments: Comment[]
  total: number
}

export interface SimilarPlaylistsResponse {
  mvs: SimilarPlaylistsPlaylist[] // Array of similar playlists
}
export interface SimilarPlaylistsPlaylist {
  id: number
  name: string
  cover: string
  artistName: string
  playCount: number // Number of plays
}
