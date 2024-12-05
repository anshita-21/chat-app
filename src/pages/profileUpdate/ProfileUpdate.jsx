import React, { useContext, useEffect, useState } from 'react';
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null); 
  const [username, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState(""); 
  const { setUserData } = useContext(AppContext);

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!username || !bio) {
        toast.error("Please enter both name and bio.");
        return;
      }

      const updateData = {};

      if (image) {
        const imageUrl = URL.createObjectURL(image); 
        setPrevImage(imageUrl);
        updateData.avatar = imageUrl; 
      }

      updateData.username = username;
      updateData.bio = bio;

      if (Object.keys(updateData).length === 0) {
        toast.error('No profile data to update');
        return;
      }

      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, updateData);

      const snap = await getDoc(docRef);
      setUserData(snap.data());

      navigate('/chat');
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating your profile.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUid(user.uid);

          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("Fetched user data:", userData);  

            if (userData.username) setName(userData.username);  
            if (userData.bio) setBio(userData.bio);  
            if (userData.avatar) setPrevImage(userData.avatar);  
          }
        } else {
          navigate('/');  
        }
      });
    };
    fetchUserData();
  }, [navigate]);

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile details</h3>

          <label htmlFor="avatar">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : prevImage || assets.avatar_icon}
              alt="Profile Avatar"
            />
            {/* <p>Upload profile image</p> */}
          </label>

          {/* Name input */}
          <input
            onChange={(e) => setName(e.target.value)}
            value={username}
            placeholder="Your name"
            required
          />

          {/* Bio textarea */}
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write your bio"
            required
          ></textarea>

          <button type="submit">Save</button>
        </form>

        {/* Profile preview image */}
        <img
          className="profile-pic"
          src={image ? URL.createObjectURL(image) : prevImage || assets.avatar_icon}
          alt="Profile Preview"
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
