export type TPage = {
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
}

export type TAnchor = {
  parentId: string
  level: number
  id: string
  title: string
  disqus_id: string
  anchor: string
  url: string
}

export type TEntities = {
  pages: {
    [key: string]: TPage
  }
  anchors: {
    [key: string]: TAnchor
  }
}

export type TreeData = {
  entities: TEntities
  topLevelIds: string[]
}
