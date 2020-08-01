import React, { useEffect, useState } from 'react'
import { TreeData, TPage } from './types'
import { TreeHelper } from './utils'
import styles from './styles.module.scss'
import Loader from './Loader'
import classNames from 'classnames'
import Node from './Node'

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
 * import { Tree, TreeType, getIdByURL } from 'wd-tree'
 *
 * const [tree, setTree] = useState<TreeType>()
 * const [active, setActive] = React.useState<string>('')
 * useEffect(() => {
 *   axios.get('data.json').then((res) => {
 *     setTree(res.data)
 *     setCurrentId(getIdByURL(res.data) || '')
 *   })
 * }, [])
 *
 * const selectPage = (id: string) => setCurrentId(id)
 *
 * return (
 *   <Tree data={tree} active={active} onSelect={selectPage} />
 * )
 */
export const Tree: React.FC<Props> = (props: Props) => {
  const [tree, setTree] = useState<TreeHelper>()
  const [pages, setPages] = useState<TPage[]>()

  const loading = !(pages && tree)

  useEffect(() => {
    if (props.data) {
      const tree = new TreeHelper(props.data)
      setTree(tree)
      setPages(tree.getTree())
    }
  }, [props.data])

  return (
    <div className={styles.root}>
      <Loader loading={loading} />
      {pages && tree && (
        <ul className={classNames(styles.tree, styles.treeNav)}>
          {pages.map((i, key) => (
            <Node
              active={props.active}
              page={i}
              selectPage={props.onSelect}
              tree={tree}
              key={key}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
