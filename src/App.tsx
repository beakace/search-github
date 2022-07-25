import { Route, Routes } from "react-router-dom"
import "./App.css"
import { RepoPage } from "./pages/RepoPage"
import { SearchPage } from "./pages/SearchPage"

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/repo/:owner/:name" element={<RepoPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
