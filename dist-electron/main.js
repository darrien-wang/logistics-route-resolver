import Wt, { ipcMain as We, app as an, BrowserWindow as Ca, session as hf } from "electron";
import Gt from "node:path";
import { fileURLToPath as mf } from "node:url";
import { exec as vf } from "node:child_process";
import { writeFileSync as gf, unlinkSync as xf } from "node:fs";
import { tmpdir as yf } from "node:os";
import lt from "fs";
import bf from "constants";
import ut from "stream";
import Ra from "util";
import bp from "assert";
import De from "path";
import Bi from "child_process";
import ft from "events";
import ht from "crypto";
import wp from "tty";
import ni, { networkInterfaces as wf } from "os";
import Vt from "url";
import _f from "string_decoder";
import on from "zlib";
import ii, { createServer as Ef } from "http";
import Sf from "querystring";
import Tf from "timers";
import Cf from "https";
import Rf from "net";
import Af from "tls";
import kf from "buffer";
var ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Of(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
function Pf(o) {
  if (Object.prototype.hasOwnProperty.call(o, "__esModule")) return o;
  var m = o.default;
  if (typeof m == "function") {
    var v = function h() {
      return this instanceof h ? Reflect.construct(m, arguments, this.constructor) : m.apply(this, arguments);
    };
    v.prototype = m.prototype;
  } else v = {};
  return Object.defineProperty(v, "__esModule", { value: !0 }), Object.keys(o).forEach(function(h) {
    var d = Object.getOwnPropertyDescriptor(o, h);
    Object.defineProperty(v, h, d.get ? d : {
      enumerable: !0,
      get: function() {
        return o[h];
      }
    });
  }), v;
}
var It = {}, er = {}, hi = {}, ro;
function et() {
  return ro || (ro = 1, hi.fromCallback = function(o) {
    return Object.defineProperty(function(...m) {
      if (typeof m[m.length - 1] == "function") o.apply(this, m);
      else
        return new Promise((v, h) => {
          m.push((d, c) => d != null ? h(d) : v(c)), o.apply(this, m);
        });
    }, "name", { value: o.name });
  }, hi.fromPromise = function(o) {
    return Object.defineProperty(function(...m) {
      const v = m[m.length - 1];
      if (typeof v != "function") return o.apply(this, m);
      m.pop(), o.apply(this, m).then((h) => v(null, h), v);
    }, "name", { value: o.name });
  }), hi;
}
var tr, so;
function Nf() {
  if (so) return tr;
  so = 1;
  var o = bf, m = process.cwd, v = null, h = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return v || (v = m.call(process)), v;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var d = process.chdir;
    process.chdir = function(t) {
      v = null, d.call(process, t);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, d);
  }
  tr = c;
  function c(t) {
    o.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && a(t), t.lutimes || n(t), t.chown = l(t.chown), t.fchown = l(t.fchown), t.lchown = l(t.lchown), t.chmod = e(t.chmod), t.fchmod = e(t.fchmod), t.lchmod = e(t.lchmod), t.chownSync = r(t.chownSync), t.fchownSync = r(t.fchownSync), t.lchownSync = r(t.lchownSync), t.chmodSync = i(t.chmodSync), t.fchmodSync = i(t.fchmodSync), t.lchmodSync = i(t.lchmodSync), t.stat = u(t.stat), t.fstat = u(t.fstat), t.lstat = u(t.lstat), t.statSync = s(t.statSync), t.fstatSync = s(t.fstatSync), t.lstatSync = s(t.lstatSync), t.chmod && !t.lchmod && (t.lchmod = function(p, x, b) {
      b && process.nextTick(b);
    }, t.lchmodSync = function() {
    }), t.chown && !t.lchown && (t.lchown = function(p, x, b, C) {
      C && process.nextTick(C);
    }, t.lchownSync = function() {
    }), h === "win32" && (t.rename = typeof t.rename != "function" ? t.rename : (function(p) {
      function x(b, C, S) {
        var T = Date.now(), y = 0;
        p(b, C, function E(w) {
          if (w && (w.code === "EACCES" || w.code === "EPERM" || w.code === "EBUSY") && Date.now() - T < 6e4) {
            setTimeout(function() {
              t.stat(C, function(_, D) {
                _ && _.code === "ENOENT" ? p(b, C, E) : S(w);
              });
            }, y), y < 100 && (y += 10);
            return;
          }
          S && S(w);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(x, p), x;
    })(t.rename)), t.read = typeof t.read != "function" ? t.read : (function(p) {
      function x(b, C, S, T, y, E) {
        var w;
        if (E && typeof E == "function") {
          var _ = 0;
          w = function(D, O, I) {
            if (D && D.code === "EAGAIN" && _ < 10)
              return _++, p.call(t, b, C, S, T, y, w);
            E.apply(this, arguments);
          };
        }
        return p.call(t, b, C, S, T, y, w);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(x, p), x;
    })(t.read), t.readSync = typeof t.readSync != "function" ? t.readSync : /* @__PURE__ */ (function(p) {
      return function(x, b, C, S, T) {
        for (var y = 0; ; )
          try {
            return p.call(t, x, b, C, S, T);
          } catch (E) {
            if (E.code === "EAGAIN" && y < 10) {
              y++;
              continue;
            }
            throw E;
          }
      };
    })(t.readSync);
    function a(p) {
      p.lchmod = function(x, b, C) {
        p.open(
          x,
          o.O_WRONLY | o.O_SYMLINK,
          b,
          function(S, T) {
            if (S) {
              C && C(S);
              return;
            }
            p.fchmod(T, b, function(y) {
              p.close(T, function(E) {
                C && C(y || E);
              });
            });
          }
        );
      }, p.lchmodSync = function(x, b) {
        var C = p.openSync(x, o.O_WRONLY | o.O_SYMLINK, b), S = !0, T;
        try {
          T = p.fchmodSync(C, b), S = !1;
        } finally {
          if (S)
            try {
              p.closeSync(C);
            } catch {
            }
          else
            p.closeSync(C);
        }
        return T;
      };
    }
    function n(p) {
      o.hasOwnProperty("O_SYMLINK") && p.futimes ? (p.lutimes = function(x, b, C, S) {
        p.open(x, o.O_SYMLINK, function(T, y) {
          if (T) {
            S && S(T);
            return;
          }
          p.futimes(y, b, C, function(E) {
            p.close(y, function(w) {
              S && S(E || w);
            });
          });
        });
      }, p.lutimesSync = function(x, b, C) {
        var S = p.openSync(x, o.O_SYMLINK), T, y = !0;
        try {
          T = p.futimesSync(S, b, C), y = !1;
        } finally {
          if (y)
            try {
              p.closeSync(S);
            } catch {
            }
          else
            p.closeSync(S);
        }
        return T;
      }) : p.futimes && (p.lutimes = function(x, b, C, S) {
        S && process.nextTick(S);
      }, p.lutimesSync = function() {
      });
    }
    function e(p) {
      return p && function(x, b, C) {
        return p.call(t, x, b, function(S) {
          f(S) && (S = null), C && C.apply(this, arguments);
        });
      };
    }
    function i(p) {
      return p && function(x, b) {
        try {
          return p.call(t, x, b);
        } catch (C) {
          if (!f(C)) throw C;
        }
      };
    }
    function l(p) {
      return p && function(x, b, C, S) {
        return p.call(t, x, b, C, function(T) {
          f(T) && (T = null), S && S.apply(this, arguments);
        });
      };
    }
    function r(p) {
      return p && function(x, b, C) {
        try {
          return p.call(t, x, b, C);
        } catch (S) {
          if (!f(S)) throw S;
        }
      };
    }
    function u(p) {
      return p && function(x, b, C) {
        typeof b == "function" && (C = b, b = null);
        function S(T, y) {
          y && (y.uid < 0 && (y.uid += 4294967296), y.gid < 0 && (y.gid += 4294967296)), C && C.apply(this, arguments);
        }
        return b ? p.call(t, x, b, S) : p.call(t, x, S);
      };
    }
    function s(p) {
      return p && function(x, b) {
        var C = b ? p.call(t, x, b) : p.call(t, x);
        return C && (C.uid < 0 && (C.uid += 4294967296), C.gid < 0 && (C.gid += 4294967296)), C;
      };
    }
    function f(p) {
      if (!p || p.code === "ENOSYS")
        return !0;
      var x = !process.getuid || process.getuid() !== 0;
      return !!(x && (p.code === "EINVAL" || p.code === "EPERM"));
    }
  }
  return tr;
}
var nr, ao;
function Df() {
  if (ao) return nr;
  ao = 1;
  var o = ut.Stream;
  nr = m;
  function m(v) {
    return {
      ReadStream: h,
      WriteStream: d
    };
    function h(c, t) {
      if (!(this instanceof h)) return new h(c, t);
      o.call(this);
      var a = this;
      this.path = c, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, t = t || {};
      for (var n = Object.keys(t), e = 0, i = n.length; e < i; e++) {
        var l = n[e];
        this[l] = t[l];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          a._read();
        });
        return;
      }
      v.open(this.path, this.flags, this.mode, function(r, u) {
        if (r) {
          a.emit("error", r), a.readable = !1;
          return;
        }
        a.fd = u, a.emit("open", u), a._read();
      });
    }
    function d(c, t) {
      if (!(this instanceof d)) return new d(c, t);
      o.call(this), this.path = c, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, t = t || {};
      for (var a = Object.keys(t), n = 0, e = a.length; n < e; n++) {
        var i = a[n];
        this[i] = t[i];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = v.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return nr;
}
var ir, oo;
function If() {
  if (oo) return ir;
  oo = 1, ir = m;
  var o = Object.getPrototypeOf || function(v) {
    return v.__proto__;
  };
  function m(v) {
    if (v === null || typeof v != "object")
      return v;
    if (v instanceof Object)
      var h = { __proto__: o(v) };
    else
      var h = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(v).forEach(function(d) {
      Object.defineProperty(h, d, Object.getOwnPropertyDescriptor(v, d));
    }), h;
  }
  return ir;
}
var mi, co;
function Je() {
  if (co) return mi;
  co = 1;
  var o = lt, m = Nf(), v = Df(), h = If(), d = Ra, c, t;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (c = Symbol.for("graceful-fs.queue"), t = Symbol.for("graceful-fs.previous")) : (c = "___graceful-fs.queue", t = "___graceful-fs.previous");
  function a() {
  }
  function n(p, x) {
    Object.defineProperty(p, c, {
      get: function() {
        return x;
      }
    });
  }
  var e = a;
  if (d.debuglog ? e = d.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (e = function() {
    var p = d.format.apply(d, arguments);
    p = "GFS4: " + p.split(/\n/).join(`
GFS4: `), console.error(p);
  }), !o[c]) {
    var i = ct[c] || [];
    n(o, i), o.close = (function(p) {
      function x(b, C) {
        return p.call(o, b, function(S) {
          S || s(), typeof C == "function" && C.apply(this, arguments);
        });
      }
      return Object.defineProperty(x, t, {
        value: p
      }), x;
    })(o.close), o.closeSync = (function(p) {
      function x(b) {
        p.apply(o, arguments), s();
      }
      return Object.defineProperty(x, t, {
        value: p
      }), x;
    })(o.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      e(o[c]), bp.equal(o[c].length, 0);
    });
  }
  ct[c] || n(ct, o[c]), mi = l(h(o)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !o.__patched && (mi = l(o), o.__patched = !0);
  function l(p) {
    m(p), p.gracefulify = l, p.createReadStream = ae, p.createWriteStream = oe;
    var x = p.readFile;
    p.readFile = b;
    function b(Z, Se, k) {
      return typeof Se == "function" && (k = Se, Se = null), A(Z, Se, k);
      function A(G, $, me, be) {
        return x(G, $, function(we) {
          we && (we.code === "EMFILE" || we.code === "ENFILE") ? r([A, [G, $, me], we, be || Date.now(), Date.now()]) : typeof me == "function" && me.apply(this, arguments);
        });
      }
    }
    var C = p.writeFile;
    p.writeFile = S;
    function S(Z, Se, k, A) {
      return typeof k == "function" && (A = k, k = null), G(Z, Se, k, A);
      function G($, me, be, we, Re) {
        return C($, me, be, function(Ce) {
          Ce && (Ce.code === "EMFILE" || Ce.code === "ENFILE") ? r([G, [$, me, be, we], Ce, Re || Date.now(), Date.now()]) : typeof we == "function" && we.apply(this, arguments);
        });
      }
    }
    var T = p.appendFile;
    T && (p.appendFile = y);
    function y(Z, Se, k, A) {
      return typeof k == "function" && (A = k, k = null), G(Z, Se, k, A);
      function G($, me, be, we, Re) {
        return T($, me, be, function(Ce) {
          Ce && (Ce.code === "EMFILE" || Ce.code === "ENFILE") ? r([G, [$, me, be, we], Ce, Re || Date.now(), Date.now()]) : typeof we == "function" && we.apply(this, arguments);
        });
      }
    }
    var E = p.copyFile;
    E && (p.copyFile = w);
    function w(Z, Se, k, A) {
      return typeof k == "function" && (A = k, k = 0), G(Z, Se, k, A);
      function G($, me, be, we, Re) {
        return E($, me, be, function(Ce) {
          Ce && (Ce.code === "EMFILE" || Ce.code === "ENFILE") ? r([G, [$, me, be, we], Ce, Re || Date.now(), Date.now()]) : typeof we == "function" && we.apply(this, arguments);
        });
      }
    }
    var _ = p.readdir;
    p.readdir = O;
    var D = /^v[0-5]\./;
    function O(Z, Se, k) {
      typeof Se == "function" && (k = Se, Se = null);
      var A = D.test(process.version) ? function(me, be, we, Re) {
        return _(me, G(
          me,
          be,
          we,
          Re
        ));
      } : function(me, be, we, Re) {
        return _(me, be, G(
          me,
          be,
          we,
          Re
        ));
      };
      return A(Z, Se, k);
      function G($, me, be, we) {
        return function(Re, Ce) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? r([
            A,
            [$, me, be],
            Re,
            we || Date.now(),
            Date.now()
          ]) : (Ce && Ce.sort && Ce.sort(), typeof be == "function" && be.call(this, Re, Ce));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var I = v(p);
      U = I.ReadStream, W = I.WriteStream;
    }
    var q = p.ReadStream;
    q && (U.prototype = Object.create(q.prototype), U.prototype.open = z);
    var R = p.WriteStream;
    R && (W.prototype = Object.create(R.prototype), W.prototype.open = ie), Object.defineProperty(p, "ReadStream", {
      get: function() {
        return U;
      },
      set: function(Z) {
        U = Z;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(p, "WriteStream", {
      get: function() {
        return W;
      },
      set: function(Z) {
        W = Z;
      },
      enumerable: !0,
      configurable: !0
    });
    var N = U;
    Object.defineProperty(p, "FileReadStream", {
      get: function() {
        return N;
      },
      set: function(Z) {
        N = Z;
      },
      enumerable: !0,
      configurable: !0
    });
    var F = W;
    Object.defineProperty(p, "FileWriteStream", {
      get: function() {
        return F;
      },
      set: function(Z) {
        F = Z;
      },
      enumerable: !0,
      configurable: !0
    });
    function U(Z, Se) {
      return this instanceof U ? (q.apply(this, arguments), this) : U.apply(Object.create(U.prototype), arguments);
    }
    function z() {
      var Z = this;
      _e(Z.path, Z.flags, Z.mode, function(Se, k) {
        Se ? (Z.autoClose && Z.destroy(), Z.emit("error", Se)) : (Z.fd = k, Z.emit("open", k), Z.read());
      });
    }
    function W(Z, Se) {
      return this instanceof W ? (R.apply(this, arguments), this) : W.apply(Object.create(W.prototype), arguments);
    }
    function ie() {
      var Z = this;
      _e(Z.path, Z.flags, Z.mode, function(Se, k) {
        Se ? (Z.destroy(), Z.emit("error", Se)) : (Z.fd = k, Z.emit("open", k));
      });
    }
    function ae(Z, Se) {
      return new p.ReadStream(Z, Se);
    }
    function oe(Z, Se) {
      return new p.WriteStream(Z, Se);
    }
    var ye = p.open;
    p.open = _e;
    function _e(Z, Se, k, A) {
      return typeof k == "function" && (A = k, k = null), G(Z, Se, k, A);
      function G($, me, be, we, Re) {
        return ye($, me, be, function(Ce, Be) {
          Ce && (Ce.code === "EMFILE" || Ce.code === "ENFILE") ? r([G, [$, me, be, we], Ce, Re || Date.now(), Date.now()]) : typeof we == "function" && we.apply(this, arguments);
        });
      }
    }
    return p;
  }
  function r(p) {
    e("ENQUEUE", p[0].name, p[1]), o[c].push(p), f();
  }
  var u;
  function s() {
    for (var p = Date.now(), x = 0; x < o[c].length; ++x)
      o[c][x].length > 2 && (o[c][x][3] = p, o[c][x][4] = p);
    f();
  }
  function f() {
    if (clearTimeout(u), u = void 0, o[c].length !== 0) {
      var p = o[c].shift(), x = p[0], b = p[1], C = p[2], S = p[3], T = p[4];
      if (S === void 0)
        e("RETRY", x.name, b), x.apply(null, b);
      else if (Date.now() - S >= 6e4) {
        e("TIMEOUT", x.name, b);
        var y = b.pop();
        typeof y == "function" && y.call(null, C);
      } else {
        var E = Date.now() - T, w = Math.max(T - S, 1), _ = Math.min(w * 1.2, 100);
        E >= _ ? (e("RETRY", x.name, b), x.apply(null, b.concat([S]))) : o[c].push(p);
      }
      u === void 0 && (u = setTimeout(f, 0));
    }
  }
  return mi;
}
var lo;
function cn() {
  return lo || (lo = 1, (function(o) {
    const m = et().fromCallback, v = Je(), h = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((d) => typeof v[d] == "function");
    Object.assign(o, v), h.forEach((d) => {
      o[d] = m(v[d]);
    }), o.exists = function(d, c) {
      return typeof c == "function" ? v.exists(d, c) : new Promise((t) => v.exists(d, t));
    }, o.read = function(d, c, t, a, n, e) {
      return typeof e == "function" ? v.read(d, c, t, a, n, e) : new Promise((i, l) => {
        v.read(d, c, t, a, n, (r, u, s) => {
          if (r) return l(r);
          i({ bytesRead: u, buffer: s });
        });
      });
    }, o.write = function(d, c, ...t) {
      return typeof t[t.length - 1] == "function" ? v.write(d, c, ...t) : new Promise((a, n) => {
        v.write(d, c, ...t, (e, i, l) => {
          if (e) return n(e);
          a({ bytesWritten: i, buffer: l });
        });
      });
    }, typeof v.writev == "function" && (o.writev = function(d, c, ...t) {
      return typeof t[t.length - 1] == "function" ? v.writev(d, c, ...t) : new Promise((a, n) => {
        v.writev(d, c, ...t, (e, i, l) => {
          if (e) return n(e);
          a({ bytesWritten: i, buffers: l });
        });
      });
    }), typeof v.realpath.native == "function" ? o.realpath.native = m(v.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  })(er)), er;
}
var vi = {}, rr = {}, uo;
function Lf() {
  if (uo) return rr;
  uo = 1;
  const o = De;
  return rr.checkPath = function(v) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(v.replace(o.parse(v).root, ""))) {
      const d = new Error(`Path contains invalid characters: ${v}`);
      throw d.code = "EINVAL", d;
    }
  }, rr;
}
var po;
function Ff() {
  if (po) return vi;
  po = 1;
  const o = /* @__PURE__ */ cn(), { checkPath: m } = /* @__PURE__ */ Lf(), v = (h) => {
    const d = { mode: 511 };
    return typeof h == "number" ? h : { ...d, ...h }.mode;
  };
  return vi.makeDir = async (h, d) => (m(h), o.mkdir(h, {
    mode: v(d),
    recursive: !0
  })), vi.makeDirSync = (h, d) => (m(h), o.mkdirSync(h, {
    mode: v(d),
    recursive: !0
  })), vi;
}
var sr, fo;
function mt() {
  if (fo) return sr;
  fo = 1;
  const o = et().fromPromise, { makeDir: m, makeDirSync: v } = /* @__PURE__ */ Ff(), h = o(m);
  return sr = {
    mkdirs: h,
    mkdirsSync: v,
    // alias
    mkdirp: h,
    mkdirpSync: v,
    ensureDir: h,
    ensureDirSync: v
  }, sr;
}
var ar, ho;
function Yt() {
  if (ho) return ar;
  ho = 1;
  const o = et().fromPromise, m = /* @__PURE__ */ cn();
  function v(h) {
    return m.access(h).then(() => !0).catch(() => !1);
  }
  return ar = {
    pathExists: o(v),
    pathExistsSync: m.existsSync
  }, ar;
}
var or, mo;
function _p() {
  if (mo) return or;
  mo = 1;
  const o = Je();
  function m(h, d, c, t) {
    o.open(h, "r+", (a, n) => {
      if (a) return t(a);
      o.futimes(n, d, c, (e) => {
        o.close(n, (i) => {
          t && t(e || i);
        });
      });
    });
  }
  function v(h, d, c) {
    const t = o.openSync(h, "r+");
    return o.futimesSync(t, d, c), o.closeSync(t);
  }
  return or = {
    utimesMillis: m,
    utimesMillisSync: v
  }, or;
}
var cr, vo;
function ln() {
  if (vo) return cr;
  vo = 1;
  const o = /* @__PURE__ */ cn(), m = De, v = Ra;
  function h(r, u, s) {
    const f = s.dereference ? (p) => o.stat(p, { bigint: !0 }) : (p) => o.lstat(p, { bigint: !0 });
    return Promise.all([
      f(r),
      f(u).catch((p) => {
        if (p.code === "ENOENT") return null;
        throw p;
      })
    ]).then(([p, x]) => ({ srcStat: p, destStat: x }));
  }
  function d(r, u, s) {
    let f;
    const p = s.dereference ? (b) => o.statSync(b, { bigint: !0 }) : (b) => o.lstatSync(b, { bigint: !0 }), x = p(r);
    try {
      f = p(u);
    } catch (b) {
      if (b.code === "ENOENT") return { srcStat: x, destStat: null };
      throw b;
    }
    return { srcStat: x, destStat: f };
  }
  function c(r, u, s, f, p) {
    v.callbackify(h)(r, u, f, (x, b) => {
      if (x) return p(x);
      const { srcStat: C, destStat: S } = b;
      if (S) {
        if (e(C, S)) {
          const T = m.basename(r), y = m.basename(u);
          return s === "move" && T !== y && T.toLowerCase() === y.toLowerCase() ? p(null, { srcStat: C, destStat: S, isChangingCase: !0 }) : p(new Error("Source and destination must not be the same."));
        }
        if (C.isDirectory() && !S.isDirectory())
          return p(new Error(`Cannot overwrite non-directory '${u}' with directory '${r}'.`));
        if (!C.isDirectory() && S.isDirectory())
          return p(new Error(`Cannot overwrite directory '${u}' with non-directory '${r}'.`));
      }
      return C.isDirectory() && i(r, u) ? p(new Error(l(r, u, s))) : p(null, { srcStat: C, destStat: S });
    });
  }
  function t(r, u, s, f) {
    const { srcStat: p, destStat: x } = d(r, u, f);
    if (x) {
      if (e(p, x)) {
        const b = m.basename(r), C = m.basename(u);
        if (s === "move" && b !== C && b.toLowerCase() === C.toLowerCase())
          return { srcStat: p, destStat: x, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (p.isDirectory() && !x.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${u}' with directory '${r}'.`);
      if (!p.isDirectory() && x.isDirectory())
        throw new Error(`Cannot overwrite directory '${u}' with non-directory '${r}'.`);
    }
    if (p.isDirectory() && i(r, u))
      throw new Error(l(r, u, s));
    return { srcStat: p, destStat: x };
  }
  function a(r, u, s, f, p) {
    const x = m.resolve(m.dirname(r)), b = m.resolve(m.dirname(s));
    if (b === x || b === m.parse(b).root) return p();
    o.stat(b, { bigint: !0 }, (C, S) => C ? C.code === "ENOENT" ? p() : p(C) : e(u, S) ? p(new Error(l(r, s, f))) : a(r, u, b, f, p));
  }
  function n(r, u, s, f) {
    const p = m.resolve(m.dirname(r)), x = m.resolve(m.dirname(s));
    if (x === p || x === m.parse(x).root) return;
    let b;
    try {
      b = o.statSync(x, { bigint: !0 });
    } catch (C) {
      if (C.code === "ENOENT") return;
      throw C;
    }
    if (e(u, b))
      throw new Error(l(r, s, f));
    return n(r, u, x, f);
  }
  function e(r, u) {
    return u.ino && u.dev && u.ino === r.ino && u.dev === r.dev;
  }
  function i(r, u) {
    const s = m.resolve(r).split(m.sep).filter((p) => p), f = m.resolve(u).split(m.sep).filter((p) => p);
    return s.reduce((p, x, b) => p && f[b] === x, !0);
  }
  function l(r, u, s) {
    return `Cannot ${s} '${r}' to a subdirectory of itself, '${u}'.`;
  }
  return cr = {
    checkPaths: c,
    checkPathsSync: t,
    checkParentPaths: a,
    checkParentPathsSync: n,
    isSrcSubdir: i,
    areIdentical: e
  }, cr;
}
var lr, go;
function Uf() {
  if (go) return lr;
  go = 1;
  const o = Je(), m = De, v = mt().mkdirs, h = Yt().pathExists, d = _p().utimesMillis, c = /* @__PURE__ */ ln();
  function t(O, I, q, R) {
    typeof q == "function" && !R ? (R = q, q = {}) : typeof q == "function" && (q = { filter: q }), R = R || function() {
    }, q = q || {}, q.clobber = "clobber" in q ? !!q.clobber : !0, q.overwrite = "overwrite" in q ? !!q.overwrite : q.clobber, q.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), c.checkPaths(O, I, "copy", q, (N, F) => {
      if (N) return R(N);
      const { srcStat: U, destStat: z } = F;
      c.checkParentPaths(O, U, I, "copy", (W) => W ? R(W) : q.filter ? n(a, z, O, I, q, R) : a(z, O, I, q, R));
    });
  }
  function a(O, I, q, R, N) {
    const F = m.dirname(q);
    h(F, (U, z) => {
      if (U) return N(U);
      if (z) return i(O, I, q, R, N);
      v(F, (W) => W ? N(W) : i(O, I, q, R, N));
    });
  }
  function n(O, I, q, R, N, F) {
    Promise.resolve(N.filter(q, R)).then((U) => U ? O(I, q, R, N, F) : F(), (U) => F(U));
  }
  function e(O, I, q, R, N) {
    return R.filter ? n(i, O, I, q, R, N) : i(O, I, q, R, N);
  }
  function i(O, I, q, R, N) {
    (R.dereference ? o.stat : o.lstat)(I, (U, z) => U ? N(U) : z.isDirectory() ? S(z, O, I, q, R, N) : z.isFile() || z.isCharacterDevice() || z.isBlockDevice() ? l(z, O, I, q, R, N) : z.isSymbolicLink() ? _(O, I, q, R, N) : z.isSocket() ? N(new Error(`Cannot copy a socket file: ${I}`)) : z.isFIFO() ? N(new Error(`Cannot copy a FIFO pipe: ${I}`)) : N(new Error(`Unknown file: ${I}`)));
  }
  function l(O, I, q, R, N, F) {
    return I ? r(O, q, R, N, F) : u(O, q, R, N, F);
  }
  function r(O, I, q, R, N) {
    if (R.overwrite)
      o.unlink(q, (F) => F ? N(F) : u(O, I, q, R, N));
    else return R.errorOnExist ? N(new Error(`'${q}' already exists`)) : N();
  }
  function u(O, I, q, R, N) {
    o.copyFile(I, q, (F) => F ? N(F) : R.preserveTimestamps ? s(O.mode, I, q, N) : b(q, O.mode, N));
  }
  function s(O, I, q, R) {
    return f(O) ? p(q, O, (N) => N ? R(N) : x(O, I, q, R)) : x(O, I, q, R);
  }
  function f(O) {
    return (O & 128) === 0;
  }
  function p(O, I, q) {
    return b(O, I | 128, q);
  }
  function x(O, I, q, R) {
    C(I, q, (N) => N ? R(N) : b(q, O, R));
  }
  function b(O, I, q) {
    return o.chmod(O, I, q);
  }
  function C(O, I, q) {
    o.stat(O, (R, N) => R ? q(R) : d(I, N.atime, N.mtime, q));
  }
  function S(O, I, q, R, N, F) {
    return I ? y(q, R, N, F) : T(O.mode, q, R, N, F);
  }
  function T(O, I, q, R, N) {
    o.mkdir(q, (F) => {
      if (F) return N(F);
      y(I, q, R, (U) => U ? N(U) : b(q, O, N));
    });
  }
  function y(O, I, q, R) {
    o.readdir(O, (N, F) => N ? R(N) : E(F, O, I, q, R));
  }
  function E(O, I, q, R, N) {
    const F = O.pop();
    return F ? w(O, F, I, q, R, N) : N();
  }
  function w(O, I, q, R, N, F) {
    const U = m.join(q, I), z = m.join(R, I);
    c.checkPaths(U, z, "copy", N, (W, ie) => {
      if (W) return F(W);
      const { destStat: ae } = ie;
      e(ae, U, z, N, (oe) => oe ? F(oe) : E(O, q, R, N, F));
    });
  }
  function _(O, I, q, R, N) {
    o.readlink(I, (F, U) => {
      if (F) return N(F);
      if (R.dereference && (U = m.resolve(process.cwd(), U)), O)
        o.readlink(q, (z, W) => z ? z.code === "EINVAL" || z.code === "UNKNOWN" ? o.symlink(U, q, N) : N(z) : (R.dereference && (W = m.resolve(process.cwd(), W)), c.isSrcSubdir(U, W) ? N(new Error(`Cannot copy '${U}' to a subdirectory of itself, '${W}'.`)) : O.isDirectory() && c.isSrcSubdir(W, U) ? N(new Error(`Cannot overwrite '${W}' with '${U}'.`)) : D(U, q, N)));
      else
        return o.symlink(U, q, N);
    });
  }
  function D(O, I, q) {
    o.unlink(I, (R) => R ? q(R) : o.symlink(O, I, q));
  }
  return lr = t, lr;
}
var ur, xo;
function qf() {
  if (xo) return ur;
  xo = 1;
  const o = Je(), m = De, v = mt().mkdirsSync, h = _p().utimesMillisSync, d = /* @__PURE__ */ ln();
  function c(E, w, _) {
    typeof _ == "function" && (_ = { filter: _ }), _ = _ || {}, _.clobber = "clobber" in _ ? !!_.clobber : !0, _.overwrite = "overwrite" in _ ? !!_.overwrite : _.clobber, _.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: D, destStat: O } = d.checkPathsSync(E, w, "copy", _);
    return d.checkParentPathsSync(E, D, w, "copy"), t(O, E, w, _);
  }
  function t(E, w, _, D) {
    if (D.filter && !D.filter(w, _)) return;
    const O = m.dirname(_);
    return o.existsSync(O) || v(O), n(E, w, _, D);
  }
  function a(E, w, _, D) {
    if (!(D.filter && !D.filter(w, _)))
      return n(E, w, _, D);
  }
  function n(E, w, _, D) {
    const I = (D.dereference ? o.statSync : o.lstatSync)(w);
    if (I.isDirectory()) return x(I, E, w, _, D);
    if (I.isFile() || I.isCharacterDevice() || I.isBlockDevice()) return e(I, E, w, _, D);
    if (I.isSymbolicLink()) return T(E, w, _, D);
    throw I.isSocket() ? new Error(`Cannot copy a socket file: ${w}`) : I.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${w}`) : new Error(`Unknown file: ${w}`);
  }
  function e(E, w, _, D, O) {
    return w ? i(E, _, D, O) : l(E, _, D, O);
  }
  function i(E, w, _, D) {
    if (D.overwrite)
      return o.unlinkSync(_), l(E, w, _, D);
    if (D.errorOnExist)
      throw new Error(`'${_}' already exists`);
  }
  function l(E, w, _, D) {
    return o.copyFileSync(w, _), D.preserveTimestamps && r(E.mode, w, _), f(_, E.mode);
  }
  function r(E, w, _) {
    return u(E) && s(_, E), p(w, _);
  }
  function u(E) {
    return (E & 128) === 0;
  }
  function s(E, w) {
    return f(E, w | 128);
  }
  function f(E, w) {
    return o.chmodSync(E, w);
  }
  function p(E, w) {
    const _ = o.statSync(E);
    return h(w, _.atime, _.mtime);
  }
  function x(E, w, _, D, O) {
    return w ? C(_, D, O) : b(E.mode, _, D, O);
  }
  function b(E, w, _, D) {
    return o.mkdirSync(_), C(w, _, D), f(_, E);
  }
  function C(E, w, _) {
    o.readdirSync(E).forEach((D) => S(D, E, w, _));
  }
  function S(E, w, _, D) {
    const O = m.join(w, E), I = m.join(_, E), { destStat: q } = d.checkPathsSync(O, I, "copy", D);
    return a(q, O, I, D);
  }
  function T(E, w, _, D) {
    let O = o.readlinkSync(w);
    if (D.dereference && (O = m.resolve(process.cwd(), O)), E) {
      let I;
      try {
        I = o.readlinkSync(_);
      } catch (q) {
        if (q.code === "EINVAL" || q.code === "UNKNOWN") return o.symlinkSync(O, _);
        throw q;
      }
      if (D.dereference && (I = m.resolve(process.cwd(), I)), d.isSrcSubdir(O, I))
        throw new Error(`Cannot copy '${O}' to a subdirectory of itself, '${I}'.`);
      if (o.statSync(_).isDirectory() && d.isSrcSubdir(I, O))
        throw new Error(`Cannot overwrite '${I}' with '${O}'.`);
      return y(O, _);
    } else
      return o.symlinkSync(O, _);
  }
  function y(E, w) {
    return o.unlinkSync(w), o.symlinkSync(E, w);
  }
  return ur = c, ur;
}
var pr, yo;
function Aa() {
  if (yo) return pr;
  yo = 1;
  const o = et().fromCallback;
  return pr = {
    copy: o(/* @__PURE__ */ Uf()),
    copySync: /* @__PURE__ */ qf()
  }, pr;
}
var dr, bo;
function $f() {
  if (bo) return dr;
  bo = 1;
  const o = Je(), m = De, v = bp, h = process.platform === "win32";
  function d(s) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((p) => {
      s[p] = s[p] || o[p], p = p + "Sync", s[p] = s[p] || o[p];
    }), s.maxBusyTries = s.maxBusyTries || 3;
  }
  function c(s, f, p) {
    let x = 0;
    typeof f == "function" && (p = f, f = {}), v(s, "rimraf: missing path"), v.strictEqual(typeof s, "string", "rimraf: path should be a string"), v.strictEqual(typeof p, "function", "rimraf: callback function required"), v(f, "rimraf: invalid options argument provided"), v.strictEqual(typeof f, "object", "rimraf: options should be object"), d(f), t(s, f, function b(C) {
      if (C) {
        if ((C.code === "EBUSY" || C.code === "ENOTEMPTY" || C.code === "EPERM") && x < f.maxBusyTries) {
          x++;
          const S = x * 100;
          return setTimeout(() => t(s, f, b), S);
        }
        C.code === "ENOENT" && (C = null);
      }
      p(C);
    });
  }
  function t(s, f, p) {
    v(s), v(f), v(typeof p == "function"), f.lstat(s, (x, b) => {
      if (x && x.code === "ENOENT")
        return p(null);
      if (x && x.code === "EPERM" && h)
        return a(s, f, x, p);
      if (b && b.isDirectory())
        return e(s, f, x, p);
      f.unlink(s, (C) => {
        if (C) {
          if (C.code === "ENOENT")
            return p(null);
          if (C.code === "EPERM")
            return h ? a(s, f, C, p) : e(s, f, C, p);
          if (C.code === "EISDIR")
            return e(s, f, C, p);
        }
        return p(C);
      });
    });
  }
  function a(s, f, p, x) {
    v(s), v(f), v(typeof x == "function"), f.chmod(s, 438, (b) => {
      b ? x(b.code === "ENOENT" ? null : p) : f.stat(s, (C, S) => {
        C ? x(C.code === "ENOENT" ? null : p) : S.isDirectory() ? e(s, f, p, x) : f.unlink(s, x);
      });
    });
  }
  function n(s, f, p) {
    let x;
    v(s), v(f);
    try {
      f.chmodSync(s, 438);
    } catch (b) {
      if (b.code === "ENOENT")
        return;
      throw p;
    }
    try {
      x = f.statSync(s);
    } catch (b) {
      if (b.code === "ENOENT")
        return;
      throw p;
    }
    x.isDirectory() ? r(s, f, p) : f.unlinkSync(s);
  }
  function e(s, f, p, x) {
    v(s), v(f), v(typeof x == "function"), f.rmdir(s, (b) => {
      b && (b.code === "ENOTEMPTY" || b.code === "EEXIST" || b.code === "EPERM") ? i(s, f, x) : b && b.code === "ENOTDIR" ? x(p) : x(b);
    });
  }
  function i(s, f, p) {
    v(s), v(f), v(typeof p == "function"), f.readdir(s, (x, b) => {
      if (x) return p(x);
      let C = b.length, S;
      if (C === 0) return f.rmdir(s, p);
      b.forEach((T) => {
        c(m.join(s, T), f, (y) => {
          if (!S) {
            if (y) return p(S = y);
            --C === 0 && f.rmdir(s, p);
          }
        });
      });
    });
  }
  function l(s, f) {
    let p;
    f = f || {}, d(f), v(s, "rimraf: missing path"), v.strictEqual(typeof s, "string", "rimraf: path should be a string"), v(f, "rimraf: missing options"), v.strictEqual(typeof f, "object", "rimraf: options should be object");
    try {
      p = f.lstatSync(s);
    } catch (x) {
      if (x.code === "ENOENT")
        return;
      x.code === "EPERM" && h && n(s, f, x);
    }
    try {
      p && p.isDirectory() ? r(s, f, null) : f.unlinkSync(s);
    } catch (x) {
      if (x.code === "ENOENT")
        return;
      if (x.code === "EPERM")
        return h ? n(s, f, x) : r(s, f, x);
      if (x.code !== "EISDIR")
        throw x;
      r(s, f, x);
    }
  }
  function r(s, f, p) {
    v(s), v(f);
    try {
      f.rmdirSync(s);
    } catch (x) {
      if (x.code === "ENOTDIR")
        throw p;
      if (x.code === "ENOTEMPTY" || x.code === "EEXIST" || x.code === "EPERM")
        u(s, f);
      else if (x.code !== "ENOENT")
        throw x;
    }
  }
  function u(s, f) {
    if (v(s), v(f), f.readdirSync(s).forEach((p) => l(m.join(s, p), f)), h) {
      const p = Date.now();
      do
        try {
          return f.rmdirSync(s, f);
        } catch {
        }
      while (Date.now() - p < 500);
    } else
      return f.rmdirSync(s, f);
  }
  return dr = c, c.sync = l, dr;
}
var fr, wo;
function ji() {
  if (wo) return fr;
  wo = 1;
  const o = Je(), m = et().fromCallback, v = /* @__PURE__ */ $f();
  function h(c, t) {
    if (o.rm) return o.rm(c, { recursive: !0, force: !0 }, t);
    v(c, t);
  }
  function d(c) {
    if (o.rmSync) return o.rmSync(c, { recursive: !0, force: !0 });
    v.sync(c);
  }
  return fr = {
    remove: m(h),
    removeSync: d
  }, fr;
}
var hr, _o;
function Bf() {
  if (_o) return hr;
  _o = 1;
  const o = et().fromPromise, m = /* @__PURE__ */ cn(), v = De, h = /* @__PURE__ */ mt(), d = /* @__PURE__ */ ji(), c = o(async function(n) {
    let e;
    try {
      e = await m.readdir(n);
    } catch {
      return h.mkdirs(n);
    }
    return Promise.all(e.map((i) => d.remove(v.join(n, i))));
  });
  function t(a) {
    let n;
    try {
      n = m.readdirSync(a);
    } catch {
      return h.mkdirsSync(a);
    }
    n.forEach((e) => {
      e = v.join(a, e), d.removeSync(e);
    });
  }
  return hr = {
    emptyDirSync: t,
    emptydirSync: t,
    emptyDir: c,
    emptydir: c
  }, hr;
}
var mr, Eo;
function jf() {
  if (Eo) return mr;
  Eo = 1;
  const o = et().fromCallback, m = De, v = Je(), h = /* @__PURE__ */ mt();
  function d(t, a) {
    function n() {
      v.writeFile(t, "", (e) => {
        if (e) return a(e);
        a();
      });
    }
    v.stat(t, (e, i) => {
      if (!e && i.isFile()) return a();
      const l = m.dirname(t);
      v.stat(l, (r, u) => {
        if (r)
          return r.code === "ENOENT" ? h.mkdirs(l, (s) => {
            if (s) return a(s);
            n();
          }) : a(r);
        u.isDirectory() ? n() : v.readdir(l, (s) => {
          if (s) return a(s);
        });
      });
    });
  }
  function c(t) {
    let a;
    try {
      a = v.statSync(t);
    } catch {
    }
    if (a && a.isFile()) return;
    const n = m.dirname(t);
    try {
      v.statSync(n).isDirectory() || v.readdirSync(n);
    } catch (e) {
      if (e && e.code === "ENOENT") h.mkdirsSync(n);
      else throw e;
    }
    v.writeFileSync(t, "");
  }
  return mr = {
    createFile: o(d),
    createFileSync: c
  }, mr;
}
var vr, So;
function Mf() {
  if (So) return vr;
  So = 1;
  const o = et().fromCallback, m = De, v = Je(), h = /* @__PURE__ */ mt(), d = Yt().pathExists, { areIdentical: c } = /* @__PURE__ */ ln();
  function t(n, e, i) {
    function l(r, u) {
      v.link(r, u, (s) => {
        if (s) return i(s);
        i(null);
      });
    }
    v.lstat(e, (r, u) => {
      v.lstat(n, (s, f) => {
        if (s)
          return s.message = s.message.replace("lstat", "ensureLink"), i(s);
        if (u && c(f, u)) return i(null);
        const p = m.dirname(e);
        d(p, (x, b) => {
          if (x) return i(x);
          if (b) return l(n, e);
          h.mkdirs(p, (C) => {
            if (C) return i(C);
            l(n, e);
          });
        });
      });
    });
  }
  function a(n, e) {
    let i;
    try {
      i = v.lstatSync(e);
    } catch {
    }
    try {
      const u = v.lstatSync(n);
      if (i && c(u, i)) return;
    } catch (u) {
      throw u.message = u.message.replace("lstat", "ensureLink"), u;
    }
    const l = m.dirname(e);
    return v.existsSync(l) || h.mkdirsSync(l), v.linkSync(n, e);
  }
  return vr = {
    createLink: o(t),
    createLinkSync: a
  }, vr;
}
var gr, To;
function Hf() {
  if (To) return gr;
  To = 1;
  const o = De, m = Je(), v = Yt().pathExists;
  function h(c, t, a) {
    if (o.isAbsolute(c))
      return m.lstat(c, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), a(n)) : a(null, {
        toCwd: c,
        toDst: c
      }));
    {
      const n = o.dirname(t), e = o.join(n, c);
      return v(e, (i, l) => i ? a(i) : l ? a(null, {
        toCwd: e,
        toDst: c
      }) : m.lstat(c, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), a(r)) : a(null, {
        toCwd: c,
        toDst: o.relative(n, c)
      })));
    }
  }
  function d(c, t) {
    let a;
    if (o.isAbsolute(c)) {
      if (a = m.existsSync(c), !a) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: c,
        toDst: c
      };
    } else {
      const n = o.dirname(t), e = o.join(n, c);
      if (a = m.existsSync(e), a)
        return {
          toCwd: e,
          toDst: c
        };
      if (a = m.existsSync(c), !a) throw new Error("relative srcpath does not exist");
      return {
        toCwd: c,
        toDst: o.relative(n, c)
      };
    }
  }
  return gr = {
    symlinkPaths: h,
    symlinkPathsSync: d
  }, gr;
}
var xr, Co;
function zf() {
  if (Co) return xr;
  Co = 1;
  const o = Je();
  function m(h, d, c) {
    if (c = typeof d == "function" ? d : c, d = typeof d == "function" ? !1 : d, d) return c(null, d);
    o.lstat(h, (t, a) => {
      if (t) return c(null, "file");
      d = a && a.isDirectory() ? "dir" : "file", c(null, d);
    });
  }
  function v(h, d) {
    let c;
    if (d) return d;
    try {
      c = o.lstatSync(h);
    } catch {
      return "file";
    }
    return c && c.isDirectory() ? "dir" : "file";
  }
  return xr = {
    symlinkType: m,
    symlinkTypeSync: v
  }, xr;
}
var yr, Ro;
function Gf() {
  if (Ro) return yr;
  Ro = 1;
  const o = et().fromCallback, m = De, v = /* @__PURE__ */ cn(), h = /* @__PURE__ */ mt(), d = h.mkdirs, c = h.mkdirsSync, t = /* @__PURE__ */ Hf(), a = t.symlinkPaths, n = t.symlinkPathsSync, e = /* @__PURE__ */ zf(), i = e.symlinkType, l = e.symlinkTypeSync, r = Yt().pathExists, { areIdentical: u } = /* @__PURE__ */ ln();
  function s(x, b, C, S) {
    S = typeof C == "function" ? C : S, C = typeof C == "function" ? !1 : C, v.lstat(b, (T, y) => {
      !T && y.isSymbolicLink() ? Promise.all([
        v.stat(x),
        v.stat(b)
      ]).then(([E, w]) => {
        if (u(E, w)) return S(null);
        f(x, b, C, S);
      }) : f(x, b, C, S);
    });
  }
  function f(x, b, C, S) {
    a(x, b, (T, y) => {
      if (T) return S(T);
      x = y.toDst, i(y.toCwd, C, (E, w) => {
        if (E) return S(E);
        const _ = m.dirname(b);
        r(_, (D, O) => {
          if (D) return S(D);
          if (O) return v.symlink(x, b, w, S);
          d(_, (I) => {
            if (I) return S(I);
            v.symlink(x, b, w, S);
          });
        });
      });
    });
  }
  function p(x, b, C) {
    let S;
    try {
      S = v.lstatSync(b);
    } catch {
    }
    if (S && S.isSymbolicLink()) {
      const w = v.statSync(x), _ = v.statSync(b);
      if (u(w, _)) return;
    }
    const T = n(x, b);
    x = T.toDst, C = l(T.toCwd, C);
    const y = m.dirname(b);
    return v.existsSync(y) || c(y), v.symlinkSync(x, b, C);
  }
  return yr = {
    createSymlink: o(s),
    createSymlinkSync: p
  }, yr;
}
var br, Ao;
function Wf() {
  if (Ao) return br;
  Ao = 1;
  const { createFile: o, createFileSync: m } = /* @__PURE__ */ jf(), { createLink: v, createLinkSync: h } = /* @__PURE__ */ Mf(), { createSymlink: d, createSymlinkSync: c } = /* @__PURE__ */ Gf();
  return br = {
    // file
    createFile: o,
    createFileSync: m,
    ensureFile: o,
    ensureFileSync: m,
    // link
    createLink: v,
    createLinkSync: h,
    ensureLink: v,
    ensureLinkSync: h,
    // symlink
    createSymlink: d,
    createSymlinkSync: c,
    ensureSymlink: d,
    ensureSymlinkSync: c
  }, br;
}
var wr, ko;
function ka() {
  if (ko) return wr;
  ko = 1;
  function o(v, { EOL: h = `
`, finalEOL: d = !0, replacer: c = null, spaces: t } = {}) {
    const a = d ? h : "";
    return JSON.stringify(v, c, t).replace(/\n/g, h) + a;
  }
  function m(v) {
    return Buffer.isBuffer(v) && (v = v.toString("utf8")), v.replace(/^\uFEFF/, "");
  }
  return wr = { stringify: o, stripBom: m }, wr;
}
var _r, Oo;
function Vf() {
  if (Oo) return _r;
  Oo = 1;
  let o;
  try {
    o = Je();
  } catch {
    o = lt;
  }
  const m = et(), { stringify: v, stripBom: h } = ka();
  async function d(i, l = {}) {
    typeof l == "string" && (l = { encoding: l });
    const r = l.fs || o, u = "throws" in l ? l.throws : !0;
    let s = await m.fromCallback(r.readFile)(i, l);
    s = h(s);
    let f;
    try {
      f = JSON.parse(s, l ? l.reviver : null);
    } catch (p) {
      if (u)
        throw p.message = `${i}: ${p.message}`, p;
      return null;
    }
    return f;
  }
  const c = m.fromPromise(d);
  function t(i, l = {}) {
    typeof l == "string" && (l = { encoding: l });
    const r = l.fs || o, u = "throws" in l ? l.throws : !0;
    try {
      let s = r.readFileSync(i, l);
      return s = h(s), JSON.parse(s, l.reviver);
    } catch (s) {
      if (u)
        throw s.message = `${i}: ${s.message}`, s;
      return null;
    }
  }
  async function a(i, l, r = {}) {
    const u = r.fs || o, s = v(l, r);
    await m.fromCallback(u.writeFile)(i, s, r);
  }
  const n = m.fromPromise(a);
  function e(i, l, r = {}) {
    const u = r.fs || o, s = v(l, r);
    return u.writeFileSync(i, s, r);
  }
  return _r = {
    readFile: c,
    readFileSync: t,
    writeFile: n,
    writeFileSync: e
  }, _r;
}
var Er, Po;
function Yf() {
  if (Po) return Er;
  Po = 1;
  const o = Vf();
  return Er = {
    // jsonfile exports
    readJson: o.readFile,
    readJsonSync: o.readFileSync,
    writeJson: o.writeFile,
    writeJsonSync: o.writeFileSync
  }, Er;
}
var Sr, No;
function Oa() {
  if (No) return Sr;
  No = 1;
  const o = et().fromCallback, m = Je(), v = De, h = /* @__PURE__ */ mt(), d = Yt().pathExists;
  function c(a, n, e, i) {
    typeof e == "function" && (i = e, e = "utf8");
    const l = v.dirname(a);
    d(l, (r, u) => {
      if (r) return i(r);
      if (u) return m.writeFile(a, n, e, i);
      h.mkdirs(l, (s) => {
        if (s) return i(s);
        m.writeFile(a, n, e, i);
      });
    });
  }
  function t(a, ...n) {
    const e = v.dirname(a);
    if (m.existsSync(e))
      return m.writeFileSync(a, ...n);
    h.mkdirsSync(e), m.writeFileSync(a, ...n);
  }
  return Sr = {
    outputFile: o(c),
    outputFileSync: t
  }, Sr;
}
var Tr, Do;
function Kf() {
  if (Do) return Tr;
  Do = 1;
  const { stringify: o } = ka(), { outputFile: m } = /* @__PURE__ */ Oa();
  async function v(h, d, c = {}) {
    const t = o(d, c);
    await m(h, t, c);
  }
  return Tr = v, Tr;
}
var Cr, Io;
function Xf() {
  if (Io) return Cr;
  Io = 1;
  const { stringify: o } = ka(), { outputFileSync: m } = /* @__PURE__ */ Oa();
  function v(h, d, c) {
    const t = o(d, c);
    m(h, t, c);
  }
  return Cr = v, Cr;
}
var Rr, Lo;
function Jf() {
  if (Lo) return Rr;
  Lo = 1;
  const o = et().fromPromise, m = /* @__PURE__ */ Yf();
  return m.outputJson = o(/* @__PURE__ */ Kf()), m.outputJsonSync = /* @__PURE__ */ Xf(), m.outputJSON = m.outputJson, m.outputJSONSync = m.outputJsonSync, m.writeJSON = m.writeJson, m.writeJSONSync = m.writeJsonSync, m.readJSON = m.readJson, m.readJSONSync = m.readJsonSync, Rr = m, Rr;
}
var Ar, Fo;
function Qf() {
  if (Fo) return Ar;
  Fo = 1;
  const o = Je(), m = De, v = Aa().copy, h = ji().remove, d = mt().mkdirp, c = Yt().pathExists, t = /* @__PURE__ */ ln();
  function a(r, u, s, f) {
    typeof s == "function" && (f = s, s = {}), s = s || {};
    const p = s.overwrite || s.clobber || !1;
    t.checkPaths(r, u, "move", s, (x, b) => {
      if (x) return f(x);
      const { srcStat: C, isChangingCase: S = !1 } = b;
      t.checkParentPaths(r, C, u, "move", (T) => {
        if (T) return f(T);
        if (n(u)) return e(r, u, p, S, f);
        d(m.dirname(u), (y) => y ? f(y) : e(r, u, p, S, f));
      });
    });
  }
  function n(r) {
    const u = m.dirname(r);
    return m.parse(u).root === u;
  }
  function e(r, u, s, f, p) {
    if (f) return i(r, u, s, p);
    if (s)
      return h(u, (x) => x ? p(x) : i(r, u, s, p));
    c(u, (x, b) => x ? p(x) : b ? p(new Error("dest already exists.")) : i(r, u, s, p));
  }
  function i(r, u, s, f) {
    o.rename(r, u, (p) => p ? p.code !== "EXDEV" ? f(p) : l(r, u, s, f) : f());
  }
  function l(r, u, s, f) {
    v(r, u, {
      overwrite: s,
      errorOnExist: !0
    }, (x) => x ? f(x) : h(r, f));
  }
  return Ar = a, Ar;
}
var kr, Uo;
function Zf() {
  if (Uo) return kr;
  Uo = 1;
  const o = Je(), m = De, v = Aa().copySync, h = ji().removeSync, d = mt().mkdirpSync, c = /* @__PURE__ */ ln();
  function t(l, r, u) {
    u = u || {};
    const s = u.overwrite || u.clobber || !1, { srcStat: f, isChangingCase: p = !1 } = c.checkPathsSync(l, r, "move", u);
    return c.checkParentPathsSync(l, f, r, "move"), a(r) || d(m.dirname(r)), n(l, r, s, p);
  }
  function a(l) {
    const r = m.dirname(l);
    return m.parse(r).root === r;
  }
  function n(l, r, u, s) {
    if (s) return e(l, r, u);
    if (u)
      return h(r), e(l, r, u);
    if (o.existsSync(r)) throw new Error("dest already exists.");
    return e(l, r, u);
  }
  function e(l, r, u) {
    try {
      o.renameSync(l, r);
    } catch (s) {
      if (s.code !== "EXDEV") throw s;
      return i(l, r, u);
    }
  }
  function i(l, r, u) {
    return v(l, r, {
      overwrite: u,
      errorOnExist: !0
    }), h(l);
  }
  return kr = t, kr;
}
var Or, qo;
function eh() {
  if (qo) return Or;
  qo = 1;
  const o = et().fromCallback;
  return Or = {
    move: o(/* @__PURE__ */ Qf()),
    moveSync: /* @__PURE__ */ Zf()
  }, Or;
}
var Pr, $o;
function Rt() {
  return $o || ($o = 1, Pr = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ cn(),
    // Export extra methods:
    .../* @__PURE__ */ Aa(),
    .../* @__PURE__ */ Bf(),
    .../* @__PURE__ */ Wf(),
    .../* @__PURE__ */ Jf(),
    .../* @__PURE__ */ mt(),
    .../* @__PURE__ */ eh(),
    .../* @__PURE__ */ Oa(),
    .../* @__PURE__ */ Yt(),
    .../* @__PURE__ */ ji()
  }), Pr;
}
var mn = {}, Lt = {}, Nr = {}, Ft = {}, Bo;
function Pa() {
  if (Bo) return Ft;
  Bo = 1, Object.defineProperty(Ft, "__esModule", { value: !0 }), Ft.CancellationError = Ft.CancellationToken = void 0;
  const o = ft;
  let m = class extends o.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(d) {
      this.removeParentCancelHandler(), this._parent = d, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(d) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, d != null && (this.parent = d);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(d) {
      this.cancelled ? d() : this.once("cancel", d);
    }
    createPromise(d) {
      if (this.cancelled)
        return Promise.reject(new v());
      const c = () => {
        if (t != null)
          try {
            this.removeListener("cancel", t), t = null;
          } catch {
          }
      };
      let t = null;
      return new Promise((a, n) => {
        let e = null;
        if (t = () => {
          try {
            e != null && (e(), e = null);
          } finally {
            n(new v());
          }
        }, this.cancelled) {
          t();
          return;
        }
        this.onCancel(t), d(a, n, (i) => {
          e = i;
        });
      }).then((a) => (c(), a)).catch((a) => {
        throw c(), a;
      });
    }
    removeParentCancelHandler() {
      const d = this._parent;
      d != null && this.parentCancelHandler != null && (d.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  Ft.CancellationToken = m;
  class v extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return Ft.CancellationError = v, Ft;
}
var gi = {}, jo;
function Mi() {
  if (jo) return gi;
  jo = 1, Object.defineProperty(gi, "__esModule", { value: !0 }), gi.newError = o;
  function o(m, v) {
    const h = new Error(m);
    return h.code = v, h;
  }
  return gi;
}
var ze = {}, xi = { exports: {} }, yi = { exports: {} }, Dr, Mo;
function th() {
  if (Mo) return Dr;
  Mo = 1;
  var o = 1e3, m = o * 60, v = m * 60, h = v * 24, d = h * 7, c = h * 365.25;
  Dr = function(i, l) {
    l = l || {};
    var r = typeof i;
    if (r === "string" && i.length > 0)
      return t(i);
    if (r === "number" && isFinite(i))
      return l.long ? n(i) : a(i);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(i)
    );
  };
  function t(i) {
    if (i = String(i), !(i.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        i
      );
      if (l) {
        var r = parseFloat(l[1]), u = (l[2] || "ms").toLowerCase();
        switch (u) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * c;
          case "weeks":
          case "week":
          case "w":
            return r * d;
          case "days":
          case "day":
          case "d":
            return r * h;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * v;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * o;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
          default:
            return;
        }
      }
    }
  }
  function a(i) {
    var l = Math.abs(i);
    return l >= h ? Math.round(i / h) + "d" : l >= v ? Math.round(i / v) + "h" : l >= m ? Math.round(i / m) + "m" : l >= o ? Math.round(i / o) + "s" : i + "ms";
  }
  function n(i) {
    var l = Math.abs(i);
    return l >= h ? e(i, l, h, "day") : l >= v ? e(i, l, v, "hour") : l >= m ? e(i, l, m, "minute") : l >= o ? e(i, l, o, "second") : i + " ms";
  }
  function e(i, l, r, u) {
    var s = l >= r * 1.5;
    return Math.round(i / r) + " " + u + (s ? "s" : "");
  }
  return Dr;
}
var Ir, Ho;
function Ep() {
  if (Ho) return Ir;
  Ho = 1;
  function o(m) {
    h.debug = h, h.default = h, h.coerce = e, h.disable = a, h.enable = c, h.enabled = n, h.humanize = th(), h.destroy = i, Object.keys(m).forEach((l) => {
      h[l] = m[l];
    }), h.names = [], h.skips = [], h.formatters = {};
    function v(l) {
      let r = 0;
      for (let u = 0; u < l.length; u++)
        r = (r << 5) - r + l.charCodeAt(u), r |= 0;
      return h.colors[Math.abs(r) % h.colors.length];
    }
    h.selectColor = v;
    function h(l) {
      let r, u = null, s, f;
      function p(...x) {
        if (!p.enabled)
          return;
        const b = p, C = Number(/* @__PURE__ */ new Date()), S = C - (r || C);
        b.diff = S, b.prev = r, b.curr = C, r = C, x[0] = h.coerce(x[0]), typeof x[0] != "string" && x.unshift("%O");
        let T = 0;
        x[0] = x[0].replace(/%([a-zA-Z%])/g, (E, w) => {
          if (E === "%%")
            return "%";
          T++;
          const _ = h.formatters[w];
          if (typeof _ == "function") {
            const D = x[T];
            E = _.call(b, D), x.splice(T, 1), T--;
          }
          return E;
        }), h.formatArgs.call(b, x), (b.log || h.log).apply(b, x);
      }
      return p.namespace = l, p.useColors = h.useColors(), p.color = h.selectColor(l), p.extend = d, p.destroy = h.destroy, Object.defineProperty(p, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => u !== null ? u : (s !== h.namespaces && (s = h.namespaces, f = h.enabled(l)), f),
        set: (x) => {
          u = x;
        }
      }), typeof h.init == "function" && h.init(p), p;
    }
    function d(l, r) {
      const u = h(this.namespace + (typeof r > "u" ? ":" : r) + l);
      return u.log = this.log, u;
    }
    function c(l) {
      h.save(l), h.namespaces = l, h.names = [], h.skips = [];
      const r = (typeof l == "string" ? l : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const u of r)
        u[0] === "-" ? h.skips.push(u.slice(1)) : h.names.push(u);
    }
    function t(l, r) {
      let u = 0, s = 0, f = -1, p = 0;
      for (; u < l.length; )
        if (s < r.length && (r[s] === l[u] || r[s] === "*"))
          r[s] === "*" ? (f = s, p = u, s++) : (u++, s++);
        else if (f !== -1)
          s = f + 1, p++, u = p;
        else
          return !1;
      for (; s < r.length && r[s] === "*"; )
        s++;
      return s === r.length;
    }
    function a() {
      const l = [
        ...h.names,
        ...h.skips.map((r) => "-" + r)
      ].join(",");
      return h.enable(""), l;
    }
    function n(l) {
      for (const r of h.skips)
        if (t(l, r))
          return !1;
      for (const r of h.names)
        if (t(l, r))
          return !0;
      return !1;
    }
    function e(l) {
      return l instanceof Error ? l.stack || l.message : l;
    }
    function i() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return h.enable(h.load()), h;
  }
  return Ir = o, Ir;
}
var zo;
function nh() {
  return zo || (zo = 1, (function(o, m) {
    m.formatArgs = h, m.save = d, m.load = c, m.useColors = v, m.storage = t(), m.destroy = /* @__PURE__ */ (() => {
      let n = !1;
      return () => {
        n || (n = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), m.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function v() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let n;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (n = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(n[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function h(n) {
      if (n[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + n[0] + (this.useColors ? "%c " : " ") + "+" + o.exports.humanize(this.diff), !this.useColors)
        return;
      const e = "color: " + this.color;
      n.splice(1, 0, e, "color: inherit");
      let i = 0, l = 0;
      n[0].replace(/%[a-zA-Z%]/g, (r) => {
        r !== "%%" && (i++, r === "%c" && (l = i));
      }), n.splice(l, 0, e);
    }
    m.log = console.debug || console.log || (() => {
    });
    function d(n) {
      try {
        n ? m.storage.setItem("debug", n) : m.storage.removeItem("debug");
      } catch {
      }
    }
    function c() {
      let n;
      try {
        n = m.storage.getItem("debug") || m.storage.getItem("DEBUG");
      } catch {
      }
      return !n && typeof process < "u" && "env" in process && (n = process.env.DEBUG), n;
    }
    function t() {
      try {
        return localStorage;
      } catch {
      }
    }
    o.exports = Ep()(m);
    const { formatters: a } = o.exports;
    a.j = function(n) {
      try {
        return JSON.stringify(n);
      } catch (e) {
        return "[UnexpectedJSONParseError]: " + e.message;
      }
    };
  })(yi, yi.exports)), yi.exports;
}
var bi = { exports: {} }, Lr, Go;
function ih() {
  return Go || (Go = 1, Lr = (o, m = process.argv) => {
    const v = o.startsWith("-") ? "" : o.length === 1 ? "-" : "--", h = m.indexOf(v + o), d = m.indexOf("--");
    return h !== -1 && (d === -1 || h < d);
  }), Lr;
}
var Fr, Wo;
function rh() {
  if (Wo) return Fr;
  Wo = 1;
  const o = ni, m = wp, v = ih(), { env: h } = process;
  let d;
  v("no-color") || v("no-colors") || v("color=false") || v("color=never") ? d = 0 : (v("color") || v("colors") || v("color=true") || v("color=always")) && (d = 1), "FORCE_COLOR" in h && (h.FORCE_COLOR === "true" ? d = 1 : h.FORCE_COLOR === "false" ? d = 0 : d = h.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(h.FORCE_COLOR, 10), 3));
  function c(n) {
    return n === 0 ? !1 : {
      level: n,
      hasBasic: !0,
      has256: n >= 2,
      has16m: n >= 3
    };
  }
  function t(n, e) {
    if (d === 0)
      return 0;
    if (v("color=16m") || v("color=full") || v("color=truecolor"))
      return 3;
    if (v("color=256"))
      return 2;
    if (n && !e && d === void 0)
      return 0;
    const i = d || 0;
    if (h.TERM === "dumb")
      return i;
    if (process.platform === "win32") {
      const l = o.release().split(".");
      return Number(l[0]) >= 10 && Number(l[2]) >= 10586 ? Number(l[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in h)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((l) => l in h) || h.CI_NAME === "codeship" ? 1 : i;
    if ("TEAMCITY_VERSION" in h)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(h.TEAMCITY_VERSION) ? 1 : 0;
    if (h.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in h) {
      const l = parseInt((h.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (h.TERM_PROGRAM) {
        case "iTerm.app":
          return l >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(h.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(h.TERM) || "COLORTERM" in h ? 1 : i;
  }
  function a(n) {
    const e = t(n, n && n.isTTY);
    return c(e);
  }
  return Fr = {
    supportsColor: a,
    stdout: c(t(!0, m.isatty(1))),
    stderr: c(t(!0, m.isatty(2)))
  }, Fr;
}
var Vo;
function sh() {
  return Vo || (Vo = 1, (function(o, m) {
    const v = wp, h = Ra;
    m.init = i, m.log = a, m.formatArgs = c, m.save = n, m.load = e, m.useColors = d, m.destroy = h.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), m.colors = [6, 2, 3, 4, 5, 1];
    try {
      const r = rh();
      r && (r.stderr || r).level >= 2 && (m.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    m.inspectOpts = Object.keys(process.env).filter((r) => /^debug_/i.test(r)).reduce((r, u) => {
      const s = u.substring(6).toLowerCase().replace(/_([a-z])/g, (p, x) => x.toUpperCase());
      let f = process.env[u];
      return /^(yes|on|true|enabled)$/i.test(f) ? f = !0 : /^(no|off|false|disabled)$/i.test(f) ? f = !1 : f === "null" ? f = null : f = Number(f), r[s] = f, r;
    }, {});
    function d() {
      return "colors" in m.inspectOpts ? !!m.inspectOpts.colors : v.isatty(process.stderr.fd);
    }
    function c(r) {
      const { namespace: u, useColors: s } = this;
      if (s) {
        const f = this.color, p = "\x1B[3" + (f < 8 ? f : "8;5;" + f), x = `  ${p};1m${u} \x1B[0m`;
        r[0] = x + r[0].split(`
`).join(`
` + x), r.push(p + "m+" + o.exports.humanize(this.diff) + "\x1B[0m");
      } else
        r[0] = t() + u + " " + r[0];
    }
    function t() {
      return m.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...r) {
      return process.stderr.write(h.formatWithOptions(m.inspectOpts, ...r) + `
`);
    }
    function n(r) {
      r ? process.env.DEBUG = r : delete process.env.DEBUG;
    }
    function e() {
      return process.env.DEBUG;
    }
    function i(r) {
      r.inspectOpts = {};
      const u = Object.keys(m.inspectOpts);
      for (let s = 0; s < u.length; s++)
        r.inspectOpts[u[s]] = m.inspectOpts[u[s]];
    }
    o.exports = Ep()(m);
    const { formatters: l } = o.exports;
    l.o = function(r) {
      return this.inspectOpts.colors = this.useColors, h.inspect(r, this.inspectOpts).split(`
`).map((u) => u.trim()).join(" ");
    }, l.O = function(r) {
      return this.inspectOpts.colors = this.useColors, h.inspect(r, this.inspectOpts);
    };
  })(bi, bi.exports)), bi.exports;
}
var Yo;
function $e() {
  return Yo || (Yo = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? xi.exports = nh() : xi.exports = sh()), xi.exports;
}
var vn = {}, Ko;
function Sp() {
  if (Ko) return vn;
  Ko = 1, Object.defineProperty(vn, "__esModule", { value: !0 }), vn.ProgressCallbackTransform = void 0;
  const o = ut;
  let m = class extends o.Transform {
    constructor(h, d, c) {
      super(), this.total = h, this.cancellationToken = d, this.onProgress = c, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(h, d, c) {
      if (this.cancellationToken.cancelled) {
        c(new Error("cancelled"), null);
        return;
      }
      this.transferred += h.length, this.delta += h.length;
      const t = Date.now();
      t >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = t + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((t - this.start) / 1e3))
      }), this.delta = 0), c(null, h);
    }
    _flush(h) {
      if (this.cancellationToken.cancelled) {
        h(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, h(null);
    }
  };
  return vn.ProgressCallbackTransform = m, vn;
}
var Xo;
function ah() {
  if (Xo) return ze;
  Xo = 1, Object.defineProperty(ze, "__esModule", { value: !0 }), ze.DigestTransform = ze.HttpExecutor = ze.HttpError = void 0, ze.createHttpError = e, ze.parseJson = r, ze.configureRequestOptionsFromUrl = s, ze.configureRequestUrl = f, ze.safeGetHeader = b, ze.configureRequestOptions = S, ze.safeStringifyJson = T;
  const o = ht, m = $e(), v = lt, h = ut, d = Vt, c = Pa(), t = Mi(), a = Sp(), n = (0, m.default)("electron-builder");
  function e(y, E = null) {
    return new l(y.statusCode || -1, `${y.statusCode} ${y.statusMessage}` + (E == null ? "" : `
` + JSON.stringify(E, null, "  ")) + `
Headers: ` + T(y.headers), E);
  }
  const i = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class l extends Error {
    constructor(E, w = `HTTP error: ${i.get(E) || E}`, _ = null) {
      super(w), this.statusCode = E, this.description = _, this.name = "HttpError", this.code = `HTTP_ERROR_${E}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  ze.HttpError = l;
  function r(y) {
    return y.then((E) => E == null || E.length === 0 ? null : JSON.parse(E));
  }
  class u {
    constructor() {
      this.maxRedirects = 10;
    }
    request(E, w = new c.CancellationToken(), _) {
      S(E);
      const D = _ == null ? void 0 : JSON.stringify(_), O = D ? Buffer.from(D) : void 0;
      if (O != null) {
        n(D);
        const { headers: I, ...q } = E;
        E = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": O.length,
            ...I
          },
          ...q
        };
      }
      return this.doApiRequest(E, w, (I) => I.end(O));
    }
    doApiRequest(E, w, _, D = 0) {
      return n.enabled && n(`Request: ${T(E)}`), w.createPromise((O, I, q) => {
        const R = this.createRequest(E, (N) => {
          try {
            this.handleResponse(N, E, w, O, I, D, _);
          } catch (F) {
            I(F);
          }
        });
        this.addErrorAndTimeoutHandlers(R, I, E.timeout), this.addRedirectHandlers(R, E, I, D, (N) => {
          this.doApiRequest(N, w, _, D).then(O).catch(I);
        }), _(R, I), q(() => R.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(E, w, _, D, O) {
    }
    addErrorAndTimeoutHandlers(E, w, _ = 60 * 1e3) {
      this.addTimeOutHandler(E, w, _), E.on("error", w), E.on("aborted", () => {
        w(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(E, w, _, D, O, I, q) {
      var R;
      if (n.enabled && n(`Response: ${E.statusCode} ${E.statusMessage}, request options: ${T(w)}`), E.statusCode === 404) {
        O(e(E, `method: ${w.method || "GET"} url: ${w.protocol || "https:"}//${w.hostname}${w.port ? `:${w.port}` : ""}${w.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (E.statusCode === 204) {
        D();
        return;
      }
      const N = (R = E.statusCode) !== null && R !== void 0 ? R : 0, F = N >= 300 && N < 400, U = b(E, "location");
      if (F && U != null) {
        if (I > this.maxRedirects) {
          O(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(u.prepareRedirectUrlOptions(U, w), _, q, I).then(D).catch(O);
        return;
      }
      E.setEncoding("utf8");
      let z = "";
      E.on("error", O), E.on("data", (W) => z += W), E.on("end", () => {
        try {
          if (E.statusCode != null && E.statusCode >= 400) {
            const W = b(E, "content-type"), ie = W != null && (Array.isArray(W) ? W.find((ae) => ae.includes("json")) != null : W.includes("json"));
            O(e(E, `method: ${w.method || "GET"} url: ${w.protocol || "https:"}//${w.hostname}${w.port ? `:${w.port}` : ""}${w.path}

          Data:
          ${ie ? JSON.stringify(JSON.parse(z)) : z}
          `));
          } else
            D(z.length === 0 ? null : z);
        } catch (W) {
          O(W);
        }
      });
    }
    async downloadToBuffer(E, w) {
      return await w.cancellationToken.createPromise((_, D, O) => {
        const I = [], q = {
          headers: w.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        f(E, q), S(q), this.doDownload(q, {
          destination: null,
          options: w,
          onCancel: O,
          callback: (R) => {
            R == null ? _(Buffer.concat(I)) : D(R);
          },
          responseHandler: (R, N) => {
            let F = 0;
            R.on("data", (U) => {
              if (F += U.length, F > 524288e3) {
                N(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              I.push(U);
            }), R.on("end", () => {
              N(null);
            });
          }
        }, 0);
      });
    }
    doDownload(E, w, _) {
      const D = this.createRequest(E, (O) => {
        if (O.statusCode >= 400) {
          w.callback(new Error(`Cannot download "${E.protocol || "https:"}//${E.hostname}${E.path}", status ${O.statusCode}: ${O.statusMessage}`));
          return;
        }
        O.on("error", w.callback);
        const I = b(O, "location");
        if (I != null) {
          _ < this.maxRedirects ? this.doDownload(u.prepareRedirectUrlOptions(I, E), w, _++) : w.callback(this.createMaxRedirectError());
          return;
        }
        w.responseHandler == null ? C(w, O) : w.responseHandler(O, w.callback);
      });
      this.addErrorAndTimeoutHandlers(D, w.callback, E.timeout), this.addRedirectHandlers(D, E, w.callback, _, (O) => {
        this.doDownload(O, w, _++);
      }), D.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(E, w, _) {
      E.on("socket", (D) => {
        D.setTimeout(_, () => {
          E.abort(), w(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(E, w) {
      const _ = s(E, { ...w }), D = _.headers;
      if (D != null && D.authorization) {
        const O = new d.URL(E);
        (O.hostname.endsWith(".amazonaws.com") || O.searchParams.has("X-Amz-Credential")) && delete D.authorization;
      }
      return _;
    }
    static retryOnServerError(E, w = 3) {
      for (let _ = 0; ; _++)
        try {
          return E();
        } catch (D) {
          if (_ < w && (D instanceof l && D.isServerError() || D.code === "EPIPE"))
            continue;
          throw D;
        }
    }
  }
  ze.HttpExecutor = u;
  function s(y, E) {
    const w = S(E);
    return f(new d.URL(y), w), w;
  }
  function f(y, E) {
    E.protocol = y.protocol, E.hostname = y.hostname, y.port ? E.port = y.port : E.port && delete E.port, E.path = y.pathname + y.search;
  }
  class p extends h.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(E, w = "sha512", _ = "base64") {
      super(), this.expected = E, this.algorithm = w, this.encoding = _, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, o.createHash)(w);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(E, w, _) {
      this.digester.update(E), _(null, E);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(E) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (w) {
          E(w);
          return;
        }
      E(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, t.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, t.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  ze.DigestTransform = p;
  function x(y, E, w) {
    return y != null && E != null && y !== E ? (w(new Error(`checksum mismatch: expected ${E} but got ${y} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function b(y, E) {
    const w = y.headers[E];
    return w == null ? null : Array.isArray(w) ? w.length === 0 ? null : w[w.length - 1] : w;
  }
  function C(y, E) {
    if (!x(b(E, "X-Checksum-Sha2"), y.options.sha2, y.callback))
      return;
    const w = [];
    if (y.options.onProgress != null) {
      const I = b(E, "content-length");
      I != null && w.push(new a.ProgressCallbackTransform(parseInt(I, 10), y.options.cancellationToken, y.options.onProgress));
    }
    const _ = y.options.sha512;
    _ != null ? w.push(new p(_, "sha512", _.length === 128 && !_.includes("+") && !_.includes("Z") && !_.includes("=") ? "hex" : "base64")) : y.options.sha2 != null && w.push(new p(y.options.sha2, "sha256", "hex"));
    const D = (0, v.createWriteStream)(y.destination);
    w.push(D);
    let O = E;
    for (const I of w)
      I.on("error", (q) => {
        D.close(), y.options.cancellationToken.cancelled || y.callback(q);
      }), O = O.pipe(I);
    D.on("finish", () => {
      D.close(y.callback);
    });
  }
  function S(y, E, w) {
    w != null && (y.method = w), y.headers = { ...y.headers };
    const _ = y.headers;
    return E != null && (_.authorization = E.startsWith("Basic") || E.startsWith("Bearer") ? E : `token ${E}`), _["User-Agent"] == null && (_["User-Agent"] = "electron-builder"), (w == null || w === "GET" || _["Cache-Control"] == null) && (_["Cache-Control"] = "no-cache"), y.protocol == null && process.versions.electron != null && (y.protocol = "https:"), y;
  }
  function T(y, E) {
    return JSON.stringify(y, (w, _) => w.endsWith("Authorization") || w.endsWith("authorization") || w.endsWith("Password") || w.endsWith("PASSWORD") || w.endsWith("Token") || w.includes("password") || w.includes("token") || E != null && E.has(w) ? "<stripped sensitive data>" : _, 2);
  }
  return ze;
}
var gn = {}, Jo;
function oh() {
  if (Jo) return gn;
  Jo = 1, Object.defineProperty(gn, "__esModule", { value: !0 }), gn.MemoLazy = void 0;
  let o = class {
    constructor(h, d) {
      this.selector = h, this.creator = d, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const h = this.selector();
      if (this._value !== void 0 && m(this.selected, h))
        return this._value;
      this.selected = h;
      const d = this.creator(h);
      return this.value = d, d;
    }
    set value(h) {
      this._value = h;
    }
  };
  gn.MemoLazy = o;
  function m(v, h) {
    if (typeof v == "object" && v !== null && (typeof h == "object" && h !== null)) {
      const t = Object.keys(v), a = Object.keys(h);
      return t.length === a.length && t.every((n) => m(v[n], h[n]));
    }
    return v === h;
  }
  return gn;
}
var xn = {}, Qo;
function ch() {
  if (Qo) return xn;
  Qo = 1, Object.defineProperty(xn, "__esModule", { value: !0 }), xn.githubUrl = o, xn.getS3LikeProviderBaseUrl = m;
  function o(c, t = "github.com") {
    return `${c.protocol || "https"}://${c.host || t}`;
  }
  function m(c) {
    const t = c.provider;
    if (t === "s3")
      return v(c);
    if (t === "spaces")
      return d(c);
    throw new Error(`Not supported provider: ${t}`);
  }
  function v(c) {
    let t;
    if (c.accelerate == !0)
      t = `https://${c.bucket}.s3-accelerate.amazonaws.com`;
    else if (c.endpoint != null)
      t = `${c.endpoint}/${c.bucket}`;
    else if (c.bucket.includes(".")) {
      if (c.region == null)
        throw new Error(`Bucket name "${c.bucket}" includes a dot, but S3 region is missing`);
      c.region === "us-east-1" ? t = `https://s3.amazonaws.com/${c.bucket}` : t = `https://s3-${c.region}.amazonaws.com/${c.bucket}`;
    } else c.region === "cn-north-1" ? t = `https://${c.bucket}.s3.${c.region}.amazonaws.com.cn` : t = `https://${c.bucket}.s3.amazonaws.com`;
    return h(t, c.path);
  }
  function h(c, t) {
    return t != null && t.length > 0 && (t.startsWith("/") || (c += "/"), c += t), c;
  }
  function d(c) {
    if (c.name == null)
      throw new Error("name is missing");
    if (c.region == null)
      throw new Error("region is missing");
    return h(`https://${c.name}.${c.region}.digitaloceanspaces.com`, c.path);
  }
  return xn;
}
var wi = {}, Zo;
function lh() {
  if (Zo) return wi;
  Zo = 1, Object.defineProperty(wi, "__esModule", { value: !0 }), wi.retry = m;
  const o = Pa();
  async function m(v, h, d, c = 0, t = 0, a) {
    var n;
    const e = new o.CancellationToken();
    try {
      return await v();
    } catch (i) {
      if ((!((n = a == null ? void 0 : a(i)) !== null && n !== void 0) || n) && h > 0 && !e.cancelled)
        return await new Promise((l) => setTimeout(l, d + c * t)), await m(v, h - 1, d, c, t + 1, a);
      throw i;
    }
  }
  return wi;
}
var _i = {}, ec;
function uh() {
  if (ec) return _i;
  ec = 1, Object.defineProperty(_i, "__esModule", { value: !0 }), _i.parseDn = o;
  function o(m) {
    let v = !1, h = null, d = "", c = 0;
    m = m.trim();
    const t = /* @__PURE__ */ new Map();
    for (let a = 0; a <= m.length; a++) {
      if (a === m.length) {
        h !== null && t.set(h, d);
        break;
      }
      const n = m[a];
      if (v) {
        if (n === '"') {
          v = !1;
          continue;
        }
      } else {
        if (n === '"') {
          v = !0;
          continue;
        }
        if (n === "\\") {
          a++;
          const e = parseInt(m.slice(a, a + 2), 16);
          Number.isNaN(e) ? d += m[a] : (a++, d += String.fromCharCode(e));
          continue;
        }
        if (h === null && n === "=") {
          h = d, d = "";
          continue;
        }
        if (n === "," || n === ";" || n === "+") {
          h !== null && t.set(h, d), h = null, d = "";
          continue;
        }
      }
      if (n === " " && !v) {
        if (d.length === 0)
          continue;
        if (a > c) {
          let e = a;
          for (; m[e] === " "; )
            e++;
          c = e;
        }
        if (c >= m.length || m[c] === "," || m[c] === ";" || h === null && m[c] === "=" || h !== null && m[c] === "+") {
          a = c - 1;
          continue;
        }
      }
      d += n;
    }
    return t;
  }
  return _i;
}
var Ut = {}, tc;
function ph() {
  if (tc) return Ut;
  tc = 1, Object.defineProperty(Ut, "__esModule", { value: !0 }), Ut.nil = Ut.UUID = void 0;
  const o = ht, m = Mi(), v = "options.name must be either a string or a Buffer", h = (0, o.randomBytes)(16);
  h[0] = h[0] | 1;
  const d = {}, c = [];
  for (let l = 0; l < 256; l++) {
    const r = (l + 256).toString(16).substr(1);
    d[r] = l, c[l] = r;
  }
  class t {
    constructor(r) {
      this.ascii = null, this.binary = null;
      const u = t.check(r);
      if (!u)
        throw new Error("not a UUID");
      this.version = u.version, u.format === "ascii" ? this.ascii = r : this.binary = r;
    }
    static v5(r, u) {
      return e(r, "sha1", 80, u);
    }
    toString() {
      return this.ascii == null && (this.ascii = i(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(r, u = 0) {
      if (typeof r == "string")
        return r = r.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(r) ? r === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (d[r[14] + r[15]] & 240) >> 4,
          variant: a((d[r[19] + r[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(r)) {
        if (r.length < u + 16)
          return !1;
        let s = 0;
        for (; s < 16 && r[u + s] === 0; s++)
          ;
        return s === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (r[u + 6] & 240) >> 4,
          variant: a((r[u + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, m.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(r) {
      const u = Buffer.allocUnsafe(16);
      let s = 0;
      for (let f = 0; f < 16; f++)
        u[f] = d[r[s++] + r[s++]], (f === 3 || f === 5 || f === 7 || f === 9) && (s += 1);
      return u;
    }
  }
  Ut.UUID = t, t.OID = t.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function a(l) {
    switch (l) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var n;
  (function(l) {
    l[l.ASCII = 0] = "ASCII", l[l.BINARY = 1] = "BINARY", l[l.OBJECT = 2] = "OBJECT";
  })(n || (n = {}));
  function e(l, r, u, s, f = n.ASCII) {
    const p = (0, o.createHash)(r);
    if (typeof l != "string" && !Buffer.isBuffer(l))
      throw (0, m.newError)(v, "ERR_INVALID_UUID_NAME");
    p.update(s), p.update(l);
    const b = p.digest();
    let C;
    switch (f) {
      case n.BINARY:
        b[6] = b[6] & 15 | u, b[8] = b[8] & 63 | 128, C = b;
        break;
      case n.OBJECT:
        b[6] = b[6] & 15 | u, b[8] = b[8] & 63 | 128, C = new t(b);
        break;
      default:
        C = c[b[0]] + c[b[1]] + c[b[2]] + c[b[3]] + "-" + c[b[4]] + c[b[5]] + "-" + c[b[6] & 15 | u] + c[b[7]] + "-" + c[b[8] & 63 | 128] + c[b[9]] + "-" + c[b[10]] + c[b[11]] + c[b[12]] + c[b[13]] + c[b[14]] + c[b[15]];
        break;
    }
    return C;
  }
  function i(l) {
    return c[l[0]] + c[l[1]] + c[l[2]] + c[l[3]] + "-" + c[l[4]] + c[l[5]] + "-" + c[l[6]] + c[l[7]] + "-" + c[l[8]] + c[l[9]] + "-" + c[l[10]] + c[l[11]] + c[l[12]] + c[l[13]] + c[l[14]] + c[l[15]];
  }
  return Ut.nil = new t("00000000-0000-0000-0000-000000000000"), Ut;
}
var Zt = {}, Ur = {}, nc;
function dh() {
  return nc || (nc = 1, (function(o) {
    (function(m) {
      m.parser = function(k, A) {
        return new h(k, A);
      }, m.SAXParser = h, m.SAXStream = i, m.createStream = e, m.MAX_BUFFER_LENGTH = 64 * 1024;
      var v = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      m.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function h(k, A) {
        if (!(this instanceof h))
          return new h(k, A);
        var G = this;
        c(G), G.q = G.c = "", G.bufferCheckPosition = m.MAX_BUFFER_LENGTH, G.opt = A || {}, G.opt.lowercase = G.opt.lowercase || G.opt.lowercasetags, G.looseCase = G.opt.lowercase ? "toLowerCase" : "toUpperCase", G.tags = [], G.closed = G.closedRoot = G.sawRoot = !1, G.tag = G.error = null, G.strict = !!k, G.noscript = !!(k || G.opt.noscript), G.state = _.BEGIN, G.strictEntities = G.opt.strictEntities, G.ENTITIES = G.strictEntities ? Object.create(m.XML_ENTITIES) : Object.create(m.ENTITIES), G.attribList = [], G.opt.xmlns && (G.ns = Object.create(f)), G.opt.unquotedAttributeValues === void 0 && (G.opt.unquotedAttributeValues = !k), G.trackPosition = G.opt.position !== !1, G.trackPosition && (G.position = G.line = G.column = 0), O(G, "onready");
      }
      Object.create || (Object.create = function(k) {
        function A() {
        }
        A.prototype = k;
        var G = new A();
        return G;
      }), Object.keys || (Object.keys = function(k) {
        var A = [];
        for (var G in k) k.hasOwnProperty(G) && A.push(G);
        return A;
      });
      function d(k) {
        for (var A = Math.max(m.MAX_BUFFER_LENGTH, 10), G = 0, $ = 0, me = v.length; $ < me; $++) {
          var be = k[v[$]].length;
          if (be > A)
            switch (v[$]) {
              case "textNode":
                q(k);
                break;
              case "cdata":
                I(k, "oncdata", k.cdata), k.cdata = "";
                break;
              case "script":
                I(k, "onscript", k.script), k.script = "";
                break;
              default:
                N(k, "Max buffer length exceeded: " + v[$]);
            }
          G = Math.max(G, be);
        }
        var we = m.MAX_BUFFER_LENGTH - G;
        k.bufferCheckPosition = we + k.position;
      }
      function c(k) {
        for (var A = 0, G = v.length; A < G; A++)
          k[v[A]] = "";
      }
      function t(k) {
        q(k), k.cdata !== "" && (I(k, "oncdata", k.cdata), k.cdata = ""), k.script !== "" && (I(k, "onscript", k.script), k.script = "");
      }
      h.prototype = {
        end: function() {
          F(this);
        },
        write: Se,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          t(this);
        }
      };
      var a;
      try {
        a = require("stream").Stream;
      } catch {
        a = function() {
        };
      }
      a || (a = function() {
      });
      var n = m.EVENTS.filter(function(k) {
        return k !== "error" && k !== "end";
      });
      function e(k, A) {
        return new i(k, A);
      }
      function i(k, A) {
        if (!(this instanceof i))
          return new i(k, A);
        a.apply(this), this._parser = new h(k, A), this.writable = !0, this.readable = !0;
        var G = this;
        this._parser.onend = function() {
          G.emit("end");
        }, this._parser.onerror = function($) {
          G.emit("error", $), G._parser.error = null;
        }, this._decoder = null, n.forEach(function($) {
          Object.defineProperty(G, "on" + $, {
            get: function() {
              return G._parser["on" + $];
            },
            set: function(me) {
              if (!me)
                return G.removeAllListeners($), G._parser["on" + $] = me, me;
              G.on($, me);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      i.prototype = Object.create(a.prototype, {
        constructor: {
          value: i
        }
      }), i.prototype.write = function(k) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(k)) {
          if (!this._decoder) {
            var A = _f.StringDecoder;
            this._decoder = new A("utf8");
          }
          k = this._decoder.write(k);
        }
        return this._parser.write(k.toString()), this.emit("data", k), !0;
      }, i.prototype.end = function(k) {
        return k && k.length && this.write(k), this._parser.end(), !0;
      }, i.prototype.on = function(k, A) {
        var G = this;
        return !G._parser["on" + k] && n.indexOf(k) !== -1 && (G._parser["on" + k] = function() {
          var $ = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          $.splice(0, 0, k), G.emit.apply(G, $);
        }), a.prototype.on.call(G, k, A);
      };
      var l = "[CDATA[", r = "DOCTYPE", u = "http://www.w3.org/XML/1998/namespace", s = "http://www.w3.org/2000/xmlns/", f = { xml: u, xmlns: s }, p = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, x = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, b = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, C = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function S(k) {
        return k === " " || k === `
` || k === "\r" || k === "	";
      }
      function T(k) {
        return k === '"' || k === "'";
      }
      function y(k) {
        return k === ">" || S(k);
      }
      function E(k, A) {
        return k.test(A);
      }
      function w(k, A) {
        return !E(k, A);
      }
      var _ = 0;
      m.STATE = {
        BEGIN: _++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: _++,
        // leading whitespace
        TEXT: _++,
        // general stuff
        TEXT_ENTITY: _++,
        // &amp and such.
        OPEN_WAKA: _++,
        // <
        SGML_DECL: _++,
        // <!BLARG
        SGML_DECL_QUOTED: _++,
        // <!BLARG foo "bar
        DOCTYPE: _++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: _++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: _++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: _++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: _++,
        // <!-
        COMMENT: _++,
        // <!--
        COMMENT_ENDING: _++,
        // <!-- blah -
        COMMENT_ENDED: _++,
        // <!-- blah --
        CDATA: _++,
        // <![CDATA[ something
        CDATA_ENDING: _++,
        // ]
        CDATA_ENDING_2: _++,
        // ]]
        PROC_INST: _++,
        // <?hi
        PROC_INST_BODY: _++,
        // <?hi there
        PROC_INST_ENDING: _++,
        // <?hi "there" ?
        OPEN_TAG: _++,
        // <strong
        OPEN_TAG_SLASH: _++,
        // <strong /
        ATTRIB: _++,
        // <a
        ATTRIB_NAME: _++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: _++,
        // <a foo _
        ATTRIB_VALUE: _++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: _++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: _++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: _++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: _++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: _++,
        // <foo bar=&quot
        CLOSE_TAG: _++,
        // </a
        CLOSE_TAG_SAW_WHITE: _++,
        // </a   >
        SCRIPT: _++,
        // <script> ...
        SCRIPT_ENDING: _++
        // <script> ... <
      }, m.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, m.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(m.ENTITIES).forEach(function(k) {
        var A = m.ENTITIES[k], G = typeof A == "number" ? String.fromCharCode(A) : A;
        m.ENTITIES[k] = G;
      });
      for (var D in m.STATE)
        m.STATE[m.STATE[D]] = D;
      _ = m.STATE;
      function O(k, A, G) {
        k[A] && k[A](G);
      }
      function I(k, A, G) {
        k.textNode && q(k), O(k, A, G);
      }
      function q(k) {
        k.textNode = R(k.opt, k.textNode), k.textNode && O(k, "ontext", k.textNode), k.textNode = "";
      }
      function R(k, A) {
        return k.trim && (A = A.trim()), k.normalize && (A = A.replace(/\s+/g, " ")), A;
      }
      function N(k, A) {
        return q(k), k.trackPosition && (A += `
Line: ` + k.line + `
Column: ` + k.column + `
Char: ` + k.c), A = new Error(A), k.error = A, O(k, "onerror", A), k;
      }
      function F(k) {
        return k.sawRoot && !k.closedRoot && U(k, "Unclosed root tag"), k.state !== _.BEGIN && k.state !== _.BEGIN_WHITESPACE && k.state !== _.TEXT && N(k, "Unexpected end"), q(k), k.c = "", k.closed = !0, O(k, "onend"), h.call(k, k.strict, k.opt), k;
      }
      function U(k, A) {
        if (typeof k != "object" || !(k instanceof h))
          throw new Error("bad call to strictFail");
        k.strict && N(k, A);
      }
      function z(k) {
        k.strict || (k.tagName = k.tagName[k.looseCase]());
        var A = k.tags[k.tags.length - 1] || k, G = k.tag = { name: k.tagName, attributes: {} };
        k.opt.xmlns && (G.ns = A.ns), k.attribList.length = 0, I(k, "onopentagstart", G);
      }
      function W(k, A) {
        var G = k.indexOf(":"), $ = G < 0 ? ["", k] : k.split(":"), me = $[0], be = $[1];
        return A && k === "xmlns" && (me = "xmlns", be = ""), { prefix: me, local: be };
      }
      function ie(k) {
        if (k.strict || (k.attribName = k.attribName[k.looseCase]()), k.attribList.indexOf(k.attribName) !== -1 || k.tag.attributes.hasOwnProperty(k.attribName)) {
          k.attribName = k.attribValue = "";
          return;
        }
        if (k.opt.xmlns) {
          var A = W(k.attribName, !0), G = A.prefix, $ = A.local;
          if (G === "xmlns")
            if ($ === "xml" && k.attribValue !== u)
              U(
                k,
                "xml: prefix must be bound to " + u + `
Actual: ` + k.attribValue
              );
            else if ($ === "xmlns" && k.attribValue !== s)
              U(
                k,
                "xmlns: prefix must be bound to " + s + `
Actual: ` + k.attribValue
              );
            else {
              var me = k.tag, be = k.tags[k.tags.length - 1] || k;
              me.ns === be.ns && (me.ns = Object.create(be.ns)), me.ns[$] = k.attribValue;
            }
          k.attribList.push([k.attribName, k.attribValue]);
        } else
          k.tag.attributes[k.attribName] = k.attribValue, I(k, "onattribute", {
            name: k.attribName,
            value: k.attribValue
          });
        k.attribName = k.attribValue = "";
      }
      function ae(k, A) {
        if (k.opt.xmlns) {
          var G = k.tag, $ = W(k.tagName);
          G.prefix = $.prefix, G.local = $.local, G.uri = G.ns[$.prefix] || "", G.prefix && !G.uri && (U(
            k,
            "Unbound namespace prefix: " + JSON.stringify(k.tagName)
          ), G.uri = $.prefix);
          var me = k.tags[k.tags.length - 1] || k;
          G.ns && me.ns !== G.ns && Object.keys(G.ns).forEach(function(g) {
            I(k, "onopennamespace", {
              prefix: g,
              uri: G.ns[g]
            });
          });
          for (var be = 0, we = k.attribList.length; be < we; be++) {
            var Re = k.attribList[be], Ce = Re[0], Be = Re[1], j = W(Ce, !0), Y = j.prefix, he = j.local, Ee = Y === "" ? "" : G.ns[Y] || "", ue = {
              name: Ce,
              value: Be,
              prefix: Y,
              local: he,
              uri: Ee
            };
            Y && Y !== "xmlns" && !Ee && (U(
              k,
              "Unbound namespace prefix: " + JSON.stringify(Y)
            ), ue.uri = Y), k.tag.attributes[Ce] = ue, I(k, "onattribute", ue);
          }
          k.attribList.length = 0;
        }
        k.tag.isSelfClosing = !!A, k.sawRoot = !0, k.tags.push(k.tag), I(k, "onopentag", k.tag), A || (!k.noscript && k.tagName.toLowerCase() === "script" ? k.state = _.SCRIPT : k.state = _.TEXT, k.tag = null, k.tagName = ""), k.attribName = k.attribValue = "", k.attribList.length = 0;
      }
      function oe(k) {
        if (!k.tagName) {
          U(k, "Weird empty close tag."), k.textNode += "</>", k.state = _.TEXT;
          return;
        }
        if (k.script) {
          if (k.tagName !== "script") {
            k.script += "</" + k.tagName + ">", k.tagName = "", k.state = _.SCRIPT;
            return;
          }
          I(k, "onscript", k.script), k.script = "";
        }
        var A = k.tags.length, G = k.tagName;
        k.strict || (G = G[k.looseCase]());
        for (var $ = G; A--; ) {
          var me = k.tags[A];
          if (me.name !== $)
            U(k, "Unexpected close tag");
          else
            break;
        }
        if (A < 0) {
          U(k, "Unmatched closing tag: " + k.tagName), k.textNode += "</" + k.tagName + ">", k.state = _.TEXT;
          return;
        }
        k.tagName = G;
        for (var be = k.tags.length; be-- > A; ) {
          var we = k.tag = k.tags.pop();
          k.tagName = k.tag.name, I(k, "onclosetag", k.tagName);
          var Re = {};
          for (var Ce in we.ns)
            Re[Ce] = we.ns[Ce];
          var Be = k.tags[k.tags.length - 1] || k;
          k.opt.xmlns && we.ns !== Be.ns && Object.keys(we.ns).forEach(function(j) {
            var Y = we.ns[j];
            I(k, "onclosenamespace", { prefix: j, uri: Y });
          });
        }
        A === 0 && (k.closedRoot = !0), k.tagName = k.attribValue = k.attribName = "", k.attribList.length = 0, k.state = _.TEXT;
      }
      function ye(k) {
        var A = k.entity, G = A.toLowerCase(), $, me = "";
        return k.ENTITIES[A] ? k.ENTITIES[A] : k.ENTITIES[G] ? k.ENTITIES[G] : (A = G, A.charAt(0) === "#" && (A.charAt(1) === "x" ? (A = A.slice(2), $ = parseInt(A, 16), me = $.toString(16)) : (A = A.slice(1), $ = parseInt(A, 10), me = $.toString(10))), A = A.replace(/^0+/, ""), isNaN($) || me.toLowerCase() !== A || $ < 0 || $ > 1114111 ? (U(k, "Invalid character entity"), "&" + k.entity + ";") : String.fromCodePoint($));
      }
      function _e(k, A) {
        A === "<" ? (k.state = _.OPEN_WAKA, k.startTagPosition = k.position) : S(A) || (U(k, "Non-whitespace before first tag."), k.textNode = A, k.state = _.TEXT);
      }
      function Z(k, A) {
        var G = "";
        return A < k.length && (G = k.charAt(A)), G;
      }
      function Se(k) {
        var A = this;
        if (this.error)
          throw this.error;
        if (A.closed)
          return N(
            A,
            "Cannot write after close. Assign an onready handler."
          );
        if (k === null)
          return F(A);
        typeof k == "object" && (k = k.toString());
        for (var G = 0, $ = ""; $ = Z(k, G++), A.c = $, !!$; )
          switch (A.trackPosition && (A.position++, $ === `
` ? (A.line++, A.column = 0) : A.column++), A.state) {
            case _.BEGIN:
              if (A.state = _.BEGIN_WHITESPACE, $ === "\uFEFF")
                continue;
              _e(A, $);
              continue;
            case _.BEGIN_WHITESPACE:
              _e(A, $);
              continue;
            case _.TEXT:
              if (A.sawRoot && !A.closedRoot) {
                for (var be = G - 1; $ && $ !== "<" && $ !== "&"; )
                  $ = Z(k, G++), $ && A.trackPosition && (A.position++, $ === `
` ? (A.line++, A.column = 0) : A.column++);
                A.textNode += k.substring(be, G - 1);
              }
              $ === "<" && !(A.sawRoot && A.closedRoot && !A.strict) ? (A.state = _.OPEN_WAKA, A.startTagPosition = A.position) : (!S($) && (!A.sawRoot || A.closedRoot) && U(A, "Text data outside of root node."), $ === "&" ? A.state = _.TEXT_ENTITY : A.textNode += $);
              continue;
            case _.SCRIPT:
              $ === "<" ? A.state = _.SCRIPT_ENDING : A.script += $;
              continue;
            case _.SCRIPT_ENDING:
              $ === "/" ? A.state = _.CLOSE_TAG : (A.script += "<" + $, A.state = _.SCRIPT);
              continue;
            case _.OPEN_WAKA:
              if ($ === "!")
                A.state = _.SGML_DECL, A.sgmlDecl = "";
              else if (!S($)) if (E(p, $))
                A.state = _.OPEN_TAG, A.tagName = $;
              else if ($ === "/")
                A.state = _.CLOSE_TAG, A.tagName = "";
              else if ($ === "?")
                A.state = _.PROC_INST, A.procInstName = A.procInstBody = "";
              else {
                if (U(A, "Unencoded <"), A.startTagPosition + 1 < A.position) {
                  var me = A.position - A.startTagPosition;
                  $ = new Array(me).join(" ") + $;
                }
                A.textNode += "<" + $, A.state = _.TEXT;
              }
              continue;
            case _.SGML_DECL:
              if (A.sgmlDecl + $ === "--") {
                A.state = _.COMMENT, A.comment = "", A.sgmlDecl = "";
                continue;
              }
              A.doctype && A.doctype !== !0 && A.sgmlDecl ? (A.state = _.DOCTYPE_DTD, A.doctype += "<!" + A.sgmlDecl + $, A.sgmlDecl = "") : (A.sgmlDecl + $).toUpperCase() === l ? (I(A, "onopencdata"), A.state = _.CDATA, A.sgmlDecl = "", A.cdata = "") : (A.sgmlDecl + $).toUpperCase() === r ? (A.state = _.DOCTYPE, (A.doctype || A.sawRoot) && U(
                A,
                "Inappropriately located doctype declaration"
              ), A.doctype = "", A.sgmlDecl = "") : $ === ">" ? (I(A, "onsgmldeclaration", A.sgmlDecl), A.sgmlDecl = "", A.state = _.TEXT) : (T($) && (A.state = _.SGML_DECL_QUOTED), A.sgmlDecl += $);
              continue;
            case _.SGML_DECL_QUOTED:
              $ === A.q && (A.state = _.SGML_DECL, A.q = ""), A.sgmlDecl += $;
              continue;
            case _.DOCTYPE:
              $ === ">" ? (A.state = _.TEXT, I(A, "ondoctype", A.doctype), A.doctype = !0) : (A.doctype += $, $ === "[" ? A.state = _.DOCTYPE_DTD : T($) && (A.state = _.DOCTYPE_QUOTED, A.q = $));
              continue;
            case _.DOCTYPE_QUOTED:
              A.doctype += $, $ === A.q && (A.q = "", A.state = _.DOCTYPE);
              continue;
            case _.DOCTYPE_DTD:
              $ === "]" ? (A.doctype += $, A.state = _.DOCTYPE) : $ === "<" ? (A.state = _.OPEN_WAKA, A.startTagPosition = A.position) : T($) ? (A.doctype += $, A.state = _.DOCTYPE_DTD_QUOTED, A.q = $) : A.doctype += $;
              continue;
            case _.DOCTYPE_DTD_QUOTED:
              A.doctype += $, $ === A.q && (A.state = _.DOCTYPE_DTD, A.q = "");
              continue;
            case _.COMMENT:
              $ === "-" ? A.state = _.COMMENT_ENDING : A.comment += $;
              continue;
            case _.COMMENT_ENDING:
              $ === "-" ? (A.state = _.COMMENT_ENDED, A.comment = R(A.opt, A.comment), A.comment && I(A, "oncomment", A.comment), A.comment = "") : (A.comment += "-" + $, A.state = _.COMMENT);
              continue;
            case _.COMMENT_ENDED:
              $ !== ">" ? (U(A, "Malformed comment"), A.comment += "--" + $, A.state = _.COMMENT) : A.doctype && A.doctype !== !0 ? A.state = _.DOCTYPE_DTD : A.state = _.TEXT;
              continue;
            case _.CDATA:
              for (var be = G - 1; $ && $ !== "]"; )
                $ = Z(k, G++), $ && A.trackPosition && (A.position++, $ === `
` ? (A.line++, A.column = 0) : A.column++);
              A.cdata += k.substring(be, G - 1), $ === "]" && (A.state = _.CDATA_ENDING);
              continue;
            case _.CDATA_ENDING:
              $ === "]" ? A.state = _.CDATA_ENDING_2 : (A.cdata += "]" + $, A.state = _.CDATA);
              continue;
            case _.CDATA_ENDING_2:
              $ === ">" ? (A.cdata && I(A, "oncdata", A.cdata), I(A, "onclosecdata"), A.cdata = "", A.state = _.TEXT) : $ === "]" ? A.cdata += "]" : (A.cdata += "]]" + $, A.state = _.CDATA);
              continue;
            case _.PROC_INST:
              $ === "?" ? A.state = _.PROC_INST_ENDING : S($) ? A.state = _.PROC_INST_BODY : A.procInstName += $;
              continue;
            case _.PROC_INST_BODY:
              if (!A.procInstBody && S($))
                continue;
              $ === "?" ? A.state = _.PROC_INST_ENDING : A.procInstBody += $;
              continue;
            case _.PROC_INST_ENDING:
              $ === ">" ? (I(A, "onprocessinginstruction", {
                name: A.procInstName,
                body: A.procInstBody
              }), A.procInstName = A.procInstBody = "", A.state = _.TEXT) : (A.procInstBody += "?" + $, A.state = _.PROC_INST_BODY);
              continue;
            case _.OPEN_TAG:
              E(x, $) ? A.tagName += $ : (z(A), $ === ">" ? ae(A) : $ === "/" ? A.state = _.OPEN_TAG_SLASH : (S($) || U(A, "Invalid character in tag name"), A.state = _.ATTRIB));
              continue;
            case _.OPEN_TAG_SLASH:
              $ === ">" ? (ae(A, !0), oe(A)) : (U(
                A,
                "Forward-slash in opening tag not followed by >"
              ), A.state = _.ATTRIB);
              continue;
            case _.ATTRIB:
              if (S($))
                continue;
              $ === ">" ? ae(A) : $ === "/" ? A.state = _.OPEN_TAG_SLASH : E(p, $) ? (A.attribName = $, A.attribValue = "", A.state = _.ATTRIB_NAME) : U(A, "Invalid attribute name");
              continue;
            case _.ATTRIB_NAME:
              $ === "=" ? A.state = _.ATTRIB_VALUE : $ === ">" ? (U(A, "Attribute without value"), A.attribValue = A.attribName, ie(A), ae(A)) : S($) ? A.state = _.ATTRIB_NAME_SAW_WHITE : E(x, $) ? A.attribName += $ : U(A, "Invalid attribute name");
              continue;
            case _.ATTRIB_NAME_SAW_WHITE:
              if ($ === "=")
                A.state = _.ATTRIB_VALUE;
              else {
                if (S($))
                  continue;
                U(A, "Attribute without value"), A.tag.attributes[A.attribName] = "", A.attribValue = "", I(A, "onattribute", {
                  name: A.attribName,
                  value: ""
                }), A.attribName = "", $ === ">" ? ae(A) : E(p, $) ? (A.attribName = $, A.state = _.ATTRIB_NAME) : (U(A, "Invalid attribute name"), A.state = _.ATTRIB);
              }
              continue;
            case _.ATTRIB_VALUE:
              if (S($))
                continue;
              T($) ? (A.q = $, A.state = _.ATTRIB_VALUE_QUOTED) : (A.opt.unquotedAttributeValues || N(A, "Unquoted attribute value"), A.state = _.ATTRIB_VALUE_UNQUOTED, A.attribValue = $);
              continue;
            case _.ATTRIB_VALUE_QUOTED:
              if ($ !== A.q) {
                $ === "&" ? A.state = _.ATTRIB_VALUE_ENTITY_Q : A.attribValue += $;
                continue;
              }
              ie(A), A.q = "", A.state = _.ATTRIB_VALUE_CLOSED;
              continue;
            case _.ATTRIB_VALUE_CLOSED:
              S($) ? A.state = _.ATTRIB : $ === ">" ? ae(A) : $ === "/" ? A.state = _.OPEN_TAG_SLASH : E(p, $) ? (U(A, "No whitespace between attributes"), A.attribName = $, A.attribValue = "", A.state = _.ATTRIB_NAME) : U(A, "Invalid attribute name");
              continue;
            case _.ATTRIB_VALUE_UNQUOTED:
              if (!y($)) {
                $ === "&" ? A.state = _.ATTRIB_VALUE_ENTITY_U : A.attribValue += $;
                continue;
              }
              ie(A), $ === ">" ? ae(A) : A.state = _.ATTRIB;
              continue;
            case _.CLOSE_TAG:
              if (A.tagName)
                $ === ">" ? oe(A) : E(x, $) ? A.tagName += $ : A.script ? (A.script += "</" + A.tagName, A.tagName = "", A.state = _.SCRIPT) : (S($) || U(A, "Invalid tagname in closing tag"), A.state = _.CLOSE_TAG_SAW_WHITE);
              else {
                if (S($))
                  continue;
                w(p, $) ? A.script ? (A.script += "</" + $, A.state = _.SCRIPT) : U(A, "Invalid tagname in closing tag.") : A.tagName = $;
              }
              continue;
            case _.CLOSE_TAG_SAW_WHITE:
              if (S($))
                continue;
              $ === ">" ? oe(A) : U(A, "Invalid characters in closing tag");
              continue;
            case _.TEXT_ENTITY:
            case _.ATTRIB_VALUE_ENTITY_Q:
            case _.ATTRIB_VALUE_ENTITY_U:
              var we, Re;
              switch (A.state) {
                case _.TEXT_ENTITY:
                  we = _.TEXT, Re = "textNode";
                  break;
                case _.ATTRIB_VALUE_ENTITY_Q:
                  we = _.ATTRIB_VALUE_QUOTED, Re = "attribValue";
                  break;
                case _.ATTRIB_VALUE_ENTITY_U:
                  we = _.ATTRIB_VALUE_UNQUOTED, Re = "attribValue";
                  break;
              }
              if ($ === ";") {
                var Ce = ye(A);
                A.opt.unparsedEntities && !Object.values(m.XML_ENTITIES).includes(Ce) ? (A.entity = "", A.state = we, A.write(Ce)) : (A[Re] += Ce, A.entity = "", A.state = we);
              } else E(A.entity.length ? C : b, $) ? A.entity += $ : (U(A, "Invalid character in entity name"), A[Re] += "&" + A.entity + $, A.entity = "", A.state = we);
              continue;
            default:
              throw new Error(A, "Unknown state: " + A.state);
          }
        return A.position >= A.bufferCheckPosition && d(A), A;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || (function() {
        var k = String.fromCharCode, A = Math.floor, G = function() {
          var $ = 16384, me = [], be, we, Re = -1, Ce = arguments.length;
          if (!Ce)
            return "";
          for (var Be = ""; ++Re < Ce; ) {
            var j = Number(arguments[Re]);
            if (!isFinite(j) || // `NaN`, `+Infinity`, or `-Infinity`
            j < 0 || // not a valid Unicode code point
            j > 1114111 || // not a valid Unicode code point
            A(j) !== j)
              throw RangeError("Invalid code point: " + j);
            j <= 65535 ? me.push(j) : (j -= 65536, be = (j >> 10) + 55296, we = j % 1024 + 56320, me.push(be, we)), (Re + 1 === Ce || me.length > $) && (Be += k.apply(null, me), me.length = 0);
          }
          return Be;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: G,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = G;
      })();
    })(o);
  })(Ur)), Ur;
}
var ic;
function fh() {
  if (ic) return Zt;
  ic = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.XElement = void 0, Zt.parseXml = t;
  const o = dh(), m = Mi();
  class v {
    constructor(n) {
      if (this.name = n, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !n)
        throw (0, m.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!d(n))
        throw (0, m.newError)(`Invalid element name: ${n}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(n) {
      const e = this.attributes === null ? null : this.attributes[n];
      if (e == null)
        throw (0, m.newError)(`No attribute "${n}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return e;
    }
    removeAttribute(n) {
      this.attributes !== null && delete this.attributes[n];
    }
    element(n, e = !1, i = null) {
      const l = this.elementOrNull(n, e);
      if (l === null)
        throw (0, m.newError)(i || `No element "${n}"`, "ERR_XML_MISSED_ELEMENT");
      return l;
    }
    elementOrNull(n, e = !1) {
      if (this.elements === null)
        return null;
      for (const i of this.elements)
        if (c(i, n, e))
          return i;
      return null;
    }
    getElements(n, e = !1) {
      return this.elements === null ? [] : this.elements.filter((i) => c(i, n, e));
    }
    elementValueOrEmpty(n, e = !1) {
      const i = this.elementOrNull(n, e);
      return i === null ? "" : i.value;
    }
  }
  Zt.XElement = v;
  const h = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function d(a) {
    return h.test(a);
  }
  function c(a, n, e) {
    const i = a.name;
    return i === n || e === !0 && i.length === n.length && i.toLowerCase() === n.toLowerCase();
  }
  function t(a) {
    let n = null;
    const e = o.parser(!0, {}), i = [];
    return e.onopentag = (l) => {
      const r = new v(l.name);
      if (r.attributes = l.attributes, n === null)
        n = r;
      else {
        const u = i[i.length - 1];
        u.elements == null && (u.elements = []), u.elements.push(r);
      }
      i.push(r);
    }, e.onclosetag = () => {
      i.pop();
    }, e.ontext = (l) => {
      i.length > 0 && (i[i.length - 1].value = l);
    }, e.oncdata = (l) => {
      const r = i[i.length - 1];
      r.value = l, r.isCData = !0;
    }, e.onerror = (l) => {
      throw l;
    }, e.write(a), n;
  }
  return Zt;
}
var rc;
function Me() {
  return rc || (rc = 1, (function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.CURRENT_APP_PACKAGE_FILE_NAME = o.CURRENT_APP_INSTALLER_FILE_NAME = o.XElement = o.parseXml = o.UUID = o.parseDn = o.retry = o.githubUrl = o.getS3LikeProviderBaseUrl = o.ProgressCallbackTransform = o.MemoLazy = o.safeStringifyJson = o.safeGetHeader = o.parseJson = o.HttpExecutor = o.HttpError = o.DigestTransform = o.createHttpError = o.configureRequestUrl = o.configureRequestOptionsFromUrl = o.configureRequestOptions = o.newError = o.CancellationToken = o.CancellationError = void 0, o.asArray = l;
    var m = Pa();
    Object.defineProperty(o, "CancellationError", { enumerable: !0, get: function() {
      return m.CancellationError;
    } }), Object.defineProperty(o, "CancellationToken", { enumerable: !0, get: function() {
      return m.CancellationToken;
    } });
    var v = Mi();
    Object.defineProperty(o, "newError", { enumerable: !0, get: function() {
      return v.newError;
    } });
    var h = ah();
    Object.defineProperty(o, "configureRequestOptions", { enumerable: !0, get: function() {
      return h.configureRequestOptions;
    } }), Object.defineProperty(o, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return h.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(o, "configureRequestUrl", { enumerable: !0, get: function() {
      return h.configureRequestUrl;
    } }), Object.defineProperty(o, "createHttpError", { enumerable: !0, get: function() {
      return h.createHttpError;
    } }), Object.defineProperty(o, "DigestTransform", { enumerable: !0, get: function() {
      return h.DigestTransform;
    } }), Object.defineProperty(o, "HttpError", { enumerable: !0, get: function() {
      return h.HttpError;
    } }), Object.defineProperty(o, "HttpExecutor", { enumerable: !0, get: function() {
      return h.HttpExecutor;
    } }), Object.defineProperty(o, "parseJson", { enumerable: !0, get: function() {
      return h.parseJson;
    } }), Object.defineProperty(o, "safeGetHeader", { enumerable: !0, get: function() {
      return h.safeGetHeader;
    } }), Object.defineProperty(o, "safeStringifyJson", { enumerable: !0, get: function() {
      return h.safeStringifyJson;
    } });
    var d = oh();
    Object.defineProperty(o, "MemoLazy", { enumerable: !0, get: function() {
      return d.MemoLazy;
    } });
    var c = Sp();
    Object.defineProperty(o, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return c.ProgressCallbackTransform;
    } });
    var t = ch();
    Object.defineProperty(o, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return t.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(o, "githubUrl", { enumerable: !0, get: function() {
      return t.githubUrl;
    } });
    var a = lh();
    Object.defineProperty(o, "retry", { enumerable: !0, get: function() {
      return a.retry;
    } });
    var n = uh();
    Object.defineProperty(o, "parseDn", { enumerable: !0, get: function() {
      return n.parseDn;
    } });
    var e = ph();
    Object.defineProperty(o, "UUID", { enumerable: !0, get: function() {
      return e.UUID;
    } });
    var i = fh();
    Object.defineProperty(o, "parseXml", { enumerable: !0, get: function() {
      return i.parseXml;
    } }), Object.defineProperty(o, "XElement", { enumerable: !0, get: function() {
      return i.XElement;
    } }), o.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", o.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function l(r) {
      return r == null ? [] : Array.isArray(r) ? r : [r];
    }
  })(Nr)), Nr;
}
var Ge = {}, Ei = {}, Et = {}, sc;
function ri() {
  if (sc) return Et;
  sc = 1;
  function o(t) {
    return typeof t > "u" || t === null;
  }
  function m(t) {
    return typeof t == "object" && t !== null;
  }
  function v(t) {
    return Array.isArray(t) ? t : o(t) ? [] : [t];
  }
  function h(t, a) {
    var n, e, i, l;
    if (a)
      for (l = Object.keys(a), n = 0, e = l.length; n < e; n += 1)
        i = l[n], t[i] = a[i];
    return t;
  }
  function d(t, a) {
    var n = "", e;
    for (e = 0; e < a; e += 1)
      n += t;
    return n;
  }
  function c(t) {
    return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
  }
  return Et.isNothing = o, Et.isObject = m, Et.toArray = v, Et.repeat = d, Et.isNegativeZero = c, Et.extend = h, Et;
}
var qr, ac;
function si() {
  if (ac) return qr;
  ac = 1;
  function o(v, h) {
    var d = "", c = v.reason || "(unknown reason)";
    return v.mark ? (v.mark.name && (d += 'in "' + v.mark.name + '" '), d += "(" + (v.mark.line + 1) + ":" + (v.mark.column + 1) + ")", !h && v.mark.snippet && (d += `

` + v.mark.snippet), c + " " + d) : c;
  }
  function m(v, h) {
    Error.call(this), this.name = "YAMLException", this.reason = v, this.mark = h, this.message = o(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return m.prototype = Object.create(Error.prototype), m.prototype.constructor = m, m.prototype.toString = function(h) {
    return this.name + ": " + o(this, h);
  }, qr = m, qr;
}
var $r, oc;
function hh() {
  if (oc) return $r;
  oc = 1;
  var o = ri();
  function m(d, c, t, a, n) {
    var e = "", i = "", l = Math.floor(n / 2) - 1;
    return a - c > l && (e = " ... ", c = a - l + e.length), t - a > l && (i = " ...", t = a + l - i.length), {
      str: e + d.slice(c, t).replace(/\t/g, "→") + i,
      pos: a - c + e.length
      // relative position
    };
  }
  function v(d, c) {
    return o.repeat(" ", c - d.length) + d;
  }
  function h(d, c) {
    if (c = Object.create(c || null), !d.buffer) return null;
    c.maxLength || (c.maxLength = 79), typeof c.indent != "number" && (c.indent = 1), typeof c.linesBefore != "number" && (c.linesBefore = 3), typeof c.linesAfter != "number" && (c.linesAfter = 2);
    for (var t = /\r?\n|\r|\0/g, a = [0], n = [], e, i = -1; e = t.exec(d.buffer); )
      n.push(e.index), a.push(e.index + e[0].length), d.position <= e.index && i < 0 && (i = a.length - 2);
    i < 0 && (i = a.length - 1);
    var l = "", r, u, s = Math.min(d.line + c.linesAfter, n.length).toString().length, f = c.maxLength - (c.indent + s + 3);
    for (r = 1; r <= c.linesBefore && !(i - r < 0); r++)
      u = m(
        d.buffer,
        a[i - r],
        n[i - r],
        d.position - (a[i] - a[i - r]),
        f
      ), l = o.repeat(" ", c.indent) + v((d.line - r + 1).toString(), s) + " | " + u.str + `
` + l;
    for (u = m(d.buffer, a[i], n[i], d.position, f), l += o.repeat(" ", c.indent) + v((d.line + 1).toString(), s) + " | " + u.str + `
`, l += o.repeat("-", c.indent + s + 3 + u.pos) + `^
`, r = 1; r <= c.linesAfter && !(i + r >= n.length); r++)
      u = m(
        d.buffer,
        a[i + r],
        n[i + r],
        d.position - (a[i] - a[i + r]),
        f
      ), l += o.repeat(" ", c.indent) + v((d.line + r + 1).toString(), s) + " | " + u.str + `
`;
    return l.replace(/\n$/, "");
  }
  return $r = h, $r;
}
var Br, cc;
function Ye() {
  if (cc) return Br;
  cc = 1;
  var o = si(), m = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], v = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function h(c) {
    var t = {};
    return c !== null && Object.keys(c).forEach(function(a) {
      c[a].forEach(function(n) {
        t[String(n)] = a;
      });
    }), t;
  }
  function d(c, t) {
    if (t = t || {}, Object.keys(t).forEach(function(a) {
      if (m.indexOf(a) === -1)
        throw new o('Unknown option "' + a + '" is met in definition of "' + c + '" YAML type.');
    }), this.options = t, this.tag = c, this.kind = t.kind || null, this.resolve = t.resolve || function() {
      return !0;
    }, this.construct = t.construct || function(a) {
      return a;
    }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = h(t.styleAliases || null), v.indexOf(this.kind) === -1)
      throw new o('Unknown kind "' + this.kind + '" is specified for "' + c + '" YAML type.');
  }
  return Br = d, Br;
}
var jr, lc;
function Tp() {
  if (lc) return jr;
  lc = 1;
  var o = si(), m = Ye();
  function v(c, t) {
    var a = [];
    return c[t].forEach(function(n) {
      var e = a.length;
      a.forEach(function(i, l) {
        i.tag === n.tag && i.kind === n.kind && i.multi === n.multi && (e = l);
      }), a[e] = n;
    }), a;
  }
  function h() {
    var c = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, t, a;
    function n(e) {
      e.multi ? (c.multi[e.kind].push(e), c.multi.fallback.push(e)) : c[e.kind][e.tag] = c.fallback[e.tag] = e;
    }
    for (t = 0, a = arguments.length; t < a; t += 1)
      arguments[t].forEach(n);
    return c;
  }
  function d(c) {
    return this.extend(c);
  }
  return d.prototype.extend = function(t) {
    var a = [], n = [];
    if (t instanceof m)
      n.push(t);
    else if (Array.isArray(t))
      n = n.concat(t);
    else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
      t.implicit && (a = a.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
    else
      throw new o("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    a.forEach(function(i) {
      if (!(i instanceof m))
        throw new o("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (i.loadKind && i.loadKind !== "scalar")
        throw new o("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (i.multi)
        throw new o("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), n.forEach(function(i) {
      if (!(i instanceof m))
        throw new o("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var e = Object.create(d.prototype);
    return e.implicit = (this.implicit || []).concat(a), e.explicit = (this.explicit || []).concat(n), e.compiledImplicit = v(e, "implicit"), e.compiledExplicit = v(e, "explicit"), e.compiledTypeMap = h(e.compiledImplicit, e.compiledExplicit), e;
  }, jr = d, jr;
}
var Mr, uc;
function Cp() {
  if (uc) return Mr;
  uc = 1;
  var o = Ye();
  return Mr = new o("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(m) {
      return m !== null ? m : "";
    }
  }), Mr;
}
var Hr, pc;
function Rp() {
  if (pc) return Hr;
  pc = 1;
  var o = Ye();
  return Hr = new o("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(m) {
      return m !== null ? m : [];
    }
  }), Hr;
}
var zr, dc;
function Ap() {
  if (dc) return zr;
  dc = 1;
  var o = Ye();
  return zr = new o("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(m) {
      return m !== null ? m : {};
    }
  }), zr;
}
var Gr, fc;
function kp() {
  if (fc) return Gr;
  fc = 1;
  var o = Tp();
  return Gr = new o({
    explicit: [
      Cp(),
      Rp(),
      Ap()
    ]
  }), Gr;
}
var Wr, hc;
function Op() {
  if (hc) return Wr;
  hc = 1;
  var o = Ye();
  function m(d) {
    if (d === null) return !0;
    var c = d.length;
    return c === 1 && d === "~" || c === 4 && (d === "null" || d === "Null" || d === "NULL");
  }
  function v() {
    return null;
  }
  function h(d) {
    return d === null;
  }
  return Wr = new o("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: m,
    construct: v,
    predicate: h,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  }), Wr;
}
var Vr, mc;
function Pp() {
  if (mc) return Vr;
  mc = 1;
  var o = Ye();
  function m(d) {
    if (d === null) return !1;
    var c = d.length;
    return c === 4 && (d === "true" || d === "True" || d === "TRUE") || c === 5 && (d === "false" || d === "False" || d === "FALSE");
  }
  function v(d) {
    return d === "true" || d === "True" || d === "TRUE";
  }
  function h(d) {
    return Object.prototype.toString.call(d) === "[object Boolean]";
  }
  return Vr = new o("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: m,
    construct: v,
    predicate: h,
    represent: {
      lowercase: function(d) {
        return d ? "true" : "false";
      },
      uppercase: function(d) {
        return d ? "TRUE" : "FALSE";
      },
      camelcase: function(d) {
        return d ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), Vr;
}
var Yr, vc;
function Np() {
  if (vc) return Yr;
  vc = 1;
  var o = ri(), m = Ye();
  function v(n) {
    return 48 <= n && n <= 57 || 65 <= n && n <= 70 || 97 <= n && n <= 102;
  }
  function h(n) {
    return 48 <= n && n <= 55;
  }
  function d(n) {
    return 48 <= n && n <= 57;
  }
  function c(n) {
    if (n === null) return !1;
    var e = n.length, i = 0, l = !1, r;
    if (!e) return !1;
    if (r = n[i], (r === "-" || r === "+") && (r = n[++i]), r === "0") {
      if (i + 1 === e) return !0;
      if (r = n[++i], r === "b") {
        for (i++; i < e; i++)
          if (r = n[i], r !== "_") {
            if (r !== "0" && r !== "1") return !1;
            l = !0;
          }
        return l && r !== "_";
      }
      if (r === "x") {
        for (i++; i < e; i++)
          if (r = n[i], r !== "_") {
            if (!v(n.charCodeAt(i))) return !1;
            l = !0;
          }
        return l && r !== "_";
      }
      if (r === "o") {
        for (i++; i < e; i++)
          if (r = n[i], r !== "_") {
            if (!h(n.charCodeAt(i))) return !1;
            l = !0;
          }
        return l && r !== "_";
      }
    }
    if (r === "_") return !1;
    for (; i < e; i++)
      if (r = n[i], r !== "_") {
        if (!d(n.charCodeAt(i)))
          return !1;
        l = !0;
      }
    return !(!l || r === "_");
  }
  function t(n) {
    var e = n, i = 1, l;
    if (e.indexOf("_") !== -1 && (e = e.replace(/_/g, "")), l = e[0], (l === "-" || l === "+") && (l === "-" && (i = -1), e = e.slice(1), l = e[0]), e === "0") return 0;
    if (l === "0") {
      if (e[1] === "b") return i * parseInt(e.slice(2), 2);
      if (e[1] === "x") return i * parseInt(e.slice(2), 16);
      if (e[1] === "o") return i * parseInt(e.slice(2), 8);
    }
    return i * parseInt(e, 10);
  }
  function a(n) {
    return Object.prototype.toString.call(n) === "[object Number]" && n % 1 === 0 && !o.isNegativeZero(n);
  }
  return Yr = new m("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: c,
    construct: t,
    predicate: a,
    represent: {
      binary: function(n) {
        return n >= 0 ? "0b" + n.toString(2) : "-0b" + n.toString(2).slice(1);
      },
      octal: function(n) {
        return n >= 0 ? "0o" + n.toString(8) : "-0o" + n.toString(8).slice(1);
      },
      decimal: function(n) {
        return n.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(n) {
        return n >= 0 ? "0x" + n.toString(16).toUpperCase() : "-0x" + n.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), Yr;
}
var Kr, gc;
function Dp() {
  if (gc) return Kr;
  gc = 1;
  var o = ri(), m = Ye(), v = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function h(n) {
    return !(n === null || !v.test(n) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    n[n.length - 1] === "_");
  }
  function d(n) {
    var e, i;
    return e = n.replace(/_/g, "").toLowerCase(), i = e[0] === "-" ? -1 : 1, "+-".indexOf(e[0]) >= 0 && (e = e.slice(1)), e === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : e === ".nan" ? NaN : i * parseFloat(e, 10);
  }
  var c = /^[-+]?[0-9]+e/;
  function t(n, e) {
    var i;
    if (isNaN(n))
      switch (e) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === n)
      switch (e) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === n)
      switch (e) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (o.isNegativeZero(n))
      return "-0.0";
    return i = n.toString(10), c.test(i) ? i.replace("e", ".e") : i;
  }
  function a(n) {
    return Object.prototype.toString.call(n) === "[object Number]" && (n % 1 !== 0 || o.isNegativeZero(n));
  }
  return Kr = new m("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: h,
    construct: d,
    predicate: a,
    represent: t,
    defaultStyle: "lowercase"
  }), Kr;
}
var Xr, xc;
function Ip() {
  return xc || (xc = 1, Xr = kp().extend({
    implicit: [
      Op(),
      Pp(),
      Np(),
      Dp()
    ]
  })), Xr;
}
var Jr, yc;
function Lp() {
  return yc || (yc = 1, Jr = Ip()), Jr;
}
var Qr, bc;
function Fp() {
  if (bc) return Qr;
  bc = 1;
  var o = Ye(), m = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), v = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function h(t) {
    return t === null ? !1 : m.exec(t) !== null || v.exec(t) !== null;
  }
  function d(t) {
    var a, n, e, i, l, r, u, s = 0, f = null, p, x, b;
    if (a = m.exec(t), a === null && (a = v.exec(t)), a === null) throw new Error("Date resolve error");
    if (n = +a[1], e = +a[2] - 1, i = +a[3], !a[4])
      return new Date(Date.UTC(n, e, i));
    if (l = +a[4], r = +a[5], u = +a[6], a[7]) {
      for (s = a[7].slice(0, 3); s.length < 3; )
        s += "0";
      s = +s;
    }
    return a[9] && (p = +a[10], x = +(a[11] || 0), f = (p * 60 + x) * 6e4, a[9] === "-" && (f = -f)), b = new Date(Date.UTC(n, e, i, l, r, u, s)), f && b.setTime(b.getTime() - f), b;
  }
  function c(t) {
    return t.toISOString();
  }
  return Qr = new o("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: h,
    construct: d,
    instanceOf: Date,
    represent: c
  }), Qr;
}
var Zr, wc;
function Up() {
  if (wc) return Zr;
  wc = 1;
  var o = Ye();
  function m(v) {
    return v === "<<" || v === null;
  }
  return Zr = new o("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: m
  }), Zr;
}
var es, _c;
function qp() {
  if (_c) return es;
  _c = 1;
  var o = Ye(), m = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function v(t) {
    if (t === null) return !1;
    var a, n, e = 0, i = t.length, l = m;
    for (n = 0; n < i; n++)
      if (a = l.indexOf(t.charAt(n)), !(a > 64)) {
        if (a < 0) return !1;
        e += 6;
      }
    return e % 8 === 0;
  }
  function h(t) {
    var a, n, e = t.replace(/[\r\n=]/g, ""), i = e.length, l = m, r = 0, u = [];
    for (a = 0; a < i; a++)
      a % 4 === 0 && a && (u.push(r >> 16 & 255), u.push(r >> 8 & 255), u.push(r & 255)), r = r << 6 | l.indexOf(e.charAt(a));
    return n = i % 4 * 6, n === 0 ? (u.push(r >> 16 & 255), u.push(r >> 8 & 255), u.push(r & 255)) : n === 18 ? (u.push(r >> 10 & 255), u.push(r >> 2 & 255)) : n === 12 && u.push(r >> 4 & 255), new Uint8Array(u);
  }
  function d(t) {
    var a = "", n = 0, e, i, l = t.length, r = m;
    for (e = 0; e < l; e++)
      e % 3 === 0 && e && (a += r[n >> 18 & 63], a += r[n >> 12 & 63], a += r[n >> 6 & 63], a += r[n & 63]), n = (n << 8) + t[e];
    return i = l % 3, i === 0 ? (a += r[n >> 18 & 63], a += r[n >> 12 & 63], a += r[n >> 6 & 63], a += r[n & 63]) : i === 2 ? (a += r[n >> 10 & 63], a += r[n >> 4 & 63], a += r[n << 2 & 63], a += r[64]) : i === 1 && (a += r[n >> 2 & 63], a += r[n << 4 & 63], a += r[64], a += r[64]), a;
  }
  function c(t) {
    return Object.prototype.toString.call(t) === "[object Uint8Array]";
  }
  return es = new o("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: v,
    construct: h,
    predicate: c,
    represent: d
  }), es;
}
var ts, Ec;
function $p() {
  if (Ec) return ts;
  Ec = 1;
  var o = Ye(), m = Object.prototype.hasOwnProperty, v = Object.prototype.toString;
  function h(c) {
    if (c === null) return !0;
    var t = [], a, n, e, i, l, r = c;
    for (a = 0, n = r.length; a < n; a += 1) {
      if (e = r[a], l = !1, v.call(e) !== "[object Object]") return !1;
      for (i in e)
        if (m.call(e, i))
          if (!l) l = !0;
          else return !1;
      if (!l) return !1;
      if (t.indexOf(i) === -1) t.push(i);
      else return !1;
    }
    return !0;
  }
  function d(c) {
    return c !== null ? c : [];
  }
  return ts = new o("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: h,
    construct: d
  }), ts;
}
var ns, Sc;
function Bp() {
  if (Sc) return ns;
  Sc = 1;
  var o = Ye(), m = Object.prototype.toString;
  function v(d) {
    if (d === null) return !0;
    var c, t, a, n, e, i = d;
    for (e = new Array(i.length), c = 0, t = i.length; c < t; c += 1) {
      if (a = i[c], m.call(a) !== "[object Object]" || (n = Object.keys(a), n.length !== 1)) return !1;
      e[c] = [n[0], a[n[0]]];
    }
    return !0;
  }
  function h(d) {
    if (d === null) return [];
    var c, t, a, n, e, i = d;
    for (e = new Array(i.length), c = 0, t = i.length; c < t; c += 1)
      a = i[c], n = Object.keys(a), e[c] = [n[0], a[n[0]]];
    return e;
  }
  return ns = new o("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: v,
    construct: h
  }), ns;
}
var is, Tc;
function jp() {
  if (Tc) return is;
  Tc = 1;
  var o = Ye(), m = Object.prototype.hasOwnProperty;
  function v(d) {
    if (d === null) return !0;
    var c, t = d;
    for (c in t)
      if (m.call(t, c) && t[c] !== null)
        return !1;
    return !0;
  }
  function h(d) {
    return d !== null ? d : {};
  }
  return is = new o("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: v,
    construct: h
  }), is;
}
var rs, Cc;
function Na() {
  return Cc || (Cc = 1, rs = Lp().extend({
    implicit: [
      Fp(),
      Up()
    ],
    explicit: [
      qp(),
      $p(),
      Bp(),
      jp()
    ]
  })), rs;
}
var Rc;
function mh() {
  if (Rc) return Ei;
  Rc = 1;
  var o = ri(), m = si(), v = hh(), h = Na(), d = Object.prototype.hasOwnProperty, c = 1, t = 2, a = 3, n = 4, e = 1, i = 2, l = 3, r = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, u = /[\x85\u2028\u2029]/, s = /[,\[\]\{\}]/, f = /^(?:!|!!|![a-z\-]+!)$/i, p = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function x(g) {
    return Object.prototype.toString.call(g);
  }
  function b(g) {
    return g === 10 || g === 13;
  }
  function C(g) {
    return g === 9 || g === 32;
  }
  function S(g) {
    return g === 9 || g === 32 || g === 10 || g === 13;
  }
  function T(g) {
    return g === 44 || g === 91 || g === 93 || g === 123 || g === 125;
  }
  function y(g) {
    var H;
    return 48 <= g && g <= 57 ? g - 48 : (H = g | 32, 97 <= H && H <= 102 ? H - 97 + 10 : -1);
  }
  function E(g) {
    return g === 120 ? 2 : g === 117 ? 4 : g === 85 ? 8 : 0;
  }
  function w(g) {
    return 48 <= g && g <= 57 ? g - 48 : -1;
  }
  function _(g) {
    return g === 48 ? "\0" : g === 97 ? "\x07" : g === 98 ? "\b" : g === 116 || g === 9 ? "	" : g === 110 ? `
` : g === 118 ? "\v" : g === 102 ? "\f" : g === 114 ? "\r" : g === 101 ? "\x1B" : g === 32 ? " " : g === 34 ? '"' : g === 47 ? "/" : g === 92 ? "\\" : g === 78 ? "" : g === 95 ? " " : g === 76 ? "\u2028" : g === 80 ? "\u2029" : "";
  }
  function D(g) {
    return g <= 65535 ? String.fromCharCode(g) : String.fromCharCode(
      (g - 65536 >> 10) + 55296,
      (g - 65536 & 1023) + 56320
    );
  }
  function O(g, H, V) {
    H === "__proto__" ? Object.defineProperty(g, H, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: V
    }) : g[H] = V;
  }
  for (var I = new Array(256), q = new Array(256), R = 0; R < 256; R++)
    I[R] = _(R) ? 1 : 0, q[R] = _(R);
  function N(g, H) {
    this.input = g, this.filename = H.filename || null, this.schema = H.schema || h, this.onWarning = H.onWarning || null, this.legacy = H.legacy || !1, this.json = H.json || !1, this.listener = H.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = g.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function F(g, H) {
    var V = {
      name: g.filename,
      buffer: g.input.slice(0, -1),
      // omit trailing \0
      position: g.position,
      line: g.line,
      column: g.position - g.lineStart
    };
    return V.snippet = v(V), new m(H, V);
  }
  function U(g, H) {
    throw F(g, H);
  }
  function z(g, H) {
    g.onWarning && g.onWarning.call(null, F(g, H));
  }
  var W = {
    YAML: function(H, V, se) {
      var X, re, te;
      H.version !== null && U(H, "duplication of %YAML directive"), se.length !== 1 && U(H, "YAML directive accepts exactly one argument"), X = /^([0-9]+)\.([0-9]+)$/.exec(se[0]), X === null && U(H, "ill-formed argument of the YAML directive"), re = parseInt(X[1], 10), te = parseInt(X[2], 10), re !== 1 && U(H, "unacceptable YAML version of the document"), H.version = se[0], H.checkLineBreaks = te < 2, te !== 1 && te !== 2 && z(H, "unsupported YAML version of the document");
    },
    TAG: function(H, V, se) {
      var X, re;
      se.length !== 2 && U(H, "TAG directive accepts exactly two arguments"), X = se[0], re = se[1], f.test(X) || U(H, "ill-formed tag handle (first argument) of the TAG directive"), d.call(H.tagMap, X) && U(H, 'there is a previously declared suffix for "' + X + '" tag handle'), p.test(re) || U(H, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        re = decodeURIComponent(re);
      } catch {
        U(H, "tag prefix is malformed: " + re);
      }
      H.tagMap[X] = re;
    }
  };
  function ie(g, H, V, se) {
    var X, re, te, ce;
    if (H < V) {
      if (ce = g.input.slice(H, V), se)
        for (X = 0, re = ce.length; X < re; X += 1)
          te = ce.charCodeAt(X), te === 9 || 32 <= te && te <= 1114111 || U(g, "expected valid JSON character");
      else r.test(ce) && U(g, "the stream contains non-printable characters");
      g.result += ce;
    }
  }
  function ae(g, H, V, se) {
    var X, re, te, ce;
    for (o.isObject(V) || U(g, "cannot merge mappings; the provided source object is unacceptable"), X = Object.keys(V), te = 0, ce = X.length; te < ce; te += 1)
      re = X[te], d.call(H, re) || (O(H, re, V[re]), se[re] = !0);
  }
  function oe(g, H, V, se, X, re, te, ce, pe) {
    var Te, ge;
    if (Array.isArray(X))
      for (X = Array.prototype.slice.call(X), Te = 0, ge = X.length; Te < ge; Te += 1)
        Array.isArray(X[Te]) && U(g, "nested arrays are not supported inside keys"), typeof X == "object" && x(X[Te]) === "[object Object]" && (X[Te] = "[object Object]");
    if (typeof X == "object" && x(X) === "[object Object]" && (X = "[object Object]"), X = String(X), H === null && (H = {}), se === "tag:yaml.org,2002:merge")
      if (Array.isArray(re))
        for (Te = 0, ge = re.length; Te < ge; Te += 1)
          ae(g, H, re[Te], V);
      else
        ae(g, H, re, V);
    else
      !g.json && !d.call(V, X) && d.call(H, X) && (g.line = te || g.line, g.lineStart = ce || g.lineStart, g.position = pe || g.position, U(g, "duplicated mapping key")), O(H, X, re), delete V[X];
    return H;
  }
  function ye(g) {
    var H;
    H = g.input.charCodeAt(g.position), H === 10 ? g.position++ : H === 13 ? (g.position++, g.input.charCodeAt(g.position) === 10 && g.position++) : U(g, "a line break is expected"), g.line += 1, g.lineStart = g.position, g.firstTabInLine = -1;
  }
  function _e(g, H, V) {
    for (var se = 0, X = g.input.charCodeAt(g.position); X !== 0; ) {
      for (; C(X); )
        X === 9 && g.firstTabInLine === -1 && (g.firstTabInLine = g.position), X = g.input.charCodeAt(++g.position);
      if (H && X === 35)
        do
          X = g.input.charCodeAt(++g.position);
        while (X !== 10 && X !== 13 && X !== 0);
      if (b(X))
        for (ye(g), X = g.input.charCodeAt(g.position), se++, g.lineIndent = 0; X === 32; )
          g.lineIndent++, X = g.input.charCodeAt(++g.position);
      else
        break;
    }
    return V !== -1 && se !== 0 && g.lineIndent < V && z(g, "deficient indentation"), se;
  }
  function Z(g) {
    var H = g.position, V;
    return V = g.input.charCodeAt(H), !!((V === 45 || V === 46) && V === g.input.charCodeAt(H + 1) && V === g.input.charCodeAt(H + 2) && (H += 3, V = g.input.charCodeAt(H), V === 0 || S(V)));
  }
  function Se(g, H) {
    H === 1 ? g.result += " " : H > 1 && (g.result += o.repeat(`
`, H - 1));
  }
  function k(g, H, V) {
    var se, X, re, te, ce, pe, Te, ge, fe = g.kind, P = g.result, M;
    if (M = g.input.charCodeAt(g.position), S(M) || T(M) || M === 35 || M === 38 || M === 42 || M === 33 || M === 124 || M === 62 || M === 39 || M === 34 || M === 37 || M === 64 || M === 96 || (M === 63 || M === 45) && (X = g.input.charCodeAt(g.position + 1), S(X) || V && T(X)))
      return !1;
    for (g.kind = "scalar", g.result = "", re = te = g.position, ce = !1; M !== 0; ) {
      if (M === 58) {
        if (X = g.input.charCodeAt(g.position + 1), S(X) || V && T(X))
          break;
      } else if (M === 35) {
        if (se = g.input.charCodeAt(g.position - 1), S(se))
          break;
      } else {
        if (g.position === g.lineStart && Z(g) || V && T(M))
          break;
        if (b(M))
          if (pe = g.line, Te = g.lineStart, ge = g.lineIndent, _e(g, !1, -1), g.lineIndent >= H) {
            ce = !0, M = g.input.charCodeAt(g.position);
            continue;
          } else {
            g.position = te, g.line = pe, g.lineStart = Te, g.lineIndent = ge;
            break;
          }
      }
      ce && (ie(g, re, te, !1), Se(g, g.line - pe), re = te = g.position, ce = !1), C(M) || (te = g.position + 1), M = g.input.charCodeAt(++g.position);
    }
    return ie(g, re, te, !1), g.result ? !0 : (g.kind = fe, g.result = P, !1);
  }
  function A(g, H) {
    var V, se, X;
    if (V = g.input.charCodeAt(g.position), V !== 39)
      return !1;
    for (g.kind = "scalar", g.result = "", g.position++, se = X = g.position; (V = g.input.charCodeAt(g.position)) !== 0; )
      if (V === 39)
        if (ie(g, se, g.position, !0), V = g.input.charCodeAt(++g.position), V === 39)
          se = g.position, g.position++, X = g.position;
        else
          return !0;
      else b(V) ? (ie(g, se, X, !0), Se(g, _e(g, !1, H)), se = X = g.position) : g.position === g.lineStart && Z(g) ? U(g, "unexpected end of the document within a single quoted scalar") : (g.position++, X = g.position);
    U(g, "unexpected end of the stream within a single quoted scalar");
  }
  function G(g, H) {
    var V, se, X, re, te, ce;
    if (ce = g.input.charCodeAt(g.position), ce !== 34)
      return !1;
    for (g.kind = "scalar", g.result = "", g.position++, V = se = g.position; (ce = g.input.charCodeAt(g.position)) !== 0; ) {
      if (ce === 34)
        return ie(g, V, g.position, !0), g.position++, !0;
      if (ce === 92) {
        if (ie(g, V, g.position, !0), ce = g.input.charCodeAt(++g.position), b(ce))
          _e(g, !1, H);
        else if (ce < 256 && I[ce])
          g.result += q[ce], g.position++;
        else if ((te = E(ce)) > 0) {
          for (X = te, re = 0; X > 0; X--)
            ce = g.input.charCodeAt(++g.position), (te = y(ce)) >= 0 ? re = (re << 4) + te : U(g, "expected hexadecimal character");
          g.result += D(re), g.position++;
        } else
          U(g, "unknown escape sequence");
        V = se = g.position;
      } else b(ce) ? (ie(g, V, se, !0), Se(g, _e(g, !1, H)), V = se = g.position) : g.position === g.lineStart && Z(g) ? U(g, "unexpected end of the document within a double quoted scalar") : (g.position++, se = g.position);
    }
    U(g, "unexpected end of the stream within a double quoted scalar");
  }
  function $(g, H) {
    var V = !0, se, X, re, te = g.tag, ce, pe = g.anchor, Te, ge, fe, P, M, J = /* @__PURE__ */ Object.create(null), K, Q, le, ne;
    if (ne = g.input.charCodeAt(g.position), ne === 91)
      ge = 93, M = !1, ce = [];
    else if (ne === 123)
      ge = 125, M = !0, ce = {};
    else
      return !1;
    for (g.anchor !== null && (g.anchorMap[g.anchor] = ce), ne = g.input.charCodeAt(++g.position); ne !== 0; ) {
      if (_e(g, !0, H), ne = g.input.charCodeAt(g.position), ne === ge)
        return g.position++, g.tag = te, g.anchor = pe, g.kind = M ? "mapping" : "sequence", g.result = ce, !0;
      V ? ne === 44 && U(g, "expected the node content, but found ','") : U(g, "missed comma between flow collection entries"), Q = K = le = null, fe = P = !1, ne === 63 && (Te = g.input.charCodeAt(g.position + 1), S(Te) && (fe = P = !0, g.position++, _e(g, !0, H))), se = g.line, X = g.lineStart, re = g.position, j(g, H, c, !1, !0), Q = g.tag, K = g.result, _e(g, !0, H), ne = g.input.charCodeAt(g.position), (P || g.line === se) && ne === 58 && (fe = !0, ne = g.input.charCodeAt(++g.position), _e(g, !0, H), j(g, H, c, !1, !0), le = g.result), M ? oe(g, ce, J, Q, K, le, se, X, re) : fe ? ce.push(oe(g, null, J, Q, K, le, se, X, re)) : ce.push(K), _e(g, !0, H), ne = g.input.charCodeAt(g.position), ne === 44 ? (V = !0, ne = g.input.charCodeAt(++g.position)) : V = !1;
    }
    U(g, "unexpected end of the stream within a flow collection");
  }
  function me(g, H) {
    var V, se, X = e, re = !1, te = !1, ce = H, pe = 0, Te = !1, ge, fe;
    if (fe = g.input.charCodeAt(g.position), fe === 124)
      se = !1;
    else if (fe === 62)
      se = !0;
    else
      return !1;
    for (g.kind = "scalar", g.result = ""; fe !== 0; )
      if (fe = g.input.charCodeAt(++g.position), fe === 43 || fe === 45)
        e === X ? X = fe === 43 ? l : i : U(g, "repeat of a chomping mode identifier");
      else if ((ge = w(fe)) >= 0)
        ge === 0 ? U(g, "bad explicit indentation width of a block scalar; it cannot be less than one") : te ? U(g, "repeat of an indentation width identifier") : (ce = H + ge - 1, te = !0);
      else
        break;
    if (C(fe)) {
      do
        fe = g.input.charCodeAt(++g.position);
      while (C(fe));
      if (fe === 35)
        do
          fe = g.input.charCodeAt(++g.position);
        while (!b(fe) && fe !== 0);
    }
    for (; fe !== 0; ) {
      for (ye(g), g.lineIndent = 0, fe = g.input.charCodeAt(g.position); (!te || g.lineIndent < ce) && fe === 32; )
        g.lineIndent++, fe = g.input.charCodeAt(++g.position);
      if (!te && g.lineIndent > ce && (ce = g.lineIndent), b(fe)) {
        pe++;
        continue;
      }
      if (g.lineIndent < ce) {
        X === l ? g.result += o.repeat(`
`, re ? 1 + pe : pe) : X === e && re && (g.result += `
`);
        break;
      }
      for (se ? C(fe) ? (Te = !0, g.result += o.repeat(`
`, re ? 1 + pe : pe)) : Te ? (Te = !1, g.result += o.repeat(`
`, pe + 1)) : pe === 0 ? re && (g.result += " ") : g.result += o.repeat(`
`, pe) : g.result += o.repeat(`
`, re ? 1 + pe : pe), re = !0, te = !0, pe = 0, V = g.position; !b(fe) && fe !== 0; )
        fe = g.input.charCodeAt(++g.position);
      ie(g, V, g.position, !1);
    }
    return !0;
  }
  function be(g, H) {
    var V, se = g.tag, X = g.anchor, re = [], te, ce = !1, pe;
    if (g.firstTabInLine !== -1) return !1;
    for (g.anchor !== null && (g.anchorMap[g.anchor] = re), pe = g.input.charCodeAt(g.position); pe !== 0 && (g.firstTabInLine !== -1 && (g.position = g.firstTabInLine, U(g, "tab characters must not be used in indentation")), !(pe !== 45 || (te = g.input.charCodeAt(g.position + 1), !S(te)))); ) {
      if (ce = !0, g.position++, _e(g, !0, -1) && g.lineIndent <= H) {
        re.push(null), pe = g.input.charCodeAt(g.position);
        continue;
      }
      if (V = g.line, j(g, H, a, !1, !0), re.push(g.result), _e(g, !0, -1), pe = g.input.charCodeAt(g.position), (g.line === V || g.lineIndent > H) && pe !== 0)
        U(g, "bad indentation of a sequence entry");
      else if (g.lineIndent < H)
        break;
    }
    return ce ? (g.tag = se, g.anchor = X, g.kind = "sequence", g.result = re, !0) : !1;
  }
  function we(g, H, V) {
    var se, X, re, te, ce, pe, Te = g.tag, ge = g.anchor, fe = {}, P = /* @__PURE__ */ Object.create(null), M = null, J = null, K = null, Q = !1, le = !1, ne;
    if (g.firstTabInLine !== -1) return !1;
    for (g.anchor !== null && (g.anchorMap[g.anchor] = fe), ne = g.input.charCodeAt(g.position); ne !== 0; ) {
      if (!Q && g.firstTabInLine !== -1 && (g.position = g.firstTabInLine, U(g, "tab characters must not be used in indentation")), se = g.input.charCodeAt(g.position + 1), re = g.line, (ne === 63 || ne === 58) && S(se))
        ne === 63 ? (Q && (oe(g, fe, P, M, J, null, te, ce, pe), M = J = K = null), le = !0, Q = !0, X = !0) : Q ? (Q = !1, X = !0) : U(g, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), g.position += 1, ne = se;
      else {
        if (te = g.line, ce = g.lineStart, pe = g.position, !j(g, V, t, !1, !0))
          break;
        if (g.line === re) {
          for (ne = g.input.charCodeAt(g.position); C(ne); )
            ne = g.input.charCodeAt(++g.position);
          if (ne === 58)
            ne = g.input.charCodeAt(++g.position), S(ne) || U(g, "a whitespace character is expected after the key-value separator within a block mapping"), Q && (oe(g, fe, P, M, J, null, te, ce, pe), M = J = K = null), le = !0, Q = !1, X = !1, M = g.tag, J = g.result;
          else if (le)
            U(g, "can not read an implicit mapping pair; a colon is missed");
          else
            return g.tag = Te, g.anchor = ge, !0;
        } else if (le)
          U(g, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return g.tag = Te, g.anchor = ge, !0;
      }
      if ((g.line === re || g.lineIndent > H) && (Q && (te = g.line, ce = g.lineStart, pe = g.position), j(g, H, n, !0, X) && (Q ? J = g.result : K = g.result), Q || (oe(g, fe, P, M, J, K, te, ce, pe), M = J = K = null), _e(g, !0, -1), ne = g.input.charCodeAt(g.position)), (g.line === re || g.lineIndent > H) && ne !== 0)
        U(g, "bad indentation of a mapping entry");
      else if (g.lineIndent < H)
        break;
    }
    return Q && oe(g, fe, P, M, J, null, te, ce, pe), le && (g.tag = Te, g.anchor = ge, g.kind = "mapping", g.result = fe), le;
  }
  function Re(g) {
    var H, V = !1, se = !1, X, re, te;
    if (te = g.input.charCodeAt(g.position), te !== 33) return !1;
    if (g.tag !== null && U(g, "duplication of a tag property"), te = g.input.charCodeAt(++g.position), te === 60 ? (V = !0, te = g.input.charCodeAt(++g.position)) : te === 33 ? (se = !0, X = "!!", te = g.input.charCodeAt(++g.position)) : X = "!", H = g.position, V) {
      do
        te = g.input.charCodeAt(++g.position);
      while (te !== 0 && te !== 62);
      g.position < g.length ? (re = g.input.slice(H, g.position), te = g.input.charCodeAt(++g.position)) : U(g, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; te !== 0 && !S(te); )
        te === 33 && (se ? U(g, "tag suffix cannot contain exclamation marks") : (X = g.input.slice(H - 1, g.position + 1), f.test(X) || U(g, "named tag handle cannot contain such characters"), se = !0, H = g.position + 1)), te = g.input.charCodeAt(++g.position);
      re = g.input.slice(H, g.position), s.test(re) && U(g, "tag suffix cannot contain flow indicator characters");
    }
    re && !p.test(re) && U(g, "tag name cannot contain such characters: " + re);
    try {
      re = decodeURIComponent(re);
    } catch {
      U(g, "tag name is malformed: " + re);
    }
    return V ? g.tag = re : d.call(g.tagMap, X) ? g.tag = g.tagMap[X] + re : X === "!" ? g.tag = "!" + re : X === "!!" ? g.tag = "tag:yaml.org,2002:" + re : U(g, 'undeclared tag handle "' + X + '"'), !0;
  }
  function Ce(g) {
    var H, V;
    if (V = g.input.charCodeAt(g.position), V !== 38) return !1;
    for (g.anchor !== null && U(g, "duplication of an anchor property"), V = g.input.charCodeAt(++g.position), H = g.position; V !== 0 && !S(V) && !T(V); )
      V = g.input.charCodeAt(++g.position);
    return g.position === H && U(g, "name of an anchor node must contain at least one character"), g.anchor = g.input.slice(H, g.position), !0;
  }
  function Be(g) {
    var H, V, se;
    if (se = g.input.charCodeAt(g.position), se !== 42) return !1;
    for (se = g.input.charCodeAt(++g.position), H = g.position; se !== 0 && !S(se) && !T(se); )
      se = g.input.charCodeAt(++g.position);
    return g.position === H && U(g, "name of an alias node must contain at least one character"), V = g.input.slice(H, g.position), d.call(g.anchorMap, V) || U(g, 'unidentified alias "' + V + '"'), g.result = g.anchorMap[V], _e(g, !0, -1), !0;
  }
  function j(g, H, V, se, X) {
    var re, te, ce, pe = 1, Te = !1, ge = !1, fe, P, M, J, K, Q;
    if (g.listener !== null && g.listener("open", g), g.tag = null, g.anchor = null, g.kind = null, g.result = null, re = te = ce = n === V || a === V, se && _e(g, !0, -1) && (Te = !0, g.lineIndent > H ? pe = 1 : g.lineIndent === H ? pe = 0 : g.lineIndent < H && (pe = -1)), pe === 1)
      for (; Re(g) || Ce(g); )
        _e(g, !0, -1) ? (Te = !0, ce = re, g.lineIndent > H ? pe = 1 : g.lineIndent === H ? pe = 0 : g.lineIndent < H && (pe = -1)) : ce = !1;
    if (ce && (ce = Te || X), (pe === 1 || n === V) && (c === V || t === V ? K = H : K = H + 1, Q = g.position - g.lineStart, pe === 1 ? ce && (be(g, Q) || we(g, Q, K)) || $(g, K) ? ge = !0 : (te && me(g, K) || A(g, K) || G(g, K) ? ge = !0 : Be(g) ? (ge = !0, (g.tag !== null || g.anchor !== null) && U(g, "alias node should not have any properties")) : k(g, K, c === V) && (ge = !0, g.tag === null && (g.tag = "?")), g.anchor !== null && (g.anchorMap[g.anchor] = g.result)) : pe === 0 && (ge = ce && be(g, Q))), g.tag === null)
      g.anchor !== null && (g.anchorMap[g.anchor] = g.result);
    else if (g.tag === "?") {
      for (g.result !== null && g.kind !== "scalar" && U(g, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + g.kind + '"'), fe = 0, P = g.implicitTypes.length; fe < P; fe += 1)
        if (J = g.implicitTypes[fe], J.resolve(g.result)) {
          g.result = J.construct(g.result), g.tag = J.tag, g.anchor !== null && (g.anchorMap[g.anchor] = g.result);
          break;
        }
    } else if (g.tag !== "!") {
      if (d.call(g.typeMap[g.kind || "fallback"], g.tag))
        J = g.typeMap[g.kind || "fallback"][g.tag];
      else
        for (J = null, M = g.typeMap.multi[g.kind || "fallback"], fe = 0, P = M.length; fe < P; fe += 1)
          if (g.tag.slice(0, M[fe].tag.length) === M[fe].tag) {
            J = M[fe];
            break;
          }
      J || U(g, "unknown tag !<" + g.tag + ">"), g.result !== null && J.kind !== g.kind && U(g, "unacceptable node kind for !<" + g.tag + '> tag; it should be "' + J.kind + '", not "' + g.kind + '"'), J.resolve(g.result, g.tag) ? (g.result = J.construct(g.result, g.tag), g.anchor !== null && (g.anchorMap[g.anchor] = g.result)) : U(g, "cannot resolve a node with !<" + g.tag + "> explicit tag");
    }
    return g.listener !== null && g.listener("close", g), g.tag !== null || g.anchor !== null || ge;
  }
  function Y(g) {
    var H = g.position, V, se, X, re = !1, te;
    for (g.version = null, g.checkLineBreaks = g.legacy, g.tagMap = /* @__PURE__ */ Object.create(null), g.anchorMap = /* @__PURE__ */ Object.create(null); (te = g.input.charCodeAt(g.position)) !== 0 && (_e(g, !0, -1), te = g.input.charCodeAt(g.position), !(g.lineIndent > 0 || te !== 37)); ) {
      for (re = !0, te = g.input.charCodeAt(++g.position), V = g.position; te !== 0 && !S(te); )
        te = g.input.charCodeAt(++g.position);
      for (se = g.input.slice(V, g.position), X = [], se.length < 1 && U(g, "directive name must not be less than one character in length"); te !== 0; ) {
        for (; C(te); )
          te = g.input.charCodeAt(++g.position);
        if (te === 35) {
          do
            te = g.input.charCodeAt(++g.position);
          while (te !== 0 && !b(te));
          break;
        }
        if (b(te)) break;
        for (V = g.position; te !== 0 && !S(te); )
          te = g.input.charCodeAt(++g.position);
        X.push(g.input.slice(V, g.position));
      }
      te !== 0 && ye(g), d.call(W, se) ? W[se](g, se, X) : z(g, 'unknown document directive "' + se + '"');
    }
    if (_e(g, !0, -1), g.lineIndent === 0 && g.input.charCodeAt(g.position) === 45 && g.input.charCodeAt(g.position + 1) === 45 && g.input.charCodeAt(g.position + 2) === 45 ? (g.position += 3, _e(g, !0, -1)) : re && U(g, "directives end mark is expected"), j(g, g.lineIndent - 1, n, !1, !0), _e(g, !0, -1), g.checkLineBreaks && u.test(g.input.slice(H, g.position)) && z(g, "non-ASCII line breaks are interpreted as content"), g.documents.push(g.result), g.position === g.lineStart && Z(g)) {
      g.input.charCodeAt(g.position) === 46 && (g.position += 3, _e(g, !0, -1));
      return;
    }
    if (g.position < g.length - 1)
      U(g, "end of the stream or a document separator is expected");
    else
      return;
  }
  function he(g, H) {
    g = String(g), H = H || {}, g.length !== 0 && (g.charCodeAt(g.length - 1) !== 10 && g.charCodeAt(g.length - 1) !== 13 && (g += `
`), g.charCodeAt(0) === 65279 && (g = g.slice(1)));
    var V = new N(g, H), se = g.indexOf("\0");
    for (se !== -1 && (V.position = se, U(V, "null byte is not allowed in input")), V.input += "\0"; V.input.charCodeAt(V.position) === 32; )
      V.lineIndent += 1, V.position += 1;
    for (; V.position < V.length - 1; )
      Y(V);
    return V.documents;
  }
  function Ee(g, H, V) {
    H !== null && typeof H == "object" && typeof V > "u" && (V = H, H = null);
    var se = he(g, V);
    if (typeof H != "function")
      return se;
    for (var X = 0, re = se.length; X < re; X += 1)
      H(se[X]);
  }
  function ue(g, H) {
    var V = he(g, H);
    if (V.length !== 0) {
      if (V.length === 1)
        return V[0];
      throw new m("expected a single document in the stream, but found more");
    }
  }
  return Ei.loadAll = Ee, Ei.load = ue, Ei;
}
var ss = {}, Ac;
function vh() {
  if (Ac) return ss;
  Ac = 1;
  var o = ri(), m = si(), v = Na(), h = Object.prototype.toString, d = Object.prototype.hasOwnProperty, c = 65279, t = 9, a = 10, n = 13, e = 32, i = 33, l = 34, r = 35, u = 37, s = 38, f = 39, p = 42, x = 44, b = 45, C = 58, S = 61, T = 62, y = 63, E = 64, w = 91, _ = 93, D = 96, O = 123, I = 124, q = 125, R = {};
  R[0] = "\\0", R[7] = "\\a", R[8] = "\\b", R[9] = "\\t", R[10] = "\\n", R[11] = "\\v", R[12] = "\\f", R[13] = "\\r", R[27] = "\\e", R[34] = '\\"', R[92] = "\\\\", R[133] = "\\N", R[160] = "\\_", R[8232] = "\\L", R[8233] = "\\P";
  var N = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], F = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function U(P, M) {
    var J, K, Q, le, ne, de, xe;
    if (M === null) return {};
    for (J = {}, K = Object.keys(M), Q = 0, le = K.length; Q < le; Q += 1)
      ne = K[Q], de = String(M[ne]), ne.slice(0, 2) === "!!" && (ne = "tag:yaml.org,2002:" + ne.slice(2)), xe = P.compiledTypeMap.fallback[ne], xe && d.call(xe.styleAliases, de) && (de = xe.styleAliases[de]), J[ne] = de;
    return J;
  }
  function z(P) {
    var M, J, K;
    if (M = P.toString(16).toUpperCase(), P <= 255)
      J = "x", K = 2;
    else if (P <= 65535)
      J = "u", K = 4;
    else if (P <= 4294967295)
      J = "U", K = 8;
    else
      throw new m("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + J + o.repeat("0", K - M.length) + M;
  }
  var W = 1, ie = 2;
  function ae(P) {
    this.schema = P.schema || v, this.indent = Math.max(1, P.indent || 2), this.noArrayIndent = P.noArrayIndent || !1, this.skipInvalid = P.skipInvalid || !1, this.flowLevel = o.isNothing(P.flowLevel) ? -1 : P.flowLevel, this.styleMap = U(this.schema, P.styles || null), this.sortKeys = P.sortKeys || !1, this.lineWidth = P.lineWidth || 80, this.noRefs = P.noRefs || !1, this.noCompatMode = P.noCompatMode || !1, this.condenseFlow = P.condenseFlow || !1, this.quotingType = P.quotingType === '"' ? ie : W, this.forceQuotes = P.forceQuotes || !1, this.replacer = typeof P.replacer == "function" ? P.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function oe(P, M) {
    for (var J = o.repeat(" ", M), K = 0, Q = -1, le = "", ne, de = P.length; K < de; )
      Q = P.indexOf(`
`, K), Q === -1 ? (ne = P.slice(K), K = de) : (ne = P.slice(K, Q + 1), K = Q + 1), ne.length && ne !== `
` && (le += J), le += ne;
    return le;
  }
  function ye(P, M) {
    return `
` + o.repeat(" ", P.indent * M);
  }
  function _e(P, M) {
    var J, K, Q;
    for (J = 0, K = P.implicitTypes.length; J < K; J += 1)
      if (Q = P.implicitTypes[J], Q.resolve(M))
        return !0;
    return !1;
  }
  function Z(P) {
    return P === e || P === t;
  }
  function Se(P) {
    return 32 <= P && P <= 126 || 161 <= P && P <= 55295 && P !== 8232 && P !== 8233 || 57344 <= P && P <= 65533 && P !== c || 65536 <= P && P <= 1114111;
  }
  function k(P) {
    return Se(P) && P !== c && P !== n && P !== a;
  }
  function A(P, M, J) {
    var K = k(P), Q = K && !Z(P);
    return (
      // ns-plain-safe
      (J ? (
        // c = flow-in
        K
      ) : K && P !== x && P !== w && P !== _ && P !== O && P !== q) && P !== r && !(M === C && !Q) || k(M) && !Z(M) && P === r || M === C && Q
    );
  }
  function G(P) {
    return Se(P) && P !== c && !Z(P) && P !== b && P !== y && P !== C && P !== x && P !== w && P !== _ && P !== O && P !== q && P !== r && P !== s && P !== p && P !== i && P !== I && P !== S && P !== T && P !== f && P !== l && P !== u && P !== E && P !== D;
  }
  function $(P) {
    return !Z(P) && P !== C;
  }
  function me(P, M) {
    var J = P.charCodeAt(M), K;
    return J >= 55296 && J <= 56319 && M + 1 < P.length && (K = P.charCodeAt(M + 1), K >= 56320 && K <= 57343) ? (J - 55296) * 1024 + K - 56320 + 65536 : J;
  }
  function be(P) {
    var M = /^\n* /;
    return M.test(P);
  }
  var we = 1, Re = 2, Ce = 3, Be = 4, j = 5;
  function Y(P, M, J, K, Q, le, ne, de) {
    var xe, Ae = 0, Ne = null, Fe = !1, Oe = !1, Jt = K !== -1, st = -1, kt = G(me(P, 0)) && $(me(P, P.length - 1));
    if (M || ne)
      for (xe = 0; xe < P.length; Ae >= 65536 ? xe += 2 : xe++) {
        if (Ae = me(P, xe), !Se(Ae))
          return j;
        kt = kt && A(Ae, Ne, de), Ne = Ae;
      }
    else {
      for (xe = 0; xe < P.length; Ae >= 65536 ? xe += 2 : xe++) {
        if (Ae = me(P, xe), Ae === a)
          Fe = !0, Jt && (Oe = Oe || // Foldable line = too long, and not more-indented.
          xe - st - 1 > K && P[st + 1] !== " ", st = xe);
        else if (!Se(Ae))
          return j;
        kt = kt && A(Ae, Ne, de), Ne = Ae;
      }
      Oe = Oe || Jt && xe - st - 1 > K && P[st + 1] !== " ";
    }
    return !Fe && !Oe ? kt && !ne && !Q(P) ? we : le === ie ? j : Re : J > 9 && be(P) ? j : ne ? le === ie ? j : Re : Oe ? Be : Ce;
  }
  function he(P, M, J, K, Q) {
    P.dump = (function() {
      if (M.length === 0)
        return P.quotingType === ie ? '""' : "''";
      if (!P.noCompatMode && (N.indexOf(M) !== -1 || F.test(M)))
        return P.quotingType === ie ? '"' + M + '"' : "'" + M + "'";
      var le = P.indent * Math.max(1, J), ne = P.lineWidth === -1 ? -1 : Math.max(Math.min(P.lineWidth, 40), P.lineWidth - le), de = K || P.flowLevel > -1 && J >= P.flowLevel;
      function xe(Ae) {
        return _e(P, Ae);
      }
      switch (Y(
        M,
        de,
        P.indent,
        ne,
        xe,
        P.quotingType,
        P.forceQuotes && !K,
        Q
      )) {
        case we:
          return M;
        case Re:
          return "'" + M.replace(/'/g, "''") + "'";
        case Ce:
          return "|" + Ee(M, P.indent) + ue(oe(M, le));
        case Be:
          return ">" + Ee(M, P.indent) + ue(oe(g(M, ne), le));
        case j:
          return '"' + V(M) + '"';
        default:
          throw new m("impossible error: invalid scalar style");
      }
    })();
  }
  function Ee(P, M) {
    var J = be(P) ? String(M) : "", K = P[P.length - 1] === `
`, Q = K && (P[P.length - 2] === `
` || P === `
`), le = Q ? "+" : K ? "" : "-";
    return J + le + `
`;
  }
  function ue(P) {
    return P[P.length - 1] === `
` ? P.slice(0, -1) : P;
  }
  function g(P, M) {
    for (var J = /(\n+)([^\n]*)/g, K = (function() {
      var Ae = P.indexOf(`
`);
      return Ae = Ae !== -1 ? Ae : P.length, J.lastIndex = Ae, H(P.slice(0, Ae), M);
    })(), Q = P[0] === `
` || P[0] === " ", le, ne; ne = J.exec(P); ) {
      var de = ne[1], xe = ne[2];
      le = xe[0] === " ", K += de + (!Q && !le && xe !== "" ? `
` : "") + H(xe, M), Q = le;
    }
    return K;
  }
  function H(P, M) {
    if (P === "" || P[0] === " ") return P;
    for (var J = / [^ ]/g, K, Q = 0, le, ne = 0, de = 0, xe = ""; K = J.exec(P); )
      de = K.index, de - Q > M && (le = ne > Q ? ne : de, xe += `
` + P.slice(Q, le), Q = le + 1), ne = de;
    return xe += `
`, P.length - Q > M && ne > Q ? xe += P.slice(Q, ne) + `
` + P.slice(ne + 1) : xe += P.slice(Q), xe.slice(1);
  }
  function V(P) {
    for (var M = "", J = 0, K, Q = 0; Q < P.length; J >= 65536 ? Q += 2 : Q++)
      J = me(P, Q), K = R[J], !K && Se(J) ? (M += P[Q], J >= 65536 && (M += P[Q + 1])) : M += K || z(J);
    return M;
  }
  function se(P, M, J) {
    var K = "", Q = P.tag, le, ne, de;
    for (le = 0, ne = J.length; le < ne; le += 1)
      de = J[le], P.replacer && (de = P.replacer.call(J, String(le), de)), (pe(P, M, de, !1, !1) || typeof de > "u" && pe(P, M, null, !1, !1)) && (K !== "" && (K += "," + (P.condenseFlow ? "" : " ")), K += P.dump);
    P.tag = Q, P.dump = "[" + K + "]";
  }
  function X(P, M, J, K) {
    var Q = "", le = P.tag, ne, de, xe;
    for (ne = 0, de = J.length; ne < de; ne += 1)
      xe = J[ne], P.replacer && (xe = P.replacer.call(J, String(ne), xe)), (pe(P, M + 1, xe, !0, !0, !1, !0) || typeof xe > "u" && pe(P, M + 1, null, !0, !0, !1, !0)) && ((!K || Q !== "") && (Q += ye(P, M)), P.dump && a === P.dump.charCodeAt(0) ? Q += "-" : Q += "- ", Q += P.dump);
    P.tag = le, P.dump = Q || "[]";
  }
  function re(P, M, J) {
    var K = "", Q = P.tag, le = Object.keys(J), ne, de, xe, Ae, Ne;
    for (ne = 0, de = le.length; ne < de; ne += 1)
      Ne = "", K !== "" && (Ne += ", "), P.condenseFlow && (Ne += '"'), xe = le[ne], Ae = J[xe], P.replacer && (Ae = P.replacer.call(J, xe, Ae)), pe(P, M, xe, !1, !1) && (P.dump.length > 1024 && (Ne += "? "), Ne += P.dump + (P.condenseFlow ? '"' : "") + ":" + (P.condenseFlow ? "" : " "), pe(P, M, Ae, !1, !1) && (Ne += P.dump, K += Ne));
    P.tag = Q, P.dump = "{" + K + "}";
  }
  function te(P, M, J, K) {
    var Q = "", le = P.tag, ne = Object.keys(J), de, xe, Ae, Ne, Fe, Oe;
    if (P.sortKeys === !0)
      ne.sort();
    else if (typeof P.sortKeys == "function")
      ne.sort(P.sortKeys);
    else if (P.sortKeys)
      throw new m("sortKeys must be a boolean or a function");
    for (de = 0, xe = ne.length; de < xe; de += 1)
      Oe = "", (!K || Q !== "") && (Oe += ye(P, M)), Ae = ne[de], Ne = J[Ae], P.replacer && (Ne = P.replacer.call(J, Ae, Ne)), pe(P, M + 1, Ae, !0, !0, !0) && (Fe = P.tag !== null && P.tag !== "?" || P.dump && P.dump.length > 1024, Fe && (P.dump && a === P.dump.charCodeAt(0) ? Oe += "?" : Oe += "? "), Oe += P.dump, Fe && (Oe += ye(P, M)), pe(P, M + 1, Ne, !0, Fe) && (P.dump && a === P.dump.charCodeAt(0) ? Oe += ":" : Oe += ": ", Oe += P.dump, Q += Oe));
    P.tag = le, P.dump = Q || "{}";
  }
  function ce(P, M, J) {
    var K, Q, le, ne, de, xe;
    for (Q = J ? P.explicitTypes : P.implicitTypes, le = 0, ne = Q.length; le < ne; le += 1)
      if (de = Q[le], (de.instanceOf || de.predicate) && (!de.instanceOf || typeof M == "object" && M instanceof de.instanceOf) && (!de.predicate || de.predicate(M))) {
        if (J ? de.multi && de.representName ? P.tag = de.representName(M) : P.tag = de.tag : P.tag = "?", de.represent) {
          if (xe = P.styleMap[de.tag] || de.defaultStyle, h.call(de.represent) === "[object Function]")
            K = de.represent(M, xe);
          else if (d.call(de.represent, xe))
            K = de.represent[xe](M, xe);
          else
            throw new m("!<" + de.tag + '> tag resolver accepts not "' + xe + '" style');
          P.dump = K;
        }
        return !0;
      }
    return !1;
  }
  function pe(P, M, J, K, Q, le, ne) {
    P.tag = null, P.dump = J, ce(P, J, !1) || ce(P, J, !0);
    var de = h.call(P.dump), xe = K, Ae;
    K && (K = P.flowLevel < 0 || P.flowLevel > M);
    var Ne = de === "[object Object]" || de === "[object Array]", Fe, Oe;
    if (Ne && (Fe = P.duplicates.indexOf(J), Oe = Fe !== -1), (P.tag !== null && P.tag !== "?" || Oe || P.indent !== 2 && M > 0) && (Q = !1), Oe && P.usedDuplicates[Fe])
      P.dump = "*ref_" + Fe;
    else {
      if (Ne && Oe && !P.usedDuplicates[Fe] && (P.usedDuplicates[Fe] = !0), de === "[object Object]")
        K && Object.keys(P.dump).length !== 0 ? (te(P, M, P.dump, Q), Oe && (P.dump = "&ref_" + Fe + P.dump)) : (re(P, M, P.dump), Oe && (P.dump = "&ref_" + Fe + " " + P.dump));
      else if (de === "[object Array]")
        K && P.dump.length !== 0 ? (P.noArrayIndent && !ne && M > 0 ? X(P, M - 1, P.dump, Q) : X(P, M, P.dump, Q), Oe && (P.dump = "&ref_" + Fe + P.dump)) : (se(P, M, P.dump), Oe && (P.dump = "&ref_" + Fe + " " + P.dump));
      else if (de === "[object String]")
        P.tag !== "?" && he(P, P.dump, M, le, xe);
      else {
        if (de === "[object Undefined]")
          return !1;
        if (P.skipInvalid) return !1;
        throw new m("unacceptable kind of an object to dump " + de);
      }
      P.tag !== null && P.tag !== "?" && (Ae = encodeURI(
        P.tag[0] === "!" ? P.tag.slice(1) : P.tag
      ).replace(/!/g, "%21"), P.tag[0] === "!" ? Ae = "!" + Ae : Ae.slice(0, 18) === "tag:yaml.org,2002:" ? Ae = "!!" + Ae.slice(18) : Ae = "!<" + Ae + ">", P.dump = Ae + " " + P.dump);
    }
    return !0;
  }
  function Te(P, M) {
    var J = [], K = [], Q, le;
    for (ge(P, J, K), Q = 0, le = K.length; Q < le; Q += 1)
      M.duplicates.push(J[K[Q]]);
    M.usedDuplicates = new Array(le);
  }
  function ge(P, M, J) {
    var K, Q, le;
    if (P !== null && typeof P == "object")
      if (Q = M.indexOf(P), Q !== -1)
        J.indexOf(Q) === -1 && J.push(Q);
      else if (M.push(P), Array.isArray(P))
        for (Q = 0, le = P.length; Q < le; Q += 1)
          ge(P[Q], M, J);
      else
        for (K = Object.keys(P), Q = 0, le = K.length; Q < le; Q += 1)
          ge(P[K[Q]], M, J);
  }
  function fe(P, M) {
    M = M || {};
    var J = new ae(M);
    J.noRefs || Te(P, J);
    var K = P;
    return J.replacer && (K = J.replacer.call({ "": K }, "", K)), pe(J, 0, K, !0, !0) ? J.dump + `
` : "";
  }
  return ss.dump = fe, ss;
}
var kc;
function Da() {
  if (kc) return Ge;
  kc = 1;
  var o = mh(), m = vh();
  function v(h, d) {
    return function() {
      throw new Error("Function yaml." + h + " is removed in js-yaml 4. Use yaml." + d + " instead, which is now safe by default.");
    };
  }
  return Ge.Type = Ye(), Ge.Schema = Tp(), Ge.FAILSAFE_SCHEMA = kp(), Ge.JSON_SCHEMA = Ip(), Ge.CORE_SCHEMA = Lp(), Ge.DEFAULT_SCHEMA = Na(), Ge.load = o.load, Ge.loadAll = o.loadAll, Ge.dump = m.dump, Ge.YAMLException = si(), Ge.types = {
    binary: qp(),
    float: Dp(),
    map: Ap(),
    null: Op(),
    pairs: Bp(),
    set: jp(),
    timestamp: Fp(),
    bool: Pp(),
    int: Np(),
    merge: Up(),
    omap: $p(),
    seq: Rp(),
    str: Cp()
  }, Ge.safeLoad = v("safeLoad", "load"), Ge.safeLoadAll = v("safeLoadAll", "loadAll"), Ge.safeDump = v("safeDump", "dump"), Ge;
}
var yn = {}, Oc;
function gh() {
  if (Oc) return yn;
  Oc = 1, Object.defineProperty(yn, "__esModule", { value: !0 }), yn.Lazy = void 0;
  class o {
    constructor(v) {
      this._value = null, this.creator = v;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const v = this.creator();
      return this.value = v, v;
    }
    set value(v) {
      this._value = v, this.creator = null;
    }
  }
  return yn.Lazy = o, yn;
}
var Si = { exports: {} }, as, Pc;
function Hi() {
  if (Pc) return as;
  Pc = 1;
  const o = "2.0.0", m = 256, v = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, h = 16, d = m - 6;
  return as = {
    MAX_LENGTH: m,
    MAX_SAFE_COMPONENT_LENGTH: h,
    MAX_SAFE_BUILD_LENGTH: d,
    MAX_SAFE_INTEGER: v,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: o,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, as;
}
var os, Nc;
function zi() {
  return Nc || (Nc = 1, os = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...m) => console.error("SEMVER", ...m) : () => {
  }), os;
}
var Dc;
function ai() {
  return Dc || (Dc = 1, (function(o, m) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: v,
      MAX_SAFE_BUILD_LENGTH: h,
      MAX_LENGTH: d
    } = Hi(), c = zi();
    m = o.exports = {};
    const t = m.re = [], a = m.safeRe = [], n = m.src = [], e = m.safeSrc = [], i = m.t = {};
    let l = 0;
    const r = "[a-zA-Z0-9-]", u = [
      ["\\s", 1],
      ["\\d", d],
      [r, h]
    ], s = (p) => {
      for (const [x, b] of u)
        p = p.split(`${x}*`).join(`${x}{0,${b}}`).split(`${x}+`).join(`${x}{1,${b}}`);
      return p;
    }, f = (p, x, b) => {
      const C = s(x), S = l++;
      c(p, S, x), i[p] = S, n[S] = x, e[S] = C, t[S] = new RegExp(x, b ? "g" : void 0), a[S] = new RegExp(C, b ? "g" : void 0);
    };
    f("NUMERICIDENTIFIER", "0|[1-9]\\d*"), f("NUMERICIDENTIFIERLOOSE", "\\d+"), f("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${r}*`), f("MAINVERSION", `(${n[i.NUMERICIDENTIFIER]})\\.(${n[i.NUMERICIDENTIFIER]})\\.(${n[i.NUMERICIDENTIFIER]})`), f("MAINVERSIONLOOSE", `(${n[i.NUMERICIDENTIFIERLOOSE]})\\.(${n[i.NUMERICIDENTIFIERLOOSE]})\\.(${n[i.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASEIDENTIFIER", `(?:${n[i.NONNUMERICIDENTIFIER]}|${n[i.NUMERICIDENTIFIER]})`), f("PRERELEASEIDENTIFIERLOOSE", `(?:${n[i.NONNUMERICIDENTIFIER]}|${n[i.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASE", `(?:-(${n[i.PRERELEASEIDENTIFIER]}(?:\\.${n[i.PRERELEASEIDENTIFIER]})*))`), f("PRERELEASELOOSE", `(?:-?(${n[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${n[i.PRERELEASEIDENTIFIERLOOSE]})*))`), f("BUILDIDENTIFIER", `${r}+`), f("BUILD", `(?:\\+(${n[i.BUILDIDENTIFIER]}(?:\\.${n[i.BUILDIDENTIFIER]})*))`), f("FULLPLAIN", `v?${n[i.MAINVERSION]}${n[i.PRERELEASE]}?${n[i.BUILD]}?`), f("FULL", `^${n[i.FULLPLAIN]}$`), f("LOOSEPLAIN", `[v=\\s]*${n[i.MAINVERSIONLOOSE]}${n[i.PRERELEASELOOSE]}?${n[i.BUILD]}?`), f("LOOSE", `^${n[i.LOOSEPLAIN]}$`), f("GTLT", "((?:<|>)?=?)"), f("XRANGEIDENTIFIERLOOSE", `${n[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), f("XRANGEIDENTIFIER", `${n[i.NUMERICIDENTIFIER]}|x|X|\\*`), f("XRANGEPLAIN", `[v=\\s]*(${n[i.XRANGEIDENTIFIER]})(?:\\.(${n[i.XRANGEIDENTIFIER]})(?:\\.(${n[i.XRANGEIDENTIFIER]})(?:${n[i.PRERELEASE]})?${n[i.BUILD]}?)?)?`), f("XRANGEPLAINLOOSE", `[v=\\s]*(${n[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[i.XRANGEIDENTIFIERLOOSE]})(?:${n[i.PRERELEASELOOSE]})?${n[i.BUILD]}?)?)?`), f("XRANGE", `^${n[i.GTLT]}\\s*${n[i.XRANGEPLAIN]}$`), f("XRANGELOOSE", `^${n[i.GTLT]}\\s*${n[i.XRANGEPLAINLOOSE]}$`), f("COERCEPLAIN", `(^|[^\\d])(\\d{1,${v}})(?:\\.(\\d{1,${v}}))?(?:\\.(\\d{1,${v}}))?`), f("COERCE", `${n[i.COERCEPLAIN]}(?:$|[^\\d])`), f("COERCEFULL", n[i.COERCEPLAIN] + `(?:${n[i.PRERELEASE]})?(?:${n[i.BUILD]})?(?:$|[^\\d])`), f("COERCERTL", n[i.COERCE], !0), f("COERCERTLFULL", n[i.COERCEFULL], !0), f("LONETILDE", "(?:~>?)"), f("TILDETRIM", `(\\s*)${n[i.LONETILDE]}\\s+`, !0), m.tildeTrimReplace = "$1~", f("TILDE", `^${n[i.LONETILDE]}${n[i.XRANGEPLAIN]}$`), f("TILDELOOSE", `^${n[i.LONETILDE]}${n[i.XRANGEPLAINLOOSE]}$`), f("LONECARET", "(?:\\^)"), f("CARETTRIM", `(\\s*)${n[i.LONECARET]}\\s+`, !0), m.caretTrimReplace = "$1^", f("CARET", `^${n[i.LONECARET]}${n[i.XRANGEPLAIN]}$`), f("CARETLOOSE", `^${n[i.LONECARET]}${n[i.XRANGEPLAINLOOSE]}$`), f("COMPARATORLOOSE", `^${n[i.GTLT]}\\s*(${n[i.LOOSEPLAIN]})$|^$`), f("COMPARATOR", `^${n[i.GTLT]}\\s*(${n[i.FULLPLAIN]})$|^$`), f("COMPARATORTRIM", `(\\s*)${n[i.GTLT]}\\s*(${n[i.LOOSEPLAIN]}|${n[i.XRANGEPLAIN]})`, !0), m.comparatorTrimReplace = "$1$2$3", f("HYPHENRANGE", `^\\s*(${n[i.XRANGEPLAIN]})\\s+-\\s+(${n[i.XRANGEPLAIN]})\\s*$`), f("HYPHENRANGELOOSE", `^\\s*(${n[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${n[i.XRANGEPLAINLOOSE]})\\s*$`), f("STAR", "(<|>)?=?\\s*\\*"), f("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), f("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(Si, Si.exports)), Si.exports;
}
var cs, Ic;
function Ia() {
  if (Ic) return cs;
  Ic = 1;
  const o = Object.freeze({ loose: !0 }), m = Object.freeze({});
  return cs = (h) => h ? typeof h != "object" ? o : h : m, cs;
}
var ls, Lc;
function Mp() {
  if (Lc) return ls;
  Lc = 1;
  const o = /^[0-9]+$/, m = (h, d) => {
    if (typeof h == "number" && typeof d == "number")
      return h === d ? 0 : h < d ? -1 : 1;
    const c = o.test(h), t = o.test(d);
    return c && t && (h = +h, d = +d), h === d ? 0 : c && !t ? -1 : t && !c ? 1 : h < d ? -1 : 1;
  };
  return ls = {
    compareIdentifiers: m,
    rcompareIdentifiers: (h, d) => m(d, h)
  }, ls;
}
var us, Fc;
function Ke() {
  if (Fc) return us;
  Fc = 1;
  const o = zi(), { MAX_LENGTH: m, MAX_SAFE_INTEGER: v } = Hi(), { safeRe: h, t: d } = ai(), c = Ia(), { compareIdentifiers: t } = Mp();
  class a {
    constructor(e, i) {
      if (i = c(i), e instanceof a) {
        if (e.loose === !!i.loose && e.includePrerelease === !!i.includePrerelease)
          return e;
        e = e.version;
      } else if (typeof e != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);
      if (e.length > m)
        throw new TypeError(
          `version is longer than ${m} characters`
        );
      o("SemVer", e, i), this.options = i, this.loose = !!i.loose, this.includePrerelease = !!i.includePrerelease;
      const l = e.trim().match(i.loose ? h[d.LOOSE] : h[d.FULL]);
      if (!l)
        throw new TypeError(`Invalid Version: ${e}`);
      if (this.raw = e, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > v || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > v || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > v || this.patch < 0)
        throw new TypeError("Invalid patch version");
      l[4] ? this.prerelease = l[4].split(".").map((r) => {
        if (/^[0-9]+$/.test(r)) {
          const u = +r;
          if (u >= 0 && u < v)
            return u;
        }
        return r;
      }) : this.prerelease = [], this.build = l[5] ? l[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(e) {
      if (o("SemVer.compare", this.version, this.options, e), !(e instanceof a)) {
        if (typeof e == "string" && e === this.version)
          return 0;
        e = new a(e, this.options);
      }
      return e.version === this.version ? 0 : this.compareMain(e) || this.comparePre(e);
    }
    compareMain(e) {
      return e instanceof a || (e = new a(e, this.options)), this.major < e.major ? -1 : this.major > e.major ? 1 : this.minor < e.minor ? -1 : this.minor > e.minor ? 1 : this.patch < e.patch ? -1 : this.patch > e.patch ? 1 : 0;
    }
    comparePre(e) {
      if (e instanceof a || (e = new a(e, this.options)), this.prerelease.length && !e.prerelease.length)
        return -1;
      if (!this.prerelease.length && e.prerelease.length)
        return 1;
      if (!this.prerelease.length && !e.prerelease.length)
        return 0;
      let i = 0;
      do {
        const l = this.prerelease[i], r = e.prerelease[i];
        if (o("prerelease compare", i, l, r), l === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (l === void 0)
          return -1;
        if (l === r)
          continue;
        return t(l, r);
      } while (++i);
    }
    compareBuild(e) {
      e instanceof a || (e = new a(e, this.options));
      let i = 0;
      do {
        const l = this.build[i], r = e.build[i];
        if (o("build compare", i, l, r), l === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (l === void 0)
          return -1;
        if (l === r)
          continue;
        return t(l, r);
      } while (++i);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(e, i, l) {
      if (e.startsWith("pre")) {
        if (!i && l === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (i) {
          const r = `-${i}`.match(this.options.loose ? h[d.PRERELEASELOOSE] : h[d.PRERELEASE]);
          if (!r || r[1] !== i)
            throw new Error(`invalid identifier: ${i}`);
        }
      }
      switch (e) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", i, l);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", i, l);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", i, l), this.inc("pre", i, l);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", i, l), this.inc("pre", i, l);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const r = Number(l) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [r];
          else {
            let u = this.prerelease.length;
            for (; --u >= 0; )
              typeof this.prerelease[u] == "number" && (this.prerelease[u]++, u = -2);
            if (u === -1) {
              if (i === this.prerelease.join(".") && l === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(r);
            }
          }
          if (i) {
            let u = [i, r];
            l === !1 && (u = [i]), t(this.prerelease[0], i) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = u) : this.prerelease = u;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${e}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return us = a, us;
}
var ps, Uc;
function un() {
  if (Uc) return ps;
  Uc = 1;
  const o = Ke();
  return ps = (v, h, d = !1) => {
    if (v instanceof o)
      return v;
    try {
      return new o(v, h);
    } catch (c) {
      if (!d)
        return null;
      throw c;
    }
  }, ps;
}
var ds, qc;
function xh() {
  if (qc) return ds;
  qc = 1;
  const o = un();
  return ds = (v, h) => {
    const d = o(v, h);
    return d ? d.version : null;
  }, ds;
}
var fs, $c;
function yh() {
  if ($c) return fs;
  $c = 1;
  const o = un();
  return fs = (v, h) => {
    const d = o(v.trim().replace(/^[=v]+/, ""), h);
    return d ? d.version : null;
  }, fs;
}
var hs, Bc;
function bh() {
  if (Bc) return hs;
  Bc = 1;
  const o = Ke();
  return hs = (v, h, d, c, t) => {
    typeof d == "string" && (t = c, c = d, d = void 0);
    try {
      return new o(
        v instanceof o ? v.version : v,
        d
      ).inc(h, c, t).version;
    } catch {
      return null;
    }
  }, hs;
}
var ms, jc;
function wh() {
  if (jc) return ms;
  jc = 1;
  const o = un();
  return ms = (v, h) => {
    const d = o(v, null, !0), c = o(h, null, !0), t = d.compare(c);
    if (t === 0)
      return null;
    const a = t > 0, n = a ? d : c, e = a ? c : d, i = !!n.prerelease.length;
    if (!!e.prerelease.length && !i) {
      if (!e.patch && !e.minor)
        return "major";
      if (e.compareMain(n) === 0)
        return e.minor && !e.patch ? "minor" : "patch";
    }
    const r = i ? "pre" : "";
    return d.major !== c.major ? r + "major" : d.minor !== c.minor ? r + "minor" : d.patch !== c.patch ? r + "patch" : "prerelease";
  }, ms;
}
var vs, Mc;
function _h() {
  if (Mc) return vs;
  Mc = 1;
  const o = Ke();
  return vs = (v, h) => new o(v, h).major, vs;
}
var gs, Hc;
function Eh() {
  if (Hc) return gs;
  Hc = 1;
  const o = Ke();
  return gs = (v, h) => new o(v, h).minor, gs;
}
var xs, zc;
function Sh() {
  if (zc) return xs;
  zc = 1;
  const o = Ke();
  return xs = (v, h) => new o(v, h).patch, xs;
}
var ys, Gc;
function Th() {
  if (Gc) return ys;
  Gc = 1;
  const o = un();
  return ys = (v, h) => {
    const d = o(v, h);
    return d && d.prerelease.length ? d.prerelease : null;
  }, ys;
}
var bs, Wc;
function pt() {
  if (Wc) return bs;
  Wc = 1;
  const o = Ke();
  return bs = (v, h, d) => new o(v, d).compare(new o(h, d)), bs;
}
var ws, Vc;
function Ch() {
  if (Vc) return ws;
  Vc = 1;
  const o = pt();
  return ws = (v, h, d) => o(h, v, d), ws;
}
var _s, Yc;
function Rh() {
  if (Yc) return _s;
  Yc = 1;
  const o = pt();
  return _s = (v, h) => o(v, h, !0), _s;
}
var Es, Kc;
function La() {
  if (Kc) return Es;
  Kc = 1;
  const o = Ke();
  return Es = (v, h, d) => {
    const c = new o(v, d), t = new o(h, d);
    return c.compare(t) || c.compareBuild(t);
  }, Es;
}
var Ss, Xc;
function Ah() {
  if (Xc) return Ss;
  Xc = 1;
  const o = La();
  return Ss = (v, h) => v.sort((d, c) => o(d, c, h)), Ss;
}
var Ts, Jc;
function kh() {
  if (Jc) return Ts;
  Jc = 1;
  const o = La();
  return Ts = (v, h) => v.sort((d, c) => o(c, d, h)), Ts;
}
var Cs, Qc;
function Gi() {
  if (Qc) return Cs;
  Qc = 1;
  const o = pt();
  return Cs = (v, h, d) => o(v, h, d) > 0, Cs;
}
var Rs, Zc;
function Fa() {
  if (Zc) return Rs;
  Zc = 1;
  const o = pt();
  return Rs = (v, h, d) => o(v, h, d) < 0, Rs;
}
var As, el;
function Hp() {
  if (el) return As;
  el = 1;
  const o = pt();
  return As = (v, h, d) => o(v, h, d) === 0, As;
}
var ks, tl;
function zp() {
  if (tl) return ks;
  tl = 1;
  const o = pt();
  return ks = (v, h, d) => o(v, h, d) !== 0, ks;
}
var Os, nl;
function Ua() {
  if (nl) return Os;
  nl = 1;
  const o = pt();
  return Os = (v, h, d) => o(v, h, d) >= 0, Os;
}
var Ps, il;
function qa() {
  if (il) return Ps;
  il = 1;
  const o = pt();
  return Ps = (v, h, d) => o(v, h, d) <= 0, Ps;
}
var Ns, rl;
function Gp() {
  if (rl) return Ns;
  rl = 1;
  const o = Hp(), m = zp(), v = Gi(), h = Ua(), d = Fa(), c = qa();
  return Ns = (a, n, e, i) => {
    switch (n) {
      case "===":
        return typeof a == "object" && (a = a.version), typeof e == "object" && (e = e.version), a === e;
      case "!==":
        return typeof a == "object" && (a = a.version), typeof e == "object" && (e = e.version), a !== e;
      case "":
      case "=":
      case "==":
        return o(a, e, i);
      case "!=":
        return m(a, e, i);
      case ">":
        return v(a, e, i);
      case ">=":
        return h(a, e, i);
      case "<":
        return d(a, e, i);
      case "<=":
        return c(a, e, i);
      default:
        throw new TypeError(`Invalid operator: ${n}`);
    }
  }, Ns;
}
var Ds, sl;
function Oh() {
  if (sl) return Ds;
  sl = 1;
  const o = Ke(), m = un(), { safeRe: v, t: h } = ai();
  return Ds = (c, t) => {
    if (c instanceof o)
      return c;
    if (typeof c == "number" && (c = String(c)), typeof c != "string")
      return null;
    t = t || {};
    let a = null;
    if (!t.rtl)
      a = c.match(t.includePrerelease ? v[h.COERCEFULL] : v[h.COERCE]);
    else {
      const u = t.includePrerelease ? v[h.COERCERTLFULL] : v[h.COERCERTL];
      let s;
      for (; (s = u.exec(c)) && (!a || a.index + a[0].length !== c.length); )
        (!a || s.index + s[0].length !== a.index + a[0].length) && (a = s), u.lastIndex = s.index + s[1].length + s[2].length;
      u.lastIndex = -1;
    }
    if (a === null)
      return null;
    const n = a[2], e = a[3] || "0", i = a[4] || "0", l = t.includePrerelease && a[5] ? `-${a[5]}` : "", r = t.includePrerelease && a[6] ? `+${a[6]}` : "";
    return m(`${n}.${e}.${i}${l}${r}`, t);
  }, Ds;
}
var Is, al;
function Ph() {
  if (al) return Is;
  al = 1;
  class o {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(v) {
      const h = this.map.get(v);
      if (h !== void 0)
        return this.map.delete(v), this.map.set(v, h), h;
    }
    delete(v) {
      return this.map.delete(v);
    }
    set(v, h) {
      if (!this.delete(v) && h !== void 0) {
        if (this.map.size >= this.max) {
          const c = this.map.keys().next().value;
          this.delete(c);
        }
        this.map.set(v, h);
      }
      return this;
    }
  }
  return Is = o, Is;
}
var Ls, ol;
function dt() {
  if (ol) return Ls;
  ol = 1;
  const o = /\s+/g;
  class m {
    constructor(N, F) {
      if (F = d(F), N instanceof m)
        return N.loose === !!F.loose && N.includePrerelease === !!F.includePrerelease ? N : new m(N.raw, F);
      if (N instanceof c)
        return this.raw = N.value, this.set = [[N]], this.formatted = void 0, this;
      if (this.options = F, this.loose = !!F.loose, this.includePrerelease = !!F.includePrerelease, this.raw = N.trim().replace(o, " "), this.set = this.raw.split("||").map((U) => this.parseRange(U.trim())).filter((U) => U.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const U = this.set[0];
        if (this.set = this.set.filter((z) => !f(z[0])), this.set.length === 0)
          this.set = [U];
        else if (this.set.length > 1) {
          for (const z of this.set)
            if (z.length === 1 && p(z[0])) {
              this.set = [z];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let N = 0; N < this.set.length; N++) {
          N > 0 && (this.formatted += "||");
          const F = this.set[N];
          for (let U = 0; U < F.length; U++)
            U > 0 && (this.formatted += " "), this.formatted += F[U].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(N) {
      const U = ((this.options.includePrerelease && u) | (this.options.loose && s)) + ":" + N, z = h.get(U);
      if (z)
        return z;
      const W = this.options.loose, ie = W ? n[e.HYPHENRANGELOOSE] : n[e.HYPHENRANGE];
      N = N.replace(ie, I(this.options.includePrerelease)), t("hyphen replace", N), N = N.replace(n[e.COMPARATORTRIM], i), t("comparator trim", N), N = N.replace(n[e.TILDETRIM], l), t("tilde trim", N), N = N.replace(n[e.CARETTRIM], r), t("caret trim", N);
      let ae = N.split(" ").map((Z) => b(Z, this.options)).join(" ").split(/\s+/).map((Z) => O(Z, this.options));
      W && (ae = ae.filter((Z) => (t("loose invalid filter", Z, this.options), !!Z.match(n[e.COMPARATORLOOSE])))), t("range list", ae);
      const oe = /* @__PURE__ */ new Map(), ye = ae.map((Z) => new c(Z, this.options));
      for (const Z of ye) {
        if (f(Z))
          return [Z];
        oe.set(Z.value, Z);
      }
      oe.size > 1 && oe.has("") && oe.delete("");
      const _e = [...oe.values()];
      return h.set(U, _e), _e;
    }
    intersects(N, F) {
      if (!(N instanceof m))
        throw new TypeError("a Range is required");
      return this.set.some((U) => x(U, F) && N.set.some((z) => x(z, F) && U.every((W) => z.every((ie) => W.intersects(ie, F)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(N) {
      if (!N)
        return !1;
      if (typeof N == "string")
        try {
          N = new a(N, this.options);
        } catch {
          return !1;
        }
      for (let F = 0; F < this.set.length; F++)
        if (q(this.set[F], N, this.options))
          return !0;
      return !1;
    }
  }
  Ls = m;
  const v = Ph(), h = new v(), d = Ia(), c = Wi(), t = zi(), a = Ke(), {
    safeRe: n,
    t: e,
    comparatorTrimReplace: i,
    tildeTrimReplace: l,
    caretTrimReplace: r
  } = ai(), { FLAG_INCLUDE_PRERELEASE: u, FLAG_LOOSE: s } = Hi(), f = (R) => R.value === "<0.0.0-0", p = (R) => R.value === "", x = (R, N) => {
    let F = !0;
    const U = R.slice();
    let z = U.pop();
    for (; F && U.length; )
      F = U.every((W) => z.intersects(W, N)), z = U.pop();
    return F;
  }, b = (R, N) => (R = R.replace(n[e.BUILD], ""), t("comp", R, N), R = y(R, N), t("caret", R), R = S(R, N), t("tildes", R), R = w(R, N), t("xrange", R), R = D(R, N), t("stars", R), R), C = (R) => !R || R.toLowerCase() === "x" || R === "*", S = (R, N) => R.trim().split(/\s+/).map((F) => T(F, N)).join(" "), T = (R, N) => {
    const F = N.loose ? n[e.TILDELOOSE] : n[e.TILDE];
    return R.replace(F, (U, z, W, ie, ae) => {
      t("tilde", R, U, z, W, ie, ae);
      let oe;
      return C(z) ? oe = "" : C(W) ? oe = `>=${z}.0.0 <${+z + 1}.0.0-0` : C(ie) ? oe = `>=${z}.${W}.0 <${z}.${+W + 1}.0-0` : ae ? (t("replaceTilde pr", ae), oe = `>=${z}.${W}.${ie}-${ae} <${z}.${+W + 1}.0-0`) : oe = `>=${z}.${W}.${ie} <${z}.${+W + 1}.0-0`, t("tilde return", oe), oe;
    });
  }, y = (R, N) => R.trim().split(/\s+/).map((F) => E(F, N)).join(" "), E = (R, N) => {
    t("caret", R, N);
    const F = N.loose ? n[e.CARETLOOSE] : n[e.CARET], U = N.includePrerelease ? "-0" : "";
    return R.replace(F, (z, W, ie, ae, oe) => {
      t("caret", R, z, W, ie, ae, oe);
      let ye;
      return C(W) ? ye = "" : C(ie) ? ye = `>=${W}.0.0${U} <${+W + 1}.0.0-0` : C(ae) ? W === "0" ? ye = `>=${W}.${ie}.0${U} <${W}.${+ie + 1}.0-0` : ye = `>=${W}.${ie}.0${U} <${+W + 1}.0.0-0` : oe ? (t("replaceCaret pr", oe), W === "0" ? ie === "0" ? ye = `>=${W}.${ie}.${ae}-${oe} <${W}.${ie}.${+ae + 1}-0` : ye = `>=${W}.${ie}.${ae}-${oe} <${W}.${+ie + 1}.0-0` : ye = `>=${W}.${ie}.${ae}-${oe} <${+W + 1}.0.0-0`) : (t("no pr"), W === "0" ? ie === "0" ? ye = `>=${W}.${ie}.${ae}${U} <${W}.${ie}.${+ae + 1}-0` : ye = `>=${W}.${ie}.${ae}${U} <${W}.${+ie + 1}.0-0` : ye = `>=${W}.${ie}.${ae} <${+W + 1}.0.0-0`), t("caret return", ye), ye;
    });
  }, w = (R, N) => (t("replaceXRanges", R, N), R.split(/\s+/).map((F) => _(F, N)).join(" ")), _ = (R, N) => {
    R = R.trim();
    const F = N.loose ? n[e.XRANGELOOSE] : n[e.XRANGE];
    return R.replace(F, (U, z, W, ie, ae, oe) => {
      t("xRange", R, U, z, W, ie, ae, oe);
      const ye = C(W), _e = ye || C(ie), Z = _e || C(ae), Se = Z;
      return z === "=" && Se && (z = ""), oe = N.includePrerelease ? "-0" : "", ye ? z === ">" || z === "<" ? U = "<0.0.0-0" : U = "*" : z && Se ? (_e && (ie = 0), ae = 0, z === ">" ? (z = ">=", _e ? (W = +W + 1, ie = 0, ae = 0) : (ie = +ie + 1, ae = 0)) : z === "<=" && (z = "<", _e ? W = +W + 1 : ie = +ie + 1), z === "<" && (oe = "-0"), U = `${z + W}.${ie}.${ae}${oe}`) : _e ? U = `>=${W}.0.0${oe} <${+W + 1}.0.0-0` : Z && (U = `>=${W}.${ie}.0${oe} <${W}.${+ie + 1}.0-0`), t("xRange return", U), U;
    });
  }, D = (R, N) => (t("replaceStars", R, N), R.trim().replace(n[e.STAR], "")), O = (R, N) => (t("replaceGTE0", R, N), R.trim().replace(n[N.includePrerelease ? e.GTE0PRE : e.GTE0], "")), I = (R) => (N, F, U, z, W, ie, ae, oe, ye, _e, Z, Se) => (C(U) ? F = "" : C(z) ? F = `>=${U}.0.0${R ? "-0" : ""}` : C(W) ? F = `>=${U}.${z}.0${R ? "-0" : ""}` : ie ? F = `>=${F}` : F = `>=${F}${R ? "-0" : ""}`, C(ye) ? oe = "" : C(_e) ? oe = `<${+ye + 1}.0.0-0` : C(Z) ? oe = `<${ye}.${+_e + 1}.0-0` : Se ? oe = `<=${ye}.${_e}.${Z}-${Se}` : R ? oe = `<${ye}.${_e}.${+Z + 1}-0` : oe = `<=${oe}`, `${F} ${oe}`.trim()), q = (R, N, F) => {
    for (let U = 0; U < R.length; U++)
      if (!R[U].test(N))
        return !1;
    if (N.prerelease.length && !F.includePrerelease) {
      for (let U = 0; U < R.length; U++)
        if (t(R[U].semver), R[U].semver !== c.ANY && R[U].semver.prerelease.length > 0) {
          const z = R[U].semver;
          if (z.major === N.major && z.minor === N.minor && z.patch === N.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ls;
}
var Fs, cl;
function Wi() {
  if (cl) return Fs;
  cl = 1;
  const o = Symbol("SemVer ANY");
  class m {
    static get ANY() {
      return o;
    }
    constructor(i, l) {
      if (l = v(l), i instanceof m) {
        if (i.loose === !!l.loose)
          return i;
        i = i.value;
      }
      i = i.trim().split(/\s+/).join(" "), t("comparator", i, l), this.options = l, this.loose = !!l.loose, this.parse(i), this.semver === o ? this.value = "" : this.value = this.operator + this.semver.version, t("comp", this);
    }
    parse(i) {
      const l = this.options.loose ? h[d.COMPARATORLOOSE] : h[d.COMPARATOR], r = i.match(l);
      if (!r)
        throw new TypeError(`Invalid comparator: ${i}`);
      this.operator = r[1] !== void 0 ? r[1] : "", this.operator === "=" && (this.operator = ""), r[2] ? this.semver = new a(r[2], this.options.loose) : this.semver = o;
    }
    toString() {
      return this.value;
    }
    test(i) {
      if (t("Comparator.test", i, this.options.loose), this.semver === o || i === o)
        return !0;
      if (typeof i == "string")
        try {
          i = new a(i, this.options);
        } catch {
          return !1;
        }
      return c(i, this.operator, this.semver, this.options);
    }
    intersects(i, l) {
      if (!(i instanceof m))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new n(i.value, l).test(this.value) : i.operator === "" ? i.value === "" ? !0 : new n(this.value, l).test(i.semver) : (l = v(l), l.includePrerelease && (this.value === "<0.0.0-0" || i.value === "<0.0.0-0") || !l.includePrerelease && (this.value.startsWith("<0.0.0") || i.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && i.operator.startsWith(">") || this.operator.startsWith("<") && i.operator.startsWith("<") || this.semver.version === i.semver.version && this.operator.includes("=") && i.operator.includes("=") || c(this.semver, "<", i.semver, l) && this.operator.startsWith(">") && i.operator.startsWith("<") || c(this.semver, ">", i.semver, l) && this.operator.startsWith("<") && i.operator.startsWith(">")));
    }
  }
  Fs = m;
  const v = Ia(), { safeRe: h, t: d } = ai(), c = Gp(), t = zi(), a = Ke(), n = dt();
  return Fs;
}
var Us, ll;
function Vi() {
  if (ll) return Us;
  ll = 1;
  const o = dt();
  return Us = (v, h, d) => {
    try {
      h = new o(h, d);
    } catch {
      return !1;
    }
    return h.test(v);
  }, Us;
}
var qs, ul;
function Nh() {
  if (ul) return qs;
  ul = 1;
  const o = dt();
  return qs = (v, h) => new o(v, h).set.map((d) => d.map((c) => c.value).join(" ").trim().split(" ")), qs;
}
var $s, pl;
function Dh() {
  if (pl) return $s;
  pl = 1;
  const o = Ke(), m = dt();
  return $s = (h, d, c) => {
    let t = null, a = null, n = null;
    try {
      n = new m(d, c);
    } catch {
      return null;
    }
    return h.forEach((e) => {
      n.test(e) && (!t || a.compare(e) === -1) && (t = e, a = new o(t, c));
    }), t;
  }, $s;
}
var Bs, dl;
function Ih() {
  if (dl) return Bs;
  dl = 1;
  const o = Ke(), m = dt();
  return Bs = (h, d, c) => {
    let t = null, a = null, n = null;
    try {
      n = new m(d, c);
    } catch {
      return null;
    }
    return h.forEach((e) => {
      n.test(e) && (!t || a.compare(e) === 1) && (t = e, a = new o(t, c));
    }), t;
  }, Bs;
}
var js, fl;
function Lh() {
  if (fl) return js;
  fl = 1;
  const o = Ke(), m = dt(), v = Gi();
  return js = (d, c) => {
    d = new m(d, c);
    let t = new o("0.0.0");
    if (d.test(t) || (t = new o("0.0.0-0"), d.test(t)))
      return t;
    t = null;
    for (let a = 0; a < d.set.length; ++a) {
      const n = d.set[a];
      let e = null;
      n.forEach((i) => {
        const l = new o(i.semver.version);
        switch (i.operator) {
          case ">":
            l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
          /* fallthrough */
          case "":
          case ">=":
            (!e || v(l, e)) && (e = l);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${i.operator}`);
        }
      }), e && (!t || v(t, e)) && (t = e);
    }
    return t && d.test(t) ? t : null;
  }, js;
}
var Ms, hl;
function Fh() {
  if (hl) return Ms;
  hl = 1;
  const o = dt();
  return Ms = (v, h) => {
    try {
      return new o(v, h).range || "*";
    } catch {
      return null;
    }
  }, Ms;
}
var Hs, ml;
function $a() {
  if (ml) return Hs;
  ml = 1;
  const o = Ke(), m = Wi(), { ANY: v } = m, h = dt(), d = Vi(), c = Gi(), t = Fa(), a = qa(), n = Ua();
  return Hs = (i, l, r, u) => {
    i = new o(i, u), l = new h(l, u);
    let s, f, p, x, b;
    switch (r) {
      case ">":
        s = c, f = a, p = t, x = ">", b = ">=";
        break;
      case "<":
        s = t, f = n, p = c, x = "<", b = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (d(i, l, u))
      return !1;
    for (let C = 0; C < l.set.length; ++C) {
      const S = l.set[C];
      let T = null, y = null;
      if (S.forEach((E) => {
        E.semver === v && (E = new m(">=0.0.0")), T = T || E, y = y || E, s(E.semver, T.semver, u) ? T = E : p(E.semver, y.semver, u) && (y = E);
      }), T.operator === x || T.operator === b || (!y.operator || y.operator === x) && f(i, y.semver))
        return !1;
      if (y.operator === b && p(i, y.semver))
        return !1;
    }
    return !0;
  }, Hs;
}
var zs, vl;
function Uh() {
  if (vl) return zs;
  vl = 1;
  const o = $a();
  return zs = (v, h, d) => o(v, h, ">", d), zs;
}
var Gs, gl;
function qh() {
  if (gl) return Gs;
  gl = 1;
  const o = $a();
  return Gs = (v, h, d) => o(v, h, "<", d), Gs;
}
var Ws, xl;
function $h() {
  if (xl) return Ws;
  xl = 1;
  const o = dt();
  return Ws = (v, h, d) => (v = new o(v, d), h = new o(h, d), v.intersects(h, d)), Ws;
}
var Vs, yl;
function Bh() {
  if (yl) return Vs;
  yl = 1;
  const o = Vi(), m = pt();
  return Vs = (v, h, d) => {
    const c = [];
    let t = null, a = null;
    const n = v.sort((r, u) => m(r, u, d));
    for (const r of n)
      o(r, h, d) ? (a = r, t || (t = r)) : (a && c.push([t, a]), a = null, t = null);
    t && c.push([t, null]);
    const e = [];
    for (const [r, u] of c)
      r === u ? e.push(r) : !u && r === n[0] ? e.push("*") : u ? r === n[0] ? e.push(`<=${u}`) : e.push(`${r} - ${u}`) : e.push(`>=${r}`);
    const i = e.join(" || "), l = typeof h.raw == "string" ? h.raw : String(h);
    return i.length < l.length ? i : h;
  }, Vs;
}
var Ys, bl;
function jh() {
  if (bl) return Ys;
  bl = 1;
  const o = dt(), m = Wi(), { ANY: v } = m, h = Vi(), d = pt(), c = (l, r, u = {}) => {
    if (l === r)
      return !0;
    l = new o(l, u), r = new o(r, u);
    let s = !1;
    e: for (const f of l.set) {
      for (const p of r.set) {
        const x = n(f, p, u);
        if (s = s || x !== null, x)
          continue e;
      }
      if (s)
        return !1;
    }
    return !0;
  }, t = [new m(">=0.0.0-0")], a = [new m(">=0.0.0")], n = (l, r, u) => {
    if (l === r)
      return !0;
    if (l.length === 1 && l[0].semver === v) {
      if (r.length === 1 && r[0].semver === v)
        return !0;
      u.includePrerelease ? l = t : l = a;
    }
    if (r.length === 1 && r[0].semver === v) {
      if (u.includePrerelease)
        return !0;
      r = a;
    }
    const s = /* @__PURE__ */ new Set();
    let f, p;
    for (const w of l)
      w.operator === ">" || w.operator === ">=" ? f = e(f, w, u) : w.operator === "<" || w.operator === "<=" ? p = i(p, w, u) : s.add(w.semver);
    if (s.size > 1)
      return null;
    let x;
    if (f && p) {
      if (x = d(f.semver, p.semver, u), x > 0)
        return null;
      if (x === 0 && (f.operator !== ">=" || p.operator !== "<="))
        return null;
    }
    for (const w of s) {
      if (f && !h(w, String(f), u) || p && !h(w, String(p), u))
        return null;
      for (const _ of r)
        if (!h(w, String(_), u))
          return !1;
      return !0;
    }
    let b, C, S, T, y = p && !u.includePrerelease && p.semver.prerelease.length ? p.semver : !1, E = f && !u.includePrerelease && f.semver.prerelease.length ? f.semver : !1;
    y && y.prerelease.length === 1 && p.operator === "<" && y.prerelease[0] === 0 && (y = !1);
    for (const w of r) {
      if (T = T || w.operator === ">" || w.operator === ">=", S = S || w.operator === "<" || w.operator === "<=", f) {
        if (E && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === E.major && w.semver.minor === E.minor && w.semver.patch === E.patch && (E = !1), w.operator === ">" || w.operator === ">=") {
          if (b = e(f, w, u), b === w && b !== f)
            return !1;
        } else if (f.operator === ">=" && !h(f.semver, String(w), u))
          return !1;
      }
      if (p) {
        if (y && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === y.major && w.semver.minor === y.minor && w.semver.patch === y.patch && (y = !1), w.operator === "<" || w.operator === "<=") {
          if (C = i(p, w, u), C === w && C !== p)
            return !1;
        } else if (p.operator === "<=" && !h(p.semver, String(w), u))
          return !1;
      }
      if (!w.operator && (p || f) && x !== 0)
        return !1;
    }
    return !(f && S && !p && x !== 0 || p && T && !f && x !== 0 || E || y);
  }, e = (l, r, u) => {
    if (!l)
      return r;
    const s = d(l.semver, r.semver, u);
    return s > 0 ? l : s < 0 || r.operator === ">" && l.operator === ">=" ? r : l;
  }, i = (l, r, u) => {
    if (!l)
      return r;
    const s = d(l.semver, r.semver, u);
    return s < 0 ? l : s > 0 || r.operator === "<" && l.operator === "<=" ? r : l;
  };
  return Ys = c, Ys;
}
var Ks, wl;
function Wp() {
  if (wl) return Ks;
  wl = 1;
  const o = ai(), m = Hi(), v = Ke(), h = Mp(), d = un(), c = xh(), t = yh(), a = bh(), n = wh(), e = _h(), i = Eh(), l = Sh(), r = Th(), u = pt(), s = Ch(), f = Rh(), p = La(), x = Ah(), b = kh(), C = Gi(), S = Fa(), T = Hp(), y = zp(), E = Ua(), w = qa(), _ = Gp(), D = Oh(), O = Wi(), I = dt(), q = Vi(), R = Nh(), N = Dh(), F = Ih(), U = Lh(), z = Fh(), W = $a(), ie = Uh(), ae = qh(), oe = $h(), ye = Bh(), _e = jh();
  return Ks = {
    parse: d,
    valid: c,
    clean: t,
    inc: a,
    diff: n,
    major: e,
    minor: i,
    patch: l,
    prerelease: r,
    compare: u,
    rcompare: s,
    compareLoose: f,
    compareBuild: p,
    sort: x,
    rsort: b,
    gt: C,
    lt: S,
    eq: T,
    neq: y,
    gte: E,
    lte: w,
    cmp: _,
    coerce: D,
    Comparator: O,
    Range: I,
    satisfies: q,
    toComparators: R,
    maxSatisfying: N,
    minSatisfying: F,
    minVersion: U,
    validRange: z,
    outside: W,
    gtr: ie,
    ltr: ae,
    intersects: oe,
    simplifyRange: ye,
    subset: _e,
    SemVer: v,
    re: o.re,
    src: o.src,
    tokens: o.t,
    SEMVER_SPEC_VERSION: m.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: m.RELEASE_TYPES,
    compareIdentifiers: h.compareIdentifiers,
    rcompareIdentifiers: h.rcompareIdentifiers
  }, Ks;
}
var en = {}, ei = { exports: {} };
ei.exports;
var _l;
function Mh() {
  return _l || (_l = 1, (function(o, m) {
    var v = 200, h = "__lodash_hash_undefined__", d = 1, c = 2, t = 9007199254740991, a = "[object Arguments]", n = "[object Array]", e = "[object AsyncFunction]", i = "[object Boolean]", l = "[object Date]", r = "[object Error]", u = "[object Function]", s = "[object GeneratorFunction]", f = "[object Map]", p = "[object Number]", x = "[object Null]", b = "[object Object]", C = "[object Promise]", S = "[object Proxy]", T = "[object RegExp]", y = "[object Set]", E = "[object String]", w = "[object Symbol]", _ = "[object Undefined]", D = "[object WeakMap]", O = "[object ArrayBuffer]", I = "[object DataView]", q = "[object Float32Array]", R = "[object Float64Array]", N = "[object Int8Array]", F = "[object Int16Array]", U = "[object Int32Array]", z = "[object Uint8Array]", W = "[object Uint8ClampedArray]", ie = "[object Uint16Array]", ae = "[object Uint32Array]", oe = /[\\^$.*+?()[\]{}|]/g, ye = /^\[object .+?Constructor\]$/, _e = /^(?:0|[1-9]\d*)$/, Z = {};
    Z[q] = Z[R] = Z[N] = Z[F] = Z[U] = Z[z] = Z[W] = Z[ie] = Z[ae] = !0, Z[a] = Z[n] = Z[O] = Z[i] = Z[I] = Z[l] = Z[r] = Z[u] = Z[f] = Z[p] = Z[b] = Z[T] = Z[y] = Z[E] = Z[D] = !1;
    var Se = typeof ct == "object" && ct && ct.Object === Object && ct, k = typeof self == "object" && self && self.Object === Object && self, A = Se || k || Function("return this")(), G = m && !m.nodeType && m, $ = G && !0 && o && !o.nodeType && o, me = $ && $.exports === G, be = me && Se.process, we = (function() {
      try {
        return be && be.binding && be.binding("util");
      } catch {
      }
    })(), Re = we && we.isTypedArray;
    function Ce(L, B) {
      for (var ee = -1, ve = L == null ? 0 : L.length, Ie = 0, ke = []; ++ee < ve; ) {
        var Ue = L[ee];
        B(Ue, ee, L) && (ke[Ie++] = Ue);
      }
      return ke;
    }
    function Be(L, B) {
      for (var ee = -1, ve = B.length, Ie = L.length; ++ee < ve; )
        L[Ie + ee] = B[ee];
      return L;
    }
    function j(L, B) {
      for (var ee = -1, ve = L == null ? 0 : L.length; ++ee < ve; )
        if (B(L[ee], ee, L))
          return !0;
      return !1;
    }
    function Y(L, B) {
      for (var ee = -1, ve = Array(L); ++ee < L; )
        ve[ee] = B(ee);
      return ve;
    }
    function he(L) {
      return function(B) {
        return L(B);
      };
    }
    function Ee(L, B) {
      return L.has(B);
    }
    function ue(L, B) {
      return L == null ? void 0 : L[B];
    }
    function g(L) {
      var B = -1, ee = Array(L.size);
      return L.forEach(function(ve, Ie) {
        ee[++B] = [Ie, ve];
      }), ee;
    }
    function H(L, B) {
      return function(ee) {
        return L(B(ee));
      };
    }
    function V(L) {
      var B = -1, ee = Array(L.size);
      return L.forEach(function(ve) {
        ee[++B] = ve;
      }), ee;
    }
    var se = Array.prototype, X = Function.prototype, re = Object.prototype, te = A["__core-js_shared__"], ce = X.toString, pe = re.hasOwnProperty, Te = (function() {
      var L = /[^.]+$/.exec(te && te.keys && te.keys.IE_PROTO || "");
      return L ? "Symbol(src)_1." + L : "";
    })(), ge = re.toString, fe = RegExp(
      "^" + ce.call(pe).replace(oe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), P = me ? A.Buffer : void 0, M = A.Symbol, J = A.Uint8Array, K = re.propertyIsEnumerable, Q = se.splice, le = M ? M.toStringTag : void 0, ne = Object.getOwnPropertySymbols, de = P ? P.isBuffer : void 0, xe = H(Object.keys, Object), Ae = Qt(A, "DataView"), Ne = Qt(A, "Map"), Fe = Qt(A, "Promise"), Oe = Qt(A, "Set"), Jt = Qt(A, "WeakMap"), st = Qt(Object, "create"), kt = Nt(Ae), bd = Nt(Ne), wd = Nt(Fe), _d = Nt(Oe), Ed = Nt(Jt), Va = M ? M.prototype : void 0, Qi = Va ? Va.valueOf : void 0;
    function Ot(L) {
      var B = -1, ee = L == null ? 0 : L.length;
      for (this.clear(); ++B < ee; ) {
        var ve = L[B];
        this.set(ve[0], ve[1]);
      }
    }
    function Sd() {
      this.__data__ = st ? st(null) : {}, this.size = 0;
    }
    function Td(L) {
      var B = this.has(L) && delete this.__data__[L];
      return this.size -= B ? 1 : 0, B;
    }
    function Cd(L) {
      var B = this.__data__;
      if (st) {
        var ee = B[L];
        return ee === h ? void 0 : ee;
      }
      return pe.call(B, L) ? B[L] : void 0;
    }
    function Rd(L) {
      var B = this.__data__;
      return st ? B[L] !== void 0 : pe.call(B, L);
    }
    function Ad(L, B) {
      var ee = this.__data__;
      return this.size += this.has(L) ? 0 : 1, ee[L] = st && B === void 0 ? h : B, this;
    }
    Ot.prototype.clear = Sd, Ot.prototype.delete = Td, Ot.prototype.get = Cd, Ot.prototype.has = Rd, Ot.prototype.set = Ad;
    function vt(L) {
      var B = -1, ee = L == null ? 0 : L.length;
      for (this.clear(); ++B < ee; ) {
        var ve = L[B];
        this.set(ve[0], ve[1]);
      }
    }
    function kd() {
      this.__data__ = [], this.size = 0;
    }
    function Od(L) {
      var B = this.__data__, ee = li(B, L);
      if (ee < 0)
        return !1;
      var ve = B.length - 1;
      return ee == ve ? B.pop() : Q.call(B, ee, 1), --this.size, !0;
    }
    function Pd(L) {
      var B = this.__data__, ee = li(B, L);
      return ee < 0 ? void 0 : B[ee][1];
    }
    function Nd(L) {
      return li(this.__data__, L) > -1;
    }
    function Dd(L, B) {
      var ee = this.__data__, ve = li(ee, L);
      return ve < 0 ? (++this.size, ee.push([L, B])) : ee[ve][1] = B, this;
    }
    vt.prototype.clear = kd, vt.prototype.delete = Od, vt.prototype.get = Pd, vt.prototype.has = Nd, vt.prototype.set = Dd;
    function Pt(L) {
      var B = -1, ee = L == null ? 0 : L.length;
      for (this.clear(); ++B < ee; ) {
        var ve = L[B];
        this.set(ve[0], ve[1]);
      }
    }
    function Id() {
      this.size = 0, this.__data__ = {
        hash: new Ot(),
        map: new (Ne || vt)(),
        string: new Ot()
      };
    }
    function Ld(L) {
      var B = ui(this, L).delete(L);
      return this.size -= B ? 1 : 0, B;
    }
    function Fd(L) {
      return ui(this, L).get(L);
    }
    function Ud(L) {
      return ui(this, L).has(L);
    }
    function qd(L, B) {
      var ee = ui(this, L), ve = ee.size;
      return ee.set(L, B), this.size += ee.size == ve ? 0 : 1, this;
    }
    Pt.prototype.clear = Id, Pt.prototype.delete = Ld, Pt.prototype.get = Fd, Pt.prototype.has = Ud, Pt.prototype.set = qd;
    function ci(L) {
      var B = -1, ee = L == null ? 0 : L.length;
      for (this.__data__ = new Pt(); ++B < ee; )
        this.add(L[B]);
    }
    function $d(L) {
      return this.__data__.set(L, h), this;
    }
    function Bd(L) {
      return this.__data__.has(L);
    }
    ci.prototype.add = ci.prototype.push = $d, ci.prototype.has = Bd;
    function bt(L) {
      var B = this.__data__ = new vt(L);
      this.size = B.size;
    }
    function jd() {
      this.__data__ = new vt(), this.size = 0;
    }
    function Md(L) {
      var B = this.__data__, ee = B.delete(L);
      return this.size = B.size, ee;
    }
    function Hd(L) {
      return this.__data__.get(L);
    }
    function zd(L) {
      return this.__data__.has(L);
    }
    function Gd(L, B) {
      var ee = this.__data__;
      if (ee instanceof vt) {
        var ve = ee.__data__;
        if (!Ne || ve.length < v - 1)
          return ve.push([L, B]), this.size = ++ee.size, this;
        ee = this.__data__ = new Pt(ve);
      }
      return ee.set(L, B), this.size = ee.size, this;
    }
    bt.prototype.clear = jd, bt.prototype.delete = Md, bt.prototype.get = Hd, bt.prototype.has = zd, bt.prototype.set = Gd;
    function Wd(L, B) {
      var ee = pi(L), ve = !ee && cf(L), Ie = !ee && !ve && Zi(L), ke = !ee && !ve && !Ie && no(L), Ue = ee || ve || Ie || ke, qe = Ue ? Y(L.length, String) : [], je = qe.length;
      for (var Le in L)
        pe.call(L, Le) && !(Ue && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Le == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Ie && (Le == "offset" || Le == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        ke && (Le == "buffer" || Le == "byteLength" || Le == "byteOffset") || // Skip index properties.
        nf(Le, je))) && qe.push(Le);
      return qe;
    }
    function li(L, B) {
      for (var ee = L.length; ee--; )
        if (Qa(L[ee][0], B))
          return ee;
      return -1;
    }
    function Vd(L, B, ee) {
      var ve = B(L);
      return pi(L) ? ve : Be(ve, ee(L));
    }
    function fn(L) {
      return L == null ? L === void 0 ? _ : x : le && le in Object(L) ? ef(L) : of(L);
    }
    function Ya(L) {
      return hn(L) && fn(L) == a;
    }
    function Ka(L, B, ee, ve, Ie) {
      return L === B ? !0 : L == null || B == null || !hn(L) && !hn(B) ? L !== L && B !== B : Yd(L, B, ee, ve, Ka, Ie);
    }
    function Yd(L, B, ee, ve, Ie, ke) {
      var Ue = pi(L), qe = pi(B), je = Ue ? n : wt(L), Le = qe ? n : wt(B);
      je = je == a ? b : je, Le = Le == a ? b : Le;
      var Qe = je == b, at = Le == b, He = je == Le;
      if (He && Zi(L)) {
        if (!Zi(B))
          return !1;
        Ue = !0, Qe = !1;
      }
      if (He && !Qe)
        return ke || (ke = new bt()), Ue || no(L) ? Xa(L, B, ee, ve, Ie, ke) : Qd(L, B, je, ee, ve, Ie, ke);
      if (!(ee & d)) {
        var tt = Qe && pe.call(L, "__wrapped__"), nt = at && pe.call(B, "__wrapped__");
        if (tt || nt) {
          var _t = tt ? L.value() : L, gt = nt ? B.value() : B;
          return ke || (ke = new bt()), Ie(_t, gt, ee, ve, ke);
        }
      }
      return He ? (ke || (ke = new bt()), Zd(L, B, ee, ve, Ie, ke)) : !1;
    }
    function Kd(L) {
      if (!to(L) || sf(L))
        return !1;
      var B = Za(L) ? fe : ye;
      return B.test(Nt(L));
    }
    function Xd(L) {
      return hn(L) && eo(L.length) && !!Z[fn(L)];
    }
    function Jd(L) {
      if (!af(L))
        return xe(L);
      var B = [];
      for (var ee in Object(L))
        pe.call(L, ee) && ee != "constructor" && B.push(ee);
      return B;
    }
    function Xa(L, B, ee, ve, Ie, ke) {
      var Ue = ee & d, qe = L.length, je = B.length;
      if (qe != je && !(Ue && je > qe))
        return !1;
      var Le = ke.get(L);
      if (Le && ke.get(B))
        return Le == B;
      var Qe = -1, at = !0, He = ee & c ? new ci() : void 0;
      for (ke.set(L, B), ke.set(B, L); ++Qe < qe; ) {
        var tt = L[Qe], nt = B[Qe];
        if (ve)
          var _t = Ue ? ve(nt, tt, Qe, B, L, ke) : ve(tt, nt, Qe, L, B, ke);
        if (_t !== void 0) {
          if (_t)
            continue;
          at = !1;
          break;
        }
        if (He) {
          if (!j(B, function(gt, Dt) {
            if (!Ee(He, Dt) && (tt === gt || Ie(tt, gt, ee, ve, ke)))
              return He.push(Dt);
          })) {
            at = !1;
            break;
          }
        } else if (!(tt === nt || Ie(tt, nt, ee, ve, ke))) {
          at = !1;
          break;
        }
      }
      return ke.delete(L), ke.delete(B), at;
    }
    function Qd(L, B, ee, ve, Ie, ke, Ue) {
      switch (ee) {
        case I:
          if (L.byteLength != B.byteLength || L.byteOffset != B.byteOffset)
            return !1;
          L = L.buffer, B = B.buffer;
        case O:
          return !(L.byteLength != B.byteLength || !ke(new J(L), new J(B)));
        case i:
        case l:
        case p:
          return Qa(+L, +B);
        case r:
          return L.name == B.name && L.message == B.message;
        case T:
        case E:
          return L == B + "";
        case f:
          var qe = g;
        case y:
          var je = ve & d;
          if (qe || (qe = V), L.size != B.size && !je)
            return !1;
          var Le = Ue.get(L);
          if (Le)
            return Le == B;
          ve |= c, Ue.set(L, B);
          var Qe = Xa(qe(L), qe(B), ve, Ie, ke, Ue);
          return Ue.delete(L), Qe;
        case w:
          if (Qi)
            return Qi.call(L) == Qi.call(B);
      }
      return !1;
    }
    function Zd(L, B, ee, ve, Ie, ke) {
      var Ue = ee & d, qe = Ja(L), je = qe.length, Le = Ja(B), Qe = Le.length;
      if (je != Qe && !Ue)
        return !1;
      for (var at = je; at--; ) {
        var He = qe[at];
        if (!(Ue ? He in B : pe.call(B, He)))
          return !1;
      }
      var tt = ke.get(L);
      if (tt && ke.get(B))
        return tt == B;
      var nt = !0;
      ke.set(L, B), ke.set(B, L);
      for (var _t = Ue; ++at < je; ) {
        He = qe[at];
        var gt = L[He], Dt = B[He];
        if (ve)
          var io = Ue ? ve(Dt, gt, He, B, L, ke) : ve(gt, Dt, He, L, B, ke);
        if (!(io === void 0 ? gt === Dt || Ie(gt, Dt, ee, ve, ke) : io)) {
          nt = !1;
          break;
        }
        _t || (_t = He == "constructor");
      }
      if (nt && !_t) {
        var di = L.constructor, fi = B.constructor;
        di != fi && "constructor" in L && "constructor" in B && !(typeof di == "function" && di instanceof di && typeof fi == "function" && fi instanceof fi) && (nt = !1);
      }
      return ke.delete(L), ke.delete(B), nt;
    }
    function Ja(L) {
      return Vd(L, pf, tf);
    }
    function ui(L, B) {
      var ee = L.__data__;
      return rf(B) ? ee[typeof B == "string" ? "string" : "hash"] : ee.map;
    }
    function Qt(L, B) {
      var ee = ue(L, B);
      return Kd(ee) ? ee : void 0;
    }
    function ef(L) {
      var B = pe.call(L, le), ee = L[le];
      try {
        L[le] = void 0;
        var ve = !0;
      } catch {
      }
      var Ie = ge.call(L);
      return ve && (B ? L[le] = ee : delete L[le]), Ie;
    }
    var tf = ne ? function(L) {
      return L == null ? [] : (L = Object(L), Ce(ne(L), function(B) {
        return K.call(L, B);
      }));
    } : df, wt = fn;
    (Ae && wt(new Ae(new ArrayBuffer(1))) != I || Ne && wt(new Ne()) != f || Fe && wt(Fe.resolve()) != C || Oe && wt(new Oe()) != y || Jt && wt(new Jt()) != D) && (wt = function(L) {
      var B = fn(L), ee = B == b ? L.constructor : void 0, ve = ee ? Nt(ee) : "";
      if (ve)
        switch (ve) {
          case kt:
            return I;
          case bd:
            return f;
          case wd:
            return C;
          case _d:
            return y;
          case Ed:
            return D;
        }
      return B;
    });
    function nf(L, B) {
      return B = B ?? t, !!B && (typeof L == "number" || _e.test(L)) && L > -1 && L % 1 == 0 && L < B;
    }
    function rf(L) {
      var B = typeof L;
      return B == "string" || B == "number" || B == "symbol" || B == "boolean" ? L !== "__proto__" : L === null;
    }
    function sf(L) {
      return !!Te && Te in L;
    }
    function af(L) {
      var B = L && L.constructor, ee = typeof B == "function" && B.prototype || re;
      return L === ee;
    }
    function of(L) {
      return ge.call(L);
    }
    function Nt(L) {
      if (L != null) {
        try {
          return ce.call(L);
        } catch {
        }
        try {
          return L + "";
        } catch {
        }
      }
      return "";
    }
    function Qa(L, B) {
      return L === B || L !== L && B !== B;
    }
    var cf = Ya(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Ya : function(L) {
      return hn(L) && pe.call(L, "callee") && !K.call(L, "callee");
    }, pi = Array.isArray;
    function lf(L) {
      return L != null && eo(L.length) && !Za(L);
    }
    var Zi = de || ff;
    function uf(L, B) {
      return Ka(L, B);
    }
    function Za(L) {
      if (!to(L))
        return !1;
      var B = fn(L);
      return B == u || B == s || B == e || B == S;
    }
    function eo(L) {
      return typeof L == "number" && L > -1 && L % 1 == 0 && L <= t;
    }
    function to(L) {
      var B = typeof L;
      return L != null && (B == "object" || B == "function");
    }
    function hn(L) {
      return L != null && typeof L == "object";
    }
    var no = Re ? he(Re) : Xd;
    function pf(L) {
      return lf(L) ? Wd(L) : Jd(L);
    }
    function df() {
      return [];
    }
    function ff() {
      return !1;
    }
    o.exports = uf;
  })(ei, ei.exports)), ei.exports;
}
var El;
function Hh() {
  if (El) return en;
  El = 1, Object.defineProperty(en, "__esModule", { value: !0 }), en.DownloadedUpdateHelper = void 0, en.createTempUpdateFile = a;
  const o = ht, m = lt, v = Mh(), h = /* @__PURE__ */ Rt(), d = De;
  let c = class {
    constructor(e) {
      this.cacheDir = e, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
    }
    get downloadedFileInfo() {
      return this._downloadedFileInfo;
    }
    get file() {
      return this._file;
    }
    get packageFile() {
      return this._packageFile;
    }
    get cacheDirForPendingUpdate() {
      return d.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(e, i, l, r) {
      if (this.versionInfo != null && this.file === e && this.fileInfo != null)
        return v(this.versionInfo, i) && v(this.fileInfo.info, l.info) && await (0, h.pathExists)(e) ? e : null;
      const u = await this.getValidCachedUpdateFile(l, r);
      return u === null ? null : (r.info(`Update has already been downloaded to ${e}).`), this._file = u, u);
    }
    async setDownloadedFile(e, i, l, r, u, s) {
      this._file = e, this._packageFile = i, this.versionInfo = l, this.fileInfo = r, this._downloadedFileInfo = {
        fileName: u,
        sha512: r.info.sha512,
        isAdminRightsRequired: r.info.isAdminRightsRequired === !0
      }, s && await (0, h.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, h.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(e, i) {
      const l = this.getUpdateInfoFile();
      if (!await (0, h.pathExists)(l))
        return null;
      let u;
      try {
        u = await (0, h.readJson)(l);
      } catch (x) {
        let b = "No cached update info available";
        return x.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), b += ` (error on read: ${x.message})`), i.info(b), null;
      }
      if (!((u == null ? void 0 : u.fileName) !== null))
        return i.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (e.info.sha512 !== u.sha512)
        return i.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${u.sha512}, expected: ${e.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const f = d.join(this.cacheDirForPendingUpdate, u.fileName);
      if (!await (0, h.pathExists)(f))
        return i.info("Cached update file doesn't exist"), null;
      const p = await t(f);
      return e.info.sha512 !== p ? (i.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p}, expected: ${e.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = u, f);
    }
    getUpdateInfoFile() {
      return d.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  en.DownloadedUpdateHelper = c;
  function t(n, e = "sha512", i = "base64", l) {
    return new Promise((r, u) => {
      const s = (0, o.createHash)(e);
      s.on("error", u).setEncoding(i), (0, m.createReadStream)(n, {
        ...l,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", u).on("end", () => {
        s.end(), r(s.read());
      }).pipe(s, { end: !1 });
    });
  }
  async function a(n, e, i) {
    let l = 0, r = d.join(e, n);
    for (let u = 0; u < 3; u++)
      try {
        return await (0, h.unlink)(r), r;
      } catch (s) {
        if (s.code === "ENOENT")
          return r;
        i.warn(`Error on remove temp update file: ${s}`), r = d.join(e, `${l++}-${n}`);
      }
    return r;
  }
  return en;
}
var bn = {}, Ti = {}, Sl;
function zh() {
  if (Sl) return Ti;
  Sl = 1, Object.defineProperty(Ti, "__esModule", { value: !0 }), Ti.getAppCacheDir = v;
  const o = De, m = ni;
  function v() {
    const h = (0, m.homedir)();
    let d;
    return process.platform === "win32" ? d = process.env.LOCALAPPDATA || o.join(h, "AppData", "Local") : process.platform === "darwin" ? d = o.join(h, "Library", "Caches") : d = process.env.XDG_CACHE_HOME || o.join(h, ".cache"), d;
  }
  return Ti;
}
var Tl;
function Gh() {
  if (Tl) return bn;
  Tl = 1, Object.defineProperty(bn, "__esModule", { value: !0 }), bn.ElectronAppAdapter = void 0;
  const o = De, m = zh();
  let v = class {
    constructor(d = Wt.app) {
      this.app = d;
    }
    whenReady() {
      return this.app.whenReady();
    }
    get version() {
      return this.app.getVersion();
    }
    get name() {
      return this.app.getName();
    }
    get isPackaged() {
      return this.app.isPackaged === !0;
    }
    get appUpdateConfigPath() {
      return this.isPackaged ? o.join(process.resourcesPath, "app-update.yml") : o.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, m.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(d) {
      this.app.once("quit", (c, t) => d(t));
    }
  };
  return bn.ElectronAppAdapter = v, bn;
}
var Xs = {}, Cl;
function Wh() {
  return Cl || (Cl = 1, (function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.ElectronHttpExecutor = o.NET_SESSION_NAME = void 0, o.getNetSession = v;
    const m = Me();
    o.NET_SESSION_NAME = "electron-updater";
    function v() {
      return Wt.session.fromPartition(o.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class h extends m.HttpExecutor {
      constructor(c) {
        super(), this.proxyLoginCallback = c, this.cachedSession = null;
      }
      async download(c, t, a) {
        return await a.cancellationToken.createPromise((n, e, i) => {
          const l = {
            headers: a.headers || void 0,
            redirect: "manual"
          };
          (0, m.configureRequestUrl)(c, l), (0, m.configureRequestOptions)(l), this.doDownload(l, {
            destination: t,
            options: a,
            onCancel: i,
            callback: (r) => {
              r == null ? n(t) : e(r);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(c, t) {
        c.headers && c.headers.Host && (c.host = c.headers.Host, delete c.headers.Host), this.cachedSession == null && (this.cachedSession = v());
        const a = Wt.net.request({
          ...c,
          session: this.cachedSession
        });
        return a.on("response", t), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
      }
      addRedirectHandlers(c, t, a, n, e) {
        c.on("redirect", (i, l, r) => {
          c.abort(), n > this.maxRedirects ? a(this.createMaxRedirectError()) : e(m.HttpExecutor.prepareRedirectUrlOptions(r, t));
        });
      }
    }
    o.ElectronHttpExecutor = h;
  })(Xs)), Xs;
}
var wn = {}, qt = {}, Js, Rl;
function Vh() {
  if (Rl) return Js;
  Rl = 1;
  var o = "[object Symbol]", m = /[\\^$.*+?()[\]{}|]/g, v = RegExp(m.source), h = typeof ct == "object" && ct && ct.Object === Object && ct, d = typeof self == "object" && self && self.Object === Object && self, c = h || d || Function("return this")(), t = Object.prototype, a = t.toString, n = c.Symbol, e = n ? n.prototype : void 0, i = e ? e.toString : void 0;
  function l(p) {
    if (typeof p == "string")
      return p;
    if (u(p))
      return i ? i.call(p) : "";
    var x = p + "";
    return x == "0" && 1 / p == -1 / 0 ? "-0" : x;
  }
  function r(p) {
    return !!p && typeof p == "object";
  }
  function u(p) {
    return typeof p == "symbol" || r(p) && a.call(p) == o;
  }
  function s(p) {
    return p == null ? "" : l(p);
  }
  function f(p) {
    return p = s(p), p && v.test(p) ? p.replace(m, "\\$&") : p;
  }
  return Js = f, Js;
}
var Al;
function Kt() {
  if (Al) return qt;
  Al = 1, Object.defineProperty(qt, "__esModule", { value: !0 }), qt.newBaseUrl = v, qt.newUrlFromBase = h, qt.getChannelFilename = d, qt.blockmapFiles = c;
  const o = Vt, m = Vh();
  function v(t) {
    const a = new o.URL(t);
    return a.pathname.endsWith("/") || (a.pathname += "/"), a;
  }
  function h(t, a, n = !1) {
    const e = new o.URL(t, a), i = a.search;
    return i != null && i.length !== 0 ? e.search = i : n && (e.search = `noCache=${Date.now().toString(32)}`), e;
  }
  function d(t) {
    return `${t}.yml`;
  }
  function c(t, a, n) {
    const e = h(`${t.pathname}.blockmap`, t);
    return [h(`${t.pathname.replace(new RegExp(m(n), "g"), a)}.blockmap`, t), e];
  }
  return qt;
}
var xt = {}, kl;
function rt() {
  if (kl) return xt;
  kl = 1, Object.defineProperty(xt, "__esModule", { value: !0 }), xt.Provider = void 0, xt.findFile = d, xt.parseUpdateInfo = c, xt.getFileList = t, xt.resolveFiles = a;
  const o = Me(), m = Da(), v = Kt();
  let h = class {
    constructor(e) {
      this.runtimeOptions = e, this.requestHeaders = null, this.executor = e.executor;
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const e = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (e === "x64" ? "" : `-${e}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(e) {
      return `${e}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(e) {
      this.requestHeaders = e;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(e, i, l) {
      return this.executor.request(this.createRequestOptions(e, i), l);
    }
    createRequestOptions(e, i) {
      const l = {};
      return this.requestHeaders == null ? i != null && (l.headers = i) : l.headers = i == null ? this.requestHeaders : { ...this.requestHeaders, ...i }, (0, o.configureRequestUrl)(e, l), l;
    }
  };
  xt.Provider = h;
  function d(n, e, i) {
    if (n.length === 0)
      throw (0, o.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const l = n.find((r) => r.url.pathname.toLowerCase().endsWith(`.${e}`));
    return l ?? (i == null ? n[0] : n.find((r) => !i.some((u) => r.url.pathname.toLowerCase().endsWith(`.${u}`))));
  }
  function c(n, e, i) {
    if (n == null)
      throw (0, o.newError)(`Cannot parse update info from ${e} in the latest release artifacts (${i}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let l;
    try {
      l = (0, m.load)(n);
    } catch (r) {
      throw (0, o.newError)(`Cannot parse update info from ${e} in the latest release artifacts (${i}): ${r.stack || r.message}, rawData: ${n}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return l;
  }
  function t(n) {
    const e = n.files;
    if (e != null && e.length > 0)
      return e;
    if (n.path != null)
      return [
        {
          url: n.path,
          sha2: n.sha2,
          sha512: n.sha512
        }
      ];
    throw (0, o.newError)(`No files provided: ${(0, o.safeStringifyJson)(n)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function a(n, e, i = (l) => l) {
    const r = t(n).map((f) => {
      if (f.sha2 == null && f.sha512 == null)
        throw (0, o.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, o.safeStringifyJson)(f)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, v.newUrlFromBase)(i(f.url), e),
        info: f
      };
    }), u = n.packages, s = u == null ? null : u[process.arch] || u.ia32;
    return s != null && (r[0].packageInfo = {
      ...s,
      path: (0, v.newUrlFromBase)(i(s.path), e).href
    }), r;
  }
  return xt;
}
var Ol;
function Vp() {
  if (Ol) return wn;
  Ol = 1, Object.defineProperty(wn, "__esModule", { value: !0 }), wn.GenericProvider = void 0;
  const o = Me(), m = Kt(), v = rt();
  let h = class extends v.Provider {
    constructor(c, t, a) {
      super(a), this.configuration = c, this.updater = t, this.baseUrl = (0, m.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const c = this.updater.channel || this.configuration.channel;
      return c == null ? this.getDefaultChannelName() : this.getCustomChannelName(c);
    }
    async getLatestVersion() {
      const c = (0, m.getChannelFilename)(this.channel), t = (0, m.newUrlFromBase)(c, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let a = 0; ; a++)
        try {
          return (0, v.parseUpdateInfo)(await this.httpRequest(t), c, t);
        } catch (n) {
          if (n instanceof o.HttpError && n.statusCode === 404)
            throw (0, o.newError)(`Cannot find channel "${c}" update info: ${n.stack || n.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (n.code === "ECONNREFUSED" && a < 3) {
            await new Promise((e, i) => {
              try {
                setTimeout(e, 1e3 * a);
              } catch (l) {
                i(l);
              }
            });
            continue;
          }
          throw n;
        }
    }
    resolveFiles(c) {
      return (0, v.resolveFiles)(c, this.baseUrl);
    }
  };
  return wn.GenericProvider = h, wn;
}
var _n = {}, En = {}, Pl;
function Yh() {
  if (Pl) return En;
  Pl = 1, Object.defineProperty(En, "__esModule", { value: !0 }), En.BitbucketProvider = void 0;
  const o = Me(), m = Kt(), v = rt();
  let h = class extends v.Provider {
    constructor(c, t, a) {
      super({
        ...a,
        isUseMultipleRangeRequest: !1
      }), this.configuration = c, this.updater = t;
      const { owner: n, slug: e } = c;
      this.baseUrl = (0, m.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${n}/${e}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const c = new o.CancellationToken(), t = (0, m.getChannelFilename)(this.getCustomChannelName(this.channel)), a = (0, m.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const n = await this.httpRequest(a, void 0, c);
        return (0, v.parseUpdateInfo)(n, t, a);
      } catch (n) {
        throw (0, o.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${n.stack || n.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(c) {
      return (0, v.resolveFiles)(c, this.baseUrl);
    }
    toString() {
      const { owner: c, slug: t } = this.configuration;
      return `Bitbucket (owner: ${c}, slug: ${t}, channel: ${this.channel})`;
    }
  };
  return En.BitbucketProvider = h, En;
}
var St = {}, Nl;
function Yp() {
  if (Nl) return St;
  Nl = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.GitHubProvider = St.BaseGitHubProvider = void 0, St.computeReleaseNotes = e;
  const o = Me(), m = Wp(), v = Vt, h = Kt(), d = rt(), c = /\/tag\/([^/]+)$/;
  class t extends d.Provider {
    constructor(l, r, u) {
      super({
        ...u,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = l, this.baseUrl = (0, h.newBaseUrl)((0, o.githubUrl)(l, r));
      const s = r === "github.com" ? "api.github.com" : r;
      this.baseApiUrl = (0, h.newBaseUrl)((0, o.githubUrl)(l, s));
    }
    computeGithubBasePath(l) {
      const r = this.options.host;
      return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${l}` : l;
    }
  }
  St.BaseGitHubProvider = t;
  let a = class extends t {
    constructor(l, r, u) {
      super(l, "github.com", u), this.options = l, this.updater = r;
    }
    get channel() {
      const l = this.updater.channel || this.options.channel;
      return l == null ? this.getDefaultChannelName() : this.getCustomChannelName(l);
    }
    async getLatestVersion() {
      var l, r, u, s, f;
      const p = new o.CancellationToken(), x = await this.httpRequest((0, h.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, p), b = (0, o.parseXml)(x);
      let C = b.element("entry", !1, "No published versions on GitHub"), S = null;
      try {
        if (this.updater.allowPrerelease) {
          const D = ((l = this.updater) === null || l === void 0 ? void 0 : l.channel) || ((r = m.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
          if (D === null)
            S = c.exec(C.element("link").attribute("href"))[1];
          else
            for (const O of b.getElements("entry")) {
              const I = c.exec(O.element("link").attribute("href"));
              if (I === null)
                continue;
              const q = I[1], R = ((u = m.prerelease(q)) === null || u === void 0 ? void 0 : u[0]) || null, N = !D || ["alpha", "beta"].includes(D), F = R !== null && !["alpha", "beta"].includes(String(R));
              if (N && !F && !(D === "beta" && R === "alpha")) {
                S = q;
                break;
              }
              if (R && R === D) {
                S = q;
                break;
              }
            }
        } else {
          S = await this.getLatestTagName(p);
          for (const D of b.getElements("entry"))
            if (c.exec(D.element("link").attribute("href"))[1] === S) {
              C = D;
              break;
            }
        }
      } catch (D) {
        throw (0, o.newError)(`Cannot parse releases feed: ${D.stack || D.message},
XML:
${x}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (S == null)
        throw (0, o.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let T, y = "", E = "";
      const w = async (D) => {
        y = (0, h.getChannelFilename)(D), E = (0, h.newUrlFromBase)(this.getBaseDownloadPath(String(S), y), this.baseUrl);
        const O = this.createRequestOptions(E);
        try {
          return await this.executor.request(O, p);
        } catch (I) {
          throw I instanceof o.HttpError && I.statusCode === 404 ? (0, o.newError)(`Cannot find ${y} in the latest release artifacts (${E}): ${I.stack || I.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : I;
        }
      };
      try {
        let D = this.channel;
        this.updater.allowPrerelease && (!((s = m.prerelease(S)) === null || s === void 0) && s[0]) && (D = this.getCustomChannelName(String((f = m.prerelease(S)) === null || f === void 0 ? void 0 : f[0]))), T = await w(D);
      } catch (D) {
        if (this.updater.allowPrerelease)
          T = await w(this.getDefaultChannelName());
        else
          throw D;
      }
      const _ = (0, d.parseUpdateInfo)(T, y, E);
      return _.releaseName == null && (_.releaseName = C.elementValueOrEmpty("title")), _.releaseNotes == null && (_.releaseNotes = e(this.updater.currentVersion, this.updater.fullChangelog, b, C)), {
        tag: S,
        ..._
      };
    }
    async getLatestTagName(l) {
      const r = this.options, u = r.host == null || r.host === "github.com" ? (0, h.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new v.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const s = await this.httpRequest(u, { Accept: "application/json" }, l);
        return s == null ? null : JSON.parse(s).tag_name;
      } catch (s) {
        throw (0, o.newError)(`Unable to find latest version on GitHub (${u}), please ensure a production release exists: ${s.stack || s.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(l) {
      return (0, d.resolveFiles)(l, this.baseUrl, (r) => this.getBaseDownloadPath(l.tag, r.replace(/ /g, "-")));
    }
    getBaseDownloadPath(l, r) {
      return `${this.basePath}/download/${l}/${r}`;
    }
  };
  St.GitHubProvider = a;
  function n(i) {
    const l = i.elementValueOrEmpty("content");
    return l === "No content." ? "" : l;
  }
  function e(i, l, r, u) {
    if (!l)
      return n(u);
    const s = [];
    for (const f of r.getElements("entry")) {
      const p = /\/tag\/v?([^/]+)$/.exec(f.element("link").attribute("href"))[1];
      m.lt(i, p) && s.push({
        version: p,
        note: n(f)
      });
    }
    return s.sort((f, p) => m.rcompare(f.version, p.version));
  }
  return St;
}
var Sn = {}, Dl;
function Kh() {
  if (Dl) return Sn;
  Dl = 1, Object.defineProperty(Sn, "__esModule", { value: !0 }), Sn.KeygenProvider = void 0;
  const o = Me(), m = Kt(), v = rt();
  let h = class extends v.Provider {
    constructor(c, t, a) {
      super({
        ...a,
        isUseMultipleRangeRequest: !1
      }), this.configuration = c, this.updater = t, this.defaultHostname = "api.keygen.sh";
      const n = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, m.newBaseUrl)(`https://${n}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const c = new o.CancellationToken(), t = (0, m.getChannelFilename)(this.getCustomChannelName(this.channel)), a = (0, m.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const n = await this.httpRequest(a, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, c);
        return (0, v.parseUpdateInfo)(n, t, a);
      } catch (n) {
        throw (0, o.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${n.stack || n.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(c) {
      return (0, v.resolveFiles)(c, this.baseUrl);
    }
    toString() {
      const { account: c, product: t, platform: a } = this.configuration;
      return `Keygen (account: ${c}, product: ${t}, platform: ${a}, channel: ${this.channel})`;
    }
  };
  return Sn.KeygenProvider = h, Sn;
}
var Tn = {}, Il;
function Xh() {
  if (Il) return Tn;
  Il = 1, Object.defineProperty(Tn, "__esModule", { value: !0 }), Tn.PrivateGitHubProvider = void 0;
  const o = Me(), m = Da(), v = De, h = Vt, d = Kt(), c = Yp(), t = rt();
  let a = class extends c.BaseGitHubProvider {
    constructor(e, i, l, r) {
      super(e, "api.github.com", r), this.updater = i, this.token = l;
    }
    createRequestOptions(e, i) {
      const l = super.createRequestOptions(e, i);
      return l.redirect = "manual", l;
    }
    async getLatestVersion() {
      const e = new o.CancellationToken(), i = (0, d.getChannelFilename)(this.getDefaultChannelName()), l = await this.getLatestVersionInfo(e), r = l.assets.find((f) => f.name === i);
      if (r == null)
        throw (0, o.newError)(`Cannot find ${i} in the release ${l.html_url || l.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const u = new h.URL(r.url);
      let s;
      try {
        s = (0, m.load)(await this.httpRequest(u, this.configureHeaders("application/octet-stream"), e));
      } catch (f) {
        throw f instanceof o.HttpError && f.statusCode === 404 ? (0, o.newError)(`Cannot find ${i} in the latest release artifacts (${u}): ${f.stack || f.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : f;
      }
      return s.assets = l.assets, s;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(e) {
      return {
        accept: e,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(e) {
      const i = this.updater.allowPrerelease;
      let l = this.basePath;
      i || (l = `${l}/latest`);
      const r = (0, d.newUrlFromBase)(l, this.baseUrl);
      try {
        const u = JSON.parse(await this.httpRequest(r, this.configureHeaders("application/vnd.github.v3+json"), e));
        return i ? u.find((s) => s.prerelease) || u[0] : u;
      } catch (u) {
        throw (0, o.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${u.stack || u.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(e) {
      return (0, t.getFileList)(e).map((i) => {
        const l = v.posix.basename(i.url).replace(/ /g, "-"), r = e.assets.find((u) => u != null && u.name === l);
        if (r == null)
          throw (0, o.newError)(`Cannot find asset "${l}" in: ${JSON.stringify(e.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new h.URL(r.url),
          info: i
        };
      });
    }
  };
  return Tn.PrivateGitHubProvider = a, Tn;
}
var Ll;
function Jh() {
  if (Ll) return _n;
  Ll = 1, Object.defineProperty(_n, "__esModule", { value: !0 }), _n.isUrlProbablySupportMultiRangeRequests = t, _n.createClient = a;
  const o = Me(), m = Yh(), v = Vp(), h = Yp(), d = Kh(), c = Xh();
  function t(n) {
    return !n.includes("s3.amazonaws.com");
  }
  function a(n, e, i) {
    if (typeof n == "string")
      throw (0, o.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const l = n.provider;
    switch (l) {
      case "github": {
        const r = n, u = (r.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || r.token;
        return u == null ? new h.GitHubProvider(r, e, i) : new c.PrivateGitHubProvider(r, e, u, i);
      }
      case "bitbucket":
        return new m.BitbucketProvider(n, e, i);
      case "keygen":
        return new d.KeygenProvider(n, e, i);
      case "s3":
      case "spaces":
        return new v.GenericProvider({
          provider: "generic",
          url: (0, o.getS3LikeProviderBaseUrl)(n),
          channel: n.channel || null
        }, e, {
          ...i,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const r = n;
        return new v.GenericProvider(r, e, {
          ...i,
          isUseMultipleRangeRequest: r.useMultipleRangeRequest !== !1 && t(r.url)
        });
      }
      case "custom": {
        const r = n, u = r.updateProvider;
        if (!u)
          throw (0, o.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new u(r, e, i);
      }
      default:
        throw (0, o.newError)(`Unsupported provider: ${l}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return _n;
}
var Cn = {}, Rn = {}, tn = {}, nn = {}, Fl;
function Ba() {
  if (Fl) return nn;
  Fl = 1, Object.defineProperty(nn, "__esModule", { value: !0 }), nn.OperationKind = void 0, nn.computeOperations = m;
  var o;
  (function(t) {
    t[t.COPY = 0] = "COPY", t[t.DOWNLOAD = 1] = "DOWNLOAD";
  })(o || (nn.OperationKind = o = {}));
  function m(t, a, n) {
    const e = c(t.files), i = c(a.files);
    let l = null;
    const r = a.files[0], u = [], s = r.name, f = e.get(s);
    if (f == null)
      throw new Error(`no file ${s} in old blockmap`);
    const p = i.get(s);
    let x = 0;
    const { checksumToOffset: b, checksumToOldSize: C } = d(e.get(s), f.offset, n);
    let S = r.offset;
    for (let T = 0; T < p.checksums.length; S += p.sizes[T], T++) {
      const y = p.sizes[T], E = p.checksums[T];
      let w = b.get(E);
      w != null && C.get(E) !== y && (n.warn(`Checksum ("${E}") matches, but size differs (old: ${C.get(E)}, new: ${y})`), w = void 0), w === void 0 ? (x++, l != null && l.kind === o.DOWNLOAD && l.end === S ? l.end += y : (l = {
        kind: o.DOWNLOAD,
        start: S,
        end: S + y
        // oldBlocks: null,
      }, h(l, u, E, T))) : l != null && l.kind === o.COPY && l.end === w ? l.end += y : (l = {
        kind: o.COPY,
        start: w,
        end: w + y
        // oldBlocks: [checksum]
      }, h(l, u, E, T));
    }
    return x > 0 && n.info(`File${r.name === "file" ? "" : " " + r.name} has ${x} changed blocks`), u;
  }
  const v = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function h(t, a, n, e) {
    if (v && a.length !== 0) {
      const i = a[a.length - 1];
      if (i.kind === t.kind && t.start < i.end && t.start > i.start) {
        const l = [i.start, i.end, t.start, t.end].reduce((r, u) => r < u ? r : u);
        throw new Error(`operation (block index: ${e}, checksum: ${n}, kind: ${o[t.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${t.start} until ${t.end}
rel: ${i.start - l} until ${i.end - l} and ${t.start - l} until ${t.end - l}`);
      }
    }
    a.push(t);
  }
  function d(t, a, n) {
    const e = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    let l = a;
    for (let r = 0; r < t.checksums.length; r++) {
      const u = t.checksums[r], s = t.sizes[r], f = i.get(u);
      if (f === void 0)
        e.set(u, l), i.set(u, s);
      else if (n.debug != null) {
        const p = f === s ? "(same size)" : `(size: ${f}, this size: ${s})`;
        n.debug(`${u} duplicated in blockmap ${p}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      l += s;
    }
    return { checksumToOffset: e, checksumToOldSize: i };
  }
  function c(t) {
    const a = /* @__PURE__ */ new Map();
    for (const n of t)
      a.set(n.name, n);
    return a;
  }
  return nn;
}
var Ul;
function Kp() {
  if (Ul) return tn;
  Ul = 1, Object.defineProperty(tn, "__esModule", { value: !0 }), tn.DataSplitter = void 0, tn.copyData = t;
  const o = Me(), m = lt, v = ut, h = Ba(), d = Buffer.from(`\r
\r
`);
  var c;
  (function(n) {
    n[n.INIT = 0] = "INIT", n[n.HEADER = 1] = "HEADER", n[n.BODY = 2] = "BODY";
  })(c || (c = {}));
  function t(n, e, i, l, r) {
    const u = (0, m.createReadStream)("", {
      fd: i,
      autoClose: !1,
      start: n.start,
      // end is inclusive
      end: n.end - 1
    });
    u.on("error", l), u.once("end", r), u.pipe(e, {
      end: !1
    });
  }
  let a = class extends v.Writable {
    constructor(e, i, l, r, u, s) {
      super(), this.out = e, this.options = i, this.partIndexToTaskIndex = l, this.partIndexToLength = u, this.finishHandler = s, this.partIndex = -1, this.headerListBuffer = null, this.readState = c.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = r.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(e, i, l) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${e.length} bytes`);
        return;
      }
      this.handleData(e).then(l).catch(l);
    }
    async handleData(e) {
      let i = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, o.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const l = Math.min(this.ignoreByteCount, e.length);
        this.ignoreByteCount -= l, i = l;
      } else if (this.remainingPartDataCount > 0) {
        const l = Math.min(this.remainingPartDataCount, e.length);
        this.remainingPartDataCount -= l, await this.processPartData(e, 0, l), i = l;
      }
      if (i !== e.length) {
        if (this.readState === c.HEADER) {
          const l = this.searchHeaderListEnd(e, i);
          if (l === -1)
            return;
          i = l, this.readState = c.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === c.BODY)
            this.readState = c.INIT;
          else {
            this.partIndex++;
            let s = this.partIndexToTaskIndex.get(this.partIndex);
            if (s == null)
              if (this.isFinished)
                s = this.options.end;
              else
                throw (0, o.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const f = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (f < s)
              await this.copyExistingData(f, s);
            else if (f > s)
              throw (0, o.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (i = this.searchHeaderListEnd(e, i), i === -1) {
              this.readState = c.HEADER;
              return;
            }
          }
          const l = this.partIndexToLength[this.partIndex], r = i + l, u = Math.min(r, e.length);
          if (await this.processPartStarted(e, i, u), this.remainingPartDataCount = l - (u - i), this.remainingPartDataCount > 0)
            return;
          if (i = r + this.boundaryLength, i >= e.length) {
            this.ignoreByteCount = this.boundaryLength - (e.length - r);
            return;
          }
        }
      }
    }
    copyExistingData(e, i) {
      return new Promise((l, r) => {
        const u = () => {
          if (e === i) {
            l();
            return;
          }
          const s = this.options.tasks[e];
          if (s.kind !== h.OperationKind.COPY) {
            r(new Error("Task kind must be COPY"));
            return;
          }
          t(s, this.out, this.options.oldFileFd, r, () => {
            e++, u();
          });
        };
        u();
      });
    }
    searchHeaderListEnd(e, i) {
      const l = e.indexOf(d, i);
      if (l !== -1)
        return l + d.length;
      const r = i === 0 ? e : e.slice(i);
      return this.headerListBuffer == null ? this.headerListBuffer = r : this.headerListBuffer = Buffer.concat([this.headerListBuffer, r]), -1;
    }
    onPartEnd() {
      const e = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== e)
        throw (0, o.newError)(`Expected length: ${e} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(e, i, l) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(e, i, l);
    }
    processPartData(e, i, l) {
      this.actualPartLength += l - i;
      const r = this.out;
      return r.write(i === 0 && e.length === l ? e : e.slice(i, l)) ? Promise.resolve() : new Promise((u, s) => {
        r.on("error", s), r.once("drain", () => {
          r.removeListener("error", s), u();
        });
      });
    }
  };
  return tn.DataSplitter = a, tn;
}
var An = {}, ql;
function Qh() {
  if (ql) return An;
  ql = 1, Object.defineProperty(An, "__esModule", { value: !0 }), An.executeTasksUsingMultipleRangeRequests = h, An.checkIsRangesSupported = c;
  const o = Me(), m = Kp(), v = Ba();
  function h(t, a, n, e, i) {
    const l = (r) => {
      if (r >= a.length) {
        t.fileMetadataBuffer != null && n.write(t.fileMetadataBuffer), n.end();
        return;
      }
      const u = r + 1e3;
      d(t, {
        tasks: a,
        start: r,
        end: Math.min(a.length, u),
        oldFileFd: e
      }, n, () => l(u), i);
    };
    return l;
  }
  function d(t, a, n, e, i) {
    let l = "bytes=", r = 0;
    const u = /* @__PURE__ */ new Map(), s = [];
    for (let x = a.start; x < a.end; x++) {
      const b = a.tasks[x];
      b.kind === v.OperationKind.DOWNLOAD && (l += `${b.start}-${b.end - 1}, `, u.set(r, x), r++, s.push(b.end - b.start));
    }
    if (r <= 1) {
      const x = (b) => {
        if (b >= a.end) {
          e();
          return;
        }
        const C = a.tasks[b++];
        if (C.kind === v.OperationKind.COPY)
          (0, m.copyData)(C, n, a.oldFileFd, i, () => x(b));
        else {
          const S = t.createRequestOptions();
          S.headers.Range = `bytes=${C.start}-${C.end - 1}`;
          const T = t.httpExecutor.createRequest(S, (y) => {
            c(y, i) && (y.pipe(n, {
              end: !1
            }), y.once("end", () => x(b)));
          });
          t.httpExecutor.addErrorAndTimeoutHandlers(T, i), T.end();
        }
      };
      x(a.start);
      return;
    }
    const f = t.createRequestOptions();
    f.headers.Range = l.substring(0, l.length - 2);
    const p = t.httpExecutor.createRequest(f, (x) => {
      if (!c(x, i))
        return;
      const b = (0, o.safeGetHeader)(x, "content-type"), C = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(b);
      if (C == null) {
        i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${b}"`));
        return;
      }
      const S = new m.DataSplitter(n, a, u, C[1] || C[2], s, e);
      S.on("error", i), x.pipe(S), x.on("end", () => {
        setTimeout(() => {
          p.abort(), i(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    t.httpExecutor.addErrorAndTimeoutHandlers(p, i), p.end();
  }
  function c(t, a) {
    if (t.statusCode >= 400)
      return a((0, o.createHttpError)(t)), !1;
    if (t.statusCode !== 206) {
      const n = (0, o.safeGetHeader)(t, "accept-ranges");
      if (n == null || n === "none")
        return a(new Error(`Server doesn't support Accept-Ranges (response code ${t.statusCode})`)), !1;
    }
    return !0;
  }
  return An;
}
var kn = {}, $l;
function Zh() {
  if ($l) return kn;
  $l = 1, Object.defineProperty(kn, "__esModule", { value: !0 }), kn.ProgressDifferentialDownloadCallbackTransform = void 0;
  const o = ut;
  var m;
  (function(h) {
    h[h.COPY = 0] = "COPY", h[h.DOWNLOAD = 1] = "DOWNLOAD";
  })(m || (m = {}));
  let v = class extends o.Transform {
    constructor(d, c, t) {
      super(), this.progressDifferentialDownloadInfo = d, this.cancellationToken = c, this.onProgress = t, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = m.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(d, c, t) {
      if (this.cancellationToken.cancelled) {
        t(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == m.COPY) {
        t(null, d);
        return;
      }
      this.transferred += d.length, this.delta += d.length;
      const a = Date.now();
      a >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = a + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((a - this.start) / 1e3))
      }), this.delta = 0), t(null, d);
    }
    beginFileCopy() {
      this.operationType = m.COPY;
    }
    beginRangeDownload() {
      this.operationType = m.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
    }
    endRangeDownload() {
      this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
    // Called when we are 100% done with the connection/download
    _flush(d) {
      if (this.cancellationToken.cancelled) {
        d(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, d(null);
    }
  };
  return kn.ProgressDifferentialDownloadCallbackTransform = v, kn;
}
var Bl;
function Xp() {
  if (Bl) return Rn;
  Bl = 1, Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.DifferentialDownloader = void 0;
  const o = Me(), m = /* @__PURE__ */ Rt(), v = lt, h = Kp(), d = Vt, c = Ba(), t = Qh(), a = Zh();
  let n = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(r, u, s) {
      this.blockAwareFileInfo = r, this.httpExecutor = u, this.options = s, this.fileMetadataBuffer = null, this.logger = s.logger;
    }
    createRequestOptions() {
      const r = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, o.configureRequestUrl)(this.options.newUrl, r), (0, o.configureRequestOptions)(r), r;
    }
    doDownload(r, u) {
      if (r.version !== u.version)
        throw new Error(`version is different (${r.version} - ${u.version}), full download is required`);
      const s = this.logger, f = (0, c.computeOperations)(r, u, s);
      s.debug != null && s.debug(JSON.stringify(f, null, 2));
      let p = 0, x = 0;
      for (const C of f) {
        const S = C.end - C.start;
        C.kind === c.OperationKind.DOWNLOAD ? p += S : x += S;
      }
      const b = this.blockAwareFileInfo.size;
      if (p + x + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== b)
        throw new Error(`Internal error, size mismatch: downloadSize: ${p}, copySize: ${x}, newSize: ${b}`);
      return s.info(`Full: ${e(b)}, To download: ${e(p)} (${Math.round(p / (b / 100))}%)`), this.downloadFile(f);
    }
    downloadFile(r) {
      const u = [], s = () => Promise.all(u.map((f) => (0, m.close)(f.descriptor).catch((p) => {
        this.logger.error(`cannot close file "${f.path}": ${p}`);
      })));
      return this.doDownloadFile(r, u).then(s).catch((f) => s().catch((p) => {
        try {
          this.logger.error(`cannot close files: ${p}`);
        } catch (x) {
          try {
            console.error(x);
          } catch {
          }
        }
        throw f;
      }).then(() => {
        throw f;
      }));
    }
    async doDownloadFile(r, u) {
      const s = await (0, m.open)(this.options.oldFile, "r");
      u.push({ descriptor: s, path: this.options.oldFile });
      const f = await (0, m.open)(this.options.newFile, "w");
      u.push({ descriptor: f, path: this.options.newFile });
      const p = (0, v.createWriteStream)(this.options.newFile, { fd: f });
      await new Promise((x, b) => {
        const C = [];
        let S;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const I = [];
          let q = 0;
          for (const N of r)
            N.kind === c.OperationKind.DOWNLOAD && (I.push(N.end - N.start), q += N.end - N.start);
          const R = {
            expectedByteCounts: I,
            grandTotal: q
          };
          S = new a.ProgressDifferentialDownloadCallbackTransform(R, this.options.cancellationToken, this.options.onProgress), C.push(S);
        }
        const T = new o.DigestTransform(this.blockAwareFileInfo.sha512);
        T.isValidateOnEnd = !1, C.push(T), p.on("finish", () => {
          p.close(() => {
            u.splice(1, 1);
            try {
              T.validate();
            } catch (I) {
              b(I);
              return;
            }
            x(void 0);
          });
        }), C.push(p);
        let y = null;
        for (const I of C)
          I.on("error", b), y == null ? y = I : y = y.pipe(I);
        const E = C[0];
        let w;
        if (this.options.isUseMultipleRangeRequest) {
          w = (0, t.executeTasksUsingMultipleRangeRequests)(this, r, E, s, b), w(0);
          return;
        }
        let _ = 0, D = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const O = this.createRequestOptions();
        O.redirect = "manual", w = (I) => {
          var q, R;
          if (I >= r.length) {
            this.fileMetadataBuffer != null && E.write(this.fileMetadataBuffer), E.end();
            return;
          }
          const N = r[I++];
          if (N.kind === c.OperationKind.COPY) {
            S && S.beginFileCopy(), (0, h.copyData)(N, E, s, b, () => w(I));
            return;
          }
          const F = `bytes=${N.start}-${N.end - 1}`;
          O.headers.range = F, (R = (q = this.logger) === null || q === void 0 ? void 0 : q.debug) === null || R === void 0 || R.call(q, `download range: ${F}`), S && S.beginRangeDownload();
          const U = this.httpExecutor.createRequest(O, (z) => {
            z.on("error", b), z.on("aborted", () => {
              b(new Error("response has been aborted by the server"));
            }), z.statusCode >= 400 && b((0, o.createHttpError)(z)), z.pipe(E, {
              end: !1
            }), z.once("end", () => {
              S && S.endRangeDownload(), ++_ === 100 ? (_ = 0, setTimeout(() => w(I), 1e3)) : w(I);
            });
          });
          U.on("redirect", (z, W, ie) => {
            this.logger.info(`Redirect to ${i(ie)}`), D = ie, (0, o.configureRequestUrl)(new d.URL(D), O), U.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(U, b), U.end();
        }, w(0);
      });
    }
    async readRemoteBytes(r, u) {
      const s = Buffer.allocUnsafe(u + 1 - r), f = this.createRequestOptions();
      f.headers.range = `bytes=${r}-${u}`;
      let p = 0;
      if (await this.request(f, (x) => {
        x.copy(s, p), p += x.length;
      }), p !== s.length)
        throw new Error(`Received data length ${p} is not equal to expected ${s.length}`);
      return s;
    }
    request(r, u) {
      return new Promise((s, f) => {
        const p = this.httpExecutor.createRequest(r, (x) => {
          (0, t.checkIsRangesSupported)(x, f) && (x.on("error", f), x.on("aborted", () => {
            f(new Error("response has been aborted by the server"));
          }), x.on("data", u), x.on("end", () => s()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(p, f), p.end();
      });
    }
  };
  Rn.DifferentialDownloader = n;
  function e(l, r = " KB") {
    return new Intl.NumberFormat("en").format((l / 1024).toFixed(2)) + r;
  }
  function i(l) {
    const r = l.indexOf("?");
    return r < 0 ? l : l.substring(0, r);
  }
  return Rn;
}
var jl;
function em() {
  if (jl) return Cn;
  jl = 1, Object.defineProperty(Cn, "__esModule", { value: !0 }), Cn.GenericDifferentialDownloader = void 0;
  const o = Xp();
  let m = class extends o.DifferentialDownloader {
    download(h, d) {
      return this.doDownload(h, d);
    }
  };
  return Cn.GenericDifferentialDownloader = m, Cn;
}
var Qs = {}, Ml;
function Xt() {
  return Ml || (Ml = 1, (function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.UpdaterSignal = o.UPDATE_DOWNLOADED = o.DOWNLOAD_PROGRESS = o.CancellationToken = void 0, o.addHandler = h;
    const m = Me();
    Object.defineProperty(o, "CancellationToken", { enumerable: !0, get: function() {
      return m.CancellationToken;
    } }), o.DOWNLOAD_PROGRESS = "download-progress", o.UPDATE_DOWNLOADED = "update-downloaded";
    class v {
      constructor(c) {
        this.emitter = c;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(c) {
        h(this.emitter, "login", c);
      }
      progress(c) {
        h(this.emitter, o.DOWNLOAD_PROGRESS, c);
      }
      updateDownloaded(c) {
        h(this.emitter, o.UPDATE_DOWNLOADED, c);
      }
      updateCancelled(c) {
        h(this.emitter, "update-cancelled", c);
      }
    }
    o.UpdaterSignal = v;
    function h(d, c, t) {
      d.on(c, t);
    }
  })(Qs)), Qs;
}
var Hl;
function ja() {
  if (Hl) return Lt;
  Hl = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.NoOpLogger = Lt.AppUpdater = void 0;
  const o = Me(), m = ht, v = ni, h = ft, d = /* @__PURE__ */ Rt(), c = Da(), t = gh(), a = De, n = Wp(), e = Hh(), i = Gh(), l = Wh(), r = Vp(), u = Jh(), s = on, f = Kt(), p = em(), x = Xt();
  let b = class Jp extends h.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(y) {
      if (this._channel != null) {
        if (typeof y != "string")
          throw (0, o.newError)(`Channel must be a string, but got: ${y}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (y.length === 0)
          throw (0, o.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = y, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(y) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: y
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, l.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(y) {
      this._logger = y ?? new S();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(y) {
      this.clientPromise = null, this._appUpdateConfigPath = y, this.configOnDisk = new t.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(y) {
      y && (this._isUpdateSupported = y);
    }
    constructor(y, E) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new x.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (D) => this.checkIfUpdateSupported(D), this.clientPromise = null, this.stagingUserIdPromise = new t.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new t.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (D) => {
        this._logger.error(`Error: ${D.stack || D.message}`);
      }), E == null ? (this.app = new i.ElectronAppAdapter(), this.httpExecutor = new l.ElectronHttpExecutor((D, O) => this.emit("login", D, O))) : (this.app = E, this.httpExecutor = null);
      const w = this.app.version, _ = (0, n.parse)(w);
      if (_ == null)
        throw (0, o.newError)(`App version is not a valid semver version: "${w}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = _, this.allowPrerelease = C(_), y != null && (this.setFeedURL(y), typeof y != "string" && y.requestHeaders && (this.requestHeaders = y.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(y) {
      const E = this.createProviderRuntimeOptions();
      let w;
      typeof y == "string" ? w = new r.GenericProvider({ provider: "generic", url: y }, this, {
        ...E,
        isUseMultipleRangeRequest: (0, u.isUrlProbablySupportMultiRangeRequests)(y)
      }) : w = (0, u.createClient)(y, this, E), this.clientPromise = Promise.resolve(w);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let y = this.checkForUpdatesPromise;
      if (y != null)
        return this._logger.info("Checking for update (already in progress)"), y;
      const E = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), y = this.doCheckForUpdates().then((w) => (E(), w)).catch((w) => {
        throw E(), this.emit("error", w, `Cannot check for updates: ${(w.stack || w).toString()}`), w;
      }), this.checkForUpdatesPromise = y, y;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(y) {
      return this.checkForUpdates().then((E) => E != null && E.downloadPromise ? (E.downloadPromise.then(() => {
        const w = Jp.formatDownloadNotification(E.updateInfo.version, this.app.name, y);
        new Wt.Notification(w).show();
      }), E) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), E));
    }
    static formatDownloadNotification(y, E, w) {
      return w == null && (w = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), w = {
        title: w.title.replace("{appName}", E).replace("{version}", y),
        body: w.body.replace("{appName}", E).replace("{version}", y)
      }, w;
    }
    async isStagingMatch(y) {
      const E = y.stagingPercentage;
      let w = E;
      if (w == null)
        return !0;
      if (w = parseInt(w, 10), isNaN(w))
        return this._logger.warn(`Staging percentage is NaN: ${E}`), !0;
      w = w / 100;
      const _ = await this.stagingUserIdPromise.value, O = o.UUID.parse(_).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${w}, percentage: ${O}, user id: ${_}`), O < w;
    }
    computeFinalHeaders(y) {
      return this.requestHeaders != null && Object.assign(y, this.requestHeaders), y;
    }
    async isUpdateAvailable(y) {
      const E = (0, n.parse)(y.version);
      if (E == null)
        throw (0, o.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${y.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const w = this.currentVersion;
      if ((0, n.eq)(E, w) || !await Promise.resolve(this.isUpdateSupported(y)) || !await this.isStagingMatch(y))
        return !1;
      const D = (0, n.gt)(E, w), O = (0, n.lt)(E, w);
      return D ? !0 : this.allowDowngrade && O;
    }
    checkIfUpdateSupported(y) {
      const E = y == null ? void 0 : y.minimumSystemVersion, w = (0, v.release)();
      if (E)
        try {
          if ((0, n.lt)(w, E))
            return this._logger.info(`Current OS version ${w} is less than the minimum OS version required ${E} for version ${w}`), !1;
        } catch (_) {
          this._logger.warn(`Failed to compare current OS version(${w}) with minimum OS version(${E}): ${(_.message || _).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((w) => (0, u.createClient)(w, this, this.createProviderRuntimeOptions())));
      const y = await this.clientPromise, E = await this.stagingUserIdPromise.value;
      return y.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": E })), {
        info: await y.getLatestVersion(),
        provider: y
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const y = await this.getUpdateInfoAndProvider(), E = y.info;
      if (!await this.isUpdateAvailable(E))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${E.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", E), {
          isUpdateAvailable: !1,
          versionInfo: E,
          updateInfo: E
        };
      this.updateInfoAndProvider = y, this.onUpdateAvailable(E);
      const w = new o.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: E,
        updateInfo: E,
        cancellationToken: w,
        downloadPromise: this.autoDownload ? this.downloadUpdate(w) : null
      };
    }
    onUpdateAvailable(y) {
      this._logger.info(`Found version ${y.version} (url: ${(0, o.asArray)(y.files).map((E) => E.url).join(", ")})`), this.emit("update-available", y);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(y = new o.CancellationToken()) {
      const E = this.updateInfoAndProvider;
      if (E == null) {
        const _ = new Error("Please check update first");
        return this.dispatchError(_), Promise.reject(_);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, o.asArray)(E.info.files).map((_) => _.url).join(", ")}`);
      const w = (_) => {
        if (!(_ instanceof o.CancellationError))
          try {
            this.dispatchError(_);
          } catch (D) {
            this._logger.warn(`Cannot dispatch error event: ${D.stack || D}`);
          }
        return _;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: E,
        requestHeaders: this.computeRequestHeaders(E.provider),
        cancellationToken: y,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((_) => {
        throw w(_);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(y) {
      this.emit("error", y, (y.stack || y).toString());
    }
    dispatchUpdateDownloaded(y) {
      this.emit(x.UPDATE_DOWNLOADED, y);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, c.load)(await (0, d.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(y) {
      const E = y.fileExtraDownloadHeaders;
      if (E != null) {
        const w = this.requestHeaders;
        return w == null ? E : {
          ...E,
          ...w
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const y = a.join(this.app.userDataPath, ".updaterId");
      try {
        const w = await (0, d.readFile)(y, "utf-8");
        if (o.UUID.check(w))
          return w;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${w}`);
      } catch (w) {
        w.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${w}`);
      }
      const E = o.UUID.v5((0, m.randomBytes)(4096), o.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${E}`);
      try {
        await (0, d.outputFile)(y, E);
      } catch (w) {
        this._logger.warn(`Couldn't write out staging user ID: ${w}`);
      }
      return E;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const y = this.requestHeaders;
      if (y == null)
        return !0;
      for (const E of Object.keys(y)) {
        const w = E.toLowerCase();
        if (w === "authorization" || w === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let y = this.downloadedUpdateHelper;
      if (y == null) {
        const E = (await this.configOnDisk.value).updaterCacheDirName, w = this._logger;
        E == null && w.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const _ = a.join(this.app.baseCachePath, E || this.app.name);
        w.debug != null && w.debug(`updater cache dir: ${_}`), y = new e.DownloadedUpdateHelper(_), this.downloadedUpdateHelper = y;
      }
      return y;
    }
    async executeDownload(y) {
      const E = y.fileInfo, w = {
        headers: y.downloadUpdateOptions.requestHeaders,
        cancellationToken: y.downloadUpdateOptions.cancellationToken,
        sha2: E.info.sha2,
        sha512: E.info.sha512
      };
      this.listenerCount(x.DOWNLOAD_PROGRESS) > 0 && (w.onProgress = (ye) => this.emit(x.DOWNLOAD_PROGRESS, ye));
      const _ = y.downloadUpdateOptions.updateInfoAndProvider.info, D = _.version, O = E.packageInfo;
      function I() {
        const ye = decodeURIComponent(y.fileInfo.url.pathname);
        return ye.endsWith(`.${y.fileExtension}`) ? a.basename(ye) : y.fileInfo.info.url;
      }
      const q = await this.getOrCreateDownloadHelper(), R = q.cacheDirForPendingUpdate;
      await (0, d.mkdir)(R, { recursive: !0 });
      const N = I();
      let F = a.join(R, N);
      const U = O == null ? null : a.join(R, `package-${D}${a.extname(O.path) || ".7z"}`), z = async (ye) => (await q.setDownloadedFile(F, U, _, E, N, ye), await y.done({
        ..._,
        downloadedFile: F
      }), U == null ? [F] : [F, U]), W = this._logger, ie = await q.validateDownloadedPath(F, _, E, W);
      if (ie != null)
        return F = ie, await z(!1);
      const ae = async () => (await q.clear().catch(() => {
      }), await (0, d.unlink)(F).catch(() => {
      })), oe = await (0, e.createTempUpdateFile)(`temp-${N}`, R, W);
      try {
        await y.task(oe, w, U, ae), await (0, o.retry)(() => (0, d.rename)(oe, F), 60, 500, 0, 0, (ye) => ye instanceof Error && /^EBUSY:/.test(ye.message));
      } catch (ye) {
        throw await ae(), ye instanceof o.CancellationError && (W.info("cancelled"), this.emit("update-cancelled", _)), ye;
      }
      return W.info(`New version ${D} has been downloaded to ${F}`), await z(!0);
    }
    async differentialDownloadInstaller(y, E, w, _, D) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const O = (0, f.blockmapFiles)(y.url, this.app.version, E.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${O[0]}", new: ${O[1]})`);
        const I = async (N) => {
          const F = await this.httpExecutor.downloadToBuffer(N, {
            headers: E.requestHeaders,
            cancellationToken: E.cancellationToken
          });
          if (F == null || F.length === 0)
            throw new Error(`Blockmap "${N.href}" is empty`);
          try {
            return JSON.parse((0, s.gunzipSync)(F).toString());
          } catch (U) {
            throw new Error(`Cannot parse blockmap "${N.href}", error: ${U}`);
          }
        }, q = {
          newUrl: y.url,
          oldFile: a.join(this.downloadedUpdateHelper.cacheDir, D),
          logger: this._logger,
          newFile: w,
          isUseMultipleRangeRequest: _.isUseMultipleRangeRequest,
          requestHeaders: E.requestHeaders,
          cancellationToken: E.cancellationToken
        };
        this.listenerCount(x.DOWNLOAD_PROGRESS) > 0 && (q.onProgress = (N) => this.emit(x.DOWNLOAD_PROGRESS, N));
        const R = await Promise.all(O.map((N) => I(N)));
        return await new p.GenericDifferentialDownloader(y.info, this.httpExecutor, q).download(R[0], R[1]), !1;
      } catch (O) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${O.stack || O}`), this._testOnlyOptions != null)
          throw O;
        return !0;
      }
    }
  };
  Lt.AppUpdater = b;
  function C(T) {
    const y = (0, n.prerelease)(T);
    return y != null && y.length > 0;
  }
  class S {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(y) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(y) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(y) {
    }
  }
  return Lt.NoOpLogger = S, Lt;
}
var zl;
function pn() {
  if (zl) return mn;
  zl = 1, Object.defineProperty(mn, "__esModule", { value: !0 }), mn.BaseUpdater = void 0;
  const o = Bi, m = ja();
  let v = class extends m.AppUpdater {
    constructor(d, c) {
      super(d, c), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(d = !1, c = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(d, d ? c : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Wt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(d) {
      return super.executeDownload({
        ...d,
        done: (c) => (this.dispatchUpdateDownloaded(c), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(d = !1, c = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const t = this.downloadedUpdateHelper, a = this.installerPath, n = t == null ? null : t.downloadedFileInfo;
      if (a == null || n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${d}, isForceRunAfter: ${c}`), this.doInstall({
          isSilent: d,
          isForceRunAfter: c,
          isAdminRightsRequired: n.isAdminRightsRequired
        });
      } catch (e) {
        return this.dispatchError(e), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((d) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (d !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${d}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: d } = this.app, c = `"${d} would like to update"`, t = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), a = [t];
      return /kdesudo/i.test(t) ? (a.push("--comment", c), a.push("-c")) : /gksudo/i.test(t) ? a.push("--message", c) : /pkexec/i.test(t) && a.push("--disable-internal-agent"), a.join(" ");
    }
    spawnSyncLog(d, c = [], t = {}) {
      this._logger.info(`Executing: ${d} with args: ${c}`);
      const a = (0, o.spawnSync)(d, c, {
        env: { ...process.env, ...t },
        encoding: "utf-8",
        shell: !0
      }), { error: n, status: e, stdout: i, stderr: l } = a;
      if (n != null)
        throw this._logger.error(l), n;
      if (e != null && e !== 0)
        throw this._logger.error(l), new Error(`Command ${d} exited with code ${e}`);
      return i.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(d, c = [], t = void 0, a = "ignore") {
      return this._logger.info(`Executing: ${d} with args: ${c}`), new Promise((n, e) => {
        try {
          const i = { stdio: a, env: t, detached: !0 }, l = (0, o.spawn)(d, c, i);
          l.on("error", (r) => {
            e(r);
          }), l.unref(), l.pid !== void 0 && n(!0);
        } catch (i) {
          e(i);
        }
      });
    }
  };
  return mn.BaseUpdater = v, mn;
}
var On = {}, Pn = {}, Gl;
function Qp() {
  if (Gl) return Pn;
  Gl = 1, Object.defineProperty(Pn, "__esModule", { value: !0 }), Pn.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const o = /* @__PURE__ */ Rt(), m = Xp(), v = on;
  let h = class extends m.DifferentialDownloader {
    async download() {
      const a = this.blockAwareFileInfo, n = a.size, e = n - (a.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(e, n - 1);
      const i = d(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await c(this.options.oldFile), i);
    }
  };
  Pn.FileWithEmbeddedBlockMapDifferentialDownloader = h;
  function d(t) {
    return JSON.parse((0, v.inflateRawSync)(t).toString());
  }
  async function c(t) {
    const a = await (0, o.open)(t, "r");
    try {
      const n = (await (0, o.fstat)(a)).size, e = Buffer.allocUnsafe(4);
      await (0, o.read)(a, e, 0, e.length, n - e.length);
      const i = Buffer.allocUnsafe(e.readUInt32BE(0));
      return await (0, o.read)(a, i, 0, i.length, n - e.length - i.length), await (0, o.close)(a), d(i);
    } catch (n) {
      throw await (0, o.close)(a), n;
    }
  }
  return Pn;
}
var Wl;
function Vl() {
  if (Wl) return On;
  Wl = 1, Object.defineProperty(On, "__esModule", { value: !0 }), On.AppImageUpdater = void 0;
  const o = Me(), m = Bi, v = /* @__PURE__ */ Rt(), h = lt, d = De, c = pn(), t = Qp(), a = rt(), n = Xt();
  let e = class extends c.BaseUpdater {
    constructor(l, r) {
      super(l, r);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(l) {
      const r = l.updateInfoAndProvider.provider, u = (0, a.findFile)(r.resolveFiles(l.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: u,
        downloadUpdateOptions: l,
        task: async (s, f) => {
          const p = process.env.APPIMAGE;
          if (p == null)
            throw (0, o.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (l.disableDifferentialDownload || await this.downloadDifferential(u, p, s, r, l)) && await this.httpExecutor.download(u.url, s, f), await (0, v.chmod)(s, 493);
        }
      });
    }
    async downloadDifferential(l, r, u, s, f) {
      try {
        const p = {
          newUrl: l.url,
          oldFile: r,
          logger: this._logger,
          newFile: u,
          isUseMultipleRangeRequest: s.isUseMultipleRangeRequest,
          requestHeaders: f.requestHeaders,
          cancellationToken: f.cancellationToken
        };
        return this.listenerCount(n.DOWNLOAD_PROGRESS) > 0 && (p.onProgress = (x) => this.emit(n.DOWNLOAD_PROGRESS, x)), await new t.FileWithEmbeddedBlockMapDifferentialDownloader(l.info, this.httpExecutor, p).download(), !1;
      } catch (p) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${p.stack || p}`), process.platform === "linux";
      }
    }
    doInstall(l) {
      const r = process.env.APPIMAGE;
      if (r == null)
        throw (0, o.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, h.unlinkSync)(r);
      let u;
      const s = d.basename(r), f = this.installerPath;
      if (f == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      d.basename(f) === s || !/\d+\.\d+\.\d+/.test(s) ? u = r : u = d.join(d.dirname(r), d.basename(f)), (0, m.execFileSync)("mv", ["-f", f, u]), u !== r && this.emit("appimage-filename-updated", u);
      const p = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return l.isForceRunAfter ? this.spawnLog(u, [], p) : (p.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, m.execFileSync)(u, [], { env: p })), !0;
    }
  };
  return On.AppImageUpdater = e, On;
}
var Nn = {}, Yl;
function Kl() {
  if (Yl) return Nn;
  Yl = 1, Object.defineProperty(Nn, "__esModule", { value: !0 }), Nn.DebUpdater = void 0;
  const o = pn(), m = rt(), v = Xt();
  let h = class extends o.BaseUpdater {
    constructor(c, t) {
      super(c, t);
    }
    /*** @private */
    doDownloadUpdate(c) {
      const t = c.updateInfoAndProvider.provider, a = (0, m.findFile)(t.resolveFiles(c.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: a,
        downloadUpdateOptions: c,
        task: async (n, e) => {
          this.listenerCount(v.DOWNLOAD_PROGRESS) > 0 && (e.onProgress = (i) => this.emit(v.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(a.url, n, e);
        }
      });
    }
    get installerPath() {
      var c, t;
      return (t = (c = super.installerPath) === null || c === void 0 ? void 0 : c.replace(/ /g, "\\ ")) !== null && t !== void 0 ? t : null;
    }
    doInstall(c) {
      const t = this.wrapSudo(), a = /pkexec/i.test(t) ? "" : '"', n = this.installerPath;
      if (n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const e = ["dpkg", "-i", n, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(t, [`${a}/bin/bash`, "-c", `'${e.join(" ")}'${a}`]), c.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return Nn.DebUpdater = h, Nn;
}
var Dn = {}, Xl;
function Jl() {
  if (Xl) return Dn;
  Xl = 1, Object.defineProperty(Dn, "__esModule", { value: !0 }), Dn.PacmanUpdater = void 0;
  const o = pn(), m = Xt(), v = rt();
  let h = class extends o.BaseUpdater {
    constructor(c, t) {
      super(c, t);
    }
    /*** @private */
    doDownloadUpdate(c) {
      const t = c.updateInfoAndProvider.provider, a = (0, v.findFile)(t.resolveFiles(c.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: a,
        downloadUpdateOptions: c,
        task: async (n, e) => {
          this.listenerCount(m.DOWNLOAD_PROGRESS) > 0 && (e.onProgress = (i) => this.emit(m.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(a.url, n, e);
        }
      });
    }
    get installerPath() {
      var c, t;
      return (t = (c = super.installerPath) === null || c === void 0 ? void 0 : c.replace(/ /g, "\\ ")) !== null && t !== void 0 ? t : null;
    }
    doInstall(c) {
      const t = this.wrapSudo(), a = /pkexec/i.test(t) ? "" : '"', n = this.installerPath;
      if (n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const e = ["pacman", "-U", "--noconfirm", n];
      return this.spawnSyncLog(t, [`${a}/bin/bash`, "-c", `'${e.join(" ")}'${a}`]), c.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return Dn.PacmanUpdater = h, Dn;
}
var In = {}, Ql;
function Zl() {
  if (Ql) return In;
  Ql = 1, Object.defineProperty(In, "__esModule", { value: !0 }), In.RpmUpdater = void 0;
  const o = pn(), m = Xt(), v = rt();
  let h = class extends o.BaseUpdater {
    constructor(c, t) {
      super(c, t);
    }
    /*** @private */
    doDownloadUpdate(c) {
      const t = c.updateInfoAndProvider.provider, a = (0, v.findFile)(t.resolveFiles(c.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: a,
        downloadUpdateOptions: c,
        task: async (n, e) => {
          this.listenerCount(m.DOWNLOAD_PROGRESS) > 0 && (e.onProgress = (i) => this.emit(m.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(a.url, n, e);
        }
      });
    }
    get installerPath() {
      var c, t;
      return (t = (c = super.installerPath) === null || c === void 0 ? void 0 : c.replace(/ /g, "\\ ")) !== null && t !== void 0 ? t : null;
    }
    doInstall(c) {
      const t = this.wrapSudo(), a = /pkexec/i.test(t) ? "" : '"', n = this.spawnSyncLog("which zypper"), e = this.installerPath;
      if (e == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      let i;
      return n ? i = [n, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", e] : i = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", e], this.spawnSyncLog(t, [`${a}/bin/bash`, "-c", `'${i.join(" ")}'${a}`]), c.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return In.RpmUpdater = h, In;
}
var Ln = {}, eu;
function tu() {
  if (eu) return Ln;
  eu = 1, Object.defineProperty(Ln, "__esModule", { value: !0 }), Ln.MacUpdater = void 0;
  const o = Me(), m = /* @__PURE__ */ Rt(), v = lt, h = De, d = ii, c = ja(), t = rt(), a = Bi, n = ht;
  let e = class extends c.AppUpdater {
    constructor(l, r) {
      super(l, r), this.nativeUpdater = Wt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (u) => {
        this._logger.warn(u), this.emit("error", u);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(l) {
      this._logger.debug != null && this._logger.debug(l);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((l) => {
        l && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(l) {
      let r = l.updateInfoAndProvider.provider.resolveFiles(l.updateInfoAndProvider.info);
      const u = this._logger, s = "sysctl.proc_translated";
      let f = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), f = (0, a.execFileSync)("sysctl", [s], { encoding: "utf8" }).includes(`${s}: 1`), u.info(`Checked for macOS Rosetta environment (isRosetta=${f})`);
      } catch (T) {
        u.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${T}`);
      }
      let p = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const y = (0, a.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        u.info(`Checked 'uname -a': arm64=${y}`), p = p || y;
      } catch (T) {
        u.warn(`uname shell command to check for arm64 failed: ${T}`);
      }
      p = p || process.arch === "arm64" || f;
      const x = (T) => {
        var y;
        return T.url.pathname.includes("arm64") || ((y = T.info.url) === null || y === void 0 ? void 0 : y.includes("arm64"));
      };
      p && r.some(x) ? r = r.filter((T) => p === x(T)) : r = r.filter((T) => !x(T));
      const b = (0, t.findFile)(r, "zip", ["pkg", "dmg"]);
      if (b == null)
        throw (0, o.newError)(`ZIP file not provided: ${(0, o.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const C = l.updateInfoAndProvider.provider, S = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: b,
        downloadUpdateOptions: l,
        task: async (T, y) => {
          const E = h.join(this.downloadedUpdateHelper.cacheDir, S), w = () => (0, m.pathExistsSync)(E) ? !l.disableDifferentialDownload : (u.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let _ = !0;
          w() && (_ = await this.differentialDownloadInstaller(b, l, T, C, S)), _ && await this.httpExecutor.download(b.url, T, y);
        },
        done: async (T) => {
          if (!l.disableDifferentialDownload)
            try {
              const y = h.join(this.downloadedUpdateHelper.cacheDir, S);
              await (0, m.copyFile)(T.downloadedFile, y);
            } catch (y) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${y.message}`);
            }
          return this.updateDownloaded(b, T);
        }
      });
    }
    async updateDownloaded(l, r) {
      var u;
      const s = r.downloadedFile, f = (u = l.info.size) !== null && u !== void 0 ? u : (await (0, m.stat)(s)).size, p = this._logger, x = `fileToProxy=${l.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${x})`), this.server = (0, d.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${x})`), this.server.on("close", () => {
        p.info(`Proxy server for native Squirrel.Mac is closed (${x})`);
      });
      const b = (C) => {
        const S = C.address();
        return typeof S == "string" ? S : `http://127.0.0.1:${S == null ? void 0 : S.port}`;
      };
      return await new Promise((C, S) => {
        const T = (0, n.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), y = Buffer.from(`autoupdater:${T}`, "ascii"), E = `/${(0, n.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (w, _) => {
          const D = w.url;
          if (p.info(`${D} requested`), D === "/") {
            if (!w.headers.authorization || w.headers.authorization.indexOf("Basic ") === -1) {
              _.statusCode = 401, _.statusMessage = "Invalid Authentication Credentials", _.end(), p.warn("No authenthication info");
              return;
            }
            const q = w.headers.authorization.split(" ")[1], R = Buffer.from(q, "base64").toString("ascii"), [N, F] = R.split(":");
            if (N !== "autoupdater" || F !== T) {
              _.statusCode = 401, _.statusMessage = "Invalid Authentication Credentials", _.end(), p.warn("Invalid authenthication credentials");
              return;
            }
            const U = Buffer.from(`{ "url": "${b(this.server)}${E}" }`);
            _.writeHead(200, { "Content-Type": "application/json", "Content-Length": U.length }), _.end(U);
            return;
          }
          if (!D.startsWith(E)) {
            p.warn(`${D} requested, but not supported`), _.writeHead(404), _.end();
            return;
          }
          p.info(`${E} requested by Squirrel.Mac, pipe ${s}`);
          let O = !1;
          _.on("finish", () => {
            O || (this.nativeUpdater.removeListener("error", S), C([]));
          });
          const I = (0, v.createReadStream)(s);
          I.on("error", (q) => {
            try {
              _.end();
            } catch (R) {
              p.warn(`cannot end response: ${R}`);
            }
            O = !0, this.nativeUpdater.removeListener("error", S), S(new Error(`Cannot pipe "${s}": ${q}`));
          }), _.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": f
          }), I.pipe(_);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${x})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${b(this.server)}, ${x})`), this.nativeUpdater.setFeedURL({
            url: b(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${y.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", S), this.nativeUpdater.checkForUpdates()) : C([]);
        });
      });
    }
    handleUpdateDownloaded() {
      this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return Ln.MacUpdater = e, Ln;
}
var Fn = {}, Ci = {}, nu;
function tm() {
  if (nu) return Ci;
  nu = 1, Object.defineProperty(Ci, "__esModule", { value: !0 }), Ci.verifySignature = d;
  const o = Me(), m = Bi, v = ni, h = De;
  function d(n, e, i) {
    return new Promise((l, r) => {
      const u = e.replace(/'/g, "''");
      i.info(`Verifying signature ${u}`), (0, m.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${u}' | ConvertTo-Json -Compress"`], {
        shell: !0,
        timeout: 20 * 1e3
      }, (s, f, p) => {
        var x;
        try {
          if (s != null || p) {
            t(i, s, p, r), l(null);
            return;
          }
          const b = c(f);
          if (b.Status === 0) {
            try {
              const y = h.normalize(b.Path), E = h.normalize(e);
              if (i.info(`LiteralPath: ${y}. Update Path: ${E}`), y !== E) {
                t(i, new Error(`LiteralPath of ${y} is different than ${E}`), p, r), l(null);
                return;
              }
            } catch (y) {
              i.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(x = y.message) !== null && x !== void 0 ? x : y.stack}`);
            }
            const S = (0, o.parseDn)(b.SignerCertificate.Subject);
            let T = !1;
            for (const y of n) {
              const E = (0, o.parseDn)(y);
              if (E.size ? T = Array.from(E.keys()).every((_) => E.get(_) === S.get(_)) : y === S.get("CN") && (i.warn(`Signature validated using only CN ${y}. Please add your full Distinguished Name (DN) to publisherNames configuration`), T = !0), T) {
                l(null);
                return;
              }
            }
          }
          const C = `publisherNames: ${n.join(" | ")}, raw info: ` + JSON.stringify(b, (S, T) => S === "RawData" ? void 0 : T, 2);
          i.warn(`Sign verification failed, installer signed with incorrect certificate: ${C}`), l(C);
        } catch (b) {
          t(i, b, null, r), l(null);
          return;
        }
      });
    });
  }
  function c(n) {
    const e = JSON.parse(n);
    delete e.PrivateKey, delete e.IsOSBinary, delete e.SignatureType;
    const i = e.SignerCertificate;
    return i != null && (delete i.Archived, delete i.Extensions, delete i.Handle, delete i.HasPrivateKey, delete i.SubjectName), e;
  }
  function t(n, e, i, l) {
    if (a()) {
      n.warn(`Cannot execute Get-AuthenticodeSignature: ${e || i}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, m.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
    } catch (r) {
      n.warn(`Cannot execute ConvertTo-Json: ${r.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    e != null && l(e), i && l(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${i}. Failing signature validation due to unknown stderr.`));
  }
  function a() {
    const n = v.release();
    return n.startsWith("6.") && !n.startsWith("6.3");
  }
  return Ci;
}
var iu;
function ru() {
  if (iu) return Fn;
  iu = 1, Object.defineProperty(Fn, "__esModule", { value: !0 }), Fn.NsisUpdater = void 0;
  const o = Me(), m = De, v = pn(), h = Qp(), d = Xt(), c = rt(), t = /* @__PURE__ */ Rt(), a = tm(), n = Vt;
  let e = class extends v.BaseUpdater {
    constructor(l, r) {
      super(l, r), this._verifyUpdateCodeSignature = (u, s) => (0, a.verifySignature)(u, s, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(l) {
      l && (this._verifyUpdateCodeSignature = l);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const r = l.updateInfoAndProvider.provider, u = (0, c.findFile)(r.resolveFiles(l.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: l,
        fileInfo: u,
        task: async (s, f, p, x) => {
          const b = u.packageInfo, C = b != null && p != null;
          if (C && l.disableWebInstaller)
            throw (0, o.newError)(`Unable to download new version ${l.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !C && !l.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (C || l.disableDifferentialDownload || await this.differentialDownloadInstaller(u, l, s, r, o.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(u.url, s, f);
          const S = await this.verifySignature(s);
          if (S != null)
            throw await x(), (0, o.newError)(`New version ${l.updateInfoAndProvider.info.version} is not signed by the application owner: ${S}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (C && await this.differentialDownloadWebPackage(l, b, p, r))
            try {
              await this.httpExecutor.download(new n.URL(b.path), p, {
                headers: l.requestHeaders,
                cancellationToken: l.cancellationToken,
                sha512: b.sha512
              });
            } catch (T) {
              try {
                await (0, t.unlink)(p);
              } catch {
              }
              throw T;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(l) {
      let r;
      try {
        if (r = (await this.configOnDisk.value).publisherName, r == null)
          return null;
      } catch (u) {
        if (u.code === "ENOENT")
          return null;
        throw u;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], l);
    }
    doInstall(l) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const u = ["--updated"];
      l.isSilent && u.push("/S"), l.isForceRunAfter && u.push("--force-run"), this.installDirectory && u.push(`/D=${this.installDirectory}`);
      const s = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      s != null && u.push(`--package-file=${s}`);
      const f = () => {
        this.spawnLog(m.join(process.resourcesPath, "elevate.exe"), [r].concat(u)).catch((p) => this.dispatchError(p));
      };
      return l.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), f(), !0) : (this.spawnLog(r, u).catch((p) => {
        const x = p.code;
        this._logger.info(`Cannot run installer: error code: ${x}, error message: "${p.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), x === "UNKNOWN" || x === "EACCES" ? f() : x === "ENOENT" ? Wt.shell.openPath(r).catch((b) => this.dispatchError(b)) : this.dispatchError(p);
      }), !0);
    }
    async differentialDownloadWebPackage(l, r, u, s) {
      if (r.blockMapSize == null)
        return !0;
      try {
        const f = {
          newUrl: new n.URL(r.path),
          oldFile: m.join(this.downloadedUpdateHelper.cacheDir, o.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: u,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: s.isUseMultipleRangeRequest,
          cancellationToken: l.cancellationToken
        };
        this.listenerCount(d.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (p) => this.emit(d.DOWNLOAD_PROGRESS, p)), await new h.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, f).download();
      } catch (f) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${f.stack || f}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return Fn.NsisUpdater = e, Fn;
}
var su;
function nm() {
  return su || (su = 1, (function(o) {
    var m = It && It.__createBinding || (Object.create ? (function(p, x, b, C) {
      C === void 0 && (C = b);
      var S = Object.getOwnPropertyDescriptor(x, b);
      (!S || ("get" in S ? !x.__esModule : S.writable || S.configurable)) && (S = { enumerable: !0, get: function() {
        return x[b];
      } }), Object.defineProperty(p, C, S);
    }) : (function(p, x, b, C) {
      C === void 0 && (C = b), p[C] = x[b];
    })), v = It && It.__exportStar || function(p, x) {
      for (var b in p) b !== "default" && !Object.prototype.hasOwnProperty.call(x, b) && m(x, p, b);
    };
    Object.defineProperty(o, "__esModule", { value: !0 }), o.NsisUpdater = o.MacUpdater = o.RpmUpdater = o.PacmanUpdater = o.DebUpdater = o.AppImageUpdater = o.Provider = o.NoOpLogger = o.AppUpdater = o.BaseUpdater = void 0;
    const h = /* @__PURE__ */ Rt(), d = De;
    var c = pn();
    Object.defineProperty(o, "BaseUpdater", { enumerable: !0, get: function() {
      return c.BaseUpdater;
    } });
    var t = ja();
    Object.defineProperty(o, "AppUpdater", { enumerable: !0, get: function() {
      return t.AppUpdater;
    } }), Object.defineProperty(o, "NoOpLogger", { enumerable: !0, get: function() {
      return t.NoOpLogger;
    } });
    var a = rt();
    Object.defineProperty(o, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var n = Vl();
    Object.defineProperty(o, "AppImageUpdater", { enumerable: !0, get: function() {
      return n.AppImageUpdater;
    } });
    var e = Kl();
    Object.defineProperty(o, "DebUpdater", { enumerable: !0, get: function() {
      return e.DebUpdater;
    } });
    var i = Jl();
    Object.defineProperty(o, "PacmanUpdater", { enumerable: !0, get: function() {
      return i.PacmanUpdater;
    } });
    var l = Zl();
    Object.defineProperty(o, "RpmUpdater", { enumerable: !0, get: function() {
      return l.RpmUpdater;
    } });
    var r = tu();
    Object.defineProperty(o, "MacUpdater", { enumerable: !0, get: function() {
      return r.MacUpdater;
    } });
    var u = ru();
    Object.defineProperty(o, "NsisUpdater", { enumerable: !0, get: function() {
      return u.NsisUpdater;
    } }), v(Xt(), o);
    let s;
    function f() {
      if (process.platform === "win32")
        s = new (ru()).NsisUpdater();
      else if (process.platform === "darwin")
        s = new (tu()).MacUpdater();
      else {
        s = new (Vl()).AppImageUpdater();
        try {
          const p = d.join(process.resourcesPath, "package-type");
          if (!(0, h.existsSync)(p))
            return s;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const x = (0, h.readFileSync)(p).toString().trim();
          switch (console.info("Found package-type:", x), x) {
            case "deb":
              s = new (Kl()).DebUpdater();
              break;
            case "rpm":
              s = new (Zl()).RpmUpdater();
              break;
            case "pacman":
              s = new (Jl()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (p) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", p.message);
        }
      }
      return s;
    }
    Object.defineProperty(o, "autoUpdater", {
      enumerable: !0,
      get: () => s || f()
    });
  })(It)), It;
}
var Ze = nm();
Ze.autoUpdater.autoDownload = !1;
Ze.autoUpdater.autoInstallOnAppQuit = !0;
function im(o) {
  const m = (v, h) => {
    o.webContents.send("update-status", { status: v, ...h });
  };
  Ze.autoUpdater.on("checking-for-update", () => {
    console.log("[Updater] Checking for updates..."), m("checking");
  }), Ze.autoUpdater.on("update-available", (v) => {
    console.log("[Updater] Update available:", v.version), m("available", {
      version: v.version,
      releaseDate: v.releaseDate,
      releaseNotes: v.releaseNotes
    });
  }), Ze.autoUpdater.on("update-not-available", () => {
    console.log("[Updater] No updates available"), m("not-available");
  }), Ze.autoUpdater.on("download-progress", (v) => {
    console.log(`[Updater] Download progress: ${Math.round(v.percent)}%`), m("downloading", {
      percent: Math.round(v.percent),
      transferred: v.transferred,
      total: v.total
    });
  }), Ze.autoUpdater.on("update-downloaded", (v) => {
    console.log("[Updater] Update downloaded:", v.version), m("downloaded", { version: v.version });
  }), Ze.autoUpdater.on("error", (v) => {
    console.error("[Updater] Error:", v.message), m("error", { message: v.message });
  }), We.handle("check-for-updates", async () => {
    try {
      return await Ze.autoUpdater.checkForUpdates();
    } catch (v) {
      return console.error("[Updater] Check error:", v.message), null;
    }
  }), We.handle("download-update", async () => {
    try {
      return await Ze.autoUpdater.downloadUpdate(), !0;
    } catch (v) {
      return console.error("[Updater] Download error:", v.message), !1;
    }
  }), We.handle("install-update", () => {
    Ze.autoUpdater.quitAndInstall(!1, !0);
  }), We.handle("get-app-version", () => Ze.autoUpdater.currentVersion.version), setTimeout(() => {
    console.log("[Updater] Initial update check..."), Ze.autoUpdater.checkForUpdates().catch((v) => {
      console.error("[Updater] Initial check failed:", v.message);
    });
  }, 5e3);
}
var ti = { exports: {} }, Ri = { exports: {} }, Ai = { exports: {} }, au;
function rm() {
  if (au) return Ai.exports;
  au = 1, Ai.exports = c, Ai.exports.preferredCharsets = c;
  var o = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
  function m(e) {
    for (var i = e.split(","), l = 0, r = 0; l < i.length; l++) {
      var u = v(i[l].trim(), l);
      u && (i[r++] = u);
    }
    return i.length = r, i;
  }
  function v(e, i) {
    var l = o.exec(e);
    if (!l) return null;
    var r = l[1], u = 1;
    if (l[2])
      for (var s = l[2].split(";"), f = 0; f < s.length; f++) {
        var p = s[f].trim().split("=");
        if (p[0] === "q") {
          u = parseFloat(p[1]);
          break;
        }
      }
    return {
      charset: r,
      q: u,
      i
    };
  }
  function h(e, i, l) {
    for (var r = { o: -1, q: 0, s: 0 }, u = 0; u < i.length; u++) {
      var s = d(e, i[u], l);
      s && (r.s - s.s || r.q - s.q || r.o - s.o) < 0 && (r = s);
    }
    return r;
  }
  function d(e, i, l) {
    var r = 0;
    if (i.charset.toLowerCase() === e.toLowerCase())
      r |= 1;
    else if (i.charset !== "*")
      return null;
    return {
      i: l,
      o: i.i,
      q: i.q,
      s: r
    };
  }
  function c(e, i) {
    var l = m(e === void 0 ? "*" : e || "");
    if (!i)
      return l.filter(n).sort(t).map(a);
    var r = i.map(function(s, f) {
      return h(s, l, f);
    });
    return r.filter(n).sort(t).map(function(s) {
      return i[r.indexOf(s)];
    });
  }
  function t(e, i) {
    return i.q - e.q || i.s - e.s || e.o - i.o || e.i - i.i || 0;
  }
  function a(e) {
    return e.charset;
  }
  function n(e) {
    return e.q > 0;
  }
  return Ai.exports;
}
var ki = { exports: {} }, ou;
function sm() {
  if (ou) return ki.exports;
  ou = 1, ki.exports = c, ki.exports.preferredEncodings = c;
  var o = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
  function m(e) {
    for (var i = e.split(","), l = !1, r = 1, u = 0, s = 0; u < i.length; u++) {
      var f = v(i[u].trim(), u);
      f && (i[s++] = f, l = l || d("identity", f), r = Math.min(r, f.q || 1));
    }
    return l || (i[s++] = {
      encoding: "identity",
      q: r,
      i: u
    }), i.length = s, i;
  }
  function v(e, i) {
    var l = o.exec(e);
    if (!l) return null;
    var r = l[1], u = 1;
    if (l[2])
      for (var s = l[2].split(";"), f = 0; f < s.length; f++) {
        var p = s[f].trim().split("=");
        if (p[0] === "q") {
          u = parseFloat(p[1]);
          break;
        }
      }
    return {
      encoding: r,
      q: u,
      i
    };
  }
  function h(e, i, l) {
    for (var r = { o: -1, q: 0, s: 0 }, u = 0; u < i.length; u++) {
      var s = d(e, i[u], l);
      s && (r.s - s.s || r.q - s.q || r.o - s.o) < 0 && (r = s);
    }
    return r;
  }
  function d(e, i, l) {
    var r = 0;
    if (i.encoding.toLowerCase() === e.toLowerCase())
      r |= 1;
    else if (i.encoding !== "*")
      return null;
    return {
      i: l,
      o: i.i,
      q: i.q,
      s: r
    };
  }
  function c(e, i) {
    var l = m(e || "");
    if (!i)
      return l.filter(n).sort(t).map(a);
    var r = i.map(function(s, f) {
      return h(s, l, f);
    });
    return r.filter(n).sort(t).map(function(s) {
      return i[r.indexOf(s)];
    });
  }
  function t(e, i) {
    return i.q - e.q || i.s - e.s || e.o - i.o || e.i - i.i || 0;
  }
  function a(e) {
    return e.encoding;
  }
  function n(e) {
    return e.q > 0;
  }
  return ki.exports;
}
var Oi = { exports: {} }, cu;
function am() {
  if (cu) return Oi.exports;
  cu = 1, Oi.exports = c, Oi.exports.preferredLanguages = c;
  var o = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
  function m(e) {
    for (var i = e.split(","), l = 0, r = 0; l < i.length; l++) {
      var u = v(i[l].trim(), l);
      u && (i[r++] = u);
    }
    return i.length = r, i;
  }
  function v(e, i) {
    var l = o.exec(e);
    if (!l) return null;
    var r = l[1], u = l[2], s = r;
    u && (s += "-" + u);
    var f = 1;
    if (l[3])
      for (var p = l[3].split(";"), x = 0; x < p.length; x++) {
        var b = p[x].split("=");
        b[0] === "q" && (f = parseFloat(b[1]));
      }
    return {
      prefix: r,
      suffix: u,
      q: f,
      i,
      full: s
    };
  }
  function h(e, i, l) {
    for (var r = { o: -1, q: 0, s: 0 }, u = 0; u < i.length; u++) {
      var s = d(e, i[u], l);
      s && (r.s - s.s || r.q - s.q || r.o - s.o) < 0 && (r = s);
    }
    return r;
  }
  function d(e, i, l) {
    var r = v(e);
    if (!r) return null;
    var u = 0;
    if (i.full.toLowerCase() === r.full.toLowerCase())
      u |= 4;
    else if (i.prefix.toLowerCase() === r.full.toLowerCase())
      u |= 2;
    else if (i.full.toLowerCase() === r.prefix.toLowerCase())
      u |= 1;
    else if (i.full !== "*")
      return null;
    return {
      i: l,
      o: i.i,
      q: i.q,
      s: u
    };
  }
  function c(e, i) {
    var l = m(e === void 0 ? "*" : e || "");
    if (!i)
      return l.filter(n).sort(t).map(a);
    var r = i.map(function(s, f) {
      return h(s, l, f);
    });
    return r.filter(n).sort(t).map(function(s) {
      return i[r.indexOf(s)];
    });
  }
  function t(e, i) {
    return i.q - e.q || i.s - e.s || e.o - i.o || e.i - i.i || 0;
  }
  function a(e) {
    return e.full;
  }
  function n(e) {
    return e.q > 0;
  }
  return Oi.exports;
}
var Pi = { exports: {} }, lu;
function om() {
  if (lu) return Pi.exports;
  lu = 1, Pi.exports = c, Pi.exports.preferredMediaTypes = c;
  var o = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
  function m(u) {
    for (var s = l(u), f = 0, p = 0; f < s.length; f++) {
      var x = v(s[f].trim(), f);
      x && (s[p++] = x);
    }
    return s.length = p, s;
  }
  function v(u, s) {
    var f = o.exec(u);
    if (!f) return null;
    var p = /* @__PURE__ */ Object.create(null), x = 1, b = f[2], C = f[1];
    if (f[3])
      for (var S = r(f[3]).map(i), T = 0; T < S.length; T++) {
        var y = S[T], E = y[0].toLowerCase(), w = y[1], _ = w && w[0] === '"' && w[w.length - 1] === '"' ? w.substr(1, w.length - 2) : w;
        if (E === "q") {
          x = parseFloat(_);
          break;
        }
        p[E] = _;
      }
    return {
      type: C,
      subtype: b,
      params: p,
      q: x,
      i: s
    };
  }
  function h(u, s, f) {
    for (var p = { o: -1, q: 0, s: 0 }, x = 0; x < s.length; x++) {
      var b = d(u, s[x], f);
      b && (p.s - b.s || p.q - b.q || p.o - b.o) < 0 && (p = b);
    }
    return p;
  }
  function d(u, s, f) {
    var p = v(u), x = 0;
    if (!p)
      return null;
    if (s.type.toLowerCase() == p.type.toLowerCase())
      x |= 4;
    else if (s.type != "*")
      return null;
    if (s.subtype.toLowerCase() == p.subtype.toLowerCase())
      x |= 2;
    else if (s.subtype != "*")
      return null;
    var b = Object.keys(s.params);
    if (b.length > 0)
      if (b.every(function(C) {
        return s.params[C] == "*" || (s.params[C] || "").toLowerCase() == (p.params[C] || "").toLowerCase();
      }))
        x |= 1;
      else
        return null;
    return {
      i: f,
      o: s.i,
      q: s.q,
      s: x
    };
  }
  function c(u, s) {
    var f = m(u === void 0 ? "*/*" : u || "");
    if (!s)
      return f.filter(n).sort(t).map(a);
    var p = s.map(function(b, C) {
      return h(b, f, C);
    });
    return p.filter(n).sort(t).map(function(b) {
      return s[p.indexOf(b)];
    });
  }
  function t(u, s) {
    return s.q - u.q || s.s - u.s || u.o - s.o || u.i - s.i || 0;
  }
  function a(u) {
    return u.type + "/" + u.subtype;
  }
  function n(u) {
    return u.q > 0;
  }
  function e(u) {
    for (var s = 0, f = 0; (f = u.indexOf('"', f)) !== -1; )
      s++, f++;
    return s;
  }
  function i(u) {
    var s = u.indexOf("="), f, p;
    return s === -1 ? f = u : (f = u.substr(0, s), p = u.substr(s + 1)), [f, p];
  }
  function l(u) {
    for (var s = u.split(","), f = 1, p = 0; f < s.length; f++)
      e(s[p]) % 2 == 0 ? s[++p] = s[f] : s[p] += "," + s[f];
    return s.length = p + 1, s;
  }
  function r(u) {
    for (var s = u.split(";"), f = 1, p = 0; f < s.length; f++)
      e(s[p]) % 2 == 0 ? s[++p] = s[f] : s[p] += ";" + s[f];
    s.length = p + 1;
    for (var f = 0; f < s.length; f++)
      s[f] = s[f].trim();
    return s;
  }
  return Pi.exports;
}
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var uu;
function cm() {
  if (uu) return Ri.exports;
  uu = 1;
  var o = rm(), m = sm(), v = am(), h = om();
  Ri.exports = d, Ri.exports.Negotiator = d;
  function d(c) {
    if (!(this instanceof d))
      return new d(c);
    this.request = c;
  }
  return d.prototype.charset = function(t) {
    var a = this.charsets(t);
    return a && a[0];
  }, d.prototype.charsets = function(t) {
    return o(this.request.headers["accept-charset"], t);
  }, d.prototype.encoding = function(t) {
    var a = this.encodings(t);
    return a && a[0];
  }, d.prototype.encodings = function(t) {
    return m(this.request.headers["accept-encoding"], t);
  }, d.prototype.language = function(t) {
    var a = this.languages(t);
    return a && a[0];
  }, d.prototype.languages = function(t) {
    return v(this.request.headers["accept-language"], t);
  }, d.prototype.mediaType = function(t) {
    var a = this.mediaTypes(t);
    return a && a[0];
  }, d.prototype.mediaTypes = function(t) {
    return h(this.request.headers.accept, t);
  }, d.prototype.preferredCharset = d.prototype.charset, d.prototype.preferredCharsets = d.prototype.charsets, d.prototype.preferredEncoding = d.prototype.encoding, d.prototype.preferredEncodings = d.prototype.encodings, d.prototype.preferredLanguage = d.prototype.language, d.prototype.preferredLanguages = d.prototype.languages, d.prototype.preferredMediaType = d.prototype.mediaType, d.prototype.preferredMediaTypes = d.prototype.mediaTypes, Ri.exports;
}
var Zs = {};
const lm = {
  "application/1d-interleaved-parityfec": { source: "iana" },
  "application/3gpdash-qoe-report+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/3gpp-ims+xml": { source: "iana", compressible: !0 },
  "application/3gpphal+json": { source: "iana", compressible: !0 },
  "application/3gpphalforms+json": { source: "iana", compressible: !0 },
  "application/a2l": { source: "iana" },
  "application/ace+cbor": { source: "iana" },
  "application/activemessage": { source: "iana" },
  "application/activity+json": { source: "iana", compressible: !0 },
  "application/alto-costmap+json": { source: "iana", compressible: !0 },
  "application/alto-costmapfilter+json": { source: "iana", compressible: !0 },
  "application/alto-directory+json": { source: "iana", compressible: !0 },
  "application/alto-endpointcost+json": { source: "iana", compressible: !0 },
  "application/alto-endpointcostparams+json": { source: "iana", compressible: !0 },
  "application/alto-endpointprop+json": { source: "iana", compressible: !0 },
  "application/alto-endpointpropparams+json": { source: "iana", compressible: !0 },
  "application/alto-error+json": { source: "iana", compressible: !0 },
  "application/alto-networkmap+json": { source: "iana", compressible: !0 },
  "application/alto-networkmapfilter+json": { source: "iana", compressible: !0 },
  "application/alto-updatestreamcontrol+json": { source: "iana", compressible: !0 },
  "application/alto-updatestreamparams+json": { source: "iana", compressible: !0 },
  "application/aml": { source: "iana" },
  "application/andrew-inset": { source: "iana", extensions: ["ez"] },
  "application/applefile": { source: "iana" },
  "application/applixware": { source: "apache", extensions: ["aw"] },
  "application/at+jwt": { source: "iana" },
  "application/atf": { source: "iana" },
  "application/atfx": { source: "iana" },
  "application/atom+xml": { source: "iana", compressible: !0, extensions: ["atom"] },
  "application/atomcat+xml": { source: "iana", compressible: !0, extensions: ["atomcat"] },
  "application/atomdeleted+xml": { source: "iana", compressible: !0, extensions: ["atomdeleted"] },
  "application/atomicmail": { source: "iana" },
  "application/atomsvc+xml": { source: "iana", compressible: !0, extensions: ["atomsvc"] },
  "application/atsc-dwd+xml": { source: "iana", compressible: !0, extensions: ["dwd"] },
  "application/atsc-dynamic-event-message": { source: "iana" },
  "application/atsc-held+xml": { source: "iana", compressible: !0, extensions: ["held"] },
  "application/atsc-rdt+json": { source: "iana", compressible: !0 },
  "application/atsc-rsat+xml": { source: "iana", compressible: !0, extensions: ["rsat"] },
  "application/atxml": { source: "iana" },
  "application/auth-policy+xml": { source: "iana", compressible: !0 },
  "application/bacnet-xdd+zip": { source: "iana", compressible: !1 },
  "application/batch-smtp": { source: "iana" },
  "application/bdoc": { compressible: !1, extensions: ["bdoc"] },
  "application/beep+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/calendar+json": { source: "iana", compressible: !0 },
  "application/calendar+xml": { source: "iana", compressible: !0, extensions: ["xcs"] },
  "application/call-completion": { source: "iana" },
  "application/cals-1840": { source: "iana" },
  "application/captive+json": { source: "iana", compressible: !0 },
  "application/cbor": { source: "iana" },
  "application/cbor-seq": { source: "iana" },
  "application/cccex": { source: "iana" },
  "application/ccmp+xml": { source: "iana", compressible: !0 },
  "application/ccxml+xml": { source: "iana", compressible: !0, extensions: ["ccxml"] },
  "application/cdfx+xml": { source: "iana", compressible: !0, extensions: ["cdfx"] },
  "application/cdmi-capability": { source: "iana", extensions: ["cdmia"] },
  "application/cdmi-container": { source: "iana", extensions: ["cdmic"] },
  "application/cdmi-domain": { source: "iana", extensions: ["cdmid"] },
  "application/cdmi-object": { source: "iana", extensions: ["cdmio"] },
  "application/cdmi-queue": { source: "iana", extensions: ["cdmiq"] },
  "application/cdni": { source: "iana" },
  "application/cea": { source: "iana" },
  "application/cea-2018+xml": { source: "iana", compressible: !0 },
  "application/cellml+xml": { source: "iana", compressible: !0 },
  "application/cfw": { source: "iana" },
  "application/city+json": { source: "iana", compressible: !0 },
  "application/clr": { source: "iana" },
  "application/clue+xml": { source: "iana", compressible: !0 },
  "application/clue_info+xml": { source: "iana", compressible: !0 },
  "application/cms": { source: "iana" },
  "application/cnrp+xml": { source: "iana", compressible: !0 },
  "application/coap-group+json": { source: "iana", compressible: !0 },
  "application/coap-payload": { source: "iana" },
  "application/commonground": { source: "iana" },
  "application/conference-info+xml": { source: "iana", compressible: !0 },
  "application/cose": { source: "iana" },
  "application/cose-key": { source: "iana" },
  "application/cose-key-set": { source: "iana" },
  "application/cpl+xml": { source: "iana", compressible: !0, extensions: ["cpl"] },
  "application/csrattrs": { source: "iana" },
  "application/csta+xml": { source: "iana", compressible: !0 },
  "application/cstadata+xml": { source: "iana", compressible: !0 },
  "application/csvm+json": { source: "iana", compressible: !0 },
  "application/cu-seeme": { source: "apache", extensions: ["cu"] },
  "application/cwt": { source: "iana" },
  "application/cybercash": { source: "iana" },
  "application/dart": { compressible: !0 },
  "application/dash+xml": { source: "iana", compressible: !0, extensions: ["mpd"] },
  "application/dash-patch+xml": { source: "iana", compressible: !0, extensions: ["mpp"] },
  "application/dashdelta": { source: "iana" },
  "application/davmount+xml": { source: "iana", compressible: !0, extensions: ["davmount"] },
  "application/dca-rft": { source: "iana" },
  "application/dcd": { source: "iana" },
  "application/dec-dx": { source: "iana" },
  "application/dialog-info+xml": { source: "iana", compressible: !0 },
  "application/dicom": { source: "iana" },
  "application/dicom+json": { source: "iana", compressible: !0 },
  "application/dicom+xml": { source: "iana", compressible: !0 },
  "application/dii": { source: "iana" },
  "application/dit": { source: "iana" },
  "application/dns": { source: "iana" },
  "application/dns+json": { source: "iana", compressible: !0 },
  "application/dns-message": { source: "iana" },
  "application/docbook+xml": { source: "apache", compressible: !0, extensions: ["dbk"] },
  "application/dots+cbor": { source: "iana" },
  "application/dskpp+xml": { source: "iana", compressible: !0 },
  "application/dssc+der": { source: "iana", extensions: ["dssc"] },
  "application/dssc+xml": { source: "iana", compressible: !0, extensions: ["xdssc"] },
  "application/dvcs": { source: "iana" },
  "application/ecmascript": { source: "iana", compressible: !0, extensions: ["es", "ecma"] },
  "application/edi-consent": { source: "iana" },
  "application/edi-x12": { source: "iana", compressible: !1 },
  "application/edifact": { source: "iana", compressible: !1 },
  "application/efi": { source: "iana" },
  "application/elm+json": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/elm+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.cap+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/emergencycalldata.comment+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.control+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.deviceinfo+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.ecall.msd": { source: "iana" },
  "application/emergencycalldata.providerinfo+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.serviceinfo+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.subscriberinfo+xml": { source: "iana", compressible: !0 },
  "application/emergencycalldata.veds+xml": { source: "iana", compressible: !0 },
  "application/emma+xml": { source: "iana", compressible: !0, extensions: ["emma"] },
  "application/emotionml+xml": { source: "iana", compressible: !0, extensions: ["emotionml"] },
  "application/encaprtp": { source: "iana" },
  "application/epp+xml": { source: "iana", compressible: !0 },
  "application/epub+zip": { source: "iana", compressible: !1, extensions: ["epub"] },
  "application/eshop": { source: "iana" },
  "application/exi": { source: "iana", extensions: ["exi"] },
  "application/expect-ct-report+json": { source: "iana", compressible: !0 },
  "application/express": { source: "iana", extensions: ["exp"] },
  "application/fastinfoset": { source: "iana" },
  "application/fastsoap": { source: "iana" },
  "application/fdt+xml": { source: "iana", compressible: !0, extensions: ["fdt"] },
  "application/fhir+json": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/fhir+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/fido.trusted-apps+json": { compressible: !0 },
  "application/fits": { source: "iana" },
  "application/flexfec": { source: "iana" },
  "application/font-sfnt": { source: "iana" },
  "application/font-tdpfr": { source: "iana", extensions: ["pfr"] },
  "application/font-woff": { source: "iana", compressible: !1 },
  "application/framework-attributes+xml": { source: "iana", compressible: !0 },
  "application/geo+json": { source: "iana", compressible: !0, extensions: ["geojson"] },
  "application/geo+json-seq": { source: "iana" },
  "application/geopackage+sqlite3": { source: "iana" },
  "application/geoxacml+xml": { source: "iana", compressible: !0 },
  "application/gltf-buffer": { source: "iana" },
  "application/gml+xml": { source: "iana", compressible: !0, extensions: ["gml"] },
  "application/gpx+xml": { source: "apache", compressible: !0, extensions: ["gpx"] },
  "application/gxf": { source: "apache", extensions: ["gxf"] },
  "application/gzip": { source: "iana", compressible: !1, extensions: ["gz"] },
  "application/h224": { source: "iana" },
  "application/held+xml": { source: "iana", compressible: !0 },
  "application/hjson": { extensions: ["hjson"] },
  "application/http": { source: "iana" },
  "application/hyperstudio": { source: "iana", extensions: ["stk"] },
  "application/ibe-key-request+xml": { source: "iana", compressible: !0 },
  "application/ibe-pkg-reply+xml": { source: "iana", compressible: !0 },
  "application/ibe-pp-data": { source: "iana" },
  "application/iges": { source: "iana" },
  "application/im-iscomposing+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/index": { source: "iana" },
  "application/index.cmd": { source: "iana" },
  "application/index.obj": { source: "iana" },
  "application/index.response": { source: "iana" },
  "application/index.vnd": { source: "iana" },
  "application/inkml+xml": { source: "iana", compressible: !0, extensions: ["ink", "inkml"] },
  "application/iotp": { source: "iana" },
  "application/ipfix": { source: "iana", extensions: ["ipfix"] },
  "application/ipp": { source: "iana" },
  "application/isup": { source: "iana" },
  "application/its+xml": { source: "iana", compressible: !0, extensions: ["its"] },
  "application/java-archive": { source: "apache", compressible: !1, extensions: ["jar", "war", "ear"] },
  "application/java-serialized-object": { source: "apache", compressible: !1, extensions: ["ser"] },
  "application/java-vm": { source: "apache", compressible: !1, extensions: ["class"] },
  "application/javascript": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["js", "mjs"] },
  "application/jf2feed+json": { source: "iana", compressible: !0 },
  "application/jose": { source: "iana" },
  "application/jose+json": { source: "iana", compressible: !0 },
  "application/jrd+json": { source: "iana", compressible: !0 },
  "application/jscalendar+json": { source: "iana", compressible: !0 },
  "application/json": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["json", "map"] },
  "application/json-patch+json": { source: "iana", compressible: !0 },
  "application/json-seq": { source: "iana" },
  "application/json5": { extensions: ["json5"] },
  "application/jsonml+json": { source: "apache", compressible: !0, extensions: ["jsonml"] },
  "application/jwk+json": { source: "iana", compressible: !0 },
  "application/jwk-set+json": { source: "iana", compressible: !0 },
  "application/jwt": { source: "iana" },
  "application/kpml-request+xml": { source: "iana", compressible: !0 },
  "application/kpml-response+xml": { source: "iana", compressible: !0 },
  "application/ld+json": { source: "iana", compressible: !0, extensions: ["jsonld"] },
  "application/lgr+xml": { source: "iana", compressible: !0, extensions: ["lgr"] },
  "application/link-format": { source: "iana" },
  "application/load-control+xml": { source: "iana", compressible: !0 },
  "application/lost+xml": { source: "iana", compressible: !0, extensions: ["lostxml"] },
  "application/lostsync+xml": { source: "iana", compressible: !0 },
  "application/lpf+zip": { source: "iana", compressible: !1 },
  "application/lxf": { source: "iana" },
  "application/mac-binhex40": { source: "iana", extensions: ["hqx"] },
  "application/mac-compactpro": { source: "apache", extensions: ["cpt"] },
  "application/macwriteii": { source: "iana" },
  "application/mads+xml": { source: "iana", compressible: !0, extensions: ["mads"] },
  "application/manifest+json": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["webmanifest"] },
  "application/marc": { source: "iana", extensions: ["mrc"] },
  "application/marcxml+xml": { source: "iana", compressible: !0, extensions: ["mrcx"] },
  "application/mathematica": { source: "iana", extensions: ["ma", "nb", "mb"] },
  "application/mathml+xml": { source: "iana", compressible: !0, extensions: ["mathml"] },
  "application/mathml-content+xml": { source: "iana", compressible: !0 },
  "application/mathml-presentation+xml": { source: "iana", compressible: !0 },
  "application/mbms-associated-procedure-description+xml": { source: "iana", compressible: !0 },
  "application/mbms-deregister+xml": { source: "iana", compressible: !0 },
  "application/mbms-envelope+xml": { source: "iana", compressible: !0 },
  "application/mbms-msk+xml": { source: "iana", compressible: !0 },
  "application/mbms-msk-response+xml": { source: "iana", compressible: !0 },
  "application/mbms-protection-description+xml": { source: "iana", compressible: !0 },
  "application/mbms-reception-report+xml": { source: "iana", compressible: !0 },
  "application/mbms-register+xml": { source: "iana", compressible: !0 },
  "application/mbms-register-response+xml": { source: "iana", compressible: !0 },
  "application/mbms-schedule+xml": { source: "iana", compressible: !0 },
  "application/mbms-user-service-description+xml": { source: "iana", compressible: !0 },
  "application/mbox": { source: "iana", extensions: ["mbox"] },
  "application/media-policy-dataset+xml": { source: "iana", compressible: !0, extensions: ["mpf"] },
  "application/media_control+xml": { source: "iana", compressible: !0 },
  "application/mediaservercontrol+xml": { source: "iana", compressible: !0, extensions: ["mscml"] },
  "application/merge-patch+json": { source: "iana", compressible: !0 },
  "application/metalink+xml": { source: "apache", compressible: !0, extensions: ["metalink"] },
  "application/metalink4+xml": { source: "iana", compressible: !0, extensions: ["meta4"] },
  "application/mets+xml": { source: "iana", compressible: !0, extensions: ["mets"] },
  "application/mf4": { source: "iana" },
  "application/mikey": { source: "iana" },
  "application/mipc": { source: "iana" },
  "application/missing-blocks+cbor-seq": { source: "iana" },
  "application/mmt-aei+xml": { source: "iana", compressible: !0, extensions: ["maei"] },
  "application/mmt-usd+xml": { source: "iana", compressible: !0, extensions: ["musd"] },
  "application/mods+xml": { source: "iana", compressible: !0, extensions: ["mods"] },
  "application/moss-keys": { source: "iana" },
  "application/moss-signature": { source: "iana" },
  "application/mosskey-data": { source: "iana" },
  "application/mosskey-request": { source: "iana" },
  "application/mp21": { source: "iana", extensions: ["m21", "mp21"] },
  "application/mp4": { source: "iana", extensions: ["mp4s", "m4p"] },
  "application/mpeg4-generic": { source: "iana" },
  "application/mpeg4-iod": { source: "iana" },
  "application/mpeg4-iod-xmt": { source: "iana" },
  "application/mrb-consumer+xml": { source: "iana", compressible: !0 },
  "application/mrb-publish+xml": { source: "iana", compressible: !0 },
  "application/msc-ivr+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/msc-mixer+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/msword": { source: "iana", compressible: !1, extensions: ["doc", "dot"] },
  "application/mud+json": { source: "iana", compressible: !0 },
  "application/multipart-core": { source: "iana" },
  "application/mxf": { source: "iana", extensions: ["mxf"] },
  "application/n-quads": { source: "iana", extensions: ["nq"] },
  "application/n-triples": { source: "iana", extensions: ["nt"] },
  "application/nasdata": { source: "iana" },
  "application/news-checkgroups": { source: "iana", charset: "US-ASCII" },
  "application/news-groupinfo": { source: "iana", charset: "US-ASCII" },
  "application/news-transmission": { source: "iana" },
  "application/nlsml+xml": { source: "iana", compressible: !0 },
  "application/node": { source: "iana", extensions: ["cjs"] },
  "application/nss": { source: "iana" },
  "application/oauth-authz-req+jwt": { source: "iana" },
  "application/oblivious-dns-message": { source: "iana" },
  "application/ocsp-request": { source: "iana" },
  "application/ocsp-response": { source: "iana" },
  "application/octet-stream": { source: "iana", compressible: !1, extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"] },
  "application/oda": { source: "iana", extensions: ["oda"] },
  "application/odm+xml": { source: "iana", compressible: !0 },
  "application/odx": { source: "iana" },
  "application/oebps-package+xml": { source: "iana", compressible: !0, extensions: ["opf"] },
  "application/ogg": { source: "iana", compressible: !1, extensions: ["ogx"] },
  "application/omdoc+xml": { source: "apache", compressible: !0, extensions: ["omdoc"] },
  "application/onenote": { source: "apache", extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"] },
  "application/opc-nodeset+xml": { source: "iana", compressible: !0 },
  "application/oscore": { source: "iana" },
  "application/oxps": { source: "iana", extensions: ["oxps"] },
  "application/p21": { source: "iana" },
  "application/p21+zip": { source: "iana", compressible: !1 },
  "application/p2p-overlay+xml": { source: "iana", compressible: !0, extensions: ["relo"] },
  "application/parityfec": { source: "iana" },
  "application/passport": { source: "iana" },
  "application/patch-ops-error+xml": { source: "iana", compressible: !0, extensions: ["xer"] },
  "application/pdf": { source: "iana", compressible: !1, extensions: ["pdf"] },
  "application/pdx": { source: "iana" },
  "application/pem-certificate-chain": { source: "iana" },
  "application/pgp-encrypted": { source: "iana", compressible: !1, extensions: ["pgp"] },
  "application/pgp-keys": { source: "iana", extensions: ["asc"] },
  "application/pgp-signature": { source: "iana", extensions: ["asc", "sig"] },
  "application/pics-rules": { source: "apache", extensions: ["prf"] },
  "application/pidf+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/pidf-diff+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/pkcs10": { source: "iana", extensions: ["p10"] },
  "application/pkcs12": { source: "iana" },
  "application/pkcs7-mime": { source: "iana", extensions: ["p7m", "p7c"] },
  "application/pkcs7-signature": { source: "iana", extensions: ["p7s"] },
  "application/pkcs8": { source: "iana", extensions: ["p8"] },
  "application/pkcs8-encrypted": { source: "iana" },
  "application/pkix-attr-cert": { source: "iana", extensions: ["ac"] },
  "application/pkix-cert": { source: "iana", extensions: ["cer"] },
  "application/pkix-crl": { source: "iana", extensions: ["crl"] },
  "application/pkix-pkipath": { source: "iana", extensions: ["pkipath"] },
  "application/pkixcmp": { source: "iana", extensions: ["pki"] },
  "application/pls+xml": { source: "iana", compressible: !0, extensions: ["pls"] },
  "application/poc-settings+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/postscript": { source: "iana", compressible: !0, extensions: ["ai", "eps", "ps"] },
  "application/ppsp-tracker+json": { source: "iana", compressible: !0 },
  "application/problem+json": { source: "iana", compressible: !0 },
  "application/problem+xml": { source: "iana", compressible: !0 },
  "application/provenance+xml": { source: "iana", compressible: !0, extensions: ["provx"] },
  "application/prs.alvestrand.titrax-sheet": { source: "iana" },
  "application/prs.cww": { source: "iana", extensions: ["cww"] },
  "application/prs.cyn": { source: "iana", charset: "7-BIT" },
  "application/prs.hpub+zip": { source: "iana", compressible: !1 },
  "application/prs.nprend": { source: "iana" },
  "application/prs.plucker": { source: "iana" },
  "application/prs.rdf-xml-crypt": { source: "iana" },
  "application/prs.xsf+xml": { source: "iana", compressible: !0 },
  "application/pskc+xml": { source: "iana", compressible: !0, extensions: ["pskcxml"] },
  "application/pvd+json": { source: "iana", compressible: !0 },
  "application/qsig": { source: "iana" },
  "application/raml+yaml": { compressible: !0, extensions: ["raml"] },
  "application/raptorfec": { source: "iana" },
  "application/rdap+json": { source: "iana", compressible: !0 },
  "application/rdf+xml": { source: "iana", compressible: !0, extensions: ["rdf", "owl"] },
  "application/reginfo+xml": { source: "iana", compressible: !0, extensions: ["rif"] },
  "application/relax-ng-compact-syntax": { source: "iana", extensions: ["rnc"] },
  "application/remote-printing": { source: "iana" },
  "application/reputon+json": { source: "iana", compressible: !0 },
  "application/resource-lists+xml": { source: "iana", compressible: !0, extensions: ["rl"] },
  "application/resource-lists-diff+xml": { source: "iana", compressible: !0, extensions: ["rld"] },
  "application/rfc+xml": { source: "iana", compressible: !0 },
  "application/riscos": { source: "iana" },
  "application/rlmi+xml": { source: "iana", compressible: !0 },
  "application/rls-services+xml": { source: "iana", compressible: !0, extensions: ["rs"] },
  "application/route-apd+xml": { source: "iana", compressible: !0, extensions: ["rapd"] },
  "application/route-s-tsid+xml": { source: "iana", compressible: !0, extensions: ["sls"] },
  "application/route-usd+xml": { source: "iana", compressible: !0, extensions: ["rusd"] },
  "application/rpki-ghostbusters": { source: "iana", extensions: ["gbr"] },
  "application/rpki-manifest": { source: "iana", extensions: ["mft"] },
  "application/rpki-publication": { source: "iana" },
  "application/rpki-roa": { source: "iana", extensions: ["roa"] },
  "application/rpki-updown": { source: "iana" },
  "application/rsd+xml": { source: "apache", compressible: !0, extensions: ["rsd"] },
  "application/rss+xml": { source: "apache", compressible: !0, extensions: ["rss"] },
  "application/rtf": { source: "iana", compressible: !0, extensions: ["rtf"] },
  "application/rtploopback": { source: "iana" },
  "application/rtx": { source: "iana" },
  "application/samlassertion+xml": { source: "iana", compressible: !0 },
  "application/samlmetadata+xml": { source: "iana", compressible: !0 },
  "application/sarif+json": { source: "iana", compressible: !0 },
  "application/sarif-external-properties+json": { source: "iana", compressible: !0 },
  "application/sbe": { source: "iana" },
  "application/sbml+xml": { source: "iana", compressible: !0, extensions: ["sbml"] },
  "application/scaip+xml": { source: "iana", compressible: !0 },
  "application/scim+json": { source: "iana", compressible: !0 },
  "application/scvp-cv-request": { source: "iana", extensions: ["scq"] },
  "application/scvp-cv-response": { source: "iana", extensions: ["scs"] },
  "application/scvp-vp-request": { source: "iana", extensions: ["spq"] },
  "application/scvp-vp-response": { source: "iana", extensions: ["spp"] },
  "application/sdp": { source: "iana", extensions: ["sdp"] },
  "application/secevent+jwt": { source: "iana" },
  "application/senml+cbor": { source: "iana" },
  "application/senml+json": { source: "iana", compressible: !0 },
  "application/senml+xml": { source: "iana", compressible: !0, extensions: ["senmlx"] },
  "application/senml-etch+cbor": { source: "iana" },
  "application/senml-etch+json": { source: "iana", compressible: !0 },
  "application/senml-exi": { source: "iana" },
  "application/sensml+cbor": { source: "iana" },
  "application/sensml+json": { source: "iana", compressible: !0 },
  "application/sensml+xml": { source: "iana", compressible: !0, extensions: ["sensmlx"] },
  "application/sensml-exi": { source: "iana" },
  "application/sep+xml": { source: "iana", compressible: !0 },
  "application/sep-exi": { source: "iana" },
  "application/session-info": { source: "iana" },
  "application/set-payment": { source: "iana" },
  "application/set-payment-initiation": { source: "iana", extensions: ["setpay"] },
  "application/set-registration": { source: "iana" },
  "application/set-registration-initiation": { source: "iana", extensions: ["setreg"] },
  "application/sgml": { source: "iana" },
  "application/sgml-open-catalog": { source: "iana" },
  "application/shf+xml": { source: "iana", compressible: !0, extensions: ["shf"] },
  "application/sieve": { source: "iana", extensions: ["siv", "sieve"] },
  "application/simple-filter+xml": { source: "iana", compressible: !0 },
  "application/simple-message-summary": { source: "iana" },
  "application/simplesymbolcontainer": { source: "iana" },
  "application/sipc": { source: "iana" },
  "application/slate": { source: "iana" },
  "application/smil": { source: "iana" },
  "application/smil+xml": { source: "iana", compressible: !0, extensions: ["smi", "smil"] },
  "application/smpte336m": { source: "iana" },
  "application/soap+fastinfoset": { source: "iana" },
  "application/soap+xml": { source: "iana", compressible: !0 },
  "application/sparql-query": { source: "iana", extensions: ["rq"] },
  "application/sparql-results+xml": { source: "iana", compressible: !0, extensions: ["srx"] },
  "application/spdx+json": { source: "iana", compressible: !0 },
  "application/spirits-event+xml": { source: "iana", compressible: !0 },
  "application/sql": { source: "iana" },
  "application/srgs": { source: "iana", extensions: ["gram"] },
  "application/srgs+xml": { source: "iana", compressible: !0, extensions: ["grxml"] },
  "application/sru+xml": { source: "iana", compressible: !0, extensions: ["sru"] },
  "application/ssdl+xml": { source: "apache", compressible: !0, extensions: ["ssdl"] },
  "application/ssml+xml": { source: "iana", compressible: !0, extensions: ["ssml"] },
  "application/stix+json": { source: "iana", compressible: !0 },
  "application/swid+xml": { source: "iana", compressible: !0, extensions: ["swidtag"] },
  "application/tamp-apex-update": { source: "iana" },
  "application/tamp-apex-update-confirm": { source: "iana" },
  "application/tamp-community-update": { source: "iana" },
  "application/tamp-community-update-confirm": { source: "iana" },
  "application/tamp-error": { source: "iana" },
  "application/tamp-sequence-adjust": { source: "iana" },
  "application/tamp-sequence-adjust-confirm": { source: "iana" },
  "application/tamp-status-query": { source: "iana" },
  "application/tamp-status-response": { source: "iana" },
  "application/tamp-update": { source: "iana" },
  "application/tamp-update-confirm": { source: "iana" },
  "application/tar": { compressible: !0 },
  "application/taxii+json": { source: "iana", compressible: !0 },
  "application/td+json": { source: "iana", compressible: !0 },
  "application/tei+xml": { source: "iana", compressible: !0, extensions: ["tei", "teicorpus"] },
  "application/tetra_isi": { source: "iana" },
  "application/thraud+xml": { source: "iana", compressible: !0, extensions: ["tfi"] },
  "application/timestamp-query": { source: "iana" },
  "application/timestamp-reply": { source: "iana" },
  "application/timestamped-data": { source: "iana", extensions: ["tsd"] },
  "application/tlsrpt+gzip": { source: "iana" },
  "application/tlsrpt+json": { source: "iana", compressible: !0 },
  "application/tnauthlist": { source: "iana" },
  "application/token-introspection+jwt": { source: "iana" },
  "application/toml": { compressible: !0, extensions: ["toml"] },
  "application/trickle-ice-sdpfrag": { source: "iana" },
  "application/trig": { source: "iana", extensions: ["trig"] },
  "application/ttml+xml": { source: "iana", compressible: !0, extensions: ["ttml"] },
  "application/tve-trigger": { source: "iana" },
  "application/tzif": { source: "iana" },
  "application/tzif-leap": { source: "iana" },
  "application/ubjson": { compressible: !1, extensions: ["ubj"] },
  "application/ulpfec": { source: "iana" },
  "application/urc-grpsheet+xml": { source: "iana", compressible: !0 },
  "application/urc-ressheet+xml": { source: "iana", compressible: !0, extensions: ["rsheet"] },
  "application/urc-targetdesc+xml": { source: "iana", compressible: !0, extensions: ["td"] },
  "application/urc-uisocketdesc+xml": { source: "iana", compressible: !0 },
  "application/vcard+json": { source: "iana", compressible: !0 },
  "application/vcard+xml": { source: "iana", compressible: !0 },
  "application/vemmi": { source: "iana" },
  "application/vividence.scriptfile": { source: "apache" },
  "application/vnd.1000minds.decision-model+xml": { source: "iana", compressible: !0, extensions: ["1km"] },
  "application/vnd.3gpp-prose+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp-prose-pc3ch+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp-v2x-local-service-information": { source: "iana" },
  "application/vnd.3gpp.5gnas": { source: "iana" },
  "application/vnd.3gpp.access-transfer-events+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.bsf+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.gmop+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.gtpc": { source: "iana" },
  "application/vnd.3gpp.interworking-data": { source: "iana" },
  "application/vnd.3gpp.lpp": { source: "iana" },
  "application/vnd.3gpp.mc-signalling-ear": { source: "iana" },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcdata-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcdata-payload": { source: "iana" },
  "application/vnd.3gpp.mcdata-service-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcdata-signalling": { source: "iana" },
  "application/vnd.3gpp.mcdata-ue-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcdata-user-profile+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-floor-request+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-location-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-service-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-signed+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-ue-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcptt-user-profile+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-location-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-service-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-ue-config+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mcvideo-user-profile+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.mid-call+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.ngap": { source: "iana" },
  "application/vnd.3gpp.pfcp": { source: "iana" },
  "application/vnd.3gpp.pic-bw-large": { source: "iana", extensions: ["plb"] },
  "application/vnd.3gpp.pic-bw-small": { source: "iana", extensions: ["psb"] },
  "application/vnd.3gpp.pic-bw-var": { source: "iana", extensions: ["pvb"] },
  "application/vnd.3gpp.s1ap": { source: "iana" },
  "application/vnd.3gpp.sms": { source: "iana" },
  "application/vnd.3gpp.sms+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.srvcc-ext+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.srvcc-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.state-and-event-info+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp.ussd+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp2.bcmcsinfo+xml": { source: "iana", compressible: !0 },
  "application/vnd.3gpp2.sms": { source: "iana" },
  "application/vnd.3gpp2.tcap": { source: "iana", extensions: ["tcap"] },
  "application/vnd.3lightssoftware.imagescal": { source: "iana" },
  "application/vnd.3m.post-it-notes": { source: "iana", extensions: ["pwn"] },
  "application/vnd.accpac.simply.aso": { source: "iana", extensions: ["aso"] },
  "application/vnd.accpac.simply.imp": { source: "iana", extensions: ["imp"] },
  "application/vnd.acucobol": { source: "iana", extensions: ["acu"] },
  "application/vnd.acucorp": { source: "iana", extensions: ["atc", "acutc"] },
  "application/vnd.adobe.air-application-installer-package+zip": { source: "apache", compressible: !1, extensions: ["air"] },
  "application/vnd.adobe.flash.movie": { source: "iana" },
  "application/vnd.adobe.formscentral.fcdt": { source: "iana", extensions: ["fcdt"] },
  "application/vnd.adobe.fxp": { source: "iana", extensions: ["fxp", "fxpl"] },
  "application/vnd.adobe.partial-upload": { source: "iana" },
  "application/vnd.adobe.xdp+xml": { source: "iana", compressible: !0, extensions: ["xdp"] },
  "application/vnd.adobe.xfdf": { source: "iana", extensions: ["xfdf"] },
  "application/vnd.aether.imp": { source: "iana" },
  "application/vnd.afpc.afplinedata": { source: "iana" },
  "application/vnd.afpc.afplinedata-pagedef": { source: "iana" },
  "application/vnd.afpc.cmoca-cmresource": { source: "iana" },
  "application/vnd.afpc.foca-charset": { source: "iana" },
  "application/vnd.afpc.foca-codedfont": { source: "iana" },
  "application/vnd.afpc.foca-codepage": { source: "iana" },
  "application/vnd.afpc.modca": { source: "iana" },
  "application/vnd.afpc.modca-cmtable": { source: "iana" },
  "application/vnd.afpc.modca-formdef": { source: "iana" },
  "application/vnd.afpc.modca-mediummap": { source: "iana" },
  "application/vnd.afpc.modca-objectcontainer": { source: "iana" },
  "application/vnd.afpc.modca-overlay": { source: "iana" },
  "application/vnd.afpc.modca-pagesegment": { source: "iana" },
  "application/vnd.age": { source: "iana", extensions: ["age"] },
  "application/vnd.ah-barcode": { source: "iana" },
  "application/vnd.ahead.space": { source: "iana", extensions: ["ahead"] },
  "application/vnd.airzip.filesecure.azf": { source: "iana", extensions: ["azf"] },
  "application/vnd.airzip.filesecure.azs": { source: "iana", extensions: ["azs"] },
  "application/vnd.amadeus+json": { source: "iana", compressible: !0 },
  "application/vnd.amazon.ebook": { source: "apache", extensions: ["azw"] },
  "application/vnd.amazon.mobi8-ebook": { source: "iana" },
  "application/vnd.americandynamics.acc": { source: "iana", extensions: ["acc"] },
  "application/vnd.amiga.ami": { source: "iana", extensions: ["ami"] },
  "application/vnd.amundsen.maze+xml": { source: "iana", compressible: !0 },
  "application/vnd.android.ota": { source: "iana" },
  "application/vnd.android.package-archive": { source: "apache", compressible: !1, extensions: ["apk"] },
  "application/vnd.anki": { source: "iana" },
  "application/vnd.anser-web-certificate-issue-initiation": { source: "iana", extensions: ["cii"] },
  "application/vnd.anser-web-funds-transfer-initiation": { source: "apache", extensions: ["fti"] },
  "application/vnd.antix.game-component": { source: "iana", extensions: ["atx"] },
  "application/vnd.apache.arrow.file": { source: "iana" },
  "application/vnd.apache.arrow.stream": { source: "iana" },
  "application/vnd.apache.thrift.binary": { source: "iana" },
  "application/vnd.apache.thrift.compact": { source: "iana" },
  "application/vnd.apache.thrift.json": { source: "iana" },
  "application/vnd.api+json": { source: "iana", compressible: !0 },
  "application/vnd.aplextor.warrp+json": { source: "iana", compressible: !0 },
  "application/vnd.apothekende.reservation+json": { source: "iana", compressible: !0 },
  "application/vnd.apple.installer+xml": { source: "iana", compressible: !0, extensions: ["mpkg"] },
  "application/vnd.apple.keynote": { source: "iana", extensions: ["key"] },
  "application/vnd.apple.mpegurl": { source: "iana", extensions: ["m3u8"] },
  "application/vnd.apple.numbers": { source: "iana", extensions: ["numbers"] },
  "application/vnd.apple.pages": { source: "iana", extensions: ["pages"] },
  "application/vnd.apple.pkpass": { compressible: !1, extensions: ["pkpass"] },
  "application/vnd.arastra.swi": { source: "iana" },
  "application/vnd.aristanetworks.swi": { source: "iana", extensions: ["swi"] },
  "application/vnd.artisan+json": { source: "iana", compressible: !0 },
  "application/vnd.artsquare": { source: "iana" },
  "application/vnd.astraea-software.iota": { source: "iana", extensions: ["iota"] },
  "application/vnd.audiograph": { source: "iana", extensions: ["aep"] },
  "application/vnd.autopackage": { source: "iana" },
  "application/vnd.avalon+json": { source: "iana", compressible: !0 },
  "application/vnd.avistar+xml": { source: "iana", compressible: !0 },
  "application/vnd.balsamiq.bmml+xml": { source: "iana", compressible: !0, extensions: ["bmml"] },
  "application/vnd.balsamiq.bmpr": { source: "iana" },
  "application/vnd.banana-accounting": { source: "iana" },
  "application/vnd.bbf.usp.error": { source: "iana" },
  "application/vnd.bbf.usp.msg": { source: "iana" },
  "application/vnd.bbf.usp.msg+json": { source: "iana", compressible: !0 },
  "application/vnd.bekitzur-stech+json": { source: "iana", compressible: !0 },
  "application/vnd.bint.med-content": { source: "iana" },
  "application/vnd.biopax.rdf+xml": { source: "iana", compressible: !0 },
  "application/vnd.blink-idb-value-wrapper": { source: "iana" },
  "application/vnd.blueice.multipass": { source: "iana", extensions: ["mpm"] },
  "application/vnd.bluetooth.ep.oob": { source: "iana" },
  "application/vnd.bluetooth.le.oob": { source: "iana" },
  "application/vnd.bmi": { source: "iana", extensions: ["bmi"] },
  "application/vnd.bpf": { source: "iana" },
  "application/vnd.bpf3": { source: "iana" },
  "application/vnd.businessobjects": { source: "iana", extensions: ["rep"] },
  "application/vnd.byu.uapi+json": { source: "iana", compressible: !0 },
  "application/vnd.cab-jscript": { source: "iana" },
  "application/vnd.canon-cpdl": { source: "iana" },
  "application/vnd.canon-lips": { source: "iana" },
  "application/vnd.capasystems-pg+json": { source: "iana", compressible: !0 },
  "application/vnd.cendio.thinlinc.clientconf": { source: "iana" },
  "application/vnd.century-systems.tcp_stream": { source: "iana" },
  "application/vnd.chemdraw+xml": { source: "iana", compressible: !0, extensions: ["cdxml"] },
  "application/vnd.chess-pgn": { source: "iana" },
  "application/vnd.chipnuts.karaoke-mmd": { source: "iana", extensions: ["mmd"] },
  "application/vnd.ciedi": { source: "iana" },
  "application/vnd.cinderella": { source: "iana", extensions: ["cdy"] },
  "application/vnd.cirpack.isdn-ext": { source: "iana" },
  "application/vnd.citationstyles.style+xml": { source: "iana", compressible: !0, extensions: ["csl"] },
  "application/vnd.claymore": { source: "iana", extensions: ["cla"] },
  "application/vnd.cloanto.rp9": { source: "iana", extensions: ["rp9"] },
  "application/vnd.clonk.c4group": { source: "iana", extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"] },
  "application/vnd.cluetrust.cartomobile-config": { source: "iana", extensions: ["c11amc"] },
  "application/vnd.cluetrust.cartomobile-config-pkg": { source: "iana", extensions: ["c11amz"] },
  "application/vnd.coffeescript": { source: "iana" },
  "application/vnd.collabio.xodocuments.document": { source: "iana" },
  "application/vnd.collabio.xodocuments.document-template": { source: "iana" },
  "application/vnd.collabio.xodocuments.presentation": { source: "iana" },
  "application/vnd.collabio.xodocuments.presentation-template": { source: "iana" },
  "application/vnd.collabio.xodocuments.spreadsheet": { source: "iana" },
  "application/vnd.collabio.xodocuments.spreadsheet-template": { source: "iana" },
  "application/vnd.collection+json": { source: "iana", compressible: !0 },
  "application/vnd.collection.doc+json": { source: "iana", compressible: !0 },
  "application/vnd.collection.next+json": { source: "iana", compressible: !0 },
  "application/vnd.comicbook+zip": { source: "iana", compressible: !1 },
  "application/vnd.comicbook-rar": { source: "iana" },
  "application/vnd.commerce-battelle": { source: "iana" },
  "application/vnd.commonspace": { source: "iana", extensions: ["csp"] },
  "application/vnd.contact.cmsg": { source: "iana", extensions: ["cdbcmsg"] },
  "application/vnd.coreos.ignition+json": { source: "iana", compressible: !0 },
  "application/vnd.cosmocaller": { source: "iana", extensions: ["cmc"] },
  "application/vnd.crick.clicker": { source: "iana", extensions: ["clkx"] },
  "application/vnd.crick.clicker.keyboard": { source: "iana", extensions: ["clkk"] },
  "application/vnd.crick.clicker.palette": { source: "iana", extensions: ["clkp"] },
  "application/vnd.crick.clicker.template": { source: "iana", extensions: ["clkt"] },
  "application/vnd.crick.clicker.wordbank": { source: "iana", extensions: ["clkw"] },
  "application/vnd.criticaltools.wbs+xml": { source: "iana", compressible: !0, extensions: ["wbs"] },
  "application/vnd.cryptii.pipe+json": { source: "iana", compressible: !0 },
  "application/vnd.crypto-shade-file": { source: "iana" },
  "application/vnd.cryptomator.encrypted": { source: "iana" },
  "application/vnd.cryptomator.vault": { source: "iana" },
  "application/vnd.ctc-posml": { source: "iana", extensions: ["pml"] },
  "application/vnd.ctct.ws+xml": { source: "iana", compressible: !0 },
  "application/vnd.cups-pdf": { source: "iana" },
  "application/vnd.cups-postscript": { source: "iana" },
  "application/vnd.cups-ppd": { source: "iana", extensions: ["ppd"] },
  "application/vnd.cups-raster": { source: "iana" },
  "application/vnd.cups-raw": { source: "iana" },
  "application/vnd.curl": { source: "iana" },
  "application/vnd.curl.car": { source: "apache", extensions: ["car"] },
  "application/vnd.curl.pcurl": { source: "apache", extensions: ["pcurl"] },
  "application/vnd.cyan.dean.root+xml": { source: "iana", compressible: !0 },
  "application/vnd.cybank": { source: "iana" },
  "application/vnd.cyclonedx+json": { source: "iana", compressible: !0 },
  "application/vnd.cyclonedx+xml": { source: "iana", compressible: !0 },
  "application/vnd.d2l.coursepackage1p0+zip": { source: "iana", compressible: !1 },
  "application/vnd.d3m-dataset": { source: "iana" },
  "application/vnd.d3m-problem": { source: "iana" },
  "application/vnd.dart": { source: "iana", compressible: !0, extensions: ["dart"] },
  "application/vnd.data-vision.rdz": { source: "iana", extensions: ["rdz"] },
  "application/vnd.datapackage+json": { source: "iana", compressible: !0 },
  "application/vnd.dataresource+json": { source: "iana", compressible: !0 },
  "application/vnd.dbf": { source: "iana", extensions: ["dbf"] },
  "application/vnd.debian.binary-package": { source: "iana" },
  "application/vnd.dece.data": { source: "iana", extensions: ["uvf", "uvvf", "uvd", "uvvd"] },
  "application/vnd.dece.ttml+xml": { source: "iana", compressible: !0, extensions: ["uvt", "uvvt"] },
  "application/vnd.dece.unspecified": { source: "iana", extensions: ["uvx", "uvvx"] },
  "application/vnd.dece.zip": { source: "iana", extensions: ["uvz", "uvvz"] },
  "application/vnd.denovo.fcselayout-link": { source: "iana", extensions: ["fe_launch"] },
  "application/vnd.desmume.movie": { source: "iana" },
  "application/vnd.dir-bi.plate-dl-nosuffix": { source: "iana" },
  "application/vnd.dm.delegation+xml": { source: "iana", compressible: !0 },
  "application/vnd.dna": { source: "iana", extensions: ["dna"] },
  "application/vnd.document+json": { source: "iana", compressible: !0 },
  "application/vnd.dolby.mlp": { source: "apache", extensions: ["mlp"] },
  "application/vnd.dolby.mobile.1": { source: "iana" },
  "application/vnd.dolby.mobile.2": { source: "iana" },
  "application/vnd.doremir.scorecloud-binary-document": { source: "iana" },
  "application/vnd.dpgraph": { source: "iana", extensions: ["dpg"] },
  "application/vnd.dreamfactory": { source: "iana", extensions: ["dfac"] },
  "application/vnd.drive+json": { source: "iana", compressible: !0 },
  "application/vnd.ds-keypoint": { source: "apache", extensions: ["kpxx"] },
  "application/vnd.dtg.local": { source: "iana" },
  "application/vnd.dtg.local.flash": { source: "iana" },
  "application/vnd.dtg.local.html": { source: "iana" },
  "application/vnd.dvb.ait": { source: "iana", extensions: ["ait"] },
  "application/vnd.dvb.dvbisl+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.dvbj": { source: "iana" },
  "application/vnd.dvb.esgcontainer": { source: "iana" },
  "application/vnd.dvb.ipdcdftnotifaccess": { source: "iana" },
  "application/vnd.dvb.ipdcesgaccess": { source: "iana" },
  "application/vnd.dvb.ipdcesgaccess2": { source: "iana" },
  "application/vnd.dvb.ipdcesgpdd": { source: "iana" },
  "application/vnd.dvb.ipdcroaming": { source: "iana" },
  "application/vnd.dvb.iptv.alfec-base": { source: "iana" },
  "application/vnd.dvb.iptv.alfec-enhancement": { source: "iana" },
  "application/vnd.dvb.notif-aggregate-root+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-container+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-generic+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-ia-msglist+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-ia-registration-request+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-ia-registration-response+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.notif-init+xml": { source: "iana", compressible: !0 },
  "application/vnd.dvb.pfr": { source: "iana" },
  "application/vnd.dvb.service": { source: "iana", extensions: ["svc"] },
  "application/vnd.dxr": { source: "iana" },
  "application/vnd.dynageo": { source: "iana", extensions: ["geo"] },
  "application/vnd.dzr": { source: "iana" },
  "application/vnd.easykaraoke.cdgdownload": { source: "iana" },
  "application/vnd.ecdis-update": { source: "iana" },
  "application/vnd.ecip.rlp": { source: "iana" },
  "application/vnd.eclipse.ditto+json": { source: "iana", compressible: !0 },
  "application/vnd.ecowin.chart": { source: "iana", extensions: ["mag"] },
  "application/vnd.ecowin.filerequest": { source: "iana" },
  "application/vnd.ecowin.fileupdate": { source: "iana" },
  "application/vnd.ecowin.series": { source: "iana" },
  "application/vnd.ecowin.seriesrequest": { source: "iana" },
  "application/vnd.ecowin.seriesupdate": { source: "iana" },
  "application/vnd.efi.img": { source: "iana" },
  "application/vnd.efi.iso": { source: "iana" },
  "application/vnd.emclient.accessrequest+xml": { source: "iana", compressible: !0 },
  "application/vnd.enliven": { source: "iana", extensions: ["nml"] },
  "application/vnd.enphase.envoy": { source: "iana" },
  "application/vnd.eprints.data+xml": { source: "iana", compressible: !0 },
  "application/vnd.epson.esf": { source: "iana", extensions: ["esf"] },
  "application/vnd.epson.msf": { source: "iana", extensions: ["msf"] },
  "application/vnd.epson.quickanime": { source: "iana", extensions: ["qam"] },
  "application/vnd.epson.salt": { source: "iana", extensions: ["slt"] },
  "application/vnd.epson.ssf": { source: "iana", extensions: ["ssf"] },
  "application/vnd.ericsson.quickcall": { source: "iana" },
  "application/vnd.espass-espass+zip": { source: "iana", compressible: !1 },
  "application/vnd.eszigno3+xml": { source: "iana", compressible: !0, extensions: ["es3", "et3"] },
  "application/vnd.etsi.aoc+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.asic-e+zip": { source: "iana", compressible: !1 },
  "application/vnd.etsi.asic-s+zip": { source: "iana", compressible: !1 },
  "application/vnd.etsi.cug+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvcommand+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvdiscovery+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsad-bc+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsad-cod+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsad-npvr+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvservice+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvsync+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.iptvueprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.mcid+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.mheg5": { source: "iana" },
  "application/vnd.etsi.overload-control-policy-dataset+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.pstn+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.sci+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.simservs+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.timestamp-token": { source: "iana" },
  "application/vnd.etsi.tsl+xml": { source: "iana", compressible: !0 },
  "application/vnd.etsi.tsl.der": { source: "iana" },
  "application/vnd.eu.kasparian.car+json": { source: "iana", compressible: !0 },
  "application/vnd.eudora.data": { source: "iana" },
  "application/vnd.evolv.ecig.profile": { source: "iana" },
  "application/vnd.evolv.ecig.settings": { source: "iana" },
  "application/vnd.evolv.ecig.theme": { source: "iana" },
  "application/vnd.exstream-empower+zip": { source: "iana", compressible: !1 },
  "application/vnd.exstream-package": { source: "iana" },
  "application/vnd.ezpix-album": { source: "iana", extensions: ["ez2"] },
  "application/vnd.ezpix-package": { source: "iana", extensions: ["ez3"] },
  "application/vnd.f-secure.mobile": { source: "iana" },
  "application/vnd.familysearch.gedcom+zip": { source: "iana", compressible: !1 },
  "application/vnd.fastcopy-disk-image": { source: "iana" },
  "application/vnd.fdf": { source: "iana", extensions: ["fdf"] },
  "application/vnd.fdsn.mseed": { source: "iana", extensions: ["mseed"] },
  "application/vnd.fdsn.seed": { source: "iana", extensions: ["seed", "dataless"] },
  "application/vnd.ffsns": { source: "iana" },
  "application/vnd.ficlab.flb+zip": { source: "iana", compressible: !1 },
  "application/vnd.filmit.zfc": { source: "iana" },
  "application/vnd.fints": { source: "iana" },
  "application/vnd.firemonkeys.cloudcell": { source: "iana" },
  "application/vnd.flographit": { source: "iana", extensions: ["gph"] },
  "application/vnd.fluxtime.clip": { source: "iana", extensions: ["ftc"] },
  "application/vnd.font-fontforge-sfd": { source: "iana" },
  "application/vnd.framemaker": { source: "iana", extensions: ["fm", "frame", "maker", "book"] },
  "application/vnd.frogans.fnc": { source: "iana", extensions: ["fnc"] },
  "application/vnd.frogans.ltf": { source: "iana", extensions: ["ltf"] },
  "application/vnd.fsc.weblaunch": { source: "iana", extensions: ["fsc"] },
  "application/vnd.fujifilm.fb.docuworks": { source: "iana" },
  "application/vnd.fujifilm.fb.docuworks.binder": { source: "iana" },
  "application/vnd.fujifilm.fb.docuworks.container": { source: "iana" },
  "application/vnd.fujifilm.fb.jfi+xml": { source: "iana", compressible: !0 },
  "application/vnd.fujitsu.oasys": { source: "iana", extensions: ["oas"] },
  "application/vnd.fujitsu.oasys2": { source: "iana", extensions: ["oa2"] },
  "application/vnd.fujitsu.oasys3": { source: "iana", extensions: ["oa3"] },
  "application/vnd.fujitsu.oasysgp": { source: "iana", extensions: ["fg5"] },
  "application/vnd.fujitsu.oasysprs": { source: "iana", extensions: ["bh2"] },
  "application/vnd.fujixerox.art-ex": { source: "iana" },
  "application/vnd.fujixerox.art4": { source: "iana" },
  "application/vnd.fujixerox.ddd": { source: "iana", extensions: ["ddd"] },
  "application/vnd.fujixerox.docuworks": { source: "iana", extensions: ["xdw"] },
  "application/vnd.fujixerox.docuworks.binder": { source: "iana", extensions: ["xbd"] },
  "application/vnd.fujixerox.docuworks.container": { source: "iana" },
  "application/vnd.fujixerox.hbpl": { source: "iana" },
  "application/vnd.fut-misnet": { source: "iana" },
  "application/vnd.futoin+cbor": { source: "iana" },
  "application/vnd.futoin+json": { source: "iana", compressible: !0 },
  "application/vnd.fuzzysheet": { source: "iana", extensions: ["fzs"] },
  "application/vnd.genomatix.tuxedo": { source: "iana", extensions: ["txd"] },
  "application/vnd.gentics.grd+json": { source: "iana", compressible: !0 },
  "application/vnd.geo+json": { source: "iana", compressible: !0 },
  "application/vnd.geocube+xml": { source: "iana", compressible: !0 },
  "application/vnd.geogebra.file": { source: "iana", extensions: ["ggb"] },
  "application/vnd.geogebra.slides": { source: "iana" },
  "application/vnd.geogebra.tool": { source: "iana", extensions: ["ggt"] },
  "application/vnd.geometry-explorer": { source: "iana", extensions: ["gex", "gre"] },
  "application/vnd.geonext": { source: "iana", extensions: ["gxt"] },
  "application/vnd.geoplan": { source: "iana", extensions: ["g2w"] },
  "application/vnd.geospace": { source: "iana", extensions: ["g3w"] },
  "application/vnd.gerber": { source: "iana" },
  "application/vnd.globalplatform.card-content-mgt": { source: "iana" },
  "application/vnd.globalplatform.card-content-mgt-response": { source: "iana" },
  "application/vnd.gmx": { source: "iana", extensions: ["gmx"] },
  "application/vnd.google-apps.document": { compressible: !1, extensions: ["gdoc"] },
  "application/vnd.google-apps.presentation": { compressible: !1, extensions: ["gslides"] },
  "application/vnd.google-apps.spreadsheet": { compressible: !1, extensions: ["gsheet"] },
  "application/vnd.google-earth.kml+xml": { source: "iana", compressible: !0, extensions: ["kml"] },
  "application/vnd.google-earth.kmz": { source: "iana", compressible: !1, extensions: ["kmz"] },
  "application/vnd.gov.sk.e-form+xml": { source: "iana", compressible: !0 },
  "application/vnd.gov.sk.e-form+zip": { source: "iana", compressible: !1 },
  "application/vnd.gov.sk.xmldatacontainer+xml": { source: "iana", compressible: !0 },
  "application/vnd.grafeq": { source: "iana", extensions: ["gqf", "gqs"] },
  "application/vnd.gridmp": { source: "iana" },
  "application/vnd.groove-account": { source: "iana", extensions: ["gac"] },
  "application/vnd.groove-help": { source: "iana", extensions: ["ghf"] },
  "application/vnd.groove-identity-message": { source: "iana", extensions: ["gim"] },
  "application/vnd.groove-injector": { source: "iana", extensions: ["grv"] },
  "application/vnd.groove-tool-message": { source: "iana", extensions: ["gtm"] },
  "application/vnd.groove-tool-template": { source: "iana", extensions: ["tpl"] },
  "application/vnd.groove-vcard": { source: "iana", extensions: ["vcg"] },
  "application/vnd.hal+json": { source: "iana", compressible: !0 },
  "application/vnd.hal+xml": { source: "iana", compressible: !0, extensions: ["hal"] },
  "application/vnd.handheld-entertainment+xml": { source: "iana", compressible: !0, extensions: ["zmm"] },
  "application/vnd.hbci": { source: "iana", extensions: ["hbci"] },
  "application/vnd.hc+json": { source: "iana", compressible: !0 },
  "application/vnd.hcl-bireports": { source: "iana" },
  "application/vnd.hdt": { source: "iana" },
  "application/vnd.heroku+json": { source: "iana", compressible: !0 },
  "application/vnd.hhe.lesson-player": { source: "iana", extensions: ["les"] },
  "application/vnd.hl7cda+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.hl7v2+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.hp-hpgl": { source: "iana", extensions: ["hpgl"] },
  "application/vnd.hp-hpid": { source: "iana", extensions: ["hpid"] },
  "application/vnd.hp-hps": { source: "iana", extensions: ["hps"] },
  "application/vnd.hp-jlyt": { source: "iana", extensions: ["jlt"] },
  "application/vnd.hp-pcl": { source: "iana", extensions: ["pcl"] },
  "application/vnd.hp-pclxl": { source: "iana", extensions: ["pclxl"] },
  "application/vnd.httphone": { source: "iana" },
  "application/vnd.hydrostatix.sof-data": { source: "iana", extensions: ["sfd-hdstx"] },
  "application/vnd.hyper+json": { source: "iana", compressible: !0 },
  "application/vnd.hyper-item+json": { source: "iana", compressible: !0 },
  "application/vnd.hyperdrive+json": { source: "iana", compressible: !0 },
  "application/vnd.hzn-3d-crossword": { source: "iana" },
  "application/vnd.ibm.afplinedata": { source: "iana" },
  "application/vnd.ibm.electronic-media": { source: "iana" },
  "application/vnd.ibm.minipay": { source: "iana", extensions: ["mpy"] },
  "application/vnd.ibm.modcap": { source: "iana", extensions: ["afp", "listafp", "list3820"] },
  "application/vnd.ibm.rights-management": { source: "iana", extensions: ["irm"] },
  "application/vnd.ibm.secure-container": { source: "iana", extensions: ["sc"] },
  "application/vnd.iccprofile": { source: "iana", extensions: ["icc", "icm"] },
  "application/vnd.ieee.1905": { source: "iana" },
  "application/vnd.igloader": { source: "iana", extensions: ["igl"] },
  "application/vnd.imagemeter.folder+zip": { source: "iana", compressible: !1 },
  "application/vnd.imagemeter.image+zip": { source: "iana", compressible: !1 },
  "application/vnd.immervision-ivp": { source: "iana", extensions: ["ivp"] },
  "application/vnd.immervision-ivu": { source: "iana", extensions: ["ivu"] },
  "application/vnd.ims.imsccv1p1": { source: "iana" },
  "application/vnd.ims.imsccv1p2": { source: "iana" },
  "application/vnd.ims.imsccv1p3": { source: "iana" },
  "application/vnd.ims.lis.v2.result+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolproxy+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolproxy.id+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolsettings+json": { source: "iana", compressible: !0 },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": { source: "iana", compressible: !0 },
  "application/vnd.informedcontrol.rms+xml": { source: "iana", compressible: !0 },
  "application/vnd.informix-visionary": { source: "iana" },
  "application/vnd.infotech.project": { source: "iana" },
  "application/vnd.infotech.project+xml": { source: "iana", compressible: !0 },
  "application/vnd.innopath.wamp.notification": { source: "iana" },
  "application/vnd.insors.igm": { source: "iana", extensions: ["igm"] },
  "application/vnd.intercon.formnet": { source: "iana", extensions: ["xpw", "xpx"] },
  "application/vnd.intergeo": { source: "iana", extensions: ["i2g"] },
  "application/vnd.intertrust.digibox": { source: "iana" },
  "application/vnd.intertrust.nncp": { source: "iana" },
  "application/vnd.intu.qbo": { source: "iana", extensions: ["qbo"] },
  "application/vnd.intu.qfx": { source: "iana", extensions: ["qfx"] },
  "application/vnd.iptc.g2.catalogitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.conceptitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.knowledgeitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.newsitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.newsmessage+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.packageitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.iptc.g2.planningitem+xml": { source: "iana", compressible: !0 },
  "application/vnd.ipunplugged.rcprofile": { source: "iana", extensions: ["rcprofile"] },
  "application/vnd.irepository.package+xml": { source: "iana", compressible: !0, extensions: ["irp"] },
  "application/vnd.is-xpr": { source: "iana", extensions: ["xpr"] },
  "application/vnd.isac.fcs": { source: "iana", extensions: ["fcs"] },
  "application/vnd.iso11783-10+zip": { source: "iana", compressible: !1 },
  "application/vnd.jam": { source: "iana", extensions: ["jam"] },
  "application/vnd.japannet-directory-service": { source: "iana" },
  "application/vnd.japannet-jpnstore-wakeup": { source: "iana" },
  "application/vnd.japannet-payment-wakeup": { source: "iana" },
  "application/vnd.japannet-registration": { source: "iana" },
  "application/vnd.japannet-registration-wakeup": { source: "iana" },
  "application/vnd.japannet-setstore-wakeup": { source: "iana" },
  "application/vnd.japannet-verification": { source: "iana" },
  "application/vnd.japannet-verification-wakeup": { source: "iana" },
  "application/vnd.jcp.javame.midlet-rms": { source: "iana", extensions: ["rms"] },
  "application/vnd.jisp": { source: "iana", extensions: ["jisp"] },
  "application/vnd.joost.joda-archive": { source: "iana", extensions: ["joda"] },
  "application/vnd.jsk.isdn-ngn": { source: "iana" },
  "application/vnd.kahootz": { source: "iana", extensions: ["ktz", "ktr"] },
  "application/vnd.kde.karbon": { source: "iana", extensions: ["karbon"] },
  "application/vnd.kde.kchart": { source: "iana", extensions: ["chrt"] },
  "application/vnd.kde.kformula": { source: "iana", extensions: ["kfo"] },
  "application/vnd.kde.kivio": { source: "iana", extensions: ["flw"] },
  "application/vnd.kde.kontour": { source: "iana", extensions: ["kon"] },
  "application/vnd.kde.kpresenter": { source: "iana", extensions: ["kpr", "kpt"] },
  "application/vnd.kde.kspread": { source: "iana", extensions: ["ksp"] },
  "application/vnd.kde.kword": { source: "iana", extensions: ["kwd", "kwt"] },
  "application/vnd.kenameaapp": { source: "iana", extensions: ["htke"] },
  "application/vnd.kidspiration": { source: "iana", extensions: ["kia"] },
  "application/vnd.kinar": { source: "iana", extensions: ["kne", "knp"] },
  "application/vnd.koan": { source: "iana", extensions: ["skp", "skd", "skt", "skm"] },
  "application/vnd.kodak-descriptor": { source: "iana", extensions: ["sse"] },
  "application/vnd.las": { source: "iana" },
  "application/vnd.las.las+json": { source: "iana", compressible: !0 },
  "application/vnd.las.las+xml": { source: "iana", compressible: !0, extensions: ["lasxml"] },
  "application/vnd.laszip": { source: "iana" },
  "application/vnd.leap+json": { source: "iana", compressible: !0 },
  "application/vnd.liberty-request+xml": { source: "iana", compressible: !0 },
  "application/vnd.llamagraphics.life-balance.desktop": { source: "iana", extensions: ["lbd"] },
  "application/vnd.llamagraphics.life-balance.exchange+xml": { source: "iana", compressible: !0, extensions: ["lbe"] },
  "application/vnd.logipipe.circuit+zip": { source: "iana", compressible: !1 },
  "application/vnd.loom": { source: "iana" },
  "application/vnd.lotus-1-2-3": { source: "iana", extensions: ["123"] },
  "application/vnd.lotus-approach": { source: "iana", extensions: ["apr"] },
  "application/vnd.lotus-freelance": { source: "iana", extensions: ["pre"] },
  "application/vnd.lotus-notes": { source: "iana", extensions: ["nsf"] },
  "application/vnd.lotus-organizer": { source: "iana", extensions: ["org"] },
  "application/vnd.lotus-screencam": { source: "iana", extensions: ["scm"] },
  "application/vnd.lotus-wordpro": { source: "iana", extensions: ["lwp"] },
  "application/vnd.macports.portpkg": { source: "iana", extensions: ["portpkg"] },
  "application/vnd.mapbox-vector-tile": { source: "iana", extensions: ["mvt"] },
  "application/vnd.marlin.drm.actiontoken+xml": { source: "iana", compressible: !0 },
  "application/vnd.marlin.drm.conftoken+xml": { source: "iana", compressible: !0 },
  "application/vnd.marlin.drm.license+xml": { source: "iana", compressible: !0 },
  "application/vnd.marlin.drm.mdcf": { source: "iana" },
  "application/vnd.mason+json": { source: "iana", compressible: !0 },
  "application/vnd.maxar.archive.3tz+zip": { source: "iana", compressible: !1 },
  "application/vnd.maxmind.maxmind-db": { source: "iana" },
  "application/vnd.mcd": { source: "iana", extensions: ["mcd"] },
  "application/vnd.medcalcdata": { source: "iana", extensions: ["mc1"] },
  "application/vnd.mediastation.cdkey": { source: "iana", extensions: ["cdkey"] },
  "application/vnd.meridian-slingshot": { source: "iana" },
  "application/vnd.mfer": { source: "iana", extensions: ["mwf"] },
  "application/vnd.mfmp": { source: "iana", extensions: ["mfm"] },
  "application/vnd.micro+json": { source: "iana", compressible: !0 },
  "application/vnd.micrografx.flo": { source: "iana", extensions: ["flo"] },
  "application/vnd.micrografx.igx": { source: "iana", extensions: ["igx"] },
  "application/vnd.microsoft.portable-executable": { source: "iana" },
  "application/vnd.microsoft.windows.thumbnail-cache": { source: "iana" },
  "application/vnd.miele+json": { source: "iana", compressible: !0 },
  "application/vnd.mif": { source: "iana", extensions: ["mif"] },
  "application/vnd.minisoft-hp3000-save": { source: "iana" },
  "application/vnd.mitsubishi.misty-guard.trustweb": { source: "iana" },
  "application/vnd.mobius.daf": { source: "iana", extensions: ["daf"] },
  "application/vnd.mobius.dis": { source: "iana", extensions: ["dis"] },
  "application/vnd.mobius.mbk": { source: "iana", extensions: ["mbk"] },
  "application/vnd.mobius.mqy": { source: "iana", extensions: ["mqy"] },
  "application/vnd.mobius.msl": { source: "iana", extensions: ["msl"] },
  "application/vnd.mobius.plc": { source: "iana", extensions: ["plc"] },
  "application/vnd.mobius.txf": { source: "iana", extensions: ["txf"] },
  "application/vnd.mophun.application": { source: "iana", extensions: ["mpn"] },
  "application/vnd.mophun.certificate": { source: "iana", extensions: ["mpc"] },
  "application/vnd.motorola.flexsuite": { source: "iana" },
  "application/vnd.motorola.flexsuite.adsi": { source: "iana" },
  "application/vnd.motorola.flexsuite.fis": { source: "iana" },
  "application/vnd.motorola.flexsuite.gotap": { source: "iana" },
  "application/vnd.motorola.flexsuite.kmr": { source: "iana" },
  "application/vnd.motorola.flexsuite.ttc": { source: "iana" },
  "application/vnd.motorola.flexsuite.wem": { source: "iana" },
  "application/vnd.motorola.iprm": { source: "iana" },
  "application/vnd.mozilla.xul+xml": { source: "iana", compressible: !0, extensions: ["xul"] },
  "application/vnd.ms-3mfdocument": { source: "iana" },
  "application/vnd.ms-artgalry": { source: "iana", extensions: ["cil"] },
  "application/vnd.ms-asf": { source: "iana" },
  "application/vnd.ms-cab-compressed": { source: "iana", extensions: ["cab"] },
  "application/vnd.ms-color.iccprofile": { source: "apache" },
  "application/vnd.ms-excel": { source: "iana", compressible: !1, extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"] },
  "application/vnd.ms-excel.addin.macroenabled.12": { source: "iana", extensions: ["xlam"] },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": { source: "iana", extensions: ["xlsb"] },
  "application/vnd.ms-excel.sheet.macroenabled.12": { source: "iana", extensions: ["xlsm"] },
  "application/vnd.ms-excel.template.macroenabled.12": { source: "iana", extensions: ["xltm"] },
  "application/vnd.ms-fontobject": { source: "iana", compressible: !0, extensions: ["eot"] },
  "application/vnd.ms-htmlhelp": { source: "iana", extensions: ["chm"] },
  "application/vnd.ms-ims": { source: "iana", extensions: ["ims"] },
  "application/vnd.ms-lrm": { source: "iana", extensions: ["lrm"] },
  "application/vnd.ms-office.activex+xml": { source: "iana", compressible: !0 },
  "application/vnd.ms-officetheme": { source: "iana", extensions: ["thmx"] },
  "application/vnd.ms-opentype": { source: "apache", compressible: !0 },
  "application/vnd.ms-outlook": { compressible: !1, extensions: ["msg"] },
  "application/vnd.ms-package.obfuscated-opentype": { source: "apache" },
  "application/vnd.ms-pki.seccat": { source: "apache", extensions: ["cat"] },
  "application/vnd.ms-pki.stl": { source: "apache", extensions: ["stl"] },
  "application/vnd.ms-playready.initiator+xml": { source: "iana", compressible: !0 },
  "application/vnd.ms-powerpoint": { source: "iana", compressible: !1, extensions: ["ppt", "pps", "pot"] },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": { source: "iana", extensions: ["ppam"] },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": { source: "iana", extensions: ["pptm"] },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": { source: "iana", extensions: ["sldm"] },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": { source: "iana", extensions: ["ppsm"] },
  "application/vnd.ms-powerpoint.template.macroenabled.12": { source: "iana", extensions: ["potm"] },
  "application/vnd.ms-printdevicecapabilities+xml": { source: "iana", compressible: !0 },
  "application/vnd.ms-printing.printticket+xml": { source: "apache", compressible: !0 },
  "application/vnd.ms-printschematicket+xml": { source: "iana", compressible: !0 },
  "application/vnd.ms-project": { source: "iana", extensions: ["mpp", "mpt"] },
  "application/vnd.ms-tnef": { source: "iana" },
  "application/vnd.ms-windows.devicepairing": { source: "iana" },
  "application/vnd.ms-windows.nwprinting.oob": { source: "iana" },
  "application/vnd.ms-windows.printerpairing": { source: "iana" },
  "application/vnd.ms-windows.wsd.oob": { source: "iana" },
  "application/vnd.ms-wmdrm.lic-chlg-req": { source: "iana" },
  "application/vnd.ms-wmdrm.lic-resp": { source: "iana" },
  "application/vnd.ms-wmdrm.meter-chlg-req": { source: "iana" },
  "application/vnd.ms-wmdrm.meter-resp": { source: "iana" },
  "application/vnd.ms-word.document.macroenabled.12": { source: "iana", extensions: ["docm"] },
  "application/vnd.ms-word.template.macroenabled.12": { source: "iana", extensions: ["dotm"] },
  "application/vnd.ms-works": { source: "iana", extensions: ["wps", "wks", "wcm", "wdb"] },
  "application/vnd.ms-wpl": { source: "iana", extensions: ["wpl"] },
  "application/vnd.ms-xpsdocument": { source: "iana", compressible: !1, extensions: ["xps"] },
  "application/vnd.msa-disk-image": { source: "iana" },
  "application/vnd.mseq": { source: "iana", extensions: ["mseq"] },
  "application/vnd.msign": { source: "iana" },
  "application/vnd.multiad.creator": { source: "iana" },
  "application/vnd.multiad.creator.cif": { source: "iana" },
  "application/vnd.music-niff": { source: "iana" },
  "application/vnd.musician": { source: "iana", extensions: ["mus"] },
  "application/vnd.muvee.style": { source: "iana", extensions: ["msty"] },
  "application/vnd.mynfc": { source: "iana", extensions: ["taglet"] },
  "application/vnd.nacamar.ybrid+json": { source: "iana", compressible: !0 },
  "application/vnd.ncd.control": { source: "iana" },
  "application/vnd.ncd.reference": { source: "iana" },
  "application/vnd.nearst.inv+json": { source: "iana", compressible: !0 },
  "application/vnd.nebumind.line": { source: "iana" },
  "application/vnd.nervana": { source: "iana" },
  "application/vnd.netfpx": { source: "iana" },
  "application/vnd.neurolanguage.nlu": { source: "iana", extensions: ["nlu"] },
  "application/vnd.nimn": { source: "iana" },
  "application/vnd.nintendo.nitro.rom": { source: "iana" },
  "application/vnd.nintendo.snes.rom": { source: "iana" },
  "application/vnd.nitf": { source: "iana", extensions: ["ntf", "nitf"] },
  "application/vnd.noblenet-directory": { source: "iana", extensions: ["nnd"] },
  "application/vnd.noblenet-sealer": { source: "iana", extensions: ["nns"] },
  "application/vnd.noblenet-web": { source: "iana", extensions: ["nnw"] },
  "application/vnd.nokia.catalogs": { source: "iana" },
  "application/vnd.nokia.conml+wbxml": { source: "iana" },
  "application/vnd.nokia.conml+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.iptv.config+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.isds-radio-presets": { source: "iana" },
  "application/vnd.nokia.landmark+wbxml": { source: "iana" },
  "application/vnd.nokia.landmark+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.landmarkcollection+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.n-gage.ac+xml": { source: "iana", compressible: !0, extensions: ["ac"] },
  "application/vnd.nokia.n-gage.data": { source: "iana", extensions: ["ngdat"] },
  "application/vnd.nokia.n-gage.symbian.install": { source: "iana", extensions: ["n-gage"] },
  "application/vnd.nokia.ncd": { source: "iana" },
  "application/vnd.nokia.pcd+wbxml": { source: "iana" },
  "application/vnd.nokia.pcd+xml": { source: "iana", compressible: !0 },
  "application/vnd.nokia.radio-preset": { source: "iana", extensions: ["rpst"] },
  "application/vnd.nokia.radio-presets": { source: "iana", extensions: ["rpss"] },
  "application/vnd.novadigm.edm": { source: "iana", extensions: ["edm"] },
  "application/vnd.novadigm.edx": { source: "iana", extensions: ["edx"] },
  "application/vnd.novadigm.ext": { source: "iana", extensions: ["ext"] },
  "application/vnd.ntt-local.content-share": { source: "iana" },
  "application/vnd.ntt-local.file-transfer": { source: "iana" },
  "application/vnd.ntt-local.ogw_remote-access": { source: "iana" },
  "application/vnd.ntt-local.sip-ta_remote": { source: "iana" },
  "application/vnd.ntt-local.sip-ta_tcp_stream": { source: "iana" },
  "application/vnd.oasis.opendocument.chart": { source: "iana", extensions: ["odc"] },
  "application/vnd.oasis.opendocument.chart-template": { source: "iana", extensions: ["otc"] },
  "application/vnd.oasis.opendocument.database": { source: "iana", extensions: ["odb"] },
  "application/vnd.oasis.opendocument.formula": { source: "iana", extensions: ["odf"] },
  "application/vnd.oasis.opendocument.formula-template": { source: "iana", extensions: ["odft"] },
  "application/vnd.oasis.opendocument.graphics": { source: "iana", compressible: !1, extensions: ["odg"] },
  "application/vnd.oasis.opendocument.graphics-template": { source: "iana", extensions: ["otg"] },
  "application/vnd.oasis.opendocument.image": { source: "iana", extensions: ["odi"] },
  "application/vnd.oasis.opendocument.image-template": { source: "iana", extensions: ["oti"] },
  "application/vnd.oasis.opendocument.presentation": { source: "iana", compressible: !1, extensions: ["odp"] },
  "application/vnd.oasis.opendocument.presentation-template": { source: "iana", extensions: ["otp"] },
  "application/vnd.oasis.opendocument.spreadsheet": { source: "iana", compressible: !1, extensions: ["ods"] },
  "application/vnd.oasis.opendocument.spreadsheet-template": { source: "iana", extensions: ["ots"] },
  "application/vnd.oasis.opendocument.text": { source: "iana", compressible: !1, extensions: ["odt"] },
  "application/vnd.oasis.opendocument.text-master": { source: "iana", extensions: ["odm"] },
  "application/vnd.oasis.opendocument.text-template": { source: "iana", extensions: ["ott"] },
  "application/vnd.oasis.opendocument.text-web": { source: "iana", extensions: ["oth"] },
  "application/vnd.obn": { source: "iana" },
  "application/vnd.ocf+cbor": { source: "iana" },
  "application/vnd.oci.image.manifest.v1+json": { source: "iana", compressible: !0 },
  "application/vnd.oftn.l10n+json": { source: "iana", compressible: !0 },
  "application/vnd.oipf.contentaccessdownload+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.contentaccessstreaming+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.cspg-hexbinary": { source: "iana" },
  "application/vnd.oipf.dae.svg+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.dae.xhtml+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.mippvcontrolmessage+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.pae.gem": { source: "iana" },
  "application/vnd.oipf.spdiscovery+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.spdlist+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.ueprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.oipf.userprofile+xml": { source: "iana", compressible: !0 },
  "application/vnd.olpc-sugar": { source: "iana", extensions: ["xo"] },
  "application/vnd.oma-scws-config": { source: "iana" },
  "application/vnd.oma-scws-http-request": { source: "iana" },
  "application/vnd.oma-scws-http-response": { source: "iana" },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.drm-trigger+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.imd+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.ltkm": { source: "iana" },
  "application/vnd.oma.bcast.notification+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.provisioningtrigger": { source: "iana" },
  "application/vnd.oma.bcast.sgboot": { source: "iana" },
  "application/vnd.oma.bcast.sgdd+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.sgdu": { source: "iana" },
  "application/vnd.oma.bcast.simple-symbol-container": { source: "iana" },
  "application/vnd.oma.bcast.smartcard-trigger+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.sprov+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.bcast.stkm": { source: "iana" },
  "application/vnd.oma.cab-address-book+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.cab-feature-handler+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.cab-pcc+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.cab-subs-invite+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.cab-user-prefs+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.dcd": { source: "iana" },
  "application/vnd.oma.dcdc": { source: "iana" },
  "application/vnd.oma.dd2+xml": { source: "iana", compressible: !0, extensions: ["dd2"] },
  "application/vnd.oma.drm.risd+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.group-usage-list+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.lwm2m+cbor": { source: "iana" },
  "application/vnd.oma.lwm2m+json": { source: "iana", compressible: !0 },
  "application/vnd.oma.lwm2m+tlv": { source: "iana" },
  "application/vnd.oma.pal+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.detailed-progress-report+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.final-report+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.groups+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.invocation-descriptor+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.poc.optimized-progress-report+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.push": { source: "iana" },
  "application/vnd.oma.scidm.messages+xml": { source: "iana", compressible: !0 },
  "application/vnd.oma.xcap-directory+xml": { source: "iana", compressible: !0 },
  "application/vnd.omads-email+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.omads-file+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.omads-folder+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.omaloc-supl-init": { source: "iana" },
  "application/vnd.onepager": { source: "iana" },
  "application/vnd.onepagertamp": { source: "iana" },
  "application/vnd.onepagertamx": { source: "iana" },
  "application/vnd.onepagertat": { source: "iana" },
  "application/vnd.onepagertatp": { source: "iana" },
  "application/vnd.onepagertatx": { source: "iana" },
  "application/vnd.openblox.game+xml": { source: "iana", compressible: !0, extensions: ["obgx"] },
  "application/vnd.openblox.game-binary": { source: "iana" },
  "application/vnd.openeye.oeb": { source: "iana" },
  "application/vnd.openofficeorg.extension": { source: "apache", extensions: ["oxt"] },
  "application/vnd.openstreetmap.data+xml": { source: "iana", compressible: !0, extensions: ["osm"] },
  "application/vnd.opentimestamps.ots": { source: "iana" },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawing+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": { source: "iana", compressible: !1, extensions: ["pptx"] },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": { source: "iana", extensions: ["sldx"] },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": { source: "iana", extensions: ["ppsx"] },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.template": { source: "iana", extensions: ["potx"] },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { source: "iana", compressible: !1, extensions: ["xlsx"] },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": { source: "iana", extensions: ["xltx"] },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.theme+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.vmldrawing": { source: "iana" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { source: "iana", compressible: !1, extensions: ["docx"] },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": { source: "iana", extensions: ["dotx"] },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-package.core-properties+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": { source: "iana", compressible: !0 },
  "application/vnd.openxmlformats-package.relationships+xml": { source: "iana", compressible: !0 },
  "application/vnd.oracle.resource+json": { source: "iana", compressible: !0 },
  "application/vnd.orange.indata": { source: "iana" },
  "application/vnd.osa.netdeploy": { source: "iana" },
  "application/vnd.osgeo.mapguide.package": { source: "iana", extensions: ["mgp"] },
  "application/vnd.osgi.bundle": { source: "iana" },
  "application/vnd.osgi.dp": { source: "iana", extensions: ["dp"] },
  "application/vnd.osgi.subsystem": { source: "iana", extensions: ["esa"] },
  "application/vnd.otps.ct-kip+xml": { source: "iana", compressible: !0 },
  "application/vnd.oxli.countgraph": { source: "iana" },
  "application/vnd.pagerduty+json": { source: "iana", compressible: !0 },
  "application/vnd.palm": { source: "iana", extensions: ["pdb", "pqa", "oprc"] },
  "application/vnd.panoply": { source: "iana" },
  "application/vnd.paos.xml": { source: "iana" },
  "application/vnd.patentdive": { source: "iana" },
  "application/vnd.patientecommsdoc": { source: "iana" },
  "application/vnd.pawaafile": { source: "iana", extensions: ["paw"] },
  "application/vnd.pcos": { source: "iana" },
  "application/vnd.pg.format": { source: "iana", extensions: ["str"] },
  "application/vnd.pg.osasli": { source: "iana", extensions: ["ei6"] },
  "application/vnd.piaccess.application-licence": { source: "iana" },
  "application/vnd.picsel": { source: "iana", extensions: ["efif"] },
  "application/vnd.pmi.widget": { source: "iana", extensions: ["wg"] },
  "application/vnd.poc.group-advertisement+xml": { source: "iana", compressible: !0 },
  "application/vnd.pocketlearn": { source: "iana", extensions: ["plf"] },
  "application/vnd.powerbuilder6": { source: "iana", extensions: ["pbd"] },
  "application/vnd.powerbuilder6-s": { source: "iana" },
  "application/vnd.powerbuilder7": { source: "iana" },
  "application/vnd.powerbuilder7-s": { source: "iana" },
  "application/vnd.powerbuilder75": { source: "iana" },
  "application/vnd.powerbuilder75-s": { source: "iana" },
  "application/vnd.preminet": { source: "iana" },
  "application/vnd.previewsystems.box": { source: "iana", extensions: ["box"] },
  "application/vnd.proteus.magazine": { source: "iana", extensions: ["mgz"] },
  "application/vnd.psfs": { source: "iana" },
  "application/vnd.publishare-delta-tree": { source: "iana", extensions: ["qps"] },
  "application/vnd.pvi.ptid1": { source: "iana", extensions: ["ptid"] },
  "application/vnd.pwg-multiplexed": { source: "iana" },
  "application/vnd.pwg-xhtml-print+xml": { source: "iana", compressible: !0 },
  "application/vnd.qualcomm.brew-app-res": { source: "iana" },
  "application/vnd.quarantainenet": { source: "iana" },
  "application/vnd.quark.quarkxpress": { source: "iana", extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"] },
  "application/vnd.quobject-quoxdocument": { source: "iana" },
  "application/vnd.radisys.moml+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit-conf+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit-conn+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit-dialog+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-audit-stream+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-conf+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-base+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-group+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-speech+xml": { source: "iana", compressible: !0 },
  "application/vnd.radisys.msml-dialog-transform+xml": { source: "iana", compressible: !0 },
  "application/vnd.rainstor.data": { source: "iana" },
  "application/vnd.rapid": { source: "iana" },
  "application/vnd.rar": { source: "iana", extensions: ["rar"] },
  "application/vnd.realvnc.bed": { source: "iana", extensions: ["bed"] },
  "application/vnd.recordare.musicxml": { source: "iana", extensions: ["mxl"] },
  "application/vnd.recordare.musicxml+xml": { source: "iana", compressible: !0, extensions: ["musicxml"] },
  "application/vnd.renlearn.rlprint": { source: "iana" },
  "application/vnd.resilient.logic": { source: "iana" },
  "application/vnd.restful+json": { source: "iana", compressible: !0 },
  "application/vnd.rig.cryptonote": { source: "iana", extensions: ["cryptonote"] },
  "application/vnd.rim.cod": { source: "apache", extensions: ["cod"] },
  "application/vnd.rn-realmedia": { source: "apache", extensions: ["rm"] },
  "application/vnd.rn-realmedia-vbr": { source: "apache", extensions: ["rmvb"] },
  "application/vnd.route66.link66+xml": { source: "iana", compressible: !0, extensions: ["link66"] },
  "application/vnd.rs-274x": { source: "iana" },
  "application/vnd.ruckus.download": { source: "iana" },
  "application/vnd.s3sms": { source: "iana" },
  "application/vnd.sailingtracker.track": { source: "iana", extensions: ["st"] },
  "application/vnd.sar": { source: "iana" },
  "application/vnd.sbm.cid": { source: "iana" },
  "application/vnd.sbm.mid2": { source: "iana" },
  "application/vnd.scribus": { source: "iana" },
  "application/vnd.sealed.3df": { source: "iana" },
  "application/vnd.sealed.csf": { source: "iana" },
  "application/vnd.sealed.doc": { source: "iana" },
  "application/vnd.sealed.eml": { source: "iana" },
  "application/vnd.sealed.mht": { source: "iana" },
  "application/vnd.sealed.net": { source: "iana" },
  "application/vnd.sealed.ppt": { source: "iana" },
  "application/vnd.sealed.tiff": { source: "iana" },
  "application/vnd.sealed.xls": { source: "iana" },
  "application/vnd.sealedmedia.softseal.html": { source: "iana" },
  "application/vnd.sealedmedia.softseal.pdf": { source: "iana" },
  "application/vnd.seemail": { source: "iana", extensions: ["see"] },
  "application/vnd.seis+json": { source: "iana", compressible: !0 },
  "application/vnd.sema": { source: "iana", extensions: ["sema"] },
  "application/vnd.semd": { source: "iana", extensions: ["semd"] },
  "application/vnd.semf": { source: "iana", extensions: ["semf"] },
  "application/vnd.shade-save-file": { source: "iana" },
  "application/vnd.shana.informed.formdata": { source: "iana", extensions: ["ifm"] },
  "application/vnd.shana.informed.formtemplate": { source: "iana", extensions: ["itp"] },
  "application/vnd.shana.informed.interchange": { source: "iana", extensions: ["iif"] },
  "application/vnd.shana.informed.package": { source: "iana", extensions: ["ipk"] },
  "application/vnd.shootproof+json": { source: "iana", compressible: !0 },
  "application/vnd.shopkick+json": { source: "iana", compressible: !0 },
  "application/vnd.shp": { source: "iana" },
  "application/vnd.shx": { source: "iana" },
  "application/vnd.sigrok.session": { source: "iana" },
  "application/vnd.simtech-mindmapper": { source: "iana", extensions: ["twd", "twds"] },
  "application/vnd.siren+json": { source: "iana", compressible: !0 },
  "application/vnd.smaf": { source: "iana", extensions: ["mmf"] },
  "application/vnd.smart.notebook": { source: "iana" },
  "application/vnd.smart.teacher": { source: "iana", extensions: ["teacher"] },
  "application/vnd.snesdev-page-table": { source: "iana" },
  "application/vnd.software602.filler.form+xml": { source: "iana", compressible: !0, extensions: ["fo"] },
  "application/vnd.software602.filler.form-xml-zip": { source: "iana" },
  "application/vnd.solent.sdkm+xml": { source: "iana", compressible: !0, extensions: ["sdkm", "sdkd"] },
  "application/vnd.spotfire.dxp": { source: "iana", extensions: ["dxp"] },
  "application/vnd.spotfire.sfs": { source: "iana", extensions: ["sfs"] },
  "application/vnd.sqlite3": { source: "iana" },
  "application/vnd.sss-cod": { source: "iana" },
  "application/vnd.sss-dtf": { source: "iana" },
  "application/vnd.sss-ntf": { source: "iana" },
  "application/vnd.stardivision.calc": { source: "apache", extensions: ["sdc"] },
  "application/vnd.stardivision.draw": { source: "apache", extensions: ["sda"] },
  "application/vnd.stardivision.impress": { source: "apache", extensions: ["sdd"] },
  "application/vnd.stardivision.math": { source: "apache", extensions: ["smf"] },
  "application/vnd.stardivision.writer": { source: "apache", extensions: ["sdw", "vor"] },
  "application/vnd.stardivision.writer-global": { source: "apache", extensions: ["sgl"] },
  "application/vnd.stepmania.package": { source: "iana", extensions: ["smzip"] },
  "application/vnd.stepmania.stepchart": { source: "iana", extensions: ["sm"] },
  "application/vnd.street-stream": { source: "iana" },
  "application/vnd.sun.wadl+xml": { source: "iana", compressible: !0, extensions: ["wadl"] },
  "application/vnd.sun.xml.calc": { source: "apache", extensions: ["sxc"] },
  "application/vnd.sun.xml.calc.template": { source: "apache", extensions: ["stc"] },
  "application/vnd.sun.xml.draw": { source: "apache", extensions: ["sxd"] },
  "application/vnd.sun.xml.draw.template": { source: "apache", extensions: ["std"] },
  "application/vnd.sun.xml.impress": { source: "apache", extensions: ["sxi"] },
  "application/vnd.sun.xml.impress.template": { source: "apache", extensions: ["sti"] },
  "application/vnd.sun.xml.math": { source: "apache", extensions: ["sxm"] },
  "application/vnd.sun.xml.writer": { source: "apache", extensions: ["sxw"] },
  "application/vnd.sun.xml.writer.global": { source: "apache", extensions: ["sxg"] },
  "application/vnd.sun.xml.writer.template": { source: "apache", extensions: ["stw"] },
  "application/vnd.sus-calendar": { source: "iana", extensions: ["sus", "susp"] },
  "application/vnd.svd": { source: "iana", extensions: ["svd"] },
  "application/vnd.swiftview-ics": { source: "iana" },
  "application/vnd.sycle+xml": { source: "iana", compressible: !0 },
  "application/vnd.syft+json": { source: "iana", compressible: !0 },
  "application/vnd.symbian.install": { source: "apache", extensions: ["sis", "sisx"] },
  "application/vnd.syncml+xml": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["xsm"] },
  "application/vnd.syncml.dm+wbxml": { source: "iana", charset: "UTF-8", extensions: ["bdm"] },
  "application/vnd.syncml.dm+xml": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["xdm"] },
  "application/vnd.syncml.dm.notification": { source: "iana" },
  "application/vnd.syncml.dmddf+wbxml": { source: "iana" },
  "application/vnd.syncml.dmddf+xml": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["ddf"] },
  "application/vnd.syncml.dmtnds+wbxml": { source: "iana" },
  "application/vnd.syncml.dmtnds+xml": { source: "iana", charset: "UTF-8", compressible: !0 },
  "application/vnd.syncml.ds.notification": { source: "iana" },
  "application/vnd.tableschema+json": { source: "iana", compressible: !0 },
  "application/vnd.tao.intent-module-archive": { source: "iana", extensions: ["tao"] },
  "application/vnd.tcpdump.pcap": { source: "iana", extensions: ["pcap", "cap", "dmp"] },
  "application/vnd.think-cell.ppttc+json": { source: "iana", compressible: !0 },
  "application/vnd.tmd.mediaflex.api+xml": { source: "iana", compressible: !0 },
  "application/vnd.tml": { source: "iana" },
  "application/vnd.tmobile-livetv": { source: "iana", extensions: ["tmo"] },
  "application/vnd.tri.onesource": { source: "iana" },
  "application/vnd.trid.tpt": { source: "iana", extensions: ["tpt"] },
  "application/vnd.triscape.mxs": { source: "iana", extensions: ["mxs"] },
  "application/vnd.trueapp": { source: "iana", extensions: ["tra"] },
  "application/vnd.truedoc": { source: "iana" },
  "application/vnd.ubisoft.webplayer": { source: "iana" },
  "application/vnd.ufdl": { source: "iana", extensions: ["ufd", "ufdl"] },
  "application/vnd.uiq.theme": { source: "iana", extensions: ["utz"] },
  "application/vnd.umajin": { source: "iana", extensions: ["umj"] },
  "application/vnd.unity": { source: "iana", extensions: ["unityweb"] },
  "application/vnd.uoml+xml": { source: "iana", compressible: !0, extensions: ["uoml"] },
  "application/vnd.uplanet.alert": { source: "iana" },
  "application/vnd.uplanet.alert-wbxml": { source: "iana" },
  "application/vnd.uplanet.bearer-choice": { source: "iana" },
  "application/vnd.uplanet.bearer-choice-wbxml": { source: "iana" },
  "application/vnd.uplanet.cacheop": { source: "iana" },
  "application/vnd.uplanet.cacheop-wbxml": { source: "iana" },
  "application/vnd.uplanet.channel": { source: "iana" },
  "application/vnd.uplanet.channel-wbxml": { source: "iana" },
  "application/vnd.uplanet.list": { source: "iana" },
  "application/vnd.uplanet.list-wbxml": { source: "iana" },
  "application/vnd.uplanet.listcmd": { source: "iana" },
  "application/vnd.uplanet.listcmd-wbxml": { source: "iana" },
  "application/vnd.uplanet.signal": { source: "iana" },
  "application/vnd.uri-map": { source: "iana" },
  "application/vnd.valve.source.material": { source: "iana" },
  "application/vnd.vcx": { source: "iana", extensions: ["vcx"] },
  "application/vnd.vd-study": { source: "iana" },
  "application/vnd.vectorworks": { source: "iana" },
  "application/vnd.vel+json": { source: "iana", compressible: !0 },
  "application/vnd.verimatrix.vcas": { source: "iana" },
  "application/vnd.veritone.aion+json": { source: "iana", compressible: !0 },
  "application/vnd.veryant.thin": { source: "iana" },
  "application/vnd.ves.encrypted": { source: "iana" },
  "application/vnd.vidsoft.vidconference": { source: "iana" },
  "application/vnd.visio": { source: "iana", extensions: ["vsd", "vst", "vss", "vsw"] },
  "application/vnd.visionary": { source: "iana", extensions: ["vis"] },
  "application/vnd.vividence.scriptfile": { source: "iana" },
  "application/vnd.vsf": { source: "iana", extensions: ["vsf"] },
  "application/vnd.wap.sic": { source: "iana" },
  "application/vnd.wap.slc": { source: "iana" },
  "application/vnd.wap.wbxml": { source: "iana", charset: "UTF-8", extensions: ["wbxml"] },
  "application/vnd.wap.wmlc": { source: "iana", extensions: ["wmlc"] },
  "application/vnd.wap.wmlscriptc": { source: "iana", extensions: ["wmlsc"] },
  "application/vnd.webturbo": { source: "iana", extensions: ["wtb"] },
  "application/vnd.wfa.dpp": { source: "iana" },
  "application/vnd.wfa.p2p": { source: "iana" },
  "application/vnd.wfa.wsc": { source: "iana" },
  "application/vnd.windows.devicepairing": { source: "iana" },
  "application/vnd.wmc": { source: "iana" },
  "application/vnd.wmf.bootstrap": { source: "iana" },
  "application/vnd.wolfram.mathematica": { source: "iana" },
  "application/vnd.wolfram.mathematica.package": { source: "iana" },
  "application/vnd.wolfram.player": { source: "iana", extensions: ["nbp"] },
  "application/vnd.wordperfect": { source: "iana", extensions: ["wpd"] },
  "application/vnd.wqd": { source: "iana", extensions: ["wqd"] },
  "application/vnd.wrq-hp3000-labelled": { source: "iana" },
  "application/vnd.wt.stf": { source: "iana", extensions: ["stf"] },
  "application/vnd.wv.csp+wbxml": { source: "iana" },
  "application/vnd.wv.csp+xml": { source: "iana", compressible: !0 },
  "application/vnd.wv.ssp+xml": { source: "iana", compressible: !0 },
  "application/vnd.xacml+json": { source: "iana", compressible: !0 },
  "application/vnd.xara": { source: "iana", extensions: ["xar"] },
  "application/vnd.xfdl": { source: "iana", extensions: ["xfdl"] },
  "application/vnd.xfdl.webform": { source: "iana" },
  "application/vnd.xmi+xml": { source: "iana", compressible: !0 },
  "application/vnd.xmpie.cpkg": { source: "iana" },
  "application/vnd.xmpie.dpkg": { source: "iana" },
  "application/vnd.xmpie.plan": { source: "iana" },
  "application/vnd.xmpie.ppkg": { source: "iana" },
  "application/vnd.xmpie.xlim": { source: "iana" },
  "application/vnd.yamaha.hv-dic": { source: "iana", extensions: ["hvd"] },
  "application/vnd.yamaha.hv-script": { source: "iana", extensions: ["hvs"] },
  "application/vnd.yamaha.hv-voice": { source: "iana", extensions: ["hvp"] },
  "application/vnd.yamaha.openscoreformat": { source: "iana", extensions: ["osf"] },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": { source: "iana", compressible: !0, extensions: ["osfpvg"] },
  "application/vnd.yamaha.remote-setup": { source: "iana" },
  "application/vnd.yamaha.smaf-audio": { source: "iana", extensions: ["saf"] },
  "application/vnd.yamaha.smaf-phrase": { source: "iana", extensions: ["spf"] },
  "application/vnd.yamaha.through-ngn": { source: "iana" },
  "application/vnd.yamaha.tunnel-udpencap": { source: "iana" },
  "application/vnd.yaoweme": { source: "iana" },
  "application/vnd.yellowriver-custom-menu": { source: "iana", extensions: ["cmp"] },
  "application/vnd.youtube.yt": { source: "iana" },
  "application/vnd.zul": { source: "iana", extensions: ["zir", "zirz"] },
  "application/vnd.zzazz.deck+xml": { source: "iana", compressible: !0, extensions: ["zaz"] },
  "application/voicexml+xml": { source: "iana", compressible: !0, extensions: ["vxml"] },
  "application/voucher-cms+json": { source: "iana", compressible: !0 },
  "application/vq-rtcpxr": { source: "iana" },
  "application/wasm": { source: "iana", compressible: !0, extensions: ["wasm"] },
  "application/watcherinfo+xml": { source: "iana", compressible: !0, extensions: ["wif"] },
  "application/webpush-options+json": { source: "iana", compressible: !0 },
  "application/whoispp-query": { source: "iana" },
  "application/whoispp-response": { source: "iana" },
  "application/widget": { source: "iana", extensions: ["wgt"] },
  "application/winhlp": { source: "apache", extensions: ["hlp"] },
  "application/wita": { source: "iana" },
  "application/wordperfect5.1": { source: "iana" },
  "application/wsdl+xml": { source: "iana", compressible: !0, extensions: ["wsdl"] },
  "application/wspolicy+xml": { source: "iana", compressible: !0, extensions: ["wspolicy"] },
  "application/x-7z-compressed": { source: "apache", compressible: !1, extensions: ["7z"] },
  "application/x-abiword": { source: "apache", extensions: ["abw"] },
  "application/x-ace-compressed": { source: "apache", extensions: ["ace"] },
  "application/x-amf": { source: "apache" },
  "application/x-apple-diskimage": { source: "apache", extensions: ["dmg"] },
  "application/x-arj": { compressible: !1, extensions: ["arj"] },
  "application/x-authorware-bin": { source: "apache", extensions: ["aab", "x32", "u32", "vox"] },
  "application/x-authorware-map": { source: "apache", extensions: ["aam"] },
  "application/x-authorware-seg": { source: "apache", extensions: ["aas"] },
  "application/x-bcpio": { source: "apache", extensions: ["bcpio"] },
  "application/x-bdoc": { compressible: !1, extensions: ["bdoc"] },
  "application/x-bittorrent": { source: "apache", extensions: ["torrent"] },
  "application/x-blorb": { source: "apache", extensions: ["blb", "blorb"] },
  "application/x-bzip": { source: "apache", compressible: !1, extensions: ["bz"] },
  "application/x-bzip2": { source: "apache", compressible: !1, extensions: ["bz2", "boz"] },
  "application/x-cbr": { source: "apache", extensions: ["cbr", "cba", "cbt", "cbz", "cb7"] },
  "application/x-cdlink": { source: "apache", extensions: ["vcd"] },
  "application/x-cfs-compressed": { source: "apache", extensions: ["cfs"] },
  "application/x-chat": { source: "apache", extensions: ["chat"] },
  "application/x-chess-pgn": { source: "apache", extensions: ["pgn"] },
  "application/x-chrome-extension": { extensions: ["crx"] },
  "application/x-cocoa": { source: "nginx", extensions: ["cco"] },
  "application/x-compress": { source: "apache" },
  "application/x-conference": { source: "apache", extensions: ["nsc"] },
  "application/x-cpio": { source: "apache", extensions: ["cpio"] },
  "application/x-csh": { source: "apache", extensions: ["csh"] },
  "application/x-deb": { compressible: !1 },
  "application/x-debian-package": { source: "apache", extensions: ["deb", "udeb"] },
  "application/x-dgc-compressed": { source: "apache", extensions: ["dgc"] },
  "application/x-director": { source: "apache", extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"] },
  "application/x-doom": { source: "apache", extensions: ["wad"] },
  "application/x-dtbncx+xml": { source: "apache", compressible: !0, extensions: ["ncx"] },
  "application/x-dtbook+xml": { source: "apache", compressible: !0, extensions: ["dtb"] },
  "application/x-dtbresource+xml": { source: "apache", compressible: !0, extensions: ["res"] },
  "application/x-dvi": { source: "apache", compressible: !1, extensions: ["dvi"] },
  "application/x-envoy": { source: "apache", extensions: ["evy"] },
  "application/x-eva": { source: "apache", extensions: ["eva"] },
  "application/x-font-bdf": { source: "apache", extensions: ["bdf"] },
  "application/x-font-dos": { source: "apache" },
  "application/x-font-framemaker": { source: "apache" },
  "application/x-font-ghostscript": { source: "apache", extensions: ["gsf"] },
  "application/x-font-libgrx": { source: "apache" },
  "application/x-font-linux-psf": { source: "apache", extensions: ["psf"] },
  "application/x-font-pcf": { source: "apache", extensions: ["pcf"] },
  "application/x-font-snf": { source: "apache", extensions: ["snf"] },
  "application/x-font-speedo": { source: "apache" },
  "application/x-font-sunos-news": { source: "apache" },
  "application/x-font-type1": { source: "apache", extensions: ["pfa", "pfb", "pfm", "afm"] },
  "application/x-font-vfont": { source: "apache" },
  "application/x-freearc": { source: "apache", extensions: ["arc"] },
  "application/x-futuresplash": { source: "apache", extensions: ["spl"] },
  "application/x-gca-compressed": { source: "apache", extensions: ["gca"] },
  "application/x-glulx": { source: "apache", extensions: ["ulx"] },
  "application/x-gnumeric": { source: "apache", extensions: ["gnumeric"] },
  "application/x-gramps-xml": { source: "apache", extensions: ["gramps"] },
  "application/x-gtar": { source: "apache", extensions: ["gtar"] },
  "application/x-gzip": { source: "apache" },
  "application/x-hdf": { source: "apache", extensions: ["hdf"] },
  "application/x-httpd-php": { compressible: !0, extensions: ["php"] },
  "application/x-install-instructions": { source: "apache", extensions: ["install"] },
  "application/x-iso9660-image": { source: "apache", extensions: ["iso"] },
  "application/x-iwork-keynote-sffkey": { extensions: ["key"] },
  "application/x-iwork-numbers-sffnumbers": { extensions: ["numbers"] },
  "application/x-iwork-pages-sffpages": { extensions: ["pages"] },
  "application/x-java-archive-diff": { source: "nginx", extensions: ["jardiff"] },
  "application/x-java-jnlp-file": { source: "apache", compressible: !1, extensions: ["jnlp"] },
  "application/x-javascript": { compressible: !0 },
  "application/x-keepass2": { extensions: ["kdbx"] },
  "application/x-latex": { source: "apache", compressible: !1, extensions: ["latex"] },
  "application/x-lua-bytecode": { extensions: ["luac"] },
  "application/x-lzh-compressed": { source: "apache", extensions: ["lzh", "lha"] },
  "application/x-makeself": { source: "nginx", extensions: ["run"] },
  "application/x-mie": { source: "apache", extensions: ["mie"] },
  "application/x-mobipocket-ebook": { source: "apache", extensions: ["prc", "mobi"] },
  "application/x-mpegurl": { compressible: !1 },
  "application/x-ms-application": { source: "apache", extensions: ["application"] },
  "application/x-ms-shortcut": { source: "apache", extensions: ["lnk"] },
  "application/x-ms-wmd": { source: "apache", extensions: ["wmd"] },
  "application/x-ms-wmz": { source: "apache", extensions: ["wmz"] },
  "application/x-ms-xbap": { source: "apache", extensions: ["xbap"] },
  "application/x-msaccess": { source: "apache", extensions: ["mdb"] },
  "application/x-msbinder": { source: "apache", extensions: ["obd"] },
  "application/x-mscardfile": { source: "apache", extensions: ["crd"] },
  "application/x-msclip": { source: "apache", extensions: ["clp"] },
  "application/x-msdos-program": { extensions: ["exe"] },
  "application/x-msdownload": { source: "apache", extensions: ["exe", "dll", "com", "bat", "msi"] },
  "application/x-msmediaview": { source: "apache", extensions: ["mvb", "m13", "m14"] },
  "application/x-msmetafile": { source: "apache", extensions: ["wmf", "wmz", "emf", "emz"] },
  "application/x-msmoney": { source: "apache", extensions: ["mny"] },
  "application/x-mspublisher": { source: "apache", extensions: ["pub"] },
  "application/x-msschedule": { source: "apache", extensions: ["scd"] },
  "application/x-msterminal": { source: "apache", extensions: ["trm"] },
  "application/x-mswrite": { source: "apache", extensions: ["wri"] },
  "application/x-netcdf": { source: "apache", extensions: ["nc", "cdf"] },
  "application/x-ns-proxy-autoconfig": { compressible: !0, extensions: ["pac"] },
  "application/x-nzb": { source: "apache", extensions: ["nzb"] },
  "application/x-perl": { source: "nginx", extensions: ["pl", "pm"] },
  "application/x-pilot": { source: "nginx", extensions: ["prc", "pdb"] },
  "application/x-pkcs12": { source: "apache", compressible: !1, extensions: ["p12", "pfx"] },
  "application/x-pkcs7-certificates": { source: "apache", extensions: ["p7b", "spc"] },
  "application/x-pkcs7-certreqresp": { source: "apache", extensions: ["p7r"] },
  "application/x-pki-message": { source: "iana" },
  "application/x-rar-compressed": { source: "apache", compressible: !1, extensions: ["rar"] },
  "application/x-redhat-package-manager": { source: "nginx", extensions: ["rpm"] },
  "application/x-research-info-systems": { source: "apache", extensions: ["ris"] },
  "application/x-sea": { source: "nginx", extensions: ["sea"] },
  "application/x-sh": { source: "apache", compressible: !0, extensions: ["sh"] },
  "application/x-shar": { source: "apache", extensions: ["shar"] },
  "application/x-shockwave-flash": { source: "apache", compressible: !1, extensions: ["swf"] },
  "application/x-silverlight-app": { source: "apache", extensions: ["xap"] },
  "application/x-sql": { source: "apache", extensions: ["sql"] },
  "application/x-stuffit": { source: "apache", compressible: !1, extensions: ["sit"] },
  "application/x-stuffitx": { source: "apache", extensions: ["sitx"] },
  "application/x-subrip": { source: "apache", extensions: ["srt"] },
  "application/x-sv4cpio": { source: "apache", extensions: ["sv4cpio"] },
  "application/x-sv4crc": { source: "apache", extensions: ["sv4crc"] },
  "application/x-t3vm-image": { source: "apache", extensions: ["t3"] },
  "application/x-tads": { source: "apache", extensions: ["gam"] },
  "application/x-tar": { source: "apache", compressible: !0, extensions: ["tar"] },
  "application/x-tcl": { source: "apache", extensions: ["tcl", "tk"] },
  "application/x-tex": { source: "apache", extensions: ["tex"] },
  "application/x-tex-tfm": { source: "apache", extensions: ["tfm"] },
  "application/x-texinfo": { source: "apache", extensions: ["texinfo", "texi"] },
  "application/x-tgif": { source: "apache", extensions: ["obj"] },
  "application/x-ustar": { source: "apache", extensions: ["ustar"] },
  "application/x-virtualbox-hdd": { compressible: !0, extensions: ["hdd"] },
  "application/x-virtualbox-ova": { compressible: !0, extensions: ["ova"] },
  "application/x-virtualbox-ovf": { compressible: !0, extensions: ["ovf"] },
  "application/x-virtualbox-vbox": { compressible: !0, extensions: ["vbox"] },
  "application/x-virtualbox-vbox-extpack": { compressible: !1, extensions: ["vbox-extpack"] },
  "application/x-virtualbox-vdi": { compressible: !0, extensions: ["vdi"] },
  "application/x-virtualbox-vhd": { compressible: !0, extensions: ["vhd"] },
  "application/x-virtualbox-vmdk": { compressible: !0, extensions: ["vmdk"] },
  "application/x-wais-source": { source: "apache", extensions: ["src"] },
  "application/x-web-app-manifest+json": { compressible: !0, extensions: ["webapp"] },
  "application/x-www-form-urlencoded": { source: "iana", compressible: !0 },
  "application/x-x509-ca-cert": { source: "iana", extensions: ["der", "crt", "pem"] },
  "application/x-x509-ca-ra-cert": { source: "iana" },
  "application/x-x509-next-ca-cert": { source: "iana" },
  "application/x-xfig": { source: "apache", extensions: ["fig"] },
  "application/x-xliff+xml": { source: "apache", compressible: !0, extensions: ["xlf"] },
  "application/x-xpinstall": { source: "apache", compressible: !1, extensions: ["xpi"] },
  "application/x-xz": { source: "apache", extensions: ["xz"] },
  "application/x-zmachine": { source: "apache", extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"] },
  "application/x400-bp": { source: "iana" },
  "application/xacml+xml": { source: "iana", compressible: !0 },
  "application/xaml+xml": { source: "apache", compressible: !0, extensions: ["xaml"] },
  "application/xcap-att+xml": { source: "iana", compressible: !0, extensions: ["xav"] },
  "application/xcap-caps+xml": { source: "iana", compressible: !0, extensions: ["xca"] },
  "application/xcap-diff+xml": { source: "iana", compressible: !0, extensions: ["xdf"] },
  "application/xcap-el+xml": { source: "iana", compressible: !0, extensions: ["xel"] },
  "application/xcap-error+xml": { source: "iana", compressible: !0 },
  "application/xcap-ns+xml": { source: "iana", compressible: !0, extensions: ["xns"] },
  "application/xcon-conference-info+xml": { source: "iana", compressible: !0 },
  "application/xcon-conference-info-diff+xml": { source: "iana", compressible: !0 },
  "application/xenc+xml": { source: "iana", compressible: !0, extensions: ["xenc"] },
  "application/xhtml+xml": { source: "iana", compressible: !0, extensions: ["xhtml", "xht"] },
  "application/xhtml-voice+xml": { source: "apache", compressible: !0 },
  "application/xliff+xml": { source: "iana", compressible: !0, extensions: ["xlf"] },
  "application/xml": { source: "iana", compressible: !0, extensions: ["xml", "xsl", "xsd", "rng"] },
  "application/xml-dtd": { source: "iana", compressible: !0, extensions: ["dtd"] },
  "application/xml-external-parsed-entity": { source: "iana" },
  "application/xml-patch+xml": { source: "iana", compressible: !0 },
  "application/xmpp+xml": { source: "iana", compressible: !0 },
  "application/xop+xml": { source: "iana", compressible: !0, extensions: ["xop"] },
  "application/xproc+xml": { source: "apache", compressible: !0, extensions: ["xpl"] },
  "application/xslt+xml": { source: "iana", compressible: !0, extensions: ["xsl", "xslt"] },
  "application/xspf+xml": { source: "apache", compressible: !0, extensions: ["xspf"] },
  "application/xv+xml": { source: "iana", compressible: !0, extensions: ["mxml", "xhvml", "xvml", "xvm"] },
  "application/yang": { source: "iana", extensions: ["yang"] },
  "application/yang-data+json": { source: "iana", compressible: !0 },
  "application/yang-data+xml": { source: "iana", compressible: !0 },
  "application/yang-patch+json": { source: "iana", compressible: !0 },
  "application/yang-patch+xml": { source: "iana", compressible: !0 },
  "application/yin+xml": { source: "iana", compressible: !0, extensions: ["yin"] },
  "application/zip": { source: "iana", compressible: !1, extensions: ["zip"] },
  "application/zlib": { source: "iana" },
  "application/zstd": { source: "iana" },
  "audio/1d-interleaved-parityfec": { source: "iana" },
  "audio/32kadpcm": { source: "iana" },
  "audio/3gpp": { source: "iana", compressible: !1, extensions: ["3gpp"] },
  "audio/3gpp2": { source: "iana" },
  "audio/aac": { source: "iana" },
  "audio/ac3": { source: "iana" },
  "audio/adpcm": { source: "apache", extensions: ["adp"] },
  "audio/amr": { source: "iana", extensions: ["amr"] },
  "audio/amr-wb": { source: "iana" },
  "audio/amr-wb+": { source: "iana" },
  "audio/aptx": { source: "iana" },
  "audio/asc": { source: "iana" },
  "audio/atrac-advanced-lossless": { source: "iana" },
  "audio/atrac-x": { source: "iana" },
  "audio/atrac3": { source: "iana" },
  "audio/basic": { source: "iana", compressible: !1, extensions: ["au", "snd"] },
  "audio/bv16": { source: "iana" },
  "audio/bv32": { source: "iana" },
  "audio/clearmode": { source: "iana" },
  "audio/cn": { source: "iana" },
  "audio/dat12": { source: "iana" },
  "audio/dls": { source: "iana" },
  "audio/dsr-es201108": { source: "iana" },
  "audio/dsr-es202050": { source: "iana" },
  "audio/dsr-es202211": { source: "iana" },
  "audio/dsr-es202212": { source: "iana" },
  "audio/dv": { source: "iana" },
  "audio/dvi4": { source: "iana" },
  "audio/eac3": { source: "iana" },
  "audio/encaprtp": { source: "iana" },
  "audio/evrc": { source: "iana" },
  "audio/evrc-qcp": { source: "iana" },
  "audio/evrc0": { source: "iana" },
  "audio/evrc1": { source: "iana" },
  "audio/evrcb": { source: "iana" },
  "audio/evrcb0": { source: "iana" },
  "audio/evrcb1": { source: "iana" },
  "audio/evrcnw": { source: "iana" },
  "audio/evrcnw0": { source: "iana" },
  "audio/evrcnw1": { source: "iana" },
  "audio/evrcwb": { source: "iana" },
  "audio/evrcwb0": { source: "iana" },
  "audio/evrcwb1": { source: "iana" },
  "audio/evs": { source: "iana" },
  "audio/flexfec": { source: "iana" },
  "audio/fwdred": { source: "iana" },
  "audio/g711-0": { source: "iana" },
  "audio/g719": { source: "iana" },
  "audio/g722": { source: "iana" },
  "audio/g7221": { source: "iana" },
  "audio/g723": { source: "iana" },
  "audio/g726-16": { source: "iana" },
  "audio/g726-24": { source: "iana" },
  "audio/g726-32": { source: "iana" },
  "audio/g726-40": { source: "iana" },
  "audio/g728": { source: "iana" },
  "audio/g729": { source: "iana" },
  "audio/g7291": { source: "iana" },
  "audio/g729d": { source: "iana" },
  "audio/g729e": { source: "iana" },
  "audio/gsm": { source: "iana" },
  "audio/gsm-efr": { source: "iana" },
  "audio/gsm-hr-08": { source: "iana" },
  "audio/ilbc": { source: "iana" },
  "audio/ip-mr_v2.5": { source: "iana" },
  "audio/isac": { source: "apache" },
  "audio/l16": { source: "iana" },
  "audio/l20": { source: "iana" },
  "audio/l24": { source: "iana", compressible: !1 },
  "audio/l8": { source: "iana" },
  "audio/lpc": { source: "iana" },
  "audio/melp": { source: "iana" },
  "audio/melp1200": { source: "iana" },
  "audio/melp2400": { source: "iana" },
  "audio/melp600": { source: "iana" },
  "audio/mhas": { source: "iana" },
  "audio/midi": { source: "apache", extensions: ["mid", "midi", "kar", "rmi"] },
  "audio/mobile-xmf": { source: "iana", extensions: ["mxmf"] },
  "audio/mp3": { compressible: !1, extensions: ["mp3"] },
  "audio/mp4": { source: "iana", compressible: !1, extensions: ["m4a", "mp4a"] },
  "audio/mp4a-latm": { source: "iana" },
  "audio/mpa": { source: "iana" },
  "audio/mpa-robust": { source: "iana" },
  "audio/mpeg": { source: "iana", compressible: !1, extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"] },
  "audio/mpeg4-generic": { source: "iana" },
  "audio/musepack": { source: "apache" },
  "audio/ogg": { source: "iana", compressible: !1, extensions: ["oga", "ogg", "spx", "opus"] },
  "audio/opus": { source: "iana" },
  "audio/parityfec": { source: "iana" },
  "audio/pcma": { source: "iana" },
  "audio/pcma-wb": { source: "iana" },
  "audio/pcmu": { source: "iana" },
  "audio/pcmu-wb": { source: "iana" },
  "audio/prs.sid": { source: "iana" },
  "audio/qcelp": { source: "iana" },
  "audio/raptorfec": { source: "iana" },
  "audio/red": { source: "iana" },
  "audio/rtp-enc-aescm128": { source: "iana" },
  "audio/rtp-midi": { source: "iana" },
  "audio/rtploopback": { source: "iana" },
  "audio/rtx": { source: "iana" },
  "audio/s3m": { source: "apache", extensions: ["s3m"] },
  "audio/scip": { source: "iana" },
  "audio/silk": { source: "apache", extensions: ["sil"] },
  "audio/smv": { source: "iana" },
  "audio/smv-qcp": { source: "iana" },
  "audio/smv0": { source: "iana" },
  "audio/sofa": { source: "iana" },
  "audio/sp-midi": { source: "iana" },
  "audio/speex": { source: "iana" },
  "audio/t140c": { source: "iana" },
  "audio/t38": { source: "iana" },
  "audio/telephone-event": { source: "iana" },
  "audio/tetra_acelp": { source: "iana" },
  "audio/tetra_acelp_bb": { source: "iana" },
  "audio/tone": { source: "iana" },
  "audio/tsvcis": { source: "iana" },
  "audio/uemclip": { source: "iana" },
  "audio/ulpfec": { source: "iana" },
  "audio/usac": { source: "iana" },
  "audio/vdvi": { source: "iana" },
  "audio/vmr-wb": { source: "iana" },
  "audio/vnd.3gpp.iufp": { source: "iana" },
  "audio/vnd.4sb": { source: "iana" },
  "audio/vnd.audiokoz": { source: "iana" },
  "audio/vnd.celp": { source: "iana" },
  "audio/vnd.cisco.nse": { source: "iana" },
  "audio/vnd.cmles.radio-events": { source: "iana" },
  "audio/vnd.cns.anp1": { source: "iana" },
  "audio/vnd.cns.inf1": { source: "iana" },
  "audio/vnd.dece.audio": { source: "iana", extensions: ["uva", "uvva"] },
  "audio/vnd.digital-winds": { source: "iana", extensions: ["eol"] },
  "audio/vnd.dlna.adts": { source: "iana" },
  "audio/vnd.dolby.heaac.1": { source: "iana" },
  "audio/vnd.dolby.heaac.2": { source: "iana" },
  "audio/vnd.dolby.mlp": { source: "iana" },
  "audio/vnd.dolby.mps": { source: "iana" },
  "audio/vnd.dolby.pl2": { source: "iana" },
  "audio/vnd.dolby.pl2x": { source: "iana" },
  "audio/vnd.dolby.pl2z": { source: "iana" },
  "audio/vnd.dolby.pulse.1": { source: "iana" },
  "audio/vnd.dra": { source: "iana", extensions: ["dra"] },
  "audio/vnd.dts": { source: "iana", extensions: ["dts"] },
  "audio/vnd.dts.hd": { source: "iana", extensions: ["dtshd"] },
  "audio/vnd.dts.uhd": { source: "iana" },
  "audio/vnd.dvb.file": { source: "iana" },
  "audio/vnd.everad.plj": { source: "iana" },
  "audio/vnd.hns.audio": { source: "iana" },
  "audio/vnd.lucent.voice": { source: "iana", extensions: ["lvp"] },
  "audio/vnd.ms-playready.media.pya": { source: "iana", extensions: ["pya"] },
  "audio/vnd.nokia.mobile-xmf": { source: "iana" },
  "audio/vnd.nortel.vbk": { source: "iana" },
  "audio/vnd.nuera.ecelp4800": { source: "iana", extensions: ["ecelp4800"] },
  "audio/vnd.nuera.ecelp7470": { source: "iana", extensions: ["ecelp7470"] },
  "audio/vnd.nuera.ecelp9600": { source: "iana", extensions: ["ecelp9600"] },
  "audio/vnd.octel.sbc": { source: "iana" },
  "audio/vnd.presonus.multitrack": { source: "iana" },
  "audio/vnd.qcelp": { source: "iana" },
  "audio/vnd.rhetorex.32kadpcm": { source: "iana" },
  "audio/vnd.rip": { source: "iana", extensions: ["rip"] },
  "audio/vnd.rn-realaudio": { compressible: !1 },
  "audio/vnd.sealedmedia.softseal.mpeg": { source: "iana" },
  "audio/vnd.vmx.cvsd": { source: "iana" },
  "audio/vnd.wave": { compressible: !1 },
  "audio/vorbis": { source: "iana", compressible: !1 },
  "audio/vorbis-config": { source: "iana" },
  "audio/wav": { compressible: !1, extensions: ["wav"] },
  "audio/wave": { compressible: !1, extensions: ["wav"] },
  "audio/webm": { source: "apache", compressible: !1, extensions: ["weba"] },
  "audio/x-aac": { source: "apache", compressible: !1, extensions: ["aac"] },
  "audio/x-aiff": { source: "apache", extensions: ["aif", "aiff", "aifc"] },
  "audio/x-caf": { source: "apache", compressible: !1, extensions: ["caf"] },
  "audio/x-flac": { source: "apache", extensions: ["flac"] },
  "audio/x-m4a": { source: "nginx", extensions: ["m4a"] },
  "audio/x-matroska": { source: "apache", extensions: ["mka"] },
  "audio/x-mpegurl": { source: "apache", extensions: ["m3u"] },
  "audio/x-ms-wax": { source: "apache", extensions: ["wax"] },
  "audio/x-ms-wma": { source: "apache", extensions: ["wma"] },
  "audio/x-pn-realaudio": { source: "apache", extensions: ["ram", "ra"] },
  "audio/x-pn-realaudio-plugin": { source: "apache", extensions: ["rmp"] },
  "audio/x-realaudio": { source: "nginx", extensions: ["ra"] },
  "audio/x-tta": { source: "apache" },
  "audio/x-wav": { source: "apache", extensions: ["wav"] },
  "audio/xm": { source: "apache", extensions: ["xm"] },
  "chemical/x-cdx": { source: "apache", extensions: ["cdx"] },
  "chemical/x-cif": { source: "apache", extensions: ["cif"] },
  "chemical/x-cmdf": { source: "apache", extensions: ["cmdf"] },
  "chemical/x-cml": { source: "apache", extensions: ["cml"] },
  "chemical/x-csml": { source: "apache", extensions: ["csml"] },
  "chemical/x-pdb": { source: "apache" },
  "chemical/x-xyz": { source: "apache", extensions: ["xyz"] },
  "font/collection": { source: "iana", extensions: ["ttc"] },
  "font/otf": { source: "iana", compressible: !0, extensions: ["otf"] },
  "font/sfnt": { source: "iana" },
  "font/ttf": { source: "iana", compressible: !0, extensions: ["ttf"] },
  "font/woff": { source: "iana", extensions: ["woff"] },
  "font/woff2": { source: "iana", extensions: ["woff2"] },
  "image/aces": { source: "iana", extensions: ["exr"] },
  "image/apng": { compressible: !1, extensions: ["apng"] },
  "image/avci": { source: "iana", extensions: ["avci"] },
  "image/avcs": { source: "iana", extensions: ["avcs"] },
  "image/avif": { source: "iana", compressible: !1, extensions: ["avif"] },
  "image/bmp": { source: "iana", compressible: !0, extensions: ["bmp"] },
  "image/cgm": { source: "iana", extensions: ["cgm"] },
  "image/dicom-rle": { source: "iana", extensions: ["drle"] },
  "image/emf": { source: "iana", extensions: ["emf"] },
  "image/fits": { source: "iana", extensions: ["fits"] },
  "image/g3fax": { source: "iana", extensions: ["g3"] },
  "image/gif": { source: "iana", compressible: !1, extensions: ["gif"] },
  "image/heic": { source: "iana", extensions: ["heic"] },
  "image/heic-sequence": { source: "iana", extensions: ["heics"] },
  "image/heif": { source: "iana", extensions: ["heif"] },
  "image/heif-sequence": { source: "iana", extensions: ["heifs"] },
  "image/hej2k": { source: "iana", extensions: ["hej2"] },
  "image/hsj2": { source: "iana", extensions: ["hsj2"] },
  "image/ief": { source: "iana", extensions: ["ief"] },
  "image/jls": { source: "iana", extensions: ["jls"] },
  "image/jp2": { source: "iana", compressible: !1, extensions: ["jp2", "jpg2"] },
  "image/jpeg": { source: "iana", compressible: !1, extensions: ["jpeg", "jpg", "jpe"] },
  "image/jph": { source: "iana", extensions: ["jph"] },
  "image/jphc": { source: "iana", extensions: ["jhc"] },
  "image/jpm": { source: "iana", compressible: !1, extensions: ["jpm"] },
  "image/jpx": { source: "iana", compressible: !1, extensions: ["jpx", "jpf"] },
  "image/jxr": { source: "iana", extensions: ["jxr"] },
  "image/jxra": { source: "iana", extensions: ["jxra"] },
  "image/jxrs": { source: "iana", extensions: ["jxrs"] },
  "image/jxs": { source: "iana", extensions: ["jxs"] },
  "image/jxsc": { source: "iana", extensions: ["jxsc"] },
  "image/jxsi": { source: "iana", extensions: ["jxsi"] },
  "image/jxss": { source: "iana", extensions: ["jxss"] },
  "image/ktx": { source: "iana", extensions: ["ktx"] },
  "image/ktx2": { source: "iana", extensions: ["ktx2"] },
  "image/naplps": { source: "iana" },
  "image/pjpeg": { compressible: !1 },
  "image/png": { source: "iana", compressible: !1, extensions: ["png"] },
  "image/prs.btif": { source: "iana", extensions: ["btif"] },
  "image/prs.pti": { source: "iana", extensions: ["pti"] },
  "image/pwg-raster": { source: "iana" },
  "image/sgi": { source: "apache", extensions: ["sgi"] },
  "image/svg+xml": { source: "iana", compressible: !0, extensions: ["svg", "svgz"] },
  "image/t38": { source: "iana", extensions: ["t38"] },
  "image/tiff": { source: "iana", compressible: !1, extensions: ["tif", "tiff"] },
  "image/tiff-fx": { source: "iana", extensions: ["tfx"] },
  "image/vnd.adobe.photoshop": { source: "iana", compressible: !0, extensions: ["psd"] },
  "image/vnd.airzip.accelerator.azv": { source: "iana", extensions: ["azv"] },
  "image/vnd.cns.inf2": { source: "iana" },
  "image/vnd.dece.graphic": { source: "iana", extensions: ["uvi", "uvvi", "uvg", "uvvg"] },
  "image/vnd.djvu": { source: "iana", extensions: ["djvu", "djv"] },
  "image/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] },
  "image/vnd.dwg": { source: "iana", extensions: ["dwg"] },
  "image/vnd.dxf": { source: "iana", extensions: ["dxf"] },
  "image/vnd.fastbidsheet": { source: "iana", extensions: ["fbs"] },
  "image/vnd.fpx": { source: "iana", extensions: ["fpx"] },
  "image/vnd.fst": { source: "iana", extensions: ["fst"] },
  "image/vnd.fujixerox.edmics-mmr": { source: "iana", extensions: ["mmr"] },
  "image/vnd.fujixerox.edmics-rlc": { source: "iana", extensions: ["rlc"] },
  "image/vnd.globalgraphics.pgb": { source: "iana" },
  "image/vnd.microsoft.icon": { source: "iana", compressible: !0, extensions: ["ico"] },
  "image/vnd.mix": { source: "iana" },
  "image/vnd.mozilla.apng": { source: "iana" },
  "image/vnd.ms-dds": { compressible: !0, extensions: ["dds"] },
  "image/vnd.ms-modi": { source: "iana", extensions: ["mdi"] },
  "image/vnd.ms-photo": { source: "apache", extensions: ["wdp"] },
  "image/vnd.net-fpx": { source: "iana", extensions: ["npx"] },
  "image/vnd.pco.b16": { source: "iana", extensions: ["b16"] },
  "image/vnd.radiance": { source: "iana" },
  "image/vnd.sealed.png": { source: "iana" },
  "image/vnd.sealedmedia.softseal.gif": { source: "iana" },
  "image/vnd.sealedmedia.softseal.jpg": { source: "iana" },
  "image/vnd.svf": { source: "iana" },
  "image/vnd.tencent.tap": { source: "iana", extensions: ["tap"] },
  "image/vnd.valve.source.texture": { source: "iana", extensions: ["vtf"] },
  "image/vnd.wap.wbmp": { source: "iana", extensions: ["wbmp"] },
  "image/vnd.xiff": { source: "iana", extensions: ["xif"] },
  "image/vnd.zbrush.pcx": { source: "iana", extensions: ["pcx"] },
  "image/webp": { source: "apache", extensions: ["webp"] },
  "image/wmf": { source: "iana", extensions: ["wmf"] },
  "image/x-3ds": { source: "apache", extensions: ["3ds"] },
  "image/x-cmu-raster": { source: "apache", extensions: ["ras"] },
  "image/x-cmx": { source: "apache", extensions: ["cmx"] },
  "image/x-freehand": { source: "apache", extensions: ["fh", "fhc", "fh4", "fh5", "fh7"] },
  "image/x-icon": { source: "apache", compressible: !0, extensions: ["ico"] },
  "image/x-jng": { source: "nginx", extensions: ["jng"] },
  "image/x-mrsid-image": { source: "apache", extensions: ["sid"] },
  "image/x-ms-bmp": { source: "nginx", compressible: !0, extensions: ["bmp"] },
  "image/x-pcx": { source: "apache", extensions: ["pcx"] },
  "image/x-pict": { source: "apache", extensions: ["pic", "pct"] },
  "image/x-portable-anymap": { source: "apache", extensions: ["pnm"] },
  "image/x-portable-bitmap": { source: "apache", extensions: ["pbm"] },
  "image/x-portable-graymap": { source: "apache", extensions: ["pgm"] },
  "image/x-portable-pixmap": { source: "apache", extensions: ["ppm"] },
  "image/x-rgb": { source: "apache", extensions: ["rgb"] },
  "image/x-tga": { source: "apache", extensions: ["tga"] },
  "image/x-xbitmap": { source: "apache", extensions: ["xbm"] },
  "image/x-xcf": { compressible: !1 },
  "image/x-xpixmap": { source: "apache", extensions: ["xpm"] },
  "image/x-xwindowdump": { source: "apache", extensions: ["xwd"] },
  "message/cpim": { source: "iana" },
  "message/delivery-status": { source: "iana" },
  "message/disposition-notification": { source: "iana", extensions: ["disposition-notification"] },
  "message/external-body": { source: "iana" },
  "message/feedback-report": { source: "iana" },
  "message/global": { source: "iana", extensions: ["u8msg"] },
  "message/global-delivery-status": { source: "iana", extensions: ["u8dsn"] },
  "message/global-disposition-notification": { source: "iana", extensions: ["u8mdn"] },
  "message/global-headers": { source: "iana", extensions: ["u8hdr"] },
  "message/http": { source: "iana", compressible: !1 },
  "message/imdn+xml": { source: "iana", compressible: !0 },
  "message/news": { source: "iana" },
  "message/partial": { source: "iana", compressible: !1 },
  "message/rfc822": { source: "iana", compressible: !0, extensions: ["eml", "mime"] },
  "message/s-http": { source: "iana" },
  "message/sip": { source: "iana" },
  "message/sipfrag": { source: "iana" },
  "message/tracking-status": { source: "iana" },
  "message/vnd.si.simp": { source: "iana" },
  "message/vnd.wfa.wsc": { source: "iana", extensions: ["wsc"] },
  "model/3mf": { source: "iana", extensions: ["3mf"] },
  "model/e57": { source: "iana" },
  "model/gltf+json": { source: "iana", compressible: !0, extensions: ["gltf"] },
  "model/gltf-binary": { source: "iana", compressible: !0, extensions: ["glb"] },
  "model/iges": { source: "iana", compressible: !1, extensions: ["igs", "iges"] },
  "model/mesh": { source: "iana", compressible: !1, extensions: ["msh", "mesh", "silo"] },
  "model/mtl": { source: "iana", extensions: ["mtl"] },
  "model/obj": { source: "iana", extensions: ["obj"] },
  "model/step": { source: "iana" },
  "model/step+xml": { source: "iana", compressible: !0, extensions: ["stpx"] },
  "model/step+zip": { source: "iana", compressible: !1, extensions: ["stpz"] },
  "model/step-xml+zip": { source: "iana", compressible: !1, extensions: ["stpxz"] },
  "model/stl": { source: "iana", extensions: ["stl"] },
  "model/vnd.collada+xml": { source: "iana", compressible: !0, extensions: ["dae"] },
  "model/vnd.dwf": { source: "iana", extensions: ["dwf"] },
  "model/vnd.flatland.3dml": { source: "iana" },
  "model/vnd.gdl": { source: "iana", extensions: ["gdl"] },
  "model/vnd.gs-gdl": { source: "apache" },
  "model/vnd.gs.gdl": { source: "iana" },
  "model/vnd.gtw": { source: "iana", extensions: ["gtw"] },
  "model/vnd.moml+xml": { source: "iana", compressible: !0 },
  "model/vnd.mts": { source: "iana", extensions: ["mts"] },
  "model/vnd.opengex": { source: "iana", extensions: ["ogex"] },
  "model/vnd.parasolid.transmit.binary": { source: "iana", extensions: ["x_b"] },
  "model/vnd.parasolid.transmit.text": { source: "iana", extensions: ["x_t"] },
  "model/vnd.pytha.pyox": { source: "iana" },
  "model/vnd.rosette.annotated-data-model": { source: "iana" },
  "model/vnd.sap.vds": { source: "iana", extensions: ["vds"] },
  "model/vnd.usdz+zip": { source: "iana", compressible: !1, extensions: ["usdz"] },
  "model/vnd.valve.source.compiled-map": { source: "iana", extensions: ["bsp"] },
  "model/vnd.vtu": { source: "iana", extensions: ["vtu"] },
  "model/vrml": { source: "iana", compressible: !1, extensions: ["wrl", "vrml"] },
  "model/x3d+binary": { source: "apache", compressible: !1, extensions: ["x3db", "x3dbz"] },
  "model/x3d+fastinfoset": { source: "iana", extensions: ["x3db"] },
  "model/x3d+vrml": { source: "apache", compressible: !1, extensions: ["x3dv", "x3dvz"] },
  "model/x3d+xml": { source: "iana", compressible: !0, extensions: ["x3d", "x3dz"] },
  "model/x3d-vrml": { source: "iana", extensions: ["x3dv"] },
  "multipart/alternative": { source: "iana", compressible: !1 },
  "multipart/appledouble": { source: "iana" },
  "multipart/byteranges": { source: "iana" },
  "multipart/digest": { source: "iana" },
  "multipart/encrypted": { source: "iana", compressible: !1 },
  "multipart/form-data": { source: "iana", compressible: !1 },
  "multipart/header-set": { source: "iana" },
  "multipart/mixed": { source: "iana" },
  "multipart/multilingual": { source: "iana" },
  "multipart/parallel": { source: "iana" },
  "multipart/related": { source: "iana", compressible: !1 },
  "multipart/report": { source: "iana" },
  "multipart/signed": { source: "iana", compressible: !1 },
  "multipart/vnd.bint.med-plus": { source: "iana" },
  "multipart/voice-message": { source: "iana" },
  "multipart/x-mixed-replace": { source: "iana" },
  "text/1d-interleaved-parityfec": { source: "iana" },
  "text/cache-manifest": { source: "iana", compressible: !0, extensions: ["appcache", "manifest"] },
  "text/calendar": { source: "iana", extensions: ["ics", "ifb"] },
  "text/calender": { compressible: !0 },
  "text/cmd": { compressible: !0 },
  "text/coffeescript": { extensions: ["coffee", "litcoffee"] },
  "text/cql": { source: "iana" },
  "text/cql-expression": { source: "iana" },
  "text/cql-identifier": { source: "iana" },
  "text/css": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["css"] },
  "text/csv": { source: "iana", compressible: !0, extensions: ["csv"] },
  "text/csv-schema": { source: "iana" },
  "text/directory": { source: "iana" },
  "text/dns": { source: "iana" },
  "text/ecmascript": { source: "iana" },
  "text/encaprtp": { source: "iana" },
  "text/enriched": { source: "iana" },
  "text/fhirpath": { source: "iana" },
  "text/flexfec": { source: "iana" },
  "text/fwdred": { source: "iana" },
  "text/gff3": { source: "iana" },
  "text/grammar-ref-list": { source: "iana" },
  "text/html": { source: "iana", compressible: !0, extensions: ["html", "htm", "shtml"] },
  "text/jade": { extensions: ["jade"] },
  "text/javascript": { source: "iana", compressible: !0 },
  "text/jcr-cnd": { source: "iana" },
  "text/jsx": { compressible: !0, extensions: ["jsx"] },
  "text/less": { compressible: !0, extensions: ["less"] },
  "text/markdown": { source: "iana", compressible: !0, extensions: ["markdown", "md"] },
  "text/mathml": { source: "nginx", extensions: ["mml"] },
  "text/mdx": { compressible: !0, extensions: ["mdx"] },
  "text/mizar": { source: "iana" },
  "text/n3": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["n3"] },
  "text/parameters": { source: "iana", charset: "UTF-8" },
  "text/parityfec": { source: "iana" },
  "text/plain": { source: "iana", compressible: !0, extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"] },
  "text/provenance-notation": { source: "iana", charset: "UTF-8" },
  "text/prs.fallenstein.rst": { source: "iana" },
  "text/prs.lines.tag": { source: "iana", extensions: ["dsc"] },
  "text/prs.prop.logic": { source: "iana" },
  "text/raptorfec": { source: "iana" },
  "text/red": { source: "iana" },
  "text/rfc822-headers": { source: "iana" },
  "text/richtext": { source: "iana", compressible: !0, extensions: ["rtx"] },
  "text/rtf": { source: "iana", compressible: !0, extensions: ["rtf"] },
  "text/rtp-enc-aescm128": { source: "iana" },
  "text/rtploopback": { source: "iana" },
  "text/rtx": { source: "iana" },
  "text/sgml": { source: "iana", extensions: ["sgml", "sgm"] },
  "text/shaclc": { source: "iana" },
  "text/shex": { source: "iana", extensions: ["shex"] },
  "text/slim": { extensions: ["slim", "slm"] },
  "text/spdx": { source: "iana", extensions: ["spdx"] },
  "text/strings": { source: "iana" },
  "text/stylus": { extensions: ["stylus", "styl"] },
  "text/t140": { source: "iana" },
  "text/tab-separated-values": { source: "iana", compressible: !0, extensions: ["tsv"] },
  "text/troff": { source: "iana", extensions: ["t", "tr", "roff", "man", "me", "ms"] },
  "text/turtle": { source: "iana", charset: "UTF-8", extensions: ["ttl"] },
  "text/ulpfec": { source: "iana" },
  "text/uri-list": { source: "iana", compressible: !0, extensions: ["uri", "uris", "urls"] },
  "text/vcard": { source: "iana", compressible: !0, extensions: ["vcard"] },
  "text/vnd.a": { source: "iana" },
  "text/vnd.abc": { source: "iana" },
  "text/vnd.ascii-art": { source: "iana" },
  "text/vnd.curl": { source: "iana", extensions: ["curl"] },
  "text/vnd.curl.dcurl": { source: "apache", extensions: ["dcurl"] },
  "text/vnd.curl.mcurl": { source: "apache", extensions: ["mcurl"] },
  "text/vnd.curl.scurl": { source: "apache", extensions: ["scurl"] },
  "text/vnd.debian.copyright": { source: "iana", charset: "UTF-8" },
  "text/vnd.dmclientscript": { source: "iana" },
  "text/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] },
  "text/vnd.esmertec.theme-descriptor": { source: "iana", charset: "UTF-8" },
  "text/vnd.familysearch.gedcom": { source: "iana", extensions: ["ged"] },
  "text/vnd.ficlab.flt": { source: "iana" },
  "text/vnd.fly": { source: "iana", extensions: ["fly"] },
  "text/vnd.fmi.flexstor": { source: "iana", extensions: ["flx"] },
  "text/vnd.gml": { source: "iana" },
  "text/vnd.graphviz": { source: "iana", extensions: ["gv"] },
  "text/vnd.hans": { source: "iana" },
  "text/vnd.hgl": { source: "iana" },
  "text/vnd.in3d.3dml": { source: "iana", extensions: ["3dml"] },
  "text/vnd.in3d.spot": { source: "iana", extensions: ["spot"] },
  "text/vnd.iptc.newsml": { source: "iana" },
  "text/vnd.iptc.nitf": { source: "iana" },
  "text/vnd.latex-z": { source: "iana" },
  "text/vnd.motorola.reflex": { source: "iana" },
  "text/vnd.ms-mediapackage": { source: "iana" },
  "text/vnd.net2phone.commcenter.command": { source: "iana" },
  "text/vnd.radisys.msml-basic-layout": { source: "iana" },
  "text/vnd.senx.warpscript": { source: "iana" },
  "text/vnd.si.uricatalogue": { source: "iana" },
  "text/vnd.sosi": { source: "iana" },
  "text/vnd.sun.j2me.app-descriptor": { source: "iana", charset: "UTF-8", extensions: ["jad"] },
  "text/vnd.trolltech.linguist": { source: "iana", charset: "UTF-8" },
  "text/vnd.wap.si": { source: "iana" },
  "text/vnd.wap.sl": { source: "iana" },
  "text/vnd.wap.wml": { source: "iana", extensions: ["wml"] },
  "text/vnd.wap.wmlscript": { source: "iana", extensions: ["wmls"] },
  "text/vtt": { source: "iana", charset: "UTF-8", compressible: !0, extensions: ["vtt"] },
  "text/x-asm": { source: "apache", extensions: ["s", "asm"] },
  "text/x-c": { source: "apache", extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"] },
  "text/x-component": { source: "nginx", extensions: ["htc"] },
  "text/x-fortran": { source: "apache", extensions: ["f", "for", "f77", "f90"] },
  "text/x-gwt-rpc": { compressible: !0 },
  "text/x-handlebars-template": { extensions: ["hbs"] },
  "text/x-java-source": { source: "apache", extensions: ["java"] },
  "text/x-jquery-tmpl": { compressible: !0 },
  "text/x-lua": { extensions: ["lua"] },
  "text/x-markdown": { compressible: !0, extensions: ["mkd"] },
  "text/x-nfo": { source: "apache", extensions: ["nfo"] },
  "text/x-opml": { source: "apache", extensions: ["opml"] },
  "text/x-org": { compressible: !0, extensions: ["org"] },
  "text/x-pascal": { source: "apache", extensions: ["p", "pas"] },
  "text/x-processing": { compressible: !0, extensions: ["pde"] },
  "text/x-sass": { extensions: ["sass"] },
  "text/x-scss": { extensions: ["scss"] },
  "text/x-setext": { source: "apache", extensions: ["etx"] },
  "text/x-sfv": { source: "apache", extensions: ["sfv"] },
  "text/x-suse-ymp": { compressible: !0, extensions: ["ymp"] },
  "text/x-uuencode": { source: "apache", extensions: ["uu"] },
  "text/x-vcalendar": { source: "apache", extensions: ["vcs"] },
  "text/x-vcard": { source: "apache", extensions: ["vcf"] },
  "text/xml": { source: "iana", compressible: !0, extensions: ["xml"] },
  "text/xml-external-parsed-entity": { source: "iana" },
  "text/yaml": { compressible: !0, extensions: ["yaml", "yml"] },
  "video/1d-interleaved-parityfec": { source: "iana" },
  "video/3gpp": { source: "iana", extensions: ["3gp", "3gpp"] },
  "video/3gpp-tt": { source: "iana" },
  "video/3gpp2": { source: "iana", extensions: ["3g2"] },
  "video/av1": { source: "iana" },
  "video/bmpeg": { source: "iana" },
  "video/bt656": { source: "iana" },
  "video/celb": { source: "iana" },
  "video/dv": { source: "iana" },
  "video/encaprtp": { source: "iana" },
  "video/ffv1": { source: "iana" },
  "video/flexfec": { source: "iana" },
  "video/h261": { source: "iana", extensions: ["h261"] },
  "video/h263": { source: "iana", extensions: ["h263"] },
  "video/h263-1998": { source: "iana" },
  "video/h263-2000": { source: "iana" },
  "video/h264": { source: "iana", extensions: ["h264"] },
  "video/h264-rcdo": { source: "iana" },
  "video/h264-svc": { source: "iana" },
  "video/h265": { source: "iana" },
  "video/iso.segment": { source: "iana", extensions: ["m4s"] },
  "video/jpeg": { source: "iana", extensions: ["jpgv"] },
  "video/jpeg2000": { source: "iana" },
  "video/jpm": { source: "apache", extensions: ["jpm", "jpgm"] },
  "video/jxsv": { source: "iana" },
  "video/mj2": { source: "iana", extensions: ["mj2", "mjp2"] },
  "video/mp1s": { source: "iana" },
  "video/mp2p": { source: "iana" },
  "video/mp2t": { source: "iana", extensions: ["ts"] },
  "video/mp4": { source: "iana", compressible: !1, extensions: ["mp4", "mp4v", "mpg4"] },
  "video/mp4v-es": { source: "iana" },
  "video/mpeg": { source: "iana", compressible: !1, extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"] },
  "video/mpeg4-generic": { source: "iana" },
  "video/mpv": { source: "iana" },
  "video/nv": { source: "iana" },
  "video/ogg": { source: "iana", compressible: !1, extensions: ["ogv"] },
  "video/parityfec": { source: "iana" },
  "video/pointer": { source: "iana" },
  "video/quicktime": { source: "iana", compressible: !1, extensions: ["qt", "mov"] },
  "video/raptorfec": { source: "iana" },
  "video/raw": { source: "iana" },
  "video/rtp-enc-aescm128": { source: "iana" },
  "video/rtploopback": { source: "iana" },
  "video/rtx": { source: "iana" },
  "video/scip": { source: "iana" },
  "video/smpte291": { source: "iana" },
  "video/smpte292m": { source: "iana" },
  "video/ulpfec": { source: "iana" },
  "video/vc1": { source: "iana" },
  "video/vc2": { source: "iana" },
  "video/vnd.cctv": { source: "iana" },
  "video/vnd.dece.hd": { source: "iana", extensions: ["uvh", "uvvh"] },
  "video/vnd.dece.mobile": { source: "iana", extensions: ["uvm", "uvvm"] },
  "video/vnd.dece.mp4": { source: "iana" },
  "video/vnd.dece.pd": { source: "iana", extensions: ["uvp", "uvvp"] },
  "video/vnd.dece.sd": { source: "iana", extensions: ["uvs", "uvvs"] },
  "video/vnd.dece.video": { source: "iana", extensions: ["uvv", "uvvv"] },
  "video/vnd.directv.mpeg": { source: "iana" },
  "video/vnd.directv.mpeg-tts": { source: "iana" },
  "video/vnd.dlna.mpeg-tts": { source: "iana" },
  "video/vnd.dvb.file": { source: "iana", extensions: ["dvb"] },
  "video/vnd.fvt": { source: "iana", extensions: ["fvt"] },
  "video/vnd.hns.video": { source: "iana" },
  "video/vnd.iptvforum.1dparityfec-1010": { source: "iana" },
  "video/vnd.iptvforum.1dparityfec-2005": { source: "iana" },
  "video/vnd.iptvforum.2dparityfec-1010": { source: "iana" },
  "video/vnd.iptvforum.2dparityfec-2005": { source: "iana" },
  "video/vnd.iptvforum.ttsavc": { source: "iana" },
  "video/vnd.iptvforum.ttsmpeg2": { source: "iana" },
  "video/vnd.motorola.video": { source: "iana" },
  "video/vnd.motorola.videop": { source: "iana" },
  "video/vnd.mpegurl": { source: "iana", extensions: ["mxu", "m4u"] },
  "video/vnd.ms-playready.media.pyv": { source: "iana", extensions: ["pyv"] },
  "video/vnd.nokia.interleaved-multimedia": { source: "iana" },
  "video/vnd.nokia.mp4vr": { source: "iana" },
  "video/vnd.nokia.videovoip": { source: "iana" },
  "video/vnd.objectvideo": { source: "iana" },
  "video/vnd.radgamettools.bink": { source: "iana" },
  "video/vnd.radgamettools.smacker": { source: "iana" },
  "video/vnd.sealed.mpeg1": { source: "iana" },
  "video/vnd.sealed.mpeg4": { source: "iana" },
  "video/vnd.sealed.swf": { source: "iana" },
  "video/vnd.sealedmedia.softseal.mov": { source: "iana" },
  "video/vnd.uvvu.mp4": { source: "iana", extensions: ["uvu", "uvvu"] },
  "video/vnd.vivo": { source: "iana", extensions: ["viv"] },
  "video/vnd.youtube.yt": { source: "iana" },
  "video/vp8": { source: "iana" },
  "video/vp9": { source: "iana" },
  "video/webm": { source: "apache", compressible: !1, extensions: ["webm"] },
  "video/x-f4v": { source: "apache", extensions: ["f4v"] },
  "video/x-fli": { source: "apache", extensions: ["fli"] },
  "video/x-flv": { source: "apache", compressible: !1, extensions: ["flv"] },
  "video/x-m4v": { source: "apache", extensions: ["m4v"] },
  "video/x-matroska": { source: "apache", compressible: !1, extensions: ["mkv", "mk3d", "mks"] },
  "video/x-mng": { source: "apache", extensions: ["mng"] },
  "video/x-ms-asf": { source: "apache", extensions: ["asf", "asx"] },
  "video/x-ms-vob": { source: "apache", extensions: ["vob"] },
  "video/x-ms-wm": { source: "apache", extensions: ["wm"] },
  "video/x-ms-wmv": { source: "apache", compressible: !1, extensions: ["wmv"] },
  "video/x-ms-wmx": { source: "apache", extensions: ["wmx"] },
  "video/x-ms-wvx": { source: "apache", extensions: ["wvx"] },
  "video/x-msvideo": { source: "apache", extensions: ["avi"] },
  "video/x-sgi-movie": { source: "apache", extensions: ["movie"] },
  "video/x-smv": { source: "apache", extensions: ["smv"] },
  "x-conference/x-cooltalk": { source: "apache", extensions: ["ice"] },
  "x-shader/x-fragment": { compressible: !0 },
  "x-shader/x-vertex": { compressible: !0 }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var ea, pu;
function um() {
  return pu || (pu = 1, ea = lm), ea;
}
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var du;
function pm() {
  return du || (du = 1, (function(o) {
    var m = um(), v = De.extname, h = /^\s*([^;\s]*)(?:;|\s|$)/, d = /^text\//i;
    o.charset = c, o.charsets = { lookup: c }, o.contentType = t, o.extension = a, o.extensions = /* @__PURE__ */ Object.create(null), o.lookup = n, o.types = /* @__PURE__ */ Object.create(null), e(o.extensions, o.types);
    function c(i) {
      if (!i || typeof i != "string")
        return !1;
      var l = h.exec(i), r = l && m[l[1].toLowerCase()];
      return r && r.charset ? r.charset : l && d.test(l[1]) ? "UTF-8" : !1;
    }
    function t(i) {
      if (!i || typeof i != "string")
        return !1;
      var l = i.indexOf("/") === -1 ? o.lookup(i) : i;
      if (!l)
        return !1;
      if (l.indexOf("charset") === -1) {
        var r = o.charset(l);
        r && (l += "; charset=" + r.toLowerCase());
      }
      return l;
    }
    function a(i) {
      if (!i || typeof i != "string")
        return !1;
      var l = h.exec(i), r = l && o.extensions[l[1].toLowerCase()];
      return !r || !r.length ? !1 : r[0];
    }
    function n(i) {
      if (!i || typeof i != "string")
        return !1;
      var l = v("x." + i).toLowerCase().substr(1);
      return l && o.types[l] || !1;
    }
    function e(i, l) {
      var r = ["nginx", "apache", void 0, "iana"];
      Object.keys(m).forEach(function(s) {
        var f = m[s], p = f.extensions;
        if (!(!p || !p.length)) {
          i[s] = p;
          for (var x = 0; x < p.length; x++) {
            var b = p[x];
            if (l[b]) {
              var C = r.indexOf(m[l[b]].source), S = r.indexOf(f.source);
              if (l[b] !== "application/octet-stream" && (C > S || C === S && l[b].substr(0, 12) === "application/"))
                continue;
            }
            l[b] = s;
          }
        }
      });
    }
  })(Zs)), Zs;
}
/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var ta, fu;
function Ma() {
  if (fu) return ta;
  fu = 1;
  var o = cm(), m = pm();
  ta = v;
  function v(c) {
    if (!(this instanceof v))
      return new v(c);
    this.headers = c.headers, this.negotiator = new o(c);
  }
  v.prototype.type = v.prototype.types = function(c) {
    var t = c;
    if (t && !Array.isArray(t)) {
      t = new Array(arguments.length);
      for (var a = 0; a < t.length; a++)
        t[a] = arguments[a];
    }
    if (!t || t.length === 0)
      return this.negotiator.mediaTypes();
    if (!this.headers.accept)
      return t[0];
    var n = t.map(h), e = this.negotiator.mediaTypes(n.filter(d)), i = e[0];
    return i ? t[n.indexOf(i)] : !1;
  }, v.prototype.encoding = v.prototype.encodings = function(c) {
    var t = c;
    if (t && !Array.isArray(t)) {
      t = new Array(arguments.length);
      for (var a = 0; a < t.length; a++)
        t[a] = arguments[a];
    }
    return !t || t.length === 0 ? this.negotiator.encodings() : this.negotiator.encodings(t)[0] || !1;
  }, v.prototype.charset = v.prototype.charsets = function(c) {
    var t = c;
    if (t && !Array.isArray(t)) {
      t = new Array(arguments.length);
      for (var a = 0; a < t.length; a++)
        t[a] = arguments[a];
    }
    return !t || t.length === 0 ? this.negotiator.charsets() : this.negotiator.charsets(t)[0] || !1;
  }, v.prototype.lang = v.prototype.langs = v.prototype.language = v.prototype.languages = function(c) {
    var t = c;
    if (t && !Array.isArray(t)) {
      t = new Array(arguments.length);
      for (var a = 0; a < t.length; a++)
        t[a] = arguments[a];
    }
    return !t || t.length === 0 ? this.negotiator.languages() : this.negotiator.languages(t)[0] || !1;
  };
  function h(c) {
    return c.indexOf("/") === -1 ? m.lookup(c) : c;
  }
  function d(c) {
    return typeof c == "string";
  }
  return ta;
}
var na = {}, $t = {}, ia = { exports: {} };
/*!
 * base64id v0.1.0
 */
var hu;
function Zp() {
  return hu || (hu = 1, (function(o, m) {
    var v = ht, h = function() {
    };
    h.prototype.getRandomBytes = function(d) {
      var c = 4096, t = this;
      if (d = d || 12, d > c)
        return v.randomBytes(d);
      var a = parseInt(c / d), n = parseInt(a * 0.85);
      if (!n || (this.bytesBufferIndex == null && (this.bytesBufferIndex = -1), this.bytesBufferIndex == a && (this.bytesBuffer = null, this.bytesBufferIndex = -1), (this.bytesBufferIndex == -1 || this.bytesBufferIndex > n) && (this.isGeneratingBytes || (this.isGeneratingBytes = !0, v.randomBytes(c, function(i, l) {
        t.bytesBuffer = l, t.bytesBufferIndex = 0, t.isGeneratingBytes = !1;
      })), this.bytesBufferIndex == -1)))
        return v.randomBytes(d);
      var e = this.bytesBuffer.slice(d * this.bytesBufferIndex, d * (this.bytesBufferIndex + 1));
      return this.bytesBufferIndex++, e;
    }, h.prototype.generateId = function() {
      var d = Buffer.alloc(15);
      return d.writeInt32BE ? (this.sequenceNumber = this.sequenceNumber + 1 | 0, d.writeInt32BE(this.sequenceNumber, 11), v.randomBytes ? this.getRandomBytes(12).copy(d) : [0, 4, 8].forEach(function(c) {
        d.writeInt32BE(Math.random() * Math.pow(2, 32) | 0, c);
      }), d.toString("base64").replace(/\//g, "_").replace(/\+/g, "-")) : Math.abs(Math.random() * Math.random() * Date.now() | 0).toString() + Math.abs(Math.random() * Math.random() * Date.now() | 0).toString();
    }, o.exports = new h();
  })(ia)), ia.exports;
}
var Ni = {}, Un = {}, qn = {}, ra = {}, sa = {}, yt = {}, mu;
function Ha() {
  if (mu) return yt;
  mu = 1, Object.defineProperty(yt, "__esModule", { value: !0 }), yt.ERROR_PACKET = yt.PACKET_TYPES_REVERSE = yt.PACKET_TYPES = void 0;
  const o = /* @__PURE__ */ Object.create(null);
  yt.PACKET_TYPES = o, o.open = "0", o.close = "1", o.ping = "2", o.pong = "3", o.message = "4", o.upgrade = "5", o.noop = "6";
  const m = /* @__PURE__ */ Object.create(null);
  yt.PACKET_TYPES_REVERSE = m, Object.keys(o).forEach((h) => {
    m[o[h]] = h;
  });
  const v = { type: "error", data: "parser error" };
  return yt.ERROR_PACKET = v, yt;
}
var vu;
function dm() {
  return vu || (vu = 1, (function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.encodePacket = void 0, o.encodePacketToBinary = c;
    const m = Ha(), v = ({ type: t, data: a }, n, e) => a instanceof ArrayBuffer || ArrayBuffer.isView(a) ? e(n ? a : "b" + h(a, !0).toString("base64")) : e(m.PACKET_TYPES[t] + (a || ""));
    o.encodePacket = v;
    const h = (t, a) => Buffer.isBuffer(t) || t instanceof Uint8Array && !a ? t : t instanceof ArrayBuffer ? Buffer.from(t) : Buffer.from(t.buffer, t.byteOffset, t.byteLength);
    let d;
    function c(t, a) {
      if (t.data instanceof ArrayBuffer || ArrayBuffer.isView(t.data))
        return a(h(t.data, !1));
      (0, o.encodePacket)(t, !0, (n) => {
        d || (d = new TextEncoder()), a(d.encode(n));
      });
    }
  })(sa)), sa;
}
var $n = {}, gu;
function fm() {
  if (gu) return $n;
  gu = 1, Object.defineProperty($n, "__esModule", { value: !0 }), $n.decodePacket = void 0;
  const o = Ha(), m = (h, d) => {
    if (typeof h != "string")
      return {
        type: "message",
        data: v(h, d)
      };
    const c = h.charAt(0);
    if (c === "b") {
      const t = Buffer.from(h.substring(1), "base64");
      return {
        type: "message",
        data: v(t, d)
      };
    }
    return o.PACKET_TYPES_REVERSE[c] ? h.length > 1 ? {
      type: o.PACKET_TYPES_REVERSE[c],
      data: h.substring(1)
    } : {
      type: o.PACKET_TYPES_REVERSE[c]
    } : o.ERROR_PACKET;
  };
  $n.decodePacket = m;
  const v = (h, d) => {
    switch (d) {
      case "arraybuffer":
        return h instanceof ArrayBuffer ? h : Buffer.isBuffer(h) ? h.buffer.slice(h.byteOffset, h.byteOffset + h.byteLength) : h.buffer;
      case "nodebuffer":
      default:
        return Buffer.isBuffer(h) ? h : Buffer.from(h);
    }
  };
  return $n;
}
var xu;
function Yi() {
  return xu || (xu = 1, (function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.decodePayload = o.decodePacket = o.encodePayload = o.encodePacket = o.protocol = void 0, o.createPacketEncoderStream = a, o.createPacketDecoderStream = l;
    const m = dm();
    Object.defineProperty(o, "encodePacket", { enumerable: !0, get: function() {
      return m.encodePacket;
    } });
    const v = fm();
    Object.defineProperty(o, "decodePacket", { enumerable: !0, get: function() {
      return v.decodePacket;
    } });
    const h = Ha(), d = "", c = (r, u) => {
      const s = r.length, f = new Array(s);
      let p = 0;
      r.forEach((x, b) => {
        (0, m.encodePacket)(x, !1, (C) => {
          f[b] = C, ++p === s && u(f.join(d));
        });
      });
    };
    o.encodePayload = c;
    const t = (r, u) => {
      const s = r.split(d), f = [];
      for (let p = 0; p < s.length; p++) {
        const x = (0, v.decodePacket)(s[p], u);
        if (f.push(x), x.type === "error")
          break;
      }
      return f;
    };
    o.decodePayload = t;
    function a() {
      return new TransformStream({
        transform(r, u) {
          (0, m.encodePacketToBinary)(r, (s) => {
            const f = s.length;
            let p;
            if (f < 126)
              p = new Uint8Array(1), new DataView(p.buffer).setUint8(0, f);
            else if (f < 65536) {
              p = new Uint8Array(3);
              const x = new DataView(p.buffer);
              x.setUint8(0, 126), x.setUint16(1, f);
            } else {
              p = new Uint8Array(9);
              const x = new DataView(p.buffer);
              x.setUint8(0, 127), x.setBigUint64(1, BigInt(f));
            }
            r.data && typeof r.data != "string" && (p[0] |= 128), u.enqueue(p), u.enqueue(s);
          });
        }
      });
    }
    let n;
    function e(r) {
      return r.reduce((u, s) => u + s.length, 0);
    }
    function i(r, u) {
      if (r[0].length === u)
        return r.shift();
      const s = new Uint8Array(u);
      let f = 0;
      for (let p = 0; p < u; p++)
        s[p] = r[0][f++], f === r[0].length && (r.shift(), f = 0);
      return r.length && f < r[0].length && (r[0] = r[0].slice(f)), s;
    }
    function l(r, u) {
      n || (n = new TextDecoder());
      const s = [];
      let f = 0, p = -1, x = !1;
      return new TransformStream({
        transform(b, C) {
          for (s.push(b); ; ) {
            if (f === 0) {
              if (e(s) < 1)
                break;
              const S = i(s, 1);
              x = (S[0] & 128) === 128, p = S[0] & 127, p < 126 ? f = 3 : p === 126 ? f = 1 : f = 2;
            } else if (f === 1) {
              if (e(s) < 2)
                break;
              const S = i(s, 2);
              p = new DataView(S.buffer, S.byteOffset, S.length).getUint16(0), f = 3;
            } else if (f === 2) {
              if (e(s) < 8)
                break;
              const S = i(s, 8), T = new DataView(S.buffer, S.byteOffset, S.length), y = T.getUint32(0);
              if (y > Math.pow(2, 21) - 1) {
                C.enqueue(h.ERROR_PACKET);
                break;
              }
              p = y * Math.pow(2, 32) + T.getUint32(4), f = 3;
            } else {
              if (e(s) < p)
                break;
              const S = i(s, p);
              C.enqueue((0, v.decodePacket)(x ? S : n.decode(S), u)), f = 0;
            }
            if (p === 0 || p > r) {
              C.enqueue(h.ERROR_PACKET);
              break;
            }
          }
        }
      });
    }
    o.protocol = 4;
  })(ra)), ra;
}
var aa = {};
/*! https://mths.be/utf8js v2.1.2 by @mathias */
var oa, yu;
function hm() {
  if (yu) return oa;
  yu = 1;
  var o = String.fromCharCode;
  function m(u) {
    for (var s = [], f = 0, p = u.length, x, b; f < p; )
      x = u.charCodeAt(f++), x >= 55296 && x <= 56319 && f < p ? (b = u.charCodeAt(f++), (b & 64512) == 56320 ? s.push(((x & 1023) << 10) + (b & 1023) + 65536) : (s.push(x), f--)) : s.push(x);
    return s;
  }
  function v(u) {
    for (var s = u.length, f = -1, p, x = ""; ++f < s; )
      p = u[f], p > 65535 && (p -= 65536, x += o(p >>> 10 & 1023 | 55296), p = 56320 | p & 1023), x += o(p);
    return x;
  }
  function h(u, s) {
    if (u >= 55296 && u <= 57343) {
      if (s)
        throw Error("Lone surrogate U+" + u.toString(16).toUpperCase() + " is not a scalar value");
      return !1;
    }
    return !0;
  }
  function d(u, s) {
    return o(u >> s & 63 | 128);
  }
  function c(u, s) {
    if ((u & 4294967168) == 0)
      return o(u);
    var f = "";
    return (u & 4294965248) == 0 ? f = o(u >> 6 & 31 | 192) : (u & 4294901760) == 0 ? (h(u, s) || (u = 65533), f = o(u >> 12 & 15 | 224), f += d(u, 6)) : (u & 4292870144) == 0 && (f = o(u >> 18 & 7 | 240), f += d(u, 12), f += d(u, 6)), f += o(u & 63 | 128), f;
  }
  function t(u, s) {
    s = s || {};
    for (var f = s.strict !== !1, p = m(u), x = p.length, b = -1, C, S = ""; ++b < x; )
      C = p[b], S += c(C, f);
    return S;
  }
  function a() {
    if (l >= i)
      throw Error("Invalid byte index");
    var u = e[l] & 255;
    if (l++, (u & 192) == 128)
      return u & 63;
    throw Error("Invalid continuation byte");
  }
  function n(u) {
    var s, f, p, x, b;
    if (l > i)
      throw Error("Invalid byte index");
    if (l == i)
      return !1;
    if (s = e[l] & 255, l++, (s & 128) == 0)
      return s;
    if ((s & 224) == 192) {
      if (f = a(), b = (s & 31) << 6 | f, b >= 128)
        return b;
      throw Error("Invalid continuation byte");
    }
    if ((s & 240) == 224) {
      if (f = a(), p = a(), b = (s & 15) << 12 | f << 6 | p, b >= 2048)
        return h(b, u) ? b : 65533;
      throw Error("Invalid continuation byte");
    }
    if ((s & 248) == 240 && (f = a(), p = a(), x = a(), b = (s & 7) << 18 | f << 12 | p << 6 | x, b >= 65536 && b <= 1114111))
      return b;
    throw Error("Invalid UTF-8 detected");
  }
  var e, i, l;
  function r(u, s) {
    s = s || {};
    var f = s.strict !== !1;
    e = m(u), i = e.length, l = 0;
    for (var p = [], x; (x = n(f)) !== !1; )
      p.push(x);
    return v(p);
  }
  return oa = {
    version: "2.1.2",
    encode: t,
    decode: r
  }, oa;
}
var bu;
function mm() {
  return bu || (bu = 1, (function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.packets = o.protocol = void 0, o.encodePacket = t, o.encodeBase64Packet = n, o.decodePacket = e, o.decodeBase64Packet = l, o.encodePayload = r, o.decodePayload = f, o.encodePayloadAsBinary = C, o.decodePayloadAsBinary = T;
    var m = hm();
    o.protocol = 3;
    const v = (y) => {
      for (const E of y)
        if (E.data instanceof ArrayBuffer || ArrayBuffer.isView(E.data))
          return !0;
      return !1;
    };
    o.packets = {
      open: 0,
      close: 1,
      ping: 2,
      pong: 3,
      message: 4,
      upgrade: 5,
      noop: 6
    };
    var h = Object.keys(o.packets), d = { type: "error", data: "parser error" };
    const c = Buffer.concat([]);
    function t(y, E, w, _) {
      if (typeof E == "function" && (_ = E, E = null), typeof w == "function" && (_ = w, w = null), Buffer.isBuffer(y.data))
        return a(y, E, _);
      if (y.data && (y.data.buffer || y.data) instanceof ArrayBuffer)
        return a({ type: y.type, data: b(y.data) }, E, _);
      var D = o.packets[y.type];
      return y.data !== void 0 && (D += w ? m.encode(String(y.data), { strict: !1 }) : String(y.data)), _("" + D);
    }
    function a(y, E, w) {
      if (!E)
        return n(y, w);
      var _ = y.data, D = Buffer.allocUnsafe(1);
      return D[0] = o.packets[y.type], w(Buffer.concat([D, _]));
    }
    function n(y, E) {
      var w = Buffer.isBuffer(y.data) ? y.data : b(y.data), _ = "b" + o.packets[y.type];
      return _ += w.toString("base64"), E(_);
    }
    function e(y, E, w) {
      if (y === void 0)
        return d;
      let _;
      if (typeof y == "string")
        return _ = y.charAt(0), _ === "b" ? l(y.slice(1), E) : w && (y = i(y), y === !1) || Number(_) != _ || !h[_] ? d : y.length > 1 ? { type: h[_], data: y.slice(1) } : { type: h[_] };
      if (E === "arraybuffer") {
        var D = new Uint8Array(y);
        return _ = D[0], { type: h[_], data: D.buffer.slice(1) };
      }
      return y instanceof ArrayBuffer && (y = b(y)), _ = y[0], { type: h[_], data: y.slice(1) };
    }
    function i(y) {
      try {
        y = m.decode(y, { strict: !1 });
      } catch {
        return !1;
      }
      return y;
    }
    function l(y, E) {
      var w = h[y.charAt(0)], _ = Buffer.from(y.slice(1), "base64");
      if (E === "arraybuffer") {
        for (var D = new Uint8Array(_.length), O = 0; O < D.length; O++)
          D[O] = _[O];
        _ = D.buffer;
      }
      return { type: w, data: _ };
    }
    function r(y, E, w) {
      if (typeof E == "function" && (w = E, E = null), E && v(y))
        return C(y, w);
      if (!y.length)
        return w("0:");
      function _(D, O) {
        t(D, E, !1, function(I) {
          O(null, u(I));
        });
      }
      s(y, _, function(D, O) {
        return w(O.join(""));
      });
    }
    function u(y) {
      return y.length + ":" + y;
    }
    function s(y, E, w) {
      const _ = new Array(y.length);
      let D = 0;
      for (let O = 0; O < y.length; O++)
        E(y[O], (I, q) => {
          _[O] = q, ++D === y.length && w(null, _);
        });
    }
    function f(y, E, w) {
      if (typeof y != "string")
        return T(y, E, w);
      if (typeof E == "function" && (w = E, E = null), y === "")
        return w(d, 0, 1);
      for (var _ = "", D, O, I, q = 0, R = y.length; q < R; q++) {
        var N = y.charAt(q);
        if (N !== ":") {
          _ += N;
          continue;
        }
        if (_ === "" || _ != (D = Number(_)) || (O = y.slice(q + 1, q + 1 + D), _ != O.length))
          return w(d, 0, 1);
        if (O.length) {
          if (I = e(O, E, !1), d.type === I.type && d.data === I.data)
            return w(d, 0, 1);
          var F = w(I, q + D, R);
          if (F === !1)
            return;
        }
        q += D, _ = "";
      }
      if (_ !== "")
        return w(d, 0, 1);
    }
    function p(y) {
      for (var E = "", w = 0, _ = y.length; w < _; w++)
        E += String.fromCharCode(y[w]);
      return E;
    }
    function x(y) {
      for (var E = Buffer.allocUnsafe(y.length), w = 0, _ = y.length; w < _; w++)
        E.writeUInt8(y.charCodeAt(w), w);
      return E;
    }
    function b(y) {
      var E = y.byteLength || y.length, w = y.byteOffset || 0;
      return Buffer.from(y.buffer || y, w, E);
    }
    function C(y, E) {
      if (!y.length)
        return E(c);
      s(y, S, function(w, _) {
        return E(Buffer.concat(_));
      });
    }
    function S(y, E) {
      function w(_) {
        var D = "" + _.length, O;
        if (typeof _ == "string") {
          O = Buffer.allocUnsafe(D.length + 2), O[0] = 0;
          for (var I = 0; I < D.length; I++)
            O[I + 1] = parseInt(D[I], 10);
          return O[O.length - 1] = 255, E(null, Buffer.concat([O, x(_)]));
        }
        O = Buffer.allocUnsafe(D.length + 2), O[0] = 1;
        for (var I = 0; I < D.length; I++)
          O[I + 1] = parseInt(D[I], 10);
        O[O.length - 1] = 255, E(null, Buffer.concat([O, _]));
      }
      t(y, !0, !0, w);
    }
    function T(y, E, w) {
      typeof E == "function" && (w = E, E = null);
      for (var _ = y, D = [], O; _.length > 0; ) {
        var I = "", q = _[0] === 0;
        for (O = 1; _[O] !== 255; O++) {
          if (I.length > 310)
            return w(d, 0, 1);
          I += "" + _[O];
        }
        _ = _.slice(I.length + 1);
        var R = parseInt(I, 10), N = _.slice(1, R + 1);
        q && (N = p(N)), D.push(N), _ = _.slice(R + 1);
      }
      var F = D.length;
      for (O = 0; O < F; O++) {
        var U = D[O];
        w(e(U, E, !0), O, F);
      }
    }
  })(aa)), aa;
}
var wu;
function dn() {
  if (wu) return qn;
  wu = 1, Object.defineProperty(qn, "__esModule", { value: !0 }), qn.Transport = void 0;
  const o = ft, m = Yi(), v = mm(), d = (0, $e().default)("engine:transport");
  function c() {
  }
  class t extends o.EventEmitter {
    get readyState() {
      return this._readyState;
    }
    set readyState(n) {
      d("readyState updated from %s to %s (%s)", this._readyState, n, this.name), this._readyState = n;
    }
    /**
     * Transport constructor.
     *
     * @param {EngineRequest} req
     */
    constructor(n) {
      super(), this.writable = !1, this._readyState = "open", this.discarded = !1, this.protocol = n._query.EIO === "4" ? 4 : 3, this.parser = this.protocol === 4 ? m : v, this.supportsBinary = !(n._query && n._query.b64);
    }
    /**
     * Flags the transport as discarded.
     *
     * @package
     */
    discard() {
      this.discarded = !0;
    }
    /**
     * Called with an incoming HTTP request.
     *
     * @param req
     * @package
     */
    onRequest(n) {
    }
    /**
     * Closes the transport.
     *
     * @package
     */
    close(n) {
      this.readyState === "closed" || this.readyState === "closing" || (this.readyState = "closing", this.doClose(n || c));
    }
    /**
     * Called with a transport error.
     *
     * @param {String} msg - message error
     * @param {Object} desc - error description
     * @protected
     */
    onError(n, e) {
      if (this.listeners("error").length) {
        const i = new Error(n);
        i.type = "TransportError", i.description = e, this.emit("error", i);
      } else
        d("ignored transport error %s (%s)", n, e);
    }
    /**
     * Called with parsed out a packets from the data stream.
     *
     * @param {Object} packet
     * @protected
     */
    onPacket(n) {
      this.emit("packet", n);
    }
    /**
     * Called with the encoded packet data.
     *
     * @param data
     * @protected
     */
    onData(n) {
      this.onPacket(this.parser.decodePacket(n));
    }
    /**
     * Called upon transport close.
     *
     * @protected
     */
    onClose() {
      this.readyState = "closed", this.emit("close");
    }
  }
  return qn.Transport = t, t.upgradesTo = [], qn;
}
var _u;
function ed() {
  if (_u) return Un;
  _u = 1, Object.defineProperty(Un, "__esModule", { value: !0 }), Un.Polling = void 0;
  const o = dn(), m = on, v = Ma(), d = (0, $e().default)("engine:polling"), c = {
    gzip: m.createGzip,
    deflate: m.createDeflate
  };
  class t extends o.Transport {
    /**
     * HTTP polling constructor.
     */
    constructor(n) {
      super(n), this.closeTimeout = 30 * 1e3;
    }
    /**
     * Transport name
     */
    get name() {
      return "polling";
    }
    /**
     * Overrides onRequest.
     *
     * @param {EngineRequest} req
     * @package
     */
    onRequest(n) {
      const e = n.res;
      n.res = null, n.method === "GET" ? this.onPollRequest(n, e) : n.method === "POST" ? this.onDataRequest(n, e) : (e.writeHead(500), e.end());
    }
    /**
     * The client sends a request awaiting for us to send data.
     *
     * @private
     */
    onPollRequest(n, e) {
      if (this.req) {
        d("request overlap"), this.onError("overlap from client"), e.writeHead(400), e.end();
        return;
      }
      d("setting request"), this.req = n, this.res = e;
      const i = () => {
        this.onError("poll connection closed prematurely");
      }, l = () => {
        n.removeListener("close", i), this.req = this.res = null;
      };
      n.cleanup = l, n.on("close", i), this.writable = !0, this.emit("ready"), this.writable && this.shouldClose && (d("triggering empty send to append close packet"), this.send([{ type: "noop" }]));
    }
    /**
     * The client sends a request with data.
     *
     * @private
     */
    onDataRequest(n, e) {
      if (this.dataReq) {
        this.onError("data request overlap from client"), e.writeHead(400), e.end();
        return;
      }
      const i = n.headers["content-type"] === "application/octet-stream";
      if (i && this.protocol === 4)
        return this.onError("invalid content");
      this.dataReq = n, this.dataRes = e;
      let l = i ? Buffer.concat([]) : "";
      const r = () => {
        n.removeListener("data", s), n.removeListener("end", f), n.removeListener("close", u), this.dataReq = this.dataRes = l = null;
      }, u = () => {
        r(), this.onError("data request connection closed prematurely");
      }, s = (p) => {
        let x;
        i ? (l = Buffer.concat([l, p]), x = l.length) : (l += p, x = Buffer.byteLength(l)), x > this.maxHttpBufferSize && (e.writeHead(413).end(), r());
      }, f = () => {
        this.onData(l);
        const p = {
          // text/html is required instead of text/plain to avoid an
          // unwanted download dialog on certain user-agents (GH-43)
          "Content-Type": "text/html",
          "Content-Length": "2"
        };
        e.writeHead(200, this.headers(n, p)), e.end("ok"), r();
      };
      n.on("close", u), i || n.setEncoding("utf8"), n.on("data", s), n.on("end", f);
    }
    /**
     * Processes the incoming data payload.
     *
     * @param data - encoded payload
     * @protected
     */
    onData(n) {
      d('received "%s"', n);
      const e = (i) => {
        if (i.type === "close")
          return d("got xhr close packet"), this.onClose(), !1;
        this.onPacket(i);
      };
      this.protocol === 3 ? this.parser.decodePayload(n, e) : this.parser.decodePayload(n).forEach(e);
    }
    /**
     * Overrides onClose.
     *
     * @private
     */
    onClose() {
      this.writable && this.send([{ type: "noop" }]), super.onClose();
    }
    send(n) {
      this.writable = !1, this.shouldClose && (d("appending close packet to payload"), n.push({ type: "close" }), this.shouldClose(), this.shouldClose = null);
      const e = (i) => {
        const l = n.some((r) => r.options && r.options.compress);
        this.write(i, { compress: l });
      };
      this.protocol === 3 ? this.parser.encodePayload(n, this.supportsBinary, e) : this.parser.encodePayload(n, e);
    }
    /**
     * Writes data as response to poll request.
     *
     * @param {String} data
     * @param {Object} options
     * @private
     */
    write(n, e) {
      d('writing "%s"', n), this.doWrite(n, e, () => {
        this.req.cleanup(), this.emit("drain");
      });
    }
    /**
     * Performs the write.
     *
     * @protected
     */
    doWrite(n, e, i) {
      const l = typeof n == "string", u = {
        "Content-Type": l ? "text/plain; charset=UTF-8" : "application/octet-stream"
      }, s = (x) => {
        u["Content-Length"] = typeof x == "string" ? Buffer.byteLength(x) : x.length, this.res.writeHead(200, this.headers(this.req, u)), this.res.end(x), i();
      };
      if (!this.httpCompression || !e.compress) {
        s(n);
        return;
      }
      if ((l ? Buffer.byteLength(n) : n.length) < this.httpCompression.threshold) {
        s(n);
        return;
      }
      const p = v(this.req).encodings(["gzip", "deflate"]);
      if (!p) {
        s(n);
        return;
      }
      this.compress(n, p, (x, b) => {
        if (x) {
          this.res.writeHead(500), this.res.end(), i(x);
          return;
        }
        u["Content-Encoding"] = p, s(b);
      });
    }
    /**
     * Compresses data.
     *
     * @private
     */
    compress(n, e, i) {
      d("compressing");
      const l = [];
      let r = 0;
      c[e](this.httpCompression).on("error", i).on("data", function(u) {
        l.push(u), r += u.length;
      }).on("end", function() {
        i(null, Buffer.concat(l, r));
      }).end(n);
    }
    /**
     * Closes the transport.
     *
     * @private
     */
    doClose(n) {
      d("closing");
      let e;
      this.dataReq && (d("aborting ongoing data request"), this.dataReq.destroy());
      const i = () => {
        clearTimeout(e), n(), this.onClose();
      };
      this.writable ? (d("transport writable - closing right away"), this.send([{ type: "close" }]), i()) : this.discarded ? (d("transport discarded - closing right away"), i()) : (d("transport not writable - buffering orderly close"), this.shouldClose = i, e = setTimeout(i, this.closeTimeout));
    }
    /**
     * Returns headers for a response.
     *
     * @param {http.IncomingMessage} req
     * @param {Object} headers - extra headers
     * @private
     */
    headers(n, e = {}) {
      const i = n.headers["user-agent"];
      return i && (~i.indexOf(";MSIE") || ~i.indexOf("Trident/")) && (e["X-XSS-Protection"] = "0"), e["cache-control"] = "no-store", this.emit("headers", e, n), e;
    }
  }
  return Un.Polling = t, Un;
}
var Bn = {}, Eu;
function vm() {
  if (Eu) return Bn;
  Eu = 1, Object.defineProperty(Bn, "__esModule", { value: !0 }), Bn.JSONP = void 0;
  const o = ed(), m = Sf, v = /\\\\n/g, h = /(\\)?\\n/g;
  class d extends o.Polling {
    /**
     * JSON-P polling transport.
     */
    constructor(t) {
      super(t), this.head = "___eio[" + (t._query.j || "").replace(/[^0-9]/g, "") + "](", this.foot = ");";
    }
    onData(t) {
      t = m.parse(t).d, typeof t == "string" && (t = t.replace(h, function(a, n) {
        return n ? a : `
`;
      }), super.onData(t.replace(v, "\\n")));
    }
    doWrite(t, a, n) {
      const e = JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
      t = this.head + e + this.foot, super.doWrite(t, a, n);
    }
  }
  return Bn.JSONP = d, Bn;
}
var jn = {}, Su;
function gm() {
  if (Su) return jn;
  Su = 1, Object.defineProperty(jn, "__esModule", { value: !0 }), jn.WebSocket = void 0;
  const o = dn(), v = (0, $e().default)("engine:ws");
  class h extends o.Transport {
    /**
     * WebSocket transport
     *
     * @param {EngineRequest} req
     */
    constructor(c) {
      super(c), this._doSend = (t) => {
        this.socket.send(t, this._onSent);
      }, this._doSendLast = (t) => {
        this.socket.send(t, this._onSentLast);
      }, this._onSent = (t) => {
        t && this.onError("write error", t.stack);
      }, this._onSentLast = (t) => {
        t ? this.onError("write error", t.stack) : (this.emit("drain"), this.writable = !0, this.emit("ready"));
      }, this.socket = c.websocket, this.socket.on("message", (t, a) => {
        const n = a ? t : t.toString();
        v('received "%s"', n), super.onData(n);
      }), this.socket.once("close", this.onClose.bind(this)), this.socket.on("error", this.onError.bind(this)), this.writable = !0, this.perMessageDeflate = null;
    }
    /**
     * Transport name
     */
    get name() {
      return "websocket";
    }
    /**
     * Advertise upgrade support.
     */
    get handlesUpgrades() {
      return !0;
    }
    send(c) {
      this.writable = !1;
      for (let t = 0; t < c.length; t++) {
        const a = c[t], n = t + 1 === c.length;
        this._canSendPreEncodedFrame(a) ? this.socket._sender.sendFrame(a.options.wsPreEncodedFrame, n ? this._onSentLast : this._onSent) : this.parser.encodePacket(a, this.supportsBinary, n ? this._doSendLast : this._doSend);
      }
    }
    /**
     * Whether the encoding of the WebSocket frame can be skipped.
     * @param packet
     * @private
     */
    _canSendPreEncodedFrame(c) {
      var t, a, n;
      return !this.perMessageDeflate && // @ts-expect-error use of untyped member
      typeof ((a = (t = this.socket) === null || t === void 0 ? void 0 : t._sender) === null || a === void 0 ? void 0 : a.sendFrame) == "function" && ((n = c.options) === null || n === void 0 ? void 0 : n.wsPreEncodedFrame) !== void 0;
    }
    doClose(c) {
      v("closing"), this.socket.close(), c && c();
    }
  }
  return jn.WebSocket = h, jn;
}
var Mn = {}, Tu;
function td() {
  if (Tu) return Mn;
  Tu = 1, Object.defineProperty(Mn, "__esModule", { value: !0 }), Mn.WebTransport = void 0;
  const o = dn(), m = $e(), v = Yi(), h = (0, m.default)("engine:webtransport");
  class d extends o.Transport {
    constructor(t, a, n) {
      super({ _query: { EIO: "4" } }), this.session = t;
      const e = (0, v.createPacketEncoderStream)();
      e.readable.pipeTo(a.writable).catch(() => {
        h("the stream was closed");
      }), this.writer = e.writable.getWriter(), (async () => {
        try {
          for (; ; ) {
            const { value: i, done: l } = await n.read();
            if (l) {
              h("session is closed");
              break;
            }
            h("received chunk: %o", i), this.onPacket(i);
          }
        } catch (i) {
          h("error while reading: %s", i.message);
        }
      })(), t.closed.then(() => this.onClose()), this.writable = !0;
    }
    get name() {
      return "webtransport";
    }
    async send(t) {
      this.writable = !1;
      try {
        for (let a = 0; a < t.length; a++) {
          const n = t[a];
          await this.writer.write(n);
        }
      } catch (a) {
        h("error while writing: %s", a.message);
      }
      this.emit("drain"), this.writable = !0, this.emit("ready");
    }
    doClose(t) {
      h("closing WebTransport session"), this.session.close(), t && t();
    }
  }
  return Mn.WebTransport = d, Mn;
}
var Cu;
function nd() {
  if (Cu) return Ni;
  Cu = 1, Object.defineProperty(Ni, "__esModule", { value: !0 });
  const o = ed(), m = vm(), v = gm(), h = td();
  Ni.default = {
    polling: d,
    websocket: v.WebSocket,
    webtransport: h.WebTransport
  };
  function d(c) {
    return typeof c._query.j == "string" ? new m.JSONP(c) : new o.Polling(c);
  }
  return d.upgradesTo = ["websocket", "webtransport"], Ni;
}
var Hn = {}, Ru;
function id() {
  if (Ru) return Hn;
  Ru = 1, Object.defineProperty(Hn, "__esModule", { value: !0 }), Hn.Socket = void 0;
  const o = ft, m = $e(), v = Tf, h = (0, m.default)("engine:socket");
  class d extends o.EventEmitter {
    get readyState() {
      return this._readyState;
    }
    set readyState(t) {
      h("readyState updated from %s to %s", this._readyState, t), this._readyState = t;
    }
    constructor(t, a, n, e, i) {
      super(), this._readyState = "opening", this.upgrading = !1, this.upgraded = !1, this.writeBuffer = [], this.packetsFn = [], this.sentCallbackFn = [], this.cleanupFn = [], this.id = t, this.server = a, this.request = e, this.protocol = i, e && (e.websocket && e.websocket._socket ? this.remoteAddress = e.websocket._socket.remoteAddress : this.remoteAddress = e.connection.remoteAddress), this.pingTimeoutTimer = null, this.pingIntervalTimer = null, this.setTransport(n), this.onOpen();
    }
    /**
     * Called upon transport considered open.
     *
     * @private
     */
    onOpen() {
      this.readyState = "open", this.transport.sid = this.id, this.sendPacket("open", JSON.stringify({
        sid: this.id,
        upgrades: this.getAvailableUpgrades(),
        pingInterval: this.server.opts.pingInterval,
        pingTimeout: this.server.opts.pingTimeout,
        maxPayload: this.server.opts.maxHttpBufferSize
      })), this.server.opts.initialPacket && this.sendPacket("message", this.server.opts.initialPacket), this.emit("open"), this.protocol === 3 ? this.resetPingTimeout() : this.schedulePing();
    }
    /**
     * Called upon transport packet.
     *
     * @param {Object} packet
     * @private
     */
    onPacket(t) {
      if (this.readyState !== "open")
        return h("packet received with closed socket");
      switch (h(`received packet ${t.type}`), this.emit("packet", t), t.type) {
        case "ping":
          if (this.transport.protocol !== 3) {
            this.onError(new Error("invalid heartbeat direction"));
            return;
          }
          h("got ping"), this.pingTimeoutTimer.refresh(), this.sendPacket("pong"), this.emit("heartbeat");
          break;
        case "pong":
          if (this.transport.protocol === 3) {
            this.onError(new Error("invalid heartbeat direction"));
            return;
          }
          h("got pong"), (0, v.clearTimeout)(this.pingTimeoutTimer), this.pingIntervalTimer.refresh(), this.emit("heartbeat");
          break;
        case "error":
          this.onClose("parse error");
          break;
        case "message":
          this.emit("data", t.data), this.emit("message", t.data);
          break;
      }
    }
    /**
     * Called upon transport error.
     *
     * @param {Error} err - error object
     * @private
     */
    onError(t) {
      h("transport error"), this.onClose("transport error", t);
    }
    /**
     * Pings client every `this.pingInterval` and expects response
     * within `this.pingTimeout` or closes connection.
     *
     * @private
     */
    schedulePing() {
      this.pingIntervalTimer = (0, v.setTimeout)(() => {
        h("writing ping packet - expecting pong within %sms", this.server.opts.pingTimeout), this.sendPacket("ping"), this.resetPingTimeout();
      }, this.server.opts.pingInterval);
    }
    /**
     * Resets ping timeout.
     *
     * @private
     */
    resetPingTimeout() {
      (0, v.clearTimeout)(this.pingTimeoutTimer), this.pingTimeoutTimer = (0, v.setTimeout)(() => {
        this.readyState !== "closed" && this.onClose("ping timeout");
      }, this.protocol === 3 ? this.server.opts.pingInterval + this.server.opts.pingTimeout : this.server.opts.pingTimeout);
    }
    /**
     * Attaches handlers for the given transport.
     *
     * @param {Transport} transport
     * @private
     */
    setTransport(t) {
      const a = this.onError.bind(this), n = () => this.flush(), e = this.onPacket.bind(this), i = this.onDrain.bind(this), l = this.onClose.bind(this, "transport close");
      this.transport = t, this.transport.once("error", a), this.transport.on("ready", n), this.transport.on("packet", e), this.transport.on("drain", i), this.transport.once("close", l), this.cleanupFn.push(function() {
        t.removeListener("error", a), t.removeListener("ready", n), t.removeListener("packet", e), t.removeListener("drain", i), t.removeListener("close", l);
      });
    }
    /**
     * Upon transport "drain" event
     *
     * @private
     */
    onDrain() {
      if (this.sentCallbackFn.length > 0) {
        h("executing batch send callback");
        const t = this.sentCallbackFn.shift();
        if (t)
          for (let a = 0; a < t.length; a++)
            t[a](this.transport);
      }
    }
    /**
     * Upgrades socket to the given transport
     *
     * @param {Transport} transport
     * @private
     */
    /* private */
    _maybeUpgrade(t) {
      h('might upgrade socket transport from "%s" to "%s"', this.transport.name, t.name), this.upgrading = !0;
      const a = (0, v.setTimeout)(() => {
        h("client did not complete upgrade - closing transport"), l(), t.readyState === "open" && t.close();
      }, this.server.opts.upgradeTimeout);
      let n;
      const e = (f) => {
        f.type === "ping" && f.data === "probe" ? (h("got probe ping packet, sending pong"), t.send([{ type: "pong", data: "probe" }]), this.emit("upgrading", t), clearInterval(n), n = setInterval(i, 100)) : f.type === "upgrade" && this.readyState !== "closed" ? (h("got upgrade packet - upgrading"), l(), this.transport.discard(), this.upgraded = !0, this.clearTransport(), this.setTransport(t), this.emit("upgrade", t), this.flush(), this.readyState === "closing" && t.close(() => {
          this.onClose("forced close");
        })) : (l(), t.close());
      }, i = () => {
        this.transport.name === "polling" && this.transport.writable && (h("writing a noop packet to polling for fast upgrade"), this.transport.send([{ type: "noop" }]));
      }, l = () => {
        this.upgrading = !1, clearInterval(n), (0, v.clearTimeout)(a), t.removeListener("packet", e), t.removeListener("close", u), t.removeListener("error", r), this.removeListener("close", s);
      }, r = (f) => {
        h("client did not complete upgrade - %s", f), l(), t.close(), t = null;
      }, u = () => {
        r("transport closed");
      }, s = () => {
        r("socket closed");
      };
      t.on("packet", e), t.once("close", u), t.once("error", r), this.once("close", s);
    }
    /**
     * Clears listeners and timers associated with current transport.
     *
     * @private
     */
    clearTransport() {
      let t;
      const a = this.cleanupFn.length;
      for (let n = 0; n < a; n++)
        t = this.cleanupFn.shift(), t();
      this.transport.on("error", function() {
        h("error triggered by discarded transport");
      }), this.transport.close(), (0, v.clearTimeout)(this.pingTimeoutTimer);
    }
    /**
     * Called upon transport considered closed.
     * Possible reasons: `ping timeout`, `client error`, `parse error`,
     * `transport error`, `server close`, `transport close`
     */
    onClose(t, a) {
      this.readyState !== "closed" && (this.readyState = "closed", (0, v.clearTimeout)(this.pingIntervalTimer), (0, v.clearTimeout)(this.pingTimeoutTimer), process.nextTick(() => {
        this.writeBuffer = [];
      }), this.packetsFn = [], this.sentCallbackFn = [], this.clearTransport(), this.emit("close", t, a));
    }
    /**
     * Sends a message packet.
     *
     * @param {Object} data
     * @param {Object} options
     * @param {Function} callback
     * @return {Socket} for chaining
     */
    send(t, a, n) {
      return this.sendPacket("message", t, a, n), this;
    }
    /**
     * Alias of {@link send}.
     *
     * @param data
     * @param options
     * @param callback
     */
    write(t, a, n) {
      return this.sendPacket("message", t, a, n), this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type - packet type
     * @param {String} data
     * @param {Object} options
     * @param {Function} callback
     *
     * @private
     */
    sendPacket(t, a, n = {}, e) {
      if (typeof n == "function" && (e = n, n = {}), this.readyState !== "closing" && this.readyState !== "closed") {
        h('sending packet "%s" (%s)', t, a), n.compress = n.compress !== !1;
        const i = {
          type: t,
          options: n
        };
        a && (i.data = a), this.emit("packetCreate", i), this.writeBuffer.push(i), typeof e == "function" && this.packetsFn.push(e), this.flush();
      }
    }
    /**
     * Attempts to flush the packets buffer.
     *
     * @private
     */
    flush() {
      if (this.readyState !== "closed" && this.transport.writable && this.writeBuffer.length) {
        h("flushing buffer to transport"), this.emit("flush", this.writeBuffer), this.server.emit("flush", this, this.writeBuffer);
        const t = this.writeBuffer;
        this.writeBuffer = [], this.packetsFn.length ? (this.sentCallbackFn.push(this.packetsFn), this.packetsFn = []) : this.sentCallbackFn.push(null), this.transport.send(t), this.emit("drain"), this.server.emit("drain", this);
      }
    }
    /**
     * Get available upgrades for this socket.
     *
     * @private
     */
    getAvailableUpgrades() {
      const t = [], a = this.server.upgrades(this.transport.name);
      for (let n = 0; n < a.length; ++n) {
        const e = a[n];
        this.server.opts.transports.indexOf(e) !== -1 && t.push(e);
      }
      return t;
    }
    /**
     * Closes the socket and underlying transport.
     *
     * @param {Boolean} discard - optional, discard the transport
     * @return {Socket} for chaining
     */
    close(t) {
      if (t && (this.readyState === "open" || this.readyState === "closing"))
        return this.closeTransport(t);
      if (this.readyState === "open") {
        if (this.readyState = "closing", this.writeBuffer.length) {
          h("there are %d remaining packets in the buffer, waiting for the 'drain' event", this.writeBuffer.length), this.once("drain", () => {
            h("all packets have been sent, closing the transport"), this.closeTransport(t);
          });
          return;
        }
        h("the buffer is empty, closing the transport right away"), this.closeTransport(t);
      }
    }
    /**
     * Closes the underlying transport.
     *
     * @param {Boolean} discard
     * @private
     */
    closeTransport(t) {
      h("closing the transport (discard? %s)", !!t), t && this.transport.discard(), this.transport.close(this.onClose.bind(this, "forced close"));
    }
  }
  return Hn.Socket = d, Hn;
}
var Di = {};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Au;
function xm() {
  if (Au) return Di;
  Au = 1, Di.parse = t, Di.serialize = e;
  var o = Object.prototype.toString, m = Object.prototype.hasOwnProperty, v = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, h = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, d = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, c = /^[\u0020-\u003A\u003D-\u007E]*$/;
  function t(u, s) {
    if (typeof u != "string")
      throw new TypeError("argument str must be a string");
    var f = {}, p = u.length;
    if (p < 2) return f;
    var x = s && s.decode || i, b = 0, C = 0, S = 0;
    do {
      if (C = u.indexOf("=", b), C === -1) break;
      if (S = u.indexOf(";", b), S === -1)
        S = p;
      else if (C > S) {
        b = u.lastIndexOf(";", C - 1) + 1;
        continue;
      }
      var T = a(u, b, C), y = n(u, C, T), E = u.slice(T, y);
      if (!m.call(f, E)) {
        var w = a(u, C + 1, S), _ = n(u, S, w);
        u.charCodeAt(w) === 34 && u.charCodeAt(_ - 1) === 34 && (w++, _--);
        var D = u.slice(w, _);
        f[E] = r(D, x);
      }
      b = S + 1;
    } while (b < p);
    return f;
  }
  function a(u, s, f) {
    do {
      var p = u.charCodeAt(s);
      if (p !== 32 && p !== 9) return s;
    } while (++s < f);
    return f;
  }
  function n(u, s, f) {
    for (; s > f; ) {
      var p = u.charCodeAt(--s);
      if (p !== 32 && p !== 9) return s + 1;
    }
    return f;
  }
  function e(u, s, f) {
    var p = f && f.encode || encodeURIComponent;
    if (typeof p != "function")
      throw new TypeError("option encode is invalid");
    if (!v.test(u))
      throw new TypeError("argument name is invalid");
    var x = p(s);
    if (!h.test(x))
      throw new TypeError("argument val is invalid");
    var b = u + "=" + x;
    if (!f) return b;
    if (f.maxAge != null) {
      var C = Math.floor(f.maxAge);
      if (!isFinite(C))
        throw new TypeError("option maxAge is invalid");
      b += "; Max-Age=" + C;
    }
    if (f.domain) {
      if (!d.test(f.domain))
        throw new TypeError("option domain is invalid");
      b += "; Domain=" + f.domain;
    }
    if (f.path) {
      if (!c.test(f.path))
        throw new TypeError("option path is invalid");
      b += "; Path=" + f.path;
    }
    if (f.expires) {
      var S = f.expires;
      if (!l(S) || isNaN(S.valueOf()))
        throw new TypeError("option expires is invalid");
      b += "; Expires=" + S.toUTCString();
    }
    if (f.httpOnly && (b += "; HttpOnly"), f.secure && (b += "; Secure"), f.partitioned && (b += "; Partitioned"), f.priority) {
      var T = typeof f.priority == "string" ? f.priority.toLowerCase() : f.priority;
      switch (T) {
        case "low":
          b += "; Priority=Low";
          break;
        case "medium":
          b += "; Priority=Medium";
          break;
        case "high":
          b += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (f.sameSite) {
      var y = typeof f.sameSite == "string" ? f.sameSite.toLowerCase() : f.sameSite;
      switch (y) {
        case !0:
          b += "; SameSite=Strict";
          break;
        case "lax":
          b += "; SameSite=Lax";
          break;
        case "strict":
          b += "; SameSite=Strict";
          break;
        case "none":
          b += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return b;
  }
  function i(u) {
    return u.indexOf("%") !== -1 ? decodeURIComponent(u) : u;
  }
  function l(u) {
    return o.call(u) === "[object Date]";
  }
  function r(u, s) {
    try {
      return s(u);
    } catch {
      return u;
    }
  }
  return Di;
}
var zn = { exports: {} }, ca, ku;
function At() {
  if (ku) return ca;
  ku = 1;
  const o = ["nodebuffer", "arraybuffer", "fragments"], m = typeof Blob < "u";
  return m && o.push("blob"), ca = {
    BINARY_TYPES: o,
    EMPTY_BUFFER: Buffer.alloc(0),
    GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
    hasBlob: m,
    kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
    kListener: Symbol("kListener"),
    kStatusCode: Symbol("status-code"),
    kWebSocket: Symbol("websocket"),
    NOOP: () => {
    }
  }, ca;
}
var Ii = { exports: {} };
function rd(o) {
  throw new Error('Could not dynamically require "' + o + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Li = { exports: {} }, la, Ou;
function ym() {
  if (Ou) return la;
  Ou = 1;
  var o = lt, m = De, v = ni, h = typeof __webpack_require__ == "function" ? __non_webpack_require__ : rd, d = process.config && process.config.variables || {}, c = !!process.env.PREBUILDS_ONLY, t = process.versions.modules, a = _() ? "electron" : w() ? "node-webkit" : "node", n = process.env.npm_config_arch || v.arch(), e = process.env.npm_config_platform || v.platform(), i = process.env.LIBC || (D(e) ? "musl" : "glibc"), l = process.env.ARM_VERSION || (n === "arm64" ? "8" : d.arm_version) || "", r = (process.versions.uv || "").split(".")[0];
  la = u;
  function u(O) {
    return h(u.resolve(O));
  }
  u.resolve = u.path = function(O) {
    O = m.resolve(O || ".");
    try {
      var I = h(m.join(O, "package.json")).name.toUpperCase().replace(/-/g, "_");
      process.env[I + "_PREBUILD"] && (O = process.env[I + "_PREBUILD"]);
    } catch {
    }
    if (!c) {
      var q = f(m.join(O, "build/Release"), p);
      if (q) return q;
      var R = f(m.join(O, "build/Debug"), p);
      if (R) return R;
    }
    var N = z(O);
    if (N) return N;
    var F = z(m.dirname(process.execPath));
    if (F) return F;
    var U = [
      "platform=" + e,
      "arch=" + n,
      "runtime=" + a,
      "abi=" + t,
      "uv=" + r,
      l ? "armv=" + l : "",
      "libc=" + i,
      "node=" + process.versions.node,
      process.versions.electron ? "electron=" + process.versions.electron : "",
      typeof __webpack_require__ == "function" ? "webpack=true" : ""
      // eslint-disable-line
    ].filter(Boolean).join(" ");
    throw new Error("No native build was found for " + U + `
    loaded from: ` + O + `
`);
    function z(W) {
      var ie = s(m.join(W, "prebuilds")).map(x), ae = ie.filter(b(e, n)).sort(C)[0];
      if (ae) {
        var oe = m.join(W, "prebuilds", ae.name), ye = s(oe).map(S), _e = ye.filter(T(a, t)), Z = _e.sort(E(a))[0];
        if (Z) return m.join(oe, Z.file);
      }
    }
  };
  function s(O) {
    try {
      return o.readdirSync(O);
    } catch {
      return [];
    }
  }
  function f(O, I) {
    var q = s(O).filter(I);
    return q[0] && m.join(O, q[0]);
  }
  function p(O) {
    return /\.node$/.test(O);
  }
  function x(O) {
    var I = O.split("-");
    if (I.length === 2) {
      var q = I[0], R = I[1].split("+");
      if (q && R.length && R.every(Boolean))
        return { name: O, platform: q, architectures: R };
    }
  }
  function b(O, I) {
    return function(q) {
      return q == null || q.platform !== O ? !1 : q.architectures.includes(I);
    };
  }
  function C(O, I) {
    return O.architectures.length - I.architectures.length;
  }
  function S(O) {
    var I = O.split("."), q = I.pop(), R = { file: O, specificity: 0 };
    if (q === "node") {
      for (var N = 0; N < I.length; N++) {
        var F = I[N];
        if (F === "node" || F === "electron" || F === "node-webkit")
          R.runtime = F;
        else if (F === "napi")
          R.napi = !0;
        else if (F.slice(0, 3) === "abi")
          R.abi = F.slice(3);
        else if (F.slice(0, 2) === "uv")
          R.uv = F.slice(2);
        else if (F.slice(0, 4) === "armv")
          R.armv = F.slice(4);
        else if (F === "glibc" || F === "musl")
          R.libc = F;
        else
          continue;
        R.specificity++;
      }
      return R;
    }
  }
  function T(O, I) {
    return function(q) {
      return !(q == null || q.runtime && q.runtime !== O && !y(q) || q.abi && q.abi !== I && !q.napi || q.uv && q.uv !== r || q.armv && q.armv !== l || q.libc && q.libc !== i);
    };
  }
  function y(O) {
    return O.runtime === "node" && O.napi;
  }
  function E(O) {
    return function(I, q) {
      return I.runtime !== q.runtime ? I.runtime === O ? -1 : 1 : I.abi !== q.abi ? I.abi ? -1 : 1 : I.specificity !== q.specificity ? I.specificity > q.specificity ? -1 : 1 : 0;
    };
  }
  function w() {
    return !!(process.versions && process.versions.nw);
  }
  function _() {
    return process.versions && process.versions.electron || process.env.ELECTRON_RUN_AS_NODE ? !0 : typeof window < "u" && window.process && window.process.type === "renderer";
  }
  function D(O) {
    return O === "linux" && o.existsSync("/etc/alpine-release");
  }
  return u.parseTags = S, u.matchTags = T, u.compareTags = E, u.parseTuple = x, u.matchTuple = b, u.compareTuples = C, la;
}
var Pu;
function sd() {
  if (Pu) return Li.exports;
  Pu = 1;
  const o = typeof __webpack_require__ == "function" ? __non_webpack_require__ : rd;
  return typeof o.addon == "function" ? Li.exports = o.addon.bind(o) : Li.exports = ym(), Li.exports;
}
var ua, Nu;
function bm() {
  return Nu || (Nu = 1, ua = { mask: (v, h, d, c, t) => {
    for (var a = 0; a < t; a++)
      d[c + a] = v[a] ^ h[a & 3];
  }, unmask: (v, h) => {
    const d = v.length;
    for (var c = 0; c < d; c++)
      v[c] ^= h[c & 3];
  } }), ua;
}
var Du;
function wm() {
  if (Du) return Ii.exports;
  Du = 1;
  try {
    Ii.exports = sd()(__dirname);
  } catch {
    Ii.exports = bm();
  }
  return Ii.exports;
}
var Iu;
function Ki() {
  if (Iu) return zn.exports;
  Iu = 1;
  const { EMPTY_BUFFER: o } = At(), m = Buffer[Symbol.species];
  function v(a, n) {
    if (a.length === 0) return o;
    if (a.length === 1) return a[0];
    const e = Buffer.allocUnsafe(n);
    let i = 0;
    for (let l = 0; l < a.length; l++) {
      const r = a[l];
      e.set(r, i), i += r.length;
    }
    return i < n ? new m(e.buffer, e.byteOffset, i) : e;
  }
  function h(a, n, e, i, l) {
    for (let r = 0; r < l; r++)
      e[i + r] = a[r] ^ n[r & 3];
  }
  function d(a, n) {
    for (let e = 0; e < a.length; e++)
      a[e] ^= n[e & 3];
  }
  function c(a) {
    return a.length === a.buffer.byteLength ? a.buffer : a.buffer.slice(a.byteOffset, a.byteOffset + a.length);
  }
  function t(a) {
    if (t.readOnly = !0, Buffer.isBuffer(a)) return a;
    let n;
    return a instanceof ArrayBuffer ? n = new m(a) : ArrayBuffer.isView(a) ? n = new m(a.buffer, a.byteOffset, a.byteLength) : (n = Buffer.from(a), t.readOnly = !1), n;
  }
  if (zn.exports = {
    concat: v,
    mask: h,
    toArrayBuffer: c,
    toBuffer: t,
    unmask: d
  }, !process.env.WS_NO_BUFFER_UTIL)
    try {
      const a = wm();
      zn.exports.mask = function(n, e, i, l, r) {
        r < 48 ? h(n, e, i, l, r) : a.mask(n, e, i, l, r);
      }, zn.exports.unmask = function(n, e) {
        n.length < 32 ? d(n, e) : a.unmask(n, e);
      };
    } catch {
    }
  return zn.exports;
}
var pa, Lu;
function _m() {
  if (Lu) return pa;
  Lu = 1;
  const o = Symbol("kDone"), m = Symbol("kRun");
  class v {
    /**
     * Creates a new `Limiter`.
     *
     * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
     *     to run concurrently
     */
    constructor(d) {
      this[o] = () => {
        this.pending--, this[m]();
      }, this.concurrency = d || 1 / 0, this.jobs = [], this.pending = 0;
    }
    /**
     * Adds a job to the queue.
     *
     * @param {Function} job The job to run
     * @public
     */
    add(d) {
      this.jobs.push(d), this[m]();
    }
    /**
     * Removes a job from the queue and runs it if possible.
     *
     * @private
     */
    [m]() {
      if (this.pending !== this.concurrency && this.jobs.length) {
        const d = this.jobs.shift();
        this.pending++, d(this[o]);
      }
    }
  }
  return pa = v, pa;
}
var da, Fu;
function Xi() {
  if (Fu) return da;
  Fu = 1;
  const o = on, m = Ki(), v = _m(), { kStatusCode: h } = At(), d = Buffer[Symbol.species], c = Buffer.from([0, 0, 255, 255]), t = Symbol("permessage-deflate"), a = Symbol("total-length"), n = Symbol("callback"), e = Symbol("buffers"), i = Symbol("error");
  let l;
  class r {
    /**
     * Creates a PerMessageDeflate instance.
     *
     * @param {Object} [options] Configuration options
     * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
     *     for, or request, a custom client window size
     * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
     *     acknowledge disabling of client context takeover
     * @param {Number} [options.concurrencyLimit=10] The number of concurrent
     *     calls to zlib
     * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
     *     use of a custom server window size
     * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
     *     disabling of server context takeover
     * @param {Number} [options.threshold=1024] Size (in bytes) below which
     *     messages should not be compressed if context takeover is disabled
     * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
     *     deflate
     * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
     *     inflate
     * @param {Boolean} [isServer=false] Create the instance in either server or
     *     client mode
     * @param {Number} [maxPayload=0] The maximum allowed message length
     */
    constructor(x, b, C) {
      if (this._maxPayload = C | 0, this._options = x || {}, this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024, this._isServer = !!b, this._deflate = null, this._inflate = null, this.params = null, !l) {
        const S = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
        l = new v(S);
      }
    }
    /**
     * @type {String}
     */
    static get extensionName() {
      return "permessage-deflate";
    }
    /**
     * Create an extension negotiation offer.
     *
     * @return {Object} Extension parameters
     * @public
     */
    offer() {
      const x = {};
      return this._options.serverNoContextTakeover && (x.server_no_context_takeover = !0), this._options.clientNoContextTakeover && (x.client_no_context_takeover = !0), this._options.serverMaxWindowBits && (x.server_max_window_bits = this._options.serverMaxWindowBits), this._options.clientMaxWindowBits ? x.client_max_window_bits = this._options.clientMaxWindowBits : this._options.clientMaxWindowBits == null && (x.client_max_window_bits = !0), x;
    }
    /**
     * Accept an extension negotiation offer/response.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Object} Accepted configuration
     * @public
     */
    accept(x) {
      return x = this.normalizeParams(x), this.params = this._isServer ? this.acceptAsServer(x) : this.acceptAsClient(x), this.params;
    }
    /**
     * Releases all resources used by the extension.
     *
     * @public
     */
    cleanup() {
      if (this._inflate && (this._inflate.close(), this._inflate = null), this._deflate) {
        const x = this._deflate[n];
        this._deflate.close(), this._deflate = null, x && x(
          new Error(
            "The deflate stream was closed while data was being processed"
          )
        );
      }
    }
    /**
     *  Accept an extension negotiation offer.
     *
     * @param {Array} offers The extension negotiation offers
     * @return {Object} Accepted configuration
     * @private
     */
    acceptAsServer(x) {
      const b = this._options, C = x.find((S) => !(b.serverNoContextTakeover === !1 && S.server_no_context_takeover || S.server_max_window_bits && (b.serverMaxWindowBits === !1 || typeof b.serverMaxWindowBits == "number" && b.serverMaxWindowBits > S.server_max_window_bits) || typeof b.clientMaxWindowBits == "number" && !S.client_max_window_bits));
      if (!C)
        throw new Error("None of the extension offers can be accepted");
      return b.serverNoContextTakeover && (C.server_no_context_takeover = !0), b.clientNoContextTakeover && (C.client_no_context_takeover = !0), typeof b.serverMaxWindowBits == "number" && (C.server_max_window_bits = b.serverMaxWindowBits), typeof b.clientMaxWindowBits == "number" ? C.client_max_window_bits = b.clientMaxWindowBits : (C.client_max_window_bits === !0 || b.clientMaxWindowBits === !1) && delete C.client_max_window_bits, C;
    }
    /**
     * Accept the extension negotiation response.
     *
     * @param {Array} response The extension negotiation response
     * @return {Object} Accepted configuration
     * @private
     */
    acceptAsClient(x) {
      const b = x[0];
      if (this._options.clientNoContextTakeover === !1 && b.client_no_context_takeover)
        throw new Error('Unexpected parameter "client_no_context_takeover"');
      if (!b.client_max_window_bits)
        typeof this._options.clientMaxWindowBits == "number" && (b.client_max_window_bits = this._options.clientMaxWindowBits);
      else if (this._options.clientMaxWindowBits === !1 || typeof this._options.clientMaxWindowBits == "number" && b.client_max_window_bits > this._options.clientMaxWindowBits)
        throw new Error(
          'Unexpected or invalid parameter "client_max_window_bits"'
        );
      return b;
    }
    /**
     * Normalize parameters.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Array} The offers/response with normalized parameters
     * @private
     */
    normalizeParams(x) {
      return x.forEach((b) => {
        Object.keys(b).forEach((C) => {
          let S = b[C];
          if (S.length > 1)
            throw new Error(`Parameter "${C}" must have only a single value`);
          if (S = S[0], C === "client_max_window_bits") {
            if (S !== !0) {
              const T = +S;
              if (!Number.isInteger(T) || T < 8 || T > 15)
                throw new TypeError(
                  `Invalid value for parameter "${C}": ${S}`
                );
              S = T;
            } else if (!this._isServer)
              throw new TypeError(
                `Invalid value for parameter "${C}": ${S}`
              );
          } else if (C === "server_max_window_bits") {
            const T = +S;
            if (!Number.isInteger(T) || T < 8 || T > 15)
              throw new TypeError(
                `Invalid value for parameter "${C}": ${S}`
              );
            S = T;
          } else if (C === "client_no_context_takeover" || C === "server_no_context_takeover") {
            if (S !== !0)
              throw new TypeError(
                `Invalid value for parameter "${C}": ${S}`
              );
          } else
            throw new Error(`Unknown parameter "${C}"`);
          b[C] = S;
        });
      }), x;
    }
    /**
     * Decompress data. Concurrency limited.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */
    decompress(x, b, C) {
      l.add((S) => {
        this._decompress(x, b, (T, y) => {
          S(), C(T, y);
        });
      });
    }
    /**
     * Compress data. Concurrency limited.
     *
     * @param {(Buffer|String)} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */
    compress(x, b, C) {
      l.add((S) => {
        this._compress(x, b, (T, y) => {
          S(), C(T, y);
        });
      });
    }
    /**
     * Decompress data.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */
    _decompress(x, b, C) {
      const S = this._isServer ? "client" : "server";
      if (!this._inflate) {
        const T = `${S}_max_window_bits`, y = typeof this.params[T] != "number" ? o.Z_DEFAULT_WINDOWBITS : this.params[T];
        this._inflate = o.createInflateRaw({
          ...this._options.zlibInflateOptions,
          windowBits: y
        }), this._inflate[t] = this, this._inflate[a] = 0, this._inflate[e] = [], this._inflate.on("error", f), this._inflate.on("data", s);
      }
      this._inflate[n] = C, this._inflate.write(x), b && this._inflate.write(c), this._inflate.flush(() => {
        const T = this._inflate[i];
        if (T) {
          this._inflate.close(), this._inflate = null, C(T);
          return;
        }
        const y = m.concat(
          this._inflate[e],
          this._inflate[a]
        );
        this._inflate._readableState.endEmitted ? (this._inflate.close(), this._inflate = null) : (this._inflate[a] = 0, this._inflate[e] = [], b && this.params[`${S}_no_context_takeover`] && this._inflate.reset()), C(null, y);
      });
    }
    /**
     * Compress data.
     *
     * @param {(Buffer|String)} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */
    _compress(x, b, C) {
      const S = this._isServer ? "server" : "client";
      if (!this._deflate) {
        const T = `${S}_max_window_bits`, y = typeof this.params[T] != "number" ? o.Z_DEFAULT_WINDOWBITS : this.params[T];
        this._deflate = o.createDeflateRaw({
          ...this._options.zlibDeflateOptions,
          windowBits: y
        }), this._deflate[a] = 0, this._deflate[e] = [], this._deflate.on("data", u);
      }
      this._deflate[n] = C, this._deflate.write(x), this._deflate.flush(o.Z_SYNC_FLUSH, () => {
        if (!this._deflate)
          return;
        let T = m.concat(
          this._deflate[e],
          this._deflate[a]
        );
        b && (T = new d(T.buffer, T.byteOffset, T.length - 4)), this._deflate[n] = null, this._deflate[a] = 0, this._deflate[e] = [], b && this.params[`${S}_no_context_takeover`] && this._deflate.reset(), C(null, T);
      });
    }
  }
  da = r;
  function u(p) {
    this[e].push(p), this[a] += p.length;
  }
  function s(p) {
    if (this[a] += p.length, this[t]._maxPayload < 1 || this[a] <= this[t]._maxPayload) {
      this[e].push(p);
      return;
    }
    this[i] = new RangeError("Max payload size exceeded"), this[i].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH", this[i][h] = 1009, this.removeListener("data", s), this.reset();
  }
  function f(p) {
    if (this[t]._inflate = null, this[i]) {
      this[n](this[i]);
      return;
    }
    p[h] = 1007, this[n](p);
  }
  return da;
}
var Gn = { exports: {} }, Fi = { exports: {} }, fa, Uu;
function Em() {
  if (Uu) return fa;
  Uu = 1;
  function o(m) {
    const v = m.length;
    let h = 0;
    for (; h < v; )
      if ((m[h] & 128) === 0)
        h++;
      else if ((m[h] & 224) === 192) {
        if (h + 1 === v || (m[h + 1] & 192) !== 128 || (m[h] & 254) === 192)
          return !1;
        h += 2;
      } else if ((m[h] & 240) === 224) {
        if (h + 2 >= v || (m[h + 1] & 192) !== 128 || (m[h + 2] & 192) !== 128 || m[h] === 224 && (m[h + 1] & 224) === 128 || // overlong
        m[h] === 237 && (m[h + 1] & 224) === 160)
          return !1;
        h += 3;
      } else if ((m[h] & 248) === 240) {
        if (h + 3 >= v || (m[h + 1] & 192) !== 128 || (m[h + 2] & 192) !== 128 || (m[h + 3] & 192) !== 128 || m[h] === 240 && (m[h + 1] & 240) === 128 || // overlong
        m[h] === 244 && m[h + 1] > 143 || m[h] > 244)
          return !1;
        h += 4;
      } else
        return !1;
    return !0;
  }
  return fa = o, fa;
}
var qu;
function Sm() {
  if (qu) return Fi.exports;
  qu = 1;
  try {
    Fi.exports = sd()(__dirname);
  } catch {
    Fi.exports = Em();
  }
  return Fi.exports;
}
var $u;
function oi() {
  if ($u) return Gn.exports;
  $u = 1;
  const { isUtf8: o } = kf, { hasBlob: m } = At(), v = [
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
    // 0 - 15
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
    // 16 - 31
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    // 32 - 47
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    // 48 - 63
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 64 - 79
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    // 80 - 95
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 96 - 111
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0
    // 112 - 127
  ];
  function h(t) {
    return t >= 1e3 && t <= 1014 && t !== 1004 && t !== 1005 && t !== 1006 || t >= 3e3 && t <= 4999;
  }
  function d(t) {
    const a = t.length;
    let n = 0;
    for (; n < a; )
      if ((t[n] & 128) === 0)
        n++;
      else if ((t[n] & 224) === 192) {
        if (n + 1 === a || (t[n + 1] & 192) !== 128 || (t[n] & 254) === 192)
          return !1;
        n += 2;
      } else if ((t[n] & 240) === 224) {
        if (n + 2 >= a || (t[n + 1] & 192) !== 128 || (t[n + 2] & 192) !== 128 || t[n] === 224 && (t[n + 1] & 224) === 128 || // Overlong
        t[n] === 237 && (t[n + 1] & 224) === 160)
          return !1;
        n += 3;
      } else if ((t[n] & 248) === 240) {
        if (n + 3 >= a || (t[n + 1] & 192) !== 128 || (t[n + 2] & 192) !== 128 || (t[n + 3] & 192) !== 128 || t[n] === 240 && (t[n + 1] & 240) === 128 || // Overlong
        t[n] === 244 && t[n + 1] > 143 || t[n] > 244)
          return !1;
        n += 4;
      } else
        return !1;
    return !0;
  }
  function c(t) {
    return m && typeof t == "object" && typeof t.arrayBuffer == "function" && typeof t.type == "string" && typeof t.stream == "function" && (t[Symbol.toStringTag] === "Blob" || t[Symbol.toStringTag] === "File");
  }
  if (Gn.exports = {
    isBlob: c,
    isValidStatusCode: h,
    isValidUTF8: d,
    tokenChars: v
  }, o)
    Gn.exports.isValidUTF8 = function(t) {
      return t.length < 24 ? d(t) : o(t);
    };
  else if (!process.env.WS_NO_UTF_8_VALIDATE)
    try {
      const t = Sm();
      Gn.exports.isValidUTF8 = function(a) {
        return a.length < 32 ? d(a) : t(a);
      };
    } catch {
    }
  return Gn.exports;
}
var ha, Bu;
function ad() {
  if (Bu) return ha;
  Bu = 1;
  const { Writable: o } = ut, m = Xi(), {
    BINARY_TYPES: v,
    EMPTY_BUFFER: h,
    kStatusCode: d,
    kWebSocket: c
  } = At(), { concat: t, toArrayBuffer: a, unmask: n } = Ki(), { isValidStatusCode: e, isValidUTF8: i } = oi(), l = Buffer[Symbol.species], r = 0, u = 1, s = 2, f = 3, p = 4, x = 5, b = 6;
  class C extends o {
    /**
     * Creates a Receiver instance.
     *
     * @param {Object} [options] Options object
     * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
     *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
     *     multiple times in the same tick
     * @param {String} [options.binaryType=nodebuffer] The type for binary data
     * @param {Object} [options.extensions] An object containing the negotiated
     *     extensions
     * @param {Boolean} [options.isServer=false] Specifies whether to operate in
     *     client or server mode
     * @param {Number} [options.maxPayload=0] The maximum allowed message length
     * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
     *     not to skip UTF-8 validation for text and close messages
     */
    constructor(T = {}) {
      super(), this._allowSynchronousEvents = T.allowSynchronousEvents !== void 0 ? T.allowSynchronousEvents : !0, this._binaryType = T.binaryType || v[0], this._extensions = T.extensions || {}, this._isServer = !!T.isServer, this._maxPayload = T.maxPayload | 0, this._skipUTF8Validation = !!T.skipUTF8Validation, this[c] = void 0, this._bufferedBytes = 0, this._buffers = [], this._compressed = !1, this._payloadLength = 0, this._mask = void 0, this._fragmented = 0, this._masked = !1, this._fin = !1, this._opcode = 0, this._totalPayloadLength = 0, this._messageLength = 0, this._fragments = [], this._errored = !1, this._loop = !1, this._state = r;
    }
    /**
     * Implements `Writable.prototype._write()`.
     *
     * @param {Buffer} chunk The chunk of data to write
     * @param {String} encoding The character encoding of `chunk`
     * @param {Function} cb Callback
     * @private
     */
    _write(T, y, E) {
      if (this._opcode === 8 && this._state == r) return E();
      this._bufferedBytes += T.length, this._buffers.push(T), this.startLoop(E);
    }
    /**
     * Consumes `n` bytes from the buffered data.
     *
     * @param {Number} n The number of bytes to consume
     * @return {Buffer} The consumed bytes
     * @private
     */
    consume(T) {
      if (this._bufferedBytes -= T, T === this._buffers[0].length) return this._buffers.shift();
      if (T < this._buffers[0].length) {
        const E = this._buffers[0];
        return this._buffers[0] = new l(
          E.buffer,
          E.byteOffset + T,
          E.length - T
        ), new l(E.buffer, E.byteOffset, T);
      }
      const y = Buffer.allocUnsafe(T);
      do {
        const E = this._buffers[0], w = y.length - T;
        T >= E.length ? y.set(this._buffers.shift(), w) : (y.set(new Uint8Array(E.buffer, E.byteOffset, T), w), this._buffers[0] = new l(
          E.buffer,
          E.byteOffset + T,
          E.length - T
        )), T -= E.length;
      } while (T > 0);
      return y;
    }
    /**
     * Starts the parsing loop.
     *
     * @param {Function} cb Callback
     * @private
     */
    startLoop(T) {
      this._loop = !0;
      do
        switch (this._state) {
          case r:
            this.getInfo(T);
            break;
          case u:
            this.getPayloadLength16(T);
            break;
          case s:
            this.getPayloadLength64(T);
            break;
          case f:
            this.getMask();
            break;
          case p:
            this.getData(T);
            break;
          case x:
          case b:
            this._loop = !1;
            return;
        }
      while (this._loop);
      this._errored || T();
    }
    /**
     * Reads the first two bytes of a frame.
     *
     * @param {Function} cb Callback
     * @private
     */
    getInfo(T) {
      if (this._bufferedBytes < 2) {
        this._loop = !1;
        return;
      }
      const y = this.consume(2);
      if ((y[0] & 48) !== 0) {
        const w = this.createError(
          RangeError,
          "RSV2 and RSV3 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_2_3"
        );
        T(w);
        return;
      }
      const E = (y[0] & 64) === 64;
      if (E && !this._extensions[m.extensionName]) {
        const w = this.createError(
          RangeError,
          "RSV1 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_1"
        );
        T(w);
        return;
      }
      if (this._fin = (y[0] & 128) === 128, this._opcode = y[0] & 15, this._payloadLength = y[1] & 127, this._opcode === 0) {
        if (E) {
          const w = this.createError(
            RangeError,
            "RSV1 must be clear",
            !0,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          T(w);
          return;
        }
        if (!this._fragmented) {
          const w = this.createError(
            RangeError,
            "invalid opcode 0",
            !0,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          T(w);
          return;
        }
        this._opcode = this._fragmented;
      } else if (this._opcode === 1 || this._opcode === 2) {
        if (this._fragmented) {
          const w = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            !0,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          T(w);
          return;
        }
        this._compressed = E;
      } else if (this._opcode > 7 && this._opcode < 11) {
        if (!this._fin) {
          const w = this.createError(
            RangeError,
            "FIN must be set",
            !0,
            1002,
            "WS_ERR_EXPECTED_FIN"
          );
          T(w);
          return;
        }
        if (E) {
          const w = this.createError(
            RangeError,
            "RSV1 must be clear",
            !0,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          T(w);
          return;
        }
        if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
          const w = this.createError(
            RangeError,
            `invalid payload length ${this._payloadLength}`,
            !0,
            1002,
            "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
          );
          T(w);
          return;
        }
      } else {
        const w = this.createError(
          RangeError,
          `invalid opcode ${this._opcode}`,
          !0,
          1002,
          "WS_ERR_INVALID_OPCODE"
        );
        T(w);
        return;
      }
      if (!this._fin && !this._fragmented && (this._fragmented = this._opcode), this._masked = (y[1] & 128) === 128, this._isServer) {
        if (!this._masked) {
          const w = this.createError(
            RangeError,
            "MASK must be set",
            !0,
            1002,
            "WS_ERR_EXPECTED_MASK"
          );
          T(w);
          return;
        }
      } else if (this._masked) {
        const w = this.createError(
          RangeError,
          "MASK must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_MASK"
        );
        T(w);
        return;
      }
      this._payloadLength === 126 ? this._state = u : this._payloadLength === 127 ? this._state = s : this.haveLength(T);
    }
    /**
     * Gets extended payload length (7+16).
     *
     * @param {Function} cb Callback
     * @private
     */
    getPayloadLength16(T) {
      if (this._bufferedBytes < 2) {
        this._loop = !1;
        return;
      }
      this._payloadLength = this.consume(2).readUInt16BE(0), this.haveLength(T);
    }
    /**
     * Gets extended payload length (7+64).
     *
     * @param {Function} cb Callback
     * @private
     */
    getPayloadLength64(T) {
      if (this._bufferedBytes < 8) {
        this._loop = !1;
        return;
      }
      const y = this.consume(8), E = y.readUInt32BE(0);
      if (E > Math.pow(2, 21) - 1) {
        const w = this.createError(
          RangeError,
          "Unsupported WebSocket frame: payload length > 2^53 - 1",
          !1,
          1009,
          "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
        );
        T(w);
        return;
      }
      this._payloadLength = E * Math.pow(2, 32) + y.readUInt32BE(4), this.haveLength(T);
    }
    /**
     * Payload length has been read.
     *
     * @param {Function} cb Callback
     * @private
     */
    haveLength(T) {
      if (this._payloadLength && this._opcode < 8 && (this._totalPayloadLength += this._payloadLength, this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)) {
        const y = this.createError(
          RangeError,
          "Max payload size exceeded",
          !1,
          1009,
          "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
        );
        T(y);
        return;
      }
      this._masked ? this._state = f : this._state = p;
    }
    /**
     * Reads mask bytes.
     *
     * @private
     */
    getMask() {
      if (this._bufferedBytes < 4) {
        this._loop = !1;
        return;
      }
      this._mask = this.consume(4), this._state = p;
    }
    /**
     * Reads data bytes.
     *
     * @param {Function} cb Callback
     * @private
     */
    getData(T) {
      let y = h;
      if (this._payloadLength) {
        if (this._bufferedBytes < this._payloadLength) {
          this._loop = !1;
          return;
        }
        y = this.consume(this._payloadLength), this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0 && n(y, this._mask);
      }
      if (this._opcode > 7) {
        this.controlMessage(y, T);
        return;
      }
      if (this._compressed) {
        this._state = x, this.decompress(y, T);
        return;
      }
      y.length && (this._messageLength = this._totalPayloadLength, this._fragments.push(y)), this.dataMessage(T);
    }
    /**
     * Decompresses data.
     *
     * @param {Buffer} data Compressed data
     * @param {Function} cb Callback
     * @private
     */
    decompress(T, y) {
      this._extensions[m.extensionName].decompress(T, this._fin, (w, _) => {
        if (w) return y(w);
        if (_.length) {
          if (this._messageLength += _.length, this._messageLength > this._maxPayload && this._maxPayload > 0) {
            const D = this.createError(
              RangeError,
              "Max payload size exceeded",
              !1,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
            y(D);
            return;
          }
          this._fragments.push(_);
        }
        this.dataMessage(y), this._state === r && this.startLoop(y);
      });
    }
    /**
     * Handles a data message.
     *
     * @param {Function} cb Callback
     * @private
     */
    dataMessage(T) {
      if (!this._fin) {
        this._state = r;
        return;
      }
      const y = this._messageLength, E = this._fragments;
      if (this._totalPayloadLength = 0, this._messageLength = 0, this._fragmented = 0, this._fragments = [], this._opcode === 2) {
        let w;
        this._binaryType === "nodebuffer" ? w = t(E, y) : this._binaryType === "arraybuffer" ? w = a(t(E, y)) : this._binaryType === "blob" ? w = new Blob(E) : w = E, this._allowSynchronousEvents ? (this.emit("message", w, !0), this._state = r) : (this._state = b, setImmediate(() => {
          this.emit("message", w, !0), this._state = r, this.startLoop(T);
        }));
      } else {
        const w = t(E, y);
        if (!this._skipUTF8Validation && !i(w)) {
          const _ = this.createError(
            Error,
            "invalid UTF-8 sequence",
            !0,
            1007,
            "WS_ERR_INVALID_UTF8"
          );
          T(_);
          return;
        }
        this._state === x || this._allowSynchronousEvents ? (this.emit("message", w, !1), this._state = r) : (this._state = b, setImmediate(() => {
          this.emit("message", w, !1), this._state = r, this.startLoop(T);
        }));
      }
    }
    /**
     * Handles a control message.
     *
     * @param {Buffer} data Data to handle
     * @return {(Error|RangeError|undefined)} A possible error
     * @private
     */
    controlMessage(T, y) {
      if (this._opcode === 8) {
        if (T.length === 0)
          this._loop = !1, this.emit("conclude", 1005, h), this.end();
        else {
          const E = T.readUInt16BE(0);
          if (!e(E)) {
            const _ = this.createError(
              RangeError,
              `invalid status code ${E}`,
              !0,
              1002,
              "WS_ERR_INVALID_CLOSE_CODE"
            );
            y(_);
            return;
          }
          const w = new l(
            T.buffer,
            T.byteOffset + 2,
            T.length - 2
          );
          if (!this._skipUTF8Validation && !i(w)) {
            const _ = this.createError(
              Error,
              "invalid UTF-8 sequence",
              !0,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            y(_);
            return;
          }
          this._loop = !1, this.emit("conclude", E, w), this.end();
        }
        this._state = r;
        return;
      }
      this._allowSynchronousEvents ? (this.emit(this._opcode === 9 ? "ping" : "pong", T), this._state = r) : (this._state = b, setImmediate(() => {
        this.emit(this._opcode === 9 ? "ping" : "pong", T), this._state = r, this.startLoop(y);
      }));
    }
    /**
     * Builds an error object.
     *
     * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
     * @param {String} message The error message
     * @param {Boolean} prefix Specifies whether or not to add a default prefix to
     *     `message`
     * @param {Number} statusCode The status code
     * @param {String} errorCode The exposed error code
     * @return {(Error|RangeError)} The error
     * @private
     */
    createError(T, y, E, w, _) {
      this._loop = !1, this._errored = !0;
      const D = new T(
        E ? `Invalid WebSocket frame: ${y}` : y
      );
      return Error.captureStackTrace(D, this.createError), D.code = _, D[d] = w, D;
    }
  }
  return ha = C, ha;
}
var ma, ju;
function od() {
  if (ju) return ma;
  ju = 1;
  const { Duplex: o } = ut, { randomFillSync: m } = ht, v = Xi(), { EMPTY_BUFFER: h, kWebSocket: d, NOOP: c } = At(), { isBlob: t, isValidStatusCode: a } = oi(), { mask: n, toBuffer: e } = Ki(), i = Symbol("kByteLength"), l = Buffer.alloc(4), r = 8 * 1024;
  let u, s = r;
  const f = 0, p = 1, x = 2;
  class b {
    /**
     * Creates a Sender instance.
     *
     * @param {Duplex} socket The connection socket
     * @param {Object} [extensions] An object containing the negotiated extensions
     * @param {Function} [generateMask] The function used to generate the masking
     *     key
     */
    constructor(y, E, w) {
      this._extensions = E || {}, w && (this._generateMask = w, this._maskBuffer = Buffer.alloc(4)), this._socket = y, this._firstFragment = !0, this._compress = !1, this._bufferedBytes = 0, this._queue = [], this._state = f, this.onerror = c, this[d] = void 0;
    }
    /**
     * Frames a piece of data according to the HyBi WebSocket protocol.
     *
     * @param {(Buffer|String)} data The data to frame
     * @param {Object} options Options object
     * @param {Boolean} [options.fin=false] Specifies whether or not to set the
     *     FIN bit
     * @param {Function} [options.generateMask] The function used to generate the
     *     masking key
     * @param {Boolean} [options.mask=false] Specifies whether or not to mask
     *     `data`
     * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
     *     key
     * @param {Number} options.opcode The opcode
     * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
     *     modified
     * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
     *     RSV1 bit
     * @return {(Buffer|String)[]} The framed data
     * @public
     */
    static frame(y, E) {
      let w, _ = !1, D = 2, O = !1;
      E.mask && (w = E.maskBuffer || l, E.generateMask ? E.generateMask(w) : (s === r && (u === void 0 && (u = Buffer.alloc(r)), m(u, 0, r), s = 0), w[0] = u[s++], w[1] = u[s++], w[2] = u[s++], w[3] = u[s++]), O = (w[0] | w[1] | w[2] | w[3]) === 0, D = 6);
      let I;
      typeof y == "string" ? (!E.mask || O) && E[i] !== void 0 ? I = E[i] : (y = Buffer.from(y), I = y.length) : (I = y.length, _ = E.mask && E.readOnly && !O);
      let q = I;
      I >= 65536 ? (D += 8, q = 127) : I > 125 && (D += 2, q = 126);
      const R = Buffer.allocUnsafe(_ ? I + D : D);
      return R[0] = E.fin ? E.opcode | 128 : E.opcode, E.rsv1 && (R[0] |= 64), R[1] = q, q === 126 ? R.writeUInt16BE(I, 2) : q === 127 && (R[2] = R[3] = 0, R.writeUIntBE(I, 4, 6)), E.mask ? (R[1] |= 128, R[D - 4] = w[0], R[D - 3] = w[1], R[D - 2] = w[2], R[D - 1] = w[3], O ? [R, y] : _ ? (n(y, w, R, D, I), [R]) : (n(y, w, y, 0, I), [R, y])) : [R, y];
    }
    /**
     * Sends a close message to the other peer.
     *
     * @param {Number} [code] The status code component of the body
     * @param {(String|Buffer)} [data] The message component of the body
     * @param {Boolean} [mask=false] Specifies whether or not to mask the message
     * @param {Function} [cb] Callback
     * @public
     */
    close(y, E, w, _) {
      let D;
      if (y === void 0)
        D = h;
      else {
        if (typeof y != "number" || !a(y))
          throw new TypeError("First argument must be a valid error code number");
        if (E === void 0 || !E.length)
          D = Buffer.allocUnsafe(2), D.writeUInt16BE(y, 0);
        else {
          const I = Buffer.byteLength(E);
          if (I > 123)
            throw new RangeError("The message must not be greater than 123 bytes");
          D = Buffer.allocUnsafe(2 + I), D.writeUInt16BE(y, 0), typeof E == "string" ? D.write(E, 2) : D.set(E, 2);
        }
      }
      const O = {
        [i]: D.length,
        fin: !0,
        generateMask: this._generateMask,
        mask: w,
        maskBuffer: this._maskBuffer,
        opcode: 8,
        readOnly: !1,
        rsv1: !1
      };
      this._state !== f ? this.enqueue([this.dispatch, D, !1, O, _]) : this.sendFrame(b.frame(D, O), _);
    }
    /**
     * Sends a ping message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
     * @param {Function} [cb] Callback
     * @public
     */
    ping(y, E, w) {
      let _, D;
      if (typeof y == "string" ? (_ = Buffer.byteLength(y), D = !1) : t(y) ? (_ = y.size, D = !1) : (y = e(y), _ = y.length, D = e.readOnly), _ > 125)
        throw new RangeError("The data size must not be greater than 125 bytes");
      const O = {
        [i]: _,
        fin: !0,
        generateMask: this._generateMask,
        mask: E,
        maskBuffer: this._maskBuffer,
        opcode: 9,
        readOnly: D,
        rsv1: !1
      };
      t(y) ? this._state !== f ? this.enqueue([this.getBlobData, y, !1, O, w]) : this.getBlobData(y, !1, O, w) : this._state !== f ? this.enqueue([this.dispatch, y, !1, O, w]) : this.sendFrame(b.frame(y, O), w);
    }
    /**
     * Sends a pong message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
     * @param {Function} [cb] Callback
     * @public
     */
    pong(y, E, w) {
      let _, D;
      if (typeof y == "string" ? (_ = Buffer.byteLength(y), D = !1) : t(y) ? (_ = y.size, D = !1) : (y = e(y), _ = y.length, D = e.readOnly), _ > 125)
        throw new RangeError("The data size must not be greater than 125 bytes");
      const O = {
        [i]: _,
        fin: !0,
        generateMask: this._generateMask,
        mask: E,
        maskBuffer: this._maskBuffer,
        opcode: 10,
        readOnly: D,
        rsv1: !1
      };
      t(y) ? this._state !== f ? this.enqueue([this.getBlobData, y, !1, O, w]) : this.getBlobData(y, !1, O, w) : this._state !== f ? this.enqueue([this.dispatch, y, !1, O, w]) : this.sendFrame(b.frame(y, O), w);
    }
    /**
     * Sends a data message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Object} options Options object
     * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
     *     or text
     * @param {Boolean} [options.compress=false] Specifies whether or not to
     *     compress `data`
     * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
     *     last one
     * @param {Boolean} [options.mask=false] Specifies whether or not to mask
     *     `data`
     * @param {Function} [cb] Callback
     * @public
     */
    send(y, E, w) {
      const _ = this._extensions[v.extensionName];
      let D = E.binary ? 2 : 1, O = E.compress, I, q;
      typeof y == "string" ? (I = Buffer.byteLength(y), q = !1) : t(y) ? (I = y.size, q = !1) : (y = e(y), I = y.length, q = e.readOnly), this._firstFragment ? (this._firstFragment = !1, O && _ && _.params[_._isServer ? "server_no_context_takeover" : "client_no_context_takeover"] && (O = I >= _._threshold), this._compress = O) : (O = !1, D = 0), E.fin && (this._firstFragment = !0);
      const R = {
        [i]: I,
        fin: E.fin,
        generateMask: this._generateMask,
        mask: E.mask,
        maskBuffer: this._maskBuffer,
        opcode: D,
        readOnly: q,
        rsv1: O
      };
      t(y) ? this._state !== f ? this.enqueue([this.getBlobData, y, this._compress, R, w]) : this.getBlobData(y, this._compress, R, w) : this._state !== f ? this.enqueue([this.dispatch, y, this._compress, R, w]) : this.dispatch(y, this._compress, R, w);
    }
    /**
     * Gets the contents of a blob as binary data.
     *
     * @param {Blob} blob The blob
     * @param {Boolean} [compress=false] Specifies whether or not to compress
     *     the data
     * @param {Object} options Options object
     * @param {Boolean} [options.fin=false] Specifies whether or not to set the
     *     FIN bit
     * @param {Function} [options.generateMask] The function used to generate the
     *     masking key
     * @param {Boolean} [options.mask=false] Specifies whether or not to mask
     *     `data`
     * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
     *     key
     * @param {Number} options.opcode The opcode
     * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
     *     modified
     * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
     *     RSV1 bit
     * @param {Function} [cb] Callback
     * @private
     */
    getBlobData(y, E, w, _) {
      this._bufferedBytes += w[i], this._state = x, y.arrayBuffer().then((D) => {
        if (this._socket.destroyed) {
          const I = new Error(
            "The socket was closed while the blob was being read"
          );
          process.nextTick(C, this, I, _);
          return;
        }
        this._bufferedBytes -= w[i];
        const O = e(D);
        E ? this.dispatch(O, E, w, _) : (this._state = f, this.sendFrame(b.frame(O, w), _), this.dequeue());
      }).catch((D) => {
        process.nextTick(S, this, D, _);
      });
    }
    /**
     * Dispatches a message.
     *
     * @param {(Buffer|String)} data The message to send
     * @param {Boolean} [compress=false] Specifies whether or not to compress
     *     `data`
     * @param {Object} options Options object
     * @param {Boolean} [options.fin=false] Specifies whether or not to set the
     *     FIN bit
     * @param {Function} [options.generateMask] The function used to generate the
     *     masking key
     * @param {Boolean} [options.mask=false] Specifies whether or not to mask
     *     `data`
     * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
     *     key
     * @param {Number} options.opcode The opcode
     * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
     *     modified
     * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
     *     RSV1 bit
     * @param {Function} [cb] Callback
     * @private
     */
    dispatch(y, E, w, _) {
      if (!E) {
        this.sendFrame(b.frame(y, w), _);
        return;
      }
      const D = this._extensions[v.extensionName];
      this._bufferedBytes += w[i], this._state = p, D.compress(y, w.fin, (O, I) => {
        if (this._socket.destroyed) {
          const q = new Error(
            "The socket was closed while data was being compressed"
          );
          C(this, q, _);
          return;
        }
        this._bufferedBytes -= w[i], this._state = f, w.readOnly = !1, this.sendFrame(b.frame(I, w), _), this.dequeue();
      });
    }
    /**
     * Executes queued send operations.
     *
     * @private
     */
    dequeue() {
      for (; this._state === f && this._queue.length; ) {
        const y = this._queue.shift();
        this._bufferedBytes -= y[3][i], Reflect.apply(y[0], this, y.slice(1));
      }
    }
    /**
     * Enqueues a send operation.
     *
     * @param {Array} params Send operation parameters.
     * @private
     */
    enqueue(y) {
      this._bufferedBytes += y[3][i], this._queue.push(y);
    }
    /**
     * Sends a frame.
     *
     * @param {(Buffer | String)[]} list The frame to send
     * @param {Function} [cb] Callback
     * @private
     */
    sendFrame(y, E) {
      y.length === 2 ? (this._socket.cork(), this._socket.write(y[0]), this._socket.write(y[1], E), this._socket.uncork()) : this._socket.write(y[0], E);
    }
  }
  ma = b;
  function C(T, y, E) {
    typeof E == "function" && E(y);
    for (let w = 0; w < T._queue.length; w++) {
      const _ = T._queue[w], D = _[_.length - 1];
      typeof D == "function" && D(y);
    }
  }
  function S(T, y, E) {
    C(T, y, E), T.onerror(y);
  }
  return ma;
}
var va, Mu;
function Tm() {
  if (Mu) return va;
  Mu = 1;
  const { kForOnEventAttribute: o, kListener: m } = At(), v = Symbol("kCode"), h = Symbol("kData"), d = Symbol("kError"), c = Symbol("kMessage"), t = Symbol("kReason"), a = Symbol("kTarget"), n = Symbol("kType"), e = Symbol("kWasClean");
  class i {
    /**
     * Create a new `Event`.
     *
     * @param {String} type The name of the event
     * @throws {TypeError} If the `type` argument is not specified
     */
    constructor(x) {
      this[a] = null, this[n] = x;
    }
    /**
     * @type {*}
     */
    get target() {
      return this[a];
    }
    /**
     * @type {String}
     */
    get type() {
      return this[n];
    }
  }
  Object.defineProperty(i.prototype, "target", { enumerable: !0 }), Object.defineProperty(i.prototype, "type", { enumerable: !0 });
  class l extends i {
    /**
     * Create a new `CloseEvent`.
     *
     * @param {String} type The name of the event
     * @param {Object} [options] A dictionary object that allows for setting
     *     attributes via object members of the same name
     * @param {Number} [options.code=0] The status code explaining why the
     *     connection was closed
     * @param {String} [options.reason=''] A human-readable string explaining why
     *     the connection was closed
     * @param {Boolean} [options.wasClean=false] Indicates whether or not the
     *     connection was cleanly closed
     */
    constructor(x, b = {}) {
      super(x), this[v] = b.code === void 0 ? 0 : b.code, this[t] = b.reason === void 0 ? "" : b.reason, this[e] = b.wasClean === void 0 ? !1 : b.wasClean;
    }
    /**
     * @type {Number}
     */
    get code() {
      return this[v];
    }
    /**
     * @type {String}
     */
    get reason() {
      return this[t];
    }
    /**
     * @type {Boolean}
     */
    get wasClean() {
      return this[e];
    }
  }
  Object.defineProperty(l.prototype, "code", { enumerable: !0 }), Object.defineProperty(l.prototype, "reason", { enumerable: !0 }), Object.defineProperty(l.prototype, "wasClean", { enumerable: !0 });
  class r extends i {
    /**
     * Create a new `ErrorEvent`.
     *
     * @param {String} type The name of the event
     * @param {Object} [options] A dictionary object that allows for setting
     *     attributes via object members of the same name
     * @param {*} [options.error=null] The error that generated this event
     * @param {String} [options.message=''] The error message
     */
    constructor(x, b = {}) {
      super(x), this[d] = b.error === void 0 ? null : b.error, this[c] = b.message === void 0 ? "" : b.message;
    }
    /**
     * @type {*}
     */
    get error() {
      return this[d];
    }
    /**
     * @type {String}
     */
    get message() {
      return this[c];
    }
  }
  Object.defineProperty(r.prototype, "error", { enumerable: !0 }), Object.defineProperty(r.prototype, "message", { enumerable: !0 });
  class u extends i {
    /**
     * Create a new `MessageEvent`.
     *
     * @param {String} type The name of the event
     * @param {Object} [options] A dictionary object that allows for setting
     *     attributes via object members of the same name
     * @param {*} [options.data=null] The message content
     */
    constructor(x, b = {}) {
      super(x), this[h] = b.data === void 0 ? null : b.data;
    }
    /**
     * @type {*}
     */
    get data() {
      return this[h];
    }
  }
  Object.defineProperty(u.prototype, "data", { enumerable: !0 }), va = {
    CloseEvent: l,
    ErrorEvent: r,
    Event: i,
    EventTarget: {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(p, x, b = {}) {
        for (const S of this.listeners(p))
          if (!b[o] && S[m] === x && !S[o])
            return;
        let C;
        if (p === "message")
          C = function(T, y) {
            const E = new u("message", {
              data: y ? T : T.toString()
            });
            E[a] = this, f(x, this, E);
          };
        else if (p === "close")
          C = function(T, y) {
            const E = new l("close", {
              code: T,
              reason: y.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            E[a] = this, f(x, this, E);
          };
        else if (p === "error")
          C = function(T) {
            const y = new r("error", {
              error: T,
              message: T.message
            });
            y[a] = this, f(x, this, y);
          };
        else if (p === "open")
          C = function() {
            const T = new i("open");
            T[a] = this, f(x, this, T);
          };
        else
          return;
        C[o] = !!b[o], C[m] = x, b.once ? this.once(p, C) : this.on(p, C);
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(p, x) {
        for (const b of this.listeners(p))
          if (b[m] === x && !b[o]) {
            this.removeListener(p, b);
            break;
          }
      }
    },
    MessageEvent: u
  };
  function f(p, x, b) {
    typeof p == "object" && p.handleEvent ? p.handleEvent.call(p, b) : p.call(x, b);
  }
  return va;
}
var ga, Hu;
function cd() {
  if (Hu) return ga;
  Hu = 1;
  const { tokenChars: o } = oi();
  function m(d, c, t) {
    d[c] === void 0 ? d[c] = [t] : d[c].push(t);
  }
  function v(d) {
    const c = /* @__PURE__ */ Object.create(null);
    let t = /* @__PURE__ */ Object.create(null), a = !1, n = !1, e = !1, i, l, r = -1, u = -1, s = -1, f = 0;
    for (; f < d.length; f++)
      if (u = d.charCodeAt(f), i === void 0)
        if (s === -1 && o[u] === 1)
          r === -1 && (r = f);
        else if (f !== 0 && (u === 32 || u === 9))
          s === -1 && r !== -1 && (s = f);
        else if (u === 59 || u === 44) {
          if (r === -1)
            throw new SyntaxError(`Unexpected character at index ${f}`);
          s === -1 && (s = f);
          const x = d.slice(r, s);
          u === 44 ? (m(c, x, t), t = /* @__PURE__ */ Object.create(null)) : i = x, r = s = -1;
        } else
          throw new SyntaxError(`Unexpected character at index ${f}`);
      else if (l === void 0)
        if (s === -1 && o[u] === 1)
          r === -1 && (r = f);
        else if (u === 32 || u === 9)
          s === -1 && r !== -1 && (s = f);
        else if (u === 59 || u === 44) {
          if (r === -1)
            throw new SyntaxError(`Unexpected character at index ${f}`);
          s === -1 && (s = f), m(t, d.slice(r, s), !0), u === 44 && (m(c, i, t), t = /* @__PURE__ */ Object.create(null), i = void 0), r = s = -1;
        } else if (u === 61 && r !== -1 && s === -1)
          l = d.slice(r, f), r = s = -1;
        else
          throw new SyntaxError(`Unexpected character at index ${f}`);
      else if (n) {
        if (o[u] !== 1)
          throw new SyntaxError(`Unexpected character at index ${f}`);
        r === -1 ? r = f : a || (a = !0), n = !1;
      } else if (e)
        if (o[u] === 1)
          r === -1 && (r = f);
        else if (u === 34 && r !== -1)
          e = !1, s = f;
        else if (u === 92)
          n = !0;
        else
          throw new SyntaxError(`Unexpected character at index ${f}`);
      else if (u === 34 && d.charCodeAt(f - 1) === 61)
        e = !0;
      else if (s === -1 && o[u] === 1)
        r === -1 && (r = f);
      else if (r !== -1 && (u === 32 || u === 9))
        s === -1 && (s = f);
      else if (u === 59 || u === 44) {
        if (r === -1)
          throw new SyntaxError(`Unexpected character at index ${f}`);
        s === -1 && (s = f);
        let x = d.slice(r, s);
        a && (x = x.replace(/\\/g, ""), a = !1), m(t, l, x), u === 44 && (m(c, i, t), t = /* @__PURE__ */ Object.create(null), i = void 0), l = void 0, r = s = -1;
      } else
        throw new SyntaxError(`Unexpected character at index ${f}`);
    if (r === -1 || e || u === 32 || u === 9)
      throw new SyntaxError("Unexpected end of input");
    s === -1 && (s = f);
    const p = d.slice(r, s);
    return i === void 0 ? m(c, p, t) : (l === void 0 ? m(t, p, !0) : a ? m(t, l, p.replace(/\\/g, "")) : m(t, l, p), m(c, i, t)), c;
  }
  function h(d) {
    return Object.keys(d).map((c) => {
      let t = d[c];
      return Array.isArray(t) || (t = [t]), t.map((a) => [c].concat(
        Object.keys(a).map((n) => {
          let e = a[n];
          return Array.isArray(e) || (e = [e]), e.map((i) => i === !0 ? n : `${n}=${i}`).join("; ");
        })
      ).join("; ")).join(", ");
    }).join(", ");
  }
  return ga = { format: h, parse: v }, ga;
}
var xa, zu;
function za() {
  if (zu) return xa;
  zu = 1;
  const o = ft, m = Cf, v = ii, h = Rf, d = Af, { randomBytes: c, createHash: t } = ht, { Duplex: a, Readable: n } = ut, { URL: e } = Vt, i = Xi(), l = ad(), r = od(), { isBlob: u } = oi(), {
    BINARY_TYPES: s,
    EMPTY_BUFFER: f,
    GUID: p,
    kForOnEventAttribute: x,
    kListener: b,
    kStatusCode: C,
    kWebSocket: S,
    NOOP: T
  } = At(), {
    EventTarget: { addEventListener: y, removeEventListener: E }
  } = Tm(), { format: w, parse: _ } = cd(), { toBuffer: D } = Ki(), O = 30 * 1e3, I = Symbol("kAborted"), q = [8, 13], R = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"], N = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
  class F extends o {
    /**
     * Create a new `WebSocket`.
     *
     * @param {(String|URL)} address The URL to which to connect
     * @param {(String|String[])} [protocols] The subprotocols
     * @param {Object} [options] Connection options
     */
    constructor(Y, he, Ee) {
      super(), this._binaryType = s[0], this._closeCode = 1006, this._closeFrameReceived = !1, this._closeFrameSent = !1, this._closeMessage = f, this._closeTimer = null, this._errorEmitted = !1, this._extensions = {}, this._paused = !1, this._protocol = "", this._readyState = F.CONNECTING, this._receiver = null, this._sender = null, this._socket = null, Y !== null ? (this._bufferedAmount = 0, this._isServer = !1, this._redirects = 0, he === void 0 ? he = [] : Array.isArray(he) || (typeof he == "object" && he !== null ? (Ee = he, he = []) : he = [he]), U(this, Y, he, Ee)) : (this._autoPong = Ee.autoPong, this._isServer = !0);
    }
    /**
     * For historical reasons, the custom "nodebuffer" type is used by the default
     * instead of "blob".
     *
     * @type {String}
     */
    get binaryType() {
      return this._binaryType;
    }
    set binaryType(Y) {
      s.includes(Y) && (this._binaryType = Y, this._receiver && (this._receiver._binaryType = Y));
    }
    /**
     * @type {Number}
     */
    get bufferedAmount() {
      return this._socket ? this._socket._writableState.length + this._sender._bufferedBytes : this._bufferedAmount;
    }
    /**
     * @type {String}
     */
    get extensions() {
      return Object.keys(this._extensions).join();
    }
    /**
     * @type {Boolean}
     */
    get isPaused() {
      return this._paused;
    }
    /**
     * @type {Function}
     */
    /* istanbul ignore next */
    get onclose() {
      return null;
    }
    /**
     * @type {Function}
     */
    /* istanbul ignore next */
    get onerror() {
      return null;
    }
    /**
     * @type {Function}
     */
    /* istanbul ignore next */
    get onopen() {
      return null;
    }
    /**
     * @type {Function}
     */
    /* istanbul ignore next */
    get onmessage() {
      return null;
    }
    /**
     * @type {String}
     */
    get protocol() {
      return this._protocol;
    }
    /**
     * @type {Number}
     */
    get readyState() {
      return this._readyState;
    }
    /**
     * @type {String}
     */
    get url() {
      return this._url;
    }
    /**
     * Set up the socket and the internal resources.
     *
     * @param {Duplex} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Object} options Options object
     * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
     *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
     *     multiple times in the same tick
     * @param {Function} [options.generateMask] The function used to generate the
     *     masking key
     * @param {Number} [options.maxPayload=0] The maximum allowed message size
     * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
     *     not to skip UTF-8 validation for text and close messages
     * @private
     */
    setSocket(Y, he, Ee) {
      const ue = new l({
        allowSynchronousEvents: Ee.allowSynchronousEvents,
        binaryType: this.binaryType,
        extensions: this._extensions,
        isServer: this._isServer,
        maxPayload: Ee.maxPayload,
        skipUTF8Validation: Ee.skipUTF8Validation
      }), g = new r(Y, this._extensions, Ee.generateMask);
      this._receiver = ue, this._sender = g, this._socket = Y, ue[S] = this, g[S] = this, Y[S] = this, ue.on("conclude", ye), ue.on("drain", _e), ue.on("error", Z), ue.on("message", k), ue.on("ping", A), ue.on("pong", G), g.onerror = me, Y.setTimeout && Y.setTimeout(0), Y.setNoDelay && Y.setNoDelay(), he.length > 0 && Y.unshift(he), Y.on("close", we), Y.on("data", Re), Y.on("end", Ce), Y.on("error", Be), this._readyState = F.OPEN, this.emit("open");
    }
    /**
     * Emit the `'close'` event.
     *
     * @private
     */
    emitClose() {
      if (!this._socket) {
        this._readyState = F.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
        return;
      }
      this._extensions[i.extensionName] && this._extensions[i.extensionName].cleanup(), this._receiver.removeAllListeners(), this._readyState = F.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
    }
    /**
     * Start a closing handshake.
     *
     *          +----------+   +-----------+   +----------+
     *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
     *    |     +----------+   +-----------+   +----------+     |
     *          +----------+   +-----------+         |
     * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
     *          +----------+   +-----------+   |
     *    |           |                        |   +---+        |
     *                +------------------------+-->|fin| - - - -
     *    |         +---+                      |   +---+
     *     - - - - -|fin|<---------------------+
     *              +---+
     *
     * @param {Number} [code] Status code explaining why the connection is closing
     * @param {(String|Buffer)} [data] The reason why the connection is
     *     closing
     * @public
     */
    close(Y, he) {
      if (this.readyState !== F.CLOSED) {
        if (this.readyState === F.CONNECTING) {
          ae(this, this._req, "WebSocket was closed before the connection was established");
          return;
        }
        if (this.readyState === F.CLOSING) {
          this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end();
          return;
        }
        this._readyState = F.CLOSING, this._sender.close(Y, he, !this._isServer, (Ee) => {
          Ee || (this._closeFrameSent = !0, (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end());
        }), be(this);
      }
    }
    /**
     * Pause the socket.
     *
     * @public
     */
    pause() {
      this.readyState === F.CONNECTING || this.readyState === F.CLOSED || (this._paused = !0, this._socket.pause());
    }
    /**
     * Send a ping.
     *
     * @param {*} [data] The data to send
     * @param {Boolean} [mask] Indicates whether or not to mask `data`
     * @param {Function} [cb] Callback which is executed when the ping is sent
     * @public
     */
    ping(Y, he, Ee) {
      if (this.readyState === F.CONNECTING)
        throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
      if (typeof Y == "function" ? (Ee = Y, Y = he = void 0) : typeof he == "function" && (Ee = he, he = void 0), typeof Y == "number" && (Y = Y.toString()), this.readyState !== F.OPEN) {
        oe(this, Y, Ee);
        return;
      }
      he === void 0 && (he = !this._isServer), this._sender.ping(Y || f, he, Ee);
    }
    /**
     * Send a pong.
     *
     * @param {*} [data] The data to send
     * @param {Boolean} [mask] Indicates whether or not to mask `data`
     * @param {Function} [cb] Callback which is executed when the pong is sent
     * @public
     */
    pong(Y, he, Ee) {
      if (this.readyState === F.CONNECTING)
        throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
      if (typeof Y == "function" ? (Ee = Y, Y = he = void 0) : typeof he == "function" && (Ee = he, he = void 0), typeof Y == "number" && (Y = Y.toString()), this.readyState !== F.OPEN) {
        oe(this, Y, Ee);
        return;
      }
      he === void 0 && (he = !this._isServer), this._sender.pong(Y || f, he, Ee);
    }
    /**
     * Resume the socket.
     *
     * @public
     */
    resume() {
      this.readyState === F.CONNECTING || this.readyState === F.CLOSED || (this._paused = !1, this._receiver._writableState.needDrain || this._socket.resume());
    }
    /**
     * Send a data message.
     *
     * @param {*} data The message to send
     * @param {Object} [options] Options object
     * @param {Boolean} [options.binary] Specifies whether `data` is binary or
     *     text
     * @param {Boolean} [options.compress] Specifies whether or not to compress
     *     `data`
     * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
     *     last one
     * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
     * @param {Function} [cb] Callback which is executed when data is written out
     * @public
     */
    send(Y, he, Ee) {
      if (this.readyState === F.CONNECTING)
        throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
      if (typeof he == "function" && (Ee = he, he = {}), typeof Y == "number" && (Y = Y.toString()), this.readyState !== F.OPEN) {
        oe(this, Y, Ee);
        return;
      }
      const ue = {
        binary: typeof Y != "string",
        mask: !this._isServer,
        compress: !0,
        fin: !0,
        ...he
      };
      this._extensions[i.extensionName] || (ue.compress = !1), this._sender.send(Y || f, ue, Ee);
    }
    /**
     * Forcibly close the connection.
     *
     * @public
     */
    terminate() {
      if (this.readyState !== F.CLOSED) {
        if (this.readyState === F.CONNECTING) {
          ae(this, this._req, "WebSocket was closed before the connection was established");
          return;
        }
        this._socket && (this._readyState = F.CLOSING, this._socket.destroy());
      }
    }
  }
  Object.defineProperty(F, "CONNECTING", {
    enumerable: !0,
    value: R.indexOf("CONNECTING")
  }), Object.defineProperty(F.prototype, "CONNECTING", {
    enumerable: !0,
    value: R.indexOf("CONNECTING")
  }), Object.defineProperty(F, "OPEN", {
    enumerable: !0,
    value: R.indexOf("OPEN")
  }), Object.defineProperty(F.prototype, "OPEN", {
    enumerable: !0,
    value: R.indexOf("OPEN")
  }), Object.defineProperty(F, "CLOSING", {
    enumerable: !0,
    value: R.indexOf("CLOSING")
  }), Object.defineProperty(F.prototype, "CLOSING", {
    enumerable: !0,
    value: R.indexOf("CLOSING")
  }), Object.defineProperty(F, "CLOSED", {
    enumerable: !0,
    value: R.indexOf("CLOSED")
  }), Object.defineProperty(F.prototype, "CLOSED", {
    enumerable: !0,
    value: R.indexOf("CLOSED")
  }), [
    "binaryType",
    "bufferedAmount",
    "extensions",
    "isPaused",
    "protocol",
    "readyState",
    "url"
  ].forEach((j) => {
    Object.defineProperty(F.prototype, j, { enumerable: !0 });
  }), ["open", "error", "close", "message"].forEach((j) => {
    Object.defineProperty(F.prototype, `on${j}`, {
      enumerable: !0,
      get() {
        for (const Y of this.listeners(j))
          if (Y[x]) return Y[b];
        return null;
      },
      set(Y) {
        for (const he of this.listeners(j))
          if (he[x]) {
            this.removeListener(j, he);
            break;
          }
        typeof Y == "function" && this.addEventListener(j, Y, {
          [x]: !0
        });
      }
    });
  }), F.prototype.addEventListener = y, F.prototype.removeEventListener = E, xa = F;
  function U(j, Y, he, Ee) {
    const ue = {
      allowSynchronousEvents: !0,
      autoPong: !0,
      protocolVersion: q[1],
      maxPayload: 104857600,
      skipUTF8Validation: !1,
      perMessageDeflate: !0,
      followRedirects: !1,
      maxRedirects: 10,
      ...Ee,
      socketPath: void 0,
      hostname: void 0,
      protocol: void 0,
      timeout: void 0,
      method: "GET",
      host: void 0,
      path: void 0,
      port: void 0
    };
    if (j._autoPong = ue.autoPong, !q.includes(ue.protocolVersion))
      throw new RangeError(
        `Unsupported protocol version: ${ue.protocolVersion} (supported versions: ${q.join(", ")})`
      );
    let g;
    if (Y instanceof e)
      g = Y;
    else
      try {
        g = new e(Y);
      } catch {
        throw new SyntaxError(`Invalid URL: ${Y}`);
      }
    g.protocol === "http:" ? g.protocol = "ws:" : g.protocol === "https:" && (g.protocol = "wss:"), j._url = g.href;
    const H = g.protocol === "wss:", V = g.protocol === "ws+unix:";
    let se;
    if (g.protocol !== "ws:" && !H && !V ? se = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"` : V && !g.pathname ? se = "The URL's pathname is empty" : g.hash && (se = "The URL contains a fragment identifier"), se) {
      const ge = new SyntaxError(se);
      if (j._redirects === 0)
        throw ge;
      z(j, ge);
      return;
    }
    const X = H ? 443 : 80, re = c(16).toString("base64"), te = H ? m.request : v.request, ce = /* @__PURE__ */ new Set();
    let pe;
    if (ue.createConnection = ue.createConnection || (H ? ie : W), ue.defaultPort = ue.defaultPort || X, ue.port = g.port || X, ue.host = g.hostname.startsWith("[") ? g.hostname.slice(1, -1) : g.hostname, ue.headers = {
      ...ue.headers,
      "Sec-WebSocket-Version": ue.protocolVersion,
      "Sec-WebSocket-Key": re,
      Connection: "Upgrade",
      Upgrade: "websocket"
    }, ue.path = g.pathname + g.search, ue.timeout = ue.handshakeTimeout, ue.perMessageDeflate && (pe = new i(
      ue.perMessageDeflate !== !0 ? ue.perMessageDeflate : {},
      !1,
      ue.maxPayload
    ), ue.headers["Sec-WebSocket-Extensions"] = w({
      [i.extensionName]: pe.offer()
    })), he.length) {
      for (const ge of he) {
        if (typeof ge != "string" || !N.test(ge) || ce.has(ge))
          throw new SyntaxError(
            "An invalid or duplicated subprotocol was specified"
          );
        ce.add(ge);
      }
      ue.headers["Sec-WebSocket-Protocol"] = he.join(",");
    }
    if (ue.origin && (ue.protocolVersion < 13 ? ue.headers["Sec-WebSocket-Origin"] = ue.origin : ue.headers.Origin = ue.origin), (g.username || g.password) && (ue.auth = `${g.username}:${g.password}`), V) {
      const ge = ue.path.split(":");
      ue.socketPath = ge[0], ue.path = ge[1];
    }
    let Te;
    if (ue.followRedirects) {
      if (j._redirects === 0) {
        j._originalIpc = V, j._originalSecure = H, j._originalHostOrSocketPath = V ? ue.socketPath : g.host;
        const ge = Ee && Ee.headers;
        if (Ee = { ...Ee, headers: {} }, ge)
          for (const [fe, P] of Object.entries(ge))
            Ee.headers[fe.toLowerCase()] = P;
      } else if (j.listenerCount("redirect") === 0) {
        const ge = V ? j._originalIpc ? ue.socketPath === j._originalHostOrSocketPath : !1 : j._originalIpc ? !1 : g.host === j._originalHostOrSocketPath;
        (!ge || j._originalSecure && !H) && (delete ue.headers.authorization, delete ue.headers.cookie, ge || delete ue.headers.host, ue.auth = void 0);
      }
      ue.auth && !Ee.headers.authorization && (Ee.headers.authorization = "Basic " + Buffer.from(ue.auth).toString("base64")), Te = j._req = te(ue), j._redirects && j.emit("redirect", j.url, Te);
    } else
      Te = j._req = te(ue);
    ue.timeout && Te.on("timeout", () => {
      ae(j, Te, "Opening handshake has timed out");
    }), Te.on("error", (ge) => {
      Te === null || Te[I] || (Te = j._req = null, z(j, ge));
    }), Te.on("response", (ge) => {
      const fe = ge.headers.location, P = ge.statusCode;
      if (fe && ue.followRedirects && P >= 300 && P < 400) {
        if (++j._redirects > ue.maxRedirects) {
          ae(j, Te, "Maximum redirects exceeded");
          return;
        }
        Te.abort();
        let M;
        try {
          M = new e(fe, Y);
        } catch {
          const K = new SyntaxError(`Invalid URL: ${fe}`);
          z(j, K);
          return;
        }
        U(j, M, he, Ee);
      } else j.emit("unexpected-response", Te, ge) || ae(
        j,
        Te,
        `Unexpected server response: ${ge.statusCode}`
      );
    }), Te.on("upgrade", (ge, fe, P) => {
      if (j.emit("upgrade", ge), j.readyState !== F.CONNECTING) return;
      Te = j._req = null;
      const M = ge.headers.upgrade;
      if (M === void 0 || M.toLowerCase() !== "websocket") {
        ae(j, fe, "Invalid Upgrade header");
        return;
      }
      const J = t("sha1").update(re + p).digest("base64");
      if (ge.headers["sec-websocket-accept"] !== J) {
        ae(j, fe, "Invalid Sec-WebSocket-Accept header");
        return;
      }
      const K = ge.headers["sec-websocket-protocol"];
      let Q;
      if (K !== void 0 ? ce.size ? ce.has(K) || (Q = "Server sent an invalid subprotocol") : Q = "Server sent a subprotocol but none was requested" : ce.size && (Q = "Server sent no subprotocol"), Q) {
        ae(j, fe, Q);
        return;
      }
      K && (j._protocol = K);
      const le = ge.headers["sec-websocket-extensions"];
      if (le !== void 0) {
        if (!pe) {
          ae(j, fe, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
          return;
        }
        let ne;
        try {
          ne = _(le);
        } catch {
          ae(j, fe, "Invalid Sec-WebSocket-Extensions header");
          return;
        }
        const de = Object.keys(ne);
        if (de.length !== 1 || de[0] !== i.extensionName) {
          ae(j, fe, "Server indicated an extension that was not requested");
          return;
        }
        try {
          pe.accept(ne[i.extensionName]);
        } catch {
          ae(j, fe, "Invalid Sec-WebSocket-Extensions header");
          return;
        }
        j._extensions[i.extensionName] = pe;
      }
      j.setSocket(fe, P, {
        allowSynchronousEvents: ue.allowSynchronousEvents,
        generateMask: ue.generateMask,
        maxPayload: ue.maxPayload,
        skipUTF8Validation: ue.skipUTF8Validation
      });
    }), ue.finishRequest ? ue.finishRequest(Te, j) : Te.end();
  }
  function z(j, Y) {
    j._readyState = F.CLOSING, j._errorEmitted = !0, j.emit("error", Y), j.emitClose();
  }
  function W(j) {
    return j.path = j.socketPath, h.connect(j);
  }
  function ie(j) {
    return j.path = void 0, !j.servername && j.servername !== "" && (j.servername = h.isIP(j.host) ? "" : j.host), d.connect(j);
  }
  function ae(j, Y, he) {
    j._readyState = F.CLOSING;
    const Ee = new Error(he);
    Error.captureStackTrace(Ee, ae), Y.setHeader ? (Y[I] = !0, Y.abort(), Y.socket && !Y.socket.destroyed && Y.socket.destroy(), process.nextTick(z, j, Ee)) : (Y.destroy(Ee), Y.once("error", j.emit.bind(j, "error")), Y.once("close", j.emitClose.bind(j)));
  }
  function oe(j, Y, he) {
    if (Y) {
      const Ee = u(Y) ? Y.size : D(Y).length;
      j._socket ? j._sender._bufferedBytes += Ee : j._bufferedAmount += Ee;
    }
    if (he) {
      const Ee = new Error(
        `WebSocket is not open: readyState ${j.readyState} (${R[j.readyState]})`
      );
      process.nextTick(he, Ee);
    }
  }
  function ye(j, Y) {
    const he = this[S];
    he._closeFrameReceived = !0, he._closeMessage = Y, he._closeCode = j, he._socket[S] !== void 0 && (he._socket.removeListener("data", Re), process.nextTick($, he._socket), j === 1005 ? he.close() : he.close(j, Y));
  }
  function _e() {
    const j = this[S];
    j.isPaused || j._socket.resume();
  }
  function Z(j) {
    const Y = this[S];
    Y._socket[S] !== void 0 && (Y._socket.removeListener("data", Re), process.nextTick($, Y._socket), Y.close(j[C])), Y._errorEmitted || (Y._errorEmitted = !0, Y.emit("error", j));
  }
  function Se() {
    this[S].emitClose();
  }
  function k(j, Y) {
    this[S].emit("message", j, Y);
  }
  function A(j) {
    const Y = this[S];
    Y._autoPong && Y.pong(j, !this._isServer, T), Y.emit("ping", j);
  }
  function G(j) {
    this[S].emit("pong", j);
  }
  function $(j) {
    j.resume();
  }
  function me(j) {
    const Y = this[S];
    Y.readyState !== F.CLOSED && (Y.readyState === F.OPEN && (Y._readyState = F.CLOSING, be(Y)), this._socket.end(), Y._errorEmitted || (Y._errorEmitted = !0, Y.emit("error", j)));
  }
  function be(j) {
    j._closeTimer = setTimeout(
      j._socket.destroy.bind(j._socket),
      O
    );
  }
  function we() {
    const j = this[S];
    this.removeListener("close", we), this.removeListener("data", Re), this.removeListener("end", Ce), j._readyState = F.CLOSING;
    let Y;
    !this._readableState.endEmitted && !j._closeFrameReceived && !j._receiver._writableState.errorEmitted && (Y = j._socket.read()) !== null && j._receiver.write(Y), j._receiver.end(), this[S] = void 0, clearTimeout(j._closeTimer), j._receiver._writableState.finished || j._receiver._writableState.errorEmitted ? j.emitClose() : (j._receiver.on("error", Se), j._receiver.on("finish", Se));
  }
  function Re(j) {
    this[S]._receiver.write(j) || this.pause();
  }
  function Ce() {
    const j = this[S];
    j._readyState = F.CLOSING, j._receiver.end(), this.end();
  }
  function Be() {
    const j = this[S];
    this.removeListener("error", Be), this.on("error", T), j && (j._readyState = F.CLOSING, this.destroy());
  }
  return xa;
}
var ya, Gu;
function Cm() {
  if (Gu) return ya;
  Gu = 1, za();
  const { Duplex: o } = ut;
  function m(c) {
    c.emit("close");
  }
  function v() {
    !this.destroyed && this._writableState.finished && this.destroy();
  }
  function h(c) {
    this.removeListener("error", h), this.destroy(), this.listenerCount("error") === 0 && this.emit("error", c);
  }
  function d(c, t) {
    let a = !0;
    const n = new o({
      ...t,
      autoDestroy: !1,
      emitClose: !1,
      objectMode: !1,
      writableObjectMode: !1
    });
    return c.on("message", function(i, l) {
      const r = !l && n._readableState.objectMode ? i.toString() : i;
      n.push(r) || c.pause();
    }), c.once("error", function(i) {
      n.destroyed || (a = !1, n.destroy(i));
    }), c.once("close", function() {
      n.destroyed || n.push(null);
    }), n._destroy = function(e, i) {
      if (c.readyState === c.CLOSED) {
        i(e), process.nextTick(m, n);
        return;
      }
      let l = !1;
      c.once("error", function(u) {
        l = !0, i(u);
      }), c.once("close", function() {
        l || i(e), process.nextTick(m, n);
      }), a && c.terminate();
    }, n._final = function(e) {
      if (c.readyState === c.CONNECTING) {
        c.once("open", function() {
          n._final(e);
        });
        return;
      }
      c._socket !== null && (c._socket._writableState.finished ? (e(), n._readableState.endEmitted && n.destroy()) : (c._socket.once("finish", function() {
        e();
      }), c.close()));
    }, n._read = function() {
      c.isPaused && c.resume();
    }, n._write = function(e, i, l) {
      if (c.readyState === c.CONNECTING) {
        c.once("open", function() {
          n._write(e, i, l);
        });
        return;
      }
      c.send(e, l);
    }, n.on("end", v), n.on("error", h), n;
  }
  return ya = d, ya;
}
var ba, Wu;
function Rm() {
  if (Wu) return ba;
  Wu = 1;
  const { tokenChars: o } = oi();
  function m(v) {
    const h = /* @__PURE__ */ new Set();
    let d = -1, c = -1, t = 0;
    for (t; t < v.length; t++) {
      const n = v.charCodeAt(t);
      if (c === -1 && o[n] === 1)
        d === -1 && (d = t);
      else if (t !== 0 && (n === 32 || n === 9))
        c === -1 && d !== -1 && (c = t);
      else if (n === 44) {
        if (d === -1)
          throw new SyntaxError(`Unexpected character at index ${t}`);
        c === -1 && (c = t);
        const e = v.slice(d, c);
        if (h.has(e))
          throw new SyntaxError(`The "${e}" subprotocol is duplicated`);
        h.add(e), d = c = -1;
      } else
        throw new SyntaxError(`Unexpected character at index ${t}`);
    }
    if (d === -1 || c !== -1)
      throw new SyntaxError("Unexpected end of input");
    const a = v.slice(d, t);
    if (h.has(a))
      throw new SyntaxError(`The "${a}" subprotocol is duplicated`);
    return h.add(a), h;
  }
  return ba = { parse: m }, ba;
}
var wa, Vu;
function Am() {
  if (Vu) return wa;
  Vu = 1;
  const o = ft, m = ii, { Duplex: v } = ut, { createHash: h } = ht, d = cd(), c = Xi(), t = Rm(), a = za(), { GUID: n, kWebSocket: e } = At(), i = /^[+/0-9A-Za-z]{22}==$/, l = 0, r = 1, u = 2;
  class s extends o {
    /**
     * Create a `WebSocketServer` instance.
     *
     * @param {Object} options Configuration options
     * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
     *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
     *     multiple times in the same tick
     * @param {Boolean} [options.autoPong=true] Specifies whether or not to
     *     automatically send a pong in response to a ping
     * @param {Number} [options.backlog=511] The maximum length of the queue of
     *     pending connections
     * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
     *     track clients
     * @param {Function} [options.handleProtocols] A hook to handle protocols
     * @param {String} [options.host] The hostname where to bind the server
     * @param {Number} [options.maxPayload=104857600] The maximum allowed message
     *     size
     * @param {Boolean} [options.noServer=false] Enable no server mode
     * @param {String} [options.path] Accept only connections matching this path
     * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
     *     permessage-deflate
     * @param {Number} [options.port] The port where to bind the server
     * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
     *     server to use
     * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
     *     not to skip UTF-8 validation for text and close messages
     * @param {Function} [options.verifyClient] A hook to reject connections
     * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
     *     class to use. It must be the `WebSocket` class or class that extends it
     * @param {Function} [callback] A listener for the `listening` event
     */
    constructor(T, y) {
      if (super(), T = {
        allowSynchronousEvents: !0,
        autoPong: !0,
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: !1,
        perMessageDeflate: !1,
        handleProtocols: null,
        clientTracking: !0,
        verifyClient: null,
        noServer: !1,
        backlog: null,
        // use default (511 as implemented in net.js)
        server: null,
        host: null,
        path: null,
        port: null,
        WebSocket: a,
        ...T
      }, T.port == null && !T.server && !T.noServer || T.port != null && (T.server || T.noServer) || T.server && T.noServer)
        throw new TypeError(
          'One and only one of the "port", "server", or "noServer" options must be specified'
        );
      if (T.port != null ? (this._server = m.createServer((E, w) => {
        const _ = m.STATUS_CODES[426];
        w.writeHead(426, {
          "Content-Length": _.length,
          "Content-Type": "text/plain"
        }), w.end(_);
      }), this._server.listen(
        T.port,
        T.host,
        T.backlog,
        y
      )) : T.server && (this._server = T.server), this._server) {
        const E = this.emit.bind(this, "connection");
        this._removeListeners = f(this._server, {
          listening: this.emit.bind(this, "listening"),
          error: this.emit.bind(this, "error"),
          upgrade: (w, _, D) => {
            this.handleUpgrade(w, _, D, E);
          }
        });
      }
      T.perMessageDeflate === !0 && (T.perMessageDeflate = {}), T.clientTracking && (this.clients = /* @__PURE__ */ new Set(), this._shouldEmitClose = !1), this.options = T, this._state = l;
    }
    /**
     * Returns the bound address, the address family name, and port of the server
     * as reported by the operating system if listening on an IP socket.
     * If the server is listening on a pipe or UNIX domain socket, the name is
     * returned as a string.
     *
     * @return {(Object|String|null)} The address of the server
     * @public
     */
    address() {
      if (this.options.noServer)
        throw new Error('The server is operating in "noServer" mode');
      return this._server ? this._server.address() : null;
    }
    /**
     * Stop the server from accepting new connections and emit the `'close'` event
     * when all existing connections are closed.
     *
     * @param {Function} [cb] A one-time listener for the `'close'` event
     * @public
     */
    close(T) {
      if (this._state === u) {
        T && this.once("close", () => {
          T(new Error("The server is not running"));
        }), process.nextTick(p, this);
        return;
      }
      if (T && this.once("close", T), this._state !== r)
        if (this._state = r, this.options.noServer || this.options.server)
          this._server && (this._removeListeners(), this._removeListeners = this._server = null), this.clients ? this.clients.size ? this._shouldEmitClose = !0 : process.nextTick(p, this) : process.nextTick(p, this);
        else {
          const y = this._server;
          this._removeListeners(), this._removeListeners = this._server = null, y.close(() => {
            p(this);
          });
        }
    }
    /**
     * See if a given request should be handled by this server instance.
     *
     * @param {http.IncomingMessage} req Request object to inspect
     * @return {Boolean} `true` if the request is valid, else `false`
     * @public
     */
    shouldHandle(T) {
      if (this.options.path) {
        const y = T.url.indexOf("?");
        if ((y !== -1 ? T.url.slice(0, y) : T.url) !== this.options.path) return !1;
      }
      return !0;
    }
    /**
     * Handle a HTTP Upgrade request.
     *
     * @param {http.IncomingMessage} req The request object
     * @param {Duplex} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @public
     */
    handleUpgrade(T, y, E, w) {
      y.on("error", x);
      const _ = T.headers["sec-websocket-key"], D = T.headers.upgrade, O = +T.headers["sec-websocket-version"];
      if (T.method !== "GET") {
        C(this, T, y, 405, "Invalid HTTP method");
        return;
      }
      if (D === void 0 || D.toLowerCase() !== "websocket") {
        C(this, T, y, 400, "Invalid Upgrade header");
        return;
      }
      if (_ === void 0 || !i.test(_)) {
        C(this, T, y, 400, "Missing or invalid Sec-WebSocket-Key header");
        return;
      }
      if (O !== 13 && O !== 8) {
        C(this, T, y, 400, "Missing or invalid Sec-WebSocket-Version header", {
          "Sec-WebSocket-Version": "13, 8"
        });
        return;
      }
      if (!this.shouldHandle(T)) {
        b(y, 400);
        return;
      }
      const I = T.headers["sec-websocket-protocol"];
      let q = /* @__PURE__ */ new Set();
      if (I !== void 0)
        try {
          q = t.parse(I);
        } catch {
          C(this, T, y, 400, "Invalid Sec-WebSocket-Protocol header");
          return;
        }
      const R = T.headers["sec-websocket-extensions"], N = {};
      if (this.options.perMessageDeflate && R !== void 0) {
        const F = new c(
          this.options.perMessageDeflate,
          !0,
          this.options.maxPayload
        );
        try {
          const U = d.parse(R);
          U[c.extensionName] && (F.accept(U[c.extensionName]), N[c.extensionName] = F);
        } catch {
          C(this, T, y, 400, "Invalid or unacceptable Sec-WebSocket-Extensions header");
          return;
        }
      }
      if (this.options.verifyClient) {
        const F = {
          origin: T.headers[`${O === 8 ? "sec-websocket-origin" : "origin"}`],
          secure: !!(T.socket.authorized || T.socket.encrypted),
          req: T
        };
        if (this.options.verifyClient.length === 2) {
          this.options.verifyClient(F, (U, z, W, ie) => {
            if (!U)
              return b(y, z || 401, W, ie);
            this.completeUpgrade(
              N,
              _,
              q,
              T,
              y,
              E,
              w
            );
          });
          return;
        }
        if (!this.options.verifyClient(F)) return b(y, 401);
      }
      this.completeUpgrade(N, _, q, T, y, E, w);
    }
    /**
     * Upgrade the connection to WebSocket.
     *
     * @param {Object} extensions The accepted extensions
     * @param {String} key The value of the `Sec-WebSocket-Key` header
     * @param {Set} protocols The subprotocols
     * @param {http.IncomingMessage} req The request object
     * @param {Duplex} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @throws {Error} If called more than once with the same socket
     * @private
     */
    completeUpgrade(T, y, E, w, _, D, O) {
      if (!_.readable || !_.writable) return _.destroy();
      if (_[e])
        throw new Error(
          "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
        );
      if (this._state > l) return b(_, 503);
      const q = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Accept: ${h("sha1").update(y + n).digest("base64")}`
      ], R = new this.options.WebSocket(null, void 0, this.options);
      if (E.size) {
        const N = this.options.handleProtocols ? this.options.handleProtocols(E, w) : E.values().next().value;
        N && (q.push(`Sec-WebSocket-Protocol: ${N}`), R._protocol = N);
      }
      if (T[c.extensionName]) {
        const N = T[c.extensionName].params, F = d.format({
          [c.extensionName]: [N]
        });
        q.push(`Sec-WebSocket-Extensions: ${F}`), R._extensions = T;
      }
      this.emit("headers", q, w), _.write(q.concat(`\r
`).join(`\r
`)), _.removeListener("error", x), R.setSocket(_, D, {
        allowSynchronousEvents: this.options.allowSynchronousEvents,
        maxPayload: this.options.maxPayload,
        skipUTF8Validation: this.options.skipUTF8Validation
      }), this.clients && (this.clients.add(R), R.on("close", () => {
        this.clients.delete(R), this._shouldEmitClose && !this.clients.size && process.nextTick(p, this);
      })), O(R, w);
    }
  }
  wa = s;
  function f(S, T) {
    for (const y of Object.keys(T)) S.on(y, T[y]);
    return function() {
      for (const E of Object.keys(T))
        S.removeListener(E, T[E]);
    };
  }
  function p(S) {
    S._state = u, S.emit("close");
  }
  function x() {
    this.destroy();
  }
  function b(S, T, y, E) {
    y = y || m.STATUS_CODES[T], E = {
      Connection: "close",
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(y),
      ...E
    }, S.once("finish", S.destroy), S.end(
      `HTTP/1.1 ${T} ${m.STATUS_CODES[T]}\r
` + Object.keys(E).map((w) => `${w}: ${E[w]}`).join(`\r
`) + `\r
\r
` + y
    );
  }
  function C(S, T, y, E, w, _) {
    if (S.listenerCount("wsClientError")) {
      const D = new Error(w);
      Error.captureStackTrace(D, C), S.emit("wsClientError", D, y, T);
    } else
      b(y, E, w, _);
  }
  return wa;
}
var _a, Yu;
function ld() {
  if (Yu) return _a;
  Yu = 1;
  const o = za();
  return o.createWebSocketStream = Cm(), o.Server = Am(), o.Receiver = ad(), o.Sender = od(), o.WebSocket = o, o.WebSocketServer = o.Server, _a = o, _a;
}
var Ea = { exports: {} };
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Sa, Ku;
function km() {
  if (Ku) return Sa;
  Ku = 1;
  var o = Object.getOwnPropertySymbols, m = Object.prototype.hasOwnProperty, v = Object.prototype.propertyIsEnumerable;
  function h(c) {
    if (c == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(c);
  }
  function d() {
    try {
      if (!Object.assign)
        return !1;
      var c = new String("abc");
      if (c[5] = "de", Object.getOwnPropertyNames(c)[0] === "5")
        return !1;
      for (var t = {}, a = 0; a < 10; a++)
        t["_" + String.fromCharCode(a)] = a;
      var n = Object.getOwnPropertyNames(t).map(function(i) {
        return t[i];
      });
      if (n.join("") !== "0123456789")
        return !1;
      var e = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(i) {
        e[i] = i;
      }), Object.keys(Object.assign({}, e)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Sa = d() ? Object.assign : function(c, t) {
    for (var a, n = h(c), e, i = 1; i < arguments.length; i++) {
      a = Object(arguments[i]);
      for (var l in a)
        m.call(a, l) && (n[l] = a[l]);
      if (o) {
        e = o(a);
        for (var r = 0; r < e.length; r++)
          v.call(a, e[r]) && (n[e[r]] = a[e[r]]);
      }
    }
    return n;
  }, Sa;
}
var Ui = { exports: {} };
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
var Xu;
function Om() {
  if (Xu) return Ui.exports;
  Xu = 1, Ui.exports = h, Ui.exports.append = m;
  var o = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
  function m(d, c) {
    if (typeof d != "string")
      throw new TypeError("header argument is required");
    if (!c)
      throw new TypeError("field argument is required");
    for (var t = Array.isArray(c) ? c : v(String(c)), a = 0; a < t.length; a++)
      if (!o.test(t[a]))
        throw new TypeError("field argument contains an invalid header name");
    if (d === "*")
      return d;
    var n = d, e = v(d.toLowerCase());
    if (t.indexOf("*") !== -1 || e.indexOf("*") !== -1)
      return "*";
    for (var i = 0; i < t.length; i++) {
      var l = t[i].toLowerCase();
      e.indexOf(l) === -1 && (e.push(l), n = n ? n + ", " + t[i] : t[i]);
    }
    return n;
  }
  function v(d) {
    for (var c = 0, t = [], a = 0, n = 0, e = d.length; n < e; n++)
      switch (d.charCodeAt(n)) {
        case 32:
          a === c && (a = c = n + 1);
          break;
        case 44:
          t.push(d.substring(a, c)), a = c = n + 1;
          break;
        default:
          c = n + 1;
          break;
      }
    return t.push(d.substring(a, c)), t;
  }
  function h(d, c) {
    if (!d || !d.getHeader || !d.setHeader)
      throw new TypeError("res argument is required");
    var t = d.getHeader("Vary") || "", a = Array.isArray(t) ? t.join(", ") : String(t);
    (t = m(a, c)) && d.setHeader("Vary", t);
  }
  return Ui.exports;
}
var Ju;
function ud() {
  return Ju || (Ju = 1, (function() {
    var o = km(), m = Om(), v = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: !1,
      optionsSuccessStatus: 204
    };
    function h(s) {
      return typeof s == "string" || s instanceof String;
    }
    function d(s, f) {
      if (Array.isArray(f)) {
        for (var p = 0; p < f.length; ++p)
          if (d(s, f[p]))
            return !0;
        return !1;
      } else return h(f) ? s === f : f instanceof RegExp ? f.test(s) : !!f;
    }
    function c(s, f) {
      var p = f.headers.origin, x = [], b;
      return !s.origin || s.origin === "*" ? x.push([{
        key: "Access-Control-Allow-Origin",
        value: "*"
      }]) : h(s.origin) ? (x.push([{
        key: "Access-Control-Allow-Origin",
        value: s.origin
      }]), x.push([{
        key: "Vary",
        value: "Origin"
      }])) : (b = d(p, s.origin), x.push([{
        key: "Access-Control-Allow-Origin",
        value: b ? p : !1
      }]), x.push([{
        key: "Vary",
        value: "Origin"
      }])), x;
    }
    function t(s) {
      var f = s.methods;
      return f.join && (f = s.methods.join(",")), {
        key: "Access-Control-Allow-Methods",
        value: f
      };
    }
    function a(s) {
      return s.credentials === !0 ? {
        key: "Access-Control-Allow-Credentials",
        value: "true"
      } : null;
    }
    function n(s, f) {
      var p = s.allowedHeaders || s.headers, x = [];
      return p ? p.join && (p = p.join(",")) : (p = f.headers["access-control-request-headers"], x.push([{
        key: "Vary",
        value: "Access-Control-Request-Headers"
      }])), p && p.length && x.push([{
        key: "Access-Control-Allow-Headers",
        value: p
      }]), x;
    }
    function e(s) {
      var f = s.exposedHeaders;
      if (f)
        f.join && (f = f.join(","));
      else return null;
      return f && f.length ? {
        key: "Access-Control-Expose-Headers",
        value: f
      } : null;
    }
    function i(s) {
      var f = (typeof s.maxAge == "number" || s.maxAge) && s.maxAge.toString();
      return f && f.length ? {
        key: "Access-Control-Max-Age",
        value: f
      } : null;
    }
    function l(s, f) {
      for (var p = 0, x = s.length; p < x; p++) {
        var b = s[p];
        b && (Array.isArray(b) ? l(b, f) : b.key === "Vary" && b.value ? m(f, b.value) : b.value && f.setHeader(b.key, b.value));
      }
    }
    function r(s, f, p, x) {
      var b = [], C = f.method && f.method.toUpperCase && f.method.toUpperCase();
      C === "OPTIONS" ? (b.push(c(s, f)), b.push(a(s)), b.push(t(s)), b.push(n(s, f)), b.push(i(s)), b.push(e(s)), l(b, p), s.preflightContinue ? x() : (p.statusCode = s.optionsSuccessStatus, p.setHeader("Content-Length", "0"), p.end())) : (b.push(c(s, f)), b.push(a(s)), b.push(e(s)), l(b, p), x());
    }
    function u(s) {
      var f = null;
      return typeof s == "function" ? f = s : f = function(p, x) {
        x(null, s);
      }, function(x, b, C) {
        f(x, function(S, T) {
          if (S)
            C(S);
          else {
            var y = o({}, v, T), E = null;
            y.origin && typeof y.origin == "function" ? E = y.origin : y.origin && (E = function(w, _) {
              _(null, y.origin);
            }), E ? E(x.headers.origin, function(w, _) {
              w || !_ ? C(w) : (y.origin = _, r(y, x, b, C));
            }) : C();
          }
        });
      };
    }
    Ea.exports = u;
  })()), Ea.exports;
}
var Qu;
function pd() {
  if (Qu) return $t;
  Qu = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.Server = $t.BaseServer = void 0;
  const o = Zp(), m = nd(), v = ft, h = id(), d = $e(), c = xm(), t = ld(), a = td(), n = Yi(), e = (0, d.default)("engine"), i = Symbol("responseHeaders");
  function l(C) {
    try {
      const S = JSON.parse(C);
      if (typeof S.sid == "string")
        return S.sid;
    } catch {
    }
  }
  class r extends v.EventEmitter {
    /**
     * Server constructor.
     *
     * @param {Object} opts - options
     */
    constructor(S = {}) {
      super(), this.middlewares = [], this.clients = {}, this.clientsCount = 0, this.opts = Object.assign({
        wsEngine: t.Server,
        pingTimeout: 2e4,
        pingInterval: 25e3,
        upgradeTimeout: 1e4,
        maxHttpBufferSize: 1e6,
        transports: ["polling", "websocket"],
        // WebTransport is disabled by default
        allowUpgrades: !0,
        httpCompression: {
          threshold: 1024
        },
        cors: !1,
        allowEIO3: !1
      }, S), S.cookie && (this.opts.cookie = Object.assign({
        name: "io",
        path: "/",
        // @ts-ignore
        httpOnly: S.cookie.path !== !1,
        sameSite: "lax"
      }, S.cookie)), this.opts.cors && this.use(ud()(this.opts.cors)), S.perMessageDeflate && (this.opts.perMessageDeflate = Object.assign({
        threshold: 1024
      }, S.perMessageDeflate)), this.init();
    }
    /**
     * Compute the pathname of the requests that are handled by the server
     * @param options
     * @protected
     */
    _computePath(S) {
      let T = (S.path || "/engine.io").replace(/\/$/, "");
      return S.addTrailingSlash !== !1 && (T += "/"), T;
    }
    /**
     * Returns a list of available transports for upgrade given a certain transport.
     */
    upgrades(S) {
      return this.opts.allowUpgrades ? m.default[S].upgradesTo || [] : [];
    }
    /**
     * Verifies a request.
     *
     * @param {EngineRequest} req
     * @param upgrade - whether it's an upgrade request
     * @param fn
     * @protected
     * @return whether the request is valid
     */
    verify(S, T, y) {
      const E = S._query.transport;
      if (!~this.opts.transports.indexOf(E) || E === "webtransport")
        return e('unknown transport "%s"', E), y(s.errors.UNKNOWN_TRANSPORT, { transport: E });
      if (b(S.headers.origin)) {
        const D = S.headers.origin;
        return S.headers.origin = null, e("origin header invalid"), y(s.errors.BAD_REQUEST, {
          name: "INVALID_ORIGIN",
          origin: D
        });
      }
      const _ = S._query.sid;
      if (_) {
        if (!this.clients.hasOwnProperty(_))
          return e('unknown sid "%s"', _), y(s.errors.UNKNOWN_SID, {
            sid: _
          });
        const D = this.clients[_].transport.name;
        if (!T && D !== E)
          return e("bad request: unexpected transport without upgrade"), y(s.errors.BAD_REQUEST, {
            name: "TRANSPORT_MISMATCH",
            transport: E,
            previousTransport: D
          });
      } else
        return S.method !== "GET" ? y(s.errors.BAD_HANDSHAKE_METHOD, {
          method: S.method
        }) : E === "websocket" && !T ? (e("invalid transport upgrade"), y(s.errors.BAD_REQUEST, {
          name: "TRANSPORT_HANDSHAKE_ERROR"
        })) : this.opts.allowRequest ? this.opts.allowRequest(S, (D, O) => {
          if (!O)
            return y(s.errors.FORBIDDEN, {
              message: D
            });
          y();
        }) : y();
      y();
    }
    /**
     * Adds a new middleware.
     *
     * @example
     * import helmet from "helmet";
     *
     * engine.use(helmet());
     *
     * @param fn
     */
    use(S) {
      this.middlewares.push(S);
    }
    /**
     * Apply the middlewares to the request.
     *
     * @param req
     * @param res
     * @param callback
     * @protected
     */
    _applyMiddlewares(S, T, y) {
      if (this.middlewares.length === 0)
        return e("no middleware to apply, skipping"), y();
      const E = (w) => {
        e("applying middleware n°%d", w + 1), this.middlewares[w](S, T, (_) => {
          if (_)
            return y(_);
          w + 1 < this.middlewares.length ? E(w + 1) : y();
        });
      };
      E(0);
    }
    /**
     * Closes all clients.
     */
    close() {
      e("closing all open clients");
      for (let S in this.clients)
        this.clients.hasOwnProperty(S) && this.clients[S].close(!0);
      return this.cleanup(), this;
    }
    /**
     * generate a socket id.
     * Overwrite this method to generate your custom socket id
     *
     * @param {IncomingMessage} req - the request object
     */
    generateId(S) {
      return o.generateId();
    }
    /**
     * Handshakes a new client.
     *
     * @param {String} transportName
     * @param {Object} req - the request object
     * @param {Function} closeConnection
     *
     * @protected
     */
    async handshake(S, T, y) {
      const E = T._query.EIO === "4" ? 4 : 3;
      if (E === 3 && !this.opts.allowEIO3) {
        e("unsupported protocol version"), this.emit("connection_error", {
          req: T,
          code: s.errors.UNSUPPORTED_PROTOCOL_VERSION,
          message: s.errorMessages[s.errors.UNSUPPORTED_PROTOCOL_VERSION],
          context: {
            protocol: E
          }
        }), y(s.errors.UNSUPPORTED_PROTOCOL_VERSION);
        return;
      }
      let w;
      try {
        w = await this.generateId(T);
      } catch (O) {
        e("error while generating an id"), this.emit("connection_error", {
          req: T,
          code: s.errors.BAD_REQUEST,
          message: s.errorMessages[s.errors.BAD_REQUEST],
          context: {
            name: "ID_GENERATION_ERROR",
            error: O
          }
        }), y(s.errors.BAD_REQUEST);
        return;
      }
      e('handshaking client "%s"', w);
      try {
        var _ = this.createTransport(S, T);
        S === "polling" ? (_.maxHttpBufferSize = this.opts.maxHttpBufferSize, _.httpCompression = this.opts.httpCompression) : S === "websocket" && (_.perMessageDeflate = this.opts.perMessageDeflate);
      } catch (O) {
        e('error handshaking to transport "%s"', S), this.emit("connection_error", {
          req: T,
          code: s.errors.BAD_REQUEST,
          message: s.errorMessages[s.errors.BAD_REQUEST],
          context: {
            name: "TRANSPORT_HANDSHAKE_ERROR",
            error: O
          }
        }), y(s.errors.BAD_REQUEST);
        return;
      }
      const D = new h.Socket(w, this, _, T, E);
      return _.on("headers", (O, I) => {
        !I._query.sid && (this.opts.cookie && (O["Set-Cookie"] = [
          // @ts-ignore
          (0, c.serialize)(this.opts.cookie.name, w, this.opts.cookie)
        ]), this.emit("initial_headers", O, I)), this.emit("headers", O, I);
      }), _.onRequest(T), this.clients[w] = D, this.clientsCount++, D.once("close", () => {
        delete this.clients[w], this.clientsCount--;
      }), this.emit("connection", D), _;
    }
    async onWebTransportSession(S) {
      const T = setTimeout(() => {
        e("the client failed to establish a bidirectional stream in the given period"), S.close();
      }, this.opts.upgradeTimeout), E = await S.incomingBidirectionalStreams.getReader().read();
      if (E.done) {
        e("session is closed");
        return;
      }
      const w = E.value, _ = (0, n.createPacketDecoderStream)(this.opts.maxHttpBufferSize, "nodebuffer"), D = w.readable.pipeThrough(_).getReader(), { value: O, done: I } = await D.read();
      if (I) {
        e("stream is closed");
        return;
      }
      if (clearTimeout(T), O.type !== "open")
        return e("invalid WebTransport handshake"), S.close();
      if (O.data === void 0) {
        const N = new a.WebTransport(S, w, D), F = o.generateId();
        e('handshaking client "%s" (WebTransport)', F);
        const U = new h.Socket(F, this, N, null, 4);
        this.clients[F] = U, this.clientsCount++, U.once("close", () => {
          delete this.clients[F], this.clientsCount--;
        }), this.emit("connection", U);
        return;
      }
      const q = l(O.data);
      if (!q)
        return e("invalid WebTransport handshake"), S.close();
      const R = this.clients[q];
      if (!R)
        e("upgrade attempt for closed client"), S.close();
      else if (R.upgrading)
        e("transport has already been trying to upgrade"), S.close();
      else if (R.upgraded)
        e("transport had already been upgraded"), S.close();
      else {
        e("upgrading existing transport");
        const N = new a.WebTransport(S, w, D);
        R._maybeUpgrade(N);
      }
    }
  }
  $t.BaseServer = r, r.errors = {
    UNKNOWN_TRANSPORT: 0,
    UNKNOWN_SID: 1,
    BAD_HANDSHAKE_METHOD: 2,
    BAD_REQUEST: 3,
    FORBIDDEN: 4,
    UNSUPPORTED_PROTOCOL_VERSION: 5
  }, r.errorMessages = {
    0: "Transport unknown",
    1: "Session ID unknown",
    2: "Bad handshake method",
    3: "Bad request",
    4: "Forbidden",
    5: "Unsupported protocol version"
  };
  class u {
    constructor(S, T) {
      this.req = S, this.socket = T, S[i] = {};
    }
    setHeader(S, T) {
      this.req[i][S] = T;
    }
    getHeader(S) {
      return this.req[i][S];
    }
    removeHeader(S) {
      delete this.req[i][S];
    }
    write() {
    }
    writeHead() {
    }
    end() {
      this.socket.destroy();
    }
  }
  class s extends r {
    /**
     * Initialize websocket server
     *
     * @protected
     */
    init() {
      ~this.opts.transports.indexOf("websocket") && (this.ws && this.ws.close(), this.ws = new this.opts.wsEngine({
        noServer: !0,
        clientTracking: !1,
        perMessageDeflate: this.opts.perMessageDeflate,
        maxPayload: this.opts.maxHttpBufferSize
      }), typeof this.ws.on == "function" && this.ws.on("headers", (S, T) => {
        const y = T[i] || {};
        delete T[i], !T._query.sid && this.emit("initial_headers", y, T), this.emit("headers", y, T), e("writing headers: %j", y), Object.keys(y).forEach((w) => {
          S.push(`${w}: ${y[w]}`);
        });
      }));
    }
    cleanup() {
      this.ws && (e("closing webSocketServer"), this.ws.close());
    }
    /**
     * Prepares a request by processing the query string.
     *
     * @private
     */
    prepare(S) {
      if (!S._query) {
        const T = new URL(S.url, "https://socket.io");
        S._query = Object.fromEntries(T.searchParams.entries());
      }
    }
    createTransport(S, T) {
      return new m.default[S](T);
    }
    /**
     * Handles an Engine.IO HTTP request.
     *
     * @param {EngineRequest} req
     * @param {ServerResponse} res
     */
    handleRequest(S, T) {
      e('handling "%s" http request "%s"', S.method, S.url), this.prepare(S), S.res = T;
      const y = (E, w) => {
        if (E !== void 0) {
          this.emit("connection_error", {
            req: S,
            code: E,
            message: s.errorMessages[E],
            context: w
          }), f(T, E, w);
          return;
        }
        if (S._query.sid)
          e("setting new request for existing client"), this.clients[S._query.sid].transport.onRequest(S);
        else {
          const _ = (D, O) => f(T, D, O);
          this.handshake(S._query.transport, S, _);
        }
      };
      this._applyMiddlewares(S, T, (E) => {
        E ? y(s.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(S, !1, y);
      });
    }
    /**
     * Handles an Engine.IO HTTP Upgrade.
     */
    handleUpgrade(S, T, y) {
      this.prepare(S);
      const E = new u(S, T), w = (_, D) => {
        if (_ !== void 0) {
          this.emit("connection_error", {
            req: S,
            code: _,
            message: s.errorMessages[_],
            context: D
          }), p(T, _, D);
          return;
        }
        const O = Buffer.from(y);
        y = null, E.writeHead(), this.ws.handleUpgrade(S, T, O, (I) => {
          this.onWebSocket(S, T, I);
        });
      };
      this._applyMiddlewares(S, E, (_) => {
        _ ? w(s.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(S, !0, w);
      });
    }
    /**
     * Called upon a ws.io connection.
     * @param req
     * @param socket
     * @param websocket
     * @private
     */
    onWebSocket(S, T, y) {
      if (y.on("error", w), m.default[S._query.transport] !== void 0 && !m.default[S._query.transport].prototype.handlesUpgrades) {
        e("transport doesnt handle upgraded requests"), y.close();
        return;
      }
      const E = S._query.sid;
      if (S.websocket = y, E) {
        const _ = this.clients[E];
        if (!_)
          e("upgrade attempt for closed client"), y.close();
        else if (_.upgrading)
          e("transport has already been trying to upgrade"), y.close();
        else if (_.upgraded)
          e("transport had already been upgraded"), y.close();
        else {
          e("upgrading existing transport"), y.removeListener("error", w);
          const D = this.createTransport(S._query.transport, S);
          D.perMessageDeflate = this.opts.perMessageDeflate, _._maybeUpgrade(D);
        }
      } else {
        const _ = (D, O) => p(T, D, O);
        this.handshake(S._query.transport, S, _);
      }
      function w() {
        e("websocket error before upgrade");
      }
    }
    /**
     * Captures upgrade requests for a http.Server.
     *
     * @param {http.Server} server
     * @param {Object} options
     */
    attach(S, T = {}) {
      const y = this._computePath(T), E = T.destroyUpgradeTimeout || 1e3;
      function w(D) {
        return y === D.url.slice(0, y.length);
      }
      const _ = S.listeners("request").slice(0);
      S.removeAllListeners("request"), S.on("close", this.close.bind(this)), S.on("listening", this.init.bind(this)), S.on("request", (D, O) => {
        if (w(D))
          e('intercepting request for path "%s"', y), this.handleRequest(D, O);
        else {
          let I = 0;
          const q = _.length;
          for (; I < q; I++)
            _[I].call(S, D, O);
        }
      }), ~this.opts.transports.indexOf("websocket") && S.on("upgrade", (D, O, I) => {
        w(D) ? this.handleUpgrade(D, O, I) : T.destroyUpgrade !== !1 && setTimeout(function() {
          if (O.writable && O.bytesWritten <= 0)
            return O.on("error", (q) => {
              e("error while destroying upgrade: %s", q.message);
            }), O.end();
        }, E);
      });
    }
  }
  $t.Server = s;
  function f(C, S, T) {
    const y = S === s.errors.FORBIDDEN ? 403 : 400, E = T && T.message ? T.message : s.errorMessages[S];
    C.writeHead(y, { "Content-Type": "application/json" }), C.end(JSON.stringify({
      code: S,
      message: E
    }));
  }
  function p(C, S, T = {}) {
    if (C.on("error", () => {
      e("ignoring error from closed connection");
    }), C.writable) {
      const y = T.message || s.errorMessages[S], E = Buffer.byteLength(y);
      C.write(`HTTP/1.1 400 Bad Request\r
Connection: close\r
Content-type: text/html\r
Content-Length: ` + E + `\r
\r
` + y);
    }
    C.destroy();
  }
  const x = [
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
    // 0 - 15
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
    // 16 - 31
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 32 - 47
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 48 - 63
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 64 - 79
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 80 - 95
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 96 - 111
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    // 112 - 127
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 128 ...
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
    // ... 255
  ];
  function b(C) {
    if (C += "", C.length < 1)
      return !1;
    if (!x[C.charCodeAt(0)])
      return e('invalid header, index 0, char "%s"', C.charCodeAt(0)), !0;
    if (C.length < 2)
      return !1;
    if (!x[C.charCodeAt(1)])
      return e('invalid header, index 1, char "%s"', C.charCodeAt(1)), !0;
    if (C.length < 3)
      return !1;
    if (!x[C.charCodeAt(2)])
      return e('invalid header, index 2, char "%s"', C.charCodeAt(2)), !0;
    if (C.length < 4)
      return !1;
    if (!x[C.charCodeAt(3)])
      return e('invalid header, index 3, char "%s"', C.charCodeAt(3)), !0;
    for (let S = 4; S < C.length; ++S)
      if (!x[C.charCodeAt(S)])
        return e('invalid header, index "%i", char "%s"', S, C.charCodeAt(S)), !0;
    return !1;
  }
  return $t;
}
var Wn = {}, qi = {}, Vn = {}, Zu;
function Pm() {
  if (Zu) return Vn;
  Zu = 1, Object.defineProperty(Vn, "__esModule", { value: !0 }), Vn.Polling = void 0;
  const o = dn(), m = on, v = Ma(), d = (0, $e().default)("engine:polling"), c = {
    gzip: m.createGzip,
    deflate: m.createDeflate
  };
  class t extends o.Transport {
    /**
     * HTTP polling constructor.
     */
    constructor(n) {
      super(n), this.closeTimeout = 30 * 1e3;
    }
    /**
     * Transport name
     */
    get name() {
      return "polling";
    }
    /**
     * Overrides onRequest.
     *
     * @param req
     *
     * @private
     */
    onRequest(n) {
      const e = n.res;
      n.res = null, n.getMethod() === "get" ? this.onPollRequest(n, e) : n.getMethod() === "post" ? this.onDataRequest(n, e) : (e.writeStatus("500 Internal Server Error"), e.end());
    }
    /**
     * The client sends a request awaiting for us to send data.
     *
     * @private
     */
    onPollRequest(n, e) {
      if (this.req) {
        d("request overlap"), this.onError("overlap from client"), e.writeStatus("500 Internal Server Error"), e.end();
        return;
      }
      d("setting request"), this.req = n, this.res = e;
      const i = () => {
        this.writable = !1, this.onError("poll connection closed prematurely");
      }, l = () => {
        this.req = this.res = null;
      };
      n.cleanup = l, e.onAborted(i), this.writable = !0, this.emit("ready"), this.writable && this.shouldClose && (d("triggering empty send to append close packet"), this.send([{ type: "noop" }]));
    }
    /**
     * The client sends a request with data.
     *
     * @private
     */
    onDataRequest(n, e) {
      if (this.dataReq) {
        this.onError("data request overlap from client"), e.writeStatus("500 Internal Server Error"), e.end();
        return;
      }
      const i = Number(n.headers["content-length"]);
      if (!i) {
        this.onError("content-length header required"), e.writeStatus("411 Length Required").end();
        return;
      }
      if (i > this.maxHttpBufferSize) {
        this.onError("payload too large"), e.writeStatus("413 Payload Too Large").end();
        return;
      }
      if (n.headers["content-type"] === "application/octet-stream" && this.protocol === 4)
        return this.onError("invalid content");
      this.dataReq = n, this.dataRes = e;
      let r, u = 0;
      const s = {
        // text/html is required instead of text/plain to avoid an
        // unwanted download dialog on certain user-agents (GH-43)
        "Content-Type": "text/html"
      };
      this.headers(n, s);
      for (let p in s)
        e.writeHeader(p, String(s[p]));
      const f = (p) => {
        this.onData(p.toString()), this.onDataRequestCleanup(), e.cork(() => {
          e.end("ok");
        });
      };
      e.onAborted(() => {
        this.onDataRequestCleanup(), this.onError("data request connection closed prematurely");
      }), e.onData((p, x) => {
        const b = u + p.byteLength;
        if (b > i) {
          this.onError("content-length mismatch"), e.close();
          return;
        }
        if (!r) {
          if (x) {
            f(Buffer.from(p));
            return;
          }
          r = Buffer.allocUnsafe(i);
        }
        if (Buffer.from(p).copy(r, u), x) {
          if (b != i) {
            this.onError("content-length mismatch"), e.writeStatus("400 Content-Length Mismatch").end(), this.onDataRequestCleanup();
            return;
          }
          f(r);
          return;
        }
        u = b;
      });
    }
    /**
     * Cleanup request.
     *
     * @private
     */
    onDataRequestCleanup() {
      this.dataReq = this.dataRes = null;
    }
    /**
     * Processes the incoming data payload.
     *
     * @param {String} encoded payload
     * @private
     */
    onData(n) {
      d('received "%s"', n);
      const e = (i) => {
        if (i.type === "close")
          return d("got xhr close packet"), this.onClose(), !1;
        this.onPacket(i);
      };
      this.protocol === 3 ? this.parser.decodePayload(n, e) : this.parser.decodePayload(n).forEach(e);
    }
    /**
     * Overrides onClose.
     *
     * @private
     */
    onClose() {
      this.writable && this.send([{ type: "noop" }]), super.onClose();
    }
    /**
     * Writes a packet payload.
     *
     * @param {Object} packet
     * @private
     */
    send(n) {
      this.writable = !1, this.shouldClose && (d("appending close packet to payload"), n.push({ type: "close" }), this.shouldClose(), this.shouldClose = null);
      const e = (i) => {
        const l = n.some((r) => r.options && r.options.compress);
        this.write(i, { compress: l });
      };
      this.protocol === 3 ? this.parser.encodePayload(n, this.supportsBinary, e) : this.parser.encodePayload(n, e);
    }
    /**
     * Writes data as response to poll request.
     *
     * @param {String} data
     * @param {Object} options
     * @private
     */
    write(n, e) {
      d('writing "%s"', n), this.doWrite(n, e, () => {
        this.req.cleanup(), this.emit("drain");
      });
    }
    /**
     * Performs the write.
     *
     * @private
     */
    doWrite(n, e, i) {
      const l = typeof n == "string", u = {
        "Content-Type": l ? "text/plain; charset=UTF-8" : "application/octet-stream"
      }, s = (x) => {
        this.headers(this.req, u), this.res.cork(() => {
          Object.keys(u).forEach((b) => {
            this.res.writeHeader(b, String(u[b]));
          }), this.res.end(x);
        }), i();
      };
      if (!this.httpCompression || !e.compress) {
        s(n);
        return;
      }
      if ((l ? Buffer.byteLength(n) : n.length) < this.httpCompression.threshold) {
        s(n);
        return;
      }
      const p = v(this.req).encodings(["gzip", "deflate"]);
      if (!p) {
        s(n);
        return;
      }
      this.compress(n, p, (x, b) => {
        if (x) {
          this.res.writeStatus("500 Internal Server Error"), this.res.end(), i(x);
          return;
        }
        u["Content-Encoding"] = p, s(b);
      });
    }
    /**
     * Compresses data.
     *
     * @private
     */
    compress(n, e, i) {
      d("compressing");
      const l = [];
      let r = 0;
      c[e](this.httpCompression).on("error", i).on("data", function(u) {
        l.push(u), r += u.length;
      }).on("end", function() {
        i(null, Buffer.concat(l, r));
      }).end(n);
    }
    /**
     * Closes the transport.
     *
     * @private
     */
    doClose(n) {
      d("closing");
      let e;
      const i = () => {
        clearTimeout(e), n(), this.onClose();
      };
      this.writable ? (d("transport writable - closing right away"), this.send([{ type: "close" }]), i()) : this.discarded ? (d("transport discarded - closing right away"), i()) : (d("transport not writable - buffering orderly close"), this.shouldClose = i, e = setTimeout(i, this.closeTimeout));
    }
    /**
     * Returns headers for a response.
     *
     * @param req - request
     * @param {Object} extra headers
     * @private
     */
    headers(n, e) {
      e = e || {};
      const i = n.headers["user-agent"];
      return i && (~i.indexOf(";MSIE") || ~i.indexOf("Trident/")) && (e["X-XSS-Protection"] = "0"), e["cache-control"] = "no-store", this.emit("headers", e, n), e;
    }
  }
  return Vn.Polling = t, Vn;
}
var Yn = {}, ep;
function Nm() {
  if (ep) return Yn;
  ep = 1, Object.defineProperty(Yn, "__esModule", { value: !0 }), Yn.WebSocket = void 0;
  const o = dn(), v = (0, $e().default)("engine:ws");
  class h extends o.Transport {
    /**
     * WebSocket transport
     *
     * @param req
     */
    constructor(c) {
      super(c), this.writable = !1, this.perMessageDeflate = null;
    }
    /**
     * Transport name
     */
    get name() {
      return "websocket";
    }
    /**
     * Advertise upgrade support.
     */
    get handlesUpgrades() {
      return !0;
    }
    /**
     * Writes a packet payload.
     *
     * @param {Array} packets
     * @private
     */
    send(c) {
      this.writable = !1;
      for (let t = 0; t < c.length; t++) {
        const a = c[t], n = t + 1 === c.length, e = (i) => {
          const l = typeof i != "string", r = this.perMessageDeflate && Buffer.byteLength(i) > this.perMessageDeflate.threshold;
          v('writing "%s"', i), this.socket.send(i, l, r), n && (this.emit("drain"), this.writable = !0, this.emit("ready"));
        };
        a.options && typeof a.options.wsPreEncoded == "string" ? e(a.options.wsPreEncoded) : this.parser.encodePacket(a, this.supportsBinary, e);
      }
    }
    /**
     * Closes the transport.
     *
     * @private
     */
    doClose(c) {
      v("closing"), c && c(), this.socket.end();
    }
  }
  return Yn.WebSocket = h, Yn;
}
var tp;
function Dm() {
  if (tp) return qi;
  tp = 1, Object.defineProperty(qi, "__esModule", { value: !0 });
  const o = Pm(), m = Nm();
  return qi.default = {
    polling: o.Polling,
    websocket: m.WebSocket
  }, qi;
}
var np;
function Im() {
  if (np) return Wn;
  np = 1, Object.defineProperty(Wn, "__esModule", { value: !0 }), Wn.uServer = void 0;
  const o = $e(), m = pd(), v = Dm(), h = (0, o.default)("engine:uws");
  class d extends m.BaseServer {
    init() {
    }
    cleanup() {
    }
    /**
     * Prepares a request by processing the query string.
     *
     * @private
     */
    prepare(a, n) {
      a.method = a.getMethod().toUpperCase(), a.url = a.getUrl();
      const e = new URLSearchParams(a.getQuery());
      a._query = Object.fromEntries(e.entries()), a.headers = {}, a.forEach((i, l) => {
        a.headers[i] = l;
      }), a.connection = {
        remoteAddress: Buffer.from(n.getRemoteAddressAsText()).toString()
      }, n.onAborted(() => {
        h("response has been aborted");
      });
    }
    createTransport(a, n) {
      return new v.default[a](n);
    }
    /**
     * Attach the engine to a µWebSockets.js server
     * @param app
     * @param options
     */
    attach(a, n = {}) {
      const e = this._computePath(n);
      a.any(e, this.handleRequest.bind(this)).ws(e, {
        compression: n.compression,
        idleTimeout: n.idleTimeout,
        maxBackpressure: n.maxBackpressure,
        maxPayloadLength: this.opts.maxHttpBufferSize,
        upgrade: this.handleUpgrade.bind(this),
        open: (i) => {
          const l = i.getUserData().transport;
          l.socket = i, l.writable = !0, l.emit("ready");
        },
        message: (i, l, r) => {
          i.getUserData().transport.onData(r ? l : Buffer.from(l).toString());
        },
        close: (i, l, r) => {
          i.getUserData().transport.onClose(l, r);
        }
      });
    }
    _applyMiddlewares(a, n, e) {
      if (this.middlewares.length === 0)
        return e();
      a.res = new c(n), super._applyMiddlewares(a, a.res, (i) => {
        a.res.writeHead(), e(i);
      });
    }
    handleRequest(a, n) {
      h('handling "%s" http request "%s"', n.getMethod(), n.getUrl()), this.prepare(n, a), n.res = a;
      const e = (i, l) => {
        if (i !== void 0) {
          this.emit("connection_error", {
            req: n,
            code: i,
            message: m.Server.errorMessages[i],
            context: l
          }), this.abortRequest(n.res, i, l);
          return;
        }
        if (n._query.sid)
          h("setting new request for existing client"), this.clients[n._query.sid].transport.onRequest(n);
        else {
          const r = (u, s) => this.abortRequest(a, u, s);
          this.handshake(n._query.transport, n, r);
        }
      };
      this._applyMiddlewares(n, a, (i) => {
        i ? e(m.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(n, !1, e);
      });
    }
    handleUpgrade(a, n, e) {
      h("on upgrade"), this.prepare(n, a), n.res = a;
      const i = async (l, r) => {
        if (l !== void 0) {
          this.emit("connection_error", {
            req: n,
            code: l,
            message: m.Server.errorMessages[l],
            context: r
          }), this.abortRequest(a, l, r);
          return;
        }
        const u = n._query.sid;
        let s;
        if (u) {
          const f = this.clients[u];
          if (f) {
            if (f.upgrading)
              return h("transport has already been trying to upgrade"), a.close();
            if (f.upgraded)
              return h("transport had already been upgraded"), a.close();
            h("upgrading existing transport"), s = this.createTransport(n._query.transport, n), f._maybeUpgrade(s);
          } else return h("upgrade attempt for closed client"), a.close();
        } else if (s = await this.handshake(n._query.transport, n, (f, p) => this.abortRequest(a, f, p)), !s)
          return;
        n.res.writeStatus("101 Switching Protocols"), a.upgrade({
          transport: s
        }, n.getHeader("sec-websocket-key"), n.getHeader("sec-websocket-protocol"), n.getHeader("sec-websocket-extensions"), e);
      };
      this._applyMiddlewares(n, a, (l) => {
        l ? i(m.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(n, !0, i);
      });
    }
    abortRequest(a, n, e) {
      const i = n === m.Server.errors.FORBIDDEN ? "403 Forbidden" : "400 Bad Request", l = e && e.message ? e.message : m.Server.errorMessages[n];
      a.writeStatus(i), a.writeHeader("Content-Type", "application/json"), a.end(JSON.stringify({
        code: n,
        message: l
      }));
    }
  }
  Wn.uServer = d;
  class c {
    constructor(a) {
      this.res = a, this.statusWritten = !1, this.headers = [], this.isAborted = !1;
    }
    set statusCode(a) {
      a && this.writeStatus(a === 200 ? "200 OK" : "204 No Content");
    }
    writeHead(a) {
      this.statusCode = a;
    }
    setHeader(a, n) {
      Array.isArray(n) ? n.forEach((e) => {
        this.writeHeader(a, e);
      }) : this.writeHeader(a, n);
    }
    removeHeader() {
    }
    // needed by vary: https://github.com/jshttp/vary/blob/5d725d059b3871025cf753e9dfa08924d0bcfa8f/index.js#L134
    getHeader() {
    }
    writeStatus(a) {
      if (!this.isAborted)
        return this.res.writeStatus(a), this.statusWritten = !0, this.writeBufferedHeaders(), this;
    }
    writeHeader(a, n) {
      this.isAborted || a !== "Content-Length" && (this.statusWritten ? this.res.writeHeader(a, n) : this.headers.push([a, n]));
    }
    writeBufferedHeaders() {
      this.headers.forEach(([a, n]) => {
        this.res.writeHeader(a, n);
      });
    }
    end(a) {
      this.isAborted || this.res.cork(() => {
        this.statusWritten || this.writeBufferedHeaders(), this.res.end(a);
      });
    }
    onData(a) {
      this.isAborted || this.res.onData(a);
    }
    onAborted(a) {
      this.isAborted || this.res.onAborted(() => {
        this.isAborted = !0, a();
      });
    }
    cork(a) {
      this.isAborted || this.res.cork(a);
    }
  }
  return Wn;
}
var ip;
function Lm() {
  return ip || (ip = 1, (function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.protocol = o.Transport = o.Socket = o.uServer = o.parser = o.transports = o.Server = void 0, o.listen = n, o.attach = e;
    const m = ii, v = pd();
    Object.defineProperty(o, "Server", { enumerable: !0, get: function() {
      return v.Server;
    } });
    const h = nd();
    o.transports = h.default;
    const d = Yi();
    o.parser = d;
    var c = Im();
    Object.defineProperty(o, "uServer", { enumerable: !0, get: function() {
      return c.uServer;
    } });
    var t = id();
    Object.defineProperty(o, "Socket", { enumerable: !0, get: function() {
      return t.Socket;
    } });
    var a = dn();
    Object.defineProperty(o, "Transport", { enumerable: !0, get: function() {
      return a.Transport;
    } }), o.protocol = d.protocol;
    function n(i, l, r) {
      typeof l == "function" && (r = l, l = {});
      const u = (0, m.createServer)(function(f, p) {
        p.writeHead(501), p.end("Not Implemented");
      }), s = e(u, l);
      return s.httpServer = u, u.listen(i, r), s;
    }
    function e(i, l) {
      const r = new v.Server(l);
      return r.attach(i, l), r;
    }
  })(na)), na;
}
var Bt = {}, it = {};
function Ve(o) {
  if (o) return Fm(o);
}
function Fm(o) {
  for (var m in Ve.prototype)
    o[m] = Ve.prototype[m];
  return o;
}
Ve.prototype.on = Ve.prototype.addEventListener = function(o, m) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + o] = this._callbacks["$" + o] || []).push(m), this;
};
Ve.prototype.once = function(o, m) {
  function v() {
    this.off(o, v), m.apply(this, arguments);
  }
  return v.fn = m, this.on(o, v), this;
};
Ve.prototype.off = Ve.prototype.removeListener = Ve.prototype.removeAllListeners = Ve.prototype.removeEventListener = function(o, m) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var v = this._callbacks["$" + o];
  if (!v) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + o], this;
  for (var h, d = 0; d < v.length; d++)
    if (h = v[d], h === m || h.fn === m) {
      v.splice(d, 1);
      break;
    }
  return v.length === 0 && delete this._callbacks["$" + o], this;
};
Ve.prototype.emit = function(o) {
  this._callbacks = this._callbacks || {};
  for (var m = new Array(arguments.length - 1), v = this._callbacks["$" + o], h = 1; h < arguments.length; h++)
    m[h - 1] = arguments[h];
  if (v) {
    v = v.slice(0);
    for (var h = 0, d = v.length; h < d; ++h)
      v[h].apply(this, m);
  }
  return this;
};
Ve.prototype.emitReserved = Ve.prototype.emit;
Ve.prototype.listeners = function(o) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + o] || [];
};
Ve.prototype.hasListeners = function(o) {
  return !!this.listeners(o).length;
};
const Um = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Emitter: Ve
}, Symbol.toStringTag, { value: "Module" })), qm = /* @__PURE__ */ Pf(Um);
var Kn = {}, Xn = {}, rp;
function dd() {
  if (rp) return Xn;
  rp = 1, Object.defineProperty(Xn, "__esModule", { value: !0 }), Xn.isBinary = c, Xn.hasBinary = t;
  const o = typeof ArrayBuffer == "function", m = (a) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(a) : a.buffer instanceof ArrayBuffer, v = Object.prototype.toString, h = typeof Blob == "function" || typeof Blob < "u" && v.call(Blob) === "[object BlobConstructor]", d = typeof File == "function" || typeof File < "u" && v.call(File) === "[object FileConstructor]";
  function c(a) {
    return o && (a instanceof ArrayBuffer || m(a)) || h && a instanceof Blob || d && a instanceof File;
  }
  function t(a, n) {
    if (!a || typeof a != "object")
      return !1;
    if (Array.isArray(a)) {
      for (let e = 0, i = a.length; e < i; e++)
        if (t(a[e]))
          return !0;
      return !1;
    }
    if (c(a))
      return !0;
    if (a.toJSON && typeof a.toJSON == "function" && arguments.length === 1)
      return t(a.toJSON(), !0);
    for (const e in a)
      if (Object.prototype.hasOwnProperty.call(a, e) && t(a[e]))
        return !0;
    return !1;
  }
  return Xn;
}
var sp;
function $m() {
  if (sp) return Kn;
  sp = 1, Object.defineProperty(Kn, "__esModule", { value: !0 }), Kn.deconstructPacket = m, Kn.reconstructPacket = h;
  const o = dd();
  function m(c) {
    const t = [], a = c.data, n = c;
    return n.data = v(a, t), n.attachments = t.length, { packet: n, buffers: t };
  }
  function v(c, t) {
    if (!c)
      return c;
    if ((0, o.isBinary)(c)) {
      const a = { _placeholder: !0, num: t.length };
      return t.push(c), a;
    } else if (Array.isArray(c)) {
      const a = new Array(c.length);
      for (let n = 0; n < c.length; n++)
        a[n] = v(c[n], t);
      return a;
    } else if (typeof c == "object" && !(c instanceof Date)) {
      const a = {};
      for (const n in c)
        Object.prototype.hasOwnProperty.call(c, n) && (a[n] = v(c[n], t));
      return a;
    }
    return c;
  }
  function h(c, t) {
    return c.data = d(c.data, t), delete c.attachments, c;
  }
  function d(c, t) {
    if (!c)
      return c;
    if (c && c._placeholder === !0) {
      if (typeof c.num == "number" && c.num >= 0 && c.num < t.length)
        return t[c.num];
      throw new Error("illegal attachments");
    } else if (Array.isArray(c))
      for (let a = 0; a < c.length; a++)
        c[a] = d(c[a], t);
    else if (typeof c == "object")
      for (const a in c)
        Object.prototype.hasOwnProperty.call(c, a) && (c[a] = d(c[a], t));
    return c;
  }
  return Kn;
}
var ap;
function Ji() {
  if (ap) return it;
  ap = 1, Object.defineProperty(it, "__esModule", { value: !0 }), it.Decoder = it.Encoder = it.PacketType = it.protocol = void 0, it.isPacketValid = f;
  const o = qm, m = $m(), v = dd(), d = (0, $e().default)("socket.io-parser"), c = [
    "connect",
    // used on the client side
    "connect_error",
    // used on the client side
    "disconnect",
    // used on both sides
    "disconnecting",
    // used on the server side
    "newListener",
    // used by the Node.js EventEmitter
    "removeListener"
    // used by the Node.js EventEmitter
  ];
  it.protocol = 5;
  var t;
  (function(p) {
    p[p.CONNECT = 0] = "CONNECT", p[p.DISCONNECT = 1] = "DISCONNECT", p[p.EVENT = 2] = "EVENT", p[p.ACK = 3] = "ACK", p[p.CONNECT_ERROR = 4] = "CONNECT_ERROR", p[p.BINARY_EVENT = 5] = "BINARY_EVENT", p[p.BINARY_ACK = 6] = "BINARY_ACK";
  })(t || (it.PacketType = t = {}));
  class a {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(x) {
      this.replacer = x;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(x) {
      return d("encoding packet %j", x), (x.type === t.EVENT || x.type === t.ACK) && (0, v.hasBinary)(x) ? this.encodeAsBinary({
        type: x.type === t.EVENT ? t.BINARY_EVENT : t.BINARY_ACK,
        nsp: x.nsp,
        data: x.data,
        id: x.id
      }) : [this.encodeAsString(x)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(x) {
      let b = "" + x.type;
      return (x.type === t.BINARY_EVENT || x.type === t.BINARY_ACK) && (b += x.attachments + "-"), x.nsp && x.nsp !== "/" && (b += x.nsp + ","), x.id != null && (b += x.id), x.data != null && (b += JSON.stringify(x.data, this.replacer)), d("encoded %j as %s", x, b), b;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(x) {
      const b = (0, m.deconstructPacket)(x), C = this.encodeAsString(b.packet), S = b.buffers;
      return S.unshift(C), S;
    }
  }
  it.Encoder = a;
  class n extends o.Emitter {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(x) {
      super(), this.reviver = x;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(x) {
      let b;
      if (typeof x == "string") {
        if (this.reconstructor)
          throw new Error("got plaintext data when reconstructing a packet");
        b = this.decodeString(x);
        const C = b.type === t.BINARY_EVENT;
        C || b.type === t.BINARY_ACK ? (b.type = C ? t.EVENT : t.ACK, this.reconstructor = new e(b), b.attachments === 0 && super.emitReserved("decoded", b)) : super.emitReserved("decoded", b);
      } else if ((0, v.isBinary)(x) || x.base64)
        if (this.reconstructor)
          b = this.reconstructor.takeBinaryData(x), b && (this.reconstructor = null, super.emitReserved("decoded", b));
        else
          throw new Error("got binary data when not reconstructing a packet");
      else
        throw new Error("Unknown type: " + x);
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(x) {
      let b = 0;
      const C = {
        type: Number(x.charAt(0))
      };
      if (t[C.type] === void 0)
        throw new Error("unknown packet type " + C.type);
      if (C.type === t.BINARY_EVENT || C.type === t.BINARY_ACK) {
        const T = b + 1;
        for (; x.charAt(++b) !== "-" && b != x.length; )
          ;
        const y = x.substring(T, b);
        if (y != Number(y) || x.charAt(b) !== "-")
          throw new Error("Illegal attachments");
        C.attachments = Number(y);
      }
      if (x.charAt(b + 1) === "/") {
        const T = b + 1;
        for (; ++b && !(x.charAt(b) === "," || b === x.length); )
          ;
        C.nsp = x.substring(T, b);
      } else
        C.nsp = "/";
      const S = x.charAt(b + 1);
      if (S !== "" && Number(S) == S) {
        const T = b + 1;
        for (; ++b; ) {
          const y = x.charAt(b);
          if (y == null || Number(y) != y) {
            --b;
            break;
          }
          if (b === x.length)
            break;
        }
        C.id = Number(x.substring(T, b + 1));
      }
      if (x.charAt(++b)) {
        const T = this.tryParse(x.substr(b));
        if (n.isPayloadValid(C.type, T))
          C.data = T;
        else
          throw new Error("invalid payload");
      }
      return d("decoded %s as %j", x, C), C;
    }
    tryParse(x) {
      try {
        return JSON.parse(x, this.reviver);
      } catch {
        return !1;
      }
    }
    static isPayloadValid(x, b) {
      switch (x) {
        case t.CONNECT:
          return u(b);
        case t.DISCONNECT:
          return b === void 0;
        case t.CONNECT_ERROR:
          return typeof b == "string" || u(b);
        case t.EVENT:
        case t.BINARY_EVENT:
          return Array.isArray(b) && (typeof b[0] == "number" || typeof b[0] == "string" && c.indexOf(b[0]) === -1);
        case t.ACK:
        case t.BINARY_ACK:
          return Array.isArray(b);
      }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
      this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
    }
  }
  it.Decoder = n;
  class e {
    constructor(x) {
      this.packet = x, this.buffers = [], this.reconPack = x;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(x) {
      if (this.buffers.push(x), this.buffers.length === this.reconPack.attachments) {
        const b = (0, m.reconstructPacket)(this.reconPack, this.buffers);
        return this.finishedReconstruction(), b;
      }
      return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
      this.reconPack = null, this.buffers = [];
    }
  }
  function i(p) {
    return typeof p == "string";
  }
  const l = Number.isInteger || function(p) {
    return typeof p == "number" && isFinite(p) && Math.floor(p) === p;
  };
  function r(p) {
    return p === void 0 || l(p);
  }
  function u(p) {
    return Object.prototype.toString.call(p) === "[object Object]";
  }
  function s(p, x) {
    switch (p) {
      case t.CONNECT:
        return x === void 0 || u(x);
      case t.DISCONNECT:
        return x === void 0;
      case t.EVENT:
        return Array.isArray(x) && (typeof x[0] == "number" || typeof x[0] == "string" && c.indexOf(x[0]) === -1);
      case t.ACK:
        return Array.isArray(x);
      case t.CONNECT_ERROR:
        return typeof x == "string" || u(x);
      default:
        return !1;
    }
  }
  function f(p) {
    return i(p.nsp) && r(p.id) && s(p.type, p.data);
  }
  return it;
}
var op;
function Bm() {
  if (op) return Bt;
  op = 1;
  var o = Bt && Bt.__importDefault || function(c) {
    return c && c.__esModule ? c : { default: c };
  };
  Object.defineProperty(Bt, "__esModule", { value: !0 }), Bt.Client = void 0;
  const m = Ji(), h = (0, o($e()).default)("socket.io:client");
  class d {
    /**
     * Client constructor.
     *
     * @param server instance
     * @param conn
     * @package
     */
    constructor(t, a) {
      this.sockets = /* @__PURE__ */ new Map(), this.nsps = /* @__PURE__ */ new Map(), this.server = t, this.conn = a, this.encoder = t.encoder, this.decoder = new t._parser.Decoder(), this.id = a.id, this.setup();
    }
    /**
     * @return the reference to the request that originated the Engine.IO connection
     *
     * @public
     */
    get request() {
      return this.conn.request;
    }
    /**
     * Sets up event listeners.
     *
     * @private
     */
    setup() {
      this.onclose = this.onclose.bind(this), this.ondata = this.ondata.bind(this), this.onerror = this.onerror.bind(this), this.ondecoded = this.ondecoded.bind(this), this.decoder.on("decoded", this.ondecoded), this.conn.on("data", this.ondata), this.conn.on("error", this.onerror), this.conn.on("close", this.onclose), this.connectTimeout = setTimeout(() => {
        this.nsps.size === 0 ? (h("no namespace joined yet, close the client"), this.close()) : h("the client has already joined a namespace, nothing to do");
      }, this.server._connectTimeout);
    }
    /**
     * Connects a client to a namespace.
     *
     * @param {String} name - the namespace
     * @param {Object} auth - the auth parameters
     * @private
     */
    connect(t, a = {}) {
      if (this.server._nsps.has(t))
        return h("connecting to namespace %s", t), this.doConnect(t, a);
      this.server._checkNamespace(t, a, (n) => {
        n ? this.doConnect(t, a) : (h("creation of namespace %s was denied", t), this._packet({
          type: m.PacketType.CONNECT_ERROR,
          nsp: t,
          data: {
            message: "Invalid namespace"
          }
        }));
      });
    }
    /**
     * Connects a client to a namespace.
     *
     * @param name - the namespace
     * @param {Object} auth - the auth parameters
     *
     * @private
     */
    doConnect(t, a) {
      const n = this.server.of(t);
      n._add(this, a, (e) => {
        this.sockets.set(e.id, e), this.nsps.set(n.name, e), this.connectTimeout && (clearTimeout(this.connectTimeout), this.connectTimeout = void 0);
      });
    }
    /**
     * Disconnects from all namespaces and closes transport.
     *
     * @private
     */
    _disconnect() {
      for (const t of this.sockets.values())
        t.disconnect();
      this.sockets.clear(), this.close();
    }
    /**
     * Removes a socket. Called by each `Socket`.
     *
     * @private
     */
    _remove(t) {
      if (this.sockets.has(t.id)) {
        const a = this.sockets.get(t.id).nsp.name;
        this.sockets.delete(t.id), this.nsps.delete(a);
      } else
        h("ignoring remove for %s", t.id);
    }
    /**
     * Closes the underlying connection.
     *
     * @private
     */
    close() {
      this.conn.readyState === "open" && (h("forcing transport close"), this.conn.close(), this.onclose("forced server close"));
    }
    /**
     * Writes a packet to the transport.
     *
     * @param {Object} packet object
     * @param {Object} opts
     * @private
     */
    _packet(t, a = {}) {
      if (this.conn.readyState !== "open") {
        h("ignoring packet write %j", t);
        return;
      }
      const n = a.preEncoded ? t : this.encoder.encode(t);
      this.writeToEngine(n, a);
    }
    writeToEngine(t, a) {
      if (a.volatile && !this.conn.transport.writable) {
        h("volatile packet is discarded since the transport is not currently writable");
        return;
      }
      const n = Array.isArray(t) ? t : [t];
      for (const e of n)
        this.conn.write(e, a);
    }
    /**
     * Called with incoming transport data.
     *
     * @private
     */
    ondata(t) {
      try {
        this.decoder.add(t);
      } catch (a) {
        h("invalid packet format"), this.onerror(a);
      }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(t) {
      const { namespace: a, authPayload: n } = this._parseNamespace(t), e = this.nsps.get(a);
      !e && t.type === m.PacketType.CONNECT ? this.connect(a, n) : e && t.type !== m.PacketType.CONNECT && t.type !== m.PacketType.CONNECT_ERROR ? process.nextTick(function() {
        e._onpacket(t);
      }) : (h("invalid state (packet type: %s)", t.type), this.close());
    }
    _parseNamespace(t) {
      if (this.conn.protocol !== 3)
        return {
          namespace: t.nsp,
          authPayload: t.data
        };
      const a = new URL(t.nsp, "https://socket.io");
      return {
        namespace: a.pathname,
        authPayload: Object.fromEntries(a.searchParams.entries())
      };
    }
    /**
     * Handles an error.
     *
     * @param {Object} err object
     * @private
     */
    onerror(t) {
      for (const a of this.sockets.values())
        a._onerror(t);
      this.conn.close();
    }
    /**
     * Called upon transport close.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(t, a) {
      h("client close with reason %s", t), this.destroy();
      for (const n of this.sockets.values())
        n._onclose(t, a);
      this.sockets.clear(), this.decoder.destroy();
    }
    /**
     * Cleans up event listeners.
     * @private
     */
    destroy() {
      this.conn.removeListener("data", this.ondata), this.conn.removeListener("error", this.onerror), this.conn.removeListener("close", this.onclose), this.decoder.removeListener("decoded", this.ondecoded), this.connectTimeout && (clearTimeout(this.connectTimeout), this.connectTimeout = void 0);
    }
  }
  return Bt.Client = d, Bt;
}
var Jn = {}, jt = {}, Qn = {}, cp;
function Ga() {
  if (cp) return Qn;
  cp = 1, Object.defineProperty(Qn, "__esModule", { value: !0 }), Qn.StrictEventEmitter = void 0;
  const o = ft;
  class m extends o.EventEmitter {
    /**
     * Adds the `listener` function as an event listener for `ev`.
     *
     * @param ev Name of the event
     * @param listener Callback function
     */
    on(h, d) {
      return super.on(h, d);
    }
    /**
     * Adds a one-time `listener` function as an event listener for `ev`.
     *
     * @param ev Name of the event
     * @param listener Callback function
     */
    once(h, d) {
      return super.once(h, d);
    }
    /**
     * Emits an event.
     *
     * @param ev Name of the event
     * @param args Values to send to listeners of this event
     */
    emit(h, ...d) {
      return super.emit(h, ...d);
    }
    /**
     * Emits a reserved event.
     *
     * This method is `protected`, so that only a class extending
     * `StrictEventEmitter` can emit its own reserved events.
     *
     * @param ev Reserved event name
     * @param args Arguments to emit along with the event
     */
    emitReserved(h, ...d) {
      return super.emit(h, ...d);
    }
    /**
     * Emits an event.
     *
     * This method is `protected`, so that only a class extending
     * `StrictEventEmitter` can get around the strict typing. This is useful for
     * calling `emit.apply`, which can be called as `emitUntyped.apply`.
     *
     * @param ev Event name
     * @param args Arguments to emit along with the event
     */
    emitUntyped(h, ...d) {
      return super.emit(h, ...d);
    }
    /**
     * Returns the listeners listening to an event.
     *
     * @param event Event name
     * @returns Array of listeners subscribed to `event`
     */
    listeners(h) {
      return super.listeners(h);
    }
  }
  return Qn.StrictEventEmitter = m, Qn;
}
var Mt = {}, Zn = {}, lp;
function fd() {
  return lp || (lp = 1, Object.defineProperty(Zn, "__esModule", { value: !0 }), Zn.RESERVED_EVENTS = void 0, Zn.RESERVED_EVENTS = /* @__PURE__ */ new Set([
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
  ])), Zn;
}
var up;
function hd() {
  if (up) return Mt;
  up = 1, Object.defineProperty(Mt, "__esModule", { value: !0 }), Mt.RemoteSocket = Mt.BroadcastOperator = void 0;
  const o = fd(), m = Ji();
  class v {
    constructor(c, t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), n = {}) {
      this.adapter = c, this.rooms = t, this.exceptRooms = a, this.flags = n;
    }
    /**
     * Targets a room when emitting.
     *
     * @example
     * // the “foo” event will be broadcast to all connected clients in the “room-101” room
     * io.to("room-101").emit("foo", "bar");
     *
     * // with an array of rooms (a client will be notified at most once)
     * io.to(["room-101", "room-102"]).emit("foo", "bar");
     *
     * // with multiple chained calls
     * io.to("room-101").to("room-102").emit("foo", "bar");
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    to(c) {
      const t = new Set(this.rooms);
      return Array.isArray(c) ? c.forEach((a) => t.add(a)) : t.add(c), new v(this.adapter, t, this.exceptRooms, this.flags);
    }
    /**
     * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
     *
     * @example
     * // disconnect all clients in the "room-101" room
     * io.in("room-101").disconnectSockets();
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    in(c) {
      return this.to(c);
    }
    /**
     * Excludes a room when emitting.
     *
     * @example
     * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
     * io.except("room-101").emit("foo", "bar");
     *
     * // with an array of rooms
     * io.except(["room-101", "room-102"]).emit("foo", "bar");
     *
     * // with multiple chained calls
     * io.except("room-101").except("room-102").emit("foo", "bar");
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    except(c) {
      const t = new Set(this.exceptRooms);
      return Array.isArray(c) ? c.forEach((a) => t.add(a)) : t.add(c), new v(this.adapter, this.rooms, t, this.flags);
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * io.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return a new BroadcastOperator instance
     */
    compress(c) {
      const t = Object.assign({}, this.flags, { compress: c });
      return new v(this.adapter, this.rooms, this.exceptRooms, t);
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @example
     * io.volatile.emit("hello"); // the clients may or may not receive it
     *
     * @return a new BroadcastOperator instance
     */
    get volatile() {
      const c = Object.assign({}, this.flags, { volatile: !0 });
      return new v(this.adapter, this.rooms, this.exceptRooms, c);
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @example
     * // the “foo” event will be broadcast to all connected clients on this node
     * io.local.emit("foo", "bar");
     *
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    get local() {
      const c = Object.assign({}, this.flags, { local: !0 });
      return new v(this.adapter, this.rooms, this.exceptRooms, c);
    }
    /**
     * Adds a timeout in milliseconds for the next operation
     *
     * @example
     * io.timeout(1000).emit("some-event", (err, responses) => {
     *   if (err) {
     *     // some clients did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per client
     *   }
     * });
     *
     * @param timeout
     */
    timeout(c) {
      const t = Object.assign({}, this.flags, { timeout: c });
      return new v(this.adapter, this.rooms, this.exceptRooms, t);
    }
    /**
     * Emits to all clients.
     *
     * @example
     * // the “foo” event will be broadcast to all connected clients
     * io.emit("foo", "bar");
     *
     * // the “foo” event will be broadcast to all connected clients in the “room-101” room
     * io.to("room-101").emit("foo", "bar");
     *
     * // with an acknowledgement expected from all connected clients
     * io.timeout(1000).emit("some-event", (err, responses) => {
     *   if (err) {
     *     // some clients did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per client
     *   }
     * });
     *
     * @return Always true
     */
    emit(c, ...t) {
      if (o.RESERVED_EVENTS.has(c))
        throw new Error(`"${String(c)}" is a reserved event name`);
      const a = [c, ...t], n = {
        type: m.PacketType.EVENT,
        data: a
      };
      if (!(typeof a[a.length - 1] == "function"))
        return this.adapter.broadcast(n, {
          rooms: this.rooms,
          except: this.exceptRooms,
          flags: this.flags
        }), !0;
      const i = a.pop();
      let l = !1, r = [];
      const u = setTimeout(() => {
        l = !0, i.apply(this, [
          new Error("operation has timed out"),
          this.flags.expectSingleResponse ? null : r
        ]);
      }, this.flags.timeout);
      let s = -1, f = 0, p = 0;
      const x = () => {
        !l && s === f && r.length === p && (clearTimeout(u), i.apply(this, [
          null,
          this.flags.expectSingleResponse ? r[0] : r
        ]));
      };
      return this.adapter.broadcastWithAck(n, {
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, (b) => {
        p += b, f++, x();
      }, (b) => {
        r.push(b), x();
      }), this.adapter.serverCount().then((b) => {
        s = b, x();
      }), !0;
    }
    /**
     * Emits an event and waits for an acknowledgement from all clients.
     *
     * @example
     * try {
     *   const responses = await io.timeout(1000).emitWithAck("some-event");
     *   console.log(responses); // one response per client
     * } catch (e) {
     *   // some clients did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when all clients have acknowledged the event
     */
    emitWithAck(c, ...t) {
      return new Promise((a, n) => {
        t.push((e, i) => e ? (e.responses = i, n(e)) : a(i)), this.emit(c, ...t);
      });
    }
    /**
     * Gets a list of clients.
     *
     * @deprecated this method will be removed in the next major release, please use {@link Server#serverSideEmit} or
     * {@link fetchSockets} instead.
     */
    allSockets() {
      if (!this.adapter)
        throw new Error("No adapter for this namespace, are you trying to get the list of clients of a dynamic namespace?");
      return this.adapter.sockets(this.rooms);
    }
    /**
     * Returns the matching socket instances. This method works across a cluster of several Socket.IO servers.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * // return all Socket instances
     * const sockets = await io.fetchSockets();
     *
     * // return all Socket instances in the "room1" room
     * const sockets = await io.in("room1").fetchSockets();
     *
     * for (const socket of sockets) {
     *   console.log(socket.id);
     *   console.log(socket.handshake);
     *   console.log(socket.rooms);
     *   console.log(socket.data);
     *
     *   socket.emit("hello");
     *   socket.join("room1");
     *   socket.leave("room2");
     *   socket.disconnect();
     * }
     */
    fetchSockets() {
      return this.adapter.fetchSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }).then((c) => c.map((t) => t.server ? t : new h(this.adapter, t)));
    }
    /**
     * Makes the matching socket instances join the specified rooms.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     *
     * // make all socket instances join the "room1" room
     * io.socketsJoin("room1");
     *
     * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
     * io.in("room1").socketsJoin(["room2", "room3"]);
     *
     * @param room - a room, or an array of rooms
     */
    socketsJoin(c) {
      this.adapter.addSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, Array.isArray(c) ? c : [c]);
    }
    /**
     * Makes the matching socket instances leave the specified rooms.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * // make all socket instances leave the "room1" room
     * io.socketsLeave("room1");
     *
     * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
     * io.in("room1").socketsLeave(["room2", "room3"]);
     *
     * @param room - a room, or an array of rooms
     */
    socketsLeave(c) {
      this.adapter.delSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, Array.isArray(c) ? c : [c]);
    }
    /**
     * Makes the matching socket instances disconnect.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
     * io.disconnectSockets();
     *
     * // make all socket instances in the "room1" room disconnect and close the underlying connections
     * io.in("room1").disconnectSockets(true);
     *
     * @param close - whether to close the underlying connection
     */
    disconnectSockets(c = !1) {
      this.adapter.disconnectSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, c);
    }
  }
  Mt.BroadcastOperator = v;
  class h {
    constructor(c, t) {
      this.id = t.id, this.handshake = t.handshake, this.rooms = new Set(t.rooms), this.data = t.data, this.operator = new v(c, /* @__PURE__ */ new Set([this.id]), /* @__PURE__ */ new Set(), {
        expectSingleResponse: !0
        // so that remoteSocket.emit() with acknowledgement behaves like socket.emit()
      });
    }
    /**
     * Adds a timeout in milliseconds for the next operation.
     *
     * @example
     * const sockets = await io.fetchSockets();
     *
     * for (const socket of sockets) {
     *   if (someCondition) {
     *     socket.timeout(1000).emit("some-event", (err) => {
     *       if (err) {
     *         // the client did not acknowledge the event in the given delay
     *       }
     *     });
     *   }
     * }
     *
     * // note: if possible, using a room instead of looping over all sockets is preferable
     * io.timeout(1000).to(someConditionRoom).emit("some-event", (err, responses) => {
     *   // ...
     * });
     *
     * @param timeout
     */
    timeout(c) {
      return this.operator.timeout(c);
    }
    emit(c, ...t) {
      return this.operator.emit(c, ...t);
    }
    /**
     * Joins a room.
     *
     * @param {String|Array} room - room or array of rooms
     */
    join(c) {
      return this.operator.socketsJoin(c);
    }
    /**
     * Leaves a room.
     *
     * @param {String} room
     */
    leave(c) {
      return this.operator.socketsLeave(c);
    }
    /**
     * Disconnects this client.
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return {Socket} self
     */
    disconnect(c = !1) {
      return this.operator.disconnectSockets(c), this;
    }
  }
  return Mt.RemoteSocket = h, Mt;
}
var pp;
function md() {
  if (pp) return jt;
  pp = 1;
  var o = jt && jt.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(jt, "__esModule", { value: !0 }), jt.Socket = void 0;
  const m = Ji(), v = o($e()), h = Ga(), d = o(Zp()), c = hd(), t = fd(), a = (0, v.default)("socket.io:socket"), n = /* @__PURE__ */ new Set([
    "transport error",
    "transport close",
    "forced close",
    "ping timeout",
    "server shutting down",
    "forced server close"
  ]);
  function e() {
  }
  class i extends h.StrictEventEmitter {
    /**
     * Interface to a `Client` for a given `Namespace`.
     *
     * @param {Namespace} nsp
     * @param {Client} client
     * @param {Object} auth
     * @package
     */
    constructor(r, u, s, f) {
      super(), this.nsp = r, this.client = u, this.recovered = !1, this.data = {}, this.connected = !1, this.acks = /* @__PURE__ */ new Map(), this.fns = [], this.flags = {}, this.server = r.server, this.adapter = r.adapter, f ? (this.id = f.sid, this.pid = f.pid, f.rooms.forEach((p) => this.join(p)), this.data = f.data, f.missedPackets.forEach((p) => {
        this.packet({
          type: m.PacketType.EVENT,
          data: p
        });
      }), this.recovered = !0) : (u.conn.protocol === 3 ? this.id = r.name !== "/" ? r.name + "#" + u.id : u.id : this.id = d.default.generateId(), this.server._opts.connectionStateRecovery && (this.pid = d.default.generateId())), this.handshake = this.buildHandshake(s), this.on("error", e);
    }
    /**
     * Builds the `handshake` BC object
     *
     * @private
     */
    buildHandshake(r) {
      var u, s, f, p;
      return {
        headers: ((u = this.request) === null || u === void 0 ? void 0 : u.headers) || {},
        time: /* @__PURE__ */ new Date() + "",
        address: this.conn.remoteAddress,
        xdomain: !!(!((s = this.request) === null || s === void 0) && s.headers.origin),
        // @ts-ignore
        secure: !this.request || !!this.request.connection.encrypted,
        issued: +/* @__PURE__ */ new Date(),
        url: (f = this.request) === null || f === void 0 ? void 0 : f.url,
        // @ts-ignore
        query: ((p = this.request) === null || p === void 0 ? void 0 : p._query) || {},
        auth: r
      };
    }
    /**
     * Emits to this client.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.emit("hello", "world");
     *
     *   // all serializable datastructures are supported (no need to call JSON.stringify)
     *   socket.emit("hello", 1, "2", { 3: ["4"], 5: Buffer.from([6]) });
     *
     *   // with an acknowledgement from the client
     *   socket.emit("hello", "world", (val) => {
     *     // ...
     *   });
     * });
     *
     * @return Always returns `true`.
     */
    emit(r, ...u) {
      if (t.RESERVED_EVENTS.has(r))
        throw new Error(`"${String(r)}" is a reserved event name`);
      const s = [r, ...u], f = {
        type: m.PacketType.EVENT,
        data: s
      };
      if (typeof s[s.length - 1] == "function") {
        const x = this.nsp._ids++;
        a("emitting packet with ack id %d", x), this.registerAckCallback(x, s.pop()), f.id = x;
      }
      const p = Object.assign({}, this.flags);
      return this.flags = {}, this.nsp.server.opts.connectionStateRecovery ? this.adapter.broadcast(f, {
        rooms: /* @__PURE__ */ new Set([this.id]),
        except: /* @__PURE__ */ new Set(),
        flags: p
      }) : (this.notifyOutgoingListeners(f), this.packet(f, p)), !0;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * io.on("connection", async (socket) => {
     *   // without timeout
     *   const response = await socket.emitWithAck("hello", "world");
     *
     *   // with a specific timeout
     *   try {
     *     const response = await socket.timeout(1000).emitWithAck("hello", "world");
     *   } catch (err) {
     *     // the client did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @return a Promise that will be fulfilled when the client acknowledges the event
     */
    emitWithAck(r, ...u) {
      const s = this.flags.timeout !== void 0;
      return new Promise((f, p) => {
        u.push((x, b) => s ? x ? p(x) : f(b) : f(x)), this.emit(r, ...u);
      });
    }
    /**
     * @private
     */
    registerAckCallback(r, u) {
      const s = this.flags.timeout;
      if (s === void 0) {
        this.acks.set(r, u);
        return;
      }
      const f = setTimeout(() => {
        a("event with ack id %d has timed out after %d ms", r, s), this.acks.delete(r), u.call(this, new Error("operation has timed out"));
      }, s);
      this.acks.set(r, (...p) => {
        clearTimeout(f), u.apply(this, [null, ...p]);
      });
    }
    /**
     * Targets a room when broadcasting.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // the “foo” event will be broadcast to all connected clients in the “room-101” room, except this socket
     *   socket.to("room-101").emit("foo", "bar");
     *
     *   // the code above is equivalent to:
     *   io.to("room-101").except(socket.id).emit("foo", "bar");
     *
     *   // with an array of rooms (a client will be notified at most once)
     *   socket.to(["room-101", "room-102"]).emit("foo", "bar");
     *
     *   // with multiple chained calls
     *   socket.to("room-101").to("room-102").emit("foo", "bar");
     * });
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    to(r) {
      return this.newBroadcastOperator().to(r);
    }
    /**
     * Targets a room when broadcasting. Similar to `to()`, but might feel clearer in some cases:
     *
     * @example
     * io.on("connection", (socket) => {
     *   // disconnect all clients in the "room-101" room, except this socket
     *   socket.in("room-101").disconnectSockets();
     * });
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    in(r) {
      return this.newBroadcastOperator().in(r);
    }
    /**
     * Excludes a room when broadcasting.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
     *   // and this socket
     *   socket.except("room-101").emit("foo", "bar");
     *
     *   // with an array of rooms
     *   socket.except(["room-101", "room-102"]).emit("foo", "bar");
     *
     *   // with multiple chained calls
     *   socket.except("room-101").except("room-102").emit("foo", "bar");
     * });
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    except(r) {
      return this.newBroadcastOperator().except(r);
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.send("hello");
     *
     *   // this is equivalent to
     *   socket.emit("message", "hello");
     * });
     *
     * @return self
     */
    send(...r) {
      return this.emit("message", ...r), this;
    }
    /**
     * Sends a `message` event. Alias of {@link send}.
     *
     * @return self
     */
    write(...r) {
      return this.emit("message", ...r), this;
    }
    /**
     * Writes a packet.
     *
     * @param {Object} packet - packet object
     * @param {Object} opts - options
     * @private
     */
    packet(r, u = {}) {
      r.nsp = this.nsp.name, u.compress = u.compress !== !1, this.client._packet(r, u);
    }
    /**
     * Joins a room.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // join a single room
     *   socket.join("room1");
     *
     *   // join multiple rooms
     *   socket.join(["room1", "room2"]);
     * });
     *
     * @param {String|Array} rooms - room or array of rooms
     * @return a Promise or nothing, depending on the adapter
     */
    join(r) {
      return a("join room %s", r), this.adapter.addAll(this.id, new Set(Array.isArray(r) ? r : [r]));
    }
    /**
     * Leaves a room.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // leave a single room
     *   socket.leave("room1");
     *
     *   // leave multiple rooms
     *   socket.leave("room1").leave("room2");
     * });
     *
     * @param {String} room
     * @return a Promise or nothing, depending on the adapter
     */
    leave(r) {
      return a("leave room %s", r), this.adapter.del(this.id, r);
    }
    /**
     * Leave all rooms.
     *
     * @private
     */
    leaveAll() {
      this.adapter.delAll(this.id);
    }
    /**
     * Called by `Namespace` upon successful
     * middleware execution (ie: authorization).
     * Socket is added to namespace array before
     * call to join, so adapters can access it.
     *
     * @private
     */
    _onconnect() {
      a("socket connected - writing packet"), this.connected = !0, this.join(this.id), this.conn.protocol === 3 ? this.packet({ type: m.PacketType.CONNECT }) : this.packet({
        type: m.PacketType.CONNECT,
        data: { sid: this.id, pid: this.pid }
      });
    }
    /**
     * Called with each packet. Called by `Client`.
     *
     * @param {Object} packet
     * @private
     */
    _onpacket(r) {
      switch (a("got packet %j", r), r.type) {
        case m.PacketType.EVENT:
          this.onevent(r);
          break;
        case m.PacketType.BINARY_EVENT:
          this.onevent(r);
          break;
        case m.PacketType.ACK:
          this.onack(r);
          break;
        case m.PacketType.BINARY_ACK:
          this.onack(r);
          break;
        case m.PacketType.DISCONNECT:
          this.ondisconnect();
          break;
      }
    }
    /**
     * Called upon event packet.
     *
     * @param {Packet} packet - packet object
     * @private
     */
    onevent(r) {
      const u = r.data || [];
      if (a("emitting event %j", u), r.id != null && (a("attaching ack callback to event"), u.push(this.ack(r.id))), this._anyListeners && this._anyListeners.length) {
        const s = this._anyListeners.slice();
        for (const f of s)
          f.apply(this, u);
      }
      this.dispatch(u);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @param {Number} id - packet id
     * @private
     */
    ack(r) {
      const u = this;
      let s = !1;
      return function() {
        if (s)
          return;
        const f = Array.prototype.slice.call(arguments);
        a("sending ack %j", f), u.packet({
          id: r,
          type: m.PacketType.ACK,
          data: f
        }), s = !0;
      };
    }
    /**
     * Called upon ack packet.
     *
     * @private
     */
    onack(r) {
      const u = this.acks.get(r.id);
      typeof u == "function" ? (a("calling ack %s with %j", r.id, r.data), u.apply(this, r.data), this.acks.delete(r.id)) : a("bad ack %s", r.id);
    }
    /**
     * Called upon client disconnect packet.
     *
     * @private
     */
    ondisconnect() {
      a("got disconnect packet"), this._onclose("client namespace disconnect");
    }
    /**
     * Handles a client error.
     *
     * @private
     */
    _onerror(r) {
      this.emitReserved("error", r);
    }
    /**
     * Called upon closing. Called by `Client`.
     *
     * @param {String} reason
     * @param description
     * @throw {Error} optional error object
     *
     * @private
     */
    _onclose(r, u) {
      if (!this.connected)
        return this;
      a("closing socket - reason %s", r), this.emitReserved("disconnecting", r, u), this.server._opts.connectionStateRecovery && n.has(r) && (a("connection state recovery is enabled for sid %s", this.id), this.adapter.persistSession({
        sid: this.id,
        pid: this.pid,
        rooms: [...this.rooms],
        data: this.data
      })), this._cleanup(), this.client._remove(this), this.connected = !1, this.emitReserved("disconnect", r, u);
    }
    /**
     * Makes the socket leave all the rooms it was part of and prevents it from joining any other room
     *
     * @private
     */
    _cleanup() {
      this.leaveAll(), this.nsp._remove(this), this.join = e;
    }
    /**
     * Produces an `error` packet.
     *
     * @param {Object} err - error object
     *
     * @private
     */
    _error(r) {
      this.packet({ type: m.PacketType.CONNECT_ERROR, data: r });
    }
    /**
     * Disconnects this client.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // disconnect this socket (the connection might be kept alive for other namespaces)
     *   socket.disconnect();
     *
     *   // disconnect this socket and close the underlying connection
     *   socket.disconnect(true);
     * })
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return self
     */
    disconnect(r = !1) {
      return this.connected ? (r ? this.client._disconnect() : (this.packet({ type: m.PacketType.DISCONNECT }), this._onclose("server namespace disconnect")), this) : this;
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.compress(false).emit("hello");
     * });
     *
     * @param {Boolean} compress - if `true`, compresses the sending data
     * @return {Socket} self
     */
    compress(r) {
      return this.flags.compress = r, this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.volatile.emit("hello"); // the client may or may not receive it
     * });
     *
     * @return {Socket} self
     */
    get volatile() {
      return this.flags.volatile = !0, this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to every sockets but the
     * sender.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // the “foo” event will be broadcast to all connected clients, except this socket
     *   socket.broadcast.emit("foo", "bar");
     * });
     *
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    get broadcast() {
      return this.newBroadcastOperator();
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // the “foo” event will be broadcast to all connected clients on this node, except this socket
     *   socket.local.emit("foo", "bar");
     * });
     *
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    get local() {
      return this.newBroadcastOperator().local;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the client:
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.timeout(5000).emit("my-event", (err) => {
     *     if (err) {
     *       // the client did not acknowledge the event in the given delay
     *     }
     *   });
     * });
     *
     * @returns self
     */
    timeout(r) {
      return this.flags.timeout = r, this;
    }
    /**
     * Dispatch incoming event to socket listeners.
     *
     * @param {Array} event - event that will get emitted
     * @private
     */
    dispatch(r) {
      a("dispatching an event %j", r), this.run(r, (u) => {
        process.nextTick(() => {
          if (u)
            return this._onerror(u);
          this.connected ? super.emitUntyped.apply(this, r) : a("ignore packet received after disconnection");
        });
      });
    }
    /**
     * Sets up socket middleware.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.use(([event, ...args], next) => {
     *     if (isUnauthorized(event)) {
     *       return next(new Error("unauthorized event"));
     *     }
     *     // do not forget to call next
     *     next();
     *   });
     *
     *   socket.on("error", (err) => {
     *     if (err && err.message === "unauthorized event") {
     *       socket.disconnect();
     *     }
     *   });
     * });
     *
     * @param {Function} fn - middleware function (event, next)
     * @return {Socket} self
     */
    use(r) {
      return this.fns.push(r), this;
    }
    /**
     * Executes the middleware for an incoming event.
     *
     * @param {Array} event - event that will get emitted
     * @param {Function} fn - last fn call in the middleware
     * @private
     */
    run(r, u) {
      if (!this.fns.length)
        return u();
      const s = this.fns.slice(0);
      function f(p) {
        s[p](r, (x) => {
          if (x)
            return u(x);
          if (!s[p + 1])
            return u();
          f(p + 1);
        });
      }
      f(0);
    }
    /**
     * Whether the socket is currently disconnected
     */
    get disconnected() {
      return !this.connected;
    }
    /**
     * A reference to the request that originated the underlying Engine.IO Socket.
     */
    get request() {
      return this.client.request;
    }
    /**
     * A reference to the underlying Client transport connection (Engine.IO Socket object).
     *
     * @example
     * io.on("connection", (socket) => {
     *   console.log(socket.conn.transport.name); // prints "polling" or "websocket"
     *
     *   socket.conn.once("upgrade", () => {
     *     console.log(socket.conn.transport.name); // prints "websocket"
     *   });
     * });
     */
    get conn() {
      return this.client.conn;
    }
    /**
     * Returns the rooms the socket is currently in.
     *
     * @example
     * io.on("connection", (socket) => {
     *   console.log(socket.rooms); // Set { <socket.id> }
     *
     *   socket.join("room1");
     *
     *   console.log(socket.rooms); // Set { <socket.id>, "room1" }
     * });
     */
    get rooms() {
      return this.adapter.socketRooms(this.id) || /* @__PURE__ */ new Set();
    }
    /**
     * Adds a listener that will be fired when any event is received. The event name is passed as the first argument to
     * the callback.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.onAny((event, ...args) => {
     *     console.log(`got event ${event}`);
     *   });
     * });
     *
     * @param listener
     */
    onAny(r) {
      return this._anyListeners = this._anyListeners || [], this._anyListeners.push(r), this;
    }
    /**
     * Adds a listener that will be fired when any event is received. The event name is passed as the first argument to
     * the callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     */
    prependAny(r) {
      return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(r), this;
    }
    /**
     * Removes the listener that will be fired when any event is received.
     *
     * @example
     * io.on("connection", (socket) => {
     *   const catchAllListener = (event, ...args) => {
     *     console.log(`got event ${event}`);
     *   }
     *
     *   socket.onAny(catchAllListener);
     *
     *   // remove a specific listener
     *   socket.offAny(catchAllListener);
     *
     *   // or remove all listeners
     *   socket.offAny();
     * });
     *
     * @param listener
     */
    offAny(r) {
      if (!this._anyListeners)
        return this;
      if (r) {
        const u = this._anyListeners;
        for (let s = 0; s < u.length; s++)
          if (r === u[s])
            return u.splice(s, 1), this;
      } else
        this._anyListeners = [];
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
      return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is sent. The event name is passed as the first argument to
     * the callback.
     *
     * Note: acknowledgements sent to the client are not included.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.onAnyOutgoing((event, ...args) => {
     *     console.log(`sent event ${event}`);
     *   });
     * });
     *
     * @param listener
     */
    onAnyOutgoing(r) {
      return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(r), this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.prependAnyOutgoing((event, ...args) => {
     *     console.log(`sent event ${event}`);
     *   });
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(r) {
      return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(r), this;
    }
    /**
     * Removes the listener that will be fired when any event is sent.
     *
     * @example
     * io.on("connection", (socket) => {
     *   const catchAllListener = (event, ...args) => {
     *     console.log(`sent event ${event}`);
     *   }
     *
     *   socket.onAnyOutgoing(catchAllListener);
     *
     *   // remove a specific listener
     *   socket.offAnyOutgoing(catchAllListener);
     *
     *   // or remove all listeners
     *   socket.offAnyOutgoing();
     * });
     *
     * @param listener - the catch-all listener
     */
    offAnyOutgoing(r) {
      if (!this._anyOutgoingListeners)
        return this;
      if (r) {
        const u = this._anyOutgoingListeners;
        for (let s = 0; s < u.length; s++)
          if (r === u[s])
            return u.splice(s, 1), this;
      } else
        this._anyOutgoingListeners = [];
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent (emit or broadcast)
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(r) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const u = this._anyOutgoingListeners.slice();
        for (const s of u)
          s.apply(this, r.data);
      }
    }
    newBroadcastOperator() {
      const r = Object.assign({}, this.flags);
      return this.flags = {}, new c.BroadcastOperator(this.adapter, /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set([this.id]), r);
    }
  }
  return jt.Socket = i, jt;
}
var dp;
function vd() {
  return dp || (dp = 1, (function(o) {
    var m = Jn && Jn.__importDefault || function(n) {
      return n && n.__esModule ? n : { default: n };
    };
    Object.defineProperty(o, "__esModule", { value: !0 }), o.Namespace = o.RESERVED_EVENTS = void 0;
    const v = md(), h = Ga(), d = m($e()), c = hd(), t = (0, d.default)("socket.io:namespace");
    o.RESERVED_EVENTS = /* @__PURE__ */ new Set(["connect", "connection", "new_namespace"]);
    class a extends h.StrictEventEmitter {
      /**
       * Namespace constructor.
       *
       * @param server instance
       * @param name
       */
      constructor(e, i) {
        super(), this.sockets = /* @__PURE__ */ new Map(), this._preConnectSockets = /* @__PURE__ */ new Map(), this._fns = [], this._ids = 0, this.server = e, this.name = i, this._initAdapter();
      }
      /**
       * Initializes the `Adapter` for this nsp.
       * Run upon changing adapter by `Server#adapter`
       * in addition to the constructor.
       *
       * @private
       */
      _initAdapter() {
        this.adapter = new (this.server.adapter())(this), Promise.resolve(this.adapter.init()).catch((e) => {
          t("error while initializing adapter: %s", e);
        });
      }
      /**
       * Registers a middleware, which is a function that gets executed for every incoming {@link Socket}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.use((socket, next) => {
       *   // ...
       *   next();
       * });
       *
       * @param fn - the middleware function
       */
      use(e) {
        return this._fns.push(e), this;
      }
      /**
       * Executes the middleware for an incoming client.
       *
       * @param socket - the socket that will get added
       * @param fn - last fn call in the middleware
       * @private
       */
      run(e, i) {
        if (!this._fns.length)
          return i();
        const l = this._fns.slice(0);
        function r(u) {
          l[u](e, (s) => {
            if (s)
              return i(s);
            if (!l[u + 1])
              return i();
            r(u + 1);
          });
        }
        r(0);
      }
      /**
       * Targets a room when emitting.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // the “foo” event will be broadcast to all connected clients in the “room-101” room
       * myNamespace.to("room-101").emit("foo", "bar");
       *
       * // with an array of rooms (a client will be notified at most once)
       * myNamespace.to(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * myNamespace.to("room-101").to("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      to(e) {
        return new c.BroadcastOperator(this.adapter).to(e);
      }
      /**
       * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // disconnect all clients in the "room-101" room
       * myNamespace.in("room-101").disconnectSockets();
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      in(e) {
        return new c.BroadcastOperator(this.adapter).in(e);
      }
      /**
       * Excludes a room when emitting.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
       * myNamespace.except("room-101").emit("foo", "bar");
       *
       * // with an array of rooms
       * myNamespace.except(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * myNamespace.except("room-101").except("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      except(e) {
        return new c.BroadcastOperator(this.adapter).except(e);
      }
      /**
       * Adds a new client.
       *
       * @return {Socket}
       * @private
       */
      async _add(e, i, l) {
        var r;
        t("adding socket to nsp %s", this.name);
        const u = await this._createSocket(e, i);
        if (this._preConnectSockets.set(u.id, u), // @ts-ignore
        !((r = this.server.opts.connectionStateRecovery) === null || r === void 0) && r.skipMiddlewares && u.recovered && e.conn.readyState === "open")
          return this._doConnect(u, l);
        this.run(u, (s) => {
          process.nextTick(() => {
            if (e.conn.readyState !== "open") {
              t("next called after client was closed - ignoring socket"), u._cleanup();
              return;
            }
            if (s)
              return t("middleware error, sending CONNECT_ERROR packet to the client"), u._cleanup(), e.conn.protocol === 3 ? u._error(s.data || s.message) : u._error({
                message: s.message,
                data: s.data
              });
            this._doConnect(u, l);
          });
        });
      }
      async _createSocket(e, i) {
        const l = i.pid, r = i.offset;
        if (
          // @ts-ignore
          this.server.opts.connectionStateRecovery && typeof l == "string" && typeof r == "string"
        ) {
          let u;
          try {
            u = await this.adapter.restoreSession(l, r);
          } catch (s) {
            t("error while restoring session: %s", s);
          }
          if (u)
            return t("connection state recovered for sid %s", u.sid), new v.Socket(this, e, i, u);
        }
        return new v.Socket(this, e, i);
      }
      _doConnect(e, i) {
        this._preConnectSockets.delete(e.id), this.sockets.set(e.id, e), e._onconnect(), i && i(e), this.emitReserved("connect", e), this.emitReserved("connection", e);
      }
      /**
       * Removes a client. Called by each `Socket`.
       *
       * @private
       */
      _remove(e) {
        this.sockets.delete(e.id) || this._preConnectSockets.delete(e.id);
      }
      /**
       * Emits to all connected clients.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.emit("hello", "world");
       *
       * // all serializable datastructures are supported (no need to call JSON.stringify)
       * myNamespace.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
       *
       * // with an acknowledgement from the clients
       * myNamespace.timeout(1000).emit("some-event", (err, responses) => {
       *   if (err) {
       *     // some clients did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per client
       *   }
       * });
       *
       * @return Always true
       */
      emit(e, ...i) {
        return new c.BroadcastOperator(this.adapter).emit(e, ...i);
      }
      /**
       * Sends a `message` event to all clients.
       *
       * This method mimics the WebSocket.send() method.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.send("hello");
       *
       * // this is equivalent to
       * myNamespace.emit("message", "hello");
       *
       * @return self
       */
      send(...e) {
        return this.emit("message", ...e), this;
      }
      /**
       * Sends a `message` event to all clients. Sends a `message` event. Alias of {@link send}.
       *
       * @return self
       */
      write(...e) {
        return this.emit("message", ...e), this;
      }
      /**
       * Sends a message to the other Socket.IO servers of the cluster.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.serverSideEmit("hello", "world");
       *
       * myNamespace.on("hello", (arg1) => {
       *   console.log(arg1); // prints "world"
       * });
       *
       * // acknowledgements (without binary content) are supported too:
       * myNamespace.serverSideEmit("ping", (err, responses) => {
       *  if (err) {
       *     // some servers did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per server (except the current one)
       *   }
       * });
       *
       * myNamespace.on("ping", (cb) => {
       *   cb("pong");
       * });
       *
       * @param ev - the event name
       * @param args - an array of arguments, which may include an acknowledgement callback at the end
       */
      serverSideEmit(e, ...i) {
        if (o.RESERVED_EVENTS.has(e))
          throw new Error(`"${String(e)}" is a reserved event name`);
        return i.unshift(e), this.adapter.serverSideEmit(i), !0;
      }
      /**
       * Sends a message and expect an acknowledgement from the other Socket.IO servers of the cluster.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * try {
       *   const responses = await myNamespace.serverSideEmitWithAck("ping");
       *   console.log(responses); // one response per server (except the current one)
       * } catch (e) {
       *   // some servers did not acknowledge the event in the given delay
       * }
       *
       * @param ev - the event name
       * @param args - an array of arguments
       *
       * @return a Promise that will be fulfilled when all servers have acknowledged the event
       */
      serverSideEmitWithAck(e, ...i) {
        return new Promise((l, r) => {
          i.push((u, s) => u ? (u.responses = s, r(u)) : l(s)), this.serverSideEmit(e, ...i);
        });
      }
      /**
       * Called when a packet is received from another Socket.IO server
       *
       * @param args - an array of arguments, which may include an acknowledgement callback at the end
       *
       * @private
       */
      _onServerSideEmit(e) {
        super.emitUntyped.apply(this, e);
      }
      /**
       * Gets a list of clients.
       *
       * @deprecated this method will be removed in the next major release, please use {@link Namespace#serverSideEmit} or
       * {@link Namespace#fetchSockets} instead.
       */
      allSockets() {
        return new c.BroadcastOperator(this.adapter).allSockets();
      }
      /**
       * Sets the compress flag.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.compress(false).emit("hello");
       *
       * @param compress - if `true`, compresses the sending data
       * @return self
       */
      compress(e) {
        return new c.BroadcastOperator(this.adapter).compress(e);
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
       * receive messages (because of network slowness or other issues, or because they’re connected through long polling
       * and is in the middle of a request-response cycle).
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.volatile.emit("hello"); // the clients may or may not receive it
       *
       * @return self
       */
      get volatile() {
        return new c.BroadcastOperator(this.adapter).volatile;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // the “foo” event will be broadcast to all connected clients on this node
       * myNamespace.local.emit("foo", "bar");
       *
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      get local() {
        return new c.BroadcastOperator(this.adapter).local;
      }
      /**
       * Adds a timeout in milliseconds for the next operation.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * myNamespace.timeout(1000).emit("some-event", (err, responses) => {
       *   if (err) {
       *     // some clients did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per client
       *   }
       * });
       *
       * @param timeout
       */
      timeout(e) {
        return new c.BroadcastOperator(this.adapter).timeout(e);
      }
      /**
       * Returns the matching socket instances.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // return all Socket instances
       * const sockets = await myNamespace.fetchSockets();
       *
       * // return all Socket instances in the "room1" room
       * const sockets = await myNamespace.in("room1").fetchSockets();
       *
       * for (const socket of sockets) {
       *   console.log(socket.id);
       *   console.log(socket.handshake);
       *   console.log(socket.rooms);
       *   console.log(socket.data);
       *
       *   socket.emit("hello");
       *   socket.join("room1");
       *   socket.leave("room2");
       *   socket.disconnect();
       * }
       */
      fetchSockets() {
        return new c.BroadcastOperator(this.adapter).fetchSockets();
      }
      /**
       * Makes the matching socket instances join the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // make all socket instances join the "room1" room
       * myNamespace.socketsJoin("room1");
       *
       * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
       * myNamespace.in("room1").socketsJoin(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsJoin(e) {
        return new c.BroadcastOperator(this.adapter).socketsJoin(e);
      }
      /**
       * Makes the matching socket instances leave the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // make all socket instances leave the "room1" room
       * myNamespace.socketsLeave("room1");
       *
       * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
       * myNamespace.in("room1").socketsLeave(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsLeave(e) {
        return new c.BroadcastOperator(this.adapter).socketsLeave(e);
      }
      /**
       * Makes the matching socket instances disconnect.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * const myNamespace = io.of("/my-namespace");
       *
       * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
       * myNamespace.disconnectSockets();
       *
       * // make all socket instances in the "room1" room disconnect and close the underlying connections
       * myNamespace.in("room1").disconnectSockets(true);
       *
       * @param close - whether to close the underlying connection
       */
      disconnectSockets(e = !1) {
        return new c.BroadcastOperator(this.adapter).disconnectSockets(e);
      }
    }
    o.Namespace = a;
  })(Jn)), Jn;
}
var Ht = {}, Ta = {}, zt = {}, rn = {}, fp;
function jm() {
  if (fp) return rn;
  fp = 1, Object.defineProperty(rn, "__esModule", { value: !0 }), rn.encode = t, rn.decode = a, rn.yeast = n;
  const o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), m = 64, v = {};
  let h = 0, d = 0, c;
  function t(e) {
    let i = "";
    do
      i = o[e % m] + i, e = Math.floor(e / m);
    while (e > 0);
    return i;
  }
  function a(e) {
    let i = 0;
    for (d = 0; d < e.length; d++)
      i = i * m + v[e.charAt(d)];
    return i;
  }
  function n() {
    const e = t(+/* @__PURE__ */ new Date());
    return e !== c ? (h = 0, c = e) : e + "." + t(h++);
  }
  for (; d < m; d++)
    v[o[d]] = d;
  return rn;
}
var hp;
function gd() {
  if (hp) return zt;
  hp = 1;
  var o;
  Object.defineProperty(zt, "__esModule", { value: !0 }), zt.SessionAwareAdapter = zt.Adapter = void 0;
  const m = ft, v = jm(), h = ld(), d = typeof ((o = h == null ? void 0 : h.Sender) === null || o === void 0 ? void 0 : o.frame) == "function";
  class c extends m.EventEmitter {
    /**
     * In-memory adapter constructor.
     *
     * @param nsp
     */
    constructor(e) {
      super(), this.nsp = e, this.rooms = /* @__PURE__ */ new Map(), this.sids = /* @__PURE__ */ new Map(), this.encoder = e.server.encoder;
    }
    /**
     * To be overridden
     */
    init() {
    }
    /**
     * To be overridden
     */
    close() {
    }
    /**
     * Returns the number of Socket.IO servers in the cluster
     *
     * @public
     */
    serverCount() {
      return Promise.resolve(1);
    }
    /**
     * Adds a socket to a list of room.
     *
     * @param {SocketId}  id      the socket id
     * @param {Set<Room>} rooms   a set of rooms
     * @public
     */
    addAll(e, i) {
      this.sids.has(e) || this.sids.set(e, /* @__PURE__ */ new Set());
      for (const l of i)
        this.sids.get(e).add(l), this.rooms.has(l) || (this.rooms.set(l, /* @__PURE__ */ new Set()), this.emit("create-room", l)), this.rooms.get(l).has(e) || (this.rooms.get(l).add(e), this.emit("join-room", l, e));
    }
    /**
     * Removes a socket from a room.
     *
     * @param {SocketId} id     the socket id
     * @param {Room}     room   the room name
     */
    del(e, i) {
      this.sids.has(e) && this.sids.get(e).delete(i), this._del(i, e);
    }
    _del(e, i) {
      const l = this.rooms.get(e);
      l != null && (l.delete(i) && this.emit("leave-room", e, i), l.size === 0 && this.rooms.delete(e) && this.emit("delete-room", e));
    }
    /**
     * Removes a socket from all rooms it's joined.
     *
     * @param {SocketId} id   the socket id
     */
    delAll(e) {
      if (this.sids.has(e)) {
        for (const i of this.sids.get(e))
          this._del(i, e);
        this.sids.delete(e);
      }
    }
    /**
     * Broadcasts a packet.
     *
     * Options:
     *  - `flags` {Object} flags for this packet
     *  - `except` {Array} sids that should be excluded
     *  - `rooms` {Array} list of rooms to broadcast to
     *
     * @param {Object} packet   the packet object
     * @param {Object} opts     the options
     * @public
     */
    broadcast(e, i) {
      const l = i.flags || {}, r = {
        preEncoded: !0,
        volatile: l.volatile,
        compress: l.compress
      };
      e.nsp = this.nsp.name;
      const u = this._encode(e, r);
      this.apply(i, (s) => {
        typeof s.notifyOutgoingListeners == "function" && s.notifyOutgoingListeners(e), s.client.writeToEngine(u, r);
      });
    }
    /**
     * Broadcasts a packet and expects multiple acknowledgements.
     *
     * Options:
     *  - `flags` {Object} flags for this packet
     *  - `except` {Array} sids that should be excluded
     *  - `rooms` {Array} list of rooms to broadcast to
     *
     * @param {Object} packet   the packet object
     * @param {Object} opts     the options
     * @param clientCountCallback - the number of clients that received the packet
     * @param ack                 - the callback that will be called for each client response
     *
     * @public
     */
    broadcastWithAck(e, i, l, r) {
      const u = i.flags || {}, s = {
        preEncoded: !0,
        volatile: u.volatile,
        compress: u.compress
      };
      e.nsp = this.nsp.name, e.id = this.nsp._ids++;
      const f = this._encode(e, s);
      let p = 0;
      this.apply(i, (x) => {
        p++, x.acks.set(e.id, r), typeof x.notifyOutgoingListeners == "function" && x.notifyOutgoingListeners(e), x.client.writeToEngine(f, s);
      }), l(p);
    }
    _encode(e, i) {
      const l = this.encoder.encode(e);
      if (d && l.length === 1 && typeof l[0] == "string") {
        const r = Buffer.from("4" + l[0]);
        i.wsPreEncodedFrame = h.Sender.frame(r, {
          readOnly: !1,
          mask: !1,
          rsv1: !1,
          opcode: 1,
          fin: !0
        });
      }
      return l;
    }
    /**
     * Gets a list of sockets by sid.
     *
     * @param {Set<Room>} rooms   the explicit set of rooms to check.
     */
    sockets(e) {
      const i = /* @__PURE__ */ new Set();
      return this.apply({ rooms: e }, (l) => {
        i.add(l.id);
      }), Promise.resolve(i);
    }
    /**
     * Gets the list of rooms a given socket has joined.
     *
     * @param {SocketId} id   the socket id
     */
    socketRooms(e) {
      return this.sids.get(e);
    }
    /**
     * Returns the matching socket instances
     *
     * @param opts - the filters to apply
     */
    fetchSockets(e) {
      const i = [];
      return this.apply(e, (l) => {
        i.push(l);
      }), Promise.resolve(i);
    }
    /**
     * Makes the matching socket instances join the specified rooms
     *
     * @param opts - the filters to apply
     * @param rooms - the rooms to join
     */
    addSockets(e, i) {
      this.apply(e, (l) => {
        l.join(i);
      });
    }
    /**
     * Makes the matching socket instances leave the specified rooms
     *
     * @param opts - the filters to apply
     * @param rooms - the rooms to leave
     */
    delSockets(e, i) {
      this.apply(e, (l) => {
        i.forEach((r) => l.leave(r));
      });
    }
    /**
     * Makes the matching socket instances disconnect
     *
     * @param opts - the filters to apply
     * @param close - whether to close the underlying connection
     */
    disconnectSockets(e, i) {
      this.apply(e, (l) => {
        l.disconnect(i);
      });
    }
    apply(e, i) {
      const l = e.rooms, r = this.computeExceptSids(e.except);
      if (l.size) {
        const u = /* @__PURE__ */ new Set();
        for (const s of l)
          if (this.rooms.has(s))
            for (const f of this.rooms.get(s)) {
              if (u.has(f) || r.has(f))
                continue;
              const p = this.nsp.sockets.get(f);
              p && (i(p), u.add(f));
            }
      } else
        for (const [u] of this.sids) {
          if (r.has(u))
            continue;
          const s = this.nsp.sockets.get(u);
          s && i(s);
        }
    }
    computeExceptSids(e) {
      const i = /* @__PURE__ */ new Set();
      if (e && e.size > 0)
        for (const l of e)
          this.rooms.has(l) && this.rooms.get(l).forEach((r) => i.add(r));
      return i;
    }
    /**
     * Send a packet to the other Socket.IO servers in the cluster
     * @param packet - an array of arguments, which may include an acknowledgement callback at the end
     */
    serverSideEmit(e) {
      console.warn("this adapter does not support the serverSideEmit() functionality");
    }
    /**
     * Save the client session in order to restore it upon reconnection.
     */
    persistSession(e) {
    }
    /**
     * Restore the session and find the packets that were missed by the client.
     * @param pid
     * @param offset
     */
    restoreSession(e, i) {
      return null;
    }
  }
  zt.Adapter = c;
  class t extends c {
    constructor(e) {
      super(e), this.nsp = e, this.sessions = /* @__PURE__ */ new Map(), this.packets = [], this.maxDisconnectionDuration = e.server.opts.connectionStateRecovery.maxDisconnectionDuration, setInterval(() => {
        const l = Date.now() - this.maxDisconnectionDuration;
        this.sessions.forEach((r, u) => {
          r.disconnectedAt < l && this.sessions.delete(u);
        });
        for (let r = this.packets.length - 1; r >= 0; r--)
          if (this.packets[r].emittedAt < l) {
            this.packets.splice(0, r + 1);
            break;
          }
      }, 60 * 1e3).unref();
    }
    persistSession(e) {
      e.disconnectedAt = Date.now(), this.sessions.set(e.pid, e);
    }
    restoreSession(e, i) {
      const l = this.sessions.get(e);
      if (!l)
        return null;
      if (l.disconnectedAt + this.maxDisconnectionDuration < Date.now())
        return this.sessions.delete(e), null;
      const u = this.packets.findIndex((f) => f.id === i);
      if (u === -1)
        return null;
      const s = [];
      for (let f = u + 1; f < this.packets.length; f++) {
        const p = this.packets[f];
        a(l.rooms, p.opts) && s.push(p.data);
      }
      return Promise.resolve(Object.assign(Object.assign({}, l), { missedPackets: s }));
    }
    broadcast(e, i) {
      var l;
      const r = e.type === 2, u = e.id === void 0, s = ((l = i.flags) === null || l === void 0 ? void 0 : l.volatile) === void 0;
      if (r && u && s) {
        const f = (0, v.yeast)();
        e.data.push(f), this.packets.push({
          id: f,
          opts: i,
          data: e.data,
          emittedAt: Date.now()
        });
      }
      super.broadcast(e, i);
    }
  }
  zt.SessionAwareAdapter = t;
  function a(n, e) {
    const i = e.rooms.size === 0 || n.some((r) => e.rooms.has(r)), l = n.every((r) => !e.except.has(r));
    return i && l;
  }
  return zt;
}
var ot = {}, mp;
function Mm() {
  if (mp) return ot;
  mp = 1;
  var o = ot && ot.__rest || function(u, s) {
    var f = {};
    for (var p in u) Object.prototype.hasOwnProperty.call(u, p) && s.indexOf(p) < 0 && (f[p] = u[p]);
    if (u != null && typeof Object.getOwnPropertySymbols == "function")
      for (var x = 0, p = Object.getOwnPropertySymbols(u); x < p.length; x++)
        s.indexOf(p[x]) < 0 && Object.prototype.propertyIsEnumerable.call(u, p[x]) && (f[p[x]] = u[p[x]]);
    return f;
  };
  Object.defineProperty(ot, "__esModule", { value: !0 }), ot.ClusterAdapterWithHeartbeat = ot.ClusterAdapter = ot.MessageType = void 0;
  const m = gd(), v = $e(), h = ht, d = (0, v.debug)("socket.io-adapter"), c = "emitter", t = 5e3;
  function a() {
    return (0, h.randomBytes)(8).toString("hex");
  }
  var n;
  (function(u) {
    u[u.INITIAL_HEARTBEAT = 1] = "INITIAL_HEARTBEAT", u[u.HEARTBEAT = 2] = "HEARTBEAT", u[u.BROADCAST = 3] = "BROADCAST", u[u.SOCKETS_JOIN = 4] = "SOCKETS_JOIN", u[u.SOCKETS_LEAVE = 5] = "SOCKETS_LEAVE", u[u.DISCONNECT_SOCKETS = 6] = "DISCONNECT_SOCKETS", u[u.FETCH_SOCKETS = 7] = "FETCH_SOCKETS", u[u.FETCH_SOCKETS_RESPONSE = 8] = "FETCH_SOCKETS_RESPONSE", u[u.SERVER_SIDE_EMIT = 9] = "SERVER_SIDE_EMIT", u[u.SERVER_SIDE_EMIT_RESPONSE = 10] = "SERVER_SIDE_EMIT_RESPONSE", u[u.BROADCAST_CLIENT_COUNT = 11] = "BROADCAST_CLIENT_COUNT", u[u.BROADCAST_ACK = 12] = "BROADCAST_ACK", u[u.ADAPTER_CLOSE = 13] = "ADAPTER_CLOSE";
  })(n || (ot.MessageType = n = {}));
  function e(u) {
    return {
      rooms: [...u.rooms],
      except: [...u.except],
      flags: u.flags
    };
  }
  function i(u) {
    return {
      rooms: new Set(u.rooms),
      except: new Set(u.except),
      flags: u.flags
    };
  }
  class l extends m.Adapter {
    constructor(s) {
      super(s), this.requests = /* @__PURE__ */ new Map(), this.ackRequests = /* @__PURE__ */ new Map(), this.uid = a();
    }
    /**
     * Called when receiving a message from another member of the cluster.
     *
     * @param message
     * @param offset
     * @protected
     */
    onMessage(s, f) {
      if (s.uid === this.uid)
        return d("[%s] ignore message from self", this.uid);
      if (s.nsp !== this.nsp.name)
        return d("[%s] ignore message from another namespace (%s)", this.uid, s.nsp);
      switch (d("[%s] new event of type %d from %s", this.uid, s.type, s.uid), s.type) {
        case n.BROADCAST: {
          if (s.data.requestId !== void 0)
            super.broadcastWithAck(s.data.packet, i(s.data.opts), (x) => {
              d("[%s] waiting for %d client acknowledgements", this.uid, x), this.publishResponse(s.uid, {
                type: n.BROADCAST_CLIENT_COUNT,
                data: {
                  requestId: s.data.requestId,
                  clientCount: x
                }
              });
            }, (x) => {
              d("[%s] received acknowledgement with value %j", this.uid, x), this.publishResponse(s.uid, {
                type: n.BROADCAST_ACK,
                data: {
                  requestId: s.data.requestId,
                  packet: x
                }
              });
            });
          else {
            const x = s.data.packet, b = i(s.data.opts);
            this.addOffsetIfNecessary(x, b, f), super.broadcast(x, b);
          }
          break;
        }
        case n.SOCKETS_JOIN:
          super.addSockets(i(s.data.opts), s.data.rooms);
          break;
        case n.SOCKETS_LEAVE:
          super.delSockets(i(s.data.opts), s.data.rooms);
          break;
        case n.DISCONNECT_SOCKETS:
          super.disconnectSockets(i(s.data.opts), s.data.close);
          break;
        case n.FETCH_SOCKETS: {
          d("[%s] calling fetchSockets with opts %j", this.uid, s.data.opts), super.fetchSockets(i(s.data.opts)).then((p) => {
            this.publishResponse(s.uid, {
              type: n.FETCH_SOCKETS_RESPONSE,
              data: {
                requestId: s.data.requestId,
                sockets: p.map((x) => {
                  const b = x.handshake, { sessionStore: C } = b, S = o(b, ["sessionStore"]);
                  return {
                    id: x.id,
                    handshake: S,
                    rooms: [...x.rooms],
                    data: x.data
                  };
                })
              }
            });
          });
          break;
        }
        case n.SERVER_SIDE_EMIT: {
          const p = s.data.packet;
          if (!(s.data.requestId !== void 0)) {
            this.nsp._onServerSideEmit(p);
            return;
          }
          let b = !1;
          const C = (S) => {
            b || (b = !0, d("[%s] calling acknowledgement with %j", this.uid, S), this.publishResponse(s.uid, {
              type: n.SERVER_SIDE_EMIT_RESPONSE,
              data: {
                requestId: s.data.requestId,
                packet: S
              }
            }));
          };
          this.nsp._onServerSideEmit([...p, C]);
          break;
        }
        // @ts-ignore
        case n.BROADCAST_CLIENT_COUNT:
        // @ts-ignore
        case n.BROADCAST_ACK:
        // @ts-ignore
        case n.FETCH_SOCKETS_RESPONSE:
        // @ts-ignore
        case n.SERVER_SIDE_EMIT_RESPONSE:
          this.onResponse(s);
          break;
        default:
          d("[%s] unknown message type: %s", this.uid, s.type);
      }
    }
    /**
     * Called when receiving a response from another member of the cluster.
     *
     * @param response
     * @protected
     */
    onResponse(s) {
      var f, p;
      const x = s.data.requestId;
      switch (d("[%s] received response %s to request %s", this.uid, s.type, x), s.type) {
        case n.BROADCAST_CLIENT_COUNT: {
          (f = this.ackRequests.get(x)) === null || f === void 0 || f.clientCountCallback(s.data.clientCount);
          break;
        }
        case n.BROADCAST_ACK: {
          (p = this.ackRequests.get(x)) === null || p === void 0 || p.ack(s.data.packet);
          break;
        }
        case n.FETCH_SOCKETS_RESPONSE: {
          const b = this.requests.get(x);
          if (!b)
            return;
          b.current++, s.data.sockets.forEach((C) => b.responses.push(C)), b.current === b.expected && (clearTimeout(b.timeout), b.resolve(b.responses), this.requests.delete(x));
          break;
        }
        case n.SERVER_SIDE_EMIT_RESPONSE: {
          const b = this.requests.get(x);
          if (!b)
            return;
          b.current++, b.responses.push(s.data.packet), b.current === b.expected && (clearTimeout(b.timeout), b.resolve(null, b.responses), this.requests.delete(x));
          break;
        }
        default:
          d("[%s] unknown response type: %s", this.uid, s.type);
      }
    }
    async broadcast(s, f) {
      var p;
      if (!((p = f.flags) === null || p === void 0 ? void 0 : p.local))
        try {
          const b = await this.publishAndReturnOffset({
            type: n.BROADCAST,
            data: {
              packet: s,
              opts: e(f)
            }
          });
          this.addOffsetIfNecessary(s, f, b);
        } catch (b) {
          return d("[%s] error while broadcasting message: %s", this.uid, b.message);
        }
      super.broadcast(s, f);
    }
    /**
     * Adds an offset at the end of the data array in order to allow the client to receive any missed packets when it
     * reconnects after a temporary disconnection.
     *
     * @param packet
     * @param opts
     * @param offset
     * @private
     */
    addOffsetIfNecessary(s, f, p) {
      var x;
      if (!this.nsp.server.opts.connectionStateRecovery)
        return;
      const b = s.type === 2, C = s.id === void 0, S = ((x = f.flags) === null || x === void 0 ? void 0 : x.volatile) === void 0;
      b && C && S && s.data.push(p);
    }
    broadcastWithAck(s, f, p, x) {
      var b;
      if (!((b = f == null ? void 0 : f.flags) === null || b === void 0 ? void 0 : b.local)) {
        const S = a();
        this.ackRequests.set(S, {
          clientCountCallback: p,
          ack: x
        }), this.publish({
          type: n.BROADCAST,
          data: {
            packet: s,
            requestId: S,
            opts: e(f)
          }
        }), setTimeout(() => {
          this.ackRequests.delete(S);
        }, f.flags.timeout);
      }
      super.broadcastWithAck(s, f, p, x);
    }
    async addSockets(s, f) {
      var p;
      if (!((p = s.flags) === null || p === void 0 ? void 0 : p.local))
        try {
          await this.publishAndReturnOffset({
            type: n.SOCKETS_JOIN,
            data: {
              opts: e(s),
              rooms: f
            }
          });
        } catch (b) {
          d("[%s] error while publishing message: %s", this.uid, b.message);
        }
      super.addSockets(s, f);
    }
    async delSockets(s, f) {
      var p;
      if (!((p = s.flags) === null || p === void 0 ? void 0 : p.local))
        try {
          await this.publishAndReturnOffset({
            type: n.SOCKETS_LEAVE,
            data: {
              opts: e(s),
              rooms: f
            }
          });
        } catch (b) {
          d("[%s] error while publishing message: %s", this.uid, b.message);
        }
      super.delSockets(s, f);
    }
    async disconnectSockets(s, f) {
      var p;
      if (!((p = s.flags) === null || p === void 0 ? void 0 : p.local))
        try {
          await this.publishAndReturnOffset({
            type: n.DISCONNECT_SOCKETS,
            data: {
              opts: e(s),
              close: f
            }
          });
        } catch (b) {
          d("[%s] error while publishing message: %s", this.uid, b.message);
        }
      super.disconnectSockets(s, f);
    }
    async fetchSockets(s) {
      var f;
      const [p, x] = await Promise.all([
        super.fetchSockets(s),
        this.serverCount()
      ]), b = x - 1;
      if (!((f = s.flags) === null || f === void 0) && f.local || b <= 0)
        return p;
      const C = a();
      return new Promise((S, T) => {
        const y = setTimeout(() => {
          const w = this.requests.get(C);
          w && (T(new Error(`timeout reached: only ${w.current} responses received out of ${w.expected}`)), this.requests.delete(C));
        }, s.flags.timeout || t), E = {
          type: n.FETCH_SOCKETS,
          resolve: S,
          timeout: y,
          current: 0,
          expected: b,
          responses: p
        };
        this.requests.set(C, E), this.publish({
          type: n.FETCH_SOCKETS,
          data: {
            opts: e(s),
            requestId: C
          }
        });
      });
    }
    async serverSideEmit(s) {
      if (!(typeof s[s.length - 1] == "function"))
        return this.publish({
          type: n.SERVER_SIDE_EMIT,
          data: {
            packet: s
          }
        });
      const p = s.pop(), x = await this.serverCount() - 1;
      if (d('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, x), x <= 0)
        return p(null, []);
      const b = a(), C = setTimeout(() => {
        const T = this.requests.get(b);
        T && (p(new Error(`timeout reached: only ${T.current} responses received out of ${T.expected}`), T.responses), this.requests.delete(b));
      }, t), S = {
        type: n.SERVER_SIDE_EMIT,
        resolve: p,
        timeout: C,
        current: 0,
        expected: x,
        responses: []
      };
      this.requests.set(b, S), this.publish({
        type: n.SERVER_SIDE_EMIT,
        data: {
          requestId: b,
          // the presence of this attribute defines whether an acknowledgement is needed
          packet: s
        }
      });
    }
    publish(s) {
      d("[%s] sending message %s", this.uid, s.type), this.publishAndReturnOffset(s).catch((f) => {
        d("[%s] error while publishing message: %s", this.uid, f);
      });
    }
    publishAndReturnOffset(s) {
      return s.uid = this.uid, s.nsp = this.nsp.name, this.doPublish(s);
    }
    publishResponse(s, f) {
      f.uid = this.uid, f.nsp = this.nsp.name, d("[%s] sending response %s to %s", this.uid, f.type, s), this.doPublishResponse(s, f).catch((p) => {
        d("[%s] error while publishing response: %s", this.uid, p);
      });
    }
  }
  ot.ClusterAdapter = l;
  class r extends l {
    constructor(s, f) {
      super(s), this.nodesMap = /* @__PURE__ */ new Map(), this.customRequests = /* @__PURE__ */ new Map(), this._opts = Object.assign({
        heartbeatInterval: 5e3,
        heartbeatTimeout: 1e4
      }, f), this.cleanupTimer = setInterval(() => {
        const p = Date.now();
        this.nodesMap.forEach((x, b) => {
          p - x > this._opts.heartbeatTimeout && (d("[%s] node %s seems down", this.uid, b), this.removeNode(b));
        });
      }, 1e3);
    }
    init() {
      this.publish({
        type: n.INITIAL_HEARTBEAT
      });
    }
    scheduleHeartbeat() {
      this.heartbeatTimer ? this.heartbeatTimer.refresh() : this.heartbeatTimer = setTimeout(() => {
        this.publish({
          type: n.HEARTBEAT
        });
      }, this._opts.heartbeatInterval);
    }
    close() {
      this.publish({
        type: n.ADAPTER_CLOSE
      }), clearTimeout(this.heartbeatTimer), this.cleanupTimer && clearInterval(this.cleanupTimer);
    }
    onMessage(s, f) {
      if (s.uid === this.uid)
        return d("[%s] ignore message from self", this.uid);
      switch (s.uid && s.uid !== c && this.nodesMap.set(s.uid, Date.now()), s.type) {
        case n.INITIAL_HEARTBEAT:
          this.publish({
            type: n.HEARTBEAT
          });
          break;
        case n.HEARTBEAT:
          break;
        case n.ADAPTER_CLOSE:
          this.removeNode(s.uid);
          break;
        default:
          super.onMessage(s, f);
      }
    }
    serverCount() {
      return Promise.resolve(1 + this.nodesMap.size);
    }
    publish(s) {
      return this.scheduleHeartbeat(), super.publish(s);
    }
    async serverSideEmit(s) {
      if (!(typeof s[s.length - 1] == "function"))
        return this.publish({
          type: n.SERVER_SIDE_EMIT,
          data: {
            packet: s
          }
        });
      const p = s.pop(), x = this.nodesMap.size;
      if (d('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, x), x <= 0)
        return p(null, []);
      const b = a(), C = setTimeout(() => {
        const T = this.customRequests.get(b);
        T && (p(new Error(`timeout reached: missing ${T.missingUids.size} responses`), T.responses), this.customRequests.delete(b));
      }, t), S = {
        type: n.SERVER_SIDE_EMIT,
        resolve: p,
        timeout: C,
        missingUids: /* @__PURE__ */ new Set([...this.nodesMap.keys()]),
        responses: []
      };
      this.customRequests.set(b, S), this.publish({
        type: n.SERVER_SIDE_EMIT,
        data: {
          requestId: b,
          // the presence of this attribute defines whether an acknowledgement is needed
          packet: s
        }
      });
    }
    async fetchSockets(s) {
      var f;
      const [p, x] = await Promise.all([
        super.fetchSockets({
          rooms: s.rooms,
          except: s.except,
          flags: {
            local: !0
          }
        }),
        this.serverCount()
      ]), b = x - 1;
      if (!((f = s.flags) === null || f === void 0) && f.local || b <= 0)
        return p;
      const C = a();
      return new Promise((S, T) => {
        const y = setTimeout(() => {
          const w = this.customRequests.get(C);
          w && (T(new Error(`timeout reached: missing ${w.missingUids.size} responses`)), this.customRequests.delete(C));
        }, s.flags.timeout || t), E = {
          type: n.FETCH_SOCKETS,
          resolve: S,
          timeout: y,
          missingUids: /* @__PURE__ */ new Set([...this.nodesMap.keys()]),
          responses: p
        };
        this.customRequests.set(C, E), this.publish({
          type: n.FETCH_SOCKETS,
          data: {
            opts: e(s),
            requestId: C
          }
        });
      });
    }
    onResponse(s) {
      const f = s.data.requestId;
      switch (d("[%s] received response %s to request %s", this.uid, s.type, f), s.type) {
        case n.FETCH_SOCKETS_RESPONSE: {
          const p = this.customRequests.get(f);
          if (!p)
            return;
          s.data.sockets.forEach((x) => p.responses.push(x)), p.missingUids.delete(s.uid), p.missingUids.size === 0 && (clearTimeout(p.timeout), p.resolve(p.responses), this.customRequests.delete(f));
          break;
        }
        case n.SERVER_SIDE_EMIT_RESPONSE: {
          const p = this.customRequests.get(f);
          if (!p)
            return;
          p.responses.push(s.data.packet), p.missingUids.delete(s.uid), p.missingUids.size === 0 && (clearTimeout(p.timeout), p.resolve(null, p.responses), this.customRequests.delete(f));
          break;
        }
        default:
          super.onResponse(s);
      }
    }
    removeNode(s) {
      this.customRequests.forEach((f, p) => {
        f.missingUids.delete(s), f.missingUids.size === 0 && (clearTimeout(f.timeout), f.type === n.FETCH_SOCKETS ? f.resolve(f.responses) : f.type === n.SERVER_SIDE_EMIT && f.resolve(null, f.responses), this.customRequests.delete(p));
      }), this.nodesMap.delete(s);
    }
  }
  return ot.ClusterAdapterWithHeartbeat = r, ot;
}
var vp;
function Wa() {
  return vp || (vp = 1, (function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.MessageType = o.ClusterAdapterWithHeartbeat = o.ClusterAdapter = o.SessionAwareAdapter = o.Adapter = void 0;
    var m = gd();
    Object.defineProperty(o, "Adapter", { enumerable: !0, get: function() {
      return m.Adapter;
    } }), Object.defineProperty(o, "SessionAwareAdapter", { enumerable: !0, get: function() {
      return m.SessionAwareAdapter;
    } });
    var v = Mm();
    Object.defineProperty(o, "ClusterAdapter", { enumerable: !0, get: function() {
      return v.ClusterAdapter;
    } }), Object.defineProperty(o, "ClusterAdapterWithHeartbeat", { enumerable: !0, get: function() {
      return v.ClusterAdapterWithHeartbeat;
    } }), Object.defineProperty(o, "MessageType", { enumerable: !0, get: function() {
      return v.MessageType;
    } });
  })(Ta)), Ta;
}
var gp;
function Hm() {
  if (gp) return Ht;
  gp = 1;
  var o = Ht && Ht.__importDefault || function(a) {
    return a && a.__esModule ? a : { default: a };
  };
  Object.defineProperty(Ht, "__esModule", { value: !0 }), Ht.ParentNamespace = void 0;
  const m = vd(), v = Wa(), d = (0, o($e()).default)("socket.io:parent-namespace");
  class c extends m.Namespace {
    constructor(n) {
      super(n, "/_" + c.count++), this.children = /* @__PURE__ */ new Set();
    }
    /**
     * @private
     */
    _initAdapter() {
      this.adapter = new t(this);
    }
    emit(n, ...e) {
      return this.children.forEach((i) => {
        i.emit(n, ...e);
      }), !0;
    }
    createChild(n) {
      d("creating child namespace %s", n);
      const e = new m.Namespace(this.server, n);
      if (this._fns.forEach((i) => e.use(i)), this.listeners("connect").forEach((i) => e.on("connect", i)), this.listeners("connection").forEach((i) => e.on("connection", i)), this.children.add(e), this.server._opts.cleanupEmptyChildNamespaces) {
        const i = e._remove;
        e._remove = (l) => {
          i.call(e, l), e.sockets.size === 0 && (d("closing child namespace %s", n), e.adapter.close(), this.server._nsps.delete(e.name), this.children.delete(e));
        };
      }
      return this.server._nsps.set(n, e), this.server.sockets.emitReserved("new_namespace", e), e;
    }
    fetchSockets() {
      throw new Error("fetchSockets() is not supported on parent namespaces");
    }
  }
  Ht.ParentNamespace = c, c.count = 0;
  class t extends v.Adapter {
    broadcast(n, e) {
      this.nsp.children.forEach((i) => {
        i.adapter.broadcast(n, e);
      });
    }
  }
  return Ht;
}
var Tt = {}, xp;
function zm() {
  if (xp) return Tt;
  xp = 1;
  var o = Tt && Tt.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.patchAdapter = e, Tt.restoreAdapter = l, Tt.serveFile = u;
  const m = Wa(), v = lt, d = (0, o($e()).default)("socket.io:adapter-uws"), c = "", { addAll: t, del: a, broadcast: n } = m.Adapter.prototype;
  function e(s) {
    m.Adapter.prototype.addAll = function(f, p) {
      const x = !this.sids.has(f);
      t.call(this, f, p);
      const b = this.nsp.sockets.get(f) || this.nsp._preConnectSockets.get(f);
      if (b) {
        if (b.conn.transport.name === "websocket") {
          i(this.nsp.name, b, x, p);
          return;
        }
        x && b.conn.on("upgrade", () => {
          const C = this.sids.get(f);
          C && i(this.nsp.name, b, x, C);
        });
      }
    }, m.Adapter.prototype.del = function(f, p) {
      a.call(this, f, p);
      const x = this.nsp.sockets.get(f) || this.nsp._preConnectSockets.get(f);
      if (x && x.conn.transport.name === "websocket") {
        const b = x.conn.id, C = x.conn.transport.socket, S = `${this.nsp.name}${c}${p}`;
        d("unsubscribe connection %s from topic %s", b, S), C.unsubscribe(S);
      }
    }, m.Adapter.prototype.broadcast = function(f, p) {
      if (!(p.rooms.size <= 1 && p.except.size === 0)) {
        n.call(this, f, p);
        return;
      }
      const b = p.flags || {}, C = {
        preEncoded: !0,
        volatile: b.volatile,
        compress: b.compress
      };
      f.nsp = this.nsp.name;
      const S = this.encoder.encode(f), T = p.rooms.size === 0 ? this.nsp.name : `${this.nsp.name}${c}${p.rooms.keys().next().value}`;
      d("fast publish to %s", T), S.forEach((y) => {
        const E = typeof y != "string";
        s.publish(T, E ? y : "4" + y, E);
      }), this.apply(p, (y) => {
        y.conn.transport.name !== "websocket" && y.client.writeToEngine(S, C);
      });
    };
  }
  function i(s, f, p, x) {
    const b = f.conn.id, C = f.conn.transport.socket;
    p && (d("subscribe connection %s to topic %s", b, s), C.subscribe(s)), x.forEach((S) => {
      const T = `${s}${c}${S}`;
      d("subscribe connection %s to topic %s", b, T), C.subscribe(T);
    });
  }
  function l() {
    m.Adapter.prototype.addAll = t, m.Adapter.prototype.del = a, m.Adapter.prototype.broadcast = n;
  }
  const r = (s) => {
    const { buffer: f, byteOffset: p, byteLength: x } = s;
    return f.slice(p, p + x);
  };
  function u(s, f) {
    const { size: p } = (0, v.statSync)(f), x = (0, v.createReadStream)(f), b = () => !x.destroyed && x.destroy(), C = (T) => {
      throw b(), T;
    }, S = (T) => {
      const y = r(T);
      s.cork(() => {
        const E = s.getWriteOffset(), [w, _] = s.tryEnd(y, p);
        !_ && !w && (x.pause(), s.onWritable((D) => {
          const [O, I] = s.tryEnd(y.slice(D - E), p);
          return !I && O && x.resume(), O;
        }));
      });
    };
    s.onAborted(b), x.on("data", S).on("error", C).on("end", b);
  }
  return Tt;
}
const Gm = "4.8.3", Wm = {
  version: Gm
};
var Ct = ti.exports, yp;
function Vm() {
  return yp || (yp = 1, (function(o, m) {
    var v = Ct && Ct.__createBinding || (Object.create ? (function(q, R, N, F) {
      F === void 0 && (F = N);
      var U = Object.getOwnPropertyDescriptor(R, N);
      (!U || ("get" in U ? !R.__esModule : U.writable || U.configurable)) && (U = { enumerable: !0, get: function() {
        return R[N];
      } }), Object.defineProperty(q, F, U);
    }) : (function(q, R, N, F) {
      F === void 0 && (F = N), q[F] = R[N];
    })), h = Ct && Ct.__setModuleDefault || (Object.create ? (function(q, R) {
      Object.defineProperty(q, "default", { enumerable: !0, value: R });
    }) : function(q, R) {
      q.default = R;
    }), d = Ct && Ct.__importStar || function(q) {
      if (q && q.__esModule) return q;
      var R = {};
      if (q != null) for (var N in q) N !== "default" && Object.prototype.hasOwnProperty.call(q, N) && v(R, q, N);
      return h(R, q), R;
    }, c = Ct && Ct.__importDefault || function(q) {
      return q && q.__esModule ? q : { default: q };
    };
    Object.defineProperty(m, "__esModule", { value: !0 }), m.Namespace = m.Socket = m.Server = void 0;
    const t = c(ii), a = lt, n = on, e = Ma(), i = ut, l = De, r = Lm(), u = Bm(), s = ft, f = vd();
    Object.defineProperty(m, "Namespace", { enumerable: !0, get: function() {
      return f.Namespace;
    } });
    const p = Hm(), x = Wa(), b = d(Ji()), C = c($e()), S = md();
    Object.defineProperty(m, "Socket", { enumerable: !0, get: function() {
      return S.Socket;
    } });
    const T = Ga(), y = zm(), E = c(ud()), w = (0, C.default)("socket.io:server"), _ = Wm.version, D = /\.map/;
    class O extends T.StrictEventEmitter {
      constructor(R, N = {}) {
        super(), this._nsps = /* @__PURE__ */ new Map(), this.parentNsps = /* @__PURE__ */ new Map(), this.parentNamespacesFromRegExp = /* @__PURE__ */ new Map(), typeof R == "object" && R instanceof Object && !R.listen && (N = R, R = void 0), this.path(N.path || "/socket.io"), this.connectTimeout(N.connectTimeout || 45e3), this.serveClient(N.serveClient !== !1), this._parser = N.parser || b, this.encoder = new this._parser.Encoder(), this.opts = N, N.connectionStateRecovery ? (N.connectionStateRecovery = Object.assign({
          maxDisconnectionDuration: 120 * 1e3,
          skipMiddlewares: !0
        }, N.connectionStateRecovery), this.adapter(N.adapter || x.SessionAwareAdapter)) : this.adapter(N.adapter || x.Adapter), N.cleanupEmptyChildNamespaces = !!N.cleanupEmptyChildNamespaces, this.sockets = this.of("/"), (R || typeof R == "number") && this.attach(R), this.opts.cors && (this._corsMiddleware = (0, E.default)(this.opts.cors));
      }
      get _opts() {
        return this.opts;
      }
      serveClient(R) {
        return arguments.length ? (this._serveClient = R, this) : this._serveClient;
      }
      /**
       * Executes the middleware for an incoming namespace not already created on the server.
       *
       * @param name - name of incoming namespace
       * @param auth - the auth parameters
       * @param fn - callback
       *
       * @private
       */
      _checkNamespace(R, N, F) {
        if (this.parentNsps.size === 0)
          return F(!1);
        const U = this.parentNsps.keys(), z = () => {
          const W = U.next();
          if (W.done)
            return F(!1);
          W.value(R, N, (ie, ae) => {
            if (ie || !ae)
              return z();
            if (this._nsps.has(R))
              return w("dynamic namespace %s already exists", R), F(this._nsps.get(R));
            const oe = this.parentNsps.get(W.value).createChild(R);
            w("dynamic namespace %s was created", R), F(oe);
          });
        };
        z();
      }
      path(R) {
        if (!arguments.length)
          return this._path;
        this._path = R.replace(/\/$/, "");
        const N = this._path.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        return this.clientPathRegex = new RegExp("^" + N + "/socket\\.io(\\.msgpack|\\.esm)?(\\.min)?\\.js(\\.map)?(?:\\?|$)"), this;
      }
      connectTimeout(R) {
        return R === void 0 ? this._connectTimeout : (this._connectTimeout = R, this);
      }
      adapter(R) {
        if (!arguments.length)
          return this._adapter;
        this._adapter = R;
        for (const N of this._nsps.values())
          N._initAdapter();
        return this;
      }
      /**
       * Attaches socket.io to a server or port.
       *
       * @param srv - server or port
       * @param opts - options passed to engine.io
       * @return self
       */
      listen(R, N = {}) {
        return this.attach(R, N);
      }
      /**
       * Attaches socket.io to a server or port.
       *
       * @param srv - server or port
       * @param opts - options passed to engine.io
       * @return self
       */
      attach(R, N = {}) {
        if (typeof R == "function") {
          const F = "You are trying to attach socket.io to an express request handler function. Please pass a http.Server instance.";
          throw new Error(F);
        }
        if (Number(R) == R && (R = Number(R)), typeof R == "number") {
          w("creating http server and binding to %d", R);
          const F = R;
          R = t.default.createServer((U, z) => {
            z.writeHead(404), z.end();
          }), R.listen(F);
        }
        return Object.assign(N, this.opts), N.path = N.path || this._path, this.initEngine(R, N), this;
      }
      /**
       * Attaches socket.io to a uWebSockets.js app.
       * @param app
       * @param opts
       */
      attachApp(R, N = {}) {
        Object.assign(N, this.opts), N.path = N.path || this._path, w("creating uWebSockets.js-based engine with opts %j", N);
        const F = new r.uServer(N);
        F.attach(R, N), this.bind(F), this._serveClient && R.get(`${this._path}/*`, (U, z) => {
          if (!this.clientPathRegex.test(z.getUrl())) {
            z.setYield(!0);
            return;
          }
          const W = z.getUrl().replace(this._path, "").replace(/\?.*$/, "").replace(/^\//, ""), ie = D.test(W), ae = ie ? "map" : "source", oe = '"' + _ + '"', ye = "W/" + oe, _e = z.getHeader("if-none-match");
          if (_e && (oe === _e || ye === _e)) {
            w("serve client %s 304", ae), U.writeStatus("304 Not Modified"), U.end();
            return;
          }
          w("serve client %s", ae), U.writeHeader("cache-control", "public, max-age=0"), U.writeHeader("content-type", "application/" + (ie ? "json" : "javascript") + "; charset=utf-8"), U.writeHeader("etag", oe);
          const Z = l.join(__dirname, "../client-dist/", W);
          (0, y.serveFile)(U, Z);
        }), (0, y.patchAdapter)(R);
      }
      /**
       * Initialize engine
       *
       * @param srv - the server to attach to
       * @param opts - options passed to engine.io
       * @private
       */
      initEngine(R, N) {
        w("creating engine.io instance with opts %j", N), this.eio = (0, r.attach)(R, N), this._serveClient && this.attachServe(R), this.httpServer = R, this.bind(this.eio);
      }
      /**
       * Attaches the static file serving.
       *
       * @param srv http server
       * @private
       */
      attachServe(R) {
        w("attaching client serving req handler");
        const N = R.listeners("request").slice(0);
        R.removeAllListeners("request"), R.on("request", (F, U) => {
          if (this.clientPathRegex.test(F.url))
            this._corsMiddleware ? this._corsMiddleware(F, U, () => {
              this.serve(F, U);
            }) : this.serve(F, U);
          else
            for (let z = 0; z < N.length; z++)
              N[z].call(R, F, U);
        });
      }
      /**
       * Handles a request serving of client source and map
       *
       * @param req
       * @param res
       * @private
       */
      serve(R, N) {
        const F = R.url.replace(this._path, "").replace(/\?.*$/, ""), U = D.test(F), z = U ? "map" : "source", W = '"' + _ + '"', ie = "W/" + W, ae = R.headers["if-none-match"];
        if (ae && (W === ae || ie === ae)) {
          w("serve client %s 304", z), N.writeHead(304), N.end();
          return;
        }
        w("serve client %s", z), N.setHeader("Cache-Control", "public, max-age=0"), N.setHeader("Content-Type", "application/" + (U ? "json" : "javascript") + "; charset=utf-8"), N.setHeader("ETag", W), O.sendFile(F, R, N);
      }
      /**
       * @param filename
       * @param req
       * @param res
       * @private
       */
      static sendFile(R, N, F) {
        const U = (0, a.createReadStream)(l.join(__dirname, "../client-dist/", R)), z = e(N).encodings(["br", "gzip", "deflate"]), W = (ie) => {
          ie && F.end();
        };
        switch (z) {
          case "br":
            F.writeHead(200, { "content-encoding": "br" }), (0, i.pipeline)(U, (0, n.createBrotliCompress)(), F, W);
            break;
          case "gzip":
            F.writeHead(200, { "content-encoding": "gzip" }), (0, i.pipeline)(U, (0, n.createGzip)(), F, W);
            break;
          case "deflate":
            F.writeHead(200, { "content-encoding": "deflate" }), (0, i.pipeline)(U, (0, n.createDeflate)(), F, W);
            break;
          default:
            F.writeHead(200), (0, i.pipeline)(U, F, W);
        }
      }
      /**
       * Binds socket.io to an engine.io instance.
       *
       * @param engine engine.io (or compatible) server
       * @return self
       */
      bind(R) {
        return this.engine = R, this.engine.on("connection", this.onconnection.bind(this)), this;
      }
      /**
       * Called with each incoming transport connection.
       *
       * @param {engine.Socket} conn
       * @return self
       * @private
       */
      onconnection(R) {
        w("incoming connection with id %s", R.id);
        const N = new u.Client(this, R);
        return R.protocol === 3 && N.connect("/"), this;
      }
      /**
       * Looks up a namespace.
       *
       * @example
       * // with a simple string
       * const myNamespace = io.of("/my-namespace");
       *
       * // with a regex
       * const dynamicNsp = io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {
       *   const namespace = socket.nsp; // newNamespace.name === "/dynamic-101"
       *
       *   // broadcast to all clients in the given sub-namespace
       *   namespace.emit("hello");
       * });
       *
       * @param name - nsp name
       * @param fn optional, nsp `connection` ev handler
       */
      of(R, N) {
        if (typeof R == "function" || R instanceof RegExp) {
          const U = new p.ParentNamespace(this);
          return w("initializing parent namespace %s", U.name), typeof R == "function" ? this.parentNsps.set(R, U) : (this.parentNsps.set((z, W, ie) => ie(null, R.test(z)), U), this.parentNamespacesFromRegExp.set(R, U)), N && U.on("connect", N), U;
        }
        String(R)[0] !== "/" && (R = "/" + R);
        let F = this._nsps.get(R);
        if (!F) {
          for (const [U, z] of this.parentNamespacesFromRegExp)
            if (U.test(R))
              return w("attaching namespace %s to parent namespace %s", R, U), z.createChild(R);
          w("initializing namespace %s", R), F = new f.Namespace(this, R), this._nsps.set(R, F), R !== "/" && this.sockets.emitReserved("new_namespace", F);
        }
        return N && F.on("connect", N), F;
      }
      /**
       * Closes server connection
       *
       * @param [fn] optional, called as `fn([err])` on error OR all conns closed
       */
      async close(R) {
        if (await Promise.allSettled([...this._nsps.values()].map(async (N) => {
          N.sockets.forEach((F) => {
            F._onclose("server shutting down");
          }), await N.adapter.close();
        })), this.engine.close(), (0, y.restoreAdapter)(), this.httpServer)
          return new Promise((N) => {
            this.httpServer.close((F) => {
              R && R(F), F && w("server was not running"), N();
            });
          });
        R && R();
      }
      /**
       * Registers a middleware, which is a function that gets executed for every incoming {@link Socket}.
       *
       * @example
       * io.use((socket, next) => {
       *   // ...
       *   next();
       * });
       *
       * @param fn - the middleware function
       */
      use(R) {
        return this.sockets.use(R), this;
      }
      /**
       * Targets a room when emitting.
       *
       * @example
       * // the “foo” event will be broadcast to all connected clients in the “room-101” room
       * io.to("room-101").emit("foo", "bar");
       *
       * // with an array of rooms (a client will be notified at most once)
       * io.to(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * io.to("room-101").to("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      to(R) {
        return this.sockets.to(R);
      }
      /**
       * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
       *
       * @example
       * // disconnect all clients in the "room-101" room
       * io.in("room-101").disconnectSockets();
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      in(R) {
        return this.sockets.in(R);
      }
      /**
       * Excludes a room when emitting.
       *
       * @example
       * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
       * io.except("room-101").emit("foo", "bar");
       *
       * // with an array of rooms
       * io.except(["room-101", "room-102"]).emit("foo", "bar");
       *
       * // with multiple chained calls
       * io.except("room-101").except("room-102").emit("foo", "bar");
       *
       * @param room - a room, or an array of rooms
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      except(R) {
        return this.sockets.except(R);
      }
      /**
       * Sends a `message` event to all clients.
       *
       * This method mimics the WebSocket.send() method.
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
       *
       * @example
       * io.send("hello");
       *
       * // this is equivalent to
       * io.emit("message", "hello");
       *
       * @return self
       */
      send(...R) {
        return this.sockets.emit("message", ...R), this;
      }
      /**
       * Sends a `message` event to all clients. Alias of {@link send}.
       *
       * @return self
       */
      write(...R) {
        return this.sockets.emit("message", ...R), this;
      }
      /**
       * Sends a message to the other Socket.IO servers of the cluster.
       *
       * @example
       * io.serverSideEmit("hello", "world");
       *
       * io.on("hello", (arg1) => {
       *   console.log(arg1); // prints "world"
       * });
       *
       * // acknowledgements (without binary content) are supported too:
       * io.serverSideEmit("ping", (err, responses) => {
       *  if (err) {
       *     // some servers did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per server (except the current one)
       *   }
       * });
       *
       * io.on("ping", (cb) => {
       *   cb("pong");
       * });
       *
       * @param ev - the event name
       * @param args - an array of arguments, which may include an acknowledgement callback at the end
       */
      serverSideEmit(R, ...N) {
        return this.sockets.serverSideEmit(R, ...N);
      }
      /**
       * Sends a message and expect an acknowledgement from the other Socket.IO servers of the cluster.
       *
       * @example
       * try {
       *   const responses = await io.serverSideEmitWithAck("ping");
       *   console.log(responses); // one response per server (except the current one)
       * } catch (e) {
       *   // some servers did not acknowledge the event in the given delay
       * }
       *
       * @param ev - the event name
       * @param args - an array of arguments
       *
       * @return a Promise that will be fulfilled when all servers have acknowledged the event
       */
      serverSideEmitWithAck(R, ...N) {
        return this.sockets.serverSideEmitWithAck(R, ...N);
      }
      /**
       * Gets a list of socket ids.
       *
       * @deprecated this method will be removed in the next major release, please use {@link Server#serverSideEmit} or
       * {@link Server#fetchSockets} instead.
       */
      allSockets() {
        return this.sockets.allSockets();
      }
      /**
       * Sets the compress flag.
       *
       * @example
       * io.compress(false).emit("hello");
       *
       * @param compress - if `true`, compresses the sending data
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      compress(R) {
        return this.sockets.compress(R);
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
       * receive messages (because of network slowness or other issues, or because they’re connected through long polling
       * and is in the middle of a request-response cycle).
       *
       * @example
       * io.volatile.emit("hello"); // the clients may or may not receive it
       *
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      get volatile() {
        return this.sockets.volatile;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
       *
       * @example
       * // the “foo” event will be broadcast to all connected clients on this node
       * io.local.emit("foo", "bar");
       *
       * @return a new {@link BroadcastOperator} instance for chaining
       */
      get local() {
        return this.sockets.local;
      }
      /**
       * Adds a timeout in milliseconds for the next operation.
       *
       * @example
       * io.timeout(1000).emit("some-event", (err, responses) => {
       *   if (err) {
       *     // some clients did not acknowledge the event in the given delay
       *   } else {
       *     console.log(responses); // one response per client
       *   }
       * });
       *
       * @param timeout
       */
      timeout(R) {
        return this.sockets.timeout(R);
      }
      /**
       * Returns the matching socket instances.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * // return all Socket instances
       * const sockets = await io.fetchSockets();
       *
       * // return all Socket instances in the "room1" room
       * const sockets = await io.in("room1").fetchSockets();
       *
       * for (const socket of sockets) {
       *   console.log(socket.id);
       *   console.log(socket.handshake);
       *   console.log(socket.rooms);
       *   console.log(socket.data);
       *
       *   socket.emit("hello");
       *   socket.join("room1");
       *   socket.leave("room2");
       *   socket.disconnect();
       * }
       */
      fetchSockets() {
        return this.sockets.fetchSockets();
      }
      /**
       * Makes the matching socket instances join the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       *
       * // make all socket instances join the "room1" room
       * io.socketsJoin("room1");
       *
       * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
       * io.in("room1").socketsJoin(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsJoin(R) {
        return this.sockets.socketsJoin(R);
      }
      /**
       * Makes the matching socket instances leave the specified rooms.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * // make all socket instances leave the "room1" room
       * io.socketsLeave("room1");
       *
       * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
       * io.in("room1").socketsLeave(["room2", "room3"]);
       *
       * @param room - a room, or an array of rooms
       */
      socketsLeave(R) {
        return this.sockets.socketsLeave(R);
      }
      /**
       * Makes the matching socket instances disconnect.
       *
       * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
       *
       * @example
       * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
       * io.disconnectSockets();
       *
       * // make all socket instances in the "room1" room disconnect and close the underlying connections
       * io.in("room1").disconnectSockets(true);
       *
       * @param close - whether to close the underlying connection
       */
      disconnectSockets(R = !1) {
        return this.sockets.disconnectSockets(R);
      }
    }
    m.Server = O, Object.keys(s.EventEmitter.prototype).filter(function(q) {
      return typeof s.EventEmitter.prototype[q] == "function";
    }).forEach(function(q) {
      O.prototype[q] = function() {
        return this.sockets[q].apply(this.sockets, arguments);
      };
    }), o.exports = (q, R) => new O(q, R), o.exports.Server = O, o.exports.Namespace = f.Namespace, o.exports.Socket = S.Socket;
  })(ti, ti.exports)), ti.exports;
}
var Ym = Vm();
const Km = /* @__PURE__ */ Of(Ym), { Server: Xm, Namespace: Qv, Socket: Zv } = Km, $i = {
  SYNC_STATE: "sync:state",
  ACTION_SCAN: "action:scan",
  STATE_UPDATE: "state:update"
};
function Jm() {
  const o = wf();
  for (const m of Object.keys(o)) {
    const v = o[m];
    if (v) {
      for (const h of v)
        if (h.family === "IPv4" && !h.internal)
          return h.address;
    }
  }
  return "localhost";
}
class Qm {
  constructor(m) {
    this.io = null, this.httpServer = null, this.connectedClients = /* @__PURE__ */ new Map(), this.messageHandler = null, this.config = m;
  }
  /**
   * Start the Socket.IO server
   */
  async start() {
    if (this.io)
      throw new Error("Server is already running");
    this.httpServer = Ef(), this.io = new Xm(this.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      },
      transports: ["websocket", "polling"],
      // Allow both transports
      allowEIO3: !0
      // Support older clients
    }), this.io.engine.on("connection_error", (h) => {
      console.error("[HostServer] Connection error:", h);
    }), this.setupConnectionHandler(), await new Promise((h, d) => {
      this.httpServer.listen(this.config.port, "0.0.0.0", () => {
        console.log(`[HostServer] Listening on 0.0.0.0:${this.config.port}`), console.log("[HostServer] Server is ready to accept connections"), h();
      }).on("error", (c) => {
        console.error("[HostServer] Failed to start server:", c), d(c);
      });
    });
    const m = Jm(), v = `http://${m}:${this.config.port}`;
    return console.log(`[HostServer] Server started at ${v}`), console.log("[HostServer] Clients can connect using this address"), {
      port: this.config.port,
      localIp: m,
      url: v
    };
  }
  /**
   * Setup Socket.IO connection handler
   */
  setupConnectionHandler() {
    this.io && (console.log("[HostServer] Connection handler setup complete, waiting for connections..."), this.io.on("connection", (m) => {
      const v = m.id;
      console.log(`[HostServer] ✅ Client connected: ${v}`), console.log(`[HostServer] Total clients: ${this.connectedClients.size + 1}`), this.connectedClients.set(v, m), this.messageHandler && this.messageHandler("client:connected", { clientId: v }, v), m.on($i.ACTION_SCAN, (h) => {
        console.log(`[HostServer] Received scan action from ${v}:`, h), this.messageHandler && this.messageHandler($i.ACTION_SCAN, h, v);
      }), m.on("disconnect", () => {
        console.log(`[HostServer] Client disconnected: ${v}`), this.connectedClients.delete(v), this.messageHandler && this.messageHandler("client:disconnected", { clientId: v }, v);
      });
    }));
  }
  /**
   * Broadcast state update to all connected clients
   */
  broadcastStateUpdate(m) {
    if (!this.io) {
      console.warn("[HostServer] Cannot broadcast - server not running");
      return;
    }
    console.log(`[HostServer] Broadcasting state update to ${this.connectedClients.size} clients`), this.io.emit($i.STATE_UPDATE, m);
  }
  /**
   * Send full state sync to a specific client (usually on connect)
   */
  syncStateToClient(m, v) {
    const h = this.connectedClients.get(m);
    if (!h) {
      console.warn(`[HostServer] Cannot sync - client ${m} not found`);
      return;
    }
    console.log(`[HostServer] Syncing full state to client ${m}`), h.emit($i.SYNC_STATE, v);
  }
  /**
   * Register handler for messages from clients
   */
  onMessage(m) {
    this.messageHandler = m;
  }
  /**
   * Get number of connected clients
   */
  getClientCount() {
    return this.connectedClients.size;
  }
  /**
   * Get list of connected client IDs
   */
  getConnectedClients() {
    return Array.from(this.connectedClients.keys());
  }
  /**
   * Stop the server
   */
  async stop() {
    this.io && (console.log("[HostServer] Stopping server..."), this.connectedClients.forEach((m) => {
      m.disconnect(!0);
    }), this.connectedClients.clear(), await new Promise((m) => {
      this.io.close(() => {
        console.log("[HostServer] Socket.IO closed"), m();
      });
    }), this.httpServer && await new Promise((m) => {
      this.httpServer.close(() => {
        console.log("[HostServer] HTTP server closed"), m();
      });
    }), this.io = null, this.httpServer = null, this.messageHandler = null, console.log("[HostServer] Server stopped"));
  }
  /**
   * Check if server is running
   */
  isRunning() {
    return this.io !== null;
  }
}
const xd = Gt.dirname(mf(import.meta.url));
process.env.DIST = Gt.join(xd, "../dist");
process.env.VITE_PUBLIC = an.isPackaged ? process.env.DIST : Gt.join(process.env.DIST, "../public");
let Xe, Pe = null;
function yd() {
  Xe = new Ca({
    icon: Gt.join(process.env.VITE_PUBLIC, "app_logo_fixed.png"),
    webPreferences: {
      preload: Gt.join(xd, "preload.mjs"),
      webSecurity: !1
      // Disable CORS for API requests
    }
  }), hf.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ["https://pda.wpglb.com/*"] },
    (o, m) => {
      o.requestHeaders.Referer = "https://pda.wpglb.com/unloadingScanNew", o.requestHeaders.Origin = "https://pda.wpglb.com", m({ requestHeaders: o.requestHeaders });
    }
  ), Xe.webContents.on("did-finish-load", () => {
    Xe == null || Xe.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), process.env.VITE_DEV_SERVER_URL ? Xe.loadURL(process.env.VITE_DEV_SERVER_URL) : Xe.loadFile(Gt.join(process.env.DIST, "index.html"));
}
an.on("window-all-closed", async () => {
  Pe != null && Pe.isRunning() && (await Pe.stop(), Pe = null), process.platform !== "darwin" && (an.quit(), Xe = null);
});
an.on("activate", () => {
  Ca.getAllWindows().length === 0 && yd();
});
let sn = null;
We.handle("print-image", async (o, m, v = {}) => {
  if (!Xe)
    throw new Error("No window available for printing");
  try {
    (!sn || sn.isDestroyed()) && (sn = new Ca({
      show: !1,
      width: 378,
      height: 567,
      webPreferences: {
        nodeIntegration: !1,
        contextIsolation: !0
      }
    }));
    const h = `<!DOCTYPE html>
<html>
<head>
<style>
  @page { margin: 0; size: 10cm 15cm; }
  * { margin: 0; padding: 0; }
  body { width: 10cm; height: 15cm; }
  img { width: 100%; height: 100%; object-fit: contain; }
</style>
</head>
<body><img src="${m}" /></body>
</html>`;
    return await sn.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(h)}`), await new Promise((d) => setTimeout(d, 50)), new Promise((d, c) => {
      if (!sn) return c(new Error("Print window destroyed"));
      sn.webContents.print({
        silent: v.silent !== !1,
        printBackground: !0,
        margins: { marginType: "none" },
        pageSize: { width: 1e5, height: 15e4 }
      }, (t, a) => {
        t ? d({ success: !0 }) : c(new Error(a || "Print failed"));
      });
    });
  } catch (h) {
    throw h;
  }
});
We.handle("print-gdi", async (o, m) => new Promise((v, h) => {
  const d = /* @__PURE__ */ new Date(), c = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  let t;
  m.type === "exception" ? t = ev(c, m.orderId || "UNKNOWN") : t = Zm(
    c,
    m.routeName || "N/A",
    m.stackNumber || 0,
    m.trackingNumber || ""
  );
  const a = Gt.join(yf(), `gdi_print_${Date.now()}.ps1`);
  try {
    gf(a, t, "utf-8"), vf(`powershell -ExecutionPolicy Bypass -File "${a}"`, (n, e, i) => {
      try {
        xf(a);
      } catch {
      }
      e.includes("PRINT_SUCCESS") ? v({ success: !0 }) : h(new Error(i || (n == null ? void 0 : n.message) || "GDI Print failed"));
    });
  } catch (n) {
    h(n);
  }
}));
function Zm(o, m, v, h) {
  const d = h.slice(0, -4), c = h.slice(-4);
  return `
Add-Type -AssemblyName System.Drawing

$doc = New-Object System.Drawing.Printing.PrintDocument

$doc.add_PrintPage({
    param($sender, $e)
    $g = $e.Graphics
    
    # Page dimensions (10cm x 15cm at ~100 DPI for screen coords)
    $pageWidth = 394
    $pageHeight = 591
    $leftSection = $pageWidth * 0.55
    $rightStart = $leftSection + 20
    $rightWidth = $pageWidth - $rightStart - 15
    
    # Fonts
    $fontDate = New-Object System.Drawing.Font("Arial", 14)
    $fontRouteSmall = New-Object System.Drawing.Font("Arial", 36, [System.Drawing.FontStyle]::Bold)
    $fontRouteLarge = New-Object System.Drawing.Font("Arial", 52, [System.Drawing.FontStyle]::Bold)
    $fontTrackingNormal = New-Object System.Drawing.Font("Arial", 14)
    $fontTrackingBold = New-Object System.Drawing.Font("Arial", 18, [System.Drawing.FontStyle]::Bold)
    $fontStack = New-Object System.Drawing.Font("Arial", 80, [System.Drawing.FontStyle]::Bold)
    $fontNotes = New-Object System.Drawing.Font("Arial", 10)
    
    $brushBlack = [System.Drawing.Brushes]::Black
    $brushGray = [System.Drawing.Brushes]::Gray
    
    # 1. Date (Centered above Tracking Number)
    $dateSize = $g.MeasureString("${o}", $fontDate)
    $dateX = ($leftSection - $dateSize.Width) / 2
    $dateY = ($pageHeight * 0.5) - 75
    $g.DrawString("${o}", $fontDate, $brushBlack, $dateX, $dateY)
    
    # 2. Route Name (centered in top half)
    $routeFont = $fontRouteLarge
    $routeSize = $g.MeasureString("${m}", $routeFont)
    if ($routeSize.Width -gt ($leftSection - 30)) {
        $routeFont = $fontRouteSmall
        $routeSize = $g.MeasureString("${m}", $routeFont)
    }
    $routeX = ($leftSection - $routeSize.Width) / 2
    $routeY = ($pageHeight * 0.25) - ($routeSize.Height / 2)
    $g.DrawString("${m}", $routeFont, $brushBlack, $routeX, $routeY)
    
    # 3. Tracking Number (above divider line) - prefix normal, last 4 bold
    $trackingY = ($pageHeight * 0.5) - 35
    $prefixSize = $g.MeasureString("${d}", $fontTrackingNormal)
    $last4Size = $g.MeasureString("${c}", $fontTrackingBold)
    $totalWidth = $prefixSize.Width + $last4Size.Width - 8
    $trackingX = ($leftSection - $totalWidth) / 2
    
    # Draw prefix (normal, black)
    $g.DrawString("${d}", $fontTrackingNormal, $brushBlack, $trackingX, $trackingY)
    # Draw last 4 (bold, larger, black) - tightly after prefix
    $g.DrawString("${c}", $fontTrackingBold, $brushBlack, ($trackingX + $prefixSize.Width - 8), ($trackingY - 2))
    
    # 4. Divider line (full width)
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Black, 2)
    $g.DrawLine($pen, 8, ($pageHeight * 0.5), ($pageWidth - 8), ($pageHeight * 0.5))
    
    # 5. Stack Number (centered in bottom half)
    $stackText = "${v}"
    $stackSize = $g.MeasureString($stackText, $fontStack)
    $stackX = ($leftSection - $stackSize.Width) / 2
    $stackY = ($pageHeight * 0.75) - ($stackSize.Height / 2)
    $g.DrawString($stackText, $fontStack, $brushBlack, $stackX, $stackY)
    
    # 6. Notes box (dashed rectangle, right side - from top to bottom)
    $notesBoxTop = 40
    $notesBoxHeight = $pageHeight - 80
    $dashPen = New-Object System.Drawing.Pen([System.Drawing.Color]::Black, 2)
    $dashPen.DashPattern = @(6, 4)
    $g.DrawRectangle($dashPen, [int]$rightStart, [int]$notesBoxTop, [int]$rightWidth, [int]$notesBoxHeight)
    
    # 7. "NOTES" label (centered at bottom of notes box)
    $notesLabelSize = $g.MeasureString("NOTES", $fontNotes)
    $notesLabelX = $rightStart + ($rightWidth - $notesLabelSize.Width) / 2
    $g.DrawString("NOTES", $fontNotes, $brushGray, $notesLabelX, ($pageHeight - 30))
    
    $e.HasMorePages = $false
})

$doc.Print()
Write-Host "PRINT_SUCCESS"
`;
}
function ev(o, m) {
  return `
Add-Type -AssemblyName System.Drawing

$doc = New-Object System.Drawing.Printing.PrintDocument

$doc.add_PrintPage({
    param($sender, $e)
    $g = $e.Graphics
    
    $pageWidth = 394
    $pageHeight = 591
    $leftSection = $pageWidth * 0.55
    $rightStart = $leftSection + 20
    $rightWidth = $pageWidth - $rightStart - 15
    
    $fontDate = New-Object System.Drawing.Font("Arial", 14)
    $fontException = New-Object System.Drawing.Font("Arial", 22, [System.Drawing.FontStyle]::Bold)
    $fontOrderId = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Bold)
    $fontNoRoute = New-Object System.Drawing.Font("Arial", 32, [System.Drawing.FontStyle]::Bold)
    $fontNotes = New-Object System.Drawing.Font("Arial", 10)
    
    $brushBlack = [System.Drawing.Brushes]::Black
    $brushGray = [System.Drawing.Brushes]::Gray
    $brushRed = [System.Drawing.Brushes]::DarkRed
    
    # Date
    $dateSize = $g.MeasureString("${o}", $fontDate)
    $g.DrawString("${o}", $fontDate, $brushGray, ($pageWidth - $dateSize.Width - 15), 8)
    
    # "EXCEPTION" label
    $excSize = $g.MeasureString("EXCEPTION", $fontException)
    $g.DrawString("EXCEPTION", $fontException, $brushRed, (($leftSection - $excSize.Width) / 2), ($pageHeight * 0.12))
    
    # Order ID
    $orderSize = $g.MeasureString("${m}", $fontOrderId)
    $orderX = ($leftSection - $orderSize.Width) / 2
    if ($orderX -lt 5) { $orderX = 5 }
    $g.DrawString("${m}", $fontOrderId, $brushBlack, $orderX, ($pageHeight * 0.32))
    
    # Divider
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Black, 2)
    $g.DrawLine($pen, 8, ($pageHeight * 0.5), ($pageWidth - 8), ($pageHeight * 0.5))
    
    # "NO ROUTE"
    $noRouteSize = $g.MeasureString("NO ROUTE", $fontNoRoute)
    $g.DrawString("NO ROUTE", $fontNoRoute, $brushGray, (($leftSection - $noRouteSize.Width) / 2), ($pageHeight * 0.68))
    
    # Notes box
    $notesBoxTop = ($pageHeight * 0.5) + 15
    $notesBoxHeight = ($pageHeight * 0.5) - 50
    $dashPen = New-Object System.Drawing.Pen([System.Drawing.Color]::Gray, 1)
    $dashPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $g.DrawRectangle($dashPen, $rightStart, $notesBoxTop, $rightWidth, $notesBoxHeight)
    
    # "NOTES" label
    $notesLabelSize = $g.MeasureString("NOTES", $fontNotes)
    $g.DrawString("NOTES", $fontNotes, $brushGray, ($rightStart + ($rightWidth - $notesLabelSize.Width) / 2), ($pageHeight - 20))
    
    $e.HasMorePages = $false
})

$doc.Print()
Write-Host "PRINT_SUCCESS"
`;
}
an.whenReady().then(() => {
  yd(), an.isPackaged && Xe ? im(Xe) : (We.handle("get-app-version", () => "dev"), We.handle("check-for-updates", () => null), We.handle("download-update", () => !1), We.handle("install-update", () => {
  })), tv();
});
function tv() {
  We.handle("start-sync-server", async (o, m = 14059) => {
    try {
      return Pe != null && Pe.isRunning() && (console.log("[Main] Server already running, restarting..."), await Pe.stop(), Pe = null), Pe = new Qm({ port: m }), Pe.onMessage((h, d, c) => {
        Xe && !Xe.isDestroyed() && Xe.webContents.send("sync-server-message", {
          event: h,
          data: d,
          clientId: c
        });
      }), await Pe.start();
    } catch (v) {
      throw console.error("[Main] Failed to start sync server:", v), v;
    }
  }), We.handle("stop-sync-server", async () => {
    try {
      if (!Pe)
        return;
      await Pe.stop(), Pe = null;
    } catch (o) {
      throw console.error("[Main] Failed to stop sync server:", o), o;
    }
  }), We.handle("broadcast-sync-state", (o, m) => {
    try {
      if (!(Pe != null && Pe.isRunning())) {
        console.warn("[Main] Cannot broadcast - server not running");
        return;
      }
      Pe.broadcastStateUpdate(m);
    } catch (v) {
      throw console.error("[Main] Failed to broadcast state:", v), v;
    }
  }), We.handle("sync-state-to-client", (o, m, v) => {
    try {
      if (!(Pe != null && Pe.isRunning())) {
        console.warn("[Main] Cannot sync to client - server not running");
        return;
      }
      Pe.syncStateToClient(m, v);
    } catch (h) {
      throw console.error("[Main] Failed to sync to client:", h), h;
    }
  }), We.handle("get-sync-server-status", () => Pe ? {
    running: Pe.isRunning(),
    clientCount: Pe.getClientCount(),
    clients: Pe.getConnectedClients()
  } : { running: !1, clientCount: 0 });
}
