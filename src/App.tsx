import "./App.css"
import { Routes, Route } from "react-router-dom"
import { SearchPage } from "./pages/SearchPage"
import { RepoPage } from "./pages/RepoPage"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<SearchPage />} />
        <Route path="/repo/:owner/:name" element={<RepoPage />} />
      </Routes>
    </div>
  )
}

export default App
