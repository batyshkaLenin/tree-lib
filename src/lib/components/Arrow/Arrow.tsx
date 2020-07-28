import React from 'react'
import { ReactComponent as ArrowUp } from './ArrowUp.svg'
import { ReactComponent as ArrowDown } from './ArrowDown.svg'
import styles from './Arrow.module.scss'

export enum Direction {
  UP,
  DOWN,
}

interface IProps {
  dir: Direction.UP | Direction.DOWN
}

const Arrow = (props: IProps) => {
  return (
    <div className={styles.arrow}>
      {props.dir === Direction.UP ? <ArrowUp /> : <ArrowDown />}
    </div>
  )
}

export default Arrow
