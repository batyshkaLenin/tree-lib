import React from 'react'
import { ReactComponent as ArrowPicture } from './Arrow.svg'
import styles from './Arrow.module.scss'
import classNames from 'classnames'

export enum Direction {
  UP,
  DOWN,
}

interface Props {
  onClick: () => void
  dir: Direction.UP | Direction.DOWN
}

const Arrow = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={classNames(
        styles.arrow,
        styles[`arrow${Direction[props.dir]}`]
      )}
    >
      <ArrowPicture />
    </button>
  )
}

export default Arrow
