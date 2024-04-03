//estilo de elementos

//BlocoDeElementos para com tratamento especial para title
class ClickShow extends BE_Heading 
{	
	//override
	constructor(parent, title,clickToShow = true,visibleContent = false) 
	{
		super(parent, title);
		this.clickToShow(clickToShow);
		this.makeVisibleContent(visibleContent);
	}


	//override
	static createFromJSON(json, parent = null) {

		//se for um bloco de elementos
		if (json.ClickShow && Array.isArray(json.ClickShow.content) && json.ClickShow.title)
		{
      		const ElementBlockParent = new ClickShow(
        		parent, 
        		json.ClickShow.title,
        		Boolean(json.ClickShow.clickToShowEnabled),
        		Boolean(json.ClickShow.contentVisible)
        	);
        	json.ClickShow.content.forEach(
        		item => 
        		{
	        		const content = ClickShow.criarAPartirDeJSON(item,ElementBlockParent);
	            	ElementBlockParent.adicionarElemento(content);
   				}
   			);
            return ElementBlockParent;
		}
		else
		{
	        return JSHTML_Builder.importJson(json, parent);
		}
	}

	//override
	addElements(element)
	{
		super.addElements(element);
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

