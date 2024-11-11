
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateEmployee from './components/employee-create/CreateEmployee.js';
import EditEmployee from './components/employee-edit/EditEmployee.js';
import EmployeeList from './components/employee-list/EmployeeList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/login-page/LoginPage.js';
import HomePage from './components/dashboard/HomePage.js';

function App() {
  return (
    <Router>
        <Routes>
        <Route exact path="/" element={<LoginPage></LoginPage>} />
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/home" element={<HomePage></HomePage>} />
          <Route path="/employee-list" element={<EmployeeList></EmployeeList>}/>
          <Route path="/create-employee" element={<CreateEmployee></CreateEmployee>}/>
          <Route path="/edit-employee/:id" element={<EditEmployee></EditEmployee>}/>
        </Routes>
    </Router>
  );
}

export default App;
