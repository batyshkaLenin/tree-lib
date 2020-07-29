import React, { useState } from 'react'
import { TreeHelper } from 'src/lib/helpers/TreeHelper'
import { Page } from 'src/lib/models/TreeData'
import Arrow, { Direction } from 'src/lib/components/Arrow/Arrow'
import styles from './TreeNode.module.scss'
import classNames from 'classnames'
import TreeNodeList from 'src/lib/components/TreeNodeList/TreeNodeList'
import TreeNodeAnchor from './TreeNodeAnchor'

interface Props {
  page: Page
  currentId: string
  tree: TreeHelper
  selectPage: (page: string) => void
}

const TreeNode = ({ page, tree, selectPage, currentId }: Props) => {
  const [show, setShow] = useState<boolean>()

  const url = page.url ? `/${page.url}` : ''
  const highlight = page.url ? currentId.includes(url) : false
  const hasChildren = page.pages?.length || page.anchors?.length

  const showTree = () => setShow((prevState) => !prevState)

  return (
    <>
      <li
        className={classNames(styles.item, highlight && styles.itemSelected)}
        style={{ paddingLeft: `${page.level * 26.45 || 20}px` }}
      >
        {hasChildren ? (
          show ? (
            <Arrow dir={Direction.UP} onClick={showTree} />
          ) : (
            <Arrow dir={Direction.DOWN} onClick={showTree} />
          )
        ) : null}
        <p
          className={classNames(
            styles.title,
            url === currentId && styles.titleSelected
          )}
        >
          <button
            className={styles.titleLink}
            tabIndex={0}
            role="link"
            onClick={() => {
              if (page.url) {
                showTree()
                selectPage(url)
              } else {
                showTree()
              }
            }}
          >
            {page.title}
          </button>
        </p>
      </li>
      <ul className={classNames(styles.subTree, show && styles.subTreeOpened)}>
        {show &&
          tree
            ?.getAnchors(page.id)
            .map((anchor, key) => (
              <TreeNodeAnchor
                selectPage={selectPage}
                currentId={currentId}
                page={page}
                anchor={anchor}
                key={key}
                highlight={highlight}
              />
            ))}
        {show && (
          <TreeNodeList
            currentId={currentId}
            pages={tree.getChildren(page.id)}
            tree={tree}
            selectPage={selectPage}
          />
        )}
      </ul>
    </>
  )
}

export default TreeNode
