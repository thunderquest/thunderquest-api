
export interface Hero {
    id: string;
    name: string;
    description: string;

    baseMovement: number;
    baseHealth: number;
    baseMana: number;
    manaRegen: number;
    baseAttack: number;
    baseDefense: number;
    baseMagic: number;
    baseResistance: number;

    healthPerLevel: number;
    attackPerLevel: number;
    defensePerLevel: number;
    magicPerLevel: number;
    resistancePerLevel: number;

    skills: Skill[];
}
export interface Skill {
    id: string;
    name: string;
    description: string;
}
