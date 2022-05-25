import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <nav >
            <div style={{
                alignItems: 'center',
                color: 'black',
                display: 'flex',
                height: '75px',
                justifyContent: 'center',
                width: '100%'
            }}>
                <h1  > Crypto Sport Bets</h1>
                <ConnectButton /></div>
            <hr></hr>
        </nav>
    )
}