import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './profile.css';
import { SearchByTitle, MovieCardByTitle, SearchByIdWithCardWatchlist, SearchByIdWithCard } from '../search/searchMovie';
import { userInfo } from '../register/signals';
import { useParams } from 'react-router-dom';
import { Header } from "../header/Header";
import { Footer } from '../footer/footer';


function Profile(){
  return (
    <div className='profile'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  return (
    <div className='profile-container'>
      <Information />
      <Content />
    </div>
  );
}


function Information() {

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [profile, setProfile] = useState([]);
  const { username } = useParams();


  useEffect(() => {
    async function fetchData() {
      try {
        const getProfRes = await axios.get('/profile/getProfile/' + username);
        console.log('Response data:', getProfRes.data);
        setProfile(getProfRes.data);
        console.log(profile);
      } catch (error) {
        setProfile('loading');
        console.error(error);
      }
    }
    fetchData();
  }, [username]);

  const handleEditTitle = () => {
    console.log(userInfo.value?.private + username)
    if (userInfo.value?.private === username) {
      setIsEditingTitle(true);
    } else {
      window.alert('You need to login to edit your profile!');
    }
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSubmitTitle = async () => {
    try {
      const personId = profile[0].person_idperson;
      console.log(personId);
      await axios.put('/profile/updateTitle', {
        profiletitle: newTitle,
        person_idperson: personId,
      });

      setProfile((prevProfile) => [
        {
          ...prevProfile[0],
          profiletitle: newTitle,
        },
      ]);

      setIsEditingTitle(false);

    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleEditDesc = () => {
    console.log(userInfo.value?.private + username)
    if (userInfo.value?.private === username) {
      setIsEditingDesc(true);
    } else {
      window.alert('You need to login to edit your profile!');
    }
  };

  const handleDescChange = (e) => {
    setNewDesc(e.target.value);
  };

  const handleSubmitDesc = async () => {
    try {
      const personId = profile[0].person_idperson;

      await axios.put('/profile/updateDescription', {
        description: newDesc,
        person_idperson: personId,
      });

      setProfile((prevProfile) => [
        {
          ...prevProfile[0],
          description: newDesc,
        },
      ]);

      setIsEditingDesc(false);

    } catch (error) {
      console.error('Error updating description:', error);
    }
  };
  
  return(   
  
    <div className='information'>  

      {profile.map((profinf) => (
        <div class="info-container" key={profinf.idprofile}>
          <div class="profile-title-edit">
            {isEditingTitle ? (
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter new title"
                />
                <button onClick={handleSubmitTitle}>Submit</button>
              </div>
            ) : (
              <div class='profile-title-container'>
                <h1>{profinf.profiletitle}</h1>
                {userInfo.value?.private === username && <img src='/assets/edit-icon.png' onClick={handleEditTitle} alt="editbutton" />}
              </div>
            )}
          </div>
          <div class="profile-desc-edit">
            {isEditingDesc ? (
              <div>
                <input
                  type="text"
                  value={newDesc}
                  onChange={handleDescChange}
                  placeholder="Enter new description"
                />
                <button onClick={handleSubmitDesc}>Submit</button>
              </div>
            ) : (
              <div class='profile-desc-container'>
                <div className='profile-desc-text'>
                  {profinf.description}
                  {userInfo.value?.private == username && <img src='/assets/edit-icon.png' onClick={handleEditDesc} alt="editbutton" />}
                </div>
                
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


function Content() {
  const [contentType, setContentType] = useState('ratings');
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [newRating, setNewRating] = useState('');
  const [newRatingtext, setNewRatingtext] = useState('');
  const [ratings, setRatings] = useState([]);
  const { username } = useParams();
  const [rating, setRating] = useState([]);
  const [idRated, setIdRated] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);
  const [personId, setPersonId] = useState(0);
  const [groupData, setGroupData] = useState([]);

  
  const handleEditRating = (id) => {
    setIdRated(id);
    setExpandedCard((prevId) => (prevId === id ? null : id));
    console.log('id', id);
    console.log(userInfo.value?.private + username);
    if (userInfo?.value?.private === username) {
      setIsEditingRating(true);
    } else {
      window.alert('You need to login to edit the rating!');
    }
  };

  const handleRatingChange = (e) => {
    setNewRating(e.target.value);
  };

  const handleRatinTextChange = (e) => {
    setNewRatingtext(e.target.value);
  };

  const handleToggle = (type) => {
    setContentType(type);
  };

  function handleDeleteRating(id){
    setIdRated(id);
    if(userInfo.value?.private === username) {
      axios.post("/rating/deleteid", {
      idrated: id
    })
      .then((resp)=>{
      console.log(resp.data);
      window.location.reload();
    })
      .catch((error) => {
        console.log(error.response.data);
      });
    } else {
      window.alert('You need to login to delete!');
    }
  }

  const handleSubmitRating = async () => {
    try {
      console.log('id, rating, ratingtext', idRated, newRating, newRatingtext);
      await axios.put('/rating/update', {
        rating: newRating,
        ratingtext: newRatingtext,
        idrated: idRated,
      });

      setRating((prevRating) => [
        {
          ...prevRating[0],
          rating: newRating,
          ratingtext: newRatingtext,
        },
      ]);
      setIsEditingRating(false);
      setExpandedCard(null);
    } catch (error) {
      console.error('Error updating the rating:', error);
    }
  };

  const handlePeruutaRating = () => {
    setExpandedCard(null);
  };

  const SearchResultByTitle = SearchByTitle('lord of the rings'); 

  useEffect(() => {
    async function fetchDataRatings() {
      try {
        const response = await axios.get(`/rating/getrating?username=${username}`);
        setRatings(response.data);
      } catch (error) {
        setRatings('loading');
        console.error(error);
      }
    }

    fetchDataRatings();
  }, [username]);


  useEffect(() => {
    async function fetchData() {
      try {
        const getProfRes = await axios.get('/profile/getProfile/' + username);
        console.log('Response data:', getProfRes.data[0].person_idperson);
        setPersonId(getProfRes.data[0].person_idperson);
      } catch (error) {
        setPersonId('loading');
        console.error(error);
      }
    }
    fetchData();
  }, [username]);


  useEffect(() => {
    async function fetchData() {
      try {
        console.log(personId);
        const responseInfo = await axios.get('/groups/getGroupById', {
          params: {
            person_idperson: personId
          },
        });
        console.log('Response data:', responseInfo.data);
        setGroupData(responseInfo.data);
      } catch (error) {
        setGroupData('loading');
        console.error(error);
      }
    }
    fetchData();
  }, [personId]);


  return (
    <div className='content'>
      <div className='content-nav'>
        <button className='content-btn' onClick={() => handleToggle('ratings')}>Movie Ratings</button>
        <button className='content-btn' onClick={() => handleToggle('watchlist')}>Watch List</button>
        <button className='content-btn' onClick={() => handleToggle('groups')}>Groups</button>
      </div>

      <div>
        {contentType === 'ratings' && (
          <div className='ratings-container'>
            <h2>Movie Ratings</h2>
            {Array.isArray(ratings) ? (
              ratings.map((rating) => (
                <div className='movie-rating-card' key={rating.idrated}>
                  <div>
                    <SearchByIdWithCard movieId={rating.idmovie} />
                  </div>
                  <div
                    className={`movie-rating-container ${expandedCard === rating.idrated ? 'expanded' : ''}`}
                    key={rating.idrated}
                  >
                    {expandedCard === rating.idrated ? (
                      <div>
                        <div className='content'>
                          <input
                          className='textarea'
                            type='number'
                            value={newRating}
                            onChange={handleRatingChange}
                            placeholder='Enter new rating'
                          />
                          
                        </div>
                        <div className='content'>
                        <textarea
                          className='textarea'
                            type='form'
                            rows='10'
                            value={newRatingtext}
                            onChange={handleRatinTextChange}
                            placeholder='Enter new rating text'
                          />
                        </div>
                        <button class='add-rating-btn' onClick={handleSubmitRating}>Muokkaa</button>
                        <button class='add-rating-btn' onClick={handlePeruutaRating}>Peruuta</button>
                      </div>
                    ) : (
                      <div className='movie-rating'>
                        <p><strong>My Rating: </strong>{rating.rating}</p>
                        <p><strong>Date: </strong>{new Date(rating.ratingdate).toLocaleString()}</p>
                        <p>{rating.ratingtext}</p>
                      </div>
                    )}
                    <button className='edit-rating-btn' onClick={() => handleEditRating(rating.idrated)}>Muokkaa arvostelua</button>
                    <button className='edit-rating-btn'onClick={() => handleDeleteRating(rating.idrated)}>Poista arvostelu</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}

        {contentType === 'watchlist' && (
          <div className='watchlist-container'>
            <h2>Watch List</h2>
            <Watchlist />
          </div>
        )}

        {contentType === 'groups' && (
          <div>
            <h2>Groups</h2>
            <div className='groups-container'>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Watchlist() {

  const [watchlist, setWatchlist] = useState([]);
  const { username } = useParams();
  const uName = username;

  useEffect(() => {

    async function fetchDataRatings() {
      try {
        //const uName = userInfo.value.private;
        const response = await axios.get(`/profile/getWatchlist/` + username);

        if (response.data[0]?.watchlist && response.data[0].watchlist.length > 0) {
          setWatchlist(response.data[0].watchlist);
          console.log(response.data[0].watchlist);
        } else {
          // Handle the case when the watchlist is empty
          console.log('Watchlist is empty');
        }
      } catch (error) {
        setWatchlist('loading');
        console.error(error);
      }
    }

    fetchDataRatings();
  }, [username]);

  return (
    <div>
      <div class="watchlist">
        {watchlist.length > 0 ? (
          watchlist.map((movieId) => (
            <div key={movieId}>
              <SearchByIdWithCardWatchlist movieId={movieId} uName={uName} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;


