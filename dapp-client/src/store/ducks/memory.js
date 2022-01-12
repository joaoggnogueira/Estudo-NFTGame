import { createActions, createReducer } from "reduxsauce"
import Immutable from "seamless-immutable"

let CARDS = [
  { image: "card-a.jpg", flipped: false, earned: false },
  { image: "card-b.jpg", flipped: false, earned: false },
  { image: "card-c.jpg", flipped: false, earned: false },
  { image: "card-d.jpg", flipped: false, earned: false },
  { image: "card-e.jpg", flipped: false, earned: false },
  { image: "card-f.jpg", flipped: false, earned: false },
  { image: "card-g.jpg", flipped: false, earned: false },
  { image: "card-h.jpg", flipped: false, earned: false },
]
const copies = []
for (let i = 0; i < CARDS.length; i++) {
  copies.push({ ...CARDS[i] })
}
CARDS = CARDS.concat(copies)
for (let i = 0; i < CARDS.length; i++) {
  const i = Math.floor(Math.random() * CARDS.length)
  const j = Math.floor(Math.random() * CARDS.length)
  const aux = CARDS[i]
  CARDS[i] = CARDS[j]
  CARDS[j] = aux
}

const INITIAL_STATE = Immutable({ CARDS, EARNED_CARDS: [] })

export const { Types, Creators } = createActions({
  flipCard: ["card"],
  clearCardsFlipped: [],
  earnCards: ["card_earned"],
})

const flipCard = (state = INITIAL_STATE, { card }) => {
  const index = state.CARDS.indexOf(card)
  if (index === -1) {
    console.error("card not found")
  }
  const newCards = [...state.CARDS]
  newCards[index] = { ...card, flipped: true }

  return state.merge({ ...state, CARDS: newCards })
}

const clearCardsFlipped = (state = INITIAL_STATE) => {
  const newCards = [...state.CARDS]
  newCards.forEach((card, index) => {
    newCards[index] = { ...card, flipped: false }
  })
  return state.merge({ ...state, CARDS: newCards })
}

const earnCards = (state = INITIAL_STATE, { card_earned }) => {
  const newCards = [...state.CARDS]

  newCards.forEach((card, index) => {
    if (card.image === card_earned.image) newCards[index] = { ...card, earned: true }
  })
  const newEarned = [...state.EARNED_CARDS, card_earned]
  return state.merge({ ...state, CARDS: newCards, EARNED_CARDS: newEarned })
}

export const MemoryTypes = Types

export default createReducer(INITIAL_STATE, {
  [Types.FLIP_CARD]: flipCard,
  [Types.CLEAR_CARDS_FLIPPED]: clearCardsFlipped,
  [Types.EARN_CARDS]: earnCards,
})
