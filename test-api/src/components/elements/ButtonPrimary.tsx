const ButtonPrimary = ({ className, onClick, text }: { className: string; onClick: () => void; text: string; }) => {
    return (
        <button
            className={`text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300 ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ButtonPrimary;
