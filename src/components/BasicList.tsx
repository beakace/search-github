import * as React from "react"
import { Box } from "@mui/system"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

function BasicList(props) {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          {props.repoData.map(({ name, id }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => {
                  props.setSelectedId(id)
                  props.navigate(`/results/${id}`)
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

export default BasicList
