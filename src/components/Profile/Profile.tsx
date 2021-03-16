import './Profile.scss';
import fire from '../../fire';
import { useState } from 'react';
import '@firebase/storage';
interface Props {
	setUser: (value: React.SetStateAction<object>) => void,
}

const Profile = (props: Props) => {
	const {setUser} = props;
	const [userImg, setUserImg] = useState<Blob | null>(null);
  	const [imgName, setImgName] = useState<string>('')
	const [disabled, setDisabled] = useState<boolean>(true);
	const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);	
 	const [previewError, setPreviewError] = useState<Boolean>(false);
	
	const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(imagePreview);
		const file = e.target.files?.[0];
		const ALLOWED_TYPES = ['image/png' ,'image/jpg' ,'image/jpeg'];
		if (file && ALLOWED_TYPES.includes(file.type)) {
			const reader = new FileReader();
			reader.onloadend = (() => {
				setImagePreview(reader.result);			
			});
			reader.readAsDataURL(file);
			setImgName(file.name);
			setUserImg(file);
			setDisabled(false);
      setPreviewError(false);
		} else {
			setDisabled(true);
			setPreviewError(true);
		};
	};
	
	
	const uploadAvatar = async (): Promise<void> => {
		if (userImg) {
			const storageRef = fire.storage().ref();
			const fileRef = storageRef.child(`images/${imgName}>`);
			await fileRef.put(userImg);
			const photoURL: string = await fileRef.getDownloadURL();
			setUser({photoURL});
			const currentUser = fire.auth().currentUser;
			currentUser?.updateProfile({photoURL}).then(() => {				
				setUser(currentUser);
			})
		};
	};  
  return (
		<div className="profile-page">
      <div className="file-upload">
        <input type = "file" onChange={onFileUpload}/>
        <button onClick={uploadAvatar} disabled={disabled}>Upload</button>
      </div>
      {previewError ? <span className="preview-error">Format of this file is not supported</span> : null}
      <div className="preview-container">
        {imagePreview ? (
          <img className="preview-image" src={imagePreview?.toString()} alt="img-preview"></img>
        ) : (
          <span className="preview-text">Upload The Image</span>
        )}
      </div>
		</div>
  )
}

export default Profile
