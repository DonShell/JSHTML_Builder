const Element = require('./Element.js');

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
		this.setImage( this.content);
	}
	setImage(image)
	{
		if(this.HTMLelement && image)
		{
			this.content = image;
			this.HTMLelement.style.backgroundImage = "url('" + image + "')";
		}
	}

	getString()
	{
		return "{ image: url('" + this.content + "')}";
	}
}
module.exports = ImageElement;