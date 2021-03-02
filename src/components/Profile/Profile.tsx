import './Profile.scss';
import fire from '../../fire';
import { useState } from 'react';
import '@firebase/firestore';

interface Props {
	setUser: (value: React.SetStateAction<object | null>) => void 
	setFileUrl: (value: React.SetStateAction<string | null>) => void 
}

const Profile = (props: Props) => {
	const {setUser, setFileUrl} = props;
	const [userImg, setUserImg] = useState<Blob | Uint8Array | ArrayBuffer>();
	const [disabled, setDisabled] = useState<boolean>(true);


  //also need to assign not "any" type of e(event)

	const  handleChange = (e: any) => {
		let file = e.target.files[0];
		if(file) {
			setUserImg(file);
			setDisabled(false);
		}
	};		

  //also need to assign not "any" type of e(event)

	const onFileChange = async (e: any) => {
		if (userImg) {
			const storageRef = fire.storage().ref();
			const fileRef = storageRef.child(`images/${userImg}>`);

			//it was my code in pre TS version
			// const fileRef = storageRef.child(`images/${userImg.name}>`);

			await fileRef.put(userImg);
			const photoURL = await fileRef.getDownloadURL()
			setUser(await fileRef.getDownloadURL());
			const currentUser = fire.auth().currentUser
			if(currentUser) {
				currentUser.updateProfile({photoURL}).then(() => {
					setUser(currentUser);

      //try to get solution by creating state fileURL with <string> type for paste it into "src" attribute in header component
			    // setFileUrl(currentUser.photoURL);
				})
			}
		}
	};

  return (
		<div className="profile-page">
				<input type = "file" onChange={handleChange}/>
				<button onClick={onFileChange} disabled={disabled}>Upload</button>
		</div>
  )
}

export default Profile
