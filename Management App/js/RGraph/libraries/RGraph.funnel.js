RGraph = window.RGraph || {isRGraph: true};
RGraph.Funnel = function (conf) {
    if (typeof conf === 'object' && typeof conf.data === 'object' && typeof conf.id === 'string') {
        var id = conf.id
        var canvas = document.getElementById(id);
        var data = conf.data;
        var parseConfObjectForOptions = true;
    } else {
        var id = conf;
        var canvas = document.getElementById(id);
        var data = arguments[1];
    }
    this.id = id;
    this.canvas = canvas;
    this.context = this.canvas.getContext ? this.canvas.getContext("2d", {alpha: (typeof id === 'object' && id.alpha === false) ? false : true}) : null;
    this.canvas.__object__ = this;
    this.type = 'funnel';
    this.coords = [];
    this.isRGraph = true;
    this.uid = RGraph.CreateUID();
    this.canvas.uid = this.canvas.uid ? this.canvas.uid : RGraph.CreateUID();
    this.coordsText = [];
    this.original_colors = [];
    this.firstDraw = true;
    if (!this.canvas) {
        alert('[FUNNEL] No canvas support');
        return;
    }
    this.properties = {
        'chart.strokestyle': 'rgba(0,0,0,0)',
        'chart.gutter.left': 25,
        'chart.gutter.right': 25,
        'chart.gutter.top': 25,
        'chart.gutter.bottom': 25,
        'chart.labels': null,
        'chart.labels.sticks': false,
        'chart.labels.x': null,
        'chart.title': '',
        'chart.title.background': null,
        'chart.title.hpos': null,
        'chart.title.vpos': null,
        'chart.title.bold': true,
        'chart.title.font': null,
        'chart.title.x': null,
        'chart.title.y': null,
        'chart.title.halign': null,
        'chart.title.valign': null,
        'chart.colors': ['Gradient(white:red)', 'Gradient(white:green)', 'Gradient(white:gray)', 'Gradient(white:blue)', 'Gradient(white:black)', 'Gradient(white:gray)', 'Gradient(white:pink)', 'Gradient(white:blue)', 'Gradient(white:yellow)', 'Gradient(white:green)', 'Gradient(white:red)'],
        'chart.text.size': 12,
        'chart.text.boxed': true,
        'chart.text.halign': 'left',
        'chart.text.color': 'black',
        'chart.text.font': 'Segoe UI, Arial, Verdana, sans-serif',
        'chart.text.accessible': true,
        'chart.text.accessible.overflow': 'visible',
        'chart.text.accessible.pointerevents': true,
        'chart.contextmenu': null,
        'chart.shadow': false,
        'chart.shadow.color': '#666',
        'chart.shadow.blur': 3,
        'chart.shadow.offsetx': 3,
        'chart.shadow.offsety': 3,
        'chart.key': null,
        'chart.key.background': 'white',
        'chart.key.position': 'graph',
        'chart.key.halign': 'right',
        'chart.key.shadow': false,
        'chart.key.shadow.color': '#666',
        'chart.key.shadow.blur': 3,
        'chart.key.shadow.offsetx': 2,
        'chart.key.shadow.offsety': 2,
        'chart.key.position.gutter.boxed': false,
        'chart.key.position.x': null,
        'chart.key.position.y': null,
        'chart.key.color.shape': 'square',
        'chart.key.rounded': true,
        'chart.key.linewidth': 1,
        'chart.key.colors': null,
        'chart.key.interactive': false,
        'chart.key.interactive.highlight.chart.stroke': 'black',
        'chart.key.interactive.highlight.chart.fill': 'rgba(255,255,255,0.7)',
        'chart.key.interactive.highlight.label': 'rgba(255,0,0,0.2)',
        'chart.key.text.color': 'black',
        'chart.tooltips': null,
        'chart.tooltips.effect': 'fade',
        'chart.tooltips.css.class': 'RGraph_tooltip',
        'chart.tooltips.event': 'onclick',
        'chart.highlight.stroke': 'rgba(0,0,0,0)',
        'chart.highlight.fill': 'rgba(255,255,255,0.7)',
        'chart.tooltips.highlight': true,
        'chart.annotatable': false,
        'chart.annotate.color': 'black',
        'chart.zoom.factor': 1.5,
        'chart.zoom.fade.in': true,
        'chart.zoom.fade.out': true,
        'chart.zoom.factor': 1.5,
        'chart.zoom.fade.in': true,
        'chart.zoom.fade.out': true,
        'chart.zoom.hdir': 'right',
        'chart.zoom.vdir': 'down',
        'chart.zoom.frames': 25,
        'chart.zoom.delay': 16.666,
        'chart.zoom.shadow': true,
        'chart.zoom.background': true,
        'chart.zoom.action': 'zoom',
        'chart.resizable': false,
        'chart.events.click': null,
        'chart.events.mousemove': null,
        'chart.clearto': 'rgba(0,0,0,0)'
    }
    for (var i = 0; i < data.length; ++i) {
        data[i] = parseFloat(data[i]);
    }
    this.data = data;
    for (var i = 0; i < data.length; ++i) {
        this['$' + i] = {};
    }
    if (!this.canvas.__rgraph_aa_translated__) {
        this.context.translate(0.5, 0.5);
        this.canvas.__rgraph_aa_translated__ = true;
    }
    var RG = RGraph, ca = this.canvas, co = ca.getContext('2d'), prop = this.properties, pa2 = RG.path2, win = window,
        doc = document, ma = Math
    if (RG.Effects && typeof RG.Effects.decorate === 'function') {
        RG.Effects.decorate(this);
    }
    this.set = this.Set = function (name) {
        var value = typeof arguments[1] === 'undefined' ? null : arguments[1];
        if (arguments.length === 1 && typeof name === 'object') {
            RG.parseObjectStyleConfig(this, name);
            return this;
        }
        if (name.substr(0, 6) != 'chart.') {
            name = 'chart.' + name;
        }
        while (name.match(/([A-Z])/)) {
            name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
        }
        prop[name] = value;
        return this;
    };
    this.get = this.Get = function (name) {
        if (name.substr(0, 6) != 'chart.') {
            name = 'chart.' + name;
        }
        while (name.match(/([A-Z])/)) {
            name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
        }
        return prop[name.toLowerCase()];
    };
    this.draw = this.Draw = function () {
        RG.FireCustomEvent(this, 'onbeforedraw');
        if (!this.colorsParsed) {
            this.parseColors();
            this.colorsParsed = true;
        }
        this.gutterLeft = prop['chart.gutter.left'];
        this.gutterRight = prop['chart.gutter.right'];
        this.gutterTop = prop['chart.gutter.top'];
        this.gutterBottom = prop['chart.gutter.bottom'];
        this.coords = [];
        this.coordsText = [];
        RG.DrawTitle(this, prop['chart.title'], this.gutterTop, null, prop['chart.title.size'] ? prop['chart.title.size'] : prop['chart.text.size'] + 2);
        this.DrawFunnel();
        if (prop['chart.contextmenu']) {
            RG.ShowContext(this);
        }
        this.DrawLabels();
        if (prop['chart.resizable']) {
            RG.AllowResizing(this);
        }
        RG.InstallEventListeners(this);
        if (this.firstDraw) {
            RG.fireCustomEvent(this, 'onfirstdraw');
            this.firstDraw = false;
            this.firstDrawFunc();
        }
        RG.FireCustomEvent(this, 'ondraw');
        return this;
    };
    this.exec = function (func) {
        func(this);
        return this;
    };
    this.drawFunnel = this.DrawFunnel = function () {
        var width = ca.width - this.gutterLeft - this.gutterRight;
        var height = ca.height - this.gutterTop - this.gutterBottom;
        var total = RG.array_max(this.data);
        var accheight = this.gutterTop;
        if (prop['chart.shadow']) {
            co.shadowColor = prop['chart.shadow.color'];
            co.shadowBlur = prop['chart.shadow.blur'];
            co.shadowOffsetX = prop['chart.shadow.offsetx'];
            co.shadowOffsetY = prop['chart.shadow.offsety'];
        }
        for (i = 0, len = this.data.length; i < len; ++i) {
            var firstvalue = this.data[0];
            var firstwidth = (firstvalue / total) * width;
            var curvalue = this.data[i];
            var curwidth = (curvalue / total) * width;
            var curheight = height / this.data.length;
            var halfCurWidth = (curwidth / 2);
            var nextvalue = this.data[i + 1];
            var nextwidth = this.data[i + 1] ? (nextvalue / total) * width : null;
            var halfNextWidth = (nextwidth / 2);
            var center = this.gutterLeft + (firstwidth / 2);
            var x1 = center - halfCurWidth;
            var y1 = accheight;
            var x2 = center + halfCurWidth;
            var y2 = accheight;
            var x3 = center + halfNextWidth;
            var y3 = accheight + curheight;
            var x4 = center - halfNextWidth;
            var y4 = accheight + curheight;
            if (nextwidth && i < this.data.length - 1) {
                co.beginPath();
                co.strokeStyle = prop['chart.strokestyle'];
                co.fillStyle = prop['chart.colors'][i];
                co.moveTo(x1, y1);
                co.lineTo(x2, y2);
                co.lineTo(x3, y3);
                co.lineTo(x4, y4);
                co.closePath();
                this.coords.push([x1, y1, x2, y2, x3, y3, x4, y4]);
            }
            if (!prop['chart.shadow']) {
                co.stroke();
            }
            co.fill();
            accheight += curheight;
        }
        if (prop['chart.shadow']) {
            RG.NoShadow(this);
            for (i = 0; i < this.coords.length; ++i) {
                co.strokeStyle = prop['chart.strokestyle'];
                co.fillStyle = prop['chart.colors'][i];
                co.beginPath();
                co.moveTo(this.coords[i][0], this.coords[i][1]);
                co.lineTo(this.coords[i][2], this.coords[i][3]);
                co.lineTo(this.coords[i][4], this.coords[i][5]);
                co.lineTo(this.coords[i][6], this.coords[i][7]);
                co.closePath();
                co.stroke();
                co.fill();
            }
        }
        if (prop['chart.key'] && prop['chart.key'].length) {
            RG.DrawKey(this, prop['chart.key'], prop['chart.colors']);
        }
    };
    this.drawLabels = this.DrawLabels = function () {
        if (prop['chart.labels'] && prop['chart.labels'].length > 0) {
            var font = prop['chart.text.font'];
            var size = prop['chart.text.size'];
            var color = prop['chart.text.color'];
            var labels = prop['chart.labels'];
            var halign = prop['chart.text.halign'] == 'left' ? 'left' : 'center';
            var bgcolor = prop['chart.text.boxed'] ? 'white' : null;
            if (typeof prop['chart.labels.x'] == 'number') {
                var x = prop['chart.labels.x'];
            } else {
                var x = halign == 'left' ? (this.gutterLeft - 15) : ((ca.width - this.gutterLeft - this.gutterRight) / 2) + this.gutterLeft;
            }
            for (var j = 0; j < this.coords.length; ++j) {
                co.beginPath();
                co.strokeStyle = 'black';
                co.fillStyle = color;
                RG.NoShadow(this);
                var label = labels[j];
                RG.text2(this, {
                    'font': font,
                    'size': size,
                    'x': x,
                    'y': this.coords[j][1],
                    'text': label,
                    'valign': 'center',
                    'halign': halign,
                    'bounding': prop['chart.text.boxed'],
                    'boundingFill': bgcolor,
                    'tag': 'labels'
                });
                if (prop['chart.labels.sticks']) {
                    co.font = size + 'pt ' + font;
                    var labelWidth = co.measureText(label).width;
                    co.beginPath();
                    co.strokeStyle = 'gray';
                    co.moveTo(x + labelWidth + 10, ma.round(this.coords[j][1]));
                    co.lineTo(this.coords[j][0] - 10, ma.round(this.coords[j][1]));
                    co.stroke();
                }
            }
            var lastLabel = labels[j];
            if (lastLabel) {
                RG.text2(this, {
                    'font': font,
                    'size': size,
                    'x': x,
                    'y': this.coords[j - 1][5],
                    'text': lastLabel,
                    'valign': 'center',
                    'halign': halign,
                    'bounding': prop['chart.text.boxed'],
                    'boundingFill': bgcolor,
                    'tag': 'labels'
                });
                if (prop['chart.labels.sticks']) {
                    co.font = size + 'pt ' + font;
                    var labelWidth = co.measureText(lastLabel).width;
                    co.beginPath();
                    co.strokeStyle = 'gray';
                    co.moveTo(x + labelWidth + 10, Math.round(this.coords[j - 1][7]));
                    co.lineTo(this.coords[j - 1][6] - 10, Math.round(this.coords[j - 1][7]));
                    co.stroke();
                }
            }
        }
    };
    this.getShape = this.getSegment = function (e) {
        var coords = this.coords;
        var mouseCoords = RG.getMouseXY(e);
        var x = mouseCoords[0];
        var y = mouseCoords[1];
        for (i = 0, len = coords.length; i < len; ++i) {
            var segment = coords[i]
            co.beginPath();
            co.moveTo(segment[0], segment[1]);
            co.lineTo(segment[2], segment[3]);
            co.lineTo(segment[4], segment[5]);
            co.lineTo(segment[6], segment[7]);
            co.lineTo(segment[8], segment[9]);
            if (co.isPointInPath(x, y)) {
                var tooltip = RGraph.parseTooltipText(prop['chart.tooltips'], i);
                return {0: this, 1: coords, 2: i, 'object': this, 'coords': segment, 'index': i, 'tooltip': tooltip};
            }
        }
        return null;
    };
    this.highlight = this.Highlight = function (shape) {
        if (prop['chart.tooltips.highlight']) {
            if (typeof prop['chart.highlight.style'] === 'function') {
                (prop['chart.highlight.style'])(shape);
                return;
            }
            var coords = shape['coords'];
            pa2(co, 'b m % % l % % l % % l % % c s % f %', coords[0], coords[1], coords[2], coords[3], coords[4], coords[5], coords[6], coords[7], prop['chart.highlight.stroke'], prop['chart.highlight.fill']);
        }
    };
    this.getObjectByXY = function (e) {
        var mouseXY = RGraph.getMouseXY(e);
        if (mouseXY[0] > prop['chart.gutter.left'] && mouseXY[0] < (ca.width - prop['chart.gutter.right']) && mouseXY[1] > prop['chart.gutter.top'] && mouseXY[1] < (ca.height - prop['chart.gutter.bottom'])) {
            return this;
        }
    };
    this.parseColors = function () {
        if (this.original_colors.length === 0) {
            this.original_colors['chart.colors'] = RG.array_clone(prop['chart.colors']);
            this.original_colors['chart.key.colors'] = RG.array_clone(prop['chart.key.colors']);
            this.original_colors['chart.highlight.fill'] = RG.array_clone(prop['chart.highlight.fill']);
            this.original_colors['chart.highlight.stroke'] = RG.array_clone(prop['chart.highlight.stroke']);
            this.original_colors['chart.strokestyle'] = RG.array_clone(prop['chart.strokestyle']);
        }
        var colors = prop['chart.colors'];
        for (var i = 0; i < colors.length; ++i) {
            colors[i] = this.parseSingleColorForHorizontalGradient(colors[i]);
        }
        var keyColors = prop['chart.key.colors'];
        if (keyColors) {
            for (var i = 0; i < keyColors.length; ++i) {
                keyColors[i] = this.parseSingleColorForHorizontalGradient(keyColors[i]);
            }
        }
        prop['chart.strokestyle'] = this.parseSingleColorForVerticalGradient(prop['chart.strokestyle']);
        prop['chart.highlight.stroke'] = this.parseSingleColorForHorizontalGradient(prop['chart.highlight.stroke']);
        prop['chart.highlight.fill'] = this.parseSingleColorForHorizontalGradient(prop['chart.highlight.fill']);
    };
    this.reset = function () {
    };
    this.parseSingleColorForHorizontalGradient = function (color) {
        if (!color || typeof(color) != 'string') {
            return color;
        }
        if (color.match(/^gradient\((.*)\)$/i)) {
            var parts = RegExp.$1.split(':');
            var grad = co.createLinearGradient(prop['chart.gutter.left'], 0, ca.width - prop['chart.gutter.right'], 0);
            var diff = 1 / (parts.length - 1);
            grad.addColorStop(0, RGraph.trim(parts[0]));
            for (var j = 1; j < parts.length; ++j) {
                grad.addColorStop(j * diff, RG.trim(parts[j]));
            }
        }
        return grad ? grad : color;
    };
    this.parseSingleColorForVerticalGradient = function (color) {
        if (!color || typeof(color) != 'string') {
            return color;
        }
        if (color.match(/^gradient\((.*)\)$/i)) {
            var parts = RegExp.$1.split(':');
            var grad = co.createLinearGradient(0, prop['chart.gutter.top'], 0, ca.height - prop['chart.gutter.bottom']);
            var diff = 1 / (parts.length - 1);
            grad.addColorStop(0, RGraph.trim(parts[0]));
            for (var j = 1; j < parts.length; ++j) {
                grad.addColorStop(j * diff, RG.trim(parts[j]));
            }
        }
        return grad ? grad : color;
    };
    this.interactiveKeyHighlight = function (index) {
        var coords = this.coords[index];
        if (coords && coords.length == 8) {
            var pre_linewidth = co.lineWidth;
            co.lineWidth = 2;
            co.strokeStyle = prop['chart.key.interactive.highlight.chart.stroke'];
            co.fillStyle = prop['chart.key.interactive.highlight.chart.fill'];
            co.beginPath();
            co.moveTo(coords[0], coords[1]);
            co.lineTo(coords[2], coords[3]);
            co.lineTo(coords[4], coords[5]);
            co.lineTo(coords[6], coords[7]);
            co.closePath();
            co.fill();
            co.stroke();
            co.lineWidth = pre_linewidth;
        }
    };
    this.on = function (type, func) {
        if (type.substr(0, 2) !== 'on') {
            type = 'on' + type;
        }
        if (typeof this[type] !== 'function') {
            this[type] = func;
        } else {
            RG.addCustomEventListener(this, type, func);
        }
        return this;
    };
    this.firstDrawFunc = function () {
    };
    RG.att(ca);
    RG.Register(this);
    if (parseConfObjectForOptions) {
        RG.parseObjectStyleConfig(this, conf.options);
    }
};