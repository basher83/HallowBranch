# Theme Preferences API Contract

## Feature: Dark Mode Theme Preferences Management

This document defines the API contract for managing user theme preferences in the HallowBranch application, coordinating between Next.js API routes and Supabase backend.

## 1. API Routes Specification

```yaml
Base URL: /api/theme-preferences

Routes:
  # Get current user's theme preferences
  - GET /api/theme-preferences/current
    Authentication: Required
    Response: ThemePreferenceResponse
    Status: 200 OK

  # Get theme preferences by user ID (admin only)
  - GET /api/theme-preferences/{userId}
    Authentication: Required (Admin)
    Path param: userId (UUID)
    Response: ThemePreferenceResponse
    Status: 200 OK | 404 Not Found

  # Update current user's theme preferences
  - PUT /api/theme-preferences
    Authentication: Required
    Body: ThemePreferenceRequest
    Response: ThemePreferenceResponse
    Status: 200 OK

  # Get all available themes
  - GET /api/themes
    Authentication: Optional
    Query params:
      - type: 'color' | 'mode' (optional)
    Response: ThemeListResponse
    Status: 200 OK

  # Get theme usage analytics (admin only)
  - GET /api/theme-preferences/analytics
    Authentication: Required (Admin)
    Query params:
      - startDate: ISO 8601 string
      - endDate: ISO 8601 string
      - groupBy: 'day' | 'week' | 'month'
    Response: ThemeAnalyticsResponse
    Status: 200 OK
```

## 2. TypeScript Interfaces

### Request/Response DTOs

```typescript
// Request interface for updating preferences
interface ThemePreferenceRequest {
  colorTheme: ColorThemeName;      // 'sass' | 'blue' | 'purple' | 'green'
  modeTheme: ModeThemeName;        // 'light' | 'dark' | 'system'
  enableSystemDetection: boolean;   // Auto-detect OS preference
  enableTransitions: boolean;       // Smooth theme transitions
  syncAcrossDevices: boolean;      // Sync preferences to all sessions
}

// Response interface for theme preferences
interface ThemePreferenceResponse {
  id: string;                       // UUID
  userId: string;                   // UUID
  colorTheme: ColorThemeName;
  modeTheme: ModeThemeName;
  resolvedTheme: 'light' | 'dark'; // Computed based on system + user pref
  enableSystemDetection: boolean;
  enableTransitions: boolean;
  syncAcrossDevices: boolean;
  createdAt: string;                // ISO 8601
  updatedAt: string;                // ISO 8601
  lastSyncedAt?: string;            // ISO 8601
}

// List response for available themes
interface ThemeListResponse {
  colorThemes: ColorTheme[];
  modeThemes: ModeTheme[];
}

// Individual theme definitions
interface ColorTheme {
  name: ColorThemeName;
  displayName: string;
  description: string;
  preview: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  supportsDarkMode: boolean;
}

interface ModeTheme {
  name: ModeThemeName;
  displayName: string;
  description: string;
  isSystemOption: boolean;
}

// Analytics response
interface ThemeAnalyticsResponse {
  period: {
    startDate: string;
    endDate: string;
  };
  colorThemeUsage: {
    theme: ColorThemeName;
    count: number;
    percentage: number;
  }[];
  modeThemeUsage: {
    theme: ModeThemeName;
    count: number;
    percentage: number;
  }[];
  systemDetectionEnabled: {
    enabled: number;
    disabled: number;
  };
  dailyChanges: {
    date: string;
    changes: number;
  }[];
}

// Type definitions
type ColorThemeName = 'sass' | 'blue' | 'purple' | 'green';
type ModeThemeName = 'light' | 'dark' | 'system';
```

### Database Types (Supabase)

```typescript
// Database record structure
interface ThemePreferenceRecord {
  id: string;                        // UUID, primary key
  user_id: string;                   // UUID, foreign key to auth.users
  color_theme: string;               // Enum: sass, blue, purple, green
  mode_theme: string;                // Enum: light, dark, system
  enable_system_detection: boolean;  // Default: true
  enable_transitions: boolean;       // Default: true
  sync_across_devices: boolean;      // Default: true
  created_at: string;                // Timestamp with timezone
  updated_at: string;                // Timestamp with timezone
  last_synced_at?: string;           // Timestamp with timezone, nullable
}

// Supabase table definition
interface Tables {
  theme_preferences: {
    Row: ThemePreferenceRecord;
    Insert: Omit<ThemePreferenceRecord, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<ThemePreferenceRecord, 'id' | 'user_id'>>;
  };
}
```

## 3. Validation Rules

### Zod Validation Schemas

```typescript
import { z } from 'zod';

// Enum schemas
const ColorThemeSchema = z.enum(['sass', 'blue', 'purple', 'green']);
const ModeThemeSchema = z.enum(['light', 'dark', 'system']);

// Request validation schema
const ThemePreferenceRequestSchema = z.object({
  colorTheme: ColorThemeSchema,
  modeTheme: ModeThemeSchema,
  enableSystemDetection: z.boolean(),
  enableTransitions: z.boolean(),
  syncAcrossDevices: z.boolean()
});

// Partial update schema
const ThemePreferenceUpdateSchema = z.object({
  colorTheme: ColorThemeSchema.optional(),
  modeTheme: ModeThemeSchema.optional(),
  enableSystemDetection: z.boolean().optional(),
  enableTransitions: z.boolean().optional(),
  syncAcrossDevices: z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});

// Query parameter schemas
const ThemeTypeQuerySchema = z.enum(['color', 'mode']).optional();

const DateRangeQuerySchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  groupBy: z.enum(['day', 'week', 'month']).default('day')
});
```

### Database Constraints

```sql
-- Supabase table constraints
CREATE TABLE theme_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  color_theme TEXT NOT NULL CHECK (color_theme IN ('sass', 'blue', 'purple', 'green')),
  mode_theme TEXT NOT NULL CHECK (mode_theme IN ('light', 'dark', 'system')),
  enable_system_detection BOOLEAN NOT NULL DEFAULT true,
  enable_transitions BOOLEAN NOT NULL DEFAULT true,
  sync_across_devices BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,

  UNIQUE(user_id)
);

-- Row Level Security
ALTER TABLE theme_preferences ENABLE ROW LEVEL SECURITY;

-- Users can only access their own preferences
CREATE POLICY "Users can view own theme preferences"
  ON theme_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own theme preferences"
  ON theme_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own theme preferences"
  ON theme_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 4. Error Response Specification

### Standard Error Response Format

```typescript
interface ErrorResponse {
  error: string;           // Error category
  message: string;         // Human-readable message
  statusCode: number;      // HTTP status code
  timestamp: string;       // ISO 8601
  path: string;           // API endpoint path
  details?: {             // Additional error details
    field?: string;       // Field that caused the error
    received?: any;       // Value that was received
    expected?: string;    // Expected format/value
    code?: string;        // Error code for client handling
  };
}
```

### Error Response Examples

```json
// 400 Bad Request - Validation Error
{
  "error": "ValidationError",
  "message": "Invalid color theme provided",
  "statusCode": 400,
  "timestamp": "2025-01-22T10:30:00Z",
  "path": "/api/theme-preferences",
  "details": {
    "field": "colorTheme",
    "received": "orange",
    "expected": "sass | blue | purple | green",
    "code": "INVALID_COLOR_THEME"
  }
}

// 404 Not Found
{
  "error": "NotFoundError",
  "message": "Theme preferences not found for user",
  "statusCode": 404,
  "timestamp": "2025-01-22T10:30:00Z",
  "path": "/api/theme-preferences/123e4567-e89b-12d3-a456-426614174000",
  "details": {
    "code": "PREFERENCES_NOT_FOUND"
  }
}

// 409 Conflict
{
  "error": "ConflictError",
  "message": "Theme preferences already exist for this user",
  "statusCode": 409,
  "timestamp": "2025-01-22T10:30:00Z",
  "path": "/api/theme-preferences",
  "details": {
    "code": "PREFERENCES_ALREADY_EXIST"
  }
}

// 500 Internal Server Error
{
  "error": "InternalServerError",
  "message": "Failed to update theme preferences",
  "statusCode": 500,
  "timestamp": "2025-01-22T10:30:00Z",
  "path": "/api/theme-preferences",
  "details": {
    "code": "DATABASE_ERROR"
  }
}
```

## 5. Status Code Definitions

| Status Code | Usage | Description |
|------------|--------|-------------|
| **200** | OK | Successful GET or PUT request |
| **201** | Created | New theme preferences created successfully |
| **204** | No Content | Successful DELETE request |
| **400** | Bad Request | Invalid request body or parameters |
| **401** | Unauthorized | Authentication required but not provided |
| **403** | Forbidden | Insufficient permissions (e.g., non-admin accessing analytics) |
| **404** | Not Found | Theme preferences not found for specified user |
| **409** | Conflict | Attempting to create duplicate preferences |
| **422** | Unprocessable Entity | Request body fails business logic validation |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Unexpected server error |
| **503** | Service Unavailable | Database connection failed |

## 6. Integration Requirements

### Authentication & Authorization

```typescript
// Middleware for auth verification
import { createClient } from '@/lib/supabase/server';

async function verifyAuth(request: NextRequest) {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    );
  }

  return user;
}
```

### CORS Configuration

```typescript
// Next.js handles CORS automatically for API routes
// For custom CORS, use middleware.ts
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL,
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};
```

### Rate Limiting

```typescript
// Rate limit configuration
const rateLimits = {
  'GET /api/theme-preferences/current': {
    requests: 100,
    window: '1m'
  },
  'PUT /api/theme-preferences': {
    requests: 20,
    window: '1m'
  },
  'GET /api/theme-preferences/analytics': {
    requests: 10,
    window: '5m'
  }
};
```

### Real-time Synchronization

```typescript
// Supabase real-time subscription for cross-device sync
const channel = supabase
  .channel('theme-preferences')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'theme_preferences',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      // Update local theme when changed on another device
      applyThemePreferences(payload.new);
    }
  )
  .subscribe();
```

## 7. Implementation Examples

### Next.js API Route Implementation

```typescript
// nextjs/src/app/api/theme-preferences/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ThemePreferenceRequestSchema } from '@/lib/validations/theme';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  // Verify authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    );
  }

  // Fetch user's theme preferences
  const { data, error } = await supabase
    .from('theme_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No preferences found, return defaults
      return NextResponse.json({
        userId: user.id,
        colorTheme: 'sass',
        modeTheme: 'system',
        resolvedTheme: 'light',
        enableSystemDetection: true,
        enableTransitions: true,
        syncAcrossDevices: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { error: 'DatabaseError', message: error.message },
      { status: 500 }
    );
  }

  // Transform snake_case to camelCase
  const response = {
    id: data.id,
    userId: data.user_id,
    colorTheme: data.color_theme,
    modeTheme: data.mode_theme,
    resolvedTheme: resolveTheme(data.mode_theme),
    enableSystemDetection: data.enable_system_detection,
    enableTransitions: data.enable_transitions,
    syncAcrossDevices: data.sync_across_devices,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    lastSyncedAt: data.last_synced_at
  };

  return NextResponse.json(response);
}

export async function PUT(request: NextRequest) {
  const supabase = createClient();

  // Verify authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    );
  }

  // Parse and validate request body
  const body = await request.json();
  const validation = ThemePreferenceRequestSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: 'ValidationError',
        message: 'Invalid request body',
        details: validation.error.flatten()
      },
      { status: 400 }
    );
  }

  // Transform camelCase to snake_case for database
  const dbData = {
    user_id: user.id,
    color_theme: validation.data.colorTheme,
    mode_theme: validation.data.modeTheme,
    enable_system_detection: validation.data.enableSystemDetection,
    enable_transitions: validation.data.enableTransitions,
    sync_across_devices: validation.data.syncAcrossDevices,
    updated_at: new Date().toISOString(),
    last_synced_at: validation.data.syncAcrossDevices ? new Date().toISOString() : null
  };

  // Upsert preferences
  const { data, error } = await supabase
    .from('theme_preferences')
    .upsert(dbData, {
      onConflict: 'user_id',
      returning: 'representation'
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'DatabaseError', message: error.message },
      { status: 500 }
    );
  }

  // Transform response
  const response = {
    id: data.id,
    userId: data.user_id,
    colorTheme: data.color_theme,
    modeTheme: data.mode_theme,
    resolvedTheme: resolveTheme(data.mode_theme),
    enableSystemDetection: data.enable_system_detection,
    enableTransitions: data.enable_transitions,
    syncAcrossDevices: data.sync_across_devices,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    lastSyncedAt: data.last_synced_at
  };

  return NextResponse.json(response);
}

// Helper function to resolve theme based on system preference
function resolveTheme(modeTheme: string): 'light' | 'dark' {
  if (modeTheme === 'system') {
    // In production, this would check actual system preference
    // For API response, we return a default
    return 'light';
  }
  return modeTheme as 'light' | 'dark';
}
```

### Frontend Implementation with TanStack Query

```typescript
// hooks/useThemePreferences.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useThemePreferences() {
  const queryClient = useQueryClient();

  // Fetch current preferences
  const { data: preferences, isLoading, error } = useQuery({
    queryKey: ['theme-preferences'],
    queryFn: async () => {
      const response = await fetch('/api/theme-preferences/current');
      if (!response.ok) {
        throw new Error('Failed to fetch theme preferences');
      }
      return response.json() as Promise<ThemePreferenceResponse>;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Keep in cache for 10 minutes
  });

  // Update preferences mutation
  const updatePreferences = useMutation({
    mutationFn: async (newPreferences: ThemePreferenceRequest) => {
      const response = await fetch('/api/theme-preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPreferences),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      return response.json() as Promise<ThemePreferenceResponse>;
    },
    onSuccess: (data) => {
      // Update cache with new preferences
      queryClient.setQueryData(['theme-preferences'], data);

      // Apply theme immediately
      applyTheme(data);
    },
    onError: (error) => {
      console.error('Failed to update theme preferences:', error);
    },
  });

  return {
    preferences,
    isLoading,
    error,
    updatePreferences: updatePreferences.mutate,
    isUpdating: updatePreferences.isPending,
  };
}
```

### Server Component Data Fetching

```typescript
// app/settings/appearance/page.tsx
import { createClient } from '@/lib/supabase/server';
import { ThemePreferenceResponse } from '@/types/theme';

async function getThemePreferences(): Promise<ThemePreferenceResponse | null> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('theme_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    userId: data.user_id,
    colorTheme: data.color_theme,
    modeTheme: data.mode_theme,
    resolvedTheme: data.mode_theme === 'system' ? 'light' : data.mode_theme,
    enableSystemDetection: data.enable_system_detection,
    enableTransitions: data.enable_transitions,
    syncAcrossDevices: data.sync_across_devices,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    lastSyncedAt: data.last_synced_at
  };
}

export default async function AppearanceSettings() {
  const preferences = await getThemePreferences();

  return (
    <div>
      <h1>Appearance Settings</h1>
      <ThemePreferenceForm initialData={preferences} />
    </div>
  );
}
```

### Real-time Synchronization Hook

```typescript
// hooks/useThemeSync.ts
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export function useThemeSync(userId: string | undefined) {
  const queryClient = useQueryClient();
  const supabase = createClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`theme-sync-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'theme_preferences',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Invalidate and refetch preferences when changed
          queryClient.invalidateQueries({ queryKey: ['theme-preferences'] });

          // Apply new theme immediately
          if (payload.new) {
            const preferences = transformDatabaseRecord(payload.new);
            applyTheme(preferences);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient, supabase]);
}
```

## 8. Testing Requirements

### API Testing Checklist

- [ ] **GET /api/theme-preferences/current**
  - [ ] Returns user preferences when authenticated
  - [ ] Returns 401 when not authenticated
  - [ ] Returns defaults when no preferences exist
  - [ ] Response matches TypeScript interface

- [ ] **PUT /api/theme-preferences**
  - [ ] Successfully updates preferences
  - [ ] Validates request body
  - [ ] Returns 400 for invalid data
  - [ ] Creates new record if doesn't exist (upsert)
  - [ ] Updates timestamp fields correctly

- [ ] **Real-time sync**
  - [ ] Changes propagate to other sessions
  - [ ] Subscription cleanup on unmount
  - [ ] Handles connection errors gracefully

- [ ] **Performance**
  - [ ] Response time < 200ms for reads
  - [ ] Response time < 500ms for writes
  - [ ] Caching reduces duplicate requests

### Integration Testing

```typescript
// __tests__/api/theme-preferences.test.ts
import { createMocks } from 'node-mocks-http';
import { GET, PUT } from '@/app/api/theme-preferences/route';

describe('/api/theme-preferences', () => {
  it('should return user preferences', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        authorization: 'Bearer valid-token',
      },
    });

    await GET(req);

    expect(res._getStatusCode()).toBe(200);
    const json = JSON.parse(res._getData());
    expect(json).toHaveProperty('colorTheme');
    expect(json).toHaveProperty('modeTheme');
  });

  it('should validate theme values', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      headers: {
        authorization: 'Bearer valid-token',
      },
      body: {
        colorTheme: 'invalid-theme',
        modeTheme: 'light',
      },
    });

    await PUT(req);

    expect(res._getStatusCode()).toBe(400);
    const json = JSON.parse(res._getData());
    expect(json.error).toBe('ValidationError');
  });
});
```

## 9. Migration & Deployment

### Database Migration

```sql
-- Migration: 001_create_theme_preferences.sql
BEGIN;

-- Create enum types
CREATE TYPE color_theme AS ENUM ('sass', 'blue', 'purple', 'green');
CREATE TYPE mode_theme AS ENUM ('light', 'dark', 'system');

-- Create table
CREATE TABLE IF NOT EXISTS public.theme_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  color_theme color_theme NOT NULL DEFAULT 'sass',
  mode_theme mode_theme NOT NULL DEFAULT 'system',
  enable_system_detection BOOLEAN NOT NULL DEFAULT true,
  enable_transitions BOOLEAN NOT NULL DEFAULT true,
  sync_across_devices BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ,

  CONSTRAINT unique_user_preferences UNIQUE(user_id)
);

-- Create indexes
CREATE INDEX idx_theme_preferences_user_id ON public.theme_preferences(user_id);
CREATE INDEX idx_theme_preferences_updated_at ON public.theme_preferences(updated_at);

-- Enable RLS
ALTER TABLE public.theme_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage own preferences"
  ON public.theme_preferences
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_theme_preferences_updated_at
  BEFORE UPDATE ON public.theme_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

COMMIT;
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Theme-specific settings
NEXT_PUBLIC_DEFAULT_COLOR_THEME=sass
NEXT_PUBLIC_DEFAULT_MODE_THEME=system
NEXT_PUBLIC_ENABLE_THEME_ANALYTICS=true
```

## 10. Documentation & Support

### API Documentation Links

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zod Validation](https://zod.dev)

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Theme not persisting | Check cookie settings and localStorage availability |
| Flash of wrong theme | Implement blocking script in `<head>` |
| Real-time sync not working | Verify Supabase subscription and RLS policies |
| Validation errors | Ensure request body matches schema exactly |

---

## Contract Version

- **Version**: 1.0.0
- **Last Updated**: January 22, 2025
- **Author**: HallowBranch Development Team
- **Review Status**: Ready for Implementation

This contract serves as the source of truth for the theme preferences API implementation. All team members should reference this document when implementing client or server-side code related to theme management.