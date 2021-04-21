import './Profile.scss';
import fire from '../../fire';
import { useState } from 'react';
import '@firebase/storage';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Redirect } from 'react-router';

type Props = {
  user: any,
  setUser: (value: React.SetStateAction<any>) => void
};

const ALLOWED_TYPES = ['image/png' ,'image/jpg' ,'image/jpeg'];

const Profile = ({setUser, user}: Props) => {
  const [userImg, setUserImg] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [previewError, setPreviewError] = useState<boolean>(false);
  const [cropper, setCropper] = useState<Cropper>();

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    const isFileValid = file && ALLOWED_TYPES.includes(file.type);

    if (isFileValid) {
      const reader = new FileReader();
      reader.onloadend = (() => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(file as Blob);
      setUserImg(file);
    }

    setPreviewError(!isFileValid);

    e.target.value = '';
  };

  const getCropData = () => {
    cropper?.getCroppedCanvas().toBlob(uploadAvatar);
  };

  const uploadAvatar: BlobCallback = async (blob: Blob | null): Promise<void> => {
    if (blob) {
      const storageRef = fire.storage().ref();
      const fileRef = storageRef.child(`images/${userImg?.name}>`);
      await fileRef.put(blob);
      const photoURL: string = await fileRef.getDownloadURL();
      setUser({photoURL});
      const currentUser = fire.auth().currentUser;
      await currentUser?.updateProfile({photoURL});
      setUser(currentUser);
      setImagePreview(null);
      setUserImg(undefined);
    }
  };

  return user 
    ? (<div className="profile-page">
        <div className="file-upload-wrapper">
          <div className="file-upload">
            <input className="file-input" type="file" onChange={onFileUpload}/>
            <button className="add-file-btn">Add File</button>
          </div>
          <button className="change-avatar-btn" onClick={getCropData} disabled={!userImg}>Change Avatar</button>
        </div>
        {previewError && <span className="preview-error">Format of this file is not supported</span>}
        <div className="preview-container">
          {imagePreview 
            ? (
              <Cropper
                aspectRatio={1}
                src={imagePreview.toString()}
                viewMode={3}
                background={true}
                autoCropArea={0.3}
                center={false}
                responsive={true}
                restore={true}
                onInitialized={(cropper) => {setCropper(cropper);}}
              />
          ) : (<span className="preview-text">Upload The Image</span>)
          }
        </div>
      </div>)
    : <Redirect to="/sign" />
};

export default Profile;
