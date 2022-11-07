import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TEntityMetadataModel, TEntityCreatorModel } from 'types'
import {
  gotoStepAction,
  updateCreatorAction,
  updateEntityTypeAction,
  updateMetadataAction,
} from './createEntity.actions'
import {
  selectCreateEntityCreator,
  selectCreateEntityMetadata,
  selectCreateEntityStepNo,
  selectCreateEntityType,
} from './createEntity.selectors'
import {
  CreateEntityStrategyMap,
  TCreateEntityStepType,
  TCreateEntityStrategyType,
} from './strategy-map'

export function useCreateEntityStrategy(): {
  getStrategyByEntityType: (entityType: string) => TCreateEntityStrategyType
  getStrategyAndStepByPath: (
    path: string,
  ) => { strategy: TCreateEntityStrategyType; step: TCreateEntityStepType }
} {
  const getStrategyByEntityType = (
    entityType: string,
  ): TCreateEntityStrategyType => {
    return CreateEntityStrategyMap[entityType]
  }
  const getStrategyAndStepByPath = (
    path: string,
  ): { strategy: TCreateEntityStrategyType; step: TCreateEntityStepType } => {
    const strategy = Object.values(CreateEntityStrategyMap).find(({ steps }) =>
      Object.values(steps).some(({ url }) => url === path),
    )
    const step = Object.values(strategy?.steps ?? {}).find(
      ({ url }) => url === path,
    )
    return { strategy, step }
  }
  return {
    getStrategyByEntityType,
    getStrategyAndStepByPath,
  }
}

export function useCreateEntityState(): any {
  const history = useHistory()
  const dispatch = useDispatch()
  const entityType: string = useSelector(selectCreateEntityType)
  const stepNo: number = useSelector(selectCreateEntityStepNo)
  const metadata: TEntityMetadataModel = useSelector(selectCreateEntityMetadata)
  const creator: TEntityCreatorModel = useSelector(selectCreateEntityCreator)

  const updateEntityType = (entityType: string): void => {
    dispatch(updateEntityTypeAction(entityType))
  }
  const gotoStep = useCallback(
    (type: 1 | -1): void => {
      if (!entityType) return
      const { steps } = CreateEntityStrategyMap[entityType]
      const { nextStep, prevStep } = steps[stepNo]

      if (type === 1) {
        if (nextStep && steps[nextStep]?.url) {
          history.push(steps[nextStep].url)
          dispatch(gotoStepAction(nextStep))
        }
      } else if (type === -1) {
        if (prevStep && steps[prevStep]?.url) {
          history.push(steps[prevStep].url)
          dispatch(gotoStepAction(prevStep))
        }
      }
    },
    // eslint-disable-next-line
    [entityType, stepNo],
  )
  const updateMetadata = (metadata: TEntityMetadataModel): void => {
    dispatch(updateMetadataAction(metadata))
  }
  const updateCreator = (creator: TEntityCreatorModel): void => {
    dispatch(updateCreatorAction(creator))
  }

  return {
    entityType,
    stepNo,
    metadata,
    creator,
    updateEntityType,
    gotoStep,
    updateMetadata,
    updateCreator,
  }
}
