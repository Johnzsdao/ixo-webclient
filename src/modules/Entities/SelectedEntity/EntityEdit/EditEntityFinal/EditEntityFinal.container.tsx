import React, { Dispatch } from 'react'
import { connect, useSelector } from 'react-redux'
import { RootState } from 'redux/types'
import StatusMessage, { MessageType } from 'common/components/StatusMessage/StatusMessage'
import { editEntity } from '../../../../../redux/editEntity/editEntity.actions'
import * as editEntitySelectors from '../../../../../redux/editEntity/editEntity.selectors'
import { EntityType } from '../../../types'
import { Container } from './EditEntityFinal.styles'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

interface Props {
  entityType: EntityType
  editing: boolean
  edited: boolean
  error: boolean
  handleEditEntity: () => void
}

const EditEntityFinal: React.FunctionComponent<Props> = ({ editing, edited, error, entityType, handleEditEntity }) => {
  const entityTypeMap = useSelector(selectEntityConfig)
  const entityTitle = entityTypeMap[entityType].title

  const splashIsRootRoute = React.useMemo(() => !!entityTypeMap?.route?.splashIsRootRoute, [entityTypeMap])

  return (
    <Container>
      {editing && (
        <StatusMessage message={`Updating ${entityTitle}...`} messageType={MessageType.Sending} repeatPulse={true} />
      )}
      {edited && (
        <StatusMessage
          message={`Successfully Updated ${entityTitle}`}
          messageType={MessageType.Success}
          repeatPulse={false}
        >
          <a
            className='close-button'
            href={splashIsRootRoute ? `/explore?filter=${entityType}` : `/filter=${entityType}`}
          >
            View in Explorer
          </a>
        </StatusMessage>
      )}
      {error && (
        <StatusMessage message='Oops, an error occurred' messageType={MessageType.Error} repeatPulse={false}>
          <div className='error'>{error}</div>
          <button onClick={handleEditEntity}>Try Again</button>
        </StatusMessage>
      )}
    </Container>
  )
}

const mapStateToProps = (state: RootState): any => ({
  entityType: editEntitySelectors.selectEntityType(state),
  editing: editEntitySelectors.selectEditing(state),
  edited: editEntitySelectors.selectEdited(state),
  error: editEntitySelectors.selectError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleEditEntity: (): void => dispatch(editEntity()),
})

export const EditEntityFinalConnected = connect(mapStateToProps, mapDispatchToProps)(EditEntityFinal)
