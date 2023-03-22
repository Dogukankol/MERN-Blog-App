import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Input,
    Select,
    MenuItem
} from '@material-ui/core';
import { useForm  } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import FileBase64 from 'react-file-base64'
import { createPost } from '../actions/post'

const useStyles = makeStyles(theme => ({
    apper: {
        padding: theme.spacing(2)
    },
    textField: {
        marginBottom: theme.spacing(2),
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


export const AddPostForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [select, setSelect] = useState(false);
    const classes = useStyles();

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(postSchema)
    });

    const handleChange = (event) => {
        setSelect(event.target.value)
    };

    const clearForm = () => {
        reset();
        setFile(null);
        handleClose();
    }

    const onSubmit = (data) => {
        dispatch(
            createPost({
                ...data,
                tag: select,
                image: file
            }
        ))
        console.log({ ...data, file, select })
        clearForm();

    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Add New Post"}
            </DialogTitle>
            <DialogContent>
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
                        />

                        <Select
                            input={<Input />}
                            className={classes.textField}
                            fullWidth
                            name="tag"
                            control={control}
                            error={errors.tag ? true : false}
                            defaultValue={tags[0].tagName}
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
                        />

                        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={clearForm}>Vazgeç</Button>
                <Button onClick={() => handleSubmit(onSubmit)()} autoFocus color="primary" variant="outlined" type="submit" >
                    Yayınla
                </Button>
            </DialogActions>
        </Dialog>
    )
}
