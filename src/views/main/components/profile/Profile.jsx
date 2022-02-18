import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../../firebase/firesbaseConfig'
export default function Profile() {
  const [user] = useAuthState(auth)
  return (
    <>
      <h1>Profile</h1>
      <p><img src={user.photoURL} alt="" /></p>
      <p>{"NAME: " + user.displayName}</p>
      <p>{"EMAIL: " + user.email}</p>
      <p>{"VERIFIED? " + user.emailVerified}</p>
    </>
  );
}