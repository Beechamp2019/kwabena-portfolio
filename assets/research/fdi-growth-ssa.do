*******************************************************
* 10. MODEL 4: ROBUSTNESS CHECK
* Exclude extreme FDI observations below the 1st
* percentile and above the 99th percentile
*******************************************************

quietly summarize fdi, detail

local fdi_p1 = r(p1)
local fdi_p99 = r(p99)

display "FDI 1st percentile: `fdi_p1'"
display "FDI 99th percentile: `fdi_p99'"

xtreg gdppcgrowth fdi investment trade popgrowth ///
    if fdi >= `fdi_p1' & fdi <= `fdi_p99', ///
    fe vce(cluster country_id)

eststo model4
