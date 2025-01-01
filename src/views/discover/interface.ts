interface Playlist {
  id: number
  name: string
  description: string
  coverImgUrl: string
}

export interface Banner {
  imageUrl: string
}

export interface Album {
  id: number
  name: string
  picUrl: string
  artist: {
    name: string
  }
}

interface PlaylistCat {
  name: string
}

export interface State {
  Playlist: Playlist[]
  bannersList: Banner[]
  subList: PlaylistCat[]
  currentCat: string
  newestLsit: Album[]
}
