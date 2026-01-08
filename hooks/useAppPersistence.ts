import { useState, useEffect } from 'react';
import { OrderEventStatus, ApiSettings, DEFAULT_CAPACITY_CONFIG } from '../types';
import { voiceService } from '../services/VoiceService';
import { labelPrintService } from '../services/LabelPrintService';
import { routeStackService } from '../services/RouteStackService';

const STORAGE_KEY = 'LOGISTICS_ACTIVITY_STREAM';
const API_CONFIG_KEY = 'LOGISTICS_API_CONFIG';

export const useAppPersistence = () => {
    // Persistence logic: Initialize operationLog from LocalStorage
    const [operationLog, setOperationLog] = useState<Record<string, OrderEventStatus[]>>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    });

    // API Settings logic: Initialize from LocalStorage
    const [apiSettings, setApiSettings] = useState<ApiSettings>(() => {
        const saved = localStorage.getItem(API_CONFIG_KEY);
        return saved ? JSON.parse(saved) : {
            wpglbAuth: '',
            authorization: '',
            enabled: true,
            pickupEnabled: false,
            taskCode: '',
            ptId: 0,
            pickupSite: 0,
            voiceEnabled: true,
            autoPrintLabelEnabled: true,
            stackCapacity: 40,
            stackCapacityConfig: DEFAULT_CAPACITY_CONFIG
        };
    });

    // Persistence side-effects
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(operationLog));
    }, [operationLog]);

    useEffect(() => {
        localStorage.setItem(API_CONFIG_KEY, JSON.stringify(apiSettings));
        voiceService.setEnabled(apiSettings.voiceEnabled ?? true);
        labelPrintService.setEnabled(apiSettings.autoPrintLabelEnabled ?? true);
        // Use new capacity config if available, otherwise fall back to legacy
        if (apiSettings.stackCapacityConfig) {
            routeStackService.setCapacityConfig(apiSettings.stackCapacityConfig);
        } else {
            routeStackService.setCapacity(apiSettings.stackCapacity ?? 40);
        }
    }, [apiSettings]);

    // Initialize services on mount
    useEffect(() => {
        voiceService.setEnabled(apiSettings.voiceEnabled ?? true);
        labelPrintService.setEnabled(apiSettings.autoPrintLabelEnabled ?? true);
        if (apiSettings.stackCapacityConfig) {
            routeStackService.setCapacityConfig(apiSettings.stackCapacityConfig);
        } else {
            routeStackService.setCapacity(apiSettings.stackCapacity ?? 40);
        }
    }, []);

    return {
        operationLog,
        setOperationLog,
        apiSettings,
        setApiSettings
    };
};
