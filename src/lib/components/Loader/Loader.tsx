import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <ul className={styles.skeletonList}>
      <li>
        <div className={styles.skeletonFirst} />
      </li>
      <li>
        <div className={styles.skeletonSecond} />
      </li>
      <li>
        <div className={styles.skeletonThird} />
      </li>
      <li>
        <div className={styles.skeletonSecond} />
      </li>
      <li>
        <div className={styles.skeletonFirst} style={{ marginTop: '12px' }} />
      </li>
      <li>
        <div className={styles.skeletonSecond} />
      </li>
      <li>
        <div className={styles.skeletonThird} />
      </li>
      <li>
        <div className={styles.skeletonSecond} />
      </li>
    </ul>
  )
}

export default Loader
