import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  where,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

let dbRef = collection(firestore, "posts");
let usersRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");

export const postStatus = (object) => {
    addDoc(dbRef, object)
    .then(() => {
        toast.success("Status Posted Successfully!");
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getStatus = (setAllStatus) => {
    const q = query(dbRef, orderBy("timeStamp"));
    onSnapshot(q, (response) => {
        setAllStatus(response.docs.map((docs) => {
            return { ...docs.data(), id: docs.id }
        })
        )
    })
}

export const postUserData = (object) => {
    addDoc(usersRef, object)
    .then(() => {
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(usersRef, (response) => {
      setCurrentUser(
        response.docs
          .map((docs) => {
            return { ...docs.data(), id: docs.id };
          })
          .filter((item) => {
            return item.email === localStorage.getItem("userEmail");
          })[0]
      );
    });
  };

export const editProfile = (userID, payload) => {
  let userToEdit = doc(usersRef, userID);

  updateDoc(userToEdit, payload)
  .then(() => {
    toast.success("Profile Updated Successfully!");
  })
  .catch((err) => {
      console.log(err);
  })
}

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(dbRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(usersRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(usersRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const likePost = (userID, postID, liked) => {
  try{
    let docToLike = doc(likeRef, `${userID}_${postID}`);
    if(liked){
      deleteDoc(docToLike);
    }
    else{
      setDoc(docToLike, { userID, postID });
    }
  }
  catch(err){
    console.log(err);
  }
}

export const getLikesByUser = (userID, postID, setLiked, setLikesCount) => {
  try{
    let likeQuery = query(likeRef, where('postID', '==', postID));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data())
      let likesCount = likes.length;

      const isLiked = likes.some((like) => like.userID === userID);

      setLikesCount(likesCount);
      setLiked(isLiked);
    })
  }catch(err){
    console.log(err);
  }
};

export const postComment = (postID, comment, timeStamp, name) => {
  try{
    addDoc(commentsRef, { postID, comment, timeStamp, name })
  }
  catch(err){
    console.log(err);
  }
};

export const getComments = (postID, setComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postID", "==", postID));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, status, postImage) => {
  let docToUpdate = doc(dbRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    toast.success("Post has been updated!");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(dbRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been deleted!");
  } catch (err) {
    console.log(err);
  }
};

export const addConnection = (userId, targetId) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });

    toast.success("Connection Added!");
  } catch (err) {
    console.log(err);
  }
};

export const getConnections = (userId, targetId, setIsConnected) => {
  try {
    let connectionsQuery = query(
      connectionRef,
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.some(
        (connection) => connection.userId === userId
      );

      setIsConnected(isConnected);
    });
  } catch (err) {
    console.log(err);
  }
};