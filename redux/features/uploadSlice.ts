// uploadSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Song {
  artist: string
  title: string
  description: string
  genre: string
  imageUrl: string
  audioUrl?: string
  albumFiles?: [{
    i: number,
    name: string,
    url: string
  }]
  videoUrl?: string
  type: string
}

interface UploadState {
  files: Song[];
  currentUpload: Song | null;
  uploading: boolean;
  progress: number;
  error: string | null;
}

const initialState: UploadState = {
  files: [],
  currentUpload: null,
  uploading: false,
  progress: 0,
  error: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addUpload: (state, action: PayloadAction<Song>) => {
      state.currentUpload = action.payload;
    },
    completeUpload: (state) => {
      if (state.currentUpload) {
        state.files.push(state.currentUpload);
        state.currentUpload = null;
      }
    },
    startUpload: (state) => {
      state.uploading = true;
      state.progress = 0;
      state.error = null;
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    uploadSuccess: (state) => {
      state.uploading = false;
      state.progress = 100;
      state.error = null;
    },
    uploadError: (state, action: PayloadAction<string>) => {
      state.uploading = false;
      state.progress = 0;
      state.error = action.payload;
    },
  },
});

export const { addUpload, completeUpload, startUpload, updateProgress, uploadSuccess, uploadError } = uploadSlice.actions;
export default uploadSlice.reducer;
