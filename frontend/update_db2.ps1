$url = "https://sgftbfeoeaqenwdpysgq.supabase.co/rest/v1/colaboradores"
$key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZnRiZmVvZWFxZW53ZHB5c2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMTE4NzUsImV4cCI6MjEwMDc4Nzg3NX0.dw-8d9eYUtRG8CB3VLtj2zsbp32oRa0bnfNltyo9jqk"
$headers = @{
  "apikey" = $key
  "Authorization" = "Bearer $key"
  "Content-Type" = "application/json"
}

$data = @(
  @{ registro = '49270-7'; search = '*O PAULO*'; aniversario = '29/05' },
  @{ registro = '47508-2'; search = '*TALO MIRANDA DE RAMOS*'; aniversario = '15/10' },
  @{ registro = '44663-8'; search = '*WILLIAM JUNIO SIM*ES*'; aniversario = '28/08' }
)

foreach ($c in $data) {
  $searchEnc = [uri]::EscapeDataString($c.search)
  $body = @{ registro = $c.registro; aniversario = $c.aniversario } | ConvertTo-Json
  Invoke-RestMethod -Uri "$url?nome=ilike.$searchEnc" -Method Patch -Headers $headers -Body $body
  Write-Host "Updated $($c.search)"
}
