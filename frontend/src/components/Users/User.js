import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function User({ id }) {
  const [user, setUser] = useState({});
  const { userId } = useParams();

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

  if (!user) {
    return null;
  }

  return (
    <div className='user__first__last__name__email'>
      <div>
        {user.last_name} {user.first_name}
      </div>
      <div>
        {user.email}
      </div>
    </div >
  );
}
export default User;
