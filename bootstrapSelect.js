/* 
 Copyright (C) Philippe Meyer 2018
 Distributed under the MIT License
 bootstrapSelect v 0.7
*/

(function ($) {
    const errMsg = "bootstrapSelect error : "
    var byColor = "off";// public
    var byClass = "off"; // private : specific classes for each menu item, get from the option className
    var width = 120;
    var className = "none"; // general class
    var maxWidth = 500;
    var $title = null;
    var isDisabled = false;

    $.fn.bootstrapSelect = function (action, options) {
        if (action == "init") {
            if (!options) options = {};

            if (options.colors) {
                byColor = options.colors;
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
                .css({ "width": "100%", "text-align": "left", "z-index": 1 });

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
                .css({ "cursor": "pointer" });

            $(that).find("option").each(function (i) {
                
                var text = $(this).text();
                var value = $(this).attr("value") || text;

                var $li = $("<li></li>");
                $li
					.appendTo($ul)
					.attr("data-value", value)
					.attr("data-text", text)
					.html(text);

                var color = "black";
                if (byColor == "on") {
                    color = $(this).data("color") || color;
                    $li
                        .css("color", color);

                    if (value == presentValue) {
                        $li.addClass("active");
                        $title
                            .html(text)
                            .css("color", color);
                    }
                } else {
                    var className = $(this).attr("class") || "none";
                    byClass = "on";
                    $li
                        .addClass(className);

                    if (value == presentValue) {
                        $li.addClass("active");
                        $title
                            .html(text)
                            .attr("class", "title " + className);
                    }
                }


            });

            $($drop).find("li").on("click", function () {
                if (!isDisabled) {
                    var text = $(this).data("text");
                    var value = $(this).data("value");
                 
                    $(that).val(value);
                    $(that).trigger("change");
                    $($title).html(text);
                    if (byColor == "on") {
                        var color = $(this).css("color") || "black";
                        $($title).css("color", color);
                    }
                    if (byClass == "on") {
                        var className = $(this).attr("class");
                        $($title).attr("class", "title " + className);
                    }
                }
            });

            return (that);
        }
        else if (action == "setValue") {
            var that = this;
            if (options!=undefined) {
                var value = options;
                if (typeof value == "string" || typeof value == "number") {
                    var targetId = "#btn-group-" + $(this).attr("id");
                    var $li = $(targetId).find("li[data-value='" + value + "']");
                    if ($li.length == 1) {
                        var text = $li.data("text");
                        if (byColor == "on") {
                            var color = $li.css("color") || "black";
                            $($title).css("color", color);
                        }
                        if (byClass == "on") {
                            var className = $li.attr("class");
                            $($title).attr("class", "title " + className);
                        }
                        $(that).val(value);
                        $(that).trigger("change");
                        $title = $(targetId).find(".title");
                        $($title).html(text);
                    }
                } else {
                    console.log("setValue parameter should be either a string or a number");
                }
            }
            return (that);
        }
        else if (action == "disable") {
            var that = this;
            var id = $(this).attr("id");
            isDisabled = true;
            $("#btn-group-" + id).find("button").addClass("disabled");
            return (that);
        }
        else if (action == "enable") {
            var that = this;
            var id = $(this).attr("id");
            isDisabled = false;
            $("#btn-group-" + id).find("button").removeClass("disabled");
            return (that);
        }
        else {
            onError = true;
            console.log(errMsg + "no action parameter provided (param 1)");
        }
    }
}(jQuery));


