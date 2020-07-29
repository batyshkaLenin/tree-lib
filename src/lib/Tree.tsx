import React, { useEffect, useState } from 'react'
import { TreeData, Page } from 'src/lib/models/TreeData'
import { TreeHelper } from 'src/lib/helpers/TreeHelper'
import styles from 'src/lib/Tree.module.scss'
import TreeItemList from 'src/lib/components/TreeItemList/TreeItemList'
import Loader from './components/Loader/Loader'

interface Props {
  data?: TreeData
  onSelect: (url: string) => void
  defaultActive: string
}

export const Tree = (props: Props) => {
  const [tree, setTree] = useState<TreeHelper>()
  const [pages, setPages] = useState<Page[]>()

  useEffect(() => {
    if (props.data) {
      const tree = new TreeHelper(props.data)
      setTree(tree)
      setPages(tree.getTree())
    }
  }, [props.data])

  return (
    <nav className={styles.tree}>
      <ul className={styles.treeList}>
        {pages && tree ? (
          <TreeItemList
            currentURL={props.defaultActive}
            pages={pages}
            tree={tree}
            selectPage={props.onSelect}
          />
        ) : (
          <Loader />
        )}
      </ul>
    </nav>
  )
}
