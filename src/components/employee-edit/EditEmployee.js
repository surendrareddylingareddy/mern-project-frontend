import './EditEmployee.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationPage from '../navigation/NavigationPage';

const EditEmployee = () => {

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: null,
        course: null,
        image: null,
    });
    const [error, setError] = useState(null);
    const [newFile, setNewFile] = useState(null);

    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            await fetch(`http://localhost:5000/api/employees/get/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setEmployee(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.log("doesnt sending request");
                    setError(error.message);
                });
        }

        fetchData();

    }, [id]);

    const nameRegex = /^[a-zA-Z]{4,15}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@cstech.in/;
    const phoneRegex = /^[0-9]{10}$/;

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
            setEmployee((prevState) => ({
                ...prevState,
                [name]: value,
            }));
    }

    const handleFileChange = (event) => {
        setNewFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        Object.entries(employee).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (newFile) {
            formData.append('image', newFile);
        }

        try {

            const response = await fetch(`http://localhost:5000/api/employees/update/${id}`, {
                method: 'PUT',
                body: formData,
            });

            const result = await response.json();
            console.log('Employee updated:', result);

        } catch (error) {
            console.error('Error:', error);
        }

        navigate('/employee-list');
    };

    return (
        <div className="container-fluid">
            <NavigationPage></NavigationPage>
            <div className="edit-employee-head d-flex row">
                <p className="col-2 mt-1">Edit Employee</p>
            </div>
            <div className='ml-5 mt-5'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='name'>Name</label>
                        <input type='text' id='name' className='form-control w-50 rounded-0 border-2 border-dark'
                            value={employee.name} onChange={handleChange} required></input>
                    </div>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='email'>Email</label>
                        <input type='email' id='email' className='form-control w-50 rounded-0 border-2 border-dark'
                            value={employee.email} onChange={handleChange} required></input>
                    </div>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='mobile'>Mobile No</label>
                        <input type='text' id='mobile' className='form-control w-50 rounded-0 border-2 border-dark'
                            value={employee.mobile} onChange={handleChange} required></input>
                    </div>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='designation'>Designation</label>
                        <select className='form-select w-50 rounded-0 border-2 border-dark' id='designation'
                            value={employee.designation} onChange={handleChange} required>
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
                                checked={employee.gender === 'male'} onChange={handleChange} required />
                            <label className="form-check-label" htmlFor="genderMale">M</label>
                        </div>
                        <div className="form-check custom-radio-margin">
                            <input className="form-check-input border-2 border-dark" type="radio" name="gender" id="genderFemale" value="female"
                                checked={employee.gender === 'female'} onChange={handleChange} required />
                            <label className="form-check-label" htmlFor="genderFemale">F</label>
                        </div>
                    </div>
                    <div className="d-flex mb-4">
                        <label className="form-label w-50">Course</label>
                        <div className="form-check custom-checkbox-margin">
                            <input className="form-check-input border-2 border-dark" type="checkbox" value="MCA" id="mca"
                                checked={employee.course === 'MCA'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="mca">MCA</label>
                        </div>
                        <div className="form-check custom-checkbox-margin">
                            <input className="form-check-input border-2 border-dark" type="checkbox" value="BCA" id="bca"
                                checked={employee.course === 'BCA'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="bca">BCA</label>
                        </div>
                        <div className="form-check custom-checkbox-margin">
                            <input className="form-check-input border-2 border-dark" type="checkbox" value="BSC" id="bsc"
                                checked={employee.course === 'BSC'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="bsc">BSC</label>
                        </div>
                    </div>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50' htmlFor='image'>Uploaded Image</label>
                        {employee.image &&
                            (
                                <img
                                    src={`http://localhost:5000/uploads/${employee.image}`}
                                    alt="Employee file"
                                    style={{ width: '100px', height: '100px' }}
                                />
                            )}
                    </div>
                    <div className='d-flex mb-4'>
                        <label className='form-label w-50'>Upload New Image</label>
                        <input type="file" accept=".jpg, .jpeg, .png" className='form-control w-50 rounded-0 border-2 border-dark'
                            onChange={handleFileChange} />
                    </div>

                    <button type="submit" className="btn btn-success w-50 custom-submit-margin">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;