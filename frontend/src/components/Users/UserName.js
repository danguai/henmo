import React, { useState, useEffect } from 'react';

const UserName = ({ user }) => {
  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   if (!id) return;

  //   (async () => {
  //     const response = await fetch(`/api/users/${user.id}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [id]);

  if (!user) return null;

  return (
    <>
      {`${user.last_name}, ${user.first_name}`}
    </ >
  );
}

export default UserName;
