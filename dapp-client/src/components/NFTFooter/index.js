import React from "react"
import { Row, Col } from "react-bootstrap"

const NFTFooter = ({ tokens }) => (
  <Col>
    <Row className="d-flex justify-content-center">
      <h3>Tokens Collected: {tokens.length}</h3>
    </Row>
    <Row className="d-flex justify-content-center">
      {tokens.map((tokenURI, key) => {
        return <img className={"custom-card-2 custom-shadow-box "} width="200" height="200" key={key} src={tokenURI} alt={tokenURI} />
      })}
    </Row>
  </Col>
)

export default NFTFooter
