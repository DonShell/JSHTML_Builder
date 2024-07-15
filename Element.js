const JSHTML_Builder = require('./JSHTML_Builder');
const document = require('./dom');

//abstract class
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
		if(this.onClickEnabled)
		{
			if(this.getArgumentOnClick())
			{
				this.HTMLelement.addEventListener('click', function() 
				{
					
					this.onClick(this.getArgumentOnClick());
				}.bind(this));	
			}
			else
			{	
				this.HTMLelement.addEventListener('click', function() 
				{
					this.onClick();
				}.bind(this));
			}
		}
		// else
		// {
		// 	console.log("remove click event not tested, revise this code!");
		// 	this.HTMLelement.removeEventListener('click');
		// }
	}

	getValue()
	{
		return this.content;
	}

	getArgumentOnClick()
	{
		return this.argumentOnClick;
	}
	setArgumentOnClick(args)
	{
		this.argumentOnClick = args; 
	}

	setOnClick(method,enabled = true)
	{
		this.onClick = method;

		if(enabled)
		{
			this.activateOnClick();
		}
		else	
		{
			this.deactivateOnClick();
		}
	}

	activateOnClick()
	{
		this.onClickEnabled = true;
		this.eventsUpdate();

	}

	deactivateOnClick()
	{
		this.onClickEnabled = false;
		this.eventsUpdate();
	}

	onClick(args = this.argumentOnClick)
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

	getParent()
	{
		return this.parent ? this.parent : null;
	}

	setParent(parent)
	{

		//if(parent && parent.generateIdFor && parent.setThisInHTML)
		//{
			this.parent = parent;
		//}
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
		if (!this.HTMLelement) {
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
		
		this.id = id;
		if (this.HTMLelement)
		{
			this.HTMLelement.id = this.id;
		}
		else
		{
			throw Error("element's html not defined");
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
		//this.parent.setInHTML(this);
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
		for( let i = 0; i < classList.length ;i++)
		{
			this.addClass(classList[i]);
		}
	}

	addClass(className)
	{
		if(className)
		{
			if(Array.isArray(className))
			{
				this.addClasses(className);
			}
			else
			{

				this.getHTMLElement().classList.add(className);
			}
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

	static elementWorkJson(element,action,argument)
	{
    
		if(action == "onClickFunction")
		{
			element.setOnClick(argument);
		}
		if(action == "argumentOnClick")
		{
			element.setArgumentOnClick(argument);
		}
		if(action == "elementClass")
		{
			element.addClass(argument);
		}
 		if(action == "elementId")
		{
			element.addClass(argument);
		}
 		if(action == "content")
		{
			element.setContent(argument);
		}
 		if(action == "hide")
		{
			element.hide();
		}
 		if(action == "show")
		{
			element.show();
		}
    	return element;
	}
}

module.exports = Element;