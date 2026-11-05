# Editing the Profitic site with GitHub Desktop

## One-time setup

1. Install GitHub Desktop from [desktop.github.com](https://desktop.github.com) and sign in with your GitHub account (`tarrynma`).
2. Accept the repo invite from Valeriu, if you haven't already.
3. In GitHub Desktop, go to **File → Clone repository → URL**, and paste:
   `https://github.com/valeriu-ciobanu/profitic-site.git`
4. Pick a local folder **outside Dropbox or OneDrive**, for example `Documents\GitHub\profitic-site`, then click **Clone**.

## Before each editing session

1. Open GitHub Desktop and click **Fetch origin**. If it then shows **Pull origin**, click it to get the latest version.
2. Click **Show in Explorer** to open the site folder. Pages are the `.html` files in the main folder.
3. To preview a page, open its `.html` file in your browser. Links between pages won't work this way, but the page itself shows correctly.

## Making changes with Claude

1. In the Claude desktop app, create a project and connect it to your cloned folder (`Documents\GitHub\profitic-site`).
2. Ask Claude to read the folder first. It follows the site rules in `CLAUDE.md`.
3. Ask for one small change at a time, for example: *"On the homepage, change the hero headline to '…'."*
4. Preview the page in your browser to check the change.

## Publishing

1. In GitHub Desktop, review your changes in the left panel.
2. Write a short summary at the bottom left, for example "Update homepage hero copy", and click **Commit to main**.
3. Click **Push origin**. The live site updates in about 1–2 minutes.

## Good to know

- Always fetch and pull before you start editing, so you don't overwrite someone else's changes.
- If GitHub Desktop reports a conflict, don't force anything. Message Valeriu.
