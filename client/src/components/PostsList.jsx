import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import Post from "./Post";
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles((theme) => ({
  layoutShifter: {
    float: "right",
    margin: theme.spacing(2),
  },
}));

const PostsList = () => {
  const posts = useSelector((state) => state.posts.posts);

  const [layout, setLayout] = useState("gridThree");

  const calculateMd = () => {
    return layout === "gridThree" ? 4 : 3;
  };

  const classes = useStyles();

  return (
    <>
      {/* Layout Shifter */}
      <div className={classes.layoutShifter}>
        <Button
          variant="text"
          size="small"
          onClick={() => setLayout("gridThree")}
        >
          <AppsIcon fontSize="large" />
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => setLayout("gridFour")}
        >
          <ViewComfyIcon fontSize="large" />
        </Button>
      </div>
      <Grid container spacing={2} alignContent="stretch">
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid item key={post?._id} xs={12} md={calculateMd()}>
              <Post {...post} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PostsList;