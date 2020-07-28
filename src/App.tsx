import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TreeData } from 'src/lib/models/TreeData'
import { Tree } from 'src/lib/Tree'

function App() {
  const [tree, setTree] = useState<TreeData>()

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
