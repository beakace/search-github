import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import debounce from "lodash.debounce"
import { useMemo } from "react"

export default function SearchBar(props) {
  const changeHandler = (e) => {
    return props.setQuery(e.target.value)
  }

  // const debouncedChangeHandler = useMemo(
  //   () => debounce(changeHandler, 300),
  //   [props.setQuery],
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
        value={props.query}
        onChange={changeHandler}
      />
      {/* <Stack spacing={2} direction="row">
        <Button //onClick={changeHandler}
          variant="contained"
          size="large"
        >
          Search
        </Button>
      </Stack> */}
    </Box>
  )
}
