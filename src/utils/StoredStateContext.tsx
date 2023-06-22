import React, { Dispatch, useEffect, useReducer } from 'react'
import {
  favoriteReducer,
  denominationReducer,
  StoredStateActions,
} from '../state/storedReducers'

export interface State {
  favorites: string[]
  denomination: number
}

export const StoredStateContext = React.createContext<{
  storedState: State
  dispatch: Dispatch<StoredStateActions>
}>({
  storedState: { favorites: [], denomination: 64 },
  dispatch: () => null,
})

const mainReducer = (
  { favorites, denomination }: State,
  action: StoredStateActions
) => ({
  favorites: favoriteReducer(favorites, action),
  denomination: denominationReducer(denomination, action),
})

export const StoredStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storedState, dispatch] = useReducer(
    mainReducer,
    {
      favorites: [],
      denomination: 64,
    },
    (initialArg) => {
      try {
        const item = window.localStorage.getItem('staking-state')
        const data = item ? JSON.parse(item) : initialArg
        if (!data.denomination) data.denomination = 64
        return data
      } catch (err) {
        console.log(err)
        return initialArg
      }
    }
  )

  useEffect(() => {
    try {
      window.localStorage.setItem('staking-state', JSON.stringify(storedState))
    } catch (err) {
      console.log(err)
    }
  }, [storedState])

  return (
    <StoredStateContext.Provider value={{ storedState, dispatch }}>
      {children}
    </StoredStateContext.Provider>
  )
}
