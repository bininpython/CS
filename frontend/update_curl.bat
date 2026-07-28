@echo off
set URL=https://sgftbfeoeaqenwdpysgq.supabase.co/rest/v1/colaboradores
set KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZnRiZmVvZWFxZW53ZHB5c2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMTE4NzUsImV4cCI6MjEwMDc4Nzg3NX0.dw-8d9eYUtRG8CB3VLtj2zsbp32oRa0bnfNltyo9jqk

curl.exe -X PATCH "%URL%?nome=eq.LUCAS%%20DOS%%20SANTOS%%20MORAIS" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"48077-7\",\"aniversario\":\"12/11\"}"
curl.exe -X PATCH "%URL%?nome=eq.FLEWDSON%%20CAMPOS%%20DOS%%20SANTOS" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"44181-1\",\"aniversario\":\"29/11\"}"
curl.exe -X PATCH "%URL%?nome=eq.WILDSON%%20JUNIO%%20RODRIGUES%%20DINIZ" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"46554-7\",\"aniversario\":\"20/10\"}"
curl.exe -X PATCH "%URL%?nome=eq.TULYO%%20FERREIRA%%20SILVA%%20NESCAU" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"48290-6\",\"aniversario\":\"06/04\"}"
curl.exe -X PATCH "%URL%?nome=eq.JO%%C3%%83O%%20PAULO" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"49270-7\",\"aniversario\":\"29/05\"}"
curl.exe -X PATCH "%URL%?nome=eq.%%C3%%8DTALO%%20MIRANDA%%20DE%%20RAMOS" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"47508-2\",\"aniversario\":\"15/10\"}"
curl.exe -X PATCH "%URL%?nome=eq.ABNER%%20LUCAS%%20ALMEIDA%%20PASSOS" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"49185-7\",\"aniversario\":\"25/01\"}"
curl.exe -X PATCH "%URL%?nome=eq.TALES%%20JACOB%%20DE%%20SOUZA" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"48342-5\",\"aniversario\":\"12/04\"}"
curl.exe -X PATCH "%URL%?nome=eq.LETICIA%%20DO%%20CARMO%%20FIALHO" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"50153-1\",\"aniversario\":\"16/02\"}"
curl.exe -X PATCH "%URL%?nome=eq.RAFAEL%%20HENRIQUE%%20OLIVEIRA%%20LINHARES" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"46292-4\",\"aniversario\":\"03/02\"}"
curl.exe -X PATCH "%URL%?nome=eq.WILLIAM%%20JUNIO%%20SIM%%C3%%95ES" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"44663-8\",\"aniversario\":\"28/08\"}"
curl.exe -X PATCH "%URL%?nome=eq.ISRAEL%%20LUCAS%%20FREITAS%%20NUNES" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"48227-8\",\"aniversario\":\"28/06\"}"
curl.exe -X PATCH "%URL%?nome=eq.DAVI%%20FERREIRA%%20LIMA" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"49017-2\",\"aniversario\":\"17/10\"}"
curl.exe -X PATCH "%URL%?nome=eq.KELLEN%%20YARA%%20VIEIRA" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"50003-8\",\"aniversario\":\"05/12\"}"
curl.exe -X PATCH "%URL%?nome=eq.RODRIGO%%20CUNHA%%20SOUZA" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"43799-1\",\"aniversario\":\"13/06\"}"
curl.exe -X PATCH "%URL%?nome=eq.FERNANDA%%20MORAIS%%20VIRTUOSO" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"49466-1\",\"aniversario\":\"09/09\"}"
curl.exe -X PATCH "%URL%?nome=eq.AMOS%%20RAFAEL%%20MARTINS%%20DE%%20ALMEIDA" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"47531-4\",\"aniversario\":\"26/09\"}"
curl.exe -X PATCH "%URL%?nome=eq.JACQUELINE%%20SILVA%%20GARCIA" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"49229-3\",\"aniversario\":\"23/10\"}"
curl.exe -X PATCH "%URL%?nome=eq.ALEXANDRE%%20SILVA%%20RODRIGUES" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"48621-2\",\"aniversario\":\"14/06\"}"
curl.exe -X PATCH "%URL%?nome=eq.RODRIGO%%20OLIVEIRA%%20MOREIRA" -H "apikey: %KEY%" -H "Authorization: Bearer %KEY%" -H "Content-Type: application/json" -d "{\"registro\":\"48232-8\",\"aniversario\":\"22/10\"}"
echo.
echo Done
