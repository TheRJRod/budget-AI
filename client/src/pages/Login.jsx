import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard')

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-row'>
      <input name="email" onChange={handleChange} placeholder="Email" />
      </div>
      <div className='form-row'>
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      </div>
      <button className='w-full flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' type="submit">Login</button>
      {error && <p style={{color:'red', marginTop:20, fontStyle:'italic', textAlign:'center', fontWeight:'bold'}}>{error}</p>}
    </form>
  );
}
