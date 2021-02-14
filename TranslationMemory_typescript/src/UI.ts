import ConsoleHandling from './classes/ConsoleHandling';
import Methods from './classes/Methods';

export class UI {

  public async showFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      [
        '1. Login',
        '2. Zu Users Funktionen',
      ], 
      'Was möchtest du machen?(Zahl): ');

    await this.handleAnswer(answer);
  }
  public async showAdminFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      
      ['Admins Funktionen: ',
        '1. Neue Sprache anlegen',
        '2. Sprache an Übersetzer zuweisen',
        '3. abmelden',
               
      ], 
      'Was möchtest du machen?(default: Admins Funktionen)');

    await this.handleAdminChoices(answer);
  }

  public async showTranslatorFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      [
        'Übersetzers Funktionen:\n ',
        '1. Alle Wörter in der aktuellen Datenbank anzeigen',
        '2. Auflistung fehlender Übersetzungen anzeigen',
        '3. Übersetzungen einpflegen/eintragen',
        '4. Anzahl der vorhandenen Wörter in der aktuellen Datenbank anzeigen',
        '5. Anzahl der angelegten Übersetzungen anzeigen',
        '6. Anzahl der neu angelegten Wörter anzeigen',
        '7. Prozentzahl der Übersetzungen eines Wortes anzeigen',
        '8. Zielsprache auswählen und übersetzen',
        '9. Alle Wörter mit 100% Übersetzungen anzeigen',
        '10. Abmelden',
                  
      ], 
      'Was möchtest du machen? (default: Übersetzers Funktionen)');

    await this.handleTranslatorChoices(answer);
  }

  public async showUserFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      [
        'Users Funktionen:\n ',
        '1. Alle Wörter in der aktuellen Datenbank anzeigen',
        '2. Zielsprache auswählen und übersetzen',
        '3. Anzahl der neu angelegten Wörter anzeigen',
        '4. Anzahl der Wörter in der aktuellen Datenbank anzeigen',
        '5. Alle Wörter mit 100% Übersetzungen anzeigen'

      ], 
      'Welche Funktion möchtest du nutzen?(default: zurück) ');

    await this.handleUserChoice(answer);
  }

  public async handleAdminChoices(answer: String)
   {
    switch(answer) {
      case '1': 
      Methods.AddnewLanguage();  
        break;
      case '2':
      Methods.AdminAccessRightTranslator();  
        break;
      case '3':
      this.showFunctionalities;  
      break;
      default:
      this.showAdminFunctionalities();
      break;
    }
    await this.showFunctionalitiesAgain();
  } 

  public async handleTranslatorChoices(answer: String)
   {
    switch(answer) {
      case '1': 
      Methods.showAllWords();
        break;
      case '2':
      Methods.showAllWordsWithOutTranslations();
        break;
      case '3':
      Methods.setTranslationTranslator(); 
        break;
      case '4':
      Methods.showNumberofAllWords();  
        break;
      case '5':
      Methods.showNumberofTranslation();
        break;
      case '6':
      Methods.showNumberofNewWordTranslator();
        break;
      case '7':
      Methods.showPercentageWithOutTranslation(); 
        break;
      case '8':
      Methods.searchForTranslation();
        break;
      case '9':
      Methods.showAllWordsWithTranslations();
        break;
      case '10':
      Methods.TranslatorSignOut();
        break;
      default:
        this.showTranslatorFunctionalities();
        break;
    }
    await this.showFunctionalitiesAgain();
  } 

  public async handleAnswer(answer: String)
   {
    switch(answer) {
      case '1': 
        Methods.CheckUsernameAndPassword();
        break;
      case '2':
        this.showUserFunctionalities();
        break;
      default:
        this.showFunctionalities();
        break;
    }
    await this.showFunctionalitiesAgain();
  } 
  
  public async handleUserChoice(answer: String) 
  {
    switch(answer) {
      case '1': 
      Methods.showAllWords();
        break;
      case '2':
      Methods.searchForTranslation();
        break;
      case '3':
      Methods.showNumberofNewWordUser();
        break;
      case '4':
      Methods.showNumberofAllWords();
        break;
      case '5':
      Methods.showAllWordsWithTranslations();
        break;
      default:
      this.showFunctionalitiesAgain();
        break;
    }
    await this.showFunctionalitiesAgain();
  }
   
  public async showFunctionalitiesAgain(): Promise<void>
   {
    let answer : String = await ConsoleHandling.question('Programm beenden? (ja oder nein) ');
    switch(answer.toLowerCase()) {
      case 'ja':
      case 'j':
        ConsoleHandling.closeConsole();
        break;
      case 'nein':
      case 'n':
        this.showFunctionalities();
        break;
      default:
        this.showFunctionalities();
        break;
    }
  }
}