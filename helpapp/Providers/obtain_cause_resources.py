
from ..firestore import db
from typing import Dict, List


def obtain_cause_resources(potential_causes: Dict[str, str]) -> Dict[str, Dict[str, Dict[str, List[Dict[str, str]]]]]:

    response = []
    for potential_cause_key, potential_cause_value in potential_causes.items():

        if potential_cause_value:

            conflict_resources_collection = db.collection(
                'conflict_resources').document(potential_cause_key).collections()
            dict_response = {}

            for collection in conflict_resources_collection:

                collection_name = collection.id
                for doc in collection.stream():

                    doc_dict = doc.to_dict()
                    if collection_name not in dict_response:
                        dict_response[collection_name] = []
                    dict_response[collection_name].append(doc_dict)
            dict_response["resource_type"] = potential_cause_key
            response.append(dict_response)

    return response
