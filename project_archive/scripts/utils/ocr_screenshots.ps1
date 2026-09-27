Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Security.Cryptography.CryptographicBuffer, Windows.Security.Cryptography, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime] | Out-Null

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' }

function Await-Op($op, $type) {
    $m = $asTaskGeneric.MakeGenericMethod($type)
    $t = $m.Invoke($null, @($op))
    $t.Wait()
    return $t.Result
}

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new("en-US"))

$folder = (Get-Item "output/ppt_extracted_images/ppt/media").FullName
$files = Get-ChildItem -Path $folder -Filter "Screenshot*.png" | Sort-Object Name

$results = @{}

foreach ($f in $files) {
    try {
        $file = Await-Op ([Windows.Storage.StorageFile]::GetFileFromPathAsync($f.FullName)) ([Windows.Storage.StorageFile])
        $stream = Await-Op ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
        $decoder = Await-Op ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $bitmap = Await-Op ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $ocrRes = Await-Op ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
        
        Write-Host "=========================================="
        Write-Host "FILE: $($f.Name)"
        $lines = $ocrRes.Text -split "`r?`n" | ? { $_.Trim().Length -gt 0 }
        $results[$f.Name] = $ocrRes.Text
        for ($i = 0; $i -lt [Math]::Min(12, $lines.Count); $i++) {
            Write-Host "  $($lines[$i])"
        }
    } catch {
        Write-Host "Error on $($f.Name): $_"
    }
}

# Also save full text to JSON for reference
$results | ConvertTo-Json | Set-Content -Path "output/screenshots_ocr.json" -Encoding UTF8
Write-Host "Done! Saved to output/screenshots_ocr.json"
