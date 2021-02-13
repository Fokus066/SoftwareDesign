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

export class Methods {

    private static instance: Methods = new Methods()

    private _words: Word[] = [];
    private _countNewWordUser = 0;
    private _countNewWordTranslator = 0;
    private _countTranslation = 0;
    private _TranslationSignedIn = false;

    constructor() {

        if (Methods.instance)
            throw new Error('Use Methods.Instance() instead new Methods()')

        let fileHandler = new FileHandler();
        let wordsJson: WordDAO[] = fileHandler.readArrayFile('../data/wordlist.json');

        for (let word of wordsJson) {
            this._words.push(new Word(word));
        }
    }

    public static getInstance(): Methods {
        return Methods.instance
    }

    public async showAllWordsWithITranslations(): Promise<void> {

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
        
    }

    public async AddnewLanguage(): Promise<void> {

        let fileHandler = new FileHandler();
        let data = fileHandler.readJSON('../data/wordlist.json');
        let _nullWord: Word = new NullWord();
        let newLanguage: any = await ConsoleHandling.question('Neue Sprache: ');
        let onlyChar: RegExp = /^[a-zA-Z]+$/;

        for (let index = 0; index < this._words.length; index++) {

            if (newLanguage !== Object.keys(data[index]) && onlyChar.test(`${newLanguage}`) == true) {
                data[index][newLanguage] = _nullWord.getGermanWord();
                fileHandler.writeFile('../data/wordlist.json', data);
                ConsoleHandling.printInput(`\n ${newLanguage} ist als neue Sprache angelegt.`);
                break;
            }
            if (newLanguage == Object.keys(data[index]) || onlyChar.test(`${newLanguage}`) == false) {
                ConsoleHandling.printInput(`\n${newLanguage} kann nicht als Sprache gespeichert werden.`);
                break;
            }
        }
        await worddb.showAdminFunctionalities();
    }

    public showTranslatorAccesses(): void {

        ConsoleHandling.printInput(`Berechtigung von ${TRANSLATOR.translatorname} für Englisch: ${TRANSLATOR.accessenglish} `);
        ConsoleHandling.printInput(`Berechtigung von ${TRANSLATOR.translatorname} für Spanisch: ${TRANSLATOR.accessspanish} `);
        ConsoleHandling.printInput(`Berechtigung von ${TRANSLATOR.translatorname} für Französich: ${TRANSLATOR.accessfrench} `);
        ConsoleHandling.printInput(`\n`);

    }

    public TranslatorSignInAndOut(): void {

        this._TranslationSignedIn = (this._TranslationSignedIn) ? false : true;

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

    public async showAllWordsWithOutTranslations(): Promise<void> {

        let _nullWord: Word = new NullWord();

        for (let index in this._words) {

            let word: Word = this._words[index];

            if (
                word.getEnglishWord().toString() == _nullWord.getEnglishWord() ||
                word.getSpanishWord().toString() == _nullWord.getSpanishWord() ||
                word.getFrenchWord().toString() == _nullWord.getFrenchWord()
            ) {
                ConsoleHandling.printInput(` 

                Deutsch: ${word.getGermanWord().toString()} 
                Englisch: ${word.getEnglishWord().toString()}
                Spanisch: ${word.getSpanishWord().toString()}
                Französich: ${word.getFrenchWord().toString()}`);
            }
        }
    }

    public async showNumberofAllWords(): Promise<void> {

        ConsoleHandling.printInput(`\n`);
        console.log(`Es sind insgesamt ${this._words.length} Wörter im Datenbank.`);
        await worddb.showUserFunctionalities();

    }

    public async showNumberofTranslation(): Promise<void> {

        ConsoleHandling.printInput(`\n`);
        console.log(`Neue Übersetzungen: ${this._countTranslation} `);
        await worddb.showTranslatorFunctionalities();
    }

    public async showNumberofNewWordUser(): Promise<void> {

        ConsoleHandling.printInput(`\n`);
        console.log(`Neue Wörter angelegt: ${this._countNewWordUser} `);
        await worddb.showUserFunctionalities();
    }
    public async showNumberofNewWordTranslator(): Promise<void> {

        ConsoleHandling.printInput(`\n`);
        console.log(`Neue Wörter angelegt: ${this._countNewWordTranslator} `);
        await worddb.showTranslatorFunctionalities();
    }


    public async WriteNewWord(newWord: String): Promise<void> {

        let consent: String = await ConsoleHandling.question(`Möchtest du das Wort "${newWord}" neu anlegen?(ja oder nein):`);
        let fileHandler = new FileHandler();
        let data = fileHandler.readJSON('../data/wordlist.json');
        let _nullWord: Word = new NullWord();

        switch (consent.toLowerCase()) {
            case 'ja':
            case 'j':
                {
                    let newJSONWord = {
                        GUID: GenerateUUIDv4(),
                        english: _nullWord.getEnglishWord(),
                        german: newWord,
                        spanish: _nullWord.getSpanishWord(),
                        french: _nullWord.getFrenchWord()
                    }

                    data.push(newJSONWord);

                    ConsoleHandling.printInput('\n');

                    fileHandler.writeFile('../data/new_wordlist.json', data)

                    if (this._TranslationSignedIn == false) {
                        this.showNewWordUserCounter();
                        break;
                    }
                    else {
                        this.showNewWordTranslatorCounter();
                        break;
                    }


                }
            case 'nein':
            case 'n':
                {
                    if (this._TranslationSignedIn == false) {
                        await worddb.showUserFunctionalities();
                    }
                    else {
                        await worddb.showTranslatorFunctionalities();
                    }
                }
            default:
                if (this._TranslationSignedIn == false) {
                    await worddb.showUserFunctionalities();
                }
                else {
                    await worddb.showTranslatorFunctionalities();
                }
                break;
        }
        if (this._TranslationSignedIn == false) {
            await worddb.showUserFunctionalities();

        }
        else {
            await worddb.showTranslatorFunctionalities();

        }

    }

    public async showTranslationCounter(): Promise<void> {

        this._countTranslation++;

        if (this._countTranslation == 1) {
            ConsoleHandling.printInput(`\nDu hast ein neues Wort angelegt.`);
        }
        else {
            ConsoleHandling.printInput(`\nDu hast ${this._countTranslation} neue Wörter angelegt.`);
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
    public showNewWordTranslatorCounter(): void {

        this._countNewWordTranslator++;

        if (this._countNewWordTranslator == 1) {
            ConsoleHandling.printInput(`Du hast ein neues Wort angelegt.`);
        }
        else {
            ConsoleHandling.printInput(`Du hast ${this._countNewWordTranslator} neue Wörter angelegt.`);
        }

    }


    public async showPercentageWithOutTranslation(): Promise<void> {

        let _nullWord: Word = new NullWord();
        let fileHandler = new FileHandler();
        let data = fileHandler.readJSON('../data/wordlist.json');

        for (let index in this._words) {

            let count: number;
            count = 0;
            let word: Word = this._words[index];

            if (word.getEnglishWord().toString() == _nullWord.getEnglishWord()) {
                count++;
            }
            else if (word.getSpanishWord().toString() == _nullWord.getSpanishWord()) {
                count++;
            }
            else if (word.getFrenchWord().toString() == _nullWord.getFrenchWord()) {
                count++;
            }

            
            let percentage = (1 - count / (Object.keys(data[index]).length-2)) * 100;
            let final = percentage.toFixed();
            ConsoleHandling.printInput(`${word.getGermanWord().toString()}: ${final} %`);

        }
    }


    public async searchForTranslation(): Promise<void> {

        let language: String = await ConsoleHandling.question('Welche Sprache?(eng,sp,fr) ');
        let word: String = await ConsoleHandling.question('Welches Wort? ');
        let onlyChar: RegExp = /^[a-zA-Z]+$/;

        let translation: AbstractWord = this._words.filter((translation) => translation.getGermanWord().match(new RegExp(`${word}`, 'gi')))[0];

        ConsoleHandling.printInput('\n');

        //translation = translation !== undefined ? translation : new NullWord();

        if (translation !== undefined && onlyChar.test(`${word}`) == true && onlyChar.test(`${language}`) == true) {

            switch (language.toLowerCase()) {
                case 'englisch':
                case 'eng':
                    {
                        ConsoleHandling.printInput('Eingabe: ' + word + '\nEnglisch: ' + translation.getEnglishWord().toString());

                        if (this._TranslationSignedIn == false) {
                            await worddb.showUserFunctionalities();
                            break;
                        }
                        else {
                            await worddb.showTranslatorFunctionalities();
                            break;
                        }

                    }
                case 'spanisch':
                case 'sp':
                    {
                        ConsoleHandling.printInput('Eingabe: ' + word + '\nSpanisch: ' + translation.getSpanishWord().toString());

                        if (this._TranslationSignedIn == false) {
                            await worddb.showUserFunctionalities();
                            break;
                        }
                        else {
                            await worddb.showTranslatorFunctionalities();
                            break;
                        }
                    }
                case 'französich':
                case 'fr':
                    {
                        ConsoleHandling.printInput('Eingabe: ' + word + '\nFranzösisch: ' + translation.getFrenchWord().toString());
                        if (this._TranslationSignedIn == false) {
                            await worddb.showUserFunctionalities();
                            break;
                        }
                        else {
                            await worddb.showTranslatorFunctionalities();
                            break;
                        }
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


        } else if (onlyChar.test(`${word}`) == false || onlyChar.test(`${language}`) == false) {
            ConsoleHandling.printInput(`Die Sprache und/oder das Wort kann nicht als Wort gelesen werden.`);
            if (this._TranslationSignedIn == false) {
                await worddb.showUserFunctionalities();

            }
            else {
                this.WriteNewWord(word);
                ConsoleHandling.printInput(`L:423`);
                await worddb.showTranslatorFunctionalities();

            }
        }
        else {

            let translation: Word = new NullWord();
            ConsoleHandling.printInput(`Zielsprache: ${translation.getGermanWord().toString()}.`);
            this.WriteNewWord(word);
        }

    }

    public async setTranslationTranslator(): Promise<void> {

        this.showAllWordsWithITranslations();

        let fileHandler = new FileHandler();
        let data = fileHandler.readJSON('../data/wordlist.json');
        let onlyChar: RegExp = /^[a-zA-Z]+$/;

        let inputword: String = await ConsoleHandling.question('Welches Wort? ');

        this.showTranslatorAccesses();

        for (let index in this._words) {

            if (inputword == this._words[index].getGermanWord().toString()) {
                let language: String = await ConsoleHandling.question('Welche Sprache?(eng,sp,fr): ');

                switch (language.toLowerCase()) {
                    case 'englisch':
                    case 'eng':
                        {

                            if (TRANSLATOR.accessenglish == true) {

                                let newTranslation: String = await ConsoleHandling.question('Neue Übersetzung: ');

                                if (onlyChar.test(`${newTranslation}`) == true) {

                                    data[index].english = newTranslation;
                                    fileHandler.writeFile('../data/wordlist.json', data);
                                    this.showTranslationCounter();
                                    await worddb.showTranslatorFunctionalities();
                                } else {
                                    ConsoleHandling.printInput(`${newTranslation} ist kein Wort. `);
                                    await worddb.showTranslatorFunctionalities();
                                }

                            } else {
                                ConsoleHandling.printInput(`${TRANSLATOR.translatorname} ist nicht berechtigt diese Sprache zu übersetzen.`)
                                await worddb.showTranslatorFunctionalities();
                            }
                            break;
                        }
                    case 'spanisch':
                    case 'sp':
                        {
                            if (TRANSLATOR.accessspanish == true) {

                                let newTranslation: String = await ConsoleHandling.question('Neue Übersetzung: ');

                                if (onlyChar.test(`${newTranslation}`) == true) {

                                    data[index].spanish = newTranslation;
                                    fileHandler.writeFile('../data/wordlist.json', data)
                                    this.showTranslationCounter();
                                    await worddb.showTranslatorFunctionalities();
                                } else {
                                    ConsoleHandling.printInput(`${newTranslation} ist kein Wort. `);
                                    await worddb.showTranslatorFunctionalities();
                                }
                            } else {
                                ConsoleHandling.printInput(`${TRANSLATOR.translatorname} ist nicht berechtigt diese Sprache zu übersetzen.`)
                                await worddb.showTranslatorFunctionalities();
                            }
                            break;
                        }

                    case 'französich':
                    case 'fr':
                        {
                            if (TRANSLATOR.accessfrench == true) {
                                let newTranslation: String = await ConsoleHandling.question('Neue Übersetzung: ');

                                if (onlyChar.test(`${newTranslation}`) == true) {

                                    data[index].french = newTranslation;
                                    fileHandler.writeFile('../data/wordlist.json', data);
                                    this.showTranslationCounter();
                                    await worddb.showTranslatorFunctionalities();
                                }
                                else {
                                    ConsoleHandling.printInput(`${newTranslation} ist kein Wort. `);
                                    await worddb.showTranslatorFunctionalities();
                                }
                            } else {
                                ConsoleHandling.printInput(`${TRANSLATOR.translatorname} ist nicht berechtigt diese Sprache zu übersetzen.`)
                                await worddb.showTranslatorFunctionalities();
                            }
                            break;
                        }
                    default:
                        {
                            worddb.showTranslatorFunctionalities();
                            break;
                        }
                }
            }
        }

        this.showTranslationCounter();
        worddb.showTranslatorFunctionalities();
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

                console.log('\nAnmeldung als Übersetzer erfolgreich!');
                this.TranslatorSignInAndOut();
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

}
export default Methods.getInstance();