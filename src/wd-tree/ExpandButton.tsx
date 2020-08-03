import React, { useCallback } from 'react'
import { ReactComponent as ExpandIcon } from './Arrow.svg'
import styles from './styles.module.scss'
import classNames from 'classnames'

interface Props {
  onClick: () => void
  expand: boolean
}

const ExpandButton: React.FC<Props> = ({ expand, onClick }: Props) => {
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
