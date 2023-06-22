import React, { useContext } from 'react'
import styles from './Dashboard.module.css'
import { Extension } from '../../types'
import { Accounts } from './Accounts'
import { StateContext } from '../../utils/StateContext'
import { IdentityView } from '../../container/IdentityView/IdentityView'
import { Scale } from '../Scale/Scale'
import { Onboarding } from '../Onboarding/Onboarding'
import { Overlays } from '../Overlays/Overlays'

export interface Props {
  extensions: Extension[]
}

type RefreshPausedOverlayProps = {
  refreshPaused: boolean
  children: React.ReactNode
}

const RefreshPausedOverlay: React.FC<RefreshPausedOverlayProps> = ({
  children,
  refreshPaused,
}) =>
  refreshPaused ? (
    <div className={styles.pauseOverlay} children={children} />
  ) : (
    <>{children}</>
  )

export const Dashboard: React.FC<Props> = ({ extensions }) => {
  const {
    state: { refreshPaused, account },
  } = useContext(StateContext)

  return (
    <div className={styles.dashboard}>
      <Onboarding extensions={extensions}>
        <Overlays>
          <RefreshPausedOverlay refreshPaused={refreshPaused}>
            {account ? (
              <IdentityView />
            ) : (
              <>
                <div className={styles.accountsContainer}>
                  <>
                    <div className={styles.accounts}>
                      <Accounts />
                    </div>
                  </>
                </div>
                <div className={styles.scaleContainer}>
                  <Scale />
                </div>
              </>
            )}
          </RefreshPausedOverlay>
        </Overlays>
      </Onboarding>
    </div>
  )
}
