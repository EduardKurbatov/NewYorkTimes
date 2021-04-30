import './Profile.scss';
import fire from '../../fire';
import { useState } from 'react';
import '@firebase/storage';
import Cropper from 'react-cropper';
import firebase from 'firebase';
import 'cropperjs/dist/cropper.css';

type Props = {
  setUser: (value: React.SetStateAction<firebase.User | null>) => void,
};

const ALLOWED_TYPES = ['image/png' ,'image/jpg' ,'image/jpeg', 'image/svg+xml'];

const Profile = ({setUser}: Props) => {
  const [uploadedImageName, setUploadedImageName] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [isUploadedFileValid, setFileValidationStatus] = useState<boolean>(true);
  const [cropper, setCropper] = useState<Cropper>();
  const [loading, setLoadingStatus] = useState<boolean>(false);

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    setFileValidationStatus(Boolean(file && ALLOWED_TYPES.includes(file.type)));

    if (isUploadedFileValid) {
      const reader = new FileReader();
      reader.onloadend = (() => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(file as Blob);
      setUploadedImageName(file?.name); // checking if file is defined, because eslint wants it to be so
    }

    e.target.value = '';
  };

  const croppAndUploadImage = (): void => {
    cropper?.getCroppedCanvas().toBlob(async (blob: Blob | null) => {
      setLoadingStatus(true);

      if (blob) {
        const fileRef = fire.storage().ref().child(`images/${uploadedImageName}>`);

        await fileRef.put(blob);
        setFileValidationStatus(true);

        const photoURL: string = await fileRef.getDownloadURL();

        /* we need to fetch user from firebase here, because after first image upload
          * updateProfile method gets removed from the User object for some reason
        */
        const user: firebase.User | null = firebase.auth().currentUser;

        await user?.updateProfile({photoURL});
        user && setUser({...user, photoURL: user.photoURL});
        setImagePreview(null);
        setUploadedImageName(undefined);
      }

      setLoadingStatus(false);
    });
  };

  return (
    <div className="profile-page">
      {!loading
        ? <>
            <div className="file-upload-wrapper">
              <div className="file-upload">
                <input className="file-input" type="file" onChange={onFileUpload}/>
                <button className="add-file-btn">Choose an image</button>
              </div>
              {imagePreview && <button
                  className="change-avatar-btn" 
                  onClick={croppAndUploadImage}
                >Accept and upload</button>
              }
            </div>
            {!isUploadedFileValid && <span className="preview-error">Format of this file is not supported</span>}
            {imagePreview
              ? <Cropper
                  className="preview-container"
                  aspectRatio={1}
                  src={imagePreview.toString()}
                  viewMode={3}
                  background={true}
                  autoCropArea={0.3}
                  center={false}
                  responsive={true}
                  restore={true}
                  onInitialized={setCropper}
                />
              : <span className="preview-text">Upload The Image</span>
            }
          </>
          // TODO: add loader component here
        : <h2>Uploading image...</h2>
      }
    </div>
  );
};

export default Profile;
