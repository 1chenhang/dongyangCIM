var PlayerControl = (function (t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var i = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  return (
    (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" === typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var i in t)
          n.d(
            r,
            i,
            function (e) {
              return t[e];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 89))
  );
})([
  function (t, e) {
    (t.exports = function (t) {
      return t && t.__esModule ? t : { default: t };
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e) {
    (t.exports = function (t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e) {
    function n(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    (t.exports = function (t, e, r) {
      return (
        e && n(t.prototype, e),
        r && n(t, r),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    "use strict";
    (function (t) {
      var r = n(105),
        i = n(106),
        o = n(107);
      function a() {
        return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function s(t, e) {
        if (a() < e) throw new RangeError("Invalid typed array length");
        return (
          u.TYPED_ARRAY_SUPPORT
            ? ((t = new Uint8Array(e)).__proto__ = u.prototype)
            : (null === t && (t = new u(e)), (t.length = e)),
          t
        );
      }
      function u(t, e, n) {
        if (!u.TYPED_ARRAY_SUPPORT && !(this instanceof u))
          return new u(t, e, n);
        if ("number" === typeof t) {
          if ("string" === typeof e)
            throw new Error(
              "If encoding is specified then the first argument must be a string"
            );
          return f(this, t);
        }
        return c(this, t, e, n);
      }
      function c(t, e, n, r) {
        if ("number" === typeof e)
          throw new TypeError('"value" argument must not be a number');
        return "undefined" !== typeof ArrayBuffer && e instanceof ArrayBuffer
          ? (function (t, e, n, r) {
              if ((e.byteLength, n < 0 || e.byteLength < n))
                throw new RangeError("'offset' is out of bounds");
              if (e.byteLength < n + (r || 0))
                throw new RangeError("'length' is out of bounds");
              e =
                void 0 === n && void 0 === r
                  ? new Uint8Array(e)
                  : void 0 === r
                  ? new Uint8Array(e, n)
                  : new Uint8Array(e, n, r);
              u.TYPED_ARRAY_SUPPORT
                ? ((t = e).__proto__ = u.prototype)
                : (t = h(t, e));
              return t;
            })(t, e, n, r)
          : "string" === typeof e
          ? (function (t, e, n) {
              ("string" === typeof n && "" !== n) || (n = "utf8");
              if (!u.isEncoding(n))
                throw new TypeError(
                  '"encoding" must be a valid string encoding'
                );
              var r = 0 | p(e, n),
                i = (t = s(t, r)).write(e, n);
              i !== r && (t = t.slice(0, i));
              return t;
            })(t, e, n)
          : (function (t, e) {
              if (u.isBuffer(e)) {
                var n = 0 | d(e.length);
                return 0 === (t = s(t, n)).length ? t : (e.copy(t, 0, 0, n), t);
              }
              if (e) {
                if (
                  ("undefined" !== typeof ArrayBuffer &&
                    e.buffer instanceof ArrayBuffer) ||
                  "length" in e
                )
                  return "number" !== typeof e.length || (r = e.length) !== r
                    ? s(t, 0)
                    : h(t, e);
                if ("Buffer" === e.type && o(e.data)) return h(t, e.data);
              }
              var r;
              throw new TypeError(
                "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
              );
            })(t, e);
      }
      function l(t) {
        if ("number" !== typeof t)
          throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function f(t, e) {
        if ((l(e), (t = s(t, e < 0 ? 0 : 0 | d(e))), !u.TYPED_ARRAY_SUPPORT))
          for (var n = 0; n < e; ++n) t[n] = 0;
        return t;
      }
      function h(t, e) {
        var n = e.length < 0 ? 0 : 0 | d(e.length);
        t = s(t, n);
        for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
        return t;
      }
      function d(t) {
        if (t >= a())
          throw new RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              a().toString(16) +
              " bytes"
          );
        return 0 | t;
      }
      function p(t, e) {
        if (u.isBuffer(t)) return t.length;
        if (
          "undefined" !== typeof ArrayBuffer &&
          "function" === typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
        )
          return t.byteLength;
        "string" !== typeof t && (t = "" + t);
        var n = t.length;
        if (0 === n) return 0;
        for (var r = !1; ; )
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return n;
            case "utf8":
            case "utf-8":
            case void 0:
              return z(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * n;
            case "hex":
              return n >>> 1;
            case "base64":
              return N(t).length;
            default:
              if (r) return z(t).length;
              (e = ("" + e).toLowerCase()), (r = !0);
          }
      }
      function v(t, e, n) {
        var r = t[e];
        (t[e] = t[n]), (t[n] = r);
      }
      function g(t, e, n, r, i) {
        if (0 === t.length) return -1;
        if (
          ("string" === typeof n
            ? ((r = n), (n = 0))
            : n > 2147483647
            ? (n = 2147483647)
            : n < -2147483648 && (n = -2147483648),
          (n = +n),
          isNaN(n) && (n = i ? 0 : t.length - 1),
          n < 0 && (n = t.length + n),
          n >= t.length)
        ) {
          if (i) return -1;
          n = t.length - 1;
        } else if (n < 0) {
          if (!i) return -1;
          n = 0;
        }
        if (("string" === typeof e && (e = u.from(e, r)), u.isBuffer(e)))
          return 0 === e.length ? -1 : m(t, e, n, r, i);
        if ("number" === typeof e)
          return (
            (e &= 255),
            u.TYPED_ARRAY_SUPPORT &&
            "function" === typeof Uint8Array.prototype.indexOf
              ? i
                ? Uint8Array.prototype.indexOf.call(t, e, n)
                : Uint8Array.prototype.lastIndexOf.call(t, e, n)
              : m(t, [e], n, r, i)
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      function m(t, e, n, r, i) {
        var o,
          a = 1,
          s = t.length,
          u = e.length;
        if (
          void 0 !== r &&
          ("ucs2" === (r = String(r).toLowerCase()) ||
            "ucs-2" === r ||
            "utf16le" === r ||
            "utf-16le" === r)
        ) {
          if (t.length < 2 || e.length < 2) return -1;
          (a = 2), (s /= 2), (u /= 2), (n /= 2);
        }
        function c(t, e) {
          return 1 === a ? t[e] : t.readUInt16BE(e * a);
        }
        if (i) {
          var l = -1;
          for (o = n; o < s; o++)
            if (c(t, o) === c(e, -1 === l ? 0 : o - l)) {
              if ((-1 === l && (l = o), o - l + 1 === u)) return l * a;
            } else -1 !== l && (o -= o - l), (l = -1);
        } else
          for (n + u > s && (n = s - u), o = n; o >= 0; o--) {
            for (var f = !0, h = 0; h < u; h++)
              if (c(t, o + h) !== c(e, h)) {
                f = !1;
                break;
              }
            if (f) return o;
          }
        return -1;
      }
      function y(t, e, n, r) {
        n = Number(n) || 0;
        var i = t.length - n;
        r ? (r = Number(r)) > i && (r = i) : (r = i);
        var o = e.length;
        if (o % 2 !== 0) throw new TypeError("Invalid hex string");
        r > o / 2 && (r = o / 2);
        for (var a = 0; a < r; ++a) {
          var s = parseInt(e.substr(2 * a, 2), 16);
          if (isNaN(s)) return a;
          t[n + a] = s;
        }
        return a;
      }
      function b(t, e, n, r) {
        return V(z(e, t.length - n), t, n, r);
      }
      function w(t, e, n, r) {
        return V(
          (function (t) {
            for (var e = [], n = 0; n < t.length; ++n)
              e.push(255 & t.charCodeAt(n));
            return e;
          })(e),
          t,
          n,
          r
        );
      }
      function S(t, e, n, r) {
        return w(t, e, n, r);
      }
      function T(t, e, n, r) {
        return V(N(e), t, n, r);
      }
      function x(t, e, n, r) {
        return V(
          (function (t, e) {
            for (
              var n, r, i, o = [], a = 0;
              a < t.length && !((e -= 2) < 0);
              ++a
            )
              (n = t.charCodeAt(a)),
                (r = n >> 8),
                (i = n % 256),
                o.push(i),
                o.push(r);
            return o;
          })(e, t.length - n),
          t,
          n,
          r
        );
      }
      function E(t, e, n) {
        return 0 === e && n === t.length
          ? r.fromByteArray(t)
          : r.fromByteArray(t.slice(e, n));
      }
      function A(t, e, n) {
        n = Math.min(t.length, n);
        for (var r = [], i = e; i < n; ) {
          var o,
            a,
            s,
            u,
            c = t[i],
            l = null,
            f = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
          if (i + f <= n)
            switch (f) {
              case 1:
                c < 128 && (l = c);
                break;
              case 2:
                128 === (192 & (o = t[i + 1])) &&
                  (u = ((31 & c) << 6) | (63 & o)) > 127 &&
                  (l = u);
                break;
              case 3:
                (o = t[i + 1]),
                  (a = t[i + 2]),
                  128 === (192 & o) &&
                    128 === (192 & a) &&
                    (u = ((15 & c) << 12) | ((63 & o) << 6) | (63 & a)) >
                      2047 &&
                    (u < 55296 || u > 57343) &&
                    (l = u);
                break;
              case 4:
                (o = t[i + 1]),
                  (a = t[i + 2]),
                  (s = t[i + 3]),
                  128 === (192 & o) &&
                    128 === (192 & a) &&
                    128 === (192 & s) &&
                    (u =
                      ((15 & c) << 18) |
                      ((63 & o) << 12) |
                      ((63 & a) << 6) |
                      (63 & s)) > 65535 &&
                    u < 1114112 &&
                    (l = u);
            }
          null === l
            ? ((l = 65533), (f = 1))
            : l > 65535 &&
              ((l -= 65536),
              r.push(((l >>> 10) & 1023) | 55296),
              (l = 56320 | (1023 & l))),
            r.push(l),
            (i += f);
        }
        return (function (t) {
          var e = t.length;
          if (e <= R) return String.fromCharCode.apply(String, t);
          var n = "",
            r = 0;
          for (; r < e; )
            n += String.fromCharCode.apply(String, t.slice(r, (r += R)));
          return n;
        })(r);
      }
      (e.Buffer = u),
        (e.SlowBuffer = function (t) {
          +t != t && (t = 0);
          return u.alloc(+t);
        }),
        (e.INSPECT_MAX_BYTES = 50),
        (u.TYPED_ARRAY_SUPPORT =
          void 0 !== t.TYPED_ARRAY_SUPPORT
            ? t.TYPED_ARRAY_SUPPORT
            : (function () {
                try {
                  var t = new Uint8Array(1);
                  return (
                    (t.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function () {
                        return 42;
                      },
                    }),
                    42 === t.foo() &&
                      "function" === typeof t.subarray &&
                      0 === t.subarray(1, 1).byteLength
                  );
                } catch (t) {
                  return !1;
                }
              })()),
        (e.kMaxLength = a()),
        (u.poolSize = 8192),
        (u._augment = function (t) {
          return (t.__proto__ = u.prototype), t;
        }),
        (u.from = function (t, e, n) {
          return c(null, t, e, n);
        }),
        u.TYPED_ARRAY_SUPPORT &&
          ((u.prototype.__proto__ = Uint8Array.prototype),
          (u.__proto__ = Uint8Array),
          "undefined" !== typeof Symbol &&
            Symbol.species &&
            u[Symbol.species] === u &&
            Object.defineProperty(u, Symbol.species, {
              value: null,
              configurable: !0,
            })),
        (u.alloc = function (t, e, n) {
          return (function (t, e, n, r) {
            return (
              l(e),
              e <= 0
                ? s(t, e)
                : void 0 !== n
                ? "string" === typeof r
                  ? s(t, e).fill(n, r)
                  : s(t, e).fill(n)
                : s(t, e)
            );
          })(null, t, e, n);
        }),
        (u.allocUnsafe = function (t) {
          return f(null, t);
        }),
        (u.allocUnsafeSlow = function (t) {
          return f(null, t);
        }),
        (u.isBuffer = function (t) {
          return !(null == t || !t._isBuffer);
        }),
        (u.compare = function (t, e) {
          if (!u.isBuffer(t) || !u.isBuffer(e))
            throw new TypeError("Arguments must be Buffers");
          if (t === e) return 0;
          for (
            var n = t.length, r = e.length, i = 0, o = Math.min(n, r);
            i < o;
            ++i
          )
            if (t[i] !== e[i]) {
              (n = t[i]), (r = e[i]);
              break;
            }
          return n < r ? -1 : r < n ? 1 : 0;
        }),
        (u.isEncoding = function (t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (u.concat = function (t, e) {
          if (!o(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return u.alloc(0);
          var n;
          if (void 0 === e)
            for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
          var r = u.allocUnsafe(e),
            i = 0;
          for (n = 0; n < t.length; ++n) {
            var a = t[n];
            if (!u.isBuffer(a))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            a.copy(r, i), (i += a.length);
          }
          return r;
        }),
        (u.byteLength = p),
        (u.prototype._isBuffer = !0),
        (u.prototype.swap16 = function () {
          var t = this.length;
          if (t % 2 !== 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var e = 0; e < t; e += 2) v(this, e, e + 1);
          return this;
        }),
        (u.prototype.swap32 = function () {
          var t = this.length;
          if (t % 4 !== 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var e = 0; e < t; e += 4)
            v(this, e, e + 3), v(this, e + 1, e + 2);
          return this;
        }),
        (u.prototype.swap64 = function () {
          var t = this.length;
          if (t % 8 !== 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var e = 0; e < t; e += 8)
            v(this, e, e + 7),
              v(this, e + 1, e + 6),
              v(this, e + 2, e + 5),
              v(this, e + 3, e + 4);
          return this;
        }),
        (u.prototype.toString = function () {
          var t = 0 | this.length;
          return 0 === t
            ? ""
            : 0 === arguments.length
            ? A(this, 0, t)
            : function (t, e, n) {
                var r = !1;
                if (((void 0 === e || e < 0) && (e = 0), e > this.length))
                  return "";
                if (
                  ((void 0 === n || n > this.length) && (n = this.length),
                  n <= 0)
                )
                  return "";
                if ((n >>>= 0) <= (e >>>= 0)) return "";
                for (t || (t = "utf8"); ; )
                  switch (t) {
                    case "hex":
                      return D(this, e, n);
                    case "utf8":
                    case "utf-8":
                      return A(this, e, n);
                    case "ascii":
                      return _(this, e, n);
                    case "latin1":
                    case "binary":
                      return k(this, e, n);
                    case "base64":
                      return E(this, e, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return C(this, e, n);
                    default:
                      if (r) throw new TypeError("Unknown encoding: " + t);
                      (t = (t + "").toLowerCase()), (r = !0);
                  }
              }.apply(this, arguments);
        }),
        (u.prototype.equals = function (t) {
          if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === u.compare(this, t);
        }),
        (u.prototype.inspect = function () {
          var t = "",
            n = e.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((t = this.toString("hex", 0, n).match(/.{2}/g).join(" ")),
              this.length > n && (t += " ... ")),
            "<Buffer " + t + ">"
          );
        }),
        (u.prototype.compare = function (t, e, n, r, i) {
          if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          if (
            (void 0 === e && (e = 0),
            void 0 === n && (n = t ? t.length : 0),
            void 0 === r && (r = 0),
            void 0 === i && (i = this.length),
            e < 0 || n > t.length || r < 0 || i > this.length)
          )
            throw new RangeError("out of range index");
          if (r >= i && e >= n) return 0;
          if (r >= i) return -1;
          if (e >= n) return 1;
          if (this === t) return 0;
          for (
            var o = (i >>>= 0) - (r >>>= 0),
              a = (n >>>= 0) - (e >>>= 0),
              s = Math.min(o, a),
              c = this.slice(r, i),
              l = t.slice(e, n),
              f = 0;
            f < s;
            ++f
          )
            if (c[f] !== l[f]) {
              (o = c[f]), (a = l[f]);
              break;
            }
          return o < a ? -1 : a < o ? 1 : 0;
        }),
        (u.prototype.includes = function (t, e, n) {
          return -1 !== this.indexOf(t, e, n);
        }),
        (u.prototype.indexOf = function (t, e, n) {
          return g(this, t, e, n, !0);
        }),
        (u.prototype.lastIndexOf = function (t, e, n) {
          return g(this, t, e, n, !1);
        }),
        (u.prototype.write = function (t, e, n, r) {
          if (void 0 === e) (r = "utf8"), (n = this.length), (e = 0);
          else if (void 0 === n && "string" === typeof e)
            (r = e), (n = this.length), (e = 0);
          else {
            if (!isFinite(e))
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            (e |= 0),
              isFinite(n)
                ? ((n |= 0), void 0 === r && (r = "utf8"))
                : ((r = n), (n = void 0));
          }
          var i = this.length - e;
          if (
            ((void 0 === n || n > i) && (n = i),
            (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          r || (r = "utf8");
          for (var o = !1; ; )
            switch (r) {
              case "hex":
                return y(this, t, e, n);
              case "utf8":
              case "utf-8":
                return b(this, t, e, n);
              case "ascii":
                return w(this, t, e, n);
              case "latin1":
              case "binary":
                return S(this, t, e, n);
              case "base64":
                return T(this, t, e, n);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return x(this, t, e, n);
              default:
                if (o) throw new TypeError("Unknown encoding: " + r);
                (r = ("" + r).toLowerCase()), (o = !0);
            }
        }),
        (u.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        });
      var R = 4096;
      function _(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
        return r;
      }
      function k(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
        return r;
      }
      function D(t, e, n) {
        var r = t.length;
        (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
        for (var i = "", o = e; o < n; ++o) i += L(t[o]);
        return i;
      }
      function C(t, e, n) {
        for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2)
          i += String.fromCharCode(r[o] + 256 * r[o + 1]);
        return i;
      }
      function M(t, e, n) {
        if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > n)
          throw new RangeError("Trying to access beyond buffer length");
      }
      function I(t, e, n, r, i, o) {
        if (!u.isBuffer(t))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > i || e < o)
          throw new RangeError('"value" argument is out of bounds');
        if (n + r > t.length) throw new RangeError("Index out of range");
      }
      function B(t, e, n, r) {
        e < 0 && (e = 65535 + e + 1);
        for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i)
          t[n + i] =
            (e & (255 << (8 * (r ? i : 1 - i)))) >>> (8 * (r ? i : 1 - i));
      }
      function O(t, e, n, r) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i)
          t[n + i] = (e >>> (8 * (r ? i : 3 - i))) & 255;
      }
      function P(t, e, n, r, i, o) {
        if (n + r > t.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range");
      }
      function F(t, e, n, r, o) {
        return o || P(t, 0, n, 4), i.write(t, e, n, r, 23, 4), n + 4;
      }
      function U(t, e, n, r, o) {
        return o || P(t, 0, n, 8), i.write(t, e, n, r, 52, 8), n + 8;
      }
      (u.prototype.slice = function (t, e) {
        var n,
          r = this.length;
        if (
          ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
          (e = void 0 === e ? r : ~~e) < 0
            ? (e += r) < 0 && (e = 0)
            : e > r && (e = r),
          e < t && (e = t),
          u.TYPED_ARRAY_SUPPORT)
        )
          (n = this.subarray(t, e)).__proto__ = u.prototype;
        else {
          var i = e - t;
          n = new u(i, void 0);
          for (var o = 0; o < i; ++o) n[o] = this[o + t];
        }
        return n;
      }),
        (u.prototype.readUIntLE = function (t, e, n) {
          (t |= 0), (e |= 0), n || M(t, e, this.length);
          for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
            r += this[t + o] * i;
          return r;
        }),
        (u.prototype.readUIntBE = function (t, e, n) {
          (t |= 0), (e |= 0), n || M(t, e, this.length);
          for (var r = this[t + --e], i = 1; e > 0 && (i *= 256); )
            r += this[t + --e] * i;
          return r;
        }),
        (u.prototype.readUInt8 = function (t, e) {
          return e || M(t, 1, this.length), this[t];
        }),
        (u.prototype.readUInt16LE = function (t, e) {
          return e || M(t, 2, this.length), this[t] | (this[t + 1] << 8);
        }),
        (u.prototype.readUInt16BE = function (t, e) {
          return e || M(t, 2, this.length), (this[t] << 8) | this[t + 1];
        }),
        (u.prototype.readUInt32LE = function (t, e) {
          return (
            e || M(t, 4, this.length),
            (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
              16777216 * this[t + 3]
          );
        }),
        (u.prototype.readUInt32BE = function (t, e) {
          return (
            e || M(t, 4, this.length),
            16777216 * this[t] +
              ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
          );
        }),
        (u.prototype.readIntLE = function (t, e, n) {
          (t |= 0), (e |= 0), n || M(t, e, this.length);
          for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
            r += this[t + o] * i;
          return r >= (i *= 128) && (r -= Math.pow(2, 8 * e)), r;
        }),
        (u.prototype.readIntBE = function (t, e, n) {
          (t |= 0), (e |= 0), n || M(t, e, this.length);
          for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256); )
            o += this[t + --r] * i;
          return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
        }),
        (u.prototype.readInt8 = function (t, e) {
          return (
            e || M(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
          );
        }),
        (u.prototype.readInt16LE = function (t, e) {
          e || M(t, 2, this.length);
          var n = this[t] | (this[t + 1] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (u.prototype.readInt16BE = function (t, e) {
          e || M(t, 2, this.length);
          var n = this[t + 1] | (this[t] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (u.prototype.readInt32LE = function (t, e) {
          return (
            e || M(t, 4, this.length),
            this[t] |
              (this[t + 1] << 8) |
              (this[t + 2] << 16) |
              (this[t + 3] << 24)
          );
        }),
        (u.prototype.readInt32BE = function (t, e) {
          return (
            e || M(t, 4, this.length),
            (this[t] << 24) |
              (this[t + 1] << 16) |
              (this[t + 2] << 8) |
              this[t + 3]
          );
        }),
        (u.prototype.readFloatLE = function (t, e) {
          return e || M(t, 4, this.length), i.read(this, t, !0, 23, 4);
        }),
        (u.prototype.readFloatBE = function (t, e) {
          return e || M(t, 4, this.length), i.read(this, t, !1, 23, 4);
        }),
        (u.prototype.readDoubleLE = function (t, e) {
          return e || M(t, 8, this.length), i.read(this, t, !0, 52, 8);
        }),
        (u.prototype.readDoubleBE = function (t, e) {
          return e || M(t, 8, this.length), i.read(this, t, !1, 52, 8);
        }),
        (u.prototype.writeUIntLE = function (t, e, n, r) {
          ((t = +t), (e |= 0), (n |= 0), r) ||
            I(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
          var i = 1,
            o = 0;
          for (this[e] = 255 & t; ++o < n && (i *= 256); )
            this[e + o] = (t / i) & 255;
          return e + n;
        }),
        (u.prototype.writeUIntBE = function (t, e, n, r) {
          ((t = +t), (e |= 0), (n |= 0), r) ||
            I(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
          var i = n - 1,
            o = 1;
          for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
            this[e + i] = (t / o) & 255;
          return e + n;
        }),
        (u.prototype.writeUInt8 = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 1, 255, 0),
            u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            (this[e] = 255 & t),
            e + 1
          );
        }),
        (u.prototype.writeUInt16LE = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
              : B(this, t, e, !0),
            e + 2
          );
        }),
        (u.prototype.writeUInt16BE = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
              : B(this, t, e, !1),
            e + 2
          );
        }),
        (u.prototype.writeUInt32LE = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = 255 & t))
              : O(this, t, e, !0),
            e + 4
          );
        }),
        (u.prototype.writeUInt32BE = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t))
              : O(this, t, e, !1),
            e + 4
          );
        }),
        (u.prototype.writeIntLE = function (t, e, n, r) {
          if (((t = +t), (e |= 0), !r)) {
            var i = Math.pow(2, 8 * n - 1);
            I(this, t, e, n, i - 1, -i);
          }
          var o = 0,
            a = 1,
            s = 0;
          for (this[e] = 255 & t; ++o < n && (a *= 256); )
            t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1),
              (this[e + o] = (((t / a) >> 0) - s) & 255);
          return e + n;
        }),
        (u.prototype.writeIntBE = function (t, e, n, r) {
          if (((t = +t), (e |= 0), !r)) {
            var i = Math.pow(2, 8 * n - 1);
            I(this, t, e, n, i - 1, -i);
          }
          var o = n - 1,
            a = 1,
            s = 0;
          for (this[e + o] = 255 & t; --o >= 0 && (a *= 256); )
            t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1),
              (this[e + o] = (((t / a) >> 0) - s) & 255);
          return e + n;
        }),
        (u.prototype.writeInt8 = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 1, 127, -128),
            u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            t < 0 && (t = 255 + t + 1),
            (this[e] = 255 & t),
            e + 1
          );
        }),
        (u.prototype.writeInt16LE = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
              : B(this, t, e, !0),
            e + 2
          );
        }),
        (u.prototype.writeInt16BE = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
              : B(this, t, e, !1),
            e + 2
          );
        }),
        (u.prototype.writeInt32LE = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 4, 2147483647, -2147483648),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                (this[e + 2] = t >>> 16),
                (this[e + 3] = t >>> 24))
              : O(this, t, e, !0),
            e + 4
          );
        }),
        (u.prototype.writeInt32BE = function (t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || I(this, t, e, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t))
              : O(this, t, e, !1),
            e + 4
          );
        }),
        (u.prototype.writeFloatLE = function (t, e, n) {
          return F(this, t, e, !0, n);
        }),
        (u.prototype.writeFloatBE = function (t, e, n) {
          return F(this, t, e, !1, n);
        }),
        (u.prototype.writeDoubleLE = function (t, e, n) {
          return U(this, t, e, !0, n);
        }),
        (u.prototype.writeDoubleBE = function (t, e, n) {
          return U(this, t, e, !1, n);
        }),
        (u.prototype.copy = function (t, e, n, r) {
          if (
            (n || (n = 0),
            r || 0 === r || (r = this.length),
            e >= t.length && (e = t.length),
            e || (e = 0),
            r > 0 && r < n && (r = n),
            r === n)
          )
            return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (e < 0) throw new RangeError("targetStart out of bounds");
          if (n < 0 || n >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (r < 0) throw new RangeError("sourceEnd out of bounds");
          r > this.length && (r = this.length),
            t.length - e < r - n && (r = t.length - e + n);
          var i,
            o = r - n;
          if (this === t && n < e && e < r)
            for (i = o - 1; i >= 0; --i) t[i + e] = this[i + n];
          else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT)
            for (i = 0; i < o; ++i) t[i + e] = this[i + n];
          else Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
          return o;
        }),
        (u.prototype.fill = function (t, e, n, r) {
          if ("string" === typeof t) {
            if (
              ("string" === typeof e
                ? ((r = e), (e = 0), (n = this.length))
                : "string" === typeof n && ((r = n), (n = this.length)),
              1 === t.length)
            ) {
              var i = t.charCodeAt(0);
              i < 256 && (t = i);
            }
            if (void 0 !== r && "string" !== typeof r)
              throw new TypeError("encoding must be a string");
            if ("string" === typeof r && !u.isEncoding(r))
              throw new TypeError("Unknown encoding: " + r);
          } else "number" === typeof t && (t &= 255);
          if (e < 0 || this.length < e || this.length < n)
            throw new RangeError("Out of range index");
          if (n <= e) return this;
          var o;
          if (
            ((e >>>= 0),
            (n = void 0 === n ? this.length : n >>> 0),
            t || (t = 0),
            "number" === typeof t)
          )
            for (o = e; o < n; ++o) this[o] = t;
          else {
            var a = u.isBuffer(t) ? t : z(new u(t, r).toString()),
              s = a.length;
            for (o = 0; o < n - e; ++o) this[o + e] = a[o % s];
          }
          return this;
        });
      var j = /[^+\/0-9A-Za-z-_]/g;
      function L(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }
      function z(t, e) {
        var n;
        e = e || 1 / 0;
        for (var r = t.length, i = null, o = [], a = 0; a < r; ++a) {
          if ((n = t.charCodeAt(a)) > 55295 && n < 57344) {
            if (!i) {
              if (n > 56319) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (a + 1 === r) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = n;
              continue;
            }
            if (n < 56320) {
              (e -= 3) > -1 && o.push(239, 191, 189), (i = n);
              continue;
            }
            n = 65536 + (((i - 55296) << 10) | (n - 56320));
          } else i && (e -= 3) > -1 && o.push(239, 191, 189);
          if (((i = null), n < 128)) {
            if ((e -= 1) < 0) break;
            o.push(n);
          } else if (n < 2048) {
            if ((e -= 2) < 0) break;
            o.push((n >> 6) | 192, (63 & n) | 128);
          } else if (n < 65536) {
            if ((e -= 3) < 0) break;
            o.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            o.push(
              (n >> 18) | 240,
              ((n >> 12) & 63) | 128,
              ((n >> 6) & 63) | 128,
              (63 & n) | 128
            );
          }
        }
        return o;
      }
      function N(t) {
        return r.toByteArray(
          (function (t) {
            if (
              (t = (function (t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
              })(t).replace(j, "")).length < 2
            )
              return "";
            for (; t.length % 4 !== 0; ) t += "=";
            return t;
          })(t)
        );
      }
      function V(t, e, n, r) {
        for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i)
          e[i + n] = t[i];
        return i;
      }
    }).call(this, n(49));
  },
  function (t, e) {
    function n(e) {
      return (
        (t.exports = n =
          Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports),
        n(e)
      );
    }
    (t.exports = n),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    var r = n(159);
    (t.exports = function (t, e) {
      if ("function" !== typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        e && r(t, e);
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    var r = n(12).default,
      i = n(160);
    (t.exports = function (t, e) {
      if (e && ("object" === r(e) || "function" === typeof e)) return e;
      if (void 0 !== e)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return i(t);
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    (function () {
      var e;
      function n(t, e, n) {
        null != t &&
          ("number" == typeof t
            ? this.fromNumber(t, e, n)
            : null == e && "string" != typeof t
            ? this.fromString(t, 256)
            : this.fromString(t, e));
      }
      function r() {
        return new n(null);
      }
      var i = "undefined" !== typeof navigator;
      i && "Microsoft Internet Explorer" == navigator.appName
        ? ((n.prototype.am = function (t, e, n, r, i, o) {
            for (var a = 32767 & e, s = e >> 15; --o >= 0; ) {
              var u = 32767 & this[t],
                c = this[t++] >> 15,
                l = s * u + c * a;
              (i =
                ((u = a * u + ((32767 & l) << 15) + n[r] + (1073741823 & i)) >>>
                  30) +
                (l >>> 15) +
                s * c +
                (i >>> 30)),
                (n[r++] = 1073741823 & u);
            }
            return i;
          }),
          (e = 30))
        : i && "Netscape" != navigator.appName
        ? ((n.prototype.am = function (t, e, n, r, i, o) {
            for (; --o >= 0; ) {
              var a = e * this[t++] + n[r] + i;
              (i = Math.floor(a / 67108864)), (n[r++] = 67108863 & a);
            }
            return i;
          }),
          (e = 26))
        : ((n.prototype.am = function (t, e, n, r, i, o) {
            for (var a = 16383 & e, s = e >> 14; --o >= 0; ) {
              var u = 16383 & this[t],
                c = this[t++] >> 14,
                l = s * u + c * a;
              (i =
                ((u = a * u + ((16383 & l) << 14) + n[r] + i) >> 28) +
                (l >> 14) +
                s * c),
                (n[r++] = 268435455 & u);
            }
            return i;
          }),
          (e = 28)),
        (n.prototype.DB = e),
        (n.prototype.DM = (1 << e) - 1),
        (n.prototype.DV = 1 << e);
      (n.prototype.FV = Math.pow(2, 52)),
        (n.prototype.F1 = 52 - e),
        (n.prototype.F2 = 2 * e - 52);
      var o,
        a,
        s = "0123456789abcdefghijklmnopqrstuvwxyz",
        u = new Array();
      for (o = "0".charCodeAt(0), a = 0; a <= 9; ++a) u[o++] = a;
      for (o = "a".charCodeAt(0), a = 10; a < 36; ++a) u[o++] = a;
      for (o = "A".charCodeAt(0), a = 10; a < 36; ++a) u[o++] = a;
      function c(t) {
        return s.charAt(t);
      }
      function l(t, e) {
        var n = u[t.charCodeAt(e)];
        return null == n ? -1 : n;
      }
      function f(t) {
        var e = r();
        return e.fromInt(t), e;
      }
      function h(t) {
        var e,
          n = 1;
        return (
          0 != (e = t >>> 16) && ((t = e), (n += 16)),
          0 != (e = t >> 8) && ((t = e), (n += 8)),
          0 != (e = t >> 4) && ((t = e), (n += 4)),
          0 != (e = t >> 2) && ((t = e), (n += 2)),
          0 != (e = t >> 1) && ((t = e), (n += 1)),
          n
        );
      }
      function d(t) {
        this.m = t;
      }
      function p(t) {
        (this.m = t),
          (this.mp = t.invDigit()),
          (this.mpl = 32767 & this.mp),
          (this.mph = this.mp >> 15),
          (this.um = (1 << (t.DB - 15)) - 1),
          (this.mt2 = 2 * t.t);
      }
      function v(t, e) {
        return t & e;
      }
      function g(t, e) {
        return t | e;
      }
      function m(t, e) {
        return t ^ e;
      }
      function y(t, e) {
        return t & ~e;
      }
      function b(t) {
        if (0 == t) return -1;
        var e = 0;
        return (
          0 == (65535 & t) && ((t >>= 16), (e += 16)),
          0 == (255 & t) && ((t >>= 8), (e += 8)),
          0 == (15 & t) && ((t >>= 4), (e += 4)),
          0 == (3 & t) && ((t >>= 2), (e += 2)),
          0 == (1 & t) && ++e,
          e
        );
      }
      function w(t) {
        for (var e = 0; 0 != t; ) (t &= t - 1), ++e;
        return e;
      }
      function S() {}
      function T(t) {
        return t;
      }
      function x(t) {
        (this.r2 = r()),
          (this.q3 = r()),
          n.ONE.dlShiftTo(2 * t.t, this.r2),
          (this.mu = this.r2.divide(t)),
          (this.m = t);
      }
      (d.prototype.convert = function (t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
      }),
        (d.prototype.revert = function (t) {
          return t;
        }),
        (d.prototype.reduce = function (t) {
          t.divRemTo(this.m, null, t);
        }),
        (d.prototype.mulTo = function (t, e, n) {
          t.multiplyTo(e, n), this.reduce(n);
        }),
        (d.prototype.sqrTo = function (t, e) {
          t.squareTo(e), this.reduce(e);
        }),
        (p.prototype.convert = function (t) {
          var e = r();
          return (
            t.abs().dlShiftTo(this.m.t, e),
            e.divRemTo(this.m, null, e),
            t.s < 0 && e.compareTo(n.ZERO) > 0 && this.m.subTo(e, e),
            e
          );
        }),
        (p.prototype.revert = function (t) {
          var e = r();
          return t.copyTo(e), this.reduce(e), e;
        }),
        (p.prototype.reduce = function (t) {
          for (; t.t <= this.mt2; ) t[t.t++] = 0;
          for (var e = 0; e < this.m.t; ++e) {
            var n = 32767 & t[e],
              r =
                (n * this.mpl +
                  (((n * this.mph + (t[e] >> 15) * this.mpl) & this.um) <<
                    15)) &
                t.DM;
            for (
              t[(n = e + this.m.t)] += this.m.am(0, r, t, e, 0, this.m.t);
              t[n] >= t.DV;

            )
              (t[n] -= t.DV), t[++n]++;
          }
          t.clamp(),
            t.drShiftTo(this.m.t, t),
            t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
        }),
        (p.prototype.mulTo = function (t, e, n) {
          t.multiplyTo(e, n), this.reduce(n);
        }),
        (p.prototype.sqrTo = function (t, e) {
          t.squareTo(e), this.reduce(e);
        }),
        (n.prototype.copyTo = function (t) {
          for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
          (t.t = this.t), (t.s = this.s);
        }),
        (n.prototype.fromInt = function (t) {
          (this.t = 1),
            (this.s = t < 0 ? -1 : 0),
            t > 0
              ? (this[0] = t)
              : t < -1
              ? (this[0] = t + this.DV)
              : (this.t = 0);
        }),
        (n.prototype.fromString = function (t, e) {
          var r;
          if (16 == e) r = 4;
          else if (8 == e) r = 3;
          else if (256 == e) r = 8;
          else if (2 == e) r = 1;
          else if (32 == e) r = 5;
          else {
            if (4 != e) return void this.fromRadix(t, e);
            r = 2;
          }
          (this.t = 0), (this.s = 0);
          for (var i = t.length, o = !1, a = 0; --i >= 0; ) {
            var s = 8 == r ? 255 & t[i] : l(t, i);
            s < 0
              ? "-" == t.charAt(i) && (o = !0)
              : ((o = !1),
                0 == a
                  ? (this[this.t++] = s)
                  : a + r > this.DB
                  ? ((this[this.t - 1] |=
                      (s & ((1 << (this.DB - a)) - 1)) << a),
                    (this[this.t++] = s >> (this.DB - a)))
                  : (this[this.t - 1] |= s << a),
                (a += r) >= this.DB && (a -= this.DB));
          }
          8 == r &&
            0 != (128 & t[0]) &&
            ((this.s = -1),
            a > 0 && (this[this.t - 1] |= ((1 << (this.DB - a)) - 1) << a)),
            this.clamp(),
            o && n.ZERO.subTo(this, this);
        }),
        (n.prototype.clamp = function () {
          for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
            --this.t;
        }),
        (n.prototype.dlShiftTo = function (t, e) {
          var n;
          for (n = this.t - 1; n >= 0; --n) e[n + t] = this[n];
          for (n = t - 1; n >= 0; --n) e[n] = 0;
          (e.t = this.t + t), (e.s = this.s);
        }),
        (n.prototype.drShiftTo = function (t, e) {
          for (var n = t; n < this.t; ++n) e[n - t] = this[n];
          (e.t = Math.max(this.t - t, 0)), (e.s = this.s);
        }),
        (n.prototype.lShiftTo = function (t, e) {
          var n,
            r = t % this.DB,
            i = this.DB - r,
            o = (1 << i) - 1,
            a = Math.floor(t / this.DB),
            s = (this.s << r) & this.DM;
          for (n = this.t - 1; n >= 0; --n)
            (e[n + a + 1] = (this[n] >> i) | s), (s = (this[n] & o) << r);
          for (n = a - 1; n >= 0; --n) e[n] = 0;
          (e[a] = s), (e.t = this.t + a + 1), (e.s = this.s), e.clamp();
        }),
        (n.prototype.rShiftTo = function (t, e) {
          e.s = this.s;
          var n = Math.floor(t / this.DB);
          if (n >= this.t) e.t = 0;
          else {
            var r = t % this.DB,
              i = this.DB - r,
              o = (1 << r) - 1;
            e[0] = this[n] >> r;
            for (var a = n + 1; a < this.t; ++a)
              (e[a - n - 1] |= (this[a] & o) << i), (e[a - n] = this[a] >> r);
            r > 0 && (e[this.t - n - 1] |= (this.s & o) << i),
              (e.t = this.t - n),
              e.clamp();
          }
        }),
        (n.prototype.subTo = function (t, e) {
          for (var n = 0, r = 0, i = Math.min(t.t, this.t); n < i; )
            (r += this[n] - t[n]), (e[n++] = r & this.DM), (r >>= this.DB);
          if (t.t < this.t) {
            for (r -= t.s; n < this.t; )
              (r += this[n]), (e[n++] = r & this.DM), (r >>= this.DB);
            r += this.s;
          } else {
            for (r += this.s; n < t.t; )
              (r -= t[n]), (e[n++] = r & this.DM), (r >>= this.DB);
            r -= t.s;
          }
          (e.s = r < 0 ? -1 : 0),
            r < -1 ? (e[n++] = this.DV + r) : r > 0 && (e[n++] = r),
            (e.t = n),
            e.clamp();
        }),
        (n.prototype.multiplyTo = function (t, e) {
          var r = this.abs(),
            i = t.abs(),
            o = r.t;
          for (e.t = o + i.t; --o >= 0; ) e[o] = 0;
          for (o = 0; o < i.t; ++o) e[o + r.t] = r.am(0, i[o], e, o, 0, r.t);
          (e.s = 0), e.clamp(), this.s != t.s && n.ZERO.subTo(e, e);
        }),
        (n.prototype.squareTo = function (t) {
          for (var e = this.abs(), n = (t.t = 2 * e.t); --n >= 0; ) t[n] = 0;
          for (n = 0; n < e.t - 1; ++n) {
            var r = e.am(n, e[n], t, 2 * n, 0, 1);
            (t[n + e.t] += e.am(
              n + 1,
              2 * e[n],
              t,
              2 * n + 1,
              r,
              e.t - n - 1
            )) >= e.DV && ((t[n + e.t] -= e.DV), (t[n + e.t + 1] = 1));
          }
          t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
            (t.s = 0),
            t.clamp();
        }),
        (n.prototype.divRemTo = function (t, e, i) {
          var o = t.abs();
          if (!(o.t <= 0)) {
            var a = this.abs();
            if (a.t < o.t)
              return (
                null != e && e.fromInt(0), void (null != i && this.copyTo(i))
              );
            null == i && (i = r());
            var s = r(),
              u = this.s,
              c = t.s,
              l = this.DB - h(o[o.t - 1]);
            l > 0
              ? (o.lShiftTo(l, s), a.lShiftTo(l, i))
              : (o.copyTo(s), a.copyTo(i));
            var f = s.t,
              d = s[f - 1];
            if (0 != d) {
              var p = d * (1 << this.F1) + (f > 1 ? s[f - 2] >> this.F2 : 0),
                v = this.FV / p,
                g = (1 << this.F1) / p,
                m = 1 << this.F2,
                y = i.t,
                b = y - f,
                w = null == e ? r() : e;
              for (
                s.dlShiftTo(b, w),
                  i.compareTo(w) >= 0 && ((i[i.t++] = 1), i.subTo(w, i)),
                  n.ONE.dlShiftTo(f, w),
                  w.subTo(s, s);
                s.t < f;

              )
                s[s.t++] = 0;
              for (; --b >= 0; ) {
                var S =
                  i[--y] == d
                    ? this.DM
                    : Math.floor(i[y] * v + (i[y - 1] + m) * g);
                if ((i[y] += s.am(0, S, i, b, 0, f)) < S)
                  for (s.dlShiftTo(b, w), i.subTo(w, i); i[y] < --S; )
                    i.subTo(w, i);
              }
              null != e && (i.drShiftTo(f, e), u != c && n.ZERO.subTo(e, e)),
                (i.t = f),
                i.clamp(),
                l > 0 && i.rShiftTo(l, i),
                u < 0 && n.ZERO.subTo(i, i);
            }
          }
        }),
        (n.prototype.invDigit = function () {
          if (this.t < 1) return 0;
          var t = this[0];
          if (0 == (1 & t)) return 0;
          var e = 3 & t;
          return (e =
            ((e =
              ((e =
                ((e = (e * (2 - (15 & t) * e)) & 15) * (2 - (255 & t) * e)) &
                255) *
                (2 - (((65535 & t) * e) & 65535))) &
              65535) *
              (2 - ((t * e) % this.DV))) %
            this.DV) > 0
            ? this.DV - e
            : -e;
        }),
        (n.prototype.isEven = function () {
          return 0 == (this.t > 0 ? 1 & this[0] : this.s);
        }),
        (n.prototype.exp = function (t, e) {
          if (t > 4294967295 || t < 1) return n.ONE;
          var i = r(),
            o = r(),
            a = e.convert(this),
            s = h(t) - 1;
          for (a.copyTo(i); --s >= 0; )
            if ((e.sqrTo(i, o), (t & (1 << s)) > 0)) e.mulTo(o, a, i);
            else {
              var u = i;
              (i = o), (o = u);
            }
          return e.revert(i);
        }),
        (n.prototype.toString = function (t) {
          if (this.s < 0) return "-" + this.negate().toString(t);
          var e;
          if (16 == t) e = 4;
          else if (8 == t) e = 3;
          else if (2 == t) e = 1;
          else if (32 == t) e = 5;
          else {
            if (4 != t) return this.toRadix(t);
            e = 2;
          }
          var n,
            r = (1 << e) - 1,
            i = !1,
            o = "",
            a = this.t,
            s = this.DB - ((a * this.DB) % e);
          if (a-- > 0)
            for (
              s < this.DB && (n = this[a] >> s) > 0 && ((i = !0), (o = c(n)));
              a >= 0;

            )
              s < e
                ? ((n = (this[a] & ((1 << s) - 1)) << (e - s)),
                  (n |= this[--a] >> (s += this.DB - e)))
                : ((n = (this[a] >> (s -= e)) & r),
                  s <= 0 && ((s += this.DB), --a)),
                n > 0 && (i = !0),
                i && (o += c(n));
          return i ? o : "0";
        }),
        (n.prototype.negate = function () {
          var t = r();
          return n.ZERO.subTo(this, t), t;
        }),
        (n.prototype.abs = function () {
          return this.s < 0 ? this.negate() : this;
        }),
        (n.prototype.compareTo = function (t) {
          var e = this.s - t.s;
          if (0 != e) return e;
          var n = this.t;
          if (0 != (e = n - t.t)) return this.s < 0 ? -e : e;
          for (; --n >= 0; ) if (0 != (e = this[n] - t[n])) return e;
          return 0;
        }),
        (n.prototype.bitLength = function () {
          return this.t <= 0
            ? 0
            : this.DB * (this.t - 1) + h(this[this.t - 1] ^ (this.s & this.DM));
        }),
        (n.prototype.mod = function (t) {
          var e = r();
          return (
            this.abs().divRemTo(t, null, e),
            this.s < 0 && e.compareTo(n.ZERO) > 0 && t.subTo(e, e),
            e
          );
        }),
        (n.prototype.modPowInt = function (t, e) {
          var n;
          return (
            (n = t < 256 || e.isEven() ? new d(e) : new p(e)), this.exp(t, n)
          );
        }),
        (n.ZERO = f(0)),
        (n.ONE = f(1)),
        (S.prototype.convert = T),
        (S.prototype.revert = T),
        (S.prototype.mulTo = function (t, e, n) {
          t.multiplyTo(e, n);
        }),
        (S.prototype.sqrTo = function (t, e) {
          t.squareTo(e);
        }),
        (x.prototype.convert = function (t) {
          if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
          if (t.compareTo(this.m) < 0) return t;
          var e = r();
          return t.copyTo(e), this.reduce(e), e;
        }),
        (x.prototype.revert = function (t) {
          return t;
        }),
        (x.prototype.reduce = function (t) {
          for (
            t.drShiftTo(this.m.t - 1, this.r2),
              t.t > this.m.t + 1 && ((t.t = this.m.t + 1), t.clamp()),
              this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
              this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
            t.compareTo(this.r2) < 0;

          )
            t.dAddOffset(1, this.m.t + 1);
          for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
            t.subTo(this.m, t);
        }),
        (x.prototype.mulTo = function (t, e, n) {
          t.multiplyTo(e, n), this.reduce(n);
        }),
        (x.prototype.sqrTo = function (t, e) {
          t.squareTo(e), this.reduce(e);
        });
      var E,
        A,
        R,
        _ = [
          2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
          67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137,
          139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211,
          223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283,
          293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379,
          383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461,
          463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563,
          569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643,
          647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739,
          743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829,
          839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937,
          941, 947, 953, 967, 971, 977, 983, 991, 997,
        ],
        k = (1 << 26) / _[_.length - 1];
      function D() {
        var t;
        (t = new Date().getTime()),
          (A[R++] ^= 255 & t),
          (A[R++] ^= (t >> 8) & 255),
          (A[R++] ^= (t >> 16) & 255),
          (A[R++] ^= (t >> 24) & 255),
          R >= F && (R -= F);
      }
      if (
        ((n.prototype.chunkSize = function (t) {
          return Math.floor((Math.LN2 * this.DB) / Math.log(t));
        }),
        (n.prototype.toRadix = function (t) {
          if ((null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36))
            return "0";
          var e = this.chunkSize(t),
            n = Math.pow(t, e),
            i = f(n),
            o = r(),
            a = r(),
            s = "";
          for (this.divRemTo(i, o, a); o.signum() > 0; )
            (s = (n + a.intValue()).toString(t).substr(1) + s),
              o.divRemTo(i, o, a);
          return a.intValue().toString(t) + s;
        }),
        (n.prototype.fromRadix = function (t, e) {
          this.fromInt(0), null == e && (e = 10);
          for (
            var r = this.chunkSize(e),
              i = Math.pow(e, r),
              o = !1,
              a = 0,
              s = 0,
              u = 0;
            u < t.length;
            ++u
          ) {
            var c = l(t, u);
            c < 0
              ? "-" == t.charAt(u) && 0 == this.signum() && (o = !0)
              : ((s = e * s + c),
                ++a >= r &&
                  (this.dMultiply(i), this.dAddOffset(s, 0), (a = 0), (s = 0)));
          }
          a > 0 && (this.dMultiply(Math.pow(e, a)), this.dAddOffset(s, 0)),
            o && n.ZERO.subTo(this, this);
        }),
        (n.prototype.fromNumber = function (t, e, r) {
          if ("number" == typeof e)
            if (t < 2) this.fromInt(1);
            else
              for (
                this.fromNumber(t, r),
                  this.testBit(t - 1) ||
                    this.bitwiseTo(n.ONE.shiftLeft(t - 1), g, this),
                  this.isEven() && this.dAddOffset(1, 0);
                !this.isProbablePrime(e);

              )
                this.dAddOffset(2, 0),
                  this.bitLength() > t &&
                    this.subTo(n.ONE.shiftLeft(t - 1), this);
          else {
            var i = new Array(),
              o = 7 & t;
            (i.length = 1 + (t >> 3)),
              e.nextBytes(i),
              o > 0 ? (i[0] &= (1 << o) - 1) : (i[0] = 0),
              this.fromString(i, 256);
          }
        }),
        (n.prototype.bitwiseTo = function (t, e, n) {
          var r,
            i,
            o = Math.min(t.t, this.t);
          for (r = 0; r < o; ++r) n[r] = e(this[r], t[r]);
          if (t.t < this.t) {
            for (i = t.s & this.DM, r = o; r < this.t; ++r)
              n[r] = e(this[r], i);
            n.t = this.t;
          } else {
            for (i = this.s & this.DM, r = o; r < t.t; ++r) n[r] = e(i, t[r]);
            n.t = t.t;
          }
          (n.s = e(this.s, t.s)), n.clamp();
        }),
        (n.prototype.changeBit = function (t, e) {
          var r = n.ONE.shiftLeft(t);
          return this.bitwiseTo(r, e, r), r;
        }),
        (n.prototype.addTo = function (t, e) {
          for (var n = 0, r = 0, i = Math.min(t.t, this.t); n < i; )
            (r += this[n] + t[n]), (e[n++] = r & this.DM), (r >>= this.DB);
          if (t.t < this.t) {
            for (r += t.s; n < this.t; )
              (r += this[n]), (e[n++] = r & this.DM), (r >>= this.DB);
            r += this.s;
          } else {
            for (r += this.s; n < t.t; )
              (r += t[n]), (e[n++] = r & this.DM), (r >>= this.DB);
            r += t.s;
          }
          (e.s = r < 0 ? -1 : 0),
            r > 0 ? (e[n++] = r) : r < -1 && (e[n++] = this.DV + r),
            (e.t = n),
            e.clamp();
        }),
        (n.prototype.dMultiply = function (t) {
          (this[this.t] = this.am(0, t - 1, this, 0, 0, this.t)),
            ++this.t,
            this.clamp();
        }),
        (n.prototype.dAddOffset = function (t, e) {
          if (0 != t) {
            for (; this.t <= e; ) this[this.t++] = 0;
            for (this[e] += t; this[e] >= this.DV; )
              (this[e] -= this.DV),
                ++e >= this.t && (this[this.t++] = 0),
                ++this[e];
          }
        }),
        (n.prototype.multiplyLowerTo = function (t, e, n) {
          var r,
            i = Math.min(this.t + t.t, e);
          for (n.s = 0, n.t = i; i > 0; ) n[--i] = 0;
          for (r = n.t - this.t; i < r; ++i)
            n[i + this.t] = this.am(0, t[i], n, i, 0, this.t);
          for (r = Math.min(t.t, e); i < r; ++i)
            this.am(0, t[i], n, i, 0, e - i);
          n.clamp();
        }),
        (n.prototype.multiplyUpperTo = function (t, e, n) {
          --e;
          var r = (n.t = this.t + t.t - e);
          for (n.s = 0; --r >= 0; ) n[r] = 0;
          for (r = Math.max(e - this.t, 0); r < t.t; ++r)
            n[this.t + r - e] = this.am(e - r, t[r], n, 0, 0, this.t + r - e);
          n.clamp(), n.drShiftTo(1, n);
        }),
        (n.prototype.modInt = function (t) {
          if (t <= 0) return 0;
          var e = this.DV % t,
            n = this.s < 0 ? t - 1 : 0;
          if (this.t > 0)
            if (0 == e) n = this[0] % t;
            else
              for (var r = this.t - 1; r >= 0; --r) n = (e * n + this[r]) % t;
          return n;
        }),
        (n.prototype.millerRabin = function (t) {
          var e = this.subtract(n.ONE),
            i = e.getLowestSetBit();
          if (i <= 0) return !1;
          var o = e.shiftRight(i);
          (t = (t + 1) >> 1) > _.length && (t = _.length);
          for (var a = r(), s = 0; s < t; ++s) {
            a.fromInt(_[Math.floor(Math.random() * _.length)]);
            var u = a.modPow(o, this);
            if (0 != u.compareTo(n.ONE) && 0 != u.compareTo(e)) {
              for (var c = 1; c++ < i && 0 != u.compareTo(e); )
                if (0 == (u = u.modPowInt(2, this)).compareTo(n.ONE)) return !1;
              if (0 != u.compareTo(e)) return !1;
            }
          }
          return !0;
        }),
        (n.prototype.clone = function () {
          var t = r();
          return this.copyTo(t), t;
        }),
        (n.prototype.intValue = function () {
          if (this.s < 0) {
            if (1 == this.t) return this[0] - this.DV;
            if (0 == this.t) return -1;
          } else {
            if (1 == this.t) return this[0];
            if (0 == this.t) return 0;
          }
          return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
        }),
        (n.prototype.byteValue = function () {
          return 0 == this.t ? this.s : (this[0] << 24) >> 24;
        }),
        (n.prototype.shortValue = function () {
          return 0 == this.t ? this.s : (this[0] << 16) >> 16;
        }),
        (n.prototype.signum = function () {
          return this.s < 0
            ? -1
            : this.t <= 0 || (1 == this.t && this[0] <= 0)
            ? 0
            : 1;
        }),
        (n.prototype.toByteArray = function () {
          var t = this.t,
            e = new Array();
          e[0] = this.s;
          var n,
            r = this.DB - ((t * this.DB) % 8),
            i = 0;
          if (t-- > 0)
            for (
              r < this.DB &&
              (n = this[t] >> r) != (this.s & this.DM) >> r &&
              (e[i++] = n | (this.s << (this.DB - r)));
              t >= 0;

            )
              r < 8
                ? ((n = (this[t] & ((1 << r) - 1)) << (8 - r)),
                  (n |= this[--t] >> (r += this.DB - 8)))
                : ((n = (this[t] >> (r -= 8)) & 255),
                  r <= 0 && ((r += this.DB), --t)),
                0 != (128 & n) && (n |= -256),
                0 == i && (128 & this.s) != (128 & n) && ++i,
                (i > 0 || n != this.s) && (e[i++] = n);
          return e;
        }),
        (n.prototype.equals = function (t) {
          return 0 == this.compareTo(t);
        }),
        (n.prototype.min = function (t) {
          return this.compareTo(t) < 0 ? this : t;
        }),
        (n.prototype.max = function (t) {
          return this.compareTo(t) > 0 ? this : t;
        }),
        (n.prototype.and = function (t) {
          var e = r();
          return this.bitwiseTo(t, v, e), e;
        }),
        (n.prototype.or = function (t) {
          var e = r();
          return this.bitwiseTo(t, g, e), e;
        }),
        (n.prototype.xor = function (t) {
          var e = r();
          return this.bitwiseTo(t, m, e), e;
        }),
        (n.prototype.andNot = function (t) {
          var e = r();
          return this.bitwiseTo(t, y, e), e;
        }),
        (n.prototype.not = function () {
          for (var t = r(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
          return (t.t = this.t), (t.s = ~this.s), t;
        }),
        (n.prototype.shiftLeft = function (t) {
          var e = r();
          return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e;
        }),
        (n.prototype.shiftRight = function (t) {
          var e = r();
          return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e;
        }),
        (n.prototype.getLowestSetBit = function () {
          for (var t = 0; t < this.t; ++t)
            if (0 != this[t]) return t * this.DB + b(this[t]);
          return this.s < 0 ? this.t * this.DB : -1;
        }),
        (n.prototype.bitCount = function () {
          for (var t = 0, e = this.s & this.DM, n = 0; n < this.t; ++n)
            t += w(this[n] ^ e);
          return t;
        }),
        (n.prototype.testBit = function (t) {
          var e = Math.floor(t / this.DB);
          return e >= this.t
            ? 0 != this.s
            : 0 != (this[e] & (1 << t % this.DB));
        }),
        (n.prototype.setBit = function (t) {
          return this.changeBit(t, g);
        }),
        (n.prototype.clearBit = function (t) {
          return this.changeBit(t, y);
        }),
        (n.prototype.flipBit = function (t) {
          return this.changeBit(t, m);
        }),
        (n.prototype.add = function (t) {
          var e = r();
          return this.addTo(t, e), e;
        }),
        (n.prototype.subtract = function (t) {
          var e = r();
          return this.subTo(t, e), e;
        }),
        (n.prototype.multiply = function (t) {
          var e = r();
          return this.multiplyTo(t, e), e;
        }),
        (n.prototype.divide = function (t) {
          var e = r();
          return this.divRemTo(t, e, null), e;
        }),
        (n.prototype.remainder = function (t) {
          var e = r();
          return this.divRemTo(t, null, e), e;
        }),
        (n.prototype.divideAndRemainder = function (t) {
          var e = r(),
            n = r();
          return this.divRemTo(t, e, n), new Array(e, n);
        }),
        (n.prototype.modPow = function (t, e) {
          var n,
            i,
            o = t.bitLength(),
            a = f(1);
          if (o <= 0) return a;
          (n = o < 18 ? 1 : o < 48 ? 3 : o < 144 ? 4 : o < 768 ? 5 : 6),
            (i = o < 8 ? new d(e) : e.isEven() ? new x(e) : new p(e));
          var s = new Array(),
            u = 3,
            c = n - 1,
            l = (1 << n) - 1;
          if (((s[1] = i.convert(this)), n > 1)) {
            var v = r();
            for (i.sqrTo(s[1], v); u <= l; )
              (s[u] = r()), i.mulTo(v, s[u - 2], s[u]), (u += 2);
          }
          var g,
            m,
            y = t.t - 1,
            b = !0,
            w = r();
          for (o = h(t[y]) - 1; y >= 0; ) {
            for (
              o >= c
                ? (g = (t[y] >> (o - c)) & l)
                : ((g = (t[y] & ((1 << (o + 1)) - 1)) << (c - o)),
                  y > 0 && (g |= t[y - 1] >> (this.DB + o - c))),
                u = n;
              0 == (1 & g);

            )
              (g >>= 1), --u;
            if (((o -= u) < 0 && ((o += this.DB), --y), b))
              s[g].copyTo(a), (b = !1);
            else {
              for (; u > 1; ) i.sqrTo(a, w), i.sqrTo(w, a), (u -= 2);
              u > 0 ? i.sqrTo(a, w) : ((m = a), (a = w), (w = m)),
                i.mulTo(w, s[g], a);
            }
            for (; y >= 0 && 0 == (t[y] & (1 << o)); )
              i.sqrTo(a, w),
                (m = a),
                (a = w),
                (w = m),
                --o < 0 && ((o = this.DB - 1), --y);
          }
          return i.revert(a);
        }),
        (n.prototype.modInverse = function (t) {
          var e = t.isEven();
          if ((this.isEven() && e) || 0 == t.signum()) return n.ZERO;
          for (
            var r = t.clone(),
              i = this.clone(),
              o = f(1),
              a = f(0),
              s = f(0),
              u = f(1);
            0 != r.signum();

          ) {
            for (; r.isEven(); )
              r.rShiftTo(1, r),
                e
                  ? ((o.isEven() && a.isEven()) ||
                      (o.addTo(this, o), a.subTo(t, a)),
                    o.rShiftTo(1, o))
                  : a.isEven() || a.subTo(t, a),
                a.rShiftTo(1, a);
            for (; i.isEven(); )
              i.rShiftTo(1, i),
                e
                  ? ((s.isEven() && u.isEven()) ||
                      (s.addTo(this, s), u.subTo(t, u)),
                    s.rShiftTo(1, s))
                  : u.isEven() || u.subTo(t, u),
                u.rShiftTo(1, u);
            r.compareTo(i) >= 0
              ? (r.subTo(i, r), e && o.subTo(s, o), a.subTo(u, a))
              : (i.subTo(r, i), e && s.subTo(o, s), u.subTo(a, u));
          }
          return 0 != i.compareTo(n.ONE)
            ? n.ZERO
            : u.compareTo(t) >= 0
            ? u.subtract(t)
            : u.signum() < 0
            ? (u.addTo(t, u), u.signum() < 0 ? u.add(t) : u)
            : u;
        }),
        (n.prototype.pow = function (t) {
          return this.exp(t, new S());
        }),
        (n.prototype.gcd = function (t) {
          var e = this.s < 0 ? this.negate() : this.clone(),
            n = t.s < 0 ? t.negate() : t.clone();
          if (e.compareTo(n) < 0) {
            var r = e;
            (e = n), (n = r);
          }
          var i = e.getLowestSetBit(),
            o = n.getLowestSetBit();
          if (o < 0) return e;
          for (
            i < o && (o = i), o > 0 && (e.rShiftTo(o, e), n.rShiftTo(o, n));
            e.signum() > 0;

          )
            (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
              (i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n),
              e.compareTo(n) >= 0
                ? (e.subTo(n, e), e.rShiftTo(1, e))
                : (n.subTo(e, n), n.rShiftTo(1, n));
          return o > 0 && n.lShiftTo(o, n), n;
        }),
        (n.prototype.isProbablePrime = function (t) {
          var e,
            n = this.abs();
          if (1 == n.t && n[0] <= _[_.length - 1]) {
            for (e = 0; e < _.length; ++e) if (n[0] == _[e]) return !0;
            return !1;
          }
          if (n.isEven()) return !1;
          for (e = 1; e < _.length; ) {
            for (var r = _[e], i = e + 1; i < _.length && r < k; ) r *= _[i++];
            for (r = n.modInt(r); e < i; ) if (r % _[e++] == 0) return !1;
          }
          return n.millerRabin(t);
        }),
        (n.prototype.square = function () {
          var t = r();
          return this.squareTo(t), t;
        }),
        (n.prototype.Barrett = x),
        null == A)
      ) {
        var C;
        if (
          ((A = new Array()),
          (R = 0),
          "undefined" !== typeof window && window.crypto)
        )
          if (window.crypto.getRandomValues) {
            var M = new Uint8Array(32);
            for (window.crypto.getRandomValues(M), C = 0; C < 32; ++C)
              A[R++] = M[C];
          } else if (
            "Netscape" == navigator.appName &&
            navigator.appVersion < "5"
          ) {
            var I = window.crypto.random(32);
            for (C = 0; C < I.length; ++C) A[R++] = 255 & I.charCodeAt(C);
          }
        for (; R < F; )
          (C = Math.floor(65536 * Math.random())),
            (A[R++] = C >>> 8),
            (A[R++] = 255 & C);
        (R = 0), D();
      }
      function B() {
        if (null == E) {
          for (D(), (E = new P()).init(A), R = 0; R < A.length; ++R) A[R] = 0;
          R = 0;
        }
        return E.next();
      }
      function O() {}
      function P() {
        (this.i = 0), (this.j = 0), (this.S = new Array());
      }
      (O.prototype.nextBytes = function (t) {
        var e;
        for (e = 0; e < t.length; ++e) t[e] = B();
      }),
        (P.prototype.init = function (t) {
          var e, n, r;
          for (e = 0; e < 256; ++e) this.S[e] = e;
          for (n = 0, e = 0; e < 256; ++e)
            (n = (n + this.S[e] + t[e % t.length]) & 255),
              (r = this.S[e]),
              (this.S[e] = this.S[n]),
              (this.S[n] = r);
          (this.i = 0), (this.j = 0);
        }),
        (P.prototype.next = function () {
          var t;
          return (
            (this.i = (this.i + 1) & 255),
            (this.j = (this.j + this.S[this.i]) & 255),
            (t = this.S[this.i]),
            (this.S[this.i] = this.S[this.j]),
            (this.S[this.j] = t),
            this.S[(t + this.S[this.i]) & 255]
          );
        });
      var F = 256;
      t.exports = { default: n, BigInteger: n, SecureRandom: O };
    }).call(this);
  },
  function (t, e, n) {
    "use strict";
    t.exports = {
      ATOM_MOOV: "moov",
      ATOM_MVHD: "mvhd",
      ATOM_TRAK: "trak",
      ATOM_TKHD: "tkhd",
      ATOM_MDIA: "mdia",
      ATOM_MDHD: "mdhd",
      ATOM_MINF: "minf",
      ATOM_HDLR: "hdlr",
      ATOM_VMHD: "vmhd",
      ATOM_SMHD: "smhd",
      ATOM_STBL: "stbl",
      ATOM_STSZ: "stsz",
      ATOM_STCO: "stco",
      ATOM_STSS: "stss",
      ATOM_STTS: "stts",
      ATOM_STSC: "stsc",
      ATOM_CO64: "co64",
      ATOM_STSD: "stsd",
      ATOM_CTTS: "ctts",
      ATOM_AVC1: "avc1",
      ATOM_AVCC: "avcC",
      ATOM_HEV1: "hev1",
      ATOM_HVC1: "hvc1",
      ATOM_HVCC: "hvcC",
      ATOM_MP4A: "mp4a",
      ATOM_ESDS: "esds",
      ATOM_MDAT: "mdat",
      ATOM_FTYP: "ftyp",
      TRACK_TYPE_VIDEO: "vide",
      TRACK_TYPE_AUDIO: "soun",
      COMPONENT_NAME_VIDEO: "VideoHandler",
      COMPONENT_NAME_AUDIO: "SoundHandler",
      COMPRESSOR_NAME: "NodeVideoLibrary",
      createAtom: function (t) {
        return new (n(166)("./atom-" + t))();
      },
    };
  },
  function (t, e, n) {
    "use strict";
    var r,
      i = n(44),
      o = Object.prototype.toString,
      a =
        ((r = Object.create(null)),
        function (t) {
          var e = o.call(t);
          return r[e] || (r[e] = e.slice(8, -1).toLowerCase());
        });
    function s(t) {
      return (
        (t = t.toLowerCase()),
        function (e) {
          return a(e) === t;
        }
      );
    }
    function u(t) {
      return Array.isArray(t);
    }
    function c(t) {
      return "undefined" === typeof t;
    }
    var l = s("ArrayBuffer");
    function f(t) {
      return null !== t && "object" === typeof t;
    }
    function h(t) {
      if ("object" !== a(t)) return !1;
      var e = Object.getPrototypeOf(t);
      return null === e || e === Object.prototype;
    }
    var d = s("Date"),
      p = s("File"),
      v = s("Blob"),
      g = s("FileList");
    function m(t) {
      return "[object Function]" === o.call(t);
    }
    var y = s("URLSearchParams");
    function b(t, e) {
      if (null !== t && "undefined" !== typeof t)
        if (("object" !== typeof t && (t = [t]), u(t)))
          for (var n = 0, r = t.length; n < r; n++) e.call(null, t[n], n, t);
        else
          for (var i in t)
            Object.prototype.hasOwnProperty.call(t, i) &&
              e.call(null, t[i], i, t);
    }
    var w,
      S =
        ((w =
          "undefined" !== typeof Uint8Array &&
          Object.getPrototypeOf(Uint8Array)),
        function (t) {
          return w && t instanceof w;
        });
    t.exports = {
      isArray: u,
      isArrayBuffer: l,
      isBuffer: function (t) {
        return (
          null !== t &&
          !c(t) &&
          null !== t.constructor &&
          !c(t.constructor) &&
          "function" === typeof t.constructor.isBuffer &&
          t.constructor.isBuffer(t)
        );
      },
      isFormData: function (t) {
        return (
          t &&
          (("function" === typeof FormData && t instanceof FormData) ||
            "[object FormData]" === o.call(t) ||
            (m(t.toString) && "[object FormData]" === t.toString()))
        );
      },
      isArrayBufferView: function (t) {
        return "undefined" !== typeof ArrayBuffer && ArrayBuffer.isView
          ? ArrayBuffer.isView(t)
          : t && t.buffer && l(t.buffer);
      },
      isString: function (t) {
        return "string" === typeof t;
      },
      isNumber: function (t) {
        return "number" === typeof t;
      },
      isObject: f,
      isPlainObject: h,
      isUndefined: c,
      isDate: d,
      isFile: p,
      isBlob: v,
      isFunction: m,
      isStream: function (t) {
        return f(t) && m(t.pipe);
      },
      isURLSearchParams: y,
      isStandardBrowserEnv: function () {
        return (
          ("undefined" === typeof navigator ||
            ("ReactNative" !== navigator.product &&
              "NativeScript" !== navigator.product &&
              "NS" !== navigator.product)) &&
          "undefined" !== typeof window &&
          "undefined" !== typeof document
        );
      },
      forEach: b,
      merge: function t() {
        var e = {};
        function n(n, r) {
          h(e[r]) && h(n)
            ? (e[r] = t(e[r], n))
            : h(n)
            ? (e[r] = t({}, n))
            : u(n)
            ? (e[r] = n.slice())
            : (e[r] = n);
        }
        for (var r = 0, i = arguments.length; r < i; r++) b(arguments[r], n);
        return e;
      },
      extend: function (t, e, n) {
        return (
          b(e, function (e, r) {
            t[r] = n && "function" === typeof e ? i(e, n) : e;
          }),
          t
        );
      },
      trim: function (t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
      },
      stripBOM: function (t) {
        return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t;
      },
      inherits: function (t, e, n, r) {
        (t.prototype = Object.create(e.prototype, r)),
          (t.prototype.constructor = t),
          n && Object.assign(t.prototype, n);
      },
      toFlatObject: function (t, e, n) {
        var r,
          i,
          o,
          a = {};
        e = e || {};
        do {
          for (i = (r = Object.getOwnPropertyNames(t)).length; i-- > 0; )
            a[(o = r[i])] || ((e[o] = t[o]), (a[o] = !0));
          t = Object.getPrototypeOf(t);
        } while (t && (!n || n(t, e)) && t !== Object.prototype);
        return e;
      },
      kindOf: a,
      kindOfTest: s,
      endsWith: function (t, e, n) {
        (t = String(t)),
          (void 0 === n || n > t.length) && (n = t.length),
          (n -= e.length);
        var r = t.indexOf(e, n);
        return -1 !== r && r === n;
      },
      toArray: function (t) {
        if (!t) return null;
        var e = t.length;
        if (c(e)) return null;
        for (var n = new Array(e); e-- > 0; ) n[e] = t[e];
        return n;
      },
      isTypedArray: S,
      isFileList: g,
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = (function () {
        function t() {
          (0, i.default)(this, t);
        }
        return (
          (0, o.default)(t, [
            { key: "type", value: function () {} },
            { key: "parse", value: function () {} },
            { key: "build", value: function () {} },
            { key: "bufferSize", value: function () {} },
          ]),
          t
        );
      })();
    t.exports = a;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.BrowserDetect = function () {
        var t = navigator.userAgent.toLowerCase(),
          e = navigator.appName,
          n = null;
        "Microsoft Internet Explorer" === e ||
        t.indexOf("trident") > -1 ||
        t.indexOf("edge/") > -1
          ? ((n = "ie"),
            "Microsoft Internet Explorer" === e
              ? ((t = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(t)),
                (n += parseInt(t[1])))
              : t.indexOf("trident") > -1
              ? (n += 11)
              : t.indexOf("edge/") > -1 && (n = "edge"))
          : t.indexOf("safari") > -1
          ? (n = t.indexOf("chrome") > -1 ? "chrome" : "safari")
          : t.indexOf("firefox") > -1 && (n = "firefox");
        return n;
      }),
      (e.CommonAudioUtil = function () {
        var t = [
            1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192,
            16384,
          ],
          e = function (t, e, n) {
            var r = 0,
              i = 0;
            for (r = 0; r < n && !(t < e[i]); r++) i++;
            return r;
          },
          n = function (n, r) {
            var i = 0,
              o = 0,
              a = 0,
              s = 0,
              u = 0;
            return (
              (o = e((i = n > 0 ? n : 8191 & -n), t, 15) - 6),
              (a = o + ((r >> 6) & 15) - 13),
              (s =
                ((0 === i ? 32 : o >= 0 ? i >> o : i << -o) *
                  (r & parseInt("077", 8)) +
                  48) >>
                4),
              (u = a >= 0 ? (s << a) & 32767 : s >> -a),
              (n ^ r) < 0 ? -u : u
            );
          };
        (this.g726InitState = function () {
          var t = {},
            e = 0;
          for (
            t.pp = new Array(2),
              t.zp = new Array(6),
              t.pk = new Array(2),
              t.dq = new Array(6),
              t.sr = new Array(2),
              t.yl = 34816,
              t.yu = 544,
              t.dms = 0,
              t.dml = 0,
              t.ppp = 0,
              e = 0;
            e < 2;
            e++
          )
            (t.pp[e] = 0), (t.pk[e] = 0), (t.sr[e] = 32);
          for (e = 0; e < 6; e++) (t.zp[e] = 0), (t.dq[e] = 32);
          return (t.td = 0), t;
        }),
          (this.predictorZero = function (t) {
            var e = 0,
              r = 0;
            for (r = n(t.zp[0] >> 2, t.dq[0]), e = 1; e < 6; e++)
              r += n(t.zp[e] >> 2, t.dq[e]);
            return r;
          }),
          (this.predictorPole = function (t) {
            return n(t.pp[1] >> 2, t.sr[1]) + n(t.pp[0] >> 2, t.sr[0]);
          }),
          (this.stepSize = function (t) {
            var e = 0,
              n = 0,
              r = 0;
            return t.ppp >= 256
              ? t.yu
              : ((e = t.yl >> 6),
                (n = t.yu - e),
                (r = t.ppp >> 2),
                n > 0 ? (e += (n * r) >> 6) : n < 0 && (e += (n * r + 63) >> 6),
                e);
          }),
          (this.quantize = function (n, r, i, o) {
            var a = 0,
              s = 0,
              u = 0;
            return (
              (a = Math.abs(n)),
              (s = e(a >> 1, t, 15)),
              (u = e((s << 7) + (((a << 7) >> s) & 127) - (r >> 2), i, o)),
              n < 0 ? 1 + (o << 1) - u : 0 === u ? 1 + (o << 1) : u
            );
          }),
          (this.reconstruct = function (t, e, n) {
            var r = 0,
              i = 0;
            return (r = e + (n >> 2)) < 0
              ? t
                ? -32768
                : 0
              : ((i = ((128 + (127 & r)) << 7) >> (14 - ((r >> 7) & 15))),
                t ? i - 32768 : i);
          }),
          (this.update = function (n, r, i, o, a, s, u, c) {
            var l = 0,
              f = 0,
              h = 0,
              d = 0,
              p = 0,
              v = 0,
              g = 0,
              m = 0,
              y = 0,
              b = 0,
              w = 0,
              S = 0,
              T = 0,
              x = 0;
            if (
              ((x = u < 0 ? 1 : 0),
              (f = 32767 & a),
              (y = c.yl >> 15),
              (S = (c.yl >> 10) & 31),
              (T = (32 + S) << y),
              (w = ((b = y > 9 ? 31744 : T) + (b >> 1)) >> 1),
              (m = 0 === c.td ? 0 : f <= w ? 0 : 1),
              (c.yu = r + ((i - r) >> 5)),
              c.yu < 544 ? (c.yu = 544) : c.yu > 5120 && (c.yu = 5120),
              (c.yl += c.yu + (-c.yl >> 6)),
              1 === m)
            )
              (c.pp[0] = 0),
                (c.pp[1] = 0),
                (c.zp[0] = 0),
                (c.zp[1] = 0),
                (c.zp[2] = 0),
                (c.zp[3] = 0),
                (c.zp[4] = 0),
                (c.zp[5] = 0),
                (d = 0);
            else
              for (
                v = x ^ c.pk[0],
                  d = c.pp[1] - (c.pp[1] >> 7),
                  0 !== u &&
                    ((g = v ? c.pp[0] : -c.pp[0]) < -8191
                      ? (d -= 256)
                      : (d += g > 8191 ? 255 : g >> 5),
                    x ^ c.pk[1]
                      ? d <= -12160
                        ? (d = -12288)
                        : d >= 12416
                        ? (d = 12288)
                        : (d -= 128)
                      : d <= -12416
                      ? (d = -12288)
                      : d >= 12160
                      ? (d = 12288)
                      : (d += 128)),
                  c.pp[1] = d,
                  c.pp[0] -= c.pp[0] >> 8,
                  0 !== u && (0 === v ? (c.pp[0] += 192) : (c.pp[0] -= 192)),
                  p = 15360 - d,
                  c.pp[0] < -p ? (c.pp[0] = -p) : c.pp[0] > p && (c.pp[0] = p),
                  l = 0;
                l < 6;
                l++
              )
                (c.zp[l] -= 5 === n ? c.zp[l] >> 9 : c.zp[l] >> 8),
                  32767 & a &&
                    ((a ^ c.dq[l]) >= 0 ? (c.zp[l] += 128) : (c.zp[l] -= 128));
            for (l = 5; l > 0; l--) c.dq[l] = c.dq[l - 1];
            return (
              0 === f
                ? (c.dq[0] = a >= 0 ? 32 : 64544)
                : ((h = e(f, t, 15)),
                  (c.dq[0] =
                    a >= 0
                      ? (h << 6) + ((f << 6) >> h)
                      : (h << 6) + ((f << 6) >> h) - 1024)),
              (c.sr[1] = c.sr[0]),
              0 === s
                ? (c.sr[0] = 32)
                : s > 0
                ? ((h = e(s, t, 15)), (c.sr[0] = (h << 6) + ((s << 6) >> h)))
                : s > -32768
                ? ((h = e((f = -s), t, 15)),
                  (c.sr[0] = (h << 6) + ((f << 6) >> h) - 1024))
                : (c.sr[0] = 64544),
              (c.pk[1] = c.pk[0]),
              (c.pk[0] = x),
              (c.td = 1 === m ? 0 : d < -11776 ? 1 : 0),
              (c.dms += (o - c.dms) >> 5),
              (c.dml += ((o << 2) - c.dml) >> 7),
              1 === m
                ? (c.ppp = 256)
                : r < 1536
                ? (c.ppp += (512 - c.ppp) >> 4)
                : 1 === c.td
                ? (c.ppp += (512 - c.ppp) >> 4)
                : Math.abs((c.dms << 2) - c.dml) >= c.dml >> 3
                ? (c.ppp += (512 - c.ppp) >> 4)
                : (c.ppp += -c.ppp >> 4),
              c
            );
          });
      }),
      (e.Texture = e.Shader = e.Script = e.Queue = e.Program = void 0),
      (e.VideoBufferList = function () {
        var t = 0,
          e = 0,
          n = null;
        function r() {
          (t = 360),
            (e = 240),
            (n = null),
            (this._length = 0),
            (this.head = null),
            (this.tail = null),
            (this.curIdx = 0);
        }
        return (
          (r.prototype = {
            push: function (t, r, i, o, a, s) {
              var u = new VideoBufferNode(t, r, i, o, a, s);
              return (
                this._length > 0
                  ? ((this.tail.next = u),
                    (u.previous = this.tail),
                    (this.tail = u))
                  : ((this.head = u), (this.tail = u)),
                (this._length += 1),
                null !== n && this._length >= e && n(),
                u
              );
            },
            pop: function () {
              var t = null;
              return (
                this._length > 1 &&
                  ((t = this.head),
                  (this.head = this.head.next),
                  null !== this.head
                    ? (this.head.previous = null)
                    : (this.tail = null),
                  (this._length -= 1)),
                t
              );
            },
            setMaxLength: function (e) {
              (t = e) > 360 ? (t = 360) : t < 30 && (t = 30);
            },
            setBUFFERING: function (t) {
              (e = t) > 240 ? (e = 240) : e < 6 && (e = 6);
            },
            setBufferFullCallback: function (t) {
              n = t;
            },
            searchTimestamp: function (t) {
              var e = this.head,
                n = this._length,
                r = 1;
              if (0 === n || t <= 0 || null === e)
                throw new Error("Failure: non-existent node in this list.");
              for (
                ;
                null !== e &&
                (e.timeStamp.timestamp !== t.timestamp ||
                  e.timeStamp.timestamp_usec !== t.timestamp_usec);

              )
                (e = e.next), r++;
              return n < r ? (e = null) : (this.curIdx = r), e;
            },
            findIFrame: function (t) {
              var e = this.head,
                n = this._length,
                r = 1;
              if (0 === n)
                throw new Error("Failure: non-existent node in this list.");
              for (; r < this.curIdx; ) (e = e.next), r++;
              if (!0 === t) for (; "I" !== e.frameType; ) (e = e.next), r++;
              else for (; "I" !== e.frameType; ) (e = e.previous), r--;
              return n < r ? (e = null) : (this.curIdx = r), e;
            },
          }),
          new r()
        );
      }),
      (e.debug = void 0),
      (e.formAuthorizationResponse = function (t, e, n, r, i, o) {
        var s = null,
          u = null;
        return (
          (s = (0, a.default)(t + ":" + r + ":" + e).toLowerCase()),
          (u = (0, a.default)(o + ":" + n).toLowerCase()),
          (0, a.default)(s + ":" + i + ":" + u).toLowerCase()
        );
      }),
      (e.stringToUint8Array = function (t) {
        for (
          var e = t.length, n = new Uint8Array(new ArrayBuffer(e)), r = 0;
          r < e;
          r++
        )
          n[r] = t.charCodeAt(r);
        return n;
      });
    var i = r(n(1)),
      o = r(n(2)),
      a = r(n(57)),
      s = {
        log: function () {},
        error: function () {},
        count: function () {},
        info: function () {},
      };
    e.debug = s;
    var u = (function () {
      function t() {}
      return (
        (t.createFromElementId = function (e) {
          for (
            var n = document.getElementById(e), r = "", i = n.firstChild;
            i;

          )
            3 === i.nodeType && (r += i.textContent), (i = i.nextSibling);
          var o = new t();
          return (o.type = n.type), (o.source = r), o;
        }),
        (t.createFromSource = function (e, n) {
          var r = new t();
          return (r.type = e), (r.source = n), r;
        }),
        t
      );
    })();
    e.Script = u;
    var c = (function () {
      return function (t, e) {
        if ("x-shader/x-fragment" === e.type)
          this.shader = t.createShader(t.FRAGMENT_SHADER);
        else {
          if ("x-shader/x-vertex" !== e.type)
            return void error("Unknown shader type: " + e.type);
          this.shader = t.createShader(t.VERTEX_SHADER);
        }
        t.shaderSource(this.shader, e.source),
          t.compileShader(this.shader),
          t.getShaderParameter(this.shader, t.COMPILE_STATUS) ||
            error(
              "An error occurred compiling the shaders: " +
                t.getShaderInfoLog(this.shader)
            );
      };
    })();
    e.Shader = c;
    var l = (function () {
      function t(t) {
        (this.gl = t), (this.program = this.gl.createProgram());
      }
      return (
        (t.prototype = {
          attach: function (t) {
            this.gl.attachShader(this.program, t.shader);
          },
          link: function () {
            this.gl.linkProgram(this.program);
          },
          use: function () {
            this.gl.useProgram(this.program);
          },
          getAttributeLocation: function (t) {
            return this.gl.getAttribLocation(this.program, t);
          },
          setMatrixUniform: function (t, e) {
            var n = this.gl.getUniformLocation(this.program, t);
            this.gl.uniformMatrix4fv(n, !1, e);
          },
        }),
        t
      );
    })();
    e.Program = l;
    var f = (function () {
      var t = null;
      function e(t, e, n) {
        (this.gl = t),
          (this.size = e),
          (this.texture = t.createTexture()),
          t.bindTexture(t.TEXTURE_2D, this.texture),
          (this.format = n || t.LUMINANCE),
          t.texImage2D(
            t.TEXTURE_2D,
            0,
            this.format,
            e.w,
            e.h,
            0,
            this.format,
            t.UNSIGNED_BYTE,
            null
          ),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
      }
      return (
        (e.prototype = {
          fill: function (t, e) {
            var n = this.gl;
            n.bindTexture(n.TEXTURE_2D, this.texture),
              e
                ? n.texSubImage2D(
                    n.TEXTURE_2D,
                    0,
                    0,
                    0,
                    this.size.w,
                    this.size.h,
                    this.format,
                    n.UNSIGNED_BYTE,
                    t
                  )
                : n.texImage2D(
                    n.TEXTURE_2D,
                    0,
                    this.format,
                    this.size.w,
                    this.size.h,
                    0,
                    this.format,
                    n.UNSIGNED_BYTE,
                    t
                  );
          },
          bind: function (e, n, r) {
            var i = this.gl;
            t || (t = [i.TEXTURE0, i.TEXTURE1, i.TEXTURE2]),
              i.activeTexture(t[e]),
              i.bindTexture(i.TEXTURE_2D, this.texture),
              i.uniform1i(i.getUniformLocation(n.program, r), e);
          },
        }),
        e
      );
    })();
    e.Texture = f;
    var h = (function () {
      function t() {
        (0, i.default)(this, t), (this.first = null), (this.size = 0);
      }
      return (
        (0, o.default)(t, [
          {
            key: "enqueue",
            value: function (t) {
              if (null === this.first) this.first = t;
              else {
                for (var e = this.first; null !== e.next; ) e = e.next;
                e.next = t;
              }
              this.size += 1;
            },
          },
          {
            key: "dequeue",
            value: function () {
              var t = null;
              return (
                null !== this.first &&
                  ((t = this.first),
                  (this.first = this.first.next),
                  (this.size -= 1)),
                t
              );
            },
          },
          {
            key: "clear",
            value: function () {
              (this.size = 0), (this.first = null);
            },
          },
        ]),
        t
      );
    })();
    e.Queue = h;
  },
  function (t, e) {
    function n(e) {
      return (
        (t.exports = n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports),
        n(e)
      );
    }
    (t.exports = n),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    "use strict";
    var r = n(9);
    function i(t, e, n, r, i) {
      Error.call(this),
        (this.message = t),
        (this.name = "AxiosError"),
        e && (this.code = e),
        n && (this.config = n),
        r && (this.request = r),
        i && (this.response = i);
    }
    r.inherits(i, Error, {
      toJSON: function () {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status:
            this.response && this.response.status ? this.response.status : null,
        };
      },
    });
    var o = i.prototype,
      a = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED",
    ].forEach(function (t) {
      a[t] = { value: t };
    }),
      Object.defineProperties(i, a),
      Object.defineProperty(o, "isAxiosError", { value: !0 }),
      (i.from = function (t, e, n, a, s, u) {
        var c = Object.create(o);
        return (
          r.toFlatObject(t, c, function (t) {
            return t !== Error.prototype;
          }),
          i.call(c, t.message, e, n, a, s),
          (c.name = t.name),
          u && Object.assign(c, u),
          c
        );
      }),
      (t.exports = i);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t, e) {
      var n;
      if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
        if (
          Array.isArray(t) ||
          (n = (function (t, e) {
            if (!t) return;
            if ("string" === typeof t) return l(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return l(t, e);
          })(t)) ||
          (e && t && "number" === typeof t.length)
        ) {
          n && (t = n);
          var r = 0,
            i = function () {};
          return {
            s: i,
            n: function () {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
            },
            e: function (t) {
              throw t;
            },
            f: i,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var o,
        a = !0,
        s = !1;
      return {
        s: function () {
          n = t[Symbol.iterator]();
        },
        n: function () {
          var t = n.next();
          return (a = t.done), t;
        },
        e: function (t) {
          (s = !0), (o = t);
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (s) throw o;
          }
        },
      };
    }
    function l(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function f(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var h = n(10),
      d = n(8),
      p = (function (t) {
        (0, a.default)(n, t);
        var e = f(n);
        function n() {
          var t;
          return (0, i.default)(this, n), ((t = e.call(this)).atoms = []), t;
        }
        return (
          (0, o.default)(n, [
            {
              key: "availableAtoms",
              value: function () {
                return [];
              },
            },
            {
              key: "addAtom",
              value: function (t) {
                this.atoms.push(t);
              },
            },
            {
              key: "createAtom",
              value: function (t) {
                var e = d.createAtom(t);
                return this.addAtom(e), e;
              },
            },
            {
              key: "getAtoms",
              value: function (t) {
                var e,
                  n = [],
                  r = c(this.atoms);
                try {
                  for (r.s(); !(e = r.n()).done; ) {
                    var i = e.value;
                    i.type() === t && n.push(i);
                  }
                } catch (t) {
                  r.e(t);
                } finally {
                  r.f();
                }
                return n;
              },
            },
            {
              key: "getAtom",
              value: function (t) {
                var e,
                  n = c(this.atoms);
                try {
                  for (n.s(); !(e = n.n()).done; ) {
                    var r = e.value;
                    if (r.type() === t) return r;
                  }
                } catch (t) {
                  n.e(t);
                } finally {
                  n.f();
                }
                return null;
              },
            },
            {
              key: "parse",
              value: function (t) {
                for (var e = t.length, n = 0; n < e; ) {
                  var r = t.readUInt32BE(n),
                    i = t.toString("ascii", n + 4, n + 8);
                  if (0 === r) break;
                  if (((n += 8), -1 !== this.availableAtoms().indexOf(i))) {
                    var o = d.createAtom(i);
                    null !== o &&
                      (o.parse(t.slice(n, n + r - 8)), this.addAtom(o));
                  }
                  if (!(n + r - 8 <= e)) break;
                  n += r - 8;
                }
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  (e += 8);
                var n,
                  r = c(this.atoms);
                try {
                  for (r.s(); !(n = r.n()).done; ) {
                    var i = n.value;
                    i.build(t, e), (e += i.bufferSize());
                  }
                } catch (t) {
                  r.e(t);
                } finally {
                  r.f();
                }
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return (
                  8 +
                  this.atoms.reduce(function (t, e) {
                    return t + e.bufferSize();
                  }, 0)
                );
              },
            },
          ]),
          n
        );
      })(h);
    t.exports = p;
  },
  function (t, e, n) {
    var r = n(3).Buffer;
    t.exports = function (t) {
      if (t instanceof Uint8Array) {
        if (0 === t.byteOffset && t.byteLength === t.buffer.byteLength)
          return t.buffer;
        if ("function" === typeof t.buffer.slice)
          return t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength);
      }
      if (r.isBuffer(t)) {
        for (var e = new Uint8Array(t.length), n = t.length, i = 0; i < n; i++)
          e[i] = t[i];
        return e.buffer;
      }
      throw new Error("Argument must be a Buffer");
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(5)),
      a = r(n(6)),
      s = r(n(4));
    function u(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, s.default)(t);
        if (e) {
          var i = (0, s.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, a.default)(this, n);
      };
    }
    var c = (function (t) {
      (0, o.default)(n, t);
      var e = u(n);
      function n() {
        var t;
        return (
          (0, i.default)(this, n),
          ((t = e.call(this)).compositionOffset = 0),
          (t.keyframe = !1),
          t
        );
      }
      return n;
    })(n(35));
    t.exports = c;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(5)),
      a = r(n(6)),
      s = r(n(4));
    function u(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, s.default)(t);
        if (e) {
          var i = (0, s.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, a.default)(this, n);
      };
    }
    var c = (function (t) {
      (0, o.default)(n, t);
      var e = u(n);
      function n() {
        return (0, i.default)(this, n), e.call(this);
      }
      return n;
    })(n(35));
    t.exports = c;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = 4294967295,
      s = (function () {
        function t() {
          (0, i.default)(this, t);
        }
        return (
          (0, o.default)(t, null, [
            {
              key: "readUInt64BE",
              value: function (t, e) {
                var n = t.readUInt32BE(e),
                  r = t.readUInt32BE(e + 4);
                return n > 0 && (r += n * (a + 1)), r;
              },
            },
            {
              key: "writeUInt64BE",
              value: function (t, e, n) {
                var r = 0,
                  i = e;
                e > a && ((r = (e / (a + 1)) << 0), (i = e % (a + 1))),
                  t.writeUInt32BE(r, n),
                  t.writeUInt32BE(i, n + 4);
              },
            },
          ]),
          t
        );
      })();
    t.exports = s;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = (function (t) {
      (0, a.default)(n, t);
      var e = c(n);
      function n() {
        var t;
        return (0, i.default)(this, n), ((t = e.call(this)).entries = []), t;
      }
      return (
        (0, o.default)(n, [
          {
            key: "countMultiplier",
            value: function () {
              return 1;
            },
          },
          {
            key: "parse",
            value: function (t) {
              var e = t.readUInt32BE(4);
              this.entries = new Array(e * this.countMultiplier());
              for (var n = 0, r = this.entries.length; n < r; n++)
                this.entries[n] = t.readUInt32BE(8 + 4 * n);
            },
          },
          {
            key: "build",
            value: function (t, e) {
              t.writeUInt32BE(this.bufferSize(), e),
                t.write(this.type(), e + 4),
                t.writeUInt32BE(
                  (this.entries.length / this.countMultiplier()) << 0,
                  e + 12
                );
              for (var n = 0, r = this.entries.length; n < r; n++)
                t.writeUInt32BE(this.entries[n], e + 16 + 4 * n);
            },
          },
          {
            key: "bufferSize",
            value: function () {
              return 16 + 4 * this.entries.length;
            },
          },
        ]),
        n
      );
    })(n(10));
    t.exports = l;
  },
  function (t, e, n) {
    "use strict";
    var r = n(13);
    function i(t) {
      r.call(this, null == t ? "canceled" : t, r.ERR_CANCELED),
        (this.name = "CanceledError");
    }
    n(9).inherits(i, r, { __CANCEL__: !0 }), (t.exports = i);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(5)),
      a = r(n(6)),
      s = r(n(4));
    function u(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, s.default)(t);
        if (e) {
          var i = (0, s.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, a.default)(this, n);
      };
    }
    var c = (function (t) {
      (0, o.default)(n, t);
      var e = u(n);
      function n() {
        var t;
        return (
          (0, i.default)(this, n),
          ((t = e.call(this)).channels = null),
          (t.sampleRate = null),
          (t.sampleSize = null),
          t
        );
      }
      return n;
    })(n(34));
    t.exports = c;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = (function (t) {
      (0, a.default)(n, t);
      var e = c(n);
      function n() {
        var t;
        return (
          (0, i.default)(this, n),
          ((t = e.call(this)).width = 0),
          (t.height = 0),
          t
        );
      }
      return (
        (0, o.default)(n, [
          {
            key: "resolution",
            value: function () {
              return this.width && this.height
                ? "".concat(this.width, "x").concat(this.height)
                : "";
            },
          },
        ]),
        n
      );
    })(n(34));
    t.exports = l;
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
        i = r(n(1)),
        o = r(n(2)),
        a = n(37),
        s = n(163),
        u = n(164),
        c = (function () {
          function t() {
            (0, i.default)(this, t);
          }
          return (
            (0, o.default)(t, null, [
              {
                key: "create",
                value: function (t) {
                  return t instanceof a
                    ? t
                    : t instanceof e
                    ? new u(t)
                    : new s(t);
                },
              },
            ]),
            t
          );
        })();
      t.exports = c;
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    t.exports = { CODEC_AAC: "aac", CODEC_H264: "h264", CODEC_H265: "h265" };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e._setSession =
        e._setCookie =
        e._sendEx =
        e._send =
        e._outData =
        e._multicall =
        e._intelliSchemeMulticall =
        e._intelliSchemeConfig =
        e._getSession =
        e._getCookie =
        e._dataEx =
        e._data =
        e._config =
          void 0),
      (e.default = function () {
        (this.Global = x.Global()),
          (this.ConfigManager = x.ConfigManager()),
          (this.UserManager = x.UserManager()),
          (this.RecordFinder = x.RecordFinder()),
          (this.DevInit = x.DevInit()),
          (this.Security = x.Security()),
          (this.System = x.System()),
          (this.Encode = x.Encode()),
          (this.MediaFileFind = x.MediaFileFind()),
          (this.PTZ = x.PTZ()),
          (this.WebInit = x.WebInit()),
          (this.DevVideoInput = x.DevVideoInput()),
          (this.MagicBox = x.MagicBox()),
          (this.Storage = x.Storage()),
          (this.LogicDeviceManager = x.LogicDeviceManager());
      }),
      (e.setIP = e.getIP = void 0);
    var i,
      o = r(n(26)),
      a = r(n(43)),
      s = (r(n(28)), n(120));
    function u(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function c(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? u(Object(n), !0).forEach(function (e) {
              (0, o.default)(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : u(Object(n)).forEach(function (e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var l = 1,
      f = 0,
      h = null,
      d = function () {
        return f;
      };
    e._getSession = d;
    var p = function (t) {
      f = t;
    };
    e._setSession = p;
    var v = function (t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        n = arguments.length > 2 ? arguments[2] : void 0;
      return c(c({}, { method: t, params: e, id: l++, session: d() }), n);
    };
    e._data = v;
    var g = function (t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        n = arguments.length > 2 ? arguments[2] : void 0;
      return c(
        c({}, { method: t, params: e, id: l++, session: e.sessionId }),
        n
      );
    };
    e._dataEx = g;
    var m = function (t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        n = arguments.length > 2 ? arguments[2] : void 0;
      return c(c({}, { method: t, params: e, id: l++ }), n);
    };
    e._outData = m;
    var y = function (t) {
      var e = t.name,
        n = void 0 === e ? [] : e,
        r = t.channel,
        i = t.params,
        o = t.options,
        a = void 0 === o ? [] : o,
        s = t.onlyLocal,
        u = t.type,
        c = {
          method: "configManager.".concat(u),
          params: { name: n },
          id: l++,
          session: d(),
        };
      return (
        (r || 0 === r) && (c.params.channel = r - 0),
        null !== i && void 0 !== i && (c.params.table = i),
        a && (c.params.options = a),
        s && (c.params.onlyLocal = s.onlyLocal),
        c
      );
    };
    e._config = y;
    e._intelliSchemeConfig = function (t) {
      var e = t.id,
        n = t.name,
        r = void 0 === n ? [] : n,
        i = t.channel,
        o = t.params,
        a = t.options,
        s = void 0 === a ? [] : a,
        u = t.onlyLocal,
        c = t.type,
        f = {
          method: "intelliScheme.".concat(c),
          params: { name: r },
          id: l++,
          session: d(),
        };
      return (
        e && (f.params.schemeID = e),
        (i || 0 === i) && (f.params.channel = i - 0),
        o && (f.params.table = o),
        s && (f.params.options = s),
        u && (f.params.onlyLocal = u.onlyLocal),
        f
      );
    };
    var b = function (t) {
      var e = t.name,
        n = void 0 === e ? [] : e,
        r = t.channel,
        i = t.params,
        o = void 0 === i ? [] : i,
        a = t.options,
        s = void 0 === a ? [] : a,
        u = t.type;
      if (o.length && n.length !== o.length)
        throw new Error("multicall params error");
      return {
        method: "system.multicall",
        params: n.map(function (t, e) {
          var n = {
            method: "configManager.".concat(u),
            params: { name: t },
            id: l++,
            session: d(),
          };
          return (
            (r || 0 === r) && (n.params.channel = r - 0),
            o[e] && (n.params.table = o[e]),
            s && (n.params.options = s),
            n
          );
        }),
        id: l++,
        session: d(),
      };
    };
    e._multicall = b;
    e._intelliSchemeMulticall = function (t) {
      var e = t.id,
        n = t.name,
        r = void 0 === n ? [] : n,
        i = t.channel,
        o = t.params,
        a = void 0 === o ? [] : o,
        s = t.options,
        u = void 0 === s ? [] : s,
        c = t.type;
      if (a.length && r.length !== a.length)
        throw new Error("multicall params error");
      return {
        method: "system.multicall",
        params: r.map(function (t, n) {
          var r = {
            method: "intelliScheme.".concat(c),
            params: { name: t },
            id: l++,
            session: d(),
          };
          return (
            e && (r.params.schemeID = e),
            (i || 0 === i) && (r.params.channel = i - 0),
            a[n] && (r.params.table = a[n]),
            u && (r.params.options = u),
            r
          );
        }),
        id: l++,
        session: d(),
      };
    };
    var w = function (t) {
      var e =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "/RPC2";
      return new Promise(function (n, r) {
        (0, a.default)({
          method: "POST",
          url: e,
          headers: { "Content-Type": "application/json", "Self-TargetIP": h },
          data: JSON.stringify(t),
          dataType: "json",
        })
          .then(function (i) {
            (i = i.data).result
              ? ((i =
                  i.params && "/RPC2_Login" !== e
                    ? i.params.table
                      ? i.params.table
                      : i.params
                    : i),
                n(i))
              : i.error &&
                i.error.code &&
                (287637504 === i.error.code || 287637505 === i.error.code)
              ? ("global.keepAlive" !== t.method && (0, s.reload)(), r(i))
              : r(i);
          })
          .catch(function (e) {
            e.error &&
            e.error.code &&
            (287637504 === e.error.code || 287637505 === e.error.code)
              ? ("global.keepAlive" !== t.method && (0, s.reload)(), r(e))
              : r(e);
          });
      });
    };
    e._send = w;
    var S = function (t) {
      var e =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : "/RPC2";
      return new Promise(function (n, r) {
        (0, a.default)({
          method: "POST",
          url: e,
          headers: {
            "Content-Type": "application/json",
            "Self-TargetIP": t.params.targetIP,
          },
          data: JSON.stringify(t),
          dataType: "json",
        })
          .then(function (i) {
            (i = i.data).result
              ? ((i =
                  i.params && "/RPC2_Login" !== e
                    ? i.params.table
                      ? i.params.table
                      : i.params
                    : i),
                n(i))
              : i.error &&
                i.error.code &&
                (287637504 === i.error.code || 287637505 === i.error.code)
              ? ("global.keepAlive" !== t.method && (0, s.reload)(), r(i))
              : r(i);
          })
          .catch(function (e) {
            e.error &&
            e.error.code &&
            (287637504 === e.error.code || 287637505 === e.error.code)
              ? ("global.keepAlive" !== t.method && (0, s.reload)(), r(e))
              : r(e);
          });
      });
    };
    e._sendEx = S;
    var T = function (t, e, n) {
      var r = new Date();
      r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3);
      var i = "expires=" + r.toUTCString();
      document.cookie = t + "=" + e + "; " + i;
    };
    e._setCookie = T;
    e._getCookie = function (t) {
      for (
        var e = t + "=", n = document.cookie.split(";"), r = 0;
        r < n.length;
        r++
      ) {
        for (var i = n[r]; " " === i.charAt(0); ) i = i.substring(1);
        if (-1 !== i.indexOf(e)) return i.substring(e.length, i.length);
      }
      return "";
    };
    e.setIP = function (t) {
      h = t;
    };
    e.getIP = function () {
      return h;
    };
    var x =
      ((i = {}),
      (0, o.default)(i, "Global", function () {
        return {
          firstLogin: function (t, e) {
            var n = {
              method: "global.login",
              params: c(
                c({}, { userName: 'admin', password: "root1013", clientType: "Web5.0" }),
                e
              ),
              id: l++,
            };
            return w(n, "/RPC2_Login").catch(function (t) {
              return p(t.session), t;
            });
          },
          secondLogin: function (t, e) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              r = arguments.length > 3 ? arguments[3] : void 0;
            return new Promise(function (i, o) {
              w(
                v(
                  "global.login",
                  c(
                    c({}, { userName: t, password: e, clientType: "Web5.0" }),
                    n
                  )
                ),
                "/RPC2_Login"
              )
                .then(function (e) {
                  r
                    ? T("WebClientSessionID", "", -1)
                    : T("WebClientSessionID", d()),
                    T("username", t),
                    i(e);
                })
                .catch(function (t) {
                  o(t);
                });
            });
          },
          logout: function () {
            return w(v("global.logout"));
          },
          keepAlive: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 300,
              e = arguments.length > 1 ? arguments[1] : void 0,
              n = arguments.length > 2 ? arguments[2] : void 0;
            return S(
              g("global.keepAlive", {
                timeout: t,
                active: !0,
                sessionId: e,
                targetIP: n,
              })
            ).then(function (t) {
              return t;
            });
          },
          getCurrentTime: function () {
            return w(v("global.getCurrentTime")).then(function (t) {
              return t.time;
            });
          },
          setCurrentTime: function (t, e) {
            return w(v("global.setCurrentTime", { time: t, tolerance: e }));
          },
        };
      }),
      (0, o.default)(i, "ConfigManager", function () {
        return {
          getConfig: function (t, e, n, r) {
            return "[object Object]" === Object.prototype.toString.call(t)
              ? w(y(c(c({}, t), {}, { type: "getConfig" })))
              : t instanceof Array
              ? w(b({ name: t, channel: e, params: n, type: "getConfig" }))
              : w(
                  y({
                    name: t,
                    channel: e,
                    params: n,
                    onlyLocal: r,
                    type: "getConfig",
                  })
                );
          },
          setConfig: function (t, e, n, r) {
            return "[object Object]" === Object.prototype.toString.call(t)
              ? w(y(c(c({}, t), {}, { type: "setConfig" })))
              : t instanceof Array
              ? w(
                  b({
                    name: t,
                    channel: n,
                    params: e,
                    type: "setConfig",
                    options: r,
                  })
                )
              : w(
                  y({
                    name: t,
                    channel: n,
                    params: e,
                    type: "setConfig",
                    options: r,
                  })
                );
          },
          getDefault: function (t, e, n) {
            return "[object Object]" === Object.prototype.toString.call(t)
              ? w(y(c(c({}, t), {}, { type: "getDefault" })))
              : t instanceof Array
              ? w(b({ name: t, channel: e, params: n, type: "getDefault" }))
              : w(y({ name: t, channel: e, params: n, type: "getDefault" }));
          },
          instance: function () {
            return w(v("configManager.factory.instance"));
          },
          destroy: function (t) {
            return w(v("configManager.destroy", null, { object: t }));
          },
          exportPackConfig: function (t) {
            return w(v("configManager.exportPackConfig", null, { object: t }));
          },
          restoreExcept: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              e = arguments.length > 1 ? arguments[1] : void 0;
            return w(v("configManager.restoreExcept", t, { object: e }));
          },
          deleteFile: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              e = arguments.length > 1 ? arguments[1] : void 0;
            return w(v("configManager.deleteFile", t, { object: e }));
          },
          restore: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              e = arguments.length > 1 ? arguments[1] : void 0;
            return w(v("configManager.restore", t, { object: e }));
          },
          setTemporaryConfig: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              e = arguments.length > 1 ? arguments[1] : void 0;
            if (t instanceof Array) {
              var n = [];
              return (
                t.map(function (t) {
                  n.push(v("configManager.setTemporaryConfig", t, e));
                }),
                w(v("system.multicall", n))
              );
            }
            return w(v("configManager.setTemporaryConfig", t, { object: e }));
          },
          restoreTemporaryConfig: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              e = arguments.length > 1 ? arguments[1] : void 0;
            if (t instanceof Array) {
              var n = [];
              return (
                t.map(function (t) {
                  n.push(v("configManager.restoreTemporaryConfig", t, e));
                }),
                w(v("system.multicall", n))
              );
            }
            return w(
              v("configManager.restoreTemporaryConfig", t, { object: e })
            );
          },
          saveFile: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("configManager.saveFile", t));
          },
        };
      }),
      (0, o.default)(i, "UserManager", function () {
        return {
          getAuthorityList: function () {
            return w(v("userManager.getAuthorityList"));
          },
          getTemporaryToken: function (t) {
            return w(v("userManager.getTemporaryToken", t));
          },
          getCaps: function (t) {
            return w(v("userManager.getCaps", null, { object: t }));
          },
          addGroup: function (t) {
            return w(v("userManager.addGroup", { group: t }));
          },
          deleteGroup: function (t) {
            return w(v("userManager.deleteGroup", { name: t }));
          },
          modifyGroup: function (t, e) {
            return w(v("userManager.modifyGroup", { name: t, group: e }));
          },
          getGroupInfo: function (t) {
            return w(v("userManager.getGroupInfo", { name: t }));
          },
          getGroupInfoAll: function () {
            return w(v("userManager.getGroupInfoAll"));
          },
          addUser: function (t) {
            return w(v("userManager.addUser", { user: t }));
          },
          deleteUser: function (t) {
            return w(v("userManager.deleteUser", { name: t }));
          },
          modifyUser: function (t, e) {
            return w(v("userManager.modifyUser", { name: t, user: e }));
          },
          modifyPassword: function (t, e, n) {
            return w(
              v("userManager.modifyPassword", { name: t, pwd: e, pwdOld: n })
            );
          },
          modifyPasswordByManager: function (t) {
            var e = t.name,
              n = t.pwd,
              r = t.nameManager,
              i = t.pwdManager,
              o = t.accountType;
            return w(
              v("userManager.modifyPasswordByManager", {
                name: e,
                pwd: n,
                nameManager: r,
                pwdManager: i,
                accountType: o,
              })
            );
          },
          getUserInfo: function (t) {
            return w(v("userManager.getUserInfo", { name: t }));
          },
          getErrorNo: function () {
            return w(v("userManager.getErrorNo"));
          },
          getUserInfoAll: function () {
            return w(v("userManager.getUserInfoAll"));
          },
          setDefault: function () {
            return w(v("userManager.setDefault"));
          },
          getActiveUserInfoAll: function () {
            return w(v("userManager.getActiveUserInfoAll"));
          },
          getAnonymityInfo: function (t) {
            return w(v("userManager.getUserInfo", t));
          },
        };
      }),
      (0, o.default)(i, "RecordFinder", function () {
        return {
          create: function (t) {
            return w(v("RecordFinder.factory.create", { name: t }));
          },
          destroy: function (t) {
            return w(v("RecordFinder.destroy", null, { object: t }));
          },
          startFind: function (t, e) {
            return w(
              v("RecordFinder.startFind", { condition: t }, { object: e })
            );
          },
          doFind: function (t, e) {
            return w(v("RecordFinder.doFind", { count: t }, { object: e }));
          },
          doSeekFind: function (t, e, n) {
            return w(
              v(
                "RecordFinder.doSeekFind",
                { offset: t, count: e },
                { object: n }
              )
            );
          },
          stopFind: function (t) {
            return w(v("RecordFinder.stopFind", null, { object: t }));
          },
          getQuerySize: function (t) {
            return w(v("RecordFinder.getQuerySize", null, { object: t }));
          },
        };
      }),
      (0, o.default)(i, "DevVideoInput", function () {
        return {
          instance: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 0;
            return w(v("devVideoInput.factory.instance", { channel: t }));
          },
          getFocusPresets: function (t) {
            return w(v("devVideoInput.getFocusPresets", null, { object: t }));
          },
          setFocusPreset: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("devVideoInput.setFocusPreset", e, { object: t }));
          },
          removeFocusPreset: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("devVideoInput.setFocusPreset", e, { object: t }));
          },
          gotoFocusPreset: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("devVideoInput.setFocusPreset", e, { object: t }));
          },
          getCollect: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("devVideoInput.factory.getCollect", t));
          },
          destroy: function (t) {
            return w(v("devVideoInput.destroy", null, { object: t }));
          },
          getCaps: function (t) {
            return w(v("devVideoInput.getCaps", null, { object: t }));
          },
          getFocusStatus: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("devVideoInput.getFocusStatus", e, { object: t }));
          },
          getVideoInStatus: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("devVideoInput.getVideoInStatus", e, { object: t }));
          },
          adjustFocus: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("devVideoInput.adjustFocus", e, { object: t }));
          },
          stopAutoFocus: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("devVideoInput.stopAutoFocus", e, { object: t }));
          },
          autoFocus: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("devVideoInput.autoFocus", e, { object: t }));
          },
          focusRegion: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("devVideoInput.focusRegion", e, { object: t }));
          },
          adjustFocusContinuously: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(
              v("devVideoInput.adjustFocusContinuously", e, { object: t })
            );
          },
          getCapsEx: function (t, e) {
            return w(v("devVideoInput.getCapsEx", e, { object: t }));
          },
          getFishEyeWinInfo: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0;
            return w(
              v("devVideoInput.getFishEyeWinInfo", { winIdSet: t, channel: e })
            );
          },
          setFishEyeEPtz: function (t, e, n, r, i, o) {
            var a =
              arguments.length > 6 && void 0 !== arguments[6]
                ? arguments[6]
                : 0;
            return w(
              v("devVideoInput.setFishEyeEPtz", {
                winID: t,
                cmd: e,
                arg1: n,
                arg2: r,
                arg3: i,
                arg4: o,
                channel: a,
              })
            );
          },
          resetFocusOptions: function (t, e) {
            return w(v("devVideoInput.resetFocusOptions", e, { object: t }));
          },
        };
      }),
      (0, o.default)(i, "DevInit", function () {
        return {
          getStatus: function () {
            return w(m("DevInit.getStatus"), "/OutsideCmd");
          },
          account: function (t) {
            var e = t.cipher,
              n = t.salt,
              r = t.content;
            return w(
              m("DevInit.account", { cipher: e, salt: n, content: r }),
              "/OutsideCmd"
            );
          },
          getDevCaps: function () {
            return w(m("DevInit.getDevCaps"), "/OutsideCmd");
          },
          setCurrentTime: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("DevInit.setCurrentTime", t), "/OutsideCmd");
          },
          setLocalityConfig: function (t) {
            var e = t.cipher,
              n = t.salt,
              r = t.content;
            return w(
              v("DevInit.setLocalityConfig", {
                cipher: e,
                salt: n,
                content: r,
              }),
              "/OutsideCmd"
            );
          },
          getLocalityConfig: function () {
            return w(m("DevInit.getLocalityConfig"), "/OutsideCmd");
          },
          getCurrentTime: function () {
            return w(m("DevInit.getCurrentTime", {}), "/OutsideCmd");
          },
          access: function (t) {
            var e = t.salt,
              n = t.cipher,
              r = t.content;
            return w(
              m("DevInit.access", { salt: e, cipher: n, content: r }),
              "/OutsideCmd"
            );
          },
        };
      }),
      (0, o.default)(i, "Security", function () {
        return {
          getEncryptInfo: function () {
            return w(v("Security.getEncryptInfo"));
          },
          getEncryptInfoOut: function () {
            return w(m("Security.getEncryptInfo"), "/OutsideCmd");
          },
          getConfig: function (t) {
            var e = t.cipher,
              n = t.salt,
              r = t.content;
            return w(
              v("Security.getConfig", { cipher: e, salt: n, content: r })
            );
          },
          setConfig: function (t) {
            var e = t.cipher,
              n = t.salt,
              r = t.content;
            return w(
              v("Security.setConfig", { cipher: e, salt: n, content: r })
            );
          },
          getDefault: function (t) {
            var e = t.cipher,
              n = t.salt,
              r = t.content;
            return w(
              v("configManager.secGetDefault", {
                cipher: e,
                salt: n,
                content: r,
              })
            );
          },
          addUser: function (t) {
            var e = t.cipher,
              n = t.salt,
              r = t.content;
            return w(v("Security.addUser", { cipher: e, salt: n, content: r }));
          },
          addUserPlain: function (t) {
            var e = t.cipher,
              n = t.salt,
              r = t.content;
            return w(
              v("Security.addUserPlain", { cipher: e, salt: n, content: r })
            );
          },
          modifyPasswordPlain: function (t) {
            var e = t.cipher,
              n = t.salt,
              r = t.content;
            return w(
              v("Security.modifyPasswordPlain", {
                cipher: e,
                salt: n,
                content: r,
              })
            );
          },
          getCaps: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("Security.getCaps", t));
          },
        };
      }),
      (0, o.default)(i, "System", function () {
        return {
          multiSec: function (t) {
            var e = t.cipher,
              n = t.salt,
              r = t.content;
            return w(v("system.multiSec", { cipher: e, salt: n, content: r }));
          },
          multicall: function (t) {
            return (
              t.forEach(function (t) {
                (t.id = l++), (t.session = d());
              }),
              w(v("system.multicall", t))
            );
          },
          listMethod: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("system.listMethod", t));
          },
        };
      }),
      (0, o.default)(i, "Encode", function () {
        return {
          getConfigCaps: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("encode.getConfigCaps", t));
          },
          getCropCaps: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : { channel: 0 };
            return w(v("encode.getCropCaps", t));
          },
          getSmartCaps: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("encode.getSmartCaps", t));
          },
          getCaps: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("encode.getCaps", t));
          },
          updateOverlayPicture: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("encode.updateOverlayPicture", t));
          },
          getFlexStreamCaps: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("encode.getFlexStreamCaps", t));
          },
          getNAACaps: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("encode.getNAACaps", t));
          },
        };
      }),
      (0, o.default)(i, "MediaFileFind", function () {
        return {
          instance: function () {
            return w(v("mediaFileFind.factory.create"));
          },
          destroy: function (t, e) {
            return w(v("mediaFileFind.destroy", e, { object: t }));
          },
          close: function (t, e) {
            return w(v("mediaFileFind.close", e, { object: t }));
          },
          getCount: function (t, e) {
            return w(v("mediaFileFind.getCount", e, { object: t }));
          },
          setQueryResultOptions: function (t, e) {
            return w(
              v("mediaFileFind.setQueryResultOptions", e, { object: t })
            );
          },
          findFile: function (t, e) {
            return w(v("mediaFileFind.findFile", e, { object: t }));
          },
          findNextFile: function (t, e) {
            return w(v("mediaFileFind.findNextFile", e, { object: t }));
          },
        };
      }),
      (0, o.default)(i, "PTZ", function () {
        return {
          instance: function (t) {
            return w(v("ptz.factory.instance", { channel: t }));
          },
          destroy: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.destroy", e, { object: t }));
          },
          start: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.start", e, { object: t }));
          },
          getPresets: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.getPresets", e, { object: t }));
          },
          setDirection: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.setDirection", e, { object: t }));
          },
          getTours: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.getTours", e, { object: t }));
          },
          stop: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.stop", e, { object: t }));
          },
          restartPtz: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.restartPtz", e, { object: t }));
          },
          lensInit: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.lensInit", e, { object: t }));
          },
          reset: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.reset", e, { object: t }));
          },
          markLimit: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.markLimit", e, { object: t }));
          },
          gotoLimit: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.gotoLimit", e, { object: t }));
          },
          enableLimit: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.enableLimit", e, { object: t }));
          },
          setScanLimit: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.setScanLimit", e, { object: t }));
          },
          startScan: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.startScan", e, { object: t }));
          },
          stopScan: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.stopScan", e, { object: t }));
          },
          getCurrentProtocolCaps: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.getCurrentProtocolCaps", e, { object: t }));
          },
          removePreset: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.removePreset", e, { object: t }));
          },
          setPreset: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.setPreset", e, { object: t }));
          },
          gotoPreset: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.gotoPreset", e, { object: t }));
          },
          startPatternReplay: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.startPatternReplay", e, { object: t }));
          },
          stopPatternReplay: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.stopPatternReplay", e, { object: t }));
          },
          startPatternRecord: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.startPatternRecord", e, { object: t }));
          },
          stopPatternRecord: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.stopPatternRecord", e, { object: t }));
          },
          startTour: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.startTour", e, { object: t }));
          },
          stopTour: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.stopTour", e, { object: t }));
          },
          focusRegion: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.focusRegion", e, { object: t }));
          },
          getOperationStatus: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.getOperationStatus", e, { object: t }));
          },
          getLifetimeEncrypt: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.getLifetimeEncrypt", e, { object: t }));
          },
          moveDirectly: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.moveDirectly", e, { object: t }));
          },
          getProtocolList: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.getProtocolList", e, { object: t }));
          },
          getProtocol: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.getProtocol", e, { object: t }));
          },
          getStatus: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.getStatus", e, { object: t }));
          },
          moveAbsolutely: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            return w(v("ptz.moveAbsolutely", e, { object: t }));
          },
        };
      }),
      (0, o.default)(i, "WebInit", function () {
        return {
          getCaps: function () {
            return w(m("WebInit.getCaps", null), "/OutsideCmd");
          },
        };
      }),
      (0, o.default)(i, "MagicBox", function () {
        return {
          instance: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("magicBox.factory.instance", t));
          },
          getProductDefinition: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "";
            return w(v("magicBox.getProductDefinition", { name: t }));
          },
        };
      }),
      (0, o.default)(i, "Storage", function () {
        return {
          instance: function () {
            return w(v("storage.factory.instance"));
          },
          destroy: function (t, e) {
            return w(v("storage.destroy", e, { object: t }));
          },
          getDeviceNames: function (t, e) {
            return w(v("storage.getDeviceNames", e, { object: t }));
          },
          getGroupNames: function (t, e) {
            return w(v("storage.getGroupNames", e, { object: t }));
          },
          getDirectoryPaths: function (t, e) {
            return w(v("storage.getDirectoryPaths", e, { object: t }));
          },
          getFileInfo: function (t, e) {
            return w(v("storage.getFileInfo", e, { object: t }));
          },
          addFileInfo: function (t, e) {
            return w(v("storage.addFileInfo", e, { object: t }));
          },
          attachAddFileInfoState: function (t, e) {
            return w(v("storage.attachAddFileInfoState", e, { object: t }));
          },
          detachAddFileInfoState: function (t, e) {
            return w(v("storage.detachAddFileInfoState", e, { object: t }));
          },
          markFile: function (t) {
            return w(v("storage.markFile", t));
          },
          getiSCSITargets: function (t, e) {
            return w(v("storage.getiSCSITargets", e, { object: t }));
          },
          secGetiSCSITargets: function (t, e) {
            return w(v("storage.secGetiSCSITargets", e, { object: t }));
          },
          getPortInfo: function (t, e) {
            return w(v("storage.getPortInfo", e, { object: t }));
          },
          getStreamUri: function (t, e) {
            return w(v("storage.getStreamUri", e, { object: t }));
          },
          testNAS: function (t, e) {
            return w(v("storage.testNAS", e, { object: t }));
          },
          secTestNAS: function (t, e) {
            return w(v("storage.secTestNAS", e, { object: t }));
          },
          getBoundTime: function (t, e) {
            return w(v("storage.getBoundTime", e, { object: t }));
          },
          getBoundTimeEx: function (t, e) {
            return w(v("storage.getBoundTimeEx", e, { object: t }));
          },
          getBitmap: function (t, e) {
            return w(v("storage.getBitmap", e, { object: t }));
          },
          getBitmapEx: function (t, e) {
            return w(v("storage.getBitmapEx", e, { object: t }));
          },
          getiSCSITargetsAll: function (t, e) {
            return w(v("storage.getiSCSITargetsAll", e, { object: t }));
          },
          getCaps: function (t, e) {
            return w(v("storage.getCaps", e, { object: t }));
          },
          attachRecordInfo: function (t, e) {
            return w(v("storage.attachRecordInfo", e, { object: t }));
          },
          detachRecordInfo: function (t, e) {
            return w(v("storage.detachRecordInfo", e, { object: t }));
          },
          getDeviceAllInfo: function (t, e) {
            return w(v("storage.getDeviceAllInfo", e, { object: t }));
          },
          getTankInfo: function (t, e) {
            return w(v("storage.getTankInfo", e, { object: t }));
          },
          startHealthcheck: function (t, e) {
            return w(v("storage.startHealthcheck", e, { object: t }));
          },
          getHealthcheckProcess: function (t, e) {
            return w(v("storage.getHealthcheckProcess", e, { object: t }));
          },
          getHealthStatusEx: function (t, e) {
            return w(v("storage.getHealthStatusEx", e, { object: t }));
          },
        };
      }),
      (0, o.default)(i, "LogicDeviceManager", function () {
        return {
          getCameraAll: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            return w(v("LogicDeviceManager.getCameraAll", { params: t }));
          },
        };
      }),
      i);
  },
  function (t, e) {
    (t.exports = function (t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(9),
        i = n(104),
        o = n(13),
        a = n(47),
        s = n(48),
        u = { "Content-Type": "application/x-www-form-urlencoded" };
      function c(t, e) {
        !r.isUndefined(t) &&
          r.isUndefined(t["Content-Type"]) &&
          (t["Content-Type"] = e);
      }
      var l = {
        transitional: a,
        adapter: (function () {
          var t;
          return (
            "undefined" !== typeof XMLHttpRequest
              ? (t = n(50))
              : "undefined" !== typeof e &&
                "[object process]" === Object.prototype.toString.call(e) &&
                (t = n(50)),
            t
          );
        })(),
        transformRequest: [
          function (t, e) {
            if (
              (i(e, "Accept"),
              i(e, "Content-Type"),
              r.isFormData(t) ||
                r.isArrayBuffer(t) ||
                r.isBuffer(t) ||
                r.isStream(t) ||
                r.isFile(t) ||
                r.isBlob(t))
            )
              return t;
            if (r.isArrayBufferView(t)) return t.buffer;
            if (r.isURLSearchParams(t))
              return (
                c(e, "application/x-www-form-urlencoded;charset=utf-8"),
                t.toString()
              );
            var n,
              o = r.isObject(t),
              a = e && e["Content-Type"];
            if ((n = r.isFileList(t)) || (o && "multipart/form-data" === a)) {
              var u = this.env && this.env.FormData;
              return s(n ? { "files[]": t } : t, u && new u());
            }
            return o || "application/json" === a
              ? (c(e, "application/json"),
                (function (t, e, n) {
                  if (r.isString(t))
                    try {
                      return (e || JSON.parse)(t), r.trim(t);
                    } catch (t) {
                      if ("SyntaxError" !== t.name) throw t;
                    }
                  return (n || JSON.stringify)(t);
                })(t))
              : t;
          },
        ],
        transformResponse: [
          function (t) {
            var e = this.transitional || l.transitional,
              n = e && e.silentJSONParsing,
              i = e && e.forcedJSONParsing,
              a = !n && "json" === this.responseType;
            if (a || (i && r.isString(t) && t.length))
              try {
                return JSON.parse(t);
              } catch (t) {
                if (a) {
                  if ("SyntaxError" === t.name)
                    throw o.from(
                      t,
                      o.ERR_BAD_RESPONSE,
                      this,
                      null,
                      this.response
                    );
                  throw t;
                }
              }
            return t;
          },
        ],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: { FormData: n(115) },
        validateStatus: function (t) {
          return t >= 200 && t < 300;
        },
        headers: { common: { Accept: "application/json, text/plain, */*" } },
      };
      r.forEach(["delete", "get", "head"], function (t) {
        l.headers[t] = {};
      }),
        r.forEach(["post", "put", "patch"], function (t) {
          l.headers[t] = r.merge(u);
        }),
        (t.exports = l);
    }).call(this, n(46));
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = {},
      i = -1,
      o = {
        publish: function (t, e) {
          if (!r[t]) return !1;
          for (var n = r[t], i = n ? n.length : 0; i--; ) n[i].func(e);
          return this;
        },
        subscribe: function (t, e) {
          r[t] || (r[t] = []);
          var n = (++i).toString();
          return r[t].push({ token: n, func: e }), n;
        },
        unsubscribe: function (t) {
          for (var e in r)
            if (r[e])
              for (var n = 0, i = r[e].length; n < i; n++)
                if (r[e][n].token === t) return r[e].splice(n, 1), t;
        },
        getTopicFunc: function (t) {
          return r[t] ? r[t] : [];
        },
      };
    e.default = o;
  },
  function (t, e) {
    t.exports = {
      InvalidAsn1Error: function (t) {
        var e = new Error();
        return (e.name = "InvalidAsn1Error"), (e.message = t || ""), e;
      },
    };
  },
  function (t, e) {
    t.exports = {
      EOC: 0,
      Boolean: 1,
      Integer: 2,
      BitString: 3,
      OctetString: 4,
      Null: 5,
      OID: 6,
      ObjectDescriptor: 7,
      External: 8,
      Real: 9,
      Enumeration: 10,
      PDV: 11,
      Utf8String: 12,
      RelativeOID: 13,
      Sequence: 16,
      Set: 17,
      NumericString: 18,
      PrintableString: 19,
      T61String: 20,
      VideotexString: 21,
      IA5String: 22,
      UTCTime: 23,
      GeneralizedTime: 24,
      GraphicString: 25,
      VisibleString: 26,
      GeneralString: 28,
      UniversalString: 29,
      CharacterString: 30,
      BMPString: 31,
      Constructor: 32,
      Context: 128,
    };
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.util = void 0);
    var r = n(32),
      i = {
        moveFlag: !1,
        resizeFlag: !1,
        zindex: 1,
        shapeId: 1,
        drawState: 0,
        coordinate: {},
        midLineLength: 20,
        arrayLength: 10,
        eventEnabled: !0,
        eventName: {
          drawFinish: "drawFinish",
          moveFinish: "moveFinish",
          resizeFinish: "resizeFinish",
          deleteFinish: "deleteFinish",
          selectedFinish: "selectedFinish",
          addFinish: "addFinish",
        },
        defalutCoordinate: { width: 8191, height: 8191 },
        resolution: { width: 1920, height: 1080 },
        setCoordinate: function (t, e) {
          this.coordinate = {
            widthDraw: t / this.defalutCoordinate.width,
            heightDraw: e / this.defalutCoordinate.height,
            widthMouse: this.defalutCoordinate.width / t,
            heightMouse: this.defalutCoordinate.height / e,
          };
        },
        onLine: function (t, e) {
          var n,
            r,
            i,
            o,
            a = (e[1][1] - e[0][1]) / (e[1][0] - e[0][0]),
            s = (e[1][0] * e[0][1] - e[0][0] * e[1][1]) / (e[1][0] - e[0][0]),
            u = Math.abs((a * t[0] - t[1] + s) / Math.sqrt(Math.pow(a, 2) + 1));
          return (
            e[0][0] > e[1][0]
              ? ((n = e[0][0]), (r = e[1][0]))
              : ((n = e[1][0]), (r = e[0][0])),
            e[0][1] > e[1][1]
              ? ((i = e[0][1]), (o = e[1][1]))
              : ((i = e[1][1]), (o = e[0][1])),
            (n === r &&
              t[0] >= r - 300 &&
              t[0] <= n + 300 &&
              t[1] >= o - 300 &&
              t[1] <= i + 300) ||
              (t[0] >= r - 300 &&
                t[0] <= n + 300 &&
                t[1] >= o - 300 &&
                t[1] <= i + 300 &&
                u <= 300)
          );
        },
        pointInPoly: function (t, e) {
          for (var n = !1, r = -1, i = e.length, o = i - 1; ++r < i; o = r)
            ((e[r][1] <= t[1] && t[1] < e[o][1]) ||
              (e[o][1] <= t[1] && t[1] < e[r][1])) &&
              t[0] <
                ((e[o][0] - e[r][0]) * (t[1] - e[r][1])) / (e[o][1] - e[r][1]) +
                  e[r][0] &&
              (n = !n);
          return n;
        },
        pointInCircle: function (t, e, n) {
          return !(
            Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2)) > n
          );
        },
        pointInRect: function (t, e) {
          for (
            var n = this.rectToPoly(e),
              r = t[0],
              i = t[1],
              o = 0,
              a = 0,
              s = n.length,
              u = s - 1;
            a < s;
            u = a, a++
          ) {
            var c = n[a][0],
              l = n[a][1],
              f = n[u][0],
              h = n[u][1],
              d = Math.atan2(l - i, c - r) - Math.atan2(h - i, f - r);
            d >= Math.PI
              ? (d -= 2 * Math.PI)
              : d <= -Math.PI && (d += 2 * Math.PI),
              (o += d);
          }
          return 0 !== Math.round(o / Math.PI);
        },
        rectToPoly: function (t) {
          var e = [],
            n = {};
          return (
            (n[0] = t[0][0]),
            (n[1] = t[0][1]),
            e.push(n),
            ((n = {})[0] = t[1][0]),
            (n[1] = t[0][1]),
            e.push(n),
            ((n = {})[0] = t[1][0]),
            (n[1] = t[1][1]),
            e.push(n),
            ((n = {})[0] = t[0][0]),
            (n[1] = t[1][1]),
            e.push(n),
            e
          );
        },
        setUnSelected: function (t) {
          for (var e = 0; e < t.length; e++) t[e].option.selected = !1;
        },
        onPoint: function (t, e, n) {
          if (n)
            return Math.sqrt(
              Math.pow(t[0] - e[0][0], 2) + Math.pow(t[1] - e[0][1], 2)
            ) < 320
              ? 0
              : Math.sqrt(
                  Math.pow(t[0] - e[1][0], 2) + Math.pow(t[1] - e[0][1], 2)
                ) < 320
              ? 1
              : Math.sqrt(
                  Math.pow(t[0] - e[1][0], 2) + Math.pow(t[1] - e[1][1], 2)
                ) < 320
              ? 2
              : Math.sqrt(
                  Math.pow(t[0] - e[0][0], 2) + Math.pow(t[1] - e[1][1], 2)
                ) < 320 && 3;
          for (var r = 0; r < e.length; r++)
            if (
              Math.sqrt(
                Math.pow(t[0] - e[r][0], 2) + Math.pow(t[1] - e[r][1], 2)
              ) < 320
            )
              return r;
          return !1;
        },
        segmentsIntr: function (t, e, n, r) {
          var i = (t[0] - n[0]) * (e[1] - n[1]) - (t[1] - n[1]) * (e[0] - n[0]),
            o = (t[0] - r[0]) * (e[1] - r[1]) - (t[1] - r[1]) * (e[0] - r[0]);
          if (i * o >= 0) return !1;
          var a = (n[0] - t[0]) * (r[1] - t[1]) - (n[1] - t[1]) * (r[0] - t[0]);
          if (a * (a + i - o) >= 0) return !1;
          var s = a / (o - i),
            u = s * (e[0] - t[0]),
            c = s * (e[1] - t[1]);
          return [t[0] + u, t[1] + c];
        },
        segmentsInLine: function (t, e, n, r, i, o, a, s) {
          var u = (r - e) * (a - i) - (t - n) * (o - s);
          if (0 === u) return !1;
          var c =
              ((n - t) * (a - i) * (o - e) +
                (r - e) * (a - i) * t -
                (s - o) * (n - t) * i) /
              u,
            l =
              -(
                (r - e) * (s - o) * (i - t) +
                (n - t) * (s - o) * e -
                (a - i) * (r - e) * o
              ) / u;
          return (
            (c - i) * (c - a) <= 0 &&
            (l - o) * (l - s) <= 0 && [Math.floor(c), Math.floor(l)]
          );
        },
        lineCross: function (t, e) {
          for (var n = 0; n < e.length; n++) {
            if (this.segmentsIntr(t[0], t[1], e[n][0], e[n][1])) return !0;
          }
          return !1;
        },
        lineAverageNum: function (t, e) {
          if (e < 2) return [];
          for (var n = [], r = 1; r < e; r++)
            n[r - 1] = [
              Math.floor(((e - r) * t[0][0] + r * t[1][0]) / e),
              Math.floor(((e - r) * t[0][1] + r * t[1][1]) / e),
            ];
          return n;
        },
        lineCrossPoly: function (t, e) {
          if (t.length <= 3) return !1;
          for (var n, o, a = [], s = 0; s < t.length; s++)
            s === t.length - 1
              ? a.push([t[s], t[0]])
              : a.push([t[s], t[s + 1]]);
          if (e === t.length - 1) {
            (n = a.pop()), (o = a.pop());
            var u = r.jQlib.extend(!0, [], a);
            if ((u.pop(), !0 === i.lineCross(o, u))) return !0;
            var c = r.jQlib.extend(!0, [], a);
            return c.shift(), i.lineCross(n, c);
          }
          if (0 === e) {
            (o = a.pop()), (n = a.shift());
            var l = r.jQlib.extend(!0, [], a);
            if ((l.pop(), !0 === i.lineCross(o, l))) return !0;
            var f = r.jQlib.extend(!0, [], a);
            return f.shift(), i.lineCross(n, f);
          }
          (o = a.splice(e, 1)), (n = a.splice(e - 1, 1));
          var h = r.jQlib.extend(!0, [], a);
          if ((h.splice(e - 1, 1), !0 === i.lineCross(o[0], h))) return !0;
          var d = r.jQlib.extend(!0, [], a);
          return e - 2 < 0 ? d.pop() : d.splice(e - 2, 1), i.lineCross(n[0], d);
        },
        compare: function (t, e) {
          return t.option.zindex - e.option.zindex;
        },
        compareDesc: function (t, e) {
          return e.option.zindex - t.option.zindex;
        },
        compareArray: function (t, e) {
          return t - e;
        },
        drawSelectRect: function (t, e, n, r, i) {
          (r = r || 2),
            t.beginPath(),
            (t.fillStyle = i || "#FFFF00"),
            t.fillRect(e - r, n - r, 2 * r, 2 * r),
            t.closePath();
        },
        getArrayLines: function (t, e, n, r) {
          var i = this;
          if (!t || !e || (t[0] === e[0] && t[1] === e[1])) return null;
          var o,
            a,
            s,
            u,
            c = i.getArrayLineMiddle(t, e),
            l = [],
            f = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2],
            h = [(f[0] + c[0][0]) / 2, (f[1] + c[0][1]) / 2],
            d = [(f[0] + c[1][0]) / 2, (f[1] + c[1][1]) / 2];
          if (
            (l.push(c),
            (2 !== n && 1 !== n) ||
              ((o = i.getRotateByDegree(h, c[0], 30)),
              (a = i.getRotateByDegree(h, c[0], 330)),
              l.push(o, a)),
            (2 !== n && 0 !== n) ||
              ((s = i.getRotateByDegree(d, c[1], 30)),
              (u = i.getRotateByDegree(d, c[1], 330)),
              l.push(s, u)),
            r)
          ) {
            var p = this.pointInPoly(d, r);
            ("Both" !== n && "Leave" !== n) ||
              (!0 === p
                ? ((s = i.getRotateByDegree(h, c[0], 30)),
                  (u = i.getRotateByDegree(h, c[0], 330)))
                : ((s = i.getRotateByDegree(d, c[1], 30)),
                  (u = i.getRotateByDegree(d, c[1], 330))),
              l.push(s, u)),
              ("Both" !== n && "Enter" !== n) ||
                (!0 === p
                  ? ((s = i.getRotateByDegree(d, c[1], 30)),
                    (u = i.getRotateByDegree(d, c[1], 330)))
                  : ((s = i.getRotateByDegree(h, c[0], 30)),
                    (u = i.getRotateByDegree(h, c[0], 330))),
                l.push(s, u));
          }
          return l;
        },
        getArrayLineMiddle: function (t, e) {
          var n;
          n =
            e[0] === t[0]
              ? (Math.PI / 180) * 90
              : Math.atan((e[1] - t[1]) / (e[0] - t[0]));
          var r = [Math.sin(n), Math.cos(n)],
            i = r[0],
            o = r[1],
            a = [],
            s = [],
            u = [],
            c = [
              (t[0] + e[0]) / 2 - this.midLineLength * i,
              (t[1] + e[1]) / 2 + this.midLineLength * o,
            ];
          (a[0] = c[0]), (a[1] = c[1]);
          var l = [
            (t[0] + e[0]) / 2 + this.midLineLength * i,
            (t[1] + e[1]) / 2 - this.midLineLength * o,
          ];
          if (((s[0] = l[0]), (s[1] = l[1]), e[0] >= t[0])) {
            var f = [s, a];
            (u[0] = f[0]), (u[1] = f[1]);
          } else {
            var h = [a, s];
            (u[0] = h[0]), (u[1] = h[1]);
          }
          return u;
        },
        getRotateByDegree: function (t, e, n) {
          var r = Math.sin((Math.PI / 180) * n),
            i = Math.cos((Math.PI / 180) * n),
            o = (t[0] - e[0]) * i - (t[1] - e[1]) * r + e[0],
            a = (t[1] - e[1]) * i + (t[0] - e[0]) * r + e[1];
          return [
            [e[0], e[1]],
            [o, a],
          ];
        },
        lineInPoly: function (t, e) {
          var n = this.pointInPoly(t[0], e),
            r = this.pointInPoly(t[1], e);
          if (!n || !r) return !1;
          for (var i = 0; i < e.length; i++) {
            var o = void 0,
              a = void 0;
            if (
              (i === e.length - 1
                ? ((o = e[0]), (a = e[i]))
                : ((o = e[i]), (a = e[i + 1])),
              this.segmentsIntr(t[0], t[1], o, a))
            )
              return !1;
          }
          return !0;
        },
        strokeText: function (t, e, n, r, i, o) {
          (t.textAlign = i || "left"),
            (t.fillStyle = o || "#FFFF00"),
            t.fillText(e, n, r);
        },
        getStrokeTextAlign: function (t, e, n, r) {
          var i = "left";
          return e - r - t.measureText(n).width < 0 && (i = "right"), i;
        },
        getPositionByLine: function (t, e, n) {
          var i = [];
          (i[0] = r.jQlib.extend(!0, [], e[0])),
            (i[1] = r.jQlib.extend(!0, [], e[1])),
            e[1][1] < e[0][1] &&
              n &&
              ((i[0] = r.jQlib.extend(!0, [], e[1])),
              (i[1] = r.jQlib.extend(!0, [], e[0])));
          var o = i[1][1] - i[0][1],
            a = i[0][0] - i[1][0],
            s = i[1][0] * i[0][1] - i[0][0] * i[1][1],
            u = o * t[0] + a * t[1] + s;
          return u < 0 ? "left" : u > 0 ? "right" : "middle";
        },
        getNunberSign: function (t, e) {
          return t - e > 0 ? 1 : t - e < 0 ? -1 : 0;
        },
        getCoordinatePoint: function (t, e, n, r, i) {
          var o = null,
            a = [],
            s = null,
            u = null;
          return (
            n === t
              ? ((a[0] = t),
                (a[1] =
                  e >= r ? (e - i < r ? r : e - i) : e + i > r ? r : e + i))
              : ((o = Math.atan((r - e) / (n - t))),
                (s = i * Math.cos(o)),
                (u = i * Math.sin(o)),
                t < n && e <= r
                  ? ((a[0] = t + s < n ? t + s : n),
                    (a[1] = e + u < r ? e + u : r))
                  : t < n && e > r
                  ? ((a[0] = t + s < n ? t + s : n),
                    (a[1] = e + u > r ? e + u : r))
                  : t > n && e >= r
                  ? ((a[0] = t - s > n ? t - s : n),
                    (a[1] = e - u > r ? e - u : r))
                  : ((a[0] = t - s > n ? t - s : n),
                    (a[1] = e - u < r ? e - u : r))),
            a
          );
        },
        drawAppendLine: function (t, e, n) {
          t.beginPath(),
            n
              ? (t.moveTo(e[0][0] * n.widthDraw, e[0][1] * n.heightDraw),
                t.lineTo(e[1][0] * n.widthDraw, e[1][1] * n.heightDraw))
              : (t.moveTo(e[0][0], e[0][1]), t.lineTo(e[1][0], e[1][1])),
            t.stroke();
        },
        setResolution: function (t) {
          (this.resolution = {}),
            (this.resolution.width = t.width),
            (this.resolution.height = t.height);
        },
        offset: function (t) {
          var e = t.getBoundingClientRect();
          return { top: e.top + window.scrollY, left: e.left + window.scrollX };
        },
        isConvexShape: function (t) {
          var e = !0,
            n = t.length;
          if (n < 4) e = !0;
          else
            for (var r = void 0, i = 0; i < n; i++) {
              var o = t[i % n],
                a = t[(i + 1) % n],
                s = t[(i + 2) % n],
                u = { x: a[0] - o[0], y: a[1] - o[1] },
                c = { x: s[0] - a[0], y: s[1] - a[1] },
                l = 1;
              if (
                (u.x * c.y - u.y * c.x < 0 && (l = -1), r || (r = l), r * l < 0)
              ) {
                e = !1;
                break;
              }
            }
          return e;
        },
      };
    e.util = i;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.jQlib = void 0);
    var i = r(n(12)),
      o = {}.hasOwnProperty,
      a = {
        class2type: {
          "object Boolean": "boolean",
          "object Number": "number",
          "object String": "string",
          "object Function": "function",
          "object Array": "array",
          "object Date": "date",
          "object RegExp": "regexp",
          "object Object": "object",
          "object Error": "error",
        },
        deepCopy: function (t, e, n) {
          var r,
            o,
            a,
            s = e;
          if ("object" === (0, i.default)(n))
            for (var u in n)
              n.hasOwnProperty(u) &&
                ((r = s[u]),
                (a = n[u]),
                "object" !== (0, i.default)(a)
                  ? (s[u] = a)
                  : ((o = r || (Array.isArray(a) ? [] : {})),
                    (s[u] = this.deepCopy(t, o, a))));
          else s = n;
          return s;
        },
        extend: function () {
          for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
          for (var r = e[1], i = 2; i < e.length; i++)
            e[i] && (r = this.deepCopy(!0, r, e[i]));
          return r;
        },
        isFunction: function (t) {
          return "function" === this.type(t);
        },
        isArray:
          Array.isArray ||
          function (t) {
            return "array" === this.type(t);
          },
        isWindow: function (t) {
          return null !== t && t === t.window;
        },
        isPlainObject: function (t) {
          if (!t || "object" !== this.type(t) || t.nodeType || this.isWindow(t))
            return !1;
          try {
            if (
              t.constructor &&
              !o.call(t, "constructor") &&
              !o.call(t.constructor.prototype, "isPrototypeOf")
            )
              return !1;
          } catch (t) {
            return !1;
          }
          return !0;
        },
        type: function (t) {
          return null === t
            ? t + ""
            : "object" === (0, i.default)(t) || "function" === typeof t
            ? this.class2type[toString.call(t)] || "object"
            : (0, i.default)(t);
        },
        each: function (t, e, n) {
          var r = 0,
            i = t.length,
            o = this.isArraylike(t);
          if (n) {
            if (o) for (; r < i && !1 !== e.apply(t[r], n); r++);
            else for (r in t) if (!1 === e.apply(t[r], n)) break;
          } else if (o) for (; r < i && !1 !== e.call(t[r], r, t[r]); r++);
          else for (r in t) if (!1 === e.call(t[r], r, t[r])) break;
          return t;
        },
        isArraylike: function (t) {
          var e = t.length,
            n = this.type(t);
          return (
            "function" !== n &&
            !this.isWindow(t) &&
            (!(1 !== t.nodeType || !e) ||
              "array" === n ||
              0 === e ||
              ("number" === typeof e && e > 0 && e - 1 in t))
          );
        },
        getHeight: function (t) {
          var e = this;
          if (null !== t.getAttribute("height") && t.getAttribute("height") > 0)
            return parseFloat(t.getAttribute("height"));
          if (parseFloat(e._getStyleValue(t, "height")) > 0)
            return parseFloat(e._getStyleValue(t, "height"));
          if (t.offsetHeight > 0) {
            var n = e._getStyleValue(t, "borderTopWidth"),
              r = e._getStyleValue(t, "borderBottomWidth"),
              i = e._getStyleValue(t, "paddingTop"),
              o = e._getStyleValue(t, "paddingBottom"),
              a =
                parseFloat(t.offsetHeight) -
                parseFloat(n) -
                parseFloat(r) -
                parseFloat(i) -
                parseFloat(o);
            return parseFloat(a);
          }
          return 0;
        },
        getWidth: function (t) {
          var e = this;
          if (null !== t.getAttribute("width") && t.getAttribute("width") > 0)
            return parseFloat(t.getAttribute("width"));
          if (parseFloat(e._getStyleValue(t, "width")) > 0)
            return parseFloat(e._getStyleValue(t, "width"));
          if (t.offsetWidth > 0) {
            var n = e._getStyleValue(t, "borderLeftWidth"),
              r = e._getStyleValue(t, "borderRightWidth"),
              i = e._getStyleValue(t, "paddingLeft"),
              o = e._getStyleValue(t, "paddingRight"),
              a =
                parseFloat(t.offsetWidth) -
                parseFloat(n) -
                parseFloat(r) -
                parseFloat(i) -
                parseFloat(o);
            return parseFloat(a);
          }
          return 0;
        },
        _getStyleValue: function (t, e) {
          var n = t.ownerDocument.defaultView;
          return (
            (n && n.opener) || (n = window),
            t.currentStyle ? t.currentStyle[e] : n.getComputedStyle(t)[e]
          );
        },
      };
    e.jQlib = a;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2));
    function a(t, e) {
      var n;
      if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
        if (
          Array.isArray(t) ||
          (n = (function (t, e) {
            if (!t) return;
            if ("string" === typeof t) return s(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return s(t, e);
          })(t)) ||
          (e && t && "number" === typeof t.length)
        ) {
          n && (t = n);
          var r = 0,
            i = function () {};
          return {
            s: i,
            n: function () {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
            },
            e: function (t) {
              throw t;
            },
            f: i,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var o,
        a = !0,
        u = !1;
      return {
        s: function () {
          n = t[Symbol.iterator]();
        },
        n: function () {
          var t = n.next();
          return (a = t.done), t;
        },
        e: function (t) {
          (u = !0), (o = t);
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (u) throw o;
          }
        },
      };
    }
    function s(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    var u = n(21),
      c = n(22),
      l = (function () {
        function t() {
          (0, i.default)(this, t),
            (this.duration = 0),
            (this.timescale = 0),
            (this.tracks = []);
        }
        return (
          (0, o.default)(t, [
            {
              key: "relativeDuration",
              value: function () {
                return this.timescale
                  ? this.duration / this.timescale
                  : this.duration || 0;
              },
            },
            {
              key: "resolution",
              value: function () {
                var t = this.videoTrack();
                return null !== t ? t.resolution() : "";
              },
            },
            {
              key: "size",
              value: function () {
                return this.tracks.reduce(function (t, e) {
                  return t + e.size();
                }, 0);
              },
            },
            {
              key: "addTrack",
              value: function (t) {
                this.tracks.push(t);
              },
            },
            {
              key: "videoTrack",
              value: function () {
                var t,
                  e = a(this.tracks);
                try {
                  for (e.s(); !(t = e.n()).done; ) {
                    var n = t.value;
                    if (n instanceof c) return n;
                  }
                } catch (t) {
                  e.e(t);
                } finally {
                  e.f();
                }
                return null;
              },
            },
            {
              key: "audioTrack",
              value: function () {
                var t,
                  e = a(this.tracks);
                try {
                  for (e.s(); !(t = e.n()).done; ) {
                    var n = t.value;
                    if (n instanceof u) return n;
                  }
                } catch (t) {
                  e.e(t);
                } finally {
                  e.f();
                }
                return null;
              },
            },
            {
              key: "samples",
              value: function () {
                return [this.videoTrack(), this.audioTrack()]
                  .filter(function (t) {
                    return null !== t;
                  })
                  .map(function (t) {
                    return t.samples;
                  })
                  .reduce(function (t, e) {
                    return t.concat(e);
                  }, [])
                  .sort(function (t, e) {
                    return t.timescale === e.timescale
                      ? t.timestamp - e.timestamp
                      : t.timestamp * e.timescale - e.timestamp * t.timescale;
                  });
              },
            },
            {
              key: "ensureDuration",
              value: function () {
                var t = this;
                return (
                  0 === this.duration &&
                    (this.duration = this.tracks.reduce(function (e, n) {
                      return Math.max(e, t.timescale * n.relativeDuration());
                    }, 0)),
                  this.duration
                );
              },
            },
          ]),
          t
        );
      })();
    t.exports = l;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = (function () {
        function t() {
          (0, i.default)(this, t),
            (this.duration = 0),
            (this.timescale = 0),
            (this.extraData = null),
            (this.codec = null),
            (this.samples = []);
        }
        return (
          (0, o.default)(t, [
            {
              key: "relativeDuration",
              value: function () {
                return this.timescale
                  ? this.duration / this.timescale
                  : this.duration || 0;
              },
            },
            {
              key: "size",
              value: function () {
                return this.samples.reduce(function (t, e) {
                  return t + e.size;
                }, 0);
              },
            },
            {
              key: "ensureDuration",
              value: function () {
                return (
                  0 === this.duration &&
                    (this.duration = this.samples.reduce(function (t, e) {
                      return Math.max(t, e.duration);
                    }, 0)),
                  this.duration
                );
              },
            },
            {
              key: "sortSamples",
              value: function () {
                this.samples.sort(function (t, e) {
                  return t.timestamp - e.timestamp;
                });
              },
            },
          ]),
          t
        );
      })();
    t.exports = a;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = (function () {
        function t() {
          (0, i.default)(this, t),
            (this.timestamp = 0),
            (this.timescale = 0),
            (this.size = 0),
            (this.offset = 0);
        }
        return (
          (0, o.default)(t, [
            {
              key: "relativeTimestamp",
              value: function () {
                return this.timescale
                  ? this.timestamp / this.timescale
                  : this.timestamp;
              },
            },
          ]),
          t
        );
      })();
    t.exports = a;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = (function () {
        function t() {
          (0, i.default)(this, t),
            (this.timestamp = 0),
            (this.duration = 0),
            (this.timescale = 0),
            (this.videoExtraData = null),
            (this.audioExtraData = null),
            (this.samples = []);
        }
        return (
          (0, o.default)(t, [
            {
              key: "hasVideo",
              value: function () {
                return null !== this.videoExtraData;
              },
            },
            {
              key: "hasAudio",
              value: function () {
                return null !== this.audioExtraData;
              },
            },
            {
              key: "relativeTimestamp",
              value: function () {
                return this.timescale
                  ? this.timestamp / this.timescale
                  : this.timestamp;
              },
            },
            {
              key: "relativeDuration",
              value: function () {
                return this.timescale
                  ? this.duration / this.timescale
                  : this.duration || 0;
              },
            },
          ]),
          t
        );
      })();
    t.exports = a;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = (function () {
        function t() {
          (0, i.default)(this, t);
        }
        return (
          (0, o.default)(t, [
            { key: "size", value: function () {} },
            { key: "read", value: function () {} },
          ]),
          t
        );
      })();
    t.exports = a;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          var t;
          return (
            (0, i.default)(this, n),
            ((t = e.call(this)).width = null),
            (t.height = null),
            (t.extraData = null),
            t
          );
        }
        return (
          (0, o.default)(n, [
            { key: "extraType", value: function () {} },
            {
              key: "parse",
              value: function (t) {
                var e = 24;
                for (
                  this.width = t.readUInt16BE(e),
                    e += 2,
                    this.height = t.readUInt16BE(e),
                    e += 52;
                  e < t.length - 8;

                ) {
                  var n = t.readUInt32BE(e);
                  e += 4;
                  var r = t.toString("ascii", e, e + 4);
                  if (((e += 4), 0 === n)) break;
                  if (r === this.extraType()) {
                    this.extraData = t.slice(e - 4, e + n - 4);
                    break;
                  }
                  e += n - 8;
                }
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.writeUInt16BE(1, e + 14),
                  t.writeUInt32BE(1, e + 20),
                  t.writeUInt16BE(this.width, e + 32),
                  t.writeUInt16BE(this.height, e + 34),
                  t.writeUInt32BE(72 << 16, e + 36),
                  t.writeUInt32BE(72 << 16, e + 40),
                  t.writeUInt16BE(1, e + 48),
                  t.write(f.COMPRESSOR_NAME.substring(0, 16), e + 50),
                  t.writeUInt16BE(24, e + 82),
                  t.writeUInt16BE(65535, e + 84),
                  t.writeUInt32BE(this.extraData.length + 4, e + 86),
                  t.write(this.extraType(), e + 90),
                  this.extraData.copy(t, e + 94, 4);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 90 + this.extraData.length;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = { mp4a: n(170), avcC: n(171), hvcC: n(172) },
      s = (function () {
        function t() {
          (0, i.default)(this, t);
        }
        return (
          (0, o.default)(t, null, [
            {
              key: "parse",
              value: function (t) {
                var e = t.toString("ascii", 0, 4),
                  n = a[e];
                if (n) {
                  var r = new n(t.slice(4, t.length));
                  return r.parse(), r;
                }
                throw new Error("Unknown codec name ".concat(e));
              },
            },
          ]),
          t
        );
      })();
    t.exports = s;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = (function () {
        function t() {
          (0, i.default)(this, t);
        }
        return (
          (0, o.default)(t, [
            { key: "type", value: function () {} },
            { key: "parse", value: function () {} },
            { key: "codec", value: function () {} },
          ]),
          t
        );
      })();
    t.exports = a;
  },
  function (t, e, n) {
    var r = n(94),
      i = n(95),
      o = n(96),
      a = n(97);
    (t.exports = function (t) {
      return r(t) || i(t) || o(t) || a();
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e) {
    (t.exports = function (t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    t.exports = n(99);
  },
  function (t, e, n) {
    "use strict";
    t.exports = function (t, e) {
      return function () {
        for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
          n[r] = arguments[r];
        return t.apply(e, n);
      };
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(9);
    function i(t) {
      return encodeURIComponent(t)
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]");
    }
    t.exports = function (t, e, n) {
      if (!e) return t;
      var o;
      if (n) o = n(e);
      else if (r.isURLSearchParams(e)) o = e.toString();
      else {
        var a = [];
        r.forEach(e, function (t, e) {
          null !== t &&
            "undefined" !== typeof t &&
            (r.isArray(t) ? (e += "[]") : (t = [t]),
            r.forEach(t, function (t) {
              r.isDate(t)
                ? (t = t.toISOString())
                : r.isObject(t) && (t = JSON.stringify(t)),
                a.push(i(e) + "=" + i(t));
            }));
        }),
          (o = a.join("&"));
      }
      if (o) {
        var s = t.indexOf("#");
        -1 !== s && (t = t.slice(0, s)),
          (t += (-1 === t.indexOf("?") ? "?" : "&") + o);
      }
      return t;
    };
  },
  function (t, e) {
    var n,
      r,
      i = (t.exports = {});
    function o() {
      throw new Error("setTimeout has not been defined");
    }
    function a() {
      throw new Error("clearTimeout has not been defined");
    }
    function s(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === o || !n) && setTimeout)
        return (n = setTimeout), setTimeout(t, 0);
      try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }
    !(function () {
      try {
        n = "function" === typeof setTimeout ? setTimeout : o;
      } catch (t) {
        n = o;
      }
      try {
        r = "function" === typeof clearTimeout ? clearTimeout : a;
      } catch (t) {
        r = a;
      }
    })();
    var u,
      c = [],
      l = !1,
      f = -1;
    function h() {
      l &&
        u &&
        ((l = !1), u.length ? (c = u.concat(c)) : (f = -1), c.length && d());
    }
    function d() {
      if (!l) {
        var t = s(h);
        l = !0;
        for (var e = c.length; e; ) {
          for (u = c, c = []; ++f < e; ) u && u[f].run();
          (f = -1), (e = c.length);
        }
        (u = null),
          (l = !1),
          (function (t) {
            if (r === clearTimeout) return clearTimeout(t);
            if ((r === a || !r) && clearTimeout)
              return (r = clearTimeout), clearTimeout(t);
            try {
              r(t);
            } catch (e) {
              try {
                return r.call(null, t);
              } catch (e) {
                return r.call(this, t);
              }
            }
          })(t);
      }
    }
    function p(t, e) {
      (this.fun = t), (this.array = e);
    }
    function v() {}
    (i.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      c.push(new p(t, e)), 1 !== c.length || l || s(d);
    }),
      (p.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (i.title = "browser"),
      (i.browser = !0),
      (i.env = {}),
      (i.argv = []),
      (i.version = ""),
      (i.versions = {}),
      (i.on = v),
      (i.addListener = v),
      (i.once = v),
      (i.off = v),
      (i.removeListener = v),
      (i.removeAllListeners = v),
      (i.emit = v),
      (i.prependListener = v),
      (i.prependOnceListener = v),
      (i.listeners = function (t) {
        return [];
      }),
      (i.binding = function (t) {
        throw new Error("process.binding is not supported");
      }),
      (i.cwd = function () {
        return "/";
      }),
      (i.chdir = function (t) {
        throw new Error("process.chdir is not supported");
      }),
      (i.umask = function () {
        return 0;
      });
  },
  function (t, e, n) {
    "use strict";
    t.exports = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
    };
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(9);
      t.exports = function (t, n) {
        n = n || new FormData();
        var i = [];
        function o(t) {
          return null === t
            ? ""
            : r.isDate(t)
            ? t.toISOString()
            : r.isArrayBuffer(t) || r.isTypedArray(t)
            ? "function" === typeof Blob
              ? new Blob([t])
              : e.from(t)
            : t;
        }
        return (
          (function t(e, a) {
            if (r.isPlainObject(e) || r.isArray(e)) {
              if (-1 !== i.indexOf(e))
                throw Error("Circular reference detected in " + a);
              i.push(e),
                r.forEach(e, function (e, i) {
                  if (!r.isUndefined(e)) {
                    var s,
                      u = a ? a + "." + i : i;
                    if (e && !a && "object" === typeof e)
                      if (r.endsWith(i, "{}")) e = JSON.stringify(e);
                      else if (r.endsWith(i, "[]") && (s = r.toArray(e)))
                        return void s.forEach(function (t) {
                          !r.isUndefined(t) && n.append(u, o(t));
                        });
                    t(e, u);
                  }
                }),
                i.pop();
            } else n.append(a, o(e));
          })(t),
          n
        );
      };
    }).call(this, n(3).Buffer);
  },
  function (t, e) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" === typeof window && (n = window);
    }
    t.exports = n;
  },
  function (t, e, n) {
    "use strict";
    var r = n(9),
      i = n(108),
      o = n(109),
      a = n(45),
      s = n(51),
      u = n(112),
      c = n(113),
      l = n(47),
      f = n(13),
      h = n(20),
      d = n(114);
    t.exports = function (t) {
      return new Promise(function (e, n) {
        var p,
          v = t.data,
          g = t.headers,
          m = t.responseType;
        function y() {
          t.cancelToken && t.cancelToken.unsubscribe(p),
            t.signal && t.signal.removeEventListener("abort", p);
        }
        r.isFormData(v) && r.isStandardBrowserEnv() && delete g["Content-Type"];
        var b = new XMLHttpRequest();
        if (t.auth) {
          var w = t.auth.username || "",
            S = t.auth.password
              ? unescape(encodeURIComponent(t.auth.password))
              : "";
          g.Authorization = "Basic " + btoa(w + ":" + S);
        }
        var T = s(t.baseURL, t.url);
        function x() {
          if (b) {
            var r =
                "getAllResponseHeaders" in b
                  ? u(b.getAllResponseHeaders())
                  : null,
              o = {
                data:
                  m && "text" !== m && "json" !== m
                    ? b.response
                    : b.responseText,
                status: b.status,
                statusText: b.statusText,
                headers: r,
                config: t,
                request: b,
              };
            i(
              function (t) {
                e(t), y();
              },
              function (t) {
                n(t), y();
              },
              o
            ),
              (b = null);
          }
        }
        if (
          (b.open(
            t.method.toUpperCase(),
            a(T, t.params, t.paramsSerializer),
            !0
          ),
          (b.timeout = t.timeout),
          "onloadend" in b
            ? (b.onloadend = x)
            : (b.onreadystatechange = function () {
                b &&
                  4 === b.readyState &&
                  (0 !== b.status ||
                    (b.responseURL && 0 === b.responseURL.indexOf("file:"))) &&
                  setTimeout(x);
              }),
          (b.onabort = function () {
            b &&
              (n(new f("Request aborted", f.ECONNABORTED, t, b)), (b = null));
          }),
          (b.onerror = function () {
            n(new f("Network Error", f.ERR_NETWORK, t, b, b)), (b = null);
          }),
          (b.ontimeout = function () {
            var e = t.timeout
                ? "timeout of " + t.timeout + "ms exceeded"
                : "timeout exceeded",
              r = t.transitional || l;
            t.timeoutErrorMessage && (e = t.timeoutErrorMessage),
              n(
                new f(
                  e,
                  r.clarifyTimeoutError ? f.ETIMEDOUT : f.ECONNABORTED,
                  t,
                  b
                )
              ),
              (b = null);
          }),
          r.isStandardBrowserEnv())
        ) {
          var E =
            (t.withCredentials || c(T)) && t.xsrfCookieName
              ? o.read(t.xsrfCookieName)
              : void 0;
          E && (g[t.xsrfHeaderName] = E);
        }
        "setRequestHeader" in b &&
          r.forEach(g, function (t, e) {
            "undefined" === typeof v && "content-type" === e.toLowerCase()
              ? delete g[e]
              : b.setRequestHeader(e, t);
          }),
          r.isUndefined(t.withCredentials) ||
            (b.withCredentials = !!t.withCredentials),
          m && "json" !== m && (b.responseType = t.responseType),
          "function" === typeof t.onDownloadProgress &&
            b.addEventListener("progress", t.onDownloadProgress),
          "function" === typeof t.onUploadProgress &&
            b.upload &&
            b.upload.addEventListener("progress", t.onUploadProgress),
          (t.cancelToken || t.signal) &&
            ((p = function (t) {
              b &&
                (n(!t || (t && t.type) ? new h() : t), b.abort(), (b = null));
            }),
            t.cancelToken && t.cancelToken.subscribe(p),
            t.signal &&
              (t.signal.aborted ? p() : t.signal.addEventListener("abort", p))),
          v || (v = null);
        var A = d(T);
        A && -1 === ["http", "https", "file"].indexOf(A)
          ? n(new f("Unsupported protocol " + A + ":", f.ERR_BAD_REQUEST, t))
          : b.send(v);
      });
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(110),
      i = n(111);
    t.exports = function (t, e) {
      return t && !r(e) ? i(t, e) : e;
    };
  },
  function (t, e, n) {
    "use strict";
    t.exports = function (t) {
      return !(!t || !t.__CANCEL__);
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(9);
    t.exports = function (t, e) {
      e = e || {};
      var n = {};
      function i(t, e) {
        return r.isPlainObject(t) && r.isPlainObject(e)
          ? r.merge(t, e)
          : r.isPlainObject(e)
          ? r.merge({}, e)
          : r.isArray(e)
          ? e.slice()
          : e;
      }
      function o(n) {
        return r.isUndefined(e[n])
          ? r.isUndefined(t[n])
            ? void 0
            : i(void 0, t[n])
          : i(t[n], e[n]);
      }
      function a(t) {
        if (!r.isUndefined(e[t])) return i(void 0, e[t]);
      }
      function s(n) {
        return r.isUndefined(e[n])
          ? r.isUndefined(t[n])
            ? void 0
            : i(void 0, t[n])
          : i(void 0, e[n]);
      }
      function u(n) {
        return n in e ? i(t[n], e[n]) : n in t ? i(void 0, t[n]) : void 0;
      }
      var c = {
        url: a,
        method: a,
        data: a,
        baseURL: s,
        transformRequest: s,
        transformResponse: s,
        paramsSerializer: s,
        timeout: s,
        timeoutMessage: s,
        withCredentials: s,
        adapter: s,
        responseType: s,
        xsrfCookieName: s,
        xsrfHeaderName: s,
        onUploadProgress: s,
        onDownloadProgress: s,
        decompress: s,
        maxContentLength: s,
        maxBodyLength: s,
        beforeRedirect: s,
        transport: s,
        httpAgent: s,
        httpsAgent: s,
        cancelToken: s,
        socketPath: s,
        responseEncoding: s,
        validateStatus: u,
      };
      return (
        r.forEach(Object.keys(t).concat(Object.keys(e)), function (t) {
          var e = c[t] || o,
            i = e(t);
          (r.isUndefined(i) && e !== u) || (n[t] = i);
        }),
        n
      );
    };
  },
  function (t, e) {
    t.exports = { version: "0.27.2" };
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(128);
      function i(t, e) {
        if (t === e) return 0;
        for (
          var n = t.length, r = e.length, i = 0, o = Math.min(n, r);
          i < o;
          ++i
        )
          if (t[i] !== e[i]) {
            (n = t[i]), (r = e[i]);
            break;
          }
        return n < r ? -1 : r < n ? 1 : 0;
      }
      function o(t) {
        return e.Buffer && "function" === typeof e.Buffer.isBuffer
          ? e.Buffer.isBuffer(t)
          : !(null == t || !t._isBuffer);
      }
      var a = n(129),
        s = Object.prototype.hasOwnProperty,
        u = Array.prototype.slice,
        c = "foo" === function () {}.name;
      function l(t) {
        return Object.prototype.toString.call(t);
      }
      function f(t) {
        return (
          !o(t) &&
          "function" === typeof e.ArrayBuffer &&
          ("function" === typeof ArrayBuffer.isView
            ? ArrayBuffer.isView(t)
            : !!t &&
              (t instanceof DataView ||
                !!(t.buffer && t.buffer instanceof ArrayBuffer)))
        );
      }
      var h = (t.exports = y),
        d = /\s*function\s+([^\(\s]*)\s*/;
      function p(t) {
        if (a.isFunction(t)) {
          if (c) return t.name;
          var e = t.toString().match(d);
          return e && e[1];
        }
      }
      function v(t, e) {
        return "string" === typeof t ? (t.length < e ? t : t.slice(0, e)) : t;
      }
      function g(t) {
        if (c || !a.isFunction(t)) return a.inspect(t);
        var e = p(t);
        return "[Function" + (e ? ": " + e : "") + "]";
      }
      function m(t, e, n, r, i) {
        throw new h.AssertionError({
          message: n,
          actual: t,
          expected: e,
          operator: r,
          stackStartFunction: i,
        });
      }
      function y(t, e) {
        t || m(t, !0, e, "==", h.ok);
      }
      function b(t, e, n, r) {
        if (t === e) return !0;
        if (o(t) && o(e)) return 0 === i(t, e);
        if (a.isDate(t) && a.isDate(e)) return t.getTime() === e.getTime();
        if (a.isRegExp(t) && a.isRegExp(e))
          return (
            t.source === e.source &&
            t.global === e.global &&
            t.multiline === e.multiline &&
            t.lastIndex === e.lastIndex &&
            t.ignoreCase === e.ignoreCase
          );
        if (
          (null !== t && "object" === typeof t) ||
          (null !== e && "object" === typeof e)
        ) {
          if (
            f(t) &&
            f(e) &&
            l(t) === l(e) &&
            !(t instanceof Float32Array || t instanceof Float64Array)
          )
            return 0 === i(new Uint8Array(t.buffer), new Uint8Array(e.buffer));
          if (o(t) !== o(e)) return !1;
          var s = (r = r || { actual: [], expected: [] }).actual.indexOf(t);
          return (
            (-1 !== s && s === r.expected.indexOf(e)) ||
            (r.actual.push(t),
            r.expected.push(e),
            (function (t, e, n, r) {
              if (null === t || void 0 === t || null === e || void 0 === e)
                return !1;
              if (a.isPrimitive(t) || a.isPrimitive(e)) return t === e;
              if (n && Object.getPrototypeOf(t) !== Object.getPrototypeOf(e))
                return !1;
              var i = w(t),
                o = w(e);
              if ((i && !o) || (!i && o)) return !1;
              if (i) return (t = u.call(t)), (e = u.call(e)), b(t, e, n);
              var s,
                c,
                l = x(t),
                f = x(e);
              if (l.length !== f.length) return !1;
              for (l.sort(), f.sort(), c = l.length - 1; c >= 0; c--)
                if (l[c] !== f[c]) return !1;
              for (c = l.length - 1; c >= 0; c--)
                if (((s = l[c]), !b(t[s], e[s], n, r))) return !1;
              return !0;
            })(t, e, n, r))
          );
        }
        return n ? t === e : t == e;
      }
      function w(t) {
        return "[object Arguments]" == Object.prototype.toString.call(t);
      }
      function S(t, e) {
        if (!t || !e) return !1;
        if ("[object RegExp]" == Object.prototype.toString.call(e))
          return e.test(t);
        try {
          if (t instanceof e) return !0;
        } catch (t) {}
        return !Error.isPrototypeOf(e) && !0 === e.call({}, t);
      }
      function T(t, e, n, r) {
        var i;
        if ("function" !== typeof e)
          throw new TypeError('"block" argument must be a function');
        "string" === typeof n && ((r = n), (n = null)),
          (i = (function (t) {
            var e;
            try {
              t();
            } catch (t) {
              e = t;
            }
            return e;
          })(e)),
          (r =
            (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : ".")),
          t && !i && m(i, n, "Missing expected exception" + r);
        var o = "string" === typeof r,
          s = !t && i && !n;
        if (
          (((!t && a.isError(i) && o && S(i, n)) || s) &&
            m(i, n, "Got unwanted exception" + r),
          (t && i && n && !S(i, n)) || (!t && i))
        )
          throw i;
      }
      (h.AssertionError = function (t) {
        var e;
        (this.name = "AssertionError"),
          (this.actual = t.actual),
          (this.expected = t.expected),
          (this.operator = t.operator),
          t.message
            ? ((this.message = t.message), (this.generatedMessage = !1))
            : ((this.message =
                v(g((e = this).actual), 128) +
                " " +
                e.operator +
                " " +
                v(g(e.expected), 128)),
              (this.generatedMessage = !0));
        var n = t.stackStartFunction || m;
        if (Error.captureStackTrace) Error.captureStackTrace(this, n);
        else {
          var r = new Error();
          if (r.stack) {
            var i = r.stack,
              o = p(n),
              a = i.indexOf("\n" + o);
            if (a >= 0) {
              var s = i.indexOf("\n", a + 1);
              i = i.substring(s + 1);
            }
            this.stack = i;
          }
        }
      }),
        a.inherits(h.AssertionError, Error),
        (h.fail = m),
        (h.ok = y),
        (h.equal = function (t, e, n) {
          t != e && m(t, e, n, "==", h.equal);
        }),
        (h.notEqual = function (t, e, n) {
          t == e && m(t, e, n, "!=", h.notEqual);
        }),
        (h.deepEqual = function (t, e, n) {
          b(t, e, !1) || m(t, e, n, "deepEqual", h.deepEqual);
        }),
        (h.deepStrictEqual = function (t, e, n) {
          b(t, e, !0) || m(t, e, n, "deepStrictEqual", h.deepStrictEqual);
        }),
        (h.notDeepEqual = function (t, e, n) {
          b(t, e, !1) && m(t, e, n, "notDeepEqual", h.notDeepEqual);
        }),
        (h.notDeepStrictEqual = function t(e, n, r) {
          b(e, n, !0) && m(e, n, r, "notDeepStrictEqual", t);
        }),
        (h.strictEqual = function (t, e, n) {
          t !== e && m(t, e, n, "===", h.strictEqual);
        }),
        (h.notStrictEqual = function (t, e, n) {
          t === e && m(t, e, n, "!==", h.notStrictEqual);
        }),
        (h.throws = function (t, e, n) {
          T(!0, t, e, n);
        }),
        (h.doesNotThrow = function (t, e, n) {
          T(!1, t, e, n);
        }),
        (h.ifError = function (t) {
          if (t) throw t;
        }),
        (h.strict = r(
          function t(e, n) {
            e || m(e, !0, n, "==", t);
          },
          h,
          {
            equal: h.strictEqual,
            deepEqual: h.deepStrictEqual,
            notEqual: h.notStrictEqual,
            notDeepEqual: h.notDeepStrictEqual,
          }
        )),
        (h.strict.strict = h.strict);
      var x =
        Object.keys ||
        function (t) {
          var e = [];
          for (var n in t) s.call(t, n) && e.push(n);
          return e;
        };
    }).call(this, n(49));
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.EventManager = void 0);
    var r = {
      events: new WeakMap(),
      on: function (t, e, n) {
        if (t && e) {
          var r = e.split("."),
            i = {};
          return (
            (i.fullType = e),
            (i.type = r[0]),
            (i.fn = n),
            this.events.has(t)
              ? this.events.get(t).push(i)
              : this.events.set(t, [i]),
            t.addEventListener(r[0], i.fn),
            this
          );
        }
      },
      off: function (t, e) {
        if (!t) return this;
        var n = this.events.get(t) || [];
        if (!e) {
          for (var r = 0; r < n.length; r++)
            t.removeEventListener(n[r].type, n[r].fn);
          return this.events.set(t, []), this;
        }
        var i = e.split(".");
        if (2 !== i.length) {
          for (var o = [], a = 0; a < n.length; a++)
            (u = n[a]).type === i[0]
              ? t.removeEventListener(u.type, u.fn)
              : o.push(u);
          return this.events.set(t, o), this;
        }
        for (var s = 0; s < n.length; s++) {
          var u = n[s];
          if (u.fullType === e)
            return (
              t.removeEventListener(u.type, u.fn),
              this.events.get(t).splice(s, 1),
              this
            );
        }
        return this;
      },
      trigger: function (t, e) {
        if (!t || !e) return this;
        var n = e.split("."),
          r = new Event(n[0]);
        return window.dispatchEvent(r), this;
      },
    };
    e.EventManager = r;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = r(n(12));
    if ("undefined" == typeof o) var o = {};
    o.MD5 = function (t) {
      function e(t) {
        var e = (t >>> 0).toString(16);
        return "00000000".substr(0, 8 - e.length) + e;
      }
      function n(t, e, n) {
        return (t & e) | (~t & n);
      }
      function r(t, e, n) {
        return (n & t) | (~n & e);
      }
      function o(t, e, n) {
        return t ^ e ^ n;
      }
      function a(t, e, n) {
        return e ^ (t | ~n);
      }
      function s(t, e) {
        return (t[e + 3] << 24) | (t[e + 2] << 16) | (t[e + 1] << 8) | t[e];
      }
      function u(t) {
        for (var e = [], n = 0; n < t.length; n++)
          if (t.charCodeAt(n) <= 127) e.push(t.charCodeAt(n));
          else
            for (
              var r = encodeURIComponent(t.charAt(n)).substr(1).split("%"),
                i = 0;
              i < r.length;
              i++
            )
              e.push(parseInt(r[i], 16));
        return e;
      }
      function c(t) {
        for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = t[n];
        return e;
      }
      var l = null,
        f = null;
      function h(t, e) {
        return 4294967295 & (t + e);
      }
      return (
        "string" == typeof t
          ? (l = u(t))
          : t.constructor == Array
          ? 0 === t.length
            ? (l = t)
            : "string" == typeof t[0]
            ? (l = (function (t) {
                for (var e = [], n = 0; n < t.length; n++)
                  e = e.concat(u(t[n]));
                return e;
              })(t))
            : "number" == typeof t[0]
            ? (l = t)
            : (f = (0, i.default)(t[0]))
          : "undefined" != typeof ArrayBuffer
          ? t instanceof ArrayBuffer
            ? (l = c(new Uint8Array(t)))
            : t instanceof Uint8Array || t instanceof Int8Array
            ? (l = c(t))
            : t instanceof Uint32Array ||
              t instanceof Int32Array ||
              t instanceof Uint16Array ||
              t instanceof Int16Array ||
              t instanceof Float32Array ||
              t instanceof Float64Array
            ? (l = c(new Uint8Array(t.buffer)))
            : (f = (0, i.default)(t))
          : (f = (0, i.default)(t)),
        f && alert("MD5 type mismatch, cannot process " + f),
        (function () {
          function t(t, e, n, r) {
            var i,
              o,
              a = b;
            (b = y),
              (y = m),
              (m = h(
                m,
                (((i = h(g, h(t, h(e, n)))) << (o = r)) & 4294967295) |
                  (i >>> (32 - o))
              )),
              (g = a);
          }
          var i = l.length;
          l.push(128);
          var u = l.length % 64;
          if (u > 56) {
            for (var c = 0; c < 64 - u; c++) l.push(0);
            u = l.length % 64;
          }
          for (c = 0; c < 56 - u; c++) l.push(0);
          l = l.concat(
            (function (t) {
              for (var e = [], n = 0; n < 8; n++) e.push(255 & t), (t >>>= 8);
              return e;
            })(8 * i)
          );
          var f = 1732584193,
            d = 4023233417,
            p = 2562383102,
            v = 271733878,
            g = 0,
            m = 0,
            y = 0,
            b = 0;
          for (c = 0; c < l.length / 64; c++) {
            g = f;
            var w = 64 * c;
            t(n((m = d), (y = p), (b = v)), 3614090360, s(l, w), 7),
              t(n(m, y, b), 3905402710, s(l, w + 4), 12),
              t(n(m, y, b), 606105819, s(l, w + 8), 17),
              t(n(m, y, b), 3250441966, s(l, w + 12), 22),
              t(n(m, y, b), 4118548399, s(l, w + 16), 7),
              t(n(m, y, b), 1200080426, s(l, w + 20), 12),
              t(n(m, y, b), 2821735955, s(l, w + 24), 17),
              t(n(m, y, b), 4249261313, s(l, w + 28), 22),
              t(n(m, y, b), 1770035416, s(l, w + 32), 7),
              t(n(m, y, b), 2336552879, s(l, w + 36), 12),
              t(n(m, y, b), 4294925233, s(l, w + 40), 17),
              t(n(m, y, b), 2304563134, s(l, w + 44), 22),
              t(n(m, y, b), 1804603682, s(l, w + 48), 7),
              t(n(m, y, b), 4254626195, s(l, w + 52), 12),
              t(n(m, y, b), 2792965006, s(l, w + 56), 17),
              t(n(m, y, b), 1236535329, s(l, w + 60), 22),
              t(r(m, y, b), 4129170786, s(l, w + 4), 5),
              t(r(m, y, b), 3225465664, s(l, w + 24), 9),
              t(r(m, y, b), 643717713, s(l, w + 44), 14),
              t(r(m, y, b), 3921069994, s(l, w), 20),
              t(r(m, y, b), 3593408605, s(l, w + 20), 5),
              t(r(m, y, b), 38016083, s(l, w + 40), 9),
              t(r(m, y, b), 3634488961, s(l, w + 60), 14),
              t(r(m, y, b), 3889429448, s(l, w + 16), 20),
              t(r(m, y, b), 568446438, s(l, w + 36), 5),
              t(r(m, y, b), 3275163606, s(l, w + 56), 9),
              t(r(m, y, b), 4107603335, s(l, w + 12), 14),
              t(r(m, y, b), 1163531501, s(l, w + 32), 20),
              t(r(m, y, b), 2850285829, s(l, w + 52), 5),
              t(r(m, y, b), 4243563512, s(l, w + 8), 9),
              t(r(m, y, b), 1735328473, s(l, w + 28), 14),
              t(r(m, y, b), 2368359562, s(l, w + 48), 20),
              t(o(m, y, b), 4294588738, s(l, w + 20), 4),
              t(o(m, y, b), 2272392833, s(l, w + 32), 11),
              t(o(m, y, b), 1839030562, s(l, w + 44), 16),
              t(o(m, y, b), 4259657740, s(l, w + 56), 23),
              t(o(m, y, b), 2763975236, s(l, w + 4), 4),
              t(o(m, y, b), 1272893353, s(l, w + 16), 11),
              t(o(m, y, b), 4139469664, s(l, w + 28), 16),
              t(o(m, y, b), 3200236656, s(l, w + 40), 23),
              t(o(m, y, b), 681279174, s(l, w + 52), 4),
              t(o(m, y, b), 3936430074, s(l, w), 11),
              t(o(m, y, b), 3572445317, s(l, w + 12), 16),
              t(o(m, y, b), 76029189, s(l, w + 24), 23),
              t(o(m, y, b), 3654602809, s(l, w + 36), 4),
              t(o(m, y, b), 3873151461, s(l, w + 48), 11),
              t(o(m, y, b), 530742520, s(l, w + 60), 16),
              t(o(m, y, b), 3299628645, s(l, w + 8), 23),
              t(a(m, y, b), 4096336452, s(l, w), 6),
              t(a(m, y, b), 1126891415, s(l, w + 28), 10),
              t(a(m, y, b), 2878612391, s(l, w + 56), 15),
              t(a(m, y, b), 4237533241, s(l, w + 20), 21),
              t(a(m, y, b), 1700485571, s(l, w + 48), 6),
              t(a(m, y, b), 2399980690, s(l, w + 12), 10),
              t(a(m, y, b), 4293915773, s(l, w + 40), 15),
              t(a(m, y, b), 2240044497, s(l, w + 4), 21),
              t(a(m, y, b), 1873313359, s(l, w + 32), 6),
              t(a(m, y, b), 4264355552, s(l, w + 60), 10),
              t(a(m, y, b), 2734768916, s(l, w + 24), 15),
              t(a(m, y, b), 1309151649, s(l, w + 52), 21),
              t(a(m, y, b), 4149444226, s(l, w + 16), 6),
              t(a(m, y, b), 3174756917, s(l, w + 44), 10),
              t(a(m, y, b), 718787259, s(l, w + 8), 15),
              t(a(m, y, b), 3951481745, s(l, w + 36), 21),
              (f = h(f, g)),
              (d = h(d, m)),
              (p = h(p, y)),
              (v = h(v, b));
          }
          return (function (t, n, r, i) {
            for (var o = "", a = 0, s = 0, u = 3; u >= 0; u--)
              (a = 255 & (s = arguments[u])),
                (a <<= 8),
                (a |= 255 & (s >>>= 8)),
                (a <<= 8),
                (a |= 255 & (s >>>= 8)),
                (a <<= 8),
                (o += e((a |= s >>>= 8)));
            return o;
          })(v, p, d, f).toUpperCase();
        })()
      );
    };
    var a = function (t) {
      return o.MD5(t);
    };
    e.default = a;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.YUVWebGLCanvas = e.WebGLCanvas = e.ImageWebGLCanvas = void 0);
    var r = n(11),
      i = n(143),
      o = (function () {
        function t(t, e, n) {
          r.Texture.call(this, t, e, n);
        }
        return (
          (t.prototype = c(r.Texture, {
            fill: function (t, e) {
              var n = this.gl;
              n.bindTexture(n.TEXTURE_2D, this.texture),
                e
                  ? n.texSubImage2D(
                      n.TEXTURE_2D,
                      0,
                      0,
                      0,
                      this.size.w,
                      this.size.h,
                      this.format,
                      n.UNSIGNED_BYTE,
                      t
                    )
                  : n.texImage2D(
                      n.TEXTURE_2D,
                      0,
                      this.format,
                      this.format,
                      n.UNSIGNED_BYTE,
                      t
                    );
            },
          })),
          t
        );
      })(),
      a = (function () {
        var t = r.Script.createFromSource(
            "x-shader/x-vertex",
            l([
              "attribute vec3 aVertexPosition;",
              "attribute vec2 aTextureCoord;",
              "uniform mat4 uMVMatrix;",
              "uniform mat4 uPMatrix;",
              "varying highp vec2 vTextureCoord;",
              "void main(void) {",
              "  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
              "  vTextureCoord = aTextureCoord;",
              "}",
            ])
          ),
          e = r.Script.createFromSource(
            "x-shader/x-fragment",
            l([
              "precision highp float;",
              "varying highp vec2 vTextureCoord;",
              "uniform sampler2D texture;",
              "void main(void) {",
              "  gl_FragColor = texture2D(texture, vTextureCoord);",
              "}",
            ])
          ),
          n = [192, 368, 608, 1088, 1472, 1952, 3008];
        function o(t, e, o) {
          (this.canvas = t), (this.size = e);
          var c = !0;
          for (var l in n) e.w === n[l] && (c = !1);
          c
            ? (this.canvas.width = e.w)
            : 192 === e.w
            ? (this.canvas.width = e.w - 12)
            : (this.canvas.width = e.w - 8),
            (this.canvas.height = e.h),
            this.onInitWebGL(),
            this.onInitShaders(),
            function () {
              var t = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0],
                e = this.gl;
              (this.quadVPBuffer = e.createBuffer()),
                e.bindBuffer(e.ARRAY_BUFFER, this.quadVPBuffer),
                e.bufferData(
                  e.ARRAY_BUFFER,
                  new Float32Array(t),
                  e.STATIC_DRAW
                ),
                (this.quadVPBuffer.itemSize = 3),
                (this.quadVPBuffer.numItems = 4);
              (this.quadVTCBuffer = e.createBuffer()),
                e.bindBuffer(e.ARRAY_BUFFER, this.quadVTCBuffer),
                (t = [1, 0, 0, 0, 1, 1, 0, 1]),
                e.bufferData(
                  e.ARRAY_BUFFER,
                  new Float32Array(t),
                  e.STATIC_DRAW
                );
            }.call(this),
            o &&
              function () {
                var t = this.gl;
                (this.framebuffer = t.createFramebuffer()),
                  t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer),
                  (this.framebufferTexture = new r.Texture(
                    this.gl,
                    this.size,
                    t.RGBA
                  ));
                var e = t.createRenderbuffer();
                t.bindRenderbuffer(t.RENDERBUFFER, e),
                  t.renderbufferStorage(
                    t.RENDERBUFFER,
                    t.DEPTH_COMPONENT16,
                    this.size.w,
                    this.size.h
                  ),
                  t.framebufferTexture2D(
                    t.FRAMEBUFFER,
                    t.COLOR_ATTACHMENT0,
                    t.TEXTURE_2D,
                    this.framebufferTexture.texture,
                    0
                  ),
                  t.framebufferRenderbuffer(
                    t.FRAMEBUFFER,
                    t.DEPTH_ATTACHMENT,
                    t.RENDERBUFFER,
                    e
                  );
              }.call(this),
            this.onInitTextures(),
            function () {
              var t = this.gl;
              (this.perspectiveMatrix = (function (t, e, n, r) {
                var o = n * Math.tan((t * Math.PI) / 360),
                  a = -o;
                return (function (t, e, n, r, o, a) {
                  var s = (2 * o) / (e - t),
                    u = (2 * o) / (r - n),
                    c = (e + t) / (e - t),
                    l = (r + n) / (r - n),
                    f = -(a + o) / (a - o),
                    h = (-2 * a * o) / (a - o);
                  return (0, i.$M)([
                    [s, 0, c, 0],
                    [0, u, l, 0],
                    [0, 0, f, h],
                    [0, 0, -1, 0],
                  ]);
                })(a * e, o * e, a, o, n, r);
              })(45, 1, 0.1, 100)),
                a.call(this),
                s.call(this, [0, 0, -2.415]),
                t.bindBuffer(t.ARRAY_BUFFER, this.quadVPBuffer),
                t.vertexAttribPointer(
                  this.vertexPositionAttribute,
                  3,
                  t.FLOAT,
                  !1,
                  0,
                  0
                ),
                t.bindBuffer(t.ARRAY_BUFFER, this.quadVTCBuffer),
                t.vertexAttribPointer(
                  this.textureCoordAttribute,
                  2,
                  t.FLOAT,
                  !1,
                  0,
                  0
                ),
                this.onInitSceneTextures(),
                u.call(this),
                this.framebuffer &&
                  t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer);
            }.call(this);
        }
        function a() {
          this.mvMatrix = i.Matrix.I(4);
        }
        function s(t) {
          (function (t) {
            this.mvMatrix = this.mvMatrix.x(t);
          }).call(
            this,
            i.Matrix.Translation((0, i.$V)([t[0], t[1], t[2]])).ensure4x4()
          );
        }
        function u() {
          this.program.setMatrixUniform(
            "uPMatrix",
            new Float32Array(this.perspectiveMatrix.flatten())
          ),
            this.program.setMatrixUniform(
              "uMVMatrix",
              new Float32Array(this.mvMatrix.flatten())
            );
        }
        return (
          (o.prototype = {
            toString: function () {
              return "WebGLCanvas Size: " + this.size;
            },
            checkLastError: function (t) {
              var e = this.gl.getError();
              if (e !== this.gl.NO_ERROR) {
                var n = this.glNames[e];
                (n =
                  "undefined" !== typeof n
                    ? n + "(" + e + ")"
                    : "Unknown WebGL ENUM (0x" + e.toString(16) + ")"),
                  t
                    ? r.debug.log("WebGL Error: %s, %s", t, n)
                    : r.debug.log("WebGL Error: %s", n),
                  r.debug.trace();
              }
            },
            onInitWebGL: function () {
              try {
                this.gl = this.canvas.getContext("experimental-webgl");
              } catch (t) {
                r.debug.log("inInitWebGL error = " + t);
              }
              if (
                (this.gl ||
                  r.debug.error(
                    "Unable to initialize WebGL. Your browser may not support it."
                  ),
                !this.glNames)
              )
                for (var t in ((this.glNames = {}), this.gl))
                  "number" === typeof this.gl[t] &&
                    (this.glNames[this.gl[t]] = t);
            },
            onInitShaders: function () {
              (this.program = new r.Program(this.gl)),
                this.program.attach(new r.Shader(this.gl, t)),
                this.program.attach(new r.Shader(this.gl, e)),
                this.program.link(),
                this.program.use(),
                (this.vertexPositionAttribute =
                  this.program.getAttributeLocation("aVertexPosition")),
                this.gl.enableVertexAttribArray(this.vertexPositionAttribute),
                (this.textureCoordAttribute =
                  this.program.getAttributeLocation("aTextureCoord")),
                this.gl.enableVertexAttribArray(this.textureCoordAttribute);
            },
            onInitTextures: function () {
              var t = this.gl;
              t.viewport(0, 0, this.canvas.width, this.canvas.height),
                (this.texture = new r.Texture(t, this.size, t.RGBA));
            },
            onInitSceneTextures: function () {
              this.texture.bind(0, this.program, "texture");
            },
            drawScene: function () {
              this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
            },
            updateVertexArray: function (t) {
              this.zoomScene(t);
            },
            readPixels: function (t) {
              var e = this.gl;
              e.readPixels(
                0,
                0,
                this.size.w,
                this.size.h,
                e.RGBA,
                e.UNSIGNED_BYTE,
                t
              );
            },
            zoomScene: function (t) {
              a.call(this),
                s.call(this, [t[0], t[1], t[2]]),
                u.call(this),
                this.drawScene();
            },
            setViewport: function (t, e) {
              var n, i;
              r.debug.log("toWidth=" + t + ",toHeight=" + e),
                this.gl.drawingBufferWidth < t ||
                this.gl.drawingBufferHeight < e
                  ? ((n = this.gl.drawingBufferWidth),
                    (i = this.gl.drawingBufferHeight),
                    (this.canvas.width = n),
                    (this.canvas.height = i))
                  : ((n = t), (i = e)),
                this.gl.viewport(0, 0, n, i);
            },
            clearCanvas: function () {
              this.gl.clearColor(0, 0, 0, 1),
                this.gl.clear(
                  this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT
                );
            },
          }),
          o
        );
      })();
    e.WebGLCanvas = a;
    var s = (function () {
      function t(t, e) {
        a.call(this, t, e);
      }
      return (
        (t.prototype = c(a, {
          drawCanvas: function (t) {
            this.texture.fill(t), this.drawScene();
          },
          onInitTextures: function () {
            var t = this.gl;
            this.setViewport(this.canvas.width, this.canvas.height),
              (this.texture = new o(t, this.size, t.RGBA));
          },
          initCanvas: function () {
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
          },
        })),
        t
      );
    })();
    e.ImageWebGLCanvas = s;
    var u = (function () {
      var t = r.Script.createFromSource(
          "x-shader/x-vertex",
          l([
            "attribute vec3 aVertexPosition;",
            "attribute vec2 aTextureCoord;",
            "uniform mat4 uMVMatrix;",
            "uniform mat4 uPMatrix;",
            "varying highp vec2 vTextureCoord;",
            "void main(void) {",
            "  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
            "  vTextureCoord = aTextureCoord;",
            "}",
          ])
        ),
        e = r.Script.createFromSource(
          "x-shader/x-fragment",
          l([
            "precision highp float;",
            "varying highp vec2 vTextureCoord;",
            "uniform sampler2D YTexture;",
            "uniform sampler2D UTexture;",
            "uniform sampler2D VTexture;",
            "const mat4 YUV2RGB = mat4",
            "(",
            " 1.16438, 0.00000, 1.59603, -.87079,",
            " 1.16438, -.39176, -.81297, .52959,",
            " 1.16438, 2.01723, 0, -1.08139,",
            " 0, 0, 0, 1",
            ");",
            "void main(void) {",
            " gl_FragColor = vec4( texture2D(YTexture,  vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;",
            "}",
          ])
        );
      function n(t, e) {
        a.call(this, t, e);
      }
      return (
        (n.prototype = c(a, {
          onInitShaders: function () {
            (this.program = new r.Program(this.gl)),
              this.program.attach(new r.Shader(this.gl, t)),
              this.program.attach(new r.Shader(this.gl, e)),
              this.program.link(),
              this.program.use(),
              (this.vertexPositionAttribute =
                this.program.getAttributeLocation("aVertexPosition")),
              this.gl.enableVertexAttribArray(this.vertexPositionAttribute),
              (this.textureCoordAttribute =
                this.program.getAttributeLocation("aTextureCoord")),
              this.gl.enableVertexAttribArray(this.textureCoordAttribute);
          },
          onInitTextures: function () {
            this.setViewport(this.size.w, this.size.h),
              (this.YTexture = new r.Texture(this.gl, this.size)),
              (this.UTexture = new r.Texture(this.gl, this.size.getHalfSize())),
              (this.VTexture = new r.Texture(this.gl, this.size.getHalfSize()));
          },
          onInitSceneTextures: function () {
            this.YTexture.bind(0, this.program, "YTexture"),
              this.UTexture.bind(1, this.program, "UTexture"),
              this.VTexture.bind(2, this.program, "VTexture");
          },
          fillYUVTextures: function (t, e, n) {
            this.YTexture.fill(t),
              this.UTexture.fill(e),
              this.VTexture.fill(n),
              this.drawScene();
          },
          drawCanvas: function (t, e) {
            var n = new Uint8Array(t.buffer, t.byteOffset, e.ylen * e.height),
              r = new Uint8Array(
                t.buffer,
                t.byteOffset + e.ylen * e.height,
                (e.ylen * e.height) / 4
              ),
              i = new Uint8Array(
                t.buffer,
                t.byteOffset + e.ylen * e.height * 1.25,
                (e.ylen * e.height) / 4
              );
            this.YTexture.fill(n),
              this.UTexture.fill(r),
              this.VTexture.fill(i),
              this.drawScene();
          },
          updateVertexArray: function (t) {
            this.zoomScene(t);
          },
          toString: function () {
            return "YUVCanvas Size: " + this.size;
          },
          initCanvas: function () {
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
          },
        })),
        n
      );
    })();
    function c(t, e) {
      for (
        var n = Object.create(t.prototype), r = Object.keys(e), i = 0;
        i < r.length;
        i++
      )
        n[r[i]] = e[r[i]];
      return n;
    }
    function l(t) {
      return t.join("\n");
    }
    e.YUVWebGLCanvas = u;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = r(n(1)),
      o = r(n(2)),
      a = r(n(156)),
      s = n(157),
      u = (function () {
        function t() {
          (0, i.default)(this, t),
            (this.CodecCallback = function () {}),
            (this.TrackCallback = function () {});
        }
        return (
          (0, o.default)(t, [
            {
              key: "init",
              value: function (t) {
                (this.MovieBuffer = new Uint8Array(0)),
                  (this.currentFrame = 0),
                  (this.currentDeleteLen = 0),
                  (this.length = 0),
                  (this.position = 0),
                  (this.isMoov = 0),
                  (this.isSeek = !1),
                  (this.track = this.concatArray(
                    t.tracks[0].samples,
                    t.tracks[1].samples
                  )),
                  (this.VideoCodec = this.getCodec(t.tracks[0].codec)),
                  (this.AudioCodec = this.getCodec(t.tracks[1].codec)),
                  (this.Framerate = this.getFPS(t.tracks[0].samples)),
                  (this.clockFreq = t.tracks[1].samples[0].timescale),
                  (this.AudioCodecInfo = {
                    config: "1408",
                    clockFreq: this.clockFreq,
                    bitrate: void 0,
                  }),
                  (this.packetDHAV = new a.default(
                    0,
                    this.VideoCodec,
                    this.AudioCodec
                  )),
                  this.CodecCallback({
                    VideoCodec: this.VideoCodec,
                    AudioCodec: this.AudioCodec,
                    Framerate: this.Framerate,
                    AudioCodecInfo: this.AudioCodecInfo,
                  });
              },
            },
            {
              key: "setMovieData",
              value: function (t) {
                var e = t.subarray(0, 20);
                if (
                  ((this.isMoov = e[8]),
                  (t = t.subarray(20, t.length)),
                  this.isMoov)
                ) {
                  var n = s.MovieParser.parse(t);
                  n && this.init(n);
                } else
                  (this.length =
                    ((e[7] << 24) | (e[6] << 16) | (e[5] << 8) | e[4]) - 20),
                    (this.position =
                      (e[15] << 48) |
                      (e[14] << 40) |
                      (e[13] << 32) |
                      (e[12] << 24) |
                      (e[11] << 16) |
                      (e[10] << 8) |
                      e[9]),
                    this.currentDeleteLen + this.MovieBuffer.length <
                      this.position &&
                      ((this.isSeek = !0),
                      (this.currentDeleteLen = this.position),
                      (this.currentFrame = this.getCurrentSeekFrame()),
                      (this.MovieBuffer = new Uint8Array(0))),
                    (this.MovieBuffer = this.concatUint8Array(
                      this.MovieBuffer,
                      new Uint8Array(t)
                    )),
                    this.getFrameData();
              },
            },
            {
              key: "getFrameData",
              value: function () {
                var t = this.track[this.currentFrame];
                if (
                  this.MovieBuffer.length + this.currentDeleteLen >=
                  t.offset + t.size
                ) {
                  var e = null;
                  if (t instanceof s.VideoSample) {
                    var n = this.set_nal_unit_type(
                      this.MovieBuffer.subarray(
                        t.offset - this.currentDeleteLen,
                        t.offset + t.size - this.currentDeleteLen
                      )
                    );
                    e = this.packetDHAV.getRTPPacket(n, t);
                  } else
                    e = this.packetDHAV.getRTPPacket(
                      this.MovieBuffer.subarray(
                        t.offset - this.currentDeleteLen,
                        t.offset + t.size - this.currentDeleteLen
                      ),
                      t
                    );
                  ((this.isSeek && t.keyframe) || !this.isSeek) &&
                    (this.TrackCallback(e), (this.isSeek = !1)),
                    (this.MovieBuffer = this.MovieBuffer.subarray(
                      t.offset + t.size - this.currentDeleteLen,
                      this.MovieBuffer.length
                    )),
                    (this.currentDeleteLen = t.offset + t.size),
                    this.currentFrame++,
                    this.currentFrame < this.track.length &&
                      this.getFrameData();
                }
              },
            },
            {
              key: "getCurrentSeekFrame",
              value: function () {
                var t = 0,
                  e = this.track.length - 1,
                  n = this.position;
                if (this.track[0].offset >= n) return 0;
                for (; t <= e; ) {
                  var r = parseInt((e + t) / 2),
                    i = this.track[r];
                  if (n === i.offset) return r;
                  if (n > i.offset) {
                    if (n < i.offset + i.size) return r + 1;
                    t = r + 1;
                  } else {
                    if (!(n < i.offset)) return -1;
                    e = r - 1;
                  }
                }
              },
            },
            {
              key: "set_nal_unit_type",
              value: function () {
                for (
                  var t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : new Uint8Array(),
                    e = 0,
                    n = 0,
                    r = function (e, n) {
                      var r = "";
                      return (
                        t.slice(e, n).map(function (t) {
                          return (r +=
                            1 === t.toString(16).length
                              ? "0" + t.toString(16)
                              : t.toString(16));
                        }),
                        parseInt(r, 16)
                      );
                    };
                  t.length > 4 && n < t.length;

                )
                  (e = r(n, n + 4)), t.set([0, 0, 0, 1], n), (n = n + e + 4);
                return t;
              },
            },
            {
              key: "concatUint8Array",
              value: function () {
                for (
                  var t = 0, e = arguments.length, n = new Array(e), r = 0;
                  r < e;
                  r++
                )
                  n[r] = arguments[r];
                for (var i = 0, o = n; i < o.length; i++) {
                  t += o[i].length;
                }
                for (
                  var a = new Uint8Array(t), s = 0, u = 0, c = n;
                  u < c.length;
                  u++
                ) {
                  var l = c[u];
                  a.set(l, s), (s += l.length);
                }
                return a;
              },
            },
            {
              key: "concatArray",
              value: function (t, e) {
                return t.concat(e).sort(function (t, e) {
                  return t.offset - e.offset;
                });
              },
            },
            {
              key: "getCodec",
              value: function (t) {
                var e = "";
                return (
                  /hvc1/g.test(t) && (e = "H265"),
                  /avc1/g.test(t) && (e = "H264"),
                  /mp4a/g.test(t) && (e = "mpeg4-generic"),
                  e
                );
              },
            },
            {
              key: "getFPS",
              value: function (t) {
                for (
                  var e = 60, n = 0, r = t.length >= 60 ? 60 : t.length;
                  n < r;
                  n++
                )
                  if (
                    t[n].timestamp <= t[n].timescale &&
                    t[n + 1].timestamp > t[n].timescale
                  ) {
                    e = n;
                    break;
                  }
                return e;
              },
            },
            {
              key: "parseToString",
              value: function (t) {
                for (var e = "", n = 0, r = t.length; n < r; n++)
                  e +=
                    (1 === t[n].toString(16).length
                      ? "0" + t[n].toString(16)
                      : t[n].toString(16)) +
                    ((n + 1) % 16 === 0
                      ? "\n"
                      : (n + 1) % 8 === 0
                      ? "  "
                      : " ");
                return e;
              },
            },
          ]),
          t
        );
      })();
    e.default = u;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = n(8),
      s = n(169),
      u = (function () {
        function t() {
          (0, i.default)(this, t);
        }
        return (
          (0, o.default)(t, null, [
            {
              key: "parse",
              value: function (t) {
                return new s(t).parse();
              },
            },
            {
              key: "check",
              value: function (t) {
                return (
                  t.readUInt32BE(0) > 0 &&
                  -1 !==
                    [a.ATOM_FTYP, a.ATOM_MOOV, a.ATOM_MDAT].indexOf(
                      t.toString("ascii", 4, 8)
                    )
                );
              },
            },
          ]),
          t
        );
      })();
    t.exports = u;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(38),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_AVC1;
              },
            },
            {
              key: "extraType",
              value: function () {
                return f.ATOM_AVCC;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(18),
      h = n(8),
      d = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          var t;
          return (0, i.default)(this, n), ((t = e.call(this)).entries = []), t;
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return h.ATOM_CO64;
              },
            },
            {
              key: "parse",
              value: function (t) {
                var e = t.readUInt32BE(4);
                this.entries = new Array(e);
                for (var n = 0; n < e; n++)
                  this.entries[n] = f.readUInt64BE(t, 8 + 8 * n);
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.writeUInt32BE(this.entries.length, e + 12);
                for (var n = 0, r = this.entries.length; n < r; n++)
                  f.writeUInt64BE(t, this.entries[n], e + 16 + 8 * n);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 16 + 8 * this.entries.length;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = d;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(19),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_CTTS;
              },
            },
            {
              key: "countMultiplier",
              value: function () {
                return 2;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
        i = r(n(1)),
        o = r(n(2)),
        a = r(n(5)),
        s = r(n(6)),
        u = r(n(4));
      function c(t) {
        var e = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = (0, u.default)(t);
          if (e) {
            var i = (0, u.default)(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (0, s.default)(this, n);
        };
      }
      var l = n(10),
        f = n(8);
      function h(t, e) {
        var n,
          r = 0;
        for (n = 0; n < 4; n++) {
          var i = 255 & t[e + n];
          if (((r <<= 7), (r |= 127 & i), 0 === (128 & i))) break;
        }
        return { size: r, read: n + 1 };
      }
      var d = (function (t) {
        (0, a.default)(r, t);
        var n = c(r);
        function r() {
          var t;
          return (
            (0, i.default)(this, r),
            ((t = n.call(this)).streamId = null),
            (t.extraData = null),
            t
          );
        }
        return (
          (0, o.default)(r, [
            {
              key: "type",
              value: function () {
                return f.ATOM_ESDS;
              },
            },
            {
              key: "parse",
              value: function (t) {
                var n = 5;
                (n += h(t, n).read),
                  (this.streamId = t.readUInt16BE(n)),
                  (n += 2);
                var r = t[n++];
                for (
                  1 === ((r >> 7) & 1) && (n += 2),
                    1 === ((r >> 6) & 1) && (n += t[n] + 1),
                    1 === ((r >> 5) & 1) && (n += 2);
                  n < t.length;

                ) {
                  var i = t[n++],
                    o = h(t, n);
                  if (((n += o.read), 4 === i)) {
                    (n += 13),
                      o.size > 13 &&
                        5 === t[n++] &&
                        ((n += (o = h(t, n)).read),
                        (this.extraData = e.allocUnsafe(o.size)),
                        t.copy(this.extraData, 0, n, n + o.size));
                    break;
                  }
                  n += o.size;
                }
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  (e += 8),
                  (e += 4),
                  (t[e++] = 3),
                  (t[e++] = 23 + this.extraData.length),
                  t.writeUInt16BE(this.streamId, e),
                  (e += 2),
                  (t[e++] = 0),
                  (t[e++] = 4),
                  (t[e++] = 15 + this.extraData.length),
                  (t[e++] = 64),
                  (t[e++] = 21),
                  (e += 11),
                  (t[e++] = 5),
                  (t[e++] = this.extraData.length),
                  this.extraData.copy(t, e),
                  (e += this.extraData.length),
                  (t[e++] = 6),
                  (t[e++] = 1),
                  (t[e++] = 2);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 37 + this.extraData.length;
              },
            },
          ]),
          r
        );
      })(l);
      t.exports = d;
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          var t;
          return (
            (0, i.default)(this, n),
            ((t = e.call(this)).majorBrand = null),
            (t.minorVersion = 0),
            (t.compatibleBrands = []),
            t
          );
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_FTYP;
              },
            },
            {
              key: "parse",
              value: function (t) {
                (this.majorBrand = t.toString("ascii", 0, 4)),
                  (this.minorVersion = t.readUInt32BE(4));
                for (var e = 0; e < (t.length - 8) / 4; e++)
                  this.compatibleBrands.push(
                    t.toString("ascii", 8 + 4 * e, 12 + 4 * e)
                  );
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.write(this.majorBrand, e + 8),
                  t.writeUInt32BE(this.minorVersion, e + 12);
                for (var n = 0; n < this.compatibleBrands.length; n++)
                  t.write(this.compatibleBrands[n], e + 16 + 4 * n);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 16 + 4 * this.compatibleBrands.length;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          var t;
          return (
            (0, i.default)(this, n),
            ((t = e.call(this)).handlerType = null),
            (t.componentName = null),
            t
          );
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_HDLR;
              },
            },
            {
              key: "parse",
              value: function (t) {
                (this.handlerType = t.toString("ascii", 8, 12)),
                  (this.componentName = t.toString("ascii", 16));
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.write(this.handlerType.substring(0, 4), e + 16),
                  t.write(this.componentName.substring(0, 16), e + 24);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 48;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(38),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_HEV1;
              },
            },
            {
              key: "extraType",
              value: function () {
                return f.ATOM_HVCC;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(38),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_HVC1;
              },
            },
            {
              key: "extraType",
              value: function () {
                return f.ATOM_HVCC;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(8),
      h = n(18),
      d = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_MDHD;
              },
            },
            {
              key: "parse",
              value: function (t) {
                1 === t[0]
                  ? ((this.timescale = t.readUInt32BE(20)),
                    (this.duration = h.readUInt64BE(t, 24)))
                  : ((this.timescale = t.readUInt32BE(12)),
                    (this.duration = t.readUInt32BE(16)));
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.writeUInt32BE(this.timescale, e + 20),
                  t.writeUInt32BE(this.duration, e + 24);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 32;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = d;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(14),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_MDIA;
              },
            },
            {
              key: "availableAtoms",
              value: function () {
                return [f.ATOM_MDHD, f.ATOM_MINF, f.ATOM_HDLR];
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(14),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_MINF;
              },
            },
            {
              key: "availableAtoms",
              value: function () {
                return [f.ATOM_VMHD, f.ATOM_SMHD, f.ATOM_STBL];
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(14),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_MOOV;
              },
            },
            {
              key: "availableAtoms",
              value: function () {
                return [f.ATOM_MVHD, f.ATOM_TRAK];
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
        i = r(n(1)),
        o = r(n(2)),
        a = r(n(5)),
        s = r(n(6)),
        u = r(n(4));
      function c(t) {
        var e = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = (0, u.default)(t);
          if (e) {
            var i = (0, u.default)(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (0, s.default)(this, n);
        };
      }
      var l = n(10),
        f = n(8),
        h = (function (t) {
          (0, a.default)(r, t);
          var n = c(r);
          function r() {
            var t;
            return (
              (0, i.default)(this, r),
              ((t = n.call(this)).channels = null),
              (t.sampleSize = null),
              (t.sampleRate = null),
              (t.streamId = null),
              (t.extraData = null),
              t
            );
          }
          return (
            (0, o.default)(r, [
              {
                key: "type",
                value: function () {
                  return f.ATOM_MP4A;
                },
              },
              {
                key: "parse",
                value: function (t) {
                  var n = 8,
                    r = t.readUInt16BE(n);
                  for (
                    n += 8,
                      this.channels = t.readUInt16BE(n),
                      n += 2,
                      this.sampleSize = t.readUInt16BE(n),
                      n += 4,
                      this.sampleRate = t.readUInt32BE(n),
                      n += 6,
                      r > 0 && (n += 16);
                    n < t.length - 8;

                  ) {
                    var i = t.readUInt32BE(n),
                      o = t.toString("ascii", n + 4, n + 8);
                    if (0 === i) break;
                    if (((n += 8), o === f.ATOM_ESDS)) {
                      var a = f.createAtom(o);
                      null !== a &&
                        (a.parse(t.slice(n, n + i - 8)),
                        (this.streamId = a.streamId),
                        a.extraData &&
                          ((this.extraData = e.allocUnsafe(
                            4 + a.extraData.length
                          )),
                          this.extraData.write(f.ATOM_MP4A),
                          a.extraData.copy(this.extraData, 4, 0)));
                      break;
                    }
                    n += i - 8;
                  }
                },
              },
              {
                key: "build",
                value: function (t, n) {
                  t.writeUInt32BE(this.bufferSize(), n),
                    t.write(this.type(), n + 4),
                    t.writeUInt16BE(1, n + 14),
                    t.writeUInt16BE(this.channels, n + 24),
                    t.writeUInt16BE(this.sampleSize, n + 26),
                    t.writeUInt32BE(this.sampleRate, n + 30);
                  var r = f.createAtom(f.ATOM_ESDS);
                  (r.streamId = this.streamId),
                    (r.extraData = e.allocUnsafe(this.extraData.length - 4)),
                    this.extraData.copy(r.extraData, 0, 4),
                    r.build(t, n + 36);
                },
              },
              {
                key: "bufferSize",
                value: function () {
                  return 73 + this.extraData.length;
                },
              },
            ]),
            r
          );
        })(l);
      t.exports = h;
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(8),
      h = n(18),
      d = [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824],
      p = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          var t;
          return (
            (0, i.default)(this, n),
            ((t = e.call(this)).timescale = null),
            (t.duration = null),
            (t.nextTrackId = null),
            t
          );
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_MVHD;
              },
            },
            {
              key: "parse",
              value: function (t) {
                1 === t[0]
                  ? ((this.timescale = t.readUInt32BE(20)),
                    (this.duration = h.readUInt64BE(t, 24)),
                    (this.nextTrackId = t.readUInt32BE(104)))
                  : ((this.timescale = t.readUInt32BE(12)),
                    (this.duration = t.readUInt32BE(16)),
                    (this.nextTrackId = t.readUInt32BE(96)));
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.writeUInt32BE(this.timescale, e + 20),
                  t.writeUInt32BE(this.duration, e + 24),
                  t.writeUInt32BE(65536, e + 28),
                  t.writeUInt16BE(256, e + 32);
                for (var n = 0; n < d.length; n++)
                  t.writeUInt32BE(d[n], e + 44 + 4 * n);
                t.writeUInt32BE(this.nextTrackId, e + 104);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 108;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = p;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_SMHD;
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 16;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(14),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_STBL;
              },
            },
            {
              key: "availableAtoms",
              value: function () {
                return [
                  f.ATOM_STSZ,
                  f.ATOM_STCO,
                  f.ATOM_STSS,
                  f.ATOM_STTS,
                  f.ATOM_STSC,
                  f.ATOM_CO64,
                  f.ATOM_STSD,
                  f.ATOM_CTTS,
                ];
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(19),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_STCO;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(19),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_STSC;
              },
            },
            {
              key: "countMultiplier",
              value: function () {
                return 3;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(167)),
      s = r(n(5)),
      u = r(n(6)),
      c = r(n(4));
    function l(t, e) {
      var n;
      if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
        if (
          Array.isArray(t) ||
          (n = (function (t, e) {
            if (!t) return;
            if ("string" === typeof t) return f(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return f(t, e);
          })(t)) ||
          (e && t && "number" === typeof t.length)
        ) {
          n && (t = n);
          var r = 0,
            i = function () {};
          return {
            s: i,
            n: function () {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
            },
            e: function (t) {
              throw t;
            },
            f: i,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var o,
        a = !0,
        s = !1;
      return {
        s: function () {
          n = t[Symbol.iterator]();
        },
        n: function () {
          var t = n.next();
          return (a = t.done), t;
        },
        e: function (t) {
          (s = !0), (o = t);
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (s) throw o;
          }
        },
      };
    }
    function f(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function h(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, c.default)(t);
        if (e) {
          var i = (0, c.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, u.default)(this, n);
      };
    }
    var d = n(14),
      p = n(8),
      v = (function (t) {
        (0, s.default)(n, t);
        var e = h(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return p.ATOM_STSD;
              },
            },
            {
              key: "availableAtoms",
              value: function () {
                return [p.ATOM_AVC1, p.ATOM_HEV1, p.ATOM_HVC1, p.ATOM_MP4A];
              },
            },
            {
              key: "getVideoAtom",
              value: function () {
                return (
                  this.getAtom(p.ATOM_AVC1) ||
                  this.getAtom(p.ATOM_HEV1) ||
                  this.getAtom(p.ATOM_HVC1)
                );
              },
            },
            {
              key: "getAudioAtom",
              value: function () {
                return this.getAtom(p.ATOM_MP4A);
              },
            },
            {
              key: "parse",
              value: function (t) {
                (0, a.default)((0, c.default)(n.prototype), "parse", this).call(
                  this,
                  t.slice(8)
                );
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.writeUInt32BE(1, e + 12),
                  (e += 16);
                var n,
                  r = l(this.atoms);
                try {
                  for (r.s(); !(n = r.n()).done; ) {
                    var i = n.value;
                    i.build(t, e), (e += i.bufferSize());
                  }
                } catch (t) {
                  r.e(t);
                } finally {
                  r.f();
                }
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return (
                  8 +
                  (0, a.default)(
                    (0, c.default)(n.prototype),
                    "bufferSize",
                    this
                  ).call(this)
                );
              },
            },
          ]),
          n
        );
      })(d);
    t.exports = v;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(19),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_STSS;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          var t;
          return (0, i.default)(this, n), ((t = e.call(this)).entries = []), t;
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_STSZ;
              },
            },
            {
              key: "parse",
              value: function (t) {
                var e = t.readUInt32BE(4),
                  n = t.readUInt32BE(8);
                if (((this.entries = new Array(n)), 0 === e))
                  for (var r = 0; r < n; r++)
                    this.entries[r] = t.readUInt32BE(12 + 4 * r);
                else this.entries.fill(e);
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.writeUInt32BE(this.entries.length, e + 16);
                for (var n = 0, r = this.entries.length; n < r; n++)
                  t.writeUInt32BE(this.entries[n], e + 20 + 4 * n);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 20 + 4 * this.entries.length;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(19),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_STTS;
              },
            },
            {
              key: "countMultiplier",
              value: function () {
                return 2;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(18),
      h = n(8),
      d = [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824],
      p = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          var t;
          return (
            (0, i.default)(this, n),
            ((t = e.call(this)).duration = null),
            (t.trackId = null),
            (t.width = null),
            (t.height = null),
            t
          );
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return h.ATOM_TKHD;
              },
            },
            {
              key: "parse",
              value: function (t) {
                (this.trackId = t.readUInt32BE(12)),
                  1 === t[0]
                    ? ((this.duration = f.readUInt64BE(t, 28)),
                      (this.width = t.readUInt16BE(88)),
                      (this.height = t.readUInt16BE(92)))
                    : ((this.duration = t.readUInt32BE(20)),
                      (this.width = t.readUInt16BE(76)),
                      (this.height = t.readUInt16BE(80)));
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.writeUInt32BE(3, e + 8),
                  t.writeUInt32BE(this.trackId, e + 20),
                  t.writeUInt32BE(this.duration, e + 28),
                  null === this.width || null === this.height
                    ? (t.writeUInt16BE(1, e + 42), t.writeUInt16BE(256, e + 44))
                    : (t.writeUInt16BE(this.width, e + 84),
                      t.writeUInt16BE(this.height, e + 88));
                for (var n = 0; n < d.length; n++)
                  t.writeUInt32BE(d[n], e + 48 + 4 * n);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 92;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = p;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(14),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_TRAK;
              },
            },
            {
              key: "availableAtoms",
              value: function () {
                return [f.ATOM_TKHD, f.ATOM_MDIA];
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(10),
      f = n(8),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n() {
          return (0, i.default)(this, n), e.apply(this, arguments);
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.ATOM_VMHD;
              },
            },
            {
              key: "build",
              value: function (t, e) {
                t.writeUInt32BE(this.bufferSize(), e),
                  t.write(this.type(), e + 4),
                  t.writeUInt32BE(1, e + 8);
              },
            },
            {
              key: "bufferSize",
              value: function () {
                return 20;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = n(87),
      s = n(173),
      u = (function () {
        function t() {
          (0, i.default)(this, t);
        }
        return (
          (0, o.default)(t, null, [
            {
              key: "parse",
              value: function (t) {
                return new s(t).parse();
              },
            },
            {
              key: "check",
              value: function (t) {
                return (
                  t.toString("ascii", 0, 3) === a.HEADER_PREFIX &&
                  t[3] === a.HEADER_VERSION
                );
              },
            },
          ]),
          t
        );
      })();
    t.exports = u;
  },
  function (t, e, n) {
    "use strict";
    t.exports = {
      MOVIE_TIMESCALE: 1e3,
      HEADER_SIZE: 9,
      HEADER_PREFIX: "FLV",
      HEADER_VERSION: 1,
      TYPE_SCRIPT: 18,
      TYPE_VIDEO: 9,
      TYPE_AUDIO: 8,
      AUDIO_FORMAT_AAC: 10,
      VIDEO_FORMAT_H264: 7,
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = r(n(26));
    function o(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function a(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? o(Object(n), !0).forEach(function (e) {
              (0, i.default)(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : o(Object(n)).forEach(function (e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    function s(t, e) {
      return (
        (e = (e = e.toLowerCase())[0].toUpperCase() + e.substr(1)),
        Object.prototype.toString.call(t) === "[object " + e + "]"
      );
    }
    function u(t, e, n) {
      if (
        (void 0 === n && (n = 2),
        void 0 === e && (e = 0),
        (t = t.toString()).length >= n)
      )
        return t;
      var r = n - t.length;
      return new Array(r).fill(String(e)).join("") + t;
    }
    function c(t, e) {
      return void 0 !== t && t
        ? ((e = e || new Date()),
          (t = (t = (t = (t = (t = (t = t.replace(
            /y/gi,
            u(e.getFullYear()),
            0
          )).replace(/m/gi, u(e.getMonth() + 1), 0)).replace(
            /d/gi,
            u(e.getDate()),
            0
          )).replace(/h/gi, u(e.getHours()), 0)).replace(
            /i/gi,
            u(e.getMinutes()),
            0
          )).replace(/s/gi, u(e.getSeconds()), 0)))
        : "";
    }
    function l(t, e) {
      var n = (t = t || {}).nameFormat || ["ymd_his"];
      e = e || new Date();
      var r = "";
      if (s(n, "string")) n = [n, {}];
      else {
        if (!s(n, "array"))
          return void (function (t) {
            throw new Error(t);
          })("name format must be string or array");
        s(n[0], "string") || (n[0] = "ymd_his"),
          s(n[1], "object") || (n[1] = {});
      }
      var i = n[0].split(/\{(?:[^{}]+)\}/),
        o = n[1];
      n[0].replace(/\{([^{}]*)\}/g, function (t, e, n) {
        i.shift();
        (r += c()), (r += e in o ? o[e] : t);
      });
      var a = i.shift();
      return (r += c(a, e));
    }
    function f(t, e) {
      (this.name = t),
        (this.allowUpDateName = !0),
        (this.byteLength = 0),
        (this.options = e),
        (this.startTime = new Date().toLocaleString());
    }
    (f.prototype.setEndTime = function () {
      this.endTime = new Date().toLocaleString();
    }),
      (f.prototype.updateNameByStream = function (t, e) {
        if (this.allowUpDateName) {
          var n = new Uint8Array(e),
            r = ((n[19] << 24) + (n[18] << 16) + (n[17] << 8) + n[16]) >>> 0,
            i =
              (r >> 26 === 0 ? "2000" : "20" + (r >> 26)) +
              "/" +
              ((r >> 22) & 15) +
              "/" +
              ((r >> 17) & 31) +
              " " +
              ((r >> 12) & 31) +
              ":" +
              ((r >> 6) & 63) +
              ":" +
              (63 & r);
          (this.name = l(t, new Date(i))),
            (this.allowUpDateName = !1),
            (n = null);
        }
        e = null;
      });
    var h = new (function () {
      var t = { count: 0, total: 0, group: [] },
        e = function () {};
      return (
        (e.prototype.add = function (e) {
          t.count++, (t.total += e.byteLength), t.group.push(e);
        }),
        (e.prototype.get = function (e) {
          return e in t ? t[e] : t;
        }),
        new e()
      );
    })();
    var d = function () {
      var t = 1048576,
        e = null,
        n = null,
        r = 0,
        i = void 0,
        o = null;
      function s() {
        (this.onMessage = function () {}),
          (this.postMessage = function (t) {
            this.__onMessage(t);
          }),
          (this.__postMessage = function (t) {
            this.onMessage(t);
          });
      }
      return (
        (s.prototype.__onMessage = function (t) {
          var e = t;
          switch (e.type) {
            case "init":
              this.init(e.options);
              break;
            case "addBuffer":
              this.addBuffer(e);
              break;
            case "close":
              this.close();
          }
        }),
        (s.prototype.init = function (e) {
          (this.fullSize = e.fullSize || 1 / 0),
            (this.singleSize = e.singleSize + 20 * t || 520 * t),
            (i = "init"),
            (this.limitOptions = Object.assign(
              { limitBy: "fullSize" },
              e.limitOptions
            )),
            (this.nameOptions = Object.assign(
              { namedBy: "date", nameFormat: ["ymd_his", {}] },
              e.nameOptions
            ));
        }),
        (s.prototype._malloc = function (t) {
          e && n && ((n = null), (e = null)),
            (e = new ArrayBuffer(t)),
            (n = new DataView(e));
          var r = this.nameOptions,
            i = "";
          switch (this.nameOptions.namedBy.toLowerCase()) {
            case "date":
              i = l(r);
              break;
            default:
              i = l();
          }
          o = new f(i);
        }),
        (s.prototype._initVideoMem = function () {
          !e && this.singleSize && this._malloc(this.singleSize);
        }),
        (s.prototype.appendVideoBuf = function (e) {
          var i = e.byteLength,
            o = r + i;
          if (o > this.singleSize - 20 * t)
            this.inNodePlace(), this.addBuffer({ buffer: e });
          else {
            for (var a = r; a < o; a++) n.setUint8(a, e[a - r]);
            (r = o),
              this.__postMessage({
                type: "pendding",
                size: r,
                total: this.singleSize,
              });
          }
        }),
        (s.prototype.addBuffer = function (t) {
          if ("closed" !== i) {
            var e = t.buffer;
            this._initVideoMem(), (i = "addBuffer");
            var n = e.length,
              o = r + n;
            h.get("total") + o > this.fullSize
              ? this.close()
              : this.appendVideoBuf(e);
          }
        }),
        (s.prototype.inNodePlace = function () {
          if ("addBuffer" === i) {
            var t;
            (i = "download"),
              o.updateNameByStream(this.nameOptions, e.slice(0, 20)),
              (o.byteLength = r),
              o.setEndTime(),
              h.add(o),
              o.name && (t = o.name);
            var n = e.slice(0, r);
            if (
              (this.reset(),
              (o.name = t),
              this.__postMessage({
                type: "download",
                data: a(a({}, o), {}, { buffer: n }),
              }),
              (n = null),
              "count" === this.limitOptions.limitBy)
            ) {
              var s = this.limitOptions.count;
              s && s === h.get("count") && this.close();
            }
          }
        }),
        (s.prototype.reset = function () {
          (r = 0), this._malloc(this.singleSize);
        }),
        (s.prototype.close = function () {
          this.inNodePlace(),
            "closed" !== i &&
              void 0 !== i &&
              ((i = "closed"),
              this.__postMessage({
                type: "closed",
                message: "record was closed",
              }),
              (e = null),
              (n = null));
        }),
        new s()
      );
    };
    e.default = d;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = r(n(90)),
      o = n(25),
      a = n(133),
      s = r(n(28)),
      u = n(134),
      c = n(135),
      l = n(136),
      f = n(137),
      h = r(n(140));
    (window.RPC = i.default),
      (window._getSession = o._getSession),
      (window._setSession = o._setSession),
      (window.setIP = o.setIP),
      (window.ajax = a.ajax),
      (window.pubsub = s.default),
      (window.loginError = u.loginError),
      (window.setCookie = c.setCookie),
      (window.BrowserType = l.BrowserType),
      (window.PluginCanvasES6 = f.PluginCanvasES6);
    var d = function (t) {
      (this.wsURL = t.wsURL),
        (this.rtspURL = t.rtspURL),
        (this.isTalkService = t.isTalkService),
        (this.isPlayback = t.playback || !1),
        (this.playBackRange = t.range || !1),
        (this.isPrivateProtocol = t.isPrivateProtocol || !1),
        (this.isAudioFlag = t.isAudioFlag || !1),
        (this.lessRateCanvas = t.lessRateCanvas || !1),
        (this.audioState = "stop"),
        (this.realm = t.realm || ""),
        (this.ws = null),
        (this.decodeMode = t.decodeMode),
        (this.supportExtraError = t.supportExtraError || !1),
        (this.playbackIndex = t.playbackIndex),
        (this.events = {
          ResolutionChanged: function () {},
          PlayStart: function () {},
          DecodeStart: function () {},
          UpdateCanvas: function () {},
          GetFrameRate: function () {},
          FrameTypeChange: function () {},
          Error: function () {},
          MSEResolutionChanged: function () {},
          audioChange: function () {},
          WorkerReady: function () {},
          IvsDraw: function () {},
          Waiting: function () {},
          UpdateTime: function () {},
          recordChanged: function () {},
          GetFirstFrame: function () {},
          GetTotalTime: function () {},
          UpdateTimeStamp: function () {},
          FileOver: function () {},
        }),
        (this.username = t.username),
        (this.password = t.password),
        (this.deployType = t.deployType),
        (this.duration = t.duration),
        (this.speed = t.speed),
        (this.isDownLoad = t.isDownLoad);
    };
    d.prototype = {
      init: function (t, e, n) {
        for (var r in ((this.ws = new h.default(this.wsURL, this.rtspURL, {
          dType: this.deployType,
          isPrivateProtocol: this.isPrivateProtocol,
          realm: this.realm,
          speed: this.speed,
        })),
        this.ws.setExtraError(this.supportExtraError),
        this.ws.init(t, e, n, this.isPlayback, this.isAudioFlag),
        this.ws.setLiveMode(this.decodeMode),
        this.ws.setUserInfo(this.username, this.password),
        this.ws.setPlayMode(this.isPlayback, this.playBackRange),
        this.ws.setLessRate(this.lessRateCanvas),
        this.events))
          this.ws.setCallback(r, this.events[r]);
        this.events = null;
      },
      startCut: function (t, e) {
        t
          ? this.controlPlayer("startRecod", !0)
          : this.ws &&
            (this.controlPlayer("startRecod", !1, e),
            this.ws.disconnect(),
            (this.ws = null));
      },
      startRecod: function (t) {
        if (t) {
          if (this.ws) return;
          for (var e in ((this.ws = new h.default(this.wsURL, this.rtspURL, {
            isRecord: !0,
            isPrivateProtocol: this.isPrivateProtocol,
            realm: this.realm,
          })),
          this.ws.setUserInfo(this.username, this.password),
          this.events))
            this.ws.setCallback(e, this.events[e]);
          this.controlPlayer("startRecod", !0), this.connect();
        } else
          this.ws &&
            (this.controlPlayer("startRecod", !1),
            this.ws.disconnect(),
            (this.ws = null));
      },
      connect: function (t) {
        this.ws.connect(), t || (this.audioState = "play");
      },
      play: function () {
        this.controlPlayer("PLAY");
      },
      pause: function () {
        this.controlPlayer("PAUSE");
      },
      stop: function () {
        this.controlPlayer("TEARDOWN");
      },
      close: function () {
        this.ws.disconnect(), (this.audioState = "stop");
      },
      playByTime: function (t) {
        (t = t < 0 ? 0 : t),
          this.duration > 0 && t > this.duration && (t = this.duration),
          this.controlPlayer("PLAY", "video", t);
      },
      playFF: function (t) {
        this.controlPlayer("PAUSE"), this.controlPlayer("SCALE", t);
      },
      playRewind: function () {},
      playNextFrame: function () {
        this.controlPlayer("playNextFrame");
      },
      getCurFrameInfo: function () {
        return this.controlPlayer("getCurFrameInfo");
      },
      audioPlay: function () {
        this.controlPlayer("audioPlay", "start"), (this.audioState = "play");
      },
      audioStop: function () {
        this.controlPlayer("audioPlay", "stop");
      },
      audioPause: function () {
        this.controlPlayer("audioPlay", "pause"), (this.audioState = "pause");
      },
      setAudioSamplingRate: function (t) {
        this.controlPlayer("audioSamplingRate", t);
      },
      setAudioVolume: function (t) {
        this.controlPlayer("volumn", t);
      },
      gotoSecond: function (t) {
        var e = this;
        window.clearInterval(e.checkRsPre),
          window.clearInterval(e.checkRsNext),
          window.clearInterval(e.checkRsGoto),
          e.ws.clearMap(),
          !0 === e.running && (e.pause(), (e.running = !1)),
          e.playByTime(t - 5),
          (e.running = !0),
          (e.checkRsGoto = window.setTimeout(function () {
            e.pause(), (e.running = !1);
          }, 12e3));
      },
      nextFrame: function (t, e, n) {
        var r = this,
          i = t > Math.pow(2, 32) ? 0 : t,
          o = r.ws.gotoFrame(i);
        !1 === o
          ? r.nextSecond(e, function (e) {
              n(r.ws.gotoFrame(t));
            })
          : n(o);
      },
      preFrame: function (t, e, n) {
        var r = this,
          i = r.ws.gotoFrame(t);
        !1 === i
          ? r.preSecond(e, function (e) {
              n(r.ws.gotoFrame(t));
            })
          : n(i);
      },
      nextSecond: function (t, e) {
        var n = this,
          r = n.ws.gotoSecond(t);
        !1 === r
          ? (!1 === n.running && (n.playByTime(t), (n.running = !0)),
            (n.checkRsNext = window.setInterval(function () {
              !1 !== (r = n.ws.gotoSecond(t)) &&
                (window.clearInterval(n.checkRsNext),
                window.setTimeout(function () {
                  (n.running = !1), n.pause();
                }, 9e3),
                e(r));
            }, 2e3)))
          : (n.ws.checkLeftSize(t, "next") <= 2 &&
              !1 === n.running &&
              (n.playByTime(t + 1),
              (n.running = !0),
              window.setTimeout(function () {
                n.pause(), (n.running = !1);
              }, 9e3)),
            e(r));
      },
      preSecond: function (t, e) {
        var n = this,
          r = n.ws.gotoSecond(t);
        !1 === r
          ? (!1 === n.running && (n.playByTime(t - 5), (n.running = !0)),
            (n.checkRsPre = window.setInterval(function () {
              !1 !== (r = n.ws.gotoSecond(t)) &&
                (window.clearInterval(n.checkRsPre),
                window.setTimeout(function () {
                  (n.running = !1), n.pause();
                }, 9e3),
                e(r));
            }, 2e3)))
          : (n.ws.checkLeftSize(t, "pre") <= 2 &&
              !1 === n.running &&
              (n.playByTime(t - 5),
              (n.running = !0),
              window.setTimeout(function () {
                n.pause(), (n.running = !1);
              }, 9e3)),
            e(r));
      },
      controlPlayer: function (t, e, n) {
        var r;
        return (
          (r =
            "video" === e
              ? { command: t, range: n || 0 }
              : "audioPlay" === t
              ? { command: t, data: e, range: n || 0 }
              : "startRecod" === t
              ? { command: t, data: e, stopDown: n }
              : { command: t, data: e }),
          this.ws.controlPlayer(r)
        );
      },
      setPlayMode: function (t) {
        this.ws.setLiveMode(t);
      },
      setPlayPath: function (t) {
        this.ws.setRTSPURL(t);
      },
      capture: function (t) {
        var e =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : { ivsCanvasArr: [] };
        this.ws.capture(t, e);
      },
      getCapture: function (t, e, n) {
        return this.ws.getCapture(t, e, n);
      },
      talk: function (t) {
        if ("on" === t) {
          for (var e in ((this.ws = new h.default(this.wsURL, this.rtspURL, {
            isTalkService: this.isTalkService,
            isPrivateProtocol: this.isPrivateProtocol,
            realm: this.realm,
          })),
          this.ws.talkInit(),
          this.ws.setUserInfo(this.username, this.password),
          this.events))
            this.ws.setCallback(e, this.events[e]);
          this.ws.connect();
        } else this.ws.disconnect();
      },
      on: function (t, e) {
        this.events[t] = e;
      },
    };
    var p = d;
    e.default = p;
  },
  function (t, e, n) {
    "use strict";
    var r = n(91),
      i = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.getRandomStr = e.default = void 0);
    var o = i(n(92)),
      a = i(n(12)),
      s = i(n(41)),
      u = i(n(98)),
      c = r(n(25)),
      l = i(n(43)),
      f = i(n(121)),
      h = i(n(122)),
      d = i(n(123)),
      p = i(n(28)),
      v = n(124),
      g = v.SM4,
      m = v.SM2,
      y = n(125),
      b = n(3).Buffer,
      w = g.constants.CBC,
      S = new c.default(),
      T = 20,
      x = function (t, e) {
        var n = {},
          r = t.split(","),
          i = r[0].split(":"),
          o = r[1].split(":");
        (n[i[0]] = i[1]), (n[o[0]] = o[1]);
        var a = new h.default();
        return a.setPublic(n.N, n.E), a.encrypt(e);
      },
      E = function (t) {
        return d.default.enc.Utf8.parse(t);
      },
      A = function (t) {
        for (
          var e = (t + "=".repeat((4 - (t.length % 4)) % 4))
              .replace(/\-/g, "+")
              .replace(/_/g, "/"),
            n = window.atob(e),
            r = new Uint8Array(n.length),
            i = 0;
          i < n.length;
          ++i
        )
          r[i] = n.charCodeAt(i);
        return r;
      },
      R = function (t) {
        for (
          var e = new b(t.byteLength), n = new Uint8Array(t), r = 0;
          r < e.length;
          ++r
        )
          e[r] = n[r];
        return e;
      },
      _ = function (t) {
        for (var e = "", n = 0; n < t.length; n++) {
          var r = t[n].toString(16);
          1 === r.length && (r = "0" + r), (e += r);
        }
        return e;
      },
      k = function (t) {
        return new Uint8Array(
          t.match(/.{1,2}/g).map(function (t) {
            return parseInt(t, 16);
          })
        );
      },
      D = function (t) {
        if ("" === t) return "";
        for (var e = [], n = 0; n < t.length; n++)
          e.push(t.charCodeAt(n).toString(16));
        return e.join("");
      },
      C = function (t) {
        for (var e = "", n = window.crypto || window.msCrypto; e.length < t; ) {
          var r = (Math.random().toString().substr(2) - 0).toString();
          n && (r = n.getRandomValues(new Uint32Array(1))[0].toString()),
            "0" !== r && (e += r);
        }
        return e.substr(0, t);
      };
    e.getRandomStr = C;
    var M = C(16) + "",
      I = D(M),
      B = D("0000000000000000");
    function O(t) {
      var e = "04" + t.SM.replace("Y:", "").replace("X:", "").replace(",", ""),
        n = m.encrypt(M, e, {
          inputEncoding: "utf8",
          outputEncoding: "base64",
        });
      n = A(n);
      for (var r = [], i = 0; i < 4; i++) {
        var o = new y.BerWriter();
        o.startSequence(),
          0 === i
            ? o.writeBuffer(R(n.slice(0, 32)), 2)
            : 1 === i
            ? o.writeBuffer(R(n.slice(32, 64)), 2)
            : 2 === i
            ? o.writeBuffer(R(n.slice(64, 96)), 4)
            : o.writeBuffer(R(n.slice(96, n.byteLength)), 4),
          o.endSequence();
        var a = o.buffer;
        r.push(_(a));
      }
      var s = (r = r.map(function (t) {
          return t.slice(4);
        })).join(""),
        u = k(s),
        c = new y.BerWriter();
      c.startSequence(), c.writeBuffer(R(u)), c.endSequence();
      var l = c.buffer;
      return _(l);
    }
    var P = function (t, e, n) {
        return function (r, i) {
          return new Promise(function (o) {
            var a = d.default.mode.ECB,
              s = { padding: d.default.pad.ZeroPadding };
            e &&
              t &&
              (~t.indexOf("ROAE")
                ? (a = d.default.mode.ECB)
                : ~t.indexOf("RPAC") &&
                  ((a = d.default.mode.CBC),
                  (s.iv = d.default.enc.Utf8.parse("0000000000000000")))),
              (s.mode = a);
            var u = "";
            n && "SM" === n
              ? ((u = g.decrypt(r, I, {
                  iv: B,
                  mode: w,
                  inputEncoding: "base64",
                  outputEncoding: "utf8",
                })),
                o(JSON.parse(u)))
              : ((u = d.default.AES.decrypt(r, i, s)),
                o(JSON.parse(d.default.enc.Utf8.stringify(u))));
          });
        };
      },
      F = function (t, e, n, r, i) {
        return function (o, a, s) {
          return new Promise(function (u) {
            var c = "AES-128",
              l = d.default.mode.ECB,
              f = { padding: d.default.pad.ZeroPadding };
            if (
              (n &&
                e &&
                (~e.indexOf("ROAE")
                  ? ((l = d.default.mode.ECB), (c = "ROAE-256"))
                  : ~e.indexOf("RPAC") &&
                    ((l = d.default.mode.CBC),
                    (c = "RPAC-256"),
                    (f.iv = d.default.enc.Utf8.parse("0000000000000000")))),
              r && "SM" === r)
            ) {
              var h = g.encrypt(JSON.stringify(o), I, {
                iv: B,
                mode: w,
                inputEncoding: "utf8",
                outputEncoding: "base64",
              });
              (c = "SM4_CBC_PKCS7_PADDING"),
                u({ salt: O(i), content: h, cipher: c });
            } else {
              f.mode = l;
              var p = d.default.AES.encrypt(
                d.default.enc.Utf8.parse(JSON.stringify(o)),
                s,
                f
              ).toString();
              u({ salt: x(t, a), content: p, cipher: c });
            }
          });
        };
      },
      U = {},
      j = (function () {
        var t = (0, u.default)(
          o.default.mark(function t(e) {
            var n, r, i, a;
            return o.default.wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (
                      ((n = { channel: e || 0 }),
                      (r = (0, c._getSession)()),
                      (i = JSON.stringify(n)),
                      !U[r] || !U[r][i])
                    ) {
                      t.next = 7;
                      break;
                    }
                    return t.abrupt("return", U[r][i]);
                  case 7:
                    return (U[r] = {}), (t.next = 10), S.PTZ.instance(e);
                  case 10:
                    return (
                      (a = t.sent),
                      (U[r][i] = a.result),
                      t.abrupt("return", a.result)
                    );
                  case 13:
                  case "end":
                    return t.stop();
                }
            }, t);
          })
        );
        return function (e) {
          return t.apply(this, arguments);
        };
      })();
    function L() {
      var t = this;
      c.default.call(this),
        (this.cipher = ["AES"]),
        (this.saltLen = 16),
        (this.pub = ""),
        (this.newSecVersion = !1),
        (this._getKeyt = function () {
          return C(t.saltLen);
        }),
        (this._decrypt = P),
        (this._encrypt = F),
        (this.suggestedAsymmetric = ""),
        (this.pubEx = null),
        (this.keepAliveTimer = []),
        (this._encryptDoFind = (function () {
          var e = (0, u.default)(
            o.default.mark(function e(n, r) {
              var i, a;
              return o.default.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (i = [
                          (0, c._data)(
                            "".concat(n, ".doFind"),
                            { count: T },
                            { object: r }
                          ),
                        ]),
                        (e.next = 3),
                        t.multiRecordSec(i)
                      );
                    case 3:
                      return (a = e.sent), e.abrupt("return", a[0].params);
                    case 5:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t, n) {
            return e.apply(this, arguments);
          };
        })());
    }
    L.prototype = {
      realm: "",
      login: function (t, e, n) {
        return new Promise(function (r, i) {
          S.Global.firstLogin(t)
            .then(function (o) {
              if (268632075 === o.error.code) i(o);
              else if (o.session) {
                var a = o.params.realm,
                  s = (0, f.default)(t + ":" + a + ":" + e),
                  u = (0, f.default)(t + ":" + o.params.random + ":" + s),
                  c = {
                    realm: a,
                    random: o.params.random,
                    passwordType: "Default",
                    authorityType: o.params.encryption,
                  };
                S.Global.secondLogin(t, u, c, n)
                  .then(function (t) {
                    (L.prototype.realm = a), r(t);
                  })
                  .catch(function (t) {
                    i(t);
                  });
              } else i(o);
            })
            .catch(function (t) {
              i(t);
            });
        });
      },
      keepAlive: function () {
        var t = this,
          e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 300,
          n =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 6e4,
          r = arguments.length > 2 ? arguments[2] : void 0,
          i = arguments.length > 3 ? arguments[3] : void 0,
          o = arguments.length > 4 ? arguments[4] : void 0,
          a = p.default.subscribe("_clearTime_", function (e) {
            clearInterval(t.keepAliveTimer[e]),
              (t.keepAliveTimer[e] = null),
              p.default.unsubscribe(a);
          });
        clearInterval(this.keepAliveTimer[o]),
          (this.keepAliveTimer[o] = setInterval(function () {
            return S.Global.keepAlive(e, r, i);
          }, n));
      },
      getUrlData: function (t) {
        var e = this,
          n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "POST";
        return new Promise(function (i, o) {
          (0, l.default)({
            method: r,
            url: t,
            headers: { "Self-TargetIP": (0, c.getIP)() },
          })
            .then(function (t) {
              (t = t.data),
                (e.saltLen =
                  "V2.0" === n.SecurityBaselineVersion ||
                  "V2.0" === t.SecurityBaselineVersion
                    ? 32
                    : 16),
                (e.newSecVersion =
                  "V2.0" === n.SecurityBaselineVersion ||
                  "V2.0" === t.SecurityBaselineVersion),
                i(t);
            })
            .catch(function (t) {
              o();
            });
        });
      },
      getEncrypt: function (t) {
        var e = this;
        return S.Security.getEncryptInfoOut()
          .then(function (n) {
            var r = n.cipher,
              i = n.pub,
              o = n.suggestedAsymmetric,
              a = n.pubEx;
            return (
              (e.cipher = r),
              (e.pub = i),
              (e.suggestedAsymmetric = o),
              (e.pubEx = a),
              t &&
                ((e.saltLen = "V2.0" === t.SecurityBaselineVersion ? 32 : 16),
                (e.newSecVersion = "V2.0" === t.SecurityBaselineVersion)),
              (e._decrypt = e._decrypt(
                e.cipher,
                e.newSecVersion,
                e.suggestedAsymmetric
              )),
              (e._encrypt = e._encrypt(
                e.pub,
                e.cipher,
                e.newSecVersion,
                e.suggestedAsymmetric,
                e.pubEx
              )),
              !0
            );
          })
          .catch(function () {});
      },
      getSecConfig: function (t, e) {
        var n = this;
        return (0, u.default)(
          o.default.mark(function r() {
            var i, a, s, u, l;
            return o.default.wrap(
              function (r) {
                for (;;)
                  switch ((r.prev = r.next)) {
                    case 0:
                      if (
                        ((r.prev = 0),
                        (i = n._getKeyt()),
                        (a = E(i)),
                        (s = {}),
                        !(t instanceof Array))
                      ) {
                        r.next = 14;
                        break;
                      }
                      return (
                        (u = t.map(function (t) {
                          return (0,
                          c._config)({ name: t, channel: e, type: "getConfig" });
                        })),
                        (r.next = 8),
                        n._encrypt(u, i, a)
                      );
                    case 8:
                      return (s = r.sent), (r.next = 11), S.System.multiSec(s);
                    case 11:
                      (s = r.sent), (r.next = 20);
                      break;
                    case 14:
                      return (r.next = 16), n._encrypt({ name: t }, i, a);
                    case 16:
                      return (
                        (s = r.sent), (r.next = 19), S.Security.getConfig(s)
                      );
                    case 19:
                      s = r.sent;
                    case 20:
                      return (r.next = 22), n._decrypt(s.content, a);
                    case 22:
                      return (
                        (l = r.sent), r.abrupt("return", l.table ? l.table : l)
                      );
                    case 26:
                      throw (
                        ((r.prev = 26),
                        (r.t0 = r.catch(0)),
                        r.t0,
                        String(
                          "Error:getSecConfig is error,please check ".concat(
                            t,
                            " is exists"
                          )
                        ))
                      );
                    case 30:
                    case "end":
                      return r.stop();
                  }
              },
              r,
              null,
              [[0, 26]]
            );
          })
        )();
      },
      getSecDefault: function (t, e) {
        var n = this;
        return (0, u.default)(
          o.default.mark(function r() {
            var i, a, s, u, l;
            return o.default.wrap(
              function (r) {
                for (;;)
                  switch ((r.prev = r.next)) {
                    case 0:
                      if (
                        ((r.prev = 0),
                        (i = n._getKeyt()),
                        (a = E(i)),
                        (s = {}),
                        !(t instanceof Array))
                      ) {
                        r.next = 14;
                        break;
                      }
                      return (
                        (u = t.map(function (t) {
                          return (0,
                          c._config)({ name: t, channel: e, type: "getDefault" });
                        })),
                        (r.next = 8),
                        n._encrypt(u, i, a)
                      );
                    case 8:
                      return (s = r.sent), (r.next = 11), S.System.multiSec(s);
                    case 11:
                      (s = r.sent), (r.next = 20);
                      break;
                    case 14:
                      return (r.next = 16), n._encrypt({ name: t }, i, a);
                    case 16:
                      return (
                        (s = r.sent), (r.next = 19), S.Security.getDefault(s)
                      );
                    case 19:
                      s = r.sent;
                    case 20:
                      return (r.next = 22), n._decrypt(s.content, a);
                    case 22:
                      return (
                        (l = r.sent), r.abrupt("return", l.table ? l.table : l)
                      );
                    case 26:
                      throw (
                        ((r.prev = 26),
                        (r.t0 = r.catch(0)),
                        String(
                          "Error:getSecDefault is error,please check ".concat(
                            t,
                            " is exists"
                          )
                        ))
                      );
                    case 29:
                    case "end":
                      return r.stop();
                  }
              },
              r,
              null,
              [[0, 26]]
            );
          })
        )();
      },
      setSecConfig: function (t, e, n, r) {
        var i = this;
        return (0, u.default)(
          o.default.mark(function a() {
            var s, u, l, f, h;
            return o.default.wrap(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (
                        ((o.prev = 0),
                        (s = i._getKeyt()),
                        (u = E(s)),
                        (l = {}),
                        !(t instanceof Array))
                      ) {
                        o.next = 16;
                        break;
                      }
                      if (!e.length || t.length === e.length) {
                        o.next = 7;
                        break;
                      }
                      throw new Error("setSecConfig params error");
                    case 7:
                      return (
                        (f = t.map(function (t, i) {
                          return (0,
                          c._config)({ name: t, channel: n, params: e[i], type: "setConfig", options: r });
                        })),
                        (o.next = 10),
                        i._encrypt(f, s, u)
                      );
                    case 10:
                      return (l = o.sent), (o.next = 13), S.System.multiSec(l);
                    case 13:
                      (l = o.sent), (o.next = 22);
                      break;
                    case 16:
                      return (
                        (o.next = 18), i._encrypt({ name: t, table: e }, s, u)
                      );
                    case 18:
                      return (
                        (l = o.sent), (o.next = 21), S.Security.setConfig(l)
                      );
                    case 21:
                      l = o.sent;
                    case 22:
                      return (o.next = 24), i._decrypt(l.content, u);
                    case 24:
                      return (
                        (h = o.sent), o.abrupt("return", h.table ? h.table : h)
                      );
                    case 28:
                      throw ((o.prev = 28), (o.t0 = o.catch(0)), o.t0);
                    case 31:
                    case "end":
                      return o.stop();
                  }
              },
              a,
              null,
              [[0, 28]]
            );
          })
        )();
      },
      access: function (t) {
        var e = this;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i, a, s;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (n.prev = 0),
                        (r = e._getKeyt()),
                        (i = E(r)),
                        (n.next = 5),
                        e._encrypt(t, r, i)
                      );
                    case 5:
                      return (a = n.sent), (n.next = 8), S.DevInit.access(a);
                    case 8:
                      return (
                        (s = n.sent), n.abrupt("return", s.table ? s.table : s)
                      );
                    case 12:
                      throw (
                        ((n.prev = 12),
                        (n.t0 = n.catch(0)),
                        String("Error:access is error"))
                      );
                    case 15:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[0, 12]]
            );
          })
        )();
      },
      multiSec: function (t) {
        var e = this;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i, a, s, u, l, f, h, d, p;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (r = []),
                        t instanceof Array
                          ? (r = t.map(function (t) {
                              return (0,
                              c._data)(t.method, t.params, t.object && { object: t.object });
                            }))
                          : ((i = t.method),
                            (a = t.params),
                            (s = void 0 === a ? null : a),
                            (u = t.object),
                            (l = void 0 === u ? void 0 : u),
                            (r = [
                              (r = (0, c._data)(i, s, l && { object: l })),
                            ])),
                        (n.prev = 2),
                        (f = e._getKeyt()),
                        (h = E(f)),
                        (n.next = 7),
                        e._encrypt(r, f, h)
                      );
                    case 7:
                      return (d = n.sent), (n.next = 10), S.System.multiSec(d);
                    case 10:
                      return (
                        (d = n.sent), (n.next = 13), e._decrypt(d.content, h)
                      );
                    case 13:
                      return (
                        (p = n.sent), n.abrupt("return", p.table ? p.table : p)
                      );
                    case 17:
                      throw (
                        ((n.prev = 17),
                        (n.t0 = n.catch(2)),
                        String("Error:multiSec is error"))
                      );
                    case 20:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[2, 17]]
            );
          })
        )();
      },
      getRecords: function (t, e) {
        var n = arguments,
          r = this;
        return (0, u.default)(
          o.default.mark(function i() {
            var a, u, c, l;
            return o.default.wrap(
              function (i) {
                for (;;)
                  switch ((i.prev = i.next)) {
                    case 0:
                      return (
                        (a = !(n.length > 2 && void 0 !== n[2]) || n[2]),
                        (u = {}),
                        (c = ""),
                        (i.prev = 2),
                        (i.next = 5),
                        S.RecordFinder.create(t)
                      );
                    case 5:
                      return (
                        (l = i.sent),
                        (c = l.result),
                        (i.next = 9),
                        S.RecordFinder.startFind(e, c)
                      );
                    case 9:
                      if ((l = i.sent).result) {
                        i.next = 12;
                        break;
                      }
                      throw String("startFind is error");
                    case 12:
                      if (!a) {
                        i.next = 18;
                        break;
                      }
                      return (i.next = 15), r._encryptDoFind("RecordFinder", c);
                    case 15:
                      (i.t0 = i.sent), (i.next = 21);
                      break;
                    case 18:
                      return (i.next = 20), S.RecordFinder.doFind(T, c);
                    case 20:
                      i.t0 = i.sent;
                    case 21:
                      (l = i.t0), (u = l.records);
                    case 23:
                      if (l.found !== T) {
                        i.next = 37;
                        break;
                      }
                      if (!a) {
                        i.next = 30;
                        break;
                      }
                      return (i.next = 27), r._encryptDoFind("RecordFinder", c);
                    case 27:
                      (i.t1 = i.sent), (i.next = 33);
                      break;
                    case 30:
                      return (i.next = 32), S.RecordFinder.doFind(T, c);
                    case 32:
                      i.t1 = i.sent;
                    case 33:
                      (l = i.t1),
                        (u =
                          null === l.records
                            ? (0, s.default)(u)
                            : [].concat(
                                (0, s.default)(u),
                                (0, s.default)(l.records)
                              )),
                        (i.next = 23);
                      break;
                    case 37:
                      return i.abrupt("return", u || []);
                    case 40:
                      throw (
                        ((i.prev = 40),
                        (i.t2 = i.catch(2)),
                        String(
                          "Error:getRecords is error, please check ".concat(
                            t,
                            " is exists"
                          )
                        ))
                      );
                    case 43:
                      return (
                        (i.prev = 43), (i.next = 46), S.RecordFinder.stopFind(c)
                      );
                    case 46:
                      return (i.next = 48), S.RecordFinder.destroy(c);
                    case 48:
                      return i.finish(43);
                    case 49:
                    case "end":
                      return i.stop();
                  }
              },
              i,
              null,
              [[2, 40, 43, 49]]
            );
          })
        )();
      },
      createDoSeekFind: function (t, e) {
        var n = this,
          r =
            !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
          i = null,
          a = !1,
          s = (function () {
            var n = (0, u.default)(
              o.default.mark(function n() {
                var r;
                return o.default.wrap(function (n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        if (!i && !a) {
                          n.next = 2;
                          break;
                        }
                        return n.abrupt("return");
                      case 2:
                        return (a = !0), (n.next = 5), S.RecordFinder.create(t);
                      case 5:
                        return (
                          (r = n.sent),
                          (n.next = 8),
                          S.RecordFinder.startFind(e, r.result)
                        );
                      case 8:
                        (i = r.result), (a = !1);
                      case 10:
                      case "end":
                        return n.stop();
                    }
                }, n);
              })
            );
            return function () {
              return n.apply(this, arguments);
            };
          })();
        return {
          getQuerySize: (function () {
            var e = (0, u.default)(
              o.default.mark(function e() {
                var n;
                return o.default.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.prev = 0), (e.next = 3), s();
                        case 3:
                          if (i) {
                            e.next = 6;
                            break;
                          }
                          return (
                            console.warn(
                              "Error:createDoSeekFind is error, please check object is exists"
                            ),
                            e.abrupt("return", 0)
                          );
                        case 6:
                          return (e.next = 8), S.RecordFinder.getQuerySize(i);
                        case 8:
                          return (n = e.sent), e.abrupt("return", n.count);
                        case 12:
                          throw (
                            ((e.prev = 12),
                            (e.t0 = e.catch(0)),
                            String(
                              "Error:createDoSeekFind is error, please check getQuerySize(".concat(
                                t,
                                ") is exists"
                              )
                            ))
                          );
                        case 15:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 12]]
                );
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          doSeekFind: (function () {
            var e = (0, u.default)(
              o.default.mark(function e(a) {
                var u, l, f, h;
                return o.default.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), s();
                        case 2:
                          if (i) {
                            e.next = 5;
                            break;
                          }
                          return (
                            console.warn(
                              "Error:createDoSeekFind is error, please check object is exists"
                            ),
                            e.abrupt("return", !1)
                          );
                        case 5:
                          if (
                            ((u = []),
                            (l = null),
                            (e.prev = 7),
                            (f = (a - 1) * T),
                            !r)
                          ) {
                            e.next = 19;
                            break;
                          }
                          return (
                            (h = [
                              (0, c._data)(
                                "RecordFinder.doSeekFind",
                                { offset: f, count: T },
                                { object: i }
                              ),
                            ]),
                            (e.next = 13),
                            n.multiRecordSec(h)
                          );
                        case 13:
                          if (!(l = e.sent)[0].error) {
                            e.next = 16;
                            break;
                          }
                          throw String(
                            "Error:doSeekFind ".concat(
                              t,
                              " is error with Encrypt"
                            )
                          );
                        case 16:
                          (u = l[0].params.records), (e.next = 23);
                          break;
                        case 19:
                          return (
                            (e.next = 21), S.RecordFinder.doSeekFind(f, T, i)
                          );
                        case 21:
                          (l = e.sent), (u = l.records);
                        case 23:
                          return e.abrupt("return", u || []);
                        case 26:
                          throw (
                            ((e.prev = 26),
                            (e.t0 = e.catch(7)),
                            String(
                              "Error:createDoSeekFind is error, please check doSeekFind(".concat(
                                t,
                                ") is exists"
                              )
                            ))
                          );
                        case 29:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[7, 26]]
                );
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          destroy: (function () {
            var t = (0, u.default)(
              o.default.mark(function t() {
                return o.default.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (i) {
                            t.next = 2;
                            break;
                          }
                          return t.abrupt("return");
                        case 2:
                          return (
                            (t.prev = 2),
                            (t.next = 5),
                            S.RecordFinder.stopFind(i)
                          );
                        case 5:
                          return (t.next = 7), S.RecordFinder.destroy(i);
                        case 7:
                          return (i = null), t.abrupt("return", !0);
                        case 11:
                          throw (
                            ((t.prev = 11),
                            (t.t0 = t.catch(2)),
                            String(
                              "Error:createDoSeekFind is error, please check object is undefined"
                            ))
                          );
                        case 14:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[2, 11]]
                );
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
        };
      },
      getVideoCaps: function (t) {
        return (0, u.default)(
          o.default.mark(function e() {
            var n, r;
            return o.default.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (n = ""),
                        (e.prev = 1),
                        (e.next = 4),
                        S.DevVideoInput.instance(t)
                      );
                    case 4:
                      return (
                        (r = e.sent),
                        (n = r.result),
                        (e.next = 8),
                        S.DevVideoInput.getCaps(n)
                      );
                    case 8:
                      return (r = e.sent), e.abrupt("return", r.caps);
                    case 12:
                      throw (
                        ((e.prev = 12),
                        (e.t0 = e.catch(1)),
                        String(
                          "Error:getVideoCaps is error, please check channel:".concat(
                            t,
                            " is exists"
                          )
                        ))
                      );
                    case 15:
                      return (
                        (e.prev = 15), S.DevVideoInput.destroy(n), e.finish(15)
                      );
                    case 18:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [[1, 12, 15, 18]]
            );
          })
        )();
      },
      DevVideoInputManager: function (t) {
        var e = arguments;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i, a, s;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (r = e.length > 1 && void 0 !== e[1] ? e[1] : null),
                        (i = e.length > 2 && void 0 !== e[2] ? e[2] : 0),
                        (a = ""),
                        (n.prev = 3),
                        (n.next = 6),
                        S.DevVideoInput.instance(i)
                      );
                    case 6:
                      return (
                        (s = n.sent),
                        (a = s.result),
                        (n.next = 10),
                        S.DevVideoInput[t](a, r)
                      );
                    case 10:
                      return (s = n.sent), n.abrupt("return", s.caps);
                    case 14:
                      throw (
                        ((n.prev = 14),
                        (n.t0 = n.catch(3)),
                        String(
                          "Error:getVideoCaps is error, please check channel:".concat(
                            i,
                            " is exists"
                          )
                        ))
                      );
                    case 17:
                      return (
                        (n.prev = 17), S.DevVideoInput.destroy(a), n.finish(17)
                      );
                    case 20:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[3, 14, 17, 20]]
            );
          })
        )();
      },
      getVideoCapsEx: function (t, e) {
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (r = ""),
                        (n.prev = 1),
                        (n.next = 4),
                        S.DevVideoInput.instance(e)
                      );
                    case 4:
                      return (
                        (i = n.sent),
                        (r = i.result),
                        (n.next = 8),
                        S.DevVideoInput.getCapsEx(r, t)
                      );
                    case 8:
                      return (i = n.sent), n.abrupt("return", i.caps);
                    case 12:
                      throw (
                        ((n.prev = 12),
                        (n.t0 = n.catch(1)),
                        n.t0,
                        String(
                          "Error:getVideoCapsEx is error, please check channel:".concat(
                            e,
                            " is exists"
                          )
                        ))
                      );
                    case 16:
                      return (
                        (n.prev = 16), S.DevVideoInput.destroy(r), n.finish(16)
                      );
                    case 19:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[1, 12, 16, 19]]
            );
          })
        )();
      },
      multiRecordSec: function (t) {
        var e = this;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i, a, s;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (n.prev = 0),
                        (r = e._getKeyt()),
                        (i = E(r)),
                        (n.next = 5),
                        e._encrypt(t, r, i)
                      );
                    case 5:
                      return (a = n.sent), (n.next = 8), S.System.multiSec(a);
                    case 8:
                      return (
                        (a = n.sent), (n.next = 11), e._decrypt(a.content, i)
                      );
                    case 11:
                      return (
                        (s = n.sent), n.abrupt("return", s.table ? s.table : s)
                      );
                    case 15:
                      throw (
                        ((n.prev = 15),
                        (n.t0 = n.catch(0)),
                        String("Error:multiRecordSec is error"))
                      );
                    case 18:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[0, 15]]
            );
          })
        )();
      },
      getDeviceAllInfo: function (t) {
        var e = arguments;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i, a;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (r = e.length > 1 && void 0 !== e[1] ? e[1] : null),
                        (i = ""),
                        (n.prev = 2),
                        (n.next = 5),
                        S.Storage.instance()
                      );
                    case 5:
                      return (
                        (a = n.sent),
                        (i = a.result),
                        (n.next = 9),
                        S.Storage[t](i, r)
                      );
                    case 9:
                      return (a = n.sent), n.abrupt("return", a);
                    case 13:
                      throw (
                        ((n.prev = 13),
                        (n.t0 = n.catch(2)),
                        String(
                          "Error:getDeviceAllInfo is error, please check channel:".concat(
                            t,
                            " is exists"
                          )
                        ))
                      );
                    case 16:
                      return (n.prev = 16), S.Storage.destroy(i), n.finish(16);
                    case 19:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[2, 13, 16, 19]]
            );
          })
        )();
      },
      getStorage: function (t) {
        var e = arguments;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i, a;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (r = e.length > 1 && void 0 !== e[1] ? e[1] : null),
                        (i = ""),
                        (n.prev = 2),
                        (n.next = 5),
                        S.Storage.instance()
                      );
                    case 5:
                      return (
                        (a = n.sent),
                        (i = a.result),
                        (n.next = 9),
                        S.Storage[t](i, r)
                      );
                    case 9:
                      return (a = n.sent), n.abrupt("return", a);
                    case 13:
                      throw (
                        ((n.prev = 13),
                        (n.t0 = n.catch(2)),
                        n.t0,
                        String(
                          "Error:getStorage is error, please check channel:".concat(
                            t,
                            " is exists"
                          )
                        ))
                      );
                    case 17:
                      return (n.prev = 17), S.Storage.destroy(i), n.finish(17);
                    case 20:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[2, 13, 17, 20]]
            );
          })
        )();
      },
      getMediaFile: function (t) {
        var e = arguments;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i, a;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (r = e.length > 1 && void 0 !== e[1] ? e[1] : null),
                        (i = ""),
                        (n.prev = 2),
                        (n.next = 5),
                        S.MediaFileFind.instance()
                      );
                    case 5:
                      return (
                        (a = n.sent),
                        (i = a.result),
                        (n.next = 9),
                        S.MediaFileFind[t](i, r)
                      );
                    case 9:
                      return (a = n.sent), n.abrupt("return", a);
                    case 13:
                      throw (
                        ((n.prev = 13),
                        (n.t0 = n.catch(2)),
                        n.t0,
                        String(
                          "Error:getMediaFile is error, please check channel:".concat(
                            t,
                            " is exists"
                          )
                        ))
                      );
                    case 17:
                      return (
                        (n.prev = 17), S.MediaFileFind.destroy(i), n.finish(17)
                      );
                    case 20:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[2, 13, 17, 20]]
            );
          })
        )();
      },
      getPlaybackList: function (t) {
        var e = arguments;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i, a, s, u, c;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (r = e.length > 1 && void 0 !== e[1] ? e[1] : null),
                        (i = ""),
                        (a = r.condition.count),
                        (s = r.condition),
                        (n.prev = 3),
                        (n.next = 6),
                        S.MediaFileFind.instance()
                      );
                    case 6:
                      return (
                        (c = n.sent),
                        (i = c.result),
                        (n.next = 10),
                        S.MediaFileFind.findFile(i, { condition: s })
                      );
                    case 10:
                      if (!(c = n.sent)) {
                        n.next = 15;
                        break;
                      }
                      return (
                        (n.next = 14),
                        S.MediaFileFind.findNextFile(i, { count: a })
                      );
                    case 14:
                      u = n.sent;
                    case 15:
                      return n.abrupt("return", u);
                    case 18:
                      throw (
                        ((n.prev = 18),
                        (n.t0 = n.catch(3)),
                        "Error:getPlaybackList is error, please check channel:".concat(
                          t,
                          " is exists"
                        ),
                        n.t0)
                      );
                    case 22:
                      return (
                        (n.prev = 22), S.MediaFileFind.destroy(i), n.finish(22)
                      );
                    case 25:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[3, 18, 22, 25]]
            );
          })
        )();
      },
      getEncode: function (t) {
        var e = arguments;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (r = e.length > 1 && void 0 !== e[1] ? e[1] : null),
                        (n.prev = 1),
                        (n.next = 4),
                        S.Encode[t](r)
                      );
                    case 4:
                      return (i = n.sent), n.abrupt("return", i);
                    case 8:
                      throw (
                        ((n.prev = 8),
                        (n.t0 = n.catch(1)),
                        n.t0,
                        String(
                          "Error:Encode is error, please check channel:".concat(
                            t,
                            " is exists"
                          )
                        ))
                      );
                    case 12:
                      return (n.prev = 12), n.finish(12);
                    case 14:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[1, 8, 12, 14]]
            );
          })
        )();
      },
      PTZManager: function (t) {
        var e = arguments;
        return (0, u.default)(
          o.default.mark(function n() {
            var r, i, s, u, c;
            return o.default.wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (
                        (r = e.length > 1 && void 0 !== e[1] ? e[1] : 0),
                        (i = e.length > 2 && void 0 !== e[2] ? e[2] : null),
                        "object" === (0, a.default)(r) &&
                          ((s = r), (r = i), (i = s)),
                        (n.prev = 3),
                        (n.next = 6),
                        j(r)
                      );
                    case 6:
                      return (u = n.sent), (n.next = 9), S.PTZ[t](u, i);
                    case 9:
                      return (c = n.sent), n.abrupt("return", c);
                    case 13:
                      throw ((n.prev = 13), (n.t0 = n.catch(3)), n.t0, n.t0);
                    case 17:
                      return (n.prev = 17), n.finish(17);
                    case 19:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[3, 13, 17, 19]]
            );
          })
        )();
      },
    };
    var z = new L();
    e.default = z;
  },
  function (t, e, n) {
    var r = n(12).default;
    function i(t) {
      if ("function" !== typeof WeakMap) return null;
      var e = new WeakMap(),
        n = new WeakMap();
      return (i = function (t) {
        return t ? n : e;
      })(t);
    }
    (t.exports = function (t, e) {
      if (!e && t && t.__esModule) return t;
      if (null === t || ("object" !== r(t) && "function" !== typeof t))
        return { default: t };
      var n = i(e);
      if (n && n.has(t)) return n.get(t);
      var o = {},
        a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var s in t)
        if ("default" !== s && Object.prototype.hasOwnProperty.call(t, s)) {
          var u = a ? Object.getOwnPropertyDescriptor(t, s) : null;
          u && (u.get || u.set)
            ? Object.defineProperty(o, s, u)
            : (o[s] = t[s]);
        }
      return (o.default = t), n && n.set(t, o), o;
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    var r = n(93)();
    t.exports = r;
    try {
      regeneratorRuntime = r;
    } catch (t) {
      "object" === typeof globalThis
        ? (globalThis.regeneratorRuntime = r)
        : Function("r", "regeneratorRuntime = r")(r);
    }
  },
  function (t, e, n) {
    var r = n(12).default;
    function i() {
      "use strict";
      (t.exports = i =
        function () {
          return e;
        }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
      var e = {},
        n = Object.prototype,
        o = n.hasOwnProperty,
        a = "function" == typeof Symbol ? Symbol : {},
        s = a.iterator || "@@iterator",
        u = a.asyncIterator || "@@asyncIterator",
        c = a.toStringTag || "@@toStringTag";
      function l(t, e, n) {
        return (
          Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        l({}, "");
      } catch (t) {
        l = function (t, e, n) {
          return (t[e] = n);
        };
      }
      function f(t, e, n, r) {
        var i = e && e.prototype instanceof p ? e : p,
          o = Object.create(i.prototype),
          a = new R(r || []);
        return (
          (o._invoke = (function (t, e, n) {
            var r = "suspendedStart";
            return function (i, o) {
              if ("executing" === r)
                throw new Error("Generator is already running");
              if ("completed" === r) {
                if ("throw" === i) throw o;
                return k();
              }
              for (n.method = i, n.arg = o; ; ) {
                var a = n.delegate;
                if (a) {
                  var s = x(a, n);
                  if (s) {
                    if (s === d) continue;
                    return s;
                  }
                }
                if ("next" === n.method) n.sent = n._sent = n.arg;
                else if ("throw" === n.method) {
                  if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
                  n.dispatchException(n.arg);
                } else "return" === n.method && n.abrupt("return", n.arg);
                r = "executing";
                var u = h(t, e, n);
                if ("normal" === u.type) {
                  if (
                    ((r = n.done ? "completed" : "suspendedYield"), u.arg === d)
                  )
                    continue;
                  return { value: u.arg, done: n.done };
                }
                "throw" === u.type &&
                  ((r = "completed"), (n.method = "throw"), (n.arg = u.arg));
              }
            };
          })(t, n, a)),
          o
        );
      }
      function h(t, e, n) {
        try {
          return { type: "normal", arg: t.call(e, n) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = f;
      var d = {};
      function p() {}
      function v() {}
      function g() {}
      var m = {};
      l(m, s, function () {
        return this;
      });
      var y = Object.getPrototypeOf,
        b = y && y(y(_([])));
      b && b !== n && o.call(b, s) && (m = b);
      var w = (g.prototype = p.prototype = Object.create(m));
      function S(t) {
        ["next", "throw", "return"].forEach(function (e) {
          l(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function T(t, e) {
        var n;
        this._invoke = function (i, a) {
          function s() {
            return new e(function (n, s) {
              !(function n(i, a, s, u) {
                var c = h(t[i], t, a);
                if ("throw" !== c.type) {
                  var l = c.arg,
                    f = l.value;
                  return f && "object" == r(f) && o.call(f, "__await")
                    ? e.resolve(f.__await).then(
                        function (t) {
                          n("next", t, s, u);
                        },
                        function (t) {
                          n("throw", t, s, u);
                        }
                      )
                    : e.resolve(f).then(
                        function (t) {
                          (l.value = t), s(l);
                        },
                        function (t) {
                          return n("throw", t, s, u);
                        }
                      );
                }
                u(c.arg);
              })(i, a, n, s);
            });
          }
          return (n = n ? n.then(s, s) : s());
        };
      }
      function x(t, e) {
        var n = t.iterator[e.method];
        if (void 0 === n) {
          if (((e.delegate = null), "throw" === e.method)) {
            if (
              t.iterator.return &&
              ((e.method = "return"),
              (e.arg = void 0),
              x(t, e),
              "throw" === e.method)
            )
              return d;
            (e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return d;
        }
        var r = h(n, t.iterator, e.arg);
        if ("throw" === r.type)
          return (e.method = "throw"), (e.arg = r.arg), (e.delegate = null), d;
        var i = r.arg;
        return i
          ? i.done
            ? ((e[t.resultName] = i.value),
              (e.next = t.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
              (e.delegate = null),
              d)
            : i
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            d);
      }
      function E(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function A(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function R(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(E, this),
          this.reset(!0);
      }
      function _(t) {
        if (t) {
          var e = t[s];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var n = -1,
              r = function e() {
                for (; ++n < t.length; )
                  if (o.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
                return (e.value = void 0), (e.done = !0), e;
              };
            return (r.next = r);
          }
        }
        return { next: k };
      }
      function k() {
        return { value: void 0, done: !0 };
      }
      return (
        (v.prototype = g),
        l(w, "constructor", g),
        l(g, "constructor", v),
        (v.displayName = l(g, c, "GeneratorFunction")),
        (e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === v || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (e.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, g)
              : ((t.__proto__ = g), l(t, c, "GeneratorFunction")),
            (t.prototype = Object.create(w)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        S(T.prototype),
        l(T.prototype, u, function () {
          return this;
        }),
        (e.AsyncIterator = T),
        (e.async = function (t, n, r, i, o) {
          void 0 === o && (o = Promise);
          var a = new T(f(t, n, r, i), o);
          return e.isGeneratorFunction(n)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        S(w),
        l(w, c, "Generator"),
        l(w, s, function () {
          return this;
        }),
        l(w, "toString", function () {
          return "[object Generator]";
        }),
        (e.keys = function (t) {
          var e = [];
          for (var n in t) e.push(n);
          return (
            e.reverse(),
            function n() {
              for (; e.length; ) {
                var r = e.pop();
                if (r in t) return (n.value = r), (n.done = !1), n;
              }
              return (n.done = !0), n;
            }
          );
        }),
        (e.values = _),
        (R.prototype = {
          constructor: R,
          reset: function (t) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = void 0),
              this.tryEntries.forEach(A),
              !t)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  o.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = void 0);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (t) {
            if (this.done) throw t;
            var e = this;
            function n(n, r) {
              return (
                (a.type = "throw"),
                (a.arg = t),
                (e.next = n),
                r && ((e.method = "next"), (e.arg = void 0)),
                !!r
              );
            }
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var i = this.tryEntries[r],
                a = i.completion;
              if ("root" === i.tryLoc) return n("end");
              if (i.tryLoc <= this.prev) {
                var s = o.call(i, "catchLoc"),
                  u = o.call(i, "finallyLoc");
                if (s && u) {
                  if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                  if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                } else if (s) {
                  if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                } else {
                  if (!u)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var r = this.tryEntries[n];
              if (
                r.tryLoc <= this.prev &&
                o.call(r, "finallyLoc") &&
                this.prev < r.finallyLoc
              ) {
                var i = r;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= e &&
              e <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), d)
                : this.complete(a)
            );
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && e && (this.next = e),
              d
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.finallyLoc === t)
                return this.complete(n.completion, n.afterLoc), A(n), d;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.tryLoc === t) {
                var r = n.completion;
                if ("throw" === r.type) {
                  var i = r.arg;
                  A(n);
                }
                return i;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (t, e, n) {
            return (
              (this.delegate = { iterator: _(t), resultName: e, nextLoc: n }),
              "next" === this.method && (this.arg = void 0),
              d
            );
          },
        }),
        e
      );
    }
    (t.exports = i),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    var r = n(42);
    (t.exports = function (t) {
      if (Array.isArray(t)) return r(t);
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e) {
    (t.exports = function (t) {
      if (
        ("undefined" !== typeof Symbol && null != t[Symbol.iterator]) ||
        null != t["@@iterator"]
      )
        return Array.from(t);
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    var r = n(42);
    (t.exports = function (t, e) {
      if (t) {
        if ("string" === typeof t) return r(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? r(t, e)
            : void 0
        );
      }
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e) {
    (t.exports = function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e) {
    function n(t, e, n, r, i, o, a) {
      try {
        var s = t[o](a),
          u = s.value;
      } catch (t) {
        return void n(t);
      }
      s.done ? e(u) : Promise.resolve(u).then(r, i);
    }
    (t.exports = function (t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (i, o) {
          var a = t.apply(e, r);
          function s(t) {
            n(a, i, o, s, u, "next", t);
          }
          function u(t) {
            n(a, i, o, s, u, "throw", t);
          }
          s(void 0);
        });
      };
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    "use strict";
    var r = n(9),
      i = n(44),
      o = n(100),
      a = n(53);
    var s = (function t(e) {
      var n = new o(e),
        s = i(o.prototype.request, n);
      return (
        r.extend(s, o.prototype, n),
        r.extend(s, n),
        (s.create = function (n) {
          return t(a(e, n));
        }),
        s
      );
    })(n(27));
    (s.Axios = o),
      (s.CanceledError = n(20)),
      (s.CancelToken = n(117)),
      (s.isCancel = n(52)),
      (s.VERSION = n(54).version),
      (s.toFormData = n(48)),
      (s.AxiosError = n(13)),
      (s.Cancel = s.CanceledError),
      (s.all = function (t) {
        return Promise.all(t);
      }),
      (s.spread = n(118)),
      (s.isAxiosError = n(119)),
      (t.exports = s),
      (t.exports.default = s);
  },
  function (t, e, n) {
    "use strict";
    var r = n(9),
      i = n(45),
      o = n(101),
      a = n(102),
      s = n(53),
      u = n(51),
      c = n(116),
      l = c.validators;
    function f(t) {
      (this.defaults = t),
        (this.interceptors = { request: new o(), response: new o() });
    }
    (f.prototype.request = function (t, e) {
      "string" === typeof t ? ((e = e || {}).url = t) : (e = t || {}),
        (e = s(this.defaults, e)).method
          ? (e.method = e.method.toLowerCase())
          : this.defaults.method
          ? (e.method = this.defaults.method.toLowerCase())
          : (e.method = "get");
      var n = e.transitional;
      void 0 !== n &&
        c.assertOptions(
          n,
          {
            silentJSONParsing: l.transitional(l.boolean),
            forcedJSONParsing: l.transitional(l.boolean),
            clarifyTimeoutError: l.transitional(l.boolean),
          },
          !1
        );
      var r = [],
        i = !0;
      this.interceptors.request.forEach(function (t) {
        ("function" === typeof t.runWhen && !1 === t.runWhen(e)) ||
          ((i = i && t.synchronous), r.unshift(t.fulfilled, t.rejected));
      });
      var o,
        u = [];
      if (
        (this.interceptors.response.forEach(function (t) {
          u.push(t.fulfilled, t.rejected);
        }),
        !i)
      ) {
        var f = [a, void 0];
        for (
          Array.prototype.unshift.apply(f, r),
            f = f.concat(u),
            o = Promise.resolve(e);
          f.length;

        )
          o = o.then(f.shift(), f.shift());
        return o;
      }
      for (var h = e; r.length; ) {
        var d = r.shift(),
          p = r.shift();
        try {
          h = d(h);
        } catch (t) {
          p(t);
          break;
        }
      }
      try {
        o = a(h);
      } catch (t) {
        return Promise.reject(t);
      }
      for (; u.length; ) o = o.then(u.shift(), u.shift());
      return o;
    }),
      (f.prototype.getUri = function (t) {
        t = s(this.defaults, t);
        var e = u(t.baseURL, t.url);
        return i(e, t.params, t.paramsSerializer);
      }),
      r.forEach(["delete", "get", "head", "options"], function (t) {
        f.prototype[t] = function (e, n) {
          return this.request(
            s(n || {}, { method: t, url: e, data: (n || {}).data })
          );
        };
      }),
      r.forEach(["post", "put", "patch"], function (t) {
        function e(e) {
          return function (n, r, i) {
            return this.request(
              s(i || {}, {
                method: t,
                headers: e ? { "Content-Type": "multipart/form-data" } : {},
                url: n,
                data: r,
              })
            );
          };
        }
        (f.prototype[t] = e()), (f.prototype[t + "Form"] = e(!0));
      }),
      (t.exports = f);
  },
  function (t, e, n) {
    "use strict";
    var r = n(9);
    function i() {
      this.handlers = [];
    }
    (i.prototype.use = function (t, e, n) {
      return (
        this.handlers.push({
          fulfilled: t,
          rejected: e,
          synchronous: !!n && n.synchronous,
          runWhen: n ? n.runWhen : null,
        }),
        this.handlers.length - 1
      );
    }),
      (i.prototype.eject = function (t) {
        this.handlers[t] && (this.handlers[t] = null);
      }),
      (i.prototype.forEach = function (t) {
        r.forEach(this.handlers, function (e) {
          null !== e && t(e);
        });
      }),
      (t.exports = i);
  },
  function (t, e, n) {
    "use strict";
    var r = n(9),
      i = n(103),
      o = n(52),
      a = n(27),
      s = n(20);
    function u(t) {
      if (
        (t.cancelToken && t.cancelToken.throwIfRequested(),
        t.signal && t.signal.aborted)
      )
        throw new s();
    }
    t.exports = function (t) {
      return (
        u(t),
        (t.headers = t.headers || {}),
        (t.data = i.call(t, t.data, t.headers, t.transformRequest)),
        (t.headers = r.merge(
          t.headers.common || {},
          t.headers[t.method] || {},
          t.headers
        )),
        r.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          function (e) {
            delete t.headers[e];
          }
        ),
        (t.adapter || a.adapter)(t).then(
          function (e) {
            return (
              u(t),
              (e.data = i.call(t, e.data, e.headers, t.transformResponse)),
              e
            );
          },
          function (e) {
            return (
              o(e) ||
                (u(t),
                e &&
                  e.response &&
                  (e.response.data = i.call(
                    t,
                    e.response.data,
                    e.response.headers,
                    t.transformResponse
                  ))),
              Promise.reject(e)
            );
          }
        )
      );
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(9),
      i = n(27);
    t.exports = function (t, e, n) {
      var o = this || i;
      return (
        r.forEach(n, function (n) {
          t = n.call(o, t, e);
        }),
        t
      );
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(9);
    t.exports = function (t, e) {
      r.forEach(t, function (n, r) {
        r !== e &&
          r.toUpperCase() === e.toUpperCase() &&
          ((t[e] = n), delete t[r]);
      });
    };
  },
  function (t, e, n) {
    "use strict";
    (e.byteLength = function (t) {
      var e = c(t),
        n = e[0],
        r = e[1];
      return (3 * (n + r)) / 4 - r;
    }),
      (e.toByteArray = function (t) {
        var e,
          n,
          r = c(t),
          a = r[0],
          s = r[1],
          u = new o(
            (function (t, e, n) {
              return (3 * (e + n)) / 4 - n;
            })(0, a, s)
          ),
          l = 0,
          f = s > 0 ? a - 4 : a;
        for (n = 0; n < f; n += 4)
          (e =
            (i[t.charCodeAt(n)] << 18) |
            (i[t.charCodeAt(n + 1)] << 12) |
            (i[t.charCodeAt(n + 2)] << 6) |
            i[t.charCodeAt(n + 3)]),
            (u[l++] = (e >> 16) & 255),
            (u[l++] = (e >> 8) & 255),
            (u[l++] = 255 & e);
        2 === s &&
          ((e = (i[t.charCodeAt(n)] << 2) | (i[t.charCodeAt(n + 1)] >> 4)),
          (u[l++] = 255 & e));
        1 === s &&
          ((e =
            (i[t.charCodeAt(n)] << 10) |
            (i[t.charCodeAt(n + 1)] << 4) |
            (i[t.charCodeAt(n + 2)] >> 2)),
          (u[l++] = (e >> 8) & 255),
          (u[l++] = 255 & e));
        return u;
      }),
      (e.fromByteArray = function (t) {
        for (
          var e, n = t.length, i = n % 3, o = [], a = 0, s = n - i;
          a < s;
          a += 16383
        )
          o.push(l(t, a, a + 16383 > s ? s : a + 16383));
        1 === i
          ? ((e = t[n - 1]), o.push(r[e >> 2] + r[(e << 4) & 63] + "=="))
          : 2 === i &&
            ((e = (t[n - 2] << 8) + t[n - 1]),
            o.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + "="));
        return o.join("");
      });
    for (
      var r = [],
        i = [],
        o = "undefined" !== typeof Uint8Array ? Uint8Array : Array,
        a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        s = 0,
        u = a.length;
      s < u;
      ++s
    )
      (r[s] = a[s]), (i[a.charCodeAt(s)] = s);
    function c(t) {
      var e = t.length;
      if (e % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var n = t.indexOf("=");
      return -1 === n && (n = e), [n, n === e ? 0 : 4 - (n % 4)];
    }
    function l(t, e, n) {
      for (var i, o, a = [], s = e; s < n; s += 3)
        (i =
          ((t[s] << 16) & 16711680) +
          ((t[s + 1] << 8) & 65280) +
          (255 & t[s + 2])),
          a.push(
            r[((o = i) >> 18) & 63] +
              r[(o >> 12) & 63] +
              r[(o >> 6) & 63] +
              r[63 & o]
          );
      return a.join("");
    }
    (i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63);
  },
  function (t, e) {
    (e.read = function (t, e, n, r, i) {
      var o,
        a,
        s = 8 * i - r - 1,
        u = (1 << s) - 1,
        c = u >> 1,
        l = -7,
        f = n ? i - 1 : 0,
        h = n ? -1 : 1,
        d = t[e + f];
      for (
        f += h, o = d & ((1 << -l) - 1), d >>= -l, l += s;
        l > 0;
        o = 256 * o + t[e + f], f += h, l -= 8
      );
      for (
        a = o & ((1 << -l) - 1), o >>= -l, l += r;
        l > 0;
        a = 256 * a + t[e + f], f += h, l -= 8
      );
      if (0 === o) o = 1 - c;
      else {
        if (o === u) return a ? NaN : (1 / 0) * (d ? -1 : 1);
        (a += Math.pow(2, r)), (o -= c);
      }
      return (d ? -1 : 1) * a * Math.pow(2, o - r);
    }),
      (e.write = function (t, e, n, r, i, o) {
        var a,
          s,
          u,
          c = 8 * o - i - 1,
          l = (1 << c) - 1,
          f = l >> 1,
          h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          d = r ? 0 : o - 1,
          p = r ? 1 : -1,
          v = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
        for (
          e = Math.abs(e),
            isNaN(e) || e === 1 / 0
              ? ((s = isNaN(e) ? 1 : 0), (a = l))
              : ((a = Math.floor(Math.log(e) / Math.LN2)),
                e * (u = Math.pow(2, -a)) < 1 && (a--, (u *= 2)),
                (e += a + f >= 1 ? h / u : h * Math.pow(2, 1 - f)) * u >= 2 &&
                  (a++, (u /= 2)),
                a + f >= l
                  ? ((s = 0), (a = l))
                  : a + f >= 1
                  ? ((s = (e * u - 1) * Math.pow(2, i)), (a += f))
                  : ((s = e * Math.pow(2, f - 1) * Math.pow(2, i)), (a = 0)));
          i >= 8;
          t[n + d] = 255 & s, d += p, s /= 256, i -= 8
        );
        for (
          a = (a << i) | s, c += i;
          c > 0;
          t[n + d] = 255 & a, d += p, a /= 256, c -= 8
        );
        t[n + d - p] |= 128 * v;
      });
  },
  function (t, e) {
    var n = {}.toString;
    t.exports =
      Array.isArray ||
      function (t) {
        return "[object Array]" == n.call(t);
      };
  },
  function (t, e, n) {
    "use strict";
    var r = n(13);
    t.exports = function (t, e, n) {
      var i = n.config.validateStatus;
      n.status && i && !i(n.status)
        ? e(
            new r(
              "Request failed with status code " + n.status,
              [r.ERR_BAD_REQUEST, r.ERR_BAD_RESPONSE][
                Math.floor(n.status / 100) - 4
              ],
              n.config,
              n.request,
              n
            )
          )
        : t(n);
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(9);
    t.exports = r.isStandardBrowserEnv()
      ? {
          write: function (t, e, n, i, o, a) {
            var s = [];
            s.push(t + "=" + encodeURIComponent(e)),
              r.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()),
              r.isString(i) && s.push("path=" + i),
              r.isString(o) && s.push("domain=" + o),
              !0 === a && s.push("secure"),
              (document.cookie = s.join("; "));
          },
          read: function (t) {
            var e = document.cookie.match(
              new RegExp("(^|;\\s*)(" + t + ")=([^;]*)")
            );
            return e ? decodeURIComponent(e[3]) : null;
          },
          remove: function (t) {
            this.write(t, "", Date.now() - 864e5);
          },
        }
      : {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        };
  },
  function (t, e, n) {
    "use strict";
    t.exports = function (t) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
    };
  },
  function (t, e, n) {
    "use strict";
    t.exports = function (t, e) {
      return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(9),
      i = [
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent",
      ];
    t.exports = function (t) {
      var e,
        n,
        o,
        a = {};
      return t
        ? (r.forEach(t.split("\n"), function (t) {
            if (
              ((o = t.indexOf(":")),
              (e = r.trim(t.substr(0, o)).toLowerCase()),
              (n = r.trim(t.substr(o + 1))),
              e)
            ) {
              if (a[e] && i.indexOf(e) >= 0) return;
              a[e] =
                "set-cookie" === e
                  ? (a[e] ? a[e] : []).concat([n])
                  : a[e]
                  ? a[e] + ", " + n
                  : n;
            }
          }),
          a)
        : a;
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(9);
    t.exports = r.isStandardBrowserEnv()
      ? (function () {
          var t,
            e = /(msie|trident)/i.test(navigator.userAgent),
            n = document.createElement("a");
          function i(t) {
            var r = t;
            return (
              e && (n.setAttribute("href", r), (r = n.href)),
              n.setAttribute("href", r),
              {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname:
                  "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname,
              }
            );
          }
          return (
            (t = i(window.location.href)),
            function (e) {
              var n = r.isString(e) ? i(e) : e;
              return n.protocol === t.protocol && n.host === t.host;
            }
          );
        })()
      : function () {
          return !0;
        };
  },
  function (t, e, n) {
    "use strict";
    t.exports = function (t) {
      var e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
      return (e && e[1]) || "";
    };
  },
  function (t, e) {
    t.exports = null;
  },
  function (t, e, n) {
    "use strict";
    var r = n(54).version,
      i = n(13),
      o = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(
      function (t, e) {
        o[t] = function (n) {
          return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
        };
      }
    );
    var a = {};
    (o.transitional = function (t, e, n) {
      function o(t, e) {
        return (
          "[Axios v" +
          r +
          "] Transitional option '" +
          t +
          "'" +
          e +
          (n ? ". " + n : "")
        );
      }
      return function (n, r, s) {
        if (!1 === t)
          throw new i(
            o(r, " has been removed" + (e ? " in " + e : "")),
            i.ERR_DEPRECATED
          );
        return (
          e &&
            !a[r] &&
            ((a[r] = !0),
            console.warn(
              o(
                r,
                " has been deprecated since v" +
                  e +
                  " and will be removed in the near future"
              )
            )),
          !t || t(n, r, s)
        );
      };
    }),
      (t.exports = {
        assertOptions: function (t, e, n) {
          if ("object" !== typeof t)
            throw new i("options must be an object", i.ERR_BAD_OPTION_VALUE);
          for (var r = Object.keys(t), o = r.length; o-- > 0; ) {
            var a = r[o],
              s = e[a];
            if (s) {
              var u = t[a],
                c = void 0 === u || s(u, a, t);
              if (!0 !== c)
                throw new i(
                  "option " + a + " must be " + c,
                  i.ERR_BAD_OPTION_VALUE
                );
            } else if (!0 !== n)
              throw new i("Unknown option " + a, i.ERR_BAD_OPTION);
          }
        },
        validators: o,
      });
  },
  function (t, e, n) {
    "use strict";
    var r = n(20);
    function i(t) {
      if ("function" !== typeof t)
        throw new TypeError("executor must be a function.");
      var e;
      this.promise = new Promise(function (t) {
        e = t;
      });
      var n = this;
      this.promise.then(function (t) {
        if (n._listeners) {
          var e,
            r = n._listeners.length;
          for (e = 0; e < r; e++) n._listeners[e](t);
          n._listeners = null;
        }
      }),
        (this.promise.then = function (t) {
          var e,
            r = new Promise(function (t) {
              n.subscribe(t), (e = t);
            }).then(t);
          return (
            (r.cancel = function () {
              n.unsubscribe(e);
            }),
            r
          );
        }),
        t(function (t) {
          n.reason || ((n.reason = new r(t)), e(n.reason));
        });
    }
    (i.prototype.throwIfRequested = function () {
      if (this.reason) throw this.reason;
    }),
      (i.prototype.subscribe = function (t) {
        this.reason
          ? t(this.reason)
          : this._listeners
          ? this._listeners.push(t)
          : (this._listeners = [t]);
      }),
      (i.prototype.unsubscribe = function (t) {
        if (this._listeners) {
          var e = this._listeners.indexOf(t);
          -1 !== e && this._listeners.splice(e, 1);
        }
      }),
      (i.source = function () {
        var t;
        return {
          token: new i(function (e) {
            t = e;
          }),
          cancel: t,
        };
      }),
      (t.exports = i);
  },
  function (t, e, n) {
    "use strict";
    t.exports = function (t) {
      return function (e) {
        return t.apply(null, e);
      };
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(9);
    t.exports = function (t) {
      return r.isObject(t) && !0 === t.isAxiosError;
    };
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.reload = void 0);
    var r = (function (t) {
      var e = Array.prototype.slice.call(arguments, 1) || [];
      return (
        (t = new t()),
        function n() {
          return (
            (e = e.concat(Array.prototype.slice.call(arguments))),
            0 === arguments.length && 0 !== e.length
              ? (t.apply(this, e), void (e = []))
              : n
          );
        }
      );
    })(function () {
      var t = null;
      return function (n) {
        return t || (t = new e(n)), t;
      };
      function e(e) {
        return new Promise(function (n) {
          var r = e.setIsLogin;
          e.$t,
            alert(
              "\u9274\u6743\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002"
            ),
            setTimeout(function () {
              r(!1),
                sessionStorage.setItem("_Anonymous_", 1),
                setTimeout(function () {
                  window.location.reload();
                }, 1e3),
                (t = null),
                n(!0);
            }, 5e3);
        });
      }
    });
    e.reload = r;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = function (t) {
        return o.MD5(t);
      });
    var i = r(n(12));
    if ("undefined" == typeof o) var o = {};
    o.MD5 = function (t) {
      function e(t) {
        var e = (t >>> 0).toString(16);
        return "00000000".substr(0, 8 - e.length) + e;
      }
      function n(t, e, n) {
        return (t & e) | (~t & n);
      }
      function r(t, e, n) {
        return (n & t) | (~n & e);
      }
      function o(t, e, n) {
        return t ^ e ^ n;
      }
      function a(t, e, n) {
        return e ^ (t | ~n);
      }
      function s(t, e) {
        return (t[e + 3] << 24) | (t[e + 2] << 16) | (t[e + 1] << 8) | t[e];
      }
      function u(t) {
        for (var e = [], n = 0; n < t.length; n++)
          if (t.charCodeAt(n) <= 127) e.push(t.charCodeAt(n));
          else
            for (
              var r = encodeURIComponent(t.charAt(n)).substr(1).split("%"),
                i = 0;
              i < r.length;
              i++
            )
              e.push(parseInt(r[i], 16));
        return e;
      }
      function c(t) {
        for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = t[n];
        return e;
      }
      var l = null,
        f = null;
      function h(t, e) {
        return 4294967295 & (t + e);
      }
      return (
        "string" == typeof t
          ? (l = u(t))
          : t.constructor == Array
          ? 0 === t.length
            ? (l = t)
            : "string" == typeof t[0]
            ? (l = (function (t) {
                for (var e = [], n = 0; n < t.length; n++)
                  e = e.concat(u(t[n]));
                return e;
              })(t))
            : "number" == typeof t[0]
            ? (l = t)
            : (f = (0, i.default)(t[0]))
          : "undefined" != typeof ArrayBuffer
          ? t instanceof ArrayBuffer
            ? (l = c(new Uint8Array(t)))
            : t instanceof Uint8Array || t instanceof Int8Array
            ? (l = c(t))
            : t instanceof Uint32Array ||
              t instanceof Int32Array ||
              t instanceof Uint16Array ||
              t instanceof Int16Array ||
              t instanceof Float32Array ||
              t instanceof Float64Array
            ? (l = c(new Uint8Array(t.buffer)))
            : (f = (0, i.default)(t))
          : (f = (0, i.default)(t)),
        f && alert("MD5 type mismatch, cannot process " + f),
        (function () {
          function t(t, e, n, r) {
            var i,
              o,
              a = b;
            (b = y),
              (y = m),
              (m = h(
                m,
                (((i = h(g, h(t, h(e, n)))) << (o = r)) & 4294967295) |
                  (i >>> (32 - o))
              )),
              (g = a);
          }
          var i = l.length;
          l.push(128);
          var u = l.length % 64;
          if (u > 56) {
            for (var c = 0; c < 64 - u; c++) l.push(0);
            u = l.length % 64;
          }
          for (c = 0; c < 56 - u; c++) l.push(0);
          l = l.concat(
            (function (t) {
              for (var e = [], n = 0; n < 8; n++) e.push(255 & t), (t >>>= 8);
              return e;
            })(8 * i)
          );
          var f = 1732584193,
            d = 4023233417,
            p = 2562383102,
            v = 271733878,
            g = 0,
            m = 0,
            y = 0,
            b = 0;
          for (c = 0; c < l.length / 64; c++) {
            g = f;
            var w = 64 * c;
            t(n((m = d), (y = p), (b = v)), 3614090360, s(l, w), 7),
              t(n(m, y, b), 3905402710, s(l, w + 4), 12),
              t(n(m, y, b), 606105819, s(l, w + 8), 17),
              t(n(m, y, b), 3250441966, s(l, w + 12), 22),
              t(n(m, y, b), 4118548399, s(l, w + 16), 7),
              t(n(m, y, b), 1200080426, s(l, w + 20), 12),
              t(n(m, y, b), 2821735955, s(l, w + 24), 17),
              t(n(m, y, b), 4249261313, s(l, w + 28), 22),
              t(n(m, y, b), 1770035416, s(l, w + 32), 7),
              t(n(m, y, b), 2336552879, s(l, w + 36), 12),
              t(n(m, y, b), 4294925233, s(l, w + 40), 17),
              t(n(m, y, b), 2304563134, s(l, w + 44), 22),
              t(n(m, y, b), 1804603682, s(l, w + 48), 7),
              t(n(m, y, b), 4254626195, s(l, w + 52), 12),
              t(n(m, y, b), 2792965006, s(l, w + 56), 17),
              t(n(m, y, b), 1236535329, s(l, w + 60), 22),
              t(r(m, y, b), 4129170786, s(l, w + 4), 5),
              t(r(m, y, b), 3225465664, s(l, w + 24), 9),
              t(r(m, y, b), 643717713, s(l, w + 44), 14),
              t(r(m, y, b), 3921069994, s(l, w), 20),
              t(r(m, y, b), 3593408605, s(l, w + 20), 5),
              t(r(m, y, b), 38016083, s(l, w + 40), 9),
              t(r(m, y, b), 3634488961, s(l, w + 60), 14),
              t(r(m, y, b), 3889429448, s(l, w + 16), 20),
              t(r(m, y, b), 568446438, s(l, w + 36), 5),
              t(r(m, y, b), 3275163606, s(l, w + 56), 9),
              t(r(m, y, b), 4107603335, s(l, w + 12), 14),
              t(r(m, y, b), 1163531501, s(l, w + 32), 20),
              t(r(m, y, b), 2850285829, s(l, w + 52), 5),
              t(r(m, y, b), 4243563512, s(l, w + 8), 9),
              t(r(m, y, b), 1735328473, s(l, w + 28), 14),
              t(r(m, y, b), 2368359562, s(l, w + 48), 20),
              t(o(m, y, b), 4294588738, s(l, w + 20), 4),
              t(o(m, y, b), 2272392833, s(l, w + 32), 11),
              t(o(m, y, b), 1839030562, s(l, w + 44), 16),
              t(o(m, y, b), 4259657740, s(l, w + 56), 23),
              t(o(m, y, b), 2763975236, s(l, w + 4), 4),
              t(o(m, y, b), 1272893353, s(l, w + 16), 11),
              t(o(m, y, b), 4139469664, s(l, w + 28), 16),
              t(o(m, y, b), 3200236656, s(l, w + 40), 23),
              t(o(m, y, b), 681279174, s(l, w + 52), 4),
              t(o(m, y, b), 3936430074, s(l, w), 11),
              t(o(m, y, b), 3572445317, s(l, w + 12), 16),
              t(o(m, y, b), 76029189, s(l, w + 24), 23),
              t(o(m, y, b), 3654602809, s(l, w + 36), 4),
              t(o(m, y, b), 3873151461, s(l, w + 48), 11),
              t(o(m, y, b), 530742520, s(l, w + 60), 16),
              t(o(m, y, b), 3299628645, s(l, w + 8), 23),
              t(a(m, y, b), 4096336452, s(l, w), 6),
              t(a(m, y, b), 1126891415, s(l, w + 28), 10),
              t(a(m, y, b), 2878612391, s(l, w + 56), 15),
              t(a(m, y, b), 4237533241, s(l, w + 20), 21),
              t(a(m, y, b), 1700485571, s(l, w + 48), 6),
              t(a(m, y, b), 2399980690, s(l, w + 12), 10),
              t(a(m, y, b), 4293915773, s(l, w + 40), 15),
              t(a(m, y, b), 2240044497, s(l, w + 4), 21),
              t(a(m, y, b), 1873313359, s(l, w + 32), 6),
              t(a(m, y, b), 4264355552, s(l, w + 60), 10),
              t(a(m, y, b), 2734768916, s(l, w + 24), 15),
              t(a(m, y, b), 1309151649, s(l, w + 52), 21),
              t(a(m, y, b), 4149444226, s(l, w + 16), 6),
              t(a(m, y, b), 3174756917, s(l, w + 44), 10),
              t(a(m, y, b), 718787259, s(l, w + 8), 15),
              t(a(m, y, b), 3951481745, s(l, w + 36), 21),
              (f = h(f, g)),
              (d = h(d, m)),
              (p = h(p, y)),
              (v = h(v, b));
          }
          return (function (t, n, r, i) {
            for (var o = "", a = 0, s = 0, u = 3; u >= 0; u--)
              (a = 255 & (s = arguments[u])),
                (a <<= 8),
                (a |= 255 & (s >>>= 8)),
                (a <<= 8),
                (a |= 255 & (s >>>= 8)),
                (a <<= 8),
                (o += e((a |= s >>>= 8)));
            return o;
          })(v, p, d, f).toUpperCase();
        })()
      );
    };
  },
  function (t, e, n) {
    "use strict";
    var r;
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    function i(t, e, n) {
      null != t &&
        ("number" == typeof t
          ? this.fromNumber(t, e, n)
          : null == e && "string" != typeof t
          ? this.fromString(t, 256)
          : this.fromString(t, e));
    }
    function o() {
      return new i(null);
    }
    "Microsoft Internet Explorer" == navigator.appName
      ? ((i.prototype.am = function (t, e, n, r, i, o) {
          for (var a = 32767 & e, s = e >> 15; --o >= 0; ) {
            var u = 32767 & this[t],
              c = this[t++] >> 15,
              l = s * u + c * a;
            (i =
              ((u = a * u + ((32767 & l) << 15) + n[r] + (1073741823 & i)) >>>
                30) +
              (l >>> 15) +
              s * c +
              (i >>> 30)),
              (n[r++] = 1073741823 & u);
          }
          return i;
        }),
        (r = 30))
      : "Netscape" != navigator.appName
      ? ((i.prototype.am = function (t, e, n, r, i, o) {
          for (; --o >= 0; ) {
            var a = e * this[t++] + n[r] + i;
            (i = Math.floor(a / 67108864)), (n[r++] = 67108863 & a);
          }
          return i;
        }),
        (r = 26))
      : ((i.prototype.am = function (t, e, n, r, i, o) {
          for (var a = 16383 & e, s = e >> 14; --o >= 0; ) {
            var u = 16383 & this[t],
              c = this[t++] >> 14,
              l = s * u + c * a;
            (i =
              ((u = a * u + ((16383 & l) << 14) + n[r] + i) >> 28) +
              (l >> 14) +
              s * c),
              (n[r++] = 268435455 & u);
          }
          return i;
        }),
        (r = 28)),
      (i.prototype.DB = r),
      (i.prototype.DM = (1 << r) - 1),
      (i.prototype.DV = 1 << r);
    (i.prototype.FV = Math.pow(2, 52)),
      (i.prototype.F1 = 52 - r),
      (i.prototype.F2 = 2 * r - 52);
    var a,
      s,
      u = "0123456789abcdefghijklmnopqrstuvwxyz",
      c = new Array();
    for (a = "0".charCodeAt(0), s = 0; s <= 9; ++s) c[a++] = s;
    for (a = "a".charCodeAt(0), s = 10; s < 36; ++s) c[a++] = s;
    for (a = "A".charCodeAt(0), s = 10; s < 36; ++s) c[a++] = s;
    function l(t) {
      return u.charAt(t);
    }
    function f(t, e) {
      var n = c[t.charCodeAt(e)];
      return null == n ? -1 : n;
    }
    function h(t) {
      var e = o();
      return e.fromInt(t), e;
    }
    function d(t) {
      var e,
        n = 1;
      return (
        0 != (e = t >>> 16) && ((t = e), (n += 16)),
        0 != (e = t >> 8) && ((t = e), (n += 8)),
        0 != (e = t >> 4) && ((t = e), (n += 4)),
        0 != (e = t >> 2) && ((t = e), (n += 2)),
        0 != (e = t >> 1) && ((t = e), (n += 1)),
        n
      );
    }
    function p(t) {
      this.m = t;
    }
    function v(t) {
      (this.m = t),
        (this.mp = t.invDigit()),
        (this.mpl = 32767 & this.mp),
        (this.mph = this.mp >> 15),
        (this.um = (1 << (t.DB - 15)) - 1),
        (this.mt2 = 2 * t.t);
    }
    function g() {
      (this.i = 0), (this.j = 0), (this.S = new Array());
    }
    (p.prototype.convert = function (t) {
      return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
    }),
      (p.prototype.revert = function (t) {
        return t;
      }),
      (p.prototype.reduce = function (t) {
        t.divRemTo(this.m, null, t);
      }),
      (p.prototype.mulTo = function (t, e, n) {
        t.multiplyTo(e, n), this.reduce(n);
      }),
      (p.prototype.sqrTo = function (t, e) {
        t.squareTo(e), this.reduce(e);
      }),
      (v.prototype.convert = function (t) {
        var e = o();
        return (
          t.abs().dlShiftTo(this.m.t, e),
          e.divRemTo(this.m, null, e),
          t.s < 0 && e.compareTo(i.ZERO) > 0 && this.m.subTo(e, e),
          e
        );
      }),
      (v.prototype.revert = function (t) {
        var e = o();
        return t.copyTo(e), this.reduce(e), e;
      }),
      (v.prototype.reduce = function (t) {
        for (; t.t <= this.mt2; ) t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
          var n = 32767 & t[e],
            r =
              (n * this.mpl +
                (((n * this.mph + (t[e] >> 15) * this.mpl) & this.um) << 15)) &
              t.DM;
          for (
            t[(n = e + this.m.t)] += this.m.am(0, r, t, e, 0, this.m.t);
            t[n] >= t.DV;

          )
            (t[n] -= t.DV), t[++n]++;
        }
        t.clamp(),
          t.drShiftTo(this.m.t, t),
          t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
      }),
      (v.prototype.mulTo = function (t, e, n) {
        t.multiplyTo(e, n), this.reduce(n);
      }),
      (v.prototype.sqrTo = function (t, e) {
        t.squareTo(e), this.reduce(e);
      }),
      (i.prototype.copyTo = function (t) {
        for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
        (t.t = this.t), (t.s = this.s);
      }),
      (i.prototype.fromInt = function (t) {
        (this.t = 1),
          (this.s = t < 0 ? -1 : 0),
          t > 0 ? (this[0] = t) : t < -1 ? (this[0] = t + DV) : (this.t = 0);
      }),
      (i.prototype.fromString = function (t, e) {
        var n;
        if (16 == e) n = 4;
        else if (8 == e) n = 3;
        else if (256 == e) n = 8;
        else if (2 == e) n = 1;
        else if (32 == e) n = 5;
        else {
          if (4 != e) return void this.fromRadix(t, e);
          n = 2;
        }
        (this.t = 0), (this.s = 0);
        for (var r = t.length, o = !1, a = 0; --r >= 0; ) {
          var s = 8 == n ? 255 & t[r] : f(t, r);
          s < 0
            ? "-" == t.charAt(r) && (o = !0)
            : ((o = !1),
              0 == a
                ? (this[this.t++] = s)
                : a + n > this.DB
                ? ((this[this.t - 1] |= (s & ((1 << (this.DB - a)) - 1)) << a),
                  (this[this.t++] = s >> (this.DB - a)))
                : (this[this.t - 1] |= s << a),
              (a += n) >= this.DB && (a -= this.DB));
        }
        8 == n &&
          0 != (128 & t[0]) &&
          ((this.s = -1),
          a > 0 && (this[this.t - 1] |= ((1 << (this.DB - a)) - 1) << a)),
          this.clamp(),
          o && i.ZERO.subTo(this, this);
      }),
      (i.prototype.clamp = function () {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
          --this.t;
      }),
      (i.prototype.dlShiftTo = function (t, e) {
        var n;
        for (n = this.t - 1; n >= 0; --n) e[n + t] = this[n];
        for (n = t - 1; n >= 0; --n) e[n] = 0;
        (e.t = this.t + t), (e.s = this.s);
      }),
      (i.prototype.drShiftTo = function (t, e) {
        for (var n = t; n < this.t; ++n) e[n - t] = this[n];
        (e.t = Math.max(this.t - t, 0)), (e.s = this.s);
      }),
      (i.prototype.lShiftTo = function (t, e) {
        var n,
          r = t % this.DB,
          i = this.DB - r,
          o = (1 << i) - 1,
          a = Math.floor(t / this.DB),
          s = (this.s << r) & this.DM;
        for (n = this.t - 1; n >= 0; --n)
          (e[n + a + 1] = (this[n] >> i) | s), (s = (this[n] & o) << r);
        for (n = a - 1; n >= 0; --n) e[n] = 0;
        (e[a] = s), (e.t = this.t + a + 1), (e.s = this.s), e.clamp();
      }),
      (i.prototype.rShiftTo = function (t, e) {
        e.s = this.s;
        var n = Math.floor(t / this.DB);
        if (n >= this.t) e.t = 0;
        else {
          var r = t % this.DB,
            i = this.DB - r,
            o = (1 << r) - 1;
          e[0] = this[n] >> r;
          for (var a = n + 1; a < this.t; ++a)
            (e[a - n - 1] |= (this[a] & o) << i), (e[a - n] = this[a] >> r);
          r > 0 && (e[this.t - n - 1] |= (this.s & o) << i),
            (e.t = this.t - n),
            e.clamp();
        }
      }),
      (i.prototype.subTo = function (t, e) {
        for (var n = 0, r = 0, i = Math.min(t.t, this.t); n < i; )
          (r += this[n] - t[n]), (e[n++] = r & this.DM), (r >>= this.DB);
        if (t.t < this.t) {
          for (r -= t.s; n < this.t; )
            (r += this[n]), (e[n++] = r & this.DM), (r >>= this.DB);
          r += this.s;
        } else {
          for (r += this.s; n < t.t; )
            (r -= t[n]), (e[n++] = r & this.DM), (r >>= this.DB);
          r -= t.s;
        }
        (e.s = r < 0 ? -1 : 0),
          r < -1 ? (e[n++] = this.DV + r) : r > 0 && (e[n++] = r),
          (e.t = n),
          e.clamp();
      }),
      (i.prototype.multiplyTo = function (t, e) {
        var n = this.abs(),
          r = t.abs(),
          o = n.t;
        for (e.t = o + r.t; --o >= 0; ) e[o] = 0;
        for (o = 0; o < r.t; ++o) e[o + n.t] = n.am(0, r[o], e, o, 0, n.t);
        (e.s = 0), e.clamp(), this.s != t.s && i.ZERO.subTo(e, e);
      }),
      (i.prototype.squareTo = function (t) {
        for (var e = this.abs(), n = (t.t = 2 * e.t); --n >= 0; ) t[n] = 0;
        for (n = 0; n < e.t - 1; ++n) {
          var r = e.am(n, e[n], t, 2 * n, 0, 1);
          (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, r, e.t - n - 1)) >=
            e.DV && ((t[n + e.t] -= e.DV), (t[n + e.t + 1] = 1));
        }
        t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
          (t.s = 0),
          t.clamp();
      }),
      (i.prototype.divRemTo = function (t, e, n) {
        var r = t.abs();
        if (!(r.t <= 0)) {
          var a = this.abs();
          if (a.t < r.t)
            return (
              null != e && e.fromInt(0), void (null != n && this.copyTo(n))
            );
          null == n && (n = o());
          var s = o(),
            u = this.s,
            c = t.s,
            l = this.DB - d(r[r.t - 1]);
          l > 0
            ? (r.lShiftTo(l, s), a.lShiftTo(l, n))
            : (r.copyTo(s), a.copyTo(n));
          var f = s.t,
            h = s[f - 1];
          if (0 != h) {
            var p = h * (1 << this.F1) + (f > 1 ? s[f - 2] >> this.F2 : 0),
              v = this.FV / p,
              g = (1 << this.F1) / p,
              m = 1 << this.F2,
              y = n.t,
              b = y - f,
              w = null == e ? o() : e;
            for (
              s.dlShiftTo(b, w),
                n.compareTo(w) >= 0 && ((n[n.t++] = 1), n.subTo(w, n)),
                i.ONE.dlShiftTo(f, w),
                w.subTo(s, s);
              s.t < f;

            )
              s[s.t++] = 0;
            for (; --b >= 0; ) {
              var S =
                n[--y] == h
                  ? this.DM
                  : Math.floor(n[y] * v + (n[y - 1] + m) * g);
              if ((n[y] += s.am(0, S, n, b, 0, f)) < S)
                for (s.dlShiftTo(b, w), n.subTo(w, n); n[y] < --S; )
                  n.subTo(w, n);
            }
            null != e && (n.drShiftTo(f, e), u != c && i.ZERO.subTo(e, e)),
              (n.t = f),
              n.clamp(),
              l > 0 && n.rShiftTo(l, n),
              u < 0 && i.ZERO.subTo(n, n);
          }
        }
      }),
      (i.prototype.invDigit = function () {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var e = 3 & t;
        return (e =
          ((e =
            ((e =
              ((e = (e * (2 - (15 & t) * e)) & 15) * (2 - (255 & t) * e)) &
              255) *
              (2 - (((65535 & t) * e) & 65535))) &
            65535) *
            (2 - ((t * e) % this.DV))) %
          this.DV) > 0
          ? this.DV - e
          : -e;
      }),
      (i.prototype.isEven = function () {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s);
      }),
      (i.prototype.exp = function (t, e) {
        if (t > 4294967295 || t < 1) return i.ONE;
        var n = o(),
          r = o(),
          a = e.convert(this),
          s = d(t) - 1;
        for (a.copyTo(n); --s >= 0; )
          if ((e.sqrTo(n, r), (t & (1 << s)) > 0)) e.mulTo(r, a, n);
          else {
            var u = n;
            (n = r), (r = u);
          }
        return e.revert(n);
      }),
      (i.prototype.toString = function (t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var e;
        if (16 == t) e = 4;
        else if (8 == t) e = 3;
        else if (2 == t) e = 1;
        else if (32 == t) e = 5;
        else {
          if (4 != t) return this.toRadix(t);
          e = 2;
        }
        var n,
          r = (1 << e) - 1,
          i = !1,
          o = "",
          a = this.t,
          s = this.DB - ((a * this.DB) % e);
        if (a-- > 0)
          for (
            s < this.DB && (n = this[a] >> s) > 0 && ((i = !0), (o = l(n)));
            a >= 0;

          )
            s < e
              ? ((n = (this[a] & ((1 << s) - 1)) << (e - s)),
                (n |= this[--a] >> (s += this.DB - e)))
              : ((n = (this[a] >> (s -= e)) & r),
                s <= 0 && ((s += this.DB), --a)),
              n > 0 && (i = !0),
              i && (o += l(n));
        return i ? o : "0";
      }),
      (i.prototype.negate = function () {
        var t = o();
        return i.ZERO.subTo(this, t), t;
      }),
      (i.prototype.abs = function () {
        return this.s < 0 ? this.negate() : this;
      }),
      (i.prototype.compareTo = function (t) {
        var e = this.s - t.s;
        if (0 != e) return e;
        var n = this.t;
        if (0 != (e = n - t.t)) return e;
        for (; --n >= 0; ) if (0 != (e = this[n] - t[n])) return e;
        return 0;
      }),
      (i.prototype.bitLength = function () {
        return this.t <= 0
          ? 0
          : this.DB * (this.t - 1) + d(this[this.t - 1] ^ (this.s & this.DM));
      }),
      (i.prototype.mod = function (t) {
        var e = o();
        return (
          this.abs().divRemTo(t, null, e),
          this.s < 0 && e.compareTo(i.ZERO) > 0 && t.subTo(e, e),
          e
        );
      }),
      (i.prototype.modPowInt = function (t, e) {
        var n;
        return (
          (n = t < 256 || e.isEven() ? new p(e) : new v(e)), this.exp(t, n)
        );
      }),
      (i.ZERO = h(0)),
      (i.ONE = h(1)),
      (g.prototype.init = function (t) {
        var e, n, r;
        for (e = 0; e < 256; ++e) this.S[e] = e;
        for (n = 0, e = 0; e < 256; ++e)
          (n = (n + this.S[e] + t[e % t.length]) & 255),
            (r = this.S[e]),
            (this.S[e] = this.S[n]),
            (this.S[n] = r);
        (this.i = 0), (this.j = 0);
      }),
      (g.prototype.next = function () {
        var t;
        return (
          (this.i = (this.i + 1) & 255),
          (this.j = (this.j + this.S[this.i]) & 255),
          (t = this.S[this.i]),
          (this.S[this.i] = this.S[this.j]),
          (this.S[this.j] = t),
          this.S[(t + this.S[this.i]) & 255]
        );
      });
    var m,
      y,
      b,
      w = 256;
    function S() {
      var t;
      (t = new Date().getTime()),
        (y[b++] ^= 255 & t),
        (y[b++] ^= (t >> 8) & 255),
        (y[b++] ^= (t >> 16) & 255),
        (y[b++] ^= (t >> 24) & 255),
        b >= w && (b -= w);
    }
    if (null == y) {
      var T;
      if (
        ((y = new Array()),
        (b = 0),
        "Netscape" == navigator.appName &&
          navigator.appVersion < "5" &&
          window.crypto)
      ) {
        var x = window.crypto.random(32);
        for (T = 0; T < x.length; ++T) y[b++] = 255 & x.charCodeAt(T);
      }
      for (; b < w; )
        (T = Math.floor(65536 * Math.random())),
          (y[b++] = T >>> 8),
          (y[b++] = 255 & T);
      (b = 0), S();
    }
    function E() {
      if (null == m) {
        for (S(), (m = new g()).init(y), b = 0; b < y.length; ++b) y[b] = 0;
        b = 0;
      }
      return m.next();
    }
    function A() {}
    function R() {
      (this.n = null),
        (this.e = 0),
        (this.d = null),
        (this.p = null),
        (this.q = null),
        (this.dmp1 = null),
        (this.dmq1 = null),
        (this.coeff = null);
    }
    (A.prototype.nextBytes = function (t) {
      var e;
      for (e = 0; e < t.length; ++e) t[e] = E();
    }),
      (R.prototype.doPublic = function (t) {
        return t.modPowInt(this.e, this.n);
      }),
      (R.prototype.setPublic = function (t, e) {
        null != t && null != e && t.length > 0 && e.length > 0
          ? ((this.n = new i(t, 16)), (this.e = parseInt(e, 16)))
          : alert("Invalid RSA public key");
      }),
      (R.prototype.encrypt = function (t) {
        var e = (function (t, e) {
          if (e < t.length + 11) return alert("Message too long for RSA"), null;
          for (var n = new Array(), r = t.length - 1; r >= 0 && e > 0; ) {
            var o = t.charCodeAt(r--);
            o < 128
              ? (n[--e] = o)
              : o > 127 && o < 2048
              ? ((n[--e] = (63 & o) | 128), (n[--e] = (o >> 6) | 192))
              : ((n[--e] = (63 & o) | 128),
                (n[--e] = ((o >> 6) & 63) | 128),
                (n[--e] = (o >> 12) | 224));
          }
          n[--e] = 0;
          for (var a = new A(), s = new Array(); e > 2; ) {
            for (s[0] = 0; 0 == s[0]; ) a.nextBytes(s);
            n[--e] = s[0];
          }
          return (n[--e] = 2), (n[--e] = 0), new i(n);
        })(t, (this.n.bitLength() + 7) >> 3);
        if (null == e) return null;
        var n = this.doPublic(e);
        if (null == n) return null;
        var r = n.toString(16);
        return 0 == (1 & r.length) ? r : "0" + r;
      });
    var _ = R;
    e.default = _;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r =
      r ||
      (function (t, e) {
        var n = {},
          r = (n.lib = {}),
          i = function () {},
          o = (r.Base = {
            extend: function (t) {
              i.prototype = this;
              var e = new i();
              return (
                t && e.mixIn(t),
                e.hasOwnProperty("init") ||
                  (e.init = function () {
                    e.$super.init.apply(this, arguments);
                  }),
                (e.init.prototype = e),
                (e.$super = this),
                e
              );
            },
            create: function () {
              var t = this.extend();
              return t.init.apply(t, arguments), t;
            },
            init: function () {},
            mixIn: function (t) {
              for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
              t.hasOwnProperty("toString") && (this.toString = t.toString);
            },
            clone: function () {
              return this.init.prototype.extend(this);
            },
          }),
          a = (r.WordArray = o.extend({
            init: function (t, e) {
              (t = this.words = t || []),
                (this.sigBytes = void 0 != e ? e : 4 * t.length);
            },
            toString: function (t) {
              return (t || u).stringify(this);
            },
            concat: function (t) {
              var e = this.words,
                n = t.words,
                r = this.sigBytes;
              if (((t = t.sigBytes), this.clamp(), r % 4))
                for (var i = 0; i < t; i++)
                  e[(r + i) >>> 2] |=
                    ((n[i >>> 2] >>> (24 - (i % 4) * 8)) & 255) <<
                    (24 - ((r + i) % 4) * 8);
              else if (65535 < n.length)
                for (i = 0; i < t; i += 4) e[(r + i) >>> 2] = n[i >>> 2];
              else e.push.apply(e, n);
              return (this.sigBytes += t), this;
            },
            clamp: function () {
              var e = this.words,
                n = this.sigBytes;
              (e[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
                (e.length = t.ceil(n / 4));
            },
            clone: function () {
              var t = o.clone.call(this);
              return (t.words = this.words.slice(0)), t;
            },
            random: function (e) {
              for (var n = [], r = 0; r < e; r += 4)
                n.push((4294967296 * t.random()) | 0);
              return new a.init(n, e);
            },
          })),
          s = (n.enc = {}),
          u = (s.Hex = {
            stringify: function (t) {
              var e = t.words;
              t = t.sigBytes;
              for (var n = [], r = 0; r < t; r++) {
                var i = (e[r >>> 2] >>> (24 - (r % 4) * 8)) & 255;
                n.push((i >>> 4).toString(16)), n.push((15 & i).toString(16));
              }
              return n.join("");
            },
            parse: function (t) {
              for (var e = t.length, n = [], r = 0; r < e; r += 2)
                n[r >>> 3] |=
                  parseInt(t.substr(r, 2), 16) << (24 - (r % 8) * 4);
              return new a.init(n, e / 2);
            },
          }),
          c = (s.Latin1 = {
            stringify: function (t) {
              var e = t.words;
              t = t.sigBytes;
              for (var n = [], r = 0; r < t; r++)
                n.push(
                  String.fromCharCode((e[r >>> 2] >>> (24 - (r % 4) * 8)) & 255)
                );
              return n.join("");
            },
            parse: function (t) {
              for (var e = t.length, n = [], r = 0; r < e; r++)
                n[r >>> 2] |= (255 & t.charCodeAt(r)) << (24 - (r % 4) * 8);
              return new a.init(n, e);
            },
          }),
          l = (s.Utf8 = {
            stringify: function (t) {
              try {
                return decodeURIComponent(escape(c.stringify(t)));
              } catch (t) {
                throw Error("Malformed UTF-8 data");
              }
            },
            parse: function (t) {
              return c.parse(unescape(encodeURIComponent(t)));
            },
          }),
          f = (r.BufferedBlockAlgorithm = o.extend({
            reset: function () {
              (this._data = new a.init()), (this._nDataBytes = 0);
            },
            _append: function (t) {
              "string" == typeof t && (t = l.parse(t)),
                this._data.concat(t),
                (this._nDataBytes += t.sigBytes);
            },
            _process: function (e) {
              var n = this._data,
                r = n.words,
                i = n.sigBytes,
                o = this.blockSize,
                s = i / (4 * o);
              if (
                ((e =
                  (s = e
                    ? t.ceil(s)
                    : t.max((0 | s) - this._minBufferSize, 0)) * o),
                (i = t.min(4 * e, i)),
                e)
              ) {
                for (var u = 0; u < e; u += o) this._doProcessBlock(r, u);
                (u = r.splice(0, e)), (n.sigBytes -= i);
              }
              return new a.init(u, i);
            },
            clone: function () {
              var t = o.clone.call(this);
              return (t._data = this._data.clone()), t;
            },
            _minBufferSize: 0,
          }));
        r.Hasher = f.extend({
          cfg: o.extend(),
          init: function (t) {
            (this.cfg = this.cfg.extend(t)), this.reset();
          },
          reset: function () {
            f.reset.call(this), this._doReset();
          },
          update: function (t) {
            return this._append(t), this._process(), this;
          },
          finalize: function (t) {
            return t && this._append(t), this._doFinalize();
          },
          blockSize: 16,
          _createHelper: function (t) {
            return function (e, n) {
              return new t.init(n).finalize(e);
            };
          },
          _createHmacHelper: function (t) {
            return function (e, n) {
              return new h.HMAC.init(t, n).finalize(e);
            };
          },
        });
        var h = (n.algo = {});
        return n;
      })(Math);
    !(function () {
      var t = r,
        e = t.lib.WordArray;
      t.enc.Base64 = {
        stringify: function (t) {
          var e = t.words,
            n = t.sigBytes,
            r = this._map;
          t.clamp(), (t = []);
          for (var i = 0; i < n; i += 3)
            for (
              var o =
                  (((e[i >>> 2] >>> (24 - (i % 4) * 8)) & 255) << 16) |
                  (((e[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 255) <<
                    8) |
                  ((e[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 255),
                a = 0;
              4 > a && i + 0.75 * a < n;
              a++
            )
              t.push(r.charAt((o >>> (6 * (3 - a))) & 63));
          if ((e = r.charAt(64))) for (; t.length % 4; ) t.push(e);
          return t.join("");
        },
        parse: function (t) {
          var n = t.length,
            r = this._map;
          (i = r.charAt(64)) && -1 != (i = t.indexOf(i)) && (n = i);
          for (var i = [], o = 0, a = 0; a < n; a++)
            if (a % 4) {
              var s = r.indexOf(t.charAt(a - 1)) << ((a % 4) * 2),
                u = r.indexOf(t.charAt(a)) >>> (6 - (a % 4) * 2);
              (i[o >>> 2] |= (s | u) << (24 - (o % 4) * 8)), o++;
            }
          return e.create(i, o);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      };
    })(),
      (function (t) {
        function e(t, e, n, r, i, o, a) {
          return (
            (((t = t + ((e & n) | (~e & r)) + i + a) << o) | (t >>> (32 - o))) +
            e
          );
        }
        function n(t, e, n, r, i, o, a) {
          return (
            (((t = t + ((e & r) | (n & ~r)) + i + a) << o) | (t >>> (32 - o))) +
            e
          );
        }
        function i(t, e, n, r, i, o, a) {
          return (((t = t + (e ^ n ^ r) + i + a) << o) | (t >>> (32 - o))) + e;
        }
        function o(t, e, n, r, i, o, a) {
          return (
            (((t = t + (n ^ (e | ~r)) + i + a) << o) | (t >>> (32 - o))) + e
          );
        }
        for (
          var a = r,
            s = (c = a.lib).WordArray,
            u = c.Hasher,
            c = a.algo,
            l = [],
            f = 0;
          64 > f;
          f++
        )
          l[f] = (4294967296 * t.abs(t.sin(f + 1))) | 0;
        (c = c.MD5 =
          u.extend({
            _doReset: function () {
              this._hash = new s.init([
                1732584193, 4023233417, 2562383102, 271733878,
              ]);
            },
            _doProcessBlock: function (t, r) {
              for (var a = 0; 16 > a; a++) {
                var s = t[(u = r + a)];
                t[u] =
                  (16711935 & ((s << 8) | (s >>> 24))) |
                  (4278255360 & ((s << 24) | (s >>> 8)));
              }
              a = this._hash.words;
              var u = t[r + 0],
                c = ((s = t[r + 1]), t[r + 2]),
                f = t[r + 3],
                h = t[r + 4],
                d = t[r + 5],
                p = t[r + 6],
                v = t[r + 7],
                g = t[r + 8],
                m = t[r + 9],
                y = t[r + 10],
                b = t[r + 11],
                w = t[r + 12],
                S = t[r + 13],
                T = t[r + 14],
                x = t[r + 15],
                E = e(
                  (E = a[0]),
                  (_ = a[1]),
                  (R = a[2]),
                  (A = a[3]),
                  u,
                  7,
                  l[0]
                ),
                A = e(A, E, _, R, s, 12, l[1]),
                R = e(R, A, E, _, c, 17, l[2]),
                _ = e(_, R, A, E, f, 22, l[3]);
              (E = e(E, _, R, A, h, 7, l[4])),
                (A = e(A, E, _, R, d, 12, l[5])),
                (R = e(R, A, E, _, p, 17, l[6])),
                (_ = e(_, R, A, E, v, 22, l[7])),
                (E = e(E, _, R, A, g, 7, l[8])),
                (A = e(A, E, _, R, m, 12, l[9])),
                (R = e(R, A, E, _, y, 17, l[10])),
                (_ = e(_, R, A, E, b, 22, l[11])),
                (E = e(E, _, R, A, w, 7, l[12])),
                (A = e(A, E, _, R, S, 12, l[13])),
                (R = e(R, A, E, _, T, 17, l[14])),
                (E = n(
                  E,
                  (_ = e(_, R, A, E, x, 22, l[15])),
                  R,
                  A,
                  s,
                  5,
                  l[16]
                )),
                (A = n(A, E, _, R, p, 9, l[17])),
                (R = n(R, A, E, _, b, 14, l[18])),
                (_ = n(_, R, A, E, u, 20, l[19])),
                (E = n(E, _, R, A, d, 5, l[20])),
                (A = n(A, E, _, R, y, 9, l[21])),
                (R = n(R, A, E, _, x, 14, l[22])),
                (_ = n(_, R, A, E, h, 20, l[23])),
                (E = n(E, _, R, A, m, 5, l[24])),
                (A = n(A, E, _, R, T, 9, l[25])),
                (R = n(R, A, E, _, f, 14, l[26])),
                (_ = n(_, R, A, E, g, 20, l[27])),
                (E = n(E, _, R, A, S, 5, l[28])),
                (A = n(A, E, _, R, c, 9, l[29])),
                (R = n(R, A, E, _, v, 14, l[30])),
                (E = i(
                  E,
                  (_ = n(_, R, A, E, w, 20, l[31])),
                  R,
                  A,
                  d,
                  4,
                  l[32]
                )),
                (A = i(A, E, _, R, g, 11, l[33])),
                (R = i(R, A, E, _, b, 16, l[34])),
                (_ = i(_, R, A, E, T, 23, l[35])),
                (E = i(E, _, R, A, s, 4, l[36])),
                (A = i(A, E, _, R, h, 11, l[37])),
                (R = i(R, A, E, _, v, 16, l[38])),
                (_ = i(_, R, A, E, y, 23, l[39])),
                (E = i(E, _, R, A, S, 4, l[40])),
                (A = i(A, E, _, R, u, 11, l[41])),
                (R = i(R, A, E, _, f, 16, l[42])),
                (_ = i(_, R, A, E, p, 23, l[43])),
                (E = i(E, _, R, A, m, 4, l[44])),
                (A = i(A, E, _, R, w, 11, l[45])),
                (R = i(R, A, E, _, x, 16, l[46])),
                (E = o(
                  E,
                  (_ = i(_, R, A, E, c, 23, l[47])),
                  R,
                  A,
                  u,
                  6,
                  l[48]
                )),
                (A = o(A, E, _, R, v, 10, l[49])),
                (R = o(R, A, E, _, T, 15, l[50])),
                (_ = o(_, R, A, E, d, 21, l[51])),
                (E = o(E, _, R, A, w, 6, l[52])),
                (A = o(A, E, _, R, f, 10, l[53])),
                (R = o(R, A, E, _, y, 15, l[54])),
                (_ = o(_, R, A, E, s, 21, l[55])),
                (E = o(E, _, R, A, g, 6, l[56])),
                (A = o(A, E, _, R, x, 10, l[57])),
                (R = o(R, A, E, _, p, 15, l[58])),
                (_ = o(_, R, A, E, S, 21, l[59])),
                (E = o(E, _, R, A, h, 6, l[60])),
                (A = o(A, E, _, R, b, 10, l[61])),
                (R = o(R, A, E, _, c, 15, l[62])),
                (_ = o(_, R, A, E, m, 21, l[63]));
              (a[0] = (a[0] + E) | 0),
                (a[1] = (a[1] + _) | 0),
                (a[2] = (a[2] + R) | 0),
                (a[3] = (a[3] + A) | 0);
            },
            _doFinalize: function () {
              var e = this._data,
                n = e.words,
                r = 8 * this._nDataBytes,
                i = 8 * e.sigBytes;
              n[i >>> 5] |= 128 << (24 - (i % 32));
              var o = t.floor(r / 4294967296);
              for (
                n[15 + (((i + 64) >>> 9) << 4)] =
                  (16711935 & ((o << 8) | (o >>> 24))) |
                  (4278255360 & ((o << 24) | (o >>> 8))),
                  n[14 + (((i + 64) >>> 9) << 4)] =
                    (16711935 & ((r << 8) | (r >>> 24))) |
                    (4278255360 & ((r << 24) | (r >>> 8))),
                  e.sigBytes = 4 * (n.length + 1),
                  this._process(),
                  n = (e = this._hash).words,
                  r = 0;
                4 > r;
                r++
              )
                (i = n[r]),
                  (n[r] =
                    (16711935 & ((i << 8) | (i >>> 24))) |
                    (4278255360 & ((i << 24) | (i >>> 8))));
              return e;
            },
            clone: function () {
              var t = u.clone.call(this);
              return (t._hash = this._hash.clone()), t;
            },
          })),
          (a.MD5 = u._createHelper(c)),
          (a.HmacMD5 = u._createHmacHelper(c));
      })(Math),
      (function () {
        var t,
          e = r,
          n = (t = e.lib).Base,
          i = t.WordArray,
          o = ((t = e.algo).EvpKDF = n.extend({
            cfg: n.extend({ keySize: 4, hasher: t.MD5, iterations: 1 }),
            init: function (t) {
              this.cfg = this.cfg.extend(t);
            },
            compute: function (t, e) {
              for (
                var n = (s = this.cfg).hasher.create(),
                  r = i.create(),
                  o = r.words,
                  a = s.keySize,
                  s = s.iterations;
                o.length < a;

              ) {
                u && n.update(u);
                var u = n.update(t).finalize(e);
                n.reset();
                for (var c = 1; c < s; c++) (u = n.finalize(u)), n.reset();
                r.concat(u);
              }
              return (r.sigBytes = 4 * a), r;
            },
          }));
        e.EvpKDF = function (t, e, n) {
          return o.create(n).compute(t, e);
        };
      })(),
      r.lib.Cipher ||
        (function (t) {
          var e = (p = r).lib,
            n = e.Base,
            i = e.WordArray,
            o = e.BufferedBlockAlgorithm,
            a = p.enc.Base64,
            s = p.algo.EvpKDF,
            u = (e.Cipher = o.extend({
              cfg: n.extend(),
              createEncryptor: function (t, e) {
                return this.create(this._ENC_XFORM_MODE, t, e);
              },
              createDecryptor: function (t, e) {
                return this.create(this._DEC_XFORM_MODE, t, e);
              },
              init: function (t, e, n) {
                (this.cfg = this.cfg.extend(n)),
                  (this._xformMode = t),
                  (this._key = e),
                  this.reset();
              },
              reset: function () {
                o.reset.call(this), this._doReset();
              },
              process: function (t) {
                return this._append(t), this._process();
              },
              finalize: function (t) {
                return t && this._append(t), this._doFinalize();
              },
              keySize: 4,
              ivSize: 4,
              _ENC_XFORM_MODE: 1,
              _DEC_XFORM_MODE: 2,
              _createHelper: function (t) {
                return {
                  encrypt: function (e, n, r) {
                    return ("string" == typeof n ? v : d).encrypt(t, e, n, r);
                  },
                  decrypt: function (e, n, r) {
                    return ("string" == typeof n ? v : d).decrypt(t, e, n, r);
                  },
                };
              },
            }));
          e.StreamCipher = u.extend({
            _doFinalize: function () {
              return this._process(!0);
            },
            blockSize: 1,
          });
          var c = (p.mode = {}),
            l = function (t, e, n) {
              var r = this._iv;
              r ? (this._iv = void 0) : (r = this._prevBlock);
              for (var i = 0; i < n; i++) t[e + i] ^= r[i];
            },
            f = (e.BlockCipherMode = n.extend({
              createEncryptor: function (t, e) {
                return this.Encryptor.create(t, e);
              },
              createDecryptor: function (t, e) {
                return this.Decryptor.create(t, e);
              },
              init: function (t, e) {
                (this._cipher = t), (this._iv = e);
              },
            })).extend();
          (f.Encryptor = f.extend({
            processBlock: function (t, e) {
              var n = this._cipher,
                r = n.blockSize;
              l.call(this, t, e, r),
                n.encryptBlock(t, e),
                (this._prevBlock = t.slice(e, e + r));
            },
          })),
            (f.Decryptor = f.extend({
              processBlock: function (t, e) {
                var n = this._cipher,
                  r = n.blockSize,
                  i = t.slice(e, e + r);
                n.decryptBlock(t, e),
                  l.call(this, t, e, r),
                  (this._prevBlock = i);
              },
            })),
            (c = c.CBC = f),
            (f = (p.pad = {}).Pkcs7 =
              {
                pad: function (t, e) {
                  for (
                    var n,
                      r =
                        ((n = (n = 4 * e) - (t.sigBytes % n)) << 24) |
                        (n << 16) |
                        (n << 8) |
                        n,
                      o = [],
                      a = 0;
                    a < n;
                    a += 4
                  )
                    o.push(r);
                  (n = i.create(o, n)), t.concat(n);
                },
                unpad: function (t) {
                  t.sigBytes -= 255 & t.words[(t.sigBytes - 1) >>> 2];
                },
              }),
            (e.BlockCipher = u.extend({
              cfg: u.cfg.extend({ mode: c, padding: f }),
              reset: function () {
                u.reset.call(this);
                var t = (e = this.cfg).iv,
                  e = e.mode;
                if (this._xformMode == this._ENC_XFORM_MODE)
                  var n = e.createEncryptor;
                else (n = e.createDecryptor), (this._minBufferSize = 1);
                this._mode = n.call(e, this, t && t.words);
              },
              _doProcessBlock: function (t, e) {
                this._mode.processBlock(t, e);
              },
              _doFinalize: function () {
                var t = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                  t.pad(this._data, this.blockSize);
                  var e = this._process(!0);
                } else (e = this._process(!0)), t.unpad(e);
                return e;
              },
              blockSize: 4,
            }));
          var h = (e.CipherParams = n.extend({
              init: function (t) {
                this.mixIn(t);
              },
              toString: function (t) {
                return (t || this.formatter).stringify(this);
              },
            })),
            d =
              ((c = (p.format = {}).OpenSSL =
                {
                  stringify: function (t) {
                    var e = t.ciphertext;
                    return (
                      (t = t.salt)
                        ? i.create([1398893684, 1701076831]).concat(t).concat(e)
                        : e
                    ).toString(a);
                  },
                  parse: function (t) {
                    var e = (t = a.parse(t)).words;
                    if (1398893684 == e[0] && 1701076831 == e[1]) {
                      var n = i.create(e.slice(2, 4));
                      e.splice(0, 4), (t.sigBytes -= 16);
                    }
                    return h.create({ ciphertext: t, salt: n });
                  },
                }),
              (e.SerializableCipher = n.extend({
                cfg: n.extend({ format: c }),
                encrypt: function (t, e, n, r) {
                  r = this.cfg.extend(r);
                  var i = t.createEncryptor(n, r);
                  return (
                    (e = i.finalize(e)),
                    (i = i.cfg),
                    h.create({
                      ciphertext: e,
                      key: n,
                      iv: i.iv,
                      algorithm: t,
                      mode: i.mode,
                      padding: i.padding,
                      blockSize: t.blockSize,
                      formatter: r.format,
                    })
                  );
                },
                decrypt: function (t, e, n, r) {
                  return (
                    (r = this.cfg.extend(r)),
                    (e = this._parse(e, r.format)),
                    t.createDecryptor(n, r).finalize(e.ciphertext)
                  );
                },
                _parse: function (t, e) {
                  return "string" == typeof t ? e.parse(t, this) : t;
                },
              }))),
            p = ((p.kdf = {}).OpenSSL = {
              execute: function (t, e, n, r) {
                return (
                  r || (r = i.random(8)),
                  (t = s.create({ keySize: e + n }).compute(t, r)),
                  (n = i.create(t.words.slice(e), 4 * n)),
                  (t.sigBytes = 4 * e),
                  h.create({ key: t, iv: n, salt: r })
                );
              },
            }),
            v = (e.PasswordBasedCipher = d.extend({
              cfg: d.cfg.extend({ kdf: p }),
              encrypt: function (t, e, n, r) {
                return (
                  (n = (r = this.cfg.extend(r)).kdf.execute(
                    n,
                    t.keySize,
                    t.ivSize
                  )),
                  (r.iv = n.iv),
                  (t = d.encrypt.call(this, t, e, n.key, r)).mixIn(n),
                  t
                );
              },
              decrypt: function (t, e, n, r) {
                return (
                  (r = this.cfg.extend(r)),
                  (e = this._parse(e, r.format)),
                  (n = r.kdf.execute(n, t.keySize, t.ivSize, e.salt)),
                  (r.iv = n.iv),
                  d.decrypt.call(this, t, e, n.key, r)
                );
              },
            }));
        })(),
      (function () {
        for (
          var t = r,
            e = t.lib.BlockCipher,
            n = t.algo,
            i = [],
            o = [],
            a = [],
            s = [],
            u = [],
            c = [],
            l = [],
            f = [],
            h = [],
            d = [],
            p = [],
            v = 0;
          256 > v;
          v++
        )
          p[v] = 128 > v ? v << 1 : (v << 1) ^ 283;
        var g = 0,
          m = 0;
        for (v = 0; 256 > v; v++) {
          var y =
            ((y = m ^ (m << 1) ^ (m << 2) ^ (m << 3) ^ (m << 4)) >>> 8) ^
            (255 & y) ^
            99;
          (i[g] = y), (o[y] = g);
          var b = p[g],
            w = p[b],
            S = p[w],
            T = (257 * p[y]) ^ (16843008 * y);
          (a[g] = (T << 24) | (T >>> 8)),
            (s[g] = (T << 16) | (T >>> 16)),
            (u[g] = (T << 8) | (T >>> 24)),
            (c[g] = T),
            (T = (16843009 * S) ^ (65537 * w) ^ (257 * b) ^ (16843008 * g)),
            (l[y] = (T << 24) | (T >>> 8)),
            (f[y] = (T << 16) | (T >>> 16)),
            (h[y] = (T << 8) | (T >>> 24)),
            (d[y] = T),
            g ? ((g = b ^ p[p[p[S ^ b]]]), (m ^= p[p[m]])) : (g = m = 1);
        }
        var x = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
        n = n.AES = e.extend({
          _doReset: function () {
            for (
              var t = (n = this._key).words,
                e = n.sigBytes / 4,
                n = 4 * ((this._nRounds = e + 6) + 1),
                r = (this._keySchedule = []),
                o = 0;
              o < n;
              o++
            )
              if (o < e) r[o] = t[o];
              else {
                var a = r[o - 1];
                o % e
                  ? 6 < e &&
                    4 == o % e &&
                    (a =
                      (i[a >>> 24] << 24) |
                      (i[(a >>> 16) & 255] << 16) |
                      (i[(a >>> 8) & 255] << 8) |
                      i[255 & a])
                  : ((a =
                      (i[(a = (a << 8) | (a >>> 24)) >>> 24] << 24) |
                      (i[(a >>> 16) & 255] << 16) |
                      (i[(a >>> 8) & 255] << 8) |
                      i[255 & a]),
                    (a ^= x[(o / e) | 0] << 24)),
                  (r[o] = r[o - e] ^ a);
              }
            for (t = this._invKeySchedule = [], e = 0; e < n; e++)
              (o = n - e),
                (a = e % 4 ? r[o] : r[o - 4]),
                (t[e] =
                  4 > e || 4 >= o
                    ? a
                    : l[i[a >>> 24]] ^
                      f[i[(a >>> 16) & 255]] ^
                      h[i[(a >>> 8) & 255]] ^
                      d[i[255 & a]]);
          },
          encryptBlock: function (t, e) {
            this._doCryptBlock(t, e, this._keySchedule, a, s, u, c, i);
          },
          decryptBlock: function (t, e) {
            var n = t[e + 1];
            (t[e + 1] = t[e + 3]),
              (t[e + 3] = n),
              this._doCryptBlock(t, e, this._invKeySchedule, l, f, h, d, o),
              (n = t[e + 1]),
              (t[e + 1] = t[e + 3]),
              (t[e + 3] = n);
          },
          _doCryptBlock: function (t, e, n, r, i, o, a, s) {
            for (
              var u = this._nRounds,
                c = t[e] ^ n[0],
                l = t[e + 1] ^ n[1],
                f = t[e + 2] ^ n[2],
                h = t[e + 3] ^ n[3],
                d = 4,
                p = 1;
              p < u;
              p++
            ) {
              var v =
                  r[c >>> 24] ^
                  i[(l >>> 16) & 255] ^
                  o[(f >>> 8) & 255] ^
                  a[255 & h] ^
                  n[d++],
                g =
                  r[l >>> 24] ^
                  i[(f >>> 16) & 255] ^
                  o[(h >>> 8) & 255] ^
                  a[255 & c] ^
                  n[d++],
                m =
                  r[f >>> 24] ^
                  i[(h >>> 16) & 255] ^
                  o[(c >>> 8) & 255] ^
                  a[255 & l] ^
                  n[d++];
              (h =
                r[h >>> 24] ^
                i[(c >>> 16) & 255] ^
                o[(l >>> 8) & 255] ^
                a[255 & f] ^
                n[d++]),
                (c = v),
                (l = g),
                (f = m);
            }
            (v =
              ((s[c >>> 24] << 24) |
                (s[(l >>> 16) & 255] << 16) |
                (s[(f >>> 8) & 255] << 8) |
                s[255 & h]) ^
              n[d++]),
              (g =
                ((s[l >>> 24] << 24) |
                  (s[(f >>> 16) & 255] << 16) |
                  (s[(h >>> 8) & 255] << 8) |
                  s[255 & c]) ^
                n[d++]),
              (m =
                ((s[f >>> 24] << 24) |
                  (s[(h >>> 16) & 255] << 16) |
                  (s[(c >>> 8) & 255] << 8) |
                  s[255 & l]) ^
                n[d++]),
              (h =
                ((s[h >>> 24] << 24) |
                  (s[(c >>> 16) & 255] << 16) |
                  (s[(l >>> 8) & 255] << 8) |
                  s[255 & f]) ^
                n[d++]),
              (t[e] = v),
              (t[e + 1] = g),
              (t[e + 2] = m),
              (t[e + 3] = h);
          },
          keySize: 8,
        });
        t.AES = e._createHelper(n);
      })(),
      (r.mode.ECB = (function () {
        var t = r.lib.BlockCipherMode.extend();
        return (
          (t.Encryptor = t.extend({
            processBlock: function (t, e) {
              this._cipher.encryptBlock(t, e);
            },
          })),
          (t.Decryptor = t.extend({
            processBlock: function (t, e) {
              this._cipher.decryptBlock(t, e);
            },
          })),
          t
        );
      })()),
      (r.pad.ZeroPadding = {
        pad: function (t, e) {
          var n = 4 * e;
          t.clamp(), (t.sigBytes += n - (t.sigBytes % n || n));
        },
        unpad: function (t) {
          for (
            var e = t.words, n = t.sigBytes - 1;
            !((e[n >>> 2] >>> (24 - (n % 4) * 8)) & 255);

          )
            n--;
          t.sigBytes = n + 1;
        },
      });
    var i = r;
    e.default = i;
  },
  function (t, e, n) {
    "use strict";
    n.r(e),
      n.d(e, "SM2", function () {
        return A;
      }),
      n.d(e, "SM3", function () {
        return y;
      }),
      n.d(e, "SM4", function () {
        return U;
      });
    var r = n(15),
      i = n.n(r),
      o = n(3),
      a = n(7),
      s = a.BigInteger.prototype.Barrett;
    function u(t, e) {
      (this.x = e), (this.q = t);
    }
    function c(t, e, n, r) {
      (this.curve = t),
        (this.x = e),
        (this.y = n),
        (this.z = null == r ? a.BigInteger.ONE : r),
        (this.zinv = null);
    }
    function l(t, e, n) {
      (this.q = t),
        (this.a = this.fromBigInteger(e)),
        (this.b = this.fromBigInteger(n)),
        (this.infinity = new c(this, null, null)),
        (this.reducer = new s(this.q));
    }
    (u.prototype.equals = function (t) {
      return t == this || (this.q.equals(t.q) && this.x.equals(t.x));
    }),
      (u.prototype.toBigInteger = function () {
        return this.x;
      }),
      (u.prototype.negate = function () {
        return new u(this.q, this.x.negate().mod(this.q));
      }),
      (u.prototype.add = function (t) {
        return new u(this.q, this.x.add(t.toBigInteger()).mod(this.q));
      }),
      (u.prototype.subtract = function (t) {
        return new u(this.q, this.x.subtract(t.toBigInteger()).mod(this.q));
      }),
      (u.prototype.multiply = function (t) {
        return new u(this.q, this.x.multiply(t.toBigInteger()).mod(this.q));
      }),
      (u.prototype.square = function () {
        return new u(this.q, this.x.square().mod(this.q));
      }),
      (u.prototype.divide = function (t) {
        return new u(
          this.q,
          this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q)
        );
      }),
      (c.prototype.getX = function () {
        null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
        var t = this.x.toBigInteger().multiply(this.zinv);
        return this.curve.reduce(t), this.curve.fromBigInteger(t);
      }),
      (c.prototype.getY = function () {
        null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
        var t = this.y.toBigInteger().multiply(this.zinv);
        return this.curve.reduce(t), this.curve.fromBigInteger(t);
      }),
      (c.prototype.equals = function (t) {
        return (
          t == this ||
          (this.isInfinity()
            ? t.isInfinity()
            : t.isInfinity()
            ? this.isInfinity()
            : !!t.y
                .toBigInteger()
                .multiply(this.z)
                .subtract(this.y.toBigInteger().multiply(t.z))
                .mod(this.curve.q)
                .equals(a.BigInteger.ZERO) &&
              t.x
                .toBigInteger()
                .multiply(this.z)
                .subtract(this.x.toBigInteger().multiply(t.z))
                .mod(this.curve.q)
                .equals(a.BigInteger.ZERO))
        );
      }),
      (c.prototype.isInfinity = function () {
        return (
          (null == this.x && null == this.y) ||
          (this.z.equals(a.BigInteger.ZERO) &&
            !this.y.toBigInteger().equals(a.BigInteger.ZERO))
        );
      }),
      (c.prototype.negate = function () {
        return new c(this.curve, this.x, this.y.negate(), this.z);
      }),
      (c.prototype.add = function (t) {
        if (this.isInfinity()) return t;
        if (t.isInfinity()) return this;
        var e = t.y
            .toBigInteger()
            .multiply(this.z)
            .subtract(this.y.toBigInteger().multiply(t.z))
            .mod(this.curve.q),
          n = t.x
            .toBigInteger()
            .multiply(this.z)
            .subtract(this.x.toBigInteger().multiply(t.z))
            .mod(this.curve.q);
        if (a.BigInteger.ZERO.equals(n))
          return a.BigInteger.ZERO.equals(e)
            ? this.twice()
            : this.curve.getInfinity();
        var r = new a.BigInteger("3"),
          i = this.x.toBigInteger(),
          o = this.y.toBigInteger(),
          s = (t.x.toBigInteger(), t.y.toBigInteger(), n.square()),
          u = s.multiply(n),
          l = i.multiply(s),
          f = e.square().multiply(this.z),
          h = f
            .subtract(l.shiftLeft(1))
            .multiply(t.z)
            .subtract(u)
            .multiply(n)
            .mod(this.curve.q),
          d = l
            .multiply(r)
            .multiply(e)
            .subtract(o.multiply(u))
            .subtract(f.multiply(e))
            .multiply(t.z)
            .add(e.multiply(u))
            .mod(this.curve.q),
          p = u.multiply(this.z).multiply(t.z).mod(this.curve.q);
        return new c(
          this.curve,
          this.curve.fromBigInteger(h),
          this.curve.fromBigInteger(d),
          p
        );
      }),
      (c.prototype.twice = function () {
        if (this.isInfinity()) return this;
        if (0 == this.y.toBigInteger().signum())
          return this.curve.getInfinity();
        var t = new a.BigInteger("3"),
          e = this.x.toBigInteger(),
          n = this.y.toBigInteger(),
          r = n.multiply(this.z),
          i = r.multiply(n).mod(this.curve.q),
          o = this.curve.a.toBigInteger(),
          s = e.square().multiply(t);
        a.BigInteger.ZERO.equals(o) || (s = s.add(this.z.square().multiply(o)));
        var u = (s = s.mod(this.curve.q))
            .square()
            .subtract(e.shiftLeft(3).multiply(i))
            .shiftLeft(1)
            .multiply(r)
            .mod(this.curve.q),
          l = s
            .multiply(t)
            .multiply(e)
            .subtract(i.shiftLeft(1))
            .shiftLeft(2)
            .multiply(i)
            .subtract(s.square().multiply(s))
            .mod(this.curve.q),
          f = r.square().multiply(r).shiftLeft(3).mod(this.curve.q);
        return new c(
          this.curve,
          this.curve.fromBigInteger(u),
          this.curve.fromBigInteger(l),
          f
        );
      }),
      (c.prototype.multiply = function (t) {
        if (this.isInfinity()) return this;
        if (0 == t.signum()) return this.curve.getInfinity();
        var e,
          n = t,
          r = n.multiply(new a.BigInteger("3")),
          i = this.negate(),
          o = this;
        for (e = r.bitLength() - 2; e > 0; --e) {
          o = o.twice();
          var s = r.testBit(e);
          s != n.testBit(e) && (o = o.add(s ? this : i));
        }
        return o;
      }),
      (c.prototype.multiplyTwo = function (t, e, n) {
        var r;
        r =
          t.bitLength() > n.bitLength() ? t.bitLength() - 1 : n.bitLength() - 1;
        for (var i = this.curve.getInfinity(), o = this.add(e); r >= 0; )
          (i = i.twice()),
            t.testBit(r)
              ? (i = n.testBit(r) ? i.add(o) : i.add(this))
              : n.testBit(r) && (i = i.add(e)),
            --r;
        return i;
      }),
      (l.prototype.getQ = function () {
        return this.q;
      }),
      (l.prototype.getA = function () {
        return this.a;
      }),
      (l.prototype.getB = function () {
        return this.b;
      }),
      (l.prototype.equals = function (t) {
        return (
          t == this ||
          (this.q.equals(t.q) && this.a.equals(t.a) && this.b.equals(t.b))
        );
      }),
      (l.prototype.getInfinity = function () {
        return this.infinity;
      }),
      (l.prototype.fromBigInteger = function (t) {
        return new u(this.q, t);
      }),
      (l.prototype.reduce = function (t) {
        this.reducer.reduce(t);
      }),
      (l.prototype.decodePointHex = function (t) {
        switch (parseInt(t.substr(0, 2), 16)) {
          case 0:
            return this.infinity;
          case 2:
          case 3:
            return null;
          case 4:
          case 6:
          case 7:
            var e = (t.length - 2) / 2,
              n = t.substr(2, e),
              r = t.substr(e + 2, e);
            return new c(
              this,
              this.fromBigInteger(new a.BigInteger(n, 16)),
              this.fromBigInteger(new a.BigInteger(r, 16))
            );
          default:
            return null;
        }
      }),
      (l.prototype.encodePointHex = function (t) {
        if (t.isInfinity()) return "00";
        var e = t.getX().toBigInteger().toString(16),
          n = t.getY().toBigInteger().toString(16),
          r = this.getQ().toString(16).length;
        for (r % 2 != 0 && r++; e.length < r; ) e = "0" + e;
        for (; n.length < r; ) n = "0" + n;
        return "04" + e + n;
      });
    var f = function (t, e) {
        return (t << (e %= 32)) | (t >>> (32 - e));
      },
      h = function (t, e) {
        var n = e - t.length;
        return (n > 0 ? "0".repeat(n) : "") + t;
      },
      d = function (t) {
        return t < 16 ? 2043430169 : 2055708042;
      },
      p = function (t, e, n, r) {
        return r < 16 ? t ^ e ^ n : (t & e) | (t & n) | (e & n);
      },
      v = function (t, e, n, r) {
        return r < 16 ? t ^ e ^ n : (t & e) | (~t & n);
      },
      g = function (t, e, n) {
        for (
          var r,
            i,
            o,
            a,
            s,
            u = (function (t) {
              var e,
                n = new Array(132);
              t.forEach(function (t, e) {
                n[e] = t;
              });
              for (var r = 16; r < 68; r++)
                n[r] =
                  (e = n[r - 16] ^ n[r - 9] ^ f(n[r - 3], 15)) ^
                  f(e, 15) ^
                  f(e, 23) ^
                  f(n[r - 13], 7) ^
                  n[r - 6];
              for (var i = 0; i < 64; i++) n[i + 68] = n[i] ^ n[i + 4];
              return n;
            })(e),
            c = t[0],
            l = t[1],
            h = t[2],
            g = t[3],
            m = t[4],
            y = t[5],
            b = t[6],
            w = t[7],
            S = 0;
          S < 64;
          S++
        )
          (i = (r = f(f(c, 12) + m + f(d(S), S), 7)) ^ f(c, 12)),
            (o = p(c, l, h, S) + g + i + u[S + 68]),
            (a = v(m, y, b, S) + w + r + u[S]),
            (g = h),
            (h = f(l, 9)),
            (l = c),
            (c = o),
            (w = b),
            (b = f(y, 19)),
            (y = m),
            (m = (s = a) ^ f(s, 9) ^ f(s, 17));
        return [
          c ^ t[0],
          l ^ t[1],
          h ^ t[2],
          g ^ t[3],
          m ^ t[4],
          y ^ t[5],
          b ^ t[6],
          w ^ t[7],
        ];
      },
      m = function (t, e, n) {
        if (
          ("string" == typeof t
            ? (t = o.Buffer.from(t, e || "utf8"))
            : t instanceof ArrayBuffer && (t = o.Buffer.from(t)),
          !o.Buffer.isBuffer(t))
        )
          throw new TypeError(
            'Expected "string" | "Buffer" | "ArrayBuffer" but received "' +
              Object.prototype.toString.call(t) +
              '"'
          );
        var r, a, s, u, c, l;
        (r = t),
          (a = o.Buffer.alloc(1, 128)),
          (u = o.Buffer.alloc(
            (s = (s = r.length % 64) >= 56 ? 64 - (s % 56) - 1 : 56 - s - 1),
            0
          )),
          (c = o.Buffer.alloc(8)),
          (l = 8 * r.length),
          c.writeUInt32BE(Math.floor(l / Math.pow(2, 32)), 0),
          c.writeUInt32BE(l % Math.pow(2, 32), 4);
        for (
          var f =
              (t = o.Buffer.concat([r, a, u, c], r.length + 1 + s + 8)).length /
              64,
            h = new Array(f),
            d = 0;
          d < f;
          d++
        ) {
          h[d] = new Array(16);
          for (var p = 0; p < 16; p++) h[d][p] = t.readUInt32BE(64 * d + 4 * p);
        }
        var v = new Array(f);
        v[0] = [
          1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522,
          3817729613, 2969243214,
        ];
        for (var m = 0; m < f; m++) v[m + 1] = g(v[m], h[m]);
        var y = o.Buffer.alloc(32);
        return (
          v[f].forEach(function (t, e) {
            return y.writeInt32BE(t, 4 * e);
          }),
          n ? y.toString(n) : i()(y)
        );
      },
      y = { __proto__: null, digest: m },
      b = new a.SecureRandom(),
      w = (function () {
        var t = new l(
            new a.BigInteger(
              "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF",
              16
            ),
            new a.BigInteger(
              "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC",
              16
            ),
            new a.BigInteger(
              "28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93",
              16
            )
          ),
          e = t.decodePointHex(
            "0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0"
          );
        return {
          curve: t,
          G: e,
          n: new a.BigInteger(
            "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123",
            16
          ),
        };
      })(),
      S = w.curve,
      T = w.G,
      x = w.n;
    function E(t, e) {
      for (var n = [], r = Math.ceil(e / 32), i = e % 32, a = 1; a <= r; a++) {
        var s = o.Buffer.allocUnsafe(4);
        s.writeUInt32BE(a);
        var u = m(o.Buffer.concat([t, s]));
        n.push(a === r && i ? o.Buffer.from(u).slice(0, i) : o.Buffer.from(u));
      }
      return o.Buffer.concat(n, e);
    }
    var A = {
        __proto__: null,
        constants: { C1C2C3: 0, C1C3C2: 1, PC: "04" },
        generateKeyPair: function () {
          var t = new a.BigInteger(x.bitLength(), b)
              .mod(x.subtract(new a.BigInteger("2")))
              .add(a.BigInteger.ONE),
            e = h(t.toString(16), 64),
            n = T.multiply(t);
          return {
            privateKey: e,
            publicKey:
              "04" +
              h(n.getX().toBigInteger().toString(16), 64) +
              h(n.getY().toBigInteger().toString(16), 64),
          };
        },
        encrypt: function (t, e, n) {
          var r = n || {},
            s = r.mode,
            u = void 0 === s ? 1 : s,
            c = r.outputEncoding,
            l = r.pc;
          if (
            ("string" == typeof t
              ? (t = o.Buffer.from(t, r.inputEncoding || "utf8"))
              : t instanceof ArrayBuffer && (t = o.Buffer.from(t)),
            !o.Buffer.isBuffer(t))
          )
            throw new TypeError(
              'Expected "string" | "Buffer" | "ArrayBuffer" but received "' +
                Object.prototype.toString.call(t) +
                '"'
            );
          var f = new a.BigInteger(x.bitLength(), b)
              .mod(x.subtract(a.BigInteger.ONE))
              .add(a.BigInteger.ONE),
            d = T.multiply(f),
            p =
              h(d.getX().toBigInteger().toString(16), 64) +
              h(d.getY().toBigInteger().toString(16), 64),
            v = S.decodePointHex(e).multiply(f),
            g = h(v.getX().toBigInteger().toString(16), 64),
            y = h(v.getY().toBigInteger().toString(16), 64),
            w = E(o.Buffer.from(g + y, "hex"), t.length),
            A = h(
              new a.BigInteger(t.toString("hex"), 16)
                .xor(new a.BigInteger(w.toString("hex"), 16))
                .toString(16),
              2 * t.length
            ),
            R = m(g + t.toString("hex") + y, "hex", "hex"),
            _ = o.Buffer.from(
              (l ? "04" : "") + (0 === u ? p + A + R : p + R + A),
              "hex"
            );
          return c ? _.toString(c) : i()(_);
        },
        decrypt: function (t, e, n) {
          var r = n || {},
            s = r.mode,
            u = void 0 === s ? 1 : s,
            c = r.outputEncoding,
            l = r.pc;
          if (
            ("string" == typeof t
              ? (t = o.Buffer.from(t, r.inputEncoding))
              : t instanceof ArrayBuffer && (t = o.Buffer.from(t)),
            !o.Buffer.isBuffer(t))
          )
            throw new TypeError(
              'Expected "string" | "Buffer" | "ArrayBuffer" but received "' +
                Object.prototype.toString.call(t) +
                '"'
            );
          var f = (t = l ? t.slice(1) : t).slice(0, 32).toString("hex"),
            d = t.slice(32, 64).toString("hex"),
            p = S.decodePointHex("04" + f + d).multiply(
              new a.BigInteger(e, 16)
            ),
            v = h(p.getX().toBigInteger().toString(16), 64),
            g = h(p.getY().toBigInteger().toString(16), 64),
            y = t.slice(64, 96),
            b = t.slice(96);
          0 === u &&
            ((y = t.slice(t.length - 32)), (b = t.slice(64, t.length - 32)));
          var w = E(o.Buffer.from(v + g, "hex"), b.length),
            T = new a.BigInteger(b.toString("hex"), 16)
              .xor(new a.BigInteger(w.toString("hex"), 16))
              .toString(16),
            x =
              m(v + T + g, "hex", "hex") === y.toString("hex")
                ? o.Buffer.from(T, "hex")
                : o.Buffer.alloc(0);
          return c ? x.toString(c) : i()(x);
        },
      },
      R = [
        [
          214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44,
          5,
        ],
        [43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153],
        [
          156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172,
          98,
        ],
        [
          228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63,
          166,
        ],
        [
          71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79,
          168,
        ],
        [
          104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86,
          157, 53,
        ],
        [30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135],
        [212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158],
        [
          234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21,
          161,
        ],
        [
          224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177,
          227,
        ],
        [
          29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78,
          111,
        ],
        [
          213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91,
          81,
        ],
        [
          141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90,
          216,
        ],
        [
          10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180,
          176,
        ],
        [
          137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198,
          132,
        ],
        [
          24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57,
          72,
        ],
      ],
      _ = [2746333894, 1453994832, 1736282519, 2993693404],
      k = [
        462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617,
        2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825,
        1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337,
        4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545,
        2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753,
        1213159005, 1684763257,
      ],
      D = /^[0-9a-f]{32}$/i,
      C = function (t) {
        return (
          (R[(4026531840 & t) >>> 28][(251658240 & t) >>> 24] << 24) |
          (R[(15728640 & t) >>> 20][(983040 & t) >>> 16] << 16) |
          (R[(61440 & t) >>> 12][(3840 & t) >>> 8] << 8) |
          (R[(240 & t) >>> 4][(15 & t) >>> 0] << 0)
        );
      },
      M = function (t) {
        return (e = C(t)) ^ f(e, 2) ^ f(e, 10) ^ f(e, 18) ^ f(e, 24);
        var e;
      },
      I = function (t) {
        var e,
          n = new Array(36);
        (n[0] = t[0] ^ _[0]),
          (n[1] = t[1] ^ _[1]),
          (n[2] = t[2] ^ _[2]),
          (n[3] = t[3] ^ _[3]);
        for (var r = new Array(32), i = 0; i < 32; i++)
          (n[i + 4] =
            n[i] ^
            (e = C(n[i + 1] ^ n[i + 2] ^ n[i + 3] ^ k[i])) ^
            f(e, 13) ^
            f(e, 23)),
            (r[i] = n[i + 4]);
        return r;
      },
      B = function (t, e) {
        for (var n = I(e), r = 0; r < 32; r++)
          t[r + 4] = t[r] ^ M(t[r + 1] ^ t[r + 2] ^ t[r + 3] ^ n[r]);
        return [t[35], t[34], t[33], t[32]];
      },
      O = function (t, e) {
        for (var n = I(e).reverse(), r = 0; r < 32; r++)
          t[r + 4] = t[r] ^ M(t[r + 1] ^ t[r + 2] ^ t[r + 3] ^ n[r]);
        return [t[35], t[34], t[33], t[32]];
      },
      P = function (t) {
        return [
          t.readInt32BE(0),
          t.readInt32BE(4),
          t.readInt32BE(8),
          t.readInt32BE(12),
        ];
      },
      F = function (t) {
        for (var e = o.Buffer.alloc(16), n = 0; n < 4; n++)
          e.writeInt32BE(t[n], 4 * n);
        return e;
      },
      U = {
        __proto__: null,
        constants: { ECB: 1, CBC: 2 },
        encrypt: function (t, e, n) {
          var r = n || {},
            a = r.mode,
            s = r.iv,
            u = r.outputEncoding;
          if (
            ("string" == typeof t
              ? (t = o.Buffer.from(t, r.inputEncoding || "utf8"))
              : t instanceof ArrayBuffer && (t = o.Buffer.from(t)),
            !o.Buffer.isBuffer(t))
          )
            throw new TypeError(
              'Expected "string" | "Buffer" | "ArrayBuffer" but received "' +
                Object.prototype.toString.call(t) +
                '"'
            );
          if (!D.test(e)) throw new TypeError("Invalid value of cipher `key`");
          if (((e = o.Buffer.from(e, "hex")), 2 === a && !D.test(s)))
            throw new TypeError("Invalid value of `iv` option");
          return (function (t, e, n, r) {
            n && (n = P(n)), (e = P(e));
            for (
              var a = [],
                s =
                  (t = (function (t) {
                    var e = 16 - (t.length % 16),
                      n = o.Buffer.alloc(e, e);
                    return o.Buffer.concat([t, n], t.length + e);
                  })(t)).length / 16,
                u = 0;
              u < s;
              u++
            )
              if (n) {
                var c = 16 * u,
                  l = [
                    n[0] ^ t.readInt32BE(c),
                    n[1] ^ t.readInt32BE(c + 4),
                    n[2] ^ t.readInt32BE(c + 8),
                    n[3] ^ t.readInt32BE(c + 12),
                  ],
                  f = B(l, e);
                a.push(F(f)), (n = f.slice(0));
              } else {
                var h = 16 * u,
                  d = [
                    t.readInt32BE(h),
                    t.readInt32BE(h + 4),
                    t.readInt32BE(h + 8),
                    t.readInt32BE(h + 12),
                  ],
                  p = B(d, e);
                a.push(F(p));
              }
            var v = o.Buffer.concat(a, t.length);
            return r ? v.toString(r) : i()(v);
          })(t, e, (s = 2 === a ? o.Buffer.from(s, "hex") : null), u);
        },
        decrypt: function (t, e, n) {
          var r = n || {},
            a = r.mode,
            s = r.iv,
            u = r.outputEncoding;
          if (
            ("string" == typeof t
              ? (t = o.Buffer.from(t, r.inputEncoding))
              : t instanceof ArrayBuffer && (t = o.Buffer.from(t)),
            !o.Buffer.isBuffer(t))
          )
            throw new TypeError(
              'Expected "string" | "Buffer" | "ArrayBuffer" but received "' +
                Object.prototype.toString.call(t) +
                '"'
            );
          if (!D.test(e)) throw new TypeError("Invalid value of cipher `key`");
          if (((e = o.Buffer.from(e, "hex")), 2 === a && !D.test(s)))
            throw new TypeError("Invalid value of `iv` option");
          return (function (t, e, n, r) {
            n && (n = P(n)), (e = P(e));
            var a = [],
              s = t.length / 16;
            if (n)
              for (var u = s - 1; u >= 0; u--) {
                var c,
                  l = 16 * u;
                c =
                  u > 0
                    ? [
                        t.readInt32BE(l - 16),
                        t.readInt32BE(l - 16 + 4),
                        t.readInt32BE(l - 16 + 8),
                        t.readInt32BE(l - 16 + 12),
                      ]
                    : n;
                var f = [
                    t.readInt32BE(l),
                    t.readInt32BE(l + 4),
                    t.readInt32BE(l + 8),
                    t.readInt32BE(l + 12),
                  ],
                  h = O(f, e);
                a.unshift(
                  F([h[0] ^ c[0], h[1] ^ c[1], h[2] ^ c[2], h[3] ^ c[3]])
                );
              }
            else
              for (var d = 0; d < s; d++) {
                var p = 16 * d,
                  v = [
                    t.readInt32BE(p),
                    t.readInt32BE(p + 4),
                    t.readInt32BE(p + 8),
                    t.readInt32BE(p + 12),
                  ],
                  g = O(v, e);
                a.push(F(g));
              }
            var m = o.Buffer.concat(a, t.length - a[a.length - 1][15]);
            return r ? m.toString(r) : i()(m);
          })(t, e, (s = 2 === a ? o.Buffer.from(s, "hex") : null), u);
        },
      };
  },
  function (t, e, n) {
    var r = n(126);
    (e.Ber = r), (e.BerReader = r.Reader), (e.BerWriter = r.Writer);
  },
  function (t, e, n) {
    var r = n(29),
      i = n(30),
      o = n(127),
      a = n(132);
    for (var s in i) i.hasOwnProperty(s) && (e[s] = i[s]);
    for (var u in r) r.hasOwnProperty(u) && (e[u] = r[u]);
    (e.Reader = o), (e.Writer = a);
  },
  function (t, e, n) {
    (function (e) {
      n(55);
      var r = n(30),
        i = n(29).InvalidAsn1Error;
      function o(t) {
        if (!t || !e.isBuffer(t))
          throw new TypeError("data must be a node Buffer");
        (this._buf = t),
          (this._size = t.length),
          (this._len = 0),
          (this._offset = 0);
      }
      Object.defineProperty(o.prototype, "length", {
        enumerable: !0,
        get: function () {
          return this._len;
        },
      }),
        Object.defineProperty(o.prototype, "offset", {
          enumerable: !0,
          get: function () {
            return this._offset;
          },
        }),
        Object.defineProperty(o.prototype, "remain", {
          get: function () {
            return this._size - this._offset;
          },
        }),
        Object.defineProperty(o.prototype, "buffer", {
          get: function () {
            return this._buf.slice(this._offset);
          },
        }),
        (o.prototype.readByte = function (t) {
          if (this._size - this._offset < 1) return null;
          var e = 255 & this._buf[this._offset];
          return t || (this._offset += 1), e;
        }),
        (o.prototype.peek = function () {
          return this.readByte(!0);
        }),
        (o.prototype.readLength = function (t) {
          if ((void 0 === t && (t = this._offset), t >= this._size))
            return null;
          var e = 255 & this._buf[t++];
          if (null === e) return null;
          if (128 == (128 & e)) {
            if (0 == (e &= 127)) throw i("Indefinite length not supported");
            if (this._size - t < e) return null;
            this._len = 0;
            for (var n = 0; n < e; n++)
              (this._len *= 256), (this._len += 255 & this._buf[t++]);
          } else this._len = e;
          return t;
        }),
        (o.prototype.readSequence = function (t) {
          var e = this.peek();
          if (null === e) return null;
          if (void 0 !== t && t !== e)
            throw i(
              "Expected 0x" + t.toString(16) + ": got 0x" + e.toString(16)
            );
          var n = this.readLength(this._offset + 1);
          return null === n ? null : ((this._offset = n), e);
        }),
        (o.prototype.readInt = function (t) {
          return this._readTag(t);
        }),
        (o.prototype.readBoolean = function (t) {
          return (
            "number" !== typeof t && (t = r.Boolean), 0 !== this._readTag(t)
          );
        }),
        (o.prototype.readEnumeration = function (t) {
          return "number" !== typeof t && (t = r.Enumeration), this._readTag(t);
        }),
        (o.prototype.readString = function (t, n) {
          t || (t = r.OctetString);
          var o = this.peek();
          if (null === o) return null;
          if (o !== t)
            throw i(
              "Expected 0x" + t.toString(16) + ": got 0x" + o.toString(16)
            );
          var a = this.readLength(this._offset + 1);
          if (null === a) return null;
          if (this.length > this._size - a) return null;
          if (((this._offset = a), 0 === this.length))
            return n ? e.alloc(0) : "";
          var s = this._buf.slice(this._offset, this._offset + this.length);
          return (this._offset += this.length), n ? s : s.toString("utf8");
        }),
        (o.prototype.readOID = function (t) {
          t || (t = r.OID);
          var e = this.readString(t, !0);
          if (null === e) return null;
          for (var n = [], i = 0, o = 0; o < e.length; o++) {
            var a = 255 & e[o];
            (i <<= 7),
              (i += 127 & a),
              0 == (128 & a) && (n.push(i >>> 0), (i = 0));
          }
          return (
            (i = n.shift()),
            n.unshift(i % 40),
            n.unshift((i / 40) >> 0),
            n.join(".")
          );
        }),
        (o.prototype.readBitString = function (t) {
          t || (t = r.BitString);
          var e = this.peek();
          if (null === e) return null;
          if (e !== t)
            throw i(
              "Expected 0x" + t.toString(16) + ": got 0x" + e.toString(16)
            );
          var n = this.readLength(this._offset + 1);
          if (null === n) return null;
          if (this.length > this._size - n) return null;
          if (((this._offset = n), 0 === this.length)) return "";
          var o = this._buf[this._offset++],
            a = this._buf.slice(this._offset, this._offset + this.length - 1),
            s = parseInt(a.toString("hex"), 16)
              .toString(2)
              .padStart(8 * a.length, "0");
          return (
            (this._offset += this.length - 1), s.substring(0, s.length - o)
          );
        }),
        (o.prototype._readTag = function (t) {
          var e = this.peek();
          if (null === e) return null;
          if (void 0 !== t && e !== t)
            throw i(
              "Expected 0x" + t.toString(16) + ": got 0x" + e.toString(16)
            );
          var n = this.readLength(this._offset + 1);
          if (null === n) return null;
          if (0 === this.length) throw i("Zero-length integer");
          if (this.length > this._size - n) return null;
          this._offset = n;
          for (
            var r = this._buf.readInt8(this._offset++), o = 1;
            o < this.length;
            o++
          )
            (r *= 256), (r += this._buf[this._offset++]);
          if (!Number.isSafeInteger(r))
            throw i("Integer not representable as javascript number");
          return r;
        }),
        (t.exports = o);
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    var r = Object.getOwnPropertySymbols,
      i = Object.prototype.hasOwnProperty,
      o = Object.prototype.propertyIsEnumerable;
    t.exports = (function () {
      try {
        if (!Object.assign) return !1;
        var t = new String("abc");
        if (((t[5] = "de"), "5" === Object.getOwnPropertyNames(t)[0]))
          return !1;
        for (var e = {}, n = 0; n < 10; n++)
          e["_" + String.fromCharCode(n)] = n;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(e)
            .map(function (t) {
              return e[t];
            })
            .join("")
        )
          return !1;
        var r = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function (t) {
            r[t] = t;
          }),
          "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        );
      } catch (t) {
        return !1;
      }
    })()
      ? Object.assign
      : function (t, e) {
          for (
            var n,
              a,
              s = (function (t) {
                if (null === t || void 0 === t)
                  throw new TypeError(
                    "Object.assign cannot be called with null or undefined"
                  );
                return Object(t);
              })(t),
              u = 1;
            u < arguments.length;
            u++
          ) {
            for (var c in (n = Object(arguments[u])))
              i.call(n, c) && (s[c] = n[c]);
            if (r) {
              a = r(n);
              for (var l = 0; l < a.length; l++)
                o.call(n, a[l]) && (s[a[l]] = n[a[l]]);
            }
          }
          return s;
        };
  },
  function (t, e, n) {
    (function (t) {
      var r =
          Object.getOwnPropertyDescriptors ||
          function (t) {
            for (var e = Object.keys(t), n = {}, r = 0; r < e.length; r++)
              n[e[r]] = Object.getOwnPropertyDescriptor(t, e[r]);
            return n;
          },
        i = /%[sdj%]/g;
      (e.format = function (t) {
        if (!m(t)) {
          for (var e = [], n = 0; n < arguments.length; n++)
            e.push(s(arguments[n]));
          return e.join(" ");
        }
        n = 1;
        for (
          var r = arguments,
            o = r.length,
            a = String(t).replace(i, function (t) {
              if ("%%" === t) return "%";
              if (n >= o) return t;
              switch (t) {
                case "%s":
                  return String(r[n++]);
                case "%d":
                  return Number(r[n++]);
                case "%j":
                  try {
                    return JSON.stringify(r[n++]);
                  } catch (t) {
                    return "[Circular]";
                  }
                default:
                  return t;
              }
            }),
            u = r[n];
          n < o;
          u = r[++n]
        )
          v(u) || !w(u) ? (a += " " + u) : (a += " " + s(u));
        return a;
      }),
        (e.deprecate = function (n, r) {
          if ("undefined" !== typeof t && !0 === t.noDeprecation) return n;
          if ("undefined" === typeof t)
            return function () {
              return e.deprecate(n, r).apply(this, arguments);
            };
          var i = !1;
          return function () {
            if (!i) {
              if (t.throwDeprecation) throw new Error(r);
              t.traceDeprecation ? console.trace(r) : console.error(r),
                (i = !0);
            }
            return n.apply(this, arguments);
          };
        });
      var o,
        a = {};
      function s(t, n) {
        var r = { seen: [], stylize: c };
        return (
          arguments.length >= 3 && (r.depth = arguments[2]),
          arguments.length >= 4 && (r.colors = arguments[3]),
          p(n) ? (r.showHidden = n) : n && e._extend(r, n),
          y(r.showHidden) && (r.showHidden = !1),
          y(r.depth) && (r.depth = 2),
          y(r.colors) && (r.colors = !1),
          y(r.customInspect) && (r.customInspect = !0),
          r.colors && (r.stylize = u),
          l(r, t, r.depth)
        );
      }
      function u(t, e) {
        var n = s.styles[e];
        return n
          ? "\x1b[" + s.colors[n][0] + "m" + t + "\x1b[" + s.colors[n][1] + "m"
          : t;
      }
      function c(t, e) {
        return t;
      }
      function l(t, n, r) {
        if (
          t.customInspect &&
          n &&
          x(n.inspect) &&
          n.inspect !== e.inspect &&
          (!n.constructor || n.constructor.prototype !== n)
        ) {
          var i = n.inspect(r, t);
          return m(i) || (i = l(t, i, r)), i;
        }
        var o = (function (t, e) {
          if (y(e)) return t.stylize("undefined", "undefined");
          if (m(e)) {
            var n =
              "'" +
              JSON.stringify(e)
                .replace(/^"|"$/g, "")
                .replace(/'/g, "\\'")
                .replace(/\\"/g, '"') +
              "'";
            return t.stylize(n, "string");
          }
          if (g(e)) return t.stylize("" + e, "number");
          if (p(e)) return t.stylize("" + e, "boolean");
          if (v(e)) return t.stylize("null", "null");
        })(t, n);
        if (o) return o;
        var a = Object.keys(n),
          s = (function (t) {
            var e = {};
            return (
              t.forEach(function (t, n) {
                e[t] = !0;
              }),
              e
            );
          })(a);
        if (
          (t.showHidden && (a = Object.getOwnPropertyNames(n)),
          T(n) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0))
        )
          return f(n);
        if (0 === a.length) {
          if (x(n)) {
            var u = n.name ? ": " + n.name : "";
            return t.stylize("[Function" + u + "]", "special");
          }
          if (b(n))
            return t.stylize(RegExp.prototype.toString.call(n), "regexp");
          if (S(n)) return t.stylize(Date.prototype.toString.call(n), "date");
          if (T(n)) return f(n);
        }
        var c,
          w = "",
          E = !1,
          A = ["{", "}"];
        (d(n) && ((E = !0), (A = ["[", "]"])), x(n)) &&
          (w = " [Function" + (n.name ? ": " + n.name : "") + "]");
        return (
          b(n) && (w = " " + RegExp.prototype.toString.call(n)),
          S(n) && (w = " " + Date.prototype.toUTCString.call(n)),
          T(n) && (w = " " + f(n)),
          0 !== a.length || (E && 0 != n.length)
            ? r < 0
              ? b(n)
                ? t.stylize(RegExp.prototype.toString.call(n), "regexp")
                : t.stylize("[Object]", "special")
              : (t.seen.push(n),
                (c = E
                  ? (function (t, e, n, r, i) {
                      for (var o = [], a = 0, s = e.length; a < s; ++a)
                        _(e, String(a))
                          ? o.push(h(t, e, n, r, String(a), !0))
                          : o.push("");
                      return (
                        i.forEach(function (i) {
                          i.match(/^\d+$/) || o.push(h(t, e, n, r, i, !0));
                        }),
                        o
                      );
                    })(t, n, r, s, a)
                  : a.map(function (e) {
                      return h(t, n, r, s, e, E);
                    })),
                t.seen.pop(),
                (function (t, e, n) {
                  if (
                    t.reduce(function (t, e) {
                      return (
                        0,
                        e.indexOf("\n") >= 0 && 0,
                        t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
                      );
                    }, 0) > 60
                  )
                    return (
                      n[0] +
                      ("" === e ? "" : e + "\n ") +
                      " " +
                      t.join(",\n  ") +
                      " " +
                      n[1]
                    );
                  return n[0] + e + " " + t.join(", ") + " " + n[1];
                })(c, w, A))
            : A[0] + w + A[1]
        );
      }
      function f(t) {
        return "[" + Error.prototype.toString.call(t) + "]";
      }
      function h(t, e, n, r, i, o) {
        var a, s, u;
        if (
          ((u = Object.getOwnPropertyDescriptor(e, i) || { value: e[i] }).get
            ? (s = u.set
                ? t.stylize("[Getter/Setter]", "special")
                : t.stylize("[Getter]", "special"))
            : u.set && (s = t.stylize("[Setter]", "special")),
          _(r, i) || (a = "[" + i + "]"),
          s ||
            (t.seen.indexOf(u.value) < 0
              ? (s = v(n) ? l(t, u.value, null) : l(t, u.value, n - 1)).indexOf(
                  "\n"
                ) > -1 &&
                (s = o
                  ? s
                      .split("\n")
                      .map(function (t) {
                        return "  " + t;
                      })
                      .join("\n")
                      .substr(2)
                  : "\n" +
                    s
                      .split("\n")
                      .map(function (t) {
                        return "   " + t;
                      })
                      .join("\n"))
              : (s = t.stylize("[Circular]", "special"))),
          y(a))
        ) {
          if (o && i.match(/^\d+$/)) return s;
          (a = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
            ? ((a = a.substr(1, a.length - 2)), (a = t.stylize(a, "name")))
            : ((a = a
                .replace(/'/g, "\\'")
                .replace(/\\"/g, '"')
                .replace(/(^"|"$)/g, "'")),
              (a = t.stylize(a, "string")));
        }
        return a + ": " + s;
      }
      function d(t) {
        return Array.isArray(t);
      }
      function p(t) {
        return "boolean" === typeof t;
      }
      function v(t) {
        return null === t;
      }
      function g(t) {
        return "number" === typeof t;
      }
      function m(t) {
        return "string" === typeof t;
      }
      function y(t) {
        return void 0 === t;
      }
      function b(t) {
        return w(t) && "[object RegExp]" === E(t);
      }
      function w(t) {
        return "object" === typeof t && null !== t;
      }
      function S(t) {
        return w(t) && "[object Date]" === E(t);
      }
      function T(t) {
        return w(t) && ("[object Error]" === E(t) || t instanceof Error);
      }
      function x(t) {
        return "function" === typeof t;
      }
      function E(t) {
        return Object.prototype.toString.call(t);
      }
      function A(t) {
        return t < 10 ? "0" + t.toString(10) : t.toString(10);
      }
      (e.debuglog = function (n) {
        if (
          (y(o) && (o = t.env.NODE_DEBUG || ""), (n = n.toUpperCase()), !a[n])
        )
          if (new RegExp("\\b" + n + "\\b", "i").test(o)) {
            var r = t.pid;
            a[n] = function () {
              var t = e.format.apply(e, arguments);
              console.error("%s %d: %s", n, r, t);
            };
          } else a[n] = function () {};
        return a[n];
      }),
        (e.inspect = s),
        (s.colors = {
          bold: [1, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          white: [37, 39],
          grey: [90, 39],
          black: [30, 39],
          blue: [34, 39],
          cyan: [36, 39],
          green: [32, 39],
          magenta: [35, 39],
          red: [31, 39],
          yellow: [33, 39],
        }),
        (s.styles = {
          special: "cyan",
          number: "yellow",
          boolean: "yellow",
          undefined: "grey",
          null: "bold",
          string: "green",
          date: "magenta",
          regexp: "red",
        }),
        (e.isArray = d),
        (e.isBoolean = p),
        (e.isNull = v),
        (e.isNullOrUndefined = function (t) {
          return null == t;
        }),
        (e.isNumber = g),
        (e.isString = m),
        (e.isSymbol = function (t) {
          return "symbol" === typeof t;
        }),
        (e.isUndefined = y),
        (e.isRegExp = b),
        (e.isObject = w),
        (e.isDate = S),
        (e.isError = T),
        (e.isFunction = x),
        (e.isPrimitive = function (t) {
          return (
            null === t ||
            "boolean" === typeof t ||
            "number" === typeof t ||
            "string" === typeof t ||
            "symbol" === typeof t ||
            "undefined" === typeof t
          );
        }),
        (e.isBuffer = n(130));
      var R = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      function _(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      (e.log = function () {
        (function () {
          var t = new Date(),
            e = [A(t.getHours()), A(t.getMinutes()), A(t.getSeconds())].join(
              ":"
            );
          [t.getDate(), R[t.getMonth()], e].join(" ");
        })(),
          e.format.apply(e, arguments);
      }),
        (e.inherits = n(131)),
        (e._extend = function (t, e) {
          if (!e || !w(e)) return t;
          for (var n = Object.keys(e), r = n.length; r--; ) t[n[r]] = e[n[r]];
          return t;
        });
      var k =
        "undefined" !== typeof Symbol
          ? Symbol("util.promisify.custom")
          : void 0;
      function D(t, e) {
        if (!t) {
          var n = new Error("Promise was rejected with a falsy value");
          (n.reason = t), (t = n);
        }
        return e(t);
      }
      (e.promisify = function (t) {
        if ("function" !== typeof t)
          throw new TypeError(
            'The "original" argument must be of type Function'
          );
        if (k && t[k]) {
          var e;
          if ("function" !== typeof (e = t[k]))
            throw new TypeError(
              'The "util.promisify.custom" argument must be of type Function'
            );
          return (
            Object.defineProperty(e, k, {
              value: e,
              enumerable: !1,
              writable: !1,
              configurable: !0,
            }),
            e
          );
        }
        function e() {
          for (
            var e,
              n,
              r = new Promise(function (t, r) {
                (e = t), (n = r);
              }),
              i = [],
              o = 0;
            o < arguments.length;
            o++
          )
            i.push(arguments[o]);
          i.push(function (t, r) {
            t ? n(t) : e(r);
          });
          try {
            t.apply(this, i);
          } catch (t) {
            n(t);
          }
          return r;
        }
        return (
          Object.setPrototypeOf(e, Object.getPrototypeOf(t)),
          k &&
            Object.defineProperty(e, k, {
              value: e,
              enumerable: !1,
              writable: !1,
              configurable: !0,
            }),
          Object.defineProperties(e, r(t))
        );
      }),
        (e.promisify.custom = k),
        (e.callbackify = function (e) {
          if ("function" !== typeof e)
            throw new TypeError(
              'The "original" argument must be of type Function'
            );
          function n() {
            for (var n = [], r = 0; r < arguments.length; r++)
              n.push(arguments[r]);
            var i = n.pop();
            if ("function" !== typeof i)
              throw new TypeError("The last argument must be of type Function");
            var o = this,
              a = function () {
                return i.apply(o, arguments);
              };
            e.apply(this, n).then(
              function (e) {
                t.nextTick(a, null, e);
              },
              function (e) {
                t.nextTick(D, e, a);
              }
            );
          }
          return (
            Object.setPrototypeOf(n, Object.getPrototypeOf(e)),
            Object.defineProperties(n, r(e)),
            n
          );
        });
    }).call(this, n(46));
  },
  function (t, e) {
    t.exports = function (t) {
      return (
        t &&
        "object" === typeof t &&
        "function" === typeof t.copy &&
        "function" === typeof t.fill &&
        "function" === typeof t.readUInt8
      );
    };
  },
  function (t, e) {
    "function" === typeof Object.create
      ? (t.exports = function (t, e) {
          (t.super_ = e),
            (t.prototype = Object.create(e.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            }));
        })
      : (t.exports = function (t, e) {
          t.super_ = e;
          var n = function () {};
          (n.prototype = e.prototype),
            (t.prototype = new n()),
            (t.prototype.constructor = t);
        });
  },
  function (t, e, n) {
    (function (e) {
      var r = n(55),
        i = n(30),
        o = n(29).InvalidAsn1Error,
        a = { size: 1024, growthFactor: 8 };
      function s(t) {
        var n, i;
        (n = a),
          (i = t || {}),
          r.ok(n),
          r.equal(typeof n, "object"),
          r.ok(i),
          r.equal(typeof i, "object"),
          Object.getOwnPropertyNames(n).forEach(function (t) {
            if (!i[t]) {
              var e = Object.getOwnPropertyDescriptor(n, t);
              Object.defineProperty(i, t, e);
            }
          }),
          (t = i),
          (this._buf = e.alloc(t.size || 1024)),
          (this._size = this._buf.length),
          (this._offset = 0),
          (this._options = t),
          (this._seq = []);
      }
      Object.defineProperty(s.prototype, "buffer", {
        get: function () {
          if (this._seq.length)
            throw new o(this._seq.length + " unended sequence(s)");
          return this._buf.slice(0, this._offset);
        },
      }),
        (s.prototype.writeByte = function (t) {
          if ("number" !== typeof t)
            throw new TypeError("argument must be a Number");
          this._ensure(1), (this._buf[this._offset++] = t);
        }),
        (s.prototype.writeInt = function (t, e) {
          if (!Number.isInteger(t))
            throw new TypeError("argument must be an integer");
          "number" !== typeof e && (e = i.Integer);
          let n = [];
          for (; t < -128 || t >= 128; )
            n.push(255 & t), (t = Math.floor(t / 256));
          for (
            n.push(255 & t),
              this._ensure(2 + n.length),
              this._buf[this._offset++] = e,
              this._buf[this._offset++] = n.length;
            n.length;

          )
            this._buf[this._offset++] = n.pop();
        }),
        (s.prototype.writeNull = function () {
          this.writeByte(i.Null), this.writeByte(0);
        }),
        (s.prototype.writeEnumeration = function (t, e) {
          if ("number" !== typeof t)
            throw new TypeError("argument must be a Number");
          return (
            "number" !== typeof e && (e = i.Enumeration), this.writeInt(t, e)
          );
        }),
        (s.prototype.writeBoolean = function (t, e) {
          if ("boolean" !== typeof t)
            throw new TypeError("argument must be a Boolean");
          "number" !== typeof e && (e = i.Boolean),
            this._ensure(3),
            (this._buf[this._offset++] = e),
            (this._buf[this._offset++] = 1),
            (this._buf[this._offset++] = t ? 255 : 0);
        }),
        (s.prototype.writeString = function (t, n) {
          if ("string" !== typeof t)
            throw new TypeError(
              "argument must be a string (was: " + typeof t + ")"
            );
          "number" !== typeof n && (n = i.OctetString);
          var r = e.byteLength(t);
          this.writeByte(n),
            this.writeLength(r),
            r &&
              (this._ensure(r),
              this._buf.write(t, this._offset),
              (this._offset += r));
        }),
        (s.prototype.writeBuffer = function (t, n) {
          if (!e.isBuffer(t)) throw new TypeError("argument must be a buffer");
          "number" === typeof n &&
            (this.writeByte(n), this.writeLength(t.length)),
            t.length > 0 &&
              (this._ensure(t.length),
              t.copy(this._buf, this._offset, 0, t.length),
              (this._offset += t.length));
        }),
        (s.prototype.writeStringArray = function (t, e) {
          if (!(t instanceof Array))
            throw new TypeError("argument must be an Array[String]");
          var n = this;
          t.forEach(function (t) {
            n.writeString(t, e);
          });
        }),
        (s.prototype.writeOID = function (t, e) {
          if ("string" !== typeof t)
            throw new TypeError("argument must be a string");
          if (
            ("number" !== typeof e && (e = i.OID),
            !/^([0-9]+\.){0,}[0-9]+$/.test(t))
          )
            throw new Error("argument is not a valid OID string");
          var n = t.split("."),
            r = [];
          r.push(40 * parseInt(n[0], 10) + parseInt(n[1], 10)),
            n.slice(2).forEach(function (t) {
              !(function (t, e) {
                e < 128
                  ? t.push(e)
                  : e < 16384
                  ? (t.push((e >>> 7) | 128), t.push(127 & e))
                  : e < 2097152
                  ? (t.push((e >>> 14) | 128),
                    t.push(255 & ((e >>> 7) | 128)),
                    t.push(127 & e))
                  : e < 268435456
                  ? (t.push((e >>> 21) | 128),
                    t.push(255 & ((e >>> 14) | 128)),
                    t.push(255 & ((e >>> 7) | 128)),
                    t.push(127 & e))
                  : (t.push(255 & ((e >>> 28) | 128)),
                    t.push(255 & ((e >>> 21) | 128)),
                    t.push(255 & ((e >>> 14) | 128)),
                    t.push(255 & ((e >>> 7) | 128)),
                    t.push(127 & e));
              })(r, parseInt(t, 10));
            });
          var o = this;
          this._ensure(2 + r.length),
            this.writeByte(e),
            this.writeLength(r.length),
            r.forEach(function (t) {
              o.writeByte(t);
            });
        }),
        (s.prototype.writeLength = function (t) {
          if ("number" !== typeof t)
            throw new TypeError("argument must be a Number");
          if ((this._ensure(4), t <= 127)) this._buf[this._offset++] = t;
          else if (t <= 255)
            (this._buf[this._offset++] = 129), (this._buf[this._offset++] = t);
          else if (t <= 65535)
            (this._buf[this._offset++] = 130),
              (this._buf[this._offset++] = t >> 8),
              (this._buf[this._offset++] = t);
          else {
            if (!(t <= 16777215)) throw new o("Length too long (> 4 bytes)");
            (this._buf[this._offset++] = 131),
              (this._buf[this._offset++] = t >> 16),
              (this._buf[this._offset++] = t >> 8),
              (this._buf[this._offset++] = t);
          }
        }),
        (s.prototype.startSequence = function (t) {
          "number" !== typeof t && (t = i.Sequence | i.Constructor),
            this.writeByte(t),
            this._seq.push(this._offset),
            this._ensure(3),
            (this._offset += 3);
        }),
        (s.prototype.endSequence = function () {
          var t = this._seq.pop(),
            e = t + 3,
            n = this._offset - e;
          if (n <= 127) this._shift(e, n, -2), (this._buf[t] = n);
          else if (n <= 255)
            this._shift(e, n, -1), (this._buf[t] = 129), (this._buf[t + 1] = n);
          else if (n <= 65535)
            (this._buf[t] = 130),
              (this._buf[t + 1] = n >> 8),
              (this._buf[t + 2] = n);
          else {
            if (!(n <= 16777215)) throw new o("Sequence too long");
            this._shift(e, n, 1),
              (this._buf[t] = 131),
              (this._buf[t + 1] = n >> 16),
              (this._buf[t + 2] = n >> 8),
              (this._buf[t + 3] = n);
          }
        }),
        (s.prototype._shift = function (t, e, n) {
          r.ok(void 0 !== t),
            r.ok(void 0 !== e),
            r.ok(n),
            this._buf.copy(this._buf, t + n, t, t + e),
            (this._offset += n);
        }),
        (s.prototype._ensure = function (t) {
          if ((r.ok(t), this._size - this._offset < t)) {
            var n = this._size * this._options.growthFactor;
            n - this._offset < t && (n += t);
            var i = e.alloc(n);
            this._buf.copy(i, 0, 0, this._offset),
              (this._buf = i),
              (this._size = n);
          }
        }),
        (t.exports = s);
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.GetFirstWeekBegDay = p),
      (e.GetWeekIndex = function (t) {
        var e = p(t.getFullYear());
        t < e && (e = p(t.getFullYear() - 1));
        var n = Math.floor((t.valueOf() - e.valueOf()) / 864e5);
        return Math.floor(n / 7) + 1;
      }),
      (e.arrayInclude = e.arrayErase = e.ajax = void 0),
      (e.chkMutilCallRet = function (t, e) {
        var n = !0;
        if (Array.isArray(t)) {
          var r = l(t, function (t) {
            return t && !t.result;
          }).length;
          n = e ? r !== t.length : !r;
        }
        return n;
      }),
      (e.clone = function t(e) {
        var n;
        if ("object" === (0, i.default)(e))
          if (null === e) n = null;
          else if (Array.isArray(e)) {
            n = [];
            for (var r = 0, o = e.length; r < o; r++) n.push(t(e[r]));
          } else for (var a in ((n = {}), e)) n[a] = t(e[a]);
        else n = e;
        return n;
      }),
      (e.debounce = e.copy = void 0),
      (e.formatDate = f),
      (e.getBeginDateOfWeek = function (t, e) {
        var n = p(t),
          r = 7 * (e - 1) * 24 * 36e5,
          i = n;
        return i.setTime(n.valueOf() + r), f(i, "yyyy-MM-dd");
      }),
      (e.getBrowserInfo = void 0),
      (e.getEndDateOfWeek = function (t, e) {
        var n = p(t),
          r = 7 * (e - 1) * 24 * 36e5,
          i = n;
        return i.setTime(n.valueOf() + 5184e5 + r), f(i, "yyyy-MM-dd");
      }),
      (e.getMonthDays = d),
      (e.getMonthEndDate = function (t, e) {
        return f(new Date(t, e, d(t, e)), "yyyy-MM-dd");
      }),
      (e.getMonthStartDate = function (t, e) {
        return f(new Date(t, e, 1), "yyyy-MM-dd");
      }),
      (e.getQuarterEndDate = function (t, e) {
        switch (e) {
          case 1:
            return t + "-03-31";
          case 2:
            return t + "-06-30";
          case 3:
            return t + "-09-30";
          case 4:
            return t + "-12-31";
        }
      }),
      (e.getQuarterStartDate = function (t, e) {
        switch (e) {
          case 1:
            return t + "-01-01";
          case 2:
            return t + "-04-01";
          case 3:
            return t + "-07-01";
          case 4:
            return t + "-10-01";
        }
      }),
      (e.getType = void 0),
      (e.grep = l),
      (e.iframe = void 0),
      (e.isEmptyRect = function (t) {
        if (!Array.isArray(t)) return !0;
        if (2 !== t.length) return !0;
        if (!Array.isArray(t[0])) return !0;
        if (!Array.isArray(t[1])) return !0;
        if (t[0][0] || t[0][1] || t[1][0] || t[1][1]) return !1;
        return !1;
      }),
      (e.isZeroArray = function (t) {
        if (Array.isArray(t)) {
          var e = t.toString().split(","),
            n = Math.max.apply(null, e),
            r = Math.min.apply(null, e);
          return 0 === n && 0 === r;
        }
        return !0;
      }),
      (e.throttle = e.setDocumentContains = e.playMode = void 0);
    var i = r(n(12)),
      o = n(25),
      a = void 0,
      s = 1e3,
      u = function (t) {
        return Object.prototype.toString.call(t).replace(/^\[object |\]$/g, "");
      };
    e.getType = u;
    e.copy = function t(e, n) {
      for (var r in (n || ((n = e), (e = "Array" === u(e) ? [] : {})), n))
        "Array" === u(n[r])
          ? ((e[r] = e[r] || []), t(e[r], n[r]))
          : "Object" === u(n[r])
          ? ((e[r] = e[r] || {}), t(e[r], n[r]))
          : (e[r] = n[r]);
      return e;
    };
    var c = {
      devNotify: {
        comet: !1,
        form: "",
        topics: {},
        initComet: function () {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          if (!1 === this.comet) {
            var e = "/SubscribeNotify.cgi?sessionId=" + t;
            WebApp.httpOnly && (e = "/SubscribeNotify.cgi"),
              (this.sessionID = t);
            var n = document.createElement("iframe");
            n.setAttribute("id", "comet_iframe_new"),
              n.setAttribute("src", e),
              (n.style.display = "none"),
              document.body.appendChild(n),
              (this.iframe = n),
              (window.receiveMessage = this.publish.bind(this)),
              (this.comet = !0);
          } else window.receiveMessage = this.publish.bind(this);
        },
        subscribe: function (t, e) {
          this.topics[t] || (this.topics[t] = new Set()), this.topics[t].add(e);
        },
        publish: function (t) {
          var e = t.method;
          if (this.topics[e])
            try {
              this.topics[e].forEach(function (e) {
                e(t.params);
              });
            } catch (t) {}
        },
        detach: function (t, e) {
          e
            ? this.topics[t] && this.topics[t].delete(e)
            : delete this.topics[t];
        },
        reconnect: function () {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          (this.iframe.src = "/SubscribeNotify.cgi?sessionId=" + t),
            WebApp.httpOnly && (this.iframe.src = "/SubscribeNotify.cgi");
        },
      },
    };
    function l(t, e, n) {
      for (var r = [], i = 0, o = t.length, a = !n; i < o; i++)
        !e(t[i], i) !== a && r.push(t[i]);
      return r;
    }
    function f(t, e) {
      /(y+)/.test(e) &&
        (e = e.replace(
          RegExp.$1,
          (t.getFullYear() + "").substr(4 - RegExp.$1.length)
        ));
      var n = {
        "M+": t.getMonth() + 1,
        "d+": t.getDate(),
        "h+": t.getHours(),
        "m+": t.getMinutes(),
        "s+": t.getSeconds(),
      };
      for (var r in n)
        if (new RegExp("(".concat(r, ")")).test(e)) {
          var i = n[r] + "";
          e = e.replace(RegExp.$1, 1 === RegExp.$1.length ? i : h(i));
        }
      return e;
    }
    function h(t) {
      return ("00" + t).substr(t.length);
    }
    function d(t, e) {
      var n = new Date(t, e, 1);
      return (new Date(t, e + 1, 1) - n) / 864e5;
    }
    function p(t) {
      var e = new Date(t, 0, 1),
        n = e.getDay();
      return 1 === n
        ? e
        : ((n = 0 === n ? 7 : n),
          (e = e.setDate(e.getDate() + (8 - n))),
          new Date(e));
    }
    e.iframe = c;
    var v = function () {
      var t = navigator.userAgent.toLowerCase(),
        e = navigator.platform.toLowerCase(),
        n = t.match(
          /(opera|ie|trident|firefox|chrome|version)[\s/:]([\w\d.]+)?.*?(safari|version[\s/:]([\w\d.]+)|rv:(\d.?)|$)/
        ) || [null, "unknown", 0],
        r = ("ie" === n[1] || "trident" === n[1]) && document.documentMode,
        i = {
          name: "version" === n[1] ? n[3] : "trident" === n[1] ? "ie" : n[1],
          version:
            r ||
            parseFloat(
              "opera" === n[1] && n[4]
                ? n[4]
                : "trident" === n[1] && n[5]
                ? n[5]
                : n[2]
            ),
          Platform: {
            name: t.match(/ip(?:ad|od|hone)/)
              ? "ios"
              : (t.match(/(?:webos|android)/) ||
                  e.match(/mac|win|linux/) || ["other"])[0],
          },
        };
      return (
        (i[i.name] = !0),
        (i[i.name + parseInt(i.version, 10)] = !0),
        (i.Platform[i.Platform.name] = !0),
        i
      );
    };
    e.getBrowserInfo = v;
    var g = v(),
      m =
        (g.chrome && g.version >= 42) || (g.firefox && g.version >= 52)
          ? "H5"
          : "ocx";
    e.playMode = m;
    e.ajax = function (t) {
      var e = Object.assign(
        {},
        { params: null, session: (0, o._getSession)(), id: s++ },
        { method: t.url }
      );
      if (
        ((t.data = JSON.stringify(e)),
        (t.url = "RPC2"),
        (t.method = "post"),
        (t.callback = t.callback || ""),
        (t.async = t.async || !1),
        "get" === t.method.toLowerCase())
      ) {
        if ("object" === (0, i.default)(t.data))
          for (var n in ((t.data = []), t.data))
            t.data.push(n + "=" + t.data[n]), t.data.join("&");
        t.url += (t.url.indexOf(!1) ? "?" : "") + t.data;
      }
      if (
        "post" === t.method.toLowerCase() &&
        "object" === (0, i.default)(t.data)
      ) {
        var r = [];
        for (var a in t.data) r.push(a + "=" + t.data[a]);
        t.data = r.join("&");
      }
      var u = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new window.ActiveXObject("Microsoft.XMLHTTP");
      function c() {
        200 === u.status
          ? t.callback && t.callback(u.responseText)
          : t.callback && t.callback("error:" + u.status + u.statusText);
      }
      u.open(t.method, t.url, t.async),
        "post" === t.method
          ? (u.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            ),
            u.send(t.data))
          : u.send(null),
        !0 === t.async &&
          (u.onreadystatechange = function () {
            4 === u.readyState && c();
          }),
        !1 === t.async && c();
    };
    e.throttle = function (t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
        n = null;
      return function (r) {
        for (
          var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), s = 1;
          s < i;
          s++
        )
          o[s - 1] = arguments[s];
        clearTimeout(n),
          r.persist && r.persist(),
          (n = setTimeout(function () {
            t.call.apply(t, [a, r].concat(o));
          }, e));
      };
    };
    e.debounce = function (t) {
      var e,
        n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
      return function () {
        for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++)
          i[o] = arguments[o];
        e &&
          (clearTimeout(e),
          (e = setTimeout(function () {
            t.call.apply(t, [a].concat(i));
          }, n)));
      };
    };
    e.arrayInclude = function (t, e) {
      e.includes(t) || e.push(t);
    };
    e.arrayErase = function (t, e) {
      for (var n = e.length; n--; ) e[n] === t && e.splice(n, 1);
    };
    e.setDocumentContains = function () {
      Document.prototype.contains ||
        (Document.prototype.contains = function (t) {
          var e = t.parentNode;
          do {
            if (e === this) return !0;
            e = e.parentNode;
          } while (null !== e);
          return !1;
        });
    };
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.loginError = function (t, e) {
        var n = t.error && t.error.code,
          r = (t.params && t.params.remainLockSecond) || void 0,
          i = (t.params && t.params.remainLoginTimes) || void 0;
        switch (n) {
          case 268632081:
            r
              ? alert(
                  "".concat(
                    "\u5e10\u53f7\u9501\u5b9a\uff0c\u8bf7\u91cd\u542f\u6216\u7b49\u5f85XXX\u79d2\u540e\u91cd\u8bd5".replace(
                      "XXX",
                      r
                    )
                  )
                )
              : alert("\u5e10\u53f7\u5df2\u88ab\u9501\u5b9a");
            break;
          case 268632085:
            i
              ? alert(
                  "".concat(
                    "\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef\uff0c\u8fd8\u5269\u4e0b%d\u6b21\u5c1d\u8bd5\u673a\u4f1a".replace(
                      "%d",
                      i
                    )
                  )
                )
              : alert("\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef");
            break;
          case 268632070:
            alert("\u5e10\u53f7\u4e0d\u5b58\u5728");
            break;
          case 268632071:
            alert("\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef");
            break;
          case 268632073:
            alert(
              "\u4f60\u7684\u7535\u8111IP\u4e0d\u5728\u767d\u540d\u5355\u5185"
            );
            break;
          case 268632074:
            alert("\u5e10\u53f7\u5df2\u767b\u5f55");
            break;
          case 268632075:
            alert("\u8d85\u8fc7\u6700\u5927\u8fde\u63a5\u6570");
            break;
          case 268632090:
            alert(
              "\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5\u3002"
            );
            break;
          case 268632093:
            alert("\u767b\u5f55\u53d7\u9650");
            break;
          default:
            alert("\u767b\u5f55\u5931\u8d25");
        }
      });
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.setCookie = e.getCookie = void 0);
    e.setCookie = function (t, e, n) {
      var r = new Date();
      r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3);
      var i = "expires=" + r.toUTCString();
      document.cookie = t + "=" + e + "; " + i;
    };
    e.getCookie = function (t) {
      for (
        var e = t + "=", n = document.cookie.split(";"), r = 0;
        r < n.length;
        r++
      ) {
        for (var i = n[r]; " " === i.charAt(0); ) i = i.substring(1);
        if (-1 !== i.indexOf(e)) return i.substring(e.length, i.length);
      }
      return "";
    };
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.BrowserInfo = function () {
        var t = navigator.userAgent.toLowerCase(),
          e = navigator.platform.toLowerCase(),
          n = t.match(
            /(opera|ie|trident|firefox|chrome|version)[\s/:]([\w\d.]+)?.*?(safari|version[\s/:]([\w\d.]+)|rv:(\d.?)|$)/
          ) || [null, "unknown", 0],
          r = ("ie" === n[1] || "trident" === n[1]) && document.documentMode,
          i = {
            name: "version" === n[1] ? n[3] : "trident" === n[1] ? "ie" : n[1],
            version:
              r ||
              parseFloat(
                "opera" === n[1] && n[4]
                  ? n[4]
                  : "trident" === n[1] && n[5]
                  ? n[5]
                  : n[2]
              ),
            Platform: {
              name: t.match(/ip(?:ad|od|hone)/)
                ? "ios"
                : (t.match(/(?:webos|android)/) ||
                    e.match(/mac|win|linux/) || ["other"])[0],
            },
          };
        return (
          (i[i.name] = !0),
          (i[i.name + parseInt(i.version, 10)] = !0),
          (i.Platform[i.Platform.name] = !0),
          i
        );
      }),
      (e.BrowserType = function () {
        var t = navigator.userAgent.toLowerCase(),
          e = navigator.appName,
          n = null,
          r = 0;
        if (
          (t.replace(
            /(chrome\/|firefox\/|version\/|rv:)(\d+)(?=.)/gi,
            function (t, e, n) {
              r = n;
            }
          ),
          "Microsoft Internet Explorer" === e ||
            t.indexOf("trident") > -1 ||
            t.indexOf("edge/") > -1 ||
            t.indexOf("edg/") > -1)
        )
          return (
            (n = "ie"),
            "Microsoft Internet Explorer" === e
              ? ((t = /msie ([0-9]{1,}[.0-9]{0,})/.exec(t)),
                (n += parseInt(t[1])))
              : t.indexOf("trident") > -1
              ? (n += 11)
              : (t.indexOf("edge/") > -1 || t.indexOf("edg/") > -1) &&
                (n = "edge"),
            n
          );
        t.indexOf("safari") > -1
          ? (n = t.indexOf("chrome") > -1 ? "chrome" : "safari")
          : t.indexOf("firefox") > -1 && (n = "firefox");
        return n + "-" + r;
      });
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.PluginCanvasES6 = void 0);
    var r = n(138),
      i = n(31),
      o = n(32),
      a = n(56),
      s = n(139);
    e.PluginCanvasES6 = function () {
      var t = {
          strokeColor: "#0000FF",
          selectedColor: "#FFFF00",
          lineWidth: 1,
          font: "normal normal 100 10px arial",
          closeEnable: !0,
        },
        e = this;
      (this.beginPoint = ""),
        (this.tempShape = ""),
        (this.tempData = ""),
        (this.tempDataCopy = ""),
        (this.parents = {});
      var n = {
        contextmenuFun: function (t) {
          t.preventDefault();
        },
      };
      (this.init = function (s, u) {
        for (var c in (e.canvasDom ||
          ((e.canvasDom = s),
          (e.ctx = e.canvasDom.getContext("2d")),
          (e.ctx.font = t.font),
          o.jQlib.getWidth(e.canvasDom),
          o.jQlib.getHeight(e.canvasDom),
          (e.coordinate = {
            widthDraw:
              o.jQlib.getWidth(e.canvasDom) / i.util.defalutCoordinate.width,
            heightDraw:
              o.jQlib.getHeight(e.canvasDom) / i.util.defalutCoordinate.height,
            widthMouse:
              i.util.defalutCoordinate.width / o.jQlib.getWidth(e.canvasDom),
            heightMouse:
              i.util.defalutCoordinate.height / o.jQlib.getHeight(e.canvasDom),
          }),
          (t.maxPoly = [
            [0, 0],
            [o.jQlib.getWidth(e.canvasDom) * e.coordinate.widthMouse, 0],
            [
              o.jQlib.getWidth(e.canvasDom) * e.coordinate.widthMouse,
              o.jQlib.getHeight(e.canvasDom) * e.coordinate.heightMouse,
            ],
            [0, o.jQlib.getHeight(e.canvasDom) * e.coordinate.heightMouse],
          ]),
          (e.eventFunc = u)),
        (i.util.eventEnabled = !0),
        (e.shape = {}),
        (e.shape.rectShape = new r.RectShape()),
        e.shape))
          e.shape[c].init(e.canvasDom, e.ctx, e.drawShape, u, e.coordinate);
        a.EventManager.off(e.canvasDom, "contextmenu").on(
          e.canvasDom,
          "contextmenu",
          n.contextmenuFun
        );
      }),
        (this.addChangeShapeEvent = function () {
          var t = null,
            n = {},
            r = !1,
            s = [];
          a.EventManager.off(e.canvasDom, "mousedown.move").on(
            e.canvasDom,
            "mousedown.move",
            function (a) {
              if (((r = !1), (e.beginPoint = null), 1 !== i.util.drawState)) {
                o.jQlib.each(e.shape, function (t, e) {
                  i.util.setUnSelected(e.data);
                }),
                  (i.util.moveFlag = !1),
                  (i.util.resizeFlag = !1);
                var u = [];
                o.jQlib.each(e.shape, function (t, e) {
                  u = u.concat(e.data);
                }),
                  u.sort(i.util.compareDesc),
                  o.jQlib.each(u, function (r, u) {
                    if (
                      ((e.tempData = e.shape[
                        u.option.type + "Shape"
                      ].checkOnPoint(a, u)),
                      !1 !== e.tempData)
                    )
                      return (
                        (i.util.resizeFlag = !0),
                        (s = e.parents[e.tempData.data.shapeId]),
                        (e.tempShape = e.shape[u.option.type + "Shape"]),
                        (e.tempData.data.option.zindex = i.util.zindex++),
                        (e.tempDataCopy = o.jQlib.extend(!0, {}, e.tempData)),
                        !1
                      );
                    if ("rhombus" === u.option.type) {
                      var c = e.shape.rhombusShape.checkOnLine(a, u);
                      if (c)
                        return (
                          (i.util.moveFlag = !0),
                          (t = null),
                          (e.tempShape = e.shape[u.option.type + "Shape"]),
                          (e.tempData = c),
                          (e.tempData.data.option.zindex = i.util.zindex++),
                          (e.beginPoint = [
                            Math.round(
                              (a.clientX -
                                i.util.offset(e.canvasDom).left +
                                window.scrollX) *
                                e.coordinate.widthMouse
                            ),
                            Math.round(
                              (a.clientY -
                                i.util.offset(e.canvasDom).top +
                                window.scrollY) *
                                e.coordinate.heightMouse
                            ),
                          ]),
                          (e.tempDataCopy = o.jQlib.extend(!0, {}, c)),
                          !1
                        );
                    }
                    if (
                      ((e.tempData = e.shape[
                        u.option.type + "Shape"
                      ].checkSelected(a, u)),
                      e.tempData)
                    ) {
                      i.util.moveFlag = !0;
                      var l = e.tempData.data.shapeId;
                      e.beginPoint = [
                        Math.round(
                          (a.clientX -
                            i.util.offset(e.canvasDom).left +
                            window.scrollX) *
                            e.coordinate.widthMouse
                        ),
                        Math.round(
                          (a.clientY -
                            i.util.offset(e.canvasDom).top +
                            window.scrollY) *
                            e.coordinate.heightMouse
                        ),
                      ];
                      var f = e.getParent(l);
                      return (
                        f && f.children && f.children.length > 0
                          ? ((t = {}),
                            (n = {}),
                            e.shape[
                              e.getShapeById(f.parentId).option.type + "Shape"
                            ],
                            (t.parentShapeData = e.getShapeById(f.parentId)),
                            (e.tempShape =
                              e.shape[t.parentShapeData.option.type + "Shape"]),
                            (e.tempData.data = t.parentShapeData),
                            (t.childrenShapeData = []),
                            (e.tempData.data.option.zindex = i.util.zindex++),
                            o.jQlib.each(f.children, function (n, r) {
                              var o = e.getShapeById(r);
                              (o.option.zindex = i.util.zindex++),
                                (o.option.selected = !0),
                                t.childrenShapeData.push(o);
                            }),
                            (e.beginPoint = [
                              Math.round(
                                (a.clientX -
                                  i.util.offset(e.canvasDom).left +
                                  window.scrollX) *
                                  e.coordinate.widthMouse
                              ),
                              Math.round(
                                (a.clientY -
                                  i.util.offset(e.canvasDom).top +
                                  window.scrollY) *
                                  e.coordinate.heightMouse
                              ),
                            ]),
                            (n = o.jQlib.extend(!0, {}, t)))
                          : ((t = null),
                            (e.tempShape = e.shape[u.option.type + "Shape"]),
                            (e.tempData.data.option.zindex = i.util.zindex++),
                            (e.beginPoint = [
                              Math.round(
                                (a.clientX -
                                  i.util.offset(e.canvasDom).left +
                                  window.scrollX) *
                                  e.coordinate.widthMouse
                              ),
                              Math.round(
                                (a.clientY -
                                  i.util.offset(e.canvasDom).top +
                                  window.scrollY) *
                                  e.coordinate.heightMouse
                              ),
                            ]),
                            (e.tempDataCopy = o.jQlib.extend(
                              !0,
                              {},
                              e.tempData
                            ))),
                        !1
                      );
                    }
                  }),
                  e.drawShape();
              }
            }
          ),
            a.EventManager.off(e.canvasDom, "mousemove.move").on(
              e.canvasDom,
              "mousemove.move",
              function (a) {
                if (i.util.resizeFlag && e.tempData.data.option.resizeEnable) {
                  if (
                    ((r = !0),
                    "poly" === e.tempData.data.option.type && s && s.length > 0)
                  ) {
                    var u = e.tempDataCopy.point,
                      c = o.jQlib.extend(!0, [], e.tempData.data.data),
                      l = [
                        Math.round(
                          (a.clientX -
                            i.util.offset(e.canvasDom).left +
                            window.scrollX) *
                            e.coordinate.widthMouse
                        ),
                        Math.round(
                          (a.clientY -
                            i.util.offset(e.canvasDom).top +
                            window.scrollY) *
                            e.coordinate.heightMouse
                        ),
                      ];
                    c[u] = l;
                    var f = u - 1,
                      h = u + 1;
                    f < 0 && (f = e.tempData.data.data.length - 1),
                      h > e.tempData.data.data.length - 1 && (h = 0);
                    var d = [];
                    (d[0] = [e.tempData.data.data[f], e.tempData.data.data[u]]),
                      (d[1] = [
                        e.tempData.data.data[u],
                        e.tempData.data.data[h],
                      ]);
                    var p = [];
                    (p[0] = [c[f], c[u]]), (p[1] = [c[u], c[h]]);
                    for (var v = 0; v < s.length; v++) {
                      var g = e.getShapeById(s[v]);
                      if (g && "line" === g.option.type) {
                        var m = i.util.lineCross(g.data, d),
                          y = i.util.lineCross(g.data, p);
                        if (!0 === m && !0 === y) return;
                      }
                    }
                  }
                  e.tempShape.resizeShape(
                    e.tempDataCopy.point,
                    a,
                    e.tempData.data
                  );
                } else if (i.util.moveFlag && e.tempData.data.option.moveEnable)
                  if (((r = !0), t)) {
                    if (
                      e.shape[
                        t.parentShapeData.option.type + "Shape"
                      ].moveShape(
                        e.beginPoint,
                        n.parentShapeData,
                        a,
                        t.parentShapeData
                      )
                    )
                      for (var b = 0; b < t.childrenShapeData.length; b++) {
                        var w = t.childrenShapeData[b],
                          S = n.childrenShapeData[b];
                        e.shape[w.option.type + "Shape"].moveShape(
                          e.beginPoint,
                          S,
                          a,
                          w,
                          !0
                        );
                      }
                  } else
                    e.tempShape.moveShape(
                      e.beginPoint,
                      e.tempDataCopy.data,
                      a,
                      e.tempData.data,
                      !1,
                      e.tempDataCopy.resizeLineIndex
                    );
              }
            );
          var u = function () {
            if (i.util.moveFlag)
              if (t) {
                var n = t.parentShapeData;
                (n.event = {}),
                  (n.event.type = r
                    ? i.util.eventName.moveFinish
                    : i.util.eventName.selectedFinish),
                  [].push(n),
                  i.util.eventEnabled && e.eventFunc && e.eventFunc(n);
              } else
                (e.tempData.data.event = {}),
                  (e.tempData.data.event.type = r
                    ? i.util.eventName.moveFinish
                    : i.util.eventName.selectedFinish),
                  i.util.eventEnabled &&
                    e.eventFunc &&
                    e.eventFunc(e.tempData.data);
            else
              i.util.resizeFlag &&
                ((e.tempData.data.event = {}),
                (e.tempData.data.event.type = r
                  ? i.util.eventName.resizeFinish
                  : i.util.eventName.selectedFinish),
                i.util.eventEnabled &&
                  e.eventFunc &&
                  e.eventFunc(e.tempData.data));
            (i.util.moveFlag = !1), (i.util.resizeFlag = !1), (r = !1);
          };
          a.EventManager.off(e.canvasDom, "mouseup.move").on(
            e.canvasDom,
            "mouseup.move",
            u
          ),
            a.EventManager.off(e.canvasDom, "mouseleave.move").on(
              e.canvasDom,
              "mouseleave.move",
              u
            );
        }),
        (this.removeShapeEvent = function () {
          a.EventManager.off(e.canvasDom, "mousedown.move")
            .off(e.canvasDom, "mousemove.move")
            .off(e.canvasDom, "mouseup.move")
            .off(e.canvasDom, "mouseleave.move");
        }),
        (this.removeShapeDrawEvent = function () {
          a.EventManager.off(e.canvasDom, "mousedown.draw")
            .off(e.canvasDom, "mousemove.draw")
            .off(e.canvasDom, "mouseup.draw")
            .off(e.canvasDom, "mouseleave.draw");
        }),
        (this.setRegionNum = function (t, n) {
          e.shape[t + "Shape"].regionNum = n;
        }),
        (this.addShape = function (n, r, a) {
          var s = o.jQlib.extend(!0, {}, t, a);
          (s.zindex = i.util.zindex++), (s.type = r);
          var u = e.shape[r + "Shape"].add(n, s);
          return u
            ? ((u.event = {}),
              (u.event.type = i.util.eventName.addFinish),
              i.util.eventEnabled && e.eventFunc && e.eventFunc(u),
              u)
            : null;
        }),
        (this.drawStart = function (n, r) {
          var i = o.jQlib.extend(!0, {}, t, r);
          e.shape[n + "Shape"].drawStart(i);
        }),
        (this.drawShape = function () {
          e.ctx.clearRect(
            0,
            0,
            o.jQlib.getWidth(e.canvasDom),
            o.jQlib.getHeight(e.canvasDom)
          );
          var t = (function (t) {
            var e = [];
            for (var n in t) e = e.concat(t[n].data);
            return e.sort(i.util.compare), e;
          })(e.shape);
          new s.FactoryGridShapeAction(t, e.canvasDom);
          for (var n = 0; n < t.length; n++)
            (e.ctx.lineWidth = t[n].option.lineWidth || 1),
              e.shape[t[n].option.type + "Shape"].draw(t[n]);
        }),
        (this.getShapeById = function (t) {
          if (void 0 === t || null === t || "" === t) {
            var n = [];
            return (
              o.jQlib.each(e.shape, function (t, e) {
                n = n.concat(e.data);
              }),
              o.jQlib.extend(!0, [], n)
            );
          }
          for (var r in e.shape) {
            n = e.shape[r].data;
            for (var i = 0; i < n.length; i++)
              if (n[i].shapeId === t) return n[i];
          }
          return !1;
        }),
        (this.delShapeById = function (t) {
          if (void 0 === t || null === t || "" === t)
            return (
              o.jQlib.each(e.shape, function (t, e) {
                e.data.length = 0;
              }),
              !0
            );
          for (var n in e.shape)
            for (var r = e.shape[n].data, a = 0; a < r.length; a++)
              if (r[a].shapeId === t) {
                var s = o.jQlib.extend(!0, {}, r[a]);
                return (
                  (s.event = {}),
                  r.splice(a, 1),
                  e.parents && e.parents[t] && e.disParent(t),
                  e.parents &&
                    o.jQlib.each(e.parents, function (e, n) {
                      if (n)
                        for (var r = 0; r < n.length; r++)
                          if (n[r] === t) {
                            n.splice(r, 1);
                            break;
                          }
                    }),
                  (s.event.type = i.util.eventName.deleteFinish),
                  i.util.eventEnabled && e.eventFunc && e.eventFunc(s),
                  null
                );
              }
          return !1;
        }),
        (this.selectedById = function (t, n) {
          for (var r in e.shape)
            for (var i = e.shape[r].data, o = 0; o < i.length; o++)
              if (i[o].shapeId === t)
                return (i[o].option.selected = !0 === n), e.drawShape(), i[o];
          return !1;
        }),
        (this.clear = function () {
          e.ctx.clearRect(
            0,
            0,
            o.jQlib.getWidth(e.canvasDom),
            o.jQlib.getHeight(e.canvasDom)
          ),
            (e.ctx.globalAlpha = 1),
            a.EventManager.off(e.canvasDom, "contextmenu").on(
              e.canvasDom,
              "contextmenu",
              n.contextmenuFun
            ),
            (e.beginPoint = ""),
            (e.tempShape = ""),
            (e.tempData = ""),
            (e.tempDataCopy = ""),
            (e.parents = {}),
            (i.util.moveFlag = !1),
            (i.util.resizeFlag = !1),
            (i.util.zindex = 1),
            (i.util.shapeId = 1),
            (i.util.drawState = 0),
            (i.util.eventEnabled = !0),
            o.jQlib.each(e.shape, function (t, e) {
              (e.regionNum = 999999), (e.data = []);
            });
        }),
        (this.resize = function (t, n) {
          for (var r in ((e.coordinate.widthDraw =
            o.jQlib.getWidth(e.canvasDom) / i.util.defalutCoordinate.width),
          (e.coordinate.heightDraw =
            o.jQlib.getHeight(e.canvasDom) / i.util.defalutCoordinate.height),
          (e.coordinate.widthMouse =
            i.util.defalutCoordinate.width / o.jQlib.getWidth(e.canvasDom)),
          (e.coordinate.heightMouse =
            i.util.defalutCoordinate.height / o.jQlib.getHeight(e.canvasDom)),
          e.shape))
            "rectShape" === r &&
              e.shape[r].resize(
                e.coordinate.widthDraw,
                e.coordinate.heightDraw,
                e.coordinate.widthMouse,
                e.coordinate.heightMouse
              );
          e.drawShape();
        }),
        (this.reset = function () {
          e.ctx.clearRect(
            0,
            0,
            o.jQlib.getWidth(e.canvasDom),
            o.jQlib.getHeight(e.canvasDom)
          );
        }),
        (this.setParent = function (t, n) {
          e.parents[t] = n;
        }),
        (this.disParent = function (t) {
          e.parents[t] = null;
        }),
        (this.getParent = function (t) {
          return { parentId: t, children: e.parents[t] };
        }),
        (this.getFamily = function (t) {
          var n = !1;
          return (
            e.parents[t]
              ? (n = { parentId: t, children: e.parents[t] })
              : o.jQlib.each(e.parents, function (r, i) {
                  for (var o = 0; o < i.length; o++)
                    if (i[o] === t)
                      return (n = { parentId: t, children: e.parents[t] }), !1;
                }),
            n
          );
        }),
        (this.hideShape = function (t, n, r) {
          for (var i in e.shape)
            for (var o = e.shape[i].data, a = 0; a < o.length; a++)
              if (o[a].shapeId === t)
                return (o[a].option.hide = n), r || e.drawShape(), o[a];
        }),
        (this.setOption = function (t, n) {
          for (var r in e.shape)
            for (var i = e.shape[r].data, a = 0; a < i.length; a++)
              if (i[a].shapeId === t)
                return (
                  (i[a].option = o.jQlib.extend(!0, i[a].option, n)),
                  e.drawShape(),
                  i[a]
                );
        }),
        (this.strokeText = function (t, n, r) {
          t
            ? i.util.strokeText(
                e.ctx,
                t,
                o.jQlib.getWidth(e.canvasDom) / 2,
                o.jQlib.getHeight(e.canvasDom) / 2,
                n,
                r
              )
            : e.drawShape();
        }),
        (this.drawGrid = function (t, n) {
          e.shape.motionDetectShape.drawGrid(t, n);
        }),
        (this.setResolution = function (t) {
          i.util.setResolution(t);
        }),
        (this.setEventEnabled = function (t) {
          i.util.eventEnabled = t;
        });
    };
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.RectShape = function () {
        var t = this;
        (this.init = function (e, n, r, i, o) {
          (t.type = "rect"),
            (t.regionNum = 999999),
            (t.canvasDom = e),
            (t.ctx = n),
            (t.drawFunc = r),
            (t.eventFunc = i),
            (t.coordinate = o),
            (t.data = []);
        }),
          (this.add = function (e, n) {
            if (t.data.length < t.regionNum) {
              var o = {};
              return (
                (o.data = i.jQlib.extend(!0, [], e)),
                (o.shapeId = r.util.shapeId++),
                (o.option = i.jQlib.extend(!0, {}, n)),
                t.data.push(o),
                o
              );
            }
          }),
          (this.drawStart = function (e) {
            var n = null;
            o.EventManager.off(t.canvasDom, "mousedown.draw").on(
              t.canvasDom,
              "mousedown.draw",
              function (o) {
                if (
                  (o.preventDefault(),
                  !(
                    r.util.moveFlag ||
                    r.util.resizeFlag ||
                    t.data.length >= t.regionNum
                  ))
                ) {
                  n = [
                    Math.round(
                      (o.clientX -
                        r.util.offset(t.canvasDom).left +
                        window.scrollX) *
                        t.coordinate.widthMouse
                    ),
                    Math.round(
                      (o.clientY -
                        r.util.offset(t.canvasDom).top +
                        window.scrollY) *
                        t.coordinate.heightMouse
                    ),
                  ];
                  var a = { data: [] };
                  (a.option = i.jQlib.extend(!0, {}, e)),
                    (a.shapeId = r.util.shapeId++),
                    (a.option.zindex = r.util.zindex++),
                    (a.option.type = t.type),
                    t.data.push(a),
                    (t.data[t.data.length - 1].data[0] = i.jQlib.extend(
                      !0,
                      [],
                      n
                    )),
                    (r.util.drawState = 1);
                }
              }
            ),
              o.EventManager.off(t.canvasDom, "mousemove.draw").on(
                t.canvasDom,
                "mousemove.draw",
                function (e) {
                  if (!r.util.moveFlag && !r.util.resizeFlag) {
                    var o = t.data.length - 1,
                      a = [
                        Math.round(
                          (e.clientX -
                            r.util.offset(t.canvasDom).left +
                            window.scrollX) *
                            t.coordinate.widthMouse
                        ),
                        Math.round(
                          (e.clientY -
                            r.util.offset(t.canvasDom).top +
                            window.scrollY) *
                            t.coordinate.heightMouse
                        ),
                      ];
                    if (n) {
                      if (t.data[o].option.defaultSize)
                        t.data[o].data[1] = [
                          t.data[o].data[0][0] +
                            t.data[o].option.defaultSize.width || 2e3,
                          t.data[o].data[0][1] +
                            t.data[o].option.defaultSize.height || 1e3,
                        ];
                      else {
                        var s = t.data[o];
                        if (s.option.lockWH) {
                          var u = Math.ceil(
                            0 -
                              ((s.data[0][0] - a[0]) * s.option.lockWH.height) /
                                s.option.lockWH.width +
                              s.data[0][1]
                          );
                          if (u > 8191 || u < 0) return;
                          s.data[1] = i.jQlib.extend(!0, [], [a[0], u]);
                        } else s.data[1] = i.jQlib.extend(!0, [], a);
                      }
                      (r.util.drawState = 1), t.drawFunc();
                    }
                  }
                }
              );
            var a = function (e) {
              if (!r.util.moveFlag && !r.util.resizeFlag) {
                var o = null,
                  a = null,
                  s = t.data.length - 1;
                if (n) {
                  var u = [
                    Math.round(
                      (e.clientX -
                        r.util.offset(t.canvasDom).left +
                        window.scrollX) *
                        t.coordinate.widthMouse
                    ),
                    Math.round(
                      (e.clientY -
                        r.util.offset(t.canvasDom).top +
                        window.scrollY) *
                        t.coordinate.heightMouse
                    ),
                  ];
                  if (u[0] === n[0] && u[1] === n[1])
                    (t.data.length = t.data.length - 1),
                      (r.util.drawState = 2),
                      (n = null);
                  else {
                    if (t.data[s].option.lockWH);
                    else {
                      if (t.data[s].option.maxRect) {
                        var c = {};
                        (c.width = u[0] - t.data[s].data[0][0]),
                          (c.height = u[1] - t.data[s].data[0][1]),
                          (o = t.checkRectSize(t.data[s], c, "maxRect"));
                      }
                      if (t.data[s].option.minRect) {
                        var l = {};
                        (l.width = u[0] - t.data[s].data[0][0]),
                          (l.height = u[1] - t.data[s].data[0][1]),
                          (a = t.checkRectSize(t.data[s], l, "minRect"));
                      }
                      t.data[s].option.defaultSize ||
                        (t.data[s].data[1] = i.jQlib.extend(
                          !0,
                          [],
                          o || a || u
                        ));
                    }
                    t.drawFunc(),
                      (r.util.drawState = 2),
                      (n = null),
                      (t.data[s].event = {}),
                      (t.data[s].event.type = r.util.eventName.drawFinish),
                      r.util.eventEnabled &&
                        t.eventFunc &&
                        t.eventFunc(t.data[s]),
                      !0 === t.data[s].option.disappear &&
                        ((t.data.length = t.data.length - 1), t.drawFunc());
                  }
                }
              }
            };
            o.EventManager.off(t.canvasDom, "mouseup.draw").on(
              t.canvasDom,
              "mouseup.draw",
              a
            ),
              o.EventManager.off(t.canvasDom, "mouseleave.draw").on(
                t.canvasDom,
                "mouseleave.draw",
                a
              );
          }),
          (this.draw = function (e) {
            if (!0 !== e.option.hide) {
              var n = null;
              if (
                (e.option.selected
                  ? ((t.ctx.strokeStyle = e.option.selectedColor),
                    (n = e.option.selectedColor),
                    r.util.drawSelectRect(
                      t.ctx,
                      e.data[0][0] * t.coordinate.widthDraw,
                      e.data[0][1] * t.coordinate.heightDraw
                    ),
                    r.util.drawSelectRect(
                      t.ctx,
                      e.data[1][0] * t.coordinate.widthDraw,
                      e.data[0][1] * t.coordinate.heightDraw
                    ),
                    r.util.drawSelectRect(
                      t.ctx,
                      e.data[1][0] * t.coordinate.widthDraw,
                      e.data[1][1] * t.coordinate.heightDraw
                    ),
                    r.util.drawSelectRect(
                      t.ctx,
                      e.data[0][0] * t.coordinate.widthDraw,
                      e.data[1][1] * t.coordinate.heightDraw
                    ),
                    t.ctx.closePath())
                  : ((t.ctx.strokeStyle = e.option.strokeColor),
                    (n = e.option.strokeColor)),
                t.ctx.beginPath(),
                t.ctx.rect(
                  e.data[0][0] * t.coordinate.widthDraw,
                  e.data[0][1] * t.coordinate.heightDraw,
                  (e.data[1][0] - e.data[0][0]) * t.coordinate.widthDraw,
                  (e.data[1][1] - e.data[0][1]) * t.coordinate.heightDraw
                ),
                t.ctx.closePath(),
                t.ctx.stroke(),
                e.option.fillStyle &&
                  ((t.ctx.fillStyle = e.option.fillStyle),
                  t.ctx.fillRect(
                    e.data[0][0] * t.coordinate.widthDraw,
                    e.data[0][1] * t.coordinate.heightDraw,
                    (e.data[1][0] - e.data[0][0]) * t.coordinate.widthDraw,
                    (e.data[1][1] - e.data[0][1]) * t.coordinate.heightDraw
                  )),
                e.option.title &&
                  r.util.strokeText(
                    t.ctx,
                    e.option.title,
                    (e.data[0][0] / 2 + e.data[1][0] / 2) *
                      t.coordinate.widthDraw,
                    (e.data[0][1] / 2 + e.data[1][1] / 2 + 100) *
                      t.coordinate.heightDraw,
                    "center",
                    n
                  ),
                (0 === e.option.direction ||
                  1 === e.option.direction ||
                  2 === e.option.direction) &&
                  2 === e.data.length)
              ) {
                var o = r.util.getArrayLines(
                  [
                    e.data[0][0] * this.coordinate.widthDraw,
                    e.data[0][1] * this.coordinate.heightDraw,
                  ],
                  [
                    e.data[0][0] * this.coordinate.widthDraw,
                    e.data[1][1] * this.coordinate.heightDraw,
                  ],
                  e.option.direction
                );
                o &&
                  o.length >= 3 &&
                  (i.jQlib.each(o, function (e, n) {
                    r.util.drawAppendLine(t.ctx, n);
                  }),
                  r.util.strokeText(
                    t.ctx,
                    "A",
                    o[0][0][0] + 10,
                    o[0][0][1] + 10,
                    null,
                    n
                  ),
                  r.util.strokeText(
                    t.ctx,
                    "B",
                    o[0][1][0] + 10,
                    o[0][1][1] + 10,
                    null,
                    n
                  ));
              }
              if (e.option.ruleName && e.option.ruleName.length > 0) {
                var a = 10,
                  s = r.util.getStrokeTextAlign(
                    t.ctx,
                    t.canvasDom.width,
                    e.option.ruleName,
                    e.data[0][0] * t.coordinate.widthDraw + a
                  );
                "right" === s && (a = -10),
                  r.util.strokeText(
                    t.ctx,
                    e.option.ruleName,
                    e.data[0][0] * t.coordinate.widthDraw + a,
                    e.data[0][1] * t.coordinate.heightDraw + 10,
                    s,
                    n
                  );
              }
              if (e.option.showSize) {
                var u = Math.ceil(
                    (Math.abs(e.data[0][0] - e.data[1][0]) *
                      r.util.resolution.width) /
                      r.util.defalutCoordinate.width
                  ),
                  c = Math.ceil(
                    (Math.abs(e.data[0][1] - e.data[1][1]) *
                      r.util.resolution.height) /
                      r.util.defalutCoordinate.height
                  );
                r.util.strokeText(
                  t.ctx,
                  u + "*" + c,
                  ((e.data[0][0] + e.data[1][0]) / 2) * t.coordinate.widthDraw,
                  ((e.data[0][1] + e.data[1][1]) / 2) * t.coordinate.heightDraw,
                  "center",
                  n
                );
              }
            }
          }),
          (this.checkOnPoint = function (e, n) {
            var i = [
              Math.round(
                (e.clientX - r.util.offset(t.canvasDom).left + window.scrollX) *
                  t.coordinate.widthMouse
              ),
              Math.round(
                (e.clientY - r.util.offset(t.canvasDom).top + window.scrollY) *
                  t.coordinate.heightMouse
              ),
            ];
            if (
              !0 === n.option.hide ||
              (!0 === !n.option.resizeEnable && !0 === !n.option.moveEnable)
            )
              return !1;
            var o = r.util.onPoint(i, n.data, !0);
            return (
              !1 !== o && ((n.option.selected = !0), { data: n, point: o })
            );
          }),
          (this.checkSelected = function (e, n) {
            var i = [
              Math.round(
                (e.clientX - r.util.offset(t.canvasDom).left + window.scrollX) *
                  t.coordinate.widthMouse
              ),
              Math.round(
                (e.clientY - r.util.offset(t.canvasDom).top + window.scrollY) *
                  t.coordinate.heightMouse
              ),
            ];
            if (
              !0 === n.option.hide ||
              (!0 === !n.option.resizeEnable && !0 === !n.option.moveEnable)
            )
              return !1;
            if (!n.option.selectType || "onLine" === n.option.selectType) {
              var o = [];
              (o[0] = n.data[0]),
                (o[1] = [n.data[1][0], n.data[0][1]]),
                (o[2] = n.data[1]),
                (o[3] = [n.data[0][0], n.data[1][1]]),
                (o[4] = n.data[0]);
              for (var a = 0; a < 4; a++) {
                var s = r.util.onLine(i, [o[a], o[a + 1]]);
                if (s) return (n.option.selected = !0), { data: n };
              }
            }
            if (!n.option.selectType || "inSide" === n.option.selectType) {
              var u = r.util.pointInRect(i, n.data);
              if (u) return (n.option.selected = !0), { data: n };
            }
            return !1;
          }),
          (this.moveShape = function (e, n, i, o) {
            var a = [
                Math.round(
                  (i.clientX -
                    r.util.offset(t.canvasDom).left +
                    window.scrollX) *
                    t.coordinate.widthMouse
                ),
                Math.round(
                  (i.clientY -
                    r.util.offset(t.canvasDom).top +
                    window.scrollY) *
                    t.coordinate.heightMouse
                ),
              ],
              s = a[0] - e[0],
              u = a[1] - e[1];
            !0 === o.option.horizontalMove && (u = 0);
            var c = o.option.maxPoly[2][0] || 8191,
              l = o.option.maxPoly[2][1] || 8191;
            return (
              n.data[0][0] + s < 0 && (s = 0 - n.data[0][0]),
              n.data[0][0] + s > c && (s = c - n.data[0][0]),
              n.data[1][0] + s < 0 && (s = 0 - n.data[1][0]),
              n.data[1][0] + s > c && (s = c - n.data[1][0]),
              n.data[0][1] + u < 0 && (u = 0 - n.data[0][1]),
              n.data[0][1] + u > l && (u = l - n.data[0][1]),
              n.data[1][1] + u < 0 && (u = 0 - n.data[1][1]),
              n.data[1][1] + u > l && (u = l - n.data[1][1]),
              (o.data[0][0] = n.data[0][0] + s),
              (o.data[0][1] = n.data[0][1] + u),
              (o.data[1][0] = n.data[1][0] + s),
              (o.data[1][1] = n.data[1][1] + u),
              t.drawFunc(),
              !0
            );
          }),
          (this.resizeShape = function (e, n, i) {
            var o = [
              Math.round(
                (n.clientX - r.util.offset(t.canvasDom).left + window.scrollX) *
                  t.coordinate.widthMouse
              ),
              Math.round(
                (n.clientY - r.util.offset(t.canvasDom).top + window.scrollY) *
                  t.coordinate.heightMouse
              ),
            ];
            this.resizeRectByRegion(i, e, o), t.drawFunc();
          }),
          (this.resize = function (e, n, r, i) {
            (t.coordinate.widthDraw = e),
              (t.coordinate.heightDraw = n),
              (t.coordinate.widthMouse = r),
              (t.coordinate.heightMouse = i);
          }),
          (this.checkRectSize = function (t, e, n) {
            var r = null,
              i = Math.abs(t.option[n][1][0] - t.option[n][0][0]),
              o = Math.abs(t.option[n][1][1] - t.option[n][0][1]),
              a = Math.abs(e.width),
              s = Math.abs(e.height);
            return (
              "maxRect" === n
                ? (a >= i || s >= o) &&
                  ((r = []),
                  e.width > 0
                    ? (r[0] = t.data[0][0] + i)
                    : (r[0] = t.data[0][0] - i),
                  e.height > 0
                    ? (r[1] = t.data[0][1] + o)
                    : (r[1] = t.data[0][1] - o))
                : "minRect" === n &&
                  (a <= i || s <= o) &&
                  ((r = []),
                  e.width > 0
                    ? (r[0] = t.data[0][0] + i)
                    : (r[0] = t.data[0][0] - i),
                  e.height > 0
                    ? (r[1] = t.data[0][1] + o)
                    : (r[1] = t.data[0][1] - o)),
              r
            );
          }),
          (this.checkRectSizeForResize = function (t, e, n) {
            var r = Math.abs(t.option[n][1][0] - t.option[n][0][0]),
              i = Math.abs(t.option[n][1][1] - t.option[n][0][1]),
              o = Math.abs(e.width),
              a = Math.abs(e.height),
              s = [];
            return (
              "maxRect" === n
                ? (o > r && (s[0] = "maxRectWidth"),
                  a > i && (s[1] = "maxRectHeight"))
                : "minRect" === n &&
                  (o < r && (s[0] = "minRectWidth"),
                  a < i && (s[1] = "minRectHeight")),
              s
            );
          }),
          (this.resizeRectByRegion = function (e, n, r) {
            var i,
              o,
              a,
              s = {},
              u = [],
              c = [];
            if (e.option.lockWH)
              switch (n) {
                case 0:
                  if (
                    (a = Math.ceil(
                      0 -
                        ((e.data[0][0] - r[0]) * e.option.lockWH.height) /
                          e.option.lockWH.width +
                        e.data[0][1]
                    )) > 8191 ||
                    a < 0
                  )
                    return;
                  if (
                    ((r[1] = a),
                    e.option.minRect &&
                      ((s.width = r[0] - e.data[1][0]),
                      (s.height = r[1] - e.data[1][1]),
                      "minRectHeight" ===
                        (c = t.checkRectSizeForResize(e, s, "minRect"))[1] ||
                        "minRectWidth" === c[0]))
                  )
                    return;
                  e.data[0] = r;
                  break;
                case 1:
                  if (
                    (a = Math.ceil(
                      0 -
                        ((r[0] - e.data[0][0]) * e.option.lockWH.height) /
                          e.option.lockWH.width +
                        e.data[1][1]
                    )) > 8191 ||
                    a < 0
                  )
                    return;
                  if (
                    ((r[1] = a),
                    e.option.minRect &&
                      ((s.width = r[0] - e.data[0][0]),
                      (s.height = r[1] - e.data[1][1]),
                      "minRectHeight" ===
                        (c = t.checkRectSizeForResize(e, s, "minRect"))[1] ||
                        "minRectWidth" === c[0]))
                  )
                    return;
                  (e.data[1][0] = r[0]), (e.data[0][1] = r[1]);
                  break;
                case 2:
                  if (
                    (a = Math.ceil(
                      0 -
                        ((e.data[0][0] - r[0]) * e.option.lockWH.height) /
                          e.option.lockWH.width +
                        e.data[0][1]
                    )) > 8191 ||
                    a < 0
                  )
                    return;
                  if (
                    ((r[1] = a),
                    e.option.minRect &&
                      ((s.width = r[0] - e.data[0][0]),
                      (s.height = r[1] - e.data[0][1]),
                      "minRectHeight" ===
                        (c = t.checkRectSizeForResize(e, s, "minRect"))[1] ||
                        "minRectWidth" === c[0]))
                  )
                    return;
                  e.data[1] = r;
                  break;
                case 3:
                  if (
                    (a = Math.ceil(
                      0 -
                        ((r[0] - e.data[1][0]) * e.option.lockWH.height) /
                          e.option.lockWH.width +
                        e.data[0][1]
                    )) > 8191 ||
                    a < 0
                  )
                    return;
                  if (
                    ((r[1] = a),
                    e.option.minRect &&
                      ((s.width = r[0] - e.data[1][0]),
                      (s.height = r[1] - e.data[0][1]),
                      "minRectHeight" ===
                        (c = t.checkRectSizeForResize(e, s, "minRect"))[1] ||
                        "minRectWidth" === c[0]))
                  )
                    return;
                  (e.data[0][0] = r[0]), (e.data[1][1] = r[1]);
              }
            else {
              switch (n) {
                case 0:
                  (s.width = r[0] - e.data[1][0]),
                    (s.height = r[1] - e.data[1][1]),
                    (i = [0, 0]),
                    (o = [0, 1]);
                  break;
                case 1:
                  (s.width = r[0] - e.data[0][0]),
                    (s.height = r[1] - e.data[1][1]),
                    (i = [1, 0]),
                    (o = [0, 1]);
                  break;
                case 2:
                  (s.width = r[0] - e.data[0][0]),
                    (s.height = r[1] - e.data[0][1]),
                    (i = [1, 0]),
                    (o = [1, 1]);
                  break;
                case 3:
                  (s.width = r[0] - e.data[1][0]),
                    (s.height = r[1] - e.data[0][1]),
                    (i = [0, 0]),
                    (o = [1, 1]);
              }
              e.option.maxRect &&
                (u = t.checkRectSizeForResize(e, s, "maxRect")),
                e.option.minRect &&
                  (c = t.checkRectSizeForResize(e, s, "minRect")),
                "maxRectWidth" !== u[0] &&
                  "minRectWidth" !== c[0] &&
                  (e.data[i[0]][i[1]] = r[0]),
                (null === u ||
                  ("maxRectHeight" !== u[1] && "minRectHeight" !== c[1])) &&
                  (e.data[o[0]][o[1]] = r[1]);
            }
          });
      });
    var r = n(31),
      i = n(32),
      o = n(56);
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.FactoryGridShapeAction = function (t, e) {
        if (
          ((this.toTransDataToInt = function (t, e) {
            var n = function (t) {
              for (var e = 0, n = t.length; e < n; e++)
                for (var r = 0, i = t[e].length; r < i; r++)
                  t[e][r] = Math.round(t[e][r]);
            };
            n(t);
            for (var r = 0, i = e.length; r < i; r++) n(e[r].data);
          }),
          (this.moveLinesInGride = function (t, e) {
            var n = this,
              r = this.calcLineRelationWrap(t, e),
              i = r.pointInSide,
              o = r.calcSide;
            this.setLineWrapSide(o, i.lineGroup),
              (function (t) {
                for (var e = 0, r = t.length; e < r; e++)
                  n.resetMoveLinePos(t[e], t);
              })(e);
          }),
          (this.isLineIntersectOhterLine = function (t, e) {
            for (
              var n = t.option,
                i = t.data,
                o = i[0][0],
                a = i[0][1],
                s = i[1][0],
                u = i[1][1],
                c = n.firstSide,
                l = !0,
                f = 0,
                h = e.length;
              f < h;
              f++
            ) {
              var d = e[f];
              if (this.equalSide(d.option.firstSide, c))
                if (d === t);
                else {
                  var p = d.data,
                    v = t.beforModifyData,
                    g = p[0][0],
                    m = p[0][1],
                    y = p[1][0],
                    b = p[1][1],
                    w = r.util.segmentsInLine(o, a, s, u, g, m, y, b),
                    S = r.util.segmentsInLine(
                      g,
                      m,
                      y,
                      b,
                      o,
                      a,
                      v[0][0],
                      v[0][1]
                    );
                  if (w || S) {
                    l = !1;
                    break;
                  }
                }
            }
            return !l;
          }),
          (this.resetMoveLinePos = function (t, e) {
            var n = t.option,
              i = n.firstSide,
              o = n.lastSide,
              a = t.beforModifyData;
            if (a) {
              var s = t.data,
                u = s[0][0],
                c = s[0][1],
                l = s[1][0],
                f = s[1][1],
                h = r.util.segmentsInLine(
                  u,
                  c,
                  l,
                  f,
                  i[0][0],
                  i[0][1],
                  i[1][0],
                  i[1][1]
                ),
                d = r.util.segmentsInLine(
                  u,
                  c,
                  l,
                  f,
                  o[0][0],
                  o[0][1],
                  o[1][0],
                  o[1][1]
                ),
                p = h && d,
                v = this.isLineIntersectOhterLine(t, e);
              p && !v
                ? this.resetShapeByData(s, [h, d])
                : (this.resetShapeByData(s, a), this.stopDraw());
            }
          }),
          (this.resetShapeByData = function (t, e) {
            for (var n = 0, r = t.length; n < r; n++) {
              var i = t[n];
              (i[0] = e[n][0]), (i[1] = e[n][1]);
            }
          }),
          (this.stopDraw = function () {
            this.canvasNode.trigger("mouseup.move");
          }),
          (this.calcLineRelationWrap = function (t, e) {
            var n = t[0].data,
              r = this.getPointNearSide(n, 1);
            return { pointInSide: this.linesRelationSide(r, e), calcSide: r };
          }),
          (this.asyncGrideWrapDataToLine = function (t, e) {
            var n = t[0].beforModifyData,
              r = t[0].data,
              i = this.getPointDiffIndex(n, r);
            0 !== i.length &&
              (1 === i.length
                ? this.asyncResizeToLines(t, e, i)
                : this.asyncMoveToLines(t, e));
          }),
          (this.asyncMoveToLines = function (t, e) {
            for (
              var n = t[0].beforModifyData,
                r = t[0].data,
                i = r[0][0] - n[0][0],
                o = r[0][1] - n[0][1],
                a = 0,
                s = e.length;
              a < s;
              a++
            ) {
              var u = e[a].data;
              (u[0][0] += i), (u[0][1] += o), (u[1][0] += i), (u[1][1] += o);
            }
          }),
          (this.isWrapConvex = function (t) {
            var e = !0;
            if (r.util.segmentsIntr(t[0], t[2], t[1], t[3])) {
              for (var n = t.length, i = 0; i < n; i++)
                for (var o = i + 1; o < n; o++)
                  if (this.getTwoPointDistance(t[i], t[o]) < 100) {
                    e = !1;
                    break;
                  }
            } else e = !1;
            return e;
          }),
          (this.equalSide = function (t, e) {
            var n = !0;
            return (n =
              (n =
                (n = (n = n && t[0][0] === e[0][0]) && t[0][1] === e[0][1]) &&
                t[1][0] === e[1][0]) && t[1][1] === e[1][1]);
          }),
          (this.asyncResizeToLines = function (t, e, n) {
            var r = n[0],
              i = t[0].beforModifyData,
              o = t[0].data,
              a = this.getPointNearSide(i, r),
              s = this.getPointNearSide(o, r);
            if (this.isWrapConvex(o)) {
              var u = this.linesRelationSide(a, e);
              this.setLineWrapSide(s, u.lineGroup),
                this.setPointPosWithSide(s, u);
            } else this.resetShapeByData(o, i), this.stopDraw();
          }),
          (this.setLineWrapSide = function (t, e) {
            var n = t.preSide,
              r = t.nextSide,
              i = t.oppositePreSide,
              o = t.oppositeNextSide,
              a = e[0].slice(),
              s = e[1].slice(),
              u = function (t, e) {
                for (var a = 1, s = t.length; a < s - 1; a++) {
                  var u = t[a].option;
                  (u.ignoreMaxPoly = !0),
                    "vertical" === e
                      ? ((u.firstSide = n), (u.lastSide = i))
                      : "horizontal" === e &&
                        ((u.firstSide = r), (u.lastSide = o));
                }
              };
            a.unshift({ data: [o[1], o[0]] }),
              a.push({ data: r }),
              s.unshift({ data: n }),
              s.push({ data: [i[1], i[0]] }),
              u(a, "vertical"),
              u(s, "horizontal");
          }),
          (this.setPointPosWithSide = function (t, e) {
            var n = function (t, e) {
              for (
                var n = t[0][0],
                  r = t[0][1],
                  i = t[1][0] - t[0][0],
                  o = t[1][1] - t[0][1],
                  a = 0,
                  s = e.length;
                a < s;
                a++
              ) {
                var u = e[a],
                  c = u.scale;
                (u.dot[0] = n + c * i), (u.dot[1] = r + c * o);
              }
            };
            n(t.preSide, e.onPreSidePoint), n(t.nextSide, e.onNextSidePoint);
          }),
          (this.getLineOutRect = function (t) {
            var e = [],
              n = t[0][0],
              r = t[0][1],
              i = t[1][0],
              o = t[1][1];
            return (
              n > i && ((n ^= i), (n ^= i ^= n)),
              r > o && ((r ^= o), (r ^= o ^= r)),
              (e[0] = [n, r]),
              (e[1] = [i, o]),
              e
            );
          }),
          (this.getTwoPointDistance = function (t, e) {
            var n = Math.pow(e[0] - t[0], 2),
              r = Math.pow(e[1] - t[1], 2);
            return Math.sqrt(n + r);
          }),
          (this.dotRelationLine = function (t, e) {
            var n = this,
              i = r.util.onLine(t, e);
            return (
              t[0],
              t[1],
              e[0][0],
              e[0][1],
              e[1][0],
              e[1][1],
              {
                isInline: i,
                scale: (function () {
                  var r = n.getTwoPointDistance(e[0], e[1]);
                  return n.getTwoPointDistance(e[0], t) / r;
                })(),
              }
            );
          }),
          (this.linesRelationSide = function (t, e) {
            for (
              var n = t.preSide,
                i = t.nextSide,
                o = t.oppositePreSide,
                a = t.oppositeNextSide,
                s = [],
                u = [],
                c = [[], []],
                l = 0,
                f = e.length;
              l < f;
              l++
            ) {
              var h = e[l],
                d = h.data,
                p = d[0],
                v = d[1],
                g = null,
                m = d[0][0],
                y = d[0][1],
                b = d[1][0],
                w = d[1][1],
                S = n[0][0],
                T = n[0][1],
                x = n[1][0],
                E = n[1][1],
                A = i[0][0],
                R = i[0][1],
                _ = i[1][0],
                k = i[1][1],
                D = o[0][0],
                C = o[0][1],
                M = o[1][0],
                I = o[1][1],
                B = a[0][0],
                O = a[0][1],
                P = a[1][0],
                F = a[1][1],
                U = r.util.segmentsInLine(m, y, b, w, S, T, x, E),
                j = r.util.segmentsInLine(m, y, b, w, D, C, M, I),
                L = r.util.segmentsInLine(m, y, b, w, A, R, _, k),
                z = r.util.segmentsInLine(m, y, b, w, B, O, P, F);
              U && j
                ? (g = this.dotRelationLine(p, n)) && g.isInline
                  ? (s.push({ dot: p, scale: g.scale }), c[0].push(h))
                  : (g = this.dotRelationLine(v, n)) &&
                    g.isInline &&
                    (s.push({ dot: v, scale: g.scale }), c[0].push(h))
                : L &&
                  z &&
                  ((g = this.dotRelationLine(p, i)) && g.isInline
                    ? (u.push({ dot: p, scale: g.scale }), c[1].push(h))
                    : (g = this.dotRelationLine(v, i)) &&
                      g.isInline &&
                      (u.push({ dot: v, scale: g.scale }), c[1].push(h)));
            }
            return { onPreSidePoint: s, onNextSidePoint: u, lineGroup: c };
          }),
          (this.getGridShapeInfo = function (t) {
            for (var e = [], n = [], r = 0, i = t.length; r < i; r++) {
              var o = t[r];
              "GridShape" === o.option.composeType &&
                ("poly" === o.option.type
                  ? e.push(o)
                  : "line" === o.option.type && n.push(o));
            }
            return { polyWrap: e, lineArr: n };
          }),
          (this.getPointDiffIndex = function (t, e) {
            for (var n = [], r = 0, i = t.length; r < i; r++) {
              var o = t[r][0] !== e[r][0],
                a = t[r][1] !== e[r][1];
              (o || a) && n.push(r);
            }
            return n;
          }),
          (this.getPointNearSide = function (t, e) {
            var n = t.length,
              r = (t[e], (e + 1) % n);
            return {
              preSide: [t[(e + n - 1) % n], t[e]],
              nextSide: [t[e], t[r]],
              oppositePreSide: [t[r], t[(r + 1) % n]],
              oppositeNextSide: [t[(r + 1) % n], t[(r + 2) % n]],
            };
          }),
          (this.canvasNode = e),
          0 === t.length)
        )
          return;
        var n = this.getGridShapeInfo(t),
          i = n.polyWrap,
          o = n.lineArr;
        if (0 === i.length) return;
        var a = i[0].beforModifyData;
        i[0].data;
        a ? this.asyncGrideWrapDataToLine(i, o) : this.moveLinesInGride(i, o);
        this.toTransDataToInt(i, o);
      });
    var r = n(31);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = r(n(141)),
      o = r(n(152)),
      a = r(n(154)),
      s = r(n(179)),
      u = function (t, e, n) {
        var r = n.dType,
          u = n.isPrivateProtocol,
          c = null,
          l = null,
          f = {
            wsURL: t,
            rtspURL: e,
            workerManager: (l =
              "Train" === r ? new o.default() : new i.default()),
            RTSP_STATE: {
              OK: 200,
              UNAUTHORIZED: 401,
              NOTFOUND: 404,
              INVALID_RANGE: 457,
              NOTSERVICE: 503,
              DISCONNECT: 999,
              BADREQUEST: 400,
              FORBIDDEN: 403,
              INTERNALSERVERERROR: 500,
              SERVICEUNAVAILABLE: 503,
            },
          },
          h = Object.assign(f, n);
        function d() {}
        return (
          (c = !0 === u ? new a.default(h) : new s.default(h)),
          (d.prototype = {
            init: function (t, e, n, i, o) {
              "Train" === r ? l.init(t, n) : l.init(t, e, n, i, o);
            },
            setExtraError: function (t) {
              c.setExtraError(t);
            },
            talkInit: function () {
              l.talkInit();
            },
            connect: function () {
              c.connect();
            },
            disconnect: function () {
              c.disconnect();
            },
            controlPlayer: function (t) {
              return c.controlPlayer(t);
            },
            setLiveMode: function (t) {
              l.setLiveMode(t);
            },
            setPlayMode: function (t, e) {
              c.setPlayMode(t, e);
            },
            setRTSPURL: function (t) {
              c.setSignalURL(t);
            },
            setCallback: function (t, e) {
              c.setCallback(t, e);
            },
            setUserInfo: function (t, e) {
              c.setUserInfo(t, e);
            },
            capture: function (t, e) {
              l.capture(t, e);
            },
            setLessRate: function (t) {
              l.setLessRate && l.setLessRate(t);
            },
            gotoSecond: function (t) {
              return l.gotoSecond(t);
            },
            gotoFrame: function (t) {
              return l.gotoFrame(t);
            },
            checkLeftSize: function (t, e) {
              return l.checkLeftSize(t, e);
            },
            clearMap: function () {
              l.clearMap();
            },
            getCapture: function (t, e, n) {
              return l.getCapture(t, e, n);
            },
          }),
          new d()
        );
      };
    e.default = u;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = n(11),
      o = r(n(142)),
      a = r(n(144)),
      s = r(n(145)),
      u = r(n(146)),
      c = r(n(147)),
      l = r(n(148)),
      f = r(n(149)),
      h = r(n(150)),
      d = r(n(151)),
      p = function () {
        var t = null,
          e = null,
          n = null,
          r = null,
          p = null,
          v = null,
          g = null,
          m = null,
          y = null,
          b = null,
          w = null,
          S = null,
          T = null,
          x = null,
          E = null,
          A = null,
          R = null,
          _ = null,
          k = null,
          D = null,
          C = null,
          M = (0, i.BrowserDetect)(),
          I = null,
          B = 0,
          O = null,
          P = !1,
          F = "",
          U = !0,
          j = null,
          L = null,
          z = null,
          N = !1,
          V = !1,
          q = null,
          H = null,
          W = null,
          G = { id: 1, samples: null, baseMediaDecodeTime: 0 },
          Y = 0,
          X = 0,
          Q = null,
          Z = 1,
          K = "",
          J = null,
          $ = null,
          tt = 4,
          et = 1,
          nt = tt,
          rt = !1,
          it = 0,
          ot = 0,
          at = 0,
          st = 1e3,
          ut = null,
          ct = 0,
          lt = 0,
          ft = 0,
          ht = null,
          dt = !1,
          pt = 0,
          vt = {
            type: "live",
            codec: "",
            width: 0,
            height: 0,
            isLimitSpeed: null,
          },
          gt = !1,
          mt = null,
          yt = null,
          bt = null,
          wt = !1,
          St = null,
          Tt = 0,
          xt = { 5: "MJPEG", 8: "H264", 12: "H265" },
          Et = {
            1: 4e3,
            2: 8e3,
            3: 11025,
            4: 16e3,
            5: 2e4,
            6: 22050,
            7: 32e3,
            8: 44100,
            9: 48e3,
            10: 96e3,
            11: 128e3,
            12: 192e3,
            13: 64e3,
          };
        function At() {
          r = this;
        }
        function Rt() {
          return H;
        }
        function _t() {
          null !== T && T(!1);
        }
        At.prototype = {
          init: function (n, i, u, c, f) {
            if (
              ((pt = u),
              (j = n),
              (J = i),
              (r.channel = u),
              (dt = f),
              window.navigator.userAgent,
              !dt)
            ) {
              (t = new a.default()).onmessage = kt;
              var h = !0 === c ? 500 : 15;
              (p = new o.default(pt, this, j, h)),
                (C = (0, l.default)()),
                document.getElementById("count-fps"),
                document.getElementById("span-fps");
            }
            (e = new s.default()).onmessage = Dt;
          },
          talkInit: function () {
            (P = !0), ((e = new s.default()).onmessage = Dt);
          },
          sendSdpInfo: function (r, o) {
            var a =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null,
              s = {
                type: "sdpInfo",
                data: {
                  sdpInfo: r,
                  aacCodecInfo: o,
                  decodeMode: F,
                  govLength: O,
                  checkDelay: U,
                  lessRateCanvas: wt,
                  mp4Codec: a,
                },
              };
            if (P) {
              e.postMessage(s);
              try {
                (window.AudioContext =
                  window.AudioContext ||
                  window.webkitAudioContext ||
                  window.mozAudioContext ||
                  window.oAudioContext ||
                  window.msAudioContext),
                  ((n = new d.default()).onmessage = Ct),
                  null === g &&
                    ((g = new h.default()).init(),
                    g.setSendAudioTalkBufferCallback(Mt)),
                  n.postMessage(s),
                  (s = { type: "sampleRate", data: g.initAudioOut() }),
                  n.postMessage(s);
              } catch (t) {
                return void i.debug.error(
                  "Web Audio API is not supported in this web browser! : " + t
                );
              }
            } else t.postMessage(s), e.postMessage(s);
            (ut = null), (rt = !1);
          },
          parseRTPData: function (n, o) {
            var a = o[4],
              s = 128,
              u = 129,
              c = 130,
              l = 131,
              f = 132,
              h = 133,
              d = 136,
              p = 137,
              v = 138,
              g = 139,
              m = 140,
              y = 144,
              b = 145,
              w = 146,
              S = 147,
              T = 148,
              x = 149,
              E = 150,
              A = 151,
              _ = 152,
              D = 153,
              C = 154,
              M = 155,
              I = 156,
              B = 160,
              O = 176,
              P = 255,
              F = {
                type: "MediaData",
                data: { rtspInterleave: n, payload: o },
                info: null,
                channel: r.channel,
              },
              U = {};
            if (253 == a || 254 == a || 252 == a || 251 == a) {
              if (
                ((function () {
                  var t = o[22] + 24;
                  U.frameIndex =
                    (o[11] << 24) + (o[10] << 16) + (o[9] << 8) + o[8];
                  for (var e = 24; e < t; )
                    if (s == o[e]) {
                      if (e + 4 > t) return i.debug.log("i: " + e), -1;
                      (U.width = o[e + 2] << 3),
                        (U.height = o[e + 3] << 3),
                        (e += 4);
                    } else if (u == o[e]) {
                      if (e + 4 > o.length) return i.debug.log("i: " + e), -1;
                      (U.I_frame_interval = o[e + 1]),
                        (U.encode_type = o[e + 2]),
                        (U.frame_rate = o[e + 3]),
                        (e += 4);
                    } else if (c == o[e])
                      (U.width = (o[e + 5] << 8) + o[e + 4]),
                        (U.height = (o[e + 7] << 8) + o[e + 6]),
                        (e += 8);
                    else if (l == o[e]) e += 4;
                    else if (d == o[e]) e += 8;
                    else if (f == o[e]) {
                      if (e + 4 > t) return i.debug.log("i: " + e), -1;
                      var n = (o[e + 2] << 8) + o[e + 3];
                      e += n;
                    } else if (T == o[e])
                      (U.h264_svc_flag = !0), (U.svc = o[e + 2]), (e += 4);
                    else if (v == o[e]) e += 8;
                    else if (b == o[e]) e += 8;
                    else if (D == o[e]) {
                      var r = o[e + 1],
                        a = o[e + 2];
                      (e += 8), (e += r * a * 16);
                    } else if (C == o[e]) e += 8;
                    else if (M == o[e]) e += 8;
                    else if (w == o[e]) e += 8;
                    else if (S == o[e]) e += 8;
                    else if (x == o[e]) e += 8;
                    else if (B <= o[e] && o[e] < O)
                      (U.timeStampmsw = (o[e + 3] << 8) + o[e + 2]), (e += 4);
                    else if (O <= o[e] && o[e] < P) e += o[e + 1];
                    else if (h == o[e]) e += 4;
                    else if (p == o[e]) e += 4;
                    else if (g == o[e]) e += 4;
                    else if (y == o[e]) e += 8;
                    else if (A == o[e]) {
                      var r = o[e + 1];
                      (e += 8), (e += 16 * r);
                    } else if (_ == o[e]) e += 4;
                    else {
                      if (I != o[e])
                        return (
                          i.debug.log(
                            "parseVideoInfo error ext_type:0x" + o[e]
                          ),
                          i.debug.log("i: " + e),
                          -1
                        );
                      var t = (o[e + 5] << 8) + o[e + 4];
                      (e += 8), (e += t);
                    }
                })(),
                null != mt)
              ) {
                if (mt != U.encode_type && void 0 !== U.encode_type)
                  return (mt = U.encode_type), void R(xt[U.encode_type]);
              } else mt = U.encode_type;
              t && ((F.info = U), t.postMessage(F));
            } else if (240 == a) {
              if (
                ((function () {
                  U.ChannelCount = 0;
                  for (var t = o[22] + 24, e = 24; e < t; )
                    if (s == o[e]) e += 4;
                    else if (u == o[e]) e += 4;
                    else if (c == o[e]) e += 8;
                    else if (l == o[e]) e += 4;
                    else if (m == o[e]) e += o[e + 1];
                    else if (d == o[e]) e += 8;
                    else if (f == o[e]) {
                      var n = o[e + 2] << (8 + o[e + 3]);
                      e += n;
                    } else if (E == o[e])
                      (U.ChannelCount = o[e + 1]),
                        (U.channel = o[e + 2]),
                        (e += 4);
                    else if (x == o[e]) e += 8;
                    else {
                      if (B != o[e])
                        return (
                          i.debug.log(
                            "parseAudioInfo error ext_type:0x" + o[e]
                          ),
                          i.debug.log("i: " + e),
                          -1
                        );
                      (U.timeStampmsw = (o[e + 3] << 8) + o[e + 2]), (e += 4);
                    }
                  0 == U.ChannelCount &&
                    ((U.ChannelCount = 1), (U.channel = 0));
                  for (var t = o[22] + 24, e = 24; e < t; )
                    if (o[e] == s) e += 4;
                    else if (o[e] == u) e += 4;
                    else if (o[e] == c) e += 8;
                    else if (o[e] == l)
                      (U.audio_type = o[e + 2]),
                        (U.samplingRate = Et[o[e + 3]]),
                        (e += 4);
                    else if (o[e] == m) e += o[e + 1];
                    else if (o[e] == d) e += 8;
                    else if (o[e] == f) {
                      var n = o[e + 2] << (8 + o[e + 3]);
                      e += n;
                    } else if (o[e] == E) e += 4;
                    else if (o[e] == x) e += 8;
                    else if (B == o[e]) e += 4;
                    else {
                      if (_ != o[e])
                        return (
                          i.debug.log(
                            "parseAudioInfo error ext_type:0x" + o[e]
                          ),
                          i.debug.log("i: " + e),
                          -1
                        );
                      e += 4;
                    }
                })(),
                null != bt)
              ) {
                if (bt != U.audio_type)
                  return (bt = U.audio_type), void k("audioType");
              } else bt = U.audio_type;
              if (null != yt) {
                if (yt != U.samplingRate)
                  return (yt = U.samplingRate), void k("samplingRate");
              } else yt = U.samplingRate;
              switch (U.audio_type + "") {
                case "8":
                case "10":
                case "14":
                case "16":
                case "25":
                case "26":
                case "27":
                case "28":
                case "29":
                case "30":
                case "31":
                  e && ((F.info = U), e.postMessage(F));
              }
            } else
              241 == a
                ? t && ((F.info = U), t.postMessage(F))
                : i.debug.log("mediaType:   " + a);
          },
          setCallback: function (t, e) {
            switch (t) {
              case "timeStamp":
                break;
              case "ResolutionChanged":
                (m = e), null !== p && p.setResizeCallback(m);
                break;
              case "audioTalk":
                b = e;
                break;
              case "stepRequest":
                w = e;
                break;
              case "metaEvent":
                break;
              case "videoMode":
                S = e;
                break;
              case "loadingBar":
                T = e;
                break;
              case "Error":
                x = e;
                break;
              case "PlayStart":
                (y = e), null !== p && p.setBeginDrawCallback(y);
                break;
              case "DecodeStart":
                E = e;
                break;
              case "UpdateCanvas":
                (A = e), null !== p && p.setupdateCanvasCallback(A);
                break;
              case "FrameTypeChange":
                R = e;
                break;
              case "MSEResolutionChanged":
                _ = e;
                break;
              case "audioChange":
                k = e;
                break;
              case "WorkerReady":
                ht = e;
                break;
              case "IvsDraw":
                D = e;
                break;
              case "FileOver":
                this.fileOverCallback = e;
                break;
              case "Waiting":
                this.waitingCallback = e;
                break;
              case "UpdateTime":
                break;
              default:
                i.debug.log(t),
                  i.debug.log("workerManager::setCallback() : type is unknown");
            }
          },
          capture: function (t, e) {
            "canvas" === F ? p.capture(t, e) : "video" === F && q.capture(t, e);
          },
          getCapture: function (t, e, n) {
            return "video" === F
              ? q.getCapture(t, e, n)
              : p.getCapture(t, e, n);
          },
          setDeviceInfo: function (t) {
            z = t.mode;
          },
          setFPS: function (t) {
            (B = 0 === t ? 30 : t), It(1 !== et);
          },
          setGovLength: function (t) {
            O = t;
          },
          setLiveMode: function (t) {
            null !== S && S(t),
              "video" === (F = null === t ? "canvas" : t)
                ? null !== p && p.renewCanvas()
                : "canvas" === F && It(!1);
          },
          setPlayMode: function (t) {
            V = t;
          },
          controlAudio: function (t, e) {
            switch ((i.debug.log(t + " " + e), t)) {
              case "audioPlay":
                "start" === e
                  ? null !== v && v.play()
                  : "stop" === e
                  ? ((ct = 0), null !== v && v.stop())
                  : null !== v && v.pause();
                break;
              case "volumn":
                (ct = e), null !== v && v.controlVolumn(e, !0);
                break;
              case "audioSamplingRate":
                null !== v && v.setSamplingRate(e);
            }
          },
          controlAudioTalk: function (t, e) {
            if (null !== g)
              switch (t) {
                case "onOff":
                  "on" === e || g.stopAudioOut();
                  break;
                case "volumn":
                  g.controlVolumnOut(e);
              }
          },
          reassignCanvas: function () {
            null !== p && p.reassignCanvas();
          },
          digitalZoom: function (t) {
            null !== p && p.digitalZoom(t);
          },
          playbackSpeed: function (t) {
            (et = t), p.setFrameInterval(et);
          },
          timeStamp: function (t) {
            A && A(t);
          },
          initVideo: function (t) {
            It(t);
          },
          setFpsFrame: function (t) {
            ft = 0;
          },
          setCheckDelay: function (t) {
            U = t;
          },
          initStartTime: function () {
            dt ||
              (t.postMessage({ type: "initStartTime" }),
              p.stopRendering(),
              p.startRendering());
          },
          terminate: function () {
            "backup" !== z &&
              (t && (t.terminate(), (t = null)),
              e && (e.terminate(), (e = null))),
              n && n.terminate(),
              g && (g.terminate(), (g = null)),
              p && p.terminate(),
              v && v.terminate(),
              q && q.terminate(),
              ht && (ht = null),
              (p = null);
          },
          postRtspOver: function () {
            t && t.postMessage({ type: "end" }), v && v.setRtspOver();
          },
          pause: function () {
            q && q.pause(), t && p.pause();
          },
          play: function () {
            q && q.play(), t && p.play();
          },
          setLessRate: function (t) {
            wt = t;
          },
          playNextFrame: function () {
            q ? q.playNextFrame() : t && p.playNextFrame();
          },
          getVideoBufferQueueSize: function () {
            return q
              ? q.getVideoBufferQueueSize()
              : t
              ? p.getVideoBufferQueueSize()
              : void 0;
          },
          getCurFrameInfo: function () {
            return q ? q.getCurFrameInfo() : t ? p.getCurFrameInfo() : void 0;
          },
          sendBufferToAudioWorker: function (t) {
            Dt(
              (t = {
                type: "message",
                data: { codec: "AAC", data: t, type: "render" },
              })
            );
          },
        };
        function kt(e) {
          var n,
            r,
            o = e.data;
          switch (o.type) {
            case "WorkerReady":
              ++Tt >= 2 && ht && ht();
              break;
            case "canvasRender":
              Ot(0, "currentTime"),
                (n = o.data),
                (r = o.option),
                null !== n &&
                  null !== p &&
                  ("mjpeg" === I.codecType
                    ? p.drawMJPEG(
                        n,
                        I.width,
                        I.height,
                        I.codecType,
                        I.frameType,
                        I.timeStamp,
                        I.frameIndex,
                        r
                      )
                    : p.draw(
                        n,
                        I.width,
                        I.height,
                        I.codecType,
                        I.frameType,
                        I.timeStamp,
                        I.frameIndex,
                        r
                      ));
              break;
            case "initSegment":
              (H = o.data), Bt();
              break;
            case "mediaSample":
              null === G.samples && (G.samples = new Array(nt)),
                null === o.data.frame_time_stamp &&
                  (o.data.frameDuration = Math.round(st / B)),
                1 !== et && (o.data.frameDuration = st / Math.abs(et)),
                (G.samples[Y++] = o.data),
                (ot += o.data.frameDuration),
                (at += o.data.frameDuration);
              break;
            case "videoRender":
              var a = new Uint8Array(o.data.length + X);
              if (
                (0 !== X && a.set(Q),
                a.set(o.data, X),
                (X = (Q = a).length),
                Y % nt === 0 && 0 !== Y)
              ) {
                if (
                  (null !== G.samples[0].frameDuration
                    ? ((G.baseMediaDecodeTime = 1 === Z ? 0 : it), (it = ot))
                    : (G.baseMediaDecodeTime =
                        Math.round(st / B) * nt * (Z - 1)),
                  "chrome" == M && 1 === et)
                )
                  for (var s = G.samples.length, u = at / nt, l = 0; l < s; l++)
                    G.samples[l].frameDuration = u;
                (at = 0),
                  (W = c.default.mediaSegment(Z, G, Q, G.baseMediaDecodeTime)),
                  Z++,
                  (Y = 0),
                  (Q = null),
                  (X = 0),
                  null !== q
                    ? q.setMediaSegment(W, I.frameIndex)
                    : !1 === rt &&
                      (i.debug.log(
                        "workerManager::videoMS error!! recreate videoMS"
                      ),
                      Bt()),
                  null !== p && p.stopRendering();
              }
              break;
            case "mediasegmentData":
              q.setMediaSegment(o.data),
                !1 === rt &&
                  (i.debug.log("videoMS error!! recreate videoMS"), Bt());
              break;
            case "videoInfo":
              (I = o.data),
                0 === ft &&
                  ((ft = performance.now()), "canvas" === F && A(I.timeStamp));
              break;
            case "time":
              break;
            case "videoTimeStamp":
              ($ = o.data),
                null !== q && null !== $ && (q.setvideoTimeStamp($), A($));
              break;
            case "firstFrame":
              p &&
                (p.startRendering(),
                "undefined" !== typeof p.setFPS && p.setFPS(B));
              break;
            case "drop":
              break;
            case "codecInfo":
              (K = o.data), null !== q && q.setCodecInfo(K);
              break;
            case "stepPlay":
              switch (o.data) {
                case "needBuffering":
                  w("request", L);
                  break;
                case "BufferFull":
                  w("complete"),
                    gt &&
                      (t.postMessage({ type: "stepPlay", data: "findIFrame" }),
                      p.startRendering(),
                      (gt = !1));
              }
              break;
            case "setVideoTagMode":
              At.prototype.setLiveMode(o.data);
              break;
            case "playbackFlag":
              !0 === o.data ? (vt.type = "playback") : (vt.type = "live"),
                null !== q && q.setPlaybackFlag(o.data);
              break;
            case "error":
              null !== x && x(o.data);
              break;
            case "MSEResolutionChanged":
              _(o.data);
              break;
            case "DecodeStart":
              var f = o.data.width - 0,
                h = o.data.height - 0;
              j.setAttribute("width", f),
                j.setAttribute("height", h),
                At.prototype.setLiveMode(o.data.decodeMode),
                E(o.data);
              break;
            case "ivsDraw":
              var d = o.data.ivsDraw,
                v = o.data.channel;
              if ("canvas" === F && (void 0 === I || null === I)) break;
              if ("canvas" !== F && (void 0 === $ || null === $)) break;
              var g = "canvas" === F ? I.timeStamp : $;
              g = 1e3 * g.timestamp + g.timestamp_usec;
              var m = "canvas" === F ? g : g - parseInt(1e3 * q.getDuration());
              null !== D && (C.setCallback(D), C.draw(d, m, g, v));
              break;
            case "end":
              q && q.setRtspOver(), p && p.setRtspOver();
              break;
            default:
              i.debug.log(
                "workerManager::videoWorker unknown data = " + o.data
              );
          }
        }
        function Dt(t) {
          var e = t.data;
          switch (
            (St !== e.samplingRate &&
              ((St = e.samplingRate), null != v && v.setSamplingRate(St)),
            e.type)
          ) {
            case "WorkerReady":
              ++Tt >= 2 && ht && ht();
              break;
            case "render":
              if (!0 === N) break;
              ut !== e.codec &&
                (null !== v &&
                  ((ct = v.getVolume()),
                  (lt = v.getInitVideoTimeStamp()),
                  v.terminate()),
                31 === e.audio_type && "edge" === M
                  ? ((v = null), null !== x && x({ errorCode: 201 }))
                  : (v = new f.default()).setSamplingRate(e.samplingRate),
                null !== v &&
                  (v.setInitVideoTimeStamp(lt),
                  !0 === P && (ct = 1),
                  v.audioInit(ct) || (v = null)),
                (ut = e.codec)),
                null !== v &&
                  (!0 === P && v.setBufferingFlag(),
                  null === I || "undefined" === typeof I
                    ? v.bufferAudio(e.data, e.rtpTimeStamp, null)
                    : v.bufferAudio(e.data, e.rtpTimeStamp, I.codecType));
          }
        }
        function Ct(t) {
          var e = t.data;
          switch (e.type) {
            case "rtpData":
              b(e.data);
          }
        }
        function Mt(t) {
          var e = { type: "getRtpData", data: t };
          n.postMessage(e);
        }
        function It(t) {
          null !== q && (q.close(), (q = null)),
            (nt = !1 === t ? tt : Math.abs(et)),
            (G.samples = new Array(nt)),
            (rt = !1),
            (Z = 1),
            (W = null),
            (Y = 0),
            (Q = null),
            (X = 0);
        }
        function Bt() {
          (rt = !0),
            null === q
              ? ((q = (0, u.default)(r)).setCodecInfo(K),
                q.setInitSegmentFunc(Rt),
                q.setVideoSizeCallback(_t),
                q.setBeginDrawCallback(y),
                q.init(J),
                q.setErrorCallback(x),
                q.setSpeedPlay(et),
                q.setPlaybackFlag(V),
                q.setFPS(B))
              : (q.getVideoElement(), q.setInitSegment()),
            q.setAudioStartCallback(Ot);
        }
        function Ot(t, e) {
          null !== v && v.setBufferingFlag(t, e);
        }
        return new At();
      };
    e.default = p;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = n(11),
      i = n(58);
    var o = function () {
      (this.metrics = {}), this._clearMetrics(), (this._objpool = []);
    };
    function a(t, e) {
      function n(t, e) {
        (n.prototype.w = t), (n.prototype.h = e);
      }
      return (
        (n.prototype = {
          toString: function () {
            return "(" + n.prototype.w + ", " + n.prototype.h + ")";
          },
          getHalfSize: function () {
            return new a(n.prototype.w >>> 1, n.prototype.h >>> 1);
          },
          length: function () {
            return n.prototype.w * n.prototype.h;
          },
        }),
        new n(t, e)
      );
    }
    (o.prototype.alloc = function () {
      var t = null;
      return (
        0 === this._objpool.length
          ? ((t = new Image()), this.metrics.totalalloc++)
          : ((t = this._objpool.pop()), this.metrics.totalfree--),
        t
      );
    }),
      (o.prototype.free = function (t) {
        t.length > 0 &&
          (r.debug.log("It is not zero length = " + t.length),
          this._objpool.push(t),
          this.metrics.totalfree++);
      }),
      (o.prototype.collect = function (t) {
        this._objpool = [];
        var e = this.metrics.totalalloc - this.metrics.totalfree;
        this._clearMetrics(e);
      }),
      (o.prototype._clearMetrics = function (t) {
        (this.metrics.totalalloc = t || 0), (this.metrics.totalfree = 0);
      });
    var s = function (t, e, n, s) {
      var u = e,
        c = s,
        l = t,
        f = n,
        h = null,
        d = null,
        p = null,
        v = null,
        g = null,
        m = null,
        y = null,
        b = null,
        w = 0,
        S = null,
        T = 0,
        x = 0,
        E = 0,
        A = 0,
        R = new o(),
        _ = null,
        k = "",
        D = !1,
        C = !1,
        M = 16.7,
        I = 0,
        B = !1,
        O = {},
        P = [],
        F = "png",
        U = 1,
        j = function (t, e, n, r, i, o, a, s) {
          for (var u in (function (t) {
            (this.buffer = t), (this.previous = null), (this.next = null);
          }.call(this, t),
          (this.width = e),
          (this.height = n),
          (this.codecType = r),
          (this.frameType = i),
          (this.timeStamp = o),
          (this.frameIndex = a),
          (this.option = {}),
          s))
            this.option[u] = s[u];
        },
        L = null;
      function z() {
        var t = c || 15;
        function e() {
          (this.first = null), (this.size = 0);
        }
        return (
          (e.prototype = {
            enqueue: function (e, n, r, i, o, a, s, u) {
              this.size >= t && this.clear();
              var c = new j(e, n, r, i, o, a, s, u);
              if (null === this.first) this.first = c;
              else {
                for (var l = this.first; null !== l.next; ) l = l.next;
                l.next = c;
              }
              return (this.size += 1), c;
            },
            dequeue: function () {
              var t = null;
              return (
                null !== this.first &&
                  ((t = this.first),
                  (this.first = this.first.next),
                  (this.size -= 1)),
                t
              );
            },
            clear: function () {
              r.debug.log("BufferQueue clear!");
              for (var t = null; null !== this.first; )
                (t = this.first),
                  (this.first = this.first.next),
                  (this.size -= 1),
                  (t.buffer = null),
                  (t = null);
              (this.size = 0), (this.first = null);
            },
          }),
          new e()
        );
      }
      function N() {
        (v = "rgb2d"), (m = null), (L = new z()), (g = M), (C = !1);
      }
      var V = function (t, e) {
        var n = new a(t, e);
        switch (v) {
          case "RGB2d":
            h = new RGB2dCanvas(f, n);
            break;
          case "YUVWebGL":
            h = new i.YUVWebGLCanvas(f, n);
            break;
          case "ImageWebGL":
            h = new i.ImageWebGLCanvas(f, n);
            break;
          case "WebGL":
            h = new i.WebGLCanvas(f, n);
        }
      };
      function q(t, e) {
        var n = f.width,
          r = f.height,
          i = document.createElement("canvas");
        (i.width = n), (i.height = r);
        for (var o = i.getContext("2d"), a = 0; a < t.length; a++)
          o.drawImage(t[a], 0, 0, n, r);
        for (
          var s = i.toDataURL(),
            u = atob(s.substring("data:image/png;base64,".length)),
            c = new Uint8Array(u.length),
            l = 0,
            h = u.length;
          l < h;
          ++l
        )
          c[l] = u.charCodeAt(l);
        var d = new Blob([c.buffer], { type: "image/png" });
        H(d, e + ".png");
      }
      var H = (function (t) {
          var e = t.document,
            n = function () {
              return t.URL || t.webkitURL || t;
            },
            r = e.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            i = "download" in r,
            o = /constructor/i.test(t.HTMLElement),
            a = /CriOS\/[\d]+/.test(navigator.userAgent),
            s = function (e) {
              (t.setImmediate || t.setTimeout)(function () {
                throw e;
              }, 0);
            },
            u = function (t) {
              setTimeout(function () {
                "string" === typeof t ? n().revokeObjectURL(t) : t.remove();
              }, 4e4);
            },
            c = function (t) {
              return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                t.type
              )
                ? new Blob([String.fromCharCode(65279), t], { type: t.type })
                : t;
            },
            l = function (e, l, f) {
              f || (e = c(e));
              var h,
                d = this,
                p = "application/octet-stream" === e.type,
                v = function () {
                  !(function (t, e, n) {
                    for (var r = (e = [].concat(e)).length; r--; ) {
                      var i = t["on" + e[r]];
                      if ("function" === typeof i)
                        try {
                          i.call(t, n || t);
                        } catch (t) {
                          s(t);
                        }
                    }
                  })(d, "writestart progress write writeend".split(" "));
                };
              if (((d.readyState = d.INIT), i))
                return (
                  (h = n().createObjectURL(e)),
                  void setTimeout(function () {
                    (r.href = h),
                      (r.download = l),
                      (function (t) {
                        var e = new MouseEvent("click");
                        t.dispatchEvent(e);
                      })(r),
                      v(),
                      u(h),
                      (d.readyState = d.DONE);
                  })
                );
              !(function () {
                if ((a || (p && o)) && t.FileReader) {
                  var r = new FileReader();
                  return (
                    (r.onloadend = function () {
                      var e = a
                        ? r.result
                        : r.result.replace(
                            /^data:[^;]*;/,
                            "data:attachment/file;"
                          );
                      t.open(e, "_blank") || (t.location.href = e),
                        (e = void 0),
                        (d.readyState = d.DONE),
                        v();
                    }),
                    r.readAsDataURL(e),
                    void (d.readyState = d.INIT)
                  );
                }
                h || (h = n().createObjectURL(e)),
                  p
                    ? (t.location.href = h)
                    : t.open(h, "_blank") || (t.location.href = h),
                  (d.readyState = d.DONE),
                  v(),
                  u(h);
              })();
            },
            f = l.prototype;
          return "undefined" !== typeof navigator && navigator.msSaveOrOpenBlob
            ? function (t, e, n) {
                return (
                  (e = e || t.name || "download"),
                  n || (t = c(t)),
                  navigator.msSaveOrOpenBlob(t, e)
                );
              }
            : ((f.readyState = f.INIT = 0),
              (f.WRITING = 1),
              (f.DONE = 2),
              (f.error =
                f.onwritestart =
                f.onprogress =
                f.onwrite =
                f.onabort =
                f.onerror =
                f.onwriteend =
                  null),
              function (t, e, n) {
                return new l(t, e || t.name || "download", n);
              });
        })(window),
        W = function (t) {
          if (0 == L.size && !0 === B)
            return u.fileOverCallback(), void N.prototype.stopRendering();
          if (
            null !== (_ = L.dequeue()) &&
            null !== _.buffer &&
            ("mjpeg" === _.codecType || _.buffer.length > 0)
          ) {
            if (
              (("undefined" !== typeof d &&
                "undefined" !== typeof p &&
                d === _.width &&
                p === _.height &&
                m === _.codecType) ||
                ((v =
                  "h264" === _.codecType || "h265" === _.codecType
                    ? "YUVWebGL"
                    : "ImageWebGL"),
                V(_.width, _.height),
                ("undefined" != d && null != d && 0 != d) || y("PlayStart"),
                (d = _.width),
                (p = _.height),
                (m = _.codecType)),
              (S = _.timeStamp),
              u.timeStamp(S),
              "undefined" !== typeof h)
            )
              return (
                h.drawCanvas(_.buffer, _.option),
                (f.updatedCanvas = !0),
                b(S),
                Math.abs(S.timestamp - T) > 3 && u.waitingCallback(!1),
                (O = {
                  frameIndex: _.frameIndex,
                  option: _.option,
                  buffer: _.buffer,
                  timeStamp: _.timeStamp,
                }),
                (T = S.timestamp),
                D && ((D = !1), q([f].concat(P), k)),
                "mjpeg" === _.codecType
                  ? R.free(_.buffer)
                  : (delete _.buffer, (_.buffer = null)),
                (_.previous = null),
                (_.next = null),
                (_ = null),
                !0
              );
            r.debug.log("drawer is undefined in StreamDrawer!");
          }
          return !1;
        },
        G = function t(e) {
          if (!0 === C) {
            if (0 === w || e - w < 200)
              return (
                0 === w && (w = e),
                void (null !== L && window.requestAnimationFrame(t))
              );
            (A += e - x) > E && W() && (E += g),
              A > 1e3 && ((E = 0), (A = 0)),
              (x = e),
              window.requestAnimationFrame(t);
          }
        };
      return (
        (N.prototype = {
          getDrawingStrategy: function () {
            return v;
          },
          reassignCanvas: function () {
            var t = $('canvas[kind-channel-id="' + l + '"]')[0];
            f !== t && ((d = 0), (p = 0));
          },
          drawMJPEG: function (t, e, n, r, i, o, a, s) {
            var u = R.alloc();
            (u.width = e),
              (u.height = n),
              (u.codecType = r),
              (u.frameType = i),
              (u.frameIndex = a),
              (u.time = o),
              (u.onload = function () {
                null !== L &&
                  L.enqueue(
                    this,
                    this.width,
                    this.height,
                    this.codecType,
                    this.frameType,
                    this.time,
                    this.frameIndex,
                    this.option
                  );
              }),
              u.setAttribute(
                "src",
                "data:image/jpeg;base64," +
                  (function (t) {
                    for (
                      var e = "",
                        n =
                          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                        r = new Uint8Array(t),
                        i = r.byteLength,
                        o = i % 3,
                        a = i - o,
                        s = 0,
                        u = 0;
                      u < a;
                      u += 3
                    )
                      e +=
                        n[
                          (16515072 &
                            (s = (r[u] << 16) | (r[u + 1] << 8) | r[u + 2])) >>
                            18
                        ] +
                        n[(258048 & s) >> 12] +
                        n[(4032 & s) >> 6] +
                        n[63 & s];
                    return (
                      1 === o
                        ? (e +=
                            n[(252 & (s = r[a])) >> 2] + n[(3 & s) << 4] + "==")
                        : 2 === o &&
                          (e +=
                            n[(64512 & (s = (r[a] << 8) | r[a + 1])) >> 10] +
                            n[(1008 & s) >> 4] +
                            n[(15 & s) << 2] +
                            "="),
                      e
                    );
                  })(t)
              );
          },
          draw: function (t, e, n, r, i, o, a, s) {
            null !== L &&
              (document.hidden && L.size >= 15
                ? L.clear()
                : L.enqueue(t, e, n, r, i, o, a, s));
          },
          capture: function (t, e) {
            (k = t), (D = !0), (P = e.ivsCanvasArr);
          },
          getCapture: function (t, e, n) {
            return (
              (U = n || 1),
              (F = "png"),
              ("jpg" !== e && "jpeg" !== e) || (F = "jpeg"),
              h.drawCanvas(O.buffer, O.option),
              (f.updatedCanvas = !0),
              f.toDataURL("image/" + F, U) || ""
            );
          },
          digitalZoom: function (t) {
            "undefined" !== typeof h && null !== h && h.updateVertexArray(t);
          },
          setResizeCallback: function (t) {},
          getCodecType: function () {
            return m;
          },
          getFrameTimestamp: function () {
            return S;
          },
          initStartTime: function () {
            0 === w && window.requestAnimationFrame(G);
          },
          startRendering: function () {
            0 === w && ((C = !0), window.requestAnimationFrame(G));
          },
          pause: function () {
            C = !1;
          },
          play: function () {
            C = !0;
          },
          stopRendering: function () {
            (C = !1), (w = 0);
          },
          setFPS: function (t) {
            "undefined" === typeof t
              ? (g = M)
              : 0 === t
              ? (g = M)
              : (g = 1e3 / t),
              (I = g);
          },
          setFrameInterval: function (t) {
            g = t * I;
          },
          getCanvas: function () {
            return f;
          },
          renewCanvas: function () {
            V(d, p), "undefined" !== typeof h && null !== h && h.initCanvas();
          },
          setBeginDrawCallback: function (t) {
            y = t;
          },
          setupdateCanvasCallback: function (t) {
            b = t;
          },
          terminate: function () {
            (w = 0),
              (S = null),
              null !== L && (L.clear(), (L = null)),
              h && h.clearCanvas(),
              (h = null),
              (B = !1);
          },
          setRtspOver: function () {
            B = !0;
          },
          playNextFrame: W,
          getVideoBufferQueueSize: function () {
            return L.size;
          },
          getCurFrameInfo: function () {
            return O;
          },
        }),
        new N()
      );
    };
    e.default = s;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.$V = e.$P = e.$M = e.$L = void 0),
      (e.Matrix = o);
    var r = 1e-6;
    function i() {}
    function o() {}
    function a() {}
    function s() {}
    (i.prototype = {
      e: function (t) {
        return t < 1 || t > this.elements.length ? null : this.elements[t - 1];
      },
      dimensions: function () {
        return this.elements.length;
      },
      modulus: function () {
        return Math.sqrt(this.dot(this));
      },
      eql: function (t) {
        var e = this.elements.length,
          n = t.elements || t;
        if (e != n.length) return !1;
        do {
          if (Math.abs(this.elements[e - 1] - n[e - 1]) > r) return !1;
        } while (--e);
        return !0;
      },
      dup: function () {
        return i.create(this.elements);
      },
      map: function (t) {
        var e = [];
        return (
          this.each(function (n, r) {
            e.push(t(n, r));
          }),
          i.create(e)
        );
      },
      each: function (t) {
        var e,
          n = this.elements.length,
          r = n;
        do {
          (e = r - n), t(this.elements[e], e + 1);
        } while (--n);
      },
      toUnitVector: function () {
        var t = this.modulus();
        return 0 === t
          ? this.dup()
          : this.map(function (e) {
              return e / t;
            });
      },
      angleFrom: function (t) {
        var e = t.elements || t,
          n = this.elements.length;
        if (n != e.length) return null;
        var r = 0,
          i = 0,
          o = 0;
        if (
          (this.each(function (t, n) {
            (r += t * e[n - 1]), (i += t * t), (o += e[n - 1] * e[n - 1]);
          }),
          (i = Math.sqrt(i)),
          (o = Math.sqrt(o)),
          i * o === 0)
        )
          return null;
        var a = r / (i * o);
        return a < -1 && (a = -1), a > 1 && (a = 1), Math.acos(a);
      },
      isParallelTo: function (t) {
        var e = this.angleFrom(t);
        return null === e ? null : e <= r;
      },
      isAntiparallelTo: function (t) {
        var e = this.angleFrom(t);
        return null === e ? null : Math.abs(e - Math.PI) <= r;
      },
      isPerpendicularTo: function (t) {
        var e = this.dot(t);
        return null === e ? null : Math.abs(e) <= r;
      },
      add: function (t) {
        var e = t.elements || t;
        return this.elements.length != e.length
          ? null
          : this.map(function (t, n) {
              return t + e[n - 1];
            });
      },
      subtract: function (t) {
        var e = t.elements || t;
        return this.elements.length != e.length
          ? null
          : this.map(function (t, n) {
              return t - e[n - 1];
            });
      },
      multiply: function (t) {
        return this.map(function (e) {
          return e * t;
        });
      },
      x: function (t) {
        return this.multiply(t);
      },
      dot: function (t) {
        var e = t.elements || t,
          n = 0,
          r = this.elements.length;
        if (r != e.length) return null;
        do {
          n += this.elements[r - 1] * e[r - 1];
        } while (--r);
        return n;
      },
      cross: function (t) {
        var e = t.elements || t;
        if (3 != this.elements.length || 3 != e.length) return null;
        var n = this.elements;
        return i.create([
          n[1] * e[2] - n[2] * e[1],
          n[2] * e[0] - n[0] * e[2],
          n[0] * e[1] - n[1] * e[0],
        ]);
      },
      max: function () {
        var t,
          e = 0,
          n = this.elements.length,
          r = n;
        do {
          (t = r - n),
            Math.abs(this.elements[t]) > Math.abs(e) && (e = this.elements[t]);
        } while (--n);
        return e;
      },
      indexOf: function (t) {
        var e,
          n = null,
          r = this.elements.length,
          i = r;
        do {
          (e = i - r), null === n && this.elements[e] == t && (n = e + 1);
        } while (--r);
        return n;
      },
      toDiagonalMatrix: function () {
        return o.Diagonal(this.elements);
      },
      round: function () {
        return this.map(function (t) {
          return Math.round(t);
        });
      },
      snapTo: function (t) {
        return this.map(function (e) {
          return Math.abs(e - t) <= r ? t : e;
        });
      },
      distanceFrom: function (t) {
        if (t.anchor) return t.distanceFrom(this);
        var e = t.elements || t;
        if (e.length != this.elements.length) return null;
        var n,
          r = 0;
        return (
          this.each(function (t, i) {
            (n = t - e[i - 1]), (r += n * n);
          }),
          Math.sqrt(r)
        );
      },
      liesOn: function (t) {
        return t.contains(this);
      },
      liesIn: function (t) {
        return t.contains(this);
      },
      rotate: function (t, e) {
        var n, r, a, s, u;
        switch (this.elements.length) {
          case 2:
            return 2 != (n = e.elements || e).length
              ? null
              : ((r = o.Rotation(t).elements),
                (a = this.elements[0] - n[0]),
                (s = this.elements[1] - n[1]),
                i.create([
                  n[0] + r[0][0] * a + r[0][1] * s,
                  n[1] + r[1][0] * a + r[1][1] * s,
                ]));
          case 3:
            if (!e.direction) return null;
            var c = e.pointClosestTo(this).elements;
            return (
              (r = o.Rotation(t, e.direction).elements),
              (a = this.elements[0] - c[0]),
              (s = this.elements[1] - c[1]),
              (u = this.elements[2] - c[2]),
              i.create([
                c[0] + r[0][0] * a + r[0][1] * s + r[0][2] * u,
                c[1] + r[1][0] * a + r[1][1] * s + r[1][2] * u,
                c[2] + r[2][0] * a + r[2][1] * s + r[2][2] * u,
              ])
            );
          default:
            return null;
        }
      },
      reflectionIn: function (t) {
        if (t.anchor) {
          var e = this.elements.slice(),
            n = t.pointClosestTo(e).elements;
          return i.create([
            n[0] + (n[0] - e[0]),
            n[1] + (n[1] - e[1]),
            n[2] + (n[2] - (e[2] || 0)),
          ]);
        }
        var r = t.elements || t;
        return this.elements.length != r.length
          ? null
          : this.map(function (t, e) {
              return r[e - 1] + (r[e - 1] - t);
            });
      },
      to3D: function () {
        var t = this.dup();
        switch (t.elements.length) {
          case 3:
            break;
          case 2:
            t.elements.push(0);
            break;
          default:
            return null;
        }
        return t;
      },
      inspect: function () {
        return "[" + this.elements.join(", ") + "]";
      },
      setElements: function (t) {
        return (this.elements = (t.elements || t).slice()), this;
      },
    }),
      (i.create = function (t) {
        return new i().setElements(t);
      }),
      (i.i = i.create([1, 0, 0])),
      (i.j = i.create([0, 1, 0])),
      (i.k = i.create([0, 0, 1])),
      (i.Random = function (t) {
        var e = [];
        do {
          e.push(Math.random());
        } while (--t);
        return i.create(e);
      }),
      (i.Zero = function (t) {
        var e = [];
        do {
          e.push(0);
        } while (--t);
        return i.create(e);
      }),
      (o.prototype = {
        e: function (t, e) {
          return t < 1 ||
            t > this.elements.length ||
            e < 1 ||
            e > this.elements[0].length
            ? null
            : this.elements[t - 1][e - 1];
        },
        row: function (t) {
          return t > this.elements.length
            ? null
            : i.create(this.elements[t - 1]);
        },
        col: function (t) {
          if (t > this.elements[0].length) return null;
          var e,
            n = [],
            r = this.elements.length,
            o = r;
          do {
            (e = o - r), n.push(this.elements[e][t - 1]);
          } while (--r);
          return i.create(n);
        },
        dimensions: function () {
          return { rows: this.elements.length, cols: this.elements[0].length };
        },
        rows: function () {
          return this.elements.length;
        },
        cols: function () {
          return this.elements[0].length;
        },
        eql: function (t) {
          var e = t.elements || t;
          if (
            ("undefined" == typeof e[0][0] && (e = o.create(e).elements),
            this.elements.length != e.length ||
              this.elements[0].length != e[0].length)
          )
            return !1;
          var n,
            i,
            a,
            s = this.elements.length,
            u = s,
            c = this.elements[0].length;
          do {
            (n = u - s), (i = c);
            do {
              if (((a = c - i), Math.abs(this.elements[n][a] - e[n][a]) > r))
                return !1;
            } while (--i);
          } while (--s);
          return !0;
        },
        dup: function () {
          return o.create(this.elements);
        },
        map: function (t) {
          var e,
            n,
            r,
            i = [],
            a = this.elements.length,
            s = a,
            u = this.elements[0].length;
          do {
            (n = u), (i[(e = s - a)] = []);
            do {
              (r = u - n), (i[e][r] = t(this.elements[e][r], e + 1, r + 1));
            } while (--n);
          } while (--a);
          return o.create(i);
        },
        isSameSizeAs: function (t) {
          var e = t.elements || t;
          return (
            "undefined" == typeof e[0][0] && (e = o.create(e).elements),
            this.elements.length == e.length &&
              this.elements[0].length == e[0].length
          );
        },
        add: function (t) {
          var e = t.elements || t;
          return (
            "undefined" == typeof e[0][0] && (e = o.create(e).elements),
            this.isSameSizeAs(e)
              ? this.map(function (t, n, r) {
                  return t + e[n - 1][r - 1];
                })
              : null
          );
        },
        subtract: function (t) {
          var e = t.elements || t;
          return (
            "undefined" == typeof e[0][0] && (e = o.create(e).elements),
            this.isSameSizeAs(e)
              ? this.map(function (t, n, r) {
                  return t - e[n - 1][r - 1];
                })
              : null
          );
        },
        canMultiplyFromLeft: function (t) {
          var e = t.elements || t;
          return (
            "undefined" == typeof e[0][0] && (e = o.create(e).elements),
            this.elements[0].length == e.length
          );
        },
        multiply: function (t) {
          if (!t.elements)
            return this.map(function (e) {
              return e * t;
            });
          var e = !!t.modulus;
          if (
            ("undefined" == typeof (p = t.elements || t)[0][0] &&
              (p = o.create(p).elements),
            !this.canMultiplyFromLeft(p))
          )
            return null;
          var n,
            r,
            i,
            a,
            s,
            u,
            c = this.elements.length,
            l = c,
            f = p[0].length,
            h = this.elements[0].length,
            d = [];
          do {
            (d[(n = l - c)] = []), (r = f);
            do {
              (i = f - r), (a = 0), (s = h);
              do {
                (u = h - s), (a += this.elements[n][u] * p[u][i]);
              } while (--s);
              d[n][i] = a;
            } while (--r);
          } while (--c);
          var p = o.create(d);
          return e ? p.col(1) : p;
        },
        x: function (t) {
          return this.multiply(t);
        },
        minor: function (t, e, n, r) {
          var i,
            a,
            s,
            u = [],
            c = n,
            l = this.elements.length,
            f = this.elements[0].length;
          do {
            (u[(i = n - c)] = []), (a = r);
            do {
              (s = r - a),
                (u[i][s] = this.elements[(t + i - 1) % l][(e + s - 1) % f]);
            } while (--a);
          } while (--c);
          return o.create(u);
        },
        transpose: function () {
          var t,
            e,
            n,
            r = this.elements.length,
            i = this.elements[0].length,
            a = [],
            s = i;
          do {
            (a[(t = i - s)] = []), (e = r);
            do {
              (n = r - e), (a[t][n] = this.elements[n][t]);
            } while (--e);
          } while (--s);
          return o.create(a);
        },
        isSquare: function () {
          return this.elements.length == this.elements[0].length;
        },
        max: function () {
          var t,
            e,
            n,
            r = 0,
            i = this.elements.length,
            o = i,
            a = this.elements[0].length;
          do {
            (t = o - i), (e = a);
            do {
              (n = a - e),
                Math.abs(this.elements[t][n]) > Math.abs(r) &&
                  (r = this.elements[t][n]);
            } while (--e);
          } while (--i);
          return r;
        },
        indexOf: function (t) {
          var e,
            n,
            r,
            i = this.elements.length,
            o = i,
            a = this.elements[0].length;
          do {
            (e = o - i), (n = a);
            do {
              if (((r = a - n), this.elements[e][r] == t))
                return { i: e + 1, j: r + 1 };
            } while (--n);
          } while (--i);
          return null;
        },
        diagonal: function () {
          if (!this.isSquare) return null;
          var t,
            e = [],
            n = this.elements.length,
            r = n;
          do {
            (t = r - n), e.push(this.elements[t][t]);
          } while (--n);
          return i.create(e);
        },
        toRightTriangular: function () {
          var t,
            e,
            n,
            r,
            i = this.dup(),
            o = this.elements.length,
            a = o,
            s = this.elements[0].length;
          do {
            if (((e = a - o), 0 == i.elements[e][e]))
              for (j = e + 1; j < a; j++)
                if (0 != i.elements[j][e]) {
                  (t = []), (n = s);
                  do {
                    (r = s - n), t.push(i.elements[e][r] + i.elements[j][r]);
                  } while (--n);
                  i.elements[e] = t;
                  break;
                }
            if (0 != i.elements[e][e])
              for (j = e + 1; j < a; j++) {
                var u = i.elements[j][e] / i.elements[e][e];
                (t = []), (n = s);
                do {
                  (r = s - n),
                    t.push(
                      r <= e ? 0 : i.elements[j][r] - i.elements[e][r] * u
                    );
                } while (--n);
                i.elements[j] = t;
              }
          } while (--o);
          return i;
        },
        toUpperTriangular: function () {
          return this.toRightTriangular();
        },
        determinant: function () {
          if (!this.isSquare()) return null;
          var t,
            e = this.toRightTriangular(),
            n = e.elements[0][0],
            r = e.elements.length - 1,
            i = r;
          do {
            (t = i - r + 1), (n *= e.elements[t][t]);
          } while (--r);
          return n;
        },
        det: function () {
          return this.determinant();
        },
        isSingular: function () {
          return this.isSquare() && 0 === this.determinant();
        },
        trace: function () {
          if (!this.isSquare()) return null;
          var t,
            e = this.elements[0][0],
            n = this.elements.length - 1,
            r = n;
          do {
            (t = r - n + 1), (e += this.elements[t][t]);
          } while (--n);
          return e;
        },
        tr: function () {
          return this.trace();
        },
        rank: function () {
          var t,
            e,
            n,
            i = this.toRightTriangular(),
            o = 0,
            a = this.elements.length,
            s = a,
            u = this.elements[0].length;
          do {
            (t = s - a), (e = u);
            do {
              if (((n = u - e), Math.abs(i.elements[t][n]) > r)) {
                o++;
                break;
              }
            } while (--e);
          } while (--a);
          return o;
        },
        rk: function () {
          return this.rank();
        },
        augment: function (t) {
          var e = t.elements || t;
          "undefined" == typeof e[0][0] && (e = o.create(e).elements);
          var n,
            r,
            i,
            a = this.dup(),
            s = a.elements[0].length,
            u = a.elements.length,
            c = u,
            l = e[0].length;
          if (u != e.length) return null;
          do {
            (n = c - u), (r = l);
            do {
              (i = l - r), (a.elements[n][s + i] = e[n][i]);
            } while (--r);
          } while (--u);
          return a;
        },
        inverse: function () {
          if (!this.isSquare() || this.isSingular()) return null;
          var t,
            e,
            n,
            r,
            i,
            a,
            s,
            u = this.elements.length,
            c = u,
            l = this.augment(o.I(u)).toRightTriangular(),
            f = l.elements[0].length,
            h = [];
          do {
            (i = []), (n = f), (h[(t = u - 1)] = []), (a = l.elements[t][t]);
            do {
              (r = f - n),
                (s = l.elements[t][r] / a),
                i.push(s),
                r >= c && h[t].push(s);
            } while (--n);
            for (l.elements[t] = i, e = 0; e < t; e++) {
              (i = []), (n = f);
              do {
                (r = f - n),
                  i.push(
                    l.elements[e][r] - l.elements[t][r] * l.elements[e][t]
                  );
              } while (--n);
              l.elements[e] = i;
            }
          } while (--u);
          return o.create(h);
        },
        inv: function () {
          return this.inverse();
        },
        round: function () {
          return this.map(function (t) {
            return Math.round(t);
          });
        },
        snapTo: function (t) {
          return this.map(function (e) {
            return Math.abs(e - t) <= r ? t : e;
          });
        },
        inspect: function () {
          var t,
            e = [],
            n = this.elements.length,
            r = n;
          do {
            (t = r - n), e.push(i.create(this.elements[t]).inspect());
          } while (--n);
          return e.join("\n");
        },
        setElements: function (t) {
          var e,
            n = t.elements || t;
          if ("undefined" != typeof n[0][0]) {
            var r,
              i,
              o,
              a = n.length,
              s = a;
            this.elements = [];
            do {
              (i = r = n[(e = s - a)].length), (this.elements[e] = []);
              do {
                (o = i - r), (this.elements[e][o] = n[e][o]);
              } while (--r);
            } while (--a);
            return this;
          }
          var u = n.length,
            c = u;
          this.elements = [];
          do {
            (e = c - u), this.elements.push([n[e]]);
          } while (--u);
          return this;
        },
      }),
      (o.create = function (t) {
        return new o().setElements(t);
      }),
      (o.I = function (t) {
        var e,
          n,
          r,
          i = [],
          a = t;
        do {
          (i[(e = a - t)] = []), (n = a);
          do {
            (r = a - n), (i[e][r] = e == r ? 1 : 0);
          } while (--n);
        } while (--t);
        return o.create(i);
      }),
      (o.Diagonal = function (t) {
        var e,
          n = t.length,
          r = n,
          i = o.I(n);
        do {
          (e = r - n), (i.elements[e][e] = t[e]);
        } while (--n);
        return i;
      }),
      (o.Rotation = function (t, e) {
        if (!e)
          return o.create([
            [Math.cos(t), -Math.sin(t)],
            [Math.sin(t), Math.cos(t)],
          ]);
        var n = e.dup();
        if (3 != n.elements.length) return null;
        var r = n.modulus(),
          i = n.elements[0] / r,
          a = n.elements[1] / r,
          s = n.elements[2] / r,
          u = Math.sin(t),
          c = Math.cos(t),
          l = 1 - c;
        return o.create([
          [l * i * i + c, l * i * a - u * s, l * i * s + u * a],
          [l * i * a + u * s, l * a * a + c, l * a * s - u * i],
          [l * i * s - u * a, l * a * s + u * i, l * s * s + c],
        ]);
      }),
      (o.RotationX = function (t) {
        var e = Math.cos(t),
          n = Math.sin(t);
        return o.create([
          [1, 0, 0],
          [0, e, -n],
          [0, n, e],
        ]);
      }),
      (o.RotationY = function (t) {
        var e = Math.cos(t),
          n = Math.sin(t);
        return o.create([
          [e, 0, n],
          [0, 1, 0],
          [-n, 0, e],
        ]);
      }),
      (o.RotationZ = function (t) {
        var e = Math.cos(t),
          n = Math.sin(t);
        return o.create([
          [e, -n, 0],
          [n, e, 0],
          [0, 0, 1],
        ]);
      }),
      (o.Random = function (t, e) {
        return o.Zero(t, e).map(function () {
          return Math.random();
        });
      }),
      (o.Zero = function (t, e) {
        var n,
          r,
          i,
          a = [],
          s = t;
        do {
          (a[(n = t - s)] = []), (r = e);
          do {
            (i = e - r), (a[n][i] = 0);
          } while (--r);
        } while (--s);
        return o.create(a);
      }),
      (a.prototype = {
        eql: function (t) {
          return this.isParallelTo(t) && this.contains(t.anchor);
        },
        dup: function () {
          return a.create(this.anchor, this.direction);
        },
        translate: function (t) {
          var e = t.elements || t;
          return a.create(
            [
              this.anchor.elements[0] + e[0],
              this.anchor.elements[1] + e[1],
              this.anchor.elements[2] + (e[2] || 0),
            ],
            this.direction
          );
        },
        isParallelTo: function (t) {
          if (t.normal) return t.isParallelTo(this);
          var e = this.direction.angleFrom(t.direction);
          return Math.abs(e) <= r || Math.abs(e - Math.PI) <= r;
        },
        distanceFrom: function (t) {
          if (t.normal) return t.distanceFrom(this);
          if (t.direction) {
            if (this.isParallelTo(t)) return this.distanceFrom(t.anchor);
            var e = this.direction.cross(t.direction).toUnitVector().elements,
              n = this.anchor.elements,
              r = t.anchor.elements;
            return Math.abs(
              (n[0] - r[0]) * e[0] + (n[1] - r[1]) * e[1] + (n[2] - r[2]) * e[2]
            );
          }
          var i = t.elements || t,
            o = ((n = this.anchor.elements), this.direction.elements),
            a = i[0] - n[0],
            s = i[1] - n[1],
            u = (i[2] || 0) - n[2],
            c = Math.sqrt(a * a + s * s + u * u);
          if (0 === c) return 0;
          var l = (a * o[0] + s * o[1] + u * o[2]) / c,
            f = 1 - l * l;
          return Math.abs(c * Math.sqrt(f < 0 ? 0 : f));
        },
        contains: function (t) {
          var e = this.distanceFrom(t);
          return null !== e && e <= r;
        },
        liesIn: function (t) {
          return t.contains(this);
        },
        intersects: function (t) {
          return t.normal
            ? t.intersects(this)
            : !this.isParallelTo(t) && this.distanceFrom(t) <= r;
        },
        intersectionWith: function (t) {
          if (t.normal) return t.intersectionWith(this);
          if (!this.intersects(t)) return null;
          var e = this.anchor.elements,
            n = this.direction.elements,
            r = t.anchor.elements,
            o = t.direction.elements,
            a = n[0],
            s = n[1],
            u = n[2],
            c = o[0],
            l = o[1],
            f = o[2],
            h = e[0] - r[0],
            d = e[1] - r[1],
            p = e[2] - r[2],
            v = c * c + l * l + f * f,
            g = a * c + s * l + u * f,
            m =
              (((-a * h - s * d - u * p) * v) / (a * a + s * s + u * u) +
                g * (c * h + l * d + f * p)) /
              (v - g * g);
          return i.create([e[0] + m * a, e[1] + m * s, e[2] + m * u]);
        },
        pointClosestTo: function (t) {
          if (t.direction) {
            if (this.intersects(t)) return this.intersectionWith(t);
            if (this.isParallelTo(t)) return null;
            var e = this.direction.elements,
              n = t.direction.elements,
              r = e[0],
              o = e[1],
              a = e[2],
              u = n[0],
              c = n[1],
              l = n[2],
              f = a * u - r * l,
              h = r * c - o * u,
              d = o * l - a * c,
              p = i.create([f * l - h * c, h * u - d * l, d * c - f * u]);
            return (v = s.create(t.anchor, p)).intersectionWith(this);
          }
          var v = t.elements || t;
          if (this.contains(v)) return i.create(v);
          var g = this.anchor.elements,
            m =
              ((r = (e = this.direction.elements)[0]),
              (o = e[1]),
              (a = e[2]),
              g[0]),
            y = g[1],
            b = g[2],
            w =
              ((f = r * (v[1] - y) - o * (v[0] - m)),
              (h = o * ((v[2] || 0) - b) - a * (v[1] - y)),
              (d = a * (v[0] - m) - r * ((v[2] || 0) - b)),
              i.create([o * f - a * d, a * h - r * f, r * d - o * h])),
            S = this.distanceFrom(v) / w.modulus();
          return i.create([
            v[0] + w.elements[0] * S,
            v[1] + w.elements[1] * S,
            (v[2] || 0) + w.elements[2] * S,
          ]);
        },
        rotate: function (t, e) {
          "undefined" == typeof e.direction && (e = a.create(e.to3D(), i.k));
          var n = o.Rotation(t, e.direction).elements,
            r = e.pointClosestTo(this.anchor).elements,
            s = this.anchor.elements,
            u = this.direction.elements,
            c = r[0],
            l = r[1],
            f = r[2],
            h = s[0] - c,
            d = s[1] - l,
            p = s[2] - f;
          return a.create(
            [
              c + n[0][0] * h + n[0][1] * d + n[0][2] * p,
              l + n[1][0] * h + n[1][1] * d + n[1][2] * p,
              f + n[2][0] * h + n[2][1] * d + n[2][2] * p,
            ],
            [
              n[0][0] * u[0] + n[0][1] * u[1] + n[0][2] * u[2],
              n[1][0] * u[0] + n[1][1] * u[1] + n[1][2] * u[2],
              n[2][0] * u[0] + n[2][1] * u[1] + n[2][2] * u[2],
            ]
          );
        },
        reflectionIn: function (t) {
          if (t.normal) {
            var e = this.anchor.elements,
              n = this.direction.elements,
              r = e[0],
              i = e[1],
              o = e[2],
              s = n[0],
              u = n[1],
              c = n[2],
              l = this.anchor.reflectionIn(t).elements,
              f = r + s,
              h = i + u,
              d = o + c,
              p = t.pointClosestTo([f, h, d]).elements,
              v = [
                p[0] + (p[0] - f) - l[0],
                p[1] + (p[1] - h) - l[1],
                p[2] + (p[2] - d) - l[2],
              ];
            return a.create(l, v);
          }
          if (t.direction) return this.rotate(Math.PI, t);
          var g = t.elements || t;
          return a.create(
            this.anchor.reflectionIn([g[0], g[1], g[2] || 0]),
            this.direction
          );
        },
        setVectors: function (t, e) {
          if (
            ((t = i.create(t)),
            (e = i.create(e)),
            2 == t.elements.length && t.elements.push(0),
            2 == e.elements.length && e.elements.push(0),
            t.elements.length > 3 || e.elements.length > 3)
          )
            return null;
          var n = e.modulus();
          return 0 === n
            ? null
            : ((this.anchor = t),
              (this.direction = i.create([
                e.elements[0] / n,
                e.elements[1] / n,
                e.elements[2] / n,
              ])),
              this);
        },
      }),
      (a.create = function (t, e) {
        return new a().setVectors(t, e);
      }),
      (a.X = a.create(i.Zero(3), i.i)),
      (a.Y = a.create(i.Zero(3), i.j)),
      (a.Z = a.create(i.Zero(3), i.k)),
      (s.prototype = {
        eql: function (t) {
          return this.contains(t.anchor) && this.isParallelTo(t);
        },
        dup: function () {
          return s.create(this.anchor, this.normal);
        },
        translate: function (t) {
          var e = t.elements || t;
          return s.create(
            [
              this.anchor.elements[0] + e[0],
              this.anchor.elements[1] + e[1],
              this.anchor.elements[2] + (e[2] || 0),
            ],
            this.normal
          );
        },
        isParallelTo: function (t) {
          var e;
          return t.normal
            ? ((e = this.normal.angleFrom(t.normal)),
              Math.abs(e) <= r || Math.abs(Math.PI - e) <= r)
            : t.direction
            ? this.normal.isPerpendicularTo(t.direction)
            : null;
        },
        isPerpendicularTo: function (t) {
          var e = this.normal.angleFrom(t.normal);
          return Math.abs(Math.PI / 2 - e) <= r;
        },
        distanceFrom: function (t) {
          if (this.intersects(t) || this.contains(t)) return 0;
          if (t.anchor) {
            var e = this.anchor.elements,
              n = t.anchor.elements,
              r = this.normal.elements;
            return Math.abs(
              (e[0] - n[0]) * r[0] + (e[1] - n[1]) * r[1] + (e[2] - n[2]) * r[2]
            );
          }
          var i = t.elements || t;
          (e = this.anchor.elements), (r = this.normal.elements);
          return Math.abs(
            (e[0] - i[0]) * r[0] +
              (e[1] - i[1]) * r[1] +
              (e[2] - (i[2] || 0)) * r[2]
          );
        },
        contains: function (t) {
          if (t.normal) return null;
          if (t.direction)
            return (
              this.contains(t.anchor) &&
              this.contains(t.anchor.add(t.direction))
            );
          var e = t.elements || t,
            n = this.anchor.elements,
            i = this.normal.elements;
          return (
            Math.abs(
              i[0] * (n[0] - e[0]) +
                i[1] * (n[1] - e[1]) +
                i[2] * (n[2] - (e[2] || 0))
            ) <= r
          );
        },
        intersects: function (t) {
          return "undefined" == typeof t.direction &&
            "undefined" == typeof t.normal
            ? null
            : !this.isParallelTo(t);
        },
        intersectionWith: function (t) {
          if (!this.intersects(t)) return null;
          if (t.direction) {
            var e = t.anchor.elements,
              n = t.direction.elements,
              r = this.anchor.elements,
              s =
                ((c = this.normal.elements)[0] * (r[0] - e[0]) +
                  c[1] * (r[1] - e[1]) +
                  c[2] * (r[2] - e[2])) /
                (c[0] * n[0] + c[1] * n[1] + c[2] * n[2]);
            return i.create([
              e[0] + n[0] * s,
              e[1] + n[1] * s,
              e[2] + n[2] * s,
            ]);
          }
          if (t.normal) {
            for (
              var u = this.normal.cross(t.normal).toUnitVector(),
                c = this.normal.elements,
                l = ((e = this.anchor.elements), t.normal.elements),
                f = t.anchor.elements,
                h = o.Zero(2, 2),
                d = 0;
              h.isSingular();

            )
              d++,
                (h = o.create([
                  [c[d % 3], c[(d + 1) % 3]],
                  [l[d % 3], l[(d + 1) % 3]],
                ]));
            for (
              var p = h.inverse().elements,
                v = c[0] * e[0] + c[1] * e[1] + c[2] * e[2],
                g = l[0] * f[0] + l[1] * f[1] + l[2] * f[2],
                m = [p[0][0] * v + p[0][1] * g, p[1][0] * v + p[1][1] * g],
                y = [],
                b = 1;
              b <= 3;
              b++
            )
              y.push(d == b ? 0 : m[(b + ((5 - d) % 3)) % 3]);
            return a.create(y, u);
          }
        },
        pointClosestTo: function (t) {
          var e = t.elements || t,
            n = this.anchor.elements,
            r = this.normal.elements,
            o =
              (n[0] - e[0]) * r[0] +
              (n[1] - e[1]) * r[1] +
              (n[2] - (e[2] || 0)) * r[2];
          return i.create([
            e[0] + r[0] * o,
            e[1] + r[1] * o,
            (e[2] || 0) + r[2] * o,
          ]);
        },
        rotate: function (t, e) {
          var n = o.Rotation(t, e.direction).elements,
            r = e.pointClosestTo(this.anchor).elements,
            i = this.anchor.elements,
            a = this.normal.elements,
            u = r[0],
            c = r[1],
            l = r[2],
            f = i[0] - u,
            h = i[1] - c,
            d = i[2] - l;
          return s.create(
            [
              u + n[0][0] * f + n[0][1] * h + n[0][2] * d,
              c + n[1][0] * f + n[1][1] * h + n[1][2] * d,
              l + n[2][0] * f + n[2][1] * h + n[2][2] * d,
            ],
            [
              n[0][0] * a[0] + n[0][1] * a[1] + n[0][2] * a[2],
              n[1][0] * a[0] + n[1][1] * a[1] + n[1][2] * a[2],
              n[2][0] * a[0] + n[2][1] * a[1] + n[2][2] * a[2],
            ]
          );
        },
        reflectionIn: function (t) {
          if (t.normal) {
            var e = this.anchor.elements,
              n = this.normal.elements,
              r = e[0],
              i = e[1],
              o = e[2],
              a = n[0],
              u = n[1],
              c = n[2],
              l = this.anchor.reflectionIn(t).elements,
              f = r + a,
              h = i + u,
              d = o + c,
              p = t.pointClosestTo([f, h, d]).elements,
              v = [
                p[0] + (p[0] - f) - l[0],
                p[1] + (p[1] - h) - l[1],
                p[2] + (p[2] - d) - l[2],
              ];
            return s.create(l, v);
          }
          if (t.direction) return this.rotate(Math.PI, t);
          var g = t.elements || t;
          return s.create(
            this.anchor.reflectionIn([g[0], g[1], g[2] || 0]),
            this.normal
          );
        },
        setVectors: function (t, e, n) {
          if (null === (t = (t = i.create(t)).to3D())) return null;
          if (null === (e = (e = i.create(e)).to3D())) return null;
          if ("undefined" == typeof n) n = null;
          else if (null === (n = (n = i.create(n)).to3D())) return null;
          var r,
            o,
            a = t.elements[0],
            s = t.elements[1],
            u = t.elements[2],
            c = e.elements[0],
            l = e.elements[1],
            f = e.elements[2];
          if (null !== n) {
            var h = n.elements[0],
              d = n.elements[1],
              p = n.elements[2];
            if (
              0 ===
              (o = (r = i.create([
                (l - s) * (p - u) - (f - u) * (d - s),
                (f - u) * (h - a) - (c - a) * (p - u),
                (c - a) * (d - s) - (l - s) * (h - a),
              ])).modulus())
            )
              return null;
            r = i.create([
              r.elements[0] / o,
              r.elements[1] / o,
              r.elements[2] / o,
            ]);
          } else {
            if (0 === (o = Math.sqrt(c * c + l * l + f * f))) return null;
            r = i.create([
              e.elements[0] / o,
              e.elements[1] / o,
              e.elements[2] / o,
            ]);
          }
          return (this.anchor = t), (this.normal = r), this;
        },
      }),
      (o.Translation = function (t) {
        var e;
        if (2 === t.elements.length)
          return (
            ((e = o.I(3)).elements[2][0] = t.elements[0]),
            (e.elements[2][1] = t.elements[1]),
            e
          );
        if (3 === t.elements.length)
          return (
            ((e = o.I(4)).elements[0][3] = t.elements[0]),
            (e.elements[1][3] = t.elements[1]),
            (e.elements[2][3] = t.elements[2]),
            e
          );
        throw "Invalid length for Translation";
      }),
      (o.prototype.flatten = function () {
        var t = [];
        if (0 === this.elements.length) return [];
        for (var e = 0; e < this.elements[0].length; e++)
          for (var n = 0; n < this.elements.length; n++)
            t.push(this.elements[n][e]);
        return t;
      }),
      (o.prototype.ensure4x4 = function () {
        var t;
        if (4 === this.elements.length && 4 === this.elements[0].length)
          return this;
        if (this.elements.length > 4 || this.elements[0].length > 4)
          return null;
        for (t = 0; t < this.elements.length; t++)
          for (var e = this.elements[t].length; e < 4; e++)
            t === e ? this.elements[t].push(1) : this.elements[t].push(0);
        for (t = this.elements.length; t < 4; t++)
          0 === t
            ? this.elements.push([1, 0, 0, 0])
            : 1 === t
            ? this.elements.push([0, 1, 0, 0])
            : 2 === t
            ? this.elements.push([0, 0, 1, 0])
            : 3 === t && this.elements.push([0, 0, 0, 1]);
        return this;
      }),
      (o.prototype.make3x3 = function () {
        return 4 !== this.elements.length || 4 !== this.elements[0].length
          ? null
          : o.create([
              [this.elements[0][0], this.elements[0][1], this.elements[0][2]],
              [this.elements[1][0], this.elements[1][1], this.elements[1][2]],
              [this.elements[2][0], this.elements[2][1], this.elements[2][2]],
            ]);
      }),
      (s.create = function (t, e, n) {
        return new s().setVectors(t, e, n);
      }),
      (s.XY = s.create(i.Zero(3), i.k)),
      (s.YZ = s.create(i.Zero(3), i.i)),
      (s.ZX = s.create(i.Zero(3), i.j)),
      (s.YX = s.XY),
      (s.ZY = s.YZ),
      (s.XZ = s.ZX);
    var u = i.create;
    e.$V = u;
    var c = o.create;
    e.$M = c;
    var l = a.create;
    e.$L = l;
    var f = s.create;
    e.$P = f;
  },
  function (t, e) {
    t.exports = function () {
      return new Worker("/module/videoWorker.worker.js");
    };
  },
  function (t, e) {
    t.exports = function () {
      return new Worker("/module/audioWorker.worker.js");
    };
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = n(11);
    var i = function (t) {
      var e = null,
        n = "",
        i = null,
        o = null,
        a = null,
        s = null,
        u = null,
        c = 1,
        l = { timestamp: 0, timestamp_usec: 0, timezone: 0 },
        f = { timestamp: 0, timestamp_usec: 0, timezone: 0 },
        h = null,
        d = !1,
        p = null,
        v = null,
        g = null,
        m = !1,
        y = !0,
        b = 0,
        w = t,
        S = !1,
        T = [],
        x = 0.5,
        E = null,
        A = null,
        R = null,
        _ = 0,
        k = 0,
        D = !1,
        C = null,
        M = "png",
        I = 1,
        B = (0, r.BrowserDetect)(),
        O = null,
        P = 0,
        F = 0,
        U = 0,
        j = 8,
        L = null,
        z = !1,
        N = !1,
        V = [],
        q = [],
        H = {},
        W = 25,
        G = 0.5;
      function Y() {}
      function X() {
        Z();
      }
      function Q() {
        var t = 0;
        if (null !== p)
          for (t = 0; t < p.length; t++)
            R.removeEventListener(p[t].type, p[t].function);
        if (null !== g)
          for (t = 0; t < g.length; t++)
            A.removeEventListener(g[t].type, g[t].function);
        if (null !== v)
          for (t = 0; t < v.length; t++)
            E.removeEventListener(v[t].type, v[t].function);
      }
      function Z() {
        if (null === A || "ended" === A.readyState)
          return (
            (function (t) {
              (g = []).push({ type: "sourceopen", function: X }),
                g.push({ type: "error", function: rt });
              for (var e = 0; e < g.length; e++)
                t.addEventListener(g[e].type, g[e].function);
            })((A = new MediaSource())),
            (E.src = window.URL.createObjectURL(A)),
            void r.debug.log(
              "videoMediaSource::appendInitSegment new MediaSource()"
            )
          );
        if (
          (r.debug.log("videoMediaSource::appendInitSegment start"),
          0 === A.sourceBuffers.length)
        ) {
          A.duration = 0;
          var t = 'video/mp4;codecs="avc1.' + n + '"';
          if (!MediaSource.isTypeSupported(t))
            return (
              r.debug.log("not support" + t), void (L && L({ errorCode: 101 }))
            );
          !(function (t) {
            (p = []).push({ type: "error", function: it }),
              p.push({ type: "updateend", function: et }),
              p.push({ type: "update", function: nt });
            for (var e = 0; e < p.length; e++)
              t.addEventListener(p[e].type, p[e].function);
          })((R = A.addSourceBuffer(t)));
        }
        var i = e();
        null !== i
          ? (R.appendBuffer(i),
            r.debug.log(
              "videoMediaSource::appendInitSegment end, codecInfo = " + n
            ))
          : A.endOfStream("network");
      }
      function K() {
        E.paused && (o(), m || z || E.play());
      }
      function J() {
        E.paused || y || (r.debug.log("pause"), E.pause());
      }
      function $() {
        V.length &&
          (function (t, e) {
            if (
              null !== R &&
              "closed" !== A.readyState &&
              "ended" !== A.readyState
            )
              try {
                if (T.length > 0)
                  return (
                    r.debug.count("1.segmentWaitDecode.length: " + T.length),
                    T.push(t),
                    void r.debug.count(
                      "2.segmentWaitDecode.length: " + T.length
                    )
                  );
                R.updating
                  ? (r.debug.log("updating.........."), T.push(t))
                  : (R.appendBuffer(t), (H.frameIndex = e));
              } catch (t) {
                r.debug.log(
                  "videoMediaSource::appendNextMediaSegment error >> initVideo"
                ),
                  (T.length = 0),
                  w.initVideo(!1),
                  L && L({ errorCode: 101 });
              }
          })(V.shift(), q.shift());
      }
      function tt() {
        if (null !== A)
          try {
            if (
              R &&
              R.buffered.length > 0 &&
              ((function () {
                var t = 1 * R.buffered.start(R.buffered.length - 1),
                  e = 1 * R.buffered.end(R.buffered.length - 1);
                e - t > 60 && R.remove(t, e - 10);
              })(),
              (N && !z) ||
                (E.duration > G &&
                  ((E.currentTime = (E.duration - G).toFixed(3)),
                  (G += W < 10 ? 0.5 : 0.1))),
              E && E.duration - E.currentTime > j && L && L({ errorCode: 101 }),
              S && !d)
            ) {
              var t = 1 * R.buffered.start(R.buffered.length - 1),
                e = 1 * R.buffered.end(R.buffered.length - 1);
              if (
                (0 === E.currentTime ? e - t : e - E.currentTime) >=
                x + 0.1
              ) {
                if ((r.debug.log("\u8df3\u79d2"), R.updating)) return;
                var n = e - x;
                E.currentTime = n.toFixed(3);
              }
            }
          } catch (t) {
            r.debug.log("sourceBuffer has been removed");
          }
      }
      function et() {}
      function nt() {
        T.length > 0 &&
          (r.debug.count(
            "1. onSourceUpdate .segmentWaitDecode.length: " + T.length
          ),
          R.updating ||
            (r.debug.count(
              "2. onSourceUpdate .appendBuffer: " +
                T.length +
                "  " +
                T[0].length
            ),
            R.appendBuffer(T[0]),
            T.shift()));
      }
      function rt() {
        r.debug.log("videoMediaSource::onSourceError");
      }
      function it() {
        r.debug.log("videoMediaSource::onSourceBufferErrormsg");
      }
      function ot() {
        r.debug.log("videoMediaSource::onError"),
          J(),
          L && L({ errorCode: 101 });
      }
      function at() {
        (m = !0),
          (y = !1),
          (N = !0),
          r.debug.log("playing "),
          D || ((D = !0), s("PlayStart"));
      }
      function st() {
        (m = !1),
          (y = !0),
          r.debug.log(
            "\u6682\u505c\u64ad\u653e----------------------------------------------"
          );
      }
      function ut() {
        var t = parseInt(A.duration, 10),
          e = parseInt(E.currentTime, 10),
          n = {
            timestamp: l.timestamp - c * (t - e + (1 !== c ? 1 : 0)),
            timestamp_usec: 0,
            timezone: l.timezone,
          };
        0 === e ||
          isNaN(t) ||
          (d && w.waitingCallback(!1),
          (!d && Math.abs(t - e) > 4 && 1 === c) ||
            E.paused ||
            (null === h
              ? ((h = n), a(0, "currentTime"))
              : ((h.timestamp <= n.timestamp && c >= 1) ||
                  (h.timestamp > n.timestamp && c < 1)) &&
                (d && w.timeStamp(n),
                (h = n),
                ++b > 4 && a(n.timestamp, "currentTime"))));
      }
      function ct() {
        K(), tt();
      }
      function lt() {
        o();
      }
      function ft() {
        K();
      }
      function ht() {
        if (
          (r.debug.log("\u9700\u8981\u7f13\u51b2\u4e0b\u4e00\u5e27"),
          (S = !1),
          d && m && w.waitingCallback(!0),
          0 == k)
        )
          (_ = Date.now()), k++;
        else {
          k++;
          var t = Date.now() - _;
          r.debug.log("diffTime: " + t + "  Count: " + k),
            k >= 5 &&
              t < 6e4 &&
              x <= 1.8 &&
              ((x += 0.1), (k = 0), (_ = 0), r.debug.log("delay + 0.1 = " + x));
        }
      }
      function dt() {
        r.debug.log("Can play !");
      }
      function pt() {
        r.debug.log("Can play without waiting"), (S = !0);
      }
      function vt() {
        r.debug.log("loadedmetadata");
      }
      function gt(t, e, n) {
        for (
          var r = t.width, i = t.height, o = t.getContext("2d"), a = 0;
          a < e.length;
          a++
        )
          o.drawImage(e[a], 0, 0, r, i);
        for (
          var s = t.toDataURL(),
            u = atob(s.substring("data:image/png;base64,".length)),
            c = new Uint8Array(u.length),
            l = 0,
            f = u.length;
          l < f;
          ++l
        )
          c[l] = u.charCodeAt(l);
        var h = new Blob([c.buffer], { type: "image/png" });
        mt(h, n + ".png");
      }
      Y.prototype = {
        init: function (t) {
          (u = (0, r.BrowserDetect)()),
            r.debug.log("videoMediaSource::init browserType = " + u),
            ((E = t).autoplay = "safari" !== u),
            (E.controls = !1),
            (E.preload = "auto"),
            (function (t) {
              (v = []).push({ type: "durationchange", function: ct }),
                v.push({ type: "playing", function: at }),
                v.push({ type: "error", function: ot }),
                v.push({ type: "pause", function: st }),
                v.push({ type: "timeupdate", function: ut }),
                v.push({ type: "resize", function: lt }),
                v.push({ type: "seeked", function: ft }),
                v.push({ type: "waiting", function: ht }),
                v.push({ type: "canplaythrough", function: pt }),
                v.push({ type: "canplay", function: dt }),
                v.push({ type: "loadedmetadata", function: vt });
              for (var e = 0; e < v.length; e++)
                t.addEventListener(v[e].type, v[e].function);
            })(E),
            Z();
        },
        setInitSegmentFunc: function (t) {
          e = t;
        },
        getVideoElement: function () {
          return E;
        },
        setCodecInfo: function (t) {
          n = t;
        },
        setMediaSegment: function (t, e) {
          V.push(t), q.push(e), z || $();
        },
        capture: function (t, e) {
          C && clearInterval(C);
          var n = document.createElement("canvas");
          (n.width = E.videoWidth), (n.height = E.videoHeight);
          var r = e.ivsCanvasArr;
          S || "edge" === B
            ? (n.getContext("2d").drawImage(E, 0, 0, n.width, n.height),
              gt(n, r, t))
            : (C = setInterval(function () {
                S &&
                  (n.getContext("2d").drawImage(E, 0, 0, n.width, n.height),
                  gt(n, r, t),
                  clearInterval(C));
              }, 200));
        },
        getCapture: function (t, e, n) {
          C && clearInterval(C),
            (I = n || 1),
            (M = "png"),
            ("jpg" !== e && "jpeg" !== e) || (M = "jpeg");
          var r = document.createElement("canvas"),
            i = null;
          return (
            (r.width = E.videoWidth),
            (r.height = E.videoHeight),
            S || "edge" === B
              ? (r.getContext("2d").drawImage(E, 0, 0, r.width, r.height),
                (i = r.toDataURL("image/" + M, I)))
              : S &&
                (r.getContext("2d").drawImage(E, 0, 0, r.width, r.height),
                (i = r.toDataURL("image/" + M, I))),
            i
          );
        },
        setInitSegment: function () {
          Z();
        },
        setTimeStamp: function (t, e) {
          i = t;
        },
        setVideoSizeCallback: function (t) {
          o = t;
        },
        setAudioStartCallback: function (t) {
          a = t;
        },
        getPlaybackTimeStamp: function () {
          return i;
        },
        setSpeedPlay: function (t) {
          c = t;
        },
        setvideoTimeStamp: function (t) {
          var e = Math.abs(l.timestamp - t.timestamp) > 3;
          0 === f.timestamp && w.timeStamp(t),
            !0 === e &&
              ((b = 0),
              a((f = t).timestamp, "init"),
              0 !== l.timestamp &&
                d &&
                ((E.currentTime = A.duration - 0.1), w.waitingCallback(!1)),
              (h = null)),
            (l = t);
        },
        pause: function () {
          (z = !0), J();
        },
        play: function () {
          z = !1;
        },
        setPlaybackFlag: function (t) {
          d = t;
        },
        setTimeStampInit: function () {
          (h = null), (f = { timestamp: 0, timestamp_usec: 0, timezone: 0 });
        },
        close: function () {
          Q(), J();
        },
        setBeginDrawCallback: function (t) {
          s = t;
        },
        setErrorCallback: function (t) {
          L = t;
        },
        terminate: function () {
          null !== E &&
            (Q(),
            "open" === A.readyState &&
              (R && A.removeSourceBuffer(R), A.endOfStream()),
            (E.src = ""),
            (R = null),
            (A = null),
            (E = null),
            C && (clearInterval(C), (C = null)),
            O && (clearInterval(O), (O = null)),
            (U = 0),
            (F = 0),
            (P = 0));
        },
        getDuration: function () {
          return E.duration - E.currentTime;
        },
        setFPS: function (t) {
          t && (W = t);
        },
        setRtspOver: function () {
          E.duration.toFixed(4) - 0 === E.currentTime.toFixed(4) - 0
            ? (w.timeStamp(l), w.fileOverCallback())
            : ((P = parseInt(E.currentTime)),
              (F = parseInt(E.duration)),
              (O = setInterval(function () {
                P === parseInt(E.currentTime) && F === parseInt(E.duration)
                  ? U++ > 10 &&
                    (O && clearInterval(O),
                    (O = null),
                    w.timeStamp(l),
                    w.fileOverCallback())
                  : parseInt(E.currentTime) >= parseInt(E.duration)
                  ? (O && clearInterval(O),
                    (O = null),
                    w.timeStamp(l),
                    w.fileOverCallback())
                  : ((P = parseInt(E.currentTime)),
                    (F = parseInt(E.duration)),
                    (U = 0));
              }, 150)));
        },
        getVideoBufferQueueSize: function () {
          return V.length;
        },
        playNextFrame: function () {
          $();
        },
        getCurFrameInfo: function () {
          return (
            (H.src = (function () {
              var t = document.createElement("canvas");
              return (
                (t.width = E.videoWidth),
                (t.height = E.videoHeight),
                t.getContext("2d").drawImage(E, 0, 0, t.width, t.height),
                t.toDataURL()
              );
            })()),
            H
          );
        },
      };
      var mt = (function (t) {
        var e = t.document,
          n = function () {
            return t.URL || t.webkitURL || t;
          },
          r = e.createElementNS("http://www.w3.org/1999/xhtml", "a"),
          i = "download" in r,
          o = /constructor/i.test(t.HTMLElement),
          a = /CriOS\/[\d]+/.test(navigator.userAgent),
          s = function (e) {
            (t.setImmediate || t.setTimeout)(function () {
              throw e;
            }, 0);
          },
          u = function (t) {
            setTimeout(function () {
              "string" === typeof t ? n().revokeObjectURL(t) : t.remove();
            }, 4e4);
          },
          c = function (t) {
            return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
              t.type
            )
              ? new Blob([String.fromCharCode(65279), t], { type: t.type })
              : t;
          },
          l = function (e, l, f) {
            f || (e = c(e));
            var h,
              d = this,
              p = "application/octet-stream" === e.type,
              v = function () {
                !(function (t, e, n) {
                  for (var r = (e = [].concat(e)).length; r--; ) {
                    var i = t["on" + e[r]];
                    if ("function" === typeof i)
                      try {
                        i.call(t, n || t);
                      } catch (t) {
                        s(t);
                      }
                  }
                })(d, "writestart progress write writeend".split(" "));
              };
            if (((d.readyState = d.INIT), i))
              return (
                (h = n().createObjectURL(e)),
                void setTimeout(function () {
                  (r.href = h),
                    (r.download = l),
                    (function (t) {
                      var e = new MouseEvent("click");
                      t.dispatchEvent(e);
                    })(r),
                    v(),
                    u(h),
                    (d.readyState = d.DONE);
                })
              );
            !(function () {
              if ((a || (p && o)) && t.FileReader) {
                var r = new FileReader();
                return (
                  (r.onloadend = function () {
                    var e = a
                      ? r.result
                      : r.result.replace(
                          /^data:[^;]*;/,
                          "data:attachment/file;"
                        );
                    t.open(e, "_blank") || (t.location.href = e),
                      (e = void 0),
                      (d.readyState = d.DONE),
                      v();
                  }),
                  r.readAsDataURL(e),
                  void (d.readyState = d.INIT)
                );
              }
              h || (h = n().createObjectURL(e)),
                p
                  ? (t.location.href = h)
                  : t.open(h, "_blank") || (t.location.href = h),
                (d.readyState = d.DONE),
                v(),
                u(h);
            })();
          },
          f = l.prototype;
        return "undefined" !== typeof navigator && navigator.msSaveOrOpenBlob
          ? function (t, e, n) {
              return (
                (e = e || t.name || "download"),
                n || (t = c(t)),
                navigator.msSaveOrOpenBlob(t, e)
              );
            }
          : ((f.readyState = f.INIT = 0),
            (f.WRITING = 1),
            (f.DONE = 2),
            (f.error =
              f.onwritestart =
              f.onprogress =
              f.onwrite =
              f.onabort =
              f.onerror =
              f.onwriteend =
                null),
            function (t, e, n) {
              return new l(t, e || t.name || "download", n);
            });
      })(window);
      return new Y();
    };
    e.default = i;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = n(11),
      i = new (function () {
        var t = [],
          e = {};
        function n() {
          for (var n in t)
            t[n] = [
              n.charCodeAt(0),
              n.charCodeAt(1),
              n.charCodeAt(2),
              n.charCodeAt(3),
            ];
          (e.FTYP = new Uint8Array([
            105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49,
          ])),
            (e.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1])),
            (e.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
            (e.STSC = e.STCO = e.STTS),
            (e.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
            (e.HDLR_VIDEO = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101,
              114, 0,
            ])),
            (e.HDLR_AUDIO = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101,
              114, 0,
            ])),
            (e.DREF = new Uint8Array([
              0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0,
              1,
            ])),
            (e.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
            (e.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]));
        }
        t = {
          avc1: [],
          avcC: [],
          btrt: [],
          dinf: [],
          dref: [],
          esds: [],
          ftyp: [],
          hdlr: [],
          mdat: [],
          mdhd: [],
          mdia: [],
          mfhd: [],
          minf: [],
          moof: [],
          moov: [],
          mp4a: [],
          mvex: [],
          mvhd: [],
          sdtp: [],
          stbl: [],
          stco: [],
          stsc: [],
          stsd: [],
          stsz: [],
          stts: [],
          tfdt: [],
          tfhd: [],
          traf: [],
          trak: [],
          trun: [],
          trex: [],
          tkhd: [],
          vmhd: [],
          smhd: [],
        };
        var i = function (t) {
            for (
              var e = 8, n = Array.prototype.slice.call(arguments, 1), r = 0;
              r < n.length;
              r++
            )
              e += n[r].byteLength;
            var i = new Uint8Array(e),
              o = 0;
            for (
              i[o++] = (e >>> 24) & 255,
                i[o++] = (e >>> 16) & 255,
                i[o++] = (e >>> 8) & 255,
                i[o++] = 255 & e,
                i.set(t, o),
                o += 4,
                r = 0;
              r < n.length;
              r++
            )
              i.set(n[r], o), (o += n[r].byteLength);
            return i;
          },
          o = function (e) {
            return i(
              t.mp4a,
              new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                (65280 & e.channelcount) >> 8,
                255 & e.channelcount,
                (65280 & e.samplesize) >> 8,
                255 & e.samplesize,
                0,
                0,
                0,
                0,
                (65280 & e.samplerate) >> 8,
                255 & e.samplerate,
                0,
                0,
              ]),
              (function (e) {
                var n = e.config,
                  r = n.length,
                  o = new Uint8Array(
                    [
                      0,
                      0,
                      0,
                      0,
                      3,
                      23 + r,
                      0,
                      1,
                      0,
                      4,
                      15 + r,
                      64,
                      21,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      5,
                    ]
                      .concat([r])
                      .concat(n)
                      .concat([6, 1, 2])
                  );
                return i(t.esds, o);
              })(e)
            );
          },
          a = function (n) {
            return "audio" === n.type
              ? i(t.stsd, e.STSD_PREFIX, o(n))
              : i(
                  t.stsd,
                  e.STSD_PREFIX,
                  (function (e) {
                    var n = e.sps || [],
                      r = e.pps || [],
                      o = [],
                      a = [],
                      s = 0;
                    for (s = 0; s < n.length; s++)
                      o.push((65280 & n[s].byteLength) >>> 8),
                        o.push(255 & n[s].byteLength),
                        (o = o.concat(Array.prototype.slice.call(n[s])));
                    for (s = 0; s < r.length; s++)
                      a.push((65280 & r[s].byteLength) >>> 8),
                        a.push(255 & r[s].byteLength),
                        (a = a.concat(Array.prototype.slice.call(r[s])));
                    return i(
                      t.avc1,
                      new Uint8Array([
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        (65280 & e.width) >> 8,
                        255 & e.width,
                        (65280 & e.height) >> 8,
                        255 & e.height,
                        0,
                        72,
                        0,
                        0,
                        0,
                        72,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        19,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        24,
                        17,
                        17,
                      ]),
                      i(
                        t.avcC,
                        new Uint8Array(
                          [
                            1,
                            e.profileIdc,
                            e.profileCompatibility,
                            e.levelIdc,
                            255,
                          ]
                            .concat([n.length])
                            .concat(o)
                            .concat([r.length])
                            .concat(a)
                        )
                      )
                    );
                  })(n)
                );
          },
          s = function (n) {
            var r = null;
            return (
              (r = "audio" === n.type ? i(t.smhd, e.SMHD) : i(t.vmhd, e.VMHD)),
              i(
                t.minf,
                r,
                i(t.dinf, i(t.dref, e.DREF)),
                (function (n) {
                  return i(
                    t.stbl,
                    a(n),
                    i(t.stts, e.STTS),
                    i(t.stsc, e.STSC),
                    i(t.stsz, e.STSZ),
                    i(t.stco, e.STCO)
                  );
                })(n)
              )
            );
          },
          u = function (n) {
            return i(
              t.mdia,
              (function (e) {
                var n = e.timescale,
                  r = e.duration;
                return i(
                  t.mdhd,
                  new Uint8Array([
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    (n >>> 24) & 255,
                    (n >>> 16) & 255,
                    (n >>> 8) & 255,
                    255 & n,
                    (r >>> 24) & 255,
                    (r >>> 16) & 255,
                    (r >>> 8) & 255,
                    255 & r,
                    85,
                    196,
                    0,
                    0,
                  ])
                );
              })(n),
              (function (n) {
                var r = null;
                return (
                  (r = "audio" === n.type ? e.HDLR_AUDIO : e.HDLR_VIDEO),
                  i(t.hdlr, r)
                );
              })(n),
              s(n)
            );
          },
          c = function (e) {
            return i(
              t.trak,
              (function (e) {
                var n = e.id,
                  r = e.duration,
                  o = e.width,
                  a = e.height;
                return i(
                  t.tkhd,
                  new Uint8Array([
                    0,
                    0,
                    0,
                    7,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    (n >>> 24) & 255,
                    (n >>> 16) & 255,
                    (n >>> 8) & 255,
                    255 & n,
                    0,
                    0,
                    0,
                    0,
                    (r >>> 24) & 255,
                    (r >>> 16) & 255,
                    (r >>> 8) & 255,
                    255 & r,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    64,
                    0,
                    0,
                    0,
                    (o >>> 8) & 255,
                    255 & o,
                    0,
                    0,
                    (a >>> 8) & 255,
                    255 & a,
                    0,
                    0,
                  ])
                );
              })(e),
              u(e)
            );
          },
          l = function (e) {
            return i(
              t.mvex,
              (function (e) {
                var n = e.id,
                  r = new Uint8Array([
                    0,
                    0,
                    0,
                    0,
                    (n >>> 24) & 255,
                    (n >>> 16) & 255,
                    (n >>> 8) & 255,
                    255 & n,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    1,
                  ]);
                return i(t.trex, r);
              })(e)
            );
          },
          f = function (e) {
            var n,
              o,
              a =
                ((n = e.timescale),
                (o = e.duration),
                r.debug.log("mvhd:  timescale: " + n + "  duration: " + o),
                i(
                  t.mvhd,
                  new Uint8Array([
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    (n >>> 24) & 255,
                    (n >>> 16) & 255,
                    (n >>> 8) & 255,
                    255 & n,
                    (o >>> 24) & 255,
                    (o >>> 16) & 255,
                    (o >>> 8) & 255,
                    255 & o,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    64,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    255,
                    255,
                    255,
                    255,
                  ])
                )),
              s = c(e),
              u = l(e);
            return i(t.moov, a, s, u);
          },
          h = function (e, n) {
            return "audio" === e.type
              ? audioTrun(e, n)
              : (function (e, n) {
                  var r,
                    o = null,
                    a = null,
                    s = 0,
                    u = n;
                  if (null === (r = e.samples || [])[0].frameDuration)
                    for (
                      u += 24 + 4 * r.length, o = trunHeader(r, u), s = 0;
                      s < r.length;
                      s++
                    )
                      (a = r[s]),
                        (o = o.concat([
                          (4278190080 & a.size) >>> 24,
                          (16711680 & a.size) >>> 16,
                          (65280 & a.size) >>> 8,
                          255 & a.size,
                        ]));
                  else
                    for (
                      o = (function (t, e) {
                        return [
                          0,
                          0,
                          3,
                          5,
                          (4278190080 & t.length) >>> 24,
                          (16711680 & t.length) >>> 16,
                          (65280 & t.length) >>> 8,
                          255 & t.length,
                          (4278190080 & e) >>> 24,
                          (16711680 & e) >>> 16,
                          (65280 & e) >>> 8,
                          255 & e,
                          0,
                          0,
                          0,
                          0,
                        ];
                      })(r, (u += 24 + 4 * r.length + 4 * r.length)),
                        s = 0;
                      s < r.length;
                      s++
                    )
                      (a = r[s]),
                        (o = o.concat([
                          (4278190080 & a.frameDuration) >>> 24,
                          (16711680 & a.frameDuration) >>> 16,
                          (65280 & a.frameDuration) >>> 8,
                          255 & a.frameDuration,
                          (4278190080 & a.size) >>> 24,
                          (16711680 & a.size) >>> 16,
                          (65280 & a.size) >>> 8,
                          255 & a.size,
                        ]));
                  return i(t.trun, new Uint8Array(o));
                })(e, n);
          },
          d = function (e, n) {
            return i(
              t.moof,
              (function (e) {
                var n = new Uint8Array([
                  0,
                  0,
                  0,
                  0,
                  (e >>> 24) & 255,
                  (e >>> 16) & 255,
                  (e >>> 8) & 255,
                  255 & e,
                ]);
                return i(t.mfhd, n);
              })(e),
              (function (e) {
                var n, r, o;
                return (
                  (n = i(t.tfhd, new Uint8Array([0, 2, 0, 0, 0, 0, 0, 1]))),
                  (r = i(
                    t.tfdt,
                    new Uint8Array([
                      0,
                      0,
                      0,
                      0,
                      (e.baseMediaDecodeTime >>> 24) & 255,
                      (e.baseMediaDecodeTime >>> 16) & 255,
                      (e.baseMediaDecodeTime >>> 8) & 255,
                      255 & e.baseMediaDecodeTime,
                    ])
                  )),
                  (o = h(e, 72)),
                  i(t.traf, n, r, o)
                );
              })(n)
            );
          };
        return (
          (n.prototype = {
            initSegment: function (n) {
              var o = i(t.ftyp, e.FTYP);
              r.debug.log(n);
              var a = f(n),
                s = new Uint8Array(o.byteLength + a.byteLength);
              return s.set(o, 0), s.set(a, o.byteLength), s;
            },
            mediaSegment: function (e, n, r, o) {
              var a = d(e, n),
                s = (function (e) {
                  return i(t.mdat, e);
                })(r),
                u = null;
              return (
                (u = new Uint8Array(a.byteLength + s.byteLength)).set(a),
                u.set(s, a.byteLength),
                u
              );
            },
          }),
          new n()
        );
      })();
    e.default = i;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = r(n(12)),
      o = n(11);
    var a = function () {
      var t = {},
        e = null,
        n = s(),
        r = s();
      function a(t, e) {
        (this.data = t), (this.timeStamp = e), (this.next = null);
      }
      function s() {
        function t() {
          (this.first = null), (this.size = 0);
        }
        return (
          (t.prototype = {
            enqueue: function (t) {
              if (null === this.first) this.first = t;
              else {
                for (var e = this.first; null !== e.next; ) e = e.next;
                e.next = t;
              }
              this.size += 1;
            },
            dequeue: function () {
              var t = null;
              return (
                null !== this.first &&
                  ((t = this.first),
                  (this.first = this.first.next),
                  (this.size -= 1)),
                t
              );
            },
            clear: function () {
              (this.size = 0), (this.first = null);
            },
          }),
          new t()
        );
      }
      function u(t, n) {
        var r = n.first;
        if (r)
          if (t > r.timeStamp) {
            for (; r && t > r.timeStamp; )
              (r = n.dequeue()) &&
                r.data &&
                2 === r.data.type &&
                e &&
                e(r.data);
            r && e && e(r.data);
          } else
            t < r.timeStamp
              ? r.data && 2 !== r.data.type && e && e(r.data)
              : (e && e(r.data), n.dequeue());
      }
      function c() {}
      return (
        (c.prototype = {
          draw: function (s, c, l, f) {
            o.debug.log(
              "type:" + s.type + "   jsondata:" + JSON.stringify(s.params)
            );
            var h = s.params;
            if (h) {
              var d = { type: 0, data: null, channel: f };
              if (
                (h.hasOwnProperty("VideoAnalyseRule") &&
                  ((d.type = 0), (d.data = h.VideoAnalyseRule), e && e(d)),
                h.hasOwnProperty("FocusStatus") &&
                  ((d.type = 3), (d.data = h.FocusStatus), e && e(d)),
                h.hasOwnProperty("Event") &&
                  ((d.type = 2),
                  (d.data = h.Event),
                  r.enqueue(new a(JSON.parse(JSON.stringify(d)), l))),
                u(c, r),
                5 === s.type)
              )
                for (
                  var p = h.object, v = h.coordinate, g = 0;
                  g < p.length;
                  g++
                )
                  !(function (e) {
                    var n = p[e].classID + p[e].objectId;
                    switch (p[e].operateType) {
                      case 1:
                        (t[n] = {}),
                          (t[n].show = !0),
                          p[e].hasOwnProperty("track") &&
                            (t[n].pos = p[e].track[0]),
                          (t[n].type = p[e].objectType),
                          (t[n].coordinate = v),
                          (t[n].timeout = setTimeout(function () {
                            t[n].show = !1;
                          }, 500));
                        break;
                      case 2:
                        t.hasOwnProperty(n) ||
                          ((t[n] = {}), (t[n].coordinate = v)),
                          p[e].hasOwnProperty("track") &&
                            ((t[n].pos = p[e].track[0]), (t[n].show = !0)),
                          (t[n].type = p[e].objectType),
                          t[n].timeout && clearTimeout(t[n].timeout),
                          (t[n].timeout = setTimeout(function () {
                            t[n].show = !1;
                          }, 500));
                        break;
                      case 3:
                        t.hasOwnProperty(n) &&
                          (t[n].timeout && clearTimeout(t[n].timeout),
                          delete t[n]);
                        break;
                      case 4:
                        t.hasOwnProperty(n) && (t[n].show = !1);
                    }
                  })(g);
              else if (14 === s.type)
                for (
                  var m = function (n) {
                      return setTimeout(function () {
                        var r = {};
                        (d.type = 1),
                          (d.data = r),
                          (r[n] = { type: 14, show: !1 }),
                          e && e(JSON.parse(JSON.stringify(d))),
                          delete t[n];
                      }, 500);
                    },
                    y = 0;
                  y < h.length;
                  y++
                ) {
                  if (((v = h[y].coordinate), (p = []), h[y].object))
                    for (var b in h[y].object)
                      ("commonObject" !== b && "vehicleObject" !== b) ||
                        (p = p.concat(h[y].object[b]));
                  for (g = 0; g < p.length; g++)
                    !(function (e) {
                      var n = h[y].classID + p[e].objectId;
                      for (var r in p[e])
                        if ("object" === (0, i.default)(p[e][r]))
                          switch (p[e].operateType) {
                            case 1:
                              t[n] || (t[n] = {}),
                                (t[n].show = !0),
                                p[e].hasOwnProperty("track")
                                  ? (t[n].pos = p[e].track[0])
                                  : (t[n].pos = p[e][r][0].track[0]),
                                (t[n].type = p[e].type),
                                (t[n].coordinate = v),
                                clearTimeout(t[n].timeout),
                                (t[n].timeout = m(n));
                              break;
                            case 2:
                              t.hasOwnProperty(n) ||
                                ((t[n] = {}), (t[n].coordinate = v)),
                                p[e].hasOwnProperty("track")
                                  ? (t[n].pos = p[e].track[0])
                                  : (t[n].pos = p[e][r][0].track[0]),
                                (t[n].show = !0),
                                (t[n].type = p[e].type),
                                clearTimeout(t[n].timeout),
                                (t[n].timeout = m(n));
                          }
                    })(g);
                }
              else if (20 === s.type)
                for (g = 0; g < h.length; g++) {
                  var w = h[g],
                    S = { show: !0, type: 20 },
                    T = String("0x14_") + w.objectId;
                  switch (((t = {}), w.objectStatus)) {
                    case 0:
                      (t[T] = S),
                        (t[T].data = w.params.object),
                        (t[T].timeout = setTimeout(function () {}, 500));
                      break;
                    case 1:
                      t.hasOwnProperty(T) && (t[T].show = !1);
                      break;
                    case 2:
                      t.hasOwnProperty(T) || (t[T] = S),
                        (t[T].data = w.params.object),
                        t[T].timeout && clearTimeout(t[T].timeout),
                        (t[T].timeout = setTimeout(function () {}, 500));
                      break;
                    case 3:
                      t.hasOwnProperty(T) && (t[T].timeout, delete t[T]);
                  }
                }
              (d.type = 1),
                (d.data = t),
                n.enqueue(new a(JSON.parse(JSON.stringify(d)), l)),
                u(c, n);
            }
          },
          setCallback: function (t) {
            e || (e = t);
          },
        }),
        new c()
      );
    };
    e.default = a;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = function () {
        var t = 200,
          e = 8e3,
          n = null,
          i = null,
          o = null,
          a = 0,
          s = { type: "G.711", samplingRate: e, bitrate: "8000" },
          u = 0,
          c = !1,
          l = 0,
          f = 0,
          h = null,
          d = !1,
          p = new Float32Array(8e4),
          v = 0,
          g = null,
          m = !1,
          y = [],
          b = !1,
          w = null,
          S = 0,
          T = 0;
        function x(t) {
          t &&
            (t.connect(o),
            t.start(),
            (t.onended = function () {
              t.disconnect(),
                (S += T),
                w.timeUpdate(S),
                b || (y.length ? x(y.shift()) : w.audioPlayEnd());
            }));
        }
        function E() {}
        return (
          (E.prototype = {
            audioInit: function (t) {
              if (((u = 0), null !== n && c))
                r.debug.info("Audio context already defined!");
              else
                try {
                  return (
                    n &&
                      !c &&
                      /Apple Computer/.test(navigator.vendor) &&
                      /Safari/.test(navigator.userAgent) &&
                      n.close(),
                    (window.AudioContext =
                      window.AudioContext ||
                      window.webkitAudioContext ||
                      window.mozAudioContext ||
                      window.oAudioContext ||
                      window.msAudioContext),
                    ((n = new AudioContext()).onstatechange = function () {
                      r.debug.info("Audio Context State changed :: " + n.state),
                        "running" === n.state && (c = !0);
                    }),
                    (i = n.createGain()),
                    (o = n.createBiquadFilter()).connect(i),
                    (o.type = "lowpass"),
                    (o.frequency.value = 4e3),
                    (o.gain.value = 40),
                    i.connect(n.destination),
                    this.controlVolumn(t),
                    !0
                  );
                } catch (t) {
                  return (
                    r.debug.error(
                      "Web Audio API is not supported in this web browser! : " +
                        t
                    ),
                    !1
                  );
                }
            },
            play: function () {
              this.controlVolumn(a), (b = !1), x(y.shift());
            },
            stop: function () {
              (a = 0), (i.gain.value = 0), (u = 0);
            },
            bufferAudio: function (r, i, a, f) {
              c &&
                (f
                  ? (function (t) {
                      d ||
                        (m ||
                          (5 === y.length &&
                            ((m = !0), x(y.shift()), w.audioPlayBegin())),
                        y.push(
                          (function (t, e) {
                            var r = n.createBuffer(1, t.length, e.samplingRate);
                            return (
                              (T = t.length / e.samplingRate),
                              r.getChannelData(0).set(t),
                              ((g = n.createBufferSource()).buffer = r),
                              g
                            );
                          })(t, s)
                        ));
                    })(r)
                  : (function (r, i) {
                      if (!(null == r || r.length <= 0)) {
                        var a = i - l;
                        if (
                          ((a > t || a < 0) &&
                            ((u = 0),
                            (v = 0),
                            (d = !0),
                            null !== g && g.stop()),
                          u - n.currentTime < 0 && (u = 0),
                          (l = i),
                          (p = (function (t, e, n) {
                            var r = t;
                            return (
                              n + e.length >= r.length &&
                                (r = new Float32Array(r.length + 8e4)).set(
                                  r,
                                  0
                                ),
                              r.set(e, n),
                              r
                            );
                          })(p, r, v)),
                          (v += r.length),
                          !d)
                        ) {
                          var c = 0;
                          if (
                            v / r.length > 1 &&
                            (null !== h && (c = h * e), c >= v || null === h)
                          )
                            return void (v = 0);
                          var f = null;
                          /Apple Computer/.test(navigator.vendor) &&
                          /Safari/.test(navigator.userAgent) &&
                          s.samplingRate < 32e3
                            ? (8e3 == s.samplingRate
                                ? (p = (function (t) {
                                    for (
                                      var e = 0,
                                        n = 0,
                                        r = 0,
                                        i = 0,
                                        o = (1 - Math.cos(0.2 * Math.PI)) / 2,
                                        a = new Float32Array(4 * t.length),
                                        s = 0,
                                        u = 0;
                                      s < t.length;
                                      s++
                                    )
                                      (u = 4 * s),
                                        (e = t[s]),
                                        (n = s < t.length - 1 ? t[s + 1] : e),
                                        (r = s < t.length - 2 ? t[s + 2] : e),
                                        (i = s < t.length - 3 ? t[s + 3] : e),
                                        (i =
                                          (r =
                                            (n = e * (1 - o) + n * o) *
                                              (1 - o) +
                                            r * o) *
                                            (1 - o) +
                                          i * o),
                                        (a[u] = e),
                                        (a[u + 1] = n),
                                        (a[u + 2] = r),
                                        (a[u + 3] = i);
                                    return a;
                                  })(p.subarray(c, v)))
                                : 16e3 == s.samplingRate &&
                                  (p = (function (t) {
                                    for (
                                      var e = 0,
                                        n = 0,
                                        r = new Float32Array(2 * t.length),
                                        i = 0,
                                        o = 0;
                                      i < t.length;
                                      i++
                                    )
                                      (o = 2 * i),
                                        (e = t[i]),
                                        (n = i < t.length - 1 ? t[i + 1] : e),
                                        (r[o] = e),
                                        (r[o + 1] = (e + n) / 2);
                                    return r;
                                  })(p.subarray(c, v))),
                              (f = n.createBuffer(1, p.length, 32e3))
                                .getChannelData(0)
                                .set(p))
                            : (f = n.createBuffer(1, v - c, s.samplingRate))
                                .getChannelData(0)
                                .set(p.subarray(c, v)),
                            (v = 0),
                            ((g = n.createBufferSource()).buffer = f),
                            g.connect(o),
                            u || (u = n.currentTime + 0.1),
                            g.start(u),
                            (u += f.duration);
                        }
                      }
                    })(r, i));
            },
            controlVolumn: function (t, e) {
              e &&
                /Apple Computer/.test(navigator.vendor) &&
                /Safari/.test(navigator.userAgent) &&
                this.audioInit(1),
                (a = t);
              var n = t / 1;
              n <= 0
                ? ((i.gain.value = 0), (u = 0))
                : (i.gain.value = n >= 1 ? 1 : n);
            },
            getVolume: function () {
              return a;
            },
            terminate: function () {
              n && "closed" !== n.state && ((u = 0), (c = !1), n.close());
            },
            setBufferingFlag: function (t, e) {
              "init" === e
                ? (f = t)
                : d &&
                  (0 === t || "undefined" === typeof t || null === t
                    ? (h = null)
                    : ((h = t - f), (f = 0)),
                  (d = !1));
            },
            getBufferingFlag: function () {
              return d;
            },
            setInitVideoTimeStamp: function (t) {
              f = t;
            },
            getInitVideoTimeStamp: function () {
              return f;
            },
            setSamplingRate: function (t) {
              s.samplingRate = t;
            },
            pause: function () {
              b = !0;
            },
            timeUpdate: function () {},
            setRtspOver: function () {
              !0;
            },
            audioPlayBegin: function () {},
            audioPlayEnd: function () {},
          }),
          (w = new E())
        );
      });
    var r = n(11);
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = n(11),
      i = function () {
        var t = null,
          e = null,
          n = null,
          i = null,
          o = !1,
          a = null,
          s = { audio: !0, video: !1 },
          u = null;
        function c() {}
        return (
          (c.prototype = {
            init: function () {
              if (void 0 === t || null === t)
                try {
                  (window.AudioContext =
                    window.AudioContext ||
                    window.webkitAudioContext ||
                    window.mozAudioContext ||
                    window.oAudioContext ||
                    window.msAudioContext),
                    ((t = new AudioContext()).onstatechange = function () {
                      r.debug.info("Audio Context State changed :: " + t.state);
                    });
                } catch (t) {
                  return void r.debug.error(
                    "Web Audio API is not supported in this web browser! : " + t
                  );
                }
            },
            initAudioOut: function () {
              if (
                ((null !== e && null !== n) ||
                  ((e = t.createGain()),
                  ((n = t.createScriptProcessor(4096, 1, 1)).onaudioprocess =
                    function (t) {
                      if (null !== a) {
                        var e = t.inputBuffer.getChannelData(0);
                        null !== u && !0 === o && u(e);
                      }
                    }),
                  e.connect(n),
                  n.connect(t.destination),
                  (i = t.sampleRate),
                  (e.gain.value = 1)),
                void 0 === navigator.mediaDevices &&
                  (navigator.mediaDevices = {}),
                void 0 === navigator.mediaDevices.getUserMedia &&
                  (navigator.mediaDevices.getUserMedia = function (t, e, n) {
                    var r =
                      navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia;
                    return r
                      ? new Promise(function (e, n) {
                          r.call(navigator, t, e, n);
                        })
                      : (n(),
                        Promise.reject(
                          new Error(
                            "getUserMedia is not implemented in this browser"
                          )
                        ));
                  }),
                navigator.mediaDevices.getUserMedia)
              )
                return (
                  navigator.mediaDevices
                    .getUserMedia(s)
                    .then(function (n) {
                      (a = n), t.createMediaStreamSource(n).connect(e);
                    })
                    .catch(function (t) {
                      r.debug.error(t);
                    }),
                  (o = !0),
                  i
                );
              r.debug.error(
                "Cannot open local media stream! :: navigator.mediaDevices.getUserMedia is not defined!"
              );
            },
            controlVolumnOut: function (t) {
              var n = (t / 20) * 2;
              e.gain.value = n <= 0 ? 0 : n >= 10 ? 10 : n;
            },
            stopAudioOut: function () {
              if (null !== a && o)
                try {
                  for (
                    var t = a.getAudioTracks(), e = 0, n = t.length;
                    e < n;
                    e++
                  )
                    t[e].stop();
                  (o = !1), (a = null);
                } catch (t) {
                  r.debug.log(t);
                }
            },
            terminate: function () {
              this.stopAudioOut(), t.close(), (e = null), (n = null);
            },
            setSendAudioTalkBufferCallback: function (t) {
              u = t;
            },
          }),
          new c()
        );
      };
    e.default = i;
  },
  function (t, e) {
    t.exports = function () {
      return new Worker("/module/audioTalkWorker.worker.js");
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = r(n(153)),
      o = n(11),
      a = n(58);
    function s(t, e) {
      function n(t, e) {
        (n.prototype.w = t), (n.prototype.h = e);
      }
      return (
        (n.prototype = {
          toString: function () {
            return "(" + n.prototype.w + ", " + n.prototype.h + ")";
          },
          getHalfSize: function () {
            return new s(n.prototype.w >>> 1, n.prototype.h >>> 1);
          },
          length: function () {
            return n.prototype.w * n.prototype.h;
          },
        }),
        new n(t, e)
      );
    }
    var u = function () {
      var t = null,
        e = null,
        n = null,
        r = !0,
        u = 0,
        c = new Map(),
        l = new Map(),
        f = this,
        h = null;
      function d() {}
      function p(r) {
        var i = r.data;
        switch (i.type) {
          case "WorkerReady":
            e && e();
            break;
          case "canvasRender":
            !(function (e, r) {
              if (null != e) {
                if (null === n) {
                  var i = new s(r.ylen, r.height);
                  n = new a.YUVWebGLCanvas(t, i);
                }
                var o = Math.floor((v(r.time).getTime() - u) / 1e3),
                  l = { frameData: e, option: r };
                c.size > 600 && c.clear(), !1 === c.has(o) && c.set(o, l);
              }
            })(i.data, i.option);
            break;
          default:
            o.debug.log("workerManager::videoWorker unknown data = " + i.data);
        }
      }
      function v(t) {
        var e = 2e3 + (t >> 26),
          n = (t >> 22) & 15,
          r = (t >> 17) & 31,
          i = (t >> 12) & 31,
          o = (t >> 6) & 63,
          a = 63 & t,
          s = new Date();
        return s.setFullYear(e, n - 1, r), s.setHours(i, o, a, 0), s;
      }
      return (
        (d.prototype = {
          init: function (e, n) {
            (t = e), (f.channel = n), ((h = new i.default()).onmessage = p);
          },
          parseRTPData: function (t, e) {
            !0 === r &&
              (u = v(
                (u =
                  ((e[19] << 24) + (e[18] << 16) + (e[17] << 8) + e[16]) >>> 0)
              ).getTime()),
              (r = !1);
            var n = e[4],
              i = {
                type: "MediaData",
                data: { rtspInterleave: t, payload: e },
                info: null,
                channel: f.channel,
              };
            (253 != n && 254 != n && 252 != n && 251 != n) || h.postMessage(i);
          },
          setCallback: function (t, n) {
            switch (t) {
              case "WorkerReady":
                e = n;
                break;
              case "FileOver":
                this.fileOverCallback = n;
                break;
              default:
                o.debug.log(t),
                  o.debug.log("workerManager::setCallback() : type is unknown");
            }
          },
          terminate: function () {
            h && (h.terminate(), (h = null)), c && (c = null), l && (l = null);
          },
          play: function () {},
          initStartTime: function () {},
          pause: function () {},
          setLiveMode: function () {},
          setPlayMode: function () {},
          setFPS: function () {},
          sendSdpInfo: function () {},
          postRtspOver: function () {},
          gotoSecond: function (e, r) {
            if (((e = (e = e < 0 ? 0 : e) > r ? r : e), !0 === c.has(e))) {
              var i = c.get(e);
              return (
                n.drawCanvas(i.frameData, i.option),
                { pngData: t.toDataURL(), option: i.option }
              );
            }
            return !1;
          },
          gotoFrame: function (e) {
            if (!0 === l.has(e)) {
              var r = l.get(e);
              return (
                n.drawCanvas(r.frameData, r.option),
                { pngData: t.toDataURL(), option: r.option }
              );
            }
            return !1;
          },
          checkLeftSize: function (t, e, n, r) {
            var i = !1;
            if ("next" === e)
              for (var o = 1; o <= r; o++) {
                var a = t + o > n ? n : t + o;
                if (!1 === (i = c.has(a))) break;
              }
            else if ("pre" === e)
              for (
                o = 1;
                o <= r && ((a = t - o < 1 ? 1 : t - o), !1 !== (i = c.has(a)));
                o++
              );
            return i;
          },
          clearMap: function () {
            c.clear(), l.clear();
          },
        }),
        new d()
      );
    };
    e.default = u;
  },
  function (t, e) {
    t.exports = function () {
      return new Worker("/module/videoWorkerTrain.worker.js");
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = n(11),
      o = r(n(57)),
      a = r(n(155)),
      s = r(n(59)),
      u = r(n(88)),
      c = function (t) {
        var e = t.wsURL,
          n = t.rtspURL,
          r = null,
          c = t.isTalkService,
          l = t.realm,
          f = 6,
          h = null,
          d = null,
          p = 0,
          v = 0,
          g = 'Authorization: WSSE profile="UsernameToken"',
          m = -1 !== n.search("&srctype=raw"),
          y = new s.default(),
          b = t.RTSP_STATE,
          w = t.workerManager,
          S = new u.default(),
          T = !1,
          x = new Function(),
          E = 4e4,
          A = null,
          R = [],
          _ = 0,
          k = function () {},
          D = {},
          C = "UnAuthorized",
          M = null,
          I = {},
          B = null,
          O = null,
          P = null,
          F = null,
          U = !0,
          j = {},
          L = "",
          z = !1,
          N = 0,
          V = !1,
          q = { PLAY: 0, PAUSE: 1, KEEP_LIVE: 2, STOP: 3 },
          H = "";
        if (t.isRecord) {
          ["init", "sendSdpInfo", "parseRTPData", "setCallback"].forEach(
            function (t, e) {
              w[t] = function () {};
            }
          );
          var W = 1048576;
          S.postMessage({
            type: "init",
            options: {
              singleSize: 500 * W,
              nameOptions: { namedBy: "date", nameFormat: ["ymd_his"] },
              limitOptions: { limitBy: "count", count: 10 },
            },
          }),
            (S.onMessage = function (t) {
              switch (t.type) {
                case "pendding":
                  x(t);
                  break;
                case "download":
                  $(t.data.name, t.data.buffer);
                  break;
                case "closed":
                  x(t), (T = !1);
              }
            });
        }
        t.speed > 1 &&
          (["parseRTPData"].forEach(function (t, e) {
            w[t] = function () {};
          }),
          (W = 1048576),
          S.postMessage({
            type: "init",
            options: {
              singleSize: 500 * W,
              nameOptions: { namedBy: "date", nameFormat: ["ymd_his"] },
              limitOptions: { limitBy: "count", count: 10 },
            },
          }),
          (S.onMessage = function (t) {
            switch (t.type) {
              case "pendding":
                x(t);
                break;
              case "download":
                $(t.data.name, t.data.buffer);
                break;
              case "closed":
                x(t), (T = !1);
            }
          }));
        function G() {}
        function Y(t, r) {
          var s = "",
            u = "",
            f = (0, o.default)(j.username + ":" + l + ":" + j.password),
            h = e.split("://")[1].split("/")[0].split(":")[0] + ":8086";
          switch (t) {
            case 0:
              var d = (function () {
                  for (
                    var t = function () {
                        var t = window.crypto || window.msCrypto,
                          e = (256 * Math.random()) | 0;
                        return (
                          t &&
                            (e =
                              ((t.getRandomValues(new Uint32Array(1))[0] /
                                4294967296) *
                                256) |
                              0),
                          e
                        );
                      },
                      e = [],
                      n = 0;
                    n < 32;
                    n++
                  )
                    e.push(String.fromCharCode(t()));
                  return (0, o.default)(e.join(""));
                })(),
                p = (function () {
                  var t = new Date(),
                    e = t.getTimezoneOffset(),
                    n = t.getTime() + 60 * e * 1e3,
                    r = new Date(n),
                    i = r.getFullYear(),
                    o = r.getMonth() + 1,
                    a = r.getDate(),
                    s = r.getHours(),
                    u = r.getMinutes(),
                    c = r.getSeconds(),
                    l = function (t) {
                      return t < 10 ? "0" + t : t;
                    };
                  return (
                    i +
                    "-" +
                    l(o) +
                    "-" +
                    l(a) +
                    "T" +
                    l(s) +
                    ":" +
                    l(u) +
                    ":" +
                    l(c) +
                    "Z"
                  );
                })(),
                v = (function (t) {
                  for (
                    var e,
                      n,
                      r,
                      i,
                      o,
                      a,
                      s,
                      u =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                      c = "",
                      l = 0;
                    l < t.length;

                  )
                    (e = t[l++]),
                      (n = t[l++]),
                      (r = t[l++]),
                      (i = e >> 2),
                      (o = ((3 & e) << 4) | (n >> 4)),
                      (a = ((15 & n) << 2) | (r >> 6)),
                      (s = 63 & r),
                      isNaN(n) ? (a = s = 64) : isNaN(r) && (s = 64),
                      (c =
                        c +
                        u.charAt(i) +
                        u.charAt(o) +
                        u.charAt(a) +
                        u.charAt(s));
                  return c;
                })(
                  (function (t) {
                    var e,
                      n = t.trim(),
                      r =
                        "0x" === n.substr(0, 2).toLowerCase() ? n.substr(2) : n,
                      i = r.length;
                    if (i % 2 !== 0) return "";
                    for (var o = [], a = 0; a < i; a += 2)
                      (e = parseInt(r.substr(a, 2), 16)), o.push(e);
                    return o;
                  })((0, a.default)(d + p + f.toUpperCase()))
                );
              (s =
                "GET " + n + (z ? "?" : "&") + "method=" + t + " HTTP/1.1\r\n"),
                (s += "Accept-Sdp: Private\r\n"),
                (s += A + "\r\n"),
                (s +=
                  "Connection: keep-alive\r\nCseq: " +
                  _ +
                  H +
                  "\r\nHost: " +
                  h +
                  "\r\n"),
                r
                  ? (s += "Range: npt=" + r + "-\r\n")
                  : "ContinuePlay" !== C && (s += "Range: npt=0.000000-\r\n"),
                !0 === c &&
                  ((u += "v=0\r\n"),
                  (u += "o=- 2208989105 2208989105 IN IP4 0.0.0.0\r\n"),
                  (u += "s=Media Server\r\n"),
                  (u += "c=IN IP4 0.0.0.0\r\n"),
                  (u += "t=0 0\r\n"),
                  (u += "a=control:*\r\n"),
                  (u += "a=packetization-supported:DH\r\n"),
                  (u += "a=rtppayload-supported:DH\r\n"),
                  (u += "a=range:npt=now-\r\n"),
                  (u += "m=audio 0 RTP/AVP 8\r\n"),
                  (u += "a=control:trackID=5\r\n"),
                  (u += "a=rtpmap:8 PCMA/16000\r\n"),
                  (s +=
                    "Private-Length: " +
                    (u += "a=sendonly\r\n").length +
                    "\r\n"),
                  (s += "Private-Type: application/sdp\r\n")),
                (s +=
                  A === g
                    ? 'WSSE: UsernameToken Username="' +
                      j.username +
                      '", PasswordDigest="' +
                      v +
                      '", Nonce="' +
                      d +
                      '", Created="' +
                      p +
                      '"\r\n\r\n'
                    : "\r\n"),
                (s += u);
              break;
            case 1:
              (s = "GET " + n + "?method=" + t + " HTTP/1.1\r\n"),
                (s +=
                  "Connection: keep-alive\r\nCseq: " +
                  _ +
                  H +
                  "\r\nHost: " +
                  h +
                  "\r\n\r\n");
              break;
            case 2:
            case 3:
              (s =
                "GET " + n + (z ? "?" : "&") + "method=" + t + " HTTP/1.1\r\n"),
                (s +=
                  "Connection: keep-alive\r\nCseq: " +
                  _ +
                  H +
                  "\r\nHost: " +
                  h +
                  "\r\n\r\n");
          }
          return i.debug.log(s), s;
        }
        function X(t) {
          i.debug.log(t);
          var e,
            r = t.search("Cseq: ") + 5;
          if (
            ((_ = parseInt(t.slice(r, r + 10)) + 1),
            isNaN(_) && (_ = 1),
            (e = (function (t) {
              var e = {},
                n = 0,
                r = 0,
                i = null,
                o = null;
              if (-1 !== t.search("Private-Type: application/sdp")) {
                var a = t.split("\r\n\r\n");
                o = a[0];
              } else o = t;
              var s = o.split("\r\n"),
                u = s[0].split(" ");
              if (
                (u.length > 2 &&
                  ((e.ResponseCode = parseInt(u[1])),
                  (e.ResponseMessage = u[2])),
                e.ResponseCode === b.OK)
              ) {
                for (n = 1; n < s.length; n++)
                  if ("Cseq" === (i = s[n].split(":"))[0])
                    e.Cseq = parseInt(i[1]);
                  else if ("Private-Type" === i[0])
                    (e.ContentType = i[1]),
                      -1 !== e.ContentType.search("application/sdp") &&
                        (e.SDPData = J(t));
                  else if ("Private-Length" === i[0])
                    e.ContentLength = parseInt(i[1]);
                  else if ("Session-Id" === i[0]) {
                    var c = i[1].split(";");
                    e.SessionID = parseInt(c[0]);
                  }
              } else if (e.ResponseCode === b.UNAUTHORIZED)
                for (n = 1; n < s.length; n++)
                  if ("Cseq" === (i = s[n].split(":"))[0])
                    e.Cseq = parseInt(i[1]);
                  else if ("WWW-Authenticate" === i[0]) {
                    var l = i[1].split(",");
                    for (r = 0; r < l.length; r++) {
                      var f = l[r].search("Digest realm=");
                      if (-1 !== f) {
                        var h = l[r].substr(f + 13).split('"');
                        e.Realm = h[1];
                      }
                      if (-1 !== (f = l[r].search("nonce="))) {
                        var d = l[r].substr(f + 6).split('"');
                        e.Nonce = d[1];
                      }
                    }
                  }
              return e;
            })(t)).ResponseCode === b.UNAUTHORIZED && A === g)
          )
            !(function (t) {
              var e = j.username,
                r = j.password,
                o = { Method: null, Realm: null, Nonce: null, Uri: null },
                a = null;
              (o = { Method: "GET", Realm: t.Realm, Nonce: t.Nonce, Uri: n }),
                (a = (0, i.formAuthorizationResponse)(
                  e,
                  r,
                  o.Uri,
                  o.Realm,
                  o.Nonce,
                  o.Method
                )),
                (A =
                  'Authorization: Digest username="' +
                  e +
                  '", realm="' +
                  o.Realm +
                  '",'),
                (A +=
                  ' nonce="' +
                  o.Nonce +
                  '", uri="' +
                  o.Uri +
                  '", response="' +
                  a +
                  '"'),
                Q(Y(q.PLAY, N));
            })(e);
          else if (e.ResponseCode === b.OK)
            if ("UnAuthorized" === C) {
              if ((D = J(t)).Sessions.RecordRange) {
                var o = parseInt(D.Sessions.RecordRange);
                P(o);
              }
              var a = 0;
              for (a = 0; a < D.Sessions.length; a += 1) {
                var s = {};
                "JPEG" === D.Sessions[a].CodecMime ||
                "H264" === D.Sessions[a].CodecMime ||
                "H265" === D.Sessions[a].CodecMime ||
                "H264-SVC" == D.Sessions[a].CodecMime ||
                "RAW" == D.Sessions[a].CodecMime
                  ? ((s.codecName = D.Sessions[a].CodecMime),
                    "H264-SVC" === D.Sessions[a].CodecMime &&
                      (s.codecName = "H264"),
                    ("H265" !== D.Sessions[a].CodecMime &&
                      "RAW" !== D.Sessions[a].CodecMime) ||
                      G.prototype.setLiveMode("canvas"),
                    (s.trackID = D.Sessions[a].ControlURL),
                    (s.ClockFreq = D.Sessions[a].ClockFreq),
                    (s.Port = parseInt(D.Sessions[a].Port)),
                    "undefined" !== typeof D.Sessions[a].Framerate &&
                      ((s.Framerate = parseInt(D.Sessions[a].Framerate)),
                      w.setFPS(s.Framerate),
                      B(s.Framerate)),
                    R.push(s))
                  : "PCMU" === D.Sessions[a].CodecMime ||
                    -1 !== D.Sessions[a].CodecMime.search("G726-16") ||
                    -1 !== D.Sessions[a].CodecMime.search("G726-24") ||
                    -1 !== D.Sessions[a].CodecMime.search("G726-32") ||
                    -1 !== D.Sessions[a].CodecMime.search("G726-40") ||
                    "PCMA" === D.Sessions[a].CodecMime ||
                    -1 !== D.Sessions[a].CodecMime.search("L16")
                  ? ("PCMU" === D.Sessions[a].CodecMime
                      ? (s.codecName = "G.711Mu")
                      : "G726-16" === D.Sessions[a].CodecMime
                      ? (s.codecName = "G.726-16")
                      : "G726-24" === D.Sessions[a].CodecMime
                      ? (s.codecName = "G.726-24")
                      : "G726-32" === D.Sessions[a].CodecMime
                      ? (s.codecName = "G.726-32")
                      : "G726-40" === D.Sessions[a].CodecMime
                      ? (s.codecName = "G.726-40")
                      : "PCMA" === D.Sessions[a].CodecMime
                      ? (s.codecName = "G.711A")
                      : "L16" === D.Sessions[a].CodecMime &&
                        (s.codecName = "PCM"),
                    (s.trackID = D.Sessions[a].ControlURL),
                    (s.ClockFreq = D.Sessions[a].ClockFreq),
                    (s.Port = parseInt(D.Sessions[a].Port)),
                    (s.Bitrate = parseInt(D.Sessions[a].Bitrate)),
                    (s.TalkTransType = D.Sessions[a].TalkTransType),
                    R.push(s))
                  : "mpeg4-generic" === D.Sessions[a].CodecMime ||
                    "MPEG4-GENERIC" === D.Sessions[a].CodecMime
                  ? ((s.codecName = "mpeg4-generic"),
                    (s.trackID = D.Sessions[a].ControlURL),
                    (s.ClockFreq = D.Sessions[a].ClockFreq),
                    (s.Port = parseInt(D.Sessions[a].Port)),
                    (s.Bitrate = parseInt(D.Sessions[a].Bitrate)),
                    (s.TalkTransType = D.Sessions[a].TalkTransType),
                    R.push(s))
                  : "vnd.onvif.metadata" === D.Sessions[a].CodecMime
                  ? ((s.codecName = "MetaData"),
                    (s.trackID = D.Sessions[a].ControlURL),
                    (s.ClockFreq = D.Sessions[a].ClockFreq),
                    (s.Port = parseInt(D.Sessions[a].Port)),
                    R.push(s))
                  : "stream-assist-frame" === D.Sessions[a].CodecMime
                  ? ((s.codecName = "stream-assist-frame"),
                    (s.trackID = D.Sessions[a].ControlURL),
                    (s.ClockFreq = D.Sessions[a].ClockFreq),
                    (s.Port = parseInt(D.Sessions[a].Port)),
                    R.push(s))
                  : ("audio" === D.Sessions[a].Type && k({ errorCode: 201 }),
                    i.debug.log(
                      "Unknown codec type:",
                      D.Sessions[a].CodecMime,
                      D.Sessions[a].ControlURL
                    ));
              }
              if (!1 === c)
                return void k({
                  errorCode: 404,
                  description: "rtsp not found",
                });
              for (var u = 0; u < R.length; u++)
                R[u].RtpInterlevedID = 2 * (R[u].trackID.split("=")[1] - 0);
              !m && w.sendSdpInfo(R, I),
                !0 === c && w.setCallback("audioTalk", Z),
                clearInterval(M),
                (M = setInterval(function () {
                  return Q(Y(q.KEEP_LIVE, null));
                }, E)),
                (C = "Playing");
            } else
              "ContinuePlay" === C
                ? (C = "Playing")
                : "Playing" === C || i.debug.log("unknown rtsp state:" + C);
          else {
            if (e.ResponseCode === b.NOTSERVICE)
              return !0 === c
                ? void k({
                    errorCode: 504,
                    description: "Talk Service Unavilable",
                    place: "RtspClient.js",
                  })
                : void k({ errorCode: 503, description: "Service Unavilable" });
            if (e.ResponseCode === b.NOTFOUND)
              return void k({ errorCode: 404, description: "rtsp not found" });
            if (e.ResponseCode === b.INTERNALSERVERERROR)
              return void k({
                errorCode: 500,
                description: "Internal Server Error",
              });
          }
        }
        function Q(t) {
          void 0 != t &&
            null != t &&
            "" != t &&
            (r && r.readyState === WebSocket.OPEN
              ? void 0 != t && r.send((0, i.stringToUint8Array)(t))
              : i.debug.log("ws\u672a\u8fde\u63a5"));
        }
        function Z(t) {
          !0 === c &&
            (function (t) {
              null !== r && r.readyState === WebSocket.OPEN
                ? r.send(t)
                : i.debug.log("SendRtpData - Websocket does not exist");
            })(t);
        }
        function K(t) {
          var e = new Uint8Array(),
            n = new Uint8Array(t.data);
          for ((e = new Uint8Array(n.length)).set(n, 0), p = e.length; p > 0; )
            if (36 !== e[0]) {
              var i = String.fromCharCode.apply(null, e),
                o = null;
              if (
                (-1 !== i.indexOf("OffLine:File Over") &&
                  ((r.fileOver = !0), w.postRtspOver()),
                -1 !== i.indexOf("OffLine: KmsUnavailable"))
              )
                return void k({ errorCode: 203 });
              if (-1 !== i.indexOf("OffLine: CheckChannelAuthFailed"))
                return void k({ errorCode: 204 });
              if (-1 !== i.indexOf("OffLine: PasswdUnitFailed"))
                return void k({ errorCode: 205 });
              if (-1 !== i.indexOf("OffLine: OverFlowMaxConnect"))
                return void k({ errorCode: 206 });
              if (-1 !== i.indexOf("OffLine: StreamSourceStartFailed"))
                return void k({ errorCode: 404 });
              !1 === V && -1 !== i.indexOf("200 OK")
                ? ((o = i.lastIndexOf("\r\n")), (V = !0))
                : (o = i.search("\r\n\r\n"));
              var a = i.search("HTTP");
              if (-1 === a) return void (e = new Uint8Array());
              if (-1 === o) return void (p = e.length);
              (h = e.subarray(a, o + f)),
                (e = e.subarray(o + f)),
                X(String.fromCharCode.apply(null, h)),
                (p = e.length);
            } else {
              if ("RAW" === R[0].codecName)
                return void (/.aac/.test(rtspUrl)
                  ? w.sendBufferToAudioWorker(e.subarray(f, e.length))
                  : y.setMovieData(e.subarray(f, e.length)));
              if (
                (!0 === U && O && O(),
                (U = !1),
                (d = e.subarray(0, f)),
                !(
                  (v = (d[2] << 24) | (d[3] << 16) | (d[4] << 8) | d[5]) + f <=
                  e.length
                ))
              )
                return void (p = e.length);
              var s = e.subarray(f, v + f),
                u =
                  ((s[19] << 24) + (s[18] << 16) + (s[17] << 8) + s[16]) >>> 0,
                c =
                  Date.UTC(
                    "20" + (u >>> 26),
                    ((u >>> 22) & 15) - 1,
                    (u >>> 17) & 31,
                    (u >>> 12) & 31,
                    (u >>> 6) & 63,
                    63 & u
                  ) / 1e3;
              (c += (new Date().getTimezoneOffset() / 60) * 3600),
                F && F({ timestamp: c }),
                T && S.postMessage({ type: "addBuffer", buffer: s }),
                w.parseRTPData(d, s),
                (e = e.subarray(v + f)),
                (p = e.length);
            }
        }
        function J(t) {
          var e = { Sessions: [] },
            n = (
              -1 !== t.search("Private-Type: application/sdp")
                ? t.split("\r\n\r\n")[1]
                : t
            ).split("\r\n"),
            r = 0,
            i = !1;
          for (r = 0; r < n.length; r++) {
            var o = n[r].split("=");
            if (o.length > 0)
              switch (o[0]) {
                case "a":
                  var a = o[1].split(":");
                  if (a.length > 1) {
                    if ("control" === a[0]) {
                      var s = n[r].search("control:");
                      !0 === i
                        ? -1 !== s &&
                          (e.Sessions[e.Sessions.length - 1].ControlURL = n[
                            r
                          ].substr(s + 8))
                        : -1 !== s && (e.BaseURL = n[r].substr(s + 8));
                    } else if ("rtpmap" === a[0]) {
                      var u = a[1].split(" ");
                      e.Sessions[e.Sessions.length - 1].PayloadType = u[0];
                      var l = u[1].split("/");
                      (e.Sessions[e.Sessions.length - 1].CodecMime = l[0]),
                        l.length > 1 &&
                          (e.Sessions[e.Sessions.length - 1].ClockFreq = l[1]);
                    } else if ("framesize" === a[0]) {
                      var f = a[1].split(" ");
                      if (f.length > 1) {
                        var h = f[1].split("-");
                        (e.Sessions[e.Sessions.length - 1].Width = h[0]),
                          (e.Sessions[e.Sessions.length - 1].Height = h[1]);
                      }
                    } else if ("framerate" === a[0])
                      e.Sessions[e.Sessions.length - 1].Framerate = a[1];
                    else if ("fmtp" === a[0]) {
                      var d = n[r].split(" ");
                      if (d.length < 2) continue;
                      for (var p = 1; p < d.length; p++) {
                        var v = d[p].split(";"),
                          g = 0;
                        for (g = 0; g < v.length; g++) {
                          var m = v[g].search("mode=");
                          if (
                            (-1 !== m &&
                              (e.Sessions[e.Sessions.length - 1].mode = v[
                                g
                              ].substr(m + 5)),
                            -1 !== (m = v[g].search("config=")) &&
                              ((e.Sessions[e.Sessions.length - 1].config = v[
                                g
                              ].substr(m + 7)),
                              (I.config =
                                e.Sessions[e.Sessions.length - 1].config),
                              (I.clockFreq =
                                e.Sessions[e.Sessions.length - 1].ClockFreq),
                              (I.bitrate =
                                e.Sessions[e.Sessions.length - 1].Bitrate)),
                            -1 !== (m = v[g].search("sprop-vps=")) &&
                              (e.Sessions[e.Sessions.length - 1].VPS = v[
                                g
                              ].substr(m + 10)),
                            -1 !== (m = v[g].search("sprop-sps=")) &&
                              (e.Sessions[e.Sessions.length - 1].SPS = v[
                                g
                              ].substr(m + 10)),
                            -1 !== (m = v[g].search("sprop-pps=")) &&
                              (e.Sessions[e.Sessions.length - 1].PPS = v[
                                g
                              ].substr(m + 10)),
                            -1 !== (m = v[g].search("sprop-parameter-sets=")))
                          ) {
                            var y = v[g].substr(m + 21).split(",");
                            y.length > 1 &&
                              ((e.Sessions[e.Sessions.length - 1].SPS = y[0]),
                              (e.Sessions[e.Sessions.length - 1].PPS = y[1]));
                          }
                        }
                      }
                    } else if ("range" === a[0] && o[2]) {
                      var b = o[2].split("-")[1];
                      e.Sessions && b && (e.Sessions.RecordRange = b);
                    }
                  } else
                    1 === a.length &&
                      ("recvonly" === a[0]
                        ? (e.Sessions[e.Sessions.length - 1].TalkTransType =
                            "recvonly")
                        : "sendonly" === a[0] &&
                          (e.Sessions[e.Sessions.length - 1].TalkTransType =
                            "sendonly"));
                  break;
                case "m":
                  var w = o[1].split(" "),
                    S = {};
                  (S.Type = w[0]),
                    (S.Port = w[1]),
                    (S.Payload = w[3]),
                    e.Sessions.push(S),
                    (i = !0);
                  break;
                case "b":
                  if (!0 === i) {
                    var T = o[1].split(":");
                    e.Sessions[e.Sessions.length - 1].Bitrate = T[1];
                  }
              }
          }
          if (!0 === c)
            for (var x = 0; x < e.Sessions.length; x += 1)
              ("1" !== e.Sessions[x].ControlURL.split("=")[1] &&
                "2" !== e.Sessions[x].ControlURL.split("=")[1]) ||
                e.Sessions.splice(x, 1);
          return e;
        }
        function $(t, e) {
          t = (t = (t || Date.now()) + "").toLowerCase().split(".dav")[0];
          var n = new Blob([e]),
            r = document.createElement("a");
          (r.href = URL.createObjectURL(n)),
            (r.download = t + ".dav"),
            r.click(),
            setTimeout(function () {
              URL.revokeObjectURL(r.href), (r = null);
            }, 100),
            (e = null);
        }
        return (
          (G.prototype = {
            setExtraError: function (t) {
              t && (H = "\r\nExtraError: support");
            },
            connect: function () {
              r ||
                (((r = new WebSocket(e)).binaryType = "arraybuffer"),
                (r.fileOver = !1),
                r.addEventListener("message", K, !1),
                (r.onopen = function () {
                  (A = g), Q(Y(q.PLAY, N));
                }),
                (r.onerror = function (t) {
                  k({ errorCode: 202, description: "Open WebSocket Error" });
                }),
                (r.onclose = function (t) {
                  r &&
                    !r.fileOver &&
                    k({ errorCode: 202, description: "Open WebSocket Error" });
                }));
            },
            disconnect: function () {
              Q(Y(q.STOP, null)),
                clearInterval(M),
                (M = null),
                r && ((r.onerror = null), r.close(), (r = null)),
                w.terminate();
            },
            controlPlayer: function (t) {
              var e = "",
                n = null;
              switch (((L = t.command), t.command)) {
                case "PLAY":
                  if (
                    (w.play(),
                    "Pause" === C && (C = "ContinuePlay"),
                    null !== t.range && void 0 !== t.range)
                  ) {
                    e = Y(q.PLAY, t.range);
                    break;
                  }
                  (e = Y(q.PLAY, null)), L && w.initStartTime();
                  break;
                case "PAUSE":
                  if ("PAUSE" === C) break;
                  (C = "PAUSE"), (e = Y(q.PAUSE, null)), w.pause();
                  break;
                case "TEARDOWN":
                  e = Y(q.STOP, null);
                  break;
                case "audioPlay":
                  if ("start" === t.data)
                    (C = "Playing"), (e = Y("PLAY", t.range));
                  else if ("stop" === t.data) e = Y("TEARDOWN", null);
                  else {
                    if ("PAUSE" === C) break;
                    (C = "PAUSE"), (e = Y("PAUSE", null));
                  }
                  w.controlAudio(t.command, t.data);
                  break;
                case "volumn":
                case "audioSamplingRate":
                  w.controlAudio(t.command, t.data);
                  break;
                case "playNextFrame":
                  w.getVideoBufferQueueSize() < 5 && this.getNextFrameData(1e3),
                    w.playNextFrame();
                  break;
                case "getCurFrameInfo":
                  n = w.getCurFrameInfo();
                  break;
                case "getCapture":
                  w.getCapture();
                  break;
                case "startRecod":
                  (T = t.data) || S.postMessage({ type: "close" });
                  break;
                default:
                  i.debug.log("\u672a\u77e5\u6307\u4ee4: " + t.command);
              }
              if (("" != e && Q(e), n)) return n;
            },
            setLiveMode: function (t) {
              w.setLiveMode(t);
            },
            setPlayMode: function (t, e) {
              (z = t), (N = e), w.setPlayMode(t);
            },
            setSignalURL: function (t) {
              n = t;
            },
            setCallback: function (t, e) {
              "GetFrameRate" === t
                ? (B = e)
                : "GetFirstFrame" === t
                ? (O = e)
                : "recordChanged" === t
                ? (x = e)
                : "GetTotalTime" === t
                ? (P = e)
                : "UpdateTimeStamp" === t
                ? (F = e)
                : w.setCallback(t, e),
                "Error" == t && (k = e);
            },
            setUserInfo: function (t, e) {
              (j.username = t), (j.password = e);
            },
            getNextFrameData: function (t) {
              Q(Y("PLAY", null)),
                setTimeout(function () {
                  Q(Y("PAUSE", null));
                }, t);
            },
          }),
          (y.CodecCallback = function (t) {
            (I = t.AudioCodecInfo),
              (R[0].Framerate = t.Framerate),
              "H264" === I.VideoCodec && G.prototype.setLiveMode("video"),
              w.sendSdpInfo(R, I, t);
          }),
          (y.TrackCallback = function (t) {
            var e = new Uint8Array(t.subarray(6, t.length));
            w.parseRTPData(t.subarray(0, 6), e);
          }),
          new G()
        );
      };
    e.default = c;
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = 0;
    function i(t) {
      return a(o(s(t)));
    }
    function o(t) {
      return c(l(u(t), 8 * t.length));
    }
    function a(t) {
      for (
        var e, n = r ? "0123456789ABCDEF" : "0123456789abcdef", i = "", o = 0;
        o < t.length;
        o++
      )
        (e = t.charCodeAt(o)),
          (i += n.charAt((e >>> 4) & 15) + n.charAt(15 & e));
      return i;
    }
    function s(t) {
      for (var e, n, r = "", i = -1; ++i < t.length; )
        (e = t.charCodeAt(i)),
          (n = i + 1 < t.length ? t.charCodeAt(i + 1) : 0),
          55296 <= e &&
            e <= 56319 &&
            56320 <= n &&
            n <= 57343 &&
            ((e = 65536 + ((1023 & e) << 10) + (1023 & n)), i++),
          e <= 127
            ? (r += String.fromCharCode(e))
            : e <= 2047
            ? (r += String.fromCharCode(192 | ((e >>> 6) & 31), 128 | (63 & e)))
            : e <= 65535
            ? (r += String.fromCharCode(
                224 | ((e >>> 12) & 15),
                128 | ((e >>> 6) & 63),
                128 | (63 & e)
              ))
            : e <= 2097151 &&
              (r += String.fromCharCode(
                240 | ((e >>> 18) & 7),
                128 | ((e >>> 12) & 63),
                128 | ((e >>> 6) & 63),
                128 | (63 & e)
              ));
      return r;
    }
    function u(t) {
      for (var e = Array(t.length >> 2), n = 0; n < e.length; n++) e[n] = 0;
      for (n = 0; n < 8 * t.length; n += 8)
        e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << (24 - (n % 32));
      return e;
    }
    function c(t) {
      for (var e = "", n = 0; n < 32 * t.length; n += 8)
        e += String.fromCharCode((t[n >> 5] >>> (24 - (n % 32))) & 255);
      return e;
    }
    function l(t, e) {
      (t[e >> 5] |= 128 << (24 - (e % 32))),
        (t[15 + (((e + 64) >> 9) << 4)] = e);
      for (
        var n = Array(80),
          r = 1732584193,
          i = -271733879,
          o = -1732584194,
          a = 271733878,
          s = -1009589776,
          u = 0;
        u < t.length;
        u += 16
      ) {
        for (var c = r, l = i, v = o, g = a, m = s, y = 0; y < 80; y++) {
          n[y] =
            y < 16
              ? t[u + y]
              : p(n[y - 3] ^ n[y - 8] ^ n[y - 14] ^ n[y - 16], 1);
          var b = d(d(p(r, 5), f(y, i, o, a)), d(d(s, n[y]), h(y)));
          (s = a), (a = o), (o = p(i, 30)), (i = r), (r = b);
        }
        (r = d(r, c)),
          (i = d(i, l)),
          (o = d(o, v)),
          (a = d(a, g)),
          (s = d(s, m));
      }
      return Array(r, i, o, a, s);
    }
    function f(t, e, n, r) {
      return t < 20
        ? (e & n) | (~e & r)
        : t < 40
        ? e ^ n ^ r
        : t < 60
        ? (e & n) | (e & r) | (n & r)
        : e ^ n ^ r;
    }
    function h(t) {
      return t < 20
        ? 1518500249
        : t < 40
        ? 1859775393
        : t < 60
        ? -1894007588
        : -899497514;
    }
    function d(t, e) {
      var n = (65535 & t) + (65535 & e);
      return (((t >> 16) + (e >> 16) + (n >> 16)) << 16) | (65535 & n);
    }
    function p(t, e) {
      return (t << e) | (t >>> (32 - e));
    }
    var v = i;
    e.default = v;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = r(n(41)),
      o = r(n(1)),
      a = r(n(2)),
      s = {
        4000: 1,
        8000: 2,
        11025: 3,
        16000: 4,
        20000: 5,
        22050: 6,
        32000: 7,
        44100: 8,
        48000: 9,
        96000: 16,
        128000: 17,
        192000: 18,
        64000: 19,
      };
    function u(t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4,
        n = [];
      if (!0 === (arguments.length > 2 ? arguments[2] : void 0))
        for (var r = 0; r < e; r++) n[r] = (t >>> (8 * (e - 1 - r))) & 255;
      else for (var i = 0; i < e; i++) n[i] = (t >>> (8 * i)) & 255;
      return n;
    }
    var c = (function () {
      function t(e, n, r) {
        (0, o.default)(this, t),
          (this.RtpInterlevedID = e),
          (this.timestamp = 0),
          (this.currTime = null),
          (this.preTime = null),
          (this.VideoCodec = n),
          (this.AudioCodec = r),
          (this.MAXFRAMEINTERVAL = 65535),
          (this.rtpDataHeadExtLength = 12),
          (this.rtpDataHeadLength = 24 + this.rtpDataHeadExtLength),
          (this.rtpDataFootLength = 8),
          (this.rtpPacketHead = [36, e, 0, 0, 0, 0]),
          (this.DHAV = [68, 72, 65, 86]),
          (this.dhav = [100, 104, 97, 118]),
          (this.frameNum = 245);
      }
      return (
        (0, a.default)(t, [
          {
            key: "getRTPPacket",
            value: function () {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : new ArrayBuffer(0),
                e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                n = 0;
              (this.rtpDataHeadExtLength =
                8 +
                ("audio" === e.type
                  ? 4
                  : e.width > 2048 || e.height > 2048
                  ? 12
                  : 8)),
                (this.rtpDataHeadLength = 24 + this.rtpDataHeadExtLength);
              var r = new Uint8Array(
                this.rtpPacketHead.length +
                  this.rtpDataHeadLength +
                  t.byteLength +
                  this.rtpDataFootLength
              );
              r.set([36, this.RtpInterlevedID], n),
                (n += 2),
                r.set(
                  u(
                    this.rtpDataHeadLength +
                      t.byteLength +
                      this.rtpDataFootLength,
                    4,
                    !0
                  ),
                  n
                ),
                (n += 4),
                r.set(this.DHAV, n),
                (n += 4);
              var o = "audio" === e.type ? [240] : e.keyframe ? [253] : [252];
              r.set(o, n),
                (n += 1),
                r.set([0], n),
                (n += 1),
                r.set([1], n),
                (n += 1),
                r.set([0], n),
                (n += 1),
                this.frameNum > 65535 && (this.frameNum = 240),
                r.set(u(this.frameNum), n),
                (n += 4),
                this.frameNum++;
              var a = u(
                this.rtpDataHeadLength + t.byteLength + this.rtpDataFootLength
              );
              r.set(a, n), (n += 4);
              var c = new Date("2000-01-01 00:00:00").getTime();
              (this.timestamp = (1e3 * e.timestamp) / e.timescale),
                this.timestamp > this.MAXFRAMEINTERVAL &&
                  (this.timestamp = this.timestamp - this.MAXFRAMEINTERVAL),
                r.set(u(Math.floor((c + this.timestamp) / 1e3)), n),
                (n += 4),
                r.set(u(this.timestamp, 2), n),
                (n += 2),
                r.set([this.rtpDataHeadExtLength], n),
                (n += 1);
              var l = (function (t, e) {
                for (var n = 0, r = e; r < t.length; r++) n += t[r];
                return n;
              })(r, 6);
              r.set([l], n), (n += 1);
              var f = [];
              (f =
                "video" === e.type
                  ? e.width > 2048 || e.height > 2048
                    ? [130, 0, 0, 0].concat(
                        (0, i.default)(u(e.width, 2)),
                        (0, i.default)(u(e.height, 2))
                      )
                    : [128, 0, e.width / 8, e.height / 8]
                  : [131, 1, 26, s[e.timescale]]),
                r.set(f, n),
                (n += f.length),
                "video" === e.type &&
                  (r.set([129, 0, this.getHexByCodec(this.VideoCodec), 50], n),
                  (n += 4));
              var h = (function (t, e) {
                for (var n = 0, r = 0; r < e; r++) n += t[r] << ((r % 4) * 8);
                return n;
              })(t, t.byteLength);
              return (
                r.set([136], n),
                (n += 1),
                r.set(u(h), n),
                (n += 4),
                r.set([0, 0, 0], n),
                (n += 3),
                r.set(t, n),
                (n += t.byteLength),
                r.set(this.dhav, n),
                (n += 4),
                r.set(a, n),
                r
              );
            },
          },
          {
            key: "getHexByCodec",
            value: function (t) {
              var e = 8;
              switch (t) {
                case "H264":
                  e = 8;
                  break;
                case "H265":
                  e = 12;
              }
              return e;
            },
          },
        ]),
        t
      );
    })();
    e.default = c;
  },
  function (t, e, n) {
    "use strict";
    t.exports = n(158);
  },
  function (t, e, n) {
    "use strict";
    var r = n(33),
      i = n(34),
      o = n(22),
      a = n(21),
      s = n(35),
      u = n(16),
      c = n(17),
      l = n(36),
      f = n(161),
      h = n(162),
      d = n(165),
      p = n(60),
      v = n(86),
      g = n(175);
    t.exports = {
      Movie: r,
      Track: i,
      VideoTrack: o,
      AudioTrack: a,
      Sample: s,
      VideoSample: u,
      AudioSample: c,
      Fragment: l,
      FragmentList: f,
      FragmentReader: h,
      MovieParser: d,
      MP4Parser: p,
      FLVParser: v,
      HLSPacketizer: g,
    };
  },
  function (t, e) {
    function n(e, r) {
      return (
        (t.exports = n =
          Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports),
        n(e, r)
      );
    }
    (t.exports = n),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e) {
    (t.exports = function (t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return t;
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = n(36),
      s = (function () {
        function t() {
          (0, i.default)(this, t),
            (this.fragmentDuration = 0),
            (this.duration = 0),
            (this.timescale = 0),
            (this.video = null),
            (this.audio = null),
            (this.fragments = []);
        }
        return (
          (0, o.default)(t, [
            {
              key: "createFragment",
              value: function (t) {
                var e = { timestamp: t, duration: 0, samples: [] };
                return this.fragments.push(e), e;
              },
            },
            {
              key: "chop",
              value: function () {
                this.fragments.length > 0 &&
                  0 === this.fragments[this.fragments.length - 1].duration &&
                  this.fragments.splice(this.fragments.length - 2, 1);
              },
            },
            {
              key: "relativeDuration",
              value: function () {
                return this.timescale
                  ? this.duration / this.timescale
                  : this.duration || 0;
              },
            },
            {
              key: "size",
              value: function () {
                return [this.video, this.audio]
                  .filter(function (t) {
                    return null !== t;
                  })
                  .reduce(function (t, e) {
                    return t + e.size;
                  }, 0);
              },
            },
            {
              key: "count",
              value: function () {
                return this.fragments.length;
              },
            },
            {
              key: "get",
              value: function (t) {
                var e = this.fragments[t];
                if (e) {
                  var n = new a();
                  return (
                    (n.timestamp = e.timestamp),
                    (n.duration = e.duration),
                    (n.samples = e.samples),
                    (n.timescale = this.timescale),
                    this.video && (n.videoExtraData = this.video.extraData),
                    this.audio && (n.audioExtraData = this.audio.extraData),
                    n
                  );
                }
              },
            },
          ]),
          t
        );
      })();
    t.exports = s;
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
        i = r(n(1)),
        o = r(n(2)),
        a = n(23),
        s = (function () {
          function t() {
            (0, i.default)(this, t);
          }
          return (
            (0, o.default)(t, null, [
              {
                key: "readSamples",
                value: function (t, n) {
                  for (
                    var r = t.samples
                        .map(function (t, e) {
                          return {
                            index: e,
                            offset: t.offset,
                            size: t.size,
                            bufferIndex: 0,
                            bufferOffset: 0,
                          };
                        })
                        .sort(function (t, e) {
                          return t.offset - e.offset;
                        }),
                      i = [],
                      o = null,
                      s = 0,
                      u = r.length;
                    s < u;
                    s++
                  ) {
                    var c = r[s];
                    o && o.offset + o.size >= c.offset + c.size
                      ? ((c.bufferIndex = i.length - 1),
                        (c.bufferOffset = c.offset - o.offset))
                      : ((o = {
                          offset: c.offset,
                          size: 1048576,
                          buffer: e.allocUnsafe(1048576),
                        }),
                        i.push(o),
                        (c.bufferIndex = i.length - 1),
                        (c.bufferOffset = 0));
                  }
                  for (var l = a.create(n), f = 0, h = i.length; f < h; f++) {
                    var d = i[f];
                    l.read(d.buffer, d.offset);
                  }
                  return (
                    r.sort(function (t, e) {
                      return t.index - e.index;
                    }),
                    t.samples.map(function (t, e) {
                      var n = r[e];
                      return i[n.bufferIndex].buffer.slice(
                        n.bufferOffset,
                        n.bufferOffset + n.size
                      );
                    })
                  );
                },
              },
            ]),
            t
          );
        })();
      t.exports = s;
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
        i = r(n(1)),
        o = r(n(2)),
        a = r(n(5)),
        s = r(n(6)),
        u = r(n(4));
      function c(t) {
        var e = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = (0, u.default)(t);
          if (e) {
            var i = (0, u.default)(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (0, s.default)(this, n);
        };
      }
      var l = (function (t) {
        (0, a.default)(r, t);
        var n = c(r);
        function r(t) {
          var e;
          return (0, i.default)(this, r), ((e = n.call(this)).fd = t), e;
        }
        return (
          (0, o.default)(r, [
            {
              key: "size",
              value: function () {
                return this.fd.byteLength;
              },
            },
            {
              key: "read",
              value: function (t, e, n) {
                n = n || 0;
                var r = this.fd.slice(e, e + t.length - n);
                return this.toBuffer(r);
              },
            },
            {
              key: "toBuffer",
              value: function (t) {
                for (
                  var n = new e(t.byteLength), r = new Uint8Array(t), i = 0;
                  i < n.length;
                  ++i
                )
                  n[i] = r[i];
                return n;
              },
            },
          ]),
          r
        );
      })(n(37));
      t.exports = l;
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = (function (t) {
      (0, a.default)(n, t);
      var e = c(n);
      function n(t) {
        var r;
        return (0, i.default)(this, n), ((r = e.call(this)).buffer = t), r;
      }
      return (
        (0, o.default)(n, [
          {
            key: "size",
            value: function () {
              return this.buffer.length;
            },
          },
          {
            key: "read",
            value: function (t, e, n) {
              return (n = n || 0), this.buffer.copy(t, n, e, e + t.length - n);
            },
          },
        ]),
        n
      );
    })(n(37));
    t.exports = l;
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
        i = r(n(1)),
        o = r(n(2)),
        a = n(23),
        s = [n(60), n(86)],
        u = (function () {
          function t() {
            (0, i.default)(this, t);
          }
          return (
            (0, o.default)(t, null, [
              {
                key: "parse",
                value: function (t) {
                  a.create(t), e.allocUnsafe(8);
                  return s[0].parse(t);
                },
              },
            ]),
            t
          );
        })();
      t.exports = u;
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    var r = {
      "./atom-avc1": 61,
      "./atom-avc1.js": 61,
      "./atom-co64": 62,
      "./atom-co64.js": 62,
      "./atom-ctts": 63,
      "./atom-ctts.js": 63,
      "./atom-esds": 64,
      "./atom-esds.js": 64,
      "./atom-ftyp": 65,
      "./atom-ftyp.js": 65,
      "./atom-hdlr": 66,
      "./atom-hdlr.js": 66,
      "./atom-hev1": 67,
      "./atom-hev1.js": 67,
      "./atom-hvc1": 68,
      "./atom-hvc1.js": 68,
      "./atom-mdhd": 69,
      "./atom-mdhd.js": 69,
      "./atom-mdia": 70,
      "./atom-mdia.js": 70,
      "./atom-minf": 71,
      "./atom-minf.js": 71,
      "./atom-moov": 72,
      "./atom-moov.js": 72,
      "./atom-mp4a": 73,
      "./atom-mp4a.js": 73,
      "./atom-mvhd": 74,
      "./atom-mvhd.js": 74,
      "./atom-smhd": 75,
      "./atom-smhd.js": 75,
      "./atom-stbl": 76,
      "./atom-stbl.js": 76,
      "./atom-stco": 77,
      "./atom-stco.js": 77,
      "./atom-stsc": 78,
      "./atom-stsc.js": 78,
      "./atom-stsd": 79,
      "./atom-stsd.js": 79,
      "./atom-stss": 80,
      "./atom-stss.js": 80,
      "./atom-stsz": 81,
      "./atom-stsz.js": 81,
      "./atom-stts": 82,
      "./atom-stts.js": 82,
      "./atom-tkhd": 83,
      "./atom-tkhd.js": 83,
      "./atom-trak": 84,
      "./atom-trak.js": 84,
      "./atom-vmhd": 85,
      "./atom-vmhd.js": 85,
    };
    function i(t) {
      var e = o(t);
      return n(e);
    }
    function o(t) {
      if (!n.o(r, t)) {
        var e = new Error("Cannot find module '" + t + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      return r[t];
    }
    (i.keys = function () {
      return Object.keys(r);
    }),
      (i.resolve = o),
      (t.exports = i),
      (i.id = 166);
  },
  function (t, e, n) {
    var r = n(168);
    function i() {
      return (
        "undefined" !== typeof Reflect && Reflect.get
          ? ((t.exports = i = Reflect.get.bind()),
            (t.exports.__esModule = !0),
            (t.exports.default = t.exports))
          : ((t.exports = i =
              function (t, e, n) {
                var i = r(t, e);
                if (i) {
                  var o = Object.getOwnPropertyDescriptor(i, e);
                  return o.get
                    ? o.get.call(arguments.length < 3 ? t : n)
                    : o.value;
                }
              }),
            (t.exports.__esModule = !0),
            (t.exports.default = t.exports)),
        i.apply(this, arguments)
      );
    }
    (t.exports = i),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    var r = n(4);
    (t.exports = function (t, e) {
      for (
        ;
        !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = r(t));

      );
      return t;
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
        i = r(n(1)),
        o = r(n(2));
      function a(t, e) {
        var n;
        if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (!t) return;
              if ("string" === typeof t) return s(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return s(t, e);
            })(t)) ||
            (e && t && "number" === typeof t.length)
          ) {
            n && (t = n);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          a = !0,
          u = !1;
        return {
          s: function () {
            n = t[Symbol.iterator]();
          },
          n: function () {
            var t = n.next();
            return (a = t.done), t;
          },
          e: function (t) {
            (u = !0), (o = t);
          },
          f: function () {
            try {
              a || null == n.return || n.return();
            } finally {
              if (u) throw o;
            }
          },
        };
      }
      function s(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      var u = n(8),
        c = n(33),
        l = n(21),
        f = n(22),
        h = n(17),
        d = n(16),
        p = n(23),
        v = n(39),
        g = n(18),
        m = (function () {
          function t(e) {
            (0, i.default)(this, t),
              (this.source = e),
              (this.isFullMoov = !1),
              (this.reader = p.create(this.source));
          }
          return (
            (0, o.default)(
              t,
              [
                {
                  key: "parse",
                  value: function () {
                    if ((this._findMoovAtom(), this.isFullMoov)) {
                      this._createMovie();
                      var t,
                        e = a(this.moovAtom.getAtoms(u.ATOM_TRAK));
                      try {
                        for (e.s(); !(t = e.n()).done; ) {
                          var n = t.value;
                          this._createTrack(n);
                        }
                      } catch (t) {
                        e.e(t);
                      } finally {
                        e.f();
                      }
                      this.movie.tracks.forEach(function (t) {
                        t.sortSamples(), t.ensureDuration();
                      }),
                        this.movie.ensureDuration();
                    }
                    return this.movie;
                  },
                },
                {
                  key: "_findMoovAtom",
                  value: function () {
                    this.moovAtom = null;
                    for (
                      var t = 0, n = this.reader.size(), r = e.allocUnsafe(8);
                      t < n;

                    ) {
                      var i = 8,
                        o = (r = this.reader.read(r, t)).readUInt32BE(0),
                        a = r.toString("ascii", 4);
                      if (
                        (0 === o
                          ? (o = n - t)
                          : 1 === o &&
                            ((r = this.reader.read(r, t + r.length)),
                            (o = g.readUInt64BE(r, 0)),
                            (i += 8)),
                        u.ATOM_MOOV === a)
                      ) {
                        var s = e.allocUnsafe(o - i);
                        if (
                          (s = this.reader.read(s, t + i)).byteLength ===
                          s.length
                        ) {
                          try {
                            (this.moovAtom = u.createAtom(a)),
                              this.moovAtom.parse(s),
                              (this.isFullMoov = !0);
                          } catch (t) {}
                          break;
                        }
                      } else t += o;
                    }
                    this.moovAtom;
                  },
                },
                {
                  key: "_createMovie",
                  value: function () {
                    this.movie = new c();
                    var t = this.moovAtom.getAtom(u.ATOM_MVHD);
                    t &&
                      ((this.movie.timescale = t.timescale),
                      (this.movie.duration = t.duration));
                  },
                },
                {
                  key: "_createTrack",
                  value: function (e) {
                    var n = e.getAtom(u.ATOM_MDIA);
                    if (null !== n) {
                      var r = n.getAtom(u.ATOM_HDLR),
                        i = n.getAtom(u.ATOM_MDHD),
                        o = n.getAtom(u.ATOM_MINF);
                      if (null !== r && null !== i && null !== o) {
                        var a = o.getAtom(u.ATOM_STBL);
                        if (null !== a) {
                          var s = a.getAtom(u.ATOM_STSD),
                            c = null,
                            p = null;
                          if (u.TRACK_TYPE_AUDIO === r.handlerType) {
                            var g = s.getAudioAtom();
                            null !== g &&
                              ((c = new l()),
                              (p = h.prototype),
                              (c.channels = g.channels),
                              (c.sampleRate = g.sampleRate),
                              (c.sampleSize = g.sampleSize),
                              (c.extraData = g.extraData));
                          } else if (u.TRACK_TYPE_VIDEO === r.handlerType) {
                            var m = s.getVideoAtom();
                            null !== m &&
                              ((c = new f()),
                              (p = d.prototype),
                              (c.width = m.width),
                              (c.height = m.height),
                              (c.extraData = m.extraData));
                          }
                          if (null !== c) {
                            (c.duration = i.duration),
                              (c.timescale = i.timescale);
                            var y = v.parse(c.extraData);
                            null !== y && (c.codec = y.codec());
                            var b = t._getEntries(a, u.ATOM_CTTS),
                              w = t._getEntries(a, u.ATOM_STSZ),
                              S = t._getEntries(a, u.ATOM_STSC),
                              T = t._getEntries(a, u.ATOM_STSS),
                              x = t._getEntries(a, u.ATOM_STTS),
                              E = t._getEntries(a, u.ATOM_STCO);
                            0 === E.length &&
                              (E = t._getEntries(a, u.ATOM_CO64));
                            var A = 0,
                              R = 0,
                              _ = 0,
                              k = 0,
                              D = 0,
                              C = 0,
                              M = 0,
                              I = 0,
                              B = 0,
                              O = 0;
                            S.length > 0 && ((D = S[0]), (O = S[1]));
                            for (
                              var P = new Array(w.length),
                                F = 0,
                                U = 0,
                                j = x.length;
                              U < j;
                              U += 2
                            )
                              for (
                                var L = x[U + 1] || 0, z = 0;
                                z < x[U];
                                z++
                              ) {
                                var N = Object.create(p);
                                if (
                                  ((N.timestamp = A),
                                  (N.timescale = c.timescale),
                                  (N.size = w[I]),
                                  (N.offset = E[R] + _),
                                  c instanceof f)
                                ) {
                                  (N.width = c.width),
                                    (N.height = c.height),
                                    (N.type = "video");
                                  var V = 0;
                                  2 * C + 1 < b.length &&
                                    ((V = b[2 * C + 1] || 0),
                                    ++M >= b[2 * C] && (C++, (M = 0))),
                                    (N.compositionOffset = V),
                                    B < T.length && T[B] === I + 1
                                      ? ((N.keyframe = !0), B++)
                                      : (N.keyframe = !1);
                                } else N.type = "audio";
                                N.size > 0 && (P[F++] = N),
                                  ++k < O
                                    ? (_ += w[I])
                                    : ((k = 0),
                                      (_ = 0),
                                      R++,
                                      3 * D + 1 < S.length &&
                                        R + 1 >= S[3 * D] &&
                                        ((O = S[3 * D + 1]), D++)),
                                  (A += L),
                                  I++;
                              }
                            F < P.length
                              ? (c.samples = P.slice(0, F))
                              : (c.samples = P),
                              c.extraData &&
                                c.samples.length > 0 &&
                                this.movie.addTrack(c);
                          }
                        }
                      }
                    }
                  },
                },
              ],
              [
                {
                  key: "_getEntries",
                  value: function (t, e) {
                    var n = [],
                      r = t.getAtom(e);
                    return null !== r && (n = r.entries), n;
                  },
                },
              ]
            ),
            t
          );
        })();
      t.exports = m;
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(40),
      f = n(24),
      h = [
        96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025,
        8e3, 7350,
      ],
      d = [0, 1, 2, 3, 4, 5, 6, 8],
      p = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n(t) {
          var r;
          return (
            (0, i.default)(this, n),
            ((r = e.call(this)).extraData = t),
            (r.rateIndex = null),
            (r.sampleRate = null),
            (r.channelsIndex = null),
            (r.channels = null),
            (r.profileObjectType = null),
            r
          );
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.CODEC_AAC;
              },
            },
            {
              key: "parse",
              value: function () {
                var t = this.extraData[0],
                  e = this.extraData[1];
                (this.profileObjectType = (248 & t) >> 3),
                  (this.rateIndex = ((7 & t) << 1) + (((128 & e) >> 7) & 1)),
                  (this.sampleRate = h[this.rateIndex] || null),
                  (this.channelsIndex = (127 & e) >> 3),
                  (this.channels = d[this.channelsIndex] || null);
              },
            },
            {
              key: "codec",
              value: function () {
                return "mp4a.40.".concat(this.profileObjectType);
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = p;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(40),
      f = n(24);
    var h = (function (t) {
      (0, a.default)(n, t);
      var e = c(n);
      function n(t) {
        var r;
        return (
          (0, i.default)(this, n),
          ((r = e.call(this)).extraData = t),
          (r._units = []),
          (r._pos = 0),
          r
        );
      }
      return (
        (0, o.default)(n, [
          {
            key: "type",
            value: function () {
              return f.CODEC_H264;
            },
          },
          {
            key: "parse",
            value: function () {
              this._pos = 5;
              for (var t = 31 & this.extraData[this._pos++], e = 0; e < t; e++)
                this._units.push(this._readNalUnit());
              for (var n = this.extraData[this._pos++], r = 0; r < n; r++)
                this._units.push(this._readNalUnit());
            },
          },
          {
            key: "units",
            value: function () {
              return this._units;
            },
          },
          {
            key: "codec",
            value: function () {
              for (var t, e, n = "", r = 1; r < 4; r++)
                n +=
                  ((t = this.extraData[r].toString(16)),
                  (e = 2),
                  "0".repeat(Math.max(0, e - t.length)) + t);
              return "avc1.".concat(n);
            },
          },
          {
            key: "_readNalUnit",
            value: function () {
              var t = this.extraData.readUInt16BE(this._pos);
              this._pos += 2;
              var e = this.extraData.slice(this._pos, this._pos + t);
              return (this._pos += t), e;
            },
          },
        ]),
        n
      );
    })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = r(n(5)),
      s = r(n(6)),
      u = r(n(4));
    function c(t) {
      var e = (function () {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = (0, u.default)(t);
        if (e) {
          var i = (0, u.default)(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return (0, s.default)(this, n);
      };
    }
    var l = n(40),
      f = n(24),
      h = (function (t) {
        (0, a.default)(n, t);
        var e = c(n);
        function n(t) {
          var r;
          return (
            (0, i.default)(this, n),
            ((r = e.call(this)).extraData = t),
            (r._units = []),
            (r._pos = 0),
            r
          );
        }
        return (
          (0, o.default)(n, [
            {
              key: "type",
              value: function () {
                return f.CODEC_H265;
              },
            },
            {
              key: "parse",
              value: function () {
                this._pos = 22;
                for (var t = this.extraData[this._pos++], e = 0; e < t; e++) {
                  var n = 63 & this.extraData[this._pos++],
                    r = this.extraData.readUInt16BE(this._pos);
                  this._pos += 2;
                  for (var i = 0; i < r; i++) {
                    var o = this._readNalUnit();
                    (32 !== n && 33 !== n && 34 !== n) || this._units.push(o);
                  }
                }
              },
            },
            {
              key: "units",
              value: function () {
                return this._units;
              },
            },
            {
              key: "codec",
              value: function () {
                for (
                  var t = this.extraData[1],
                    e = 1 === ((t >> 5) & 1),
                    n = this.extraData
                      .readUInt32LE(2)
                      .toString(16)
                      .replace(/0+$/, ""),
                    r = this.extraData[12],
                    i = [],
                    o = 6;
                  o < 12;
                  o++
                )
                  i.push(this.extraData[o]);
                for (var a = 0, s = i.length - 1; s > 0; s--)
                  if (i[s] > 0) {
                    a = s;
                    break;
                  }
                for (
                  var u = [
                      "hvc1",
                      (t >> 6) + (31 & t),
                      n,
                      "".concat(e ? "H" : "L").concat(r),
                    ],
                    c = 0;
                  c <= a;
                  c++
                )
                  u.push(i[c].toString(16).replace(/0+$/, ""));
                return u.join(".");
              },
            },
            {
              key: "_readNalUnit",
              value: function () {
                var t = this.extraData.readUInt16BE(this._pos);
                this._pos += 2;
                var e = this.extraData.slice(this._pos, this._pos + t);
                return (this._pos += t), e;
              },
            },
          ]),
          n
        );
      })(l);
    t.exports = h;
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r = n(0),
        i = r(n(1)),
        o = r(n(2)),
        a = n(174),
        s = n(87),
        u = n(33),
        c = n(21),
        l = n(22),
        f = n(17),
        h = n(16),
        d = n(23),
        p = n(39),
        v = (function () {
          function t(e) {
            (0, i.default)(this, t),
              (this.source = e),
              (this.reader = d.create(this.source));
          }
          return (
            (0, o.default)(t, [
              {
                key: "parse",
                value: function () {
                  var t = this;
                  return (
                    this._parseHeader(),
                    this._createMovie(),
                    this._parseBody(),
                    [this.videoTrack, this.audioTrack].forEach(function (e) {
                      e.extraData &&
                        e.samples.length > 0 &&
                        (e.sortSamples(),
                        e.ensureDuration(),
                        t.movie.addTrack(e));
                    }),
                    this.movie.ensureDuration(),
                    this.movie
                  );
                },
              },
              {
                key: "_parseHeader",
                value: function () {
                  var t = e.allocUnsafe(s.HEADER_SIZE);
                  if (
                    (this.reader.read(t, 0),
                    t.toString("ascii", 0, 3) !== s.HEADER_PREFIX ||
                      t[3] !== s.HEADER_VERSION)
                  )
                    throw new Error("FLV header not found");
                  this.pos = t[8];
                },
              },
              {
                key: "_createMovie",
                value: function () {
                  (this.movie = new u()),
                    (this.movie.timescale = s.MOVIE_TIMESCALE),
                    (this.videoTrack = new l()),
                    (this.videoTrack.timescale = s.MOVIE_TIMESCALE),
                    (this.audioTrack = new c()),
                    (this.audioTrack.timescale = s.MOVIE_TIMESCALE);
                },
              },
              {
                key: "_parseBody",
                value: function () {
                  for (
                    var t = e.allocUnsafe(15), n = this.reader.size();
                    this.pos < n;

                  ) {
                    this.pos += this.reader.read(t, this.pos);
                    var r = t[4];
                    if (void 0 === r) break;
                    var i = t.readUIntBE(5, 3),
                      o = (t[11] << 24) + t.readUIntBE(8, 3);
                    s.TYPE_SCRIPT === r
                      ? this._parseScript(i)
                      : s.TYPE_AUDIO === r
                      ? this._parseAudio(i, o)
                      : s.TYPE_VIDEO === r && this._parseVideo(i, o),
                      (this.pos += i);
                  }
                },
              },
              {
                key: "_parseScript",
                value: function (t) {
                  var n = e.allocUnsafe(t);
                  this.reader.read(n, this.pos);
                  var r = a.parse(n);
                  if (r && r.length > 1) {
                    var i = r[1];
                    if (void 0 !== i.duration) {
                      var o = i.duration * s.MOVIE_TIMESCALE;
                      (this.movie.duration = o),
                        (this.videoTrack.duration = o),
                        (this.audioTrack.duration = o);
                    }
                    void 0 !== i.width && (this.videoTrack.width = i.width),
                      void 0 !== i.height &&
                        (this.videoTrack.height = i.height);
                  }
                },
              },
              {
                key: "_parseAudio",
                value: function (t, n) {
                  var r = e.allocUnsafe(2);
                  this.reader.read(r, this.pos);
                  var i = r[0],
                    o = 1 & i,
                    a = (2 & i) >> 1,
                    u = (12 & i) >> 2,
                    c = (240 & i) >> 4;
                  if (s.AUDIO_FORMAT_AAC === c)
                    if (0 === r[1]) {
                      (this.audioTrack.channels = 1 === o ? 2 : 1),
                        (this.audioTrack.sampleRate = (5512.5 * (1 << u)) << 0),
                        (this.audioTrack.sampleSize = 1 === a ? 16 : 8);
                      var l = e.allocUnsafe(4 + t - 2);
                      l.write("mp4a"),
                        this.reader.read(l, this.pos + 2, 4),
                        (this.audioTrack.extraData = l),
                        (this.audioTrack.codec = p.parse(l).codec());
                    } else {
                      var h = Object.create(f.prototype);
                      (h.timestamp = n),
                        (h.timescale = this.audioTrack.timescale),
                        (h.size = t - 2),
                        (h.offset = this.pos + 2),
                        0 < h.size && this.audioTrack.samples.push(h);
                    }
                },
              },
              {
                key: "_parseVideo",
                value: function (t, n) {
                  var r = e.allocUnsafe(5);
                  this.reader.read(r, this.pos);
                  var i = r[0],
                    o = 15 & i,
                    a = (240 & i) >> 4,
                    u = r.readUIntBE(2, 3);
                  if (s.VIDEO_FORMAT_H264 === o)
                    if (0 === r[1]) {
                      var c = e.allocUnsafe(4 + t - 5);
                      c.write("avcC"),
                        this.reader.read(c, this.pos + 5, 4),
                        (this.videoTrack.extraData = c),
                        (this.videoTrack.codec = p.parse(c).codec());
                    } else {
                      var l = Object.create(h.prototype);
                      (l.timestamp = n),
                        (l.timescale = this.videoTrack.timescale),
                        (l.size = t - 5),
                        (l.offset = this.pos + 5),
                        (l.compositionOffset = u),
                        (l.keyframe = 1 === a),
                        0 < l.size && this.videoTrack.samples.push(l);
                    }
                },
              },
            ]),
            t
          );
        })();
      t.exports = v;
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = (function () {
        function t(e) {
          (0, i.default)(this, t), (this.buffer = e), (this.pos = 0);
        }
        return (
          (0, o.default)(t, [
            {
              key: "read",
              value: function () {
                for (var t = []; this.pos < this.buffer.length; )
                  t.push(this._readByType(this._readByte()));
                return t;
              },
            },
            {
              key: "_readByType",
              value: function (t) {
                switch (t) {
                  case 0:
                    return this._readDouble();
                  case 1:
                    return this._readBoolean();
                  case 2:
                    return this._readString();
                  case 3:
                    return this._readObject();
                  case 5:
                    return null;
                  case 6:
                    return;
                  case 13:
                    return null;
                  case 7:
                    return this._readReference();
                  case 8:
                    return this._readEcmaArray();
                  case 10:
                    return this._readStrictArray();
                  case 11:
                    return this._readDate();
                  case 12:
                    return this._readLongString();
                  case 15:
                    return this._readXmlDocument();
                }
              },
            },
            {
              key: "_readByte",
              value: function () {
                return this.buffer[this.pos++];
              },
            },
            {
              key: "_readDouble",
              value: function () {
                var t = this.buffer.readDoubleBE(this.pos);
                return (this.pos += 8), t;
              },
            },
            {
              key: "_readBoolean",
              value: function () {
                return 0 !== this._readByte();
              },
            },
            {
              key: "_readString",
              value: function () {
                var t = this.buffer.readUInt16BE(this.pos);
                this.pos += 2;
                var e = this.buffer.toString("utf8", this.pos, this.pos + t);
                return (this.pos += t), e;
              },
            },
            {
              key: "_readObject",
              value: function () {
                var t,
                  e,
                  n = {};
                do {
                  (t = this._readString()),
                    9 !== (e = this._readByte()) &&
                      (n[t] = this._readByType(e));
                } while (9 !== e);
                return n;
              },
            },
            {
              key: "_readReference",
              value: function () {
                var t = this.buffer.readUInt16BE(this.pos);
                return (this.pos += 2), "Reference #".concat(t);
              },
            },
            {
              key: "_readEcmaArray",
              value: function () {
                return (this.pos += 4), this._readObject();
              },
            },
            {
              key: "_readStrictArray",
              value: function () {
                var t = this.buffer.readUInt32BE(this.pos);
                this.pos += 4;
                for (var e = [], n = 0; n < t; n++)
                  e.push(this._readByType(this._readByte()));
                return e;
              },
            },
            {
              key: "_readDate",
              value: function () {
                var t = this.buffer.readDoubleBE(this.pos + 2);
                return (this.pos += 10), t;
              },
            },
            {
              key: "_readLongString",
              value: function () {
                var t = this.buffer.readUInt32BE(this.pos);
                this.pos += 4;
                var e = this.buffer.toString("utf8", this.pos, this.pos + t);
                return (this.pos += t), e;
              },
            },
            {
              key: "_readXmlDocument",
              value: function () {
                return this._readLongString();
              },
            },
          ]),
          t
        );
      })(),
      s = (function () {
        function t() {
          (0, i.default)(this, t);
        }
        return (
          (0, o.default)(t, null, [
            {
              key: "parse",
              value: function (t) {
                return new a(t).read();
              },
            },
          ]),
          t
        );
      })();
    t.exports = s;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = n(36),
      s = n(176),
      u = (function () {
        function t() {
          (0, i.default)(this, t);
        }
        return (
          (0, o.default)(t, null, [
            {
              key: "packetize",
              value: function (t, e) {
                if (!(t instanceof a))
                  throw new Error("Argument 1 should be instance of Fragment");
                return new s(t, e).packFragment();
              },
            },
          ]),
          t
        );
      })();
    t.exports = u;
  },
  function (t, e, n) {
    "use strict";
    (function (e) {
      var r,
        i = n(0),
        o = i(n(1)),
        a = i(n(2)),
        s = i(n(26)),
        u = n(177),
        c = n(178),
        l = n(16),
        f = n(17),
        h = n(39),
        d = n(24),
        p =
          ((r = {}),
          (0, s.default)(r, d.CODEC_AAC, 15),
          (0, s.default)(r, d.CODEC_H264, 27),
          (0, s.default)(r, d.CODEC_H265, 36),
          r),
        v = (function () {
          function t(n, r) {
            (0, o.default)(this, t),
              (this.fragment = n),
              (this.sampleBuffers = r),
              (this._counter = new c()),
              this.fragment.hasAudio()
                ? (this._audioCodecInfo = h.parse(this.fragment.audioExtraData))
                : (this._audioCodecInfo = null),
              this.fragment.hasVideo()
                ? ((this._videoCodecInfo = h.parse(
                    this.fragment.videoExtraData
                  )),
                  (this._videoConfig = this._buildVideoConfig()))
                : ((this._videoCodecInfo = null),
                  (this._videoConfig = e.allocUnsafe(0)));
          }
          return (
            (0, a.default)(
              t,
              [
                {
                  key: "packFragment",
                  value: function () {
                    var t = [],
                      n = 0,
                      r = 90 * this.fragment.timescale,
                      i = this._buildHeader();
                    t.push(i), (n += i.length);
                    for (
                      var o = [],
                        a = 0,
                        s = null,
                        u = 0,
                        c = function () {
                          var r = this._packAudioPayload(e.concat(o, a), s, u);
                          t.push(r), (n += r.length), (o = []), (a = 0);
                        }.bind(this),
                        h = 0,
                        d = this.fragment.samples.length;
                      h < d;
                      h++
                    ) {
                      var p = this.fragment.samples[h],
                        v = this.sampleBuffers[h],
                        g = ((r * p.timestamp) / p.timescale) << 0;
                      if (p instanceof f) {
                        var m = this._convertAudioSample(v);
                        5 === o.length && c(),
                          0 === o.length && ((s = p), (u = g)),
                          o.push(m),
                          (a += m.length);
                      } else if (p instanceof l) {
                        o.length > 0 && c();
                        var y =
                            g +
                            (((r * p.compositionOffset) / p.timescale) << 0),
                          b = this._convertVideoSample(v, p.keyframe),
                          w = this._packVideoPayload(b, p, y, g);
                        t.push(w), (n += w.length);
                      }
                    }
                    return o.length > 0 && c(), e.concat(t, n);
                  },
                },
                {
                  key: "_convertAudioSample",
                  value: function (t) {
                    var n = 7 + t.length,
                      r = e.allocUnsafe(n);
                    return (
                      (r[0] = 255),
                      (r[1] = 241),
                      (r[2] =
                        ((((this._audioCodecInfo.profileObjectType - 1) & 3) <<
                          6) +
                          ((this._audioCodecInfo.rateIndex << 2) & 60) +
                          ((this._audioCodecInfo.channelsIndex >> 2) & 1)) &
                        255),
                      (r[3] =
                        ((3 & this._audioCodecInfo.channelsIndex) << 6) & 255),
                      (r[5] = (5 + ((7 & n) << 5)) & 255),
                      (n >>= 3),
                      (r[4] = 255 & n),
                      (n >>= 8),
                      (r[3] += 3 & n),
                      (r[6] = 4092),
                      t.copy(r, 7),
                      r
                    );
                  },
                },
                {
                  key: "_convertVideoSample",
                  value: function (t, n) {
                    var r = 6 + t.length + (n ? this._videoConfig.length : 0);
                    this._videoCodecInfo.type() === d.CODEC_H265 && r++;
                    var i = e.allocUnsafe(r),
                      o = 0;
                    for (
                      i.writeUInt32BE(1, o),
                        o += 4,
                        this._videoCodecInfo.type() === d.CODEC_H265
                          ? ((i[o++] = 70), (i[o++] = 1))
                          : (i[o++] = 9),
                        i[o++] = 16,
                        n &&
                          (this._videoConfig.copy(i, o),
                          (o += this._videoConfig.length)),
                        t.copy(i, o);
                      o < i.length;

                    ) {
                      var a = i.readInt32BE(o);
                      i.writeUInt32BE(1, o), (o += 4 + a);
                    }
                    return i;
                  },
                },
                {
                  key: "_packAudioPayload",
                  value: function (n, r, i) {
                    var o = e.allocUnsafe(14 + n.length),
                      a = 0,
                      s = 8 + n.length;
                    return (
                      (o[a++] = 0),
                      (o[a++] = 0),
                      (o[a++] = 1),
                      (o[a++] = 192),
                      (o[a++] = (s >> 8) & 255),
                      (o[a++] = 255 & s),
                      (o[a++] = 128),
                      (o[a++] = 128),
                      (o[a++] = 5),
                      (a += t._writeTime(o, a, i, 32)),
                      n.copy(o, a),
                      this._packPayload(o, r, 257, i)
                    );
                  },
                },
                {
                  key: "_packVideoPayload",
                  value: function (n, r, i, o) {
                    var a = e.allocUnsafe(19 + n.length),
                      s = 0;
                    return (
                      (a[s++] = 0),
                      (a[s++] = 0),
                      (a[s++] = 1),
                      (a[s++] = 224),
                      (a[s++] = 0),
                      (a[s++] = 0),
                      (a[s++] = 128),
                      (a[s++] = 192),
                      (a[s++] = 10),
                      (s += t._writeTime(a, s, i, 48)),
                      (s += t._writeTime(a, s, o, 16)),
                      n.copy(a, s),
                      this._packPayload(a, r, 256, o)
                    );
                  },
                },
                {
                  key: "_packPayload",
                  value: function (t, n, r, i) {
                    var o = Math.ceil(t.length / 184);
                    n instanceof l && 184 * o - 8 < t.length && o++;
                    for (
                      var a = e.allocUnsafe(188 * o), s = 0, u = 0;
                      u < o;
                      u++
                    ) {
                      var c = t.length - s,
                        f = !1;
                      ((0 === u && n instanceof l) || c < 184) && (f = !0);
                      var h = 188 * u;
                      if (
                        ((a[h++] = 71),
                        (a[h++] = (0 === u ? 64 : 0) + ((r >> 8) & 31)),
                        (a[h++] = 255 & r),
                        (a[h++] = this._counter.next(n) + (f ? 48 : 16)),
                        f)
                      ) {
                        var d = 0;
                        if (
                          (n instanceof l && 0 === u && (d = 7),
                          c < 183 && (d = Math.max(d, 183 - c)),
                          (a[h++] = d),
                          0 < d)
                        ) {
                          var p = 1,
                            v = 0;
                          n instanceof l &&
                            0 === u &&
                            ((v = n.keyframe ? 80 : 16),
                            (p += 6),
                            (a[h + 1] = (i >> 25) & 255),
                            (a[h + 2] = (i >> 17) & 255),
                            (a[h + 3] = (i >> 9) & 255),
                            (a[h + 4] = (i >> 1) & 255),
                            (a[h + 5] = ((1 & i) << 7) | 126),
                            (a[h + 6] = 0)),
                            (a[h] = v),
                            (h += p),
                            p < d && (a.fill(-1, h, h + d - p), (h += d - p));
                        }
                      }
                      var g = 188 * (u + 1) - h;
                      0 < g && (t.copy(a, h, s, s + g), (s += g));
                    }
                    return a;
                  },
                },
                {
                  key: "_buildHeader",
                  value: function () {
                    var n = e.allocUnsafe(376),
                      r = 0;
                    (n[r++] = 71),
                      (n[r++] = 64),
                      (n[r++] = 0),
                      (n[r++] = 16),
                      (n[r++] = 0);
                    var i = 13;
                    (n[r++] = 0),
                      (n[r++] = 176 + ((i >> 8) & 15)),
                      (n[r++] = 255 & i),
                      (n[r++] = 0),
                      (n[r++] = 1),
                      (n[r++] = 193),
                      (n[r++] = 0),
                      (n[r++] = 0),
                      (n[r++] = 0),
                      (n[r++] = 1),
                      (n[r++] = 239),
                      (n[r++] = 255),
                      n.writeInt32BE(u.checksum(n, r - i + 1, r), r),
                      (r += 4) < 188 && (n.fill(-1, r, 188), (r += 188 - r)),
                      (n[r++] = 71),
                      (n[r++] = 79),
                      (n[r++] = 255),
                      (n[r++] = 16),
                      (n[r++] = 0),
                      (i = 13);
                    var o = 0;
                    return (
                      this.fragment.hasAudio() && ((i += 5), (o = 257)),
                      this.fragment.hasVideo() && ((i += 5), (o = 256)),
                      (n[r++] = 2),
                      (n[r++] = 176 + ((i >> 8) & 15)),
                      (n[r++] = 255 & i),
                      (n[r++] = 0),
                      (n[r++] = 1),
                      (n[r++] = 193),
                      (n[r++] = 0),
                      (n[r++] = 0),
                      (r += t._writePid(n, r, o)),
                      this.fragment.hasVideo() &&
                        ((n[r++] = p[this._videoCodecInfo.type()] || 0),
                        (r += t._writePid(n, r, 256))),
                      this.fragment.hasAudio() &&
                        ((n[r++] = p[this._audioCodecInfo.type()] || 0),
                        (r += t._writePid(n, r, 257))),
                      n.writeInt32BE(u.checksum(n, r - i + 1, r), r),
                      (r += 4) < 376 && n.fill(-1, r),
                      n
                    );
                  },
                },
                {
                  key: "_buildVideoConfig",
                  value: function () {
                    for (
                      var t = this._videoCodecInfo.units(),
                        n = e.allocUnsafe(
                          4 * t.length +
                            t.reduce(function (t, e) {
                              return t + e.length;
                            }, 0)
                        ),
                        r = 0,
                        i = 0,
                        o = t.length;
                      i < o;
                      i++
                    ) {
                      var a = t[i];
                      n.writeUInt32BE(1, r),
                        a.copy(n, r + 4),
                        (r += a.length + 4);
                    }
                    return n;
                  },
                },
              ],
              [
                {
                  key: "_writeTime",
                  value: function (t, e, n, r) {
                    return (
                      (t[e + 0] = ((n >> 29) & 14) | (240 & r) | 1),
                      (t[e + 1] = n >> 22),
                      (t[e + 2] = (n >> 14) | 1),
                      (t[e + 3] = n >> 7),
                      (t[e + 4] = (n << 1) | 1),
                      5
                    );
                  },
                },
                {
                  key: "_writePid",
                  value: function (t, e, n) {
                    return (
                      (t[e + 0] = 224 + ((n >> 8) & 31)),
                      (t[e + 1] = 255 & n),
                      (t[e + 2] = 240),
                      (t[e + 3] = 0),
                      4
                    );
                  },
                },
              ]
            ),
            t
          );
        })();
      t.exports = v;
    }).call(this, n(3).Buffer);
  },
  function (t, e, n) {
    "use strict";
    var r = [
      0, 3072180484, 1849393673, 3643163405, 3698721811, 1802224919, 2991425050,
      89147166, 3102541862, 267438370, 3604384303, 1640713003, 1687882805,
      3548826929, 178294332, 3183300408, 1893405004, 3351695432, 518034245,
      2851951169, 2897024351, 464573531, 3264649046, 1972065874, 3358988650,
      2133579886, 2785909603, 286284391, 339746169, 2740837501, 2054922096,
      3446038132, 3770033048, 1470882460, 2391646609, 965763221, 1019225995,
      2346575503, 1392223618, 3857081478, 1482369982, 4014402234, 912304567,
      2172479667, 2217553837, 858844841, 3927354788, 1561029792, 2423075540,
      661713872, 4267094237, 1229681113, 1276851911, 4211537859, 572568782,
      2503833034, 679492338, 2677930998, 1186707707, 4054219263, 4109778657,
      1139539941, 2597174504, 768638444, 2003863092, 3228387120, 424346685,
      2924922169, 2869330471, 471548707, 3309109294, 1914749226, 3483209234,
      2021674774, 2712013851, 381406495, 334203393, 2767604485, 2110785544,
      3402483980, 128685944, 2964739708, 1771050353, 3733836917, 3688731499,
      1824543343, 3051753826, 50057318, 3209076574, 140205658, 3514637655,
      1717623891, 1664129869, 3559742025, 218831172, 3122059328, 2546378156,
      551249064, 4194117541, 1323361953, 1269866943, 4239220923, 629875638,
      2459361970, 791391626, 2553703566, 1091579779, 4128108167, 4083001753,
      1145071773, 2640718736, 712764052, 3877483744, 1342207460, 2300983017,
      1044117485, 996913395, 2356572663, 1431319290, 3796759550, 1609612486,
      3907878338, 835403471, 2262237131, 2206644437, 882604497, 3988601564,
      1520499672, 4007660649, 1509805421, 2161872480, 935743332, 848693370,
      2240530814, 1554877043, 3954199415, 1443693647, 3775972683, 943097414,
      2401978178, 2323316828, 1030144344, 3829432917, 1398621009, 2654674213,
      690412577, 4026572588, 1193106984, 1112348982, 4115716146, 745970495,
      2607503931, 651564291, 2446054407, 1223530250, 4293940750, 4204794128,
      1304285204, 2493223705, 596005405, 240529393, 3108761333, 1617800696,
      3614469372, 3525323746, 1698556646, 3155929579, 184969455, 3065718743,
      27715283, 3632309726, 1872585946, 1791828932, 3721454272, 83272141,
      3018547401, 2123185853, 3381723065, 280411316, 2813033904, 2734373550,
      367459242, 3435182247, 2078112163, 3328194203, 1904080799, 2824582290,
      524711318, 437662344, 2903241612, 1949151361, 3274731909, 2576386653,
      781011801, 4155181140, 1085720912, 1172737614, 4076556106, 735906887,
      2629881155, 561873531, 2522891135, 1329987698, 4166762870, 4245390952,
      1242974060, 2469397601, 606979429, 3914046225, 1582717461, 2272270616,
      812505116, 893230850, 2183159302, 1527127307, 3961248783, 1369871159,
      3871035955, 1067258174, 2290143290, 2379257636, 986535456, 3823834413,
      1425462313, 2032576965, 3459999937, 387787724, 2684414664, 2773528022,
      307064018, 3412799455, 2088169179, 3251347939, 1993760999, 2951750634,
      418243310, 498968048, 2862638324, 1938171897, 3298551549, 167622793,
      3202382221, 1741044352, 3504077700, 3582704794, 1654029726, 3148889747,
      212729751, 2970661039, 101544363, 3744150182, 1748431778, 1835447484,
      3665524152, 56440501, 3024156593, 1,
    ];
    t.exports = {
      checksum: function (t, e, n) {
        (e = e || 0), (n = n || t.length);
        for (var i, o, a = -1, s = e; s < n; s++)
          (i = 255 & (a ^ t[s])), (a = r[i] ^ ((a >> 8) & 16777215));
        return (
          ((o = a) >>> 24) |
          ((o >> 8) & 65280) |
          ((o << 8) & 16711680) |
          (o << 24)
        );
      },
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      i = r(n(1)),
      o = r(n(2)),
      a = n(17),
      s = n(16),
      u = (function () {
        function t() {
          (0, i.default)(this, t),
            (this._audioCounter = 0),
            (this._videoCounter = 0);
        }
        return (
          (0, o.default)(t, [
            {
              key: "next",
              value: function (t) {
                var e = 0;
                return (
                  t instanceof a
                    ? ((e = this._audioCounter),
                      (this._audioCounter = (this._audioCounter + 1) & 15))
                    : t instanceof s &&
                      ((e = this._videoCounter),
                      (this._videoCounter = (this._videoCounter + 1) & 15)),
                  e
                );
              },
            },
          ]),
          t
        );
      })();
    t.exports = u;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = n(11),
      o = r(n(59)),
      a = r(n(88)),
      s = function (t) {
        var e = t.wsURL,
          n = t.rtspURL,
          r = null,
          s = t.isTalkService,
          u = t.speed,
          c = 6,
          l = null,
          f = null,
          h = 0,
          d = 0,
          p = !1,
          v = !1,
          g = t.RTSP_STATE,
          m = -1 !== n.search("&srctype=raw"),
          y = new o.default(),
          b = t.workerManager,
          w = 4e4,
          S = "",
          T = [],
          x = 1,
          E = function () {},
          A = {},
          R = "Options",
          _ = null,
          k = null,
          D = "",
          C = null,
          M = {},
          I = null,
          B = null,
          O = null,
          P = null,
          F = !0,
          U = {},
          j = "",
          L = !1,
          z = 0,
          N = 0,
          V = "",
          q = new a.default(),
          H = !1,
          W = new Function();
        if (t.isRecord) {
          ["init", "sendSdpInfo", "parseRTPData", "setCallback"].forEach(
            function (t, e) {
              b[t] = function () {};
            }
          );
          var G = 1048576;
          q.postMessage({
            type: "init",
            options: {
              singleSize: 500 * G,
              nameOptions: { namedBy: "date", nameFormat: ["ymd_his"] },
              limitOptions: { limitBy: "count", count: 10 },
            },
          }),
            (q.onMessage = function (t) {
              switch (t.type) {
                case "pendding":
                  W(t);
                  break;
                case "download":
                  tt(t.data.name, t.data.buffer);
                  break;
                case "closed":
                  W(t), (H = !1);
              }
            });
        }
        t.speed > 1 &&
          (["parseRTPData"].forEach(function (t, e) {
            b[t] = function () {};
          }),
          (G = 1048576),
          q.postMessage({
            type: "init",
            options: {
              singleSize: 500 * G,
              nameOptions: { namedBy: "date", nameFormat: ["ymd_his"] },
              limitOptions: { limitBy: "count", count: 10 },
            },
          }),
          (q.onMessage = function (t) {
            switch (t.type) {
              case "pendding":
                W(t);
                break;
              case "download":
                tt(t.data.name, t.data.buffer);
                break;
              case "closed":
                W(t), (H = !1);
            }
          }));
        function Y() {}
        function X(t, e, r, o) {
          var a = "";
          switch (t) {
            case "OPTIONS":
            case "TEARDOWN":
            case "GET_PARAMETER":
            case "SET_PARAMETERS":
              a =
                t +
                " " +
                n +
                " RTSP/1.0\r\nCSeq: " +
                x +
                V +
                "\r\n" +
                S +
                "\r\n";
              break;
            case "DESCRIBE":
              (a = t + " " + n + " RTSP/1.0\r\nCSeq: " + x + V),
                !0 === s &&
                  (a += "\r\nRequire: www.onvif.org/ver20/backchannel"),
                (a = a + "\r\n" + S + "\r\n");
              break;
            case "SETUP":
              i.debug.log("trackID: " + e),
                (a =
                  t +
                  " " +
                  n +
                  "/trackID=" +
                  e +
                  " RTSP/1.0\r\nCSeq: " +
                  x +
                  V +
                  "\r\n" +
                  S +
                  "Transport: DH/AVP/TCP;unicast;interleaved=" +
                  2 * e +
                  "-" +
                  (2 * e + 1) +
                  "\r\n"),
                (a += 0 != k ? "Session: " + k + "\r\n\r\n" : "\r\n");
              break;
            case "PLAY":
              (a =
                t +
                " " +
                n +
                " RTSP/1.0\r\nCSeq: " +
                x +
                V +
                "\r\nSession: " +
                k +
                "\r\n"),
                u && (a += "Speed: " + u + "\r\n"),
                void 0 != o && 0 != o
                  ? ((a += "Range:"
                      .concat(m ? "byte" : "npt", "=")
                      .concat(o, "-\r\n")),
                    (a += S + "\r\n"))
                  : (a += S + "\r\n");
              break;
            case "PAUSE":
              a =
                t +
                " " +
                n +
                " RTSP/1.0\r\nCSeq: " +
                x +
                V +
                "\r\nSession: " +
                k +
                "\r\n\r\n";
              break;
            case "SCALE":
              (a =
                "PLAY " +
                n +
                " RTSP/1.0\r\nCSeq: " +
                x +
                V +
                "\r\nSession: " +
                k +
                "\r\n"),
                (a += "Speed: " + o + "\r\n"),
                (a += S + "\r\n");
          }
          return i.debug.log(a), a;
        }
        function Q(t) {
          i.debug.log(t);
          var e,
            r = t.search("CSeq: ") + 5;
          if (
            ((x = parseInt(t.slice(r, r + 10)) + 1),
            (e = (function (t) {
              var e = {},
                n = 0,
                r = 0,
                i = null,
                o = null;
              if (-1 !== t.search("Content-Type: application/sdp")) {
                var a = t.split("\r\n\r\n");
                o = a[0];
              } else o = t;
              var s = o.split("\r\n"),
                u = s[0].split(" ");
              if (
                (u.length > 2 &&
                  ((e.ResponseCode = parseInt(u[1])),
                  (e.ResponseMessage = u[2])),
                e.ResponseCode === g.OK)
              ) {
                for (n = 1; n < s.length; n++)
                  if ("Public" === (i = s[n].split(":"))[0])
                    e.MethodsSupported = i[1].split(",");
                  else if ("CSeq" === i[0]) e.CSeq = parseInt(i[1]);
                  else if ("Content-Type" === i[0])
                    (e.ContentType = i[1]),
                      -1 !== e.ContentType.search("application/sdp") &&
                        (e.SDPData = $(t));
                  else if ("Content-Length" === i[0])
                    e.ContentLength = parseInt(i[1]);
                  else if ("Content-Base" === i[0]) {
                    var c = s[n].search("Content-Base:");
                    -1 !== c && (e.ContentBase = s[n].substr(c + 13));
                  } else if ("Session" === i[0]) {
                    var l = i[1].split(";");
                    e.SessionID = parseInt(l[0]);
                  } else if ("Transport" === i[0]) {
                    var f = i[1].split(";");
                    for (r = 0; r < f.length; r++) {
                      var h = f[r].search("interleaved=");
                      if (-1 !== h) {
                        var d = f[r].substr(h + 12),
                          p = d.split("-");
                        p.length > 1 &&
                          ((e.RtpInterlevedID = parseInt(p[0])),
                          (e.RtcpInterlevedID = parseInt(p[1])));
                      }
                    }
                  } else if ("RTP-Info" === i[0]) {
                    i[1] = s[n].substr(9);
                    var v = i[1].split(",");
                    for (e.RTPInfoList = [], r = 0; r < v.length; r++) {
                      var m = v[r].split(";"),
                        y = {},
                        b = 0;
                      for (b = 0; b < m.length; b++) {
                        var w = m[b].search("url=");
                        -1 !== w && (y.URL = m[b].substr(w + 4)),
                          -1 !== (w = m[b].search("seq=")) &&
                            (y.Seq = parseInt(m[b].substr(w + 4)));
                      }
                      e.RTPInfoList.push(y);
                    }
                  }
              } else if (e.ResponseCode === g.UNAUTHORIZED)
                for (n = 1; n < s.length; n++)
                  if ("CSeq" === (i = s[n].split(":"))[0])
                    e.CSeq = parseInt(i[1]);
                  else if ("WWW-Authenticate" === i[0]) {
                    var S = i[1].split(",");
                    for (r = 0; r < S.length; r++) {
                      var T = S[r].search("Digest realm=");
                      if (-1 !== T) {
                        var x = S[r].substr(T + 13).split('"');
                        e.Realm = x[1];
                      }
                      if (-1 !== (T = S[r].search("nonce="))) {
                        var E = S[r].substr(T + 6).split('"');
                        e.Nonce = E[1];
                      }
                    }
                  }
              return e;
            })(t)).ResponseCode === g.UNAUTHORIZED && "" === S)
          )
            !(function (t) {
              var e = U.username,
                r = U.passWord,
                o = { Method: null, Realm: null, Nonce: null, Uri: null },
                a = null;
              (o = {
                Method: R.toUpperCase(),
                Realm: t.Realm,
                Nonce: t.Nonce,
                Uri: n,
              }),
                (a = (0, i.formAuthorizationResponse)(
                  e,
                  r,
                  o.Uri,
                  o.Realm,
                  o.Nonce,
                  o.Method
                )),
                (S =
                  'Authorization: Digest username="' +
                  e +
                  '", realm="' +
                  o.Realm +
                  '",'),
                (S +=
                  ' nonce="' +
                  o.Nonce +
                  '", uri="' +
                  o.Uri +
                  '", response="' +
                  a +
                  '"'),
                (S += "\r\n"),
                K(X("OPTIONS", null));
            })(e);
          else if (e.ResponseCode === g.OK) {
            if ("Options" === R)
              return (
                (R = "Describe"),
                (N = setTimeout(function () {
                  E({ errorCode: 404 });
                }, 15e3)),
                X("DESCRIBE", null)
              );
            if ("Describe" === R) {
              if (
                (N && clearTimeout(N),
                (N = 0),
                (A = $(t)),
                "undefined" !== typeof e.ContentBase &&
                  (A.ContentBase = e.ContentBase),
                A.Sessions.RecordRange)
              ) {
                var o = parseInt(A.Sessions.RecordRange);
                O(o);
              }
              var a = 0;
              for (a = 0; a < A.Sessions.length; a += 1) {
                var u = {};
                "JPEG" === A.Sessions[a].CodecMime ||
                "H264" === A.Sessions[a].CodecMime ||
                "H265" === A.Sessions[a].CodecMime ||
                "H264-SVC" == A.Sessions[a].CodecMime ||
                "RAW" == A.Sessions[a].CodecMime
                  ? ((u.codecName = A.Sessions[a].CodecMime),
                    "H264-SVC" === A.Sessions[a].CodecMime &&
                      (u.codecName = "H264"),
                    ("H265" !== A.Sessions[a].CodecMime &&
                      "RAW" !== A.Sessions[a].CodecMime) ||
                      Y.prototype.setLiveMode("canvas"),
                    (u.trackID = A.Sessions[a].ControlURL),
                    (u.ClockFreq = A.Sessions[a].ClockFreq),
                    (u.Port = parseInt(A.Sessions[a].Port)),
                    "undefined" !== typeof A.Sessions[a].Framerate &&
                      ((u.Framerate = parseInt(A.Sessions[a].Framerate)),
                      b.setFPS(u.Framerate),
                      I(u.Framerate)),
                    T.push(u))
                  : "PCMU" === A.Sessions[a].CodecMime ||
                    -1 !== A.Sessions[a].CodecMime.search("G726-16") ||
                    -1 !== A.Sessions[a].CodecMime.search("G726-24") ||
                    -1 !== A.Sessions[a].CodecMime.search("G726-32") ||
                    -1 !== A.Sessions[a].CodecMime.search("G726-40") ||
                    "PCMA" === A.Sessions[a].CodecMime ||
                    -1 !== A.Sessions[a].CodecMime.search("L16")
                  ? ("PCMU" === A.Sessions[a].CodecMime
                      ? (u.codecName = "G.711Mu")
                      : "G726-16" === A.Sessions[a].CodecMime
                      ? (u.codecName = "G.726-16")
                      : "G726-24" === A.Sessions[a].CodecMime
                      ? (u.codecName = "G.726-24")
                      : "G726-32" === A.Sessions[a].CodecMime
                      ? (u.codecName = "G.726-32")
                      : "G726-40" === A.Sessions[a].CodecMime
                      ? (u.codecName = "G.726-40")
                      : "PCMA" === A.Sessions[a].CodecMime
                      ? (u.codecName = "G.711A")
                      : "L16" === A.Sessions[a].CodecMime &&
                        (u.codecName = "PCM"),
                    (u.trackID = A.Sessions[a].ControlURL),
                    (u.ClockFreq = A.Sessions[a].ClockFreq),
                    (u.Port = parseInt(A.Sessions[a].Port)),
                    (u.Bitrate = parseInt(A.Sessions[a].Bitrate)),
                    (u.TalkTransType = A.Sessions[a].TalkTransType),
                    T.push(u))
                  : "mpeg4-generic" === A.Sessions[a].CodecMime ||
                    "MPEG4-GENERIC" === A.Sessions[a].CodecMime
                  ? ((u.codecName = "mpeg4-generic"),
                    (u.trackID = A.Sessions[a].ControlURL),
                    (u.ClockFreq = A.Sessions[a].ClockFreq),
                    (u.Port = parseInt(A.Sessions[a].Port)),
                    (u.Bitrate = parseInt(A.Sessions[a].Bitrate)),
                    (u.TalkTransType = A.Sessions[a].TalkTransType),
                    T.push(u))
                  : "vnd.onvif.metadata" === A.Sessions[a].CodecMime
                  ? ((u.codecName = "MetaData"),
                    (u.trackID = A.Sessions[a].ControlURL),
                    (u.ClockFreq = A.Sessions[a].ClockFreq),
                    (u.Port = parseInt(A.Sessions[a].Port)),
                    T.push(u))
                  : "stream-assist-frame" === A.Sessions[a].CodecMime
                  ? ((u.codecName = "stream-assist-frame"),
                    (u.trackID = A.Sessions[a].ControlURL),
                    (u.ClockFreq = A.Sessions[a].ClockFreq),
                    (u.Port = parseInt(A.Sessions[a].Port)),
                    T.push(u))
                  : ("audio" === A.Sessions[a].Type && E({ errorCode: 201 }),
                    i.debug.log(
                      "Unknown codec type:",
                      A.Sessions[a].CodecMime,
                      A.Sessions[a].ControlURL
                    ));
              }
              return !1 === s
                ? void E({ errorCode: 404, description: "rtsp not found" })
                : ((_ = 0),
                  (R = "Setup"),
                  i.debug.log(T),
                  X("SETUP", T[_].trackID.split("=")[1] - 0));
            }
            if ("Setup" === R) {
              if (((k = e.SessionID), _ < T.length))
                return (
                  (T[_].RtpInterlevedID = e.RtpInterlevedID),
                  (T[_].RtcpInterlevedID = e.RtcpInterlevedID),
                  (_ += 1) !== T.length
                    ? X("SETUP", T[_].trackID.split("=")[1] - 0)
                    : (!m && b.sendSdpInfo(T, M),
                      !0 === s && b.setCallback("audioTalk", Z),
                      (R = "Play"),
                      L ? X("PLAY", null, 0, z) : X("PLAY", null))
                );
              i.debug.log("Unknown setup SDP index");
            } else
              "Play" === R
                ? ((k = e.SessionID),
                  clearInterval(C),
                  (C = setInterval(function () {
                    return K(X("GET_PARAMETER", null));
                  }, w)),
                  (R = "Playing"))
                : "Playing" === R || i.debug.log("unknown rtsp state:" + R);
          } else if (e.ResponseCode === g.NOTSERVICE) {
            if ("Setup" === R && "sendonly" === T[_].TalkTransType)
              return (
                (T[_].RtpInterlevedID = -1),
                (T[_].RtcpInterlevedID = -1),
                (_ += 1),
                (s = !1),
                E({
                  errorCode: "504",
                  description: "Talk Service Unavilable",
                  place: "RtspClient.js",
                }),
                _ < T.length
                  ? X("SETUP", T[_].trackID)
                  : ((R = "Play"), X("PLAY", null))
              );
            E({ errorCode: "503", description: "Service Unavilable" });
          } else if (e.ResponseCode === g.NOTFOUND) {
            if ("Describe" === R || "Options" === R)
              return void E({ errorCode: 404, description: "rtsp not found" });
          } else if (e.ResponseCode === g.INVALID_RANGE)
            return (
              ("backup" !== D && "playback" !== D) ||
                E({ errorCode: "457", description: "Invalid range" }),
              void i.debug.log("RTP disconnection detect!!!")
            );
        }
        function Z(t) {
          !0 === s &&
            (function (t) {
              null !== r && r.readyState === WebSocket.OPEN
                ? r.send(t)
                : i.debug.log("SendRtpData - Websocket does not exist");
            })(t);
        }
        function K(t) {
          void 0 != t &&
            null != t &&
            "" != t &&
            (r && r.readyState === WebSocket.OPEN
              ? (!1 === v &&
                  -1 !== t.search("DESCRIBE") &&
                  ((p = !0), (v = !0)),
                void 0 != t && r.send((0, i.stringToUint8Array)(t)))
              : i.debug.log("ws\u672a\u8fde\u63a5"));
        }
        function J(t) {
          var e = new Uint8Array(),
            i = new Uint8Array(t.data);
          for ((e = new Uint8Array(i.length)).set(i, 0), h = e.length; h > 0; )
            if (36 !== e[0]) {
              var o = String.fromCharCode.apply(null, e),
                a = null;
              (-1 === o.indexOf("OffLine:File Over") &&
                -1 === o.indexOf("OffLine:Internal Error")) ||
                ((r.fileOver = !0), b.postRtspOver()),
                -1 !== o.indexOf("OffLine:KmsUnavailable") &&
                  E({ errorCode: 203 }),
                !0 === p
                  ? ((a = o.lastIndexOf("\r\n")), (p = !1))
                  : (a = o.search("\r\n\r\n"));
              var s = o.search("RTSP");
              if (-1 === s) return void (e = new Uint8Array());
              if (-1 === a) return void (h = e.length);
              (l = e.subarray(s, a + c)),
                (e = e.subarray(a + c)),
                K(Q(String.fromCharCode.apply(null, l))),
                (h = e.length);
            } else {
              if ("RAW" === T[0].codecName)
                return void (/.aac/.test(n)
                  ? b.sendBufferToAudioWorker(e.subarray(c, e.length))
                  : y.setMovieData(e.subarray(c, e.length)));
              if (
                (!0 === F && B && B(),
                (F = !1),
                (f = e.subarray(0, c)),
                !(
                  (d = (f[2] << 24) | (f[3] << 16) | (f[4] << 8) | f[5]) + c <=
                  e.length
                ))
              )
                return void (h = e.length);
              var u = e.subarray(c, d + c),
                v =
                  ((u[19] << 24) + (u[18] << 16) + (u[17] << 8) + u[16]) >>> 0,
                g =
                  Date.UTC(
                    "20" + (v >>> 26),
                    ((v >>> 22) & 15) - 1,
                    (v >>> 17) & 31,
                    (v >>> 12) & 31,
                    (v >>> 6) & 63,
                    63 & v
                  ) / 1e3;
              (g += (new Date().getTimezoneOffset() / 60) * 3600),
                P && P({ timestamp: g }),
                H && q.postMessage({ type: "addBuffer", buffer: u }),
                b.parseRTPData(f, u),
                (e = e.subarray(d + c)),
                (h = e.length);
            }
        }
        function $(t) {
          var e = { Sessions: [] },
            n = (
              -1 !== t.search("Content-Type: application/sdp")
                ? t.split("\r\n\r\n")[1]
                : t
            ).split("\r\n"),
            r = 0,
            i = !1;
          for (r = 0; r < n.length; r++) {
            var o = n[r].split("=");
            if (o.length > 0)
              switch (o[0]) {
                case "a":
                  var a = o[1].split(":");
                  if (a.length > 1) {
                    if ("control" === a[0]) {
                      var s = n[r].search("control:");
                      !0 === i
                        ? -1 !== s &&
                          (e.Sessions[e.Sessions.length - 1].ControlURL = n[
                            r
                          ].substr(s + 8))
                        : -1 !== s && (e.BaseURL = n[r].substr(s + 8));
                    } else if ("rtpmap" === a[0]) {
                      var u = a[1].split(" ");
                      e.Sessions[e.Sessions.length - 1].PayloadType = u[0];
                      var c = u[1].split("/");
                      (e.Sessions[e.Sessions.length - 1].CodecMime = c[0]),
                        c.length > 1 &&
                          (e.Sessions[e.Sessions.length - 1].ClockFreq = c[1]);
                    } else if ("framesize" === a[0]) {
                      var l = a[1].split(" ");
                      if (l.length > 1) {
                        var f = l[1].split("-");
                        (e.Sessions[e.Sessions.length - 1].Width = f[0]),
                          (e.Sessions[e.Sessions.length - 1].Height = f[1]);
                      }
                    } else if ("framerate" === a[0])
                      e.Sessions[e.Sessions.length - 1].Framerate = a[1];
                    else if ("fmtp" === a[0]) {
                      var h = n[r].split(" ");
                      if (h.length < 2) continue;
                      for (var d = 1; d < h.length; d++) {
                        var p = h[d].split(";"),
                          v = 0;
                        for (v = 0; v < p.length; v++) {
                          var g = p[v].search("mode=");
                          if (
                            (-1 !== g &&
                              (e.Sessions[e.Sessions.length - 1].mode = p[
                                v
                              ].substr(g + 5)),
                            -1 !== (g = p[v].search("config=")) &&
                              ((e.Sessions[e.Sessions.length - 1].config = p[
                                v
                              ].substr(g + 7)),
                              (M.config =
                                e.Sessions[e.Sessions.length - 1].config),
                              (M.clockFreq =
                                e.Sessions[e.Sessions.length - 1].ClockFreq),
                              (M.bitrate =
                                e.Sessions[e.Sessions.length - 1].Bitrate)),
                            -1 !== (g = p[v].search("sprop-vps=")) &&
                              (e.Sessions[e.Sessions.length - 1].VPS = p[
                                v
                              ].substr(g + 10)),
                            -1 !== (g = p[v].search("sprop-sps=")) &&
                              (e.Sessions[e.Sessions.length - 1].SPS = p[
                                v
                              ].substr(g + 10)),
                            -1 !== (g = p[v].search("sprop-pps=")) &&
                              (e.Sessions[e.Sessions.length - 1].PPS = p[
                                v
                              ].substr(g + 10)),
                            -1 !== (g = p[v].search("sprop-parameter-sets=")))
                          ) {
                            var m = p[v].substr(g + 21).split(",");
                            m.length > 1 &&
                              ((e.Sessions[e.Sessions.length - 1].SPS = m[0]),
                              (e.Sessions[e.Sessions.length - 1].PPS = m[1]));
                          }
                        }
                      }
                    } else if ("range" === a[0] && o[2]) {
                      var y = o[2].split("-")[1];
                      e.Sessions && y && (e.Sessions.RecordRange = y);
                    }
                  } else
                    1 === a.length &&
                      ("recvonly" === a[0]
                        ? (e.Sessions[e.Sessions.length - 1].TalkTransType =
                            "recvonly")
                        : "sendonly" === a[0] &&
                          (e.Sessions[e.Sessions.length - 1].TalkTransType =
                            "sendonly"));
                  break;
                case "m":
                  var b = o[1].split(" "),
                    w = {};
                  (w.Type = b[0]),
                    (w.Port = b[1]),
                    (w.Payload = b[3]),
                    e.Sessions.push(w),
                    (i = !0);
                  break;
                case "b":
                  if (!0 === i) {
                    var S = o[1].split(":");
                    e.Sessions[e.Sessions.length - 1].Bitrate = S[1];
                  }
              }
          }
          return e;
        }
        function tt(t, e) {
          t = (t = (t || Date.now()) + "").toLowerCase().split(".dav")[0];
          var n = new Blob([e]),
            r = document.createElement("a");
          (r.href = URL.createObjectURL(n)),
            (r.download = t + ".dav"),
            r.click(),
            setTimeout(function () {
              URL.revokeObjectURL(r.href), (r = null);
            }, 100),
            (e = null);
        }
        return (
          (Y.prototype = {
            setExtraError: function (t) {
              t && (V = "\r\nExtraError: support");
            },
            connect: function () {
              r ||
                (((r = new WebSocket(e)).binaryType = "arraybuffer"),
                (r.fileOver = !1),
                r.addEventListener("message", J, !1),
                (r.onopen = function () {
                  var t =
                      "OPTIONS " +
                      n +
                      " RTSP/1.0\r\nCSeq: " +
                      x +
                      V +
                      "\r\n\r\n",
                    e = (0, i.stringToUint8Array)(t);
                  r.send(e);
                }),
                (r.onerror = function (t) {
                  E({ errorCode: 202, description: "Open WebSocket Error" });
                }),
                (r.onclose = function (t) {
                  r &&
                    !r.fileOver &&
                    E({ errorCode: 202, description: "Open WebSocket Error" });
                }));
            },
            disconnect: function () {
              K(X("TEARDOWN", null)),
                clearInterval(C),
                (C = null),
                r && (r.close(), (r = null), (k = null)),
                b.terminate(),
                N && clearTimeout(N);
            },
            controlPlayer: function (t) {
              var e = "",
                n = null;
              switch (((j = t.command), t.command)) {
                case "PLAY":
                  if (((R = "Play"), b.play(), null != t.range)) {
                    e = X("PLAY", null, 0, t.range);
                    break;
                  }
                  (e = X("PLAY", null)), j && b.initStartTime();
                  break;
                case "PAUSE":
                  if ("PAUSE" === R) break;
                  (R = "PAUSE"), (e = X("PAUSE", null)), b.pause();
                  break;
                case "SCALE":
                  (e = X("SCALE", null, 0, t.data)), b.playbackSpeed(t.data);
                  break;
                case "TEARDOWN":
                  e = X("TEARDOWN", null);
                  break;
                case "audioPlay":
                  if ("start" === t.data)
                    (R = "Play"), (e = X("PLAY", null, 0, t.range));
                  else if ("stop" === t.data) e = X("TEARDOWN", null);
                  else {
                    if ("PAUSE" === R) break;
                    (R = "PAUSE"), (e = X("PAUSE", null));
                  }
                  b.controlAudio(t.command, t.data);
                  break;
                case "volumn":
                case "audioSamplingRate":
                  b.controlAudio(t.command, t.data);
                  break;
                case "playNextFrame":
                  b.getVideoBufferQueueSize() < 5 && this.getNextFrameData(1e3),
                    b.playNextFrame();
                  break;
                case "getCurFrameInfo":
                  n = b.getCurFrameInfo();
                  break;
                case "getCapture":
                  b.getCapture();
                  break;
                case "startRecod":
                  (H = t.data) || q.postMessage({ type: "close" });
                  break;
                default:
                  i.debug.log("\u672a\u77e5\u6307\u4ee4: " + t.command);
              }
              if (("" != e && K(e), n)) return n;
            },
            setLiveMode: function (t) {
              b.setLiveMode(t);
            },
            setPlayMode: function (t, e) {
              (L = t), (z = e), b.setPlayMode(t);
            },
            setSignalURL: function (t) {
              n = t;
            },
            setCallback: function (t, e) {
              "GetFrameRate" === t
                ? (I = e)
                : "GetFirstFrame" === t
                ? (B = e)
                : "recordChanged" === t
                ? (W = e)
                : "GetTotalTime" === t
                ? (O = e)
                : "UpdateTimeStamp" === t
                ? (P = e)
                : b.setCallback(t, e),
                "Error" == t && (E = e);
            },
            setUserInfo: function (t, e) {
              (U.username = t), (U.passWord = e);
            },
            getNextFrameData: function (t) {
              K(X("PLAY", null)),
                setTimeout(function () {
                  K(X("PAUSE", null));
                }, t);
            },
          }),
          (y.CodecCallback = function (t) {
            (M = t.AudioCodecInfo),
              (T[0].Framerate = t.Framerate),
              "H264" === M.VideoCodec && Y.prototype.setLiveMode("video"),
              b.sendSdpInfo(T, M, t);
          }),
          (y.TrackCallback = function (t) {
            var e = new Uint8Array(t.subarray(6, t.length));
            b.parseRTPData(t.subarray(0, 6), e);
          }),
          new Y()
        );
      };
    e.default = s;
  },
]).default;
