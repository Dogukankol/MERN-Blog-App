import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import {useDispatch} from 'react-redux'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import PenIcon from '@material-ui/icons/Create'
import PostsList from './components/PostsList';
import { AddPostForm } from './components/AddPostForm';
import PostDetails from './components/PostDetails';
import { fetchPosts } from './actions/post'



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(3)
  }
}))


function App() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position='static' color="inherit" elevation={0}>
          <Toolbar>
            <IconButton edge="start" className={classes.container}></IconButton>

            <Typography variant="h6" color="secondary" className={classes.title}>

              <a href="/posts">Blog Application</a>

            </Typography>


            <Button color="primary" variant="outlined" startIcon={<PenIcon />} className={classes.button}  onClick={handleClickOpen}>Yeni Yazı Ekle</Button>
          </Toolbar>
        </AppBar>

        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Router>
              <Routes>
                <Route path="/posts" element={<PostsList />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/" element={<Navigate replace to="/posts" />} />
              </Routes>

            </Router>
          </Grid>
        </Grid>
      </Container>

      <AddPostForm open={open} handleClose={handleClose} />
      
    </>
  );
}

export default App;
