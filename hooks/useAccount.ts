const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")


const useAccount = () => {
    let account: String = ""

    const accountFun = () => {
        web3.eth.getAccounts()
        .then((accounts: any) => {
            account = accounts[0]
            return {
                account
            }
        })
        .catch((e: any) => {
            console.log(e)
            return {
                account: false,
            }
        })
    }

    const checkWallet = async () => {
        if(typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask){
            const netId = await web3.eth.net.getId()
            console.log(netId)
            if(String(netId) !== '31337'){
                console.log("Not Connected to Required Network")
                return false
            }else{
                return true
            }
        }else{
        return true
        }
    }

    const callCheckWallet =async () => {
        if(await checkWallet()){
            return {
                status: true,
                account: accountFun()
            }
        }else{
            console.log("No proper setup for account")
            
            return {
                status: false
            }
        }
    }

    return {
        callCheckWallet
    }
}

export default useAccount