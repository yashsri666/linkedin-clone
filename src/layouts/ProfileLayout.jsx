import React, { useMemo, useState } from 'react'
import { getCurrentUser } from '../API/FirestoreAPI';
import Topbar from '../components/common/Topbar';
import Profile from '../Pages/Profile'

export default function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({});

    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Profile currentUser={currentUser} />
    </div>
  )
}
