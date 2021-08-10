import React, { useContext } from 'react'
import styles from './Dashboard.module.css'
import { Account } from '../../types'
import { Accounts } from './Accounts'
import { StateContext } from '../../utils/StateContext'
import cx from 'classnames'

export interface Props {
  accounts: Account[]
}

export const Dashboard: React.FC<Props> = ({ accounts }) => {
  const {
    state: { toggle },
  } = useContext(StateContext)

  return (
    <div className={styles.dashboard}>
      <div className={cx(toggle === true ? null : styles.pauseOverlay)} />
      <div className={styles.accounts}>
        <Accounts accounts={accounts} />
      </div>
    </div>
  )
}
