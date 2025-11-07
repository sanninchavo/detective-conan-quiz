import { useQuestionsStore } from "../store/questions"

export const useQuestionsData = () => {
  const questions = useQuestionsStore(state => state.questions)
  let answeredQuestion = 0
  let correct = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer != null) answeredQuestion++
    if (userSelectedAnswer == correctAnswer) correct++
  })

  // Mapa de resultados
  const results: Record<number, { name: string; img: string }> = {
    0: { name: "Misao Yamamura", img: "/imagenes/yamamura.webp" },
    1: { name: "Misao Yamamura", img: "/imagenes/yamamura.webp" },
    2: { name: "Mōri Kogorō", img: "/imagenes/kogoro.webp" },
    3: { name: "Mōri Kogorō", img: "/imagenes/kogoro.webp" },
    4: { name: "Yamato Kansuke", img: "/imagenes/kansuke.webp" },
    5: { name: "Morofushi Takaaki", img: "/imagenes/komei.webp" },
    6: { name: "Hattori Heiji", img: "/imagenes/heiji.webp" },
    7: { name: "Kuroba Kaito", img: "/imagenes/Kaito-Kuroba.webp" },
    8: { name: "Kudō Shinichi", img: "/imagenes/shinichi.webp" },
    9: { name: "Kudō Yūsaku", img: "/imagenes/Yusaku_Kudo.webp" },
    10: { name: "Sherlock Holmes", img: "/imagenes/sherlock.webp" }
  }

  // Valor por defecto si no existe el índice
  const { name, img } = results[correct] || results[0]
  return { answeredQuestion, correct, name, img }
}