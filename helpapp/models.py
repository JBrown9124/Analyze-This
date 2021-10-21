from django.db import models

class User(object):
    def __init__(self, name:str, user_id:str,
                 location:str, conflict:str):
        self.name = name
        self.user_id = user_id
        self.location = location
        self.conflict = conflict
        

    @staticmethod
    def from_dict(source):
        pass

    def to_dict(self):
        user = {"name":self.name, "user_id":self.user_id, "location":self.location, "conflict": self.conflict}
       
        return user


    def __repr__(self):
        return(
            f'City(\
                name={self.name}, \
                country={self.user_id}, \
                country={self.conflict}, \
                population={self.location}, )'
        )
