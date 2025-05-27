// app/client.tsx
// / <reference types="vinxi/types/client" />
import { StartClient } from '@tanstack/react-start';
import { hydrateRoot } from 'react-dom/client';
import { createRouter } from './router';

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
// This client entry point enables us to kick off client-side routing once the user's initial server request has fulfilled.
