import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { RootState } from '../../../../redux/store'
import { Hero } from './Components/Hero/Hero'
import { EditEntityWrapper } from './EditEntity.styles'
import { Steps } from '../../../Steps/Steps'
import { EntityType, EntityTypeStrategyMap } from '../../../../types/entities'
import * as editEntitySelectors from '../../../../redux/editEntity/editEntity.selectors'
import * as selectEntitySelectors from '../../../../redux/selectedEntity/selectedEntity.selectors'
import { goToStep, newEntity } from '../../../../redux/editEntity/editEntity.actions'
import { editEntityMap } from '../../../../redux/editEntity/strategy-map'
import { EditEntityFinalConnected } from './EditEntityFinal/EditEntityFinal'
import * as Toast from 'utils/toast'
import { fetchExistingEntity } from '../../../../redux/editEntityTemplate/editTemplate.action'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

interface Props {
  match: any
  entityType: EntityType
  isFinal: boolean
  edited: boolean
  currentStep: number
  projectDID: string
  entityConfig?: EntityTypeStrategyMap
  handleNewEntity: (entityType: EntityType, forceNew: boolean) => void
  handleFetchExistingEntity: (did: string, force?: boolean) => void
  handleGoToStep: (step: number) => void
}

class EditEntity extends React.Component<Props> {
  componentDidMount(): void {
    // TODO - check if keysafe installed
    /*
    example...
    if (this.props.keysafe === null) {
      errorToast('Please install IXO Credential Manager first.')
    } else {
      // ok
    }
    */
    // const {
    //   match: {
    //     params: { entityType: entityTypeUrlParam },
    //   },
    //   handleNewEntity,
    // } = this.props

    const {
      match: {
        params: { entityType: entityTypeUrlParam },
      },
      projectDID,
      handleFetchExistingEntity,
      handleNewEntity,
    } = this.props
    handleFetchExistingEntity(projectDID)
    handleNewEntity(entityTypeUrlParam as EntityType, false)
  }

  handleReset = (): any => {
    const { projectDID, handleFetchExistingEntity, handleGoToStep } = this.props
    if (window.confirm('Are you sure you want to reset this form? All progress on the setup will be lost')) {
      handleFetchExistingEntity(projectDID, true)
      handleGoToStep(1)
      Toast.successToast('Form has been reset')
    }
  }

  handleSave = (): void => {
    // does nothing except display a message
    Toast.successToast('Progress has been saved')
  }

  renderStartRoute = (): JSX.Element => {
    const {
      match: {
        params: { entityType: entityTypeUrlParam },
        url,
      },
    } = this.props

    const entityType = entityTypeUrlParam as EntityType

    const stepMap = editEntityMap[entityType]
    return (
      <Route
        exact
        path={`${url}`}
        render={(): JSX.Element => {
          return <Redirect to={`${url}${stepMap.steps[1].url}`} />
        }}
      />
    )
  }

  renderStepRoutes = (): JSX.Element[] => {
    const { entityType, currentStep, isFinal, match } = this.props
    const stepMap = editEntityMap[entityType]
    const { steps } = stepMap

    return Object.values(steps).map((step, index) => {
      const { url: urls, container } = step

      return (
        <Route
          exact
          key={index}
          path={`${match.url}${urls}`}
          render={(props: any): JSX.Element => {
            if (isFinal) {
              return <Redirect to={`${match.url}/finalise`} />
            }

            return (
              <>
                <Steps
                  currentStepTitle={stepMap.steps[currentStep].name}
                  currentStepNo={currentStep}
                  totalSteps={stepMap.stepCount}
                  handleGoToStepClick={() => null}
                />
                {currentStep === index + 1 ? (
                  React.createElement(container, { ...props })
                ) : (
                  <Redirect to={`${match.url}${stepMap.steps[currentStep].url}`} />
                )}
              </>
            )
          }}
        />
      )
    })
  }

  renderFinalRoute = (): JSX.Element => {
    const { entityType, isFinal, currentStep, match } = this.props
    const stepMap = editEntityMap[entityType]

    return (
      <Route
        exact
        path={`${match.url}/finalise`}
        render={(props: any): JSX.Element => {
          if (!isFinal) {
            return <Redirect to={`${match.url}${stepMap.steps[currentStep].url}`} />
          }

          return <EditEntityFinalConnected {...props} />
        }}
      />
    )
  }

  render(): JSX.Element {
    const {
      entityType,
      isFinal,
      edited,
      // entityConfig
    } = this.props

    if (!entityType) {
      return <></>
    }

    // const entityMap = entityConfig
    // ? entityConfig[entityType]
    // : null

    return (
      <>
        <Hero
          title={null!}
          allowReset={!edited}
          allowSave={!isFinal}
          onReset={this.handleReset}
          onSave={this.handleSave}
        />
        <EditEntityWrapper className='container-fluid'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                {this.renderStartRoute()}
                {this.renderStepRoutes()}
                {this.renderFinalRoute()}
              </div>
            </div>
          </div>
        </EditEntityWrapper>
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  currentStep: editEntitySelectors.selectStep(state),
  isFinal: editEntitySelectors.selectIsFinal(state),
  edited: editEntitySelectors.selectEdited(state),
  projectDID: selectEntitySelectors.selectEntityDid(state),
  entityType: selectEntitySelectors.selectEntityType(state),
  entityTypeMap: selectEntityConfig(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleNewEntity: (entityType: EntityType, forceNew: boolean): void => dispatch(newEntity(entityType, forceNew)),
  handleFetchExistingEntity: (did: string, force?: boolean): void => dispatch(fetchExistingEntity(did, force)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEntity)
