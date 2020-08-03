import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TreeUtil } from './utils'
import { TPage } from './types'
import ExpandButton from './ExpandButton'
import styles from './styles.module.scss'
import classNames from 'classnames'
import NodesList from './NodesList'
import AnchorsList from './AnchorsList'

interface Props {
  page: TPage
  active: string
  tree: TreeUtil
  onSelect: (page: string) => void
}

const Node: React.FC<Props> = ({ page, tree, onSelect, active }) => {
  const { highlight, selected, shown, hasChildren } = useMemo(
    () => tree.getPageAdditionalData(active, page),
    [active, page, tree]
  )
  const nodeRef = useRef<HTMLLIElement>(null)
  const [expanded, setExpand] = useState<boolean>(shown)

  const changeShow = () => setExpand(prevState => !prevState)
  const handleClickLink = useCallback(e => e.preventDefault(), [])
  const handleClickNode = useCallback(
    e => {
      if (page.url) {
        if (!expanded) {
          changeShow()
        }
        onSelect(page.id)
      } else {
        changeShow()
      }
      e.stopPropagation()
    },
    [expanded, page, onSelect]
  )

  useEffect(() => {
    if (highlight && !expanded) {
      nodeRef?.current?.scrollIntoView({ block: 'center' })
    }
  }, [highlight, expanded])

  return (
    <>
      <li
        ref={nodeRef}
        className={classNames(
          styles.treeNode,
          styles[`treeNodeLevel${page.level}`]
        )}
        onClick={handleClickNode}
      >
        <div className={styles.treeTitleWrapper}>
          {page.url ? (
            <a
              className={classNames(styles.treeTitle, styles.treeTitleLink, {
                [styles.treeTitleHasChildren]: hasChildren,
                [styles.treeTitleSelected]: highlight,
              })}
              tabIndex={0}
              href={page.url}
              onClick={handleClickLink}
            >
              {page.title}
            </a>
          ) : (
            <div
              className={classNames(styles.treeTitle, styles.treeTitleLink, {
                [styles.treeTitleHasChildren]: hasChildren,
                [styles.treeTitleSelected]: highlight,
              })}
            >
              {page.title}
            </div>
          )}
          {hasChildren ? (
            <ExpandButton expand={expanded} onClick={changeShow} />
          ) : null}
        </div>
        {(expanded || highlight ? highlight : selected) && (
          <AnchorsList
            nodeRef={nodeRef}
            highlight={highlight}
            anchors={tree.getAnchors(page.id)}
            page={page}
            active={active}
            onSelect={onSelect}
          />
        )}
        {expanded && (
          <NodesList
            active={active}
            pages={tree.getChildren(page.id)}
            tree={tree}
            onSelect={onSelect}
          />
        )}
      </li>
    </>
  )
}

export default Node
