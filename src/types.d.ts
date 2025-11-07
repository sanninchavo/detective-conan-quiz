export interface Question {
  id: number
  question: string
  imagen?: string
  answer: string[]
  correctAnswer: number
  userSelectedAnswer?: number
  isCorrectUserAnswer?: boolean
}

