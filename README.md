# WD Tree

[![Node CI](https://github.com/batyshkaLenin/tree-lib/workflows/Node%20CI/badge.svg)](https://github.com/batyshkaLenin/tree-lib/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/b6bec20046e7535db977/maintainability)](https://codeclimate.com/github/batyshkaLenin/tree-lib/maintainability)

React component tree library

## Getting started

`npm install` - install dependencies  
`npm start` - start project

Basic usage tree component:

```tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Tree, TreeType, getIdByURL } from 'wd-tree'

function App() {
  const [tree, setTree] = useState<TreeType>()
  const [currentId, setCurrentId] = useState<string>('')

  useEffect(() => {
    axios.get('testData.json').then(res => {
      setTree(res.data)
      setCurrentId(getIdByURL(res.data) || '')
    })
  }, [])

  const selectPage = (id: string) => setCurrentId(id)

  return <Tree data={tree} active={currentId} onSelect={selectPage} />
}
```

## Useful features

- Prettier. Formats your code according to the rules in [`.prettierc`](.prettierrc). In WebStorm keyboard shortcut `Alt+Shift+Ctrl+P`.
- Husky. Hook before committing. If you forgot to format your code, then Husky will launch the Prettier before committing.

## Deploy

Autodeploy on Vercel: [tree-lib.vercel.app](https://tree-lib.vercel.app)
