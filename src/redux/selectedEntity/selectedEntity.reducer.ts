import { SelectedEntityActions, SelectedEntityActionTypes, Entity } from './selectedEntity.types'

export const initialState: Entity = null as any

export const reducer = (state = initialState, action: SelectedEntityActionTypes): any => {
  switch (action.type) {
    case SelectedEntityActions.GetEntitySuccess:
      return { ...state, ...action.payload }
    case SelectedEntityActions.GetEntityClaimsSuccess:
      return {
        ...state,
        claims: action.payload,
      }
    case SelectedEntityActions.ClearEntity:
      return null
    case SelectedEntityActions.GetEntityBond:
      return {
        ...state,
        bondDid: action.bondDid,
      }
    case SelectedEntityActions.GetEntityClaimsFailure:
    case SelectedEntityActions.GetEntityFailure:
      return {
        ...state,
        error: action.payload,
      }
  }

  return state
}
