import NavigationPage from '../navigation/NavigationPage';
import './CreateEmployee.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [designation, setDesignation] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const nameRegex = /^[a-zA-Z]{4,15}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@cstech.in/;
    const phoneRegex = /^[0-9]{10}$/;

    const handleNameChange = (event) => {
        const inputName = event.target.value;
        setName(inputName);

        if (!nameRegex.test(inputName)) {
            setError('Username must be 4-15 characters long and can only contain letters, numbers, and underscores.');
        } else {
            setError('');
        }
    };

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);

        if (!emailRegex.test(inputEmail)) {
            setError('Please enter a valid email address');
        } else {
            setError('');
        }
    };

    const handleMobileNumberChange = (event) => {
        const inputMobileNumber = event.target.value;
        setMobileNumber(inputMobileNumber);

        // Validate the phone number using regex
        if (!phoneRegex.test(inputMobileNumber) && inputMobileNumber !== '') {
            setError('Phone number must be exactly 10 digits.');
        } else {
            setError('');
        }

    };

    const handleDesignationChange = (event) => {
        setDesignation(event.target.value);
    }

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedCourse(selectedCourse === value ? null : value);
    };

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setSelectedImage(file);
            setError(null);
        } else {
            setSelectedImage(null);
            setError("Please upload a JPG or PNG image.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name',name);
        formData.append('email', email);
        formData.append('mobile', mobileNumber);
        formData.append('designation', designation);
        formData.append('gender', selectedGender);
        formData.append('course', selectedCourse);
        formData.append('image', selectedImage);

        try {

            const response = await fetch('http://localhost:5000/api/employees/create', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Employee created:', data);
                // Optionally, reset the form fields
                setName('');
                setEmail('');
                setMobileNumber('');
                setDesignation('');
                setSelectedGender(null);
                setSelectedCourse(null);
                setSelectedImage(null);
            } else {
                console.error('Error creating employee');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        navigate('/employee-list');
    };

    return (
        <div className="container-fluid">
            <NavigationPage></NavigationPage>
            <div className="create-employee-head d-flex row">
                <p className="col-2 mt-1">Create Employee</p>
            </div>
            <div className='ml-5 mt-5'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='name'>Name</label>
                        <input type='text' id='name' className='form-control w-50 rounded-0 border-2 border-dark'
                            value={name} onChange={handleNameChange} required></input>
                    </div>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='email'>Email</label>
                        <input type='email' id='email' className='form-control w-50 rounded-0 border-2 border-dark'
                            value={email} onChange={handleEmailChange} required></input>
                    </div>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='mobile'>Mobile No</label>
                        <input type='text' id='mobile' className='form-control w-50 rounded-0 border-2 border-dark'
                            value={mobileNumber} onChange={handleMobileNumberChange} required></input>
                    </div>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='designation'>Designation</label>
                        <select className='form-select w-50 rounded-0 border-2 border-dark' id='designation' 
                        value={designation} onChange={handleDesignationChange} required>
                            <option value=''>select</option>
                            <option value="HR">HR</option>
                            <option value='Manager'>Manager</option>
                            <option value='Sales'>Sales</option>
                        </select>
                    </div>
                    <div className="d-flex mb-4">
                        <label className="form-label w-50">Gender</label>
                        <div className="form-check custom-radio-margin">
                            <input className="form-check-input border-2 border-dark" type="radio" name="gender" id="genderMale" value="male"
                                checked={selectedGender === 'male'} onChange={handleGenderChange} required />
                            <label className="form-check-label" htmlFor="genderMale">M</label>
                        </div>
                        <div className="form-check custom-radio-margin">
                            <input className="form-check-input border-2 border-dark" type="radio" name="gender" id="genderFemale" value="female"
                                checked={selectedGender === 'female'} onChange={handleGenderChange} required />
                            <label className="form-check-label" htmlFor="genderFemale">F</label>
                        </div>
                    </div>
                    <div className="d-flex mb-4">
                        <label className="form-label w-50">Course</label>
                        <div className="form-check custom-checkbox-margin">
                            <input className="form-check-input border-2 border-dark" type="checkbox" value="MCA" id="mca"
                                checked={selectedCourse === 'MCA'} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="mca">MCA</label>
                        </div>
                        <div className="form-check custom-checkbox-margin">
                            <input className="form-check-input border-2 border-dark" type="checkbox" value="BCA" id="bca"
                                checked={selectedCourse === 'BCA'} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="bca">BCA</label>
                        </div>
                        <div className="form-check custom-checkbox-margin">
                            <input className="form-check-input border-2 border-dark" type="checkbox" value="BSC" id="bsc"
                                checked={selectedCourse === 'BSC'} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="bsc">BSC</label>
                        </div>
                    </div>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='image'>Img Upload</label>
                        <input type='file' id='image' className='form-control w-50 rounded-0 border-2 border-dark' accept=".jpg, .jpeg, .png"
                        onChange={handleImageChange} required></input>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button type="submit" className="btn btn-success w-50 custom-submit-margin">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEmployee;