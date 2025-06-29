import React from 'react';

function Spinner() {
    return (
        <div className="text-center p-10">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FFA500] rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Generating your quiz...</p>
        </div>
    );
}

export default Spinner;