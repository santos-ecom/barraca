$path = "c:\Users\Usuario\Downloads\Projeto Espazie - Barraca"
$port = 8088
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")
try {
    $listener.Start()
    Write-Host "Servidor rodando em http://localhost:$port/"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $request = $context.Request
            $response = $context.Response
            
            $urlPath = $request.Url.LocalPath
            
            # Redirect if directory missing trailing slash
            $potentialDirPath = Join-Path $path ($urlPath.TrimStart('/'))
            if (Test-Path $potentialDirPath -PathType Container) {
                if (-not $urlPath.EndsWith('/')) {
                    $response.StatusCode = 301
                    $response.RedirectLocation = $urlPath + "/"
                    $response.Close()
                    continue
                }
                $filePath = Join-Path $potentialDirPath "index.html"
            } else {
                $filePath = Join-Path $path ($urlPath.TrimStart('/'))
            }

            if ($urlPath -eq "" -or $urlPath -eq "/") { $filePath = Join-Path $path "index.html" }
            
            # Asset fallback (check assets folder if not found in relative path)
            if (-not (Test-Path $filePath -PathType Leaf)) {
                 if ($urlPath -match ".*assets/.*") {
                    $assetName = $urlPath.Split('/')[-1]
                    $assetsFolder = Join-Path $path "assets"
                    $assetPath = Join-Path $assetsFolder $assetName
                    if (Test-Path $assetPath -PathType Leaf) {
                        $filePath = $assetPath
                    }
                }
            }

            if (Test-Path $filePath -PathType Leaf) {
                $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = switch ($extension) {
                    ".html" { "text/html; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".png"  { "image/png" }
                    ".jpg"  { "image/jpeg" }
                    ".jpeg" { "image/jpeg" }
                    ".svg"  { "image/svg+xml" }
                    ".webp" { "image/webp" }
                    ".ico"  { "image/x-icon" }
                    default { "application/octet-stream" }
                }
                
                $response.ContentType = $contentType
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                
                # Use standard response writing
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
            }
        } catch {
            Write-Host "Erro ao processar requisio: $_"
        } finally {
            if ($null -ne $response) {
                try { $response.Close() } catch {}
            }
        }
    }
} finally {
    $listener.Stop()
}
