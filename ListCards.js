class ListCards extends BE_Heading
{
	static DEFAULT_CLASS_CARD = "cardItem";


	static createFromJSON(json, parent = null,classCreator = ListCards) {

	    //if it's a block of elements
	    if ((json.type == classCreator.name)) {

	    	const title = json.title ? json.title : "Itens:";
	        
	        const parentBlock = new ListCards(
	            parent, 
	            title,
	        );

	        if(json.classOfCards)
	        {
	        	parentBlock.setCardClass(json.classOfCards);
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
	    	console.log("Error: to BE_Heading, use json.type = 'ListCards'");
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