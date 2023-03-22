import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import {
  Button,
  TextField,
  Input,
  Select,
  MenuItem
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import FileBase64 from 'react-file-base64'
import { updatePost } from '../actions/post'

const useStyles = makeStyles(theme => ({
  apper: {
    padding: theme.spacing(2)
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(4)
  },
  imgThumb: {
    width: theme.spacing(32)
  }
}))

// const tags = ["Fun", "Programming", "Health", "Science"];
const tags = [
  {
    tagName: "Fun"
  },
  {
    tagName: "Programming"
  },
  {
    tagName: "Health"
  },
  {
    tagName: "Science"
  }
]

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tags: yup.mixed().oneOf(tags),
});


const EditPostForm = ({ post, closeEditMode }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(post?.image);
  const [select, setSelect] = useState(post?.tag);
  const classes = useStyles();

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(postSchema)
  });

  const handleChange = (event) => {
    setSelect(event.target.value)
  };

  const onSubmit = (data) => {
    console.log(data)
    dispatch(
      updatePost({
        _id: post._id,
        ...data,
        tag: select,
        image: file
      }
      ))
  }

  return (
    <div className={classes.root}>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="title"
          label="Başlık"
          name="title"
          variant="outlined"
          className={classes.textField}
          size="small"
          error={errors.title ? true : false}
          {...register('title', { required: true })}
          fullWidth
          defaultValue={post?.title}
        />
        <TextField
          id="subtitle"
          label="Alt Başlık"
          name="subtitle"
          variant="outlined"
          className={classes.textField}
          size="small"
          error={errors.subtitle ? true : false}
          {...register('subtitle', { required: true })}
          fullWidth
          defaultValue={post?.subtitle}
        />

        <Select
          input={<Input />}
          className={classes.textField}
          fullWidth
          name="tag"
          control={control}
          error={errors.tag ? true : false}
          defaultValue={post?.tag}
          value={select}
          onChange={handleChange}
        // {...register('tags', { required: true })}

        >
          {
            tags.map(function (tag, index) {
              return <MenuItem value={tag.tagName} key={index}>{tag.tagName}</MenuItem>;
            })
          }
        </Select>

        <TextField
          id="content"
          label="İçerik"
          name="content"
          variant="outlined"
          className={classes.textField}
          size="small"
          error={errors.content ? true : false}
          {...register('content', { required: true })}
          fullWidth
          multiline
          minRows={4}
          defaultValue={post?.content}
        />

        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />

        <img src={file} className={classes.imgThumb} alt="thumb posts" />
      </form>
      <div className={classes.buttons}>
        <Button onClick={closeEditMode}>Vazgeç</Button>
        <Button onClick={() => handleSubmit(onSubmit)()} autoFocus color="primary" variant="outlined" type="submit" >
          Yayınla
        </Button>
      </div>
    </div>

  )
}


export default EditPostForm;