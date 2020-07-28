import { Anchor, IRawData, Page } from 'src/lib/IRawData'

export class TreeHelper {
  private data: IRawData

  constructor(data: IRawData) {
    this.data = data
  }

  private setPage = (
    id: string,
    key: string,
    value?: number | string | boolean
  ): boolean => {
    const page = this.data.entities.pages[id]
    const newPages: [string, Page][] = Object.entries(
      this.data.entities.pages
    ).map(([k, v]) => {
      if (k === id) {
        return [
          k,
          {
            ...v,
            [key]: value,
          },
        ]
      }
      return [k, v]
    })
    const pages: {
      [key: string]: Page
    } = {}
    newPages.forEach(([k, v]) => {
      pages[k] = v
    })
    this.data = {
      ...this.data,
      entities: {
        ...this.data.entities,
        pages,
      },
    }
    return !!page
  }

  private setAnchor = (
    id: string,
    key: string,
    value?: number | string | boolean
  ): boolean => {
    const anchor = this.data.entities.anchors[id]
    const newAnchors: [string, Anchor][] = Object.entries(
      this.data.entities.anchors
    ).map(([k, v]) => {
      if (k === id) {
        return [
          k,
          {
            ...v,
            [key]: value,
          },
        ]
      }
      return [k, v]
    })
    const anchors: {
      [key: string]: Anchor
    } = {}
    newAnchors.forEach(([k, v]) => {
      anchors[k] = v
    })
    this.data = {
      ...this.data,
      entities: {
        ...this.data.entities,
        anchors,
      },
    }
    return !!anchor
  }

  private clearSelect = (): void => {
    const pages = Object.values(this.data.entities.pages).filter(
      ({ isShow }) => isShow
    )
    pages.forEach(({ id }) => {
      this.setPage(id, 'isSelect', false)
    })
    const anchors = Object.values(this.data.entities.anchors).filter(
      ({ isSelect }) => isSelect
    )
    anchors.forEach(({ id }) => {
      this.setAnchor(id, 'isSelect', false)
    })
  }

  public selectPage = (page: Page): void => {
    const { id, isSelect, isShow } = page
    this.clearSelect()
    if (this.data.topLevelIds.includes(id)) {
      const pages = Object.values(this.data.entities.pages).filter(
        ({ id, isSelect }) => this.data.topLevelIds.includes(id) && isSelect
      )
      pages.forEach(({ id }) => {
        this.setPage(id, 'isSelect', false)
      })
    }
    this.setPage(id, 'isSelect', !isSelect)
    this.setPage(id, 'isShow', !isShow)
  }

  public selectAnchor = (page: Page, anchor: Anchor): void => {
    const { id, isSelect } = anchor
    this.clearSelect()
    this.setAnchor(id, 'isSelect', !isSelect)
  }

  public getChildren = (page: Page): Page[] => {
    return Object.values(this.data.entities.pages).filter(
      (i) => i.parentId === page.id
    )
  }

  public getAnchors = (page: Page): Anchor[] => {
    return Object.values(this.data.entities.anchors).filter(
      (i) => i.parentId === page.id
    )
  }

  public getTree = (): Page[] => {
    return Object.values(this.data.entities.pages).filter((page) =>
      this.data.topLevelIds.includes(page.id)
    )
  }
}
