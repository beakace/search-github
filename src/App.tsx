import { useState, useMemo } from "react"
import "./App.css"
import SearchBar from "./SearchBar"
import { Box } from "@mui/system"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ResultsList from "./Results"
import { Routes, Route, useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"

function App() {
  const [repoData, setRepoData] = useState([])
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [contributors, setContributors] = useState([])
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  function BasicList() {
    return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="secondary mailbox folders">
          <List>
            {repoData.map(({ name, id }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setSelectedId(id)
                    navigate("/results")
                  }}
                >
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    )
  }
  const selectedRepo = useMemo(() => {
    if (!selectedId) {
      return null
    }
    return repoData.find(({ id }) => id === selectedId)
  }, [repoData, selectedId])

  useMemo(() => {
    if (selectedRepo != null) {
      let ownerArr = selectedRepo["owner"]
      let owner = ownerArr["login"]
      let repo = selectedRepo["name"]

      fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Contributors:", data)
          setContributors(data)
        })
    }
  }, [selectedRepo])

  return (
    <div className="App">
      <div className="container">
        {loading ? (
          <div className="loader-container">
            <ClipLoader color={"#fff"} size={60} />
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <SearchBar
                    query={query}
                    setQuery={setQuery}
                    setRepoData={setRepoData}
                    setLoading={setLoading}
                  />
                  <BasicList />
                </>
              }
            />

            <Route
              path="results"
              element={
                <ResultsList
                  selectedRepo={selectedRepo}
                  contributors={contributors}
                />
              }
            />
          </Routes>
        )}
      </div>
    </div>
  )
}

export default App
