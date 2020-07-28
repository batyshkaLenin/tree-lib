import React, { useEffect, useState } from 'react'
import { TreeData, Page } from 'src/lib/models/TreeData'
import { TreeHelper } from 'src/lib/helpers/TreeHelper'
import styles from 'src/lib/Tree.module.scss'
import TreeItemList from 'src/lib/components/TreeItemList/TreeItemList'
import Loader from './components/Loader/Loader'

interface Props {
  data?: TreeData
}

export const Tree = (props: Props) => {
  const [tree, setTree] = useState<TreeHelper>()
  const [pages, setPages] = useState<Page[]>()
  const [currentURL, setCurrentURL] = useState<string>(
    `${window.location.pathname}${window.location.hash}`
  )

  useEffect(() => {
    if (props.data) {
      const tree = new TreeHelper(props.data)
      setTree(tree)
      setPages(tree.getTree())
    }
  }, [props.data])

  const selectPage = (url: string) => {
    setCurrentURL(url)
    window.history.pushState({}, '', url)
  }

  return (
    <nav className={styles.tree}>
      <ul className={styles.treeList}>
        {pages && tree ? (
          <TreeItemList
            currentURL={currentURL}
            pages={pages}
            tree={tree}
            selectPage={selectPage}
          />
        ) : (
          <Loader />
        )}
      </ul>
    </nav>
  )
}
