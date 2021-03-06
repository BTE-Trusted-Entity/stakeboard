import { useContext } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'

import { StateContext } from './StateContext'

let cachedApi: Promise<ApiPromise> | null = null
let wsProvider: WsProvider | null = null

const ENDPOINT =
  process.env.REACT_APP_FULL_NODE_ENDPOINT || 'wss://peregrine.kilt.io/parachain-public-ws'

export const useConnect = () => {
  const { dispatch } = useContext(StateContext)

  if (!cachedApi) {
    wsProvider = new WsProvider(ENDPOINT)
    cachedApi = ApiPromise.create({
      provider: wsProvider,
    })

    wsProvider.on('disconnected', () => dispatch({ type: 'disconnected' }))
    wsProvider.on('connected', () => dispatch({ type: 'connected' }))
    wsProvider.on('error', (error) => dispatch({ type: 'error', err: error }))
  }

  return cachedApi
}

export const getConnection = async () => {
  if (!cachedApi)
    throw new Error('Connection to Blockchain was not initialized')

  let resolved = await cachedApi
  while (!resolved.isConnected) {
    // Wait until the connection is back
    await new Promise((done) => setTimeout(() => done(null), 2000))
  }
  return resolved
}

export async function disconnect() {
  return (await cachedApi)?.disconnect()
}
