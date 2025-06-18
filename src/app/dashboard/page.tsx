'use client';

/* import { connectDB } from '@/lib/db';
import { Product } from '@/models/Products';
import { Order } from '@/models/Order'; */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Report = {
    sales: number;
    returns: number;
    profit: number;
};

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [report, setReport] = useState<Report | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {  /* এখানে পর্ববর্তীতে !token করে দিতে হবে */
            router.push('/auth/login');
            return;
        }
 
        const fetchData = async () => {
            try {
                const [productsRes, ordersRes, reportRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/orders'),
                    fetch('/api/report/monthly')
                ]);

                const [productsData, ordersData, reportData] = await Promise.all([
                    productsRes.json(),
                    ordersRes.json(),
                    reportRes.json()
                ]);

                setProducts(productsData);
                setOrders(ordersData);
                setReport(reportData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    const totalSales = orders.reduce((sum: number, o: any) => sum + o.total, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = orders.filter((o: any) => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= today;
    });

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card title="🛒 Total Products" value={products.length} />
                <Card title="📦 Total Orders" value={orders.length} />
                <Card title="💰 Total Sales" value={`৳${totalSales}`} />
                <Card title="📅 Today's Orders" value={todayOrders.length} />
            </div>

            {/* Monthly Report */}
            <MonthlyReport report={report} />

            {/* Latest Orders Table */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">🕘 Latest Orders</h2>
                <table className="w-full text-sm border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Customer</th>
                            <th className="text-right">Total</th>
                            <th className="text-right">Items</th>
                            <th className="text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice(0, 5).map((order: any) => (
                            <tr key={order._id} className="border-b">
                                <td className="p-2">{order.customer?.name || 'Walk-in'}</td>
                                <td className="text-right">৳{order.total}</td>
                                <td className="text-right">{order.items.length}</td>
                                <td className="text-right">{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ✅ Small Card Component
function Card({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-2xl font-semibold mt-1">{value}</div>
        </div>
    );
}

// Monthly Report Component
function MonthlyReport({ report }: { report: Report | null }) {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">📈 Monthly Summary Report</h2>
            {report ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
                    <div className="bg-blue-600 p-4 rounded-xl shadow">
                        <h2 className="text-lg font-semibold">Total Sales</h2>
                        <p className="text-xl font-bold">৳{report.sales.toFixed(2)}</p>
                    </div>
                    <div className="bg-yellow-500 p-4 rounded-xl shadow">
                        <h2 className="text-lg font-semibold">Returns</h2>
                        <p className="text-xl font-bold">৳{report.returns.toFixed(2)}</p>
                    </div>
                    <div className="bg-green-600 p-4 rounded-xl shadow">
                        <h2 className="text-lg font-semibold">Profit</h2>
                        <p className="text-xl font-bold">৳{report.profit.toFixed(2)}</p>
                    </div>
                </div>
            ) : (
                <p>Loading report...</p>
            )}
        </div>
    );
}
