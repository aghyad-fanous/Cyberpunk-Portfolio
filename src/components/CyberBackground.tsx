import { useRef, useEffect } from 'react';

interface TracePoint {
  path: { x: number; y: number }[];
  progress: number;
  speed: number;
  color: string;
  size: number;
  alive: boolean;
  trailProgress: number;
}

export const CircuitTracesDynamic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const colors = ['#2bf3f8', '#ad2b2e','#f0f']; // CYAN, RED
    const points: TracePoint[] = [];
    const paths: { x: number; y: number }[][] = [];

    const createRandomPath = () => {
      const startX = 0;
      const startY = height / 2 + (Math.random() - 0.5) * height / 2;
      const segmentLength = width / 3;
      const angleOffset = 30 * (Math.PI / 180);

      const path: { x: number; y: number }[] = [];
      let x = startX;
      let y = startY;
      path.push({ x, y });

      // خطوة أفقية
      x += segmentLength;
      path.push({ x, y });

      // خطوة مائلة
      x += segmentLength;
      y += segmentLength * Math.tan(angleOffset) * (Math.random() < 0.5 ? 1 : -1);
      path.push({ x, y });

      // خطوة أفقية لنهاية الشاشة
      x = width;
      path.push({ x, y });

      return path;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getPointOnPath = (path: { x: number; y: number }[], t: number) => {
      if (t >= 1) t = 1;
      const totalSegments = path.length - 1;
      let scaledT = t * totalSegments;
      let segmentIndex = Math.floor(scaledT);
      let segmentT = scaledT - segmentIndex;
      if (segmentIndex >= totalSegments) segmentIndex = totalSegments - 1;
      const p0 = path[segmentIndex];
      const p1 = path[segmentIndex + 1];
      const x = lerp(p0.x, p1.x, segmentT);
      const y = lerp(p0.y, p1.y, segmentT);
      return { x, y };
    };

    const spawnPointsBatch = (count: number) => {
      for (let i = 0; i < count; i++) {
        if (paths.length < 10) paths.push(createRandomPath());
        const path = paths[Math.floor(Math.random() * paths.length)];
        points.push({
          path,
          progress: 0,
          trailProgress: 0,
          speed: 0.02 + Math.random() * 0.02, // زيادة السرعة
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 3,
          alive: true,
        });
      }
    };

    // مراقبة ظهور الصفحة
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // دفعات مختلفة
    let fastInterval = setInterval(() => { if(isVisible) spawnPointsBatch(1); }, 1850);
    let slowInterval = setInterval(() => { if(isVisible) spawnPointsBatch(2); }, 700);

    const draw = () => {
      if (!ctx) return;
      if (!isVisible) {
        requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = '#000413';
      ctx.fillRect(0, 0, width, height);

      points.forEach((point) => {
        if (!point.alive) return;

        point.progress += point.speed;
        if (point.progress > 1) point.alive = false;

        point.trailProgress += point.speed;

        // رسم Trace خلف النقطة
        ctx.strokeStyle = point.color;
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = point.size;
        ctx.shadowBlur = 1;
        ctx.shadowColor = point.color;

        ctx.beginPath();
        const trailT = Math.min(point.trailProgress, 1);
        const trailEnd = Math.floor(trailT * (point.path.length - 1));
        ctx.moveTo(point.path[0].x, point.path[0].y);
        for (let i = 1; i <= trailEnd; i++) {
          ctx.lineTo(point.path[i].x, point.path[i].y);
        }
        if (trailEnd < point.path.length - 1) {
          const segT = (trailT * (point.path.length - 1)) % 1;
          const p0 = point.path[trailEnd];
          const p1 = point.path[trailEnd + 1];
          const x = lerp(p0.x, p1.x, segT);
          const y = lerp(p0.y, p1.y, segT);
          ctx.lineTo(x, y);
        }
        ctx.stroke();

        // رسم النقطة نفسها فوق الـ Trace
        if (point.alive) {
          const pos = getPointOnPath(point.path, point.progress);
          ctx.fillStyle = point.color;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, point.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(fastInterval);
      clearInterval(slowInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
  {/* Canvas الخلفية */}
  <canvas ref={canvasRef} className="w-full h-full" />

</div>

  )
};
