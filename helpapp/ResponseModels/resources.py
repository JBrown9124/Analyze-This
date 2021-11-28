from typing import Dict, List


class Resources(object):
    def __init__(self, doc_dict: Dict[str, str] = {}, doc_type: str = "", potential_cause_key: str = ""):
        self.doc_dict = doc_dict
        self.doc_type = doc_type
        self.potential_cause_key = potential_cause_key
        self.data = []

    def store_resource(self) -> None:

        resource = {self.doc_type: [{"name": name, "url": url}
                         for name, url in self.doc_dict.items()]}
        resource["resource_type"] = self.potential_cause_key
        self.data.append(resource)
