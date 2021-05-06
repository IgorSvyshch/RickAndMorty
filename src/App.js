import './App.css';
import CharacterCard from './components/CharacterCard/CharacterCard';
import {allCharacters, getCharacterPage, characterFilter} from './services/http'
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import CharacterProfile from './components/CharacterProfile/CharacterProfile'

function App() {
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [choosedId, setChoosedId] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  
  useEffect(() => {
    setLoading(true)
    allCharacters().then((data)=>setCharacterData(data.data)).then(() => setLoading(false))
  },[]);

  const status = [
    { value: '', label: 'Clear'},
    { value: 'alive', label: 'alive' },
    { value: 'dead', label: 'dead' },
    { value: 'unknown', label: 'unknown' }
  ]

  const gender = [
    { value: '', label: 'Clear'},
    { value: 'female', label: 'female' },
    { value: 'male', label: 'male' },
    { value: 'genderless', label: 'genderless' },
    { value: 'unknown', label: 'unknown' }
  ]

  const species = [
    { value: '', label: 'Clear'},
    { value: 'Human', label: 'Human' },
    { value: 'Humanoid', label: 'Humanoid' },
    { value: 'Alien', label: 'Alien' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Robot', label: 'Robot' },
    { value: 'Mythological Creature', label: 'Mythological Creature' },
    { value: 'Poopybutthole', label: 'Poopybutthole' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Disease', label: 'Disease' },
    { value: 'Planet', label: 'Planet' },
    { value: 'unknown', label: 'unknown' }
  ]

  let pageList =  () => {
    let characterCount = characterData.info.count;
    let pageCount = Math.ceil(characterCount/20);
    let pageNumbers = [];
    for (let i = 1; i < pageCount+1 ; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers;
  }
  
  let goToPage = (page) => {
    setCurrentPage(page)
    setLoading(true)
    getCharacterPage(page, genderFilter, statusFilter, speciesFilter).then((data)=>setCharacterData(data.data)).then(() => setLoading(false))

  }

  let genderFilterFunc =(value) => {
    characterFilter(value, statusFilter, speciesFilter).then((data) => setCharacterData(data.data))
    setGenderFilter(value)
    setCurrentPage(1)
  }

  let statusFilterFunc =(value) => {
    characterFilter(genderFilter, value, speciesFilter).then((data) => setCharacterData(data.data))
    setStatusFilter(value)
    setCurrentPage(1)
  }

  let speciesFilterFunc =(value) => {
    characterFilter(genderFilter, statusFilter, value).then((data) => setCharacterData(data.data))
    setSpeciesFilter(value)
    setCurrentPage(1)
  }

  return (
    <div className="App">
      {isProfile ? <div className='back' onClick={() => setIsProfile(false)}>Go back</div> : null}
      <div className='title'>Rick and Morty Characters</div>
      {isProfile ?  <CharacterProfile
        id={choosedId}
      />
      :<><div className='filter'>
        <Select 
          options={gender}
          value={gender.filter(option => option.value === genderFilter)} 
          onChange={(el) => genderFilterFunc(el.value) }
          styles={{width: 100}}
        />
        <Select
          options={status}
          value={status.filter(option => option.value === statusFilter)} 
          onChange={(el) => statusFilterFunc(el.value) }
        />
        <Select
          options={species}
          value={species.filter(option => option.value === speciesFilter)} 
          onChange={(el) => speciesFilterFunc(el.value) }
        />
      </div>
      <div className="CardBlock">   
        {characterData.length === 0 ? null 
          : loading ? null 
          : characterData.results.map((el) => {
            return <CharacterCard 
                      key={el.id} 
                      image={el.image} 
                      name={el.name} 
                      status={el.status} 
                      species={el.species} 
                      gender={el.gender} 
                      location={el.origin.name} 
                      click={() => {
                        setChoosedId(el.id)
                        setIsProfile(true)
                      }}
                    />
        })}
      </div>
      <div className='pagination'>
        {
          characterData.length === 0 ? null
          : pageList().map((el) => {
              if(currentPage === el) {
                return <div key={el} className='page'><b>{el}</b></div>
              }
              return <div key={el} onClick={() => goToPage(el)} className='page'>{el}</div>
          })
        }
      </div>
      </>
      }
    </div>
  );
}

export default App;

