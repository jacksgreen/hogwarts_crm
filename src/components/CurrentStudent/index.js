import React from 'react';
import './styles.css';

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
  console.log(props);
  return (
    <div className='current-student-wrapper'>
      <div>Id: </div>
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
        <button className='edit-student-btn'>Edit</button>
      </div>
    </div>
  );
}

export default CurrentStudent;
