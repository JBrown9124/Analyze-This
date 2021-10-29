class Location(object):
    def __init__(self, address: str, city: str, state: str, zipcode: int):
        self.address = address
        self.city = city
        self.state = state
        self.zipcode = zipcode

    def to_dict(self):
        location = {"address": self.address, "city": self.city,
                    "state": self.state, "zipcode": self.zipcode}
        return location

    def __repr__(self):
        return(f'Location(\
            address = {self.address}, \
                city = {self.city}, \
                    state = {self.state}, \
                        zipcode = {self.zipcode},)')
                        