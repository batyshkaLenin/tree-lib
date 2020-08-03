import React, { useCallback, useMemo } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'

interface Props {
  loading: boolean
}

const LOADER_BLOCKS = 2
const LOADER_LINES = 4

const Loader: React.FC<Props> = ({ loading }) => {
  const preloaderLines = useMemo(() => {
    const loaderLength = LOADER_BLOCKS * LOADER_LINES
    return new Array(loaderLength).fill(loaderLength)
  }, [])

  const countLine = useCallback(index => (index % LOADER_LINES) + 1, [])

  return loading ? (
    <div className={classNames(styles.loader, loading && styles.loaderVisible)}>
      {preloaderLines.map((_, i) => (
        <div
          className={classNames(
            styles.loaderLine,
            styles[`loaderLine${countLine(i)}`]
          )}
          key={i}
        />
      ))}
    </div>
  ) : (
    <></>
  )
}

export default Loader
