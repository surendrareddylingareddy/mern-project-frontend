import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './EmployeeList.css';
import NavigationPage from "../navigation/NavigationPage";

const EmployeeList = () => {

    const [searchtext, setSearchtext] = useState('');
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        function fetchData() {
            fetch('http://localhost:5000/api/employees/get')
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                    setCount(Object.keys(data).length);
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }

        fetchData();

    }, [refresh]);

    const handleCreateEmployee = () => {
        navigate('/create-employee');
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (!confirmDelete) return;

        console.log(id);
    
        fetch(`http://localhost:5000/api/employees/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              alert('Employee deleted successfully');
            } else {
              return response.json().then((data) => setError(data.message));
            }
          })
          .catch((error) => setError(error.message));

          setData((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));

        //   setRefresh(!refresh);
      };

    return (
        <div className="container-fluid">
            <NavigationPage></NavigationPage>
            <div className="employee-list-head d-flex row">
                <p className="col-1 mt-1">Employee List</p>
            </div>
            <div className="d-flex row">
                <div className="col-7 mt-2 d-flex justify-content-end">
                    <p>Total Count : {count}</p>
                </div>
                <div className="col-5 d-flex justify-content-center">
                    <button type="button" className="btn btn-success rounded-0 w-50 h-100" onClick={handleCreateEmployee}>Create Employee</button>
                </div>
            </div>
            <div className="search-bar d-flex flex-row-reverse row">
                <div className="col-10 d-flex justify-content-end">
                    <label className="mr-48">search</label>
                    <input
                        type="text"
                        className="w-50"
                        id="search"
                        value={searchtext}
                        onChange={(e) => setSearchtext(e.target.value)}
                        placeholder="Enter Search Keyword" />
                </div>
            </div>
            <div className="row">
                <table>
                    <thead className="employee-table">
                        <tr>
                            <th className="col-1">Unique id</th>
                            <th className="col-1">Image</th>
                            <th className="col-1">Name</th>
                            <th className="col-1">Email</th>
                            <th className="col-1">Mobile No</th>
                            <th className="col-1">Designation</th>
                            <th className="col-1">Gender</th>
                            <th className="col-1">Course</th>
                            <th className="col-1">Created Date</th>
                            <th className="col-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="custom-table-margin">
                        {data.map((employee) => (

                            <tr key={employee._id}>
                                <td className="custom-table-border">{employee._id}</td>
                                <td className="custom-table-border">
                                    <img src={`http://localhost:5000/uploads/${employee.image}`} alt="Placeholder Image" width="100" height="80" />
                                </td>
                                <td className="custom-table-border">{employee.name}</td>
                                <td className="custom-table-border">{employee.email}</td>
                                <td className="custom-table-border">{employee.mobile}</td>
                                <td className="custom-table-border">{employee.designation}</td>
                                <td className="custom-table-border">{employee.gender}</td>
                                <td className="custom-table-border">{employee.course}</td>
                                <td className="custom-table-border">{new Date(employee.createdAt).toLocaleDateString('en-CA')}</td>
                                <td className="custom-table-border custom-display">
                                    <div className="w-100">
                                        <Link to={'/edit-employee/' + employee._id} className="w-50">
                                            <button className="btn btn-success w-50">Edit</button>
                                        </Link>

                                        <button className="btn btn-danger w-50" onClick={() => handleDelete(employee._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeList;