import './App.css'
import { Start } from './features/game/components/Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './features/game/components/Game'
import { Header } from './components/layout/Header'
import { GameOver } from './features/game/components/GameOver'
import { Footer } from './components/layout/Footer'
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
