const ButtonPrimary = ({ className, onClick, text , disabled, loading}: { className: string; onClick: () => void; text: string; disabled: boolean;  loading: boolean }) => {
    return (
        <button
            className={`text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300 ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {text}
        </button>
    );
};

export default ButtonPrimary;
