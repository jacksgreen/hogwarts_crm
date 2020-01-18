import React, { useState } from 'react';
import './styles.css';
import { getSkillsList, sendEmail } from '../../lib/api';
import StudentForm from '../StudentForm';

function CurrentStudent(props) {
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

  const [skillsList, setSkillsList] = useState([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [showEmail, setShowEmail] = useState(false);

  const openEditPage = async () => {
    let skillsresponse = await getSkillsList();
    setSkillsList(skillsresponse.data);
    props.openEdit();
  };

  function handleEmailSubject(event) {
    setEmailSubject(event.target.value);
  }

  function handleEmailContent(event) {
    setEmailContent(event.target.value);
  }

  function toggleEmail() {
    setShowEmail(!showEmail);
  }

  function emailRequest() {
    let emailObj = {
      emailAddress: email_address,
      subject: emailSubject,
      content: emailContent
    };
    let emailInfo = { email: emailObj };
    sendEmail(emailInfo);
    toggleEmail();
  }

  return (
    <div className='current-student-outer-wrapper'>
      {!props.editOpen && (
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
                <b>Email Address:</b>
              </div>
              <div>{email_address}</div>
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
            <div>
              <button
                className='edit-student-btn'
                onClick={() => toggleEmail()}
              >
                Email
              </button>
            </div>
          </div>
          <div>
            {showEmail && (
              <div className='email-box'>
                <div>
                  <label>Subject</label>
                  <input
                    className='email-form'
                    required
                    type='text'
                    onChange={event => handleEmailSubject(event)}
                  ></input>
                </div>
                <div>
                  <label>Content</label>
                  <input
                    className='email-form'
                    required
                    type='text'
                    onChange={event => handleEmailContent(event)}
                  ></input>
                </div>
                <div>
                  <button
                    className='edit-student-btn send-email'
                    onClick={() => emailRequest()}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
            <div>
              <button
                className='edit-student-btn'
                onClick={() => openEditPage()}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {props.editOpen && (
        <StudentForm
          skillsList={skillsList}
          getStudentData={props.getStudentData}
          edit={true}
          activeStudentInfo={props.activeStudentInfo}
          closeEditPage={props.closeEditPage}
          closeRightSide={props.closeRightSide}
        />
      )}
    </div>
  );
}

export default CurrentStudent;
