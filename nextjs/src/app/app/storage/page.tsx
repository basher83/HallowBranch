'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Upload,
  Download,
  Share2,
  Trash2,
  Loader2,
  FileIcon,
  AlertCircle,
  CheckCircle,
  Copy,
} from 'lucide-react';
import { FileObject } from '@supabase/storage-js';

import { useGlobal } from '@/lib/context/GlobalContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createSPASassClientAuthenticated as createSPASassClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FileManagementPage() {
  const { user } = useGlobal();
  const [files, setFiles] = useState<FileObject[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Centralized helper for authenticated operations
  const getAuthedClient = useCallback(async () => {
    const userId = user?.id;
    if (!userId) {
      throw new Error('Not authenticated');
    }
    const supabase = await createSPASassClient();
    return { supabase, userId };
  }, [user]);

  const loadFiles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const { supabase, userId } = await getAuthedClient();
      const { data, error } = await supabase.getFiles(userId);

      if (error) throw error;
      setFiles(data || []);
    } catch (err) {
      setError('Failed to load files');
      console.error('Error loading files:', err);
    } finally {
      setLoading(false);
    }
  }, [getAuthedClient]);

  useEffect(() => {
    if (user?.id) {
      loadFiles();
    }
  }, [user, loadFiles]);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleFileUpload = useCallback(
    async (file: File) => {
      try {
        setUploading(true);
        setError('');

        // Check file size limit (50MB)
        const MAX_FILE_SIZE_MB = 50;
        const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE_BYTES) {
          setError(
            `File exceeds ${MAX_FILE_SIZE_MB}MB limit. Please choose a smaller file.`
          );
          setUploading(false);
          return;
        }

        const { supabase, userId } = await getAuthedClient();
        const { error } = await supabase.uploadFile(userId, file.name, file);

        if (error) throw error;

        await loadFiles();
        setSuccess('File uploaded successfully');
      } catch (err) {
        setError('Failed to upload file');
        console.error('Error uploading file:', err);
      } finally {
        setUploading(false);
      }
    },
    [getAuthedClient, loadFiles]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;
    handleFileUpload(fileList[0]);
    event.target.value = '';
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDownload = async (filename: string) => {
    try {
      setError('');

      const { supabase, userId } = await getAuthedClient();
      const { data, error } = await supabase.shareFile(
        userId,
        filename,
        60,
        true
      );

      if (error || !data?.signedUrl) {
        throw error ?? new Error('No signed URL returned');
      }

      // Attempt to open in new tab, fallback to current tab if blocked
      const opened = window.open(
        data.signedUrl,
        '_blank',
        'noopener,noreferrer'
      );
      if (!opened) {
        window.location.assign(data.signedUrl);
      }
    } catch (err) {
      setError('Failed to download file');
      console.error('Error downloading file:', err);
    }
  };

  const handleShare = async (filename: string) => {
    try {
      setError('');

      const { supabase, userId } = await getAuthedClient();
      const { data, error } = await supabase.shareFile(
        userId,
        filename,
        24 * 60 * 60
      );

      if (error) throw error;

      setShareUrl(data.signedUrl);
      setSelectedFile(filename);
    } catch (err) {
      setError('Failed to generate share link');
      console.error('Error sharing file:', err);
    }
  };

  const handleDelete = async () => {
    if (!fileToDelete) return;

    try {
      setError('');

      const { supabase, userId } = await getAuthedClient();
      const { error } = await supabase.deleteFile(userId, fileToDelete);

      if (error) throw error;

      await loadFiles();
      setSuccess('File deleted successfully');
    } catch (err) {
      setError('Failed to delete file');
      console.error('Error deleting file:', err);
    } finally {
      setShowDeleteDialog(false);
      setFileToDelete(null);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopiedMessage(true);

      // Clear any existing timeout to prevent leaks
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout - portable across environments
      timeoutRef.current = setTimeout(() => {
        setShowCopiedMessage(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>File Management</CardTitle>
          <CardDescription>
            Upload, download, and share your files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-center w-full">
            <label
              aria-busy={uploading}
              aria-disabled={uploading}
              className={`w-full flex flex-col items-center px-4 py-6 bg-secondary/50 dark:bg-secondary rounded-lg shadow-lg tracking-wide border-2 cursor-pointer transition-colors ${
                isDragging
                  ? 'border-primary border-dashed bg-accent'
                  : 'border-input hover:bg-accent'
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8" />
              <span className="mt-2 text-base">
                {uploading
                  ? 'Uploading...'
                  : isDragging
                    ? 'Drop your file here'
                    : 'Drag and drop or click to select a file (max 50mb)'}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleInputChange}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="space-y-4">
            {loading && (
              <div className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
            {files.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No files uploaded yet
              </p>
            ) : (
              files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-4 bg-secondary/50 dark:bg-secondary rounded-lg border border-border"
                >
                  <div className="flex items-center space-x-3">
                    <FileIcon className="h-6 w-6 text-muted-foreground" />
                    <span className="font-medium">
                      {file.name.split('/').pop()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(file.name)}
                      className="h-8 w-8"
                      title="Download"
                      aria-label="Download file"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShare(file.name)}
                      className="h-8 w-8"
                      title="Share"
                      aria-label="Share file"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setFileToDelete(file.name);
                        setShowDeleteDialog(true);
                      }}
                      className="h-8 w-8 hover:text-destructive"
                      title="Delete"
                      aria-label="Delete file"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Share Dialog */}
          <Dialog
            open={Boolean(shareUrl)}
            onOpenChange={(open) => {
              if (!open) {
                setShareUrl('');
                setSelectedFile(null);
                setShowCopiedMessage(false);
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Share {selectedFile?.split('/').pop()}
                </DialogTitle>
                <DialogDescription>
                  Copy the link below to share your file. This link will expire
                  in 24 hours.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(shareUrl)}
                  className="relative"
                >
                  <Copy className="h-4 w-4" />
                  {showCopiedMessage && (
                    <span
                      role="status"
                      aria-live="polite"
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground border border-border text-xs px-2 py-1 rounded"
                    >
                      Copied!
                    </span>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete File</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this file? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
