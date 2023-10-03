import React, { useEffect, useState} from 'react'
import './index.scss'
import { AiFillLinkedin } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { AiOutlineHome,
    AiOutlineUserSwitch,
    AiOutlineSearch,
    AiOutlineMessage,
    AiOutlineBell } from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs';
import ProfilePopup from "../ProfilePopup";
import SearchUsers from '../SearchUsers';
import { getAllUsers } from "../../../API/FirestoreAPI";


export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };



  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
        <AiFillLinkedin className='linkedinLogo' alt='linkedinLogo' size={60}
        onClick={() => goToRoute("/home")} />
        {isSearch ? (
          <SearchUsers setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
          />
        ) : (
        <div className='react-icons'>
            <AiOutlineSearch size={25} className='react-icon'
            onClick={() => setIsSearch(true)}/>
            <AiOutlineHome size={25} className='react-icon'
            onClick={() => goToRoute("/home")}/>
            <AiOutlineUserSwitch size={25}className='react-icon'
            onClick={() => goToRoute("/connections")}/>
            <BsBriefcase size={25}className='react-icon'/>
            <AiOutlineMessage size={25}className='react-icon'/>
            <AiOutlineBell size={25}className='react-icon'/>
        </div>
        )}
        <img className='user-logo'
        onClick={displayPopup}
        src={currentUser?.imageLink}
        alt='user'
        />

        {searchInput.length === 0 ? (
          <></>
        ) : (
          <div className="search-results">
            {filteredUsers.length === 0 ? (
              <div className="search-inner">No Results Found..</div>
            ) : (
              filteredUsers.map((user) => (
                <div className="search-inner" onClick={() => openUser(user)}>
                  <img src={user.imageLink} />
                  <p className="name">{user.name}</p>
                </div>
              ))
            )}
          </div>
        )}
    </div>
  )
}