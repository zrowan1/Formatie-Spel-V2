// ============================================================
// CONFIGURATIE
// ============================================================
// Centrale configuratie voor De Formatie App
// 
// LET OP: Supabase anon keys zijn inherent publiek (ze zitten in de browser)
// Voor productie gebruik: zorg voor Row Level Security (RLS) in Supabase
// ============================================================

const CONFIG = {
  // Supabase configuratie
  SUPABASE_URL: 'https://vkfwthueozgcqvadbcfx.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZnd0aHVlb3pnY3F2YWRiY2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MTUyMTgsImV4cCI6MjA4ODI5MTIxOH0.H_QIujPFl2EOhq28AIegZf_9pSTXfyEXsaJzb8WJVQs',
  
  // App configuratie
  APP_NAME: 'De Formatie',
  APP_VERSION: '2.0',
  
  // Game configuratie
  DEFAULT_TOTAL_SEATS: 150,
  MIN_PLAYERS: 6,
  MAX_PLAYERS: 10,
  
  // Timer configuratie
  TIMER_WARNING_THRESHOLD: 30,  // Seconden voor warning kleur
  TIMER_DANGER_THRESHOLD: 10,   // Seconden voor danger kleur
  
  // Debug mode (zet op true voor extra logging)
  DEBUG: false
};

// Helper functie voor debug logging
function debugLog(...args) {
  if (CONFIG.DEBUG) {
    console.log('[Formatie Debug]', ...args);
  }
}

// Exporteer voor gebruik in andere scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
