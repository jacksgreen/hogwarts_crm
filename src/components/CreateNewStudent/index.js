import React, { useState, useRef } from 'react';
import './styles.css';
import { createNewStudent } from '../../lib/api';

function CreateNewStudent(props) {
  // when submitting - also need to create a creation time, last updated,

  let magicSkillz = props.skillsList[0];
  let courseList = props.skillsList[1];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [existingSkill, setExistingSkill] = useState([]);
  const [desiredSkill, setDesiredSkill] = useState([]);
  const [desiredClass, setDesiredClass] = useState([]);

  const skill = useRef(null);
  const skillValue = useRef(null);
  const desiredClassChoice = useRef(null);

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  function handleExistingSkill() {
    setExistingSkill([
      ...existingSkill,
      { skill: skill.current.value, value: skillValue.current.value }
    ]);
  }

  function handleDesiredSkill() {
    setDesiredSkill([
      ...desiredSkill,
      {
        skill: skill.current.value,
        value: skillValue.current.value
      }
    ]);
  }

  function handleDesiredClass() {
    setDesiredClass([...desiredClass, desiredClassChoice.current.value]);
  }

  const pushStudentToServer = async obj => {
    try {
      await createNewStudent(obj);
    } catch (e) {
      console.log(e);
    }
  };

  function handleSubmit() {
    let created = new Date().toISOString();
    let lastUpdated = created;
    let newStudent = {
      firstName,
      lastName,
      existingSkill,
      desiredSkill,
      desiredClass,
      created,
      lastUpdated
    };
    newStudent = JSON.stringify(newStudent);
    pushStudentToServer(newStudent);
  }

  return (
    <div>
      <div className='form-wrapper'>
        <div> New Student</div>
        <div>
          <label>First Name: </label>
          <input type='text' onChange={event => handleFirstName(event)}></input>
        </div>
        <div>
          <label>Last Name: </label>
          <input type='text' onChange={event => handleLastName(event)}></input>
        </div>
        <div className='magic-skillz-wrapper'>
          <div className='select-form'>
            <label>Magic Skillz: </label>
            <select ref={skill}>
              {magicSkillz.map(skill => (
                <option value={skill} key={skill} name={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <select ref={skillValue}>
              {[1, 2, 3, 4, 5].map(level => (
                <option value={level} key={level}>
                  {level}
                </option>
              ))}
            </select>
            <button type='button' onClick={event => handleExistingSkill(event)}>
              Add Existing
            </button>
            <button type='button' onClick={event => handleDesiredSkill(event)}>
              Add Desired
            </button>
          </div>
        </div>
        <div className='select-form'>
          <label>Interested in: </label>
          <select ref={desiredClassChoice}>
            {courseList.map(skill => (
              <option value={skill} key={skill}>
                {skill}
              </option>
            ))}
          </select>
          <button type='button' onClick={event => handleDesiredClass(event)}>
            Add Class
          </button>
        </div>
        <div className='new-student'>
          <div className='new-student-data'>New:</div>
          <div>
            {firstName} {lastName}
          </div>
        </div>
        <div>
          <button
            className='create-btn'
            type='button'
            onClick={() => handleSubmit()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewStudent;
