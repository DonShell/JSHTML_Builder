//VERSION: 0.1
//write by: DonShell - 03/30/2024

// Abstract Class
class Element {
	static TEXT_CATEGORY = 'Text';
	static IMAGE_CATEGORY = 'Image';
	static BLOCK_CATEGORY = 'Block';
	static ORPHANAGE_CATEGORY = 'Orphanage';
	static VERSION = 0.1;
	
	static HTML_ELEMENT_TYPE = 'div';

	getHTMLElementType()
	{
		return Element.HTML_ELEMENT_TYPE;
	}


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

	eventsUpdate()
	{
		if(this.onclickEnabled)
		{
			this.HTMLelement.addEventListener('click', function() 
			{
	            this.onclick();
		    }.bind(this));
		}
	}

	activateOnClick()
	{
		this.onclickEnabled = true;
		this.eventsUpdate();

	}

	deactivateOnClick()
	{
		this.onclickEnabled = false;
		this.eventsUpdate();
	}

	onclick()
	{
		//methodOnclick in here!

	}

	constructor(parent, content, category = null) 
	{
		this.setParent(parent);
		this.content = content;
		this.category = category;
		this.createHTML();
	}


	static createFromJSON(json, parent) {
   		//throw "error: createFromJSON root function not declared";
   		return JSHTML_Builder.importJson(json, parent);
    }

    importAtributesFromJSON(json)
    {
		if(json.classElement)
		{
			if(Array.isArray(json.classElement))
			{
				this.addClasses(json.classElement);
			}
			else
			{
				this.addClass(json.classElement);
			}
		}
		if(json.id)
		{
			this.setId(json.id);
		}
		if(json.otherVariables)
		{
			Object.keys(json.othersVariables).forEach(key => 
			{
			 	this.setVariable(key,json.otherVariables[key],json.forceOtherVariables);
			});
		}
    }

    setVariable(name,value,force = false)
    {
    	if (!this.isUniqueVariableName(name)) 
    	{
    		if(force)
    		{
				setVariable(name + "_",value,force);
    		}
            else
            {
            	console.error(`Variable name "${name}" is not unique.`);
            }
        }
        else
        {
	    	this[name] = value;
	 	}
    }

    isUniqueVariableName(name)
    {
    	return !(Object.getOwnPropertyNames(this.constructor.prototype).includes(name))
    }

	setParent(parent)
	{

		if(parent && parent.generateIdFor && parent.setThisInHTML)
		{
			this.parent = parent;
		}
	}

	setEnabled(enabled = true)
	{
		if(this.HTMLelement)
		{
			this.HTMLelement.disabled = !enabled;
		}
	}

	createHTML() 
	{
		if (!this.HTMLelement)
		{
			this.HTMLelement = document.createElement(this.getHTMLElementType());	
		}
		this.updateHTML();
	}



	updateHTML()
	{
		if (this.HTMLelement)
		{
			if (this.id)
			{
				this.HTMLelement.id = this.id;
			}
			this.eventsUpdate();
		}
		else
		{
			throw "HTML not declared! use createHTML";
		}
	}

	getId()
	{
		return this.id;
	}

	unsetId()
	{
		this.id = null
		if (this.HTMLelement)
		{
			this.HTMLelement.id = this.id;
		}
	}
	unsetClassId()
	{

		this.classId = null;
		if(this.idClass)
		{
			this.removeClass(this.idClass);
		}
	}

	setId(id = Element.generateIdName(this)) 
	{
		
		this.id = id
		

		if (this.HTMLelement)
		{
			this.HTMLelement.id = this.id;
		}
		else
		{
			throw new Error("element's html not defined");
		}
	
	}
	setClassId(id = Element.generateIdName(this)) 
	{
		if(this.idClass)
		{
			this.removeClass(this.idClass);
		}

		this.classId = id;
		
		this.addClass(this.idClass);
		
	}

	generateId()
	{
		this.setId(Element.generateIdName(this));
	}
	generateClassId()
	{
		this.setClassId(Element.generateIdName(this));
	}

	static generateIdName(element) 
	{
		if (!element.id)
		{
			if(element.parent && element.parent.generateIdFor)
			{
				return element.parent.generateIdFor(element);
			}
			else
			{
				return Orphanage.generateIdUnique(element.constructor.name);
				//throw "no id as argument not parent for reference";
			}
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
		} 
		else 
		{
			parentDiv = document.body;
		}

		if (parentDiv === null) 
		{
			throw new Error("'parentId' does not exist");
		} 
		else 
		{
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

	addClasses(classList)
	{
		for(i=0; i < classList.length ;i++)
		{
			this.addClass(classList[i]);
		}
	}

	addClass(className)
	{
		if(className)
		{
    		this.getHTMLElement().classList.add(className);
		}
	}

	removeClass(className)
	{
    	this.getHTMLElement().classList.remove(className);
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
		return Orphanage.generateIdUnique(this.idPrefix);
	}

	static generateIdUnique(name="element")
	{
		let id=0;
		do
		{
			id++;
		}
		while(document.getElementById( name + id));
		return name + id;
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

	removeElement(element)
	{
		this.content.splice(element, 1);
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
		if (json.type == "BlockOfElements")
		{
        	const parentBlock = new BlockOfElements(parent);
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

class ImageElement extends Element 
{
	constructor(parent, content) 
	{
		super(parent, content, Element.IMAGE_CATEGORY);
	}


	//override
	static createFromJSON(json, parent) {
		//validate
		if(json.type == "ImageElement")
		{
			return new ImageElement(parent,json.content);
		}
		else
		{
			console.log("Error: to ImageElement use json.type = 'ImageElement'")
			return null;
		}
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
	constructor(parent, content = "") {
		super(parent, content, Element.TEXT_CATEGORY);
	}

	//override
	static createFromJSON(json,parent)
	{
		if(json.type == "TextElement")
		{
			if (json.text)
			{
				json.content = json.text;
			}
			return new TextElement(parent,json.content);
		}
		else
		{
			console.log("Error: to TextElement, use json.type = 'TextElement'")
			return null;
		}
	}
    

	getString()
	{
		return "{ text:" + this.content + "}";
	}

	createHTML() {
		super.createHTML();
		this.setText(this.content);
	}


	setText(text = "")
	{
		this.setContent(text);
	}
	
	setContent(text = "")
	{
		super.setContent(text);
		this.HTMLelement.textContent = this.content;
	}
}


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


class JSHTML_Builder
{
	static importJson(json, parent = null)
	{
		var element = null;
	

		json = JSHTML_Builder.fixAbbreviatedNames(json);

		switch(json.type)
		{
			case "TextElement":

				element = TextElement.createFromJSON(json,parent);
				break;

			case "ImageElement":

				element = ImageElement.createFromJSON(json,parent);
				break;

			case "InputElement":

				element = TextAreaElement.createFromJSON(json,parent);
				break;

			case "InputTextElement":

				element = TextAreaElement.createFromJSON(json,parent);
				break;

			case "InputButtonElement":

				element = TextAreaElement.createFromJSON(json,parent);
				break;

			case "TextAreaElement":

				element = TextAreaElement.createFromJSON(json,parent);
				break;

			case "BlockOfElements":
				
				element = BlockOfElements.createFromJSON(json,parent);
				break;

			case "BE_Heading":

				element = BE_Heading.createFromJSON(json,parent);
				break;

			case "HeaderAndElements":

				element = HeaderAndElements.createFromJSON(json,parent);
				break;

			case "ListSelect":

				element = ListSelect.createFromJSON(json,parent);
				break;

			case "ClickShow":

				element = ClickShow.createFromJSON(json,parent);
				break;

			case "WhatsAppContact":

				element = WhatsAppContact.createFromJSON(json,parent);
				break;

			case "InstagramContact":

				element = InstagramContact.createFromJSON(json,parent);
				break;

			case "CardItem":

				element = CardItem.createFromJSON(json,parent);
				break;

			case "ListCards":

				element = ListCards.createFromJSON(json,parent);
				break;

			case "CardModel1":

				element = CardModel1.createFromJSON(json,parent);
				break;

			default:

				console.log("Unknown JSON element type:", json);
				//throw "Unknown Json element type!"
		}
		if(element)
		{
			element.importAtributesFromJSON(json);
		}
		return element;
//
	}


	static fixAbbreviatedNames(json)
	{
		if(json.type == "text" || json.text || typeof json == 'string')
		{
			if (typeof json === 'string' )
			{
				const text = json;
				json = new Object();
				json.content = text;
			}
			else if (json.text)
			{
				json.content = json.text;
			}
			json.type = "TextElement";
		}
		//if image	
		else if(json.type == "image" || json.image)
		{
			if (json.image)
			{
				json.content = json.image;
			}
			json.type = "ImageElement";
		}
		return json;
	}

}