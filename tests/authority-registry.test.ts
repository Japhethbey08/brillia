import { describe, it, expect, beforeEach } from "vitest"

const mockContract = {
  admin: "STADMIN111111111111111111111111111111111",
  verifiedProducers: new Map(),

  isAdmin(caller: string) {
    return caller === this.admin
  },

  addProducer(caller: string, producer: string, blockHeight = 100) {
    if (!this.isAdmin(caller)) return { error: 100 } // ERR-NOT-AUTHORIZED
    if (caller === producer) return { error: 103 } // ERR-CANNOT-SELF-ADD
    if (this.verifiedProducers.has(producer)) return { error: 101 } // ERR-ALREADY-VERIFIED

    this.verifiedProducers.set(producer, {
      approved: true,
      addedBy: caller,
      addedAt: blockHeight
    })
    return { value: true }
  },

  removeProducer(caller: string, producer: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    if (!this.verifiedProducers.has(producer)) return { error: 102 }

    this.verifiedProducers.delete(producer)
    return { value: true }
  },

  isVerified(producer: string) {
    return this.verifiedProducers.has(producer)
  },

  getProducer(producer: string) {
    if (!this.verifiedProducers.has(producer)) return { error: 102 }
    return { value: this.verifiedProducers.get(producer) }
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    if (caller === newAdmin) return { error: 104 }
    this.admin = newAdmin
    return { value: true }
  },

  getAdmin() {
    return { value: this.admin }
  }
}

describe("Brillia Energy Authority Registry", () => {
  beforeEach(() => {
    mockContract.admin = "STADMIN111111111111111111111111111111111"
    mockContract.verifiedProducers = new Map()
  })

  it("adds a verified producer by admin", () => {
    const result = mockContract.addProducer("STADMIN111111111111111111111111111111111", "STPRODUCER222222222222222222222222222222222")
    expect(result).toEqual({ value: true })
    expect(mockContract.isVerified("STPRODUCER222222222222222222222222222222222")).toBe(true)
  })

  it("fails to add a producer by non-admin", () => {
    const result = mockContract.addProducer("STUSER000000000000000000000000000000000", "STPRODUCER222222222222222222222222222222222")
    expect(result).toEqual({ error: 100 })
  })

  it("fails to add same producer again", () => {
    mockContract.addProducer("STADMIN111111111111111111111111111111111", "STPRODUCERX")
    const result = mockContract.addProducer("STADMIN111111111111111111111111111111111", "STPRODUCERX")
    expect(result).toEqual({ error: 101 })
  })

  it("fails to self-add as producer", () => {
    const result = mockContract.addProducer("STADMIN111111111111111111111111111111111", "STADMIN111111111111111111111111111111111")
    expect(result).toEqual({ error: 103 })
  })

  it("removes a verified producer", () => {
    mockContract.addProducer("STADMIN111111111111111111111111111111111", "STPRODUCERZ")
    const result = mockContract.removeProducer("STADMIN111111111111111111111111111111111", "STPRODUCERZ")
    expect(result).toEqual({ value: true })
    expect(mockContract.isVerified("STPRODUCERZ")).toBe(false)
  })

  it("transfers admin rights", () => {
    const result = mockContract.transferAdmin("STADMIN111111111111111111111111111111111", "STNEWADMIN999999999999999999999999999999")
    expect(result).toEqual({ value: true })
    expect(mockContract.admin).toBe("STNEWADMIN999999999999999999999999999999")
  })

  it("rejects admin transfer to self", () => {
    const result = mockContract.transferAdmin("STADMIN111111111111111111111111111111111", "STADMIN111111111111111111111111111111111")
    expect(result).toEqual({ error: 104 })
  })

  it("retrieves producer info", () => {
    mockContract.addProducer("STADMIN111111111111111111111111111111111", "STLOOKUP")
    const info = mockContract.getProducer("STLOOKUP")
    expect(info.value.addedBy).toBe("STADMIN111111111111111111111111111111111")
  })
})
