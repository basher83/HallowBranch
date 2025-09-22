// Theme-related TypeScript type definitions

export type ColorTheme = 'sass' | 'sass2' | 'sass3' | 'blue' | 'purple' | 'green';
export type ModeTheme = 'light' | 'dark' | 'system';

export interface ThemePreference {
  id?: string;
  userId: string;
  colorTheme: ColorTheme;
  modeTheme: ModeTheme;
  enableSystemDetection: boolean;
  enableTransitions: boolean;
  syncAcrossDevices: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ThemeContextValue {
  theme: ModeTheme;
  setTheme: (theme: ModeTheme) => void;
  systemTheme?: 'light' | 'dark';
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

// Database schema types for user_preferences table
export interface UserPreferencesRow {
  id: string;
  user_id: string;
  color_theme: string;
  mode_theme: string;
  enable_system_detection: boolean;
  enable_transitions: boolean;
  sync_across_devices: boolean;
  created_at: string;
  updated_at: string;
}

// Transform database row to application model
export function transformPreferencesFromDB(row: UserPreferencesRow): ThemePreference {
  return {
    id: row.id,
    userId: row.user_id,
    colorTheme: row.color_theme as ColorTheme,
    modeTheme: row.mode_theme as ModeTheme,
    enableSystemDetection: row.enable_system_detection,
    enableTransitions: row.enable_transitions,
    syncAcrossDevices: row.sync_across_devices,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

// Transform application model to database row
export function transformPreferencesToDB(
  userId: string,
  preferences: Partial<ThemePreference>
): Partial<UserPreferencesRow> {
  return {
    user_id: userId,
    color_theme: preferences.colorTheme,
    mode_theme: preferences.modeTheme,
    enable_system_detection: preferences.enableSystemDetection,
    enable_transitions: preferences.enableTransitions,
    sync_across_devices: preferences.syncAcrossDevices,
  };
}

// Default preferences for new users
export function getDefaultPreferences(userId: string): ThemePreference {
  return {
    userId,
    colorTheme: 'sass3',
    modeTheme: 'system',
    enableSystemDetection: true,
    enableTransitions: true,
    syncAcrossDevices: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}