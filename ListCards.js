const HeaderAndElements = require('./HeaderAndElements.js');
class ListCards extends HeaderAndElements
{
	static DEFAULT_CLASS_CARD = "cardItem";


	static createFromJSON(json, parent = null,classCreator = ListCards) {

		/*
		json.title = json.title ? json.title : "Catalogy:";
	    var parentBlock = super.createFromJSON(json, parent,classCreator);

        if(json.classOfCards && parentBlock)
        {
        	parentBlock.setCardClass(json.classOfCards);
        }

        return parentBlock;
        */
	    //if it's a block of elements
	    if ((json.type == classCreator.name)) {

	    	const title = json.title ? json.title : "Catalogy:";
	        
	        const parentBlock = new classCreator(
	            parent, 
	            title,
	        );

	        if(json.classOfCards)
	        {
	        	parentBlock.setCardClass(json.classOfCards);
	        }  
	        if(json.idContent)
	        {
	        	parentBlock.content.setId(json.idContent);
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
	    	console.log("Error: to ListCards, use json.type = 'ListCards'");
			return null;
	    }
	}

	constructor(parent,title = "ListCards")
	{
		super(parent,title);
	}


	setCardClass(className)
	{
		this.classCard = className;
	}

	//override
	addElement(element)
	{
		super.addElement(element);
		if(element instanceof CardItem)
		{
			element.addClass(this.getCardClass());
		}
	}

	getCardClass()
	{
		return this.classCard ? this.classCard : ListCards.DEFAULT_CLASS_CARD;
	}

}
module.exports = ListCards;