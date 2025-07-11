const Card = ({name,date,url,concept_tags, onBan}) => 
{
    return (
        <div className = "card">
            <h1>{name}</h1>
            <img className = "astronomy-image" src = {url} alt = "Card image"/>
            <button value = {date} onClick={onBan}>{date}</button>
            <p> {concept_tags}</p>
        </div>
    );
}

export default Card;