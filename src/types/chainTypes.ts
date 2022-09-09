import type { Struct, Vec, Enum, Null } from '@polkadot/types'
import type {
  AccountId,
  Balance,
  SessionIndex,
  BlockNumber,
  Perquintill,
} from '@polkadot/types/interfaces'
export type { BlockNumber }

export interface Stake extends Struct {
  owner: AccountId
  amount: Balance
}

export interface CollatorStatus extends Enum {
  asActive: Null
  asLeaving: SessionIndex
  isActive: boolean
  isLeaving: boolean
}
export interface Collator extends Struct {
  id: AccountId
  stake: Balance
  delegators: Vec<Stake>
  total: Balance
  status: CollatorStatus
}

export interface RoundInfo extends Struct {
  current: SessionIndex
  first: BlockNumber
  length: BlockNumber
}

export interface Delegator extends Struct {
  owner: AccountId
  amount: Balance
}

export interface TotalStake extends Struct {
  collators: Balance
  delegators: Balance
}

export interface StakingRates extends Struct {
  collatorStakingRate: Perquintill
  collatorRewardRate: Perquintill
  delegatorStakingRate: Perquintill
  delegatorRewardRate: Perquintill
}
