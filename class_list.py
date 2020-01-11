class Student:
    def __init__(self, id, first_name, last_name, creation_time, last_update_time, existing_magic_skillz, desired_magic_skills, interested_in_course):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.creation_time = creation_time
        self.last_update_time = last_update_time
        self.existing_magic_skillz = existing_magic_skillz
        self.desired_magic_skillz = desired_magic_skills
        self.interested_in_course = interested_in_course

magic_skills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illustion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poisin', 'Possession', 'Self-Detonation', 'Summoning', 'Water Breathing' ]
courses_list = ['Alchemy basics', 'Alchemy advanced', 'magic for day to day life', 'magic for medical professionals', 'dating with magic']