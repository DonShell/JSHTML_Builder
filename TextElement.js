const Element = require('./Element.js');
const document = require('./dom');

class TextElement extends Element 
{
	constructor(parent, content = "") {
		super(parent, content, Element.TEXT_CATEGORY);
	}

	getValue()
	{
		return this.getText();
	}

	//override
	static createFromJSON(json,parent)
	{
		console.log("content: " + json);
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

	getText()
	{
		return this.content;
	}
	
	setContent(text = "")
	{
		super.setContent(text);
		this.HTMLelement.textContent = this.content;
		console.log("text: " + text);
		console.log("html: " + this.HTMLelement);
	}
}


module.exports = TextElement;