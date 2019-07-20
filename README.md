# bootstrapSelect v0.81

jQuery plugin "bootstrapSelect" which transform a select in a bootstrap dropdown with colors

![screen shot](https://raw.githubusercontent.com/PhilippeMarcMeyer/bootstrapSelect/master/demo.png)

Transform an HTML select into a bootstrap dropdown
the select is hidden and the chosen value is also available in it as they are binded

v0.81 : with multiple choice, now uses the size attribute of the select tag : when the selected items are <= size they are listed all in the header when the list length > size it shows 'x items' to prevent the header to grow and mess with the UI !
 setValue action in multiple mode allows only to deselect every option

v.80 : 2019-07-17 => now supports multiple attribute : just put multiple in the select tag  (uses awesome fonts)

v0.76 : 2018-09-19 =>  debug in setValue : the color was wrong

v0.75 : 2018-09-18 => adding a tooltip plus showOption and hideOption
## Tooltip :
        $("#status").bootstrapSelect("init", { "className": "bs-select", "maxWidth": 300, "tooltip": { "message": "hello World !", "position": "top" } });
## hideOption :
		$("#status").bootstrapSelect("hideOption","walking")
		Hides the option whitch value="0" 
## showOption :
		$("#status").bootstrapSelect("showOption","walking")
		Shows back the option whitch value="0" 
		
v0.7  : 2018-09-14 => Colors thru classes put in the options (much simpler)

v0.6  : 2018-09-06 => added a setValue action


Actions available :

init : transforms an input select into a bootstrap dropdown. In order to display colors, simply add a data-color attribute to the select options.

 $("#status").bootstrapSelect("init", { "colors": "on", "className": "bs-select", "maxWidth": 300 });
 
 with v0.7+, just set colors to "off" to use classes instead
 
## init : options are provided in the second parameters :
- colors : on || off default is off
- className : default is none, you can use bs-select which is provided in the bootstrapSelect.css file
- maxWidth : integer is 500, determines the max with of the menu part, which expands otherwise up to the width of its container.
## setValue :
replace in v0.81 by 
### empty 
and 
the values preset in the select are shown in the dropdown

$("#status").bootstrapSelect("empty");

## disable :
- disables the menu

$("#status").bootstrapSelect("disable");

## enable :
- enables the menu

$("#status").bootstrapSelect("enable");

The result is retrieved on the hidden input select : 

var result = $("#status").val();

Demo : https://philippemarcmeyer.github.io/bootstrapSelect/.

That's all Folks !
