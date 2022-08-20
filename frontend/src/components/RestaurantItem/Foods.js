import React,{useState,useEffect} from "react";
import axios from 'axios'
import styled from "styled-components";
import FoodList from "./FoodList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Foods = ({RestaurantName,filters}) => {
  // console.log(RestaurantName,filters,sort)
  const[foods,setFoods]=useState([])
  const[status,setStatus]=useState('')
  const {Restaurant}=useParams()
  // console.log(Restaurant)
//    console.log(useParams())
  const filter=useSelector(state=>state.filter)

   const{searchItem,sort,rating}=filter
    // console.log(typeof(rating))
  
//   const{searchItem,sort,rating  }=filter
  // console.log(searchItem)
   useEffect(()=>{
    const  getSearchFood=async()=>{
      try{ 
         const config={
             headers:{
              "Content-Type": "application/json",
             }
           }
         const res=await axios.get(`http://localhost:5000/getSearchFood/${Restaurant}/${searchItem} `,config)
          // console.log(res.data)
         setStatus(200)
         setFoods(res.data)
         }catch(err){
           setStatus(err.status)
         }  
     }
     getSearchFood()
  },[Restaurant,searchItem])

//   console.log(Restaurant)
  //  console.log(sort.length)
  useEffect(()=>{
    const getAllFoods=async()=>{
      try{ 
         const config={
             headers:{
              "Content-Type": "application/json",
             }
           }
    
         const res=await axios.get(` http://localhost:5000/getAllFoods/${Restaurant}`,config)
          console.log(res.data)
         setStatus(200)
         setFoods(res.data)
         }catch(err){
           setStatus(err.status)
         }  
     }
      getAllFoods()
  },[Restaurant])

  useEffect(()=>{
    const  getSortFoods=async()=>{
      try{ 
         const config={
             headers:{
              "Content-Type": "application/json",
             }
           }
         const res=await axios.get(`http://localhost:5000/getSortFoods/${Restaurant}/${sort} `,config)
          // console.log(res.data)
         setStatus(200)
         setFoods(res.data)
         }catch(err){
           setStatus(err.status)
         }  
     }
     getSortFoods()
  },[Restaurant,sort])

  useEffect(()=>{
    const  getRatingFood=async()=>{
      try{ 
         const config={
             headers:{
              "Content-Type": "application/json",
             }
           }
         const res=await axios.get(`http://localhost:5000/getRatingFoods/${Restaurant}/${rating}`,config)
          // console.log(res.data)
         setStatus(200)
         setFoods(res.data)
         }catch(err){
           setStatus(err.status)
         }  
     }
     getRatingFood()
  },[Restaurant,rating])

  return (
    <Container>
      {foods.map((item,pos) => (
        <FoodList items={item} key={pos} />
      ))}
     
    </Container>
  );
};

export default Foods;