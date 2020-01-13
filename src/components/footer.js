import React, { useMemo } from 'react';

const Footer = () => {
    const year = useMemo(() => new Date().getFullYear(), []);

    return <footer>(c) {year}</footer>
}

export default Footer;