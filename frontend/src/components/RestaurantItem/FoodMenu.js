import React,{useState} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Searchbar from "../Filter/Searchbar/Searchbar";
import Foods from "./Foods";
import Footer from "../Footer/Footer";
import { Checkbox,  FormControlLabel, FormGroup} from '@material-ui/core'
import { useLocation } from "react-router-dom";
import CheckFilter from "../Filter/LeftSidebar/CheckFilter";

const Container = styled.div``;

const Side = styled.div`
  width: 120px;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  border:0
`;

const FilterContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
`;

const Filter = styled.div`
  margin: 20px;
  padding-right: 50px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  padding-left:130px ;
`;
const BoxFilter=styled.div`
 padding-left: 1120px;
`
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;
/* const ListItem=styled.div`
padding-top: 20px;
`; */
const FoodMenu = () => {
  const dispatch=useDispatch();
  const location=useLocation();
 const RestaurantName=location.pathname.split("/")[2];
 const [filters,setFilters]=useState({});
 const [sort,setSort]=useState('default')
//  const CatagoryFilters=(e)=>{

//   const value= e.target.value
//   setFilters({
//    ...filters,
//     [e.target.name]:value
//   })
//  }
 const SortPriceHandler=(e)=>{
    // console.log(e.target.value) 
   dispatch({type:'SortPrice',payload:e.target.value})
 }
/* console.log(filters) */

  return (
    <Container>
      <Searchbar />
      
      <FilterContainer>
        <Filter>
          <Side>
            <CheckFilter/>
          </Side>
  <Title>Catagories</Title> 
      
        <FormGroup   >
          <FormControlLabel control={<Checkbox />} label="BURGER" value="BURGER" name="cat" />
     
        <FormControlLabel control={<Checkbox />} label="Pizza" value="Pizza" name="cat" />   
     
        <FormControlLabel control={<Checkbox />} label="Rice" value="Rice" name="cat"/>   
      
        <FormControlLabel control={<Checkbox />} label="Kacchi" value="Kacchi" name="cat"/>   
     
        <FormControlLabel control={<Checkbox />} label="Mutton" value="Mutton" name="cat"/>   
        </FormGroup>
        </Filter>

        <Filter>
        <BoxFilter>
        <FilterText>SORT BY(PRICE):</FilterText>
          <Select name="PRICE" onChange={SortPriceHandler} >
            <Option value="default">DEFAULT</Option>
            <Option value="asc">LOW-HIGH</Option>
            <Option value="desc">HIGH-LOW</Option>
          </Select>
        </BoxFilter>
          <Foods  />
        </Filter>
      </FilterContainer>
      <Footer />
    </Container>
  );
};

export default FoodMenu;