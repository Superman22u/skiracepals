$exe = "C:\Program Files\MariaDB 12.2\bin\mariadbd.exe"
$ini = Join-Path (Resolve-Path "$PSScriptRoot\..") ".mariadb\my.ini"
if (-not (Test-Path $ini)) {
  Write-Error "Missing $ini. Initialize with: & `"C:\Program Files\MariaDB 12.2\bin\mariadb-install-db.exe`" --datadir=`"$PSScriptRoot\..\.mariadb`""
  exit 1
}
& $exe --defaults-file=$ini --console
