import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";


function ProfileUpdatePage() {
  const {currentUser, updateUser} = useContext(AuthContext)
  const [successText, setSuccessText] = useState(null)
const [avatar, setAvatar] = useState(currentUser.avatar)



  const handleSubmit = async(e) => {
    e.preventDefault()
    setSuccessText(``);
    const formData = new FormData(e.target)
    const {username, email, password}  = Object.fromEntries(formData)
    // console.log(currentUser);
      try {
        const res = await apiRequest.put(`/users/${currentUser?.id}`, {
          username, email, password, avatar
        })
        updateUser(res.data.rest)
        console.log(res.data.rest);
        setSuccessText(res.data.message)
      } catch (error) {
        console.log(error);
      }
      // 2:07
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit} >
          <h1>Update Profile</h1>
          {successText &&  <p className="success-text" >{successText}</p>}
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser?.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser?.email}

            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar || "/noavatar.jpg"}alt="" className="avatar" />
      <UploadWidget uwConfig={{
        cloudName: 'dgnexvagt',
        uploadPreset: "estate",
        multiple: false,
        maxImageFileSize: 2000000,
        folders: "avatars"
      }} 
      setAvatar = {setAvatar}
      />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
