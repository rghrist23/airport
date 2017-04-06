RGraph = window.RGraph || {isRGraph: true};
RGraph.Waterfall = function (conf) {
    if (typeof conf === 'object' && typeof conf.data === 'object' && typeof conf.id === 'string') {
        var parseConfObjectForOptions = true;
    } else {
        var conf = {id: conf, data: arguments[1]};
    }
    this.id = conf.id;
    this.canvas = document.getElementById(this.id);
    this.context = this.canvas.getContext ? this.canvas.getContext("2d") : null;
    this.canvas.__object__ = this;
    this.type = 'waterfall';
    this.max = 0;
    this.data = conf.data;
    this.isRGraph = true;
    this.coords = [];
    this.uid = RGraph.CreateUID();
    this.canvas.uid = this.canvas.uid ? this.canvas.uid : RGraph.CreateUID();
    this.colorsParsed = false;
    this.coordsText = [];
    this.original_colors = [];
    this.firstDraw = true;
    this.properties = {
        'chart.background.barcolor1': 'rgba(0,0,0,0)',
        'chart.background.barcolor2': 'rgba(0,0,0,0)',
        'chart.background.grid': true,
        'chart.background.grid.color': '#ddd',
        'chart.background.grid.width': 1,
        'chart.background.grid.hsize': 20,
        'chart.background.grid.vsize': 20,
        'chart.background.grid.vlines': true,
        'chart.background.grid.hlines': true,
        'chart.background.grid.border': true,
        'chart.background.grid.autofit': true,
        'chart.background.grid.autofit.align': true,
        'chart.background.grid.autofit.numhlines': 5,
        'chart.background.grid.autofit.numvlines': 20,
        'chart.background.image': null,
        'chart.background.hbars': null,
        'chart.linewidth': 1,
        'chart.axis.linewidth': 1,
        'chart.xaxispos': 'bottom',
        'chart.numxticks': null,
        'chart.numyticks': 10,
        'chart.hmargin': 5,
        'chart.strokestyle': '#666',
        'chart.axis.color': 'black',
        'chart.gutter.left': 25,
        'chart.gutter.right': 25,
        'chart.gutter.top': 25,
        'chart.gutter.bottom': 25,
        'chart.labels': [],
        'chart.labels.bold': false,
        'chart.labels.offsetx': 0,
        'chart.labels.offsety': 0,
        'chart.ylabels.offsetx': 0,
        'chart.ylabels.offsety': 0,
        'chart.ylabels': true,
        'chart.text.color': 'black',
        'chart.text.size': 12,
        'chart.text.angle': 0,
        'chart.text.font': 'Segoe UI, Arial, Verdana, sans-serif',
        'chart.text.accessible': true,
        'chart.text.accessible.overflow': 'visible',
        'chart.text.accessible.pointerevents': true,
        'chart.ymax': null,
        'chart.title': '',
        'chart.title.color': 'black',
        'chart.title.background': null,
        'chart.title.hpos': null,
        'chart.title.vpos': null,
        'chart.title.bold': true,
        'chart.title.font': null,
        'chart.title.xaxis': '',
        'chart.title.yaxis': '',
        'chart.title.yaxis.bold': true,
        'chart.title.yaxis.size': null,
        'chart.title.yaxis.font': null,
        'chart.title.yaxis.color': null,
        'chart.title.xaxis.pos': null,
        'chart.title.yaxis.pos': null,
        'chart.title.yaxis.align': 'left',
        'chart.title.xaxis.bold': true,
        'chart.title.xaxis.size': null,
        'chart.title.xaxis.font': null,
        'chart.title.xaxis.color': null,
        'chart.title.yaxis.x': null,
        'chart.title.yaxis.y': null,
        'chart.title.xaxis.x': null,
        'chart.title.xaxis.y': null,
        'chart.title.x': null,
        'chart.title.y': null,
        'chart.title.halign': null,
        'chart.title.valign': null,
        'chart.colors': ['green', 'red', 'blue'],
        'chart.shadow': false,
        'chart.shadow.color': '#666',
        'chart.shadow.offsetx': 3,
        'chart.shadow.offsety': 3,
        'chart.shadow.blur': 3,
        'chart.tooltips': null,
        'chart.tooltips.effect': 'fade',
        'chart.tooltips.css.class': 'RGraph_tooltip',
        'chart.tooltips.event': 'onclick',
        'chart.tooltips.highlight': true,
        'chart.tooltips.override': null,
        'chart.highlight.stroke': 'rgba(0,0,0,0)',
        'chart.highlight.fill': 'rgba(255,255,255,0.7)',
        'chart.contextmenu': null,
        'chart.units.pre': '',
        'chart.units.post': '',
        'chart.scale.decimals': 0,
        'chart.scale.point': '.',
        'chart.scale.thousand': ',',
        'chart.scale.zerostart': true,
        'chart.crosshairs': false,
        'chart.crosshairs.color': '#333',
        'chart.crosshairs.hline': true,
        'chart.crosshairs.vline': true,
        'chart.annotatable': false,
        'chart.annotate.color': 'black',
        'chart.zoom.factor': 1.5,
        'chart.zoom.fade.in': true,
        'chart.zoom.fade.out': true,
        'chart.zoom.hdir': 'right',
        'chart.zoom.vdir': 'down',
        'chart.zoom.frames': 25,
        'chart.zoom.delay': 16.666,
        'chart.zoom.shadow': true,
        'chart.zoom.background': true,
        'chart.resizable': false,
        'chart.resize.handle.background': null,
        'chart.noaxes': false,
        'chart.noxaxis': false,
        'chart.noyaxis': false,
        'chart.axis.color': 'black',
        'chart.total': true,
        'chart.multiplier.x': 1,
        'chart.multiplier.w': 1,
        'chart.events.click': null,
        'chart.events.mousemove': null,
        'chart.ylabels.count': 5,
        'chart.ymin': 0,
        'chart.clearto': 'rgba(0,0,0,0)'
    }
    if (!this.canvas) {
        alert('[WATERFALL] No canvas support');
        return;
    }
    for (var i = 0, len = this.data.length; i <= len; ++i) {
        this['$' + i] = {}
        if (typeof this.data[i] === 'string') {
            this.data[i] = parseFloat(this.data[i]);
        }
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
    this.set = this.Set = function (name, value) {
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
        if (name == 'chart.total' && prop['chart.numxticks'] == null) {
            prop['chart.numxticks'] = this.data.length;
        }
        prop[name.toLowerCase()] = value;
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
        RGraph.fireCustomEvent(this, 'onbeforedraw');
        if (!this.colorsParsed) {
            this.parseColors();
            this.colorsParsed = true;
        }
        RGraph.DrawBackgroundImage(this);
        this.gutterLeft = prop['chart.gutter.left'];
        this.gutterRight = prop['chart.gutter.right'];
        this.gutterTop = prop['chart.gutter.top'];
        this.gutterBottom = prop['chart.gutter.bottom'];
        this.coords = [];
        this.coordsText = [];
        this.centery = ((ca.height - this.gutterTop - this.gutterBottom) / 2) + this.gutterTop;
        this.max = 0;
        this.grapharea = ca.height - this.gutterTop - this.gutterBottom;
        this.graphwidth = ca.width - this.gutterLeft - this.gutterRight;
        this.halfTextHeight = prop['chart.text.size'] / 2;
        this.max = this.getMax(this.data);
        var decimals = prop['chart.scale.decimals'];
        this.scale2 = RG.getScale2(this, {
            max: typeof(prop['chart.ymax']) == 'number' ? prop['chart.ymax'] : this.max,
            min: prop['chart.ymin'],
            strict: typeof(prop['chart.ymax']) === 'number' ? true : false,
            'scale.decimals': Number(decimals),
            'scale.point': prop['chart.scale.point'],
            'scale.thousand': prop['chart.scale.thousand'],
            'scale.round': prop['chart.scale.round'],
            'units.pre': prop['chart.units.pre'],
            'units.post': prop['chart.units.post'],
            'ylabels.count': prop['chart.ylabels.count']
        });
        this.max = this.scale2.max;
        this.min = this.scale2.min;
        RG.drawBars(this)
        RG.Background.draw(this);
        this.DrawAxes();
        this.Drawbars();
        this.DrawLabels();
        if (prop['chart.xaxispos'] === 'bottom' && prop['chart.noaxes'] === false && prop['chart.noxaxis'] === false && prop['chart.ymin'] === 0) {
            co.strokeStyle = prop['chart.axis.color'];
            co.strokeRect(prop['chart.gutter.left'], ca.height - prop['chart.gutter.bottom'], ca.width - this.gutterLeft - this.gutterRight, 0);
        }
        if (prop['chart.contextmenu']) {
            RG.ShowContext(this);
        }
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
    this.drawAxes = this.DrawAxes = function () {
        if (prop['chart.noaxes']) {
            return;
        }
        co.beginPath();
        co.strokeStyle = prop['chart.axis.color'];
        co.lineWidth = prop['chart.axis.linewidth'] + 0.001;
        if (prop['chart.noyaxis'] == false) {
            co.moveTo(ma.round(this.gutterLeft), this.gutterTop);
            co.lineTo(ma.round(this.gutterLeft), ca.height - this.gutterBottom);
        }
        if (prop['chart.noxaxis'] == false) {
            if (prop['chart.xaxispos'] == 'center') {
                co.moveTo(this.gutterLeft, ma.round(((ca.height - this.gutterTop - this.gutterBottom) / 2) + this.gutterTop));
                co.lineTo(ca.width - this.gutterRight, ma.round(((ca.height - this.gutterTop - this.gutterBottom) / 2) + this.gutterTop));
            } else {
                var y = ma.floor(this.getYCoord(0));
                co.moveTo(this.gutterLeft, y);
                co.lineTo(ca.width - this.gutterRight, y);
            }
        }
        var numYTicks = prop['chart.numyticks'];
        if (prop['chart.noyaxis'] === false && prop['chart.numyticks'] > 0) {
            var yTickGap = (ca.height - this.gutterTop - this.gutterBottom) / numYTicks;
            for (y = this.gutterTop; y < (ca.height - this.gutterBottom); y += yTickGap) {
                if (prop['chart.xaxispos'] == 'bottom' || (y != ((ca.height - this.gutterTop - this.gutterBottom) / 2) + this.gutterTop)) {
                    co.moveTo(this.gutterLeft, ma.round(y));
                    co.lineTo(this.gutterLeft - 3, ma.round(y));
                }
            }
            if (prop['chart.noxaxis'] || prop['chart.xaxispos'] == 'center' || prop['chart.ymin'] !== 0) {
                co.moveTo(this.gutterLeft - 3, Math.round(ca.height - this.gutterBottom));
                co.lineTo(this.gutterLeft, Math.round(ca.height - this.gutterBottom));
            }
        }
        if (prop['chart.numxticks'] == null) {
            prop['chart.numxticks'] = this.data.length + (prop['chart.total'] ? 1 : 0)
        }
        if (prop['chart.noxaxis'] == false && prop['chart.numxticks'] > 0) {
            xTickGap = (ca.width - this.gutterLeft - this.gutterRight) / prop['chart.numxticks'];
            if (prop['chart.xaxispos'] == 'center') {
                yStart = ((ca.height - this.gutterBottom - this.gutterTop) / 2) + this.gutterTop - 3;
                yEnd = ((ca.height - this.gutterBottom - this.gutterTop) / 2) + this.gutterTop + 3;
            } else {
                yStart = this.getYCoord(0) - (this.scale2.min < 0 ? 3 : 0);
                yEnd = this.getYCoord(0) + 3;
            }
            for (x = this.gutterLeft + xTickGap; x <= ca.width - this.gutterRight + 1; x += xTickGap) {
                co.moveTo(ma.round(x), yStart);
                co.lineTo(ma.round(x), yEnd);
            }
            if (prop['chart.noyaxis']) {
                co.moveTo(ma.round(this.gutterLeft), yStart);
                co.lineTo(ma.round(this.gutterLeft), yEnd);
            }
        }
        if (prop['chart.noyaxis'] && prop['chart.noxaxis'] == false) {
            co.moveTo(ma.round(this.gutterLeft), this.getYCoord(0));
            co.lineTo(ma.round(this.gutterLeft), this.getYCoord(0));
        }
        co.stroke();
    };
    this.drawLabels = this.DrawLabels = function () {
        var context = co, numYLabels = 5, interval = this.grapharea / numYLabels, font = prop['chart.text.font'],
            size = prop['chart.text.size'], color = prop['chart.text.color'], units_pre = prop['chart.units.pre'],
            units_post = prop['chart.units.post'], offsetx = prop['chart.ylabels.offsetx'],
            offsety = prop['chart.ylabels.offsety'];
        co.beginPath();
        co.fillStyle = color;
        if (prop['chart.ylabels']) {
            if (prop['chart.xaxispos'] == 'center') {
                var halfInterval = interval / 2;
                var halfWay = ((ca.height - this.gutterTop - this.gutterBottom) / 2) + this.gutterTop;
                for (var i = 0, len = this.scale2.labels.length; i < len; ++i) {
                    RG.text2(this, {
                        font: font,
                        size: size,
                        x: this.gutterLeft - 5 + offsetx,
                        y: this.gutterTop + (((this.grapharea / 2) / len) * i) + offsety,
                        text: this.scale2.labels[len - i - 1],
                        valign: 'center',
                        halign: 'right',
                        tag: 'scale'
                    });
                    RG.text2(this, {
                        font: font,
                        size: size,
                        x: this.gutterLeft - 5 + offsetx,
                        y: halfWay + (((this.grapharea / 2) / len) * (i + 1)) + offsety,
                        text: this.scale2.labels[i],
                        valign: 'center',
                        halign: 'right',
                        tag: 'scale'
                    });
                }
                if (prop['chart.scale.zerostart']) {
                    RG.text2(co, {
                        x: this.gutterLeft - 5 + offsetx,
                        y: halfWay,
                        text: '0',
                        font: font,
                        size: size,
                        valign: 'center',
                        halign: 'right',
                        tag: 'scale'
                    });
                }
            } else {
                for (var i = 0, len = this.scale2.values.length; i < len; ++i) {
                    var y = this.getYCoord(this.scale2.values[i]) + offsety;
                    RG.text2(this, {
                        font: font,
                        size: size,
                        x: this.gutterLeft - 5 + offsetx,
                        y: y,
                        text: this.scale2.labels[i],
                        valign: 'center',
                        halign: 'right',
                        tag: 'scale'
                    });
                }
                if (prop['chart.scale.zerostart'] || prop['chart.ymin'] !== 0) {
                    RG.text2(co, {
                        x: this.gutterLeft - 5 + offsetx,
                        y: this.getYCoord(prop['chart.ymin'] || 0),
                        text: RG.numberFormat(this, String(Number(prop['chart.ymin'] || 0).toFixed(prop['chart.ymin'] === 0 ? 0 : prop['chart.scale.decimals'])), prop['chart.units.pre'], prop['chart.units.post']),
                        font: font,
                        size: size,
                        valign: 'center',
                        halign: 'right',
                        tag: 'scale'
                    });
                }
            }
        }
        if (prop['chart.labels'].length > 0) {
            interval = (ca.width - this.gutterLeft - this.gutterRight) / prop['chart.labels'].length;
            var halign = 'center';
            var angle = prop['chart.text.angle'];
            if (angle) {
                halign = 'right';
                angle *= -1;
            }
            var labels = prop['chart.labels'], labelsColor = prop['chart.labels.color'],
                bold = prop['chart.labels.bold'], offsetx = prop['chart.labels.offsetx'],
                offsety = prop['chart.labels.offsety']
            for (var i = 0, len = labels.length; i < len; i += 1) {
                RG.text2(this, {
                    'color': labelsColor,
                    'font': font,
                    'size': size,
                    'bold': bold,
                    'x': this.gutterLeft + (i * interval) + (interval / 2) + offsetx,
                    'y': ca.height - this.gutterBottom + 5 + this.halfTextHeight + offsety,
                    'text': labels[i],
                    'valign': 'center',
                    'halign': halign,
                    'angle': angle,
                    'tag': 'labels'
                });
            }
        }
        co.stroke();
        co.fill();
    };
    this.drawbars = this.Drawbars = function () {
        var context = co, canvas = ca, hmargin = prop['chart.hmargin'], runningTotal = 0;
        co.lineWidth = prop['chart.linewidth'] + 0.001;
        for (var i = 0, len = this.data.length; i < len; ++i) {
            co.beginPath();
            co.strokeStyle = prop['chart.strokestyle'];
            var x = ma.round(this.gutterLeft + hmargin + (((this.graphwidth / (this.data.length + (prop['chart.total'] ? 1 : 0))) * i) * prop['chart.multiplier.x']));
            var h = this.getYCoord(0) - this.getYCoord(ma.abs(this.data[i]));
            if (i === 0) {
                y = this.getYCoord(0) - h;
            } else {
                y = this.getYCoord(runningTotal) - h;
            }
            y = ma.round(y);
            var w = ((ca.width - this.gutterLeft - this.gutterRight) / (this.data.length + (prop['chart.total'] ? 1 : 0))) - (2 * prop['chart.hmargin']);
            w = w * prop['chart.multiplier.w'];
            if (this.data[i] < 0) {
                y += h;
            }
            co.fillStyle = this.data[i] >= 0 ? prop['chart.colors'][0] : prop['chart.colors'][1];
            if (prop['chart.shadow']) {
                RG.setShadow(this, prop['chart.shadow.color'], prop['chart.shadow.offsetx'], prop['chart.shadow.offsety'], prop['chart.shadow.blur']);
            } else {
                RG.noShadow(this);
            }
            co.rect(x, ma.floor(y), w, ma.floor(h));
            this.coords.push([x, y, w, h]);
            runningTotal += this.data[i];
            co.stroke();
            co.fill();
        }
        this.total = runningTotal;
        if (prop['chart.total']) {
            h = this.getYCoord(0) - this.getYCoord(ma.abs(runningTotal));
            if (prop['chart.xaxispos'] == 'center') {
                y = runningTotal > 0 ? this.getYCoord(0) - h : this.getYCoord(0);
            } else {
                if (runningTotal > 0) {
                    y = this.getYCoord(0) - h;
                } else {
                    y = this.getYCoord(0);
                }
            }
            x = x + (prop['chart.hmargin'] * 2) + w;
            co.fillStyle = prop['chart.colors'][2];
            pa2(co, 'b r % % % % s % f %', x, y, w, h, co.strokeStyle, co.fillStyle);
            var previousCoords = [x, y, w, ma.abs(h)];
            this.coords.push(previousCoords);
        }
        RG.noShadow(this);
        co.lineWidth = 1;
        co.strokeStyle = '#666';
        co.beginPath();
        for (var i = 1, len = this.coords.length; i < len; i += 1) {
            var prev = this.coords[i - 1], curr = this.coords[i], prevData = this.data[i - 1]
            var y = (prevData > 0 ? prev[1] : prev[1] + prev[3]);
            co.moveTo(prev[0] + prev[2], y);
            co.lineTo(curr[0], (prevData > 0 ? prev[1] : prev[1] + prev[3]));
        }
        co.stroke();
    };
    this.getShape = this.getBar = function (e) {
        for (var i = 0, len = this.coords.length; i < len; i++) {
            var mouseXY = RG.getMouseXY(e), mouseX = mouseXY[0], mouseY = mouseXY[1];
            var left = this.coords[i][0], top = this.coords[i][1], width = this.coords[i][2],
                height = this.coords[i][3];
            if (mouseX >= left && mouseX <= (left + width) && mouseY >= top && mouseY <= top + height) {
                var tooltip = RG.parseTooltipText(prop['chart.tooltips'], i);
                return {
                    0: this,
                    object: this,
                    1: left,
                    x: left,
                    2: top,
                    y: top,
                    3: width,
                    width: width,
                    4: height,
                    height: height,
                    5: i,
                    index: i,
                    tooltip: tooltip
                };
            }
        }
        return null;
    };
    this.getMax = function (data) {
        var runningTotal = 0, max = 0;
        for (var i = 0, len = data.length; i < len; i += 1) {
            runningTotal += data[i];
            max = ma.max(ma.abs(runningTotal), max);
        }
        return ma.abs(max);
    };
    this.allowTooltips = this.AllowTooltips = function () {
        RG.PreLoadTooltipImages(this);
        RG.InstallWindowMousedownTooltipListener(this);
        RG.InstallCanvasMousemoveTooltipListener(this);
        RG.InstallCanvasMouseupTooltipListener(this);
    };
    this.highlight = this.Highlight = function (shape) {
        if (typeof prop['chart.highlight.style'] === 'function') {
            (prop['chart.highlight.style'])(shape);
        } else {
            RG.Highlight.Rect(this, shape);
        }
    };
    this.getObjectByXY = function (e) {
        var mouseXY = RG.getMouseXY(e);
        if (mouseXY[0] > this.gutterLeft && mouseXY[0] < (ca.width - this.gutterRight) && mouseXY[1] > this.gutterTop && mouseXY[1] < (ca.height - this.gutterBottom)) {
            return this;
        }
    };
    this.getYCoord = function (value) {
        if (prop['chart.xaxispos'] == 'center') {
            if (value < (-1 * this.max)) {
                return null;
            }
            var coord = (value / this.max) * (this.grapharea / 2);
            return this.gutterTop + (this.grapharea / 2) - coord;
        } else {
            var coord = ((value - this.scale2.min) / (this.max - this.scale2.min)) * this.grapharea;
            coord = coord + this.gutterBottom;
            return ca.height - coord;
        }
    };
    this.parseColors = function () {
        if (this.original_colors.length === 0) {
            this.original_colors['chart.colors'] = RG.array_clone(prop['chart.colors']);
            this.original_colors['chart.key.colors'] = RG.array_clone(prop['chart.key.colors']);
            this.original_colors['chart.crosshairs.color'] = RG.array_clone(prop['chart.crosshairs.color']);
            this.original_colors['chart.highlight.stroke'] = RG.array_clone(prop['chart.highlight.stroke']);
            this.original_colors['chart.highlight.fill'] = RG.array_clone(prop['chart.highlight.fill']);
            this.original_colors['chart.background.barcolor1'] = RG.array_clone(prop['chart.background.barcolor1']);
            this.original_colors['chart.background.barcolor2'] = RG.array_clone(prop['chart.background.barcolor2']);
            this.original_colors['chart.background.grid.color'] = RG.array_clone(prop['chart.background.grid.color']);
            this.original_colors['chart.strokestyle'] = RG.array_clone(prop['chart.strokestyle']);
            this.original_colors['chart.axis.color'] = RG.array_clone(prop['chart.axis.color']);
        }
        var colors = prop['chart.colors'];
        if (colors) {
            for (var i = 0, len = colors.length; i < len; ++i) {
                colors[i] = this.parseSingleColorForGradient(colors[i]);
            }
        }
        var colors = prop['chart.key.colors'];
        if (colors) {
            for (var i = 0, len = colors.length; i < len; ++i) {
                colors[i] = this.parseSingleColorForGradient(colors[i]);
            }
        }
        prop['chart.crosshairs.color'] = this.parseSingleColorForGradient(prop['chart.crosshairs.color']);
        prop['chart.highlight.stroke'] = this.parseSingleColorForGradient(prop['chart.highlight.stroke']);
        prop['chart.highlight.fill'] = this.parseSingleColorForGradient(prop['chart.highlight.fill']);
        prop['chart.background.barcolor1'] = this.parseSingleColorForGradient(prop['chart.background.barcolor1']);
        prop['chart.background.barcolor2'] = this.parseSingleColorForGradient(prop['chart.background.barcolor2']);
        prop['chart.background.grid.color'] = this.parseSingleColorForGradient(prop['chart.background.grid.color']);
        prop['chart.strokestyle'] = this.parseSingleColorForGradient(prop['chart.strokestyle']);
        prop['chart.axis.color'] = this.parseSingleColorForGradient(prop['chart.axis.color']);
    };
    this.reset = function () {
    };
    this.parseSingleColorForGradient = function (color) {
        if (!color || typeof color != 'string') {
            return color;
        }
        if (typeof color === 'string' && color.match(/^gradient\((.*)\)$/i)) {
            var parts = RegExp.$1.split(':');
            var grad = co.createLinearGradient(0, ca.height - prop['chart.gutter.bottom'], 0, prop['chart.gutter.top']);
            var diff = 1 / (parts.length - 1);
            grad.addColorStop(0, RG.trim(parts[0]));
            for (var j = 1, len = parts.length; j < len; ++j) {
                grad.addColorStop(j * diff, RG.trim(parts[j]));
            }
        }
        return grad ? grad : color;
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
    this.grow = function () {
        var opt = arguments[0] || {};
        var callback = arguments[1] || function () {
            };
        var frames = opt.frames || 30;
        var numFrame = 0;
        var obj = this;
        var data = RG.array_clone(obj.data);
        for (var i = 0, len = obj.data.length; i < len; ++i) {
            obj.data[i] /= frames;
        }
        if (obj.Get('chart.ymax') == null) {
            var max = obj.getMax(data);
            var scale2 = RG.getScale2(obj, {'max': max});
            obj.Set('chart.ymax', scale2.max);
        }
        function iterator() {
            for (var i = 0; i < obj.data.length; ++i) {
                obj.data[i] = data[i] * RG.Effects.getEasingMultiplier(frames, numFrame);
            }
            RGraph.clear(obj.canvas);
            RGraph.redrawCanvas(obj.canvas);
            if (++numFrame < frames) {
                RGraph.Effects.updateCanvas(iterator);
            } else {
                callback(obj);
            }
        }

        iterator();
        return this;
    };
    RG.att(ca);
    RG.Register(this);
    if (parseConfObjectForOptions) {
        RG.parseObjectStyleConfig(this, conf.options);
    }
    return this;
};