import React from "react";
// import { useWeddingStore } from "../../../db/store/useWeddingStore";

// Event Card Component - Fixed height/width
const Card4 = ({
  image,
  functionName,
  date,
  muhuratTime,
  place,
  number,
  index,
}) => (
  <div className="relative w-full h-full mx-auto">
    {/* Background card stack for depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl transform rotate-6 scale-95 opacity-50 blur-lg"></div>

    <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-3xl transform rotate-8 scale-95 shadow-xl blur-sm"></div>

    <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-3xl transform -rotate-8 scale-97 shadow-2xl blur-sm"></div>

    {/* Main Card - Fixed dimensions */}
    <div className="relative rounded-2xl border border-yellow-500/20 shadow-2xl overflow-hidden h-full w-full flex flex-col justify-end bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-95"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-5 text-white flex flex-col justify-center items-center">
        {/* <h2 className="text-2xl font-extrabold text-yellow-100 drop-shadow-lg mb-2">
          {functionName}
        </h2> */}
        <div className="space-y-1 font-medium mb-4 text-xl">
          <p>
            <strong>तारीख:</strong> {date}
          </p>
          <p>
            <strong>मुहूर्त:</strong> {muhuratTime}
          </p>
          <p>
            <strong>स्थान:</strong> {place}
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xl">
          <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1.5 font-bold shadow-md text-black">
            {functionName}
          </div>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1.5 font-bold shadow-md rounded-full text-black">
            {number}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// Main Component - 2 events per row on tablet/laptop
export default function FunctionCardsFifthPage({userData}){

  const data = userData?.pages?.seven_events;

  return (
    <div className="w-full flex flex-col items-center space-y-12 py-16 px-4 md:px-6 lg:px-8 ">
    {/* Heading for मांगलिक कार्यक्रम */}
    <div className="text-center">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent md:pt-1 lg:pt-1">
        {data.headingManglik} 
      </h1>
      <div className="mt-2 h-0.5 w-40 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </div>

    {/* Wedding Event Cards Section - 2 cards per row on md/lg */}
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-20">
        {data.events.map((item, index) => (
          <div key={index} className="xl:h-[524px] h-[524px] px-2 m-4">
            <Card4 {...item} number={index + 1} />
          </div>
        ))}
      </div>
    </div>

    {/* Heading for प्रतिभोज */}
    <div className="text-center pt-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
        {data.headingPratibhoj}
      </h2>
      <div className="mt-2 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </div>

    {/* Pratibhoj Card Section */}
    <div className="w-full max-w-sm h-[524px] px-4">
      <Card4
        functionName={data.pratibhoj.functionName}
        date={data.pratibhoj.date}
        muhuratTime={data.pratibhoj.muhuratTime}
        place={data.pratibhoj.place}
        image={data.pratibhoj.image}
        
      />
    </div>

    {/* Baraat Note Card */}
    <div className="w-full max-w-sm  px-4 pt-8">
      <div className="bg-black/30 border border-yellow-500/20 rounded-2xl p-6 text-center shadow-2xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-yellow-300 mb-3">
          {data.headingBaraatNotice}
        </h2>
        <p className="text-yellow-100/90 leading-relaxed px-2">
          {data.baraatNotice.description}
        </p>
        <div className="mt-4 pt-4 border-t border-yellow-500/20 text-yellow-200 font-semibold space-y-1">
          <p>दिनांक: {data.baraatNotice.date}</p>
          <p>समय: {data.baraatNotice.time}</p>
        </div>

        {/* Google Maps Direction Button */}
        <div className="mt-6">
          <a
            href={data.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{data.mapButtonText}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  );
};

