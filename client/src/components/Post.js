import {
  BookmarkBorder,
  Calculate,
  Comment,
  Favorite,
} from "@mui/icons-material"
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material"
import React from "react"

const Post = ({ props }) => {
  // const img =
  // "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80";
  const boxStyle = {
    width: "90%",
    textAlign: "left",
    m: 5,
    ml: 0,
    mr: 0,
    borderRadius: 1,
    maxWidth: 700,
  }

  return (
    <Card sx={boxStyle}>
      <CardHeader
        avatar={<Avatar />}
        title={props.uname}
        subheader={props.createdTime}
        action={
          <IconButton>
            <BookmarkBorder />
          </IconButton>
        }
      />

      <div
        style={{
          background: `url(${props.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 300,
        }}
      ></div>

      <CardActions disableSpacing>
        <IconButton>
          <Favorite />
        </IconButton>
        <IconButton>
          <Comment />
        </IconButton>
      </CardActions>

      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {props.caption}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Post
