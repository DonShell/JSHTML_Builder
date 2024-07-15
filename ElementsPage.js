const Element = require('./Element.js');
const fs = require('fs');
const path = require('path');

class ElementsPage extends Element {
    constructor(pageId = "Page", startup = false) {
        super();
        this.pageId = pageId;
        this.visible = startup;
        this.pathJson = null;
        this.content = null;
        this.loaded = false;
    }

    setPathJson(path) {
        this.pathJson = path;
    }

    getPathJson() {
        return this.pathJson;
    }

    processData(execute = false) {
        let action = execute ? this.generateJsBuilderFromJson.bind(this) : null;

        if (this.getPathJson()) {
            try {
                const jsonData = this.loadJsonFromFile(this.getPathJson());
                this.jsonConstructor = jsonData;
                console.log("json loaded:", JSON.stringify(jsonData, null, 2));
                if (action) {
                    action(jsonData);
                }
                this.loaded = true;
            } catch (error) {
                console.error('Error loading JSON file:', error);
                throw error;
            }
        }
    }

    getJsonConstructor() {
        return this.jsonConstructor ? this.jsonConstructor : null;
    }

    loadJsonFromFile(jsonFile) {
        const absolutePath = path.resolve(__dirname, jsonFile);
        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        return JSON.parse(fileContent);
    }

    generateJsBuilderFromJson(json = this.getJsonConstructor()) {
        if (json) {
            const JSHTML_Builder = require('./JSHTML_Builder'); // Importar localmente aqui
            this.content = JSHTML_Builder.importJson(json, this.getParent());
            if (!this.getParent()) {
                this.content.declareOrphan();
            }
            this.content.setThisInHTML();

            console.log("HTML loaded on ElementsPage: " + this.content.getHTMLElement().outerHTML);

            if (this.visible) {
                this.show();
            } 
        } else {
            throw new Error("Error in 'generateJsBuilderFromJson()': JSON is null!");
        }
    }

    show() {
        this.waitForLoad(); // Aguarda até que os dados estejam carregados

        if (this.content) {
            if (this.pageId) {
                this.content.setId(this.pageId);
            }
            this.content.show();
        } else {
            throw new Error("Error in 'show()': content is null!");
        }
    }

    waitForLoad() {
        while (!this.jsonConstructor) {
            // Aguarda até que os dados estejam carregados
        }
    }
}

module.exports = ElementsPage;
