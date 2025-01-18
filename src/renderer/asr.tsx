import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from './api';
import { OOA_SERVER_CONFIG } from './asr-config';
import { SurahAsr, TimeLoading } from './asr-svg';
import { Button, Text, TextTitle } from './components';
import { useAuthStoreActions } from './store/auth.store';

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: black;
`;

async function authenticate() {
    const data = await api.controller.authenticate(
        OOA_SERVER_CONFIG.url,
        {
            legacy: false,
            password: '',
            username: OOA_SERVER_CONFIG.username,
        },
        OOA_SERVER_CONFIG.type,
    );
    return {
        ...OOA_SERVER_CONFIG,
        ...data,
    };
}

const useAuthenticatedSession = () => {
    // Start with clear slate
    localStorage.clear();
    sessionStorage.clear();
    const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
    const { updateServer } = useAuthStoreActions();
    useEffect(() => {
        authenticate()
            .then((data) => {
                setStatus('ready');
                updateServer(OOA_SERVER_CONFIG.id, data);
            })
            .catch(() => {
                setStatus('error');
            });
    }, [updateServer]);
    return status;
};

function AppLoading() {
    return (
        <LoadingContainer>
            <SurahAsr />
            <TimeLoading />
        </LoadingContainer>
    );
}

function AppError() {
    return (
        <LoadingContainer>
            <TextTitle>Failed to load the app.</TextTitle>
            <Text>If the problem persists, please contact us.</Text>
            <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.reload()}
            >
                Refresh
            </Button>
        </LoadingContainer>
    );
}

export const AsrApp = ({ children }: { children: React.ReactNode }) => {
    const status = useAuthenticatedSession();
    if (status === 'loading') {
        return <AppLoading />;
    }
    if (status === 'error') {
        return <AppError />;
    }
    return <>{children}</>;
};
