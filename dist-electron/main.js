import nn, { ipcMain as Ye, app as vn, BrowserWindow as mo, session as Bh } from "electron";
import it from "node:path";
import { fileURLToPath as go } from "node:url";
import Ko, { ChildProcess as jh, exec as Mh } from "node:child_process";
import { createWriteStream as Hh, createReadStream as Gh, writeFileSync as zh, unlinkSync as Wh } from "node:fs";
import Vh, { constants as $d, platform as Yh, release as Kh, type as Xo, networkInterfaces as ho, tmpdir as Xh } from "node:os";
import Ze from "fs";
import Jh from "constants";
import et from "stream";
import oi from "util";
import vo from "assert";
import Pe from "path";
import hr from "child_process";
import ht from "events";
import yt from "crypto";
import qd from "tty";
import mr from "os";
import rn from "url";
import Qh from "string_decoder";
import yn from "zlib";
import gr, { createServer as Zh } from "http";
import em from "querystring";
import tm from "timers";
import nm from "https";
import rm from "net";
import im from "tls";
import Bd from "buffer";
import { isIP as kt } from "node:net";
import { Buffer as sm } from "node:buffer";
import xt from "node:process";
import { debuglog as am } from "node:util";
var qe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function om(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var c = e.default;
  if (typeof c == "function") {
    var f = function l() {
      return this instanceof l ? Reflect.construct(c, arguments, this.constructor) : c.apply(this, arguments);
    };
    f.prototype = c.prototype;
  } else f = {};
  return Object.defineProperty(f, "__esModule", { value: !0 }), Object.keys(e).forEach(function(l) {
    var d = Object.getOwnPropertyDescriptor(e, l);
    Object.defineProperty(f, l, d.get ? d : {
      enumerable: !0,
      get: function() {
        return e[l];
      }
    });
  }), f;
}
var Ht = {}, Si = {}, Ar = {}, Jo;
function st() {
  return Jo || (Jo = 1, Ar.fromCallback = function(e) {
    return Object.defineProperty(function(...c) {
      if (typeof c[c.length - 1] == "function") e.apply(this, c);
      else
        return new Promise((f, l) => {
          c.push((d, s) => d != null ? l(d) : f(s)), e.apply(this, c);
        });
    }, "name", { value: e.name });
  }, Ar.fromPromise = function(e) {
    return Object.defineProperty(function(...c) {
      const f = c[c.length - 1];
      if (typeof f != "function") return e.apply(this, c);
      c.pop(), e.apply(this, c).then((l) => f(null, l), f);
    }, "name", { value: e.name });
  }), Ar;
}
var Ti, Qo;
function cm() {
  if (Qo) return Ti;
  Qo = 1;
  var e = Jh, c = process.cwd, f = null, l = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return f || (f = c.call(process)), f;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var d = process.chdir;
    process.chdir = function(t) {
      f = null, d.call(process, t);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, d);
  }
  Ti = s;
  function s(t) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && a(t), t.lutimes || r(t), t.chown = p(t.chown), t.fchown = p(t.fchown), t.lchown = p(t.lchown), t.chmod = n(t.chmod), t.fchmod = n(t.fchmod), t.lchmod = n(t.lchmod), t.chownSync = o(t.chownSync), t.fchownSync = o(t.fchownSync), t.lchownSync = o(t.lchownSync), t.chmodSync = i(t.chmodSync), t.fchmodSync = i(t.fchmodSync), t.lchmodSync = i(t.lchmodSync), t.stat = h(t.stat), t.fstat = h(t.fstat), t.lstat = h(t.lstat), t.statSync = u(t.statSync), t.fstatSync = u(t.fstatSync), t.lstatSync = u(t.lstatSync), t.chmod && !t.lchmod && (t.lchmod = function(m, v, y) {
      y && process.nextTick(y);
    }, t.lchmodSync = function() {
    }), t.chown && !t.lchown && (t.lchown = function(m, v, y, R) {
      R && process.nextTick(R);
    }, t.lchownSync = function() {
    }), l === "win32" && (t.rename = typeof t.rename != "function" ? t.rename : (function(m) {
      function v(y, R, S) {
        var T = Date.now(), b = 0;
        m(y, R, function w(_) {
          if (_ && (_.code === "EACCES" || _.code === "EPERM" || _.code === "EBUSY") && Date.now() - T < 6e4) {
            setTimeout(function() {
              t.stat(R, function(E, N) {
                E && E.code === "ENOENT" ? m(y, R, w) : S(_);
              });
            }, b), b < 100 && (b += 10);
            return;
          }
          S && S(_);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(v, m), v;
    })(t.rename)), t.read = typeof t.read != "function" ? t.read : (function(m) {
      function v(y, R, S, T, b, w) {
        var _;
        if (w && typeof w == "function") {
          var E = 0;
          _ = function(N, k, D) {
            if (N && N.code === "EAGAIN" && E < 10)
              return E++, m.call(t, y, R, S, T, b, _);
            w.apply(this, arguments);
          };
        }
        return m.call(t, y, R, S, T, b, _);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(v, m), v;
    })(t.read), t.readSync = typeof t.readSync != "function" ? t.readSync : /* @__PURE__ */ (function(m) {
      return function(v, y, R, S, T) {
        for (var b = 0; ; )
          try {
            return m.call(t, v, y, R, S, T);
          } catch (w) {
            if (w.code === "EAGAIN" && b < 10) {
              b++;
              continue;
            }
            throw w;
          }
      };
    })(t.readSync);
    function a(m) {
      m.lchmod = function(v, y, R) {
        m.open(
          v,
          e.O_WRONLY | e.O_SYMLINK,
          y,
          function(S, T) {
            if (S) {
              R && R(S);
              return;
            }
            m.fchmod(T, y, function(b) {
              m.close(T, function(w) {
                R && R(b || w);
              });
            });
          }
        );
      }, m.lchmodSync = function(v, y) {
        var R = m.openSync(v, e.O_WRONLY | e.O_SYMLINK, y), S = !0, T;
        try {
          T = m.fchmodSync(R, y), S = !1;
        } finally {
          if (S)
            try {
              m.closeSync(R);
            } catch {
            }
          else
            m.closeSync(R);
        }
        return T;
      };
    }
    function r(m) {
      e.hasOwnProperty("O_SYMLINK") && m.futimes ? (m.lutimes = function(v, y, R, S) {
        m.open(v, e.O_SYMLINK, function(T, b) {
          if (T) {
            S && S(T);
            return;
          }
          m.futimes(b, y, R, function(w) {
            m.close(b, function(_) {
              S && S(w || _);
            });
          });
        });
      }, m.lutimesSync = function(v, y, R) {
        var S = m.openSync(v, e.O_SYMLINK), T, b = !0;
        try {
          T = m.futimesSync(S, y, R), b = !1;
        } finally {
          if (b)
            try {
              m.closeSync(S);
            } catch {
            }
          else
            m.closeSync(S);
        }
        return T;
      }) : m.futimes && (m.lutimes = function(v, y, R, S) {
        S && process.nextTick(S);
      }, m.lutimesSync = function() {
      });
    }
    function n(m) {
      return m && function(v, y, R) {
        return m.call(t, v, y, function(S) {
          g(S) && (S = null), R && R.apply(this, arguments);
        });
      };
    }
    function i(m) {
      return m && function(v, y) {
        try {
          return m.call(t, v, y);
        } catch (R) {
          if (!g(R)) throw R;
        }
      };
    }
    function p(m) {
      return m && function(v, y, R, S) {
        return m.call(t, v, y, R, function(T) {
          g(T) && (T = null), S && S.apply(this, arguments);
        });
      };
    }
    function o(m) {
      return m && function(v, y, R) {
        try {
          return m.call(t, v, y, R);
        } catch (S) {
          if (!g(S)) throw S;
        }
      };
    }
    function h(m) {
      return m && function(v, y, R) {
        typeof y == "function" && (R = y, y = null);
        function S(T, b) {
          b && (b.uid < 0 && (b.uid += 4294967296), b.gid < 0 && (b.gid += 4294967296)), R && R.apply(this, arguments);
        }
        return y ? m.call(t, v, y, S) : m.call(t, v, S);
      };
    }
    function u(m) {
      return m && function(v, y) {
        var R = y ? m.call(t, v, y) : m.call(t, v);
        return R && (R.uid < 0 && (R.uid += 4294967296), R.gid < 0 && (R.gid += 4294967296)), R;
      };
    }
    function g(m) {
      if (!m || m.code === "ENOSYS")
        return !0;
      var v = !process.getuid || process.getuid() !== 0;
      return !!(v && (m.code === "EINVAL" || m.code === "EPERM"));
    }
  }
  return Ti;
}
var Ri, Zo;
function lm() {
  if (Zo) return Ri;
  Zo = 1;
  var e = et.Stream;
  Ri = c;
  function c(f) {
    return {
      ReadStream: l,
      WriteStream: d
    };
    function l(s, t) {
      if (!(this instanceof l)) return new l(s, t);
      e.call(this);
      var a = this;
      this.path = s, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, t = t || {};
      for (var r = Object.keys(t), n = 0, i = r.length; n < i; n++) {
        var p = r[n];
        this[p] = t[p];
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
      f.open(this.path, this.flags, this.mode, function(o, h) {
        if (o) {
          a.emit("error", o), a.readable = !1;
          return;
        }
        a.fd = h, a.emit("open", h), a._read();
      });
    }
    function d(s, t) {
      if (!(this instanceof d)) return new d(s, t);
      e.call(this), this.path = s, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, t = t || {};
      for (var a = Object.keys(t), r = 0, n = a.length; r < n; r++) {
        var i = a[r];
        this[i] = t[i];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = f.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Ri;
}
var Ci, ec;
function um() {
  if (ec) return Ci;
  ec = 1, Ci = c;
  var e = Object.getPrototypeOf || function(f) {
    return f.__proto__;
  };
  function c(f) {
    if (f === null || typeof f != "object")
      return f;
    if (f instanceof Object)
      var l = { __proto__: e(f) };
    else
      var l = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(f).forEach(function(d) {
      Object.defineProperty(l, d, Object.getOwnPropertyDescriptor(f, d));
    }), l;
  }
  return Ci;
}
var Or, tc;
function tt() {
  if (tc) return Or;
  tc = 1;
  var e = Ze, c = cm(), f = lm(), l = um(), d = oi, s, t;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (s = Symbol.for("graceful-fs.queue"), t = Symbol.for("graceful-fs.previous")) : (s = "___graceful-fs.queue", t = "___graceful-fs.previous");
  function a() {
  }
  function r(m, v) {
    Object.defineProperty(m, s, {
      get: function() {
        return v;
      }
    });
  }
  var n = a;
  if (d.debuglog ? n = d.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (n = function() {
    var m = d.format.apply(d, arguments);
    m = "GFS4: " + m.split(/\n/).join(`
GFS4: `), console.error(m);
  }), !e[s]) {
    var i = qe[s] || [];
    r(e, i), e.close = (function(m) {
      function v(y, R) {
        return m.call(e, y, function(S) {
          S || u(), typeof R == "function" && R.apply(this, arguments);
        });
      }
      return Object.defineProperty(v, t, {
        value: m
      }), v;
    })(e.close), e.closeSync = (function(m) {
      function v(y) {
        m.apply(e, arguments), u();
      }
      return Object.defineProperty(v, t, {
        value: m
      }), v;
    })(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      n(e[s]), vo.equal(e[s].length, 0);
    });
  }
  qe[s] || r(qe, e[s]), Or = p(l(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (Or = p(e), e.__patched = !0);
  function p(m) {
    c(m), m.gracefulify = p, m.createReadStream = ae, m.createWriteStream = oe;
    var v = m.readFile;
    m.readFile = y;
    function y(Z, Se, O) {
      return typeof Se == "function" && (O = Se, Se = null), A(Z, Se, O);
      function A(z, q, me, be) {
        return v(z, q, function(we) {
          we && (we.code === "EMFILE" || we.code === "ENFILE") ? o([A, [z, q, me], we, be || Date.now(), Date.now()]) : typeof me == "function" && me.apply(this, arguments);
        });
      }
    }
    var R = m.writeFile;
    m.writeFile = S;
    function S(Z, Se, O, A) {
      return typeof O == "function" && (A = O, O = null), z(Z, Se, O, A);
      function z(q, me, be, we, Ce) {
        return R(q, me, be, function(Re) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? o([z, [q, me, be, we], Re, Ce || Date.now(), Date.now()]) : typeof we == "function" && we.apply(this, arguments);
        });
      }
    }
    var T = m.appendFile;
    T && (m.appendFile = b);
    function b(Z, Se, O, A) {
      return typeof O == "function" && (A = O, O = null), z(Z, Se, O, A);
      function z(q, me, be, we, Ce) {
        return T(q, me, be, function(Re) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? o([z, [q, me, be, we], Re, Ce || Date.now(), Date.now()]) : typeof we == "function" && we.apply(this, arguments);
        });
      }
    }
    var w = m.copyFile;
    w && (m.copyFile = _);
    function _(Z, Se, O, A) {
      return typeof O == "function" && (A = O, O = 0), z(Z, Se, O, A);
      function z(q, me, be, we, Ce) {
        return w(q, me, be, function(Re) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? o([z, [q, me, be, we], Re, Ce || Date.now(), Date.now()]) : typeof we == "function" && we.apply(this, arguments);
        });
      }
    }
    var E = m.readdir;
    m.readdir = k;
    var N = /^v[0-5]\./;
    function k(Z, Se, O) {
      typeof Se == "function" && (O = Se, Se = null);
      var A = N.test(process.version) ? function(me, be, we, Ce) {
        return E(me, z(
          me,
          be,
          we,
          Ce
        ));
      } : function(me, be, we, Ce) {
        return E(me, be, z(
          me,
          be,
          we,
          Ce
        ));
      };
      return A(Z, Se, O);
      function z(q, me, be, we) {
        return function(Ce, Re) {
          Ce && (Ce.code === "EMFILE" || Ce.code === "ENFILE") ? o([
            A,
            [q, me, be],
            Ce,
            we || Date.now(),
            Date.now()
          ]) : (Re && Re.sort && Re.sort(), typeof be == "function" && be.call(this, Ce, Re));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var D = f(m);
      U = D.ReadStream, W = D.WriteStream;
    }
    var $ = m.ReadStream;
    $ && (U.prototype = Object.create($.prototype), U.prototype.open = G);
    var C = m.WriteStream;
    C && (W.prototype = Object.create(C.prototype), W.prototype.open = re), Object.defineProperty(m, "ReadStream", {
      get: function() {
        return U;
      },
      set: function(Z) {
        U = Z;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(m, "WriteStream", {
      get: function() {
        return W;
      },
      set: function(Z) {
        W = Z;
      },
      enumerable: !0,
      configurable: !0
    });
    var I = U;
    Object.defineProperty(m, "FileReadStream", {
      get: function() {
        return I;
      },
      set: function(Z) {
        I = Z;
      },
      enumerable: !0,
      configurable: !0
    });
    var F = W;
    Object.defineProperty(m, "FileWriteStream", {
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
      return this instanceof U ? ($.apply(this, arguments), this) : U.apply(Object.create(U.prototype), arguments);
    }
    function G() {
      var Z = this;
      _e(Z.path, Z.flags, Z.mode, function(Se, O) {
        Se ? (Z.autoClose && Z.destroy(), Z.emit("error", Se)) : (Z.fd = O, Z.emit("open", O), Z.read());
      });
    }
    function W(Z, Se) {
      return this instanceof W ? (C.apply(this, arguments), this) : W.apply(Object.create(W.prototype), arguments);
    }
    function re() {
      var Z = this;
      _e(Z.path, Z.flags, Z.mode, function(Se, O) {
        Se ? (Z.destroy(), Z.emit("error", Se)) : (Z.fd = O, Z.emit("open", O));
      });
    }
    function ae(Z, Se) {
      return new m.ReadStream(Z, Se);
    }
    function oe(Z, Se) {
      return new m.WriteStream(Z, Se);
    }
    var ye = m.open;
    m.open = _e;
    function _e(Z, Se, O, A) {
      return typeof O == "function" && (A = O, O = null), z(Z, Se, O, A);
      function z(q, me, be, we, Ce) {
        return ye(q, me, be, function(Re, Me) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? o([z, [q, me, be, we], Re, Ce || Date.now(), Date.now()]) : typeof we == "function" && we.apply(this, arguments);
        });
      }
    }
    return m;
  }
  function o(m) {
    n("ENQUEUE", m[0].name, m[1]), e[s].push(m), g();
  }
  var h;
  function u() {
    for (var m = Date.now(), v = 0; v < e[s].length; ++v)
      e[s][v].length > 2 && (e[s][v][3] = m, e[s][v][4] = m);
    g();
  }
  function g() {
    if (clearTimeout(h), h = void 0, e[s].length !== 0) {
      var m = e[s].shift(), v = m[0], y = m[1], R = m[2], S = m[3], T = m[4];
      if (S === void 0)
        n("RETRY", v.name, y), v.apply(null, y);
      else if (Date.now() - S >= 6e4) {
        n("TIMEOUT", v.name, y);
        var b = y.pop();
        typeof b == "function" && b.call(null, R);
      } else {
        var w = Date.now() - T, _ = Math.max(T - S, 1), E = Math.min(_ * 1.2, 100);
        w >= E ? (n("RETRY", v.name, y), v.apply(null, y.concat([S]))) : e[s].push(m);
      }
      h === void 0 && (h = setTimeout(g, 0));
    }
  }
  return Or;
}
var nc;
function bn() {
  return nc || (nc = 1, (function(e) {
    const c = st().fromCallback, f = tt(), l = [
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
    ].filter((d) => typeof f[d] == "function");
    Object.assign(e, f), l.forEach((d) => {
      e[d] = c(f[d]);
    }), e.exists = function(d, s) {
      return typeof s == "function" ? f.exists(d, s) : new Promise((t) => f.exists(d, t));
    }, e.read = function(d, s, t, a, r, n) {
      return typeof n == "function" ? f.read(d, s, t, a, r, n) : new Promise((i, p) => {
        f.read(d, s, t, a, r, (o, h, u) => {
          if (o) return p(o);
          i({ bytesRead: h, buffer: u });
        });
      });
    }, e.write = function(d, s, ...t) {
      return typeof t[t.length - 1] == "function" ? f.write(d, s, ...t) : new Promise((a, r) => {
        f.write(d, s, ...t, (n, i, p) => {
          if (n) return r(n);
          a({ bytesWritten: i, buffer: p });
        });
      });
    }, typeof f.writev == "function" && (e.writev = function(d, s, ...t) {
      return typeof t[t.length - 1] == "function" ? f.writev(d, s, ...t) : new Promise((a, r) => {
        f.writev(d, s, ...t, (n, i, p) => {
          if (n) return r(n);
          a({ bytesWritten: i, buffers: p });
        });
      });
    }), typeof f.realpath.native == "function" ? e.realpath.native = c(f.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  })(Si)), Si;
}
var kr = {}, Ai = {}, rc;
function pm() {
  if (rc) return Ai;
  rc = 1;
  const e = Pe;
  return Ai.checkPath = function(f) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(f.replace(e.parse(f).root, ""))) {
      const d = new Error(`Path contains invalid characters: ${f}`);
      throw d.code = "EINVAL", d;
    }
  }, Ai;
}
var ic;
function dm() {
  if (ic) return kr;
  ic = 1;
  const e = /* @__PURE__ */ bn(), { checkPath: c } = /* @__PURE__ */ pm(), f = (l) => {
    const d = { mode: 511 };
    return typeof l == "number" ? l : { ...d, ...l }.mode;
  };
  return kr.makeDir = async (l, d) => (c(l), e.mkdir(l, {
    mode: f(d),
    recursive: !0
  })), kr.makeDirSync = (l, d) => (c(l), e.mkdirSync(l, {
    mode: f(d),
    recursive: !0
  })), kr;
}
var Oi, sc;
function bt() {
  if (sc) return Oi;
  sc = 1;
  const e = st().fromPromise, { makeDir: c, makeDirSync: f } = /* @__PURE__ */ dm(), l = e(c);
  return Oi = {
    mkdirs: l,
    mkdirsSync: f,
    // alias
    mkdirp: l,
    mkdirpSync: f,
    ensureDir: l,
    ensureDirSync: f
  }, Oi;
}
var ki, ac;
function sn() {
  if (ac) return ki;
  ac = 1;
  const e = st().fromPromise, c = /* @__PURE__ */ bn();
  function f(l) {
    return c.access(l).then(() => !0).catch(() => !1);
  }
  return ki = {
    pathExists: e(f),
    pathExistsSync: c.existsSync
  }, ki;
}
var Pi, oc;
function jd() {
  if (oc) return Pi;
  oc = 1;
  const e = tt();
  function c(l, d, s, t) {
    e.open(l, "r+", (a, r) => {
      if (a) return t(a);
      e.futimes(r, d, s, (n) => {
        e.close(r, (i) => {
          t && t(n || i);
        });
      });
    });
  }
  function f(l, d, s) {
    const t = e.openSync(l, "r+");
    return e.futimesSync(t, d, s), e.closeSync(t);
  }
  return Pi = {
    utimesMillis: c,
    utimesMillisSync: f
  }, Pi;
}
var Ii, cc;
function wn() {
  if (cc) return Ii;
  cc = 1;
  const e = /* @__PURE__ */ bn(), c = Pe, f = oi;
  function l(o, h, u) {
    const g = u.dereference ? (m) => e.stat(m, { bigint: !0 }) : (m) => e.lstat(m, { bigint: !0 });
    return Promise.all([
      g(o),
      g(h).catch((m) => {
        if (m.code === "ENOENT") return null;
        throw m;
      })
    ]).then(([m, v]) => ({ srcStat: m, destStat: v }));
  }
  function d(o, h, u) {
    let g;
    const m = u.dereference ? (y) => e.statSync(y, { bigint: !0 }) : (y) => e.lstatSync(y, { bigint: !0 }), v = m(o);
    try {
      g = m(h);
    } catch (y) {
      if (y.code === "ENOENT") return { srcStat: v, destStat: null };
      throw y;
    }
    return { srcStat: v, destStat: g };
  }
  function s(o, h, u, g, m) {
    f.callbackify(l)(o, h, g, (v, y) => {
      if (v) return m(v);
      const { srcStat: R, destStat: S } = y;
      if (S) {
        if (n(R, S)) {
          const T = c.basename(o), b = c.basename(h);
          return u === "move" && T !== b && T.toLowerCase() === b.toLowerCase() ? m(null, { srcStat: R, destStat: S, isChangingCase: !0 }) : m(new Error("Source and destination must not be the same."));
        }
        if (R.isDirectory() && !S.isDirectory())
          return m(new Error(`Cannot overwrite non-directory '${h}' with directory '${o}'.`));
        if (!R.isDirectory() && S.isDirectory())
          return m(new Error(`Cannot overwrite directory '${h}' with non-directory '${o}'.`));
      }
      return R.isDirectory() && i(o, h) ? m(new Error(p(o, h, u))) : m(null, { srcStat: R, destStat: S });
    });
  }
  function t(o, h, u, g) {
    const { srcStat: m, destStat: v } = d(o, h, g);
    if (v) {
      if (n(m, v)) {
        const y = c.basename(o), R = c.basename(h);
        if (u === "move" && y !== R && y.toLowerCase() === R.toLowerCase())
          return { srcStat: m, destStat: v, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (m.isDirectory() && !v.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${h}' with directory '${o}'.`);
      if (!m.isDirectory() && v.isDirectory())
        throw new Error(`Cannot overwrite directory '${h}' with non-directory '${o}'.`);
    }
    if (m.isDirectory() && i(o, h))
      throw new Error(p(o, h, u));
    return { srcStat: m, destStat: v };
  }
  function a(o, h, u, g, m) {
    const v = c.resolve(c.dirname(o)), y = c.resolve(c.dirname(u));
    if (y === v || y === c.parse(y).root) return m();
    e.stat(y, { bigint: !0 }, (R, S) => R ? R.code === "ENOENT" ? m() : m(R) : n(h, S) ? m(new Error(p(o, u, g))) : a(o, h, y, g, m));
  }
  function r(o, h, u, g) {
    const m = c.resolve(c.dirname(o)), v = c.resolve(c.dirname(u));
    if (v === m || v === c.parse(v).root) return;
    let y;
    try {
      y = e.statSync(v, { bigint: !0 });
    } catch (R) {
      if (R.code === "ENOENT") return;
      throw R;
    }
    if (n(h, y))
      throw new Error(p(o, u, g));
    return r(o, h, v, g);
  }
  function n(o, h) {
    return h.ino && h.dev && h.ino === o.ino && h.dev === o.dev;
  }
  function i(o, h) {
    const u = c.resolve(o).split(c.sep).filter((m) => m), g = c.resolve(h).split(c.sep).filter((m) => m);
    return u.reduce((m, v, y) => m && g[y] === v, !0);
  }
  function p(o, h, u) {
    return `Cannot ${u} '${o}' to a subdirectory of itself, '${h}'.`;
  }
  return Ii = {
    checkPaths: s,
    checkPathsSync: t,
    checkParentPaths: a,
    checkParentPathsSync: r,
    isSrcSubdir: i,
    areIdentical: n
  }, Ii;
}
var Ni, lc;
function fm() {
  if (lc) return Ni;
  lc = 1;
  const e = tt(), c = Pe, f = bt().mkdirs, l = sn().pathExists, d = jd().utimesMillis, s = /* @__PURE__ */ wn();
  function t(k, D, $, C) {
    typeof $ == "function" && !C ? (C = $, $ = {}) : typeof $ == "function" && ($ = { filter: $ }), C = C || function() {
    }, $ = $ || {}, $.clobber = "clobber" in $ ? !!$.clobber : !0, $.overwrite = "overwrite" in $ ? !!$.overwrite : $.clobber, $.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), s.checkPaths(k, D, "copy", $, (I, F) => {
      if (I) return C(I);
      const { srcStat: U, destStat: G } = F;
      s.checkParentPaths(k, U, D, "copy", (W) => W ? C(W) : $.filter ? r(a, G, k, D, $, C) : a(G, k, D, $, C));
    });
  }
  function a(k, D, $, C, I) {
    const F = c.dirname($);
    l(F, (U, G) => {
      if (U) return I(U);
      if (G) return i(k, D, $, C, I);
      f(F, (W) => W ? I(W) : i(k, D, $, C, I));
    });
  }
  function r(k, D, $, C, I, F) {
    Promise.resolve(I.filter($, C)).then((U) => U ? k(D, $, C, I, F) : F(), (U) => F(U));
  }
  function n(k, D, $, C, I) {
    return C.filter ? r(i, k, D, $, C, I) : i(k, D, $, C, I);
  }
  function i(k, D, $, C, I) {
    (C.dereference ? e.stat : e.lstat)(D, (U, G) => U ? I(U) : G.isDirectory() ? S(G, k, D, $, C, I) : G.isFile() || G.isCharacterDevice() || G.isBlockDevice() ? p(G, k, D, $, C, I) : G.isSymbolicLink() ? E(k, D, $, C, I) : G.isSocket() ? I(new Error(`Cannot copy a socket file: ${D}`)) : G.isFIFO() ? I(new Error(`Cannot copy a FIFO pipe: ${D}`)) : I(new Error(`Unknown file: ${D}`)));
  }
  function p(k, D, $, C, I, F) {
    return D ? o(k, $, C, I, F) : h(k, $, C, I, F);
  }
  function o(k, D, $, C, I) {
    if (C.overwrite)
      e.unlink($, (F) => F ? I(F) : h(k, D, $, C, I));
    else return C.errorOnExist ? I(new Error(`'${$}' already exists`)) : I();
  }
  function h(k, D, $, C, I) {
    e.copyFile(D, $, (F) => F ? I(F) : C.preserveTimestamps ? u(k.mode, D, $, I) : y($, k.mode, I));
  }
  function u(k, D, $, C) {
    return g(k) ? m($, k, (I) => I ? C(I) : v(k, D, $, C)) : v(k, D, $, C);
  }
  function g(k) {
    return (k & 128) === 0;
  }
  function m(k, D, $) {
    return y(k, D | 128, $);
  }
  function v(k, D, $, C) {
    R(D, $, (I) => I ? C(I) : y($, k, C));
  }
  function y(k, D, $) {
    return e.chmod(k, D, $);
  }
  function R(k, D, $) {
    e.stat(k, (C, I) => C ? $(C) : d(D, I.atime, I.mtime, $));
  }
  function S(k, D, $, C, I, F) {
    return D ? b($, C, I, F) : T(k.mode, $, C, I, F);
  }
  function T(k, D, $, C, I) {
    e.mkdir($, (F) => {
      if (F) return I(F);
      b(D, $, C, (U) => U ? I(U) : y($, k, I));
    });
  }
  function b(k, D, $, C) {
    e.readdir(k, (I, F) => I ? C(I) : w(F, k, D, $, C));
  }
  function w(k, D, $, C, I) {
    const F = k.pop();
    return F ? _(k, F, D, $, C, I) : I();
  }
  function _(k, D, $, C, I, F) {
    const U = c.join($, D), G = c.join(C, D);
    s.checkPaths(U, G, "copy", I, (W, re) => {
      if (W) return F(W);
      const { destStat: ae } = re;
      n(ae, U, G, I, (oe) => oe ? F(oe) : w(k, $, C, I, F));
    });
  }
  function E(k, D, $, C, I) {
    e.readlink(D, (F, U) => {
      if (F) return I(F);
      if (C.dereference && (U = c.resolve(process.cwd(), U)), k)
        e.readlink($, (G, W) => G ? G.code === "EINVAL" || G.code === "UNKNOWN" ? e.symlink(U, $, I) : I(G) : (C.dereference && (W = c.resolve(process.cwd(), W)), s.isSrcSubdir(U, W) ? I(new Error(`Cannot copy '${U}' to a subdirectory of itself, '${W}'.`)) : k.isDirectory() && s.isSrcSubdir(W, U) ? I(new Error(`Cannot overwrite '${W}' with '${U}'.`)) : N(U, $, I)));
      else
        return e.symlink(U, $, I);
    });
  }
  function N(k, D, $) {
    e.unlink(D, (C) => C ? $(C) : e.symlink(k, D, $));
  }
  return Ni = t, Ni;
}
var Di, uc;
function hm() {
  if (uc) return Di;
  uc = 1;
  const e = tt(), c = Pe, f = bt().mkdirsSync, l = jd().utimesMillisSync, d = /* @__PURE__ */ wn();
  function s(w, _, E) {
    typeof E == "function" && (E = { filter: E }), E = E || {}, E.clobber = "clobber" in E ? !!E.clobber : !0, E.overwrite = "overwrite" in E ? !!E.overwrite : E.clobber, E.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: N, destStat: k } = d.checkPathsSync(w, _, "copy", E);
    return d.checkParentPathsSync(w, N, _, "copy"), t(k, w, _, E);
  }
  function t(w, _, E, N) {
    if (N.filter && !N.filter(_, E)) return;
    const k = c.dirname(E);
    return e.existsSync(k) || f(k), r(w, _, E, N);
  }
  function a(w, _, E, N) {
    if (!(N.filter && !N.filter(_, E)))
      return r(w, _, E, N);
  }
  function r(w, _, E, N) {
    const D = (N.dereference ? e.statSync : e.lstatSync)(_);
    if (D.isDirectory()) return v(D, w, _, E, N);
    if (D.isFile() || D.isCharacterDevice() || D.isBlockDevice()) return n(D, w, _, E, N);
    if (D.isSymbolicLink()) return T(w, _, E, N);
    throw D.isSocket() ? new Error(`Cannot copy a socket file: ${_}`) : D.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${_}`) : new Error(`Unknown file: ${_}`);
  }
  function n(w, _, E, N, k) {
    return _ ? i(w, E, N, k) : p(w, E, N, k);
  }
  function i(w, _, E, N) {
    if (N.overwrite)
      return e.unlinkSync(E), p(w, _, E, N);
    if (N.errorOnExist)
      throw new Error(`'${E}' already exists`);
  }
  function p(w, _, E, N) {
    return e.copyFileSync(_, E), N.preserveTimestamps && o(w.mode, _, E), g(E, w.mode);
  }
  function o(w, _, E) {
    return h(w) && u(E, w), m(_, E);
  }
  function h(w) {
    return (w & 128) === 0;
  }
  function u(w, _) {
    return g(w, _ | 128);
  }
  function g(w, _) {
    return e.chmodSync(w, _);
  }
  function m(w, _) {
    const E = e.statSync(w);
    return l(_, E.atime, E.mtime);
  }
  function v(w, _, E, N, k) {
    return _ ? R(E, N, k) : y(w.mode, E, N, k);
  }
  function y(w, _, E, N) {
    return e.mkdirSync(E), R(_, E, N), g(E, w);
  }
  function R(w, _, E) {
    e.readdirSync(w).forEach((N) => S(N, w, _, E));
  }
  function S(w, _, E, N) {
    const k = c.join(_, w), D = c.join(E, w), { destStat: $ } = d.checkPathsSync(k, D, "copy", N);
    return a($, k, D, N);
  }
  function T(w, _, E, N) {
    let k = e.readlinkSync(_);
    if (N.dereference && (k = c.resolve(process.cwd(), k)), w) {
      let D;
      try {
        D = e.readlinkSync(E);
      } catch ($) {
        if ($.code === "EINVAL" || $.code === "UNKNOWN") return e.symlinkSync(k, E);
        throw $;
      }
      if (N.dereference && (D = c.resolve(process.cwd(), D)), d.isSrcSubdir(k, D))
        throw new Error(`Cannot copy '${k}' to a subdirectory of itself, '${D}'.`);
      if (e.statSync(E).isDirectory() && d.isSrcSubdir(D, k))
        throw new Error(`Cannot overwrite '${D}' with '${k}'.`);
      return b(k, E);
    } else
      return e.symlinkSync(k, E);
  }
  function b(w, _) {
    return e.unlinkSync(_), e.symlinkSync(w, _);
  }
  return Di = s, Di;
}
var Li, pc;
function xo() {
  if (pc) return Li;
  pc = 1;
  const e = st().fromCallback;
  return Li = {
    copy: e(/* @__PURE__ */ fm()),
    copySync: /* @__PURE__ */ hm()
  }, Li;
}
var Fi, dc;
function mm() {
  if (dc) return Fi;
  dc = 1;
  const e = tt(), c = Pe, f = vo, l = process.platform === "win32";
  function d(u) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((m) => {
      u[m] = u[m] || e[m], m = m + "Sync", u[m] = u[m] || e[m];
    }), u.maxBusyTries = u.maxBusyTries || 3;
  }
  function s(u, g, m) {
    let v = 0;
    typeof g == "function" && (m = g, g = {}), f(u, "rimraf: missing path"), f.strictEqual(typeof u, "string", "rimraf: path should be a string"), f.strictEqual(typeof m, "function", "rimraf: callback function required"), f(g, "rimraf: invalid options argument provided"), f.strictEqual(typeof g, "object", "rimraf: options should be object"), d(g), t(u, g, function y(R) {
      if (R) {
        if ((R.code === "EBUSY" || R.code === "ENOTEMPTY" || R.code === "EPERM") && v < g.maxBusyTries) {
          v++;
          const S = v * 100;
          return setTimeout(() => t(u, g, y), S);
        }
        R.code === "ENOENT" && (R = null);
      }
      m(R);
    });
  }
  function t(u, g, m) {
    f(u), f(g), f(typeof m == "function"), g.lstat(u, (v, y) => {
      if (v && v.code === "ENOENT")
        return m(null);
      if (v && v.code === "EPERM" && l)
        return a(u, g, v, m);
      if (y && y.isDirectory())
        return n(u, g, v, m);
      g.unlink(u, (R) => {
        if (R) {
          if (R.code === "ENOENT")
            return m(null);
          if (R.code === "EPERM")
            return l ? a(u, g, R, m) : n(u, g, R, m);
          if (R.code === "EISDIR")
            return n(u, g, R, m);
        }
        return m(R);
      });
    });
  }
  function a(u, g, m, v) {
    f(u), f(g), f(typeof v == "function"), g.chmod(u, 438, (y) => {
      y ? v(y.code === "ENOENT" ? null : m) : g.stat(u, (R, S) => {
        R ? v(R.code === "ENOENT" ? null : m) : S.isDirectory() ? n(u, g, m, v) : g.unlink(u, v);
      });
    });
  }
  function r(u, g, m) {
    let v;
    f(u), f(g);
    try {
      g.chmodSync(u, 438);
    } catch (y) {
      if (y.code === "ENOENT")
        return;
      throw m;
    }
    try {
      v = g.statSync(u);
    } catch (y) {
      if (y.code === "ENOENT")
        return;
      throw m;
    }
    v.isDirectory() ? o(u, g, m) : g.unlinkSync(u);
  }
  function n(u, g, m, v) {
    f(u), f(g), f(typeof v == "function"), g.rmdir(u, (y) => {
      y && (y.code === "ENOTEMPTY" || y.code === "EEXIST" || y.code === "EPERM") ? i(u, g, v) : y && y.code === "ENOTDIR" ? v(m) : v(y);
    });
  }
  function i(u, g, m) {
    f(u), f(g), f(typeof m == "function"), g.readdir(u, (v, y) => {
      if (v) return m(v);
      let R = y.length, S;
      if (R === 0) return g.rmdir(u, m);
      y.forEach((T) => {
        s(c.join(u, T), g, (b) => {
          if (!S) {
            if (b) return m(S = b);
            --R === 0 && g.rmdir(u, m);
          }
        });
      });
    });
  }
  function p(u, g) {
    let m;
    g = g || {}, d(g), f(u, "rimraf: missing path"), f.strictEqual(typeof u, "string", "rimraf: path should be a string"), f(g, "rimraf: missing options"), f.strictEqual(typeof g, "object", "rimraf: options should be object");
    try {
      m = g.lstatSync(u);
    } catch (v) {
      if (v.code === "ENOENT")
        return;
      v.code === "EPERM" && l && r(u, g, v);
    }
    try {
      m && m.isDirectory() ? o(u, g, null) : g.unlinkSync(u);
    } catch (v) {
      if (v.code === "ENOENT")
        return;
      if (v.code === "EPERM")
        return l ? r(u, g, v) : o(u, g, v);
      if (v.code !== "EISDIR")
        throw v;
      o(u, g, v);
    }
  }
  function o(u, g, m) {
    f(u), f(g);
    try {
      g.rmdirSync(u);
    } catch (v) {
      if (v.code === "ENOTDIR")
        throw m;
      if (v.code === "ENOTEMPTY" || v.code === "EEXIST" || v.code === "EPERM")
        h(u, g);
      else if (v.code !== "ENOENT")
        throw v;
    }
  }
  function h(u, g) {
    if (f(u), f(g), g.readdirSync(u).forEach((m) => p(c.join(u, m), g)), l) {
      const m = Date.now();
      do
        try {
          return g.rmdirSync(u, g);
        } catch {
        }
      while (Date.now() - m < 500);
    } else
      return g.rmdirSync(u, g);
  }
  return Fi = s, s.sync = p, Fi;
}
var Ui, fc;
function ci() {
  if (fc) return Ui;
  fc = 1;
  const e = tt(), c = st().fromCallback, f = /* @__PURE__ */ mm();
  function l(s, t) {
    if (e.rm) return e.rm(s, { recursive: !0, force: !0 }, t);
    f(s, t);
  }
  function d(s) {
    if (e.rmSync) return e.rmSync(s, { recursive: !0, force: !0 });
    f.sync(s);
  }
  return Ui = {
    remove: c(l),
    removeSync: d
  }, Ui;
}
var $i, hc;
function gm() {
  if (hc) return $i;
  hc = 1;
  const e = st().fromPromise, c = /* @__PURE__ */ bn(), f = Pe, l = /* @__PURE__ */ bt(), d = /* @__PURE__ */ ci(), s = e(async function(r) {
    let n;
    try {
      n = await c.readdir(r);
    } catch {
      return l.mkdirs(r);
    }
    return Promise.all(n.map((i) => d.remove(f.join(r, i))));
  });
  function t(a) {
    let r;
    try {
      r = c.readdirSync(a);
    } catch {
      return l.mkdirsSync(a);
    }
    r.forEach((n) => {
      n = f.join(a, n), d.removeSync(n);
    });
  }
  return $i = {
    emptyDirSync: t,
    emptydirSync: t,
    emptyDir: s,
    emptydir: s
  }, $i;
}
var qi, mc;
function vm() {
  if (mc) return qi;
  mc = 1;
  const e = st().fromCallback, c = Pe, f = tt(), l = /* @__PURE__ */ bt();
  function d(t, a) {
    function r() {
      f.writeFile(t, "", (n) => {
        if (n) return a(n);
        a();
      });
    }
    f.stat(t, (n, i) => {
      if (!n && i.isFile()) return a();
      const p = c.dirname(t);
      f.stat(p, (o, h) => {
        if (o)
          return o.code === "ENOENT" ? l.mkdirs(p, (u) => {
            if (u) return a(u);
            r();
          }) : a(o);
        h.isDirectory() ? r() : f.readdir(p, (u) => {
          if (u) return a(u);
        });
      });
    });
  }
  function s(t) {
    let a;
    try {
      a = f.statSync(t);
    } catch {
    }
    if (a && a.isFile()) return;
    const r = c.dirname(t);
    try {
      f.statSync(r).isDirectory() || f.readdirSync(r);
    } catch (n) {
      if (n && n.code === "ENOENT") l.mkdirsSync(r);
      else throw n;
    }
    f.writeFileSync(t, "");
  }
  return qi = {
    createFile: e(d),
    createFileSync: s
  }, qi;
}
var Bi, gc;
function xm() {
  if (gc) return Bi;
  gc = 1;
  const e = st().fromCallback, c = Pe, f = tt(), l = /* @__PURE__ */ bt(), d = sn().pathExists, { areIdentical: s } = /* @__PURE__ */ wn();
  function t(r, n, i) {
    function p(o, h) {
      f.link(o, h, (u) => {
        if (u) return i(u);
        i(null);
      });
    }
    f.lstat(n, (o, h) => {
      f.lstat(r, (u, g) => {
        if (u)
          return u.message = u.message.replace("lstat", "ensureLink"), i(u);
        if (h && s(g, h)) return i(null);
        const m = c.dirname(n);
        d(m, (v, y) => {
          if (v) return i(v);
          if (y) return p(r, n);
          l.mkdirs(m, (R) => {
            if (R) return i(R);
            p(r, n);
          });
        });
      });
    });
  }
  function a(r, n) {
    let i;
    try {
      i = f.lstatSync(n);
    } catch {
    }
    try {
      const h = f.lstatSync(r);
      if (i && s(h, i)) return;
    } catch (h) {
      throw h.message = h.message.replace("lstat", "ensureLink"), h;
    }
    const p = c.dirname(n);
    return f.existsSync(p) || l.mkdirsSync(p), f.linkSync(r, n);
  }
  return Bi = {
    createLink: e(t),
    createLinkSync: a
  }, Bi;
}
var ji, vc;
function ym() {
  if (vc) return ji;
  vc = 1;
  const e = Pe, c = tt(), f = sn().pathExists;
  function l(s, t, a) {
    if (e.isAbsolute(s))
      return c.lstat(s, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), a(r)) : a(null, {
        toCwd: s,
        toDst: s
      }));
    {
      const r = e.dirname(t), n = e.join(r, s);
      return f(n, (i, p) => i ? a(i) : p ? a(null, {
        toCwd: n,
        toDst: s
      }) : c.lstat(s, (o) => o ? (o.message = o.message.replace("lstat", "ensureSymlink"), a(o)) : a(null, {
        toCwd: s,
        toDst: e.relative(r, s)
      })));
    }
  }
  function d(s, t) {
    let a;
    if (e.isAbsolute(s)) {
      if (a = c.existsSync(s), !a) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: s,
        toDst: s
      };
    } else {
      const r = e.dirname(t), n = e.join(r, s);
      if (a = c.existsSync(n), a)
        return {
          toCwd: n,
          toDst: s
        };
      if (a = c.existsSync(s), !a) throw new Error("relative srcpath does not exist");
      return {
        toCwd: s,
        toDst: e.relative(r, s)
      };
    }
  }
  return ji = {
    symlinkPaths: l,
    symlinkPathsSync: d
  }, ji;
}
var Mi, xc;
function bm() {
  if (xc) return Mi;
  xc = 1;
  const e = tt();
  function c(l, d, s) {
    if (s = typeof d == "function" ? d : s, d = typeof d == "function" ? !1 : d, d) return s(null, d);
    e.lstat(l, (t, a) => {
      if (t) return s(null, "file");
      d = a && a.isDirectory() ? "dir" : "file", s(null, d);
    });
  }
  function f(l, d) {
    let s;
    if (d) return d;
    try {
      s = e.lstatSync(l);
    } catch {
      return "file";
    }
    return s && s.isDirectory() ? "dir" : "file";
  }
  return Mi = {
    symlinkType: c,
    symlinkTypeSync: f
  }, Mi;
}
var Hi, yc;
function wm() {
  if (yc) return Hi;
  yc = 1;
  const e = st().fromCallback, c = Pe, f = /* @__PURE__ */ bn(), l = /* @__PURE__ */ bt(), d = l.mkdirs, s = l.mkdirsSync, t = /* @__PURE__ */ ym(), a = t.symlinkPaths, r = t.symlinkPathsSync, n = /* @__PURE__ */ bm(), i = n.symlinkType, p = n.symlinkTypeSync, o = sn().pathExists, { areIdentical: h } = /* @__PURE__ */ wn();
  function u(v, y, R, S) {
    S = typeof R == "function" ? R : S, R = typeof R == "function" ? !1 : R, f.lstat(y, (T, b) => {
      !T && b.isSymbolicLink() ? Promise.all([
        f.stat(v),
        f.stat(y)
      ]).then(([w, _]) => {
        if (h(w, _)) return S(null);
        g(v, y, R, S);
      }) : g(v, y, R, S);
    });
  }
  function g(v, y, R, S) {
    a(v, y, (T, b) => {
      if (T) return S(T);
      v = b.toDst, i(b.toCwd, R, (w, _) => {
        if (w) return S(w);
        const E = c.dirname(y);
        o(E, (N, k) => {
          if (N) return S(N);
          if (k) return f.symlink(v, y, _, S);
          d(E, (D) => {
            if (D) return S(D);
            f.symlink(v, y, _, S);
          });
        });
      });
    });
  }
  function m(v, y, R) {
    let S;
    try {
      S = f.lstatSync(y);
    } catch {
    }
    if (S && S.isSymbolicLink()) {
      const _ = f.statSync(v), E = f.statSync(y);
      if (h(_, E)) return;
    }
    const T = r(v, y);
    v = T.toDst, R = p(T.toCwd, R);
    const b = c.dirname(y);
    return f.existsSync(b) || s(b), f.symlinkSync(v, y, R);
  }
  return Hi = {
    createSymlink: e(u),
    createSymlinkSync: m
  }, Hi;
}
var Gi, bc;
function _m() {
  if (bc) return Gi;
  bc = 1;
  const { createFile: e, createFileSync: c } = /* @__PURE__ */ vm(), { createLink: f, createLinkSync: l } = /* @__PURE__ */ xm(), { createSymlink: d, createSymlinkSync: s } = /* @__PURE__ */ wm();
  return Gi = {
    // file
    createFile: e,
    createFileSync: c,
    ensureFile: e,
    ensureFileSync: c,
    // link
    createLink: f,
    createLinkSync: l,
    ensureLink: f,
    ensureLinkSync: l,
    // symlink
    createSymlink: d,
    createSymlinkSync: s,
    ensureSymlink: d,
    ensureSymlinkSync: s
  }, Gi;
}
var zi, wc;
function yo() {
  if (wc) return zi;
  wc = 1;
  function e(f, { EOL: l = `
`, finalEOL: d = !0, replacer: s = null, spaces: t } = {}) {
    const a = d ? l : "";
    return JSON.stringify(f, s, t).replace(/\n/g, l) + a;
  }
  function c(f) {
    return Buffer.isBuffer(f) && (f = f.toString("utf8")), f.replace(/^\uFEFF/, "");
  }
  return zi = { stringify: e, stripBom: c }, zi;
}
var Wi, _c;
function Em() {
  if (_c) return Wi;
  _c = 1;
  let e;
  try {
    e = tt();
  } catch {
    e = Ze;
  }
  const c = st(), { stringify: f, stripBom: l } = yo();
  async function d(i, p = {}) {
    typeof p == "string" && (p = { encoding: p });
    const o = p.fs || e, h = "throws" in p ? p.throws : !0;
    let u = await c.fromCallback(o.readFile)(i, p);
    u = l(u);
    let g;
    try {
      g = JSON.parse(u, p ? p.reviver : null);
    } catch (m) {
      if (h)
        throw m.message = `${i}: ${m.message}`, m;
      return null;
    }
    return g;
  }
  const s = c.fromPromise(d);
  function t(i, p = {}) {
    typeof p == "string" && (p = { encoding: p });
    const o = p.fs || e, h = "throws" in p ? p.throws : !0;
    try {
      let u = o.readFileSync(i, p);
      return u = l(u), JSON.parse(u, p.reviver);
    } catch (u) {
      if (h)
        throw u.message = `${i}: ${u.message}`, u;
      return null;
    }
  }
  async function a(i, p, o = {}) {
    const h = o.fs || e, u = f(p, o);
    await c.fromCallback(h.writeFile)(i, u, o);
  }
  const r = c.fromPromise(a);
  function n(i, p, o = {}) {
    const h = o.fs || e, u = f(p, o);
    return h.writeFileSync(i, u, o);
  }
  return Wi = {
    readFile: s,
    readFileSync: t,
    writeFile: r,
    writeFileSync: n
  }, Wi;
}
var Vi, Ec;
function Sm() {
  if (Ec) return Vi;
  Ec = 1;
  const e = Em();
  return Vi = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, Vi;
}
var Yi, Sc;
function bo() {
  if (Sc) return Yi;
  Sc = 1;
  const e = st().fromCallback, c = tt(), f = Pe, l = /* @__PURE__ */ bt(), d = sn().pathExists;
  function s(a, r, n, i) {
    typeof n == "function" && (i = n, n = "utf8");
    const p = f.dirname(a);
    d(p, (o, h) => {
      if (o) return i(o);
      if (h) return c.writeFile(a, r, n, i);
      l.mkdirs(p, (u) => {
        if (u) return i(u);
        c.writeFile(a, r, n, i);
      });
    });
  }
  function t(a, ...r) {
    const n = f.dirname(a);
    if (c.existsSync(n))
      return c.writeFileSync(a, ...r);
    l.mkdirsSync(n), c.writeFileSync(a, ...r);
  }
  return Yi = {
    outputFile: e(s),
    outputFileSync: t
  }, Yi;
}
var Ki, Tc;
function Tm() {
  if (Tc) return Ki;
  Tc = 1;
  const { stringify: e } = yo(), { outputFile: c } = /* @__PURE__ */ bo();
  async function f(l, d, s = {}) {
    const t = e(d, s);
    await c(l, t, s);
  }
  return Ki = f, Ki;
}
var Xi, Rc;
function Rm() {
  if (Rc) return Xi;
  Rc = 1;
  const { stringify: e } = yo(), { outputFileSync: c } = /* @__PURE__ */ bo();
  function f(l, d, s) {
    const t = e(d, s);
    c(l, t, s);
  }
  return Xi = f, Xi;
}
var Ji, Cc;
function Cm() {
  if (Cc) return Ji;
  Cc = 1;
  const e = st().fromPromise, c = /* @__PURE__ */ Sm();
  return c.outputJson = e(/* @__PURE__ */ Tm()), c.outputJsonSync = /* @__PURE__ */ Rm(), c.outputJSON = c.outputJson, c.outputJSONSync = c.outputJsonSync, c.writeJSON = c.writeJson, c.writeJSONSync = c.writeJsonSync, c.readJSON = c.readJson, c.readJSONSync = c.readJsonSync, Ji = c, Ji;
}
var Qi, Ac;
function Am() {
  if (Ac) return Qi;
  Ac = 1;
  const e = tt(), c = Pe, f = xo().copy, l = ci().remove, d = bt().mkdirp, s = sn().pathExists, t = /* @__PURE__ */ wn();
  function a(o, h, u, g) {
    typeof u == "function" && (g = u, u = {}), u = u || {};
    const m = u.overwrite || u.clobber || !1;
    t.checkPaths(o, h, "move", u, (v, y) => {
      if (v) return g(v);
      const { srcStat: R, isChangingCase: S = !1 } = y;
      t.checkParentPaths(o, R, h, "move", (T) => {
        if (T) return g(T);
        if (r(h)) return n(o, h, m, S, g);
        d(c.dirname(h), (b) => b ? g(b) : n(o, h, m, S, g));
      });
    });
  }
  function r(o) {
    const h = c.dirname(o);
    return c.parse(h).root === h;
  }
  function n(o, h, u, g, m) {
    if (g) return i(o, h, u, m);
    if (u)
      return l(h, (v) => v ? m(v) : i(o, h, u, m));
    s(h, (v, y) => v ? m(v) : y ? m(new Error("dest already exists.")) : i(o, h, u, m));
  }
  function i(o, h, u, g) {
    e.rename(o, h, (m) => m ? m.code !== "EXDEV" ? g(m) : p(o, h, u, g) : g());
  }
  function p(o, h, u, g) {
    f(o, h, {
      overwrite: u,
      errorOnExist: !0
    }, (v) => v ? g(v) : l(o, g));
  }
  return Qi = a, Qi;
}
var Zi, Oc;
function Om() {
  if (Oc) return Zi;
  Oc = 1;
  const e = tt(), c = Pe, f = xo().copySync, l = ci().removeSync, d = bt().mkdirpSync, s = /* @__PURE__ */ wn();
  function t(p, o, h) {
    h = h || {};
    const u = h.overwrite || h.clobber || !1, { srcStat: g, isChangingCase: m = !1 } = s.checkPathsSync(p, o, "move", h);
    return s.checkParentPathsSync(p, g, o, "move"), a(o) || d(c.dirname(o)), r(p, o, u, m);
  }
  function a(p) {
    const o = c.dirname(p);
    return c.parse(o).root === o;
  }
  function r(p, o, h, u) {
    if (u) return n(p, o, h);
    if (h)
      return l(o), n(p, o, h);
    if (e.existsSync(o)) throw new Error("dest already exists.");
    return n(p, o, h);
  }
  function n(p, o, h) {
    try {
      e.renameSync(p, o);
    } catch (u) {
      if (u.code !== "EXDEV") throw u;
      return i(p, o, h);
    }
  }
  function i(p, o, h) {
    return f(p, o, {
      overwrite: h,
      errorOnExist: !0
    }), l(p);
  }
  return Zi = t, Zi;
}
var es, kc;
function km() {
  if (kc) return es;
  kc = 1;
  const e = st().fromCallback;
  return es = {
    move: e(/* @__PURE__ */ Am()),
    moveSync: /* @__PURE__ */ Om()
  }, es;
}
var ts, Pc;
function Ft() {
  return Pc || (Pc = 1, ts = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ bn(),
    // Export extra methods:
    .../* @__PURE__ */ xo(),
    .../* @__PURE__ */ gm(),
    .../* @__PURE__ */ _m(),
    .../* @__PURE__ */ Cm(),
    .../* @__PURE__ */ bt(),
    .../* @__PURE__ */ km(),
    .../* @__PURE__ */ bo(),
    .../* @__PURE__ */ sn(),
    .../* @__PURE__ */ ci()
  }), ts;
}
var Cn = {}, Gt = {}, ns = {}, zt = {}, Ic;
function wo() {
  if (Ic) return zt;
  Ic = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.CancellationError = zt.CancellationToken = void 0;
  const e = ht;
  let c = class extends e.EventEmitter {
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
        return Promise.reject(new f());
      const s = () => {
        if (t != null)
          try {
            this.removeListener("cancel", t), t = null;
          } catch {
          }
      };
      let t = null;
      return new Promise((a, r) => {
        let n = null;
        if (t = () => {
          try {
            n != null && (n(), n = null);
          } finally {
            r(new f());
          }
        }, this.cancelled) {
          t();
          return;
        }
        this.onCancel(t), d(a, r, (i) => {
          n = i;
        });
      }).then((a) => (s(), a)).catch((a) => {
        throw s(), a;
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
  zt.CancellationToken = c;
  class f extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return zt.CancellationError = f, zt;
}
var Pr = {}, Nc;
function li() {
  if (Nc) return Pr;
  Nc = 1, Object.defineProperty(Pr, "__esModule", { value: !0 }), Pr.newError = e;
  function e(c, f) {
    const l = new Error(c);
    return l.code = f, l;
  }
  return Pr;
}
var We = {}, Ir = { exports: {} }, Nr = { exports: {} }, rs, Dc;
function Pm() {
  if (Dc) return rs;
  Dc = 1;
  var e = 1e3, c = e * 60, f = c * 60, l = f * 24, d = l * 7, s = l * 365.25;
  rs = function(i, p) {
    p = p || {};
    var o = typeof i;
    if (o === "string" && i.length > 0)
      return t(i);
    if (o === "number" && isFinite(i))
      return p.long ? r(i) : a(i);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(i)
    );
  };
  function t(i) {
    if (i = String(i), !(i.length > 100)) {
      var p = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        i
      );
      if (p) {
        var o = parseFloat(p[1]), h = (p[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return o * s;
          case "weeks":
          case "week":
          case "w":
            return o * d;
          case "days":
          case "day":
          case "d":
            return o * l;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return o * f;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return o * c;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return o * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return o;
          default:
            return;
        }
      }
    }
  }
  function a(i) {
    var p = Math.abs(i);
    return p >= l ? Math.round(i / l) + "d" : p >= f ? Math.round(i / f) + "h" : p >= c ? Math.round(i / c) + "m" : p >= e ? Math.round(i / e) + "s" : i + "ms";
  }
  function r(i) {
    var p = Math.abs(i);
    return p >= l ? n(i, p, l, "day") : p >= f ? n(i, p, f, "hour") : p >= c ? n(i, p, c, "minute") : p >= e ? n(i, p, e, "second") : i + " ms";
  }
  function n(i, p, o, h) {
    var u = p >= o * 1.5;
    return Math.round(i / o) + " " + h + (u ? "s" : "");
  }
  return rs;
}
var is, Lc;
function Md() {
  if (Lc) return is;
  Lc = 1;
  function e(c) {
    l.debug = l, l.default = l, l.coerce = n, l.disable = a, l.enable = s, l.enabled = r, l.humanize = Pm(), l.destroy = i, Object.keys(c).forEach((p) => {
      l[p] = c[p];
    }), l.names = [], l.skips = [], l.formatters = {};
    function f(p) {
      let o = 0;
      for (let h = 0; h < p.length; h++)
        o = (o << 5) - o + p.charCodeAt(h), o |= 0;
      return l.colors[Math.abs(o) % l.colors.length];
    }
    l.selectColor = f;
    function l(p) {
      let o, h = null, u, g;
      function m(...v) {
        if (!m.enabled)
          return;
        const y = m, R = Number(/* @__PURE__ */ new Date()), S = R - (o || R);
        y.diff = S, y.prev = o, y.curr = R, o = R, v[0] = l.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let T = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (w, _) => {
          if (w === "%%")
            return "%";
          T++;
          const E = l.formatters[_];
          if (typeof E == "function") {
            const N = v[T];
            w = E.call(y, N), v.splice(T, 1), T--;
          }
          return w;
        }), l.formatArgs.call(y, v), (y.log || l.log).apply(y, v);
      }
      return m.namespace = p, m.useColors = l.useColors(), m.color = l.selectColor(p), m.extend = d, m.destroy = l.destroy, Object.defineProperty(m, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (u !== l.namespaces && (u = l.namespaces, g = l.enabled(p)), g),
        set: (v) => {
          h = v;
        }
      }), typeof l.init == "function" && l.init(m), m;
    }
    function d(p, o) {
      const h = l(this.namespace + (typeof o > "u" ? ":" : o) + p);
      return h.log = this.log, h;
    }
    function s(p) {
      l.save(p), l.namespaces = p, l.names = [], l.skips = [];
      const o = (typeof p == "string" ? p : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const h of o)
        h[0] === "-" ? l.skips.push(h.slice(1)) : l.names.push(h);
    }
    function t(p, o) {
      let h = 0, u = 0, g = -1, m = 0;
      for (; h < p.length; )
        if (u < o.length && (o[u] === p[h] || o[u] === "*"))
          o[u] === "*" ? (g = u, m = h, u++) : (h++, u++);
        else if (g !== -1)
          u = g + 1, m++, h = m;
        else
          return !1;
      for (; u < o.length && o[u] === "*"; )
        u++;
      return u === o.length;
    }
    function a() {
      const p = [
        ...l.names,
        ...l.skips.map((o) => "-" + o)
      ].join(",");
      return l.enable(""), p;
    }
    function r(p) {
      for (const o of l.skips)
        if (t(p, o))
          return !1;
      for (const o of l.names)
        if (t(p, o))
          return !0;
      return !1;
    }
    function n(p) {
      return p instanceof Error ? p.stack || p.message : p;
    }
    function i() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return l.enable(l.load()), l;
  }
  return is = e, is;
}
var Fc;
function Im() {
  return Fc || (Fc = 1, (function(e, c) {
    c.formatArgs = l, c.save = d, c.load = s, c.useColors = f, c.storage = t(), c.destroy = /* @__PURE__ */ (() => {
      let r = !1;
      return () => {
        r || (r = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), c.colors = [
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
    function f() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let r;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (r = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(r[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function l(r) {
      if (r[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + r[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const n = "color: " + this.color;
      r.splice(1, 0, n, "color: inherit");
      let i = 0, p = 0;
      r[0].replace(/%[a-zA-Z%]/g, (o) => {
        o !== "%%" && (i++, o === "%c" && (p = i));
      }), r.splice(p, 0, n);
    }
    c.log = console.debug || console.log || (() => {
    });
    function d(r) {
      try {
        r ? c.storage.setItem("debug", r) : c.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let r;
      try {
        r = c.storage.getItem("debug") || c.storage.getItem("DEBUG");
      } catch {
      }
      return !r && typeof process < "u" && "env" in process && (r = process.env.DEBUG), r;
    }
    function t() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Md()(c);
    const { formatters: a } = e.exports;
    a.j = function(r) {
      try {
        return JSON.stringify(r);
      } catch (n) {
        return "[UnexpectedJSONParseError]: " + n.message;
      }
    };
  })(Nr, Nr.exports)), Nr.exports;
}
var Dr = { exports: {} }, ss, Uc;
function Nm() {
  return Uc || (Uc = 1, ss = (e, c = process.argv) => {
    const f = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", l = c.indexOf(f + e), d = c.indexOf("--");
    return l !== -1 && (d === -1 || l < d);
  }), ss;
}
var as, $c;
function Dm() {
  if ($c) return as;
  $c = 1;
  const e = mr, c = qd, f = Nm(), { env: l } = process;
  let d;
  f("no-color") || f("no-colors") || f("color=false") || f("color=never") ? d = 0 : (f("color") || f("colors") || f("color=true") || f("color=always")) && (d = 1), "FORCE_COLOR" in l && (l.FORCE_COLOR === "true" ? d = 1 : l.FORCE_COLOR === "false" ? d = 0 : d = l.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(l.FORCE_COLOR, 10), 3));
  function s(r) {
    return r === 0 ? !1 : {
      level: r,
      hasBasic: !0,
      has256: r >= 2,
      has16m: r >= 3
    };
  }
  function t(r, n) {
    if (d === 0)
      return 0;
    if (f("color=16m") || f("color=full") || f("color=truecolor"))
      return 3;
    if (f("color=256"))
      return 2;
    if (r && !n && d === void 0)
      return 0;
    const i = d || 0;
    if (l.TERM === "dumb")
      return i;
    if (process.platform === "win32") {
      const p = e.release().split(".");
      return Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in l)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((p) => p in l) || l.CI_NAME === "codeship" ? 1 : i;
    if ("TEAMCITY_VERSION" in l)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(l.TEAMCITY_VERSION) ? 1 : 0;
    if (l.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in l) {
      const p = parseInt((l.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (l.TERM_PROGRAM) {
        case "iTerm.app":
          return p >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(l.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(l.TERM) || "COLORTERM" in l ? 1 : i;
  }
  function a(r) {
    const n = t(r, r && r.isTTY);
    return s(n);
  }
  return as = {
    supportsColor: a,
    stdout: s(t(!0, c.isatty(1))),
    stderr: s(t(!0, c.isatty(2)))
  }, as;
}
var qc;
function Lm() {
  return qc || (qc = 1, (function(e, c) {
    const f = qd, l = oi;
    c.init = i, c.log = a, c.formatArgs = s, c.save = r, c.load = n, c.useColors = d, c.destroy = l.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), c.colors = [6, 2, 3, 4, 5, 1];
    try {
      const o = Dm();
      o && (o.stderr || o).level >= 2 && (c.colors = [
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
    c.inspectOpts = Object.keys(process.env).filter((o) => /^debug_/i.test(o)).reduce((o, h) => {
      const u = h.substring(6).toLowerCase().replace(/_([a-z])/g, (m, v) => v.toUpperCase());
      let g = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(g) ? g = !0 : /^(no|off|false|disabled)$/i.test(g) ? g = !1 : g === "null" ? g = null : g = Number(g), o[u] = g, o;
    }, {});
    function d() {
      return "colors" in c.inspectOpts ? !!c.inspectOpts.colors : f.isatty(process.stderr.fd);
    }
    function s(o) {
      const { namespace: h, useColors: u } = this;
      if (u) {
        const g = this.color, m = "\x1B[3" + (g < 8 ? g : "8;5;" + g), v = `  ${m};1m${h} \x1B[0m`;
        o[0] = v + o[0].split(`
`).join(`
` + v), o.push(m + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        o[0] = t() + h + " " + o[0];
    }
    function t() {
      return c.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...o) {
      return process.stderr.write(l.formatWithOptions(c.inspectOpts, ...o) + `
`);
    }
    function r(o) {
      o ? process.env.DEBUG = o : delete process.env.DEBUG;
    }
    function n() {
      return process.env.DEBUG;
    }
    function i(o) {
      o.inspectOpts = {};
      const h = Object.keys(c.inspectOpts);
      for (let u = 0; u < h.length; u++)
        o.inspectOpts[h[u]] = c.inspectOpts[h[u]];
    }
    e.exports = Md()(c);
    const { formatters: p } = e.exports;
    p.o = function(o) {
      return this.inspectOpts.colors = this.useColors, l.inspect(o, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, p.O = function(o) {
      return this.inspectOpts.colors = this.useColors, l.inspect(o, this.inspectOpts);
    };
  })(Dr, Dr.exports)), Dr.exports;
}
var Bc;
function je() {
  return Bc || (Bc = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Ir.exports = Im() : Ir.exports = Lm()), Ir.exports;
}
var An = {}, jc;
function Hd() {
  if (jc) return An;
  jc = 1, Object.defineProperty(An, "__esModule", { value: !0 }), An.ProgressCallbackTransform = void 0;
  const e = et;
  let c = class extends e.Transform {
    constructor(l, d, s) {
      super(), this.total = l, this.cancellationToken = d, this.onProgress = s, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(l, d, s) {
      if (this.cancellationToken.cancelled) {
        s(new Error("cancelled"), null);
        return;
      }
      this.transferred += l.length, this.delta += l.length;
      const t = Date.now();
      t >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = t + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((t - this.start) / 1e3))
      }), this.delta = 0), s(null, l);
    }
    _flush(l) {
      if (this.cancellationToken.cancelled) {
        l(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, l(null);
    }
  };
  return An.ProgressCallbackTransform = c, An;
}
var Mc;
function Fm() {
  if (Mc) return We;
  Mc = 1, Object.defineProperty(We, "__esModule", { value: !0 }), We.DigestTransform = We.HttpExecutor = We.HttpError = void 0, We.createHttpError = n, We.parseJson = o, We.configureRequestOptionsFromUrl = u, We.configureRequestUrl = g, We.safeGetHeader = y, We.configureRequestOptions = S, We.safeStringifyJson = T;
  const e = yt, c = je(), f = Ze, l = et, d = rn, s = wo(), t = li(), a = Hd(), r = (0, c.default)("electron-builder");
  function n(b, w = null) {
    return new p(b.statusCode || -1, `${b.statusCode} ${b.statusMessage}` + (w == null ? "" : `
` + JSON.stringify(w, null, "  ")) + `
Headers: ` + T(b.headers), w);
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
  class p extends Error {
    constructor(w, _ = `HTTP error: ${i.get(w) || w}`, E = null) {
      super(_), this.statusCode = w, this.description = E, this.name = "HttpError", this.code = `HTTP_ERROR_${w}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  We.HttpError = p;
  function o(b) {
    return b.then((w) => w == null || w.length === 0 ? null : JSON.parse(w));
  }
  class h {
    constructor() {
      this.maxRedirects = 10;
    }
    request(w, _ = new s.CancellationToken(), E) {
      S(w);
      const N = E == null ? void 0 : JSON.stringify(E), k = N ? Buffer.from(N) : void 0;
      if (k != null) {
        r(N);
        const { headers: D, ...$ } = w;
        w = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": k.length,
            ...D
          },
          ...$
        };
      }
      return this.doApiRequest(w, _, (D) => D.end(k));
    }
    doApiRequest(w, _, E, N = 0) {
      return r.enabled && r(`Request: ${T(w)}`), _.createPromise((k, D, $) => {
        const C = this.createRequest(w, (I) => {
          try {
            this.handleResponse(I, w, _, k, D, N, E);
          } catch (F) {
            D(F);
          }
        });
        this.addErrorAndTimeoutHandlers(C, D, w.timeout), this.addRedirectHandlers(C, w, D, N, (I) => {
          this.doApiRequest(I, _, E, N).then(k).catch(D);
        }), E(C, D), $(() => C.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(w, _, E, N, k) {
    }
    addErrorAndTimeoutHandlers(w, _, E = 60 * 1e3) {
      this.addTimeOutHandler(w, _, E), w.on("error", _), w.on("aborted", () => {
        _(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(w, _, E, N, k, D, $) {
      var C;
      if (r.enabled && r(`Response: ${w.statusCode} ${w.statusMessage}, request options: ${T(_)}`), w.statusCode === 404) {
        k(n(w, `method: ${_.method || "GET"} url: ${_.protocol || "https:"}//${_.hostname}${_.port ? `:${_.port}` : ""}${_.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (w.statusCode === 204) {
        N();
        return;
      }
      const I = (C = w.statusCode) !== null && C !== void 0 ? C : 0, F = I >= 300 && I < 400, U = y(w, "location");
      if (F && U != null) {
        if (D > this.maxRedirects) {
          k(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(h.prepareRedirectUrlOptions(U, _), E, $, D).then(N).catch(k);
        return;
      }
      w.setEncoding("utf8");
      let G = "";
      w.on("error", k), w.on("data", (W) => G += W), w.on("end", () => {
        try {
          if (w.statusCode != null && w.statusCode >= 400) {
            const W = y(w, "content-type"), re = W != null && (Array.isArray(W) ? W.find((ae) => ae.includes("json")) != null : W.includes("json"));
            k(n(w, `method: ${_.method || "GET"} url: ${_.protocol || "https:"}//${_.hostname}${_.port ? `:${_.port}` : ""}${_.path}

          Data:
          ${re ? JSON.stringify(JSON.parse(G)) : G}
          `));
          } else
            N(G.length === 0 ? null : G);
        } catch (W) {
          k(W);
        }
      });
    }
    async downloadToBuffer(w, _) {
      return await _.cancellationToken.createPromise((E, N, k) => {
        const D = [], $ = {
          headers: _.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        g(w, $), S($), this.doDownload($, {
          destination: null,
          options: _,
          onCancel: k,
          callback: (C) => {
            C == null ? E(Buffer.concat(D)) : N(C);
          },
          responseHandler: (C, I) => {
            let F = 0;
            C.on("data", (U) => {
              if (F += U.length, F > 524288e3) {
                I(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              D.push(U);
            }), C.on("end", () => {
              I(null);
            });
          }
        }, 0);
      });
    }
    doDownload(w, _, E) {
      const N = this.createRequest(w, (k) => {
        if (k.statusCode >= 400) {
          _.callback(new Error(`Cannot download "${w.protocol || "https:"}//${w.hostname}${w.path}", status ${k.statusCode}: ${k.statusMessage}`));
          return;
        }
        k.on("error", _.callback);
        const D = y(k, "location");
        if (D != null) {
          E < this.maxRedirects ? this.doDownload(h.prepareRedirectUrlOptions(D, w), _, E++) : _.callback(this.createMaxRedirectError());
          return;
        }
        _.responseHandler == null ? R(_, k) : _.responseHandler(k, _.callback);
      });
      this.addErrorAndTimeoutHandlers(N, _.callback, w.timeout), this.addRedirectHandlers(N, w, _.callback, E, (k) => {
        this.doDownload(k, _, E++);
      }), N.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(w, _, E) {
      w.on("socket", (N) => {
        N.setTimeout(E, () => {
          w.abort(), _(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(w, _) {
      const E = u(w, { ..._ }), N = E.headers;
      if (N != null && N.authorization) {
        const k = new d.URL(w);
        (k.hostname.endsWith(".amazonaws.com") || k.searchParams.has("X-Amz-Credential")) && delete N.authorization;
      }
      return E;
    }
    static retryOnServerError(w, _ = 3) {
      for (let E = 0; ; E++)
        try {
          return w();
        } catch (N) {
          if (E < _ && (N instanceof p && N.isServerError() || N.code === "EPIPE"))
            continue;
          throw N;
        }
    }
  }
  We.HttpExecutor = h;
  function u(b, w) {
    const _ = S(w);
    return g(new d.URL(b), _), _;
  }
  function g(b, w) {
    w.protocol = b.protocol, w.hostname = b.hostname, b.port ? w.port = b.port : w.port && delete w.port, w.path = b.pathname + b.search;
  }
  class m extends l.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(w, _ = "sha512", E = "base64") {
      super(), this.expected = w, this.algorithm = _, this.encoding = E, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, e.createHash)(_);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(w, _, E) {
      this.digester.update(w), E(null, w);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(w) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (_) {
          w(_);
          return;
        }
      w(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, t.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, t.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  We.DigestTransform = m;
  function v(b, w, _) {
    return b != null && w != null && b !== w ? (_(new Error(`checksum mismatch: expected ${w} but got ${b} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function y(b, w) {
    const _ = b.headers[w];
    return _ == null ? null : Array.isArray(_) ? _.length === 0 ? null : _[_.length - 1] : _;
  }
  function R(b, w) {
    if (!v(y(w, "X-Checksum-Sha2"), b.options.sha2, b.callback))
      return;
    const _ = [];
    if (b.options.onProgress != null) {
      const D = y(w, "content-length");
      D != null && _.push(new a.ProgressCallbackTransform(parseInt(D, 10), b.options.cancellationToken, b.options.onProgress));
    }
    const E = b.options.sha512;
    E != null ? _.push(new m(E, "sha512", E.length === 128 && !E.includes("+") && !E.includes("Z") && !E.includes("=") ? "hex" : "base64")) : b.options.sha2 != null && _.push(new m(b.options.sha2, "sha256", "hex"));
    const N = (0, f.createWriteStream)(b.destination);
    _.push(N);
    let k = w;
    for (const D of _)
      D.on("error", ($) => {
        N.close(), b.options.cancellationToken.cancelled || b.callback($);
      }), k = k.pipe(D);
    N.on("finish", () => {
      N.close(b.callback);
    });
  }
  function S(b, w, _) {
    _ != null && (b.method = _), b.headers = { ...b.headers };
    const E = b.headers;
    return w != null && (E.authorization = w.startsWith("Basic") || w.startsWith("Bearer") ? w : `token ${w}`), E["User-Agent"] == null && (E["User-Agent"] = "electron-builder"), (_ == null || _ === "GET" || E["Cache-Control"] == null) && (E["Cache-Control"] = "no-cache"), b.protocol == null && process.versions.electron != null && (b.protocol = "https:"), b;
  }
  function T(b, w) {
    return JSON.stringify(b, (_, E) => _.endsWith("Authorization") || _.endsWith("authorization") || _.endsWith("Password") || _.endsWith("PASSWORD") || _.endsWith("Token") || _.includes("password") || _.includes("token") || w != null && w.has(_) ? "<stripped sensitive data>" : E, 2);
  }
  return We;
}
var On = {}, Hc;
function Um() {
  if (Hc) return On;
  Hc = 1, Object.defineProperty(On, "__esModule", { value: !0 }), On.MemoLazy = void 0;
  let e = class {
    constructor(l, d) {
      this.selector = l, this.creator = d, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const l = this.selector();
      if (this._value !== void 0 && c(this.selected, l))
        return this._value;
      this.selected = l;
      const d = this.creator(l);
      return this.value = d, d;
    }
    set value(l) {
      this._value = l;
    }
  };
  On.MemoLazy = e;
  function c(f, l) {
    if (typeof f == "object" && f !== null && (typeof l == "object" && l !== null)) {
      const t = Object.keys(f), a = Object.keys(l);
      return t.length === a.length && t.every((r) => c(f[r], l[r]));
    }
    return f === l;
  }
  return On;
}
var kn = {}, Gc;
function $m() {
  if (Gc) return kn;
  Gc = 1, Object.defineProperty(kn, "__esModule", { value: !0 }), kn.githubUrl = e, kn.getS3LikeProviderBaseUrl = c;
  function e(s, t = "github.com") {
    return `${s.protocol || "https"}://${s.host || t}`;
  }
  function c(s) {
    const t = s.provider;
    if (t === "s3")
      return f(s);
    if (t === "spaces")
      return d(s);
    throw new Error(`Not supported provider: ${t}`);
  }
  function f(s) {
    let t;
    if (s.accelerate == !0)
      t = `https://${s.bucket}.s3-accelerate.amazonaws.com`;
    else if (s.endpoint != null)
      t = `${s.endpoint}/${s.bucket}`;
    else if (s.bucket.includes(".")) {
      if (s.region == null)
        throw new Error(`Bucket name "${s.bucket}" includes a dot, but S3 region is missing`);
      s.region === "us-east-1" ? t = `https://s3.amazonaws.com/${s.bucket}` : t = `https://s3-${s.region}.amazonaws.com/${s.bucket}`;
    } else s.region === "cn-north-1" ? t = `https://${s.bucket}.s3.${s.region}.amazonaws.com.cn` : t = `https://${s.bucket}.s3.amazonaws.com`;
    return l(t, s.path);
  }
  function l(s, t) {
    return t != null && t.length > 0 && (t.startsWith("/") || (s += "/"), s += t), s;
  }
  function d(s) {
    if (s.name == null)
      throw new Error("name is missing");
    if (s.region == null)
      throw new Error("region is missing");
    return l(`https://${s.name}.${s.region}.digitaloceanspaces.com`, s.path);
  }
  return kn;
}
var Lr = {}, zc;
function qm() {
  if (zc) return Lr;
  zc = 1, Object.defineProperty(Lr, "__esModule", { value: !0 }), Lr.retry = c;
  const e = wo();
  async function c(f, l, d, s = 0, t = 0, a) {
    var r;
    const n = new e.CancellationToken();
    try {
      return await f();
    } catch (i) {
      if ((!((r = a == null ? void 0 : a(i)) !== null && r !== void 0) || r) && l > 0 && !n.cancelled)
        return await new Promise((p) => setTimeout(p, d + s * t)), await c(f, l - 1, d, s, t + 1, a);
      throw i;
    }
  }
  return Lr;
}
var Fr = {}, Wc;
function Bm() {
  if (Wc) return Fr;
  Wc = 1, Object.defineProperty(Fr, "__esModule", { value: !0 }), Fr.parseDn = e;
  function e(c) {
    let f = !1, l = null, d = "", s = 0;
    c = c.trim();
    const t = /* @__PURE__ */ new Map();
    for (let a = 0; a <= c.length; a++) {
      if (a === c.length) {
        l !== null && t.set(l, d);
        break;
      }
      const r = c[a];
      if (f) {
        if (r === '"') {
          f = !1;
          continue;
        }
      } else {
        if (r === '"') {
          f = !0;
          continue;
        }
        if (r === "\\") {
          a++;
          const n = parseInt(c.slice(a, a + 2), 16);
          Number.isNaN(n) ? d += c[a] : (a++, d += String.fromCharCode(n));
          continue;
        }
        if (l === null && r === "=") {
          l = d, d = "";
          continue;
        }
        if (r === "," || r === ";" || r === "+") {
          l !== null && t.set(l, d), l = null, d = "";
          continue;
        }
      }
      if (r === " " && !f) {
        if (d.length === 0)
          continue;
        if (a > s) {
          let n = a;
          for (; c[n] === " "; )
            n++;
          s = n;
        }
        if (s >= c.length || c[s] === "," || c[s] === ";" || l === null && c[s] === "=" || l !== null && c[s] === "+") {
          a = s - 1;
          continue;
        }
      }
      d += r;
    }
    return t;
  }
  return Fr;
}
var Wt = {}, Vc;
function jm() {
  if (Vc) return Wt;
  Vc = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.nil = Wt.UUID = void 0;
  const e = yt, c = li(), f = "options.name must be either a string or a Buffer", l = (0, e.randomBytes)(16);
  l[0] = l[0] | 1;
  const d = {}, s = [];
  for (let p = 0; p < 256; p++) {
    const o = (p + 256).toString(16).substr(1);
    d[o] = p, s[p] = o;
  }
  class t {
    constructor(o) {
      this.ascii = null, this.binary = null;
      const h = t.check(o);
      if (!h)
        throw new Error("not a UUID");
      this.version = h.version, h.format === "ascii" ? this.ascii = o : this.binary = o;
    }
    static v5(o, h) {
      return n(o, "sha1", 80, h);
    }
    toString() {
      return this.ascii == null && (this.ascii = i(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(o, h = 0) {
      if (typeof o == "string")
        return o = o.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(o) ? o === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (d[o[14] + o[15]] & 240) >> 4,
          variant: a((d[o[19] + o[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(o)) {
        if (o.length < h + 16)
          return !1;
        let u = 0;
        for (; u < 16 && o[h + u] === 0; u++)
          ;
        return u === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (o[h + 6] & 240) >> 4,
          variant: a((o[h + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, c.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(o) {
      const h = Buffer.allocUnsafe(16);
      let u = 0;
      for (let g = 0; g < 16; g++)
        h[g] = d[o[u++] + o[u++]], (g === 3 || g === 5 || g === 7 || g === 9) && (u += 1);
      return h;
    }
  }
  Wt.UUID = t, t.OID = t.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function a(p) {
    switch (p) {
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
  var r;
  (function(p) {
    p[p.ASCII = 0] = "ASCII", p[p.BINARY = 1] = "BINARY", p[p.OBJECT = 2] = "OBJECT";
  })(r || (r = {}));
  function n(p, o, h, u, g = r.ASCII) {
    const m = (0, e.createHash)(o);
    if (typeof p != "string" && !Buffer.isBuffer(p))
      throw (0, c.newError)(f, "ERR_INVALID_UUID_NAME");
    m.update(u), m.update(p);
    const y = m.digest();
    let R;
    switch (g) {
      case r.BINARY:
        y[6] = y[6] & 15 | h, y[8] = y[8] & 63 | 128, R = y;
        break;
      case r.OBJECT:
        y[6] = y[6] & 15 | h, y[8] = y[8] & 63 | 128, R = new t(y);
        break;
      default:
        R = s[y[0]] + s[y[1]] + s[y[2]] + s[y[3]] + "-" + s[y[4]] + s[y[5]] + "-" + s[y[6] & 15 | h] + s[y[7]] + "-" + s[y[8] & 63 | 128] + s[y[9]] + "-" + s[y[10]] + s[y[11]] + s[y[12]] + s[y[13]] + s[y[14]] + s[y[15]];
        break;
    }
    return R;
  }
  function i(p) {
    return s[p[0]] + s[p[1]] + s[p[2]] + s[p[3]] + "-" + s[p[4]] + s[p[5]] + "-" + s[p[6]] + s[p[7]] + "-" + s[p[8]] + s[p[9]] + "-" + s[p[10]] + s[p[11]] + s[p[12]] + s[p[13]] + s[p[14]] + s[p[15]];
  }
  return Wt.nil = new t("00000000-0000-0000-0000-000000000000"), Wt;
}
var un = {}, os = {}, Yc;
function Mm() {
  return Yc || (Yc = 1, (function(e) {
    (function(c) {
      c.parser = function(O, A) {
        return new l(O, A);
      }, c.SAXParser = l, c.SAXStream = i, c.createStream = n, c.MAX_BUFFER_LENGTH = 64 * 1024;
      var f = [
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
      c.EVENTS = [
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
      function l(O, A) {
        if (!(this instanceof l))
          return new l(O, A);
        var z = this;
        s(z), z.q = z.c = "", z.bufferCheckPosition = c.MAX_BUFFER_LENGTH, z.opt = A || {}, z.opt.lowercase = z.opt.lowercase || z.opt.lowercasetags, z.looseCase = z.opt.lowercase ? "toLowerCase" : "toUpperCase", z.tags = [], z.closed = z.closedRoot = z.sawRoot = !1, z.tag = z.error = null, z.strict = !!O, z.noscript = !!(O || z.opt.noscript), z.state = E.BEGIN, z.strictEntities = z.opt.strictEntities, z.ENTITIES = z.strictEntities ? Object.create(c.XML_ENTITIES) : Object.create(c.ENTITIES), z.attribList = [], z.opt.xmlns && (z.ns = Object.create(g)), z.opt.unquotedAttributeValues === void 0 && (z.opt.unquotedAttributeValues = !O), z.trackPosition = z.opt.position !== !1, z.trackPosition && (z.position = z.line = z.column = 0), k(z, "onready");
      }
      Object.create || (Object.create = function(O) {
        function A() {
        }
        A.prototype = O;
        var z = new A();
        return z;
      }), Object.keys || (Object.keys = function(O) {
        var A = [];
        for (var z in O) O.hasOwnProperty(z) && A.push(z);
        return A;
      });
      function d(O) {
        for (var A = Math.max(c.MAX_BUFFER_LENGTH, 10), z = 0, q = 0, me = f.length; q < me; q++) {
          var be = O[f[q]].length;
          if (be > A)
            switch (f[q]) {
              case "textNode":
                $(O);
                break;
              case "cdata":
                D(O, "oncdata", O.cdata), O.cdata = "";
                break;
              case "script":
                D(O, "onscript", O.script), O.script = "";
                break;
              default:
                I(O, "Max buffer length exceeded: " + f[q]);
            }
          z = Math.max(z, be);
        }
        var we = c.MAX_BUFFER_LENGTH - z;
        O.bufferCheckPosition = we + O.position;
      }
      function s(O) {
        for (var A = 0, z = f.length; A < z; A++)
          O[f[A]] = "";
      }
      function t(O) {
        $(O), O.cdata !== "" && (D(O, "oncdata", O.cdata), O.cdata = ""), O.script !== "" && (D(O, "onscript", O.script), O.script = "");
      }
      l.prototype = {
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
      var r = c.EVENTS.filter(function(O) {
        return O !== "error" && O !== "end";
      });
      function n(O, A) {
        return new i(O, A);
      }
      function i(O, A) {
        if (!(this instanceof i))
          return new i(O, A);
        a.apply(this), this._parser = new l(O, A), this.writable = !0, this.readable = !0;
        var z = this;
        this._parser.onend = function() {
          z.emit("end");
        }, this._parser.onerror = function(q) {
          z.emit("error", q), z._parser.error = null;
        }, this._decoder = null, r.forEach(function(q) {
          Object.defineProperty(z, "on" + q, {
            get: function() {
              return z._parser["on" + q];
            },
            set: function(me) {
              if (!me)
                return z.removeAllListeners(q), z._parser["on" + q] = me, me;
              z.on(q, me);
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
      }), i.prototype.write = function(O) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(O)) {
          if (!this._decoder) {
            var A = Qh.StringDecoder;
            this._decoder = new A("utf8");
          }
          O = this._decoder.write(O);
        }
        return this._parser.write(O.toString()), this.emit("data", O), !0;
      }, i.prototype.end = function(O) {
        return O && O.length && this.write(O), this._parser.end(), !0;
      }, i.prototype.on = function(O, A) {
        var z = this;
        return !z._parser["on" + O] && r.indexOf(O) !== -1 && (z._parser["on" + O] = function() {
          var q = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          q.splice(0, 0, O), z.emit.apply(z, q);
        }), a.prototype.on.call(z, O, A);
      };
      var p = "[CDATA[", o = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", u = "http://www.w3.org/2000/xmlns/", g = { xml: h, xmlns: u }, m = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, v = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, y = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, R = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function S(O) {
        return O === " " || O === `
` || O === "\r" || O === "	";
      }
      function T(O) {
        return O === '"' || O === "'";
      }
      function b(O) {
        return O === ">" || S(O);
      }
      function w(O, A) {
        return O.test(A);
      }
      function _(O, A) {
        return !w(O, A);
      }
      var E = 0;
      c.STATE = {
        BEGIN: E++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: E++,
        // leading whitespace
        TEXT: E++,
        // general stuff
        TEXT_ENTITY: E++,
        // &amp and such.
        OPEN_WAKA: E++,
        // <
        SGML_DECL: E++,
        // <!BLARG
        SGML_DECL_QUOTED: E++,
        // <!BLARG foo "bar
        DOCTYPE: E++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: E++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: E++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: E++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: E++,
        // <!-
        COMMENT: E++,
        // <!--
        COMMENT_ENDING: E++,
        // <!-- blah -
        COMMENT_ENDED: E++,
        // <!-- blah --
        CDATA: E++,
        // <![CDATA[ something
        CDATA_ENDING: E++,
        // ]
        CDATA_ENDING_2: E++,
        // ]]
        PROC_INST: E++,
        // <?hi
        PROC_INST_BODY: E++,
        // <?hi there
        PROC_INST_ENDING: E++,
        // <?hi "there" ?
        OPEN_TAG: E++,
        // <strong
        OPEN_TAG_SLASH: E++,
        // <strong /
        ATTRIB: E++,
        // <a
        ATTRIB_NAME: E++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: E++,
        // <a foo _
        ATTRIB_VALUE: E++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: E++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: E++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: E++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: E++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: E++,
        // <foo bar=&quot
        CLOSE_TAG: E++,
        // </a
        CLOSE_TAG_SAW_WHITE: E++,
        // </a   >
        SCRIPT: E++,
        // <script> ...
        SCRIPT_ENDING: E++
        // <script> ... <
      }, c.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, c.ENTITIES = {
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
      }, Object.keys(c.ENTITIES).forEach(function(O) {
        var A = c.ENTITIES[O], z = typeof A == "number" ? String.fromCharCode(A) : A;
        c.ENTITIES[O] = z;
      });
      for (var N in c.STATE)
        c.STATE[c.STATE[N]] = N;
      E = c.STATE;
      function k(O, A, z) {
        O[A] && O[A](z);
      }
      function D(O, A, z) {
        O.textNode && $(O), k(O, A, z);
      }
      function $(O) {
        O.textNode = C(O.opt, O.textNode), O.textNode && k(O, "ontext", O.textNode), O.textNode = "";
      }
      function C(O, A) {
        return O.trim && (A = A.trim()), O.normalize && (A = A.replace(/\s+/g, " ")), A;
      }
      function I(O, A) {
        return $(O), O.trackPosition && (A += `
Line: ` + O.line + `
Column: ` + O.column + `
Char: ` + O.c), A = new Error(A), O.error = A, k(O, "onerror", A), O;
      }
      function F(O) {
        return O.sawRoot && !O.closedRoot && U(O, "Unclosed root tag"), O.state !== E.BEGIN && O.state !== E.BEGIN_WHITESPACE && O.state !== E.TEXT && I(O, "Unexpected end"), $(O), O.c = "", O.closed = !0, k(O, "onend"), l.call(O, O.strict, O.opt), O;
      }
      function U(O, A) {
        if (typeof O != "object" || !(O instanceof l))
          throw new Error("bad call to strictFail");
        O.strict && I(O, A);
      }
      function G(O) {
        O.strict || (O.tagName = O.tagName[O.looseCase]());
        var A = O.tags[O.tags.length - 1] || O, z = O.tag = { name: O.tagName, attributes: {} };
        O.opt.xmlns && (z.ns = A.ns), O.attribList.length = 0, D(O, "onopentagstart", z);
      }
      function W(O, A) {
        var z = O.indexOf(":"), q = z < 0 ? ["", O] : O.split(":"), me = q[0], be = q[1];
        return A && O === "xmlns" && (me = "xmlns", be = ""), { prefix: me, local: be };
      }
      function re(O) {
        if (O.strict || (O.attribName = O.attribName[O.looseCase]()), O.attribList.indexOf(O.attribName) !== -1 || O.tag.attributes.hasOwnProperty(O.attribName)) {
          O.attribName = O.attribValue = "";
          return;
        }
        if (O.opt.xmlns) {
          var A = W(O.attribName, !0), z = A.prefix, q = A.local;
          if (z === "xmlns")
            if (q === "xml" && O.attribValue !== h)
              U(
                O,
                "xml: prefix must be bound to " + h + `
Actual: ` + O.attribValue
              );
            else if (q === "xmlns" && O.attribValue !== u)
              U(
                O,
                "xmlns: prefix must be bound to " + u + `
Actual: ` + O.attribValue
              );
            else {
              var me = O.tag, be = O.tags[O.tags.length - 1] || O;
              me.ns === be.ns && (me.ns = Object.create(be.ns)), me.ns[q] = O.attribValue;
            }
          O.attribList.push([O.attribName, O.attribValue]);
        } else
          O.tag.attributes[O.attribName] = O.attribValue, D(O, "onattribute", {
            name: O.attribName,
            value: O.attribValue
          });
        O.attribName = O.attribValue = "";
      }
      function ae(O, A) {
        if (O.opt.xmlns) {
          var z = O.tag, q = W(O.tagName);
          z.prefix = q.prefix, z.local = q.local, z.uri = z.ns[q.prefix] || "", z.prefix && !z.uri && (U(
            O,
            "Unbound namespace prefix: " + JSON.stringify(O.tagName)
          ), z.uri = q.prefix);
          var me = O.tags[O.tags.length - 1] || O;
          z.ns && me.ns !== z.ns && Object.keys(z.ns).forEach(function(x) {
            D(O, "onopennamespace", {
              prefix: x,
              uri: z.ns[x]
            });
          });
          for (var be = 0, we = O.attribList.length; be < we; be++) {
            var Ce = O.attribList[be], Re = Ce[0], Me = Ce[1], j = W(Re, !0), Y = j.prefix, he = j.local, Ee = Y === "" ? "" : z.ns[Y] || "", ue = {
              name: Re,
              value: Me,
              prefix: Y,
              local: he,
              uri: Ee
            };
            Y && Y !== "xmlns" && !Ee && (U(
              O,
              "Unbound namespace prefix: " + JSON.stringify(Y)
            ), ue.uri = Y), O.tag.attributes[Re] = ue, D(O, "onattribute", ue);
          }
          O.attribList.length = 0;
        }
        O.tag.isSelfClosing = !!A, O.sawRoot = !0, O.tags.push(O.tag), D(O, "onopentag", O.tag), A || (!O.noscript && O.tagName.toLowerCase() === "script" ? O.state = E.SCRIPT : O.state = E.TEXT, O.tag = null, O.tagName = ""), O.attribName = O.attribValue = "", O.attribList.length = 0;
      }
      function oe(O) {
        if (!O.tagName) {
          U(O, "Weird empty close tag."), O.textNode += "</>", O.state = E.TEXT;
          return;
        }
        if (O.script) {
          if (O.tagName !== "script") {
            O.script += "</" + O.tagName + ">", O.tagName = "", O.state = E.SCRIPT;
            return;
          }
          D(O, "onscript", O.script), O.script = "";
        }
        var A = O.tags.length, z = O.tagName;
        O.strict || (z = z[O.looseCase]());
        for (var q = z; A--; ) {
          var me = O.tags[A];
          if (me.name !== q)
            U(O, "Unexpected close tag");
          else
            break;
        }
        if (A < 0) {
          U(O, "Unmatched closing tag: " + O.tagName), O.textNode += "</" + O.tagName + ">", O.state = E.TEXT;
          return;
        }
        O.tagName = z;
        for (var be = O.tags.length; be-- > A; ) {
          var we = O.tag = O.tags.pop();
          O.tagName = O.tag.name, D(O, "onclosetag", O.tagName);
          var Ce = {};
          for (var Re in we.ns)
            Ce[Re] = we.ns[Re];
          var Me = O.tags[O.tags.length - 1] || O;
          O.opt.xmlns && we.ns !== Me.ns && Object.keys(we.ns).forEach(function(j) {
            var Y = we.ns[j];
            D(O, "onclosenamespace", { prefix: j, uri: Y });
          });
        }
        A === 0 && (O.closedRoot = !0), O.tagName = O.attribValue = O.attribName = "", O.attribList.length = 0, O.state = E.TEXT;
      }
      function ye(O) {
        var A = O.entity, z = A.toLowerCase(), q, me = "";
        return O.ENTITIES[A] ? O.ENTITIES[A] : O.ENTITIES[z] ? O.ENTITIES[z] : (A = z, A.charAt(0) === "#" && (A.charAt(1) === "x" ? (A = A.slice(2), q = parseInt(A, 16), me = q.toString(16)) : (A = A.slice(1), q = parseInt(A, 10), me = q.toString(10))), A = A.replace(/^0+/, ""), isNaN(q) || me.toLowerCase() !== A || q < 0 || q > 1114111 ? (U(O, "Invalid character entity"), "&" + O.entity + ";") : String.fromCodePoint(q));
      }
      function _e(O, A) {
        A === "<" ? (O.state = E.OPEN_WAKA, O.startTagPosition = O.position) : S(A) || (U(O, "Non-whitespace before first tag."), O.textNode = A, O.state = E.TEXT);
      }
      function Z(O, A) {
        var z = "";
        return A < O.length && (z = O.charAt(A)), z;
      }
      function Se(O) {
        var A = this;
        if (this.error)
          throw this.error;
        if (A.closed)
          return I(
            A,
            "Cannot write after close. Assign an onready handler."
          );
        if (O === null)
          return F(A);
        typeof O == "object" && (O = O.toString());
        for (var z = 0, q = ""; q = Z(O, z++), A.c = q, !!q; )
          switch (A.trackPosition && (A.position++, q === `
` ? (A.line++, A.column = 0) : A.column++), A.state) {
            case E.BEGIN:
              if (A.state = E.BEGIN_WHITESPACE, q === "\uFEFF")
                continue;
              _e(A, q);
              continue;
            case E.BEGIN_WHITESPACE:
              _e(A, q);
              continue;
            case E.TEXT:
              if (A.sawRoot && !A.closedRoot) {
                for (var be = z - 1; q && q !== "<" && q !== "&"; )
                  q = Z(O, z++), q && A.trackPosition && (A.position++, q === `
` ? (A.line++, A.column = 0) : A.column++);
                A.textNode += O.substring(be, z - 1);
              }
              q === "<" && !(A.sawRoot && A.closedRoot && !A.strict) ? (A.state = E.OPEN_WAKA, A.startTagPosition = A.position) : (!S(q) && (!A.sawRoot || A.closedRoot) && U(A, "Text data outside of root node."), q === "&" ? A.state = E.TEXT_ENTITY : A.textNode += q);
              continue;
            case E.SCRIPT:
              q === "<" ? A.state = E.SCRIPT_ENDING : A.script += q;
              continue;
            case E.SCRIPT_ENDING:
              q === "/" ? A.state = E.CLOSE_TAG : (A.script += "<" + q, A.state = E.SCRIPT);
              continue;
            case E.OPEN_WAKA:
              if (q === "!")
                A.state = E.SGML_DECL, A.sgmlDecl = "";
              else if (!S(q)) if (w(m, q))
                A.state = E.OPEN_TAG, A.tagName = q;
              else if (q === "/")
                A.state = E.CLOSE_TAG, A.tagName = "";
              else if (q === "?")
                A.state = E.PROC_INST, A.procInstName = A.procInstBody = "";
              else {
                if (U(A, "Unencoded <"), A.startTagPosition + 1 < A.position) {
                  var me = A.position - A.startTagPosition;
                  q = new Array(me).join(" ") + q;
                }
                A.textNode += "<" + q, A.state = E.TEXT;
              }
              continue;
            case E.SGML_DECL:
              if (A.sgmlDecl + q === "--") {
                A.state = E.COMMENT, A.comment = "", A.sgmlDecl = "";
                continue;
              }
              A.doctype && A.doctype !== !0 && A.sgmlDecl ? (A.state = E.DOCTYPE_DTD, A.doctype += "<!" + A.sgmlDecl + q, A.sgmlDecl = "") : (A.sgmlDecl + q).toUpperCase() === p ? (D(A, "onopencdata"), A.state = E.CDATA, A.sgmlDecl = "", A.cdata = "") : (A.sgmlDecl + q).toUpperCase() === o ? (A.state = E.DOCTYPE, (A.doctype || A.sawRoot) && U(
                A,
                "Inappropriately located doctype declaration"
              ), A.doctype = "", A.sgmlDecl = "") : q === ">" ? (D(A, "onsgmldeclaration", A.sgmlDecl), A.sgmlDecl = "", A.state = E.TEXT) : (T(q) && (A.state = E.SGML_DECL_QUOTED), A.sgmlDecl += q);
              continue;
            case E.SGML_DECL_QUOTED:
              q === A.q && (A.state = E.SGML_DECL, A.q = ""), A.sgmlDecl += q;
              continue;
            case E.DOCTYPE:
              q === ">" ? (A.state = E.TEXT, D(A, "ondoctype", A.doctype), A.doctype = !0) : (A.doctype += q, q === "[" ? A.state = E.DOCTYPE_DTD : T(q) && (A.state = E.DOCTYPE_QUOTED, A.q = q));
              continue;
            case E.DOCTYPE_QUOTED:
              A.doctype += q, q === A.q && (A.q = "", A.state = E.DOCTYPE);
              continue;
            case E.DOCTYPE_DTD:
              q === "]" ? (A.doctype += q, A.state = E.DOCTYPE) : q === "<" ? (A.state = E.OPEN_WAKA, A.startTagPosition = A.position) : T(q) ? (A.doctype += q, A.state = E.DOCTYPE_DTD_QUOTED, A.q = q) : A.doctype += q;
              continue;
            case E.DOCTYPE_DTD_QUOTED:
              A.doctype += q, q === A.q && (A.state = E.DOCTYPE_DTD, A.q = "");
              continue;
            case E.COMMENT:
              q === "-" ? A.state = E.COMMENT_ENDING : A.comment += q;
              continue;
            case E.COMMENT_ENDING:
              q === "-" ? (A.state = E.COMMENT_ENDED, A.comment = C(A.opt, A.comment), A.comment && D(A, "oncomment", A.comment), A.comment = "") : (A.comment += "-" + q, A.state = E.COMMENT);
              continue;
            case E.COMMENT_ENDED:
              q !== ">" ? (U(A, "Malformed comment"), A.comment += "--" + q, A.state = E.COMMENT) : A.doctype && A.doctype !== !0 ? A.state = E.DOCTYPE_DTD : A.state = E.TEXT;
              continue;
            case E.CDATA:
              for (var be = z - 1; q && q !== "]"; )
                q = Z(O, z++), q && A.trackPosition && (A.position++, q === `
` ? (A.line++, A.column = 0) : A.column++);
              A.cdata += O.substring(be, z - 1), q === "]" && (A.state = E.CDATA_ENDING);
              continue;
            case E.CDATA_ENDING:
              q === "]" ? A.state = E.CDATA_ENDING_2 : (A.cdata += "]" + q, A.state = E.CDATA);
              continue;
            case E.CDATA_ENDING_2:
              q === ">" ? (A.cdata && D(A, "oncdata", A.cdata), D(A, "onclosecdata"), A.cdata = "", A.state = E.TEXT) : q === "]" ? A.cdata += "]" : (A.cdata += "]]" + q, A.state = E.CDATA);
              continue;
            case E.PROC_INST:
              q === "?" ? A.state = E.PROC_INST_ENDING : S(q) ? A.state = E.PROC_INST_BODY : A.procInstName += q;
              continue;
            case E.PROC_INST_BODY:
              if (!A.procInstBody && S(q))
                continue;
              q === "?" ? A.state = E.PROC_INST_ENDING : A.procInstBody += q;
              continue;
            case E.PROC_INST_ENDING:
              q === ">" ? (D(A, "onprocessinginstruction", {
                name: A.procInstName,
                body: A.procInstBody
              }), A.procInstName = A.procInstBody = "", A.state = E.TEXT) : (A.procInstBody += "?" + q, A.state = E.PROC_INST_BODY);
              continue;
            case E.OPEN_TAG:
              w(v, q) ? A.tagName += q : (G(A), q === ">" ? ae(A) : q === "/" ? A.state = E.OPEN_TAG_SLASH : (S(q) || U(A, "Invalid character in tag name"), A.state = E.ATTRIB));
              continue;
            case E.OPEN_TAG_SLASH:
              q === ">" ? (ae(A, !0), oe(A)) : (U(
                A,
                "Forward-slash in opening tag not followed by >"
              ), A.state = E.ATTRIB);
              continue;
            case E.ATTRIB:
              if (S(q))
                continue;
              q === ">" ? ae(A) : q === "/" ? A.state = E.OPEN_TAG_SLASH : w(m, q) ? (A.attribName = q, A.attribValue = "", A.state = E.ATTRIB_NAME) : U(A, "Invalid attribute name");
              continue;
            case E.ATTRIB_NAME:
              q === "=" ? A.state = E.ATTRIB_VALUE : q === ">" ? (U(A, "Attribute without value"), A.attribValue = A.attribName, re(A), ae(A)) : S(q) ? A.state = E.ATTRIB_NAME_SAW_WHITE : w(v, q) ? A.attribName += q : U(A, "Invalid attribute name");
              continue;
            case E.ATTRIB_NAME_SAW_WHITE:
              if (q === "=")
                A.state = E.ATTRIB_VALUE;
              else {
                if (S(q))
                  continue;
                U(A, "Attribute without value"), A.tag.attributes[A.attribName] = "", A.attribValue = "", D(A, "onattribute", {
                  name: A.attribName,
                  value: ""
                }), A.attribName = "", q === ">" ? ae(A) : w(m, q) ? (A.attribName = q, A.state = E.ATTRIB_NAME) : (U(A, "Invalid attribute name"), A.state = E.ATTRIB);
              }
              continue;
            case E.ATTRIB_VALUE:
              if (S(q))
                continue;
              T(q) ? (A.q = q, A.state = E.ATTRIB_VALUE_QUOTED) : (A.opt.unquotedAttributeValues || I(A, "Unquoted attribute value"), A.state = E.ATTRIB_VALUE_UNQUOTED, A.attribValue = q);
              continue;
            case E.ATTRIB_VALUE_QUOTED:
              if (q !== A.q) {
                q === "&" ? A.state = E.ATTRIB_VALUE_ENTITY_Q : A.attribValue += q;
                continue;
              }
              re(A), A.q = "", A.state = E.ATTRIB_VALUE_CLOSED;
              continue;
            case E.ATTRIB_VALUE_CLOSED:
              S(q) ? A.state = E.ATTRIB : q === ">" ? ae(A) : q === "/" ? A.state = E.OPEN_TAG_SLASH : w(m, q) ? (U(A, "No whitespace between attributes"), A.attribName = q, A.attribValue = "", A.state = E.ATTRIB_NAME) : U(A, "Invalid attribute name");
              continue;
            case E.ATTRIB_VALUE_UNQUOTED:
              if (!b(q)) {
                q === "&" ? A.state = E.ATTRIB_VALUE_ENTITY_U : A.attribValue += q;
                continue;
              }
              re(A), q === ">" ? ae(A) : A.state = E.ATTRIB;
              continue;
            case E.CLOSE_TAG:
              if (A.tagName)
                q === ">" ? oe(A) : w(v, q) ? A.tagName += q : A.script ? (A.script += "</" + A.tagName, A.tagName = "", A.state = E.SCRIPT) : (S(q) || U(A, "Invalid tagname in closing tag"), A.state = E.CLOSE_TAG_SAW_WHITE);
              else {
                if (S(q))
                  continue;
                _(m, q) ? A.script ? (A.script += "</" + q, A.state = E.SCRIPT) : U(A, "Invalid tagname in closing tag.") : A.tagName = q;
              }
              continue;
            case E.CLOSE_TAG_SAW_WHITE:
              if (S(q))
                continue;
              q === ">" ? oe(A) : U(A, "Invalid characters in closing tag");
              continue;
            case E.TEXT_ENTITY:
            case E.ATTRIB_VALUE_ENTITY_Q:
            case E.ATTRIB_VALUE_ENTITY_U:
              var we, Ce;
              switch (A.state) {
                case E.TEXT_ENTITY:
                  we = E.TEXT, Ce = "textNode";
                  break;
                case E.ATTRIB_VALUE_ENTITY_Q:
                  we = E.ATTRIB_VALUE_QUOTED, Ce = "attribValue";
                  break;
                case E.ATTRIB_VALUE_ENTITY_U:
                  we = E.ATTRIB_VALUE_UNQUOTED, Ce = "attribValue";
                  break;
              }
              if (q === ";") {
                var Re = ye(A);
                A.opt.unparsedEntities && !Object.values(c.XML_ENTITIES).includes(Re) ? (A.entity = "", A.state = we, A.write(Re)) : (A[Ce] += Re, A.entity = "", A.state = we);
              } else w(A.entity.length ? R : y, q) ? A.entity += q : (U(A, "Invalid character in entity name"), A[Ce] += "&" + A.entity + q, A.entity = "", A.state = we);
              continue;
            default:
              throw new Error(A, "Unknown state: " + A.state);
          }
        return A.position >= A.bufferCheckPosition && d(A), A;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || (function() {
        var O = String.fromCharCode, A = Math.floor, z = function() {
          var q = 16384, me = [], be, we, Ce = -1, Re = arguments.length;
          if (!Re)
            return "";
          for (var Me = ""; ++Ce < Re; ) {
            var j = Number(arguments[Ce]);
            if (!isFinite(j) || // `NaN`, `+Infinity`, or `-Infinity`
            j < 0 || // not a valid Unicode code point
            j > 1114111 || // not a valid Unicode code point
            A(j) !== j)
              throw RangeError("Invalid code point: " + j);
            j <= 65535 ? me.push(j) : (j -= 65536, be = (j >> 10) + 55296, we = j % 1024 + 56320, me.push(be, we)), (Ce + 1 === Re || me.length > q) && (Me += O.apply(null, me), me.length = 0);
          }
          return Me;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: z,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = z;
      })();
    })(e);
  })(os)), os;
}
var Kc;
function Hm() {
  if (Kc) return un;
  Kc = 1, Object.defineProperty(un, "__esModule", { value: !0 }), un.XElement = void 0, un.parseXml = t;
  const e = Mm(), c = li();
  class f {
    constructor(r) {
      if (this.name = r, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !r)
        throw (0, c.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!d(r))
        throw (0, c.newError)(`Invalid element name: ${r}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(r) {
      const n = this.attributes === null ? null : this.attributes[r];
      if (n == null)
        throw (0, c.newError)(`No attribute "${r}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return n;
    }
    removeAttribute(r) {
      this.attributes !== null && delete this.attributes[r];
    }
    element(r, n = !1, i = null) {
      const p = this.elementOrNull(r, n);
      if (p === null)
        throw (0, c.newError)(i || `No element "${r}"`, "ERR_XML_MISSED_ELEMENT");
      return p;
    }
    elementOrNull(r, n = !1) {
      if (this.elements === null)
        return null;
      for (const i of this.elements)
        if (s(i, r, n))
          return i;
      return null;
    }
    getElements(r, n = !1) {
      return this.elements === null ? [] : this.elements.filter((i) => s(i, r, n));
    }
    elementValueOrEmpty(r, n = !1) {
      const i = this.elementOrNull(r, n);
      return i === null ? "" : i.value;
    }
  }
  un.XElement = f;
  const l = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function d(a) {
    return l.test(a);
  }
  function s(a, r, n) {
    const i = a.name;
    return i === r || n === !0 && i.length === r.length && i.toLowerCase() === r.toLowerCase();
  }
  function t(a) {
    let r = null;
    const n = e.parser(!0, {}), i = [];
    return n.onopentag = (p) => {
      const o = new f(p.name);
      if (o.attributes = p.attributes, r === null)
        r = o;
      else {
        const h = i[i.length - 1];
        h.elements == null && (h.elements = []), h.elements.push(o);
      }
      i.push(o);
    }, n.onclosetag = () => {
      i.pop();
    }, n.ontext = (p) => {
      i.length > 0 && (i[i.length - 1].value = p);
    }, n.oncdata = (p) => {
      const o = i[i.length - 1];
      o.value = p, o.isCData = !0;
    }, n.onerror = (p) => {
      throw p;
    }, n.write(a), r;
  }
  return un;
}
var Xc;
function Ge() {
  return Xc || (Xc = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = p;
    var c = wo();
    Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
      return c.CancellationError;
    } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return c.CancellationToken;
    } });
    var f = li();
    Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
      return f.newError;
    } });
    var l = Fm();
    Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
      return l.configureRequestOptions;
    } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return l.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
      return l.configureRequestUrl;
    } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
      return l.createHttpError;
    } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
      return l.DigestTransform;
    } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
      return l.HttpError;
    } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
      return l.HttpExecutor;
    } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
      return l.parseJson;
    } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
      return l.safeGetHeader;
    } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
      return l.safeStringifyJson;
    } });
    var d = Um();
    Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
      return d.MemoLazy;
    } });
    var s = Hd();
    Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return s.ProgressCallbackTransform;
    } });
    var t = $m();
    Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return t.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
      return t.githubUrl;
    } });
    var a = qm();
    Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
      return a.retry;
    } });
    var r = Bm();
    Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
      return r.parseDn;
    } });
    var n = jm();
    Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
      return n.UUID;
    } });
    var i = Hm();
    Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
      return i.parseXml;
    } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
      return i.XElement;
    } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function p(o) {
      return o == null ? [] : Array.isArray(o) ? o : [o];
    }
  })(ns)), ns;
}
var Ve = {}, Ur = {}, Pt = {}, Jc;
function xr() {
  if (Jc) return Pt;
  Jc = 1;
  function e(t) {
    return typeof t > "u" || t === null;
  }
  function c(t) {
    return typeof t == "object" && t !== null;
  }
  function f(t) {
    return Array.isArray(t) ? t : e(t) ? [] : [t];
  }
  function l(t, a) {
    var r, n, i, p;
    if (a)
      for (p = Object.keys(a), r = 0, n = p.length; r < n; r += 1)
        i = p[r], t[i] = a[i];
    return t;
  }
  function d(t, a) {
    var r = "", n;
    for (n = 0; n < a; n += 1)
      r += t;
    return r;
  }
  function s(t) {
    return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
  }
  return Pt.isNothing = e, Pt.isObject = c, Pt.toArray = f, Pt.repeat = d, Pt.isNegativeZero = s, Pt.extend = l, Pt;
}
var cs, Qc;
function yr() {
  if (Qc) return cs;
  Qc = 1;
  function e(f, l) {
    var d = "", s = f.reason || "(unknown reason)";
    return f.mark ? (f.mark.name && (d += 'in "' + f.mark.name + '" '), d += "(" + (f.mark.line + 1) + ":" + (f.mark.column + 1) + ")", !l && f.mark.snippet && (d += `

` + f.mark.snippet), s + " " + d) : s;
  }
  function c(f, l) {
    Error.call(this), this.name = "YAMLException", this.reason = f, this.mark = l, this.message = e(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return c.prototype = Object.create(Error.prototype), c.prototype.constructor = c, c.prototype.toString = function(l) {
    return this.name + ": " + e(this, l);
  }, cs = c, cs;
}
var ls, Zc;
function Gm() {
  if (Zc) return ls;
  Zc = 1;
  var e = xr();
  function c(d, s, t, a, r) {
    var n = "", i = "", p = Math.floor(r / 2) - 1;
    return a - s > p && (n = " ... ", s = a - p + n.length), t - a > p && (i = " ...", t = a + p - i.length), {
      str: n + d.slice(s, t).replace(/\t/g, "→") + i,
      pos: a - s + n.length
      // relative position
    };
  }
  function f(d, s) {
    return e.repeat(" ", s - d.length) + d;
  }
  function l(d, s) {
    if (s = Object.create(s || null), !d.buffer) return null;
    s.maxLength || (s.maxLength = 79), typeof s.indent != "number" && (s.indent = 1), typeof s.linesBefore != "number" && (s.linesBefore = 3), typeof s.linesAfter != "number" && (s.linesAfter = 2);
    for (var t = /\r?\n|\r|\0/g, a = [0], r = [], n, i = -1; n = t.exec(d.buffer); )
      r.push(n.index), a.push(n.index + n[0].length), d.position <= n.index && i < 0 && (i = a.length - 2);
    i < 0 && (i = a.length - 1);
    var p = "", o, h, u = Math.min(d.line + s.linesAfter, r.length).toString().length, g = s.maxLength - (s.indent + u + 3);
    for (o = 1; o <= s.linesBefore && !(i - o < 0); o++)
      h = c(
        d.buffer,
        a[i - o],
        r[i - o],
        d.position - (a[i] - a[i - o]),
        g
      ), p = e.repeat(" ", s.indent) + f((d.line - o + 1).toString(), u) + " | " + h.str + `
` + p;
    for (h = c(d.buffer, a[i], r[i], d.position, g), p += e.repeat(" ", s.indent) + f((d.line + 1).toString(), u) + " | " + h.str + `
`, p += e.repeat("-", s.indent + u + 3 + h.pos) + `^
`, o = 1; o <= s.linesAfter && !(i + o >= r.length); o++)
      h = c(
        d.buffer,
        a[i + o],
        r[i + o],
        d.position - (a[i] - a[i + o]),
        g
      ), p += e.repeat(" ", s.indent) + f((d.line + o + 1).toString(), u) + " | " + h.str + `
`;
    return p.replace(/\n$/, "");
  }
  return ls = l, ls;
}
var us, el;
function Xe() {
  if (el) return us;
  el = 1;
  var e = yr(), c = [
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
  ], f = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function l(s) {
    var t = {};
    return s !== null && Object.keys(s).forEach(function(a) {
      s[a].forEach(function(r) {
        t[String(r)] = a;
      });
    }), t;
  }
  function d(s, t) {
    if (t = t || {}, Object.keys(t).forEach(function(a) {
      if (c.indexOf(a) === -1)
        throw new e('Unknown option "' + a + '" is met in definition of "' + s + '" YAML type.');
    }), this.options = t, this.tag = s, this.kind = t.kind || null, this.resolve = t.resolve || function() {
      return !0;
    }, this.construct = t.construct || function(a) {
      return a;
    }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = l(t.styleAliases || null), f.indexOf(this.kind) === -1)
      throw new e('Unknown kind "' + this.kind + '" is specified for "' + s + '" YAML type.');
  }
  return us = d, us;
}
var ps, tl;
function Gd() {
  if (tl) return ps;
  tl = 1;
  var e = yr(), c = Xe();
  function f(s, t) {
    var a = [];
    return s[t].forEach(function(r) {
      var n = a.length;
      a.forEach(function(i, p) {
        i.tag === r.tag && i.kind === r.kind && i.multi === r.multi && (n = p);
      }), a[n] = r;
    }), a;
  }
  function l() {
    var s = {
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
    function r(n) {
      n.multi ? (s.multi[n.kind].push(n), s.multi.fallback.push(n)) : s[n.kind][n.tag] = s.fallback[n.tag] = n;
    }
    for (t = 0, a = arguments.length; t < a; t += 1)
      arguments[t].forEach(r);
    return s;
  }
  function d(s) {
    return this.extend(s);
  }
  return d.prototype.extend = function(t) {
    var a = [], r = [];
    if (t instanceof c)
      r.push(t);
    else if (Array.isArray(t))
      r = r.concat(t);
    else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
      t.implicit && (a = a.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
    else
      throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    a.forEach(function(i) {
      if (!(i instanceof c))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (i.loadKind && i.loadKind !== "scalar")
        throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (i.multi)
        throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), r.forEach(function(i) {
      if (!(i instanceof c))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var n = Object.create(d.prototype);
    return n.implicit = (this.implicit || []).concat(a), n.explicit = (this.explicit || []).concat(r), n.compiledImplicit = f(n, "implicit"), n.compiledExplicit = f(n, "explicit"), n.compiledTypeMap = l(n.compiledImplicit, n.compiledExplicit), n;
  }, ps = d, ps;
}
var ds, nl;
function zd() {
  if (nl) return ds;
  nl = 1;
  var e = Xe();
  return ds = new e("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(c) {
      return c !== null ? c : "";
    }
  }), ds;
}
var fs, rl;
function Wd() {
  if (rl) return fs;
  rl = 1;
  var e = Xe();
  return fs = new e("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(c) {
      return c !== null ? c : [];
    }
  }), fs;
}
var hs, il;
function Vd() {
  if (il) return hs;
  il = 1;
  var e = Xe();
  return hs = new e("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(c) {
      return c !== null ? c : {};
    }
  }), hs;
}
var ms, sl;
function Yd() {
  if (sl) return ms;
  sl = 1;
  var e = Gd();
  return ms = new e({
    explicit: [
      zd(),
      Wd(),
      Vd()
    ]
  }), ms;
}
var gs, al;
function Kd() {
  if (al) return gs;
  al = 1;
  var e = Xe();
  function c(d) {
    if (d === null) return !0;
    var s = d.length;
    return s === 1 && d === "~" || s === 4 && (d === "null" || d === "Null" || d === "NULL");
  }
  function f() {
    return null;
  }
  function l(d) {
    return d === null;
  }
  return gs = new e("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: c,
    construct: f,
    predicate: l,
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
  }), gs;
}
var vs, ol;
function Xd() {
  if (ol) return vs;
  ol = 1;
  var e = Xe();
  function c(d) {
    if (d === null) return !1;
    var s = d.length;
    return s === 4 && (d === "true" || d === "True" || d === "TRUE") || s === 5 && (d === "false" || d === "False" || d === "FALSE");
  }
  function f(d) {
    return d === "true" || d === "True" || d === "TRUE";
  }
  function l(d) {
    return Object.prototype.toString.call(d) === "[object Boolean]";
  }
  return vs = new e("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: c,
    construct: f,
    predicate: l,
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
  }), vs;
}
var xs, cl;
function Jd() {
  if (cl) return xs;
  cl = 1;
  var e = xr(), c = Xe();
  function f(r) {
    return 48 <= r && r <= 57 || 65 <= r && r <= 70 || 97 <= r && r <= 102;
  }
  function l(r) {
    return 48 <= r && r <= 55;
  }
  function d(r) {
    return 48 <= r && r <= 57;
  }
  function s(r) {
    if (r === null) return !1;
    var n = r.length, i = 0, p = !1, o;
    if (!n) return !1;
    if (o = r[i], (o === "-" || o === "+") && (o = r[++i]), o === "0") {
      if (i + 1 === n) return !0;
      if (o = r[++i], o === "b") {
        for (i++; i < n; i++)
          if (o = r[i], o !== "_") {
            if (o !== "0" && o !== "1") return !1;
            p = !0;
          }
        return p && o !== "_";
      }
      if (o === "x") {
        for (i++; i < n; i++)
          if (o = r[i], o !== "_") {
            if (!f(r.charCodeAt(i))) return !1;
            p = !0;
          }
        return p && o !== "_";
      }
      if (o === "o") {
        for (i++; i < n; i++)
          if (o = r[i], o !== "_") {
            if (!l(r.charCodeAt(i))) return !1;
            p = !0;
          }
        return p && o !== "_";
      }
    }
    if (o === "_") return !1;
    for (; i < n; i++)
      if (o = r[i], o !== "_") {
        if (!d(r.charCodeAt(i)))
          return !1;
        p = !0;
      }
    return !(!p || o === "_");
  }
  function t(r) {
    var n = r, i = 1, p;
    if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), p = n[0], (p === "-" || p === "+") && (p === "-" && (i = -1), n = n.slice(1), p = n[0]), n === "0") return 0;
    if (p === "0") {
      if (n[1] === "b") return i * parseInt(n.slice(2), 2);
      if (n[1] === "x") return i * parseInt(n.slice(2), 16);
      if (n[1] === "o") return i * parseInt(n.slice(2), 8);
    }
    return i * parseInt(n, 10);
  }
  function a(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && r % 1 === 0 && !e.isNegativeZero(r);
  }
  return xs = new c("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: s,
    construct: t,
    predicate: a,
    represent: {
      binary: function(r) {
        return r >= 0 ? "0b" + r.toString(2) : "-0b" + r.toString(2).slice(1);
      },
      octal: function(r) {
        return r >= 0 ? "0o" + r.toString(8) : "-0o" + r.toString(8).slice(1);
      },
      decimal: function(r) {
        return r.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(r) {
        return r >= 0 ? "0x" + r.toString(16).toUpperCase() : "-0x" + r.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), xs;
}
var ys, ll;
function Qd() {
  if (ll) return ys;
  ll = 1;
  var e = xr(), c = Xe(), f = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function l(r) {
    return !(r === null || !f.test(r) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    r[r.length - 1] === "_");
  }
  function d(r) {
    var n, i;
    return n = r.replace(/_/g, "").toLowerCase(), i = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : i * parseFloat(n, 10);
  }
  var s = /^[-+]?[0-9]+e/;
  function t(r, n) {
    var i;
    if (isNaN(r))
      switch (n) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === r)
      switch (n) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === r)
      switch (n) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (e.isNegativeZero(r))
      return "-0.0";
    return i = r.toString(10), s.test(i) ? i.replace("e", ".e") : i;
  }
  function a(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && (r % 1 !== 0 || e.isNegativeZero(r));
  }
  return ys = new c("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: l,
    construct: d,
    predicate: a,
    represent: t,
    defaultStyle: "lowercase"
  }), ys;
}
var bs, ul;
function Zd() {
  return ul || (ul = 1, bs = Yd().extend({
    implicit: [
      Kd(),
      Xd(),
      Jd(),
      Qd()
    ]
  })), bs;
}
var ws, pl;
function ef() {
  return pl || (pl = 1, ws = Zd()), ws;
}
var _s, dl;
function tf() {
  if (dl) return _s;
  dl = 1;
  var e = Xe(), c = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), f = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function l(t) {
    return t === null ? !1 : c.exec(t) !== null || f.exec(t) !== null;
  }
  function d(t) {
    var a, r, n, i, p, o, h, u = 0, g = null, m, v, y;
    if (a = c.exec(t), a === null && (a = f.exec(t)), a === null) throw new Error("Date resolve error");
    if (r = +a[1], n = +a[2] - 1, i = +a[3], !a[4])
      return new Date(Date.UTC(r, n, i));
    if (p = +a[4], o = +a[5], h = +a[6], a[7]) {
      for (u = a[7].slice(0, 3); u.length < 3; )
        u += "0";
      u = +u;
    }
    return a[9] && (m = +a[10], v = +(a[11] || 0), g = (m * 60 + v) * 6e4, a[9] === "-" && (g = -g)), y = new Date(Date.UTC(r, n, i, p, o, h, u)), g && y.setTime(y.getTime() - g), y;
  }
  function s(t) {
    return t.toISOString();
  }
  return _s = new e("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: l,
    construct: d,
    instanceOf: Date,
    represent: s
  }), _s;
}
var Es, fl;
function nf() {
  if (fl) return Es;
  fl = 1;
  var e = Xe();
  function c(f) {
    return f === "<<" || f === null;
  }
  return Es = new e("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: c
  }), Es;
}
var Ss, hl;
function rf() {
  if (hl) return Ss;
  hl = 1;
  var e = Xe(), c = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function f(t) {
    if (t === null) return !1;
    var a, r, n = 0, i = t.length, p = c;
    for (r = 0; r < i; r++)
      if (a = p.indexOf(t.charAt(r)), !(a > 64)) {
        if (a < 0) return !1;
        n += 6;
      }
    return n % 8 === 0;
  }
  function l(t) {
    var a, r, n = t.replace(/[\r\n=]/g, ""), i = n.length, p = c, o = 0, h = [];
    for (a = 0; a < i; a++)
      a % 4 === 0 && a && (h.push(o >> 16 & 255), h.push(o >> 8 & 255), h.push(o & 255)), o = o << 6 | p.indexOf(n.charAt(a));
    return r = i % 4 * 6, r === 0 ? (h.push(o >> 16 & 255), h.push(o >> 8 & 255), h.push(o & 255)) : r === 18 ? (h.push(o >> 10 & 255), h.push(o >> 2 & 255)) : r === 12 && h.push(o >> 4 & 255), new Uint8Array(h);
  }
  function d(t) {
    var a = "", r = 0, n, i, p = t.length, o = c;
    for (n = 0; n < p; n++)
      n % 3 === 0 && n && (a += o[r >> 18 & 63], a += o[r >> 12 & 63], a += o[r >> 6 & 63], a += o[r & 63]), r = (r << 8) + t[n];
    return i = p % 3, i === 0 ? (a += o[r >> 18 & 63], a += o[r >> 12 & 63], a += o[r >> 6 & 63], a += o[r & 63]) : i === 2 ? (a += o[r >> 10 & 63], a += o[r >> 4 & 63], a += o[r << 2 & 63], a += o[64]) : i === 1 && (a += o[r >> 2 & 63], a += o[r << 4 & 63], a += o[64], a += o[64]), a;
  }
  function s(t) {
    return Object.prototype.toString.call(t) === "[object Uint8Array]";
  }
  return Ss = new e("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: f,
    construct: l,
    predicate: s,
    represent: d
  }), Ss;
}
var Ts, ml;
function sf() {
  if (ml) return Ts;
  ml = 1;
  var e = Xe(), c = Object.prototype.hasOwnProperty, f = Object.prototype.toString;
  function l(s) {
    if (s === null) return !0;
    var t = [], a, r, n, i, p, o = s;
    for (a = 0, r = o.length; a < r; a += 1) {
      if (n = o[a], p = !1, f.call(n) !== "[object Object]") return !1;
      for (i in n)
        if (c.call(n, i))
          if (!p) p = !0;
          else return !1;
      if (!p) return !1;
      if (t.indexOf(i) === -1) t.push(i);
      else return !1;
    }
    return !0;
  }
  function d(s) {
    return s !== null ? s : [];
  }
  return Ts = new e("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: l,
    construct: d
  }), Ts;
}
var Rs, gl;
function af() {
  if (gl) return Rs;
  gl = 1;
  var e = Xe(), c = Object.prototype.toString;
  function f(d) {
    if (d === null) return !0;
    var s, t, a, r, n, i = d;
    for (n = new Array(i.length), s = 0, t = i.length; s < t; s += 1) {
      if (a = i[s], c.call(a) !== "[object Object]" || (r = Object.keys(a), r.length !== 1)) return !1;
      n[s] = [r[0], a[r[0]]];
    }
    return !0;
  }
  function l(d) {
    if (d === null) return [];
    var s, t, a, r, n, i = d;
    for (n = new Array(i.length), s = 0, t = i.length; s < t; s += 1)
      a = i[s], r = Object.keys(a), n[s] = [r[0], a[r[0]]];
    return n;
  }
  return Rs = new e("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: f,
    construct: l
  }), Rs;
}
var Cs, vl;
function of() {
  if (vl) return Cs;
  vl = 1;
  var e = Xe(), c = Object.prototype.hasOwnProperty;
  function f(d) {
    if (d === null) return !0;
    var s, t = d;
    for (s in t)
      if (c.call(t, s) && t[s] !== null)
        return !1;
    return !0;
  }
  function l(d) {
    return d !== null ? d : {};
  }
  return Cs = new e("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: f,
    construct: l
  }), Cs;
}
var As, xl;
function _o() {
  return xl || (xl = 1, As = ef().extend({
    implicit: [
      tf(),
      nf()
    ],
    explicit: [
      rf(),
      sf(),
      af(),
      of()
    ]
  })), As;
}
var yl;
function zm() {
  if (yl) return Ur;
  yl = 1;
  var e = xr(), c = yr(), f = Gm(), l = _o(), d = Object.prototype.hasOwnProperty, s = 1, t = 2, a = 3, r = 4, n = 1, i = 2, p = 3, o = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, h = /[\x85\u2028\u2029]/, u = /[,\[\]\{\}]/, g = /^(?:!|!!|![a-z\-]+!)$/i, m = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function v(x) {
    return Object.prototype.toString.call(x);
  }
  function y(x) {
    return x === 10 || x === 13;
  }
  function R(x) {
    return x === 9 || x === 32;
  }
  function S(x) {
    return x === 9 || x === 32 || x === 10 || x === 13;
  }
  function T(x) {
    return x === 44 || x === 91 || x === 93 || x === 123 || x === 125;
  }
  function b(x) {
    var H;
    return 48 <= x && x <= 57 ? x - 48 : (H = x | 32, 97 <= H && H <= 102 ? H - 97 + 10 : -1);
  }
  function w(x) {
    return x === 120 ? 2 : x === 117 ? 4 : x === 85 ? 8 : 0;
  }
  function _(x) {
    return 48 <= x && x <= 57 ? x - 48 : -1;
  }
  function E(x) {
    return x === 48 ? "\0" : x === 97 ? "\x07" : x === 98 ? "\b" : x === 116 || x === 9 ? "	" : x === 110 ? `
` : x === 118 ? "\v" : x === 102 ? "\f" : x === 114 ? "\r" : x === 101 ? "\x1B" : x === 32 ? " " : x === 34 ? '"' : x === 47 ? "/" : x === 92 ? "\\" : x === 78 ? "" : x === 95 ? " " : x === 76 ? "\u2028" : x === 80 ? "\u2029" : "";
  }
  function N(x) {
    return x <= 65535 ? String.fromCharCode(x) : String.fromCharCode(
      (x - 65536 >> 10) + 55296,
      (x - 65536 & 1023) + 56320
    );
  }
  function k(x, H, V) {
    H === "__proto__" ? Object.defineProperty(x, H, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: V
    }) : x[H] = V;
  }
  for (var D = new Array(256), $ = new Array(256), C = 0; C < 256; C++)
    D[C] = E(C) ? 1 : 0, $[C] = E(C);
  function I(x, H) {
    this.input = x, this.filename = H.filename || null, this.schema = H.schema || l, this.onWarning = H.onWarning || null, this.legacy = H.legacy || !1, this.json = H.json || !1, this.listener = H.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = x.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function F(x, H) {
    var V = {
      name: x.filename,
      buffer: x.input.slice(0, -1),
      // omit trailing \0
      position: x.position,
      line: x.line,
      column: x.position - x.lineStart
    };
    return V.snippet = f(V), new c(H, V);
  }
  function U(x, H) {
    throw F(x, H);
  }
  function G(x, H) {
    x.onWarning && x.onWarning.call(null, F(x, H));
  }
  var W = {
    YAML: function(H, V, se) {
      var X, ie, te;
      H.version !== null && U(H, "duplication of %YAML directive"), se.length !== 1 && U(H, "YAML directive accepts exactly one argument"), X = /^([0-9]+)\.([0-9]+)$/.exec(se[0]), X === null && U(H, "ill-formed argument of the YAML directive"), ie = parseInt(X[1], 10), te = parseInt(X[2], 10), ie !== 1 && U(H, "unacceptable YAML version of the document"), H.version = se[0], H.checkLineBreaks = te < 2, te !== 1 && te !== 2 && G(H, "unsupported YAML version of the document");
    },
    TAG: function(H, V, se) {
      var X, ie;
      se.length !== 2 && U(H, "TAG directive accepts exactly two arguments"), X = se[0], ie = se[1], g.test(X) || U(H, "ill-formed tag handle (first argument) of the TAG directive"), d.call(H.tagMap, X) && U(H, 'there is a previously declared suffix for "' + X + '" tag handle'), m.test(ie) || U(H, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        ie = decodeURIComponent(ie);
      } catch {
        U(H, "tag prefix is malformed: " + ie);
      }
      H.tagMap[X] = ie;
    }
  };
  function re(x, H, V, se) {
    var X, ie, te, ce;
    if (H < V) {
      if (ce = x.input.slice(H, V), se)
        for (X = 0, ie = ce.length; X < ie; X += 1)
          te = ce.charCodeAt(X), te === 9 || 32 <= te && te <= 1114111 || U(x, "expected valid JSON character");
      else o.test(ce) && U(x, "the stream contains non-printable characters");
      x.result += ce;
    }
  }
  function ae(x, H, V, se) {
    var X, ie, te, ce;
    for (e.isObject(V) || U(x, "cannot merge mappings; the provided source object is unacceptable"), X = Object.keys(V), te = 0, ce = X.length; te < ce; te += 1)
      ie = X[te], d.call(H, ie) || (k(H, ie, V[ie]), se[ie] = !0);
  }
  function oe(x, H, V, se, X, ie, te, ce, pe) {
    var Te, ve;
    if (Array.isArray(X))
      for (X = Array.prototype.slice.call(X), Te = 0, ve = X.length; Te < ve; Te += 1)
        Array.isArray(X[Te]) && U(x, "nested arrays are not supported inside keys"), typeof X == "object" && v(X[Te]) === "[object Object]" && (X[Te] = "[object Object]");
    if (typeof X == "object" && v(X) === "[object Object]" && (X = "[object Object]"), X = String(X), H === null && (H = {}), se === "tag:yaml.org,2002:merge")
      if (Array.isArray(ie))
        for (Te = 0, ve = ie.length; Te < ve; Te += 1)
          ae(x, H, ie[Te], V);
      else
        ae(x, H, ie, V);
    else
      !x.json && !d.call(V, X) && d.call(H, X) && (x.line = te || x.line, x.lineStart = ce || x.lineStart, x.position = pe || x.position, U(x, "duplicated mapping key")), k(H, X, ie), delete V[X];
    return H;
  }
  function ye(x) {
    var H;
    H = x.input.charCodeAt(x.position), H === 10 ? x.position++ : H === 13 ? (x.position++, x.input.charCodeAt(x.position) === 10 && x.position++) : U(x, "a line break is expected"), x.line += 1, x.lineStart = x.position, x.firstTabInLine = -1;
  }
  function _e(x, H, V) {
    for (var se = 0, X = x.input.charCodeAt(x.position); X !== 0; ) {
      for (; R(X); )
        X === 9 && x.firstTabInLine === -1 && (x.firstTabInLine = x.position), X = x.input.charCodeAt(++x.position);
      if (H && X === 35)
        do
          X = x.input.charCodeAt(++x.position);
        while (X !== 10 && X !== 13 && X !== 0);
      if (y(X))
        for (ye(x), X = x.input.charCodeAt(x.position), se++, x.lineIndent = 0; X === 32; )
          x.lineIndent++, X = x.input.charCodeAt(++x.position);
      else
        break;
    }
    return V !== -1 && se !== 0 && x.lineIndent < V && G(x, "deficient indentation"), se;
  }
  function Z(x) {
    var H = x.position, V;
    return V = x.input.charCodeAt(H), !!((V === 45 || V === 46) && V === x.input.charCodeAt(H + 1) && V === x.input.charCodeAt(H + 2) && (H += 3, V = x.input.charCodeAt(H), V === 0 || S(V)));
  }
  function Se(x, H) {
    H === 1 ? x.result += " " : H > 1 && (x.result += e.repeat(`
`, H - 1));
  }
  function O(x, H, V) {
    var se, X, ie, te, ce, pe, Te, ve, fe = x.kind, P = x.result, M;
    if (M = x.input.charCodeAt(x.position), S(M) || T(M) || M === 35 || M === 38 || M === 42 || M === 33 || M === 124 || M === 62 || M === 39 || M === 34 || M === 37 || M === 64 || M === 96 || (M === 63 || M === 45) && (X = x.input.charCodeAt(x.position + 1), S(X) || V && T(X)))
      return !1;
    for (x.kind = "scalar", x.result = "", ie = te = x.position, ce = !1; M !== 0; ) {
      if (M === 58) {
        if (X = x.input.charCodeAt(x.position + 1), S(X) || V && T(X))
          break;
      } else if (M === 35) {
        if (se = x.input.charCodeAt(x.position - 1), S(se))
          break;
      } else {
        if (x.position === x.lineStart && Z(x) || V && T(M))
          break;
        if (y(M))
          if (pe = x.line, Te = x.lineStart, ve = x.lineIndent, _e(x, !1, -1), x.lineIndent >= H) {
            ce = !0, M = x.input.charCodeAt(x.position);
            continue;
          } else {
            x.position = te, x.line = pe, x.lineStart = Te, x.lineIndent = ve;
            break;
          }
      }
      ce && (re(x, ie, te, !1), Se(x, x.line - pe), ie = te = x.position, ce = !1), R(M) || (te = x.position + 1), M = x.input.charCodeAt(++x.position);
    }
    return re(x, ie, te, !1), x.result ? !0 : (x.kind = fe, x.result = P, !1);
  }
  function A(x, H) {
    var V, se, X;
    if (V = x.input.charCodeAt(x.position), V !== 39)
      return !1;
    for (x.kind = "scalar", x.result = "", x.position++, se = X = x.position; (V = x.input.charCodeAt(x.position)) !== 0; )
      if (V === 39)
        if (re(x, se, x.position, !0), V = x.input.charCodeAt(++x.position), V === 39)
          se = x.position, x.position++, X = x.position;
        else
          return !0;
      else y(V) ? (re(x, se, X, !0), Se(x, _e(x, !1, H)), se = X = x.position) : x.position === x.lineStart && Z(x) ? U(x, "unexpected end of the document within a single quoted scalar") : (x.position++, X = x.position);
    U(x, "unexpected end of the stream within a single quoted scalar");
  }
  function z(x, H) {
    var V, se, X, ie, te, ce;
    if (ce = x.input.charCodeAt(x.position), ce !== 34)
      return !1;
    for (x.kind = "scalar", x.result = "", x.position++, V = se = x.position; (ce = x.input.charCodeAt(x.position)) !== 0; ) {
      if (ce === 34)
        return re(x, V, x.position, !0), x.position++, !0;
      if (ce === 92) {
        if (re(x, V, x.position, !0), ce = x.input.charCodeAt(++x.position), y(ce))
          _e(x, !1, H);
        else if (ce < 256 && D[ce])
          x.result += $[ce], x.position++;
        else if ((te = w(ce)) > 0) {
          for (X = te, ie = 0; X > 0; X--)
            ce = x.input.charCodeAt(++x.position), (te = b(ce)) >= 0 ? ie = (ie << 4) + te : U(x, "expected hexadecimal character");
          x.result += N(ie), x.position++;
        } else
          U(x, "unknown escape sequence");
        V = se = x.position;
      } else y(ce) ? (re(x, V, se, !0), Se(x, _e(x, !1, H)), V = se = x.position) : x.position === x.lineStart && Z(x) ? U(x, "unexpected end of the document within a double quoted scalar") : (x.position++, se = x.position);
    }
    U(x, "unexpected end of the stream within a double quoted scalar");
  }
  function q(x, H) {
    var V = !0, se, X, ie, te = x.tag, ce, pe = x.anchor, Te, ve, fe, P, M, J = /* @__PURE__ */ Object.create(null), K, Q, le, ne;
    if (ne = x.input.charCodeAt(x.position), ne === 91)
      ve = 93, M = !1, ce = [];
    else if (ne === 123)
      ve = 125, M = !0, ce = {};
    else
      return !1;
    for (x.anchor !== null && (x.anchorMap[x.anchor] = ce), ne = x.input.charCodeAt(++x.position); ne !== 0; ) {
      if (_e(x, !0, H), ne = x.input.charCodeAt(x.position), ne === ve)
        return x.position++, x.tag = te, x.anchor = pe, x.kind = M ? "mapping" : "sequence", x.result = ce, !0;
      V ? ne === 44 && U(x, "expected the node content, but found ','") : U(x, "missed comma between flow collection entries"), Q = K = le = null, fe = P = !1, ne === 63 && (Te = x.input.charCodeAt(x.position + 1), S(Te) && (fe = P = !0, x.position++, _e(x, !0, H))), se = x.line, X = x.lineStart, ie = x.position, j(x, H, s, !1, !0), Q = x.tag, K = x.result, _e(x, !0, H), ne = x.input.charCodeAt(x.position), (P || x.line === se) && ne === 58 && (fe = !0, ne = x.input.charCodeAt(++x.position), _e(x, !0, H), j(x, H, s, !1, !0), le = x.result), M ? oe(x, ce, J, Q, K, le, se, X, ie) : fe ? ce.push(oe(x, null, J, Q, K, le, se, X, ie)) : ce.push(K), _e(x, !0, H), ne = x.input.charCodeAt(x.position), ne === 44 ? (V = !0, ne = x.input.charCodeAt(++x.position)) : V = !1;
    }
    U(x, "unexpected end of the stream within a flow collection");
  }
  function me(x, H) {
    var V, se, X = n, ie = !1, te = !1, ce = H, pe = 0, Te = !1, ve, fe;
    if (fe = x.input.charCodeAt(x.position), fe === 124)
      se = !1;
    else if (fe === 62)
      se = !0;
    else
      return !1;
    for (x.kind = "scalar", x.result = ""; fe !== 0; )
      if (fe = x.input.charCodeAt(++x.position), fe === 43 || fe === 45)
        n === X ? X = fe === 43 ? p : i : U(x, "repeat of a chomping mode identifier");
      else if ((ve = _(fe)) >= 0)
        ve === 0 ? U(x, "bad explicit indentation width of a block scalar; it cannot be less than one") : te ? U(x, "repeat of an indentation width identifier") : (ce = H + ve - 1, te = !0);
      else
        break;
    if (R(fe)) {
      do
        fe = x.input.charCodeAt(++x.position);
      while (R(fe));
      if (fe === 35)
        do
          fe = x.input.charCodeAt(++x.position);
        while (!y(fe) && fe !== 0);
    }
    for (; fe !== 0; ) {
      for (ye(x), x.lineIndent = 0, fe = x.input.charCodeAt(x.position); (!te || x.lineIndent < ce) && fe === 32; )
        x.lineIndent++, fe = x.input.charCodeAt(++x.position);
      if (!te && x.lineIndent > ce && (ce = x.lineIndent), y(fe)) {
        pe++;
        continue;
      }
      if (x.lineIndent < ce) {
        X === p ? x.result += e.repeat(`
`, ie ? 1 + pe : pe) : X === n && ie && (x.result += `
`);
        break;
      }
      for (se ? R(fe) ? (Te = !0, x.result += e.repeat(`
`, ie ? 1 + pe : pe)) : Te ? (Te = !1, x.result += e.repeat(`
`, pe + 1)) : pe === 0 ? ie && (x.result += " ") : x.result += e.repeat(`
`, pe) : x.result += e.repeat(`
`, ie ? 1 + pe : pe), ie = !0, te = !0, pe = 0, V = x.position; !y(fe) && fe !== 0; )
        fe = x.input.charCodeAt(++x.position);
      re(x, V, x.position, !1);
    }
    return !0;
  }
  function be(x, H) {
    var V, se = x.tag, X = x.anchor, ie = [], te, ce = !1, pe;
    if (x.firstTabInLine !== -1) return !1;
    for (x.anchor !== null && (x.anchorMap[x.anchor] = ie), pe = x.input.charCodeAt(x.position); pe !== 0 && (x.firstTabInLine !== -1 && (x.position = x.firstTabInLine, U(x, "tab characters must not be used in indentation")), !(pe !== 45 || (te = x.input.charCodeAt(x.position + 1), !S(te)))); ) {
      if (ce = !0, x.position++, _e(x, !0, -1) && x.lineIndent <= H) {
        ie.push(null), pe = x.input.charCodeAt(x.position);
        continue;
      }
      if (V = x.line, j(x, H, a, !1, !0), ie.push(x.result), _e(x, !0, -1), pe = x.input.charCodeAt(x.position), (x.line === V || x.lineIndent > H) && pe !== 0)
        U(x, "bad indentation of a sequence entry");
      else if (x.lineIndent < H)
        break;
    }
    return ce ? (x.tag = se, x.anchor = X, x.kind = "sequence", x.result = ie, !0) : !1;
  }
  function we(x, H, V) {
    var se, X, ie, te, ce, pe, Te = x.tag, ve = x.anchor, fe = {}, P = /* @__PURE__ */ Object.create(null), M = null, J = null, K = null, Q = !1, le = !1, ne;
    if (x.firstTabInLine !== -1) return !1;
    for (x.anchor !== null && (x.anchorMap[x.anchor] = fe), ne = x.input.charCodeAt(x.position); ne !== 0; ) {
      if (!Q && x.firstTabInLine !== -1 && (x.position = x.firstTabInLine, U(x, "tab characters must not be used in indentation")), se = x.input.charCodeAt(x.position + 1), ie = x.line, (ne === 63 || ne === 58) && S(se))
        ne === 63 ? (Q && (oe(x, fe, P, M, J, null, te, ce, pe), M = J = K = null), le = !0, Q = !0, X = !0) : Q ? (Q = !1, X = !0) : U(x, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), x.position += 1, ne = se;
      else {
        if (te = x.line, ce = x.lineStart, pe = x.position, !j(x, V, t, !1, !0))
          break;
        if (x.line === ie) {
          for (ne = x.input.charCodeAt(x.position); R(ne); )
            ne = x.input.charCodeAt(++x.position);
          if (ne === 58)
            ne = x.input.charCodeAt(++x.position), S(ne) || U(x, "a whitespace character is expected after the key-value separator within a block mapping"), Q && (oe(x, fe, P, M, J, null, te, ce, pe), M = J = K = null), le = !0, Q = !1, X = !1, M = x.tag, J = x.result;
          else if (le)
            U(x, "can not read an implicit mapping pair; a colon is missed");
          else
            return x.tag = Te, x.anchor = ve, !0;
        } else if (le)
          U(x, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return x.tag = Te, x.anchor = ve, !0;
      }
      if ((x.line === ie || x.lineIndent > H) && (Q && (te = x.line, ce = x.lineStart, pe = x.position), j(x, H, r, !0, X) && (Q ? J = x.result : K = x.result), Q || (oe(x, fe, P, M, J, K, te, ce, pe), M = J = K = null), _e(x, !0, -1), ne = x.input.charCodeAt(x.position)), (x.line === ie || x.lineIndent > H) && ne !== 0)
        U(x, "bad indentation of a mapping entry");
      else if (x.lineIndent < H)
        break;
    }
    return Q && oe(x, fe, P, M, J, null, te, ce, pe), le && (x.tag = Te, x.anchor = ve, x.kind = "mapping", x.result = fe), le;
  }
  function Ce(x) {
    var H, V = !1, se = !1, X, ie, te;
    if (te = x.input.charCodeAt(x.position), te !== 33) return !1;
    if (x.tag !== null && U(x, "duplication of a tag property"), te = x.input.charCodeAt(++x.position), te === 60 ? (V = !0, te = x.input.charCodeAt(++x.position)) : te === 33 ? (se = !0, X = "!!", te = x.input.charCodeAt(++x.position)) : X = "!", H = x.position, V) {
      do
        te = x.input.charCodeAt(++x.position);
      while (te !== 0 && te !== 62);
      x.position < x.length ? (ie = x.input.slice(H, x.position), te = x.input.charCodeAt(++x.position)) : U(x, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; te !== 0 && !S(te); )
        te === 33 && (se ? U(x, "tag suffix cannot contain exclamation marks") : (X = x.input.slice(H - 1, x.position + 1), g.test(X) || U(x, "named tag handle cannot contain such characters"), se = !0, H = x.position + 1)), te = x.input.charCodeAt(++x.position);
      ie = x.input.slice(H, x.position), u.test(ie) && U(x, "tag suffix cannot contain flow indicator characters");
    }
    ie && !m.test(ie) && U(x, "tag name cannot contain such characters: " + ie);
    try {
      ie = decodeURIComponent(ie);
    } catch {
      U(x, "tag name is malformed: " + ie);
    }
    return V ? x.tag = ie : d.call(x.tagMap, X) ? x.tag = x.tagMap[X] + ie : X === "!" ? x.tag = "!" + ie : X === "!!" ? x.tag = "tag:yaml.org,2002:" + ie : U(x, 'undeclared tag handle "' + X + '"'), !0;
  }
  function Re(x) {
    var H, V;
    if (V = x.input.charCodeAt(x.position), V !== 38) return !1;
    for (x.anchor !== null && U(x, "duplication of an anchor property"), V = x.input.charCodeAt(++x.position), H = x.position; V !== 0 && !S(V) && !T(V); )
      V = x.input.charCodeAt(++x.position);
    return x.position === H && U(x, "name of an anchor node must contain at least one character"), x.anchor = x.input.slice(H, x.position), !0;
  }
  function Me(x) {
    var H, V, se;
    if (se = x.input.charCodeAt(x.position), se !== 42) return !1;
    for (se = x.input.charCodeAt(++x.position), H = x.position; se !== 0 && !S(se) && !T(se); )
      se = x.input.charCodeAt(++x.position);
    return x.position === H && U(x, "name of an alias node must contain at least one character"), V = x.input.slice(H, x.position), d.call(x.anchorMap, V) || U(x, 'unidentified alias "' + V + '"'), x.result = x.anchorMap[V], _e(x, !0, -1), !0;
  }
  function j(x, H, V, se, X) {
    var ie, te, ce, pe = 1, Te = !1, ve = !1, fe, P, M, J, K, Q;
    if (x.listener !== null && x.listener("open", x), x.tag = null, x.anchor = null, x.kind = null, x.result = null, ie = te = ce = r === V || a === V, se && _e(x, !0, -1) && (Te = !0, x.lineIndent > H ? pe = 1 : x.lineIndent === H ? pe = 0 : x.lineIndent < H && (pe = -1)), pe === 1)
      for (; Ce(x) || Re(x); )
        _e(x, !0, -1) ? (Te = !0, ce = ie, x.lineIndent > H ? pe = 1 : x.lineIndent === H ? pe = 0 : x.lineIndent < H && (pe = -1)) : ce = !1;
    if (ce && (ce = Te || X), (pe === 1 || r === V) && (s === V || t === V ? K = H : K = H + 1, Q = x.position - x.lineStart, pe === 1 ? ce && (be(x, Q) || we(x, Q, K)) || q(x, K) ? ve = !0 : (te && me(x, K) || A(x, K) || z(x, K) ? ve = !0 : Me(x) ? (ve = !0, (x.tag !== null || x.anchor !== null) && U(x, "alias node should not have any properties")) : O(x, K, s === V) && (ve = !0, x.tag === null && (x.tag = "?")), x.anchor !== null && (x.anchorMap[x.anchor] = x.result)) : pe === 0 && (ve = ce && be(x, Q))), x.tag === null)
      x.anchor !== null && (x.anchorMap[x.anchor] = x.result);
    else if (x.tag === "?") {
      for (x.result !== null && x.kind !== "scalar" && U(x, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + x.kind + '"'), fe = 0, P = x.implicitTypes.length; fe < P; fe += 1)
        if (J = x.implicitTypes[fe], J.resolve(x.result)) {
          x.result = J.construct(x.result), x.tag = J.tag, x.anchor !== null && (x.anchorMap[x.anchor] = x.result);
          break;
        }
    } else if (x.tag !== "!") {
      if (d.call(x.typeMap[x.kind || "fallback"], x.tag))
        J = x.typeMap[x.kind || "fallback"][x.tag];
      else
        for (J = null, M = x.typeMap.multi[x.kind || "fallback"], fe = 0, P = M.length; fe < P; fe += 1)
          if (x.tag.slice(0, M[fe].tag.length) === M[fe].tag) {
            J = M[fe];
            break;
          }
      J || U(x, "unknown tag !<" + x.tag + ">"), x.result !== null && J.kind !== x.kind && U(x, "unacceptable node kind for !<" + x.tag + '> tag; it should be "' + J.kind + '", not "' + x.kind + '"'), J.resolve(x.result, x.tag) ? (x.result = J.construct(x.result, x.tag), x.anchor !== null && (x.anchorMap[x.anchor] = x.result)) : U(x, "cannot resolve a node with !<" + x.tag + "> explicit tag");
    }
    return x.listener !== null && x.listener("close", x), x.tag !== null || x.anchor !== null || ve;
  }
  function Y(x) {
    var H = x.position, V, se, X, ie = !1, te;
    for (x.version = null, x.checkLineBreaks = x.legacy, x.tagMap = /* @__PURE__ */ Object.create(null), x.anchorMap = /* @__PURE__ */ Object.create(null); (te = x.input.charCodeAt(x.position)) !== 0 && (_e(x, !0, -1), te = x.input.charCodeAt(x.position), !(x.lineIndent > 0 || te !== 37)); ) {
      for (ie = !0, te = x.input.charCodeAt(++x.position), V = x.position; te !== 0 && !S(te); )
        te = x.input.charCodeAt(++x.position);
      for (se = x.input.slice(V, x.position), X = [], se.length < 1 && U(x, "directive name must not be less than one character in length"); te !== 0; ) {
        for (; R(te); )
          te = x.input.charCodeAt(++x.position);
        if (te === 35) {
          do
            te = x.input.charCodeAt(++x.position);
          while (te !== 0 && !y(te));
          break;
        }
        if (y(te)) break;
        for (V = x.position; te !== 0 && !S(te); )
          te = x.input.charCodeAt(++x.position);
        X.push(x.input.slice(V, x.position));
      }
      te !== 0 && ye(x), d.call(W, se) ? W[se](x, se, X) : G(x, 'unknown document directive "' + se + '"');
    }
    if (_e(x, !0, -1), x.lineIndent === 0 && x.input.charCodeAt(x.position) === 45 && x.input.charCodeAt(x.position + 1) === 45 && x.input.charCodeAt(x.position + 2) === 45 ? (x.position += 3, _e(x, !0, -1)) : ie && U(x, "directives end mark is expected"), j(x, x.lineIndent - 1, r, !1, !0), _e(x, !0, -1), x.checkLineBreaks && h.test(x.input.slice(H, x.position)) && G(x, "non-ASCII line breaks are interpreted as content"), x.documents.push(x.result), x.position === x.lineStart && Z(x)) {
      x.input.charCodeAt(x.position) === 46 && (x.position += 3, _e(x, !0, -1));
      return;
    }
    if (x.position < x.length - 1)
      U(x, "end of the stream or a document separator is expected");
    else
      return;
  }
  function he(x, H) {
    x = String(x), H = H || {}, x.length !== 0 && (x.charCodeAt(x.length - 1) !== 10 && x.charCodeAt(x.length - 1) !== 13 && (x += `
`), x.charCodeAt(0) === 65279 && (x = x.slice(1)));
    var V = new I(x, H), se = x.indexOf("\0");
    for (se !== -1 && (V.position = se, U(V, "null byte is not allowed in input")), V.input += "\0"; V.input.charCodeAt(V.position) === 32; )
      V.lineIndent += 1, V.position += 1;
    for (; V.position < V.length - 1; )
      Y(V);
    return V.documents;
  }
  function Ee(x, H, V) {
    H !== null && typeof H == "object" && typeof V > "u" && (V = H, H = null);
    var se = he(x, V);
    if (typeof H != "function")
      return se;
    for (var X = 0, ie = se.length; X < ie; X += 1)
      H(se[X]);
  }
  function ue(x, H) {
    var V = he(x, H);
    if (V.length !== 0) {
      if (V.length === 1)
        return V[0];
      throw new c("expected a single document in the stream, but found more");
    }
  }
  return Ur.loadAll = Ee, Ur.load = ue, Ur;
}
var Os = {}, bl;
function Wm() {
  if (bl) return Os;
  bl = 1;
  var e = xr(), c = yr(), f = _o(), l = Object.prototype.toString, d = Object.prototype.hasOwnProperty, s = 65279, t = 9, a = 10, r = 13, n = 32, i = 33, p = 34, o = 35, h = 37, u = 38, g = 39, m = 42, v = 44, y = 45, R = 58, S = 61, T = 62, b = 63, w = 64, _ = 91, E = 93, N = 96, k = 123, D = 124, $ = 125, C = {};
  C[0] = "\\0", C[7] = "\\a", C[8] = "\\b", C[9] = "\\t", C[10] = "\\n", C[11] = "\\v", C[12] = "\\f", C[13] = "\\r", C[27] = "\\e", C[34] = '\\"', C[92] = "\\\\", C[133] = "\\N", C[160] = "\\_", C[8232] = "\\L", C[8233] = "\\P";
  var I = [
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
  function G(P) {
    var M, J, K;
    if (M = P.toString(16).toUpperCase(), P <= 255)
      J = "x", K = 2;
    else if (P <= 65535)
      J = "u", K = 4;
    else if (P <= 4294967295)
      J = "U", K = 8;
    else
      throw new c("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + J + e.repeat("0", K - M.length) + M;
  }
  var W = 1, re = 2;
  function ae(P) {
    this.schema = P.schema || f, this.indent = Math.max(1, P.indent || 2), this.noArrayIndent = P.noArrayIndent || !1, this.skipInvalid = P.skipInvalid || !1, this.flowLevel = e.isNothing(P.flowLevel) ? -1 : P.flowLevel, this.styleMap = U(this.schema, P.styles || null), this.sortKeys = P.sortKeys || !1, this.lineWidth = P.lineWidth || 80, this.noRefs = P.noRefs || !1, this.noCompatMode = P.noCompatMode || !1, this.condenseFlow = P.condenseFlow || !1, this.quotingType = P.quotingType === '"' ? re : W, this.forceQuotes = P.forceQuotes || !1, this.replacer = typeof P.replacer == "function" ? P.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function oe(P, M) {
    for (var J = e.repeat(" ", M), K = 0, Q = -1, le = "", ne, de = P.length; K < de; )
      Q = P.indexOf(`
`, K), Q === -1 ? (ne = P.slice(K), K = de) : (ne = P.slice(K, Q + 1), K = Q + 1), ne.length && ne !== `
` && (le += J), le += ne;
    return le;
  }
  function ye(P, M) {
    return `
` + e.repeat(" ", P.indent * M);
  }
  function _e(P, M) {
    var J, K, Q;
    for (J = 0, K = P.implicitTypes.length; J < K; J += 1)
      if (Q = P.implicitTypes[J], Q.resolve(M))
        return !0;
    return !1;
  }
  function Z(P) {
    return P === n || P === t;
  }
  function Se(P) {
    return 32 <= P && P <= 126 || 161 <= P && P <= 55295 && P !== 8232 && P !== 8233 || 57344 <= P && P <= 65533 && P !== s || 65536 <= P && P <= 1114111;
  }
  function O(P) {
    return Se(P) && P !== s && P !== r && P !== a;
  }
  function A(P, M, J) {
    var K = O(P), Q = K && !Z(P);
    return (
      // ns-plain-safe
      (J ? (
        // c = flow-in
        K
      ) : K && P !== v && P !== _ && P !== E && P !== k && P !== $) && P !== o && !(M === R && !Q) || O(M) && !Z(M) && P === o || M === R && Q
    );
  }
  function z(P) {
    return Se(P) && P !== s && !Z(P) && P !== y && P !== b && P !== R && P !== v && P !== _ && P !== E && P !== k && P !== $ && P !== o && P !== u && P !== m && P !== i && P !== D && P !== S && P !== T && P !== g && P !== p && P !== h && P !== w && P !== N;
  }
  function q(P) {
    return !Z(P) && P !== R;
  }
  function me(P, M) {
    var J = P.charCodeAt(M), K;
    return J >= 55296 && J <= 56319 && M + 1 < P.length && (K = P.charCodeAt(M + 1), K >= 56320 && K <= 57343) ? (J - 55296) * 1024 + K - 56320 + 65536 : J;
  }
  function be(P) {
    var M = /^\n* /;
    return M.test(P);
  }
  var we = 1, Ce = 2, Re = 3, Me = 4, j = 5;
  function Y(P, M, J, K, Q, le, ne, de) {
    var xe, Ae = 0, Ie = null, Le = !1, ke = !1, cn = K !== -1, ut = -1, $t = z(me(P, 0)) && q(me(P, P.length - 1));
    if (M || ne)
      for (xe = 0; xe < P.length; Ae >= 65536 ? xe += 2 : xe++) {
        if (Ae = me(P, xe), !Se(Ae))
          return j;
        $t = $t && A(Ae, Ie, de), Ie = Ae;
      }
    else {
      for (xe = 0; xe < P.length; Ae >= 65536 ? xe += 2 : xe++) {
        if (Ae = me(P, xe), Ae === a)
          Le = !0, cn && (ke = ke || // Foldable line = too long, and not more-indented.
          xe - ut - 1 > K && P[ut + 1] !== " ", ut = xe);
        else if (!Se(Ae))
          return j;
        $t = $t && A(Ae, Ie, de), Ie = Ae;
      }
      ke = ke || cn && xe - ut - 1 > K && P[ut + 1] !== " ";
    }
    return !Le && !ke ? $t && !ne && !Q(P) ? we : le === re ? j : Ce : J > 9 && be(P) ? j : ne ? le === re ? j : Ce : ke ? Me : Re;
  }
  function he(P, M, J, K, Q) {
    P.dump = (function() {
      if (M.length === 0)
        return P.quotingType === re ? '""' : "''";
      if (!P.noCompatMode && (I.indexOf(M) !== -1 || F.test(M)))
        return P.quotingType === re ? '"' + M + '"' : "'" + M + "'";
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
        case Ce:
          return "'" + M.replace(/'/g, "''") + "'";
        case Re:
          return "|" + Ee(M, P.indent) + ue(oe(M, le));
        case Me:
          return ">" + Ee(M, P.indent) + ue(oe(x(M, ne), le));
        case j:
          return '"' + V(M) + '"';
        default:
          throw new c("impossible error: invalid scalar style");
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
  function x(P, M) {
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
      J = me(P, Q), K = C[J], !K && Se(J) ? (M += P[Q], J >= 65536 && (M += P[Q + 1])) : M += K || G(J);
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
  function ie(P, M, J) {
    var K = "", Q = P.tag, le = Object.keys(J), ne, de, xe, Ae, Ie;
    for (ne = 0, de = le.length; ne < de; ne += 1)
      Ie = "", K !== "" && (Ie += ", "), P.condenseFlow && (Ie += '"'), xe = le[ne], Ae = J[xe], P.replacer && (Ae = P.replacer.call(J, xe, Ae)), pe(P, M, xe, !1, !1) && (P.dump.length > 1024 && (Ie += "? "), Ie += P.dump + (P.condenseFlow ? '"' : "") + ":" + (P.condenseFlow ? "" : " "), pe(P, M, Ae, !1, !1) && (Ie += P.dump, K += Ie));
    P.tag = Q, P.dump = "{" + K + "}";
  }
  function te(P, M, J, K) {
    var Q = "", le = P.tag, ne = Object.keys(J), de, xe, Ae, Ie, Le, ke;
    if (P.sortKeys === !0)
      ne.sort();
    else if (typeof P.sortKeys == "function")
      ne.sort(P.sortKeys);
    else if (P.sortKeys)
      throw new c("sortKeys must be a boolean or a function");
    for (de = 0, xe = ne.length; de < xe; de += 1)
      ke = "", (!K || Q !== "") && (ke += ye(P, M)), Ae = ne[de], Ie = J[Ae], P.replacer && (Ie = P.replacer.call(J, Ae, Ie)), pe(P, M + 1, Ae, !0, !0, !0) && (Le = P.tag !== null && P.tag !== "?" || P.dump && P.dump.length > 1024, Le && (P.dump && a === P.dump.charCodeAt(0) ? ke += "?" : ke += "? "), ke += P.dump, Le && (ke += ye(P, M)), pe(P, M + 1, Ie, !0, Le) && (P.dump && a === P.dump.charCodeAt(0) ? ke += ":" : ke += ": ", ke += P.dump, Q += ke));
    P.tag = le, P.dump = Q || "{}";
  }
  function ce(P, M, J) {
    var K, Q, le, ne, de, xe;
    for (Q = J ? P.explicitTypes : P.implicitTypes, le = 0, ne = Q.length; le < ne; le += 1)
      if (de = Q[le], (de.instanceOf || de.predicate) && (!de.instanceOf || typeof M == "object" && M instanceof de.instanceOf) && (!de.predicate || de.predicate(M))) {
        if (J ? de.multi && de.representName ? P.tag = de.representName(M) : P.tag = de.tag : P.tag = "?", de.represent) {
          if (xe = P.styleMap[de.tag] || de.defaultStyle, l.call(de.represent) === "[object Function]")
            K = de.represent(M, xe);
          else if (d.call(de.represent, xe))
            K = de.represent[xe](M, xe);
          else
            throw new c("!<" + de.tag + '> tag resolver accepts not "' + xe + '" style');
          P.dump = K;
        }
        return !0;
      }
    return !1;
  }
  function pe(P, M, J, K, Q, le, ne) {
    P.tag = null, P.dump = J, ce(P, J, !1) || ce(P, J, !0);
    var de = l.call(P.dump), xe = K, Ae;
    K && (K = P.flowLevel < 0 || P.flowLevel > M);
    var Ie = de === "[object Object]" || de === "[object Array]", Le, ke;
    if (Ie && (Le = P.duplicates.indexOf(J), ke = Le !== -1), (P.tag !== null && P.tag !== "?" || ke || P.indent !== 2 && M > 0) && (Q = !1), ke && P.usedDuplicates[Le])
      P.dump = "*ref_" + Le;
    else {
      if (Ie && ke && !P.usedDuplicates[Le] && (P.usedDuplicates[Le] = !0), de === "[object Object]")
        K && Object.keys(P.dump).length !== 0 ? (te(P, M, P.dump, Q), ke && (P.dump = "&ref_" + Le + P.dump)) : (ie(P, M, P.dump), ke && (P.dump = "&ref_" + Le + " " + P.dump));
      else if (de === "[object Array]")
        K && P.dump.length !== 0 ? (P.noArrayIndent && !ne && M > 0 ? X(P, M - 1, P.dump, Q) : X(P, M, P.dump, Q), ke && (P.dump = "&ref_" + Le + P.dump)) : (se(P, M, P.dump), ke && (P.dump = "&ref_" + Le + " " + P.dump));
      else if (de === "[object String]")
        P.tag !== "?" && he(P, P.dump, M, le, xe);
      else {
        if (de === "[object Undefined]")
          return !1;
        if (P.skipInvalid) return !1;
        throw new c("unacceptable kind of an object to dump " + de);
      }
      P.tag !== null && P.tag !== "?" && (Ae = encodeURI(
        P.tag[0] === "!" ? P.tag.slice(1) : P.tag
      ).replace(/!/g, "%21"), P.tag[0] === "!" ? Ae = "!" + Ae : Ae.slice(0, 18) === "tag:yaml.org,2002:" ? Ae = "!!" + Ae.slice(18) : Ae = "!<" + Ae + ">", P.dump = Ae + " " + P.dump);
    }
    return !0;
  }
  function Te(P, M) {
    var J = [], K = [], Q, le;
    for (ve(P, J, K), Q = 0, le = K.length; Q < le; Q += 1)
      M.duplicates.push(J[K[Q]]);
    M.usedDuplicates = new Array(le);
  }
  function ve(P, M, J) {
    var K, Q, le;
    if (P !== null && typeof P == "object")
      if (Q = M.indexOf(P), Q !== -1)
        J.indexOf(Q) === -1 && J.push(Q);
      else if (M.push(P), Array.isArray(P))
        for (Q = 0, le = P.length; Q < le; Q += 1)
          ve(P[Q], M, J);
      else
        for (K = Object.keys(P), Q = 0, le = K.length; Q < le; Q += 1)
          ve(P[K[Q]], M, J);
  }
  function fe(P, M) {
    M = M || {};
    var J = new ae(M);
    J.noRefs || Te(P, J);
    var K = P;
    return J.replacer && (K = J.replacer.call({ "": K }, "", K)), pe(J, 0, K, !0, !0) ? J.dump + `
` : "";
  }
  return Os.dump = fe, Os;
}
var wl;
function Eo() {
  if (wl) return Ve;
  wl = 1;
  var e = zm(), c = Wm();
  function f(l, d) {
    return function() {
      throw new Error("Function yaml." + l + " is removed in js-yaml 4. Use yaml." + d + " instead, which is now safe by default.");
    };
  }
  return Ve.Type = Xe(), Ve.Schema = Gd(), Ve.FAILSAFE_SCHEMA = Yd(), Ve.JSON_SCHEMA = Zd(), Ve.CORE_SCHEMA = ef(), Ve.DEFAULT_SCHEMA = _o(), Ve.load = e.load, Ve.loadAll = e.loadAll, Ve.dump = c.dump, Ve.YAMLException = yr(), Ve.types = {
    binary: rf(),
    float: Qd(),
    map: Vd(),
    null: Kd(),
    pairs: af(),
    set: of(),
    timestamp: tf(),
    bool: Xd(),
    int: Jd(),
    merge: nf(),
    omap: sf(),
    seq: Wd(),
    str: zd()
  }, Ve.safeLoad = f("safeLoad", "load"), Ve.safeLoadAll = f("safeLoadAll", "loadAll"), Ve.safeDump = f("safeDump", "dump"), Ve;
}
var Pn = {}, _l;
function Vm() {
  if (_l) return Pn;
  _l = 1, Object.defineProperty(Pn, "__esModule", { value: !0 }), Pn.Lazy = void 0;
  class e {
    constructor(f) {
      this._value = null, this.creator = f;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const f = this.creator();
      return this.value = f, f;
    }
    set value(f) {
      this._value = f, this.creator = null;
    }
  }
  return Pn.Lazy = e, Pn;
}
var $r = { exports: {} }, ks, El;
function ui() {
  if (El) return ks;
  El = 1;
  const e = "2.0.0", c = 256, f = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, l = 16, d = c - 6;
  return ks = {
    MAX_LENGTH: c,
    MAX_SAFE_COMPONENT_LENGTH: l,
    MAX_SAFE_BUILD_LENGTH: d,
    MAX_SAFE_INTEGER: f,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, ks;
}
var Ps, Sl;
function pi() {
  return Sl || (Sl = 1, Ps = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...c) => console.error("SEMVER", ...c) : () => {
  }), Ps;
}
var Tl;
function br() {
  return Tl || (Tl = 1, (function(e, c) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: f,
      MAX_SAFE_BUILD_LENGTH: l,
      MAX_LENGTH: d
    } = ui(), s = pi();
    c = e.exports = {};
    const t = c.re = [], a = c.safeRe = [], r = c.src = [], n = c.safeSrc = [], i = c.t = {};
    let p = 0;
    const o = "[a-zA-Z0-9-]", h = [
      ["\\s", 1],
      ["\\d", d],
      [o, l]
    ], u = (m) => {
      for (const [v, y] of h)
        m = m.split(`${v}*`).join(`${v}{0,${y}}`).split(`${v}+`).join(`${v}{1,${y}}`);
      return m;
    }, g = (m, v, y) => {
      const R = u(v), S = p++;
      s(m, S, v), i[m] = S, r[S] = v, n[S] = R, t[S] = new RegExp(v, y ? "g" : void 0), a[S] = new RegExp(R, y ? "g" : void 0);
    };
    g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${o}*`), g("MAINVERSION", `(${r[i.NUMERICIDENTIFIER]})\\.(${r[i.NUMERICIDENTIFIER]})\\.(${r[i.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${r[i.NUMERICIDENTIFIERLOOSE]})\\.(${r[i.NUMERICIDENTIFIERLOOSE]})\\.(${r[i.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${r[i.NONNUMERICIDENTIFIER]}|${r[i.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${r[i.NONNUMERICIDENTIFIER]}|${r[i.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${r[i.PRERELEASEIDENTIFIER]}(?:\\.${r[i.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${r[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${r[i.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${o}+`), g("BUILD", `(?:\\+(${r[i.BUILDIDENTIFIER]}(?:\\.${r[i.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${r[i.MAINVERSION]}${r[i.PRERELEASE]}?${r[i.BUILD]}?`), g("FULL", `^${r[i.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${r[i.MAINVERSIONLOOSE]}${r[i.PRERELEASELOOSE]}?${r[i.BUILD]}?`), g("LOOSE", `^${r[i.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${r[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${r[i.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${r[i.XRANGEIDENTIFIER]})(?:\\.(${r[i.XRANGEIDENTIFIER]})(?:\\.(${r[i.XRANGEIDENTIFIER]})(?:${r[i.PRERELEASE]})?${r[i.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${r[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[i.XRANGEIDENTIFIERLOOSE]})(?:${r[i.PRERELEASELOOSE]})?${r[i.BUILD]}?)?)?`), g("XRANGE", `^${r[i.GTLT]}\\s*${r[i.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${r[i.GTLT]}\\s*${r[i.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${f}})(?:\\.(\\d{1,${f}}))?(?:\\.(\\d{1,${f}}))?`), g("COERCE", `${r[i.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", r[i.COERCEPLAIN] + `(?:${r[i.PRERELEASE]})?(?:${r[i.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", r[i.COERCE], !0), g("COERCERTLFULL", r[i.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${r[i.LONETILDE]}\\s+`, !0), c.tildeTrimReplace = "$1~", g("TILDE", `^${r[i.LONETILDE]}${r[i.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${r[i.LONETILDE]}${r[i.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${r[i.LONECARET]}\\s+`, !0), c.caretTrimReplace = "$1^", g("CARET", `^${r[i.LONECARET]}${r[i.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${r[i.LONECARET]}${r[i.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${r[i.GTLT]}\\s*(${r[i.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${r[i.GTLT]}\\s*(${r[i.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${r[i.GTLT]}\\s*(${r[i.LOOSEPLAIN]}|${r[i.XRANGEPLAIN]})`, !0), c.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${r[i.XRANGEPLAIN]})\\s+-\\s+(${r[i.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${r[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${r[i.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })($r, $r.exports)), $r.exports;
}
var Is, Rl;
function So() {
  if (Rl) return Is;
  Rl = 1;
  const e = Object.freeze({ loose: !0 }), c = Object.freeze({});
  return Is = (l) => l ? typeof l != "object" ? e : l : c, Is;
}
var Ns, Cl;
function cf() {
  if (Cl) return Ns;
  Cl = 1;
  const e = /^[0-9]+$/, c = (l, d) => {
    if (typeof l == "number" && typeof d == "number")
      return l === d ? 0 : l < d ? -1 : 1;
    const s = e.test(l), t = e.test(d);
    return s && t && (l = +l, d = +d), l === d ? 0 : s && !t ? -1 : t && !s ? 1 : l < d ? -1 : 1;
  };
  return Ns = {
    compareIdentifiers: c,
    rcompareIdentifiers: (l, d) => c(d, l)
  }, Ns;
}
var Ds, Al;
function Je() {
  if (Al) return Ds;
  Al = 1;
  const e = pi(), { MAX_LENGTH: c, MAX_SAFE_INTEGER: f } = ui(), { safeRe: l, t: d } = br(), s = So(), { compareIdentifiers: t } = cf();
  class a {
    constructor(n, i) {
      if (i = s(i), n instanceof a) {
        if (n.loose === !!i.loose && n.includePrerelease === !!i.includePrerelease)
          return n;
        n = n.version;
      } else if (typeof n != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof n}".`);
      if (n.length > c)
        throw new TypeError(
          `version is longer than ${c} characters`
        );
      e("SemVer", n, i), this.options = i, this.loose = !!i.loose, this.includePrerelease = !!i.includePrerelease;
      const p = n.trim().match(i.loose ? l[d.LOOSE] : l[d.FULL]);
      if (!p)
        throw new TypeError(`Invalid Version: ${n}`);
      if (this.raw = n, this.major = +p[1], this.minor = +p[2], this.patch = +p[3], this.major > f || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > f || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > f || this.patch < 0)
        throw new TypeError("Invalid patch version");
      p[4] ? this.prerelease = p[4].split(".").map((o) => {
        if (/^[0-9]+$/.test(o)) {
          const h = +o;
          if (h >= 0 && h < f)
            return h;
        }
        return o;
      }) : this.prerelease = [], this.build = p[5] ? p[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(n) {
      if (e("SemVer.compare", this.version, this.options, n), !(n instanceof a)) {
        if (typeof n == "string" && n === this.version)
          return 0;
        n = new a(n, this.options);
      }
      return n.version === this.version ? 0 : this.compareMain(n) || this.comparePre(n);
    }
    compareMain(n) {
      return n instanceof a || (n = new a(n, this.options)), this.major < n.major ? -1 : this.major > n.major ? 1 : this.minor < n.minor ? -1 : this.minor > n.minor ? 1 : this.patch < n.patch ? -1 : this.patch > n.patch ? 1 : 0;
    }
    comparePre(n) {
      if (n instanceof a || (n = new a(n, this.options)), this.prerelease.length && !n.prerelease.length)
        return -1;
      if (!this.prerelease.length && n.prerelease.length)
        return 1;
      if (!this.prerelease.length && !n.prerelease.length)
        return 0;
      let i = 0;
      do {
        const p = this.prerelease[i], o = n.prerelease[i];
        if (e("prerelease compare", i, p, o), p === void 0 && o === void 0)
          return 0;
        if (o === void 0)
          return 1;
        if (p === void 0)
          return -1;
        if (p === o)
          continue;
        return t(p, o);
      } while (++i);
    }
    compareBuild(n) {
      n instanceof a || (n = new a(n, this.options));
      let i = 0;
      do {
        const p = this.build[i], o = n.build[i];
        if (e("build compare", i, p, o), p === void 0 && o === void 0)
          return 0;
        if (o === void 0)
          return 1;
        if (p === void 0)
          return -1;
        if (p === o)
          continue;
        return t(p, o);
      } while (++i);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(n, i, p) {
      if (n.startsWith("pre")) {
        if (!i && p === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (i) {
          const o = `-${i}`.match(this.options.loose ? l[d.PRERELEASELOOSE] : l[d.PRERELEASE]);
          if (!o || o[1] !== i)
            throw new Error(`invalid identifier: ${i}`);
        }
      }
      switch (n) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", i, p);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", i, p);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", i, p), this.inc("pre", i, p);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", i, p), this.inc("pre", i, p);
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
          const o = Number(p) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [o];
          else {
            let h = this.prerelease.length;
            for (; --h >= 0; )
              typeof this.prerelease[h] == "number" && (this.prerelease[h]++, h = -2);
            if (h === -1) {
              if (i === this.prerelease.join(".") && p === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(o);
            }
          }
          if (i) {
            let h = [i, o];
            p === !1 && (h = [i]), t(this.prerelease[0], i) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = h) : this.prerelease = h;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${n}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Ds = a, Ds;
}
var Ls, Ol;
function _n() {
  if (Ol) return Ls;
  Ol = 1;
  const e = Je();
  return Ls = (f, l, d = !1) => {
    if (f instanceof e)
      return f;
    try {
      return new e(f, l);
    } catch (s) {
      if (!d)
        return null;
      throw s;
    }
  }, Ls;
}
var Fs, kl;
function Ym() {
  if (kl) return Fs;
  kl = 1;
  const e = _n();
  return Fs = (f, l) => {
    const d = e(f, l);
    return d ? d.version : null;
  }, Fs;
}
var Us, Pl;
function Km() {
  if (Pl) return Us;
  Pl = 1;
  const e = _n();
  return Us = (f, l) => {
    const d = e(f.trim().replace(/^[=v]+/, ""), l);
    return d ? d.version : null;
  }, Us;
}
var $s, Il;
function Xm() {
  if (Il) return $s;
  Il = 1;
  const e = Je();
  return $s = (f, l, d, s, t) => {
    typeof d == "string" && (t = s, s = d, d = void 0);
    try {
      return new e(
        f instanceof e ? f.version : f,
        d
      ).inc(l, s, t).version;
    } catch {
      return null;
    }
  }, $s;
}
var qs, Nl;
function Jm() {
  if (Nl) return qs;
  Nl = 1;
  const e = _n();
  return qs = (f, l) => {
    const d = e(f, null, !0), s = e(l, null, !0), t = d.compare(s);
    if (t === 0)
      return null;
    const a = t > 0, r = a ? d : s, n = a ? s : d, i = !!r.prerelease.length;
    if (!!n.prerelease.length && !i) {
      if (!n.patch && !n.minor)
        return "major";
      if (n.compareMain(r) === 0)
        return n.minor && !n.patch ? "minor" : "patch";
    }
    const o = i ? "pre" : "";
    return d.major !== s.major ? o + "major" : d.minor !== s.minor ? o + "minor" : d.patch !== s.patch ? o + "patch" : "prerelease";
  }, qs;
}
var Bs, Dl;
function Qm() {
  if (Dl) return Bs;
  Dl = 1;
  const e = Je();
  return Bs = (f, l) => new e(f, l).major, Bs;
}
var js, Ll;
function Zm() {
  if (Ll) return js;
  Ll = 1;
  const e = Je();
  return js = (f, l) => new e(f, l).minor, js;
}
var Ms, Fl;
function eg() {
  if (Fl) return Ms;
  Fl = 1;
  const e = Je();
  return Ms = (f, l) => new e(f, l).patch, Ms;
}
var Hs, Ul;
function tg() {
  if (Ul) return Hs;
  Ul = 1;
  const e = _n();
  return Hs = (f, l) => {
    const d = e(f, l);
    return d && d.prerelease.length ? d.prerelease : null;
  }, Hs;
}
var Gs, $l;
function mt() {
  if ($l) return Gs;
  $l = 1;
  const e = Je();
  return Gs = (f, l, d) => new e(f, d).compare(new e(l, d)), Gs;
}
var zs, ql;
function ng() {
  if (ql) return zs;
  ql = 1;
  const e = mt();
  return zs = (f, l, d) => e(l, f, d), zs;
}
var Ws, Bl;
function rg() {
  if (Bl) return Ws;
  Bl = 1;
  const e = mt();
  return Ws = (f, l) => e(f, l, !0), Ws;
}
var Vs, jl;
function To() {
  if (jl) return Vs;
  jl = 1;
  const e = Je();
  return Vs = (f, l, d) => {
    const s = new e(f, d), t = new e(l, d);
    return s.compare(t) || s.compareBuild(t);
  }, Vs;
}
var Ys, Ml;
function ig() {
  if (Ml) return Ys;
  Ml = 1;
  const e = To();
  return Ys = (f, l) => f.sort((d, s) => e(d, s, l)), Ys;
}
var Ks, Hl;
function sg() {
  if (Hl) return Ks;
  Hl = 1;
  const e = To();
  return Ks = (f, l) => f.sort((d, s) => e(s, d, l)), Ks;
}
var Xs, Gl;
function di() {
  if (Gl) return Xs;
  Gl = 1;
  const e = mt();
  return Xs = (f, l, d) => e(f, l, d) > 0, Xs;
}
var Js, zl;
function Ro() {
  if (zl) return Js;
  zl = 1;
  const e = mt();
  return Js = (f, l, d) => e(f, l, d) < 0, Js;
}
var Qs, Wl;
function lf() {
  if (Wl) return Qs;
  Wl = 1;
  const e = mt();
  return Qs = (f, l, d) => e(f, l, d) === 0, Qs;
}
var Zs, Vl;
function uf() {
  if (Vl) return Zs;
  Vl = 1;
  const e = mt();
  return Zs = (f, l, d) => e(f, l, d) !== 0, Zs;
}
var ea, Yl;
function Co() {
  if (Yl) return ea;
  Yl = 1;
  const e = mt();
  return ea = (f, l, d) => e(f, l, d) >= 0, ea;
}
var ta, Kl;
function Ao() {
  if (Kl) return ta;
  Kl = 1;
  const e = mt();
  return ta = (f, l, d) => e(f, l, d) <= 0, ta;
}
var na, Xl;
function pf() {
  if (Xl) return na;
  Xl = 1;
  const e = lf(), c = uf(), f = di(), l = Co(), d = Ro(), s = Ao();
  return na = (a, r, n, i) => {
    switch (r) {
      case "===":
        return typeof a == "object" && (a = a.version), typeof n == "object" && (n = n.version), a === n;
      case "!==":
        return typeof a == "object" && (a = a.version), typeof n == "object" && (n = n.version), a !== n;
      case "":
      case "=":
      case "==":
        return e(a, n, i);
      case "!=":
        return c(a, n, i);
      case ">":
        return f(a, n, i);
      case ">=":
        return l(a, n, i);
      case "<":
        return d(a, n, i);
      case "<=":
        return s(a, n, i);
      default:
        throw new TypeError(`Invalid operator: ${r}`);
    }
  }, na;
}
var ra, Jl;
function ag() {
  if (Jl) return ra;
  Jl = 1;
  const e = Je(), c = _n(), { safeRe: f, t: l } = br();
  return ra = (s, t) => {
    if (s instanceof e)
      return s;
    if (typeof s == "number" && (s = String(s)), typeof s != "string")
      return null;
    t = t || {};
    let a = null;
    if (!t.rtl)
      a = s.match(t.includePrerelease ? f[l.COERCEFULL] : f[l.COERCE]);
    else {
      const h = t.includePrerelease ? f[l.COERCERTLFULL] : f[l.COERCERTL];
      let u;
      for (; (u = h.exec(s)) && (!a || a.index + a[0].length !== s.length); )
        (!a || u.index + u[0].length !== a.index + a[0].length) && (a = u), h.lastIndex = u.index + u[1].length + u[2].length;
      h.lastIndex = -1;
    }
    if (a === null)
      return null;
    const r = a[2], n = a[3] || "0", i = a[4] || "0", p = t.includePrerelease && a[5] ? `-${a[5]}` : "", o = t.includePrerelease && a[6] ? `+${a[6]}` : "";
    return c(`${r}.${n}.${i}${p}${o}`, t);
  }, ra;
}
var ia, Ql;
function og() {
  if (Ql) return ia;
  Ql = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(f) {
      const l = this.map.get(f);
      if (l !== void 0)
        return this.map.delete(f), this.map.set(f, l), l;
    }
    delete(f) {
      return this.map.delete(f);
    }
    set(f, l) {
      if (!this.delete(f) && l !== void 0) {
        if (this.map.size >= this.max) {
          const s = this.map.keys().next().value;
          this.delete(s);
        }
        this.map.set(f, l);
      }
      return this;
    }
  }
  return ia = e, ia;
}
var sa, Zl;
function gt() {
  if (Zl) return sa;
  Zl = 1;
  const e = /\s+/g;
  class c {
    constructor(I, F) {
      if (F = d(F), I instanceof c)
        return I.loose === !!F.loose && I.includePrerelease === !!F.includePrerelease ? I : new c(I.raw, F);
      if (I instanceof s)
        return this.raw = I.value, this.set = [[I]], this.formatted = void 0, this;
      if (this.options = F, this.loose = !!F.loose, this.includePrerelease = !!F.includePrerelease, this.raw = I.trim().replace(e, " "), this.set = this.raw.split("||").map((U) => this.parseRange(U.trim())).filter((U) => U.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const U = this.set[0];
        if (this.set = this.set.filter((G) => !g(G[0])), this.set.length === 0)
          this.set = [U];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && m(G[0])) {
              this.set = [G];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let I = 0; I < this.set.length; I++) {
          I > 0 && (this.formatted += "||");
          const F = this.set[I];
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
    parseRange(I) {
      const U = ((this.options.includePrerelease && h) | (this.options.loose && u)) + ":" + I, G = l.get(U);
      if (G)
        return G;
      const W = this.options.loose, re = W ? r[n.HYPHENRANGELOOSE] : r[n.HYPHENRANGE];
      I = I.replace(re, D(this.options.includePrerelease)), t("hyphen replace", I), I = I.replace(r[n.COMPARATORTRIM], i), t("comparator trim", I), I = I.replace(r[n.TILDETRIM], p), t("tilde trim", I), I = I.replace(r[n.CARETTRIM], o), t("caret trim", I);
      let ae = I.split(" ").map((Z) => y(Z, this.options)).join(" ").split(/\s+/).map((Z) => k(Z, this.options));
      W && (ae = ae.filter((Z) => (t("loose invalid filter", Z, this.options), !!Z.match(r[n.COMPARATORLOOSE])))), t("range list", ae);
      const oe = /* @__PURE__ */ new Map(), ye = ae.map((Z) => new s(Z, this.options));
      for (const Z of ye) {
        if (g(Z))
          return [Z];
        oe.set(Z.value, Z);
      }
      oe.size > 1 && oe.has("") && oe.delete("");
      const _e = [...oe.values()];
      return l.set(U, _e), _e;
    }
    intersects(I, F) {
      if (!(I instanceof c))
        throw new TypeError("a Range is required");
      return this.set.some((U) => v(U, F) && I.set.some((G) => v(G, F) && U.every((W) => G.every((re) => W.intersects(re, F)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(I) {
      if (!I)
        return !1;
      if (typeof I == "string")
        try {
          I = new a(I, this.options);
        } catch {
          return !1;
        }
      for (let F = 0; F < this.set.length; F++)
        if ($(this.set[F], I, this.options))
          return !0;
      return !1;
    }
  }
  sa = c;
  const f = og(), l = new f(), d = So(), s = fi(), t = pi(), a = Je(), {
    safeRe: r,
    t: n,
    comparatorTrimReplace: i,
    tildeTrimReplace: p,
    caretTrimReplace: o
  } = br(), { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: u } = ui(), g = (C) => C.value === "<0.0.0-0", m = (C) => C.value === "", v = (C, I) => {
    let F = !0;
    const U = C.slice();
    let G = U.pop();
    for (; F && U.length; )
      F = U.every((W) => G.intersects(W, I)), G = U.pop();
    return F;
  }, y = (C, I) => (C = C.replace(r[n.BUILD], ""), t("comp", C, I), C = b(C, I), t("caret", C), C = S(C, I), t("tildes", C), C = _(C, I), t("xrange", C), C = N(C, I), t("stars", C), C), R = (C) => !C || C.toLowerCase() === "x" || C === "*", S = (C, I) => C.trim().split(/\s+/).map((F) => T(F, I)).join(" "), T = (C, I) => {
    const F = I.loose ? r[n.TILDELOOSE] : r[n.TILDE];
    return C.replace(F, (U, G, W, re, ae) => {
      t("tilde", C, U, G, W, re, ae);
      let oe;
      return R(G) ? oe = "" : R(W) ? oe = `>=${G}.0.0 <${+G + 1}.0.0-0` : R(re) ? oe = `>=${G}.${W}.0 <${G}.${+W + 1}.0-0` : ae ? (t("replaceTilde pr", ae), oe = `>=${G}.${W}.${re}-${ae} <${G}.${+W + 1}.0-0`) : oe = `>=${G}.${W}.${re} <${G}.${+W + 1}.0-0`, t("tilde return", oe), oe;
    });
  }, b = (C, I) => C.trim().split(/\s+/).map((F) => w(F, I)).join(" "), w = (C, I) => {
    t("caret", C, I);
    const F = I.loose ? r[n.CARETLOOSE] : r[n.CARET], U = I.includePrerelease ? "-0" : "";
    return C.replace(F, (G, W, re, ae, oe) => {
      t("caret", C, G, W, re, ae, oe);
      let ye;
      return R(W) ? ye = "" : R(re) ? ye = `>=${W}.0.0${U} <${+W + 1}.0.0-0` : R(ae) ? W === "0" ? ye = `>=${W}.${re}.0${U} <${W}.${+re + 1}.0-0` : ye = `>=${W}.${re}.0${U} <${+W + 1}.0.0-0` : oe ? (t("replaceCaret pr", oe), W === "0" ? re === "0" ? ye = `>=${W}.${re}.${ae}-${oe} <${W}.${re}.${+ae + 1}-0` : ye = `>=${W}.${re}.${ae}-${oe} <${W}.${+re + 1}.0-0` : ye = `>=${W}.${re}.${ae}-${oe} <${+W + 1}.0.0-0`) : (t("no pr"), W === "0" ? re === "0" ? ye = `>=${W}.${re}.${ae}${U} <${W}.${re}.${+ae + 1}-0` : ye = `>=${W}.${re}.${ae}${U} <${W}.${+re + 1}.0-0` : ye = `>=${W}.${re}.${ae} <${+W + 1}.0.0-0`), t("caret return", ye), ye;
    });
  }, _ = (C, I) => (t("replaceXRanges", C, I), C.split(/\s+/).map((F) => E(F, I)).join(" ")), E = (C, I) => {
    C = C.trim();
    const F = I.loose ? r[n.XRANGELOOSE] : r[n.XRANGE];
    return C.replace(F, (U, G, W, re, ae, oe) => {
      t("xRange", C, U, G, W, re, ae, oe);
      const ye = R(W), _e = ye || R(re), Z = _e || R(ae), Se = Z;
      return G === "=" && Se && (G = ""), oe = I.includePrerelease ? "-0" : "", ye ? G === ">" || G === "<" ? U = "<0.0.0-0" : U = "*" : G && Se ? (_e && (re = 0), ae = 0, G === ">" ? (G = ">=", _e ? (W = +W + 1, re = 0, ae = 0) : (re = +re + 1, ae = 0)) : G === "<=" && (G = "<", _e ? W = +W + 1 : re = +re + 1), G === "<" && (oe = "-0"), U = `${G + W}.${re}.${ae}${oe}`) : _e ? U = `>=${W}.0.0${oe} <${+W + 1}.0.0-0` : Z && (U = `>=${W}.${re}.0${oe} <${W}.${+re + 1}.0-0`), t("xRange return", U), U;
    });
  }, N = (C, I) => (t("replaceStars", C, I), C.trim().replace(r[n.STAR], "")), k = (C, I) => (t("replaceGTE0", C, I), C.trim().replace(r[I.includePrerelease ? n.GTE0PRE : n.GTE0], "")), D = (C) => (I, F, U, G, W, re, ae, oe, ye, _e, Z, Se) => (R(U) ? F = "" : R(G) ? F = `>=${U}.0.0${C ? "-0" : ""}` : R(W) ? F = `>=${U}.${G}.0${C ? "-0" : ""}` : re ? F = `>=${F}` : F = `>=${F}${C ? "-0" : ""}`, R(ye) ? oe = "" : R(_e) ? oe = `<${+ye + 1}.0.0-0` : R(Z) ? oe = `<${ye}.${+_e + 1}.0-0` : Se ? oe = `<=${ye}.${_e}.${Z}-${Se}` : C ? oe = `<${ye}.${_e}.${+Z + 1}-0` : oe = `<=${oe}`, `${F} ${oe}`.trim()), $ = (C, I, F) => {
    for (let U = 0; U < C.length; U++)
      if (!C[U].test(I))
        return !1;
    if (I.prerelease.length && !F.includePrerelease) {
      for (let U = 0; U < C.length; U++)
        if (t(C[U].semver), C[U].semver !== s.ANY && C[U].semver.prerelease.length > 0) {
          const G = C[U].semver;
          if (G.major === I.major && G.minor === I.minor && G.patch === I.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return sa;
}
var aa, eu;
function fi() {
  if (eu) return aa;
  eu = 1;
  const e = Symbol("SemVer ANY");
  class c {
    static get ANY() {
      return e;
    }
    constructor(i, p) {
      if (p = f(p), i instanceof c) {
        if (i.loose === !!p.loose)
          return i;
        i = i.value;
      }
      i = i.trim().split(/\s+/).join(" "), t("comparator", i, p), this.options = p, this.loose = !!p.loose, this.parse(i), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, t("comp", this);
    }
    parse(i) {
      const p = this.options.loose ? l[d.COMPARATORLOOSE] : l[d.COMPARATOR], o = i.match(p);
      if (!o)
        throw new TypeError(`Invalid comparator: ${i}`);
      this.operator = o[1] !== void 0 ? o[1] : "", this.operator === "=" && (this.operator = ""), o[2] ? this.semver = new a(o[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(i) {
      if (t("Comparator.test", i, this.options.loose), this.semver === e || i === e)
        return !0;
      if (typeof i == "string")
        try {
          i = new a(i, this.options);
        } catch {
          return !1;
        }
      return s(i, this.operator, this.semver, this.options);
    }
    intersects(i, p) {
      if (!(i instanceof c))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new r(i.value, p).test(this.value) : i.operator === "" ? i.value === "" ? !0 : new r(this.value, p).test(i.semver) : (p = f(p), p.includePrerelease && (this.value === "<0.0.0-0" || i.value === "<0.0.0-0") || !p.includePrerelease && (this.value.startsWith("<0.0.0") || i.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && i.operator.startsWith(">") || this.operator.startsWith("<") && i.operator.startsWith("<") || this.semver.version === i.semver.version && this.operator.includes("=") && i.operator.includes("=") || s(this.semver, "<", i.semver, p) && this.operator.startsWith(">") && i.operator.startsWith("<") || s(this.semver, ">", i.semver, p) && this.operator.startsWith("<") && i.operator.startsWith(">")));
    }
  }
  aa = c;
  const f = So(), { safeRe: l, t: d } = br(), s = pf(), t = pi(), a = Je(), r = gt();
  return aa;
}
var oa, tu;
function hi() {
  if (tu) return oa;
  tu = 1;
  const e = gt();
  return oa = (f, l, d) => {
    try {
      l = new e(l, d);
    } catch {
      return !1;
    }
    return l.test(f);
  }, oa;
}
var ca, nu;
function cg() {
  if (nu) return ca;
  nu = 1;
  const e = gt();
  return ca = (f, l) => new e(f, l).set.map((d) => d.map((s) => s.value).join(" ").trim().split(" ")), ca;
}
var la, ru;
function lg() {
  if (ru) return la;
  ru = 1;
  const e = Je(), c = gt();
  return la = (l, d, s) => {
    let t = null, a = null, r = null;
    try {
      r = new c(d, s);
    } catch {
      return null;
    }
    return l.forEach((n) => {
      r.test(n) && (!t || a.compare(n) === -1) && (t = n, a = new e(t, s));
    }), t;
  }, la;
}
var ua, iu;
function ug() {
  if (iu) return ua;
  iu = 1;
  const e = Je(), c = gt();
  return ua = (l, d, s) => {
    let t = null, a = null, r = null;
    try {
      r = new c(d, s);
    } catch {
      return null;
    }
    return l.forEach((n) => {
      r.test(n) && (!t || a.compare(n) === 1) && (t = n, a = new e(t, s));
    }), t;
  }, ua;
}
var pa, su;
function pg() {
  if (su) return pa;
  su = 1;
  const e = Je(), c = gt(), f = di();
  return pa = (d, s) => {
    d = new c(d, s);
    let t = new e("0.0.0");
    if (d.test(t) || (t = new e("0.0.0-0"), d.test(t)))
      return t;
    t = null;
    for (let a = 0; a < d.set.length; ++a) {
      const r = d.set[a];
      let n = null;
      r.forEach((i) => {
        const p = new e(i.semver.version);
        switch (i.operator) {
          case ">":
            p.prerelease.length === 0 ? p.patch++ : p.prerelease.push(0), p.raw = p.format();
          /* fallthrough */
          case "":
          case ">=":
            (!n || f(p, n)) && (n = p);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${i.operator}`);
        }
      }), n && (!t || f(t, n)) && (t = n);
    }
    return t && d.test(t) ? t : null;
  }, pa;
}
var da, au;
function dg() {
  if (au) return da;
  au = 1;
  const e = gt();
  return da = (f, l) => {
    try {
      return new e(f, l).range || "*";
    } catch {
      return null;
    }
  }, da;
}
var fa, ou;
function Oo() {
  if (ou) return fa;
  ou = 1;
  const e = Je(), c = fi(), { ANY: f } = c, l = gt(), d = hi(), s = di(), t = Ro(), a = Ao(), r = Co();
  return fa = (i, p, o, h) => {
    i = new e(i, h), p = new l(p, h);
    let u, g, m, v, y;
    switch (o) {
      case ">":
        u = s, g = a, m = t, v = ">", y = ">=";
        break;
      case "<":
        u = t, g = r, m = s, v = "<", y = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (d(i, p, h))
      return !1;
    for (let R = 0; R < p.set.length; ++R) {
      const S = p.set[R];
      let T = null, b = null;
      if (S.forEach((w) => {
        w.semver === f && (w = new c(">=0.0.0")), T = T || w, b = b || w, u(w.semver, T.semver, h) ? T = w : m(w.semver, b.semver, h) && (b = w);
      }), T.operator === v || T.operator === y || (!b.operator || b.operator === v) && g(i, b.semver))
        return !1;
      if (b.operator === y && m(i, b.semver))
        return !1;
    }
    return !0;
  }, fa;
}
var ha, cu;
function fg() {
  if (cu) return ha;
  cu = 1;
  const e = Oo();
  return ha = (f, l, d) => e(f, l, ">", d), ha;
}
var ma, lu;
function hg() {
  if (lu) return ma;
  lu = 1;
  const e = Oo();
  return ma = (f, l, d) => e(f, l, "<", d), ma;
}
var ga, uu;
function mg() {
  if (uu) return ga;
  uu = 1;
  const e = gt();
  return ga = (f, l, d) => (f = new e(f, d), l = new e(l, d), f.intersects(l, d)), ga;
}
var va, pu;
function gg() {
  if (pu) return va;
  pu = 1;
  const e = hi(), c = mt();
  return va = (f, l, d) => {
    const s = [];
    let t = null, a = null;
    const r = f.sort((o, h) => c(o, h, d));
    for (const o of r)
      e(o, l, d) ? (a = o, t || (t = o)) : (a && s.push([t, a]), a = null, t = null);
    t && s.push([t, null]);
    const n = [];
    for (const [o, h] of s)
      o === h ? n.push(o) : !h && o === r[0] ? n.push("*") : h ? o === r[0] ? n.push(`<=${h}`) : n.push(`${o} - ${h}`) : n.push(`>=${o}`);
    const i = n.join(" || "), p = typeof l.raw == "string" ? l.raw : String(l);
    return i.length < p.length ? i : l;
  }, va;
}
var xa, du;
function vg() {
  if (du) return xa;
  du = 1;
  const e = gt(), c = fi(), { ANY: f } = c, l = hi(), d = mt(), s = (p, o, h = {}) => {
    if (p === o)
      return !0;
    p = new e(p, h), o = new e(o, h);
    let u = !1;
    e: for (const g of p.set) {
      for (const m of o.set) {
        const v = r(g, m, h);
        if (u = u || v !== null, v)
          continue e;
      }
      if (u)
        return !1;
    }
    return !0;
  }, t = [new c(">=0.0.0-0")], a = [new c(">=0.0.0")], r = (p, o, h) => {
    if (p === o)
      return !0;
    if (p.length === 1 && p[0].semver === f) {
      if (o.length === 1 && o[0].semver === f)
        return !0;
      h.includePrerelease ? p = t : p = a;
    }
    if (o.length === 1 && o[0].semver === f) {
      if (h.includePrerelease)
        return !0;
      o = a;
    }
    const u = /* @__PURE__ */ new Set();
    let g, m;
    for (const _ of p)
      _.operator === ">" || _.operator === ">=" ? g = n(g, _, h) : _.operator === "<" || _.operator === "<=" ? m = i(m, _, h) : u.add(_.semver);
    if (u.size > 1)
      return null;
    let v;
    if (g && m) {
      if (v = d(g.semver, m.semver, h), v > 0)
        return null;
      if (v === 0 && (g.operator !== ">=" || m.operator !== "<="))
        return null;
    }
    for (const _ of u) {
      if (g && !l(_, String(g), h) || m && !l(_, String(m), h))
        return null;
      for (const E of o)
        if (!l(_, String(E), h))
          return !1;
      return !0;
    }
    let y, R, S, T, b = m && !h.includePrerelease && m.semver.prerelease.length ? m.semver : !1, w = g && !h.includePrerelease && g.semver.prerelease.length ? g.semver : !1;
    b && b.prerelease.length === 1 && m.operator === "<" && b.prerelease[0] === 0 && (b = !1);
    for (const _ of o) {
      if (T = T || _.operator === ">" || _.operator === ">=", S = S || _.operator === "<" || _.operator === "<=", g) {
        if (w && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === w.major && _.semver.minor === w.minor && _.semver.patch === w.patch && (w = !1), _.operator === ">" || _.operator === ">=") {
          if (y = n(g, _, h), y === _ && y !== g)
            return !1;
        } else if (g.operator === ">=" && !l(g.semver, String(_), h))
          return !1;
      }
      if (m) {
        if (b && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === b.major && _.semver.minor === b.minor && _.semver.patch === b.patch && (b = !1), _.operator === "<" || _.operator === "<=") {
          if (R = i(m, _, h), R === _ && R !== m)
            return !1;
        } else if (m.operator === "<=" && !l(m.semver, String(_), h))
          return !1;
      }
      if (!_.operator && (m || g) && v !== 0)
        return !1;
    }
    return !(g && S && !m && v !== 0 || m && T && !g && v !== 0 || w || b);
  }, n = (p, o, h) => {
    if (!p)
      return o;
    const u = d(p.semver, o.semver, h);
    return u > 0 ? p : u < 0 || o.operator === ">" && p.operator === ">=" ? o : p;
  }, i = (p, o, h) => {
    if (!p)
      return o;
    const u = d(p.semver, o.semver, h);
    return u < 0 ? p : u > 0 || o.operator === "<" && p.operator === "<=" ? o : p;
  };
  return xa = s, xa;
}
var ya, fu;
function df() {
  if (fu) return ya;
  fu = 1;
  const e = br(), c = ui(), f = Je(), l = cf(), d = _n(), s = Ym(), t = Km(), a = Xm(), r = Jm(), n = Qm(), i = Zm(), p = eg(), o = tg(), h = mt(), u = ng(), g = rg(), m = To(), v = ig(), y = sg(), R = di(), S = Ro(), T = lf(), b = uf(), w = Co(), _ = Ao(), E = pf(), N = ag(), k = fi(), D = gt(), $ = hi(), C = cg(), I = lg(), F = ug(), U = pg(), G = dg(), W = Oo(), re = fg(), ae = hg(), oe = mg(), ye = gg(), _e = vg();
  return ya = {
    parse: d,
    valid: s,
    clean: t,
    inc: a,
    diff: r,
    major: n,
    minor: i,
    patch: p,
    prerelease: o,
    compare: h,
    rcompare: u,
    compareLoose: g,
    compareBuild: m,
    sort: v,
    rsort: y,
    gt: R,
    lt: S,
    eq: T,
    neq: b,
    gte: w,
    lte: _,
    cmp: E,
    coerce: N,
    Comparator: k,
    Range: D,
    satisfies: $,
    toComparators: C,
    maxSatisfying: I,
    minSatisfying: F,
    minVersion: U,
    validRange: G,
    outside: W,
    gtr: re,
    ltr: ae,
    intersects: oe,
    simplifyRange: ye,
    subset: _e,
    SemVer: f,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: c.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: c.RELEASE_TYPES,
    compareIdentifiers: l.compareIdentifiers,
    rcompareIdentifiers: l.rcompareIdentifiers
  }, ya;
}
var pn = {}, dr = { exports: {} };
dr.exports;
var hu;
function xg() {
  return hu || (hu = 1, (function(e, c) {
    var f = 200, l = "__lodash_hash_undefined__", d = 1, s = 2, t = 9007199254740991, a = "[object Arguments]", r = "[object Array]", n = "[object AsyncFunction]", i = "[object Boolean]", p = "[object Date]", o = "[object Error]", h = "[object Function]", u = "[object GeneratorFunction]", g = "[object Map]", m = "[object Number]", v = "[object Null]", y = "[object Object]", R = "[object Promise]", S = "[object Proxy]", T = "[object RegExp]", b = "[object Set]", w = "[object String]", _ = "[object Symbol]", E = "[object Undefined]", N = "[object WeakMap]", k = "[object ArrayBuffer]", D = "[object DataView]", $ = "[object Float32Array]", C = "[object Float64Array]", I = "[object Int8Array]", F = "[object Int16Array]", U = "[object Int32Array]", G = "[object Uint8Array]", W = "[object Uint8ClampedArray]", re = "[object Uint16Array]", ae = "[object Uint32Array]", oe = /[\\^$.*+?()[\]{}|]/g, ye = /^\[object .+?Constructor\]$/, _e = /^(?:0|[1-9]\d*)$/, Z = {};
    Z[$] = Z[C] = Z[I] = Z[F] = Z[U] = Z[G] = Z[W] = Z[re] = Z[ae] = !0, Z[a] = Z[r] = Z[k] = Z[i] = Z[D] = Z[p] = Z[o] = Z[h] = Z[g] = Z[m] = Z[y] = Z[T] = Z[b] = Z[w] = Z[N] = !1;
    var Se = typeof qe == "object" && qe && qe.Object === Object && qe, O = typeof self == "object" && self && self.Object === Object && self, A = Se || O || Function("return this")(), z = c && !c.nodeType && c, q = z && !0 && e && !e.nodeType && e, me = q && q.exports === z, be = me && Se.process, we = (function() {
      try {
        return be && be.binding && be.binding("util");
      } catch {
      }
    })(), Ce = we && we.isTypedArray;
    function Re(L, B) {
      for (var ee = -1, ge = L == null ? 0 : L.length, Ne = 0, Oe = []; ++ee < ge; ) {
        var Fe = L[ee];
        B(Fe, ee, L) && (Oe[Ne++] = Fe);
      }
      return Oe;
    }
    function Me(L, B) {
      for (var ee = -1, ge = B.length, Ne = L.length; ++ee < ge; )
        L[Ne + ee] = B[ee];
      return L;
    }
    function j(L, B) {
      for (var ee = -1, ge = L == null ? 0 : L.length; ++ee < ge; )
        if (B(L[ee], ee, L))
          return !0;
      return !1;
    }
    function Y(L, B) {
      for (var ee = -1, ge = Array(L); ++ee < L; )
        ge[ee] = B(ee);
      return ge;
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
    function x(L) {
      var B = -1, ee = Array(L.size);
      return L.forEach(function(ge, Ne) {
        ee[++B] = [Ne, ge];
      }), ee;
    }
    function H(L, B) {
      return function(ee) {
        return L(B(ee));
      };
    }
    function V(L) {
      var B = -1, ee = Array(L.size);
      return L.forEach(function(ge) {
        ee[++B] = ge;
      }), ee;
    }
    var se = Array.prototype, X = Function.prototype, ie = Object.prototype, te = A["__core-js_shared__"], ce = X.toString, pe = ie.hasOwnProperty, Te = (function() {
      var L = /[^.]+$/.exec(te && te.keys && te.keys.IE_PROTO || "");
      return L ? "Symbol(src)_1." + L : "";
    })(), ve = ie.toString, fe = RegExp(
      "^" + ce.call(pe).replace(oe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), P = me ? A.Buffer : void 0, M = A.Symbol, J = A.Uint8Array, K = ie.propertyIsEnumerable, Q = se.splice, le = M ? M.toStringTag : void 0, ne = Object.getOwnPropertySymbols, de = P ? P.isBuffer : void 0, xe = H(Object.keys, Object), Ae = ln(A, "DataView"), Ie = ln(A, "Map"), Le = ln(A, "Promise"), ke = ln(A, "Set"), cn = ln(A, "WeakMap"), ut = ln(Object, "create"), $t = jt(Ae), Vf = jt(Ie), Yf = jt(Le), Kf = jt(ke), Xf = jt(cn), $o = M ? M.prototype : void 0, _i = $o ? $o.valueOf : void 0;
    function qt(L) {
      var B = -1, ee = L == null ? 0 : L.length;
      for (this.clear(); ++B < ee; ) {
        var ge = L[B];
        this.set(ge[0], ge[1]);
      }
    }
    function Jf() {
      this.__data__ = ut ? ut(null) : {}, this.size = 0;
    }
    function Qf(L) {
      var B = this.has(L) && delete this.__data__[L];
      return this.size -= B ? 1 : 0, B;
    }
    function Zf(L) {
      var B = this.__data__;
      if (ut) {
        var ee = B[L];
        return ee === l ? void 0 : ee;
      }
      return pe.call(B, L) ? B[L] : void 0;
    }
    function eh(L) {
      var B = this.__data__;
      return ut ? B[L] !== void 0 : pe.call(B, L);
    }
    function th(L, B) {
      var ee = this.__data__;
      return this.size += this.has(L) ? 0 : 1, ee[L] = ut && B === void 0 ? l : B, this;
    }
    qt.prototype.clear = Jf, qt.prototype.delete = Qf, qt.prototype.get = Zf, qt.prototype.has = eh, qt.prototype.set = th;
    function wt(L) {
      var B = -1, ee = L == null ? 0 : L.length;
      for (this.clear(); ++B < ee; ) {
        var ge = L[B];
        this.set(ge[0], ge[1]);
      }
    }
    function nh() {
      this.__data__ = [], this.size = 0;
    }
    function rh(L) {
      var B = this.__data__, ee = Er(B, L);
      if (ee < 0)
        return !1;
      var ge = B.length - 1;
      return ee == ge ? B.pop() : Q.call(B, ee, 1), --this.size, !0;
    }
    function ih(L) {
      var B = this.__data__, ee = Er(B, L);
      return ee < 0 ? void 0 : B[ee][1];
    }
    function sh(L) {
      return Er(this.__data__, L) > -1;
    }
    function ah(L, B) {
      var ee = this.__data__, ge = Er(ee, L);
      return ge < 0 ? (++this.size, ee.push([L, B])) : ee[ge][1] = B, this;
    }
    wt.prototype.clear = nh, wt.prototype.delete = rh, wt.prototype.get = ih, wt.prototype.has = sh, wt.prototype.set = ah;
    function Bt(L) {
      var B = -1, ee = L == null ? 0 : L.length;
      for (this.clear(); ++B < ee; ) {
        var ge = L[B];
        this.set(ge[0], ge[1]);
      }
    }
    function oh() {
      this.size = 0, this.__data__ = {
        hash: new qt(),
        map: new (Ie || wt)(),
        string: new qt()
      };
    }
    function ch(L) {
      var B = Sr(this, L).delete(L);
      return this.size -= B ? 1 : 0, B;
    }
    function lh(L) {
      return Sr(this, L).get(L);
    }
    function uh(L) {
      return Sr(this, L).has(L);
    }
    function ph(L, B) {
      var ee = Sr(this, L), ge = ee.size;
      return ee.set(L, B), this.size += ee.size == ge ? 0 : 1, this;
    }
    Bt.prototype.clear = oh, Bt.prototype.delete = ch, Bt.prototype.get = lh, Bt.prototype.has = uh, Bt.prototype.set = ph;
    function _r(L) {
      var B = -1, ee = L == null ? 0 : L.length;
      for (this.__data__ = new Bt(); ++B < ee; )
        this.add(L[B]);
    }
    function dh(L) {
      return this.__data__.set(L, l), this;
    }
    function fh(L) {
      return this.__data__.has(L);
    }
    _r.prototype.add = _r.prototype.push = dh, _r.prototype.has = fh;
    function Ct(L) {
      var B = this.__data__ = new wt(L);
      this.size = B.size;
    }
    function hh() {
      this.__data__ = new wt(), this.size = 0;
    }
    function mh(L) {
      var B = this.__data__, ee = B.delete(L);
      return this.size = B.size, ee;
    }
    function gh(L) {
      return this.__data__.get(L);
    }
    function vh(L) {
      return this.__data__.has(L);
    }
    function xh(L, B) {
      var ee = this.__data__;
      if (ee instanceof wt) {
        var ge = ee.__data__;
        if (!Ie || ge.length < f - 1)
          return ge.push([L, B]), this.size = ++ee.size, this;
        ee = this.__data__ = new Bt(ge);
      }
      return ee.set(L, B), this.size = ee.size, this;
    }
    Ct.prototype.clear = hh, Ct.prototype.delete = mh, Ct.prototype.get = gh, Ct.prototype.has = vh, Ct.prototype.set = xh;
    function yh(L, B) {
      var ee = Tr(L), ge = !ee && Dh(L), Ne = !ee && !ge && Ei(L), Oe = !ee && !ge && !Ne && Vo(L), Fe = ee || ge || Ne || Oe, Be = Fe ? Y(L.length, String) : [], He = Be.length;
      for (var De in L)
        pe.call(L, De) && !(Fe && // Safari 9 has enumerable `arguments.length` in strict mode.
        (De == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Ne && (De == "offset" || De == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Oe && (De == "buffer" || De == "byteLength" || De == "byteOffset") || // Skip index properties.
        Oh(De, He))) && Be.push(De);
      return Be;
    }
    function Er(L, B) {
      for (var ee = L.length; ee--; )
        if (Ho(L[ee][0], B))
          return ee;
      return -1;
    }
    function bh(L, B, ee) {
      var ge = B(L);
      return Tr(L) ? ge : Me(ge, ee(L));
    }
    function Tn(L) {
      return L == null ? L === void 0 ? E : v : le && le in Object(L) ? Ch(L) : Nh(L);
    }
    function qo(L) {
      return Rn(L) && Tn(L) == a;
    }
    function Bo(L, B, ee, ge, Ne) {
      return L === B ? !0 : L == null || B == null || !Rn(L) && !Rn(B) ? L !== L && B !== B : wh(L, B, ee, ge, Bo, Ne);
    }
    function wh(L, B, ee, ge, Ne, Oe) {
      var Fe = Tr(L), Be = Tr(B), He = Fe ? r : At(L), De = Be ? r : At(B);
      He = He == a ? y : He, De = De == a ? y : De;
      var nt = He == y, pt = De == y, ze = He == De;
      if (ze && Ei(L)) {
        if (!Ei(B))
          return !1;
        Fe = !0, nt = !1;
      }
      if (ze && !nt)
        return Oe || (Oe = new Ct()), Fe || Vo(L) ? jo(L, B, ee, ge, Ne, Oe) : Th(L, B, He, ee, ge, Ne, Oe);
      if (!(ee & d)) {
        var at = nt && pe.call(L, "__wrapped__"), ot = pt && pe.call(B, "__wrapped__");
        if (at || ot) {
          var Ot = at ? L.value() : L, _t = ot ? B.value() : B;
          return Oe || (Oe = new Ct()), Ne(Ot, _t, ee, ge, Oe);
        }
      }
      return ze ? (Oe || (Oe = new Ct()), Rh(L, B, ee, ge, Ne, Oe)) : !1;
    }
    function _h(L) {
      if (!Wo(L) || Ph(L))
        return !1;
      var B = Go(L) ? fe : ye;
      return B.test(jt(L));
    }
    function Eh(L) {
      return Rn(L) && zo(L.length) && !!Z[Tn(L)];
    }
    function Sh(L) {
      if (!Ih(L))
        return xe(L);
      var B = [];
      for (var ee in Object(L))
        pe.call(L, ee) && ee != "constructor" && B.push(ee);
      return B;
    }
    function jo(L, B, ee, ge, Ne, Oe) {
      var Fe = ee & d, Be = L.length, He = B.length;
      if (Be != He && !(Fe && He > Be))
        return !1;
      var De = Oe.get(L);
      if (De && Oe.get(B))
        return De == B;
      var nt = -1, pt = !0, ze = ee & s ? new _r() : void 0;
      for (Oe.set(L, B), Oe.set(B, L); ++nt < Be; ) {
        var at = L[nt], ot = B[nt];
        if (ge)
          var Ot = Fe ? ge(ot, at, nt, B, L, Oe) : ge(at, ot, nt, L, B, Oe);
        if (Ot !== void 0) {
          if (Ot)
            continue;
          pt = !1;
          break;
        }
        if (ze) {
          if (!j(B, function(_t, Mt) {
            if (!Ee(ze, Mt) && (at === _t || Ne(at, _t, ee, ge, Oe)))
              return ze.push(Mt);
          })) {
            pt = !1;
            break;
          }
        } else if (!(at === ot || Ne(at, ot, ee, ge, Oe))) {
          pt = !1;
          break;
        }
      }
      return Oe.delete(L), Oe.delete(B), pt;
    }
    function Th(L, B, ee, ge, Ne, Oe, Fe) {
      switch (ee) {
        case D:
          if (L.byteLength != B.byteLength || L.byteOffset != B.byteOffset)
            return !1;
          L = L.buffer, B = B.buffer;
        case k:
          return !(L.byteLength != B.byteLength || !Oe(new J(L), new J(B)));
        case i:
        case p:
        case m:
          return Ho(+L, +B);
        case o:
          return L.name == B.name && L.message == B.message;
        case T:
        case w:
          return L == B + "";
        case g:
          var Be = x;
        case b:
          var He = ge & d;
          if (Be || (Be = V), L.size != B.size && !He)
            return !1;
          var De = Fe.get(L);
          if (De)
            return De == B;
          ge |= s, Fe.set(L, B);
          var nt = jo(Be(L), Be(B), ge, Ne, Oe, Fe);
          return Fe.delete(L), nt;
        case _:
          if (_i)
            return _i.call(L) == _i.call(B);
      }
      return !1;
    }
    function Rh(L, B, ee, ge, Ne, Oe) {
      var Fe = ee & d, Be = Mo(L), He = Be.length, De = Mo(B), nt = De.length;
      if (He != nt && !Fe)
        return !1;
      for (var pt = He; pt--; ) {
        var ze = Be[pt];
        if (!(Fe ? ze in B : pe.call(B, ze)))
          return !1;
      }
      var at = Oe.get(L);
      if (at && Oe.get(B))
        return at == B;
      var ot = !0;
      Oe.set(L, B), Oe.set(B, L);
      for (var Ot = Fe; ++pt < He; ) {
        ze = Be[pt];
        var _t = L[ze], Mt = B[ze];
        if (ge)
          var Yo = Fe ? ge(Mt, _t, ze, B, L, Oe) : ge(_t, Mt, ze, L, B, Oe);
        if (!(Yo === void 0 ? _t === Mt || Ne(_t, Mt, ee, ge, Oe) : Yo)) {
          ot = !1;
          break;
        }
        Ot || (Ot = ze == "constructor");
      }
      if (ot && !Ot) {
        var Rr = L.constructor, Cr = B.constructor;
        Rr != Cr && "constructor" in L && "constructor" in B && !(typeof Rr == "function" && Rr instanceof Rr && typeof Cr == "function" && Cr instanceof Cr) && (ot = !1);
      }
      return Oe.delete(L), Oe.delete(B), ot;
    }
    function Mo(L) {
      return bh(L, Uh, Ah);
    }
    function Sr(L, B) {
      var ee = L.__data__;
      return kh(B) ? ee[typeof B == "string" ? "string" : "hash"] : ee.map;
    }
    function ln(L, B) {
      var ee = ue(L, B);
      return _h(ee) ? ee : void 0;
    }
    function Ch(L) {
      var B = pe.call(L, le), ee = L[le];
      try {
        L[le] = void 0;
        var ge = !0;
      } catch {
      }
      var Ne = ve.call(L);
      return ge && (B ? L[le] = ee : delete L[le]), Ne;
    }
    var Ah = ne ? function(L) {
      return L == null ? [] : (L = Object(L), Re(ne(L), function(B) {
        return K.call(L, B);
      }));
    } : $h, At = Tn;
    (Ae && At(new Ae(new ArrayBuffer(1))) != D || Ie && At(new Ie()) != g || Le && At(Le.resolve()) != R || ke && At(new ke()) != b || cn && At(new cn()) != N) && (At = function(L) {
      var B = Tn(L), ee = B == y ? L.constructor : void 0, ge = ee ? jt(ee) : "";
      if (ge)
        switch (ge) {
          case $t:
            return D;
          case Vf:
            return g;
          case Yf:
            return R;
          case Kf:
            return b;
          case Xf:
            return N;
        }
      return B;
    });
    function Oh(L, B) {
      return B = B ?? t, !!B && (typeof L == "number" || _e.test(L)) && L > -1 && L % 1 == 0 && L < B;
    }
    function kh(L) {
      var B = typeof L;
      return B == "string" || B == "number" || B == "symbol" || B == "boolean" ? L !== "__proto__" : L === null;
    }
    function Ph(L) {
      return !!Te && Te in L;
    }
    function Ih(L) {
      var B = L && L.constructor, ee = typeof B == "function" && B.prototype || ie;
      return L === ee;
    }
    function Nh(L) {
      return ve.call(L);
    }
    function jt(L) {
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
    function Ho(L, B) {
      return L === B || L !== L && B !== B;
    }
    var Dh = qo(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? qo : function(L) {
      return Rn(L) && pe.call(L, "callee") && !K.call(L, "callee");
    }, Tr = Array.isArray;
    function Lh(L) {
      return L != null && zo(L.length) && !Go(L);
    }
    var Ei = de || qh;
    function Fh(L, B) {
      return Bo(L, B);
    }
    function Go(L) {
      if (!Wo(L))
        return !1;
      var B = Tn(L);
      return B == h || B == u || B == n || B == S;
    }
    function zo(L) {
      return typeof L == "number" && L > -1 && L % 1 == 0 && L <= t;
    }
    function Wo(L) {
      var B = typeof L;
      return L != null && (B == "object" || B == "function");
    }
    function Rn(L) {
      return L != null && typeof L == "object";
    }
    var Vo = Ce ? he(Ce) : Eh;
    function Uh(L) {
      return Lh(L) ? yh(L) : Sh(L);
    }
    function $h() {
      return [];
    }
    function qh() {
      return !1;
    }
    e.exports = Fh;
  })(dr, dr.exports)), dr.exports;
}
var mu;
function yg() {
  if (mu) return pn;
  mu = 1, Object.defineProperty(pn, "__esModule", { value: !0 }), pn.DownloadedUpdateHelper = void 0, pn.createTempUpdateFile = a;
  const e = yt, c = Ze, f = xg(), l = /* @__PURE__ */ Ft(), d = Pe;
  let s = class {
    constructor(n) {
      this.cacheDir = n, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
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
    async validateDownloadedPath(n, i, p, o) {
      if (this.versionInfo != null && this.file === n && this.fileInfo != null)
        return f(this.versionInfo, i) && f(this.fileInfo.info, p.info) && await (0, l.pathExists)(n) ? n : null;
      const h = await this.getValidCachedUpdateFile(p, o);
      return h === null ? null : (o.info(`Update has already been downloaded to ${n}).`), this._file = h, h);
    }
    async setDownloadedFile(n, i, p, o, h, u) {
      this._file = n, this._packageFile = i, this.versionInfo = p, this.fileInfo = o, this._downloadedFileInfo = {
        fileName: h,
        sha512: o.info.sha512,
        isAdminRightsRequired: o.info.isAdminRightsRequired === !0
      }, u && await (0, l.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, l.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(n, i) {
      const p = this.getUpdateInfoFile();
      if (!await (0, l.pathExists)(p))
        return null;
      let h;
      try {
        h = await (0, l.readJson)(p);
      } catch (v) {
        let y = "No cached update info available";
        return v.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), y += ` (error on read: ${v.message})`), i.info(y), null;
      }
      if (!((h == null ? void 0 : h.fileName) !== null))
        return i.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (n.info.sha512 !== h.sha512)
        return i.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${h.sha512}, expected: ${n.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const g = d.join(this.cacheDirForPendingUpdate, h.fileName);
      if (!await (0, l.pathExists)(g))
        return i.info("Cached update file doesn't exist"), null;
      const m = await t(g);
      return n.info.sha512 !== m ? (i.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m}, expected: ${n.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = h, g);
    }
    getUpdateInfoFile() {
      return d.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  pn.DownloadedUpdateHelper = s;
  function t(r, n = "sha512", i = "base64", p) {
    return new Promise((o, h) => {
      const u = (0, e.createHash)(n);
      u.on("error", h).setEncoding(i), (0, c.createReadStream)(r, {
        ...p,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", h).on("end", () => {
        u.end(), o(u.read());
      }).pipe(u, { end: !1 });
    });
  }
  async function a(r, n, i) {
    let p = 0, o = d.join(n, r);
    for (let h = 0; h < 3; h++)
      try {
        return await (0, l.unlink)(o), o;
      } catch (u) {
        if (u.code === "ENOENT")
          return o;
        i.warn(`Error on remove temp update file: ${u}`), o = d.join(n, `${p++}-${r}`);
      }
    return o;
  }
  return pn;
}
var In = {}, qr = {}, gu;
function bg() {
  if (gu) return qr;
  gu = 1, Object.defineProperty(qr, "__esModule", { value: !0 }), qr.getAppCacheDir = f;
  const e = Pe, c = mr;
  function f() {
    const l = (0, c.homedir)();
    let d;
    return process.platform === "win32" ? d = process.env.LOCALAPPDATA || e.join(l, "AppData", "Local") : process.platform === "darwin" ? d = e.join(l, "Library", "Caches") : d = process.env.XDG_CACHE_HOME || e.join(l, ".cache"), d;
  }
  return qr;
}
var vu;
function wg() {
  if (vu) return In;
  vu = 1, Object.defineProperty(In, "__esModule", { value: !0 }), In.ElectronAppAdapter = void 0;
  const e = Pe, c = bg();
  let f = class {
    constructor(d = nn.app) {
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
      return this.isPackaged ? e.join(process.resourcesPath, "app-update.yml") : e.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, c.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(d) {
      this.app.once("quit", (s, t) => d(t));
    }
  };
  return In.ElectronAppAdapter = f, In;
}
var ba = {}, xu;
function _g() {
  return xu || (xu = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = f;
    const c = Ge();
    e.NET_SESSION_NAME = "electron-updater";
    function f() {
      return nn.session.fromPartition(e.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class l extends c.HttpExecutor {
      constructor(s) {
        super(), this.proxyLoginCallback = s, this.cachedSession = null;
      }
      async download(s, t, a) {
        return await a.cancellationToken.createPromise((r, n, i) => {
          const p = {
            headers: a.headers || void 0,
            redirect: "manual"
          };
          (0, c.configureRequestUrl)(s, p), (0, c.configureRequestOptions)(p), this.doDownload(p, {
            destination: t,
            options: a,
            onCancel: i,
            callback: (o) => {
              o == null ? r(t) : n(o);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(s, t) {
        s.headers && s.headers.Host && (s.host = s.headers.Host, delete s.headers.Host), this.cachedSession == null && (this.cachedSession = f());
        const a = nn.net.request({
          ...s,
          session: this.cachedSession
        });
        return a.on("response", t), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
      }
      addRedirectHandlers(s, t, a, r, n) {
        s.on("redirect", (i, p, o) => {
          s.abort(), r > this.maxRedirects ? a(this.createMaxRedirectError()) : n(c.HttpExecutor.prepareRedirectUrlOptions(o, t));
        });
      }
    }
    e.ElectronHttpExecutor = l;
  })(ba)), ba;
}
var Nn = {}, Vt = {}, wa, yu;
function Eg() {
  if (yu) return wa;
  yu = 1;
  var e = "[object Symbol]", c = /[\\^$.*+?()[\]{}|]/g, f = RegExp(c.source), l = typeof qe == "object" && qe && qe.Object === Object && qe, d = typeof self == "object" && self && self.Object === Object && self, s = l || d || Function("return this")(), t = Object.prototype, a = t.toString, r = s.Symbol, n = r ? r.prototype : void 0, i = n ? n.toString : void 0;
  function p(m) {
    if (typeof m == "string")
      return m;
    if (h(m))
      return i ? i.call(m) : "";
    var v = m + "";
    return v == "0" && 1 / m == -1 / 0 ? "-0" : v;
  }
  function o(m) {
    return !!m && typeof m == "object";
  }
  function h(m) {
    return typeof m == "symbol" || o(m) && a.call(m) == e;
  }
  function u(m) {
    return m == null ? "" : p(m);
  }
  function g(m) {
    return m = u(m), m && f.test(m) ? m.replace(c, "\\$&") : m;
  }
  return wa = g, wa;
}
var bu;
function an() {
  if (bu) return Vt;
  bu = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.newBaseUrl = f, Vt.newUrlFromBase = l, Vt.getChannelFilename = d, Vt.blockmapFiles = s;
  const e = rn, c = Eg();
  function f(t) {
    const a = new e.URL(t);
    return a.pathname.endsWith("/") || (a.pathname += "/"), a;
  }
  function l(t, a, r = !1) {
    const n = new e.URL(t, a), i = a.search;
    return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
  }
  function d(t) {
    return `${t}.yml`;
  }
  function s(t, a, r) {
    const n = l(`${t.pathname}.blockmap`, t);
    return [l(`${t.pathname.replace(new RegExp(c(r), "g"), a)}.blockmap`, t), n];
  }
  return Vt;
}
var Et = {}, wu;
function lt() {
  if (wu) return Et;
  wu = 1, Object.defineProperty(Et, "__esModule", { value: !0 }), Et.Provider = void 0, Et.findFile = d, Et.parseUpdateInfo = s, Et.getFileList = t, Et.resolveFiles = a;
  const e = Ge(), c = Eo(), f = an();
  let l = class {
    constructor(n) {
      this.runtimeOptions = n, this.requestHeaders = null, this.executor = n.executor;
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const n = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (n === "x64" ? "" : `-${n}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(n) {
      return `${n}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(n) {
      this.requestHeaders = n;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(n, i, p) {
      return this.executor.request(this.createRequestOptions(n, i), p);
    }
    createRequestOptions(n, i) {
      const p = {};
      return this.requestHeaders == null ? i != null && (p.headers = i) : p.headers = i == null ? this.requestHeaders : { ...this.requestHeaders, ...i }, (0, e.configureRequestUrl)(n, p), p;
    }
  };
  Et.Provider = l;
  function d(r, n, i) {
    if (r.length === 0)
      throw (0, e.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const p = r.find((o) => o.url.pathname.toLowerCase().endsWith(`.${n}`));
    return p ?? (i == null ? r[0] : r.find((o) => !i.some((h) => o.url.pathname.toLowerCase().endsWith(`.${h}`))));
  }
  function s(r, n, i) {
    if (r == null)
      throw (0, e.newError)(`Cannot parse update info from ${n} in the latest release artifacts (${i}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let p;
    try {
      p = (0, c.load)(r);
    } catch (o) {
      throw (0, e.newError)(`Cannot parse update info from ${n} in the latest release artifacts (${i}): ${o.stack || o.message}, rawData: ${r}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return p;
  }
  function t(r) {
    const n = r.files;
    if (n != null && n.length > 0)
      return n;
    if (r.path != null)
      return [
        {
          url: r.path,
          sha2: r.sha2,
          sha512: r.sha512
        }
      ];
    throw (0, e.newError)(`No files provided: ${(0, e.safeStringifyJson)(r)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function a(r, n, i = (p) => p) {
    const o = t(r).map((g) => {
      if (g.sha2 == null && g.sha512 == null)
        throw (0, e.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, e.safeStringifyJson)(g)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, f.newUrlFromBase)(i(g.url), n),
        info: g
      };
    }), h = r.packages, u = h == null ? null : h[process.arch] || h.ia32;
    return u != null && (o[0].packageInfo = {
      ...u,
      path: (0, f.newUrlFromBase)(i(u.path), n).href
    }), o;
  }
  return Et;
}
var _u;
function ff() {
  if (_u) return Nn;
  _u = 1, Object.defineProperty(Nn, "__esModule", { value: !0 }), Nn.GenericProvider = void 0;
  const e = Ge(), c = an(), f = lt();
  let l = class extends f.Provider {
    constructor(s, t, a) {
      super(a), this.configuration = s, this.updater = t, this.baseUrl = (0, c.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const s = this.updater.channel || this.configuration.channel;
      return s == null ? this.getDefaultChannelName() : this.getCustomChannelName(s);
    }
    async getLatestVersion() {
      const s = (0, c.getChannelFilename)(this.channel), t = (0, c.newUrlFromBase)(s, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let a = 0; ; a++)
        try {
          return (0, f.parseUpdateInfo)(await this.httpRequest(t), s, t);
        } catch (r) {
          if (r instanceof e.HttpError && r.statusCode === 404)
            throw (0, e.newError)(`Cannot find channel "${s}" update info: ${r.stack || r.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (r.code === "ECONNREFUSED" && a < 3) {
            await new Promise((n, i) => {
              try {
                setTimeout(n, 1e3 * a);
              } catch (p) {
                i(p);
              }
            });
            continue;
          }
          throw r;
        }
    }
    resolveFiles(s) {
      return (0, f.resolveFiles)(s, this.baseUrl);
    }
  };
  return Nn.GenericProvider = l, Nn;
}
var Dn = {}, Ln = {}, Eu;
function Sg() {
  if (Eu) return Ln;
  Eu = 1, Object.defineProperty(Ln, "__esModule", { value: !0 }), Ln.BitbucketProvider = void 0;
  const e = Ge(), c = an(), f = lt();
  let l = class extends f.Provider {
    constructor(s, t, a) {
      super({
        ...a,
        isUseMultipleRangeRequest: !1
      }), this.configuration = s, this.updater = t;
      const { owner: r, slug: n } = s;
      this.baseUrl = (0, c.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${r}/${n}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const s = new e.CancellationToken(), t = (0, c.getChannelFilename)(this.getCustomChannelName(this.channel)), a = (0, c.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(a, void 0, s);
        return (0, f.parseUpdateInfo)(r, t, a);
      } catch (r) {
        throw (0, e.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(s) {
      return (0, f.resolveFiles)(s, this.baseUrl);
    }
    toString() {
      const { owner: s, slug: t } = this.configuration;
      return `Bitbucket (owner: ${s}, slug: ${t}, channel: ${this.channel})`;
    }
  };
  return Ln.BitbucketProvider = l, Ln;
}
var It = {}, Su;
function hf() {
  if (Su) return It;
  Su = 1, Object.defineProperty(It, "__esModule", { value: !0 }), It.GitHubProvider = It.BaseGitHubProvider = void 0, It.computeReleaseNotes = n;
  const e = Ge(), c = df(), f = rn, l = an(), d = lt(), s = /\/tag\/([^/]+)$/;
  class t extends d.Provider {
    constructor(p, o, h) {
      super({
        ...h,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = p, this.baseUrl = (0, l.newBaseUrl)((0, e.githubUrl)(p, o));
      const u = o === "github.com" ? "api.github.com" : o;
      this.baseApiUrl = (0, l.newBaseUrl)((0, e.githubUrl)(p, u));
    }
    computeGithubBasePath(p) {
      const o = this.options.host;
      return o && !["github.com", "api.github.com"].includes(o) ? `/api/v3${p}` : p;
    }
  }
  It.BaseGitHubProvider = t;
  let a = class extends t {
    constructor(p, o, h) {
      super(p, "github.com", h), this.options = p, this.updater = o;
    }
    get channel() {
      const p = this.updater.channel || this.options.channel;
      return p == null ? this.getDefaultChannelName() : this.getCustomChannelName(p);
    }
    async getLatestVersion() {
      var p, o, h, u, g;
      const m = new e.CancellationToken(), v = await this.httpRequest((0, l.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, m), y = (0, e.parseXml)(v);
      let R = y.element("entry", !1, "No published versions on GitHub"), S = null;
      try {
        if (this.updater.allowPrerelease) {
          const N = ((p = this.updater) === null || p === void 0 ? void 0 : p.channel) || ((o = c.prerelease(this.updater.currentVersion)) === null || o === void 0 ? void 0 : o[0]) || null;
          if (N === null)
            S = s.exec(R.element("link").attribute("href"))[1];
          else
            for (const k of y.getElements("entry")) {
              const D = s.exec(k.element("link").attribute("href"));
              if (D === null)
                continue;
              const $ = D[1], C = ((h = c.prerelease($)) === null || h === void 0 ? void 0 : h[0]) || null, I = !N || ["alpha", "beta"].includes(N), F = C !== null && !["alpha", "beta"].includes(String(C));
              if (I && !F && !(N === "beta" && C === "alpha")) {
                S = $;
                break;
              }
              if (C && C === N) {
                S = $;
                break;
              }
            }
        } else {
          S = await this.getLatestTagName(m);
          for (const N of y.getElements("entry"))
            if (s.exec(N.element("link").attribute("href"))[1] === S) {
              R = N;
              break;
            }
        }
      } catch (N) {
        throw (0, e.newError)(`Cannot parse releases feed: ${N.stack || N.message},
XML:
${v}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (S == null)
        throw (0, e.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let T, b = "", w = "";
      const _ = async (N) => {
        b = (0, l.getChannelFilename)(N), w = (0, l.newUrlFromBase)(this.getBaseDownloadPath(String(S), b), this.baseUrl);
        const k = this.createRequestOptions(w);
        try {
          return await this.executor.request(k, m);
        } catch (D) {
          throw D instanceof e.HttpError && D.statusCode === 404 ? (0, e.newError)(`Cannot find ${b} in the latest release artifacts (${w}): ${D.stack || D.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : D;
        }
      };
      try {
        let N = this.channel;
        this.updater.allowPrerelease && (!((u = c.prerelease(S)) === null || u === void 0) && u[0]) && (N = this.getCustomChannelName(String((g = c.prerelease(S)) === null || g === void 0 ? void 0 : g[0]))), T = await _(N);
      } catch (N) {
        if (this.updater.allowPrerelease)
          T = await _(this.getDefaultChannelName());
        else
          throw N;
      }
      const E = (0, d.parseUpdateInfo)(T, b, w);
      return E.releaseName == null && (E.releaseName = R.elementValueOrEmpty("title")), E.releaseNotes == null && (E.releaseNotes = n(this.updater.currentVersion, this.updater.fullChangelog, y, R)), {
        tag: S,
        ...E
      };
    }
    async getLatestTagName(p) {
      const o = this.options, h = o.host == null || o.host === "github.com" ? (0, l.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new f.URL(`${this.computeGithubBasePath(`/repos/${o.owner}/${o.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const u = await this.httpRequest(h, { Accept: "application/json" }, p);
        return u == null ? null : JSON.parse(u).tag_name;
      } catch (u) {
        throw (0, e.newError)(`Unable to find latest version on GitHub (${h}), please ensure a production release exists: ${u.stack || u.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(p) {
      return (0, d.resolveFiles)(p, this.baseUrl, (o) => this.getBaseDownloadPath(p.tag, o.replace(/ /g, "-")));
    }
    getBaseDownloadPath(p, o) {
      return `${this.basePath}/download/${p}/${o}`;
    }
  };
  It.GitHubProvider = a;
  function r(i) {
    const p = i.elementValueOrEmpty("content");
    return p === "No content." ? "" : p;
  }
  function n(i, p, o, h) {
    if (!p)
      return r(h);
    const u = [];
    for (const g of o.getElements("entry")) {
      const m = /\/tag\/v?([^/]+)$/.exec(g.element("link").attribute("href"))[1];
      c.lt(i, m) && u.push({
        version: m,
        note: r(g)
      });
    }
    return u.sort((g, m) => c.rcompare(g.version, m.version));
  }
  return It;
}
var Fn = {}, Tu;
function Tg() {
  if (Tu) return Fn;
  Tu = 1, Object.defineProperty(Fn, "__esModule", { value: !0 }), Fn.KeygenProvider = void 0;
  const e = Ge(), c = an(), f = lt();
  let l = class extends f.Provider {
    constructor(s, t, a) {
      super({
        ...a,
        isUseMultipleRangeRequest: !1
      }), this.configuration = s, this.updater = t, this.defaultHostname = "api.keygen.sh";
      const r = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, c.newBaseUrl)(`https://${r}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const s = new e.CancellationToken(), t = (0, c.getChannelFilename)(this.getCustomChannelName(this.channel)), a = (0, c.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(a, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, s);
        return (0, f.parseUpdateInfo)(r, t, a);
      } catch (r) {
        throw (0, e.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(s) {
      return (0, f.resolveFiles)(s, this.baseUrl);
    }
    toString() {
      const { account: s, product: t, platform: a } = this.configuration;
      return `Keygen (account: ${s}, product: ${t}, platform: ${a}, channel: ${this.channel})`;
    }
  };
  return Fn.KeygenProvider = l, Fn;
}
var Un = {}, Ru;
function Rg() {
  if (Ru) return Un;
  Ru = 1, Object.defineProperty(Un, "__esModule", { value: !0 }), Un.PrivateGitHubProvider = void 0;
  const e = Ge(), c = Eo(), f = Pe, l = rn, d = an(), s = hf(), t = lt();
  let a = class extends s.BaseGitHubProvider {
    constructor(n, i, p, o) {
      super(n, "api.github.com", o), this.updater = i, this.token = p;
    }
    createRequestOptions(n, i) {
      const p = super.createRequestOptions(n, i);
      return p.redirect = "manual", p;
    }
    async getLatestVersion() {
      const n = new e.CancellationToken(), i = (0, d.getChannelFilename)(this.getDefaultChannelName()), p = await this.getLatestVersionInfo(n), o = p.assets.find((g) => g.name === i);
      if (o == null)
        throw (0, e.newError)(`Cannot find ${i} in the release ${p.html_url || p.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const h = new l.URL(o.url);
      let u;
      try {
        u = (0, c.load)(await this.httpRequest(h, this.configureHeaders("application/octet-stream"), n));
      } catch (g) {
        throw g instanceof e.HttpError && g.statusCode === 404 ? (0, e.newError)(`Cannot find ${i} in the latest release artifacts (${h}): ${g.stack || g.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : g;
      }
      return u.assets = p.assets, u;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(n) {
      return {
        accept: n,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(n) {
      const i = this.updater.allowPrerelease;
      let p = this.basePath;
      i || (p = `${p}/latest`);
      const o = (0, d.newUrlFromBase)(p, this.baseUrl);
      try {
        const h = JSON.parse(await this.httpRequest(o, this.configureHeaders("application/vnd.github.v3+json"), n));
        return i ? h.find((u) => u.prerelease) || h[0] : h;
      } catch (h) {
        throw (0, e.newError)(`Unable to find latest version on GitHub (${o}), please ensure a production release exists: ${h.stack || h.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(n) {
      return (0, t.getFileList)(n).map((i) => {
        const p = f.posix.basename(i.url).replace(/ /g, "-"), o = n.assets.find((h) => h != null && h.name === p);
        if (o == null)
          throw (0, e.newError)(`Cannot find asset "${p}" in: ${JSON.stringify(n.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new l.URL(o.url),
          info: i
        };
      });
    }
  };
  return Un.PrivateGitHubProvider = a, Un;
}
var Cu;
function Cg() {
  if (Cu) return Dn;
  Cu = 1, Object.defineProperty(Dn, "__esModule", { value: !0 }), Dn.isUrlProbablySupportMultiRangeRequests = t, Dn.createClient = a;
  const e = Ge(), c = Sg(), f = ff(), l = hf(), d = Tg(), s = Rg();
  function t(r) {
    return !r.includes("s3.amazonaws.com");
  }
  function a(r, n, i) {
    if (typeof r == "string")
      throw (0, e.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const p = r.provider;
    switch (p) {
      case "github": {
        const o = r, h = (o.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || o.token;
        return h == null ? new l.GitHubProvider(o, n, i) : new s.PrivateGitHubProvider(o, n, h, i);
      }
      case "bitbucket":
        return new c.BitbucketProvider(r, n, i);
      case "keygen":
        return new d.KeygenProvider(r, n, i);
      case "s3":
      case "spaces":
        return new f.GenericProvider({
          provider: "generic",
          url: (0, e.getS3LikeProviderBaseUrl)(r),
          channel: r.channel || null
        }, n, {
          ...i,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const o = r;
        return new f.GenericProvider(o, n, {
          ...i,
          isUseMultipleRangeRequest: o.useMultipleRangeRequest !== !1 && t(o.url)
        });
      }
      case "custom": {
        const o = r, h = o.updateProvider;
        if (!h)
          throw (0, e.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new h(o, n, i);
      }
      default:
        throw (0, e.newError)(`Unsupported provider: ${p}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return Dn;
}
var $n = {}, qn = {}, dn = {}, fn = {}, Au;
function ko() {
  if (Au) return fn;
  Au = 1, Object.defineProperty(fn, "__esModule", { value: !0 }), fn.OperationKind = void 0, fn.computeOperations = c;
  var e;
  (function(t) {
    t[t.COPY = 0] = "COPY", t[t.DOWNLOAD = 1] = "DOWNLOAD";
  })(e || (fn.OperationKind = e = {}));
  function c(t, a, r) {
    const n = s(t.files), i = s(a.files);
    let p = null;
    const o = a.files[0], h = [], u = o.name, g = n.get(u);
    if (g == null)
      throw new Error(`no file ${u} in old blockmap`);
    const m = i.get(u);
    let v = 0;
    const { checksumToOffset: y, checksumToOldSize: R } = d(n.get(u), g.offset, r);
    let S = o.offset;
    for (let T = 0; T < m.checksums.length; S += m.sizes[T], T++) {
      const b = m.sizes[T], w = m.checksums[T];
      let _ = y.get(w);
      _ != null && R.get(w) !== b && (r.warn(`Checksum ("${w}") matches, but size differs (old: ${R.get(w)}, new: ${b})`), _ = void 0), _ === void 0 ? (v++, p != null && p.kind === e.DOWNLOAD && p.end === S ? p.end += b : (p = {
        kind: e.DOWNLOAD,
        start: S,
        end: S + b
        // oldBlocks: null,
      }, l(p, h, w, T))) : p != null && p.kind === e.COPY && p.end === _ ? p.end += b : (p = {
        kind: e.COPY,
        start: _,
        end: _ + b
        // oldBlocks: [checksum]
      }, l(p, h, w, T));
    }
    return v > 0 && r.info(`File${o.name === "file" ? "" : " " + o.name} has ${v} changed blocks`), h;
  }
  const f = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function l(t, a, r, n) {
    if (f && a.length !== 0) {
      const i = a[a.length - 1];
      if (i.kind === t.kind && t.start < i.end && t.start > i.start) {
        const p = [i.start, i.end, t.start, t.end].reduce((o, h) => o < h ? o : h);
        throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${e[t.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${t.start} until ${t.end}
rel: ${i.start - p} until ${i.end - p} and ${t.start - p} until ${t.end - p}`);
      }
    }
    a.push(t);
  }
  function d(t, a, r) {
    const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    let p = a;
    for (let o = 0; o < t.checksums.length; o++) {
      const h = t.checksums[o], u = t.sizes[o], g = i.get(h);
      if (g === void 0)
        n.set(h, p), i.set(h, u);
      else if (r.debug != null) {
        const m = g === u ? "(same size)" : `(size: ${g}, this size: ${u})`;
        r.debug(`${h} duplicated in blockmap ${m}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      p += u;
    }
    return { checksumToOffset: n, checksumToOldSize: i };
  }
  function s(t) {
    const a = /* @__PURE__ */ new Map();
    for (const r of t)
      a.set(r.name, r);
    return a;
  }
  return fn;
}
var Ou;
function mf() {
  if (Ou) return dn;
  Ou = 1, Object.defineProperty(dn, "__esModule", { value: !0 }), dn.DataSplitter = void 0, dn.copyData = t;
  const e = Ge(), c = Ze, f = et, l = ko(), d = Buffer.from(`\r
\r
`);
  var s;
  (function(r) {
    r[r.INIT = 0] = "INIT", r[r.HEADER = 1] = "HEADER", r[r.BODY = 2] = "BODY";
  })(s || (s = {}));
  function t(r, n, i, p, o) {
    const h = (0, c.createReadStream)("", {
      fd: i,
      autoClose: !1,
      start: r.start,
      // end is inclusive
      end: r.end - 1
    });
    h.on("error", p), h.once("end", o), h.pipe(n, {
      end: !1
    });
  }
  let a = class extends f.Writable {
    constructor(n, i, p, o, h, u) {
      super(), this.out = n, this.options = i, this.partIndexToTaskIndex = p, this.partIndexToLength = h, this.finishHandler = u, this.partIndex = -1, this.headerListBuffer = null, this.readState = s.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = o.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(n, i, p) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${n.length} bytes`);
        return;
      }
      this.handleData(n).then(p).catch(p);
    }
    async handleData(n) {
      let i = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, e.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const p = Math.min(this.ignoreByteCount, n.length);
        this.ignoreByteCount -= p, i = p;
      } else if (this.remainingPartDataCount > 0) {
        const p = Math.min(this.remainingPartDataCount, n.length);
        this.remainingPartDataCount -= p, await this.processPartData(n, 0, p), i = p;
      }
      if (i !== n.length) {
        if (this.readState === s.HEADER) {
          const p = this.searchHeaderListEnd(n, i);
          if (p === -1)
            return;
          i = p, this.readState = s.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === s.BODY)
            this.readState = s.INIT;
          else {
            this.partIndex++;
            let u = this.partIndexToTaskIndex.get(this.partIndex);
            if (u == null)
              if (this.isFinished)
                u = this.options.end;
              else
                throw (0, e.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const g = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (g < u)
              await this.copyExistingData(g, u);
            else if (g > u)
              throw (0, e.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (i = this.searchHeaderListEnd(n, i), i === -1) {
              this.readState = s.HEADER;
              return;
            }
          }
          const p = this.partIndexToLength[this.partIndex], o = i + p, h = Math.min(o, n.length);
          if (await this.processPartStarted(n, i, h), this.remainingPartDataCount = p - (h - i), this.remainingPartDataCount > 0)
            return;
          if (i = o + this.boundaryLength, i >= n.length) {
            this.ignoreByteCount = this.boundaryLength - (n.length - o);
            return;
          }
        }
      }
    }
    copyExistingData(n, i) {
      return new Promise((p, o) => {
        const h = () => {
          if (n === i) {
            p();
            return;
          }
          const u = this.options.tasks[n];
          if (u.kind !== l.OperationKind.COPY) {
            o(new Error("Task kind must be COPY"));
            return;
          }
          t(u, this.out, this.options.oldFileFd, o, () => {
            n++, h();
          });
        };
        h();
      });
    }
    searchHeaderListEnd(n, i) {
      const p = n.indexOf(d, i);
      if (p !== -1)
        return p + d.length;
      const o = i === 0 ? n : n.slice(i);
      return this.headerListBuffer == null ? this.headerListBuffer = o : this.headerListBuffer = Buffer.concat([this.headerListBuffer, o]), -1;
    }
    onPartEnd() {
      const n = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== n)
        throw (0, e.newError)(`Expected length: ${n} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(n, i, p) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(n, i, p);
    }
    processPartData(n, i, p) {
      this.actualPartLength += p - i;
      const o = this.out;
      return o.write(i === 0 && n.length === p ? n : n.slice(i, p)) ? Promise.resolve() : new Promise((h, u) => {
        o.on("error", u), o.once("drain", () => {
          o.removeListener("error", u), h();
        });
      });
    }
  };
  return dn.DataSplitter = a, dn;
}
var Bn = {}, ku;
function Ag() {
  if (ku) return Bn;
  ku = 1, Object.defineProperty(Bn, "__esModule", { value: !0 }), Bn.executeTasksUsingMultipleRangeRequests = l, Bn.checkIsRangesSupported = s;
  const e = Ge(), c = mf(), f = ko();
  function l(t, a, r, n, i) {
    const p = (o) => {
      if (o >= a.length) {
        t.fileMetadataBuffer != null && r.write(t.fileMetadataBuffer), r.end();
        return;
      }
      const h = o + 1e3;
      d(t, {
        tasks: a,
        start: o,
        end: Math.min(a.length, h),
        oldFileFd: n
      }, r, () => p(h), i);
    };
    return p;
  }
  function d(t, a, r, n, i) {
    let p = "bytes=", o = 0;
    const h = /* @__PURE__ */ new Map(), u = [];
    for (let v = a.start; v < a.end; v++) {
      const y = a.tasks[v];
      y.kind === f.OperationKind.DOWNLOAD && (p += `${y.start}-${y.end - 1}, `, h.set(o, v), o++, u.push(y.end - y.start));
    }
    if (o <= 1) {
      const v = (y) => {
        if (y >= a.end) {
          n();
          return;
        }
        const R = a.tasks[y++];
        if (R.kind === f.OperationKind.COPY)
          (0, c.copyData)(R, r, a.oldFileFd, i, () => v(y));
        else {
          const S = t.createRequestOptions();
          S.headers.Range = `bytes=${R.start}-${R.end - 1}`;
          const T = t.httpExecutor.createRequest(S, (b) => {
            s(b, i) && (b.pipe(r, {
              end: !1
            }), b.once("end", () => v(y)));
          });
          t.httpExecutor.addErrorAndTimeoutHandlers(T, i), T.end();
        }
      };
      v(a.start);
      return;
    }
    const g = t.createRequestOptions();
    g.headers.Range = p.substring(0, p.length - 2);
    const m = t.httpExecutor.createRequest(g, (v) => {
      if (!s(v, i))
        return;
      const y = (0, e.safeGetHeader)(v, "content-type"), R = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(y);
      if (R == null) {
        i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${y}"`));
        return;
      }
      const S = new c.DataSplitter(r, a, h, R[1] || R[2], u, n);
      S.on("error", i), v.pipe(S), v.on("end", () => {
        setTimeout(() => {
          m.abort(), i(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    t.httpExecutor.addErrorAndTimeoutHandlers(m, i), m.end();
  }
  function s(t, a) {
    if (t.statusCode >= 400)
      return a((0, e.createHttpError)(t)), !1;
    if (t.statusCode !== 206) {
      const r = (0, e.safeGetHeader)(t, "accept-ranges");
      if (r == null || r === "none")
        return a(new Error(`Server doesn't support Accept-Ranges (response code ${t.statusCode})`)), !1;
    }
    return !0;
  }
  return Bn;
}
var jn = {}, Pu;
function Og() {
  if (Pu) return jn;
  Pu = 1, Object.defineProperty(jn, "__esModule", { value: !0 }), jn.ProgressDifferentialDownloadCallbackTransform = void 0;
  const e = et;
  var c;
  (function(l) {
    l[l.COPY = 0] = "COPY", l[l.DOWNLOAD = 1] = "DOWNLOAD";
  })(c || (c = {}));
  let f = class extends e.Transform {
    constructor(d, s, t) {
      super(), this.progressDifferentialDownloadInfo = d, this.cancellationToken = s, this.onProgress = t, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = c.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(d, s, t) {
      if (this.cancellationToken.cancelled) {
        t(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == c.COPY) {
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
      this.operationType = c.COPY;
    }
    beginRangeDownload() {
      this.operationType = c.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
  return jn.ProgressDifferentialDownloadCallbackTransform = f, jn;
}
var Iu;
function gf() {
  if (Iu) return qn;
  Iu = 1, Object.defineProperty(qn, "__esModule", { value: !0 }), qn.DifferentialDownloader = void 0;
  const e = Ge(), c = /* @__PURE__ */ Ft(), f = Ze, l = mf(), d = rn, s = ko(), t = Ag(), a = Og();
  let r = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(o, h, u) {
      this.blockAwareFileInfo = o, this.httpExecutor = h, this.options = u, this.fileMetadataBuffer = null, this.logger = u.logger;
    }
    createRequestOptions() {
      const o = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, e.configureRequestUrl)(this.options.newUrl, o), (0, e.configureRequestOptions)(o), o;
    }
    doDownload(o, h) {
      if (o.version !== h.version)
        throw new Error(`version is different (${o.version} - ${h.version}), full download is required`);
      const u = this.logger, g = (0, s.computeOperations)(o, h, u);
      u.debug != null && u.debug(JSON.stringify(g, null, 2));
      let m = 0, v = 0;
      for (const R of g) {
        const S = R.end - R.start;
        R.kind === s.OperationKind.DOWNLOAD ? m += S : v += S;
      }
      const y = this.blockAwareFileInfo.size;
      if (m + v + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== y)
        throw new Error(`Internal error, size mismatch: downloadSize: ${m}, copySize: ${v}, newSize: ${y}`);
      return u.info(`Full: ${n(y)}, To download: ${n(m)} (${Math.round(m / (y / 100))}%)`), this.downloadFile(g);
    }
    downloadFile(o) {
      const h = [], u = () => Promise.all(h.map((g) => (0, c.close)(g.descriptor).catch((m) => {
        this.logger.error(`cannot close file "${g.path}": ${m}`);
      })));
      return this.doDownloadFile(o, h).then(u).catch((g) => u().catch((m) => {
        try {
          this.logger.error(`cannot close files: ${m}`);
        } catch (v) {
          try {
            console.error(v);
          } catch {
          }
        }
        throw g;
      }).then(() => {
        throw g;
      }));
    }
    async doDownloadFile(o, h) {
      const u = await (0, c.open)(this.options.oldFile, "r");
      h.push({ descriptor: u, path: this.options.oldFile });
      const g = await (0, c.open)(this.options.newFile, "w");
      h.push({ descriptor: g, path: this.options.newFile });
      const m = (0, f.createWriteStream)(this.options.newFile, { fd: g });
      await new Promise((v, y) => {
        const R = [];
        let S;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const D = [];
          let $ = 0;
          for (const I of o)
            I.kind === s.OperationKind.DOWNLOAD && (D.push(I.end - I.start), $ += I.end - I.start);
          const C = {
            expectedByteCounts: D,
            grandTotal: $
          };
          S = new a.ProgressDifferentialDownloadCallbackTransform(C, this.options.cancellationToken, this.options.onProgress), R.push(S);
        }
        const T = new e.DigestTransform(this.blockAwareFileInfo.sha512);
        T.isValidateOnEnd = !1, R.push(T), m.on("finish", () => {
          m.close(() => {
            h.splice(1, 1);
            try {
              T.validate();
            } catch (D) {
              y(D);
              return;
            }
            v(void 0);
          });
        }), R.push(m);
        let b = null;
        for (const D of R)
          D.on("error", y), b == null ? b = D : b = b.pipe(D);
        const w = R[0];
        let _;
        if (this.options.isUseMultipleRangeRequest) {
          _ = (0, t.executeTasksUsingMultipleRangeRequests)(this, o, w, u, y), _(0);
          return;
        }
        let E = 0, N = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const k = this.createRequestOptions();
        k.redirect = "manual", _ = (D) => {
          var $, C;
          if (D >= o.length) {
            this.fileMetadataBuffer != null && w.write(this.fileMetadataBuffer), w.end();
            return;
          }
          const I = o[D++];
          if (I.kind === s.OperationKind.COPY) {
            S && S.beginFileCopy(), (0, l.copyData)(I, w, u, y, () => _(D));
            return;
          }
          const F = `bytes=${I.start}-${I.end - 1}`;
          k.headers.range = F, (C = ($ = this.logger) === null || $ === void 0 ? void 0 : $.debug) === null || C === void 0 || C.call($, `download range: ${F}`), S && S.beginRangeDownload();
          const U = this.httpExecutor.createRequest(k, (G) => {
            G.on("error", y), G.on("aborted", () => {
              y(new Error("response has been aborted by the server"));
            }), G.statusCode >= 400 && y((0, e.createHttpError)(G)), G.pipe(w, {
              end: !1
            }), G.once("end", () => {
              S && S.endRangeDownload(), ++E === 100 ? (E = 0, setTimeout(() => _(D), 1e3)) : _(D);
            });
          });
          U.on("redirect", (G, W, re) => {
            this.logger.info(`Redirect to ${i(re)}`), N = re, (0, e.configureRequestUrl)(new d.URL(N), k), U.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(U, y), U.end();
        }, _(0);
      });
    }
    async readRemoteBytes(o, h) {
      const u = Buffer.allocUnsafe(h + 1 - o), g = this.createRequestOptions();
      g.headers.range = `bytes=${o}-${h}`;
      let m = 0;
      if (await this.request(g, (v) => {
        v.copy(u, m), m += v.length;
      }), m !== u.length)
        throw new Error(`Received data length ${m} is not equal to expected ${u.length}`);
      return u;
    }
    request(o, h) {
      return new Promise((u, g) => {
        const m = this.httpExecutor.createRequest(o, (v) => {
          (0, t.checkIsRangesSupported)(v, g) && (v.on("error", g), v.on("aborted", () => {
            g(new Error("response has been aborted by the server"));
          }), v.on("data", h), v.on("end", () => u()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(m, g), m.end();
      });
    }
  };
  qn.DifferentialDownloader = r;
  function n(p, o = " KB") {
    return new Intl.NumberFormat("en").format((p / 1024).toFixed(2)) + o;
  }
  function i(p) {
    const o = p.indexOf("?");
    return o < 0 ? p : p.substring(0, o);
  }
  return qn;
}
var Nu;
function kg() {
  if (Nu) return $n;
  Nu = 1, Object.defineProperty($n, "__esModule", { value: !0 }), $n.GenericDifferentialDownloader = void 0;
  const e = gf();
  let c = class extends e.DifferentialDownloader {
    download(l, d) {
      return this.doDownload(l, d);
    }
  };
  return $n.GenericDifferentialDownloader = c, $n;
}
var _a = {}, Du;
function on() {
  return Du || (Du = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = l;
    const c = Ge();
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return c.CancellationToken;
    } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class f {
      constructor(s) {
        this.emitter = s;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(s) {
        l(this.emitter, "login", s);
      }
      progress(s) {
        l(this.emitter, e.DOWNLOAD_PROGRESS, s);
      }
      updateDownloaded(s) {
        l(this.emitter, e.UPDATE_DOWNLOADED, s);
      }
      updateCancelled(s) {
        l(this.emitter, "update-cancelled", s);
      }
    }
    e.UpdaterSignal = f;
    function l(d, s, t) {
      d.on(s, t);
    }
  })(_a)), _a;
}
var Lu;
function Po() {
  if (Lu) return Gt;
  Lu = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.NoOpLogger = Gt.AppUpdater = void 0;
  const e = Ge(), c = yt, f = mr, l = ht, d = /* @__PURE__ */ Ft(), s = Eo(), t = Vm(), a = Pe, r = df(), n = yg(), i = wg(), p = _g(), o = ff(), h = Cg(), u = yn, g = an(), m = kg(), v = on();
  let y = class vf extends l.EventEmitter {
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
    set channel(b) {
      if (this._channel != null) {
        if (typeof b != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${b}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (b.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = b, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(b) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: b
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, p.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(b) {
      this._logger = b ?? new S();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(b) {
      this.clientPromise = null, this._appUpdateConfigPath = b, this.configOnDisk = new t.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(b) {
      b && (this._isUpdateSupported = b);
    }
    constructor(b, w) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new v.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (N) => this.checkIfUpdateSupported(N), this.clientPromise = null, this.stagingUserIdPromise = new t.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new t.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (N) => {
        this._logger.error(`Error: ${N.stack || N.message}`);
      }), w == null ? (this.app = new i.ElectronAppAdapter(), this.httpExecutor = new p.ElectronHttpExecutor((N, k) => this.emit("login", N, k))) : (this.app = w, this.httpExecutor = null);
      const _ = this.app.version, E = (0, r.parse)(_);
      if (E == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${_}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = E, this.allowPrerelease = R(E), b != null && (this.setFeedURL(b), typeof b != "string" && b.requestHeaders && (this.requestHeaders = b.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(b) {
      const w = this.createProviderRuntimeOptions();
      let _;
      typeof b == "string" ? _ = new o.GenericProvider({ provider: "generic", url: b }, this, {
        ...w,
        isUseMultipleRangeRequest: (0, h.isUrlProbablySupportMultiRangeRequests)(b)
      }) : _ = (0, h.createClient)(b, this, w), this.clientPromise = Promise.resolve(_);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let b = this.checkForUpdatesPromise;
      if (b != null)
        return this._logger.info("Checking for update (already in progress)"), b;
      const w = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), b = this.doCheckForUpdates().then((_) => (w(), _)).catch((_) => {
        throw w(), this.emit("error", _, `Cannot check for updates: ${(_.stack || _).toString()}`), _;
      }), this.checkForUpdatesPromise = b, b;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(b) {
      return this.checkForUpdates().then((w) => w != null && w.downloadPromise ? (w.downloadPromise.then(() => {
        const _ = vf.formatDownloadNotification(w.updateInfo.version, this.app.name, b);
        new nn.Notification(_).show();
      }), w) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), w));
    }
    static formatDownloadNotification(b, w, _) {
      return _ == null && (_ = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), _ = {
        title: _.title.replace("{appName}", w).replace("{version}", b),
        body: _.body.replace("{appName}", w).replace("{version}", b)
      }, _;
    }
    async isStagingMatch(b) {
      const w = b.stagingPercentage;
      let _ = w;
      if (_ == null)
        return !0;
      if (_ = parseInt(_, 10), isNaN(_))
        return this._logger.warn(`Staging percentage is NaN: ${w}`), !0;
      _ = _ / 100;
      const E = await this.stagingUserIdPromise.value, k = e.UUID.parse(E).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${_}, percentage: ${k}, user id: ${E}`), k < _;
    }
    computeFinalHeaders(b) {
      return this.requestHeaders != null && Object.assign(b, this.requestHeaders), b;
    }
    async isUpdateAvailable(b) {
      const w = (0, r.parse)(b.version);
      if (w == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${b.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const _ = this.currentVersion;
      if ((0, r.eq)(w, _) || !await Promise.resolve(this.isUpdateSupported(b)) || !await this.isStagingMatch(b))
        return !1;
      const N = (0, r.gt)(w, _), k = (0, r.lt)(w, _);
      return N ? !0 : this.allowDowngrade && k;
    }
    checkIfUpdateSupported(b) {
      const w = b == null ? void 0 : b.minimumSystemVersion, _ = (0, f.release)();
      if (w)
        try {
          if ((0, r.lt)(_, w))
            return this._logger.info(`Current OS version ${_} is less than the minimum OS version required ${w} for version ${_}`), !1;
        } catch (E) {
          this._logger.warn(`Failed to compare current OS version(${_}) with minimum OS version(${w}): ${(E.message || E).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((_) => (0, h.createClient)(_, this, this.createProviderRuntimeOptions())));
      const b = await this.clientPromise, w = await this.stagingUserIdPromise.value;
      return b.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": w })), {
        info: await b.getLatestVersion(),
        provider: b
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
      const b = await this.getUpdateInfoAndProvider(), w = b.info;
      if (!await this.isUpdateAvailable(w))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${w.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", w), {
          isUpdateAvailable: !1,
          versionInfo: w,
          updateInfo: w
        };
      this.updateInfoAndProvider = b, this.onUpdateAvailable(w);
      const _ = new e.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: w,
        updateInfo: w,
        cancellationToken: _,
        downloadPromise: this.autoDownload ? this.downloadUpdate(_) : null
      };
    }
    onUpdateAvailable(b) {
      this._logger.info(`Found version ${b.version} (url: ${(0, e.asArray)(b.files).map((w) => w.url).join(", ")})`), this.emit("update-available", b);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(b = new e.CancellationToken()) {
      const w = this.updateInfoAndProvider;
      if (w == null) {
        const E = new Error("Please check update first");
        return this.dispatchError(E), Promise.reject(E);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(w.info.files).map((E) => E.url).join(", ")}`);
      const _ = (E) => {
        if (!(E instanceof e.CancellationError))
          try {
            this.dispatchError(E);
          } catch (N) {
            this._logger.warn(`Cannot dispatch error event: ${N.stack || N}`);
          }
        return E;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: w,
        requestHeaders: this.computeRequestHeaders(w.provider),
        cancellationToken: b,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((E) => {
        throw _(E);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(b) {
      this.emit("error", b, (b.stack || b).toString());
    }
    dispatchUpdateDownloaded(b) {
      this.emit(v.UPDATE_DOWNLOADED, b);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, s.load)(await (0, d.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(b) {
      const w = b.fileExtraDownloadHeaders;
      if (w != null) {
        const _ = this.requestHeaders;
        return _ == null ? w : {
          ...w,
          ..._
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const b = a.join(this.app.userDataPath, ".updaterId");
      try {
        const _ = await (0, d.readFile)(b, "utf-8");
        if (e.UUID.check(_))
          return _;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${_}`);
      } catch (_) {
        _.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${_}`);
      }
      const w = e.UUID.v5((0, c.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${w}`);
      try {
        await (0, d.outputFile)(b, w);
      } catch (_) {
        this._logger.warn(`Couldn't write out staging user ID: ${_}`);
      }
      return w;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const b = this.requestHeaders;
      if (b == null)
        return !0;
      for (const w of Object.keys(b)) {
        const _ = w.toLowerCase();
        if (_ === "authorization" || _ === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let b = this.downloadedUpdateHelper;
      if (b == null) {
        const w = (await this.configOnDisk.value).updaterCacheDirName, _ = this._logger;
        w == null && _.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const E = a.join(this.app.baseCachePath, w || this.app.name);
        _.debug != null && _.debug(`updater cache dir: ${E}`), b = new n.DownloadedUpdateHelper(E), this.downloadedUpdateHelper = b;
      }
      return b;
    }
    async executeDownload(b) {
      const w = b.fileInfo, _ = {
        headers: b.downloadUpdateOptions.requestHeaders,
        cancellationToken: b.downloadUpdateOptions.cancellationToken,
        sha2: w.info.sha2,
        sha512: w.info.sha512
      };
      this.listenerCount(v.DOWNLOAD_PROGRESS) > 0 && (_.onProgress = (ye) => this.emit(v.DOWNLOAD_PROGRESS, ye));
      const E = b.downloadUpdateOptions.updateInfoAndProvider.info, N = E.version, k = w.packageInfo;
      function D() {
        const ye = decodeURIComponent(b.fileInfo.url.pathname);
        return ye.endsWith(`.${b.fileExtension}`) ? a.basename(ye) : b.fileInfo.info.url;
      }
      const $ = await this.getOrCreateDownloadHelper(), C = $.cacheDirForPendingUpdate;
      await (0, d.mkdir)(C, { recursive: !0 });
      const I = D();
      let F = a.join(C, I);
      const U = k == null ? null : a.join(C, `package-${N}${a.extname(k.path) || ".7z"}`), G = async (ye) => (await $.setDownloadedFile(F, U, E, w, I, ye), await b.done({
        ...E,
        downloadedFile: F
      }), U == null ? [F] : [F, U]), W = this._logger, re = await $.validateDownloadedPath(F, E, w, W);
      if (re != null)
        return F = re, await G(!1);
      const ae = async () => (await $.clear().catch(() => {
      }), await (0, d.unlink)(F).catch(() => {
      })), oe = await (0, n.createTempUpdateFile)(`temp-${I}`, C, W);
      try {
        await b.task(oe, _, U, ae), await (0, e.retry)(() => (0, d.rename)(oe, F), 60, 500, 0, 0, (ye) => ye instanceof Error && /^EBUSY:/.test(ye.message));
      } catch (ye) {
        throw await ae(), ye instanceof e.CancellationError && (W.info("cancelled"), this.emit("update-cancelled", E)), ye;
      }
      return W.info(`New version ${N} has been downloaded to ${F}`), await G(!0);
    }
    async differentialDownloadInstaller(b, w, _, E, N) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const k = (0, g.blockmapFiles)(b.url, this.app.version, w.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${k[0]}", new: ${k[1]})`);
        const D = async (I) => {
          const F = await this.httpExecutor.downloadToBuffer(I, {
            headers: w.requestHeaders,
            cancellationToken: w.cancellationToken
          });
          if (F == null || F.length === 0)
            throw new Error(`Blockmap "${I.href}" is empty`);
          try {
            return JSON.parse((0, u.gunzipSync)(F).toString());
          } catch (U) {
            throw new Error(`Cannot parse blockmap "${I.href}", error: ${U}`);
          }
        }, $ = {
          newUrl: b.url,
          oldFile: a.join(this.downloadedUpdateHelper.cacheDir, N),
          logger: this._logger,
          newFile: _,
          isUseMultipleRangeRequest: E.isUseMultipleRangeRequest,
          requestHeaders: w.requestHeaders,
          cancellationToken: w.cancellationToken
        };
        this.listenerCount(v.DOWNLOAD_PROGRESS) > 0 && ($.onProgress = (I) => this.emit(v.DOWNLOAD_PROGRESS, I));
        const C = await Promise.all(k.map((I) => D(I)));
        return await new m.GenericDifferentialDownloader(b.info, this.httpExecutor, $).download(C[0], C[1]), !1;
      } catch (k) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${k.stack || k}`), this._testOnlyOptions != null)
          throw k;
        return !0;
      }
    }
  };
  Gt.AppUpdater = y;
  function R(T) {
    const b = (0, r.prerelease)(T);
    return b != null && b.length > 0;
  }
  class S {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(b) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(b) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(b) {
    }
  }
  return Gt.NoOpLogger = S, Gt;
}
var Fu;
function En() {
  if (Fu) return Cn;
  Fu = 1, Object.defineProperty(Cn, "__esModule", { value: !0 }), Cn.BaseUpdater = void 0;
  const e = hr, c = Po();
  let f = class extends c.AppUpdater {
    constructor(d, s) {
      super(d, s), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(d = !1, s = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(d, d ? s : this.autoRunAppAfterInstall) ? setImmediate(() => {
        nn.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(d) {
      return super.executeDownload({
        ...d,
        done: (s) => (this.dispatchUpdateDownloaded(s), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(d = !1, s = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const t = this.downloadedUpdateHelper, a = this.installerPath, r = t == null ? null : t.downloadedFileInfo;
      if (a == null || r == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${d}, isForceRunAfter: ${s}`), this.doInstall({
          isSilent: d,
          isForceRunAfter: s,
          isAdminRightsRequired: r.isAdminRightsRequired
        });
      } catch (n) {
        return this.dispatchError(n), !1;
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
      const { name: d } = this.app, s = `"${d} would like to update"`, t = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), a = [t];
      return /kdesudo/i.test(t) ? (a.push("--comment", s), a.push("-c")) : /gksudo/i.test(t) ? a.push("--message", s) : /pkexec/i.test(t) && a.push("--disable-internal-agent"), a.join(" ");
    }
    spawnSyncLog(d, s = [], t = {}) {
      this._logger.info(`Executing: ${d} with args: ${s}`);
      const a = (0, e.spawnSync)(d, s, {
        env: { ...process.env, ...t },
        encoding: "utf-8",
        shell: !0
      }), { error: r, status: n, stdout: i, stderr: p } = a;
      if (r != null)
        throw this._logger.error(p), r;
      if (n != null && n !== 0)
        throw this._logger.error(p), new Error(`Command ${d} exited with code ${n}`);
      return i.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(d, s = [], t = void 0, a = "ignore") {
      return this._logger.info(`Executing: ${d} with args: ${s}`), new Promise((r, n) => {
        try {
          const i = { stdio: a, env: t, detached: !0 }, p = (0, e.spawn)(d, s, i);
          p.on("error", (o) => {
            n(o);
          }), p.unref(), p.pid !== void 0 && r(!0);
        } catch (i) {
          n(i);
        }
      });
    }
  };
  return Cn.BaseUpdater = f, Cn;
}
var Mn = {}, Hn = {}, Uu;
function xf() {
  if (Uu) return Hn;
  Uu = 1, Object.defineProperty(Hn, "__esModule", { value: !0 }), Hn.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const e = /* @__PURE__ */ Ft(), c = gf(), f = yn;
  let l = class extends c.DifferentialDownloader {
    async download() {
      const a = this.blockAwareFileInfo, r = a.size, n = r - (a.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
      const i = d(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await s(this.options.oldFile), i);
    }
  };
  Hn.FileWithEmbeddedBlockMapDifferentialDownloader = l;
  function d(t) {
    return JSON.parse((0, f.inflateRawSync)(t).toString());
  }
  async function s(t) {
    const a = await (0, e.open)(t, "r");
    try {
      const r = (await (0, e.fstat)(a)).size, n = Buffer.allocUnsafe(4);
      await (0, e.read)(a, n, 0, n.length, r - n.length);
      const i = Buffer.allocUnsafe(n.readUInt32BE(0));
      return await (0, e.read)(a, i, 0, i.length, r - n.length - i.length), await (0, e.close)(a), d(i);
    } catch (r) {
      throw await (0, e.close)(a), r;
    }
  }
  return Hn;
}
var $u;
function qu() {
  if ($u) return Mn;
  $u = 1, Object.defineProperty(Mn, "__esModule", { value: !0 }), Mn.AppImageUpdater = void 0;
  const e = Ge(), c = hr, f = /* @__PURE__ */ Ft(), l = Ze, d = Pe, s = En(), t = xf(), a = lt(), r = on();
  let n = class extends s.BaseUpdater {
    constructor(p, o) {
      super(p, o);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(p) {
      const o = p.updateInfoAndProvider.provider, h = (0, a.findFile)(o.resolveFiles(p.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: h,
        downloadUpdateOptions: p,
        task: async (u, g) => {
          const m = process.env.APPIMAGE;
          if (m == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (p.disableDifferentialDownload || await this.downloadDifferential(h, m, u, o, p)) && await this.httpExecutor.download(h.url, u, g), await (0, f.chmod)(u, 493);
        }
      });
    }
    async downloadDifferential(p, o, h, u, g) {
      try {
        const m = {
          newUrl: p.url,
          oldFile: o,
          logger: this._logger,
          newFile: h,
          isUseMultipleRangeRequest: u.isUseMultipleRangeRequest,
          requestHeaders: g.requestHeaders,
          cancellationToken: g.cancellationToken
        };
        return this.listenerCount(r.DOWNLOAD_PROGRESS) > 0 && (m.onProgress = (v) => this.emit(r.DOWNLOAD_PROGRESS, v)), await new t.FileWithEmbeddedBlockMapDifferentialDownloader(p.info, this.httpExecutor, m).download(), !1;
      } catch (m) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${m.stack || m}`), process.platform === "linux";
      }
    }
    doInstall(p) {
      const o = process.env.APPIMAGE;
      if (o == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, l.unlinkSync)(o);
      let h;
      const u = d.basename(o), g = this.installerPath;
      if (g == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      d.basename(g) === u || !/\d+\.\d+\.\d+/.test(u) ? h = o : h = d.join(d.dirname(o), d.basename(g)), (0, c.execFileSync)("mv", ["-f", g, h]), h !== o && this.emit("appimage-filename-updated", h);
      const m = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return p.isForceRunAfter ? this.spawnLog(h, [], m) : (m.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, c.execFileSync)(h, [], { env: m })), !0;
    }
  };
  return Mn.AppImageUpdater = n, Mn;
}
var Gn = {}, Bu;
function ju() {
  if (Bu) return Gn;
  Bu = 1, Object.defineProperty(Gn, "__esModule", { value: !0 }), Gn.DebUpdater = void 0;
  const e = En(), c = lt(), f = on();
  let l = class extends e.BaseUpdater {
    constructor(s, t) {
      super(s, t);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const t = s.updateInfoAndProvider.provider, a = (0, c.findFile)(t.resolveFiles(s.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: a,
        downloadUpdateOptions: s,
        task: async (r, n) => {
          this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (i) => this.emit(f.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(a.url, r, n);
        }
      });
    }
    get installerPath() {
      var s, t;
      return (t = (s = super.installerPath) === null || s === void 0 ? void 0 : s.replace(/ /g, "\\ ")) !== null && t !== void 0 ? t : null;
    }
    doInstall(s) {
      const t = this.wrapSudo(), a = /pkexec/i.test(t) ? "" : '"', r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const n = ["dpkg", "-i", r, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(t, [`${a}/bin/bash`, "-c", `'${n.join(" ")}'${a}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return Gn.DebUpdater = l, Gn;
}
var zn = {}, Mu;
function Hu() {
  if (Mu) return zn;
  Mu = 1, Object.defineProperty(zn, "__esModule", { value: !0 }), zn.PacmanUpdater = void 0;
  const e = En(), c = on(), f = lt();
  let l = class extends e.BaseUpdater {
    constructor(s, t) {
      super(s, t);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const t = s.updateInfoAndProvider.provider, a = (0, f.findFile)(t.resolveFiles(s.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: a,
        downloadUpdateOptions: s,
        task: async (r, n) => {
          this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (i) => this.emit(c.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(a.url, r, n);
        }
      });
    }
    get installerPath() {
      var s, t;
      return (t = (s = super.installerPath) === null || s === void 0 ? void 0 : s.replace(/ /g, "\\ ")) !== null && t !== void 0 ? t : null;
    }
    doInstall(s) {
      const t = this.wrapSudo(), a = /pkexec/i.test(t) ? "" : '"', r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const n = ["pacman", "-U", "--noconfirm", r];
      return this.spawnSyncLog(t, [`${a}/bin/bash`, "-c", `'${n.join(" ")}'${a}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return zn.PacmanUpdater = l, zn;
}
var Wn = {}, Gu;
function zu() {
  if (Gu) return Wn;
  Gu = 1, Object.defineProperty(Wn, "__esModule", { value: !0 }), Wn.RpmUpdater = void 0;
  const e = En(), c = on(), f = lt();
  let l = class extends e.BaseUpdater {
    constructor(s, t) {
      super(s, t);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const t = s.updateInfoAndProvider.provider, a = (0, f.findFile)(t.resolveFiles(s.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: a,
        downloadUpdateOptions: s,
        task: async (r, n) => {
          this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (i) => this.emit(c.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(a.url, r, n);
        }
      });
    }
    get installerPath() {
      var s, t;
      return (t = (s = super.installerPath) === null || s === void 0 ? void 0 : s.replace(/ /g, "\\ ")) !== null && t !== void 0 ? t : null;
    }
    doInstall(s) {
      const t = this.wrapSudo(), a = /pkexec/i.test(t) ? "" : '"', r = this.spawnSyncLog("which zypper"), n = this.installerPath;
      if (n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      let i;
      return r ? i = [r, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", n] : i = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", n], this.spawnSyncLog(t, [`${a}/bin/bash`, "-c", `'${i.join(" ")}'${a}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return Wn.RpmUpdater = l, Wn;
}
var Vn = {}, Wu;
function Vu() {
  if (Wu) return Vn;
  Wu = 1, Object.defineProperty(Vn, "__esModule", { value: !0 }), Vn.MacUpdater = void 0;
  const e = Ge(), c = /* @__PURE__ */ Ft(), f = Ze, l = Pe, d = gr, s = Po(), t = lt(), a = hr, r = yt;
  let n = class extends s.AppUpdater {
    constructor(p, o) {
      super(p, o), this.nativeUpdater = nn.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (h) => {
        this._logger.warn(h), this.emit("error", h);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(p) {
      this._logger.debug != null && this._logger.debug(p);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((p) => {
        p && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(p) {
      let o = p.updateInfoAndProvider.provider.resolveFiles(p.updateInfoAndProvider.info);
      const h = this._logger, u = "sysctl.proc_translated";
      let g = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), g = (0, a.execFileSync)("sysctl", [u], { encoding: "utf8" }).includes(`${u}: 1`), h.info(`Checked for macOS Rosetta environment (isRosetta=${g})`);
      } catch (T) {
        h.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${T}`);
      }
      let m = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const b = (0, a.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        h.info(`Checked 'uname -a': arm64=${b}`), m = m || b;
      } catch (T) {
        h.warn(`uname shell command to check for arm64 failed: ${T}`);
      }
      m = m || process.arch === "arm64" || g;
      const v = (T) => {
        var b;
        return T.url.pathname.includes("arm64") || ((b = T.info.url) === null || b === void 0 ? void 0 : b.includes("arm64"));
      };
      m && o.some(v) ? o = o.filter((T) => m === v(T)) : o = o.filter((T) => !v(T));
      const y = (0, t.findFile)(o, "zip", ["pkg", "dmg"]);
      if (y == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(o)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const R = p.updateInfoAndProvider.provider, S = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: y,
        downloadUpdateOptions: p,
        task: async (T, b) => {
          const w = l.join(this.downloadedUpdateHelper.cacheDir, S), _ = () => (0, c.pathExistsSync)(w) ? !p.disableDifferentialDownload : (h.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let E = !0;
          _() && (E = await this.differentialDownloadInstaller(y, p, T, R, S)), E && await this.httpExecutor.download(y.url, T, b);
        },
        done: async (T) => {
          if (!p.disableDifferentialDownload)
            try {
              const b = l.join(this.downloadedUpdateHelper.cacheDir, S);
              await (0, c.copyFile)(T.downloadedFile, b);
            } catch (b) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${b.message}`);
            }
          return this.updateDownloaded(y, T);
        }
      });
    }
    async updateDownloaded(p, o) {
      var h;
      const u = o.downloadedFile, g = (h = p.info.size) !== null && h !== void 0 ? h : (await (0, c.stat)(u)).size, m = this._logger, v = `fileToProxy=${p.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${v})`), this.server = (0, d.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${v})`), this.server.on("close", () => {
        m.info(`Proxy server for native Squirrel.Mac is closed (${v})`);
      });
      const y = (R) => {
        const S = R.address();
        return typeof S == "string" ? S : `http://127.0.0.1:${S == null ? void 0 : S.port}`;
      };
      return await new Promise((R, S) => {
        const T = (0, r.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), b = Buffer.from(`autoupdater:${T}`, "ascii"), w = `/${(0, r.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (_, E) => {
          const N = _.url;
          if (m.info(`${N} requested`), N === "/") {
            if (!_.headers.authorization || _.headers.authorization.indexOf("Basic ") === -1) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), m.warn("No authenthication info");
              return;
            }
            const $ = _.headers.authorization.split(" ")[1], C = Buffer.from($, "base64").toString("ascii"), [I, F] = C.split(":");
            if (I !== "autoupdater" || F !== T) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), m.warn("Invalid authenthication credentials");
              return;
            }
            const U = Buffer.from(`{ "url": "${y(this.server)}${w}" }`);
            E.writeHead(200, { "Content-Type": "application/json", "Content-Length": U.length }), E.end(U);
            return;
          }
          if (!N.startsWith(w)) {
            m.warn(`${N} requested, but not supported`), E.writeHead(404), E.end();
            return;
          }
          m.info(`${w} requested by Squirrel.Mac, pipe ${u}`);
          let k = !1;
          E.on("finish", () => {
            k || (this.nativeUpdater.removeListener("error", S), R([]));
          });
          const D = (0, f.createReadStream)(u);
          D.on("error", ($) => {
            try {
              E.end();
            } catch (C) {
              m.warn(`cannot end response: ${C}`);
            }
            k = !0, this.nativeUpdater.removeListener("error", S), S(new Error(`Cannot pipe "${u}": ${$}`));
          }), E.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": g
          }), D.pipe(E);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${v})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${y(this.server)}, ${v})`), this.nativeUpdater.setFeedURL({
            url: y(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${b.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(o), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", S), this.nativeUpdater.checkForUpdates()) : R([]);
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
  return Vn.MacUpdater = n, Vn;
}
var Yn = {}, Br = {}, Yu;
function Pg() {
  if (Yu) return Br;
  Yu = 1, Object.defineProperty(Br, "__esModule", { value: !0 }), Br.verifySignature = d;
  const e = Ge(), c = hr, f = mr, l = Pe;
  function d(r, n, i) {
    return new Promise((p, o) => {
      const h = n.replace(/'/g, "''");
      i.info(`Verifying signature ${h}`), (0, c.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${h}' | ConvertTo-Json -Compress"`], {
        shell: !0,
        timeout: 20 * 1e3
      }, (u, g, m) => {
        var v;
        try {
          if (u != null || m) {
            t(i, u, m, o), p(null);
            return;
          }
          const y = s(g);
          if (y.Status === 0) {
            try {
              const b = l.normalize(y.Path), w = l.normalize(n);
              if (i.info(`LiteralPath: ${b}. Update Path: ${w}`), b !== w) {
                t(i, new Error(`LiteralPath of ${b} is different than ${w}`), m, o), p(null);
                return;
              }
            } catch (b) {
              i.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(v = b.message) !== null && v !== void 0 ? v : b.stack}`);
            }
            const S = (0, e.parseDn)(y.SignerCertificate.Subject);
            let T = !1;
            for (const b of r) {
              const w = (0, e.parseDn)(b);
              if (w.size ? T = Array.from(w.keys()).every((E) => w.get(E) === S.get(E)) : b === S.get("CN") && (i.warn(`Signature validated using only CN ${b}. Please add your full Distinguished Name (DN) to publisherNames configuration`), T = !0), T) {
                p(null);
                return;
              }
            }
          }
          const R = `publisherNames: ${r.join(" | ")}, raw info: ` + JSON.stringify(y, (S, T) => S === "RawData" ? void 0 : T, 2);
          i.warn(`Sign verification failed, installer signed with incorrect certificate: ${R}`), p(R);
        } catch (y) {
          t(i, y, null, o), p(null);
          return;
        }
      });
    });
  }
  function s(r) {
    const n = JSON.parse(r);
    delete n.PrivateKey, delete n.IsOSBinary, delete n.SignatureType;
    const i = n.SignerCertificate;
    return i != null && (delete i.Archived, delete i.Extensions, delete i.Handle, delete i.HasPrivateKey, delete i.SubjectName), n;
  }
  function t(r, n, i, p) {
    if (a()) {
      r.warn(`Cannot execute Get-AuthenticodeSignature: ${n || i}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, c.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
    } catch (o) {
      r.warn(`Cannot execute ConvertTo-Json: ${o.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    n != null && p(n), i && p(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${i}. Failing signature validation due to unknown stderr.`));
  }
  function a() {
    const r = f.release();
    return r.startsWith("6.") && !r.startsWith("6.3");
  }
  return Br;
}
var Ku;
function Xu() {
  if (Ku) return Yn;
  Ku = 1, Object.defineProperty(Yn, "__esModule", { value: !0 }), Yn.NsisUpdater = void 0;
  const e = Ge(), c = Pe, f = En(), l = xf(), d = on(), s = lt(), t = /* @__PURE__ */ Ft(), a = Pg(), r = rn;
  let n = class extends f.BaseUpdater {
    constructor(p, o) {
      super(p, o), this._verifyUpdateCodeSignature = (h, u) => (0, a.verifySignature)(h, u, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(p) {
      p && (this._verifyUpdateCodeSignature = p);
    }
    /*** @private */
    doDownloadUpdate(p) {
      const o = p.updateInfoAndProvider.provider, h = (0, s.findFile)(o.resolveFiles(p.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: p,
        fileInfo: h,
        task: async (u, g, m, v) => {
          const y = h.packageInfo, R = y != null && m != null;
          if (R && p.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${p.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !R && !p.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (R || p.disableDifferentialDownload || await this.differentialDownloadInstaller(h, p, u, o, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(h.url, u, g);
          const S = await this.verifySignature(u);
          if (S != null)
            throw await v(), (0, e.newError)(`New version ${p.updateInfoAndProvider.info.version} is not signed by the application owner: ${S}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (R && await this.differentialDownloadWebPackage(p, y, m, o))
            try {
              await this.httpExecutor.download(new r.URL(y.path), m, {
                headers: p.requestHeaders,
                cancellationToken: p.cancellationToken,
                sha512: y.sha512
              });
            } catch (T) {
              try {
                await (0, t.unlink)(m);
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
    async verifySignature(p) {
      let o;
      try {
        if (o = (await this.configOnDisk.value).publisherName, o == null)
          return null;
      } catch (h) {
        if (h.code === "ENOENT")
          return null;
        throw h;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(o) ? o : [o], p);
    }
    doInstall(p) {
      const o = this.installerPath;
      if (o == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const h = ["--updated"];
      p.isSilent && h.push("/S"), p.isForceRunAfter && h.push("--force-run"), this.installDirectory && h.push(`/D=${this.installDirectory}`);
      const u = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      u != null && h.push(`--package-file=${u}`);
      const g = () => {
        this.spawnLog(c.join(process.resourcesPath, "elevate.exe"), [o].concat(h)).catch((m) => this.dispatchError(m));
      };
      return p.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), g(), !0) : (this.spawnLog(o, h).catch((m) => {
        const v = m.code;
        this._logger.info(`Cannot run installer: error code: ${v}, error message: "${m.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), v === "UNKNOWN" || v === "EACCES" ? g() : v === "ENOENT" ? nn.shell.openPath(o).catch((y) => this.dispatchError(y)) : this.dispatchError(m);
      }), !0);
    }
    async differentialDownloadWebPackage(p, o, h, u) {
      if (o.blockMapSize == null)
        return !0;
      try {
        const g = {
          newUrl: new r.URL(o.path),
          oldFile: c.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: h,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: u.isUseMultipleRangeRequest,
          cancellationToken: p.cancellationToken
        };
        this.listenerCount(d.DOWNLOAD_PROGRESS) > 0 && (g.onProgress = (m) => this.emit(d.DOWNLOAD_PROGRESS, m)), await new l.FileWithEmbeddedBlockMapDifferentialDownloader(o, this.httpExecutor, g).download();
      } catch (g) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${g.stack || g}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return Yn.NsisUpdater = n, Yn;
}
var Ju;
function Ig() {
  return Ju || (Ju = 1, (function(e) {
    var c = Ht && Ht.__createBinding || (Object.create ? (function(m, v, y, R) {
      R === void 0 && (R = y);
      var S = Object.getOwnPropertyDescriptor(v, y);
      (!S || ("get" in S ? !v.__esModule : S.writable || S.configurable)) && (S = { enumerable: !0, get: function() {
        return v[y];
      } }), Object.defineProperty(m, R, S);
    }) : (function(m, v, y, R) {
      R === void 0 && (R = y), m[R] = v[y];
    })), f = Ht && Ht.__exportStar || function(m, v) {
      for (var y in m) y !== "default" && !Object.prototype.hasOwnProperty.call(v, y) && c(v, m, y);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const l = /* @__PURE__ */ Ft(), d = Pe;
    var s = En();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return s.BaseUpdater;
    } });
    var t = Po();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return t.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return t.NoOpLogger;
    } });
    var a = lt();
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var r = qu();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return r.AppImageUpdater;
    } });
    var n = ju();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return n.DebUpdater;
    } });
    var i = Hu();
    Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
      return i.PacmanUpdater;
    } });
    var p = zu();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return p.RpmUpdater;
    } });
    var o = Vu();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return o.MacUpdater;
    } });
    var h = Xu();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return h.NsisUpdater;
    } }), f(on(), e);
    let u;
    function g() {
      if (process.platform === "win32")
        u = new (Xu()).NsisUpdater();
      else if (process.platform === "darwin")
        u = new (Vu()).MacUpdater();
      else {
        u = new (qu()).AppImageUpdater();
        try {
          const m = d.join(process.resourcesPath, "package-type");
          if (!(0, l.existsSync)(m))
            return u;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const v = (0, l.readFileSync)(m).toString().trim();
          switch (console.info("Found package-type:", v), v) {
            case "deb":
              u = new (ju()).DebUpdater();
              break;
            case "rpm":
              u = new (zu()).RpmUpdater();
              break;
            case "pacman":
              u = new (Hu()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (m) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", m.message);
        }
      }
      return u;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => u || g()
    });
  })(Ht)), Ht;
}
var rt = Ig();
rt.autoUpdater.autoDownload = !1;
rt.autoUpdater.autoInstallOnAppQuit = !0;
function Ng(e) {
  const c = (f, l) => {
    e.webContents.send("update-status", { status: f, ...l });
  };
  rt.autoUpdater.on("checking-for-update", () => {
    console.log("[Updater] Checking for updates..."), c("checking");
  }), rt.autoUpdater.on("update-available", (f) => {
    console.log("[Updater] Update available:", f.version), c("available", {
      version: f.version,
      releaseDate: f.releaseDate,
      releaseNotes: f.releaseNotes
    });
  }), rt.autoUpdater.on("update-not-available", () => {
    console.log("[Updater] No updates available"), c("not-available");
  }), rt.autoUpdater.on("download-progress", (f) => {
    console.log(`[Updater] Download progress: ${Math.round(f.percent)}%`), c("downloading", {
      percent: Math.round(f.percent),
      transferred: f.transferred,
      total: f.total
    });
  }), rt.autoUpdater.on("update-downloaded", (f) => {
    console.log("[Updater] Update downloaded:", f.version), c("downloaded", { version: f.version });
  }), rt.autoUpdater.on("error", (f) => {
    console.error("[Updater] Error:", f.message), c("error", { message: f.message });
  }), Ye.handle("check-for-updates", async () => {
    try {
      return await rt.autoUpdater.checkForUpdates();
    } catch (f) {
      return console.error("[Updater] Check error:", f.message), null;
    }
  }), Ye.handle("download-update", async () => {
    try {
      return await rt.autoUpdater.downloadUpdate(), !0;
    } catch (f) {
      return console.error("[Updater] Download error:", f.message), !1;
    }
  }), Ye.handle("install-update", () => {
    rt.autoUpdater.quitAndInstall(!1, !0);
  }), Ye.handle("get-app-version", () => rt.autoUpdater.currentVersion.version), setTimeout(() => {
    console.log("[Updater] Initial update check..."), rt.autoUpdater.checkForUpdates().catch((f) => {
      console.error("[Updater] Initial check failed:", f.message);
    });
  }, 5e3);
}
var fr = { exports: {} }, jr = { exports: {} }, Mr = { exports: {} }, Qu;
function Dg() {
  if (Qu) return Mr.exports;
  Qu = 1, Mr.exports = s, Mr.exports.preferredCharsets = s;
  var e = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
  function c(n) {
    for (var i = n.split(","), p = 0, o = 0; p < i.length; p++) {
      var h = f(i[p].trim(), p);
      h && (i[o++] = h);
    }
    return i.length = o, i;
  }
  function f(n, i) {
    var p = e.exec(n);
    if (!p) return null;
    var o = p[1], h = 1;
    if (p[2])
      for (var u = p[2].split(";"), g = 0; g < u.length; g++) {
        var m = u[g].trim().split("=");
        if (m[0] === "q") {
          h = parseFloat(m[1]);
          break;
        }
      }
    return {
      charset: o,
      q: h,
      i
    };
  }
  function l(n, i, p) {
    for (var o = { o: -1, q: 0, s: 0 }, h = 0; h < i.length; h++) {
      var u = d(n, i[h], p);
      u && (o.s - u.s || o.q - u.q || o.o - u.o) < 0 && (o = u);
    }
    return o;
  }
  function d(n, i, p) {
    var o = 0;
    if (i.charset.toLowerCase() === n.toLowerCase())
      o |= 1;
    else if (i.charset !== "*")
      return null;
    return {
      i: p,
      o: i.i,
      q: i.q,
      s: o
    };
  }
  function s(n, i) {
    var p = c(n === void 0 ? "*" : n || "");
    if (!i)
      return p.filter(r).sort(t).map(a);
    var o = i.map(function(u, g) {
      return l(u, p, g);
    });
    return o.filter(r).sort(t).map(function(u) {
      return i[o.indexOf(u)];
    });
  }
  function t(n, i) {
    return i.q - n.q || i.s - n.s || n.o - i.o || n.i - i.i || 0;
  }
  function a(n) {
    return n.charset;
  }
  function r(n) {
    return n.q > 0;
  }
  return Mr.exports;
}
var Hr = { exports: {} }, Zu;
function Lg() {
  if (Zu) return Hr.exports;
  Zu = 1, Hr.exports = s, Hr.exports.preferredEncodings = s;
  var e = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
  function c(n) {
    for (var i = n.split(","), p = !1, o = 1, h = 0, u = 0; h < i.length; h++) {
      var g = f(i[h].trim(), h);
      g && (i[u++] = g, p = p || d("identity", g), o = Math.min(o, g.q || 1));
    }
    return p || (i[u++] = {
      encoding: "identity",
      q: o,
      i: h
    }), i.length = u, i;
  }
  function f(n, i) {
    var p = e.exec(n);
    if (!p) return null;
    var o = p[1], h = 1;
    if (p[2])
      for (var u = p[2].split(";"), g = 0; g < u.length; g++) {
        var m = u[g].trim().split("=");
        if (m[0] === "q") {
          h = parseFloat(m[1]);
          break;
        }
      }
    return {
      encoding: o,
      q: h,
      i
    };
  }
  function l(n, i, p) {
    for (var o = { o: -1, q: 0, s: 0 }, h = 0; h < i.length; h++) {
      var u = d(n, i[h], p);
      u && (o.s - u.s || o.q - u.q || o.o - u.o) < 0 && (o = u);
    }
    return o;
  }
  function d(n, i, p) {
    var o = 0;
    if (i.encoding.toLowerCase() === n.toLowerCase())
      o |= 1;
    else if (i.encoding !== "*")
      return null;
    return {
      i: p,
      o: i.i,
      q: i.q,
      s: o
    };
  }
  function s(n, i) {
    var p = c(n || "");
    if (!i)
      return p.filter(r).sort(t).map(a);
    var o = i.map(function(u, g) {
      return l(u, p, g);
    });
    return o.filter(r).sort(t).map(function(u) {
      return i[o.indexOf(u)];
    });
  }
  function t(n, i) {
    return i.q - n.q || i.s - n.s || n.o - i.o || n.i - i.i || 0;
  }
  function a(n) {
    return n.encoding;
  }
  function r(n) {
    return n.q > 0;
  }
  return Hr.exports;
}
var Gr = { exports: {} }, ep;
function Fg() {
  if (ep) return Gr.exports;
  ep = 1, Gr.exports = s, Gr.exports.preferredLanguages = s;
  var e = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
  function c(n) {
    for (var i = n.split(","), p = 0, o = 0; p < i.length; p++) {
      var h = f(i[p].trim(), p);
      h && (i[o++] = h);
    }
    return i.length = o, i;
  }
  function f(n, i) {
    var p = e.exec(n);
    if (!p) return null;
    var o = p[1], h = p[2], u = o;
    h && (u += "-" + h);
    var g = 1;
    if (p[3])
      for (var m = p[3].split(";"), v = 0; v < m.length; v++) {
        var y = m[v].split("=");
        y[0] === "q" && (g = parseFloat(y[1]));
      }
    return {
      prefix: o,
      suffix: h,
      q: g,
      i,
      full: u
    };
  }
  function l(n, i, p) {
    for (var o = { o: -1, q: 0, s: 0 }, h = 0; h < i.length; h++) {
      var u = d(n, i[h], p);
      u && (o.s - u.s || o.q - u.q || o.o - u.o) < 0 && (o = u);
    }
    return o;
  }
  function d(n, i, p) {
    var o = f(n);
    if (!o) return null;
    var h = 0;
    if (i.full.toLowerCase() === o.full.toLowerCase())
      h |= 4;
    else if (i.prefix.toLowerCase() === o.full.toLowerCase())
      h |= 2;
    else if (i.full.toLowerCase() === o.prefix.toLowerCase())
      h |= 1;
    else if (i.full !== "*")
      return null;
    return {
      i: p,
      o: i.i,
      q: i.q,
      s: h
    };
  }
  function s(n, i) {
    var p = c(n === void 0 ? "*" : n || "");
    if (!i)
      return p.filter(r).sort(t).map(a);
    var o = i.map(function(u, g) {
      return l(u, p, g);
    });
    return o.filter(r).sort(t).map(function(u) {
      return i[o.indexOf(u)];
    });
  }
  function t(n, i) {
    return i.q - n.q || i.s - n.s || n.o - i.o || n.i - i.i || 0;
  }
  function a(n) {
    return n.full;
  }
  function r(n) {
    return n.q > 0;
  }
  return Gr.exports;
}
var zr = { exports: {} }, tp;
function Ug() {
  if (tp) return zr.exports;
  tp = 1, zr.exports = s, zr.exports.preferredMediaTypes = s;
  var e = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
  function c(h) {
    for (var u = p(h), g = 0, m = 0; g < u.length; g++) {
      var v = f(u[g].trim(), g);
      v && (u[m++] = v);
    }
    return u.length = m, u;
  }
  function f(h, u) {
    var g = e.exec(h);
    if (!g) return null;
    var m = /* @__PURE__ */ Object.create(null), v = 1, y = g[2], R = g[1];
    if (g[3])
      for (var S = o(g[3]).map(i), T = 0; T < S.length; T++) {
        var b = S[T], w = b[0].toLowerCase(), _ = b[1], E = _ && _[0] === '"' && _[_.length - 1] === '"' ? _.substr(1, _.length - 2) : _;
        if (w === "q") {
          v = parseFloat(E);
          break;
        }
        m[w] = E;
      }
    return {
      type: R,
      subtype: y,
      params: m,
      q: v,
      i: u
    };
  }
  function l(h, u, g) {
    for (var m = { o: -1, q: 0, s: 0 }, v = 0; v < u.length; v++) {
      var y = d(h, u[v], g);
      y && (m.s - y.s || m.q - y.q || m.o - y.o) < 0 && (m = y);
    }
    return m;
  }
  function d(h, u, g) {
    var m = f(h), v = 0;
    if (!m)
      return null;
    if (u.type.toLowerCase() == m.type.toLowerCase())
      v |= 4;
    else if (u.type != "*")
      return null;
    if (u.subtype.toLowerCase() == m.subtype.toLowerCase())
      v |= 2;
    else if (u.subtype != "*")
      return null;
    var y = Object.keys(u.params);
    if (y.length > 0)
      if (y.every(function(R) {
        return u.params[R] == "*" || (u.params[R] || "").toLowerCase() == (m.params[R] || "").toLowerCase();
      }))
        v |= 1;
      else
        return null;
    return {
      i: g,
      o: u.i,
      q: u.q,
      s: v
    };
  }
  function s(h, u) {
    var g = c(h === void 0 ? "*/*" : h || "");
    if (!u)
      return g.filter(r).sort(t).map(a);
    var m = u.map(function(y, R) {
      return l(y, g, R);
    });
    return m.filter(r).sort(t).map(function(y) {
      return u[m.indexOf(y)];
    });
  }
  function t(h, u) {
    return u.q - h.q || u.s - h.s || h.o - u.o || h.i - u.i || 0;
  }
  function a(h) {
    return h.type + "/" + h.subtype;
  }
  function r(h) {
    return h.q > 0;
  }
  function n(h) {
    for (var u = 0, g = 0; (g = h.indexOf('"', g)) !== -1; )
      u++, g++;
    return u;
  }
  function i(h) {
    var u = h.indexOf("="), g, m;
    return u === -1 ? g = h : (g = h.substr(0, u), m = h.substr(u + 1)), [g, m];
  }
  function p(h) {
    for (var u = h.split(","), g = 1, m = 0; g < u.length; g++)
      n(u[m]) % 2 == 0 ? u[++m] = u[g] : u[m] += "," + u[g];
    return u.length = m + 1, u;
  }
  function o(h) {
    for (var u = h.split(";"), g = 1, m = 0; g < u.length; g++)
      n(u[m]) % 2 == 0 ? u[++m] = u[g] : u[m] += ";" + u[g];
    u.length = m + 1;
    for (var g = 0; g < u.length; g++)
      u[g] = u[g].trim();
    return u;
  }
  return zr.exports;
}
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var np;
function $g() {
  if (np) return jr.exports;
  np = 1;
  var e = Dg(), c = Lg(), f = Fg(), l = Ug();
  jr.exports = d, jr.exports.Negotiator = d;
  function d(s) {
    if (!(this instanceof d))
      return new d(s);
    this.request = s;
  }
  return d.prototype.charset = function(t) {
    var a = this.charsets(t);
    return a && a[0];
  }, d.prototype.charsets = function(t) {
    return e(this.request.headers["accept-charset"], t);
  }, d.prototype.encoding = function(t) {
    var a = this.encodings(t);
    return a && a[0];
  }, d.prototype.encodings = function(t) {
    return c(this.request.headers["accept-encoding"], t);
  }, d.prototype.language = function(t) {
    var a = this.languages(t);
    return a && a[0];
  }, d.prototype.languages = function(t) {
    return f(this.request.headers["accept-language"], t);
  }, d.prototype.mediaType = function(t) {
    var a = this.mediaTypes(t);
    return a && a[0];
  }, d.prototype.mediaTypes = function(t) {
    return l(this.request.headers.accept, t);
  }, d.prototype.preferredCharset = d.prototype.charset, d.prototype.preferredCharsets = d.prototype.charsets, d.prototype.preferredEncoding = d.prototype.encoding, d.prototype.preferredEncodings = d.prototype.encodings, d.prototype.preferredLanguage = d.prototype.language, d.prototype.preferredLanguages = d.prototype.languages, d.prototype.preferredMediaType = d.prototype.mediaType, d.prototype.preferredMediaTypes = d.prototype.mediaTypes, jr.exports;
}
var Ea = {};
const qg = {
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
var Sa, rp;
function Bg() {
  return rp || (rp = 1, Sa = qg), Sa;
}
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var ip;
function jg() {
  return ip || (ip = 1, (function(e) {
    var c = Bg(), f = Pe.extname, l = /^\s*([^;\s]*)(?:;|\s|$)/, d = /^text\//i;
    e.charset = s, e.charsets = { lookup: s }, e.contentType = t, e.extension = a, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = r, e.types = /* @__PURE__ */ Object.create(null), n(e.extensions, e.types);
    function s(i) {
      if (!i || typeof i != "string")
        return !1;
      var p = l.exec(i), o = p && c[p[1].toLowerCase()];
      return o && o.charset ? o.charset : p && d.test(p[1]) ? "UTF-8" : !1;
    }
    function t(i) {
      if (!i || typeof i != "string")
        return !1;
      var p = i.indexOf("/") === -1 ? e.lookup(i) : i;
      if (!p)
        return !1;
      if (p.indexOf("charset") === -1) {
        var o = e.charset(p);
        o && (p += "; charset=" + o.toLowerCase());
      }
      return p;
    }
    function a(i) {
      if (!i || typeof i != "string")
        return !1;
      var p = l.exec(i), o = p && e.extensions[p[1].toLowerCase()];
      return !o || !o.length ? !1 : o[0];
    }
    function r(i) {
      if (!i || typeof i != "string")
        return !1;
      var p = f("x." + i).toLowerCase().substr(1);
      return p && e.types[p] || !1;
    }
    function n(i, p) {
      var o = ["nginx", "apache", void 0, "iana"];
      Object.keys(c).forEach(function(u) {
        var g = c[u], m = g.extensions;
        if (!(!m || !m.length)) {
          i[u] = m;
          for (var v = 0; v < m.length; v++) {
            var y = m[v];
            if (p[y]) {
              var R = o.indexOf(c[p[y]].source), S = o.indexOf(g.source);
              if (p[y] !== "application/octet-stream" && (R > S || R === S && p[y].substr(0, 12) === "application/"))
                continue;
            }
            p[y] = u;
          }
        }
      });
    }
  })(Ea)), Ea;
}
/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Ta, sp;
function Io() {
  if (sp) return Ta;
  sp = 1;
  var e = $g(), c = jg();
  Ta = f;
  function f(s) {
    if (!(this instanceof f))
      return new f(s);
    this.headers = s.headers, this.negotiator = new e(s);
  }
  f.prototype.type = f.prototype.types = function(s) {
    var t = s;
    if (t && !Array.isArray(t)) {
      t = new Array(arguments.length);
      for (var a = 0; a < t.length; a++)
        t[a] = arguments[a];
    }
    if (!t || t.length === 0)
      return this.negotiator.mediaTypes();
    if (!this.headers.accept)
      return t[0];
    var r = t.map(l), n = this.negotiator.mediaTypes(r.filter(d)), i = n[0];
    return i ? t[r.indexOf(i)] : !1;
  }, f.prototype.encoding = f.prototype.encodings = function(s) {
    var t = s;
    if (t && !Array.isArray(t)) {
      t = new Array(arguments.length);
      for (var a = 0; a < t.length; a++)
        t[a] = arguments[a];
    }
    return !t || t.length === 0 ? this.negotiator.encodings() : this.negotiator.encodings(t)[0] || !1;
  }, f.prototype.charset = f.prototype.charsets = function(s) {
    var t = s;
    if (t && !Array.isArray(t)) {
      t = new Array(arguments.length);
      for (var a = 0; a < t.length; a++)
        t[a] = arguments[a];
    }
    return !t || t.length === 0 ? this.negotiator.charsets() : this.negotiator.charsets(t)[0] || !1;
  }, f.prototype.lang = f.prototype.langs = f.prototype.language = f.prototype.languages = function(s) {
    var t = s;
    if (t && !Array.isArray(t)) {
      t = new Array(arguments.length);
      for (var a = 0; a < t.length; a++)
        t[a] = arguments[a];
    }
    return !t || t.length === 0 ? this.negotiator.languages() : this.negotiator.languages(t)[0] || !1;
  };
  function l(s) {
    return s.indexOf("/") === -1 ? c.lookup(s) : s;
  }
  function d(s) {
    return typeof s == "string";
  }
  return Ta;
}
var Ra = {}, Yt = {}, Ca = { exports: {} };
/*!
 * base64id v0.1.0
 */
var ap;
function yf() {
  return ap || (ap = 1, (function(e, c) {
    var f = yt, l = function() {
    };
    l.prototype.getRandomBytes = function(d) {
      var s = 4096, t = this;
      if (d = d || 12, d > s)
        return f.randomBytes(d);
      var a = parseInt(s / d), r = parseInt(a * 0.85);
      if (!r || (this.bytesBufferIndex == null && (this.bytesBufferIndex = -1), this.bytesBufferIndex == a && (this.bytesBuffer = null, this.bytesBufferIndex = -1), (this.bytesBufferIndex == -1 || this.bytesBufferIndex > r) && (this.isGeneratingBytes || (this.isGeneratingBytes = !0, f.randomBytes(s, function(i, p) {
        t.bytesBuffer = p, t.bytesBufferIndex = 0, t.isGeneratingBytes = !1;
      })), this.bytesBufferIndex == -1)))
        return f.randomBytes(d);
      var n = this.bytesBuffer.slice(d * this.bytesBufferIndex, d * (this.bytesBufferIndex + 1));
      return this.bytesBufferIndex++, n;
    }, l.prototype.generateId = function() {
      var d = Buffer.alloc(15);
      return d.writeInt32BE ? (this.sequenceNumber = this.sequenceNumber + 1 | 0, d.writeInt32BE(this.sequenceNumber, 11), f.randomBytes ? this.getRandomBytes(12).copy(d) : [0, 4, 8].forEach(function(s) {
        d.writeInt32BE(Math.random() * Math.pow(2, 32) | 0, s);
      }), d.toString("base64").replace(/\//g, "_").replace(/\+/g, "-")) : Math.abs(Math.random() * Math.random() * Date.now() | 0).toString() + Math.abs(Math.random() * Math.random() * Date.now() | 0).toString();
    }, e.exports = new l();
  })(Ca)), Ca.exports;
}
var Wr = {}, Kn = {}, Xn = {}, Aa = {}, Oa = {}, St = {}, op;
function No() {
  if (op) return St;
  op = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.ERROR_PACKET = St.PACKET_TYPES_REVERSE = St.PACKET_TYPES = void 0;
  const e = /* @__PURE__ */ Object.create(null);
  St.PACKET_TYPES = e, e.open = "0", e.close = "1", e.ping = "2", e.pong = "3", e.message = "4", e.upgrade = "5", e.noop = "6";
  const c = /* @__PURE__ */ Object.create(null);
  St.PACKET_TYPES_REVERSE = c, Object.keys(e).forEach((l) => {
    c[e[l]] = l;
  });
  const f = { type: "error", data: "parser error" };
  return St.ERROR_PACKET = f, St;
}
var cp;
function Mg() {
  return cp || (cp = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.encodePacket = void 0, e.encodePacketToBinary = s;
    const c = No(), f = ({ type: t, data: a }, r, n) => a instanceof ArrayBuffer || ArrayBuffer.isView(a) ? n(r ? a : "b" + l(a, !0).toString("base64")) : n(c.PACKET_TYPES[t] + (a || ""));
    e.encodePacket = f;
    const l = (t, a) => Buffer.isBuffer(t) || t instanceof Uint8Array && !a ? t : t instanceof ArrayBuffer ? Buffer.from(t) : Buffer.from(t.buffer, t.byteOffset, t.byteLength);
    let d;
    function s(t, a) {
      if (t.data instanceof ArrayBuffer || ArrayBuffer.isView(t.data))
        return a(l(t.data, !1));
      (0, e.encodePacket)(t, !0, (r) => {
        d || (d = new TextEncoder()), a(d.encode(r));
      });
    }
  })(Oa)), Oa;
}
var Jn = {}, lp;
function Hg() {
  if (lp) return Jn;
  lp = 1, Object.defineProperty(Jn, "__esModule", { value: !0 }), Jn.decodePacket = void 0;
  const e = No(), c = (l, d) => {
    if (typeof l != "string")
      return {
        type: "message",
        data: f(l, d)
      };
    const s = l.charAt(0);
    if (s === "b") {
      const t = Buffer.from(l.substring(1), "base64");
      return {
        type: "message",
        data: f(t, d)
      };
    }
    return e.PACKET_TYPES_REVERSE[s] ? l.length > 1 ? {
      type: e.PACKET_TYPES_REVERSE[s],
      data: l.substring(1)
    } : {
      type: e.PACKET_TYPES_REVERSE[s]
    } : e.ERROR_PACKET;
  };
  Jn.decodePacket = c;
  const f = (l, d) => {
    switch (d) {
      case "arraybuffer":
        return l instanceof ArrayBuffer ? l : Buffer.isBuffer(l) ? l.buffer.slice(l.byteOffset, l.byteOffset + l.byteLength) : l.buffer;
      case "nodebuffer":
      default:
        return Buffer.isBuffer(l) ? l : Buffer.from(l);
    }
  };
  return Jn;
}
var up;
function mi() {
  return up || (up = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.decodePayload = e.decodePacket = e.encodePayload = e.encodePacket = e.protocol = void 0, e.createPacketEncoderStream = a, e.createPacketDecoderStream = p;
    const c = Mg();
    Object.defineProperty(e, "encodePacket", { enumerable: !0, get: function() {
      return c.encodePacket;
    } });
    const f = Hg();
    Object.defineProperty(e, "decodePacket", { enumerable: !0, get: function() {
      return f.decodePacket;
    } });
    const l = No(), d = "", s = (o, h) => {
      const u = o.length, g = new Array(u);
      let m = 0;
      o.forEach((v, y) => {
        (0, c.encodePacket)(v, !1, (R) => {
          g[y] = R, ++m === u && h(g.join(d));
        });
      });
    };
    e.encodePayload = s;
    const t = (o, h) => {
      const u = o.split(d), g = [];
      for (let m = 0; m < u.length; m++) {
        const v = (0, f.decodePacket)(u[m], h);
        if (g.push(v), v.type === "error")
          break;
      }
      return g;
    };
    e.decodePayload = t;
    function a() {
      return new TransformStream({
        transform(o, h) {
          (0, c.encodePacketToBinary)(o, (u) => {
            const g = u.length;
            let m;
            if (g < 126)
              m = new Uint8Array(1), new DataView(m.buffer).setUint8(0, g);
            else if (g < 65536) {
              m = new Uint8Array(3);
              const v = new DataView(m.buffer);
              v.setUint8(0, 126), v.setUint16(1, g);
            } else {
              m = new Uint8Array(9);
              const v = new DataView(m.buffer);
              v.setUint8(0, 127), v.setBigUint64(1, BigInt(g));
            }
            o.data && typeof o.data != "string" && (m[0] |= 128), h.enqueue(m), h.enqueue(u);
          });
        }
      });
    }
    let r;
    function n(o) {
      return o.reduce((h, u) => h + u.length, 0);
    }
    function i(o, h) {
      if (o[0].length === h)
        return o.shift();
      const u = new Uint8Array(h);
      let g = 0;
      for (let m = 0; m < h; m++)
        u[m] = o[0][g++], g === o[0].length && (o.shift(), g = 0);
      return o.length && g < o[0].length && (o[0] = o[0].slice(g)), u;
    }
    function p(o, h) {
      r || (r = new TextDecoder());
      const u = [];
      let g = 0, m = -1, v = !1;
      return new TransformStream({
        transform(y, R) {
          for (u.push(y); ; ) {
            if (g === 0) {
              if (n(u) < 1)
                break;
              const S = i(u, 1);
              v = (S[0] & 128) === 128, m = S[0] & 127, m < 126 ? g = 3 : m === 126 ? g = 1 : g = 2;
            } else if (g === 1) {
              if (n(u) < 2)
                break;
              const S = i(u, 2);
              m = new DataView(S.buffer, S.byteOffset, S.length).getUint16(0), g = 3;
            } else if (g === 2) {
              if (n(u) < 8)
                break;
              const S = i(u, 8), T = new DataView(S.buffer, S.byteOffset, S.length), b = T.getUint32(0);
              if (b > Math.pow(2, 21) - 1) {
                R.enqueue(l.ERROR_PACKET);
                break;
              }
              m = b * Math.pow(2, 32) + T.getUint32(4), g = 3;
            } else {
              if (n(u) < m)
                break;
              const S = i(u, m);
              R.enqueue((0, f.decodePacket)(v ? S : r.decode(S), h)), g = 0;
            }
            if (m === 0 || m > o) {
              R.enqueue(l.ERROR_PACKET);
              break;
            }
          }
        }
      });
    }
    e.protocol = 4;
  })(Aa)), Aa;
}
var ka = {};
/*! https://mths.be/utf8js v2.1.2 by @mathias */
var Pa, pp;
function Gg() {
  if (pp) return Pa;
  pp = 1;
  var e = String.fromCharCode;
  function c(h) {
    for (var u = [], g = 0, m = h.length, v, y; g < m; )
      v = h.charCodeAt(g++), v >= 55296 && v <= 56319 && g < m ? (y = h.charCodeAt(g++), (y & 64512) == 56320 ? u.push(((v & 1023) << 10) + (y & 1023) + 65536) : (u.push(v), g--)) : u.push(v);
    return u;
  }
  function f(h) {
    for (var u = h.length, g = -1, m, v = ""; ++g < u; )
      m = h[g], m > 65535 && (m -= 65536, v += e(m >>> 10 & 1023 | 55296), m = 56320 | m & 1023), v += e(m);
    return v;
  }
  function l(h, u) {
    if (h >= 55296 && h <= 57343) {
      if (u)
        throw Error("Lone surrogate U+" + h.toString(16).toUpperCase() + " is not a scalar value");
      return !1;
    }
    return !0;
  }
  function d(h, u) {
    return e(h >> u & 63 | 128);
  }
  function s(h, u) {
    if ((h & 4294967168) == 0)
      return e(h);
    var g = "";
    return (h & 4294965248) == 0 ? g = e(h >> 6 & 31 | 192) : (h & 4294901760) == 0 ? (l(h, u) || (h = 65533), g = e(h >> 12 & 15 | 224), g += d(h, 6)) : (h & 4292870144) == 0 && (g = e(h >> 18 & 7 | 240), g += d(h, 12), g += d(h, 6)), g += e(h & 63 | 128), g;
  }
  function t(h, u) {
    u = u || {};
    for (var g = u.strict !== !1, m = c(h), v = m.length, y = -1, R, S = ""; ++y < v; )
      R = m[y], S += s(R, g);
    return S;
  }
  function a() {
    if (p >= i)
      throw Error("Invalid byte index");
    var h = n[p] & 255;
    if (p++, (h & 192) == 128)
      return h & 63;
    throw Error("Invalid continuation byte");
  }
  function r(h) {
    var u, g, m, v, y;
    if (p > i)
      throw Error("Invalid byte index");
    if (p == i)
      return !1;
    if (u = n[p] & 255, p++, (u & 128) == 0)
      return u;
    if ((u & 224) == 192) {
      if (g = a(), y = (u & 31) << 6 | g, y >= 128)
        return y;
      throw Error("Invalid continuation byte");
    }
    if ((u & 240) == 224) {
      if (g = a(), m = a(), y = (u & 15) << 12 | g << 6 | m, y >= 2048)
        return l(y, h) ? y : 65533;
      throw Error("Invalid continuation byte");
    }
    if ((u & 248) == 240 && (g = a(), m = a(), v = a(), y = (u & 7) << 18 | g << 12 | m << 6 | v, y >= 65536 && y <= 1114111))
      return y;
    throw Error("Invalid UTF-8 detected");
  }
  var n, i, p;
  function o(h, u) {
    u = u || {};
    var g = u.strict !== !1;
    n = c(h), i = n.length, p = 0;
    for (var m = [], v; (v = r(g)) !== !1; )
      m.push(v);
    return f(m);
  }
  return Pa = {
    version: "2.1.2",
    encode: t,
    decode: o
  }, Pa;
}
var dp;
function zg() {
  return dp || (dp = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.packets = e.protocol = void 0, e.encodePacket = t, e.encodeBase64Packet = r, e.decodePacket = n, e.decodeBase64Packet = p, e.encodePayload = o, e.decodePayload = g, e.encodePayloadAsBinary = R, e.decodePayloadAsBinary = T;
    var c = Gg();
    e.protocol = 3;
    const f = (b) => {
      for (const w of b)
        if (w.data instanceof ArrayBuffer || ArrayBuffer.isView(w.data))
          return !0;
      return !1;
    };
    e.packets = {
      open: 0,
      close: 1,
      ping: 2,
      pong: 3,
      message: 4,
      upgrade: 5,
      noop: 6
    };
    var l = Object.keys(e.packets), d = { type: "error", data: "parser error" };
    const s = Buffer.concat([]);
    function t(b, w, _, E) {
      if (typeof w == "function" && (E = w, w = null), typeof _ == "function" && (E = _, _ = null), Buffer.isBuffer(b.data))
        return a(b, w, E);
      if (b.data && (b.data.buffer || b.data) instanceof ArrayBuffer)
        return a({ type: b.type, data: y(b.data) }, w, E);
      var N = e.packets[b.type];
      return b.data !== void 0 && (N += _ ? c.encode(String(b.data), { strict: !1 }) : String(b.data)), E("" + N);
    }
    function a(b, w, _) {
      if (!w)
        return r(b, _);
      var E = b.data, N = Buffer.allocUnsafe(1);
      return N[0] = e.packets[b.type], _(Buffer.concat([N, E]));
    }
    function r(b, w) {
      var _ = Buffer.isBuffer(b.data) ? b.data : y(b.data), E = "b" + e.packets[b.type];
      return E += _.toString("base64"), w(E);
    }
    function n(b, w, _) {
      if (b === void 0)
        return d;
      let E;
      if (typeof b == "string")
        return E = b.charAt(0), E === "b" ? p(b.slice(1), w) : _ && (b = i(b), b === !1) || Number(E) != E || !l[E] ? d : b.length > 1 ? { type: l[E], data: b.slice(1) } : { type: l[E] };
      if (w === "arraybuffer") {
        var N = new Uint8Array(b);
        return E = N[0], { type: l[E], data: N.buffer.slice(1) };
      }
      return b instanceof ArrayBuffer && (b = y(b)), E = b[0], { type: l[E], data: b.slice(1) };
    }
    function i(b) {
      try {
        b = c.decode(b, { strict: !1 });
      } catch {
        return !1;
      }
      return b;
    }
    function p(b, w) {
      var _ = l[b.charAt(0)], E = Buffer.from(b.slice(1), "base64");
      if (w === "arraybuffer") {
        for (var N = new Uint8Array(E.length), k = 0; k < N.length; k++)
          N[k] = E[k];
        E = N.buffer;
      }
      return { type: _, data: E };
    }
    function o(b, w, _) {
      if (typeof w == "function" && (_ = w, w = null), w && f(b))
        return R(b, _);
      if (!b.length)
        return _("0:");
      function E(N, k) {
        t(N, w, !1, function(D) {
          k(null, h(D));
        });
      }
      u(b, E, function(N, k) {
        return _(k.join(""));
      });
    }
    function h(b) {
      return b.length + ":" + b;
    }
    function u(b, w, _) {
      const E = new Array(b.length);
      let N = 0;
      for (let k = 0; k < b.length; k++)
        w(b[k], (D, $) => {
          E[k] = $, ++N === b.length && _(null, E);
        });
    }
    function g(b, w, _) {
      if (typeof b != "string")
        return T(b, w, _);
      if (typeof w == "function" && (_ = w, w = null), b === "")
        return _(d, 0, 1);
      for (var E = "", N, k, D, $ = 0, C = b.length; $ < C; $++) {
        var I = b.charAt($);
        if (I !== ":") {
          E += I;
          continue;
        }
        if (E === "" || E != (N = Number(E)) || (k = b.slice($ + 1, $ + 1 + N), E != k.length))
          return _(d, 0, 1);
        if (k.length) {
          if (D = n(k, w, !1), d.type === D.type && d.data === D.data)
            return _(d, 0, 1);
          var F = _(D, $ + N, C);
          if (F === !1)
            return;
        }
        $ += N, E = "";
      }
      if (E !== "")
        return _(d, 0, 1);
    }
    function m(b) {
      for (var w = "", _ = 0, E = b.length; _ < E; _++)
        w += String.fromCharCode(b[_]);
      return w;
    }
    function v(b) {
      for (var w = Buffer.allocUnsafe(b.length), _ = 0, E = b.length; _ < E; _++)
        w.writeUInt8(b.charCodeAt(_), _);
      return w;
    }
    function y(b) {
      var w = b.byteLength || b.length, _ = b.byteOffset || 0;
      return Buffer.from(b.buffer || b, _, w);
    }
    function R(b, w) {
      if (!b.length)
        return w(s);
      u(b, S, function(_, E) {
        return w(Buffer.concat(E));
      });
    }
    function S(b, w) {
      function _(E) {
        var N = "" + E.length, k;
        if (typeof E == "string") {
          k = Buffer.allocUnsafe(N.length + 2), k[0] = 0;
          for (var D = 0; D < N.length; D++)
            k[D + 1] = parseInt(N[D], 10);
          return k[k.length - 1] = 255, w(null, Buffer.concat([k, v(E)]));
        }
        k = Buffer.allocUnsafe(N.length + 2), k[0] = 1;
        for (var D = 0; D < N.length; D++)
          k[D + 1] = parseInt(N[D], 10);
        k[k.length - 1] = 255, w(null, Buffer.concat([k, E]));
      }
      t(b, !0, !0, _);
    }
    function T(b, w, _) {
      typeof w == "function" && (_ = w, w = null);
      for (var E = b, N = [], k; E.length > 0; ) {
        var D = "", $ = E[0] === 0;
        for (k = 1; E[k] !== 255; k++) {
          if (D.length > 310)
            return _(d, 0, 1);
          D += "" + E[k];
        }
        E = E.slice(D.length + 1);
        var C = parseInt(D, 10), I = E.slice(1, C + 1);
        $ && (I = m(I)), N.push(I), E = E.slice(C + 1);
      }
      var F = N.length;
      for (k = 0; k < F; k++) {
        var U = N[k];
        _(n(U, w, !0), k, F);
      }
    }
  })(ka)), ka;
}
var fp;
function Sn() {
  if (fp) return Xn;
  fp = 1, Object.defineProperty(Xn, "__esModule", { value: !0 }), Xn.Transport = void 0;
  const e = ht, c = mi(), f = zg(), d = (0, je().default)("engine:transport");
  function s() {
  }
  class t extends e.EventEmitter {
    get readyState() {
      return this._readyState;
    }
    set readyState(r) {
      d("readyState updated from %s to %s (%s)", this._readyState, r, this.name), this._readyState = r;
    }
    /**
     * Transport constructor.
     *
     * @param {EngineRequest} req
     */
    constructor(r) {
      super(), this.writable = !1, this._readyState = "open", this.discarded = !1, this.protocol = r._query.EIO === "4" ? 4 : 3, this.parser = this.protocol === 4 ? c : f, this.supportsBinary = !(r._query && r._query.b64);
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
    onRequest(r) {
    }
    /**
     * Closes the transport.
     *
     * @package
     */
    close(r) {
      this.readyState === "closed" || this.readyState === "closing" || (this.readyState = "closing", this.doClose(r || s));
    }
    /**
     * Called with a transport error.
     *
     * @param {String} msg - message error
     * @param {Object} desc - error description
     * @protected
     */
    onError(r, n) {
      if (this.listeners("error").length) {
        const i = new Error(r);
        i.type = "TransportError", i.description = n, this.emit("error", i);
      } else
        d("ignored transport error %s (%s)", r, n);
    }
    /**
     * Called with parsed out a packets from the data stream.
     *
     * @param {Object} packet
     * @protected
     */
    onPacket(r) {
      this.emit("packet", r);
    }
    /**
     * Called with the encoded packet data.
     *
     * @param data
     * @protected
     */
    onData(r) {
      this.onPacket(this.parser.decodePacket(r));
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
  return Xn.Transport = t, t.upgradesTo = [], Xn;
}
var hp;
function bf() {
  if (hp) return Kn;
  hp = 1, Object.defineProperty(Kn, "__esModule", { value: !0 }), Kn.Polling = void 0;
  const e = Sn(), c = yn, f = Io(), d = (0, je().default)("engine:polling"), s = {
    gzip: c.createGzip,
    deflate: c.createDeflate
  };
  class t extends e.Transport {
    /**
     * HTTP polling constructor.
     */
    constructor(r) {
      super(r), this.closeTimeout = 30 * 1e3;
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
    onRequest(r) {
      const n = r.res;
      r.res = null, r.method === "GET" ? this.onPollRequest(r, n) : r.method === "POST" ? this.onDataRequest(r, n) : (n.writeHead(500), n.end());
    }
    /**
     * The client sends a request awaiting for us to send data.
     *
     * @private
     */
    onPollRequest(r, n) {
      if (this.req) {
        d("request overlap"), this.onError("overlap from client"), n.writeHead(400), n.end();
        return;
      }
      d("setting request"), this.req = r, this.res = n;
      const i = () => {
        this.onError("poll connection closed prematurely");
      }, p = () => {
        r.removeListener("close", i), this.req = this.res = null;
      };
      r.cleanup = p, r.on("close", i), this.writable = !0, this.emit("ready"), this.writable && this.shouldClose && (d("triggering empty send to append close packet"), this.send([{ type: "noop" }]));
    }
    /**
     * The client sends a request with data.
     *
     * @private
     */
    onDataRequest(r, n) {
      if (this.dataReq) {
        this.onError("data request overlap from client"), n.writeHead(400), n.end();
        return;
      }
      const i = r.headers["content-type"] === "application/octet-stream";
      if (i && this.protocol === 4)
        return this.onError("invalid content");
      this.dataReq = r, this.dataRes = n;
      let p = i ? Buffer.concat([]) : "";
      const o = () => {
        r.removeListener("data", u), r.removeListener("end", g), r.removeListener("close", h), this.dataReq = this.dataRes = p = null;
      }, h = () => {
        o(), this.onError("data request connection closed prematurely");
      }, u = (m) => {
        let v;
        i ? (p = Buffer.concat([p, m]), v = p.length) : (p += m, v = Buffer.byteLength(p)), v > this.maxHttpBufferSize && (n.writeHead(413).end(), o());
      }, g = () => {
        this.onData(p);
        const m = {
          // text/html is required instead of text/plain to avoid an
          // unwanted download dialog on certain user-agents (GH-43)
          "Content-Type": "text/html",
          "Content-Length": "2"
        };
        n.writeHead(200, this.headers(r, m)), n.end("ok"), o();
      };
      r.on("close", h), i || r.setEncoding("utf8"), r.on("data", u), r.on("end", g);
    }
    /**
     * Processes the incoming data payload.
     *
     * @param data - encoded payload
     * @protected
     */
    onData(r) {
      d('received "%s"', r);
      const n = (i) => {
        if (i.type === "close")
          return d("got xhr close packet"), this.onClose(), !1;
        this.onPacket(i);
      };
      this.protocol === 3 ? this.parser.decodePayload(r, n) : this.parser.decodePayload(r).forEach(n);
    }
    /**
     * Overrides onClose.
     *
     * @private
     */
    onClose() {
      this.writable && this.send([{ type: "noop" }]), super.onClose();
    }
    send(r) {
      this.writable = !1, this.shouldClose && (d("appending close packet to payload"), r.push({ type: "close" }), this.shouldClose(), this.shouldClose = null);
      const n = (i) => {
        const p = r.some((o) => o.options && o.options.compress);
        this.write(i, { compress: p });
      };
      this.protocol === 3 ? this.parser.encodePayload(r, this.supportsBinary, n) : this.parser.encodePayload(r, n);
    }
    /**
     * Writes data as response to poll request.
     *
     * @param {String} data
     * @param {Object} options
     * @private
     */
    write(r, n) {
      d('writing "%s"', r), this.doWrite(r, n, () => {
        this.req.cleanup(), this.emit("drain");
      });
    }
    /**
     * Performs the write.
     *
     * @protected
     */
    doWrite(r, n, i) {
      const p = typeof r == "string", h = {
        "Content-Type": p ? "text/plain; charset=UTF-8" : "application/octet-stream"
      }, u = (v) => {
        h["Content-Length"] = typeof v == "string" ? Buffer.byteLength(v) : v.length, this.res.writeHead(200, this.headers(this.req, h)), this.res.end(v), i();
      };
      if (!this.httpCompression || !n.compress) {
        u(r);
        return;
      }
      if ((p ? Buffer.byteLength(r) : r.length) < this.httpCompression.threshold) {
        u(r);
        return;
      }
      const m = f(this.req).encodings(["gzip", "deflate"]);
      if (!m) {
        u(r);
        return;
      }
      this.compress(r, m, (v, y) => {
        if (v) {
          this.res.writeHead(500), this.res.end(), i(v);
          return;
        }
        h["Content-Encoding"] = m, u(y);
      });
    }
    /**
     * Compresses data.
     *
     * @private
     */
    compress(r, n, i) {
      d("compressing");
      const p = [];
      let o = 0;
      s[n](this.httpCompression).on("error", i).on("data", function(h) {
        p.push(h), o += h.length;
      }).on("end", function() {
        i(null, Buffer.concat(p, o));
      }).end(r);
    }
    /**
     * Closes the transport.
     *
     * @private
     */
    doClose(r) {
      d("closing");
      let n;
      this.dataReq && (d("aborting ongoing data request"), this.dataReq.destroy());
      const i = () => {
        clearTimeout(n), r(), this.onClose();
      };
      this.writable ? (d("transport writable - closing right away"), this.send([{ type: "close" }]), i()) : this.discarded ? (d("transport discarded - closing right away"), i()) : (d("transport not writable - buffering orderly close"), this.shouldClose = i, n = setTimeout(i, this.closeTimeout));
    }
    /**
     * Returns headers for a response.
     *
     * @param {http.IncomingMessage} req
     * @param {Object} headers - extra headers
     * @private
     */
    headers(r, n = {}) {
      const i = r.headers["user-agent"];
      return i && (~i.indexOf(";MSIE") || ~i.indexOf("Trident/")) && (n["X-XSS-Protection"] = "0"), n["cache-control"] = "no-store", this.emit("headers", n, r), n;
    }
  }
  return Kn.Polling = t, Kn;
}
var Qn = {}, mp;
function Wg() {
  if (mp) return Qn;
  mp = 1, Object.defineProperty(Qn, "__esModule", { value: !0 }), Qn.JSONP = void 0;
  const e = bf(), c = em, f = /\\\\n/g, l = /(\\)?\\n/g;
  class d extends e.Polling {
    /**
     * JSON-P polling transport.
     */
    constructor(t) {
      super(t), this.head = "___eio[" + (t._query.j || "").replace(/[^0-9]/g, "") + "](", this.foot = ");";
    }
    onData(t) {
      t = c.parse(t).d, typeof t == "string" && (t = t.replace(l, function(a, r) {
        return r ? a : `
`;
      }), super.onData(t.replace(f, "\\n")));
    }
    doWrite(t, a, r) {
      const n = JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
      t = this.head + n + this.foot, super.doWrite(t, a, r);
    }
  }
  return Qn.JSONP = d, Qn;
}
var Zn = {}, gp;
function Vg() {
  if (gp) return Zn;
  gp = 1, Object.defineProperty(Zn, "__esModule", { value: !0 }), Zn.WebSocket = void 0;
  const e = Sn(), f = (0, je().default)("engine:ws");
  class l extends e.Transport {
    /**
     * WebSocket transport
     *
     * @param {EngineRequest} req
     */
    constructor(s) {
      super(s), this._doSend = (t) => {
        this.socket.send(t, this._onSent);
      }, this._doSendLast = (t) => {
        this.socket.send(t, this._onSentLast);
      }, this._onSent = (t) => {
        t && this.onError("write error", t.stack);
      }, this._onSentLast = (t) => {
        t ? this.onError("write error", t.stack) : (this.emit("drain"), this.writable = !0, this.emit("ready"));
      }, this.socket = s.websocket, this.socket.on("message", (t, a) => {
        const r = a ? t : t.toString();
        f('received "%s"', r), super.onData(r);
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
    send(s) {
      this.writable = !1;
      for (let t = 0; t < s.length; t++) {
        const a = s[t], r = t + 1 === s.length;
        this._canSendPreEncodedFrame(a) ? this.socket._sender.sendFrame(a.options.wsPreEncodedFrame, r ? this._onSentLast : this._onSent) : this.parser.encodePacket(a, this.supportsBinary, r ? this._doSendLast : this._doSend);
      }
    }
    /**
     * Whether the encoding of the WebSocket frame can be skipped.
     * @param packet
     * @private
     */
    _canSendPreEncodedFrame(s) {
      var t, a, r;
      return !this.perMessageDeflate && // @ts-expect-error use of untyped member
      typeof ((a = (t = this.socket) === null || t === void 0 ? void 0 : t._sender) === null || a === void 0 ? void 0 : a.sendFrame) == "function" && ((r = s.options) === null || r === void 0 ? void 0 : r.wsPreEncodedFrame) !== void 0;
    }
    doClose(s) {
      f("closing"), this.socket.close(), s && s();
    }
  }
  return Zn.WebSocket = l, Zn;
}
var er = {}, vp;
function wf() {
  if (vp) return er;
  vp = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.WebTransport = void 0;
  const e = Sn(), c = je(), f = mi(), l = (0, c.default)("engine:webtransport");
  class d extends e.Transport {
    constructor(t, a, r) {
      super({ _query: { EIO: "4" } }), this.session = t;
      const n = (0, f.createPacketEncoderStream)();
      n.readable.pipeTo(a.writable).catch(() => {
        l("the stream was closed");
      }), this.writer = n.writable.getWriter(), (async () => {
        try {
          for (; ; ) {
            const { value: i, done: p } = await r.read();
            if (p) {
              l("session is closed");
              break;
            }
            l("received chunk: %o", i), this.onPacket(i);
          }
        } catch (i) {
          l("error while reading: %s", i.message);
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
          const r = t[a];
          await this.writer.write(r);
        }
      } catch (a) {
        l("error while writing: %s", a.message);
      }
      this.emit("drain"), this.writable = !0, this.emit("ready");
    }
    doClose(t) {
      l("closing WebTransport session"), this.session.close(), t && t();
    }
  }
  return er.WebTransport = d, er;
}
var xp;
function _f() {
  if (xp) return Wr;
  xp = 1, Object.defineProperty(Wr, "__esModule", { value: !0 });
  const e = bf(), c = Wg(), f = Vg(), l = wf();
  Wr.default = {
    polling: d,
    websocket: f.WebSocket,
    webtransport: l.WebTransport
  };
  function d(s) {
    return typeof s._query.j == "string" ? new c.JSONP(s) : new e.Polling(s);
  }
  return d.upgradesTo = ["websocket", "webtransport"], Wr;
}
var tr = {}, yp;
function Ef() {
  if (yp) return tr;
  yp = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.Socket = void 0;
  const e = ht, c = je(), f = tm, l = (0, c.default)("engine:socket");
  class d extends e.EventEmitter {
    get readyState() {
      return this._readyState;
    }
    set readyState(t) {
      l("readyState updated from %s to %s", this._readyState, t), this._readyState = t;
    }
    constructor(t, a, r, n, i) {
      super(), this._readyState = "opening", this.upgrading = !1, this.upgraded = !1, this.writeBuffer = [], this.packetsFn = [], this.sentCallbackFn = [], this.cleanupFn = [], this.id = t, this.server = a, this.request = n, this.protocol = i, n && (n.websocket && n.websocket._socket ? this.remoteAddress = n.websocket._socket.remoteAddress : this.remoteAddress = n.connection.remoteAddress), this.pingTimeoutTimer = null, this.pingIntervalTimer = null, this.setTransport(r), this.onOpen();
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
        return l("packet received with closed socket");
      switch (l(`received packet ${t.type}`), this.emit("packet", t), t.type) {
        case "ping":
          if (this.transport.protocol !== 3) {
            this.onError(new Error("invalid heartbeat direction"));
            return;
          }
          l("got ping"), this.pingTimeoutTimer.refresh(), this.sendPacket("pong"), this.emit("heartbeat");
          break;
        case "pong":
          if (this.transport.protocol === 3) {
            this.onError(new Error("invalid heartbeat direction"));
            return;
          }
          l("got pong"), (0, f.clearTimeout)(this.pingTimeoutTimer), this.pingIntervalTimer.refresh(), this.emit("heartbeat");
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
      l("transport error"), this.onClose("transport error", t);
    }
    /**
     * Pings client every `this.pingInterval` and expects response
     * within `this.pingTimeout` or closes connection.
     *
     * @private
     */
    schedulePing() {
      this.pingIntervalTimer = (0, f.setTimeout)(() => {
        l("writing ping packet - expecting pong within %sms", this.server.opts.pingTimeout), this.sendPacket("ping"), this.resetPingTimeout();
      }, this.server.opts.pingInterval);
    }
    /**
     * Resets ping timeout.
     *
     * @private
     */
    resetPingTimeout() {
      (0, f.clearTimeout)(this.pingTimeoutTimer), this.pingTimeoutTimer = (0, f.setTimeout)(() => {
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
      const a = this.onError.bind(this), r = () => this.flush(), n = this.onPacket.bind(this), i = this.onDrain.bind(this), p = this.onClose.bind(this, "transport close");
      this.transport = t, this.transport.once("error", a), this.transport.on("ready", r), this.transport.on("packet", n), this.transport.on("drain", i), this.transport.once("close", p), this.cleanupFn.push(function() {
        t.removeListener("error", a), t.removeListener("ready", r), t.removeListener("packet", n), t.removeListener("drain", i), t.removeListener("close", p);
      });
    }
    /**
     * Upon transport "drain" event
     *
     * @private
     */
    onDrain() {
      if (this.sentCallbackFn.length > 0) {
        l("executing batch send callback");
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
      l('might upgrade socket transport from "%s" to "%s"', this.transport.name, t.name), this.upgrading = !0;
      const a = (0, f.setTimeout)(() => {
        l("client did not complete upgrade - closing transport"), p(), t.readyState === "open" && t.close();
      }, this.server.opts.upgradeTimeout);
      let r;
      const n = (g) => {
        g.type === "ping" && g.data === "probe" ? (l("got probe ping packet, sending pong"), t.send([{ type: "pong", data: "probe" }]), this.emit("upgrading", t), clearInterval(r), r = setInterval(i, 100)) : g.type === "upgrade" && this.readyState !== "closed" ? (l("got upgrade packet - upgrading"), p(), this.transport.discard(), this.upgraded = !0, this.clearTransport(), this.setTransport(t), this.emit("upgrade", t), this.flush(), this.readyState === "closing" && t.close(() => {
          this.onClose("forced close");
        })) : (p(), t.close());
      }, i = () => {
        this.transport.name === "polling" && this.transport.writable && (l("writing a noop packet to polling for fast upgrade"), this.transport.send([{ type: "noop" }]));
      }, p = () => {
        this.upgrading = !1, clearInterval(r), (0, f.clearTimeout)(a), t.removeListener("packet", n), t.removeListener("close", h), t.removeListener("error", o), this.removeListener("close", u);
      }, o = (g) => {
        l("client did not complete upgrade - %s", g), p(), t.close(), t = null;
      }, h = () => {
        o("transport closed");
      }, u = () => {
        o("socket closed");
      };
      t.on("packet", n), t.once("close", h), t.once("error", o), this.once("close", u);
    }
    /**
     * Clears listeners and timers associated with current transport.
     *
     * @private
     */
    clearTransport() {
      let t;
      const a = this.cleanupFn.length;
      for (let r = 0; r < a; r++)
        t = this.cleanupFn.shift(), t();
      this.transport.on("error", function() {
        l("error triggered by discarded transport");
      }), this.transport.close(), (0, f.clearTimeout)(this.pingTimeoutTimer);
    }
    /**
     * Called upon transport considered closed.
     * Possible reasons: `ping timeout`, `client error`, `parse error`,
     * `transport error`, `server close`, `transport close`
     */
    onClose(t, a) {
      this.readyState !== "closed" && (this.readyState = "closed", (0, f.clearTimeout)(this.pingIntervalTimer), (0, f.clearTimeout)(this.pingTimeoutTimer), process.nextTick(() => {
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
    send(t, a, r) {
      return this.sendPacket("message", t, a, r), this;
    }
    /**
     * Alias of {@link send}.
     *
     * @param data
     * @param options
     * @param callback
     */
    write(t, a, r) {
      return this.sendPacket("message", t, a, r), this;
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
    sendPacket(t, a, r = {}, n) {
      if (typeof r == "function" && (n = r, r = {}), this.readyState !== "closing" && this.readyState !== "closed") {
        l('sending packet "%s" (%s)', t, a), r.compress = r.compress !== !1;
        const i = {
          type: t,
          options: r
        };
        a && (i.data = a), this.emit("packetCreate", i), this.writeBuffer.push(i), typeof n == "function" && this.packetsFn.push(n), this.flush();
      }
    }
    /**
     * Attempts to flush the packets buffer.
     *
     * @private
     */
    flush() {
      if (this.readyState !== "closed" && this.transport.writable && this.writeBuffer.length) {
        l("flushing buffer to transport"), this.emit("flush", this.writeBuffer), this.server.emit("flush", this, this.writeBuffer);
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
      for (let r = 0; r < a.length; ++r) {
        const n = a[r];
        this.server.opts.transports.indexOf(n) !== -1 && t.push(n);
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
          l("there are %d remaining packets in the buffer, waiting for the 'drain' event", this.writeBuffer.length), this.once("drain", () => {
            l("all packets have been sent, closing the transport"), this.closeTransport(t);
          });
          return;
        }
        l("the buffer is empty, closing the transport right away"), this.closeTransport(t);
      }
    }
    /**
     * Closes the underlying transport.
     *
     * @param {Boolean} discard
     * @private
     */
    closeTransport(t) {
      l("closing the transport (discard? %s)", !!t), t && this.transport.discard(), this.transport.close(this.onClose.bind(this, "forced close"));
    }
  }
  return tr.Socket = d, tr;
}
var Vr = {};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var bp;
function Yg() {
  if (bp) return Vr;
  bp = 1, Vr.parse = t, Vr.serialize = n;
  var e = Object.prototype.toString, c = Object.prototype.hasOwnProperty, f = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, l = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, d = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, s = /^[\u0020-\u003A\u003D-\u007E]*$/;
  function t(h, u) {
    if (typeof h != "string")
      throw new TypeError("argument str must be a string");
    var g = {}, m = h.length;
    if (m < 2) return g;
    var v = u && u.decode || i, y = 0, R = 0, S = 0;
    do {
      if (R = h.indexOf("=", y), R === -1) break;
      if (S = h.indexOf(";", y), S === -1)
        S = m;
      else if (R > S) {
        y = h.lastIndexOf(";", R - 1) + 1;
        continue;
      }
      var T = a(h, y, R), b = r(h, R, T), w = h.slice(T, b);
      if (!c.call(g, w)) {
        var _ = a(h, R + 1, S), E = r(h, S, _);
        h.charCodeAt(_) === 34 && h.charCodeAt(E - 1) === 34 && (_++, E--);
        var N = h.slice(_, E);
        g[w] = o(N, v);
      }
      y = S + 1;
    } while (y < m);
    return g;
  }
  function a(h, u, g) {
    do {
      var m = h.charCodeAt(u);
      if (m !== 32 && m !== 9) return u;
    } while (++u < g);
    return g;
  }
  function r(h, u, g) {
    for (; u > g; ) {
      var m = h.charCodeAt(--u);
      if (m !== 32 && m !== 9) return u + 1;
    }
    return g;
  }
  function n(h, u, g) {
    var m = g && g.encode || encodeURIComponent;
    if (typeof m != "function")
      throw new TypeError("option encode is invalid");
    if (!f.test(h))
      throw new TypeError("argument name is invalid");
    var v = m(u);
    if (!l.test(v))
      throw new TypeError("argument val is invalid");
    var y = h + "=" + v;
    if (!g) return y;
    if (g.maxAge != null) {
      var R = Math.floor(g.maxAge);
      if (!isFinite(R))
        throw new TypeError("option maxAge is invalid");
      y += "; Max-Age=" + R;
    }
    if (g.domain) {
      if (!d.test(g.domain))
        throw new TypeError("option domain is invalid");
      y += "; Domain=" + g.domain;
    }
    if (g.path) {
      if (!s.test(g.path))
        throw new TypeError("option path is invalid");
      y += "; Path=" + g.path;
    }
    if (g.expires) {
      var S = g.expires;
      if (!p(S) || isNaN(S.valueOf()))
        throw new TypeError("option expires is invalid");
      y += "; Expires=" + S.toUTCString();
    }
    if (g.httpOnly && (y += "; HttpOnly"), g.secure && (y += "; Secure"), g.partitioned && (y += "; Partitioned"), g.priority) {
      var T = typeof g.priority == "string" ? g.priority.toLowerCase() : g.priority;
      switch (T) {
        case "low":
          y += "; Priority=Low";
          break;
        case "medium":
          y += "; Priority=Medium";
          break;
        case "high":
          y += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (g.sameSite) {
      var b = typeof g.sameSite == "string" ? g.sameSite.toLowerCase() : g.sameSite;
      switch (b) {
        case !0:
          y += "; SameSite=Strict";
          break;
        case "lax":
          y += "; SameSite=Lax";
          break;
        case "strict":
          y += "; SameSite=Strict";
          break;
        case "none":
          y += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return y;
  }
  function i(h) {
    return h.indexOf("%") !== -1 ? decodeURIComponent(h) : h;
  }
  function p(h) {
    return e.call(h) === "[object Date]";
  }
  function o(h, u) {
    try {
      return u(h);
    } catch {
      return h;
    }
  }
  return Vr;
}
var nr = { exports: {} }, Ia, wp;
function Ut() {
  if (wp) return Ia;
  wp = 1;
  const e = ["nodebuffer", "arraybuffer", "fragments"], c = typeof Blob < "u";
  return c && e.push("blob"), Ia = {
    BINARY_TYPES: e,
    EMPTY_BUFFER: Buffer.alloc(0),
    GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
    hasBlob: c,
    kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
    kListener: Symbol("kListener"),
    kStatusCode: Symbol("status-code"),
    kWebSocket: Symbol("websocket"),
    NOOP: () => {
    }
  }, Ia;
}
var Yr = { exports: {} };
function Sf(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Kr = { exports: {} }, Na, _p;
function Kg() {
  if (_p) return Na;
  _p = 1;
  var e = Ze, c = Pe, f = mr, l = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Sf, d = process.config && process.config.variables || {}, s = !!process.env.PREBUILDS_ONLY, t = process.versions.modules, a = E() ? "electron" : _() ? "node-webkit" : "node", r = process.env.npm_config_arch || f.arch(), n = process.env.npm_config_platform || f.platform(), i = process.env.LIBC || (N(n) ? "musl" : "glibc"), p = process.env.ARM_VERSION || (r === "arm64" ? "8" : d.arm_version) || "", o = (process.versions.uv || "").split(".")[0];
  Na = h;
  function h(k) {
    return l(h.resolve(k));
  }
  h.resolve = h.path = function(k) {
    k = c.resolve(k || ".");
    try {
      var D = l(c.join(k, "package.json")).name.toUpperCase().replace(/-/g, "_");
      process.env[D + "_PREBUILD"] && (k = process.env[D + "_PREBUILD"]);
    } catch {
    }
    if (!s) {
      var $ = g(c.join(k, "build/Release"), m);
      if ($) return $;
      var C = g(c.join(k, "build/Debug"), m);
      if (C) return C;
    }
    var I = G(k);
    if (I) return I;
    var F = G(c.dirname(process.execPath));
    if (F) return F;
    var U = [
      "platform=" + n,
      "arch=" + r,
      "runtime=" + a,
      "abi=" + t,
      "uv=" + o,
      p ? "armv=" + p : "",
      "libc=" + i,
      "node=" + process.versions.node,
      process.versions.electron ? "electron=" + process.versions.electron : "",
      typeof __webpack_require__ == "function" ? "webpack=true" : ""
      // eslint-disable-line
    ].filter(Boolean).join(" ");
    throw new Error("No native build was found for " + U + `
    loaded from: ` + k + `
`);
    function G(W) {
      var re = u(c.join(W, "prebuilds")).map(v), ae = re.filter(y(n, r)).sort(R)[0];
      if (ae) {
        var oe = c.join(W, "prebuilds", ae.name), ye = u(oe).map(S), _e = ye.filter(T(a, t)), Z = _e.sort(w(a))[0];
        if (Z) return c.join(oe, Z.file);
      }
    }
  };
  function u(k) {
    try {
      return e.readdirSync(k);
    } catch {
      return [];
    }
  }
  function g(k, D) {
    var $ = u(k).filter(D);
    return $[0] && c.join(k, $[0]);
  }
  function m(k) {
    return /\.node$/.test(k);
  }
  function v(k) {
    var D = k.split("-");
    if (D.length === 2) {
      var $ = D[0], C = D[1].split("+");
      if ($ && C.length && C.every(Boolean))
        return { name: k, platform: $, architectures: C };
    }
  }
  function y(k, D) {
    return function($) {
      return $ == null || $.platform !== k ? !1 : $.architectures.includes(D);
    };
  }
  function R(k, D) {
    return k.architectures.length - D.architectures.length;
  }
  function S(k) {
    var D = k.split("."), $ = D.pop(), C = { file: k, specificity: 0 };
    if ($ === "node") {
      for (var I = 0; I < D.length; I++) {
        var F = D[I];
        if (F === "node" || F === "electron" || F === "node-webkit")
          C.runtime = F;
        else if (F === "napi")
          C.napi = !0;
        else if (F.slice(0, 3) === "abi")
          C.abi = F.slice(3);
        else if (F.slice(0, 2) === "uv")
          C.uv = F.slice(2);
        else if (F.slice(0, 4) === "armv")
          C.armv = F.slice(4);
        else if (F === "glibc" || F === "musl")
          C.libc = F;
        else
          continue;
        C.specificity++;
      }
      return C;
    }
  }
  function T(k, D) {
    return function($) {
      return !($ == null || $.runtime && $.runtime !== k && !b($) || $.abi && $.abi !== D && !$.napi || $.uv && $.uv !== o || $.armv && $.armv !== p || $.libc && $.libc !== i);
    };
  }
  function b(k) {
    return k.runtime === "node" && k.napi;
  }
  function w(k) {
    return function(D, $) {
      return D.runtime !== $.runtime ? D.runtime === k ? -1 : 1 : D.abi !== $.abi ? D.abi ? -1 : 1 : D.specificity !== $.specificity ? D.specificity > $.specificity ? -1 : 1 : 0;
    };
  }
  function _() {
    return !!(process.versions && process.versions.nw);
  }
  function E() {
    return process.versions && process.versions.electron || process.env.ELECTRON_RUN_AS_NODE ? !0 : typeof window < "u" && window.process && window.process.type === "renderer";
  }
  function N(k) {
    return k === "linux" && e.existsSync("/etc/alpine-release");
  }
  return h.parseTags = S, h.matchTags = T, h.compareTags = w, h.parseTuple = v, h.matchTuple = y, h.compareTuples = R, Na;
}
var Ep;
function Tf() {
  if (Ep) return Kr.exports;
  Ep = 1;
  const e = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Sf;
  return typeof e.addon == "function" ? Kr.exports = e.addon.bind(e) : Kr.exports = Kg(), Kr.exports;
}
var Da, Sp;
function Xg() {
  return Sp || (Sp = 1, Da = { mask: (f, l, d, s, t) => {
    for (var a = 0; a < t; a++)
      d[s + a] = f[a] ^ l[a & 3];
  }, unmask: (f, l) => {
    const d = f.length;
    for (var s = 0; s < d; s++)
      f[s] ^= l[s & 3];
  } }), Da;
}
var Tp;
function Jg() {
  if (Tp) return Yr.exports;
  Tp = 1;
  try {
    Yr.exports = Tf()(__dirname);
  } catch {
    Yr.exports = Xg();
  }
  return Yr.exports;
}
var Rp;
function gi() {
  if (Rp) return nr.exports;
  Rp = 1;
  const { EMPTY_BUFFER: e } = Ut(), c = Buffer[Symbol.species];
  function f(a, r) {
    if (a.length === 0) return e;
    if (a.length === 1) return a[0];
    const n = Buffer.allocUnsafe(r);
    let i = 0;
    for (let p = 0; p < a.length; p++) {
      const o = a[p];
      n.set(o, i), i += o.length;
    }
    return i < r ? new c(n.buffer, n.byteOffset, i) : n;
  }
  function l(a, r, n, i, p) {
    for (let o = 0; o < p; o++)
      n[i + o] = a[o] ^ r[o & 3];
  }
  function d(a, r) {
    for (let n = 0; n < a.length; n++)
      a[n] ^= r[n & 3];
  }
  function s(a) {
    return a.length === a.buffer.byteLength ? a.buffer : a.buffer.slice(a.byteOffset, a.byteOffset + a.length);
  }
  function t(a) {
    if (t.readOnly = !0, Buffer.isBuffer(a)) return a;
    let r;
    return a instanceof ArrayBuffer ? r = new c(a) : ArrayBuffer.isView(a) ? r = new c(a.buffer, a.byteOffset, a.byteLength) : (r = Buffer.from(a), t.readOnly = !1), r;
  }
  if (nr.exports = {
    concat: f,
    mask: l,
    toArrayBuffer: s,
    toBuffer: t,
    unmask: d
  }, !process.env.WS_NO_BUFFER_UTIL)
    try {
      const a = Jg();
      nr.exports.mask = function(r, n, i, p, o) {
        o < 48 ? l(r, n, i, p, o) : a.mask(r, n, i, p, o);
      }, nr.exports.unmask = function(r, n) {
        r.length < 32 ? d(r, n) : a.unmask(r, n);
      };
    } catch {
    }
  return nr.exports;
}
var La, Cp;
function Qg() {
  if (Cp) return La;
  Cp = 1;
  const e = Symbol("kDone"), c = Symbol("kRun");
  class f {
    /**
     * Creates a new `Limiter`.
     *
     * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
     *     to run concurrently
     */
    constructor(d) {
      this[e] = () => {
        this.pending--, this[c]();
      }, this.concurrency = d || 1 / 0, this.jobs = [], this.pending = 0;
    }
    /**
     * Adds a job to the queue.
     *
     * @param {Function} job The job to run
     * @public
     */
    add(d) {
      this.jobs.push(d), this[c]();
    }
    /**
     * Removes a job from the queue and runs it if possible.
     *
     * @private
     */
    [c]() {
      if (this.pending !== this.concurrency && this.jobs.length) {
        const d = this.jobs.shift();
        this.pending++, d(this[e]);
      }
    }
  }
  return La = f, La;
}
var Fa, Ap;
function vi() {
  if (Ap) return Fa;
  Ap = 1;
  const e = yn, c = gi(), f = Qg(), { kStatusCode: l } = Ut(), d = Buffer[Symbol.species], s = Buffer.from([0, 0, 255, 255]), t = Symbol("permessage-deflate"), a = Symbol("total-length"), r = Symbol("callback"), n = Symbol("buffers"), i = Symbol("error");
  let p;
  class o {
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
    constructor(v, y, R) {
      if (this._maxPayload = R | 0, this._options = v || {}, this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024, this._isServer = !!y, this._deflate = null, this._inflate = null, this.params = null, !p) {
        const S = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
        p = new f(S);
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
      const v = {};
      return this._options.serverNoContextTakeover && (v.server_no_context_takeover = !0), this._options.clientNoContextTakeover && (v.client_no_context_takeover = !0), this._options.serverMaxWindowBits && (v.server_max_window_bits = this._options.serverMaxWindowBits), this._options.clientMaxWindowBits ? v.client_max_window_bits = this._options.clientMaxWindowBits : this._options.clientMaxWindowBits == null && (v.client_max_window_bits = !0), v;
    }
    /**
     * Accept an extension negotiation offer/response.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Object} Accepted configuration
     * @public
     */
    accept(v) {
      return v = this.normalizeParams(v), this.params = this._isServer ? this.acceptAsServer(v) : this.acceptAsClient(v), this.params;
    }
    /**
     * Releases all resources used by the extension.
     *
     * @public
     */
    cleanup() {
      if (this._inflate && (this._inflate.close(), this._inflate = null), this._deflate) {
        const v = this._deflate[r];
        this._deflate.close(), this._deflate = null, v && v(
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
    acceptAsServer(v) {
      const y = this._options, R = v.find((S) => !(y.serverNoContextTakeover === !1 && S.server_no_context_takeover || S.server_max_window_bits && (y.serverMaxWindowBits === !1 || typeof y.serverMaxWindowBits == "number" && y.serverMaxWindowBits > S.server_max_window_bits) || typeof y.clientMaxWindowBits == "number" && !S.client_max_window_bits));
      if (!R)
        throw new Error("None of the extension offers can be accepted");
      return y.serverNoContextTakeover && (R.server_no_context_takeover = !0), y.clientNoContextTakeover && (R.client_no_context_takeover = !0), typeof y.serverMaxWindowBits == "number" && (R.server_max_window_bits = y.serverMaxWindowBits), typeof y.clientMaxWindowBits == "number" ? R.client_max_window_bits = y.clientMaxWindowBits : (R.client_max_window_bits === !0 || y.clientMaxWindowBits === !1) && delete R.client_max_window_bits, R;
    }
    /**
     * Accept the extension negotiation response.
     *
     * @param {Array} response The extension negotiation response
     * @return {Object} Accepted configuration
     * @private
     */
    acceptAsClient(v) {
      const y = v[0];
      if (this._options.clientNoContextTakeover === !1 && y.client_no_context_takeover)
        throw new Error('Unexpected parameter "client_no_context_takeover"');
      if (!y.client_max_window_bits)
        typeof this._options.clientMaxWindowBits == "number" && (y.client_max_window_bits = this._options.clientMaxWindowBits);
      else if (this._options.clientMaxWindowBits === !1 || typeof this._options.clientMaxWindowBits == "number" && y.client_max_window_bits > this._options.clientMaxWindowBits)
        throw new Error(
          'Unexpected or invalid parameter "client_max_window_bits"'
        );
      return y;
    }
    /**
     * Normalize parameters.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Array} The offers/response with normalized parameters
     * @private
     */
    normalizeParams(v) {
      return v.forEach((y) => {
        Object.keys(y).forEach((R) => {
          let S = y[R];
          if (S.length > 1)
            throw new Error(`Parameter "${R}" must have only a single value`);
          if (S = S[0], R === "client_max_window_bits") {
            if (S !== !0) {
              const T = +S;
              if (!Number.isInteger(T) || T < 8 || T > 15)
                throw new TypeError(
                  `Invalid value for parameter "${R}": ${S}`
                );
              S = T;
            } else if (!this._isServer)
              throw new TypeError(
                `Invalid value for parameter "${R}": ${S}`
              );
          } else if (R === "server_max_window_bits") {
            const T = +S;
            if (!Number.isInteger(T) || T < 8 || T > 15)
              throw new TypeError(
                `Invalid value for parameter "${R}": ${S}`
              );
            S = T;
          } else if (R === "client_no_context_takeover" || R === "server_no_context_takeover") {
            if (S !== !0)
              throw new TypeError(
                `Invalid value for parameter "${R}": ${S}`
              );
          } else
            throw new Error(`Unknown parameter "${R}"`);
          y[R] = S;
        });
      }), v;
    }
    /**
     * Decompress data. Concurrency limited.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */
    decompress(v, y, R) {
      p.add((S) => {
        this._decompress(v, y, (T, b) => {
          S(), R(T, b);
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
    compress(v, y, R) {
      p.add((S) => {
        this._compress(v, y, (T, b) => {
          S(), R(T, b);
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
    _decompress(v, y, R) {
      const S = this._isServer ? "client" : "server";
      if (!this._inflate) {
        const T = `${S}_max_window_bits`, b = typeof this.params[T] != "number" ? e.Z_DEFAULT_WINDOWBITS : this.params[T];
        this._inflate = e.createInflateRaw({
          ...this._options.zlibInflateOptions,
          windowBits: b
        }), this._inflate[t] = this, this._inflate[a] = 0, this._inflate[n] = [], this._inflate.on("error", g), this._inflate.on("data", u);
      }
      this._inflate[r] = R, this._inflate.write(v), y && this._inflate.write(s), this._inflate.flush(() => {
        const T = this._inflate[i];
        if (T) {
          this._inflate.close(), this._inflate = null, R(T);
          return;
        }
        const b = c.concat(
          this._inflate[n],
          this._inflate[a]
        );
        this._inflate._readableState.endEmitted ? (this._inflate.close(), this._inflate = null) : (this._inflate[a] = 0, this._inflate[n] = [], y && this.params[`${S}_no_context_takeover`] && this._inflate.reset()), R(null, b);
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
    _compress(v, y, R) {
      const S = this._isServer ? "server" : "client";
      if (!this._deflate) {
        const T = `${S}_max_window_bits`, b = typeof this.params[T] != "number" ? e.Z_DEFAULT_WINDOWBITS : this.params[T];
        this._deflate = e.createDeflateRaw({
          ...this._options.zlibDeflateOptions,
          windowBits: b
        }), this._deflate[a] = 0, this._deflate[n] = [], this._deflate.on("data", h);
      }
      this._deflate[r] = R, this._deflate.write(v), this._deflate.flush(e.Z_SYNC_FLUSH, () => {
        if (!this._deflate)
          return;
        let T = c.concat(
          this._deflate[n],
          this._deflate[a]
        );
        y && (T = new d(T.buffer, T.byteOffset, T.length - 4)), this._deflate[r] = null, this._deflate[a] = 0, this._deflate[n] = [], y && this.params[`${S}_no_context_takeover`] && this._deflate.reset(), R(null, T);
      });
    }
  }
  Fa = o;
  function h(m) {
    this[n].push(m), this[a] += m.length;
  }
  function u(m) {
    if (this[a] += m.length, this[t]._maxPayload < 1 || this[a] <= this[t]._maxPayload) {
      this[n].push(m);
      return;
    }
    this[i] = new RangeError("Max payload size exceeded"), this[i].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH", this[i][l] = 1009, this.removeListener("data", u), this.reset();
  }
  function g(m) {
    if (this[t]._inflate = null, this[i]) {
      this[r](this[i]);
      return;
    }
    m[l] = 1007, this[r](m);
  }
  return Fa;
}
var rr = { exports: {} }, Xr = { exports: {} }, Ua, Op;
function Zg() {
  if (Op) return Ua;
  Op = 1;
  function e(c) {
    const f = c.length;
    let l = 0;
    for (; l < f; )
      if ((c[l] & 128) === 0)
        l++;
      else if ((c[l] & 224) === 192) {
        if (l + 1 === f || (c[l + 1] & 192) !== 128 || (c[l] & 254) === 192)
          return !1;
        l += 2;
      } else if ((c[l] & 240) === 224) {
        if (l + 2 >= f || (c[l + 1] & 192) !== 128 || (c[l + 2] & 192) !== 128 || c[l] === 224 && (c[l + 1] & 224) === 128 || // overlong
        c[l] === 237 && (c[l + 1] & 224) === 160)
          return !1;
        l += 3;
      } else if ((c[l] & 248) === 240) {
        if (l + 3 >= f || (c[l + 1] & 192) !== 128 || (c[l + 2] & 192) !== 128 || (c[l + 3] & 192) !== 128 || c[l] === 240 && (c[l + 1] & 240) === 128 || // overlong
        c[l] === 244 && c[l + 1] > 143 || c[l] > 244)
          return !1;
        l += 4;
      } else
        return !1;
    return !0;
  }
  return Ua = e, Ua;
}
var kp;
function ev() {
  if (kp) return Xr.exports;
  kp = 1;
  try {
    Xr.exports = Tf()(__dirname);
  } catch {
    Xr.exports = Zg();
  }
  return Xr.exports;
}
var Pp;
function wr() {
  if (Pp) return rr.exports;
  Pp = 1;
  const { isUtf8: e } = Bd, { hasBlob: c } = Ut(), f = [
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
  function l(t) {
    return t >= 1e3 && t <= 1014 && t !== 1004 && t !== 1005 && t !== 1006 || t >= 3e3 && t <= 4999;
  }
  function d(t) {
    const a = t.length;
    let r = 0;
    for (; r < a; )
      if ((t[r] & 128) === 0)
        r++;
      else if ((t[r] & 224) === 192) {
        if (r + 1 === a || (t[r + 1] & 192) !== 128 || (t[r] & 254) === 192)
          return !1;
        r += 2;
      } else if ((t[r] & 240) === 224) {
        if (r + 2 >= a || (t[r + 1] & 192) !== 128 || (t[r + 2] & 192) !== 128 || t[r] === 224 && (t[r + 1] & 224) === 128 || // Overlong
        t[r] === 237 && (t[r + 1] & 224) === 160)
          return !1;
        r += 3;
      } else if ((t[r] & 248) === 240) {
        if (r + 3 >= a || (t[r + 1] & 192) !== 128 || (t[r + 2] & 192) !== 128 || (t[r + 3] & 192) !== 128 || t[r] === 240 && (t[r + 1] & 240) === 128 || // Overlong
        t[r] === 244 && t[r + 1] > 143 || t[r] > 244)
          return !1;
        r += 4;
      } else
        return !1;
    return !0;
  }
  function s(t) {
    return c && typeof t == "object" && typeof t.arrayBuffer == "function" && typeof t.type == "string" && typeof t.stream == "function" && (t[Symbol.toStringTag] === "Blob" || t[Symbol.toStringTag] === "File");
  }
  if (rr.exports = {
    isBlob: s,
    isValidStatusCode: l,
    isValidUTF8: d,
    tokenChars: f
  }, e)
    rr.exports.isValidUTF8 = function(t) {
      return t.length < 24 ? d(t) : e(t);
    };
  else if (!process.env.WS_NO_UTF_8_VALIDATE)
    try {
      const t = ev();
      rr.exports.isValidUTF8 = function(a) {
        return a.length < 32 ? d(a) : t(a);
      };
    } catch {
    }
  return rr.exports;
}
var $a, Ip;
function Rf() {
  if (Ip) return $a;
  Ip = 1;
  const { Writable: e } = et, c = vi(), {
    BINARY_TYPES: f,
    EMPTY_BUFFER: l,
    kStatusCode: d,
    kWebSocket: s
  } = Ut(), { concat: t, toArrayBuffer: a, unmask: r } = gi(), { isValidStatusCode: n, isValidUTF8: i } = wr(), p = Buffer[Symbol.species], o = 0, h = 1, u = 2, g = 3, m = 4, v = 5, y = 6;
  class R extends e {
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
      super(), this._allowSynchronousEvents = T.allowSynchronousEvents !== void 0 ? T.allowSynchronousEvents : !0, this._binaryType = T.binaryType || f[0], this._extensions = T.extensions || {}, this._isServer = !!T.isServer, this._maxPayload = T.maxPayload | 0, this._skipUTF8Validation = !!T.skipUTF8Validation, this[s] = void 0, this._bufferedBytes = 0, this._buffers = [], this._compressed = !1, this._payloadLength = 0, this._mask = void 0, this._fragmented = 0, this._masked = !1, this._fin = !1, this._opcode = 0, this._totalPayloadLength = 0, this._messageLength = 0, this._fragments = [], this._errored = !1, this._loop = !1, this._state = o;
    }
    /**
     * Implements `Writable.prototype._write()`.
     *
     * @param {Buffer} chunk The chunk of data to write
     * @param {String} encoding The character encoding of `chunk`
     * @param {Function} cb Callback
     * @private
     */
    _write(T, b, w) {
      if (this._opcode === 8 && this._state == o) return w();
      this._bufferedBytes += T.length, this._buffers.push(T), this.startLoop(w);
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
        const w = this._buffers[0];
        return this._buffers[0] = new p(
          w.buffer,
          w.byteOffset + T,
          w.length - T
        ), new p(w.buffer, w.byteOffset, T);
      }
      const b = Buffer.allocUnsafe(T);
      do {
        const w = this._buffers[0], _ = b.length - T;
        T >= w.length ? b.set(this._buffers.shift(), _) : (b.set(new Uint8Array(w.buffer, w.byteOffset, T), _), this._buffers[0] = new p(
          w.buffer,
          w.byteOffset + T,
          w.length - T
        )), T -= w.length;
      } while (T > 0);
      return b;
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
          case o:
            this.getInfo(T);
            break;
          case h:
            this.getPayloadLength16(T);
            break;
          case u:
            this.getPayloadLength64(T);
            break;
          case g:
            this.getMask();
            break;
          case m:
            this.getData(T);
            break;
          case v:
          case y:
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
      const b = this.consume(2);
      if ((b[0] & 48) !== 0) {
        const _ = this.createError(
          RangeError,
          "RSV2 and RSV3 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_2_3"
        );
        T(_);
        return;
      }
      const w = (b[0] & 64) === 64;
      if (w && !this._extensions[c.extensionName]) {
        const _ = this.createError(
          RangeError,
          "RSV1 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_1"
        );
        T(_);
        return;
      }
      if (this._fin = (b[0] & 128) === 128, this._opcode = b[0] & 15, this._payloadLength = b[1] & 127, this._opcode === 0) {
        if (w) {
          const _ = this.createError(
            RangeError,
            "RSV1 must be clear",
            !0,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          T(_);
          return;
        }
        if (!this._fragmented) {
          const _ = this.createError(
            RangeError,
            "invalid opcode 0",
            !0,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          T(_);
          return;
        }
        this._opcode = this._fragmented;
      } else if (this._opcode === 1 || this._opcode === 2) {
        if (this._fragmented) {
          const _ = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            !0,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          T(_);
          return;
        }
        this._compressed = w;
      } else if (this._opcode > 7 && this._opcode < 11) {
        if (!this._fin) {
          const _ = this.createError(
            RangeError,
            "FIN must be set",
            !0,
            1002,
            "WS_ERR_EXPECTED_FIN"
          );
          T(_);
          return;
        }
        if (w) {
          const _ = this.createError(
            RangeError,
            "RSV1 must be clear",
            !0,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          T(_);
          return;
        }
        if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
          const _ = this.createError(
            RangeError,
            `invalid payload length ${this._payloadLength}`,
            !0,
            1002,
            "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
          );
          T(_);
          return;
        }
      } else {
        const _ = this.createError(
          RangeError,
          `invalid opcode ${this._opcode}`,
          !0,
          1002,
          "WS_ERR_INVALID_OPCODE"
        );
        T(_);
        return;
      }
      if (!this._fin && !this._fragmented && (this._fragmented = this._opcode), this._masked = (b[1] & 128) === 128, this._isServer) {
        if (!this._masked) {
          const _ = this.createError(
            RangeError,
            "MASK must be set",
            !0,
            1002,
            "WS_ERR_EXPECTED_MASK"
          );
          T(_);
          return;
        }
      } else if (this._masked) {
        const _ = this.createError(
          RangeError,
          "MASK must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_MASK"
        );
        T(_);
        return;
      }
      this._payloadLength === 126 ? this._state = h : this._payloadLength === 127 ? this._state = u : this.haveLength(T);
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
      const b = this.consume(8), w = b.readUInt32BE(0);
      if (w > Math.pow(2, 21) - 1) {
        const _ = this.createError(
          RangeError,
          "Unsupported WebSocket frame: payload length > 2^53 - 1",
          !1,
          1009,
          "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
        );
        T(_);
        return;
      }
      this._payloadLength = w * Math.pow(2, 32) + b.readUInt32BE(4), this.haveLength(T);
    }
    /**
     * Payload length has been read.
     *
     * @param {Function} cb Callback
     * @private
     */
    haveLength(T) {
      if (this._payloadLength && this._opcode < 8 && (this._totalPayloadLength += this._payloadLength, this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)) {
        const b = this.createError(
          RangeError,
          "Max payload size exceeded",
          !1,
          1009,
          "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
        );
        T(b);
        return;
      }
      this._masked ? this._state = g : this._state = m;
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
      this._mask = this.consume(4), this._state = m;
    }
    /**
     * Reads data bytes.
     *
     * @param {Function} cb Callback
     * @private
     */
    getData(T) {
      let b = l;
      if (this._payloadLength) {
        if (this._bufferedBytes < this._payloadLength) {
          this._loop = !1;
          return;
        }
        b = this.consume(this._payloadLength), this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0 && r(b, this._mask);
      }
      if (this._opcode > 7) {
        this.controlMessage(b, T);
        return;
      }
      if (this._compressed) {
        this._state = v, this.decompress(b, T);
        return;
      }
      b.length && (this._messageLength = this._totalPayloadLength, this._fragments.push(b)), this.dataMessage(T);
    }
    /**
     * Decompresses data.
     *
     * @param {Buffer} data Compressed data
     * @param {Function} cb Callback
     * @private
     */
    decompress(T, b) {
      this._extensions[c.extensionName].decompress(T, this._fin, (_, E) => {
        if (_) return b(_);
        if (E.length) {
          if (this._messageLength += E.length, this._messageLength > this._maxPayload && this._maxPayload > 0) {
            const N = this.createError(
              RangeError,
              "Max payload size exceeded",
              !1,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
            b(N);
            return;
          }
          this._fragments.push(E);
        }
        this.dataMessage(b), this._state === o && this.startLoop(b);
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
        this._state = o;
        return;
      }
      const b = this._messageLength, w = this._fragments;
      if (this._totalPayloadLength = 0, this._messageLength = 0, this._fragmented = 0, this._fragments = [], this._opcode === 2) {
        let _;
        this._binaryType === "nodebuffer" ? _ = t(w, b) : this._binaryType === "arraybuffer" ? _ = a(t(w, b)) : this._binaryType === "blob" ? _ = new Blob(w) : _ = w, this._allowSynchronousEvents ? (this.emit("message", _, !0), this._state = o) : (this._state = y, setImmediate(() => {
          this.emit("message", _, !0), this._state = o, this.startLoop(T);
        }));
      } else {
        const _ = t(w, b);
        if (!this._skipUTF8Validation && !i(_)) {
          const E = this.createError(
            Error,
            "invalid UTF-8 sequence",
            !0,
            1007,
            "WS_ERR_INVALID_UTF8"
          );
          T(E);
          return;
        }
        this._state === v || this._allowSynchronousEvents ? (this.emit("message", _, !1), this._state = o) : (this._state = y, setImmediate(() => {
          this.emit("message", _, !1), this._state = o, this.startLoop(T);
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
    controlMessage(T, b) {
      if (this._opcode === 8) {
        if (T.length === 0)
          this._loop = !1, this.emit("conclude", 1005, l), this.end();
        else {
          const w = T.readUInt16BE(0);
          if (!n(w)) {
            const E = this.createError(
              RangeError,
              `invalid status code ${w}`,
              !0,
              1002,
              "WS_ERR_INVALID_CLOSE_CODE"
            );
            b(E);
            return;
          }
          const _ = new p(
            T.buffer,
            T.byteOffset + 2,
            T.length - 2
          );
          if (!this._skipUTF8Validation && !i(_)) {
            const E = this.createError(
              Error,
              "invalid UTF-8 sequence",
              !0,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            b(E);
            return;
          }
          this._loop = !1, this.emit("conclude", w, _), this.end();
        }
        this._state = o;
        return;
      }
      this._allowSynchronousEvents ? (this.emit(this._opcode === 9 ? "ping" : "pong", T), this._state = o) : (this._state = y, setImmediate(() => {
        this.emit(this._opcode === 9 ? "ping" : "pong", T), this._state = o, this.startLoop(b);
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
    createError(T, b, w, _, E) {
      this._loop = !1, this._errored = !0;
      const N = new T(
        w ? `Invalid WebSocket frame: ${b}` : b
      );
      return Error.captureStackTrace(N, this.createError), N.code = E, N[d] = _, N;
    }
  }
  return $a = R, $a;
}
var qa, Np;
function Cf() {
  if (Np) return qa;
  Np = 1;
  const { Duplex: e } = et, { randomFillSync: c } = yt, f = vi(), { EMPTY_BUFFER: l, kWebSocket: d, NOOP: s } = Ut(), { isBlob: t, isValidStatusCode: a } = wr(), { mask: r, toBuffer: n } = gi(), i = Symbol("kByteLength"), p = Buffer.alloc(4), o = 8 * 1024;
  let h, u = o;
  const g = 0, m = 1, v = 2;
  class y {
    /**
     * Creates a Sender instance.
     *
     * @param {Duplex} socket The connection socket
     * @param {Object} [extensions] An object containing the negotiated extensions
     * @param {Function} [generateMask] The function used to generate the masking
     *     key
     */
    constructor(b, w, _) {
      this._extensions = w || {}, _ && (this._generateMask = _, this._maskBuffer = Buffer.alloc(4)), this._socket = b, this._firstFragment = !0, this._compress = !1, this._bufferedBytes = 0, this._queue = [], this._state = g, this.onerror = s, this[d] = void 0;
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
    static frame(b, w) {
      let _, E = !1, N = 2, k = !1;
      w.mask && (_ = w.maskBuffer || p, w.generateMask ? w.generateMask(_) : (u === o && (h === void 0 && (h = Buffer.alloc(o)), c(h, 0, o), u = 0), _[0] = h[u++], _[1] = h[u++], _[2] = h[u++], _[3] = h[u++]), k = (_[0] | _[1] | _[2] | _[3]) === 0, N = 6);
      let D;
      typeof b == "string" ? (!w.mask || k) && w[i] !== void 0 ? D = w[i] : (b = Buffer.from(b), D = b.length) : (D = b.length, E = w.mask && w.readOnly && !k);
      let $ = D;
      D >= 65536 ? (N += 8, $ = 127) : D > 125 && (N += 2, $ = 126);
      const C = Buffer.allocUnsafe(E ? D + N : N);
      return C[0] = w.fin ? w.opcode | 128 : w.opcode, w.rsv1 && (C[0] |= 64), C[1] = $, $ === 126 ? C.writeUInt16BE(D, 2) : $ === 127 && (C[2] = C[3] = 0, C.writeUIntBE(D, 4, 6)), w.mask ? (C[1] |= 128, C[N - 4] = _[0], C[N - 3] = _[1], C[N - 2] = _[2], C[N - 1] = _[3], k ? [C, b] : E ? (r(b, _, C, N, D), [C]) : (r(b, _, b, 0, D), [C, b])) : [C, b];
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
    close(b, w, _, E) {
      let N;
      if (b === void 0)
        N = l;
      else {
        if (typeof b != "number" || !a(b))
          throw new TypeError("First argument must be a valid error code number");
        if (w === void 0 || !w.length)
          N = Buffer.allocUnsafe(2), N.writeUInt16BE(b, 0);
        else {
          const D = Buffer.byteLength(w);
          if (D > 123)
            throw new RangeError("The message must not be greater than 123 bytes");
          N = Buffer.allocUnsafe(2 + D), N.writeUInt16BE(b, 0), typeof w == "string" ? N.write(w, 2) : N.set(w, 2);
        }
      }
      const k = {
        [i]: N.length,
        fin: !0,
        generateMask: this._generateMask,
        mask: _,
        maskBuffer: this._maskBuffer,
        opcode: 8,
        readOnly: !1,
        rsv1: !1
      };
      this._state !== g ? this.enqueue([this.dispatch, N, !1, k, E]) : this.sendFrame(y.frame(N, k), E);
    }
    /**
     * Sends a ping message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
     * @param {Function} [cb] Callback
     * @public
     */
    ping(b, w, _) {
      let E, N;
      if (typeof b == "string" ? (E = Buffer.byteLength(b), N = !1) : t(b) ? (E = b.size, N = !1) : (b = n(b), E = b.length, N = n.readOnly), E > 125)
        throw new RangeError("The data size must not be greater than 125 bytes");
      const k = {
        [i]: E,
        fin: !0,
        generateMask: this._generateMask,
        mask: w,
        maskBuffer: this._maskBuffer,
        opcode: 9,
        readOnly: N,
        rsv1: !1
      };
      t(b) ? this._state !== g ? this.enqueue([this.getBlobData, b, !1, k, _]) : this.getBlobData(b, !1, k, _) : this._state !== g ? this.enqueue([this.dispatch, b, !1, k, _]) : this.sendFrame(y.frame(b, k), _);
    }
    /**
     * Sends a pong message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
     * @param {Function} [cb] Callback
     * @public
     */
    pong(b, w, _) {
      let E, N;
      if (typeof b == "string" ? (E = Buffer.byteLength(b), N = !1) : t(b) ? (E = b.size, N = !1) : (b = n(b), E = b.length, N = n.readOnly), E > 125)
        throw new RangeError("The data size must not be greater than 125 bytes");
      const k = {
        [i]: E,
        fin: !0,
        generateMask: this._generateMask,
        mask: w,
        maskBuffer: this._maskBuffer,
        opcode: 10,
        readOnly: N,
        rsv1: !1
      };
      t(b) ? this._state !== g ? this.enqueue([this.getBlobData, b, !1, k, _]) : this.getBlobData(b, !1, k, _) : this._state !== g ? this.enqueue([this.dispatch, b, !1, k, _]) : this.sendFrame(y.frame(b, k), _);
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
    send(b, w, _) {
      const E = this._extensions[f.extensionName];
      let N = w.binary ? 2 : 1, k = w.compress, D, $;
      typeof b == "string" ? (D = Buffer.byteLength(b), $ = !1) : t(b) ? (D = b.size, $ = !1) : (b = n(b), D = b.length, $ = n.readOnly), this._firstFragment ? (this._firstFragment = !1, k && E && E.params[E._isServer ? "server_no_context_takeover" : "client_no_context_takeover"] && (k = D >= E._threshold), this._compress = k) : (k = !1, N = 0), w.fin && (this._firstFragment = !0);
      const C = {
        [i]: D,
        fin: w.fin,
        generateMask: this._generateMask,
        mask: w.mask,
        maskBuffer: this._maskBuffer,
        opcode: N,
        readOnly: $,
        rsv1: k
      };
      t(b) ? this._state !== g ? this.enqueue([this.getBlobData, b, this._compress, C, _]) : this.getBlobData(b, this._compress, C, _) : this._state !== g ? this.enqueue([this.dispatch, b, this._compress, C, _]) : this.dispatch(b, this._compress, C, _);
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
    getBlobData(b, w, _, E) {
      this._bufferedBytes += _[i], this._state = v, b.arrayBuffer().then((N) => {
        if (this._socket.destroyed) {
          const D = new Error(
            "The socket was closed while the blob was being read"
          );
          process.nextTick(R, this, D, E);
          return;
        }
        this._bufferedBytes -= _[i];
        const k = n(N);
        w ? this.dispatch(k, w, _, E) : (this._state = g, this.sendFrame(y.frame(k, _), E), this.dequeue());
      }).catch((N) => {
        process.nextTick(S, this, N, E);
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
    dispatch(b, w, _, E) {
      if (!w) {
        this.sendFrame(y.frame(b, _), E);
        return;
      }
      const N = this._extensions[f.extensionName];
      this._bufferedBytes += _[i], this._state = m, N.compress(b, _.fin, (k, D) => {
        if (this._socket.destroyed) {
          const $ = new Error(
            "The socket was closed while data was being compressed"
          );
          R(this, $, E);
          return;
        }
        this._bufferedBytes -= _[i], this._state = g, _.readOnly = !1, this.sendFrame(y.frame(D, _), E), this.dequeue();
      });
    }
    /**
     * Executes queued send operations.
     *
     * @private
     */
    dequeue() {
      for (; this._state === g && this._queue.length; ) {
        const b = this._queue.shift();
        this._bufferedBytes -= b[3][i], Reflect.apply(b[0], this, b.slice(1));
      }
    }
    /**
     * Enqueues a send operation.
     *
     * @param {Array} params Send operation parameters.
     * @private
     */
    enqueue(b) {
      this._bufferedBytes += b[3][i], this._queue.push(b);
    }
    /**
     * Sends a frame.
     *
     * @param {(Buffer | String)[]} list The frame to send
     * @param {Function} [cb] Callback
     * @private
     */
    sendFrame(b, w) {
      b.length === 2 ? (this._socket.cork(), this._socket.write(b[0]), this._socket.write(b[1], w), this._socket.uncork()) : this._socket.write(b[0], w);
    }
  }
  qa = y;
  function R(T, b, w) {
    typeof w == "function" && w(b);
    for (let _ = 0; _ < T._queue.length; _++) {
      const E = T._queue[_], N = E[E.length - 1];
      typeof N == "function" && N(b);
    }
  }
  function S(T, b, w) {
    R(T, b, w), T.onerror(b);
  }
  return qa;
}
var Ba, Dp;
function tv() {
  if (Dp) return Ba;
  Dp = 1;
  const { kForOnEventAttribute: e, kListener: c } = Ut(), f = Symbol("kCode"), l = Symbol("kData"), d = Symbol("kError"), s = Symbol("kMessage"), t = Symbol("kReason"), a = Symbol("kTarget"), r = Symbol("kType"), n = Symbol("kWasClean");
  class i {
    /**
     * Create a new `Event`.
     *
     * @param {String} type The name of the event
     * @throws {TypeError} If the `type` argument is not specified
     */
    constructor(v) {
      this[a] = null, this[r] = v;
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
      return this[r];
    }
  }
  Object.defineProperty(i.prototype, "target", { enumerable: !0 }), Object.defineProperty(i.prototype, "type", { enumerable: !0 });
  class p extends i {
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
    constructor(v, y = {}) {
      super(v), this[f] = y.code === void 0 ? 0 : y.code, this[t] = y.reason === void 0 ? "" : y.reason, this[n] = y.wasClean === void 0 ? !1 : y.wasClean;
    }
    /**
     * @type {Number}
     */
    get code() {
      return this[f];
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
      return this[n];
    }
  }
  Object.defineProperty(p.prototype, "code", { enumerable: !0 }), Object.defineProperty(p.prototype, "reason", { enumerable: !0 }), Object.defineProperty(p.prototype, "wasClean", { enumerable: !0 });
  class o extends i {
    /**
     * Create a new `ErrorEvent`.
     *
     * @param {String} type The name of the event
     * @param {Object} [options] A dictionary object that allows for setting
     *     attributes via object members of the same name
     * @param {*} [options.error=null] The error that generated this event
     * @param {String} [options.message=''] The error message
     */
    constructor(v, y = {}) {
      super(v), this[d] = y.error === void 0 ? null : y.error, this[s] = y.message === void 0 ? "" : y.message;
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
      return this[s];
    }
  }
  Object.defineProperty(o.prototype, "error", { enumerable: !0 }), Object.defineProperty(o.prototype, "message", { enumerable: !0 });
  class h extends i {
    /**
     * Create a new `MessageEvent`.
     *
     * @param {String} type The name of the event
     * @param {Object} [options] A dictionary object that allows for setting
     *     attributes via object members of the same name
     * @param {*} [options.data=null] The message content
     */
    constructor(v, y = {}) {
      super(v), this[l] = y.data === void 0 ? null : y.data;
    }
    /**
     * @type {*}
     */
    get data() {
      return this[l];
    }
  }
  Object.defineProperty(h.prototype, "data", { enumerable: !0 }), Ba = {
    CloseEvent: p,
    ErrorEvent: o,
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
      addEventListener(m, v, y = {}) {
        for (const S of this.listeners(m))
          if (!y[e] && S[c] === v && !S[e])
            return;
        let R;
        if (m === "message")
          R = function(T, b) {
            const w = new h("message", {
              data: b ? T : T.toString()
            });
            w[a] = this, g(v, this, w);
          };
        else if (m === "close")
          R = function(T, b) {
            const w = new p("close", {
              code: T,
              reason: b.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            w[a] = this, g(v, this, w);
          };
        else if (m === "error")
          R = function(T) {
            const b = new o("error", {
              error: T,
              message: T.message
            });
            b[a] = this, g(v, this, b);
          };
        else if (m === "open")
          R = function() {
            const T = new i("open");
            T[a] = this, g(v, this, T);
          };
        else
          return;
        R[e] = !!y[e], R[c] = v, y.once ? this.once(m, R) : this.on(m, R);
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(m, v) {
        for (const y of this.listeners(m))
          if (y[c] === v && !y[e]) {
            this.removeListener(m, y);
            break;
          }
      }
    },
    MessageEvent: h
  };
  function g(m, v, y) {
    typeof m == "object" && m.handleEvent ? m.handleEvent.call(m, y) : m.call(v, y);
  }
  return Ba;
}
var ja, Lp;
function Af() {
  if (Lp) return ja;
  Lp = 1;
  const { tokenChars: e } = wr();
  function c(d, s, t) {
    d[s] === void 0 ? d[s] = [t] : d[s].push(t);
  }
  function f(d) {
    const s = /* @__PURE__ */ Object.create(null);
    let t = /* @__PURE__ */ Object.create(null), a = !1, r = !1, n = !1, i, p, o = -1, h = -1, u = -1, g = 0;
    for (; g < d.length; g++)
      if (h = d.charCodeAt(g), i === void 0)
        if (u === -1 && e[h] === 1)
          o === -1 && (o = g);
        else if (g !== 0 && (h === 32 || h === 9))
          u === -1 && o !== -1 && (u = g);
        else if (h === 59 || h === 44) {
          if (o === -1)
            throw new SyntaxError(`Unexpected character at index ${g}`);
          u === -1 && (u = g);
          const v = d.slice(o, u);
          h === 44 ? (c(s, v, t), t = /* @__PURE__ */ Object.create(null)) : i = v, o = u = -1;
        } else
          throw new SyntaxError(`Unexpected character at index ${g}`);
      else if (p === void 0)
        if (u === -1 && e[h] === 1)
          o === -1 && (o = g);
        else if (h === 32 || h === 9)
          u === -1 && o !== -1 && (u = g);
        else if (h === 59 || h === 44) {
          if (o === -1)
            throw new SyntaxError(`Unexpected character at index ${g}`);
          u === -1 && (u = g), c(t, d.slice(o, u), !0), h === 44 && (c(s, i, t), t = /* @__PURE__ */ Object.create(null), i = void 0), o = u = -1;
        } else if (h === 61 && o !== -1 && u === -1)
          p = d.slice(o, g), o = u = -1;
        else
          throw new SyntaxError(`Unexpected character at index ${g}`);
      else if (r) {
        if (e[h] !== 1)
          throw new SyntaxError(`Unexpected character at index ${g}`);
        o === -1 ? o = g : a || (a = !0), r = !1;
      } else if (n)
        if (e[h] === 1)
          o === -1 && (o = g);
        else if (h === 34 && o !== -1)
          n = !1, u = g;
        else if (h === 92)
          r = !0;
        else
          throw new SyntaxError(`Unexpected character at index ${g}`);
      else if (h === 34 && d.charCodeAt(g - 1) === 61)
        n = !0;
      else if (u === -1 && e[h] === 1)
        o === -1 && (o = g);
      else if (o !== -1 && (h === 32 || h === 9))
        u === -1 && (u = g);
      else if (h === 59 || h === 44) {
        if (o === -1)
          throw new SyntaxError(`Unexpected character at index ${g}`);
        u === -1 && (u = g);
        let v = d.slice(o, u);
        a && (v = v.replace(/\\/g, ""), a = !1), c(t, p, v), h === 44 && (c(s, i, t), t = /* @__PURE__ */ Object.create(null), i = void 0), p = void 0, o = u = -1;
      } else
        throw new SyntaxError(`Unexpected character at index ${g}`);
    if (o === -1 || n || h === 32 || h === 9)
      throw new SyntaxError("Unexpected end of input");
    u === -1 && (u = g);
    const m = d.slice(o, u);
    return i === void 0 ? c(s, m, t) : (p === void 0 ? c(t, m, !0) : a ? c(t, p, m.replace(/\\/g, "")) : c(t, p, m), c(s, i, t)), s;
  }
  function l(d) {
    return Object.keys(d).map((s) => {
      let t = d[s];
      return Array.isArray(t) || (t = [t]), t.map((a) => [s].concat(
        Object.keys(a).map((r) => {
          let n = a[r];
          return Array.isArray(n) || (n = [n]), n.map((i) => i === !0 ? r : `${r}=${i}`).join("; ");
        })
      ).join("; ")).join(", ");
    }).join(", ");
  }
  return ja = { format: l, parse: f }, ja;
}
var Ma, Fp;
function Do() {
  if (Fp) return Ma;
  Fp = 1;
  const e = ht, c = nm, f = gr, l = rm, d = im, { randomBytes: s, createHash: t } = yt, { Duplex: a, Readable: r } = et, { URL: n } = rn, i = vi(), p = Rf(), o = Cf(), { isBlob: h } = wr(), {
    BINARY_TYPES: u,
    EMPTY_BUFFER: g,
    GUID: m,
    kForOnEventAttribute: v,
    kListener: y,
    kStatusCode: R,
    kWebSocket: S,
    NOOP: T
  } = Ut(), {
    EventTarget: { addEventListener: b, removeEventListener: w }
  } = tv(), { format: _, parse: E } = Af(), { toBuffer: N } = gi(), k = 30 * 1e3, D = Symbol("kAborted"), $ = [8, 13], C = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"], I = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
  class F extends e {
    /**
     * Create a new `WebSocket`.
     *
     * @param {(String|URL)} address The URL to which to connect
     * @param {(String|String[])} [protocols] The subprotocols
     * @param {Object} [options] Connection options
     */
    constructor(Y, he, Ee) {
      super(), this._binaryType = u[0], this._closeCode = 1006, this._closeFrameReceived = !1, this._closeFrameSent = !1, this._closeMessage = g, this._closeTimer = null, this._errorEmitted = !1, this._extensions = {}, this._paused = !1, this._protocol = "", this._readyState = F.CONNECTING, this._receiver = null, this._sender = null, this._socket = null, Y !== null ? (this._bufferedAmount = 0, this._isServer = !1, this._redirects = 0, he === void 0 ? he = [] : Array.isArray(he) || (typeof he == "object" && he !== null ? (Ee = he, he = []) : he = [he]), U(this, Y, he, Ee)) : (this._autoPong = Ee.autoPong, this._isServer = !0);
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
      u.includes(Y) && (this._binaryType = Y, this._receiver && (this._receiver._binaryType = Y));
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
      const ue = new p({
        allowSynchronousEvents: Ee.allowSynchronousEvents,
        binaryType: this.binaryType,
        extensions: this._extensions,
        isServer: this._isServer,
        maxPayload: Ee.maxPayload,
        skipUTF8Validation: Ee.skipUTF8Validation
      }), x = new o(Y, this._extensions, Ee.generateMask);
      this._receiver = ue, this._sender = x, this._socket = Y, ue[S] = this, x[S] = this, Y[S] = this, ue.on("conclude", ye), ue.on("drain", _e), ue.on("error", Z), ue.on("message", O), ue.on("ping", A), ue.on("pong", z), x.onerror = me, Y.setTimeout && Y.setTimeout(0), Y.setNoDelay && Y.setNoDelay(), he.length > 0 && Y.unshift(he), Y.on("close", we), Y.on("data", Ce), Y.on("end", Re), Y.on("error", Me), this._readyState = F.OPEN, this.emit("open");
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
      he === void 0 && (he = !this._isServer), this._sender.ping(Y || g, he, Ee);
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
      he === void 0 && (he = !this._isServer), this._sender.pong(Y || g, he, Ee);
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
      this._extensions[i.extensionName] || (ue.compress = !1), this._sender.send(Y || g, ue, Ee);
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
    value: C.indexOf("CONNECTING")
  }), Object.defineProperty(F.prototype, "CONNECTING", {
    enumerable: !0,
    value: C.indexOf("CONNECTING")
  }), Object.defineProperty(F, "OPEN", {
    enumerable: !0,
    value: C.indexOf("OPEN")
  }), Object.defineProperty(F.prototype, "OPEN", {
    enumerable: !0,
    value: C.indexOf("OPEN")
  }), Object.defineProperty(F, "CLOSING", {
    enumerable: !0,
    value: C.indexOf("CLOSING")
  }), Object.defineProperty(F.prototype, "CLOSING", {
    enumerable: !0,
    value: C.indexOf("CLOSING")
  }), Object.defineProperty(F, "CLOSED", {
    enumerable: !0,
    value: C.indexOf("CLOSED")
  }), Object.defineProperty(F.prototype, "CLOSED", {
    enumerable: !0,
    value: C.indexOf("CLOSED")
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
          if (Y[v]) return Y[y];
        return null;
      },
      set(Y) {
        for (const he of this.listeners(j))
          if (he[v]) {
            this.removeListener(j, he);
            break;
          }
        typeof Y == "function" && this.addEventListener(j, Y, {
          [v]: !0
        });
      }
    });
  }), F.prototype.addEventListener = b, F.prototype.removeEventListener = w, Ma = F;
  function U(j, Y, he, Ee) {
    const ue = {
      allowSynchronousEvents: !0,
      autoPong: !0,
      protocolVersion: $[1],
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
    if (j._autoPong = ue.autoPong, !$.includes(ue.protocolVersion))
      throw new RangeError(
        `Unsupported protocol version: ${ue.protocolVersion} (supported versions: ${$.join(", ")})`
      );
    let x;
    if (Y instanceof n)
      x = Y;
    else
      try {
        x = new n(Y);
      } catch {
        throw new SyntaxError(`Invalid URL: ${Y}`);
      }
    x.protocol === "http:" ? x.protocol = "ws:" : x.protocol === "https:" && (x.protocol = "wss:"), j._url = x.href;
    const H = x.protocol === "wss:", V = x.protocol === "ws+unix:";
    let se;
    if (x.protocol !== "ws:" && !H && !V ? se = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"` : V && !x.pathname ? se = "The URL's pathname is empty" : x.hash && (se = "The URL contains a fragment identifier"), se) {
      const ve = new SyntaxError(se);
      if (j._redirects === 0)
        throw ve;
      G(j, ve);
      return;
    }
    const X = H ? 443 : 80, ie = s(16).toString("base64"), te = H ? c.request : f.request, ce = /* @__PURE__ */ new Set();
    let pe;
    if (ue.createConnection = ue.createConnection || (H ? re : W), ue.defaultPort = ue.defaultPort || X, ue.port = x.port || X, ue.host = x.hostname.startsWith("[") ? x.hostname.slice(1, -1) : x.hostname, ue.headers = {
      ...ue.headers,
      "Sec-WebSocket-Version": ue.protocolVersion,
      "Sec-WebSocket-Key": ie,
      Connection: "Upgrade",
      Upgrade: "websocket"
    }, ue.path = x.pathname + x.search, ue.timeout = ue.handshakeTimeout, ue.perMessageDeflate && (pe = new i(
      ue.perMessageDeflate !== !0 ? ue.perMessageDeflate : {},
      !1,
      ue.maxPayload
    ), ue.headers["Sec-WebSocket-Extensions"] = _({
      [i.extensionName]: pe.offer()
    })), he.length) {
      for (const ve of he) {
        if (typeof ve != "string" || !I.test(ve) || ce.has(ve))
          throw new SyntaxError(
            "An invalid or duplicated subprotocol was specified"
          );
        ce.add(ve);
      }
      ue.headers["Sec-WebSocket-Protocol"] = he.join(",");
    }
    if (ue.origin && (ue.protocolVersion < 13 ? ue.headers["Sec-WebSocket-Origin"] = ue.origin : ue.headers.Origin = ue.origin), (x.username || x.password) && (ue.auth = `${x.username}:${x.password}`), V) {
      const ve = ue.path.split(":");
      ue.socketPath = ve[0], ue.path = ve[1];
    }
    let Te;
    if (ue.followRedirects) {
      if (j._redirects === 0) {
        j._originalIpc = V, j._originalSecure = H, j._originalHostOrSocketPath = V ? ue.socketPath : x.host;
        const ve = Ee && Ee.headers;
        if (Ee = { ...Ee, headers: {} }, ve)
          for (const [fe, P] of Object.entries(ve))
            Ee.headers[fe.toLowerCase()] = P;
      } else if (j.listenerCount("redirect") === 0) {
        const ve = V ? j._originalIpc ? ue.socketPath === j._originalHostOrSocketPath : !1 : j._originalIpc ? !1 : x.host === j._originalHostOrSocketPath;
        (!ve || j._originalSecure && !H) && (delete ue.headers.authorization, delete ue.headers.cookie, ve || delete ue.headers.host, ue.auth = void 0);
      }
      ue.auth && !Ee.headers.authorization && (Ee.headers.authorization = "Basic " + Buffer.from(ue.auth).toString("base64")), Te = j._req = te(ue), j._redirects && j.emit("redirect", j.url, Te);
    } else
      Te = j._req = te(ue);
    ue.timeout && Te.on("timeout", () => {
      ae(j, Te, "Opening handshake has timed out");
    }), Te.on("error", (ve) => {
      Te === null || Te[D] || (Te = j._req = null, G(j, ve));
    }), Te.on("response", (ve) => {
      const fe = ve.headers.location, P = ve.statusCode;
      if (fe && ue.followRedirects && P >= 300 && P < 400) {
        if (++j._redirects > ue.maxRedirects) {
          ae(j, Te, "Maximum redirects exceeded");
          return;
        }
        Te.abort();
        let M;
        try {
          M = new n(fe, Y);
        } catch {
          const K = new SyntaxError(`Invalid URL: ${fe}`);
          G(j, K);
          return;
        }
        U(j, M, he, Ee);
      } else j.emit("unexpected-response", Te, ve) || ae(
        j,
        Te,
        `Unexpected server response: ${ve.statusCode}`
      );
    }), Te.on("upgrade", (ve, fe, P) => {
      if (j.emit("upgrade", ve), j.readyState !== F.CONNECTING) return;
      Te = j._req = null;
      const M = ve.headers.upgrade;
      if (M === void 0 || M.toLowerCase() !== "websocket") {
        ae(j, fe, "Invalid Upgrade header");
        return;
      }
      const J = t("sha1").update(ie + m).digest("base64");
      if (ve.headers["sec-websocket-accept"] !== J) {
        ae(j, fe, "Invalid Sec-WebSocket-Accept header");
        return;
      }
      const K = ve.headers["sec-websocket-protocol"];
      let Q;
      if (K !== void 0 ? ce.size ? ce.has(K) || (Q = "Server sent an invalid subprotocol") : Q = "Server sent a subprotocol but none was requested" : ce.size && (Q = "Server sent no subprotocol"), Q) {
        ae(j, fe, Q);
        return;
      }
      K && (j._protocol = K);
      const le = ve.headers["sec-websocket-extensions"];
      if (le !== void 0) {
        if (!pe) {
          ae(j, fe, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
          return;
        }
        let ne;
        try {
          ne = E(le);
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
  function G(j, Y) {
    j._readyState = F.CLOSING, j._errorEmitted = !0, j.emit("error", Y), j.emitClose();
  }
  function W(j) {
    return j.path = j.socketPath, l.connect(j);
  }
  function re(j) {
    return j.path = void 0, !j.servername && j.servername !== "" && (j.servername = l.isIP(j.host) ? "" : j.host), d.connect(j);
  }
  function ae(j, Y, he) {
    j._readyState = F.CLOSING;
    const Ee = new Error(he);
    Error.captureStackTrace(Ee, ae), Y.setHeader ? (Y[D] = !0, Y.abort(), Y.socket && !Y.socket.destroyed && Y.socket.destroy(), process.nextTick(G, j, Ee)) : (Y.destroy(Ee), Y.once("error", j.emit.bind(j, "error")), Y.once("close", j.emitClose.bind(j)));
  }
  function oe(j, Y, he) {
    if (Y) {
      const Ee = h(Y) ? Y.size : N(Y).length;
      j._socket ? j._sender._bufferedBytes += Ee : j._bufferedAmount += Ee;
    }
    if (he) {
      const Ee = new Error(
        `WebSocket is not open: readyState ${j.readyState} (${C[j.readyState]})`
      );
      process.nextTick(he, Ee);
    }
  }
  function ye(j, Y) {
    const he = this[S];
    he._closeFrameReceived = !0, he._closeMessage = Y, he._closeCode = j, he._socket[S] !== void 0 && (he._socket.removeListener("data", Ce), process.nextTick(q, he._socket), j === 1005 ? he.close() : he.close(j, Y));
  }
  function _e() {
    const j = this[S];
    j.isPaused || j._socket.resume();
  }
  function Z(j) {
    const Y = this[S];
    Y._socket[S] !== void 0 && (Y._socket.removeListener("data", Ce), process.nextTick(q, Y._socket), Y.close(j[R])), Y._errorEmitted || (Y._errorEmitted = !0, Y.emit("error", j));
  }
  function Se() {
    this[S].emitClose();
  }
  function O(j, Y) {
    this[S].emit("message", j, Y);
  }
  function A(j) {
    const Y = this[S];
    Y._autoPong && Y.pong(j, !this._isServer, T), Y.emit("ping", j);
  }
  function z(j) {
    this[S].emit("pong", j);
  }
  function q(j) {
    j.resume();
  }
  function me(j) {
    const Y = this[S];
    Y.readyState !== F.CLOSED && (Y.readyState === F.OPEN && (Y._readyState = F.CLOSING, be(Y)), this._socket.end(), Y._errorEmitted || (Y._errorEmitted = !0, Y.emit("error", j)));
  }
  function be(j) {
    j._closeTimer = setTimeout(
      j._socket.destroy.bind(j._socket),
      k
    );
  }
  function we() {
    const j = this[S];
    this.removeListener("close", we), this.removeListener("data", Ce), this.removeListener("end", Re), j._readyState = F.CLOSING;
    let Y;
    !this._readableState.endEmitted && !j._closeFrameReceived && !j._receiver._writableState.errorEmitted && (Y = j._socket.read()) !== null && j._receiver.write(Y), j._receiver.end(), this[S] = void 0, clearTimeout(j._closeTimer), j._receiver._writableState.finished || j._receiver._writableState.errorEmitted ? j.emitClose() : (j._receiver.on("error", Se), j._receiver.on("finish", Se));
  }
  function Ce(j) {
    this[S]._receiver.write(j) || this.pause();
  }
  function Re() {
    const j = this[S];
    j._readyState = F.CLOSING, j._receiver.end(), this.end();
  }
  function Me() {
    const j = this[S];
    this.removeListener("error", Me), this.on("error", T), j && (j._readyState = F.CLOSING, this.destroy());
  }
  return Ma;
}
var Ha, Up;
function nv() {
  if (Up) return Ha;
  Up = 1, Do();
  const { Duplex: e } = et;
  function c(s) {
    s.emit("close");
  }
  function f() {
    !this.destroyed && this._writableState.finished && this.destroy();
  }
  function l(s) {
    this.removeListener("error", l), this.destroy(), this.listenerCount("error") === 0 && this.emit("error", s);
  }
  function d(s, t) {
    let a = !0;
    const r = new e({
      ...t,
      autoDestroy: !1,
      emitClose: !1,
      objectMode: !1,
      writableObjectMode: !1
    });
    return s.on("message", function(i, p) {
      const o = !p && r._readableState.objectMode ? i.toString() : i;
      r.push(o) || s.pause();
    }), s.once("error", function(i) {
      r.destroyed || (a = !1, r.destroy(i));
    }), s.once("close", function() {
      r.destroyed || r.push(null);
    }), r._destroy = function(n, i) {
      if (s.readyState === s.CLOSED) {
        i(n), process.nextTick(c, r);
        return;
      }
      let p = !1;
      s.once("error", function(h) {
        p = !0, i(h);
      }), s.once("close", function() {
        p || i(n), process.nextTick(c, r);
      }), a && s.terminate();
    }, r._final = function(n) {
      if (s.readyState === s.CONNECTING) {
        s.once("open", function() {
          r._final(n);
        });
        return;
      }
      s._socket !== null && (s._socket._writableState.finished ? (n(), r._readableState.endEmitted && r.destroy()) : (s._socket.once("finish", function() {
        n();
      }), s.close()));
    }, r._read = function() {
      s.isPaused && s.resume();
    }, r._write = function(n, i, p) {
      if (s.readyState === s.CONNECTING) {
        s.once("open", function() {
          r._write(n, i, p);
        });
        return;
      }
      s.send(n, p);
    }, r.on("end", f), r.on("error", l), r;
  }
  return Ha = d, Ha;
}
var Ga, $p;
function rv() {
  if ($p) return Ga;
  $p = 1;
  const { tokenChars: e } = wr();
  function c(f) {
    const l = /* @__PURE__ */ new Set();
    let d = -1, s = -1, t = 0;
    for (t; t < f.length; t++) {
      const r = f.charCodeAt(t);
      if (s === -1 && e[r] === 1)
        d === -1 && (d = t);
      else if (t !== 0 && (r === 32 || r === 9))
        s === -1 && d !== -1 && (s = t);
      else if (r === 44) {
        if (d === -1)
          throw new SyntaxError(`Unexpected character at index ${t}`);
        s === -1 && (s = t);
        const n = f.slice(d, s);
        if (l.has(n))
          throw new SyntaxError(`The "${n}" subprotocol is duplicated`);
        l.add(n), d = s = -1;
      } else
        throw new SyntaxError(`Unexpected character at index ${t}`);
    }
    if (d === -1 || s !== -1)
      throw new SyntaxError("Unexpected end of input");
    const a = f.slice(d, t);
    if (l.has(a))
      throw new SyntaxError(`The "${a}" subprotocol is duplicated`);
    return l.add(a), l;
  }
  return Ga = { parse: c }, Ga;
}
var za, qp;
function iv() {
  if (qp) return za;
  qp = 1;
  const e = ht, c = gr, { Duplex: f } = et, { createHash: l } = yt, d = Af(), s = vi(), t = rv(), a = Do(), { GUID: r, kWebSocket: n } = Ut(), i = /^[+/0-9A-Za-z]{22}==$/, p = 0, o = 1, h = 2;
  class u extends e {
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
    constructor(T, b) {
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
      if (T.port != null ? (this._server = c.createServer((w, _) => {
        const E = c.STATUS_CODES[426];
        _.writeHead(426, {
          "Content-Length": E.length,
          "Content-Type": "text/plain"
        }), _.end(E);
      }), this._server.listen(
        T.port,
        T.host,
        T.backlog,
        b
      )) : T.server && (this._server = T.server), this._server) {
        const w = this.emit.bind(this, "connection");
        this._removeListeners = g(this._server, {
          listening: this.emit.bind(this, "listening"),
          error: this.emit.bind(this, "error"),
          upgrade: (_, E, N) => {
            this.handleUpgrade(_, E, N, w);
          }
        });
      }
      T.perMessageDeflate === !0 && (T.perMessageDeflate = {}), T.clientTracking && (this.clients = /* @__PURE__ */ new Set(), this._shouldEmitClose = !1), this.options = T, this._state = p;
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
      if (this._state === h) {
        T && this.once("close", () => {
          T(new Error("The server is not running"));
        }), process.nextTick(m, this);
        return;
      }
      if (T && this.once("close", T), this._state !== o)
        if (this._state = o, this.options.noServer || this.options.server)
          this._server && (this._removeListeners(), this._removeListeners = this._server = null), this.clients ? this.clients.size ? this._shouldEmitClose = !0 : process.nextTick(m, this) : process.nextTick(m, this);
        else {
          const b = this._server;
          this._removeListeners(), this._removeListeners = this._server = null, b.close(() => {
            m(this);
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
        const b = T.url.indexOf("?");
        if ((b !== -1 ? T.url.slice(0, b) : T.url) !== this.options.path) return !1;
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
    handleUpgrade(T, b, w, _) {
      b.on("error", v);
      const E = T.headers["sec-websocket-key"], N = T.headers.upgrade, k = +T.headers["sec-websocket-version"];
      if (T.method !== "GET") {
        R(this, T, b, 405, "Invalid HTTP method");
        return;
      }
      if (N === void 0 || N.toLowerCase() !== "websocket") {
        R(this, T, b, 400, "Invalid Upgrade header");
        return;
      }
      if (E === void 0 || !i.test(E)) {
        R(this, T, b, 400, "Missing or invalid Sec-WebSocket-Key header");
        return;
      }
      if (k !== 13 && k !== 8) {
        R(this, T, b, 400, "Missing or invalid Sec-WebSocket-Version header", {
          "Sec-WebSocket-Version": "13, 8"
        });
        return;
      }
      if (!this.shouldHandle(T)) {
        y(b, 400);
        return;
      }
      const D = T.headers["sec-websocket-protocol"];
      let $ = /* @__PURE__ */ new Set();
      if (D !== void 0)
        try {
          $ = t.parse(D);
        } catch {
          R(this, T, b, 400, "Invalid Sec-WebSocket-Protocol header");
          return;
        }
      const C = T.headers["sec-websocket-extensions"], I = {};
      if (this.options.perMessageDeflate && C !== void 0) {
        const F = new s(
          this.options.perMessageDeflate,
          !0,
          this.options.maxPayload
        );
        try {
          const U = d.parse(C);
          U[s.extensionName] && (F.accept(U[s.extensionName]), I[s.extensionName] = F);
        } catch {
          R(this, T, b, 400, "Invalid or unacceptable Sec-WebSocket-Extensions header");
          return;
        }
      }
      if (this.options.verifyClient) {
        const F = {
          origin: T.headers[`${k === 8 ? "sec-websocket-origin" : "origin"}`],
          secure: !!(T.socket.authorized || T.socket.encrypted),
          req: T
        };
        if (this.options.verifyClient.length === 2) {
          this.options.verifyClient(F, (U, G, W, re) => {
            if (!U)
              return y(b, G || 401, W, re);
            this.completeUpgrade(
              I,
              E,
              $,
              T,
              b,
              w,
              _
            );
          });
          return;
        }
        if (!this.options.verifyClient(F)) return y(b, 401);
      }
      this.completeUpgrade(I, E, $, T, b, w, _);
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
    completeUpgrade(T, b, w, _, E, N, k) {
      if (!E.readable || !E.writable) return E.destroy();
      if (E[n])
        throw new Error(
          "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
        );
      if (this._state > p) return y(E, 503);
      const $ = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Accept: ${l("sha1").update(b + r).digest("base64")}`
      ], C = new this.options.WebSocket(null, void 0, this.options);
      if (w.size) {
        const I = this.options.handleProtocols ? this.options.handleProtocols(w, _) : w.values().next().value;
        I && ($.push(`Sec-WebSocket-Protocol: ${I}`), C._protocol = I);
      }
      if (T[s.extensionName]) {
        const I = T[s.extensionName].params, F = d.format({
          [s.extensionName]: [I]
        });
        $.push(`Sec-WebSocket-Extensions: ${F}`), C._extensions = T;
      }
      this.emit("headers", $, _), E.write($.concat(`\r
`).join(`\r
`)), E.removeListener("error", v), C.setSocket(E, N, {
        allowSynchronousEvents: this.options.allowSynchronousEvents,
        maxPayload: this.options.maxPayload,
        skipUTF8Validation: this.options.skipUTF8Validation
      }), this.clients && (this.clients.add(C), C.on("close", () => {
        this.clients.delete(C), this._shouldEmitClose && !this.clients.size && process.nextTick(m, this);
      })), k(C, _);
    }
  }
  za = u;
  function g(S, T) {
    for (const b of Object.keys(T)) S.on(b, T[b]);
    return function() {
      for (const w of Object.keys(T))
        S.removeListener(w, T[w]);
    };
  }
  function m(S) {
    S._state = h, S.emit("close");
  }
  function v() {
    this.destroy();
  }
  function y(S, T, b, w) {
    b = b || c.STATUS_CODES[T], w = {
      Connection: "close",
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(b),
      ...w
    }, S.once("finish", S.destroy), S.end(
      `HTTP/1.1 ${T} ${c.STATUS_CODES[T]}\r
` + Object.keys(w).map((_) => `${_}: ${w[_]}`).join(`\r
`) + `\r
\r
` + b
    );
  }
  function R(S, T, b, w, _, E) {
    if (S.listenerCount("wsClientError")) {
      const N = new Error(_);
      Error.captureStackTrace(N, R), S.emit("wsClientError", N, b, T);
    } else
      y(b, w, _, E);
  }
  return za;
}
var Wa, Bp;
function Of() {
  if (Bp) return Wa;
  Bp = 1;
  const e = Do();
  return e.createWebSocketStream = nv(), e.Server = iv(), e.Receiver = Rf(), e.Sender = Cf(), e.WebSocket = e, e.WebSocketServer = e.Server, Wa = e, Wa;
}
var Va = { exports: {} };
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ya, jp;
function sv() {
  if (jp) return Ya;
  jp = 1;
  var e = Object.getOwnPropertySymbols, c = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable;
  function l(s) {
    if (s == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(s);
  }
  function d() {
    try {
      if (!Object.assign)
        return !1;
      var s = new String("abc");
      if (s[5] = "de", Object.getOwnPropertyNames(s)[0] === "5")
        return !1;
      for (var t = {}, a = 0; a < 10; a++)
        t["_" + String.fromCharCode(a)] = a;
      var r = Object.getOwnPropertyNames(t).map(function(i) {
        return t[i];
      });
      if (r.join("") !== "0123456789")
        return !1;
      var n = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(i) {
        n[i] = i;
      }), Object.keys(Object.assign({}, n)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Ya = d() ? Object.assign : function(s, t) {
    for (var a, r = l(s), n, i = 1; i < arguments.length; i++) {
      a = Object(arguments[i]);
      for (var p in a)
        c.call(a, p) && (r[p] = a[p]);
      if (e) {
        n = e(a);
        for (var o = 0; o < n.length; o++)
          f.call(a, n[o]) && (r[n[o]] = a[n[o]]);
      }
    }
    return r;
  }, Ya;
}
var Jr = { exports: {} };
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
var Mp;
function av() {
  if (Mp) return Jr.exports;
  Mp = 1, Jr.exports = l, Jr.exports.append = c;
  var e = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
  function c(d, s) {
    if (typeof d != "string")
      throw new TypeError("header argument is required");
    if (!s)
      throw new TypeError("field argument is required");
    for (var t = Array.isArray(s) ? s : f(String(s)), a = 0; a < t.length; a++)
      if (!e.test(t[a]))
        throw new TypeError("field argument contains an invalid header name");
    if (d === "*")
      return d;
    var r = d, n = f(d.toLowerCase());
    if (t.indexOf("*") !== -1 || n.indexOf("*") !== -1)
      return "*";
    for (var i = 0; i < t.length; i++) {
      var p = t[i].toLowerCase();
      n.indexOf(p) === -1 && (n.push(p), r = r ? r + ", " + t[i] : t[i]);
    }
    return r;
  }
  function f(d) {
    for (var s = 0, t = [], a = 0, r = 0, n = d.length; r < n; r++)
      switch (d.charCodeAt(r)) {
        case 32:
          a === s && (a = s = r + 1);
          break;
        case 44:
          t.push(d.substring(a, s)), a = s = r + 1;
          break;
        default:
          s = r + 1;
          break;
      }
    return t.push(d.substring(a, s)), t;
  }
  function l(d, s) {
    if (!d || !d.getHeader || !d.setHeader)
      throw new TypeError("res argument is required");
    var t = d.getHeader("Vary") || "", a = Array.isArray(t) ? t.join(", ") : String(t);
    (t = c(a, s)) && d.setHeader("Vary", t);
  }
  return Jr.exports;
}
var Hp;
function kf() {
  return Hp || (Hp = 1, (function() {
    var e = sv(), c = av(), f = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: !1,
      optionsSuccessStatus: 204
    };
    function l(u) {
      return typeof u == "string" || u instanceof String;
    }
    function d(u, g) {
      if (Array.isArray(g)) {
        for (var m = 0; m < g.length; ++m)
          if (d(u, g[m]))
            return !0;
        return !1;
      } else return l(g) ? u === g : g instanceof RegExp ? g.test(u) : !!g;
    }
    function s(u, g) {
      var m = g.headers.origin, v = [], y;
      return !u.origin || u.origin === "*" ? v.push([{
        key: "Access-Control-Allow-Origin",
        value: "*"
      }]) : l(u.origin) ? (v.push([{
        key: "Access-Control-Allow-Origin",
        value: u.origin
      }]), v.push([{
        key: "Vary",
        value: "Origin"
      }])) : (y = d(m, u.origin), v.push([{
        key: "Access-Control-Allow-Origin",
        value: y ? m : !1
      }]), v.push([{
        key: "Vary",
        value: "Origin"
      }])), v;
    }
    function t(u) {
      var g = u.methods;
      return g.join && (g = u.methods.join(",")), {
        key: "Access-Control-Allow-Methods",
        value: g
      };
    }
    function a(u) {
      return u.credentials === !0 ? {
        key: "Access-Control-Allow-Credentials",
        value: "true"
      } : null;
    }
    function r(u, g) {
      var m = u.allowedHeaders || u.headers, v = [];
      return m ? m.join && (m = m.join(",")) : (m = g.headers["access-control-request-headers"], v.push([{
        key: "Vary",
        value: "Access-Control-Request-Headers"
      }])), m && m.length && v.push([{
        key: "Access-Control-Allow-Headers",
        value: m
      }]), v;
    }
    function n(u) {
      var g = u.exposedHeaders;
      if (g)
        g.join && (g = g.join(","));
      else return null;
      return g && g.length ? {
        key: "Access-Control-Expose-Headers",
        value: g
      } : null;
    }
    function i(u) {
      var g = (typeof u.maxAge == "number" || u.maxAge) && u.maxAge.toString();
      return g && g.length ? {
        key: "Access-Control-Max-Age",
        value: g
      } : null;
    }
    function p(u, g) {
      for (var m = 0, v = u.length; m < v; m++) {
        var y = u[m];
        y && (Array.isArray(y) ? p(y, g) : y.key === "Vary" && y.value ? c(g, y.value) : y.value && g.setHeader(y.key, y.value));
      }
    }
    function o(u, g, m, v) {
      var y = [], R = g.method && g.method.toUpperCase && g.method.toUpperCase();
      R === "OPTIONS" ? (y.push(s(u, g)), y.push(a(u)), y.push(t(u)), y.push(r(u, g)), y.push(i(u)), y.push(n(u)), p(y, m), u.preflightContinue ? v() : (m.statusCode = u.optionsSuccessStatus, m.setHeader("Content-Length", "0"), m.end())) : (y.push(s(u, g)), y.push(a(u)), y.push(n(u)), p(y, m), v());
    }
    function h(u) {
      var g = null;
      return typeof u == "function" ? g = u : g = function(m, v) {
        v(null, u);
      }, function(v, y, R) {
        g(v, function(S, T) {
          if (S)
            R(S);
          else {
            var b = e({}, f, T), w = null;
            b.origin && typeof b.origin == "function" ? w = b.origin : b.origin && (w = function(_, E) {
              E(null, b.origin);
            }), w ? w(v.headers.origin, function(_, E) {
              _ || !E ? R(_) : (b.origin = E, o(b, v, y, R));
            }) : R();
          }
        });
      };
    }
    Va.exports = h;
  })()), Va.exports;
}
var Gp;
function Pf() {
  if (Gp) return Yt;
  Gp = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.Server = Yt.BaseServer = void 0;
  const e = yf(), c = _f(), f = ht, l = Ef(), d = je(), s = Yg(), t = Of(), a = wf(), r = mi(), n = (0, d.default)("engine"), i = Symbol("responseHeaders");
  function p(R) {
    try {
      const S = JSON.parse(R);
      if (typeof S.sid == "string")
        return S.sid;
    } catch {
    }
  }
  class o extends f.EventEmitter {
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
      }, S.cookie)), this.opts.cors && this.use(kf()(this.opts.cors)), S.perMessageDeflate && (this.opts.perMessageDeflate = Object.assign({
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
      return this.opts.allowUpgrades ? c.default[S].upgradesTo || [] : [];
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
    verify(S, T, b) {
      const w = S._query.transport;
      if (!~this.opts.transports.indexOf(w) || w === "webtransport")
        return n('unknown transport "%s"', w), b(u.errors.UNKNOWN_TRANSPORT, { transport: w });
      if (y(S.headers.origin)) {
        const N = S.headers.origin;
        return S.headers.origin = null, n("origin header invalid"), b(u.errors.BAD_REQUEST, {
          name: "INVALID_ORIGIN",
          origin: N
        });
      }
      const E = S._query.sid;
      if (E) {
        if (!this.clients.hasOwnProperty(E))
          return n('unknown sid "%s"', E), b(u.errors.UNKNOWN_SID, {
            sid: E
          });
        const N = this.clients[E].transport.name;
        if (!T && N !== w)
          return n("bad request: unexpected transport without upgrade"), b(u.errors.BAD_REQUEST, {
            name: "TRANSPORT_MISMATCH",
            transport: w,
            previousTransport: N
          });
      } else
        return S.method !== "GET" ? b(u.errors.BAD_HANDSHAKE_METHOD, {
          method: S.method
        }) : w === "websocket" && !T ? (n("invalid transport upgrade"), b(u.errors.BAD_REQUEST, {
          name: "TRANSPORT_HANDSHAKE_ERROR"
        })) : this.opts.allowRequest ? this.opts.allowRequest(S, (N, k) => {
          if (!k)
            return b(u.errors.FORBIDDEN, {
              message: N
            });
          b();
        }) : b();
      b();
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
    _applyMiddlewares(S, T, b) {
      if (this.middlewares.length === 0)
        return n("no middleware to apply, skipping"), b();
      const w = (_) => {
        n("applying middleware n°%d", _ + 1), this.middlewares[_](S, T, (E) => {
          if (E)
            return b(E);
          _ + 1 < this.middlewares.length ? w(_ + 1) : b();
        });
      };
      w(0);
    }
    /**
     * Closes all clients.
     */
    close() {
      n("closing all open clients");
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
      return e.generateId();
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
    async handshake(S, T, b) {
      const w = T._query.EIO === "4" ? 4 : 3;
      if (w === 3 && !this.opts.allowEIO3) {
        n("unsupported protocol version"), this.emit("connection_error", {
          req: T,
          code: u.errors.UNSUPPORTED_PROTOCOL_VERSION,
          message: u.errorMessages[u.errors.UNSUPPORTED_PROTOCOL_VERSION],
          context: {
            protocol: w
          }
        }), b(u.errors.UNSUPPORTED_PROTOCOL_VERSION);
        return;
      }
      let _;
      try {
        _ = await this.generateId(T);
      } catch (k) {
        n("error while generating an id"), this.emit("connection_error", {
          req: T,
          code: u.errors.BAD_REQUEST,
          message: u.errorMessages[u.errors.BAD_REQUEST],
          context: {
            name: "ID_GENERATION_ERROR",
            error: k
          }
        }), b(u.errors.BAD_REQUEST);
        return;
      }
      n('handshaking client "%s"', _);
      try {
        var E = this.createTransport(S, T);
        S === "polling" ? (E.maxHttpBufferSize = this.opts.maxHttpBufferSize, E.httpCompression = this.opts.httpCompression) : S === "websocket" && (E.perMessageDeflate = this.opts.perMessageDeflate);
      } catch (k) {
        n('error handshaking to transport "%s"', S), this.emit("connection_error", {
          req: T,
          code: u.errors.BAD_REQUEST,
          message: u.errorMessages[u.errors.BAD_REQUEST],
          context: {
            name: "TRANSPORT_HANDSHAKE_ERROR",
            error: k
          }
        }), b(u.errors.BAD_REQUEST);
        return;
      }
      const N = new l.Socket(_, this, E, T, w);
      return E.on("headers", (k, D) => {
        !D._query.sid && (this.opts.cookie && (k["Set-Cookie"] = [
          // @ts-ignore
          (0, s.serialize)(this.opts.cookie.name, _, this.opts.cookie)
        ]), this.emit("initial_headers", k, D)), this.emit("headers", k, D);
      }), E.onRequest(T), this.clients[_] = N, this.clientsCount++, N.once("close", () => {
        delete this.clients[_], this.clientsCount--;
      }), this.emit("connection", N), E;
    }
    async onWebTransportSession(S) {
      const T = setTimeout(() => {
        n("the client failed to establish a bidirectional stream in the given period"), S.close();
      }, this.opts.upgradeTimeout), w = await S.incomingBidirectionalStreams.getReader().read();
      if (w.done) {
        n("session is closed");
        return;
      }
      const _ = w.value, E = (0, r.createPacketDecoderStream)(this.opts.maxHttpBufferSize, "nodebuffer"), N = _.readable.pipeThrough(E).getReader(), { value: k, done: D } = await N.read();
      if (D) {
        n("stream is closed");
        return;
      }
      if (clearTimeout(T), k.type !== "open")
        return n("invalid WebTransport handshake"), S.close();
      if (k.data === void 0) {
        const I = new a.WebTransport(S, _, N), F = e.generateId();
        n('handshaking client "%s" (WebTransport)', F);
        const U = new l.Socket(F, this, I, null, 4);
        this.clients[F] = U, this.clientsCount++, U.once("close", () => {
          delete this.clients[F], this.clientsCount--;
        }), this.emit("connection", U);
        return;
      }
      const $ = p(k.data);
      if (!$)
        return n("invalid WebTransport handshake"), S.close();
      const C = this.clients[$];
      if (!C)
        n("upgrade attempt for closed client"), S.close();
      else if (C.upgrading)
        n("transport has already been trying to upgrade"), S.close();
      else if (C.upgraded)
        n("transport had already been upgraded"), S.close();
      else {
        n("upgrading existing transport");
        const I = new a.WebTransport(S, _, N);
        C._maybeUpgrade(I);
      }
    }
  }
  Yt.BaseServer = o, o.errors = {
    UNKNOWN_TRANSPORT: 0,
    UNKNOWN_SID: 1,
    BAD_HANDSHAKE_METHOD: 2,
    BAD_REQUEST: 3,
    FORBIDDEN: 4,
    UNSUPPORTED_PROTOCOL_VERSION: 5
  }, o.errorMessages = {
    0: "Transport unknown",
    1: "Session ID unknown",
    2: "Bad handshake method",
    3: "Bad request",
    4: "Forbidden",
    5: "Unsupported protocol version"
  };
  class h {
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
  class u extends o {
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
        const b = T[i] || {};
        delete T[i], !T._query.sid && this.emit("initial_headers", b, T), this.emit("headers", b, T), n("writing headers: %j", b), Object.keys(b).forEach((_) => {
          S.push(`${_}: ${b[_]}`);
        });
      }));
    }
    cleanup() {
      this.ws && (n("closing webSocketServer"), this.ws.close());
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
      return new c.default[S](T);
    }
    /**
     * Handles an Engine.IO HTTP request.
     *
     * @param {EngineRequest} req
     * @param {ServerResponse} res
     */
    handleRequest(S, T) {
      n('handling "%s" http request "%s"', S.method, S.url), this.prepare(S), S.res = T;
      const b = (w, _) => {
        if (w !== void 0) {
          this.emit("connection_error", {
            req: S,
            code: w,
            message: u.errorMessages[w],
            context: _
          }), g(T, w, _);
          return;
        }
        if (S._query.sid)
          n("setting new request for existing client"), this.clients[S._query.sid].transport.onRequest(S);
        else {
          const E = (N, k) => g(T, N, k);
          this.handshake(S._query.transport, S, E);
        }
      };
      this._applyMiddlewares(S, T, (w) => {
        w ? b(u.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(S, !1, b);
      });
    }
    /**
     * Handles an Engine.IO HTTP Upgrade.
     */
    handleUpgrade(S, T, b) {
      this.prepare(S);
      const w = new h(S, T), _ = (E, N) => {
        if (E !== void 0) {
          this.emit("connection_error", {
            req: S,
            code: E,
            message: u.errorMessages[E],
            context: N
          }), m(T, E, N);
          return;
        }
        const k = Buffer.from(b);
        b = null, w.writeHead(), this.ws.handleUpgrade(S, T, k, (D) => {
          this.onWebSocket(S, T, D);
        });
      };
      this._applyMiddlewares(S, w, (E) => {
        E ? _(u.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(S, !0, _);
      });
    }
    /**
     * Called upon a ws.io connection.
     * @param req
     * @param socket
     * @param websocket
     * @private
     */
    onWebSocket(S, T, b) {
      if (b.on("error", _), c.default[S._query.transport] !== void 0 && !c.default[S._query.transport].prototype.handlesUpgrades) {
        n("transport doesnt handle upgraded requests"), b.close();
        return;
      }
      const w = S._query.sid;
      if (S.websocket = b, w) {
        const E = this.clients[w];
        if (!E)
          n("upgrade attempt for closed client"), b.close();
        else if (E.upgrading)
          n("transport has already been trying to upgrade"), b.close();
        else if (E.upgraded)
          n("transport had already been upgraded"), b.close();
        else {
          n("upgrading existing transport"), b.removeListener("error", _);
          const N = this.createTransport(S._query.transport, S);
          N.perMessageDeflate = this.opts.perMessageDeflate, E._maybeUpgrade(N);
        }
      } else {
        const E = (N, k) => m(T, N, k);
        this.handshake(S._query.transport, S, E);
      }
      function _() {
        n("websocket error before upgrade");
      }
    }
    /**
     * Captures upgrade requests for a http.Server.
     *
     * @param {http.Server} server
     * @param {Object} options
     */
    attach(S, T = {}) {
      const b = this._computePath(T), w = T.destroyUpgradeTimeout || 1e3;
      function _(N) {
        return b === N.url.slice(0, b.length);
      }
      const E = S.listeners("request").slice(0);
      S.removeAllListeners("request"), S.on("close", this.close.bind(this)), S.on("listening", this.init.bind(this)), S.on("request", (N, k) => {
        if (_(N))
          n('intercepting request for path "%s"', b), this.handleRequest(N, k);
        else {
          let D = 0;
          const $ = E.length;
          for (; D < $; D++)
            E[D].call(S, N, k);
        }
      }), ~this.opts.transports.indexOf("websocket") && S.on("upgrade", (N, k, D) => {
        _(N) ? this.handleUpgrade(N, k, D) : T.destroyUpgrade !== !1 && setTimeout(function() {
          if (k.writable && k.bytesWritten <= 0)
            return k.on("error", ($) => {
              n("error while destroying upgrade: %s", $.message);
            }), k.end();
        }, w);
      });
    }
  }
  Yt.Server = u;
  function g(R, S, T) {
    const b = S === u.errors.FORBIDDEN ? 403 : 400, w = T && T.message ? T.message : u.errorMessages[S];
    R.writeHead(b, { "Content-Type": "application/json" }), R.end(JSON.stringify({
      code: S,
      message: w
    }));
  }
  function m(R, S, T = {}) {
    if (R.on("error", () => {
      n("ignoring error from closed connection");
    }), R.writable) {
      const b = T.message || u.errorMessages[S], w = Buffer.byteLength(b);
      R.write(`HTTP/1.1 400 Bad Request\r
Connection: close\r
Content-type: text/html\r
Content-Length: ` + w + `\r
\r
` + b);
    }
    R.destroy();
  }
  const v = [
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
  function y(R) {
    if (R += "", R.length < 1)
      return !1;
    if (!v[R.charCodeAt(0)])
      return n('invalid header, index 0, char "%s"', R.charCodeAt(0)), !0;
    if (R.length < 2)
      return !1;
    if (!v[R.charCodeAt(1)])
      return n('invalid header, index 1, char "%s"', R.charCodeAt(1)), !0;
    if (R.length < 3)
      return !1;
    if (!v[R.charCodeAt(2)])
      return n('invalid header, index 2, char "%s"', R.charCodeAt(2)), !0;
    if (R.length < 4)
      return !1;
    if (!v[R.charCodeAt(3)])
      return n('invalid header, index 3, char "%s"', R.charCodeAt(3)), !0;
    for (let S = 4; S < R.length; ++S)
      if (!v[R.charCodeAt(S)])
        return n('invalid header, index "%i", char "%s"', S, R.charCodeAt(S)), !0;
    return !1;
  }
  return Yt;
}
var ir = {}, Qr = {}, sr = {}, zp;
function ov() {
  if (zp) return sr;
  zp = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.Polling = void 0;
  const e = Sn(), c = yn, f = Io(), d = (0, je().default)("engine:polling"), s = {
    gzip: c.createGzip,
    deflate: c.createDeflate
  };
  class t extends e.Transport {
    /**
     * HTTP polling constructor.
     */
    constructor(r) {
      super(r), this.closeTimeout = 30 * 1e3;
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
    onRequest(r) {
      const n = r.res;
      r.res = null, r.getMethod() === "get" ? this.onPollRequest(r, n) : r.getMethod() === "post" ? this.onDataRequest(r, n) : (n.writeStatus("500 Internal Server Error"), n.end());
    }
    /**
     * The client sends a request awaiting for us to send data.
     *
     * @private
     */
    onPollRequest(r, n) {
      if (this.req) {
        d("request overlap"), this.onError("overlap from client"), n.writeStatus("500 Internal Server Error"), n.end();
        return;
      }
      d("setting request"), this.req = r, this.res = n;
      const i = () => {
        this.writable = !1, this.onError("poll connection closed prematurely");
      }, p = () => {
        this.req = this.res = null;
      };
      r.cleanup = p, n.onAborted(i), this.writable = !0, this.emit("ready"), this.writable && this.shouldClose && (d("triggering empty send to append close packet"), this.send([{ type: "noop" }]));
    }
    /**
     * The client sends a request with data.
     *
     * @private
     */
    onDataRequest(r, n) {
      if (this.dataReq) {
        this.onError("data request overlap from client"), n.writeStatus("500 Internal Server Error"), n.end();
        return;
      }
      const i = Number(r.headers["content-length"]);
      if (!i) {
        this.onError("content-length header required"), n.writeStatus("411 Length Required").end();
        return;
      }
      if (i > this.maxHttpBufferSize) {
        this.onError("payload too large"), n.writeStatus("413 Payload Too Large").end();
        return;
      }
      if (r.headers["content-type"] === "application/octet-stream" && this.protocol === 4)
        return this.onError("invalid content");
      this.dataReq = r, this.dataRes = n;
      let o, h = 0;
      const u = {
        // text/html is required instead of text/plain to avoid an
        // unwanted download dialog on certain user-agents (GH-43)
        "Content-Type": "text/html"
      };
      this.headers(r, u);
      for (let m in u)
        n.writeHeader(m, String(u[m]));
      const g = (m) => {
        this.onData(m.toString()), this.onDataRequestCleanup(), n.cork(() => {
          n.end("ok");
        });
      };
      n.onAborted(() => {
        this.onDataRequestCleanup(), this.onError("data request connection closed prematurely");
      }), n.onData((m, v) => {
        const y = h + m.byteLength;
        if (y > i) {
          this.onError("content-length mismatch"), n.close();
          return;
        }
        if (!o) {
          if (v) {
            g(Buffer.from(m));
            return;
          }
          o = Buffer.allocUnsafe(i);
        }
        if (Buffer.from(m).copy(o, h), v) {
          if (y != i) {
            this.onError("content-length mismatch"), n.writeStatus("400 Content-Length Mismatch").end(), this.onDataRequestCleanup();
            return;
          }
          g(o);
          return;
        }
        h = y;
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
    onData(r) {
      d('received "%s"', r);
      const n = (i) => {
        if (i.type === "close")
          return d("got xhr close packet"), this.onClose(), !1;
        this.onPacket(i);
      };
      this.protocol === 3 ? this.parser.decodePayload(r, n) : this.parser.decodePayload(r).forEach(n);
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
    send(r) {
      this.writable = !1, this.shouldClose && (d("appending close packet to payload"), r.push({ type: "close" }), this.shouldClose(), this.shouldClose = null);
      const n = (i) => {
        const p = r.some((o) => o.options && o.options.compress);
        this.write(i, { compress: p });
      };
      this.protocol === 3 ? this.parser.encodePayload(r, this.supportsBinary, n) : this.parser.encodePayload(r, n);
    }
    /**
     * Writes data as response to poll request.
     *
     * @param {String} data
     * @param {Object} options
     * @private
     */
    write(r, n) {
      d('writing "%s"', r), this.doWrite(r, n, () => {
        this.req.cleanup(), this.emit("drain");
      });
    }
    /**
     * Performs the write.
     *
     * @private
     */
    doWrite(r, n, i) {
      const p = typeof r == "string", h = {
        "Content-Type": p ? "text/plain; charset=UTF-8" : "application/octet-stream"
      }, u = (v) => {
        this.headers(this.req, h), this.res.cork(() => {
          Object.keys(h).forEach((y) => {
            this.res.writeHeader(y, String(h[y]));
          }), this.res.end(v);
        }), i();
      };
      if (!this.httpCompression || !n.compress) {
        u(r);
        return;
      }
      if ((p ? Buffer.byteLength(r) : r.length) < this.httpCompression.threshold) {
        u(r);
        return;
      }
      const m = f(this.req).encodings(["gzip", "deflate"]);
      if (!m) {
        u(r);
        return;
      }
      this.compress(r, m, (v, y) => {
        if (v) {
          this.res.writeStatus("500 Internal Server Error"), this.res.end(), i(v);
          return;
        }
        h["Content-Encoding"] = m, u(y);
      });
    }
    /**
     * Compresses data.
     *
     * @private
     */
    compress(r, n, i) {
      d("compressing");
      const p = [];
      let o = 0;
      s[n](this.httpCompression).on("error", i).on("data", function(h) {
        p.push(h), o += h.length;
      }).on("end", function() {
        i(null, Buffer.concat(p, o));
      }).end(r);
    }
    /**
     * Closes the transport.
     *
     * @private
     */
    doClose(r) {
      d("closing");
      let n;
      const i = () => {
        clearTimeout(n), r(), this.onClose();
      };
      this.writable ? (d("transport writable - closing right away"), this.send([{ type: "close" }]), i()) : this.discarded ? (d("transport discarded - closing right away"), i()) : (d("transport not writable - buffering orderly close"), this.shouldClose = i, n = setTimeout(i, this.closeTimeout));
    }
    /**
     * Returns headers for a response.
     *
     * @param req - request
     * @param {Object} extra headers
     * @private
     */
    headers(r, n) {
      n = n || {};
      const i = r.headers["user-agent"];
      return i && (~i.indexOf(";MSIE") || ~i.indexOf("Trident/")) && (n["X-XSS-Protection"] = "0"), n["cache-control"] = "no-store", this.emit("headers", n, r), n;
    }
  }
  return sr.Polling = t, sr;
}
var ar = {}, Wp;
function cv() {
  if (Wp) return ar;
  Wp = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.WebSocket = void 0;
  const e = Sn(), f = (0, je().default)("engine:ws");
  class l extends e.Transport {
    /**
     * WebSocket transport
     *
     * @param req
     */
    constructor(s) {
      super(s), this.writable = !1, this.perMessageDeflate = null;
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
    send(s) {
      this.writable = !1;
      for (let t = 0; t < s.length; t++) {
        const a = s[t], r = t + 1 === s.length, n = (i) => {
          const p = typeof i != "string", o = this.perMessageDeflate && Buffer.byteLength(i) > this.perMessageDeflate.threshold;
          f('writing "%s"', i), this.socket.send(i, p, o), r && (this.emit("drain"), this.writable = !0, this.emit("ready"));
        };
        a.options && typeof a.options.wsPreEncoded == "string" ? n(a.options.wsPreEncoded) : this.parser.encodePacket(a, this.supportsBinary, n);
      }
    }
    /**
     * Closes the transport.
     *
     * @private
     */
    doClose(s) {
      f("closing"), s && s(), this.socket.end();
    }
  }
  return ar.WebSocket = l, ar;
}
var Vp;
function lv() {
  if (Vp) return Qr;
  Vp = 1, Object.defineProperty(Qr, "__esModule", { value: !0 });
  const e = ov(), c = cv();
  return Qr.default = {
    polling: e.Polling,
    websocket: c.WebSocket
  }, Qr;
}
var Yp;
function uv() {
  if (Yp) return ir;
  Yp = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.uServer = void 0;
  const e = je(), c = Pf(), f = lv(), l = (0, e.default)("engine:uws");
  class d extends c.BaseServer {
    init() {
    }
    cleanup() {
    }
    /**
     * Prepares a request by processing the query string.
     *
     * @private
     */
    prepare(a, r) {
      a.method = a.getMethod().toUpperCase(), a.url = a.getUrl();
      const n = new URLSearchParams(a.getQuery());
      a._query = Object.fromEntries(n.entries()), a.headers = {}, a.forEach((i, p) => {
        a.headers[i] = p;
      }), a.connection = {
        remoteAddress: Buffer.from(r.getRemoteAddressAsText()).toString()
      }, r.onAborted(() => {
        l("response has been aborted");
      });
    }
    createTransport(a, r) {
      return new f.default[a](r);
    }
    /**
     * Attach the engine to a µWebSockets.js server
     * @param app
     * @param options
     */
    attach(a, r = {}) {
      const n = this._computePath(r);
      a.any(n, this.handleRequest.bind(this)).ws(n, {
        compression: r.compression,
        idleTimeout: r.idleTimeout,
        maxBackpressure: r.maxBackpressure,
        maxPayloadLength: this.opts.maxHttpBufferSize,
        upgrade: this.handleUpgrade.bind(this),
        open: (i) => {
          const p = i.getUserData().transport;
          p.socket = i, p.writable = !0, p.emit("ready");
        },
        message: (i, p, o) => {
          i.getUserData().transport.onData(o ? p : Buffer.from(p).toString());
        },
        close: (i, p, o) => {
          i.getUserData().transport.onClose(p, o);
        }
      });
    }
    _applyMiddlewares(a, r, n) {
      if (this.middlewares.length === 0)
        return n();
      a.res = new s(r), super._applyMiddlewares(a, a.res, (i) => {
        a.res.writeHead(), n(i);
      });
    }
    handleRequest(a, r) {
      l('handling "%s" http request "%s"', r.getMethod(), r.getUrl()), this.prepare(r, a), r.res = a;
      const n = (i, p) => {
        if (i !== void 0) {
          this.emit("connection_error", {
            req: r,
            code: i,
            message: c.Server.errorMessages[i],
            context: p
          }), this.abortRequest(r.res, i, p);
          return;
        }
        if (r._query.sid)
          l("setting new request for existing client"), this.clients[r._query.sid].transport.onRequest(r);
        else {
          const o = (h, u) => this.abortRequest(a, h, u);
          this.handshake(r._query.transport, r, o);
        }
      };
      this._applyMiddlewares(r, a, (i) => {
        i ? n(c.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(r, !1, n);
      });
    }
    handleUpgrade(a, r, n) {
      l("on upgrade"), this.prepare(r, a), r.res = a;
      const i = async (p, o) => {
        if (p !== void 0) {
          this.emit("connection_error", {
            req: r,
            code: p,
            message: c.Server.errorMessages[p],
            context: o
          }), this.abortRequest(a, p, o);
          return;
        }
        const h = r._query.sid;
        let u;
        if (h) {
          const g = this.clients[h];
          if (g) {
            if (g.upgrading)
              return l("transport has already been trying to upgrade"), a.close();
            if (g.upgraded)
              return l("transport had already been upgraded"), a.close();
            l("upgrading existing transport"), u = this.createTransport(r._query.transport, r), g._maybeUpgrade(u);
          } else return l("upgrade attempt for closed client"), a.close();
        } else if (u = await this.handshake(r._query.transport, r, (g, m) => this.abortRequest(a, g, m)), !u)
          return;
        r.res.writeStatus("101 Switching Protocols"), a.upgrade({
          transport: u
        }, r.getHeader("sec-websocket-key"), r.getHeader("sec-websocket-protocol"), r.getHeader("sec-websocket-extensions"), n);
      };
      this._applyMiddlewares(r, a, (p) => {
        p ? i(c.Server.errors.BAD_REQUEST, { name: "MIDDLEWARE_FAILURE" }) : this.verify(r, !0, i);
      });
    }
    abortRequest(a, r, n) {
      const i = r === c.Server.errors.FORBIDDEN ? "403 Forbidden" : "400 Bad Request", p = n && n.message ? n.message : c.Server.errorMessages[r];
      a.writeStatus(i), a.writeHeader("Content-Type", "application/json"), a.end(JSON.stringify({
        code: r,
        message: p
      }));
    }
  }
  ir.uServer = d;
  class s {
    constructor(a) {
      this.res = a, this.statusWritten = !1, this.headers = [], this.isAborted = !1;
    }
    set statusCode(a) {
      a && this.writeStatus(a === 200 ? "200 OK" : "204 No Content");
    }
    writeHead(a) {
      this.statusCode = a;
    }
    setHeader(a, r) {
      Array.isArray(r) ? r.forEach((n) => {
        this.writeHeader(a, n);
      }) : this.writeHeader(a, r);
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
    writeHeader(a, r) {
      this.isAborted || a !== "Content-Length" && (this.statusWritten ? this.res.writeHeader(a, r) : this.headers.push([a, r]));
    }
    writeBufferedHeaders() {
      this.headers.forEach(([a, r]) => {
        this.res.writeHeader(a, r);
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
  return ir;
}
var Kp;
function pv() {
  return Kp || (Kp = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.protocol = e.Transport = e.Socket = e.uServer = e.parser = e.transports = e.Server = void 0, e.listen = r, e.attach = n;
    const c = gr, f = Pf();
    Object.defineProperty(e, "Server", { enumerable: !0, get: function() {
      return f.Server;
    } });
    const l = _f();
    e.transports = l.default;
    const d = mi();
    e.parser = d;
    var s = uv();
    Object.defineProperty(e, "uServer", { enumerable: !0, get: function() {
      return s.uServer;
    } });
    var t = Ef();
    Object.defineProperty(e, "Socket", { enumerable: !0, get: function() {
      return t.Socket;
    } });
    var a = Sn();
    Object.defineProperty(e, "Transport", { enumerable: !0, get: function() {
      return a.Transport;
    } }), e.protocol = d.protocol;
    function r(i, p, o) {
      typeof p == "function" && (o = p, p = {});
      const h = (0, c.createServer)(function(g, m) {
        m.writeHead(501), m.end("Not Implemented");
      }), u = n(h, p);
      return u.httpServer = h, h.listen(i, o), u;
    }
    function n(i, p) {
      const o = new f.Server(p);
      return o.attach(i, p), o;
    }
  })(Ra)), Ra;
}
var Kt = {}, ct = {};
function Ke(e) {
  if (e) return dv(e);
}
function dv(e) {
  for (var c in Ke.prototype)
    e[c] = Ke.prototype[c];
  return e;
}
Ke.prototype.on = Ke.prototype.addEventListener = function(e, c) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(c), this;
};
Ke.prototype.once = function(e, c) {
  function f() {
    this.off(e, f), c.apply(this, arguments);
  }
  return f.fn = c, this.on(e, f), this;
};
Ke.prototype.off = Ke.prototype.removeListener = Ke.prototype.removeAllListeners = Ke.prototype.removeEventListener = function(e, c) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var f = this._callbacks["$" + e];
  if (!f) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + e], this;
  for (var l, d = 0; d < f.length; d++)
    if (l = f[d], l === c || l.fn === c) {
      f.splice(d, 1);
      break;
    }
  return f.length === 0 && delete this._callbacks["$" + e], this;
};
Ke.prototype.emit = function(e) {
  this._callbacks = this._callbacks || {};
  for (var c = new Array(arguments.length - 1), f = this._callbacks["$" + e], l = 1; l < arguments.length; l++)
    c[l - 1] = arguments[l];
  if (f) {
    f = f.slice(0);
    for (var l = 0, d = f.length; l < d; ++l)
      f[l].apply(this, c);
  }
  return this;
};
Ke.prototype.emitReserved = Ke.prototype.emit;
Ke.prototype.listeners = function(e) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
};
Ke.prototype.hasListeners = function(e) {
  return !!this.listeners(e).length;
};
const fv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Emitter: Ke
}, Symbol.toStringTag, { value: "Module" })), hv = /* @__PURE__ */ om(fv);
var or = {}, cr = {}, Xp;
function If() {
  if (Xp) return cr;
  Xp = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.isBinary = s, cr.hasBinary = t;
  const e = typeof ArrayBuffer == "function", c = (a) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(a) : a.buffer instanceof ArrayBuffer, f = Object.prototype.toString, l = typeof Blob == "function" || typeof Blob < "u" && f.call(Blob) === "[object BlobConstructor]", d = typeof File == "function" || typeof File < "u" && f.call(File) === "[object FileConstructor]";
  function s(a) {
    return e && (a instanceof ArrayBuffer || c(a)) || l && a instanceof Blob || d && a instanceof File;
  }
  function t(a, r) {
    if (!a || typeof a != "object")
      return !1;
    if (Array.isArray(a)) {
      for (let n = 0, i = a.length; n < i; n++)
        if (t(a[n]))
          return !0;
      return !1;
    }
    if (s(a))
      return !0;
    if (a.toJSON && typeof a.toJSON == "function" && arguments.length === 1)
      return t(a.toJSON(), !0);
    for (const n in a)
      if (Object.prototype.hasOwnProperty.call(a, n) && t(a[n]))
        return !0;
    return !1;
  }
  return cr;
}
var Jp;
function mv() {
  if (Jp) return or;
  Jp = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.deconstructPacket = c, or.reconstructPacket = l;
  const e = If();
  function c(s) {
    const t = [], a = s.data, r = s;
    return r.data = f(a, t), r.attachments = t.length, { packet: r, buffers: t };
  }
  function f(s, t) {
    if (!s)
      return s;
    if ((0, e.isBinary)(s)) {
      const a = { _placeholder: !0, num: t.length };
      return t.push(s), a;
    } else if (Array.isArray(s)) {
      const a = new Array(s.length);
      for (let r = 0; r < s.length; r++)
        a[r] = f(s[r], t);
      return a;
    } else if (typeof s == "object" && !(s instanceof Date)) {
      const a = {};
      for (const r in s)
        Object.prototype.hasOwnProperty.call(s, r) && (a[r] = f(s[r], t));
      return a;
    }
    return s;
  }
  function l(s, t) {
    return s.data = d(s.data, t), delete s.attachments, s;
  }
  function d(s, t) {
    if (!s)
      return s;
    if (s && s._placeholder === !0) {
      if (typeof s.num == "number" && s.num >= 0 && s.num < t.length)
        return t[s.num];
      throw new Error("illegal attachments");
    } else if (Array.isArray(s))
      for (let a = 0; a < s.length; a++)
        s[a] = d(s[a], t);
    else if (typeof s == "object")
      for (const a in s)
        Object.prototype.hasOwnProperty.call(s, a) && (s[a] = d(s[a], t));
    return s;
  }
  return or;
}
var Qp;
function xi() {
  if (Qp) return ct;
  Qp = 1, Object.defineProperty(ct, "__esModule", { value: !0 }), ct.Decoder = ct.Encoder = ct.PacketType = ct.protocol = void 0, ct.isPacketValid = g;
  const e = hv, c = mv(), f = If(), d = (0, je().default)("socket.io-parser"), s = [
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
  ct.protocol = 5;
  var t;
  (function(m) {
    m[m.CONNECT = 0] = "CONNECT", m[m.DISCONNECT = 1] = "DISCONNECT", m[m.EVENT = 2] = "EVENT", m[m.ACK = 3] = "ACK", m[m.CONNECT_ERROR = 4] = "CONNECT_ERROR", m[m.BINARY_EVENT = 5] = "BINARY_EVENT", m[m.BINARY_ACK = 6] = "BINARY_ACK";
  })(t || (ct.PacketType = t = {}));
  class a {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(v) {
      this.replacer = v;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(v) {
      return d("encoding packet %j", v), (v.type === t.EVENT || v.type === t.ACK) && (0, f.hasBinary)(v) ? this.encodeAsBinary({
        type: v.type === t.EVENT ? t.BINARY_EVENT : t.BINARY_ACK,
        nsp: v.nsp,
        data: v.data,
        id: v.id
      }) : [this.encodeAsString(v)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(v) {
      let y = "" + v.type;
      return (v.type === t.BINARY_EVENT || v.type === t.BINARY_ACK) && (y += v.attachments + "-"), v.nsp && v.nsp !== "/" && (y += v.nsp + ","), v.id != null && (y += v.id), v.data != null && (y += JSON.stringify(v.data, this.replacer)), d("encoded %j as %s", v, y), y;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(v) {
      const y = (0, c.deconstructPacket)(v), R = this.encodeAsString(y.packet), S = y.buffers;
      return S.unshift(R), S;
    }
  }
  ct.Encoder = a;
  class r extends e.Emitter {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(v) {
      super(), this.reviver = v;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(v) {
      let y;
      if (typeof v == "string") {
        if (this.reconstructor)
          throw new Error("got plaintext data when reconstructing a packet");
        y = this.decodeString(v);
        const R = y.type === t.BINARY_EVENT;
        R || y.type === t.BINARY_ACK ? (y.type = R ? t.EVENT : t.ACK, this.reconstructor = new n(y), y.attachments === 0 && super.emitReserved("decoded", y)) : super.emitReserved("decoded", y);
      } else if ((0, f.isBinary)(v) || v.base64)
        if (this.reconstructor)
          y = this.reconstructor.takeBinaryData(v), y && (this.reconstructor = null, super.emitReserved("decoded", y));
        else
          throw new Error("got binary data when not reconstructing a packet");
      else
        throw new Error("Unknown type: " + v);
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(v) {
      let y = 0;
      const R = {
        type: Number(v.charAt(0))
      };
      if (t[R.type] === void 0)
        throw new Error("unknown packet type " + R.type);
      if (R.type === t.BINARY_EVENT || R.type === t.BINARY_ACK) {
        const T = y + 1;
        for (; v.charAt(++y) !== "-" && y != v.length; )
          ;
        const b = v.substring(T, y);
        if (b != Number(b) || v.charAt(y) !== "-")
          throw new Error("Illegal attachments");
        R.attachments = Number(b);
      }
      if (v.charAt(y + 1) === "/") {
        const T = y + 1;
        for (; ++y && !(v.charAt(y) === "," || y === v.length); )
          ;
        R.nsp = v.substring(T, y);
      } else
        R.nsp = "/";
      const S = v.charAt(y + 1);
      if (S !== "" && Number(S) == S) {
        const T = y + 1;
        for (; ++y; ) {
          const b = v.charAt(y);
          if (b == null || Number(b) != b) {
            --y;
            break;
          }
          if (y === v.length)
            break;
        }
        R.id = Number(v.substring(T, y + 1));
      }
      if (v.charAt(++y)) {
        const T = this.tryParse(v.substr(y));
        if (r.isPayloadValid(R.type, T))
          R.data = T;
        else
          throw new Error("invalid payload");
      }
      return d("decoded %s as %j", v, R), R;
    }
    tryParse(v) {
      try {
        return JSON.parse(v, this.reviver);
      } catch {
        return !1;
      }
    }
    static isPayloadValid(v, y) {
      switch (v) {
        case t.CONNECT:
          return h(y);
        case t.DISCONNECT:
          return y === void 0;
        case t.CONNECT_ERROR:
          return typeof y == "string" || h(y);
        case t.EVENT:
        case t.BINARY_EVENT:
          return Array.isArray(y) && (typeof y[0] == "number" || typeof y[0] == "string" && s.indexOf(y[0]) === -1);
        case t.ACK:
        case t.BINARY_ACK:
          return Array.isArray(y);
      }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
      this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
    }
  }
  ct.Decoder = r;
  class n {
    constructor(v) {
      this.packet = v, this.buffers = [], this.reconPack = v;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(v) {
      if (this.buffers.push(v), this.buffers.length === this.reconPack.attachments) {
        const y = (0, c.reconstructPacket)(this.reconPack, this.buffers);
        return this.finishedReconstruction(), y;
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
  function i(m) {
    return typeof m == "string";
  }
  const p = Number.isInteger || function(m) {
    return typeof m == "number" && isFinite(m) && Math.floor(m) === m;
  };
  function o(m) {
    return m === void 0 || p(m);
  }
  function h(m) {
    return Object.prototype.toString.call(m) === "[object Object]";
  }
  function u(m, v) {
    switch (m) {
      case t.CONNECT:
        return v === void 0 || h(v);
      case t.DISCONNECT:
        return v === void 0;
      case t.EVENT:
        return Array.isArray(v) && (typeof v[0] == "number" || typeof v[0] == "string" && s.indexOf(v[0]) === -1);
      case t.ACK:
        return Array.isArray(v);
      case t.CONNECT_ERROR:
        return typeof v == "string" || h(v);
      default:
        return !1;
    }
  }
  function g(m) {
    return i(m.nsp) && o(m.id) && u(m.type, m.data);
  }
  return ct;
}
var Zp;
function gv() {
  if (Zp) return Kt;
  Zp = 1;
  var e = Kt && Kt.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.Client = void 0;
  const c = xi(), l = (0, e(je()).default)("socket.io:client");
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
        this.nsps.size === 0 ? (l("no namespace joined yet, close the client"), this.close()) : l("the client has already joined a namespace, nothing to do");
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
        return l("connecting to namespace %s", t), this.doConnect(t, a);
      this.server._checkNamespace(t, a, (r) => {
        r ? this.doConnect(t, a) : (l("creation of namespace %s was denied", t), this._packet({
          type: c.PacketType.CONNECT_ERROR,
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
      const r = this.server.of(t);
      r._add(this, a, (n) => {
        this.sockets.set(n.id, n), this.nsps.set(r.name, n), this.connectTimeout && (clearTimeout(this.connectTimeout), this.connectTimeout = void 0);
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
        l("ignoring remove for %s", t.id);
    }
    /**
     * Closes the underlying connection.
     *
     * @private
     */
    close() {
      this.conn.readyState === "open" && (l("forcing transport close"), this.conn.close(), this.onclose("forced server close"));
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
        l("ignoring packet write %j", t);
        return;
      }
      const r = a.preEncoded ? t : this.encoder.encode(t);
      this.writeToEngine(r, a);
    }
    writeToEngine(t, a) {
      if (a.volatile && !this.conn.transport.writable) {
        l("volatile packet is discarded since the transport is not currently writable");
        return;
      }
      const r = Array.isArray(t) ? t : [t];
      for (const n of r)
        this.conn.write(n, a);
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
        l("invalid packet format"), this.onerror(a);
      }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(t) {
      const { namespace: a, authPayload: r } = this._parseNamespace(t), n = this.nsps.get(a);
      !n && t.type === c.PacketType.CONNECT ? this.connect(a, r) : n && t.type !== c.PacketType.CONNECT && t.type !== c.PacketType.CONNECT_ERROR ? process.nextTick(function() {
        n._onpacket(t);
      }) : (l("invalid state (packet type: %s)", t.type), this.close());
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
      l("client close with reason %s", t), this.destroy();
      for (const r of this.sockets.values())
        r._onclose(t, a);
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
  return Kt.Client = d, Kt;
}
var lr = {}, Xt = {}, ur = {}, ed;
function Lo() {
  if (ed) return ur;
  ed = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.StrictEventEmitter = void 0;
  const e = ht;
  class c extends e.EventEmitter {
    /**
     * Adds the `listener` function as an event listener for `ev`.
     *
     * @param ev Name of the event
     * @param listener Callback function
     */
    on(l, d) {
      return super.on(l, d);
    }
    /**
     * Adds a one-time `listener` function as an event listener for `ev`.
     *
     * @param ev Name of the event
     * @param listener Callback function
     */
    once(l, d) {
      return super.once(l, d);
    }
    /**
     * Emits an event.
     *
     * @param ev Name of the event
     * @param args Values to send to listeners of this event
     */
    emit(l, ...d) {
      return super.emit(l, ...d);
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
    emitReserved(l, ...d) {
      return super.emit(l, ...d);
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
    emitUntyped(l, ...d) {
      return super.emit(l, ...d);
    }
    /**
     * Returns the listeners listening to an event.
     *
     * @param event Event name
     * @returns Array of listeners subscribed to `event`
     */
    listeners(l) {
      return super.listeners(l);
    }
  }
  return ur.StrictEventEmitter = c, ur;
}
var Jt = {}, pr = {}, td;
function Nf() {
  return td || (td = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.RESERVED_EVENTS = void 0, pr.RESERVED_EVENTS = /* @__PURE__ */ new Set([
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
  ])), pr;
}
var nd;
function Df() {
  if (nd) return Jt;
  nd = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.RemoteSocket = Jt.BroadcastOperator = void 0;
  const e = Nf(), c = xi();
  class f {
    constructor(s, t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), r = {}) {
      this.adapter = s, this.rooms = t, this.exceptRooms = a, this.flags = r;
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
    to(s) {
      const t = new Set(this.rooms);
      return Array.isArray(s) ? s.forEach((a) => t.add(a)) : t.add(s), new f(this.adapter, t, this.exceptRooms, this.flags);
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
    in(s) {
      return this.to(s);
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
    except(s) {
      const t = new Set(this.exceptRooms);
      return Array.isArray(s) ? s.forEach((a) => t.add(a)) : t.add(s), new f(this.adapter, this.rooms, t, this.flags);
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
    compress(s) {
      const t = Object.assign({}, this.flags, { compress: s });
      return new f(this.adapter, this.rooms, this.exceptRooms, t);
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
      const s = Object.assign({}, this.flags, { volatile: !0 });
      return new f(this.adapter, this.rooms, this.exceptRooms, s);
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
      const s = Object.assign({}, this.flags, { local: !0 });
      return new f(this.adapter, this.rooms, this.exceptRooms, s);
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
    timeout(s) {
      const t = Object.assign({}, this.flags, { timeout: s });
      return new f(this.adapter, this.rooms, this.exceptRooms, t);
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
    emit(s, ...t) {
      if (e.RESERVED_EVENTS.has(s))
        throw new Error(`"${String(s)}" is a reserved event name`);
      const a = [s, ...t], r = {
        type: c.PacketType.EVENT,
        data: a
      };
      if (!(typeof a[a.length - 1] == "function"))
        return this.adapter.broadcast(r, {
          rooms: this.rooms,
          except: this.exceptRooms,
          flags: this.flags
        }), !0;
      const i = a.pop();
      let p = !1, o = [];
      const h = setTimeout(() => {
        p = !0, i.apply(this, [
          new Error("operation has timed out"),
          this.flags.expectSingleResponse ? null : o
        ]);
      }, this.flags.timeout);
      let u = -1, g = 0, m = 0;
      const v = () => {
        !p && u === g && o.length === m && (clearTimeout(h), i.apply(this, [
          null,
          this.flags.expectSingleResponse ? o[0] : o
        ]));
      };
      return this.adapter.broadcastWithAck(r, {
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, (y) => {
        m += y, g++, v();
      }, (y) => {
        o.push(y), v();
      }), this.adapter.serverCount().then((y) => {
        u = y, v();
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
    emitWithAck(s, ...t) {
      return new Promise((a, r) => {
        t.push((n, i) => n ? (n.responses = i, r(n)) : a(i)), this.emit(s, ...t);
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
      }).then((s) => s.map((t) => t.server ? t : new l(this.adapter, t)));
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
    socketsJoin(s) {
      this.adapter.addSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, Array.isArray(s) ? s : [s]);
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
    socketsLeave(s) {
      this.adapter.delSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, Array.isArray(s) ? s : [s]);
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
    disconnectSockets(s = !1) {
      this.adapter.disconnectSockets({
        rooms: this.rooms,
        except: this.exceptRooms,
        flags: this.flags
      }, s);
    }
  }
  Jt.BroadcastOperator = f;
  class l {
    constructor(s, t) {
      this.id = t.id, this.handshake = t.handshake, this.rooms = new Set(t.rooms), this.data = t.data, this.operator = new f(s, /* @__PURE__ */ new Set([this.id]), /* @__PURE__ */ new Set(), {
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
    timeout(s) {
      return this.operator.timeout(s);
    }
    emit(s, ...t) {
      return this.operator.emit(s, ...t);
    }
    /**
     * Joins a room.
     *
     * @param {String|Array} room - room or array of rooms
     */
    join(s) {
      return this.operator.socketsJoin(s);
    }
    /**
     * Leaves a room.
     *
     * @param {String} room
     */
    leave(s) {
      return this.operator.socketsLeave(s);
    }
    /**
     * Disconnects this client.
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return {Socket} self
     */
    disconnect(s = !1) {
      return this.operator.disconnectSockets(s), this;
    }
  }
  return Jt.RemoteSocket = l, Jt;
}
var rd;
function Lf() {
  if (rd) return Xt;
  rd = 1;
  var e = Xt && Xt.__importDefault || function(p) {
    return p && p.__esModule ? p : { default: p };
  };
  Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.Socket = void 0;
  const c = xi(), f = e(je()), l = Lo(), d = e(yf()), s = Df(), t = Nf(), a = (0, f.default)("socket.io:socket"), r = /* @__PURE__ */ new Set([
    "transport error",
    "transport close",
    "forced close",
    "ping timeout",
    "server shutting down",
    "forced server close"
  ]);
  function n() {
  }
  class i extends l.StrictEventEmitter {
    /**
     * Interface to a `Client` for a given `Namespace`.
     *
     * @param {Namespace} nsp
     * @param {Client} client
     * @param {Object} auth
     * @package
     */
    constructor(o, h, u, g) {
      super(), this.nsp = o, this.client = h, this.recovered = !1, this.data = {}, this.connected = !1, this.acks = /* @__PURE__ */ new Map(), this.fns = [], this.flags = {}, this.server = o.server, this.adapter = o.adapter, g ? (this.id = g.sid, this.pid = g.pid, g.rooms.forEach((m) => this.join(m)), this.data = g.data, g.missedPackets.forEach((m) => {
        this.packet({
          type: c.PacketType.EVENT,
          data: m
        });
      }), this.recovered = !0) : (h.conn.protocol === 3 ? this.id = o.name !== "/" ? o.name + "#" + h.id : h.id : this.id = d.default.generateId(), this.server._opts.connectionStateRecovery && (this.pid = d.default.generateId())), this.handshake = this.buildHandshake(u), this.on("error", n);
    }
    /**
     * Builds the `handshake` BC object
     *
     * @private
     */
    buildHandshake(o) {
      var h, u, g, m;
      return {
        headers: ((h = this.request) === null || h === void 0 ? void 0 : h.headers) || {},
        time: /* @__PURE__ */ new Date() + "",
        address: this.conn.remoteAddress,
        xdomain: !!(!((u = this.request) === null || u === void 0) && u.headers.origin),
        // @ts-ignore
        secure: !this.request || !!this.request.connection.encrypted,
        issued: +/* @__PURE__ */ new Date(),
        url: (g = this.request) === null || g === void 0 ? void 0 : g.url,
        // @ts-ignore
        query: ((m = this.request) === null || m === void 0 ? void 0 : m._query) || {},
        auth: o
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
    emit(o, ...h) {
      if (t.RESERVED_EVENTS.has(o))
        throw new Error(`"${String(o)}" is a reserved event name`);
      const u = [o, ...h], g = {
        type: c.PacketType.EVENT,
        data: u
      };
      if (typeof u[u.length - 1] == "function") {
        const v = this.nsp._ids++;
        a("emitting packet with ack id %d", v), this.registerAckCallback(v, u.pop()), g.id = v;
      }
      const m = Object.assign({}, this.flags);
      return this.flags = {}, this.nsp.server.opts.connectionStateRecovery ? this.adapter.broadcast(g, {
        rooms: /* @__PURE__ */ new Set([this.id]),
        except: /* @__PURE__ */ new Set(),
        flags: m
      }) : (this.notifyOutgoingListeners(g), this.packet(g, m)), !0;
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
    emitWithAck(o, ...h) {
      const u = this.flags.timeout !== void 0;
      return new Promise((g, m) => {
        h.push((v, y) => u ? v ? m(v) : g(y) : g(v)), this.emit(o, ...h);
      });
    }
    /**
     * @private
     */
    registerAckCallback(o, h) {
      const u = this.flags.timeout;
      if (u === void 0) {
        this.acks.set(o, h);
        return;
      }
      const g = setTimeout(() => {
        a("event with ack id %d has timed out after %d ms", o, u), this.acks.delete(o), h.call(this, new Error("operation has timed out"));
      }, u);
      this.acks.set(o, (...m) => {
        clearTimeout(g), h.apply(this, [null, ...m]);
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
    to(o) {
      return this.newBroadcastOperator().to(o);
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
    in(o) {
      return this.newBroadcastOperator().in(o);
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
    except(o) {
      return this.newBroadcastOperator().except(o);
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
    send(...o) {
      return this.emit("message", ...o), this;
    }
    /**
     * Sends a `message` event. Alias of {@link send}.
     *
     * @return self
     */
    write(...o) {
      return this.emit("message", ...o), this;
    }
    /**
     * Writes a packet.
     *
     * @param {Object} packet - packet object
     * @param {Object} opts - options
     * @private
     */
    packet(o, h = {}) {
      o.nsp = this.nsp.name, h.compress = h.compress !== !1, this.client._packet(o, h);
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
    join(o) {
      return a("join room %s", o), this.adapter.addAll(this.id, new Set(Array.isArray(o) ? o : [o]));
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
    leave(o) {
      return a("leave room %s", o), this.adapter.del(this.id, o);
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
      a("socket connected - writing packet"), this.connected = !0, this.join(this.id), this.conn.protocol === 3 ? this.packet({ type: c.PacketType.CONNECT }) : this.packet({
        type: c.PacketType.CONNECT,
        data: { sid: this.id, pid: this.pid }
      });
    }
    /**
     * Called with each packet. Called by `Client`.
     *
     * @param {Object} packet
     * @private
     */
    _onpacket(o) {
      switch (a("got packet %j", o), o.type) {
        case c.PacketType.EVENT:
          this.onevent(o);
          break;
        case c.PacketType.BINARY_EVENT:
          this.onevent(o);
          break;
        case c.PacketType.ACK:
          this.onack(o);
          break;
        case c.PacketType.BINARY_ACK:
          this.onack(o);
          break;
        case c.PacketType.DISCONNECT:
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
    onevent(o) {
      const h = o.data || [];
      if (a("emitting event %j", h), o.id != null && (a("attaching ack callback to event"), h.push(this.ack(o.id))), this._anyListeners && this._anyListeners.length) {
        const u = this._anyListeners.slice();
        for (const g of u)
          g.apply(this, h);
      }
      this.dispatch(h);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @param {Number} id - packet id
     * @private
     */
    ack(o) {
      const h = this;
      let u = !1;
      return function() {
        if (u)
          return;
        const g = Array.prototype.slice.call(arguments);
        a("sending ack %j", g), h.packet({
          id: o,
          type: c.PacketType.ACK,
          data: g
        }), u = !0;
      };
    }
    /**
     * Called upon ack packet.
     *
     * @private
     */
    onack(o) {
      const h = this.acks.get(o.id);
      typeof h == "function" ? (a("calling ack %s with %j", o.id, o.data), h.apply(this, o.data), this.acks.delete(o.id)) : a("bad ack %s", o.id);
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
    _onerror(o) {
      this.emitReserved("error", o);
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
    _onclose(o, h) {
      if (!this.connected)
        return this;
      a("closing socket - reason %s", o), this.emitReserved("disconnecting", o, h), this.server._opts.connectionStateRecovery && r.has(o) && (a("connection state recovery is enabled for sid %s", this.id), this.adapter.persistSession({
        sid: this.id,
        pid: this.pid,
        rooms: [...this.rooms],
        data: this.data
      })), this._cleanup(), this.client._remove(this), this.connected = !1, this.emitReserved("disconnect", o, h);
    }
    /**
     * Makes the socket leave all the rooms it was part of and prevents it from joining any other room
     *
     * @private
     */
    _cleanup() {
      this.leaveAll(), this.nsp._remove(this), this.join = n;
    }
    /**
     * Produces an `error` packet.
     *
     * @param {Object} err - error object
     *
     * @private
     */
    _error(o) {
      this.packet({ type: c.PacketType.CONNECT_ERROR, data: o });
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
    disconnect(o = !1) {
      return this.connected ? (o ? this.client._disconnect() : (this.packet({ type: c.PacketType.DISCONNECT }), this._onclose("server namespace disconnect")), this) : this;
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
    compress(o) {
      return this.flags.compress = o, this;
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
    timeout(o) {
      return this.flags.timeout = o, this;
    }
    /**
     * Dispatch incoming event to socket listeners.
     *
     * @param {Array} event - event that will get emitted
     * @private
     */
    dispatch(o) {
      a("dispatching an event %j", o), this.run(o, (h) => {
        process.nextTick(() => {
          if (h)
            return this._onerror(h);
          this.connected ? super.emitUntyped.apply(this, o) : a("ignore packet received after disconnection");
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
    use(o) {
      return this.fns.push(o), this;
    }
    /**
     * Executes the middleware for an incoming event.
     *
     * @param {Array} event - event that will get emitted
     * @param {Function} fn - last fn call in the middleware
     * @private
     */
    run(o, h) {
      if (!this.fns.length)
        return h();
      const u = this.fns.slice(0);
      function g(m) {
        u[m](o, (v) => {
          if (v)
            return h(v);
          if (!u[m + 1])
            return h();
          g(m + 1);
        });
      }
      g(0);
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
    onAny(o) {
      return this._anyListeners = this._anyListeners || [], this._anyListeners.push(o), this;
    }
    /**
     * Adds a listener that will be fired when any event is received. The event name is passed as the first argument to
     * the callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     */
    prependAny(o) {
      return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(o), this;
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
    offAny(o) {
      if (!this._anyListeners)
        return this;
      if (o) {
        const h = this._anyListeners;
        for (let u = 0; u < h.length; u++)
          if (o === h[u])
            return h.splice(u, 1), this;
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
    onAnyOutgoing(o) {
      return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(o), this;
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
    prependAnyOutgoing(o) {
      return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(o), this;
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
    offAnyOutgoing(o) {
      if (!this._anyOutgoingListeners)
        return this;
      if (o) {
        const h = this._anyOutgoingListeners;
        for (let u = 0; u < h.length; u++)
          if (o === h[u])
            return h.splice(u, 1), this;
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
    notifyOutgoingListeners(o) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const h = this._anyOutgoingListeners.slice();
        for (const u of h)
          u.apply(this, o.data);
      }
    }
    newBroadcastOperator() {
      const o = Object.assign({}, this.flags);
      return this.flags = {}, new s.BroadcastOperator(this.adapter, /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set([this.id]), o);
    }
  }
  return Xt.Socket = i, Xt;
}
var id;
function Ff() {
  return id || (id = 1, (function(e) {
    var c = lr && lr.__importDefault || function(r) {
      return r && r.__esModule ? r : { default: r };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Namespace = e.RESERVED_EVENTS = void 0;
    const f = Lf(), l = Lo(), d = c(je()), s = Df(), t = (0, d.default)("socket.io:namespace");
    e.RESERVED_EVENTS = /* @__PURE__ */ new Set(["connect", "connection", "new_namespace"]);
    class a extends l.StrictEventEmitter {
      /**
       * Namespace constructor.
       *
       * @param server instance
       * @param name
       */
      constructor(n, i) {
        super(), this.sockets = /* @__PURE__ */ new Map(), this._preConnectSockets = /* @__PURE__ */ new Map(), this._fns = [], this._ids = 0, this.server = n, this.name = i, this._initAdapter();
      }
      /**
       * Initializes the `Adapter` for this nsp.
       * Run upon changing adapter by `Server#adapter`
       * in addition to the constructor.
       *
       * @private
       */
      _initAdapter() {
        this.adapter = new (this.server.adapter())(this), Promise.resolve(this.adapter.init()).catch((n) => {
          t("error while initializing adapter: %s", n);
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
      use(n) {
        return this._fns.push(n), this;
      }
      /**
       * Executes the middleware for an incoming client.
       *
       * @param socket - the socket that will get added
       * @param fn - last fn call in the middleware
       * @private
       */
      run(n, i) {
        if (!this._fns.length)
          return i();
        const p = this._fns.slice(0);
        function o(h) {
          p[h](n, (u) => {
            if (u)
              return i(u);
            if (!p[h + 1])
              return i();
            o(h + 1);
          });
        }
        o(0);
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
      to(n) {
        return new s.BroadcastOperator(this.adapter).to(n);
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
      in(n) {
        return new s.BroadcastOperator(this.adapter).in(n);
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
      except(n) {
        return new s.BroadcastOperator(this.adapter).except(n);
      }
      /**
       * Adds a new client.
       *
       * @return {Socket}
       * @private
       */
      async _add(n, i, p) {
        var o;
        t("adding socket to nsp %s", this.name);
        const h = await this._createSocket(n, i);
        if (this._preConnectSockets.set(h.id, h), // @ts-ignore
        !((o = this.server.opts.connectionStateRecovery) === null || o === void 0) && o.skipMiddlewares && h.recovered && n.conn.readyState === "open")
          return this._doConnect(h, p);
        this.run(h, (u) => {
          process.nextTick(() => {
            if (n.conn.readyState !== "open") {
              t("next called after client was closed - ignoring socket"), h._cleanup();
              return;
            }
            if (u)
              return t("middleware error, sending CONNECT_ERROR packet to the client"), h._cleanup(), n.conn.protocol === 3 ? h._error(u.data || u.message) : h._error({
                message: u.message,
                data: u.data
              });
            this._doConnect(h, p);
          });
        });
      }
      async _createSocket(n, i) {
        const p = i.pid, o = i.offset;
        if (
          // @ts-ignore
          this.server.opts.connectionStateRecovery && typeof p == "string" && typeof o == "string"
        ) {
          let h;
          try {
            h = await this.adapter.restoreSession(p, o);
          } catch (u) {
            t("error while restoring session: %s", u);
          }
          if (h)
            return t("connection state recovered for sid %s", h.sid), new f.Socket(this, n, i, h);
        }
        return new f.Socket(this, n, i);
      }
      _doConnect(n, i) {
        this._preConnectSockets.delete(n.id), this.sockets.set(n.id, n), n._onconnect(), i && i(n), this.emitReserved("connect", n), this.emitReserved("connection", n);
      }
      /**
       * Removes a client. Called by each `Socket`.
       *
       * @private
       */
      _remove(n) {
        this.sockets.delete(n.id) || this._preConnectSockets.delete(n.id);
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
      emit(n, ...i) {
        return new s.BroadcastOperator(this.adapter).emit(n, ...i);
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
      send(...n) {
        return this.emit("message", ...n), this;
      }
      /**
       * Sends a `message` event to all clients. Sends a `message` event. Alias of {@link send}.
       *
       * @return self
       */
      write(...n) {
        return this.emit("message", ...n), this;
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
      serverSideEmit(n, ...i) {
        if (e.RESERVED_EVENTS.has(n))
          throw new Error(`"${String(n)}" is a reserved event name`);
        return i.unshift(n), this.adapter.serverSideEmit(i), !0;
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
      serverSideEmitWithAck(n, ...i) {
        return new Promise((p, o) => {
          i.push((h, u) => h ? (h.responses = u, o(h)) : p(u)), this.serverSideEmit(n, ...i);
        });
      }
      /**
       * Called when a packet is received from another Socket.IO server
       *
       * @param args - an array of arguments, which may include an acknowledgement callback at the end
       *
       * @private
       */
      _onServerSideEmit(n) {
        super.emitUntyped.apply(this, n);
      }
      /**
       * Gets a list of clients.
       *
       * @deprecated this method will be removed in the next major release, please use {@link Namespace#serverSideEmit} or
       * {@link Namespace#fetchSockets} instead.
       */
      allSockets() {
        return new s.BroadcastOperator(this.adapter).allSockets();
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
      compress(n) {
        return new s.BroadcastOperator(this.adapter).compress(n);
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
        return new s.BroadcastOperator(this.adapter).volatile;
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
        return new s.BroadcastOperator(this.adapter).local;
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
      timeout(n) {
        return new s.BroadcastOperator(this.adapter).timeout(n);
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
        return new s.BroadcastOperator(this.adapter).fetchSockets();
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
      socketsJoin(n) {
        return new s.BroadcastOperator(this.adapter).socketsJoin(n);
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
      socketsLeave(n) {
        return new s.BroadcastOperator(this.adapter).socketsLeave(n);
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
      disconnectSockets(n = !1) {
        return new s.BroadcastOperator(this.adapter).disconnectSockets(n);
      }
    }
    e.Namespace = a;
  })(lr)), lr;
}
var Qt = {}, Ka = {}, Zt = {}, hn = {}, sd;
function vv() {
  if (sd) return hn;
  sd = 1, Object.defineProperty(hn, "__esModule", { value: !0 }), hn.encode = t, hn.decode = a, hn.yeast = r;
  const e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), c = 64, f = {};
  let l = 0, d = 0, s;
  function t(n) {
    let i = "";
    do
      i = e[n % c] + i, n = Math.floor(n / c);
    while (n > 0);
    return i;
  }
  function a(n) {
    let i = 0;
    for (d = 0; d < n.length; d++)
      i = i * c + f[n.charAt(d)];
    return i;
  }
  function r() {
    const n = t(+/* @__PURE__ */ new Date());
    return n !== s ? (l = 0, s = n) : n + "." + t(l++);
  }
  for (; d < c; d++)
    f[e[d]] = d;
  return hn;
}
var ad;
function Uf() {
  if (ad) return Zt;
  ad = 1;
  var e;
  Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.SessionAwareAdapter = Zt.Adapter = void 0;
  const c = ht, f = vv(), l = Of(), d = typeof ((e = l == null ? void 0 : l.Sender) === null || e === void 0 ? void 0 : e.frame) == "function";
  class s extends c.EventEmitter {
    /**
     * In-memory adapter constructor.
     *
     * @param nsp
     */
    constructor(n) {
      super(), this.nsp = n, this.rooms = /* @__PURE__ */ new Map(), this.sids = /* @__PURE__ */ new Map(), this.encoder = n.server.encoder;
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
    addAll(n, i) {
      this.sids.has(n) || this.sids.set(n, /* @__PURE__ */ new Set());
      for (const p of i)
        this.sids.get(n).add(p), this.rooms.has(p) || (this.rooms.set(p, /* @__PURE__ */ new Set()), this.emit("create-room", p)), this.rooms.get(p).has(n) || (this.rooms.get(p).add(n), this.emit("join-room", p, n));
    }
    /**
     * Removes a socket from a room.
     *
     * @param {SocketId} id     the socket id
     * @param {Room}     room   the room name
     */
    del(n, i) {
      this.sids.has(n) && this.sids.get(n).delete(i), this._del(i, n);
    }
    _del(n, i) {
      const p = this.rooms.get(n);
      p != null && (p.delete(i) && this.emit("leave-room", n, i), p.size === 0 && this.rooms.delete(n) && this.emit("delete-room", n));
    }
    /**
     * Removes a socket from all rooms it's joined.
     *
     * @param {SocketId} id   the socket id
     */
    delAll(n) {
      if (this.sids.has(n)) {
        for (const i of this.sids.get(n))
          this._del(i, n);
        this.sids.delete(n);
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
    broadcast(n, i) {
      const p = i.flags || {}, o = {
        preEncoded: !0,
        volatile: p.volatile,
        compress: p.compress
      };
      n.nsp = this.nsp.name;
      const h = this._encode(n, o);
      this.apply(i, (u) => {
        typeof u.notifyOutgoingListeners == "function" && u.notifyOutgoingListeners(n), u.client.writeToEngine(h, o);
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
    broadcastWithAck(n, i, p, o) {
      const h = i.flags || {}, u = {
        preEncoded: !0,
        volatile: h.volatile,
        compress: h.compress
      };
      n.nsp = this.nsp.name, n.id = this.nsp._ids++;
      const g = this._encode(n, u);
      let m = 0;
      this.apply(i, (v) => {
        m++, v.acks.set(n.id, o), typeof v.notifyOutgoingListeners == "function" && v.notifyOutgoingListeners(n), v.client.writeToEngine(g, u);
      }), p(m);
    }
    _encode(n, i) {
      const p = this.encoder.encode(n);
      if (d && p.length === 1 && typeof p[0] == "string") {
        const o = Buffer.from("4" + p[0]);
        i.wsPreEncodedFrame = l.Sender.frame(o, {
          readOnly: !1,
          mask: !1,
          rsv1: !1,
          opcode: 1,
          fin: !0
        });
      }
      return p;
    }
    /**
     * Gets a list of sockets by sid.
     *
     * @param {Set<Room>} rooms   the explicit set of rooms to check.
     */
    sockets(n) {
      const i = /* @__PURE__ */ new Set();
      return this.apply({ rooms: n }, (p) => {
        i.add(p.id);
      }), Promise.resolve(i);
    }
    /**
     * Gets the list of rooms a given socket has joined.
     *
     * @param {SocketId} id   the socket id
     */
    socketRooms(n) {
      return this.sids.get(n);
    }
    /**
     * Returns the matching socket instances
     *
     * @param opts - the filters to apply
     */
    fetchSockets(n) {
      const i = [];
      return this.apply(n, (p) => {
        i.push(p);
      }), Promise.resolve(i);
    }
    /**
     * Makes the matching socket instances join the specified rooms
     *
     * @param opts - the filters to apply
     * @param rooms - the rooms to join
     */
    addSockets(n, i) {
      this.apply(n, (p) => {
        p.join(i);
      });
    }
    /**
     * Makes the matching socket instances leave the specified rooms
     *
     * @param opts - the filters to apply
     * @param rooms - the rooms to leave
     */
    delSockets(n, i) {
      this.apply(n, (p) => {
        i.forEach((o) => p.leave(o));
      });
    }
    /**
     * Makes the matching socket instances disconnect
     *
     * @param opts - the filters to apply
     * @param close - whether to close the underlying connection
     */
    disconnectSockets(n, i) {
      this.apply(n, (p) => {
        p.disconnect(i);
      });
    }
    apply(n, i) {
      const p = n.rooms, o = this.computeExceptSids(n.except);
      if (p.size) {
        const h = /* @__PURE__ */ new Set();
        for (const u of p)
          if (this.rooms.has(u))
            for (const g of this.rooms.get(u)) {
              if (h.has(g) || o.has(g))
                continue;
              const m = this.nsp.sockets.get(g);
              m && (i(m), h.add(g));
            }
      } else
        for (const [h] of this.sids) {
          if (o.has(h))
            continue;
          const u = this.nsp.sockets.get(h);
          u && i(u);
        }
    }
    computeExceptSids(n) {
      const i = /* @__PURE__ */ new Set();
      if (n && n.size > 0)
        for (const p of n)
          this.rooms.has(p) && this.rooms.get(p).forEach((o) => i.add(o));
      return i;
    }
    /**
     * Send a packet to the other Socket.IO servers in the cluster
     * @param packet - an array of arguments, which may include an acknowledgement callback at the end
     */
    serverSideEmit(n) {
      console.warn("this adapter does not support the serverSideEmit() functionality");
    }
    /**
     * Save the client session in order to restore it upon reconnection.
     */
    persistSession(n) {
    }
    /**
     * Restore the session and find the packets that were missed by the client.
     * @param pid
     * @param offset
     */
    restoreSession(n, i) {
      return null;
    }
  }
  Zt.Adapter = s;
  class t extends s {
    constructor(n) {
      super(n), this.nsp = n, this.sessions = /* @__PURE__ */ new Map(), this.packets = [], this.maxDisconnectionDuration = n.server.opts.connectionStateRecovery.maxDisconnectionDuration, setInterval(() => {
        const p = Date.now() - this.maxDisconnectionDuration;
        this.sessions.forEach((o, h) => {
          o.disconnectedAt < p && this.sessions.delete(h);
        });
        for (let o = this.packets.length - 1; o >= 0; o--)
          if (this.packets[o].emittedAt < p) {
            this.packets.splice(0, o + 1);
            break;
          }
      }, 60 * 1e3).unref();
    }
    persistSession(n) {
      n.disconnectedAt = Date.now(), this.sessions.set(n.pid, n);
    }
    restoreSession(n, i) {
      const p = this.sessions.get(n);
      if (!p)
        return null;
      if (p.disconnectedAt + this.maxDisconnectionDuration < Date.now())
        return this.sessions.delete(n), null;
      const h = this.packets.findIndex((g) => g.id === i);
      if (h === -1)
        return null;
      const u = [];
      for (let g = h + 1; g < this.packets.length; g++) {
        const m = this.packets[g];
        a(p.rooms, m.opts) && u.push(m.data);
      }
      return Promise.resolve(Object.assign(Object.assign({}, p), { missedPackets: u }));
    }
    broadcast(n, i) {
      var p;
      const o = n.type === 2, h = n.id === void 0, u = ((p = i.flags) === null || p === void 0 ? void 0 : p.volatile) === void 0;
      if (o && h && u) {
        const g = (0, f.yeast)();
        n.data.push(g), this.packets.push({
          id: g,
          opts: i,
          data: n.data,
          emittedAt: Date.now()
        });
      }
      super.broadcast(n, i);
    }
  }
  Zt.SessionAwareAdapter = t;
  function a(r, n) {
    const i = n.rooms.size === 0 || r.some((o) => n.rooms.has(o)), p = r.every((o) => !n.except.has(o));
    return i && p;
  }
  return Zt;
}
var dt = {}, od;
function xv() {
  if (od) return dt;
  od = 1;
  var e = dt && dt.__rest || function(h, u) {
    var g = {};
    for (var m in h) Object.prototype.hasOwnProperty.call(h, m) && u.indexOf(m) < 0 && (g[m] = h[m]);
    if (h != null && typeof Object.getOwnPropertySymbols == "function")
      for (var v = 0, m = Object.getOwnPropertySymbols(h); v < m.length; v++)
        u.indexOf(m[v]) < 0 && Object.prototype.propertyIsEnumerable.call(h, m[v]) && (g[m[v]] = h[m[v]]);
    return g;
  };
  Object.defineProperty(dt, "__esModule", { value: !0 }), dt.ClusterAdapterWithHeartbeat = dt.ClusterAdapter = dt.MessageType = void 0;
  const c = Uf(), f = je(), l = yt, d = (0, f.debug)("socket.io-adapter"), s = "emitter", t = 5e3;
  function a() {
    return (0, l.randomBytes)(8).toString("hex");
  }
  var r;
  (function(h) {
    h[h.INITIAL_HEARTBEAT = 1] = "INITIAL_HEARTBEAT", h[h.HEARTBEAT = 2] = "HEARTBEAT", h[h.BROADCAST = 3] = "BROADCAST", h[h.SOCKETS_JOIN = 4] = "SOCKETS_JOIN", h[h.SOCKETS_LEAVE = 5] = "SOCKETS_LEAVE", h[h.DISCONNECT_SOCKETS = 6] = "DISCONNECT_SOCKETS", h[h.FETCH_SOCKETS = 7] = "FETCH_SOCKETS", h[h.FETCH_SOCKETS_RESPONSE = 8] = "FETCH_SOCKETS_RESPONSE", h[h.SERVER_SIDE_EMIT = 9] = "SERVER_SIDE_EMIT", h[h.SERVER_SIDE_EMIT_RESPONSE = 10] = "SERVER_SIDE_EMIT_RESPONSE", h[h.BROADCAST_CLIENT_COUNT = 11] = "BROADCAST_CLIENT_COUNT", h[h.BROADCAST_ACK = 12] = "BROADCAST_ACK", h[h.ADAPTER_CLOSE = 13] = "ADAPTER_CLOSE";
  })(r || (dt.MessageType = r = {}));
  function n(h) {
    return {
      rooms: [...h.rooms],
      except: [...h.except],
      flags: h.flags
    };
  }
  function i(h) {
    return {
      rooms: new Set(h.rooms),
      except: new Set(h.except),
      flags: h.flags
    };
  }
  class p extends c.Adapter {
    constructor(u) {
      super(u), this.requests = /* @__PURE__ */ new Map(), this.ackRequests = /* @__PURE__ */ new Map(), this.uid = a();
    }
    /**
     * Called when receiving a message from another member of the cluster.
     *
     * @param message
     * @param offset
     * @protected
     */
    onMessage(u, g) {
      if (u.uid === this.uid)
        return d("[%s] ignore message from self", this.uid);
      if (u.nsp !== this.nsp.name)
        return d("[%s] ignore message from another namespace (%s)", this.uid, u.nsp);
      switch (d("[%s] new event of type %d from %s", this.uid, u.type, u.uid), u.type) {
        case r.BROADCAST: {
          if (u.data.requestId !== void 0)
            super.broadcastWithAck(u.data.packet, i(u.data.opts), (v) => {
              d("[%s] waiting for %d client acknowledgements", this.uid, v), this.publishResponse(u.uid, {
                type: r.BROADCAST_CLIENT_COUNT,
                data: {
                  requestId: u.data.requestId,
                  clientCount: v
                }
              });
            }, (v) => {
              d("[%s] received acknowledgement with value %j", this.uid, v), this.publishResponse(u.uid, {
                type: r.BROADCAST_ACK,
                data: {
                  requestId: u.data.requestId,
                  packet: v
                }
              });
            });
          else {
            const v = u.data.packet, y = i(u.data.opts);
            this.addOffsetIfNecessary(v, y, g), super.broadcast(v, y);
          }
          break;
        }
        case r.SOCKETS_JOIN:
          super.addSockets(i(u.data.opts), u.data.rooms);
          break;
        case r.SOCKETS_LEAVE:
          super.delSockets(i(u.data.opts), u.data.rooms);
          break;
        case r.DISCONNECT_SOCKETS:
          super.disconnectSockets(i(u.data.opts), u.data.close);
          break;
        case r.FETCH_SOCKETS: {
          d("[%s] calling fetchSockets with opts %j", this.uid, u.data.opts), super.fetchSockets(i(u.data.opts)).then((m) => {
            this.publishResponse(u.uid, {
              type: r.FETCH_SOCKETS_RESPONSE,
              data: {
                requestId: u.data.requestId,
                sockets: m.map((v) => {
                  const y = v.handshake, { sessionStore: R } = y, S = e(y, ["sessionStore"]);
                  return {
                    id: v.id,
                    handshake: S,
                    rooms: [...v.rooms],
                    data: v.data
                  };
                })
              }
            });
          });
          break;
        }
        case r.SERVER_SIDE_EMIT: {
          const m = u.data.packet;
          if (!(u.data.requestId !== void 0)) {
            this.nsp._onServerSideEmit(m);
            return;
          }
          let y = !1;
          const R = (S) => {
            y || (y = !0, d("[%s] calling acknowledgement with %j", this.uid, S), this.publishResponse(u.uid, {
              type: r.SERVER_SIDE_EMIT_RESPONSE,
              data: {
                requestId: u.data.requestId,
                packet: S
              }
            }));
          };
          this.nsp._onServerSideEmit([...m, R]);
          break;
        }
        // @ts-ignore
        case r.BROADCAST_CLIENT_COUNT:
        // @ts-ignore
        case r.BROADCAST_ACK:
        // @ts-ignore
        case r.FETCH_SOCKETS_RESPONSE:
        // @ts-ignore
        case r.SERVER_SIDE_EMIT_RESPONSE:
          this.onResponse(u);
          break;
        default:
          d("[%s] unknown message type: %s", this.uid, u.type);
      }
    }
    /**
     * Called when receiving a response from another member of the cluster.
     *
     * @param response
     * @protected
     */
    onResponse(u) {
      var g, m;
      const v = u.data.requestId;
      switch (d("[%s] received response %s to request %s", this.uid, u.type, v), u.type) {
        case r.BROADCAST_CLIENT_COUNT: {
          (g = this.ackRequests.get(v)) === null || g === void 0 || g.clientCountCallback(u.data.clientCount);
          break;
        }
        case r.BROADCAST_ACK: {
          (m = this.ackRequests.get(v)) === null || m === void 0 || m.ack(u.data.packet);
          break;
        }
        case r.FETCH_SOCKETS_RESPONSE: {
          const y = this.requests.get(v);
          if (!y)
            return;
          y.current++, u.data.sockets.forEach((R) => y.responses.push(R)), y.current === y.expected && (clearTimeout(y.timeout), y.resolve(y.responses), this.requests.delete(v));
          break;
        }
        case r.SERVER_SIDE_EMIT_RESPONSE: {
          const y = this.requests.get(v);
          if (!y)
            return;
          y.current++, y.responses.push(u.data.packet), y.current === y.expected && (clearTimeout(y.timeout), y.resolve(null, y.responses), this.requests.delete(v));
          break;
        }
        default:
          d("[%s] unknown response type: %s", this.uid, u.type);
      }
    }
    async broadcast(u, g) {
      var m;
      if (!((m = g.flags) === null || m === void 0 ? void 0 : m.local))
        try {
          const y = await this.publishAndReturnOffset({
            type: r.BROADCAST,
            data: {
              packet: u,
              opts: n(g)
            }
          });
          this.addOffsetIfNecessary(u, g, y);
        } catch (y) {
          return d("[%s] error while broadcasting message: %s", this.uid, y.message);
        }
      super.broadcast(u, g);
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
    addOffsetIfNecessary(u, g, m) {
      var v;
      if (!this.nsp.server.opts.connectionStateRecovery)
        return;
      const y = u.type === 2, R = u.id === void 0, S = ((v = g.flags) === null || v === void 0 ? void 0 : v.volatile) === void 0;
      y && R && S && u.data.push(m);
    }
    broadcastWithAck(u, g, m, v) {
      var y;
      if (!((y = g == null ? void 0 : g.flags) === null || y === void 0 ? void 0 : y.local)) {
        const S = a();
        this.ackRequests.set(S, {
          clientCountCallback: m,
          ack: v
        }), this.publish({
          type: r.BROADCAST,
          data: {
            packet: u,
            requestId: S,
            opts: n(g)
          }
        }), setTimeout(() => {
          this.ackRequests.delete(S);
        }, g.flags.timeout);
      }
      super.broadcastWithAck(u, g, m, v);
    }
    async addSockets(u, g) {
      var m;
      if (!((m = u.flags) === null || m === void 0 ? void 0 : m.local))
        try {
          await this.publishAndReturnOffset({
            type: r.SOCKETS_JOIN,
            data: {
              opts: n(u),
              rooms: g
            }
          });
        } catch (y) {
          d("[%s] error while publishing message: %s", this.uid, y.message);
        }
      super.addSockets(u, g);
    }
    async delSockets(u, g) {
      var m;
      if (!((m = u.flags) === null || m === void 0 ? void 0 : m.local))
        try {
          await this.publishAndReturnOffset({
            type: r.SOCKETS_LEAVE,
            data: {
              opts: n(u),
              rooms: g
            }
          });
        } catch (y) {
          d("[%s] error while publishing message: %s", this.uid, y.message);
        }
      super.delSockets(u, g);
    }
    async disconnectSockets(u, g) {
      var m;
      if (!((m = u.flags) === null || m === void 0 ? void 0 : m.local))
        try {
          await this.publishAndReturnOffset({
            type: r.DISCONNECT_SOCKETS,
            data: {
              opts: n(u),
              close: g
            }
          });
        } catch (y) {
          d("[%s] error while publishing message: %s", this.uid, y.message);
        }
      super.disconnectSockets(u, g);
    }
    async fetchSockets(u) {
      var g;
      const [m, v] = await Promise.all([
        super.fetchSockets(u),
        this.serverCount()
      ]), y = v - 1;
      if (!((g = u.flags) === null || g === void 0) && g.local || y <= 0)
        return m;
      const R = a();
      return new Promise((S, T) => {
        const b = setTimeout(() => {
          const _ = this.requests.get(R);
          _ && (T(new Error(`timeout reached: only ${_.current} responses received out of ${_.expected}`)), this.requests.delete(R));
        }, u.flags.timeout || t), w = {
          type: r.FETCH_SOCKETS,
          resolve: S,
          timeout: b,
          current: 0,
          expected: y,
          responses: m
        };
        this.requests.set(R, w), this.publish({
          type: r.FETCH_SOCKETS,
          data: {
            opts: n(u),
            requestId: R
          }
        });
      });
    }
    async serverSideEmit(u) {
      if (!(typeof u[u.length - 1] == "function"))
        return this.publish({
          type: r.SERVER_SIDE_EMIT,
          data: {
            packet: u
          }
        });
      const m = u.pop(), v = await this.serverCount() - 1;
      if (d('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, v), v <= 0)
        return m(null, []);
      const y = a(), R = setTimeout(() => {
        const T = this.requests.get(y);
        T && (m(new Error(`timeout reached: only ${T.current} responses received out of ${T.expected}`), T.responses), this.requests.delete(y));
      }, t), S = {
        type: r.SERVER_SIDE_EMIT,
        resolve: m,
        timeout: R,
        current: 0,
        expected: v,
        responses: []
      };
      this.requests.set(y, S), this.publish({
        type: r.SERVER_SIDE_EMIT,
        data: {
          requestId: y,
          // the presence of this attribute defines whether an acknowledgement is needed
          packet: u
        }
      });
    }
    publish(u) {
      d("[%s] sending message %s", this.uid, u.type), this.publishAndReturnOffset(u).catch((g) => {
        d("[%s] error while publishing message: %s", this.uid, g);
      });
    }
    publishAndReturnOffset(u) {
      return u.uid = this.uid, u.nsp = this.nsp.name, this.doPublish(u);
    }
    publishResponse(u, g) {
      g.uid = this.uid, g.nsp = this.nsp.name, d("[%s] sending response %s to %s", this.uid, g.type, u), this.doPublishResponse(u, g).catch((m) => {
        d("[%s] error while publishing response: %s", this.uid, m);
      });
    }
  }
  dt.ClusterAdapter = p;
  class o extends p {
    constructor(u, g) {
      super(u), this.nodesMap = /* @__PURE__ */ new Map(), this.customRequests = /* @__PURE__ */ new Map(), this._opts = Object.assign({
        heartbeatInterval: 5e3,
        heartbeatTimeout: 1e4
      }, g), this.cleanupTimer = setInterval(() => {
        const m = Date.now();
        this.nodesMap.forEach((v, y) => {
          m - v > this._opts.heartbeatTimeout && (d("[%s] node %s seems down", this.uid, y), this.removeNode(y));
        });
      }, 1e3);
    }
    init() {
      this.publish({
        type: r.INITIAL_HEARTBEAT
      });
    }
    scheduleHeartbeat() {
      this.heartbeatTimer ? this.heartbeatTimer.refresh() : this.heartbeatTimer = setTimeout(() => {
        this.publish({
          type: r.HEARTBEAT
        });
      }, this._opts.heartbeatInterval);
    }
    close() {
      this.publish({
        type: r.ADAPTER_CLOSE
      }), clearTimeout(this.heartbeatTimer), this.cleanupTimer && clearInterval(this.cleanupTimer);
    }
    onMessage(u, g) {
      if (u.uid === this.uid)
        return d("[%s] ignore message from self", this.uid);
      switch (u.uid && u.uid !== s && this.nodesMap.set(u.uid, Date.now()), u.type) {
        case r.INITIAL_HEARTBEAT:
          this.publish({
            type: r.HEARTBEAT
          });
          break;
        case r.HEARTBEAT:
          break;
        case r.ADAPTER_CLOSE:
          this.removeNode(u.uid);
          break;
        default:
          super.onMessage(u, g);
      }
    }
    serverCount() {
      return Promise.resolve(1 + this.nodesMap.size);
    }
    publish(u) {
      return this.scheduleHeartbeat(), super.publish(u);
    }
    async serverSideEmit(u) {
      if (!(typeof u[u.length - 1] == "function"))
        return this.publish({
          type: r.SERVER_SIDE_EMIT,
          data: {
            packet: u
          }
        });
      const m = u.pop(), v = this.nodesMap.size;
      if (d('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, v), v <= 0)
        return m(null, []);
      const y = a(), R = setTimeout(() => {
        const T = this.customRequests.get(y);
        T && (m(new Error(`timeout reached: missing ${T.missingUids.size} responses`), T.responses), this.customRequests.delete(y));
      }, t), S = {
        type: r.SERVER_SIDE_EMIT,
        resolve: m,
        timeout: R,
        missingUids: /* @__PURE__ */ new Set([...this.nodesMap.keys()]),
        responses: []
      };
      this.customRequests.set(y, S), this.publish({
        type: r.SERVER_SIDE_EMIT,
        data: {
          requestId: y,
          // the presence of this attribute defines whether an acknowledgement is needed
          packet: u
        }
      });
    }
    async fetchSockets(u) {
      var g;
      const [m, v] = await Promise.all([
        super.fetchSockets({
          rooms: u.rooms,
          except: u.except,
          flags: {
            local: !0
          }
        }),
        this.serverCount()
      ]), y = v - 1;
      if (!((g = u.flags) === null || g === void 0) && g.local || y <= 0)
        return m;
      const R = a();
      return new Promise((S, T) => {
        const b = setTimeout(() => {
          const _ = this.customRequests.get(R);
          _ && (T(new Error(`timeout reached: missing ${_.missingUids.size} responses`)), this.customRequests.delete(R));
        }, u.flags.timeout || t), w = {
          type: r.FETCH_SOCKETS,
          resolve: S,
          timeout: b,
          missingUids: /* @__PURE__ */ new Set([...this.nodesMap.keys()]),
          responses: m
        };
        this.customRequests.set(R, w), this.publish({
          type: r.FETCH_SOCKETS,
          data: {
            opts: n(u),
            requestId: R
          }
        });
      });
    }
    onResponse(u) {
      const g = u.data.requestId;
      switch (d("[%s] received response %s to request %s", this.uid, u.type, g), u.type) {
        case r.FETCH_SOCKETS_RESPONSE: {
          const m = this.customRequests.get(g);
          if (!m)
            return;
          u.data.sockets.forEach((v) => m.responses.push(v)), m.missingUids.delete(u.uid), m.missingUids.size === 0 && (clearTimeout(m.timeout), m.resolve(m.responses), this.customRequests.delete(g));
          break;
        }
        case r.SERVER_SIDE_EMIT_RESPONSE: {
          const m = this.customRequests.get(g);
          if (!m)
            return;
          m.responses.push(u.data.packet), m.missingUids.delete(u.uid), m.missingUids.size === 0 && (clearTimeout(m.timeout), m.resolve(null, m.responses), this.customRequests.delete(g));
          break;
        }
        default:
          super.onResponse(u);
      }
    }
    removeNode(u) {
      this.customRequests.forEach((g, m) => {
        g.missingUids.delete(u), g.missingUids.size === 0 && (clearTimeout(g.timeout), g.type === r.FETCH_SOCKETS ? g.resolve(g.responses) : g.type === r.SERVER_SIDE_EMIT && g.resolve(null, g.responses), this.customRequests.delete(m));
      }), this.nodesMap.delete(u);
    }
  }
  return dt.ClusterAdapterWithHeartbeat = o, dt;
}
var cd;
function Fo() {
  return cd || (cd = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.MessageType = e.ClusterAdapterWithHeartbeat = e.ClusterAdapter = e.SessionAwareAdapter = e.Adapter = void 0;
    var c = Uf();
    Object.defineProperty(e, "Adapter", { enumerable: !0, get: function() {
      return c.Adapter;
    } }), Object.defineProperty(e, "SessionAwareAdapter", { enumerable: !0, get: function() {
      return c.SessionAwareAdapter;
    } });
    var f = xv();
    Object.defineProperty(e, "ClusterAdapter", { enumerable: !0, get: function() {
      return f.ClusterAdapter;
    } }), Object.defineProperty(e, "ClusterAdapterWithHeartbeat", { enumerable: !0, get: function() {
      return f.ClusterAdapterWithHeartbeat;
    } }), Object.defineProperty(e, "MessageType", { enumerable: !0, get: function() {
      return f.MessageType;
    } });
  })(Ka)), Ka;
}
var ld;
function yv() {
  if (ld) return Qt;
  ld = 1;
  var e = Qt && Qt.__importDefault || function(a) {
    return a && a.__esModule ? a : { default: a };
  };
  Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.ParentNamespace = void 0;
  const c = Ff(), f = Fo(), d = (0, e(je()).default)("socket.io:parent-namespace");
  class s extends c.Namespace {
    constructor(r) {
      super(r, "/_" + s.count++), this.children = /* @__PURE__ */ new Set();
    }
    /**
     * @private
     */
    _initAdapter() {
      this.adapter = new t(this);
    }
    emit(r, ...n) {
      return this.children.forEach((i) => {
        i.emit(r, ...n);
      }), !0;
    }
    createChild(r) {
      d("creating child namespace %s", r);
      const n = new c.Namespace(this.server, r);
      if (this._fns.forEach((i) => n.use(i)), this.listeners("connect").forEach((i) => n.on("connect", i)), this.listeners("connection").forEach((i) => n.on("connection", i)), this.children.add(n), this.server._opts.cleanupEmptyChildNamespaces) {
        const i = n._remove;
        n._remove = (p) => {
          i.call(n, p), n.sockets.size === 0 && (d("closing child namespace %s", r), n.adapter.close(), this.server._nsps.delete(n.name), this.children.delete(n));
        };
      }
      return this.server._nsps.set(r, n), this.server.sockets.emitReserved("new_namespace", n), n;
    }
    fetchSockets() {
      throw new Error("fetchSockets() is not supported on parent namespaces");
    }
  }
  Qt.ParentNamespace = s, s.count = 0;
  class t extends f.Adapter {
    broadcast(r, n) {
      this.nsp.children.forEach((i) => {
        i.adapter.broadcast(r, n);
      });
    }
  }
  return Qt;
}
var Nt = {}, ud;
function bv() {
  if (ud) return Nt;
  ud = 1;
  var e = Nt && Nt.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(Nt, "__esModule", { value: !0 }), Nt.patchAdapter = n, Nt.restoreAdapter = p, Nt.serveFile = h;
  const c = Fo(), f = Ze, d = (0, e(je()).default)("socket.io:adapter-uws"), s = "", { addAll: t, del: a, broadcast: r } = c.Adapter.prototype;
  function n(u) {
    c.Adapter.prototype.addAll = function(g, m) {
      const v = !this.sids.has(g);
      t.call(this, g, m);
      const y = this.nsp.sockets.get(g) || this.nsp._preConnectSockets.get(g);
      if (y) {
        if (y.conn.transport.name === "websocket") {
          i(this.nsp.name, y, v, m);
          return;
        }
        v && y.conn.on("upgrade", () => {
          const R = this.sids.get(g);
          R && i(this.nsp.name, y, v, R);
        });
      }
    }, c.Adapter.prototype.del = function(g, m) {
      a.call(this, g, m);
      const v = this.nsp.sockets.get(g) || this.nsp._preConnectSockets.get(g);
      if (v && v.conn.transport.name === "websocket") {
        const y = v.conn.id, R = v.conn.transport.socket, S = `${this.nsp.name}${s}${m}`;
        d("unsubscribe connection %s from topic %s", y, S), R.unsubscribe(S);
      }
    }, c.Adapter.prototype.broadcast = function(g, m) {
      if (!(m.rooms.size <= 1 && m.except.size === 0)) {
        r.call(this, g, m);
        return;
      }
      const y = m.flags || {}, R = {
        preEncoded: !0,
        volatile: y.volatile,
        compress: y.compress
      };
      g.nsp = this.nsp.name;
      const S = this.encoder.encode(g), T = m.rooms.size === 0 ? this.nsp.name : `${this.nsp.name}${s}${m.rooms.keys().next().value}`;
      d("fast publish to %s", T), S.forEach((b) => {
        const w = typeof b != "string";
        u.publish(T, w ? b : "4" + b, w);
      }), this.apply(m, (b) => {
        b.conn.transport.name !== "websocket" && b.client.writeToEngine(S, R);
      });
    };
  }
  function i(u, g, m, v) {
    const y = g.conn.id, R = g.conn.transport.socket;
    m && (d("subscribe connection %s to topic %s", y, u), R.subscribe(u)), v.forEach((S) => {
      const T = `${u}${s}${S}`;
      d("subscribe connection %s to topic %s", y, T), R.subscribe(T);
    });
  }
  function p() {
    c.Adapter.prototype.addAll = t, c.Adapter.prototype.del = a, c.Adapter.prototype.broadcast = r;
  }
  const o = (u) => {
    const { buffer: g, byteOffset: m, byteLength: v } = u;
    return g.slice(m, m + v);
  };
  function h(u, g) {
    const { size: m } = (0, f.statSync)(g), v = (0, f.createReadStream)(g), y = () => !v.destroyed && v.destroy(), R = (T) => {
      throw y(), T;
    }, S = (T) => {
      const b = o(T);
      u.cork(() => {
        const w = u.getWriteOffset(), [_, E] = u.tryEnd(b, m);
        !E && !_ && (v.pause(), u.onWritable((N) => {
          const [k, D] = u.tryEnd(b.slice(N - w), m);
          return !D && k && v.resume(), k;
        }));
      });
    };
    u.onAborted(y), v.on("data", S).on("error", R).on("end", y);
  }
  return Nt;
}
const wv = "4.8.3", _v = {
  version: wv
};
var Dt = fr.exports, pd;
function Ev() {
  return pd || (pd = 1, (function(e, c) {
    var f = Dt && Dt.__createBinding || (Object.create ? (function($, C, I, F) {
      F === void 0 && (F = I);
      var U = Object.getOwnPropertyDescriptor(C, I);
      (!U || ("get" in U ? !C.__esModule : U.writable || U.configurable)) && (U = { enumerable: !0, get: function() {
        return C[I];
      } }), Object.defineProperty($, F, U);
    }) : (function($, C, I, F) {
      F === void 0 && (F = I), $[F] = C[I];
    })), l = Dt && Dt.__setModuleDefault || (Object.create ? (function($, C) {
      Object.defineProperty($, "default", { enumerable: !0, value: C });
    }) : function($, C) {
      $.default = C;
    }), d = Dt && Dt.__importStar || function($) {
      if ($ && $.__esModule) return $;
      var C = {};
      if ($ != null) for (var I in $) I !== "default" && Object.prototype.hasOwnProperty.call($, I) && f(C, $, I);
      return l(C, $), C;
    }, s = Dt && Dt.__importDefault || function($) {
      return $ && $.__esModule ? $ : { default: $ };
    };
    Object.defineProperty(c, "__esModule", { value: !0 }), c.Namespace = c.Socket = c.Server = void 0;
    const t = s(gr), a = Ze, r = yn, n = Io(), i = et, p = Pe, o = pv(), h = gv(), u = ht, g = Ff();
    Object.defineProperty(c, "Namespace", { enumerable: !0, get: function() {
      return g.Namespace;
    } });
    const m = yv(), v = Fo(), y = d(xi()), R = s(je()), S = Lf();
    Object.defineProperty(c, "Socket", { enumerable: !0, get: function() {
      return S.Socket;
    } });
    const T = Lo(), b = bv(), w = s(kf()), _ = (0, R.default)("socket.io:server"), E = _v.version, N = /\.map/;
    class k extends T.StrictEventEmitter {
      constructor(C, I = {}) {
        super(), this._nsps = /* @__PURE__ */ new Map(), this.parentNsps = /* @__PURE__ */ new Map(), this.parentNamespacesFromRegExp = /* @__PURE__ */ new Map(), typeof C == "object" && C instanceof Object && !C.listen && (I = C, C = void 0), this.path(I.path || "/socket.io"), this.connectTimeout(I.connectTimeout || 45e3), this.serveClient(I.serveClient !== !1), this._parser = I.parser || y, this.encoder = new this._parser.Encoder(), this.opts = I, I.connectionStateRecovery ? (I.connectionStateRecovery = Object.assign({
          maxDisconnectionDuration: 120 * 1e3,
          skipMiddlewares: !0
        }, I.connectionStateRecovery), this.adapter(I.adapter || v.SessionAwareAdapter)) : this.adapter(I.adapter || v.Adapter), I.cleanupEmptyChildNamespaces = !!I.cleanupEmptyChildNamespaces, this.sockets = this.of("/"), (C || typeof C == "number") && this.attach(C), this.opts.cors && (this._corsMiddleware = (0, w.default)(this.opts.cors));
      }
      get _opts() {
        return this.opts;
      }
      serveClient(C) {
        return arguments.length ? (this._serveClient = C, this) : this._serveClient;
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
      _checkNamespace(C, I, F) {
        if (this.parentNsps.size === 0)
          return F(!1);
        const U = this.parentNsps.keys(), G = () => {
          const W = U.next();
          if (W.done)
            return F(!1);
          W.value(C, I, (re, ae) => {
            if (re || !ae)
              return G();
            if (this._nsps.has(C))
              return _("dynamic namespace %s already exists", C), F(this._nsps.get(C));
            const oe = this.parentNsps.get(W.value).createChild(C);
            _("dynamic namespace %s was created", C), F(oe);
          });
        };
        G();
      }
      path(C) {
        if (!arguments.length)
          return this._path;
        this._path = C.replace(/\/$/, "");
        const I = this._path.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        return this.clientPathRegex = new RegExp("^" + I + "/socket\\.io(\\.msgpack|\\.esm)?(\\.min)?\\.js(\\.map)?(?:\\?|$)"), this;
      }
      connectTimeout(C) {
        return C === void 0 ? this._connectTimeout : (this._connectTimeout = C, this);
      }
      adapter(C) {
        if (!arguments.length)
          return this._adapter;
        this._adapter = C;
        for (const I of this._nsps.values())
          I._initAdapter();
        return this;
      }
      /**
       * Attaches socket.io to a server or port.
       *
       * @param srv - server or port
       * @param opts - options passed to engine.io
       * @return self
       */
      listen(C, I = {}) {
        return this.attach(C, I);
      }
      /**
       * Attaches socket.io to a server or port.
       *
       * @param srv - server or port
       * @param opts - options passed to engine.io
       * @return self
       */
      attach(C, I = {}) {
        if (typeof C == "function") {
          const F = "You are trying to attach socket.io to an express request handler function. Please pass a http.Server instance.";
          throw new Error(F);
        }
        if (Number(C) == C && (C = Number(C)), typeof C == "number") {
          _("creating http server and binding to %d", C);
          const F = C;
          C = t.default.createServer((U, G) => {
            G.writeHead(404), G.end();
          }), C.listen(F);
        }
        return Object.assign(I, this.opts), I.path = I.path || this._path, this.initEngine(C, I), this;
      }
      /**
       * Attaches socket.io to a uWebSockets.js app.
       * @param app
       * @param opts
       */
      attachApp(C, I = {}) {
        Object.assign(I, this.opts), I.path = I.path || this._path, _("creating uWebSockets.js-based engine with opts %j", I);
        const F = new o.uServer(I);
        F.attach(C, I), this.bind(F), this._serveClient && C.get(`${this._path}/*`, (U, G) => {
          if (!this.clientPathRegex.test(G.getUrl())) {
            G.setYield(!0);
            return;
          }
          const W = G.getUrl().replace(this._path, "").replace(/\?.*$/, "").replace(/^\//, ""), re = N.test(W), ae = re ? "map" : "source", oe = '"' + E + '"', ye = "W/" + oe, _e = G.getHeader("if-none-match");
          if (_e && (oe === _e || ye === _e)) {
            _("serve client %s 304", ae), U.writeStatus("304 Not Modified"), U.end();
            return;
          }
          _("serve client %s", ae), U.writeHeader("cache-control", "public, max-age=0"), U.writeHeader("content-type", "application/" + (re ? "json" : "javascript") + "; charset=utf-8"), U.writeHeader("etag", oe);
          const Z = p.join(__dirname, "../client-dist/", W);
          (0, b.serveFile)(U, Z);
        }), (0, b.patchAdapter)(C);
      }
      /**
       * Initialize engine
       *
       * @param srv - the server to attach to
       * @param opts - options passed to engine.io
       * @private
       */
      initEngine(C, I) {
        _("creating engine.io instance with opts %j", I), this.eio = (0, o.attach)(C, I), this._serveClient && this.attachServe(C), this.httpServer = C, this.bind(this.eio);
      }
      /**
       * Attaches the static file serving.
       *
       * @param srv http server
       * @private
       */
      attachServe(C) {
        _("attaching client serving req handler");
        const I = C.listeners("request").slice(0);
        C.removeAllListeners("request"), C.on("request", (F, U) => {
          if (this.clientPathRegex.test(F.url))
            this._corsMiddleware ? this._corsMiddleware(F, U, () => {
              this.serve(F, U);
            }) : this.serve(F, U);
          else
            for (let G = 0; G < I.length; G++)
              I[G].call(C, F, U);
        });
      }
      /**
       * Handles a request serving of client source and map
       *
       * @param req
       * @param res
       * @private
       */
      serve(C, I) {
        const F = C.url.replace(this._path, "").replace(/\?.*$/, ""), U = N.test(F), G = U ? "map" : "source", W = '"' + E + '"', re = "W/" + W, ae = C.headers["if-none-match"];
        if (ae && (W === ae || re === ae)) {
          _("serve client %s 304", G), I.writeHead(304), I.end();
          return;
        }
        _("serve client %s", G), I.setHeader("Cache-Control", "public, max-age=0"), I.setHeader("Content-Type", "application/" + (U ? "json" : "javascript") + "; charset=utf-8"), I.setHeader("ETag", W), k.sendFile(F, C, I);
      }
      /**
       * @param filename
       * @param req
       * @param res
       * @private
       */
      static sendFile(C, I, F) {
        const U = (0, a.createReadStream)(p.join(__dirname, "../client-dist/", C)), G = n(I).encodings(["br", "gzip", "deflate"]), W = (re) => {
          re && F.end();
        };
        switch (G) {
          case "br":
            F.writeHead(200, { "content-encoding": "br" }), (0, i.pipeline)(U, (0, r.createBrotliCompress)(), F, W);
            break;
          case "gzip":
            F.writeHead(200, { "content-encoding": "gzip" }), (0, i.pipeline)(U, (0, r.createGzip)(), F, W);
            break;
          case "deflate":
            F.writeHead(200, { "content-encoding": "deflate" }), (0, i.pipeline)(U, (0, r.createDeflate)(), F, W);
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
      bind(C) {
        return this.engine = C, this.engine.on("connection", this.onconnection.bind(this)), this;
      }
      /**
       * Called with each incoming transport connection.
       *
       * @param {engine.Socket} conn
       * @return self
       * @private
       */
      onconnection(C) {
        _("incoming connection with id %s", C.id);
        const I = new h.Client(this, C);
        return C.protocol === 3 && I.connect("/"), this;
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
      of(C, I) {
        if (typeof C == "function" || C instanceof RegExp) {
          const U = new m.ParentNamespace(this);
          return _("initializing parent namespace %s", U.name), typeof C == "function" ? this.parentNsps.set(C, U) : (this.parentNsps.set((G, W, re) => re(null, C.test(G)), U), this.parentNamespacesFromRegExp.set(C, U)), I && U.on("connect", I), U;
        }
        String(C)[0] !== "/" && (C = "/" + C);
        let F = this._nsps.get(C);
        if (!F) {
          for (const [U, G] of this.parentNamespacesFromRegExp)
            if (U.test(C))
              return _("attaching namespace %s to parent namespace %s", C, U), G.createChild(C);
          _("initializing namespace %s", C), F = new g.Namespace(this, C), this._nsps.set(C, F), C !== "/" && this.sockets.emitReserved("new_namespace", F);
        }
        return I && F.on("connect", I), F;
      }
      /**
       * Closes server connection
       *
       * @param [fn] optional, called as `fn([err])` on error OR all conns closed
       */
      async close(C) {
        if (await Promise.allSettled([...this._nsps.values()].map(async (I) => {
          I.sockets.forEach((F) => {
            F._onclose("server shutting down");
          }), await I.adapter.close();
        })), this.engine.close(), (0, b.restoreAdapter)(), this.httpServer)
          return new Promise((I) => {
            this.httpServer.close((F) => {
              C && C(F), F && _("server was not running"), I();
            });
          });
        C && C();
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
      use(C) {
        return this.sockets.use(C), this;
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
      to(C) {
        return this.sockets.to(C);
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
      in(C) {
        return this.sockets.in(C);
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
      except(C) {
        return this.sockets.except(C);
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
      send(...C) {
        return this.sockets.emit("message", ...C), this;
      }
      /**
       * Sends a `message` event to all clients. Alias of {@link send}.
       *
       * @return self
       */
      write(...C) {
        return this.sockets.emit("message", ...C), this;
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
      serverSideEmit(C, ...I) {
        return this.sockets.serverSideEmit(C, ...I);
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
      serverSideEmitWithAck(C, ...I) {
        return this.sockets.serverSideEmitWithAck(C, ...I);
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
      compress(C) {
        return this.sockets.compress(C);
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
      timeout(C) {
        return this.sockets.timeout(C);
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
      socketsJoin(C) {
        return this.sockets.socketsJoin(C);
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
      socketsLeave(C) {
        return this.sockets.socketsLeave(C);
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
      disconnectSockets(C = !1) {
        return this.sockets.disconnectSockets(C);
      }
    }
    c.Server = k, Object.keys(u.EventEmitter.prototype).filter(function($) {
      return typeof u.EventEmitter.prototype[$] == "function";
    }).forEach(function($) {
      k.prototype[$] = function() {
        return this.sockets[$].apply(this.sockets, arguments);
      };
    }), e.exports = ($, C) => new k($, C), e.exports.Server = k, e.exports.Namespace = g.Namespace, e.exports.Socket = S.Socket;
  })(fr, fr.exports)), fr.exports;
}
var Sv = Ev();
const Tv = /* @__PURE__ */ vr(Sv), { Server: Rv, Namespace: wb, Socket: _b } = Tv;
var en = { exports: {} }, Xa, dd;
function Cv() {
  if (dd) return Xa;
  dd = 1, Xa = l, l.sync = d;
  var e = Ze;
  function c(s, t) {
    var a = t.pathExt !== void 0 ? t.pathExt : process.env.PATHEXT;
    if (!a || (a = a.split(";"), a.indexOf("") !== -1))
      return !0;
    for (var r = 0; r < a.length; r++) {
      var n = a[r].toLowerCase();
      if (n && s.substr(-n.length).toLowerCase() === n)
        return !0;
    }
    return !1;
  }
  function f(s, t, a) {
    return !s.isSymbolicLink() && !s.isFile() ? !1 : c(t, a);
  }
  function l(s, t, a) {
    e.stat(s, function(r, n) {
      a(r, r ? !1 : f(n, s, t));
    });
  }
  function d(s, t) {
    return f(e.statSync(s), s, t);
  }
  return Xa;
}
var Ja, fd;
function Av() {
  if (fd) return Ja;
  fd = 1, Ja = c, c.sync = f;
  var e = Ze;
  function c(s, t, a) {
    e.stat(s, function(r, n) {
      a(r, r ? !1 : l(n, t));
    });
  }
  function f(s, t) {
    return l(e.statSync(s), t);
  }
  function l(s, t) {
    return s.isFile() && d(s, t);
  }
  function d(s, t) {
    var a = s.mode, r = s.uid, n = s.gid, i = t.uid !== void 0 ? t.uid : process.getuid && process.getuid(), p = t.gid !== void 0 ? t.gid : process.getgid && process.getgid(), o = parseInt("100", 8), h = parseInt("010", 8), u = parseInt("001", 8), g = o | h, m = a & u || a & h && n === p || a & o && r === i || a & g && i === 0;
    return m;
  }
  return Ja;
}
var Qa, hd;
function Ov() {
  if (hd) return Qa;
  hd = 1;
  var e;
  process.platform === "win32" || qe.TESTING_WINDOWS ? e = Cv() : e = Av(), Qa = c, c.sync = f;
  function c(l, d, s) {
    if (typeof d == "function" && (s = d, d = {}), !s) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(t, a) {
        c(l, d || {}, function(r, n) {
          r ? a(r) : t(n);
        });
      });
    }
    e(l, d || {}, function(t, a) {
      t && (t.code === "EACCES" || d && d.ignoreErrors) && (t = null, a = !1), s(t, a);
    });
  }
  function f(l, d) {
    try {
      return e.sync(l, d || {});
    } catch (s) {
      if (d && d.ignoreErrors || s.code === "EACCES")
        return !1;
      throw s;
    }
  }
  return Qa;
}
var Za, md;
function kv() {
  if (md) return Za;
  md = 1;
  const e = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", c = Pe, f = e ? ";" : ":", l = Ov(), d = (r) => Object.assign(new Error(`not found: ${r}`), { code: "ENOENT" }), s = (r, n) => {
    const i = n.colon || f, p = r.match(/\//) || e && r.match(/\\/) ? [""] : [
      // windows always checks the cwd first
      ...e ? [process.cwd()] : [],
      ...(n.path || process.env.PATH || /* istanbul ignore next: very unusual */
      "").split(i)
    ], o = e ? n.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", h = e ? o.split(i) : [""];
    return e && r.indexOf(".") !== -1 && h[0] !== "" && h.unshift(""), {
      pathEnv: p,
      pathExt: h,
      pathExtExe: o
    };
  }, t = (r, n, i) => {
    typeof n == "function" && (i = n, n = {}), n || (n = {});
    const { pathEnv: p, pathExt: o, pathExtExe: h } = s(r, n), u = [], g = (v) => new Promise((y, R) => {
      if (v === p.length)
        return n.all && u.length ? y(u) : R(d(r));
      const S = p[v], T = /^".*"$/.test(S) ? S.slice(1, -1) : S, b = c.join(T, r), w = !T && /^\.[\\\/]/.test(r) ? r.slice(0, 2) + b : b;
      y(m(w, v, 0));
    }), m = (v, y, R) => new Promise((S, T) => {
      if (R === o.length)
        return S(g(y + 1));
      const b = o[R];
      l(v + b, { pathExt: h }, (w, _) => {
        if (!w && _)
          if (n.all)
            u.push(v + b);
          else
            return S(v + b);
        return S(m(v, y, R + 1));
      });
    });
    return i ? g(0).then((v) => i(null, v), i) : g(0);
  }, a = (r, n) => {
    n = n || {};
    const { pathEnv: i, pathExt: p, pathExtExe: o } = s(r, n), h = [];
    for (let u = 0; u < i.length; u++) {
      const g = i[u], m = /^".*"$/.test(g) ? g.slice(1, -1) : g, v = c.join(m, r), y = !m && /^\.[\\\/]/.test(r) ? r.slice(0, 2) + v : v;
      for (let R = 0; R < p.length; R++) {
        const S = y + p[R];
        try {
          if (l.sync(S, { pathExt: o }))
            if (n.all)
              h.push(S);
            else
              return S;
        } catch {
        }
      }
    }
    if (n.all && h.length)
      return h;
    if (n.nothrow)
      return null;
    throw d(r);
  };
  return Za = t, t.sync = a, Za;
}
var Zr = { exports: {} }, gd;
function Pv() {
  if (gd) return Zr.exports;
  gd = 1;
  const e = (c = {}) => {
    const f = c.env || process.env;
    return (c.platform || process.platform) !== "win32" ? "PATH" : Object.keys(f).reverse().find((d) => d.toUpperCase() === "PATH") || "Path";
  };
  return Zr.exports = e, Zr.exports.default = e, Zr.exports;
}
var eo, vd;
function Iv() {
  if (vd) return eo;
  vd = 1;
  const e = Pe, c = kv(), f = Pv();
  function l(s, t) {
    const a = s.options.env || process.env, r = process.cwd(), n = s.options.cwd != null, i = n && process.chdir !== void 0 && !process.chdir.disabled;
    if (i)
      try {
        process.chdir(s.options.cwd);
      } catch {
      }
    let p;
    try {
      p = c.sync(s.command, {
        path: a[f({ env: a })],
        pathExt: t ? e.delimiter : void 0
      });
    } catch {
    } finally {
      i && process.chdir(r);
    }
    return p && (p = e.resolve(n ? s.options.cwd : "", p)), p;
  }
  function d(s) {
    return l(s) || l(s, !0);
  }
  return eo = d, eo;
}
var ei = {}, xd;
function Nv() {
  if (xd) return ei;
  xd = 1;
  const e = /([()\][%!^"`<>&|;, *?])/g;
  function c(l) {
    return l = l.replace(e, "^$1"), l;
  }
  function f(l, d) {
    return l = `${l}`, l = l.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"'), l = l.replace(/(?=(\\+?)?)\1$/, "$1$1"), l = `"${l}"`, l = l.replace(e, "^$1"), d && (l = l.replace(e, "^$1")), l;
  }
  return ei.command = c, ei.argument = f, ei;
}
var to, yd;
function Dv() {
  return yd || (yd = 1, to = /^#!(.*)/), to;
}
var no, bd;
function Lv() {
  if (bd) return no;
  bd = 1;
  const e = Dv();
  return no = (c = "") => {
    const f = c.match(e);
    if (!f)
      return null;
    const [l, d] = f[0].replace(/#! ?/, "").split(" "), s = l.split("/").pop();
    return s === "env" ? d : d ? `${s} ${d}` : s;
  }, no;
}
var ro, wd;
function Fv() {
  if (wd) return ro;
  wd = 1;
  const e = Ze, c = Lv();
  function f(l) {
    const s = Buffer.alloc(150);
    let t;
    try {
      t = e.openSync(l, "r"), e.readSync(t, s, 0, 150, 0), e.closeSync(t);
    } catch {
    }
    return c(s.toString());
  }
  return ro = f, ro;
}
var io, _d;
function Uv() {
  if (_d) return io;
  _d = 1;
  const e = Pe, c = Iv(), f = Nv(), l = Fv(), d = process.platform === "win32", s = /\.(?:com|exe)$/i, t = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function a(i) {
    i.file = c(i);
    const p = i.file && l(i.file);
    return p ? (i.args.unshift(i.file), i.command = p, c(i)) : i.file;
  }
  function r(i) {
    if (!d)
      return i;
    const p = a(i), o = !s.test(p);
    if (i.options.forceShell || o) {
      const h = t.test(p);
      i.command = e.normalize(i.command), i.command = f.command(i.command), i.args = i.args.map((g) => f.argument(g, h));
      const u = [i.command].concat(i.args).join(" ");
      i.args = ["/d", "/s", "/c", `"${u}"`], i.command = process.env.comspec || "cmd.exe", i.options.windowsVerbatimArguments = !0;
    }
    return i;
  }
  function n(i, p, o) {
    p && !Array.isArray(p) && (o = p, p = null), p = p ? p.slice(0) : [], o = Object.assign({}, o);
    const h = {
      command: i,
      args: p,
      options: o,
      file: void 0,
      original: {
        command: i,
        args: p
      }
    };
    return o.shell ? h : r(h);
  }
  return io = n, io;
}
var so, Ed;
function $v() {
  if (Ed) return so;
  Ed = 1;
  const e = process.platform === "win32";
  function c(s, t) {
    return Object.assign(new Error(`${t} ${s.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${t} ${s.command}`,
      path: s.command,
      spawnargs: s.args
    });
  }
  function f(s, t) {
    if (!e)
      return;
    const a = s.emit;
    s.emit = function(r, n) {
      if (r === "exit") {
        const i = l(n, t);
        if (i)
          return a.call(s, "error", i);
      }
      return a.apply(s, arguments);
    };
  }
  function l(s, t) {
    return e && s === 1 && !t.file ? c(t.original, "spawn") : null;
  }
  function d(s, t) {
    return e && s === 1 && !t.file ? c(t.original, "spawnSync") : null;
  }
  return so = {
    hookChildProcess: f,
    verifyENOENT: l,
    verifyENOENTSync: d,
    notFoundError: c
  }, so;
}
var Sd;
function qv() {
  if (Sd) return en.exports;
  Sd = 1;
  const e = hr, c = Uv(), f = $v();
  function l(s, t, a) {
    const r = c(s, t, a), n = e.spawn(r.command, r.args, r.options);
    return f.hookChildProcess(n, r), n;
  }
  function d(s, t, a) {
    const r = c(s, t, a), n = e.spawnSync(r.command, r.args, r.options);
    return n.error = n.error || f.verifyENOENTSync(n.status, r), n;
  }
  return en.exports = l, en.exports.spawn = l, en.exports.sync = d, en.exports._parse = c, en.exports._enoent = f, en.exports;
}
var Bv = qv();
const jv = /* @__PURE__ */ vr(Bv);
function Mv(e) {
  const c = typeof e == "string" ? `
` : 10, f = typeof e == "string" ? "\r" : 13;
  return e[e.length - 1] === c && (e = e.slice(0, -1)), e[e.length - 1] === f && (e = e.slice(0, -1)), e;
}
function $f(e = {}) {
  const {
    env: c = process.env,
    platform: f = process.platform
  } = e;
  return f !== "win32" ? "PATH" : Object.keys(c).reverse().find((l) => l.toUpperCase() === "PATH") || "Path";
}
const Hv = ({
  cwd: e = xt.cwd(),
  path: c = xt.env[$f()],
  preferLocal: f = !0,
  execPath: l = xt.execPath,
  addExecPath: d = !0
} = {}) => {
  const s = e instanceof URL ? go(e) : e, t = it.resolve(s), a = [];
  return f && Gv(a, t), d && zv(a, l, t), [...a, c].join(it.delimiter);
}, Gv = (e, c) => {
  let f;
  for (; f !== c; )
    e.push(it.join(c, "node_modules/.bin")), f = c, c = it.resolve(c, "..");
}, zv = (e, c, f) => {
  const l = c instanceof URL ? go(c) : c;
  e.push(it.resolve(f, l, ".."));
}, Wv = ({ env: e = xt.env, ...c } = {}) => {
  e = { ...e };
  const f = $f({ env: e });
  return c.path = e[f], e[f] = Hv(c), e;
}, Vv = (e, c, f, l) => {
  if (f === "length" || f === "prototype" || f === "arguments" || f === "caller")
    return;
  const d = Object.getOwnPropertyDescriptor(e, f), s = Object.getOwnPropertyDescriptor(c, f);
  !Yv(d, s) && l || Object.defineProperty(e, f, s);
}, Yv = function(e, c) {
  return e === void 0 || e.configurable || e.writable === c.writable && e.enumerable === c.enumerable && e.configurable === c.configurable && (e.writable || e.value === c.value);
}, Kv = (e, c) => {
  const f = Object.getPrototypeOf(c);
  f !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, f);
}, Xv = (e, c) => `/* Wrapped ${e}*/
${c}`, Jv = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Qv = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Zv = (e, c, f) => {
  const l = f === "" ? "" : `with ${f.trim()}() `, d = Xv.bind(null, l, c.toString());
  Object.defineProperty(d, "name", Qv), Object.defineProperty(e, "toString", { ...Jv, value: d });
};
function ex(e, c, { ignoreNonConfigurable: f = !1 } = {}) {
  const { name: l } = e;
  for (const d of Reflect.ownKeys(c))
    Vv(e, c, d, f);
  return Kv(e, c), Zv(e, c, l), e;
}
const si = /* @__PURE__ */ new WeakMap(), qf = (e, c = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let f, l = 0;
  const d = e.displayName || e.name || "<anonymous>", s = function(...t) {
    if (si.set(s, ++l), l === 1)
      f = e.apply(this, t), e = null;
    else if (c.throw === !0)
      throw new Error(`Function \`${d}\` can only be called once`);
    return f;
  };
  return ex(s, e), si.set(s, l), s;
};
qf.callCount = (e) => {
  if (!si.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return si.get(e);
};
const tx = () => {
  const e = jf - Bf + 1;
  return Array.from({ length: e }, nx);
}, nx = (e, c) => ({
  name: `SIGRT${c + 1}`,
  number: Bf + c,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
}), Bf = 34, jf = 64, rx = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
], Mf = () => {
  const e = tx();
  return [...rx, ...e].map(ix);
}, ix = ({
  name: e,
  number: c,
  description: f,
  action: l,
  forced: d = !1,
  standard: s
}) => {
  const {
    signals: { [e]: t }
  } = $d, a = t !== void 0;
  return { name: e, number: a ? t : c, description: f, supported: a, action: l, forced: d, standard: s };
}, sx = () => {
  const e = Mf();
  return Object.fromEntries(e.map(ax));
}, ax = ({
  name: e,
  number: c,
  description: f,
  supported: l,
  action: d,
  forced: s,
  standard: t
}) => [e, { name: e, number: c, description: f, supported: l, action: d, forced: s, standard: t }], ox = sx(), cx = () => {
  const e = Mf(), c = jf + 1, f = Array.from({ length: c }, (l, d) => lx(d, e));
  return Object.assign({}, ...f);
}, lx = (e, c) => {
  const f = ux(e, c);
  if (f === void 0)
    return {};
  const { name: l, description: d, supported: s, action: t, forced: a, standard: r } = f;
  return {
    [e]: {
      name: l,
      number: e,
      description: d,
      supported: s,
      action: t,
      forced: a,
      standard: r
    }
  };
}, ux = (e, c) => {
  const f = c.find(({ name: l }) => $d.signals[l] === e);
  return f !== void 0 ? f : c.find((l) => l.number === e);
};
cx();
const px = ({ timedOut: e, timeout: c, errorCode: f, signal: l, signalDescription: d, exitCode: s, isCanceled: t }) => e ? `timed out after ${c} milliseconds` : t ? "was canceled" : f !== void 0 ? `failed with ${f}` : l !== void 0 ? `was killed with ${l} (${d})` : s !== void 0 ? `failed with exit code ${s}` : "failed", Td = ({
  stdout: e,
  stderr: c,
  all: f,
  error: l,
  signal: d,
  exitCode: s,
  command: t,
  escapedCommand: a,
  timedOut: r,
  isCanceled: n,
  killed: i,
  parsed: { options: { timeout: p, cwd: o = xt.cwd() } }
}) => {
  s = s === null ? void 0 : s, d = d === null ? void 0 : d;
  const h = d === void 0 ? void 0 : ox[d].description, u = l && l.code, m = `Command ${px({ timedOut: r, timeout: p, errorCode: u, signal: d, signalDescription: h, exitCode: s, isCanceled: n })}: ${t}`, v = Object.prototype.toString.call(l) === "[object Error]", y = v ? `${m}
${l.message}` : m, R = [y, c, e].filter(Boolean).join(`
`);
  return v ? (l.originalMessage = l.message, l.message = R) : l = new Error(R), l.shortMessage = y, l.command = t, l.escapedCommand = a, l.exitCode = s, l.signal = d, l.signalDescription = h, l.stdout = e, l.stderr = c, l.cwd = o, f !== void 0 && (l.all = f), "bufferedData" in l && delete l.bufferedData, l.failed = !0, l.timedOut = !!r, l.isCanceled = n, l.killed = i && !r, l;
}, ii = ["stdin", "stdout", "stderr"], dx = (e) => ii.some((c) => e[c] !== void 0), fx = (e) => {
  if (!e)
    return;
  const { stdio: c } = e;
  if (c === void 0)
    return ii.map((l) => e[l]);
  if (dx(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${ii.map((l) => `\`${l}\``).join(", ")}`);
  if (typeof c == "string")
    return c;
  if (!Array.isArray(c))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof c}\``);
  const f = Math.max(c.length, ii.length);
  return Array.from({ length: f }, (l, d) => c[d]);
};
var tn = { exports: {} }, ao = { exports: {} }, Rd;
function hx() {
  return Rd || (Rd = 1, (function(e) {
    e.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ], process.platform !== "win32" && e.exports.push(
      "SIGVTALRM",
      "SIGXCPU",
      "SIGXFSZ",
      "SIGUSR2",
      "SIGTRAP",
      "SIGSYS",
      "SIGQUIT",
      "SIGIOT"
      // should detect profiler and enable/disable accordingly.
      // see #21
      // 'SIGPROF'
    ), process.platform === "linux" && e.exports.push(
      "SIGIO",
      "SIGPOLL",
      "SIGPWR",
      "SIGSTKFLT",
      "SIGUNUSED"
    );
  })(ao)), ao.exports;
}
var Cd;
function mx() {
  if (Cd) return tn.exports;
  Cd = 1;
  var e = qe.process;
  const c = function(m) {
    return m && typeof m == "object" && typeof m.removeListener == "function" && typeof m.emit == "function" && typeof m.reallyExit == "function" && typeof m.listeners == "function" && typeof m.kill == "function" && typeof m.pid == "number" && typeof m.on == "function";
  };
  if (!c(e))
    tn.exports = function() {
      return function() {
      };
    };
  else {
    var f = vo, l = hx(), d = /^win/i.test(e.platform), s = ht;
    typeof s != "function" && (s = s.EventEmitter);
    var t;
    e.__signal_exit_emitter__ ? t = e.__signal_exit_emitter__ : (t = e.__signal_exit_emitter__ = new s(), t.count = 0, t.emitted = {}), t.infinite || (t.setMaxListeners(1 / 0), t.infinite = !0), tn.exports = function(m, v) {
      if (!c(qe.process))
        return function() {
        };
      f.equal(typeof m, "function", "a callback must be provided for exit handler"), i === !1 && p();
      var y = "exit";
      v && v.alwaysLast && (y = "afterexit");
      var R = function() {
        t.removeListener(y, m), t.listeners("exit").length === 0 && t.listeners("afterexit").length === 0 && a();
      };
      return t.on(y, m), R;
    };
    var a = function() {
      !i || !c(qe.process) || (i = !1, l.forEach(function(v) {
        try {
          e.removeListener(v, n[v]);
        } catch {
        }
      }), e.emit = u, e.reallyExit = o, t.count -= 1);
    };
    tn.exports.unload = a;
    var r = function(v, y, R) {
      t.emitted[v] || (t.emitted[v] = !0, t.emit(v, y, R));
    }, n = {};
    l.forEach(function(m) {
      n[m] = function() {
        if (c(qe.process)) {
          var y = e.listeners(m);
          y.length === t.count && (a(), r("exit", null, m), r("afterexit", null, m), d && m === "SIGHUP" && (m = "SIGINT"), e.kill(e.pid, m));
        }
      };
    }), tn.exports.signals = function() {
      return l;
    };
    var i = !1, p = function() {
      i || !c(qe.process) || (i = !0, t.count += 1, l = l.filter(function(v) {
        try {
          return e.on(v, n[v]), !0;
        } catch {
          return !1;
        }
      }), e.emit = g, e.reallyExit = h);
    };
    tn.exports.load = p;
    var o = e.reallyExit, h = function(v) {
      c(qe.process) && (e.exitCode = v || /* istanbul ignore next */
      0, r("exit", e.exitCode, null), r("afterexit", e.exitCode, null), o.call(e, e.exitCode));
    }, u = e.emit, g = function(v, y) {
      if (v === "exit" && c(qe.process)) {
        y !== void 0 && (e.exitCode = y);
        var R = u.apply(this, arguments);
        return r("exit", e.exitCode, null), r("afterexit", e.exitCode, null), R;
      } else
        return u.apply(this, arguments);
    };
  }
  return tn.exports;
}
var gx = mx();
const vx = /* @__PURE__ */ vr(gx), xx = 1e3 * 5, yx = (e, c = "SIGTERM", f = {}) => {
  const l = e(c);
  return bx(e, c, f, l), l;
}, bx = (e, c, f, l) => {
  if (!wx(c, f, l))
    return;
  const d = Ex(f), s = setTimeout(() => {
    e("SIGKILL");
  }, d);
  s.unref && s.unref();
}, wx = (e, { forceKillAfterTimeout: c }, f) => _x(e) && c !== !1 && f, _x = (e) => e === Vh.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", Ex = ({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return xx;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, Sx = (e, c) => {
  e.kill() && (c.isCanceled = !0);
}, Tx = (e, c, f) => {
  e.kill(c), f(Object.assign(new Error("Timed out"), { timedOut: !0, signal: c }));
}, Rx = (e, { timeout: c, killSignal: f = "SIGTERM" }, l) => {
  if (c === 0 || c === void 0)
    return l;
  let d;
  const s = new Promise((a, r) => {
    d = setTimeout(() => {
      Tx(e, f, r);
    }, c);
  }), t = l.finally(() => {
    clearTimeout(d);
  });
  return Promise.race([s, t]);
}, Cx = ({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, Ax = async (e, { cleanup: c, detached: f }, l) => {
  if (!c || f)
    return l;
  const d = vx(() => {
    e.kill();
  });
  return l.finally(() => {
    d();
  });
};
function Hf(e) {
  return e !== null && typeof e == "object" && typeof e.pipe == "function";
}
function Ad(e) {
  return Hf(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
}
const Ox = (e) => e instanceof jh && typeof e.then == "function", oo = (e, c, f) => {
  if (typeof f == "string")
    return e[c].pipe(Hh(f)), e;
  if (Ad(f))
    return e[c].pipe(f), e;
  if (!Ox(f))
    throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
  if (!Ad(f.stdin))
    throw new TypeError("The target child process's stdin must be available.");
  return e[c].pipe(f.stdin), f;
}, kx = (e) => {
  e.stdout !== null && (e.pipeStdout = oo.bind(void 0, e, "stdout")), e.stderr !== null && (e.pipeStderr = oo.bind(void 0, e, "stderr")), e.all !== void 0 && (e.pipeAll = oo.bind(void 0, e, "all"));
};
var mn = { exports: {} }, co, Od;
function Px() {
  if (Od) return co;
  Od = 1;
  const { PassThrough: e } = et;
  return co = (c) => {
    c = { ...c };
    const { array: f } = c;
    let { encoding: l } = c;
    const d = l === "buffer";
    let s = !1;
    f ? s = !(l || d) : l = l || "utf8", d && (l = null);
    const t = new e({ objectMode: s });
    l && t.setEncoding(l);
    let a = 0;
    const r = [];
    return t.on("data", (n) => {
      r.push(n), s ? a = r.length : a += n.length;
    }), t.getBufferedValue = () => f ? r : d ? Buffer.concat(r, a) : r.join(""), t.getBufferedLength = () => a, t;
  }, co;
}
var kd;
function Ix() {
  if (kd) return mn.exports;
  kd = 1;
  const { constants: e } = Bd, c = et, { promisify: f } = oi, l = Px(), d = f(c.pipeline);
  class s extends Error {
    constructor() {
      super("maxBuffer exceeded"), this.name = "MaxBufferError";
    }
  }
  async function t(a, r) {
    if (!a)
      throw new Error("Expected a stream");
    r = {
      maxBuffer: 1 / 0,
      ...r
    };
    const { maxBuffer: n } = r, i = l(r);
    return await new Promise((p, o) => {
      const h = (u) => {
        u && i.getBufferedLength() <= e.MAX_LENGTH && (u.bufferedData = i.getBufferedValue()), o(u);
      };
      (async () => {
        try {
          await d(a, i), p();
        } catch (u) {
          h(u);
        }
      })(), i.on("data", () => {
        i.getBufferedLength() > n && h(new s());
      });
    }), i.getBufferedValue();
  }
  return mn.exports = t, mn.exports.buffer = (a, r) => t(a, { ...r, encoding: "buffer" }), mn.exports.array = (a, r) => t(a, { ...r, array: !0 }), mn.exports.MaxBufferError = s, mn.exports;
}
var Nx = Ix();
const Pd = /* @__PURE__ */ vr(Nx);
var lo, Id;
function Dx() {
  if (Id) return lo;
  Id = 1;
  const { PassThrough: e } = et;
  return lo = function() {
    var c = [], f = new e({ objectMode: !0 });
    return f.setMaxListeners(0), f.add = l, f.isEmpty = d, f.on("unpipe", s), Array.prototype.slice.call(arguments).forEach(l), f;
    function l(t) {
      return Array.isArray(t) ? (t.forEach(l), this) : (c.push(t), t.once("end", s.bind(null, t)), t.once("error", f.emit.bind(f, "error")), t.pipe(f, { end: !1 }), this);
    }
    function d() {
      return c.length == 0;
    }
    function s(t) {
      c = c.filter(function(a) {
        return a !== t;
      }), !c.length && f.readable && f.end();
    }
  }, lo;
}
var Lx = Dx();
const Fx = /* @__PURE__ */ vr(Lx), Ux = (e) => {
  if (e !== void 0)
    throw new TypeError("The `input` and `inputFile` options cannot be both set.");
}, $x = ({ input: e, inputFile: c }) => typeof c != "string" ? e : (Ux(e), Gh(c)), qx = (e, c) => {
  const f = $x(c);
  f !== void 0 && (Hf(f) ? f.pipe(e.stdin) : e.stdin.end(f));
}, Bx = (e, { all: c }) => {
  if (!c || !e.stdout && !e.stderr)
    return;
  const f = Fx();
  return e.stdout && f.add(e.stdout), e.stderr && f.add(e.stderr), f;
}, uo = async (e, c) => {
  if (!(!e || c === void 0)) {
    e.destroy();
    try {
      return await c;
    } catch (f) {
      return f.bufferedData;
    }
  }
}, po = (e, { encoding: c, buffer: f, maxBuffer: l }) => {
  if (!(!e || !f))
    return c ? Pd(e, { encoding: c, maxBuffer: l }) : Pd.buffer(e, { maxBuffer: l });
}, jx = async ({ stdout: e, stderr: c, all: f }, { encoding: l, buffer: d, maxBuffer: s }, t) => {
  const a = po(e, { encoding: l, buffer: d, maxBuffer: s }), r = po(c, { encoding: l, buffer: d, maxBuffer: s }), n = po(f, { encoding: l, buffer: d, maxBuffer: s * 2 });
  try {
    return await Promise.all([t, a, r, n]);
  } catch (i) {
    return Promise.all([
      { error: i, signal: i.signal, timedOut: i.timedOut },
      uo(e, a),
      uo(c, r),
      uo(f, n)
    ]);
  }
}, Mx = (async () => {
})().constructor.prototype, Hx = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(Mx, e)
]), Nd = (e, c) => {
  for (const [f, l] of Hx) {
    const d = typeof c == "function" ? (...s) => Reflect.apply(l.value, c(), s) : l.value.bind(c);
    Reflect.defineProperty(e, f, { ...l, value: d });
  }
}, Gx = (e) => new Promise((c, f) => {
  e.on("exit", (l, d) => {
    c({ exitCode: l, signal: d });
  }), e.on("error", (l) => {
    f(l);
  }), e.stdin && e.stdin.on("error", (l) => {
    f(l);
  });
}), Gf = (e, c = []) => Array.isArray(c) ? [e, ...c] : [e], zx = /^[\w.-]+$/, Wx = /"/g, Vx = (e) => typeof e != "string" || zx.test(e) ? e : `"${e.replace(Wx, '\\"')}"`, Yx = (e, c) => Gf(e, c).join(" "), Kx = (e, c) => Gf(e, c).map((f) => Vx(f)).join(" "), Xx = am("execa").enabled, ti = (e, c) => String(e).padStart(c, "0"), Jx = () => {
  const e = /* @__PURE__ */ new Date();
  return `${ti(e.getHours(), 2)}:${ti(e.getMinutes(), 2)}:${ti(e.getSeconds(), 2)}.${ti(e.getMilliseconds(), 3)}`;
}, Qx = (e, { verbose: c }) => {
  c && xt.stderr.write(`[${Jx()}] ${e}
`);
}, Zx = 1e3 * 1e3 * 100, ey = ({ env: e, extendEnv: c, preferLocal: f, localDir: l, execPath: d }) => {
  const s = c ? { ...xt.env, ...e } : e;
  return f ? Wv({ env: s, cwd: l, execPath: d }) : s;
}, ty = (e, c, f = {}) => {
  const l = jv._parse(e, c, f);
  return e = l.command, c = l.args, f = l.options, f = {
    maxBuffer: Zx,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: f.cwd || xt.cwd(),
    execPath: xt.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    verbose: Xx,
    ...f
  }, f.env = ey(f), f.stdio = fx(f), xt.platform === "win32" && it.basename(e, ".exe") === "cmd" && c.unshift("/q"), { file: e, args: c, options: f, parsed: l };
}, fo = (e, c, f) => typeof c != "string" && !sm.isBuffer(c) ? f === void 0 ? void 0 : "" : e.stripFinalNewline ? Mv(c) : c;
function Tt(e, c, f) {
  const l = ty(e, c, f), d = Yx(e, c), s = Kx(e, c);
  Qx(s, l.options), Cx(l.options);
  let t;
  try {
    t = Ko.spawn(l.file, l.args, l.options);
  } catch (h) {
    const u = new Ko.ChildProcess(), g = Promise.reject(Td({
      error: h,
      stdout: "",
      stderr: "",
      all: "",
      command: d,
      escapedCommand: s,
      parsed: l,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    return Nd(u, g), u;
  }
  const a = Gx(t), r = Rx(t, l.options, a), n = Ax(t, l.options, r), i = { isCanceled: !1 };
  t.kill = yx.bind(null, t.kill.bind(t)), t.cancel = Sx.bind(null, t, i);
  const o = qf(async () => {
    const [{ error: h, exitCode: u, signal: g, timedOut: m }, v, y, R] = await jx(t, l.options, n), S = fo(l.options, v), T = fo(l.options, y), b = fo(l.options, R);
    if (h || u !== 0 || g !== null) {
      const w = Td({
        error: h,
        exitCode: u,
        signal: g,
        stdout: S,
        stderr: T,
        all: b,
        command: d,
        escapedCommand: s,
        parsed: l,
        timedOut: m,
        isCanceled: i.isCanceled || (l.options.signal ? l.options.signal.aborted : !1),
        killed: t.killed
      });
      if (!l.options.reject)
        return w;
      throw w;
    }
    return {
      command: d,
      escapedCommand: s,
      exitCode: 0,
      stdout: S,
      stderr: T,
      all: b,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  });
  return qx(t, l.options), t.all = Bx(t, l.options), kx(t), Nd(t, o), t;
}
const Rt = Yh(), ni = /* @__PURE__ */ new Set(["default", "0.0.0.0", "0.0.0.0/0", "::", "::/0"]);
let vt;
if (Rt === "linux") {
  const e = (c, f) => {
    for (const l of (c || "").trim().split(`
`)) {
      const d = /default( via .+?)?( dev .+?)( |$)/.exec(l) || [], s = (d[1] || "").substring(5), t = (d[2] || "").substring(5);
      if (s && kt(s))
        return { gateway: s, version: f, int: t ?? null };
      if (t && !s) {
        const r = ho()[t];
        for (const n of r || [])
          if (Number(f.substring(3)) === f && kt(n.address))
            return { gateway: n.address, version: f, int: t ?? null };
      }
    }
    throw new Error("Unable to determine default gateway");
  };
  vt = async (c) => {
    const { stdout: f } = await Tt("ip", [`-${c}`, "r"]);
    return e(f, c);
  };
} else if (Rt === "darwin") {
  const e = parseInt(Kh()) >= 19 ? 3 : 5, c = (f, l) => {
    for (const d of (f || "").trim().split(`
`)) {
      const s = d.split(/ +/) || [], t = s[0], a = s[1], r = s[l === 4 ? e : 3];
      if (ni.has(t) && a && kt(a))
        return { gateway: a, version: l, int: r ?? null };
    }
    throw new Error("Unable to determine default gateway");
  };
  vt = async (f) => {
    const { stdout: l } = await Tt("netstat", ["-rn", "-f", f === 4 ? "inet" : "inet6"]);
    return c(l, f);
  };
} else if (Rt === "win32") {
  let l = function(s, t) {
    let [a, r, n] = [null, null, null];
    for (let i of (s || "").trim().split(/\r?\n/).splice(1)) {
      i = i.trim();
      const [p, o, h, u, g] = /({.+?}) +({.+?}) +([0-9]+) +([0-9]+)/.exec(i) || [];
      if (!o) continue;
      const m = (o.match(/"(.+?)"/g) || []).map((y) => y.substring(1, y.length - 1)), v = h.match(/[0-9]+/g) || [];
      for (const [y, R] of Object.entries(m)) {
        if (!R || kt(R) !== t) continue;
        const S = parseInt(v[y]) + parseInt(g);
        (!a || S < r) && ([a, r, n] = [R, S, u]);
      }
    }
    if (a) return [a, n];
  }, d = function(s) {
    var n;
    const t = (s || "").trim().split(`
`)[1];
    let [a, r] = t.trim().split(/\s+/);
    a = a.toLowerCase();
    for (const [i, p] of Object.entries(ho()))
      for (const o of p)
        if (((n = o == null ? void 0 : o.mac) == null ? void 0 : n.toLowerCase()) === a)
          return i;
    return r;
  };
  const e = "path Win32_NetworkAdapterConfiguration where IPEnabled=true get DefaultIPGateway,GatewayCostMetric,IPConnectionMetric,Index /format:table".split(" "), c = (s) => `path Win32_NetworkAdapter where Index=${s} get NetConnectionID,MACAddress /format:table`.split(" "), f = {
    windowsHide: !0
  };
  vt = async (s) => {
    const { stdout: t } = await Tt("wmic", e, f), [a, r] = l(t, s) || [];
    if (!a) throw new Error("Unable to determine default gateway");
    let n;
    if (r) {
      const { stdout: i } = await Tt("wmic", c(r), f);
      n = d(i);
    }
    return { gateway: a, version: s, int: n ?? null };
  };
} else if (Rt === "android") {
  const e = (c, f) => {
    for (const l of (c || "").trim().split(`
`)) {
      const [d, s, t] = /default via (.+?) dev (.+?)( |$)/.exec(l) || [];
      if (s && kt(s))
        return { gateway: s, version: f, int: t ?? null };
    }
    throw new Error("Unable to determine default gateway");
  };
  vt = async (c) => {
    const { stdout: f } = await Tt("ip", [`-${c}`, "r"]);
    return e(f, c);
  };
} else if (Rt === "freebsd") {
  const e = (c, f) => {
    for (const l of (c || "").trim().split(`
`)) {
      const [d, s, t, a] = l.split(/ +/) || [];
      if (ni.has(d) && s && kt(s))
        return { gateway: s, version: f, int: a ?? null };
    }
    throw new Error("Unable to determine default gateway");
  };
  vt = async (c) => {
    const { stdout: f } = await Tt("netstat", ["-rn", "-f", c === 4 ? "inet" : "inet6"]);
    return e(f, c);
  };
} else if (Rt === "aix" && Xo() === "OS400") {
  const e = "/QOpenSys/pkgs/bin/db2util", c = "select NEXT_HOP, LOCAL_BINDING_INTERFACE from QSYS2.NETSTAT_ROUTE_INFO where ROUTE_TYPE='DFTROUTE' and NEXT_HOP!='*DIRECT' and CONNECTION_TYPE=?", f = (l, d) => {
    try {
      const s = JSON.parse(l), t = s.records[0].NEXT_HOP, a = s.records[0].LOCAL_BINDING_INTERFACE;
      return { gateway: t, version: d, iface: a };
    } catch {
    }
    throw new Error("Unable to determine default gateway");
  };
  vt = async (l) => {
    const { stdout: d } = await Tt(e, [c, "-p", `IPV${l}`, "-o", "json"]);
    return f(d, l);
  };
} else if (Rt === "openbsd") {
  const e = (c, f) => {
    for (const l of (c || "").trim().split(`
`)) {
      const d = l.split(/ +/) || [], s = d[0], t = d[1], a = d[7];
      if (ni.has(s) && t && kt(t))
        return { gateway: t, version: f, int: a ?? null };
    }
    throw new Error("Unable to determine default gateway");
  };
  vt = async (c) => {
    const { stdout: f } = await Tt("netstat", ["-rn", "-f", c === 4 ? "inet" : "inet6"]);
    return e(f, c);
  };
} else if (Rt === "sunos" || Rt === "aix" && Xo() !== "OS400") {
  const e = (c, f) => {
    for (const l of (c || "").trim().split(`
`)) {
      const d = l.split(/ +/) || [], s = d[0], t = d[1], a = d[5];
      if (ni.has(s) && t && kt(t))
        return { gateway: t, version: f, int: a ?? null };
    }
    throw new Error("Unable to determine default gateway");
  };
  vt = async (c) => {
    const { stdout: f } = await Tt("netstat", ["-rn", "-f", c === 4 ? "inet" : "inet6"]);
    return e(f, c);
  };
} else
  vt = (e) => {
    throw new Error("Unsupported Platform");
  };
const ny = () => vt(4), Dd = "[a-fA-F\\d:]", Lt = (e) => e && e.includeBoundaries ? `(?:(?<=\\s|^)(?=${Dd})|(?<=${Dd})(?=\\s|$))` : "", ft = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", $e = "[a-fA-F\\d]{1,4}", yi = `
(?:
(?:${$e}:){7}(?:${$e}|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${$e}:){6}(?:${ft}|:${$e}|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${$e}:){5}(?::${ft}|(?::${$e}){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${$e}:){4}(?:(?::${$e}){0,1}:${ft}|(?::${$e}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${$e}:){3}(?:(?::${$e}){0,2}:${ft}|(?::${$e}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${$e}:){2}(?:(?::${$e}){0,3}:${ft}|(?::${$e}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${$e}:){1}(?:(?::${$e}){0,4}:${ft}|(?::${$e}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::${$e}){0,5}:${ft}|(?::${$e}){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`.replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), ry = new RegExp(`(?:^${ft}$)|(?:^${yi}$)`), iy = new RegExp(`^${ft}$`), sy = new RegExp(`^${yi}$`), xn = (e) => e && e.exact ? ry : new RegExp(`(?:${Lt(e)}${ft}${Lt(e)})|(?:${Lt(e)}${yi}${Lt(e)})`, "g");
xn.v4 = (e) => e && e.exact ? iy : new RegExp(`${Lt(e)}${ft}${Lt(e)}`, "g");
xn.v6 = (e) => e && e.exact ? sy : new RegExp(`${Lt(e)}${yi}${Lt(e)}`, "g");
const Uo = { exact: !1 }, bi = `${xn.v4().source}\\/(3[0-2]|[12]?[0-9])`, wi = `${xn.v6().source}\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])`, ay = new RegExp(`^${bi}$`), oy = new RegExp(`^${wi}$`), cy = new RegExp(`(?:^${bi}$)|(?:^${wi}$)`), ai = ({ exact: e } = Uo) => e ? cy : new RegExp(`(?:${bi})|(?:${wi})`, "g");
ai.v4 = ({ exact: e } = Uo) => e ? ay : new RegExp(bi, "g");
ai.v6 = ({ exact: e } = Uo) => e ? oy : new RegExp(wi, "g");
function ly(e) {
  const c = uy(e);
  if (!c) throw new Error(`Invalid IP address: ${e}`);
  let f = 0n, l = 0n;
  const d = /* @__PURE__ */ Object.create(null);
  if (c === 4)
    for (const s of e.split(".").map(BigInt).reverse())
      f += s * 2n ** l, l += 8n;
  else {
    if (e.includes(".") && (d.ipv4mapped = !0, e = e.split(":").map((a) => {
      if (a.includes(".")) {
        const r = a.split(".").map((n) => Number(n).toString(16).padStart(2, "0"));
        return `${r[0]}${r[1]}:${r[2]}${r[3]}`;
      } else
        return a;
    }).join(":")), e.includes("%")) {
      let a;
      [, e, a] = /(.+)%(.+)/.exec(e), d.scopeid = a;
    }
    const s = e.split(":"), t = s.indexOf("");
    if (t !== -1)
      for (; s.length < 8; )
        s.splice(t, 0, "");
    for (const a of s.map((r) => BigInt(parseInt(r || 0, 16))).reverse())
      f += a * 2n ** l, l += 16n;
  }
  return d.number = f, d.version = c, d;
}
function uy(e) {
  return e.includes(":") ? 6 : e.includes(".") ? 4 : 0;
}
const Ld = {
  4: 32,
  6: 128
}, Fd = (e) => Array.from(new Set(e));
function py(e) {
  return xn.v4({ exact: !0 }).test(e) ? 4 : xn.v6({ exact: !0 }).test(e) ? 6 : 0;
}
function dy(e) {
  return ai.v4({ exact: !0 }).test(e) ? 4 : ai.v6({ exact: !0 }).test(e) ? 6 : 0;
}
function Ud(e) {
  const c = dy(e), f = /* @__PURE__ */ Object.create(null);
  if (f.single = !1, c)
    f.cidr = e, f.version = c;
  else {
    const p = py(e);
    if (p)
      f.cidr = `${e}/${Ld[p]}`, f.version = p, f.single = !0;
    else
      throw new Error(`Network is not a CIDR or IP: ${e}`);
  }
  const [l, d] = f.cidr.split("/");
  f.prefix = d;
  const { number: s, version: t } = ly(l), a = Ld[t], r = s.toString(2).padStart(a, "0"), n = Number(a - d), i = r.substring(0, a - n);
  return f.start = BigInt(`0b${i}${"0".repeat(n)}`), f.end = BigInt(`0b${i}${"1".repeat(n)}`), f;
}
function fy(e, c) {
  return !(c.start < e.start || c.end > e.end);
}
function hy(e, c) {
  const f = Fd(Array.isArray(e) ? e : [e]), l = Fd(Array.isArray(c) ? c : [c]), d = l.length;
  let s = 0;
  for (const t of f) {
    const a = Ud(t);
    for (const r of l) {
      const n = Ud(r);
      if (a.version === n.version && fy(a, n)) {
        s++;
        continue;
      }
    }
  }
  return s === d;
}
function my({ gateway: e }) {
  for (const c of Object.values(ho()))
    for (const { cidr: f } of c)
      if (hy(f, e))
        return f.split("/")[0];
}
async function gy() {
  try {
    return my(await ny());
  } catch {
  }
}
const ri = {
  SYNC_STATE: "sync:state",
  ACTION_SCAN: "action:scan",
  STATE_UPDATE: "state:update"
};
class vy {
  constructor(c) {
    this.io = null, this.httpServer = null, this.connectedClients = /* @__PURE__ */ new Map(), this.messageHandler = null, this.config = c;
  }
  /**
   * Start the Socket.IO server
   */
  async start() {
    if (this.io)
      throw new Error("Server is already running");
    this.httpServer = Zh(), this.io = new Rv(this.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    }), this.setupConnectionHandler(), await new Promise((l, d) => {
      this.httpServer.listen(this.config.port, () => {
        console.log(`[HostServer] Listening on port ${this.config.port}`), l();
      }).on("error", (s) => {
        d(s);
      });
    });
    const c = await gy() || "localhost", f = `http://${c}:${this.config.port}`;
    return console.log(`[HostServer] Server started at ${f}`), console.log("[HostServer] Clients can connect using this address"), {
      port: this.config.port,
      localIp: c,
      url: f
    };
  }
  /**
   * Setup Socket.IO connection handler
   */
  setupConnectionHandler() {
    this.io && this.io.on("connection", (c) => {
      const f = c.id;
      console.log(`[HostServer] Client connected: ${f}`), this.connectedClients.set(f, c), this.messageHandler && this.messageHandler("client:connected", { clientId: f }, f), c.on(ri.ACTION_SCAN, (l) => {
        console.log(`[HostServer] Received scan action from ${f}:`, l), this.messageHandler && this.messageHandler(ri.ACTION_SCAN, l, f);
      }), c.on("disconnect", () => {
        console.log(`[HostServer] Client disconnected: ${f}`), this.connectedClients.delete(f), this.messageHandler && this.messageHandler("client:disconnected", { clientId: f }, f);
      });
    });
  }
  /**
   * Broadcast state update to all connected clients
   */
  broadcastStateUpdate(c) {
    if (!this.io) {
      console.warn("[HostServer] Cannot broadcast - server not running");
      return;
    }
    console.log(`[HostServer] Broadcasting state update to ${this.connectedClients.size} clients`), this.io.emit(ri.STATE_UPDATE, c);
  }
  /**
   * Send full state sync to a specific client (usually on connect)
   */
  syncStateToClient(c, f) {
    const l = this.connectedClients.get(c);
    if (!l) {
      console.warn(`[HostServer] Cannot sync - client ${c} not found`);
      return;
    }
    console.log(`[HostServer] Syncing full state to client ${c}`), l.emit(ri.SYNC_STATE, f);
  }
  /**
   * Register handler for messages from clients
   */
  onMessage(c) {
    this.messageHandler = c;
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
    this.io && (console.log("[HostServer] Stopping server..."), this.connectedClients.forEach((c) => {
      c.disconnect(!0);
    }), this.connectedClients.clear(), await new Promise((c) => {
      this.io.close(() => {
        console.log("[HostServer] Socket.IO closed"), c();
      });
    }), this.httpServer && await new Promise((c) => {
      this.httpServer.close(() => {
        console.log("[HostServer] HTTP server closed"), c();
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
const zf = it.dirname(go(import.meta.url));
process.env.DIST = it.join(zf, "../dist");
process.env.VITE_PUBLIC = vn.isPackaged ? process.env.DIST : it.join(process.env.DIST, "../public");
let Qe, Ue = null;
function Wf() {
  Qe = new mo({
    icon: it.join(process.env.VITE_PUBLIC, "app_logo_fixed.png"),
    webPreferences: {
      preload: it.join(zf, "preload.mjs"),
      webSecurity: !1
      // Disable CORS for API requests
    }
  }), Bh.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ["https://pda.wpglb.com/*"] },
    (e, c) => {
      e.requestHeaders.Referer = "https://pda.wpglb.com/unloadingScanNew", e.requestHeaders.Origin = "https://pda.wpglb.com", c({ requestHeaders: e.requestHeaders });
    }
  ), Qe.webContents.on("did-finish-load", () => {
    Qe == null || Qe.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), process.env.VITE_DEV_SERVER_URL ? Qe.loadURL(process.env.VITE_DEV_SERVER_URL) : Qe.loadFile(it.join(process.env.DIST, "index.html"));
}
vn.on("window-all-closed", () => {
  process.platform !== "darwin" && (vn.quit(), Qe = null);
});
vn.on("activate", () => {
  mo.getAllWindows().length === 0 && Wf();
});
let gn = null;
Ye.handle("print-image", async (e, c, f = {}) => {
  if (!Qe)
    throw new Error("No window available for printing");
  try {
    (!gn || gn.isDestroyed()) && (gn = new mo({
      show: !1,
      width: 378,
      height: 567,
      webPreferences: {
        nodeIntegration: !1,
        contextIsolation: !0
      }
    }));
    const l = `<!DOCTYPE html>
<html>
<head>
<style>
  @page { margin: 0; size: 10cm 15cm; }
  * { margin: 0; padding: 0; }
  body { width: 10cm; height: 15cm; }
  img { width: 100%; height: 100%; object-fit: contain; }
</style>
</head>
<body><img src="${c}" /></body>
</html>`;
    return await gn.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(l)}`), await new Promise((d) => setTimeout(d, 50)), new Promise((d, s) => {
      if (!gn) return s(new Error("Print window destroyed"));
      gn.webContents.print({
        silent: f.silent !== !1,
        printBackground: !0,
        margins: { marginType: "none" },
        pageSize: { width: 1e5, height: 15e4 }
      }, (t, a) => {
        t ? d({ success: !0 }) : s(new Error(a || "Print failed"));
      });
    });
  } catch (l) {
    throw l;
  }
});
Ye.handle("print-gdi", async (e, c) => new Promise((f, l) => {
  const d = /* @__PURE__ */ new Date(), s = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  let t;
  c.type === "exception" ? t = yy(s, c.orderId || "UNKNOWN") : t = xy(
    s,
    c.routeName || "N/A",
    c.stackNumber || 0,
    c.trackingNumber || ""
  );
  const a = it.join(Xh(), `gdi_print_${Date.now()}.ps1`);
  try {
    zh(a, t, "utf-8"), Mh(`powershell -ExecutionPolicy Bypass -File "${a}"`, (r, n, i) => {
      try {
        Wh(a);
      } catch {
      }
      n.includes("PRINT_SUCCESS") ? f({ success: !0 }) : l(new Error(i || (r == null ? void 0 : r.message) || "GDI Print failed"));
    });
  } catch (r) {
    l(r);
  }
}));
function xy(e, c, f, l) {
  const d = l.slice(0, -4), s = l.slice(-4);
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
    $dateSize = $g.MeasureString("${e}", $fontDate)
    $dateX = ($leftSection - $dateSize.Width) / 2
    $dateY = ($pageHeight * 0.5) - 75
    $g.DrawString("${e}", $fontDate, $brushBlack, $dateX, $dateY)
    
    # 2. Route Name (centered in top half)
    $routeFont = $fontRouteLarge
    $routeSize = $g.MeasureString("${c}", $routeFont)
    if ($routeSize.Width -gt ($leftSection - 30)) {
        $routeFont = $fontRouteSmall
        $routeSize = $g.MeasureString("${c}", $routeFont)
    }
    $routeX = ($leftSection - $routeSize.Width) / 2
    $routeY = ($pageHeight * 0.25) - ($routeSize.Height / 2)
    $g.DrawString("${c}", $routeFont, $brushBlack, $routeX, $routeY)
    
    # 3. Tracking Number (above divider line) - prefix normal, last 4 bold
    $trackingY = ($pageHeight * 0.5) - 35
    $prefixSize = $g.MeasureString("${d}", $fontTrackingNormal)
    $last4Size = $g.MeasureString("${s}", $fontTrackingBold)
    $totalWidth = $prefixSize.Width + $last4Size.Width - 8
    $trackingX = ($leftSection - $totalWidth) / 2
    
    # Draw prefix (normal, black)
    $g.DrawString("${d}", $fontTrackingNormal, $brushBlack, $trackingX, $trackingY)
    # Draw last 4 (bold, larger, black) - tightly after prefix
    $g.DrawString("${s}", $fontTrackingBold, $brushBlack, ($trackingX + $prefixSize.Width - 8), ($trackingY - 2))
    
    # 4. Divider line (full width)
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Black, 2)
    $g.DrawLine($pen, 8, ($pageHeight * 0.5), ($pageWidth - 8), ($pageHeight * 0.5))
    
    # 5. Stack Number (centered in bottom half)
    $stackText = "${f}"
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
function yy(e, c) {
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
    $dateSize = $g.MeasureString("${e}", $fontDate)
    $g.DrawString("${e}", $fontDate, $brushGray, ($pageWidth - $dateSize.Width - 15), 8)
    
    # "EXCEPTION" label
    $excSize = $g.MeasureString("EXCEPTION", $fontException)
    $g.DrawString("EXCEPTION", $fontException, $brushRed, (($leftSection - $excSize.Width) / 2), ($pageHeight * 0.12))
    
    # Order ID
    $orderSize = $g.MeasureString("${c}", $fontOrderId)
    $orderX = ($leftSection - $orderSize.Width) / 2
    if ($orderX -lt 5) { $orderX = 5 }
    $g.DrawString("${c}", $fontOrderId, $brushBlack, $orderX, ($pageHeight * 0.32))
    
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
vn.whenReady().then(() => {
  Wf(), vn.isPackaged && Qe ? Ng(Qe) : (Ye.handle("get-app-version", () => "dev"), Ye.handle("check-for-updates", () => null), Ye.handle("download-update", () => !1), Ye.handle("install-update", () => {
  })), by();
});
function by() {
  Ye.handle("start-sync-server", async (e, c = 3e3) => {
    try {
      if (Ue != null && Ue.isRunning())
        throw new Error("Server is already running");
      return Ue = new vy({ port: c }), Ue.onMessage((l, d, s) => {
        Qe && !Qe.isDestroyed() && Qe.webContents.send("sync-server-message", {
          event: l,
          data: d,
          clientId: s
        });
      }), await Ue.start();
    } catch (f) {
      throw console.error("[Main] Failed to start sync server:", f), f;
    }
  }), Ye.handle("stop-sync-server", async () => {
    try {
      if (!Ue)
        return;
      await Ue.stop(), Ue = null;
    } catch (e) {
      throw console.error("[Main] Failed to stop sync server:", e), e;
    }
  }), Ye.handle("broadcast-sync-state", (e, c) => {
    try {
      if (!(Ue != null && Ue.isRunning())) {
        console.warn("[Main] Cannot broadcast - server not running");
        return;
      }
      Ue.broadcastStateUpdate(c);
    } catch (f) {
      throw console.error("[Main] Failed to broadcast state:", f), f;
    }
  }), Ye.handle("sync-state-to-client", (e, c, f) => {
    try {
      if (!(Ue != null && Ue.isRunning())) {
        console.warn("[Main] Cannot sync to client - server not running");
        return;
      }
      Ue.syncStateToClient(c, f);
    } catch (l) {
      throw console.error("[Main] Failed to sync to client:", l), l;
    }
  }), Ye.handle("get-sync-server-status", () => Ue ? {
    running: Ue.isRunning(),
    clientCount: Ue.getClientCount(),
    clients: Ue.getConnectedClients()
  } : { running: !1, clientCount: 0 });
}
