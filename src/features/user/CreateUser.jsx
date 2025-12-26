import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function CreateUser() {
  const [username, setUsername] = useState('');
   const dispatch = useDispatch()
   const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    if(!username) return;
    dispatch(updateName(username))
    navigate('/menu')
    setUsername('')
    toast(`Hello ${username}`,
  {
    icon: '🖐',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#f5c731ff',
    },
  }
);
  }

  return (
    <form onSubmit={handleSubmit} className=' '>
      <p className='text-sm sm:text-xl mb-2'>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='   w-72 mt-2 mb-8 input '
      />

      {username !== '' && (
        <div>
          <Button size='primary'>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
