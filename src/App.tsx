import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ITreeData } from 'src/lib/classes/models/ITreeData'
import { Tree } from 'src/lib/Tree'

function App() {
  const [tree, setTree] = useState<ITreeData>()

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
