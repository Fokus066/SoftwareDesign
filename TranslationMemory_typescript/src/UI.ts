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
      'Was möchtest du machen?(Zahlen): ');

    await this.handleAnswer(answer);
  }
  public async showAdminFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      
      ['Admins Funktionen: ',
        '1. Neue Sprache anlegen',
        '2. Sprache an Übersetzer zuweisen',
        '3. Abmelden'           
      ], 
      'Was möchtest du machen?(Zahlen)');

    await this.handleAdminChoices(answer);
  }

  public async showTranslatorFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      [
        'Übersetzers Funktionen:\n ',
        '1. Alle Wörter anzeigen',
        '2. Auflistung fehlender Übersetzungen Übersetzungen eintragen',
        '3. Anzahl der vorhandenen Wörter anzeigen',
        '4. Anzahl der angelegten Übersetzungen anzeigen',
        '5. Anzahl der neu angelegten Wörter anzeigen',
        '6. Prozentzahl der Übersetzungen eines Wortes anzeigen',
        '7. Zielsprache auswählen und übersetzen',
        '8. Übersetzungen einpflegen',
        '9. Abmelden'
                  
      ], 
      'Was möchtest du machen? (default: zurück)');

    await this.handleTranslatorChoices(answer);
  }

  public async showUserFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      [
        '1. Alle Wörter anzeigen',
        '2. Zielsprache auswählen und übersetzen',
        '3. Anzahl der neu angelegten Wörter anzeigen',
        '4. Anzahl der Wörter im Datenbank anzeigen'

      ], 
      'Welche Funktion möchtest du nutzen?: ');

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
      default:
      this.showFunctionalities();
        break;
    }
    await this.showFunctionalitiesAgain();
  } 

  public async handleTranslatorChoices(answer: String)
   {
    switch(answer) {
      case '1': 
      Methods.showAllWordsWithITranslations();
        break;
      case '2':
      Methods.showAllWordsWithOutTranslations();
        break;
      case '3':
      Methods.showNumberofAllWords();  
        break;
      case '4':
      Methods.showNumberofTranslation();
        break;
      case '5':
      Methods.showNumberofNewWordTranslator();
        break;
       case '6':
      Methods.showPercentageWithOutTranslation(); 
        break;
      case '7':
      Methods.searchForTranslation();
        break;
      case '8':
      Methods.setTranslationTranslator(); 
        break;
      case '9':
      Methods.TranslatorSignInAndOut();
        break;
      default:
        this.showFunctionalities();
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
      Methods.showAllWordsWithITranslations();
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
      default:
        this.showFunctionalities();
        break;
    }
    await this.showFunctionalitiesAgain();
  }
   
  public async showFunctionalitiesAgain(): Promise<void>
   {
    let answer : String = await ConsoleHandling.question('weitere Funktionen nutzen? ');
    switch(answer.toLowerCase()) {
      case 'ja':
      case 'j':
        this.showFunctionalities();
        break;
      case 'nein':
      case 'n':
        ConsoleHandling.closeConsole()
        break;
      default:
        this.showFunctionalities();
        break;
    }
  }
}