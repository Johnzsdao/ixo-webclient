import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { AddInvestmentInstrumentModal, CreateBondModal } from 'components/Modals'
import { Box } from 'components/App/App.styles'
import { useCreateEntityState } from 'hooks/createEntity'
import { InvestmentInstrumentsConfig } from 'constants/entity'
import { ixo } from '@ixo/impactxclient-sdk'

const SetupInstrument: React.FC = (): JSX.Element => {
  const { linkedEntity, gotoStep, updateLinkedEntity } = useCreateEntityState()
  const [investmentInstrument, setInvestmentInstrument] = useState<Record<string, any>>({})
  const [openAddInstrumentModal, setOpenAddInstrumentModal] = useState(false)
  const bondDid = useMemo(() => Object.values(linkedEntity).find((v) => v.type === 'bond')?.id || '', [linkedEntity])

  const canSubmit = true

  const handleOpenAddInstrumentModal = (key: string, open: boolean): void => {
    setInvestmentInstrument((pre) => ({
      ...pre,
      [key]: {
        ...InvestmentInstrumentsConfig[key],
        ...pre[key],
        openModal: open,
      },
    }))
  }

  const onNewBondDid = (bondDid: string) => {
    const bondDidlinkedEntity = ixo.iid.v1beta1.LinkedEntity.fromPartial({
      id: bondDid,
      type: 'bond',
      relationship: 'AlphaBond',
      service: 'ixo',
    })
    updateLinkedEntity({
      ...linkedEntity,
      [bondDidlinkedEntity.id]: bondDidlinkedEntity,
    })
  }

  return (
    <Box className='d-flex flex-column' style={{ gap: 20 }}>
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        {Object.entries(investmentInstrument).map(([key, value]) => (
          <PropertyBox
            key={key}
            icon={<value.icon />}
            label={value.text}
            set={!!bondDid}
            handleClick={(): void => handleOpenAddInstrumentModal(key, true)}
          />
        ))}
        <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddInstrumentModal(true)} />
      </Box>

      <Box className='d-flex' style={{ gap: 20 }}>
        <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
          Back
        </Button>
        <Button variant='primary' disabled={!canSubmit} onClick={(): void => gotoStep(1)}>
          Continue
        </Button>
      </Box>

      <AddInvestmentInstrumentModal
        open={openAddInstrumentModal}
        onClose={(): void => setOpenAddInstrumentModal(false)}
        handleChange={(key: string): void => handleOpenAddInstrumentModal(key, true)}
      />
      {investmentInstrument.alphaBond?.openModal && (
        <CreateBondModal
          open={investmentInstrument.alphaBond?.openModal}
          bondDid={bondDid}
          onSubmit={onNewBondDid}
          onClose={(): void => handleOpenAddInstrumentModal('alphaBond', false)}
        />
      )}
    </Box>
  )
}

export default SetupInstrument
