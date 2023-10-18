# Diagram exercises

## 0.4: New note diagram

Create a similar diagram depicting the situation where the user creates a new note on [the page](https://studies.cs.helsinki.fi/exampleapp/notes) by writing something into the text field and clicking the Save button.

```mermaid
sequenceDiagram
    participant browser
    participant server

    activate browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: status code: 302
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: main.js file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    
    Note right of browser: javascript code causes to GET data.json file
    
    server-->>browser: data.json file
    deactivate server

    deactivate browser
```

## 0.5: Single page app diagram

Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at <https://studies.cs.helsinki.fi/exampleapp/spa>

```mermaid
sequenceDiagram
    participant browser
    participant server
    activate browser
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: JS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON file
    deactivate server

    deactivate browser
```

## 0.6: New note in Single page app diagram

Create a diagram depicting the situation where the user creates a new note using the [single-page version](https://studies.cs.helsinki.fi/exampleapp/spa) of the app.

```mermaid
sequenceDiagram
    participant browser
    participant server
    activate browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: status code: 201 with json data
    deactivate server

    deactivate browser
```
