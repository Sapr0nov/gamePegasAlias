import React, { FC, useEffect, useRef } from 'react'

interface CanvasProps {
  width: number
  height: number
  word: string
}

export const CanvasComponent: FC<CanvasProps> = ({
  width,
  height,
  word,
}: CanvasProps) => {
  if (typeof window == 'undefined') {
    const canvasRef = useRef(null)
    return (
      <canvas ref={canvasRef} id="round-game" height={height} width={width} />
    )
  }

  const canvasRef = useRef(null)
  const card = new Image()
  let counter = 1
  let prev = 0
  let now = 0
  let animationFrameId: number
  card.src =
    "data:image/svg+xml,%3Csvg width='472' height='303' viewBox='0 0 472 303' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_ddd_70_437)'%3E%3Crect x='27' y='27' width='420' height='251' rx='14' fill='%23E3EDF7'/%3E%3Crect x='27' y='27' width='420' height='251' rx='14' fill='url(%23paint0_linear_70_437)'/%3E%3Crect x='26.5' y='26.5' width='421' height='252' rx='14.5' stroke='url(%23paint1_linear_70_437)' stroke-opacity='0.46'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_ddd_70_437' x='0' y='0' width='472' height='303' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='4' dy='4'/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.434896 0 0 0 0 0.548322 0 0 0 0 0.690104 0 0 0 0.41 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_70_437'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='-6' dy='-6'/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='effect1_dropShadow_70_437' result='effect2_dropShadow_70_437'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='2' dy='2'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.446076 0 0 0 0 0.558333 0 0 0 0 0.67059 0 0 0 0.1 0'/%3E%3CfeBlend mode='normal' in2='effect2_dropShadow_70_437' result='effect3_dropShadow_70_437'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect3_dropShadow_70_437' result='shape'/%3E%3C/filter%3E%3ClinearGradient id='paint0_linear_70_437' x1='437.204' y1='271.983' x2='274.97' y2='56.2082' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white' stop-opacity='0.53'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_70_437' x1='427.556' y1='263.235' x2='103.314' y2='285.766' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23D6E3F3'/%3E%3Cstop offset='1' stop-color='white'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"

  useEffect(() => {
    if (canvasRef.current === null) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current

    const ctx: CanvasRenderingContext2D = canvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    let frameCount = 0

    const render = () => {
      frameCount++
      draw(ctx, frameCount)
      if (frameCount < 12) {
        animationFrameId = window.requestAnimationFrame(render)
      } else {
        cancelAnimationFrame(animationFrameId)
      }
    }
    render()
  }, [])

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const speed = 500
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.globalCompositeOperation = 'destination-over'
    if (now === 0) now = frameCount
    const delta = frameCount < 12 ? frameCount / speed : 0

    if (prev !== frameCount) {
      counter = counter + delta
      prev = now

      let alpha = (10 / 3) * (1 - counter)
      if (alpha > 1) alpha = 1
      if (alpha < 0) alpha = 0

      ctx.globalAlpha = alpha

      ctx.font = 24 * counter + 'px Gilroy'
      ctx.textAlign = 'center'
      ctx.globalAlpha = 1 - alpha
      ctx.fillText(word, 240, 300 - counter * 120)

      ctx.globalAlpha = 1
      drawCard(ctx, card, counter - 0.2)
      drawCard(ctx, card, counter - 0.5)
      ctx.globalAlpha = 1 - alpha
      drawCard(ctx, card, counter - 0.8)
    }
  }

  function drawCard(
    ctx: CanvasRenderingContext2D,
    card: HTMLImageElement,
    scale: number
  ): void {
    // scale -1 0 1   0 - center
    const x = 15
    const y = 15
    const width = 420
    const height = 260
    const centrX = x + width / 2
    const centrY = y + height / 2

    ctx.drawImage(
      card,
      centrX - (scale * width) / 2 - (1 - scale) * 100,
      centrY - (scale * height) / 2 + (1 - scale) * 50,
      centrX + (scale * width) / 2,
      centrY + (scale * height) / 2 + (1 - scale) * 50
    )
  }

  return (
    <canvas ref={canvasRef} id="round-game" height={height} width={width} />
  )
}

CanvasComponent.defaultProps = {
  width: 460,
  height: 350,
}

export default CanvasComponent
