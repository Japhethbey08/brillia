;; Brillia Energy Authority Registry Contract
;; Validates and manages verified energy producers on the Brillia network

(define-data-var admin principal tx-sender)

;; Map of verified producers with metadata
(define-map verified-producers principal
  (tuple
    (approved bool)
    (added-by principal)
    (added-at uint)
  )
)

;; Error constants
(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-ALREADY-VERIFIED u101)
(define-constant ERR-NOT-VERIFIED u102)
(define-constant ERR-CANNOT-SELF-ADD u103)
(define-constant ERR-INVALID-ADMIN u104)

;; Private helper: is caller admin?
(define-private (is-admin)
  (is-eq tx-sender (var-get admin))
)

;; Public: add a new verified producer
(define-public (add-producer (producer principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (not (is-eq tx-sender producer)) (err ERR-CANNOT-SELF-ADD))
    (asserts! (is-none (map-get? verified-producers producer)) (err ERR-ALREADY-VERIFIED))
    (map-set verified-producers producer
      (tuple
        (approved true)
        (added-by tx-sender)
        (added-at block-height)
      )
    )
    (ok true)
  )
)

;; Public: remove a producer
(define-public (remove-producer (producer principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-some (map-get? verified-producers producer)) (err ERR-NOT-VERIFIED))
    (map-delete verified-producers producer)
    (ok true)
  )
)

;; Public: check if a producer is verified
(define-read-only (is-verified (producer principal))
  (match (map-get? verified-producers producer)
    entry (ok (get approved entry))
    (ok false)
  )
)

;; Public: get metadata of a verified producer
(define-read-only (get-producer (producer principal))
  (match (map-get? verified-producers producer)
    entry (ok entry)
    (err ERR-NOT-VERIFIED)
  )
)

;; Public: get current admin
(define-read-only (get-admin)
  (ok (var-get admin))
)

;; Public: transfer admin privileges
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (not (is-eq tx-sender new-admin)) (err ERR-INVALID-ADMIN))
    (var-set admin new-admin)
    (ok true)
  )
)
