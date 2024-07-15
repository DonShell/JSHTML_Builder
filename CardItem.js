const BE_Heading = require('./BE_Heading.js');
class CardItem extends BE_Heading
{
	static createFromJSON(json, parent = null,classCreator = CardItem) {

		if (json.type == classCreator.name)
		{
			const title = json.title ? json.title : "item";

      		const elementBlockParent = new classCreator(
      			parent,
      			title
        	);


	        if(json.cardColor)
	        {
	        	elementBlockParent.setCardColor(json.cardColor);
	        }

        	if(Array.isArray(json.content))
	        {
	        	json.content.forEach(item => {
	                const content = JSHTML_Builder.importJson(item, elementBlockParent);
	                elementBlockParent.addElement(content);
	       		});
	        }

			elementBlockParent.personalizeCard();

            return elementBlockParent;
		}
		else
		{
	        console.log("Error: to ImageElement use json.type = 'CardItem'");
			return null;
		}
	}

	//override
	getContentPrefixId()
	{
		if(!this.id)
		{
			return "card";
		}
		else
		{
			return this.id;
		}
	}

	addElement(element)
	{
		super.addElement(element);
		
		if(element instanceof ImageElement)
		{
			if(!this.mainImage)
			{
				this.defineMainImage(element);
			}
		}
	}
	
	setMainImage(element)
	{
		super.addElement(element);
		this.defineMainImage(element);
	}

	defineMainImage(element)
	{
		this.mainImage = element;
		this.mainImage.addClass("mainImageCard");
	}


	constructor(parent,title)
	{
		super(parent,title);
		this.activateOnClick();
	}


	setCardColor(cardColor)
	{
		if(cardColor instanceof HexColor)
		{
			this.cardColor=cardColor;
		}
		else if(cardColor)
		{
			this.cardColor = new HexColor(cardColor);
		}
		else
		{
			this.cardColor=cardColor;
		}

	}
	getCardColor()
	{
		return this.cardColor ? this.cardColor.getColor() : null;
	}

	getCardColorBackground()
	{
		return this.cardColor.getDarkenColor(50);
	}

	//override
	createHTML()
	{
		super.createHTML();
		this.personalizeCard();
	}
	personalizeCard()
	{
		return null;
	}
}


class HexColor
{
	constructor(color)
	{
		this.color = color;
	}

	getColor()
	{
		return this.color;
	}
	getDarkenColor(percentage = 50)
	{
		return HexColor.darkenColor(this.getColor(),percentage);
	}
	getLightenColor(percentage = 50)
	{
		return HexColor.lightenColor(this.getColor(),percentage)
	}

 	static rgbToHex(r, g, b) 
 	{
	    // Convert each component to hexadecimal and ensure it has 2 digits
	    const componentToHex = (c) => {
	        const hex = c.toString(16);
	        return hex.length === 1 ? "0" + hex : hex;
	    };

	    // Convert RGB values to hexadecimal
	    const hexR = componentToHex(r);
	    const hexG = componentToHex(g);
	    const hexB = componentToHex(b);

	    // Concatenate the hexadecimal components with '#' and return
	    return "#" + hexR + hexG + hexB;

	}
	static darkenColor(hex, percentage) 
	{
	    // Remove the '#' symbol
	    hex = hex.replace(/^#/, '');

	    // Convert to RGB
	    let r = parseInt(hex.substring(0, 2), 16);
	    let g = parseInt(hex.substring(2, 4), 16);
	    let b = parseInt(hex.substring(4, 6), 16);

	    // Apply the darkening percentage
	    r = Math.round(r * (100 - percentage) / 100);
	    g = Math.round(g * (100 - percentage) / 100);
	    b = Math.round(b * (100 - percentage) / 100);

	    // Convert back to hexadecimal
	    const newColor = ((r < 16 ? "0" : "") + r.toString(16)) +
	                    ((g < 16 ? "0" : "") + g.toString(16)) +
	                    ((b < 16 ? "0" : "") + b.toString(16));

	    return "#" + newColor;
	}
	static lightenColor(hex, percentage) {
	    // Remova o símbolo '#'
	    hex = hex.replace(/^#/, '');

	    // Converta para RGB
	    let r = parseInt(hex.substring(0, 2), 16);
	    let g = parseInt(hex.substring(2, 4), 16);
	    let b = parseInt(hex.substring(4, 6), 16);

	    // Calcule o aumento em cada componente RGB
	    r = Math.round(r + (255 - r) * percentage / 100);
	    g = Math.round(g + (255 - g) * percentage / 100);
	    b = Math.round(b + (255 - b) * percentage / 100);

	    // Converta de volta para hexadecimal
	    const newColor = ((r < 16 ? "0" : "") + r.toString(16)) +
	                    ((g < 16 ? "0" : "") + g.toString(16)) +
	                    ((b < 16 ? "0" : "") + b.toString(16));

	    return "#" + newColor;
	}

}

module.exports = CardItem;