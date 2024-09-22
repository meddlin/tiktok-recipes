/**
 * DaisyButton
 * - https://daisyui.com/components/button/
 */

const DaisyButton = ({ label = "Button", id, name, type, className, onClick }) => {
    return (
        <button 
            name={name}
            id={id}
            type={type}
            className={`btn ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default DaisyButton;