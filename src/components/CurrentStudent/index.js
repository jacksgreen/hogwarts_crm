import React, { useState, useRef } from 'react';
import './styles.css';
import { editStudent, getSkillsList } from '../../lib/api';

function CurrentStudent(props) {
  const {
    id,
    first_name,
    last_name,
    existing_skill,
    desired_skill,
    desired_class,
    created,
    last_updated
  } = props.activeStudentInfo;

  // using a spread (e.g [...objectname]) to help update the current student page automatically when editing the student

  const [editOpen, setEditOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editExistingSkill, setEditExistingSkill] = useState([]);
  const [editDesiredSkill, setEditDesiredSkill] = useState([]);
  const [editDesiredClass, setEditDesiredClass] = useState([]);
  const [skillsList, setSkillsList] = useState([]);

  const editSkill = useRef(null);
  const editSkillValue = useRef(null);
  const editDesiredClassChoice = useRef(null);

  function handleFirstNameEdit(event) {
    setEditFirstName(event.target.value);
  }

  function handleLastNameEdit(event) {
    setEditLastName(event.target.value);
  }

  const pushEditToServer = async obj => {
    try {
      await editStudent(obj);
      props.getStudentData();
    } catch (e) {
      console.log(e);
    }
  };

  function handleExistingSkill() {
    setEditExistingSkill([
      ...editExistingSkill,
      { skill: editSkill.current.value, value: editSkillValue.current.value }
    ]);
  }

  function handleDesiredSkill() {
    setEditDesiredSkill([
      ...editDesiredSkill,
      {
        skill: editSkill.current.value,
        value: editSkillValue.current.value
      }
    ]);
  }

  function handleDesiredClass() {
    setEditDesiredClass([
      ...editDesiredClass,
      editDesiredClassChoice.current.value
    ]);
  }

  function handleEdit() {
    let lastUpdated = new Date().toISOString();
    let editStudent = {
      id,
      editFirstName,
      editLastName,
      editExistingSkill,
      editDesiredSkill,
      editDesiredClass,
      created,
      lastUpdated
    };
    pushEditToServer(editStudent);
  }

  const openEditPage = async () => {
    let skillsresponse = await getSkillsList();
    setSkillsList(skillsresponse.data);
    setEditOpen(true);
  };

  return (
    <div className='current-student-wrapper'>
      <div>Id: {id}</div>
      <div>First Name: {first_name}</div>
      <div>Last Name: {last_name}</div>
      <div>
        Existing Magic Skillz:
        {existing_skill.map(skill => ` ${skill.skill} (${skill.value}) `)}
      </div>
      <div>
        Desired Magic Skillz:
        {desired_skill.map(skill => ` ${skill.skill} (${skill.value}) `)}
      </div>
      <div>
        Interested in Course:
        {desired_class.map(interested_class => ` ${interested_class} `)}
      </div>
      <div>Creation Time: {created}</div>
      <div>Last Update Time: {last_updated}</div>
      <div>
        <button className='edit-student-btn' onClick={() => openEditPage()}>
          Edit
        </button>
      </div>
      {editOpen && (
        <div>
          <div>
            <label>First Name:</label>
            <input
              type='text'
              onChange={event => handleFirstNameEdit(event)}
            ></input>
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type='text'
              onChange={event => handleLastNameEdit(event)}
            ></input>
          </div>
          <div>
            <div>
              <label>Magic Skillz: </label>
              <select ref={editSkill}>
                {skillsList[0].map(skill => (
                  <option value={skill} key={skill} name={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <select ref={editSkillValue}>
                {[1, 2, 3, 4, 5].map(level => (
                  <option value={level} key={level}>
                    {level}
                  </option>
                ))}
              </select>
              <button
                type='button'
                onClick={event => handleExistingSkill(event)}
              >
                Add Existing
              </button>
              <button
                type='button'
                onClick={event => handleDesiredSkill(event)}
              >
                Add Desired
              </button>
            </div>
            <div>
              <label>Interested in:</label>
              <select ref={editDesiredClassChoice}>
                {skillsList[1].map(skill => (
                  <option value={skill} key={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <button
                type='button'
                onClick={event => handleDesiredClass(event)}
              >
                Add Class
              </button>
            </div>
          </div>
          <button onClick={() => handleEdit()}>Save</button>
        </div>
      )}
    </div>
  );
}

export default CurrentStudent;
