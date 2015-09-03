﻿
RGraph = window.RGraph || { isRGraph: true }; RGraph.Effects = RGraph.Effects || {}; RGraph.Effects.Common = {}; (function (win, doc, undefined) {
    var RG = RGraph, ua = navigator.userAgent, ma = Math; RG.Effects.decorate = function (obj)
    { for (i in RG.Effects.Common) { if (typeof RG.Effects.Common[i] === 'function') { obj[i] = RG.Effects.Common[i]; } } }; RG.Effects.replaceCanvasWithDIV = RG.Effects.ReplaceCanvasWithDIV = RG.Effects.wrap = function (canvas) {
        if (!canvas.rgraph_wrapper) { var div = $('<div></div>').css({ width: canvas.width + 'px', height: canvas.height + 'px', cssFloat: canvas.style.cssFloat, left: canvas.style.left, top: canvas.style.top, display: 'inline-block' }).get(0); canvas.parentNode.insertBefore(div, canvas); canvas.parentNode.removeChild(canvas); div.appendChild(canvas); canvas.style.position = 'relative'; canvas.style.left = (div.offsetWidth / 2) + 'px'; canvas.style.top = (div.offsetHeight / 2) + 'px'; canvas.style.cssFloat = ''; canvas.rgraph_wrapper = div; }
        var div = canvas.rgraph_wrapper; return div;
    }; RG.Effects.Common.fadeIn = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 30; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; obj.canvas.style.opacity = 0; RG.redrawCanvas(obj.canvas); for (var i = 1; i <= frames; ++i) {
            (function (index) {
                setTimeout(function ()
                { obj.canvas.style.opacity = (index / frames); }, (index / frames) * duration);
            })(i)
        }
        setTimeout(function () { callback(obj); }, duration); return obj;
    }; RG.Effects.Common.fadeOut = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 30; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; for (var i = 1; i <= frames; ++i) {
            (function (index) {
                setTimeout(function ()
                { obj.canvas.style.opacity = 1 - (index / frames); }, (index / frames) * duration);
            })(i)
        }
        setTimeout(function () { callback(obj); }, duration); return this; callback(obj);
    }; RG.Effects.Common.fadeSlideIn = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 30; var frame = 0; var pc = -20; var step = (120 - pc) / frames; var canvasXY = RG.getCanvasXY(obj.canvas); var color = opt.color || 'white'; var callback = arguments[1] || function () { }; RG.redrawCanvas(obj.canvas); $('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({ background: 'linear-gradient(135deg, rgba(255,255,255,0) ' + pc + '%, ' + color + ' ' + (pc + 20) + '%)', width: obj.canvas.width + 'px', height: obj.canvas.height + 'px', top: 0, left: 0, position: 'absolute' }).appendTo($(obj.canvas.parentNode)); function iterator()
        { if (pc < 120) { $('div#rgraph_fadeslide_cover_' + obj.id).css({ background: 'linear-gradient(135deg, rgba(255,255,255,0) ' + pc + '%, ' + color + ' ' + (pc + 20) + '%)' }); pc += step; RG.Effects.updateCanvas(iterator); } else { $('div#rgraph_fadeslide_cover_' + obj.id).remove(); callback(obj); } }
        iterator();
    }; RG.Effects.Common.fadeSlideOut = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 30; var frame = 0; var pc = -20; var step = (120 - pc) / frames; var canvasXY = obj.canvas.parentNode.id.substring(0, 27) == 'rgraphAttributionContainer_' ? [0, 0] : RG.getCanvasXY(obj.canvas); var color = opt.color || 'white'; var callback = arguments[1] || function () { }; RG.redrawCanvas(obj.canvas); $('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({ background: 'linear-gradient(135deg, ' + color + ' ' + pc + '%, rgba(255,255,255,0) ' + (pc + 20) + '%)', width: obj.canvas.width + 'px', height: obj.canvas.height + 'px', top: canvasXY[1] + 'px', left: canvasXY[0] + 'px', position: 'absolute' }).appendTo($(obj.canvas.parentNode)); function iterator() {
            if (pc < 120) { $('div#rgraph_fadeslide_cover_' + obj.id).css({ background: 'linear-gradient(135deg, ' + color + ' ' + pc + '%, rgba(255,255,255,0) ' + (pc + 20) + '%)' }); pc += step; RG.Effects.updateCanvas(iterator); } else {
                RG.clear(obj.canvas, color)
                $('div#rgraph_fadeslide_cover_' + obj.id).remove(); callback(obj);
            }
        }
        iterator();
    }; RG.Effects.Common.fadeCircularInOutwards = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 120; var frame = 0; var radius = 0; var canvasXY = obj.canvas.parentNode.id.substring(0, 27) == 'rgraphAttributionContainer_' ? [0, 0] : RG.getCanvasXY(obj.canvas); var color = opt.color || 'white'; var callback = arguments[1] || function () { }; RG.redrawCanvas(obj.canvas); $('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({ background: 'radial-gradient(rgba(255,255,255,0) 0%, white ' + radius + '%)', width: obj.canvas.width + 'px', height: obj.canvas.height + 'px', top: canvasXY[1], left: canvasXY[0], position: 'absolute' }).appendTo($(obj.canvas.parentNode)); function iterator()
        { if (frame < frames) { $('div#rgraph_fadeslide_cover_' + obj.id).css({ background: 'radial-gradient(rgba(255,255,255,0) ' + ((frame++ / frames) * 100) + '%, ' + color + ' ' + ((frame++ / frames) * 150) + '%)' }); RG.Effects.updateCanvas(iterator); } else { $('div#rgraph_fadeslide_cover_' + obj.id).remove(); callback(obj); } }
        iterator();
    }; RG.Effects.Common.fadeCircularOutOutwards = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 120; var frame = 0; var canvasXY = obj.canvas.parentNode.id.substring(0, 27) == 'rgraphAttributionContainer_' ? [0, 0] : RG.getCanvasXY(obj.canvas); var color = opt.color || 'white'; var callback = arguments[1] || function () { }; RG.redrawCanvas(obj.canvas); $('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({ background: 'radial-gradient(rgba(255,255,255,0) 0%, white 0%)', width: obj.canvas.width + 'px', height: obj.canvas.height + 'px', top: canvasXY[1], left: canvasXY[0], position: 'absolute' }).appendTo($(obj.canvas.parentNode)); function iterator()
        { if (frame < frames) { $('div#rgraph_fadeslide_cover_' + obj.id).css({ background: 'radial-gradient(' + color + ' ' + ((frame++ / frames) * 100) + '%, rgba(255,255,255,0) ' + ((frame++ / frames) * 150) + '%)' }); RG.Effects.updateCanvas(iterator); } else { RG.clear(obj.canvas, color); $('div#rgraph_fadeslide_cover_' + obj.id).remove(); callback(obj); } }
        iterator();
    }; RG.Effects.Common.fadeCircularInInwards = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 120; var frame = 0; var radius = ma.max(obj.canvas.width, obj.canvas.height); var canvasXY = obj.canvas.parentNode.id.substring(0, 27) == 'rgraphAttributionContainer_' ? [0, 0] : RG.getCanvasXY(obj.canvas); var color = opt.color || 'white'; var callback = arguments[1] || function () { }; RG.redrawCanvas(obj.canvas); $('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({ background: 'radial-gradient(rgba(255,255,255,0) 100%, rgba(255,255,255,0) 0%)', width: obj.canvas.width + 'px', height: obj.canvas.height + 'px', top: canvasXY[1] + 'px', left: canvasXY[0] + 'px', position: 'absolute' }).appendTo($(obj.canvas.parentNode)); function iterator()
        { if (frame < frames) { $('div#rgraph_fadeslide_cover_' + obj.id).css({ background: 'radial-gradient(' + color + ' ' + (((frames - frame++) / frames) * 100) + '%, rgba(255,255,255,0) ' + (((frames - frame++) / frames) * 120) + '%)' }); RG.Effects.updateCanvas(iterator); } else { $('div#rgraph_fadeslide_cover_' + obj.id).remove(); callback(obj); } }
        iterator();
    }; RG.Effects.Common.fadeCircularOutInwards = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 120; var frame = 0; var radius = ma.max(obj.canvas.width, obj.canvas.height); var canvasXY = obj.canvas.parentNode.id.substring(0, 27) == 'rgraphAttributionContainer_' ? [0, 0] : RG.getCanvasXY(obj.canvas); var color = opt.color || 'white'; var callback = arguments[1] || function () { }; RG.redrawCanvas(obj.canvas); $('<div id="rgraph_fadeslide_cover_' + obj.id + '"></div>').css({ background: 'radial-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0) 0%)', width: obj.canvas.width + 'px', height: obj.canvas.height + 'px', top: canvasXY[1], left: canvasXY[0], position: 'absolute' }).appendTo($(obj.canvas.parentNode)); function iterator()
        { if (frame < frames) { $('div#rgraph_fadeslide_cover_' + obj.id).css({ background: 'radial-gradient(rgba(255,255,255,0) ' + (((frames - frame++) / frames) * 100) + '%, ' + color + ' ' + (((frames - frame++) / frames) * 120) + '%)' }); RG.Effects.updateCanvas(iterator); } else { RG.clear(obj.canvas); $('div#rgraph_fadeslide_cover_' + obj.id).remove(); callback(obj); } }
        iterator();
    }; RG.Effects.Common.expand = function () {
        var obj = this; var opt = arguments[0] || {}; var bounce = typeof opt.bounce === 'boolean' ? opt.bounce : true; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var callback = arguments[1] || function () { }; if (!this.canvas.rgraph_wrapper) { var div = RG.Effects.wrap(this.canvas); this.canvas.rgraph_wrapper = div; } else { div = this.canvas.rgraph_wrapper; }
        div.style.position = 'relative'; this.canvas.style.top = (this.canvas.height / 2) + 'px'; this.canvas.style.left = (this.canvas.width / 2) + 'px'; this.canvas.style.width = 0; this.canvas.style.height = 0; this.canvas.style.opacity = 0; RG.clear(this.canvas); RG.redrawCanvas(this.canvas); if (bounce) {
            jQuery('#' + obj.id).animate({ opacity: 1, width: (obj.canvas.width * 1.2) + 'px', height: (obj.canvas.height * 1.2) + 'px', left: (obj.canvas.width * -0.1) + 'px', top: (obj.canvas.height * -0.1) + 'px' }, duration * 0.5, function () {
                jQuery('#' + obj.id).animate({ width: (obj.canvas.width * 0.9) + 'px', height: (obj.canvas.height * 0.9) + 'px', top: (obj.canvas.height * 0.05) + 'px', left: (obj.canvas.width * 0.05) + 'px' }, duration * 0.25, function ()
                { jQuery('#' + obj.id).animate({ width: obj.canvas.width + 'px', height: obj.canvas.height + 'px', top: 0, left: 0 }, duration * 0.25, function () { callback(obj); }); });
            });
        } else { jQuery(obj.canvas).animate({ opacity: 1, width: obj.canvas.width + 'px', height: obj.canvas.height + 'px', left: 0, top: 0 }, duration, function () { callback(obj); }) }
        return this;
    }; RG.Effects.Common.contract = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var callback = arguments[1] || function () { }; if (!obj.canvas.rgraph_wrapper) { var div = RG.Effects.wrap(obj.canvas); obj.canvas.rgraph_wrapper = div; } else { div = obj.canvas.rgraph_wrapper; }
        div.style.position = 'relative'; obj.canvas.style.top = 0; obj.canvas.style.left = 0; jQuery('#' + obj.id).animate({ width: (obj.canvas.width * 1.2) + 'px', height: (obj.canvas.height * 1.2) + 'px', left: (obj.canvas.width * -0.1) + 'px', top: (obj.canvas.height * -0.1) + 'px' }, duration * 0.25, function ()
        { jQuery('#' + obj.id).animate({ opacity: 0, width: 0, height: 0, left: (obj.canvas.width * 0.5) + 'px', top: (obj.canvas.height * 0.5) + 'px' }, duration * 0.75, function () { callback(obj); }); }); return this;
    }; RG.Effects.Common.reveal = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var divs = [['rgraph_reveal_left_' + obj.id, xy[0], xy[1], obj.canvas.width / 2, obj.canvas.height], ['rgraph_reveal_right_' + obj.id, (xy[0] + (obj.canvas.width / 2)), xy[1], (obj.canvas.width / 2), obj.canvas.height], ['rgraph_reveal_top_' + obj.id, xy[0], xy[1], obj.canvas.width, (obj.canvas.height / 2)], ['rgraph_reveal_bottom_' + obj.id, xy[0], (xy[1] + (obj.canvas.height / 2)), obj.canvas.width, (obj.canvas.height / 2)]]; for (var i = 0, len = divs.length; i < len; ++i) { var div = document.createElement('DIV'); div.id = divs[i][0]; div.style.width = divs[i][3] + 'px'; div.style.height = divs[i][4] + 'px'; div.style.left = divs[i][1] + 'px'; div.style.top = divs[i][2] + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = opt && typeof opt.color === 'string' ? opt.color : 'white'; document.body.appendChild(div); }
        RG.clear(obj.canvas); RG.redrawCanvas(obj.canvas); jQuery('#rgraph_reveal_left_' + obj.id).animate({ width: 0 }, duration); jQuery('#rgraph_reveal_right_' + obj.id).animate({ left: '+=' + (obj.canvas.width / 2), width: 0 }, duration); jQuery('#rgraph_reveal_top_' + obj.id).animate({ height: 0 }, duration); jQuery('#rgraph_reveal_bottom_' + obj.id).animate({ top: '+=' + (obj.canvas.height / 2), height: 0 }, duration); setTimeout(function ()
        { doc.body.removeChild(doc.getElementById("rgraph_reveal_top_" + obj.id)); doc.body.removeChild(doc.getElementById("rgraph_reveal_bottom_" + obj.id)); doc.body.removeChild(doc.getElementById("rgraph_reveal_left_" + obj.id)); doc.body.removeChild(doc.getElementById("rgraph_reveal_right_" + obj.id)); callback(obj); }, duration); return this;
    }; RG.Effects.Common.revealCircular = RG.Effects.Common.revealcircular = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 30; var frame = 0; var callback = arguments[1] || function () { }; var currentRadius = 0
        var centerx = obj.canvas.width / 2; var centery = obj.canvas.height / 2; var targetRadius = ma.max(obj.canvas.height, obj.canvas.width); var step = targetRadius / frames; var color = opt.background || opt.color || opt.backgroundColor || 'transparent'; function iterator() {
            RG.clear(obj.canvas, color); obj.context.save(); obj.context.beginPath(); obj.context.arc(centerx, centery, currentRadius, 0, RG.TWOPI, false); obj.context.clip(); if (opt.background) { RG.clear(obj.canvas, opt.background); }
            obj.Draw(); obj.context.restore(); if (currentRadius < targetRadius) { currentRadius += step; RG.Effects.updateCanvas(iterator); } else { callback(obj); }
        }
        iterator(); return this;
    }; RG.Effects.Common.conceal = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var divs = [['rgraph_conceal_left_' + obj.id, xy[0], xy[1], 0, obj.canvas.height], ['rgraph_conceal_right_' + obj.id, (xy[0] + obj.canvas.width), xy[1], 0, obj.canvas.height], ['rgraph_conceal_top_' + obj.id, xy[0], xy[1], obj.canvas.width, 0], ['rgraph_conceal_bottom_' + obj.id, xy[0], (xy[1] + obj.canvas.height), obj.canvas.width, 0]]; for (var i = 0, len = divs.length; i < len; ++i) { var div = doc.createElement('DIV'); div.id = divs[i][0]; div.style.width = divs[i][3] + 'px'; div.style.height = divs[i][4] + 'px'; div.style.left = divs[i][1] + 'px'; div.style.top = divs[i][2] + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = color; doc.body.appendChild(div); }
        jQuery('#rgraph_conceal_left_' + obj.id).animate({ width: '+=' + (obj.canvas.width / 2) }, duration); jQuery('#rgraph_conceal_right_' + obj.id).animate({ left: '-=' + (obj.canvas.width / 2), width: (obj.canvas.width / 2) }, duration); jQuery('#rgraph_conceal_top_' + obj.id).animate({ height: '+=' + (obj.canvas.height / 2) }, duration); jQuery('#rgraph_conceal_bottom_' + obj.id).animate({ top: '-=' + (obj.canvas.height / 2), height: (obj.canvas.height / 2) }, duration); setTimeout(function ()
        { doc.body.removeChild(doc.getElementById("rgraph_conceal_top_" + obj.id)); doc.body.removeChild(doc.getElementById("rgraph_conceal_bottom_" + obj.id)); doc.body.removeChild(doc.getElementById("rgraph_conceal_left_" + obj.id)); doc.body.removeChild(doc.getElementById("rgraph_conceal_right_" + obj.id)); RG.clear(obj.canvas, color); callback(obj); }, duration); return this;
    }; RG.Effects.Common.hBlindsOpen = RG.Effects.Common.hblindsOpen = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(this.canvas); var height = this.canvas.height / 5; RG.clear(this.canvas); RG.redrawCanvas(this.canvas); for (var i = 0; i < 5; ++i) { var div = doc.createElement('DIV'); div.id = 'rgraph_hblinds_' + i + '_' + obj.id; div.style.width = this.canvas.width + 'px'; div.style.height = height + 'px'; div.style.left = xy[0] + 'px'; div.style.top = (xy[1] + (this.canvas.height * (i / 5))) + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = color; document.body.appendChild(div); jQuery('#rgraph_hblinds_' + i + '_' + obj.id).animate({ height: 0 }, duration); }
        setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_0_' + obj.id)); }, duration); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_1_' + obj.id)); }, duration); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_2_' + obj.id)); }, duration); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_3_' + obj.id)); }, duration); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_4_' + obj.id)); }, duration); setTimeout(function () { callback(obj); }, duration); return this;
    }; RG.Effects.Common.hBlindsClose = RG.Effects.Common.hblindsclose = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(this.canvas); var height = this.canvas.height / 5; for (var i = 0; i < 5; ++i) { var div = doc.createElement('DIV'); div.id = 'rgraph_hblinds_' + i + '_' + obj.id; div.style.width = this.canvas.width + 'px'; div.style.height = 0; div.style.left = xy[0] + 'px'; div.style.top = (xy[1] + (this.canvas.height * (i / 5))) + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = color; doc.body.appendChild(div); jQuery('#rgraph_hblinds_' + i + '_' + obj.id).animate({ height: height + 'px' }, duration); }
        setTimeout(function () { RG.clear(obj.canvas); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_0_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_1_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_2_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_3_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_hblinds_4_' + obj.id)); }, duration + 100); setTimeout(function () { callback(obj); }, duration + 100);
    }; RG.Effects.Common.vBlindsOpen = RG.Effects.Common.vblindsopen = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(this.canvas); var width = this.canvas.width / 10; RG.redrawCanvas(obj.canvas); for (var i = 0; i < 10; ++i) { var div = doc.createElement('DIV'); div.id = 'rgraph_vblinds_' + i + '_' + obj.id; div.style.width = width + 'px'; div.style.height = this.canvas.height + 'px'; div.style.left = (xy[0] + (this.canvas.width * (i / 10))) + 'px'; div.style.top = (xy[1]) + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = color; doc.body.appendChild(div); jQuery('#rgraph_vblinds_' + i + '_' + obj.id).animate({ width: 0 }, duration); }
        setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_0_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_1_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_2_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_3_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_4_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_5_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_6_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_7_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_8_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_9_' + obj.id)); }, duration + 100); setTimeout(function () { callback(obj); }, duration + 100); return this;
    }; RG.Effects.Common.vblindsclose = RG.Effects.Common.vBlindsClose = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(this.canvas); var width = this.canvas.width / 10; for (var i = 0; i < 10; ++i) { var div = doc.createElement('DIV'); div.id = 'rgraph_vblinds_' + i + '_' + obj.id; div.style.width = 0; div.style.height = this.canvas.height + 'px'; div.style.left = (xy[0] + (this.canvas.width * (i / 10))) + 'px'; div.style.top = (xy[1]) + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = color; doc.body.appendChild(div); jQuery('#rgraph_vblinds_' + i + '_' + obj.id).animate({ width: width }, duration); }
        setTimeout(function () { RG.clear(obj.canvas); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_0_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_1_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_2_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_3_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_4_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_5_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_6_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_7_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_8_' + obj.id)); }, duration + 100); setTimeout(function () { doc.body.removeChild(doc.getElementById('rgraph_vblinds_9_' + obj.id)); }, duration + 100); setTimeout(function () { callback(obj); }, duration + 100); return this;
    }; RG.Effects.Common.slideIn = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(this.canvas); var width = this.canvas.width / 10; var div = RG.Effects.wrap(obj.canvas); var from = opt.from || 'left'; div.style.overflow = 'hidden'; RG.clear(obj.canvas); RG.redrawCanvas(obj.canvas); canvas.style.position = 'relative'; if (from == 'left') { obj.canvas.style.left = (0 - div.offsetWidth) + 'px'; obj.canvas.style.top = 0; } else if (from == 'top') { obj.canvas.style.left = 0; obj.canvas.style.top = (0 - div.offsetHeight) + 'px'; } else if (from == 'bottom') { obj.canvas.style.left = 0; obj.canvas.style.top = div.offsetHeight + 'px'; } else { obj.canvas.style.left = div.offsetWidth + 'px'; obj.canvas.style.top = 0; }
        jQuery('#' + obj.id).animate({ left: 0, top: 0 }, duration, function ()
        { callback(obj); }); return this;
    }; RG.Effects.Common.slideOut = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(this.canvas); var width = this.canvas.width / 10; var div = RG.Effects.wrap(obj.canvas); var to = opt.to || 'left'; div.style.overflow = 'hidden'; obj.canvas.style.position = 'relative'; obj.canvas.style.left = 0; obj.canvas.style.top = 0; if (to == 'left') { jQuery('#' + obj.id).animate({ left: (0 - obj.canvas.width) + 'px' }, duration, function () { callback(obj); }); } else if (to == 'top') { jQuery('#' + obj.id).animate({ left: 0, top: (0 - div.offsetHeight) + 'px' }, duration, function () { callback(obj); }); } else if (to == 'bottom') { jQuery('#' + obj.id).animate({ top: (0 + div.offsetHeight) + 'px' }, duration, function () { callback(obj); }); } else { jQuery('#' + obj.id).animate({ left: (0 + obj.canvas.width) + 'px' }, duration, function () { callback(obj); }); }
        return this;
    }; RG.Effects.Common.hscissorsopen = RG.Effects.Common.hScissorsOpen = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(obj.canvas); var width = this.canvas.width / 10; var to = opt.to || 'left'; var height = obj.canvas.height / 5; RG.clear(obj.canvas); RG.redrawCanvas(obj.canvas); for (var i = 0; i < 5; ++i) {
            var div = doc.getElementById("rgraph_hscissors_" + i + '_' + obj.id)
            if (!div) { var div = doc.createElement('DIV'); div.id = 'rgraph_hscissors_' + i + '_' + obj.id; div.style.width = obj.canvas.width + 'px'; div.style.height = height + 'px'; div.style.left = xy[0] + 'px'; div.style.top = (xy[1] + (obj.canvas.height * (i / 5))) + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = color; doc.body.appendChild(div); }
            if (i % 2 == 0) { jQuery('#' + 'rgraph_hscissors_' + i + '_' + obj.id).animate({ left: xy[0] + obj.canvas.width + 'px', width: 0 }, duration); } else { jQuery('#' + 'rgraph_hscissors_' + i + '_' + obj.id).animate({ width: 0 }, duration); }
        }
        setTimeout(function ()
        { doc.body.removeChild(doc.getElementById('rgraph_hscissors_0_' + obj.id)); doc.body.removeChild(doc.getElementById('rgraph_hscissors_1_' + obj.id)); doc.body.removeChild(doc.getElementById('rgraph_hscissors_2_' + obj.id)); doc.body.removeChild(doc.getElementById('rgraph_hscissors_3_' + obj.id)); doc.body.removeChild(doc.getElementById('rgraph_hscissors_4_' + obj.id)); callback(obj); }, duration); return this;
    }; RG.Effects.Common.hScissorsClose = RG.Effects.Common.hscissorsclose = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(this.canvas); var height = obj.canvas.height / 5; RG.redrawCanvas(obj.canvas); for (var i = 0; i < 5; ++i) { var div = doc.createElement('DIV'); div.id = 'rgraph_hscissors_' + i + '_' + obj.id; div.style.width = 0; div.style.height = height + 'px'; div.style.left = (i % 2 == 0 ? xy[0] + obj.canvas.width : xy[0]) + 'px'; div.style.top = (xy[1] + (obj.canvas.height * (i / 5))) + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = color; doc.body.appendChild(div); if (i % 2 == 0) { jQuery('#' + 'rgraph_hscissors_' + i + '_' + obj.id).animate({ left: xy[0] + 'px', width: obj.canvas.width + 'px' }, duration); } else { jQuery('#' + 'rgraph_hscissors_' + i + '_' + obj.id).animate({ width: obj.canvas.width + 'px' }, duration); } }
        setTimeout(function () { callback(obj); }, duration); return this;
    }; RG.Effects.Common.vScissorsOpen = RG.Effects.Common.vscissorsopen = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(this.canvas); var width = this.canvas.width / 10; RG.redrawCanvas(obj.canvas); for (var i = 0; i < 10; ++i) {
            var div = doc.getElementById("rgraph_vscissors_" + i + '_' + obj.id); if (!div) { var div = doc.createElement('DIV'); div.id = 'rgraph_vscissors_' + i + '_' + obj.id; div.style.width = width + 'px'; div.style.height = obj.canvas.height + 'px'; div.style.left = xy[0] + (obj.canvas.width * (i / 10)) + 'px'; div.style.top = xy[1] + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = color; doc.body.appendChild(div); }
            if (i % 2 == 0) { jQuery('#' + 'rgraph_vscissors_' + i + '_' + obj.id).animate({ top: xy[1] + obj.canvas.height + 'px', height: 0 }, duration); } else { jQuery('#' + 'rgraph_vscissors_' + i + '_' + obj.id).animate({ height: 0 }, duration); }
        }
        setTimeout(function ()
        { doc.body.removeChild(doc.getElementById('rgraph_vscissors_0' + '_' + obj.id)); doc.body.removeChild(doc.getElementById('rgraph_vscissors_1' + '_' + obj.id)); doc.body.removeChild(doc.getElementById('rgraph_vscissors_2' + '_' + obj.id)); doc.body.removeChild(doc.getElementById('rgraph_vscissors_3' + '_' + obj.id)); doc.body.removeChild(doc.getElementById('rgraph_vscissors_4' + '_' + obj.id)); callback(obj); }, duration); return this;
    }; RG.Effects.Common.vscissorsclose = RG.Effects.Common.vScissorsClose = function () {
        var obj = this; var opt = arguments[0] || {}; var frames = opt.frames || 60; var duration = (frames / 60) * 1000; var frame = 0; var callback = arguments[1] || function () { }; var xy = RG.getCanvasXY(obj.canvas); var color = opt.background || opt.color || opt.backgroundColor || 'white'; var xy = RG.getCanvasXY(this.canvas); var width = this.canvas.width / 10; RG.redrawCanvas(obj.canvas); for (var i = 0; i < 10; ++i) {
            var div = doc.getElementById("rgraph_vscissors_" + i + '_' + obj.id)
            if (!div) { var div = doc.createElement('DIV'); div.id = 'rgraph_vscissors_' + i + '_' + obj.id; div.style.width = width + 'px'; div.style.height = 0; div.style.left = xy[0] + (width * i) + 'px'; div.style.top = (i % 2 == 0 ? xy[1] + obj.canvas.height : xy[1]) + 'px'; div.style.position = 'absolute'; div.style.backgroundColor = color; doc.body.appendChild(div); }
            if (i % 2 == 0) { jQuery('#' + 'rgraph_vscissors_' + i + '_' + obj.id).animate({ top: xy[1] + 'px', height: obj.canvas.height + 'px' }, duration); } else { jQuery('#' + 'rgraph_vscissors_' + i + '_' + obj.id).animate({ height: obj.canvas.height + 'px' }, duration); }
        }
        setTimeout(function () { callback(obj); }, duration); return this;
    }; RG.Effects.Common.animate = function (map) {
        var obj = this; obj.draw(); var totalFrames = (map && map['frames']) ? map['frames'] : 30; var currentFrame = new Array(); var originalValues = new Array(); var diffs = new Array(); var steps = new Array(); var callback = arguments[1]
        function iterator() {
            var id = [obj.id + '_' + obj.type]; if (!currentFrame[id]) { currentFrame[id] = totalFrames; originalValues[id] = {}; diffs[id] = {}; steps[id] = {}; }
            for (var i in map) {
                if (typeof map[i] === 'string' || typeof map[i] === 'number') {
                    if (currentFrame[id] == totalFrames) { originalValues[id][i] = obj.get(i); diffs[id][i] = map[i] - originalValues[id][i]; steps[id][i] = diffs[id][i] / totalFrames; }
                    obj.set(i, obj.get(i) + steps[id][i]); RG.clear(obj.canvas); obj.draw();
                }
            }
            if (--currentFrame[id] > 0) { RG.Effects.updateCanvas(iterator); } else { if (typeof callback === 'function') { callback(obj); } }
        }
        iterator();
    }
})(window, document);