#JSHTML_Builder
##Descrição
A classe JSHTML_Builder é uma estrutura em JavaScript que facilita a construção dinâmica de elementos HTML por meio de objetos. Ela oferece métodos para criar elementos HTML, adicionar conteúdo, definir atributos, e manipular a visibilidade dos elementos.

##Instruções de Uso
-Criação de Elementos: Utilize os métodos fornecidos para criar elementos HTML dinamicamente.

-Adição de Conteúdo: Adicione conteúdo aos elementos criados usando os métodos apropriados.

-Definição de Atributos: Defina atributos como IDs e classes para os elementos conforme necessário.

-Manipulação de Visibilidade: Altere a visibilidade dos elementos conforme necessário.

##Exemplo de Uso
javascript:

```javascript

// Cria um novo elemento JSHTML_Builder

const builder = new JSHTML_Builder(parentElement);


// Adiciona um elemento de texto com o conteúdo "Hello, world!"

builder.addTextElement("Hello, world!");


// Adiciona um elemento de imagem com o URL da imagem

builder.addImageElement("https://example.com/image.jpg");


// Define o ID do elemento principal

builder.setId("main");


// Exibe o elemento na página HTML

builder.show();


// Oculta o elemento da página HTML

builder.hide();

```

Direitos autorais da descrição por ChatGPT-3.5 (OpenAI) revisado por DonShell 30/03/2024.


-------------------------------------------------------------------
#JSHTML_Builder

##Description

The JSHTML_Builder class is a JavaScript structure that facilitates dynamic construction of HTML elements through objects. It provides methods for creating HTML elements, adding content, setting attributes, and manipulating element visibility.

#Usage Instructions

-Creating Elements: Utilize the provided methods to dynamically create HTML elements.

-Adding Content: Add content to the created elements using the appropriate methods.

-Setting Attributes: Set attributes such as IDs and classes for the elements as needed.

-Manipulating Visibility: Alter the visibility of elements as necessary.

#Example Usage
javascript
```javascript

// Create a new JSHTML_Builder element

const builder = new JSHTML_Builder(parentElement);


// Add a text element with content "Hello, world!"

builder.addTextElement("Hello, world!");


// Add an image element with the image URL

builder.addImageElement("https://example.com/image.jpg");


// Set the ID of the main element

builder.setId("main");


// Show the element on the HTML page

builder.show();


// Hide the element from the HTML page

builder.hide();

```
Copyright © Text by ChatGPT-3.5 (OpenAI) reviewed by DonShell on 30/03/2024.
