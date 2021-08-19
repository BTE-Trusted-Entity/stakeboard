import React, { useContext } from 'react'
import styles from './Dashboard.module.css'
import { Account } from '../../types'
import { Accounts } from './Accounts'
import { PauseContext } from '../../utils/PauseContext'
import cx from 'classnames'

export interface Props {
  accounts: Account[]
}

export const Dashboard: React.FC<Props> = ({ accounts }) => {
  const {
    state: { refreshPaused },
  } = useContext(PauseContext)

  return (
    <div className={styles.dashboard}>
      <div className={cx({ [styles.pauseOverlay]: refreshPaused === false })} />
      <div className={styles.accounts}>
        <Accounts accounts={accounts} />
      </div>
    </div>
  )
}
