Ext.define('Ext.ux.colorpick.Selection', {
    mixinId: 'colorselection',

    config : {
        /**
         * @cfg {"hex6","hex8","#hex6","#hex8","HEX6","HEX8","#HEX6","#HEX8"} [format=hex6]
         * The color format to for the `value` config. The `value` can be set using any
         * supported format or named color, but the stored value will always be in this
         * format.
         *
         * Supported formats are:
         *
         * - hex6 - For example "ffaa00" (Note: does not preserve transparency).
         * - hex8 - For eaxmple "ffaa00ff" - the last 2 digits represent transparency
         * - #hex6 - For example "#ffaa00" (same as "hex6" but with a leading "#").
         * - #hex8 - For example "#ffaa00ff" (same as "hex8" but with a leading "#").
         * - HEX6 - Same as "hex6" but upper case.
         * - HEX8 - Same as "hex8" but upper case.
         * - #HEX6 - Same as "#hex6" but upper case.
         * - #HEX8 - Same as "#hex8" but upper case.
         */
        format: 'hex6',

        /**
         * @cfg {String} [value=FF0000]
         * The initial color to highlight; see {@link #format} for supported formats.
         */
        value: 'FF0000',

        /**
         * @cfg {Object} color
         * This config property is used internally by the UI to maintain the full color.
         * Changes to this config are automatically reflected in `value` and vise-versa.
         * Setting `value` can, however, cause the alpha to be dropped if the new value
         * does not contain an alpha component.
         * @private
         */
        color: null,
        previousColor: null
    },

    applyColor: function (color) {
        var c = color;
        if (Ext.isString(c)) {
            c = Ext.ux.colorpick.ColorUtils.parseColor(color);
        }
        return c;
    },

    applyValue: function (color) {
        // Transform whatever incoming color we get to the proper format
        var c = Ext.ux.colorpick.ColorUtils.parseColor(color);
        return this.formatColor(c);
    },

    formatColor: function (color) {
        return Ext.ux.colorpick.ColorUtils.formats[this.getFormat()](color);
    },

    updateColor: function (color) {
        var me = this;

        // If the "color" is changed (via internal changes in the UI), update "value" as
        // well. Since these are always tracking each other, we guard against the case
        // where we are being updated *because* "value" is being set.
        if (!me.syncing) {
            me.syncing = true;
            me.setValue(me.formatColor(color));
            me.syncing = false;
        }
    },

    updateValue: function (value, oldValue) {
        var me = this;

        // If the "value" is changed, update "color" as well. Since these are always
        // tracking each other, we guard against the case where we are being updated
        // *because* "color" is being set.
        if (!me.syncing) {
            me.syncing = true;
            me.setColor(value);
            me.syncing = false;
        }

        this.fireEvent('change', me, value, oldValue);
    }
});

Ext.define('Ext.ux.colorpick.ColorUtils', {
    statics: {
        // parse and format functions under objects that match supported format config
        // values of the color picker; parse() methods recieve the supplied color value
        // as a string (i.e "FFAAAA") and return an object form, just like the one 
        // ColorPickerModel vm "selectedColor" uses. That same object form is used as a 
        // parameter to the format() methods, where the appropriate string form is expected
        // for the return result
        formats: {
            // "FFAA00"
            HEX6: function(colorO) {
                return Ext.ux.colorpick.ColorUtils.rgb2hex(colorO.r, colorO.g, colorO.b);
            },

            // "FFAA00FF" (last 2 are opacity)
            HEX8: function(colorO) {
                var hex = Ext.ux.colorpick.ColorUtils.rgb2hex(colorO.r, colorO.g, colorO.b),
                    opacityHex = Math.round(colorO.a * 255).toString(16);

                if (opacityHex.length < 2) {
                    hex += '0';
                }

                hex += opacityHex.toUpperCase();

                return hex;
            }
        },

        hexRe: /#?([0-9a-f]{3,8})/i,
        rgbaAltRe: /rgba\(\s*([\w#\d]+)\s*,\s*([\d\.]+)\s*\)/,
        rgbaRe: /rgba\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)/,
        rgbRe: /rgb\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)/,

        /**
         * Turn a string to a color object. Supports these formats:
         *
         * - "#ABC" (HEX short)
         * - "#ABCDEF" (HEX)
         * - "#ABCDEFDD" (HEX with opacity)
         * - "red" (named colors - see {@link #colorMap} source code for a full list)
         * - "rgba(r,g,b,a)" i.e "rgba(255,0,0,1)" (a == alpha == 0-1)
         * - "rgba(red, 0.4)"
         * - "rgba(#ABC, 0.9)"
         * - "rgba(#ABCDEF, 0.8)"
         *
         * @param {String} color The color string to parse.
         * @return {Object} Object with various color properties.
         * @return {Number} return.r The red component (0-255).
         * @return {Number} return.g The green component (0-255).
         * @return {Number} return.b The blue component (0-255).
         * @return {Number} return.a The red component (0-1).
         * @return {Number} return.h The hue component (0-1).
         * @return {Number} return.s The saturation component (0-1).
         * @return {Number} return.v The value component (0-1).
         */
        parseColor: function (color) {
            if (!color) {
                return null;
            }

            var me = this,
                rgb = me.colorMap[color],
                match, ret, hsv;

            if (rgb) {
                ret = {
                    r: rgb[0],
                    g: rgb[1],
                    b: rgb[2],
                    a: 1
                };
            }
            else if (color === 'transparent') {
                ret = {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                };
            }
            else {
                match = me.hexRe.exec(color);
                if (match) {
                    match = match[1]; // the captured hex
                    switch (match.length) {
                        default:
                            return null;

                        case 3:
                            ret = {
                                //double the number (e.g. 6 - > 66, a -> aa) and convert to decimal
                                r: parseInt(match[0] + match[0], 16),
                                g: parseInt(match[1] + match[1], 16),
                                b: parseInt(match[2] + match[2], 16),
                                a: 1
                            };
                            break;

                        case 6:
                        case 8:
                            ret = {
                                r: parseInt(match.substr(0,2), 16),
                                g: parseInt(match.substr(2,2), 16),
                                b: parseInt(match.substr(4,2), 16),
                                a: parseInt(match.substr(6,2) || 'ff', 16) / 255
                            };
                            break;
                    }
                }
                else {
                    match = me.rgbaRe.exec(color);
                    if (match) {
                        // proper css => rgba(r,g,b,a)
                        ret = {
                            r: parseFloat(match[1]),
                            g: parseFloat(match[2]),
                            b: parseFloat(match[3]),
                            a: parseFloat(match[4])
                        };
                    }
                    else {
                        match = me.rgbaAltRe.exec(color);
                        if (match) {
                            // scss shorthands =? rgba(red, 0.4), rgba(#222, 0.9), rgba(#444433, 0.8)
                            ret = me.parseColor(match[1]);
                            // we have HSV filled in, so poke on "a" and we're done
                            ret.a = parseFloat(match[2]);
                            return ret;
                        }

                        match = me.rgbRe.exec(color);
                        if (match) {
                            ret = {
                                r: parseFloat(match[1]),
                                g: parseFloat(match[2]),
                                b: parseFloat(match[3]),
                                a: 1
                            };
                        }
                        else {
                            return null;
                        }
                    }
                }
            }

            hsv = this.rgb2hsv(ret.r, ret.g, ret.b);

            return Ext.apply(ret, hsv);
        },

        /**
         *
         * @param rgba
         * @return {String}
         */
        getRGBAString: function(rgba) {
            return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
        },

        /**
         * Returns a rgb css string whith this color (without the alpha channel)
         * @param rgb
         * @return {String}
         */
        getRGBString: function(rgb) {
            return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
        },

        /**
         * Following standard math to convert from hsl to rgb
         * Check out wikipedia page for more information on how this works
         * h => [0,1]
         * s,l => [0,1]
         * @param h
         * @param s
         * @param v
         * @return {Object} An object with "r", "g" and "b" color properties.
         */
        hsv2rgb: function(h, s, v) {
            h = h * 360;

            if (h === 360) {
                h = 0;
            }

            var c = v * s;

            var hprime = h / 60;

            var x = c * (1 - Math.abs(hprime % 2 - 1));

            var rgb = [0, 0, 0];

            switch (Math.floor(hprime)) {
                case 0:
                    rgb = [c, x, 0];
                    break;
                case 1:
                    rgb = [x, c, 0];
                    break;
                case 2:
                    rgb = [0, c, x];
                    break;
                case 3:
                    rgb = [0, x, c];
                    break;
                case 4:
                    rgb = [x, 0, c];
                    break;
                case 5:
                    rgb = [c, 0, x];
                    break;
                default:
                    console.error("unknown color " + h + ' ' + s + " " + v);
                    break;
            }

            var m = v - c;

            rgb[0] += m;
            rgb[1] += m;
            rgb[2] += m;

            rgb[0] = Math.round(rgb[0] * 255);
            rgb[1] = Math.round(rgb[1] * 255);
            rgb[2] = Math.round(rgb[2] * 255);

            return {
                r: rgb[0],
                g: rgb[1],
                b: rgb[2]
            };
        },

        /**
         * http://en.wikipedia.org/wiki/HSL_and_HSV
         * @param {Number} r The red component (0-255).
         * @param {Number} g The green component (0-255).
         * @param {Number} b The blue component (0-255).
         * @return {Object} An object with "h", "s" and "v" color properties.
         */
        rgb2hsv: function(r,g,b) {
            r = r / 255;
            g = g / 255;
            b = b / 255;

            var M = Math.max(r,g,b);
            var m = Math.min(r,g,b);
            var c = M - m;

            var hprime = 0;
            if (c !== 0) {
                if (M === r) {
                    hprime = ((g - b) / c) % 6;
                } else if (M === g) {
                    hprime = ((b - r) / c) + 2;
                } else if (M === b) {
                    hprime = ((r - g) / c) + 4;
                }
            }

            var h = hprime * 60;
            if (h === 360) {
                h = 0;
            }

            var v = M;

            var s = 0;
            if (c !== 0) {
                s = c/v;
            }

            h = h / 360;

            if (h < 0) {
                h = h + 1;
            }

            return {
                h: h,
                s: s,
                v: v
            };
        },

        /**
         *
         * @param r
         * @param g
         * @param b
         * @return {String}
         */
        rgb2hex: function(r, g, b) {
            r = r.toString(16);
            g = g.toString(16);
            b = b.toString(16);

            if (r.length < 2) {
                r = '0' + r;
            }

            if (g.length < 2) {
                g = '0' + g;
            }

            if (b.length < 2) {
                b = '0' + b;
            }

            return (r + g + b).toUpperCase();
        },

        colorMap: {
            aliceblue:              [240, 248, 255],
            antiquewhite:           [250, 235, 215],
            aqua:                   [0, 255, 255],
            aquamarine:             [127, 255, 212],
            azure:                  [240, 255, 255],
            beige:                  [245, 245, 220],
            bisque:                 [255, 228, 196],
            black:                  [0, 0, 0],
            blanchedalmond:         [255, 235, 205],
            blue:                   [0, 0, 255],
            blueviolet:             [138, 43, 226],
            brown:                  [165, 42, 42],
            burlywood:              [222, 184, 135],
            cadetblue:              [95, 158, 160],
            chartreuse:             [127, 255, 0],
            chocolate:              [210, 105, 30],
            coral:                  [255, 127, 80],
            cornflowerblue:         [100, 149, 237],
            cornsilk:               [255, 248, 220],
            crimson:                [220, 20, 60],
            cyan:                   [0, 255, 255],
            darkblue:               [0, 0, 139],
            darkcyan:               [0, 139, 139],
            darkgoldenrod:          [184, 132, 11],
            darkgray:               [169, 169, 169],
            darkgreen:              [0, 100, 0],
            darkgrey:               [169, 169, 169],
            darkkhaki:              [189, 183, 107],
            darkmagenta:            [139, 0, 139],
            darkolivegreen:         [85, 107, 47],
            darkorange:             [255, 140, 0],
            darkorchid:             [153, 50, 204],
            darkred:                [139, 0, 0],
            darksalmon:             [233, 150, 122],
            darkseagreen:           [143, 188, 143],
            darkslateblue:          [72, 61, 139],
            darkslategray:          [47, 79, 79],
            darkslategrey:          [47, 79, 79],
            darkturquoise:          [0, 206, 209],
            darkviolet:             [148, 0, 211],
            deeppink:               [255, 20, 147],
            deepskyblue:            [0, 191, 255],
            dimgray:                [105, 105, 105],
            dimgrey:                [105, 105, 105],
            dodgerblue:             [30, 144, 255],
            firebrick:              [178, 34, 34],
            floralwhite:            [255, 255, 240],
            forestgreen:            [34, 139, 34],
            fuchsia:                [255, 0, 255],
            gainsboro:              [220, 220, 220],
            ghostwhite:             [248, 248, 255],
            gold:                   [255, 215, 0],
            goldenrod:              [218, 165, 32],
            gray:                   [128, 128, 128],
            green:                  [0, 128, 0],
            greenyellow:            [173, 255, 47],
            grey:                   [128, 128, 128],
            honeydew:               [240, 255, 240],
            hotpink:                [255, 105, 180],
            indianred:              [205, 92, 92],
            indigo:                 [75, 0, 130],
            ivory:                  [255, 255, 240],
            khaki:                  [240, 230, 140],
            lavender:               [230, 230, 250],
            lavenderblush:          [255, 240, 245],
            lawngreen:              [124, 252, 0],
            lemonchiffon:           [255, 250, 205],
            lightblue:              [173, 216, 230],
            lightcoral:             [240, 128, 128],
            lightcyan:              [224, 255, 255],
            lightgoldenrodyellow:   [250, 250, 210],
            lightgray:              [211, 211, 211],
            lightgreen:             [144, 238, 144],
            lightgrey:              [211, 211, 211],
            lightpink:              [255, 182, 193],
            lightsalmon:            [255, 160, 122],
            lightseagreen:          [32, 178, 170],
            lightskyblue:           [135, 206, 250],
            lightslategray:         [119, 136, 153],
            lightslategrey:         [119, 136, 153],
            lightsteelblue:         [176, 196, 222],
            lightyellow:            [255, 255, 224],
            lime:                   [0, 255, 0],
            limegreen:              [50, 205, 50],
            linen:                  [250, 240, 230],
            magenta:                [255, 0, 255],
            maroon:                 [128, 0, 0],
            mediumaquamarine:       [102, 205, 170],
            mediumblue:             [0, 0, 205],
            mediumorchid:           [186, 85, 211],
            mediumpurple:           [147, 112, 219],
            mediumseagreen:         [60, 179, 113],
            mediumslateblue:        [123, 104, 238],
            mediumspringgreen:      [0, 250, 154],
            mediumturquoise:        [72, 209, 204],
            mediumvioletred:        [199, 21, 133],
            midnightblue:           [25, 25, 112],
            mintcream:              [245, 255, 250],
            mistyrose:              [255, 228, 225],
            moccasin:               [255, 228, 181],
            navajowhite:            [255, 222, 173],
            navy:                   [0, 0, 128],
            oldlace:                [253, 245, 230],
            olive:                  [128, 128, 0],
            olivedrab:              [107, 142, 35],
            orange:                 [255, 165, 0],
            orangered:              [255, 69, 0],
            orchid:                 [218, 112, 214],
            palegoldenrod:          [238, 232, 170],
            palegreen:              [152, 251, 152],
            paleturquoise:          [175, 238, 238],
            palevioletred:          [219, 112, 147],
            papayawhip:             [255, 239, 213],
            peachpuff:              [255, 218, 185],
            peru:                   [205, 133, 63],
            pink:                   [255, 192, 203],
            plum:                   [221, 160, 203],
            powderblue:             [176, 224, 230],
            purple:                 [128, 0, 128],
            red:                    [255, 0, 0],
            rosybrown:              [188, 143, 143],
            royalblue:              [65, 105, 225],
            saddlebrown:            [139, 69, 19],
            salmon:                 [250, 128, 114],
            sandybrown:             [244, 164, 96],
            seagreen:               [46, 139, 87],
            seashell:               [255, 245, 238],
            sienna:                 [160, 82, 45],
            silver:                 [192, 192, 192],
            skyblue:                [135, 206, 235],
            slateblue:              [106, 90, 205],
            slategray:              [119, 128, 144],
            slategrey:              [119, 128, 144],
            snow:                   [255, 255, 250],
            springgreen:            [0, 255, 127],
            steelblue:              [70, 130, 180],
            tan:                    [210, 180, 140],
            teal:                   [0, 128, 128],
            thistle:                [216, 191, 216],
            tomato:                 [255, 99, 71],
            turquoise:              [64, 224, 208],
            violet:                 [238, 130, 238],
            wheat:                  [245, 222, 179],
            white:                  [255, 255, 255],
            whitesmoke:             [245, 245, 245],
            yellow:                 [255, 255, 0],
            yellowgreen:            [154, 205, 5]
        }
    }
},
function (ColorUtils) {
    var formats = ColorUtils.formats,
        lowerized = {};

    formats['#HEX6'] = function (color) {
        return '#' + formats.HEX6(color);
    };

    formats['#HEX8'] = function (color) {
        return '#' + formats.HEX8(color);
    };

    Ext.Object.each(formats, function (name, fn) {
        lowerized[name.toLowerCase()] = function (color) {
            var ret = fn(color);
            return ret.toLowerCase();
        }
    });

    Ext.apply(formats, lowerized);
});

Ext.define('Ext.ux.colorpick.ColorMapController', {
    extend : 'Ext.app.ViewController',
    alias: 'controller.colorpickercolormapcontroller',

    requires: [
        'Ext.ux.colorpick.ColorUtils'
    ],

    // After the component is rendered
    onFirstBoxReady: function() {
        var me         = this,
            colorMap   = me.getView(),
            dragHandle = colorMap.down('#dragHandle'),
            dd         = dragHandle.dd;

        // configure draggable constraints 
        dd.constrain = true;
        dd.constrainTo = colorMap.getEl();
        dd.initialConstrainTo = dd.constrainTo; // needed otheriwse error EXTJS-13187

        // event handlers
        dd.on('drag', Ext.bind(me.onHandleDrag, me));
        me.mon(colorMap.getEl(), 'mousedown', me.onMouseDown, me);
    },

    // Fires when handle is dragged; propagates "handledrag" event on the ColorMap
    // with parameters "percentX" and "percentY", both 0-1, representing the handle
    // position on the color map, relative to the container
    onHandleDrag: function() {
        var me              = this,
            container       = me.getView(), // the Color Map
            dragHandle      = container.down('#dragHandle'),
            x               = dragHandle.getX() - container.getX(),
            y               = dragHandle.getY() - container.getY(),
            containerEl     = container.getEl(),
            containerWidth  = containerEl.getWidth(),
            containerHeight = containerEl.getHeight(),
            xRatio          = x/containerWidth,
            yRatio          = y/containerHeight;

        // Adjust x/y ratios for dragger always being 1 pixel from the edge on the right
        if (xRatio > 0.99) {
            xRatio = 1;
        }
        if (yRatio > 0.99) {
            yRatio = 1;
        }
        
        container.fireEvent('handledrag', xRatio, yRatio);
    },

    // Whenever we mousedown over the colormap area
    onMouseDown: function(e) {
        var me         = this,
            container  = me.getView(),
            dragHandle = container.down('#dragHandle');

        // position drag handle accordingly
        dragHandle.setY(e.getY());
        dragHandle.setX(e.getX());
        me.onHandleDrag();

        // tie into the default dd mechanism
        dragHandle.dd.onMouseDown(e, dragHandle.dd.el);
    },

    // Whenever the map is clicked (but not the drag handle) we need to position
    // the drag handle to the point of click
    onMapClick: function (e) {
        var me          = this,
            container   = me.getView(), // the Color Map
            dragHandle  = container.down('#dragHandle'),
            cXY         = container.getXY(),
            eXY         = e.getXY(),
            left, top;

        left = eXY[0] - cXY[0];
        top  = eXY[1] - cXY[1];

        dragHandle.getEl().setStyle({
            left : left + 'px',
            top  : top + 'px'
        });

        me.onHandleDrag();
    },

    // Whenever the underlying binding data is changed we need to 
    // update position of the dragger; active drag state has been
    // accounted for earlier
    onColorBindingChanged: function(selectedColor) {
        var me              = this,
            vm              = me.getViewModel(),
            rgba            = vm.get('selectedColor'),
            hsv,
            container       = me.getView(), // the Color Map
            dragHandle      = container.down('#dragHandle'),
            containerEl     = container.getEl(),
            containerWidth  = containerEl.getWidth(),
            containerHeight = containerEl.getHeight(),
            xRatio,
            yRatio,
            left,
            top;

        // Color map selection really only depends on saturation and value of the color
        hsv = Ext.ux.colorpick.ColorUtils.rgb2hsv(rgba.r, rgba.g, rgba.b);

        // x-axis of color map with value 0-1 translates to saturation
        xRatio = hsv.s;
        left = containerWidth*xRatio;

        // y-axis of color map with value 0-1 translates to reverse of "value"
        yRatio = 1-hsv.v;
        top = containerHeight*yRatio;

        // Position dragger
        dragHandle.getEl().setStyle({
            left : left + 'px',
            top  : top + 'px'
        });
    },

    // Whenever only Hue changes we can update the 
    // background color of the color map
    // Param "hue" has value of 0-1
    onHueBindingChanged: function(hue) {
        var me            = this,
            vm            = me.getViewModel(),
            fullColorRGB,
            hex;

        fullColorRGB = Ext.ux.colorpick.ColorUtils.hsv2rgb(hue, 1, 1);
        hex = Ext.ux.colorpick.ColorUtils.rgb2hex(fullColorRGB.r, fullColorRGB.g, fullColorRGB.b);
        me.getView().getEl().applyStyles({ 'background-color': '#' + hex });
    }
});

/**
 * The main colorful square for selecting color shades by dragging around the
 * little circle.
 */
Ext.define('Ext.ux.colorpick.ColorMap', {
    extend     : 'Ext.container.Container',
    alias      : 'widget.colorpickercolormap',
    controller : 'colorpickercolormapcontroller',

    requires: [
        'Ext.ux.colorpick.ColorMapController'
    ],

    cls  : 'x-colorpicker-colormap',

    // This is the drag "circle"; note it's 1x1 in size to allow full
    // travel around the color map; the inner div has the bigger image
    items: [{
        xtype     : 'component',
        cls       : 'x-colorpicker-colormap-draghandle-container',
        itemId    : 'dragHandle',
        width     : 1,
        height    : 1,
        draggable : true,
        html: '<div class="x-colorpicker-colormap-draghandle"></div>'
    }],

    listeners : {
        boxready : {
            single  : true,
            fn      : 'onFirstBoxReady',
            scope   : 'controller'
        },
        colorbindingchanged: {
            fn    : 'onColorBindingChanged',
            scope : 'controller'
        },
        huebindingchanged: {
            fn    : 'onHueBindingChanged',
            scope : 'controller'
        }
    },

    afterRender: function () {
        var me  = this,
            src = me.mapGradientUrl,
            el  = me.el;

        me.callParent();

        if (!src) {
            // We do this trick to allow the Sass to calculate resource image path for
            // our package and pick up the proper image URL here.
            src = el.getStyle('background-image');
            src = src.substring(4, src.length - 1);  // strip off outer "url(...)"

            // In IE8 this path will have quotes around it
            if (src.indexOf('"') === 0) {
                src = src.substring(1, src.length-1);
            }

            // Then remember it on our prototype for any subsequent instances.
            Ext.ux.colorpick.ColorMap.prototype.mapGradientUrl = src;
        }

        // Now clear that style because it will conflict with the background-color
        el.setStyle('background-image', 'none');

        // Create the image with transparent PNG with black and white gradient shades;
        // it blends with the background color (which changes with hue selection). This
        // must be an IMG in order to properly stretch to fit.
        el = me.layout.getElementTarget(); // the el for items and html
        el.createChild({
            tag: 'img',
            cls: 'x-colorpicker-colormap-blender',
            src: src
        });
    },

    // Called via data binding whenever selectedColor changes; fires "colorbindingchanged"
    setPosition: function(data) {
        var me         = this,
            dragHandle = me.down('#dragHandle');

        // Too early in the render cycle? Skip event
        if (!dragHandle.dd || !dragHandle.dd.constrain) {
            return;
        }

        // User actively dragging? Skip event
        if (typeof dragHandle.dd.dragEnded !== 'undefined' && !dragHandle.dd.dragEnded) {
            return;
        }

        me.fireEvent('colorbindingchanged', data);
    },

    // Called via data binding whenever selectedColor.h changes; fires "huebindingchanged" event
    setHue: function(hue) {
        var me = this;

        // Too early in the render cycle? Skip event
        if (!me.getEl()) {
            return;
        }

        me.fireEvent('huebindingchanged', hue);
    }
});

/**
 * View Model that holds the "selectedColor" of the color picker container.
 */
Ext.define('Ext.ux.colorpick.SelectorModel', {
    extend : 'Ext.app.ViewModel',
    alias  : 'viewmodel.colorpick-selectormodel',

    requires: [
        'Ext.ux.colorpick.ColorUtils'
    ],

    data: {
        selectedColor: {
            r : 255,  // red
            g : 255,  // green
            b : 255,  // blue
            h : 0,    // hue,
            s : 1,    // saturation
            v : 1,    // value
            a : 1     // alpha (opacity)
        },
        previousColor: {
            r : 0,    // red
            g : 0,    // green
            b : 0,    // blue
            h : 0,    // hue,
            s : 1,    // saturation
            v : 1,    // value
            a : 1     // alpha (opacity)
        }
    },

    formulas: {
        // Hexadecimal representation of the color
        hex: {
            get: function (get) {
                var r = get('selectedColor.r').toString(16),
                    g = get('selectedColor.g').toString(16),
                    b = get('selectedColor.b').toString(16),
                    result;

                result = Ext.ux.colorpick.ColorUtils.rgb2hex(r, g, b);
                return '#' + result;
            },

            set: function (hex) {
                var rgb = Ext.ux.colorpick.ColorUtils.hex2rgb(hex);
                this.changeRGB(rgb);
            }
        },

        // "R" in "RGB"
        red: {
            get: function(get) {
                return get('selectedColor.r');
            },

            set: function(r) {
                this.changeRGB({ r: r });
            }
        },

        // "G" in "RGB"
        green: {
            get: function(get) {
                return get('selectedColor.g');
            },

            set: function(g) {
                this.changeRGB({ g: g });
            }
        },

        // "B" in "RGB"
        blue: {
            get: function(get) {
                return get('selectedColor.b');
            },

            set: function(b) {
                this.changeRGB({ b: b });
            }
        },

        // "H" in HSV
        hue: {
            get: function(get) {
                return get('selectedColor.h') * 360;
            },

            set: function(hue) {
                this.changeHSV({ h: hue / 360 });
            }
        },

        // "S" in HSV
        saturation: {
            get : function(get) {
                return get('selectedColor.s') * 100;
            },

            set: function(saturation) {
                this.changeHSV({ s: saturation / 100 });
            }
        },

        // "V" in HSV
        value: {
            get: function(get) {
                var v = get('selectedColor.v');
                return v * 100;
            },

            set: function(value) {
                this.changeHSV({ v: value / 100 });
            }
        },

        alpha: {
            get: function(data) {
                var a = data('selectedColor.a');
                return a * 100;
            },

            set: function(alpha) {
                this.set('selectedColor', Ext.applyIf({
                    a: alpha / 100
                }, this.data.selectedColor));
            }
        }
    }, // formulas

    changeHSV: function (hsv) {
        Ext.applyIf(hsv, this.data.selectedColor);

        var rgb = Ext.ux.colorpick.ColorUtils.hsv2rgb(hsv.h, hsv.s, hsv.v);

        hsv.r = rgb.r;
        hsv.g = rgb.g;
        hsv.b = rgb.b;

        this.set('selectedColor', hsv);
    },

    changeRGB: function (rgb) {
        Ext.applyIf(rgb, this.data.selectedColor);

        var hsv = Ext.ux.colorpick.ColorUtils.rgb2hsv(rgb.r, rgb.g, rgb.b);

        rgb.h = hsv.h;
        rgb.s = hsv.s;
        rgb.v = hsv.v;

        this.set('selectedColor', rgb);
    }
});

Ext.define('Ext.ux.colorpick.SelectorController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.colorpick-selectorcontroller',

    requires: [
        'Ext.ux.colorpick.ColorUtils'
    ],

    initViewModel: function () {
        var me = this,
            view = me.getView();

        // And ensure that the
        view.childViewModel.bind('{selectedColor}', function (color) {
            view.setColor(color);
        });
    },

    destroy: function () {
        var me = this,
            view = me.getView(),
            childViewModel = view.childViewModel;

        if (childViewModel) {
            childViewModel.destroy();
            view.childViewModel = null;
        }

        me.callParent();
    },

    changeHSV: function (hsv) {
        var view = this.getView(),
            color = view.getColor(),
            rgb;

        // Put in values we are not changing (like A, but also missing HSV values)
        Ext.applyIf(hsv, color);

        // Now that HSV is complete, recalculate RGB and combine them
        rgb = Ext.ux.colorpick.ColorUtils.hsv2rgb(hsv.h, hsv.s, hsv.v);
        Ext.apply(hsv, rgb);

        view.setColor(hsv);
    },

    // Updates Saturation/Value in the model based on ColorMap; params:
    // xPercent - where is the handle relative to the color map width
    // yPercent - where is the handle relative to the color map height
    onColorMapHandleDrag: function(xPercent, yPercent) {
        this.changeHSV({
            s: xPercent,
            v: 1 - yPercent
        });
    },

    // Updates HSV Value in the model and downstream RGB settings
    onValueSliderHandleDrag: function(yPercent) {
        this.changeHSV({
            v: 1 - yPercent
        });
    },

    // Updates HSV Saturation in the model and downstream RGB settings
    onSaturationSliderHandleDrag: function(yPercent) {
        this.changeHSV({
            s: 1 - yPercent
        });
    },

    // Updates Hue in the model and downstream RGB settings
    onHueSliderHandleDrag: function(yPercent) {
        this.changeHSV({
            h: 1 - yPercent
        });
    },

    onAlphaSliderHandleDrag: function (yPercent) {
        var view = this.getView(),
            color = view.getColor(),
            newColor = Ext.applyIf({
                a: 1 - yPercent
            }, color);

        view.setColor(newColor);
    },

    onPreviousColorSelected: function (comp, color) {
        var view = this.getView();

        view.setColor(color);
    },

    onOK: function () {
        var me   = this,
            view = me.getView();

        view.fireEvent('ok', view, view.getValue());
    },

    onCancel: function () {
        this.fireViewEvent('cancel', this.getView());
    },

    onResize: function() {
        var me   = this,
            view = me.getView(),
            vm   = view.childViewModel;

        // Skip initial rendering resize
        if (!me.hasResizedOnce) {
            me.hasResizedOnce = true;
            return;
        }

        // Reposition the colormap's & sliders' drag handles
        view.down('colorpickercolormap').setPosition(vm.getData());
        view.down('colorpickersliderhue').setHue(vm.get('hue'));
        view.down('colorpickerslidersaturation').setSaturation(vm.get('saturation'));
        view.down('colorpickerslidervalue').setValue(vm.get('value'));
        view.down('colorpickerslideralpha').setAlpha(vm.get('alpha'));
    }
});

/**
 * A basic component that changes background color, with considerations for opacity
 * support (checkered background image and IE8 support).
 */
Ext.define('Ext.ux.colorpick.ColorPreview', {
    extend     : 'Ext.Component',
    alias      : 'widget.colorpickercolorpreview',

    requires: [
        'Ext.util.Format'
    ],

    //hack to solve issue with IE, when applying a filter the click listener is not being fired.
    style: 'position: relative',
    html: '<div class="filter" style="height:100%; width:100%; position: absolute;"></div>'+
          '<a class="btn" style="height:100%; width:100%; position: absolute;"></a>',
    //eo hack

    cls: 'x-colorpreview',

    height: 256,

    onRender: function () {
        var me = this;

        me.callParent(arguments);

        me.mon(me.el.down('.btn'), 'click', me.onClick, me);
    },

    onClick: function () {
        this.fireEvent('click', this, this.color);
    },

    // Called via databinding - update background color whenever ViewModel changes
    setColor: function(color) {
        var me = this,
            el = me.getEl();

        // Too early in rendering cycle; skip
        if (!el) {
            return;
        }
        me.color = color;

        me.applyBgStyle(color);
    },

    bgStyleTpl: Ext.create('Ext.XTemplate',
        Ext.isIE && Ext.ieVersion < 10 ?
          'filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=\'#{hexAlpha}{hex}\', endColorstr=\'#{hexAlpha}{hex}\');' /* IE6-9 */
        : 'background: {rgba};'
    ),

    applyBgStyle: function (color) {
        var me         = this,
            colorUtils = Ext.ux.colorpick.ColorUtils,
            el         = me.getEl().down('.filter'),
            hex, alpha, rgba, bgStyle;

        hex     = colorUtils.rgb2hex(color.r, color.g, color.b);
        alpha   = Ext.util.Format.hex(Math.floor(color.a * 255), 2);
        rgba    = colorUtils.getRGBAString(color);
        bgStyle = this.bgStyleTpl.apply({hex: hex, hexAlpha: alpha, rgba: rgba});

        el.applyStyles(bgStyle);
    }
});

Ext.define('Ext.ux.colorpick.SliderController', {
    extend : 'Ext.app.ViewController',
    alias: 'controller.colorpick-slidercontroller',

    // After the component is rendered
    onFirstBoxReady: function() {
        var me         = this,
            view       = me.getView(),
            container  = view.getDragContainer(),
            dragHandle = view.getDragHandle(),
            dd         = dragHandle.dd;

        // configure draggable constraints 
        dd.constrain = true;
        dd.constrainTo = container.getEl();
        dd.initialConstrainTo = dd.constrainTo; // needed otheriwse error EXTJS-13187
        
        // event handlers
        dd.on('drag', me.onHandleDrag, me);
        me.mon(view.getEl(), {
            mousedown: me.onMouseDown,
            mouseup: me.onMouseUp,
            scope: me
        });
    },

    // Fires when handle is dragged; fires "handledrag" event on the slider
    // with parameter  "percentY" 0-1, representing the handle position on the slider
    // relative to the height
    onHandleDrag: function(e) {
        var me              = this,
            view            = me.getView(),
            container       = view.getDragContainer(),
            dragHandle      = view.getDragHandle(),
            y               = dragHandle.getY() - container.getY(),
            containerEl     = container.getEl(),
            containerHeight = containerEl.getHeight(),
            yRatio          = y/containerHeight;

        // Adjust y ratio for dragger always being 1 pixel from the edge on the bottom
        if (yRatio > 0.99) {
            yRatio = 1;
        }

        view.fireEvent('handledrag', yRatio);
    },

    // Whenever we mousedown over the slider area
    onMouseDown: function(e) {
        var me         = this,
            view       = me.getView(),
            dragHandle = view.getDragHandle();

        // position drag handle accordingly
        dragHandle.setY(e.getY());
        me.onHandleDrag();

        // tie into the default dd mechanism
        dragHandle.dd.onMouseDown(e, dragHandle.dd.el);
    },

    onMouseUp: function () {
        var view       = this.getView(),
            dragHandle = view.getDragHandle();

        dragHandle.dd.dragEnded = true; // work around DragTracker bug
    }
});

/**
 * Parent view for the 4 sliders seen on the color picker window.
 */
Ext.define('Ext.ux.colorpick.Slider', {
    extend     : 'Ext.container.Container',
    xtype      : 'colorpickerslider',
    controller : 'colorpick-slidercontroller',

    baseCls : 'x-colorpicker-slider',
    layout  : 'center',

    requires: [
        'Ext.layout.container.Center',
        'Ext.ux.colorpick.SliderController'
    ],

    referenceHolder: true,

    // Container for the drag handle; needed since the slider
    // is of static size, while the parent container positions
    // it in the center; this is what receives the beautiful
    // color gradients for the visual
    items: [{
        xtype     : 'container',
        cls       : 'draghandle-container',
        reference : 'dragHandleContainer',
        height    : '100%',

        // This is the drag handle; note it's 100%x1 in size to allow full 
        // vertical drag travel; the inner div has the bigger image
        items: [{
            xtype     : 'component',
            cls       : 'draghandle-outer',
            reference : 'dragHandle',
            width     : '100%',
            height    : 1,
            draggable : true,
            html      : '<div class="draghandle"></div>'
        }]
    }],

    listeners : {
        boxready: 'onFirstBoxReady',
        single  : true
    },

    // Called via data binding whenever selectedColor.h changes;
    setHue: function () {
        Ext.Error.raise('Must implement setHue() in a child class!');
    },

    getDragHandle: function () {
        return this.lookupReference('dragHandle');
    },

    getDragContainer: function () {
        return this.lookupReference('dragHandleContainer');
    }
});

/**
 * Used for "Value" slider
 */
Ext.define('Ext.ux.colorpick.SliderAlpha', {
    extend : 'Ext.ux.colorpick.Slider',
    alias  : 'widget.colorpickerslideralpha',
    cls    : 'alpha',

    requires: [
        'Ext.XTemplate'
    ],

    gradientStyleTpl: Ext.create('Ext.XTemplate',
        Ext.isIE && Ext.ieVersion < 10
        ? 'filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=\'#FF{hex}\', endColorstr=\'#00{hex}\');' /* IE6-9 */
        : 'background: -mox-linear-gradient(top, rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);' +   /* FF3.6+ */
          'background: -webkit-linear-gradient(top,rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);' + /* Chrome10+,Safari5.1+ */
          'background: -o-linear-gradient(top, rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);' +      /* Opera 11.10+ */
          'background: -ms-linear-gradient(top, rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);' +     /* IE10+ */
          'background: linear-gradient(to bottom, rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);'     /* W3C */
    ),

    // Called via data binding whenever selectedColor.a changes; param is 0-100
    setAlpha: function (value) {
        var me              = this,
            container       = me.getDragContainer(),
            dragHandle      = me.getDragHandle(),
            containerEl     = container.getEl(),
            containerHeight = containerEl.getHeight(),
            yRatio,
            top;

        // Too early in the render cycle? Skip event
        if (!dragHandle.dd || !dragHandle.dd.constrain) {
            return;
        }

        // User actively dragging? Skip event
        if (typeof dragHandle.dd.dragEnded !== 'undefined' && !dragHandle.dd.dragEnded) {
            return;
        }

        // y-axis of slider with value 0-1 translates to reverse of "value"
        yRatio = 1-(value/100);
        top = containerHeight*yRatio;

        // Position dragger
        dragHandle.getEl().setStyle({
            top  : top + 'px'
        });
    },

    // Called via data binding whenever selectedColor.h changes; hue param is 0-1
    setColor: function(color) {
        var me = this,
            container = me.getDragContainer(),
            hex, el;

        // Too early in the render cycle? Skip event
        if (!me.getEl()) {
            return;
        }

        // Determine HEX for new hue and set as background based on template
        hex = Ext.ux.colorpick.ColorUtils.rgb2hex(color.r, color.g, color.b);

        el = container.getEl().down('.x-autocontainer-innerCt');
        el.applyStyles(me.gradientStyleTpl.apply({hex: hex, r: color.r, g: color.g, b: color.b}));
    }
});

/**
 * Used for "Saturation" slider
 */
Ext.define('Ext.ux.colorpick.SliderSaturation', {
    extend : 'Ext.ux.colorpick.Slider',
    alias  : 'widget.colorpickerslidersaturation',
    cls    : 'saturation',

    gradientStyleTpl: Ext.create('Ext.XTemplate',
        Ext.isIE && Ext.ieVersion < 10
        ? 'filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=\'#{hex}\', endColorstr=\'#ffffff\');' /* IE6-9 */
        : 'background: -mox-linear-gradient(top, #{hex} 0%, #ffffff 100%);' +   /* FF3.6+ */
          'background: -webkit-linear-gradient(top, #{hex} 0%,#ffffff 100%);' + /* Chrome10+,Safari5.1+ */
          'background: -o-linear-gradient(top, #{hex} 0%,#ffffff 100%);' +      /* Opera 11.10+ */
          'background: -ms-linear-gradient(top, #{hex} 0%,#ffffff 100%);' +     /* IE10+ */
          'background: linear-gradient(to bottom, #{hex} 0%,#ffffff 100%);'     /* W3C */
    ),

    // Called via data binding whenever selectedColor.s changes; saturation param is 0-100
    setSaturation: function(saturation) {
        var me              = this,
            container       = me.getDragContainer(),
            dragHandle      = me.getDragHandle(),
            containerEl     = container.getEl(),
            containerHeight = containerEl.getHeight(),
            yRatio,
            top;

        // Too early in the render cycle? Skip event
        if (!dragHandle.dd || !dragHandle.dd.constrain) {
            return;
        }

        // User actively dragging? Skip event
        if (typeof dragHandle.dd.dragEnded !== 'undefined' && !dragHandle.dd.dragEnded) {
            return;
        }

        // y-axis of slider with value 0-1 translates to reverse of "saturation"
        yRatio = 1-(saturation/100);
        top = containerHeight*yRatio;

        // Position dragger
        dragHandle.getEl().setStyle({
            top  : top + 'px'
        });
    },

    // Called via data binding whenever selectedColor.h changes; hue param is 0-1
    setHue: function(hue) {
        var me = this,
            container = me.getDragContainer(),
            rgb, hex;

        // Too early in the render cycle? Skip event
        if (!me.getEl()) {
            return;
        }

        // Determine HEX for new hue and set as background based on template
        rgb = Ext.ux.colorpick.ColorUtils.hsv2rgb(hue, 1, 1);
        hex = Ext.ux.colorpick.ColorUtils.rgb2hex(rgb.r, rgb.g, rgb.b);
        container.getEl().applyStyles(me.gradientStyleTpl.apply({hex: hex}));
    }
});

/**
 * Used for "Value" slider
 */
Ext.define('Ext.ux.colorpick.SliderValue', {
    extend : 'Ext.ux.colorpick.Slider',
    alias  : 'widget.colorpickerslidervalue',
    cls    : 'value',

    requires: [
        'Ext.XTemplate'
    ],

    gradientStyleTpl: Ext.create('Ext.XTemplate',
        Ext.isIE && Ext.ieVersion < 10
        ? 'filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=\'#{hex}\', endColorstr=\'#000000\');' /* IE6-9 */
        : 'background: -mox-linear-gradient(top, #{hex} 0%, #000000 100%);' +   /* FF3.6+ */
          'background: -webkit-linear-gradient(top, #{hex} 0%,#000000 100%);' + /* Chrome10+,Safari5.1+ */
          'background: -o-linear-gradient(top, #{hex} 0%,#000000 100%);' +      /* Opera 11.10+ */
          'background: -ms-linear-gradient(top, #{hex} 0%,#000000 100%);' +     /* IE10+ */
          'background: linear-gradient(to bottom, #{hex} 0%,#000000 100%);'     /* W3C */
    ),

    // Called via data binding whenever selectedColor.v changes; value param is 0-100
    setValue: function(value) {
        var me              = this,
            container       = me.getDragContainer(),
            dragHandle      = me.getDragHandle(),
            containerEl     = container.getEl(),
            containerHeight = containerEl.getHeight(),
            yRatio,
            top;

        // Too early in the render cycle? Skip event
        if (!dragHandle.dd || !dragHandle.dd.constrain) {
            return;
        }

        // User actively dragging? Skip event
        if (typeof dragHandle.dd.dragEnded !== 'undefined' && !dragHandle.dd.dragEnded) {
            return;
        }

        // y-axis of slider with value 0-1 translates to reverse of "value"
        yRatio = 1-(value/100);
        top = containerHeight*yRatio;

        // Position dragger
        dragHandle.getEl().setStyle({
            top  : top + 'px'
        });
    },

    // Called via data binding whenever selectedColor.h changes; hue param is 0-1
    setHue: function(hue) {
        var me = this,
            container = me.getDragContainer(),
            rgb, hex;

        // Too early in the render cycle? Skip event
        if (!me.getEl()) {
            return;
        }

        // Determine HEX for new hue and set as background based on template
        rgb = Ext.ux.colorpick.ColorUtils.hsv2rgb(hue, 1, 1);
        hex = Ext.ux.colorpick.ColorUtils.rgb2hex(rgb.r, rgb.g, rgb.b);
        container.getEl().applyStyles(me.gradientStyleTpl.apply({hex: hex}));
    }
});

/**
 * Used for "Hue" slider
 */
Ext.define('Ext.ux.colorpick.SliderHue', {
    extend : 'Ext.ux.colorpick.Slider',
    alias  : 'widget.colorpickersliderhue',
    cls    : 'hue',

    afterRender: function () {
        var me  = this,
            src = me.gradientUrl,
            el  = me.el;

        me.callParent();
        
        if (!src) {
            // We do this trick to allow the Sass to calculate resource image path for
            // our package and pick up the proper image URL here.
            src = el.getStyle('background-image');
            src = src.substring(4, src.length - 1);  // strip off outer "url(...)"

            // In IE8 this path will have quotes around it
            if (src.indexOf('"') === 0) {
                src = src.substring(1, src.length-1);
            }

            // Then remember it on our prototype for any subsequent instances.
            Ext.ux.colorpick.SliderHue.prototype.gradientUrl = src;
        }

        // Now clear that style because it will conflict with the background-color
        el.setStyle('background-image', 'none');

        // Create the image with the background PNG
        el = me.getDragContainer().layout.getElementTarget(); // the el for items and html
        el.createChild({
            tag: 'img',
            cls: 'hue-gradient',
            src: src
        });
    },


    // Called via data binding whenever selectedColor.h changes; hue param is 0-1
    setHue: function(hue) {
        var me              = this,
            container       = me.getDragContainer(),
            dragHandle      = me.getDragHandle(),
            containerEl     = container.getEl(),
            containerHeight = containerEl.getHeight(),
            yRatio,
            top;

        // Too early in the render cycle? Skip event
        if (!dragHandle.dd || !dragHandle.dd.constrain) {
            return;
        }

        // User actively dragging? Skip event
        if (typeof dragHandle.dd.dragEnded !== 'undefined' && !dragHandle.dd.dragEnded) {
            return;
        }

        // y-axis of slider with value 0-1 translates to reverse of "hue"
        yRatio = 1-hue;
        top = containerHeight*yRatio;

        // Position dragger
        dragHandle.getEl().setStyle({
            top  : top + 'px'
        });
    }
});

/**
 * Sencha Pro Services presents xtype "colorselector".
 * API has been kept as close to the regular colorpicker as possible. The Selector can be
 * rendered to any container.
 *
 * The defaul selected color is configurable via {@link #value} config. Usually used in
 * forms via {@link Ext.ux.colorpick.Button} or {@link Ext.ux.colorpick.Field}.
 *
 * Typically you will need to listen for the change event to be notified when the user
 * chooses a color. Alternatively, you can bind to the "value" config
 *
 *     @example
 *     Ext.create('Ext.ux.colorpick.Selector', {
 *         value     : '993300',  // initial selected color
 *         renderTo  : Ext.getBody(),
 *         listeners: {
 *             change: function (colorselector, color) {
 *                 console.log('New color: ' + color);
 *             }
 *         }
 *     });
 */
Ext.define('Ext.ux.colorpick.Selector', {
    extend: 'Ext.container.Container',
    xtype: 'colorselector',

    mixins: [
        'Ext.ux.colorpick.Selection'
    ],

    controller : 'colorpick-selectorcontroller',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.form.field.Text',
        'Ext.form.field.Number',

        'Ext.ux.colorpick.ColorMap',
        'Ext.ux.colorpick.SelectorModel',
        'Ext.ux.colorpick.SelectorController',
        'Ext.ux.colorpick.ColorPreview',
        'Ext.ux.colorpick.Slider',
        'Ext.ux.colorpick.SliderAlpha',
        'Ext.ux.colorpick.SliderSaturation',
        'Ext.ux.colorpick.SliderValue',
        'Ext.ux.colorpick.SliderHue'
    ],

    width  : 580, // default width and height gives 255x255 color map in Crisp
    height : 337,

    cls     : 'x-colorpicker',
    padding : 10,
    layout  : {
        type  : 'hbox',
        align : 'stretch'
    },

    defaultBindProperty: 'value',
    twoWayBindable: [
        'value'
    ],

    /**
     * @cfg fieldWidth {Number} Width of the text fields on the container (excluding HEX);
     * since the width of the slider containers is the same as the text field under it 
     * (it's the same vbox column), changing this value will also affect the spacing between
     * the sliders.
     */
    fieldWidth: 50,

    /**
     * @cfg fieldPad {Number} padding between the sliders and HEX/R/G/B fields.
     */    
    fieldPad: 5,

    /**
     * @cfg {Boolean} [showPreviousColor]
     * Whether "previous color" region (in upper right, below the selected color preview) should be shown;
     * these are relied upon by the {@link Ext.ux.colorpick.Button} and the {@link Ext.ux.colorpick.Field}.
     */
    showPreviousColor: false,

    /**
     * @cfg {Boolean} [showOkCancelButtons]
     * Whether Ok and Cancel buttons (in upper right, below the selected color preview) should be shown;
     * these are relied upon by the {@link Ext.ux.colorpick.Button} and the {@link Ext.ux.colorpick.Field}.
     */
    showOkCancelButtons: false,

    /**
     * @event change
     * Fires when a color is selected. Simply dragging sliders around will trigger this.
     * @param {Ext.ux.colorpick.Selector} this
     * @param {String} color The value of the selected color as per specified {@link #format}.
     * @param {String} previousColor The previous color value.
     */

    /**
     * @event ok
     * Fires when OK button is clicked (see {@link #showOkCancelButtons}).
     * @param {Ext.ux.colorpick.Selector} this
     * @param {String} color The value of the selected color as per specified {@link #format}.
     */

    /**
     * @event cancel
     * Fires when Cancel button is clicked (see {@link #showOkCancelButtons}).
     * @param {Ext.ux.colorpick.Selector} this
     */

    listeners: {
        resize: 'onResize'
    },

    constructor: function (config) {
        var me             = this,
            childViewModel = Ext.Factory.viewModel('colorpick-selectormodel');

        // Since this component needs to present its value as a thing to which users can
        // bind, we create an internal VM for our purposes.
        me.childViewModel = childViewModel;
        me.items = [
            me.getMapAndHexRGBFields(childViewModel),
            me.getSliderAndHField(childViewModel),
            me.getSliderAndSField(childViewModel),
            me.getSliderAndVField(childViewModel),
            me.getSliderAndAField(childViewModel),
            me.getPreviewAndButtons(childViewModel, config)
        ];

        me.callParent(arguments);
    },

    updateColor: function (color) {
        var me = this;

        me.mixins.colorselection.updateColor.call(me, color);

        me.childViewModel.set('selectedColor', color);
    },

    updatePreviousColor: function (color) {
        this.childViewModel.set('previousColor', color);
    },

    // Splits up view declaration for readability
    // "Map" and HEX/R/G/B fields
    getMapAndHexRGBFields: function (childViewModel) {
        var me = this;
        return {
            xtype     : 'container',
            viewModel : childViewModel,
            cls       : 'x-colopicker-escape-overflow',
            flex      : 1,
            layout    : {
                type  : 'vbox',
                align : 'stretch'
            },
            margin : '0 10 0 0',
            items  : [
                // "MAP"
                {
                    xtype : 'colorpickercolormap',
                    flex  : 1,
                    bind  : {
                        position: {
                            bindTo : '{selectedColor}',
                            deep   : true
                        },
                        hue: '{selectedColor.h}'
                    },
                    listeners : {
                        handledrag: {
                            fn: 'onColorMapHandleDrag'
                            // scope : 'controller' // cannot use here; EXTJS-13185
                        }
                    }
                },
                // HEX/R/G/B FIELDS
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    defaults : {
                        labelSeparator : '',
                        allowBlank     : false,
                        onChange       : function() { // prevent data binding propagation if bad value
                            var me = this;
                            if (me.isValid()) {
                                // this is kind of dirty and ideally we would extend these fields
                                // and override the method, but works for now
                                Ext.form.field.Base.prototype.onChange.apply(me, arguments);
                            }
                        }
                    },
                    items: [
                        {
                            xtype      : 'textfield',
                            fieldLabel : 'HEX',
                            labelAlign : 'top',
                            flex       : 1,
                            bind       : '{hex}',
                            margin     : { top: 0, right: me.fieldPad, bottom: 0, left: 0 },
                            readOnly   : true
                        },
                        {
                            xtype       : 'numberfield',
                            fieldLabel  : 'R',
                            labelAlign  : 'top',
                            bind        : '{red}',
                            width       : me.fieldWidth,
                            hideTrigger : true,
                            maxValue    : 255,
                            minValue    : 0,
                            margin      : { top: 0, right: me.fieldPad, bottom: 0, left: 0 }
                        },
                        {
                            xtype       : 'numberfield',
                            fieldLabel  : 'G',
                            labelAlign  : 'top',
                            bind        : '{green}',
                            width       : me.fieldWidth,
                            hideTrigger : true,
                            maxValue    : 255,
                            minValue    : 0,
                            margin      : { top: 0, right: me.fieldPad, bottom: 0, left: 0 }
                        },
                        {
                            xtype       : 'numberfield',
                            fieldLabel  : 'B',
                            labelAlign  : 'top',
                            bind        : '{blue}',
                            width       : me.fieldWidth,
                            hideTrigger : true,
                            maxValue    : 255,
                            minValue    : 0,
                            margin      : 0
                        }
                    ]
                }
            ]
        };
    },

    // Splits up view declaration for readability
    // Slider and H field 
    getSliderAndHField: function (childViewModel) {
        var me = this;
        return {
            xtype     : 'container',
            viewModel : childViewModel,
            cls       : 'x-colopicker-escape-overflow',
            width     : me.fieldWidth,
            layout    : {
                type  : 'vbox',
                align : 'stretch'
            },
            items  : [
                {
                    xtype: 'colorpickersliderhue',
                    flex  : 1,
                    bind: {
                        hue: '{selectedColor.h}'
                    },
                    listeners: {
                        handledrag: 'onHueSliderHandleDrag'
                    }
                },
                {
                    xtype          : 'numberfield',
                    fieldLabel     : 'H',
                    labelAlign     : 'top',
                    width          : me.fieldWidth,
                    labelSeparator : '',
                    bind           : '{hue}',
                    hideTrigger    : true,
                    maxValue       : 360,
                    minValue       : 0,
                    allowBlank     : false,
                    margin         : 0
                }
            ]
        };
    },

    // Splits up view declaration for readability
    // Slider and S field 
    getSliderAndSField: function (childViewModel) {
        var me = this;
        return {
            xtype     : 'container',
            viewModel : childViewModel,
            cls       : 'x-colopicker-escape-overflow',
            width     : me.fieldWidth,
            layout    : {
                type  : 'vbox',
                align : 'stretch'
            },
            margin: {
                right  : me.fieldPad,
                left   : me.fieldPad
            },
            items: [
                {
                    xtype : 'colorpickerslidersaturation',
                    flex  : 1,
                    bind  : {
                        saturation : '{saturation}',
                        hue        : '{selectedColor.h}'
                    },
                    listeners : {
                        handledrag: {
                            fn: 'onSaturationSliderHandleDrag'
                            // scope : 'controller' // cannot use here; EXTJS-13185
                        }
                    }
                },
                {
                    xtype          : 'numberfield',
                    fieldLabel     : 'S',
                    labelAlign     : 'top',
                    labelSeparator : '',
                    bind           : '{saturation}',
                    hideTrigger    : true,
                    maxValue       : 100,
                    minValue       : 0,
                    allowBlank     : false,
                    margin         : 0
                }
            ]
        };
    },

    // Splits up view declaration for readability
    // Slider and V field 
    getSliderAndVField: function (childViewModel) {
        var me = this;
        return {
            xtype     : 'container',
            viewModel : childViewModel,
            cls       : 'x-colopicker-escape-overflow',
            width     : me.fieldWidth,
            layout    : {
                type  : 'vbox',
                align : 'stretch'
            },
            items: [
                {
                    xtype : 'colorpickerslidervalue',
                    flex  : 1,
                    bind  : {
                        value : '{value}',
                        hue   : '{selectedColor.h}'
                    },
                    listeners : {
                        handledrag: {
                            fn: 'onValueSliderHandleDrag'
                            // scope : 'controller' // cannot use here; EXTJS-13185
                        }
                    }
                },
                {
                    xtype          : 'numberfield',
                    fieldLabel     : 'V',
                    labelAlign     : 'top',
                    labelSeparator : '',
                    bind           : '{value}',
                    hideTrigger    : true,
                    maxValue       : 100,
                    minValue       : 0,
                    allowBlank     : false,
                    margin         : 0
                }
            ]
        };
    },

    // Splits up view declaration for readability
    // Slider and A field 
    getSliderAndAField: function (childViewModel) {
        var me = this;
        return {
            xtype     : 'container',
            viewModel : childViewModel,
            cls       : 'x-colopicker-escape-overflow',
            width     : me.fieldWidth,
            layout    : {
                type  : 'vbox',
                align : 'stretch'
            },
            margin: {
                left: me.fieldPad
            },
            items: [
                {
                    xtype : 'colorpickerslideralpha',
                    flex  : 1,
                    bind  : {
                        alpha : '{alpha}',
                        color : {
                            bindTo: '{selectedColor}',
                            deep: true
                        }
                    },
                    listeners : {
                        handledrag: {
                            fn: 'onAlphaSliderHandleDrag'
                            // scope : 'controller' // cannot use here; EXTJS-13185
                        }
                    }
                },
                {
                    xtype          : 'numberfield',
                    fieldLabel     : 'A',
                    labelAlign     : 'top',
                    labelSeparator : '',
                    bind           : '{alpha}',
                    hideTrigger    : true,
                    maxValue       : 100,
                    minValue       : 0,
                    allowBlank     : false,
                    margin         : 0
                }
            ]
        };
    },

    // Splits up view declaration for readability
    // Preview current/previous color squares and OK and Cancel buttons
    getPreviewAndButtons: function (childViewModel, config) {
        // selected color preview is always shown
        var items = [{
            xtype : 'colorpickercolorpreview',
            flex  : 1,
            bind  : {
                color: {
                    bindTo : '{selectedColor}',
                    deep   : true
                }
            }
        }];

        // previous color preview is optional
        if (config.showPreviousColor) {
            items.push({
                xtype  : 'colorpickercolorpreview',
                flex   : 1,
                bind   : {
                    color: {
                        bindTo : '{previousColor}',
                        deep   : true
                    }
                },
                listeners: {
                    click: 'onPreviousColorSelected'
                }
            });
        }

        // Ok/Cancel buttons are optional
        if (config.showOkCancelButtons) {
            items.push({
                xtype   : 'button',
                text    : 'OK',
                margin  : '10 0 0 0',
                handler : 'onOK'
            },
            {
                xtype   : 'button',
                text    : 'Cancel',
                margin  : '10 0 0 0',
                handler : 'onCancel'
            });
        }

        return {
            xtype     : 'container',
            viewModel : childViewModel,
            width     : 70,
            margin    : '0 0 0 10',
            items     : items,
            layout    : {
                type  : 'vbox',
                align : 'stretch'
            }
        };
    }
});

Ext.define('Ext.ux.colorpick.ButtonController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.colorpick-buttoncontroller',

    requires: ['Ext.layout.container.Fit'],

    destroy: function () {
        var view = this.getView(),
            colorPickerWindow = view.colorPickerWindow;

        if (colorPickerWindow) {
            colorPickerWindow.destroy();
            view.colorPickerWindow = view.colorPicker = null;
        }

        this.callParent();
    },

    getPopup: function () {
        var view = this.getView(),
            popup = view.colorPickerWindow;

        if (!popup) {
            popup = Ext.create({
                xtype     : 'window',
                minWidth  : 540,
                minHeight : 200,
                layout    : 'fit',
                header    : false,
                resizable : true,
                items     : [{
                    xtype               : 'colorselector',
                    format              : view.getFormat(),
                    showPreviousColor   : true,
                    showOkCancelButtons : true,

                    listeners: {
                        ok     : 'onColorPickerOkBtn',
                        cancel : 'onColorPickerCancelBtn',
                        scope  : this
                    }
                }]
            });

            view.colorPickerWindow = popup;
            popup.colorPicker = view.colorPicker = popup.items.getAt(0);
        }

        return popup;
    },

    // When button is clicked show the color picker window
    onClick: function() {
        var me = this,
            view = me.getView(),
            color = view.getColor(),
            popup = me.getPopup(),
            colorPicker = popup.colorPicker;

        colorPicker.setColor(color);
        colorPicker.setPreviousColor(color);

        popup.showBy(view, 'tl-br?');
    },

    onColorPickerOkBtn: function (picker) {
        var view  = this.getView(),
            color = picker.getColor(),
            cpWin = view.colorPickerWindow;

        cpWin.hide();

        view.setColor(color);
    },

    onColorPickerCancelBtn: function () {
        var view  = this.getView(),
            cpWin = view.colorPickerWindow;

        cpWin.hide();
    }
});

/**
 * A button (not extending from Button) that can be clicked to bring up the
 * color picker. It also changes its color based on the color picker selection.
 * The defaul selected color is configurable via {@link #value}.
 *
 *     @example
 *     Ext.create('Ext.ux.colorpick.Button', {
 *         value     : '993300',  // initial selected color
 *         renderTo  : Ext.getBody(),
 *         listeners : {
 *             select: function(picker, selColor) {
 *                 alert(selColor);
 *             }
 *         }
 *     });
 */
Ext.define('Ext.ux.colorpick.Button', {
    extend     : 'Ext.Component',
    xtype      : 'colorbutton',

    controller : 'colorpick-buttoncontroller',

    mixins: [
        'Ext.ux.colorpick.Selection'
    ],

    requires: [
        'Ext.window.Window',
        'Ext.ux.colorpick.Selector',
        'Ext.ux.colorpick.ButtonController',
        'Ext.ux.colorpick.ColorUtils'
    ],

    baseCls : 'x-colorpicker-button',

    width: 20,
    height: 20,

    // hack to solve issue with IE, when applying a filter the click listener is not being fired.
    html: '<div class="filter" style="height:100%; width:100%; position: absolute;"></div>'+
          '<a class="btn" style="height:100%; width:100%; position: absolute;"></a>',
    // eo hack

    // button's background reflects the selected color
    bgStyleTpl: Ext.create('Ext.XTemplate',
        Ext.isIE && Ext.ieVersion < 10 ?
          'filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=\'#{hexAlpha}{hex}\', endColorstr=\'#{hexAlpha}{hex}\');' /* IE6-9 */
          : 'background: {rgba};'
    ),
    
    listeners: {
        click: 'onClick'
    },

    /**
     * @event change
     * Fires when a color is selected.
     * @param {Ext.ux.colorpick.Selector} this
     * @param {String} color The value of the selected color as per specified {@link #format}.
     * @param {String} previousColor The previous color value.
     */

    afterRender: function () {
        var me = this,
            btn;

        me.callParent();

        me.btn = btn = me.el.down('.btn');
        me.mon(btn, 'click', me.onClick, me);

        me.syncColor(me.getColor());
    },

    onClick: function (e) {
        this.fireEvent('click', this, e);
    },

    syncColor: function (color) {
        var ColorUtils = Ext.ux.colorpick.ColorUtils,
            me = this,
            el = me.getEl().down('.filter'),
            hex, alpha, rgba, bgStyle;

        hex     = ColorUtils.rgb2hex(color.r, color.g, color.b);
        alpha   = Math.floor(color.a * 255).toString(16) ;
        rgba    = ColorUtils.getRGBAString(color);
        bgStyle = me.bgStyleTpl.apply({hex: hex, hexAlpha: alpha, rgba: rgba});

        el.applyStyles(bgStyle);
    },

    updateColor: function (color) {
        var me = this,
            cp = me.colorPicker;

        me.mixins.colorselection.updateColor.call(me, color);

        if (me.rendered) {
            me.syncColor(color);
        }

        if (cp) {
            cp.setColor(color);
        }
    },

    // Sets this.format and color picker's setFormat()
    updateFormat: function(format) {
        var cp = this.colorPicker;

        if (cp) {
            cp.setFormat(format);
        }
    }
});

Ext.define('Ext.ux.colorpick.FieldController', {
    extend : 'Ext.app.ViewController',

    alias  : 'controller.colorpick-fieldcontroller',

    // When the Ok button is clicked on color picker, preserve the previous value
    onColorPickerOK: function (colorPicker) {
        var view = this.getView();

        view.setColor(colorPicker.getColor());

        view.collapse();
    },

    onColorPickerCancel: function () {
        var view = this.getView();

        view.collapse();
    }
});

/**
 * A field that can be clicked to bring up the color picker. The value changes based on the color picker selection.
 * The defaul selected color is configurable via {@link #value}.
 *
 *      @example
 *      Ext.create({
 *          xtype: 'colorfield',
 *          renderTo: Ext.getBody(),
 *
 *          value: '993300',  // initial selected color
 *
 *          listeners : {
 *              change: function (field, color) {
 *                  console.log('New color: ' + color);
 *              }
 *          }
 *      });
 */
Ext.define('Ext.ux.colorpick.Field', {
    extend: 'Ext.form.field.Picker',
    xtype: 'colorfield',

    mixins: [
        'Ext.ux.colorpick.Selection'
    ],

    controller: 'colorpick-fieldcontroller',

    requires: [
        'Ext.window.Window',
        'Ext.ux.colorpick.Selector',
        'Ext.ux.colorpick.FieldController',
        'Ext.ux.colorpick.ColorUtils',
        'Ext.layout.container.Fit'
    ],

    matchFieldWidth : false, // picker is usually wider than field
    editable        : false,

    beforeBodyEl: [
        '<div class="x-color-swatch" id="{id}-swatchEl" data-ref="swatchEl"></div>'
    ],

    cls: 'x-colorpicker-field',
    childEls: [
        'swatchEl'
    ],

    /**
     * @event change
     * Fires when a color is selected.
     * @param {Ext.ux.colorpick.Field} this
     * @param {String} color The value of the selected color as per specified {@link #format}.
     * @param {String} previousColor The previous color value.
     */

    // override as required by parent pickerfield
    createPicker: function() {
        var me     = this,
            picker = {
                xtype               : 'colorselector',
                format              : me.getFormat(),
                showPreviousColor   : true,
                showOkCancelButtons : true,
                color               : me.getColor(),
                listeners           : {
                    ok     : 'onColorPickerOK',
                    cancel : 'onColorPickerCancel'
                }
            };

        // create a color picker instance but don't render yet
        me.colorPicker = picker = Ext.create(picker);

        // the window will actually be shown and will house the picker
        me.colorPickerWindow = Ext.widget('window', {
            items     : [ picker ],
            minWidth  : 540,
            minHeight : 200,
            header    : false,
            resizable : true,
            layout    : 'fit'
        });

        return me.colorPickerWindow;
    },

    afterRender: function () {
        this.callParent();
        this.updateValue(this.value);
    },

    onExpand: function () {
        var color = this.getColor();
        this.colorPicker.setPreviousColor(color);
    },

    // Expects value formatted as per "format" config
    setValue: function(color) {
        var me = this,
            c = me.applyValue(color),
            current = me.value;

        me.callParent([c]);

        if (current !== c) {
            me.updateValue(c);
        }
    },

    // Sets this.format and color picker's setFormat()
    updateFormat: function(format) {
        var cp = this.colorPicker;

        if (cp) {
            cp.setFormat(format);
        }
    },

    updateValue: function (color) {
        var me = this,
            swatchEl = me.swatchEl,
            c;

        // If the "value" is changed, update "color" as well. Since these are always
        // tracking each other, we guard against the case where we are being updated
        // *because* "color" is being set.
        if (!me.syncing) {
            me.syncing = true;
            me.setColor(color);
            me.syncing = false;
        }

        c = me.getColor();

        if (swatchEl) {
            c = Ext.ux.colorpick.ColorUtils.formats['#hex6'](c);
            swatchEl.setStyle('background-color', c);
        }

        if (me.colorPicker) {
            me.colorPicker.setColor(c);
        }
    }
});

