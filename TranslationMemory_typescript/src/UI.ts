import ConsoleHandling from './classes/ConsoleHandling';
import Methods from './classes/Methods';

export class UI {

  public async showFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      [
        '1. Login',
        '2. Übersetzen',
      ], 
      'Was möchtest du machen?: ');

    await this.handleAnswer(answer);
  }
  public async showAdminFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      
      ['Admins Funktionen: ',
        '1. Neue Sprache anlegen',
        '2. Sprache an Übersetzer zuweisen',
        '3. Zurückgehen'           
      ], 
      'Was möchtest du machen? ');

    await this.handleAdminChoices(answer);
  }

  public async showTranslatorFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      [
        'Übersetzers Funktionen:\n ',
        '1. Auflistung fehlender Übersetzungen',
        '2. Übersetzungen eintragen',
        '3. Anzahl der angelegten Übersetzungen anzeigen',
        '4. Prozentzahl der Übersetzungen eines Wortes anzeigen'           
      ], 
      'Was möchtest du machen? ');

    await this.handleTranslatorChoices(answer);
  }

  public async showWordFunctionalities() : Promise<void> 
  {
    let answer : String = await ConsoleHandling.showPossibilities(
      [
        '1. alle Wörter anzeigen',
        '2. Zielsprache auswählen',
        '3. neues Wort anlegen',
        '4. Anzahl der Wörter anzeigen'

      ], 
      'Welche Funktion möchtest du nutzen?: ');

    await this.handleUserChoice(answer);
  }

  public async handleAdminChoices(answer: String)
   {
    switch(answer) {
      case '1': 
      console.log('Neue Sprache zugewiesen');  
        break;
      case '2':
      console.log('Sprache an einem Übersetzer zuweisen');  
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
      Methods.showAllWordsWithNoTranslation();
        break;
      case '2':
      Methods.setTranslationTranslator();
        break;
      case '3':
      console.log('Anzahl der angelegten Übersetzungen wird anzeigt');  
        break;
      case '4':
      console.log('Prozentzahl der Übersetzungen eines Wortes wird anzeigt');  
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
        this.showWordFunctionalities();
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
      Methods.WriteNewWord();
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
    let answer : String = await ConsoleHandling.question('Want to use another function? ');
    switch(answer.toLowerCase()) {
      case 'y':
      case 'yes':
        this.showFunctionalities();
        break;
      case 'n':
      case 'no':
        ConsoleHandling.closeConsole()
        break;
      default:
        this.showFunctionalities();
        break;
    }
  }
}