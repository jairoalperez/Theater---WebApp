import { CharacterActor } from "./characterActor.t";
import { CharacterPlay } from "./characterPlay.t";

export interface Character {
    characterId?: number;
    name?: string;
    description?: string;
    age?: string;
    gender?: string;
    principal?: boolean;
    image?: string;
    actor?: CharacterActor;
    play?: CharacterPlay;
}