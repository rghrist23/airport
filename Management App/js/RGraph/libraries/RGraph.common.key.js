RGraph = window.RGraph || {isRGraph: true};
RGraph.HTML = RGraph.HTML || {};
(function (win, doc, undefined) {
    var RG = RGraph, ua = navigator.userAgent, ma = Math;
    RG.drawKey = RG.DrawKey = function (obj, key, colors) {
        if (!key) {
            return;
        }
        var ca = obj.canvas, co = obj.context, prop = obj.properties, keypos = prop['chart.key.position'],
            textsize = prop['chart.text.size'], key_non_null = [], colors_non_null = [];
        co.lineWidth = 1;
        co.beginPath();
        if (typeof(prop['chart.key.vpos']) == 'number') {
            obj.Set('chart.key.position.y', prop['chart.key.vpos'] * prop['chart.gutter.top']);
        }
        for (var i = 0; i < key.length; ++i) {
            if (key[i] != null) {
                colors_non_null.push(colors[i]);
                key_non_null.push(key[i]);
            }
        }
        key = key_non_null;
        colors = colors_non_null;
        function DrawKey_graph(obj, key, colors) {
            var text_size = typeof(prop['chart.key.text.size']) == 'number' ? prop['chart.key.text.size'] : prop['chart.text.size'];
            var text_italic = prop['chart.key.text.italic'] ? true : false
            var text_bold = prop['chart.key.text.bold'] ? true : false
            var text_font = prop['chart.key.text.font'] || prop['chart.key.font'] || prop['chart.text.font'];
            var gutterLeft = obj.gutterLeft;
            var gutterRight = obj.gutterRight;
            var gutterTop = obj.gutterTop;
            var gutterBottom = obj.gutterBottom;
            var hpos = prop['chart.yaxispos'] == 'right' ? gutterLeft + 10 : ca.width - gutterRight - 10;
            var vpos = gutterTop + 10;
            var title = prop['chart.title'];
            var blob_size = text_size;
            var hmargin = 8;
            var vmargin = 4;
            var fillstyle = prop['chart.key.background'];
            var text_color = prop['chart.key.text.color'];
            var strokestyle = '#333';
            var height = 0;
            var width = 0;
            if (!obj.coords) obj.coords = {};
            obj.coords.key = [];
            co.font = text_size + 'pt ' + prop['chart.text.font'];
            for (i = 0; i < key.length; ++i) {
                width = Math.max(width, co.measureText(key[i]).width);
            }
            width += 5;
            width += blob_size;
            width += 5;
            width += 5;
            width += 5;
            if (prop['chart.yaxispos'] == 'left' || (obj.type === 'pie' && !prop['chart.yaxispos']) || (obj.type === 'hbar' && !prop['chart.yaxispos']) || (obj.type === 'hbar' && prop['chart.yaxispos'] === 'center') || (obj.type === 'hbar' && prop['chart.yaxispos'] === 'right') || (obj.type === 'rscatter' && !prop['chart.yaxispos']) || (obj.type === 'radar' && !prop['chart.yaxispos']) || (obj.type === 'rose' && !prop['chart.yaxispos']) || (obj.type === 'funnel' && !prop['chart.yaxispos']) || (obj.type === 'vprogress' && !prop['chart.yaxispos']) || (obj.type === 'hprogress' && !prop['chart.yaxispos'])) {
                hpos -= width;
            }
            if (typeof(prop['chart.key.halign']) == 'string') {
                if (prop['chart.key.halign'] == 'left') {
                    hpos = gutterLeft + 10;
                } else if (prop['chart.key.halign'] == 'right') {
                    hpos = ca.width - gutterRight - width;
                }
            }
            if (typeof(prop['chart.key.position.x']) == 'number') {
                hpos = prop['chart.key.position.x'];
            }
            if (typeof(prop['chart.key.position.y']) == 'number') {
                vpos = prop['chart.key.position.y'];
            }
            if (prop['chart.key.shadow']) {
                co.shadowColor = prop['chart.key.shadow.color'];
                co.shadowBlur = prop['chart.key.shadow.blur'];
                co.shadowOffsetX = prop['chart.key.shadow.offsetx'];
                co.shadowOffsetY = prop['chart.key.shadow.offsety'];
            }
            co.beginPath();
            co.fillStyle = prop['chart.key.background'];
            co.strokeStyle = 'black';
            if (typeof(prop['chart.key.position.graph.boxed']) == 'undefined' || (typeof(prop['chart.key.position.graph.boxed']) == 'boolean' && prop['chart.key.position.graph.boxed'])) {
                if (arguments[3] != false) {
                    co.lineWidth = typeof(prop['chart.key.linewidth']) == 'number' ? prop['chart.key.linewidth'] : 1;
                    if (prop['chart.key.rounded'] == true) {
                        co.beginPath();
                        co.strokeStyle = strokestyle;
                        RG.strokedCurvyRect(co, Math.round(hpos), Math.round(vpos), width - 5, 5 + ((text_size + 5) * RG.getKeyLength(key)), 4);
                        co.stroke();
                        co.fill();
                        RG.NoShadow(obj);
                    } else {
                        co.strokeRect(Math.round(hpos), Math.round(vpos), width - 5, 5 + ((text_size + 5) * RG.getKeyLength(key)));
                        co.fillRect(Math.round(hpos), Math.round(vpos), width - 5, 5 + ((text_size + 5) * RG.getKeyLength(key)));
                    }
                }
            }
            RG.NoShadow(obj);
            co.beginPath();
            if (prop['chart.key.colors']) {
                colors = prop['chart.key.colors'];
            }
            for (var i = key.length - 1; i >= 0; i--) {
                var j = Number(i) + 1;
                if (typeof(prop['chart.key.color.shape']) == 'object' && typeof(prop['chart.key.color.shape'][i]) == 'string') {
                    var blob_shape = prop['chart.key.color.shape'][i];
                } else if (typeof(prop['chart.key.color.shape']) == 'string') {
                    var blob_shape = prop['chart.key.color.shape'];
                } else {
                    var blob_shape = 'square';
                }
                if (blob_shape == 'circle') {
                    co.beginPath();
                    co.fillStyle = colors[i];
                    co.arc(hpos + 5 + (blob_size / 2), vpos + (5 * j) + (text_size * j) - text_size + (blob_size / 2), blob_size / 2, 0, 6.26, 0);
                    co.fill();
                } else if (blob_shape == 'line') {
                    co.beginPath();
                    co.strokeStyle = colors[i];
                    co.moveTo(hpos + 5, vpos + (5 * j) + (text_size * j) - text_size + (blob_size / 2));
                    co.lineTo(hpos + blob_size + 5, vpos + (5 * j) + (text_size * j) - text_size + (blob_size / 2));
                    co.stroke();
                } else if (blob_shape == 'triangle') {
                    co.beginPath();
                    co.strokeStyle = colors[i];
                    co.moveTo(hpos + 5, vpos + (5 * j) + (text_size * j) - text_size + blob_size);
                    co.lineTo(hpos + (blob_size / 2) + 5, vpos + (5 * j) + (text_size * j) - text_size);
                    co.lineTo(hpos + blob_size + 5, vpos + (5 * j) + (text_size * j) - text_size + blob_size);
                    co.closePath();
                    co.fillStyle = colors[i];
                    co.fill();
                } else {
                    co.fillStyle = colors[i];
                    co.fillRect(hpos + 5, vpos + (5 * j) + (text_size * j) - text_size, text_size, text_size + 1);
                }
                co.beginPath();
                co.fillStyle = typeof text_color == 'object' ? text_color[i] : text_color;
                ret = RG.Text2(obj, {
                    'font': text_font,
                    'size': text_size,
                    'bold': text_bold,
                    'italic': text_italic,
                    'x': hpos + blob_size + 5 + 5,
                    'y': vpos + (5 * j) + (text_size * j) + 3,
                    'text': key[i],
                    'accessible': !obj.properties['chart.key.interactive']
                });
                obj.coords.key[i] = [ret.x, ret.y, ret.width, ret.height, key[i], colors[i], obj];
            }
            co.fill();
        }

        function DrawKey_gutter(obj, key, colors) {
            var text_size = typeof(prop['chart.key.text.size']) == 'number' ? prop['chart.key.text.size'] : prop['chart.text.size'],
                text_bold = prop['chart.key.text.bold'], text_italic = prop['chart.key.text.italic'],
                text_font = prop['chart.key.text.font'] || prop['chart.key.font'] || prop['chart.text.font'],
                text_color = prop['chart.key.text.color'], gutterLeft = obj.gutterLeft, gutterRight = obj.gutterRight,
                gutterTop = obj.gutterTop, gutterBottom = obj.gutterBottom,
                hpos = ((ca.width - gutterLeft - gutterRight) / 2) + obj.gutterLeft, vpos = gutterTop - text_size - 5,
                title = prop['chart.title'], blob_size = text_size, hmargin = 8, vmargin = 4,
                fillstyle = prop['chart.key.background'], strokestyle = '#999', length = 0;
            if (!obj.coords) obj.coords = {};
            obj.coords.key = [];
            co.font = (obj.properties['chart.key.text.italic'] ? 'italic ' : '') + (obj.properties['chart.key.text.bold'] ? 'bold ' : '') + text_size + 'pt ' + text_font;
            for (i = 0; i < key.length; ++i) {
                length += hmargin;
                length += blob_size;
                length += hmargin;
                length += co.measureText(key[i]).width;
            }
            length += hmargin;
            if (obj.type == 'pie') {
                if (prop['chart.align'] == 'left') {
                    var hpos = obj.radius + gutterLeft;
                } else if (prop['chart.align'] == 'right') {
                    var hpos = ca.width - obj.radius - gutterRight;
                } else {
                    hpos = ca.width / 2;
                }
            }
            hpos -= (length / 2);
            if (typeof(prop['chart.key.position.x']) == 'number') {
                hpos = prop['chart.key.position.x'];
            }
            if (typeof(prop['chart.key.position.y']) == 'number') {
                vpos = prop['chart.key.position.y'];
            }
            if (obj.Get('chart.key.position.gutter.boxed')) {
                if (prop['chart.key.shadow']) {
                    co.shadowColor = prop['chart.key.shadow.color'];
                    co.shadowBlur = prop['chart.key.shadow.blur'];
                    co.shadowOffsetX = prop['chart.key.shadow.offsetx'];
                    co.shadowOffsetY = prop['chart.key.shadow.offsety'];
                }
                co.beginPath();
                co.fillStyle = fillstyle;
                co.strokeStyle = strokestyle;
                if (prop['chart.key.rounded']) {
                    RG.strokedCurvyRect(co, hpos, vpos - vmargin, length, text_size + vmargin + vmargin)
                } else {
                    co.rect(hpos, vpos - vmargin, length, text_size + vmargin + vmargin);
                }
                co.stroke();
                co.fill();
                RG.NoShadow(obj);
            }
            if (prop['chart.key.colors']) {
                colors = prop['chart.key.colors'];
            }
            for (var i = 0, pos = hpos; i < key.length; ++i) {
                pos += hmargin;
                if (typeof(prop['chart.key.color.shape']) == 'object' && typeof(prop['chart.key.color.shape'][i]) == 'string') {
                    var blob_shape = prop['chart.key.color.shape'][i];
                } else if (typeof(prop['chart.key.color.shape']) == 'string') {
                    var blob_shape = prop['chart.key.color.shape'];
                } else {
                    var blob_shape = 'square';
                }
                if (blob_shape == 'line') {
                    co.beginPath();
                    co.strokeStyle = colors[i];
                    co.moveTo(pos, vpos + (blob_size / 2));
                    co.lineTo(pos + blob_size, vpos + (blob_size / 2));
                    co.stroke();
                } else if (blob_shape == 'circle') {
                    co.beginPath();
                    co.fillStyle = colors[i];
                    co.moveTo(pos, vpos + (blob_size / 2));
                    co.arc(pos + (blob_size / 2), vpos + (blob_size / 2), (blob_size / 2), 0, 6.28, 0);
                    co.fill();
                } else if (blob_shape == 'triangle') {
                    co.fillStyle = colors[i];
                    co.beginPath();
                    co.strokeStyle = colors[i];
                    co.moveTo(pos, vpos + blob_size);
                    co.lineTo(pos + (blob_size / 2), vpos);
                    co.lineTo(pos + blob_size, vpos + blob_size);
                    co.closePath();
                    co.fill();
                } else {
                    co.beginPath();
                    co.fillStyle = colors[i];
                    co.rect(pos, vpos, blob_size, blob_size);
                    co.fill();
                }
                pos += blob_size;
                pos += hmargin;
                co.beginPath();
                co.fillStyle = (typeof text_color === 'object') ? text_color[i] : text_color;
                var ret = RG.Text2(obj, {
                    'font': text_font,
                    'bold': text_bold,
                    'size': text_size,
                    'italic': text_italic,
                    'x': pos,
                    'y': vpos + text_size + 3,
                    'text': key[i],
                    accessible: !obj.properties['chart.key.interactive']
                });
                co.fill();
                pos += co.measureText(key[i]).width;
                obj.coords.key[i] = [ret.x, ret.y, ret.width, ret.height, key[i], colors[i], obj];
            }
        }

        if (keypos && keypos == 'gutter') {
            DrawKey_gutter(obj, key, colors);
        } else if (keypos && keypos == 'graph') {
            DrawKey_graph(obj, key, colors);
        } else {
            alert('[COMMON] (' + obj.id + ') Unknown key position: ' + keypos);
        }
        if (prop['chart.key.interactive']) {
            if (!RGraph.Drawing || !RGraph.Drawing.Rect) {
                alert('[INTERACTIVE KEY] The drawing API Rect library does not appear to have been included (which the interactive key uses)');
            }
            if (!RGraph.InstallWindowMousedownListener) {
                alert('[INTERACTIVE KEY] The dynamic library does not appear to have been included');
            }
            for (var i = 0, len = obj.coords.key.length, maxlen = 0; i < len; i += 1) {
                maxlen = Math.max(maxlen, obj.coords.key[i][2]);
            }
            for (var i = 0, len = obj.coords.key.length; i < len; i += 1) {
                (function (idx) {
                    var arr = obj.coords.key;
                    var value = obj.coords.key[idx];
                    var index = idx;
                    var rect = new RGraph.Drawing.Rect(obj.id, value[0], value[1], prop['chart.key.position'] == 'gutter' ? value[2] : maxlen, value[3]).Set('fillstyle', 'rgba(0,0,0,0)').Draw();
                    rect.onclick = function (e, shape) {
                        var co = rect.context;
                        co.fillStyle = prop['chart.key.interactive.highlight.label'];
                        co.fillRect(shape.x, shape.y, shape.width, shape.height);
                        if (typeof obj.interactiveKeyHighlight == 'function') {
                            obj.Set('chart.key.interactive.index', idx);
                            RG.FireCustomEvent(obj, 'onbeforeinteractivekey');
                            obj.interactiveKeyHighlight(index);
                            RG.FireCustomEvent(obj, 'onafterinteractivekey');
                        }
                    }
                    rect.onmousemove = function (e, shape) {
                        return true;
                    }
                })(i);
            }
        }
    };
    RG.getKeyLength = function (key) {
        var length = 0;
        for (var i = 0, len = key.length; i < len; i += 1) {
            if (key[i] != null) {
                ++length;
            }
        }
        return length;
    };
    RGraph.HTML.key = RGraph.HTML.Key = function (id, prop) {
        var div = doc.getElementById(id);
        var str = '<table border="0" cellspacing="0" cellpadding="0" id="rgraph_key" style="display: inline;' + (function () {
                var style = ''
                for (i in prop.tableCss) {
                    if (typeof i === 'string') {
                        style = style + i + ': ' + prop.tableCss[i] + ';';
                    }
                }
                return style;
            })() + '" ' + (prop.tableClass ? 'class="' + prop.tableClass + '"' : '') + '>';
        for (var i = 0; i < prop.labels.length; i += 1) {
            str += '<tr><td><div style="' + (function () {
                    var style = '';
                    for (var j in prop.blobCss) {
                        if (typeof j === 'string') {
                            style = style + j + ': ' + prop.blobCss[j] + ';';
                        }
                    }
                    return style;
                })() + 'display: inline-block; margin-right: 5px; margin-top: 4px; width: 15px; height: 15px; background-color: ' + prop.colors[i] + '"' + (prop.blobClass ? 'class="' + prop.blobClass + '"' : '') + '>&nbsp;</div><td>' + (prop.links && prop.links[i] ? '<a href="' + prop.links[i] + '">' : '') + '<span ' + (prop.labelClass ? 'class="' + prop.labelClass + '"' : '') + '" ' + (function () {
                    var style = '';
                    for (var j in prop.labelCss) {
                        if (typeof j === 'string') {
                            style = style + j + ': ' + prop.labelCss[j] + ';';
                        }
                    }
                    return style;
                })() + (function () {
                    var style = '';
                    if (prop['labelCss_' + i]) {
                        for (var j in prop['labelCss_' + i]) {
                            style = style + j + ': ' + prop['labelCss_' + i][j] + ';';
                        }
                    }
                    return style ? 'style="' + style + '"' : '';
                })() + '>' + prop.labels[i] + '</span>' + (prop.links && prop.links[i] ? '</a>' : '') + '</td></tr>';
        }
        div.innerHTML += (str + '</table>');
        return doc.getElementById('rgraph_key');
    };
})(window, document);