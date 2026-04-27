const { analyzeRecord } = require("./gensini.js");

const samples = [
  {
    name: "中华版边界值与OM系数",
    options: { mode: "chinese" },
    text: [
      "优势型：右",
      "OM1：50%狭窄",
      "左主干：25%狭窄",
      "左前降支中段：51%狭窄"
    ].join("\n"),
    expected: 13
  },
  {
    name: "中华版LCX中段默认按1处理",
    options: { mode: "chinese" },
    text: [
      "LCX：中段90%狭窄"
    ].join("\n"),
    expected: 8
  },
  {
    name: "中华版LCX与RCA后侧支分开计分",
    options: { mode: "chinese" },
    text: [
      "LCX：后侧支80%狭窄",
      "RCA：后侧支80%狭窄"
    ].join("\n"),
    expected: 8
  },
  {
    name: "原始版侧支校正示例",
    options: { mode: "original" },
    text: [
      "优势型：右",
      "侧枝循环：LAD至LCX，LAD至RCA",
      "LAD：近段50%狭窄",
      "LCX：近段完全性闭塞",
      "RCA：近段完全性闭塞"
    ].join("\n"),
    expected: 89
  },
  {
    name: "左优势LCX中段系数示例",
    options: { mode: "original" },
    text: [
      "优势型：左",
      "侧枝循环：无",
      "LCX：中段90%狭窄"
    ].join("\n"),
    expected: 16
  },
  {
    name: "简化版LCX中段不自动计分",
    options: { mode: "simplified" },
    text: [
      "优势型：右",
      "侧枝循环：无",
      "LCX：中段90%狭窄"
    ].join("\n"),
    expected: 0
  },
  {
    name: "联合段位自动分配",
    options: { mode: "original" },
    text: [
      "优势型：右",
      "侧枝循环：无",
      "LAD：近中段50-70%狭窄"
    ].join("\n"),
    expected: 16
  },
  {
    name: "模板录入优先生效",
    options: { mode: "original" },
    text: [
      "优势型：右",
      "左前降支近段: 90%",
      "右冠状动脉远段: 30%"
    ].join("\n"),
    expected: 22
  },
  {
    name: "简化版90%按16分计算",
    options: { mode: "simplified" },
    text: [
      "优势型：右",
      "左前降支近段: 90%"
    ].join("\n"),
    expected: 40
  },
  {
    name: "真实病历风格跨短句解析",
    options: { mode: "original" },
    text: [
      "LM：未见明显狭窄；",
      "LAD：近中段斑块浸润，60-70%狭窄，远段肌桥，收缩期压缩50%；",
      "LCX：近段斑块浸润，30%狭窄，远段斑块浸润，40%狭窄；",
      "RCA：近中段斑块浸润，70-90%狭窄，远段未见明显狭窄；",
      "侧枝循环：无",
      "优势型：左"
    ].join("\n"),
    expected: 43
  }
];

let failed = 0;

for (const sample of samples) {
  const result = analyzeRecord(sample.text, sample.options);
  if (result.totalScore !== sample.expected) {
    failed += 1;
    console.error(`${sample.name} 失败: 预期 ${sample.expected}, 实际 ${result.totalScore}`);
  } else {
    console.log(`${sample.name} 通过`);
  }
}

if (failed > 0) {
  process.exit(1);
}
