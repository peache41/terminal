var commands = {
    man: {
        manual: ['Display the manual of the command'],
        bin: function (args) {
            if (args.length > 0) {
                var f = args[0];
                if (commands.hasOwnProperty(f)) {
                    commands[f].manual.forEach(function (line) {
                        displayLine(line);
                    });
                } else {
                    displayLine('man: ' + f + ': command not found');
                }
            } else {
                displayLine('What manual page do you want?');
            }
        }
    },
    alert: {
        manual: ['Exectute a JavaScript alert'],
        bin: function (args) {
            alert(args.join(' '));
        }
    }
};

var printableCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '\'',
    '"',
    '?',
    '/',
    '-',
    ':',
    '\\',
    '~',
    '&',
    '=',
    '+',
    '(',
    ')',
    '{',
    '}',
    '[',
    ']',
    '|',
    '_',
    '*',
    '$',
    '%',
    '!',
    ';',
    ',',
    '.',
    ' ',
    '@'
];

var prompt = '';
var display = [];
var identifier = 'hack@jack:~# ';
var version = 'v0.0.4';

function toHTML(str) {
    return str.replace(/&/gi, '&amp;').replace(/ /gi, '&nbsp;').replace(/"/gi, '&quot;');
}

function print() {
    var promptElmt = document.getElementById('keyboard');
    promptElmt.innerHTML = toHTML(prompt);
}

function displayLine(line) {
    display.push(line);
    printHistory();
}

function printHistory() {
    var historyElmt = document.getElementById('history');
    var output = display.map(function (line) {
        return toHTML(line);
    });
    historyElmt.innerHTML = output.join('<br/>');
    historyElmt.scrollTop = historyElmt.scrollHeight;
}

function addChar(char) {
    prompt += char;
    print();
}

function deleteLastChar() {
    if (prompt.length > 0) {
        prompt = prompt.slice(0, -1);
        print();
    }
}

function exec(command) {
    var input = command.split(' ');
    var f = input.shift();
    if (commands.hasOwnProperty(f)) {
        commands[f].bin(input);
    } else {
        displayLine('hackterm: ' + f + ': command not found');
    }
}

function cleanPrompt() {
    displayLine(identifier + prompt);
    if (prompt.length > 0) {
        exec(prompt);
    }
    prompt = '';
    print();
    printHistory();
}

function load() {
    displayLine('HHHHHHHHH     HHHHHHHHH                                     kkkkkkkk           TTTTTTTTTTTTTTTTTTTTTTT                                                            ');
    displayLine('H:::::::H     H:::::::H                                     k::::::k           T:::::::::::::::::::::T                                                            ');
    displayLine('H:::::::H     H:::::::H                                     k::::::k           T:::::::::::::::::::::T                                                            ');
    displayLine('HH::::::H     H::::::HH                                     k::::::k           T:::::TT:::::::TT:::::T                                                            ');
    displayLine('  H:::::H     H:::::H    aaaaaaaaaaaaa      cccccccccccccccc k:::::k    kkkkkkkTTTTTT  T:::::T  TTTTTTeeeeeeeeeeee    rrrrr   rrrrrrrrr      mmmmmmm    mmmmmmm   ');
    displayLine('  H:::::H     H:::::H    a::::::::::::a   cc:::::::::::::::c k:::::k   k:::::k         T:::::T      ee::::::::::::ee  r::::rrr:::::::::r   mm:::::::m  m:::::::mm ');
    displayLine('  H::::::HHHHH::::::H    aaaaaaaaa:::::a c:::::::::::::::::c k:::::k  k:::::k          T:::::T     e::::::eeeee:::::eer:::::::::::::::::r m::::::::::mm::::::::::m');
    displayLine('  H:::::::::::::::::H             a::::ac:::::::cccccc:::::c k:::::k k:::::k           T:::::T    e::::::e     e:::::err::::::rrrrr::::::rm::::::::::::::::::::::m');
    displayLine('  H:::::::::::::::::H      aaaaaaa:::::ac::::::c     ccccccc k::::::k:::::k            T:::::T    e:::::::eeeee::::::e r:::::r     r:::::rm:::::mmm::::::mmm:::::m');
    displayLine('  H::::::HHHHH::::::H    aa::::::::::::ac:::::c              k:::::::::::k             T:::::T    e:::::::::::::::::e  r:::::r     rrrrrrrm::::m   m::::m   m::::m');
    displayLine('  H:::::H     H:::::H   a::::aaaa::::::ac:::::c              k:::::::::::k             T:::::T    e::::::eeeeeeeeeee   r:::::r            m::::m   m::::m   m::::m');
    displayLine('  H:::::H     H:::::H  a::::a    a:::::ac::::::c     ccccccc k::::::k:::::k            T:::::T    e:::::::e            r:::::r            m::::m   m::::m   m::::m');
    displayLine('HH::::::H     H::::::HHa::::a    a:::::ac:::::::cccccc:::::ck::::::k k:::::k         TT:::::::TT  e::::::::e           r:::::r            m::::m   m::::m   m::::m');
    displayLine('H:::::::H     H:::::::Ha:::::aaaa::::::a c:::::::::::::::::ck::::::k  k:::::k        T:::::::::T   e::::::::eeeeeeee   r:::::r            m::::m   m::::m   m::::m');
    displayLine('H:::::::H     H:::::::H a::::::::::aa:::a cc:::::::::::::::ck::::::k   k:::::k       T:::::::::T    ee:::::::::::::e   r:::::r            m::::m   m::::m   m::::m');
    displayLine('HHHHHHHHH     HHHHHHHHH  aaaaaaaaaa  aaaa   cccccccccccccccckkkkkkkk    kkkkkkk      TTTTTTTTTTT      eeeeeeeeeeeeee   rrrrrrr            mmmmmm   mmmmmm   mmmmmm');
    displayLine(' ');
    displayLine('http://hackjack.info');
    displayLine(version);
    displayLine(' ');
    var now = new Date();
    displayLine(now.toString());
    displayLine(' ');

    document.getElementById('identifier').innerHTML = identifier;
}

window.addEventListener('load', function () {
    load();
    window.addEventListener('keyup', function (event) {
        if (event.key) {
            if (printableCharacters.indexOf(event.key) > -1) {
                event.preventDefault();
                addChar(event.key);
            }
            else if (event.key === "Backspace") {
                event.preventDefault();
                deleteLastChar();
            }
            else if (event.key === "Enter") {
                event.preventDefault();
                cleanPrompt();
            }
        }
    });

    window.addEventListener('keypress', function (event) {
        if (event.key === "Backspace") {
            event.preventDefault();
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === "Backspace") {
            event.preventDefault();
        }
    });

}, false);