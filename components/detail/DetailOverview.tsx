import React from 'react';

interface DetailOverviewProps {
  title: string;
  overview: string;
}

const DetailOverview = ({ title, overview }: DetailOverviewProps) => {
  return (
    <div>
      <h3 className="text-[20.921px] font-bold ml-8 mb-6 text-white">
        {title}
      </h3>
      <p className="text-[11.14px] mx-8 pb-20 text-white">{overview}</p>
    </div>
  );
};

export default DetailOverview;
