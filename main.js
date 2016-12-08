var commands = {
    man: {
        manual: ['man - display the manual of the command'],
        bin: function(args) {
            if (args.length > 0) {
                var f = args[0];
                if (commands.hasOwnProperty(f)) {
                    commands[f].manual.forEach(function(line) {
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
        manual: ['alert - Execute a JavaScript alert'],
        bin: function(args) {
            alert(args.join(' '));
        }
    },
    echo: {
        manual: ['echo - display a line of text'],
        bin: function(args) {
            displayLine(args.join(' '));
        }
    },
    whoami: {
        manual: ['whoami - print effective userid'],
        bin: function() {
            displayLine(user);
        }
    },
    clear: {
        manual: ['clear - clear the terminal screen'],
        bin: function() {
            display = [];
            printHistory();
        }
    },
    pwd: {
        manual: ['pwd - print name of current directory'],
        bin: function() {
            displayLine(currentFolder);
        }
    },
    ls: {
        manual: ['ls - print the current URL'],
        bin: function() {
            var arch = currentFolder.split('/');
            arch.shift();
            var cursorFolder = fileSystem;
            arch.forEach(function(folder) {
                if (cursorFolder.contents.hasOwnProperty(folder)) {
                    cursorFolder = cursorFolder.contents[folder];
                }
            });
            displayLine('drwx------ .');
            for (var file in cursorFolder.contents) {
                if (cursorFolder.contents.hasOwnProperty(file)) {
                    var prefix = '?';
                    if (cursorFolder.contents[file].hasOwnProperty('type')) {
                        prefix = cursorFolder.contents[file].type[0];
                    }
                    displayLine(prefix + 'rwxrwxrwx ' + file);
                }
            }
        }
    },
    cd: {
        manual: [''],
        bin: function(args) {
            var destination;
            var arch = currentFolder.split('/');
            var cursorFolder = fileSystem;

            if (args.length === 0) {
                destination = ['', 'home'];
            } else {
                destination = args[0].split('/');
            }

            if (destination[0] === '') {
                arch = [];
                destination.shift();
            }

            if (destination[0] === '.') {
                destination.shift();
            } else if (destination[0] === '..') {
                destination.shift();
                arch.pop();
            }
            currentFolder = '';
            arch.forEach(function(folder) {
                if (cursorFolder.contents.hasOwnProperty(folder)) {
                    cursorFolder = cursorFolder.contents[folder];
                    currentFolder += '/' + folder;
                }
            });

            destination.forEach(function(folder) {
                if (cursorFolder.contents.hasOwnProperty(folder)) {
                    if (cursorFolder.contents[folder].hasOwnProperty('type') && cursorFolder.contents[folder].type === 'directory') {
                        cursorFolder = cursorFolder.contents[folder];
                        currentFolder += '/' + folder;
                    } else {
                        displayLine('cd: ' + folder + ': Not a directory');
                    }
                } else {
                    displayLine('cd: ' + folder + ': No such file or directory');
                }
            });
        }
    },
    cat: {
        manual: ['cat - concatenate files and print on the standard output'],
        bin: function(args) {
            if (args.length > 0) {
                var arch = currentFolder.split('/');
                arch.shift();
                var cursorFolder = fileSystem;
                arch.forEach(function(folder) {
                    if (cursorFolder.contents.hasOwnProperty(folder)) {
                        cursorFolder = cursorFolder.contents[folder];
                    }
                });
                var file = args[0];
                if (cursorFolder.contents.hasOwnProperty(file)) {
                    if (cursorFolder.contents[file].hasOwnProperty('type')) {
                        if (cursorFolder.contents[file].type === 'file') {
                            cursorFolder.contents[file].contents.forEach(function(line) {
                                displayLine(line);
                            });
                        } else if (cursorFolder.contents[file].type === 'directory') {
                            displayLine('cd: ' + file + ': Is a directory');
                        } else {
                            displayLine('cd: ' + file + ': Is not a file');
                        }
                    } else {
                        displayLine('cd: ' + file + ': Is not a file');
                    }
                } else {
                    displayLine('cd: ' + file + ': No such file or directory');
                }
            }
        }
    },
    reboot: {
        manual: ['reboot - reboot the terminal'],
        bin: function(args) {
            if (args.length > 0) {
                if (args[0] === 'now') {
                    window.location.reload(true);
                } else {
                    displayLine('reboot planned in ' + parseInt(args[0]).toString() + 'ms');
                    window.setTimeout(function() {
                        window.location.reload(true);
                    }, parseInt(args[0]));
                }
            } else {
                window.location.reload(true);
            }
        }
    }
};

var projects2016 = {
    type: 'directory',
    contents: {
        project1: {
            type: 'file',
            contents: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Quisque blandit vulputate nisi non scelerisque.',
                'Curabitur dolor nunc, convallis consectetur pretium sed, cursus eget purus.',
                'Suspendisse tincidunt sapien lacus, a imperdiet ipsum condimentum sit amet. Phasellus sed facilisis orci.',
                'Maecenas fermentum eleifend ligula placerat mattis.',
                'Fusce fermentum nisi sed metus condimentum feugiat. Cras id consequat urna.'
            ]
        }
    }
};

var readme = {
    type: 'file',
    contents: ['https://github.com/Jack3113/terminal/blob/master/README.md']
};

var projects2015 = {
    type: 'directory',
    contents: {}
};

var projects = {
    type: 'directory',
    contents: {2015: projects2015, 2016: projects2016}
};

var home = {
    type: 'directory',
    contents: {
        projects: projects,
        README: readme
    }
};

var fileSystem = {
    type: 'directory',
    contents: {
        home: home
    }
};

var currentFolder = '/home';

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

var user = 'hack';
var machine = 'jack';
var path = '~';

var prompt = '';
var display = [];
var identifier = user + '@' + machine + ':' + path + '# ';
var version = '0.0.12';

function replaceLinks(match, p1, p2, p3, offset, string) {
    var reverseAmpRegexp = new RegExp('&amp;', 'gi');
    p1 = p1.replace(reverseAmpRegexp, '&');
    return '<a href="' + p1 + '" target="_blank">' + p1 + '</a>';
}

function toHTML(str) {
    if (typeof str === 'string') {
        var ampRegexp = new RegExp('&', 'gi');
        var quoteRegexp = new RegExp('"', 'gi');
        var ltRegexp = new RegExp('<', 'gi');
        var gtRegexp = new RegExp('>', 'gi');
        var startLinkRegexp = new RegExp('((https?|file|ftp|about|chrome):(//)?[^ ]*)');
        str = str.replace(ampRegexp, '&amp;').replace(quoteRegexp, '&quot;').replace(ltRegexp, '$lt;').replace(gtRegexp, '&gt;');
        return str.replace(startLinkRegexp, replaceLinks);
    }
    return str;
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
    var output = display.map(function(line) {
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
    displayLine('Sources: https://github.com/Jack3113/terminal');
    displayLine('Author: HackJack [ http://hackjack.info ]');
    displayLine('Version: ' + version);
    displayLine(' ');
    var now = new Date();
    displayLine(now.toString());
    displayLine(' ');

    document.getElementById('identifier').innerHTML = identifier;
}

function flashCursor() {
    window.setInterval(function() {
        document.getElementById('cursor').innerHTML = '_';
    }, 1000);
    window.setTimeout(function() {
        window.setInterval(function() {
            document.getElementById('cursor').innerHTML = '';
        }, 1000);
    }, 500);
}

window.addEventListener('load', function() {
    flashCursor();
    load();
    window.addEventListener('keypress', function(event) {
        if (event.key) {
            if (printableCharacters.indexOf(event.key.toLowerCase()) > -1) {
                event.preventDefault();
                addChar(event.key);
            }
            else if (event.key === "Backspace") {
                event.preventDefault();
            }
            else if (event.key === "Enter") {
                event.preventDefault();
                cleanPrompt();
            }
        }
    });

    window.addEventListener('keyup', function(event) {
        if (event.key === "Backspace") {
            event.preventDefault();
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === "Backspace") {
            event.preventDefault();
            deleteLastChar();
        }
    });
}, false);