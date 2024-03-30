
# JSHTML_Builder

## Descrição

A classe Element é uma estrutura em JavaScript que facilita a construção dinâmica de elementos HTML por meio de objetos. Ela oferece métodos para criar elementos HTML, adicionar conteúdo, definir atributos, e manipular a visibilidade dos elementos.

## Instruções de Uso

- Criação de Elementos: Utilize os métodos fornecidos para criar elementos HTML dinamicamente.

- Adição de Conteúdo: Adicione conteúdo aos elementos criados usando os métodos apropriados.

- Definição de Atributos: Defina atributos como IDs e classes para os elementos conforme necessário.

- Manipulação de Visibilidade: Altere a visibilidade dos elementos conforme necessário.


Direitos autorais da descrição por ChatGPT-3.5 (OpenAI) revisado por DonShell 30/03/2024.

-------------------------------------------------------------------

# JSHTML_Builder

## Description

The Element class is a JavaScript structure that facilitates dynamic construction of HTML elements through objects. It provides methods for creating HTML elements, adding content, setting attributes, and manipulating element visibility.

## Usage Instructions

- Creating Elements: Utilize the provided methods to dynamically create HTML elements.

- Adding Content: Add content to the created elements using the appropriate methods.

- Setting Attributes: Set attributes such as IDs and classes for the elements as needed.

- Manipulating Visibility: Alter the visibility of elements as necessary.

Copyright © Text by ChatGPT-3.5 (OpenAI) reviewed by DonShell on 30/03/2024.

# Example Usage | Exemplo de Uso
javascript
```javascript
// Create new JSHTML_Builder
parent = new BlockOfElements(null);

// Add a text element with content "Hello, world!"
welcome = new TextElement("Hello, world!");

// Add an image element with the image URL
image = new ImageElement("https://example.com/image.jpg");

// Set the ID of the main element
parent.setId("main");

// This element will be appended to the body of the page
parent.declareOrphan(body);

// Add children
parent.addElement(welcome);
parent.addElement(image);

// Display the element on the HTML page
parent.show();

// Hide the element from the HTML page
builder.hide();

// All classes extend the Element class, so you can use:
parentElement1 = new BlockOfElements(null);
parentElement2 = new BlockOfElements(null);
parentElement3 = new BlockOfElements(null);

addElements(parentElement1, parentElement2, parentElement3);
```
