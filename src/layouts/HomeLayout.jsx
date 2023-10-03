import React from 'react'
import Home from '../Pages/Home'
import { getCurrentUser } from '../API/FirestoreAPI'
import Topbar from '../components/common/Topbar'
import { useMemo, useState } from 'react'

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, [])
  return (
    <div>
        <Topbar currentUser={currentUser} />
        <Home currentUser={currentUser} />
    </div>
  )
}
