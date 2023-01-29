import * as React from "react";

export const NoResults: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-gray-700">No Results</h1>
        <p className="text-sm text-gray-700">
          We couldn't find any results for your search. Please try again.
        </p>
      </div>
    </div>
  );
};

export default NoResults;
