import classNames from 'classnames'
import styles from './TreeNode.module.scss'
import React from 'react'
import { Anchor, Page } from '../../models/TreeData'

interface Props {
  page: Page
  anchor: Anchor
  highlight: boolean
  currentId: string
  selectPage: (url: string) => void
}

const TreeNodeAnchor = ({
  page,
  anchor,
  highlight,
  currentId,
  selectPage,
}: Props) => {
  const url = `/${anchor.url}${anchor.anchor}`

  return (
    <li
      className={classNames(styles.item, highlight && styles.itemSelected)}
      style={{
        paddingLeft: `${
          (page.level * 26.45 || 20) + (anchor.level * 16.55 || 16.55)
        }px`,
      }}
    >
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
          onClick={() => selectPage(url)}
        >
          {anchor.title}
        </button>
      </p>
    </li>
  )
}

export default TreeNodeAnchor
