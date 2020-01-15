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
    'existing_skill': [{'skill': 'Healing', 'value': '3'}, {'skill': 'Invisibility', 'value': '4'}, {'skill': 'Summoning', 'value': '5'}],
    'desired_skill': [{'skill': 'Possession', 'value': '4'}, {'skill': 'Healing', 'value': '4'}],
    'desired_class': ['Alchemy advanced'],
    'created': 'date',
    'last_updated': 'date'
}

student_2 = {
    'id': 'b2',
    'first_name': 'Ron',
    'last_name': 'Weasley',
    'existing_skill': [{'skill': 'Healing', 'value': '5'}, {'skill': 'Animation', 'value': '1'}, {'skill': 'Poisin', 'value': '3'}],
    'desired_skill': [{'skill': 'Alchemy', 'value': '5'}, {'skill': 'Disintegration', 'value': '1'}, {'skill': 'Healing', 'value': '3'}],
    'desired_class': ['Dating with magic'],
    'created': 'date',
    'last_updated': 'date'
}

student_list = [student_1, student_2]

magic_skills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illustion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poisin', 'Possession', 'Self-Detonation', 'Summoning', 'Water Breathing' ]
courses_list = ['Alchemy basics', 'Alchemy advanced', 'Magic for day to day life', 'Magic for medical professionals', 'Dating with magic']

skills_list = [magic_skills, courses_list]

@app.route("/")
def hello():
    student_list_json = json.dumps(student_list)
    return student_list_json

@app.route("/new")
def send_list():
    skills_list_json = json.dumps(skills_list)
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
    print(new_student)
    student_list.append(new_student)
    return 'success'

@app.route('/addstudent/<id_key>', methods=['PUT'])
def edit_student(id_key):
    edit_data = request.get_json('id')
    for student in student_list:
        if student['id'] == edit_data['id']:
            index = student_list.index(student)
            edited_student = {
                'id': edit_data['id'],
                'first_name': edit_data['firstName'],
                'last_name': edit_data['lastName'],
                'existing_skill': edit_data['existingSkill'],
                'desired_skill': edit_data['desiredSkill'],
                'desired_class': edit_data['desiredClass'],
                'created': edit_data['created'],
                'last_updated': edit_data['lastUpdated']
            }
            student_list[index] = edited_student
    return 'edit success'

if __name__ == "__main__":
    threading.Thread(target=app.run).start()