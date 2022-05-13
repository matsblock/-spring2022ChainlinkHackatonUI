import styles from '../styles/Home.module.css'
import Header from '../components/Header.js'
import Content from '../components/Content.js'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header>
      </Header>
      <Content></Content>

    </div>
  )
}
