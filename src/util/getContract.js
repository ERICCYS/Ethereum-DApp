import Web3 from 'web3'
import {address, ABI} from './constants/bankContract'

let getContract = new Promise(function (resolve, reject) {
 let web3 = new Web3(window.web3.currentProvider)
 let bankContract = web3.eth.contract(ABI)
 // let bankContract = web3.eth.Contract(ABI)
 let bankContractInstance = bankContract.at(address)
 resolve(bankContractInstance)
})
export default getContract
