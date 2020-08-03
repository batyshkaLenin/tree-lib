import classNames from 'classnames'
import styles from './styles.module.scss'
import React, { useCallback } from 'react'
import { TAnchor, TPage } from './types'

interface Props {
  page: TPage
  anchor: TAnchor
  active: string
  onSelect: (url: string) => void
  highlight: boolean
}

const Anchor: React.FC<Props> = ({
  highlight,
  anchor,
  active,
  onSelect,
}: Props) => {
  const url = `${anchor.url}${anchor.anchor}`
  const selected = anchor.id === active
  const handleClickAnchor = useCallback(
    e => {
      onSelect(anchor.id)
      e.stopPropagation()
    },
    [onSelect, anchor]
  )
  const handleClickLink = useCallback(e => e.preventDefault(), [])

  return (
    <li className={styles.treeAnchor} onClick={handleClickAnchor}>
      <a
        className={classNames(
          styles.treeTitle,
          styles.treeTitleLink,
          styles[`treeAnchorTitleLevel${anchor.level}`],
          selected && highlight && styles.treeTitleSelected
        )}
        tabIndex={0}
        href={url}
        onClick={handleClickLink}
      >
        {anchor.title}
      </a>
    </li>
  )
}

export default Anchor
