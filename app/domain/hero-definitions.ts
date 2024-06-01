import {Hero} from "@/app/domain/domain-interfaces";
import {TestSkill} from "@/app/domain/skill-definitions";

export const TestHero: Hero =
    {
        id: "1",
        name: "Test Hero",
        description: "A test hero",
        baseMovement: 2,
        baseHealth: 100,
        baseMana: 100,
        manaRegen: 10,
        baseAttack: 50,
        baseDefense: 50,
        baseMagic: 50,
        baseResistance: 50,
        healthPerLevel: 5,
        attackPerLevel: 5,
        defensePerLevel: 5,
        magicPerLevel: 5,
        resistancePerLevel: 5,
        skills: [ TestSkill ]
    };

export const heroes: Hero[] = [
    TestHero,
];