'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords dont match');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong verify data');
        return;
      }

      alert('Registration successful!');
      router.push('/');
    } catch (err) {
      setError('Something went wrong verify data');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 grayBackground">
      <div className="text-center">
        <p className="text-white mb-2 fs-2 fw-bold">Register</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3 text-start">
            <label htmlFor="firstName" className="form-label text-white m-0">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              placeholder="Enter your first name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="lastName" className="form-label text-white m-0">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              placeholder="Enter your last name"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="dateOfBirth" className="form-label text-white m-0">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="form-control"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label text-white m-0">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label text-white m-0">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 text-start">
            <label
              htmlFor="confirmPassword"
              className="form-label text-white m-0"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary w-100">Register</button>
        </form>
        <p className="mt-3 text-white">
          Already have an account?&nbsp;
          <a
            href="#"
            className="text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
