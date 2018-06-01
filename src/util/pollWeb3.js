import Web3 from 'web3'
import {store} from '../store/'

let pollWeb3 = function (state) {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)

  setInterval(() => {
    // console.log('-----------------------------------------------------')
    if (web3 && store.state.web3.web3Instance) {
      web3.eth.getCoinbase().then(result => {
        var coinbase = result
        // console.log(coinbase)
        // console.log(store.state.web3.coinbase)
        if (coinbase !== store.state.web3.coinbase){
          let newCoinbase = coinbase
          web3.eth.getBalance(newCoinbase, (err, newBalance) => {
            if(err) {
              console.log(err)
            } else {
              store.dispatch('pollWeb3', {
                coinbase: newCoinbase,
                balance: parseInt(newBalance, 10)
              })
            }
          })
        } else {
          web3.eth.getBalance(store.state.web3.coinbase, (err,polledBalance) => {
            if (err) {
              console.log(err)
            } else if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
              store.dispatch('pollWeb3', {
                coinbase: store.state.web3.coinbase,
                balance: polledBalance
              })
            }
          })
        }
      })
    }
  }, 1000)
}

export default pollWeb3
