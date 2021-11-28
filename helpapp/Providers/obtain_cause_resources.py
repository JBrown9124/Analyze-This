
from ..firestore import db
from ResponseModels.resources import Resources
from typing import Dict, List

def obtain_cause_resources(potential_causes: Dict[str,str]) -> Dict[str, Dict[str, Dict[str, List[Dict[str,str]]]]]:
    resources = Resources()

    for potential_cause_key, potential_cause_value in potential_causes.items():

        if potential_cause_value:

            conflict_resources_collection = db.collection(
                'conflict_resources').document(potential_cause_key).collections()

            for collection in conflict_resources_collection:

                for doc in collection.stream():

                    doc_type = doc.id
                    doc_dict = doc.to_dict()
                    resources.doc_dict = doc_dict
                    resources.doc_type = doc_type
                    resources.potential_cause_key = potential_cause_key

                    resources.store_resource()
    return resources
