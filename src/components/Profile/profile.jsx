import React, { useEffect, useState } from 'react'; 
import Cookies from 'js-cookie';
import './profile.css'; // Ensure to include your CSS file
import defaultAvatar from '../../assets/images/defaultAvatar.png';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation

const Profile = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    job: '',
    gender: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setError('User not authenticated. Please login.');
        navigate('/login'); // Navigate correctly
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/auth/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          setFormData({
            name: data.user.name,
            job: data.user.job,
            gender: data.user.gender,
            phone: data.user.phone,
            address: data.user.address
          });
        } else {
          setError(data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Something went wrong while fetching user data');
      }
    };

    fetchUserData();
  }, [navigate]); // Include navigate in dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const token = Cookies.get('token');

    try {
      const response = await fetch('http://localhost:3000/api/auth/user/update', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user);
        setIsEditing(false);
      } else {
        setError('Failed to update user data');
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Something went wrong while updating user data');
    }
  };

  const handleLogout = () => {
    Cookies.remove('token'); // Clear token on logout
    Cookies.remove('user'); // Clear user cookie
    setUser(null); // Clear user state
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {user ? (
        <div className="profile-details">
          <img
            src={defaultAvatar} // Replace with a default avatar if none exists
            alt="User Avatar"
            className="profile-avatar"
          />
          {isEditing ? (
            <div className="edit-form">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              <label>Job:</label>
              <input type="text" name="job" value={formData.job} onChange={handleInputChange} />
              <label>Gender:</label>
              <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
              <label>Phone No.:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
              <label>Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
              <button onClick={handleUpdate} className="update-button">Update</button>
              <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
            </div>
          ) : (
            <div className="user-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Job:</strong> {user.job}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Phone No.:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              <div className="profile-actions">
                <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
