const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <svg
        className="animate-spin h-8 w-8 text-gray-500" // h-8 w-8 define o tamanho, text-blue-500 define a cor
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        {/* Círculo de fundo (cor cinza claro) */}
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        {/* Arco animado (cor primária) */}
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;