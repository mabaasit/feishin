import React from 'react';
import { Notifications } from '@mantine/notifications';
import {
    PersistedClient,
    Persister,
    PersistQueryClientProvider as UnwrappedPersistQueryClientProvider,
    PersistQueryClientProviderProps,
} from '@tanstack/react-query-persist-client';
import { get, set, del } from 'idb-keyval';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { queryClient } from './lib/react-query';
import { AsrApp } from './asr';
import 'overlayscrollbars/overlayscrollbars.css';
import { OOA_CONFIG } from './asr-config';

// Creating a wrapper here to avoid having conflits when upstream is merged
// and there are changes in root.render
const PersistQueryClientProvider = ({
    children,
    ...props
}: { children: React.ReactNode } & PersistQueryClientProviderProps) => {
    return (
        <AsrApp>
            <UnwrappedPersistQueryClientProvider {...props}>
                {children}
            </UnwrappedPersistQueryClientProvider>
        </AsrApp>
    );
};

export function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery') {
    return {
        persistClient: async (client: PersistedClient) => {
            set(idbValidKey, client);
        },
        removeClient: async () => {
            await del(idbValidKey);
        },
        restoreClient: async () => {
            // eslint-disable-next-line no-return-await
            return await get<PersistedClient>(idbValidKey);
        },
    } as Persister;
}

const indexedDbPersister = createIDBPersister(OOA_CONFIG.serverConfig.id);

const container = document.getElementById('root')! as HTMLElement;
const root = createRoot(container);

root.render(
    <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
            buster: OOA_CONFIG.serverConfig.id,
            dehydrateOptions: {
                dehydrateQueries: true,
                shouldDehydrateQuery: (query) => {
                    const isSuccess = query.state.status === 'success';
                    const isLyricsQueryKey =
                        query.queryKey.includes('song') &&
                        query.queryKey.includes('lyrics') &&
                        query.queryKey.includes('select');

                    return isSuccess && isLyricsQueryKey;
                },
            },
            hydrateOptions: {
                defaultOptions: {
                    queries: {
                        cacheTime: Infinity,
                    },
                },
            },
            maxAge: Infinity,
            persister: indexedDbPersister,
        }}
    >
        <Notifications
            containerWidth="300px"
            position="bottom-center"
        />
        <App />
    </PersistQueryClientProvider>,
);
