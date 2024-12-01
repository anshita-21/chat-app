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
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState(""); 
  const { setUserData } = useContext(AppContext);

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!name || !bio) {
        toast.error("Please enter both name and bio.");
        return;
      }

      const updateData = {};

      if (image) {
        const imageUrl = URL.createObjectURL(image); 
        setPrevImage(imageUrl);
        updateData.avatar = imageUrl; 
      }

      updateData.name = name;
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.data().name) setName(docSnap.data().name);
        if (docSnap.data().bio) setBio(docSnap.data().bio);
        if (docSnap.data().avatar) setPrevImage(docSnap.data().avatar);
      } else {
        navigate('/');
      }
    });
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
            <p>Upload profile image</p>
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your name"
            required
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write your bio"
            required
          ></textarea>

          <button type="submit">Save</button>
        </form>

        <img
          className="profile-pic"
          src={image ? URL.createObjectURL(image) : prevImage || assets.logo_icon}
          alt="Profile Preview"
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
