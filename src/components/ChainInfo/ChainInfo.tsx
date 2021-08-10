import React, { useContext } from 'react'
import { Option } from '../Select/Select'
import { StateContext } from '../../utils/StateContext'
import styles from './ChainInfo.module.css'
import cx from 'classnames'
import { Icon } from '../Icon/Icon'
import { RefreshSelector } from '../RefreshSelector/RefreshSelector'

// TODO: add features to refresh currently a placeholder
const options: Option[] = [
  { label: '10 secs', value: '10' },
  { label: '20 secs', value: '20' },
  { label: '60 secs', value: '60' },
  { label: '5 mins', value: '300' },
]

export const ChainInfo: React.FC = () => {
  const {
    dispatch,
    state: { toggle },
  } = useContext(StateContext)
  return (
    <div className={cx(toggle ? styles.chaininfo : styles.chaininfoPaused)}>
      <div className={styles.container}>
        <span className={styles.label}>Session Countdown</span>
        <span
          className={cx(toggle ? styles.countdown : styles.countdownPaused)}
        >
          2:00:00
        </span>
        <span className={styles.lineSpacer}>{toggle ? null : '|'}</span>
        <span className={styles.refreshPaused}>
          {toggle ? null : 'REFRESH PAUSED'}
        </span>
      </div>
      <div className={styles.container}>
        <Icon type='block_new' />
        <span className={styles.label}>Best Block</span>{' '}
        <span className={cx(toggle ? styles.value : styles.valuePaused)}>
          # 8,888,888
        </span>
        <span className={styles.leftMargin}>
          <Icon type='block_new' />
        </span>
        <span className={cx(styles.label)}>Finalized Block</span>{' '}
        <span className={cx(toggle ? styles.value : styles.valuePaused)}>
          # 8,888,888
        </span>
        <div className={cx(styles.label, styles.leftMargin)}>Refresh Every</div>
        <div className={cx(styles.label, styles.refreshDropdown)}>
          <RefreshSelector options={options} placeholder={'10 secs'} />
        </div>
        <span
          className={styles.onOff}
          onClick={() => dispatch({ type: 'toggle', toggle })}
        >
          {toggle ? (
            <Icon type='ON_70x36' width={70} />
          ) : (
            <Icon type='OFF_70x36' width={70} />
          )}
        </span>
      </div>
    </div>
  )
}
