import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function User_Name({ id }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!id) return;

    (async () => {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [id]);

  if (!user) return null;

  return (
    <span>
      {`${user?.last_name}, ${user?.first_name}`}
    </span >
  );
}
export default User_Name;
