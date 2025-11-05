import { useEffect, useMemo, useRef } from "react";
import { songToAlphaTex } from "./utils";
import type { AlphaTabApi, json } from "@coderline/alphatab";
import type { KidsSong } from "./types";

export default function TabRenderer({ song }: { song: KidsSong }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<AlphaTabApi | null>(null);

  const alphaTex = useMemo(() => songToAlphaTex(song), [song]);

  useEffect(() => {
    let disposed = false;

    async function setup() {
      if (!hostRef.current) {
        return;
      }

      let AlphaTabApiCtor: typeof import("@coderline/alphatab").AlphaTabApi | undefined;
      try {
        ({ AlphaTabApi: AlphaTabApiCtor } = await import("@coderline/alphatab"));
      } catch (error) {
        console.error("[alphaTab] failed to load module", error);
        return;
      }

      if (!hostRef.current || disposed || !AlphaTabApiCtor) {
        return;
      }

      const api = new AlphaTabApiCtor(hostRef.current, {
        core: {
          // Running without the web worker keeps the bundle lean.
          useWorkers: false,
          fontDirectory: "/font/",
        },
        player: {
          enablePlayer: true,
          enableCursor: true,
          enableUserInteraction: true,
          soundFont: "/soundfont/sonivox.sf3",
        },
        notation: { staveProfile: "tab" },
        display: { scale: 1.0 },
      } as json.SettingsJson);

      apiRef.current = api;

      api.error.on((e) => console.error("[alphaTab error]", e));
      api.scoreLoaded.on(() => console.debug("[alphaTab] scoreLoaded"));
      api.renderStarted.on(() => console.debug("[alphaTab] renderStarted"));
      api.renderFinished.on(() => console.debug("[alphaTab] renderFinished"));

      api.tex(alphaTex);
    }

    setup();

    return () => {
      disposed = true;
      try {
        apiRef.current?.destroy();
      } catch {
        console.warn("alphaTab destroy failed");
      }
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
