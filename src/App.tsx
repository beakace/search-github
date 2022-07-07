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

const emails = ["Contributor 1", "Contributor 2"]
interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

function App() {
  const [repoData, setRepoData] = useState([])
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(emails[1])
  //zmienic zeby sie nie wybieralo pozycji tylko linki do contributora

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
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

  function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props

    const handleClose = () => {
      onClose(selectedValue)
    }

    const handleListItemClick = (value: string) => {
      onClose(value)
    }

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Repository Name</DialogTitle>
        <Typography>
          Repository's description - this field will contain some text.
        </Typography>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem
              button
              onClick={() => handleListItemClick(email)}
              key={email}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("addAccount")}
            // zmienić zeby tu byl link do html repo
          >
            <ListItemAvatar>
              <Avatar>
                <LinkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Go to repository's Github page" />
          </ListItem>
        </List>
      </Dialog>
    )
  }
  function SimpleDialogDemo() {
    return (
      <div>
        <Typography variant="subtitle1" component="div">
          Selected: {selectedValue}
        </Typography>
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
          Open simple dialog
        </Button>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </div>
    )
  }
  function BasicList() {
    return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="secondary mailbox folders">
          <List>
            {repoData.map(({ name, id, html_url }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton onClick={handleClickOpen}>
                  <ListItemText primary={`${name} ${id} ${html_url}`} />
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
      <SimpleDialogDemo />
    </div>
  )
}

export default App
