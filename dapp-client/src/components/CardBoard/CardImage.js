import React from "react"

const CardImage = ({ card, onClick }) => {
  const { origin } = window.location
  const computeImage = (path) =>
    origin + "/" + (card.flipped || card.earned ? card.image : "card.png")
  return (
    <div className={card.earned ? "selected-overlay" : ""}>
      <img
        className={"custom-card custom-shadow-box "}
        width="125"
        height="125"
        alt=""
        src={computeImage(card)}
        onClick={() => onClick(card)}
      />
    </div>
  )
}

export default CardImage
