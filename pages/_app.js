import '../styles/globals.css'
import { MoralisProvider } from "react-moralis"


function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.appId}
      serverUrl={process.env.serverUrl}>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}


export default MyApp
