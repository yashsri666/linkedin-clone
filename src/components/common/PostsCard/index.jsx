import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getAllUsers, deletePost, getConnections } from '../../../API/FirestoreAPI'
import LikeButton from '../LikeButton';
import { BsPencil, BsTrash } from 'react-icons/bs'
import { Button, Modal } from "antd";
import './index.scss'

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setIsConnected);
  }, [currentUser.id, posts.userID]);

  return isConnected || currentUser.id === posts.userID ? (
    <div className='posts-card' key={id}>
      <div className='post-image-wrapper'>
        {currentUser.id === posts.userID ? (
        <div className='action-container'>
          <BsPencil
          className='action-icon'
          onClick={() => getEditData(posts)}
          />
          <BsTrash
          className='action-icon'
          onClick={() => deletePost(posts.id)}
          />
        </div>
        ) : (
          <></>
        )}
        <img
            alt="profile-image"
            className="profile-image"
            src={
              allUsers
                .filter((item) => item.id === posts.userID)
                .map((item) => item.imageLink)[0]
            }
          />
      <div>
        <p
          className="name"
          onClick = { () =>
            navigate("/profile", {
              state: { id: posts?.userID, email: posts.userEmail },
            })
          }
        >
          {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
        </p>
        <p className="headline">
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
        </p>
        <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>

      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      ) : (
        <></>
      )}

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
