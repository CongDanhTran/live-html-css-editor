$(document).ready(function () {

    /** set height for live Iframe */
    $(".innerbox").ready(function () {
        var height = screen.height / 2 - 130;
        $(".innerbox").css("min-height", height);

        $("#live_update").ready(function () {
            $("#live_update").css("height", height * 2 + 45 - 2);
        });


    });

    /** use tab in text area -- https://www.igorkromin.net/index.php/2018/04/26/how-to-add-text-tabbing-to-a-html-textarea-with-jquery/ */
    $(document).delegate('.innerbox', 'keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9) {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            var text = $(this).val();
            var selText = text.substring(start, end);
            $(this).val(
                text.substring(0, start) +
                "\t" + selText.replace(/\n/g, "\n\t") +
                text.substring(end)
            );
            this.selectionStart = this.selectionEnd = start + 1;
        }
    });



});

$(function () {
    /** beautify HTML and CSS function - call two javascript libraries: HTML5 tidy and CSS beautify */
    var beautify = function () {
        options = {
            "indent": "auto",
            "indent-spaces": 8,
            "wrap": 80,
            "show-body-only": true,
        }
        var html = $('.html').val();


        var result = tidy_html5(html, options);
        $('.html').val(result);
        var beautified = cssbeautify($('.css').val(), {
            indent: '  ',
            autosemicolon: true
        });
        $('.css').val(beautified);

    };

    /** beautify button and beautify on start */
    beautify();
    $('#btnbeautify').click(function () {
        beautify();
    });

    /**  live editor toggle button, live on off  */
    var live = true;
    $('.btn-toggle').click(function () {
        $(this).find('.btn').toggleClass('active');
        if ($(this).find('.btn-primary').length > 0) {
            $(this).find('.btn').toggleClass('btn-primary');
        }
        live = !live;
    });

    /**  css toggle button, css style on off  */
    var csson = true;
    $('.btn-toggle2').click(function () {
        $(this).find('.btn').toggleClass('active');
        if ($(this).find('.btn-primary').length > 0) {
            $(this).find('.btn').toggleClass('btn-primary');
        }
        csson = !csson;
        if (csson) {
            updateIframe();
        } else {
            removeCSS();
        }
    });

    /** from user input, show it on iframe */
    function updateIframe() {

        var live = $("#live_update")[0].contentWindow.document;
        live.open();
        live.close();

        var html = $(".html").val();
        var css = $(".css").val();

        $("head", live).append("<style id='cssiframe'>" + css + "</style");
        $("body", live).append(html);


    };

    /** users finish typing, update iframe instantly */
    $(".innerbox").on("keyup", function () {
        if (live === true) {
            updateIframe();
        }
    });

    /** on load update Iframe once */
    $("#live_update").ready(function () {
        if (live === true) {
            updateIframe();
        }
    });



    /** remove CSS style */
    function removeCSS() {
        var live = $("#live_update")[0].contentWindow.document;
        $('#cssiframe', live).remove();

    };
    /** auto complete HTML with defined tag */
    var htmltags = [
        'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'big', 'blockquote', 'h2', 'h3', 'h4', 'h5', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr',
    ];
    $('.html').textcomplete([{ // html
        match: /<(\w*)$/,
        search: function (term, callback) {
            callback($.map(htmltags, function (htmltags) {
                return htmltags.indexOf(term) === 0 ? htmltags : null;
            }));
        },
        index: 1,
        replace: function (htmltags) {
            return ['<' + htmltags + '>', '</' + htmltags + '>'];
        }
    }

    ]);

    /** auto complete css with defined tag */
    var csstags = [
        '@charset', '@font-face', '@font-feature-values', '@import', '@keyframes', '@media', 'align-content', 'align-items', 'align-self', 'all', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'backface-visibility', 'background', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-size', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-radius', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-decoration-break', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'caption-side', 'caret-color', 'clear', 'clip', 'color', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'columns', 'column-span', 'column-width', 'content', 'counter-increment', 'counter-reset', 'cursor', 'direction', 'display', 'empty-cells', 'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'font', 'font-family', 'font-feature-settings', 'font-kerning', 'font-language-override', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-synthesis', 'font-variant', 'font-variant-alternates', 'font-variant-caps', 'font-variant-east-asian', 'font-variant-ligatures', 'font-variant-numeric', 'font-variant-position', 'font-weight', 'grid', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column', 'grid-column-end', 'grid-column-gap', 'grid-column-start', 'grid-gap', 'grid-row', 'grid-row-end', 'grid-row-gap', 'grid-row-start', 'grid-template', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'hanging-punctuation', 'height', 'hyphens', 'image-orientation', 'image-rendering', 'image-resolution', 'justify-content', 'left', 'letter-spacing', 'line-break', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 'object-fit', 'object-position', 'opacity', 'order', 'orphans', 'outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'overflow', 'overflow-wrap', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page-break-after', 'page-break-before', 'page-break-inside', 'perspective', 'perspective-origin', 'pointer-events', 'position', 'quotes', 'resize', 'right', 'table-layout', 'tab-size', 'text-align', 'text-align-last', 'text-combine-upright', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-style', 'text-indent', 'text-justify', 'text-orientation', 'text-overflow', 'text-shadow', 'text-transform', 'text-underline-position', 'top', 'transform', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'user-select', 'vertical-align', 'visibility', 'white-space', 'widows', 'width', 'word-break', 'word-spacing', 'word-wrap', 'writing-mode', 'z-index',
    ];

    $('.css').textcomplete([{
        match: /(\w+)$/,
        search: function (term, callback) {
            callback($.map(csstags, function (csstags) {
                return csstags.indexOf(term) === 0 ? csstags : null;
            }));
        },
        index: 1,
        replace: function (csstags) {
            return [csstags + ':\t', '\t;'];
        }
    }]);

});