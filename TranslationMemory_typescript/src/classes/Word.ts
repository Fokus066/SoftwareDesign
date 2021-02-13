import { WordDAO } from "../types/WordDAO.type"
import { AbstractWord } from "../classes/abstracts/AbstractWord";

export class Word extends AbstractWord {


  constructor(word: WordDAO) {
    super();
    this.setGUID(word.GUID);
    this.setEnglishWord(word.english);
    this.setGermanWord(word.german);
    this.setSpanishWord(word.spanish);
    this.setFrenchWord(word.french);
    
  }
}