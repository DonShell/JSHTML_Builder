class InstagramContact extends BE_Heading
{
	static LINK_DEFAULT = "https://www.instagram.com/";

	static createFromJSON(json, parent = null) {

			//se for um bloco de elementos
			if (json.type == "InstagramContact")
			{
				const at = json.at ? json.at : null;

	      		const ElementBlockParent = new InstagramContact(
	      			parent,
	      			at
	        	);
	        	if(Array.isArray(json.content))
		        {
		        	json.content.forEach(item => {
		                const content = JSHTML_Builder.importJson(item, ElementBlockParent);
		                ElementBlockParent.addElement(content);
		       		});
		        }

	            return ElementBlockParent;
			}
			else
			{
		        console.log("Error: to ImageElement use json.type = 'InstagramContact'");
				return null;
			}
		}


	constructor(parent,at)
	{
		super(parent,"Instagram");
		this.activateOnClick();
		this.setAt(at);
		this.atText = new TextElement(this, "@" + at)
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