import { BsPersonVcardFill } from 'react-icons/bs';

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 grayBackground">
      <div className="text-center">
        <BsPersonVcardFill className="loginIcon" />
        <p className="text-white mb-2 fs-2 fw-bold">Login</p>
        <div>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
          />
          <div className="d-flex flex-column align-items-stretch">
            <button className="btn btn-primary mb-2 w-100">Login</button>
            <div className="d-flex justify-content-center">
              <a href="register">Register</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
