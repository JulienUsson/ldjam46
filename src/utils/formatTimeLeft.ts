export default function formatTimeLeft(elapsedTime: number, duration: number): string {
  const timeLeft = Math.floor(Math.max(duration - elapsedTime, 0))
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
