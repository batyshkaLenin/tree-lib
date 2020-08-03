import { TAnchor, TPage } from './types'
import React from 'react'
import Anchor from './Anchor'
import styles from './styles.module.scss'

interface Props {
  anchors: TAnchor[]
  page: TPage
  active: string
  onSelect: (id: string) => void
  highlight: boolean
}

const AnchorsList: React.FC<Props> = ({
  highlight,
  page,
  anchors,
  onSelect,
  active,
}) => {
  return anchors.length ? (
    <ul className={styles.treeAnchorsList}>
      {anchors.map(anchor => (
        <Anchor
          highlight={highlight}
          anchor={anchor}
          active={active}
          page={page}
          onSelect={onSelect}
          key={anchor.id}
        />
      ))}
    </ul>
  ) : (
    <></>
  )
}

export default AnchorsList
