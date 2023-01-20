import * as States from './States';

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

export { useRecoilState, useRecoilValue, useSetRecoilState };

export const Recoil = {
    Page: {
        Atom: States.ATPage
    },
    Results: {
        Atom: States.ATResults
    },
    Pokemon: {
        Atom: States.ATSelectedPokemon
    },
    User: {
        Atom: States.ATUser
    },
    DarkMode: {
        Atom: States.ATDarkMode
    }
};