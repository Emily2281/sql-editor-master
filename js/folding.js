/*
 * Demonstration of code folding
 */
window.onload = function() {
    // var te = document.getElementById("code");
    // var sc = document.getElementById("script");
    // te.value = (sc.textContent || sc.innerText || sc.innerHTML).replace(/^\s*/, "");
    // sc.innerHTML = "";
    // var te_html = document.getElementById("code-html");
    // te_html.value = document.documentElement.innerHTML;
    // var te_python = document.getElementById("code-python");
    // te_python.value=document.documentElement.innerHTML;
    // var te_markdown = document.getElementById("code-markdown");
    // te_markdown.value = "# Foo\n## Bar\n\nblah blah\n\n## Baz\n\nblah blah\n\n# Quux\n\nblah blah\n"
    var te_json = document.getElementById("code-json");
    te_json.value=document.documentElement.innerHTML;
    // var te_sql = document.getElementById("code-sql");
    // te_sql.value=document.documentElement.innerHTML;

    // window.editor = CodeMirror.fromTextArea(te, {
    //     mode: "javascript",
    //     lineNumbers: true,
    //     extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    //     foldGutter: true,
    //     gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    // });
    // editor.foldCode(CodeMirror.Pos(13, 0));

    window.editor_json = CodeMirror.fromTextArea(te_json, {
        mode: {name: "javascript", json: true},
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        foldOptions: {
            widget: (from, to) => {
                var count = undefined;

                // Get open / close token
                var startToken = '{', endToken = '}';
                var prevLine = window.editor_json.getLine(from.line);
                if (prevLine.lastIndexOf('[') > prevLine.lastIndexOf('{')) {
                    startToken = '[', endToken = ']';
                }

                // Get json content
                var internal = window.editor_json.getRange(from, to);
                var toParse = startToken + internal + endToken;

                // Get key count
                try {
                    var parsed = JSON.parse(toParse);
                    count = Object.keys(parsed).length;
                } catch(e) { }

                return count ? `\u21A4${count}\u21A6` : '\u2194';
            }
        }
    });
    editor_json.foldCode(CodeMirror.Pos(5, 0));

    // window.editor_html = CodeMirror.fromTextArea(te_html, {
    //     mode: "text/html",
    //     lineNumbers: true,
    //     lineWrapping: true,
    //     extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    //     foldGutter: true,
    //     gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    // });
    // editor_html.foldCode(CodeMirror.Pos(0, 0));
    // editor_html.foldCode(CodeMirror.Pos(34, 0));
    //
    // window.editor_python = CodeMirror.fromTextArea(te_python, {
    //     mode: "python",
    //     lineNumbers: true,
    //     extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    //     foldGutter: true,
    //     gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    // });
    // window.editor_sql = CodeMirror.fromTextArea(te_sql, {
    //     mode: "text/x-mysql",
    //     indentWithTabs: true,
    //     smartIndent: true,
    //     lineNumbers: true,
    //     matchBrackets : true,
    //     autofocus: true,
    //     extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    //     foldGutter: true,
    //     gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    // });
    //
    // window.editor_markdown = CodeMirror.fromTextArea(te_markdown, {
    //     mode: "markdown",
    //     lineNumbers: true,
    //     lineWrapping: true,
    //     extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    //     foldGutter: true,
    //     gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    // });
};
