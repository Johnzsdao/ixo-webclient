import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate'

// import { MsgDelegate } from "@cosmjs/launchpad";
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { Registry } from '@cosmjs/proto-signing'
import {
  MsgDelegate,
  MsgUndelegate,
  MsgBeginRedelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { MsgVote, MsgSubmitProposal } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { MsgSend, MsgMultiSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx'
import { MsgDeposit } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import {
  MsgWithdrawDelegatorReward,
  MsgSetWithdrawAddress,
} from 'cosmjs-types/cosmos/distribution/v1beta1/tx'

declare const window: any

const CHAINS = {
  'pandora-5': {
    chainId: 'pandora-5',
    chainName: 'ixo Testnet',
    rpc: 'https://testnet.ixo.world/rpc/',
    rest: 'https://testnet.ixo.world/rest/',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'ixo',
      bech32PrefixAccPub: 'ixopub',
      bech32PrefixValAddr: 'ixovaloper',
      bech32PrefixValPub: 'ixovaloperpub',
      bech32PrefixConsAddr: 'ixovalcons',
      bech32PrefixConsPub: 'ixovalconspub',
    },
    currencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    stakeCurrency: {
      coinDenom: 'IXO',
      coinMinimalDenom: 'uixo',
      coinDecimals: 6,
      coinGeckoId: 'ixo',
    },
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
    },
    features: ['stargate'],
  },
  'impacthub-3': {
    chainId: 'impacthub-3',
    chainName: 'Impact Hub',
    rpc: 'https://impacthub.ixo.world/rpc/',
    rest: 'https://impacthub.ixo.world/rest/',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'ixo',
      bech32PrefixAccPub: 'ixopub',
      bech32PrefixValAddr: 'ixovaloper',
      bech32PrefixValPub: 'ixovaloperpub',
      bech32PrefixConsAddr: 'ixovalcons',
      bech32PrefixConsPub: 'ixovalconspub',
    },
    currencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    stakeCurrency: {
      coinDenom: 'IXO',
      coinMinimalDenom: 'uixo',
      coinDecimals: 6,
      coinGeckoId: 'ixo',
    },
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
    },
    features: ['stargate'],
  },
  'devnet-1': {
    chainId: 'devnet-1',
    chainName: 'IXO Devnet',
    rpc: 'https://devnet.ixo.earth/rpc/',
    rest: 'https://devnet.ixo.earth/rest/',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'ixo',
      bech32PrefixAccPub: 'ixopub',
      bech32PrefixValAddr: 'ixovaloper',
      bech32PrefixValPub: 'ixovaloperpub',
      bech32PrefixConsAddr: 'ixovalcons',
      bech32PrefixConsPub: 'ixovalconspub',
    },
    currencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    stakeCurrency: {
      coinDenom: 'IXO',
      coinMinimalDenom: 'uixo',
      coinDecimals: 6,
      coinGeckoId: 'ixo',
    },
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
    },
    features: ['stargate'],
  },
}
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
/**
 * @deprecated TODO: remove
 */
const GAIA_RPC = CHAINS[CHAIN_ID]?.rpc

/**
 * @deprecated
 */
const addTestNet = async (): Promise<any> => {
  if (CHAIN_ID) {
    await window.keplr.experimentalSuggestChain(CHAINS[CHAIN_ID])
  }
}

/**
 * @deprecated
 */
const addMainNet = async (): Promise<any> => {
  if (CHAIN_ID) {
    await window.keplr.experimentalSuggestChain(CHAINS[CHAIN_ID])
  }
}

/**
 * @deprecated
 */
export const checkExtensionAndBrowser = (): boolean => {
  if (typeof window !== `undefined`) {
    if (
      window.getOfflineSigner &&
      window.keplr &&
      window.keplr.experimentalSuggestChain
    ) {
      return true
    } else {
      console.log('Keplr undefined', window)
    }
  } else {
    console.log('Window is undefined :|', window)
  }
  return false
}

/**
 * @deprecated
 */
export const initStargateClient = async (
  offlineSigner,
): Promise<SigningStargateClient> => {
  // Initialize the cosmic casino api with the offline signer that is injected by Keplr extension.
  const registry = new Registry()

  registry.register('/cosmos.staking.v1beta1.MsgDelegate', MsgDelegate)
  registry.register('/cosmos.staking.v1beta1.MsgUndelegate', MsgUndelegate)
  registry.register(
    '/cosmos.staking.v1beta1.MsgBeginRedelegate',
    MsgBeginRedelegate,
  )
  registry.register('/cosmos.gov.v1beta1.MsgVote', MsgVote)
  registry.register('/cosmos.bank.v1beta1.MsgSend', MsgSend)
  registry.register('/cosmos.bank.v1beta1.MsgMultiSend', MsgMultiSend)
  registry.register('/cosmos.gov.v1beta1.MsgDeposit', MsgDeposit)
  registry.register(
    '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
    MsgWithdrawDelegatorReward,
  )
  registry.register(
    '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
    MsgSetWithdrawAddress,
  )
  registry.register('/cosmos.gov.v1beta1.MsgSubmitProposal', MsgSubmitProposal)
  registry.register('/cosmos.gov.v1beta1.TextProposal', TextProposal)

  const options = { registry: registry }

  const cosmJS: SigningStargateClient = await SigningStargateClient.connectWithSigner(
    GAIA_RPC,
    offlineSigner,
    options,
  )

  return cosmJS
}

/**
 * @deprecated
 */
export const connectAccount = async (): Promise<any> => {
  if (!checkExtensionAndBrowser()) {
    return [null, null]
  }

  // Suggest chain if we don't have
  await addTestNet()
  await addMainNet()

  // Enable chain
  await window.keplr.enable(CHAIN_ID)

  // Setup signer
  const offlineSigner = window.getOfflineSigner(CHAIN_ID)
  const accounts = await offlineSigner.getAccounts() // only one account currently supported by keplr

  return [accounts, offlineSigner]
}

/**
 * @deprecated
 */
export const sendTransaction = async (
  client,
  delegatorAddress,
  payload,
): Promise<any> => {
  try {
    const signed = await client.sign(
      delegatorAddress,
      payload.msgs,
      payload.fee,
      payload.memo,
    )
    const result = await client.broadcastTx(
      Uint8Array.from(TxRaw.encode(signed).finish()),
    )
    assertIsDeliverTxSuccess(result)
    return result
  } catch (e) {
    console.log('sendTransaction', e)
    throw e
  }
}

export function useKeplr(chainId = CHAIN_ID): any {
  const getKeplr = (): any => {
    try {
      if (typeof window !== `undefined`) {
        if (
          window.getOfflineSigner &&
          window.keplr &&
          window.keplr.experimentalSuggestChain
        ) {
          return window.keplr
        }
      }
      return undefined
    } catch (e) {
      return undefined
    }
  }
  const getKey = async (): Promise<any> => {
    const keplr = getKeplr()
    try {
      const key = await keplr?.getKey(chainId)
      return key
    } catch (e) {
      return undefined
    }
  }
  const addChain = async (): Promise<boolean> => {
    try {
      const keplr = getKeplr()
      await keplr?.experimentalSuggestChain(CHAINS[chainId])
      return true
    } catch (e) {
      console.error('useKeplr', 'addChain', e)
      return false
    }
  }
  const connect = async (): Promise<boolean> => {
    try {
      const keplr = getKeplr()
      if (!keplr) {
        throw new Error('Install Keplr wallet extension')
      }
      if (!chainId) {
        throw new Error('Chain Id is undefined')
      }
      await addChain()
      await keplr.enable(chainId)
      return true
    } catch (e) {
      console.error('useKeplr', 'connect', e)
      return false
    }
  }
  const getOfflineSigner = (): any => window.getOfflineSigner(chainId)

  return {
    getKeplr,
    getKey,
    connect,
    getOfflineSigner,
  }
}
