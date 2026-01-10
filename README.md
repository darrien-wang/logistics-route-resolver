# Warehouse Outbound Orchestration System

> A high-performance logistics solution for automated route resolution, dynamic stack management, and real-time outbound operations.

## Overview

The **Warehouse Outbound Orchestration System** is a specialized desktop application designed to streamline the complex process of sorting and dispatching orders in high-throughput logistics centers. By leveraging advanced clustering algorithms, the system limits sorting errors by automatically mapping scanned orders to specific delivery routes based on ZIP codes and geospatial data.

It introduces the concept of **"Stacks"**—dynamic logical representations of physical pallets or cages—to manage capacity, overflow, and consolidation efficiently. With built-in LAN synchronization, multiple workstations can operate in unison, sharing state in real-time without the need for a complex external server infrastructure.

## Key Features

- **Intelligent Route Resolution**:  
  Automatically resolves delivery routes, zones, and carrier configurations from order ZIP codes using efficient lookup tables and clustering logic.

- **Dynamic Stack Management**:  
  Real-time tracking of physical pallet/cage logic. Supports multi-dimensional capacity rules (Count, Weight, Volume) with automatic overflow triggers when stacks reach authorized limits.

- **LAN Synchronization**:  
  Built-in P2P-like synchronization allows a "Host" station to coordinate with multiple "Client" scanners, ensuring a unified view of all active routes and stacks across the floor.

- **Advanced Exception Handling**:  
  Includes workflows for 'Custom Route Pools', 'Placeholder Orders', and manual exceptions, allowing operators to intervene when automated logic needs overrides.

- **Hardware Integration**:  
  Native support for industrial label printers (GDI/ZPL) and rapid barcode scanning inputs.

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **OS**: Windows (Targeted for deployment), macOS/Linux (Development support)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/darrien-wang/logistics-route-resolver.git
   ```
2. Navigate to the project directory:
   ```bash
   cd logistics-route-resolver
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development Scripts

- **Start Development (Electron + Vite)**:
  Runs the React frontend and Electron main process in watch mode.
  ```bash
  npm run electron:dev
  ```

- **Web-only Mode**:
  Runs only the React frontend (useful for UI tweaking).
  ```bash
  npm run dev
  ```

### Build & Release

- **Build for Production**:
  Compiles TypeScript, builds the Vite bundle, and packages the Electron app (Windows .exe by default).
  ```bash
  npm run electron:build
  ```

## Tech Stack

- **Runtime**: Electron
- **Frontend**: React 19, TypeScript, TailwindCSS (assumed standard/implied), Vite
- **Communication**: Socket.io for LAN Sync
- **State Management**: React Hooks + Custom Persistence Layer
- **Data Processing**: XLSX for data import/export

## License

Private / Proprietary.
