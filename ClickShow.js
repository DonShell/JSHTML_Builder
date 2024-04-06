//estilo de elementos

//BlocoDeElementos para com tratamento especial para title
class ClickShow extends BE_Heading 
{	
	static PREDEFINITION_visibleContent = false;
	//override
	constructor(parent, title,visibleContent = ClickShow.PREDEFINITION_visibleContent) 
	{
		super(parent, title);
		this.clickToShow(true);
		this.makeVisibleContent(visibleContent);
	}


	//override
	static createFromJSON(json, parent = null) {

		//se for um bloco de elementos
		if ((json.type == "ClickShow") && json.title)
		{
      		const ElementBlockParent = new ClickShow(
        		parent, 
        		json.title,
        		Boolean(json.contentVisible)
        	);
        	if(Array.isArray(json.content))
        	{
	        	json.content.forEach(
	        		item => 
	        		{
		        		const content = JSHTML_Builder.importJson(item,ElementBlockParent);
		            	ElementBlockParent.addElement(content);
	   				}
	   			);
	        }
            return ElementBlockParent;
		}
		else
		{
	        console.log("Error: to ImageElement use json.type = 'ImageElement'");
			return null;
		}
	}

	//override
	addElement(element)
	{
		super.addElement(element);
		element.setId();
		element.makeVisible(this.visibleContent);
	} 

	clickToShow(on = true) 
	{
	    if (on) 
	    {
	        this.title.HTMLelement.addEventListener('click', function() {
	            this.toggleVisibleContent();
	        }.bind(this));
	    } 
	    else 
	    {
	        this.title.HTMLelement.removeEventListener('click', function() {
	            this.toggleVisibleContent();
	        }.bind(this));
	    }
	}

	toggleVisibleContent()
	{
		this.makeVisibleContent(!this.visibleContent);
	}

	makeVisibleContent(visible) 
	{
		for (let i = 1 ; i < this.content.length; i++) 
		{
			if(this.content[i] !== this.title)
			{
				this.content[i].makeVisible(visible);
			}
		}
		this.visibleContent = visible;
	}

}

