# 旅行定制计划 - 更新日志

> 本文件记录项目所有重要更新操作，每次提交时同步更新。

---

## [v0.3.0] - 2026-05-23

### 数据修正
- 修正北京→成都航班价格：从 ¥550-650 调整为 ¥860-1130（基于携程真实3.4-4.3折数据）
- 修正北京→西安高铁数据：新增G321/G351/G55/G651/G671共5趟真实车次，票价 ¥512-577.5（基于12306数据）
- 修正三亚航班淡季价格：北京→三亚 ¥480-750，上海→三亚 ¥330-450
- 修正三亚酒店淡季价格：万丽 ¥340/晚，万豪 ¥410/晚，柏悦 ¥2000/晚
- 修正成都酒店价格：经济型 ¥168-185/晚，舒适型 ¥380/晚，豪华型 ¥920-1580/晚

### 逻辑优化
- 修复美食主题餐食预算偏低问题：美食探索主题 food cost × 2.5
- 新增淡旺季价格浮动逻辑（getSeasonMultiplier）：
  - 旺季（春节/暑假/国庆）：交通×1.5，酒店×2.0
  - 特殊假期：交通×1.6-1.8，酒店×2.2-2.5
  - 淡季（6月/12月）：交通×0.7，酒店×0.7
- 新增 SeasonInfo 类型，方案页面显示季节和价格水平

### 交互优化
- Plan.tsx 新增"调整方案"区域，支持快速调整预算等级/出行节奏/住宿偏好
- 支持重新生成方案，无需返回首页

### 文档
- 新增 project-logic.md（项目逻辑说明）
- 新增 data-sources.md（信息来源记录）
- 新增 changelog.md（本文件）

---

## [v0.2.0] - 2026-05-22

### 功能
- 扩展数据模型：新增 TransportOption、HotelOption 接口
- 扩展 TransportSummary：新增 outboundOptions/returnOptions 数组
- 扩展 AccommodationSuggestion：新增 hotels 数组
- 重写 mockPlans.ts：集成6个目的地×3个出发城市的真实交通数据
- 集成6个目的地×3个预算等级的酒店推荐数据
- Plan.tsx 新增 TransportCard/HotelCard 组件展示班次和酒店详情

---

## [v0.1.0] - 2026-05-21

### 初始版本
- React 18 + TypeScript + Vite 项目搭建
- Tailwind CSS + Zustand + React Router DOM 集成
- Home.tsx：5步多步骤表单（出行信息/时间预算/旅行偏好/交通住宿/特殊需求）
- Plan.tsx：行程结果展示页（每日行程/住宿/美食/交通/费用明细）
- travelStore.ts：Zustand 状态管理
- travel.ts：核心数据模型定义
- mockPlans.ts：Mock 数据引擎与 generatePlan 函数
