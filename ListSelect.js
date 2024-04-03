class ListSelect extends BE_Heading {
    selected = null;

	static createFromJSON(json, parent = null)
	{
	    //if it's a block of elements
	    if (json.ListSelect && Array.isArray(json.ListSelect.content) && json.ListSelect.title) {
	        
	        const parentBlock = new ListSelect(
	            parent, 
	            json.ListSelect.title,
	            json.ListSelect.class
	        );
	        json.ListSelect.content.forEach(item => {
	            const content = ListSelect.createFromJSON(item, parentBlock);
	            if(content)
	            {
	              	parentBlock.addElement(content);
	            }
	            
	        });
	        return parentBlock;
	    } 
	    else
	    {	
	        return JSHTML_Builder.importJson(json, parent);
	    }
	}


    constructor(parent, title = "",elementClass = null) {
        super(parent, title);
        this.listHTML = [];
        this.elementClass = elementClass;
    }

    //override
    addElement(element) {
        super.addElement(element);
        if(element !== this.title)
        {
	        let htmlElement = element.getHTMLElement(); 
	      	this.addClassOfElement(element,this.elementClass);

	        htmlElement.addEventListener('click', function() {
		            this.toggleSelected(element);
		    }.bind(this));

	        element.selected = false;
    	}

    }



    addClassOfElement(element,elementClass)
    {
 		if(elementClass && this.elementIsLinked(element))
    	{
    		element.getHTMLElement().classList.add(elementClass);
       	}
    }
    removeClassOfElement(element,elementClass)
    {
		if(elementClass && this.elementIsLinked(element))
    	{
    		element.getHTMLElement().classList.remove(elementClass);
    	}
    }

    addItemText(text)
    {
    	let element = new TextElement(this,text);

    	this.addElement(element);
    }

    toggleSelected(element) {
        if (element !== this.selected) {
            this.setSelected(element);
        } else {
            this.unsetSelected(element)
        }
    }

    setSelected(element) {
        this.unsetSelected(this.selected);

        element.selected = true;
        this.selected = element;
        this.addClassOfElement(this.selected,"selected"); // Add class "selected" to element HTML
    }

    unsetSelected(element) {
        if (element) { 
            this.removeClassOfElement(element,"selected"); // Add class "selected" to element HTML
            element.selected = false;
            this.selected = null;
        }
    }
}