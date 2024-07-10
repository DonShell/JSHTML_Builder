class WhatsAppContact extends BE_Heading
{
	static LINK_WHATSAPP_ICON = 'https://cdn-icons-png.flaticon.com/512/124/124034.png';
	static ELEMENT_TYPE = "WhatsAppContact";
	static TARGET_URL = "https://wa.me/";
	//https://api.whatsapp.com/send?phone=&text=
	static MESSAGE_PARAMETER_PREFIX_TEXT = "?text=";
	
	static createFromJSON(json, parent = null) {

		//se for um bloco de elementos
		if (json.type == "WhatsAppContact")
		{
			const number = json.number ? json.number : null;
			const message = json.message ? json.message : null;
      		const messageBox = Boolean(json.messageBox);
      		const setWhatsAppLinkIcon = json.linkIcon ? json.linkIcon : null;
      		const buttonName = json.buttonName ? json.buttonName : null;
      		var whatsAppIconEnabled = true;
      		if(typeof json.iconEnabled !== 'undefined')
      		{
      			whatsAppIconEnabled = Boolean(json.iconEnabled);
      		}

      		const ElementBlockParent = new WhatsAppContact(
      			parent,
        		number, 
        		messageBox
        	);
        	if(Array.isArray(json.content))
	        {
	        	json.content.forEach(item => {
	                const content = JSHTML_Builder.importJson(item, ElementBlockParent);
	                ElementBlockParent.addElement(content);
	       		});
	        }

	        if(buttonName)
	        {
	        	ElementBlockParent.setButtonName(buttonName);
	        }
            return ElementBlockParent;
		}
		else
		{
	        console.log("Error: to ImageElement use json.type = 'WhatsAppContact'");
			return null;
		}
	}

	createHTML()
	{
		super.createHTML();
		this.touggleMessageBox(this.messageBoxEnabled);
		this.setWhatsAppNumber(this.getWhatsAppNumber());
		this.setSendButton();
		this.enabledWhatsAppIcon();
	}



	constructor(parent,number=null,messageBox = false)
	{
		super(parent,"WhatsApp:");
		this.messageBoxEnabled = messageBox;
		this.whatsAppIconEnabled = true;
		this.setDefaultMessage();
		this.setWhatsAppNumber(number);
		this.touggleMessageBox(this.messageBoxEnabled);


	}

	setButtonName(name)
	{
		this.buttonName = name;
		if(this.sendButton)
		{
			this.sendButton.setText(this.buttonName);
		}
	}
	getButtonName()
	{
		return this.buttonName ? this.buttonName : "Open WhatsApp";
	}

	getWhatsAppLinkIcon()
	{
		return this.personalWhatsAppIcon ? this.personalWhatsAppIcon : WhatsAppContact.LINK_WHATSAPP_ICON;
	}
	setWhatsAppLinkIcon(link)
	{
		this.personalWhatsAppIcon = link;
	}

	setWhatsAppIcon()
	{
		if(!this.whatsAppIcon)
		{
			this.whatsAppIcon = new ImageElement(this,this.getWhatsAppLinkIcon());
			
			this.addElement(this.whatsAppIcon);
			//this.whatsAppIcon.createHTML();
			//this.whatsAppIcon.show;
		}
		this.whatsAppIconEnabled = true;
	}
	unsetWhatsAppIcon()
	{
		if(this.whatsAppIcon)
		{
			this.deleteElement(this.whatsAppIcon);
			this.whatsAppIconEnabled = false;
			this.whatsAppIcon = null;
		}
	}

	enabledWhatsAppIcon(enabled = true)
	{
		if(enabled)
		{
			this.setWhatsAppIcon();
		}
		else
		{
			this.unsetWhatsAppIcon();
		}
	}

	setSendButton(enabled = true)
	{
		if(enabled)
		{
			if(!this.sendButton)
			{
				this.sendButton = new InputButtonElement(this,this.getButtonName());
				this.addElement(this.sendButton);
				this.sendButton.setOnClick(this.send.bind(this));
				ponte = this;
			}
		}
		else
		{
			this.deleteElement(this.sendButton);
		}
	}

	setEnabled(enabled = true)
	{
		if(this.sendButton)
		{
			this.sendButton.setEnabled(enabled);
		}
	}

	touggleMessageBox(option)
	{
		if(option)
		{
			this.enabledMessageBox();
		}
		else
		{
			this.unabledMessageBox();
		}
	}

	enabledMessageBox()
	{
		if(!this.messageBox)
		{
			this.messageBox = new TextAreaElement(this);
			this.addElement(this.messageBox);
			this.updateMessageBox();
		}
		this.messageBoxEnabled = true;
	}
	unabledMessageBox()
	{
		if(!this.messageBox)
		{
			this.deleteElement(this.messageBox);
			this.messageBox = null;
		}
		this.messageBoxEnabled = false;

	}
	updateMessageBox()
	{

		if(this.messageBox)
		{
			this.messageBox.setText(this.getMessage());
		}
	}

	send()
	{
		this.validateToSend();

		var link = WhatsAppContact.TARGET_URL + this.getWhatsAppNumber();
		
		link = WhatsAppContact.addMessageToLink(link,this.getMessage());
	
		window.open(link, '_blank');
	}

	static addMessageToLink(link,message = null)
	{
		if(message)
		{
			return link + WhatsAppContact.MESSAGE_PARAMETER_PREFIX_TEXT + message;
		}
		else
		{
			return link;
		}
	}

	setWhatsAppNumber(number = null)
	{
		number = number ? number : "0000000000000";
		this.phoneNumber = new PhoneNumber(number);
		

		if(!this.phoneText)
		{
			this.phoneText = new TextElement(this,this.phoneNumber.getText());
			this.phoneText.addClass("phoneNumber");
			this.addElement(this.phoneText);
		}
		else
		{
			this.phoneText.setText(this.phoneNumber.getText());
		}
	
	}

	getWhatsAppNumber()
	{
		return this.phoneNumber ? this.phoneNumber.getNumber() : null;
	}

	getMessage()
	{
		if(this.messageBoxEnabled && this.messageBox.getText() != '')
		{
			return this.messageBox.getText();
		}
		else
		{
			return this.getDefaultMessage();
		}
	}

	setDefaultMessage(message = null)
	{
		this.defaultMessage = message;
		this.updateMessageBox();
	}

	getDefaultMessage()
	{
		return this.defaultMessage;
	}

	validateToSend()
	{
		var valid = false;
		if(!this.getWhatsAppNumber())
		{
			valid = false;
		}
		else
		{
			valid = WhatsAppContact.validateNumber(this.getWhatsAppNumber());
		}
	
		if(!valid)
		{
			throw "Error, WhatsApp number is null! use: setWhatsAppNuber(<number>)";
		}
	}

	static validateNumber(number)
	{
    	//Regular expression to validate phone numbers
		const regex = /^(?:\+?\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/;
		return regex.test(number);
	}


}



class PhoneNumber
{

	constructor(number)
	{
		this.number = number;
	}
	getText()
	{
		return PhoneNumber.formatateToText(this.getNumber());
	}
	getNumber()
	{
		return PhoneNumber.clearNumber(this.number);
	}

	static formatateToText(number)
	{
		if (number.length === 10) {
	        return `+55 (${number.substr(0, 2)}) ${number.substr(2, 4)}-${number.substr(6, 4)}`;
	    } else if (number.length === 11) {
	        return `+55 (${number.substr(0, 2)}) ${number.substr(2, 5)}-${number.substr(7, 4)}`;
	    } else if (number.length === 12) {
	        return `+${number.substr(0, 2)} (${number.substr(2, 2)}) ${number.substr(4, 4)}-${number.substr(8, 4)}`;
	    } else if (number.length === 13) {
	        return `+${number.substr(0, 2)} (${number.substr(2, 2)}) ${number.substr(4, 5)}-${number.substr(9, 4)}`;
	    } else {
	    	//return number;
	        throw "error to formatateToText(): " + number + " ( parameter 'number') is > 13 or < 10!";
	    }
	}
	
	static clearNumber(number)
	{
		return number.replace(/\D/g, '');
	}

	static numberEquals(number1,number2)
	{
		
        const num1 = typeof number1 === 'object' ? number1.getNumber() : number1;
        const num2 = typeof number2 === 'object' ? number2.getNumber() : number2;
		return PhoneNumber.clearNumber(num1) == PhoneNumber.clearNumber(num2);
	}

}