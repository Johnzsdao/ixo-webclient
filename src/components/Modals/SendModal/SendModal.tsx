import React, { useMemo, useState } from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { Box, FlexBox, HTMLFlexBoxProps, SvgBox } from 'components/App/App.styles'
import { SignStep, TXStatus } from '../common'
import { Typography } from 'components/Typography'
import { ReactComponent as NextStepImage } from 'assets/images/modal/nextstep.svg'
import { useAccount } from 'hooks/account'
import { ReactComponent as ArrowDownIcon } from 'assets/images/icon-arrow-down.svg'
import { Input } from 'pages/CreateEntity/Components'
import CurrencyFormat from 'react-currency-format'
import styled, { useTheme } from 'styled-components'
import { Avatar } from 'pages/CurrentEntity/Components'
import { isAccountAddress, isContractAddress } from 'utils/validation'
import { isGreaterThanOrEqualTo } from 'utils/currency'
import { convertDenomToMicroDenomWithDecimals } from 'utils/conversions'
import { WasmExecuteTrx } from 'lib/protocol/cosmwasm'
import { BankSendTrx } from 'lib/protocol'
import { errorToast, successToast } from 'utils/toast'

const StyledInput = styled(Input)`
  color: white;
  font-weight: 500;
  text-align: center;

  &::placeholder {
    color: ${(props) => props.theme.ixoDarkBlue};
  }
`

const Card = ({ children, ...rest }: HTMLFlexBoxProps) => {
  const theme: any = useTheme()
  return (
    <FlexBox
      p={2}
      width='100%'
      height='48px'
      alignItems='center'
      justifyContent='center'
      border={`1px solid ${theme.ixoNewBlue}`}
      borderRadius={'8px'}
      {...rest}
    >
      {children}
    </FlexBox>
  )
}

interface Props {
  open: boolean
  selectedDenomOrAddr?: string
  setOpen: (open: boolean) => void
  onSuccess?: (txHash: string) => void
}

const SendModal: React.FunctionComponent<Props> = ({ open, selectedDenomOrAddr, setOpen, onSuccess }) => {
  const theme: any = useTheme()
  const { nativeTokens, cw20Tokens, signingClient, signer } = useAccount()
  const selectedToken = useMemo(
    () =>
      (isContractAddress(selectedDenomOrAddr) ? cw20Tokens : nativeTokens).find(
        (token) => token.denomOrAddress === selectedDenomOrAddr,
      ),
    [nativeTokens, cw20Tokens, selectedDenomOrAddr],
  )
  const balance = useMemo(() => (selectedToken ? selectedToken.balance : '0'), [selectedToken])

  const [amount, setAmount] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [txStatus, setTXStatus] = useState<TXStatus>(TXStatus.UNDEFINED)
  const [txHash] = useState<string>('')

  const validAmount = isGreaterThanOrEqualTo(balance, amount)
  const validRecipient = isAccountAddress(recipient) || isContractAddress(recipient)
  const validSend = validAmount && validRecipient

  const handleSigning = async () => {
    setTXStatus(TXStatus.PENDING)

    if (!selectedDenomOrAddr || !selectedToken) {
      setTXStatus(TXStatus.ERROR)
      return
    }

    let response
    if (isContractAddress(selectedDenomOrAddr)) {
      const msg = {
        transfer: {
          recipient: recipient,
          amount: convertDenomToMicroDenomWithDecimals(amount, selectedToken.decimals).toString(),
        },
      }

      response = await WasmExecuteTrx(signingClient, signer, {
        contractAddress: selectedDenomOrAddr,
        msg: JSON.stringify(msg),
      })
    } else {
      response = await BankSendTrx(signingClient, signer.address, recipient, {
        denom: selectedDenomOrAddr,
        amount: convertDenomToMicroDenomWithDecimals(amount, selectedToken.decimals).toString(),
      })
    }

    if (response) {
      setTXStatus(TXStatus.SUCCESS)
      successToast('Sending', `Success! ${amount} ${selectedToken.symbol} have been successfully sent.`)
    } else {
      setTXStatus(TXStatus.ERROR)
      errorToast('Sending', `Failed to send ${amount} ${selectedToken.symbol}. Please try again.`)
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Send',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <FlexBox width='600px'>
        <FlexBox width='400px' gap={4} py={12} mx={'auto'} justifyContent='center'>
          {txStatus === TXStatus.UNDEFINED && (
            <FlexBox direction='column' width='100%' gap={8}>
              {/* body */}
              <FlexBox direction='column' width='100%' alignItems='center' gap={4}>
                {/* Amount & Denom */}
                <FlexBox width='100%' gap={2} alignItems='center'>
                  <Box position='relative' style={{ flex: 1 }}>
                    <StyledInput
                      inputValue={amount}
                      handleChange={setAmount}
                      height='48px'
                      placeholder='Enter Amount'
                    />
                    {/* my balance */}
                    <FlexBox position='absolute' top='-16px' right='16px' gap={2}>
                      <Typography size='sm' color='dark-blue'>
                        <CurrencyFormat displayType={'text'} value={balance} thousandSeparator decimalScale={2} />
                      </Typography>
                      <Typography
                        className='cursor-pointer'
                        size='sm'
                        color='blue'
                        transform='uppercase'
                        onClick={() => setAmount(balance)}
                      >
                        Max
                      </Typography>
                    </FlexBox>
                  </Box>
                  <Card justifyContent='flex-start' alignItems='center' flexBasis='33%' gap={2}>
                    <Avatar size={28} url={selectedToken?.imageUrl} />
                    <Typography color='white' transform='uppercase'>
                      {selectedToken?.symbol}
                    </Typography>
                  </Card>
                </FlexBox>
                {/* Arrow Down icon */}
                <FlexBox
                  alignItems='center'
                  justifyContent='center'
                  borderRadius='100%'
                  width='40px'
                  height='40px'
                  border={`1px solid ${theme.ixoDarkBlue}`}
                  boxShadow={theme.ixoShadow2}
                >
                  <SvgBox color={theme.ixoNewBlue} svgHeight={8}>
                    <ArrowDownIcon />
                  </SvgBox>
                </FlexBox>
                {/* Recipient Address */}
                <FlexBox width='100%' direction='column' alignItems='center' gap={4}>
                  <StyledInput
                    inputValue={recipient}
                    handleChange={setRecipient}
                    height='48px'
                    placeholder='Paste ixo address'
                  />
                  <Typography weight='medium' color={recipient ? (validRecipient ? 'green' : 'red') : undefined}>
                    {recipient ? (validRecipient ? 'Valid ixo address' : 'Invalid ixo address') : ' '}
                  </Typography>
                </FlexBox>
                {/* Action */}
                <FlexBox width='100%' justifyContent='flex-end' alignItems='center'>
                  <SvgBox
                    cursor='pointer'
                    onClick={() => validSend && handleSigning()}
                    color={validSend ? theme.ixoNewBlue : theme.ixoDarkBlue}
                  >
                    <NextStepImage />
                  </SvgBox>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          )}
          {txStatus !== TXStatus.UNDEFINED && (
            <SignStep
              status={txStatus}
              hash={txHash}
              message={{
                [TXStatus.SUCCESS]: `You have successfully sent ${new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                }).format(Number(amount))} ${selectedToken?.symbol.toUpperCase()}`,
              }}
            />
          )}
        </FlexBox>
      </FlexBox>
    </ModalWrapper>
  )
}

export default SendModal
