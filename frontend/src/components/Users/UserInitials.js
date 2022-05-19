import React from 'react';

const UserInitials = ({ user }) => {
  if (!user) return null;

  return (
    <>
      {`${user.first_name.slice(0, 1)}${user.last_name.slice(0, 1)}: `}
    </ >
  );
}

export default UserInitials;
