
import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <nav >
            <div style={{
                alignItems: 'center',
                color: 'black',
                display: 'flex',
                height: '75px',
                justifyContent: 'between',
                width: '100%'
            }}>
                <h1 className="p-5 font-MEDIUM text-2xl text-white font-mono" > Crypto Sport Bets</h1>
                <ConnectButton /></div>
            <hr></hr>
        </nav>
    )
}