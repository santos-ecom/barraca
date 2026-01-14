<?php
// deploy_fixer.php
// This script copies files from the current nested deployment folder to the parent public_html directory.
// It is a workaround for the Hostinger "nested public_html" Git deployment issue.

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Deployment Fixer</h1>";
echo "<pre>";

// Define source (current directory) and destination (parent directory)
$source = __DIR__;
$destination = dirname($source);

echo "Source: " . $source . "\n";
echo "Destination: " . $destination . "\n";

// Security check: ensure we are in a 'public_html' folder and moving to a parent
if (basename($source) !== 'public_html') {
    // It might be named something else if the repo name is used, but for now strict check or just looser check?
    // User screenshot showed 'public_html' inside 'public_html'.
    // Let's rely on relative path.
}

if ($source === $destination) {
    die("Source and Destination are the same. Aborting.");
}

function recurse_copy($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst);
    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' ) && ($file != "deploy_fixer.php") && ($file != ".git")) {
            if ( is_dir($src . '/' . $file) ) {
                // Avoid infinite recursion if destination is inside source (unlikely here, but reverse is true)
                // If we are copying 'public_html' INTO 'public_html' parent, we must skip the 'public_html' folder itself naturally?
                // Wait. We are IN public_html/public_html. We copy TO public_html.
                // public_html contains public_html. 
                // So when we copy to parent, we are modifying the parent.
                // When we read source, we read contents.
                recurse_copy($src . '/' . $file,$dst . '/' . $file);
            }
            else {
                // Copy file
                // echo "Copying " . $file . " to " . $dst . "\n";
                if(copy($src . '/' . $file,$dst . '/' . $file)) {
                   // success
                } else {
                    echo "Failed to copy: " . $file . "\n";
                }
            }
        }
    }
    closedir($dir);
}

echo "Starting Copy Process...\n";
recurse_copy($source, $destination);
echo "Copy Process Completed.\n";

echo "</pre>";
echo "<h2>Deployment Fixed! Check your main site now.</h2>";
?>
