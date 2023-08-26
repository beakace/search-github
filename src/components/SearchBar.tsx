import TextField from "@mui/material/TextField"
import { Box } from "@mui/system"
import { Stack, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import { useCallback, useEffect, useState } from "react"
import "../styles.css"

function SearchBar(props) {
  const [query, setQuery] = useState("")
  const { searchQuery, setSearchParams } = props

  const changeHandler = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [searchQuery])

  const startSearch = useCallback(
    (event) => {
      event.preventDefault()
      setSearchParams({ query: query }, { replace: true })
    },
    [query, setSearchParams],
  )

  return (
    <div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="search-page"
      >
        <Typography
          style={{
            fontSize: "40px",
            color: "rgba(40, 46, 55, 0.9)",
            textTransform: "uppercase",
            fontFamily: "Lexend, sans-serif",
            fontWeight: "normal",
            marginBottom: "20px",
          }}
        >
          <strong>Github</strong> search
        </Typography>
        <div style={{ width: "500px", margin: "auto", paddingBottom: "30px" }}>
          <TextField
            className="search-input"
            id="outlined-basic"
            label="Search for repos"
            variant="outlined"
            value={query}
            onChange={changeHandler}
            fullWidth
            style={{
              outlineColor: "rgba(40, 46, 100, 0.9)",
            }}
          />
        </div>
        <Stack spacing={2} direction="column" className="search-input">
          <Button
            type="submit"
            onClick={startSearch}
            variant="contained"
            size="large"
            style={{
              backgroundColor: "rgba(40, 46, 100, 0.9)",
              fontSize: "17px",
              width: "200px",
              fontFamily: "Lexend, sans-serif",
            }}
          >
            Search
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default SearchBar
