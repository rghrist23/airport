RGraph = window.RGraph || {isRGraph: true};
(function (win, doc, undefined) {
    var RG = RGraph, ua = navigator.userAgent, ma = Math;
    RG.contextmenu = RG.Contextmenu = function (obj, menuitems, e) {
        var canvas = obj.canvas;
        e = RG.FixEventObject(e);
        RG.FireCustomEvent(obj, 'onbeforecontextmenu');
        if (RG.Registry.Get('chart.contextmenu')) {
            RG.HideContext();
        }
        RG.HideZoomedCanvas();
        RG.HidePalette();
        obj.Set('chart.mousedown', false);
        var x = e.pageX;
        var y = e.pageY;
        var div = document.createElement('div');
        var bg = document.createElement('div');
        div.className = 'RGraph_contextmenu';
        div.__canvas__ = canvas;
        div.style.position = 'absolute';
        div.style.left = 0;
        div.style.top = 0;
        div.style.border = '1px solid #666';
        div.style.backgroundColor = 'white';
        div.style.boxShadow = '1px 1px 3px #ddd';
        div.style.MozBoxShadow = '1px 1px 3px #ddd';
        div.style.WebkitBoxShadow = '1px 1px 3px #ddd';
        div.style.opacity = 0;
        bg.className = 'RGraph_contextmenu_background';
        bg.style.position = 'absolute';
        bg.style.backgroundColor = '#ccc';
        bg.style.borderRight = '1px solid #aaa';
        bg.style.top = 0;
        bg.style.left = 0;
        bg.style.width = '18px';
        bg.style.height = '100%';
        bg.style.opacity = 0;
        div = document.body.appendChild(div);
        bg = div.appendChild(bg);
        for (i = 0; i < menuitems.length; ++i) {
            var menuitem = document.createElement('div');
            menuitem.__object__ = obj;
            menuitem.__canvas__ = canvas;
            menuitem.__contextmenu__ = div;
            menuitem.className = 'RGraph_contextmenu_item';
            if (menuitems[i]) {
                menuitem.style.padding = '2px 5px 2px 23px';
                menuitem.style.fontFamily = 'Arial';
                menuitem.style.fontSize = '10pt';
                menuitem.style.textAlign = 'left';
                menuitem.style.fontWeight = 'normal';
                menuitem.innerHTML = menuitems[i][0];
                if (RG.is_array(menuitems[i][1])) {
                    menuitem.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAQUlEQVQImY3NoQ2AMABE0ZewABMyGQ6mqWODzlAclBSFO8HZl8uf0FFxCHtwYkt4Y6ChYE44cGH9/fyae2p2LAleW9oVTQuVf6gAAAAASUVORK5CYII=)';
                    menuitem.style.backgroundRepeat = 'no-repeat';
                    menuitem.style.backgroundPosition = '97% center';
                }
                if (menuitems[i][1]) {
                    if (menuitem.addEventListener) {
                        menuitem.addEventListener("mouseover", function (e) {
                            RG.HideContextSubmenu();
                            e.target.style.backgroundColor = 'rgba(0,0,0,0.2)';
                            e.target.style.cursor = 'pointer';
                        }, false);
                        menuitem.addEventListener("mouseout", function (e) {
                            e.target.style.backgroundColor = 'inherit';
                            e.target.style.cursor = 'default';
                        }, false);
                    } else {
                        menuitem.attachEvent("onmouseover", function () {
                            RG.HideContextSubmenu();
                            event.srcElement.style.backgroundColor = '#eee';
                            event.srcElement.style.cursor = 'pointer';
                        }, false);
                        menuitem.attachEvent("onmouseout", function () {
                            event.srcElement.style.backgroundColor = 'inherit';
                            event.srcElement.style.cursor = 'default';
                        }, false);
                    }
                } else {
                    if (menuitem.addEventListener) {
                        menuitem.addEventListener("mouseover", function (e) {
                            e.target.style.cursor = 'default';
                        }, false);
                        menuitem.addEventListener("mouseout", function (e) {
                            e.target.style.cursor = 'default';
                        }, false);
                    } else {
                        menuitem.attachEvent("onmouseover", function () {
                            event.srcElement.style.cursor = 'default'
                        }, false);
                        menuitem.attachEvent("onmouseout", function () {
                            event.srcElement.style.cursor = 'default';
                        }, false);
                    }
                }
            } else {
                menuitem.style.borderBottom = '1px solid #ddd';
                menuitem.style.marginLeft = '25px';
            }
            div.appendChild(menuitem);
            if (menuitems[i] && menuitems[i][1] && typeof(menuitems[i][1]) == 'function') {
                menuitem.addEventListener('click', menuitems[i][1], false);
            } else if (menuitems[i] && menuitems[i][1] && RG.is_array(menuitems[i][1])) {
                (function () {
                    var tmp = menuitems[i][1];
                    menuitem.addEventListener('mouseover', function (e) {
                        RG.Contextmenu_submenu(obj, tmp, e.target);
                    }, false);
                })();
            }
        }
        div.style.width = (div.offsetWidth + 10) + 'px';
        div.style.height = (div.offsetHeight - 2) + 'px';
        if (x + div.offsetWidth > document.body.offsetWidth) {
            x -= div.offsetWidth;
        }
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu')) obj.style.opacity = 0.2", 50);
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu')) obj.style.opacity = 0.4", 100);
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu')) obj.style.opacity = 0.6", 150);
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu')) obj.style.opacity = 0.8", 200);
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu')) obj.style.opacity = 1", 250);
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu.bg')) obj.style.opacity = 0.2", 50);
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu.bg')) obj.style.opacity = 0.4", 100);
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu.bg')) obj.style.opacity = 0.6", 150);
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu.bg')) obj.style.opacity = 0.8", 200);
        setTimeout("if (obj = RGraph.Registry.Get('chart.contextmenu.bg')) obj.style.opacity = 1", 250);
        RG.Registry.Set('chart.contextmenu', div);
        RG.Registry.Set('chart.contextmenu.bg', bg);
        RG.Registry.Get('chart.contextmenu').oncontextmenu = function () {
            return false;
        };
        RG.Registry.Get('chart.contextmenu.bg').oncontextmenu = function () {
            return false;
        };
        canvas.addEventListener('click', function () {
            RG.HideContext();
        }, false);
        window.addEventListener('click', function () {
            RG.HideContext();
        }, false);
        window.addEventListener('resize', function () {
            RG.HideContext();
        }, false);
        if (typeof(obj.getShape) == 'function') {
            RG.Registry.Get('chart.contextmenu').__shape__ = obj.getShape(e);
        }
        e.stopPropagation();
        RG.FireCustomEvent(obj, 'oncontextmenu');
        return false;
    };
    RG.hideContext = RG.HideContext = function () {
        var cm = RG.Registry.Get('chart.contextmenu');
        var cmbg = RG.Registry.Get('chart.contextmenu.bg');
        RG.HideContextSubmenu();
        if (cm) {
            cm.parentNode.removeChild(cm);
            cmbg.parentNode.removeChild(cmbg);
            cm.style.visibility = 'hidden';
            cm.style.display = 'none';
            RG.Registry.Set('chart.contextmenu', null);
            cmbg.style.visibility = 'hidden';
            cmbg.style.display = 'none';
            RG.Registry.Set('chart.contextmenu.bg', null);
        }
    };
    RG.hideContextSubmenu = RG.HideContextSubmenu = function () {
        var sub = RG.Registry.Get('chart.contextmenu.submenu');
        if (sub) {
            sub.style.visibility = 'none';
            sub.style.display = 'none';
            RG.Registry.Set('chart.contextmenu.submenu', null);
        }
    };
    RG.showContext = RG.ShowContext = function (obj) {
        RG.HidePalette();
        if (obj.Get('chart.contextmenu') && obj.Get('chart.contextmenu').length) {
            var isOpera = navigator.userAgent.indexOf('Opera') >= 0;
            var isSafari = navigator.userAgent.indexOf('Safari') >= 0;
            var isChrome = navigator.userAgent.indexOf('Chrome') >= 0;
            var isMacFirefox = navigator.userAgent.indexOf('Firefox') > 0 && navigator.userAgent.indexOf('Mac') > 0;
            var isIE9 = navigator.userAgent.indexOf('MSIE 9') >= 0;
            if (((!isOpera && !isSafari) || isChrome) && !isMacFirefox) {
                obj.canvas.oncontextmenu = function (e) {
                    e = RG.FixEventObject(e);
                    if (e.ctrlKey)return true;
                    RG.Contextmenu(obj, obj.Get('chart.contextmenu'), e);
                    return false;
                }
            } else {
                obj.canvas.addEventListener('dblclick', function (e) {
                    if (e.ctrlKey)return true;
                    if (!RG.Registry.Get('chart.contextmenu')) {
                        RG.Contextmenu(obj, obj.Get('chart.contextmenu'), e);
                    }
                }, false);
            }
        }
    };
    RG.contextmenu_submenu = RG.Contextmenu_submenu = function (obj, menuitems, parentMenuItem) {
        RG.HideContextSubmenu();
        var canvas = obj.canvas;
        var context = obj.context;
        var menu = parentMenuItem.parentNode;
        var subMenu = document.createElement('DIV');
        subMenu.style.position = 'absolute';
        subMenu.style.width = '100px';
        subMenu.style.top = menu.offsetTop + parentMenuItem.offsetTop + 'px';
        subMenu.style.left = (menu.offsetLeft + menu.offsetWidth - (RG.ISOLD ? 9 : 0)) + 'px';
        subMenu.style.backgroundColor = 'white';
        subMenu.style.border = '1px solid black';
        subMenu.className = 'RGraph_contextmenu';
        subMenu.__contextmenu__ = menu;
        subMenu.style.boxShadow = '3px 3px 3px rgba(96,96,96,0.5)';
        subMenu.style.MozBoxShadow = '3px 3px 3px rgba(96,96,96,0.5)';
        subMenu.style.WebkitBoxShadow = '3px 3px 3px rgba(96,96,96,0.5)';
        subMenu.style.filter = 'progid:DXImageTransform.Microsoft.Shadow(color=#aaaaaa,direction=135)';
        document.body.appendChild(subMenu);
        for (var i = 0; i < menuitems.length; ++i) {
            var menuitem = document.createElement('DIV');
            menuitem.__canvas__ = canvas;
            menuitem.__contextmenu__ = menu;
            menuitem.className = 'RGraph_contextmenu_item';
            if (menuitems[i]) {
                menuitem.style.padding = '2px 5px 2px 23px';
                menuitem.style.fontFamily = 'Arial';
                menuitem.style.fontSize = '10pt';
                menuitem.style.fontWeight = 'normal';
                menuitem.style.textAlign = 'left';
                menuitem.innerHTML = menuitems[i][0];
                if (menuitems[i][1]) {
                    if (menuitem.addEventListener) {
                        menuitem.addEventListener("mouseover", function (e) {
                            e.target.style.backgroundColor = 'rgba(0,0,0,0.2)';
                            e.target.style.cursor = 'pointer';
                        }, false);
                        menuitem.addEventListener("mouseout", function (e) {
                            e.target.style.backgroundColor = 'inherit';
                            e.target.style.cursor = 'default';
                        }, false);
                    } else {
                        menuitem.attachEvent("onmouseover", function () {
                            event.srcElement.style.backgroundColor = 'rgba(0,0,0,0.2)';
                            event.srcElement.style.cursor = 'pointer'
                        }, false);
                        menuitem.attachEvent("onmouseout", function () {
                            event.srcElement.style.backgroundColor = 'inherit';
                            event.srcElement.style.cursor = 'default';
                        }, false);
                    }
                } else {
                    if (menuitem.addEventListener) {
                        menuitem.addEventListener("mouseover", function (e) {
                            e.target.style.cursor = 'default';
                        }, false);
                        menuitem.addEventListener("mouseout", function (e) {
                            e.target.style.cursor = 'default';
                        }, false);
                    } else {
                        menuitem.attachEvent("onmouseover", function () {
                            event.srcElement.style.cursor = 'default'
                        }, false);
                        menuitem.attachEvent("onmouseout", function () {
                            event.srcElement.style.cursor = 'default';
                        }, false);
                    }
                }
            } else {
                menuitem.style.borderBottom = '1px solid #ddd';
                menuitem.style.marginLeft = '25px';
            }
            subMenu.appendChild(menuitem);
            if (menuitems[i] && menuitems[i][1]) {
                if (document.all) {
                    menuitem.attachEvent('onclick', menuitems[i][1]);
                } else {
                    menuitem.addEventListener('click', menuitems[i][1], false);
                }
            }
        }
        var bg = document.createElement('DIV');
        bg.className = 'RGraph_contextmenu_background';
        bg.style.position = 'absolute';
        bg.style.backgroundColor = '#ccc';
        bg.style.borderRight = '1px solid #aaa';
        bg.style.top = 0;
        bg.style.left = 0;
        bg.style.width = '18px';
        bg.style.height = '100%';
        bg = subMenu.appendChild(bg);
        RG.Registry.Set('chart.contextmenu.submenu', subMenu);
    };
    RG.showPNG = function () {
        if (RG.ISIE8) {
            alert('[RGRAPH PNG] Sorry, showing a PNG is not supported on MSIE8.');
            return;
        }
        if (arguments[0] && arguments[0].id) {
            var canvas = arguments[0];
            var event = arguments[1];
        } else if (RG.Registry.Get('chart.contextmenu')) {
            var canvas = RG.Registry.Get('chart.contextmenu').__canvas__;
        } else {
            alert('[RGRAPH SHOWPNG] Could not find canvas!');
        }
        var obj = canvas.__object__;
        var bg = document.createElement('DIV');
        bg.id = '__rgraph_image_bg__';
        bg.style.position = 'fixed';
        bg.style.top = '-10px';
        bg.style.left = '-10px';
        bg.style.width = '5000px';
        bg.style.height = '5000px';
        bg.style.backgroundColor = 'rgb(204,204,204)';
        bg.style.opacity = 0;
        document.body.appendChild(bg);
        var div = document.createElement('DIV');
        div.style.backgroundColor = 'white';
        div.style.opacity = 0;
        div.style.border = '1px solid black';
        div.style.position = 'fixed';
        div.style.top = '20%';
        div.style.width = canvas.width + 'px';
        div.style.height = canvas.height + 35 + 'px';
        div.style.left = (document.body.clientWidth / 2) - (canvas.width / 2) + 'px';
        div.style.padding = '5px';
        div.style.borderRadius = '10px';
        div.style.MozBorderRadius = '10px';
        div.style.WebkitBorderRadius = '10px';
        div.style.boxShadow = '0 0 15px rgba(96,96,96,0.5)';
        div.style.MozBoxShadow = '0 0 15px rgba(96,96,96,0.5)';
        div.style.WebkitBoxShadow = 'rgba(96,96,96,0.5) 0 0 15px';
        div.__canvas__ = canvas;
        div.__object__ = obj;
        div.id = '__rgraph_image_div__';
        document.body.appendChild(div);
        div.innerHTML += '<div style="position: absolute; margin-left: 10px; top: ' + canvas.height + 'px; width: ' + (canvas.width - 50) + 'px; height: 25px"><span style="font-size: 12pt;display: inline; display: inline-block; width: 65px; text-align: right">URL:</span><textarea style="float: right; overflow: hidden; height: 20px; width: ' + (canvas.width - obj.gutterLeft - obj.gutterRight - 80) + 'px" onclick="this.select()" readonly="readonly" id="__rgraph_dataurl__">' + canvas.toDataURL() + '</textarea></div>';
        div.innerHTML += '<div style="position: absolute; top: ' + (canvas.height + 25) + 'px; left: ' + (obj.gutterLeft - 65 + (canvas.width / 2)) + 'px; width: ' + (canvas.width - obj.gutterRight) + 'px; font-size: 65%">A link using the URL: <a href="' + canvas.toDataURL() + '">View</a></div>'
        var img = document.createElement('IMG');
        RG.Registry.Set('chart.png', img);
        img.__canvas__ = canvas;
        img.__object__ = obj;
        img.id = '__rgraph_image_img__';
        img.className = 'RGraph_png';
        img.src = canvas.toDataURL();
        div.appendChild(img);
        setTimeout(function () {
            document.getElementById("__rgraph_dataurl__").select();
        }, 50);
        window.addEventListener('resize', function (e) {
            var img = RG.Registry.Get('chart.png');
            img.style.left = (document.body.clientWidth / 2) - (img.width / 2) + 'px';
        }, false);
        bg.onclick = function (e) {
            var div = document.getElementById("__rgraph_image_div__");
            var bg = document.getElementById("__rgraph_image_bg__");
            if (div) {
                div.style.opacity = 0;
                div.parentNode.removeChild(div);
                div.id = '';
                div.style.display = 'none';
                div = null;
            }
            if (bg) {
                bg.style.opacity = 0;
                bg.id = '';
                bg.style.display = 'none';
                bg = null;
            }
        }
        window.addEventListener('resize', function (e) {
            bg.onclick(e);
        }, false)
        RG.showpng_image_bg = bg;
        RG.showpng_image_div = div;
        setTimeout('RGraph.showpng_image_div.style.opacity = 0.2', 50);
        setTimeout('RGraph.showpng_image_div.style.opacity = 0.4', 100);
        setTimeout('RGraph.showpng_image_div.style.opacity = 0.6', 150);
        setTimeout('RGraph.showpng_image_div.style.opacity = 0.8', 200);
        setTimeout('RGraph.showpng_image_div.style.opacity = 1', 250);
        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.1', 50);
        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.2', 100);
        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.3', 150);
        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.4', 200);
        setTimeout('RGraph.showpng_image_bg.style.opacity = 0.5', 250);
        img.onclick = function (e) {
            if (e.stopPropagation) e.stopPropagation(); else event.cancelBubble = true;
        }
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
    };
})(window, document);