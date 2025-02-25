import React from 'react'
import cx from 'classnames'

import arrow_down from '../../icons/arrow_down.svg'
import arrow_straight from '../../icons/arrow_straight.svg'
import arrow_up from '../../icons/arrow_up.svg'
import block_new from '../../icons/block_new.svg'
import block from '../../icons/block.svg'
import bulb_gray from '../../icons/bulb_gray.svg'
import bulb_yellow from '../../icons/bulb_yellow.svg'
import check from '../../icons/check.svg'
import close from '../../icons/close.svg'
import exclamation_new from '../../icons/exclamation_new.svg'
import exclamation from '../../icons/exclamation.svg'
import fav_gray from '../../icons/fav_gray.svg'
import fav_yellow from '../../icons/fav_yellow.svg'
import BUILT_ON_KILT from '../../icons/Built_on_KILT.svg'
import next_session_gray from '../../icons/next_session_gray.svg'
import next_session_yellow from '../../icons/next_session_yellow.svg'
import order_white from '../../icons/order_white.svg'
import order_yellow from '../../icons/order_yellow.svg'
import pickaxe_gray from '../../icons/pickax_gray.svg'
import pickaxe_orange from '../../icons/pickax_orange.svg'
import pickaxe_yellow from '../../icons/pickax_yellow.svg'
import search from '../../icons/search.svg'
import skateboarder from '../../icons/skateboarder.svg'
import time from '../../icons/time.svg'
import tokens_gray from '../../icons/tokens_gray.svg'
import tokens_white from '../../icons/tokens_white.svg'
import tokens_yellow from '../../icons/tokens_yellow.svg'
import plus_active from '../../icons/plus_active.svg'
import minus_active from '../../icons/minus_active.svg'
import plus_inactive from '../../icons/plus_inactive.svg'
import minus_inactive from '../../icons/minus_inactive.svg'
import firefox_store from '../../icons/Firefox_AddOn.svg'
import chrome_store from '../../icons/Google_WebStore.svg'
import sporran_logo from '../../icons/sporran.svg'
import styles from './Icon.module.css'

const Icons = {
  arrow_down,
  arrow_straight,
  arrow_up,
  block_new,
  block,
  bulb_gray,
  bulb_yellow,
  BUILT_ON_KILT,
  check,
  close,
  exclamation_new,
  exclamation,
  fav_gray,
  fav_yellow,
  next_session_gray,
  next_session_yellow,
  order_white,
  order_yellow,
  pickaxe_gray,
  pickaxe_orange,
  pickaxe_yellow,
  search,
  skateboarder,
  time,
  tokens_gray,
  tokens_white,
  tokens_yellow,
  minus_inactive,
  plus_inactive,
  minus_active,
  plus_active,
  firefox_store,
  chrome_store,
  sporran_logo,
}

export interface Props {
  type: keyof typeof Icons
  pulsing?: boolean
  width?: number
  alt?: string
  tooltip?: string
}

export const Icon: React.FC<Props> = ({
  type,
  pulsing = false,
  width,
  alt = 'Icon',
  tooltip,
}) => {
  return (
    <img
      className={cx(styles.img, { [styles.pulsing]: pulsing })}
      style={{ width }}
      src={Icons[type]}
      alt={alt}
      title={tooltip}
    />
  )
}
