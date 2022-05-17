import React from 'react';

const UserNameEmail = ({ user }) => {
  if (!user) return null;

  return (
    <>
      <div className='approved__tran__user__name'>
        {`${user.last_name}, ${user.first_name}`}
      </div>
      <div className='approved__tran__user__email'>
        {user.email}
      </div>
    </>
  );
}
export default UserNameEmail;
