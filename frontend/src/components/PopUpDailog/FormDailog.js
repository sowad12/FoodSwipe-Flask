import React, { useState } from 'react'
import axios from 'axios';
import {Dialog,DialogActions,
  DialogContent,DialogContentText,
  DialogTitle,Button,TextField   } from '@material-ui/core';
import { SystemUpdate } from '@material-ui/icons';

import { useNavigate } from 'react-router-dom';
const FormDailog = (items) => {

  const navigate = useNavigate();
  // console.log(items)
const[foodName,SetfoodName]=useState(items.foodName); 
const[foodPrice,SetfoodPrice]=useState(items.foodPrice); 
const[foodStock,SetfoodStock]=useState(items.foodStock); 
const[foodRating,SetfoodRating]=useState(items.foodRating); 

const[error,setError]=useState(' ');
const[status,setStatus]=useState(' ');

const [open,setOpen]=useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateFoods=async(e)=>{
    e.preventDefault()

   try{
    const config={
      headers:{
       "Content-Type": "application/json",
      }
    }

    const {data}=await axios.put(`http://localhost:5000/updateFood/${items._id.$oid}`,{
      foodName,
      foodPrice,
      foodStock,
      foodRating,
  
    },config);
    // console.log(data);
    // console.log(data.status)
    // localStorage.setItem('userinfo',JSON.stringify(data))
 
    setStatus(200);
  
    // window.alert("Registration Success");
    navigate(`/RestaurantMenu/${items.foodRestId}`);
   
  }catch(err){
    console.log(err)
    // setStatus(err.response.status)
    // setError(err.response.data)
  }
  }

  

  return (
 <>
  
    <Button variant="outlined"  onClick={handleClickOpen}>
      <SystemUpdate/>
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title"    style={{
        color: 'green'}}>UPDATE FOOD</DialogTitle>
         
      <DialogContent>
      <form onSubmit={updateFoods} id="updateFoods">
        <TextField
          autoFocus
          margin="dense"
          id="foodName"
          label="Food Name"
          type="text"
          value={foodName}
         
          fullWidth
          onChange={(e)=>SetfoodName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="foodPrice"
          label="Food Price"
          type="text"
          value={foodPrice}
          fullWidth
          onChange={(e)=>SetfoodPrice(e.target.value)}
        />
     
        <TextField
          autoFocus
          margin="dense"
          id="foodStock"
          label="Food Stock"
          type="text"
          value={foodStock}
          fullWidth
          onChange={(e)=>SetfoodStock(e.target.value)}
        />
           <TextField
          autoFocus
          margin="dense"
          id="foodRating"
          label="Food Rating"
          type="text"
          value={foodRating}
          fullWidth
          onChange={(e)=>SetfoodRating(e.target.value)}
         
        />
            </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button  color="primary" type="submit"  form="updateFoods" >
          Update
        </Button>
  
      </DialogActions>
  
    </Dialog>
 
</>
  )
}

export default FormDailog 