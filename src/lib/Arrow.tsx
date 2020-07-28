import React from 'react'
import { ReactComponent as ArrowUp } from './ArrowUp.svg'
import { ReactComponent as ArrowDown } from './ArrowDown.svg'

export enum Direction {
  UP,
  DOWN,
}

interface IProps {
  dir: Direction.UP | Direction.DOWN
}

const Arrow = (props: IProps) => {
  return props.dir === Direction.UP ? <ArrowUp /> : <ArrowDown />
}

export default Arrow
