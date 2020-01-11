import axios from 'axios';

export function getStudentList() {
  return axios.get('http://127.0.0.1:5000');
}

export function getSkillsList() {
  return axios.get('http://127.0.0.1:5000/new');
}

export function createNewStudent(obj) {
  return axios.post('http://127.0.0.1:5000/addstudent', obj);
}
