import React, { useState } from 'react'
import { TreeHelper } from 'src/lib/helpers/TreeHelper'
import { Page } from 'src/lib/models/TreeData'
import Arrow, { Direction } from 'src/lib/components/Arrow/Arrow'
import styles from './TreeItem.module.scss'
import classNames from 'classnames'
import TreeItemList from 'src/lib/components/TreeItemList/TreeItemList'
import TreeItemAnchor from '../TreeItemAnchor/TreeItemAnchor'

interface Props {
  page: Page
  currentURL: string
  tree: TreeHelper
  selectPage: (page: string) => void
}

const TreeItem = ({ page, tree, selectPage, currentURL }: Props) => {
  const [show, setShow] = useState<boolean>()
  const url = `/${page.url}`
  const highlight = page.url ? currentURL.includes(url) : false
  const hasChildren = page.pages?.length || page.anchors?.length

  return (
    <>
      <li
        className={classNames(styles.item, highlight && styles.itemSelected)}
        style={{ paddingLeft: `${page.level * 26.45 || 20}px` }}
      >
        {hasChildren ? (
          show ? (
            <Arrow dir={Direction.UP} />
          ) : (
            <Arrow dir={Direction.DOWN} />
          )
        ) : null}
        <p
          className={classNames(
            styles.title,
            url === currentURL && styles.titleSelected
          )}
          onClick={() => {
            setShow((prevState) => !prevState)
            selectPage(url)
          }}
        >
          {page.title}
        </p>
      </li>
      <ul className={classNames(styles.subTree, show && styles.subTreeOpened)}>
        {show && (
          <TreeItemList
            currentURL={currentURL}
            pages={tree.getChildren(page)}
            tree={tree}
            selectPage={selectPage}
          />
        )}
        {show &&
          tree
            ?.getAnchors(page)
            .map((anchor, key) => (
              <TreeItemAnchor
                selectPage={selectPage}
                currentURL={currentURL}
                page={page}
                anchor={anchor}
                key={key}
                highlight={highlight}
              />
            ))}
      </ul>
    </>
  )
}

export default TreeItem
