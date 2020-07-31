import classNames from 'classnames'
import styles from './styles.module.scss'
import React, { useCallback, useMemo } from 'react'
import { TAnchor, TPage } from './types'

interface Props {
  page: TPage
  anchor: TAnchor
  currentId: string
  selectPage: (url: string) => void
  highlight: boolean
}

const Anchor = ({ highlight, page, anchor, currentId, selectPage }: Props) => {
  const url = useMemo(() => `${anchor.url}${anchor.anchor}`, [anchor])
  const selected = useMemo(() => anchor.id === currentId, [anchor, currentId])
  const onClickAnchor = useCallback(() => selectPage(anchor.id), [
    selectPage,
    anchor,
  ])
  const onClickLink = useCallback((e) => e.preventDefault(), [])

  return (
    <li
      className={classNames(styles.item, highlight && styles.itemSelected)}
      style={{
        paddingLeft: `${
          (page.level * 26.45 || 20) + (anchor.level * 16.55 || 16.55)
        }px`,
      }}
      onClick={onClickAnchor}
    >
      <div
        className={classNames(styles.title, selected && styles.titleSelected)}
      >
        <a
          className={styles.titleLink}
          tabIndex={0}
          href={url}
          onClick={onClickLink}
        >
          {anchor.title}
        </a>
      </div>
    </li>
  )
}

export default Anchor
