import React, { useCallback } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import ExpandIcon from './ExpandIcon'

interface Props {
  onClick: () => void
  expand: boolean
}

const ExpandButton: React.FC<Props> = ({ expand, onClick }) => {
  const expandClick = useCallback(
    e => {
      onClick()
      e.stopPropagation()
    },
    [onClick]
  )
  return (
    <div onClick={expandClick} className={styles.treeExpander}>
      <ExpandIcon
        className={classNames(
          styles.treeExpanderIcon,
          expand && styles.treeExpanderIconExpanded
        )}
      />
    </div>
  )
}

export default ExpandButton
