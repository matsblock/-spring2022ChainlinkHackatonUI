import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <nav className="w-100 backdrop-blur-xl drop-shadow-2xl bg-black/10  font-mono">
            <div className="flex justify-between  items-center">
                <h1 className="p-5 font-MEDIUM text-2xl ml-5 text-white	"> CRYPTO SPORT BETS</h1>
                <div className="mr-10">
                <ConnectButton/>
                </div>
                </div>
        </nav>
    )
}