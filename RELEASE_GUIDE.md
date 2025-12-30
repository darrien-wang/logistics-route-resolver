# 发布与更新指南

## 📦 首次设置

### 1. 配置 GitHub Token

在 Windows PowerShell 中运行：
```powershell
# 设置环境变量（临时，仅当前会话有效）
$env:GH_TOKEN = "your_github_personal_access_token"

# 或者永久添加到系统环境变量
[System.Environment]::SetEnvironmentVariable("GH_TOKEN", "your_token", "User")
```

如何获取 GitHub Token:
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成并复制 token

### 2. 创建应用图标

在 `public/` 文件夹中放置 `icon.ico` 文件（256x256 像素）。

可以使用在线工具将 PNG 转换为 ICO：
- https://convertio.co/png-ico/
- https://icoconvert.com/

---

## 🚀 发布新版本

### 步骤 1：更新版本号

编辑 `package.json`，修改 `version` 字段：
```json
{
  "version": "1.0.1"  // 从 1.0.0 改为 1.0.1
}
```

### 步骤 2：发布

```bash
npm run release
```

这将自动：
1. 编译 TypeScript
2. 打包前端资源
3. 构建 Windows 安装程序
4. 上传到 GitHub Releases

---

## 👥 同事安装说明

### 首次安装

1. 访问 GitHub 仓库的 Releases 页面
2. 下载最新的 `.exe` 安装文件
3. 运行安装程序（选择安装目录）
4. 启动应用

### 自动更新

应用启动后会自动检查更新：
- 如果有新版本，右下角会弹出更新提示
- 点击"下载更新"开始下载
- 下载完成后点击"立即重启"完成安装

---

## 🔧 本地测试打包

如果只想本地测试打包（不发布）：

```bash
npm run electron:build
```

打包后的文件在 `release/` 目录下。

---

## ⚠️ 注意事项

1. **版本号必须递增**：每次发布必须增加版本号，否则会覆盖现有版本
2. **代码签名**：Windows 可能会显示"未知发布者"警告，用户需要点击"仍要运行"
3. **网络要求**：自动更新需要用户能访问 GitHub
