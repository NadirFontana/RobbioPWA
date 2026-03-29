import * as THREE from "three";
import { NPC } from "../hooks/useDialogue";

export type MapId =
  | "village"
  | "north" | "south" | "east" | "west"
  | "nw" | "ne" | "sw" | "se";

export interface Portal {
  position: [number, number, number];
  destination: MapId;
  spawnAtDestination: [number, number, number];
}

export interface MapConfig {
  label: string;
  color: string;
  size: [number, number];
  portals: Portal[];
  npcs: NPC[];
}

const FAR = 24;
const MED = 18;
const SPAWN_OFFSET = 8; // distanza dal portale di arrivo

export const MAPS: Record<MapId, MapConfig> = {
  village: {
    label: "Villaggio",
    color: "#7ab648",
    size: [60, 40],
    portals: [
      { position: [0, 1, -18],  destination: "north", spawnAtDestination: [0, 1, FAR - SPAWN_OFFSET] },
      { position: [0, 1, 18],   destination: "south", spawnAtDestination: [0, 1, -(FAR - SPAWN_OFFSET)] },
      { position: [FAR, 1, 0],  destination: "east",  spawnAtDestination: [-(FAR - SPAWN_OFFSET), 1, 0] },
      { position: [-FAR, 1, 0], destination: "west",  spawnAtDestination: [FAR - SPAWN_OFFSET, 1, 0] },
    ],
    npcs: [
      {
        id: "lia",
        name: "Lia",
        position: new THREE.Vector3(3, 1, -3),
        dialogues: [
          "Ciao! È bello vederti da queste parti!",
          "Stavo proprio pensando a te...",
          "Fai attenzione mentre esplori, il mondo è grande!",
        ],
      },
    ],
  },
  north: {
    label: "Foresta del Nord",
    color: "#2d6b1f",
    size: [60, 50],
    portals: [
      { position: [0, 1, FAR],    destination: "village", spawnAtDestination: [0, 1, -(16 - SPAWN_OFFSET)] },
      { position: [-FAR, 1, 0],   destination: "nw",      spawnAtDestination: [FAR - SPAWN_OFFSET, 1, 0] },
      { position: [FAR, 1, 0],    destination: "ne",      spawnAtDestination: [-(FAR - SPAWN_OFFSET), 1, 0] },
    ],
    npcs: [],
  },
  south: {
    label: "Pianure del Sud",
    color: "#c8b850",
    size: [60, 50],
    portals: [
      { position: [0, 1, -FAR],   destination: "village", spawnAtDestination: [0, 1, 16 - SPAWN_OFFSET] },
      { position: [-FAR, 1, 0],   destination: "sw",      spawnAtDestination: [FAR - SPAWN_OFFSET, 1, 0] },
      { position: [FAR, 1, 0],    destination: "se",      spawnAtDestination: [-(FAR - SPAWN_OFFSET), 1, 0] },
    ],
    npcs: [],
  },
  east: {
    label: "Colline Est",
    color: "#8fbc5a",
    size: [50, 60],
    portals: [
      { position: [-FAR, 1, 0],   destination: "village", spawnAtDestination: [FAR - SPAWN_OFFSET, 1, 0] },
      { position: [0, 1, -MED],   destination: "ne",      spawnAtDestination: [0, 1, MED - SPAWN_OFFSET] },
      { position: [0, 1, MED],    destination: "se",      spawnAtDestination: [0, 1, -(MED - SPAWN_OFFSET)] },
    ],
    npcs: [],
  },
  west: {
    label: "Paludi Ovest",
    color: "#4a7a5a",
    size: [50, 60],
    portals: [
      { position: [FAR, 1, 0],    destination: "village", spawnAtDestination: [-(FAR - SPAWN_OFFSET), 1, 0] },
      { position: [0, 1, -MED],   destination: "nw",      spawnAtDestination: [0, 1, MED - SPAWN_OFFSET] },
      { position: [0, 1, MED],    destination: "sw",      spawnAtDestination: [0, 1, -(MED - SPAWN_OFFSET)] },
    ],
    npcs: [],
  },
  nw: {
    label: "Grotte Nord-Ovest",
    color: "#5a5a6a",
    size: [40, 40],
    portals: [
      { position: [FAR, 1, 0],    destination: "north",   spawnAtDestination: [-(FAR - SPAWN_OFFSET), 1, 0] },
      { position: [0, 1, MED],    destination: "west",    spawnAtDestination: [0, 1, -(MED - SPAWN_OFFSET)] },
    ],
    npcs: [],
  },
  ne: {
    label: "Picchi Nord-Est",
    color: "#7a6a4a",
    size: [40, 40],
    portals: [
      { position: [-FAR, 1, 0],   destination: "north",   spawnAtDestination: [FAR - SPAWN_OFFSET, 1, 0] },
      { position: [0, 1, MED],    destination: "east",    spawnAtDestination: [0, 1, -(MED - SPAWN_OFFSET)] },
    ],
    npcs: [],
  },
  sw: {
    label: "Deserti Sud-Ovest",
    color: "#c8a050",
    size: [40, 40],
    portals: [
      { position: [FAR, 1, 0],    destination: "south",   spawnAtDestination: [-(FAR - SPAWN_OFFSET), 1, 0] },
      { position: [0, 1, -MED],   destination: "west",    spawnAtDestination: [0, 1, MED - SPAWN_OFFSET] },
    ],
    npcs: [],
  },
  se: {
    label: "Laghi Sud-Est",
    color: "#3a7a9a",
    size: [40, 40],
    portals: [
      { position: [-FAR, 1, 0],   destination: "south",   spawnAtDestination: [FAR - SPAWN_OFFSET, 1, 0] },
      { position: [0, 1, -MED],   destination: "east",    spawnAtDestination: [0, 1, MED - SPAWN_OFFSET] },
    ],
    npcs: [],
  },
};