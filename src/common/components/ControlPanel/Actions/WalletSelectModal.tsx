import React, { useState, useEffect, useMemo } from 'react'
import * as keplr from 'common/utils/keplr'
import styled from 'styled-components'

// import IMG_wallet1 from 'assets/images/exchange/wallet1.svg'
import IMG_wallet2 from 'assets/images/exchange/wallet2.svg'
import IMG_wallet3 from 'assets/images/exchange/wallet3.svg'
import { WalletBox } from 'modules/Entities/SelectedEntity/EntityExchange/Trade/Trade.container.styles'
import { RootState } from 'common/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import keysafe from 'common/keysafe/keysafe'
import { deviceWidth } from 'lib/commonData'
import { selectKeplrWallet, selectSelectedWallet } from 'modules/Account/Account.selectors'
import { WalletType } from 'modules/Account/types'
import { chooseWallet, setKeplrWallet } from 'modules/Account/Account.actions'

const Container = styled.div`
  position: relative;
  padding: 2rem;
  width: 30rem;
  max-width: 100%;

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0.5rem;
  }
`

interface Props {
  handleSelect: (type: string, address: string) => void
  availableWallets: string[]
}

const WalletSelectModal: React.FunctionComponent<Props> = ({ handleSelect, availableWallets }) => {
  const dispatch = useDispatch()
  const [walletType, setWalletType] = useState<string | null>(null)
  const { address } = useSelector((state: RootState) => state.account)
  const selectedWallet: any = useSelector(selectSelectedWallet)
  const keplrWallet: any = useSelector(selectKeplrWallet)
  const selectedWalletAddress = useMemo(() => {
    if (selectedWallet === WalletType.Keysafe && address) {
      return address
    } else if (selectedWallet === WalletType.Keplr && keplrWallet && keplrWallet.address) {
      return keplrWallet.address
    }
    return undefined
  }, [keplrWallet, selectedWallet, address])

  const handleWalletSelect = async (type: string): Promise<void> => {
    switch (type) {
      case WalletType.Keysafe:
        setWalletType(WalletType.Keysafe)
        if (address) {
          handleSelect(type, address)
        } else {
          keysafe.popupKeysafe()
        }
        dispatch(chooseWallet(WalletType.Keysafe))
        break
      case WalletType.Keplr:
        {
          setWalletType(WalletType.Keplr)
          const [accounts, offlineSigner] = await keplr.connectAccount()
          handleSelect(type, accounts[0].address)
          dispatch(chooseWallet(WalletType.Keplr))
          dispatch(setKeplrWallet(accounts[0].address, offlineSigner))
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (address && walletType === WalletType.Keysafe) {
      handleSelect(walletType!, address)
    }
    // eslint-disable-next-line
  }, [address, walletType])

  if (selectedWallet && selectedWalletAddress) {
    handleSelect(selectedWallet!, selectedWalletAddress)
    return null
  }

  return (
    <Container>
      <div className='mx-4'>
        {/* <WalletBox
          onClick={(): Promise<void> => handleWalletSelect('walletconnect')}
        >
          <img src={IMG_wallet1} alt="wallet1" />
          <span>WalletConnect</span>
        </WalletBox> */}
        {availableWallets.includes(WalletType.Keplr) && keplr.checkExtensionAndBrowser() && (
          <WalletBox onClick={(): Promise<void> => handleWalletSelect(WalletType.Keplr)}>
            <img src={IMG_wallet2} alt='wallet2' />
            <span>Keplr</span>
          </WalletBox>
        )}
        {availableWallets.includes(WalletType.Keysafe) && keysafe && (
          <WalletBox onClick={(): Promise<void> => handleWalletSelect(WalletType.Keysafe)}>
            <img src={IMG_wallet3} alt='wallet3' />
            <span>ixo Keysafe</span>
          </WalletBox>
        )}
      </div>
    </Container>
  )
}

export default WalletSelectModal
