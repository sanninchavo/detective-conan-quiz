import { useQuestionsStore } from "../../../store/questions"
export const TimerBar = () => {
  const timeLeft = useQuestionsStore(state => state.timeLeft)
  const totalTime = useQuestionsStore(state => state.totalTime)
  const percentage = (timeLeft / totalTime) * 100
  const getColor = (percentage: number) => {
    if (percentage > 66) return '#4caf50'  // verde
    if (percentage > 33) return '#ec8a0aff'  // amarillo
    return '#f44336'                        // rojo
  }
  return (
    <div className="timer-bar">
      <div
        className="timer-fill"
        style={{
          width: `${percentage}%`,
          backgroundColor: getColor(percentage)
        }}
      >
      </div>
    </div>
  )
}