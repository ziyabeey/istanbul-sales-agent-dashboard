import { describe, expect, it, vi } from 'vitest'
import {
    AdminAuditPersistenceError,
    runAuditedAdminMutation,
    type AdminAuditWriter,
} from '@/lib/security/auditLogger'
import type { AdminAuditRecord } from '../../../../packages/admin/src/types/auditLog'

describe('privileged admin audit', () => {
    it('fails closed before mutation when requested-event persistence fails', async () => {
        const mutation = vi.fn(async () => 'mutated')
        const writer: AdminAuditWriter = async () => { throw new Error('firestore down') }

        await expect(runAuditedAdminMutation({ actorAdminId: 'admin-1', targetType: 'business', targetId: 'b-1', action: 'ESNAF_DELETED' }, undefined, mutation, writer)).rejects.toBeInstanceOf(AdminAuditPersistenceError)
        expect(mutation).not.toHaveBeenCalled()
    })

    it('writes requested and succeeded outcome with the same case and request identity', async () => {
        const records: AdminAuditRecord[] = []
        const writer: AdminAuditWriter = async (record) => { records.push(record) }
        const result = await runAuditedAdminMutation({ actorAdminId: 'admin-1', targetType: 'business', targetId: 'b-1', action: 'ESNAF_UPDATED' }, undefined, async () => 'ok', writer)

        expect(result).toBe('ok')
        expect(records).toHaveLength(2)
        expect(records[0].eventType).toBe('AdminActionRequested')
        expect(records[1].eventType).toBe('AdminActionOutcome')
        expect(records[1].outcome).toBe('SUCCEEDED')
        expect(records[0].caseId).toBe(records[1].caseId)
        expect(records[0].requestId).toMatch(/^[0-9a-f-]{36}$/i)
        expect(records[0].requestId).toBe(records[1].requestId)
        expect(records[0].actorAdminId).toBe('admin-1')
    })

    it('preserves an incoming correlation id across requested and outcome events', async () => {
        const records: AdminAuditRecord[] = []
        const writer: AdminAuditWriter = async (record) => { records.push(record) }
        const request = new Request('https://kepenk.ai/api/admin/kota', {
            method: 'POST',
            headers: { 'x-correlation-id': 'corr-123' },
        })

        await runAuditedAdminMutation(
            { actorAdminId: 'admin-1', targetType: 'system', targetId: 'global', action: 'ADMIN_KOTA_MUTATION' },
            request,
            async () => 'ok',
            writer
        )

        expect(records[0].requestId).toBe('corr-123')
        expect(records[1].requestId).toBe('corr-123')
    })

    it('writes a failed outcome when the mutation throws', async () => {
        const records: AdminAuditRecord[] = []
        const writer: AdminAuditWriter = async (record) => { records.push(record) }

        await expect(runAuditedAdminMutation({ actorAdminId: 'admin-1', targetType: 'system', targetId: 'global', action: 'ADMIN_KOTA_MUTATION' }, undefined, async () => { throw new Error('boom') }, writer)).rejects.toThrow('boom')
        expect(records).toHaveLength(2)
        expect(records[1].eventType).toBe('AdminActionOutcome')
        expect(records[1].outcome).toBe('FAILED')
        expect(records[0].requestId).toBe(records[1].requestId)
    })
})
