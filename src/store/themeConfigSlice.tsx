import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import themeConfig from '../theme.config';

const defaultState = {
    isDarkMode: false,
    mainLayout: 'app',
    theme: 'light',
    menu: 'horizontal',
    layout: 'full',
    rtlClass: 'ltr',
    animation: '',
    navbar: 'navbar-sticky',
    locale: 'en',
    sidebar: false,
    pageTitle: '',
    languageList: [
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
    ],
    semidark: false,
    crmToken: '',
    permissions: {},
    profile: {},
    profileToken: '',
    colors:'',
};

const initialState = {
    theme: localStorage.getItem('theme') || themeConfig.theme,
    menu: themeConfig.menu,
    layout: localStorage.getItem('layout') || themeConfig.layout,
    rtlClass: localStorage.getItem('rtlClass') || themeConfig.rtlClass,
    animation: localStorage.getItem('animation') || themeConfig.animation,
    navbar: localStorage.getItem('navbar') || themeConfig.navbar,
    locale: localStorage.getItem('i18nextLng') || themeConfig.locale,
    isDarkMode: false,
    sidebar: localStorage.getItem('sidebar') || defaultState.sidebar,
    semidark: localStorage.getItem('semidark') || themeConfig.semidark,
    languageList: [
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
        { code: 'ae', name: 'Arabic' },
    ],

    crmToken: localStorage.getItem('crmToken') || themeConfig.crmToken,
    // userData: localStorage.getItem('userData') || themeConfig.userData || themeConfig.userData,
    userData: JSON.parse(localStorage.getItem('userData')) || themeConfig.userData || themeConfig.userData,
    // profileData: JSON.parse(localStorage.getItem('profileData')) || themeConfig.profileData || themeConfig.profileData,

    // userData: JSON.parse(localStorage.getItem('userData')) || themeConfig.userData || themeConfig.userData,

    crmData: localStorage.getItem('userData') || themeConfig.crmData || themeConfig.crmData,
    
    // crmData: JSON.parse(localStorage.getItem('crmData')) || themeConfig.crmData || themeConfig.crmData,
    // permissions: JSON.parse(localStorage.getItem('permissions')) || themeConfig.permissions,
    // profileData: JSON.parse(localStorage.getItem('profileData')) || themeConfig.profileData || themeConfig.profileData,
    // profileToken: localStorage.getItem('profileToken') || themeConfig.profileToken,
    colors: localStorage.getItem('colors') || themeConfig.colors,



};

const themeConfigSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        toggleTheme(state, { payload }) {
            payload = payload || state.theme; // light | dark | system
            localStorage.setItem('theme', payload);
            state.theme = payload;
            if (payload === 'light') {
                state.isDarkMode = false;
               if( state.colors=='black')
                {
                    state.colors='white'
                }
            } else if (payload === 'dark') {
                state.isDarkMode = true;
                if( state.colors=='white')
                    {
                        state.colors='black'
                    }
            }

            if (state.isDarkMode) {

                document.querySelector('body')?.classList.add('dark');
            } else {
                document.querySelector('body')?.classList.remove('dark');
            }
        },
        toggleMenu(state, { payload }) {
            payload = 'vertical'; // horizontal vertical, collapsible-vertical, horizontal
            state.sidebar = false; // reset sidebar state
            state.menu = payload;
        },
        toggleLayout(state, { payload }) {
            payload = payload || state.layout; // full, boxed-layout
            localStorage.setItem('layout', payload);
            state.layout = payload;
        },
        toggleRTL(state, { payload }) {
            payload = payload || state.rtlClass; // rtl, ltr
            localStorage.setItem('rtlClass', payload);
            state.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
        },
        toggleAnimation(state, { payload }) {
            payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
            payload = payload?.trim();
            localStorage.setItem('animation', payload);
            state.animation = payload;
        },
        toggleNavbar(state, { payload }) {
            payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
            localStorage.setItem('navbar', payload);
            state.navbar = payload;
        },
        toggleSemidark(state, { payload }) {
            payload = payload === true || payload === 'true' ? true : false;
            localStorage.setItem('semidark', payload);
            state.semidark = payload;
        },
        toggleLocale(state, { payload }) {
            payload = payload || state.locale;
            i18next.changeLanguage(payload);
            state.locale = payload;
        },
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },

        setPageTitle(state, { payload }) {
            document.title = `${payload} | Onetap`;
        },

        setCrmToken(state, { payload }) {
            localStorage.setItem('crmToken', payload);
            state.crmToken = payload;
        },
        setColors(state, { payload }) {
            console.log('#####')
            console.log('payload',payload)

            console.log('#####')

            localStorage.setItem('colors', payload);
            state.colors = payload;
        },
        // setProfileToken(state, { payload }) {
        //     localStorage.setItem('profileToken', payload);
        //     state.profileToken = payload;
        // },

      
        setUserData(state, { payload }) {
            localStorage.setItem('userData', JSON.stringify(payload));
            state.userData = payload;
        },
        setCrmData(state, { payload }) {
            localStorage.setItem('crmData', JSON.stringify(payload));
            state.crmData = payload;
            // document.getElementById('favIcon').href = window.location.origin + '/storage/' + payload.fav_icon;
             document.getElementById('favIcon') as HTMLLinkElement | null;

        },

        // setPermissions(state, { payload }) {
        //     localStorage.setItem('permissions', JSON.stringify(payload));
        //     state.permissions = payload;
        // },
        // setProfileData(state, { payload }) {
        //     localStorage.setItem('profileData', JSON.stringify(payload));
        //     state.profileData = payload;
        // },


    },
});

export const { setCrmData,setColors,  setUserData, setCrmToken, toggleTheme, toggleMenu, toggleLayout, toggleRTL, toggleAnimation, toggleNavbar, toggleSemidark, toggleLocale, toggleSidebar, setPageTitle } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
