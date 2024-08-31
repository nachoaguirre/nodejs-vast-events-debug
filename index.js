const { startServer } = require('./src/server');
const config = require('./config');
const { styleString } = require('./src/utils');
const { version } = require('./package.json');

startServer(config);

const banner = `${styleString(
  `
                                                                ██╗   ██╗ █████╗ ███████╗████████╗
                                                                ██║   ██║██╔══██╗██╔════╝╚══██╔══╝
                                                                ██║   ██║███████║███████╗   ██║
                                                                ╚██╗ ██╔╝██╔══██║╚════██║   ██║
                                                                 ╚████╔╝ ██║  ██║███████║   ██║
                                                                  ╚═══╝  ╚═╝  ╚═╝╚══════╝   ╚═╝
███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗    ██████╗ ███████╗██████╗ ██╗   ██╗ ██████╗
██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝    ██╔══██╗██╔════╝██╔══██╗██║   ██║██╔════╝
█████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗    ██║  ██║█████╗  ██████╔╝██║   ██║██║  ███╗
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║    ██║  ██║██╔══╝  ██╔══██╗██║   ██║██║   ██║
███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║    ██████╔╝███████╗██████╔╝╚██████╔╝╚██████╔╝
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝    ╚═════╝ ╚══════╝╚═════╝  ╚═════╝  ╚═════╝
                                                                                          v${version}
`,
  'yellow',
)}`;

console.log(banner);
console.log(
  `${styleString(`Server started.`, 'white', true)} ${styleString('Press Ctrl+C to stop.\n', 'white', false, true)}`,
);
