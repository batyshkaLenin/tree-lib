import { TPage } from './types'
import Node from './Node'
import React from 'react'
import { TreeHelper } from './utils'

interface Props {
  pages: TPage[]
  currentId: string
  tree: TreeHelper
  selectPage: (url: string) => void
}

const NodesList = ({ pages, tree, selectPage, currentId }: Props) => {
  return (
    <>
      {pages.map((i, key) => (
        <Node
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

export default NodesList
