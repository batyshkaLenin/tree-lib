import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Tree, TreeType, getIdByURL } from 'src/lib'

function App() {
  const [tree, setTree] = useState<TreeType>()
  const [currentId, setCurrentId] = useState<string>('')

  useEffect(() => {
    axios.get('testData.json').then((res) => {
      // Timeout for demo skeleton-loader
      setTimeout(() => {
        setTree(res.data)
        setCurrentId(getIdByURL(res.data) || '')
      }, 1000)
    })
  }, [])

  const selectPage = (id: string) => {
    setCurrentId(id)
    if (tree?.entities.pages[id]) {
      const page = tree.entities.pages[id]
      window.history.pushState({}, '', page.url)
    }
    if (tree?.entities.anchors[id]) {
      const anchor = tree.entities.anchors[id]
      window.history.pushState({}, '', `${anchor.url}${anchor.anchor}`)
    }
  }

  return (
    <div>
      <Tree data={tree} active={currentId} onSelect={selectPage} />
    </div>
  )
}

export default App
