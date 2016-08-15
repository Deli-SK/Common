(function ($) {
    // Static context
    var uid = 0;

    // Hide all menus when clicked outside
    $(document).click(function () {
        $(".checklist-menu").hide();
    });

    // Extend jQuery
    $.fn.checklist = function () {

        // Element constructor
        function checklist() {

            var source = $(this);

            var checklistId = (source.attr("id") || "") + "__checklist-" + uid++;

            var wrapper = $("<div/>")
                .addClass("checklist")
                .click(function (event) {
                    event.stopPropagation();
                });

            var menuWrapper = $("<div/>")
                .addClass("checklist-menu-wrapper");

            var menu = $("<ul>")
                .addClass("checklist-menu")
                .hide();

            var preview = $("<span/>")
                .addClass("checklist-preview")
                .click(function (event) {
                    menu.toggle();
                    event.stopPropagation();
                });

            function updatePreview() {
                var text = menu.find("input[type=checkbox]:checked").map(function () {
                    return $(this).parent().find("label").text();
                }).get().join(", ");

                preview.html(text || "&nbsp;");
            }

            var itemIndex = 0;
            source.find("option").each(function () {
                var option = $(this);
                var item = null;
                var itemId = checklistId + "__item-" + itemIndex++;

                var checkbox = $("<input type='checkbox'/>")
                    .addClass("checklist-item-checkbox")
                    .attr("name", option.attr("name"))
                    .attr("id", itemId)
                    .prop("checked", option.prop("selected"))
                    .val(option.val())
                    .click(function (event) {
                        item.toggleClass("checklist-item-checked", checkbox.prop("checked"));
                        option.prop("selected", checkbox.prop("checked"));
                        updatePreview();
                        event.stopPropagation();
                    });

                var label = $("<label/>")
                    .addClass("checklist-item-label")
                    .attr("for", itemId)
                    .text(option.text())
                    .click(function () {
                        checkbox.click();
                    });

                item = $("<li/>")
                    .addClass("checklist-item")
                    .append(checkbox)
                    .append(label)
                    .toggleClass("checklist-item-checked", checkbox.prop("checked"))
                    .click(function () {
                        checkbox.click();
                    });

                menu.append(item);
            });

            menuWrapper.append(menu);
            wrapper.append(preview)
                .append(menuWrapper)
                .insertAfter(source);

            source.hide();

            updatePreview();

            return wrapper;
        }

        // Allow jQuery chaining
        return this.each(checklist);
    }
})(jQuery);
