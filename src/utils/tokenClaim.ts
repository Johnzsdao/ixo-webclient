import { Claim } from '@ixo/impactxclient-sdk/types/codegen/Cw20Stake.types'

export function claimAvailable(claim: Claim, blockHeight: number) {
  if ('at_height' in claim.release_at) {
    return blockHeight >= claim.release_at.at_height
  } else if ('at_time' in claim.release_at) {
    const currentTimeNs = new Date().getTime() * 1000000
    return currentTimeNs >= Number(claim.release_at.at_time)
  }

  // Unreachable.
  return false
}
