import ConsoleHandling from './ConsoleHandling';
import { Word } from './Word';
import { NullWord } from './NullWord';
import { FileHandler } from './FileHandler';
import { WordDAO } from '../types/WordDAO.type';
import { AbstractWord } from './abstracts/AbstractWord';
import { ADMIN } from '../main';
import { TRANSLATOR } from '../main';
import { worddb } from '../main';
import { GenerateUUIDv4 } from '../classes/uuid/GenerateUuid';

export class Methods{

 private static instance : Methods = new Methods()

 private _words: Word[] = [];

 private _countNewWord = 0;


 constructor() {

  if(Methods.instance)
  throw new Error('Use Methods.Instance() instead new Methods()')


  let fileHandler = new FileHandler();
  let wordsJson : WordDAO[] = fileHandler.readArrayFile('../data/wordlist.json');

    for(let word of wordsJson) {
    this._words.push(new Word(word));
     }
    
    }
    public static getInstance() : Methods {
      return Methods.instance
    }

    public async showAllWordsWithITranslations() : Promise<void> {
        
       

        for(let index in this._words) {

        let word : Word = this._words[index];
        let _index : Number = Number.parseInt(index)+1;

        word = word !== undefined ? word : new NullWord();

        ConsoleHandling.printInput(`
        ${_index}.
        Deutsch: ${word.getGermanWord().toString()} 
        Englisch: ${word.getEnglishWord().toString()}
        Spanisch: ${word.getSpanishWord().toString()}
        Französich: ${word.getFrenchWord().toString()}
        \n`);
        
      }
    }   
    
    
    public async showAllWordsWithOutTranslations() : Promise<void> {
        
        let _nullWord : Word = new NullWord();

        for(let index in this._words) {

            let word : Word = this._words[index];  
              
            if 
            (
                word.getEnglishWord().toString() ==  _nullWord.getEnglishWord() ||
                word.getSpanishWord().toString() ==  _nullWord.getSpanishWord() ||
                word.getFrenchWord().toString() ==  _nullWord.getFrenchWord()           
            )
            {

            ConsoleHandling.printInput
            (`            
            Deutsch: ${word.getGermanWord().toString()} 
            Englisch: ${word.getEnglishWord().toString()}
            Spanisch: ${word.getSpanishWord().toString()}
            Französich: ${word.getFrenchWord().toString()}
            `);
            }
          } 
    } 

    
    public async  showNumberofAllWords() : Promise<void> {
        ConsoleHandling.printInput(`\n`);
        console.log (`Es sind insgesamt ${this._words.length} Wörter im Datenbank`);
        
    }

    public async WriteNewWord() : Promise<void> {

        let newWord: String = await ConsoleHandling.question('Wort eingeben: ')
        let fileHandler = new FileHandler();            
        let data = fileHandler.readJSON('../data/wordlist.json');
        let _nullWord : Word = new NullWord();
        
        let newJSONWord = {
                GUID: GenerateUUIDv4(),
                english: _nullWord.getEnglishWord(),
                german: newWord,
                spanish: _nullWord.getSpanishWord(),
                french: _nullWord.getFrenchWord()
        }                      
               
        data.push(newJSONWord);
        ConsoleHandling.printInput('Neues Wort ist eingetragen');

        this.CreateNewWordCounter();

        worddb.showFunctionalities;

    }


    public async CreateNewWordCounter(): Promise<void> {   

        this._countNewWord++;

        if(this._countNewWord++ == 1) {

        ConsoleHandling.printInput(`${ this._countNewWord } neues Wort ist angelegt`);

        } else {
        
        ConsoleHandling.printInput(`${ this._countNewWord } Wörter sind neu angelegt`);
        }
        
        
    }

    public async showPercentageWithOutTranslation(): Promise<void>{

        let _nullWord : Word = new NullWord();


        for(let index in this._words) {
            
            let count : number;
            count = 0;

            let word : Word = this._words[index];  

            if (  word.getEnglishWord().toString() ==  _nullWord.getEnglishWord() )
            {
            
                count++;
            }
            else if ( word.getSpanishWord().toString() ==  _nullWord.getEnglishWord() )
            {
                count++;
            }
            else if (  word.getFrenchWord().toString() ==  _nullWord.getEnglishWord() )
            {
                count++;
            }

            let percentage = (1- count/3)*100;
            let final = percentage.toFixed();
            ConsoleHandling.printInput(`${word.getGermanWord().toString()}: ${ final} %`);        
            
          }  
    }


    public async searchForTranslation() : Promise<void> {

    let language : String = await ConsoleHandling.question('Welche Sprache? ');
    let word : String = await ConsoleHandling.question('Welches Wort? ');

    let translation : AbstractWord = this._words.filter((translation) => translation.getGermanWord().match(new RegExp(`${word}`, 'gi')))[0];   

    ConsoleHandling.printInput('\n');

    translation  = translation !== undefined ? translation : new NullWord();

    switch(language.toLowerCase()){
        case'englisch':
        case'eng':  
        {     
        ConsoleHandling.printInput('Eingabe: ' + word + '\nEnglisch: ' + translation.getEnglishWord().toString());
        }break;
        case'spanisch':
        case'sp': 
        {
        ConsoleHandling.printInput('Eingabe: ' + word + '\nSpanisch: '+  translation.getSpanishWord().toString());
        }break;
        case'französich':
        case'f': 
        {
        ConsoleHandling.printInput('Eingabe: ' + word + '\nFranzösisch: '+ translation.getFrenchWord().toString());
        }break; 

    }worddb.showWordFunctionalities();
   
}

    public async setTranslationTranslator() : Promise<void> {

        this.showAllWordsWithITranslations();

        let fileHandler = new FileHandler(); 
        let word : String = await ConsoleHandling.question('Welches Wort? ');
        let language : String = await ConsoleHandling.question('Welche Sprache? ');
        let newTranslation : String = await ConsoleHandling.question('Neue Übersetzung: ');

        let data = fileHandler.readJSON('../data/wordlist.json');

        let translation : AbstractWord = this._words.filter((translation) => translation.getGermanWord().match(new RegExp(`${word}`, 'gi')))[0];   

        ConsoleHandling.printInput('\n');

        translation  = translation !== undefined ? translation : new NullWord();

        switch(language.toLowerCase()){
            case'englisch':
            case'eng':  
            {
            translation.setEnglishWord(newTranslation);
            ConsoleHandling.printInput('Eingabe: ' + word + '\nEnglisch: ' + translation.getEnglishWord().toString());
            data.push(newTranslation);
            fileHandler.writeFile('../data/wordlist.json', data)
            }break;
            case'spanisch':
            case'sp': 
            {
            translation.setSpanishWord(newTranslation)
            ConsoleHandling.printInput('Eingabe: ' + word + '\nSpanisch: '+  translation.getSpanishWord().toString());
            data.push(newTranslation);
            fileHandler.writeFile('../data/wordlist.json', data)
            }break;
            case'französich':
            case'f': 
            {
            translation.setFrenchWord(newTranslation)
            ConsoleHandling.printInput('Eingabe: ' + word + '\nFranzösisch: '+ translation.getSpanishWord().toString());
            data.push(newTranslation);
            fileHandler.writeFile('../data/wordlist.json', data)
            }break;

        }worddb.showWordFunctionalities();
   
}


    public async CheckUsernameAndPassword() : Promise<void> {

        let username : String = await ConsoleHandling.question('Username: ');
    
        if(username == ADMIN.adminname){
    
            let password : String = await ConsoleHandling.question('Passwort: ');
    
            if(password == ADMIN.adminpassword){
    
            console.log('\nAnmeldung als Admin erfolgreich!');
            worddb.showAdminFunctionalities();
        }else
            {
            console.log('\nAdmins Passwort inkorrekt');
            worddb.showFunctionalities();
            }
        }
        else if (username == TRANSLATOR.translatorname) {
                
            let password : String = await ConsoleHandling.question('Passwort: ');
        
            if(password == TRANSLATOR.translatorpassword){
        
            console.log('\nAnmeldung als Übersetzer erfolgreich!');
            worddb.showTranslatorFunctionalities();
            }
            else {
            console.log('\nÜbersetzers Passwort inkorrekt');
            worddb.showFunctionalities();
            }
        } 
        else {
        console.log('\nAdmins Username inkorrekt');
        worddb.showFunctionalities();
        }

    }

}
export default Methods.getInstance();