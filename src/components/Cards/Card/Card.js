const Card = ({ label, title, data }) => {
    return (
        <div className='card'>
            <h4>{ title }</h4>
            <h4 className='card-label'>{ label }</h4>
            <h2> { data }</h2>
        </div>
    );
}

export default Card;