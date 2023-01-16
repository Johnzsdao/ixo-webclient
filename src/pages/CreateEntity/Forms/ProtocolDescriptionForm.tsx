import React from 'react'
import { CheckBox, DateRangePicker, TextArea } from '../Components'
import { FormWrapper, BrandNameInput } from './ProtocolDescriptionForm.styles'
import 'react-dates/initialize'

interface Props {
  description: string | undefined
  setDescription: (val: string) => void
  brand: string | undefined
  setBrand?: (val: string) => void
  location: string | undefined
  setLocation?: (val: string) => void
  autoGenerateZLottie?: boolean | undefined
  setAutoGenerateZLottie?: (val: boolean) => void
  startDate: string | undefined
  endDate: string | undefined
  setStartEndDate?: (startDate: string, endDate: string) => void
}

const ProtocolDescriptionForm: React.FC<Props> = ({
  description,
  setDescription,
  brand,
  setBrand,
  location,
  setLocation,
  autoGenerateZLottie,
  setAutoGenerateZLottie,
  startDate,
  endDate,
  setStartEndDate,
}): JSX.Element => {
  return (
    <FormWrapper>
      <TextArea
        inputValue={description || ''}
        handleChange={setDescription}
        width={'400px'}
        height={'240px'}
        placeholder={'Describe the Protocol'}
      />
      {setBrand && (
        <BrandNameInput
          inputValue={brand}
          placeholder={'Brand Name'}
          handleChange={(name: string): void => setBrand(name)}
        />
      )}
      {setLocation && (
        <BrandNameInput
          inputValue={location}
          placeholder={'Country'}
          handleChange={(location: string): void => setLocation(location)}
        />
      )}
      {setStartEndDate && (
        <DateRangePicker
          id='protocol'
          startDate={startDate || ''}
          endDate={endDate || ''}
          onChange={(startDate, endDate) => {
            setStartEndDate(startDate, endDate)
          }}
        />
      )}
      {setAutoGenerateZLottie && (
        <CheckBox
          label='Autogenerate immutable zLottie'
          checked={autoGenerateZLottie}
          handleChange={(option: boolean): void => setAutoGenerateZLottie(option)}
        />
      )}
    </FormWrapper>
  )
}

export default ProtocolDescriptionForm
