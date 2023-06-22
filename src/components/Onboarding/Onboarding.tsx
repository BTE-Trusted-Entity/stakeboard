import React, { useContext, useEffect, useState } from 'react'
import styles from './Onboarding.module.css'
import { Account, Extension } from '../../types'
import bg1 from '../../pics/FTU_BG_01.png'
import bg2 from '../../pics/FTU_BG_02.png'
import bg3 from '../../pics/FTU_BG_03.png'
import bg4 from '../../pics/FTU_BG_04.png'
import { StateContext } from '../../utils/StateContext'
import { Overlays } from '../Overlays/Overlays'
import { NoExtension } from './NoExtension'
import { NoAccount } from './NoAccount'
import { NoTokens } from './NoTokens'
import { NotAcceptedTerms } from './NotAcceptedTerms'
import { NoData } from './NoData'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'

const backgrounds = [bg1, bg2, bg3, bg4]

enum OnboardingStatus {
  NoExtension,
  NoAccount,
  NoTokens,
  NoData,
  NotAcceptedTerms,
  Ok,
}

function isUsableAccount(
  account: Account,
  minDelegatorStake: number | undefined
) {
  if (account.staked > 0) return true
  if (minDelegatorStake && account.stakeable >= minDelegatorStake + 1)
    return true
  if (account.unstaking.length > 0) return true
}

function needsOnboarding(
  extensions: Extension[],
  accounts: Account[],
  termsAccepted: boolean,
  minDelegatorStake: number | undefined,
  loadingDataStatus: string
) {
  if (!termsAccepted) {
    return OnboardingStatus.NotAcceptedTerms
  } else if (loadingDataStatus === 'loading') {
    return OnboardingStatus.NoData
  } else if (extensions.length === 0) {
    return OnboardingStatus.NoExtension
  } else if (accounts.length === 0) {
    return OnboardingStatus.NoAccount
  } else if (
    !accounts.some((account) => isUsableAccount(account, minDelegatorStake))
  ) {
    return OnboardingStatus.NoTokens
  } else {
    return OnboardingStatus.Ok
  }
}

export interface OnboardingContentProps {
  status: OnboardingStatus
}

const OnboardingContent: React.FC<OnboardingContentProps> = ({ status }) => {
  switch (status) {
    case OnboardingStatus.NotAcceptedTerms:
      return <NotAcceptedTerms />
    case OnboardingStatus.NoExtension:
      return <NoExtension />
    case OnboardingStatus.NoAccount:
      return <NoAccount />
    case OnboardingStatus.NoData:
      return <NoData />
    case OnboardingStatus.NoTokens:
      return <NoTokens />
  }
  return null
}

const DownloadLinks: React.FC = () => {
  return (
    <div className={styles.downloadContainer}>
      <span className={styles.icon}>
        <Button
          onClick={() => {
            window.open(
              'https://chrome.google.com/webstore/detail/sporran/djdnajgjcbjhhbdblkegbcgodlkkfhcl',
              '_blank'
            )
          }}
        >
          <Icon type="chrome_store" width={200} />
        </Button>
      </span>
      <span className={styles.icon}>
        <Button
          onClick={() => {
            window.open(
              'https://addons.mozilla.org/de/firefox/addon/sporran/',
              '_blank'
            )
          }}
        >
          <Icon type="firefox_store" width={200} />
        </Button>
      </span>
      <span className={styles.icon}>
        <Icon type="sporran_logo" width={70} />
      </span>
    </div>
  )
}

export interface Props {
  extensions: Extension[]
  children: React.ReactNode
}
export const Onboarding: React.FC<Props> = ({ extensions, children }) => {
  const { accounts, minDelegatorStake } = useContext(BlockchainDataContext)

  const [background, setBackground] = useState<string | null>(null)

  useEffect(() => {
    const random = Math.floor(Math.random() * backgrounds.length)
    setBackground(backgrounds[random])
  }, [])

  const {
    state: { termsAccepted, loadingData },
  } = useContext(StateContext)

  const status = needsOnboarding(
    extensions,
    accounts,
    termsAccepted,
    minDelegatorStake,
    loadingData
  )

  if (status === OnboardingStatus.Ok) {
    return <>{children}</>
  } else {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
        }}
        className={styles.backgroundImage}
      >
        <Overlays>
          <div className={styles.container}>
            <OnboardingContent status={status} />
          </div>
          <DownloadLinks />
        </Overlays>
      </div>
    )
  }
}
