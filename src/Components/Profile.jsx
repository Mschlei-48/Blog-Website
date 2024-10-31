import {useState} from 'react'
import NavBar from './Navbar';

function Profile(){
    return(
        <div className="profile-main-content">
             {<NavBar/>}
            <h1>Profile</h1>
        </div>
    )
}

export default Profile;