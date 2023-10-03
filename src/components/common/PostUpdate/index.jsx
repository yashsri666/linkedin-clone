import React, { useState, useMemo, useEffect } from 'react'
import './index.scss'
import { postStatus, getStatus, updatePost } from '../../../API/FirestoreAPI';
import PostsCard from '../PostsCard';
import { getCurrentTime } from '../../../helpers/useMoment';
import { getUniqueID } from '../../../helpers/getUniqueID';
import { uploadPostImage } from '../../../API/ImageUpload';
import ModalComponent from '../Modal'

export default function PostStatus( { currentUser } ) {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [allStatuses, setAllStatus] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [postImage, setPostImage] = useState("");

    const sendStatus = async () => {
      let object = {
        status: status,
        timeStamp: getCurrentTime('LLL'),
        userEmail: currentUser.email,
        userName: currentUser.name,
        userID: currentUser.id,
        postID: getUniqueID(),
        postImage: postImage,
      };
      await postStatus(object);
      await setModalOpen(false);
      setIsEdit(false);
      await setStatus("");
    };

    const getEditData = (posts) => {
      setModalOpen(true);
      setStatus(posts?.status);
      setCurrentPost(posts);
      setIsEdit(true);
    };

    const updateStatus = () => {
      updatePost(currentPost.id, status, postImage);
      setModalOpen(false);
    }

    useMemo(() => {
      getStatus(setAllStatus);
    }, []);




  return (
    <div className='post-status-main'>
      <div className='user-details'>
        <img src={currentUser?.imageLink} alt="imageLink" />
        <p className="name">{currentUser?.name}</p>
        <p className="headline">{currentUser?.headline}</p>
      </div>
      <div className='post-status'>
        <img
          className="post-image"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <button
        className='open-post-modal'
        onClick={() => {
          setIsEdit(false);
          setModalOpen(true);}}>
            Start a Post
        </button>
      </div>
      <ModalComponent
      setStatus={setStatus}
      status={status}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      sendStatus={sendStatus}
      isEdit={isEdit}
      updateStatus={updateStatus}
      uploadPostImage={uploadPostImage}
      setCurrentPost={setCurrentPost}
      currentPost={currentPost}
      postImage={postImage}
      setPostImage={setPostImage} />

      <div>
      {allStatuses.map((posts) => {
        return (
        <div key={posts.id}>
          <PostsCard posts={posts} getEditData={getEditData} />
          </div>
        );
      })}
      </div>
    </div>
  )
}
