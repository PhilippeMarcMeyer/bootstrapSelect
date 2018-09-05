/* 
 Copyright (C) Philippe Meyer 2018
 Distributed under the MIT License
 bootstrapSelect v 0.5
*/

(function ($) {
    const errMsg = "bootstrapSelect error : "
    var colors = "off";
    var width = 120;
    var className = "none";
    var maxWidth = 500;

    $.fn.bootstrapSelect = function (action, options) {
        if (action == "init") {
            if (!options) options = {};

            if (options.colors) {
                colors = options.colors;
            }
            if (options.className) {
                className = options.className;
            }

            if (options.maxWidth) {
                maxWidth = options.maxWidth;
            }

            var that = this;
            $(this).css("display", "none");

            var id = $(this).attr("id");
            var $drop = $("<div></div>");
            $(this).after($drop);
			
            var $already = $("#btn-group-" + id);
            if ($already.length > 0) {
                $already.remove();
            }
            $drop
				.addClass("btn-group " + className)
                .attr("id", "btn-group-" + id);

            var $button = $("<button></button>");

            var presentValue = $(that).val();

            $button
				.appendTo($drop)
				.addClass("btn btn-default dropdown-toggle")
				.attr("data-toggle", "dropdown")
				.attr("aria-haspopup", "true")
				.attr("aria-expanded", "false")
                .css({"width":"100%", "text-align": "left","z-index":100 });

            var $title = $("<span></span>");
            $title
				.appendTo($button)
				.addClass("title");

            var $caret = $("<span></span>");
            $caret
				.appendTo($button)
				.addClass("caret")
                .css({ "position": "absolute", "right": "8px", "margin-top": "8px" });

            var $ul = $("<ul></ul>");
            $ul
				.appendTo($drop)
				.addClass("dropdown-menu")
                .css({ "cursor":"pointer" });
				
            $(that).find("option").each(function (i) {
                var color = "black";
                if (colors == "on") {
                    color = $(this).data("color") || color;
                }

                var text = $(this).text();
                var value = $(this).attr("value") || text;

                var $li = $("<li></li>");
                $li
					.appendTo($ul)
					.css("color", color)
					.attr("data-value", value)
					.attr("data-text", text)
					.text(text);

                if (value == presentValue) {
                    $li.addClass("active");
                    $title.text(text);
                }
            });

            $($drop).find("li").on("click", function () {
                var text = $(this).data("text");
                var value = $(this).data("value");
                var color = $(this).css("color") || "black";
                $(that).val(value);
                $(that).trigger("change");
                $($title).text(text);
                $($title).css("color", color);
            });

            return (that);
        }
        else {
            onError = true;
            console.log(errMsg + "no action parameter provided (param 1)");
        }
    }
}(jQuery));


