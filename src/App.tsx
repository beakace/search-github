import React, { useState, useEffect, useMemo } from "react"
import "./App.css"
//import SearchBar from "./SearchBar"
import TextField from "@mui/material/TextField"
import { Box } from "@mui/system"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"
//import debounce from "lodash.debounce"
import Avatar from "@mui/material/Avatar"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import PersonIcon from "@mui/icons-material/Person"
import Typography from "@mui/material/Typography"
import { blue } from "@mui/material/colors"
import LinkIcon from "@mui/icons-material/Link"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

interface SimpleDialogProps {
  open: boolean
  //selectedValue: string
  onClose: () => void
}

function App() {
  const [repoData, setRepoData] = useState([])
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  //const handleClickOpen = () => {
  // setOpen(true)
  //}

  const handleClose = () =>
    // event: {},
    // reason: "backdropClick" | "escapeKeyDown",
    {
      setOpen(false)
    }

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
                <ListItemButton
                  onClick={() => {
                    setSelectedId(id)
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

  if (selectedRepo != null) {
    console.log(selectedRepo["html_url"])
  }

  const contributors = [
    selectedRepo != null ? selectedRepo["contributors_url"] : "lol",
  ]
  function SimpleDialog(props: SimpleDialogProps) {
    //const { onClose } = props

    // const handleClose = (
    //   event: {},
    //   reason: "backdropClick" | "escapeKeyDown",
    // ) => {
    //   setOpen(false)
    // }

    // const handleListItemClick = (value: string) => {
    //   onClose(value)
    // }

    return (
      <Dialog onClose={handleClose} open={!!selectedRepo}>
        <DialogTitle>
          {selectedRepo != null ? selectedRepo["name"] : "name"}
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Typography>
          {selectedRepo != null ? selectedRepo["description"] : "description"}
        </Typography>
        <List sx={{ pt: 0 }}>
          {contributors.map((contributors) => (
            <ListItem
              button
              // onClick={() => handleListItemClick(contributors)}
              key={contributors}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={contributors} />
            </ListItem>
          ))}
          <ListItem
            component="a"
            href={selectedRepo != null ? selectedRepo["html_url"] : "url"}
            target="_blank"
            autoFocus
            button
            // onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <LinkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Open this repository on github.com" />
          </ListItem>
        </List>
      </Dialog>
    )
  }
  function SimpleDialogDemo() {
    return (
      <div>
        <Typography variant="subtitle1" component="div"></Typography>
        <br />
        <Button variant="outlined">Open simple dialog</Button>
        <SimpleDialog open={open} onClose={handleClose} />
      </div>
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
      <SimpleDialogDemo />
    </div>
  )
}

export default App
