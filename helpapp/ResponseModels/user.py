class User(object):
    def __init__(self, name: str, user_id: str,
                 location: dict, conflict: dict):
        self.name = name
        self.user_id = user_id
        self.location = location
        self.conflict = conflict

    @staticmethod
    def from_dict(source):
        pass

    def to_dict(self):
        user = {"name": self.name, "user_id": self.user_id,
                "location": self.location, "conflict": self.conflict}

        return user

    def __repr__(self):
        return(
            f'User(\
                name={self.name}, \
                user_id={self.user_id}, \
                location={self.conflict}, \
                conlfict={self.location}, )'
        )
