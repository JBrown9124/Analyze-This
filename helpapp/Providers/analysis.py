from WordData.life_death_synonyms import life_death_synonyms
from WordData.conflict_type import conflict_type
from WordData.first_person_pronouns import first_person_pronouns
import re

from spellchecker import SpellChecker
from typing import List, Dict
import sys
sys.path.append(
    "C:\\Users\\Jonathan\\Documents\\My_Workspaces\\new_project\\helpapp")


class Analysis(object):
    def __init__(self, description: str):
        self.description = description
        # self.results = {"suicidal":self.is_suicide(),"others_danger":self.others_danger(), "self_danger":self.self_danger(), "type":self.find_type(), "description":self.description}

    def __iter__(self) -> str:
        description: List[str] = self.description.split()
        # spell = SpellChecker(distance=1)

        for i in range(len(description)):
            j = i+1
            k = j+1
            if k <= len(description) - 1:
                yield [description[i], description[j], description[k]]

    def is_suicide(self) -> bool:
        # compare dict values to the string to see if there are words
        # associated to high levels of suicide.

        suicide_words_context: Dict[str, str | dict] = {'bump': {"first_person_pronouns": life_death_synonyms}, 'butcher': first_person_pronouns, 'cut': first_person_pronouns,  
                                                        'finish': life_death_synonyms, 'ice': first_person_pronouns, 'knock': {'first_person_pronouns': life_death_synonyms},
                                                        'murder': first_person_pronouns, 'neutralize': first_person_pronouns,
                                                        'off': first_person_pronouns,
                                                        'waste': first_person_pronouns,
                                                        'whack': first_person_pronouns,
                                                        'claim': {'first_person_pronouns': life_death_synonyms}, 'croak': first_person_pronouns,
                                                        'destroy': {'first_person_pronouns': life_death_synonyms}, 'dispatch': first_person_pronouns,
                                                        'do': 'in', 'kill': first_person_pronouns, 'slay': first_person_pronouns,
                                                        'take': {'first_person_pronouns': life_death_synonyms},
                                                        'annihilate': {'first_person_pronouns': life_death_synonyms}, 'blot': 'out',
                                                        'decimate': {'first_person_pronouns': life_death_synonyms},
                                                        'massacre': {'first_person_pronouns': life_death_synonyms}, 'mow': first_person_pronouns,
                                                        'slaughter': {'first_person_pronouns': life_death_synonyms}, 'smite': {'first_person_pronouns': life_death_synonyms},
                                                        'assassinate': {'first_person_pronouns': life_death_synonyms},
                                                        'execute': {'first_person_pronouns': life_death_synonyms}, 'martyr': first_person_pronouns,
                                                        'terminate': {'first_person_pronouns': life_death_synonyms},
                                                        'euthanize': {'first_person_pronouns': life_death_synonyms}, 'euthanatize': {'first_person_pronouns': life_death_synonyms},
                                                        'put': 'down'}

        conflicts: List[str] = []
        suicide_probability: int = 0

        for word in self:
            # if the description contains a synonym for suicide then we add .50 to probability of suicide.
            if word[0] in suicide_words_context:
                suicide_probability += .50
                # if the synonym as a key in suicide_words_context has a dict for a value then we refer
                # to the first_person_pronouns list to see if the word after suicide synonym is a first person pronoun.

                if type(suicide_words_context[word[0]]) == dict:
                    if word[1] in first_person_pronouns:
                        # If it is a first person pronoun then at .25 probability
                        suicide_probability += .25
                        if word[2] in suicide_words_context[word[0]]['first_person_pronouns']:
                            # If the word in the description after the pronoun is in life_death_synonyms list
                            # then add .25 probability to the suicide_probability
                            suicide_probability += .25
                if type(suicide_words_context[word[0]]) == set:
                    if word[1] in suicide_words_context[word[0]]:
                        suicide_probability += .50
            # if the middle pointer contain a suicide word add .50 probability.           
            if word[1] in suicide_words_context:
                suicide_probability += .50
                # if the last pointer continaers value of suicide word in dict which is eithr a life_death_synonym list or first_person_pronoun list then add .50
                if type(suicide_words_context[word[1]]) == set:
                    if word[2] in suicide_words_context[word[1]]:
                        suicide_probability += .50

        return suicide_probability

    def others_danger(self):
        # compare dict values to the string to see if there are words
        # associated to high levels of danger to others.
        pass

    def self_danger(self):
        # comapre dict values to the string to see if there are words
        # associated to high levels of danger to self.

        # check for nouns related to self, check for nouns related to others
        pass

    def find_type(self) -> List[str]:
        # compare dict values to the string to see what type of conflict the
        # person is dealing with.

        conflicts: List[str] = []
        for word in self:

            if word[0] in conflict_type:
                conflicts.append(conflict_type[word[0]])
            if word[1] in conflict_type:
                conflicts.append(conflict_type[word[1]])
            if word[2] in conflict_type:
                conflicts.append(conflict_type[word[2]])
        return conflicts

    def results(self) -> Dict:
        return self.results


if __name__ == "__main__":
    analysis = Analysis(
        description=u"I want to off myself because i smoke too much weed")

    print(analysis.is_suicide())
    print(analysis.find_type())
