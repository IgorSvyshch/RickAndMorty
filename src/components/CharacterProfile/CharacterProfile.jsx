import '../../App.css';
import {characterChoosenProfile} from '../../services/http';
import React, { useState, useEffect } from 'react';

function CharacterProfile(props) {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        characterChoosenProfile(props.id).then((data) => setProfile(data.data))
      },[]);
    console.log(profile)
    return (
      <div className="CharacterProfile">
        {profile.length === 0 ? null :
        <>
            <div className="CharacterImg">
                <img src={profile.image} alt=""/>
            </div>
            <div>
                Name: {profile.name}
            </div>
            <div>
                Status: {profile.status}
            </div>
            <div>
                Species: {profile.species}
            </div>
            <div>
                Gender: {profile.gender}
            </div>
            <div>
                Origin: {profile.origin.name}
            </div>
            <div>
                Location: {profile.location.name}
            </div>
        </>}

      </div>

    );
  }
  
  export default CharacterProfile;
  