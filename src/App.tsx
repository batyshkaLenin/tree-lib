import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TreeData } from 'src/lib/models/TreeData'
import { Tree } from 'src/lib/Tree'

function App() {
  const [tree, setTree] = useState<TreeData>()
  const [currentId, setCurrentId] = useState<string>(
    `${window.location.pathname}${window.location.hash}`
  )

  useEffect(() => {
    axios.get('testData.json').then((res) => {
      // Timeout for demo skeleton-loader
      setTimeout(() => setTree(res.data), 1)
    })
  }, [])

  const selectPage = (id: string) => {
    setCurrentId(id)
    window.history.pushState({}, '', id)
  }

  return (
    <div>
      <Tree data={tree} defaultActive={currentId} onSelect={selectPage} />
    </div>
  )
}

export default App
