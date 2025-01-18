import { ServerListItem, ServerType } from './api/types';
import type { SettingsState } from './store';
import { AppTheme } from './themes/types';
import { CrossfadeStyle, FontType, Play, PlaybackStyle, PlaybackType, TableColumn } from './types';

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object | undefined
          ? RecursivePartial<T[P]>
          : T[P];
};

const uiSettings: RecursivePartial<SettingsState> = {
    css: {
        content: '',
        enabled: false,
    },
    discord: {
        clientId: '',
        enableIdle: false,
        enabled: false,
        showAsListening: false,
        showServerImage: false,
        updateInterval: 15,
    },
    font: {
        builtIn: 'Raleway',
        custom: null,
        system: null,
        type: FontType.BUILT_IN,
    },
    general: {
        accent: 'rgb(34, 197, 94)',
        albumArtRes: undefined,
        albumBackground: false,
        albumBackgroundBlur: 6,
        // artistItems,
        buttonSize: 20,
        disabledContextMenu: {
            addToFavorites: true,
            addToPlaylist: true,
            createPlaylist: true,
            deletePlaylist: true,
            download: true,
            removeFromFavorites: true,
            removeFromPlaylist: true,
            setRating: true,
            shareItem: true,
            showDetails: true,
        },
        doubleClickQueueAll: true,
        externalLinks: false,
        followSystemTheme: true,
        homeFeature: true,
        // homeItems,
        language: 'en',
        lastfmApiKey: '',
        nativeAspectRatio: false,
        passwordStore: undefined,
        playButtonBehavior: Play.NOW,
        playerbarOpenDrawer: false,
        resume: false,
        showQueueDrawerButton: false,
        sideQueueType: 'sideQueue',
        sidebarCollapseShared: false,
        sidebarCollapsedNavigation: false,
        // sidebarItems,
        sidebarPlaylistList: false,
        skipButtons: {
            enabled: false,
            skipBackwardSeconds: 5,
            skipForwardSeconds: 10,
        },
        theme: AppTheme.DEFAULT_DARK,
        themeDark: AppTheme.DEFAULT_DARK,
        themeLight: AppTheme.DEFAULT_LIGHT,
        volumeWheelStep: 5,
        volumeWidth: 60,
        zoomFactor: 100,
    },
    lyrics: {
        alignment: 'center',
        delayMs: 0,
        fetch: false,
        follow: true,
        fontSize: 46,
        fontSizeUnsync: 20,
        gap: 5,
        gapUnsync: 0,
        showMatch: true,
        showProvider: true,
        sources: [],
        translationApiKey: '',
        translationApiProvider: '',
        translationTargetLanguage: 'en',
    },
    playback: {
        audioDeviceId: undefined,
        crossfadeDuration: 5,
        crossfadeStyle: CrossfadeStyle.EQUALPOWER,
        mpvExtraParameters: [],
        mpvProperties: {
            audioExclusiveMode: 'no',
            audioFormat: undefined,
            audioSampleRateHz: 0,
            gaplessAudio: 'weak',
            replayGainClip: true,
            replayGainFallbackDB: undefined,
            replayGainMode: 'no',
            replayGainPreampDB: 0,
        },
        muted: false,
        scrobble: {
            enabled: true,
            scrobbleAtDuration: 240,
            scrobbleAtPercentage: 75,
        },
        style: PlaybackStyle.GAPLESS,
        transcode: {
            enabled: false,
        },
        type: PlaybackType.WEB,
        webAudio: true,
    },
    remote: {
        enabled: false,
        password: '',
        port: 4333,
        username: '',
    },
    tab: 'general',
    tables: {
        albumDetail: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.TRACK_NUMBER,
                    width: 50,
                },
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
                {
                    column: TableColumn.BIT_RATE,
                    width: 300,
                },
                {
                    column: TableColumn.PLAY_COUNT,
                    width: 100,
                },
                {
                    column: TableColumn.LAST_PLAYED,
                    width: 100,
                },
            ],
            rowHeight: 60,
        },
        fullScreen: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.ROW_INDEX,
                    width: 80,
                },
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
            ],
            followCurrentSong: true,
            rowHeight: 60,
        },
        nowPlaying: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.ROW_INDEX,
                    width: 80,
                },
                {
                    column: TableColumn.TITLE,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
                {
                    column: TableColumn.ALBUM,
                    width: 100,
                },
                {
                    column: TableColumn.ALBUM_ARTIST,
                    width: 100,
                },
                {
                    column: TableColumn.GENRE,
                    width: 100,
                },
                {
                    column: TableColumn.YEAR,
                    width: 100,
                },
            ],
            followCurrentSong: true,
            rowHeight: 30,
        },
        sideDrawerQueue: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
            ],
            followCurrentSong: true,
            rowHeight: 60,
        },
        sideQueue: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.ROW_INDEX,
                    width: 50,
                },
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
            ],
            followCurrentSong: true,
            rowHeight: 60,
        },
        songs: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.ROW_INDEX,
                    width: 50,
                },
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
                {
                    column: TableColumn.ALBUM,
                    width: 300,
                },
                {
                    column: TableColumn.ARTIST,
                    width: 100,
                },
                {
                    column: TableColumn.YEAR,
                    width: 100,
                },
            ],
            rowHeight: 60,
        },
    },
    window: {
        disableAutoUpdate: false,
        exitToTray: false,
        minimizeToTray: false,
        startMinimized: false,
        tray: true,
        // windowBarStyle: platformDefaultWindowBarStyle,
    },
};

export const OOA_SERVER_CONFIG: ServerListItem = {
    credential: '',
    features: {
        lyricsMultipleStructured: false,
        lyricsSingleStructured: false,
        playlistsSmart: false,
        publicPlaylist: false,
        sharingAlbumSong: false,
    },
    id: 'asr',
    name: 'jellyfin',
    savePassword: false,
    type: ServerType.JELLYFIN,
    url: 'oathofasr.com/api/listen',
    userId: null,
    username: 'oathofasr-ui',
};

export const OOA_CONFIG = {
    apiSettings: {
        trackScrollable: false,
    },
    serverConfig: OOA_SERVER_CONFIG,
    ui: {
        // this is for now till i fix webpack
        logo: '/favicon.ico',
        showUpdateNotification: false,
        title: 'Oath of Asr',
    },
    uiSettings,
} as const;
