class Help(object):
    def __init__(self, description: str, analysis_results: dict, location: str, resources: list = []):

        self.description = description
        self.resources = resources
        self.analysis_results = analysis_results
        self.location = location

    def to_dict(self):
        help_dict = {"resources": self.resources, "location": self.location,
                     "description": self.description, "analysisResults": self.analysis_results}
        return help_dict

    def __repr__(self):
        return(f'Conflict(\
            resources = {self.resources}, \
                description = {self.description}, \
                        description = {self.location}, \
                   analysisResults = {self.analysis_results},)')
