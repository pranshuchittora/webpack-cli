/* eslint-disable @typescript-eslint/explicit-function-return-type */
const chalk = require('chalk');
const commandLineUsage = require('command-line-usage');

const { stdWrite } = require('../utils/process-log');
class HelpGroup {
    outputHelp(command = null) {
        if (command !== null) {
            const commands = require('../utils/commands').info;
            const { bold, underline } = chalk.white;
            const header = head => bold(underline(head));

            const options = commands.find(cmd => cmd.name === command || cmd.alias === command);
            const usage = chalk.keyword('orange')('webpack ' + options.usage);
            const description = options.description;

            stdWrite(`${header('Usage')}: ${usage}\n${header('Description')}: ${description}\n`);
            if (options.flags) {
                const flags = commandLineUsage({
                    header: 'Options',
                    optionList: options.flags,
                });
                stdWrite(flags);
            }
        } else {
            stdWrite(this.run().outputOptions.help);
        }
        stdWrite('\n                  Made with ♥️  by the webpack team \n');
    }

    outputVersion() {
        const pkgJSON = require('../../package.json');
        const webpack = require('webpack');
        stdWrite(`\nwebpack-cli ${pkgJSON.version}`);
        stdWrite(`\nwebpack ${webpack.version}\n`);
    }

    run() {
        const { underline, bold } = chalk.white;
        const chalkOrange = s => chalk.keyword('orange')(s);
        const options = require('../utils/cli-flags');
        const title = bold('⬡                     ') + underline('webpack') + bold('                     ⬡');
        const desc = 'The build tool for modern web applications';
        const websitelink = '         ' + underline('https://webpack.js.org');

        const usage = `${bold('Usage')}: \`${chalkOrange('webpack [...options] | <command>')}\``;
        const examples = `${bold('Example')}: \`${chalkOrange('webpack help --flag | <command>')}\``;

        const hh = `          ${title}\n
		${websitelink}\n
		${desc}\n
		${usage}\n
		${examples}\n
`;
        const sections = commandLineUsage([
            {
                content: hh,
                raw: true,
            },
            {
                header: 'Available Commands',
                content: options.commands.map(e => {
                    return { name: e.name, summary: e.description };
                }),
            },
            {
                header: 'Options',
                optionList: options.core,
            },
        ]);
        return {
            outputOptions: {
                help: sections,
            },
        };
    }
}

module.exports = HelpGroup;
