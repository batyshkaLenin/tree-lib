import React from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'

interface Props {
  loading: boolean
}

const Loader = ({ loading }: Props) => {
  return loading ? (
    <div className={classNames(styles.loader, loading && styles.loaderVisible)}>
      <div className={classNames(styles.loaderLine, styles.loaderLine1)} />
      <div className={classNames(styles.loaderLine, styles.loaderLine2)} />
      <div className={classNames(styles.loaderLine, styles.loaderLine3)} />
      <div className={classNames(styles.loaderLine, styles.loaderLine4)} />
      <div className={classNames(styles.loaderLine, styles.loaderLine1)} />
      <div className={classNames(styles.loaderLine, styles.loaderLine2)} />
      <div className={classNames(styles.loaderLine, styles.loaderLine3)} />
      <div className={classNames(styles.loaderLine, styles.loaderLine4)} />
    </div>
  ) : (
    <></>
  )
}

export default Loader
