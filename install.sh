#!/bin/bash
# ==============================================================================
# RaitekEdge Gateway - Auto Installation Script for DietPi/Debian
# ==============================================================================

echo "========================================================"
echo "  Starting Installation: RaitekEdge UI"
echo "========================================================"

# 1. Require root privileges
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (or use sudo)"
  exit 1
fi

# 2. Update and install dependencies
echo "[1/4] Installing dependencies (Node.js, npm, git, dnsmasq)..."
apt-get update -y
apt-get install -y curl git dnsmasq
# Install Node.js 18.x (Recommended for modern apps)
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 3. Download the application (Assuming it's hosted on GitHub)
REPO_URL="https://github.com/nguyentrong-phuc/NanoPi_DietPi_SCADAGateway.git"
INSTALL_DIR="/opt/scada-gateway"

echo "[2/4] Downloading Firmware from GitHub..."
rm -rf $INSTALL_DIR
git clone $REPO_URL $INSTALL_DIR

# 4. Install Node.js packages
echo "[3/4] Installing application packages..."
cd $INSTALL_DIR/backend
npm install --production

# 5. Create Systemd Service for Auto-start on Boot
echo "[4/4] Configuring auto-start service (Systemd)..."
cat <<EOF > /etc/systemd/system/scada-gateway.service
[Unit]
Description=RaitekEdge Web UI
After=network.target

[Service]
Environment=NODE_ENV=production
Type=simple
User=root
WorkingDirectory=$INSTALL_DIR/backend
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# 6. Enable and start the service
systemctl daemon-reload
systemctl enable scada-gateway.service
systemctl start scada-gateway.service

echo "========================================================"
echo "  INSTALLATION COMPLETE!"
echo "  The Web UI is now running in the background."
echo "  Access it at: http://$(hostname -I | awk '{print $1}'):3000"
echo "========================================================"
