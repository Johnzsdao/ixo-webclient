import { ProjectAccountActions } from './project.types'
import { Dispatch } from 'redux'
import Axios from 'axios'

export const getProjectAccounts =
  (projectDID: any) =>
  (dispatch: Dispatch): any => {
    const getAccountsReq = Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/projectAccounts/${projectDID}`,
      // config
    )

    const getAccountBalance = (address: string): any => {
      return Axios.get(`${process.env.REACT_APP_GAIA_URL}/bank/balances/${address}`)
    }
    dispatch({
      type: ProjectAccountActions.GetAccountsRequest,
    })
    return getAccountsReq.then(async (responses) => {
      const projectAddress = responses.data.map[projectDID]

      getAccountBalance(projectAddress).then((response: any) => {
        dispatch({
          type: ProjectAccountActions.GetAccountsSuccess,
          payload: {
            accounts: response.data.result.map((balance: any) => ({ ...balance, amount: Number(balance['amount']) })),
            address: projectAddress,
          },
        })
      })
    })
  }
