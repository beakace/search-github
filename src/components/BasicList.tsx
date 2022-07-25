import * as React from "react"
import { Box } from "@mui/system"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { useNavigate } from "react-router-dom"

export function BasicList(props) {
  const navigate = useNavigate()

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          {props.repoData.map(({ name, id, owner }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/repo/${owner.login}/${name}`)
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
