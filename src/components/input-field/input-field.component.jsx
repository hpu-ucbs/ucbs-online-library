const FormInput = ({ label, id, error, ...otherProps }) => {
    return (
        <div className={`flex flex-col justify-center relative ${error ? 'mb-8' : 'mb-4'}`}>
            {label && (
                <label htmlFor={id}>{label}</label>
            )}
            <input
                className={`h-10 mt-2 placeholder:font-normal placeholder:text-gray-500 px-2 font-normal border rounded-lg bg-[#F0F0F0] transition duration-200 ease-in-out 
                    ${error ? 'border-red-500' : 'border-black'}
                    hover:border-blue-500 hover:shadow-lg focus:border-blue-500 focus:outline-none`}
                id={id}
                {...otherProps}
            />
            {/* Tooltip error message */}
            {error && (
                <div className="absolute -top-8 left-0 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg z-10">
                    <p className="pb-1">{error}</p>
                    <div className="absolute left-2 bottom-[-5px] w-3 h-3 bg-red-500 rotate-45"></div>
                </div>
            )}
        </div>
    );
};

export default FormInput;