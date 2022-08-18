import styled from 'styled-components'

export const SwapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const AssetCardPanel = styled.div`
  width: 300px;
  margin-left: 30px;
  margin-right: 30px;
`

export const SwapPanel = styled.div`
  width: 370px;
`

export const CardHeader = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;

  & span.highlight {
    color: ${(props): string => props.theme.ixoBlue};
  }
`

export const CardBody = styled.div<{ border?: boolean; height?: string }>`
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  border: 1px solid
    ${(props): string => (props.border ? '#49BFE0' : '#083347')};
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
  padding: 10px;
  position: relative;
  height: ${(props): string => props.height};

  & .error {
    color #E2223B !important;
  }

  &.gap {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`

export const RateBox = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  color: #ffffff;

  & .label {
    color: #678a9c;
    font-size: 12px;
    line-height: 14px;
  }

  & .receive-amount {
    font-size: 24px;
    line-height: 28px;
    text-transform: uppercase;
  }

  & .receive-rate {
    font-size: 12px;
    line-height: 14px;
    color: #678a9c;
    text-transform: uppercase;
  }

  & .fee-percent {
    font-size: 10px;
    line-height: 12px;
  }

  & .fee-amount {
    font-size: 12px;
    line-height: 14px;
    font-weight: 600;
  }

  & .slippage-label {
    font-size: 10px;
    line-height: 12px;
  }

  & .slippage-value {
    font-size: 12px;
    line-height: 14px;
    font-weight: 600;

    &.error {
      color: #e2223b !important;
    }
  }
`

export const SwapButton = styled.div`
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  background: linear-gradient(180deg, #01283b 0%, #012d41 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.18);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  z-index: 100;
  cursor: pointer;
  padding: 6px;
`

export const SettingsButton = styled.div`
  cursor: pointer;
`

export const SubmitButton = styled.button`
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  border-radius: 4px;
  color: ${(props): string => props.theme.highlight.light};
  border: 1px solid ${(props): string => props.theme.highlight.light};
  padding: 10px 30px;
  background: transparent;
  transition: color 0.2s ease-in;
  cursor: pointer;

  &:hover {
    color: white;
  }
`

export const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
  }
`
