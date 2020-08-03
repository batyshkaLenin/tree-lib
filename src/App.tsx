import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Tree, TreeType, TreeHelper } from 'wd-tree'

function App() {
  const [tree, setTree] = useState<TreeType>()
  const [currentId, setCurrentId] = useState<string>('')
  const [helper, setHelper] = useState<TreeHelper>()

  useEffect(() => {
    axios.get('testData.json').then((res: AxiosResponse<TreeType>) => {
      // Timeout for demo skeleton-loader
      setTimeout(() => {
        setTree(res.data)
        const treeHelper = new TreeHelper(res.data)
        setCurrentId(treeHelper.getIdByURL() || '')
        setHelper(treeHelper)
      }, 200)
    })
  }, [])

  const selectPage = (id: string) => {
    setCurrentId(id)
    window.history.pushState({}, '', helper?.getUrlById(id) || '')
  }

  return (
    <Tree
      data={tree}
      topLevelIds={tree?.topLevelIds}
      active={currentId}
      onSelect={selectPage}
    />
  )
}

export default App
