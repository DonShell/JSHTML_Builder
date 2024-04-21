class CardModel1 extends CardItem
{
	static createFromJSON(json, parent = null,classCreator = CardModel1) 
	{
		return super.createFromJSON(json, parent,classCreator);
	}
	constructor(parent,title)
	{
		super(parent,title);
	}

	//override
	personalizeCard()
	{
		if(this.getCardColor())
		{
			this.HTMLelement.style.borderColor = this.getCardColor();
			this.title.HTMLelement.style.borderColor = this.getCardColor();
			this.title.HTMLelement.style.backgroundColor = this.cardColor.getLightenColor();
			this.HTMLelement.style.backgroundColor = this.getCardColorBackground();
		}
	}
}


