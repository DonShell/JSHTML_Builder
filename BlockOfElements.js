// Holds a group of elements
class BlockOfElements extends Element 
{
	//override
	static createFromJSON(json, parent = null) {

		//if it's a block of elements
		if (json.type == "BlockOfElements")
		{
			const parentBlock = new BlockOfElements(parent);

			if(parent)
			{
				parentBlock.addElementClassDefault(parent.getElementClassDefault());
			}

        	if(json.triggeredContentRegistration)
        	{
	        	parentBlock.autoRegistryContentByJson(json.triggeredContentRegistration);
        	}

			if(Array.isArray(json.content))
			{
				json.content.forEach(item => {
					const content = JSHTML_Builder.importJson(item,parentBlock);
					parentBlock.addElement(content);
				});
			}
			return parentBlock;
		}
		else
		{ 
			console.log("Error: to BlockOfElements use json.type = 'BlockOfElements'");
			return null;
		}

	}
	autoRegistryContentByJson(json)
	{
		//json
		// *"definitions":[]
		// *"structureContent":[]
		// *"content":[]

        if(Array.isArray(json.content))
        {
        	for( let y = 0; y < json.content.length; y++)
        	{
        		let contentListItem = json.content[y];
        		  //find typeElement
		        let indiceType = json.structureContent.indexOf("typeElement");
				let type = json.structureContent[indiceType];
				
				if(!type)
				{

					for( let x = 0; x < json.definitions.length; x++)
			        {
			        	if(json.definitions[x].typeElement)
						{
							type = json.definitions[x].typeElement;
						}
			        }

					if(!type)
					{   
						throw "unspecific typeElement in AutoRegistrer of " + this.constructor.name;
					}
				}

				let element = eval("new "+type +"(null)");
				element.setParent(this);

				for( let x = 0; x < json.definitions.length; x++)
		        {
		        	this.elementWorkJson(element,json.definitions[x],contentListItem[x]);
		        }

		        for( let x = 0; x < contentListItem.length; x++)
		        {
		        	this.elementWorkJson(element,json.structureContent[x],contentListItem[x]);
		        }
            	this.addElement(element);
       		}
        }
	}
	elementWorkJson(element,action,argument)
	{
    	element = Element.elementWorkJson(element,action,argument);

		if(action == "addContent")
		{
			let content = JSHTML_Builder.importJson(argument);
			element.addElement(content);
		}
	    //return element; 
	}
	constructor(parent) 
	{
		super(parent, [], Element.BLOCK_CATEGORY);
	}

	addElements(...content) 
	{
		for (let i = 0; i < content.length; i++) 
		{
			this.addElement(content[i]);
		}
	}

	addElement(element) 
	{
		if (!this.elementIsLinked(element)) 
		{
			this.content.push(element);
			element.setParent(this);
		}
		if (!this.elementIsInHTML(element)) 
		{
			this.HTMLelement.appendChild(element.getHTMLElement());
		}
		element.addClass(this.getElementClassDefault());
	}

	addElementClassesDefault(classesArray)
	{
		for (var i = 0; i < classesArray.length; i++) {
			this.addElementClassDefault(classesArray[i]);
		}
	}

	addElementClassDefault(className)
	{
		if(Array.isArray(className))
		{
			this.addElementClassesDefault(className);
		}
		else
		{
			if(!this.elementClassDefault)
			{
				this.setElementClassDefault([]);
			}
			else if(typeof this.elementClassDefault == 'String')
			{
				const temp = this.elementClassDefault;
				this.setElementClassDefault([]);
				this.elementClassDefault[0] = temp;
			}
			this.elementClassDefault[this.elementClassDefault.length] = className;
			this.addClassInAllElements(className);
		}
	}


	addClassInAllElements(className)
	{
		if(this.content)
		{
			for (let i = 0; i < this.content.length; i++) {

				this.content[i].addClass(className);
			}
		}
	}
	removeClassInAllElements(className)
	{
		if(this.content)
		{
			for (let i = 0; i < this.content.length; i++) {
				this.content[i].removeClass(className);
			}
		}
	}
	removeElementClassDefault(className)
	{
		const index = this.elementClassDefault.indexOf(className);

		if (index !== -1) 
		{
			this.elementClassDefault.splice(index, 1);
		}
	}

	setElementClassDefault(className)
	{
		this.elementClassDefault = className;
	}



	getElementClassDefault()
	{
		return this.elementClassDefault;
	}

	elementIsLinked(element) 
	{
		return this.content.includes(element);
	}

	elementIsInHTML(element) 
	{
		return this.HTMLelement.contains(element.getHTMLElement());
	}

	removeElement(element) 
	{
		const index = this.content.indexOf(element);

		if (index !== -1) 
		{
			this.content.splice(index, 1);
		}
	}
	deleteElement(element)
	{
		this.removeElement(element);
		if(element)
		{
			element.deleteHTML();
		}
	}
	getContentPrefixId()
	{
		return this.id + "_sub";
	}

	generateIdFor(element)
	{
		if(this.elementIsLinked(element))
		{
			const index = this.content.indexOf(element);
			return this.getContentPrefixId()+index;
		}
		else
		{
			return null;
		}
	}

	getString()
	{
		ret = "{ content: \n[";
		for (var i = 0; i <= content.length; i++) {
			ret=+"\n  " + content[i];
		}
		ret=+"\n]";
		return ret;
	}
}
