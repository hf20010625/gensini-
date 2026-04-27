(function () {
  const input = document.getElementById("recordInput");
  const templateBtn = document.getElementById("templateBtn");
  const clearBtn = document.getElementById("clearBtn");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const modeSelect = document.getElementById("modeSelect");
  const dominanceSelect = document.getElementById("dominanceSelect");
  const branchTableBody = document.getElementById("branchTableBody");
  const totalScoreEl = document.getElementById("totalScore");
  const scoredCountEl = document.getElementById("scoredCount");
  const warningCountEl = document.getElementById("warningCount");
  const modeSummaryEl = document.getElementById("modeSummary");
  const dominanceSummaryEl = document.getElementById("dominanceSummary");
  const collateralSummaryEl = document.getElementById("collateralSummary");
  const messagesEl = document.getElementById("messages");

  let latestAnalysis = null;

  function statusPill(branch) {
    if (branch.status === "ok") {
      return '<span class="pill ok">已识别</span>';
    }
    if (branch.status === "warning") {
      return '<span class="pill warn">待复核</span>';
    }
    return '<span class="pill idle">未提及</span>';
  }

  function renderMessages(messages) {
    messagesEl.innerHTML = messages.map((message) => `<li>${message}</li>`).join("");
  }

  function formatNumber(value) {
    if (value == null) return "—";
    if (Number.isInteger(value)) return String(value);
    return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
  }

  function renderSummary(result) {
    totalScoreEl.textContent = formatNumber(result.totalScore);
    scoredCountEl.textContent = String(result.scoredCount);
    warningCountEl.textContent = String(result.warningCount);
    modeSummaryEl.textContent = result.metadata.modeLabel;
    dominanceSummaryEl.textContent = result.metadata.dominanceLabel;
    collateralSummaryEl.textContent = result.metadata.collaterals.length > 0
      ? result.metadata.collaterals.map((item) => item.raw).join("，")
      : (result.metadata.collateralRaw || "未识别");
  }

  function renderTable(branches) {
    branchTableBody.innerHTML = branches.map((branch) => `
      <tr data-branch-key="${branch.key}">
        <td>${branch.label}</td>
        <td class="coefficient-cell">${branch.coefficient == null ? "—" : formatNumber(branch.coefficient)}</td>
        <td><small>${branch.snippet || "—"}</small></td>
        <td>
          <input
            class="stenosis-input"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value="${branch.percent ?? ""}"
          >
        </td>
        <td class="base-score">${formatNumber(branch.baseScore)}</td>
        <td class="collateral-adjustment">${formatNumber(branch.collateralAdjustment)}</td>
        <td class="adjusted-score">${formatNumber(branch.adjustedSeverityScore)}</td>
        <td class="weighted-score">${formatNumber(branch.score)}</td>
        <td>${statusPill(branch)}<br><small>${branch.message}</small></td>
      </tr>
    `).join("");

    branchTableBody.querySelectorAll(".stenosis-input").forEach((element) => {
      element.addEventListener("input", recalculateFromInputs);
    });
  }

  function currentOptions() {
    return {
      mode: modeSelect.value,
      dominanceOverride: dominanceSelect.value
    };
  }

  function recalculateFromInputs() {
    if (!latestAnalysis) return;

    const branchPercents = {};
    branchTableBody.querySelectorAll("tr[data-branch-key]").forEach((row) => {
      const key = row.dataset.branchKey;
      const inputEl = row.querySelector(".stenosis-input");
      branchPercents[key] = inputEl.value === "" ? null : Number(inputEl.value);
    });

    const rescored = Gensini.scoreBranchPercents(branchPercents, {
      mode: currentOptions().mode,
      metadata: latestAnalysis.metadata
    });

    const scoreMap = Object.fromEntries(rescored.branches.map((branch) => [branch.key, branch]));
    branchTableBody.querySelectorAll("tr[data-branch-key]").forEach((row) => {
      const branch = scoreMap[row.dataset.branchKey];
      row.querySelector(".coefficient-cell").textContent = branch.coefficient == null ? "—" : formatNumber(branch.coefficient);
      row.querySelector(".base-score").textContent = formatNumber(branch.baseScore);
      row.querySelector(".collateral-adjustment").textContent = formatNumber(branch.collateralAdjustment);
      row.querySelector(".adjusted-score").textContent = formatNumber(branch.adjustedSeverityScore);
      row.querySelector(".weighted-score").textContent = formatNumber(branch.weightedScore);
    });

    totalScoreEl.textContent = formatNumber(rescored.totalScore);
    scoredCountEl.textContent = String(rescored.scoredCount);
  }

  function runAnalysis() {
    latestAnalysis = Gensini.analyzeRecord(input.value, currentOptions());
    renderTable(latestAnalysis.branches);
    renderSummary(latestAnalysis);
    renderMessages(latestAnalysis.messages);
  }

  templateBtn.addEventListener("click", () => {
    input.value = Gensini.MANUAL_TEMPLATE;
    runAnalysis();
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    runAnalysis();
  });

  analyzeBtn.addEventListener("click", runAnalysis);
  modeSelect.addEventListener("change", runAnalysis);
  dominanceSelect.addEventListener("change", runAnalysis);

  runAnalysis();
})();
