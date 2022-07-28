import TextField from "@mui/material/TextField"
import { Box } from "@mui/system"
import { Stack } from "@mui/material"
import Button from "@mui/material/Button"
import { useState } from "react"
// import { useSearchParams } from "react-router-dom"

function SearchBar(props) {
  // let [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState("")
  // const queryParams = searchParams.get('search')

  const changeHandler = (event) => {
    setQuery(event.target.value)
  }

  function startSearch() {
    if (query.length) {
      props.setLoading(true)
      fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          props.setLoading(false)
          // console.log("Success:", data)
          props.setRepoData(data.items)
          // setSearchParams({ search: `${query}` })
          // console.log(searchParams)
        })
    } else {
      props.setRepoData([])
    }
  }

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
