const BlockOfElements = require('./BlockOfElements.js');
const ElementsPage = require('./ElementsPage.js');
class PageManeger extends BlockOfElements
{
	constructor()
	{
		super();
		this.pageList = new Array();
	}

	async addPageFromJson( name, path,visible = false)
	{
		let newPage = new ElementsPage(name, visible);

		this.pageList[this.pageList.length] = newPage;

		newPage.setPathJson(path);

		newPage.processData();

		if(visible)
		{
			this.inicializeAllPages();
		}

	}

	async inicializeAllPages()
	{
		for (var i = 0; i < this.pageList.length; i++) {

			const elementsPage = this.pageList[i];

			if(! elementsPage.jsonConstructor)
			{
				console.log("passando");
				elementsPage.waitForLoad();
			}
			if(!elementsPage.content)
			{
				elementsPage.setParent(this);

				await elementsPage.generateJsBuilderFromJson();
 	           	console.log("HTML loaded: " + elementsPage.content.getHTMLElement().outerHTML);

				this.addElement(elementsPage.content);
			}
		}
        
        console.log("HTML loaded on PageManeger: " + this.getHTMLElement().outerHTML);
        console.log("content PageManeger: " +  this.getHTMLElement().outerHTML);

	}


}
module.exports = PageManeger; 