import './Profile.scss';
import fire from '../../fire';
import { useState } from 'react';
import '@firebase/storage';

interface Props {
  setUser: (value: React.SetStateAction<any>) => void,
}

const Profile = ({setUser}: Props) => {
  const [userImg, setUserImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [previewError, setPreviewError] = useState<boolean>(false);
  const ALLOWED_TYPES = ['image/png' ,'image/jpg' ,'image/jpeg'];

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && ALLOWED_TYPES.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = (() => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(file);
      setUserImg(file);
      setPreviewError(false);
    } else {
      setPreviewError(true);
    };
  };

  const uploadAvatar = async (): Promise<void> => {
    if (userImg) {
      const storageRef = fire.storage().ref();
      const fileRef = storageRef.child(`images/${userImg.name}>`);
      await fileRef.put(userImg);
      const photoURL: string = await fileRef.getDownloadURL();
      setUser({photoURL});
      const currentUser = fire.auth().currentUser;
      await currentUser?.updateProfile({photoURL});
      setUser(currentUser);
    };
  };

  return (
    <div className="profile-page">
      <div className="file-upload">
        <input type = "file" onChange={onFileUpload}/>
        <button onClick={uploadAvatar} disabled={!userImg}>Upload</button>
      </div>
      {previewError && <span className="preview-error">Format of this file is not supported</span>}
      <div className="preview-container">
        {imagePreview 
          ? (
          <img className="preview-image" src={imagePreview?.toString()} alt="img-preview"></img>
        ) : (
          <span className="preview-text">Upload The Image</span>
        )}
      </div>
    </div>
  )
}

export default Profile;
