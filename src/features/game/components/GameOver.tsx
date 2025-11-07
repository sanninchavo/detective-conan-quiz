import { useQuestionsData } from "../../../hooks/useQuestionsData"
import '../../GameOver.css'
import { useQuestionsStore } from "../../../store/questions"
export const GameOver = () => {
  const { correct, name, img } = useQuestionsData()
  const resetGame = useQuestionsStore(state => state.reset)
  return (
    <>
      <section className="recuadro-final-juego">
        <p>Felicidades, lograste obtener {correct} {correct == 1 ? 'pregunta' : 'preguntas'} {correct == 1 ? 'correcta' : 'correctas'}. Eres tan buen
          detective como {name}.</p>
      </section>
      <img className="imagen-juego-final" src={img} />
      <button className="game-over-button" onClick={resetGame}>Volver al inicio</button>
    </>
  )
}