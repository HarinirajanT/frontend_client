import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        employee_id: '',
        email: '',
        phone_number: '',
        department: '',
        date_of_joining: '',
        role: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setFormData({ ...formData, [name]: value });
    };

    const validateField = (name, value) => {
        let error = '';
        if (name === 'name' && !/^[a-zA-Z\s]+$/.test(value)) {
            error = 'Name must only contain alphabets and spaces.';
        }
        if (name === 'phone_number' && (!/^\d{10}$/.test(value))) {
            error = 'Phone number must be exactly 10 digits.';
        }
        if (name === 'date_of_joining' && new Date(value) > new Date()) {
            error = 'Date of joining cannot be in the future.';
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        for (let field in formData) {
            validateField(field, formData[field]);
        }
    
        if (Object.values(errors).some((err) => err)) {
            setLoading(false);
            return;
        }
    
        try {
            await axios.post('http://localhost:5000/employees', formData);  
            setSuccess('Employee added successfully!');
            setErrors({});
            setFormData({
                name: '',
                employee_id: '',
                email: '',
                phone_number: '',
                department: '',
                date_of_joining: '',
                role: '',
            });
        } catch (err) {
            const errorMessage = err.response ? err.response.data.error : 'Failed to add employee.';
            setErrors({ form: errorMessage });
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };
    

    const handleReset = () => {
        setFormData({
            name: '',
            employee_id: '',
            email: '',
            phone_number: '',
            department: '',
            date_of_joining: '',
            role: '',
        });
        setErrors({});
        setSuccess('');
    };

    return (
        <div className="wrapper">
            <h1>Employee Management System</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                {errors.name && <p className="error-text">{errors.name}</p>}

                <input
                    type="text"
                    name="employee_id"
                    placeholder="Employee ID"
                    maxLength="10"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                {errors.employee_id && <p className="error-text">{errors.employee_id}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    maxLength="10"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                {errors.phone_number && <p className="error-text">{errors.phone_number}</p>}

                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="input-field"
                >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>

                <input
                    type="date"
                    name="date_of_joining"
                    value={formData.date_of_joining}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                {errors.date_of_joining && <p className="error-text">{errors.date_of_joining}</p>}

                <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="input-field"
                />

                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
                </div>
            </form>
            {loading && <p className="loading-text">Loading...</p>}
            {errors.form && <p className="error-text">{errors.form}</p>}
            {success && <p className="success-text">{success}</p>}
        </div>
    );
};

export default App;
