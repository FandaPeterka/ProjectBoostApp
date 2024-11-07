import React, { useRef, useEffect } from 'react';
import './Fish.css';

const bg = [18, 10, 34];
const cols = ['#FF5722', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#B71C1C', '#00BCD4', '#00BCD4', '#009688'];

const Fish = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const Particle = (canvas) => {
        let pos = {
            x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
            y: Math.random() * canvas.height * 0.8 + canvas.height * 0.1
        };
        let speed = 6;
        let step = Math.random() * 400;
        let vx = Math.random() * speed / 4 - speed / 8;
        let vy = Math.random() * speed / 4 - speed / 8;
        let colIndex = Math.floor(Math.random() * cols.length);
        let history = [];

        const update = () => {
            step++;
            step %= 400;
            if (history.length > 5) {
                history.shift();
            }
            pos.x += vx;
            pos.y += vy;
            vx = vx * 0.98 + (Math.random() * speed * 2 - speed) * 0.12;
            vy = vy * 0.98 + (Math.random() * speed * 2 - speed) * 0.12;

            let dx = mouse.current.x - pos.x;
            let dy = mouse.current.y - pos.y;
            if (step > 365) {
                vx = vx * 0.9 + dx * 0.004;
                vy = vy * 0.9 + dy * 0.004;
                vx = Math.min(vx, 4.0);
                vy = Math.max(vy, -4.0);
            }
            
            if (step > 100 && step < 110) {
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < (canvas.height / 8 * canvas.height / 8)) {
                    vx = vx * 0.9 - dx * 0.002;
                    vy = vy * 0.9 - dy * 0.002;
                }
            }

            if (history.length > 4) {
                let ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
                for (let i = history.length - 1; i >= 0; i--) {
                    ctx.lineTo(history[i].x, history[i].y);
                }
                ctx.strokeStyle = cols[colIndex];
                ctx.lineWidth = 2;
                ctx.lineJoin = "round";
                ctx.stroke();
            }

            if (pos.x > canvas.width || pos.x < 0 || pos.y > canvas.height || pos.y < 0) {
                return false; // Indicates particle should be reset
            }

            history.push({ x: pos.x, y: pos.y });
            return true; // Continues existing particle
        };

        return { update };
    };

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let localParticles = Array.from({ length: 400 }, () => Particle(canvas));

        const fade = (amt) => {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${amt})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const draw = () => {
            fade(0.3);
            localParticles = localParticles.filter(particle => particle.update());
            while (localParticles.length < 400) {
                localParticles.push(Particle(canvas));
            }
        };

        document.onmousemove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            localParticles = Array.from({ length: 400 }, () => Particle(canvas));
        };

        window.addEventListener('resize', resize);
        const intervalId = setInterval(draw, 1000 / 30);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', resize);
            document.onmousemove = null;
        };
    }, []);

    return (
        <div className="fishs-container">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Fish;