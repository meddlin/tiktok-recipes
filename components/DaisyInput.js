/**
 * DaisyInput
 * - https://daisyui.com/components/input/
 */

const DaisyInput = ({ label = "Name", type="text", id, name, value, className, labelClassName, onChange, onBlur, disabled }) => {
    return (
        <label className={`input input-bordered flex items-center gap-2 ${labelClassName} ${disabled ? 'bg-slate-200' : ''}`}>
            {label}
            <input 
                type={type} 
                className={`${className} grow`}
                id={id}
                name={name}
                placeholder="Enter here..." 
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
            />
        </label>
    );
};

export default DaisyInput;