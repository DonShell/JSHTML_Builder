class InstagramContact extends HeaderAndElements
{
	static LINK_DEFAULT = "https://www.instagram.com/";

	static createFromJSON(json, parent = null) {

			//se for um bloco de elementos
			if (json.type == "InstagramContact")
			{
				const at = json.at ? json.at : null;
	      		const elementBlockParent = new InstagramContact(
	      			parent,
	      			at
	        	);
				if(json.title)
				{
					elementBlockParent.setHeading(JSHTML_Builder.importJson(json.title,elementBlockParent));
				}
	        	if(Array.isArray(json.content))
		        {
		        	json.content.forEach(item => {
		                const content = JSHTML_Builder.importJson(item, elementBlockParent);
		                elementBlockParent.addElement(content);
		       		});
		        }

	            return elementBlockParent;
			}
			else
			{
		        console.log("Error: to ImageElement use json.type = 'InstagramContact'");
				return null;
			}
		}


	constructor(parent,at,header="Instagram")
	{
		super(parent,header);
		this.activateOnClick();
		this.setAt(at);
		this.atText = new TextElement(this, "@" + at );
		this.atText.addClass("at");
		this.addElement(this.atText);

	}
	getAt()
	{
		return this.at;
	}
	setAt(at = "")
	{
		this.at = at;
	}
	getLink()
	{
		return InstagramContact.LINK_DEFAULT + this.getAt();
	}

	//override
	onclick()
	{
		window.open(this.getLink(), '_blank');
	}

}
//cssInstagram background: linear-gradient(341deg, rgba(255,240,3,1) 0%, rgba(255,82,31,1) 12%, rgba(255,58,33,1) 30%, rgba(246,37,168,1) 62%, rgba(238,15,124,1) 77%, rgba(174,23,190,1) 88%, rgba(0,31,255,1) 99%);

