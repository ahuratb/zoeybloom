"use client";

import { ButtonHTMLAttributes, forwardRef, useRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
  radius?: number;
};

const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { children, className = "", strength = 0.35, radius = 110, ...rest },
  forwardedRef
) {
  const localRef = useRef<HTMLButtonElement>(null);
  // mount magnetic effect on the local ref
  useMagnetic(localRef, { strength, radius });

  // Wire both forwarded + local refs
  const setRefs = (node: HTMLButtonElement | null) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) (forwardedRef as React.RefObject<HTMLButtonElement | null>).current = node;
  };

  return (
    <button
      ref={setRefs}
      className={`inline-flex items-center justify-center will-change-transform ${className}`}
      {...rest}
    >
      <span className="pointer-events-none inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
});

export default MagneticButton;
