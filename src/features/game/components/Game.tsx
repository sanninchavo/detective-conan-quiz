import '@features/Game.css'
import { useQuestionsStore } from "@store/questions"
import { RightArrow, LeftArrow } from '@features/Icons'
import { useQuestionsData } from '@hooks/useQuestionsData'
import { TimerBar } from '@gameComponents/TimeBar'
import { Question } from '@gameLogic/Question'

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestions = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
  const resetGame = useQuestionsStore(state => state.reset)
  const finishQuiz = useQuestionsStore(state => state.finishQuiz)
  const { answeredQuestion } = useQuestionsData()
  const questionIndex = questions[currentQuestions]

  return (
    <>
      <TimerBar />
      <div className='flechas-juego'>
        <button onClick={goPreviousQuestion} disabled={currentQuestions === 0} hidden={answeredQuestion != questions.length} >
          <LeftArrow />
        </button>
        <h4>{currentQuestions + 1} / {questions.length}</h4>
        <button onClick={goNextQuestion} disabled={currentQuestions >= questions.length - 1} hidden={answeredQuestion != questions.length} >
          <RightArrow />
        </button>
      </div>
      <Question info={questionIndex} />
      <div className='botones-al-final'>
        <button onClick={resetGame}>Volver al inicio</button>
        <button onClick={finishQuiz} hidden={answeredQuestion != questions.length}>Terminar</button>
      </div>
    </>
  )
}




