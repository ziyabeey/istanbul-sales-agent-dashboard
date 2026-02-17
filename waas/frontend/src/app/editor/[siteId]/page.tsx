import { EditorCanvas } from '@/components/Editor/EditorCanvas';

// For simplified SSR, we import EditorCanvas directly as a client component (already marked "use client")
// Next.js 15: params is async
export default async function Page({ params }: { params: Promise<{ siteId: string }> }) {
    const { siteId } = await params;
    return (
        <div className="h-screen w-full bg-slate-50">
            <EditorCanvas siteId={siteId} />
        </div>
    );
}
