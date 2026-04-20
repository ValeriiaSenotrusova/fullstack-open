 ```mermaid
 
 sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user types a note and clicks "save"
    Note right of browser: The JavaScript code adds the new note to the local list and rerenders it on the screen

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server saves the note and sends a confirmation
    server-->>browser: 201 Created (JSON: {"message":"note created"})
    deactivate server