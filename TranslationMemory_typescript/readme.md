## Voraussetzungen 

- Node.js
- Node Package Manager (npm)
- Visual Studio Code oder other IDE

## Start des Programms:

1. Den Ordner herunterladen.
2. Den Ordner in Visual Studio Codes öffnen und ins terminal oder cmd gehen.
3. "npm install" eingeben und enter drücken => node_modules wird heruntergeladen.
4. Nach dem Download von node_modules, "npm run start" im terminal/cmd eingeben.
5. Das Programm startet.

## Falls das Programm nicht startet.

1. Schaue nach, ob launch.json and tasks.json im Ordner ".vscode" liegen.
2. Beim erneuten Download des Programms muss "npm install" immer eingeben. (siehe Start des Programms ab Schritt 2)

## Hilfreiche Information für das Programm:

**Admins**:\
Username = admin123\
Password = foever  

**Übersetzers**:\
Username = translator123,\
Password = whoever

**Admins Funktionen**:
  - Sprache neu anlegen:<br/>
    Die Sprache wird als Key mit dem Wert "Keine" für jedes Wort im wordlist.json gespeichert.\
    Die Sprache wird als Key mit dem eingegeben local-ID im language.json gespeichert.
  - Sprache an Übersetzer zuweisen:<br/>
    Erstmal wird die Berechtigung des Übersetzers angezeigt.\
    Man kann die Berechtigung einzelner Sprache ändern.

**Übersetzers Funktionen**:
  - Alle Wörter in der aktuellen Datenbank anzeigen
  - Auflistung fehlender Übersetzungen anzeigen: mindestens bei einer Sprache ohne Übersetzung
  - Übersetzungen einpflegen/eintragen:<br/> Die Übersetzung wird beim ausgewählten Wort in wordlist.json geändert. (Das Wort muss identisch mit dem Wort im wordlist.json sein)
  - Anzahl der vorhandenen Wörter in der aktuellen Datenbank anzeigen
  - Anzahl der angelegten Übersetzungen anzeigen
  - Anzahl der neu angelegten Wörter anzeigen(Übersetzer)
  - Prozentzahl der Übersetzungen einzelner Wörter anzeigen
  - Zielsprache auswählen und übersetzen:<br/> 
    Falls das Wort nicht in der Datenbank ist, kann man dieses Wort neu anlegen.

**Users Funktionen**:

  - Alle Wörter in der aktuellen Datenbank anzeigen
  - Zielsprache auswählen und übersetzen:<br/> 
    Falls das Wort nicht in der Datenbank ist, kann man dieses Wort neu anlegen.
  - Anzahl der neu angelegten Wörter anzeigen(User)
  - Anzahl der Wörter in der aktuellen Datenbank anzeigen
  - Alle Wörter mit allen Übersetzungen anzeigen

**Wichtig**:\
Das Programm arbeitet immer mit der aktuellen Json Dateien.\
Falls neue Wörter ne uangelegt sind, sollte man das Programm neu starten, um das Wort zu verarbeiten.
