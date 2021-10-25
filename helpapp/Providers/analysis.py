
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
from WordData.suicide_words import suicide_words
class Analysis(object):
    def __init__(self, description: str):
        self.description = description
       
        # self.results = {"suicidal":self.is_suicide(),"others_danger":self.others_danger(), "self_danger":self.self_danger(), "type":self.find_type(), "description":self.description}

    def __iter__(self) -> List[str]:
        description = self.description.lower()
        description= re.sub('[^a-zA-Z ]','',description)
        description: List[str] = description.split()
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
        
        j = 1
        k = 2
        if len(description) > 3:
            for i, word in enumerate(description):
                if k <= len(description)-1:
                    yield [description[i], description[j], description[k]]
                    j+=1
                    k+=1

    def is_suicide(self) -> bool:
        # compare dict values to the string to see if there are words
        # associated to high levels of suicide.

        suicide_mentioned:int = 0
       
        suicide_probability: int = 0
        # words = [description[i], description[j], description[k]]
        for words in self:
            # if the first word in words contains a synonym for suicide then we add .50 to probability of suicide.
            
            if words[0] in suicide_words_context:
                
                # if the synonym as a key in suicide_words_context has a dict for a value then we refer
                # to the first_person_pronouns list to see if the word after suicide synonym is a first person pronoun.
                first_word_value_type = type(suicide_words_context[words[0]])
                first_word_value = suicide_words_context[words[0]]
                if first_word_value_type  == dict:
                    # if the lenght of words is greater than or equal to 2 and the second word in words is a first person pronoun then go into this condition ex. "claim my"
                    if len(words) >= 2 and words[1] in first_person_pronouns:
                        # if the lenght of words is greater than or equal to 3 and the third word in words is a in the value of dict[words[0]][words[1]]then go into this condition ex. "claim my life"
                        # Value could be a set of words synonymous with life and death or a string.
                        first_word_second_word_value = suicide_words_context[words[0]]['first_person_pronouns']
                        if len(words) >= 3 and words[2] in first_word_second_word_value:
                            suicide_mentioned += 1
                            suicide_probability += 1.0
                            continue
                    #if words is length of 3 second word in words is a key in value of suicide_words_context[first_word]
                    elif len(words) >= 2 and words[1] in first_word_value:
                        #if 3rd word is in value of dict[first_Word][second_word] then we say suicidal_probability+=1.0. ex: "want to die" = high probability of suicide
                        first_word_second_word_value = suicide_words_context[words[0]][words[1]]
                        if len(words) >= 3 and words[2] in first_word_second_word_value:
                            suicide_mentioned += 1
                            suicide_probability += 1.0
                            continue
                # if the word after first word in words has a set value in our dict go into this condition.
                elif first_word_value_type == set:
                    # if the seond word in words in our value (set) then add probability. ex. Off myself.
                    if len(words) >= 2 and words[1] in first_word_value:
                        suicide_mentioned += 1
                        suicide_probability += 1
                        continue
                # if the suicide_words_context[first_word] value is a string
                elif first_word_value_type == str:
                    if len(words) >= 2 and words[1] == first_word_value:
                        suicide_mentioned += 1
                        suicide_probability += 1.0
                        continue
            # if the middle pointer contain a suicide word add .50 probability.           
            
            if  len(words) >= 2 and words[1] in suicide_words_context:
                second_word_value_type = type(suicide_words_context[words[1]])
                second_word_value = suicide_words_context[words[1]]
                # if the last pointer continaers value of suicide word in dict which is eithr a life_death_synonym list or first_person_pronoun list then add .50
                if second_word_value_type == set:
                    if len(words) >= 3 and words[2] in second_word_value:
                        suicide_mentioned += 1
                        suicide_probability += 1.0
                        continue
                if second_word_value_type == str:
                    if len(words) >= 3 and words[2] == second_word_value:
                        suicide_mentioned += 1
                        suicide_probability += 1.0
                        continue
            if words[0] in suicide_words:
                suicide_probability += .25
            if len(words) == 2 and words[1] in suicide_words:
                suicide_probability += .25
            if len(words) == 3 and words[2] in suicide_words:
                suicide_probability += .25
            if words[0] in life_death_synonyms:
                suicide_probability += .25
                if len(words) == 2 and words[1] in suicide_words:
                    suicide_mentioned += 1
                    suicide_probability +=.50
                if len(words) == 3 and words[2] in suicide_words:
                    suicide_mentioned += 1
                    suicide_probability +=.50
            if len(words) == 2 and words[1] in life_death_synonyms:
                suicide_probability += .25
                
                if len(words) == 2 and words[0] in suicide_words:
                    suicide_probability +=.50
                    suicide_mentioned += 1
                if len(words) == 3 and words[2] in suicide_words:
                    suicide_probability +=.50
                    suicide_mentioned += 1
            if len(words) == 3 and words[2] in life_death_synonyms:
                suicide_probability += .25
                if len(words) == 2 and words[0] in suicide_words:
                    suicide_probability +=.50
                    suicide_mentioned += 1
                if len(words) == 3 and words[1] in suicide_words:
                    suicide_probability +=.50
                    suicide_mentioned += 1
        suicide_results = {'suicide_probability':suicide_probability if suicide_probability < 1.00 else 1.00, 'is_suicide':suicide_probability>=.75, 'suicide_mentioned':suicide_mentioned}
        return suicide_results

    def others_danger(self):
        # compare dict values to the string to see if there are words
        # associated to high levels of danger to others.
        pass

    def self_danger(self):
        # comapre dict values to the string to see if there are words
        # associated to high levels of danger to self.

        # check for nouns related to self, check for nouns related to others
        pass

    def find_causes(self) -> List[str]:
        # compare dict values to the string to see what type of conflict the
        # person is dealing with.

        potential_causes: set[str] = []
        for words in self:

            if words[0] in conflict_type:
                potential_causes.append({words[0]:conflict_type[words[0]]})
            if len(words)>= 2 and words[1] in conflict_type:
                potential_causes.append({words[1]:conflict_type[words[1]]})
            if len(words) >=3 and words[2] in conflict_type:
                potential_causes.append({words[2]:conflict_type[words[2]]})
        return list(potential_causes)

    def results(self) -> Dict:
        results = {'is_suicide': self.is_suicide(), 'potential_causes': self.find_causes()}
        return results

if __name__ == "__main__":
    analysis = Analysis(
        description=u"life feels pointless")

    print(analysis.results())
