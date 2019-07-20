/* 
 Copyright (C) Philippe Meyer 2018-2019
 Distributed under the MIT License
 bootstrapSelect v 0.81 : with multiple choice, now uses the size attribute of the select tag : when the selected items are <= size they are listed all in the header
 when the list length > size it shows 'x items' to prevent the header to grow and mess with the UI !
 setValue action in multiple mode allows only to deselect every option
*/

(function ($) {

    $.fn.bootstrapSelect = function (action, options) {
		 const errMsg = "bootstrapSelect error : "
		 var factory;
        if (action == "init") {
            factory = this;
            factory.byColor = "off";// public
            factory.byClass = "off"; // private : specific classes for each menu item, get from the option className
            factory.width = 120;
            factory.className = "bs-select"; // general class
            factory.maxWidth = 500;
            factory.isDisabled = false;
            factory.tooltip = null;
            factory.isMultiple = false;
            factory.factoryId = $(this).attr("id");
            factory.marginLeft = "0px";
            factory.multipleSize = -1;
			factory.header; // button
			factory.title= null; // button title

            if (!options) options = {};

            if (options.colors) {
                factory.byColor = options.colors;
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

            let testMultipleSize = $(factory).attr("size");
            if (testMultipleSize != undefined) {
                testMultipleSize = parseInt(testMultipleSize);
                if (!isNaN(testMultipleSize) && testMultipleSize >= 1) {
                    factory.multipleSize = testMultipleSize
                }
            }

            factory.marginLeft = $(factory).css("margin-left");
            $(factory).css("display", "none");

            var $drop = $("<div></div>");
            $(factory).after($drop);

            var $already = $("#btn-group-" + factory.factoryId);
            if ($already.length > 0) {
                $already.remove();
            }
            $drop
				.addClass("btn-group " + factory.className)
                .attr("id", "btn-group-" + factory.factoryId)
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
				
				factory.header = $button;

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
                if (factory.byColor == "on") {
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
                    factory.byClass = "on";
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

                        let selectedTexts = ""
                        let sep = "";
                        let nrActives = 0;
                        $($drop).find("li").each(function () {
                            if ($(this).hasClass("active")) {
                                nrActives++;
                                selectedTexts += sep + $(this).attr("data-text");
                                sep = ",";
                            }
                        });
                        if (factory.multipleSize != -1) {
                            if (nrActives > factory.multipleSize) {
                                selectedTexts = nrActives+" items"
                            }
                        }

                        $(factory.title).html(selectedTexts);
                        $(factory).trigger("change");
                    } else {

                        if (factory.byColor == "on") {
                            var color = $(that).css("color") || "black";
                            $(factory.title).css("color", color);
                        }
                        if (factory.byClass == "on") {
                            var className = $(that).attr("class");
                            $(factory.title).attr("class", "title " + className);
                        }
                        $($drop).find("li").each(function () {
                            if ($(this).attr("data-value") == value) {
                                $(this).addClass("active");
                            } else {
                                $(this).removeClass("active");
                            }
                        });

                        $(factory).find("option").each(function (i) {
                            if ($(this).val() == value) {
                                $(this).prop("selected", true);
                            }
                        });

                        $(factory.title).html(text);
                        $(factory).trigger("change");
                    }
                    // isMultiple

                }
            });
            $ul.outerWidth($ul.outerWidth() + 30);

            return (factory);
        }
        else if (action == "empty") {
			let $target = "#btn-group-" + $(this).attr("id");

             $($target).find("li").each(function () {
				$(this).removeClass("active");
             });
            $($target).find(".title").html("");
            return (this);
        }
        else if (action == "hideOption") {
			factory = this;
			let $target = "#btn-group-" + $(this).attr("id");
            if (options != undefined) {
                var value = options;
                    if (typeof value == "string" || typeof value == "number") {
                        var $li = $($target).find("li[data-value='" + value + "']");
                        if ($li.length == 1) {
							let isSelected = $($target).find("option[value='" + value + "']").prop("selected");
							if(!isSelected){
								$li.removeClass("active");
								$li.addClass("hide");
							}else{
								console.log("can't hide selected option !");
							}
                        }
                    }
                    else {
                        console.log("hideOption parameter should be either a string or a number");
                    }
            }
            return (factory);
        }
        else if (action == "showOption") {
			factory = this;
			let $target = "#btn-group-" + $(this).attr("id");
            if (options != undefined) {
                var value = options;
                if (typeof value == "string" || typeof value == "number") {
                    var $li = $($target ).find("li[data-value='" + value + "']");
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
            isDisabled = true;
			let $target = "#btn-group-" + $(this).attr("id");
            $($target).find("button").addClass("disabled");
            return (this);
        }
        else if (action == "enable") {
            isDisabled = false;
		let $target = "#btn-group-" + $(this).attr("id");
            $($target).find("button").removeClass("disabled");
            return (this);
        }
        else {
            onError = true;
            console.log(errMsg + "no action parameter provided (param 1)");
        }
    }
}(jQuery));


