import requests
import json
from .apikey import api
from typing import Dict, List, Set


class NearestFacilities:
    def __init__(self, location: str, potential_causes: Dict[str, str]):

        self.location = location
        self.potential_causes = potential_causes
        self.response = self.intitialize()

    def get_facility_type(self) -> Set[str]:

        facility_types = []
        for key, value in self.potential_causes.items():
            if value:
                facility_types.append(key + " " + "support")

        return facility_types

    def intitialize(self) -> Dict:

        facility_types: List[str] = self.get_facility_type()
        results = []
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"

        for facility_type in facility_types:

            query = f"{facility_type} in {self.location}"
            r = requests.get(f"{url}query={query}&key={api}")
            json_data = r.json()
            map_results = json_data['results']

            if len(map_results) >= 3:

                closest_facilities_list = [
                    map_results[0], map_results[1], map_results[2]]
                closest_facilities_dict = {
                    "closest_facilities": closest_facilities_list, "facilities_type": facility_type}
                results.append(closest_facilities_dict)

            else:
                closest_dict = {"closest_facilities": [],
                                "facilities_type": facility_type}
                for map_result in map_results:

                    closest_dict["closest_facilities"].append(map_result)
                results.append(closest_dict)
        return results

    def obtain_relevent_data(self):

        return self.response
