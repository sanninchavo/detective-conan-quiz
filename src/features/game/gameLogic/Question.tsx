import { type Question as QuestionType } from '@types'
import { useQuestionsStore } from "@store/questions"
import { getBackgroundColor } from '@gameLogic/getBackgroundColor'
import '@features/Game.css'
export const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)
  const createHandleClick = (answerIndex: number) => () => {
    if (info.userSelectedAnswer != null) return
    selectAnswer(info.id, answerIndex)
  }

  return (
    <>
      <section className='pregunta'>
        <h4>{info.question}</h4>
        {info.imagen && <img src={info.imagen} />}
        {
          info.answer.map((answer, index) => (

            <div className='respuestas' key={index}>
              <button
                disabled={info.userSelectedAnswer != null}
                style={{ backgroundColor: getBackgroundColor(info, index) }}
                onClick={createHandleClick(index)}>
                {answer}
              </button>
            </div>
          ))}
      </section>
    </>
  )
}
