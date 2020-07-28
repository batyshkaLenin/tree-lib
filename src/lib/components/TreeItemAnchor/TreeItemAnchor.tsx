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
      style={{ paddingLeft: `${(page.level + 1) * 26.45}px` }}
      onClick={() => selectPage(url)}
    >
      <p
        className={classNames(
          styles.title,
          url === currentURL && styles.titleSelected
        )}
      >
        {anchor.title}
      </p>
    </li>
  )
}

export default TreeItemAnchor
