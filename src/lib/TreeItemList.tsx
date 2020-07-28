import { Anchor, Page } from './IRawData'
import TreeItem from './TreeItem'
import React from 'react'
import { TreeHelper } from './TreeHelper'

interface IProps {
  pages: Page[]
  tree: TreeHelper
  selectPage: (page: Page) => void
  selectAnchor: (page: Page, anchor: Anchor) => void
}

const TreeItemList = ({ pages, tree, selectAnchor, selectPage }: IProps) => {
  return (
    <>
      {pages.map((i, key) => (
        <TreeItem
          page={i}
          selectPage={selectPage}
          selectAnchor={selectAnchor}
          tree={tree}
          key={key}
        />
      ))}
    </>
  )
}

export default TreeItemList
