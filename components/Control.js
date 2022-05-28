import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { DaiAbi, DaiAddress, BetsAbi, BetsContractAddress } from "../constants"
import { ethers } from "ethers"
import { Button, Card, Typography } from "web3uikit"

export default function Content() {
    const { account, isWeb3Enabled } = useMoralis()
    const [_winner, set_Winner] = useState("")
    const [_homeTotalBets, set_homeTotalBets] = useState("")
    const [_awayTotalBets, set_awayTotalBets] = useState("")
    const [_tiedTotalBets, set_tiedTotalBets] = useState("")
    const [_matchStatus, set_matchStatus] = useState("")
 
    useEffect(() => {
        if (isWeb3Enabled && account) {
            updateUI()
        }
    }, [account, isWeb3Enabled, _winner, _homeTotalBets, _awayTotalBets, _tiedTotalBets, _matchStatus])

    async function updateUI() {
        set_Winner(await winner())
        set_homeTotalBets(ethers.utils.formatEther(await homeTotalBets()))
        set_awayTotalBets(ethers.utils.formatEther(await awayTotalBets()))
        set_tiedTotalBets(ethers.utils.formatEther(await tiedTotalBets()))
        set_matchStatus(await gameScoreAsString())
    }

    const { runContractFunction: winner } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "winner",
        params: {
        },
    })

    const { runContractFunction: closeBet } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "closeBet",
        params: {
        },
    })

    const { runContractFunction: getWinner } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "getWinner",
        params: {
        },
    })

    const { runContractFunction: homeTotalBets } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "homeTotalBets",
        params: {
        },
    })

    const { runContractFunction: awayTotalBets } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "awayTotalBets",
        params: {
        },
    })

    const { runContractFunction: tiedTotalBets } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "tiedTotalBets",
        params: {
        },
    })

    const { runContractFunction: requestGameScore } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "requestGameScore",
        params: {
        },
    })

    
    const { runContractFunction: gameScoreAsString } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "gameScoreAsString",
        params: {
        },
    })

    return (
        <div style={{
            position: "absolute",
            left: "35%",
            width: "30%",
            top: "30%"
        }}>

            <h1 className="p-5 font-MEDIUM text-2xl text-white font-mono" > Control Panel (Owner only)</h1>

            <Card>
                <Button id="test-button-primary"
                    onClick={closeBet}
                    text="CloseBet"
                    theme="primary"
                    type="button"></Button>

                <Button id="test-button-primary"
                    onClick={requestGameScore}
                    text="request Game Score to Oracle"
                    theme="primary"
                    type="button"></Button>

                <Button id="test-button-primary"
                    onClick={getWinner}
                    text="get Match Winner"
                    theme="primary"
                    type="button"></Button>


                <h5>Total Bets to Home: {_homeTotalBets}</h5>
                <h5>Total Bets to Away: {_awayTotalBets}</h5>
                <h5>Total Bets to Tied: {_tiedTotalBets}</h5>
                <h4>The Match Winner is: {_winner}</h4>
                <h5>References: 0: Home - 1: Away - 2: Tied</h5>
                <h5>Match status: { _matchStatus}</h5>
            </Card>
        </div>
    )
}