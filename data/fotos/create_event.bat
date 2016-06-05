@echo off

if "%1" == "" (
	exit
)

set EVENT_ID=%1
set EVENT_TITLE=%2

if NOT EXIST %EVENT_ID% (
	exit
)

pushd %EVENT_ID%

if EXIST "%EVENT_ID%.json" (
	del "%EVENT_ID%.json"
)

set EVENT_FILE="%EVENT_ID%.json"

@echo { > "%EVENT_FILE%"
@echo 	"title": %EVENT_TITLE%, >> "%EVENT_FILE%"
@echo 	"images": [ >> "%EVENT_FILE%"

set LAST_FILE=
for /r %%f in (*.jpg, *.png, *.jpeg) do (
	set LAST_FILE=%%~nxf
)

for /r %%f in (*.jpg, *.png, *.jpeg) do (
	@echo 		{ >> "%EVENT_FILE%"
	@echo 			"name": "%%~nxf" >> "%EVENT_FILE%"
	
	echo %%~nxf added

	if NOT "%%~nxf"=="%LAST_FILE%" (
		@echo 		}, >> "%EVENT_FILE%"
	) else (
		@echo 		} >> "%EVENT_FILE%"
	)
)

@echo 	] >> "%EVENT_FILE%"
@echo } >> "%EVENT_FILE%"

popd