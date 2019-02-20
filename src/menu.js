const menuData = [
    {
        name: 'Home',
        icon: 'home',
        path: 'home',
        hide_in_menu: false,
        children: [],
    },
    {
        name: 'Album',
        icon: 'authentication',
        path: 'album',
        hide_in_menu: false,
        children: [
            {
                name: 'Album Narratives',
                icon: null,
                path: 'album-narratives',
                hide_in_menu: false,
                children: [],
            },
            {
                name: 'New Narratives',
                icon: null,
                path: 'new-narratives',
                hide_in_menu: false,
                children: [],
            },
            {
                name: 'Seo',
                icon: null,
                path: 'seo',
                hide_in_menu: false,
                children: [],
            },
        ],
    },
];
export default menuData;
