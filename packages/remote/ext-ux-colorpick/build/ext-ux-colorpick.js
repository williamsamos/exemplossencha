Ext.define("Ext.ux.colorpick.Selection",{mixinId:"colorselection",config:{format:"hex6",value:"FF0000",color:null,previousColor:null},applyColor:function(a){var b=a;if(Ext.isString(b)){b=Ext.ux.colorpick.ColorUtils.parseColor(a)}return b},applyValue:function(a){var b=Ext.ux.colorpick.ColorUtils.parseColor(a);return this.formatColor(b)},formatColor:function(a){return Ext.ux.colorpick.ColorUtils.formats[this.getFormat()](a)},updateColor:function(a){var b=this;if(!b.syncing){b.syncing=true;b.setValue(b.formatColor(a));b.syncing=false}},updateValue:function(c,a){var b=this;if(!b.syncing){b.syncing=true;b.setColor(c);b.syncing=false}this.fireEvent("change",b,c,a)}});Ext.define("Ext.ux.colorpick.ColorUtils",{statics:{formats:{HEX6:function(a){return Ext.ux.colorpick.ColorUtils.rgb2hex(a.r,a.g,a.b)},HEX8:function(a){var c=Ext.ux.colorpick.ColorUtils.rgb2hex(a.r,a.g,a.b),b=Math.round(a.a*255).toString(16);if(b.length<2){c+="0"}c+=b.toUpperCase();return c}},hexRe:/#?([0-9a-f]{3,8})/i,rgbaAltRe:/rgba\(\s*([\w#\d]+)\s*,\s*([\d\.]+)\s*\)/,rgbaRe:/rgba\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)/,rgbRe:/rgb\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)/,parseColor:function(a){if(!a){return null}var f=this,e=f.colorMap[a],d,c,b;if(e){c={r:e[0],g:e[1],b:e[2],a:1}}else{if(a==="transparent"){c={r:0,g:0,b:0,a:0}}else{d=f.hexRe.exec(a);if(d){d=d[1];switch(d.length){default:return null;case 3:c={r:parseInt(d[0]+d[0],16),g:parseInt(d[1]+d[1],16),b:parseInt(d[2]+d[2],16),a:1};break;case 6:case 8:c={r:parseInt(d.substr(0,2),16),g:parseInt(d.substr(2,2),16),b:parseInt(d.substr(4,2),16),a:parseInt(d.substr(6,2)||"ff",16)/255};break}}else{d=f.rgbaRe.exec(a);if(d){c={r:parseFloat(d[1]),g:parseFloat(d[2]),b:parseFloat(d[3]),a:parseFloat(d[4])}}else{d=f.rgbaAltRe.exec(a);if(d){c=f.parseColor(d[1]);c.a=parseFloat(d[2]);return c}d=f.rgbRe.exec(a);if(d){c={r:parseFloat(d[1]),g:parseFloat(d[2]),b:parseFloat(d[3]),a:1}}else{return null}}}}}b=this.rgb2hsv(c.r,c.g,c.b);return Ext.apply(c,b)},getRGBAString:function(a){return"rgba("+a.r+","+a.g+","+a.b+","+a.a+")"},getRGBString:function(a){return"rgb("+a.r+","+a.g+","+a.b+")"},hsv2rgb:function(i,g,e){i=i*360;if(i===360){i=0}var j=e*g;var d=i/60;var b=j*(1-Math.abs(d%2-1));var f=[0,0,0];switch(Math.floor(d)){case 0:f=[j,b,0];break;case 1:f=[b,j,0];break;case 2:f=[0,j,b];break;case 3:f=[0,b,j];break;case 4:f=[b,0,j];break;case 5:f=[j,0,b];break;default:break}var a=e-j;f[0]+=a;f[1]+=a;f[2]+=a;f[0]=Math.round(f[0]*255);f[1]=Math.round(f[1]*255);f[2]=Math.round(f[2]*255);return{r:f[0],g:f[1],b:f[2]}},rgb2hsv:function(a,f,k){a=a/255;f=f/255;k=k/255;var i=Math.max(a,f,k);var d=Math.min(a,f,k);var j=i-d;var n=0;if(j!==0){if(i===a){n=((f-k)/j)%6}else{if(i===f){n=((k-a)/j)+2}else{if(i===k){n=((a-f)/j)+4}}}}var e=n*60;if(e===360){e=0}var l=i;var o=0;if(j!==0){o=j/l}e=e/360;if(e<0){e=e+1}return{h:e,s:o,v:l}},rgb2hex:function(d,c,a){d=d.toString(16);c=c.toString(16);a=a.toString(16);if(d.length<2){d="0"+d}if(c.length<2){c="0"+c}if(a.length<2){a="0"+a}return(d+c+a).toUpperCase()},colorMap:{aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,132,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,255,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,203],powderblue:[176,224,230],purple:[128,0,128],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[119,128,144],slategrey:[119,128,144],snow:[255,255,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,5]}}},function(c){var a=c.formats,b={};a["#HEX6"]=function(d){return"#"+a.HEX6(d)};a["#HEX8"]=function(d){return"#"+a.HEX8(d)};Ext.Object.each(a,function(d,e){b[d.toLowerCase()]=function(f){var g=e(f);return g.toLowerCase()}});Ext.apply(a,b)});Ext.define("Ext.ux.colorpick.ColorMapController",{extend:"Ext.app.ViewController",alias:"controller.colorpickercolormapcontroller",requires:["Ext.ux.colorpick.ColorUtils"],onFirstBoxReady:function(){var d=this,c=d.getView(),b=c.down("#dragHandle"),a=b.dd;a.constrain=true;a.constrainTo=c.getEl();a.initialConstrainTo=a.constrainTo;a.on("drag",Ext.bind(d.onHandleDrag,d));d.mon(c.getEl(),"mousedown",d.onMouseDown,d)},onHandleDrag:function(){var f=this,a=f.getView(),e=a.down("#dragHandle"),i=e.getX()-a.getX(),g=e.getY()-a.getY(),d=a.getEl(),h=d.getWidth(),j=d.getHeight(),b=i/h,c=g/j;if(b>0.99){b=1}if(c>0.99){c=1}a.fireEvent("handledrag",b,c)},onMouseDown:function(d){var c=this,b=c.getView(),a=b.down("#dragHandle");a.setY(d.getY());a.setX(d.getX());c.onHandleDrag();a.dd.onMouseDown(d,a.dd.el)},onMapClick:function(h){var d=this,c=d.getView(),a=c.down("#dragHandle"),i=c.getXY(),b=h.getXY(),g,f;g=b[0]-i[0];f=b[1]-i[1];a.getEl().setStyle({left:g+"px",top:f+"px"});d.onHandleDrag()},onColorBindingChanged:function(a){var k=this,d=k.getViewModel(),f=d.get("selectedColor"),g,b=k.getView(),j=b.down("#dragHandle"),i=b.getEl(),m=i.getWidth(),n=i.getHeight(),c,h,e,l;g=Ext.ux.colorpick.ColorUtils.rgb2hsv(f.r,f.g,f.b);c=g.s;e=m*c;h=1-g.v;l=n*h;j.getEl().setStyle({left:e+"px",top:l+"px"})},onHueBindingChanged:function(b){var e=this,c=e.getViewModel(),a,d;a=Ext.ux.colorpick.ColorUtils.hsv2rgb(b,1,1);d=Ext.ux.colorpick.ColorUtils.rgb2hex(a.r,a.g,a.b);e.getView().getEl().applyStyles({"background-color":"#"+d})}});Ext.define("Ext.ux.colorpick.ColorMap",{extend:"Ext.container.Container",alias:"widget.colorpickercolormap",controller:"colorpickercolormapcontroller",requires:["Ext.ux.colorpick.ColorMapController"],cls:"x-colorpicker-colormap",items:[{xtype:"component",cls:"x-colorpicker-colormap-draghandle-container",itemId:"dragHandle",width:1,height:1,draggable:true,html:'<div class="x-colorpicker-colormap-draghandle"></div>'}],listeners:{boxready:{single:true,fn:"onFirstBoxReady",scope:"controller"},colorbindingchanged:{fn:"onColorBindingChanged",scope:"controller"},huebindingchanged:{fn:"onHueBindingChanged",scope:"controller"}},afterRender:function(){var b=this,c=b.mapGradientUrl,a=b.el;b.callParent();if(!c){c=a.getStyle("background-image");c=c.substring(4,c.length-1);if(c.indexOf('"')===0){c=c.substring(1,c.length-1)}Ext.ux.colorpick.ColorMap.prototype.mapGradientUrl=c}a.setStyle("background-image","none");a=b.layout.getElementTarget();a.createChild({tag:"img",cls:"x-colorpicker-colormap-blender",src:c})},setPosition:function(c){var b=this,a=b.down("#dragHandle");if(!a.dd||!a.dd.constrain){return}if(typeof a.dd.dragEnded!=="undefined"&&!a.dd.dragEnded){return}b.fireEvent("colorbindingchanged",c)},setHue:function(a){var b=this;if(!b.getEl()){return}b.fireEvent("huebindingchanged",a)}});Ext.define("Ext.ux.colorpick.SelectorModel",{extend:"Ext.app.ViewModel",alias:"viewmodel.colorpick-selectormodel",requires:["Ext.ux.colorpick.ColorUtils"],data:{selectedColor:{r:255,g:255,b:255,h:0,s:1,v:1,a:1},previousColor:{r:0,g:0,b:0,h:0,s:1,v:1,a:1}},formulas:{hex:{get:function(d){var f=d("selectedColor.r").toString(16),e=d("selectedColor.g").toString(16),c=d("selectedColor.b").toString(16),a;a=Ext.ux.colorpick.ColorUtils.rgb2hex(f,e,c);return"#"+a},set:function(b){var a=Ext.ux.colorpick.ColorUtils.hex2rgb(b);this.changeRGB(a)}},red:{get:function(a){return a("selectedColor.r")},set:function(a){this.changeRGB({r:a})}},green:{get:function(a){return a("selectedColor.g")},set:function(a){this.changeRGB({g:a})}},blue:{get:function(a){return a("selectedColor.b")},set:function(a){this.changeRGB({b:a})}},hue:{get:function(a){return a("selectedColor.h")*360},set:function(a){this.changeHSV({h:a/360})}},saturation:{get:function(a){return a("selectedColor.s")*100},set:function(a){this.changeHSV({s:a/100})}},value:{get:function(b){var a=b("selectedColor.v");return a*100},set:function(a){this.changeHSV({v:a/100})}},alpha:{get:function(c){var b=c("selectedColor.a");return b*100},set:function(a){this.set("selectedColor",Ext.applyIf({a:a/100},this.data.selectedColor))}}},changeHSV:function(b){Ext.applyIf(b,this.data.selectedColor);var a=Ext.ux.colorpick.ColorUtils.hsv2rgb(b.h,b.s,b.v);b.r=a.r;b.g=a.g;b.b=a.b;this.set("selectedColor",b)},changeRGB:function(b){Ext.applyIf(b,this.data.selectedColor);var a=Ext.ux.colorpick.ColorUtils.rgb2hsv(b.r,b.g,b.b);b.h=a.h;b.s=a.s;b.v=a.v;this.set("selectedColor",b)}});Ext.define("Ext.ux.colorpick.SelectorController",{extend:"Ext.app.ViewController",alias:"controller.colorpick-selectorcontroller",requires:["Ext.ux.colorpick.ColorUtils"],initViewModel:function(){var b=this,a=b.getView();a.childViewModel.bind("{selectedColor}",function(c){a.setColor(c)})},destroy:function(){var c=this,b=c.getView(),a=b.childViewModel;if(a){a.destroy();b.childViewModel=null}c.callParent()},changeHSV:function(d){var a=this.getView(),b=a.getColor(),c;Ext.applyIf(d,b);c=Ext.ux.colorpick.ColorUtils.hsv2rgb(d.h,d.s,d.v);Ext.apply(d,c);a.setColor(d)},onColorMapHandleDrag:function(b,a){this.changeHSV({s:b,v:1-a})},onValueSliderHandleDrag:function(a){this.changeHSV({v:1-a})},onSaturationSliderHandleDrag:function(a){this.changeHSV({s:1-a})},onHueSliderHandleDrag:function(a){this.changeHSV({h:1-a})},onAlphaSliderHandleDrag:function(c){var a=this.getView(),b=a.getColor(),d=Ext.applyIf({a:1-c},b);a.setColor(d)},onPreviousColorSelected:function(c,b){var a=this.getView();a.setColor(b)},onOK:function(){var b=this,a=b.getView();a.fireEvent("ok",a,a.getValue())},onCancel:function(){this.fireViewEvent("cancel",this.getView())},onResize:function(){var c=this,a=c.getView(),b=a.childViewModel;if(!c.hasResizedOnce){c.hasResizedOnce=true;return}a.down("colorpickercolormap").setPosition(b.getData());a.down("colorpickersliderhue").setHue(b.get("hue"));a.down("colorpickerslidersaturation").setSaturation(b.get("saturation"));a.down("colorpickerslidervalue").setValue(b.get("value"));a.down("colorpickerslideralpha").setAlpha(b.get("alpha"))}});Ext.define("Ext.ux.colorpick.ColorPreview",{extend:"Ext.Component",alias:"widget.colorpickercolorpreview",requires:["Ext.util.Format"],style:"position: relative",html:'<div class="filter" style="height:100%; width:100%; position: absolute;"></div><a class="btn" style="height:100%; width:100%; position: absolute;"></a>',cls:"x-colorpreview",height:256,onRender:function(){var a=this;a.callParent(arguments);a.mon(a.el.down(".btn"),"click",a.onClick,a)},onClick:function(){this.fireEvent("click",this,this.color)},setColor:function(a){var c=this,b=c.getEl();if(!b){return}c.color=a;c.applyBgStyle(a)},bgStyleTpl:Ext.create("Ext.XTemplate",Ext.isIE&&Ext.ieVersion<10?"filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#{hexAlpha}{hex}', endColorstr='#{hexAlpha}{hex}');":"background: {rgba};"),applyBgStyle:function(a){var e=this,g=Ext.ux.colorpick.ColorUtils,c=e.getEl().down(".filter"),d,f,b,h;d=g.rgb2hex(a.r,a.g,a.b);f=Ext.util.Format.hex(Math.floor(a.a*255),2);b=g.getRGBAString(a);h=this.bgStyleTpl.apply({hex:d,hexAlpha:f,rgba:b});c.applyStyles(h)}});Ext.define("Ext.ux.colorpick.SliderController",{extend:"Ext.app.ViewController",alias:"controller.colorpick-slidercontroller",onFirstBoxReady:function(){var e=this,d=e.getView(),c=d.getDragContainer(),b=d.getDragHandle(),a=b.dd;a.constrain=true;a.constrainTo=c.getEl();a.initialConstrainTo=a.constrainTo;a.on("drag",e.onHandleDrag,e);e.mon(d.getEl(),{mousedown:e.onMouseDown,mouseup:e.onMouseUp,scope:e})},onHandleDrag:function(d){var g=this,i=g.getView(),a=i.getDragContainer(),f=i.getDragHandle(),h=f.getY()-a.getY(),c=a.getEl(),j=c.getHeight(),b=h/j;if(b>0.99){b=1}i.fireEvent("handledrag",b)},onMouseDown:function(d){var c=this,b=c.getView(),a=b.getDragHandle();a.setY(d.getY());c.onHandleDrag();a.dd.onMouseDown(d,a.dd.el)},onMouseUp:function(){var b=this.getView(),a=b.getDragHandle();a.dd.dragEnded=true}});Ext.define("Ext.ux.colorpick.Slider",{extend:"Ext.container.Container",xtype:"colorpickerslider",controller:"colorpick-slidercontroller",baseCls:"x-colorpicker-slider",layout:"center",requires:["Ext.layout.container.Center","Ext.ux.colorpick.SliderController"],referenceHolder:true,items:[{xtype:"container",cls:"draghandle-container",reference:"dragHandleContainer",height:"100%",items:[{xtype:"component",cls:"draghandle-outer",reference:"dragHandle",width:"100%",height:1,draggable:true,html:'<div class="draghandle"></div>'}]}],listeners:{boxready:"onFirstBoxReady",single:true},getDragHandle:function(){return this.lookupReference("dragHandle")},getDragContainer:function(){return this.lookupReference("dragHandleContainer")}});Ext.define("Ext.ux.colorpick.SliderAlpha",{extend:"Ext.ux.colorpick.Slider",alias:"widget.colorpickerslideralpha",cls:"alpha",requires:["Ext.XTemplate"],gradientStyleTpl:Ext.create("Ext.XTemplate",Ext.isIE&&Ext.ieVersion<10?"filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#FF{hex}', endColorstr='#00{hex}');":"background: -mox-linear-gradient(top, rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);background: -webkit-linear-gradient(top,rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);background: -o-linear-gradient(top, rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);background: -ms-linear-gradient(top, rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);background: linear-gradient(to bottom, rgba({r}, {g}, {b}, 1) 0%, rgba({r}, {g}, {b}, 0) 100%);"),setAlpha:function(g){var d=this,b=d.getDragContainer(),a=d.getDragHandle(),f=b.getEl(),e=f.getHeight(),c,h;if(!a.dd||!a.dd.constrain){return}if(typeof a.dd.dragEnded!=="undefined"&&!a.dd.dragEnded){return}c=1-(g/100);h=e*c;a.getEl().setStyle({top:h+"px"})},setColor:function(b){var e=this,a=e.getDragContainer(),d,c;if(!e.getEl()){return}d=Ext.ux.colorpick.ColorUtils.rgb2hex(b.r,b.g,b.b);c=a.getEl().down(".x-autocontainer-innerCt");c.applyStyles(e.gradientStyleTpl.apply({hex:d,r:b.r,g:b.g,b:b.b}))}});Ext.define("Ext.ux.colorpick.SliderSaturation",{extend:"Ext.ux.colorpick.Slider",alias:"widget.colorpickerslidersaturation",cls:"saturation",gradientStyleTpl:Ext.create("Ext.XTemplate",Ext.isIE&&Ext.ieVersion<10?"filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#{hex}', endColorstr='#ffffff');":"background: -mox-linear-gradient(top, #{hex} 0%, #ffffff 100%);background: -webkit-linear-gradient(top, #{hex} 0%,#ffffff 100%);background: -o-linear-gradient(top, #{hex} 0%,#ffffff 100%);background: -ms-linear-gradient(top, #{hex} 0%,#ffffff 100%);background: linear-gradient(to bottom, #{hex} 0%,#ffffff 100%);"),setSaturation:function(e){var d=this,b=d.getDragContainer(),a=d.getDragHandle(),g=b.getEl(),f=g.getHeight(),c,h;if(!a.dd||!a.dd.constrain){return}if(typeof a.dd.dragEnded!=="undefined"&&!a.dd.dragEnded){return}c=1-(e/100);h=f*c;a.getEl().setStyle({top:h+"px"})},setHue:function(b){var e=this,a=e.getDragContainer(),c,d;if(!e.getEl()){return}c=Ext.ux.colorpick.ColorUtils.hsv2rgb(b,1,1);d=Ext.ux.colorpick.ColorUtils.rgb2hex(c.r,c.g,c.b);a.getEl().applyStyles(e.gradientStyleTpl.apply({hex:d}))}});Ext.define("Ext.ux.colorpick.SliderValue",{extend:"Ext.ux.colorpick.Slider",alias:"widget.colorpickerslidervalue",cls:"value",requires:["Ext.XTemplate"],gradientStyleTpl:Ext.create("Ext.XTemplate",Ext.isIE&&Ext.ieVersion<10?"filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#{hex}', endColorstr='#000000');":"background: -mox-linear-gradient(top, #{hex} 0%, #000000 100%);background: -webkit-linear-gradient(top, #{hex} 0%,#000000 100%);background: -o-linear-gradient(top, #{hex} 0%,#000000 100%);background: -ms-linear-gradient(top, #{hex} 0%,#000000 100%);background: linear-gradient(to bottom, #{hex} 0%,#000000 100%);"),setValue:function(g){var d=this,b=d.getDragContainer(),a=d.getDragHandle(),f=b.getEl(),e=f.getHeight(),c,h;if(!a.dd||!a.dd.constrain){return}if(typeof a.dd.dragEnded!=="undefined"&&!a.dd.dragEnded){return}c=1-(g/100);h=e*c;a.getEl().setStyle({top:h+"px"})},setHue:function(b){var e=this,a=e.getDragContainer(),c,d;if(!e.getEl()){return}c=Ext.ux.colorpick.ColorUtils.hsv2rgb(b,1,1);d=Ext.ux.colorpick.ColorUtils.rgb2hex(c.r,c.g,c.b);a.getEl().applyStyles(e.gradientStyleTpl.apply({hex:d}))}});Ext.define("Ext.ux.colorpick.SliderHue",{extend:"Ext.ux.colorpick.Slider",alias:"widget.colorpickersliderhue",cls:"hue",afterRender:function(){var b=this,c=b.gradientUrl,a=b.el;b.callParent();if(!c){c=a.getStyle("background-image");c=c.substring(4,c.length-1);if(c.indexOf('"')===0){c=c.substring(1,c.length-1)}Ext.ux.colorpick.SliderHue.prototype.gradientUrl=c}a.setStyle("background-image","none");a=b.getDragContainer().layout.getElementTarget();a.createChild({tag:"img",cls:"hue-gradient",src:c})},setHue:function(d){var e=this,b=e.getDragContainer(),a=e.getDragHandle(),g=b.getEl(),f=g.getHeight(),c,h;if(!a.dd||!a.dd.constrain){return}if(typeof a.dd.dragEnded!=="undefined"&&!a.dd.dragEnded){return}c=1-d;h=f*c;a.getEl().setStyle({top:h+"px"})}});Ext.define("Ext.ux.colorpick.Selector",{extend:"Ext.container.Container",xtype:"colorselector",mixins:["Ext.ux.colorpick.Selection"],controller:"colorpick-selectorcontroller",requires:["Ext.layout.container.HBox","Ext.form.field.Text","Ext.form.field.Number","Ext.ux.colorpick.ColorMap","Ext.ux.colorpick.SelectorModel","Ext.ux.colorpick.SelectorController","Ext.ux.colorpick.ColorPreview","Ext.ux.colorpick.Slider","Ext.ux.colorpick.SliderAlpha","Ext.ux.colorpick.SliderSaturation","Ext.ux.colorpick.SliderValue","Ext.ux.colorpick.SliderHue"],width:580,height:337,cls:"x-colorpicker",padding:10,layout:{type:"hbox",align:"stretch"},defaultBindProperty:"value",twoWayBindable:["value"],fieldWidth:50,fieldPad:5,showPreviousColor:false,showOkCancelButtons:false,listeners:{resize:"onResize"},constructor:function(b){var c=this,a=Ext.Factory.viewModel("colorpick-selectormodel");c.childViewModel=a;c.items=[c.getMapAndHexRGBFields(a),c.getSliderAndHField(a),c.getSliderAndSField(a),c.getSliderAndVField(a),c.getSliderAndAField(a),c.getPreviewAndButtons(a,b)];c.callParent(arguments)},updateColor:function(a){var b=this;b.mixins.colorselection.updateColor.call(b,a);b.childViewModel.set("selectedColor",a)},updatePreviousColor:function(a){this.childViewModel.set("previousColor",a)},getMapAndHexRGBFields:function(a){var b=this;return{xtype:"container",viewModel:a,cls:"x-colopicker-escape-overflow",flex:1,layout:{type:"vbox",align:"stretch"},margin:"0 10 0 0",items:[{xtype:"colorpickercolormap",flex:1,bind:{position:{bindTo:"{selectedColor}",deep:true},hue:"{selectedColor.h}"},listeners:{handledrag:{fn:"onColorMapHandleDrag"}}},{xtype:"container",layout:"hbox",defaults:{labelSeparator:"",allowBlank:false,onChange:function(){var c=this;if(c.isValid()){Ext.form.field.Base.prototype.onChange.apply(c,arguments)}}},items:[{xtype:"textfield",fieldLabel:"HEX",labelAlign:"top",flex:1,bind:"{hex}",margin:{top:0,right:b.fieldPad,bottom:0,left:0},readOnly:true},{xtype:"numberfield",fieldLabel:"R",labelAlign:"top",bind:"{red}",width:b.fieldWidth,hideTrigger:true,maxValue:255,minValue:0,margin:{top:0,right:b.fieldPad,bottom:0,left:0}},{xtype:"numberfield",fieldLabel:"G",labelAlign:"top",bind:"{green}",width:b.fieldWidth,hideTrigger:true,maxValue:255,minValue:0,margin:{top:0,right:b.fieldPad,bottom:0,left:0}},{xtype:"numberfield",fieldLabel:"B",labelAlign:"top",bind:"{blue}",width:b.fieldWidth,hideTrigger:true,maxValue:255,minValue:0,margin:0}]}]}},getSliderAndHField:function(a){var b=this;return{xtype:"container",viewModel:a,cls:"x-colopicker-escape-overflow",width:b.fieldWidth,layout:{type:"vbox",align:"stretch"},items:[{xtype:"colorpickersliderhue",flex:1,bind:{hue:"{selectedColor.h}"},listeners:{handledrag:"onHueSliderHandleDrag"}},{xtype:"numberfield",fieldLabel:"H",labelAlign:"top",width:b.fieldWidth,labelSeparator:"",bind:"{hue}",hideTrigger:true,maxValue:360,minValue:0,allowBlank:false,margin:0}]}},getSliderAndSField:function(a){var b=this;return{xtype:"container",viewModel:a,cls:"x-colopicker-escape-overflow",width:b.fieldWidth,layout:{type:"vbox",align:"stretch"},margin:{right:b.fieldPad,left:b.fieldPad},items:[{xtype:"colorpickerslidersaturation",flex:1,bind:{saturation:"{saturation}",hue:"{selectedColor.h}"},listeners:{handledrag:{fn:"onSaturationSliderHandleDrag"}}},{xtype:"numberfield",fieldLabel:"S",labelAlign:"top",labelSeparator:"",bind:"{saturation}",hideTrigger:true,maxValue:100,minValue:0,allowBlank:false,margin:0}]}},getSliderAndVField:function(a){var b=this;return{xtype:"container",viewModel:a,cls:"x-colopicker-escape-overflow",width:b.fieldWidth,layout:{type:"vbox",align:"stretch"},items:[{xtype:"colorpickerslidervalue",flex:1,bind:{value:"{value}",hue:"{selectedColor.h}"},listeners:{handledrag:{fn:"onValueSliderHandleDrag"}}},{xtype:"numberfield",fieldLabel:"V",labelAlign:"top",labelSeparator:"",bind:"{value}",hideTrigger:true,maxValue:100,minValue:0,allowBlank:false,margin:0}]}},getSliderAndAField:function(a){var b=this;return{xtype:"container",viewModel:a,cls:"x-colopicker-escape-overflow",width:b.fieldWidth,layout:{type:"vbox",align:"stretch"},margin:{left:b.fieldPad},items:[{xtype:"colorpickerslideralpha",flex:1,bind:{alpha:"{alpha}",color:{bindTo:"{selectedColor}",deep:true}},listeners:{handledrag:{fn:"onAlphaSliderHandleDrag"}}},{xtype:"numberfield",fieldLabel:"A",labelAlign:"top",labelSeparator:"",bind:"{alpha}",hideTrigger:true,maxValue:100,minValue:0,allowBlank:false,margin:0}]}},getPreviewAndButtons:function(a,c){var b=[{xtype:"colorpickercolorpreview",flex:1,bind:{color:{bindTo:"{selectedColor}",deep:true}}}];if(c.showPreviousColor){b.push({xtype:"colorpickercolorpreview",flex:1,bind:{color:{bindTo:"{previousColor}",deep:true}},listeners:{click:"onPreviousColorSelected"}})}if(c.showOkCancelButtons){b.push({xtype:"button",text:"OK",margin:"10 0 0 0",handler:"onOK"},{xtype:"button",text:"Cancel",margin:"10 0 0 0",handler:"onCancel"})}return{xtype:"container",viewModel:a,width:70,margin:"0 0 0 10",items:b,layout:{type:"vbox",align:"stretch"}}}});Ext.define("Ext.ux.colorpick.ButtonController",{extend:"Ext.app.ViewController",alias:"controller.colorpick-buttoncontroller",requires:["Ext.layout.container.Fit"],destroy:function(){var a=this.getView(),b=a.colorPickerWindow;if(b){b.destroy();a.colorPickerWindow=a.colorPicker=null}this.callParent()},getPopup:function(){var b=this.getView(),a=b.colorPickerWindow;if(!a){a=Ext.create({xtype:"window",minWidth:540,minHeight:200,layout:"fit",header:false,resizable:true,items:[{xtype:"colorselector",format:b.getFormat(),showPreviousColor:true,showOkCancelButtons:true,listeners:{ok:"onColorPickerOkBtn",cancel:"onColorPickerCancelBtn",scope:this}}]});b.colorPickerWindow=a;a.colorPicker=b.colorPicker=a.items.getAt(0)}return a},onClick:function(){var e=this,c=e.getView(),d=c.getColor(),b=e.getPopup(),a=b.colorPicker;a.setColor(d);a.setPreviousColor(d);b.showBy(c,"tl-br?")},onColorPickerOkBtn:function(c){var a=this.getView(),b=c.getColor(),d=a.colorPickerWindow;d.hide();a.setColor(b)},onColorPickerCancelBtn:function(){var a=this.getView(),b=a.colorPickerWindow;b.hide()}});Ext.define("Ext.ux.colorpick.Button",{extend:"Ext.Component",xtype:"colorbutton",controller:"colorpick-buttoncontroller",mixins:["Ext.ux.colorpick.Selection"],requires:["Ext.window.Window","Ext.ux.colorpick.Selector","Ext.ux.colorpick.ButtonController","Ext.ux.colorpick.ColorUtils"],baseCls:"x-colorpicker-button",width:20,height:20,html:'<div class="filter" style="height:100%; width:100%; position: absolute;"></div><a class="btn" style="height:100%; width:100%; position: absolute;"></a>',bgStyleTpl:Ext.create("Ext.XTemplate",Ext.isIE&&Ext.ieVersion<10?"filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#{hexAlpha}{hex}', endColorstr='#{hexAlpha}{hex}');":"background: {rgba};"),listeners:{click:"onClick"},afterRender:function(){var b=this,a;b.callParent();b.btn=a=b.el.down(".btn");b.mon(a,"click",b.onClick,b);b.syncColor(b.getColor())},onClick:function(a){this.fireEvent("click",this,a)},syncColor:function(a){var c=Ext.ux.colorpick.ColorUtils,f=this,d=f.getEl().down(".filter"),e,g,b,h;e=c.rgb2hex(a.r,a.g,a.b);g=Math.floor(a.a*255).toString(16);b=c.getRGBAString(a);h=f.bgStyleTpl.apply({hex:e,hexAlpha:g,rgba:b});d.applyStyles(h)},updateColor:function(a){var b=this,c=b.colorPicker;b.mixins.colorselection.updateColor.call(b,a);if(b.rendered){b.syncColor(a)}if(c){c.setColor(a)}},updateFormat:function(b){var a=this.colorPicker;if(a){a.setFormat(b)}}});Ext.define("Ext.ux.colorpick.FieldController",{extend:"Ext.app.ViewController",alias:"controller.colorpick-fieldcontroller",onColorPickerOK:function(b){var a=this.getView();a.setColor(b.getColor());a.collapse()},onColorPickerCancel:function(){var a=this.getView();a.collapse()}});Ext.define("Ext.ux.colorpick.Field",{extend:"Ext.form.field.Picker",xtype:"colorfield",mixins:["Ext.ux.colorpick.Selection"],controller:"colorpick-fieldcontroller",requires:["Ext.window.Window","Ext.ux.colorpick.Selector","Ext.ux.colorpick.FieldController","Ext.ux.colorpick.ColorUtils","Ext.layout.container.Fit"],matchFieldWidth:false,editable:false,beforeBodyEl:['<div class="x-color-swatch" id="{id}-swatchEl" data-ref="swatchEl"></div>'],cls:"x-colorpicker-field",childEls:["swatchEl"],createPicker:function(){var b=this,a={xtype:"colorselector",format:b.getFormat(),showPreviousColor:true,showOkCancelButtons:true,color:b.getColor(),listeners:{ok:"onColorPickerOK",cancel:"onColorPickerCancel"}};b.colorPicker=a=Ext.create(a);b.colorPickerWindow=Ext.widget("window",{items:[a],minWidth:540,minHeight:200,header:false,resizable:true,layout:"fit"});return b.colorPickerWindow},afterRender:function(){this.callParent();this.updateValue(this.value)},onExpand:function(){var a=this.getColor();this.colorPicker.setPreviousColor(a)},setValue:function(a){var b=this,e=b.applyValue(a),d=b.value;b.callParent([e]);if(d!==e){b.updateValue(e)}},updateFormat:function(b){var a=this.colorPicker;if(a){a.setFormat(b)}},updateValue:function(b){var d=this,a=d.swatchEl,e;if(!d.syncing){d.syncing=true;d.setColor(b);d.syncing=false}e=d.getColor();if(a){e=Ext.ux.colorpick.ColorUtils.formats["#hex6"](e);a.setStyle("background-color",e)}if(d.colorPicker){d.colorPicker.setColor(e)}}});