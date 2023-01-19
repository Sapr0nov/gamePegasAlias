let context: AudioContext

if (typeof window !== 'undefined') {
  context = new AudioContext()
}

const playNote = (frequency: number, startTime: number, duration: number) => {
  const osc1 = context.createOscillator(),
    osc2 = context.createOscillator(),
    volume = context.createGain()

  osc1.type = 'triangle'
  osc2.type = 'triangle'

  volume.gain.value = 0.1

  osc1.connect(volume)
  osc2.connect(volume)
  volume.connect(context.destination)

  osc1.frequency.value = frequency + 1
  osc2.frequency.value = frequency - 2

  volume.gain.setValueAtTime(0.1, startTime + duration - 0.05)
  volume.gain.linearRampToValueAtTime(0, startTime + duration)

  osc1.start(startTime)
  osc2.start(startTime)

  osc1.stop(startTime + duration)
  osc2.stop(startTime + duration)
}

const playStartSound = () => {
  if (typeof window !== 'undefined') {
    playNote(550, context.currentTime, 0.1)
  }
}

export default playStartSound
