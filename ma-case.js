(() => {
  const premiumSlider = document.getElementById("premium-slider");
  const synergySlider = document.getElementById("synergy-slider");
  if (!premiumSlider || !synergySlider) return;

  const assumptions = {
    referenceSharePrice: 44.41,
    dilutedSharesMillions: 231.5,
    cashAndSecuritiesMillions: 767,
    preferredStockMillions: 196,
    standaloneEbitdaMillions: 1087
  };

  const premiumPoints = [15, 20, 25, 30, 35];
  const synergyPoints = [150, 250, 320, 400, 550];
  const cells = Array.from(document.querySelectorAll(".sensitivity-table td[data-premium][data-synergy]"));
  const outputs = {
    premium: document.getElementById("premium-value"),
    synergy: document.getElementById("synergy-value"),
    offerPrice: document.getElementById("offer-price"),
    offerEquity: document.getElementById("offer-equity"),
    transactionEv: document.getElementById("transaction-ev"),
    adjustedEbitda: document.getElementById("adjusted-ebitda"),
    multiple: document.getElementById("effective-multiple"),
    indicator: document.getElementById("valuation-indicator"),
    takeaway: document.getElementById("sensitivity-takeaway")
  };
  const resetButton = document.getElementById("scenario-reset");

  const nearestPoint = (value, points) => points.reduce((nearest, point) => (
    Math.abs(point - value) < Math.abs(nearest - value) ? point : nearest
  ));

  const setTrackProgress = (input) => {
    const progress = ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100;
    input.style.setProperty("--range-progress", `${progress}%`);
  };

  const updateSelectedCell = (premium, synergies) => {
    const nearestPremium = nearestPoint(premium, premiumPoints);
    const nearestSynergy = nearestPoint(synergies, synergyPoints);
    cells.forEach((cell) => {
      const isSelected = Number(cell.dataset.premium) === nearestPremium && Number(cell.dataset.synergy) === nearestSynergy;
      cell.classList.toggle("selected-cell", isSelected);
      if (isSelected) cell.setAttribute("aria-current", "true");
      else cell.removeAttribute("aria-current");
    });
  };

  const updateScenario = () => {
    const premium = Number(premiumSlider.value);
    const synergies = Number(synergySlider.value);
    const currentEquityValue = assumptions.referenceSharePrice * assumptions.dilutedSharesMillions;
    const offerPrice = assumptions.referenceSharePrice * (1 + premium / 100);
    const offerEquityValue = currentEquityValue * (1 + premium / 100);
    const transactionEv = offerEquityValue + assumptions.preferredStockMillions - assumptions.cashAndSecuritiesMillions;
    const adjustedEbitda = assumptions.standaloneEbitdaMillions + synergies;
    const effectiveMultiple = transactionEv / adjustedEbitda;
    const status = effectiveMultiple < 8.5 ? "ATTRACTIVE" : effectiveMultiple <= 9.5 ? "ACCEPTABLE" : "EXPENSIVE";

    outputs.premium.textContent = `${premium}%`;
    outputs.synergy.textContent = `$${synergies}M`;
    outputs.offerPrice.textContent = `$${offerPrice.toFixed(2)}`;
    outputs.offerEquity.textContent = `$${(offerEquityValue / 1000).toFixed(2)}B`;
    outputs.transactionEv.textContent = `$${(transactionEv / 1000).toFixed(2)}B`;
    outputs.adjustedEbitda.textContent = `$${(adjustedEbitda / 1000).toFixed(3)}B`;
    outputs.multiple.textContent = `${effectiveMultiple.toFixed(1)}x`;
    outputs.indicator.textContent = status;
    outputs.indicator.dataset.status = status.toLowerCase();
    outputs.takeaway.textContent = `At a ${premium}% acquisition premium and $${synergies}M of annual EBITDA synergies, the transaction implies approximately ${effectiveMultiple.toFixed(1)}x synergy-adjusted EV / EBITDA.`;

    premiumSlider.setAttribute("aria-valuenow", String(premium));
    synergySlider.setAttribute("aria-valuenow", String(synergies));
    setTrackProgress(premiumSlider);
    setTrackProgress(synergySlider);
    updateSelectedCell(premium, synergies);
  };

  premiumSlider.addEventListener("input", updateScenario);
  synergySlider.addEventListener("input", updateScenario);
  resetButton?.addEventListener("click", () => {
    premiumSlider.value = "25";
    synergySlider.value = "320";
    updateScenario();
    premiumSlider.focus();
  });

  updateScenario();
})();
