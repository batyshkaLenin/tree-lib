import React, { useEffect, useState } from 'react'
import { Anchor, IRawData, Page } from './IRawData'
import { TreeHelper } from './TreeHelper'
import styles from './Tree.module.scss'
import TreeItemList from './TreeItemList'

interface IProps {
  data?: IRawData
}

export const Tree = (props: IProps) => {
  const [tree, setTree] = useState<TreeHelper>()
  const [pages, setPages] = useState<Page[]>()

  useEffect(() => {
    if (props.data) {
      const tree = new TreeHelper(props.data)
      setTree(tree)
      setPages(tree.getTree())
    }
  }, [props.data])

  const selectPage = (page: Page) => {
    tree?.selectPage(page)
    setPages(tree?.getTree())
    window.history.pushState(page, page.title, page.url)
  }

  const selectAnchor = (page: Page, anchor: Anchor) => {
    tree?.selectAnchor(page, anchor)
    setPages(tree?.getTree())
    window.history.pushState(
      anchor,
      anchor.title,
      `${anchor.url}${anchor.anchor}`
    )
  }

  return (
    <>
      <div className={styles.tree}>
        {pages && tree ? (
          <TreeItemList
            pages={pages}
            tree={tree}
            selectAnchor={selectAnchor}
            selectPage={selectPage}
          />
        ) : (
          'Loading'
        )}
      </div>
    </>
  )
}
