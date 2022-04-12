import { BookmarkBorder, Comment, Favorite } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

const Post = ({ props }) => {
  const img =
    "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80";
  const boxStyle = {
    width: 700,
    textAlign: "left",
    m: 7,
    ml: 0,
    borderRadius: 1,
  };

  return (
    <Card sx={boxStyle}>
      <CardHeader
        avatar={<Avatar src={img} />}
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
          width: 700,
          height: 350,
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
  );
};

export default Post;
