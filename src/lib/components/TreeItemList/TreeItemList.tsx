import { Page } from '../../models/TreeData'
import TreeItem from '../TreeItem/TreeItem'
import React from 'react'
import { TreeHelper } from '../../helpers/TreeHelper'

interface Props {
  pages: Page[]
  currentURL: string
  tree: TreeHelper
  selectPage: (url: string) => void
}

const TreeItemList = ({ pages, tree, selectPage, currentURL }: Props) => {
  return (
    <>
      {pages.map((i, key) => (
        <TreeItem
          currentURL={currentURL}
          page={i}
          selectPage={selectPage}
          tree={tree}
          key={key}
        />
      ))}
    </>
  )
}

export default TreeItemList
