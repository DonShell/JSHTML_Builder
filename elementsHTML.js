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
