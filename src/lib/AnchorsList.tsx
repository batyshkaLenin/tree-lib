import { TAnchor, TPage } from './types'
import React from 'react'
import Anchor from './Anchor'

interface Props {
  anchors: TAnchor[]
  page: TPage
  currentId: string
  selectPage: (id: string) => void
  highlight: boolean
}

const AnchorsList = ({
  highlight,
  page,
  anchors,
  selectPage,
  currentId,
}: Props) => {
  return (
    <>
      {anchors.map((i, key) => (
        <Anchor
          highlight={highlight}
          anchor={i}
          currentId={currentId}
          page={page}
          selectPage={selectPage}
          key={key}
        />
      ))}
    </>
  )
}

export default AnchorsList
