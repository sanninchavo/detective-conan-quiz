import '../../Start.css'
import { useQuestionsStore } from "../../../store/questions"

export const Start = () => {

  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)
  const handleClick = (difficulty: "Fácil" | "Medio" | "Difícil") => {
    fetchQuestions(10, difficulty)
  }
  return (
    <>
      <section className='recuadro'>
        <h2>Aviso antes de empezar</h2>
        <ul>
          <li>Las preguntas podrán ser tanto del anime, manga, películas, ovas, opening, ending o magic file.</li>
          <li><strong>No</strong> habrán preguntas del relleno del anime.</li>
          <li>Las preguntas del manga en el anime solo abarcarán hasta el file 1109, es decir, el 1167 del anime.</li>
          <li>Tendrán 30 segundos para poder responder cada pregunta.</li>
        </ul>
        <h2>¡Espero que lo disfruten!</h2>
      </section>
      <section className='botones-para-iniciar-juego'>
        <button onClick={() => handleClick("Fácil")} >
          Modo fácil
        </button>
        <button onClick={() => handleClick("Medio")} >
          Modo medio
        </button>
        <button onClick={() => handleClick("Difícil")} >
          Modo difícil
        </button>
      </section>
    </>
  )
}