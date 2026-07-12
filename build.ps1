cd frontend
cmd.exe /c "npm run build"
Remove-Item -Recurse -Force ../backend/public/*
Copy-Item -Recurse -Force dist/* ../backend/public/
cd ..
echo "Build and copy complete!"
