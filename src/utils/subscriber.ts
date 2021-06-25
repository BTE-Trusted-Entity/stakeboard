import { Candidate } from '../types'
import {
  Collator,
  getAllCollatorState,
  subscribeToCandidatePool,
  subscribeToCollatorState,
} from './chain'

let candidates: Record<string, Candidate> = {}

const mapCollatorStateToCandidate = (state: Collator): Candidate => ({
  id: state.id.toString(),
  stake: state.stake.toBigInt(),
  delegators: state.delegators.map((delegator) => {
    return {
      id: delegator.owner.toHuman(),
      amount: delegator.amount.toBigInt(),
    }
  }),
  total: state.total.toBigInt(),
  isLeaving: state.state.isLeaving ? state.state.asLeaving.toBigInt() : false,
})

const updateCollator = (collatorState: Collator) => {
  const id = collatorState.id.toString()
  if (
    candidates[id].total !== collatorState.total.toBigInt() ||
    candidates[id].stake !== collatorState.stake.toBigInt() ||
    candidates[id].isLeaving !== collatorState.state.isLeaving
  ) {
    const newCandidates = {
      ...candidates,
      [id]: {
        ...mapCollatorStateToCandidate(collatorState),
        unsub: candidates[id].unsub
      },
    }
    return newCandidates
  }
  return null
}


export const initialize = async (
  updateCallback: (newCandidates: Record<string, Candidate>) => void
) => {
  // Set initial Candidates
  const collatorStates = await getAllCollatorState()
  const initialCandidates: Record<string, Candidate> = {}
  collatorStates.forEach(async ([accountId, state]) => {
    if (state.isNone) return
    const unwrapped = state.unwrap()
    const candidateId = unwrapped.id.toString()
    initialCandidates[candidateId] = mapCollatorStateToCandidate(unwrapped)

    // Subscribed to changes for this collator candidate
    const unsub = subscribeToCollatorState(
      candidateId,
      (collatorState) => {
        if (collatorState.isNone) return
        const unwrapped = collatorState.unwrap()
        const newCandidates = updateCollator(unwrapped)
        if (newCandidates) {
          candidates = newCandidates
          updateCallback(newCandidates)
        }
      }
    )

    initialCandidates[candidateId].unsub = unsub
  })
  candidates = initialCandidates
  updateCallback(initialCandidates)

  subscribeToCandidatePool((pool) => {
    const poolCandidateIds = pool.map((stake) => stake.owner.toString())
    // Check if candidate is new
    poolCandidateIds.forEach(async (candidateId) => {
      if (!candidates[candidateId]) {
        let unsub: Promise<VoidFunction>
        unsub = subscribeToCollatorState(candidateId, (collatorState) => {
          if (collatorState.isNone) return
          const unwrapped = collatorState.unwrap()
          const id = unwrapped.id.toString()
          const newCandidates = {
            ...candidates,
            [id]: {
              ...mapCollatorStateToCandidate(unwrapped),
              unsub
            }
          }
          candidates = newCandidates
          updateCallback(newCandidates)
        })
      }
    })
    // Check if candidate was removed
    Object.keys(candidates).forEach(candidateId => {
      if(!poolCandidateIds.includes(candidateId)) {
        const candidate = candidates[candidateId]
        candidate.unsub?.then(func => func())
        const {[candidateId]: _, ...newCandidates} = candidates
        candidates = newCandidates
        updateCallback(newCandidates)
      }
    });
  })
}
