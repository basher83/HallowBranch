import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@/lib/types';
import type { ThemePreference } from '@/lib/types/theme.types';

export enum ClientType {
  SERVER = 'server',
  SPA = 'spa',
}

// Using a type alias to simplify the client type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DatabaseClient = SupabaseClient<any, any, any>;

export class SassClient {
  private client: DatabaseClient;
  private clientType: ClientType;

  constructor(client: DatabaseClient, clientType: ClientType) {
    this.client = client;
    this.clientType = clientType;
  }

  async loginEmail(email: string, password: string) {
    return this.client.auth.signInWithPassword({
      email,
      password,
    });
  }

  async registerEmail(email: string, password: string) {
    return this.client.auth.signUp({
      email,
      password,
    });
  }

  async exchangeCodeForSession(code: string) {
    return this.client.auth.exchangeCodeForSession(code);
  }

  async resendVerificationEmail(email: string) {
    return this.client.auth.resend({
      email,
      type: 'signup',
    });
  }

  async logout() {
    const { error } = await this.client.auth.signOut({
      scope: 'local',
    });
    if (error) throw error;
    if (this.clientType === ClientType.SPA) {
      window.location.href = '/auth/login';
    }
  }

  async uploadFile(myId: string, filename: string, file: File) {
    filename = filename.replace(/[^0-9a-zA-Z!\-_.*'()]/g, '_');
    filename = `${myId}/${filename}`;
    return this.client.storage.from('files').upload(filename, file);
  }

  async getFiles(myId: string) {
    return this.client.storage.from('files').list(myId);
  }

  async deleteFile(myId: string, filename: string) {
    filename = `${myId}/${filename}`;
    return this.client.storage.from('files').remove([filename]);
  }

  async shareFile(
    myId: string,
    filename: string,
    timeInSec: number,
    forDownload: boolean = false
  ) {
    filename = `${myId}/${filename}`;
    return this.client.storage
      .from('files')
      .createSignedUrl(filename, timeInSec, {
        download: forDownload,
      });
  }

  async getMyTodoList(
    page: number = 1,
    pageSize: number = 100,
    order: string = 'created_at',
    done: boolean | null = false
  ) {
    let query = this.client
      .from('todo_list')
      .select('*')
      .range(page * pageSize - pageSize, page * pageSize - 1)
      .order(order);
    if (done !== null) {
      query = query.eq('done', done);
    }
    return query;
  }

  async createTask(row: Database['public']['Tables']['todo_list']['Insert']) {
    return this.client.from('todo_list').insert(row);
  }

  async removeTask(id: number) {
    return this.client.from('todo_list').delete().eq('id', id);
  }

  async updateAsDone(id: number) {
    return this.client.from('todo_list').update({ done: true }).eq('id', id);
  }

  getSupabaseClient() {
    return this.client;
  }

  // User preferences methods
  async getUserPreferences(userId: string): Promise<ThemePreference | null> {
    const { data, error } = await this.client
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) return null;

    // Transform snake_case database fields to camelCase
    return {
      id: data.id,
      userId: data.user_id,
      colorTheme: data.color_theme,
      modeTheme: data.mode_theme,
      enableSystemDetection: data.enable_system_detection,
      enableTransitions: data.enable_transitions,
      syncAcrossDevices: data.sync_across_devices,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  async updateUserPreferences(
    userId: string,
    preferences: Partial<
      Omit<ThemePreference, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
    >
  ) {
    const dbData = {
      user_id: userId,
      color_theme: preferences.colorTheme,
      mode_theme: preferences.modeTheme,
      enable_system_detection: preferences.enableSystemDetection,
      enable_transitions: preferences.enableTransitions,
      sync_across_devices: preferences.syncAcrossDevices,
      updated_at: new Date().toISOString(),
    };

    // Filter out undefined values
    const filteredData = Object.fromEntries(
      Object.entries(dbData).filter(([, v]) => v !== undefined)
    );

    const { data, error } = await this.client
      .from('user_preferences')
      .upsert(filteredData, {
        onConflict: 'user_id',
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update preferences');
    }

    // Transform response
    return {
      id: data.id,
      userId: data.user_id,
      colorTheme: data.color_theme,
      modeTheme: data.mode_theme,
      enableSystemDetection: data.enable_system_detection,
      enableTransitions: data.enable_transitions,
      syncAcrossDevices: data.sync_across_devices,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  async createUserPreferences(
    userId: string,
    preferences: Partial<ThemePreference>
  ) {
    const dbData = {
      user_id: userId,
      color_theme: preferences.colorTheme || 'sass3',
      mode_theme: preferences.modeTheme || 'system',
      enable_system_detection: preferences.enableSystemDetection ?? true,
      enable_transitions: preferences.enableTransitions ?? true,
      sync_across_devices: preferences.syncAcrossDevices ?? false,
    };

    const { data, error } = await this.client
      .from('user_preferences')
      .insert(dbData)
      .select()
      .single();

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create preferences');
    }

    // Transform response
    return {
      id: data.id,
      userId: data.user_id,
      colorTheme: data.color_theme,
      modeTheme: data.mode_theme,
      enableSystemDetection: data.enable_system_detection,
      enableTransitions: data.enable_transitions,
      syncAcrossDevices: data.sync_across_devices,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }
}
