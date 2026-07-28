$url = "https://sgftbfeoeaqenwdpysgq.supabase.co/rest/v1/colaboradores"
$key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZnRiZmVvZWFxZW53ZHB5c2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMTE4NzUsImV4cCI6MjEwMDc4Nzg3NX0.dw-8d9eYUtRG8CB3VLtj2zsbp32oRa0bnfNltyo9jqk"
$headers = @{
  "apikey" = $key
  "Authorization" = "Bearer $key"
  "Content-Type" = "application/json"
}

$data = @(
  @{ registro = '48077-7'; nome = 'LUCAS DOS SANTOS MORAIS'; aniversario = '12/11' },
  @{ registro = '44181-1'; nome = 'FLEWDSON CAMPOS DOS SANTOS'; aniversario = '29/11' },
  @{ registro = '46554-7'; nome = 'WILDSON JUNIO RODRIGUES DINIZ'; aniversario = '20/10' },
  @{ registro = '48290-6'; nome = 'TULYO FERREIRA SILVA NESCAU'; aniversario = '06/04' },
  @{ registro = '49270-7'; nome = 'JOÃO PAULO'; aniversario = '29/05' },
  @{ registro = '47508-2'; nome = 'ÍTALO MIRANDA DE RAMOS'; aniversario = '15/10' },
  @{ registro = '49185-7'; nome = 'ABNER LUCAS ALMEIDA PASSOS'; aniversario = '25/01' },
  @{ registro = '48342-5'; nome = 'TALES JACOB DE SOUZA'; aniversario = '12/04' },
  @{ registro = '50153-1'; nome = 'LETICIA DO CARMO FIALHO'; aniversario = '16/02' },
  @{ registro = '46292-4'; nome = 'RAFAEL HENRIQUE OLIVEIRA LINHARES'; aniversario = '03/02' },
  @{ registro = '44663-8'; nome = 'WILLIAM JUNIO SIMÕES'; aniversario = '28/08' },
  @{ registro = '48227-8'; nome = 'ISRAEL LUCAS FREITAS NUNES'; aniversario = '28/06' },
  @{ registro = '49017-2'; nome = 'DAVI FERREIRA LIMA'; aniversario = '17/10' },
  @{ registro = '50003-8'; nome = 'KELLEN YARA VIEIRA'; aniversario = '05/12' },
  @{ registro = '43799-1'; nome = 'RODRIGO CUNHA SOUZA'; aniversario = '13/06' },
  @{ registro = '49466-1'; nome = 'FERNANDA MORAIS VIRTUOSO'; aniversario = '09/09' },
  @{ registro = '47531-4'; nome = 'AMOS RAFAEL MARTINS DE ALMEIDA'; aniversario = '26/09' },
  @{ registro = '49229-3'; nome = 'JACQUELINE SILVA GARCIA'; aniversario = '23/10' },
  @{ registro = '48621-2'; nome = 'ALEXANDRE SILVA RODRIGUES'; aniversario = '14/06' },
  @{ registro = '48232-8'; nome = 'RODRIGO OLIVEIRA MOREIRA'; aniversario = '22/10' }
)

foreach ($c in $data) {
  $body = @{ registro = $c.registro; aniversario = $c.aniversario } | ConvertTo-Json
  Invoke-RestMethod -Uri "$url?nome=eq.$([uri]::EscapeDataString($c.nome))" -Method Patch -Headers $headers -Body $body
  Write-Host "Updated $($c.nome)"
}
