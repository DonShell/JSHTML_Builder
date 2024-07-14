class ElementsPage {
    jsbuilder = null;
    loaded = false; // Flag para indicar se os dados foram carregados

    constructor(pageId = "Page", jsonConstructor = null, startup = false) {
        this.pageId = pageId;
        this.visible = startup;
        if (jsonConstructor) {
            this.loadtoFile(jsonConstructor).then(() => {
                this.loaded = true; // Marca como carregado quando o arquivo JSON é processado
            });
        }
    }

    async loadtoFile(jsonFile, actionFinishMethod = this.generateJsBuilderFromJson.bind(this)) {
        const data = await ElementsPage.loadJsonFile(jsonFile);
        if (actionFinishMethod && data) {
            actionFinishMethod(data);
        }
        return data;
    }

    static async loadJsonFile(local) {
        try {
            const response = await fetch(local);
            return response.json();
        } catch (error) {
            console.error('Erro ao carregar o arquivo:', error);
            return null;
        }
    }

    async generateJsBuilderFromJson(json) {
        if (json) {
            this.jsbuilder = JSHTML_Builder.importJson(json);
            this.jsbuilder.declareOrphan();
            this.jsbuilder.setThisInHTML();
            
            if (this.visible) {
                this.show();
            } else {
                throw new Error("Error in 'generateJsBuilderFromJson()': JSON is null!");
            }   
        }   
    }

    async show() {
        await this.waitForLoad(); // Aguarda até que os dados estejam carregados

        if (this.jsbuilder) {
            if (this.pageId) {
                this.jsbuilder.setId(this.pageId);    
            }
            this.jsbuilder.show();
        } else {
            throw new Error("Error in 'show()': jsbuilder is null!");
        }
    }

    // Método para aguardar o carregamento dos dados antes de mostrar a página
    async waitForLoad() {
        if (!this.loaded) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Aguarda 100ms e verifica novamente
            await this.waitForLoad(); // Chama recursivamente até que loaded seja true
        }
    }
}