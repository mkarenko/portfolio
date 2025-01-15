import {atom} from 'recoil';

const getLanguageState = () => {
	const languageState = localStorage.getItem('language');
	return languageState ? languageState : 'en';
};

export const languageAtom = atom({
	key: 'languageState',
	default: getLanguageState(),
});
