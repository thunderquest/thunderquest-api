import prisma from '@/lib/prisma';
import {PlayerHero} from "@/src/types";
import {heroes} from "@/app/domain/hero-definitions";


export async function getPlayerHeroes(playerId: string): Promise<PlayerHero[]> {
    const dbPlayerHeroes = await prisma.playerHero.findMany({
        where: { playerId: playerId }
    });
    return dbPlayerHeroes.map(transformDbPlayerHeroToGraphQL)
}

export async function addHeroToPlayer(playerId: string, heroId: string): Promise<PlayerHero> {
    const dbPlayerHero = await prisma.playerHero.create({
        data: {
            playerId,
            heroId,
            level: 1,
        }
    });
    return transformDbPlayerHeroToGraphQL(dbPlayerHero);

}

export async function getPlayerParty(playerId: string): Promise<PlayerHero[]> {
    const dbResults = await prisma.playerHero.findMany({
        where: {
            playerId,
            partySlot: { not: null },
        },
        orderBy: {
            partySlot: 'asc',
        },
    });
    return dbResults.map(transformDbPlayerHeroToGraphQL);
}

export async function addHeroToPartySlot(playerId: string, playerHeroId: string, slot: number): Promise<PlayerHero> {
    if (slot < 1 || slot > 5) {
        throw new Error("Party slot must be between 1 and 5.");
    }

    const existingHeroInSlot = await prisma.playerHero.findFirst({
        where: {
            playerId,
            partySlot: slot,
        },
    });
    if (existingHeroInSlot) {
        throw new Error(`Party slot ${slot} is already occupied.`);
    }

    const dbResult = await prisma.playerHero.update({
        where: { id: playerHeroId },
        data: { partySlot: slot },
    });
    if (!dbResult) {
        throw new Error(`No hero found to update: ${playerHeroId}`);
    }
    return transformDbPlayerHeroToGraphQL(dbResult);
}

export async function removeHeroFromPartySlot(playerHeroId: string): Promise<PlayerHero> {
    const dbResult =  prisma.playerHero.update({
        where: { id: playerHeroId },
        data: { partySlot: null },
    });
    if (!dbResult) {
        throw new Error(`No hero found to update: ${playerHeroId}`);
    }
    return transformDbPlayerHeroToGraphQL(dbResult);
}


function transformDbPlayerHeroToGraphQL(dbPlayerHero: any): PlayerHero {
    const {heroId, ...rest} = dbPlayerHero;
    const hero = heroes.find(hero => hero.id === heroId);
    if (!hero) {
        throw new Error(`Hero not found for heroId: ${heroId}`);
    }

    return {
        hero: hero,
        ...rest
    }
}