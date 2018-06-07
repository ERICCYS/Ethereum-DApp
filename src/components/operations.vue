<template>
  <div class="bank">
      <img id="icon" src='http://picturesofmoney.org/wp-content/uploads/2013/04/Money-Bag.jpg'>
    <h1>Welcome to Your Ether Bank</h1>
    <p v-if="showbalance">{{this.balance}}</p>
    <button @click = "retrieve">{{this.retrieve_word}}</button>
    <button @click = "deposit">Deposit</button>
    <button @click = "withdraw">Withdraw</button>
    <br/>
    <p>
      Amount : <input v-model='amount' placeholder="0" />
    </p>
    <img v-if='pending' src='https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif'>
  </div>
</template>

<script>
import {address, ABI} from '../util/constants/bankContract'

var web3 = new Web3(window.web3.currentProvider)
var bankContract = web3.eth.contract(ABI)
var bankContractInstance = bankContract.at(address)

export default {
  name: 'operations',
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  },
  data () {
    return {
      retrieve_word: 'Balance',
      amount: null,
      pending: false,
      balance: null,
      showbalance: false,
      transaction_hash: null
    }
  },
  methods: {
    retrieve: function(){
      if (!this.showbalance){
        bankContractInstance.balance((err, result) => {
          if (err) {
            console.log(err)
          } else {
            this.showbalance = true
            this.balance = result.c[0]
            this.retrieve_word = 'Hide'
          }
        })
      } else{
        this.showbalance = false
        this.retrieve_word = 'Balance'
      }

    },

    deposit () {
      this.pending = true
       console.log(this.amount)
       bankContractInstance.deposit(this.amount, (err, result) => {
         if (err) {
           console.log(err)
         } else {
           console.log(result)
           this.transaction_hash = result
           this.checkTx(this.transaction_hash)
         }
       })
     },

     withdraw () {
        console.log(this.amount)
        this.pending = true
        bankContractInstance.withdraw(this.amount, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
            this.transaction_hash = result
            this.checkTx(this.transaction_hash)
          }
        })
      },

      checkTx(txHash) {
        console.log("checkTx is called")
        web3.eth.getTransaction(txHash,(error, result) => {
          if (result==null || (result!=null && result.blockHash==null)) {
            setInterval(checkTx.bind(null, txHash), 1000);
          } else {
            var gasSent = result.gas
            console.log(gasSent)
            this.checkTxReceipt(txHash,gasSent)
          }
        })
      },

      checkTxReceipt(txHash, gasSent) {
        web3.eth.getTransactionReceipt(txHash, (error, result) => {
          if (result==null) {
              setTimeout(this.checkTxReceipt.bind(null, txHash, gasSent), 1000);
          } else {
            if (result!=null) {
              if (gasSent == result.gasUsed && gasSent != baseEthSendingGas) {
                console.error("Used up all gas");
              } else {
                console.log("Tx confirmed!");
                this.pending = false
              }
            }
          }
        })
      }
    }
}
</script>
<style scoped>
.bank {
 margin-top: 50px;
 text-align:center;
}
#icon{
  width: 250px;
  height: 250px;
}
button{
  font-size: 20px;

  width: 100px;
  height: 50px;
  padding: 10px;
  font-family: fantasy;
  margin-right: 5px;
  border-radius: 10%;
  cursor: pointer;
  background-color:#21ee40;
  border: 1px solid #21ee40;
  color: #fff;
}
</style>
