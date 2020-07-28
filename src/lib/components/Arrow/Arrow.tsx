import React from 'react'
import { ReactComponent as ArrowPicture } from './Arrow.svg'
import styles from './Arrow.module.scss'
import classNames from 'classnames'

export enum Direction {
  UP,
  DOWN,
}

interface Props {
  dir: Direction.UP | Direction.DOWN
}

const Arrow = (props: Props) => {
  return (
    <div
      className={classNames(
        styles.arrow,
        styles[`arrow${Direction[props.dir]}`]
      )}
    >
      <ArrowPicture />
    </div>
  )
}

export default Arrow
