import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const { currentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    currentUser && (
      <div className="profilePage">
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <button>
                <Link to="/profile/update">Update Profile</Link>
              </button>
            </div>
            <div className="info">
              <span>
                Avatar:
                <img
                  src={currentUser?.avatar || "./noavatar.jpg"}
                  alt=""
                />
              </span>
              <span>
                Username: <b>{currentUser?.username}</b>
              </span>
              <span>
                E-mail: <b>{currentUser?.userInfo?.email}</b>
              </span>
              <button onClick={handleLogout}>Log Out</button>
            </div>
            <div className="title">
              <h1>My List</h1>
              <Link to="/post/create" >
              <button>Create New Post</button>
              </Link>
            </div>
            <List />
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List />
          </div>
        </div>
        <div className="chatContainer">
          <div className="wrapper">
            <Chat />
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
