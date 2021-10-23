import re

from spellchecker import SpellChecker
from typing import List, Dict

from helpapp.wordsdata.conflictdata.conflict_type import conflict_type
class Analysis(object):
    def __init__(self, description: str):
        self.description = description
        self.results = {"suicidal":self.is_suicide(),"others_danger":self.others_danger(), "self_danger":self.self_danger(), "type":self.find_type(), "description":self.description}
    def __iter__(self) -> str:
        description:List[str] = self.description.split()
        spell = SpellChecker(distance=1)
        for i in range(len(description)):
            description[i].lower()
            yield spell.candidates(description[i])

    def is_suicide(self) -> bool:
        # compare dict values to the string to see if there are words
        # associated to high levels of suicide.
        first_person_pronouns=['i', 'me', 'my', 'mine','myself']
        life_death_synonyms = ['continuance', 'date', 'duration', 'life', 'span', 'lifetime', 'standing', 'time', 'existence', 'survival', 'being', 'consciousness', 
        'sentience', 'continuance', 'essence', 'aliveness', 'animateness', 'animation', 'continued existence', 'personage', 'subsistence', 'viability', 'breath', 'creation', 
        'presence', 'growth', 'reality', 'living', 'actuality', 'livelihood', 'sustenance', 'existing', 'entity', 'sustainment', 'sustentation', 'substance', 
        'individuality', 'maintenance', 'journey', 'upkeep', 'quiddity', 'mortal', 'coil', 'lifeblood', 'quintessence', 'vitality', 'totality', ]
        
        suicide_words_context:Dict[str, str or dict] = {'bump': {first_person_pronouns:life_death_synonyms}, 'butcher': first_person_pronouns, 'cut': first_person_pronouns,
                         'finish': life_deathc_synonyms, 'ice': first_person_pronouns, 'knock': {first_person_pronouns:life_death_synonyms},
                         'murder': first_person_pronouns, 'neutralize': first_person_pronouns,
                         'off': first_person_pronouns,
                         'waste': first_person_pronouns,
                         'whack': first_person_pronouns,
                         'claim': {first_person_pronouns:life_death_synonyms}, 'croak': first_person_pronouns,
                         'destroy': {first_person_pronouns:life_death_synonyms}, 'dispatch': first_person_pronouns,
                         'do': 'in', 'kill': first_person_pronouns, 'slay': first_person_pronouns,
                         'take': {first_person_pronouns:life_death_synonyms},
                         'annihilate': {first_person_pronouns:life_death_synonyms}, 'blot': 'out',
                         'decimate': {first_person_pronouns:life_death_synonyms},
                         'massacre': {first_person_pronouns:life_death_synonyms}, 'mow': first_person_pronouns,
                         'slaughter': {first_person_pronouns:life_death_synonyms}, 'smite': {first_person_pronouns:life_death_synonyms},
                         'assassinate': {first_person_pronouns:life_death_synonyms},
                         'execute': {first_person_pronouns:life_death_synonyms}, 'martyr': first_person_pronouns,
                         'terminate': {first_person_pronouns:life_death_synonyms},
                         'euthanize': {first_person_pronouns:life_death_synonyms},'euthanatize': {first_person_pronouns:life_death_synonyms},
                         'put': 'down'}
        suicide_words:Dict[str, str or dict] = {'bump': 'off', 'butcher': first_person_pronouns, 'cut': 'down',
                         'finish': 'living', 'ice': 'myself', 'knock': 'off',
                         'murder': 'myself', 'neutralize': 'myself',
                         'off': 'myself',
                         'waste': 'myself',
                         'whack': 'myself',
                         'claim': {'my': 'life'}, 'croak': 'myself',
                         'destroy': {'my': 'life'}, 'dispatch': 'myself',
                         'do': 'in', 'kill': 'myself', 'slay': 'myself',
                         'take': {'my': 'life'},
                         'annihilate': {'my': 'life'}, 'blot': 'out',
                         'decimate': {'my': 'life'},
                         'massacre': {'my': 'life'}, 'mow': {'myself': 'down'},
                         'slaughter': {'my': 'life'}, 'smite': {'my': 'life'},
                         'assassinate': {'my': 'life'},
                         'execute': {'my': 'life'}, 'martyr': 'myself',
                         'terminate': {'my': 'life'},
                         'euthanize': {'my': 'life'},'euthanatize': {'my': 'life'},
                         'put': 'down'}
        conflicts: List[str] = []
        for words in self:
            for word in words:
                if word in conflict_type:
                    conflicts.append(conflict_type[word])

        return conflicts

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
        for words in self:
            for word in words:
                if word in conflict_type:
                    conflicts.append(conflict_type[word])

        return conflicts
    def results(self) -> Dict:
        return self.results

if __name__ == "__main__":
    analysis = Analysis(description=u"I smoke too much weed")

    print(analysis.find_type())
