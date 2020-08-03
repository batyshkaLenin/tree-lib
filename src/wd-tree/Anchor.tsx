import classNames from 'classnames'
import styles from './styles.module.scss'
import React, { RefObject, useCallback, useEffect } from 'react'
import { TAnchor, TPage } from './types'

interface Props {
  nodeRef: RefObject<HTMLLIElement>
  page: TPage
  anchor: TAnchor
  active: string
  onSelect: (url: string) => void
  highlight: boolean
}

const Anchor: React.FC<Props> = ({
  nodeRef,
  highlight,
  anchor,
  active,
  onSelect,
}) => {
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

  useEffect(() => {
    if (selected && highlight) {
      nodeRef?.current?.scrollIntoView({ block: 'center' })
    }
  }, [nodeRef, highlight, selected])

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
