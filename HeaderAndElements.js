class HeaderAndElements extends Element
{

	createHTML()
	{	
		super.createHTML();
		this.setContentElements();
		this.setHeading();
	}

	setHeading(header = this.header)
	{
		if(this.header)
		{
			this.header.deleteHTML();
			this.header = null;
		}
		if(header)
		{

			if(typeof header == 'string')
			{
				this.header = new TextElement(this,header);
			}
			else
			{
				this.header = header;
			}
			this.header.setParent(this);
			this.header.setClassId();
			const newHtml = this.header.getHTMLElement().outerHTML;
			this.HTMLelement.innerHTML = newHtml;

			this.HTMLelement.appendChild(this.content.getHTMLElement());

	  		this.header.makeVisible(true);
		}

		
		
	}

	setContentElements()
	{
		if(!this.content)
		{
			this.content = new BlockOfElements(this);
			this.elements = this.content;
			this.HTMLelement.appendChild(this.content.getHTMLElement());

		}
	}
	addElement(element)
	{
		this.content.addElement(element);
	}
	addElements(elements)
	{
		this.content.addElements(elements);
	}
	removeElement(element)
	{
		this.content.removeElement(element);
	}
	

	constructor(parent, title = null,classCreator = HeaderAndElements.name) 
	{
		super(parent, null,classCreator);
		this.setHeading(title);
	}
	static createFromJSON(json, parent = null, classCreator = HeaderAndElements) {

	    //if it's a block of elements
	    if ((json.type == classCreator.name)) {

	    	const title = json.title ? json.title : "";
	        
	        const parentBlock = new classCreator(
	            parent, 
	            json.title,
	        );
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
	    	console.log("Error: to HeaderAndElements, use json.type = 'HeaderAndElements' or HeaderAndElements.createFromJSON(json, parent, classChild)");
			return null;
	    }
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
	    if (element !== this.header) 
	    {
		    return this.getContentPrefixId() + "_contains";
	    } 
	    else 
	    {
		    return this.getContentPrefixId() + "_header";
	    }
	}

}