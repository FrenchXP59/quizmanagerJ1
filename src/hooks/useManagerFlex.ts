import { useState, useEffect } from 'react';
import { ManagerFlexState, Challenge, DiagnosticResult } from '../types/managerFlex';
import { calculateMaturityLevel } from '../logic/maturity';
import { generateChallenges } from '../logic/challenges';

const STORAGE_KEY = 'managerFlex_v1';

const INITIAL_STATE: ManagerFlexState = {
    initialDiagnostic: null,
    challenges: [],
    reDiagnostic: null,
    maturityLevel: 1
};

export const useManagerFlex = () => {
    const [state, setState] = useState<ManagerFlexState>(INITIAL_STATE);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setState({
                    ...parsed,
                    maturityLevel: calculateMaturityLevel(parsed) // Recalculate to be sure
                });
            } catch (e) {
                console.error("Failed to parse managerInfo", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Auto-save removed to prevent race conditions during navigation
    // We now save synchronously in each action
    /*
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state, isLoaded]);
    */

    const saveInitialDiagnostic = (result: DiagnosticResult) => {
        const newChallenges = generateChallenges(result);
        const newState: ManagerFlexState = {
            initialDiagnostic: result,
            challenges: newChallenges,
            reDiagnostic: null,
            maturityLevel: 1
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState)); // Sync Save
        setState(newState);
    };

    const updateChallenge = (id: string, completed: boolean, feedback: string) => {
        // Use current state for calculation
        const newChallenges = state.challenges.map(c =>
            c.id === id ? { ...c, completed, feedback } : c
        );

        const tempState = { ...state, challenges: newChallenges };
        const newMaturity = calculateMaturityLevel(tempState);

        const newState: ManagerFlexState = {
            ...state,
            challenges: newChallenges,
            maturityLevel: newMaturity
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState)); // Sync Save
        setState(newState);
    };

    const canRetakeDiagnostic = (): boolean => {
        // 3 challenges checked AND feedback > 20 chars for each
        if (state.challenges.length === 0) return false;
        return state.challenges.every(c => c.completed && c.feedback.length >= 20);
    };

    const saveReDiagnostic = (result: DiagnosticResult) => {
        const tempState = { ...state, reDiagnostic: result };
        const newState: ManagerFlexState = {
            ...state,
            reDiagnostic: result,
            maturityLevel: calculateMaturityLevel(tempState)
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState)); // Sync Save
        setState(newState);
    };

    const resetAll = () => {
        localStorage.removeItem(STORAGE_KEY);
        setState(INITIAL_STATE);
    };

    return {
        state,
        isLoaded,
        saveInitialDiagnostic,
        updateChallenge,
        canRetakeDiagnostic,
        saveReDiagnostic,
        resetAll
    };
};
