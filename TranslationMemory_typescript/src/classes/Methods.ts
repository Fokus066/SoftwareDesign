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
import { Language } from '../classes/Language';

export class Methods {

    private static instance: Methods = new Methods()

    private _words: Word[] = [];
    private _nullWord: Word = new NullWord();
    private _wordData: any;
    private _languageData: any;
    private _fileHandler: any;
    private _countNewWordUser = 0;
    private _countNewWordTranslator = 0;
    private _countTranslation = 0;
    private _TranslationSignedIn = false;

    constructor() {

        if (Methods.instance)
            throw new Error('Use Methods.Instance() instead new Methods()')

        let fileHandler = new FileHandler();
        let wordsJson: WordDAO[] = fileHandler.readArrayFile('../data/wordlist.json');
        let data = fileHandler.readJSON('../data/wordlist.json');
        let language = fileHandler.readJSON('../data/language.json');
        let nullWord: Word = new NullWord();

        this._wordData = data;
        this._fileHandler = fileHandler;
        this._nullWord = nullWord;
        this._languageData = language;

        for (let word of wordsJson) {
            this._words.push(new Word(word));
        }
    }

    public static getInstance(): Methods {
        return Methods.instance
    }

    public async CheckUsernameAndPassword(): Promise<void> {

        let username: String = await ConsoleHandling.question('Username: ');

        if (username == ADMIN.adminname) {

            let password: String = await ConsoleHandling.question('Passwort: ');

            if (password == ADMIN.adminpassword) {

                console.log('\nAnmeldung als Admin erfolgreich!');
                await worddb.showAdminFunctionalities();
            }
            else {
                console.log('\nAdmins Passwort inkorrekt');
                await worddb.showFunctionalities();
            }
        }
        else if (username == TRANSLATOR.translatorname) {

            let password: String = await ConsoleHandling.question('Passwort: ');

            if (password == TRANSLATOR.translatorpassword) {

                this.TranslatorSignIn();
                await worddb.showTranslatorFunctionalities();
            }
            else {
                console.log('\nÜbersetzers Passwort inkorrekt');
                await worddb.showFunctionalities();
            }
        }
        else {
            console.log('\nUsername inkorrekt');
            await worddb.showFunctionalities();
        }

    }


    public TranslatorSignIn(): void {

        this._TranslationSignedIn = true;
        ConsoleHandling.printInput(`\n${TRANSLATOR.translatorname} ist angemeldet\n`);

    }


    public TranslatorSignOut(): void {

        this._TranslationSignedIn = false;
        ConsoleHandling.printInput(`\n${TRANSLATOR.translatorname} ist abgemeldet\n`)

    }

    public async AddnewLanguage(): Promise<void> {


        let newLanguage: any = await ConsoleHandling.question('Neue Sprache: ');
        let localID: any = await ConsoleHandling.question('local ID der Sprache: ');
        let onlyChar: RegExp = /^[a-zäöüA-ZÄÖÜ]+$/;

        for (let index in this._words) {

            if (newLanguage !== Object.keys(this._wordData[index]) && onlyChar.test(`${newLanguage}`) == true) {
                
                this._wordData[index][newLanguage] = this._nullWord.getGermanWord();
                this._fileHandler.writeFile('../data/wordlist.json', this._wordData);

                this._languageData[0][newLanguage] = localID;
                this._fileHandler.writeFile('../data/language.json', this._languageData);
                
            }
            if (newLanguage == Object.keys(this._wordData[index]) || onlyChar.test(`${newLanguage}`) == false) {
                ConsoleHandling.printInput(`\n${newLanguage} kann nicht als Sprache gespeichert werden.`);
                await worddb.showAdminFunctionalities();
                break;
            }
        }
        ConsoleHandling.printInput(`\n ${newLanguage} ist als neue Sprache angelegt.`);
        await worddb.showAdminFunctionalities();
    }

    public showTranslatorAccesses(): void {
        
        ConsoleHandling.printInput(`\n`);
        ConsoleHandling.printInput(`Berechtigung von ${TRANSLATOR.translatorname} für Englisch: ${TRANSLATOR.accessenglish} `);
        ConsoleHandling.printInput(`Berechtigung von ${TRANSLATOR.translatorname} für Spanisch: ${TRANSLATOR.accessspanish} `);
        ConsoleHandling.printInput(`Berechtigung von ${TRANSLATOR.translatorname} für Französisch: ${TRANSLATOR.accessfrench} `);
        ConsoleHandling.printInput(`\n`);

    }


    public async AdminAccessRightTranslator(): Promise<void> {

        this.showTranslatorAccesses();

        let question: String = await ConsoleHandling.question(`Berechtigung für ${TRANSLATOR.translatorname}  ändern?(ja oder nein): `);


        switch (question.toLowerCase()) {
            case 'ja':
            case 'j':
                {
                    let language: String = await ConsoleHandling.question(`Welche Sprache?(eng,sp,fr) `);

                    switch (language.toLowerCase()) {
                        case 'englisch':
                        case 'eng':
                            {
                                TRANSLATOR.accessenglish = (TRANSLATOR.accessenglish) ? false : true;
                                await this.AdminAccessRightTranslator();
                                break;

                            }
                        case 'spanisch':
                        case 'sp':
                            {
                                TRANSLATOR.accessspanish = (TRANSLATOR.accessspanish) ? false : true;
                                await this.AdminAccessRightTranslator();
                                break;
                            }
                        case 'französich':
                        case 'fr':
                            {
                                TRANSLATOR.accessfrench = (TRANSLATOR.accessfrench) ? false : true;
                                await this.AdminAccessRightTranslator();
                                break;
                            }
                        default:
                            await this.AdminAccessRightTranslator();
                            break;

                    }

                } break;
            case 'nein':
            case 'n':
                {
                    await worddb.showAdminFunctionalities();
                    break;
                }
            default:
                await worddb.showAdminFunctionalities();
                break;

        }


    }


    public async showLanguage(): Promise<void> {

        let single: WordDAO = this._fileHandler.readObjectFile('../data/wordlist.json');
        let language: Language = new Language(single);

        ConsoleHandling.printInput(`
        Englisch:    ${language.englishLCID}
        Deutsch:     ${language.germanLCID}
        Französisch: ${language.frenchLCID}
        Spanisch:    ${language.spanishLCID}\n`);

        await worddb.showAdminFunctionalities();
        
    }

    public async showAllWords(): Promise<void> {

        for (let index in this._words) {

            let word: Word = this._words[index];
            let _index: Number = Number.parseInt(index) + 1;

            word = word !== undefined ? word : new NullWord();

            ConsoleHandling.printInput(`
           
            ${_index}.
            Deutsch: ${word.getGermanWord().toString()} 
            Englisch: ${word.getEnglishWord().toString()}
            Spanisch: ${word.getSpanishWord().toString()}
            Französich: ${word.getFrenchWord().toString()}
            \n`);

        }

        await worddb.showFunctionalitiesAgain();

    }


    public showAllWordsWithTranslations(): void {

        ConsoleHandling.printInput(`\n`);

        for (let index in this._words) {

            let word: Word = this._words[index];

            if (
                word.getEnglishWord().toString() !== this._nullWord.getEnglishWord() &&
                word.getSpanishWord().toString() !== this._nullWord.getSpanishWord() &&
                word.getFrenchWord().toString() !== this._nullWord.getFrenchWord()
            ) {
                ConsoleHandling.printInput(`${word.getGermanWord().toString()} :100% Übersetzung`);
            }
        }
        ConsoleHandling.printInput(`\n`);
    }

    public showAllWordsWithOutTranslations(): void {


        for (let index in this._words) {

            let word: Word = this._words[index];

            if (
                word.getEnglishWord().toString() == this._nullWord.getEnglishWord() ||
                word.getSpanishWord().toString() == this._nullWord.getSpanishWord() ||
                word.getFrenchWord().toString() == this._nullWord.getFrenchWord()
            ) {
                ConsoleHandling.printInput(` 

                Deutsch: ${word.getGermanWord().toString()} 
                Englisch: ${word.getEnglishWord().toString()}
                Spanisch: ${word.getSpanishWord().toString()}
                Französich: ${word.getFrenchWord().toString()}`);
            }
        }
    }


    public showNumberofAllWords(): void {

        ConsoleHandling.printInput(`\n`);
        console.log(`Es sind insgesamt ${this._words.length} Wörter in der Datenbank.`);
        worddb.showUserFunctionalities();

    }

    public showNumberofTranslation(): void {

        ConsoleHandling.printInput(`\n`);
        console.log(`Neue Übersetzungen (Übersetzer): ${this._countTranslation} `);
        worddb.showTranslatorFunctionalities();
    }


    public showNumberofNewWordTranslator(): void {

        ConsoleHandling.printInput(`\n`);
        console.log(`Neue Wörter angelegt (Übersetzer): ${this._countNewWordTranslator} `);
        worddb.showTranslatorFunctionalities();
    }



    public async WriteNewWord(newWord: String): Promise<void> {

        let consent: String = await ConsoleHandling.question(`Möchtest du das Wort "${newWord}" neu anlegen?(ja oder nein):`);

        switch (consent.toLowerCase()) {
            case 'ja':
            case 'j':
                {
                    let newJSONWord = {
                        GUID: GenerateUUIDv4(),
                        english: this._nullWord.getEnglishWord(),
                        german: newWord,
                        spanish: this._nullWord.getSpanishWord(),
                        french: this._nullWord.getFrenchWord()
                    }

                    this._wordData.push(newJSONWord);

                    ConsoleHandling.printInput('\n');

                    this._fileHandler.writeFile('../data/new_wordlist.json', this._wordData)

                    if (this._TranslationSignedIn == true) {
                        this.showNewWordTranslatorCounter();
                    }
                    else if (this._TranslationSignedIn == false) {
                        this.showNewWordUserCounter()
                    }
                    worddb.showFunctionalities();
                    break;


                }
            case 'nein':
            case 'n':
                {
                    worddb.showFunctionalitiesAgain();
                    break;
                }
            default:
                {
                    if (this._TranslationSignedIn == false) {
                        await worddb.showUserFunctionalities();
                        break;
                    }
                    else {
                        await worddb.showTranslatorFunctionalities();
                        break;
                    }
                }
        }
    }

    public showTranslationCounter(): void {

        this._countTranslation++;

        if (this._countTranslation == 1) {
            ConsoleHandling.printInput(`\nDu hast ein neues Wort angelegt.`);
        }
        else {
            ConsoleHandling.printInput(`\nDu hast ${this._countTranslation} neue Wörter angelegt.`);
        }


    }

    public showPercentageWithOutTranslation(): void {

        for (let index in this._words) {

            let count: number;
            count = 0;
            let word: Word = this._words[index];

            if (word.getEnglishWord().toString() == this._nullWord.getEnglishWord()) {
                count++;
            }
            if (word.getSpanishWord().toString() == this._nullWord.getSpanishWord()) {
                count++;
            }
            if (word.getFrenchWord().toString() == this._nullWord.getFrenchWord()) {
                count++;
            }

            let percentage = (1 - count / (Object.keys(this._wordData[index]).length - 2)) * 100;
            let final = percentage.toFixed();
            ConsoleHandling.printInput(`${word.getGermanWord().toString()}: ${final} %`);

        }
    }
    public showNewWordTranslatorCounter(): void {

        this._countNewWordTranslator++;

        if (this._countNewWordTranslator == 1) {
            ConsoleHandling.printInput(`Du hast ein neues Wort angelegt.`);
        }
        else {
            ConsoleHandling.printInput(`Du hast ${this._countNewWordTranslator} neue Wörter angelegt.`);
        }

    }

    public showNewWordUserCounter(): void {

        this._countNewWordUser++;

        if (this._countNewWordUser == 1) {
            ConsoleHandling.printInput(`Du hast ein neues Wort angelegt.`);
        }
        else {
            ConsoleHandling.printInput(`Du hast ${this._countNewWordUser} neue Wörter angelegt.`);
        }

    }

    public showNumberofNewWordUser(): void {

        ConsoleHandling.printInput(`\n`);
        console.log(`Wörter neu angelegt(User):  ${this._countNewWordUser} `);
        worddb.showUserFunctionalities();
    }

    public async searchForTranslation(): Promise<void> {

        let language: String = await ConsoleHandling.question('Welche Sprache?(eng,sp,fr) ');
        let word: String = await ConsoleHandling.question('Welches Wort? ');
        let onlyChar: RegExp = /^[a-zA-Z]+$/;

        let translation: AbstractWord = this._words.filter((translation) => translation.getGermanWord().match(new RegExp(`${word}`, 'gi')))[0];
        ConsoleHandling.printInput('\n');

        if (translation !== undefined && onlyChar.test(`${word}`) == true && onlyChar.test(`${language}`) == true) {

            switch (language.toLowerCase()) {
                case 'englisch':
                case 'eng':
                    {
                        ConsoleHandling.printInput('Eingabe: ' + word + ' Englisch: ' + translation.getEnglishWord().toString());
                        worddb.showUserFunctionalities();
                        break;

                    }
                case 'spanisch':
                case 'sp':
                    {
                        ConsoleHandling.printInput('Eingabe: ' + word + ' Spanisch: ' + translation.getSpanishWord().toString());
                        worddb.showUserFunctionalities();
                        break;

                    }
                case 'französich':
                case 'fr':
                    {
                        ConsoleHandling.printInput('Eingabe: ' + word + ' Französisch: ' + translation.getFrenchWord().toString());
                        worddb.showUserFunctionalities();
                        break;

                    }
                default:
                    {
                        worddb.showUserFunctionalities();
                        break;

                    }
            }


        }
        else if (onlyChar.test(`${word}`) == false || onlyChar.test(`${language}`) == false) {
            ConsoleHandling.printInput(`Die Sprache und/oder das Wort kann nicht als Wort gelesen werden.`);
            worddb.showFunctionalities();
        } else {

            let translation: Word = new NullWord();
            ConsoleHandling.printInput(`Zielsprache: ${translation.getGermanWord().toString()}.`);
            this.WriteNewWord(word);
        }



    }

    public async setTranslationTranslator(): Promise<void> {

        let onlyChar: RegExp = /^[a-zA-Z]+$/;

        let inputword: String = await ConsoleHandling.question('Welches Wort? ');

        this.showTranslatorAccesses();

        for (let index in this._words) {

            if (inputword == this._words[index].getGermanWord().toString()) {
                let language: String = await ConsoleHandling.question('In welcher Sprache ändern ?(eng,sp,fr): ');

                switch (language.toLowerCase()) {
                    case 'englisch':
                    case 'eng':
                        {

                            if (TRANSLATOR.accessenglish == true) {

                                let newTranslation: String = await ConsoleHandling.question('Neue Übersetzung: ');

                                if (onlyChar.test(`${newTranslation}`) == true) {

                                    this._wordData[index].english = newTranslation;
                                    this._fileHandler.writeFile('../data/wordlist.json', this._wordData);
                                    this.showTranslationCounter();
                                    await worddb.showTranslatorFunctionalities();
                                    break;
                                } else {
                                    ConsoleHandling.printInput(`${newTranslation} ist kein Wort. `);
                                    await worddb.showTranslatorFunctionalities();
                                    break;
                                }

                            }
                            else {
                                ConsoleHandling.printInput(`${TRANSLATOR.translatorname} ist nicht berechtigt diese Sprache zu übersetzen.`)
                                await worddb.showTranslatorFunctionalities();
                            }

                        }
                    case 'spanisch':
                    case 'sp':
                        {
                            if (TRANSLATOR.accessspanish == true) {

                                let newTranslation: String = await ConsoleHandling.question('Neue Übersetzung: ');

                                if (onlyChar.test(`${newTranslation}`) == true) {

                                    this._wordData[index].spanish = newTranslation;
                                    this._fileHandler.writeFile('../data/wordlist.json', this._wordData)
                                    this.showTranslationCounter();
                                    await worddb.showTranslatorFunctionalities();
                                    break;
                                } else {
                                    ConsoleHandling.printInput(`${newTranslation} ist kein Wort. `);
                                    await worddb.showTranslatorFunctionalities();
                                    break;
                                }
                            }
                            else {
                                ConsoleHandling.printInput(`${TRANSLATOR.translatorname} ist nicht berechtigt diese Sprache zu übersetzen.`)
                                await worddb.showTranslatorFunctionalities();
                                break;
                            }

                        }

                    case 'französich':
                    case 'fr':
                        {
                            if (TRANSLATOR.accessfrench == true) {
                                let newTranslation: String = await ConsoleHandling.question('Neue Übersetzung: ');

                                if (onlyChar.test(`${newTranslation}`) == true) {

                                    this._wordData[index].french = newTranslation;
                                    this._fileHandler.writeFile('../data/wordlist.json', this._wordData);
                                    this.showTranslationCounter();
                                    await worddb.showTranslatorFunctionalities();
                                    break;
                                }
                                else {
                                    ConsoleHandling.printInput(`${newTranslation} ist kein Wort. `);
                                    await worddb.showTranslatorFunctionalities();
                                    break;
                                }
                            } else {
                                ConsoleHandling.printInput(`${TRANSLATOR.translatorname} ist nicht berechtigt diese Sprache zu übersetzen.`)
                                await worddb.showTranslatorFunctionalities();
                                break;
                            }

                        }
                    default:
                        {
                            worddb.showTranslatorFunctionalities();
                            break;
                        }
                }
            }
        }

        worddb.showTranslatorFunctionalities();
    }

    public deleteUserNewWord(): void {

        this._fileHandler.deletefile('../data/new_wordlist.json');

    }

}
export default Methods.getInstance();