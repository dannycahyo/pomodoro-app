const turnOnNotificationSound = () => {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.type = "triangle";
  oscillator.frequency.value = 400;
  gain.gain.setValueAtTime(1, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1);
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + 1);
};

export { turnOnNotificationSound };
