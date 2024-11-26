'use client';
import { BsPersonFillAdd } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 grayBackground">
      <div className="text-center">
        <BsPersonFillAdd className="loginIcon" />
        <p className="text-white mb-2 fs-2 fw-bold">Register</p>
        <form>
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
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="dob" className="form-label text-white m-0">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-control"
              required
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
