# bootstrapSelect v0.6
jQuery plugin "bootstrapSelect" which transform a select in a bootstrap dropdown with colors

Transform an HTML select into a bootstrap dropdown
the select is hidden and the value is still available in it
In this demo i use a select with values + an attribute data-color to put color in the bootstrap dropdown

v0.6 : 2018-09-06 => added a setValue action

Actions available :

init : transforms an input select into a bootstrap dropdown. In order to display colors, simply add a data-color attribute to the select options.

 $("#status").bootstrapSelect("init", { "colors": "on", "className": "bs-select", "maxWidth": 300 });
 
## init : options are provided in the second parameters :
- colors : on || off default is off
- className : default is none, you can use bs-select which is provided in the bootstrapSelect.css file
- maxWidth : integer is 500, determines the max with of the menu part, which expands otherwise up to the width of its container.
## setValue :
- Equivalent to .val(value), set value in both input select and plugin, triggers a change to the input select.

$("#status").bootstrapSelect("setValue",2);

## disable :
- disables the menu

$("#status").bootstrapSelect("disable");

## enable :
- enables the menu

$("#status").bootstrapSelect("enable");

The result is retrieved on the hidden input select : 

var result = $("#status").val();

That's all Folks !
