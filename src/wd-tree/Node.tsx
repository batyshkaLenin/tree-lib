import React, { useCallback, useMemo, useState } from 'react'
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
  selectPage: (page: string) => void
}

const Node = ({ page, tree, selectPage, active }: Props) => {
  const { highlight, selected, shown, hasChildren } = useMemo(
    () => tree.getPageAdditionalData(active, page),
    [active, page, tree]
  )
  const [expanded, setExpand] = useState<boolean>(shown)

  const changeShow = () => setExpand(prevState => !prevState)
  const onClickLink = useCallback(e => e.preventDefault(), [])
  const onClickNode = useCallback(
    e => {
      if (page.url) {
        if (!expanded) {
          changeShow()
        }
        selectPage(page.id)
      } else {
        changeShow()
      }
      e.stopPropagation()
    },
    [expanded, page, selectPage]
  )
  const scrollToCurrent = useCallback(
    e => {
      if (highlight && !expanded && e) {
        e.scrollIntoView({ block: 'center' })
      }
    },
    [highlight, expanded]
  )

  return (
    <>
      <li
        ref={scrollToCurrent}
        className={classNames(
          styles.treeNode,
          styles[`treeNodeLevel${page.level}`]
        )}
        onClick={onClickNode}
      >
        <div className={styles.treeTitleWrapper}>
          {page.url ? (
            <a
              className={classNames(
                styles.treeTitle,
                hasChildren && styles.treeTitleHasChildren,
                styles.treeTitleLink,
                highlight && styles.treeTitleSelected
              )}
              tabIndex={0}
              href={page.url}
              onClick={onClickLink}
            >
              {page.title}
            </a>
          ) : (
            <div
              className={classNames(
                styles.treeTitle,
                hasChildren && styles.treeTitleHasChildren,
                styles.treeTitleLink,
                highlight && styles.treeTitleSelected
              )}
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
            highlight={highlight}
            anchors={tree.getAnchors(page.id)}
            page={page}
            active={active}
            selectPage={selectPage}
          />
        )}
        {expanded && (
          <NodesList
            active={active}
            pages={tree.getChildren(page.id)}
            tree={tree}
            selectPage={selectPage}
          />
        )}
      </li>
    </>
  )
}

export default Node
