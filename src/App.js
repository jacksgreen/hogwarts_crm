import React, { useState } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import { getStudentList, getSkillsList } from '../src/lib/api';
import CurrentStudent from './components/CurrentStudent';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';

function App() {
  const [activeStudent, setActiveStudent] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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
    setActiveStudent(false);
    setShowDashboard(false);
    setShowStudentForm(false);
    setEditOpen(false);
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
    setShowStudentForm(true);
  };

  function openDashboard() {
    closeRightSide();
    setShowDashboard(true);
  }

  function closeEditPage() {
    setEditOpen(false);
  }

  function openEdit() {
    setEditOpen(true);
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
            closeRightSide={closeRightSide}
          />
          {showCreateButton && (
            <div className='left-side-btn-wrapper'>
              <button
                className='create-student-btn'
                onClick={() => openCreateStudent()}
              >
                Create New Student
              </button>
              <button
                className='create-student-btn'
                onClick={() => openDashboard()}
              >
                Dashboard
              </button>
            </div>
          )}
        </div>
        <div className='right-section section'>
          {!activeStudent && !showDashboard && !showStudentForm && (
            <div className='hp-logo'></div>
          )}
          {activeStudent && (
            <CurrentStudent
              activeStudentInfo={activeStudentInfo}
              getStudentData={getStudentData}
              editOpen={editOpen}
              openEdit={openEdit}
              closeEditPage={closeEditPage}
              closeRightSide={closeRightSide}
            />
          )}

          {showDashboard && <Dashboard studentData={studentData} />}
          {showStudentForm && (
            <StudentForm
              getStudentData={getStudentData}
              skillsList={skillsList}
              closeRightSide={closeRightSide}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
