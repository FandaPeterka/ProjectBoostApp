import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import MeteorsContext from './MeteorsContext';
import MeteorsSettingsModal from './MeteorsSettingsModal';
import './Meteors.css';

const starCount = 100; // Počet hvězd

const Meteor = () => {
    const [meteorCount, setMeteorCount] = useState(6);
    const [meteorSpeedFactor, setMeteorSpeedFactor] = useState(0.8);
    const [soundVolume, setSoundVolume] = useState(50);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const settingsTimeoutRef = useRef(null);

    const resetAndRedrawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const stars = Array.from({ length: starCount }, () => Star(ctx));
        const meteorites = Array.from({ length: meteorCount }, () => Meteorite(ctx, meteorSpeedFactor));

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => star.draw());
            meteorites.forEach(meteorite => meteorite.update());
            animationRef.current = requestAnimationFrame(render);
        };
        render();
    }, [meteorCount, meteorSpeedFactor]); // Závislosti funkce resetAndRedrawCanvas

    useEffect(() => {
        clearTimeout(settingsTimeoutRef.current); // Zrušíme předchozí timeout
        settingsTimeoutRef.current = setTimeout(() => {
            resetAndRedrawCanvas();
        }, 5000); // Nastavíme nový timeout

        return () => {
            clearTimeout(settingsTimeoutRef.current); // Uklidíme timeout při odmontování nebo před nastavením nového
        };
    }, [resetAndRedrawCanvas, meteorCount, meteorSpeedFactor]); // Sledujeme změny

    useEffect(() => {
        const resizeListener = () => {
            cancelAnimationFrame(animationRef.current);
            clearTimeout(settingsTimeoutRef.current); // Zrušíme timeout na překreslení
            settingsTimeoutRef.current = setTimeout(resetAndRedrawCanvas, 5000); // Nastavíme nový timeout pro překreslení
        };

        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
            cancelAnimationFrame(animationRef.current);
            clearTimeout(settingsTimeoutRef.current); // Uklidíme při odmontování
        };
    }, [resetAndRedrawCanvas]); // Nyní je resetAndRedrawCanvas v seznamu závislostí

    const value = useMemo(() => ({
        meteorCount, setMeteorCount,
        meteorSpeedFactor, setMeteorSpeedFactor,
        soundVolume, setSoundVolume,
        isModalOpen, setIsModalOpen
    }), [meteorCount, meteorSpeedFactor, soundVolume, isModalOpen]);

    return (
        <MeteorsContext.Provider value={value}>
            <canvas ref={canvasRef} className="MeteorCanvas"></canvas>
            <MeteorsSettingsModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </MeteorsContext.Provider>
    );
};

export default Meteor;

const Star = (context) => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const radius = Math.random() * 1.5;
    const draw = () => {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = 'white';
        context.fill();
    };
    return { draw };
};

const Meteorite = (context, speedFactor) => {
    const maxSpeed = 5;
    const minSpeed = 1;
    let x = Math.random() * window.innerWidth;
    let y = -Math.random() * window.innerHeight;
    const radius = Math.random() * 5;
    let baseSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    let speed = baseSpeed * speedFactor;
    let trailLength = Math.floor(Math.random() * 25 + 15);
    const update = () => {
        x += speed;
        y += speed * 0.8;
        if (x > window.innerWidth || y > window.innerHeight) {
            x = Math.random() * window.innerWidth;
            y = -20;
        }
        for (let i = 0; i <= trailLength; i++) {
            const alpha = (1 - i / trailLength);
            const fadeSize = Math.max(0, radius - (i * radius / trailLength));
            context.beginPath();
            context.arc(x - i * 2, y - i * 2, fadeSize, 0, Math.PI * 2);
            context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            context.fill();
        }
    };
    return { update };
};