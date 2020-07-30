import React, { useEffect, useState } from 'react'
import { TreeData, TPage } from './types'
import { TreeHelper } from './utils'
import styles from './styles.module.scss'
import NodesList from 'src/lib/NodesList'
import Loader from './Loader'

/*
 * @typedef {Object} Props
 * @property {Types|undefined} data
 * @property {function} onSelect
 * @property {string} active
 */
interface Props {
  data?: TreeData
  onSelect: (id: string) => void
  active: string
}

/*
 * Tree menu component
 * @component
 * @param {Props} props
 * @returns {React.FC<Props>}
 * @example
 * const treeData = {} as Types
 * const onSelect = (id: string) => console.log(id)
 * const active = 'top'
 * return (
 *   <Tree data={treeData} active={active} onSelect={onSelect} />
 * )
 */
export const Tree: React.FC<Props> = (props: Props) => {
  const [tree, setTree] = useState<TreeHelper>()
  const [pages, setPages] = useState<TPage[]>()

  useEffect(() => {
    if (props.data) {
      const tree = new TreeHelper(props.data)
      setTree(tree)
      setPages(tree.getTree())
    }
  }, [props.data])

  return (
    <nav className={styles.nav}>
      <ul className={styles.treeList}>
        {pages && tree ? (
          <NodesList
            currentId={props.active}
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
