/*!
 * VERSION: 1.13.1
 * DATE: 2014-07-22
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function (t, e) {
    "use strict";
    var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (!i.TweenLite) {
        var s, n, r, a, o, l = function (t) {
            var e, s = t.split("."), n = i;
            for (e = 0; s.length > e; e++)n[s[e]] = n = n[s[e]] || {};
            return n
        }, h = l("com.greensock"), _ = 1e-10, u = function (t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i
        }, f = function () {
        }, m = function () {
            var t = Object.prototype.toString, e = t.call([]);
            return function (i) {
                return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
            }
        }(), p = {}, c = function (s, n, r, a) {
            this.sc = p[s] ? p[s].sc : [], p[s] = this, this.gsClass = null, this.func = r;
            var o = [];
            this.check = function (h) {
                for (var _, u, f, m, d = n.length, v = d; --d > -1;)(_ = p[n[d]] || new c(n[d], [])).gsClass ? (o[d] = _.gsClass, v--) : h && _.sc.push(this);
                if (0 === v && r)for (u = ("com.greensock." + s).split("."), f = u.pop(), m = l(u.join("."))[f] = this.gsClass = r.apply(r, o), a && (i[f] = m, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function () {
                        return m
                    }) : s === e && "undefined" != typeof module && module.exports && (module.exports = m)), d = 0; this.sc.length > d; d++)this.sc[d].check()
            }, this.check(!0)
        }, d = t._gsDefine = function (t, e, i, s) {
            return new c(t, e, i, s)
        }, v = h._class = function (t, e, i) {
            return e = e || function () {
                }, d(t, [], function () {
                return e
            }, i), e
        };
        d.globals = i;
        var g = [0, 0, 1, 1], T = [], y = v("easing.Ease", function (t, e, i, s) {
            this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? g.concat(e) : g
        }, !0), w = y.map = {}, P = y.register = function (t, e, i, s) {
            for (var n, r, a, o, l = e.split(","), _ = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)for (r = l[_], n = s ? v("easing." + r, null, !0) : h.easing[r] || {}, a = u.length; --a > -1;)o = u[a], w[r + "." + o] = w[o + r] = n[o] = t.getRatio ? t : t[o] || new t
        };
        for (r = y.prototype, r._calcEnd = !1, r.getRatio = function (t) {
            if (this._func)return this._params[0] = t, this._func.apply(null, this._params);
            var e = this._type, i = this._power, s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
            return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
        }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], n = s.length; --n > -1;)r = s[n] + ",Power" + n, P(new y(null, null, 1, n), r, "easeOut", !0), P(new y(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")), P(new y(null, null, 3, n), r, "easeInOut");
        w.linear = h.easing.Linear.easeIn, w.swing = h.easing.Quad.easeInOut;
        var b = v("events.EventDispatcher", function (t) {
            this._listeners = {}, this._eventTarget = t || this
        });
        r = b.prototype, r.addEventListener = function (t, e, i, s, n) {
            n = n || 0;
            var r, l, h = this._listeners[t], _ = 0;
            for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;)r = h[l], r.c === e && r.s === i ? h.splice(l, 1) : 0 === _ && n > r.pr && (_ = l + 1);
            h.splice(_, 0, {c: e, s: i, up: s, pr: n}), this !== a || o || a.wake()
        }, r.removeEventListener = function (t, e) {
            var i, s = this._listeners[t];
            if (s)for (i = s.length; --i > -1;)if (s[i].c === e)return s.splice(i, 1), void 0
        }, r.dispatchEvent = function (t) {
            var e, i, s, n = this._listeners[t];
            if (n)for (e = n.length, i = this._eventTarget; --e > -1;)s = n[e], s.up ? s.c.call(s.s || i, {
                    type: t,
                    target: i
                }) : s.c.call(s.s || i)
        };
        var k = t.requestAnimationFrame, A = t.cancelAnimationFrame, S = Date.now || function () {
                return (new Date).getTime()
            }, x = S();
        for (s = ["ms", "moz", "webkit", "o"], n = s.length; --n > -1 && !k;)k = t[s[n] + "RequestAnimationFrame"], A = t[s[n] + "CancelAnimationFrame"] || t[s[n] + "CancelRequestAnimationFrame"];
        v("Ticker", function (t, e) {
            var i, s, n, r, l, h = this, u = S(), m = e !== !1 && k, p = 500, c = 33, d = function (t) {
                var e, a, o = S() - x;
                o > p && (u += o - c), x += o, h.time = (x - u) / 1e3, e = h.time - l, (!i || e > 0 || t === !0) && (h.frame++, l += e + (e >= r ? .004 : r - e), a = !0), t !== !0 && (n = s(d)), a && h.dispatchEvent("tick")
            };
            b.call(h), h.time = h.frame = 0, h.tick = function () {
                d(!0)
            }, h.lagSmoothing = function (t, e) {
                p = t || 1 / _, c = Math.min(e, p, 0)
            }, h.sleep = function () {
                null != n && (m && A ? A(n) : clearTimeout(n), s = f, n = null, h === a && (o = !1))
            }, h.wake = function () {
                null !== n ? h.sleep() : h.frame > 10 && (x = S() - p + 5), s = 0 === i ? f : m && k ? k : function (t) {
                            return setTimeout(t, 0 | 1e3 * (l - h.time) + 1)
                        }, h === a && (o = !0), d(2)
            }, h.fps = function (t) {
                return arguments.length ? (i = t, r = 1 / (i || 60), l = this.time + r, h.wake(), void 0) : i
            }, h.useRAF = function (t) {
                return arguments.length ? (h.sleep(), m = t, h.fps(i), void 0) : m
            }, h.fps(t), setTimeout(function () {
                m && (!n || 5 > h.frame) && h.useRAF(!1)
            }, 1500)
        }), r = h.Ticker.prototype = new h.events.EventDispatcher, r.constructor = h.Ticker;
        var C = v("core.Animation", function (t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, B) {
                o || a.wake();
                var i = this.vars.useFrames ? q : B;
                i.add(this, i._time), this.vars.paused && this.paused(!0)
            }
        });
        a = C.ticker = new h.Ticker, r = C.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
        var R = function () {
            o && S() - x > 2e3 && a.wake(), setTimeout(R, 2e3)
        };
        R(), r.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, r.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, r.resume = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!1)
        }, r.seek = function (t, e) {
            return this.totalTime(Number(t), e !== !1)
        }, r.restart = function (t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
        }, r.reverse = function (t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, r.render = function () {
        }, r.invalidate = function () {
            return this
        }, r.isActive = function () {
            var t, e = this._timeline, i = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
        }, r._enabled = function (t, e) {
            return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        }, r._kill = function () {
            return this._enabled(!1, !1)
        }, r.kill = function (t, e) {
            return this._kill(t, e), this
        }, r._uncache = function (t) {
            for (var e = t ? this : this.timeline; e;)e._dirty = !0, e = e.timeline;
            return this
        }, r._swapSelfInParams = function (t) {
            for (var e = t.length, i = t.concat(); --e > -1;)"{self}" === t[e] && (i[e] = this);
            return i
        }, r.eventCallback = function (t, e, i, s) {
            if ("on" === (t || "").substr(0, 2)) {
                var n = this.vars;
                if (1 === arguments.length)return n[t];
                null == e ? delete n[t] : (n[t] = e, n[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, n[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }, r.delay = function (t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        }, r.duration = function (t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, r.totalDuration = function (t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        }, r.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }, r.totalTime = function (t, e, i) {
            if (o || a.wake(), !arguments.length)return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var s = this._totalDuration, n = this._timeline;
                    if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? s - t : t) / this._timeScale, n._dirty || this._uncache(!1), n._timeline)for (; n._timeline;)n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0), n = n._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), O.length && M())
            }
            return this
        }, r.progress = r.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
        }, r.startTime = function (t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        }, r.timeScale = function (t) {
            if (!arguments.length)return this._timeScale;
            if (t = t || _, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime, i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        }, r.reversed = function (t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, r.paused = function (t) {
            if (!arguments.length)return this._paused;
            if (t != this._paused && this._timeline) {
                o || t || a.wake();
                var e = this._timeline, i = e.rawTime(), s = i - this._pauseTime;
                !t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !t && this._enabled(!0, !1), this
        };
        var D = v("core.SimpleTimeline", function (t) {
            C.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        r = D.prototype = new C, r.constructor = D, r.kill()._gc = !1, r._first = r._last = null, r._sortChildren = !1, r.add = r.insert = function (t, e) {
            var i, s;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)for (s = t._startTime; i && i._startTime > s;)i = i._prev;
            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
        }, r._remove = function (t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, this._timeline && this._uncache(!0)), this
        }, r.render = function (t, e, i) {
            var s, n = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; n;)s = n._next, (n._active || t >= n._startTime && !n._paused) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s
        }, r.rawTime = function () {
            return o || a.wake(), this._totalTime
        };
        var I = v("TweenLite", function (e, i, s) {
            if (C.call(this, i, s), this.render = I.prototype.render, null == e)throw"Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : I.selector(e) || e;
            var n, r, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), l = this.vars.overwrite;
            if (this._overwrite = l = null == l ? Q[I.defaultOverwrite] : "number" == typeof l ? l >> 0 : Q[l], (o || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])for (this._targets = a = u(e), this._propLookup = [], this._siblings = [], n = 0; a.length > n; n++)r = a[n], r ? "string" != typeof r ? r.length && r !== t && r[0] && (r[0] === t || r[0].nodeType && r[0].style && !r.nodeType) ? (a.splice(n--, 1), this._targets = a = a.concat(u(r))) : (this._siblings[n] = $(r, this, !1), 1 === l && this._siblings[n].length > 1 && K(r, this, null, 1, this._siblings[n])) : (r = a[n--] = I.selector(r), "string" == typeof r && a.splice(n + 1, 1)) : a.splice(n--, 1); else this._propLookup = {}, this._siblings = $(e, this, !1), 1 === l && this._siblings.length > 1 && K(e, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -_, this.render(-this._delay))
        }, !0), E = function (e) {
            return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        }, z = function (t, e) {
            var i, s = {};
            for (i in t)G[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!U[i] || U[i] && U[i]._autoCSS) || (s[i] = t[i], delete t[i]);
            t.css = s
        };
        r = I.prototype = new C, r.constructor = I, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = r._lazy = !1, I.version = "1.13.1", I.defaultEase = r._ease = new y(null, null, 1, 1), I.defaultOverwrite = "auto", I.ticker = a, I.autoSleep = !0, I.lagSmoothing = function (t, e) {
            a.lagSmoothing(t, e)
        }, I.selector = t.$ || t.jQuery || function (e) {
                var i = t.$ || t.jQuery;
                return i ? (I.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
        var O = [], L = {}, N = I._internals = {
            isArray: m,
            isSelector: E,
            lazyTweens: O
        }, U = I._plugins = {}, F = N.tweenLookup = {}, j = 0, G = N.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1
        }, Q = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }, q = C._rootFramesTimeline = new D, B = C._rootTimeline = new D, M = N.lazyRender = function () {
            var t = O.length;
            for (L = {}; --t > -1;)s = O[t], s && s._lazy !== !1 && (s.render(s._lazy, !1, !0), s._lazy = !1);
            O.length = 0
        };
        B._startTime = a.time, q._startTime = a.frame, B._active = q._active = !0, setTimeout(M, 1), C._updateRoot = I.render = function () {
            var t, e, i;
            if (O.length && M(), B.render((a.time - B._startTime) * B._timeScale, !1, !1), q.render((a.frame - q._startTime) * q._timeScale, !1, !1), O.length && M(), !(a.frame % 120)) {
                for (i in F) {
                    for (e = F[i].tweens, t = e.length; --t > -1;)e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete F[i]
                }
                if (i = B._first, (!i || i._paused) && I.autoSleep && !q._first && 1 === a._listeners.tick.length) {
                    for (; i && i._paused;)i = i._next;
                    i || a.sleep()
                }
            }
        }, a.addEventListener("tick", C._updateRoot);
        var $ = function (t, e, i) {
            var s, n, r = t._gsTweenID;
            if (F[r || (t._gsTweenID = r = "t" + j++)] || (F[r] = {
                    target: t,
                    tweens: []
                }), e && (s = F[r].tweens, s[n = s.length] = e, i))for (; --n > -1;)s[n] === e && s.splice(n, 1);
            return F[r].tweens
        }, K = function (t, e, i, s, n) {
            var r, a, o, l;
            if (1 === s || s >= 4) {
                for (l = n.length, r = 0; l > r; r++)if ((o = n[r]) !== e) o._gc || o._enabled(!1, !1) && (a = !0); else if (5 === s)break;
                return a
            }
            var h, u = e._startTime + _, f = [], m = 0, p = 0 === e._duration;
            for (r = n.length; --r > -1;)(o = n[r]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || H(e, 0, p), 0 === H(o, h, p) && (f[m++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((p || !o._initted) && 2e-10 >= u - o._startTime || (f[m++] = o)));
            for (r = m; --r > -1;)o = f[r], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
            return a
        }, H = function (t, e, i) {
            for (var s = t._timeline, n = s._timeScale, r = t._startTime; s._timeline;) {
                if (r += s._startTime, n *= s._timeScale, s._paused)return -100;
                s = s._timeline
            }
            return r /= n, r > e ? r - e : i && r === e || !t._initted && 2 * _ > r - e ? _ : (r += t.totalDuration() / t._timeScale / n) > e + _ ? 0 : r - e - _
        };
        r._init = function () {
            var t, e, i, s, n, r = this.vars, a = this._overwrittenProps, o = this._duration, l = !!r.immediateRender, h = r.ease;
            if (r.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), n = {};
                for (s in r.startAt)n[s] = r.startAt[s];
                if (n.overwrite = !1, n.immediateRender = !0, n.lazy = l && r.lazy !== !1, n.startAt = n.delay = null, this._startAt = I.to(this.target, 0, n), l)if (this._time > 0) this._startAt = null; else if (0 !== o)return
            } else if (r.runBackwards && 0 !== o)if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else {
                i = {};
                for (s in r)G[s] && "autoCSS" !== s || (i[s] = r[s]);
                if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && r.lazy !== !1, i.immediateRender = l, this._startAt = I.to(this.target, 0, i), l) {
                    if (0 === this._time)return
                } else this._startAt._init(), this._startAt._enabled(!1)
            }
            if (this._ease = h = h ? h instanceof y ? h : "function" == typeof h ? new y(h, r.easeParams) : w[h] || I.defaultEase : I.defaultEase, r.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, r.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)for (t = this._targets.length; --t > -1;)this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, a);
            if (e && I._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)for (i = this._firstPT; i;)i.s += i.c, i.c = -i.c, i = i._next;
            this._onUpdate = r.onUpdate, this._initted = !0
        }, r._initProps = function (e, i, s, n) {
            var r, a, o, l, h, _;
            if (null == e)return !1;
            L[e._gsTweenID] && M(), this.vars.css || e.style && e !== t && e.nodeType && U.css && this.vars.autoCSS !== !1 && z(this.vars, e);
            for (r in this.vars) {
                if (_ = this.vars[r], G[r]) _ && (_ instanceof Array || _.push && m(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[r] = _ = this._swapSelfInParams(_, this)); else if (U[r] && (l = new U[r])._onInitTween(e, this.vars[r], this)) {
                    for (this._firstPT = h = {
                        _next: this._firstPT,
                        t: l,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: !0,
                        n: r,
                        pg: !0,
                        pr: l._priority
                    }, a = l._overwriteProps.length; --a > -1;)i[l._overwriteProps[a]] = this._firstPT;
                    (l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else this._firstPT = i[r] = h = {
                    _next: this._firstPT,
                    t: e,
                    p: r,
                    f: "function" == typeof e[r],
                    n: r,
                    pg: !1,
                    pr: 0
                }, h.s = h.f ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), h.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - h.s || 0;
                h && h._next && (h._next._prev = h)
            }
            return n && this._kill(n, e) ? this._initProps(e, i, s, n) : this._overwrite > 1 && this._firstPT && s.length > 1 && K(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, n)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (L[e._gsTweenID] = !0), o)
        }, r.render = function (t, e, i) {
            var s, n, r, a, o = this._time, l = this._duration, h = this._rawPrevTime;
            if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, n = "onComplete"), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > h || h === _) && h !== t && (i = !0, h > _ && (n = "onReverseComplete")), this._rawPrevTime = a = !e || t || h === t ? t : _); else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && h > 0 && h !== _) && (n = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (i = !0), this._rawPrevTime = a = !e || t || h === t ? t : _)) : this._initted || (i = !0); else if (this._totalTime = this._time = t, this._easeType) {
                var u = t / l, f = this._easeType, m = this._easePower;
                (1 === f || 3 === f && u >= .5) && (u = 1 - u), 3 === f && (u *= 2), 1 === m ? u *= u : 2 === m ? u *= u * u : 3 === m ? u *= u * u * u : 4 === m && (u *= u * u * u * u), this.ratio = 1 === f ? 1 - u : 2 === f ? u : .5 > t / l ? u / 2 : 1 - u / 2
            } else this.ratio = this._ease.getRatio(t / l);
            if (this._time !== o || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc)return;
                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))return this._time = this._totalTime = o, this._rawPrevTime = h, O.push(this), this._lazy = t, void 0;
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || T))), r = this._firstPT; r;)r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s, r = r._next;
                this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || T)), n && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this.vars[n].apply(this.vars[n + "Scope"] || this, this.vars[n + "Params"] || T), 0 === l && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0))
            }
        }, r._kill = function (t, e) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target))return this._lazy = !1, this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : I.selector(e) || e;
            var i, s, n, r, a, o, l, h;
            if ((m(e) || E(e)) && "number" != typeof e[0])for (i = e.length; --i > -1;)this._kill(t, e[i]) && (o = !0); else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1;)if (e === this._targets[i]) {
                        a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                        break
                    }
                } else {
                    if (e !== this.target)return !1;
                    a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (a) {
                    l = t || a, h = t !== s && "all" !== s && t !== a && ("object" != typeof t || !t._tempKill);
                    for (n in l)(r = a[n]) && (r.pg && r.t._kill(l) && (o = !0), r.pg && 0 !== r.t._overwriteProps.length || (r._prev ? r._prev._next = r._next : r === this._firstPT && (this._firstPT = r._next), r._next && (r._next._prev = r._prev), r._next = r._prev = null), delete a[n]), h && (s[n] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return o
        }, r.invalidate = function () {
            return this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = this._lazy = !1, this._propLookup = this._targets ? {} : [], this
        }, r._enabled = function (t, e) {
            if (o || a.wake(), t && this._gc) {
                var i, s = this._targets;
                if (s)for (i = s.length; --i > -1;)this._siblings[i] = $(s[i], this, !0); else this._siblings = $(this.target, this, !0)
            }
            return C.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? I._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
        }, I.to = function (t, e, i) {
            return new I(t, e, i)
        }, I.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new I(t, e, i)
        }, I.fromTo = function (t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new I(t, e, s)
        }, I.delayedCall = function (t, e, i, s, n) {
            return new I(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: s,
                immediateRender: !1,
                useFrames: n,
                overwrite: 0
            })
        }, I.set = function (t, e) {
            return new I(t, 0, e)
        }, I.getTweensOf = function (t, e) {
            if (null == t)return [];
            t = "string" != typeof t ? t : I.selector(t) || t;
            var i, s, n, r;
            if ((m(t) || E(t)) && "number" != typeof t[0]) {
                for (i = t.length, s = []; --i > -1;)s = s.concat(I.getTweensOf(t[i], e));
                for (i = s.length; --i > -1;)for (r = s[i], n = i; --n > -1;)r === s[n] && s.splice(i, 1)
            } else for (s = $(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
            return s
        }, I.killTweensOf = I.killDelayedCallsTo = function (t, e, i) {
            "object" == typeof e && (i = e, e = !1);
            for (var s = I.getTweensOf(t, e), n = s.length; --n > -1;)s[n]._kill(i, t)
        };
        var J = v("plugins.TweenPlugin", function (t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = J.prototype
        }, !0);
        if (r = J.prototype, J.version = "1.10.1", J.API = 2, r._firstPT = null, r._addTween = function (t, e, i, s, n, r) {
                var a, o;
                return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
                        _next: this._firstPT,
                        t: t,
                        p: e,
                        s: i,
                        c: a,
                        f: "function" == typeof t[e],
                        n: n || e,
                        r: r
                    }, o._next && (o._next._prev = o), o) : void 0
            }, r.setRatio = function (t) {
                for (var e, i = this._firstPT, s = 1e-6; i;)e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
            }, r._kill = function (t) {
                var e, i = this._overwriteProps, s = this._firstPT;
                if (null != t[this._propName]) this._overwriteProps = []; else for (e = i.length; --e > -1;)null != t[i[e]] && i.splice(e, 1);
                for (; s;)null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                return !1
            }, r._roundProps = function (t, e) {
                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
            }, I._onPluginEvent = function (t, e) {
                var i, s, n, r, a, o = e._firstPT;
                if ("_onInitAllProps" === t) {
                    for (; o;) {
                        for (a = o._next, s = n; s && s.pr > o.pr;)s = s._next;
                        (o._prev = s ? s._prev : r) ? o._prev._next = o : n = o, (o._next = s) ? s._prev = o : r = o, o = a
                    }
                    o = e._firstPT = n
                }
                for (; o;)o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                return i
            }, J.activate = function (t) {
                for (var e = t.length; --e > -1;)t[e].API === J.API && (U[(new t[e])._propName] = t[e]);
                return !0
            }, d.plugin = function (t) {
                if (!(t && t.propName && t.init && t.API))throw"illegal plugin definition.";
                var e, i = t.propName, s = t.priority || 0, n = t.overwriteProps, r = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_roundProps",
                    initAll: "_onInitAllProps"
                }, a = v("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                    J.call(this, i, s), this._overwriteProps = n || []
                }, t.global === !0), o = a.prototype = new J(i);
                o.constructor = a, a.API = t.API;
                for (e in r)"function" == typeof t[e] && (o[r[e]] = t[e]);
                return a.version = t.version, J.activate([a]), a
            }, s = t._gsQueue) {
            for (n = 0; s.length > n; n++)s[n]();
            for (r in p)p[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r)
        }
        o = !1
    }
})("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");
/*!
 * VERSION: beta 1.9.4
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (t) {
        var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope, n = r.com.greensock, a = 2 * Math.PI, o = Math.PI / 2, h = n._class, l = function (e, i) {
            var s = h("easing." + e, function () {
            }, !0), r = s.prototype = new t;
            return r.constructor = s, r.getRatio = i, s
        }, _ = t.register || function () {
            }, u = function (t, e, i, s) {
            var r = h("easing." + t, {easeOut: new e, easeIn: new i, easeInOut: new s}, !0);
            return _(r, t), r
        }, c = function (t, e, i) {
            this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
        }, p = function (e, i) {
            var s = h("easing." + e, function (t) {
                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
            }, !0), r = s.prototype = new t;
            return r.constructor = s, r.getRatio = i, r.config = function (t) {
                return new s(t)
            }, s
        }, f = u("Back", p("BackOut", function (t) {
            return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
        }), p("BackIn", function (t) {
            return t * t * ((this._p1 + 1) * t - this._p1)
        }), p("BackInOut", function (t) {
            return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
        })), m = h("easing.SlowMo", function (t, e, i) {
            e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
        }, !0), d = m.prototype = new t;
        return d.constructor = m, d.getRatio = function (t) {
            var e = t + (.5 - t) * this._p;
            return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }, m.ease = new m(.7, .7), d.config = m.config = function (t, e, i) {
            return new m(t, e, i)
        }, e = h("easing.SteppedEase", function (t) {
            t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
        }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function (t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
        }, d.config = e.config = function (t) {
            return new e(t)
        }, i = h("easing.RoughEase", function (e) {
            e = e || {};
            for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), p = u, f = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --p > -1;)i = f ? Math.random() : 1 / u * p, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), f ? s += Math.random() * r - .5 * r : p % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
                x: i,
                y: s
            };
            for (l.sort(function (t, e) {
                return t.x - e.x
            }), o = new c(1, 1, null), p = u; --p > -1;)a = l[p], o = new c(a.x, a.y, o);
            this._prev = new c(0, 0, 0 !== o.t ? o : o.next)
        }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;)e = e.next;
                e = e.prev
            } else for (; e.prev && e.t >= t;)e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c
        }, d.config = function (t) {
            return new i(t)
        }, i.ease = new i, u("Bounce", l("BounceOut", function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), l("BounceIn", function (t) {
            return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), l("BounceInOut", function (t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
        })), u("Circ", l("CircOut", function (t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), l("CircIn", function (t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), l("CircInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })), s = function (e, i, s) {
            var r = h("easing." + e, function (t, e) {
                this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
            }, !0), n = r.prototype = new t;
            return n.constructor = r, n.getRatio = i, n.config = function (t, e) {
                return new r(t, e)
            }, r
        }, u("Elastic", s("ElasticOut", function (t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .3), s("ElasticIn", function (t) {
            return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
        }, .3), s("ElasticInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .45)), u("Expo", l("ExpoOut", function (t) {
            return 1 - Math.pow(2, -10 * t)
        }), l("ExpoIn", function (t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), l("ExpoInOut", function (t) {
            return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })), u("Sine", l("SineOut", function (t) {
            return Math.sin(t * o)
        }), l("SineIn", function (t) {
            return -Math.cos(t * o) + 1
        }), l("SineInOut", function (t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })), h("easing.EaseLookup", {
            find: function (e) {
                return t.map[e]
            }
        }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), f
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik MГ¶ller. fixes from Paul Irish and Tino Zijdel

// MIT license

!function () {
    for (var n = 0, i = ["ms", "moz", "webkit", "o"], e = 0; e < i.length && !window.requestAnimationFrame; ++e)window.requestAnimationFrame = window[i[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i[e] + "CancelAnimationFrame"] || window[i[e] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (i) {
        var e = (new Date).getTime(), a = Math.max(0, 16 - (e - n)), o = window.setTimeout(function () {
            i(e + a)
        }, a);
        return n = e + a, o
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (n) {
        clearTimeout(n)
    })
}();
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 */
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad", swing: function (e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    }, easeInQuad: function (e, f, a, h, g) {
        return h * (f /= g) * f + a
    }, easeOutQuad: function (e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    }, easeInOutQuad: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    }, easeInCubic: function (e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    }, easeOutCubic: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    }, easeInOutCubic: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    }, easeInQuart: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    }, easeOutQuart: function (e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    }, easeInOutQuart: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    }, easeInQuint: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    }, easeOutQuint: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    }, easeInOutQuint: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    }, easeInSine: function (e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    }, easeOutSine: function (e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    }, easeInOutSine: function (e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    }, easeInExpo: function (e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    }, easeOutExpo: function (e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    }, easeInOutExpo: function (e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    }, easeInCirc: function (e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    }, easeOutCirc: function (e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    }, easeInOutCirc: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    }, easeInElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
    }, easeOutElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
    }, easeInOutElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k / 2) == 2) {
            return e + l
        }
        if (!j) {
            j = k * (0.3 * 1.5)
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
    }, easeInBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    }, easeOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    }, easeInOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    }, easeInBounce: function (e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    }, easeOutBounce: function (e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                }
            }
        }
    }, easeInOutBounce: function (e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }
});

var Swiper = function (selector, params) {
    'use strict';
    if (document.body.__defineGetter__) {
        if (HTMLElement) {
            var element = HTMLElement.prototype;
            if (element.__defineGetter__) {
                element.__defineGetter__('outerHTML', function () {
                    return new XMLSerializer().serializeToString(this);
                });
            }
        }
    }
    if (!window.getComputedStyle) {
        window.getComputedStyle = function (el, pseudo) {
            this.el = el;
            this.getPropertyValue = function (prop) {
                var re = /(\-([a-z]){1})/g;
                if (prop === 'float') prop = 'styleFloat';
                if (re.test(prop)) {
                    prop = prop.replace(re, function () {
                        return arguments[2].toUpperCase();
                    });
                }
                return el.currentStyle[prop] ? el.currentStyle[prop] : null;
            };
            return this;
        };
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!document.querySelectorAll) {
        if (!window.jQuery)return;
    }
    function $$(selector, context) {
        if (document.querySelectorAll)
            return (context || document).querySelectorAll(selector); else
            return jQuery(selector, context);
    }

    if (typeof selector === 'undefined')return;
    if (!(selector.nodeType)) {
        if ($$(selector).length === 0)return;
    }
    var _this = this;
    _this.touches = {start: 0, startX: 0, startY: 0, current: 0, currentX: 0, currentY: 0, diff: 0, abs: 0};
    _this.positions = {start: 0, abs: 0, diff: 0, current: 0};
    _this.times = {start: 0, end: 0};
    _this.id = (new Date()).getTime();
    _this.container = (selector.nodeType) ? selector : $$(selector)[0];
    _this.isTouched = false;
    _this.isMoved = false;
    _this.activeIndex = 0;
    _this.centerIndex = 0;
    _this.activeLoaderIndex = 0;
    _this.activeLoopIndex = 0;
    _this.previousIndex = null;
    _this.velocity = 0;
    _this.snapGrid = [];
    _this.slidesGrid = [];
    _this.imagesToLoad = [];
    _this.imagesLoaded = 0;
    _this.wrapperLeft = 0;
    _this.wrapperRight = 0;
    _this.wrapperTop = 0;
    _this.wrapperBottom = 0;
    _this.isAndroid = navigator.userAgent.toLowerCase().indexOf('android') >= 0;
    var wrapper, slideSize, wrapperSize, direction, isScrolling, containerSize;
    var defaults = {
        eventTarget: 'wrapper',
        mode: 'horizontal',
        touchRatio: 1,
        speed: 300,
        freeMode: false,
        freeModeFluid: false,
        momentumRatio: 1,
        momentumBounce: true,
        momentumBounceRatio: 1,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerViewFit: true,
        simulateTouch: true,
        followFinger: true,
        shortSwipes: true,
        longSwipesRatio: 0.5,
        moveStartThreshold: false,
        onlyExternal: false,
        createPagination: true,
        pagination: false,
        paginationElement: 'span',
        paginationClickable: false,
        paginationAsRange: true,
        resistance: true,
        scrollContainer: false,
        preventLinks: true,
        preventLinksPropagation: false,
        noSwiping: false,
        noSwipingClass: 'swiper-no-swiping',
        initialSlide: 0,
        keyboardControl: false,
        mousewheelControl: false,
        mousewheelControlForceToAxis: false,
        useCSS3Transforms: true,
        autoplay: false,
        autoplayDisableOnInteraction: true,
        autoplayStopOnLast: false,
        loop: false,
        loopAdditionalSlides: 0,
        roundLengths: false,
        calculateHeight: false,
        cssWidthAndHeight: false,
        updateOnImagesReady: true,
        releaseFormElements: true,
        watchActiveIndex: false,
        visibilityFullFit: false,
        offsetPxBefore: 0,
        offsetPxAfter: 0,
        offsetSlidesBefore: 0,
        offsetSlidesAfter: 0,
        centeredSlides: false,
        queueStartCallbacks: false,
        queueEndCallbacks: false,
        autoResize: true,
        resizeReInit: false,
        DOMAnimation: true,
        loader: {slides: [], slidesHTMLType: 'inner', surroundGroups: 1, logic: 'reload', loadAllSlides: false},
        slideElement: 'div',
        slideClass: 'swiper-slide',
        slideActiveClass: 'swiper-slide-active',
        slideVisibleClass: 'swiper-slide-visible',
        slideDuplicateClass: 'swiper-slide-duplicate',
        wrapperClass: 'swiper-wrapper',
        paginationElementClass: 'swiper-pagination-switch',
        paginationActiveClass: 'swiper-active-switch',
        paginationVisibleClass: 'swiper-visible-switch'
    };
    params = params || {};
    for (var prop in defaults) {
        if (prop in params && typeof params[prop] === 'object') {
            for (var subProp in defaults[prop]) {
                if (!(subProp in params[prop])) {
                    params[prop][subProp] = defaults[prop][subProp];
                }
            }
        }
        else if (!(prop in params)) {
            params[prop] = defaults[prop];
        }
    }
    _this.params = params;
    if (params.scrollContainer) {
        params.freeMode = true;
        params.freeModeFluid = true;
    }
    if (params.loop) {
        params.resistance = '100%';
    }
    var isH = params.mode === 'horizontal';
    var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
    if (_this.browser.ie10) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
    if (_this.browser.ie11) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
    _this.touchEvents = {
        touchStart: _this.support.touch || !params.simulateTouch ? 'touchstart' : desktopEvents[0],
        touchMove: _this.support.touch || !params.simulateTouch ? 'touchmove' : desktopEvents[1],
        touchEnd: _this.support.touch || !params.simulateTouch ? 'touchend' : desktopEvents[2]
    };
    for (var i = _this.container.childNodes.length - 1; i >= 0; i--) {
        if (_this.container.childNodes[i].className) {
            var _wrapperClasses = _this.container.childNodes[i].className.split(/\s+/);
            for (var j = 0; j < _wrapperClasses.length; j++) {
                if (_wrapperClasses[j] === params.wrapperClass) {
                    wrapper = _this.container.childNodes[i];
                }
            }
        }
    }
    _this.wrapper = wrapper;
    _this._extendSwiperSlide = function (el) {
        el.append = function () {
            if (params.loop) {
                el.insertAfter(_this.slides.length - _this.loopedSlides);
            }
            else {
                _this.wrapper.appendChild(el);
                _this.reInit();
            }
            return el;
        };
        el.prepend = function () {
            if (params.loop) {
                _this.wrapper.insertBefore(el, _this.slides[_this.loopedSlides]);
                _this.removeLoopedSlides();
                _this.calcSlides();
                _this.createLoop();
            }
            else {
                _this.wrapper.insertBefore(el, _this.wrapper.firstChild);
            }
            _this.reInit();
            return el;
        };
        el.insertAfter = function (index) {
            if (typeof index === 'undefined')return false;
            var beforeSlide;
            if (params.loop) {
                beforeSlide = _this.slides[index + 1 + _this.loopedSlides];
                if (beforeSlide) {
                    _this.wrapper.insertBefore(el, beforeSlide);
                }
                else {
                    _this.wrapper.appendChild(el);
                }
                _this.removeLoopedSlides();
                _this.calcSlides();
                _this.createLoop();
            }
            else {
                beforeSlide = _this.slides[index + 1];
                _this.wrapper.insertBefore(el, beforeSlide);
            }
            _this.reInit();
            return el;
        };
        el.clone = function () {
            return _this._extendSwiperSlide(el.cloneNode(true));
        };
        el.remove = function () {
            _this.wrapper.removeChild(el);
            _this.reInit();
        };
        el.html = function (html) {
            if (typeof html === 'undefined') {
                return el.innerHTML;
            }
            else {
                el.innerHTML = html;
                return el;
            }
        };
        el.index = function () {
            var index;
            for (var i = _this.slides.length - 1; i >= 0; i--) {
                if (el === _this.slides[i]) index = i;
            }
            return index;
        };
        el.isActive = function () {
            if (el.index() === _this.activeIndex)return true; else return false;
        };
        if (!el.swiperSlideDataStorage) el.swiperSlideDataStorage = {};
        el.getData = function (name) {
            return el.swiperSlideDataStorage[name];
        };
        el.setData = function (name, value) {
            el.swiperSlideDataStorage[name] = value;
            return el;
        };
        el.data = function (name, value) {
            if (typeof value === 'undefined') {
                return el.getAttribute('data-' + name);
            }
            else {
                el.setAttribute('data-' + name, value);
                return el;
            }
        };
        el.getWidth = function (outer, round) {
            return _this.h.getWidth(el, outer, round);
        };
        el.getHeight = function (outer, round) {
            return _this.h.getHeight(el, outer, round);
        };
        el.getOffset = function () {
            return _this.h.getOffset(el);
        };
        return el;
    };
    _this.calcSlides = function (forceCalcSlides) {
        var oldNumber = _this.slides ? _this.slides.length : false;
        _this.slides = [];
        _this.displaySlides = [];
        for (var i = 0; i < _this.wrapper.childNodes.length; i++) {
            if (_this.wrapper.childNodes[i].className) {
                var _className = _this.wrapper.childNodes[i].className;
                var _slideClasses = _className.split(/\s+/);
                for (var j = 0; j < _slideClasses.length; j++) {
                    if (_slideClasses[j] === params.slideClass) {
                        _this.slides.push(_this.wrapper.childNodes[i]);
                    }
                }
            }
        }
        for (i = _this.slides.length - 1; i >= 0; i--) {
            _this._extendSwiperSlide(_this.slides[i]);
        }
        if (oldNumber === false)return;
        if (oldNumber !== _this.slides.length || forceCalcSlides) {
            removeSlideEvents();
            addSlideEvents();
            _this.updateActiveSlide();
            if (_this.params.pagination) _this.createPagination();
            _this.callPlugins('numberOfSlidesChanged');
        }
    };
    _this.createSlide = function (html, slideClassList, el) {
        slideClassList = slideClassList || _this.params.slideClass;
        el = el || params.slideElement;
        var newSlide = document.createElement(el);
        newSlide.innerHTML = html || '';
        newSlide.className = slideClassList;
        return _this._extendSwiperSlide(newSlide);
    };
    _this.appendSlide = function (html, slideClassList, el) {
        if (!html)return;
        if (html.nodeType) {
            return _this._extendSwiperSlide(html).append();
        }
        else {
            return _this.createSlide(html, slideClassList, el).append();
        }
    };
    _this.prependSlide = function (html, slideClassList, el) {
        if (!html)return;
        if (html.nodeType) {
            return _this._extendSwiperSlide(html).prepend();
        }
        else {
            return _this.createSlide(html, slideClassList, el).prepend();
        }
    };
    _this.insertSlideAfter = function (index, html, slideClassList, el) {
        if (typeof index === 'undefined')return false;
        if (html.nodeType) {
            return _this._extendSwiperSlide(html).insertAfter(index);
        }
        else {
            return _this.createSlide(html, slideClassList, el).insertAfter(index);
        }
    };
    _this.removeSlide = function (index) {
        if (_this.slides[index]) {
            if (params.loop) {
                if (!_this.slides[index + _this.loopedSlides])return false;
                _this.slides[index + _this.loopedSlides].remove();
                _this.removeLoopedSlides();
                _this.calcSlides();
                _this.createLoop();
            }
            else _this.slides[index].remove();
            return true;
        }
        else return false;
    };
    _this.removeLastSlide = function () {
        if (_this.slides.length > 0) {
            if (params.loop) {
                _this.slides[_this.slides.length - 1 - _this.loopedSlides].remove();
                _this.removeLoopedSlides();
                _this.calcSlides();
                _this.createLoop();
            }
            else _this.slides[_this.slides.length - 1].remove();
            return true;
        }
        else {
            return false;
        }
    };
    _this.removeAllSlides = function () {
        for (var i = _this.slides.length - 1; i >= 0; i--) {
            _this.slides[i].remove();
        }
    };
    _this.getSlide = function (index) {
        return _this.slides[index];
    };
    _this.getLastSlide = function () {
        return _this.slides[_this.slides.length - 1];
    };
    _this.getFirstSlide = function () {
        return _this.slides[0];
    };
    _this.activeSlide = function () {
        return _this.slides[_this.activeIndex];
    };
    _this.fireCallback = function () {
        var callback = arguments[0];
        if (Object.prototype.toString.call(callback) === '[object Array]') {
            for (var i = 0; i < callback.length; i++) {
                if (typeof callback[i] === 'function') {
                    callback[i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        } else if (Object.prototype.toString.call(callback) === '[object String]') {
            if (params['on' + callback]) _this.fireCallback(params['on' + callback]);
        } else {
            callback(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
    };
    function isArray(obj) {
        if (Object.prototype.toString.apply(obj) === '[object Array]')return true;
        return false;
    }

    _this.addCallback = function (callback, func) {
        var _this = this, tempFunc;
        if (_this.params['on' + callback]) {
            if (isArray(this.params['on' + callback])) {
                return this.params['on' + callback].push(func);
            } else if (typeof this.params['on' + callback] === 'function') {
                tempFunc = this.params['on' + callback];
                this.params['on' + callback] = [];
                this.params['on' + callback].push(tempFunc);
                return this.params['on' + callback].push(func);
            }
        } else {
            this.params['on' + callback] = [];
            return this.params['on' + callback].push(func);
        }
    };
    _this.removeCallbacks = function (callback) {
        if (_this.params['on' + callback]) {
            _this.params['on' + callback] = null;
        }
    };
    var _plugins = [];
    for (var plugin in _this.plugins) {
        if (params[plugin]) {
            var p = _this.plugins[plugin](_this, params[plugin]);
            if (p) _plugins.push(p);
        }
    }
    _this.callPlugins = function (method, args) {
        if (!args) args = {};
        for (var i = 0; i < _plugins.length; i++) {
            if (method in _plugins[i]) {
                _plugins[i][method](args);
            }
        }
    };
    if ((_this.browser.ie10 || _this.browser.ie11) && !params.onlyExternal) {
        _this.wrapper.classList.add('swiper-wp8-' + (isH ? 'horizontal' : 'vertical'));
    }
    if (params.freeMode) {
        _this.container.className += ' swiper-free-mode';
    }
    _this.initialized = false;
    _this.init = function (force, forceCalcSlides) {
        var _width = _this.h.getWidth(_this.container, false, params.roundLengths);
        var _height = _this.h.getHeight(_this.container, false, params.roundLengths);
        if (_width === _this.width && _height === _this.height && !force)return;
        _this.width = _width;
        _this.height = _height;
        var slideWidth, slideHeight, slideMaxHeight, wrapperWidth, wrapperHeight, slideLeft;
        var i;
        containerSize = isH ? _width : _height;
        var wrapper = _this.wrapper;
        if (force) {
            _this.calcSlides(forceCalcSlides);
        }
        if (params.slidesPerView === 'auto') {
            var slidesWidth = 0;
            var slidesHeight = 0;
            if (params.slidesOffset > 0) {
                wrapper.style.paddingLeft = '';
                wrapper.style.paddingRight = '';
                wrapper.style.paddingTop = '';
                wrapper.style.paddingBottom = '';
            }
            wrapper.style.width = '';
            wrapper.style.height = '';
            if (params.offsetPxBefore > 0) {
                if (isH) _this.wrapperLeft = params.offsetPxBefore; else _this.wrapperTop = params.offsetPxBefore;
            }
            if (params.offsetPxAfter > 0) {
                if (isH) _this.wrapperRight = params.offsetPxAfter; else _this.wrapperBottom = params.offsetPxAfter;
            }
            if (params.centeredSlides) {
                if (isH) {
                    _this.wrapperLeft = (containerSize - this.slides[0].getWidth(true, params.roundLengths)) / 2;
                    _this.wrapperRight = (containerSize - _this.slides[_this.slides.length - 1].getWidth(true, params.roundLengths)) / 2;
                }
                else {
                    _this.wrapperTop = (containerSize - _this.slides[0].getHeight(true, params.roundLengths)) / 2;
                    _this.wrapperBottom = (containerSize - _this.slides[_this.slides.length - 1].getHeight(true, params.roundLengths)) / 2;
                }
            }
            if (isH) {
                if (_this.wrapperLeft >= 0) wrapper.style.paddingLeft = _this.wrapperLeft + 'px';
                if (_this.wrapperRight >= 0) wrapper.style.paddingRight = _this.wrapperRight + 'px';
            }
            else {
                if (_this.wrapperTop >= 0) wrapper.style.paddingTop = _this.wrapperTop + 'px';
                if (_this.wrapperBottom >= 0) wrapper.style.paddingBottom = _this.wrapperBottom + 'px';
            }
            slideLeft = 0;
            var centeredSlideLeft = 0;
            _this.snapGrid = [];
            _this.slidesGrid = [];
            slideMaxHeight = 0;
            for (i = 0; i < _this.slides.length; i++) {
                slideWidth = _this.slides[i].getWidth(true, params.roundLengths);
                slideHeight = _this.slides[i].getHeight(true, params.roundLengths);
                if (params.calculateHeight) {
                    slideMaxHeight = Math.max(slideMaxHeight, slideHeight);
                }
                var _slideSize = isH ? slideWidth : slideHeight;
                if (params.centeredSlides) {
                    var nextSlideWidth = i === _this.slides.length - 1 ? 0 : _this.slides[i + 1].getWidth(true, params.roundLengths);
                    var nextSlideHeight = i === _this.slides.length - 1 ? 0 : _this.slides[i + 1].getHeight(true, params.roundLengths);
                    var nextSlideSize = isH ? nextSlideWidth : nextSlideHeight;
                    if (_slideSize > containerSize) {
                        if (params.slidesPerViewFit) {
                            _this.snapGrid.push(slideLeft + _this.wrapperLeft);
                            _this.snapGrid.push(slideLeft + _slideSize - containerSize + _this.wrapperLeft);
                        }
                        else {
                            for (var j = 0; j <= Math.floor(_slideSize / (containerSize + _this.wrapperLeft)); j++) {
                                if (j === 0) _this.snapGrid.push(slideLeft + _this.wrapperLeft); else _this.snapGrid.push(slideLeft + _this.wrapperLeft + containerSize * j);
                            }
                        }
                        _this.slidesGrid.push(slideLeft + _this.wrapperLeft);
                    }
                    else {
                        _this.snapGrid.push(centeredSlideLeft);
                        _this.slidesGrid.push(centeredSlideLeft);
                    }
                    centeredSlideLeft += _slideSize / 2 + nextSlideSize / 2;
                }
                else {
                    if (_slideSize > containerSize) {
                        if (params.slidesPerViewFit) {
                            _this.snapGrid.push(slideLeft);
                            _this.snapGrid.push(slideLeft + _slideSize - containerSize);
                        }
                        else {
                            if (containerSize !== 0) {
                                for (var k = 0; k <= Math.floor(_slideSize / containerSize); k++) {
                                    _this.snapGrid.push(slideLeft + containerSize * k);
                                }
                            }
                            else {
                                _this.snapGrid.push(slideLeft);
                            }
                        }
                    }
                    else {
                        _this.snapGrid.push(slideLeft);
                    }
                    _this.slidesGrid.push(slideLeft);
                }
                slideLeft += _slideSize;
                slidesWidth += slideWidth;
                slidesHeight += slideHeight;
            }
            if (params.calculateHeight) _this.height = slideMaxHeight;
            if (isH) {
                wrapperSize = slidesWidth + _this.wrapperRight + _this.wrapperLeft;
                wrapper.style.width = (slidesWidth) + 'px';
                wrapper.style.height = (_this.height) + 'px';
            }
            else {
                wrapperSize = slidesHeight + _this.wrapperTop + _this.wrapperBottom;
                wrapper.style.width = (_this.width) + 'px';
                wrapper.style.height = (slidesHeight) + 'px';
            }
        }
        else if (params.scrollContainer) {
            wrapper.style.width = '';
            wrapper.style.height = '';
            wrapperWidth = _this.slides[0].getWidth(true, params.roundLengths);
            wrapperHeight = _this.slides[0].getHeight(true, params.roundLengths);
            wrapperSize = isH ? wrapperWidth : wrapperHeight;
            wrapper.style.width = wrapperWidth + 'px';
            wrapper.style.height = wrapperHeight + 'px';
            slideSize = isH ? wrapperWidth : wrapperHeight;
        }
        else {
            if (params.calculateHeight) {
                slideMaxHeight = 0;
                wrapperHeight = 0;
                if (!isH) _this.container.style.height = '';
                wrapper.style.height = '';
                for (i = 0; i < _this.slides.length; i++) {
                    _this.slides[i].style.height = '';
                    slideMaxHeight = Math.max(_this.slides[i].getHeight(true), slideMaxHeight);
                    if (!isH) wrapperHeight += _this.slides[i].getHeight(true);
                }
                slideHeight = slideMaxHeight;
                _this.height = slideHeight;
                if (isH) wrapperHeight = slideHeight; else {
                    containerSize = slideHeight;
                    _this.container.style.height = containerSize + 'px';
                }
            }
            else {
                slideHeight = isH ? _this.height : _this.height / params.slidesPerView;
                if (params.roundLengths) slideHeight = Math.round(slideHeight);
                wrapperHeight = isH ? _this.height : _this.slides.length * slideHeight;
            }
            slideWidth = isH ? _this.width / params.slidesPerView : _this.width;
            if (params.roundLengths) slideWidth = Math.round(slideWidth);
            wrapperWidth = isH ? _this.slides.length * slideWidth : _this.width;
            slideSize = isH ? slideWidth : slideHeight;
            if (params.offsetSlidesBefore > 0) {
                if (isH) _this.wrapperLeft = slideSize * params.offsetSlidesBefore; else _this.wrapperTop = slideSize * params.offsetSlidesBefore;
            }
            if (params.offsetSlidesAfter > 0) {
                if (isH) _this.wrapperRight = slideSize * params.offsetSlidesAfter; else _this.wrapperBottom = slideSize * params.offsetSlidesAfter;
            }
            if (params.offsetPxBefore > 0) {
                if (isH) _this.wrapperLeft = params.offsetPxBefore; else _this.wrapperTop = params.offsetPxBefore;
            }
            if (params.offsetPxAfter > 0) {
                if (isH) _this.wrapperRight = params.offsetPxAfter; else _this.wrapperBottom = params.offsetPxAfter;
            }
            if (params.centeredSlides) {
                if (isH) {
                    _this.wrapperLeft = (containerSize - slideSize) / 2;
                    _this.wrapperRight = (containerSize - slideSize) / 2;
                }
                else {
                    _this.wrapperTop = (containerSize - slideSize) / 2;
                    _this.wrapperBottom = (containerSize - slideSize) / 2;
                }
            }
            if (isH) {
                if (_this.wrapperLeft > 0) wrapper.style.paddingLeft = _this.wrapperLeft + 'px';
                if (_this.wrapperRight > 0) wrapper.style.paddingRight = _this.wrapperRight + 'px';
            }
            else {
                if (_this.wrapperTop > 0) wrapper.style.paddingTop = _this.wrapperTop + 'px';
                if (_this.wrapperBottom > 0) wrapper.style.paddingBottom = _this.wrapperBottom + 'px';
            }
            wrapperSize = isH ? wrapperWidth + _this.wrapperRight + _this.wrapperLeft : wrapperHeight + _this.wrapperTop + _this.wrapperBottom;
            if (!params.cssWidthAndHeight) {
                if (parseFloat(wrapperWidth) > 0) {
                    wrapper.style.width = wrapperWidth + 'px';
                }
                if (parseFloat(wrapperHeight) > 0) {
                    wrapper.style.height = wrapperHeight + 'px';
                }
            }
            slideLeft = 0;
            _this.snapGrid = [];
            _this.slidesGrid = [];
            for (i = 0; i < _this.slides.length; i++) {
                _this.snapGrid.push(slideLeft);
                _this.slidesGrid.push(slideLeft);
                slideLeft += slideSize;
                if (!params.cssWidthAndHeight) {
                    if (parseFloat(slideWidth) > 0) {
                        _this.slides[i].style.width = slideWidth + 'px';
                    }
                    if (parseFloat(slideHeight) > 0) {
                        _this.slides[i].style.height = slideHeight + 'px';
                    }
                }
            }
        }
        if (!_this.initialized) {
            _this.callPlugins('onFirstInit');
            if (params.onFirstInit) _this.fireCallback(params.onFirstInit, _this);
        }
        else {
            _this.callPlugins('onInit');
            if (params.onInit) _this.fireCallback(params.onInit, _this);
        }
        _this.initialized = true;
    };
    _this.reInit = function (forceCalcSlides) {
        _this.init(true, forceCalcSlides);
    };
    _this.resizeFix = function (reInit) {
        _this.callPlugins('beforeResizeFix');
        _this.init(params.resizeReInit || reInit);
        if (!params.freeMode) {
            _this.swipeTo((params.loop ? _this.activeLoopIndex : _this.activeIndex), 0, false);
            if (params.autoplay) {
                if (_this.support.transitions && typeof autoplayTimeoutId !== 'undefined') {
                    if (typeof autoplayTimeoutId !== 'undefined') {
                        clearTimeout(autoplayTimeoutId);
                        autoplayTimeoutId = undefined;
                        _this.startAutoplay();
                    }
                }
                else {
                    if (typeof autoplayIntervalId !== 'undefined') {
                        clearInterval(autoplayIntervalId);
                        autoplayIntervalId = undefined;
                        _this.startAutoplay();
                    }
                }
            }
        }
        else if (_this.getWrapperTranslate() < -maxWrapperPosition()) {
            _this.setWrapperTransition(0);
            _this.setWrapperTranslate(-maxWrapperPosition());
        }
        _this.callPlugins('afterResizeFix');
    };
    function maxWrapperPosition() {
        var a = (wrapperSize - containerSize);
        if (params.freeMode) {
            a = wrapperSize - containerSize;
        }
        if (params.slidesPerView > _this.slides.length && !params.centeredSlides) {
            a = 0;
        }
        if (a < 0) a = 0;
        return a;
    }

    function initEvents() {
        var bind = _this.h.addEventListener;
        var eventTarget = params.eventTarget === 'wrapper' ? _this.wrapper : _this.container;
        if (!(_this.browser.ie10 || _this.browser.ie11)) {
            if (_this.support.touch) {
                bind(eventTarget, 'touchstart', onTouchStart);
                bind(eventTarget, 'touchmove', onTouchMove);
                bind(eventTarget, 'touchend', onTouchEnd);
            }
            if (params.simulateTouch) {
                bind(eventTarget, 'mousedown', onTouchStart);
                bind(document, 'mousemove', onTouchMove);
                bind(document, 'mouseup', onTouchEnd);
            }
        }
        else {
            bind(eventTarget, _this.touchEvents.touchStart, onTouchStart);
            bind(document, _this.touchEvents.touchMove, onTouchMove);
            bind(document, _this.touchEvents.touchEnd, onTouchEnd);
        }
        if (params.autoResize) {
            bind(window, 'resize', _this.resizeFix);
        }
        addSlideEvents();
        _this._wheelEvent = false;
        if (params.mousewheelControl) {
            if (document.onmousewheel !== undefined) {
                _this._wheelEvent = 'mousewheel';
            }
            if (!_this._wheelEvent) {
                try {
                    new WheelEvent('wheel');
                    _this._wheelEvent = 'wheel';
                } catch (e) {
                }
            }
            if (!_this._wheelEvent) {
                _this._wheelEvent = 'DOMMouseScroll';
            }
            if (_this._wheelEvent) {
                bind(_this.container, _this._wheelEvent, handleMousewheel);
            }
        }
        function _loadImage(src) {
            var image = new Image();
            image.onload = function () {
                if (_this && _this.imagesLoaded !== undefined) _this.imagesLoaded++;
                if (_this.imagesLoaded === _this.imagesToLoad.length) {
                    _this.reInit();
                    if (params.onImagesReady) _this.fireCallback(params.onImagesReady, _this);
                }
            };
            image.src = src;
        }

        if (params.keyboardControl) {
            bind(document, 'keydown', handleKeyboardKeys);
        }
        if (params.updateOnImagesReady) {
            _this.imagesToLoad = $$('img', _this.container);
            for (var i = 0; i < _this.imagesToLoad.length; i++) {
                _loadImage(_this.imagesToLoad[i].getAttribute('src'));
            }
        }
    }

    _this.destroy = function () {
        var unbind = _this.h.removeEventListener;
        var eventTarget = params.eventTarget === 'wrapper' ? _this.wrapper : _this.container;
        if (!(_this.browser.ie10 || _this.browser.ie11)) {
            if (_this.support.touch) {
                unbind(eventTarget, 'touchstart', onTouchStart);
                unbind(eventTarget, 'touchmove', onTouchMove);
                unbind(eventTarget, 'touchend', onTouchEnd);
            }
            if (params.simulateTouch) {
                unbind(eventTarget, 'mousedown', onTouchStart);
                unbind(document, 'mousemove', onTouchMove);
                unbind(document, 'mouseup', onTouchEnd);
            }
        }
        else {
            unbind(eventTarget, _this.touchEvents.touchStart, onTouchStart);
            unbind(document, _this.touchEvents.touchMove, onTouchMove);
            unbind(document, _this.touchEvents.touchEnd, onTouchEnd);
        }
        if (params.autoResize) {
            unbind(window, 'resize', _this.resizeFix);
        }
        removeSlideEvents();
        if (params.paginationClickable) {
            removePaginationEvents();
        }
        if (params.mousewheelControl && _this._wheelEvent) {
            unbind(_this.container, _this._wheelEvent, handleMousewheel);
        }
        if (params.keyboardControl) {
            unbind(document, 'keydown', handleKeyboardKeys);
        }
        if (params.autoplay) {
            _this.stopAutoplay();
        }
        _this.callPlugins('onDestroy');
        _this = null;
    };
    function addSlideEvents() {
        var bind = _this.h.addEventListener, i;
        if (params.preventLinks) {
            var links = $$('a', _this.container);
            for (i = 0; i < links.length; i++) {
                bind(links[i], 'click', preventClick);
            }
        }
        if (params.releaseFormElements) {
            var formElements = $$('input, textarea, select', _this.container);
            for (i = 0; i < formElements.length; i++) {
                bind(formElements[i], _this.touchEvents.touchStart, releaseForms, true);
            }
        }
        if (params.onSlideClick) {
            for (i = 0; i < _this.slides.length; i++) {
                bind(_this.slides[i], 'click', slideClick);
            }
        }
        if (params.onSlideTouch) {
            for (i = 0; i < _this.slides.length; i++) {
                bind(_this.slides[i], _this.touchEvents.touchStart, slideTouch);
            }
        }
    }

    function removeSlideEvents() {
        var unbind = _this.h.removeEventListener, i;
        if (params.onSlideClick) {
            for (i = 0; i < _this.slides.length; i++) {
                unbind(_this.slides[i], 'click', slideClick);
            }
        }
        if (params.onSlideTouch) {
            for (i = 0; i < _this.slides.length; i++) {
                unbind(_this.slides[i], _this.touchEvents.touchStart, slideTouch);
            }
        }
        if (params.releaseFormElements) {
            var formElements = $$('input, textarea, select', _this.container);
            for (i = 0; i < formElements.length; i++) {
                unbind(formElements[i], _this.touchEvents.touchStart, releaseForms, true);
            }
        }
        if (params.preventLinks) {
            var links = $$('a', _this.container);
            for (i = 0; i < links.length; i++) {
                unbind(links[i], 'click', preventClick);
            }
        }
    }

    function handleKeyboardKeys(e) {
        var kc = e.keyCode || e.charCode;
        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey)return;
        if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
            var inView = false;
            var swiperOffset = _this.h.getOffset(_this.container);
            var scrollLeft = _this.h.windowScroll().left;
            var scrollTop = _this.h.windowScroll().top;
            var windowWidth = _this.h.windowWidth();
            var windowHeight = _this.h.windowHeight();
            var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + _this.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + _this.height], [swiperOffset.left + _this.width, swiperOffset.top + _this.height]];
            for (var i = 0; i < swiperCoord.length; i++) {
                var point = swiperCoord[i];
                if (point[0] >= scrollLeft && point[0] <= scrollLeft + windowWidth && point[1] >= scrollTop && point[1] <= scrollTop + windowHeight) {
                    inView = true;
                }
            }
            if (!inView)return;
        }
        if (isH) {
            if (kc === 37 || kc === 39) {
                if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            }
            if (kc === 39) _this.swipeNext();
            if (kc === 37) _this.swipePrev();
        }
        else {
            if (kc === 38 || kc === 40) {
                if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            }
            if (kc === 40) _this.swipeNext();
            if (kc === 38) _this.swipePrev();
        }
    }

    _this.disableKeyboardControl = function () {
        params.keyboardControl = false;
        _this.h.removeEventListener(document, 'keydown', handleKeyboardKeys);
    };
    _this.enableKeyboardControl = function () {
        params.keyboardControl = true;
        _this.h.addEventListener(document, 'keydown', handleKeyboardKeys);
    };
    var lastScrollTime = (new Date()).getTime();

    function handleMousewheel(e) {
        var we = _this._wheelEvent;
        var delta = 0;
        if (e.detail) delta = -e.detail; else if (we === 'mousewheel') {
            if (params.mousewheelControlForceToAxis) {
                if (isH) {
                    if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX; else return;
                }
                else {
                    if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY; else return;
                }
            }
            else {
                delta = e.wheelDelta;
            }
        }
        else if (we === 'DOMMouseScroll') delta = -e.detail; else if (we === 'wheel') {
            if (params.mousewheelControlForceToAxis) {
                if (isH) {
                    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX; else return;
                }
                else {
                    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY; else return;
                }
            }
            else {
                delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
            }
        }
        if (!params.freeMode) {
            if ((new Date()).getTime() - lastScrollTime > 60) {
                if (delta < 0) _this.swipeNext(); else _this.swipePrev();
            }
            lastScrollTime = (new Date()).getTime();
        }
        else {
            var position = _this.getWrapperTranslate() + delta;
            if (position > 0) position = 0;
            if (position < -maxWrapperPosition()) position = -maxWrapperPosition();
            _this.setWrapperTransition(0);
            _this.setWrapperTranslate(position);
            _this.updateActiveSlide(position);
            if (position === 0 || position === -maxWrapperPosition())return;
        }
        if (params.autoplay) _this.stopAutoplay(true);
        if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
        return false;
    }

    if (params.grabCursor) {
        var containerStyle = _this.container.style;
        containerStyle.cursor = 'move';
        containerStyle.cursor = 'grab';
        containerStyle.cursor = '-moz-grab';
        containerStyle.cursor = '-webkit-grab';
    }
    _this.allowSlideClick = true;
    function slideClick(event) {
        if (_this.allowSlideClick) {
            setClickedSlide(event);
            _this.fireCallback(params.onSlideClick, _this, event);
        }
    }

    function slideTouch(event) {
        setClickedSlide(event);
        _this.fireCallback(params.onSlideTouch, _this, event);
    }

    function setClickedSlide(event) {
        if (!event.currentTarget) {
            var element = event.srcElement;
            do {
                if (element.className.indexOf(params.slideClass) > -1) {
                    break;
                }
                element = element.parentNode;
            } while (element);
            _this.clickedSlide = element;
        }
        else {
            _this.clickedSlide = event.currentTarget;
        }
        _this.clickedSlideIndex = _this.slides.indexOf(_this.clickedSlide);
        _this.clickedSlideLoopIndex = _this.clickedSlideIndex - (_this.loopedSlides || 0);
    }

    _this.allowLinks = true;
    function preventClick(e) {
        if (!_this.allowLinks) {
            if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            if (params.preventLinksPropagation && 'stopPropagation' in e) {
                e.stopPropagation();
            }
            return false;
        }
    }

    function releaseForms(e) {
        if (e.stopPropagation) e.stopPropagation(); else e.returnValue = false;
        return false;
    }

    var isTouchEvent = false;
    var allowThresholdMove;
    var allowMomentumBounce = true;

    function onTouchStart(event) {
        if (params.preventLinks) _this.allowLinks = true;
        if (_this.isTouched || params.onlyExternal) {
            return false;
        }
        if (params.noSwiping && (event.target || event.srcElement) && noSwipingSlide(event.target || event.srcElement))return false;
        allowMomentumBounce = false;
        _this.isTouched = true;
        isTouchEvent = event.type === 'touchstart';
        if (!isTouchEvent || event.targetTouches.length === 1) {
            _this.callPlugins('onTouchStartBegin');
            if (!isTouchEvent && !_this.isAndroid) {
                if (event.preventDefault) event.preventDefault(); else event.returnValue = false;
            }
            var pageX = isTouchEvent ? event.targetTouches[0].pageX : (event.pageX || event.clientX);
            var pageY = isTouchEvent ? event.targetTouches[0].pageY : (event.pageY || event.clientY);
            _this.touches.startX = _this.touches.currentX = pageX;
            _this.touches.startY = _this.touches.currentY = pageY;
            _this.touches.start = _this.touches.current = isH ? pageX : pageY;
            _this.setWrapperTransition(0);
            _this.positions.start = _this.positions.current = _this.getWrapperTranslate();
            _this.setWrapperTranslate(_this.positions.start);
            _this.times.start = (new Date()).getTime();
            isScrolling = undefined;
            if (params.moveStartThreshold > 0) {
                allowThresholdMove = false;
            }
            if (params.onTouchStart) _this.fireCallback(params.onTouchStart, _this);
            _this.callPlugins('onTouchStartEnd');
        }
    }

    var velocityPrevPosition, velocityPrevTime;

    function onTouchMove(event) {
        if (!_this.isTouched || params.onlyExternal)return;
        if (isTouchEvent && event.type === 'mousemove')return;
        var pageX = isTouchEvent ? event.targetTouches[0].pageX : (event.pageX || event.clientX);
        var pageY = isTouchEvent ? event.targetTouches[0].pageY : (event.pageY || event.clientY);
        if (typeof isScrolling === 'undefined' && isH) {
            isScrolling = !!(isScrolling || Math.abs(pageY - _this.touches.startY) > Math.abs(pageX - _this.touches.startX));
        }
        if (typeof isScrolling === 'undefined' && !isH) {
            isScrolling = !!(isScrolling || Math.abs(pageY - _this.touches.startY) < Math.abs(pageX - _this.touches.startX));
        }
        if (isScrolling) {
            _this.isTouched = false;
            return;
        }
        if (event.assignedToSwiper) {
            _this.isTouched = false;
            return;
        }
        event.assignedToSwiper = true;
        if (params.preventLinks) {
            _this.allowLinks = false;
        }
        if (params.onSlideClick) {
            _this.allowSlideClick = false;
        }
        if (params.autoplay) {
            _this.stopAutoplay(true);
        }
        if (!isTouchEvent || event.touches.length === 1) {
            if (!_this.isMoved) {
                _this.callPlugins('onTouchMoveStart');
                if (params.loop) {
                    _this.fixLoop();
                    _this.positions.start = _this.getWrapperTranslate();
                }
                if (params.onTouchMoveStart) _this.fireCallback(params.onTouchMoveStart, _this);
            }
            _this.isMoved = true;
            if (event.preventDefault) event.preventDefault(); else event.returnValue = false;
            _this.touches.current = isH ? pageX : pageY;
            _this.positions.current = (_this.touches.current - _this.touches.start) * params.touchRatio + _this.positions.start;
            if (_this.positions.current > 0 && params.onResistanceBefore) {
                _this.fireCallback(params.onResistanceBefore, _this, _this.positions.current);
            }
            if (_this.positions.current < -maxWrapperPosition() && params.onResistanceAfter) {
                _this.fireCallback(params.onResistanceAfter, _this, Math.abs(_this.positions.current + maxWrapperPosition()));
            }
            if (params.resistance && params.resistance !== '100%') {
                var resistance;
                if (_this.positions.current > 0) {
                    resistance = 1 - _this.positions.current / containerSize / 2;
                    if (resistance < 0.5)
                        _this.positions.current = (containerSize / 2); else
                        _this.positions.current = _this.positions.current * resistance;
                }
                if (_this.positions.current < -maxWrapperPosition()) {
                    var diff = (_this.touches.current - _this.touches.start) * params.touchRatio + (maxWrapperPosition() + _this.positions.start);
                    resistance = (containerSize + diff) / (containerSize);
                    var newPos = _this.positions.current - diff * (1 - resistance) / 2;
                    var stopPos = -maxWrapperPosition() - containerSize / 2;
                    if (newPos < stopPos || resistance <= 0)
                        _this.positions.current = stopPos; else
                        _this.positions.current = newPos;
                }
            }
            if (params.resistance && params.resistance === '100%') {
                if (_this.positions.current > 0 && !(params.freeMode && !params.freeModeFluid)) {
                    _this.positions.current = 0;
                }
                if (_this.positions.current < -maxWrapperPosition() && !(params.freeMode && !params.freeModeFluid)) {
                    _this.positions.current = -maxWrapperPosition();
                }
            }
            if (!params.followFinger)return;
            if (!params.moveStartThreshold) {
                _this.setWrapperTranslate(_this.positions.current);
            }
            else {
                if (Math.abs(_this.touches.current - _this.touches.start) > params.moveStartThreshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        _this.touches.start = _this.touches.current;
                        return;
                    }
                    _this.setWrapperTranslate(_this.positions.current);
                }
                else {
                    _this.positions.current = _this.positions.start;
                }
            }
            if (params.freeMode || params.watchActiveIndex) {
                _this.updateActiveSlide(_this.positions.current);
            }
            if (params.grabCursor) {
                _this.container.style.cursor = 'move';
                _this.container.style.cursor = 'grabbing';
                _this.container.style.cursor = '-moz-grabbin';
                _this.container.style.cursor = '-webkit-grabbing';
            }
            if (!velocityPrevPosition) velocityPrevPosition = _this.touches.current;
            if (!velocityPrevTime) velocityPrevTime = (new Date()).getTime();
            _this.velocity = (_this.touches.current - velocityPrevPosition) / ((new Date()).getTime() - velocityPrevTime) / 2;
            if (Math.abs(_this.touches.current - velocityPrevPosition) < 2) _this.velocity = 0;
            velocityPrevPosition = _this.touches.current;
            velocityPrevTime = (new Date()).getTime();
            _this.callPlugins('onTouchMoveEnd');
            if (params.onTouchMove) _this.fireCallback(params.onTouchMove, _this);
            return false;
        }
    }

    function onTouchEnd(event) {
        if (isScrolling) {
            _this.swipeReset();
        }
        if (params.onlyExternal || !_this.isTouched)return;
        _this.isTouched = false;
        if (params.grabCursor) {
            _this.container.style.cursor = 'move';
            _this.container.style.cursor = 'grab';
            _this.container.style.cursor = '-moz-grab';
            _this.container.style.cursor = '-webkit-grab';
        }
        if (!_this.positions.current && _this.positions.current !== 0) {
            _this.positions.current = _this.positions.start;
        }
        if (params.followFinger) {
            _this.setWrapperTranslate(_this.positions.current);
        }
        _this.times.end = (new Date()).getTime();
        _this.touches.diff = _this.touches.current - _this.touches.start;
        _this.touches.abs = Math.abs(_this.touches.diff);
        _this.positions.diff = _this.positions.current - _this.positions.start;
        _this.positions.abs = Math.abs(_this.positions.diff);
        var diff = _this.positions.diff;
        var diffAbs = _this.positions.abs;
        var timeDiff = _this.times.end - _this.times.start;
        if (diffAbs < 5 && (timeDiff) < 300 && _this.allowLinks === false) {
            if (!params.freeMode && diffAbs !== 0) _this.swipeReset();
            if (params.preventLinks) {
                _this.allowLinks = true;
            }
            if (params.onSlideClick) {
                _this.allowSlideClick = true;
            }
        }
        setTimeout(function () {
            if (params.preventLinks) {
                _this.allowLinks = true;
            }
            if (params.onSlideClick) {
                _this.allowSlideClick = true;
            }
        }, 100);
        var maxPosition = maxWrapperPosition();
        if (!_this.isMoved && params.freeMode) {
            _this.isMoved = false;
            if (params.onTouchEnd) _this.fireCallback(params.onTouchEnd, _this);
            _this.callPlugins('onTouchEnd');
            return;
        }
        if (!_this.isMoved || _this.positions.current > 0 || _this.positions.current < -maxPosition) {
            _this.swipeReset();
            if (params.onTouchEnd) _this.fireCallback(params.onTouchEnd, _this);
            _this.callPlugins('onTouchEnd');
            return;
        }
        _this.isMoved = false;
        if (params.freeMode) {
            if (params.freeModeFluid) {
                var momentumDuration = 1000 * params.momentumRatio;
                var momentumDistance = _this.velocity * momentumDuration;
                var newPosition = _this.positions.current + momentumDistance;
                var doBounce = false;
                var afterBouncePosition;
                var bounceAmount = Math.abs(_this.velocity) * 20 * params.momentumBounceRatio;
                if (newPosition < -maxPosition) {
                    if (params.momentumBounce && _this.support.transitions) {
                        if (newPosition + maxPosition < -bounceAmount) newPosition = -maxPosition - bounceAmount;
                        afterBouncePosition = -maxPosition;
                        doBounce = true;
                        allowMomentumBounce = true;
                    }
                    else newPosition = -maxPosition;
                }
                if (newPosition > 0) {
                    if (params.momentumBounce && _this.support.transitions) {
                        if (newPosition > bounceAmount) newPosition = bounceAmount;
                        afterBouncePosition = 0;
                        doBounce = true;
                        allowMomentumBounce = true;
                    }
                    else newPosition = 0;
                }
                if (_this.velocity !== 0) momentumDuration = Math.abs((newPosition - _this.positions.current) / _this.velocity);
                _this.setWrapperTranslate(newPosition);
                _this.setWrapperTransition(momentumDuration);
                if (params.momentumBounce && doBounce) {
                    _this.wrapperTransitionEnd(function () {
                        if (!allowMomentumBounce)return;
                        if (params.onMomentumBounce) _this.fireCallback(params.onMomentumBounce, _this);
                        _this.callPlugins('onMomentumBounce');
                        _this.setWrapperTranslate(afterBouncePosition);
                        _this.setWrapperTransition(300);
                    });
                }
                _this.updateActiveSlide(newPosition);
            }
            if (!params.freeModeFluid || timeDiff >= 300) _this.updateActiveSlide(_this.positions.current);
            if (params.onTouchEnd) _this.fireCallback(params.onTouchEnd, _this);
            _this.callPlugins('onTouchEnd');
            return;
        }
        direction = diff < 0 ? 'toNext' : 'toPrev';
        if (direction === 'toNext' && (timeDiff <= 300)) {
            if (diffAbs < 30 || !params.shortSwipes) _this.swipeReset(); else _this.swipeNext(true);
        }
        if (direction === 'toPrev' && (timeDiff <= 300)) {
            if (diffAbs < 30 || !params.shortSwipes) _this.swipeReset(); else _this.swipePrev(true);
        }
        var targetSlideSize = 0;
        if (params.slidesPerView === 'auto') {
            var currentPosition = Math.abs(_this.getWrapperTranslate());
            var slidesOffset = 0;
            var _slideSize;
            for (var i = 0; i < _this.slides.length; i++) {
                _slideSize = isH ? _this.slides[i].getWidth(true, params.roundLengths) : _this.slides[i].getHeight(true, params.roundLengths);
                slidesOffset += _slideSize;
                if (slidesOffset > currentPosition) {
                    targetSlideSize = _slideSize;
                    break;
                }
            }
            if (targetSlideSize > containerSize) targetSlideSize = containerSize;
        }
        else {
            targetSlideSize = slideSize * params.slidesPerView;
        }
        if (direction === 'toNext' && (timeDiff > 300)) {
            if (diffAbs >= targetSlideSize * params.longSwipesRatio) {
                _this.swipeNext(true);
            }
            else {
                _this.swipeReset();
            }
        }
        if (direction === 'toPrev' && (timeDiff > 300)) {
            if (diffAbs >= targetSlideSize * params.longSwipesRatio) {
                _this.swipePrev(true);
            }
            else {
                _this.swipeReset();
            }
        }
        if (params.onTouchEnd) _this.fireCallback(params.onTouchEnd, _this);
        _this.callPlugins('onTouchEnd');
    }

    function noSwipingSlide(el) {
        var noSwiping = false;
        do {
            if (el.className.indexOf(params.noSwipingClass) > -1) {
                noSwiping = true;
            }
            el = el.parentElement;
        } while (!noSwiping && el.parentElement && el.className.indexOf(params.wrapperClass) === -1);
        if (!noSwiping && el.className.indexOf(params.wrapperClass) > -1 && el.className.indexOf(params.noSwipingClass) > -1)
            noSwiping = true;
        return noSwiping;
    }

    function addClassToHtmlString(klass, outerHtml) {
        var par = document.createElement('div');
        var child;
        par.innerHTML = outerHtml;
        child = par.firstChild;
        child.className += ' ' + klass;
        return child.outerHTML;
    }

    _this.swipeNext = function (internal) {
        if (!internal && params.loop) _this.fixLoop();
        if (!internal && params.autoplay) _this.stopAutoplay(true);
        _this.callPlugins('onSwipeNext');
        var currentPosition = _this.getWrapperTranslate();
        var newPosition = currentPosition;
        if (params.slidesPerView === 'auto') {
            for (var i = 0; i < _this.snapGrid.length; i++) {
                if (-currentPosition >= _this.snapGrid[i] && -currentPosition < _this.snapGrid[i + 1]) {
                    newPosition = -_this.snapGrid[i + 1];
                    break;
                }
            }
        }
        else {
            var groupSize = slideSize * params.slidesPerGroup;
            newPosition = -(Math.floor(Math.abs(currentPosition) / Math.floor(groupSize)) * groupSize + groupSize);
        }
        if (newPosition < -maxWrapperPosition()) {
            newPosition = -maxWrapperPosition();
        }
        if (newPosition === currentPosition)return false;
        swipeToPosition(newPosition, 'next');
        return true;
    };
    _this.swipePrev = function (internal) {
        if (!internal && params.loop) _this.fixLoop();
        if (!internal && params.autoplay) _this.stopAutoplay(true);
        _this.callPlugins('onSwipePrev');
        var currentPosition = Math.ceil(_this.getWrapperTranslate());
        var newPosition;
        if (params.slidesPerView === 'auto') {
            newPosition = 0;
            for (var i = 1; i < _this.snapGrid.length; i++) {
                if (-currentPosition === _this.snapGrid[i]) {
                    newPosition = -_this.snapGrid[i - 1];
                    break;
                }
                if (-currentPosition > _this.snapGrid[i] && -currentPosition < _this.snapGrid[i + 1]) {
                    newPosition = -_this.snapGrid[i];
                    break;
                }
            }
        }
        else {
            var groupSize = slideSize * params.slidesPerGroup;
            newPosition = -(Math.ceil(-currentPosition / groupSize) - 1) * groupSize;
        }
        if (newPosition > 0) newPosition = 0;
        if (newPosition === currentPosition)return false;
        swipeToPosition(newPosition, 'prev');
        return true;
    };
    _this.swipeReset = function () {
        _this.callPlugins('onSwipeReset');
        var currentPosition = _this.getWrapperTranslate();
        var groupSize = slideSize * params.slidesPerGroup;
        var newPosition;
        var maxPosition = -maxWrapperPosition();
        if (params.slidesPerView === 'auto') {
            newPosition = 0;
            for (var i = 0; i < _this.snapGrid.length; i++) {
                if (-currentPosition === _this.snapGrid[i])return;
                if (-currentPosition >= _this.snapGrid[i] && -currentPosition < _this.snapGrid[i + 1]) {
                    if (_this.positions.diff > 0) newPosition = -_this.snapGrid[i + 1]; else newPosition = -_this.snapGrid[i];
                    break;
                }
            }
            if (-currentPosition >= _this.snapGrid[_this.snapGrid.length - 1]) newPosition = -_this.snapGrid[_this.snapGrid.length - 1];
            if (currentPosition <= -maxWrapperPosition()) newPosition = -maxWrapperPosition();
        }
        else {
            newPosition = currentPosition < 0 ? Math.round(currentPosition / groupSize) * groupSize : 0;
        }
        if (params.scrollContainer) {
            newPosition = currentPosition < 0 ? currentPosition : 0;
        }
        if (newPosition < -maxWrapperPosition()) {
            newPosition = -maxWrapperPosition();
        }
        if (params.scrollContainer && (containerSize > slideSize)) {
            newPosition = 0;
        }
        if (newPosition === currentPosition)return false;
        swipeToPosition(newPosition, 'reset');
        return true;
    };
    _this.swipeTo = function (index, speed, runCallbacks) {
        index = parseInt(index, 10);
        _this.callPlugins('onSwipeTo', {index: index, speed: speed});
        if (params.loop) index = index + _this.loopedSlides;
        var currentPosition = _this.getWrapperTranslate();
        if (index > (_this.slides.length - 1) || index < 0)return;
        var newPosition;
        if (params.slidesPerView === 'auto') {
            newPosition = -_this.slidesGrid[index];
        }
        else {
            newPosition = -index * slideSize;
        }
        if (newPosition < -maxWrapperPosition()) {
            newPosition = -maxWrapperPosition();
        }
        if (newPosition === currentPosition)return false;
        runCallbacks = runCallbacks === false ? false : true;
        swipeToPosition(newPosition, 'to', {index: index, speed: speed, runCallbacks: runCallbacks});
        return true;
    };
    function swipeToPosition(newPosition, action, toOptions) {
        var speed = (action === 'to' && toOptions.speed >= 0) ? toOptions.speed : params.speed;
        var timeOld = +new Date();

        function anim() {
            var timeNew = +new Date();
            var time = timeNew - timeOld;
            currentPosition += animationStep * time / (1000 / 60);
            condition = direction === 'toNext' ? currentPosition > newPosition : currentPosition < newPosition;
            if (condition) {
                _this.setWrapperTranslate(Math.round(currentPosition));
                _this._DOMAnimating = true;
                window.setTimeout(function () {
                    anim();
                }, 1000 / 60);
            }
            else {
                if (params.onSlideChangeEnd) {
                    if (action === 'to') {
                        if (toOptions.runCallbacks === true) _this.fireCallback(params.onSlideChangeEnd, _this);
                    }
                    else {
                        _this.fireCallback(params.onSlideChangeEnd, _this);
                    }
                }
                _this.setWrapperTranslate(newPosition);
                _this._DOMAnimating = false;
            }
        }

        if (_this.support.transitions || !params.DOMAnimation) {
            _this.setWrapperTranslate(newPosition);
            _this.setWrapperTransition(speed);
        }
        else {
            var currentPosition = _this.getWrapperTranslate();
            var animationStep = Math.ceil((newPosition - currentPosition) / speed * (1000 / 60));
            var direction = currentPosition > newPosition ? 'toNext' : 'toPrev';
            var condition = direction === 'toNext' ? currentPosition > newPosition : currentPosition < newPosition;
            if (_this._DOMAnimating)return;
            anim();
        }
        _this.updateActiveSlide(newPosition);
        if (params.onSlideNext && action === 'next') {
            _this.fireCallback(params.onSlideNext, _this, newPosition);
        }
        if (params.onSlidePrev && action === 'prev') {
            _this.fireCallback(params.onSlidePrev, _this, newPosition);
        }
        if (params.onSlideReset && action === 'reset') {
            _this.fireCallback(params.onSlideReset, _this, newPosition);
        }
        if (action === 'next' || action === 'prev' || (action === 'to' && toOptions.runCallbacks === true))
            slideChangeCallbacks(action);
    }

    _this._queueStartCallbacks = false;
    _this._queueEndCallbacks = false;
    function slideChangeCallbacks(direction) {
        _this.callPlugins('onSlideChangeStart');
        if (params.onSlideChangeStart) {
            if (params.queueStartCallbacks && _this.support.transitions) {
                if (_this._queueStartCallbacks)return;
                _this._queueStartCallbacks = true;
                _this.fireCallback(params.onSlideChangeStart, _this, direction);
                _this.wrapperTransitionEnd(function () {
                    _this._queueStartCallbacks = false;
                });
            }
            else _this.fireCallback(params.onSlideChangeStart, _this, direction);
        }
        if (params.onSlideChangeEnd) {
            if (_this.support.transitions) {
                if (params.queueEndCallbacks) {
                    if (_this._queueEndCallbacks)return;
                    _this._queueEndCallbacks = true;
                    _this.wrapperTransitionEnd(function (swiper) {
                        _this.fireCallback(params.onSlideChangeEnd, swiper, direction);
                    });
                }
                else {
                    _this.wrapperTransitionEnd(function (swiper) {
                        _this.fireCallback(params.onSlideChangeEnd, swiper, direction);
                    });
                }
            }
            else {
                if (!params.DOMAnimation) {
                    setTimeout(function () {
                        _this.fireCallback(params.onSlideChangeEnd, _this, direction);
                    }, 10);
                }
            }
        }
    }

    _this.updateActiveSlide = function (position) {
        if (!_this.initialized)return;
        if (_this.slides.length === 0)return;
        _this.previousIndex = _this.activeIndex;
        if (typeof position === 'undefined') position = _this.getWrapperTranslate();
        if (position > 0) position = 0;
        var i;
        if (params.slidesPerView === 'auto') {
            var slidesOffset = 0;
            _this.activeIndex = _this.slidesGrid.indexOf(-position);
            if (_this.activeIndex < 0) {
                for (i = 0; i < _this.slidesGrid.length - 1; i++) {
                    if (-position > _this.slidesGrid[i] && -position < _this.slidesGrid[i + 1]) {
                        break;
                    }
                }
                var leftDistance = Math.abs(_this.slidesGrid[i] + position);
                var rightDistance = Math.abs(_this.slidesGrid[i + 1] + position);
                if (leftDistance <= rightDistance) _this.activeIndex = i; else _this.activeIndex = i + 1;
            }
        }
        else {
            _this.activeIndex = Math[params.visibilityFullFit ? 'ceil' : 'round'](-position / slideSize);
        }
        if (_this.activeIndex === _this.slides.length) _this.activeIndex = _this.slides.length - 1;
        if (_this.activeIndex < 0) _this.activeIndex = 0;
        if (!_this.slides[_this.activeIndex])return;
        _this.calcVisibleSlides(position);
        if (_this.support.classList) {
            var slide;
            for (i = 0; i < _this.slides.length; i++) {
                slide = _this.slides[i];
                slide.classList.remove(params.slideActiveClass);
                if (_this.visibleSlides.indexOf(slide) >= 0) {
                    slide.classList.add(params.slideVisibleClass);
                } else {
                    slide.classList.remove(params.slideVisibleClass);
                }
            }
            _this.slides[_this.activeIndex].classList.add(params.slideActiveClass);
        } else {
            var activeClassRegexp = new RegExp('\\s*' + params.slideActiveClass);
            var inViewClassRegexp = new RegExp('\\s*' + params.slideVisibleClass);
            for (i = 0; i < _this.slides.length; i++) {
                _this.slides[i].className = _this.slides[i].className.replace(activeClassRegexp, '').replace(inViewClassRegexp, '');
                if (_this.visibleSlides.indexOf(_this.slides[i]) >= 0) {
                    _this.slides[i].className += ' ' + params.slideVisibleClass;
                }
            }
            _this.slides[_this.activeIndex].className += ' ' + params.slideActiveClass;
        }
        if (params.loop) {
            var ls = _this.loopedSlides;
            _this.activeLoopIndex = _this.activeIndex - ls;
            if (_this.activeLoopIndex >= _this.slides.length - ls * 2) {
                _this.activeLoopIndex = _this.slides.length - ls * 2 - _this.activeLoopIndex;
            }
            if (_this.activeLoopIndex < 0) {
                _this.activeLoopIndex = _this.slides.length - ls * 2 + _this.activeLoopIndex;
            }
            if (_this.activeLoopIndex < 0) _this.activeLoopIndex = 0;
        }
        else {
            _this.activeLoopIndex = _this.activeIndex;
        }
        if (params.pagination) {
            _this.updatePagination(position);
        }
    };
    _this.createPagination = function (firstInit) {
        if (params.paginationClickable && _this.paginationButtons) {
            removePaginationEvents();
        }
        _this.paginationContainer = params.pagination.nodeType ? params.pagination : $$(params.pagination)[0];
        if (params.createPagination) {
            var paginationHTML = '';
            var numOfSlides = _this.slides.length;
            var numOfButtons = numOfSlides;
            if (params.loop) numOfButtons -= _this.loopedSlides * 2;
            for (var i = 0; i < numOfButtons; i++) {
                paginationHTML += '<' + params.paginationElement + ' class="' + params.paginationElementClass + '"></' + params.paginationElement + '>';
            }
            _this.paginationContainer.innerHTML = paginationHTML;
        }
        _this.paginationButtons = $$('.' + params.paginationElementClass, _this.paginationContainer);
        if (!firstInit) _this.updatePagination();
        _this.callPlugins('onCreatePagination');
        if (params.paginationClickable) {
            addPaginationEvents();
        }
    };
    function removePaginationEvents() {
        var pagers = _this.paginationButtons;
        if (pagers) {
            for (var i = 0; i < pagers.length; i++) {
                _this.h.removeEventListener(pagers[i], 'click', paginationClick);
            }
        }
    }

    function addPaginationEvents() {
        var pagers = _this.paginationButtons;
        if (pagers) {
            for (var i = 0; i < pagers.length; i++) {
                _this.h.addEventListener(pagers[i], 'click', paginationClick);
            }
        }
    }

    function paginationClick(e) {
        var index;
        var target = e.target || e.srcElement;
        var pagers = _this.paginationButtons;
        for (var i = 0; i < pagers.length; i++) {
            if (target === pagers[i]) index = i;
        }
        _this.swipeTo(index);
    }

    _this.updatePagination = function (position) {
        if (!params.pagination)return;
        if (_this.slides.length < 1)return;
        var activePagers = $$('.' + params.paginationActiveClass, _this.paginationContainer);
        if (!activePagers)return;
        var pagers = _this.paginationButtons;
        if (pagers.length === 0)return;
        for (var i = 0; i < pagers.length; i++) {
            pagers[i].className = params.paginationElementClass;
        }
        var indexOffset = params.loop ? _this.loopedSlides : 0;
        if (params.paginationAsRange) {
            if (!_this.visibleSlides) _this.calcVisibleSlides(position);
            var visibleIndexes = [];
            var j;
            for (j = 0; j < _this.visibleSlides.length; j++) {
                var visIndex = _this.slides.indexOf(_this.visibleSlides[j]) - indexOffset;
                if (params.loop && visIndex < 0) {
                    visIndex = _this.slides.length - _this.loopedSlides * 2 + visIndex;
                }
                if (params.loop && visIndex >= _this.slides.length - _this.loopedSlides * 2) {
                    visIndex = _this.slides.length - _this.loopedSlides * 2 - visIndex;
                    visIndex = Math.abs(visIndex);
                }
                visibleIndexes.push(visIndex);
            }
            for (j = 0; j < visibleIndexes.length; j++) {
                if (pagers[visibleIndexes[j]]) pagers[visibleIndexes[j]].className += ' ' + params.paginationVisibleClass;
            }
            if (params.loop) {
                if (pagers[_this.activeLoopIndex] !== undefined) {
                    pagers[_this.activeLoopIndex].className += ' ' + params.paginationActiveClass;
                }
            }
            else {
                pagers[_this.activeIndex].className += ' ' + params.paginationActiveClass;
            }
        }
        else {
            if (params.loop) {
                if (pagers[_this.activeLoopIndex]) pagers[_this.activeLoopIndex].className += ' ' + params.paginationActiveClass + ' ' + params.paginationVisibleClass;
            }
            else {
                pagers[_this.activeIndex].className += ' ' + params.paginationActiveClass + ' ' + params.paginationVisibleClass;
            }
        }
    };
    _this.calcVisibleSlides = function (position) {
        var visibleSlides = [];
        var _slideLeft = 0, _slideSize = 0, _slideRight = 0;
        if (isH && _this.wrapperLeft > 0) position = position + _this.wrapperLeft;
        if (!isH && _this.wrapperTop > 0) position = position + _this.wrapperTop;
        for (var i = 0; i < _this.slides.length; i++) {
            _slideLeft += _slideSize;
            if (params.slidesPerView === 'auto')
                _slideSize = isH ? _this.h.getWidth(_this.slides[i], true, params.roundLengths) : _this.h.getHeight(_this.slides[i], true, params.roundLengths); else _slideSize = slideSize;
            _slideRight = _slideLeft + _slideSize;
            var isVisibile = false;
            if (params.visibilityFullFit) {
                if (_slideLeft >= -position && _slideRight <= -position + containerSize) isVisibile = true;
                if (_slideLeft <= -position && _slideRight >= -position + containerSize) isVisibile = true;
            }
            else {
                if (_slideRight > -position && _slideRight <= ((-position + containerSize))) isVisibile = true;
                if (_slideLeft >= -position && _slideLeft < ((-position + containerSize))) isVisibile = true;
                if (_slideLeft < -position && _slideRight > ((-position + containerSize))) isVisibile = true;
            }
            if (isVisibile) visibleSlides.push(_this.slides[i]);
        }
        if (visibleSlides.length === 0) visibleSlides = [_this.slides[_this.activeIndex]];
        _this.visibleSlides = visibleSlides;
    };
    var autoplayTimeoutId, autoplayIntervalId;
    _this.startAutoplay = function () {
        if (_this.support.transitions) {
            if (typeof autoplayTimeoutId !== 'undefined')return false;
            if (!params.autoplay)return;
            _this.callPlugins('onAutoplayStart');
            if (params.onAutoplayStart) _this.fireCallback(params.onAutoplayStart, _this);
            autoplay();
        }
        else {
            if (typeof autoplayIntervalId !== 'undefined')return false;
            if (!params.autoplay)return;
            _this.callPlugins('onAutoplayStart');
            if (params.onAutoplayStart) _this.fireCallback(params.onAutoplayStart, _this);
            autoplayIntervalId = setInterval(function () {
                if (params.loop) {
                    _this.fixLoop();
                    _this.swipeNext(true);
                }
                else if (!_this.swipeNext(true)) {
                    if (!params.autoplayStopOnLast) _this.swipeTo(0); else {
                        clearInterval(autoplayIntervalId);
                        autoplayIntervalId = undefined;
                    }
                }
            }, params.autoplay);
        }
    };
    _this.stopAutoplay = function (internal) {
        if (_this.support.transitions) {
            if (!autoplayTimeoutId)return;
            if (autoplayTimeoutId) clearTimeout(autoplayTimeoutId);
            autoplayTimeoutId = undefined;
            if (internal && !params.autoplayDisableOnInteraction) {
                _this.wrapperTransitionEnd(function () {
                    autoplay();
                });
            }
            _this.callPlugins('onAutoplayStop');
            if (params.onAutoplayStop) _this.fireCallback(params.onAutoplayStop, _this);
        }
        else {
            if (autoplayIntervalId) clearInterval(autoplayIntervalId);
            autoplayIntervalId = undefined;
            _this.callPlugins('onAutoplayStop');
            if (params.onAutoplayStop) _this.fireCallback(params.onAutoplayStop, _this);
        }
    };
    function autoplay() {
        autoplayTimeoutId = setTimeout(function () {
            if (params.loop) {
                _this.fixLoop();
                _this.swipeNext(true);
            }
            else if (!_this.swipeNext(true)) {
                if (!params.autoplayStopOnLast) _this.swipeTo(0); else {
                    clearTimeout(autoplayTimeoutId);
                    autoplayTimeoutId = undefined;
                }
            }
            _this.wrapperTransitionEnd(function () {
                if (typeof autoplayTimeoutId !== 'undefined') autoplay();
            });
        }, params.autoplay);
    }

    _this.loopCreated = false;
    _this.removeLoopedSlides = function () {
        if (_this.loopCreated) {
            for (var i = 0; i < _this.slides.length; i++) {
                if (_this.slides[i].getData('looped') === true) _this.wrapper.removeChild(_this.slides[i]);
            }
        }
    };
    _this.createLoop = function () {
        if (_this.slides.length === 0)return;
        if (params.slidesPerView === 'auto') {
            _this.loopedSlides = params.loopedSlides || 1;
        }
        else {
            _this.loopedSlides = params.slidesPerView + params.loopAdditionalSlides;
        }
        if (_this.loopedSlides > _this.slides.length) {
            _this.loopedSlides = _this.slides.length;
        }
        var slideFirstHTML = '', slideLastHTML = '', i;
        var slidesSetFullHTML = '';
        var numSlides = _this.slides.length;
        var fullSlideSets = Math.floor(_this.loopedSlides / numSlides);
        var remainderSlides = _this.loopedSlides % numSlides;
        for (i = 0; i < (fullSlideSets * numSlides); i++) {
            var j = i;
            if (i >= numSlides) {
                var over = Math.floor(i / numSlides);
                j = i - (numSlides * over);
            }
            slidesSetFullHTML += _this.slides[j].outerHTML;
        }
        for (i = 0; i < remainderSlides; i++) {
            slideLastHTML += addClassToHtmlString(params.slideDuplicateClass, _this.slides[i].outerHTML);
        }
        for (i = numSlides - remainderSlides; i < numSlides; i++) {
            slideFirstHTML += addClassToHtmlString(params.slideDuplicateClass, _this.slides[i].outerHTML);
        }
        var slides = slideFirstHTML + slidesSetFullHTML + wrapper.innerHTML + slidesSetFullHTML + slideLastHTML;
        wrapper.innerHTML = slides;
        _this.loopCreated = true;
        _this.calcSlides();
        for (i = 0; i < _this.slides.length; i++) {
            if (i < _this.loopedSlides || i >= _this.slides.length - _this.loopedSlides) _this.slides[i].setData('looped', true);
        }
        _this.callPlugins('onCreateLoop');
    };
    _this.fixLoop = function () {
        var newIndex;
        if (_this.activeIndex < _this.loopedSlides) {
            newIndex = _this.slides.length - _this.loopedSlides * 3 + _this.activeIndex;
            _this.swipeTo(newIndex, 0, false);
        }
        else if ((params.slidesPerView === 'auto' && _this.activeIndex >= _this.loopedSlides * 2) || (_this.activeIndex > _this.slides.length - params.slidesPerView * 2)) {
            newIndex = -_this.slides.length + _this.activeIndex + _this.loopedSlides;
            _this.swipeTo(newIndex, 0, false);
        }
    };
    _this.loadSlides = function () {
        var slidesHTML = '';
        _this.activeLoaderIndex = 0;
        var slides = params.loader.slides;
        var slidesToLoad = params.loader.loadAllSlides ? slides.length : params.slidesPerView * (1 + params.loader.surroundGroups);
        for (var i = 0; i < slidesToLoad; i++) {
            if (params.loader.slidesHTMLType === 'outer') slidesHTML += slides[i]; else {
                slidesHTML += '<' + params.slideElement + ' class="' + params.slideClass + '" data-swiperindex="' + i + '">' + slides[i] + '</' + params.slideElement + '>';
            }
        }
        _this.wrapper.innerHTML = slidesHTML;
        _this.calcSlides(true);
        if (!params.loader.loadAllSlides) {
            _this.wrapperTransitionEnd(_this.reloadSlides, true);
        }
    };
    _this.reloadSlides = function () {
        var slides = params.loader.slides;
        var newActiveIndex = parseInt(_this.activeSlide().data('swiperindex'), 10);
        if (newActiveIndex < 0 || newActiveIndex > slides.length - 1)return;
        _this.activeLoaderIndex = newActiveIndex;
        var firstIndex = Math.max(0, newActiveIndex - params.slidesPerView * params.loader.surroundGroups);
        var lastIndex = Math.min(newActiveIndex + params.slidesPerView * (1 + params.loader.surroundGroups) - 1, slides.length - 1);
        if (newActiveIndex > 0) {
            var newTransform = -slideSize * (newActiveIndex - firstIndex);
            _this.setWrapperTranslate(newTransform);
            _this.setWrapperTransition(0);
        }
        var i;
        if (params.loader.logic === 'reload') {
            _this.wrapper.innerHTML = '';
            var slidesHTML = '';
            for (i = firstIndex; i <= lastIndex; i++) {
                slidesHTML += params.loader.slidesHTMLType === 'outer' ? slides[i] : '<' + params.slideElement + ' class="' + params.slideClass + '" data-swiperindex="' + i + '">' + slides[i] + '</' + params.slideElement + '>';
            }
            _this.wrapper.innerHTML = slidesHTML;
        }
        else {
            var minExistIndex = 1000;
            var maxExistIndex = 0;
            for (i = 0; i < _this.slides.length; i++) {
                var index = _this.slides[i].data('swiperindex');
                if (index < firstIndex || index > lastIndex) {
                    _this.wrapper.removeChild(_this.slides[i]);
                }
                else {
                    minExistIndex = Math.min(index, minExistIndex);
                    maxExistIndex = Math.max(index, maxExistIndex);
                }
            }
            for (i = firstIndex; i <= lastIndex; i++) {
                var newSlide;
                if (i < minExistIndex) {
                    newSlide = document.createElement(params.slideElement);
                    newSlide.className = params.slideClass;
                    newSlide.setAttribute('data-swiperindex', i);
                    newSlide.innerHTML = slides[i];
                    _this.wrapper.insertBefore(newSlide, _this.wrapper.firstChild);
                }
                if (i > maxExistIndex) {
                    newSlide = document.createElement(params.slideElement);
                    newSlide.className = params.slideClass;
                    newSlide.setAttribute('data-swiperindex', i);
                    newSlide.innerHTML = slides[i];
                    _this.wrapper.appendChild(newSlide);
                }
            }
        }
        _this.reInit(true);
    };
    function makeSwiper() {
        _this.calcSlides();
        if (params.loader.slides.length > 0 && _this.slides.length === 0) {
            _this.loadSlides();
        }
        if (params.loop) {
            _this.createLoop();
        }
        _this.init();
        initEvents();
        if (params.pagination) {
            _this.createPagination(true);
        }
        if (params.loop || params.initialSlide > 0) {
            _this.swipeTo(params.initialSlide, 0, false);
        }
        else {
            _this.updateActiveSlide(0);
        }
        if (params.autoplay) {
            _this.startAutoplay();
        }
        _this.centerIndex = _this.activeIndex;
        if (params.onSwiperCreated) _this.fireCallback(params.onSwiperCreated, _this);
        _this.callPlugins('onSwiperCreated');
    }

    makeSwiper();
};
Swiper.prototype = {
    plugins: {}, wrapperTransitionEnd: function (callback, permanent) {
        'use strict';
        var a = this, el = a.wrapper, events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'], i;

        function fireCallBack() {
            callback(a);
            if (a.params.queueEndCallbacks) a._queueEndCallbacks = false;
            if (!permanent) {
                for (i = 0; i < events.length; i++) {
                    a.h.removeEventListener(el, events[i], fireCallBack);
                }
            }
        }

        if (callback) {
            for (i = 0; i < events.length; i++) {
                a.h.addEventListener(el, events[i], fireCallBack);
            }
        }
    }, getWrapperTranslate: function (axis) {
        'use strict';
        var el = this.wrapper, matrix, curTransform, curStyle, transformMatrix;
        if (typeof axis === 'undefined') {
            axis = this.params.mode === 'horizontal' ? 'x' : 'y';
        }
        if (this.support.transforms && this.params.useCSS3Transforms) {
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
            if (axis === 'x') {
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41; else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]); else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42; else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]); else
                    curTransform = parseFloat(matrix[5]);
            }
        }
        else {
            if (axis === 'x') curTransform = parseFloat(el.style.left, 10) || 0;
            if (axis === 'y') curTransform = parseFloat(el.style.top, 10) || 0;
        }
        return curTransform || 0;
    }, setWrapperTranslate: function (x, y, z) {
        'use strict';
        var es = this.wrapper.style, coords = {x: 0, y: 0, z: 0}, translate;
        if (arguments.length === 3) {
            coords.x = x;
            coords.y = y;
            coords.z = z;
        }
        else {
            if (typeof y === 'undefined') {
                y = this.params.mode === 'horizontal' ? 'x' : 'y';
            }
            coords[y] = x;
        }
        if (this.support.transforms && this.params.useCSS3Transforms) {
            translate = this.support.transforms3d ? 'translate3d(' + coords.x + 'px, ' + coords.y + 'px, ' + coords.z + 'px)' : 'translate(' + coords.x + 'px, ' + coords.y + 'px)';
            es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = translate;
        }
        else {
            es.left = coords.x + 'px';
            es.top = coords.y + 'px';
        }
        this.callPlugins('onSetWrapperTransform', coords);
        if (this.params.onSetWrapperTransform) this.fireCallback(this.params.onSetWrapperTransform, this, coords);
    }, setWrapperTransition: function (duration) {
        'use strict';
        var es = this.wrapper.style;
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = (duration / 1000) + 's';
        this.callPlugins('onSetWrapperTransition', {duration: duration});
        if (this.params.onSetWrapperTransition) this.fireCallback(this.params.onSetWrapperTransition, this, duration);
    }, h: {
        getWidth: function (el, outer, round) {
            'use strict';
            var width = window.getComputedStyle(el, null).getPropertyValue('width');
            var returnWidth = parseFloat(width);
            if (isNaN(returnWidth) || width.indexOf('%') > 0) {
                returnWidth = el.offsetWidth - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-left')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-right'));
            }
            if (outer) returnWidth += parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-left')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-right'));
            if (round)return Math.round(returnWidth); else return returnWidth;
        }, getHeight: function (el, outer, round) {
            'use strict';
            if (outer)return el.offsetHeight;
            var height = window.getComputedStyle(el, null).getPropertyValue('height');
            var returnHeight = parseFloat(height);
            if (isNaN(returnHeight) || height.indexOf('%') > 0) {
                returnHeight = el.offsetHeight - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-top')) - parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
            }
            if (outer) returnHeight += parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
            if (round)return Math.round(returnHeight); else return returnHeight;
        }, getOffset: function (el) {
            'use strict';
            var box = el.getBoundingClientRect();
            var body = document.body;
            var clientTop = el.clientTop || body.clientTop || 0;
            var clientLeft = el.clientLeft || body.clientLeft || 0;
            var scrollTop = window.pageYOffset || el.scrollTop;
            var scrollLeft = window.pageXOffset || el.scrollLeft;
            if (document.documentElement && !window.pageYOffset) {
                scrollTop = document.documentElement.scrollTop;
                scrollLeft = document.documentElement.scrollLeft;
            }
            return {top: box.top + scrollTop - clientTop, left: box.left + scrollLeft - clientLeft};
        }, windowWidth: function () {
            'use strict';
            if (window.innerWidth)return window.innerWidth; else if (document.documentElement && document.documentElement.clientWidth)return document.documentElement.clientWidth;
        }, windowHeight: function () {
            'use strict';
            if (window.innerHeight)return window.innerHeight; else if (document.documentElement && document.documentElement.clientHeight)return document.documentElement.clientHeight;
        }, windowScroll: function () {
            'use strict';
            if (typeof pageYOffset !== 'undefined') {
                return {left: window.pageXOffset, top: window.pageYOffset};
            }
            else if (document.documentElement) {
                return {left: document.documentElement.scrollLeft, top: document.documentElement.scrollTop};
            }
        }, addEventListener: function (el, event, listener, useCapture) {
            'use strict';
            if (typeof useCapture === 'undefined') {
                useCapture = false;
            }
            if (el.addEventListener) {
                el.addEventListener(event, listener, useCapture);
            }
            else if (el.attachEvent) {
                el.attachEvent('on' + event, listener);
            }
        }, removeEventListener: function (el, event, listener, useCapture) {
            'use strict';
            if (typeof useCapture === 'undefined') {
                useCapture = false;
            }
            if (el.removeEventListener) {
                el.removeEventListener(event, listener, useCapture);
            }
            else if (el.detachEvent) {
                el.detachEvent('on' + event, listener);
            }
        }
    }, setTransform: function (el, transform) {
        'use strict';
        var es = el.style;
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transform;
    }, setTranslate: function (el, translate) {
        'use strict';
        var es = el.style;
        var pos = {x: translate.x || 0, y: translate.y || 0, z: translate.z || 0};
        var transformString = this.support.transforms3d ? 'translate3d(' + (pos.x) + 'px,' + (pos.y) + 'px,' + (pos.z) + 'px)' : 'translate(' + (pos.x) + 'px,' + (pos.y) + 'px)';
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transformString;
        if (!this.support.transforms) {
            es.left = pos.x + 'px';
            es.top = pos.y + 'px';
        }
    }, setTransition: function (el, duration) {
        'use strict';
        var es = el.style;
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = duration + 'ms';
    }, support: {
        touch: (window.Modernizr && Modernizr.touch === true) || (function () {
            'use strict';
            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        })(), transforms3d: (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
        })(), transforms: (window.Modernizr && Modernizr.csstransforms === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
        })(), transitions: (window.Modernizr && Modernizr.csstransitions === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
        })(), classList: (function () {
            'use strict';
            var div = document.createElement('div').style;
            return 'classList' in div;
        })()
    }, browser: {
        ie8: (function () {
            'use strict';
            var rv = -1;
            if (navigator.appName === 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
                if (re.exec(ua) !== null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv !== -1 && rv < 9;
        })(), ie10: window.navigator.msPointerEnabled, ie11: window.navigator.pointerEnabled
    }
};
if (window.jQuery || window.Zepto) {
    (function ($) {
        'use strict';
        $.fn.swiper = function (params) {
            var s = new Swiper($(this)[0], params);
            $(this).data('swiper', s);
            return s;
        };
    })(window.jQuery || window.Zepto);
}
if (typeof(module) !== 'undefined') {
    module.exports = Swiper;
}
if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return Swiper;
    });
}

Swiper.prototype.plugins.progress = function (swiper, params) {
    var isH = swiper.params.mode == 'horizontal';
    var wrapperMaxPosition;

    function initSlides() {
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide = swiper.slides[i];
            slide.progressSlideSize = isH ? swiper.h.getWidth(slide) : swiper.h.getHeight(slide);
            if ('offsetLeft' in slide) {
                slide.progressSlideOffset = isH ? slide.offsetLeft : slide.offsetTop;
            }
            else {
                slide.progressSlideOffset = isH ? slide.getOffset().left - swiper.h.getOffset(swiper.container).left : slide.getOffset().top - swiper.h.getOffset(swiper.container).top;
            }
        }
        if (isH) {
            wrapperMaxPosition = swiper.h.getWidth(swiper.wrapper) + swiper.wrapperLeft + swiper.wrapperRight - swiper.width;
        }
        else {
            wrapperMaxPosition = swiper.h.getHeight(swiper.wrapper) + swiper.wrapperTop + swiper.wrapperBottom - swiper.height;
        }
    }

    function calcProgress(transform) {
        var transform = transform || {x: 0, y: 0, z: 0};
        var offsetCenter;
        if (swiper.params.centeredSlides == true) offsetCenter = isH ? -transform.x + swiper.width / 2 : -transform.y + swiper.height / 2; else offsetCenter = isH ? -transform.x : -transform.y;
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide = swiper.slides[i];
            var slideCenterOffset = (swiper.params.centeredSlides == true) ? slide.progressSlideSize / 2 : 0;
            var offsetMultiplier = (offsetCenter - slide.progressSlideOffset - slideCenterOffset) / slide.progressSlideSize;
            slide.progress = offsetMultiplier;
        }
        swiper.progress = isH ? -transform.x / wrapperMaxPosition : -transform.y / wrapperMaxPosition;
        if (swiper.params.onProgressChange) swiper.params.onProgressChange(swiper);
    }

    var hooks = {
        onFirstInit: function (args) {
            initSlides()
            calcProgress({x: swiper.getWrapperTranslate('x'), y: swiper.getWrapperTranslate('y')});
        }, onInit: function (args) {
            initSlides()
        }, onSetWrapperTransform: function (transform) {
            calcProgress(transform);
        }
    }
    return hooks
}
Swiper.prototype.plugins.tdFlow = function (swiper, params) {
    if (!swiper.support.transforms3d)return;
    var slides, wrapperSize, slideSize, initialized;
    var isH = swiper.params.mode == 'horizontal';
    if (!params)return;
    var defaults = {rotate: 50, stretch: 0, depth: 100, modifier: 1, shadows: true}
    params = params || {};
    for (var prop in defaults) {
        if (!(prop in params)) {
            params[prop] = defaults[prop]
        }
    }
    function init() {
        initialized = true;
        slides = swiper.slides
        for (var i = 0; i < slides.length; i++) {
            swiper.setTransition(slides[i], 0)
        }
        if (isH) {
            wrapperSize = swiper.h.getWidth(swiper.wrapper);
            slideSize = wrapperSize / slides.length;
            for (var i = 0; i < slides.length; i++) {
                slides[i].swiperSlideOffset = slides[i].offsetLeft
            }
        }
        else {
            wrapperSize = swiper.h.getHeight(swiper.wrapper);
            slideSize = wrapperSize / slides.length;
            for (var i = 0; i < slides.length; i++) {
                slides[i].swiperSlideOffset = slides[i].offsetTop
            }
        }
    }

    function threeDSlides(transform) {
        if (!initialized)return;
        var transform = transform || {x: 0, y: 0, z: 0};
        var center = isH ? -transform.x + swiper.width / 2 : -transform.y + swiper.height / 2;
        var rotate = isH ? params.rotate : -params.rotate;
        var translate = params.depth;
        for (var i = 0; i < swiper.slides.length; i++) {
            var slideOffset = swiper.slides[i].swiperSlideOffset
            var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;
            var rotateY = isH ? rotate * offsetMultiplier : 0;
            var rotateX = isH ? 0 : rotate * offsetMultiplier;
            var translateZ = -translate * Math.abs(offsetMultiplier);
            var translateY = isH ? 0 : params.stretch * (offsetMultiplier)
            var translateX = isH ? params.stretch * (offsetMultiplier) : 0;
            if (Math.abs(translateX) < 0.001) translateX = 0;
            if (Math.abs(translateY) < 0.001) translateY = 0;
            if (Math.abs(translateZ) < 0.001) translateZ = 0;
            if (Math.abs(rotateY) < 0.001) rotateY = 0;
            if (Math.abs(rotateX) < 0.001) rotateX = 0;
            var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            swiper.setTransform(swiper.slides[i], slideTransform);
            swiper.slides[i].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1
            if (params.shadows) {
                var shadowBefore = isH ? swiper.slides[i].querySelector('.swiper-slide-shadow-left') : swiper.slides[i].querySelector('.swiper-slide-shadow-top');
                var shadowAfter = isH ? swiper.slides[i].querySelector('.swiper-slide-shadow-right') : swiper.slides[i].querySelector('.swiper-slide-shadow-bottom');
                shadowAfter.style.opacity = (-offsetMultiplier) > 0 ? (-offsetMultiplier) : 0;
                shadowBefore.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            }
        }
        if (swiper.ie10) {
            var ws = swiper.wrapper.style;
            ws.perspectiveOrigin = center + 'px 50%'
        }
    }

    var hooks = {
        onFirstInit: function (args) {
            slides = swiper.slides;
            if (params.shadows) {
                var shadowEl1 = document.createElement('div')
                var shadowEl2 = document.createElement('div')
                shadowEl1.className = isH ? 'swiper-slide-shadow-left' : 'swiper-slide-shadow-top'
                shadowEl2.className = isH ? 'swiper-slide-shadow-right' : 'swiper-slide-shadow-bottom'
                for (var i = 0; i < slides.length; i++) {
                    slides[i].appendChild(shadowEl1.cloneNode())
                    slides[i].appendChild(shadowEl2.cloneNode())
                }
            }
            init();
            threeDSlides({
                x: swiper.getWrapperTranslate('x'),
                y: swiper.getWrapperTranslate('y'),
                z: swiper.getWrapperTranslate('z')
            });
        }, onInit: function (args) {
            init();
            threeDSlides({
                x: swiper.getWrapperTranslate('x'),
                y: swiper.getWrapperTranslate('y'),
                z: swiper.getWrapperTranslate('z')
            });
        }, onSetWrapperTransform: function (transform) {
            threeDSlides(transform);
        }, onSetWrapperTransition: function (args) {
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.setTransition(swiper.slides[i], args.duration)
                if (isH && params.shadows) {
                    swiper.setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-left'), args.duration)
                    swiper.setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-right'), args.duration)
                }
                else if (params.shadows) {
                    swiper.setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-top'), args.duration)
                    swiper.setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-bottom'), args.duration)
                }
            }
        }
    }
    return hooks
};
/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {
    $.fn.downCount = function (options, callback) {
        var settings = $.extend({date: null, offset: null}, options);
        if (!settings.date) {
            $.error('Date is not defined.')
        }
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.')
        }
        var container = this;
        var currentDate = function () {
            var date = new Date();
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            var new_date = new Date(utc + (3600000 * settings.offset));
            return new_date
        };

        function countdown() {
            var target_date = new Date(settings.date), current_date = currentDate();
            var difference = target_date - current_date;
            if (difference < 0) {
                clearInterval(interval);
                if (callback && typeof callback === 'function') callback();
                return
            }
            var _second = 1000, _minute = _second * 60, _hour = _minute * 60, _day = _hour * 24;
            var days = Math.floor(difference / _day), hours = Math.floor((difference % _day) / _hour), minutes = Math.floor((difference % _hour) / _minute), seconds = Math.floor((difference % _minute) / _second);
            days = (String(days).length >= 2) ? days : '0' + days;
            hours = (String(hours).length >= 2) ? hours : '0' + hours;
            minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
            seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;
            var ref_days = (days === 1) ? 'day' : 'days', ref_hours = (hours === 1) ? 'hour' : 'hours', ref_minutes = (minutes === 1) ? 'minute' : 'minutes', ref_seconds = (seconds === 1) ? 'second' : 'seconds';
            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);
            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds)
        };
        var interval = setInterval(countdown, 1000)
    }
})(jQuery);
/*!
 Mailchimp Ajax Submit
 jQuery Plugin
 Author: Siddharth Doshi
 */

(function ($) {
    'use strict';
    $.ajaxChimp = {
        responses: {
            'We have sent you a confirmation email': 0,
            'Please enter a value': 1,
            'An email address must contain a single @': 2,
            'The domain portion of the email address is invalid (the portion after the @: )': 3,
            'The username portion of the email address is invalid (the portion before the @: )': 4,
            'This email address looks fake or invalid. Please enter a real email address': 5
        }, translations: {'en': null}, init: function (selector, options) {
            $(selector).ajaxChimp(options)
        }
    };
    $.fn.ajaxChimp = function (options) {
        $(this).each(function (i, elem) {
            var form = $(elem);
            var email = form.find('input[type=text]');
            var label = form.find('label[for=' + email.attr('id') + ']');
            var settings = $.extend({'url': form.attr('action'), 'language': 'en'}, options);
            var url = settings.url.replace('/post?', '/post-json?').concat('&c=?');
            form.attr('novalidate', 'true');
            email.attr('name', 'EMAIL');
            form.submit(function () {
                var msg;

                function successCallback(resp) {
                    if (resp.result === 'success') {
                        msg = 'We have sent you a confirmation email';
                        label.removeClass('error').addClass('valid');
                        email.removeClass('error').addClass('valid')
                    } else {
                        email.removeClass('valid').addClass('error');
                        label.removeClass('valid').addClass('error');
                        var index = -1;
                        try {
                            var parts = resp.msg.split(' - ', 2);
                            if (parts[1] === undefined) {
                                msg = resp.msg
                            } else {
                                var i = parseInt(parts[0], 10);
                                if (i.toString() === parts[0]) {
                                    index = parts[0];
                                    msg = parts[1]
                                } else {
                                    index = -1;
                                    msg = resp.msg
                                }
                            }
                        } catch (e) {
                            index = -1;
                            msg = resp.msg
                        }
                    }
                    if (settings.language !== 'en' && $.ajaxChimp.responses[msg] !== undefined && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) {
                        msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]
                    }
                    label.html(msg);
                    label.show(2000);
                    if (settings.callback) {
                        settings.callback(resp)
                    }
                }

                var data = {};
                var dataArray = form.serializeArray();
                $.each(dataArray, function (index, item) {
                    data[item.name] = item.value
                });
                $.ajax({
                    url: url,
                    data: data,
                    success: successCallback,
                    dataType: 'jsonp',
                    error: function (resp, text) {
                        console.log('mailchimp ajax submit error: ' + text)
                    }
                });
                var submitMsg = 'Submitting...';
                if (settings.language !== 'en' && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]['submit']) {
                    submitMsg = $.ajaxChimp.translations[settings.language]['submit']
                }
                label.html(submitMsg).show(2000);
                return false
            })
        });
        return this
    }
})(jQuery);

!function () {
    for (var t = 0, e = ["webkit", "moz"], i = 0; i < e.length && !window.requestAnimationFrame; ++i)window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (e) {
        var i = (new Date).getTime(), s = Math.max(0, 16 - (i - t)), n = window.setTimeout(function () {
            e(i + s)
        }, s);
        return t = i + s, n
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
        clearTimeout(t)
    })
}(), function (t) {
    t.snowfall = function (e, i) {
        function s(s, n, a, h, l) {
            this.id = l, this.x = s, this.y = n, this.size = a, this.speed = h, this.step = 0, this.stepSize = o(1, 10) / 100, i.collection && (this.target = u[o(0, u.length - 1)]);
            var r = null;
            i.image ? (r = t(document.createElement("img")), r[0].src = i.image) : (r = t(document.createElement("div")), r.css({background: i.flakeColor})), r.attr({
                "class": "snowfall-flakes",
                id: "flake-" + this.id
            }).css({
                width: this.size,
                height: this.size,
                position: "absolute",
                top: this.y,
                left: this.x,
                fontSize: 0,
                zIndex: i.flakeIndex
            }), t(e).get(0).tagName === t(document).get(0).tagName ? (t("body").append(r), e = t("body")) : t(e).append(r), this.element = document.getElementById("flake-" + this.id), this.update = function () {
                if (this.y += this.speed, this.y > d - (this.size + 6) && this.reset(), this.element.style.top = this.y + "px", this.element.style.left = this.x + "px", this.step += this.stepSize, this.x += S === !1 ? Math.cos(this.step) : S + Math.cos(this.step), i.collection && this.x > this.target.x && this.x < this.target.width + this.target.x && this.y > this.target.y && this.y < this.target.height + this.target.y) {
                    var t = this.target.element.getContext("2d"), e = this.x - this.target.x, s = this.y - this.target.y, n = this.target.colData;
                    if (void 0 !== n[parseInt(e)][parseInt(s + this.speed + this.size)] || s + this.speed + this.size > this.target.height)if (s + this.speed + this.size > this.target.height) {
                        for (; s + this.speed + this.size > this.target.height && this.speed > 0;)this.speed *= .5;
                        t.fillStyle = "#fff", void 0 == n[parseInt(e)][parseInt(s + this.speed + this.size)] ? (n[parseInt(e)][parseInt(s + this.speed + this.size)] = 1, t.fillRect(e, s + this.speed + this.size, this.size, this.size)) : (n[parseInt(e)][parseInt(s + this.speed)] = 1, t.fillRect(e, s + this.speed, this.size, this.size)), this.reset()
                    } else this.speed = 1, this.stepSize = 0, parseInt(e) + 1 < this.target.width && void 0 == n[parseInt(e) + 1][parseInt(s) + 1] ? this.x++ : parseInt(e) - 1 > 0 && void 0 == n[parseInt(e) - 1][parseInt(s) + 1] ? this.x-- : (t.fillStyle = "#fff", t.fillRect(e, s, this.size, this.size), n[parseInt(e)][parseInt(s)] = 1, this.reset())
                }
                (this.x > c - f || this.x < f) && this.reset()
            }, this.reset = function () {
                this.y = 0, this.x = o(f, c - f), this.stepSize = o(1, 10) / 100, this.size = o(100 * i.minSize, 100 * i.maxSize) / 100, this.speed = o(i.minSpeed, i.maxSpeed)
            }
        }

        function n() {
            for (r = 0; r < h.length; r += 1)h[r].update();
            p = requestAnimationFrame(function () {
                n()
            })
        }

        var a = {
            flakeCount: 35,
            flakeColor: "#ffffff",
            flakeIndex: 999999,
            minSize: 1,
            maxSize: 1,
            minSpeed: 1,
            maxSpeed: 5,
            round: !1,
            shadow: !1,
            collection: !1,
            collectionHeight: 40,
            deviceorientation: !1
        }, i = t.extend(a, i), o = function (t, e) {
            return Math.round(t + Math.random() * (e - t))
        };
        t(e).data("snowfall", this);
        var h = [], l = 0, r = 0, d = t(e).height(), c = t(e).width(), f = 0, p = 0;
        if (i.collection !== !1) {
            var m = document.createElement("canvas");
            if (m.getContext && m.getContext("2d"))for (var u = [], w = t(i.collection), g = i.collectionHeight, r = 0; r < w.length; r++) {
                var x = w[r].getBoundingClientRect(), z = document.createElement("canvas"), y = [];
                if (x.top - g > 0) {
                    document.body.appendChild(z), z.style.position = "absolute", z.height = g, z.width = x.width, z.style.left = x.left + "px", z.style.top = x.top - g + "px";
                    for (var v = 0; v < x.width; v++)y[v] = [];
                    u.push({element: z, x: x.left, y: x.top - g, width: x.width, height: g, colData: y})
                }
            } else i.collection = !1
        }
        for (t(e).get(0).tagName === t(document).get(0).tagName && (f = 25), t(window).bind("resize", function () {
            d = t(e)[0].clientHeight, c = t(e)[0].offsetWidth
        }), r = 0; r < i.flakeCount; r += 1)l = h.length, h.push(new s(o(f, c - f), o(0, d), o(100 * i.minSize, 100 * i.maxSize) / 100, o(i.minSpeed, i.maxSpeed), l));
        i.round && t(".snowfall-flakes").css({
            "-moz-border-radius": i.maxSize,
            "-webkit-border-radius": i.maxSize,
            "border-radius": i.maxSize
        }), i.shadow && t(".snowfall-flakes").css({
            "-moz-box-shadow": "1px 1px 1px #555",
            "-webkit-box-shadow": "1px 1px 1px #555",
            "box-shadow": "1px 1px 1px #555"
        });
        var S = !1;
        i.deviceorientation && t(window).bind("deviceorientation", function (t) {
            S = .1 * t.originalEvent.gamma
        }), n(), this.clear = function () {
            t(e).children(".snowfall-flakes").remove(), h = [], cancelAnimationFrame(p)
        }
    }, t.fn.snowfall = function (e) {
        return "object" == typeof e || void 0 == e ? this.each(function () {
                new t.snowfall(this, e)
            }) : "string" == typeof e ? this.each(function () {
                    var e = t(this).data("snowfall");
                    e && e.clear()
                }) : void 0
    }
}(jQuery), $("#fall-holder").snowfall({flakeCount: 50, maxSpeed: 10});
!function () {
    function e() {
        v = window.innerWidth, h = window.innerHeight, w = {
            x: v / 2,
            y: h / 2
        }, u = document.getElementById("canvas-holder"), u.style.height = h + "px", f = document.getElementById("demo-canvas"), f.width = v, f.height = h, m = f.getContext("2d"), g = [];
        for (var e = 0; v > e; e += v / 20)for (var t = 0; h > t; t += h / 20) {
            var n = e + Math.random() * v / 20, o = t + Math.random() * h / 20, i = {
                x: n,
                originX: n,
                y: o,
                originY: o
            };
            g.push(i)
        }
        for (var a = 0; a < g.length; a++) {
            for (var r = [], c = g[a], l = 0; l < g.length; l++) {
                var y = g[l];
                if (c != y) {
                    for (var p = !1, x = 0; 5 > x; x++)p || void 0 == r[x] && (r[x] = y, p = !0);
                    for (var x = 0; 5 > x; x++)p || s(c, y) < s(c, r[x]) && (r[x] = y, p = !0)
                }
            }
            c.closest = r
        }
        for (var a in g) {
            var M = new d(g[a], 2 + 2 * Math.random(), "rgba(255,255,255,0.3)");
            g[a].circle = M
        }
    }

    function t() {
        "ontouchstart" in window || window.addEventListener("mousemove", n), window.addEventListener("scroll", o), window.addEventListener("resize", i)
    }

    function n(e) {
        var t = posy = 0;
        e.pageX || e.pageY ? (t = e.pageX, posy = e.pageY) : (e.clientX || e.clientY) && (t = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop), w.x = t, w.y = posy
    }

    function o() {
        y = document.body.scrollTop > h ? !1 : !0
    }

    function i() {
        v = window.innerWidth, h = window.innerHeight, u.style.height = h + "px", f.width = v, f.height = h
    }

    function a() {
        r();
        for (var e in g)c(g[e])
    }

    function r() {
        if (y) {
            m.clearRect(0, 0, v, h);
            for (var e in g)Math.abs(s(w, g[e])) < 4e3 ? (g[e].active = .3, g[e].circle.active = .6) : Math.abs(s(w, g[e])) < 2e4 ? (g[e].active = .1, g[e].circle.active = .3) : Math.abs(s(w, g[e])) < 4e4 ? (g[e].active = .02, g[e].circle.active = .1) : (g[e].active = 0, g[e].circle.active = 0), l(g[e]), g[e].circle.draw()
        }
        requestAnimationFrame(r)
    }

    function c(e) {
        TweenLite.to(e, 1 + 1 * Math.random(), {
            x: e.originX - 50 + 100 * Math.random(),
            y: e.originY - 50 + 100 * Math.random(),
            ease: Circ.easeInOut,
            onComplete: function () {
                c(e)
            }
        })
    }

    function l(e) {
        if (e.active)for (var t in e.closest)m.beginPath(), m.moveTo(e.x, e.y), m.lineTo(e.closest[t].x, e.closest[t].y), m.strokeStyle = "rgba(255,255,255," + e.active + ")", m.stroke()
    }

    function d(e, t, n) {
        var o = this;
        !function () {
            o.pos = e || null, o.radius = t || null, o.color = n || null
        }(), this.draw = function () {
            o.active && (m.beginPath(), m.arc(o.pos.x, o.pos.y, o.radius, 0, 2 * Math.PI, !1), m.fillStyle = "rgba(255,255,255," + o.active + ")", m.fill())
        }
    }

    function s(e, t) {
        return Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)
    }

    var v, h, u, f, m, g, w, y = !0;
    e(), a(), t()
}();