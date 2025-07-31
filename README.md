**Brillia: Decentralized Energy Sharing for IoT-Connected Communities**

A blockchain-based platform enabling secure, transparent, and peer-to-peer energy trading between households equipped with renewable energy and IoT devices.

**Overview**

Brillia connects producers and consumers of clean energy through a decentralized protocol, powered by smart contracts and real-time data from IoT-enabled smart meters. Households can automatically sell excess energy, monitor usage, and participate in community-driven governance.

This system consists of nine main smart contracts that manage the decentralized energy network:

1. **Energy Account Contract** – Registers households and associates IoT meter IDs
2. **Energy Oracle Contract** – Processes energy data from IoT devices
3. **Energy Token Contract** – Issues and manages energy credit tokens (kWh-backed)
4. **Trade Matching Contract** – Matches energy buyers and sellers
5. **Settlement Contract** – Executes payments and energy transfers
6. **Pricing Logic Contract** – Adjusts dynamic pricing based on local demand/supply
7. **Storage Tracking Contract** – Integrates battery usage and stored capacity
8. **Grid Access Contract** – Manages buy/sell permissions and connection fees
9. **Governance Contract** – Community voting for pricing models and upgrades

**Features**

- IoT-integrated energy tracking
- Tokenized peer-to-peer energy exchange
- Dynamic pricing via demand-supply metrics
- Permissionless trade execution
- Grid-independent community power markets
- Support for battery and off-grid storage tracking
- Decentralized governance via token voting

**Smart Contracts**

**Energy Account Contract**

- Household registration and authentication
- IoT meter ID linking
- KYC and role management

**Energy Oracle Contract**

- Real-time consumption/production data input
- Validity and data accuracy checks
- Meter malfunction detection

**Energy Token Contract**

- Minting of energy tokens (1 token = 1 kWh)
- Transfer and balance management
- Burn mechanism for consumed energy

**Trade Matching Contract**

- Order book management for buying/selling
- Energy trade matching algorithm
- Limit and market order support

**Settlement Contract**

- Payment settlement in energy tokens
- Transaction verification
- Dispute resolution for failed transfers

**Pricing Logic Contract**

- Time-of-use pricing adjustments
- Regional demand/supply factor integration
- Energy surge pricing prevention

**Storage Tracking Contract**

- Battery charge/discharge monitoring
- Storage incentive logic
- Capacity-sharing options

**Grid Access Contract**

- Defines participation rules
- Access fee logic for using shared grid
- Emergency override functionality

**Governance Contract**

- Token-based voting
- Proposal creation and quorum logic
- Upgrade and parameter change approval

**Installation**

1. Install Clarinet CLI
2. Clone this repository
3. Run tests: `npm test`
4. Deploy contracts: `clarinet deploy`

**Usage**

Each smart contract is modular and can be deployed independently to support different components of the Brillia network. IoT devices interface with the Oracle to trigger trade flows and energy settlements. Community members interact through a Web3 frontend for tracking, trading, and governance.

**Testing**

Tests are written using Vitest and can be run with:

```bash
npm test
```

## License

MIT License