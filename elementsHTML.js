class TextAreaElement extends TextElement
{
	static HTML_ELEMENT_TYPE = 'textarea';

	getHTMLElementType()
	{
		return TextAreaElement.HTML_ELEMENT_TYPE;
	}
	constructor(parent, content = "")
	{
		super(parent, content);
	}
	getText()
	{
		return this.HTMLelement.value;
	}
}
class InputElement extends TextElement
{
	static ELEMENT_TYPE = "Input";
	static HTML_ELEMENT_TYPE = 'Input';
	
	getHTMLElementType()
	{
		return InputElement.HTML_ELEMENT_TYPE;
	}
	constructor(parent, value)
	{
		super(parent, value);
		this.HTML_ELEMENT_TYPE = "input";
	}

	//override
	setText(text = "")
	{
		this.HTMLelement.value = text;
	}
}
class InputTextElement extends InputElement
{
	static ELEMENT_TYPE = "InputText";

	//Override
	updateHTML()
	{
		super.updateHTML();
		this.HTMLelement.setAttribute('type','text');
	}
}

class InputButtonElement extends InputElement
{
	static ELEMENT_TYPE = "ButtonText";

	static createFromJSON(json, parent = null) {

		//if it's a block of elements
		if (json.type == "InputButtonElement")
		{

			const parentBlock = new InputButtonElement(parent,json.content);
			return parentBlock;
		}
		else
		{ 
			console.log("Error: to InputButtonElement use json.type = 'InputButtonElement'");
			return null;
		}

	}
	
	constructor(parent, value,enabled = true)
	{
		super(parent, value);
		this.setEnabled(enabled);
		this.activateOnClick();
	}

	//Override
	updateHTML()
	{
		super.updateHTML();
		this.HTMLelement.setAttribute('type','button');
		// this.HTMLelement.addEventListener('click', function() 
		// {
        //     this.onclick();
	    // }.bind(this));
	}

	onclick()
	{
		return false;
	}
}
class IframeElement extends Element
{

	static HTML_ELEMENT_TYPE = "iframe";


	getHTMLElementType()
	{
		return IframeElement.HTML_ELEMENT_TYPE;
	}
	
	static createFromJSON(json, parent = null) {

		//if it's a block of elements
		if ((json.type == "IframeElement")) {

			const parentBlock = new IframeElement(
				parent, 
				json.url,
			);
			
			return parentBlock;
		} 
		else 
		{
			console.log("Error: to IframeElement, use json.type = 'IframeElement'");
			return null;
		}
	}


	constructor(parent,url)
	{
		super(parent,url);
		this.url = url;
		this.setIframe(this.url);
	}
	setIframe(url)
	{
		this.HTMLelement.setAttribute("frameborder","0");
		this.HTMLelement.setAttribute("src",url);
	}
}