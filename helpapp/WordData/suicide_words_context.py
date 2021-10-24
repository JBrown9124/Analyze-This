from .life_death_synonyms import life_death_synonyms
from .first_person_pronouns import first_person_pronouns
from typing import List, Dict, Union
suicide_words_context: Dict[str, Union[Dict[str,set],str,set]] = {'bump': {"first_person_pronouns": life_death_synonyms}, 'butcher': first_person_pronouns, 'cut': first_person_pronouns,  
                                                        'finish': life_death_synonyms, 'ice': first_person_pronouns, 'knock': {'first_person_pronouns': life_death_synonyms},
                                                        'murder': first_person_pronouns, 'neutralize': first_person_pronouns,
                                                        'off': first_person_pronouns,
                                                        'live':'anymore',
                                                        'end':{'first_person_pronouns': life_death_synonyms}, 'hadnt':'been', 'hadnt':{'been':life_death_synonyms},
                                                        'waste': first_person_pronouns, 'first_person_pronouns': life_death_synonyms, 'first_person_pronouns': {'were':life_death_synonyms}, 'were':life_death_synonyms,
                                                        'whack': first_person_pronouns, 'want':{'to':life_death_synonyms},
                                                        'claim': {'first_person_pronouns': life_death_synonyms}, 'croak': first_person_pronouns,
                                                        'destroy': {'first_person_pronouns': life_death_synonyms}, 'dispatch': first_person_pronouns,
                                                        'do': 'in','do':{'first_person_pronouns': life_death_synonyms}, 'kill': first_person_pronouns, 'slay': first_person_pronouns,
                                                        'take': {'first_person_pronouns': life_death_synonyms},
                                                        'annihilate': {'first_person_pronouns': life_death_synonyms}, 'blot': 'out',
                                                        'decimate': {'first_person_pronouns': life_death_synonyms},
                                                        'massacre': {'first_person_pronouns': life_death_synonyms}, 'mow': first_person_pronouns,
                                                        'slaughter': {'first_person_pronouns': life_death_synonyms}, 'smite': {'first_person_pronouns': life_death_synonyms},
                                                        'assassinate': {'first_person_pronouns': life_death_synonyms},
                                                        'execute': {'first_person_pronouns': life_death_synonyms}, 'martyr': first_person_pronouns,
                                                        'terminate': {'first_person_pronouns': life_death_synonyms},
                                                        'euthanize': {'first_person_pronouns': life_death_synonyms}, 'euthanatize': {'first_person_pronouns': life_death_synonyms},
                                                        'put': 'down','live':'anymore', 'to':'die', 'shoot': first_person_pronouns, 'gag':first_person_pronouns, 'stab':first_person_pronouns}
