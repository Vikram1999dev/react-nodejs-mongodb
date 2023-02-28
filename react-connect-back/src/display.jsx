import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Display = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/display')
      .then((response) => {
        setContent(response.data[response.data.length - 1]);
        console.log(response.data[response.data.length - 1]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {content ? (
        <div>
          <p>Username : {content['username']}</p>
          <p>Roll no :{content['rollno']}</p>
          <p>Gender:{content['gender']}</p>
        </div>
      ) : (
        <p>You have not signed up or logged in</p>
      )}
    </div>
  );
};

export default Display;
