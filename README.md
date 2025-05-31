# typescript-playwright-bdd

# 🧪 Playwright + Cucumber + TypeScript + Node.js Framework

This project is a robust end-to-end test automation framework using:
- ✅ [Playwright](https://playwright.dev/) for browser automation
- ✅ [Cucumber](https://cucumber.io/) for BDD (Gherkin syntax)
- ✅ [TypeScript](https://www.typescriptlang.org/) for static typing
- ✅ [Node.js](https://nodejs.org/) as the runtime
- ✅ [Visual Studio Code](https://code.visualstudio.com/) for development with official Cucumber extension

---

## 🚀 Quickstart

### 1. Prerequisites

#### [Visual Studio Code](https://code.visualstudio.com/)

[Download](https://code.visualstudio.com/Download) and install from the official website.
```
After installing, open VSCode and install the official Playwright Test for VSCode extension:
Go to the Settings -> Extensions tab (or press Ctrl+Shift+X / Cmd+Shift+X)
Search for: Playwright Test for VSCode
Publisher: Microsoft microsoft.com (Run Playwright Test tests in Visual Studio Code.)
Install the extension.
```
```
Also install the official Cucumber extension:
Go to the Settings -> Extensions tab (or press Ctrl+Shift+X / Cmd+Shift+X)
Search for: Cucumber
Publisher: Cucumber cucumber.io (Cucmber for Visual Studio Code)
Install the extension.
```

#### [Node.js](https://nodejs.org/) 

##### 🪟 Windows

Go to the official [Node.js](https://nodejs.org/en/download) download page.
```
Download the latest LTS version.
Run the installer.
Leave default settings checked (includes npm).
Follow the prompts to complete installation.
```
Verify installation:
```bash
node -v
npm -v
```

##### 🍎 macOS

Install Homebrew (if not installed):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install Node.js:
```bash
brew install node
```

Verify installation:
```bash
node -v
npm -v
```

#### [Git](https://git-scm.com) 

##### 🪟 Windows

Go to the [Git](https://git-scm.com/downloads) downloads page.
```
Download and run the installer.
Choose default options unless you have specific needs.
```
After installation, open a new terminal (Command Prompt or Git Bash) and verify:

```bash
git --version
```

##### 🍎 macOS

Check if Git is already installed:
```bash
git --version
```

If not installed or needs update:
```bash
brew install git
```

### 2. Clone the Repo
```
Open Terminal and create a directory for projects if not exists. (mkdir your-projects-directory)
```
Then setup your repository:
```bash
cd your-projects-directory
git clone https://github.com/your-org/your-repo-name.git
cd your-repo-name
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Running tests

BDD tests:
```bash
npm test
```

Non-BDD tests:
```bash
npx playwright test
```

Codegen:
```bash
npx playwright codegen
```