class Help(object):
    def __init__(self, description: str, analysis_results: dict, facilities: list, resources: list = []):

        self.description = description
        self.resources = resources
        self.analysis_results = analysis_results
        self.facilities = facilities

    def to_dict(self):
        help_dict = {"resources": self.resources, "facilities": self.facilities,
                     "description": self.description, "analysisResults": self.analysis_results}
        return help_dict

    def __repr__(self):
        return(f'Conflict(\
            resources = {self.resources}, \
                description = {self.description}, \
                        facilities = {self.facilities}, \
                   analysisResults = {self.analysis_results},)')
