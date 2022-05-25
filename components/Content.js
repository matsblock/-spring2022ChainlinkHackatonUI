import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { DaiAbi, DaiAddress, OracleAbi, OracleContractAddress, BetsAbi, BetsContractAddress } from "../constants"
import { ethers } from "ethers"
import { Button, Typography } from "web3uikit"

export default function Content() {
    const { account, isWeb3Enabled } = useMoralis()

    const [daiBalance, setDaiBalance] = useState(0)
    const [_gameDetailsAsString, setGameDetailsAsString] = useState("")
    const [_gameScoreAsString, setGameScoreAsString] = useState("")

    const [gameDetailsAsStringArray, setGameDetailsAsStringArray] = useState("")
    let [homeTeam, setHomeTeam] = useState("")
    let [awayTeam, setAwayTeam] = useState("")

    const [gameScoreAsStringArray, setScoreAsStringArray] = useState("")
    let [homeScore, setHomeScore] = useState("")
    let [awayScore, setAwayScore] = useState("")
    let [matchStatus, setMatchStatus] = useState("pending")

    useEffect(() => {
        if (isWeb3Enabled && account) {
            updateUI()
        }
    }, [account, isWeb3Enabled, gameDetailsAsStringArray, gameScoreAsStringArray])

    async function updateUI() {

        setDaiBalance(String(ethers.utils.formatEther(await balanceOf())))

        setGameDetailsAsString(await gameDetailsAsString())
        setGameScoreAsString(await gameScoreAsString())

        setGameDetailsAsStringArray(String(_gameDetailsAsString).split(","))
        setScoreAsStringArray(String(_gameScoreAsString).split(","))

        setHomeTeam(String(gameDetailsAsStringArray[1]).replace(/"/g, ''))
        setAwayTeam(String(gameDetailsAsStringArray[3]).replace(/"/g, ''))
        setMatchStatus(String(gameScoreAsStringArray[0]).replace(/"/g, '').slice(1))
        setHomeScore(gameScoreAsStringArray[1])
        setAwayScore(String(gameScoreAsStringArray[2]).replace(/]/g, ''))

    }

    const { runContractFunction: balanceOf } = useWeb3Contract({
        abi: DaiAbi,
        contractAddress: DaiAddress,
        functionName: "balanceOf",
        params: {
            account: "0x5609ad815a870cC91B1326e119Ec80aCB0Cf3d2b"
        },
    })

    const { runContractFunction: gameScoreAsString } = useWeb3Contract({
        abi: OracleAbi,
        contractAddress: OracleContractAddress,
        functionName: "gameScoreAsString",
        params: {
        },
    })

    const { runContractFunction: gameDetailsAsString } = useWeb3Contract({
        abi: OracleAbi,
        contractAddress: OracleContractAddress,
        functionName: "gameDetailsAsString",
        params: {
        },
    })

    const { runContractFunction: faucet } = useWeb3Contract({
        abi: DaiAbi,
        contractAddress: DaiAddress,
        functionName: "faucet",
        params: {
            amount: "100000000000000000000"
        }
    })

    
    const { runContractFunction: approve } = useWeb3Contract({
        abi: DaiAbi,
        contractAddress: DaiAddress,
        functionName: "approve",
        params: {
            spender: BetsContractAddress,
            amount: "100000000000000000000"
        }
    })

    const { runContractFunction: setBetHome } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "setBet",
        params: {
            _bet: 0,
            _amount: 100000000000000000000n
        }
    })

    const { runContractFunction: setBetAway } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "setBet",
        params: {
            _bet: 1,
            _amount: 100000000000000000000n
        }
    })

    const { runContractFunction: setBetTied } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "setBet",
        params: {
            _bet: 2,
            _amount: 100000000000000000000n
        }
    })


    const { runContractFunction: claimRewards } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "claimRewards",
        params: {
        },
    })

    async function addTokenToWallet() {

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: "0xeE609996ac3821499aEED5C57f3F7507D0bdC481", // The address that the token is at.
                        symbol: "DAI", // A ticker symbol or shorthand, up to 5 chars.
                        decimals: "18", // The number of decimals in the token
                        image: null, // A string url of the token logo
                    },
                },
            });

        } catch (error) {
            console.log(error);
        }

    }



    return (
        <div>

            {/* <h3>Game Details: {_gameDetailsAsString}</h3>
            <h3>Game Score: {_gameScoreAsString}</h3> */}
            <h3>Match: {homeTeam} (Home) VS {awayTeam} (Away) - {matchStatus}  </h3>
            <h4>Result: {homeScore} - {awayScore}</h4>
            <hr></hr>
         <Button id="test-button-primary"
                onClick={approve}
                text="Approve 100 DAI to BET"
                theme="primary"
                type="button"></Button>
              <Button id="test-button-primary"
                onClick={setBetHome}
                text="Bet 100 DAI to Home"
                theme="primary"
                type="button"></Button>
            <Button id="test-button-primary"
                onClick={setBetAway}
                text="Bet 100 DAI to Away"
                theme="primary"
                type="button"></Button>
            <Button id="test-button-primary"w
                onClick={setBetTied}
                text="Bet 100 DAI to Tied"
                theme="primary"
                type="button"></Button>
            <hr></hr>
            <Button id="test-button-primary"
                onClick={claimRewards}
                text="Claim Rewards"
                theme="primary"
                type="button"></Button>
            <hr></hr>

            <Typography variant="h3"> Your DAI Balance: </Typography>
            <h4 variant="h4">${daiBalance}</h4>

            <h3>Faucet:</h3>
            <Button id="test-button-primary"
                onClick={faucet}
                text="Get 100 fake DAIs"
                theme="primary"
                type="button"></Button>

            <Button id="test-button-primary"
                onClick={addTokenToWallet}
                text="Add fake DAI token to Metamask"
                theme="primary"
                type="button"></Button> 

        </div>
    )
}