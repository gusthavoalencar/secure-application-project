'use client';
import { BsPersonVcardFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch('/api/check-login');
      const data = await response.json();

      if (data.loggedIn) {
        router.push('/home');
      }
    };

    checkLoggedIn();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid credentials');
        return;
      }

      alert('Login successful!');
      router.push('/home');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 grayBackground">
      <div className="text-center">
        <BsPersonVcardFill className="loginIcon" />
        <p className="text-white mb-2 fs-2 fw-bold">Login</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary mb-2 w-100" type="submit">
            Login
          </button>
        </form>
        <div className="d-flex justify-content-center">
          <p className="text-white">
            Don't have an account?&nbsp;
            <a
              href="#"
              className="text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                handleRegisterClick();
              }}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
