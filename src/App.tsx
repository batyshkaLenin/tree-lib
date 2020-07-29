import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TreeData } from 'src/lib/models/TreeData'
import { Tree } from 'src/lib/Tree'

function App() {
  const [tree, setTree] = useState<TreeData>()
  const [currentURL, setCurrentURL] = useState<string>(
    `${window.location.pathname}${window.location.hash}`
  )

  useEffect(() => {
    axios.get('testData.json').then((res) => {
      setTree(res.data)
      setTimeout(() => setTree(res.data), 1)
    })
  }, [])

  const selectPage = (url: string) => {
    setCurrentURL(url)
    window.history.pushState({}, '', url)
  }

  return (
    <div>
      <Tree data={tree} defaultActive={currentURL} onSelect={selectPage} />
    </div>
  )
}

export default App
