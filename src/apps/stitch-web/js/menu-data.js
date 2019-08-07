export default {
    menulist: [
        { name: 'Projects', icon: 'flag', color: '#2a3' },
        { name: 'Invoices', icon: 'file', color: '#06f' },
        { name: 'Animate', icon: 'image', color: '#42d' },
        { name: 'Settings', icon: 'cog', color: '#f00' },
    ],

    toCSSVars( menu, menuPrev ) {
        if ( !menu ) return {};

        const clr = tinycolor( menu.color );
        const clrPrev = menuPrev ? tinycolor( menuPrev.color ) : clr;

        // Return an object containing '--clr-main', etc.
        // (CSS variables are prefixed with double hyphens "--")
        return $$$.css.vars( {
            'clr-main': clr.toString(),
            'clr-main-dark': clr.darken( 10 ).toString(),
            'clr-main-lite': clr.lighten( 30 ).toString(),
            'clr-prev': clrPrev.toString(),
            'clr-prev-dark': clrPrev.darken( 10 ).toString(),
            'clr-prev-lite': clrPrev.lighten( 30 ).toString(),
        } );
    }
};