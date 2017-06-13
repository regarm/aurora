// http://tldp.org/LDP/abs/html/exitcodes.html
var verdicts = {
	"0"	: {
		"color" : "blue",
		"desc" : "Successfully executed"
	},
	"1"	: {
		"color" : "blue",
		"desc" : "Catchall for general errors"
	},
	"2"	: {
		"color" : "blue",
		"desc" : "Misuse of shell builtins (according to Bash documentation)"
	},
	"126" : {
		"color" : "blue",
		"desc" : "Command invoked cannot execute"
	},
	"127" : {
		"color" : "blue",
		"desc" : "Command not found"
	},
	"128" : {
		"color" : "blue",
		"desc" : "Invalid argument to exit"
	},
	"129" : {
		"color" : "blue",
		"desc" : "SIGHUP (128+1) Hangup (POSIX)"
	},
	"130" : {
		"color" : "blue",
		"desc" : "SIGINT (128+2) Terminal interrupt (ANSI)"
	},
	"131" : {
		"color" : "blue",
		"desc" : "SIGQUIT (128+3) Terminal quit (POSIX)"
	},
	"132" : {
		"color" : "blue",
		"desc" : "SIGILL (128+4) Illegal instruction (ANSI)"
	},
	"133" : {
		"color" : "blue",
		"desc" : "SIGTRAP (128+5) Trace trap (POSIX)"
	},
	"134" : {
		"color" : "blue",
		"desc" : "SIGIOT (128+6) IOT Trap (4.2 BSD)"
	},
	"135" : {
		"color" : "blue",
		"desc" : "SIGBUS (128+7) BUS error (4.2 BSD)"
	},
	"136" : {
		"color" : "green",
		"desc" : "SIGFPE (128+8) Floating point exception (ANSI)"
	},
	"137" : {
		"color" : "blue",
		"desc" : "SIGKILL (128+9) Kill(can't be caught or ignored) (POSIX)"
	},
	"138" : {
		"color" : "blue",
		"desc" : "SIGUSR1 (128+10) User defined signal 1 (POSIX)"
	},
	"139" : {
		"color" : "green",
		"mnemonic" : "SIGSEGV",
		"desc" : "SIGSEGV (128+11) Invalid memory segment access (ANSI)"
	},
	"140" : {
		"color" : "blue",
		"desc" : "SIGUSR2 (128+12) User defined signal 2 (POSIX)"
	},
	"141" : {
		"color" : "blue",
		"desc" : "SIGPIPE (128+13) Write on a pipe with no reader, Broken pipe (POSIX)"
	},
	"142" : {
		"color" : "blue",
		"desc" : "SIGALRM (128+14) Alarm clock (POSIX)"
	},
	"143" : {
		"color" : "blue",
		"desc" : "SIGTERM (128+15) Termination (ANSI)"
	},
	"144" : {
		"color" : "blue",
		"desc" : "SIGSTKFLT (128+16) Stack fault"
	},
	"145" : {
		"color" : "blue",
		"desc" : "SIGCHLD (128+17) Child process has stopped or exited, changed (POSIX)"
	},
	"146" : {
		"color" : "blue",
		"desc" : "SIGCONT (128+18) Continue executing, if stopped (POSIX)"
	},
	"147" : {
		"color" : "blue",
		"desc" : "SIGSTOP (128+19) Stop executing(can't be caught or ignored) (POSIX)"
	},
	"148" : {
		"color" : "blue",
		"desc" : "SIGTSTP (128+20) Terminal stop signal (POSIX)"
	},
	"149" : {
		"color" : "blue",
		"desc" : "SIGTTIN (128+21) Background process trying to read, from TTY (POSIX)"
	},
	"150" : {
		"color" : "blue",
		"desc" : "SIGTTOU (128+22) Background process trying to write, to TTY (POSIX)"
	},
	"151" : {
		"color" : "blue",
		"desc" : "SIGURG (128+23) Urgent condition on socket (4.2 BSD)"
	},
	"152" : {
		"color" : "blue",
		"desc" : "SIGXCPU (128+24) CPU limit exceeded (4.2 BSD)"
	},
	"153" : {
		"color" : "green",
		"desc" : "SIGXFSZ (128+25) File size limit exceeded (4.2 BSD) ( You code is outputing too much data)."
	},
	"154" : {
		"color" : "blue",
		"desc" : "SIGVTALRM (128+26) Virtual alarm clock (4.2 BSD)"
	},
	"155" : {
		"color" : "blue",
		"desc" : "SIGPROF (128+27) Profiling alarm clock (4.2 BSD)"
	},
	"156" : {
		"color" : "blue",
		"desc" : "SIGWINCH (128+28) Window size change (4.3 BSD, Sun)"
	},
	"157" : {
		"color" : "blue",
		"desc" : "SIGIO (128+29) I/O now possible (4.2 BSD)"
	},
	"158" : {
		"color" : "blue",
		"desc" : "SIGPWR (128+30) Power failure restart (System V)"
	},
	"255" : {
		"color" : "blue",
		"desc" : "Exit status out of range"
	},
	"256" : {
		"mnemonic" : "CE",
		"desc" : "Compile Time error (Your code did not satisfy the syntax of specified language)"
	},
	"257" : {
		"mnemonic" : "TLE",
		"desc" : "Time Limit Exceeded (Your code did not complete execution in given time limit)"
	},
	"258" : {
		"mnemonic" : "WA",
		"desc" :  "Wrong Answer (Your code did not output values as expected)."
	},
	"259" : {
		"mnemonic" : "AC",
		"desc" : "Accepted (Output of your code has is correct and your code has satisfied time limt, memory limit and other constraints)."
	},
	"260" : {
		"mnemonic" : "PE",
		"desc" : "Presentation error (Your code's output may be correct but it's output format is not as specified."
	},
}