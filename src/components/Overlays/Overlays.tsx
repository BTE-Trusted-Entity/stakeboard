import styles from './Overlays.module.css'

export const Overlays: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className={styles.overlays}>{children}</div>
)
