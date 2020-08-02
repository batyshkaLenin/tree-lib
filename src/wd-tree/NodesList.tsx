import { TPage } from './types'
import Node from './Node'
import React from 'react'
import { TreeHelper } from './utils'
import styles from './styles.module.scss'

interface Props {
  pages: TPage[]
  active: string
  tree: TreeHelper
  selectPage: (url: string) => void
}

const NodesList = ({ pages, tree, selectPage, active }: Props) => {
  return pages.length ? (
    <ul className={styles.treeNodesList}>
      {pages.map((page, key) => (
        <Node
          active={active}
          page={page}
          selectPage={selectPage}
          tree={tree}
          key={key}
        />
      ))}
    </ul>
  ) : (
    <></>
  )
}

export default NodesList
