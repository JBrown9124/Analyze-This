
import re

from spellchecker import SpellChecker
from typing import List, Dict
import sys
sys.path.append(
    "C:\\Users\\Jonathan\\Documents\\My_Workspaces\\new_project\\helpapp")
from WordData.life_death_synonyms import life_death_synonyms
from WordData.conflict_type import conflict_type
from WordData.first_person_pronouns import first_person_pronouns
from WordData.suicide_words_context import suicide_words_context
class Analysis(object):
    def __init__(self, description: str):
        self.description = description
        # self.results = {"suicidal":self.is_suicide(),"others_danger":self.others_danger(), "self_danger":self.self_danger(), "type":self.find_type(), "description":self.description}

    def __iter__(self) -> List[str]:
        description: List[str] = self.description.split()
        # spell = SpellChecker(distance=1)
        i=0
        j = i+1
        k = j+1
        while i <= len(description) - 1:
            
            output=[]
           
            output.append(description[i])
            i += 1
               
            if j <= len(description)-1:
                output.append(description[j])
                i += 1
                
            if k <= len(description)-1:
                output.append(description[k])
                i += 1
                
            yield output
            j = i+1
            k = j+1
            output = []
            

    def is_suicide(self) -> bool:
        # compare dict values to the string to see if there are words
        # associated to high levels of suicide.

        
        conflicts: List[str] = []
        suicide_probability: int = 0
        # words = [description[i], description[j], description[k]]
        for words in self:
            # if the description contains a synonym for suicide then we add .50 to probability of suicide.
            if words[0] in suicide_words_context:
                suicide_probability += .50
                # if the synonym as a key in suicide_words_context has a dict for a value then we refer
                # to the first_person_pronouns list to see if the word after suicide synonym is a first person pronoun.

                if type(suicide_words_context[words[0]]) == dict:
                    if len(words) >= 2 and words[1] in first_person_pronouns:
                        # If it is a first person pronoun then at .25 probability
                       
                        if len(words) >= 3 and words[2] in suicide_words_context[words[0]]['first_person_pronouns']:
                            # If the word in the description after the pronoun is in life_death_synonyms list
                            # then add .25 probability to the suicide_probability
                            suicide_probability += .75
                # if the word after first word in words has a set value in our dict go into this condition.
                if type(suicide_words_context[words[0]]) == set:
                    # if the word after our first word in words in our value which is a set then add probability. ex. Off myself.
                    if len(words) >= 2 and words[1] in suicide_words_context[words[0]]:
                        suicide_probability += .50
                if type(suicide_words_context[words[0]]) == str:
                    if len(words) >= 3 and words[2] == suicide_words_context[words[0]]:
                        suicide_probability += .50
            # if the middle pointer contain a suicide word add .50 probability.           
            if  len(words) >= 2 and words[1] in suicide_words_context:
                suicide_probability += .50
                # if the last pointer continaers value of suicide word in dict which is eithr a life_death_synonym list or first_person_pronoun list then add .50
                if type(suicide_words_context[words[1]]) == set:
                    if len(words) >= 3 and  words[2] in suicide_words_context[words[1]]:
                        suicide_probability += .50
                if type(suicide_words_context[words[1]]) == str:
                    if len(words) >= 3 and words[2] == suicide_words_context[words[1]]:
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

        conflicts: set[str] = set()
        for words in self:

            if words[0] in conflict_type:
                conflicts.add(conflict_type[words[0]])
            if len(words)>= 2 and words[1] in conflict_type:
                conflicts.add(conflict_type[words[1]])
            if len(words) >=3 and words[2] in conflict_type:
                conflicts.add(conflict_type[words[2]])
        return conflicts

    def results(self) -> Dict:
        return self.results


if __name__ == "__main__":
    analysis = Analysis(
        description=u"I cut a piece of paper today weed I cut myself I cut I cut I cut I cut I cut I cut I cut I cut I cut I")

    print(analysis.is_suicide())
    print(analysis.find_type())
