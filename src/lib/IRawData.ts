export interface Page {
  id: string
  title: string
  disqus_id: string
  parentId?: string
  url?: string
  level: number
  tabIndex: number
  anchors?: string[]
  pages?: string[]
  selectFirstChildOnClick?: boolean
  isSelect?: boolean
  isShow?: boolean
}

export interface Anchor {
  parentId: string
  level: number
  id: string
  title: string
  disqus_id: string
  anchor: string
  url: string
  isSelect?: boolean
}

export interface Entities {
  pages: {
    [key: string]: Page
  }
  anchors: {
    [key: string]: Anchor
  }
}

export interface IRawData {
  entities: Entities
  topLevelIds: string[]
}