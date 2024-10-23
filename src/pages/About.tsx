import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">About</h1>
      <p className="text-lg dark:text-gray-300">
        This is the About page content. You can add more information about your
        application or organization here.
      </p>
    </div>
  );
};

export default About;
