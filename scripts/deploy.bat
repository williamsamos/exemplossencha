@echo off
:: Check WMIC is available
WMIC.EXE Alias /? >NUL 2>&1 || GOTO s_error

:: Use WMIC to retrieve date and time
FOR /F "skip=1 tokens=1-6" %%G IN ('WMIC Path Win32_LocalTime Get Day^,Hour^,Minute^,Month^,Second^,Year /Format:table') DO (
   IF "%%~L"=="" goto s_done
      Set _yyyy=%%L
      Set _mm=00%%J
      Set _dd=00%%G
      Set _hour=00%%H
      SET _minute=00%%I
)
:s_done

:: Pad digits with leading zeros
      Set _mm=%_mm:~-2%
      Set _dd=%_dd:~-2%
      Set _hour=%_hour:~-2%
      Set _minute=%_minute:~-2%

:: PEGA A DATA E HORA
Set _isodate=%_dd%.%_mm%.%_yyyy% %_hour%:%_minute%

:: FAZ O COMMIT
echo Iniciando deploy de %_isodate%
git add C:\webserver\mysamples\MyLab\
timeout /t 3
git add C:\webserver\mysamples\MyLab\
timeout /t 3
git commit -m "%_isodate%"
timeout /t 3
git push origin master

echo Deploy completo!
pause