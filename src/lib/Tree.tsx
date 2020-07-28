import React, { useEffect, useState } from 'react'
import { Anchor, ITreeData, Page } from 'src/lib/classes/models/ITreeData'
import { TreeHelper } from 'src/lib/classes/helpers/TreeHelper'
import styles from 'src/lib/Tree.module.scss'
import TreeItemList from 'src/lib/components/TreeItemList/TreeItemList'

interface IProps {
  data?: ITreeData
}

export const Tree = (props: IProps) => {
  const [tree, setTree] = useState<TreeHelper>()
  const [pages, setPages] = useState<Page[]>()
  const [highlightURL, setHighlight] = useState<string>(
    `${window.location.pathname}${window.location.hash}`
  )

  useEffect(() => {
    if (props.data) {
      const tree = new TreeHelper(props.data)
      setTree(tree)
      setPages(tree.getTree())
    }
  }, [props.data])

  const selectPage = (page: Page) => {
    setHighlight(`/${page.url}`)
    window.history.pushState(page, page.title, page.url)
  }

  const selectAnchor = (page: Page, anchor: Anchor) => {
    setHighlight(`/${anchor.url}${anchor.anchor}`)
    window.history.pushState(
      anchor,
      anchor.title,
      `${anchor.url}${anchor.anchor}`
    )
  }

  return (
    <nav className={styles.tree}>
      <ul className={styles.treeList}>
        {pages && tree ? (
          <TreeItemList
            highlighted={highlightURL}
            pages={pages}
            tree={tree}
            selectAnchor={selectAnchor}
            selectPage={selectPage}
          />
        ) : (
          'Loading'
        )}
      </ul>
    </nav>
  )
}
