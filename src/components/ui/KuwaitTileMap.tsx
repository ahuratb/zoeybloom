"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLang } from "@/hooks/useLang";
import { OFFICE_LOCATION } from "@/lib/kuwait-geo";

/**
 * Tile-based Kuwait map (OpenStreetMap) — shows real streets, neighborhoods,
 * landmarks. Renders client-only.
 *
 * NOTE: react-leaflet has React 19 peer-dep friction; we use leaflet directly
 * for full control.
 */
export default function KuwaitTileMap() {
  const { t } = useLang();
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const [lng, lat] = OFFICE_LOCATION; // [lng,lat]
    const center: L.LatLngTuple = [lat, lng]; // Leaflet wants [lat, lng]

    const map = L.map(mapRef.current, {
      center,
      zoom: 13,
      zoomControl: false,
      scrollWheelZoom: false,  // prevent hijacking page scroll
      attributionControl: true,
    });
    leafletMapRef.current = map;

    // CartoDB Voyager tiles — soft palette, full street detail, free
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
      }
    ).addTo(map);

    // Custom HQ marker — pulsing pink dot built from a DivIcon
    const hqIcon = L.divIcon({
      className: "zb-hq-marker",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      html: `
        <span class="zb-hq-ring zb-hq-ring--1"></span>
        <span class="zb-hq-ring zb-hq-ring--2"></span>
        <span class="zb-hq-core"></span>
        <span class="zb-hq-pip"></span>
      `,
    });

    const marker = L.marker(center, { icon: hqIcon }).addTo(map);
    marker
      .bindTooltip(`<span>✦ ${t.map.officeLabel}</span>`, {
        permanent: true,
        direction: "top",
        offset: [0, -8],
        className: "zb-hq-tooltip",
      })
      .openTooltip();

    // Light zoom-control on bottom-right (so users can still zoom)
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Ensure tiles render correctly after layout settles
    requestAnimationFrame(() => map.invalidateSize());

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
    // We intentionally only mount the map once; tooltip text updates via the
    // outer-section re-mount when lang flips (handled by remount key).
  }, [t.map.officeLabel]);

  return <div ref={mapRef} className="absolute inset-0 rounded-2xl overflow-hidden" />;
}
