import { Anchor, TreeData, Page } from 'src/lib/models/TreeData'

export class TreeHelper {
  private data: TreeData

  /*
   * Creates a helper object with the required methods
   * @constructor
   */
  constructor(data: TreeData) {
    this.data = data
  }

  /*
   * Get page children
   * @public
   * @description Filters all pages where the parentId is equal to the page id
   * @param {string} id the page id by which we will search for pages
   * @returns {Page[]} array of pages
   */
  public getChildren = (id: string): Page[] => {
    return Object.values(this.data.entities.pages).filter(
      ({ parentId }) => parentId === id
    )
  }

  /*
   * Get all anchors by page
   * @public
   * @description Filters all anchors where the parentId is equal to the page id
   * @param {string} id the page id by which we will search for anchors
   * @returns {Anchor[]} array of anchors
   */
  public getAnchors = (id: string): Anchor[] => {
    return Object.values(this.data.entities.anchors).filter(
      ({ parentId }) => parentId === id
    )
  }

  /*
   * Get all pages objects from topLevelIds
   * @public
   * @description Filters all pages where the page id includes in topLevelIds array
   * @returns {Page[]} array of pages
   */
  public getTree = (): Page[] => {
    return Object.values(this.data.entities.pages).filter((page) =>
      this.data.topLevelIds.includes(page.id)
    )
  }
}
