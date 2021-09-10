import React, { ReactNode } from 'react'
import { Modal } from '../../components/Modal/Modal'
import styles from '../../components/Modal/Modal.module.css'

interface Props {
  children: ReactNode
}
interface State {
  error: boolean
  errorInfo: any
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: false, errorInfo: '' }
  }

  static getDerivedStateFromError(error: any) {
    return { error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo,
    })
  }

  render(): ReactNode {
    const { error, errorInfo } = this.state
    const { children } = this.props
    return error ? (
      <Modal title="Error">
        <>
          There was an Error:
          <p className={styles.errorText}>{errorInfo.toString()}</p>
          Please reload the page
        </>
        <>{error && errorInfo.componentStack}</>
        <br />
      </Modal>
    ) : (
      children
    )
  }
}

export default ErrorBoundary
