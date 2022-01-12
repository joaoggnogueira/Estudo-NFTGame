import "./App.css"
import GameContainer from "./components/GameContainer"
import store from "./store"
import { Provider } from "react-redux"
import { BlockchainProvider } from "./blockchain"

function App() {
  return (
    <Provider store={store}>
      <BlockchainProvider>
        <div className="App">
          <GameContainer></GameContainer>
        </div>
      </BlockchainProvider>
    </Provider>
  )
}

export default App
