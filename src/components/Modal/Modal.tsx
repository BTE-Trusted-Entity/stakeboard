import { Modal as DialogModal } from 'react-dialog-polyfill'
import { Icon } from '../Icon/Icon'
import styles from './Modal.module.css'

export interface Props {
  title: string
  buttons?: React.ReactNode
  children: React.ReactNode
}

export const Modal: React.FC<Props> = ({ children, buttons, title }) => {
  return (
    <div>
      <div className={styles.modalOverlay} />
      <DialogModal open className={styles.modal}>
        <div className={styles.modalTitleWrapper}>
          <span className={styles.modalTitle}>{title}</span>
          <span className={styles.stakeboarder}>
            <Icon type="skateboarder" width={35} />
          </span>
        </div>
        <div className={styles.textWrapper}>{children}</div>
        <div className={styles.buttonWrapper}>{buttons}</div>
      </DialogModal>
    </div>
  )
}
