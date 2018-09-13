# bootstrapSelect v0.6
jQuery plugin "bootstrapSelect" which transform a select in a bootstrap dropdown with colors

Transform an HTML select into a bootstrap dropdown
the select is hidden and the value is still available in it
In this demo i use a select with values + an attribute data-color to put color in the bootstrap dropdown

v0.6 : 2018-09-06 => added a setValue action

Actions available :

init : transforms an input select into a bootstrap dropdown. In order to display colors, simply add a data-color attribute to the select options.

 $("#searby-status").bootstrapSelect("init", { "colors": "on", "className": "bs-select", "maxWidth": 300 });
 
init options are provided in the second parameters :
- colors : on || off default is off
- className : default is none, you can use bs-select which is provided in the bootstrapSelect.css file
- maxWidth : integer is 500, determines the max with of the menu part, which expands otherwise up to the width of its container.
