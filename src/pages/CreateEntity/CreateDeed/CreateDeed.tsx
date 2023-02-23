import React, { useEffect } from 'react'
import { Route, RouteComponentProps, useParams, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateDeed: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateBreadCrumbs, updateEntityType, updateTitle, updateSubtitle } = useCreateEntityState()
  const isSetupInfoRoute = useRouteMatch('/create/entity/:entityId/deed/info')
  const isSetupPageRoute = useRouteMatch('/create/entity/:entityId/deed/setup-page')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/:entityId/deed/setup-properties')
  const isSetupActionsRoute = useRouteMatch('/create/entity/:entityId/deed/setup-actions')
  const { steps } = getStrategyByEntityType('Deed')

  useEffect(() => {
    updateEntityType('Deed')
    updateBreadCrumbs([{ text: entityId, link: `/entity/${entityId}/dashboard` }, { text: 'Governance' }])
    updateTitle('Create a governance proposal')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSetupInfoRoute?.isExact) {
      updateSubtitle('Proposal Info')
    }
  }, [isSetupInfoRoute?.isExact])
  useEffect(() => {
    if (isSetupPageRoute?.isExact) {
      updateSubtitle('Configure the proposal page')
    }
  }, [isSetupPageRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Configure the proposal settings')
    }
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isSetupActionsRoute?.isExact) {
      updateSubtitle('Add actions')
    }
  }, [isSetupActionsRoute?.isExact])

  return (
    <>
      {Object.values(steps).map((step) => (
        <Route key={step.url} exact path={step.url} component={step.component} />
      ))}
    </>
  )
}

export default CreateDeed
