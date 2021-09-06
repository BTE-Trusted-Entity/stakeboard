import React, { useContext, useState, useEffect } from 'react'
import { Button } from '../../components/Button/Button'
import { StateContext } from '../../utils/StateContext'
import { TokenBar } from '../../components/Dashboard/TokenBar'
import { Identicon } from '../../components/Identicon/Identicon'
import styles from './IdentityView.module.css'
import cx from 'classnames'
import { withdrawStake } from '../../utils/chain'
import { femtoToKilt } from '../../utils/conversion'
import { padTime, blockToTime } from '../../utils/timeConvert'
import { ChainTypes } from '../../types'
import { format } from '../../utils/index'
export interface Props {
  toggleDetailedIdentityView: () => void
  bestBlock?: ChainTypes.BlockNumber
}

function getPercent(percentageValue: number, secondValue: number) {
  const total = percentageValue + secondValue
  const percent = (percentageValue / total) * 100
  return percent.toFixed(1)
}

export const IdentityView: React.FC<Props> = ({
  toggleDetailedIdentityView,
  bestBlock,
}) => {
  const [readyToWithdraw, setReadyToWithdraw] = useState(0)
  // placeholder
  const {
    state: { account },
    dispatch,
  } = useContext(StateContext)

  const withdraw = async () => {
    if (readyToWithdraw > 0 && account) {
      await withdrawStake(account.address)
    }
  }

  useEffect(() => {
    if (!account || !bestBlock) return

    const unstakeable = account.unstaking
      .filter((val) => val.block < BigInt(bestBlock.toString()))
      .map((val) => {
        return femtoToKilt(val.amount)
      })

    const sumAllStakeable = unstakeable.reduce((a, b) => a + b, 0)

    setReadyToWithdraw(sumAllStakeable)
  }, [account, bestBlock])

  // TODO: placeholder for the error notifications
  if (!account || !bestBlock) return <></>

  return (
    <div className={styles.identityView}>
      <div className={styles.container}>
        <div className={styles.identityViewHeader}>
          <div className={styles.identiconContainer}>
            <Identicon address={account.address} />
          </div>
          <div className={cx(styles.label, styles.labelGray, styles.name)}>
            {account?.name}
          </div>
          <div className={styles.tokenbarContainer}>
            <TokenBar staked={account.staked} stakeable={account.stakeable} />
          </div>
        </div>
        <div className={styles.identityStakeContainer}>
          <span className={cx(styles.labelSmall, styles.labelGray)}>
            my stake <br />
            <span className={cx(styles.label, styles.labelYellow)}>
              {format(account.staked)} | <span />
              {getPercent(account.staked, account.stakeable)} %
            </span>
          </span>
          <span
            className={cx(
              styles.labelSmall,
              styles.labelGray,
              styles.textRight
            )}
          >
            stakeable <br />
            <span className={cx(styles.label, styles.labelOrange)}>
              {getPercent(account.stakeable, account.staked)} % | <span />
              {format(account.stakeable)}
            </span>
          </span>
        </div>
        <div className={styles.lockedContainer}>
          <span
            className={cx(
              styles.labelSmall,
              styles.labelGray,
              styles.orangeBar
            )}
          >
            Ready to withdraw
          </span>
          {readyToWithdraw > 0 && (
            <div className={styles.buttonCont}>
              <Button onClick={withdraw} label={'withdraw'} />
              <span className={cx(styles.label, styles.labelGray)}>
                {readyToWithdraw && format(readyToWithdraw)}
              </span>
            </div>
          )}
          <span
            className={cx(styles.labelSmall, styles.labelGray, styles.redBar)}
          >
            Locked for 7 days (stakeable)
          </span>
          {account.unstaking.map((val, index) => {
            const blockCount = val.block - BigInt(bestBlock.toString())
            if (blockCount < 0) return <></>
            const { days, hours, minutes, seconds } = blockToTime(
              Number(blockCount)
            )

            const daysPad = padTime(days)
            const hoursPad = padTime(hours)
            const minutesPad = padTime(minutes)
            const secondsPad = padTime(seconds)

            const timeable = `${daysPad}d : ${hoursPad}h : ${minutesPad}m : ${secondsPad}s`
            return (
              <div key={index}>
                <span className={cx(styles.labelSmall, styles.labelGray)}>
                  {`${index + 1}/${account.unstaking.length} ${timeable}`}
                </span>{' '}
                {format(femtoToKilt(val.amount))}
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => {
            dispatch({ type: 'unselectAccount', account: undefined })
            toggleDetailedIdentityView()
          }}
          label={'close'}
        />
      </div>
    </div>
  )
}
