import classNames from 'classnames'
import styles from '../TreeItem/TreeItem.module.scss'
import React from 'react'
import { Anchor, Page } from '../../models/TreeData'

interface Props {
  page: Page
  anchor: Anchor
  highlight: boolean
  currentURL: string
  selectPage: (url: string) => void
}

const TreeItemAnchor = ({
  page,
  anchor,
  highlight,
  currentURL,
  selectPage,
}: Props) => {
  const url = `/${anchor.url}${anchor.anchor}`

  return (
    <li
      className={classNames(styles.item, highlight && styles.itemSelected)}
      style={{ paddingLeft: `${(page.level + anchor.level + 1) * 36}px` }}
    >
      <p
        className={classNames(
          styles.title,
          url === currentURL && styles.titleSelected
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

export default TreeItemAnchor
