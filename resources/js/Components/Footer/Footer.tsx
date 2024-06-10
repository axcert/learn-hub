const Footer = () => {
     const date = new Date();
    return (
        <>
            <footer className="py-4">
                <div className="container mx-auto text-center">
                    <div className="flex flex-wrap justify-center space-x-2 text-sm text-center text-gray-800">
                        <div>
                            Copyright &copy; {date.getFullYear()}, Axcertro LMS
                        </div>
                        <span className="mx-1">-</span>
                        <div>
                            A Great Product of{" "}
                            <a
                                target="_blank"
                                href="https://axcertro.com?ref=lms"
                                className="font-[800] underline"
                            >
                                Axcertro
                            </a>{" "}
                            <span>that made With ❤️</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;