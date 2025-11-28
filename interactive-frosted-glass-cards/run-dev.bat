@echo off
cmd /c "bun run dev > server.log 2>&1"
timeout /t 5 >nul
type server.log
