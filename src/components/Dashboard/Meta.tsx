import React, { useContext } from 'react'
import styles from './Meta.module.css'
import cx from 'classnames'
import { Identicon } from '../Identicon/Identicon'
import { format } from '../../utils'
import { Account, AccountWithPct } from '../../types'
import { AccountInfo } from './AccountInfo'
import { Button } from '../Button/Button'
import { AccountContext } from '../../utils/AccountContext'

export interface MetaProps {
  account: AccountWithPct
}
export const MetaUp: React.FC<MetaProps> = ({ account }) => {
  return (
    <div className={styles.meta}>
      <div className={styles.identicon}>
        <Identicon address={account.address} />
        <div className={styles.line}></div>
      </div>
      <AccountInfo account={account} />
    </div>
  )
}

export const MetaDown: React.FC<MetaProps> = ({ account }) => {
  return (
    <div className={styles.metaDown}>
      <div className={cx(styles.identicon, styles.identiconDown)}>
        <div className={cx(styles.line, styles.lineDown)} />
        <Identicon address={account.address} />
      </div>
      <AccountInfo account={account} />
    </div>
  )
}

export interface UnusedMetaProps {
  accounts: Account[]
  total: number
  down: boolean
  toggleDetailedIdentityView: () => void
}

export const UnusedMeta: React.FC<UnusedMetaProps> = ({
  accounts,
  total,
  down,
  toggleDetailedIdentityView,
}) => {
  const { dispatch } = useContext(AccountContext)

  return (
    <div className={cx({ [styles.metaDown]: down, [styles.meta]: !down })}>
      <div className={cx(styles.identicon, { [styles.identiconDown]: down })}>
        <div className={cx(styles.line, { [styles.lineDown]: down })} />
        {accounts.map((account) => (
          <span key={account.address} className={styles.unusedIdenticon}>
            <Identicon address={account.address} />
            <Button
              onClick={() => {
                dispatch({ type: 'selectedAccount', account })
                toggleDetailedIdentityView()
              }}
              label={'open'}
            />
          </span>
        ))}
      </div>
      <div className={styles.unusedInfo}>
        <div>
          {format(total)} available for staking in your {accounts.length} other
          KILT identities
        </div>
      </div>
    </div>
  )
}
