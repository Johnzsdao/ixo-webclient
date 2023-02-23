import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityServiceModel,
  TEntityLinkedResourceModel,
  ELocalisation,
  TEntityAccordedRightModel,
  TEntityLinkedEntityModel,
  TEntityControllerModel,
  TEntityPageModel,
  TEntityClaimModel1,
  TEntityDDOTagModel,
  TDAOGroupModel,
  TDeedModel,
} from 'types/protocol'

export interface TEntityModel {
  localisation: ELocalisation
  metadata: TEntityMetadataModel
  creator: TEntityCreatorModel
  controller: TEntityControllerModel
  ddoTags: TEntityDDOTagModel[]
  page: TEntityPageModel
  service: TEntityServiceModel[]
  claim: { [id: string]: TEntityClaimModel1 }
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
  accordedRight: { [id: string]: TEntityAccordedRightModel }
  linkedEntity: { [id: string]: TEntityLinkedEntityModel }

  // for DAO
  daoGroups?: { [id: string]: TDAOGroupModel }
  daoController?: string

  // for Deed
  deed?: TDeedModel
}

export interface TCreateEntityState extends TEntityModel {
  entityType: string
  entityClassDid: string

  assetClassDid?: string // TODO: for asset?
  assetInstances?: TEntityModel[] // TODO: for nfts?

  stepNo: number
  breadCrumbs: { text: string; link?: string }[]
  title: string
  subtitle: string
}

export enum ECreateEntityActions {
  UpdateEntityType = 'ixo/create/entity/UPDATE_ENTITY_TYPE',
  GotoStep = 'ixo/create/entity/GOTO_STEP',
  UpdateBreadCrumbs = 'ixo/create/entity/UPDATE_BREAD_CRUMBS',
  UpdateTitle = 'ixo/create/entity/UPDATE_TITLE',
  UpdateSubtitle = 'ixo/create/entity/UPDATE_SUBTITLE',

  UpdateMetadata = 'ixo/create/entity/UPDATE_METADATA',
  UpdateCreator = 'ixo/create/entity/UPDATE_CREATOR',
  UpdateController = 'ixo/create/entity/UPDATE_CONTROLLER',
  UpdateDDOTags = 'ixo/create/entity/UPDATE_DDOTAGS',
  UpdatePage = 'ixo/create/entity/UPDATE_PAGE',
  UpdateService = 'ixo/create/entity/UPDATE_SERVICE',
  UpdateClaim = 'ixo/create/entity/UPDATE_CLAIM',
  UpdateLinkedResource = 'ixo/create/entity/UPDATE_LINKED_RESOURCE',
  UpdateAccordedRight = 'ixo/create/entity/UPDATE_ACCORDED_RIGHT',
  UpdateLinkedEntity = 'ixo/create/entity/UPDATE_LINKED_ENTITY',
  UpdateEntityClassDid = 'ixo/create/entity/UPDATE_ENTITY_CLASS_DID',
  UpdateAssetClassDid = 'ixo/create/entity/UPDATE_ASSET_CLASS_DID',
  AddAssetInstances = 'ixo/create/entity/ADD_ASSET_INSTANCES',
  UpdateAssetInstance = 'ixo/create/entity/UPDATE_ASSET_INSTANCE',
  RemoveAssetInstances = 'ixo/create/entity/REMOVE_ASSET_INSTANCES',
  UpdateLocalisation = 'ixo/create/entity/UPDATE_LOCALISATION',
  Initialize = 'ixo/create/entity/INITIALIZE',
  // for DAO
  UpdateDAOGroups = 'ixo/create/entity/UPDATE_DAO_GROUPS',
  UpdateDAOController = 'ixo/create/entity/UPDATE_DAO_CONTROLLER',
  // for Deed
  UpdateDeed = 'ixo/create/entity/UPDATE_DEED',
}

export interface TUpdateEntityTypeAction {
  type: typeof ECreateEntityActions.UpdateEntityType
  payload: string
}
export interface TGotoStepAction {
  type: typeof ECreateEntityActions.GotoStep
  payload: number
}
export interface TUpdateBreadCrumbsAction {
  type: typeof ECreateEntityActions.UpdateBreadCrumbs
  payload: { text: string; link?: string }[]
}
export interface TUpdateTitleAction {
  type: typeof ECreateEntityActions.UpdateTitle
  payload: string
}
export interface TUpdateSubtitleAction {
  type: typeof ECreateEntityActions.UpdateSubtitle
  payload: string
}
export interface TUpdateMetaDataAction {
  type: typeof ECreateEntityActions.UpdateMetadata
  payload: TEntityMetadataModel
}
export interface TUpdateCreatorAction {
  type: typeof ECreateEntityActions.UpdateCreator
  payload: TEntityCreatorModel
}
export interface TUpdateControllerAction {
  type: typeof ECreateEntityActions.UpdateController
  payload: TEntityControllerModel
}
export interface TUpdateDDOTagsAction {
  type: typeof ECreateEntityActions.UpdateDDOTags
  payload: TEntityDDOTagModel[]
}
export interface TUpdatePageAction {
  type: typeof ECreateEntityActions.UpdatePage
  payload: TEntityPageModel
}
export interface TUpdateServiceAction {
  type: typeof ECreateEntityActions.UpdateService
  payload: TEntityServiceModel[]
}
export interface TUpdateClaimAction {
  type: typeof ECreateEntityActions.UpdateClaim
  payload: { [id: string]: TEntityClaimModel1 }
}
export interface TUpdateLinkedResourceAction {
  type: typeof ECreateEntityActions.UpdateLinkedResource
  payload: { [id: string]: TEntityLinkedResourceModel }
}
export interface TUpdateAccordedRightAction {
  type: typeof ECreateEntityActions.UpdateAccordedRight
  payload: { [id: string]: TEntityAccordedRightModel }
}
export interface TUpdateLinkedEntityAction {
  type: typeof ECreateEntityActions.UpdateLinkedEntity
  payload: { [id: string]: TEntityLinkedEntityModel }
}
export interface TUpdateEntityClassDidAction {
  type: typeof ECreateEntityActions.UpdateEntityClassDid
  payload: string
}
export interface TUpdateAssetClassDidAction {
  type: typeof ECreateEntityActions.UpdateAssetClassDid
  payload: string
}
export interface TAddAssetInstancesAction {
  type: typeof ECreateEntityActions.AddAssetInstances
  payload: TEntityModel[]
}
export interface TUpdateAssetInstanceAction {
  type: typeof ECreateEntityActions.UpdateAssetInstance
  payload: {
    id: number
    data: TEntityModel
  }
}
export interface TRemoveAssetInstancesAction {
  type: typeof ECreateEntityActions.RemoveAssetInstances
}
export interface TUpdateLocalisationAction {
  type: typeof ECreateEntityActions.UpdateLocalisation
  payload: ELocalisation
}
export interface TInitializeAction {
  type: typeof ECreateEntityActions.Initialize
}
export interface TUpdateDAOGroupsAction {
  type: typeof ECreateEntityActions.UpdateDAOGroups
  payload: { [id: string]: TDAOGroupModel }
}
export interface TUpdateDAOControllerAction {
  type: typeof ECreateEntityActions.UpdateDAOController
  payload: string
}
export interface TUpdateDeedAction {
  type: typeof ECreateEntityActions.UpdateDeed
  payload: TDeedModel
}

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TGotoStepAction
  | TUpdateBreadCrumbsAction
  | TUpdateTitleAction
  | TUpdateSubtitleAction
  | TUpdateMetaDataAction
  | TUpdateCreatorAction
  | TUpdateControllerAction
  | TUpdateDDOTagsAction
  | TUpdatePageAction
  | TUpdateServiceAction
  | TUpdateClaimAction
  | TUpdateLinkedResourceAction
  | TUpdateAccordedRightAction
  | TUpdateLinkedEntityAction
  | TUpdateEntityClassDidAction
  | TUpdateAssetClassDidAction
  | TAddAssetInstancesAction
  | TUpdateAssetInstanceAction
  | TRemoveAssetInstancesAction
  | TUpdateLocalisationAction
  | TInitializeAction
  | TUpdateDAOGroupsAction
  | TUpdateDAOControllerAction
  | TUpdateDeedAction
