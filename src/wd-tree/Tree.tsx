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
  className?: string
}

/*
 * Tree menu component
 * @component
 * @param {Props} props
 * @returns {React.FC<Props>}
 */
export const Tree: React.FC<Props> = ({
  data,
  onSelect,
  active,
  className,
}) => {
  const [tree, setTree] = useState<TreeUtil>()
  const [pages, setPages] = useState<TPage[]>()

  const loading = !(pages && tree)

  useEffect(() => {
    if (data) {
      const tree = new TreeUtil(data)
      setTree(tree)
      setPages(tree.getTree())
    }
  }, [data])

  return (
    <div className={classNames(styles.root, className)}>
      <Loader loading={loading} />
      {pages && tree && (
        <ul className={classNames(styles.tree, styles.treeNav)}>
          {pages.map(page => (
            <Node
              active={active}
              page={page}
              onSelect={onSelect}
              tree={tree}
              key={page.id}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
