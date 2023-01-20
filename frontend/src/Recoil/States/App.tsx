import { atom } from 'recoil';
import { IPokemon } from '../../Interfaces/IPokemon';

export const ATPage = atom<number>({
	key: 'pageAtom',
	default: 1,
});

export const ATResults = atom<10 | 20 | 50>({
	key: 'pageResults',
	default: 10,
});

export const ATSelectedPokemon = atom<IPokemon | undefined>({
	key: 'pokemon',
	default: undefined,
});

export const ATUser = atom<string | undefined>({
	key: 'user',
	default: undefined,
});

export const ATDarkMode = atom<boolean>({
	key: 'darkmode',
	default: false,
});


