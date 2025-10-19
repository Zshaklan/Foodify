import "./Profile.css";
import userLogo from "../../assets/user.svg";
import { useContext } from "react";
import { UserProgressContext } from "../../store/UserProgressContext.jsx";
import Button from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx";
import EditProfile from "./EditProfile.jsx";

const Profile = () => {
  const { currentUser, progress, showEditProfile, hideEditProfile } =
    useContext(UserProgressContext);

  function handleClose() {
    hideEditProfile();
  }

  return (
    <>
      <Modal open={progress === "profile"} onClose={handleClose}>
        <EditProfile onClose={handleClose} />
      </Modal>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-img">
            <img src={currentUser.imageUrl || userLogo} alt="User" />
          </div>

          <div className="profile-details">
            <h1>User Details</h1>

            <div className="profile-details-row">
              <p className="title">Username:</p>
              <p className="value">{currentUser.fullName}</p>
            </div>

            <div className="profile-details-row">
              <p className="title">Email:</p>
              <p className="value">{currentUser.email}</p>
            </div>

            <div className="profile-details-row">
              <p className="title">Phone:</p>
              <p className="value">{currentUser.phone}</p>
            </div>

            <Button onClick={showEditProfile}>Edit Details</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
