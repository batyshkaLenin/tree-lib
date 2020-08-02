import classNames from 'classnames'
import styles from './styles.module.scss'
import React, { useCallback } from 'react'
import { TAnchor, TPage } from './types'

interface Props {
  page: TPage
  anchor: TAnchor
  active: string
  selectPage: (url: string) => void
  highlight: boolean
}

const Anchor = ({ highlight, anchor, active, selectPage }: Props) => {
  const url = `${anchor.url}${anchor.anchor}`
  const selected = anchor.id === active
  const onClickAnchor = useCallback(
    e => {
      selectPage(anchor.id)
      e.stopPropagation()
    },
    [selectPage, anchor]
  )
  const onClickLink = useCallback(e => e.preventDefault(), [])

  return (
    <li className={styles.treeAnchor} onClick={onClickAnchor}>
      <a
        className={classNames(
          styles.treeTitle,
          selected && highlight && styles.treeTitleSelected,
          styles.treeTitleLink,
          styles[`treeAnchorTitleLevel${anchor.level}`]
        )}
        tabIndex={0}
        href={url}
        onClick={onClickLink}
      >
        {anchor.title}
      </a>
    </li>
  )
}

export default Anchor
