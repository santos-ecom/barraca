# FTP Deployment Checklist (FINAL & FOOLPROOF)

## 1. WHAT TO UPLOAD
I have created a special folder for you called `deployment_staging`.
**IGNORE EVERYTHING ELSE.**

1.  Open the folder `deployment_staging` on your computer.
2.  Select **ALL** files and folders inside it:
    -   `.htaccess`
    -   `index.html`
    -   `overrides.css`
    -   `overrides.js`
    -   `assets/`
    -   `lavadora/`
    -   `motoserra/`
    -   ...etc
3.  **IMPORTANT:** On the server (Hostinger), DELETE the existing `motoserra`, `lavadora`, etc directories before uploading to ensure no bad files remain.
4.  Drag and drop the new files into `public_html`.

## 2. WHY THIS WORKS
This folder contains the **exact** combination of files needed.
-   It includes the static product folders (`motoserra`, etc) which are often missed if you just upload "dist".
-   It includes the `assets` folder with all images.
-   It includes the correct `.htaccess`.

## 3. VERIFICATION
After uploading, visit:
`https://yourdomain.com/motoserra`

It MUST work. If it doesn't, verify you actually uploaded the `motoserra` folder into `public_html` and not somewhere else.
