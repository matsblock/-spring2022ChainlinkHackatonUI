import styles from '../styles/Home.module.css'
import Header from '../components/Header.js'
import Control from '../components/Control.js'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header>
      </Header>
      <Control></Control>

    </div>
  )
}
