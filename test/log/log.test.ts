import { expect, assert } from 'chai';
import {
    IEnv,
    logSeprate,
    logAlias,
    br,
    logHelp,
    logHelpMore,
    logInfo,
    getMaxLength,
    logSymbol,
    logFace,
    logVersion,
} from '../../src/log/log';
import monk_log, { isAnyOfFace } from './monk_log';

const stringBilder = (str: string[]): string => {
    return str.join('\r\n');
}

describe('test common logging functions from log/log.ls', (): void => {

    let enviorment;

    beforeEach(() => {
        enviorment = {
            mode: 'test',
            auto: false,
            test: false,
            fetch: false,
            output: false,
            debug: false,
            rename: false,
            yes: false,
            texture: [],
        }
    });

    it('test log alias function', (): void => {
        const func = () => {
            logAlias('after', 'before');
        }
        const re = monk_log(func);
        expect(re).to.be.deep.equal([
            'Tips: "ghoti after" is an alia of "ghoti before"',
        ]);
    });

    it('test log br function', (): void => {
        const func = () => {
            br();
        }
        const re = monk_log(func);
        expect(re).to.be.deep.equal([
            '\r\n',
        ]);
    });

    it('test log seprate function with argument 0', (): void => {
        const func = () => {
            logSeprate(0);
        }
        const re = monk_log(func);
        expect(re).to.be.deep.equal([
            '',
        ]);
    });

    it('test log seprate function with argument numbers', (): void => {
        const func = () => {
            logSeprate(3);
            logSeprate(5);
            logSeprate(1);
        }
        const re = monk_log(func);
        expect(re).to.be.deep.equal([
            '---',
            '-----',
            '-',
        ]);
    });

    it('test log seprate function multiple times', (): void => {
        const func = () => {
            logSeprate(3);
            logSeprate(3);
            logSeprate(1);
        }
        const re = monk_log(func);
        expect(re).to.be.deep.equal([
            '---',
            '---',
            '-',
        ]);
    });
});

describe('test logs util functions', (): void => {

    it('test get maxlength', (): void => {
        const re = getMaxLength([
            'one',
            'manymany',
        ]);
        expect(re).to.be.equal(8);
    });
});

describe('test simple long log functions', (): void => {

    it('test log symbol', (): void => {
        let callback: () => void;
        const func = () => {
            callback = logSymbol('hello', 'world');
        }
        const re = monk_log(func);
        expect(re).to.be.deep.equal([
            '🐟  > 💫  Ghoti-CLI SYMBOL hello of \"world\":',
            '--------------------------------------------',
        ]);

        const func2 = () => {
            callback();
        }
        const re2 = monk_log(func2);
        expect(isAnyOfFace(re2[1])).to.be.true;
    });

    it('test log face', (): void => {
        const func = () => {
            logFace();
        }
        const re = monk_log(func);
        expect(isAnyOfFace(re[0])).to.be.true;
    });

    it('test log version', (): void => {
        const func = () => {
            logVersion();
        }
        const re = monk_log(func);
        const face: string = (re.pop() as string);
        expect(re).to.be.deep.equal([
            "🐟  > 📜  Ghoti-CLI Version:",
            "----------------------------",
            "    | version : 3.5.0",
            "      * try to update > npm install -g ghoti-cli",
            "    | info    : for more info, try \"ghoti help\"",
            "----------------------------",
        ]);
        expect(isAnyOfFace(face)).to.be.true;
    });
});
