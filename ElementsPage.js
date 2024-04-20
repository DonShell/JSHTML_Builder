class ElementsPage {
	jsbuilder = null;
	
	constructor(pageId = "Page", jsonConstructor = null, startup = false) {
		this.pageId = pageId;
		this.visible = startup;
		if (jsonConstructor) {
			this.loadtoFile(jsonConstructor);
		}
	}

	loadtoFile(jsonFile, actionFinishMethod = this.generateJsBuilderFromJson.bind(this)) {
		return ElementsPage.loadJsonFile(jsonFile)
			.then(data => {
				if (actionFinishMethod) {
					actionFinishMethod(data);
				}
				return data;
			})
			.catch(error => {
				console.error('Erro ao carregar o arquivo:', error);
				return false;
			});
	}

	static loadJsonFile(local) {
		return fetch(local)
			.then(response => response.json())
			.catch(error => {
				console.error('Erro ao carregar o arquivo:', error);
				return false;
			});
	}

	generateJsBuilderFromJson(json) {
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

	show() {
		if (this.jsbuilder) {
			if (this.pageId) {
				this.jsbuilder.setId(this.pageId);	
			}
			this.jsbuilder.show();
		} else {
			throw new Error("Error in 'show()': jsbuilder é null!");
		}
	}
}