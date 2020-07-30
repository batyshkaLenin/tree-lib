import { TAnchor, TPage } from './types'
import React from 'react'
import Anchor from './Anchor'

interface Props {
  anchors: TAnchor[]
  page: TPage
  currentId: string
  selectPage: (id: string) => void
}

const AnchorsList = ({ page, anchors, selectPage, currentId }: Props) => {
  return (
    <>
      {anchors.map((i, key) => (
        <Anchor
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
