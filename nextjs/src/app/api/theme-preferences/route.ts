import { NextRequest, NextResponse } from 'next/server';

import { createSSRSassClient } from '@/lib/supabase/server';
import { getDefaultPreferences } from '@/lib/types/theme.types';

export async function GET() {
  try {
    // Create server-side Supabase client
    const sassClient = await createSSRSassClient();
    const client = sassClient.getSupabaseClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user preferences
    const preferences = await sassClient.getUserPreferences(user.id);

    // Return preferences or defaults if none exist
    if (!preferences) {
      return NextResponse.json(getDefaultPreferences(user.id));
    }

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Error fetching theme preferences:', error);
    return NextResponse.json(
      { error: 'InternalServerError', message: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Create server-side Supabase client
    const sassClient = await createSSRSassClient();
    const client = sassClient.getSupabaseClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate request body (basic validation)
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'ValidationError', message: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate theme values if provided
    const validColorThemes = [
      'sass',
      'sass2',
      'sass3',
      'blue',
      'purple',
      'green',
    ];
    const validModeThemes = ['light', 'dark', 'system'];

    if (body.colorTheme && !validColorThemes.includes(body.colorTheme)) {
      return NextResponse.json(
        {
          error: 'ValidationError',
          message: 'Invalid color theme',
          details: {
            field: 'colorTheme',
            received: body.colorTheme,
            expected: validColorThemes.join(' | '),
          },
        },
        { status: 400 }
      );
    }

    if (body.modeTheme && !validModeThemes.includes(body.modeTheme)) {
      return NextResponse.json(
        {
          error: 'ValidationError',
          message: 'Invalid mode theme',
          details: {
            field: 'modeTheme',
            received: body.modeTheme,
            expected: validModeThemes.join(' | '),
          },
        },
        { status: 400 }
      );
    }

    // Update or create preferences
    const updatedPreferences = await sassClient.updateUserPreferences(user.id, {
      colorTheme: body.colorTheme,
      modeTheme: body.modeTheme,
      enableSystemDetection: body.enableSystemDetection,
      enableTransitions: body.enableTransitions,
      syncAcrossDevices: body.syncAcrossDevices,
    });

    return NextResponse.json(updatedPreferences);
  } catch (error) {
    console.error('Error updating theme preferences:', error);
    return NextResponse.json(
      { error: 'InternalServerError', message: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Create server-side Supabase client
    const sassClient = await createSSRSassClient();
    const client = sassClient.getSupabaseClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Check if preferences already exist
    const existingPreferences = await sassClient.getUserPreferences(user.id);
    if (existingPreferences) {
      return NextResponse.json(
        {
          error: 'ConflictError',
          message:
            'Preferences already exist for this user. Use PUT to update.',
        },
        { status: 409 }
      );
    }

    // Create new preferences
    const newPreferences = await sassClient.createUserPreferences(user.id, {
      colorTheme: body.colorTheme || 'sass3',
      modeTheme: body.modeTheme || 'system',
      enableSystemDetection: body.enableSystemDetection ?? true,
      enableTransitions: body.enableTransitions ?? true,
      syncAcrossDevices: body.syncAcrossDevices ?? false,
    });

    return NextResponse.json(newPreferences, { status: 201 });
  } catch (error) {
    console.error('Error creating theme preferences:', error);
    return NextResponse.json(
      { error: 'InternalServerError', message: 'Failed to create preferences' },
      { status: 500 }
    );
  }
}
