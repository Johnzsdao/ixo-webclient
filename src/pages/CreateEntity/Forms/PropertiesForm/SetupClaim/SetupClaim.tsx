import { Box, FlexBox } from 'components/App/App.styles'
import { ClaimSetupModal } from 'components/Modals'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { TEntityClaimModel } from 'types/entities'
import { omitKey } from 'utils/objects'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

interface Props {
  hidden: boolean
  claim: { [id: string]: TEntityClaimModel }
  updateClaim: (claim: { [id: string]: TEntityClaimModel }) => void
}

const SetupClaim: React.FC<Props> = ({ hidden, claim, updateClaim }): JSX.Element => {
  const [entityClaim, setEntityClaim] = useState<{ [id: string]: TEntityClaimModel }>({})
  const [selectedClaim, setSelectedClaim] = useState<TEntityClaimModel | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleUpdateEntityClaim = (id: string, newClaim: TEntityClaimModel): void => {
    setEntityClaim((pre) => {
      let claim = pre
      if (newClaim.isHeadlineMetric) {
        claim = Object.fromEntries(
          Object.entries(pre).map(([key, value]) => [key, { ...value, isHeadlineMetric: false }]),
        )
      }
      return { ...claim, [id]: newClaim }
    })
  }
  const handleRemoveEntityClaim = (id: string): void => {
    setEntityClaim((pre) => {
      const claim = pre
      if (claim[id].isHeadlineMetric) {
        const altClaimId = Object.keys(pre).find((item) => item !== id)
        if (altClaimId) {
          claim[altClaimId].isHeadlineMetric = true
        }
      }
      return omitKey(claim, id)
    })
  }

  // hooks - claims
  useEffect(() => {
    if (Object.values(claim).length > 0) {
      setEntityClaim(claim)
    }
  }, [claim])
  useEffect(() => {
    updateClaim(entityClaim ?? {})
    // eslint-disable-next-line
  }, [entityClaim])

  return (
    <>
      <FlexBox direction='column' style={hidden ? { display: 'none' } : {}}>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(entityClaim).map(([key, value]) => (
            <PropertyBox
              key={key}
              set={!!value?.template?.id}
              label={value?.template?.title}
              handleRemove={(): void => handleRemoveEntityClaim(key)}
              handleClick={(): void => {
                setEditModalOpen(true)
                setSelectedClaim(value)
              }}
            />
          ))}
          <PropertyBox
            icon={<PlusIcon />}
            noData
            handleClick={(): void => {
              setEditModalOpen(true)
              setSelectedClaim({
                id: uuidv4(),
                template: undefined,
                submissions: undefined,
                approvalTarget: undefined,
                isEncrypted: false,
                isHeadlineMetric: Object.keys(claim).length === 0,
              })
            }}
          />
        </Box>
      </FlexBox>
      {selectedClaim && (
        <ClaimSetupModal
          claim={selectedClaim}
          open={editModalOpen}
          onClose={(): void => setEditModalOpen(false)}
          onChange={(claim: TEntityClaimModel): void => handleUpdateEntityClaim(selectedClaim.id, claim)}
        />
      )}
    </>
  )
}

export default SetupClaim
