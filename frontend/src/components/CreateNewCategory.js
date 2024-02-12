import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, Typography } from '@mui/material';
import { category } from '../api/category';

export const CreateNewCategory = ({ open, handleClose }) => {
  const [name, setName] = useState("")
  const [creating, setCreating] = useState(false)

  const createCategory = () => {
    setCreating(true)
    category.create(name)
    .then(category => {
        handleClose()
    })
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        >
        <DialogTitle>New Category</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Create categories for your items
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="Category Name"
                placeholder="Bundles, Finished Products, ...."
                type="text"
                fullWidth
                variant="standard"
                value={name}
                onChange={handleNameChange}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={createCategory}>
                <Typography>Create</Typography>
                { creating && <CircularProgress/>}
            </Button>
        </DialogActions>
    </Dialog>
  );
}