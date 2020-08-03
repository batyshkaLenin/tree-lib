import { TAnchor, TPage } from './types'
import React, { RefObject } from 'react'
import Anchor from './Anchor'
import styles from './styles.module.scss'

interface Props {
  nodeRef: RefObject<HTMLLIElement>
  anchors: TAnchor[]
  page: TPage
  active: string
  onSelect: (id: string) => void
  highlight: boolean
}

const AnchorsList: React.FC<Props> = ({
  nodeRef,
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
          nodeRef={nodeRef}
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
