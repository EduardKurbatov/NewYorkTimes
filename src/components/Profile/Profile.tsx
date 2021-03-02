import './Profile.scss';
import fire from '../../fire';
import { useState } from 'react';
import '@firebase/firestore';
interface Props {
	setUser: (value: React.SetStateAction<object>) => void 
}

const Profile = (props: Props) => {
	const {setUser} = props;
	const [userImg, setUserImg] = useState<Blob>();
  // const [imgName, setImgName] = useState<string>('')
	const [disabled, setDisabled] = useState<boolean>(true);
  
	const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
		console.log(typeof file);
		
		if (file) {
      // setImgName(file.name);
      setUserImg(file);
			setDisabled(false);
		}
	};		
    
	const uploadAvatar = async (): Promise<void> => {
    if (userImg) {
			const storageRef = fire.storage().ref();
			const fileRef = storageRef.child(`images/${userImg}>`);
			await fileRef.put(userImg);
			const photoURL: string = await fileRef.getDownloadURL();
			setUser({photoURL});
			const currentUser = fire.auth().currentUser;
			currentUser?.updateProfile({photoURL}).then(() => {				
				setUser(currentUser);
			})
		}
	};  

  return (
		<div className="profile-page">
				<input type = "file" onChange={onFileUpload}/>
				<button onClick={uploadAvatar} disabled={disabled}>Upload</button>
		</div>
  )
}

export default Profile
