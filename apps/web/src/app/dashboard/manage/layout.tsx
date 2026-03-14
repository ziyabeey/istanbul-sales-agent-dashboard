'use client'

import './kepenk-tokens.css'
import TopNavbar from './components/TopNavbar'
import Sidebar from './components/Sidebar'

export default function ManageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="kpnk-manage">
            <div className="kpnk-shell">
                <TopNavbar />
                <div className="kpnk-body">
                    <Sidebar />
                    {children}
                </div>
            </div>
        </div>
    )
}
