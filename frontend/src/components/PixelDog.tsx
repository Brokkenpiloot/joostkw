"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const DOG_SIZE = 120;
const OFFSET_X = 16;
const HORIZON_VH = 82;
const LOOK_UP_MS = 200;
const JUMP_UP_MS = 180;
const FALL_DOWN_MS = 320;
const MOVING_IDLE_MS = 200;

type Direction = "left" | "right";
type JumpPhase = "idle" | "look-up" | "jump-up" | "fall-down";

const JUMP_SPRITE_SRC: Record<JumpPhase, string | null> = {
  idle: null,
  "look-up": "/Sprites/dog-looking-up.png",
  "jump-up": "/Sprites/dog-jumping.png",
  "fall-down": "/Sprites/dog-landing.png",
};

/**
 * Idle: front-facing or sideways (when moving). Jump: look-up → jumping → landing.
 */
function DogSprite({
  moving,
  direction,
  jumpPhase,
}: {
  moving: boolean;
  direction: Direction;
  jumpPhase: JumpPhase;
}) {
  const jumpSprite = JUMP_SPRITE_SRC[jumpPhase];
  const useJumpSprite = jumpSprite !== null;

  const src = useJumpSprite
    ? jumpSprite
    : moving
      ? "/Sprites/dog-moving-sideways.png"
      : "/Sprites/dog.png";
  const mirrored = !useJumpSprite && moving && direction === "right";

  return (
    <Image
      src={src}
      alt=""
      width={DOG_SIZE}
      height={DOG_SIZE}
      className="drop-shadow-[0_0_8px_var(--neon-cyan)]"
      style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
      aria-hidden
      unoptimized
    />
  );
}

export function PixelDog() {
  const [mouseX, setMouseX] = useState(0);
  const [dogY, setDogY] = useState(0);
  const [horizonY, setHorizonY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<Direction>("right");
  const [moving, setMoving] = useState(false);
  const [jumpPhase, setJumpPhase] = useState<JumpPhase>("idle");
  const lookUpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const movingIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevMouseXRef = useRef(0);
  const horizonYRef = useRef(0);
  const jumpPhaseRef = useRef(jumpPhase);
  horizonYRef.current = horizonY;
  jumpPhaseRef.current = jumpPhase;

  const updateHorizon = useCallback(() => {
    setHorizonY(window.innerHeight * (HORIZON_VH / 100));
  }, []);

  useEffect(() => {
    updateHorizon();
    window.addEventListener("resize", updateHorizon);
    return () => window.removeEventListener("resize", updateHorizon);
  }, [updateHorizon]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setVisible(true);
      const x = e.clientX + OFFSET_X;
      setMouseX(x);
      if (x < prevMouseXRef.current) setDirection("left");
      else if (x > prevMouseXRef.current) setDirection("right");
      prevMouseXRef.current = x;

      setMoving(true);
      if (movingIdleRef.current) clearTimeout(movingIdleRef.current);
      movingIdleRef.current = setTimeout(() => {
        setMoving(false);
        movingIdleRef.current = null;
      }, MOVING_IDLE_MS);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (movingIdleRef.current) clearTimeout(movingIdleRef.current);
    };
  }, []);

  useEffect(() => {
    if (horizonY === 0) return;
    setDogY(horizonY);
  }, [horizonY]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (horizonYRef.current === 0) return;
      if (jumpPhaseRef.current !== "idle") return;
      if (lookUpTimeoutRef.current) clearTimeout(lookUpTimeoutRef.current);

      const clickY = e.clientY;
      setJumpPhase("look-up");
      setDogY(horizonYRef.current);

      lookUpTimeoutRef.current = setTimeout(() => {
        lookUpTimeoutRef.current = null;
        setJumpPhase("jump-up");
        setDogY(clickY);
      }, LOOK_UP_MS);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
      // Do not clear lookUpTimeoutRef here: re-running this effect (e.g. when
      // jumpPhase changes to "look-up") must not cancel the scheduled jump.
    };
  }, [horizonY, jumpPhase]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName !== "top") return;
      setJumpPhase((phase) => {
        if (phase === "jump-up") {
          setDogY(horizonYRef.current);
          return "fall-down";
        }
        if (phase === "fall-down") return "idle";
        return phase;
      });
    },
    [],
  );

  if (!visible || horizonY === 0) return null;

  const transitionDurationMs =
    jumpPhase === "jump-up"
      ? JUMP_UP_MS
      : jumpPhase === "fall-down"
        ? FALL_DOWN_MS
        : 0;
  const transitionTiming =
    jumpPhase === "jump-up" ? "ease-out" : "ease-in";

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 right-0 z-[9998] h-px bg-neon-cyan/60 shadow-[0_0_12px_var(--neon-cyan)]"
        style={{ top: `${HORIZON_VH}vh` }}
        aria-hidden
      />

      <div
        className="pointer-events-none fixed z-[9999] transition-[top] ease-out"
        style={{
          left: mouseX,
          top: dogY,
          transform: "translate(-50%, -50%)",
          transitionDuration: `${transitionDurationMs}ms`,
          transitionTimingFunction: transitionTiming,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <DogSprite
          moving={moving}
          direction={direction}
          jumpPhase={jumpPhase}
        />
      </div>
    </>
  );
}
