export const playNotificationBeep = (
  frequency: number = 880, // Pitch in Hz (e.g., 880Hz = A5 note)
  type: OscillatorType = 'sawtooth', // 'sine', 'square', 'sawtooth', 'triangle'
  duration: number = 0.5 // Duration in seconds
): void => {
  if (typeof window === 'undefined') return;

  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;

  const context = new AudioCtx();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);

  // Smooth fade-out to prevent audio clicking sound
  gainNode.gain.setValueAtTime(0.1, context.currentTime); // Volume (0.0 to 1.0)
  gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + duration);
};

// Double chime helper (sounds like a traditional app notification)
export const playSuccessChime = (): void => {
  playNotificationBeep(523.25, 'sine', 0.1); // C5 note
  setTimeout(() => {
    playNotificationBeep(659.25, 'sine', 0.2); // E5 note
  }, 100);
};