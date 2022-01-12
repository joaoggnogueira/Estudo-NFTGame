import React from "react"
import { Container } from "react-bootstrap"
import CardImage from "./CardImage"
import { useEffect } from "react"
import { useBlockchain } from "../../blockchain"

let timeout = false

const CardBoard = (props) => {
  const { doMint } = useBlockchain()

  const eventsHandler = {
    onReceipt(tokenURI) {
      alert("Sua NFT foi mintada com sucesso!")
    },
    onError(err) {
      alert(err)
    },
    onRegistered(hash) {
      alert("Token registrado com sucesso! Sua transação está sendo processad!")
    },
    onConfirmation(confirmationNumber, receipt) {},
  }

  useEffect(() => {
    const { CARDS } = props.memory
    const flippeds = CARDS.filter((card) => card.flipped)
    console.log(flippeds)
    clearTimeout(timeout)
    if (flippeds.length > 1) {
      if (flippeds[0].image === flippeds[1].image) {
        props.earnCards(flippeds[0])
        props.clearCardsFlipped()
        doMint(flippeds[0].image, eventsHandler)
      } else {
        timeout = setTimeout(() => {
          timeout = false
          props.clearCardsFlipped()
        }, 1000)
      }
    }
  })

  const onClick = (card) => {
    if (!timeout) props.flipCard(card)
  }
  return (
    <Container className="custom-grid-cards">
      {props.memory.CARDS.map((card, index) => (
        <CardImage key={index} card={card} onClick={onClick} />
      ))}
    </Container>
  )
}

export default CardBoard
