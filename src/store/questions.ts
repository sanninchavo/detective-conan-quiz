import { create } from 'zustand'
import { type Question } from '../types'

const QUESTION_TIME = 30000
const FEEDBACK_TIME = 3000


interface State {
  questions: Question[]
  currentQuestion: number
  timeExpired: boolean
  waitingTime: boolean
  totalTime: number
  timeLeft: number
  state: 'start' | 'playing' | 'finish'
  fetchQuestions: (limit: number, difficulty: "Fácil" | "Medio" | "Difícil") => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
  finishQuiz: () => void
  nextQuestion: () => void
  setTimeExpired: () => void
  starTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
}

export const useQuestionsStore = create<State>((set, get) => {
  let timer: ReturnType<typeof setInterval> | null = null
  let feedbackTimeout: ReturnType<typeof setTimeout> | null = null

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const clearFeedbackTimeout = () => {
    if (feedbackTimeout) {
      clearTimeout(feedbackTimeout)
      feedbackTimeout = null
    }
  }
  return {
    questions: [],
    currentQuestion: 0,
    state: "start",
    timeExpired: false,
    waitingTime: false,
    totalTime: 30,
    timeLeft: QUESTION_TIME / 1000,


    fetchQuestions: async (limit: number, difficulty: string) => {
      const res = await fetch('/question.json')
      const json = await res.json()

      const questions = json[difficulty].sort(() => Math.random() - 0.5)
        .slice(0, limit)
        .map((question: Question) => {
          // Mezclamos las respuestas
          const mixedAnswers = [...question.answer].sort(() => Math.random() - 0.5)

          // Actualizamos el índice correcto según la nueva posición
          const newCorrectIndex = mixedAnswers.indexOf(question.answer[question.correctAnswer])

          return {
            ...question,
            answer: mixedAnswers,
            correctAnswer: newCorrectIndex
          }
        })
      set({ questions, state: "playing", timeExpired: false })
      get().resetTimer()
      get().starTimer()
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()

      //usamos el structuredClones para clonar el objeto
      const newQuestions = structuredClone(questions)

      //encontramos el índice de la pregunta
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)

      //obtenemos la información de la pregunta
      const questionInfo = newQuestions[questionIndex]

      //averiguamos si el usuario a seleccionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      //cambiar esta información en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }

      //actualizamos el estado
      set({ questions: newQuestions, timeExpired: true, waitingTime: true })
      clearFeedbackTimeout()
      feedbackTimeout = setTimeout(() => get().nextQuestion(), FEEDBACK_TIME)
    },

    goNextQuestion: () => {
      clearFeedbackTimeout()
      const { currentQuestion, questions } = get()
      const nextQuestions = currentQuestion + 1

      if (nextQuestions < questions.length) {
        clearFeedbackTimeout()
        get().stopTimer()
        set({ currentQuestion: nextQuestions, timeExpired: false, waitingTime: false })
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestions = currentQuestion - 1

      if (previousQuestions >= 0) {
        clearFeedbackTimeout()
        set({ currentQuestion: previousQuestions })
      }
    },

    reset: () => {
      clearTimer()
      clearFeedbackTimeout()
      set({
        currentQuestion: 0,
        questions: [],
        state: "start",
        timeExpired: false,
        waitingTime: false,
        timeLeft: QUESTION_TIME / 1000
      })
    },

    finishQuiz: () => {
      //confetti()
      clearTimer()
      set({ state: "finish" })
    },

    nextQuestion: () => {
      clearFeedbackTimeout()
      const { currentQuestion, questions } = get()
      const timerQuestion = currentQuestion + 1

      if (timerQuestion < questions.length) {
        set({ currentQuestion: timerQuestion, timeExpired: false, waitingTime: false })
        get().resetTimer()
        get().starTimer()
      }
    },

    setTimeExpired: () => {
      const { questions, currentQuestion } = get()
      const updated = structuredClone(questions)

      // Pregunta actual
      const current = updated[currentQuestion]
      // Si el usuario no respondió, forzamos mostrar la respuesta correcta
      if (current.userSelectedAnswer == null) {
        current.userSelectedAnswer = -1 // valor especial que luego usamos en getBackgroundColor
      }

      updated[currentQuestion] = current

      set({ questions: updated, timeExpired: true, waitingTime: true })
      get().stopTimer()
    },

    starTimer: () => {
      timer = setInterval(() => {
        const { timeLeft, timeExpired } = get()
        if (timeExpired) return
        if (timeLeft <= 1) {
          clearTimer()
          set({ timeLeft: 0 })
          get().setTimeExpired()
          setTimeout(() => get().nextQuestion(), FEEDBACK_TIME)
          return
        }
        set({ timeLeft: timeLeft - 1 })
      }, 1000)
    },

    stopTimer: () => {
      clearTimer()
    },

    resetTimer: () => {
      clearTimer()
      set({ timeLeft: QUESTION_TIME / 1000 })
    },
  }
}) 