import React, { useState } from 'react';
import './styles.css';
import { getSkillsList } from '../../lib/api';
import StudentForm from '../StudentForm';

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

  const [editOpen, setEditOpen] = useState(false);
  const [skillsList, setSkillsList] = useState([]);

  function closeEdit() {
    setEditOpen(false);
  }

  const openEditPage = async () => {
    let skillsresponse = await getSkillsList();
    setSkillsList(skillsresponse.data);
    setEditOpen(true);
  };

  return (
    <div className='current-student-outer-wrapper'>
      {!editOpen && (
        <div className='current-student-wrapper'>
          <div className='student-name'>
            <b>
              {first_name} {last_name}
            </b>
            <div className='id-text'>Id: {id}</div>
          </div>
          <div className='all-details-wrapper'>
            <div className='all-skills-wrapper'>
              <div className='indiv-skills-wrapper'>
                <b>Existing Magic Skillz</b>
                {existing_skill.map(skill => (
                  <div>
                    {skill.skill} ({skill.value})
                  </div>
                ))}
              </div>
              <div className='indiv-skills-wrapper'>
                <b>Desired Magic Skillz</b>
                {desired_skill.map(skill => (
                  <div>
                    {skill.skill} ({skill.value})
                  </div>
                ))}
              </div>
              <div className='indiv-skills-wrapper'>
                <b>Interested in Course</b>
                {desired_class.map(interested_class => (
                  <div>{interested_class}</div>
                ))}
              </div>
            </div>
            <div className='indiv-skills-wrapper'>
              <div>
                <b>Creation Time</b>
              </div>
              <div>{created}</div>
            </div>
            <div className='indiv-skills-wrapper'>
              <div>
                <b>Last Update Time</b>
              </div>
              <div>{last_updated}</div>
            </div>
          </div>
          <div>
            <button className='edit-student-btn' onClick={() => openEditPage()}>
              Edit
            </button>
          </div>
        </div>
      )}

      {editOpen && (
        <StudentForm
          skillsList={skillsList}
          getStudentData={props.getStudentData}
          edit={true}
          activeStudentInfo={props.activeStudentInfo}
          closeEdit={closeEdit}
        />
      )}
    </div>
  );
}

export default CurrentStudent;
