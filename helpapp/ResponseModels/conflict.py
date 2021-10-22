class Conflict(object):
    def __init__(self, type: str, description: str, self_danger: bool, others_danger: bool, suicidal: bool):
        self.type = type
        self.description = description
        self.self_danger = self_danger
        self.others_danger = others_danger
        self.suicidal = suicidal

    def to_dict(self):
        conflict = {"type": self.type, "description": self.description, "self_danger": self.self_danger,
                    "others_danger": self.others_danger, "suicidal": self.suicidal}
        return conflict

    def __repr__(self):
        return(f'Conflict(\
            type = {self.type}, \
                description = {self.description}, \
                    self_danger = {self.self_danger}, \
                        others_danger = {self.others_danger},\
                            suicidal = {self.suicidal},)')
