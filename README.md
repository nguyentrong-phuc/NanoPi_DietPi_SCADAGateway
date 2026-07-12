# SCADA Gateway Web Configuration (NanoPi / DietPi)

This project provides a premium, responsive web configuration interface for your SCADA Gateway device.

## Prerequisites

To run this on the NanoPi (DietPi), you need Docker and Docker Compose installed.

Install them if you haven't already:
```bash
sudo apt update
sudo apt install docker.io docker-compose
```

## Running the Services

1. Navigate to this directory.
2. Build and start the containers using Docker Compose:

```bash
sudo docker-compose up -d --build
```

3. Access the web interface:
Open a browser and navigate to the IP address of your NanoPi:
`http://<NANO_PI_IP>/`

## Login Credentials
- **Username**: `admin`
- **Password**: `admin`

## 🚑 Emergency Rescue (Fallback IP)

If you misconfigure the LAN IP or lock yourself out of the web interface, you can always recover access using the permanent **Fallback Virtual IP**:
- Plug your computer directly into the **LAN (eth1)** port.
- Manually set your computer's IP address to `10.10.10.100` (Subnet Mask: `255.255.255.0`).
- Open your browser and navigate to `http://10.10.10.254/` to access the Gateway and fix the configuration.

## Development / Running Locally

If you want to run the project locally without Docker during development:

### Backend
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:3000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## File Structure

- `frontend/`: The React SPA (Vite + Vanilla CSS).
- `backend/`: Node.js Express server acting as a bridge to OS commands and configs.
- `config_data/`: The directory where the exported configurations are stored before download. Mounted in docker-compose.
