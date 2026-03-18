'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSetupProgress, type SetupGroup } from './useSetupProgress'

export default function SetupWizardBanner() {
    const { groups, progress, isComplete, remainingGroups, toggleTask, dismissed, dismissWizard, loading } = useSetupProgress()
    const [drawerOpen, setDrawerOpen] = useState(false)

    if (loading || dismissed || isComplete) return null

    return (
        <>
            {/* Banner */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(220,70,30,0.08), rgba(59,130,246,0.06))',
                border: '1px solid rgba(220,70,30,0.15)',
                borderRadius: 16, padding: '16px 20px', margin: '0 0 24px',
                display: 'flex', alignItems: 'center', gap: 16,
                cursor: 'pointer', transition: 'all 0.2s',
            }}
                onClick={() => setDrawerOpen(true)}
            >
                {/* Circular progress */}
                <div style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
                    <svg width="52" height="52" viewBox="0 0 52 52" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                        <circle cx="26" cy="26" r="22" fill="none" stroke="#dc4e1e" strokeWidth="4"
                            strokeDasharray={`${(progress / 100) * 138.2} 138.2`}
                            strokeLinecap="round" />
                    </svg>
                    <span style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, fontWeight: 800, color: '#dc4e1e',
                    }}>{progress}%</span>
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                        Sitenizi Tamamlayın
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                        {remainingGroups.length} görev kaldı — tıklayarak kontrol edin
                    </div>
                    {/* Mini progress bar */}
                    <div style={{
                        width: '100%', height: 4, background: 'rgba(255,255,255,0.08)',
                        borderRadius: 2, marginTop: 8, overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${progress}%`, height: '100%',
                            background: 'linear-gradient(90deg, #dc4e1e, #f97316)',
                            borderRadius: 2, transition: 'width 0.5s ease-out',
                        }} />
                    </div>
                </div>

                {/* Arrow */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>

                {/* Dismiss */}
                <button
                    onClick={(e) => { e.stopPropagation(); dismissWizard() }}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                        color: 'rgba(255,255,255,0.3)', fontSize: 16,
                    }}
                    title="Kapatır"
                >✕</button>
            </div>

            {/* Drawer overlay */}
            {drawerOpen && (
                <div
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                    }}
                    onClick={() => setDrawerOpen(false)}
                >
                    <div
                        style={{
                            position: 'absolute', right: 0, top: 0, bottom: 0,
                            width: 420, maxWidth: '90vw',
                            background: '#0a0a12', borderLeft: '1px solid rgba(255,255,255,0.08)',
                            overflowY: 'auto', animation: 'slideInRight 0.25s ease-out',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <style>{`
                            @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
                        `}</style>

                        {/* Drawer header */}
                        <div style={{
                            padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                            position: 'sticky', top: 0, background: '#0a0a12', zIndex: 1,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'white', margin: 0 }}>
                                    🚀 Kurulum Sihirbazı
                                </h2>
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}
                                >✕</button>
                            </div>

                            {/* Big progress */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{
                                    width: '100%', height: 8, background: 'rgba(255,255,255,0.06)',
                                    borderRadius: 4, overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${progress}%`, height: '100%',
                                        background: 'linear-gradient(90deg, #dc4e1e, #f97316, #22c55e)',
                                        borderRadius: 4, transition: 'width 0.5s ease-out',
                                    }} />
                                </div>
                                <span style={{ fontSize: 16, fontWeight: 800, color: '#dc4e1e', whiteSpace: 'nowrap' }}>%{progress}</span>
                            </div>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                                {remainingGroups.length === 0
                                    ? '🎉 Tüm görevler tamamlandı!'
                                    : `${remainingGroups.length} kategori tamamlanmadı`}
                            </p>
                        </div>

                        {/* Task groups */}
                        <div style={{ padding: '16px 24px 32px' }}>
                            {groups.map(group => (
                                <TaskGroupCard key={group.id} group={group} onToggle={toggleTask} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

/* ═══════ Task Group Card ═══════ */
function TaskGroupCard({ group, onToggle }: { group: SetupGroup; onToggle: (id: string) => void }) {
    const done = group.tasks.filter(t => t.done).length
    const total = group.tasks.length
    const allDone = done === total
    const [expanded, setExpanded] = useState(!allDone)

    return (
        <div style={{
            background: allDone ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${allDone ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: 14, padding: 16, marginBottom: 10,
            transition: 'all 0.2s',
        }}>
            {/* Group header */}
            <div
                style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                onClick={() => setExpanded(e => !e)}
            >
                <span style={{ fontSize: 22 }}>{group.emoji}</span>
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: 13, fontWeight: 700,
                        color: allDone ? '#22c55e' : 'white',
                        textDecoration: allDone ? 'line-through' : 'none',
                    }}>
                        {group.title}
                    </div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                        {done}/{total} tamamlandı · %{group.weight} ağırlık
                    </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"
                    style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s' }}>
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </div>

            {/* Tasks */}
            {expanded && (
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {group.tasks.map(task => (
                        <div
                            key={task.id}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '8px 10px', borderRadius: 8,
                                background: task.done ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.02)',
                                cursor: 'pointer', transition: '0.15s',
                            }}
                            onClick={() => onToggle(task.id)}
                        >
                            {/* Checkbox */}
                            <div style={{
                                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                                border: task.done ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.15)',
                                background: task.done ? '#22c55e' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: '0.15s',
                            }}>
                                {task.done && (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span style={{
                                fontSize: 12, fontWeight: 500,
                                color: task.done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.7)',
                                textDecoration: task.done ? 'line-through' : 'none',
                                flex: 1,
                            }}>
                                {task.label}
                            </span>
                        </div>
                    ))}

                    {/* Go to page link */}
                    {group.href && !allDone && (
                        <Link
                            href={group.href}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                fontSize: 11, fontWeight: 600, color: '#dc4e1e',
                                textDecoration: 'none', marginTop: 4, marginLeft: 10,
                            }}
                        >
                            Tamamla →
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}
