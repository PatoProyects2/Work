import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
export default function Games() {

  return (
    <>
      <h1>Games</h1>
      <NavLink to="/rpsgame" >RPS</NavLink>
    </>
  );
}