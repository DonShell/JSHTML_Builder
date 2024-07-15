const BlockOfElements = require('./BlockOfElements.js');

class BE_Heading extends BlockOfElements
{ 
	//override
	constructor(parent, title = "") 
	{
		super(parent);
		this.setHeading(title);
	}
	static createFromJSON(json, parent = null) {

		//if it's a block of elements
		if ((json.type == "BE_Heading")) {

			const title = json.title ? json.title : "";
			
			const parentBlock = new BE_Heading(
				parent, 
				json.title,
			);
			
			if(json.classItemDefault)
			{
				parentBlock.setClassItemDefault(json.classItemDefault);
			}
			if(Array.isArray(json.content))
			{
				json.content.forEach(item => {
					const content = JSHTML_Builder.importJson(item, parentBlock);
					parentBlock.addElement(content);
		   		});
			}
			return parentBlock;
		} 
		else 
		{
			console.log("Error: to BE_Heading, use json.type = 'BE_Heading'");
			return null;
		}
	}

	setHeading(title) {
		if (typeof title === 'string') {
			this.content[0] = new TextElement(this, title);
		} else {
			this.content[0] = title;
		}
		this.title = this.content[0];
		this.addElement(this.title);
		this.title.addClass(
		   	this.generateIdFor(this.title)
		);

		
		this.title.makeVisible(true);
	}

	//override
	getContentPrefixId()
	{
		if(!this.id)
		{
			return this.constructor.name;
		}
		else
		{
			return this.id;
		}
	}

	//override
	generateIdFor(element) {
		if (element !== this.title) 
		{
			return super.generateIdFor(element);
		} 
		else 
		{
			return this.getContentPrefixId() + "_title";
		}
	}

	setClassItemDefault(className)
	{
		this.classItemDefault = className;
	}
	getClassItemDefault()
	{
		return this.classItemDefault;
	}

	//override
	addElement(element)
	{
	 	super.addElement(element);
	 	if(element != this.title)
		{
			element.addClass(this.getClassItemDefault());
		}

	}
}

module.exports = BE_Heading;