RGraph = window.RGraph || {isRGraph: true};
RGraph.SVG = RGraph.SVG || {};
(function (win, doc, undefined) {
    var RG = RGraph, ua = navigator.userAgent, ma = Math, win = window, doc = document;
    RG.SVG.Scatter = function (conf) {
        this.set = function (name, value) {
            if (arguments.length === 1 && typeof name === 'object') {
                for (i in arguments[0]) {
                    if (typeof i === 'string') {
                        var ret = RG.SVG.commonSetter({object: this, name: i, value: arguments[0][i]});
                        name = ret.name;
                        value = ret.value;
                        this.set(name, value);
                    }
                }
            } else {
                var ret = RG.SVG.commonSetter({object: this, name: name, value: value});
                name = ret.name;
                value = ret.value;
                this.properties[name] = value;
            }
            return this;
        };
        this.id = conf.id;
        this.uid = RG.SVG.createUID();
        this.container = document.getElementById(this.id);
        this.svg = RG.SVG.createSVG({container: this.container});
        this.isRGraph = true;
        this.width = Number(this.svg.getAttribute('width'));
        this.height = Number(this.svg.getAttribute('height'));
        this.data = conf.data;
        this.type = 'scatter';
        this.coords = [];
        this.colorsParsed = false;
        this.originalColors = {};
        this.gradientCounter = 1;
        this.sequential = 0;
        RG.SVG.OR.add(this);
        this.container.style.display = 'inline-block';
        this.properties = {
            gutterLeft: 35,
            gutterRight: 35,
            gutterTop: 35,
            gutterBottom: 35,
            backgroundColor: null,
            backgroundImage: null,
            backgroundImageAspect: 'none',
            backgroundImageStretch: true,
            backgroundImageOpacity: null,
            backgroundImageX: null,
            backgroundImageY: null,
            backgroundImageW: null,
            backgroundImageH: null,
            backgroundGrid: true,
            backgroundGridColor: '#ddd',
            backgroundGridLinewidth: 1,
            backgroundGridHlines: true,
            backgroundGridHlinesCount: null,
            backgroundGridVlines: true,
            backgroundGridVlinesCount: null,
            backgroundGridBorder: true,
            xmax: 0,
            tickmarksStyle: 'cross',
            tickmarksSize: 7,
            colors: ['black'],
            line: false,
            lineColors: 1,
            lineLinewidth: 'black',
            yaxis: true,
            yaxisTickmarks: true,
            yaxisTickmarksLength: 3,
            yaxisColor: 'black',
            yaxisScale: true,
            yaxisLabels: null,
            yaxisLabelsOffsetx: 0,
            yaxisLabelsOffsety: 0,
            yaxisLabelsCount: 5,
            yaxisUnitsPre: '',
            yaxisUnitsPost: '',
            yaxisStrict: false,
            yaxisDecimals: 0,
            yaxisPoint: '.',
            yaxisThousand: ',',
            yaxisRound: false,
            yaxisMax: null,
            yaxisMin: 0,
            yaxisFormatter: null,
            xaxis: true,
            xaxisTickmarks: true,
            xaxisTickmarksLength: 5,
            xaxisLabels: null,
            xaxisLabelsPosition: 'section',
            xaxisLabelsPositionEdgeTickmarksCount: null,
            xaxisColor: 'black',
            xaxisLabelsOffsetx: 0,
            xaxisLabelsOffsety: 0,
            xaxisMin: 0,
            xaxisMax: null,
            textColor: 'black',
            textFont: 'sans-serif',
            textSize: 12,
            textBold: false,
            textItalic: false,
            tooltipsOverride: null,
            tooltipsEffect: 'fade',
            tooltipsCssClass: 'RGraph_tooltip',
            tooltipsEvent: 'mousemove',
            highlightStroke: 'rgba(0,0,0,0)',
            highlightFill: 'rgba(255,255,255,0.7)',
            highlightLinewidth: 1,
            title: '',
            titleSize: 16,
            titleX: null,
            titleY: null,
            titleHalign: 'center',
            titleValign: null,
            titleColor: 'black',
            titleFont: null,
            titleBold: false,
            titleItalic: false,
            titleSubtitle: '',
            titleSubtitleSize: 10,
            titleSubtitleX: null,
            titleSubtitleY: null,
            titleSubtitleHalign: 'center',
            titleSubtitleValign: null,
            titleSubtitleColor: '#aaa',
            titleSubtitleFont: null,
            titleSubtitleBold: false,
            titleSubtitleItalic: false,
            attribution: true,
            attributionX: null,
            attributionY: null,
            attributionHref: null,
            attributionHalign: 'right',
            attributionValign: 'bottom',
            attributionSize: 7,
            attributionColor: 'gray',
            attributionFont: 'sans-serif',
            attributionItalic: false,
            attributionBold: false
        };
        for (i in conf.options) {
            if (typeof i === 'string') {
                this.set(i, conf.options[i]);
            }
        }
        if (this.data[0] && !RG.SVG.isArray(this.data[0])) {
            this.data = [];
            this.data[0] = conf.data;
        }
        if (RG.SVG.FX && typeof RG.SVG.FX.decorate === 'function') {
            RG.SVG.FX.decorate(this);
        }
        var prop = this.properties;
        if (typeof prop.xaxisMin === 'string') {
            prop.xaxisMin = RG.SVG.parseDate(prop.xaxisMin);
        }
        if (typeof prop.xaxisMax === 'string') {
            prop.xaxisMax = RG.SVG.parseDate(prop.xaxisMax);
        }
        for (var i = 0; i < this.data.length; ++i) {
            for (var j = 0; j < this.data[i].length; ++j) {
                if (typeof this.data[i][j].x === 'string') {
                    this.data[i][j].x = RG.SVG.parseDate(this.data[i][j].x);
                }
            }
        }
        this.draw = function () {
            RG.SVG.fireCustomEvent(this, 'onbeforedraw');
            RG.SVG.createDefs(this);
            this.graphWidth = this.width - prop.gutterLeft - prop.gutterRight;
            this.graphHeight = this.height - prop.gutterTop - prop.gutterBottom;
            if (!this.colorsParsed) {
                this.parseColors();
                this.colorsParsed = true;
            }
            for (var ds = 0, max = 0; ds < this.data.length; ++ds) {
                for (var dp = 0; dp < this.data[ds].length; ++dp) {
                    max = ma.max(max, this.data[ds][dp].y);
                }
            }
            if (typeof prop.yaxisMax === 'number') {
                max = prop.yaxisMax;
            }
            if (prop.yaxisMin === 'mirror' || prop.yaxisMin === 'middle' || prop.yaxisMin === 'center') {
                var mirrorScale = true;
                prop.yaxisMin = 0;
            }
            this.scale = RG.SVG.getScale({
                object: this,
                numlabels: prop.yaxisLabelsCount,
                unitsPre: prop.yaxisUnitsPre,
                unitsPost: prop.yaxisUnitsPost,
                max: max,
                min: prop.yaxisMin,
                point: prop.yaxisPoint,
                round: prop.yaxisRound,
                thousand: prop.yaxisThousand,
                decimals: prop.yaxisDecimals,
                strict: typeof prop.yaxisMax === 'number',
                formatter: prop.yaxisFormatter
            });
            if (mirrorScale) {
                this.scale = RG.SVG.getScale({
                    object: this,
                    numlabels: prop.yaxisLabelsCount,
                    unitsPre: prop.yaxisUnitsPre,
                    unitsPost: prop.yaxisUnitsPost,
                    max: this.scale.max,
                    min: this.scale.max * -1,
                    point: prop.yaxisPoint,
                    round: false,
                    thousand: prop.yaxisThousand,
                    decimals: prop.yaxisDecimals,
                    strict: typeof prop.yaxisMax === 'number',
                    formatter: prop.yaxisFormatter
                });
            }
            this.max = this.scale.max;
            this.min = this.scale.min;
            prop.yaxisMax = this.scale.max;
            prop.yaxisMin = this.scale.min;
            RG.SVG.drawBackground(this);
            RG.SVG.drawXAxis(this);
            RG.SVG.drawYAxis(this);
            var dataset_group = RGraph.SVG.create({
                svg: this.svg,
                type: 'g',
                attr: {className: 'scatter_datasets_' + this.uid}
            });
            for (var i = 0; i < this.data.length; ++i) {
                this.drawPoints({index: i, data: this.data[i], group: dataset_group});
                if (prop.line == true || (typeof prop.line === 'object' && prop.line[i] == true)) {
                    this.drawLine({index: i, coords: this.coords[i]});
                }
            }
            RG.SVG.attribution(this);
            RG.SVG.fireCustomEvent(this, 'ondraw');
            return this;
        };
        this.drawPoints = function (opt) {
            var index = opt.index, data = opt.data, group = opt.group;
            this.coords[index] = [];
            var group = RG.SVG.create({
                svg: this.svg,
                type: 'g',
                parent: group,
                attr: {className: 'scatter_dataset_' + index + '_' + this.uid}
            });
            for (var i = 0; i < data.length; ++i) {
                var point = data[i];
                if (typeof point.x === 'number' && typeof point.y === 'number') {
                    var ret = this.drawSinglePoint({
                        dataset: data,
                        datasetIdx: index,
                        point: point,
                        index: i,
                        group: group,
                        sequential: this.sequential++
                    });
                    this.coords[index][i] = [ret.x, ret.y];
                }
                if ((typeof data[i].tooltip === 'string' && data[i].tooltip) || (typeof data[i].tooltip === 'number')) {
                    data[i].tooltip = String(data[i].tooltip);
                    if (prop.tooltipsEvent !== 'mousemove') {
                        prop.tooltipsEvent = 'click';
                    }
                    if (!group_tooltip_hotspots) {
                        var group_tooltip_hotspots = RG.SVG.create({
                            svg: this.svg,
                            type: 'g',
                            attr: {className: 'rgraph-scatter-tooltip-hotspots'}
                        });
                    }
                    var rect = RG.SVG.create({
                        svg: this.svg,
                        type: 'rect',
                        parent: group_tooltip_hotspots,
                        attr: {
                            x: ret.x - (ret.size / 2),
                            y: ret.y - (ret.size / 2),
                            width: ret.size,
                            height: ret.size,
                            fill: 'transparent',
                            stroke: 'transparent',
                            'stroke-width': 0
                        },
                        style: {cursor: 'pointer'}
                    });
                    ret.mark.hotspot = rect;
                    (function (dataset, index, seq, obj) {
                        rect.addEventListener(prop.tooltipsEvent, function (e) {
                            var tooltip = RG.SVG.REG.get('tooltip');
                            if (tooltip && tooltip.__dataset__ === dataset && tooltip.__index__ === index) {
                                return;
                            }
                            obj.removeHighlight();
                            RG.SVG.tooltip({
                                object: obj,
                                dataset: dataset,
                                index: index,
                                sequentialIndex: seq,
                                text: obj.data[dataset][index].tooltip,
                                event: e
                            });
                            if (RG.SVG.REG.get('tooltip')) {
                                obj.highlight(this);
                            }
                        }, false);
                        if (prop.tooltipsEvent === 'click') {
                            rect.addEventListener('mousemove', function (e) {
                                e.target.style.cursor = 'pointer';
                            }, false);
                        }
                    }(index, i, this.sequential - 1, this));
                }
            }
        };
        this.drawSinglePoint = function (opt) {
            var dataset = opt.dataset, datasetIdx = opt.datasetIdx, seq = opt.sequential, point = opt.point,
                index = opt.index, valueX = opt.point.x, valueY = opt.point.y, conf = opt.point || {},
                group = opt.group, coordX = this.getXCoord(valueX), coordY = this.getYCoord(valueY);
            if (typeof conf.type === 'undefined' && typeof conf.shape !== 'undefined') {
                conf.type = conf.shape;
            }
            if (typeof conf.type === 'string') {
            } else if (typeof prop.tickmarksStyle === 'string') {
                conf.type = prop.tickmarksStyle;
            } else if (typeof prop.tickmarksStyle === 'object' && typeof prop.tickmarksStyle[datasetIdx] === 'string') {
                conf.type = prop.tickmarksStyle[datasetIdx];
            }
            if (typeof conf.size !== 'number' && typeof prop.tickmarksSize === 'number') {
                conf.size = prop.tickmarksSize;
            } else if (typeof conf.size !== 'number' && typeof prop.tickmarksSize === 'object' && typeof prop.tickmarksSize[datasetIdx] === 'number') {
                conf.size = prop.tickmarksSize[datasetIdx];
            }
            if (typeof conf.color === 'string') {
            } else if (typeof prop.colors[datasetIdx] === 'string') {
                conf.color = prop.colors[datasetIdx];
            } else {
                conf.color = 'black';
            }
            if (typeof conf.opacity === 'undefined') {
                conf.opacity = 1;
            } else if (typeof conf.opacity === 'number') {
            }
            switch (conf.type) {
                case'image:' + conf.type.substr(6):
                    var src = conf.type.substr(6);
                    var img = new Image();
                    img.src = src;
                    var mark = RG.SVG.create({
                        svg: this.svg,
                        type: 'image',
                        parent: group,
                        attr: {preserveAspectRatio: 'xMidYMid meet', 'xlink:href': src}
                    });
                    img.onload = function () {
                        var x = coordX - (img.width / 2), y = coordY - (img.height / 2), w = img.width, h = img.height;
                        mark.setAttribute('x', x);
                        mark.setAttribute('y', y);
                        mark.setAttribute('width', w);
                        mark.setAttribute('height', h);
                        if (mark && mark.hotspot) {
                            mark.hotspot.setAttribute('x', x);
                            mark.hotspot.setAttribute('y', y);
                            mark.hotspot.setAttribute('width', w);
                            mark.hotspot.setAttribute('height', h);
                        }
                    };
                    break;
                case'triangle':
                    var mark = RG.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: 'M {1} {2} L {3} {4} L {5} {6}'.format(coordX - (conf.size / 2), coordY + (conf.size / 2), coordX, coordY - (conf.size / 2), coordX + (conf.size / 2), coordY + (conf.size / 2)),
                            fill: conf.color,
                            'fill-opacity': conf.opacity
                        }
                    });
                    break;
                case'plus':
                    var mark = RG.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: 'M {1} {2} L {3} {4} M {5} {6} L {7} {8}'.format(coordX - (conf.size / 2), coordY, coordX + (conf.size / 2), coordY, coordX, coordY - (conf.size / 2), coordX, coordY + (conf.size / 2)),
                            stroke: conf.color,
                            'stroke-opacity': conf.opacity
                        }
                    });
                    break;
                case'square':
                case'rect':
                    var mark = RG.SVG.create({
                        svg: this.svg,
                        type: 'rect',
                        parent: group,
                        attr: {
                            x: coordX - (conf.size / 2),
                            y: coordY - (conf.size / 2),
                            width: conf.size,
                            height: conf.size,
                            fill: conf.color,
                            'fill-opacity': conf.opacity
                        }
                    });
                    break;
                case'dot':
                case'circle':
                    var mark = RG.SVG.create({
                        svg: this.svg,
                        type: 'circle',
                        parent: group,
                        attr: {cx: coordX, cy: coordY, r: conf.size / 2, fill: conf.color, 'fill-opacity': conf.opacity}
                    });
                    break;
                case'cross':
                default:
                    var mark = RG.SVG.create({
                        svg: this.svg,
                        type: 'path',
                        parent: group,
                        attr: {
                            d: 'M {1} {2} L {3} {4} M {5} {6} L {7} {8}'.format(coordX - (conf.size / 2), coordY - (conf.size / 2), coordX + (conf.size / 2), coordY + (conf.size / 2), coordX - (conf.size / 2), coordY + (conf.size / 2), coordX + (conf.size / 2), coordY - (conf.size / 2)),
                            stroke: conf.color,
                            'stroke-opacity': conf.opacity
                        }
                    });
                    break;
            }
            mark.setAttribute('data-index', index);
            mark.setAttribute('data-dataset', datasetIdx);
            mark.setAttribute('data-original-opacity', conf.opacity);
            mark.setAttribute('data-original-color', conf.color);
            mark.setAttribute('data-original-coordx', coordX);
            mark.setAttribute('data-original-coordy', coordY);
            mark.setAttribute('data-size', conf.size);
            mark.setAttribute('data-sequential', seq);
            mark.setAttribute('data-type', conf.type);
            return {
                x: coordX,
                y: coordY,
                size: conf.type.substr(0, 6) === 'image:' ? img.width : conf.size,
                mark: mark,
                type: conf.type
            };
        };
        this.drawLine = function (opt) {
            var linewidth = 1, color = 'black';
            if (typeof prop.lineLinewidth === 'object' && typeof prop.lineLinewidth[opt.index] === 'number') {
                linewidth = prop.lineLinewidth[opt.index];
            } else if (typeof prop.lineLinewidth === 'number') {
                linewidth = prop.lineLinewidth;
            } else {
                linewidth = 1;
            }
            if (typeof prop.lineColors === 'object' && prop.lineColors[opt.index]) {
                color = prop.lineColors[opt.index];
            } else if (prop.colors[opt.index] === 'string') {
                color = prop.colors[opt.index];
            } else {
                color = 'black';
            }
            for (var i = 0, path = ''; i < this.coords[opt.index].length; ++i) {
                path += '{1} {2} {3} '.format(i === 0 ? 'M' : 'L', this.coords[opt.index][i][0], this.coords[opt.index][i][1]);
            }
            RG.SVG.create({
                svg: this.svg,
                type: 'path',
                attr: {
                    d: path,
                    fill: 'transparent',
                    stroke: color,
                    'stroke-width': linewidth,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round'
                }
            });
        };
        this.getXCoord = function (value) {
            var x;
            if (value > prop.xaxisMax) {
                return null;
            }
            if (value < prop.xaxisMin) {
                return null;
            }
            x = ((value - prop.xaxisMin) / (prop.xaxisMax - prop.xaxisMin));
            x *= (this.width - prop.gutterLeft - prop.gutterRight);
            x = prop.gutterLeft + x;
            return x;
        };
        this.getYCoord = function (value) {
            var prop = this.properties;
            if (value > this.scale.max) {
                return null;
            }
            var y, xaxispos = prop.xaxispos;
            if (value < this.scale.min) {
                return null;
            }
            y = ((value - this.scale.min) / (this.scale.max - this.scale.min));
            y *= (this.height - prop.gutterTop - prop.gutterBottom);
            y = this.height - prop.gutterBottom - y;
            return y;
        };
        this.highlight = function (rect) {
            rect.setAttribute('fill', prop.highlightFill);
            RG.SVG.REG.set('highlight', rect);
        };
        this.parseColors = function () {
            if (!Object.keys(this.originalColors).length) {
                this.originalColors = {
                    colors: RG.SVG.arrayClone(prop.colors),
                    backgroundGridColor: RG.SVG.arrayClone(prop.backgroundGridColor),
                    highlightFill: RG.SVG.arrayClone(prop.highlightFill),
                    backgroundColor: RG.SVG.arrayClone(prop.backgroundColor)
                }
            }
            var colors = prop.colors;
            if (colors) {
                for (var i = 0; i < colors.length; ++i) {
                    colors[i] = RG.SVG.parseColorLinear({object: this, color: colors[i]});
                }
            }
            prop.backgroundGridColor = RG.SVG.parseColorLinear({object: this, color: prop.backgroundGridColor});
            prop.highlightFill = RG.SVG.parseColorLinear({object: this, color: prop.highlightFill});
            prop.backgroundColor = RG.SVG.parseColorLinear({object: this, color: prop.backgroundColor});
        };
        this.on = function (type, func) {
            if (type.substr(0, 2) !== 'on') {
                type = 'on' + type;
            }
            RG.SVG.addCustomEventListener(this, type, func);
            return this;
        };
        this.exec = function (func) {
            func(this);
            return this;
        };
        this.removeHighlight = function () {
            var highlight = RG.SVG.REG.get('highlight');
            if (highlight) {
                highlight.setAttribute('fill', 'transparent');
                RG.SVG.REG.set('highlight', null);
            }
        };
    };
    return this;
})(window, document);