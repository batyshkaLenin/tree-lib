import React, { useState } from 'react'
import { TreeHelper } from './utils'
import { TPage } from './types'
import ExpandButton from './ExpandButton'
import styles from './styles.module.scss'
import classNames from 'classnames'
import NodesList from './NodesList'
import AnchorsList from './AnchorsList'

interface Props {
  page: TPage
  currentId: string
  tree: TreeHelper
  selectPage: (page: string) => void
}

const Node = ({ page, tree, selectPage, currentId }: Props) => {
  const [show, setShow] = useState<boolean>(
    !!tree.getParents(currentId).filter((i) => i.id === page.id).length
  )

  const selected = currentId === page.id
  const highlight = selected ? selected : currentId.includes(page.id)
  const hasChildren = page.pages?.length

  const showTree = () => setShow((prevState) => !prevState)

  return (
    <>
      <li
        className={classNames(styles.item, highlight && styles.itemSelected)}
        style={{ paddingLeft: `${page.level * 26.45 || 20}px` }}
        onClick={() => {
          if (page.url) {
            showTree()
            selectPage(page.id)
          } else {
            showTree()
          }
        }}
      >
        {hasChildren ? <ExpandButton expand={show} onClick={showTree} /> : null}
        <div
          className={classNames(styles.title, selected && styles.titleSelected)}
        >
          {page.url ? (
            <a
              className={styles.titleLink}
              tabIndex={0}
              href={page.url}
              onClick={(e) => e.preventDefault()}
            >
              {page.title}
            </a>
          ) : (
            page.title
          )}
        </div>
      </li>
      <ul className={classNames(styles.subTree, show && styles.subTreeOpened)}>
        {show && (
          <AnchorsList
            anchors={tree.getAnchors(page.id)}
            page={page}
            currentId={currentId}
            selectPage={selectPage}
          />
        )}
        {show && (
          <NodesList
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

export default Node
