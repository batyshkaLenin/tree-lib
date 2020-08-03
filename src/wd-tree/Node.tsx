import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TreeUtil } from './utils'
import { TPage } from './types'
import ExpandButton from './ExpandButton'
import styles from './styles.module.scss'
import classNames from 'classnames'
import Anchor from './Anchor'

interface Props {
  page: TPage
  active?: string
  tree: TreeUtil
  onSelect: (page: string) => void
}

const Node: React.FC<Props> = ({ page, tree, onSelect, active }) => {
  const { highlight, selected, hasChildren, anchors, pages } = useMemo(
    () => tree.getPageAdditionalData(page, active),
    [active, page, tree]
  )
  const [expanded, setExpand] = useState<boolean>(
    tree.getParents(active || '').filter(item => item.id === page.id).length > 0
  )
  const nodeRef = useRef<HTMLLIElement>(null)

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
    if (highlight && !expanded && nodeRef && nodeRef.current) {
      nodeRef.current.scrollIntoView()
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
        {(expanded || highlight ? highlight : selected) &&
          (anchors.length ? (
            <ul className={styles.treeAnchorsList}>
              {anchors.map(anchor => (
                <Anchor
                  nodeRef={nodeRef}
                  highlight={highlight}
                  anchor={anchor}
                  active={active}
                  onSelect={onSelect}
                  key={anchor.id}
                />
              ))}
            </ul>
          ) : (
            <></>
          ))}
        {expanded &&
          (pages.length ? (
            <ul className={styles.treeNodesList}>
              {pages.map(page => (
                <Node
                  active={active}
                  page={page}
                  onSelect={onSelect}
                  tree={tree}
                  key={page.id}
                />
              ))}
            </ul>
          ) : (
            <></>
          ))}
      </li>
    </>
  )
}

export default Node
