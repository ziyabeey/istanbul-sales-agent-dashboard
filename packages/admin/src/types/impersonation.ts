export interface ImpersonationSubject {
    type: 'esnaf';
    id: string;
    label: string;
}

export interface ImpersonationSession {
    sessionId: string;
    tokenHash: string;
    adminId: string;
    subject: ImpersonationSubject;
    reason: string;
    startedAt: string;
    expiresAt: string;
    endedAt: string | null;
}

// Legacy compatibility only. Durable ImpersonationSession is the authority.
export interface ImpersonationClaims {
    adminId: string;
    esnafUid: string;
    reason?: string;
    iat: number;
    exp: number;
}
