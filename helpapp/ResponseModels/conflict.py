class Conflict(object):
    def __init__(self, type: str, description: str, suicidal: bool):
        self.type = type
        self.description = description
        
        self.suicidal = suicidal

    def to_dict(self):
        conflict = {"type": self.type, "description": self.description, "suicidal": self.suicidal}
        return conflict

    def __repr__(self):
        return(f'Conflict(\
            type = {self.type}, \
                description = {self.description}, \
                   suicidal = {self.suicidal},)')
