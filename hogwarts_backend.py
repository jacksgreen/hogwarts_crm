from flask import Flask, request
import threading
import time
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

student_1 = {
    'id': 'a1',
    'first_name': 'Harry',
    'last_name': 'Potter',
    'existing_skill': ['none'],
    'desired_skill': ['none'],
    'desired_class': ['none'],
    'created': 'date',
    'last_updated': 'date'
}

student_2 = {
    'id': 'b2',
    'first_name': 'Ron',
    'last_name': 'Weasley',
    'existing_skill': ['none'],
    'desired_skill': ['none'],
    'desired_class': ['none'],
    'created': 'date',
    'last_updated': 'date'
}

student_list = [student_1, student_2]

magic_skills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illustion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poisin', 'Possession', 'Self-Detonation', 'Summoning', 'Water Breathing' ]
courses_list = ['Alchemy basics', 'Alchemy advanced', 'magic for day to day life', 'magic for medical professionals', 'dating with magic']

skills_list = [magic_skills, courses_list]

@app.route("/")
def hello():
    student_list_json = json.dumps(student_list)
    return student_list_json

@app.route("/new")
def send_list():
    skills_list_json = json.dumps(skills_list)
    print('here')
    return skills_list_json

@app.route('/addstudent', methods=['POST'] )
def add_student():
    student_data = request.get_json('firstName')
    new_student = {
        'id': student_data['id'],
        'first_name': student_data['firstName'],
        'last_name': student_data['lastName'],
        'existing_skill': student_data['existingSkill'],
        'desired_skill': student_data['desiredSkill'],
        'desired_class': student_data['desiredClass'],
        'created': student_data['created'],
        'last_updated': student_data['lastUpdated']
    }
    student_list.append(new_student)
    return 'success'

@app.route('/addstudent/<id_key>', methods=['PUT'])
def edit_student(id_key):
    edit_data = request.get_json()
    for student in student_list:
        if student['id'] == edit_data['id']:
            index = student_list.index(student)
            edited_student = {
                'id': edit_data['id'],
                'first_name': edit_data['editFirstName'],
                'last_name': edit_data['editLastName'],
                'existing_skill': edit_data['editExistingSkill'],
                'desired_skill': edit_data['editDesiredSkill'],
                'desired_class': edit_data['editDesiredClass'],
                'created': edit_data['created'],
                'last_updated': edit_data['lastUpdated']
            }
            print(edited_student)
            student_list[index] = edited_student
    return 'edit success'

if __name__ == "__main__":
    threading.Thread(target=app.run).start()
    time.sleep(0.5)
    # response = requests.get('http://127.0.0.1:5000')