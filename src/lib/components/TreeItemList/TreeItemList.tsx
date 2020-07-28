import { Anchor, Page } from '../../classes/models/ITreeData'
import TreeItem from '../TreeItem/TreeItem'
import React from 'react'
import { TreeHelper } from '../../classes/helpers/TreeHelper'

interface IProps {
  pages: Page[]
  highlighted: string
  tree: TreeHelper
  selectPage: (page: Page) => void
  selectAnchor: (page: Page, anchor: Anchor) => void
}

const TreeItemList = ({
  pages,
  tree,
  selectAnchor,
  selectPage,
  highlighted,
}: IProps) => {
  return (
    <>
      {pages.map((i, key) => (
        <TreeItem
          highlighted={highlighted}
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
