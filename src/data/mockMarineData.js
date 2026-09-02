export const ORCHESTRATOR_STEPS = [
  { label: "மொழி புரிதல்", labelKey: "step_lang", id: "lang" },
  { label: "கேள்வி புரிதல்", labelKey: "step_intent", id: "intent" },
  { label: "வானிலை சரிபார்க்கிறது", labelKey: "step_weather", id: "weather" },
  { label: "கடல் நிலை சரிபார்க்கிறது", labelKey: "step_ocean", id: "ocean" },
  { label: "ஆபத்து சரிபார்க்கிறது", labelKey: "step_hazard", id: "hazard" },
  { label: "புயல் எச்சரிக்கை சரிபார்க்கிறது", labelKey: "step_cyclone", id: "cyclone", isFollowUp: true },
  { label: "எச்சரிக்கைகளை உருவாக்குகிறது", labelKey: "step_alert", id: "alert", isFollowUp: true },
];

export const DEMO_FACTORS = [
  { label: "Wind", labelKey: "val_wind", pct: 60, weight: 1 },
  { label: "Wave", labelKey: "val_waves", pct: 80, weight: 1.5 },
  { label: "Cyclone", labelKey: "val_cyclone", pct: 100, weight: 2 },
];

export const DEMO_METRICS = [
  { l: "Wind", labelKey: "val_wind", v: "28 km/h" },
  { l: "Waves", labelKey: "val_waves", v: "2.4 m" },
  { l: "Swell", labelKey: "val_swell", v: "1.3 m" },
  { l: "Sea State", labelKey: "val_sea_state", v: "Moderate", vKey: "val_moderate" },
];

export const DEMO_EVIDENCE = [
  { icon: "🌀", label: "Cyclone Warning", labelKey: "val_cyclone_warning", src: "IMD", time: "10:30 AM" },
  { icon: "🌊", label: "Wave Conditions", labelKey: "val_wave_cond", src: "INCOIS", time: "10:32 AM" },
  { icon: "💨", label: "Wind", labelKey: "val_wind", src: "IMD", time: "10:31 AM" },
];

export const DEMO_ALERTS = [
  { icon: "Waves", label: "அதிக அலை", labelKey: "val_high_waves" },
  { icon: "Wind", label: "அதிக காற்று", labelKey: "val_high_wind" },
  { icon: "AlertTriangle", label: "அதிகாரப்பூர்வ எச்சரிக்கை", labelKey: "val_official_warning" },
];

// PFZ Specific
export const PFZ_METRICS = [
  { l: "Distance", labelKey: "val_distance", v: "12 km" },
  { l: "Depth", labelKey: "val_depth", v: "45 m" },
  { l: "SST", labelKey: "val_sst", v: "28°C" },
  { l: "Chlorophyll", labelKey: "val_chloro", v: "High" },
];

export const PFZ_EVIDENCE = [
  { icon: "🐟", label: "PFZ Advisory", labelKey: "val_pfz_adv", src: "INCOIS", time: "09:00 AM" },
  { icon: "🌡️", label: "SST Map", labelKey: "val_sst_map", src: "ISRO", time: "09:15 AM" },
  { icon: "🌊", label: "Safe Sea", labelKey: "val_safe_sea", src: "IMD", time: "10:00 AM" },
];

export const PFZ_ALERTS = [
  { icon: "Fish", label: "High Yield Expected", labelKey: "val_high_yield" },
  { icon: "Waves", label: "Safe Conditions", labelKey: "val_safe_cond" },
];

// Weather Specific
export const WEATHER_METRICS = [
  { l: "Wind", labelKey: "val_wind", v: "14 km/h" },
  { l: "Waves", labelKey: "val_waves", v: "1.2 m" },
  { l: "Visibility", labelKey: "val_vis", v: "10 km" },
  { l: "Sea State", labelKey: "val_sea_state", v: "Calm", vKey: "val_calm" },
];

export const WEATHER_EVIDENCE = [
  { icon: "💨", label: "Wind Data", labelKey: "val_wind_data", src: "IMD", time: "10:45 AM" },
  { icon: "☁️", label: "Cloud Cover", labelKey: "val_cloud", src: "MOSDAC", time: "10:30 AM" },
];

export const WEATHER_ALERTS = [
  { icon: "Waves", label: "Normal Waves", labelKey: "val_normal_waves" },
  { icon: "Wind", label: "Moderate Wind", labelKey: "val_mod_wind" },
];

// Geofence Specific
export const GEOFENCE_METRICS = [
  { l: "Status", labelKey: "val_status", v: "Restricted", vKey: "val_restricted" },
  { l: "Zone", labelKey: "val_zone", v: "MPA", vKey: "val_mpa" },
  { l: "Penalty", labelKey: "val_penalty", v: "High", vKey: "val_high" },
  { l: "Distance", labelKey: "val_distance", v: "2 km" },
];

export const GEOFENCE_EVIDENCE = [
  { icon: "🚫", label: "Marine Park", labelKey: "val_marine_park", src: "Gov", time: "Valid Now" },
  { icon: "📍", label: "Boundary", labelKey: "val_boundary", src: "OSM", time: "Static" },
];

export const GEOFENCE_ALERTS = [
  { icon: "AlertTriangle", label: "Fishing Banned", labelKey: "val_fishing_banned" },
];

// Route Specific
export const ROUTE_METRICS = [
  { l: "Distance", labelKey: "val_distance", v: "45 NM" },
  { l: "Est. Time", labelKey: "val_time", v: "4.5 hrs" },
  { l: "Hazards", labelKey: "val_hazards", v: "None", vKey: "val_none" },
  { l: "Fuel Eff.", labelKey: "val_fuel", v: "Optimal", vKey: "val_optimal" },
];

export const ROUTE_EVIDENCE = [
  { icon: "🗺️", label: "Bathymetry", labelKey: "val_bathymetry", src: "GEBCO", time: "11:00 AM" },
  { icon: "🌊", label: "Currents", labelKey: "val_currents", src: "Copernicus", time: "11:05 AM" },
];

export const ROUTE_ALERTS = [
  { icon: "Compass", label: "Safe Route", labelKey: "val_safe_route" },
];

export const QUICK_ACTIONS = [
  { icon: "Waves", labelKey: "sea_state", label: "கடல் நிலை" },
  { icon: "Fish", labelKey: "fishing_zone", label: "மீன்பிடி பகுதி" },
  { icon: "Compass", labelKey: "safe_route", label: "பாதுகாப்பான பாதை" },
  { icon: "AlertTriangle", labelKey: "alerts", label: "எச்சரிக்கைகள்", action: "alerts" },
];

export const TIMING = {
  LISTENING_DURATION: 2200,
  PROCESSING_DURATION: 2600,
  SCORE_ANIMATION_DELAY: 200,
};
