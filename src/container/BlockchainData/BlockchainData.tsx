import React, { useContext, useEffect, useState } from 'react'
import { Account, Candidate, ChainTypes, Data, StakingRates } from '../../types'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import { femtoKiltToDigits, femtoToKilt } from '../../utils/conversion'
import { AccountInfo, initialize, OverallTotalStake } from '../../utils/polling'
import { StateContext } from '../../utils/StateContext'
import { StoredStateContext } from '../../utils/StoredStateContext'

export interface Props {
  partialAccounts: Pick<Account, 'address' | 'name'>[]
  children: React.ReactNode
}

export const BlockchainData: React.FC<Props> = ({
  partialAccounts,
  children,
}) => {
  const [candidates, setCandidates] = useState<Record<string, Candidate>>({})
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [currentCandidates, setCurrentCandidates] = useState<string[]>([])
  const [dataSet, setDataSet] = useState<Data[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [sessionInfo, setSessionInfo] = useState<ChainTypes.RoundInfo>()
  const [bestBlock, setBestBlock] = useState<number>()
  const [bestFinalisedBlock, setBestFinalisedBlock] = useState<number>()
  const [minDelegatorStake, setMinDelegatorStake] = useState<number>()
  const [
    overallTotalStake,
    setOverallTotalStake,
  ] = useState<OverallTotalStake>()
  const [totalIssuance, setTotalIssuance] = useState<bigint>()
  const [maxCandidateCount, setMaxCandidateCount] = useState<number>()
  const [maxNumberDelegators, setMaxNumberDelegators] = useState<number>()
  const [accountInfos, setAccountInfos] = useState<
    Record<string, AccountInfo> | undefined
  >({})
  const [chainInfoActivate, setChainInfoActivate] = useState<boolean>(false)
  const [stakingRates, setStakingRates] = useState<StakingRates>()

  const { storedState } = useContext(StoredStateContext)
  const { state, dispatch } = useContext(StateContext)

  // Query timer
  useEffect(() => {
    let stop = () => {}
    const doEffect = async () => {
      stop = await initialize(
        5,
        partialAccounts.map((account) => account.address),
        (
          newCandidates,
          newSelectedCandidates,
          newCurrentCandidates,
          chainInfo,
          newAccountInfos
        ) => {
          setCandidates(newCandidates)
          setSelectedCandidates(newSelectedCandidates)
          setCurrentCandidates(newCurrentCandidates)
          setSessionInfo(chainInfo.sessionInfo)
          setBestBlock(chainInfo.bestBlock)
          setBestFinalisedBlock(chainInfo.bestFinalisedBlock)
          setOverallTotalStake(chainInfo.overrallTotalStake)
          setTotalIssuance(chainInfo.totalIssuance)
          setAccountInfos(newAccountInfos)
          setMaxCandidateCount(chainInfo.maxCandidateCount)
          setMinDelegatorStake(chainInfo.minDelegatorStake)
          setMaxNumberDelegators(chainInfo.maxNumberDelegators)
          setChainInfoActivate(true)
          setStakingRates(chainInfo.stakingRates)
        }
      )
    }

    doEffect()
    return () => {
      stop()
    }
  }, [partialAccounts])

  useEffect(() => {
    if (state.connection.status !== 'connected' && !chainInfoActivate) {
      dispatch({ type: 'unavailable' })
    } else if (state.connection.status === 'connected' && !chainInfoActivate) {
      dispatch({ type: 'loading' })
    } else if (state.connection.status === 'connected' && chainInfoActivate) {
      dispatch({ type: 'available' })
    }
  }, [chainInfoActivate, dispatch, state.connection.status])

  // Full dataset from queried collators
  useEffect(() => {
    const newDataSet: Data[] = Object.values(candidates).map((candidate) => {
      const totalStake =
        candidate.stake +
        candidate.delegators.reduce(
          (prev, current) => prev + current.amount,
          0n
        )

      const sortedLowestStake = candidate.delegators.sort((a, b) =>
        a.amount >= b.amount ? 1 : -1
      )
      const lowestStake = sortedLowestStake.length
        ? femtoToKilt(sortedLowestStake[0].amount)
        : null

      return {
        active: currentCandidates.includes(candidate.id),
        activeNext: selectedCandidates.includes(candidate.id),
        collator: candidate.id,
        delegators: candidate.delegators.length,
        lowestStake: lowestStake,
        totalStake: femtoToKilt(totalStake),
        stakes: candidate.userStakes.map(({ account, stake }) => ({
          account,
          stake: femtoToKilt(stake),
        })),
        favorite: storedState.favorites.includes(candidate.id),
        isLeaving: !!candidate.isLeaving,
      }
    })

    setDataSet(newDataSet)
  }, [candidates, storedState, selectedCandidates, currentCandidates])

  // Accounts and their queried info
  useEffect(() => {
    if (!accountInfos) return
    // We need data from the chain for all the accounts before mapping the final account object together
    if (!partialAccounts.every((account) => accountInfos[account.address]))
      return
    // TODO: get data on actual stake / stakeable / other amounts
    const completeAccounts: Account[] = partialAccounts.map((account) => ({
      address: account.address,
      name: account.name,
      rewards: femtoKiltToDigits(accountInfos[account.address].rewards, 6),
      staked: femtoToKilt(accountInfos[account.address].totalStake),
      stakeable: femtoToKilt(accountInfos[account.address].stakeable),
      unstaking: accountInfos[account.address].unstaking,
      used:
        accountInfos[account.address].totalStake > 0 ||
        accountInfos[account.address].unstaking.length > 0,
    }))
    setAccounts(completeAccounts)
  }, [partialAccounts, accountInfos])

  return (
    <BlockchainDataContext.Provider
      value={{
        dataSet,
        accounts,
        sessionInfo,
        bestBlock,
        bestFinalisedBlock,
        overallTotalStake,
        totalIssuance,
        maxCandidateCount,
        minDelegatorStake,
        maxNumberDelegators,
        stakingRates,
      }}
    >
      {children}
    </BlockchainDataContext.Provider>
  )
}
