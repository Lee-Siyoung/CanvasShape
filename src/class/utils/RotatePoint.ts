export const RotatePoint = (
  mouseX: number,
  mouseY: number,
  centerX: number,
  centerY: number,
  rotation: number
) => {
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  const rad = (-rotation * Math.PI) / 180;

  return {
    x: dx * Math.cos(rad) - dy * Math.sin(rad) + centerX,
    y: dx * Math.sin(rad) + dy * Math.cos(rad) + centerY,
  };
};
