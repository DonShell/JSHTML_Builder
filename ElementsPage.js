class ElementsPage extends Element
{
     // Flag para indicar se os dados foram carregados
	
	constructor(pageId = "Page", startup = false) {
        super();
        this.pageId = pageId;
        this.visible = startup;
		this.pathJson = null;
		this.content = null;
        this.loaded = false;
	}

	getPathJson()
	{
		return this.pathJson;
	}
	setPathJson(path)
	{
		this.pathJson = path;
	}
	getParent()
	{
		return this.parent ? this.parent : null;
	}
	setParent(element)
	{
		this.parent = element;
	}

	processData(execute = false)
	{
        let action = execute ? this.generateJsBuilderFromJson.bind(this) : null;

        if(this.getPathJson())
        {
        	this.loadtoFile(
                        this.getPathJson(), function(){ this.loaded = true}.bind(this)
                ).then(() => {
            	    // Marca como carregado quando o arquivo JSON é processado
        	   }
            );
        
        }
	}

    async loadtoFile(jsonFile, actionFinishMethod = this.generateJsBuilderFromJson.bind(this)) {
        const data = await ElementsPage.loadJsonFile(jsonFile);
        this.jsonConstructor = data;
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

    async generateJsBuilderFromJson(json = this.jsonConstructor) {
        if (json) {
            this.content = JSHTML_Builder.importJson(json,this.getParent());
            if(! this.getParent())
            {
                this.content.declareOrphan();
            }
            this.content.setThisInHTML();
            
            if (this.visible) {
                this.show();
            } else {
                throw new Error("Error in 'generateJsBuilderFromJson()': JSON is null!");
            }   
        }   
    }

    async show() {
        await this.waitForLoad(); // Aguarda até que os dados estejam carregados

        if (this.content) {
            if (this.pageId) {
                this.content.setId(this.pageId);    
            }
            this.content.show();
        } else {
            throw new Error("Error in 'show()': content is null!");
        }
    }

    // Método para aguardar o carregamento dos dados antes de mostrar a página
    async waitForLoad() {
    while (!this.jsonConstructor) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Aguarda 100ms e verifica novamente
    }
  }

}