import { Page } from '../../models/TreeData'
import TreeNode from '../TreeNode/TreeNode'
import React from 'react'
import { TreeHelper } from '../../helpers/TreeHelper'

interface Props {
  pages: Page[]
  currentId: string
  tree: TreeHelper
  selectPage: (url: string) => void
}

const TreeNodeList = ({ pages, tree, selectPage, currentId }: Props) => {
  return (
    <>
      {pages.map((i, key) => (
        <TreeNode
          currentId={currentId}
          page={i}
          selectPage={selectPage}
          tree={tree}
          key={key}
        />
      ))}
    </>
  )
}

export default TreeNodeList
