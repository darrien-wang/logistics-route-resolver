/**
 * VoiceService - Text-to-speech announcements using Web Speech API
 * 
 * Provides voice feedback for route scanning operations.
 */

class VoiceService {
    private enabled: boolean = true;
    private synth: SpeechSynthesis;
    private voice: SpeechSynthesisVoice | null = null;

    constructor() {
        this.synth = window.speechSynthesis;
        this.initVoice();
    }

    /**
     * Initialize Chinese voice (prefer zh-CN)
     */
    private initVoice(): void {
        const loadVoices = () => {
            const voices = this.synth.getVoices();
            // Try to find Chinese voice
            this.voice = voices.find(v => v.lang.startsWith('zh')) || null;
        };

        loadVoices();
        // Voices may load asynchronously
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = loadVoices;
        }
    }

    /**
     * Speak text with configured voice
     */
    private speak(text: string): void {
        if (!this.enabled) return;

        // Cancel any ongoing speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        if (this.voice) {
            utterance.voice = this.voice;
        }

        utterance.lang = 'zh-CN';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        this.synth.speak(utterance);
    }

    /**
     * Announce route and stack number
     * Example: "路线 SD-007 第2栈"
     */
    announceRoute(routeName: string, stackNumber: number): void {
        const text = `路线 ${routeName} 第${stackNumber}栈`;
        this.speak(text);
    }

    /**
     * Announce stack full warning
     * Example: "注意！SD-007 第1栈已满，进入第2栈"
     */
    announceStackFull(routeName: string, oldStackNumber: number, newStackNumber: number): void {
        const text = `注意！${routeName} 第${oldStackNumber}栈已满，进入第${newStackNumber}栈`;
        this.speak(text);
    }

    /**
     * Enable or disable voice announcements
     */
    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!enabled) {
            this.synth.cancel();  // Stop any ongoing speech
        }
    }

    /**
     * Check if voice is enabled
     */
    isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * Stop any ongoing speech
     */
    stop(): void {
        this.synth.cancel();
    }
}

// Export singleton instance
export const voiceService = new VoiceService();
