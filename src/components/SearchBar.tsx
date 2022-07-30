import TextField from "@mui/material/TextField"
import { Box } from "@mui/system"
import { Stack } from "@mui/material"
import Button from "@mui/material/Button"
import { useCallback, useEffect, useState } from "react"

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
      <Stack spacing={2} direction="column">
        <Button
          type="submit"
          onClick={startSearch}
          variant="contained"
          size="large"
        >
          Search
        </Button>
      </Stack>
    </Box>
  )
}

export default SearchBar
