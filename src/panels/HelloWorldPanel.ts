import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";

export class HelloWorldPanel {
  public static currentPanel: HelloWorldPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._panel.onDidDispose(this.dispose, null, this._disposables);
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri); //n2
  }
  public static render(extensionUri: vscode.Uri) {
    if (HelloWorldPanel.currentPanel) {
      HelloWorldPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
      //HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri); //n3
    } else {
      const panel = vscode.window.createWebviewPanel("hello-world", "Hello World", vscode.ViewColumn.One, {
        enableScripts: true,
        // Empty for now
      });

      HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
    }
  }
  public dispose() {
    HelloWorldPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
  //change n1 here
  private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    const toolkitUri = getUri(webview, extensionUri, [
      "node_modules",
      "@vscode",
      "webview-ui-toolkit",
      "dist",
      "toolkit.js", // A toolkit.min.js file is also available
    ]);
    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script type="module" src="${toolkitUri}"></script>
          <title>Hello World!</title>
        </head>
        <body>
          <h1>Hello World!</h1>
          <vscode-button id="howdy">Howdy!</vscode-button>
        </body>
      </html>
    `;
  }
}

