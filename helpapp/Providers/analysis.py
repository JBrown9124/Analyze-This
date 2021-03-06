import sys
sys.path.append(
    "C:\\Users\\Jonathan\\Documents\\My_Workspaces\\new_project\\helpapp")
from WordData.anger_words import anger_words
from WordData.suicide_words import suicide_words
from WordData.others_danger_context import others_danger_context
from WordData.people_synonyms_pronouns import people_synonyms_pronouns
from WordData.suicide_words_context import suicide_words_context
from WordData.first_person_pronouns import first_person_pronouns
from WordData.conflict_type import conflict_type
from WordData.life_death_synonyms import life_death_synonyms
from typing import List, Dict
from spellchecker import SpellChecker
from  WordData.very_synonyms import very_synonyms
import re




class Analysis(object):
    def __init__(self, description: str):
        self.description = description
        self.potential_causes = {}
       

    def __iter__(self) -> List[str]:
        # Turn string to lowercase.
        description = self.description.lower()
        # Remove all special characters and numbers from string.
        description = re.sub('[^a-zA-Z ]', '', description)
        # Every word becomes an element in a list.
        description: List[str] = description.split()
        # spell = SpellChecker(distance=1)
        i = 0
        j = i + 1
        k = j + 1
        # This while loop ensures we do not miss any elements.

        while i <= len(description) - 1:

            output = []

            output.append(description[i])
            i += 1

            if j <= len(description) - 1:
                output.append(description[j])
                j += 1

            if k <= len(description) - 1:
                output.append(description[k])
                k += 1

            yield output

            output = []

    def is_suicide(self) -> bool:
        # compare dict values to the string to see if there are words
        # associated to high levels of suicide.

        suicide_mentioned: int = 0

        suicide_probability: int = 0
        # words = [description[i], description[j], description[k]]
        for words in self:
            # if the first word in words contains a synonym for suicide then we add .50 to probability of suicide.
            first_word = words[0]
            if first_word in suicide_words_context:

                # if the synonym as a key in suicide_words_context has a dict for a value then we refer
                # to the first_person_pronouns list to see if the word after suicide synonym is a first person pronoun.
                first_word_value_type = type(suicide_words_context[words[0]])
                first_word_value = suicide_words_context[words[0]]
                if first_word_value_type == dict:
                    # if the lenght of words is greater than or equal to 2 and the second word in words is a first person pronoun then go into this condition ex. "claim my"
                    if len(words) >= 2 and words[1] in first_person_pronouns:
                        # if the lenght of words is greater than or equal to 3 and the third word in words is a in the value of dict[words[0]][words[1]]then go into this condition ex. "claim my life"
                        # Value could be a set of words synonymous with life and death or a string.
                        first_word_second_word_value = suicide_words_context[words[0]
                                                                             ]['first_person_pronouns']
                        if len(words) >= 3 and words[2] in first_word_second_word_value:
                            suicide_mentioned += 1
                            suicide_probability += 1.0
                            continue
                    # if words is length of 3 second word in words is a key in value of suicide_words_context[first_word]
                    elif len(words) >= 2 and words[1] in first_word_value:
                        # if 3rd word is in value of dict[first_Word][second_word] then we say suicidal_probability+=1.0. ex: "want to die" = high probability of suicide
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

            if len(words) >= 2 and words[1] in suicide_words_context:
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
            # The conditions below are to catch anywords synonymous with suicide that are not caught by our context loop.
            # Suicide probability only increased by .25 because they are not in context of the person's self. ex of word synonymous with suicide:"Kill"
            # ex. of words in context of the person's self in context with synonym of suicide: ex. kill my self'
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
                    suicide_probability += .50
                if len(words) == 3 and words[2] in suicide_words:
                    suicide_mentioned += 1
                    suicide_probability += .50
            if len(words) == 2 and words[1] in life_death_synonyms:
                suicide_probability += .25

                if len(words) == 2 and words[0] in suicide_words:
                    suicide_probability += .50
                    suicide_mentioned += 1
                if len(words) == 3 and words[2] in suicide_words:
                    suicide_probability += .50
                    suicide_mentioned += 1
            if len(words) == 3 and words[2] in life_death_synonyms:
                suicide_probability += .25
                if len(words) == 2 and words[0] in suicide_words:
                    suicide_probability += .50
                    suicide_mentioned += 1
                if len(words) == 3 and words[1] in suicide_words:
                    suicide_probability += .50
                    suicide_mentioned += 1
        suicide_results = {'suicide_probability': suicide_probability if suicide_probability <
                           1.00 else 1.00, 'is_suicide': suicide_probability >= .75, 'suicide_mentioned': suicide_mentioned}
        self.potential_causes["suicide"] = "suicide" if suicide_results['is_suicide'] else None
        return suicide_results

    def is_danger(self):
        danger_probability: int = 0
        danger_mentioned: int = 0
        # words = [description[i], description[j], description[k]]
        for words in self:
            # if the first word in words contains a synonym for suicide then we add .50 to probability of suicide.

            if words[0] in others_danger_context:

                # if the synonym as a key in others_danger_context has a dict for a value then we refer
                # to the people_synonyms_pronouns list to see if the word after suicide synonym is a first person pronoun.
                first_word_value_type = type(others_danger_context[words[0]])
                first_word_value = others_danger_context[words[0]]
                if first_word_value_type == dict:
                    # if the lenght of words is greater than or equal to 2 and the second word in words is a first person pronoun then go into this condition ex. "claim my"
                    if len(words) >= 2 and words[1] in people_synonyms_pronouns:
                        # if the lenght of words is greater than or equal to 3 and the third word in words is a in the value of dict[words[0]][words[1]]then go into this condition ex. "claim my life"
                        # Value could be a set of words synonymous with life and death or a string.
                        first_word_second_word_value = others_danger_context[words[0]
                                                                             ]['people_synonyms_pronouns']
                        if len(words) >= 3 and words[2] in first_word_second_word_value:
                            danger_mentioned += 1
                            danger_probability += 1.0
                            continue
                    # if words is length of 3 second word in words is a key in value of others_danger_context[first_word]
                    elif len(words) >= 2 and words[1] in first_word_value:
                        # if 3rd word is in value of dict[first_Word][second_word] then we say suicidal_probability+=1.0. ex: "want to die" = high probability of suicide
                        first_word_second_word_value = others_danger_context[words[0]][words[1]]
                        if len(words) >= 3 and words[2] in first_word_second_word_value:
                            danger_mentioned += 1
                            danger_probability += 1.0
                            continue
                # if the word after first word in words has a set value in our dict go into this condition.
                elif first_word_value_type == set:
                    # if the seond word in words in our value (set) then add probability. ex. Off myself.
                    if len(words) >= 2 and words[1] in first_word_value:
                        danger_mentioned += 1
                        danger_probability += 1
                        continue
                # if the others_danger_context[first_word] value is a string
                elif first_word_value_type == str:
                    if len(words) >= 2 and words[1] == first_word_value:
                        danger_mentioned += 1
                        danger_probability += 1.0
                        continue
            # if the middle pointer contain a suicide word add .50 probability.

            if len(words) >= 2 and words[1] in others_danger_context:
                second_word_value_type = type(others_danger_context[words[1]])
                second_word_value = others_danger_context[words[1]]
                # if the last pointer continaers value of suicide word in dict which is eithr a life_death_synonym list or first_person_pronoun list then add .50
                if second_word_value_type == set:
                    if len(words) >= 3 and words[2] in second_word_value:
                        danger_mentioned += 1
                        danger_probability += 1.0
                        continue
                if second_word_value_type == str:
                    if len(words) >= 3 and words[2] == second_word_value:
                        danger_mentioned += 1
                        danger_probability += 1.0
                        continue
            # The conditions below are to catch anywords synonymous with anger deteriminant words that are not caught by our context loop.
            # Danger probability only increased by .25 because they are not in context of the person's self. ex of word synonymous with anger:"Kill"
            # ex. of words in context of the person's self in context with synonym of anger: ex. kill others'
          
            if len(words) == 2 and words[1] in anger_words:
                danger_probability += .50
            if len(words) == 3 and words[2] in anger_words:
                danger_probability += .50
            if words[0] in anger_words:
                danger_probability += .50
            if len(words) == 2 and words[1] in anger_words:
                danger_probability += .50
            if len(words) == 3 and words[2] in anger_words:
                danger_probability += .50
            
        danger_results = {'danger_probability': danger_probability if danger_probability <
                          1.00 else 1.00, 'is_danger': danger_probability >= .50, 'danger_mentioned': danger_mentioned}
        self.potential_causes["anger"] = "anger" if danger_results['is_danger'] else None
        return danger_results

    def find_causes(self) -> List[str]:
        # compare dict values to the string to see what type of conflict the
        # person is dealing with.

        for words in self:

            if words[0] in conflict_type and words[0] not in self.potential_causes:

                self.potential_causes[conflict_type[words[0]]] = words[0]

            if len(words) >= 2 and words[1] in conflict_type and words[1] not in self.potential_causes:
                self.potential_causes[conflict_type[words[1]]] = words[1]
            if len(words) >= 3 and words[2] in conflict_type and words[2] not in self.potential_causes:
                self.potential_causes[conflict_type[words[2]]] = words[2]

        return self.potential_causes

    def results(self) -> Dict:
        results = {'suicide_stats': self.is_suicide(), 'danger_stats': self.is_danger(
        ), 'potential_causes': self.find_causes()}
        return results


if __name__ == "__main__":
    analysis = Analysis(
        description=u"fuck fuck fuck fuck")

    print(analysis.results())
