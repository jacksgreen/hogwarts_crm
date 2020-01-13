import React, { useState } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import { getStudentList, getSkillsList } from '../src/lib/api';
import CurrentStudent from './components/CurrentStudent';
import CreateNewStudent from './components/CreateNewStudent';
import Dashboard from './components/Dashboard';

function App() {
  const [activeStudent, setActiveStudent] = useState(false);
  const [activeCreate, setActiveCreate] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeStudentInfo, setActiveStudentInfo] = useState({});
  const [skillsList, setSkillsList] = useState([]);
  const [studentData, setStudentData] = useState([
    {
      id: '',
      first_name: '',
      second_name: '',
      existing_skill: '',
      desired_skill: '',
      desired_class: '',
      created: '',
      last_updated: ''
    }
  ]);

  const getStudentData = async () => {
    let response = await getStudentList();
    setStudentData(response.data);
    setShowCreateButton(true);
  };

  function closeRightSide() {
    setActiveCreate(false);
    setActiveStudent(false);
    setShowDashboard(false);
  }

  function chooseStudent(obj) {
    closeRightSide();
    setActiveStudent(true);
    setActiveStudentInfo(obj);
  }

  const openCreateStudent = async () => {
    let skillsresponse = await getSkillsList();
    setSkillsList(skillsresponse.data);
    closeRightSide();
    setActiveCreate(true);
  };

  function openDashboard() {
    closeRightSide();
    setShowDashboard(true);
  }

  return (
    <div className='App'>
      <div className='content-wrapper'>
        <div className='left-section section'>
          <button
            className='load-content-button'
            onClick={() => getStudentData()}
          ></button>
          <StudentList
            studentData={studentData}
            chooseStudent={chooseStudent}
          />
          {showCreateButton && (
            <div>
              <button
                className='create-student-btn'
                onClick={() => openCreateStudent()}
              >
                Create New Student
              </button>
              <button onClick={() => openDashboard()}>Dashboard</button>
            </div>
          )}
        </div>
        <div className='right-section section'>
          {!activeStudent && !activeCreate && !showDashboard && (
            <div className='hp-logo'></div>
          )}
          {activeStudent && (
            <CurrentStudent
              activeStudentInfo={activeStudentInfo}
              getStudentData={getStudentData}
            />
          )}
          {activeCreate && (
            <CreateNewStudent
              skillsList={skillsList}
              getStudentData={getStudentData}
            />
          )}
          {showDashboard && <Dashboard studentData={studentData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
