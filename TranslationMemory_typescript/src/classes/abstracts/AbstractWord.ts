export class AbstractWord {

  private _GUID: String;
  private _englisch: String;
  private _german: String;
  private _spanish: String;
  private _french: String;

  constructor() {
    this._GUID = "";
    this._englisch = "";
    this._german = "";
    this._spanish = "";
    this._french = "";
  }

  public getGUID(): String {
    return this._GUID;
  }

  public setGUID(value: String) {
    this._GUID = value;
  }

  public getEnglishWord(): String {
    return this._englisch;
  }

  public setEnglishWord(value: String) {
    this._englisch = value;
  }

  public getGermanWord(): String {
    return this._german;
  }

  public setGermanWord(value: String) {
    this._german = value;
  }

  public getSpanishWord(): String {
    return this._spanish;
  }

  public setSpanishWord(value: String) {
    this._spanish = value;
  }

  public getFrenchWord(): String {
    return this._french;
  }

  public setFrenchWord(value: String) {
    this._french = value;
  }

}