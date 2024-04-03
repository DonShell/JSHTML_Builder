//VERSION: 0.1
//write by: DonShell - 03/30/2024

// Abstract Class
class Element {
	static TEXT_CATEGORY = 'Text';
	static IMAGE_CATEGORY = 'Image';
	static BLOCK_CATEGORY = 'Block';
	static ORPHANAGE_CATEGORY = 'Orphanage';
	static VERSION = 0.1;

	content = null;
	id = null;
	visible = false;
	HTMLelement = null;
	parent = null;
	setContent(content)
	{
		this.content = content;
	}
	getContent()
	{
		return this.content;
	}

	declareOrphan(htmlParent)
	{
		this.parent = new Orphanage(htmlParent,this);
	}
	getHTMLElement()
	{
		if (this.HTMLelement === null)
		{
			this.createHTML();
		}
		return this.HTMLelement;
	}

	constructor(parent, content, category) 
	{
		this.setParent(parent);
		this.content = content;
		this.category = category;
		this.createHTML();
	}

	//
	static createFromJSON(element, parent) {
   		//throw "error: createFromJSON root function not declared";
   		return JSHTML_Builder.importJson(element, parent);
    }

	setParent(parent)
	{

		if(parent && parent.generateIdFor && parent.setThisInHTML)
		{
			this.parent = parent;
		}
	}

	createHTML() 
	{
		if (!this.HTMLelement)
		{
			this.HTMLelement = document.createElement('div');
		}
		if (this.id)
		{
			this.HTMLelement.id = this.id;
		}
	}

	getId()
	{
		return this.id;
	}
	setId(id) 
	{
		if (id === undefined) 
		{
			if (!this.id)
			{
				if(this.parent.generateIdFor)
				{
					this.id = this.parent.generateIdFor(this);
				}
				else
				{
					throw "no id as argument nor parent for reference";
				}
			} 
		}
		else 
		{
			this.id = id;
		}

		if (this.HTMLelement)
		{
			this.HTMLelement.id = this.id;
		}
		else
		{
			throw new Error("element's html not defined");
		}
	}

	setThisInHTML(visible = true) 
	{
		this.validateToSetInHTML(this);
		this.setId();
		this.parent.setInHTML(this);
		this.makeVisible(visible);
	}

	validateToSetInHTML()
	{
		//validating parent object
		if (this.parent)
		{
			if (! (this.parent.generateIdFor && this.parent.addElement))
			{
				throw "element.parent does not have 'generateIdFor' or 'setThisInHTML' class";
			}
		}
		else
		{
			throw "element.parent not declared"
		}
	}

	setInElementHTML(parentId) 
	{
		this.setId();
		let parentDiv = null;

		if (parentId !== undefined) 
		{
			parentDiv = document.getElementById(parentId);
		} else {
			parentDiv = document.body;
		}

		if (parentDiv === null) 
		{
			throw new Error("'parentId' does not exist");
		} else {
			parentDiv.appendChild(this.HTMLelement);
		}

		this.parent.setInHTML(this);
		this.makeVisible(this.visible);
	}

	deleteHTML() 
	{
		this.HTMLelement.remove();
		this.HTMLelement = null;
	}

	show()
	{
		this.makeVisible(true);
	}
	hide()
	{
		this.makeVisible(false);
	}

	makeVisible(choice) 
	{
		if (choice) 
		{
			this.HTMLelement.style.display = 'block';
		} 
		else 
		{
			this.HTMLelement.style.display = 'none';
		}
		this.visible = choice;
	}

	toggleVisibility() 
	{
		this.makeVisible(!this.visible);
	}
	getString()
	{
		return "{content: "+ content + "}";
	}
}


class Orphanage
{
	idPrefix = "orphan_"; 

	constructor(htmlParent = document.body, element = null)
	{
		if (!htmlParent && htmlParent.nodeType == undefined)
		{
			//InvalidHtmlParent or not declared
			htmlParent = document.body;
		}
		//if element = id of element
		else if (document.getElementById(htmlParent)) 
		{
			htmlParent = document.getElementById(htmlParent);
		}
		this.HTMLelement = htmlParent;
		this.category = Element.ORPHANAGE_CATEGORY;
		this.addElement(element);
	}

	generateIdFor()
	{
		let id=0;
		do
		{
			id++;
		}
		while(document.getElementById("#" + this.idPrefix + id));
		return "#" + this.idPrefix + id;
	}

	createHTML()
	{
		this.setInHTML(this.content);
	}
	setInHTML(element)
	{
		this.HTMLelement.appendChild(element.getHTMLElement());
		this.HTMLelement.style.display = 'block';


	}
	addElement(element)
	{
		this.content = element;
		this.setInHTML(element);
	}

	getString()
	{
		return "[ content:" + this.content + "]";
	}

}


// Holds a group of elements
class BlockOfElements extends Element 
{
	//override
	static createFromJSON(json, parent = null) {

		//if it's a block of elements
		if (json.blockElements && Array.isArray(json.blockElements))
		{
        	const parentBlock = new BlockOfElements(parent);
        	json.blockElements.forEach(item => {
            	const content = BlockOfElements.createFromJSON(item,parentBlock);
            	parentBlock.addElement(content);
            });
            return parentBlock;
		}
		else
		{ 
	        return JSHTML_Builder.importJson(json, parent);
		}
        return null;

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

		element.deleteHTML();
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

class ImageElement extends Element 
{
	constructor(parent, content) 
	{
		super(parent, content, Element.IMAGE_CATEGORY);
	}


	//override
	static createFromJSON(json, parent) {
		return new ImageElement(parent,json.image);
    }
	createHTML() 
	{
		super.createHTML();
		this.HTMLelement.style.backgroundImage = "url('" + this.content + "')";
	}

	getString()
	{
		return "{ image: url('" + this.content + "')}";
	}
}
class TextElement extends Element 
{
	constructor(parent, content) {
		super(parent, content, Element.TEXT_CATEGORY);
	}

	//override
	static createFromJSON(json,content)
	{
		if(json.text)
		{
			return new TextElement(content,json.text);
		}
		else if (typeof json === 'string')
		{
			return new TextElement(content,json);
		}
	}
    

	getString()
	{
		return "{ text:" + this.content + "}";
	}

	createHTML() {
		super.createHTML();
		this.HTMLelement.textContent = this.content;
	}
}


class BE_Heading extends BlockOfElements
{ 
	//override
	constructor(pai, title) 
	{
		super(pai);
		this.setHeading(title);
	}
	static createFromJSON(json, parent = null) {

	    //if it's a block of elements
	    if (json.BlockOfElements && Array.isArray(json.BlockOfElements) && json.BlockOfElements[0].title) {
	        
	        const parentBlock = new BE_Heading(
	            parent, 
	            json.BlockOfElements[0].title,
	        );
	        json.blockElements.forEach(item => {
	            if (!item.title) {
	                const content = BE_Heading.createFromJSON(item, parentBlock);
	                parentBlock.addElement(content);
	            }
	        });
	        return parentBlock;
	    } 
	    else 
	    {
	        return JSHTML_Builder.importJson(json, parent);
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
	    if (!this.id) {
	    	this.title.setId("title");
	    }
	    else
	    {
	    	this.title.setId(this.id + "_title");
	    }
	    this.title.makeVisible(true);
	}
	//override
	generateIdFor(element) {
	    if (element !== this.title) {
	        return super.generateIdFor(element);
	    } else {
	        return this.getContentPrefixId() + "title";
	    }
	}

	//override
	addElement(element)
	{
		super.addElement(element)
	}
}


class JSHTML_Builder
{
	static importJson(json, parent = null)
	{

		//if text
		if(json.text || json.TextElement || typeof json == 'string')
		{
			return TextElement.createFromJSON(json,parent);
		}
		//if image	
		if(json.image || json.ImageElement)
		{
			return ImageElement.createFromJSON(json,parent);
		}
		//if BlockOfElements	
		if(json.BlockOfElements)
		{
			return BlockOfElements.createFromJSON(json,parent);
		}
		//if BE_Heading	
		if(json.BE_Heading)
		{
			return BE_Heading.createFromJSON(json,parent);
		}
		//if ListSelect	
		if(json.ListSelect)
		{
			return ListSelect.createFromJSON(json,parent);
		}
		//if ClickShow	
		if(json.ClickShow)
		{
			return ClickShow.createFromJSON(json,parent);
		}

		console.log("Unknown JSON element type:", json);
		//throw "Unknown Json element type!"
    	return null;
	}

}