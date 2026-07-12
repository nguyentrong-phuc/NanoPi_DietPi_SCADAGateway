# Development & Technical Notes

This document keeps track of the project's current progress, technical requirements, workflows, and developer notes. It serves as a central hub for anyone joining the project to understand *what* we are doing and *how* we are doing it.

## 1. Current Phase: Step 2 - Backend & OS Integration (COMPLETED)

Phase 1 (Frontend) and Phase 2 (Backend) are both **COMPLETE**. The application is now fully functional end-to-end on the NanoPi R2S (DietPi). The backend runs as a systemd service on port 80, so the UI is accessible via `http://<nanopi-ip>` directly.

### Status
- **Framework**: React (Vite) + Vanilla CSS + Ant Design (for DatePicker/TimePicker).
- **Routing**: `react-router-dom` for client-side routing.
- **Backend**: Express.js (Node.js), running on **port 80**, served as a systemd service.
- **Config Storage**: `/opt/scada-gateway/config_data/` — all JSON config files live here.
- **NanoPi Hardware**: NanoPi R2S — `eth0` = WAN, `eth1` = LAN.
- **Access URL on NanoPi**: `http://192.168.41.6` (port 80, no port suffix needed).

## 2. Technical Architecture

- **Monorepo Style**: The project contains both `frontend/` (React/Vite) and `backend/` (Node.js/Express) in the same repository.
- **Serving the Frontend**: The Node.js backend serves the compiled frontend static files from the `backend/public/` directory.
- **Config files location (on NanoPi)**: `/opt/scada-gateway/config_data/` — stores `auth.json`, `data_points.json`, `protocol_conversion.json`, `schedule_reboot.json`, and OS mock files.
- **systemd service**: `scada-gateway.service` — auto-starts on boot, runs as `root` on port 80.
  - Check status: `systemctl status scada-gateway.service`
  - View logs: `journalctl -u scada-gateway.service -n 50 --no-pager`
  - Restart: `systemctl restart scada-gateway.service`
- **Backend API endpoints**:
  - `GET/POST /api/network` → reads/writes `/etc/network/interfaces` and `/etc/dnsmasq.d/scada.conf`
  - `GET/POST /api/system/time` → reads/writes timezone, NTP via `timedatectl` and `/etc/systemd/timesyncd.conf`
  - `GET/POST /api/edge/:type` → reads/writes `config_data/<type>.json`
  - `POST /api/system/reboot` → executes `reboot`
  - `GET/POST /api/system/schedule-reboot` → manages `crontab`
  - `GET /api/system/config/export` → tars and downloads `config_data/`
  - `POST /api/system/config/import` → uploads and extracts config archive
  - `POST /api/auth/login` → validates against `config_data/auth.json`
  - `POST /api/auth/change-password` → updates `config_data/auth.json`

## 3. Important Development Workflows

### How to update the UI on the NanoPi:
Because the NanoPi uses `update.sh` which only pulls the source code and restarts the backend (it **does not** compile the React app), developers must build the frontend locally and push the built files to GitHub.

**Workflow before pushing to Github:**
1. Navigate to the frontend directory: `cd frontend`
2. Build the UI: `npm run build`
3. Copy all files from `frontend/dist/` into `backend/public/` (replace old files).
4. Commit and push the changes (including `backend/public/`) to GitHub.

**For first-time installation on the NanoPi:**
Run the install script to setup the environment and download the project:
```bash
curl -sL https://raw.githubusercontent.com/nguyentrong-phuc/NanoPi_DietPi_SCADAGateway/main/install.sh | bash
```

**For subsequent updates:**
Once new UI changes are built and pushed, run the update script on the NanoPi to pull the latest changes:
```bash
curl -sL https://raw.githubusercontent.com/nguyentrong-phuc/NanoPi_DietPi_SCADAGateway/main/update.sh | bash
```

### 🚨 Lessons Learned / Common Pitfalls
- **Forgetting to update `backend/public/`**: The most common mistake is building the frontend (`frontend/dist/`) but forgetting to copy it to `backend/public/` before pushing to GitHub. Always strictly follow the 4-step workflow above!
- **scrollbar in Ant Design popups**: Use `.ant-picker-dropdown *::-webkit-scrollbar { display: none !important; }` and `scrollbar-width: none !important` to hide them cleanly.
- **`config_data/` directory must exist on Linux**: On first boot, Node.js will crash with `ENOENT` if the `config_data/` folder doesn't exist. **Always create it at the top of `server.js` before any file reads/writes**, using `fs.mkdirSync(configDataDir, { recursive: true })` — do NOT conditionally create it only for Windows/dev.
- **Port 80 requires root**: The systemd service runs as `User=root` so binding to port 80 works. Do NOT change the user to a non-root account without also adding `CAP_NET_BIND_SERVICE`.
- **WAN = eth0, LAN = eth1** on NanoPi R2S. Do NOT swap these in any network configuration code.
- **`install.sh` is safe to re-run**: It will `rm -rf /opt/scada-gateway` and clone fresh. Any data in `config_data/` will be lost. Only run it when absolutely necessary (e.g., the service is broken beyond repair).

## 4. UI/UX Design System & Guidelines

To maintain consistency throughout the dashboard, anyone contributing to the Frontend must adhere to the following design styles defined in `index.css`:

### Colors
- **Primary Color (RaitekSCADAEdge Blue)**: `#003FB4`
- **Backgrounds**: `#f0f2f5` (App Body), `#ffffff` (Panels/Cards)
- **Status Colors**: `#28a745` (Success/Connected), `#dc3545` (Danger/Disconnected)

### Layout (`app-container`)
- **Top Bar (`top-bar`)**: 60px height, primary color background. Contains Logo and main Navigation.
- **Sub-Sidebar (`sub-sidebar`)**: 240px width, white background. Contains nested navigation items (`sidebar-item`).
- **Content Area (`content-area`)**: Flex-1, 20px padding, light gray background.

### Components
- **Cards (`w-card`, Wukong-style)**: Used to wrap sections of content. White background, rounded corners (4px), subtle shadow, and a 1px border. Card titles (`w-card-title`) have a signature primary-colored vertical line on the left.
- **Forms (`form-group`)**: Flex layout with a 200px label width (`form-label`) and dashed bottom borders separating fields. Inputs (`form-control`) are 300px wide and glow with the primary color on focus.
- **Buttons (`btn`)**: Solid, 4px border radius. Primary buttons (`btn-primary.active-btn`) use the primary color `#003FB4`.

## 5. Next Steps / Roadmap
- **Phase 3**: Real-time data display (Overview page CPU/RAM/Uptime from real `/proc/stat` reads).
- **Phase 4**: Node-RED integration — backend APIs to manage Node-RED flows for Modbus/MQTT protocol execution.
- **Phase 5**: Security hardening — JWT token auth, HTTPS support.
