import { TAnchor, TPage } from './types'
import React from 'react'
import Anchor from './Anchor'
import styles from './styles.module.scss'

interface Props {
  anchors: TAnchor[]
  page: TPage
  active: string
  selectPage: (id: string) => void
  highlight: boolean
}

const AnchorsList = ({
  highlight,
  page,
  anchors,
  selectPage,
  active,
}: Props) => {
  return anchors.length ? (
    <ul className={styles.treeAnchorsList}>
      {anchors.map((anchor, key) => (
        <Anchor
          highlight={highlight}
          anchor={anchor}
          active={active}
          page={page}
          selectPage={selectPage}
          key={key}
        />
      ))}
    </ul>
  ) : (
    <></>
  )
}

export default AnchorsList
