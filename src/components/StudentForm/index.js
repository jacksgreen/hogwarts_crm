import React, { useState, useRef, useEffect } from 'react';
import { createNewStudent, editStudent } from '../../lib/api';
import './styles.css';

function CreateNewStudent(props) {
  let magicSkillz = props.skillsList[0];
  let courseList = props.skillsList[1];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [existingSkill, setExistingSkill] = useState([]);
  const [desiredSkill, setDesiredSkill] = useState([]);
  const [desiredClass, setDesiredClass] = useState([]);
  const [emailAddress, setEmailAddress] = useState([]);

  const skill = useRef(null);
  const skillValue = useRef(null);
  const desiredClassChoice = useRef(null);

  useEffect(() => {
    {
      props.edit && updateEditInfo();
    }
  }, []);

  function updateEditInfo() {
    const {
      id,
      first_name,
      last_name,
      existing_skill,
      desired_skill,
      desired_class,
      email_address,
      created,
      last_updated
    } = props.activeStudentInfo;
    setFirstName(first_name);
    setLastName(last_name);
    setExistingSkill(existing_skill);
    setDesiredSkill(desired_skill);
    setDesiredClass(desired_class);
    setEmailAddress(email_address);
  }

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  function handleEmailAddress(event) {
    setEmailAddress(event.target.value);
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
      { skill: skill.current.value, value: skillValue.current.value }
    ]);
  }

  function handleDesiredClass() {
    setDesiredClass([...desiredClass, desiredClassChoice.current.value]);
  }

  function removeSkill(index, skillArray, setSkillArray) {
    let arr = skillArray;
    arr.splice(index, 1);
    setSkillArray([...arr]);
  }

  const pushStudentToServer = async obj => {
    try {
      await createNewStudent(obj);
    } catch (e) {
      console.log(e);
    }
  };

  function handleSubmit() {
    if (firstName == '' || lastName == '') {
      return;
    }
    let created = new Date().toISOString();
    let lastUpdated = created;
    let newStudent = {
      firstName,
      lastName,
      existingSkill,
      desiredSkill,
      desiredClass,
      emailAddress,
      created,
      lastUpdated
    };
    newStudent = JSON.stringify(newStudent);
    pushStudentToServer(newStudent);
    props.getStudentData();
    props.closeRightSide();
  }

  function handleEdit() {
    let id = props.activeStudentInfo.id;
    let created = props.activeStudentInfo.created;
    let lastUpdated = new Date().toISOString();
    let newStudent = {
      id,
      firstName,
      lastName,
      existingSkill,
      desiredSkill,
      desiredClass,
      emailAddress,
      created,
      lastUpdated
    };
    newStudent = JSON.stringify(newStudent);
    pushEditToServer(newStudent);
    props.closeRightSide();
  }

  const pushEditToServer = async obj => {
    try {
      await editStudent(obj);
      props.getStudentData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='form-wrapper'>
      <div className='form-title'>
        {!props.edit && <b>New Student</b>}
        {props.edit && <b>Edit Student</b>}
      </div>
      <div>
        <label>First Name: </label>
        <input
          required
          type='text'
          value={firstName}
          onChange={event => handleFirstName(event)}
        ></input>
      </div>
      <div>
        <label>Last Name: </label>
        <input
          required
          type='text'
          value={lastName}
          onChange={event => handleLastName(event)}
        ></input>
      </div>
      <div className='magic-skillz-wrapper'>
        <div className='select-form'>
          <label>Magic Skillz: </label>
          <select className='student-form-select' ref={skill}>
            {magicSkillz.map(skill => (
              <option value={skill} key={skill} name={skill}>
                {skill}
              </option>
            ))}
          </select>
          <select className='student-form-select' ref={skillValue}>
            {[1, 2, 3, 4, 5].map(level => (
              <option value={level} key={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            className='student-form-btn select-btn'
            type='button'
            onClick={event => handleExistingSkill(event)}
          >
            Add Existing
          </button>
          <button
            className='student-form-btn select-btn'
            type='button'
            onClick={event => handleDesiredSkill(event)}
          >
            Add Desired
          </button>
        </div>
      </div>
      <div className='select-form'>
        <label>Interested in: </label>
        <select className='student-form-select' ref={desiredClassChoice}>
          {courseList.map(skill => (
            <option value={skill} key={skill}>
              {skill}
            </option>
          ))}
        </select>
        <button
          className='student-form-btn select-btn'
          type='button'
          onClick={event => handleDesiredClass(event)}
        >
          Add Class
        </button>
      </div>
      <div>
        <label>Email Address</label>
        <input
          required
          type='text'
          value={emailAddress}
          onChange={event => handleEmailAddress(event)}
        ></input>
      </div>
      <div className='display-data'>
        <b>Existing:</b>
        {existingSkill.map((skill, index) => (
          <div
            className='display-data-value'
            key={skill.skill}
            onClick={() => removeSkill(index, existingSkill, setExistingSkill)}
          >
            {skill.skill} ({skill.value})
          </div>
        ))}
      </div>
      <div className='display-data'>
        <b>Desired:</b>
        {desiredSkill.map((skill, index) => (
          <div
            key={skill.skill}
            className='display-data-value'
            onClick={() => removeSkill(index, desiredSkill, setDesiredSkill)}
          >
            {skill.skill} ({skill.value})
          </div>
        ))}
      </div>
      <div className='display-data'>
        <b>Class:</b>
        {desiredClass.map((skill, index) => (
          <div
            key={skill}
            className='display-data-value'
            onClick={() => removeSkill(index, desiredClass, setDesiredClass)}
          >
            {skill}
          </div>
        ))}
      </div>
      <div>
        {!props.edit && (
          <button
            className='student-form-btn'
            type='button'
            onClick={() => handleSubmit()}
          >
            Create
          </button>
        )}
        {props.edit && (
          <div>
            <button
              type='button'
              className='student-form-btn edit-form-btn'
              onClick={() => handleEdit()}
            >
              Update
            </button>
            <button
              type='button'
              className='student-form-btn edit-form-btn'
              onClick={props.closeEditPage}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateNewStudent;
