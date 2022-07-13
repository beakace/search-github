import TextField from "@mui/material/TextField"
import { Box } from "@mui/system"
import { Stack } from "@mui/material"
import Button from "@mui/material/Button"

function SearchBar(props) {
  const changeHandler = (event) => {
    props.setQuery(event.target.value)
  }

  function startSearch() {
    if (props.query.length) {
      fetch(`https://api.github.com/search/repositories?q=${props.query}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("Success:", data)
          props.setRepoData(data.items)
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
        value={props.query}
        onChange={changeHandler}
      />
      <Stack spacing={2} direction="column">
        <Button onClick={startSearch} variant="contained" size="large">
          Search
        </Button>
      </Stack>
    </Box>
  )
}

export default SearchBar
