import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { DaiAbi, DaiAddress, OracleAbi, OracleContractAddress, BetsAbi, BetsContractAddress } from "../constants"
import { ethers } from "ethers"
import { Button, Typography } from "web3uikit"

export default function Content() {
    const { account, isWeb3Enabled } = useMoralis()

    const [matchWinner, setMatchWinner] = useState("")


    useEffect(() => {
        if (isWeb3Enabled && account) {
            updateUI()
        }
    }, [account, isWeb3Enabled, matchWinner])

    async function updateUI() {
        setMatchWinner(String(ethers.utils.parseBytes32String(await _matchWinner())))
    }

    const { runContractFunction: _matchWinner } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "matchWinner",
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

    const { runContractFunction: setMatchStatus } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "setMatchStatus",
        params: {
        },
    })


    const { runContractFunction: getMatchWinner } = useWeb3Contract({
        abi: BetsAbi,
        contractAddress: BetsContractAddress,
        functionName: "getMatchWinner",
        params: {
        },
    })



    return (
        <div>

            <Button id="test-button-primary"
                onClick={closeBet}
                text="CloseBet"
                theme="primary"
                type="button"></Button>

            <Button id="test-button-primary"
                onClick={getMatchWinner}
                text="getMatchWinner"
                theme="primary"
                type="button"></Button>

            <Button id="test-button-primary"
                onClick={setMatchStatus}
                text="setMatchStatus"
                theme="primary"
                type="button"></Button>


            <h4>The Match Winner is: {matchWinner}</h4>
        </div>
    )
}