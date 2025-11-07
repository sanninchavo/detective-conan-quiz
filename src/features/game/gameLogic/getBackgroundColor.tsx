import { type Question as QuestionType } from '@types'

export const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  //usuario no a seleccionado nada todavía
  if (userSelectedAnswer == null) return 'transparent'

  //si ya seleccionó pero la solución fue incorrecta
  if (index != correctAnswer && index != userSelectedAnswer) return 'transparent'

  //si esta es la solución correcta
  if (index === correctAnswer) return 'green'

  //si esta es la opción seleccionada por el usuario y es incorrecta
  if (index === userSelectedAnswer) return 'red'

  //si el tiempo para las preguntas pasa y el usuario no selecciona una respuesta
  // marcar la respuesta correcta, esperar los 3 segundos entre preguntas e ir a la siguiente
  if (userSelectedAnswer === -1) {
    return index === correctAnswer ? "green" : "transparent"
  }


  return 'transparent'
}
