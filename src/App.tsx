import { useState, useMemo } from "react"
import "./App.css"
import SearchBar from "./SearchBar"
import { Box } from "@mui/system"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
<<<<<<< Updated upstream
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import debounce from "lodash.debounce"
=======
import Results from "./Results"
import { Routes, Route, useNavigate } from "react-router-dom"
>>>>>>> Stashed changes

function App() {
  const [repoData, setRepoData] = useState([])
  const [query, setQuery] = useState("")
<<<<<<< Updated upstream

  useEffect(() => {
    if (query.length) {
      fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data)
          setRepoData(data.items)
        })
    } else {
      setRepoData([])
    }
  }, [query])
=======
  const [selectedId, setSelectedId] = useState(null)
  const [contributors, setContributors] = useState([])
  let navigate = useNavigate()
>>>>>>> Stashed changes

  function BasicList() {
    return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="secondary mailbox folders">
          <List>
            {repoData.map(({ name, id }) => (
              <ListItem key={id} disablePadding>
<<<<<<< Updated upstream
                <ListItemButton>
                  <ListItemText primary={`${name} ${id}`} />
=======
                <ListItemButton
                  onClick={() => {
                    setSelectedId(id)
                    navigate("/results")
                  }}
                >
                  <ListItemText primary={name} />
>>>>>>> Stashed changes
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    )
  }
<<<<<<< Updated upstream

  function SearchBar() {
    const changeHandler = (event) => {
      setQuery(event.target.value)
=======
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
>>>>>>> Stashed changes
    }
  }, [selectedRepo])

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <SearchBar
              query={query}
              setQuery={setQuery}
              setRepoData={setRepoData}
            />
          }
        />
        <Route
          path="/results"
          element={
            <Results selectedRepo={selectedRepo} contributors={contributors} />
          }
        />
      </Routes>
      <BasicList />
    </div>
  )
}

export default App
