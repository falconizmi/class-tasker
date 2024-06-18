import React from 'react';

const PageTitle = ({ title }: {title: string}) => {
  return (
    <div className="container py-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

export default PageTitle;