/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        router.push('login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className='flex justify-center items-center bg-cover'>
      <Image src='/regis-ilustration.svg' className='w-[88vh] mr-40' alt='Registration Illustration' width={500} height={500} />
      <div className='text-olive border-beige border rounded-md p-8 shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-40 relative'>
        <h1 className='font-bold text-4xl text-center mb-6'>Daftar Akun</h1>
        <form onSubmit={handleSubmit}>
          <div className='relative my-4'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer'
              required
            />
          </div>
          <div className='relative my-4'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer'
              required
            />
          </div>
          <div className='relative my-4'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer'
              required
            />
          </div>
          <div className='relative my-4'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer'
              required
            />
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {success && <p className='text-green-500 text-sm'>{success}</p>}
          <button type='submit' className='mt-2 bg-olive font-medium text-white text-center w-full px-2 py-2 rounded-md'>
            Daftar
          </button>
        </form>
        <div className='flex flex-row text-sm item-center text-center justify-center mt-4'>
          <p>Apakah sudah punya akun?</p>
          <Link href='/User/Login' className='font-semibold'>
            Masuk disini!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisPage;
