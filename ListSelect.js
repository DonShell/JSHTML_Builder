class ListSelect extends BE_Heading {
    selected = null;

	static createFromJSON(json, parent = null)
	{
	    //if it's a block of elements
	    if (json.type == "ListSelect" && json.title) {
	        
	        const parentBlock = new ListSelect(
	            parent, 
	            json.title,
	            json.classSelected
	        );
	        if(Array.isArray(json.content))
	        {
		        json.content.forEach(item => {
		            const content = JSHTML_Builder.importJson(item, parentBlock);
		            if(content)
		            {
		              	parentBlock.addElement(content);
		            }
		            
		        });
	        }
	        return parentBlock;
	    } 
	    else
	    {	
	        console.log("Error: to ListSelect use json.type = 'ListSelect'");
			return null;
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
    getSelected() 
    {
      return this.selected;
    }
    
    getValue()
    {
 		let element = this.getSelected();
 		if(element)
 		{
    		return element.getValue();
 		}
 		else
 		{
 			return null;
 		}
    }

    unsetSelected(element) {
        if (element) { 
            this.removeClassOfElement(element,"selected"); // Add class "selected" to element HTML
            element.selected = false;
            this.selected = null;
        }
    }
}