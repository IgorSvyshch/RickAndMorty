import '../../App.css';

function CharacterCard(props) {
    return (
      <div onClick={props.click} className="CharacterCard">
        <div className="CharacterImg">
            <img src={props.image} alt=""/>
        </div>
        <div>
            Name: {props.name}
        </div>
        <div>
            Status: {props.status}
        </div>
        <div>
            Species: {props.species}
        </div>
        <div>
            Gender: {props.gender}
        </div>
        <div>
            Origin: {props.location}
        </div>
      </div>

    );
  }
  
  export default CharacterCard;
  