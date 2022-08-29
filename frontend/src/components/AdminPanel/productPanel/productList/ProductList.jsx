// import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import React from 'react'

const ProductList = () => {
  return (
    <>
    <style
      dangerouslySetInnerHTML={{
        __html:
          "\ntable {\n  border-collapse: collapse;\n  width: 100%;\n}\n\nth, td {\n  text-align: left;\n  padding: 8px;\n}\n\ntr:nth-child(even) {\n  background-color: #D6EEEE;\n}\n"
      }}
    />
    <h2>Zebra Striped Table</h2>
    <p>
      For zebra-striped tables, use the nth-child() selector and add a
      background-color to all even (or odd) table rows:
    </p>
    <table>
      <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Points</th>
        </tr>
        <tr>
          <td>Peter</td>
          <td>Griffin</td>
          <td>$100</td>
        </tr>
        <tr>
          <td>Lois</td>
          <td>Griffin</td>
          <td>$150</td>
        </tr>
        <tr>
          <td>Joe</td>
          <td>Swanson</td>
          <td>$300</td>
        </tr>
        <tr>
          <td>Cleveland</td>
          <td>Brown</td>
          <td>$250</td>
        </tr>
        <tr>
          <td>Cleveland</td>
          <td>Brown</td>
          <td>$250</td>
  
        </tr>
    
      </tbody>
    </table>
  </>
  
  
  )
}

export default ProductList