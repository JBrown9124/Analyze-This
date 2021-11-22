import requests
import json
from .apikey import api
from typing import Dict, List, Set


class GoogleMaps:
    def __init__(self, location: str, potential_causes: Dict[str, str]):
        self.location = location
        self.potential_causes = potential_causes
        self.response = self.intitialize()

    def get_facility_type(self) -> Set[str]:
        facility_types = set()

        if "danger" in self.potential_causes:
            facility_types.add("anger managment")
        if "suicide" in self.potential_causes:
            facility_types.add("suicide support")
        if "addiction" in self.potential_causes:
            facility_types.add("addiction")
        return facility_types

    def intitialize(self) -> Dict:
        facility_types: Set[str] = self.get_facility_type()
        result = []
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"

        for facility_type in facility_types:
            query = f"{facility_type} in {self.location}"
            r = requests.get(f"{url}query={query}&key={api}")
            json_data = r.json()
            map_results = json_data['results']
            closest_three = {facility_type: [
                map_results[0], map_results[1], map_results[2]]}
            result.append(closest_three)

        return result

    def obtain_relevent_data(self) -> Dict[List[Dict]]:
        return self.response
