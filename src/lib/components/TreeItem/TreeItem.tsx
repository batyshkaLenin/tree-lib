import React from 'react'
import { TreeHelper } from 'src/lib/classes/helpers/TreeHelper'
import { Anchor, Page } from 'src/lib/classes/models/ITreeData'
import Arrow, { Direction } from 'src/lib/components/Arrow/Arrow'
import styles from './TreeItem.module.scss'
import classNames from 'classnames'
import TreeItemList from 'src/lib/components/TreeItemList/TreeItemList'

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
      <li
        className={classNames(
          styles.item,
          page.isSelect && styles.itemSelected
        )}
        style={{ paddingLeft: `${page.level * 26.45 || 20}px` }}
      >
        {hasChildren ? (
          isShow ? (
            <Arrow dir={Direction.UP} />
          ) : (
            <Arrow dir={Direction.DOWN} />
          )
        ) : null}
        <p
          className={classNames(
            styles.title,
            page.isSelect && styles.titleSelected
          )}
          onClick={() => selectPage(page)}
        >
          {page.title}
        </p>
      </li>
      <ul
        className={classNames(styles.subTree, isShow && styles.subTreeOpened)}
      >
        {isShow && (
          <TreeItemList
            pages={tree.getChildren(page)}
            tree={tree}
            selectPage={selectPage}
            selectAnchor={selectAnchor}
          />
        )}
        {isShow &&
          tree?.getAnchors(page).map((anchor, key) => (
            <li
              key={key}
              className={classNames(
                styles.item,
                anchor.isSelect && styles.itemSelected
              )}
              style={{ paddingLeft: `${(page.level + 1) * 26.45}px` }}
              onClick={() => selectAnchor(page, anchor)}
            >
              <p
                className={classNames(
                  styles.title,
                  anchor.isSelect && styles.titleSelected
                )}
              >
                {anchor.title}
              </p>
            </li>
          ))}
      </ul>
    </>
  )
}

export default TreeItem
