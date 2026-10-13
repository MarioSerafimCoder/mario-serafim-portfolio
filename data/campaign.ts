const campaignKey = "ms-campaign";
export function rememberCampaign() {
  try { const values = [...new URLSearchParams(location.search)].filter(([key]) => ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].includes(key)).map(([key,value]) => [key, value.slice(0,150)]); if (values.length) sessionStorage.setItem(campaignKey, JSON.stringify(Object.fromEntries(values))); } catch { /* Optional attribution must not block the form. */ }
}
export function readCampaign() {
  rememberCampaign();
  try { return JSON.parse(sessionStorage.getItem(campaignKey) || "{}"); } catch { return {}; }
}
