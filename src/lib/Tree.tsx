import React, { FunctionComponent, useEffect, useState } from 'react'
import { TreeData, Page } from 'src/lib/models/TreeData'
import { TreeHelper } from 'src/lib/helpers/TreeHelper'
import styles from 'src/lib/Tree.module.scss'
import TreeNodeList from 'src/lib/components/TreeNodeList/TreeNodeList'
import Loader from './components/Loader/Loader'

/*
 * @typedef {Object} Props
 * @property {TreeData|undefined} data
 * @property {function} onSelect
 * @property {string} defaultActive
 */
interface Props {
  data?: TreeData
  onSelect: (url: string) => void
  defaultActive: string
}

/*
 * Tree menu component
 * @component
 * @param {Props} props
 * @returns {FunctionComponent<Props>}
 * @example
 * const treeData = {} as TreeData
 * const onSelect = (url: string) => console.log(url)
 * const defaultActive = '/'
 * return (
 *   <Tree data={treeData} defaultActive={defaultActive} onSelect={onSelect} />
 * )
 */
export const Tree: FunctionComponent<Props> = (props: Props) => {
  const [tree, setTree] = useState<TreeHelper>()
  const [pages, setPages] = useState<Page[]>()

  useEffect(() => {
    if (props.data) {
      const tree = new TreeHelper(props.data)
      setTree(tree)
      setPages(tree.getTree())
    }
  }, [props.data])

  return (
    <nav className={styles.tree}>
      <ul className={styles.treeList}>
        {pages && tree ? (
          <TreeNodeList
            currentId={props.defaultActive}
            pages={pages}
            tree={tree}
            selectPage={props.onSelect}
          />
        ) : (
          <Loader />
        )}
      </ul>
    </nav>
  )
}
