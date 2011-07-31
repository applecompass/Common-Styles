//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// File:            block.js
// Defines:
// Dependencies:
// Description:     JS UI functions for Block Cover Layer
// Author:          faceach@gmail.com
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
var target = {
    msg: "html",
    opacity: "0.6", 
    bgColor: "#000",
    overLap: "replace",
    isEsc: false,
    opacity: "0.3",
    durationFade: 200 
};
block(target);
*/
var block;
(function ($) {

    var isLegal = function (s) {
        return !(s === null || typeof s === "undefined" || /^\s*$/.test(s));
    };
    var getVal = function (arg, def) {
        return isLegal(arg) ? arg : def;
    };

    // Block cover layer
    var Cover = function (args) {
        // Default value
        var el = "body",
            overLap = "cancel", // overLap: "cancel"/"replace"/"overlap"
            pos = "absolute",
            isPos = false, // inner variable
            bgColor = "#000",
            opacity = "0.6",
            durationFade = 400,
            height = "100%",
            zIndex = 1,
            isEsc = false,
            isIm = false;
        // Arguments value
        if (args) {
            el = getVal(args.el, el);
            overLap = getVal(args.overLap, overLap);
            bgColor = getVal(args.bgColor, bgColor);
            opacity = getVal(args.opacity, opacity);
            durationFade = getVal(args.durationFade, durationFade);
            zIndex = getVal(args.zIndex, zIndex);
            isEsc = getVal(args.isEsc, isEsc);
            isIm = getVal(args.isIm, isIm);
            isPos = isLegal(args.pos) ? true : isPos;
        }
        // Container element
        var $el = $(el);
        if ($el.length > 0) {
            // Objective factor
            var isBody = ($el[0].tagName).toLowerCase() === "body" ? true : false,
                ieSix = ($.browser.msie && $.browser.version < 7.0) ? true : false;
            // Not set by arguments
            pos = (isBody && !ieSix) ? "fixed" : pos;
            pos = getVal(args.pos, pos);
            height = ieSix ? (isBody ? document.body.offsetHeight : $el.height()) : height;
        }
        // Create an object for return
        var o = new Object();
        // show cover
        o.show = function () {
            if ($el.length === 0) {
                return false;
            }
            // If exist?
            if ($el.find(" > div.et-block").length > 0) {
                if (overLap === "cancel") {
                    return false;
                }
                else if (overLap === "replace") {
                    isIm = true;
                    this.hide();
                }
            }
            // jQuery Object of Cover
            var $elCover = $("<div class=\"et-block-cover\"></div>"),
                $elBlock = $("<div class=\"et-block\"></div>");
            // Stylesheet
            var styleCover =
                {
                    "position": pos,
                    "z-index": zIndex,
                    "left": "0",
                    "top": "0",
                    "width": "100%",
                    "height": height,
                    "background-color": bgColor,
                    "opacity": opacity,
                    "filter": "alpha(opacity=" + opacity * 100 + ")",
                    "display": "none"
                },
                styleBlock =
                {
                    "position": pos,
                    "z-index": zIndex,
                    "left": "0",
                    "top": "0",
                    "width": "100%",
                    "height": height,
                    "display": "none"
                };
            // Append 
            $el.append($elCover).append($elBlock);
            // Apply CSS
            $elCover.css(styleCover).fadeIn(durationFade);
            $elBlock.css(styleBlock).fadeIn(durationFade);
            // Attach ESC key event
            if (isEsc) {
                var that = this;
                $("<input type='text' />")
                    .css({
                        "width": 1,
                        "height": 1,
                        "border-width": 0,
                        "overflow": "hidden",
                        "float": "right",
                        "background-color": "transparent"
                    })
                    .appendTo($elCover)
                    .focus()
                    .keydown(function (e) {
                        if (!e) {
                            e = window.event;
                        };
                        if (e.keyCode === 27) {
                            that.hide();
                        }
                    });
            }
            // Success show cover
            return $elBlock;
        };
        // hide cover
        o.hide = function () {
            if ($el.length === 0) {
                return false;
            }
            // Get the jQuery objects of cover elements
            var $elBlock = $el.find(" > div.et-block"),
                $elCover = $el.find(" > div.et-block-cover");
            // If exist?
            if ($elCover.length > 0) {
                // Remove Immediately?
                if (isIm) {
                    $elBlock.remove();
                    $elCover.remove();
                }
                else {
                    $elCover
                    .fadeOut(durationFade, function () {
                        $(this).remove();
                    });
                    $elBlock
                    .fadeOut(durationFade, function () {
                        $(this).remove();
                    });
                }
                return true;
            }
            else {
                return false;
            }
        };
        // Return public object
        return o;
    };
    // Block content layer
    var Block = function (args) {
        // Default value
        var msg = "",
            isMsgExist = false,
            closeButtons = [],
            isInnerClose = true,
            closeCallback = "";
        // Cover use
        var el = "body",
            overLap = "cancel", // overLap: "cancel"/"replace"/"overlap"
            pos = "",
            bgColor = "#000",
            opacity = "0.6",
            durationFade = 400,
            zIndex = 1,
            isEsc = false,
            isIm = false;
        // Arguments value
        if (args) {
            msg = args.msg || msg;
            isMsgExist = getVal(args.isMsgExist, isMsgExist);
            closeButtons = getVal(args.closeButtons, closeButtons);
            isInnerClose = getVal(args.isInnerClose, isInnerClose);
            closeCallback = getVal(args.closeCallback, closeCallback);
            // Cover use
            el = getVal(args.el, el);
            overLap = getVal(args.overLap, overLap);
            pos = getVal(args.pos, pos);
            bgColor = getVal(args.bgColor, bgColor);
            opacity = getVal(args.opacity, opacity);
            durationFade = getVal(args.durationFade, durationFade);
            zIndex = getVal(args.zIndex, zIndex);
            isEsc = getVal(args.isEsc, isEsc);
            isIm = getVal(args.isIm, isIm);
        }
        // Container element
        var $el = $(el);

        // Set cover arguments
        var coverArgs = {
            el: el,
            overLap: overLap,
            pos: pos,
            bgColor: bgColor,
            opacity: opacity,
            durationFade: durationFade,
            zIndex: zIndex,
            isEsc: isEsc,
            isIm: isIm
        };
        // New instance of Cover
        var cover = Cover(coverArgs);

        // Attach close buttons events
        var evClose = function ($elBlock, closeButtons) {
            if (closeButtons.length > 0) {
                // Read all the buttons
                $.each(closeButtons, function (i, e) {
                    // Events
                    $elBlock.find(e).click(function () {
                        o.hide();
                        return false;
                    });
                });
            }
        }

        // Create an object for return
        var o = new Object;
        o.show = function () {
            if ($el.length === 0) {
                return false;
            }
            var $msg = "",
                $elBlock = "",
                htmlBtnClose = "",
                hOut = 0,
                hIn = 0,
                top = 0;
            // Popup an exist html element
            if (isMsgExist && $(msg).length > 0) {
                $msg = $(msg).clone(true);
            }
            else {
                $msg = $(msg);
            }
            // Show block cover
            $elBlock = cover.show();
            // Show Block
            if ($elBlock) {
                // Append message & show
                $elBlock.append($msg);
                $msg.show();
                // Position block msg
                hOut = $elBlock.height();
                hIn = $msg.outerHeight(false);
                top = Math.floor((hOut - hIn) / 2);
                $msg.css("margin-top", top);
                // Append close button
                if (isEsc) {
                    htmlBtnClose = "<a class=\"et-block-close\">Close</a>";
                    isInnerClose ? $msg.append(htmlBtnClose) : $elBlock.append(htmlBtnClose);
                    closeButtons.push("a.et-block-close");
                    // Attach close events
                    evClose($elBlock, closeButtons);
                }
                // return value
                return true;
            }
            else {
                return false;
            }
        };
        // Hide block cover
        o.hide = function () {
            $el = $el || this._$box;
            if (cover.hide()) {
                typeof closeCallback === "function" ? closeCallback() : null;
            }
        }
        // Return public object
        return o;
    };

    block = function (args, isShow) {
        var block = Block(args);
        if (getVal(isShow, true)) {
            block.show();
        }
        else {
            block.hide();
        }
    };

})(jQuery);
