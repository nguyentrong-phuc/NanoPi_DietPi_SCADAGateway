#!/bin/bash
# ==============================================================================
# RaitekEdge Gateway - Auto Update Script
# ==============================================================================

echo "========================================================"
echo "  Starting Update: RaitekEdge UI"
echo "========================================================"

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (or use sudo)"
  exit 1
fi

export GIT_PAGER=cat


INSTALL_DIR="/opt/scada-gateway"

if [ ! -d "$INSTALL_DIR" ]; then
  echo "Error: Directory $INSTALL_DIR does not exist. Please run install.sh first."
  exit 1
fi

echo "[1/4] Installing missing dependencies..."
apt-get install -y dnsmasq

echo "[2/4] Checking and pulling latest code from GitHub..."
cd $INSTALL_DIR

# Kéo thông tin bản cập nhật mới nhất từ Github
git fetch origin main

# Lấy thông tin commit và dung lượng thay đổi
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/main)

if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ]; then
    echo "  -> He thong da o phien ban moi nhat!"
else
    echo "  -> Phat hien ban cap nhat moi!"
    echo "  --------------------------------------------------------"
    echo "  Thong tin ban cap nhat: $(git log -1 --format="%s" origin/main)"
    echo "  Ngay phat hanh:         $(git log -1 --format="%cd" --date=local origin/main)"
    echo "  Dung luong (Thay doi):  "
    git --no-pager diff --stat HEAD..origin/main
    echo "  --------------------------------------------------------"
fi

# Loại bỏ các thay đổi cục bộ (nếu có) và áp dụng bản mới nhất từ Github
git reset --hard origin/main

echo "[3/4] Updating Node.js packages..."
cd $INSTALL_DIR/backend
npm install --production

echo "[4/4] Restarting background service..."
systemctl restart scada-gateway.service

echo "========================================================"
echo "  UPDATE COMPLETE!"
echo "  The Web UI has been updated to the latest version."
echo "========================================================"
