import { ApiPromise, WsProvider } from '@polkadot/api'
import { types12 as types } from '@kiltprotocol/type-definitions'
import type { Struct, Vec, Enum, Null, Option } from '@polkadot/types'
import type {
  AccountId,
  Balance,
  SessionIndex,
} from '@polkadot/types/interfaces'

let cachedApi: ApiPromise | null = null

// const ENDPOINT = 'wss://kilt-peregrine-k8s.kilt.io'
const ENDPOINT = 'wss://kilt-peregrine-stg.kilt.io'

export async function connect() {
  if (!cachedApi) {
    const wsProvider = new WsProvider(ENDPOINT)
    cachedApi = await ApiPromise.create({ provider: wsProvider, types })
  }
  if (!cachedApi.isConnected) {
    await cachedApi.connect()
  }
  return cachedApi
}

export function disconnect() {
  return cachedApi?.disconnect()
}

export async function getGenesis() {
  const api = await connect()
  // @ts-ignore
  window.api = api
  return api.genesisHash.toHex()
}

export interface Stake extends Struct {
  owner: AccountId
  amount: Balance
}
export async function getCandidatePool() {
  const api = await connect()
  const candidatePool = await api.query.parachainStaking.candidatePool<
    Vec<Stake>
  >()

  candidatePool.map((stake) => {
    console.log(stake.owner.toHuman())
    console.log(stake.amount.toBigInt())
  })

  return candidatePool
}

export async function subscribeToCandidatePool(
  listener: (result: Vec<Stake>) => void
) {
  const api = await connect()
  // @ts-ignore
  window.trigger = (pool) => {
    listener(pool)
  }
  api.query.parachainStaking.candidatePool<Vec<Stake>>(listener)
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
  state: CollatorStatus
}

export async function subscribeToCollatorState(
  account: string,
  listener: (result: Option<Collator>) => void
) {
  const api = await connect()
  return await api.query.parachainStaking.collatorState<Option<Collator>>(
    account,
    listener
  )
}

export async function getAllCollatorState() {
  const api = await connect()
  return api.query.parachainStaking.collatorState.entries<
    Option<Collator>,
    [AccountId]
  >()
}
