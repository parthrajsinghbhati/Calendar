export const TopBinding = () => {
  const spirals = Array.from({ length: 18 });

  return (
    <div className="w-full h-8 flex justify-between items-center px-4 relative z-20 overflow-hidden" aria-hidden="true">
      <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-b from-gray-800 to-gray-900 border-y border-gray-950 -translate-y-1/2"></div>
      
      {spirals.map((_, i) => (
        <div key={i} className="relative w-4 h-full flex justify-center items-center">
          <div className="w-2 h-8 rounded-full border-2 border-gray-700 bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700 shadow-md"></div>
        </div>
      ))}
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full border-4 border-gray-700 shadow-sm relative -top-2"></div>
        <div className="w-1 h-8 bg-gray-700 absolute top-2"></div>
      </div>
    </div>
  );
};
