import './Profile.scss';
import fire from '../../fire';
import React, { useState } from 'react';
import '@firebase/storage';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
interface Props {
  user: any,
  setUser: (value: React.SetStateAction<any>) => void
};

const Profile = ({setUser}: Props) => {
  const [userImg, setUserImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [previewError, setPreviewError] = useState<boolean>(false);
  const ALLOWED_TYPES = ['image/png' ,'image/jpg' ,'image/jpeg'];
  const [cropper, setCropper] = useState<any>();
  
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
    }

    e.target.value = '';
  };

  const getCropData = () => {
    cropper.getCroppedCanvas().toBlob((blob: Blob) => {
      uploadAvatar(blob);
    });
  };

  const uploadAvatar = async (blob: Blob): Promise<void> => {
    const storageRef = fire.storage().ref();
    const fileRef = storageRef.child(`images/${userImg?.name}>`);
    await fileRef.put(blob);
    const photoURL: string = await fileRef.getDownloadURL();
    setUser({photoURL});
    const currentUser = fire.auth().currentUser;
    await currentUser?.updateProfile({photoURL});
    setUser(currentUser);
    setImagePreview(null);
    setUserImg(null);
  };

  return (
    <div className="profile-page">
      <div className="file-upload-wrapper">
        <div className="file-upload">
          <input className="file-input" type="file" onChange={onFileUpload}/>
          <button className="add-file-btn">Add File</button>
        </div>
        <button className="change-avatar-btn" onClick={getCropData} disabled={!userImg}>Change Avatar</button>
      </div>
      {previewError && <span className="preview-error">Format of this file is not supported</span>}
      <div className="preview-container">
        {imagePreview ?(
          <Cropper
            zoomTo={0}
            initialAspectRatio={1}
            preview=".img-preview"
            src={imagePreview.toString()}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(cropper) => {setCropper(cropper);}}
          />
          ) : (<span className="preview-text">Upload The Image</span>)
        }
      </div>
    </div>
  )
}

export default Profile;
