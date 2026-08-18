"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import * as maplibregl from "maplibre-gl";
import type { Map as MapLibreMap, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type MapContextValue = { map: MapLibreMap | null };

const MapContext = createContext<MapContextValue>({ map: null });

type MapProps = {
  className?: string;
  styles: { light?: StyleSpecification | string; dark?: StyleSpecification | string };
  center: [number, number];
  zoom: number;
  pitch?: number;
  bearing?: number;
  theme?: "light" | "dark";
  minZoom?: number;
  maxZoom?: number;
  children?: ReactNode;
};

export function Map({
  className,
  styles,
  center,
  zoom,
  pitch = 0,
  bearing = 0,
  theme = "light",
  minZoom,
  maxZoom,
  children,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapLibreMap | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const style = theme === "dark" ? (styles.dark ?? styles.light) : (styles.light ?? styles.dark);
    if (!style) return;

    const instance = new maplibregl.Map({
      container: containerRef.current,
      style,
      center,
      zoom,
      pitch,
      bearing,
      minZoom,
      maxZoom,
    });

    instance.on("load", () => setMap(instance));

    return () => {
      instance.remove();
      setMap(null);
    };
    // Initial camera and style are applied once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {map ? <MapContext.Provider value={{ map }}>{children}</MapContext.Provider> : null}
    </div>
  );
}

export function MapMarker({
  longitude,
  latitude,
  children,
}: {
  longitude: number;
  latitude: number;
  children?: ReactNode;
}) {
  const { map } = useContext(MapContext);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) return;

    const node = document.createElement("div");
    const marker = new maplibregl.Marker({ element: node, anchor: "bottom" })
      .setLngLat([longitude, latitude])
      .addTo(map);
    setElement(node);

    return () => {
      marker.remove();
      setElement(null);
    };
  }, [map, longitude, latitude]);

  if (!element) return null;
  return createPortal(children, element);
}

export function MarkerContent({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export function MapControls({
  position = "bottom-right",
  showZoom = false,
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showZoom?: boolean;
}) {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map || !showZoom) return;

    const control = new maplibregl.NavigationControl({
      showCompass: false,
      visualizePitch: false,
    });
    map.addControl(control, position);

    return () => {
      map.removeControl(control);
    };
  }, [map, position, showZoom]);

  return null;
}
