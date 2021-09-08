import './Button.css';

const Button = ({ onClick}) => {

    return (
        <button 
            onClick = { onClick }
            className = 'button'>
                Click
        </button>
    );
}

export default Button;