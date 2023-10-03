import React, { useState } from 'react'
import './index.scss'
import { AiOutlineClose } from 'react-icons/ai';
import { editProfile } from '../../../API/FirestoreAPI';

export default function ProfileEdit({ onEdit, currentUser }) {
    const [editInputs, setEditInputs] = useState(currentUser);
    const getInput = (event) => {
        let { name, value } = event.target;
        let input = { [name]: value };
        setEditInputs({...editInputs, ...input});
    };

    const updateProfileData = async () => {
        await editProfile(currentUser.id, editInputs);
        await onEdit();
    }

  return (
    <div className='profile-card'>
        <div>
            <AiOutlineClose className='close-btn' onClick={onEdit} size={25} />
        </div>

            <div className='profile-edit-inputs'>

            <label>Name</label>
            <input
            onChange={getInput}
            className='common-input'
            placeholder='Name'
            name='name'
            value={editInputs.name} />

            <label>Headline</label>
            <input
            onChange={getInput}
            className='common-input'
            placeholder='Headline'
            name='headline'
            value={editInputs.headline} />

            <label>Country</label>
            <input
            onChange={getInput}
            className='common-input'
            placeholder='Country'
            name='country'
            value={editInputs.country} />

            <label>City</label>
            <input
            onChange={getInput}
            className='common-input'
            placeholder='City'
            name='city'
            value={editInputs.city} />

            <label>Company</label>
            <input
            onChange={getInput}
            className='common-input'
            placeholder='Company'
            name='company'
            value={editInputs.company} />

            <label>Industry</label>
            <input
            onChange={getInput}
            className='common-input'
            placeholder='Industry'
            name='industry'
            value={editInputs.industry} />

            <label>College</label>
            <input
            onChange={getInput}
            className='common-input'
            placeholder='College'
            name='college'
            value={editInputs.college} />

            <label>Website</label>
            <input
            onChange={getInput}
            className='common-input'
            placeholder='Website'
            name='website'
            value={editInputs.website} />

            <label>About me</label>
            <textarea
            onChange={getInput}
            className='common-textarea'
            rows={4}
            placeholder='Brief description'
            name='aboutMe'
            value={editInputs.aboutMe} />

            <label>Skills</label>
            <input
            onChange={getInput}
            className='common-input'
            placeholder='Skills'
            name='skills'
            value={editInputs.skills} />

            <div className='save-btn-container'>
            <button className='save-btn' onClick={updateProfileData}>Save</button>
            </div>

        </div>
    </div>
  )
}
