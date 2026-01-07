# LAN Synchronization Implementation Plan

## Goal
Enable multiple devices on the same Wi-Fi network to synchronize:
1.  **Scanned Goods History** (Operation Logs)
2.  **Virtual Stack Progress** (Current counts, capacities, active stacks)
3.  **Real-time Updates** (Instant reflection of scans across all screens)

## Architecture: Leader-Follower (Host-Client) Model
To avoid the complexity of distributed consensus (CRDT) for this scale, we will use a **Leader-Follower (Host-Client)** model.

-   **Host (Server)**: One designated computer (likely the main station) runs a local WebSocket server. It holds the "Source of Truth".
-   **Client**: Other devices connect to the Host via WebSocket. They send scan actions to the Host and receive state updates.

### Why this approach?
-   **Simplicity**: Easier to maintain data consistency.
-   **Reliability**: In a warehouse LAN, one stable PC usually exists.
-   **Performance**: Low latency for local WebSockets.

## Proposed Changes

### 1. New Dependencies
-   `socket.io`: For real-time bidirectional communication.
-   `local-ip-url` (or `internal-ip`): To easily identify local IP.
-   `bonjour-service` (optional but recommended): For auto-discovery of the Host, so users don't need to type IP addresses.

### 2. Service Layer Updates

#### A. `LanSyncService` (New)
A new service to manage the networking layer.
-   **Role**: Manages socket connection (Client) or Server instance (Host).
-   **Discovery**: Broadcasts presence if Host, scans for Host if Client.
-   **Events**:
    -   `SYNC_STATE`: Full state flush (on connect).
    -   `ACTION_SCAN`: Client notifies Host of a scan.
    -   `STATE_UPDATE`: Host notifies all Clients of a change.

#### B. `RouteStackService` Refactoring
-   Currently, it manages state locally.
-   **Change**: It needs to accept external state updates.
-   **Host Mode**: Processes logic as usual, then emits `STATE_UPDATE`.
-   **Client Mode**: "Read-only" logic. When user scans, it sends `ACTION_SCAN` to Host. It *only* updates local state when receiving `STATE_UPDATE` from Host.

### 3. UI Changes (`App.tsx` & Headers)
-   **Mode Switcher**: UI to toggle "Work as Host" or "Work as Client".
-   **Connection Status**: Indicator showing "Connected to Host" or "Hosting (N clients)".
-   **Manual IP Input**: Fallback if auto-discovery fails.

## Data Flow Example

1.  **User A (Client)** scans `WP123`.
2.  **Client A** sends `emit('SCAN_REQUEST', { id: 'WP123', ... })` to **Host**.
3.  **Host** receives request:
    -   Runs `MiddlewareChain` (Resolution, Logic).
    -   Updates `RouteStackService` (e.g., Stack #4 count 39 -> 40).
    -   Records to `Operation Log`.
4.  **Host** broadcasts `emit('STATE_UPDATE', { stacks: ..., log: ... })` to **All Clients**.
5.  **Client A & B** receive update and re-render UI.

## Implementation Steps

### Phase 1: Foundation
1.  [ ] Install `socket.io` and `socket.io-client`.
2.  [ ] Create `LanSyncService` skeleton.
3.  [ ] Create `HostServer` class (Node.js/Electron side) to run inside the main process or a forked process.

### Phase 2: State Syncing
1.  [ ] Modify `RouteStackService` to support executing "from remote" vs "from local".
2.  [ ] Implement serialization of `RouteStack` state.

### Phase 3: UI Integration
1.  [ ] Add "Network" tab in Settings.
2.  [ ] Add "Host/Client" toggle.
3.  [ ] Show sync status in Dashboard. 
