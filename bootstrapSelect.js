/* 
 Copyright (C) Philippe Meyer 2018-2019
 Distributed under the MIT License
 bootstrapSelect v 0.80 : Now supports the multiple attribute : just put multiple in the select tag
*/

(function ($) {
    const errMsg = "bootstrapSelect error : "

    var factory;

    $.fn.bootstrapSelect = function (action, options) {
        if (action == "init") {
            factory = this;
            factory.byColor = "off";// public
            factory.byClass = "off"; // private : specific classes for each menu item, get from the option className
            factory.width = 120;
            factory.className = "none"; // general class
            factory.maxWidth = 500;
            factory.title = null;
            factory.isDisabled = false;
            factory.tooltip = null;
            factory.isMultiple = false;
            factory.factoryId;
            factory.marginLeft = "0px";

            if (!options) options = {};

            if (options.colors) {
                byColor = options.colors;
            }
            if ($.isPlainObject(options.tooltip)) {
                if (options.tooltip.message) {
                    factory.tooltip = { "message": options.tooltip.message, "position": "left" };
                    if (options.tooltip.position) {
                        factory.tooltip.position = options.tooltip.position;
                    }
                }
            }

            if (options.className != undefined) {
                factory.className = options.className;
            }

            if (options.maxWidth != undefined) {
                factory.maxWidth = options.maxWidth;
            }
            factory.isMultiple = $(factory).attr("multiple") ? true : false;

            factory.marginLeft = $(factory).css("margin-left");
            $(factory).css("display", "none");

            factory.factoryId = $(factory).attr("id");
            var $drop = $("<div></div>");
            $(factory).after($drop);

            var $already = $("#btn-group-" + factory.factoryId);
            if ($already.length > 0) {
                $already.remove();
            }
            $drop
				.addClass("btn-group " + factory.className)
                .attr("factoryId", "btn-group-" + factoryId)
                .css("margin-left", factory.marginLeft);

            var $button = $("<button></button>");

            var presentValue = $(factory).val();

            $button
				.appendTo($drop)
				.addClass("btn btn-default dropdown-toggle")
				.attr("data-toggle", "dropdown")
				.attr("aria-haspopup", "true")
				.attr("aria-expanded", "false")
                .css({ "width": "100%", "text-align": "left", "z-index": 1 });

            if (factory.tooltip != null) {
                $button
                    .attr("data-placement", options.tooltip.position)
                    .attr("title", options.tooltip.message.replace('"', ''));
            }

            factory.title = $("<span></span>");
            factory.title
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

            if (factory.isMultiple) {
                $ul.addClass("multi");
            }

            $(factory).find("option").each(function (i) {

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
                        factory.title
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
                        factory.title
                            .html(text)
                            .attr("class", "title " + className);
                    }
                }

                if (factory.tooltip != null) {
                    $button.tooltip();
                }
            });

            $($drop).find("li").on("click", function () {
                let that = this;
                if (!factory.isDisabled) {
                    let text = $(that).attr("data-text");
                    let value = $(that).attr("data-value");
                    if (factory.isMultiple) {
                        if ($(that).hasClass("active")) {
                            $(that).removeClass("active");
                            $("#" + factory.factoryId + " option[value='" + value + "']").prop("selected", false);
                        } else {
                            $(that).addClass("active");
                            $("#" + factory.factoryId + " option[value='" + value + "']").prop("selected", true);
                        }
                        $(factory).trigger("change");
                        let selectedValues = $(factory).val().join(",");

                        $(factory.title).html(selectedValues);
                    }else{

                        $(factory).val(value);
                        $(factory).trigger("change");
                        $(factory.title).html(text);
                        if (byColor == "on") {
                            var color = $(that).css("color") || "black";
                            $(factory.title).css("color", color);
                        }
                        if (byClass == "on") {
                            var className = $(that).attr("class");
                            $(factory.title).attr("class", "title " + className);
                        }
                        $($drop).find("li").each(function () {
                            if ($(this).data("value") == value) {
                                $(this).addClass("active");
                            } else {
                                $(this).removeClass("active");
                            }
                        });
                    }
                    // isMultiple

                        
                }
            });
            $ul.outerWidth($ul.outerWidth() + 30);
       

       

            return (factory);
        }
        else if (action == "setValue") {
            var factory = this;
            if (options != undefined) {
                var value = options;
                if (typeof value == "string" || typeof value == "number") {
                    var targetId = "#btn-group-" + $(this).attr("factoryId");
                    var $li = $(targetId).find("li[data-value='" + value + "']");
                    var title = $(targetId).find(".title");
                    if ($li.length == 1) {
                        var text = $li.data("text");
                        if (byColor == "on") {
                            var color = $li.css("color") || "black";
                            $(title).css("color", color);
                        }
                        if (byClass == "on") {
                            var className = $li.attr("class");
                            $(title).attr("class", "title " + className);
                        }
                        $(factory).val(value);
                        $(factory).trigger("change");
                        $(title).html(text);
                    }
                } else {
                    console.log("setValue parameter should be either a string or a number");
                }
            }
            return (factory);
        }
        else if (action == "hideOption") {
            var factory = this;
            if (options != undefined) {
                var value = options;
                if ($(factory).val() != value) {
                    if (typeof value == "string" || typeof value == "number") {
                        var targetId = "#btn-group-" + $(this).attr("factoryId");
                        var $li = $(targetId).find("li[data-value='" + value + "']");
                        if ($li.length == 1) {
                            $li.addClass("hide");
                        }
                    }
                    else {
                        console.log("hideOption parameter should be either a string or a number");
                    }
                } else {
                    console.log("Can't hide the selected option");
                }
            }
            return (factory);
        }
        else if (action == "showOption") {
            var factory = this;
            if (options != undefined) {
                var value = options;
                if (typeof value == "string" || typeof value == "number") {
                    var targetId = "#btn-group-" + $(this).attr("factoryId");
                    var $li = $(targetId).find("li[data-value='" + value + "']");
                    if ($li.length == 1) {
                        $li.removeClass("hide");
                    }
                }
                else {
                    console.log("hideOption parameter should be either a string or a number");
                }
            }
            return (factory);
        }
        else if (action == "disable") {
            var factory = this;
            var factoryId = $(this).attr("factoryId");
            isDisabled = true;
            $("#btn-group-" + factoryId).find("button").addClass("disabled");
            return (factory);
        }
        else if (action == "enable") {
            var factory = this;
            var factoryId = $(this).attr("factoryId");
            isDisabled = false;
            $("#btn-group-" + factoryId).find("button").removeClass("disabled");
            return (factory);
        }
        else {
            onError = true;
            console.log(errMsg + "no action parameter provided (param 1)");
        }
    }
}(jQuery));


