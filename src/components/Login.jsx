import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authServices from '../services/authServices';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
    if (!formData.password) newErrors.password = 'Password is required.';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors
    setErrors({});

    try {
      await authServices.login(formData);
      setMessage('Login successful. Redirecting to signup page...');
      
      // Clear forms
      setFormData({ email: '', password: '' })

      // Navigate to signup page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="form-container container">
      <div className="row">
        <div className="col-md-8 col-lg-6 mx-auto">
          <div className="card shadow-lg rounded-3 p-3 mt-3">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">Login</h1>
              {message && (
                <div className={`alert ${message.startsWith('Login successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <div className="mt-2 text-center">
                <Link to="/" className="link-primary">Sign up</Link>
              </div>
              <div className="mt-2 text-center">
                <Link to="/forgot-password" className="link-danger">Forgot Password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
