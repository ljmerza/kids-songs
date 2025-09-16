import { useEffect, useMemo, useRef } from "react";
import { AlphaTabApi, type json } from '@coderline/alphatab'
import { songToAlphaTex } from "./utils";
import type { KidsSong } from "./types";

export default function TabRenderer({ song }: { song: KidsSong }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<AlphaTabApi | null>(null);

  const alphaTex = useMemo(() => songToAlphaTex(song), [song]);

  useEffect(() => {
    if (!hostRef.current) return;

    const api = new AlphaTabApi(hostRef.current, {
      core: {
        useWorkers: true,
        fontDirectory: "/font/",
      },
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: '/soundfont/sonivox.sf2'
      },
      notation: { staveProfile: "tab" },
      display: { scale: 1.0 },
    } as json.SettingsJson);

    apiRef.current = api;

    api.error.on((e) => console.error("[alphaTab error]", e));
    api.scoreLoaded.on(() => console.log("[alphaTab] scoreLoaded"));
    api.renderStarted.on(() => console.log("[alphaTab] renderStarted"));
    api.renderFinished.on(() => console.log("[alphaTab] renderFinished"));

    // feed alphaTex
    api.tex(alphaTex);

    return () => {
      try { apiRef.current?.destroy(); } catch { console.warn("alphaTab destroy failed"); }
      apiRef.current = null;
    };
  }, [alphaTex]);

  return (
    <div>
      <div className="tab-host" ref={hostRef} />
      <div className="controls">
        <button onClick={() => apiRef.current?.play()}>Play</button>
        <button onClick={() => apiRef.current?.pause()}>Pause</button>
        <button onClick={() => apiRef.current?.stop()}>Stop</button>
      </div>
    </div>
  );
}
