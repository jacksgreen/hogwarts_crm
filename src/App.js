import React, { useState } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import { getStudentList, getSkillsList } from '../src/lib/api';
import CurrentStudent from './components/CurrentStudent';
import CreateNewStudent from './components/CreateNewStudent';

function App() {
  const [activeStudent, setActiveStudent] = useState(false);
  const [activeCreate, setActiveCreate] = useState(false);
  const [activeStudentInfo, setActiveStudentInfo] = useState({});
  const [showCreateButton, setShowCreateButton] = useState(false);
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

  function chooseStudent(obj) {
    setActiveStudent(true);
    setActiveCreate(false);
    setActiveStudentInfo(obj);
  }

  const openCreateStudent = async () => {
    let skillsresponse = await getSkillsList();
    setSkillsList(skillsresponse.data);
    setActiveCreate(true);
    setActiveStudent(false);
  };

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
            <button
              className='create-student-btn'
              onClick={() => openCreateStudent()}
            >
              Create New Student
            </button>
          )}
        </div>
        <div className='right-section section'>
          {!activeStudent && !activeCreate && <div className='hp-logo'></div>}
          {activeStudent && (
            <CurrentStudent activeStudentInfo={activeStudentInfo} />
          )}
          {activeCreate && <CreateNewStudent skillsList={skillsList} />}
        </div>
      </div>
    </div>
  );
}

export default App;
