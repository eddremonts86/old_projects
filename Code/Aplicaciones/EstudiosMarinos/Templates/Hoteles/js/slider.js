/**
 * Created with JetBrains PhpStorm.
 * User: edd
 * Date: 5/01/14
 * Time: 13:16
 * To change this template use File | Settings | File Templates.
 */
    var slider = function() {
        /* ==== private methods ==== */
        function getElementsByClass(object, tag, className) {
            var o = object.getElementsByTagName(tag);
            for ( var i = 0, n = o.length, ret = []; i < n; i++) {
                if (o[i].className == className) ret.push(o[i]);
            }
            if (ret.length == 1) ret = ret[0];
            return ret;
        }
        function setOpacity (obj,o) {
            if (obj.filters) obj.filters.alpha.opacity = Math.round(o);
            else obj.style.opacity = o / 100;
        }
        /* ==== Slider Constructor ==== */
        function Slider(oCont, speed, iW, iH, oP) {
            this.slides = [];
            this.over   = false;
            this.S      = this.S0 = speed;
            this.iW     = iW;
            this.iH     = iH;
            this.oP     = oP;
            this.oc     = document.getElementById(oCont);
            this.frm    = getElementsByClass(this.oc, 'div', 'slide');
            this.NF     = this.frm.length;
            this.resize();
            for (var i = 0; i < this.NF; i++) {
                this.slides[i] = new Slide(this, i);
            }
            this.oc.parent = this;
            this.view      = this.slides[0];
            this.Z         = this.mx;
            /* ==== on mouse out event ==== */
            this.oc.onmouseout = function () {
                this.parent.mouseout();
                return false;
            }
        }
        Slider.prototype = {
            /* ==== animation loop ==== */
            run : function () {
                this.Z += this.over ? (this.mn - this.Z) * .5 : (this.mx - this.Z) * .5;
                this.view.calc();
                var i = this.NF;
                while (i--) this.slides[i].move();
            },
            /* ==== resize  ==== */
            resize : function () {
                this.wh = this.oc.clientWidth;
                this.ht = this.oc.clientHeight;
                this.wr = this.wh * this.iW;
                this.r  = this.ht / this.wr;
                this.mx = this.wh / this.NF;
                this.mn = (this.wh * (1 - this.iW)) / (this.NF - 1);
            },
            /* ==== rest  ==== */
            mouseout : function () {
                this.over      = false;
                setOpacity(this.view.img, this.oP);
            }
        }
        /* ==== Slide Constructor ==== */
        Slide = function (parent, N) {
            this.parent = parent;
            this.N      = N;
            this.x0     = this.x1 = N * parent.mx;
            this.v      = 0;
            this.loaded = false;
            this.cpt    = 0;
            this.start  = new Date();
            this.obj    = parent.frm[N];
            this.txt    = getElementsByClass(this.obj, 'div', 'text');
            this.img    = getElementsByClass(this.obj, 'img', 'diapo');
            this.bkg    = document.createElement('div');
            this.bkg.className = 'backgroundText';
            this.obj.insertBefore(this.bkg, this.txt);
            if (N == 0) this.obj.style.borderLeft = 'none';
            this.obj.style.left = Math.floor(this.x0) + 'px';
            setOpacity(this.img, parent.oP);
            /* ==== mouse events ==== */
            this.obj.parent = this;
            this.obj.onmouseover = function() {
                this.parent.over();
                return false;
            }
        }
        Slide.prototype = {
            /* ==== target positions ==== */
            calc : function() {
                var that = this.parent;
                // left slides
                for (var i = 0; i <= this.N; i++) {
                    that.slides[i].x1 = i * that.Z;
                }
                // right slides
                for (var i = this.N + 1; i < that.NF; i++) {
                    that.slides[i].x1 = that.wh - (that.NF - i) * that.Z;
                }
            },
            /* ==== HTML animation : move slides ==== */
            move : function() {
                var that = this.parent;
                var s = (this.x1 - this.x0) / that.S;
                /* ==== lateral slide ==== */
                if (this.N && Math.abs(s) > .5) {
                    this.obj.style.left = Math.floor(this.x0 += s) + 'px';
                }
                /* ==== vertical text ==== */
                var v = (this.N < that.NF - 1) ? that.slides[this.N + 1].x0 - this.x0 : that.wh - this.x0;
                if (Math.abs(v - this.v) > .5) {
                    this.bkg.style.top = this.txt.style.top = Math.floor(2 + that.ht - (v - that.Z) * that.iH * that.r) + 'px';
                    this.v = v;
                    this.cpt++;
                } else {
                    if (!this.pro) {
                        /* ==== adjust speed ==== */
                        this.pro = true;
                        var tps = new Date() - this.start;
                        if(this.cpt > 1) {
                            that.S = Math.max(2, (28 / (tps / this.cpt)) * that.S0);
                        }
                    }
                }
                if (!this.loaded) {
                    if (this.img.complete) {
                        this.img.style.visibility = 'visible';
                        this.loaded = true;
                    }
                }
            },
            /* ==== light ==== */
            over : function () {
                this.parent.resize();
                this.parent.over = true;
                setOpacity(this.parent.view.img, this.parent.oP);
                this.parent.view = this;
                this.start = new Date();
                this.cpt = 0;
                this.pro = false;
                this.calc();
                setOpacity(this.img, 100);
            }
        }
        /* ==== public method - script initialization ==== */
        return {
            init : function() {
                // create instances of sliders here
                // parameters : HTMLcontainer name, speed (2 fast - 20 slow), Horizontal ratio, vertical text ratio, opacity
                this.s1 = new Slider("slider", 12, 1.84/3, 1/3.2, 70);
                setInterval("slider.s1.run();", 16);
            }
        }
    }();
    var Library = {};
    Library.ease = function () {
        this.target = 0;
        this.position = 0;
        this.move = function (target, speed)
        {
            this.position += (target - this.position) * speed;
        }
    }
    var tv = {
        /* ==== variables ==== */
        O : [],
        screen : {},
        grid : {
            size       : 4,  // 4x4 grid
            borderSize : 6,  // borders size
            zoomed     : false
        },
        angle : {
            x : new Library.ease(),
            y : new Library.ease()
        },
        camera : {
            x    : new Library.ease(),
            y    : new Library.ease(),
            zoom : new Library.ease(),
            focalLength : 750 // camera Focal Length
        },

        /* ==== init script ==== */
        init : function ()
        {
            this.screen.obj = document.getElementById('screen');
            var img = document.getElementById('bankImages').getElementsByTagName('img');
            this.screen.obj.onselectstart = function () { return false; }
            this.screen.obj.ondrag        = function () { return false; }
            /* ==== create images grid ==== */
            var ni = 0;
            var n = (tv.grid.size / 2) - .5;
            for (var y = -n; y <= n; y++)
            {
                for (var x = -n; x <= n; x++)
                {
                    /* ==== create HTML image element ==== */
                    var o = document.createElement('img');
                    var i = img[(ni++) % img.length];
                    o.className = 'tvout';
                    o.src = i.src;
                    tv.screen.obj.appendChild(o);
                    /* ==== 3D coordinates ==== */
                    o.point3D = {
                        x  : x,
                        y  : y,
                        z  : new Library.ease()
                    };
                    /* ==== push object ==== */
                    o.point2D = {};
                    o.ratioImage = 1;
                    tv.O.push(o);
                    /* ==== on mouse over event ==== */
                    o.onmouseover = function ()
                    {
                        if (!tv.grid.zoomed)
                        {
                            if (tv.o)
                            {
                                /* ==== mouse out ==== */
                                tv.o.point3D.z.target = 0;
                                tv.o.className = 'tvout';
                            }
                            /* ==== mouse over ==== */
                            this.className = 'tvover';
                            this.point3D.z.target = -.5;
                            tv.o = this;
                        }
                    }
                    /* ==== on click event ==== */
                    o.onclick = function ()
                    {
                        if (!tv.grid.zoomed)
                        {
                            /* ==== zoom in ==== */
                            tv.camera.x.target = this.point3D.x;
                            tv.camera.y.target = this.point3D.y;
                            tv.camera.zoom.target = tv.screen.w * 1.1;
                            tv.grid.zoomed = this;
                        } else {
                            if (this == tv.grid.zoomed){
                                /* ==== zoom out ==== */
                                tv.camera.x.target = 0;
                                tv.camera.y.target = 0;
                                tv.camera.zoom.target = tv.screen.w / (tv.grid.size + .1);
                                tv.grid.zoomed = false;
                            }
                        }
                    }
                    /* ==== 3D transform function ==== */
                    o.calc = function ()
                    {
                        /* ==== ease mouseover ==== */
                        this.point3D.z.move(this.point3D.z.target, .5);
                        /* ==== assign 3D coords ==== */
                        var x = (this.point3D.x - tv.camera.x.position) * tv.camera.zoom.position;
                        var y = (this.point3D.y - tv.camera.y.position) * tv.camera.zoom.position;
                        var z = this.point3D.z.position * tv.camera.zoom.position;
                        /* ==== perform rotations ==== */
                        var xy = tv.angle.cx * y  - tv.angle.sx * z;
                        var xz = tv.angle.sx * y  + tv.angle.cx * z;
                        var yz = tv.angle.cy * xz - tv.angle.sy * x;
                        var yx = tv.angle.sy * xz + tv.angle.cy * x;
                        /* ==== 2D transformation ==== */
                        this.point2D.scale = tv.camera.focalLength / (tv.camera.focalLength + yz);
                        this.point2D.x = yx * this.point2D.scale;
                        this.point2D.y = xy * this.point2D.scale;
                        this.point2D.w = Math.round(
                            Math.max(
                                0,
                                this.point2D.scale * tv.camera.zoom.position * .8
                            )
                        );
                        /* ==== image size ratio ==== */
                        if (this.ratioImage > 1)
                            this.point2D.h = Math.round(this.point2D.w / this.ratioImage);
                        else
                        {
                            this.point2D.h = this.point2D.w;
                            this.point2D.w = Math.round(this.point2D.h * this.ratioImage);
                        }
                    }
                    /* ==== rendering ==== */
                    o.draw = function ()
                    {
                        if (this.complete)
                        {
                            /* ==== paranoid image load ==== */
                            if (!this.loaded)
                            {
                                if (!this.img)
                                {
                                    /* ==== create internal image ==== */
                                    this.img = new Image();
                                    this.img.src = this.src;
                                }
                                if (this.img.complete)
                                {
                                    /* ==== get width / height ratio ==== */
                                    this.style.visibility = 'visible';
                                    this.ratioImage = this.img.width / this.img.height;
                                    this.loaded = true;
                                    this.img = false;
                                }
                            }
                            /* ==== HTML rendering ==== */
                            this.style.left = Math.round(
                                this.point2D.x * this.point2D.scale +
                                    tv.screen.w - this.point2D.w * .5
                            ) + 'px';
                            this.style.top  = Math.round(
                                this.point2D.y * this.point2D.scale +
                                    tv.screen.h - this.point2D.h * .5
                            ) + 'px';
                            this.style.width  = this.point2D.w + 'px';
                            this.style.height = this.point2D.h + 'px';
                            this.style.borderWidth = Math.round(
                                Math.max(
                                    this.point2D.w,
                                    this.point2D.h
                                ) * tv.grid.borderSize * .01
                            ) + 'px';
                            this.style.zIndex = Math.floor(this.point2D.scale * 100);
                        }
                    }
                }
            }
            /* ==== start script ==== */
            tv.resize();
            mouse.y = tv.screen.y + tv.screen.h;
            mouse.x = tv.screen.x + tv.screen.w;
            tv.run();
        },

        /* ==== resize window ==== */
        resize : function ()
        {
            var o = tv.screen.obj;
            tv.screen.w = o.offsetWidth / 2;
            tv.screen.h = o.offsetHeight / 2;
            tv.camera.zoom.target = tv.screen.w / (tv.grid.size + .1);
            for (tv.screen.x = 0, tv.screen.y = 0; o != null; o = o.offsetParent)
            {
                tv.screen.x += o.offsetLeft;
                tv.screen.y += o.offsetTop;
            }
        },

        /* ==== main loop ==== */
        run : function ()
        {
            /* ==== motion ease ==== */
            tv.angle.x.move(-(mouse.y - tv.screen.h - tv.screen.y) * .0025, .1);
            tv.angle.y.move( (mouse.x - tv.screen.w - tv.screen.x) * .0025, .1);
            tv.camera.x.move(tv.camera.x.target, tv.grid.zoomed ? .25 : .025);
            tv.camera.y.move(tv.camera.y.target, tv.grid.zoomed ? .25 : .025);
            tv.camera.zoom.move(tv.camera.zoom.target, .05);
            /* ==== angles sin and cos ==== */
            tv.angle.cx = Math.cos(tv.angle.x.position);
            tv.angle.sx = Math.sin(tv.angle.x.position);
            tv.angle.cy = Math.cos(tv.angle.y.position);
            tv.angle.sy = Math.sin(tv.angle.y.position);
            /* ==== loop through all images ==== */
            for (var i = 0, o; o = tv.O[i]; i++)
            {
                o.calc();
                o.draw();
            }
            /* ==== loop ==== */
            setTimeout(tv.run, 32);
        }
    }
    var mouse = {
        x : 0,
        y : 0
    }
    document.onmousemove = function(e)
    {
        if (window.event) e = window.event;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        return false;
    }
