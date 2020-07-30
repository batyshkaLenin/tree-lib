import React from 'react'
import { ReactComponent as Arrow } from './Arrow.svg'
import styles from './styles.module.scss'
import classNames from 'classnames'

interface Props {
  onClick: () => void
  expand: boolean
}

const ExpandButton = (props: Props) => {
  return (
    <button onClick={props.onClick} className={styles['arrow__button']}>
      <Arrow
        className={classNames(
          styles['arrow__icon'],
          props.expand && styles[`arrow--expand`]
        )}
      />
    </button>
  )
}

export default ExpandButton
