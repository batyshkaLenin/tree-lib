import { TPage } from './types'
import Node from './Node'
import React from 'react'
import { TreeUtil } from './utils'
import styles from './styles.module.scss'

interface Props {
  pages: TPage[]
  active: string
  tree: TreeUtil
  onSelect: (url: string) => void
}

const NodesList: React.FC<Props> = ({
  pages,
  tree,
  onSelect,
  active,
}: Props) => {
  return pages.length ? (
    <ul className={styles.treeNodesList}>
      {pages.map(page => (
        <Node
          active={active}
          page={page}
          onSelect={onSelect}
          tree={tree}
          key={page.id}
        />
      ))}
    </ul>
  ) : (
    <></>
  )
}

export default NodesList
