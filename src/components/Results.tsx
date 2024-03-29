import * as React from "react"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { Typography } from "@mui/material"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import LinkIcon from "@mui/icons-material/Link"
import PersonIcon from "@mui/icons-material/Person"
import GroupsIcon from "@mui/icons-material/Groups"
import { Stack } from "@mui/material"
import Button from "@mui/material/Button"

function Results(props) {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="results-page ">
      <List
        className="results-element"
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: "transparent",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <Typography
            className="title"
            variant="h4"
            style={{ fontFamily: "Lexend, sans-serif" }}
          >
            Name:{" "}
            {props.selectedRepo != null
              ? props.selectedRepo["name"]
              : "Choose repository"}
          </Typography>
        }
      >
        <div className="content">
          <Typography>
            <strong>Description: </strong>
            {props.selectedRepo != null
              ? props.selectedRepo["description"]
              : "description"}
          </Typography>
          <Typography
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              /* other styles you might have */
            }}
          >
            <strong>Stars count: </strong>
            {props.selectedRepo != null
              ? props.selectedRepo["stargazers_count"]
              : "Choose repository"}{" "}
            <StarBorderIcon />
          </Typography>
          <ListItemButton
            href={
              props.selectedRepo != null
                ? props.selectedRepo["html_url"]
                : "url"
            }
            target="_blank"
          >
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary="Go to this repository's Github page" />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Contributors" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {props.contributors.map(({ login, id, html_url }) => (
                <ListItemButton
                  key={id}
                  sx={{ pl: 4 }}
                  href={html_url}
                  target="_blank"
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={login} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      </List>
      <Stack spacing={2} direction="column" className="back-button">
        <Button
          href="/"
          variant="contained"
          style={{
            backgroundColor: "rgba(50,50, 255, 0.2)",
            color: "rgba(40, 46, 55, 0.9)",
            fontSize: "18px",
            fontFamily: "Lexend, sans-serif",
          }}
          size="large"
        >
          Search for something else
        </Button>
      </Stack>
    </div>
  )
}

export default Results
