import React, { useCallback, useMemo, useState } from 'react'
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
  const showMountedNode = useMemo(
    () => !!tree.getParents(currentId).filter((i) => i.id === page.id).length,
    [tree, currentId, page]
  )
  const [show, setShow] = useState<boolean>(showMountedNode)

  const selected = useMemo(() => currentId === page.id, [currentId, page])
  const highlight = useMemo(
    () => (selected ? selected : currentId.includes(page.id)),
    [selected, page, currentId]
  )
  const hasChildren = useMemo(() => page.pages?.length, [page])

  const showTree = () => setShow((prevState) => !prevState)
  const onClickLink = useCallback((e) => e.preventDefault(), [])
  const onClickNode = useCallback(() => {
    if (page.url) {
      showTree()
      selectPage(page.id)
    } else {
      showTree()
    }
  }, [page, selectPage])

  return (
    <>
      <li
        className={classNames(styles.item, highlight && styles.itemSelected)}
        style={{ paddingLeft: `${page.level * 26.45 || 20}px` }}
        onClick={onClickNode}
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
              onClick={onClickLink}
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
            highlight={highlight}
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
