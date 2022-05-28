import styles from '../styles/Home.module.css'
import Header from '../components/Header.js'
import Content from '../components/Content.js'

export default function Home() {
  return (
    <div className='z-0 max-h-screen h-screen bg-[#00072B]  relative'>
    <div className='-z-10 bg-[#031B54]  blur-3xl rounded-full	absolute backdrop-blur-3xl	 w-96 h-80 -left-20 -top-10'></div>
    <div className='bg-[#021440] blur-3xl rounded-full	absolute w-10/12	 h-80 bottom-0 right-0'></div>
      <Header>
      </Header>
      <Content></Content>
    </div>
  )
}
