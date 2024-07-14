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

	}

	async inicializeAllPages()
	{
		for (var i = 0; i < this.pageList.length; i++) {

			let elementsPage = this.pageList[i];

			if(! elementsPage.jsonConstructor)
			{
				console.log("passando");
				elementsPage.waitForLoad();
			}
			if(!elementsPage.content)
			{
				elementsPage.generateJsBuilderFromJson();

				elementsPage.setParent(this);
				this.addElement(elementsPage);
			}
		}
	}

}