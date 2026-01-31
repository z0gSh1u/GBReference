# GBReference

快速生成“符合《信息与文献 参考文献著录规则》（GB/T 7714-2015）规范要求”的参考文献列表

[https://zxuuu.cloud/GBReference](https://zxuuu.cloud/GBReference)

## 功能

- 新增图书、会议、期刊、学位论文、专利、报告、数据库、电子公告、计算机程序这些类型的引用
- 区分一般资源与线上资源（/OL）
- 暂存到 localStorage 以及读取
- 支持项目删除、重排序（拖拽或按钮）
- 支持一键复制

## 开发

```bash
# 安装依赖
npm install
# 编译 less 并启动开发服务器
npm run dev
```

## 技术栈

- 原生 JavaScript（保持有趣的中文变量名风格）
- Bootstrap 3.4.1（CDN）
- LESS 预处理器
