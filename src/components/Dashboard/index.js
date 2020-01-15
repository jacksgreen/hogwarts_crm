import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './styles.css';

function Dashboard(props) {
  let colorList = [
    '#6fc3df',
    '#e6ffff',
    '#ffe64d',
    '#df740c',
    '#FED6FA',
    '#6fc3df',
    '#e6ffff',
    '#ffe64d',
    '#df740c',
    '#FED6FA',
    '#6fc3df',
    '#e6ffff',
    '#ffe64d',
    '#df740c',
    '#FED6FA',
    '#6fc3df',
    '#e6ffff',
    '#ffe64d',
    '#df740c',
    '#FED6FA'
  ];

  let studentSkillsObj = {};
  let studentDesiredObj = {};

  props.studentData.forEach(student => {
    student.existing_skill.forEach(skill => {
      let label = skill.skill;
      studentSkillsObj[label] = studentSkillsObj[label] + 1 || 1;
    });
  });

  props.studentData.forEach(student => {
    student.desired_skill.forEach(skill => {
      let label = skill.skill;
      studentDesiredObj[label] = studentDesiredObj[label] + 1 || 1;
    });
  });

  let skillsData = {
    labels: Object.keys(studentSkillsObj),
    datasets: [
      {
        label: 'Student Skillz',
        data: Object.values(studentSkillsObj),
        backgroundColor: colorList
      }
    ]
  };
  let desiredData = {
    labels: Object.keys(studentDesiredObj),
    datasets: [
      {
        label: 'Desired Skillz',
        data: Object.values(studentDesiredObj),
        backgroundColor: colorList
      }
    ]
  };
  return (
    <div className='dashboard-wrapper'>
      <div className='chart-wrapper'>
        <div className='chart-label'>Student Skillz</div>
        <Doughnut data={skillsData} />
      </div>
      <div className='chart-wrapper'>
        <div className='chart-label'>Desired Skillz</div>
        <Doughnut data={desiredData} />
      </div>
    </div>
  );
}

export default Dashboard;
