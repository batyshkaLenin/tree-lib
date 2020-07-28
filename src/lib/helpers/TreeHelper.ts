import { Anchor, TreeData, Page } from 'src/lib/models/TreeData'

export class TreeHelper {
  private data: TreeData

  constructor(data: TreeData) {
    this.data = data
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
