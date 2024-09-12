import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authServices from '../services/authServices';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
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
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log('Validation errors:', validationErrors);
      return;
    }

    // Clear errors
    setErrors({});

    try {
      await authServices.forgotPassword(formData.email);
      setMessage('A reset link has been sent to your email address.');

      // Proceed to login page after 4 seconds
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };


  return (
    <div className="form-container container">
      <div className="row">
        <div className="col-md-8 col-lg-6 mx-auto">
          <div className="card shadow-lg rounded-3 p-3 mt-3">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">Forgot Password?</h1>
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
                  <p>We'll send a link to reset your password.</p>
                  {errors.email && <div className="invalid-feedback">{errors.email}
                  </div>}
                </div>
                {message && <div className="alert alert-info">{message}</div>}
                <button type="submit" className="btn btn-primary w-100">Send Mail</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
