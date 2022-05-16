import React, { useState, useEffect } from 'react';

const UserNameEmail = ({ id }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!id) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [id]);

  if (!user) return null;

  return (
    <div className='user__first__last__name__email'>
      <div className='approved__tran__user__name'>
        {`${user?.last_name}, ${user?.first_name}`}
      </div>
      <div className='approved__tran__user__email'>
        {user?.email}
      </div>
    </div >
  );
}
export default UserNameEmail;
