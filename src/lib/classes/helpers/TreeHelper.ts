import { Anchor, ITreeData, Page } from 'src/lib/classes/models/ITreeData'

export class TreeHelper {
  private data: ITreeData

  constructor(data: ITreeData) {
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
      ({ isSelect }) => isSelect
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

  /*
   * Get page children
   * @description Filters all pages where the parentId is equal to the page id
   * @param {Page} page - the page by which we will search for pages
   * @returns {Page[]} - array of pages
   */
  public getChildren = (page: Page): Page[] => {
    return Object.values(this.data.entities.pages).filter(
      (i) => i.parentId === page.id
    )
  }

  /*
   * Get all anchors by page
   * @description Filters all anchors where the parentId is equal to the page id
   * @param {Page} page - the page by which we will search for anchors
   * @returns {Anchor[]} - array of anchors
   */
  public getAnchors = (page: Page): Anchor[] => {
    return Object.values(this.data.entities.anchors).filter(
      (i) => i.parentId === page.id
    )
  }

  /*
   * Get all pages objects from topLevelIds
   * @description Filters all pages where the page id includes in topLevelIds array
   * @returns {Page[]} - array of pages
   */
  public getTree = (): Page[] => {
    return Object.values(this.data.entities.pages).filter((page) =>
      this.data.topLevelIds.includes(page.id)
    )
  }
}
