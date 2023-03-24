import { TEntityModel } from 'api/blocksync/types/entities'
import {
  TEntityAdministratorModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageSectionModel,
  TEntityProfileModel,
} from 'types/protocol'
import {
  CurrentEntityActions,
  UpdateEntityAction,
  UpdateEntityProfileAction,
  UpdateEntityCreatorAction,
  UpdateEntityAdministratorAction,
  UpdateEntityPageAction,
  UpdateEntityTagsAction,
} from './currentEntity.types'

export const updateEntityAction = (data: TEntityModel): UpdateEntityAction => ({
  type: CurrentEntityActions.UpdateEntity,
  payload: data,
})

export const updateEntityProfileAction = (profile: TEntityProfileModel): UpdateEntityProfileAction => ({
  type: CurrentEntityActions.UpdateEntityProfile,
  payload: profile,
})

export const updateEntityCreatorAction = (creator: TEntityCreatorModel): UpdateEntityCreatorAction => ({
  type: CurrentEntityActions.UpdateEntityCreator,
  payload: creator,
})

export const updateEntityAdministratorAction = (
  administrator: TEntityAdministratorModel,
): UpdateEntityAdministratorAction => ({
  type: CurrentEntityActions.UpdateEntityAdministrator,
  payload: administrator,
})

export const updateEntityPageAction = (page: TEntityPageSectionModel[]): UpdateEntityPageAction => ({
  type: CurrentEntityActions.UpdateEntityPage,
  payload: page,
})

export const updateEntityTagsAction = (tags: TEntityDDOTagModel[]): UpdateEntityTagsAction => ({
  type: CurrentEntityActions.UpdateEntityTags,
  payload: tags,
})
