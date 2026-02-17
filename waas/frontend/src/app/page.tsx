import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Site
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock Site Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">My Portfolio</h3>
            <p className="text-gray-500 text-sm mb-4">Last updated 2 days ago</p>
            <Link href="/editor/site-123">
              <Button variant="outline" className="w-full">
                Edit Site
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Landing Page</h3>
            <p className="text-gray-500 text-sm mb-4">Last updated 1 hour ago</p>
            <Link href="/editor/site-456">
              <Button variant="outline" className="w-full">
                Edit Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
