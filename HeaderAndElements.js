const Element = require('./Element.js');
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
			//this.header.setClassId();
			this.HTMLelement.innerHTML = "";
			this.HTMLelement.appendChild(this.header.getHTMLElement());
			this.HTMLelement.appendChild(this.content.getHTMLElement());

	  		//this.header.makeVisible(true);
			if(this.id)
			{
				this.header.setId(this.id + "_title");
			}

		}

		
		
	}

	setContentElements()
	{
		if(!this.content)
		{
			this.content = new BlockOfElements(this);
			this.elements = this.content;
			this.HTMLelement.appendChild(this.content.getHTMLElement());
			if(this.id)
			{
				this.content.setId(this.id + "_box");
			}
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
	
	//override
	setId(id)
	{
		super.setId(id);
		if(this.id)
		{
			this.header.setId(this.id + "_title");
			if(this.header)
			{
				this.header.setId(this.id + "_header");
			}
			if(this.content)
			{
				this.content.setId(this.id + "_box");
			}
		}

	}

	constructor(parent, header = null,classCreator = HeaderAndElements.name) 
	{
		super(parent, null,classCreator);
		this.setHeading(header);
	}
	static createFromJSON(json, parent = null, classCreator = HeaderAndElements) {

	    //if it's a block of elements
	    if ((json.type == classCreator.name)) {

	    	json.title = json.title ? json.title : "";

	    	const title = JSHTML_Builder.importJson(json.title, null);
	        
	        const parentBlock = new classCreator(
	            parent, 
	           	title,
	        );

	        if(json.elementClassDefault)
        	{
        		parentBlock.addElementClassDefault(json.elementClassDefault);
        	}
        	if(json.triggeredContentRegistration)
        	{
	        	parentBlock.autoRegistryContentByJson(json.triggeredContentRegistration);
        	}

	        if(Array.isArray(json.content))
	        {
	        	json.content.forEach(item => {
	                const content = JSHTML_Builder.importJson(item, parentBlock.content);
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

	addElementClassDefault(className)
	{
		this.content.addElementClassDefault(className);
	}
	addElementClassesDefault(className)
	{
		this.content.addElementClassesDefault(className);
	}
	removeElementClassDefault(className)
	{
		this.content.removeElementClassDefault(className);
	}


	//Override
	autoRegistryContentByJson(json)
	{
		if(this.content)
		{
			this.content.autoRegistryContentByJson(json);
		}
		else
		{
			throw "Error in autoRegisterContentJson: content of " + this.constructor.name + " not defined!";
		}

	}

	getElementClassDefault()
	{
		if(this.content)
		{
			return this.content.getElementClassDefault();
		}
		else
		{
			return null;
		}
	}

	setElementClassDefault(className)
	{
		if(this.content)
		{
			this.content.setElementClassDefault(className);
		}
		else
		{
			throw "HTML not declared, class css not seted!";
		}
	}
}
module.exports = HeaderAndElements;