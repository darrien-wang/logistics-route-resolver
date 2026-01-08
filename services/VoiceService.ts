/**
 * VoiceService - Audio feedback using Web Audio API
 * 
 * Provides beep sounds for status feedback:
 * - Success (Route found): Single "beep"
 * - Failure/Alert (Stack full, Error): Triple "beep-beep-beep"
 */

class VoiceService {
    private enabled: boolean = true;
    private audioContext: AudioContext | null = null;

    constructor() {
        // Initialize AudioContext on user interaction if needed, 
        // but here we try to instantiate it. Browsers might block auto-play 
        // until interaction, but typically ok in this app context.
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.error('Web Audio API not supported', e);
        }
    }

    private getContext(): AudioContext | null {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (e) {
                return null;
            }
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        return this.audioContext;
    }

    /**
     * Play a tone
     * @param frequency Hz
     * @param duration seconds
     * @param type oscillator type
     * @param startTime delay in seconds
     */
    private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', startTime: number = 0) {
        if (!this.enabled) return;
        const ctx = this.getContext();
        if (!ctx) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime + startTime;

        // Envelope to avoid clicking
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);

        oscillator.start(now);
        oscillator.stop(now + duration);
    }

    /**
     * Play Success Beep (Single "Bee")
     */
    playSuccess(): void {
        // 880Hz (A5) for 0.15s
        this.playTone(880, 0.15, 'sine');
    }

    /**
     * Play Error/Alert Beep (Triple "Bee-Bee-Bee")
     */
    playError(): void {
        // 440Hz (A4) - 3 quick beeps
        this.playTone(440, 0.1, 'square', 0);
        this.playTone(440, 0.1, 'square', 0.2);
        this.playTone(440, 0.1, 'square', 0.4);
    }

    /**
     * Legacy compatibility: Announce route -> Success Beep
     */
    announceRoute(routeName: string, stackNumber: number): void {
        this.playSuccess();
    }

    /**
     * Legacy compatibility: Stack Full -> Error/Alert Beep (Attention needed)
     */
    announceStackFull(routeName: string, oldStackNumber: number, newStackNumber: number): void {
        this.playError();
    }

    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    isEnabled(): boolean {
        return this.enabled;
    }

    stop(): void {
        if (this.audioContext) {
            this.audioContext.suspend();
        }
    }
}

// Export singleton instance
export const voiceService = new VoiceService();
