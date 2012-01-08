$(document).ready(function () {

    ChiliBook.recipes[ "vim-js.js" ] =
    {
        _name:'js', _case:true, _main:{
        ml_comment:{
            _match:/\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\//, _style:'color: #808080;'
        }, sl_comment:{
            _match:/\/\/.*/, _style:'color: #ba9357;'
        }, string:{
            _match:/(?:\'[^\'\\\n]*(?:\\.[^\'\\\n]*)*\')|(?:\"[^\"\\\n]*(?:\\.[^\"\\\n]*)*\")/, _style:'color: #a5c261;'
        }, num:{
            _match:/\b[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?\b/, _style:'color: #a5c261;'
        }, reg_not:{ //this prevents "a / b / c" to be interpreted as a reg_exp
            _match:/(?:\w+\s*)\/[^\/\\\n]*(?:\\.[^\/\\\n]*)*\/[gim]*(?:\s*\w+)/, _replace:function (all) {
                return this.x(all, '//num');
            }
        }, reg_exp:{
            _match:/\/[^\/\\\n]*(?:\\.[^\/\\\n]*)*\/[gim]*/, _style:'color: #a5c261;'
        }, brace:{
            _match:/[\{\}]/, _style:'color: deepskyblue; font-weight: bold;'
        }, statement:{
            _match:/\b(with|while|var|try|throw|switch|return|if|for|finally|else|do|default|continue|const|catch|case|break)\b/, _style:'color: #ff6bcf; font-weight: bold;'
        }, error:{
            _match:/\b(URIError|TypeError|SyntaxError|ReferenceError|RangeError|EvalError|Error)\b/, _style:'color: Coral;'
        }, object:{
            _match:/\b(String|RegExp|Object|Number|Math|Function|Date|Boolean|Array)\b/, _style:'color: DeepPink;'
        }, property:{
            _match:/\b(undefined|arguments|NaN|Infinity)\b/, _style:'color: #00cfcf; font-weight: bold;'
        }, 'function':{
            _match:/\b(parseInt|parseFloat|isNaN|isFinite|eval|encodeURIComponent|encodeURI|decodeURIComponent|decodeURI)\b/, _style:'color: olive;'
        }, operator:{
            _match:/\b(void|typeof|this|new|instanceof|in|function|delete)\b/, _style:'color: #cc7833; font-weight: bold;'
        }, liveconnect:{
            _match:/\b(sun|netscape|java|Packages|JavaPackage|JavaObject|JavaClass|JavaArray|JSObject|JSException)\b/, _style:'text-decoration: overline;'
        }
    }
    };

    $(".exampleCode").each(function () {
        var showing = true;
        var children = $(this).children(".code").removeClass("code").addClass("vim-js").chili();
    });

    $(".methodDetail").each(function () {
        var showing = false;
        var children = $(this).children(".sourceCode").hide();
        if (children.length) {
            children.each(function () {
                $(this).children(".code").removeClass("code").addClass("vim-js").chili();
            });
            $(this).hover(
                function () {
                    $(this).prepend($("<span style='float : right; text-decoration: underline'>" + (showing ? "Hide" : "Show") + " source</span>"));
                },
                function () {
                    $(this).find("span:first").remove();
                }
            ).click(function () {
                    children[showing ? "slideUp" : "slideDown"](100);
                    showing = !showing;
                });
        }
    });
    var contentContainer = $(".contentContainer");
    if (contentContainer) {
        $(window).resize(function () {
            var h = $(document).height();
            contentContainer.height(h - 60);
        });
        var h = $(document).height();
        contentContainer.height(h - 60);
    }
    var memberMenu = $(".classMemberMenu");
    if (memberMenu) {
        var memberHeight = memberMenu.height();
        if (memberHeight > h) {
            memberMenu.height(h * .8);
        }
        $(window).resize(function () {
            memberHeight = memberMenu.height();
            if (memberHeight > h) {
                memberMenu.height(h * .8);
            }
        });
    }
    setTimeout(function () {
        $(".classMemberMenu").fadeTo('slow', 0.23).hover(function () {
                $(this).fadeTo('fast', 1);
            },
            function () {
                $(this).fadeTo('slow', .25);
            });
    }, 5000);


});


