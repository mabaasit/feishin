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

const useAuthenticatedSession = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const { updateServer } = useAuthStoreActions();

    useEffect(() => {
        updateServer(OOA_SERVER_CONFIG.id, OOA_SERVER_CONFIG);
    }, [updateServer]);

    useEffect(() => {
        async function fetchInfo () {
            try {
                await api.controller.getServerInfo({
                    apiClientProps: {
                        server: OOA_SERVER_CONFIG,
                    }
                })
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        };
        void fetchInfo()
    }, [])

    return { error, loading }
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
    const { error, loading } = useAuthenticatedSession();
    if (loading) return <AppLoading />;
    if (error) return <AppError />;
    return <>{children}</>;
};
