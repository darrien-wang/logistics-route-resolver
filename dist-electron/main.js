import Ct, { ipcMain as kt, app as qt, BrowserWindow as Ji, session as rc } from "electron";
import bt from "node:path";
import { fileURLToPath as nc } from "node:url";
import { exec as ic } from "node:child_process";
import { writeFileSync as ac, unlinkSync as oc } from "node:fs";
import { tmpdir as sc } from "node:os";
import pt from "fs";
import lc from "constants";
import gr from "stream";
import Qi from "util";
import bl from "assert";
import Oe from "path";
import Mr from "child_process";
import Cl from "events";
import vr from "crypto";
import Dl from "tty";
import Br from "os";
import Mt from "url";
import uc from "string_decoder";
import Pl from "zlib";
import cc from "http";
var Ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, _t = {}, Jr = {}, Cr = {}, Aa;
function Ve() {
  return Aa || (Aa = 1, Cr.fromCallback = function(t) {
    return Object.defineProperty(function(...u) {
      if (typeof u[u.length - 1] == "function") t.apply(this, u);
      else
        return new Promise((h, c) => {
          u.push((f, l) => f != null ? c(f) : h(l)), t.apply(this, u);
        });
    }, "name", { value: t.name });
  }, Cr.fromPromise = function(t) {
    return Object.defineProperty(function(...u) {
      const h = u[u.length - 1];
      if (typeof h != "function") return t.apply(this, u);
      u.pop(), t.apply(this, u).then((c) => h(null, c), h);
    }, "name", { value: t.name });
  }), Cr;
}
var Qr, Ra;
function fc() {
  if (Ra) return Qr;
  Ra = 1;
  var t = lc, u = process.cwd, h = null, c = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return h || (h = u.call(process)), h;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var f = process.chdir;
    process.chdir = function(a) {
      h = null, f.call(process, a);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, f);
  }
  Qr = l;
  function l(a) {
    t.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && d(a), a.lutimes || r(a), a.chown = o(a.chown), a.fchown = o(a.fchown), a.lchown = o(a.lchown), a.chmod = s(a.chmod), a.fchmod = s(a.fchmod), a.lchmod = s(a.lchmod), a.chownSync = i(a.chownSync), a.fchownSync = i(a.fchownSync), a.lchownSync = i(a.lchownSync), a.chmodSync = n(a.chmodSync), a.fchmodSync = n(a.fchmodSync), a.lchmodSync = n(a.lchmodSync), a.stat = m(a.stat), a.fstat = m(a.fstat), a.lstat = m(a.lstat), a.statSync = v(a.statSync), a.fstatSync = v(a.fstatSync), a.lstatSync = v(a.lstatSync), a.chmod && !a.lchmod && (a.lchmod = function(p, S, R) {
      R && process.nextTick(R);
    }, a.lchmodSync = function() {
    }), a.chown && !a.lchown && (a.lchown = function(p, S, R, D) {
      D && process.nextTick(D);
    }, a.lchownSync = function() {
    }), c === "win32" && (a.rename = typeof a.rename != "function" ? a.rename : (function(p) {
      function S(R, D, P) {
        var M = Date.now(), b = 0;
        p(R, D, function _(T) {
          if (T && (T.code === "EACCES" || T.code === "EPERM" || T.code === "EBUSY") && Date.now() - M < 6e4) {
            setTimeout(function() {
              a.stat(D, function(y, k) {
                y && y.code === "ENOENT" ? p(R, D, _) : P(T);
              });
            }, b), b < 100 && (b += 10);
            return;
          }
          P && P(T);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(S, p), S;
    })(a.rename)), a.read = typeof a.read != "function" ? a.read : (function(p) {
      function S(R, D, P, M, b, _) {
        var T;
        if (_ && typeof _ == "function") {
          var y = 0;
          T = function(k, L, $) {
            if (k && k.code === "EAGAIN" && y < 10)
              return y++, p.call(a, R, D, P, M, b, T);
            _.apply(this, arguments);
          };
        }
        return p.call(a, R, D, P, M, b, T);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(S, p), S;
    })(a.read), a.readSync = typeof a.readSync != "function" ? a.readSync : /* @__PURE__ */ (function(p) {
      return function(S, R, D, P, M) {
        for (var b = 0; ; )
          try {
            return p.call(a, S, R, D, P, M);
          } catch (_) {
            if (_.code === "EAGAIN" && b < 10) {
              b++;
              continue;
            }
            throw _;
          }
      };
    })(a.readSync);
    function d(p) {
      p.lchmod = function(S, R, D) {
        p.open(
          S,
          t.O_WRONLY | t.O_SYMLINK,
          R,
          function(P, M) {
            if (P) {
              D && D(P);
              return;
            }
            p.fchmod(M, R, function(b) {
              p.close(M, function(_) {
                D && D(b || _);
              });
            });
          }
        );
      }, p.lchmodSync = function(S, R) {
        var D = p.openSync(S, t.O_WRONLY | t.O_SYMLINK, R), P = !0, M;
        try {
          M = p.fchmodSync(D, R), P = !1;
        } finally {
          if (P)
            try {
              p.closeSync(D);
            } catch {
            }
          else
            p.closeSync(D);
        }
        return M;
      };
    }
    function r(p) {
      t.hasOwnProperty("O_SYMLINK") && p.futimes ? (p.lutimes = function(S, R, D, P) {
        p.open(S, t.O_SYMLINK, function(M, b) {
          if (M) {
            P && P(M);
            return;
          }
          p.futimes(b, R, D, function(_) {
            p.close(b, function(T) {
              P && P(_ || T);
            });
          });
        });
      }, p.lutimesSync = function(S, R, D) {
        var P = p.openSync(S, t.O_SYMLINK), M, b = !0;
        try {
          M = p.futimesSync(P, R, D), b = !1;
        } finally {
          if (b)
            try {
              p.closeSync(P);
            } catch {
            }
          else
            p.closeSync(P);
        }
        return M;
      }) : p.futimes && (p.lutimes = function(S, R, D, P) {
        P && process.nextTick(P);
      }, p.lutimesSync = function() {
      });
    }
    function s(p) {
      return p && function(S, R, D) {
        return p.call(a, S, R, function(P) {
          E(P) && (P = null), D && D.apply(this, arguments);
        });
      };
    }
    function n(p) {
      return p && function(S, R) {
        try {
          return p.call(a, S, R);
        } catch (D) {
          if (!E(D)) throw D;
        }
      };
    }
    function o(p) {
      return p && function(S, R, D, P) {
        return p.call(a, S, R, D, function(M) {
          E(M) && (M = null), P && P.apply(this, arguments);
        });
      };
    }
    function i(p) {
      return p && function(S, R, D) {
        try {
          return p.call(a, S, R, D);
        } catch (P) {
          if (!E(P)) throw P;
        }
      };
    }
    function m(p) {
      return p && function(S, R, D) {
        typeof R == "function" && (D = R, R = null);
        function P(M, b) {
          b && (b.uid < 0 && (b.uid += 4294967296), b.gid < 0 && (b.gid += 4294967296)), D && D.apply(this, arguments);
        }
        return R ? p.call(a, S, R, P) : p.call(a, S, P);
      };
    }
    function v(p) {
      return p && function(S, R) {
        var D = R ? p.call(a, S, R) : p.call(a, S);
        return D && (D.uid < 0 && (D.uid += 4294967296), D.gid < 0 && (D.gid += 4294967296)), D;
      };
    }
    function E(p) {
      if (!p || p.code === "ENOSYS")
        return !0;
      var S = !process.getuid || process.getuid() !== 0;
      return !!(S && (p.code === "EINVAL" || p.code === "EPERM"));
    }
  }
  return Qr;
}
var Zr, ba;
function dc() {
  if (ba) return Zr;
  ba = 1;
  var t = gr.Stream;
  Zr = u;
  function u(h) {
    return {
      ReadStream: c,
      WriteStream: f
    };
    function c(l, a) {
      if (!(this instanceof c)) return new c(l, a);
      t.call(this);
      var d = this;
      this.path = l, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, a = a || {};
      for (var r = Object.keys(a), s = 0, n = r.length; s < n; s++) {
        var o = r[s];
        this[o] = a[o];
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
          d._read();
        });
        return;
      }
      h.open(this.path, this.flags, this.mode, function(i, m) {
        if (i) {
          d.emit("error", i), d.readable = !1;
          return;
        }
        d.fd = m, d.emit("open", m), d._read();
      });
    }
    function f(l, a) {
      if (!(this instanceof f)) return new f(l, a);
      t.call(this), this.path = l, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, a = a || {};
      for (var d = Object.keys(a), r = 0, s = d.length; r < s; r++) {
        var n = d[r];
        this[n] = a[n];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = h.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Zr;
}
var en, Ca;
function hc() {
  if (Ca) return en;
  Ca = 1, en = u;
  var t = Object.getPrototypeOf || function(h) {
    return h.__proto__;
  };
  function u(h) {
    if (h === null || typeof h != "object")
      return h;
    if (h instanceof Object)
      var c = { __proto__: t(h) };
    else
      var c = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(h).forEach(function(f) {
      Object.defineProperty(c, f, Object.getOwnPropertyDescriptor(h, f));
    }), c;
  }
  return en;
}
var Dr, Da;
function je() {
  if (Da) return Dr;
  Da = 1;
  var t = pt, u = fc(), h = dc(), c = hc(), f = Qi, l, a;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (l = Symbol.for("graceful-fs.queue"), a = Symbol.for("graceful-fs.previous")) : (l = "___graceful-fs.queue", a = "___graceful-fs.previous");
  function d() {
  }
  function r(p, S) {
    Object.defineProperty(p, l, {
      get: function() {
        return S;
      }
    });
  }
  var s = d;
  if (f.debuglog ? s = f.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (s = function() {
    var p = f.format.apply(f, arguments);
    p = "GFS4: " + p.split(/\n/).join(`
GFS4: `), console.error(p);
  }), !t[l]) {
    var n = Ze[l] || [];
    r(t, n), t.close = (function(p) {
      function S(R, D) {
        return p.call(t, R, function(P) {
          P || v(), typeof D == "function" && D.apply(this, arguments);
        });
      }
      return Object.defineProperty(S, a, {
        value: p
      }), S;
    })(t.close), t.closeSync = (function(p) {
      function S(R) {
        p.apply(t, arguments), v();
      }
      return Object.defineProperty(S, a, {
        value: p
      }), S;
    })(t.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      s(t[l]), bl.equal(t[l].length, 0);
    });
  }
  Ze[l] || r(Ze, t[l]), Dr = o(c(t)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !t.__patched && (Dr = o(t), t.__patched = !0);
  function o(p) {
    u(p), p.gracefulify = o, p.createReadStream = de, p.createWriteStream = ce;
    var S = p.readFile;
    p.readFile = R;
    function R(J, ve, w) {
      return typeof ve == "function" && (w = ve, ve = null), g(J, ve, w);
      function g(H, N, ue, he) {
        return S(H, N, function(pe) {
          pe && (pe.code === "EMFILE" || pe.code === "ENFILE") ? i([g, [H, N, ue], pe, he || Date.now(), Date.now()]) : typeof ue == "function" && ue.apply(this, arguments);
        });
      }
    }
    var D = p.writeFile;
    p.writeFile = P;
    function P(J, ve, w, g) {
      return typeof w == "function" && (g = w, w = null), H(J, ve, w, g);
      function H(N, ue, he, pe, _e) {
        return D(N, ue, he, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? i([H, [N, ue, he, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var M = p.appendFile;
    M && (p.appendFile = b);
    function b(J, ve, w, g) {
      return typeof w == "function" && (g = w, w = null), H(J, ve, w, g);
      function H(N, ue, he, pe, _e) {
        return M(N, ue, he, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? i([H, [N, ue, he, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var _ = p.copyFile;
    _ && (p.copyFile = T);
    function T(J, ve, w, g) {
      return typeof w == "function" && (g = w, w = 0), H(J, ve, w, g);
      function H(N, ue, he, pe, _e) {
        return _(N, ue, he, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? i([H, [N, ue, he, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var y = p.readdir;
    p.readdir = L;
    var k = /^v[0-5]\./;
    function L(J, ve, w) {
      typeof ve == "function" && (w = ve, ve = null);
      var g = k.test(process.version) ? function(ue, he, pe, _e) {
        return y(ue, H(
          ue,
          he,
          pe,
          _e
        ));
      } : function(ue, he, pe, _e) {
        return y(ue, he, H(
          ue,
          he,
          pe,
          _e
        ));
      };
      return g(J, ve, w);
      function H(N, ue, he, pe) {
        return function(_e, Ee) {
          _e && (_e.code === "EMFILE" || _e.code === "ENFILE") ? i([
            g,
            [N, ue, he],
            _e,
            pe || Date.now(),
            Date.now()
          ]) : (Ee && Ee.sort && Ee.sort(), typeof he == "function" && he.call(this, _e, Ee));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var $ = h(p);
      O = $.ReadStream, Y = $.WriteStream;
    }
    var q = p.ReadStream;
    q && (O.prototype = Object.create(q.prototype), O.prototype.open = Q);
    var I = p.WriteStream;
    I && (Y.prototype = Object.create(I.prototype), Y.prototype.open = ne), Object.defineProperty(p, "ReadStream", {
      get: function() {
        return O;
      },
      set: function(J) {
        O = J;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(p, "WriteStream", {
      get: function() {
        return Y;
      },
      set: function(J) {
        Y = J;
      },
      enumerable: !0,
      configurable: !0
    });
    var F = O;
    Object.defineProperty(p, "FileReadStream", {
      get: function() {
        return F;
      },
      set: function(J) {
        F = J;
      },
      enumerable: !0,
      configurable: !0
    });
    var j = Y;
    Object.defineProperty(p, "FileWriteStream", {
      get: function() {
        return j;
      },
      set: function(J) {
        j = J;
      },
      enumerable: !0,
      configurable: !0
    });
    function O(J, ve) {
      return this instanceof O ? (q.apply(this, arguments), this) : O.apply(Object.create(O.prototype), arguments);
    }
    function Q() {
      var J = this;
      ye(J.path, J.flags, J.mode, function(ve, w) {
        ve ? (J.autoClose && J.destroy(), J.emit("error", ve)) : (J.fd = w, J.emit("open", w), J.read());
      });
    }
    function Y(J, ve) {
      return this instanceof Y ? (I.apply(this, arguments), this) : Y.apply(Object.create(Y.prototype), arguments);
    }
    function ne() {
      var J = this;
      ye(J.path, J.flags, J.mode, function(ve, w) {
        ve ? (J.destroy(), J.emit("error", ve)) : (J.fd = w, J.emit("open", w));
      });
    }
    function de(J, ve) {
      return new p.ReadStream(J, ve);
    }
    function ce(J, ve) {
      return new p.WriteStream(J, ve);
    }
    var ge = p.open;
    p.open = ye;
    function ye(J, ve, w, g) {
      return typeof w == "function" && (g = w, w = null), H(J, ve, w, g);
      function H(N, ue, he, pe, _e) {
        return ge(N, ue, he, function(Ee, He) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? i([H, [N, ue, he, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    return p;
  }
  function i(p) {
    s("ENQUEUE", p[0].name, p[1]), t[l].push(p), E();
  }
  var m;
  function v() {
    for (var p = Date.now(), S = 0; S < t[l].length; ++S)
      t[l][S].length > 2 && (t[l][S][3] = p, t[l][S][4] = p);
    E();
  }
  function E() {
    if (clearTimeout(m), m = void 0, t[l].length !== 0) {
      var p = t[l].shift(), S = p[0], R = p[1], D = p[2], P = p[3], M = p[4];
      if (P === void 0)
        s("RETRY", S.name, R), S.apply(null, R);
      else if (Date.now() - P >= 6e4) {
        s("TIMEOUT", S.name, R);
        var b = R.pop();
        typeof b == "function" && b.call(null, D);
      } else {
        var _ = Date.now() - M, T = Math.max(M - P, 1), y = Math.min(T * 1.2, 100);
        _ >= y ? (s("RETRY", S.name, R), S.apply(null, R.concat([P]))) : t[l].push(p);
      }
      m === void 0 && (m = setTimeout(E, 0));
    }
  }
  return Dr;
}
var Pa;
function Bt() {
  return Pa || (Pa = 1, (function(t) {
    const u = Ve().fromCallback, h = je(), c = [
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
    ].filter((f) => typeof h[f] == "function");
    Object.assign(t, h), c.forEach((f) => {
      t[f] = u(h[f]);
    }), t.exists = function(f, l) {
      return typeof l == "function" ? h.exists(f, l) : new Promise((a) => h.exists(f, a));
    }, t.read = function(f, l, a, d, r, s) {
      return typeof s == "function" ? h.read(f, l, a, d, r, s) : new Promise((n, o) => {
        h.read(f, l, a, d, r, (i, m, v) => {
          if (i) return o(i);
          n({ bytesRead: m, buffer: v });
        });
      });
    }, t.write = function(f, l, ...a) {
      return typeof a[a.length - 1] == "function" ? h.write(f, l, ...a) : new Promise((d, r) => {
        h.write(f, l, ...a, (s, n, o) => {
          if (s) return r(s);
          d({ bytesWritten: n, buffer: o });
        });
      });
    }, typeof h.writev == "function" && (t.writev = function(f, l, ...a) {
      return typeof a[a.length - 1] == "function" ? h.writev(f, l, ...a) : new Promise((d, r) => {
        h.writev(f, l, ...a, (s, n, o) => {
          if (s) return r(s);
          d({ bytesWritten: n, buffers: o });
        });
      });
    }), typeof h.realpath.native == "function" ? t.realpath.native = u(h.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  })(Jr)), Jr;
}
var Pr = {}, tn = {}, Oa;
function pc() {
  if (Oa) return tn;
  Oa = 1;
  const t = Oe;
  return tn.checkPath = function(h) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(h.replace(t.parse(h).root, ""))) {
      const f = new Error(`Path contains invalid characters: ${h}`);
      throw f.code = "EINVAL", f;
    }
  }, tn;
}
var Ia;
function mc() {
  if (Ia) return Pr;
  Ia = 1;
  const t = /* @__PURE__ */ Bt(), { checkPath: u } = /* @__PURE__ */ pc(), h = (c) => {
    const f = { mode: 511 };
    return typeof c == "number" ? c : { ...f, ...c }.mode;
  };
  return Pr.makeDir = async (c, f) => (u(c), t.mkdir(c, {
    mode: h(f),
    recursive: !0
  })), Pr.makeDirSync = (c, f) => (u(c), t.mkdirSync(c, {
    mode: h(f),
    recursive: !0
  })), Pr;
}
var rn, Na;
function nt() {
  if (Na) return rn;
  Na = 1;
  const t = Ve().fromPromise, { makeDir: u, makeDirSync: h } = /* @__PURE__ */ mc(), c = t(u);
  return rn = {
    mkdirs: c,
    mkdirsSync: h,
    // alias
    mkdirp: c,
    mkdirpSync: h,
    ensureDir: c,
    ensureDirSync: h
  }, rn;
}
var nn, Fa;
function Dt() {
  if (Fa) return nn;
  Fa = 1;
  const t = Ve().fromPromise, u = /* @__PURE__ */ Bt();
  function h(c) {
    return u.access(c).then(() => !0).catch(() => !1);
  }
  return nn = {
    pathExists: t(h),
    pathExistsSync: u.existsSync
  }, nn;
}
var an, xa;
function Ol() {
  if (xa) return an;
  xa = 1;
  const t = je();
  function u(c, f, l, a) {
    t.open(c, "r+", (d, r) => {
      if (d) return a(d);
      t.futimes(r, f, l, (s) => {
        t.close(r, (n) => {
          a && a(s || n);
        });
      });
    });
  }
  function h(c, f, l) {
    const a = t.openSync(c, "r+");
    return t.futimesSync(a, f, l), t.closeSync(a);
  }
  return an = {
    utimesMillis: u,
    utimesMillisSync: h
  }, an;
}
var on, $a;
function Ht() {
  if ($a) return on;
  $a = 1;
  const t = /* @__PURE__ */ Bt(), u = Oe, h = Qi;
  function c(i, m, v) {
    const E = v.dereference ? (p) => t.stat(p, { bigint: !0 }) : (p) => t.lstat(p, { bigint: !0 });
    return Promise.all([
      E(i),
      E(m).catch((p) => {
        if (p.code === "ENOENT") return null;
        throw p;
      })
    ]).then(([p, S]) => ({ srcStat: p, destStat: S }));
  }
  function f(i, m, v) {
    let E;
    const p = v.dereference ? (R) => t.statSync(R, { bigint: !0 }) : (R) => t.lstatSync(R, { bigint: !0 }), S = p(i);
    try {
      E = p(m);
    } catch (R) {
      if (R.code === "ENOENT") return { srcStat: S, destStat: null };
      throw R;
    }
    return { srcStat: S, destStat: E };
  }
  function l(i, m, v, E, p) {
    h.callbackify(c)(i, m, E, (S, R) => {
      if (S) return p(S);
      const { srcStat: D, destStat: P } = R;
      if (P) {
        if (s(D, P)) {
          const M = u.basename(i), b = u.basename(m);
          return v === "move" && M !== b && M.toLowerCase() === b.toLowerCase() ? p(null, { srcStat: D, destStat: P, isChangingCase: !0 }) : p(new Error("Source and destination must not be the same."));
        }
        if (D.isDirectory() && !P.isDirectory())
          return p(new Error(`Cannot overwrite non-directory '${m}' with directory '${i}'.`));
        if (!D.isDirectory() && P.isDirectory())
          return p(new Error(`Cannot overwrite directory '${m}' with non-directory '${i}'.`));
      }
      return D.isDirectory() && n(i, m) ? p(new Error(o(i, m, v))) : p(null, { srcStat: D, destStat: P });
    });
  }
  function a(i, m, v, E) {
    const { srcStat: p, destStat: S } = f(i, m, E);
    if (S) {
      if (s(p, S)) {
        const R = u.basename(i), D = u.basename(m);
        if (v === "move" && R !== D && R.toLowerCase() === D.toLowerCase())
          return { srcStat: p, destStat: S, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (p.isDirectory() && !S.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${m}' with directory '${i}'.`);
      if (!p.isDirectory() && S.isDirectory())
        throw new Error(`Cannot overwrite directory '${m}' with non-directory '${i}'.`);
    }
    if (p.isDirectory() && n(i, m))
      throw new Error(o(i, m, v));
    return { srcStat: p, destStat: S };
  }
  function d(i, m, v, E, p) {
    const S = u.resolve(u.dirname(i)), R = u.resolve(u.dirname(v));
    if (R === S || R === u.parse(R).root) return p();
    t.stat(R, { bigint: !0 }, (D, P) => D ? D.code === "ENOENT" ? p() : p(D) : s(m, P) ? p(new Error(o(i, v, E))) : d(i, m, R, E, p));
  }
  function r(i, m, v, E) {
    const p = u.resolve(u.dirname(i)), S = u.resolve(u.dirname(v));
    if (S === p || S === u.parse(S).root) return;
    let R;
    try {
      R = t.statSync(S, { bigint: !0 });
    } catch (D) {
      if (D.code === "ENOENT") return;
      throw D;
    }
    if (s(m, R))
      throw new Error(o(i, v, E));
    return r(i, m, S, E);
  }
  function s(i, m) {
    return m.ino && m.dev && m.ino === i.ino && m.dev === i.dev;
  }
  function n(i, m) {
    const v = u.resolve(i).split(u.sep).filter((p) => p), E = u.resolve(m).split(u.sep).filter((p) => p);
    return v.reduce((p, S, R) => p && E[R] === S, !0);
  }
  function o(i, m, v) {
    return `Cannot ${v} '${i}' to a subdirectory of itself, '${m}'.`;
  }
  return on = {
    checkPaths: l,
    checkPathsSync: a,
    checkParentPaths: d,
    checkParentPathsSync: r,
    isSrcSubdir: n,
    areIdentical: s
  }, on;
}
var sn, La;
function gc() {
  if (La) return sn;
  La = 1;
  const t = je(), u = Oe, h = nt().mkdirs, c = Dt().pathExists, f = Ol().utimesMillis, l = /* @__PURE__ */ Ht();
  function a(L, $, q, I) {
    typeof q == "function" && !I ? (I = q, q = {}) : typeof q == "function" && (q = { filter: q }), I = I || function() {
    }, q = q || {}, q.clobber = "clobber" in q ? !!q.clobber : !0, q.overwrite = "overwrite" in q ? !!q.overwrite : q.clobber, q.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), l.checkPaths(L, $, "copy", q, (F, j) => {
      if (F) return I(F);
      const { srcStat: O, destStat: Q } = j;
      l.checkParentPaths(L, O, $, "copy", (Y) => Y ? I(Y) : q.filter ? r(d, Q, L, $, q, I) : d(Q, L, $, q, I));
    });
  }
  function d(L, $, q, I, F) {
    const j = u.dirname(q);
    c(j, (O, Q) => {
      if (O) return F(O);
      if (Q) return n(L, $, q, I, F);
      h(j, (Y) => Y ? F(Y) : n(L, $, q, I, F));
    });
  }
  function r(L, $, q, I, F, j) {
    Promise.resolve(F.filter(q, I)).then((O) => O ? L($, q, I, F, j) : j(), (O) => j(O));
  }
  function s(L, $, q, I, F) {
    return I.filter ? r(n, L, $, q, I, F) : n(L, $, q, I, F);
  }
  function n(L, $, q, I, F) {
    (I.dereference ? t.stat : t.lstat)($, (O, Q) => O ? F(O) : Q.isDirectory() ? P(Q, L, $, q, I, F) : Q.isFile() || Q.isCharacterDevice() || Q.isBlockDevice() ? o(Q, L, $, q, I, F) : Q.isSymbolicLink() ? y(L, $, q, I, F) : Q.isSocket() ? F(new Error(`Cannot copy a socket file: ${$}`)) : Q.isFIFO() ? F(new Error(`Cannot copy a FIFO pipe: ${$}`)) : F(new Error(`Unknown file: ${$}`)));
  }
  function o(L, $, q, I, F, j) {
    return $ ? i(L, q, I, F, j) : m(L, q, I, F, j);
  }
  function i(L, $, q, I, F) {
    if (I.overwrite)
      t.unlink(q, (j) => j ? F(j) : m(L, $, q, I, F));
    else return I.errorOnExist ? F(new Error(`'${q}' already exists`)) : F();
  }
  function m(L, $, q, I, F) {
    t.copyFile($, q, (j) => j ? F(j) : I.preserveTimestamps ? v(L.mode, $, q, F) : R(q, L.mode, F));
  }
  function v(L, $, q, I) {
    return E(L) ? p(q, L, (F) => F ? I(F) : S(L, $, q, I)) : S(L, $, q, I);
  }
  function E(L) {
    return (L & 128) === 0;
  }
  function p(L, $, q) {
    return R(L, $ | 128, q);
  }
  function S(L, $, q, I) {
    D($, q, (F) => F ? I(F) : R(q, L, I));
  }
  function R(L, $, q) {
    return t.chmod(L, $, q);
  }
  function D(L, $, q) {
    t.stat(L, (I, F) => I ? q(I) : f($, F.atime, F.mtime, q));
  }
  function P(L, $, q, I, F, j) {
    return $ ? b(q, I, F, j) : M(L.mode, q, I, F, j);
  }
  function M(L, $, q, I, F) {
    t.mkdir(q, (j) => {
      if (j) return F(j);
      b($, q, I, (O) => O ? F(O) : R(q, L, F));
    });
  }
  function b(L, $, q, I) {
    t.readdir(L, (F, j) => F ? I(F) : _(j, L, $, q, I));
  }
  function _(L, $, q, I, F) {
    const j = L.pop();
    return j ? T(L, j, $, q, I, F) : F();
  }
  function T(L, $, q, I, F, j) {
    const O = u.join(q, $), Q = u.join(I, $);
    l.checkPaths(O, Q, "copy", F, (Y, ne) => {
      if (Y) return j(Y);
      const { destStat: de } = ne;
      s(de, O, Q, F, (ce) => ce ? j(ce) : _(L, q, I, F, j));
    });
  }
  function y(L, $, q, I, F) {
    t.readlink($, (j, O) => {
      if (j) return F(j);
      if (I.dereference && (O = u.resolve(process.cwd(), O)), L)
        t.readlink(q, (Q, Y) => Q ? Q.code === "EINVAL" || Q.code === "UNKNOWN" ? t.symlink(O, q, F) : F(Q) : (I.dereference && (Y = u.resolve(process.cwd(), Y)), l.isSrcSubdir(O, Y) ? F(new Error(`Cannot copy '${O}' to a subdirectory of itself, '${Y}'.`)) : L.isDirectory() && l.isSrcSubdir(Y, O) ? F(new Error(`Cannot overwrite '${Y}' with '${O}'.`)) : k(O, q, F)));
      else
        return t.symlink(O, q, F);
    });
  }
  function k(L, $, q) {
    t.unlink($, (I) => I ? q(I) : t.symlink(L, $, q));
  }
  return sn = a, sn;
}
var ln, Ua;
function vc() {
  if (Ua) return ln;
  Ua = 1;
  const t = je(), u = Oe, h = nt().mkdirsSync, c = Ol().utimesMillisSync, f = /* @__PURE__ */ Ht();
  function l(_, T, y) {
    typeof y == "function" && (y = { filter: y }), y = y || {}, y.clobber = "clobber" in y ? !!y.clobber : !0, y.overwrite = "overwrite" in y ? !!y.overwrite : y.clobber, y.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: k, destStat: L } = f.checkPathsSync(_, T, "copy", y);
    return f.checkParentPathsSync(_, k, T, "copy"), a(L, _, T, y);
  }
  function a(_, T, y, k) {
    if (k.filter && !k.filter(T, y)) return;
    const L = u.dirname(y);
    return t.existsSync(L) || h(L), r(_, T, y, k);
  }
  function d(_, T, y, k) {
    if (!(k.filter && !k.filter(T, y)))
      return r(_, T, y, k);
  }
  function r(_, T, y, k) {
    const $ = (k.dereference ? t.statSync : t.lstatSync)(T);
    if ($.isDirectory()) return S($, _, T, y, k);
    if ($.isFile() || $.isCharacterDevice() || $.isBlockDevice()) return s($, _, T, y, k);
    if ($.isSymbolicLink()) return M(_, T, y, k);
    throw $.isSocket() ? new Error(`Cannot copy a socket file: ${T}`) : $.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${T}`) : new Error(`Unknown file: ${T}`);
  }
  function s(_, T, y, k, L) {
    return T ? n(_, y, k, L) : o(_, y, k, L);
  }
  function n(_, T, y, k) {
    if (k.overwrite)
      return t.unlinkSync(y), o(_, T, y, k);
    if (k.errorOnExist)
      throw new Error(`'${y}' already exists`);
  }
  function o(_, T, y, k) {
    return t.copyFileSync(T, y), k.preserveTimestamps && i(_.mode, T, y), E(y, _.mode);
  }
  function i(_, T, y) {
    return m(_) && v(y, _), p(T, y);
  }
  function m(_) {
    return (_ & 128) === 0;
  }
  function v(_, T) {
    return E(_, T | 128);
  }
  function E(_, T) {
    return t.chmodSync(_, T);
  }
  function p(_, T) {
    const y = t.statSync(_);
    return c(T, y.atime, y.mtime);
  }
  function S(_, T, y, k, L) {
    return T ? D(y, k, L) : R(_.mode, y, k, L);
  }
  function R(_, T, y, k) {
    return t.mkdirSync(y), D(T, y, k), E(y, _);
  }
  function D(_, T, y) {
    t.readdirSync(_).forEach((k) => P(k, _, T, y));
  }
  function P(_, T, y, k) {
    const L = u.join(T, _), $ = u.join(y, _), { destStat: q } = f.checkPathsSync(L, $, "copy", k);
    return d(q, L, $, k);
  }
  function M(_, T, y, k) {
    let L = t.readlinkSync(T);
    if (k.dereference && (L = u.resolve(process.cwd(), L)), _) {
      let $;
      try {
        $ = t.readlinkSync(y);
      } catch (q) {
        if (q.code === "EINVAL" || q.code === "UNKNOWN") return t.symlinkSync(L, y);
        throw q;
      }
      if (k.dereference && ($ = u.resolve(process.cwd(), $)), f.isSrcSubdir(L, $))
        throw new Error(`Cannot copy '${L}' to a subdirectory of itself, '${$}'.`);
      if (t.statSync(y).isDirectory() && f.isSrcSubdir($, L))
        throw new Error(`Cannot overwrite '${$}' with '${L}'.`);
      return b(L, y);
    } else
      return t.symlinkSync(L, y);
  }
  function b(_, T) {
    return t.unlinkSync(T), t.symlinkSync(_, T);
  }
  return ln = l, ln;
}
var un, ka;
function Zi() {
  if (ka) return un;
  ka = 1;
  const t = Ve().fromCallback;
  return un = {
    copy: t(/* @__PURE__ */ gc()),
    copySync: /* @__PURE__ */ vc()
  }, un;
}
var cn, qa;
function yc() {
  if (qa) return cn;
  qa = 1;
  const t = je(), u = Oe, h = bl, c = process.platform === "win32";
  function f(v) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((p) => {
      v[p] = v[p] || t[p], p = p + "Sync", v[p] = v[p] || t[p];
    }), v.maxBusyTries = v.maxBusyTries || 3;
  }
  function l(v, E, p) {
    let S = 0;
    typeof E == "function" && (p = E, E = {}), h(v, "rimraf: missing path"), h.strictEqual(typeof v, "string", "rimraf: path should be a string"), h.strictEqual(typeof p, "function", "rimraf: callback function required"), h(E, "rimraf: invalid options argument provided"), h.strictEqual(typeof E, "object", "rimraf: options should be object"), f(E), a(v, E, function R(D) {
      if (D) {
        if ((D.code === "EBUSY" || D.code === "ENOTEMPTY" || D.code === "EPERM") && S < E.maxBusyTries) {
          S++;
          const P = S * 100;
          return setTimeout(() => a(v, E, R), P);
        }
        D.code === "ENOENT" && (D = null);
      }
      p(D);
    });
  }
  function a(v, E, p) {
    h(v), h(E), h(typeof p == "function"), E.lstat(v, (S, R) => {
      if (S && S.code === "ENOENT")
        return p(null);
      if (S && S.code === "EPERM" && c)
        return d(v, E, S, p);
      if (R && R.isDirectory())
        return s(v, E, S, p);
      E.unlink(v, (D) => {
        if (D) {
          if (D.code === "ENOENT")
            return p(null);
          if (D.code === "EPERM")
            return c ? d(v, E, D, p) : s(v, E, D, p);
          if (D.code === "EISDIR")
            return s(v, E, D, p);
        }
        return p(D);
      });
    });
  }
  function d(v, E, p, S) {
    h(v), h(E), h(typeof S == "function"), E.chmod(v, 438, (R) => {
      R ? S(R.code === "ENOENT" ? null : p) : E.stat(v, (D, P) => {
        D ? S(D.code === "ENOENT" ? null : p) : P.isDirectory() ? s(v, E, p, S) : E.unlink(v, S);
      });
    });
  }
  function r(v, E, p) {
    let S;
    h(v), h(E);
    try {
      E.chmodSync(v, 438);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw p;
    }
    try {
      S = E.statSync(v);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw p;
    }
    S.isDirectory() ? i(v, E, p) : E.unlinkSync(v);
  }
  function s(v, E, p, S) {
    h(v), h(E), h(typeof S == "function"), E.rmdir(v, (R) => {
      R && (R.code === "ENOTEMPTY" || R.code === "EEXIST" || R.code === "EPERM") ? n(v, E, S) : R && R.code === "ENOTDIR" ? S(p) : S(R);
    });
  }
  function n(v, E, p) {
    h(v), h(E), h(typeof p == "function"), E.readdir(v, (S, R) => {
      if (S) return p(S);
      let D = R.length, P;
      if (D === 0) return E.rmdir(v, p);
      R.forEach((M) => {
        l(u.join(v, M), E, (b) => {
          if (!P) {
            if (b) return p(P = b);
            --D === 0 && E.rmdir(v, p);
          }
        });
      });
    });
  }
  function o(v, E) {
    let p;
    E = E || {}, f(E), h(v, "rimraf: missing path"), h.strictEqual(typeof v, "string", "rimraf: path should be a string"), h(E, "rimraf: missing options"), h.strictEqual(typeof E, "object", "rimraf: options should be object");
    try {
      p = E.lstatSync(v);
    } catch (S) {
      if (S.code === "ENOENT")
        return;
      S.code === "EPERM" && c && r(v, E, S);
    }
    try {
      p && p.isDirectory() ? i(v, E, null) : E.unlinkSync(v);
    } catch (S) {
      if (S.code === "ENOENT")
        return;
      if (S.code === "EPERM")
        return c ? r(v, E, S) : i(v, E, S);
      if (S.code !== "EISDIR")
        throw S;
      i(v, E, S);
    }
  }
  function i(v, E, p) {
    h(v), h(E);
    try {
      E.rmdirSync(v);
    } catch (S) {
      if (S.code === "ENOTDIR")
        throw p;
      if (S.code === "ENOTEMPTY" || S.code === "EEXIST" || S.code === "EPERM")
        m(v, E);
      else if (S.code !== "ENOENT")
        throw S;
    }
  }
  function m(v, E) {
    if (h(v), h(E), E.readdirSync(v).forEach((p) => o(u.join(v, p), E)), c) {
      const p = Date.now();
      do
        try {
          return E.rmdirSync(v, E);
        } catch {
        }
      while (Date.now() - p < 500);
    } else
      return E.rmdirSync(v, E);
  }
  return cn = l, l.sync = o, cn;
}
var fn, Ma;
function Hr() {
  if (Ma) return fn;
  Ma = 1;
  const t = je(), u = Ve().fromCallback, h = /* @__PURE__ */ yc();
  function c(l, a) {
    if (t.rm) return t.rm(l, { recursive: !0, force: !0 }, a);
    h(l, a);
  }
  function f(l) {
    if (t.rmSync) return t.rmSync(l, { recursive: !0, force: !0 });
    h.sync(l);
  }
  return fn = {
    remove: u(c),
    removeSync: f
  }, fn;
}
var dn, Ba;
function Ec() {
  if (Ba) return dn;
  Ba = 1;
  const t = Ve().fromPromise, u = /* @__PURE__ */ Bt(), h = Oe, c = /* @__PURE__ */ nt(), f = /* @__PURE__ */ Hr(), l = t(async function(r) {
    let s;
    try {
      s = await u.readdir(r);
    } catch {
      return c.mkdirs(r);
    }
    return Promise.all(s.map((n) => f.remove(h.join(r, n))));
  });
  function a(d) {
    let r;
    try {
      r = u.readdirSync(d);
    } catch {
      return c.mkdirsSync(d);
    }
    r.forEach((s) => {
      s = h.join(d, s), f.removeSync(s);
    });
  }
  return dn = {
    emptyDirSync: a,
    emptydirSync: a,
    emptyDir: l,
    emptydir: l
  }, dn;
}
var hn, Ha;
function wc() {
  if (Ha) return hn;
  Ha = 1;
  const t = Ve().fromCallback, u = Oe, h = je(), c = /* @__PURE__ */ nt();
  function f(a, d) {
    function r() {
      h.writeFile(a, "", (s) => {
        if (s) return d(s);
        d();
      });
    }
    h.stat(a, (s, n) => {
      if (!s && n.isFile()) return d();
      const o = u.dirname(a);
      h.stat(o, (i, m) => {
        if (i)
          return i.code === "ENOENT" ? c.mkdirs(o, (v) => {
            if (v) return d(v);
            r();
          }) : d(i);
        m.isDirectory() ? r() : h.readdir(o, (v) => {
          if (v) return d(v);
        });
      });
    });
  }
  function l(a) {
    let d;
    try {
      d = h.statSync(a);
    } catch {
    }
    if (d && d.isFile()) return;
    const r = u.dirname(a);
    try {
      h.statSync(r).isDirectory() || h.readdirSync(r);
    } catch (s) {
      if (s && s.code === "ENOENT") c.mkdirsSync(r);
      else throw s;
    }
    h.writeFileSync(a, "");
  }
  return hn = {
    createFile: t(f),
    createFileSync: l
  }, hn;
}
var pn, ja;
function _c() {
  if (ja) return pn;
  ja = 1;
  const t = Ve().fromCallback, u = Oe, h = je(), c = /* @__PURE__ */ nt(), f = Dt().pathExists, { areIdentical: l } = /* @__PURE__ */ Ht();
  function a(r, s, n) {
    function o(i, m) {
      h.link(i, m, (v) => {
        if (v) return n(v);
        n(null);
      });
    }
    h.lstat(s, (i, m) => {
      h.lstat(r, (v, E) => {
        if (v)
          return v.message = v.message.replace("lstat", "ensureLink"), n(v);
        if (m && l(E, m)) return n(null);
        const p = u.dirname(s);
        f(p, (S, R) => {
          if (S) return n(S);
          if (R) return o(r, s);
          c.mkdirs(p, (D) => {
            if (D) return n(D);
            o(r, s);
          });
        });
      });
    });
  }
  function d(r, s) {
    let n;
    try {
      n = h.lstatSync(s);
    } catch {
    }
    try {
      const m = h.lstatSync(r);
      if (n && l(m, n)) return;
    } catch (m) {
      throw m.message = m.message.replace("lstat", "ensureLink"), m;
    }
    const o = u.dirname(s);
    return h.existsSync(o) || c.mkdirsSync(o), h.linkSync(r, s);
  }
  return pn = {
    createLink: t(a),
    createLinkSync: d
  }, pn;
}
var mn, Ga;
function Sc() {
  if (Ga) return mn;
  Ga = 1;
  const t = Oe, u = je(), h = Dt().pathExists;
  function c(l, a, d) {
    if (t.isAbsolute(l))
      return u.lstat(l, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), d(r)) : d(null, {
        toCwd: l,
        toDst: l
      }));
    {
      const r = t.dirname(a), s = t.join(r, l);
      return h(s, (n, o) => n ? d(n) : o ? d(null, {
        toCwd: s,
        toDst: l
      }) : u.lstat(l, (i) => i ? (i.message = i.message.replace("lstat", "ensureSymlink"), d(i)) : d(null, {
        toCwd: l,
        toDst: t.relative(r, l)
      })));
    }
  }
  function f(l, a) {
    let d;
    if (t.isAbsolute(l)) {
      if (d = u.existsSync(l), !d) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: l,
        toDst: l
      };
    } else {
      const r = t.dirname(a), s = t.join(r, l);
      if (d = u.existsSync(s), d)
        return {
          toCwd: s,
          toDst: l
        };
      if (d = u.existsSync(l), !d) throw new Error("relative srcpath does not exist");
      return {
        toCwd: l,
        toDst: t.relative(r, l)
      };
    }
  }
  return mn = {
    symlinkPaths: c,
    symlinkPathsSync: f
  }, mn;
}
var gn, Wa;
function Tc() {
  if (Wa) return gn;
  Wa = 1;
  const t = je();
  function u(c, f, l) {
    if (l = typeof f == "function" ? f : l, f = typeof f == "function" ? !1 : f, f) return l(null, f);
    t.lstat(c, (a, d) => {
      if (a) return l(null, "file");
      f = d && d.isDirectory() ? "dir" : "file", l(null, f);
    });
  }
  function h(c, f) {
    let l;
    if (f) return f;
    try {
      l = t.lstatSync(c);
    } catch {
      return "file";
    }
    return l && l.isDirectory() ? "dir" : "file";
  }
  return gn = {
    symlinkType: u,
    symlinkTypeSync: h
  }, gn;
}
var vn, Va;
function Ac() {
  if (Va) return vn;
  Va = 1;
  const t = Ve().fromCallback, u = Oe, h = /* @__PURE__ */ Bt(), c = /* @__PURE__ */ nt(), f = c.mkdirs, l = c.mkdirsSync, a = /* @__PURE__ */ Sc(), d = a.symlinkPaths, r = a.symlinkPathsSync, s = /* @__PURE__ */ Tc(), n = s.symlinkType, o = s.symlinkTypeSync, i = Dt().pathExists, { areIdentical: m } = /* @__PURE__ */ Ht();
  function v(S, R, D, P) {
    P = typeof D == "function" ? D : P, D = typeof D == "function" ? !1 : D, h.lstat(R, (M, b) => {
      !M && b.isSymbolicLink() ? Promise.all([
        h.stat(S),
        h.stat(R)
      ]).then(([_, T]) => {
        if (m(_, T)) return P(null);
        E(S, R, D, P);
      }) : E(S, R, D, P);
    });
  }
  function E(S, R, D, P) {
    d(S, R, (M, b) => {
      if (M) return P(M);
      S = b.toDst, n(b.toCwd, D, (_, T) => {
        if (_) return P(_);
        const y = u.dirname(R);
        i(y, (k, L) => {
          if (k) return P(k);
          if (L) return h.symlink(S, R, T, P);
          f(y, ($) => {
            if ($) return P($);
            h.symlink(S, R, T, P);
          });
        });
      });
    });
  }
  function p(S, R, D) {
    let P;
    try {
      P = h.lstatSync(R);
    } catch {
    }
    if (P && P.isSymbolicLink()) {
      const T = h.statSync(S), y = h.statSync(R);
      if (m(T, y)) return;
    }
    const M = r(S, R);
    S = M.toDst, D = o(M.toCwd, D);
    const b = u.dirname(R);
    return h.existsSync(b) || l(b), h.symlinkSync(S, R, D);
  }
  return vn = {
    createSymlink: t(v),
    createSymlinkSync: p
  }, vn;
}
var yn, Ya;
function Rc() {
  if (Ya) return yn;
  Ya = 1;
  const { createFile: t, createFileSync: u } = /* @__PURE__ */ wc(), { createLink: h, createLinkSync: c } = /* @__PURE__ */ _c(), { createSymlink: f, createSymlinkSync: l } = /* @__PURE__ */ Ac();
  return yn = {
    // file
    createFile: t,
    createFileSync: u,
    ensureFile: t,
    ensureFileSync: u,
    // link
    createLink: h,
    createLinkSync: c,
    ensureLink: h,
    ensureLinkSync: c,
    // symlink
    createSymlink: f,
    createSymlinkSync: l,
    ensureSymlink: f,
    ensureSymlinkSync: l
  }, yn;
}
var En, za;
function ea() {
  if (za) return En;
  za = 1;
  function t(h, { EOL: c = `
`, finalEOL: f = !0, replacer: l = null, spaces: a } = {}) {
    const d = f ? c : "";
    return JSON.stringify(h, l, a).replace(/\n/g, c) + d;
  }
  function u(h) {
    return Buffer.isBuffer(h) && (h = h.toString("utf8")), h.replace(/^\uFEFF/, "");
  }
  return En = { stringify: t, stripBom: u }, En;
}
var wn, Xa;
function bc() {
  if (Xa) return wn;
  Xa = 1;
  let t;
  try {
    t = je();
  } catch {
    t = pt;
  }
  const u = Ve(), { stringify: h, stripBom: c } = ea();
  async function f(n, o = {}) {
    typeof o == "string" && (o = { encoding: o });
    const i = o.fs || t, m = "throws" in o ? o.throws : !0;
    let v = await u.fromCallback(i.readFile)(n, o);
    v = c(v);
    let E;
    try {
      E = JSON.parse(v, o ? o.reviver : null);
    } catch (p) {
      if (m)
        throw p.message = `${n}: ${p.message}`, p;
      return null;
    }
    return E;
  }
  const l = u.fromPromise(f);
  function a(n, o = {}) {
    typeof o == "string" && (o = { encoding: o });
    const i = o.fs || t, m = "throws" in o ? o.throws : !0;
    try {
      let v = i.readFileSync(n, o);
      return v = c(v), JSON.parse(v, o.reviver);
    } catch (v) {
      if (m)
        throw v.message = `${n}: ${v.message}`, v;
      return null;
    }
  }
  async function d(n, o, i = {}) {
    const m = i.fs || t, v = h(o, i);
    await u.fromCallback(m.writeFile)(n, v, i);
  }
  const r = u.fromPromise(d);
  function s(n, o, i = {}) {
    const m = i.fs || t, v = h(o, i);
    return m.writeFileSync(n, v, i);
  }
  return wn = {
    readFile: l,
    readFileSync: a,
    writeFile: r,
    writeFileSync: s
  }, wn;
}
var _n, Ka;
function Cc() {
  if (Ka) return _n;
  Ka = 1;
  const t = bc();
  return _n = {
    // jsonfile exports
    readJson: t.readFile,
    readJsonSync: t.readFileSync,
    writeJson: t.writeFile,
    writeJsonSync: t.writeFileSync
  }, _n;
}
var Sn, Ja;
function ta() {
  if (Ja) return Sn;
  Ja = 1;
  const t = Ve().fromCallback, u = je(), h = Oe, c = /* @__PURE__ */ nt(), f = Dt().pathExists;
  function l(d, r, s, n) {
    typeof s == "function" && (n = s, s = "utf8");
    const o = h.dirname(d);
    f(o, (i, m) => {
      if (i) return n(i);
      if (m) return u.writeFile(d, r, s, n);
      c.mkdirs(o, (v) => {
        if (v) return n(v);
        u.writeFile(d, r, s, n);
      });
    });
  }
  function a(d, ...r) {
    const s = h.dirname(d);
    if (u.existsSync(s))
      return u.writeFileSync(d, ...r);
    c.mkdirsSync(s), u.writeFileSync(d, ...r);
  }
  return Sn = {
    outputFile: t(l),
    outputFileSync: a
  }, Sn;
}
var Tn, Qa;
function Dc() {
  if (Qa) return Tn;
  Qa = 1;
  const { stringify: t } = ea(), { outputFile: u } = /* @__PURE__ */ ta();
  async function h(c, f, l = {}) {
    const a = t(f, l);
    await u(c, a, l);
  }
  return Tn = h, Tn;
}
var An, Za;
function Pc() {
  if (Za) return An;
  Za = 1;
  const { stringify: t } = ea(), { outputFileSync: u } = /* @__PURE__ */ ta();
  function h(c, f, l) {
    const a = t(f, l);
    u(c, a, l);
  }
  return An = h, An;
}
var Rn, eo;
function Oc() {
  if (eo) return Rn;
  eo = 1;
  const t = Ve().fromPromise, u = /* @__PURE__ */ Cc();
  return u.outputJson = t(/* @__PURE__ */ Dc()), u.outputJsonSync = /* @__PURE__ */ Pc(), u.outputJSON = u.outputJson, u.outputJSONSync = u.outputJsonSync, u.writeJSON = u.writeJson, u.writeJSONSync = u.writeJsonSync, u.readJSON = u.readJson, u.readJSONSync = u.readJsonSync, Rn = u, Rn;
}
var bn, to;
function Ic() {
  if (to) return bn;
  to = 1;
  const t = je(), u = Oe, h = Zi().copy, c = Hr().remove, f = nt().mkdirp, l = Dt().pathExists, a = /* @__PURE__ */ Ht();
  function d(i, m, v, E) {
    typeof v == "function" && (E = v, v = {}), v = v || {};
    const p = v.overwrite || v.clobber || !1;
    a.checkPaths(i, m, "move", v, (S, R) => {
      if (S) return E(S);
      const { srcStat: D, isChangingCase: P = !1 } = R;
      a.checkParentPaths(i, D, m, "move", (M) => {
        if (M) return E(M);
        if (r(m)) return s(i, m, p, P, E);
        f(u.dirname(m), (b) => b ? E(b) : s(i, m, p, P, E));
      });
    });
  }
  function r(i) {
    const m = u.dirname(i);
    return u.parse(m).root === m;
  }
  function s(i, m, v, E, p) {
    if (E) return n(i, m, v, p);
    if (v)
      return c(m, (S) => S ? p(S) : n(i, m, v, p));
    l(m, (S, R) => S ? p(S) : R ? p(new Error("dest already exists.")) : n(i, m, v, p));
  }
  function n(i, m, v, E) {
    t.rename(i, m, (p) => p ? p.code !== "EXDEV" ? E(p) : o(i, m, v, E) : E());
  }
  function o(i, m, v, E) {
    h(i, m, {
      overwrite: v,
      errorOnExist: !0
    }, (S) => S ? E(S) : c(i, E));
  }
  return bn = d, bn;
}
var Cn, ro;
function Nc() {
  if (ro) return Cn;
  ro = 1;
  const t = je(), u = Oe, h = Zi().copySync, c = Hr().removeSync, f = nt().mkdirpSync, l = /* @__PURE__ */ Ht();
  function a(o, i, m) {
    m = m || {};
    const v = m.overwrite || m.clobber || !1, { srcStat: E, isChangingCase: p = !1 } = l.checkPathsSync(o, i, "move", m);
    return l.checkParentPathsSync(o, E, i, "move"), d(i) || f(u.dirname(i)), r(o, i, v, p);
  }
  function d(o) {
    const i = u.dirname(o);
    return u.parse(i).root === i;
  }
  function r(o, i, m, v) {
    if (v) return s(o, i, m);
    if (m)
      return c(i), s(o, i, m);
    if (t.existsSync(i)) throw new Error("dest already exists.");
    return s(o, i, m);
  }
  function s(o, i, m) {
    try {
      t.renameSync(o, i);
    } catch (v) {
      if (v.code !== "EXDEV") throw v;
      return n(o, i, m);
    }
  }
  function n(o, i, m) {
    return h(o, i, {
      overwrite: m,
      errorOnExist: !0
    }), c(o);
  }
  return Cn = a, Cn;
}
var Dn, no;
function Fc() {
  if (no) return Dn;
  no = 1;
  const t = Ve().fromCallback;
  return Dn = {
    move: t(/* @__PURE__ */ Ic()),
    moveSync: /* @__PURE__ */ Nc()
  }, Dn;
}
var Pn, io;
function mt() {
  return io || (io = 1, Pn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ Bt(),
    // Export extra methods:
    .../* @__PURE__ */ Zi(),
    .../* @__PURE__ */ Ec(),
    .../* @__PURE__ */ Rc(),
    .../* @__PURE__ */ Oc(),
    .../* @__PURE__ */ nt(),
    .../* @__PURE__ */ Fc(),
    .../* @__PURE__ */ ta(),
    .../* @__PURE__ */ Dt(),
    .../* @__PURE__ */ Hr()
  }), Pn;
}
var Yt = {}, St = {}, On = {}, Tt = {}, ao;
function ra() {
  if (ao) return Tt;
  ao = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.CancellationError = Tt.CancellationToken = void 0;
  const t = Cl;
  let u = class extends t.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(f) {
      this.removeParentCancelHandler(), this._parent = f, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(f) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, f != null && (this.parent = f);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(f) {
      this.cancelled ? f() : this.once("cancel", f);
    }
    createPromise(f) {
      if (this.cancelled)
        return Promise.reject(new h());
      const l = () => {
        if (a != null)
          try {
            this.removeListener("cancel", a), a = null;
          } catch {
          }
      };
      let a = null;
      return new Promise((d, r) => {
        let s = null;
        if (a = () => {
          try {
            s != null && (s(), s = null);
          } finally {
            r(new h());
          }
        }, this.cancelled) {
          a();
          return;
        }
        this.onCancel(a), f(d, r, (n) => {
          s = n;
        });
      }).then((d) => (l(), d)).catch((d) => {
        throw l(), d;
      });
    }
    removeParentCancelHandler() {
      const f = this._parent;
      f != null && this.parentCancelHandler != null && (f.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  Tt.CancellationToken = u;
  class h extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return Tt.CancellationError = h, Tt;
}
var Or = {}, oo;
function jr() {
  if (oo) return Or;
  oo = 1, Object.defineProperty(Or, "__esModule", { value: !0 }), Or.newError = t;
  function t(u, h) {
    const c = new Error(u);
    return c.code = h, c;
  }
  return Or;
}
var Ue = {}, Ir = { exports: {} }, Nr = { exports: {} }, In, so;
function xc() {
  if (so) return In;
  so = 1;
  var t = 1e3, u = t * 60, h = u * 60, c = h * 24, f = c * 7, l = c * 365.25;
  In = function(n, o) {
    o = o || {};
    var i = typeof n;
    if (i === "string" && n.length > 0)
      return a(n);
    if (i === "number" && isFinite(n))
      return o.long ? r(n) : d(n);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(n)
    );
  };
  function a(n) {
    if (n = String(n), !(n.length > 100)) {
      var o = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        n
      );
      if (o) {
        var i = parseFloat(o[1]), m = (o[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return i * l;
          case "weeks":
          case "week":
          case "w":
            return i * f;
          case "days":
          case "day":
          case "d":
            return i * c;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return i * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return i * u;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return i * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return i;
          default:
            return;
        }
      }
    }
  }
  function d(n) {
    var o = Math.abs(n);
    return o >= c ? Math.round(n / c) + "d" : o >= h ? Math.round(n / h) + "h" : o >= u ? Math.round(n / u) + "m" : o >= t ? Math.round(n / t) + "s" : n + "ms";
  }
  function r(n) {
    var o = Math.abs(n);
    return o >= c ? s(n, o, c, "day") : o >= h ? s(n, o, h, "hour") : o >= u ? s(n, o, u, "minute") : o >= t ? s(n, o, t, "second") : n + " ms";
  }
  function s(n, o, i, m) {
    var v = o >= i * 1.5;
    return Math.round(n / i) + " " + m + (v ? "s" : "");
  }
  return In;
}
var Nn, lo;
function Il() {
  if (lo) return Nn;
  lo = 1;
  function t(u) {
    c.debug = c, c.default = c, c.coerce = s, c.disable = d, c.enable = l, c.enabled = r, c.humanize = xc(), c.destroy = n, Object.keys(u).forEach((o) => {
      c[o] = u[o];
    }), c.names = [], c.skips = [], c.formatters = {};
    function h(o) {
      let i = 0;
      for (let m = 0; m < o.length; m++)
        i = (i << 5) - i + o.charCodeAt(m), i |= 0;
      return c.colors[Math.abs(i) % c.colors.length];
    }
    c.selectColor = h;
    function c(o) {
      let i, m = null, v, E;
      function p(...S) {
        if (!p.enabled)
          return;
        const R = p, D = Number(/* @__PURE__ */ new Date()), P = D - (i || D);
        R.diff = P, R.prev = i, R.curr = D, i = D, S[0] = c.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
        let M = 0;
        S[0] = S[0].replace(/%([a-zA-Z%])/g, (_, T) => {
          if (_ === "%%")
            return "%";
          M++;
          const y = c.formatters[T];
          if (typeof y == "function") {
            const k = S[M];
            _ = y.call(R, k), S.splice(M, 1), M--;
          }
          return _;
        }), c.formatArgs.call(R, S), (R.log || c.log).apply(R, S);
      }
      return p.namespace = o, p.useColors = c.useColors(), p.color = c.selectColor(o), p.extend = f, p.destroy = c.destroy, Object.defineProperty(p, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (v !== c.namespaces && (v = c.namespaces, E = c.enabled(o)), E),
        set: (S) => {
          m = S;
        }
      }), typeof c.init == "function" && c.init(p), p;
    }
    function f(o, i) {
      const m = c(this.namespace + (typeof i > "u" ? ":" : i) + o);
      return m.log = this.log, m;
    }
    function l(o) {
      c.save(o), c.namespaces = o, c.names = [], c.skips = [];
      const i = (typeof o == "string" ? o : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const m of i)
        m[0] === "-" ? c.skips.push(m.slice(1)) : c.names.push(m);
    }
    function a(o, i) {
      let m = 0, v = 0, E = -1, p = 0;
      for (; m < o.length; )
        if (v < i.length && (i[v] === o[m] || i[v] === "*"))
          i[v] === "*" ? (E = v, p = m, v++) : (m++, v++);
        else if (E !== -1)
          v = E + 1, p++, m = p;
        else
          return !1;
      for (; v < i.length && i[v] === "*"; )
        v++;
      return v === i.length;
    }
    function d() {
      const o = [
        ...c.names,
        ...c.skips.map((i) => "-" + i)
      ].join(",");
      return c.enable(""), o;
    }
    function r(o) {
      for (const i of c.skips)
        if (a(o, i))
          return !1;
      for (const i of c.names)
        if (a(o, i))
          return !0;
      return !1;
    }
    function s(o) {
      return o instanceof Error ? o.stack || o.message : o;
    }
    function n() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return c.enable(c.load()), c;
  }
  return Nn = t, Nn;
}
var uo;
function $c() {
  return uo || (uo = 1, (function(t, u) {
    u.formatArgs = c, u.save = f, u.load = l, u.useColors = h, u.storage = a(), u.destroy = /* @__PURE__ */ (() => {
      let r = !1;
      return () => {
        r || (r = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), u.colors = [
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
    function h() {
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
    function c(r) {
      if (r[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + r[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors)
        return;
      const s = "color: " + this.color;
      r.splice(1, 0, s, "color: inherit");
      let n = 0, o = 0;
      r[0].replace(/%[a-zA-Z%]/g, (i) => {
        i !== "%%" && (n++, i === "%c" && (o = n));
      }), r.splice(o, 0, s);
    }
    u.log = console.debug || console.log || (() => {
    });
    function f(r) {
      try {
        r ? u.storage.setItem("debug", r) : u.storage.removeItem("debug");
      } catch {
      }
    }
    function l() {
      let r;
      try {
        r = u.storage.getItem("debug") || u.storage.getItem("DEBUG");
      } catch {
      }
      return !r && typeof process < "u" && "env" in process && (r = process.env.DEBUG), r;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    t.exports = Il()(u);
    const { formatters: d } = t.exports;
    d.j = function(r) {
      try {
        return JSON.stringify(r);
      } catch (s) {
        return "[UnexpectedJSONParseError]: " + s.message;
      }
    };
  })(Nr, Nr.exports)), Nr.exports;
}
var Fr = { exports: {} }, Fn, co;
function Lc() {
  return co || (co = 1, Fn = (t, u = process.argv) => {
    const h = t.startsWith("-") ? "" : t.length === 1 ? "-" : "--", c = u.indexOf(h + t), f = u.indexOf("--");
    return c !== -1 && (f === -1 || c < f);
  }), Fn;
}
var xn, fo;
function Uc() {
  if (fo) return xn;
  fo = 1;
  const t = Br, u = Dl, h = Lc(), { env: c } = process;
  let f;
  h("no-color") || h("no-colors") || h("color=false") || h("color=never") ? f = 0 : (h("color") || h("colors") || h("color=true") || h("color=always")) && (f = 1), "FORCE_COLOR" in c && (c.FORCE_COLOR === "true" ? f = 1 : c.FORCE_COLOR === "false" ? f = 0 : f = c.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(c.FORCE_COLOR, 10), 3));
  function l(r) {
    return r === 0 ? !1 : {
      level: r,
      hasBasic: !0,
      has256: r >= 2,
      has16m: r >= 3
    };
  }
  function a(r, s) {
    if (f === 0)
      return 0;
    if (h("color=16m") || h("color=full") || h("color=truecolor"))
      return 3;
    if (h("color=256"))
      return 2;
    if (r && !s && f === void 0)
      return 0;
    const n = f || 0;
    if (c.TERM === "dumb")
      return n;
    if (process.platform === "win32") {
      const o = t.release().split(".");
      return Number(o[0]) >= 10 && Number(o[2]) >= 10586 ? Number(o[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in c)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((o) => o in c) || c.CI_NAME === "codeship" ? 1 : n;
    if ("TEAMCITY_VERSION" in c)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(c.TEAMCITY_VERSION) ? 1 : 0;
    if (c.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in c) {
      const o = parseInt((c.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (c.TERM_PROGRAM) {
        case "iTerm.app":
          return o >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(c.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(c.TERM) || "COLORTERM" in c ? 1 : n;
  }
  function d(r) {
    const s = a(r, r && r.isTTY);
    return l(s);
  }
  return xn = {
    supportsColor: d,
    stdout: l(a(!0, u.isatty(1))),
    stderr: l(a(!0, u.isatty(2)))
  }, xn;
}
var ho;
function kc() {
  return ho || (ho = 1, (function(t, u) {
    const h = Dl, c = Qi;
    u.init = n, u.log = d, u.formatArgs = l, u.save = r, u.load = s, u.useColors = f, u.destroy = c.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), u.colors = [6, 2, 3, 4, 5, 1];
    try {
      const i = Uc();
      i && (i.stderr || i).level >= 2 && (u.colors = [
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
    u.inspectOpts = Object.keys(process.env).filter((i) => /^debug_/i.test(i)).reduce((i, m) => {
      const v = m.substring(6).toLowerCase().replace(/_([a-z])/g, (p, S) => S.toUpperCase());
      let E = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(E) ? E = !0 : /^(no|off|false|disabled)$/i.test(E) ? E = !1 : E === "null" ? E = null : E = Number(E), i[v] = E, i;
    }, {});
    function f() {
      return "colors" in u.inspectOpts ? !!u.inspectOpts.colors : h.isatty(process.stderr.fd);
    }
    function l(i) {
      const { namespace: m, useColors: v } = this;
      if (v) {
        const E = this.color, p = "\x1B[3" + (E < 8 ? E : "8;5;" + E), S = `  ${p};1m${m} \x1B[0m`;
        i[0] = S + i[0].split(`
`).join(`
` + S), i.push(p + "m+" + t.exports.humanize(this.diff) + "\x1B[0m");
      } else
        i[0] = a() + m + " " + i[0];
    }
    function a() {
      return u.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function d(...i) {
      return process.stderr.write(c.formatWithOptions(u.inspectOpts, ...i) + `
`);
    }
    function r(i) {
      i ? process.env.DEBUG = i : delete process.env.DEBUG;
    }
    function s() {
      return process.env.DEBUG;
    }
    function n(i) {
      i.inspectOpts = {};
      const m = Object.keys(u.inspectOpts);
      for (let v = 0; v < m.length; v++)
        i.inspectOpts[m[v]] = u.inspectOpts[m[v]];
    }
    t.exports = Il()(u);
    const { formatters: o } = t.exports;
    o.o = function(i) {
      return this.inspectOpts.colors = this.useColors, c.inspect(i, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, o.O = function(i) {
      return this.inspectOpts.colors = this.useColors, c.inspect(i, this.inspectOpts);
    };
  })(Fr, Fr.exports)), Fr.exports;
}
var po;
function qc() {
  return po || (po = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Ir.exports = $c() : Ir.exports = kc()), Ir.exports;
}
var zt = {}, mo;
function Nl() {
  if (mo) return zt;
  mo = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.ProgressCallbackTransform = void 0;
  const t = gr;
  let u = class extends t.Transform {
    constructor(c, f, l) {
      super(), this.total = c, this.cancellationToken = f, this.onProgress = l, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(c, f, l) {
      if (this.cancellationToken.cancelled) {
        l(new Error("cancelled"), null);
        return;
      }
      this.transferred += c.length, this.delta += c.length;
      const a = Date.now();
      a >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = a + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((a - this.start) / 1e3))
      }), this.delta = 0), l(null, c);
    }
    _flush(c) {
      if (this.cancellationToken.cancelled) {
        c(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, c(null);
    }
  };
  return zt.ProgressCallbackTransform = u, zt;
}
var go;
function Mc() {
  if (go) return Ue;
  go = 1, Object.defineProperty(Ue, "__esModule", { value: !0 }), Ue.DigestTransform = Ue.HttpExecutor = Ue.HttpError = void 0, Ue.createHttpError = s, Ue.parseJson = i, Ue.configureRequestOptionsFromUrl = v, Ue.configureRequestUrl = E, Ue.safeGetHeader = R, Ue.configureRequestOptions = P, Ue.safeStringifyJson = M;
  const t = vr, u = qc(), h = pt, c = gr, f = Mt, l = ra(), a = jr(), d = Nl(), r = (0, u.default)("electron-builder");
  function s(b, _ = null) {
    return new o(b.statusCode || -1, `${b.statusCode} ${b.statusMessage}` + (_ == null ? "" : `
` + JSON.stringify(_, null, "  ")) + `
Headers: ` + M(b.headers), _);
  }
  const n = /* @__PURE__ */ new Map([
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
  class o extends Error {
    constructor(_, T = `HTTP error: ${n.get(_) || _}`, y = null) {
      super(T), this.statusCode = _, this.description = y, this.name = "HttpError", this.code = `HTTP_ERROR_${_}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  Ue.HttpError = o;
  function i(b) {
    return b.then((_) => _ == null || _.length === 0 ? null : JSON.parse(_));
  }
  class m {
    constructor() {
      this.maxRedirects = 10;
    }
    request(_, T = new l.CancellationToken(), y) {
      P(_);
      const k = y == null ? void 0 : JSON.stringify(y), L = k ? Buffer.from(k) : void 0;
      if (L != null) {
        r(k);
        const { headers: $, ...q } = _;
        _ = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": L.length,
            ...$
          },
          ...q
        };
      }
      return this.doApiRequest(_, T, ($) => $.end(L));
    }
    doApiRequest(_, T, y, k = 0) {
      return r.enabled && r(`Request: ${M(_)}`), T.createPromise((L, $, q) => {
        const I = this.createRequest(_, (F) => {
          try {
            this.handleResponse(F, _, T, L, $, k, y);
          } catch (j) {
            $(j);
          }
        });
        this.addErrorAndTimeoutHandlers(I, $, _.timeout), this.addRedirectHandlers(I, _, $, k, (F) => {
          this.doApiRequest(F, T, y, k).then(L).catch($);
        }), y(I, $), q(() => I.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(_, T, y, k, L) {
    }
    addErrorAndTimeoutHandlers(_, T, y = 60 * 1e3) {
      this.addTimeOutHandler(_, T, y), _.on("error", T), _.on("aborted", () => {
        T(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(_, T, y, k, L, $, q) {
      var I;
      if (r.enabled && r(`Response: ${_.statusCode} ${_.statusMessage}, request options: ${M(T)}`), _.statusCode === 404) {
        L(s(_, `method: ${T.method || "GET"} url: ${T.protocol || "https:"}//${T.hostname}${T.port ? `:${T.port}` : ""}${T.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (_.statusCode === 204) {
        k();
        return;
      }
      const F = (I = _.statusCode) !== null && I !== void 0 ? I : 0, j = F >= 300 && F < 400, O = R(_, "location");
      if (j && O != null) {
        if ($ > this.maxRedirects) {
          L(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(m.prepareRedirectUrlOptions(O, T), y, q, $).then(k).catch(L);
        return;
      }
      _.setEncoding("utf8");
      let Q = "";
      _.on("error", L), _.on("data", (Y) => Q += Y), _.on("end", () => {
        try {
          if (_.statusCode != null && _.statusCode >= 400) {
            const Y = R(_, "content-type"), ne = Y != null && (Array.isArray(Y) ? Y.find((de) => de.includes("json")) != null : Y.includes("json"));
            L(s(_, `method: ${T.method || "GET"} url: ${T.protocol || "https:"}//${T.hostname}${T.port ? `:${T.port}` : ""}${T.path}

          Data:
          ${ne ? JSON.stringify(JSON.parse(Q)) : Q}
          `));
          } else
            k(Q.length === 0 ? null : Q);
        } catch (Y) {
          L(Y);
        }
      });
    }
    async downloadToBuffer(_, T) {
      return await T.cancellationToken.createPromise((y, k, L) => {
        const $ = [], q = {
          headers: T.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        E(_, q), P(q), this.doDownload(q, {
          destination: null,
          options: T,
          onCancel: L,
          callback: (I) => {
            I == null ? y(Buffer.concat($)) : k(I);
          },
          responseHandler: (I, F) => {
            let j = 0;
            I.on("data", (O) => {
              if (j += O.length, j > 524288e3) {
                F(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              $.push(O);
            }), I.on("end", () => {
              F(null);
            });
          }
        }, 0);
      });
    }
    doDownload(_, T, y) {
      const k = this.createRequest(_, (L) => {
        if (L.statusCode >= 400) {
          T.callback(new Error(`Cannot download "${_.protocol || "https:"}//${_.hostname}${_.path}", status ${L.statusCode}: ${L.statusMessage}`));
          return;
        }
        L.on("error", T.callback);
        const $ = R(L, "location");
        if ($ != null) {
          y < this.maxRedirects ? this.doDownload(m.prepareRedirectUrlOptions($, _), T, y++) : T.callback(this.createMaxRedirectError());
          return;
        }
        T.responseHandler == null ? D(T, L) : T.responseHandler(L, T.callback);
      });
      this.addErrorAndTimeoutHandlers(k, T.callback, _.timeout), this.addRedirectHandlers(k, _, T.callback, y, (L) => {
        this.doDownload(L, T, y++);
      }), k.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(_, T, y) {
      _.on("socket", (k) => {
        k.setTimeout(y, () => {
          _.abort(), T(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(_, T) {
      const y = v(_, { ...T }), k = y.headers;
      if (k != null && k.authorization) {
        const L = new f.URL(_);
        (L.hostname.endsWith(".amazonaws.com") || L.searchParams.has("X-Amz-Credential")) && delete k.authorization;
      }
      return y;
    }
    static retryOnServerError(_, T = 3) {
      for (let y = 0; ; y++)
        try {
          return _();
        } catch (k) {
          if (y < T && (k instanceof o && k.isServerError() || k.code === "EPIPE"))
            continue;
          throw k;
        }
    }
  }
  Ue.HttpExecutor = m;
  function v(b, _) {
    const T = P(_);
    return E(new f.URL(b), T), T;
  }
  function E(b, _) {
    _.protocol = b.protocol, _.hostname = b.hostname, b.port ? _.port = b.port : _.port && delete _.port, _.path = b.pathname + b.search;
  }
  class p extends c.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(_, T = "sha512", y = "base64") {
      super(), this.expected = _, this.algorithm = T, this.encoding = y, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, t.createHash)(T);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(_, T, y) {
      this.digester.update(_), y(null, _);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(_) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (T) {
          _(T);
          return;
        }
      _(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, a.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, a.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  Ue.DigestTransform = p;
  function S(b, _, T) {
    return b != null && _ != null && b !== _ ? (T(new Error(`checksum mismatch: expected ${_} but got ${b} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function R(b, _) {
    const T = b.headers[_];
    return T == null ? null : Array.isArray(T) ? T.length === 0 ? null : T[T.length - 1] : T;
  }
  function D(b, _) {
    if (!S(R(_, "X-Checksum-Sha2"), b.options.sha2, b.callback))
      return;
    const T = [];
    if (b.options.onProgress != null) {
      const $ = R(_, "content-length");
      $ != null && T.push(new d.ProgressCallbackTransform(parseInt($, 10), b.options.cancellationToken, b.options.onProgress));
    }
    const y = b.options.sha512;
    y != null ? T.push(new p(y, "sha512", y.length === 128 && !y.includes("+") && !y.includes("Z") && !y.includes("=") ? "hex" : "base64")) : b.options.sha2 != null && T.push(new p(b.options.sha2, "sha256", "hex"));
    const k = (0, h.createWriteStream)(b.destination);
    T.push(k);
    let L = _;
    for (const $ of T)
      $.on("error", (q) => {
        k.close(), b.options.cancellationToken.cancelled || b.callback(q);
      }), L = L.pipe($);
    k.on("finish", () => {
      k.close(b.callback);
    });
  }
  function P(b, _, T) {
    T != null && (b.method = T), b.headers = { ...b.headers };
    const y = b.headers;
    return _ != null && (y.authorization = _.startsWith("Basic") || _.startsWith("Bearer") ? _ : `token ${_}`), y["User-Agent"] == null && (y["User-Agent"] = "electron-builder"), (T == null || T === "GET" || y["Cache-Control"] == null) && (y["Cache-Control"] = "no-cache"), b.protocol == null && process.versions.electron != null && (b.protocol = "https:"), b;
  }
  function M(b, _) {
    return JSON.stringify(b, (T, y) => T.endsWith("Authorization") || T.endsWith("authorization") || T.endsWith("Password") || T.endsWith("PASSWORD") || T.endsWith("Token") || T.includes("password") || T.includes("token") || _ != null && _.has(T) ? "<stripped sensitive data>" : y, 2);
  }
  return Ue;
}
var Xt = {}, vo;
function Bc() {
  if (vo) return Xt;
  vo = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.MemoLazy = void 0;
  let t = class {
    constructor(c, f) {
      this.selector = c, this.creator = f, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const c = this.selector();
      if (this._value !== void 0 && u(this.selected, c))
        return this._value;
      this.selected = c;
      const f = this.creator(c);
      return this.value = f, f;
    }
    set value(c) {
      this._value = c;
    }
  };
  Xt.MemoLazy = t;
  function u(h, c) {
    if (typeof h == "object" && h !== null && (typeof c == "object" && c !== null)) {
      const a = Object.keys(h), d = Object.keys(c);
      return a.length === d.length && a.every((r) => u(h[r], c[r]));
    }
    return h === c;
  }
  return Xt;
}
var Kt = {}, yo;
function Hc() {
  if (yo) return Kt;
  yo = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.githubUrl = t, Kt.getS3LikeProviderBaseUrl = u;
  function t(l, a = "github.com") {
    return `${l.protocol || "https"}://${l.host || a}`;
  }
  function u(l) {
    const a = l.provider;
    if (a === "s3")
      return h(l);
    if (a === "spaces")
      return f(l);
    throw new Error(`Not supported provider: ${a}`);
  }
  function h(l) {
    let a;
    if (l.accelerate == !0)
      a = `https://${l.bucket}.s3-accelerate.amazonaws.com`;
    else if (l.endpoint != null)
      a = `${l.endpoint}/${l.bucket}`;
    else if (l.bucket.includes(".")) {
      if (l.region == null)
        throw new Error(`Bucket name "${l.bucket}" includes a dot, but S3 region is missing`);
      l.region === "us-east-1" ? a = `https://s3.amazonaws.com/${l.bucket}` : a = `https://s3-${l.region}.amazonaws.com/${l.bucket}`;
    } else l.region === "cn-north-1" ? a = `https://${l.bucket}.s3.${l.region}.amazonaws.com.cn` : a = `https://${l.bucket}.s3.amazonaws.com`;
    return c(a, l.path);
  }
  function c(l, a) {
    return a != null && a.length > 0 && (a.startsWith("/") || (l += "/"), l += a), l;
  }
  function f(l) {
    if (l.name == null)
      throw new Error("name is missing");
    if (l.region == null)
      throw new Error("region is missing");
    return c(`https://${l.name}.${l.region}.digitaloceanspaces.com`, l.path);
  }
  return Kt;
}
var xr = {}, Eo;
function jc() {
  if (Eo) return xr;
  Eo = 1, Object.defineProperty(xr, "__esModule", { value: !0 }), xr.retry = u;
  const t = ra();
  async function u(h, c, f, l = 0, a = 0, d) {
    var r;
    const s = new t.CancellationToken();
    try {
      return await h();
    } catch (n) {
      if ((!((r = d == null ? void 0 : d(n)) !== null && r !== void 0) || r) && c > 0 && !s.cancelled)
        return await new Promise((o) => setTimeout(o, f + l * a)), await u(h, c - 1, f, l, a + 1, d);
      throw n;
    }
  }
  return xr;
}
var $r = {}, wo;
function Gc() {
  if (wo) return $r;
  wo = 1, Object.defineProperty($r, "__esModule", { value: !0 }), $r.parseDn = t;
  function t(u) {
    let h = !1, c = null, f = "", l = 0;
    u = u.trim();
    const a = /* @__PURE__ */ new Map();
    for (let d = 0; d <= u.length; d++) {
      if (d === u.length) {
        c !== null && a.set(c, f);
        break;
      }
      const r = u[d];
      if (h) {
        if (r === '"') {
          h = !1;
          continue;
        }
      } else {
        if (r === '"') {
          h = !0;
          continue;
        }
        if (r === "\\") {
          d++;
          const s = parseInt(u.slice(d, d + 2), 16);
          Number.isNaN(s) ? f += u[d] : (d++, f += String.fromCharCode(s));
          continue;
        }
        if (c === null && r === "=") {
          c = f, f = "";
          continue;
        }
        if (r === "," || r === ";" || r === "+") {
          c !== null && a.set(c, f), c = null, f = "";
          continue;
        }
      }
      if (r === " " && !h) {
        if (f.length === 0)
          continue;
        if (d > l) {
          let s = d;
          for (; u[s] === " "; )
            s++;
          l = s;
        }
        if (l >= u.length || u[l] === "," || u[l] === ";" || c === null && u[l] === "=" || c !== null && u[l] === "+") {
          d = l - 1;
          continue;
        }
      }
      f += r;
    }
    return a;
  }
  return $r;
}
var At = {}, _o;
function Wc() {
  if (_o) return At;
  _o = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.nil = At.UUID = void 0;
  const t = vr, u = jr(), h = "options.name must be either a string or a Buffer", c = (0, t.randomBytes)(16);
  c[0] = c[0] | 1;
  const f = {}, l = [];
  for (let o = 0; o < 256; o++) {
    const i = (o + 256).toString(16).substr(1);
    f[i] = o, l[o] = i;
  }
  class a {
    constructor(i) {
      this.ascii = null, this.binary = null;
      const m = a.check(i);
      if (!m)
        throw new Error("not a UUID");
      this.version = m.version, m.format === "ascii" ? this.ascii = i : this.binary = i;
    }
    static v5(i, m) {
      return s(i, "sha1", 80, m);
    }
    toString() {
      return this.ascii == null && (this.ascii = n(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(i, m = 0) {
      if (typeof i == "string")
        return i = i.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(i) ? i === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (f[i[14] + i[15]] & 240) >> 4,
          variant: d((f[i[19] + i[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(i)) {
        if (i.length < m + 16)
          return !1;
        let v = 0;
        for (; v < 16 && i[m + v] === 0; v++)
          ;
        return v === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (i[m + 6] & 240) >> 4,
          variant: d((i[m + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, u.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(i) {
      const m = Buffer.allocUnsafe(16);
      let v = 0;
      for (let E = 0; E < 16; E++)
        m[E] = f[i[v++] + i[v++]], (E === 3 || E === 5 || E === 7 || E === 9) && (v += 1);
      return m;
    }
  }
  At.UUID = a, a.OID = a.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function d(o) {
    switch (o) {
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
  (function(o) {
    o[o.ASCII = 0] = "ASCII", o[o.BINARY = 1] = "BINARY", o[o.OBJECT = 2] = "OBJECT";
  })(r || (r = {}));
  function s(o, i, m, v, E = r.ASCII) {
    const p = (0, t.createHash)(i);
    if (typeof o != "string" && !Buffer.isBuffer(o))
      throw (0, u.newError)(h, "ERR_INVALID_UUID_NAME");
    p.update(v), p.update(o);
    const R = p.digest();
    let D;
    switch (E) {
      case r.BINARY:
        R[6] = R[6] & 15 | m, R[8] = R[8] & 63 | 128, D = R;
        break;
      case r.OBJECT:
        R[6] = R[6] & 15 | m, R[8] = R[8] & 63 | 128, D = new a(R);
        break;
      default:
        D = l[R[0]] + l[R[1]] + l[R[2]] + l[R[3]] + "-" + l[R[4]] + l[R[5]] + "-" + l[R[6] & 15 | m] + l[R[7]] + "-" + l[R[8] & 63 | 128] + l[R[9]] + "-" + l[R[10]] + l[R[11]] + l[R[12]] + l[R[13]] + l[R[14]] + l[R[15]];
        break;
    }
    return D;
  }
  function n(o) {
    return l[o[0]] + l[o[1]] + l[o[2]] + l[o[3]] + "-" + l[o[4]] + l[o[5]] + "-" + l[o[6]] + l[o[7]] + "-" + l[o[8]] + l[o[9]] + "-" + l[o[10]] + l[o[11]] + l[o[12]] + l[o[13]] + l[o[14]] + l[o[15]];
  }
  return At.nil = new a("00000000-0000-0000-0000-000000000000"), At;
}
var Ft = {}, $n = {}, So;
function Vc() {
  return So || (So = 1, (function(t) {
    (function(u) {
      u.parser = function(w, g) {
        return new c(w, g);
      }, u.SAXParser = c, u.SAXStream = n, u.createStream = s, u.MAX_BUFFER_LENGTH = 64 * 1024;
      var h = [
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
      u.EVENTS = [
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
      function c(w, g) {
        if (!(this instanceof c))
          return new c(w, g);
        var H = this;
        l(H), H.q = H.c = "", H.bufferCheckPosition = u.MAX_BUFFER_LENGTH, H.opt = g || {}, H.opt.lowercase = H.opt.lowercase || H.opt.lowercasetags, H.looseCase = H.opt.lowercase ? "toLowerCase" : "toUpperCase", H.tags = [], H.closed = H.closedRoot = H.sawRoot = !1, H.tag = H.error = null, H.strict = !!w, H.noscript = !!(w || H.opt.noscript), H.state = y.BEGIN, H.strictEntities = H.opt.strictEntities, H.ENTITIES = H.strictEntities ? Object.create(u.XML_ENTITIES) : Object.create(u.ENTITIES), H.attribList = [], H.opt.xmlns && (H.ns = Object.create(E)), H.opt.unquotedAttributeValues === void 0 && (H.opt.unquotedAttributeValues = !w), H.trackPosition = H.opt.position !== !1, H.trackPosition && (H.position = H.line = H.column = 0), L(H, "onready");
      }
      Object.create || (Object.create = function(w) {
        function g() {
        }
        g.prototype = w;
        var H = new g();
        return H;
      }), Object.keys || (Object.keys = function(w) {
        var g = [];
        for (var H in w) w.hasOwnProperty(H) && g.push(H);
        return g;
      });
      function f(w) {
        for (var g = Math.max(u.MAX_BUFFER_LENGTH, 10), H = 0, N = 0, ue = h.length; N < ue; N++) {
          var he = w[h[N]].length;
          if (he > g)
            switch (h[N]) {
              case "textNode":
                q(w);
                break;
              case "cdata":
                $(w, "oncdata", w.cdata), w.cdata = "";
                break;
              case "script":
                $(w, "onscript", w.script), w.script = "";
                break;
              default:
                F(w, "Max buffer length exceeded: " + h[N]);
            }
          H = Math.max(H, he);
        }
        var pe = u.MAX_BUFFER_LENGTH - H;
        w.bufferCheckPosition = pe + w.position;
      }
      function l(w) {
        for (var g = 0, H = h.length; g < H; g++)
          w[h[g]] = "";
      }
      function a(w) {
        q(w), w.cdata !== "" && ($(w, "oncdata", w.cdata), w.cdata = ""), w.script !== "" && ($(w, "onscript", w.script), w.script = "");
      }
      c.prototype = {
        end: function() {
          j(this);
        },
        write: ve,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          a(this);
        }
      };
      var d;
      try {
        d = require("stream").Stream;
      } catch {
        d = function() {
        };
      }
      d || (d = function() {
      });
      var r = u.EVENTS.filter(function(w) {
        return w !== "error" && w !== "end";
      });
      function s(w, g) {
        return new n(w, g);
      }
      function n(w, g) {
        if (!(this instanceof n))
          return new n(w, g);
        d.apply(this), this._parser = new c(w, g), this.writable = !0, this.readable = !0;
        var H = this;
        this._parser.onend = function() {
          H.emit("end");
        }, this._parser.onerror = function(N) {
          H.emit("error", N), H._parser.error = null;
        }, this._decoder = null, r.forEach(function(N) {
          Object.defineProperty(H, "on" + N, {
            get: function() {
              return H._parser["on" + N];
            },
            set: function(ue) {
              if (!ue)
                return H.removeAllListeners(N), H._parser["on" + N] = ue, ue;
              H.on(N, ue);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      n.prototype = Object.create(d.prototype, {
        constructor: {
          value: n
        }
      }), n.prototype.write = function(w) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(w)) {
          if (!this._decoder) {
            var g = uc.StringDecoder;
            this._decoder = new g("utf8");
          }
          w = this._decoder.write(w);
        }
        return this._parser.write(w.toString()), this.emit("data", w), !0;
      }, n.prototype.end = function(w) {
        return w && w.length && this.write(w), this._parser.end(), !0;
      }, n.prototype.on = function(w, g) {
        var H = this;
        return !H._parser["on" + w] && r.indexOf(w) !== -1 && (H._parser["on" + w] = function() {
          var N = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          N.splice(0, 0, w), H.emit.apply(H, N);
        }), d.prototype.on.call(H, w, g);
      };
      var o = "[CDATA[", i = "DOCTYPE", m = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", E = { xml: m, xmlns: v }, p = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, S = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, R = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, D = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function P(w) {
        return w === " " || w === `
` || w === "\r" || w === "	";
      }
      function M(w) {
        return w === '"' || w === "'";
      }
      function b(w) {
        return w === ">" || P(w);
      }
      function _(w, g) {
        return w.test(g);
      }
      function T(w, g) {
        return !_(w, g);
      }
      var y = 0;
      u.STATE = {
        BEGIN: y++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: y++,
        // leading whitespace
        TEXT: y++,
        // general stuff
        TEXT_ENTITY: y++,
        // &amp and such.
        OPEN_WAKA: y++,
        // <
        SGML_DECL: y++,
        // <!BLARG
        SGML_DECL_QUOTED: y++,
        // <!BLARG foo "bar
        DOCTYPE: y++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: y++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: y++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: y++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: y++,
        // <!-
        COMMENT: y++,
        // <!--
        COMMENT_ENDING: y++,
        // <!-- blah -
        COMMENT_ENDED: y++,
        // <!-- blah --
        CDATA: y++,
        // <![CDATA[ something
        CDATA_ENDING: y++,
        // ]
        CDATA_ENDING_2: y++,
        // ]]
        PROC_INST: y++,
        // <?hi
        PROC_INST_BODY: y++,
        // <?hi there
        PROC_INST_ENDING: y++,
        // <?hi "there" ?
        OPEN_TAG: y++,
        // <strong
        OPEN_TAG_SLASH: y++,
        // <strong /
        ATTRIB: y++,
        // <a
        ATTRIB_NAME: y++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: y++,
        // <a foo _
        ATTRIB_VALUE: y++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: y++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: y++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: y++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: y++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: y++,
        // <foo bar=&quot
        CLOSE_TAG: y++,
        // </a
        CLOSE_TAG_SAW_WHITE: y++,
        // </a   >
        SCRIPT: y++,
        // <script> ...
        SCRIPT_ENDING: y++
        // <script> ... <
      }, u.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, u.ENTITIES = {
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
      }, Object.keys(u.ENTITIES).forEach(function(w) {
        var g = u.ENTITIES[w], H = typeof g == "number" ? String.fromCharCode(g) : g;
        u.ENTITIES[w] = H;
      });
      for (var k in u.STATE)
        u.STATE[u.STATE[k]] = k;
      y = u.STATE;
      function L(w, g, H) {
        w[g] && w[g](H);
      }
      function $(w, g, H) {
        w.textNode && q(w), L(w, g, H);
      }
      function q(w) {
        w.textNode = I(w.opt, w.textNode), w.textNode && L(w, "ontext", w.textNode), w.textNode = "";
      }
      function I(w, g) {
        return w.trim && (g = g.trim()), w.normalize && (g = g.replace(/\s+/g, " ")), g;
      }
      function F(w, g) {
        return q(w), w.trackPosition && (g += `
Line: ` + w.line + `
Column: ` + w.column + `
Char: ` + w.c), g = new Error(g), w.error = g, L(w, "onerror", g), w;
      }
      function j(w) {
        return w.sawRoot && !w.closedRoot && O(w, "Unclosed root tag"), w.state !== y.BEGIN && w.state !== y.BEGIN_WHITESPACE && w.state !== y.TEXT && F(w, "Unexpected end"), q(w), w.c = "", w.closed = !0, L(w, "onend"), c.call(w, w.strict, w.opt), w;
      }
      function O(w, g) {
        if (typeof w != "object" || !(w instanceof c))
          throw new Error("bad call to strictFail");
        w.strict && F(w, g);
      }
      function Q(w) {
        w.strict || (w.tagName = w.tagName[w.looseCase]());
        var g = w.tags[w.tags.length - 1] || w, H = w.tag = { name: w.tagName, attributes: {} };
        w.opt.xmlns && (H.ns = g.ns), w.attribList.length = 0, $(w, "onopentagstart", H);
      }
      function Y(w, g) {
        var H = w.indexOf(":"), N = H < 0 ? ["", w] : w.split(":"), ue = N[0], he = N[1];
        return g && w === "xmlns" && (ue = "xmlns", he = ""), { prefix: ue, local: he };
      }
      function ne(w) {
        if (w.strict || (w.attribName = w.attribName[w.looseCase]()), w.attribList.indexOf(w.attribName) !== -1 || w.tag.attributes.hasOwnProperty(w.attribName)) {
          w.attribName = w.attribValue = "";
          return;
        }
        if (w.opt.xmlns) {
          var g = Y(w.attribName, !0), H = g.prefix, N = g.local;
          if (H === "xmlns")
            if (N === "xml" && w.attribValue !== m)
              O(
                w,
                "xml: prefix must be bound to " + m + `
Actual: ` + w.attribValue
              );
            else if (N === "xmlns" && w.attribValue !== v)
              O(
                w,
                "xmlns: prefix must be bound to " + v + `
Actual: ` + w.attribValue
              );
            else {
              var ue = w.tag, he = w.tags[w.tags.length - 1] || w;
              ue.ns === he.ns && (ue.ns = Object.create(he.ns)), ue.ns[N] = w.attribValue;
            }
          w.attribList.push([w.attribName, w.attribValue]);
        } else
          w.tag.attributes[w.attribName] = w.attribValue, $(w, "onattribute", {
            name: w.attribName,
            value: w.attribValue
          });
        w.attribName = w.attribValue = "";
      }
      function de(w, g) {
        if (w.opt.xmlns) {
          var H = w.tag, N = Y(w.tagName);
          H.prefix = N.prefix, H.local = N.local, H.uri = H.ns[N.prefix] || "", H.prefix && !H.uri && (O(
            w,
            "Unbound namespace prefix: " + JSON.stringify(w.tagName)
          ), H.uri = N.prefix);
          var ue = w.tags[w.tags.length - 1] || w;
          H.ns && ue.ns !== H.ns && Object.keys(H.ns).forEach(function(e) {
            $(w, "onopennamespace", {
              prefix: e,
              uri: H.ns[e]
            });
          });
          for (var he = 0, pe = w.attribList.length; he < pe; he++) {
            var _e = w.attribList[he], Ee = _e[0], He = _e[1], Te = Y(Ee, !0), qe = Te.prefix, lt = Te.local, it = qe === "" ? "" : H.ns[qe] || "", rt = {
              name: Ee,
              value: He,
              prefix: qe,
              local: lt,
              uri: it
            };
            qe && qe !== "xmlns" && !it && (O(
              w,
              "Unbound namespace prefix: " + JSON.stringify(qe)
            ), rt.uri = qe), w.tag.attributes[Ee] = rt, $(w, "onattribute", rt);
          }
          w.attribList.length = 0;
        }
        w.tag.isSelfClosing = !!g, w.sawRoot = !0, w.tags.push(w.tag), $(w, "onopentag", w.tag), g || (!w.noscript && w.tagName.toLowerCase() === "script" ? w.state = y.SCRIPT : w.state = y.TEXT, w.tag = null, w.tagName = ""), w.attribName = w.attribValue = "", w.attribList.length = 0;
      }
      function ce(w) {
        if (!w.tagName) {
          O(w, "Weird empty close tag."), w.textNode += "</>", w.state = y.TEXT;
          return;
        }
        if (w.script) {
          if (w.tagName !== "script") {
            w.script += "</" + w.tagName + ">", w.tagName = "", w.state = y.SCRIPT;
            return;
          }
          $(w, "onscript", w.script), w.script = "";
        }
        var g = w.tags.length, H = w.tagName;
        w.strict || (H = H[w.looseCase]());
        for (var N = H; g--; ) {
          var ue = w.tags[g];
          if (ue.name !== N)
            O(w, "Unexpected close tag");
          else
            break;
        }
        if (g < 0) {
          O(w, "Unmatched closing tag: " + w.tagName), w.textNode += "</" + w.tagName + ">", w.state = y.TEXT;
          return;
        }
        w.tagName = H;
        for (var he = w.tags.length; he-- > g; ) {
          var pe = w.tag = w.tags.pop();
          w.tagName = w.tag.name, $(w, "onclosetag", w.tagName);
          var _e = {};
          for (var Ee in pe.ns)
            _e[Ee] = pe.ns[Ee];
          var He = w.tags[w.tags.length - 1] || w;
          w.opt.xmlns && pe.ns !== He.ns && Object.keys(pe.ns).forEach(function(Te) {
            var qe = pe.ns[Te];
            $(w, "onclosenamespace", { prefix: Te, uri: qe });
          });
        }
        g === 0 && (w.closedRoot = !0), w.tagName = w.attribValue = w.attribName = "", w.attribList.length = 0, w.state = y.TEXT;
      }
      function ge(w) {
        var g = w.entity, H = g.toLowerCase(), N, ue = "";
        return w.ENTITIES[g] ? w.ENTITIES[g] : w.ENTITIES[H] ? w.ENTITIES[H] : (g = H, g.charAt(0) === "#" && (g.charAt(1) === "x" ? (g = g.slice(2), N = parseInt(g, 16), ue = N.toString(16)) : (g = g.slice(1), N = parseInt(g, 10), ue = N.toString(10))), g = g.replace(/^0+/, ""), isNaN(N) || ue.toLowerCase() !== g || N < 0 || N > 1114111 ? (O(w, "Invalid character entity"), "&" + w.entity + ";") : String.fromCodePoint(N));
      }
      function ye(w, g) {
        g === "<" ? (w.state = y.OPEN_WAKA, w.startTagPosition = w.position) : P(g) || (O(w, "Non-whitespace before first tag."), w.textNode = g, w.state = y.TEXT);
      }
      function J(w, g) {
        var H = "";
        return g < w.length && (H = w.charAt(g)), H;
      }
      function ve(w) {
        var g = this;
        if (this.error)
          throw this.error;
        if (g.closed)
          return F(
            g,
            "Cannot write after close. Assign an onready handler."
          );
        if (w === null)
          return j(g);
        typeof w == "object" && (w = w.toString());
        for (var H = 0, N = ""; N = J(w, H++), g.c = N, !!N; )
          switch (g.trackPosition && (g.position++, N === `
` ? (g.line++, g.column = 0) : g.column++), g.state) {
            case y.BEGIN:
              if (g.state = y.BEGIN_WHITESPACE, N === "\uFEFF")
                continue;
              ye(g, N);
              continue;
            case y.BEGIN_WHITESPACE:
              ye(g, N);
              continue;
            case y.TEXT:
              if (g.sawRoot && !g.closedRoot) {
                for (var he = H - 1; N && N !== "<" && N !== "&"; )
                  N = J(w, H++), N && g.trackPosition && (g.position++, N === `
` ? (g.line++, g.column = 0) : g.column++);
                g.textNode += w.substring(he, H - 1);
              }
              N === "<" && !(g.sawRoot && g.closedRoot && !g.strict) ? (g.state = y.OPEN_WAKA, g.startTagPosition = g.position) : (!P(N) && (!g.sawRoot || g.closedRoot) && O(g, "Text data outside of root node."), N === "&" ? g.state = y.TEXT_ENTITY : g.textNode += N);
              continue;
            case y.SCRIPT:
              N === "<" ? g.state = y.SCRIPT_ENDING : g.script += N;
              continue;
            case y.SCRIPT_ENDING:
              N === "/" ? g.state = y.CLOSE_TAG : (g.script += "<" + N, g.state = y.SCRIPT);
              continue;
            case y.OPEN_WAKA:
              if (N === "!")
                g.state = y.SGML_DECL, g.sgmlDecl = "";
              else if (!P(N)) if (_(p, N))
                g.state = y.OPEN_TAG, g.tagName = N;
              else if (N === "/")
                g.state = y.CLOSE_TAG, g.tagName = "";
              else if (N === "?")
                g.state = y.PROC_INST, g.procInstName = g.procInstBody = "";
              else {
                if (O(g, "Unencoded <"), g.startTagPosition + 1 < g.position) {
                  var ue = g.position - g.startTagPosition;
                  N = new Array(ue).join(" ") + N;
                }
                g.textNode += "<" + N, g.state = y.TEXT;
              }
              continue;
            case y.SGML_DECL:
              if (g.sgmlDecl + N === "--") {
                g.state = y.COMMENT, g.comment = "", g.sgmlDecl = "";
                continue;
              }
              g.doctype && g.doctype !== !0 && g.sgmlDecl ? (g.state = y.DOCTYPE_DTD, g.doctype += "<!" + g.sgmlDecl + N, g.sgmlDecl = "") : (g.sgmlDecl + N).toUpperCase() === o ? ($(g, "onopencdata"), g.state = y.CDATA, g.sgmlDecl = "", g.cdata = "") : (g.sgmlDecl + N).toUpperCase() === i ? (g.state = y.DOCTYPE, (g.doctype || g.sawRoot) && O(
                g,
                "Inappropriately located doctype declaration"
              ), g.doctype = "", g.sgmlDecl = "") : N === ">" ? ($(g, "onsgmldeclaration", g.sgmlDecl), g.sgmlDecl = "", g.state = y.TEXT) : (M(N) && (g.state = y.SGML_DECL_QUOTED), g.sgmlDecl += N);
              continue;
            case y.SGML_DECL_QUOTED:
              N === g.q && (g.state = y.SGML_DECL, g.q = ""), g.sgmlDecl += N;
              continue;
            case y.DOCTYPE:
              N === ">" ? (g.state = y.TEXT, $(g, "ondoctype", g.doctype), g.doctype = !0) : (g.doctype += N, N === "[" ? g.state = y.DOCTYPE_DTD : M(N) && (g.state = y.DOCTYPE_QUOTED, g.q = N));
              continue;
            case y.DOCTYPE_QUOTED:
              g.doctype += N, N === g.q && (g.q = "", g.state = y.DOCTYPE);
              continue;
            case y.DOCTYPE_DTD:
              N === "]" ? (g.doctype += N, g.state = y.DOCTYPE) : N === "<" ? (g.state = y.OPEN_WAKA, g.startTagPosition = g.position) : M(N) ? (g.doctype += N, g.state = y.DOCTYPE_DTD_QUOTED, g.q = N) : g.doctype += N;
              continue;
            case y.DOCTYPE_DTD_QUOTED:
              g.doctype += N, N === g.q && (g.state = y.DOCTYPE_DTD, g.q = "");
              continue;
            case y.COMMENT:
              N === "-" ? g.state = y.COMMENT_ENDING : g.comment += N;
              continue;
            case y.COMMENT_ENDING:
              N === "-" ? (g.state = y.COMMENT_ENDED, g.comment = I(g.opt, g.comment), g.comment && $(g, "oncomment", g.comment), g.comment = "") : (g.comment += "-" + N, g.state = y.COMMENT);
              continue;
            case y.COMMENT_ENDED:
              N !== ">" ? (O(g, "Malformed comment"), g.comment += "--" + N, g.state = y.COMMENT) : g.doctype && g.doctype !== !0 ? g.state = y.DOCTYPE_DTD : g.state = y.TEXT;
              continue;
            case y.CDATA:
              for (var he = H - 1; N && N !== "]"; )
                N = J(w, H++), N && g.trackPosition && (g.position++, N === `
` ? (g.line++, g.column = 0) : g.column++);
              g.cdata += w.substring(he, H - 1), N === "]" && (g.state = y.CDATA_ENDING);
              continue;
            case y.CDATA_ENDING:
              N === "]" ? g.state = y.CDATA_ENDING_2 : (g.cdata += "]" + N, g.state = y.CDATA);
              continue;
            case y.CDATA_ENDING_2:
              N === ">" ? (g.cdata && $(g, "oncdata", g.cdata), $(g, "onclosecdata"), g.cdata = "", g.state = y.TEXT) : N === "]" ? g.cdata += "]" : (g.cdata += "]]" + N, g.state = y.CDATA);
              continue;
            case y.PROC_INST:
              N === "?" ? g.state = y.PROC_INST_ENDING : P(N) ? g.state = y.PROC_INST_BODY : g.procInstName += N;
              continue;
            case y.PROC_INST_BODY:
              if (!g.procInstBody && P(N))
                continue;
              N === "?" ? g.state = y.PROC_INST_ENDING : g.procInstBody += N;
              continue;
            case y.PROC_INST_ENDING:
              N === ">" ? ($(g, "onprocessinginstruction", {
                name: g.procInstName,
                body: g.procInstBody
              }), g.procInstName = g.procInstBody = "", g.state = y.TEXT) : (g.procInstBody += "?" + N, g.state = y.PROC_INST_BODY);
              continue;
            case y.OPEN_TAG:
              _(S, N) ? g.tagName += N : (Q(g), N === ">" ? de(g) : N === "/" ? g.state = y.OPEN_TAG_SLASH : (P(N) || O(g, "Invalid character in tag name"), g.state = y.ATTRIB));
              continue;
            case y.OPEN_TAG_SLASH:
              N === ">" ? (de(g, !0), ce(g)) : (O(
                g,
                "Forward-slash in opening tag not followed by >"
              ), g.state = y.ATTRIB);
              continue;
            case y.ATTRIB:
              if (P(N))
                continue;
              N === ">" ? de(g) : N === "/" ? g.state = y.OPEN_TAG_SLASH : _(p, N) ? (g.attribName = N, g.attribValue = "", g.state = y.ATTRIB_NAME) : O(g, "Invalid attribute name");
              continue;
            case y.ATTRIB_NAME:
              N === "=" ? g.state = y.ATTRIB_VALUE : N === ">" ? (O(g, "Attribute without value"), g.attribValue = g.attribName, ne(g), de(g)) : P(N) ? g.state = y.ATTRIB_NAME_SAW_WHITE : _(S, N) ? g.attribName += N : O(g, "Invalid attribute name");
              continue;
            case y.ATTRIB_NAME_SAW_WHITE:
              if (N === "=")
                g.state = y.ATTRIB_VALUE;
              else {
                if (P(N))
                  continue;
                O(g, "Attribute without value"), g.tag.attributes[g.attribName] = "", g.attribValue = "", $(g, "onattribute", {
                  name: g.attribName,
                  value: ""
                }), g.attribName = "", N === ">" ? de(g) : _(p, N) ? (g.attribName = N, g.state = y.ATTRIB_NAME) : (O(g, "Invalid attribute name"), g.state = y.ATTRIB);
              }
              continue;
            case y.ATTRIB_VALUE:
              if (P(N))
                continue;
              M(N) ? (g.q = N, g.state = y.ATTRIB_VALUE_QUOTED) : (g.opt.unquotedAttributeValues || F(g, "Unquoted attribute value"), g.state = y.ATTRIB_VALUE_UNQUOTED, g.attribValue = N);
              continue;
            case y.ATTRIB_VALUE_QUOTED:
              if (N !== g.q) {
                N === "&" ? g.state = y.ATTRIB_VALUE_ENTITY_Q : g.attribValue += N;
                continue;
              }
              ne(g), g.q = "", g.state = y.ATTRIB_VALUE_CLOSED;
              continue;
            case y.ATTRIB_VALUE_CLOSED:
              P(N) ? g.state = y.ATTRIB : N === ">" ? de(g) : N === "/" ? g.state = y.OPEN_TAG_SLASH : _(p, N) ? (O(g, "No whitespace between attributes"), g.attribName = N, g.attribValue = "", g.state = y.ATTRIB_NAME) : O(g, "Invalid attribute name");
              continue;
            case y.ATTRIB_VALUE_UNQUOTED:
              if (!b(N)) {
                N === "&" ? g.state = y.ATTRIB_VALUE_ENTITY_U : g.attribValue += N;
                continue;
              }
              ne(g), N === ">" ? de(g) : g.state = y.ATTRIB;
              continue;
            case y.CLOSE_TAG:
              if (g.tagName)
                N === ">" ? ce(g) : _(S, N) ? g.tagName += N : g.script ? (g.script += "</" + g.tagName, g.tagName = "", g.state = y.SCRIPT) : (P(N) || O(g, "Invalid tagname in closing tag"), g.state = y.CLOSE_TAG_SAW_WHITE);
              else {
                if (P(N))
                  continue;
                T(p, N) ? g.script ? (g.script += "</" + N, g.state = y.SCRIPT) : O(g, "Invalid tagname in closing tag.") : g.tagName = N;
              }
              continue;
            case y.CLOSE_TAG_SAW_WHITE:
              if (P(N))
                continue;
              N === ">" ? ce(g) : O(g, "Invalid characters in closing tag");
              continue;
            case y.TEXT_ENTITY:
            case y.ATTRIB_VALUE_ENTITY_Q:
            case y.ATTRIB_VALUE_ENTITY_U:
              var pe, _e;
              switch (g.state) {
                case y.TEXT_ENTITY:
                  pe = y.TEXT, _e = "textNode";
                  break;
                case y.ATTRIB_VALUE_ENTITY_Q:
                  pe = y.ATTRIB_VALUE_QUOTED, _e = "attribValue";
                  break;
                case y.ATTRIB_VALUE_ENTITY_U:
                  pe = y.ATTRIB_VALUE_UNQUOTED, _e = "attribValue";
                  break;
              }
              if (N === ";") {
                var Ee = ge(g);
                g.opt.unparsedEntities && !Object.values(u.XML_ENTITIES).includes(Ee) ? (g.entity = "", g.state = pe, g.write(Ee)) : (g[_e] += Ee, g.entity = "", g.state = pe);
              } else _(g.entity.length ? D : R, N) ? g.entity += N : (O(g, "Invalid character in entity name"), g[_e] += "&" + g.entity + N, g.entity = "", g.state = pe);
              continue;
            default:
              throw new Error(g, "Unknown state: " + g.state);
          }
        return g.position >= g.bufferCheckPosition && f(g), g;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || (function() {
        var w = String.fromCharCode, g = Math.floor, H = function() {
          var N = 16384, ue = [], he, pe, _e = -1, Ee = arguments.length;
          if (!Ee)
            return "";
          for (var He = ""; ++_e < Ee; ) {
            var Te = Number(arguments[_e]);
            if (!isFinite(Te) || // `NaN`, `+Infinity`, or `-Infinity`
            Te < 0 || // not a valid Unicode code point
            Te > 1114111 || // not a valid Unicode code point
            g(Te) !== Te)
              throw RangeError("Invalid code point: " + Te);
            Te <= 65535 ? ue.push(Te) : (Te -= 65536, he = (Te >> 10) + 55296, pe = Te % 1024 + 56320, ue.push(he, pe)), (_e + 1 === Ee || ue.length > N) && (He += w.apply(null, ue), ue.length = 0);
          }
          return He;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: H,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = H;
      })();
    })(t);
  })($n)), $n;
}
var To;
function Yc() {
  if (To) return Ft;
  To = 1, Object.defineProperty(Ft, "__esModule", { value: !0 }), Ft.XElement = void 0, Ft.parseXml = a;
  const t = Vc(), u = jr();
  class h {
    constructor(r) {
      if (this.name = r, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !r)
        throw (0, u.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!f(r))
        throw (0, u.newError)(`Invalid element name: ${r}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(r) {
      const s = this.attributes === null ? null : this.attributes[r];
      if (s == null)
        throw (0, u.newError)(`No attribute "${r}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return s;
    }
    removeAttribute(r) {
      this.attributes !== null && delete this.attributes[r];
    }
    element(r, s = !1, n = null) {
      const o = this.elementOrNull(r, s);
      if (o === null)
        throw (0, u.newError)(n || `No element "${r}"`, "ERR_XML_MISSED_ELEMENT");
      return o;
    }
    elementOrNull(r, s = !1) {
      if (this.elements === null)
        return null;
      for (const n of this.elements)
        if (l(n, r, s))
          return n;
      return null;
    }
    getElements(r, s = !1) {
      return this.elements === null ? [] : this.elements.filter((n) => l(n, r, s));
    }
    elementValueOrEmpty(r, s = !1) {
      const n = this.elementOrNull(r, s);
      return n === null ? "" : n.value;
    }
  }
  Ft.XElement = h;
  const c = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function f(d) {
    return c.test(d);
  }
  function l(d, r, s) {
    const n = d.name;
    return n === r || s === !0 && n.length === r.length && n.toLowerCase() === r.toLowerCase();
  }
  function a(d) {
    let r = null;
    const s = t.parser(!0, {}), n = [];
    return s.onopentag = (o) => {
      const i = new h(o.name);
      if (i.attributes = o.attributes, r === null)
        r = i;
      else {
        const m = n[n.length - 1];
        m.elements == null && (m.elements = []), m.elements.push(i);
      }
      n.push(i);
    }, s.onclosetag = () => {
      n.pop();
    }, s.ontext = (o) => {
      n.length > 0 && (n[n.length - 1].value = o);
    }, s.oncdata = (o) => {
      const i = n[n.length - 1];
      i.value = o, i.isCData = !0;
    }, s.onerror = (o) => {
      throw o;
    }, s.write(d), r;
  }
  return Ft;
}
var Ao;
function $e() {
  return Ao || (Ao = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.CURRENT_APP_PACKAGE_FILE_NAME = t.CURRENT_APP_INSTALLER_FILE_NAME = t.XElement = t.parseXml = t.UUID = t.parseDn = t.retry = t.githubUrl = t.getS3LikeProviderBaseUrl = t.ProgressCallbackTransform = t.MemoLazy = t.safeStringifyJson = t.safeGetHeader = t.parseJson = t.HttpExecutor = t.HttpError = t.DigestTransform = t.createHttpError = t.configureRequestUrl = t.configureRequestOptionsFromUrl = t.configureRequestOptions = t.newError = t.CancellationToken = t.CancellationError = void 0, t.asArray = o;
    var u = ra();
    Object.defineProperty(t, "CancellationError", { enumerable: !0, get: function() {
      return u.CancellationError;
    } }), Object.defineProperty(t, "CancellationToken", { enumerable: !0, get: function() {
      return u.CancellationToken;
    } });
    var h = jr();
    Object.defineProperty(t, "newError", { enumerable: !0, get: function() {
      return h.newError;
    } });
    var c = Mc();
    Object.defineProperty(t, "configureRequestOptions", { enumerable: !0, get: function() {
      return c.configureRequestOptions;
    } }), Object.defineProperty(t, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return c.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(t, "configureRequestUrl", { enumerable: !0, get: function() {
      return c.configureRequestUrl;
    } }), Object.defineProperty(t, "createHttpError", { enumerable: !0, get: function() {
      return c.createHttpError;
    } }), Object.defineProperty(t, "DigestTransform", { enumerable: !0, get: function() {
      return c.DigestTransform;
    } }), Object.defineProperty(t, "HttpError", { enumerable: !0, get: function() {
      return c.HttpError;
    } }), Object.defineProperty(t, "HttpExecutor", { enumerable: !0, get: function() {
      return c.HttpExecutor;
    } }), Object.defineProperty(t, "parseJson", { enumerable: !0, get: function() {
      return c.parseJson;
    } }), Object.defineProperty(t, "safeGetHeader", { enumerable: !0, get: function() {
      return c.safeGetHeader;
    } }), Object.defineProperty(t, "safeStringifyJson", { enumerable: !0, get: function() {
      return c.safeStringifyJson;
    } });
    var f = Bc();
    Object.defineProperty(t, "MemoLazy", { enumerable: !0, get: function() {
      return f.MemoLazy;
    } });
    var l = Nl();
    Object.defineProperty(t, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return l.ProgressCallbackTransform;
    } });
    var a = Hc();
    Object.defineProperty(t, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return a.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(t, "githubUrl", { enumerable: !0, get: function() {
      return a.githubUrl;
    } });
    var d = jc();
    Object.defineProperty(t, "retry", { enumerable: !0, get: function() {
      return d.retry;
    } });
    var r = Gc();
    Object.defineProperty(t, "parseDn", { enumerable: !0, get: function() {
      return r.parseDn;
    } });
    var s = Wc();
    Object.defineProperty(t, "UUID", { enumerable: !0, get: function() {
      return s.UUID;
    } });
    var n = Yc();
    Object.defineProperty(t, "parseXml", { enumerable: !0, get: function() {
      return n.parseXml;
    } }), Object.defineProperty(t, "XElement", { enumerable: !0, get: function() {
      return n.XElement;
    } }), t.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", t.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function o(i) {
      return i == null ? [] : Array.isArray(i) ? i : [i];
    }
  })(On)), On;
}
var ke = {}, Lr = {}, dt = {}, Ro;
function yr() {
  if (Ro) return dt;
  Ro = 1;
  function t(a) {
    return typeof a > "u" || a === null;
  }
  function u(a) {
    return typeof a == "object" && a !== null;
  }
  function h(a) {
    return Array.isArray(a) ? a : t(a) ? [] : [a];
  }
  function c(a, d) {
    var r, s, n, o;
    if (d)
      for (o = Object.keys(d), r = 0, s = o.length; r < s; r += 1)
        n = o[r], a[n] = d[n];
    return a;
  }
  function f(a, d) {
    var r = "", s;
    for (s = 0; s < d; s += 1)
      r += a;
    return r;
  }
  function l(a) {
    return a === 0 && Number.NEGATIVE_INFINITY === 1 / a;
  }
  return dt.isNothing = t, dt.isObject = u, dt.toArray = h, dt.repeat = f, dt.isNegativeZero = l, dt.extend = c, dt;
}
var Ln, bo;
function Er() {
  if (bo) return Ln;
  bo = 1;
  function t(h, c) {
    var f = "", l = h.reason || "(unknown reason)";
    return h.mark ? (h.mark.name && (f += 'in "' + h.mark.name + '" '), f += "(" + (h.mark.line + 1) + ":" + (h.mark.column + 1) + ")", !c && h.mark.snippet && (f += `

` + h.mark.snippet), l + " " + f) : l;
  }
  function u(h, c) {
    Error.call(this), this.name = "YAMLException", this.reason = h, this.mark = c, this.message = t(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return u.prototype = Object.create(Error.prototype), u.prototype.constructor = u, u.prototype.toString = function(c) {
    return this.name + ": " + t(this, c);
  }, Ln = u, Ln;
}
var Un, Co;
function zc() {
  if (Co) return Un;
  Co = 1;
  var t = yr();
  function u(f, l, a, d, r) {
    var s = "", n = "", o = Math.floor(r / 2) - 1;
    return d - l > o && (s = " ... ", l = d - o + s.length), a - d > o && (n = " ...", a = d + o - n.length), {
      str: s + f.slice(l, a).replace(/\t/g, "→") + n,
      pos: d - l + s.length
      // relative position
    };
  }
  function h(f, l) {
    return t.repeat(" ", l - f.length) + f;
  }
  function c(f, l) {
    if (l = Object.create(l || null), !f.buffer) return null;
    l.maxLength || (l.maxLength = 79), typeof l.indent != "number" && (l.indent = 1), typeof l.linesBefore != "number" && (l.linesBefore = 3), typeof l.linesAfter != "number" && (l.linesAfter = 2);
    for (var a = /\r?\n|\r|\0/g, d = [0], r = [], s, n = -1; s = a.exec(f.buffer); )
      r.push(s.index), d.push(s.index + s[0].length), f.position <= s.index && n < 0 && (n = d.length - 2);
    n < 0 && (n = d.length - 1);
    var o = "", i, m, v = Math.min(f.line + l.linesAfter, r.length).toString().length, E = l.maxLength - (l.indent + v + 3);
    for (i = 1; i <= l.linesBefore && !(n - i < 0); i++)
      m = u(
        f.buffer,
        d[n - i],
        r[n - i],
        f.position - (d[n] - d[n - i]),
        E
      ), o = t.repeat(" ", l.indent) + h((f.line - i + 1).toString(), v) + " | " + m.str + `
` + o;
    for (m = u(f.buffer, d[n], r[n], f.position, E), o += t.repeat(" ", l.indent) + h((f.line + 1).toString(), v) + " | " + m.str + `
`, o += t.repeat("-", l.indent + v + 3 + m.pos) + `^
`, i = 1; i <= l.linesAfter && !(n + i >= r.length); i++)
      m = u(
        f.buffer,
        d[n + i],
        r[n + i],
        f.position - (d[n] - d[n + i]),
        E
      ), o += t.repeat(" ", l.indent) + h((f.line + i + 1).toString(), v) + " | " + m.str + `
`;
    return o.replace(/\n$/, "");
  }
  return Un = c, Un;
}
var kn, Do;
function Me() {
  if (Do) return kn;
  Do = 1;
  var t = Er(), u = [
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
  ], h = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function c(l) {
    var a = {};
    return l !== null && Object.keys(l).forEach(function(d) {
      l[d].forEach(function(r) {
        a[String(r)] = d;
      });
    }), a;
  }
  function f(l, a) {
    if (a = a || {}, Object.keys(a).forEach(function(d) {
      if (u.indexOf(d) === -1)
        throw new t('Unknown option "' + d + '" is met in definition of "' + l + '" YAML type.');
    }), this.options = a, this.tag = l, this.kind = a.kind || null, this.resolve = a.resolve || function() {
      return !0;
    }, this.construct = a.construct || function(d) {
      return d;
    }, this.instanceOf = a.instanceOf || null, this.predicate = a.predicate || null, this.represent = a.represent || null, this.representName = a.representName || null, this.defaultStyle = a.defaultStyle || null, this.multi = a.multi || !1, this.styleAliases = c(a.styleAliases || null), h.indexOf(this.kind) === -1)
      throw new t('Unknown kind "' + this.kind + '" is specified for "' + l + '" YAML type.');
  }
  return kn = f, kn;
}
var qn, Po;
function Fl() {
  if (Po) return qn;
  Po = 1;
  var t = Er(), u = Me();
  function h(l, a) {
    var d = [];
    return l[a].forEach(function(r) {
      var s = d.length;
      d.forEach(function(n, o) {
        n.tag === r.tag && n.kind === r.kind && n.multi === r.multi && (s = o);
      }), d[s] = r;
    }), d;
  }
  function c() {
    var l = {
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
    }, a, d;
    function r(s) {
      s.multi ? (l.multi[s.kind].push(s), l.multi.fallback.push(s)) : l[s.kind][s.tag] = l.fallback[s.tag] = s;
    }
    for (a = 0, d = arguments.length; a < d; a += 1)
      arguments[a].forEach(r);
    return l;
  }
  function f(l) {
    return this.extend(l);
  }
  return f.prototype.extend = function(a) {
    var d = [], r = [];
    if (a instanceof u)
      r.push(a);
    else if (Array.isArray(a))
      r = r.concat(a);
    else if (a && (Array.isArray(a.implicit) || Array.isArray(a.explicit)))
      a.implicit && (d = d.concat(a.implicit)), a.explicit && (r = r.concat(a.explicit));
    else
      throw new t("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    d.forEach(function(n) {
      if (!(n instanceof u))
        throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (n.loadKind && n.loadKind !== "scalar")
        throw new t("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (n.multi)
        throw new t("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), r.forEach(function(n) {
      if (!(n instanceof u))
        throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var s = Object.create(f.prototype);
    return s.implicit = (this.implicit || []).concat(d), s.explicit = (this.explicit || []).concat(r), s.compiledImplicit = h(s, "implicit"), s.compiledExplicit = h(s, "explicit"), s.compiledTypeMap = c(s.compiledImplicit, s.compiledExplicit), s;
  }, qn = f, qn;
}
var Mn, Oo;
function xl() {
  if (Oo) return Mn;
  Oo = 1;
  var t = Me();
  return Mn = new t("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(u) {
      return u !== null ? u : "";
    }
  }), Mn;
}
var Bn, Io;
function $l() {
  if (Io) return Bn;
  Io = 1;
  var t = Me();
  return Bn = new t("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(u) {
      return u !== null ? u : [];
    }
  }), Bn;
}
var Hn, No;
function Ll() {
  if (No) return Hn;
  No = 1;
  var t = Me();
  return Hn = new t("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(u) {
      return u !== null ? u : {};
    }
  }), Hn;
}
var jn, Fo;
function Ul() {
  if (Fo) return jn;
  Fo = 1;
  var t = Fl();
  return jn = new t({
    explicit: [
      xl(),
      $l(),
      Ll()
    ]
  }), jn;
}
var Gn, xo;
function kl() {
  if (xo) return Gn;
  xo = 1;
  var t = Me();
  function u(f) {
    if (f === null) return !0;
    var l = f.length;
    return l === 1 && f === "~" || l === 4 && (f === "null" || f === "Null" || f === "NULL");
  }
  function h() {
    return null;
  }
  function c(f) {
    return f === null;
  }
  return Gn = new t("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: u,
    construct: h,
    predicate: c,
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
  }), Gn;
}
var Wn, $o;
function ql() {
  if ($o) return Wn;
  $o = 1;
  var t = Me();
  function u(f) {
    if (f === null) return !1;
    var l = f.length;
    return l === 4 && (f === "true" || f === "True" || f === "TRUE") || l === 5 && (f === "false" || f === "False" || f === "FALSE");
  }
  function h(f) {
    return f === "true" || f === "True" || f === "TRUE";
  }
  function c(f) {
    return Object.prototype.toString.call(f) === "[object Boolean]";
  }
  return Wn = new t("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: u,
    construct: h,
    predicate: c,
    represent: {
      lowercase: function(f) {
        return f ? "true" : "false";
      },
      uppercase: function(f) {
        return f ? "TRUE" : "FALSE";
      },
      camelcase: function(f) {
        return f ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), Wn;
}
var Vn, Lo;
function Ml() {
  if (Lo) return Vn;
  Lo = 1;
  var t = yr(), u = Me();
  function h(r) {
    return 48 <= r && r <= 57 || 65 <= r && r <= 70 || 97 <= r && r <= 102;
  }
  function c(r) {
    return 48 <= r && r <= 55;
  }
  function f(r) {
    return 48 <= r && r <= 57;
  }
  function l(r) {
    if (r === null) return !1;
    var s = r.length, n = 0, o = !1, i;
    if (!s) return !1;
    if (i = r[n], (i === "-" || i === "+") && (i = r[++n]), i === "0") {
      if (n + 1 === s) return !0;
      if (i = r[++n], i === "b") {
        for (n++; n < s; n++)
          if (i = r[n], i !== "_") {
            if (i !== "0" && i !== "1") return !1;
            o = !0;
          }
        return o && i !== "_";
      }
      if (i === "x") {
        for (n++; n < s; n++)
          if (i = r[n], i !== "_") {
            if (!h(r.charCodeAt(n))) return !1;
            o = !0;
          }
        return o && i !== "_";
      }
      if (i === "o") {
        for (n++; n < s; n++)
          if (i = r[n], i !== "_") {
            if (!c(r.charCodeAt(n))) return !1;
            o = !0;
          }
        return o && i !== "_";
      }
    }
    if (i === "_") return !1;
    for (; n < s; n++)
      if (i = r[n], i !== "_") {
        if (!f(r.charCodeAt(n)))
          return !1;
        o = !0;
      }
    return !(!o || i === "_");
  }
  function a(r) {
    var s = r, n = 1, o;
    if (s.indexOf("_") !== -1 && (s = s.replace(/_/g, "")), o = s[0], (o === "-" || o === "+") && (o === "-" && (n = -1), s = s.slice(1), o = s[0]), s === "0") return 0;
    if (o === "0") {
      if (s[1] === "b") return n * parseInt(s.slice(2), 2);
      if (s[1] === "x") return n * parseInt(s.slice(2), 16);
      if (s[1] === "o") return n * parseInt(s.slice(2), 8);
    }
    return n * parseInt(s, 10);
  }
  function d(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && r % 1 === 0 && !t.isNegativeZero(r);
  }
  return Vn = new u("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: l,
    construct: a,
    predicate: d,
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
  }), Vn;
}
var Yn, Uo;
function Bl() {
  if (Uo) return Yn;
  Uo = 1;
  var t = yr(), u = Me(), h = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function c(r) {
    return !(r === null || !h.test(r) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    r[r.length - 1] === "_");
  }
  function f(r) {
    var s, n;
    return s = r.replace(/_/g, "").toLowerCase(), n = s[0] === "-" ? -1 : 1, "+-".indexOf(s[0]) >= 0 && (s = s.slice(1)), s === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : s === ".nan" ? NaN : n * parseFloat(s, 10);
  }
  var l = /^[-+]?[0-9]+e/;
  function a(r, s) {
    var n;
    if (isNaN(r))
      switch (s) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === r)
      switch (s) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === r)
      switch (s) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (t.isNegativeZero(r))
      return "-0.0";
    return n = r.toString(10), l.test(n) ? n.replace("e", ".e") : n;
  }
  function d(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && (r % 1 !== 0 || t.isNegativeZero(r));
  }
  return Yn = new u("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: c,
    construct: f,
    predicate: d,
    represent: a,
    defaultStyle: "lowercase"
  }), Yn;
}
var zn, ko;
function Hl() {
  return ko || (ko = 1, zn = Ul().extend({
    implicit: [
      kl(),
      ql(),
      Ml(),
      Bl()
    ]
  })), zn;
}
var Xn, qo;
function jl() {
  return qo || (qo = 1, Xn = Hl()), Xn;
}
var Kn, Mo;
function Gl() {
  if (Mo) return Kn;
  Mo = 1;
  var t = Me(), u = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), h = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function c(a) {
    return a === null ? !1 : u.exec(a) !== null || h.exec(a) !== null;
  }
  function f(a) {
    var d, r, s, n, o, i, m, v = 0, E = null, p, S, R;
    if (d = u.exec(a), d === null && (d = h.exec(a)), d === null) throw new Error("Date resolve error");
    if (r = +d[1], s = +d[2] - 1, n = +d[3], !d[4])
      return new Date(Date.UTC(r, s, n));
    if (o = +d[4], i = +d[5], m = +d[6], d[7]) {
      for (v = d[7].slice(0, 3); v.length < 3; )
        v += "0";
      v = +v;
    }
    return d[9] && (p = +d[10], S = +(d[11] || 0), E = (p * 60 + S) * 6e4, d[9] === "-" && (E = -E)), R = new Date(Date.UTC(r, s, n, o, i, m, v)), E && R.setTime(R.getTime() - E), R;
  }
  function l(a) {
    return a.toISOString();
  }
  return Kn = new t("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: c,
    construct: f,
    instanceOf: Date,
    represent: l
  }), Kn;
}
var Jn, Bo;
function Wl() {
  if (Bo) return Jn;
  Bo = 1;
  var t = Me();
  function u(h) {
    return h === "<<" || h === null;
  }
  return Jn = new t("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: u
  }), Jn;
}
var Qn, Ho;
function Vl() {
  if (Ho) return Qn;
  Ho = 1;
  var t = Me(), u = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function h(a) {
    if (a === null) return !1;
    var d, r, s = 0, n = a.length, o = u;
    for (r = 0; r < n; r++)
      if (d = o.indexOf(a.charAt(r)), !(d > 64)) {
        if (d < 0) return !1;
        s += 6;
      }
    return s % 8 === 0;
  }
  function c(a) {
    var d, r, s = a.replace(/[\r\n=]/g, ""), n = s.length, o = u, i = 0, m = [];
    for (d = 0; d < n; d++)
      d % 4 === 0 && d && (m.push(i >> 16 & 255), m.push(i >> 8 & 255), m.push(i & 255)), i = i << 6 | o.indexOf(s.charAt(d));
    return r = n % 4 * 6, r === 0 ? (m.push(i >> 16 & 255), m.push(i >> 8 & 255), m.push(i & 255)) : r === 18 ? (m.push(i >> 10 & 255), m.push(i >> 2 & 255)) : r === 12 && m.push(i >> 4 & 255), new Uint8Array(m);
  }
  function f(a) {
    var d = "", r = 0, s, n, o = a.length, i = u;
    for (s = 0; s < o; s++)
      s % 3 === 0 && s && (d += i[r >> 18 & 63], d += i[r >> 12 & 63], d += i[r >> 6 & 63], d += i[r & 63]), r = (r << 8) + a[s];
    return n = o % 3, n === 0 ? (d += i[r >> 18 & 63], d += i[r >> 12 & 63], d += i[r >> 6 & 63], d += i[r & 63]) : n === 2 ? (d += i[r >> 10 & 63], d += i[r >> 4 & 63], d += i[r << 2 & 63], d += i[64]) : n === 1 && (d += i[r >> 2 & 63], d += i[r << 4 & 63], d += i[64], d += i[64]), d;
  }
  function l(a) {
    return Object.prototype.toString.call(a) === "[object Uint8Array]";
  }
  return Qn = new t("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: h,
    construct: c,
    predicate: l,
    represent: f
  }), Qn;
}
var Zn, jo;
function Yl() {
  if (jo) return Zn;
  jo = 1;
  var t = Me(), u = Object.prototype.hasOwnProperty, h = Object.prototype.toString;
  function c(l) {
    if (l === null) return !0;
    var a = [], d, r, s, n, o, i = l;
    for (d = 0, r = i.length; d < r; d += 1) {
      if (s = i[d], o = !1, h.call(s) !== "[object Object]") return !1;
      for (n in s)
        if (u.call(s, n))
          if (!o) o = !0;
          else return !1;
      if (!o) return !1;
      if (a.indexOf(n) === -1) a.push(n);
      else return !1;
    }
    return !0;
  }
  function f(l) {
    return l !== null ? l : [];
  }
  return Zn = new t("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: c,
    construct: f
  }), Zn;
}
var ei, Go;
function zl() {
  if (Go) return ei;
  Go = 1;
  var t = Me(), u = Object.prototype.toString;
  function h(f) {
    if (f === null) return !0;
    var l, a, d, r, s, n = f;
    for (s = new Array(n.length), l = 0, a = n.length; l < a; l += 1) {
      if (d = n[l], u.call(d) !== "[object Object]" || (r = Object.keys(d), r.length !== 1)) return !1;
      s[l] = [r[0], d[r[0]]];
    }
    return !0;
  }
  function c(f) {
    if (f === null) return [];
    var l, a, d, r, s, n = f;
    for (s = new Array(n.length), l = 0, a = n.length; l < a; l += 1)
      d = n[l], r = Object.keys(d), s[l] = [r[0], d[r[0]]];
    return s;
  }
  return ei = new t("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: h,
    construct: c
  }), ei;
}
var ti, Wo;
function Xl() {
  if (Wo) return ti;
  Wo = 1;
  var t = Me(), u = Object.prototype.hasOwnProperty;
  function h(f) {
    if (f === null) return !0;
    var l, a = f;
    for (l in a)
      if (u.call(a, l) && a[l] !== null)
        return !1;
    return !0;
  }
  function c(f) {
    return f !== null ? f : {};
  }
  return ti = new t("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: h,
    construct: c
  }), ti;
}
var ri, Vo;
function na() {
  return Vo || (Vo = 1, ri = jl().extend({
    implicit: [
      Gl(),
      Wl()
    ],
    explicit: [
      Vl(),
      Yl(),
      zl(),
      Xl()
    ]
  })), ri;
}
var Yo;
function Xc() {
  if (Yo) return Lr;
  Yo = 1;
  var t = yr(), u = Er(), h = zc(), c = na(), f = Object.prototype.hasOwnProperty, l = 1, a = 2, d = 3, r = 4, s = 1, n = 2, o = 3, i = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, m = /[\x85\u2028\u2029]/, v = /[,\[\]\{\}]/, E = /^(?:!|!!|![a-z\-]+!)$/i, p = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function S(e) {
    return Object.prototype.toString.call(e);
  }
  function R(e) {
    return e === 10 || e === 13;
  }
  function D(e) {
    return e === 9 || e === 32;
  }
  function P(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function M(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function b(e) {
    var B;
    return 48 <= e && e <= 57 ? e - 48 : (B = e | 32, 97 <= B && B <= 102 ? B - 97 + 10 : -1);
  }
  function _(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function T(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function y(e) {
    return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
  }
  function k(e) {
    return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
      (e - 65536 >> 10) + 55296,
      (e - 65536 & 1023) + 56320
    );
  }
  function L(e, B, G) {
    B === "__proto__" ? Object.defineProperty(e, B, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: G
    }) : e[B] = G;
  }
  for (var $ = new Array(256), q = new Array(256), I = 0; I < 256; I++)
    $[I] = y(I) ? 1 : 0, q[I] = y(I);
  function F(e, B) {
    this.input = e, this.filename = B.filename || null, this.schema = B.schema || c, this.onWarning = B.onWarning || null, this.legacy = B.legacy || !1, this.json = B.json || !1, this.listener = B.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function j(e, B) {
    var G = {
      name: e.filename,
      buffer: e.input.slice(0, -1),
      // omit trailing \0
      position: e.position,
      line: e.line,
      column: e.position - e.lineStart
    };
    return G.snippet = h(G), new u(B, G);
  }
  function O(e, B) {
    throw j(e, B);
  }
  function Q(e, B) {
    e.onWarning && e.onWarning.call(null, j(e, B));
  }
  var Y = {
    YAML: function(B, G, re) {
      var W, te, Z;
      B.version !== null && O(B, "duplication of %YAML directive"), re.length !== 1 && O(B, "YAML directive accepts exactly one argument"), W = /^([0-9]+)\.([0-9]+)$/.exec(re[0]), W === null && O(B, "ill-formed argument of the YAML directive"), te = parseInt(W[1], 10), Z = parseInt(W[2], 10), te !== 1 && O(B, "unacceptable YAML version of the document"), B.version = re[0], B.checkLineBreaks = Z < 2, Z !== 1 && Z !== 2 && Q(B, "unsupported YAML version of the document");
    },
    TAG: function(B, G, re) {
      var W, te;
      re.length !== 2 && O(B, "TAG directive accepts exactly two arguments"), W = re[0], te = re[1], E.test(W) || O(B, "ill-formed tag handle (first argument) of the TAG directive"), f.call(B.tagMap, W) && O(B, 'there is a previously declared suffix for "' + W + '" tag handle'), p.test(te) || O(B, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        te = decodeURIComponent(te);
      } catch {
        O(B, "tag prefix is malformed: " + te);
      }
      B.tagMap[W] = te;
    }
  };
  function ne(e, B, G, re) {
    var W, te, Z, ae;
    if (B < G) {
      if (ae = e.input.slice(B, G), re)
        for (W = 0, te = ae.length; W < te; W += 1)
          Z = ae.charCodeAt(W), Z === 9 || 32 <= Z && Z <= 1114111 || O(e, "expected valid JSON character");
      else i.test(ae) && O(e, "the stream contains non-printable characters");
      e.result += ae;
    }
  }
  function de(e, B, G, re) {
    var W, te, Z, ae;
    for (t.isObject(G) || O(e, "cannot merge mappings; the provided source object is unacceptable"), W = Object.keys(G), Z = 0, ae = W.length; Z < ae; Z += 1)
      te = W[Z], f.call(B, te) || (L(B, te, G[te]), re[te] = !0);
  }
  function ce(e, B, G, re, W, te, Z, ae, le) {
    var Ae, Re;
    if (Array.isArray(W))
      for (W = Array.prototype.slice.call(W), Ae = 0, Re = W.length; Ae < Re; Ae += 1)
        Array.isArray(W[Ae]) && O(e, "nested arrays are not supported inside keys"), typeof W == "object" && S(W[Ae]) === "[object Object]" && (W[Ae] = "[object Object]");
    if (typeof W == "object" && S(W) === "[object Object]" && (W = "[object Object]"), W = String(W), B === null && (B = {}), re === "tag:yaml.org,2002:merge")
      if (Array.isArray(te))
        for (Ae = 0, Re = te.length; Ae < Re; Ae += 1)
          de(e, B, te[Ae], G);
      else
        de(e, B, te, G);
    else
      !e.json && !f.call(G, W) && f.call(B, W) && (e.line = Z || e.line, e.lineStart = ae || e.lineStart, e.position = le || e.position, O(e, "duplicated mapping key")), L(B, W, te), delete G[W];
    return B;
  }
  function ge(e) {
    var B;
    B = e.input.charCodeAt(e.position), B === 10 ? e.position++ : B === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : O(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
  }
  function ye(e, B, G) {
    for (var re = 0, W = e.input.charCodeAt(e.position); W !== 0; ) {
      for (; D(W); )
        W === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), W = e.input.charCodeAt(++e.position);
      if (B && W === 35)
        do
          W = e.input.charCodeAt(++e.position);
        while (W !== 10 && W !== 13 && W !== 0);
      if (R(W))
        for (ge(e), W = e.input.charCodeAt(e.position), re++, e.lineIndent = 0; W === 32; )
          e.lineIndent++, W = e.input.charCodeAt(++e.position);
      else
        break;
    }
    return G !== -1 && re !== 0 && e.lineIndent < G && Q(e, "deficient indentation"), re;
  }
  function J(e) {
    var B = e.position, G;
    return G = e.input.charCodeAt(B), !!((G === 45 || G === 46) && G === e.input.charCodeAt(B + 1) && G === e.input.charCodeAt(B + 2) && (B += 3, G = e.input.charCodeAt(B), G === 0 || P(G)));
  }
  function ve(e, B) {
    B === 1 ? e.result += " " : B > 1 && (e.result += t.repeat(`
`, B - 1));
  }
  function w(e, B, G) {
    var re, W, te, Z, ae, le, Ae, Re, me = e.kind, A = e.result, U;
    if (U = e.input.charCodeAt(e.position), P(U) || M(U) || U === 35 || U === 38 || U === 42 || U === 33 || U === 124 || U === 62 || U === 39 || U === 34 || U === 37 || U === 64 || U === 96 || (U === 63 || U === 45) && (W = e.input.charCodeAt(e.position + 1), P(W) || G && M(W)))
      return !1;
    for (e.kind = "scalar", e.result = "", te = Z = e.position, ae = !1; U !== 0; ) {
      if (U === 58) {
        if (W = e.input.charCodeAt(e.position + 1), P(W) || G && M(W))
          break;
      } else if (U === 35) {
        if (re = e.input.charCodeAt(e.position - 1), P(re))
          break;
      } else {
        if (e.position === e.lineStart && J(e) || G && M(U))
          break;
        if (R(U))
          if (le = e.line, Ae = e.lineStart, Re = e.lineIndent, ye(e, !1, -1), e.lineIndent >= B) {
            ae = !0, U = e.input.charCodeAt(e.position);
            continue;
          } else {
            e.position = Z, e.line = le, e.lineStart = Ae, e.lineIndent = Re;
            break;
          }
      }
      ae && (ne(e, te, Z, !1), ve(e, e.line - le), te = Z = e.position, ae = !1), D(U) || (Z = e.position + 1), U = e.input.charCodeAt(++e.position);
    }
    return ne(e, te, Z, !1), e.result ? !0 : (e.kind = me, e.result = A, !1);
  }
  function g(e, B) {
    var G, re, W;
    if (G = e.input.charCodeAt(e.position), G !== 39)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, re = W = e.position; (G = e.input.charCodeAt(e.position)) !== 0; )
      if (G === 39)
        if (ne(e, re, e.position, !0), G = e.input.charCodeAt(++e.position), G === 39)
          re = e.position, e.position++, W = e.position;
        else
          return !0;
      else R(G) ? (ne(e, re, W, !0), ve(e, ye(e, !1, B)), re = W = e.position) : e.position === e.lineStart && J(e) ? O(e, "unexpected end of the document within a single quoted scalar") : (e.position++, W = e.position);
    O(e, "unexpected end of the stream within a single quoted scalar");
  }
  function H(e, B) {
    var G, re, W, te, Z, ae;
    if (ae = e.input.charCodeAt(e.position), ae !== 34)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, G = re = e.position; (ae = e.input.charCodeAt(e.position)) !== 0; ) {
      if (ae === 34)
        return ne(e, G, e.position, !0), e.position++, !0;
      if (ae === 92) {
        if (ne(e, G, e.position, !0), ae = e.input.charCodeAt(++e.position), R(ae))
          ye(e, !1, B);
        else if (ae < 256 && $[ae])
          e.result += q[ae], e.position++;
        else if ((Z = _(ae)) > 0) {
          for (W = Z, te = 0; W > 0; W--)
            ae = e.input.charCodeAt(++e.position), (Z = b(ae)) >= 0 ? te = (te << 4) + Z : O(e, "expected hexadecimal character");
          e.result += k(te), e.position++;
        } else
          O(e, "unknown escape sequence");
        G = re = e.position;
      } else R(ae) ? (ne(e, G, re, !0), ve(e, ye(e, !1, B)), G = re = e.position) : e.position === e.lineStart && J(e) ? O(e, "unexpected end of the document within a double quoted scalar") : (e.position++, re = e.position);
    }
    O(e, "unexpected end of the stream within a double quoted scalar");
  }
  function N(e, B) {
    var G = !0, re, W, te, Z = e.tag, ae, le = e.anchor, Ae, Re, me, A, U, V = /* @__PURE__ */ Object.create(null), z, X, ie, ee;
    if (ee = e.input.charCodeAt(e.position), ee === 91)
      Re = 93, U = !1, ae = [];
    else if (ee === 123)
      Re = 125, U = !0, ae = {};
    else
      return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = ae), ee = e.input.charCodeAt(++e.position); ee !== 0; ) {
      if (ye(e, !0, B), ee = e.input.charCodeAt(e.position), ee === Re)
        return e.position++, e.tag = Z, e.anchor = le, e.kind = U ? "mapping" : "sequence", e.result = ae, !0;
      G ? ee === 44 && O(e, "expected the node content, but found ','") : O(e, "missed comma between flow collection entries"), X = z = ie = null, me = A = !1, ee === 63 && (Ae = e.input.charCodeAt(e.position + 1), P(Ae) && (me = A = !0, e.position++, ye(e, !0, B))), re = e.line, W = e.lineStart, te = e.position, Te(e, B, l, !1, !0), X = e.tag, z = e.result, ye(e, !0, B), ee = e.input.charCodeAt(e.position), (A || e.line === re) && ee === 58 && (me = !0, ee = e.input.charCodeAt(++e.position), ye(e, !0, B), Te(e, B, l, !1, !0), ie = e.result), U ? ce(e, ae, V, X, z, ie, re, W, te) : me ? ae.push(ce(e, null, V, X, z, ie, re, W, te)) : ae.push(z), ye(e, !0, B), ee = e.input.charCodeAt(e.position), ee === 44 ? (G = !0, ee = e.input.charCodeAt(++e.position)) : G = !1;
    }
    O(e, "unexpected end of the stream within a flow collection");
  }
  function ue(e, B) {
    var G, re, W = s, te = !1, Z = !1, ae = B, le = 0, Ae = !1, Re, me;
    if (me = e.input.charCodeAt(e.position), me === 124)
      re = !1;
    else if (me === 62)
      re = !0;
    else
      return !1;
    for (e.kind = "scalar", e.result = ""; me !== 0; )
      if (me = e.input.charCodeAt(++e.position), me === 43 || me === 45)
        s === W ? W = me === 43 ? o : n : O(e, "repeat of a chomping mode identifier");
      else if ((Re = T(me)) >= 0)
        Re === 0 ? O(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : Z ? O(e, "repeat of an indentation width identifier") : (ae = B + Re - 1, Z = !0);
      else
        break;
    if (D(me)) {
      do
        me = e.input.charCodeAt(++e.position);
      while (D(me));
      if (me === 35)
        do
          me = e.input.charCodeAt(++e.position);
        while (!R(me) && me !== 0);
    }
    for (; me !== 0; ) {
      for (ge(e), e.lineIndent = 0, me = e.input.charCodeAt(e.position); (!Z || e.lineIndent < ae) && me === 32; )
        e.lineIndent++, me = e.input.charCodeAt(++e.position);
      if (!Z && e.lineIndent > ae && (ae = e.lineIndent), R(me)) {
        le++;
        continue;
      }
      if (e.lineIndent < ae) {
        W === o ? e.result += t.repeat(`
`, te ? 1 + le : le) : W === s && te && (e.result += `
`);
        break;
      }
      for (re ? D(me) ? (Ae = !0, e.result += t.repeat(`
`, te ? 1 + le : le)) : Ae ? (Ae = !1, e.result += t.repeat(`
`, le + 1)) : le === 0 ? te && (e.result += " ") : e.result += t.repeat(`
`, le) : e.result += t.repeat(`
`, te ? 1 + le : le), te = !0, Z = !0, le = 0, G = e.position; !R(me) && me !== 0; )
        me = e.input.charCodeAt(++e.position);
      ne(e, G, e.position, !1);
    }
    return !0;
  }
  function he(e, B) {
    var G, re = e.tag, W = e.anchor, te = [], Z, ae = !1, le;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = te), le = e.input.charCodeAt(e.position); le !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, O(e, "tab characters must not be used in indentation")), !(le !== 45 || (Z = e.input.charCodeAt(e.position + 1), !P(Z)))); ) {
      if (ae = !0, e.position++, ye(e, !0, -1) && e.lineIndent <= B) {
        te.push(null), le = e.input.charCodeAt(e.position);
        continue;
      }
      if (G = e.line, Te(e, B, d, !1, !0), te.push(e.result), ye(e, !0, -1), le = e.input.charCodeAt(e.position), (e.line === G || e.lineIndent > B) && le !== 0)
        O(e, "bad indentation of a sequence entry");
      else if (e.lineIndent < B)
        break;
    }
    return ae ? (e.tag = re, e.anchor = W, e.kind = "sequence", e.result = te, !0) : !1;
  }
  function pe(e, B, G) {
    var re, W, te, Z, ae, le, Ae = e.tag, Re = e.anchor, me = {}, A = /* @__PURE__ */ Object.create(null), U = null, V = null, z = null, X = !1, ie = !1, ee;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = me), ee = e.input.charCodeAt(e.position); ee !== 0; ) {
      if (!X && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, O(e, "tab characters must not be used in indentation")), re = e.input.charCodeAt(e.position + 1), te = e.line, (ee === 63 || ee === 58) && P(re))
        ee === 63 ? (X && (ce(e, me, A, U, V, null, Z, ae, le), U = V = z = null), ie = !0, X = !0, W = !0) : X ? (X = !1, W = !0) : O(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, ee = re;
      else {
        if (Z = e.line, ae = e.lineStart, le = e.position, !Te(e, G, a, !1, !0))
          break;
        if (e.line === te) {
          for (ee = e.input.charCodeAt(e.position); D(ee); )
            ee = e.input.charCodeAt(++e.position);
          if (ee === 58)
            ee = e.input.charCodeAt(++e.position), P(ee) || O(e, "a whitespace character is expected after the key-value separator within a block mapping"), X && (ce(e, me, A, U, V, null, Z, ae, le), U = V = z = null), ie = !0, X = !1, W = !1, U = e.tag, V = e.result;
          else if (ie)
            O(e, "can not read an implicit mapping pair; a colon is missed");
          else
            return e.tag = Ae, e.anchor = Re, !0;
        } else if (ie)
          O(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return e.tag = Ae, e.anchor = Re, !0;
      }
      if ((e.line === te || e.lineIndent > B) && (X && (Z = e.line, ae = e.lineStart, le = e.position), Te(e, B, r, !0, W) && (X ? V = e.result : z = e.result), X || (ce(e, me, A, U, V, z, Z, ae, le), U = V = z = null), ye(e, !0, -1), ee = e.input.charCodeAt(e.position)), (e.line === te || e.lineIndent > B) && ee !== 0)
        O(e, "bad indentation of a mapping entry");
      else if (e.lineIndent < B)
        break;
    }
    return X && ce(e, me, A, U, V, null, Z, ae, le), ie && (e.tag = Ae, e.anchor = Re, e.kind = "mapping", e.result = me), ie;
  }
  function _e(e) {
    var B, G = !1, re = !1, W, te, Z;
    if (Z = e.input.charCodeAt(e.position), Z !== 33) return !1;
    if (e.tag !== null && O(e, "duplication of a tag property"), Z = e.input.charCodeAt(++e.position), Z === 60 ? (G = !0, Z = e.input.charCodeAt(++e.position)) : Z === 33 ? (re = !0, W = "!!", Z = e.input.charCodeAt(++e.position)) : W = "!", B = e.position, G) {
      do
        Z = e.input.charCodeAt(++e.position);
      while (Z !== 0 && Z !== 62);
      e.position < e.length ? (te = e.input.slice(B, e.position), Z = e.input.charCodeAt(++e.position)) : O(e, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Z !== 0 && !P(Z); )
        Z === 33 && (re ? O(e, "tag suffix cannot contain exclamation marks") : (W = e.input.slice(B - 1, e.position + 1), E.test(W) || O(e, "named tag handle cannot contain such characters"), re = !0, B = e.position + 1)), Z = e.input.charCodeAt(++e.position);
      te = e.input.slice(B, e.position), v.test(te) && O(e, "tag suffix cannot contain flow indicator characters");
    }
    te && !p.test(te) && O(e, "tag name cannot contain such characters: " + te);
    try {
      te = decodeURIComponent(te);
    } catch {
      O(e, "tag name is malformed: " + te);
    }
    return G ? e.tag = te : f.call(e.tagMap, W) ? e.tag = e.tagMap[W] + te : W === "!" ? e.tag = "!" + te : W === "!!" ? e.tag = "tag:yaml.org,2002:" + te : O(e, 'undeclared tag handle "' + W + '"'), !0;
  }
  function Ee(e) {
    var B, G;
    if (G = e.input.charCodeAt(e.position), G !== 38) return !1;
    for (e.anchor !== null && O(e, "duplication of an anchor property"), G = e.input.charCodeAt(++e.position), B = e.position; G !== 0 && !P(G) && !M(G); )
      G = e.input.charCodeAt(++e.position);
    return e.position === B && O(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(B, e.position), !0;
  }
  function He(e) {
    var B, G, re;
    if (re = e.input.charCodeAt(e.position), re !== 42) return !1;
    for (re = e.input.charCodeAt(++e.position), B = e.position; re !== 0 && !P(re) && !M(re); )
      re = e.input.charCodeAt(++e.position);
    return e.position === B && O(e, "name of an alias node must contain at least one character"), G = e.input.slice(B, e.position), f.call(e.anchorMap, G) || O(e, 'unidentified alias "' + G + '"'), e.result = e.anchorMap[G], ye(e, !0, -1), !0;
  }
  function Te(e, B, G, re, W) {
    var te, Z, ae, le = 1, Ae = !1, Re = !1, me, A, U, V, z, X;
    if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, te = Z = ae = r === G || d === G, re && ye(e, !0, -1) && (Ae = !0, e.lineIndent > B ? le = 1 : e.lineIndent === B ? le = 0 : e.lineIndent < B && (le = -1)), le === 1)
      for (; _e(e) || Ee(e); )
        ye(e, !0, -1) ? (Ae = !0, ae = te, e.lineIndent > B ? le = 1 : e.lineIndent === B ? le = 0 : e.lineIndent < B && (le = -1)) : ae = !1;
    if (ae && (ae = Ae || W), (le === 1 || r === G) && (l === G || a === G ? z = B : z = B + 1, X = e.position - e.lineStart, le === 1 ? ae && (he(e, X) || pe(e, X, z)) || N(e, z) ? Re = !0 : (Z && ue(e, z) || g(e, z) || H(e, z) ? Re = !0 : He(e) ? (Re = !0, (e.tag !== null || e.anchor !== null) && O(e, "alias node should not have any properties")) : w(e, z, l === G) && (Re = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : le === 0 && (Re = ae && he(e, X))), e.tag === null)
      e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
    else if (e.tag === "?") {
      for (e.result !== null && e.kind !== "scalar" && O(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), me = 0, A = e.implicitTypes.length; me < A; me += 1)
        if (V = e.implicitTypes[me], V.resolve(e.result)) {
          e.result = V.construct(e.result), e.tag = V.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else if (e.tag !== "!") {
      if (f.call(e.typeMap[e.kind || "fallback"], e.tag))
        V = e.typeMap[e.kind || "fallback"][e.tag];
      else
        for (V = null, U = e.typeMap.multi[e.kind || "fallback"], me = 0, A = U.length; me < A; me += 1)
          if (e.tag.slice(0, U[me].tag.length) === U[me].tag) {
            V = U[me];
            break;
          }
      V || O(e, "unknown tag !<" + e.tag + ">"), e.result !== null && V.kind !== e.kind && O(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + V.kind + '", not "' + e.kind + '"'), V.resolve(e.result, e.tag) ? (e.result = V.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : O(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
    }
    return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || Re;
  }
  function qe(e) {
    var B = e.position, G, re, W, te = !1, Z;
    for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (Z = e.input.charCodeAt(e.position)) !== 0 && (ye(e, !0, -1), Z = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || Z !== 37)); ) {
      for (te = !0, Z = e.input.charCodeAt(++e.position), G = e.position; Z !== 0 && !P(Z); )
        Z = e.input.charCodeAt(++e.position);
      for (re = e.input.slice(G, e.position), W = [], re.length < 1 && O(e, "directive name must not be less than one character in length"); Z !== 0; ) {
        for (; D(Z); )
          Z = e.input.charCodeAt(++e.position);
        if (Z === 35) {
          do
            Z = e.input.charCodeAt(++e.position);
          while (Z !== 0 && !R(Z));
          break;
        }
        if (R(Z)) break;
        for (G = e.position; Z !== 0 && !P(Z); )
          Z = e.input.charCodeAt(++e.position);
        W.push(e.input.slice(G, e.position));
      }
      Z !== 0 && ge(e), f.call(Y, re) ? Y[re](e, re, W) : Q(e, 'unknown document directive "' + re + '"');
    }
    if (ye(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ye(e, !0, -1)) : te && O(e, "directives end mark is expected"), Te(e, e.lineIndent - 1, r, !1, !0), ye(e, !0, -1), e.checkLineBreaks && m.test(e.input.slice(B, e.position)) && Q(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && J(e)) {
      e.input.charCodeAt(e.position) === 46 && (e.position += 3, ye(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1)
      O(e, "end of the stream or a document separator is expected");
    else
      return;
  }
  function lt(e, B) {
    e = String(e), B = B || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
    var G = new F(e, B), re = e.indexOf("\0");
    for (re !== -1 && (G.position = re, O(G, "null byte is not allowed in input")), G.input += "\0"; G.input.charCodeAt(G.position) === 32; )
      G.lineIndent += 1, G.position += 1;
    for (; G.position < G.length - 1; )
      qe(G);
    return G.documents;
  }
  function it(e, B, G) {
    B !== null && typeof B == "object" && typeof G > "u" && (G = B, B = null);
    var re = lt(e, G);
    if (typeof B != "function")
      return re;
    for (var W = 0, te = re.length; W < te; W += 1)
      B(re[W]);
  }
  function rt(e, B) {
    var G = lt(e, B);
    if (G.length !== 0) {
      if (G.length === 1)
        return G[0];
      throw new u("expected a single document in the stream, but found more");
    }
  }
  return Lr.loadAll = it, Lr.load = rt, Lr;
}
var ni = {}, zo;
function Kc() {
  if (zo) return ni;
  zo = 1;
  var t = yr(), u = Er(), h = na(), c = Object.prototype.toString, f = Object.prototype.hasOwnProperty, l = 65279, a = 9, d = 10, r = 13, s = 32, n = 33, o = 34, i = 35, m = 37, v = 38, E = 39, p = 42, S = 44, R = 45, D = 58, P = 61, M = 62, b = 63, _ = 64, T = 91, y = 93, k = 96, L = 123, $ = 124, q = 125, I = {};
  I[0] = "\\0", I[7] = "\\a", I[8] = "\\b", I[9] = "\\t", I[10] = "\\n", I[11] = "\\v", I[12] = "\\f", I[13] = "\\r", I[27] = "\\e", I[34] = '\\"', I[92] = "\\\\", I[133] = "\\N", I[160] = "\\_", I[8232] = "\\L", I[8233] = "\\P";
  var F = [
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
  ], j = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function O(A, U) {
    var V, z, X, ie, ee, oe, fe;
    if (U === null) return {};
    for (V = {}, z = Object.keys(U), X = 0, ie = z.length; X < ie; X += 1)
      ee = z[X], oe = String(U[ee]), ee.slice(0, 2) === "!!" && (ee = "tag:yaml.org,2002:" + ee.slice(2)), fe = A.compiledTypeMap.fallback[ee], fe && f.call(fe.styleAliases, oe) && (oe = fe.styleAliases[oe]), V[ee] = oe;
    return V;
  }
  function Q(A) {
    var U, V, z;
    if (U = A.toString(16).toUpperCase(), A <= 255)
      V = "x", z = 2;
    else if (A <= 65535)
      V = "u", z = 4;
    else if (A <= 4294967295)
      V = "U", z = 8;
    else
      throw new u("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + V + t.repeat("0", z - U.length) + U;
  }
  var Y = 1, ne = 2;
  function de(A) {
    this.schema = A.schema || h, this.indent = Math.max(1, A.indent || 2), this.noArrayIndent = A.noArrayIndent || !1, this.skipInvalid = A.skipInvalid || !1, this.flowLevel = t.isNothing(A.flowLevel) ? -1 : A.flowLevel, this.styleMap = O(this.schema, A.styles || null), this.sortKeys = A.sortKeys || !1, this.lineWidth = A.lineWidth || 80, this.noRefs = A.noRefs || !1, this.noCompatMode = A.noCompatMode || !1, this.condenseFlow = A.condenseFlow || !1, this.quotingType = A.quotingType === '"' ? ne : Y, this.forceQuotes = A.forceQuotes || !1, this.replacer = typeof A.replacer == "function" ? A.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ce(A, U) {
    for (var V = t.repeat(" ", U), z = 0, X = -1, ie = "", ee, oe = A.length; z < oe; )
      X = A.indexOf(`
`, z), X === -1 ? (ee = A.slice(z), z = oe) : (ee = A.slice(z, X + 1), z = X + 1), ee.length && ee !== `
` && (ie += V), ie += ee;
    return ie;
  }
  function ge(A, U) {
    return `
` + t.repeat(" ", A.indent * U);
  }
  function ye(A, U) {
    var V, z, X;
    for (V = 0, z = A.implicitTypes.length; V < z; V += 1)
      if (X = A.implicitTypes[V], X.resolve(U))
        return !0;
    return !1;
  }
  function J(A) {
    return A === s || A === a;
  }
  function ve(A) {
    return 32 <= A && A <= 126 || 161 <= A && A <= 55295 && A !== 8232 && A !== 8233 || 57344 <= A && A <= 65533 && A !== l || 65536 <= A && A <= 1114111;
  }
  function w(A) {
    return ve(A) && A !== l && A !== r && A !== d;
  }
  function g(A, U, V) {
    var z = w(A), X = z && !J(A);
    return (
      // ns-plain-safe
      (V ? (
        // c = flow-in
        z
      ) : z && A !== S && A !== T && A !== y && A !== L && A !== q) && A !== i && !(U === D && !X) || w(U) && !J(U) && A === i || U === D && X
    );
  }
  function H(A) {
    return ve(A) && A !== l && !J(A) && A !== R && A !== b && A !== D && A !== S && A !== T && A !== y && A !== L && A !== q && A !== i && A !== v && A !== p && A !== n && A !== $ && A !== P && A !== M && A !== E && A !== o && A !== m && A !== _ && A !== k;
  }
  function N(A) {
    return !J(A) && A !== D;
  }
  function ue(A, U) {
    var V = A.charCodeAt(U), z;
    return V >= 55296 && V <= 56319 && U + 1 < A.length && (z = A.charCodeAt(U + 1), z >= 56320 && z <= 57343) ? (V - 55296) * 1024 + z - 56320 + 65536 : V;
  }
  function he(A) {
    var U = /^\n* /;
    return U.test(A);
  }
  var pe = 1, _e = 2, Ee = 3, He = 4, Te = 5;
  function qe(A, U, V, z, X, ie, ee, oe) {
    var fe, we = 0, Ce = null, Ie = !1, be = !1, It = z !== -1, Ke = -1, gt = H(ue(A, 0)) && N(ue(A, A.length - 1));
    if (U || ee)
      for (fe = 0; fe < A.length; we >= 65536 ? fe += 2 : fe++) {
        if (we = ue(A, fe), !ve(we))
          return Te;
        gt = gt && g(we, Ce, oe), Ce = we;
      }
    else {
      for (fe = 0; fe < A.length; we >= 65536 ? fe += 2 : fe++) {
        if (we = ue(A, fe), we === d)
          Ie = !0, It && (be = be || // Foldable line = too long, and not more-indented.
          fe - Ke - 1 > z && A[Ke + 1] !== " ", Ke = fe);
        else if (!ve(we))
          return Te;
        gt = gt && g(we, Ce, oe), Ce = we;
      }
      be = be || It && fe - Ke - 1 > z && A[Ke + 1] !== " ";
    }
    return !Ie && !be ? gt && !ee && !X(A) ? pe : ie === ne ? Te : _e : V > 9 && he(A) ? Te : ee ? ie === ne ? Te : _e : be ? He : Ee;
  }
  function lt(A, U, V, z, X) {
    A.dump = (function() {
      if (U.length === 0)
        return A.quotingType === ne ? '""' : "''";
      if (!A.noCompatMode && (F.indexOf(U) !== -1 || j.test(U)))
        return A.quotingType === ne ? '"' + U + '"' : "'" + U + "'";
      var ie = A.indent * Math.max(1, V), ee = A.lineWidth === -1 ? -1 : Math.max(Math.min(A.lineWidth, 40), A.lineWidth - ie), oe = z || A.flowLevel > -1 && V >= A.flowLevel;
      function fe(we) {
        return ye(A, we);
      }
      switch (qe(
        U,
        oe,
        A.indent,
        ee,
        fe,
        A.quotingType,
        A.forceQuotes && !z,
        X
      )) {
        case pe:
          return U;
        case _e:
          return "'" + U.replace(/'/g, "''") + "'";
        case Ee:
          return "|" + it(U, A.indent) + rt(ce(U, ie));
        case He:
          return ">" + it(U, A.indent) + rt(ce(e(U, ee), ie));
        case Te:
          return '"' + G(U) + '"';
        default:
          throw new u("impossible error: invalid scalar style");
      }
    })();
  }
  function it(A, U) {
    var V = he(A) ? String(U) : "", z = A[A.length - 1] === `
`, X = z && (A[A.length - 2] === `
` || A === `
`), ie = X ? "+" : z ? "" : "-";
    return V + ie + `
`;
  }
  function rt(A) {
    return A[A.length - 1] === `
` ? A.slice(0, -1) : A;
  }
  function e(A, U) {
    for (var V = /(\n+)([^\n]*)/g, z = (function() {
      var we = A.indexOf(`
`);
      return we = we !== -1 ? we : A.length, V.lastIndex = we, B(A.slice(0, we), U);
    })(), X = A[0] === `
` || A[0] === " ", ie, ee; ee = V.exec(A); ) {
      var oe = ee[1], fe = ee[2];
      ie = fe[0] === " ", z += oe + (!X && !ie && fe !== "" ? `
` : "") + B(fe, U), X = ie;
    }
    return z;
  }
  function B(A, U) {
    if (A === "" || A[0] === " ") return A;
    for (var V = / [^ ]/g, z, X = 0, ie, ee = 0, oe = 0, fe = ""; z = V.exec(A); )
      oe = z.index, oe - X > U && (ie = ee > X ? ee : oe, fe += `
` + A.slice(X, ie), X = ie + 1), ee = oe;
    return fe += `
`, A.length - X > U && ee > X ? fe += A.slice(X, ee) + `
` + A.slice(ee + 1) : fe += A.slice(X), fe.slice(1);
  }
  function G(A) {
    for (var U = "", V = 0, z, X = 0; X < A.length; V >= 65536 ? X += 2 : X++)
      V = ue(A, X), z = I[V], !z && ve(V) ? (U += A[X], V >= 65536 && (U += A[X + 1])) : U += z || Q(V);
    return U;
  }
  function re(A, U, V) {
    var z = "", X = A.tag, ie, ee, oe;
    for (ie = 0, ee = V.length; ie < ee; ie += 1)
      oe = V[ie], A.replacer && (oe = A.replacer.call(V, String(ie), oe)), (le(A, U, oe, !1, !1) || typeof oe > "u" && le(A, U, null, !1, !1)) && (z !== "" && (z += "," + (A.condenseFlow ? "" : " ")), z += A.dump);
    A.tag = X, A.dump = "[" + z + "]";
  }
  function W(A, U, V, z) {
    var X = "", ie = A.tag, ee, oe, fe;
    for (ee = 0, oe = V.length; ee < oe; ee += 1)
      fe = V[ee], A.replacer && (fe = A.replacer.call(V, String(ee), fe)), (le(A, U + 1, fe, !0, !0, !1, !0) || typeof fe > "u" && le(A, U + 1, null, !0, !0, !1, !0)) && ((!z || X !== "") && (X += ge(A, U)), A.dump && d === A.dump.charCodeAt(0) ? X += "-" : X += "- ", X += A.dump);
    A.tag = ie, A.dump = X || "[]";
  }
  function te(A, U, V) {
    var z = "", X = A.tag, ie = Object.keys(V), ee, oe, fe, we, Ce;
    for (ee = 0, oe = ie.length; ee < oe; ee += 1)
      Ce = "", z !== "" && (Ce += ", "), A.condenseFlow && (Ce += '"'), fe = ie[ee], we = V[fe], A.replacer && (we = A.replacer.call(V, fe, we)), le(A, U, fe, !1, !1) && (A.dump.length > 1024 && (Ce += "? "), Ce += A.dump + (A.condenseFlow ? '"' : "") + ":" + (A.condenseFlow ? "" : " "), le(A, U, we, !1, !1) && (Ce += A.dump, z += Ce));
    A.tag = X, A.dump = "{" + z + "}";
  }
  function Z(A, U, V, z) {
    var X = "", ie = A.tag, ee = Object.keys(V), oe, fe, we, Ce, Ie, be;
    if (A.sortKeys === !0)
      ee.sort();
    else if (typeof A.sortKeys == "function")
      ee.sort(A.sortKeys);
    else if (A.sortKeys)
      throw new u("sortKeys must be a boolean or a function");
    for (oe = 0, fe = ee.length; oe < fe; oe += 1)
      be = "", (!z || X !== "") && (be += ge(A, U)), we = ee[oe], Ce = V[we], A.replacer && (Ce = A.replacer.call(V, we, Ce)), le(A, U + 1, we, !0, !0, !0) && (Ie = A.tag !== null && A.tag !== "?" || A.dump && A.dump.length > 1024, Ie && (A.dump && d === A.dump.charCodeAt(0) ? be += "?" : be += "? "), be += A.dump, Ie && (be += ge(A, U)), le(A, U + 1, Ce, !0, Ie) && (A.dump && d === A.dump.charCodeAt(0) ? be += ":" : be += ": ", be += A.dump, X += be));
    A.tag = ie, A.dump = X || "{}";
  }
  function ae(A, U, V) {
    var z, X, ie, ee, oe, fe;
    for (X = V ? A.explicitTypes : A.implicitTypes, ie = 0, ee = X.length; ie < ee; ie += 1)
      if (oe = X[ie], (oe.instanceOf || oe.predicate) && (!oe.instanceOf || typeof U == "object" && U instanceof oe.instanceOf) && (!oe.predicate || oe.predicate(U))) {
        if (V ? oe.multi && oe.representName ? A.tag = oe.representName(U) : A.tag = oe.tag : A.tag = "?", oe.represent) {
          if (fe = A.styleMap[oe.tag] || oe.defaultStyle, c.call(oe.represent) === "[object Function]")
            z = oe.represent(U, fe);
          else if (f.call(oe.represent, fe))
            z = oe.represent[fe](U, fe);
          else
            throw new u("!<" + oe.tag + '> tag resolver accepts not "' + fe + '" style');
          A.dump = z;
        }
        return !0;
      }
    return !1;
  }
  function le(A, U, V, z, X, ie, ee) {
    A.tag = null, A.dump = V, ae(A, V, !1) || ae(A, V, !0);
    var oe = c.call(A.dump), fe = z, we;
    z && (z = A.flowLevel < 0 || A.flowLevel > U);
    var Ce = oe === "[object Object]" || oe === "[object Array]", Ie, be;
    if (Ce && (Ie = A.duplicates.indexOf(V), be = Ie !== -1), (A.tag !== null && A.tag !== "?" || be || A.indent !== 2 && U > 0) && (X = !1), be && A.usedDuplicates[Ie])
      A.dump = "*ref_" + Ie;
    else {
      if (Ce && be && !A.usedDuplicates[Ie] && (A.usedDuplicates[Ie] = !0), oe === "[object Object]")
        z && Object.keys(A.dump).length !== 0 ? (Z(A, U, A.dump, X), be && (A.dump = "&ref_" + Ie + A.dump)) : (te(A, U, A.dump), be && (A.dump = "&ref_" + Ie + " " + A.dump));
      else if (oe === "[object Array]")
        z && A.dump.length !== 0 ? (A.noArrayIndent && !ee && U > 0 ? W(A, U - 1, A.dump, X) : W(A, U, A.dump, X), be && (A.dump = "&ref_" + Ie + A.dump)) : (re(A, U, A.dump), be && (A.dump = "&ref_" + Ie + " " + A.dump));
      else if (oe === "[object String]")
        A.tag !== "?" && lt(A, A.dump, U, ie, fe);
      else {
        if (oe === "[object Undefined]")
          return !1;
        if (A.skipInvalid) return !1;
        throw new u("unacceptable kind of an object to dump " + oe);
      }
      A.tag !== null && A.tag !== "?" && (we = encodeURI(
        A.tag[0] === "!" ? A.tag.slice(1) : A.tag
      ).replace(/!/g, "%21"), A.tag[0] === "!" ? we = "!" + we : we.slice(0, 18) === "tag:yaml.org,2002:" ? we = "!!" + we.slice(18) : we = "!<" + we + ">", A.dump = we + " " + A.dump);
    }
    return !0;
  }
  function Ae(A, U) {
    var V = [], z = [], X, ie;
    for (Re(A, V, z), X = 0, ie = z.length; X < ie; X += 1)
      U.duplicates.push(V[z[X]]);
    U.usedDuplicates = new Array(ie);
  }
  function Re(A, U, V) {
    var z, X, ie;
    if (A !== null && typeof A == "object")
      if (X = U.indexOf(A), X !== -1)
        V.indexOf(X) === -1 && V.push(X);
      else if (U.push(A), Array.isArray(A))
        for (X = 0, ie = A.length; X < ie; X += 1)
          Re(A[X], U, V);
      else
        for (z = Object.keys(A), X = 0, ie = z.length; X < ie; X += 1)
          Re(A[z[X]], U, V);
  }
  function me(A, U) {
    U = U || {};
    var V = new de(U);
    V.noRefs || Ae(A, V);
    var z = A;
    return V.replacer && (z = V.replacer.call({ "": z }, "", z)), le(V, 0, z, !0, !0) ? V.dump + `
` : "";
  }
  return ni.dump = me, ni;
}
var Xo;
function ia() {
  if (Xo) return ke;
  Xo = 1;
  var t = Xc(), u = Kc();
  function h(c, f) {
    return function() {
      throw new Error("Function yaml." + c + " is removed in js-yaml 4. Use yaml." + f + " instead, which is now safe by default.");
    };
  }
  return ke.Type = Me(), ke.Schema = Fl(), ke.FAILSAFE_SCHEMA = Ul(), ke.JSON_SCHEMA = Hl(), ke.CORE_SCHEMA = jl(), ke.DEFAULT_SCHEMA = na(), ke.load = t.load, ke.loadAll = t.loadAll, ke.dump = u.dump, ke.YAMLException = Er(), ke.types = {
    binary: Vl(),
    float: Bl(),
    map: Ll(),
    null: kl(),
    pairs: zl(),
    set: Xl(),
    timestamp: Gl(),
    bool: ql(),
    int: Ml(),
    merge: Wl(),
    omap: Yl(),
    seq: $l(),
    str: xl()
  }, ke.safeLoad = h("safeLoad", "load"), ke.safeLoadAll = h("safeLoadAll", "loadAll"), ke.safeDump = h("safeDump", "dump"), ke;
}
var Jt = {}, Ko;
function Jc() {
  if (Ko) return Jt;
  Ko = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.Lazy = void 0;
  class t {
    constructor(h) {
      this._value = null, this.creator = h;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const h = this.creator();
      return this.value = h, h;
    }
    set value(h) {
      this._value = h, this.creator = null;
    }
  }
  return Jt.Lazy = t, Jt;
}
var Ur = { exports: {} }, ii, Jo;
function Gr() {
  if (Jo) return ii;
  Jo = 1;
  const t = "2.0.0", u = 256, h = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, c = 16, f = u - 6;
  return ii = {
    MAX_LENGTH: u,
    MAX_SAFE_COMPONENT_LENGTH: c,
    MAX_SAFE_BUILD_LENGTH: f,
    MAX_SAFE_INTEGER: h,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: t,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, ii;
}
var ai, Qo;
function Wr() {
  return Qo || (Qo = 1, ai = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...u) => console.error("SEMVER", ...u) : () => {
  }), ai;
}
var Zo;
function wr() {
  return Zo || (Zo = 1, (function(t, u) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: h,
      MAX_SAFE_BUILD_LENGTH: c,
      MAX_LENGTH: f
    } = Gr(), l = Wr();
    u = t.exports = {};
    const a = u.re = [], d = u.safeRe = [], r = u.src = [], s = u.safeSrc = [], n = u.t = {};
    let o = 0;
    const i = "[a-zA-Z0-9-]", m = [
      ["\\s", 1],
      ["\\d", f],
      [i, c]
    ], v = (p) => {
      for (const [S, R] of m)
        p = p.split(`${S}*`).join(`${S}{0,${R}}`).split(`${S}+`).join(`${S}{1,${R}}`);
      return p;
    }, E = (p, S, R) => {
      const D = v(S), P = o++;
      l(p, P, S), n[p] = P, r[P] = S, s[P] = D, a[P] = new RegExp(S, R ? "g" : void 0), d[P] = new RegExp(D, R ? "g" : void 0);
    };
    E("NUMERICIDENTIFIER", "0|[1-9]\\d*"), E("NUMERICIDENTIFIERLOOSE", "\\d+"), E("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${i}*`), E("MAINVERSION", `(${r[n.NUMERICIDENTIFIER]})\\.(${r[n.NUMERICIDENTIFIER]})\\.(${r[n.NUMERICIDENTIFIER]})`), E("MAINVERSIONLOOSE", `(${r[n.NUMERICIDENTIFIERLOOSE]})\\.(${r[n.NUMERICIDENTIFIERLOOSE]})\\.(${r[n.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASEIDENTIFIER", `(?:${r[n.NONNUMERICIDENTIFIER]}|${r[n.NUMERICIDENTIFIER]})`), E("PRERELEASEIDENTIFIERLOOSE", `(?:${r[n.NONNUMERICIDENTIFIER]}|${r[n.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASE", `(?:-(${r[n.PRERELEASEIDENTIFIER]}(?:\\.${r[n.PRERELEASEIDENTIFIER]})*))`), E("PRERELEASELOOSE", `(?:-?(${r[n.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${r[n.PRERELEASEIDENTIFIERLOOSE]})*))`), E("BUILDIDENTIFIER", `${i}+`), E("BUILD", `(?:\\+(${r[n.BUILDIDENTIFIER]}(?:\\.${r[n.BUILDIDENTIFIER]})*))`), E("FULLPLAIN", `v?${r[n.MAINVERSION]}${r[n.PRERELEASE]}?${r[n.BUILD]}?`), E("FULL", `^${r[n.FULLPLAIN]}$`), E("LOOSEPLAIN", `[v=\\s]*${r[n.MAINVERSIONLOOSE]}${r[n.PRERELEASELOOSE]}?${r[n.BUILD]}?`), E("LOOSE", `^${r[n.LOOSEPLAIN]}$`), E("GTLT", "((?:<|>)?=?)"), E("XRANGEIDENTIFIERLOOSE", `${r[n.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), E("XRANGEIDENTIFIER", `${r[n.NUMERICIDENTIFIER]}|x|X|\\*`), E("XRANGEPLAIN", `[v=\\s]*(${r[n.XRANGEIDENTIFIER]})(?:\\.(${r[n.XRANGEIDENTIFIER]})(?:\\.(${r[n.XRANGEIDENTIFIER]})(?:${r[n.PRERELEASE]})?${r[n.BUILD]}?)?)?`), E("XRANGEPLAINLOOSE", `[v=\\s]*(${r[n.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[n.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[n.XRANGEIDENTIFIERLOOSE]})(?:${r[n.PRERELEASELOOSE]})?${r[n.BUILD]}?)?)?`), E("XRANGE", `^${r[n.GTLT]}\\s*${r[n.XRANGEPLAIN]}$`), E("XRANGELOOSE", `^${r[n.GTLT]}\\s*${r[n.XRANGEPLAINLOOSE]}$`), E("COERCEPLAIN", `(^|[^\\d])(\\d{1,${h}})(?:\\.(\\d{1,${h}}))?(?:\\.(\\d{1,${h}}))?`), E("COERCE", `${r[n.COERCEPLAIN]}(?:$|[^\\d])`), E("COERCEFULL", r[n.COERCEPLAIN] + `(?:${r[n.PRERELEASE]})?(?:${r[n.BUILD]})?(?:$|[^\\d])`), E("COERCERTL", r[n.COERCE], !0), E("COERCERTLFULL", r[n.COERCEFULL], !0), E("LONETILDE", "(?:~>?)"), E("TILDETRIM", `(\\s*)${r[n.LONETILDE]}\\s+`, !0), u.tildeTrimReplace = "$1~", E("TILDE", `^${r[n.LONETILDE]}${r[n.XRANGEPLAIN]}$`), E("TILDELOOSE", `^${r[n.LONETILDE]}${r[n.XRANGEPLAINLOOSE]}$`), E("LONECARET", "(?:\\^)"), E("CARETTRIM", `(\\s*)${r[n.LONECARET]}\\s+`, !0), u.caretTrimReplace = "$1^", E("CARET", `^${r[n.LONECARET]}${r[n.XRANGEPLAIN]}$`), E("CARETLOOSE", `^${r[n.LONECARET]}${r[n.XRANGEPLAINLOOSE]}$`), E("COMPARATORLOOSE", `^${r[n.GTLT]}\\s*(${r[n.LOOSEPLAIN]})$|^$`), E("COMPARATOR", `^${r[n.GTLT]}\\s*(${r[n.FULLPLAIN]})$|^$`), E("COMPARATORTRIM", `(\\s*)${r[n.GTLT]}\\s*(${r[n.LOOSEPLAIN]}|${r[n.XRANGEPLAIN]})`, !0), u.comparatorTrimReplace = "$1$2$3", E("HYPHENRANGE", `^\\s*(${r[n.XRANGEPLAIN]})\\s+-\\s+(${r[n.XRANGEPLAIN]})\\s*$`), E("HYPHENRANGELOOSE", `^\\s*(${r[n.XRANGEPLAINLOOSE]})\\s+-\\s+(${r[n.XRANGEPLAINLOOSE]})\\s*$`), E("STAR", "(<|>)?=?\\s*\\*"), E("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), E("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(Ur, Ur.exports)), Ur.exports;
}
var oi, es;
function aa() {
  if (es) return oi;
  es = 1;
  const t = Object.freeze({ loose: !0 }), u = Object.freeze({});
  return oi = (c) => c ? typeof c != "object" ? t : c : u, oi;
}
var si, ts;
function Kl() {
  if (ts) return si;
  ts = 1;
  const t = /^[0-9]+$/, u = (c, f) => {
    if (typeof c == "number" && typeof f == "number")
      return c === f ? 0 : c < f ? -1 : 1;
    const l = t.test(c), a = t.test(f);
    return l && a && (c = +c, f = +f), c === f ? 0 : l && !a ? -1 : a && !l ? 1 : c < f ? -1 : 1;
  };
  return si = {
    compareIdentifiers: u,
    rcompareIdentifiers: (c, f) => u(f, c)
  }, si;
}
var li, rs;
function Be() {
  if (rs) return li;
  rs = 1;
  const t = Wr(), { MAX_LENGTH: u, MAX_SAFE_INTEGER: h } = Gr(), { safeRe: c, t: f } = wr(), l = aa(), { compareIdentifiers: a } = Kl();
  class d {
    constructor(s, n) {
      if (n = l(n), s instanceof d) {
        if (s.loose === !!n.loose && s.includePrerelease === !!n.includePrerelease)
          return s;
        s = s.version;
      } else if (typeof s != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof s}".`);
      if (s.length > u)
        throw new TypeError(
          `version is longer than ${u} characters`
        );
      t("SemVer", s, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
      const o = s.trim().match(n.loose ? c[f.LOOSE] : c[f.FULL]);
      if (!o)
        throw new TypeError(`Invalid Version: ${s}`);
      if (this.raw = s, this.major = +o[1], this.minor = +o[2], this.patch = +o[3], this.major > h || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > h || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > h || this.patch < 0)
        throw new TypeError("Invalid patch version");
      o[4] ? this.prerelease = o[4].split(".").map((i) => {
        if (/^[0-9]+$/.test(i)) {
          const m = +i;
          if (m >= 0 && m < h)
            return m;
        }
        return i;
      }) : this.prerelease = [], this.build = o[5] ? o[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(s) {
      if (t("SemVer.compare", this.version, this.options, s), !(s instanceof d)) {
        if (typeof s == "string" && s === this.version)
          return 0;
        s = new d(s, this.options);
      }
      return s.version === this.version ? 0 : this.compareMain(s) || this.comparePre(s);
    }
    compareMain(s) {
      return s instanceof d || (s = new d(s, this.options)), this.major < s.major ? -1 : this.major > s.major ? 1 : this.minor < s.minor ? -1 : this.minor > s.minor ? 1 : this.patch < s.patch ? -1 : this.patch > s.patch ? 1 : 0;
    }
    comparePre(s) {
      if (s instanceof d || (s = new d(s, this.options)), this.prerelease.length && !s.prerelease.length)
        return -1;
      if (!this.prerelease.length && s.prerelease.length)
        return 1;
      if (!this.prerelease.length && !s.prerelease.length)
        return 0;
      let n = 0;
      do {
        const o = this.prerelease[n], i = s.prerelease[n];
        if (t("prerelease compare", n, o, i), o === void 0 && i === void 0)
          return 0;
        if (i === void 0)
          return 1;
        if (o === void 0)
          return -1;
        if (o === i)
          continue;
        return a(o, i);
      } while (++n);
    }
    compareBuild(s) {
      s instanceof d || (s = new d(s, this.options));
      let n = 0;
      do {
        const o = this.build[n], i = s.build[n];
        if (t("build compare", n, o, i), o === void 0 && i === void 0)
          return 0;
        if (i === void 0)
          return 1;
        if (o === void 0)
          return -1;
        if (o === i)
          continue;
        return a(o, i);
      } while (++n);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(s, n, o) {
      if (s.startsWith("pre")) {
        if (!n && o === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (n) {
          const i = `-${n}`.match(this.options.loose ? c[f.PRERELEASELOOSE] : c[f.PRERELEASE]);
          if (!i || i[1] !== n)
            throw new Error(`invalid identifier: ${n}`);
        }
      }
      switch (s) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, o);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, o);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", n, o), this.inc("pre", n, o);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", n, o), this.inc("pre", n, o);
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
          const i = Number(o) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [i];
          else {
            let m = this.prerelease.length;
            for (; --m >= 0; )
              typeof this.prerelease[m] == "number" && (this.prerelease[m]++, m = -2);
            if (m === -1) {
              if (n === this.prerelease.join(".") && o === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(i);
            }
          }
          if (n) {
            let m = [n, i];
            o === !1 && (m = [n]), a(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = m) : this.prerelease = m;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${s}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return li = d, li;
}
var ui, ns;
function jt() {
  if (ns) return ui;
  ns = 1;
  const t = Be();
  return ui = (h, c, f = !1) => {
    if (h instanceof t)
      return h;
    try {
      return new t(h, c);
    } catch (l) {
      if (!f)
        return null;
      throw l;
    }
  }, ui;
}
var ci, is;
function Qc() {
  if (is) return ci;
  is = 1;
  const t = jt();
  return ci = (h, c) => {
    const f = t(h, c);
    return f ? f.version : null;
  }, ci;
}
var fi, as;
function Zc() {
  if (as) return fi;
  as = 1;
  const t = jt();
  return fi = (h, c) => {
    const f = t(h.trim().replace(/^[=v]+/, ""), c);
    return f ? f.version : null;
  }, fi;
}
var di, os;
function ef() {
  if (os) return di;
  os = 1;
  const t = Be();
  return di = (h, c, f, l, a) => {
    typeof f == "string" && (a = l, l = f, f = void 0);
    try {
      return new t(
        h instanceof t ? h.version : h,
        f
      ).inc(c, l, a).version;
    } catch {
      return null;
    }
  }, di;
}
var hi, ss;
function tf() {
  if (ss) return hi;
  ss = 1;
  const t = jt();
  return hi = (h, c) => {
    const f = t(h, null, !0), l = t(c, null, !0), a = f.compare(l);
    if (a === 0)
      return null;
    const d = a > 0, r = d ? f : l, s = d ? l : f, n = !!r.prerelease.length;
    if (!!s.prerelease.length && !n) {
      if (!s.patch && !s.minor)
        return "major";
      if (s.compareMain(r) === 0)
        return s.minor && !s.patch ? "minor" : "patch";
    }
    const i = n ? "pre" : "";
    return f.major !== l.major ? i + "major" : f.minor !== l.minor ? i + "minor" : f.patch !== l.patch ? i + "patch" : "prerelease";
  }, hi;
}
var pi, ls;
function rf() {
  if (ls) return pi;
  ls = 1;
  const t = Be();
  return pi = (h, c) => new t(h, c).major, pi;
}
var mi, us;
function nf() {
  if (us) return mi;
  us = 1;
  const t = Be();
  return mi = (h, c) => new t(h, c).minor, mi;
}
var gi, cs;
function af() {
  if (cs) return gi;
  cs = 1;
  const t = Be();
  return gi = (h, c) => new t(h, c).patch, gi;
}
var vi, fs;
function of() {
  if (fs) return vi;
  fs = 1;
  const t = jt();
  return vi = (h, c) => {
    const f = t(h, c);
    return f && f.prerelease.length ? f.prerelease : null;
  }, vi;
}
var yi, ds;
function et() {
  if (ds) return yi;
  ds = 1;
  const t = Be();
  return yi = (h, c, f) => new t(h, f).compare(new t(c, f)), yi;
}
var Ei, hs;
function sf() {
  if (hs) return Ei;
  hs = 1;
  const t = et();
  return Ei = (h, c, f) => t(c, h, f), Ei;
}
var wi, ps;
function lf() {
  if (ps) return wi;
  ps = 1;
  const t = et();
  return wi = (h, c) => t(h, c, !0), wi;
}
var _i, ms;
function oa() {
  if (ms) return _i;
  ms = 1;
  const t = Be();
  return _i = (h, c, f) => {
    const l = new t(h, f), a = new t(c, f);
    return l.compare(a) || l.compareBuild(a);
  }, _i;
}
var Si, gs;
function uf() {
  if (gs) return Si;
  gs = 1;
  const t = oa();
  return Si = (h, c) => h.sort((f, l) => t(f, l, c)), Si;
}
var Ti, vs;
function cf() {
  if (vs) return Ti;
  vs = 1;
  const t = oa();
  return Ti = (h, c) => h.sort((f, l) => t(l, f, c)), Ti;
}
var Ai, ys;
function Vr() {
  if (ys) return Ai;
  ys = 1;
  const t = et();
  return Ai = (h, c, f) => t(h, c, f) > 0, Ai;
}
var Ri, Es;
function sa() {
  if (Es) return Ri;
  Es = 1;
  const t = et();
  return Ri = (h, c, f) => t(h, c, f) < 0, Ri;
}
var bi, ws;
function Jl() {
  if (ws) return bi;
  ws = 1;
  const t = et();
  return bi = (h, c, f) => t(h, c, f) === 0, bi;
}
var Ci, _s;
function Ql() {
  if (_s) return Ci;
  _s = 1;
  const t = et();
  return Ci = (h, c, f) => t(h, c, f) !== 0, Ci;
}
var Di, Ss;
function la() {
  if (Ss) return Di;
  Ss = 1;
  const t = et();
  return Di = (h, c, f) => t(h, c, f) >= 0, Di;
}
var Pi, Ts;
function ua() {
  if (Ts) return Pi;
  Ts = 1;
  const t = et();
  return Pi = (h, c, f) => t(h, c, f) <= 0, Pi;
}
var Oi, As;
function Zl() {
  if (As) return Oi;
  As = 1;
  const t = Jl(), u = Ql(), h = Vr(), c = la(), f = sa(), l = ua();
  return Oi = (d, r, s, n) => {
    switch (r) {
      case "===":
        return typeof d == "object" && (d = d.version), typeof s == "object" && (s = s.version), d === s;
      case "!==":
        return typeof d == "object" && (d = d.version), typeof s == "object" && (s = s.version), d !== s;
      case "":
      case "=":
      case "==":
        return t(d, s, n);
      case "!=":
        return u(d, s, n);
      case ">":
        return h(d, s, n);
      case ">=":
        return c(d, s, n);
      case "<":
        return f(d, s, n);
      case "<=":
        return l(d, s, n);
      default:
        throw new TypeError(`Invalid operator: ${r}`);
    }
  }, Oi;
}
var Ii, Rs;
function ff() {
  if (Rs) return Ii;
  Rs = 1;
  const t = Be(), u = jt(), { safeRe: h, t: c } = wr();
  return Ii = (l, a) => {
    if (l instanceof t)
      return l;
    if (typeof l == "number" && (l = String(l)), typeof l != "string")
      return null;
    a = a || {};
    let d = null;
    if (!a.rtl)
      d = l.match(a.includePrerelease ? h[c.COERCEFULL] : h[c.COERCE]);
    else {
      const m = a.includePrerelease ? h[c.COERCERTLFULL] : h[c.COERCERTL];
      let v;
      for (; (v = m.exec(l)) && (!d || d.index + d[0].length !== l.length); )
        (!d || v.index + v[0].length !== d.index + d[0].length) && (d = v), m.lastIndex = v.index + v[1].length + v[2].length;
      m.lastIndex = -1;
    }
    if (d === null)
      return null;
    const r = d[2], s = d[3] || "0", n = d[4] || "0", o = a.includePrerelease && d[5] ? `-${d[5]}` : "", i = a.includePrerelease && d[6] ? `+${d[6]}` : "";
    return u(`${r}.${s}.${n}${o}${i}`, a);
  }, Ii;
}
var Ni, bs;
function df() {
  if (bs) return Ni;
  bs = 1;
  class t {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(h) {
      const c = this.map.get(h);
      if (c !== void 0)
        return this.map.delete(h), this.map.set(h, c), c;
    }
    delete(h) {
      return this.map.delete(h);
    }
    set(h, c) {
      if (!this.delete(h) && c !== void 0) {
        if (this.map.size >= this.max) {
          const l = this.map.keys().next().value;
          this.delete(l);
        }
        this.map.set(h, c);
      }
      return this;
    }
  }
  return Ni = t, Ni;
}
var Fi, Cs;
function tt() {
  if (Cs) return Fi;
  Cs = 1;
  const t = /\s+/g;
  class u {
    constructor(F, j) {
      if (j = f(j), F instanceof u)
        return F.loose === !!j.loose && F.includePrerelease === !!j.includePrerelease ? F : new u(F.raw, j);
      if (F instanceof l)
        return this.raw = F.value, this.set = [[F]], this.formatted = void 0, this;
      if (this.options = j, this.loose = !!j.loose, this.includePrerelease = !!j.includePrerelease, this.raw = F.trim().replace(t, " "), this.set = this.raw.split("||").map((O) => this.parseRange(O.trim())).filter((O) => O.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const O = this.set[0];
        if (this.set = this.set.filter((Q) => !E(Q[0])), this.set.length === 0)
          this.set = [O];
        else if (this.set.length > 1) {
          for (const Q of this.set)
            if (Q.length === 1 && p(Q[0])) {
              this.set = [Q];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let F = 0; F < this.set.length; F++) {
          F > 0 && (this.formatted += "||");
          const j = this.set[F];
          for (let O = 0; O < j.length; O++)
            O > 0 && (this.formatted += " "), this.formatted += j[O].toString().trim();
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
    parseRange(F) {
      const O = ((this.options.includePrerelease && m) | (this.options.loose && v)) + ":" + F, Q = c.get(O);
      if (Q)
        return Q;
      const Y = this.options.loose, ne = Y ? r[s.HYPHENRANGELOOSE] : r[s.HYPHENRANGE];
      F = F.replace(ne, $(this.options.includePrerelease)), a("hyphen replace", F), F = F.replace(r[s.COMPARATORTRIM], n), a("comparator trim", F), F = F.replace(r[s.TILDETRIM], o), a("tilde trim", F), F = F.replace(r[s.CARETTRIM], i), a("caret trim", F);
      let de = F.split(" ").map((J) => R(J, this.options)).join(" ").split(/\s+/).map((J) => L(J, this.options));
      Y && (de = de.filter((J) => (a("loose invalid filter", J, this.options), !!J.match(r[s.COMPARATORLOOSE])))), a("range list", de);
      const ce = /* @__PURE__ */ new Map(), ge = de.map((J) => new l(J, this.options));
      for (const J of ge) {
        if (E(J))
          return [J];
        ce.set(J.value, J);
      }
      ce.size > 1 && ce.has("") && ce.delete("");
      const ye = [...ce.values()];
      return c.set(O, ye), ye;
    }
    intersects(F, j) {
      if (!(F instanceof u))
        throw new TypeError("a Range is required");
      return this.set.some((O) => S(O, j) && F.set.some((Q) => S(Q, j) && O.every((Y) => Q.every((ne) => Y.intersects(ne, j)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(F) {
      if (!F)
        return !1;
      if (typeof F == "string")
        try {
          F = new d(F, this.options);
        } catch {
          return !1;
        }
      for (let j = 0; j < this.set.length; j++)
        if (q(this.set[j], F, this.options))
          return !0;
      return !1;
    }
  }
  Fi = u;
  const h = df(), c = new h(), f = aa(), l = Yr(), a = Wr(), d = Be(), {
    safeRe: r,
    t: s,
    comparatorTrimReplace: n,
    tildeTrimReplace: o,
    caretTrimReplace: i
  } = wr(), { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: v } = Gr(), E = (I) => I.value === "<0.0.0-0", p = (I) => I.value === "", S = (I, F) => {
    let j = !0;
    const O = I.slice();
    let Q = O.pop();
    for (; j && O.length; )
      j = O.every((Y) => Q.intersects(Y, F)), Q = O.pop();
    return j;
  }, R = (I, F) => (I = I.replace(r[s.BUILD], ""), a("comp", I, F), I = b(I, F), a("caret", I), I = P(I, F), a("tildes", I), I = T(I, F), a("xrange", I), I = k(I, F), a("stars", I), I), D = (I) => !I || I.toLowerCase() === "x" || I === "*", P = (I, F) => I.trim().split(/\s+/).map((j) => M(j, F)).join(" "), M = (I, F) => {
    const j = F.loose ? r[s.TILDELOOSE] : r[s.TILDE];
    return I.replace(j, (O, Q, Y, ne, de) => {
      a("tilde", I, O, Q, Y, ne, de);
      let ce;
      return D(Q) ? ce = "" : D(Y) ? ce = `>=${Q}.0.0 <${+Q + 1}.0.0-0` : D(ne) ? ce = `>=${Q}.${Y}.0 <${Q}.${+Y + 1}.0-0` : de ? (a("replaceTilde pr", de), ce = `>=${Q}.${Y}.${ne}-${de} <${Q}.${+Y + 1}.0-0`) : ce = `>=${Q}.${Y}.${ne} <${Q}.${+Y + 1}.0-0`, a("tilde return", ce), ce;
    });
  }, b = (I, F) => I.trim().split(/\s+/).map((j) => _(j, F)).join(" "), _ = (I, F) => {
    a("caret", I, F);
    const j = F.loose ? r[s.CARETLOOSE] : r[s.CARET], O = F.includePrerelease ? "-0" : "";
    return I.replace(j, (Q, Y, ne, de, ce) => {
      a("caret", I, Q, Y, ne, de, ce);
      let ge;
      return D(Y) ? ge = "" : D(ne) ? ge = `>=${Y}.0.0${O} <${+Y + 1}.0.0-0` : D(de) ? Y === "0" ? ge = `>=${Y}.${ne}.0${O} <${Y}.${+ne + 1}.0-0` : ge = `>=${Y}.${ne}.0${O} <${+Y + 1}.0.0-0` : ce ? (a("replaceCaret pr", ce), Y === "0" ? ne === "0" ? ge = `>=${Y}.${ne}.${de}-${ce} <${Y}.${ne}.${+de + 1}-0` : ge = `>=${Y}.${ne}.${de}-${ce} <${Y}.${+ne + 1}.0-0` : ge = `>=${Y}.${ne}.${de}-${ce} <${+Y + 1}.0.0-0`) : (a("no pr"), Y === "0" ? ne === "0" ? ge = `>=${Y}.${ne}.${de}${O} <${Y}.${ne}.${+de + 1}-0` : ge = `>=${Y}.${ne}.${de}${O} <${Y}.${+ne + 1}.0-0` : ge = `>=${Y}.${ne}.${de} <${+Y + 1}.0.0-0`), a("caret return", ge), ge;
    });
  }, T = (I, F) => (a("replaceXRanges", I, F), I.split(/\s+/).map((j) => y(j, F)).join(" ")), y = (I, F) => {
    I = I.trim();
    const j = F.loose ? r[s.XRANGELOOSE] : r[s.XRANGE];
    return I.replace(j, (O, Q, Y, ne, de, ce) => {
      a("xRange", I, O, Q, Y, ne, de, ce);
      const ge = D(Y), ye = ge || D(ne), J = ye || D(de), ve = J;
      return Q === "=" && ve && (Q = ""), ce = F.includePrerelease ? "-0" : "", ge ? Q === ">" || Q === "<" ? O = "<0.0.0-0" : O = "*" : Q && ve ? (ye && (ne = 0), de = 0, Q === ">" ? (Q = ">=", ye ? (Y = +Y + 1, ne = 0, de = 0) : (ne = +ne + 1, de = 0)) : Q === "<=" && (Q = "<", ye ? Y = +Y + 1 : ne = +ne + 1), Q === "<" && (ce = "-0"), O = `${Q + Y}.${ne}.${de}${ce}`) : ye ? O = `>=${Y}.0.0${ce} <${+Y + 1}.0.0-0` : J && (O = `>=${Y}.${ne}.0${ce} <${Y}.${+ne + 1}.0-0`), a("xRange return", O), O;
    });
  }, k = (I, F) => (a("replaceStars", I, F), I.trim().replace(r[s.STAR], "")), L = (I, F) => (a("replaceGTE0", I, F), I.trim().replace(r[F.includePrerelease ? s.GTE0PRE : s.GTE0], "")), $ = (I) => (F, j, O, Q, Y, ne, de, ce, ge, ye, J, ve) => (D(O) ? j = "" : D(Q) ? j = `>=${O}.0.0${I ? "-0" : ""}` : D(Y) ? j = `>=${O}.${Q}.0${I ? "-0" : ""}` : ne ? j = `>=${j}` : j = `>=${j}${I ? "-0" : ""}`, D(ge) ? ce = "" : D(ye) ? ce = `<${+ge + 1}.0.0-0` : D(J) ? ce = `<${ge}.${+ye + 1}.0-0` : ve ? ce = `<=${ge}.${ye}.${J}-${ve}` : I ? ce = `<${ge}.${ye}.${+J + 1}-0` : ce = `<=${ce}`, `${j} ${ce}`.trim()), q = (I, F, j) => {
    for (let O = 0; O < I.length; O++)
      if (!I[O].test(F))
        return !1;
    if (F.prerelease.length && !j.includePrerelease) {
      for (let O = 0; O < I.length; O++)
        if (a(I[O].semver), I[O].semver !== l.ANY && I[O].semver.prerelease.length > 0) {
          const Q = I[O].semver;
          if (Q.major === F.major && Q.minor === F.minor && Q.patch === F.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Fi;
}
var xi, Ds;
function Yr() {
  if (Ds) return xi;
  Ds = 1;
  const t = Symbol("SemVer ANY");
  class u {
    static get ANY() {
      return t;
    }
    constructor(n, o) {
      if (o = h(o), n instanceof u) {
        if (n.loose === !!o.loose)
          return n;
        n = n.value;
      }
      n = n.trim().split(/\s+/).join(" "), a("comparator", n, o), this.options = o, this.loose = !!o.loose, this.parse(n), this.semver === t ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(n) {
      const o = this.options.loose ? c[f.COMPARATORLOOSE] : c[f.COMPARATOR], i = n.match(o);
      if (!i)
        throw new TypeError(`Invalid comparator: ${n}`);
      this.operator = i[1] !== void 0 ? i[1] : "", this.operator === "=" && (this.operator = ""), i[2] ? this.semver = new d(i[2], this.options.loose) : this.semver = t;
    }
    toString() {
      return this.value;
    }
    test(n) {
      if (a("Comparator.test", n, this.options.loose), this.semver === t || n === t)
        return !0;
      if (typeof n == "string")
        try {
          n = new d(n, this.options);
        } catch {
          return !1;
        }
      return l(n, this.operator, this.semver, this.options);
    }
    intersects(n, o) {
      if (!(n instanceof u))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new r(n.value, o).test(this.value) : n.operator === "" ? n.value === "" ? !0 : new r(this.value, o).test(n.semver) : (o = h(o), o.includePrerelease && (this.value === "<0.0.0-0" || n.value === "<0.0.0-0") || !o.includePrerelease && (this.value.startsWith("<0.0.0") || n.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && n.operator.startsWith(">") || this.operator.startsWith("<") && n.operator.startsWith("<") || this.semver.version === n.semver.version && this.operator.includes("=") && n.operator.includes("=") || l(this.semver, "<", n.semver, o) && this.operator.startsWith(">") && n.operator.startsWith("<") || l(this.semver, ">", n.semver, o) && this.operator.startsWith("<") && n.operator.startsWith(">")));
    }
  }
  xi = u;
  const h = aa(), { safeRe: c, t: f } = wr(), l = Zl(), a = Wr(), d = Be(), r = tt();
  return xi;
}
var $i, Ps;
function zr() {
  if (Ps) return $i;
  Ps = 1;
  const t = tt();
  return $i = (h, c, f) => {
    try {
      c = new t(c, f);
    } catch {
      return !1;
    }
    return c.test(h);
  }, $i;
}
var Li, Os;
function hf() {
  if (Os) return Li;
  Os = 1;
  const t = tt();
  return Li = (h, c) => new t(h, c).set.map((f) => f.map((l) => l.value).join(" ").trim().split(" ")), Li;
}
var Ui, Is;
function pf() {
  if (Is) return Ui;
  Is = 1;
  const t = Be(), u = tt();
  return Ui = (c, f, l) => {
    let a = null, d = null, r = null;
    try {
      r = new u(f, l);
    } catch {
      return null;
    }
    return c.forEach((s) => {
      r.test(s) && (!a || d.compare(s) === -1) && (a = s, d = new t(a, l));
    }), a;
  }, Ui;
}
var ki, Ns;
function mf() {
  if (Ns) return ki;
  Ns = 1;
  const t = Be(), u = tt();
  return ki = (c, f, l) => {
    let a = null, d = null, r = null;
    try {
      r = new u(f, l);
    } catch {
      return null;
    }
    return c.forEach((s) => {
      r.test(s) && (!a || d.compare(s) === 1) && (a = s, d = new t(a, l));
    }), a;
  }, ki;
}
var qi, Fs;
function gf() {
  if (Fs) return qi;
  Fs = 1;
  const t = Be(), u = tt(), h = Vr();
  return qi = (f, l) => {
    f = new u(f, l);
    let a = new t("0.0.0");
    if (f.test(a) || (a = new t("0.0.0-0"), f.test(a)))
      return a;
    a = null;
    for (let d = 0; d < f.set.length; ++d) {
      const r = f.set[d];
      let s = null;
      r.forEach((n) => {
        const o = new t(n.semver.version);
        switch (n.operator) {
          case ">":
            o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
          /* fallthrough */
          case "":
          case ">=":
            (!s || h(o, s)) && (s = o);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${n.operator}`);
        }
      }), s && (!a || h(a, s)) && (a = s);
    }
    return a && f.test(a) ? a : null;
  }, qi;
}
var Mi, xs;
function vf() {
  if (xs) return Mi;
  xs = 1;
  const t = tt();
  return Mi = (h, c) => {
    try {
      return new t(h, c).range || "*";
    } catch {
      return null;
    }
  }, Mi;
}
var Bi, $s;
function ca() {
  if ($s) return Bi;
  $s = 1;
  const t = Be(), u = Yr(), { ANY: h } = u, c = tt(), f = zr(), l = Vr(), a = sa(), d = ua(), r = la();
  return Bi = (n, o, i, m) => {
    n = new t(n, m), o = new c(o, m);
    let v, E, p, S, R;
    switch (i) {
      case ">":
        v = l, E = d, p = a, S = ">", R = ">=";
        break;
      case "<":
        v = a, E = r, p = l, S = "<", R = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (f(n, o, m))
      return !1;
    for (let D = 0; D < o.set.length; ++D) {
      const P = o.set[D];
      let M = null, b = null;
      if (P.forEach((_) => {
        _.semver === h && (_ = new u(">=0.0.0")), M = M || _, b = b || _, v(_.semver, M.semver, m) ? M = _ : p(_.semver, b.semver, m) && (b = _);
      }), M.operator === S || M.operator === R || (!b.operator || b.operator === S) && E(n, b.semver))
        return !1;
      if (b.operator === R && p(n, b.semver))
        return !1;
    }
    return !0;
  }, Bi;
}
var Hi, Ls;
function yf() {
  if (Ls) return Hi;
  Ls = 1;
  const t = ca();
  return Hi = (h, c, f) => t(h, c, ">", f), Hi;
}
var ji, Us;
function Ef() {
  if (Us) return ji;
  Us = 1;
  const t = ca();
  return ji = (h, c, f) => t(h, c, "<", f), ji;
}
var Gi, ks;
function wf() {
  if (ks) return Gi;
  ks = 1;
  const t = tt();
  return Gi = (h, c, f) => (h = new t(h, f), c = new t(c, f), h.intersects(c, f)), Gi;
}
var Wi, qs;
function _f() {
  if (qs) return Wi;
  qs = 1;
  const t = zr(), u = et();
  return Wi = (h, c, f) => {
    const l = [];
    let a = null, d = null;
    const r = h.sort((i, m) => u(i, m, f));
    for (const i of r)
      t(i, c, f) ? (d = i, a || (a = i)) : (d && l.push([a, d]), d = null, a = null);
    a && l.push([a, null]);
    const s = [];
    for (const [i, m] of l)
      i === m ? s.push(i) : !m && i === r[0] ? s.push("*") : m ? i === r[0] ? s.push(`<=${m}`) : s.push(`${i} - ${m}`) : s.push(`>=${i}`);
    const n = s.join(" || "), o = typeof c.raw == "string" ? c.raw : String(c);
    return n.length < o.length ? n : c;
  }, Wi;
}
var Vi, Ms;
function Sf() {
  if (Ms) return Vi;
  Ms = 1;
  const t = tt(), u = Yr(), { ANY: h } = u, c = zr(), f = et(), l = (o, i, m = {}) => {
    if (o === i)
      return !0;
    o = new t(o, m), i = new t(i, m);
    let v = !1;
    e: for (const E of o.set) {
      for (const p of i.set) {
        const S = r(E, p, m);
        if (v = v || S !== null, S)
          continue e;
      }
      if (v)
        return !1;
    }
    return !0;
  }, a = [new u(">=0.0.0-0")], d = [new u(">=0.0.0")], r = (o, i, m) => {
    if (o === i)
      return !0;
    if (o.length === 1 && o[0].semver === h) {
      if (i.length === 1 && i[0].semver === h)
        return !0;
      m.includePrerelease ? o = a : o = d;
    }
    if (i.length === 1 && i[0].semver === h) {
      if (m.includePrerelease)
        return !0;
      i = d;
    }
    const v = /* @__PURE__ */ new Set();
    let E, p;
    for (const T of o)
      T.operator === ">" || T.operator === ">=" ? E = s(E, T, m) : T.operator === "<" || T.operator === "<=" ? p = n(p, T, m) : v.add(T.semver);
    if (v.size > 1)
      return null;
    let S;
    if (E && p) {
      if (S = f(E.semver, p.semver, m), S > 0)
        return null;
      if (S === 0 && (E.operator !== ">=" || p.operator !== "<="))
        return null;
    }
    for (const T of v) {
      if (E && !c(T, String(E), m) || p && !c(T, String(p), m))
        return null;
      for (const y of i)
        if (!c(T, String(y), m))
          return !1;
      return !0;
    }
    let R, D, P, M, b = p && !m.includePrerelease && p.semver.prerelease.length ? p.semver : !1, _ = E && !m.includePrerelease && E.semver.prerelease.length ? E.semver : !1;
    b && b.prerelease.length === 1 && p.operator === "<" && b.prerelease[0] === 0 && (b = !1);
    for (const T of i) {
      if (M = M || T.operator === ">" || T.operator === ">=", P = P || T.operator === "<" || T.operator === "<=", E) {
        if (_ && T.semver.prerelease && T.semver.prerelease.length && T.semver.major === _.major && T.semver.minor === _.minor && T.semver.patch === _.patch && (_ = !1), T.operator === ">" || T.operator === ">=") {
          if (R = s(E, T, m), R === T && R !== E)
            return !1;
        } else if (E.operator === ">=" && !c(E.semver, String(T), m))
          return !1;
      }
      if (p) {
        if (b && T.semver.prerelease && T.semver.prerelease.length && T.semver.major === b.major && T.semver.minor === b.minor && T.semver.patch === b.patch && (b = !1), T.operator === "<" || T.operator === "<=") {
          if (D = n(p, T, m), D === T && D !== p)
            return !1;
        } else if (p.operator === "<=" && !c(p.semver, String(T), m))
          return !1;
      }
      if (!T.operator && (p || E) && S !== 0)
        return !1;
    }
    return !(E && P && !p && S !== 0 || p && M && !E && S !== 0 || _ || b);
  }, s = (o, i, m) => {
    if (!o)
      return i;
    const v = f(o.semver, i.semver, m);
    return v > 0 ? o : v < 0 || i.operator === ">" && o.operator === ">=" ? i : o;
  }, n = (o, i, m) => {
    if (!o)
      return i;
    const v = f(o.semver, i.semver, m);
    return v < 0 ? o : v > 0 || i.operator === "<" && o.operator === "<=" ? i : o;
  };
  return Vi = l, Vi;
}
var Yi, Bs;
function eu() {
  if (Bs) return Yi;
  Bs = 1;
  const t = wr(), u = Gr(), h = Be(), c = Kl(), f = jt(), l = Qc(), a = Zc(), d = ef(), r = tf(), s = rf(), n = nf(), o = af(), i = of(), m = et(), v = sf(), E = lf(), p = oa(), S = uf(), R = cf(), D = Vr(), P = sa(), M = Jl(), b = Ql(), _ = la(), T = ua(), y = Zl(), k = ff(), L = Yr(), $ = tt(), q = zr(), I = hf(), F = pf(), j = mf(), O = gf(), Q = vf(), Y = ca(), ne = yf(), de = Ef(), ce = wf(), ge = _f(), ye = Sf();
  return Yi = {
    parse: f,
    valid: l,
    clean: a,
    inc: d,
    diff: r,
    major: s,
    minor: n,
    patch: o,
    prerelease: i,
    compare: m,
    rcompare: v,
    compareLoose: E,
    compareBuild: p,
    sort: S,
    rsort: R,
    gt: D,
    lt: P,
    eq: M,
    neq: b,
    gte: _,
    lte: T,
    cmp: y,
    coerce: k,
    Comparator: L,
    Range: $,
    satisfies: q,
    toComparators: I,
    maxSatisfying: F,
    minSatisfying: j,
    minVersion: O,
    validRange: Q,
    outside: Y,
    gtr: ne,
    ltr: de,
    intersects: ce,
    simplifyRange: ge,
    subset: ye,
    SemVer: h,
    re: t.re,
    src: t.src,
    tokens: t.t,
    SEMVER_SPEC_VERSION: u.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: u.RELEASE_TYPES,
    compareIdentifiers: c.compareIdentifiers,
    rcompareIdentifiers: c.rcompareIdentifiers
  }, Yi;
}
var xt = {}, mr = { exports: {} };
mr.exports;
var Hs;
function Tf() {
  return Hs || (Hs = 1, (function(t, u) {
    var h = 200, c = "__lodash_hash_undefined__", f = 1, l = 2, a = 9007199254740991, d = "[object Arguments]", r = "[object Array]", s = "[object AsyncFunction]", n = "[object Boolean]", o = "[object Date]", i = "[object Error]", m = "[object Function]", v = "[object GeneratorFunction]", E = "[object Map]", p = "[object Number]", S = "[object Null]", R = "[object Object]", D = "[object Promise]", P = "[object Proxy]", M = "[object RegExp]", b = "[object Set]", _ = "[object String]", T = "[object Symbol]", y = "[object Undefined]", k = "[object WeakMap]", L = "[object ArrayBuffer]", $ = "[object DataView]", q = "[object Float32Array]", I = "[object Float64Array]", F = "[object Int8Array]", j = "[object Int16Array]", O = "[object Int32Array]", Q = "[object Uint8Array]", Y = "[object Uint8ClampedArray]", ne = "[object Uint16Array]", de = "[object Uint32Array]", ce = /[\\^$.*+?()[\]{}|]/g, ge = /^\[object .+?Constructor\]$/, ye = /^(?:0|[1-9]\d*)$/, J = {};
    J[q] = J[I] = J[F] = J[j] = J[O] = J[Q] = J[Y] = J[ne] = J[de] = !0, J[d] = J[r] = J[L] = J[n] = J[$] = J[o] = J[i] = J[m] = J[E] = J[p] = J[R] = J[M] = J[b] = J[_] = J[k] = !1;
    var ve = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, w = typeof self == "object" && self && self.Object === Object && self, g = ve || w || Function("return this")(), H = u && !u.nodeType && u, N = H && !0 && t && !t.nodeType && t, ue = N && N.exports === H, he = ue && ve.process, pe = (function() {
      try {
        return he && he.binding && he.binding("util");
      } catch {
      }
    })(), _e = pe && pe.isTypedArray;
    function Ee(C, x) {
      for (var K = -1, se = C == null ? 0 : C.length, De = 0, Se = []; ++K < se; ) {
        var Ne = C[K];
        x(Ne, K, C) && (Se[De++] = Ne);
      }
      return Se;
    }
    function He(C, x) {
      for (var K = -1, se = x.length, De = C.length; ++K < se; )
        C[De + K] = x[K];
      return C;
    }
    function Te(C, x) {
      for (var K = -1, se = C == null ? 0 : C.length; ++K < se; )
        if (x(C[K], K, C))
          return !0;
      return !1;
    }
    function qe(C, x) {
      for (var K = -1, se = Array(C); ++K < C; )
        se[K] = x(K);
      return se;
    }
    function lt(C) {
      return function(x) {
        return C(x);
      };
    }
    function it(C, x) {
      return C.has(x);
    }
    function rt(C, x) {
      return C == null ? void 0 : C[x];
    }
    function e(C) {
      var x = -1, K = Array(C.size);
      return C.forEach(function(se, De) {
        K[++x] = [De, se];
      }), K;
    }
    function B(C, x) {
      return function(K) {
        return C(x(K));
      };
    }
    function G(C) {
      var x = -1, K = Array(C.size);
      return C.forEach(function(se) {
        K[++x] = se;
      }), K;
    }
    var re = Array.prototype, W = Function.prototype, te = Object.prototype, Z = g["__core-js_shared__"], ae = W.toString, le = te.hasOwnProperty, Ae = (function() {
      var C = /[^.]+$/.exec(Z && Z.keys && Z.keys.IE_PROTO || "");
      return C ? "Symbol(src)_1." + C : "";
    })(), Re = te.toString, me = RegExp(
      "^" + ae.call(le).replace(ce, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), A = ue ? g.Buffer : void 0, U = g.Symbol, V = g.Uint8Array, z = te.propertyIsEnumerable, X = re.splice, ie = U ? U.toStringTag : void 0, ee = Object.getOwnPropertySymbols, oe = A ? A.isBuffer : void 0, fe = B(Object.keys, Object), we = Nt(g, "DataView"), Ce = Nt(g, "Map"), Ie = Nt(g, "Promise"), be = Nt(g, "Set"), It = Nt(g, "WeakMap"), Ke = Nt(Object, "create"), gt = Et(we), uu = Et(Ce), cu = Et(Ie), fu = Et(be), du = Et(It), ha = U ? U.prototype : void 0, Xr = ha ? ha.valueOf : void 0;
    function vt(C) {
      var x = -1, K = C == null ? 0 : C.length;
      for (this.clear(); ++x < K; ) {
        var se = C[x];
        this.set(se[0], se[1]);
      }
    }
    function hu() {
      this.__data__ = Ke ? Ke(null) : {}, this.size = 0;
    }
    function pu(C) {
      var x = this.has(C) && delete this.__data__[C];
      return this.size -= x ? 1 : 0, x;
    }
    function mu(C) {
      var x = this.__data__;
      if (Ke) {
        var K = x[C];
        return K === c ? void 0 : K;
      }
      return le.call(x, C) ? x[C] : void 0;
    }
    function gu(C) {
      var x = this.__data__;
      return Ke ? x[C] !== void 0 : le.call(x, C);
    }
    function vu(C, x) {
      var K = this.__data__;
      return this.size += this.has(C) ? 0 : 1, K[C] = Ke && x === void 0 ? c : x, this;
    }
    vt.prototype.clear = hu, vt.prototype.delete = pu, vt.prototype.get = mu, vt.prototype.has = gu, vt.prototype.set = vu;
    function at(C) {
      var x = -1, K = C == null ? 0 : C.length;
      for (this.clear(); ++x < K; ) {
        var se = C[x];
        this.set(se[0], se[1]);
      }
    }
    function yu() {
      this.__data__ = [], this.size = 0;
    }
    function Eu(C) {
      var x = this.__data__, K = Sr(x, C);
      if (K < 0)
        return !1;
      var se = x.length - 1;
      return K == se ? x.pop() : X.call(x, K, 1), --this.size, !0;
    }
    function wu(C) {
      var x = this.__data__, K = Sr(x, C);
      return K < 0 ? void 0 : x[K][1];
    }
    function _u(C) {
      return Sr(this.__data__, C) > -1;
    }
    function Su(C, x) {
      var K = this.__data__, se = Sr(K, C);
      return se < 0 ? (++this.size, K.push([C, x])) : K[se][1] = x, this;
    }
    at.prototype.clear = yu, at.prototype.delete = Eu, at.prototype.get = wu, at.prototype.has = _u, at.prototype.set = Su;
    function yt(C) {
      var x = -1, K = C == null ? 0 : C.length;
      for (this.clear(); ++x < K; ) {
        var se = C[x];
        this.set(se[0], se[1]);
      }
    }
    function Tu() {
      this.size = 0, this.__data__ = {
        hash: new vt(),
        map: new (Ce || at)(),
        string: new vt()
      };
    }
    function Au(C) {
      var x = Tr(this, C).delete(C);
      return this.size -= x ? 1 : 0, x;
    }
    function Ru(C) {
      return Tr(this, C).get(C);
    }
    function bu(C) {
      return Tr(this, C).has(C);
    }
    function Cu(C, x) {
      var K = Tr(this, C), se = K.size;
      return K.set(C, x), this.size += K.size == se ? 0 : 1, this;
    }
    yt.prototype.clear = Tu, yt.prototype.delete = Au, yt.prototype.get = Ru, yt.prototype.has = bu, yt.prototype.set = Cu;
    function _r(C) {
      var x = -1, K = C == null ? 0 : C.length;
      for (this.__data__ = new yt(); ++x < K; )
        this.add(C[x]);
    }
    function Du(C) {
      return this.__data__.set(C, c), this;
    }
    function Pu(C) {
      return this.__data__.has(C);
    }
    _r.prototype.add = _r.prototype.push = Du, _r.prototype.has = Pu;
    function ut(C) {
      var x = this.__data__ = new at(C);
      this.size = x.size;
    }
    function Ou() {
      this.__data__ = new at(), this.size = 0;
    }
    function Iu(C) {
      var x = this.__data__, K = x.delete(C);
      return this.size = x.size, K;
    }
    function Nu(C) {
      return this.__data__.get(C);
    }
    function Fu(C) {
      return this.__data__.has(C);
    }
    function xu(C, x) {
      var K = this.__data__;
      if (K instanceof at) {
        var se = K.__data__;
        if (!Ce || se.length < h - 1)
          return se.push([C, x]), this.size = ++K.size, this;
        K = this.__data__ = new yt(se);
      }
      return K.set(C, x), this.size = K.size, this;
    }
    ut.prototype.clear = Ou, ut.prototype.delete = Iu, ut.prototype.get = Nu, ut.prototype.has = Fu, ut.prototype.set = xu;
    function $u(C, x) {
      var K = Ar(C), se = !K && Ku(C), De = !K && !se && Kr(C), Se = !K && !se && !De && Sa(C), Ne = K || se || De || Se, Fe = Ne ? qe(C.length, String) : [], xe = Fe.length;
      for (var Pe in C)
        le.call(C, Pe) && !(Ne && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Pe == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        De && (Pe == "offset" || Pe == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Se && (Pe == "buffer" || Pe == "byteLength" || Pe == "byteOffset") || // Skip index properties.
        Wu(Pe, xe))) && Fe.push(Pe);
      return Fe;
    }
    function Sr(C, x) {
      for (var K = C.length; K--; )
        if (ya(C[K][0], x))
          return K;
      return -1;
    }
    function Lu(C, x, K) {
      var se = x(C);
      return Ar(C) ? se : He(se, K(C));
    }
    function Wt(C) {
      return C == null ? C === void 0 ? y : S : ie && ie in Object(C) ? ju(C) : Xu(C);
    }
    function pa(C) {
      return Vt(C) && Wt(C) == d;
    }
    function ma(C, x, K, se, De) {
      return C === x ? !0 : C == null || x == null || !Vt(C) && !Vt(x) ? C !== C && x !== x : Uu(C, x, K, se, ma, De);
    }
    function Uu(C, x, K, se, De, Se) {
      var Ne = Ar(C), Fe = Ar(x), xe = Ne ? r : ct(C), Pe = Fe ? r : ct(x);
      xe = xe == d ? R : xe, Pe = Pe == d ? R : Pe;
      var Ge = xe == R, Je = Pe == R, Le = xe == Pe;
      if (Le && Kr(C)) {
        if (!Kr(x))
          return !1;
        Ne = !0, Ge = !1;
      }
      if (Le && !Ge)
        return Se || (Se = new ut()), Ne || Sa(C) ? ga(C, x, K, se, De, Se) : Bu(C, x, xe, K, se, De, Se);
      if (!(K & f)) {
        var Ye = Ge && le.call(C, "__wrapped__"), ze = Je && le.call(x, "__wrapped__");
        if (Ye || ze) {
          var ft = Ye ? C.value() : C, ot = ze ? x.value() : x;
          return Se || (Se = new ut()), De(ft, ot, K, se, Se);
        }
      }
      return Le ? (Se || (Se = new ut()), Hu(C, x, K, se, De, Se)) : !1;
    }
    function ku(C) {
      if (!_a(C) || Yu(C))
        return !1;
      var x = Ea(C) ? me : ge;
      return x.test(Et(C));
    }
    function qu(C) {
      return Vt(C) && wa(C.length) && !!J[Wt(C)];
    }
    function Mu(C) {
      if (!zu(C))
        return fe(C);
      var x = [];
      for (var K in Object(C))
        le.call(C, K) && K != "constructor" && x.push(K);
      return x;
    }
    function ga(C, x, K, se, De, Se) {
      var Ne = K & f, Fe = C.length, xe = x.length;
      if (Fe != xe && !(Ne && xe > Fe))
        return !1;
      var Pe = Se.get(C);
      if (Pe && Se.get(x))
        return Pe == x;
      var Ge = -1, Je = !0, Le = K & l ? new _r() : void 0;
      for (Se.set(C, x), Se.set(x, C); ++Ge < Fe; ) {
        var Ye = C[Ge], ze = x[Ge];
        if (se)
          var ft = Ne ? se(ze, Ye, Ge, x, C, Se) : se(Ye, ze, Ge, C, x, Se);
        if (ft !== void 0) {
          if (ft)
            continue;
          Je = !1;
          break;
        }
        if (Le) {
          if (!Te(x, function(ot, wt) {
            if (!it(Le, wt) && (Ye === ot || De(Ye, ot, K, se, Se)))
              return Le.push(wt);
          })) {
            Je = !1;
            break;
          }
        } else if (!(Ye === ze || De(Ye, ze, K, se, Se))) {
          Je = !1;
          break;
        }
      }
      return Se.delete(C), Se.delete(x), Je;
    }
    function Bu(C, x, K, se, De, Se, Ne) {
      switch (K) {
        case $:
          if (C.byteLength != x.byteLength || C.byteOffset != x.byteOffset)
            return !1;
          C = C.buffer, x = x.buffer;
        case L:
          return !(C.byteLength != x.byteLength || !Se(new V(C), new V(x)));
        case n:
        case o:
        case p:
          return ya(+C, +x);
        case i:
          return C.name == x.name && C.message == x.message;
        case M:
        case _:
          return C == x + "";
        case E:
          var Fe = e;
        case b:
          var xe = se & f;
          if (Fe || (Fe = G), C.size != x.size && !xe)
            return !1;
          var Pe = Ne.get(C);
          if (Pe)
            return Pe == x;
          se |= l, Ne.set(C, x);
          var Ge = ga(Fe(C), Fe(x), se, De, Se, Ne);
          return Ne.delete(C), Ge;
        case T:
          if (Xr)
            return Xr.call(C) == Xr.call(x);
      }
      return !1;
    }
    function Hu(C, x, K, se, De, Se) {
      var Ne = K & f, Fe = va(C), xe = Fe.length, Pe = va(x), Ge = Pe.length;
      if (xe != Ge && !Ne)
        return !1;
      for (var Je = xe; Je--; ) {
        var Le = Fe[Je];
        if (!(Ne ? Le in x : le.call(x, Le)))
          return !1;
      }
      var Ye = Se.get(C);
      if (Ye && Se.get(x))
        return Ye == x;
      var ze = !0;
      Se.set(C, x), Se.set(x, C);
      for (var ft = Ne; ++Je < xe; ) {
        Le = Fe[Je];
        var ot = C[Le], wt = x[Le];
        if (se)
          var Ta = Ne ? se(wt, ot, Le, x, C, Se) : se(ot, wt, Le, C, x, Se);
        if (!(Ta === void 0 ? ot === wt || De(ot, wt, K, se, Se) : Ta)) {
          ze = !1;
          break;
        }
        ft || (ft = Le == "constructor");
      }
      if (ze && !ft) {
        var Rr = C.constructor, br = x.constructor;
        Rr != br && "constructor" in C && "constructor" in x && !(typeof Rr == "function" && Rr instanceof Rr && typeof br == "function" && br instanceof br) && (ze = !1);
      }
      return Se.delete(C), Se.delete(x), ze;
    }
    function va(C) {
      return Lu(C, Zu, Gu);
    }
    function Tr(C, x) {
      var K = C.__data__;
      return Vu(x) ? K[typeof x == "string" ? "string" : "hash"] : K.map;
    }
    function Nt(C, x) {
      var K = rt(C, x);
      return ku(K) ? K : void 0;
    }
    function ju(C) {
      var x = le.call(C, ie), K = C[ie];
      try {
        C[ie] = void 0;
        var se = !0;
      } catch {
      }
      var De = Re.call(C);
      return se && (x ? C[ie] = K : delete C[ie]), De;
    }
    var Gu = ee ? function(C) {
      return C == null ? [] : (C = Object(C), Ee(ee(C), function(x) {
        return z.call(C, x);
      }));
    } : ec, ct = Wt;
    (we && ct(new we(new ArrayBuffer(1))) != $ || Ce && ct(new Ce()) != E || Ie && ct(Ie.resolve()) != D || be && ct(new be()) != b || It && ct(new It()) != k) && (ct = function(C) {
      var x = Wt(C), K = x == R ? C.constructor : void 0, se = K ? Et(K) : "";
      if (se)
        switch (se) {
          case gt:
            return $;
          case uu:
            return E;
          case cu:
            return D;
          case fu:
            return b;
          case du:
            return k;
        }
      return x;
    });
    function Wu(C, x) {
      return x = x ?? a, !!x && (typeof C == "number" || ye.test(C)) && C > -1 && C % 1 == 0 && C < x;
    }
    function Vu(C) {
      var x = typeof C;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? C !== "__proto__" : C === null;
    }
    function Yu(C) {
      return !!Ae && Ae in C;
    }
    function zu(C) {
      var x = C && C.constructor, K = typeof x == "function" && x.prototype || te;
      return C === K;
    }
    function Xu(C) {
      return Re.call(C);
    }
    function Et(C) {
      if (C != null) {
        try {
          return ae.call(C);
        } catch {
        }
        try {
          return C + "";
        } catch {
        }
      }
      return "";
    }
    function ya(C, x) {
      return C === x || C !== C && x !== x;
    }
    var Ku = pa(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? pa : function(C) {
      return Vt(C) && le.call(C, "callee") && !z.call(C, "callee");
    }, Ar = Array.isArray;
    function Ju(C) {
      return C != null && wa(C.length) && !Ea(C);
    }
    var Kr = oe || tc;
    function Qu(C, x) {
      return ma(C, x);
    }
    function Ea(C) {
      if (!_a(C))
        return !1;
      var x = Wt(C);
      return x == m || x == v || x == s || x == P;
    }
    function wa(C) {
      return typeof C == "number" && C > -1 && C % 1 == 0 && C <= a;
    }
    function _a(C) {
      var x = typeof C;
      return C != null && (x == "object" || x == "function");
    }
    function Vt(C) {
      return C != null && typeof C == "object";
    }
    var Sa = _e ? lt(_e) : qu;
    function Zu(C) {
      return Ju(C) ? $u(C) : Mu(C);
    }
    function ec() {
      return [];
    }
    function tc() {
      return !1;
    }
    t.exports = Qu;
  })(mr, mr.exports)), mr.exports;
}
var js;
function Af() {
  if (js) return xt;
  js = 1, Object.defineProperty(xt, "__esModule", { value: !0 }), xt.DownloadedUpdateHelper = void 0, xt.createTempUpdateFile = d;
  const t = vr, u = pt, h = Tf(), c = /* @__PURE__ */ mt(), f = Oe;
  let l = class {
    constructor(s) {
      this.cacheDir = s, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
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
      return f.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(s, n, o, i) {
      if (this.versionInfo != null && this.file === s && this.fileInfo != null)
        return h(this.versionInfo, n) && h(this.fileInfo.info, o.info) && await (0, c.pathExists)(s) ? s : null;
      const m = await this.getValidCachedUpdateFile(o, i);
      return m === null ? null : (i.info(`Update has already been downloaded to ${s}).`), this._file = m, m);
    }
    async setDownloadedFile(s, n, o, i, m, v) {
      this._file = s, this._packageFile = n, this.versionInfo = o, this.fileInfo = i, this._downloadedFileInfo = {
        fileName: m,
        sha512: i.info.sha512,
        isAdminRightsRequired: i.info.isAdminRightsRequired === !0
      }, v && await (0, c.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, c.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(s, n) {
      const o = this.getUpdateInfoFile();
      if (!await (0, c.pathExists)(o))
        return null;
      let m;
      try {
        m = await (0, c.readJson)(o);
      } catch (S) {
        let R = "No cached update info available";
        return S.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), R += ` (error on read: ${S.message})`), n.info(R), null;
      }
      if (!((m == null ? void 0 : m.fileName) !== null))
        return n.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (s.info.sha512 !== m.sha512)
        return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m.sha512}, expected: ${s.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const E = f.join(this.cacheDirForPendingUpdate, m.fileName);
      if (!await (0, c.pathExists)(E))
        return n.info("Cached update file doesn't exist"), null;
      const p = await a(E);
      return s.info.sha512 !== p ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p}, expected: ${s.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = m, E);
    }
    getUpdateInfoFile() {
      return f.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  xt.DownloadedUpdateHelper = l;
  function a(r, s = "sha512", n = "base64", o) {
    return new Promise((i, m) => {
      const v = (0, t.createHash)(s);
      v.on("error", m).setEncoding(n), (0, u.createReadStream)(r, {
        ...o,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", m).on("end", () => {
        v.end(), i(v.read());
      }).pipe(v, { end: !1 });
    });
  }
  async function d(r, s, n) {
    let o = 0, i = f.join(s, r);
    for (let m = 0; m < 3; m++)
      try {
        return await (0, c.unlink)(i), i;
      } catch (v) {
        if (v.code === "ENOENT")
          return i;
        n.warn(`Error on remove temp update file: ${v}`), i = f.join(s, `${o++}-${r}`);
      }
    return i;
  }
  return xt;
}
var Qt = {}, kr = {}, Gs;
function Rf() {
  if (Gs) return kr;
  Gs = 1, Object.defineProperty(kr, "__esModule", { value: !0 }), kr.getAppCacheDir = h;
  const t = Oe, u = Br;
  function h() {
    const c = (0, u.homedir)();
    let f;
    return process.platform === "win32" ? f = process.env.LOCALAPPDATA || t.join(c, "AppData", "Local") : process.platform === "darwin" ? f = t.join(c, "Library", "Caches") : f = process.env.XDG_CACHE_HOME || t.join(c, ".cache"), f;
  }
  return kr;
}
var Ws;
function bf() {
  if (Ws) return Qt;
  Ws = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.ElectronAppAdapter = void 0;
  const t = Oe, u = Rf();
  let h = class {
    constructor(f = Ct.app) {
      this.app = f;
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
      return this.isPackaged ? t.join(process.resourcesPath, "app-update.yml") : t.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, u.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(f) {
      this.app.once("quit", (l, a) => f(a));
    }
  };
  return Qt.ElectronAppAdapter = h, Qt;
}
var zi = {}, Vs;
function Cf() {
  return Vs || (Vs = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.ElectronHttpExecutor = t.NET_SESSION_NAME = void 0, t.getNetSession = h;
    const u = $e();
    t.NET_SESSION_NAME = "electron-updater";
    function h() {
      return Ct.session.fromPartition(t.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class c extends u.HttpExecutor {
      constructor(l) {
        super(), this.proxyLoginCallback = l, this.cachedSession = null;
      }
      async download(l, a, d) {
        return await d.cancellationToken.createPromise((r, s, n) => {
          const o = {
            headers: d.headers || void 0,
            redirect: "manual"
          };
          (0, u.configureRequestUrl)(l, o), (0, u.configureRequestOptions)(o), this.doDownload(o, {
            destination: a,
            options: d,
            onCancel: n,
            callback: (i) => {
              i == null ? r(a) : s(i);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(l, a) {
        l.headers && l.headers.Host && (l.host = l.headers.Host, delete l.headers.Host), this.cachedSession == null && (this.cachedSession = h());
        const d = Ct.net.request({
          ...l,
          session: this.cachedSession
        });
        return d.on("response", a), this.proxyLoginCallback != null && d.on("login", this.proxyLoginCallback), d;
      }
      addRedirectHandlers(l, a, d, r, s) {
        l.on("redirect", (n, o, i) => {
          l.abort(), r > this.maxRedirects ? d(this.createMaxRedirectError()) : s(u.HttpExecutor.prepareRedirectUrlOptions(i, a));
        });
      }
    }
    t.ElectronHttpExecutor = c;
  })(zi)), zi;
}
var Zt = {}, Rt = {}, Xi, Ys;
function Df() {
  if (Ys) return Xi;
  Ys = 1;
  var t = "[object Symbol]", u = /[\\^$.*+?()[\]{}|]/g, h = RegExp(u.source), c = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, f = typeof self == "object" && self && self.Object === Object && self, l = c || f || Function("return this")(), a = Object.prototype, d = a.toString, r = l.Symbol, s = r ? r.prototype : void 0, n = s ? s.toString : void 0;
  function o(p) {
    if (typeof p == "string")
      return p;
    if (m(p))
      return n ? n.call(p) : "";
    var S = p + "";
    return S == "0" && 1 / p == -1 / 0 ? "-0" : S;
  }
  function i(p) {
    return !!p && typeof p == "object";
  }
  function m(p) {
    return typeof p == "symbol" || i(p) && d.call(p) == t;
  }
  function v(p) {
    return p == null ? "" : o(p);
  }
  function E(p) {
    return p = v(p), p && h.test(p) ? p.replace(u, "\\$&") : p;
  }
  return Xi = E, Xi;
}
var zs;
function Pt() {
  if (zs) return Rt;
  zs = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.newBaseUrl = h, Rt.newUrlFromBase = c, Rt.getChannelFilename = f, Rt.blockmapFiles = l;
  const t = Mt, u = Df();
  function h(a) {
    const d = new t.URL(a);
    return d.pathname.endsWith("/") || (d.pathname += "/"), d;
  }
  function c(a, d, r = !1) {
    const s = new t.URL(a, d), n = d.search;
    return n != null && n.length !== 0 ? s.search = n : r && (s.search = `noCache=${Date.now().toString(32)}`), s;
  }
  function f(a) {
    return `${a}.yml`;
  }
  function l(a, d, r) {
    const s = c(`${a.pathname}.blockmap`, a);
    return [c(`${a.pathname.replace(new RegExp(u(r), "g"), d)}.blockmap`, a), s];
  }
  return Rt;
}
var st = {}, Xs;
function Xe() {
  if (Xs) return st;
  Xs = 1, Object.defineProperty(st, "__esModule", { value: !0 }), st.Provider = void 0, st.findFile = f, st.parseUpdateInfo = l, st.getFileList = a, st.resolveFiles = d;
  const t = $e(), u = ia(), h = Pt();
  let c = class {
    constructor(s) {
      this.runtimeOptions = s, this.requestHeaders = null, this.executor = s.executor;
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const s = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (s === "x64" ? "" : `-${s}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(s) {
      return `${s}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(s) {
      this.requestHeaders = s;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(s, n, o) {
      return this.executor.request(this.createRequestOptions(s, n), o);
    }
    createRequestOptions(s, n) {
      const o = {};
      return this.requestHeaders == null ? n != null && (o.headers = n) : o.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, t.configureRequestUrl)(s, o), o;
    }
  };
  st.Provider = c;
  function f(r, s, n) {
    if (r.length === 0)
      throw (0, t.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const o = r.find((i) => i.url.pathname.toLowerCase().endsWith(`.${s}`));
    return o ?? (n == null ? r[0] : r.find((i) => !n.some((m) => i.url.pathname.toLowerCase().endsWith(`.${m}`))));
  }
  function l(r, s, n) {
    if (r == null)
      throw (0, t.newError)(`Cannot parse update info from ${s} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let o;
    try {
      o = (0, u.load)(r);
    } catch (i) {
      throw (0, t.newError)(`Cannot parse update info from ${s} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${r}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return o;
  }
  function a(r) {
    const s = r.files;
    if (s != null && s.length > 0)
      return s;
    if (r.path != null)
      return [
        {
          url: r.path,
          sha2: r.sha2,
          sha512: r.sha512
        }
      ];
    throw (0, t.newError)(`No files provided: ${(0, t.safeStringifyJson)(r)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function d(r, s, n = (o) => o) {
    const i = a(r).map((E) => {
      if (E.sha2 == null && E.sha512 == null)
        throw (0, t.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, t.safeStringifyJson)(E)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, h.newUrlFromBase)(n(E.url), s),
        info: E
      };
    }), m = r.packages, v = m == null ? null : m[process.arch] || m.ia32;
    return v != null && (i[0].packageInfo = {
      ...v,
      path: (0, h.newUrlFromBase)(n(v.path), s).href
    }), i;
  }
  return st;
}
var Ks;
function tu() {
  if (Ks) return Zt;
  Ks = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.GenericProvider = void 0;
  const t = $e(), u = Pt(), h = Xe();
  let c = class extends h.Provider {
    constructor(l, a, d) {
      super(d), this.configuration = l, this.updater = a, this.baseUrl = (0, u.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const l = this.updater.channel || this.configuration.channel;
      return l == null ? this.getDefaultChannelName() : this.getCustomChannelName(l);
    }
    async getLatestVersion() {
      const l = (0, u.getChannelFilename)(this.channel), a = (0, u.newUrlFromBase)(l, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let d = 0; ; d++)
        try {
          return (0, h.parseUpdateInfo)(await this.httpRequest(a), l, a);
        } catch (r) {
          if (r instanceof t.HttpError && r.statusCode === 404)
            throw (0, t.newError)(`Cannot find channel "${l}" update info: ${r.stack || r.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (r.code === "ECONNREFUSED" && d < 3) {
            await new Promise((s, n) => {
              try {
                setTimeout(s, 1e3 * d);
              } catch (o) {
                n(o);
              }
            });
            continue;
          }
          throw r;
        }
    }
    resolveFiles(l) {
      return (0, h.resolveFiles)(l, this.baseUrl);
    }
  };
  return Zt.GenericProvider = c, Zt;
}
var er = {}, tr = {}, Js;
function Pf() {
  if (Js) return tr;
  Js = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.BitbucketProvider = void 0;
  const t = $e(), u = Pt(), h = Xe();
  let c = class extends h.Provider {
    constructor(l, a, d) {
      super({
        ...d,
        isUseMultipleRangeRequest: !1
      }), this.configuration = l, this.updater = a;
      const { owner: r, slug: s } = l;
      this.baseUrl = (0, u.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${r}/${s}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const l = new t.CancellationToken(), a = (0, u.getChannelFilename)(this.getCustomChannelName(this.channel)), d = (0, u.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(d, void 0, l);
        return (0, h.parseUpdateInfo)(r, a, d);
      } catch (r) {
        throw (0, t.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(l) {
      return (0, h.resolveFiles)(l, this.baseUrl);
    }
    toString() {
      const { owner: l, slug: a } = this.configuration;
      return `Bitbucket (owner: ${l}, slug: ${a}, channel: ${this.channel})`;
    }
  };
  return tr.BitbucketProvider = c, tr;
}
var ht = {}, Qs;
function ru() {
  if (Qs) return ht;
  Qs = 1, Object.defineProperty(ht, "__esModule", { value: !0 }), ht.GitHubProvider = ht.BaseGitHubProvider = void 0, ht.computeReleaseNotes = s;
  const t = $e(), u = eu(), h = Mt, c = Pt(), f = Xe(), l = /\/tag\/([^/]+)$/;
  class a extends f.Provider {
    constructor(o, i, m) {
      super({
        ...m,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = o, this.baseUrl = (0, c.newBaseUrl)((0, t.githubUrl)(o, i));
      const v = i === "github.com" ? "api.github.com" : i;
      this.baseApiUrl = (0, c.newBaseUrl)((0, t.githubUrl)(o, v));
    }
    computeGithubBasePath(o) {
      const i = this.options.host;
      return i && !["github.com", "api.github.com"].includes(i) ? `/api/v3${o}` : o;
    }
  }
  ht.BaseGitHubProvider = a;
  let d = class extends a {
    constructor(o, i, m) {
      super(o, "github.com", m), this.options = o, this.updater = i;
    }
    get channel() {
      const o = this.updater.channel || this.options.channel;
      return o == null ? this.getDefaultChannelName() : this.getCustomChannelName(o);
    }
    async getLatestVersion() {
      var o, i, m, v, E;
      const p = new t.CancellationToken(), S = await this.httpRequest((0, c.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, p), R = (0, t.parseXml)(S);
      let D = R.element("entry", !1, "No published versions on GitHub"), P = null;
      try {
        if (this.updater.allowPrerelease) {
          const k = ((o = this.updater) === null || o === void 0 ? void 0 : o.channel) || ((i = u.prerelease(this.updater.currentVersion)) === null || i === void 0 ? void 0 : i[0]) || null;
          if (k === null)
            P = l.exec(D.element("link").attribute("href"))[1];
          else
            for (const L of R.getElements("entry")) {
              const $ = l.exec(L.element("link").attribute("href"));
              if ($ === null)
                continue;
              const q = $[1], I = ((m = u.prerelease(q)) === null || m === void 0 ? void 0 : m[0]) || null, F = !k || ["alpha", "beta"].includes(k), j = I !== null && !["alpha", "beta"].includes(String(I));
              if (F && !j && !(k === "beta" && I === "alpha")) {
                P = q;
                break;
              }
              if (I && I === k) {
                P = q;
                break;
              }
            }
        } else {
          P = await this.getLatestTagName(p);
          for (const k of R.getElements("entry"))
            if (l.exec(k.element("link").attribute("href"))[1] === P) {
              D = k;
              break;
            }
        }
      } catch (k) {
        throw (0, t.newError)(`Cannot parse releases feed: ${k.stack || k.message},
XML:
${S}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (P == null)
        throw (0, t.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let M, b = "", _ = "";
      const T = async (k) => {
        b = (0, c.getChannelFilename)(k), _ = (0, c.newUrlFromBase)(this.getBaseDownloadPath(String(P), b), this.baseUrl);
        const L = this.createRequestOptions(_);
        try {
          return await this.executor.request(L, p);
        } catch ($) {
          throw $ instanceof t.HttpError && $.statusCode === 404 ? (0, t.newError)(`Cannot find ${b} in the latest release artifacts (${_}): ${$.stack || $.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : $;
        }
      };
      try {
        let k = this.channel;
        this.updater.allowPrerelease && (!((v = u.prerelease(P)) === null || v === void 0) && v[0]) && (k = this.getCustomChannelName(String((E = u.prerelease(P)) === null || E === void 0 ? void 0 : E[0]))), M = await T(k);
      } catch (k) {
        if (this.updater.allowPrerelease)
          M = await T(this.getDefaultChannelName());
        else
          throw k;
      }
      const y = (0, f.parseUpdateInfo)(M, b, _);
      return y.releaseName == null && (y.releaseName = D.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = s(this.updater.currentVersion, this.updater.fullChangelog, R, D)), {
        tag: P,
        ...y
      };
    }
    async getLatestTagName(o) {
      const i = this.options, m = i.host == null || i.host === "github.com" ? (0, c.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new h.URL(`${this.computeGithubBasePath(`/repos/${i.owner}/${i.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const v = await this.httpRequest(m, { Accept: "application/json" }, o);
        return v == null ? null : JSON.parse(v).tag_name;
      } catch (v) {
        throw (0, t.newError)(`Unable to find latest version on GitHub (${m}), please ensure a production release exists: ${v.stack || v.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(o) {
      return (0, f.resolveFiles)(o, this.baseUrl, (i) => this.getBaseDownloadPath(o.tag, i.replace(/ /g, "-")));
    }
    getBaseDownloadPath(o, i) {
      return `${this.basePath}/download/${o}/${i}`;
    }
  };
  ht.GitHubProvider = d;
  function r(n) {
    const o = n.elementValueOrEmpty("content");
    return o === "No content." ? "" : o;
  }
  function s(n, o, i, m) {
    if (!o)
      return r(m);
    const v = [];
    for (const E of i.getElements("entry")) {
      const p = /\/tag\/v?([^/]+)$/.exec(E.element("link").attribute("href"))[1];
      u.lt(n, p) && v.push({
        version: p,
        note: r(E)
      });
    }
    return v.sort((E, p) => u.rcompare(E.version, p.version));
  }
  return ht;
}
var rr = {}, Zs;
function Of() {
  if (Zs) return rr;
  Zs = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.KeygenProvider = void 0;
  const t = $e(), u = Pt(), h = Xe();
  let c = class extends h.Provider {
    constructor(l, a, d) {
      super({
        ...d,
        isUseMultipleRangeRequest: !1
      }), this.configuration = l, this.updater = a, this.defaultHostname = "api.keygen.sh";
      const r = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, u.newBaseUrl)(`https://${r}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const l = new t.CancellationToken(), a = (0, u.getChannelFilename)(this.getCustomChannelName(this.channel)), d = (0, u.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(d, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, l);
        return (0, h.parseUpdateInfo)(r, a, d);
      } catch (r) {
        throw (0, t.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(l) {
      return (0, h.resolveFiles)(l, this.baseUrl);
    }
    toString() {
      const { account: l, product: a, platform: d } = this.configuration;
      return `Keygen (account: ${l}, product: ${a}, platform: ${d}, channel: ${this.channel})`;
    }
  };
  return rr.KeygenProvider = c, rr;
}
var nr = {}, el;
function If() {
  if (el) return nr;
  el = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.PrivateGitHubProvider = void 0;
  const t = $e(), u = ia(), h = Oe, c = Mt, f = Pt(), l = ru(), a = Xe();
  let d = class extends l.BaseGitHubProvider {
    constructor(s, n, o, i) {
      super(s, "api.github.com", i), this.updater = n, this.token = o;
    }
    createRequestOptions(s, n) {
      const o = super.createRequestOptions(s, n);
      return o.redirect = "manual", o;
    }
    async getLatestVersion() {
      const s = new t.CancellationToken(), n = (0, f.getChannelFilename)(this.getDefaultChannelName()), o = await this.getLatestVersionInfo(s), i = o.assets.find((E) => E.name === n);
      if (i == null)
        throw (0, t.newError)(`Cannot find ${n} in the release ${o.html_url || o.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const m = new c.URL(i.url);
      let v;
      try {
        v = (0, u.load)(await this.httpRequest(m, this.configureHeaders("application/octet-stream"), s));
      } catch (E) {
        throw E instanceof t.HttpError && E.statusCode === 404 ? (0, t.newError)(`Cannot find ${n} in the latest release artifacts (${m}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
      return v.assets = o.assets, v;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(s) {
      return {
        accept: s,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(s) {
      const n = this.updater.allowPrerelease;
      let o = this.basePath;
      n || (o = `${o}/latest`);
      const i = (0, f.newUrlFromBase)(o, this.baseUrl);
      try {
        const m = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), s));
        return n ? m.find((v) => v.prerelease) || m[0] : m;
      } catch (m) {
        throw (0, t.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${m.stack || m.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(s) {
      return (0, a.getFileList)(s).map((n) => {
        const o = h.posix.basename(n.url).replace(/ /g, "-"), i = s.assets.find((m) => m != null && m.name === o);
        if (i == null)
          throw (0, t.newError)(`Cannot find asset "${o}" in: ${JSON.stringify(s.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new c.URL(i.url),
          info: n
        };
      });
    }
  };
  return nr.PrivateGitHubProvider = d, nr;
}
var tl;
function Nf() {
  if (tl) return er;
  tl = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.isUrlProbablySupportMultiRangeRequests = a, er.createClient = d;
  const t = $e(), u = Pf(), h = tu(), c = ru(), f = Of(), l = If();
  function a(r) {
    return !r.includes("s3.amazonaws.com");
  }
  function d(r, s, n) {
    if (typeof r == "string")
      throw (0, t.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const o = r.provider;
    switch (o) {
      case "github": {
        const i = r, m = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
        return m == null ? new c.GitHubProvider(i, s, n) : new l.PrivateGitHubProvider(i, s, m, n);
      }
      case "bitbucket":
        return new u.BitbucketProvider(r, s, n);
      case "keygen":
        return new f.KeygenProvider(r, s, n);
      case "s3":
      case "spaces":
        return new h.GenericProvider({
          provider: "generic",
          url: (0, t.getS3LikeProviderBaseUrl)(r),
          channel: r.channel || null
        }, s, {
          ...n,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const i = r;
        return new h.GenericProvider(i, s, {
          ...n,
          isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && a(i.url)
        });
      }
      case "custom": {
        const i = r, m = i.updateProvider;
        if (!m)
          throw (0, t.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new m(i, s, n);
      }
      default:
        throw (0, t.newError)(`Unsupported provider: ${o}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return er;
}
var ir = {}, ar = {}, $t = {}, Lt = {}, rl;
function fa() {
  if (rl) return Lt;
  rl = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.OperationKind = void 0, Lt.computeOperations = u;
  var t;
  (function(a) {
    a[a.COPY = 0] = "COPY", a[a.DOWNLOAD = 1] = "DOWNLOAD";
  })(t || (Lt.OperationKind = t = {}));
  function u(a, d, r) {
    const s = l(a.files), n = l(d.files);
    let o = null;
    const i = d.files[0], m = [], v = i.name, E = s.get(v);
    if (E == null)
      throw new Error(`no file ${v} in old blockmap`);
    const p = n.get(v);
    let S = 0;
    const { checksumToOffset: R, checksumToOldSize: D } = f(s.get(v), E.offset, r);
    let P = i.offset;
    for (let M = 0; M < p.checksums.length; P += p.sizes[M], M++) {
      const b = p.sizes[M], _ = p.checksums[M];
      let T = R.get(_);
      T != null && D.get(_) !== b && (r.warn(`Checksum ("${_}") matches, but size differs (old: ${D.get(_)}, new: ${b})`), T = void 0), T === void 0 ? (S++, o != null && o.kind === t.DOWNLOAD && o.end === P ? o.end += b : (o = {
        kind: t.DOWNLOAD,
        start: P,
        end: P + b
        // oldBlocks: null,
      }, c(o, m, _, M))) : o != null && o.kind === t.COPY && o.end === T ? o.end += b : (o = {
        kind: t.COPY,
        start: T,
        end: T + b
        // oldBlocks: [checksum]
      }, c(o, m, _, M));
    }
    return S > 0 && r.info(`File${i.name === "file" ? "" : " " + i.name} has ${S} changed blocks`), m;
  }
  const h = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function c(a, d, r, s) {
    if (h && d.length !== 0) {
      const n = d[d.length - 1];
      if (n.kind === a.kind && a.start < n.end && a.start > n.start) {
        const o = [n.start, n.end, a.start, a.end].reduce((i, m) => i < m ? i : m);
        throw new Error(`operation (block index: ${s}, checksum: ${r}, kind: ${t[a.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${n.start} until ${n.end} and ${a.start} until ${a.end}
rel: ${n.start - o} until ${n.end - o} and ${a.start - o} until ${a.end - o}`);
      }
    }
    d.push(a);
  }
  function f(a, d, r) {
    const s = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    let o = d;
    for (let i = 0; i < a.checksums.length; i++) {
      const m = a.checksums[i], v = a.sizes[i], E = n.get(m);
      if (E === void 0)
        s.set(m, o), n.set(m, v);
      else if (r.debug != null) {
        const p = E === v ? "(same size)" : `(size: ${E}, this size: ${v})`;
        r.debug(`${m} duplicated in blockmap ${p}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      o += v;
    }
    return { checksumToOffset: s, checksumToOldSize: n };
  }
  function l(a) {
    const d = /* @__PURE__ */ new Map();
    for (const r of a)
      d.set(r.name, r);
    return d;
  }
  return Lt;
}
var nl;
function nu() {
  if (nl) return $t;
  nl = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.DataSplitter = void 0, $t.copyData = a;
  const t = $e(), u = pt, h = gr, c = fa(), f = Buffer.from(`\r
\r
`);
  var l;
  (function(r) {
    r[r.INIT = 0] = "INIT", r[r.HEADER = 1] = "HEADER", r[r.BODY = 2] = "BODY";
  })(l || (l = {}));
  function a(r, s, n, o, i) {
    const m = (0, u.createReadStream)("", {
      fd: n,
      autoClose: !1,
      start: r.start,
      // end is inclusive
      end: r.end - 1
    });
    m.on("error", o), m.once("end", i), m.pipe(s, {
      end: !1
    });
  }
  let d = class extends h.Writable {
    constructor(s, n, o, i, m, v) {
      super(), this.out = s, this.options = n, this.partIndexToTaskIndex = o, this.partIndexToLength = m, this.finishHandler = v, this.partIndex = -1, this.headerListBuffer = null, this.readState = l.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(s, n, o) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${s.length} bytes`);
        return;
      }
      this.handleData(s).then(o).catch(o);
    }
    async handleData(s) {
      let n = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, t.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const o = Math.min(this.ignoreByteCount, s.length);
        this.ignoreByteCount -= o, n = o;
      } else if (this.remainingPartDataCount > 0) {
        const o = Math.min(this.remainingPartDataCount, s.length);
        this.remainingPartDataCount -= o, await this.processPartData(s, 0, o), n = o;
      }
      if (n !== s.length) {
        if (this.readState === l.HEADER) {
          const o = this.searchHeaderListEnd(s, n);
          if (o === -1)
            return;
          n = o, this.readState = l.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === l.BODY)
            this.readState = l.INIT;
          else {
            this.partIndex++;
            let v = this.partIndexToTaskIndex.get(this.partIndex);
            if (v == null)
              if (this.isFinished)
                v = this.options.end;
              else
                throw (0, t.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const E = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (E < v)
              await this.copyExistingData(E, v);
            else if (E > v)
              throw (0, t.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (n = this.searchHeaderListEnd(s, n), n === -1) {
              this.readState = l.HEADER;
              return;
            }
          }
          const o = this.partIndexToLength[this.partIndex], i = n + o, m = Math.min(i, s.length);
          if (await this.processPartStarted(s, n, m), this.remainingPartDataCount = o - (m - n), this.remainingPartDataCount > 0)
            return;
          if (n = i + this.boundaryLength, n >= s.length) {
            this.ignoreByteCount = this.boundaryLength - (s.length - i);
            return;
          }
        }
      }
    }
    copyExistingData(s, n) {
      return new Promise((o, i) => {
        const m = () => {
          if (s === n) {
            o();
            return;
          }
          const v = this.options.tasks[s];
          if (v.kind !== c.OperationKind.COPY) {
            i(new Error("Task kind must be COPY"));
            return;
          }
          a(v, this.out, this.options.oldFileFd, i, () => {
            s++, m();
          });
        };
        m();
      });
    }
    searchHeaderListEnd(s, n) {
      const o = s.indexOf(f, n);
      if (o !== -1)
        return o + f.length;
      const i = n === 0 ? s : s.slice(n);
      return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
    }
    onPartEnd() {
      const s = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== s)
        throw (0, t.newError)(`Expected length: ${s} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(s, n, o) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(s, n, o);
    }
    processPartData(s, n, o) {
      this.actualPartLength += o - n;
      const i = this.out;
      return i.write(n === 0 && s.length === o ? s : s.slice(n, o)) ? Promise.resolve() : new Promise((m, v) => {
        i.on("error", v), i.once("drain", () => {
          i.removeListener("error", v), m();
        });
      });
    }
  };
  return $t.DataSplitter = d, $t;
}
var or = {}, il;
function Ff() {
  if (il) return or;
  il = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.executeTasksUsingMultipleRangeRequests = c, or.checkIsRangesSupported = l;
  const t = $e(), u = nu(), h = fa();
  function c(a, d, r, s, n) {
    const o = (i) => {
      if (i >= d.length) {
        a.fileMetadataBuffer != null && r.write(a.fileMetadataBuffer), r.end();
        return;
      }
      const m = i + 1e3;
      f(a, {
        tasks: d,
        start: i,
        end: Math.min(d.length, m),
        oldFileFd: s
      }, r, () => o(m), n);
    };
    return o;
  }
  function f(a, d, r, s, n) {
    let o = "bytes=", i = 0;
    const m = /* @__PURE__ */ new Map(), v = [];
    for (let S = d.start; S < d.end; S++) {
      const R = d.tasks[S];
      R.kind === h.OperationKind.DOWNLOAD && (o += `${R.start}-${R.end - 1}, `, m.set(i, S), i++, v.push(R.end - R.start));
    }
    if (i <= 1) {
      const S = (R) => {
        if (R >= d.end) {
          s();
          return;
        }
        const D = d.tasks[R++];
        if (D.kind === h.OperationKind.COPY)
          (0, u.copyData)(D, r, d.oldFileFd, n, () => S(R));
        else {
          const P = a.createRequestOptions();
          P.headers.Range = `bytes=${D.start}-${D.end - 1}`;
          const M = a.httpExecutor.createRequest(P, (b) => {
            l(b, n) && (b.pipe(r, {
              end: !1
            }), b.once("end", () => S(R)));
          });
          a.httpExecutor.addErrorAndTimeoutHandlers(M, n), M.end();
        }
      };
      S(d.start);
      return;
    }
    const E = a.createRequestOptions();
    E.headers.Range = o.substring(0, o.length - 2);
    const p = a.httpExecutor.createRequest(E, (S) => {
      if (!l(S, n))
        return;
      const R = (0, t.safeGetHeader)(S, "content-type"), D = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(R);
      if (D == null) {
        n(new Error(`Content-Type "multipart/byteranges" is expected, but got "${R}"`));
        return;
      }
      const P = new u.DataSplitter(r, d, m, D[1] || D[2], v, s);
      P.on("error", n), S.pipe(P), S.on("end", () => {
        setTimeout(() => {
          p.abort(), n(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    a.httpExecutor.addErrorAndTimeoutHandlers(p, n), p.end();
  }
  function l(a, d) {
    if (a.statusCode >= 400)
      return d((0, t.createHttpError)(a)), !1;
    if (a.statusCode !== 206) {
      const r = (0, t.safeGetHeader)(a, "accept-ranges");
      if (r == null || r === "none")
        return d(new Error(`Server doesn't support Accept-Ranges (response code ${a.statusCode})`)), !1;
    }
    return !0;
  }
  return or;
}
var sr = {}, al;
function xf() {
  if (al) return sr;
  al = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.ProgressDifferentialDownloadCallbackTransform = void 0;
  const t = gr;
  var u;
  (function(c) {
    c[c.COPY = 0] = "COPY", c[c.DOWNLOAD = 1] = "DOWNLOAD";
  })(u || (u = {}));
  let h = class extends t.Transform {
    constructor(f, l, a) {
      super(), this.progressDifferentialDownloadInfo = f, this.cancellationToken = l, this.onProgress = a, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = u.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(f, l, a) {
      if (this.cancellationToken.cancelled) {
        a(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == u.COPY) {
        a(null, f);
        return;
      }
      this.transferred += f.length, this.delta += f.length;
      const d = Date.now();
      d >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = d + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((d - this.start) / 1e3))
      }), this.delta = 0), a(null, f);
    }
    beginFileCopy() {
      this.operationType = u.COPY;
    }
    beginRangeDownload() {
      this.operationType = u.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
    _flush(f) {
      if (this.cancellationToken.cancelled) {
        f(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, f(null);
    }
  };
  return sr.ProgressDifferentialDownloadCallbackTransform = h, sr;
}
var ol;
function iu() {
  if (ol) return ar;
  ol = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.DifferentialDownloader = void 0;
  const t = $e(), u = /* @__PURE__ */ mt(), h = pt, c = nu(), f = Mt, l = fa(), a = Ff(), d = xf();
  let r = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(i, m, v) {
      this.blockAwareFileInfo = i, this.httpExecutor = m, this.options = v, this.fileMetadataBuffer = null, this.logger = v.logger;
    }
    createRequestOptions() {
      const i = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, t.configureRequestUrl)(this.options.newUrl, i), (0, t.configureRequestOptions)(i), i;
    }
    doDownload(i, m) {
      if (i.version !== m.version)
        throw new Error(`version is different (${i.version} - ${m.version}), full download is required`);
      const v = this.logger, E = (0, l.computeOperations)(i, m, v);
      v.debug != null && v.debug(JSON.stringify(E, null, 2));
      let p = 0, S = 0;
      for (const D of E) {
        const P = D.end - D.start;
        D.kind === l.OperationKind.DOWNLOAD ? p += P : S += P;
      }
      const R = this.blockAwareFileInfo.size;
      if (p + S + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== R)
        throw new Error(`Internal error, size mismatch: downloadSize: ${p}, copySize: ${S}, newSize: ${R}`);
      return v.info(`Full: ${s(R)}, To download: ${s(p)} (${Math.round(p / (R / 100))}%)`), this.downloadFile(E);
    }
    downloadFile(i) {
      const m = [], v = () => Promise.all(m.map((E) => (0, u.close)(E.descriptor).catch((p) => {
        this.logger.error(`cannot close file "${E.path}": ${p}`);
      })));
      return this.doDownloadFile(i, m).then(v).catch((E) => v().catch((p) => {
        try {
          this.logger.error(`cannot close files: ${p}`);
        } catch (S) {
          try {
            console.error(S);
          } catch {
          }
        }
        throw E;
      }).then(() => {
        throw E;
      }));
    }
    async doDownloadFile(i, m) {
      const v = await (0, u.open)(this.options.oldFile, "r");
      m.push({ descriptor: v, path: this.options.oldFile });
      const E = await (0, u.open)(this.options.newFile, "w");
      m.push({ descriptor: E, path: this.options.newFile });
      const p = (0, h.createWriteStream)(this.options.newFile, { fd: E });
      await new Promise((S, R) => {
        const D = [];
        let P;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const $ = [];
          let q = 0;
          for (const F of i)
            F.kind === l.OperationKind.DOWNLOAD && ($.push(F.end - F.start), q += F.end - F.start);
          const I = {
            expectedByteCounts: $,
            grandTotal: q
          };
          P = new d.ProgressDifferentialDownloadCallbackTransform(I, this.options.cancellationToken, this.options.onProgress), D.push(P);
        }
        const M = new t.DigestTransform(this.blockAwareFileInfo.sha512);
        M.isValidateOnEnd = !1, D.push(M), p.on("finish", () => {
          p.close(() => {
            m.splice(1, 1);
            try {
              M.validate();
            } catch ($) {
              R($);
              return;
            }
            S(void 0);
          });
        }), D.push(p);
        let b = null;
        for (const $ of D)
          $.on("error", R), b == null ? b = $ : b = b.pipe($);
        const _ = D[0];
        let T;
        if (this.options.isUseMultipleRangeRequest) {
          T = (0, a.executeTasksUsingMultipleRangeRequests)(this, i, _, v, R), T(0);
          return;
        }
        let y = 0, k = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const L = this.createRequestOptions();
        L.redirect = "manual", T = ($) => {
          var q, I;
          if ($ >= i.length) {
            this.fileMetadataBuffer != null && _.write(this.fileMetadataBuffer), _.end();
            return;
          }
          const F = i[$++];
          if (F.kind === l.OperationKind.COPY) {
            P && P.beginFileCopy(), (0, c.copyData)(F, _, v, R, () => T($));
            return;
          }
          const j = `bytes=${F.start}-${F.end - 1}`;
          L.headers.range = j, (I = (q = this.logger) === null || q === void 0 ? void 0 : q.debug) === null || I === void 0 || I.call(q, `download range: ${j}`), P && P.beginRangeDownload();
          const O = this.httpExecutor.createRequest(L, (Q) => {
            Q.on("error", R), Q.on("aborted", () => {
              R(new Error("response has been aborted by the server"));
            }), Q.statusCode >= 400 && R((0, t.createHttpError)(Q)), Q.pipe(_, {
              end: !1
            }), Q.once("end", () => {
              P && P.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => T($), 1e3)) : T($);
            });
          });
          O.on("redirect", (Q, Y, ne) => {
            this.logger.info(`Redirect to ${n(ne)}`), k = ne, (0, t.configureRequestUrl)(new f.URL(k), L), O.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(O, R), O.end();
        }, T(0);
      });
    }
    async readRemoteBytes(i, m) {
      const v = Buffer.allocUnsafe(m + 1 - i), E = this.createRequestOptions();
      E.headers.range = `bytes=${i}-${m}`;
      let p = 0;
      if (await this.request(E, (S) => {
        S.copy(v, p), p += S.length;
      }), p !== v.length)
        throw new Error(`Received data length ${p} is not equal to expected ${v.length}`);
      return v;
    }
    request(i, m) {
      return new Promise((v, E) => {
        const p = this.httpExecutor.createRequest(i, (S) => {
          (0, a.checkIsRangesSupported)(S, E) && (S.on("error", E), S.on("aborted", () => {
            E(new Error("response has been aborted by the server"));
          }), S.on("data", m), S.on("end", () => v()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(p, E), p.end();
      });
    }
  };
  ar.DifferentialDownloader = r;
  function s(o, i = " KB") {
    return new Intl.NumberFormat("en").format((o / 1024).toFixed(2)) + i;
  }
  function n(o) {
    const i = o.indexOf("?");
    return i < 0 ? o : o.substring(0, i);
  }
  return ar;
}
var sl;
function $f() {
  if (sl) return ir;
  sl = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.GenericDifferentialDownloader = void 0;
  const t = iu();
  let u = class extends t.DifferentialDownloader {
    download(c, f) {
      return this.doDownload(c, f);
    }
  };
  return ir.GenericDifferentialDownloader = u, ir;
}
var Ki = {}, ll;
function Ot() {
  return ll || (ll = 1, (function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.UpdaterSignal = t.UPDATE_DOWNLOADED = t.DOWNLOAD_PROGRESS = t.CancellationToken = void 0, t.addHandler = c;
    const u = $e();
    Object.defineProperty(t, "CancellationToken", { enumerable: !0, get: function() {
      return u.CancellationToken;
    } }), t.DOWNLOAD_PROGRESS = "download-progress", t.UPDATE_DOWNLOADED = "update-downloaded";
    class h {
      constructor(l) {
        this.emitter = l;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(l) {
        c(this.emitter, "login", l);
      }
      progress(l) {
        c(this.emitter, t.DOWNLOAD_PROGRESS, l);
      }
      updateDownloaded(l) {
        c(this.emitter, t.UPDATE_DOWNLOADED, l);
      }
      updateCancelled(l) {
        c(this.emitter, "update-cancelled", l);
      }
    }
    t.UpdaterSignal = h;
    function c(f, l, a) {
      f.on(l, a);
    }
  })(Ki)), Ki;
}
var ul;
function da() {
  if (ul) return St;
  ul = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.NoOpLogger = St.AppUpdater = void 0;
  const t = $e(), u = vr, h = Br, c = Cl, f = /* @__PURE__ */ mt(), l = ia(), a = Jc(), d = Oe, r = eu(), s = Af(), n = bf(), o = Cf(), i = tu(), m = Nf(), v = Pl, E = Pt(), p = $f(), S = Ot();
  let R = class au extends c.EventEmitter {
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
          throw (0, t.newError)(`Channel must be a string, but got: ${b}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (b.length === 0)
          throw (0, t.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
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
      return (0, o.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(b) {
      this._logger = b ?? new P();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(b) {
      this.clientPromise = null, this._appUpdateConfigPath = b, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
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
    constructor(b, _) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new S.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (k) => this.checkIfUpdateSupported(k), this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (k) => {
        this._logger.error(`Error: ${k.stack || k.message}`);
      }), _ == null ? (this.app = new n.ElectronAppAdapter(), this.httpExecutor = new o.ElectronHttpExecutor((k, L) => this.emit("login", k, L))) : (this.app = _, this.httpExecutor = null);
      const T = this.app.version, y = (0, r.parse)(T);
      if (y == null)
        throw (0, t.newError)(`App version is not a valid semver version: "${T}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = y, this.allowPrerelease = D(y), b != null && (this.setFeedURL(b), typeof b != "string" && b.requestHeaders && (this.requestHeaders = b.requestHeaders));
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
      const _ = this.createProviderRuntimeOptions();
      let T;
      typeof b == "string" ? T = new i.GenericProvider({ provider: "generic", url: b }, this, {
        ..._,
        isUseMultipleRangeRequest: (0, m.isUrlProbablySupportMultiRangeRequests)(b)
      }) : T = (0, m.createClient)(b, this, _), this.clientPromise = Promise.resolve(T);
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
      const _ = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), b = this.doCheckForUpdates().then((T) => (_(), T)).catch((T) => {
        throw _(), this.emit("error", T, `Cannot check for updates: ${(T.stack || T).toString()}`), T;
      }), this.checkForUpdatesPromise = b, b;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(b) {
      return this.checkForUpdates().then((_) => _ != null && _.downloadPromise ? (_.downloadPromise.then(() => {
        const T = au.formatDownloadNotification(_.updateInfo.version, this.app.name, b);
        new Ct.Notification(T).show();
      }), _) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), _));
    }
    static formatDownloadNotification(b, _, T) {
      return T == null && (T = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), T = {
        title: T.title.replace("{appName}", _).replace("{version}", b),
        body: T.body.replace("{appName}", _).replace("{version}", b)
      }, T;
    }
    async isStagingMatch(b) {
      const _ = b.stagingPercentage;
      let T = _;
      if (T == null)
        return !0;
      if (T = parseInt(T, 10), isNaN(T))
        return this._logger.warn(`Staging percentage is NaN: ${_}`), !0;
      T = T / 100;
      const y = await this.stagingUserIdPromise.value, L = t.UUID.parse(y).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${T}, percentage: ${L}, user id: ${y}`), L < T;
    }
    computeFinalHeaders(b) {
      return this.requestHeaders != null && Object.assign(b, this.requestHeaders), b;
    }
    async isUpdateAvailable(b) {
      const _ = (0, r.parse)(b.version);
      if (_ == null)
        throw (0, t.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${b.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const T = this.currentVersion;
      if ((0, r.eq)(_, T) || !await Promise.resolve(this.isUpdateSupported(b)) || !await this.isStagingMatch(b))
        return !1;
      const k = (0, r.gt)(_, T), L = (0, r.lt)(_, T);
      return k ? !0 : this.allowDowngrade && L;
    }
    checkIfUpdateSupported(b) {
      const _ = b == null ? void 0 : b.minimumSystemVersion, T = (0, h.release)();
      if (_)
        try {
          if ((0, r.lt)(T, _))
            return this._logger.info(`Current OS version ${T} is less than the minimum OS version required ${_} for version ${T}`), !1;
        } catch (y) {
          this._logger.warn(`Failed to compare current OS version(${T}) with minimum OS version(${_}): ${(y.message || y).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((T) => (0, m.createClient)(T, this, this.createProviderRuntimeOptions())));
      const b = await this.clientPromise, _ = await this.stagingUserIdPromise.value;
      return b.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": _ })), {
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
      const b = await this.getUpdateInfoAndProvider(), _ = b.info;
      if (!await this.isUpdateAvailable(_))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${_.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", _), {
          isUpdateAvailable: !1,
          versionInfo: _,
          updateInfo: _
        };
      this.updateInfoAndProvider = b, this.onUpdateAvailable(_);
      const T = new t.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: _,
        updateInfo: _,
        cancellationToken: T,
        downloadPromise: this.autoDownload ? this.downloadUpdate(T) : null
      };
    }
    onUpdateAvailable(b) {
      this._logger.info(`Found version ${b.version} (url: ${(0, t.asArray)(b.files).map((_) => _.url).join(", ")})`), this.emit("update-available", b);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(b = new t.CancellationToken()) {
      const _ = this.updateInfoAndProvider;
      if (_ == null) {
        const y = new Error("Please check update first");
        return this.dispatchError(y), Promise.reject(y);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, t.asArray)(_.info.files).map((y) => y.url).join(", ")}`);
      const T = (y) => {
        if (!(y instanceof t.CancellationError))
          try {
            this.dispatchError(y);
          } catch (k) {
            this._logger.warn(`Cannot dispatch error event: ${k.stack || k}`);
          }
        return y;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: _,
        requestHeaders: this.computeRequestHeaders(_.provider),
        cancellationToken: b,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((y) => {
        throw T(y);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(b) {
      this.emit("error", b, (b.stack || b).toString());
    }
    dispatchUpdateDownloaded(b) {
      this.emit(S.UPDATE_DOWNLOADED, b);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, l.load)(await (0, f.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(b) {
      const _ = b.fileExtraDownloadHeaders;
      if (_ != null) {
        const T = this.requestHeaders;
        return T == null ? _ : {
          ..._,
          ...T
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const b = d.join(this.app.userDataPath, ".updaterId");
      try {
        const T = await (0, f.readFile)(b, "utf-8");
        if (t.UUID.check(T))
          return T;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${T}`);
      } catch (T) {
        T.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${T}`);
      }
      const _ = t.UUID.v5((0, u.randomBytes)(4096), t.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${_}`);
      try {
        await (0, f.outputFile)(b, _);
      } catch (T) {
        this._logger.warn(`Couldn't write out staging user ID: ${T}`);
      }
      return _;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const b = this.requestHeaders;
      if (b == null)
        return !0;
      for (const _ of Object.keys(b)) {
        const T = _.toLowerCase();
        if (T === "authorization" || T === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let b = this.downloadedUpdateHelper;
      if (b == null) {
        const _ = (await this.configOnDisk.value).updaterCacheDirName, T = this._logger;
        _ == null && T.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const y = d.join(this.app.baseCachePath, _ || this.app.name);
        T.debug != null && T.debug(`updater cache dir: ${y}`), b = new s.DownloadedUpdateHelper(y), this.downloadedUpdateHelper = b;
      }
      return b;
    }
    async executeDownload(b) {
      const _ = b.fileInfo, T = {
        headers: b.downloadUpdateOptions.requestHeaders,
        cancellationToken: b.downloadUpdateOptions.cancellationToken,
        sha2: _.info.sha2,
        sha512: _.info.sha512
      };
      this.listenerCount(S.DOWNLOAD_PROGRESS) > 0 && (T.onProgress = (ge) => this.emit(S.DOWNLOAD_PROGRESS, ge));
      const y = b.downloadUpdateOptions.updateInfoAndProvider.info, k = y.version, L = _.packageInfo;
      function $() {
        const ge = decodeURIComponent(b.fileInfo.url.pathname);
        return ge.endsWith(`.${b.fileExtension}`) ? d.basename(ge) : b.fileInfo.info.url;
      }
      const q = await this.getOrCreateDownloadHelper(), I = q.cacheDirForPendingUpdate;
      await (0, f.mkdir)(I, { recursive: !0 });
      const F = $();
      let j = d.join(I, F);
      const O = L == null ? null : d.join(I, `package-${k}${d.extname(L.path) || ".7z"}`), Q = async (ge) => (await q.setDownloadedFile(j, O, y, _, F, ge), await b.done({
        ...y,
        downloadedFile: j
      }), O == null ? [j] : [j, O]), Y = this._logger, ne = await q.validateDownloadedPath(j, y, _, Y);
      if (ne != null)
        return j = ne, await Q(!1);
      const de = async () => (await q.clear().catch(() => {
      }), await (0, f.unlink)(j).catch(() => {
      })), ce = await (0, s.createTempUpdateFile)(`temp-${F}`, I, Y);
      try {
        await b.task(ce, T, O, de), await (0, t.retry)(() => (0, f.rename)(ce, j), 60, 500, 0, 0, (ge) => ge instanceof Error && /^EBUSY:/.test(ge.message));
      } catch (ge) {
        throw await de(), ge instanceof t.CancellationError && (Y.info("cancelled"), this.emit("update-cancelled", y)), ge;
      }
      return Y.info(`New version ${k} has been downloaded to ${j}`), await Q(!0);
    }
    async differentialDownloadInstaller(b, _, T, y, k) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const L = (0, E.blockmapFiles)(b.url, this.app.version, _.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${L[0]}", new: ${L[1]})`);
        const $ = async (F) => {
          const j = await this.httpExecutor.downloadToBuffer(F, {
            headers: _.requestHeaders,
            cancellationToken: _.cancellationToken
          });
          if (j == null || j.length === 0)
            throw new Error(`Blockmap "${F.href}" is empty`);
          try {
            return JSON.parse((0, v.gunzipSync)(j).toString());
          } catch (O) {
            throw new Error(`Cannot parse blockmap "${F.href}", error: ${O}`);
          }
        }, q = {
          newUrl: b.url,
          oldFile: d.join(this.downloadedUpdateHelper.cacheDir, k),
          logger: this._logger,
          newFile: T,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          requestHeaders: _.requestHeaders,
          cancellationToken: _.cancellationToken
        };
        this.listenerCount(S.DOWNLOAD_PROGRESS) > 0 && (q.onProgress = (F) => this.emit(S.DOWNLOAD_PROGRESS, F));
        const I = await Promise.all(L.map((F) => $(F)));
        return await new p.GenericDifferentialDownloader(b.info, this.httpExecutor, q).download(I[0], I[1]), !1;
      } catch (L) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${L.stack || L}`), this._testOnlyOptions != null)
          throw L;
        return !0;
      }
    }
  };
  St.AppUpdater = R;
  function D(M) {
    const b = (0, r.prerelease)(M);
    return b != null && b.length > 0;
  }
  class P {
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
  return St.NoOpLogger = P, St;
}
var cl;
function Gt() {
  if (cl) return Yt;
  cl = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.BaseUpdater = void 0;
  const t = Mr, u = da();
  let h = class extends u.AppUpdater {
    constructor(f, l) {
      super(f, l), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(f = !1, l = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(f, f ? l : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Ct.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(f) {
      return super.executeDownload({
        ...f,
        done: (l) => (this.dispatchUpdateDownloaded(l), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(f = !1, l = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, d = this.installerPath, r = a == null ? null : a.downloadedFileInfo;
      if (d == null || r == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${f}, isForceRunAfter: ${l}`), this.doInstall({
          isSilent: f,
          isForceRunAfter: l,
          isAdminRightsRequired: r.isAdminRightsRequired
        });
      } catch (s) {
        return this.dispatchError(s), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((f) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (f !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${f}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: f } = this.app, l = `"${f} would like to update"`, a = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), d = [a];
      return /kdesudo/i.test(a) ? (d.push("--comment", l), d.push("-c")) : /gksudo/i.test(a) ? d.push("--message", l) : /pkexec/i.test(a) && d.push("--disable-internal-agent"), d.join(" ");
    }
    spawnSyncLog(f, l = [], a = {}) {
      this._logger.info(`Executing: ${f} with args: ${l}`);
      const d = (0, t.spawnSync)(f, l, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }), { error: r, status: s, stdout: n, stderr: o } = d;
      if (r != null)
        throw this._logger.error(o), r;
      if (s != null && s !== 0)
        throw this._logger.error(o), new Error(`Command ${f} exited with code ${s}`);
      return n.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(f, l = [], a = void 0, d = "ignore") {
      return this._logger.info(`Executing: ${f} with args: ${l}`), new Promise((r, s) => {
        try {
          const n = { stdio: d, env: a, detached: !0 }, o = (0, t.spawn)(f, l, n);
          o.on("error", (i) => {
            s(i);
          }), o.unref(), o.pid !== void 0 && r(!0);
        } catch (n) {
          s(n);
        }
      });
    }
  };
  return Yt.BaseUpdater = h, Yt;
}
var lr = {}, ur = {}, fl;
function ou() {
  if (fl) return ur;
  fl = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const t = /* @__PURE__ */ mt(), u = iu(), h = Pl;
  let c = class extends u.DifferentialDownloader {
    async download() {
      const d = this.blockAwareFileInfo, r = d.size, s = r - (d.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(s, r - 1);
      const n = f(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await l(this.options.oldFile), n);
    }
  };
  ur.FileWithEmbeddedBlockMapDifferentialDownloader = c;
  function f(a) {
    return JSON.parse((0, h.inflateRawSync)(a).toString());
  }
  async function l(a) {
    const d = await (0, t.open)(a, "r");
    try {
      const r = (await (0, t.fstat)(d)).size, s = Buffer.allocUnsafe(4);
      await (0, t.read)(d, s, 0, s.length, r - s.length);
      const n = Buffer.allocUnsafe(s.readUInt32BE(0));
      return await (0, t.read)(d, n, 0, n.length, r - s.length - n.length), await (0, t.close)(d), f(n);
    } catch (r) {
      throw await (0, t.close)(d), r;
    }
  }
  return ur;
}
var dl;
function hl() {
  if (dl) return lr;
  dl = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.AppImageUpdater = void 0;
  const t = $e(), u = Mr, h = /* @__PURE__ */ mt(), c = pt, f = Oe, l = Gt(), a = ou(), d = Xe(), r = Ot();
  let s = class extends l.BaseUpdater {
    constructor(o, i) {
      super(o, i);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(o) {
      const i = o.updateInfoAndProvider.provider, m = (0, d.findFile)(i.resolveFiles(o.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: m,
        downloadUpdateOptions: o,
        task: async (v, E) => {
          const p = process.env.APPIMAGE;
          if (p == null)
            throw (0, t.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (o.disableDifferentialDownload || await this.downloadDifferential(m, p, v, i, o)) && await this.httpExecutor.download(m.url, v, E), await (0, h.chmod)(v, 493);
        }
      });
    }
    async downloadDifferential(o, i, m, v, E) {
      try {
        const p = {
          newUrl: o.url,
          oldFile: i,
          logger: this._logger,
          newFile: m,
          isUseMultipleRangeRequest: v.isUseMultipleRangeRequest,
          requestHeaders: E.requestHeaders,
          cancellationToken: E.cancellationToken
        };
        return this.listenerCount(r.DOWNLOAD_PROGRESS) > 0 && (p.onProgress = (S) => this.emit(r.DOWNLOAD_PROGRESS, S)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(o.info, this.httpExecutor, p).download(), !1;
      } catch (p) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${p.stack || p}`), process.platform === "linux";
      }
    }
    doInstall(o) {
      const i = process.env.APPIMAGE;
      if (i == null)
        throw (0, t.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, c.unlinkSync)(i);
      let m;
      const v = f.basename(i), E = this.installerPath;
      if (E == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      f.basename(E) === v || !/\d+\.\d+\.\d+/.test(v) ? m = i : m = f.join(f.dirname(i), f.basename(E)), (0, u.execFileSync)("mv", ["-f", E, m]), m !== i && this.emit("appimage-filename-updated", m);
      const p = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return o.isForceRunAfter ? this.spawnLog(m, [], p) : (p.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, u.execFileSync)(m, [], { env: p })), !0;
    }
  };
  return lr.AppImageUpdater = s, lr;
}
var cr = {}, pl;
function ml() {
  if (pl) return cr;
  pl = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.DebUpdater = void 0;
  const t = Gt(), u = Xe(), h = Ot();
  let c = class extends t.BaseUpdater {
    constructor(l, a) {
      super(l, a);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const a = l.updateInfoAndProvider.provider, d = (0, u.findFile)(a.resolveFiles(l.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: d,
        downloadUpdateOptions: l,
        task: async (r, s) => {
          this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (n) => this.emit(h.DOWNLOAD_PROGRESS, n)), await this.httpExecutor.download(d.url, r, s);
        }
      });
    }
    get installerPath() {
      var l, a;
      return (a = (l = super.installerPath) === null || l === void 0 ? void 0 : l.replace(/ /g, "\\ ")) !== null && a !== void 0 ? a : null;
    }
    doInstall(l) {
      const a = this.wrapSudo(), d = /pkexec/i.test(a) ? "" : '"', r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const s = ["dpkg", "-i", r, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${d}/bin/bash`, "-c", `'${s.join(" ")}'${d}`]), l.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return cr.DebUpdater = c, cr;
}
var fr = {}, gl;
function vl() {
  if (gl) return fr;
  gl = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.PacmanUpdater = void 0;
  const t = Gt(), u = Ot(), h = Xe();
  let c = class extends t.BaseUpdater {
    constructor(l, a) {
      super(l, a);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const a = l.updateInfoAndProvider.provider, d = (0, h.findFile)(a.resolveFiles(l.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: d,
        downloadUpdateOptions: l,
        task: async (r, s) => {
          this.listenerCount(u.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (n) => this.emit(u.DOWNLOAD_PROGRESS, n)), await this.httpExecutor.download(d.url, r, s);
        }
      });
    }
    get installerPath() {
      var l, a;
      return (a = (l = super.installerPath) === null || l === void 0 ? void 0 : l.replace(/ /g, "\\ ")) !== null && a !== void 0 ? a : null;
    }
    doInstall(l) {
      const a = this.wrapSudo(), d = /pkexec/i.test(a) ? "" : '"', r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const s = ["pacman", "-U", "--noconfirm", r];
      return this.spawnSyncLog(a, [`${d}/bin/bash`, "-c", `'${s.join(" ")}'${d}`]), l.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return fr.PacmanUpdater = c, fr;
}
var dr = {}, yl;
function El() {
  if (yl) return dr;
  yl = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.RpmUpdater = void 0;
  const t = Gt(), u = Ot(), h = Xe();
  let c = class extends t.BaseUpdater {
    constructor(l, a) {
      super(l, a);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const a = l.updateInfoAndProvider.provider, d = (0, h.findFile)(a.resolveFiles(l.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: d,
        downloadUpdateOptions: l,
        task: async (r, s) => {
          this.listenerCount(u.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (n) => this.emit(u.DOWNLOAD_PROGRESS, n)), await this.httpExecutor.download(d.url, r, s);
        }
      });
    }
    get installerPath() {
      var l, a;
      return (a = (l = super.installerPath) === null || l === void 0 ? void 0 : l.replace(/ /g, "\\ ")) !== null && a !== void 0 ? a : null;
    }
    doInstall(l) {
      const a = this.wrapSudo(), d = /pkexec/i.test(a) ? "" : '"', r = this.spawnSyncLog("which zypper"), s = this.installerPath;
      if (s == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      let n;
      return r ? n = [r, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", s] : n = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", s], this.spawnSyncLog(a, [`${d}/bin/bash`, "-c", `'${n.join(" ")}'${d}`]), l.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return dr.RpmUpdater = c, dr;
}
var hr = {}, wl;
function _l() {
  if (wl) return hr;
  wl = 1, Object.defineProperty(hr, "__esModule", { value: !0 }), hr.MacUpdater = void 0;
  const t = $e(), u = /* @__PURE__ */ mt(), h = pt, c = Oe, f = cc, l = da(), a = Xe(), d = Mr, r = vr;
  let s = class extends l.AppUpdater {
    constructor(o, i) {
      super(o, i), this.nativeUpdater = Ct.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (m) => {
        this._logger.warn(m), this.emit("error", m);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(o) {
      this._logger.debug != null && this._logger.debug(o);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((o) => {
        o && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(o) {
      let i = o.updateInfoAndProvider.provider.resolveFiles(o.updateInfoAndProvider.info);
      const m = this._logger, v = "sysctl.proc_translated";
      let E = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), E = (0, d.execFileSync)("sysctl", [v], { encoding: "utf8" }).includes(`${v}: 1`), m.info(`Checked for macOS Rosetta environment (isRosetta=${E})`);
      } catch (M) {
        m.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${M}`);
      }
      let p = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const b = (0, d.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        m.info(`Checked 'uname -a': arm64=${b}`), p = p || b;
      } catch (M) {
        m.warn(`uname shell command to check for arm64 failed: ${M}`);
      }
      p = p || process.arch === "arm64" || E;
      const S = (M) => {
        var b;
        return M.url.pathname.includes("arm64") || ((b = M.info.url) === null || b === void 0 ? void 0 : b.includes("arm64"));
      };
      p && i.some(S) ? i = i.filter((M) => p === S(M)) : i = i.filter((M) => !S(M));
      const R = (0, a.findFile)(i, "zip", ["pkg", "dmg"]);
      if (R == null)
        throw (0, t.newError)(`ZIP file not provided: ${(0, t.safeStringifyJson)(i)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const D = o.updateInfoAndProvider.provider, P = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: R,
        downloadUpdateOptions: o,
        task: async (M, b) => {
          const _ = c.join(this.downloadedUpdateHelper.cacheDir, P), T = () => (0, u.pathExistsSync)(_) ? !o.disableDifferentialDownload : (m.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let y = !0;
          T() && (y = await this.differentialDownloadInstaller(R, o, M, D, P)), y && await this.httpExecutor.download(R.url, M, b);
        },
        done: async (M) => {
          if (!o.disableDifferentialDownload)
            try {
              const b = c.join(this.downloadedUpdateHelper.cacheDir, P);
              await (0, u.copyFile)(M.downloadedFile, b);
            } catch (b) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${b.message}`);
            }
          return this.updateDownloaded(R, M);
        }
      });
    }
    async updateDownloaded(o, i) {
      var m;
      const v = i.downloadedFile, E = (m = o.info.size) !== null && m !== void 0 ? m : (await (0, u.stat)(v)).size, p = this._logger, S = `fileToProxy=${o.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${S})`), this.server = (0, f.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${S})`), this.server.on("close", () => {
        p.info(`Proxy server for native Squirrel.Mac is closed (${S})`);
      });
      const R = (D) => {
        const P = D.address();
        return typeof P == "string" ? P : `http://127.0.0.1:${P == null ? void 0 : P.port}`;
      };
      return await new Promise((D, P) => {
        const M = (0, r.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), b = Buffer.from(`autoupdater:${M}`, "ascii"), _ = `/${(0, r.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (T, y) => {
          const k = T.url;
          if (p.info(`${k} requested`), k === "/") {
            if (!T.headers.authorization || T.headers.authorization.indexOf("Basic ") === -1) {
              y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), p.warn("No authenthication info");
              return;
            }
            const q = T.headers.authorization.split(" ")[1], I = Buffer.from(q, "base64").toString("ascii"), [F, j] = I.split(":");
            if (F !== "autoupdater" || j !== M) {
              y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), p.warn("Invalid authenthication credentials");
              return;
            }
            const O = Buffer.from(`{ "url": "${R(this.server)}${_}" }`);
            y.writeHead(200, { "Content-Type": "application/json", "Content-Length": O.length }), y.end(O);
            return;
          }
          if (!k.startsWith(_)) {
            p.warn(`${k} requested, but not supported`), y.writeHead(404), y.end();
            return;
          }
          p.info(`${_} requested by Squirrel.Mac, pipe ${v}`);
          let L = !1;
          y.on("finish", () => {
            L || (this.nativeUpdater.removeListener("error", P), D([]));
          });
          const $ = (0, h.createReadStream)(v);
          $.on("error", (q) => {
            try {
              y.end();
            } catch (I) {
              p.warn(`cannot end response: ${I}`);
            }
            L = !0, this.nativeUpdater.removeListener("error", P), P(new Error(`Cannot pipe "${v}": ${q}`));
          }), y.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": E
          }), $.pipe(y);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${S})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${R(this.server)}, ${S})`), this.nativeUpdater.setFeedURL({
            url: R(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${b.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(i), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", P), this.nativeUpdater.checkForUpdates()) : D([]);
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
  return hr.MacUpdater = s, hr;
}
var pr = {}, qr = {}, Sl;
function Lf() {
  if (Sl) return qr;
  Sl = 1, Object.defineProperty(qr, "__esModule", { value: !0 }), qr.verifySignature = f;
  const t = $e(), u = Mr, h = Br, c = Oe;
  function f(r, s, n) {
    return new Promise((o, i) => {
      const m = s.replace(/'/g, "''");
      n.info(`Verifying signature ${m}`), (0, u.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${m}' | ConvertTo-Json -Compress"`], {
        shell: !0,
        timeout: 20 * 1e3
      }, (v, E, p) => {
        var S;
        try {
          if (v != null || p) {
            a(n, v, p, i), o(null);
            return;
          }
          const R = l(E);
          if (R.Status === 0) {
            try {
              const b = c.normalize(R.Path), _ = c.normalize(s);
              if (n.info(`LiteralPath: ${b}. Update Path: ${_}`), b !== _) {
                a(n, new Error(`LiteralPath of ${b} is different than ${_}`), p, i), o(null);
                return;
              }
            } catch (b) {
              n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(S = b.message) !== null && S !== void 0 ? S : b.stack}`);
            }
            const P = (0, t.parseDn)(R.SignerCertificate.Subject);
            let M = !1;
            for (const b of r) {
              const _ = (0, t.parseDn)(b);
              if (_.size ? M = Array.from(_.keys()).every((y) => _.get(y) === P.get(y)) : b === P.get("CN") && (n.warn(`Signature validated using only CN ${b}. Please add your full Distinguished Name (DN) to publisherNames configuration`), M = !0), M) {
                o(null);
                return;
              }
            }
          }
          const D = `publisherNames: ${r.join(" | ")}, raw info: ` + JSON.stringify(R, (P, M) => P === "RawData" ? void 0 : M, 2);
          n.warn(`Sign verification failed, installer signed with incorrect certificate: ${D}`), o(D);
        } catch (R) {
          a(n, R, null, i), o(null);
          return;
        }
      });
    });
  }
  function l(r) {
    const s = JSON.parse(r);
    delete s.PrivateKey, delete s.IsOSBinary, delete s.SignatureType;
    const n = s.SignerCertificate;
    return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), s;
  }
  function a(r, s, n, o) {
    if (d()) {
      r.warn(`Cannot execute Get-AuthenticodeSignature: ${s || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, u.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
    } catch (i) {
      r.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    s != null && o(s), n && o(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
  }
  function d() {
    const r = h.release();
    return r.startsWith("6.") && !r.startsWith("6.3");
  }
  return qr;
}
var Tl;
function Al() {
  if (Tl) return pr;
  Tl = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.NsisUpdater = void 0;
  const t = $e(), u = Oe, h = Gt(), c = ou(), f = Ot(), l = Xe(), a = /* @__PURE__ */ mt(), d = Lf(), r = Mt;
  let s = class extends h.BaseUpdater {
    constructor(o, i) {
      super(o, i), this._verifyUpdateCodeSignature = (m, v) => (0, d.verifySignature)(m, v, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(o) {
      o && (this._verifyUpdateCodeSignature = o);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const i = o.updateInfoAndProvider.provider, m = (0, l.findFile)(i.resolveFiles(o.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: o,
        fileInfo: m,
        task: async (v, E, p, S) => {
          const R = m.packageInfo, D = R != null && p != null;
          if (D && o.disableWebInstaller)
            throw (0, t.newError)(`Unable to download new version ${o.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !D && !o.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (D || o.disableDifferentialDownload || await this.differentialDownloadInstaller(m, o, v, i, t.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(m.url, v, E);
          const P = await this.verifySignature(v);
          if (P != null)
            throw await S(), (0, t.newError)(`New version ${o.updateInfoAndProvider.info.version} is not signed by the application owner: ${P}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (D && await this.differentialDownloadWebPackage(o, R, p, i))
            try {
              await this.httpExecutor.download(new r.URL(R.path), p, {
                headers: o.requestHeaders,
                cancellationToken: o.cancellationToken,
                sha512: R.sha512
              });
            } catch (M) {
              try {
                await (0, a.unlink)(p);
              } catch {
              }
              throw M;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(o) {
      let i;
      try {
        if (i = (await this.configOnDisk.value).publisherName, i == null)
          return null;
      } catch (m) {
        if (m.code === "ENOENT")
          return null;
        throw m;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(i) ? i : [i], o);
    }
    doInstall(o) {
      const i = this.installerPath;
      if (i == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const m = ["--updated"];
      o.isSilent && m.push("/S"), o.isForceRunAfter && m.push("--force-run"), this.installDirectory && m.push(`/D=${this.installDirectory}`);
      const v = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      v != null && m.push(`--package-file=${v}`);
      const E = () => {
        this.spawnLog(u.join(process.resourcesPath, "elevate.exe"), [i].concat(m)).catch((p) => this.dispatchError(p));
      };
      return o.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), E(), !0) : (this.spawnLog(i, m).catch((p) => {
        const S = p.code;
        this._logger.info(`Cannot run installer: error code: ${S}, error message: "${p.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), S === "UNKNOWN" || S === "EACCES" ? E() : S === "ENOENT" ? Ct.shell.openPath(i).catch((R) => this.dispatchError(R)) : this.dispatchError(p);
      }), !0);
    }
    async differentialDownloadWebPackage(o, i, m, v) {
      if (i.blockMapSize == null)
        return !0;
      try {
        const E = {
          newUrl: new r.URL(i.path),
          oldFile: u.join(this.downloadedUpdateHelper.cacheDir, t.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: m,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: v.isUseMultipleRangeRequest,
          cancellationToken: o.cancellationToken
        };
        this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (E.onProgress = (p) => this.emit(f.DOWNLOAD_PROGRESS, p)), await new c.FileWithEmbeddedBlockMapDifferentialDownloader(i, this.httpExecutor, E).download();
      } catch (E) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${E.stack || E}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return pr.NsisUpdater = s, pr;
}
var Rl;
function Uf() {
  return Rl || (Rl = 1, (function(t) {
    var u = _t && _t.__createBinding || (Object.create ? (function(p, S, R, D) {
      D === void 0 && (D = R);
      var P = Object.getOwnPropertyDescriptor(S, R);
      (!P || ("get" in P ? !S.__esModule : P.writable || P.configurable)) && (P = { enumerable: !0, get: function() {
        return S[R];
      } }), Object.defineProperty(p, D, P);
    }) : (function(p, S, R, D) {
      D === void 0 && (D = R), p[D] = S[R];
    })), h = _t && _t.__exportStar || function(p, S) {
      for (var R in p) R !== "default" && !Object.prototype.hasOwnProperty.call(S, R) && u(S, p, R);
    };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.NsisUpdater = t.MacUpdater = t.RpmUpdater = t.PacmanUpdater = t.DebUpdater = t.AppImageUpdater = t.Provider = t.NoOpLogger = t.AppUpdater = t.BaseUpdater = void 0;
    const c = /* @__PURE__ */ mt(), f = Oe;
    var l = Gt();
    Object.defineProperty(t, "BaseUpdater", { enumerable: !0, get: function() {
      return l.BaseUpdater;
    } });
    var a = da();
    Object.defineProperty(t, "AppUpdater", { enumerable: !0, get: function() {
      return a.AppUpdater;
    } }), Object.defineProperty(t, "NoOpLogger", { enumerable: !0, get: function() {
      return a.NoOpLogger;
    } });
    var d = Xe();
    Object.defineProperty(t, "Provider", { enumerable: !0, get: function() {
      return d.Provider;
    } });
    var r = hl();
    Object.defineProperty(t, "AppImageUpdater", { enumerable: !0, get: function() {
      return r.AppImageUpdater;
    } });
    var s = ml();
    Object.defineProperty(t, "DebUpdater", { enumerable: !0, get: function() {
      return s.DebUpdater;
    } });
    var n = vl();
    Object.defineProperty(t, "PacmanUpdater", { enumerable: !0, get: function() {
      return n.PacmanUpdater;
    } });
    var o = El();
    Object.defineProperty(t, "RpmUpdater", { enumerable: !0, get: function() {
      return o.RpmUpdater;
    } });
    var i = _l();
    Object.defineProperty(t, "MacUpdater", { enumerable: !0, get: function() {
      return i.MacUpdater;
    } });
    var m = Al();
    Object.defineProperty(t, "NsisUpdater", { enumerable: !0, get: function() {
      return m.NsisUpdater;
    } }), h(Ot(), t);
    let v;
    function E() {
      if (process.platform === "win32")
        v = new (Al()).NsisUpdater();
      else if (process.platform === "darwin")
        v = new (_l()).MacUpdater();
      else {
        v = new (hl()).AppImageUpdater();
        try {
          const p = f.join(process.resourcesPath, "package-type");
          if (!(0, c.existsSync)(p))
            return v;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const S = (0, c.readFileSync)(p).toString().trim();
          switch (console.info("Found package-type:", S), S) {
            case "deb":
              v = new (ml()).DebUpdater();
              break;
            case "rpm":
              v = new (El()).RpmUpdater();
              break;
            case "pacman":
              v = new (vl()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (p) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", p.message);
        }
      }
      return v;
    }
    Object.defineProperty(t, "autoUpdater", {
      enumerable: !0,
      get: () => v || E()
    });
  })(_t)), _t;
}
var We = Uf();
We.autoUpdater.autoDownload = !1;
We.autoUpdater.autoInstallOnAppQuit = !0;
function kf(t) {
  const u = (h, c) => {
    t.webContents.send("update-status", { status: h, ...c });
  };
  We.autoUpdater.on("checking-for-update", () => {
    console.log("[Updater] Checking for updates..."), u("checking");
  }), We.autoUpdater.on("update-available", (h) => {
    console.log("[Updater] Update available:", h.version), u("available", {
      version: h.version,
      releaseDate: h.releaseDate,
      releaseNotes: h.releaseNotes
    });
  }), We.autoUpdater.on("update-not-available", () => {
    console.log("[Updater] No updates available"), u("not-available");
  }), We.autoUpdater.on("download-progress", (h) => {
    console.log(`[Updater] Download progress: ${Math.round(h.percent)}%`), u("downloading", {
      percent: Math.round(h.percent),
      transferred: h.transferred,
      total: h.total
    });
  }), We.autoUpdater.on("update-downloaded", (h) => {
    console.log("[Updater] Update downloaded:", h.version), u("downloaded", { version: h.version });
  }), We.autoUpdater.on("error", (h) => {
    console.error("[Updater] Error:", h.message), u("error", { message: h.message });
  }), kt.handle("check-for-updates", async () => {
    try {
      return await We.autoUpdater.checkForUpdates();
    } catch (h) {
      return console.error("[Updater] Check error:", h.message), null;
    }
  }), kt.handle("download-update", async () => {
    try {
      return await We.autoUpdater.downloadUpdate(), !0;
    } catch (h) {
      return console.error("[Updater] Download error:", h.message), !1;
    }
  }), kt.handle("install-update", () => {
    We.autoUpdater.quitAndInstall(!1, !0);
  }), kt.handle("get-app-version", () => We.autoUpdater.currentVersion.version), setTimeout(() => {
    console.log("[Updater] Initial update check..."), We.autoUpdater.checkForUpdates().catch((h) => {
      console.error("[Updater] Initial check failed:", h.message);
    });
  }, 5e3);
}
const su = bt.dirname(nc(import.meta.url));
process.env.DIST = bt.join(su, "../dist");
process.env.VITE_PUBLIC = qt.isPackaged ? process.env.DIST : bt.join(process.env.DIST, "../public");
let Qe;
function lu() {
  Qe = new Ji({
    icon: bt.join(process.env.VITE_PUBLIC, "app_logo_fixed.png"),
    webPreferences: {
      preload: bt.join(su, "preload.mjs"),
      webSecurity: !1
      // Disable CORS for API requests
    }
  }), rc.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ["https://pda.wpglb.com/*"] },
    (t, u) => {
      t.requestHeaders.Referer = "https://pda.wpglb.com/unloadingScanNew", t.requestHeaders.Origin = "https://pda.wpglb.com", u({ requestHeaders: t.requestHeaders });
    }
  ), Qe.webContents.on("did-finish-load", () => {
    Qe == null || Qe.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), process.env.VITE_DEV_SERVER_URL ? Qe.loadURL(process.env.VITE_DEV_SERVER_URL) : Qe.loadFile(bt.join(process.env.DIST, "index.html"));
}
qt.on("window-all-closed", () => {
  process.platform !== "darwin" && (qt.quit(), Qe = null);
});
qt.on("activate", () => {
  Ji.getAllWindows().length === 0 && lu();
});
let Ut = null;
kt.handle("print-image", async (t, u, h = {}) => {
  if (!Qe)
    throw new Error("No window available for printing");
  try {
    (!Ut || Ut.isDestroyed()) && (Ut = new Ji({
      show: !1,
      width: 378,
      height: 567,
      webPreferences: {
        nodeIntegration: !1,
        contextIsolation: !0
      }
    }));
    const c = `<!DOCTYPE html>
<html>
<head>
<style>
  @page { margin: 0; size: 10cm 15cm; }
  * { margin: 0; padding: 0; }
  body { width: 10cm; height: 15cm; }
  img { width: 100%; height: 100%; object-fit: contain; }
</style>
</head>
<body><img src="${u}" /></body>
</html>`;
    return await Ut.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(c)}`), await new Promise((f) => setTimeout(f, 50)), new Promise((f, l) => {
      if (!Ut) return l(new Error("Print window destroyed"));
      Ut.webContents.print({
        silent: h.silent !== !1,
        printBackground: !0,
        margins: { marginType: "none" },
        pageSize: { width: 1e5, height: 15e4 }
      }, (a, d) => {
        a ? f({ success: !0 }) : l(new Error(d || "Print failed"));
      });
    });
  } catch (c) {
    throw c;
  }
});
kt.handle("print-gdi", async (t, u) => new Promise((h, c) => {
  const f = /* @__PURE__ */ new Date(), l = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")}`;
  let a;
  u.type === "exception" ? a = Mf(l, u.orderId || "UNKNOWN") : a = qf(
    l,
    u.routeName || "N/A",
    u.stackNumber || 0,
    u.trackingNumber || ""
  );
  const d = bt.join(sc(), `gdi_print_${Date.now()}.ps1`);
  try {
    ac(d, a, "utf-8"), ic(`powershell -ExecutionPolicy Bypass -File "${d}"`, (r, s, n) => {
      try {
        oc(d);
      } catch {
      }
      s.includes("PRINT_SUCCESS") ? h({ success: !0 }) : c(new Error(n || (r == null ? void 0 : r.message) || "GDI Print failed"));
    });
  } catch (r) {
    c(r);
  }
}));
function qf(t, u, h, c) {
  const f = c.slice(0, -4), l = c.slice(-4);
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
    
    # 1. Date (top-right)
    $dateSize = $g.MeasureString("${t}", $fontDate)
    $g.DrawString("${t}", $fontDate, $brushGray, ($pageWidth - $dateSize.Width - 15), 8)
    
    # 2. Route Name (centered in top half)
    $routeFont = $fontRouteLarge
    $routeSize = $g.MeasureString("${u}", $routeFont)
    if ($routeSize.Width -gt ($leftSection - 30)) {
        $routeFont = $fontRouteSmall
        $routeSize = $g.MeasureString("${u}", $routeFont)
    }
    $routeX = ($leftSection - $routeSize.Width) / 2
    $routeY = ($pageHeight * 0.25) - ($routeSize.Height / 2)
    $g.DrawString("${u}", $routeFont, $brushBlack, $routeX, $routeY)
    
    # 3. Tracking Number (above divider line)
    $trackingY = ($pageHeight * 0.5) - 35
    $prefixSize = $g.MeasureString("${f}", $fontTrackingNormal)
    $last4Size = $g.MeasureString("${l}", $fontTrackingBold)
    $totalWidth = $prefixSize.Width + $last4Size.Width
    $trackingX = ($leftSection - $totalWidth) / 2
    
    # Draw prefix (normal)
    $g.DrawString("${f}", $fontTrackingNormal, $brushGray, $trackingX, $trackingY)
    # Draw last 4 (bold, larger)
    $g.DrawString("${l}", $fontTrackingBold, $brushBlack, ($trackingX + $prefixSize.Width), ($trackingY - 2))
    
    # 4. Divider line (full width)
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Black, 2)
    $g.DrawLine($pen, 8, ($pageHeight * 0.5), ($pageWidth - 8), ($pageHeight * 0.5))
    
    # 5. Stack Number (centered in bottom half)
    $stackText = "${h}"
    $stackSize = $g.MeasureString($stackText, $fontStack)
    $stackX = ($leftSection - $stackSize.Width) / 2
    $stackY = ($pageHeight * 0.75) - ($stackSize.Height / 2)
    $g.DrawString($stackText, $fontStack, $brushBlack, $stackX, $stackY)
    
    # 6. Notes box (dashed rectangle, bottom-right section)
    $notesBoxTop = ($pageHeight * 0.5) + 15
    $notesBoxHeight = ($pageHeight * 0.5) - 50
    $dashPen = New-Object System.Drawing.Pen([System.Drawing.Color]::Gray, 1)
    $dashPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $g.DrawRectangle($dashPen, $rightStart, $notesBoxTop, $rightWidth, $notesBoxHeight)
    
    # 7. "NOTES" label
    $notesLabelSize = $g.MeasureString("NOTES", $fontNotes)
    $g.DrawString("NOTES", $fontNotes, $brushGray, ($rightStart + ($rightWidth - $notesLabelSize.Width) / 2), ($pageHeight - 20))
    
    $e.HasMorePages = $false
})

$doc.Print()
Write-Host "PRINT_SUCCESS"
`;
}
function Mf(t, u) {
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
    $dateSize = $g.MeasureString("${t}", $fontDate)
    $g.DrawString("${t}", $fontDate, $brushGray, ($pageWidth - $dateSize.Width - 15), 8)
    
    # "EXCEPTION" label
    $excSize = $g.MeasureString("EXCEPTION", $fontException)
    $g.DrawString("EXCEPTION", $fontException, $brushRed, (($leftSection - $excSize.Width) / 2), ($pageHeight * 0.12))
    
    # Order ID
    $orderSize = $g.MeasureString("${u}", $fontOrderId)
    $orderX = ($leftSection - $orderSize.Width) / 2
    if ($orderX -lt 5) { $orderX = 5 }
    $g.DrawString("${u}", $fontOrderId, $brushBlack, $orderX, ($pageHeight * 0.32))
    
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
qt.whenReady().then(() => {
  lu(), qt.isPackaged && Qe && kf(Qe);
});
