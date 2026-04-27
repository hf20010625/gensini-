(function (global) {
  const MODES = {
    chinese: "中华版",
    original: "文献原始版",
    simplified: "简化临床版"
  };

  const BRANCHES = [
    { key: "leftMain", label: "左主干", vessel: "lm", aliases: ["左主干", "LM", "LMT"] },
    {
      key: "ladProx",
      label: "左前降支近段",
      vessel: "lad",
      root: "lad",
      segment: "prox",
      aliases: ["左前降支近段", "前降支近段", "LAD近段", "LAD proximal", "LAD prox"],
      segmentAliases: ["近段", "proximal", "prox"]
    },
    {
      key: "ladMid",
      label: "左前降支中段",
      vessel: "lad",
      root: "lad",
      segment: "mid",
      aliases: ["左前降支中段", "前降支中段", "LAD中段", "LAD middle", "LAD mid"],
      segmentAliases: ["中段", "middle", "mid"]
    },
    {
      key: "ladDistal",
      label: "左前降支远段",
      vessel: "lad",
      root: "lad",
      segment: "distal",
      aliases: ["左前降支远段", "前降支远段", "LAD远段", "LAD distal", "LAD dist", "LAD apical"],
      segmentAliases: ["远段", "末段", "apical", "distal", "dist"]
    },
    { key: "d1", label: "第一对角支", vessel: "d1", aliases: ["第一对角支", "第一对角枝", "D1", "Diag1", "对角支1"] },
    { key: "d2", label: "第二对角支", vessel: "d2", aliases: ["第二对角支", "第二对角枝", "D2", "Diag2", "对角支2"] },
    {
      key: "lcxProx",
      label: "左回旋支近段",
      vessel: "lcx",
      root: "lcx",
      segment: "prox",
      aliases: ["左回旋支近段", "回旋支近段", "LCX近段", "LCX proximal", "LCX prox"],
      segmentAliases: ["近段", "proximal", "prox"]
    },
    {
      key: "lcxMid",
      label: "左回旋支中段",
      vessel: "lcx",
      root: "lcx",
      segment: "mid",
      aliases: ["左回旋支中段", "回旋支中段", "LCX中段", "LCX middle", "LCX mid"],
      segmentAliases: ["中段", "middle", "mid"]
    },
    {
      key: "lcxDistal",
      label: "左回旋支远段",
      vessel: "lcx",
      root: "lcx",
      segment: "distal",
      aliases: ["左回旋支远段", "回旋支远段", "LCX远段", "LCX distal", "LCX dist"],
      segmentAliases: ["远段", "末段", "distal", "dist"]
    },
    { key: "om1", label: "OM1", vessel: "om", aliases: ["OM1", "OM 1", "第一钝缘支", "第一钝缘枝"] },
    { key: "om2", label: "OM2", vessel: "om", aliases: ["OM2", "OM 2", "第二钝缘支", "第二钝缘枝"] },
    { key: "om3", label: "OM3", vessel: "om", aliases: ["OM3", "OM 3", "第三钝缘支", "第三钝缘枝"] },
    { key: "lcxPda", label: "左回旋支后降支", vessel: "lcx", aliases: ["左回旋支后降支", "回旋支后降支", "LCX后降支", "左后降支", "LPDA"] },
    { key: "lcxPl", label: "左回旋支后侧支", vessel: "lcx", aliases: ["左回旋支后侧支", "回旋支后侧支", "LCX后侧支", "左后侧支", "左后外侧支"] },
    {
      key: "rcaProx",
      label: "右冠状动脉近段",
      vessel: "rca",
      root: "rca",
      segment: "prox",
      aliases: ["右冠状动脉近段", "右冠近段", "RCA近段", "RCA proximal", "RCA prox"],
      segmentAliases: ["近段", "proximal", "prox"]
    },
    {
      key: "rcaMid",
      label: "右冠状动脉中段",
      vessel: "rca",
      root: "rca",
      segment: "mid",
      aliases: ["右冠状动脉中段", "右冠中段", "RCA中段", "RCA middle", "RCA mid"],
      segmentAliases: ["中段", "middle", "mid"]
    },
    {
      key: "rcaDistal",
      label: "右冠状动脉远段",
      vessel: "rca",
      root: "rca",
      segment: "distal",
      aliases: ["右冠状动脉远段", "右冠远段", "RCA远段", "RCA distal", "RCA dist"],
      segmentAliases: ["远段", "末段", "distal", "dist"]
    },
    { key: "rcaPda", label: "右冠状动脉后降支", vessel: "rca", aliases: ["右冠状动脉后降支", "右冠后降支", "RCA后降支", "右后降支", "RPDA"] },
    { key: "rcaPl", label: "右冠状动脉后侧支", vessel: "rca", aliases: ["右冠状动脉后侧支", "右冠后侧支", "RCA后侧支", "右后侧支", "右后外侧支"] }
  ];

  const BRANCH_LOOKUP = Object.fromEntries(BRANCHES.map((branch) => [branch.key, branch]));

  const ROOT_ALIASES = {
    lad: ["左前降支", "前降支", "LAD"],
    lcx: ["左回旋支", "回旋支", "LCX"],
    rca: ["右冠状动脉", "右冠", "RCA"],
    lm: ["左主干", "LM", "LMT"]
  };

  const COLLATERAL_VESSELS = [
    { root: "lad", aliases: ["左前降支", "前降支", "LAD"] },
    { root: "lcx", aliases: ["左回旋支", "回旋支", "LCX"] },
    { root: "rca", aliases: ["右冠状动脉", "右冠", "RCA"] },
    { root: "lm", aliases: ["左主干", "LM", "LMT"] }
  ];

  const MANUAL_TEMPLATE = `患者姓名：
住院号：
造影日期：
计算模式：中华版
优势型：右
侧枝循环：

冠脉造影记录原文：

Gensini计分录入区：
左主干：
左前降支近段：
左前降支中段：
左前降支远段：
第一对角支：
第二对角支：
左回旋支近段：
左回旋支中段：
左回旋支远段：
OM1：
OM2：
OM3：
左回旋支后降支：
左回旋支后侧支：
右冠状动脉近段：
右冠状动脉中段：
右冠状动脉远段：
右冠状动脉后降支：
右冠状动脉后侧支：
备注：`;

  function fullwidthToHalfwidth(text) {
    return String(text || "").replace(/[\u3000\uFF01-\uFF5E]/g, (char) => {
      const code = char.charCodeAt(0);
      if (code === 0x3000) {
        return " ";
      }
      return String.fromCharCode(code - 0xfee0);
    });
  }

  function normalizeLineBreaks(text) {
    return fullwidthToHalfwidth(text)
      .replace(/\r/g, "")
      .replace(/[：]/g, ":")
      .replace(/[，]/g, ",")
      .replace(/[；]/g, ";")
      .replace(/[。]/g, ".")
      .replace(/[（]/g, "(")
      .replace(/[）]/g, ")")
      .replace(/[％]/g, "%");
  }

  function normalizeText(text) {
    return normalizeLineBreaks(text)
      .replace(/[ \t]+/g, " ")
      .trim();
  }

  function splitClauses(text) {
    return normalizeText(text)
      .split(/[.,;,\n]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function includesAlias(text, aliases) {
    const lower = text.toLowerCase();
    return aliases.some((alias) => lower.includes(alias.toLowerCase()));
  }

  function baseScoreFromPercent(percent, mode) {
    if (percent == null || Number.isNaN(percent) || percent <= 0) return 0;

    if (mode === "simplified") {
      if (percent < 25) return 1;
      if (percent < 50) return 2;
      if (percent < 75) return 4;
      if (percent < 90) return 8;
      if (percent < 99) return 16;
      return 32;
    }

    if (percent <= 25) return 1;
    if (percent <= 50) return 2;
    if (percent <= 75) return 4;
    if (percent <= 90) return 8;
    if (percent < 100) return 16;
    return 32;
  }

  function roundScore(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  function extractPercent(fragment) {
    if (!fragment) return null;

    const text = normalizeText(fragment);

    const rangePercents = [...text.matchAll(/(\d{1,3}(?:\.\d+)?)\s*%\s*[-~～至]\s*(\d{1,3}(?:\.\d+)?)\s*%/g)]
      .map((match) => Math.max(Number(match[1]), Number(match[2])));
    if (rangePercents.length > 0) {
      return Math.max(...rangePercents);
    }

    const singlePercents = [...text.matchAll(/(\d{1,3}(?:\.\d+)?)\s*%/g)]
      .map((match) => Number(match[1]));
    if (singlePercents.length > 0) {
      return Math.max(...singlePercents);
    }

    const bareRanges = [...text.matchAll(/(\d{1,3}(?:\.\d+)?)\s*[-~～至]\s*(\d{1,3}(?:\.\d+)?)/g)]
      .map((match) => Math.max(Number(match[1]), Number(match[2])));
    if (bareRanges.length > 0) {
      return Math.max(...bareRanges);
    }

    if (/次全闭塞/.test(text)) {
      return 99;
    }

    if (/(完全性闭塞|完全闭塞|闭塞|阻塞)/.test(text)) {
      return 100;
    }

    if (/(未见明显狭窄|未见狭窄|无明显狭窄|未见异常|通畅)/.test(text)) {
      return 0;
    }

    return null;
  }

  function defaultBranchResult() {
    return {
      percent: null,
      snippet: "",
      status: "empty",
      message: "未提及"
    };
  }

  function chooseMessage(parts) {
    return parts.filter(Boolean).join("；");
  }

  function mergeBranchResult(current, update) {
    if (update.percent == null) {
      if (current.percent != null || current.status === "warning") {
        return current;
      }
      return update;
    }

    if (current.percent == null) {
      return update;
    }

    if (update.percent > current.percent) {
      return update;
    }

    if (update.percent === current.percent && current.status !== "ok" && update.status === "ok") {
      return update;
    }

    return current;
  }

  function branchUpdateFromClause(branch, clause, options) {
    const text = normalizeText(clause);
    const percent = extractPercent(text);
    const notes = options && options.notes ? options.notes.slice() : [];

    if (/肌桥/.test(text)) {
      return {
        percent: null,
        snippet: text,
        status: "warning",
        message: chooseMessage(["识别到肌桥描述，默认不作为固定狭窄自动计分", ...notes])
      };
    }

    if (percent === 0) {
      return {
        percent: 0,
        snippet: text,
        status: "ok",
        message: chooseMessage(["识别为未见明显狭窄", ...notes])
      };
    }

    if (percent == null) {
      return {
        percent: null,
        snippet: text,
        status: "warning",
        message: chooseMessage(["提及该分支，但未识别到明确狭窄百分比或闭塞描述", ...notes])
      };
    }

    return {
      percent,
      snippet: text,
      status: notes.length > 0 ? "warning" : "ok",
      message: chooseMessage([`自动识别到最重狭窄 ${percent}%`, ...notes])
    };
  }

  function detectRoot(clause) {
    for (const [root, aliases] of Object.entries(ROOT_ALIASES)) {
      if (includesAlias(clause, aliases)) {
        return root;
      }
    }
    return null;
  }

  function findDirectBranches(clause) {
    return BRANCHES.filter((branch) => includesAlias(clause, branch.aliases))
      .sort((a, b) => b.label.length - a.label.length);
  }

  function findSegmentBranches(root, clause) {
    if (!root || root === "lm") {
      return [];
    }

    const lower = clause.toLowerCase();
    const branches = BRANCHES.filter((branch) => branch.root === root && branch.segmentAliases);
    const hits = [];

    const branchBySegment = Object.fromEntries(branches.map((branch) => [branch.segment, branch]));

    if (/近中段/.test(lower) || /prox.*mid|mid.*prox/.test(lower) || /近段及中段|中段及近段/.test(lower)) {
      hits.push(branchBySegment.prox, branchBySegment.mid);
    }
    if (/中远段/.test(lower) || /mid.*dist|dist.*mid/.test(lower) || /中段及远段|远段及中段/.test(lower)) {
      hits.push(branchBySegment.mid, branchBySegment.distal);
    }
    if (/近远段/.test(lower) || /prox.*dist|dist.*prox/.test(lower) || /近段及远段|远段及近段/.test(lower)) {
      hits.push(branchBySegment.prox, branchBySegment.distal);
    }

    for (const branch of branches) {
      if (includesAlias(lower, branch.segmentAliases)) {
        hits.push(branch);
      }
    }

    const unique = [];
    const seen = new Set();
    for (const branch of hits) {
      if (branch && !seen.has(branch.key)) {
        seen.add(branch.key);
        unique.push(branch);
      }
    }
    return unique;
  }

  function parseTemplateLines(text) {
    const results = {};
    const branchMap = new Map(BRANCHES.map((branch) => [branch.label, branch]));
    const lines = normalizeLineBreaks(text).split(/\n+/);

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || !line.includes(":")) continue;

      const parts = line.split(":");
      const name = parts.shift().trim();
      const value = parts.join(":").trim();
      const branch = branchMap.get(name);
      if (!branch || !value) continue;

      const percent = extractPercent(value);
      results[branch.key] = {
        percent,
        snippet: value,
        status: percent == null ? "warning" : "ok",
        message: percent == null ? "模板行存在，但未识别到明确百分比或闭塞描述" : `模板行识别 ${percent}%`
      };
    }

    return results;
  }

  function parseFreeText(text) {
    const clauses = splitClauses(text);
    const results = Object.fromEntries(BRANCHES.map((branch) => [branch.key, defaultBranchResult()]));
    let currentRoot = null;
    let pendingContext = null;

    function clauseHasActionableInfo(clause) {
      return extractPercent(clause) != null || /肌桥|闭塞|阻塞|未见明显狭窄|无明显狭窄|通畅/.test(clause);
    }

    for (const clause of clauses) {
      const directBranches = findDirectBranches(clause);
      const detectedRoot = detectRoot(clause);
      const activeRoot = detectedRoot || currentRoot;

      if (directBranches.length > 0) {
        const branch = directBranches[0];
        if (clauseHasActionableInfo(clause)) {
          results[branch.key] = mergeBranchResult(results[branch.key], branchUpdateFromClause(branch, clause));
          pendingContext = {
            branches: [branch],
            text: clause,
            notes: []
          };
        } else {
          pendingContext = {
            branches: [branch],
            text: clause,
            notes: []
          };
        }
      } else {
        const segmentBranches = findSegmentBranches(activeRoot, clause);
        if (segmentBranches.length > 0) {
          const notes = segmentBranches.length > 1 ? ["该描述涉及联合段位，系统按每个提及段位分别填入，请人工复核"] : [];
          if (clauseHasActionableInfo(clause)) {
            for (const branch of segmentBranches) {
              results[branch.key] = mergeBranchResult(results[branch.key], branchUpdateFromClause(branch, clause, { notes }));
            }
          }
          pendingContext = {
            branches: segmentBranches,
            text: clause,
            notes
          };
        } else if (activeRoot === "lcx" && /后侧支|后外侧支|\bPL\b|\bPLB\b/i.test(clause)) {
          results.lcxPl = mergeBranchResult(results.lcxPl, branchUpdateFromClause(BRANCH_LOOKUP.lcxPl, clause));
          pendingContext = {
            branches: [BRANCH_LOOKUP.lcxPl],
            text: clause,
            notes: []
          };
        } else if (activeRoot === "rca" && /后侧支|后外侧支|\bPL\b|\bPLB\b/i.test(clause)) {
          results.rcaPl = mergeBranchResult(results.rcaPl, branchUpdateFromClause(BRANCH_LOOKUP.rcaPl, clause));
          pendingContext = {
            branches: [BRANCH_LOOKUP.rcaPl],
            text: clause,
            notes: []
          };
        } else if (pendingContext && clauseHasActionableInfo(clause)) {
          const combinedClause = `${pendingContext.text} ${clause}`.trim();
          const notes = pendingContext.notes.concat("该结果根据前序段位上下文自动关联，请人工复核");
          for (const branch of pendingContext.branches) {
            results[branch.key] = mergeBranchResult(results[branch.key], branchUpdateFromClause(branch, combinedClause, { notes }));
          }
          pendingContext = null;
        }
      }

      if (detectedRoot) {
        currentRoot = detectedRoot;
      }
    }

    return results;
  }

  function parseDominance(text) {
    const normalized = normalizeLineBreaks(text);
    const match = normalized.match(/优势型\s*:\s*([^\n.;]+)/i);
    const value = match ? match[1].trim() : "";
    if (!value) {
      return { value: "unknown", label: "未识别" };
    }
    if (/左/.test(value) && !/右/.test(value)) {
      return { value: "left", label: "左优势" };
    }
    if (/右/.test(value)) {
      return { value: "right", label: "右优势" };
    }
    return { value: "unknown", label: value };
  }

  function mapCollateralVessel(text) {
    for (const vessel of COLLATERAL_VESSELS) {
      if (includesAlias(text, vessel.aliases)) {
        return vessel.root;
      }
    }
    return null;
  }

  function parseCollateralInfo(text) {
    const normalized = normalizeLineBreaks(text);
    const match = normalized.match(/侧枝循环\s*:\s*([^\n]+)/i);
    const raw = match ? match[1].trim() : "";

    if (!raw || /无|未见/.test(raw)) {
      return { raw, collaterals: [] };
    }

    const pairs = [];
    const regex = /([A-Za-z一-龥]+?)\s*(?:至|->|→|供)\s*([A-Za-z一-龥]+)/g;
    let current;
    while ((current = regex.exec(raw)) !== null) {
      const sourceRoot = mapCollateralVessel(current[1]);
      const recipientRoot = mapCollateralVessel(current[2]);
      if (sourceRoot && recipientRoot) {
        pairs.push({
          sourceRoot,
          recipientRoot,
          raw: `${current[1]}→${current[2]}`
        });
      }
    }

    return {
      raw,
      collaterals: pairs
    };
  }

  function resolveDominance(text, dominanceOverride) {
    if (dominanceOverride === "left") return { value: "left", label: "左优势（手动指定）" };
    if (dominanceOverride === "right") return { value: "right", label: "右优势（手动指定）" };
    return parseDominance(text);
  }

  function coefficientForBranch(branch, mode, dominance) {
    if (mode === "chinese") {
      const chinese = {
        leftMain: 5,
        ladProx: 2.5,
        ladMid: 1.5,
        ladDistal: 1,
        d1: 1,
        d2: 0.5,
        lcxProx: 2.5,
        lcxMid: 1,
        lcxDistal: 1,
        om1: 1,
        om2: 1,
        om3: 1,
        lcxPda: 1,
        lcxPl: 0.5,
        rcaProx: 1,
        rcaMid: 1,
        rcaDistal: 1,
        rcaPda: 1,
        rcaPl: 0.5
      };
      return Object.prototype.hasOwnProperty.call(chinese, branch.key) ? chinese[branch.key] : null;
    }

    if (mode === "simplified") {
      const simplified = {
        leftMain: 5,
        ladProx: 2.5,
        ladMid: 1.5,
        ladDistal: 1,
        d1: 1,
        d2: 0.5,
        lcxProx: 2.5,
        lcxDistal: 1,
        lcxPda: 1,
        lcxPl: 0.5,
        rcaProx: 1,
        rcaMid: 1,
        rcaDistal: 1,
        rcaPda: 1,
        rcaPl: 0.5
      };
      return Object.prototype.hasOwnProperty.call(simplified, branch.key) ? simplified[branch.key] : null;
    }

    if (mode === "original") {
      const isLeft = dominance === "left";
      const original = {
        leftMain: 5,
        ladProx: 2.5,
        ladMid: 1.5,
        ladDistal: 1,
        d1: 1,
        d2: 0.5,
        lcxProx: isLeft ? 3.5 : 2.5,
        lcxMid: isLeft ? 2 : 1,
        lcxDistal: isLeft ? 2 : 1,
        om1: 1,
        om2: 1,
        om3: 1,
        lcxPda: 1,
        lcxPl: 0.5,
        rcaProx: 1,
        rcaMid: 1,
        rcaDistal: 1,
        rcaPda: 1,
        rcaPl: 0.5
      };
      return Object.prototype.hasOwnProperty.call(original, branch.key) ? original[branch.key] : null;
    }

    return null;
  }

  function getBranchPercentMap(branchStates) {
    return Object.fromEntries(branchStates.map((branch) => [branch.key, branch.percent]));
  }

  function sourceRootsForRecipient(root, collaterals) {
    return collaterals.filter((item) => item.recipientRoot === root).map((item) => item.sourceRoot);
  }

  function sourceVesselMaxPercent(sourceRoot, percentMap) {
    const sourceKeys = BRANCHES.filter((branch) => {
      if (sourceRoot === "lad") return ["ladProx", "ladMid", "ladDistal"].includes(branch.key);
      if (sourceRoot === "lcx") return ["lcxProx", "lcxMid", "lcxDistal"].includes(branch.key);
      if (sourceRoot === "rca") return ["rcaProx", "rcaMid", "rcaDistal"].includes(branch.key);
      if (sourceRoot === "lm") return branch.key === "leftMain";
      return false;
    }).map((branch) => percentMap[branch.key]).filter((value) => value != null);

    if (sourceKeys.length === 0) return null;
    return Math.max(...sourceKeys);
  }

  function collateralReductionForSourcePercent(percent) {
    if (percent == null) return null;
    if (percent <= 0 || percent < 25) return 16;
    if (percent < 50) return 12;
    if (percent < 75) return 8;
    if (percent < 90) return 4;
    if (percent < 99) return 2;
    return 1;
  }

  function scoreBranchPercents(branchPercents, options) {
    const mode = options.mode || "original";
    const metadata = options.metadata || {};
    const dominance = metadata.dominance || "unknown";
    const collaterals = metadata.collaterals || [];
    const totalBranchStates = BRANCHES.map((branch) => ({ key: branch.key, percent: branchPercents[branch.key] ?? null }));
    const percentMap = getBranchPercentMap(totalBranchStates);

    const scoredBranches = BRANCHES.map((branch) => {
      const percent = percentMap[branch.key];
      const coefficient = coefficientForBranch(branch, mode, dominance);
      const baseScore = baseScoreFromPercent(percent, mode);
      let collateralAdjustment = 0;
      let adjustedSeverityScore = baseScore;
      let scoreNote = "";

      const collateralRoot = branch.vessel === "om" || branch.key === "lcxPda" || branch.key === "lcxPl" ? "lcx" : branch.vessel;
      const sourceRoots = sourceRootsForRecipient(collateralRoot, collaterals);

      if (mode === "original" && percent != null && percent >= 99 && sourceRoots.length > 0) {
        if (percent >= 99 && percent < 100) {
          collateralAdjustment = -8;
          adjustedSeverityScore = Math.max(0, baseScore + collateralAdjustment);
          scoreNote = "99%病变且接受侧支，按文献原始版减8分";
        } else if (percent >= 100) {
          const reductions = sourceRoots
            .map((root) => collateralReductionForSourcePercent(sourceVesselMaxPercent(root, percentMap)))
            .filter((value) => value != null);
          if (reductions.length > 0) {
            const reduction = Math.max(...reductions);
            collateralAdjustment = -reduction;
            adjustedSeverityScore = Math.max(0, baseScore + collateralAdjustment);
            scoreNote = `100%闭塞且接受侧支，按供体血管情况减 ${reduction} 分`;
          } else {
            scoreNote = "检测到侧支循环，但供体血管狭窄程度未明确，未自动做原始版侧支校正";
          }
        }
      }

      let weightedScore = 0;
      let coefficientMessage = "";
      if (coefficient == null) {
        coefficientMessage = mode === "simplified" ? "该分支在简化版规则中未定义系数，未自动计分" : "该分支当前未定义系数";
      } else {
        weightedScore = roundScore(adjustedSeverityScore * coefficient);
      }

      return {
        key: branch.key,
        coefficient,
        baseScore,
        collateralAdjustment,
        adjustedSeverityScore,
        weightedScore,
        scoreNote: chooseMessage([scoreNote, coefficientMessage])
      };
    });

    const totalScore = roundScore(scoredBranches.reduce((sum, branch) => sum + branch.weightedScore, 0));
    const scoredCount = scoredBranches.filter((branch) => branch.weightedScore > 0).length;

    return {
      branches: scoredBranches,
      totalScore,
      scoredCount
    };
  }

  function analyzeRecord(text, options) {
    const normalized = normalizeText(text);
    const mode = options && options.mode ? options.mode : "original";
    const dominanceInfo = resolveDominance(text, options && options.dominanceOverride ? options.dominanceOverride : "auto");
    const collateralInfo = parseCollateralInfo(text);
    const metadata = {
      mode,
      modeLabel: MODES[mode] || mode,
      dominance: dominanceInfo.value,
      dominanceLabel: dominanceInfo.label,
      collateralRaw: collateralInfo.raw || "未识别",
      collaterals: collateralInfo.collaterals
    };

    const freeTextResults = parseFreeText(normalized);
    const templateOverrides = parseTemplateLines(text);

    const branchStates = BRANCHES.map((branch) => ({
      ...branch,
      ...(templateOverrides[branch.key] || freeTextResults[branch.key])
    }));

    const percentMap = Object.fromEntries(branchStates.map((branch) => [branch.key, branch.percent]));
    const scoreResults = scoreBranchPercents(percentMap, { mode, metadata });
    const scoreMap = Object.fromEntries(scoreResults.branches.map((branch) => [branch.key, branch]));

    const branches = branchStates.map((branch) => {
      const score = scoreMap[branch.key];
      const message = chooseMessage([branch.message, score.scoreNote]);
      const status = branch.percent != null && score.coefficient == null ? "warning" : branch.status;
      return {
        ...branch,
        coefficient: score.coefficient,
        baseScore: score.baseScore,
        collateralAdjustment: score.collateralAdjustment,
        adjustedSeverityScore: score.adjustedSeverityScore,
        score: score.weightedScore,
        status,
        message
      };
    });

    const warnings = branches.filter((branch) => branch.status === "warning");
    const messages = [];

    if (!normalized) {
      messages.push("当前未输入任何造影记录内容。");
    } else {
      messages.push(`当前计算模式：${metadata.modeLabel}。`);
      messages.push(`识别到的优势型：${metadata.dominanceLabel}。`);
      if (metadata.collaterals.length > 0) {
        messages.push(`识别到侧枝循环：${metadata.collaterals.map((item) => item.raw).join("，")}。`);
      } else if (metadata.collateralRaw && metadata.collateralRaw !== "未识别") {
        messages.push(`侧枝循环原文：${metadata.collateralRaw}。`);
      } else {
        messages.push("未识别到可用于原始版校正的侧枝循环路径。");
      }
      messages.push("系统优先使用模板行中的明确记录，其次按短句顺序解析原始手术记录。");
      messages.push("肌桥、斑块浸润、内膜不规则等非固定狭窄描述默认不直接换算为 Gensini 分数。");
      if (mode === "chinese") {
        messages.push("中华版按你提供的中文规则计算，不考虑冠脉优势，也不做侧支循环校正。");
      }
      if (mode === "simplified") {
        messages.push("简化版沿用你最初提供的分支系数；LCX中段和OM分支在该模式下仅记录，不自动计分。");
      }
      if (warnings.length > 0) {
        messages.push(`共有 ${warnings.length} 个项目需要人工复核。`);
      }
    }

    return {
      metadata,
      branches,
      totalScore: scoreResults.totalScore,
      scoredCount: scoreResults.scoredCount,
      warningCount: warnings.length,
      messages
    };
  }

  global.Gensini = {
    MODES,
    BRANCHES,
    BRANCH_LOOKUP,
    MANUAL_TEMPLATE,
    analyzeRecord,
    baseScoreFromPercent,
    scoreBranchPercents
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = global.Gensini;
  }
})(typeof window !== "undefined" ? window : globalThis);
