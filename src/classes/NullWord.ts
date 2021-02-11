import { AbstractWord } from './abstracts/AbstractWord';

export class NullWord extends AbstractWord {
  constructor() {
    super();
    this.setGUID('');
    this.setEnglishWord('Keine');
    this.setGermanWord('Keine');
    this.setSpanishWord('Keine');
    this.setFrenchWord('Keine');
  }
}