
Conversation opened. 1 unread message.

  Skip to content
Using Gmail with screen readers

More
1 of 882

Relay - preliminary nodejs code
Inbox
x

Julian Pollak <julian.peter.pollak@gmail.com>
Attachments1:16 PM (10 minutes ago)
to me

Attachments area

Click here to Reply or Forward
2.86 GB (19%) of 15 GB used
Manage
Terms · Privacy · Program Policies
Last account activity: 26 minutes ago
Details


let exec = require('child_process').exec;

/*
    JAR

    The command to be run to access the relay.

    The first part runs java expecting a jar. (assumes java location)
    The second part is the name of the jar. (assumes the name of the jar)

    note: ./ assumes that the jar is in the same directory as the node app

    // The second part can be rewritten to be passed as a parameter
*/
const JAVA = '/usr/bin/java -jar ';
const JAR = './DenkoviRelayCommandLineTool_27.jar ';
const FTDI_ID = 'DAE002Nb ';
const RELAY = JAVA + JAR + FTDI_ID;

/*
    Command List:
    These commands are appended to the call to the relay jar (JAR).

    0. FAIL => a command that should fail deliberatly - for testing

    1. LIST => triggers the list command
    2. HELP => triggers the help command
    .....
    (more commands to come)
*/
let FAIL = 'info';
let LIST = 'list';
let HELP = 'help';
let ON1  = '4 1 1';

/*
    runCommand:
        Runs a console command in a child process

    input:
        command - the required command.
        success - the function to call in case of success.
        fail - the function to call in case of failure.

    Output:
        stderr => redirected to console.   // Can be changed if needed
        stdout => redirected to success function.
        error => redirected to fail function.
*/
function runCommand( command, success, fail ) {
  let child = exec( command, (error, stdout, stderr) => {

    if ( stderr !== "" ) console.log('stderr: ' + stderr);

    if ( error !== null ){
      fail( command, error );
    } else {
      success( command, stdout );
    }
  });
}

/*
    relay
    A wrapper command used for readability
*/
function relay( command, success, fail ) {
  runCommand( RELAY + command, success, fail );
}

// Exports: Once every thing works - needs to be turned into a module

/* ===============================================================
                    Nodejs Access section
   =============================================================== */
/*
    success:
    Demo function that is triggered in the case of a successful call
    Outputs the result to the console.
*/
function success( command, result ) {
  console.log( 'success: ' + result + '\n\n' );
}

/*
    fail:
    Demo function that is triggered in the case of a failed call
    Outputs the result to the console.
*/
function fail( command, result ) {
  console.log( 'ERROR: ' + result + '\n\n' );
}

/*
    Test calls
*/
relay( FAIL, success, fail ); // Should display an error
relay( LIST, success, fail ); // Should display a list of devices
relay( HELP, success, fail ); // Should display Help
relay( ON1, success, fail ); // Should display Help
