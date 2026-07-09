#!/bin/bash
# ==============================================================================
# WukongEdge SCADA Gateway - Auto Update Script
# ==============================================================================

echo "========================================================"
echo "  Starting Update: WukongEdge SCADA Gateway UI"
echo "========================================================"

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (or use sudo)"
  exit 1
fi

INSTALL_DIR="/opt/scada-gateway"

if [ ! -d "$INSTALL_DIR" ]; then
  echo "Error: Directory $INSTALL_DIR does not exist. Please run install.sh first."
  exit 1
fi

echo "[1/3] Pulling latest code from GitHub..."
cd $INSTALL_DIR
# Loại bỏ các thay đổi cục bộ (nếu có) và kéo bản mới nhất từ Github
git fetch --all
git reset --hard origin/main

echo "[2/3] Updating Node.js packages..."
cd $INSTALL_DIR/backend
npm install --production

echo "[3/3] Restarting background service..."
systemctl restart scada-gateway.service

echo "========================================================"
echo "  UPDATE COMPLETE!"
echo "  The Web UI has been updated to the latest version."
echo "========================================================"
