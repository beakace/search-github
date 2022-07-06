import React, { useState, useEffect, useMemo } from "react"
import "./App.css"
//import SearchBar from "./SearchBar"
import TextField from "@mui/material/TextField"
import { Box } from "@mui/system"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import debounce from "lodash.debounce"

function App() {
  const [repoData, setRepoData] = useState([])
  const [query, setQuery] = useState("")

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

  function BasicList() {
    return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="secondary mailbox folders">
          <List>
            {repoData.map(({ name, id }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton>
                  <ListItemText primary={`${name} ${id}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    )
  }

  function SearchBar() {
    const changeHandler = (event) => {
      setQuery(event.target.value)
    }

    // const debouncedChangeHandler = useMemo(
    //   () => debounce(changeHandler, 300),
    //   [],
    // )

    return (
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search for repos"
          variant="outlined"
          value={query}
          onChange={changeHandler}
        />
        {/* <Stack spacing={2} direction="row">
          <Button onClick={changeHandler} variant="contained" size="large">
            Search
          </Button>
        </Stack> */}
      </Box>
    )
  }

  return (
    <div className="App">
      <SearchBar />
      <BasicList />
    </div>
  )
}

export default App
