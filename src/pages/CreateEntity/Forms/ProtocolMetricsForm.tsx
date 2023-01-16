import { Box } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { TEntityProfileMetricModel } from 'types/protocol'
import { AddLink } from './ProtocolAttributesForm.styles'
import { FormInput, FormMetricRow, FormRow, FormWrapper } from './ProtocolMetricsForm.styles'

const initialMetric: TEntityProfileMetricModel = {
  prefix: '',
  metric: '',
  suffix: '',
  source: '',
}

interface Props {
  metrics?: TEntityProfileMetricModel[]
  setMetrics: (metrics: TEntityProfileMetricModel[]) => void
}

const ProtocolMetricsForm: React.FC<Props> = ({ metrics = [initialMetric], setMetrics }): JSX.Element => {
  const handlAddMetric = (): void => setMetrics([...metrics, initialMetric])
  const handleUpdateMetric = (metricIdx: number, obj: object): void => {
    setMetrics(
      metrics.map((_, index) => {
        if (metricIdx === index) {
          return { ..._, ...obj }
        }
        return { ..._ }
      }),
    )
  }
  const handleRemoveAttribute = (index: any): void => {
    if (metrics.length === 1) {
      setMetrics([])
    } else {
      setMetrics(metrics.filter((_, i) => index !== i))
    }
  }

  return (
    <FormWrapper>
      {metrics.map((metric, index) => (
        <FormMetricRow key={index}>
          <FormRow>
            <Typography color='color-2' style={{ margin: 'auto 10px' }}>
              Example:
            </Typography>
            <Typography color='black' style={{ margin: 'auto 10px' }}>
              $USD | 200 | Historical Price | (max)
            </Typography>
          </FormRow>
          <FormRow>
            <FormInput
              placeholder={'Prefix'}
              inputValue={metric?.prefix}
              handleChange={(value): void => handleUpdateMetric(index, { prefix: value })}
            />
            <Typography color='color-2' style={{ margin: 'auto 10px' }}>
              #
            </Typography>
            <FormInput
              placeholder={'Metric'}
              inputValue={metric?.metric}
              handleChange={(value): void => handleUpdateMetric(index, { metric: value })}
            />
            <FormInput
              placeholder={'Suffix'}
              inputValue={metric?.suffix}
              handleChange={(value): void => handleUpdateMetric(index, { suffix: value })}
            />
          </FormRow>
          <FormRow>
            <Typography color='color-2' style={{ margin: 'auto 10px' }}>
              # Source
            </Typography>
            <FormInput
              placeholder={'https:// '}
              inputValue={metric?.source}
              handleChange={(value): void => handleUpdateMetric(index, { source: value })}
            />
          </FormRow>
          <Box className='remove' onClick={(): void => handleRemoveAttribute(index)}>
            —
          </Box>
        </FormMetricRow>
      ))}

      <AddLink color='blue' weight='bold' size='sm' onClick={handlAddMetric} style={{ marginLeft: 16 }}>
        + Add another Metric
      </AddLink>
    </FormWrapper>
  )
}

export default ProtocolMetricsForm
