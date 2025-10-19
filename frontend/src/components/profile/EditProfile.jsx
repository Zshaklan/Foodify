import userLogo from "../../assets/user.svg";
import Button from "../UI/Button";
import { MdModeEditOutline } from "react-icons/md";
import "./Profile.css";
import { useContext, useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { UserProgressContext } from "../../store/UserProgressContext";

const EditProfile = ({ onClose }) => {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { currentUser, setCurrentUser } = useContext(UserProgressContext);
  const fileRef = useRef();
  const formRef = useRef();
  const { sendRequest, data, isLoading, error } = useHttp(
    "http://localhost:5000/api/auth/user/edit",
    { method: "POST" }
  );

  useEffect(() => {
    setPreview(currentUser.imageUrl);
  }, []);

  function onImageEdit() {
    fileRef.current.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData();
    fd.append("fullName", event.target.fullName.value);
    fd.append("email", event.target.email.value);
    fd.append("phone", event.target.phone.value);

    if (imageFile) {
      fd.append("imageFile", imageFile);
    }

    const resData = await sendRequest(fd);

    if (resData?.user) {
      setCurrentUser(resData.user);
    }

    onClose();
    if (formRef.current) formRef.current.reset();
    setImageFile(null);
    setPreview(null);
  }

  return (
    <div className="edit-profile-form">
      <h1>Edit Profile</h1>
      <form ref={formRef} encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="edit-profile-img">
          <img src={preview || userLogo} alt="preview" />
          <MdModeEditOutline
            size={30}
            className="editIcon"
            onClick={onImageEdit}
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </div>
        <div className="control">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            defaultValue={currentUser.fullName}
          />
        </div>

        <div className="control">
          <label>Email</label>
          <input type="email" name="email" defaultValue={currentUser.email} />
        </div>

        <div className="control">
          <label>Phone</label>
          <input type="text" name="phone" defaultValue={currentUser.phone} />
        </div>

        <div className="modal-actions">
          <Button type="button" textOnly onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
