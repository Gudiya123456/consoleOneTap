const Footer = () => {
    console.log('************    footer')
    return <div className="dark:text-white-dark text-center  ltr:sm:text-left rtl:sm:text-right p-6 pt-0 mt-auto">© {new Date().getFullYear()}. Onetap Dine All rights reserved.</div>;
};

export default Footer;
