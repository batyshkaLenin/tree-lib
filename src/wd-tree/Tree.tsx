import React, { useEffect, useState } from 'react'
import { TreeData, TPage } from './types'
import { TreeUtil } from './utils'
import styles from './styles.module.scss'
import Loader from './Loader'
import classNames from 'classnames'
import Node from './Node'

/*
 * Properties of Tree component
 * @typedef {Object} Props
 * @property {Types|undefined} data data for tree rendering
 * @property {function} onSelect handle click for nodes and anchors
 * @property {string} active current selected id
 * @property {string|undefined} className classNames for styling tree
 * @property {string[]|undefined} topLevelIds array of top-level ids for rendering tree
 * @property {boolean|undefined} isLoading status of loading for component
 */
interface Props {
  data?: TreeData
  onSelect: (id: string) => void
  active?: string
  className?: string
  topLevelIds?: string[]
  isLoading?: boolean
}

/*
 * Tree menu component
 * @component
 * @param {Props} props {@link Props}
 * @returns {React.FC<Props>}
 */
export const Tree: React.FC<Props> = ({
  data,
  onSelect,
  active,
  className,
  topLevelIds,
  isLoading,
}) => {
  const [tree, setTree] = useState<TreeUtil>()
  const [pages, setPages] = useState<TPage[]>()

  const loading = isLoading || !(pages && tree)

  useEffect(() => {
    if (data) {
      const tree = new TreeUtil(data)
      setTree(tree)
    }
  }, [data])

  useEffect(() => {
    if (tree) {
      if (topLevelIds) {
        setPages(tree.getPagesByIds(topLevelIds))
      } else {
        setPages(tree.getTree())
      }
    }
  }, [topLevelIds, tree])

  return (
    <div className={classNames(styles.root, className)}>
      <Loader loading={loading} />
      {pages && tree && !loading && (
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
