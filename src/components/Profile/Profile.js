import './Profile.scss';
import fire from '../../fire';
import { useState } from 'react';
import '@firebase/firestore';

function Profile(props) {
	const {user, setUser} = props;
	const [userImg, setUserImg] = useState({});
	const [disabled, setDisabled] = useState(true);

	const  handleChange = (e) => {
		let file = e.target.files[0];
		if(file) {
			setUserImg(file);
			setDisabled(false);
		}
	};		

	const onFileChange = async (e) => {
		if (userImg) {
			const storageRef = fire.storage().ref();
			const fileRef = storageRef.child(`images/${userImg.name}`);
			await fileRef.put(userImg);
			const photoURL = await fileRef.getDownloadURL()
			setUser(await fileRef.getDownloadURL());
			user.updateProfile({photoURL}).then(() => {
				setUser(fire.auth().currentUser);
			})
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
