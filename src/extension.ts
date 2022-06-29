// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as HelloWorldPanel from "./panels/HelloWorldPanel";

const channel = vscode.window.createOutputChannel("Kendo Output");
channel.show(true);
channel.append("Starting Kendo project wizard");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsxtask" is now active!');
	
	const helloCommand = vscode.commands.registerCommand("vsxtask.helloWorld", () => {
		HelloWorldPanel.HelloWorldPanel.render();
	  });
	
	  context.subscriptions.push(helloCommand);
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsxtask.Welcome', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Welcome from VSXTask!');
	});
	let secondcmd = vscode.commands.registerCommand('vsxtask.Pathing', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Getting Path');
		let message;
		if(vscode.workspace.workspaceFolders !== undefined) {
			let wf = vscode.workspace.workspaceFolders[0].uri.path ;
			let f = vscode.workspace.workspaceFolders[0].uri.fsPath ; 

			message = `YOUR-EXTENSION: folder: ${wf} - ${f}` ;

			vscode.window.showInformationMessage(message);
		} 
		else {
			message = "YOUR-EXTENSION: Working folder not found, open a folder an try again" ;

			vscode.window.showErrorMessage(message);
		}
	});
	let test = vscode.commands.registerCommand("markdown.test", () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		let message;
		if (vscode.workspace.workspaceFolders !== undefined) {
		  let f = vscode.workspace.workspaceFolders[0].uri.fsPath;
	
		//   message = `YOUR-EXTENSION: folder: ${f}`;
	
		//   vscode.window.showInformationMessage(message);
		} else {
		  message = "YOUR-EXTENSION: Working folder not found, open a folder an try again";
	
		  vscode.window.showErrorMessage(message);
		}
	  });
	
	

	context.subscriptions.push(disposable);
	context.subscriptions.push(secondcmd);
	context.subscriptions.push(test);
	
}

// this method is called when your extension is deactivated
export function deactivate() {}

//C:/Users/User/.vscode/my_scripts/nicify.js
//file://C%3A/Users/User/.vscode/my_scripts/nicify.js