import { TAnchor, TreeData, TPage } from './types'

export class TreeUtil {
  protected data: TreeData

  /*
   * Creates a helper object with the required methods
   * @constructor
   */
  constructor(data: TreeData) {
    this.data = data
  }

  /*
   * Get page by id
   * @public
   * @param {string} id
   * @returns {TPage} page
   */
  public getPageById = (id: string): TPage => {
    return this.data.entities.pages[id]
  }

  /*
   * Get pages by array of ids
   * @public
   * @param {string[]} ids
   * @returns {TPage[]} array of pages
   */
  public getPagesByIds = (ids: string[]): TPage[] => {
    return ids.map(id => this.getPageById(id))
  }

  /*
   * Get anchor by id
   * @public
   * @param {string} id
   * @returns {TAnchor} anchor
   */
  public getAnchorById = (id: string): TAnchor => {
    return this.data.entities.anchors[id]
  }

  /*
   * Get anchors by array of ids
   * @public
   * @param {string[]} ids
   * @returns {TAnchor[]} array of anchors
   */
  public getAnchorsByIds = (ids: string[]): TAnchor[] => {
    return ids.map(id => this.getAnchorById(id))
  }

  /*
   * Get page children
   * @public
   * @description Filters all pages where the parentId is equal to the page id
   * @param {string} id the page id by which we will search for pages
   * @returns {TPage[]} array of pages
   */
  public getChildren = (id: string): TPage[] => {
    const pages = this.getPageById(id).pages
    return pages ? this.getPagesByIds(pages) : []
  }

  /*
   * Get anchor or page parents array
   * @public
   * @param {string} id
   * @returns {TPage[]} array of parents
   */
  public getParents = (id: string): TPage[] => {
    const parents: TPage[] = []
    let page = this.data.entities.pages[id]
    const anchor = this.data.entities.anchors[id]
    let parentId: string | undefined = page
      ? page.parentId
      : anchor
      ? anchor.parentId
      : undefined
    while (true) {
      if (parentId) {
        page = this.getPageById(parentId)
        parentId = page.parentId
        parents.push(page)
      } else {
        return parents
      }
    }
  }

  /*
   * Get page additional data
   * @public
   * @param {string} currentId
   * @param {TPage} page
   */
  public getPageAdditionalData = (
    page: TPage,
    active?: string
  ): {
    selected: boolean
    highlight: boolean
    hasChildren: boolean
    anchors: TAnchor[]
    pages: TPage[]
  } => {
    const currentId = active || ''
    const selected = currentId === page.id
    return {
      selected,
      highlight: selected
        ? selected
        : this.data.entities.pages[currentId]
        ? false
        : currentId.includes(page.id),
      hasChildren: !!page.pages?.length,
      anchors: this.getAnchors(page.id),
      pages: this.getChildren(page.id),
    }
  }

  /*
   * Get page anchors
   * @public
   * @description Filters all anchors where the parentId is equal to the page id
   * @param {string} id the page id by which we will search for anchors
   * @returns {TAnchor[]} array of anchors
   */
  public getAnchors = (id: string): TAnchor[] => {
    const anchors = this.getPageById(id).anchors
    return anchors ? this.getAnchorsByIds(anchors) : []
  }

  /*
   * Get all pages objects from topLevelIds
   * @public
   * @description Filters all pages where the page id includes in topLevelIds array
   * @returns {TPage[]} array of pages
   */
  public getTree = (): TPage[] => {
    return this.data.topLevelIds.map(key => this.data.entities.pages[key])
  }

  /*
   * Get page or anchor by Id
   * @public
   * @param {string} id
   * @returns {TAnchor | TPage | undefined} item
   */
  public getItemById = (id: string) => {
    if (this.data.entities.pages[id]) {
      return this.getPageById(id)
    }
    if (this.data.entities.anchors[id]) {
      return this.getAnchorById(id)
    }
    return undefined
  }

  /*
   * Get url by Id
   * @public
   * @param {string} id
   * @returns {string | undefined} url
   */
  public getUrlById = (id: string): string | undefined => {
    const item = this.getItemById(id) as TAnchor
    if (item) {
      if (item.url && item.anchor) {
        return `${item.url}${item.anchor}`
      }
      return item.url
    }
    return undefined
  }

  /*
   * Get id by url
   * @public
   * @returns {string | undefined} anchor or page id
   */
  public getIdByURL = (): string | undefined => {
    const href = window.location.href
    const lastPathname = href.split('/')[href.split('/').length - 1]
    const anchor = Object.values(this.data.entities.anchors).filter(
      anchor => `${anchor.url}${anchor.anchor}` === lastPathname
    )[0]
    if (anchor) {
      return anchor.id
    }
    const page = Object.values(this.data.entities.pages).filter(
      page => page.url === lastPathname
    )[0]
    if (page) {
      return page.id
    }
    return undefined
  }
}
