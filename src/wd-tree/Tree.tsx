import React, { useEffect, useState } from 'react'
import { TreeData, TPage } from './types'
import { TreeUtil } from './utils'
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
 */
export const Tree: React.FC<Props> = (props: Props) => {
  const [tree, setTree] = useState<TreeUtil>()
  const [pages, setPages] = useState<TPage[]>()

  const loading = !(pages && tree)

  useEffect(() => {
    if (props.data) {
      const tree = new TreeUtil(props.data)
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
              onSelect={props.onSelect}
              tree={tree}
              key={key}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
