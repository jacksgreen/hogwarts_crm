from flask import Flask, request
import threading
import time
from flask_cors import CORS
import json
import smtplib

app = Flask(__name__)
CORS(app)

student_1 = {
    'id': 1,
    'first_name': 'Harry',
    'last_name': 'Potter',
    'existing_skill': [{'skill': 'Healing', 'value': '3'}, {'skill': 'Invisibility', 'value': '4'}, {'skill': 'Summoning', 'value': '5'}],
    'desired_skill': [{'skill': 'Possession', 'value': '4'}, {'skill': 'Healing', 'value': '4'}],
    'desired_class': ['Alchemy advanced'],
    'email_address': 'harry@hogwarts.com',
    'created': 'date',
    'last_updated': 'date'
}

student_2 = {
    'id': 2,
    'first_name': 'Ron',
    'last_name': 'Weasley',
    'existing_skill': [{'skill': 'Healing', 'value': '5'}, {'skill': 'Animation', 'value': '1'}, {'skill': 'Poisin', 'value': '3'}],
    'desired_skill': [{'skill': 'Alchemy', 'value': '5'}, {'skill': 'Disintegration', 'value': '1'}, {'skill': 'Healing', 'value': '3'}],
    'desired_class': ['Dating with magic'],
    'email_address': 'ron@hogwarts.com',
    'created': 'date',
    'last_updated': 'date'
}

student_list = [student_1, student_2]

magic_skills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illustion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poisin', 'Possession', 'Self-Detonation', 'Summoning', 'Water Breathing' ]
courses_list = ['Alchemy basics', 'Alchemy advanced', 'Magic for day to day life', 'Magic for medical professionals', 'Dating with magic']

skills_list = [magic_skills, courses_list]

EMAIL_ADDRESS = 'itc.test.bot@gmail.com'
PASSWORD = '*4PfOq77g&1&'

def send_email(subject, msg, send_to):
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.login(EMAIL_ADDRESS, PASSWORD)
    message = 'Subject: {}\n\n{}'.format(subject, msg)
    server.sendmail(EMAIL_ADDRESS, send_to, message)
    print('sent')
    server.quit()

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
        'id': student_list[-1]['id'] + 1,
        'first_name': student_data['firstName'],
        'last_name': student_data['lastName'],
        'existing_skill': student_data['existingSkill'],
        'desired_skill': student_data['desiredSkill'],
        'desired_class': student_data['desiredClass'],
        'email_address': student_data['emailAddress'],
        'created': student_data['created'],
        'last_updated': student_data['lastUpdated']
    }

    student_list.append(new_student)
    send_to = student_data['emailAddress']

    subject = 'Welcome to Hogwarts!'
    msg = f"Hi {student_data['firstName']}. You've been added to the Hogwarts CRM successfully"
    send_email(subject, msg, send_to)

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

@app.route('/email', methods=['POST'])
def student_email():
    email_data = request.get_json('email')['email']
    send_to = email_data['emailAddress']

    subject = email_data['subject']
    msg = email_data['content']
    send_email(subject, msg, send_to)

    return 'success'


if __name__ == "__main__":
    threading.Thread(target=app.run).start()