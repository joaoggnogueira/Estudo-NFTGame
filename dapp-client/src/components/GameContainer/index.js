import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import CardBoard from "../CardBoard"
import NFTFooter from "../NFTFooter"
import { Creators as MemoryActions } from "../../store/ducks/memory"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useBlockchain } from "../../blockchain"

const GameContainer = (props) => {
  const { isLogged, doLogin, myTokens } = useBlockchain()

  const handleLogin = async () => {
    await doLogin()
  }

  return (
    <Container>
      <Row>
        <h2 className="text-center" style={{ padding: "20px" }}>
          Slime Ranger NFT
        </h2>
      </Row>
      {isLogged ? (
        <>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <CardBoard {...props} />
            </Col>
          </Row>
          <NFTFooter tokens={myTokens} />
        </>
      ) : (
        <Row className="d-flex justify-content-center">
          <Button onClick={handleLogin}>LOGIN</Button>
        </Row>
      )}
    </Container>
  )
}

const mapStateToProps = (state) => ({
  memory: state.memory,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(MemoryActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
