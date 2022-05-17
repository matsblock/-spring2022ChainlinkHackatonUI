import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { PriceConsumerV3Abi, PriceConsumerV3Address } from "../constants"
import { ethers } from "ethers"
import { Button, Typography } from "web3uikit"

export default function Content() {
    const { account, isWeb3Enabled } = useMoralis()
    const { runContractFunction } = useWeb3Contract()

    const [ethPrice, setEthPrice] = useState(0)

    async function updateEthPrice() {
        console.log("Inside updateEthPrice")

        const _ethPrice = (
            await getEthPrice({ onError: (error) => console.log(error) })
        )
        console.log("ETH PRICE: ", _ethPrice.toNumber())

        setEthPrice(_ethPrice.toNumber()/100000000)

    }

    const { runContractFunction: getEthPrice } = useWeb3Contract({
        abi: PriceConsumerV3Abi,
        contractAddress: PriceConsumerV3Address,
        functionName: "getLatestPrice",
        params: {},
    })

    return (
        <div>
            <Typography variant="h3"> Eth Price: </Typography>
            <h4 variant="h4">${ethPrice}</h4>

            <hr></hr>          <Button id="test-button-primary"
                onClick={updateEthPrice}
                text="Refresh"
                theme="primary"
                type="button"></Button>
            <h5> PriceConsumerV3Address: {PriceConsumerV3Address} </h5>


        </div>

    )
}