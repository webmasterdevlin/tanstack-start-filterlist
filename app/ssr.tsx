// app/ssr.tsx
// / <reference types="vinxi/types/server" />
import { getRouterManifest } from '@tanstack/react-start/router-manifest';
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';

import { createRouter } from './router';

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
// This server entry point allows us to know what routes and loaders we need to execute when the user hits a given route.
