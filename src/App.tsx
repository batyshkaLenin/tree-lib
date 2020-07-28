import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IRawData } from './lib/IRawData'
import { Tree } from './lib/Tree'

function App() {
  const [tree, setTree] = useState<IRawData>()

  useEffect(() => {
    axios.get('testData.json').then((res) => {
      setTree(res.data)
    })
  }, [])

  return (
    <div>
      <Tree data={tree} />
    </div>
  )
}

export default App
