const document = require('./dom');

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

module.exports = Orphanage;