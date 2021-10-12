import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import styles from '../../components/Modal/Modal.module.css'
import { StateContext } from '../../utils/StateContext'
import { ErrorCode } from '../../types/ErrorCode'

export const ErrorNotification: React.FC = () => {
  const {
    state: {
      error: { hasError, error },
    },
    dispatch,
  } = useContext(StateContext)

  if (!hasError) return null
  let errorMessaging

  if (error.index === ErrorCode.DelegationsPerRoundExceeded) {
    errorMessaging =
      'The identity your delegating has hit its maximum for this session. Please wait for the next session and try again.'
  } else {
    errorMessaging = error
  }

  return (
    <Modal
      title="Error"
      buttons={
        <Button
          onClick={() => dispatch({ type: 'resetError' })}
          label={'close'}
        />
      }
    >
      <>
        There was an Error:
        <p className={styles.errorText}>{errorMessaging.toString()}</p>
      </>
    </Modal>
  )
}
