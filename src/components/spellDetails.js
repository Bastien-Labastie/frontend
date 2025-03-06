import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './spellDetails.css';

const API_URL = 'https://www.dnd5eapi.co/api/spells/';

const SpellDetails = () => {
  const [spell, setSpell] = useState(null);  
  const { id } = useParams();  
  const history = useHistory(); 

  console.log("Fetching spell details for ID:", id);
  
  useEffect(() => {
    // Fetch spell details using the spell index
    axios.get(`${API_URL}${id}`)
      .then((res) => {
        setSpell(res.data);  
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Function to go back to the previous page
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="spell-details-container">
      {spell ? (
        <div className="spell-details-content">
          <div className="spell-details-header">
            <h2 className="title">{spell.name}</h2>
            <p className="level">Level: {spell.level}</p>
            <p className="school">School: {spell.school?.name}</p>
          </div>
          <div className="spell-details-info">
            <div className="spell-details-section">
              <h2>Description</h2>
              <p className="description">{spell.desc}</p>
            </div>
            <div className="spell-details-section">
              <h2>Components</h2>
              <p>{spell.components?.join(", ")}</p>
            </div>
            <div className="spell-details-section">
              <h2>Range</h2>
              <p>{spell.range}</p>
            </div>
            <div className="spell-details-section">
              <h2>Duration</h2>
              <p>{spell.duration}</p>
            </div>
            <button className="go-back-button" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <p>Loading spell details...</p>
      )}
    </div>
  );
};

export default SpellDetails;