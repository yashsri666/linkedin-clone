import React, { useMemo, useState } from 'react'
import { likePost, getLikesByUser, postComment, getComments } from '../../../API/FirestoreAPI'
import { getCurrentTime } from '../../../helpers/useMoment'
import './index.scss'
import { AiOutlineLike, AiFillLike, AiOutlineComment } from 'react-icons/ai'

export default function LikeButton( {userID, postID, currentUser} ) {
    const [likesCount, setLikesCount] = useState(0);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const handleLike = () => {
        likePost(userID, postID, liked)
    };

    const getComment = (event) => {
      setComment(event.target.value);
    };

    const addComment = () => {
      postComment(postID, comment, getCurrentTime('LLL'), currentUser?.name);
      setComment("");
    };

    useMemo(() => {
        getLikesByUser(userID, postID, setLiked, setLikesCount);
        getComments(postID, setComments);
    }, [userID, postID]);

  return (
    <div className='like-container'>

          <p>{likesCount} people liked this post </p>

      <div className='hr-line'>
        <hr />
      </div>

      <div className='like-comment'>
        <div className='likes-comment-inner' onClick={handleLike}>
          {liked ?
          <AiFillLike size={30} color='#004c75' /> :
          <AiOutlineLike size={30}
          />}
          <p className={liked ? 'blue' : 'black'}>Like</p>
        </div>

        <div className='likes-comment-inner'
        onClick={() => setShowCommentBox(!showCommentBox)}>
          {<AiOutlineComment size={30}
          color={showCommentBox ? '#004c75' : 'black'}
          />}
          <p className={showCommentBox ? 'blue' : 'black'}>Comment</p>
        </div>
      </div>

      {showCommentBox ? (
      <>
        <input
          onChange={getComment}
          className='comment-input'
          placeholder=' Write a comment...'
          name='comment'
          value={comment}
        />
        <button
        onClick={addComment}
        className='add-comment-btn'>
          Add Comment
        </button>

        {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="all-comments">
                  <p className="name">{comment.name}</p>
                  <p className="comment">{comment.comment}</p>
                  <p className="timestamp">{comment.timeStamp}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
