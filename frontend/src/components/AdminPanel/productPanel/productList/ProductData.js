import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const ProductData = () => {
    useEffect(()=>{
     const adminProducts=async()=>{
     try{
    const config={
     headers:{
        "Content-Type": "application/json"
     }
    }
    const {data}= await axios.get("http://localhost:5000/AdminproductList",config);
    console.log(data)
     }catch(e){
console.log(e)

     }
     }
     adminProducts()
    },[])
  return (
    <div>ProductData</div>
  )
}

export default ProductData