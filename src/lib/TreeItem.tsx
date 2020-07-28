import React from 'react'
import { TreeHelper } from './TreeHelper'
import { Anchor, Page } from './IRawData'
import Arrow, { Direction } from './Arrow'
import styles from './TreeItem.module.scss'
import classNames from 'classnames'
import TreeItemList from './TreeItemList'

interface IProps {
  page: Page
  tree: TreeHelper
  selectPage: (page: Page) => void
  selectAnchor: (page: Page, anchor: Anchor) => void
}

const TreeItem = ({ page, tree, selectPage, selectAnchor }: IProps) => {
  const isShow = page.isShow
  const hasChildren = page.pages?.length || page.anchors?.length
  return (
    <>
      <div
        className={classNames(styles.item, page.isSelect && styles.selected)}
        style={{ marginLeft: `${page.level * 26.45}px` }}
      >
        <div>
          {hasChildren ? (
            isShow ? (
              <Arrow dir={Direction.UP} />
            ) : (
              <Arrow dir={Direction.DOWN} />
            )
          ) : null}
        </div>
        <div
          className={classNames(
            styles.title,
            page.isSelect && styles.titleSelected
          )}
          onClick={() => selectPage(page)}
        >
          {page.title}
        </div>
      </div>
      <div className={styles.pages}>
        {isShow && (
          <TreeItemList
            pages={tree.getChildren(page)}
            tree={tree}
            selectPage={selectPage}
            selectAnchor={selectAnchor}
          />
        )}
      </div>
      <div
        className={styles.anchors}
        style={{ marginLeft: `${(page.level + 1) * 26.45}px` }}
      >
        {isShow &&
          tree?.getAnchors(page).map((anchor, key) => (
            <div
              key={key}
              className={classNames(
                styles.title,
                styles.anchor,
                anchor.isSelect && styles.titleSelected
              )}
              onClick={() => selectAnchor(page, anchor)}
            >
              {anchor.title}
            </div>
          ))}
      </div>
    </>
  )
}

export default TreeItem
