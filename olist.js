(() => {
  const svg = document.querySelector("#revenue-chart");
  if (!svg) return;
  const data = [
    ["2017-01",111798.36],["2017-02",234223.40],["2017-03",359198.85],["2017-04",340669.68],["2017-05",489338.25],
    ["2017-06",421923.37],["2017-07",481604.52],["2017-08",554699.70],["2017-09",607399.67],["2017-10",648247.65],
    ["2017-11",987765.37],["2017-12",726033.19],["2018-01",924645.00],["2018-02",826437.13],["2018-03",953356.25],
    ["2018-04",973534.09],["2018-05",977544.69],["2018-06",856077.86],["2018-07",867953.46],["2018-08",838576.64]
  ];
  const left=88, right=960, top=62, bottom=365, max=1000000;
  const x=i=>left+(right-left)*(i/(data.length-1));
  const y=v=>bottom-(bottom-top)*(v/max);
  const points=data.map((d,i)=>`${x(i)},${y(d[1])}`).join(" ");
  const area=`${left},${bottom} ${points} ${right},${bottom}`;
  const ticks=[[0,"R$0"],[250000,"R$250K"],[500000,"R$500K"],[750000,"R$750K"],[1000000,"R$1.0M"]];
  const xTicks=[[0,"Jan 2017"],[6,"Jul 2017"],[12,"Jan 2018"],[19,"Aug 2018"]];
  const peak=10, px=x(peak), py=y(data[peak][1]);
  svg.insertAdjacentHTML("beforeend", `<defs><linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2563eb" stop-opacity=".18"/><stop offset="1" stop-color="#2563eb" stop-opacity="0"/></linearGradient></defs><text x="${left}" y="28" class="chart-title">Monthly Product Revenue</text>${ticks.map(([v,l])=>`<line x1="${left}" y1="${y(v)}" x2="${right}" y2="${y(v)}" class="chart-grid"/><text x="${left-14}" y="${y(v)+5}" text-anchor="end" class="chart-axis-label">${l}</text>`).join("")}${xTicks.map(([i,l])=>`<text x="${x(i)}" y="${bottom+35}" text-anchor="middle" class="chart-axis-label">${l}</text>`).join("")}<polygon points="${area}" class="chart-area"/><polyline points="${points}" class="chart-line"/><line x1="${px}" y1="${py}" x2="${px}" y2="${bottom}" class="chart-guide"/><circle cx="${px}" cy="${py}" r="8" class="chart-highlight"/><text x="${px+14}" y="${py-13}" class="chart-callout">Nov 2017 · R$988K</text>`);
})();
