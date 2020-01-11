import React from 'react';
import './styles.css';

function StudentList(props) {
  return (
    <table className='student-table'>
      {props.studentData.map(student => (
        <tr onClick={() => props.chooseStudent(student)}>
          <th>{student.first_name}</th>
          <th>{student.last_name}</th>
        </tr>
      ))}
    </table>
  );
}

export default StudentList;
