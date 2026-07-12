# Development & Technical Notes

This document keeps track of the project's current progress, technical requirements, workflows, and developer notes. It serves as a central hub for anyone joining the project to understand *what* we are doing and *how* we are doing it.

## 1. Current Phase: Step 1 - UI Construction (Frontend)

We are currently focusing on **Step 1**: Building the web configuration interface (Frontend). No backend logic or hardware interactions (like OS command executions) are fully integrated yet. 

### Status
- **Framework**: React (Vite) + Vanilla CSS.
- **Routing**: `react-router-dom` is used for client-side routing.
- **Structure**:
  - `frontend/src/components`: Reusable components (e.g., Layout, Menus).
  - `frontend/src/pages`: Feature-specific screens grouped by modules (Overview, Network, Edge Computing, System Management).
- **Recent Updates**:
  - Configured project routing.
  - Removed "Ethernet Port 1" and "Ethernet Port 2" from the Overview and Network pages based on updated requirements.

## 2. Technical Architecture

- **Monorepo Style**: The project contains both `frontend/` (React/Vite) and `backend/` (Node.js/Express) in the same repository.
- **Serving the Frontend**: The Node.js backend serves the compiled frontend static files from the `backend/public/` directory.

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
- **Forgetting to update `backend/public/`**: The most common mistake is building the frontend (`frontend/dist/`) but forgetting to copy it to `backend/public/` before pushing to GitHub. If you only push `frontend/dist` (or worse, ignore it), the NanoPi will successfully pull the new code and restart the backend, but it will continue serving the OLD UI from `backend/public/`. Always strictly follow the 4-step workflow above!

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
- Continue building out static mockups for remaining UI pages (Edge computing, System settings, etc.).
- Refine CSS and ensure responsive design layout.
- Move to **Step 2**: Integrate backend logic with OS commands (`/etc/network/interfaces`, `dnsmasq`, Node-RED integration, etc.) once the UI is finalized.
