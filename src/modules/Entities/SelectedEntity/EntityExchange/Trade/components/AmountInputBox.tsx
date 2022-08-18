import React, { useMemo } from 'react'
import CurrencyFormat from 'react-currency-format'
import { CurrencyType } from 'modules/Account/types'
import BigNumber from 'bignumber.js'
import ChevDownIcon from 'assets/images/exchange/chev-down.svg'

import {
  AmountInputBoxWrapper,
  BlueText,
  GrayText,
  WhiteText,
  AssetIcon,
} from './AmountInputBox.styles'
import { displayTokenAmount } from 'common/utils/currency.utils'

const decimals = 2

interface Props {
  currency: CurrencyType | undefined
  isSelected: boolean
  isFromToken: boolean

  usdRate: number
  balance: string
  amount: BigNumber
  className?: string
  handleAmountChange: (value: string | BigNumber) => void
  handleAssetSelect: () => void
  handleFocused: () => void
}

const AmountInputBox: React.FC<Props> = ({
  currency,
  isSelected,
  isFromToken,
  usdRate,
  amount,
  balance,
  handleAmountChange,
  handleAssetSelect,
  handleFocused,
  className = '',
}): JSX.Element => {
  const usdAmount = useMemo(
    () => new BigNumber(amount).times(new BigNumber(usdRate)),
    [usdRate, amount],
  )

  return (
    <AmountInputBoxWrapper
      isSelected={isSelected}
      onClick={handleFocused}
      className={className}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div
          className="d-flex align-items-center gap-7"
          onClick={handleAssetSelect}
        >
          {currency ? (
            <>
              <AssetIcon src={currency?.imageUrl} alt={currency?.denom} />
              <WhiteText fontWeight={500} fontSize="18px" lineHeight="18px">
                {currency?.denom.toUpperCase()}
              </WhiteText>
            </>
          ) : (
            <WhiteText fontWeight={500} fontSize="18px" lineHeight="18px">
              Select an Asset
            </WhiteText>
          )}
          <img src={ChevDownIcon} alt="" />
        </div>
        {currency && (
          <div className="d-flex align-items-center gap-7">
            <GrayText fontSize="14px" lineHeight="16px" fontWeight={400}>
              {displayTokenAmount(new BigNumber(balance), decimals)}
            </GrayText>
            {isFromToken && (
              <BlueText
                fontSize="14px"
                lineHeight="16px"
                fontWeight={400}
                onClick={(): void => handleAmountChange(balance)}
              >
                Max
              </BlueText>
            )}
          </div>
        )}
      </div>
      <div className="d-flex mb-2">
        <CurrencyFormat
          className="token-amount"
          value={
            new BigNumber(amount).toNumber() === 0
              ? ''
              : new BigNumber(amount).toString()
          }
          thousandSeparator
          placeholder="Amount"
          decimalScale={decimals}
          prefix={isFromToken ? '' : '≈'}
          onValueChange={({ value }): void => handleAmountChange(value)}
        />
      </div>
      {currency && (
        <div className="d-flex justify-content-end">
          {isFromToken ? (
            <WhiteText fontSize="14px" lineHeight="16px" fontWeight={400}>
              ≈ ${displayTokenAmount(new BigNumber(usdAmount), decimals)}
            </WhiteText>
          ) : (
            <WhiteText fontSize="14px" lineHeight="16px" fontWeight={400}>
              ≈ ${usdRate.toFixed(decimals)} per {currency?.denom.toUpperCase()}
            </WhiteText>
          )}
        </div>
      )}
      {currency && isFromToken && isSelected && (
        <div className="triangle-left" />
      )}
      {currency && !isFromToken && isSelected && (
        <div className="triangle-right" />
      )}
    </AmountInputBoxWrapper>
  )
}

export default AmountInputBox
