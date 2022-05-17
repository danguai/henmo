import React from 'react';

const UserName = ({ user }) => {
  if (!user) return null;

  return (
    <>
      {`${user.last_name}, ${user.first_name}`}
    </ >
  );
}

export default UserName;
