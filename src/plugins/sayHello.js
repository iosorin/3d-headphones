const sayHello = () => {
    if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        const args = ['\n %c Made with ❤️ by Osorina Irina 🚀 %c http://osorina.github.io/ \n', 'border: 1px solid #000;color: #fff; background: #171717; padding:5px 0;', 'color: #fff; background: #1c1c1c; padding:5px 0;'];
        window.console.log.apply(console, args);
    }
    else if (window.console) {
        window.console.log('Made with love ❤️ by Osorina Irina 🚀 - http://osorina.github.io/');
    }
};

export default sayHello;
