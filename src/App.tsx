import './App.css'
import { Start } from '@gameComponents/Start'
import { useQuestionsStore } from '@store/questions'
import { Game } from '@gameComponents/Game'
import { Header } from '@components/Header'
import { GameOver } from '@gameComponents/GameOver'
import { Footer } from '@components/Footer'
function App() {

  const terminar = useQuestionsStore(state => state.state)
  return (
    <>
      <Header />
      <main>
        {terminar === "start" && <Start />}
        {terminar === "playing" && <Game />}
        {terminar === 'finish' && <GameOver />}
      </main>
      <Footer />
    </>
  )
}

export default App
