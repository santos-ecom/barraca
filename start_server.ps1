$path = "c:\Users\Usuario\Nova pasta"
$port = 8081
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
    Write-Host "Servidor rodando em http://localhost:$port/"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ($urlPath -eq "" -or $urlPath -eq "/") { $urlPath = "index.html" }
        
        $filePath = Join-Path $path $urlPath
        
        # Se for pasta, adiciona index.html
        if (Test-Path $filePath -PathType Container) {
            $filePath = Join-Path $filePath "index.html"
        }
        
        # Se o arquivo não existir:
        if (-not (Test-Path $filePath -PathType Leaf)) {
            # 1. Se for um arquivo de assets (js, css, img), tenta achar na pasta assets da raiz
            if ($urlPath -match "/?assets/.*") {
                $assetName = $urlPath.Split('/')[-1]
                $assetPath = Join-Path $path "assets" $assetName
                if (Test-Path $assetPath -PathType Leaf) {
                    $filePath = $assetPath
                }
            }
            
            # 2. Se ainda não achou e não é asset (ou seja, é rota de navegação), serve index.html
            if (-not (Test-Path $filePath -PathType Leaf) -and $urlPath -notmatch "\.(js|css|png|jpg|jpeg|svg|ico)$") {
                $filePath = Join-Path $path "index.html"
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
                ".ico"  { "image/x-icon" }
                default { "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
