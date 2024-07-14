//VERSION: 0.1
//write by: DonShell - 03/30/2024

class JSHTML_Builder
{
	static importJson(json, parent = null)
	{
		var element = null;
	

		json = JSHTML_Builder.fixAbbreviatedNames(json);

		switch(json.type)
		{
			case "TextElement":

				element = TextElement.createFromJSON(json,parent);
				break;

			case "ImageElement":

				element = ImageElement.createFromJSON(json,parent);
				break;

			case "InputElement":

				element = InputElement.createFromJSON(json,parent);
				break;

			case "InputTextElement":

				element = InputTextElement.createFromJSON(json,parent);
				break;

			case "InputButtonElement":

				element = InputButtonElement.createFromJSON(json,parent);
				break;

			case "TextAreaElement":

				element = TextAreaElement.createFromJSON(json,parent);
				break;

			case "BlockOfElements":
				
				element = BlockOfElements.createFromJSON(json,parent);
				break;

			case "BE_Heading":

				element = BE_Heading.createFromJSON(json,parent);
				break;

			case "HeaderAndElements":

				element = HeaderAndElements.createFromJSON(json,parent);
				break;

			case "ListSelect":

				element = ListSelect.createFromJSON(json,parent);
				break;

			case "ClickShow":

				element = ClickShow.createFromJSON(json,parent);
				break;

			case "WhatsAppContact":

				element = WhatsAppContact.createFromJSON(json,parent);
				break;

			case "InstagramContact":

				element = InstagramContact.createFromJSON(json,parent);
				break;

			case "CardItem":

				element = CardItem.createFromJSON(json,parent);
				break;

			case "ListCards":

				element = ListCards.createFromJSON(json,parent);
				break;

			case "CardModel1":

				element = CardModel1.createFromJSON(json,parent);
				break;

			case "IframeElement":

				element = IframeElement.createFromJSON(json,parent);
				break;


		///////personalClass
			case "ExtintorBox":

				element = ExtintorBox.createFromJSON(json,parent);
				break;
			case "ExtintoresBoxArsenal":

				element = ExtintoresBoxArsenal.createFromJSON(json,parent);
				break;
			case "OscillatingExtintorBox":
				element = OscillatingExtintorBox.createFromJSON(json,parent);
				break;
				
			default:

				console.log("Unknown JSON element type:", json);
				//throw "Unknown Json element type!"
		}
		if(element)
		{
			element.importAtributesFromJSON(json);
		}
		return element;
//
	}


	static fixAbbreviatedNames(json)
	{
		if(json.type == "text" || json.text || typeof json == 'string')
		{
			if (typeof json === 'string' )
			{
				const text = json;
				json = new Object();
				json.content = text;
			}
			else if (json.text)
			{
				json.content = json.text;
			}
			json.type = "TextElement";
		}
		//if image	
		else if(json.type == "image" || json.image)
		{
			if (json.image)
			{
				json.content = json.image;
			}
			json.type = "ImageElement";
		}
		else if(json.iframe)
		{
			json.type =	"IframeElement";
			if(!json.url)
			{
				json.url = json.iframe
			}
		}

		return json;
	}

}