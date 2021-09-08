import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Paper, Button } from '@material-ui/core';
import useStyles from './styles.js';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '', createdAt: '' });
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
            console.log(postData.createdAt)
        } else {
            postData.createdAt = Date();
            dispatch(createPost(postData));
            console.log(postData);
        }
        clear();
    };

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '', createdAt: '' });
    };
    return (
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a memory</Typography>
                <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone={({ base64 }) => { setPostData({ ...postData, selectedFile: base64 }) }} />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' fullWidth type='submit' size='large'>Submit</Button>
                <Button variant='contained' color='secondary' fullWidth onClick={clear} size='small'>Clear</Button>
            </form>

        </Paper>
    );
};

export default Form;