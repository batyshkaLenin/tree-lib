import classNames from 'classnames'
import styles from './styles.module.scss'
import React from 'react'
import { TAnchor, TPage } from './types'

interface Props {
  page: TPage
  anchor: TAnchor
  currentId: string
  selectPage: (url: string) => void
}

const Anchor = ({ page, anchor, currentId, selectPage }: Props) => {
  const selected = anchor.id === currentId
  const highlight =
    currentId === page.id ? currentId === page.id : currentId.includes(page.id)

  return (
    <li
      className={classNames(styles.item, highlight && styles.itemSelected)}
      style={{
        paddingLeft: `${
          (page.level * 26.45 || 20) + (anchor.level * 16.55 || 16.55)
        }px`,
      }}
      onClick={() => selectPage(anchor.id)}
    >
      <div
        className={classNames(styles.title, selected && styles.titleSelected)}
      >
        <a
          className={styles.titleLink}
          tabIndex={0}
          href={`${anchor.url}${anchor.anchor}`}
          onClick={(e) => e.preventDefault()}
        >
          {anchor.title}
        </a>
      </div>
    </li>
  )
}

export default Anchor
